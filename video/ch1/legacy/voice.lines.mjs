// Generates the voiceover with ElevenLabs, one clip per narration line, with character-level timestamps.
//
//   ELEVENLABS_API_KEY=... node tools/voice.mjs [voiceId]
//
// Writes assets/voice/<scene>-<n>.mp3 plus voice.json (each clip's duration and its words' timing).
// A clip is only requested again when its text, voice or model changed, so re-running is cheap.
// Then `node tools/timing.mjs` lays the clips on the timeline and re-times every animation to them.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const here = (p) => new URL('../' + p, import.meta.url);
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) throw new Error('set ELEVENLABS_API_KEY');
const N = JSON.parse(readFileSync(here('narration.json'), 'utf8'));
const VOICE = process.argv[2] ?? N.voiceId;
if (!VOICE) throw new Error('pass a voice id, or set "voiceId" in narration.json');
const MODEL = N.voiceModel ?? 'eleven_multilingual_v2';
const SETTINGS = N.voiceSettings ?? { stability: 0.5, similarity_boost: 0.8, style: 0.1, use_speaker_boost: true };

mkdirSync(here('assets/voice'), { recursive: true });
const manifestPath = here('voice.json');
const old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { clips: {} };
const clips = {};
const flat = N.scenes.flatMap((sc) => sc.lines.map((ln, i) => ({ id: `${sc.id}-${i}`, say: ln.say ?? ln.text })));

for (const [k, c] of flat.entries()) {
  const hash = createHash('sha1').update([VOICE, MODEL, JSON.stringify(SETTINGS), c.say].join('|')).digest('hex').slice(0, 12);
  const file = `assets/voice/${c.id}.mp3`;
  if (old.clips[c.id]?.hash === hash && existsSync(here(file))) { clips[c.id] = old.clips[c.id]; continue; }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    // the neighbouring lines keep the intonation continuous across clips
    body: JSON.stringify({ text: c.say, model_id: MODEL, voice_settings: SETTINGS, previous_text: flat[k - 1]?.say, next_text: flat[k + 1]?.say }),
  });
  if (!res.ok) throw new Error(`${c.id}: ${res.status} ${await res.text()}`);
  const j = await res.json();
  writeFileSync(here(file), Buffer.from(j.audio_base64, 'base64'));
  const a = j.alignment;
  // words of the spoken text, from the characters' timing
  const words = [];
  let cur = null;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) { cur = null; return; }
    if (!cur) words.push((cur = { w: '', s: a.character_start_times_seconds[i], e: 0 }));
    cur.w += ch;
    cur.e = a.character_end_times_seconds[i];
  });
  const duration = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', new URL(here(file)).pathname.replace(/^\/([A-Z]:)/, '$1')]).toString().trim();
  clips[c.id] = { hash, file, duration, speech: words.at(-1).e, words };
  console.log(`${c.id}  ${duration.toFixed(2)}s  ${c.say.slice(0, 60)}`);
}
writeFileSync(manifestPath, JSON.stringify({ voice: VOICE, model: MODEL, clips }, null, 1) + '\n');
console.log(`${Object.keys(clips).length} clips · voice ${VOICE}`);
