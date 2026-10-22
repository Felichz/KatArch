// Importa tomas locales (VoxCPM2, con tiempos por palabra de un alineador) como la voz de un bloque: <tomas>/<escena>.wav
// → assets/voice[/en]/<escena>.mp3 y voice[.en].json, en el formato de tools/voice.mjs. La voz queda registrada como VOZ
// (por defecto "voxcpm2-local"), nunca como el voiceId de ElevenLabs: así el voice.mjs real ve cada escena como cambiada
// y la pide a la API, y un borrador nunca pasa por una toma paga.
//   node cursos/curso-v2/tools/importar-voz.mjs <bloque> <tomas> [--en] [voz]
//   después, en el bloque: node tools/voice.mjs voxcpm2-local [--en] && node tools/timing.mjs [--en]
// Las tomas salen de C:\Users\felix\qwen-tts\v2_en.py (tomas + takes.json).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const EN = process.argv.includes('--en');
const [DIR, TOMAS, VOZ = 'voxcpm2-local'] = process.argv.slice(2).filter((a) => a !== '--en');
const N = JSON.parse(readFileSync(join(DIR, EN ? 'narration.en.json' : 'narration.json'), 'utf8'));
const VD = EN ? 'assets/voice/en' : 'assets/voice', VF = EN ? 'voice.en.json' : 'voice.json';
// los mismos valores por defecto que tools/voice.mjs, para que el hash coincida
const MODEL = N.voiceModel ?? 'eleven_v4_turbo';
const SETTINGS = N.voiceSettings ?? { stability: 0.5, similarity_boost: 0.8, style: 0.1, use_speaker_boost: true };
const T = JSON.parse(readFileSync(join(TOMAS, 'takes.json'), 'utf8'));
const sceneText = (sc) => sc.lines.map((ln) => ln.say ?? ln.text).join(' ');

mkdirSync(join(DIR, VD), { recursive: true });
const out = { voice: VOZ, model: MODEL, scenes: {} };
for (const sc of N.scenes) {
  const file = `${VD}/${sc.id}.mp3`;
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(TOMAS, `${sc.id}.wav`), '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-q:a', '2', join(DIR, file)]);
  const duration = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(DIR, file)]).toString().trim();
  const hash = createHash('sha1').update([VOZ, MODEL, JSON.stringify(SETTINGS), sceneText(sc), JSON.stringify(sc.lines.map((l) => l.pauseAfter ?? 0))].join('|')).digest('hex').slice(0, 12);
  out.scenes[sc.id] = { hash, file, duration, segments: [], lines: T[sc.id].lines };
}
writeFileSync(join(DIR, VF), JSON.stringify(out, null, 1) + '\n');
console.log(`${DIR}: ${N.scenes.length} tomas importadas como ${VOZ}${EN ? ' (inglés)' : ''}`);
