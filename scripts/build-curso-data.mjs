// Datos del sitio para los bloques del curso v2 que ya tienen video (cursos/curso-v2/video/bNN/renders/katarch-bNN.mp4):
// secciones (una por escena), transcripción y subtítulos con los tiempos reales de la voz, duración y una miniatura.
// Escribe src/curso/bloques.json y public/curso/bNN.webp, y copia el MP4 a public/local-video/curso/ (ignorado por git)
// para verlo en local con PUBLIC_LOCAL_VIDEO=curso. Necesita ffmpeg en el PATH.
//   node scripts/build-curso-data.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const at = (p) => fileURLToPath(new URL('../' + p, import.meta.url));
const SRC = 'cursos/curso-v2/video';
const r2 = (x) => +x.toFixed(2);
const out = {};
for (const dir of readdirSync(at(SRC)).filter((d) => /^b\d\d$/.test(d)).sort()) {
  const D = `${SRC}/${dir}/`;
  const mp4 = `${D}renders/katarch-${dir}.mp4`;
  if (!existsSync(at(mp4)) || !existsSync(at(D + 'timing.js'))) continue;
  const N = JSON.parse(readFileSync(at(D + 'narration.json'), 'utf8'));
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(at(D + 'timing.js'), 'utf8'), ctx);
  const T = ctx.window.TIMING;
  if (!N.slug) throw new Error(`${dir}: narration.json no tiene slug (guion-a-narracion.mjs <guion> <carpeta> <slug>)`);
  const sections = T.scenes.map((sc) => ({ title: sc.kicker, start: r2(sc.start) }));
  const transcript = T.scenes.flatMap((sc) => sc.lines.map((ln) => ({ start: r2(ln.start), end: r2(ln.end), text: ln.text })));
  // subtítulos: tramos de una o dos filas cortados en la puntuación; cada palabra con el momento en que se dice
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
  const captions = chunks.map((ws, k) => {
    const next = chunks[k + 1];
    return { start: r2(ws[0].s - 0.15), end: r2(Math.min(next ? next[0].s - 0.15 : Infinity, ws.at(-1).e + 1.1)), words: ws.map((w) => [w.w, r2(w.s)]) };
  });
  // miniatura: el cuadro donde la primera escena ya tiene su diagrama armado
  mkdirSync(at('public/curso'), { recursive: true });
  const poster = `/curso/${dir}.webp`;
  const when = Math.min(T.scenes[0].end - 2, T.scenes[0].start + 25);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', when.toFixed(2), '-i', at(mp4), '-frames:v', '1', '-vf', 'scale=960:-1', '-q:v', '80', at('public' + poster)]);
  mkdirSync(at('public/local-video/curso'), { recursive: true });
  copyFileSync(at(mp4), at(`public/local-video/curso/${dir}.mp4`));
  out[N.slug] = { duration: Math.round(T.duration), video: `curso/${dir}.mp4`, poster, voz: T.mode === 'voice' ? N.voice ?? 'voz' : 'estimada', sections, transcript, captions };
  console.log(`${dir}: ${Math.floor(T.duration / 60)}:${String(Math.round(T.duration % 60)).padStart(2, '0')} · ${sections.length} secciones · ${captions.length} subtítulos`);
}
writeFileSync(at('src/curso/bloques.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`${Object.keys(out).length} bloque(s) con video → src/curso/bloques.json`);
