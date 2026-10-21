// Capturas de un bloque al final de cada frase (el momento en que su plano de IDEAL.md ya está completo), para el paso 4.6–4.7.
//   node cursos/curso-v2/tools/capturas.mjs cursos/curso-v2/video/bNN <carpeta> [--inversa] [--escenas id,id]
// --inversa toma las mismas capturas en orden inverso (prueba de visibilidad, PROCESO.md 4.7). Nunca corre `hyperframes preview`.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const [dir, out, ...rest] = process.argv.slice(2);
const inv = rest.includes('--inversa');
const only = rest.includes('--escenas') ? rest[rest.indexOf('--escenas') + 1].split(',') : null;
const window = {};
eval(readFileSync(`${dir}/timing.js`, 'utf8'));
const at = [];
for (const sc of window.TIMING.scenes) {
  if (only && !only.includes(sc.id)) continue;
  for (const ln of sc.lines) {
    let cur = [];
    for (const w of ln.words) { cur.push(w); if (/[.?!]$/.test(w.w)) { at.push(+(cur.at(-1).e - 0.2).toFixed(2)); cur = []; } }
    if (cur.length) at.push(+(cur.at(-1).e - 0.2).toFixed(2));
  }
}
if (inv) at.reverse();
console.log(`${at.length} capturas`);
execFileSync('npx', ['--yes', 'hyperframes@0.8.139', 'snapshot', '--describe', 'false', '--no-end', '--timeout', '25000', '--at', at.join(','), '-o', `snapshots/${out}`], { cwd: dir, stdio: 'inherit', shell: true });
