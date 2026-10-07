// Posters: the frame where each chapter's title card is fully up (the intro line that says "Capítulo N: …").
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
for (let n = 1; n <= 11; n++) {
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(`video/ch${n}/timing.js`, 'utf8'), ctx);
  const intro = ctx.window.TIMING.scenes[0];
  const title = intro.lines.find((l) => /Capítulo \d+:/.test(l.text)) ?? intro.lines.at(-1);
  const word = title.words?.find((w) => w.w === 'Capítulo') ?? { s: title.start };
  const t = Math.min(word.s + 2.2, intro.end - 0.8);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', t.toFixed(2), '-i', `video/ch${n}/renders/katarch-cap${n}.mp4`, '-frames:v', '1', '-vf', 'scale=1280:-1', '-q:v', '3', `video/dist/cap${n}.jpg`]);
  console.log(`cap${n} poster at ${t.toFixed(2)}s: ${title.text}`);
}
