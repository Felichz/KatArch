// Comprueba que cada ancla W(línea, 'palabra', n) de las composiciones exista en la narración de su escena.
// Sirve después de cambiar un guion: un ancla rota hace que la escena falle al cargarse.
//   node cursos/curso-v2/tools/anclas.mjs cursos/curso-v2/video/bNN [más bloques…]
import { readFileSync, readdirSync } from 'node:fs';
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
let rotas = 0;
for (const dir of process.argv.slice(2)) {
  const N = JSON.parse(readFileSync(`${dir}/narration.json`, 'utf8'));
  for (const sc of N.scenes) {
    let html;
    try { html = readFileSync(`${dir}/compositions/${sc.id}.html`, 'utf8'); } catch { continue; }
    const words = sc.lines.map((l) => l.text.split(/\s+/).map(norm).filter(Boolean));
    for (const m of html.matchAll(/\bW\((\d+),\s*'([^']+)'(?:,\s*(\d+))?\)/g)) {
      const [, i, frag, nth = 0] = m;
      const hits = (words[+i] || []).filter((w) => w.startsWith(norm(frag)));
      if (!hits[+nth]) { rotas++; console.log(`${dir} · ${sc.id}: W(${i}, '${frag}'${m[3] ? ', ' + nth : ''}) no existe`); }
    }
  }
}
console.log(rotas ? `${rotas} anclas rotas` : 'todas las anclas existen');
process.exit(rotas ? 1 : 0);
