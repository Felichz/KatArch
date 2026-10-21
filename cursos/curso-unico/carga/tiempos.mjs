// Tiempos aproximados de un guion para los revisores de carga, sin alineación palabra por palabra:
// la duración de cada escena sale de la toma real de Jorge (out/curso-jorge/chN/<escena>.wav) y dentro de la escena el inicio
// de cada línea se reparte por número de caracteres. Entre escenas se suma 0,5 s y las pausas (`pauseAfter`) de las líneas.
//   node tiempos.mjs <carpeta de salida> <lección> [lección ...]   →   <carpeta>/tiempos-chN.txt
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
if (!process.env.TTS_DIR) { console.error('Falta TTS_DIR: la carpeta de la herramienta local de voz (la que tiene out/curso-jorge).'); process.exit(1); }
const TAKES = join(process.env.TTS_DIR, 'out', 'curso-jorge');
const [OUT, ...LS] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const say = (l) => l.say ?? l.text;

for (const n of LS) {
  const N = JSON.parse(readFileSync(join(ROOT, 'video', `ch${n}`, 'narration.json'), 'utf8'));
  let t = 1.0;
  const out = [`Lección ${n}: ${N.title}`, 'Tiempos aproximados (min:seg desde el inicio del video) de cada línea de la narración.', ''];
  for (const sc of N.scenes) {
    const wav = join(TAKES, `ch${n}`, `${sc.id}.wav`);
    const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav]).toString().trim();
    const chars = sc.lines.reduce((s, l) => s + say(l).length, 0);
    out.push(`[escena ${sc.id}] ${mmss(t)}`);
    let cum = 0;
    for (const l of sc.lines) {
      out.push(`  ${mmss(t + (cum / chars) * dur)}  ${say(l)}`);
      cum += say(l).length;
    }
    t += dur + 0.5;
  }
  out.push('', `Duración total aproximada: ${mmss(t)}`);
  writeFileSync(join(OUT, `tiempos-ch${n}.txt`), out.join('\n') + '\n');
  console.log(`ch${n}: ${mmss(t)}`);
}
