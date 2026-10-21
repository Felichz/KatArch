// Corta un bloque del guion aprobado (cursos/curso-unico/guion-v2/NN-*.md) en narration.json para su proyecto de video.
// Cada escena del guion ("## Título {#id}") es una escena; cada párrafo de su narración, una línea. El guion es la única
// fuente: si cambia, se vuelve a correr esto y después timing.mjs, y las anclas de las composiciones siguen valiendo.
//   node cursos/curso-v2/tools/guion-a-narracion.mjs cursos/curso-unico/guion-v2/01-decision.md cursos/curso-v2/video/b01 decision
// (el slug es el del bloque en src/curso/curso.ts)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const [src, out, slug] = process.argv.slice(2);
const md = readFileSync(src, 'utf8').split('## Notas de verificación')[0];
const title = md.match(/^# (?:Bloque \d+ · |Apertura · |Cierre · )?(.+)$/m)[1].trim();
const scenes = [];
for (const part of md.split(/^## /m).slice(1)) {
  const head = part.split('\n')[0];
  const m = head.match(/^(.*?)\s*\{#([\w-]+)\}/);
  if (!m) continue;
  const narr = part.match(/\*\*Narración\*\*\n([\s\S]*?)\n\*\*Visual\*\*/);
  if (!narr) continue;
  // entre párrafos de una misma escena, una pausa corta: separa las ideas al oído y deja respirar a la imagen
  const paras = narr[1].trim().split(/\n\s*\n/);
  const lines = paras.map((p, i) => ({ text: p.replace(/\s+/g, ' ').trim(), ...(i < paras.length - 1 ? { pauseAfter: 0.5 } : {}) }));
  scenes.push({ id: m[2], kicker: m[1].trim(), lines });
}
mkdirSync(out, { recursive: true });
const N = { title, slug, chapter: +(src.match(/(\d+)-/)?.[1] ?? 0), voice: 'borrador local (macOS say)', scenes };
writeFileSync(`${out}/narration.json`, JSON.stringify(N, null, 2) + '\n');
console.log(`${scenes.length} escenas · ${scenes.reduce((a, s) => a + s.lines.length, 0)} líneas → ${out}/narration.json`);
