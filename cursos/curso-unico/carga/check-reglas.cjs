// Lee los análisis de carga de una ronda y cuenta las violaciones de las reglas acordadas.
//   node check-reglas.cjs <carpeta de la ronda> [lecciones...]     p. ej.  node check-reglas.cjs r1 1 2 3
// Reglas (ver BRIEF-reescritura.md):
//   R1  carga >= 4 con fricción >= 3
//   R2  fricción >= 3 con carga == 3 (lo nuevo entra con carga 1 o 2)
//   R3  dos ideas seguidas con carga >= 4
//   R4  dos casos nuevos a menos de 120 s uno de otro
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, process.argv[2] || 'r1');
const lessons = process.argv.slice(3).map(Number);
const list = lessons.length ? lessons : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const num = (c) => parseInt(String(c).replace(/\*/g, '').trim(), 10);
const secs = (t) => { const m = /(\d+):(\d+)/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : NaN; };

let total = { ideas: 0, r1: 0, r2: 0, r3: 0, r4: 0 };
const summary = [];
for (const n of list) {
  const f = path.join(dir, `leccion${n}.md`);
  if (!fs.existsSync(f)) { summary.push({ n, error: 'sin análisis' }); continue; }
  const txt = fs.readFileSync(f, 'utf8');
  const head = txt.split('\n').findIndex((l) => /^\|\s*#\s*\|\s*Tiempo/i.test(l));
  if (head < 0) { summary.push({ n, error: 'sin tabla con la cabecera exacta' }); continue; }
  const rows = [];
  for (const l of txt.split('\n').slice(head + 2)) {
    if (!l.startsWith('|')) { if (rows.length) break; else continue; }
    const c = l.split('|').map((x) => x.trim());
    const idx = num(c[1]);
    if (!Number.isFinite(idx)) continue;
    rows.push({ i: idx, t: secs(c[2]), idea: c[3], c: num(c[4]), f: num(c[5]), caso: (c[6] || '').replace(/\*/g, '') });
  }
  const bad = rows.filter((r) => !(r.c >= 1 && r.c <= 5 && r.f >= 1 && r.f <= 5));
  const R1 = rows.filter((r) => r.c >= 4 && r.f >= 3).map((r) => r.i);
  const R2 = rows.filter((r) => r.f >= 3 && r.c === 3).map((r) => r.i);
  const R3 = [];
  for (let k = 1; k < rows.length; k++) if (rows[k].c >= 4 && rows[k - 1].c >= 4) R3.push(`${rows[k - 1].i}-${rows[k].i}`);
  const casos = rows.filter((r) => r.caso && !/^[—–-]+$/.test(r.caso));
  const R4 = [];
  for (let k = 1; k < casos.length; k++) if (casos[k].t - casos[k - 1].t < 120) R4.push(`${casos[k - 1].caso}@${casos[k - 1].t}s/${casos[k].caso}@${casos[k].t}s`);
  total.ideas += rows.length; total.r1 += R1.length; total.r2 += R2.length; total.r3 += R3.length; total.r4 += R4.length;
  summary.push({ n, ideas: rows.length, casos: casos.length, R1, R2, R3, R4, fila_invalida: bad.map((r) => r.i) });
}
for (const s of summary) {
  if (s.error) { console.log(`L${s.n}: ${s.error}`); continue; }
  const ok = !s.R1.length && !s.R2.length && !s.R3.length && !s.R4.length && !s.fila_invalida.length;
  console.log(`L${s.n}: ${ok ? 'OK' : 'VIOLA'} · ${s.ideas} ideas, ${s.casos} casos nuevos · R1[${s.R1}] R2[${s.R2}] R3[${s.R3}] R4[${s.R4.join('; ')}]${s.fila_invalida.length ? ' filas inválidas[' + s.fila_invalida + ']' : ''}`);
}
console.log(`TOTAL: ${total.ideas} ideas · R1=${total.r1} R2=${total.r2} R3=${total.r3} R4=${total.r4}`);
process.exitCode = total.r1 + total.r2 + total.r3 + total.r4 ? 1 : 0;
