// Builds the video edition's data, one JSON per course in src/video/courses/<slug>.json, from the course's
// HyperFrames projects: each chapter's sections (consecutive scenes sharing a kicker), its transcript (the narration
// with the voice's real timings), its captions (the player draws them; the render carries none) and its duration;
// and writes a WebP poster per chapter.
//
//   node scripts/build-video-data.mjs              → every course
//   node scripts/build-video-data.mjs curso        → one course
//
// Run it after re-rendering a chapter (the timings must be the ones the MP4 was rendered with).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const at = (p) => new URL(p, root);
const path = (p) => fileURLToPath(at(p));

/**
 * The courses with videos. `src`: the folder with chN/ projects. `ids`: the chapter slugs, in order.
 * `posterJpg(n)`: an already extracted poster (ArchColider's, from video/dist-prep.sh), else the poster is taken
 * from `render(n)` at the chapter's title card. `poster(n)`: where the site serves it.
 */
const COURSES = {
  curso: {
    src: 'cursos/curso-unico/video',
    ids: ['decisiones', 'cualidades', 'renuncias', 'fronteras', 'datos', 'comunicacion', 'fallos', 'datos-sensibles', 'comprar-o-construir', 'modelos', 'lo-escrito'],
    render: (n) => `cursos/curso-unico/video/ch${n}/renders/katarch-leccion${n}.mp4`,
    poster: (n) => `/video/leccion${n}.webp`,
    video: (n) => `leccion${n}.mp4`,
  },
};

/** The chapter's title card: the intro line that says "Capítulo N: …", once it is fully up. */
function titleMoment(T) {
  const intro = T.scenes[0];
  const title = intro.lines.find((l) => /Capítulo \d+:/.test(l.text)) ?? intro.lines.at(-1);
  const word = title.words?.find((w) => w.w === 'Capítulo' || w.w === 'Lección') ?? { s: title.start };
  return Math.min(word.s + 2.2, intro.end - 0.8);
}

function build(slug, C) {
  mkdirSync(at('src/video/courses'), { recursive: true });
  const chapters = C.ids.map((id, i) => {
    const n = i + 1;
    const dir = `${C.src}/ch${n}/`;
    const narration = JSON.parse(readFileSync(at(dir + 'narration.json'), 'utf8'));
    const ctx = { window: {} };
    vm.runInNewContext(readFileSync(at(dir + 'timing.js'), 'utf8'), ctx);
    const T = ctx.window.TIMING;
    if (T.mode !== 'voice') throw new Error(`${slug} ch${n}: timing.js is not in voice mode`);

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

    // poster: an extracted JPG when the course has one, else a frame of the render at the title card
    const webp = `public${C.poster(n)}`;
    mkdirSync(new URL('.', at(webp)), { recursive: true });
    const jpg = C.posterJpg?.(n);
    if (jpg && existsSync(at(jpg))) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path(jpg), '-vf', 'scale=960:-1', '-q:v', '78', path(webp)]);
    else if (C.render && existsSync(at(C.render(n)))) execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', titleMoment(T).toFixed(2), '-i', path(C.render(n)), '-frames:v', '1', '-vf', 'scale=960:-1', '-q:v', '78', path(webp)]);

    return {
      id,
      number: n,
      title: narration.title.replace(/^Capítulo \d+ · /, ''),
      duration: Math.round(T.duration),
      video: C.video(n),
      poster: C.poster(n),
      sections,
      transcript,
      captions,
    };
  });
  writeFileSync(at(`src/video/courses/${slug}.json`), JSON.stringify(chapters, null, 1) + '\n');
  console.log(`== ${slug}`);
  console.log(chapters.map((c) => `${String(c.number).padStart(2)} ${c.title.padEnd(48)} ${Math.floor(c.duration / 60)}:${String(c.duration % 60).padStart(2, '0')}  ${c.sections.length} secciones · ${c.transcript.length} frases`).join('\n'));
}

const only = process.argv[2];
for (const [slug, C] of Object.entries(COURSES)) if (!only || only === slug) build(slug, C);
