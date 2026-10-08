// Copies the course's shared kit (video/kit/) into every chapter and writes the project files each chapter needs.
// Compositions, narration.json, README.md and assets/orig/ (the team's originals) belong to each chapter and are never
// touched here; index.html is only created when missing (tools/timing.mjs lays out its film part).
//
//   node video/sync-kit.mjs        (from cursos/bluzbrothers/)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
const V = new URL('./', import.meta.url).pathname;
const KIT = V + 'kit/';
const HF = '0.8.139'; // the same pinned HyperFrames as KatArch's chapters
const css = readFileSync(KIT + 'assets/kit.base.css', 'utf8') + readFileSync(KIT + 'assets/kit.fn.css', 'utf8');
for (let n = 1; n <= 9; n++) {
  const D = `${V}ch${n}/`;
  if (!existsSync(D + 'narration.json')) continue;
  const N = JSON.parse(readFileSync(D + 'narration.json', 'utf8'));
  for (const d of ['assets/fonts', 'tools', 'compositions']) mkdirSync(D + d, { recursive: true });
  writeFileSync(D + 'assets/kit.css', css);
  copyFileSync(KIT + 'assets/kit.js', D + 'assets/kit.js');
  for (const f of readdirSync(KIT + 'assets/fonts')) copyFileSync(KIT + 'assets/fonts/' + f, D + 'assets/fonts/' + f);
  for (const f of readdirSync(KIT + 'tools')) copyFileSync(KIT + 'tools/' + f, D + 'tools/' + f);
  const id = `bluzbrothers-ch${n}`;
  const run = (c) => `npx --yes hyperframes@${HF} ${c}`;
  writeFileSync(D + 'package.json', JSON.stringify({ name: id, private: true, type: 'module', scripts: { dev: run('preview'), check: run('check'), render: run('render'), publish: run('publish') } }, null, 2) + '\n');
  writeFileSync(D + 'hyperframes.json', JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', registry: 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry', paths: { blocks: 'compositions', components: 'compositions/components', assets: 'assets' }, media: { autoProxy: true } }, null, 2) + '\n');
  writeFileSync(D + 'meta.json', JSON.stringify({ id, name: id, createdAt: '2026-10-07T12:00:00.000Z' }, null, 2) + '\n');
  writeFileSync(D + '.gitignore', 'renders/\nsnapshots/\n.hf*/\nassets/voice/\nvoice.json\n');
  if (!existsSync(D + 'index.html')) writeFileSync(D + 'index.html', readFileSync(KIT + 'index.tpl.html', 'utf8').replaceAll('{{TITLE}}', N.title).replaceAll('{{N}}', String(n)));
}
console.log('kit synced into ch1..ch9');
