// Lista las frases de un bloque con su duración (de timing.js), para escribir la tabla frase por frase de IDEAL.md.
//   node cursos/curso-v2/tools/frases.mjs cursos/curso-v2/video/bNN
import { readFileSync } from 'node:fs';
const dir = process.argv[2];
const window = {};
eval(readFileSync(`${dir}/timing.js`, 'utf8'));
for (const sc of window.TIMING.scenes) {
  console.log(`\n## ${sc.id} (${sc.start.toFixed(1)}–${sc.end.toFixed(1)} s)`);
  sc.lines.forEach((ln, i) => {
    let cur = [];
    const flush = () => { if (!cur.length) return; const t = cur.map((w) => w.w).join(' '); console.log(`  [${i}] «${t}» (${(cur.at(-1).e - cur[0].s).toFixed(1)} s, desde ${(cur[0].s - sc.start).toFixed(1)})`); cur = []; };
    for (const w of ln.words) { cur.push(w); if (/[.?!]$/.test(w.w)) flush(); }
    flush();
  });
}
