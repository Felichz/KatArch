// Rebuilds video/chN/narration.json from guion/leccionN.md after a script edit, keeping the subtitle overrides the
// composition step added (a line with `say` keeps its digit `text` when its spoken text is unchanged), and reports the
// scenes whose line partition changed, because their L(i)/LE(i)/W(i, …) cues may need re-anchoring.
//   node narr-merge.cjs 2 3 4
const fs = require('fs');
const { execFileSync } = require('child_process');
const ROOT = __dirname.split(String.fromCharCode(92)).join('/');
for (const n of process.argv.slice(2)) {
  const f = `${ROOT}/video/ch${n}/narration.json`;
  const old = JSON.parse(fs.readFileSync(f, 'utf8'));
  fs.writeFileSync(f + '.bak', JSON.stringify(old, null, 2) + '\n');
  execFileSync('node', [`${ROOT}/narr.cjs`, String(n)], { stdio: 'inherit' });
  const neu = JSON.parse(fs.readFileSync(f, 'utf8'));
  const over = new Map();
  for (const sc of old.scenes) for (const ln of sc.lines) if (ln.say) over.set(ln.say, ln.text);
  let kept = 0;
  for (const sc of neu.scenes) {
    for (const ln of sc.lines) if (over.has(ln.text)) { ln.say = ln.text; ln.text = over.get(ln.say); kept++; }
    const o = old.scenes.find((s) => s.id === sc.id);
    const said = (s) => s.lines.map((l) => l.say ?? l.text);
    if (!o) { console.log(`ch${n} ${sc.id}: NEW scene`); continue; }
    const a = said(o), b = said(sc);
    if (a.length !== b.length) console.log(`ch${n} ${sc.id}: line count ${a.length} -> ${b.length} (re-anchor)`);
    else a.forEach((t, i) => { if (t !== b[i]) console.log(`ch${n} ${sc.id}: line ${i} text changed`); });
  }
  fs.writeFileSync(f, JSON.stringify(neu, null, 2) + '\n');
  console.log(`ch${n}: ${kept} subtitle overrides kept`);
}
