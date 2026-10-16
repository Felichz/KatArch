// Copies the shared kit (video/kit/) into every chapter (video/chN/ with a narration.json) and writes the project files
// each chapter needs. Compositions, narration.json and README.md are the chapter's own and are never touched here;
// index.html is only created when missing (tools/timing.mjs lays out its film part).
//   node video/sync-kit.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const V = fileURLToPath(new URL('./', import.meta.url)).split(String.fromCharCode(92)).join('/');
const KIT = V + 'kit/';
const HF = '0.8.139';
const css = readFileSync(KIT + 'assets/kit.base.css', 'utf8') + readFileSync(KIT + 'assets/kit.fn.css', 'utf8');
for (const dir of readdirSync(V).filter((d) => /^ch\d+$/.test(d))) {
  const n = +dir.slice(2);
  const D = `${V}${dir}/`;
  if (!existsSync(D + 'narration.json')) continue;
  const N = JSON.parse(readFileSync(D + 'narration.json', 'utf8'));
  for (const d of ['assets/fonts', 'tools', 'compositions']) mkdirSync(D + d, { recursive: true });
  writeFileSync(D + 'assets/kit.css', css);
  for (const f of ['kit.js', 'icons.js']) copyFileSync(KIT + 'assets/' + f, D + 'assets/' + f);
  for (const f of readdirSync(KIT + 'assets/fonts')) copyFileSync(KIT + 'assets/fonts/' + f, D + 'assets/fonts/' + f);
  for (const f of readdirSync(KIT + 'tools')) copyFileSync(KIT + 'tools/' + f, D + 'tools/' + f);
  const id = `katarch-ch${n}`;
  writeFileSync(D + 'package.json', JSON.stringify({ name: id, private: true, type: 'module', scripts: { check: `npx --yes hyperframes@${HF} check`, render: `npx --yes hyperframes@${HF} render -o renders/${id}.mp4 --quality looks` } }, null, 2) + '\n');
  writeFileSync(D + 'hyperframes.json', readFileSync(V + '../../five-nines/video/ch1-lecture/hyperframes.json', 'utf8'));
  writeFileSync(D + 'meta.json', JSON.stringify({ id, name: id, createdAt: '2026-10-14T12:00:00.000Z' }, null, 2) + '\n');
  writeFileSync(D + '.gitignore', 'renders/\nsnapshots/\n.hf*/\nassets/voice/\nvoice.json\n');
  if (!existsSync(D + 'index.html')) {
    const html = readFileSync(KIT + 'index.tpl.html', 'utf8').replaceAll('{{TITLE}}', N.title).replaceAll('{{N}}', String(n));
    writeFileSync(D + 'index.html', html);
  }
}
console.log('kit synced');
