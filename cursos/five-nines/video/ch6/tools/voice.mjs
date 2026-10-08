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
const KEY = process.env.ELEVENLABS_API_KEY; // only needed when a scene must be requested again
const N = JSON.parse(readFileSync(here('narration.json'), 'utf8'));
const VOICE = process.argv[2] ?? N.voiceId, MODEL = N.voiceModel ?? 'eleven_v4_turbo';
const SETTINGS = N.voiceSettings ?? { stability: 0.5, similarity_boost: 0.8, style: 0.1, use_speaker_boost: true };
const sceneText = (sc) => sc.lines.map((ln) => ln.say ?? ln.text).join(' ');
const ffprobe = (f) => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path(f)]).toString().trim();

/** The take's loudness in dB, one value per 10 ms frame. */
function envelope(file) {
  const SR = 16000, F = 160;
  const buf = execFileSync('ffmpeg', ['-v', 'error', '-i', path(file), '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  const x = new Float32Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length));
  const e = [];
  for (let i = 0; i + F <= x.length; i += F) { let s = 0; for (let j = i; j < i + F; j++) s += x[j] * x[j]; e.push(10 * Math.log10(s / F + 1e-12)); }
  return e;
}

/**
 * Where to cut between two lines: in the middle of the real silence the voice made there, measured on the audio.
 * The alignment's timestamps run up to ~0.3 s late, so halfway between its words lands on the next word's onset
 * (a clipped syllable at the end of the segment). The silence is searched around the alignment's gap.
 */
function cutPoint(env, a, b) {
  const lo = Math.max(0, Math.round((a - 0.8) * 100)), hi = Math.min(env.length, Math.round((b + 0.3) * 100));
  let best = null, run = null;
  for (let f = lo; f <= hi; f++) {
    const quiet = f < hi && env[f] < -45;
    if (quiet && run === null) run = f;
    if (!quiet && run !== null) { if (!best || f - run > best[1] - best[0]) best = [run, f]; run = null; }
  }
  if (best && best[1] - best[0] >= 6) return (best[0] + best[1]) / 200;
  // no clear silence: the quietest frame in the gap's neighbourhood
  let m = lo;
  for (let f = lo; f < hi; f++) if (env[f] < env[m]) m = f;
  return (m + 0.5) / 100;
}

/**
 * Where the take really ends. Some takes close with the onset of a word that belongs to the next scene
 * (a short burst after the last silence): the take ends in that silence instead.
 */
function tailEnd(env, duration) {
  let f = env.length - 1;
  while (f > 0 && env[f] < -45) f--;
  const last = f;
  while (f > 0 && env[f] >= -45) f--;
  const burst = last - f;
  let g = f;
  while (g > 0 && env[g] < -45) g--;
  if (last <= 0 || burst >= 30 || f - g < 15) return duration;
  return Math.min(duration, (g + 1) / 100 + 0.15);
}

/** Cuts a take only where a deliberate silence goes, in the middle of the pause the voice made between the two lines. */
function segment(sc, lines, file, duration) {
  const env = envelope(file);
  const cuts = sc.lines.map((ln, i) => (ln.pauseAfter && i < sc.lines.length - 1 ? cutPoint(env, lines[i].words.at(-1).e, lines[i + 1].words[0].s) : null)).filter((x) => x !== null);
  const end = tailEnd(env, duration);
  if (!cuts.length && end === duration) return [{ file, from: 0, duration, first: 0, last: sc.lines.length - 1 }];
  const edges = [0, ...cuts, end];
  // a line belongs to the segment its first word falls in (the last word can end a hair after the file does)
  const segOf = (i) => cuts.filter((c) => c <= lines[i].words[0].s).length;
  return edges.slice(0, -1).map((from, k) => {
    const to = edges[k + 1], seg = `assets/voice/${sc.id}-${k}.mp3`;
    const fade = `afade=t=in:d=0.02,afade=t=out:st=${(to - from - 0.04).toFixed(3)}:d=0.04`;
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

  if (!KEY) throw new Error(`${sc.id}: its text or settings changed, set ELEVENLABS_API_KEY`);
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
