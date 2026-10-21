// Copia el kit compartido (video/kit/) a cada bloque (video/bNN/ con narration.json) y escribe los archivos de proyecto.
// Las composiciones y narration.json son de cada bloque y nunca se tocan aquí; index.html solo se crea si falta.
//   node cursos/curso-v2/video/sync-kit.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const V = fileURLToPath(new URL('./', import.meta.url));
const KIT = V + 'kit/';
const HF = '0.8.139';
const css = readFileSync(KIT + 'assets/kit.base.css', 'utf8') + readFileSync(KIT + 'assets/kit.fn.css', 'utf8');
for (const dir of readdirSync(V).filter((d) => /^b\d\d$/.test(d))) {
  const n = +dir.slice(1);
  const D = `${V}${dir}/`;
  if (!existsSync(D + 'narration.json')) continue;
  const N = JSON.parse(readFileSync(D + 'narration.json', 'utf8'));
  for (const d of ['assets/fonts', 'tools', 'compositions']) mkdirSync(D + d, { recursive: true });
  writeFileSync(D + 'assets/kit.css', css);
  for (const f of ['kit.js', 'icons.js', 'dg.js', 'dg.css', 'clearview.js', 'casos.js', 'tiza.js', 'tiza.css']) copyFileSync(KIT + 'assets/' + f, D + 'assets/' + f);
  for (const f of readdirSync(KIT + 'assets/fonts')) copyFileSync(KIT + 'assets/fonts/' + f, D + 'assets/fonts/' + f);
  for (const f of readdirSync(KIT + 'tools')) copyFileSync(KIT + 'tools/' + f, D + 'tools/' + f);
  const id = `katarch-b${String(n).padStart(2, '0')}`;
  writeFileSync(D + 'package.json', JSON.stringify({ name: id, private: true, type: 'module', scripts: { check: `npx --yes hyperframes@${HF} check`, render: `npx --yes hyperframes@${HF} render -o renders/${id}.mp4 --quality looks --fps 30` } }, null, 2) + '\n');
  copyFileSync(KIT + 'hyperframes.json', D + 'hyperframes.json');
  writeFileSync(D + 'meta.json', JSON.stringify({ id, name: id, createdAt: '2026-10-17T12:00:00.000Z' }, null, 2) + '\n');
  writeFileSync(D + '.gitignore', 'renders/\nsnapshots/\n.hf*/\n');
  if (!existsSync(D + 'index.html')) writeFileSync(D + 'index.html', readFileSync(KIT + 'index.tpl.html', 'utf8').replaceAll('{{TITLE}}', N.title).replaceAll('{{ETIQUETA}}', n === 0 ? 'Apertura' : n === 16 ? 'Cierre' : `Bloque ${n}`));
  console.log(`${dir}: kit sincronizado`);
}
