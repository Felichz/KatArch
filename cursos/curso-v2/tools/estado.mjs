// Marca un bloque como animado (guion revisado por sombreros, falta la aprobación de Felix; guion visual y animación
// hechos; faltan voz, render y sitio): actualiza su fila en cursos/curso-v2/README.md y sus etapas en src/curso/curso.ts.
//   node cursos/curso-v2/tools/estado.mjs <n> <slug> <archivo del guion>
import { readFileSync, writeFileSync } from 'node:fs';
const [n, slug, guion] = process.argv.slice(2);
let s = readFileSync('src/curso/curso.ts', 'utf8');
const re = new RegExp(`(\{ n: ${n}, slug: '${slug}'[^\n]*?etapas: )(pend|guionBorrador|animado)`);
if (!re.test(s)) throw new Error('no encuentro el bloque en curso.ts');
s = s.replace(re, '$1animado');
writeFileSync('src/curso/curso.ts', s);
let r = readFileSync('cursos/curso-v2/README.md', 'utf8');
const fila = `| ${n} | ${slug} | \`${guion}\`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |`;
const lines = r.split('\n');
const i = lines.findIndex((l) => l.startsWith(`| ${n} | `) && !l.includes('`guardar-datos`)') || l.startsWith(`| ${n} | ${slug}`));
if (i >= 0) lines[i] = fila;
else {
  const j = lines.findIndex((l) => l.startsWith('| 6–15 |') || l.startsWith('| 7–15 |') || /^\| \d+–15 \|/.test(l));
  lines.splice(j, 0, fila);
}
writeFileSync('cursos/curso-v2/README.md', lines.join('\n'));
console.log(`bloque ${n}: animado`);
