// Arma narration.en.json de un bloque a partir de su traducción legible, video/bNN/narration.en.md:
//   # Título
//   ## idDeEscena · Título de la sección
//   Un párrafo por línea de voz, en el mismo orden que el español (y, en lo posible, las mismas oraciones).
// Las pausas (pauseAfter) se copian del narration.json español, línea por línea.
//   node cursos/curso-v2/tools/ingles.mjs cursos/curso-v2/video/bNN [más bloques…]
import { readFileSync, writeFileSync } from 'node:fs';
for (const dir of process.argv.slice(2)) {
  const ES = JSON.parse(readFileSync(`${dir}/narration.json`, 'utf8'));
  const md = readFileSync(`${dir}/narration.en.md`, 'utf8').replace(/\r\n/g, '\n');
  const title = md.match(/^# (.+)$/m)[1].trim();
  const scenes = md.split(/^## /m).slice(1).map((part) => {
    const [head, ...body] = part.split('\n');
    const [id, kicker] = head.split(' · ').map((s) => s.trim());
    const es = ES.scenes.find((s) => s.id === id);
    if (!es) throw new Error(`${dir}: la escena ${id} no está en narration.json`);
    const paras = body.join('\n').trim().split(/\n\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim());
    if (paras.length !== es.lines.length) throw new Error(`${dir} · ${id}: ${paras.length} párrafos en inglés, ${es.lines.length} en español`);
    return { id, kicker, lines: paras.map((text, i) => ({ text, ...(es.lines[i].pauseAfter ? { pauseAfter: es.lines[i].pauseAfter } : {}) })) };
  });
  const missing = ES.scenes.filter((s) => !scenes.some((x) => x.id === s.id)).map((s) => s.id);
  if (missing.length) throw new Error(`${dir}: faltan escenas en inglés: ${missing.join(', ')}`);
  const N = { title, slug: ES.slug, chapter: ES.chapter, lang: 'en', ...(ES.leadIn ? { leadIn: ES.leadIn } : {}), scenes: ES.scenes.map((s) => scenes.find((x) => x.id === s.id)) };
  writeFileSync(`${dir}/narration.en.json`, JSON.stringify(N, null, 2) + '\n');
  console.log(`${dir}: ${scenes.length} escenas → narration.en.json`);
}
