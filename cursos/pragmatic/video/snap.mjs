// Prints the snapshot times for a chapter: one frame just after each line ends (what the viewer sees once the voice said it).
//   node video/snap.mjs 1 [scene]   → comma-separated seconds, for `hyperframes snapshot --at ...`
import { readFileSync } from 'node:fs';
const [n, only] = process.argv.slice(2);
const src = readFileSync(new URL(`./ch${n}/timing.js`, import.meta.url), 'utf8');
const T = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
const at = [];
for (const sc of T.scenes) {
  if (only && sc.id !== only) continue;
  sc.lines.forEach((ln, i) => {
    const next = sc.lines[i + 1]?.start ?? sc.end - 0.75;
    at.push(+Math.max(ln.end - 0.2, Math.min(ln.end + 0.5, next - 0.45)).toFixed(2));
  });
}
console.log(at.join(','));
