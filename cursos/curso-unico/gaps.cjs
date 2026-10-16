// Maps the empty stretches found by blank-check.sh to scene, line and the words being said, so a composition fix
// knows where to anchor.   bash blank-check.sh 2 3 | node gaps.cjs 2
const fs = require('fs');
const ROOT = __dirname.split(String.fromCharCode(92)).join('/');
const n = process.argv[2];
const src = fs.readFileSync(`${ROOT}/video/ch${n}/timing.js`, 'utf8');
const T = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
const input = fs.readFileSync(0, 'utf8').split('\n').filter((l) => l.includes('empty'));
for (const l of input) {
  const [a, b] = l.match(/([\d.]+)-([\d.]+)/).slice(1).map(Number);
  const sc = T.scenes.find((s) => s.lines.some((ln) => ln.end >= a)) ?? T.scenes.at(-1);
  const t0 = sc.lines[0].start;
  const hits = [];
  sc.lines.forEach((ln, i) => {
    const ws = ln.words.filter((w) => w.e >= a && w.s <= b).map((w) => w.w);
    if (ws.length) hits.push(`línea ${i}: «${ws.join(' ')}»`);
  });
  console.log(`- ${a.toFixed(1)}–${b.toFixed(1)} s (${(b - a).toFixed(1)} s), escena «${sc.id}» (empieza en ${t0.toFixed(1)} s): ${hits.join(' / ') || 'entre escenas'}`);
}
