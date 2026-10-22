// Comprueba que cada ancla W(línea, 'palabra', n) de las composiciones exista en la narración de su escena.
// Sirve después de cambiar un guion: un ancla rota hace que la escena falle al cargarse. Con narration.en.json,
// avisa también las líneas en inglés que no tienen las mismas oraciones que en español.
//   node cursos/curso-v2/tools/anclas.mjs cursos/curso-v2/video/bNN [más bloques…]
import { readFileSync, readdirSync } from 'node:fs';
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
let rotas = 0, avisos = 0;
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

// La versión en inglés (narration.en.json): mismas escenas y líneas, y en cada línea las mismas oraciones,
// para que las anclas caigan dentro de su oración (kit.js, W).
const ora = (t) => t.split(/(?<=[.?!])\s+/).length;
for (const dir of process.argv.slice(2)) {
  let EN;
  try { EN = JSON.parse(readFileSync(`${dir}/narration.en.json`, 'utf8')); } catch { continue; }
  const ES = JSON.parse(readFileSync(`${dir}/narration.json`, 'utf8'));
  for (const sc of ES.scenes) {
    const en = EN.scenes.find((s) => s.id === sc.id);
    if (!en) { console.log(`${dir} · ${sc.id}: falta en narration.en.json`); continue; }
    if (en.lines.length !== sc.lines.length) { console.log(`${dir} · ${sc.id}: ${en.lines.length} líneas en inglés, ${sc.lines.length} en español`); continue; }
    sc.lines.forEach((l, i) => { const a = ora(l.text), b = ora(en.lines[i].text); if (a !== b) avisos++, console.log(`${dir} · ${sc.id}[${i}]: ${b} oraciones en inglés, ${a} en español (el ancla cae por proporción de la línea)`); });
  }
}

console.log(rotas ? `${rotas} anclas rotas` : 'todas las anclas existen', avisos ? `· ${avisos} líneas en inglés con otra cantidad de oraciones` : '');
process.exit(rotas ? 1 : 0);
