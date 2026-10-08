// Copies the course's single kit into every chapter and writes each chapter's scaffolding.
//
//   node video/kit/sync.mjs          → all chapters (ch1..ch8)
//   node video/kit/sync.mjs 3 5      → only those chapters
//
// The kit (kit.css, kit.js, fonts, tools/*.mjs) lives once, here; chapters get copies, so each one is a
// self-contained HyperFrames project. Edit the kit here, never in a chapter, and sync again.
// index.html is rewritten from the template: run `node tools/timing.mjs estimate` (or with voice) afterwards.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';

const KIT = new URL('./', import.meta.url);
const VIDEO = new URL('../', import.meta.url);
const HF = '0.8.139'; // same pinned CLI as KatArch's chapters
const only = process.argv.slice(2).map(Number);
const chapters = (only.length ? only : [1, 2, 3, 4, 5, 6, 7, 8]);

const copy = (from, to) => copyFileSync(new URL(from, KIT), to);

for (const n of chapters) {
  const dir = new URL(`ch${n}/`, VIDEO);
  const N = JSON.parse(readFileSync(new URL('narration.json', dir), 'utf8'));
  const title = N.title.replace(/^Capítulo \d+ · /, '');
  for (const d of ['assets/fonts', 'tools', 'compositions']) mkdirSync(new URL(d, dir), { recursive: true });
  copy('kit.css', new URL('assets/kit.css', dir));
  copy('kit.js', new URL('assets/kit.js', dir));
  for (const f of ['inter-latin-opsz-normal.woff2', 'jetbrains-mono-latin-wght-normal.woff2']) copy('fonts/' + f, new URL('assets/fonts/' + f, dir));
  for (const f of ['timing.mjs', 'voice.mjs', 'icons.mjs']) copy('tools/' + f, new URL('tools/' + f, dir));

  const id = `zaitects-ch${n}`;
  writeFileSync(new URL('package.json', dir), JSON.stringify({ name: id, private: true, type: 'module', scripts: { dev: `npx --yes hyperframes@${HF} preview`, check: `npx --yes hyperframes@${HF} check`, render: `npx --yes hyperframes@${HF} render`, publish: `npx --yes hyperframes@${HF} publish` } }, null, 2) + '\n');
  writeFileSync(new URL('hyperframes.json', dir), JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', registry: 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry', paths: { blocks: 'compositions', components: 'compositions/components', assets: 'assets' }, media: { autoProxy: true } }, null, 2) + '\n');
  if (!existsSync(new URL('meta.json', dir))) writeFileSync(new URL('meta.json', dir), JSON.stringify({ id, name: id, createdAt: '2026-10-07T05:00:00.000Z' }, null, 2) + '\n');
  writeFileSync(new URL('.gitignore', dir), 'renders/\nsnapshots/\n.hf*/\nassets/voice/\nvoice.json\n');
  writeFileSync(new URL('index.html', dir), indexHtml(n, title));
  console.log(`ch${n} synced · ${N.scenes.length} scenes · ${title}`);
}

function indexHtml(n, title) {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>KatArch · ZAItects · Capítulo ${n} · ${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <!-- generated: the narration's timing (tools/timing.mjs) and the Lucide icons (tools/icons.mjs) -->
    <script src="timing.js"></script>
    <script src="assets/icons.js"></script>
    <script src="assets/kit.js"></script>
    <link rel="stylesheet" href="assets/kit.css" />
    <style>
      @font-face {
        font-family: 'Inter KA';
        src: url('assets/fonts/inter-latin-opsz-normal.woff2') format('woff2');
        font-weight: 100 900;
        font-display: block;
      }
      @font-face {
        font-family: 'JetBrains KA';
        src: url('assets/fonts/jetbrains-mono-latin-wght-normal.woff2') format('woff2');
        font-weight: 100 800;
        font-display: block;
      }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #07090d; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: 'Inter KA', 'Segoe UI', sans-serif; color: #e8ecf2; -webkit-font-smoothing: antialiased; }
      #root > div[data-composition-src] { position: absolute; inset: 0; }
      .clip { position: absolute; inset: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="60" data-width="1920" data-height="1080" data-fps="30">
      <!-- the scene slots and the voice clips are laid out by tools/timing.mjs -->
      <!-- film -->
      <!-- /film -->

      <div id="chrome" class="clip" data-start="0" data-duration="60" data-track-index="8">
        <div class="progress"><span class="progress__fill" id="progress"></span></div>
        <div class="brand"><span class="brand__mark"></span>KatArch <span class="brand__ch">· ZAItects · Capítulo ${n}</span></div>
        <div class="kickers" id="kickers"></div>
      </div>
      <div id="captions" class="clip" data-start="0" data-duration="60" data-track-index="9"></div>
    </div>

    <script>
      const tl = gsap.timeline({ paused: true });
      KIT.film(tl);
      window.__timelines['main'] = tl;
    </script>
  </body>
</html>
`;
}
