// Builds timing.js (window.TIMING) from narration.json and stamps the scene windows into index.html.
//
//   node tools/timing.mjs                 → with voice.json (tools/voice.mjs): one ElevenLabs clip per line, laid
//                                           end to end, words timed from the voice itself; without it, estimated
//                                           timing that simulates a calm narrator
//   node tools/timing.mjs estimate        → force the estimate
//   node tools/timing.mjs transcript.json assets/narration.mp3
//                                         → real timing, aligned to a word-level transcript of the voiceover
//                                           (npx hyperframes transcribe assets/narration.mp3 --model small --language es),
//                                           and the voice track mounted in index.html
//
// Every animation in index.html is anchored to a scene, a line or a word of the narration, never to a
// hard-coded second, so re-running this after the voice exists re-times the whole video.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const here = (p) => new URL('../' + p, import.meta.url);
const N = JSON.parse(readFileSync(here('narration.json'), 'utf8'));
const arg = process.argv[2];
const transcriptPath = arg && arg !== 'estimate' ? arg : null;
const audioPath = process.argv[3];
const VO = !arg && existsSync(here('voice.json')) ? JSON.parse(readFileSync(here('voice.json'), 'utf8')) : null;
const mode = VO ? 'voice' : transcriptPath ? 'transcript' : 'estimated';

// pacing of the simulated narrator
const CPS = 14.5; // spoken characters per second
const PAUSE = { ',': 0.2, ';': 0.3, ':': 0.32, '.': 0.42, '?': 0.45, '!': 0.42 };
const LINE_GAP = 0.5, SCENE_GAP = 1.1, LEAD_IN = 1.4, TAIL = 3.2;
const SCENE_LEAD = 0.7, XFADE = 0.7; // a scene arrives a little before its first line, and overlaps the previous one

const words = (s) => s.split(/\s+/).filter(Boolean);
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');

/** Spreads a line's caption words over [start, end], weighted by length and by the pause after punctuation. */
function spread(text, start, end) {
  const ws = words(text);
  const weight = ws.map((w) => w.length + 1.5 + (PAUSE[w.at(-1)] ?? 0) * CPS);
  const total = weight.reduce((a, b) => a + b, 0);
  let t = start;
  return ws.map((w, i) => {
    const d = ((end - start) * weight[i]) / total;
    const speak = d - (PAUSE[w.at(-1)] ?? 0) * ((end - start) / (total / CPS)); // the pause is silence, not the word
    const out = { w, s: +t.toFixed(3), e: +(t + Math.max(0.12, speak)).toFixed(3) };
    t += d;
    return out;
  });
}

function estimate() {
  let t = LEAD_IN;
  return N.scenes.map((sc, si) => {
    if (si > 0) t += SCENE_GAP - LINE_GAP;
    const lines = sc.lines.map((ln) => {
      const spoken = ln.say ?? ln.text;
      const pauses = [...spoken].reduce((a, ch) => a + (PAUSE[ch] ?? 0), 0) - (PAUSE[spoken.trim().at(-1)] ?? 0);
      const dur = spoken.replace(/[^\p{L}\p{N}]/gu, '').length / CPS + words(spoken).length * 0.035 + pauses;
      const out = { text: ln.text, start: +t.toFixed(3), end: +(t + dur).toFixed(3) };
      t += dur + LINE_GAP + (ln.pauseAfter ?? 0); // a deliberate silence, e.g. to let the viewer think
      return out;
    });
    return { id: sc.id, kicker: sc.kicker, lines };
  });
}

/** Lays the generated clips end to end; every word's time comes from the voice's own character timestamps. */
function fromClips() {
  const GAP = 0.32, SGAP = 0.95;
  let t = LEAD_IN;
  return N.scenes.map((sc, si) => {
    if (si > 0) t += SGAP - GAP;
    const lines = sc.lines.map((ln, li) => {
      const c = VO.clips[`${sc.id}-${li}`];
      if (!c) throw new Error(`no clip for ${sc.id}-${li}: run tools/voice.mjs`);
      const start = +t.toFixed(3);
      const out = { text: ln.text, start, end: +(start + c.speech).toFixed(3), clip: { file: c.file, start, duration: c.duration } };
      if (!ln.say) out.words = c.words.map((w, i) => ({ w: words(ln.text)[i] ?? w.w, s: +(start + w.s).toFixed(3), e: +(start + w.e).toFixed(3) }));
      else {
        // the caption (digits) and the spoken text (numbers in letters) differ: map by relative position in the line
        const sayLen = c.words.reduce((a, w) => a + w.w.length + 1, 0);
        const at = (f) => { let acc = 0; for (const w of c.words) { const n = w.w.length + 1; if (acc + n >= f * sayLen) return w.s + ((f * sayLen - acc) / n) * (w.e - w.s); acc += n; } return c.words.at(-1).e; };
        const cw = words(ln.text), len = cw.reduce((a, w) => a + w.length + 1, 0);
        let acc = 0;
        out.words = cw.map((w) => { const s0 = at(acc / len), e0 = at((acc + w.length) / len); acc += w.length + 1; return { w, s: +(start + s0).toFixed(3), e: +(start + e0).toFixed(3) }; });
      }
      t = start + c.speech + GAP + (ln.pauseAfter ?? 0);
      return out;
    });
    return { id: sc.id, kicker: sc.kicker, lines };
  });
}

/** Aligns the script to a whisper-style transcript ([{text,start,end}]) with a token-level edit-distance pass. */
function align(transcript) {
  const script = [];
  N.scenes.forEach((sc, si) => sc.lines.forEach((ln, li) => words(ln.say ?? ln.text).forEach((w) => { const n = norm(w); if (n) script.push({ n, si, li }); })));
  const heard = transcript.flatMap((x) => words(x.text).map((w) => ({ n: norm(w), start: x.start, end: x.end }))).filter((x) => x.n);
  const A = script.length, B = heard.length;
  const D = Array.from({ length: A + 1 }, (_, i) => Int32Array.from({ length: B + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= A; i++) for (let j = 1; j <= B; j++)
    D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (script[i - 1].n === heard[j - 1].n ? 0 : 1));
  const hit = new Array(A).fill(null);
  for (let i = A, j = B; i > 0 && j > 0;) {
    if (D[i][j] === D[i - 1][j - 1] + (script[i - 1].n === heard[j - 1].n ? 0 : 1)) { hit[i - 1] = heard[j - 1]; i--; j--; }
    else if (D[i][j] === D[i - 1][j] + 1) i--;
    else j--;
  }
  return N.scenes.map((sc, si) => ({
    id: sc.id,
    kicker: sc.kicker,
    lines: sc.lines.map((ln, li) => {
      const got = script.map((s, k) => (s.si === si && s.li === li ? hit[k] : null)).filter(Boolean);
      if (!got.length) throw new Error(`no audio matched for ${sc.id} line ${li}: "${ln.text}"`);
      return { text: ln.text, start: +(got[0].start + LEAD_IN).toFixed(3), end: +(got.at(-1).end + LEAD_IN).toFixed(3) }; // the voice starts after the lead-in
    }),
  }));
}

const scenes = VO ? fromClips() : transcriptPath ? align(JSON.parse(readFileSync(transcriptPath, 'utf8'))) : estimate();
const last = scenes.at(-1).lines.at(-1);
const duration = +(last.end + TAIL).toFixed(2);
scenes.forEach((sc, i) => {
  sc.start = i === 0 ? 0 : +Math.max(0, sc.lines[0].start - SCENE_LEAD).toFixed(3);
  sc.lines.forEach((ln) => (ln.words ??= spread(ln.text, ln.start, ln.end)));
});
scenes.forEach((sc, i) => (sc.end = i === scenes.length - 1 ? duration : +(scenes[i + 1].start + XFADE).toFixed(3)));

writeFileSync(here('timing.js'), `/* generated by tools/timing.mjs from narration.json (${mode}) */\nwindow.TIMING = ${JSON.stringify({ duration, mode, scenes })};\n`);

// stamp the windows into the composition: the root's length and every scene clip's start and duration
let html = readFileSync(here('index.html'), 'utf8');
html = html.replace(/(id="root"[\s\S]*?data-duration=")[^"]*"/, `$1${duration}"`);
for (const id of ['chrome', 'captions']) html = html.replace(new RegExp(`(id="${id}"[^>]*?data-duration=")[^"]*"`), `$1${duration}"`);
for (const sc of scenes) {
  const re = new RegExp(`(<section[^>]*data-scene="${sc.id}"[^>]*?)data-start="[^"]*"\\s+data-duration="[^"]*"`);
  if (!re.test(html)) throw new Error('no scene clip in index.html for ' + sc.id);
  html = html.replace(re, `$1data-start="${sc.start}" data-duration="${+(sc.end - sc.start).toFixed(3)}"`);
}
// the voiceover: one <audio> starting after the lead-in (the transcript's times are relative to the file)
html = html.replace(/\s*<audio id="voice"[^>]*><\/audio>/, '').replace(/\s*<!-- voice -->[\s\S]*?<!-- \/voice -->/, '');
if (VO) {
  const tags = scenes.flatMap((sc) => sc.lines.map((ln, i) => `        <audio id="vo-${sc.id}-${i}" src="${ln.clip.file}" data-start="${ln.clip.start}" data-duration="${ln.clip.duration}" data-track-index="10"></audio>`));
  html = html.replace('<div id="captions"', `<!-- voice -->\n      <div id="voiceover">\n${tags.join('\n')}\n      </div>\n      <!-- /voice -->\n      <div id="captions"`);
} else if (audioPath) html = html.replace('<div id="captions"', `<audio id="voice" src="${audioPath}" data-start="${LEAD_IN}" data-track-index="10" data-volume="1"></audio>
      <div id="captions"`);
writeFileSync(here('index.html'), html);
console.log(`${scenes.length} scenes · ${scenes.reduce((a, s) => a + s.lines.length, 0)} lines · ${duration}s (${mode})`);

// the text to paste into ElevenLabs: what the voice says (numbers spelled out), one paragraph per scene
writeFileSync(here('narration.txt'), N.scenes.map((sc) => sc.lines.map((ln) => ln.say ?? ln.text).join(' ')).join('\n\n') + '\n');
