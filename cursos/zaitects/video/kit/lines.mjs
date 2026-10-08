// Prints a chapter's scenes with numbered lines (the index W(i, 'word') uses) and each scene's estimated length.
//   node video/kit/lines.mjs 1
import { readFileSync, existsSync } from 'node:fs';
const n = process.argv[2];
const N = JSON.parse(readFileSync(new URL(`../ch${n}/narration.json`, import.meta.url), 'utf8'));
const tp = new URL(`../ch${n}/timing.js`, import.meta.url);
let T = null;
if (existsSync(tp)) { globalThis.window = {}; new Function(readFileSync(tp, 'utf8'))(); T = Object.fromEntries(window.TIMING.scenes.map((s) => [s.id, s])); }
for (const sc of N.scenes) {
  const t = T?.[sc.id];
  console.log(`\n## ${sc.id} · ${sc.kicker}${t ? `  (${(t.end - t.start).toFixed(1)} s)` : ''}`);
  sc.lines.forEach((l, i) => console.log(`  [${i}]${l.pauseAfter ? ` (+${l.pauseAfter})` : ''} ${l.text}`));
}
