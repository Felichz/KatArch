// Copies the shared kit (video/kit/) into every chapter and writes the project files each chapter needs.
// Compositions, narration.json and README.md are the chapter's own and are never touched here; index.html is only
// created when missing (tools/timing.mjs lays out its film part).
//   node video/sync-kit.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
const V = new URL('./', import.meta.url).pathname;
const KIT = V + 'kit/';
const HF = '0.8.139';
const css = readFileSync(KIT + 'assets/kit.base.css', 'utf8') + readFileSync(KIT + 'assets/kit.fn.css', 'utf8');
for (let n = 1; n <= 8; n++) {
  const D = `${V}ch${n}/`;
  if (!existsSync(D + 'narration.json')) continue;
  const N = JSON.parse(readFileSync(D + 'narration.json', 'utf8'));
  for (const d of ['assets/fonts', 'tools', 'compositions']) mkdirSync(D + d, { recursive: true });
  writeFileSync(D + 'assets/kit.css', css);
  for (const f of ['kit.js', 'icons.js']) copyFileSync(KIT + 'assets/' + f, D + 'assets/' + f);
  for (const f of readdirSync(KIT + 'assets/fonts')) copyFileSync(KIT + 'assets/fonts/' + f, D + 'assets/fonts/' + f);
  for (const f of readdirSync(KIT + 'tools')) copyFileSync(KIT + 'tools/' + f, D + 'tools/' + f);
  const id = `five-nines-ch${n}`;
  writeFileSync(D + 'package.json', JSON.stringify({ name: id, private: true, type: 'module', scripts: { dev: `npx --yes hyperframes@${HF} preview`, check: `npx --yes hyperframes@${HF} check`, render: `npx --yes hyperframes@${HF} render`, publish: `npx --yes hyperframes@${HF} publish` } }, null, 2) + '\n');
  writeFileSync(D + 'hyperframes.json', JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', registry: 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry', paths: { blocks: 'compositions', components: 'compositions/components', assets: 'assets' }, media: { autoProxy: true } }, null, 2) + '\n');
  writeFileSync(D + 'meta.json', JSON.stringify({ id, name: id, createdAt: '2026-10-07T12:00:00.000Z' }, null, 2) + '\n');
  writeFileSync(D + '.gitignore', 'renders/\nsnapshots/\n.hf*/\nassets/voice/\nvoice.json\n');
  if (!existsSync(D + 'index.html')) {
    const html = readFileSync(KIT + 'index.tpl.html', 'utf8').replaceAll('{{TITLE}}', N.title).replaceAll('{{N}}', String(n));
    writeFileSync(D + 'index.html', html);
  }
}
console.log('kit synced');
