// Junta los textos que un bloque muestra en pantalla, para traducirlos (textos.en.json).
// Lee las cadenas entre comillas simples de las composiciones y las parte donde las parte el HTML (<br>, etiquetas),
// porque el kit traduce cada nodo de texto por separado. Deja afuera colores, íconos, estilos y anclas.
//   node cursos/curso-v2/tools/textos.mjs cursos/curso-v2/video/bNN [--faltan]
// Con --faltan, lista solo lo que todavía no está en textos.en.json.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
const dir = process.argv[2], faltan = process.argv.includes('--faltan');
const ICONS = Object.keys(JSON.parse(readFileSync(`${dir}/assets/icons.js`, 'utf8').replace(/^[\s\S]*?window\.ICONS = /, '').replace(/;\s*$/, '')));
const skip = (s) => !/[a-záéíóúñ]/i.test(s) || /^#|^[\d\s.,·×%+\-→$¿?!]+$/.test(s) || ICONS.includes(s) || /^(font-|text-|M\d|[a-z]+:)/.test(s) || /^[A-Z][a-zA-Z]+$/.test(s) && /^(ClearView|MonitorMe|MobilityCorp|ShopWise|Spotlight|Certifiable|Farmacy|Sysops|Wildlife|GraphQL|REST|Kubernetes)/.test(s);
// nombres propios y códigos, que no se traducen
const propio = (s) => /^(ADR|FR)[-#]?\S*$/.test(s) || /^(Farmacy (Food|Family)|Sysops Squad|Wildlife Watcher|Mark Richards|Jacqui Read|TheKataLog|SMS|quantum|internet|v\d|[<≈≤×]?\s?[\dn][\d.,]*\s?(h|s|ms|%|\/ s)?)$/.test(s) || /^[A-Z]{1,6}$/.test(s) || /^(stroke-|power\d|elastic|butt|async|svg|\.)/.test(s) || /rgba\(/.test(s);
const keys = new Set();
const add = (s) => { s = s.replace(/&nbsp;/g, ' '); const solo = s.replace(/<br\s*\/?>/g, '<br>').replace(/^<span[^>]*>([\s\S]*)<\/span>$/, '$1').trim(); if (/^[^<]*(<br>[^<]*)+$/.test(solo) && !skip(solo.replace(/<br>/g, ' '))) { keys.add(solo); for (const p of solo.split('<br>').map((x) => x.trim())) (partOf[p] ??= []).push(solo); } return add1(s); };
const partOf = {};
const add1 = (s) => s.split(/<[^>]+>|\s·\s/).map((x) => x.trim()).filter(Boolean).forEach((x) => { if (!skip(x)) keys.add(x); });
for (const f of readdirSync(`${dir}/compositions`)) {
  const src = readFileSync(`${dir}/compositions/${f}`, 'utf8').replace(/\bW\(\d+,\s*'[^']*'/g, '').replace(/\b(style|c|dash|cls|ease|anchor):\s*'[^']*'/g, '');
  // fuera: el id de la escena, la clave del mundo del caso y el ícono del sello, que no se muestran
  const js = src.slice(src.indexOf('<script>')).replace(/KIT\.scene\('[^']*'\)/g, '').replace(/T\.mundo\(([^,]*),\s*'[^']*'/g, 'T.mundo($1,').replace(/T\.seal\(([^,]*),\s*('[^']*'),\s*'[^']*'/g, 'T.seal($1, $2');
  for (const m of js.matchAll(/'((?:[^'\\]|\\.)*)'/g)) add(m[1]);
  for (const m of js.matchAll(/`((?:[^`\\]|\\.)*)`/g)) if (!m[1].includes('${')) add(m[1]);
}
const rd = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {});
const comun = rd(`${dir}/tools/textos.comun.en.json`);
const ids = new Set(JSON.parse(readFileSync(`${dir}/narration.json`, 'utf8')).scenes.map((s) => s.id).concat(['clearview', 'monitorme', 'mobilitycorp', 'farmacy', 'sysops', 'family', 'spotlight', 'shopwise', 'wildlife']));
for (const k of [...keys]) if (k in comun || propio(k)) keys.delete(k);
const tx = rd(`${dir}/textos.en.json`);
// una parte de un rótulo de varias líneas no hace falta si el rótulo entero ya está traducido (el kit lo traduce entero)
for (const k of [...keys]) if (partOf[k] && !(k in tx) && partOf[k].every((w) => w in tx)) keys.delete(k);
const out = [...keys].filter((k) => !faltan || !(k in tx));
console.log(JSON.stringify(Object.fromEntries(out.map((k) => [k, tx[k] ?? ''])), null, 1));
console.error(`${dir}: ${keys.size} textos · ${[...keys].filter((k) => !(k in tx)).length} sin traducir`);
