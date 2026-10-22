// Junta los textos que un bloque muestra en pantalla, para traducirlos (textos.en.json).
// Lee las cadenas entre comillas simples de las composiciones y las parte donde las parte el HTML (<br>, etiquetas),
// porque el kit traduce cada nodo de texto por separado. Deja afuera colores, íconos, estilos y anclas.
//   node cursos/curso-v2/tools/textos.mjs cursos/curso-v2/video/bNN [--faltan]
// Con --faltan, lista solo lo que todavía no está en textos.en.json.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
const dir = process.argv[2], faltan = process.argv.includes('--faltan');
const ICONS = Object.keys(JSON.parse(readFileSync(`${dir}/assets/icons.js`, 'utf8').replace(/^[\s\S]*?window\.ICONS = /, '').replace(/;\s*$/, '')));
const skip = (s) => !/[a-záéíóúñ]/i.test(s) || /^#|^[\d\s.,·×%+\-→$¿?!]+$/.test(s) || ICONS.includes(s) || /^(font-|text-|M\d|[a-z]+:)/.test(s) || /^[A-Z][a-zA-Z]+$/.test(s) && /^(ClearView|MonitorMe|MobilityCorp|ShopWise|Spotlight|Certifiable|Farmacy|Sysops|Wildlife|GraphQL|REST|Kubernetes)/.test(s);
const keys = new Set();
const add = (s) => s.split(/<[^>]+>|\s·\s/).map((x) => x.trim()).filter(Boolean).forEach((x) => { if (!skip(x)) keys.add(x); });
for (const f of readdirSync(`${dir}/compositions`)) {
  const src = readFileSync(`${dir}/compositions/${f}`, 'utf8').replace(/\bW\(\d+,\s*'[^']*'/g, '').replace(/\b(style|c|dash|cls|ease|anchor):\s*'[^']*'/g, '');
  const js = src.slice(src.indexOf('<script>'));
  for (const m of js.matchAll(/'((?:[^'\\]|\\.)*)'/g)) add(m[1]);
  for (const m of js.matchAll(/`((?:[^`\\]|\\.)*)`/g)) if (!m[1].includes('${')) add(m[1]);
}
const tx = existsSync(`${dir}/textos.en.json`) ? JSON.parse(readFileSync(`${dir}/textos.en.json`, 'utf8')) : {};
const out = [...keys].filter((k) => !faltan || !(k in tx));
console.log(JSON.stringify(Object.fromEntries(out.map((k) => [k, tx[k] ?? ''])), null, 1));
console.error(`${dir}: ${keys.size} textos · ${[...keys].filter((k) => !(k in tx)).length} sin traducir`);
