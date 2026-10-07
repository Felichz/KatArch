// Builds src/video/chapters.json for the video edition from the HyperFrames projects in video/chN:
// each chapter's sections (consecutive scenes sharing a kicker), its transcript (the narration with the
// voice's real timings), its captions (the player draws them; the render carries none) and its duration; and writes a WebP poster per chapter into public/video/.
//
//   node scripts/build-video-data.mjs
//
// Run it after re-rendering a chapter (the timings must be the ones the MP4 was rendered with).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const at = (p) => new URL(p, root);
const IDS = ['terreno', 'podio', 'principios', 'estilo', 'dominio', 'concurrencia', 'suscriptor', 'infraestructura', 'costos', 'mapa', 'guia'];

mkdirSync(at('src/video'), { recursive: true });
mkdirSync(at('public/video'), { recursive: true });

const chapters = IDS.map((id, i) => {
  const n = i + 1;
  const dir = `video/ch${n}/`;
  const narration = JSON.parse(readFileSync(at(dir + 'narration.json'), 'utf8'));
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(at(dir + 'timing.js'), 'utf8'), ctx);
  const T = ctx.window.TIMING;
  if (T.mode !== 'voice') throw new Error(`ch${n}: timing.js is not in voice mode`);

  // sections: consecutive scenes with the same kicker read as one section; the intro scene keeps "Introducción"
  const sections = [];
  T.scenes.forEach((sc, k) => {
    const title = k === 0 ? 'Introducción' : sc.kicker;
    if (!sections.length || sections.at(-1).title !== title) sections.push({ title, start: +sc.start.toFixed(2) });
  });

  const transcript = T.scenes.flatMap((sc) => sc.lines.map((ln) => ({ start: +ln.start.toFixed(2), end: +ln.end.toFixed(2), text: ln.text })));

  // captions: chunks of one or two rows, cut at punctuation; each word keeps the moment it is spoken
  const chunks = [];
  T.scenes.forEach((sc) => sc.lines.forEach((ln) => {
    let cur = [];
    const flush = () => { if (cur.length) chunks.push(cur); cur = []; };
    ln.words.forEach((w, i) => {
      cur.push(w);
      const len = cur.map((x) => x.w).join(' ').length;
      const soft = /[,;:]$/.test(w.w) && len > 46, hard = /[.?!”]$/.test(w.w) && len > 30;
      const rest = ln.words.slice(i + 1).map((x) => x.w).join(' ').length;
      if ((soft || hard || len > 84) && rest > 24) flush();
    });
    flush();
  }));
  const r2 = (x) => +x.toFixed(2);
  const captions = chunks.map((ws, k) => {
    const next = chunks[k + 1];
    return { start: r2(ws[0].s - 0.15), end: r2(Math.min(next ? next[0].s - 0.15 : Infinity, ws.at(-1).e + 1.1)), words: ws.map((w) => [w.w, r2(w.s)]) };
  });

  // poster: the chapter's title card, already extracted by video/dist-prep.sh
  const jpg = `video/dist/cap${n}.jpg`;
  const webp = `public/video/cap${n}.webp`;
  if (existsSync(at(jpg))) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', new URL(jpg, root).pathname.replace(/^\/([A-Z]:)/, '$1'), '-vf', 'scale=960:-1', '-q:v', '78', new URL(webp, root).pathname.replace(/^\/([A-Z]:)/, '$1')]);

  return {
    id,
    number: n,
    title: narration.title.replace(/^Capítulo \d+ · /, ''),
    duration: Math.round(T.duration),
    video: `cap${n}.mp4`,
    poster: `/video/cap${n}.webp`,
    sections,
    transcript,
    captions,
  };
});

writeFileSync(at('src/video/chapters.json'), JSON.stringify(chapters, null, 1) + '\n');
console.log(chapters.map((c) => `${String(c.number).padStart(2)} ${c.title.padEnd(38)} ${Math.floor(c.duration / 60)}:${String(c.duration % 60).padStart(2, '0')}  ${c.sections.length} secciones · ${c.transcript.length} frases`).join('\n'));
