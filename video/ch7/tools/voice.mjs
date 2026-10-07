// Generates the voiceover with ElevenLabs: ONE continuous take per scene, with character-level timestamps.
//
//   ELEVENLABS_API_KEY=... node tools/voice.mjs
//
// Why per scene: a continuous take keeps one intonation, energy and breathing across the scene's sentences,
// while scenes are natural breaks (a pause and a visual transition) so a new take there is never heard.
// The neighbouring scenes go along as context, so each take starts and ends in the right register.
//
// A take is only cut where the script asks for a silence (`pauseAfter`, e.g. "think before the answer"):
// the cut falls in the middle of the pause the voice already made, so it is inaudible.
//
// Writes assets/voice/<scene>.mp3 (+ <scene>-<k>.mp3 segments) and voice.json. A scene is only requested
// again when its text, the voice, the model or the settings changed.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = (p) => new URL('../' + p, import.meta.url);
const path = (p) => fileURLToPath(here(p));
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) throw new Error('set ELEVENLABS_API_KEY');
const N = JSON.parse(readFileSync(here('narration.json'), 'utf8'));
const VOICE = process.argv[2] ?? N.voiceId, MODEL = N.voiceModel ?? 'eleven_v4_turbo';
const SETTINGS = N.voiceSettings ?? { stability: 0.5, similarity_boost: 0.8, style: 0.1, use_speaker_boost: true };
const sceneText = (sc) => sc.lines.map((ln) => ln.say ?? ln.text).join(' ');
const ffprobe = (f) => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path(f)]).toString().trim();

/** Cuts a take only where a deliberate silence goes, halfway through the pause between the two lines. */
function segment(sc, lines, file, duration) {
  const cuts = sc.lines.map((ln, i) => (ln.pauseAfter && i < sc.lines.length - 1 ? (lines[i].words.at(-1).e + lines[i + 1].words[0].s) / 2 : null)).filter((x) => x !== null);
  if (!cuts.length) return [{ file, from: 0, duration, first: 0, last: sc.lines.length - 1 }];
  const edges = [0, ...cuts, duration];
  // a line belongs to the segment its first word falls in (the last word can end a hair after the file does)
  const segOf = (i) => cuts.filter((c) => c <= lines[i].words[0].s).length;
  return edges.slice(0, -1).map((from, k) => {
    const to = edges[k + 1], seg = `assets/voice/${sc.id}-${k}.mp3`;
    const fade = `afade=t=in:d=0.02,afade=t=out:st=${(to - from - 0.03).toFixed(3)}:d=0.03`;
    // seek on the input, so the fades are timed on the segment's own clock (an output seek kept the input's clock and muted the segment)
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', from.toFixed(3), '-t', (to - from).toFixed(3), '-i', path(file), '-af', fade, '-c:a', 'libmp3lame', '-q:a', '2', path(seg)]);
    const mine = sc.lines.map((_, i) => i).filter((i) => segOf(i) === k);
    return { file: seg, from: +from.toFixed(3), duration: +(to - from).toFixed(3), first: mine[0], last: mine.at(-1) };
  });
}

mkdirSync(here('assets/voice'), { recursive: true });
const old = existsSync(here('voice.json')) ? JSON.parse(readFileSync(here('voice.json'), 'utf8')) : { scenes: {} };
const out = { voice: VOICE, model: MODEL, scenes: {} };

for (const [k, sc] of N.scenes.entries()) {
  const text = sceneText(sc);
  const hash = createHash('sha1').update([VOICE, MODEL, JSON.stringify(SETTINGS), text, JSON.stringify(sc.lines.map((l) => l.pauseAfter ?? 0))].join('|')).digest('hex').slice(0, 12);
  if (old.scenes[sc.id]?.hash === hash && existsSync(here(`assets/voice/${sc.id}.mp3`))) {
    const o = old.scenes[sc.id];
    out.scenes[sc.id] = { ...o, segments: segment(sc, o.lines, o.file, o.duration) };
    continue;
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: SETTINGS, previous_text: N.scenes[k - 1] && sceneText(N.scenes[k - 1]), next_text: N.scenes[k + 1] && sceneText(N.scenes[k + 1]) }),
  });
  if (!res.ok) throw new Error(`${sc.id}: ${res.status} ${await res.text()}`);
  const j = await res.json();
  const file = `assets/voice/${sc.id}.mp3`;
  writeFileSync(here(file), Buffer.from(j.audio_base64, 'base64'));
  const a = j.alignment;
  if (a.characters.length !== text.length) throw new Error(`${sc.id}: the alignment does not match the text`);

  // each line's words, on the take's clock, from the characters' timing
  let pos = 0;
  const lines = sc.lines.map((ln) => {
    const say = ln.say ?? ln.text, from = text.indexOf(say, pos);
    pos = from + say.length;
    const words = [];
    let cur = null;
    for (let i = from; i < from + say.length; i++) {
      const ch = a.characters[i];
      if (/\s/.test(ch)) { cur = null; continue; }
      if (!cur) words.push((cur = { w: '', s: a.character_start_times_seconds[i], e: 0 }));
      cur.w += ch;
      cur.e = a.character_end_times_seconds[i];
    }
    return { words };
  });

  const duration = ffprobe(file);
  const segments = segment(sc, lines, file, duration);
  out.scenes[sc.id] = { hash, file, duration, segments, lines };
  console.log(`${sc.id.padEnd(8)} ${duration.toFixed(2)}s  ${segments.length} segment(s)`);
}
writeFileSync(here('voice.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`${N.scenes.length} scenes · ${MODEL} · voice ${VOICE}`);
