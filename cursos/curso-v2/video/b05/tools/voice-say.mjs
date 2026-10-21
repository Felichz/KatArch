// Voz de BORRADOR con la voz del sistema (macOS `say` + `afconvert`), una toma por línea, para ver el bloque completo
// con voz y tiempos reales antes de la voz de producción (tools/voice.mjs, ElevenLabs). Escribe assets/voice/*.m4a y
// voice.json con el mismo formato que voice.mjs, así timing.mjs no distingue de dónde vino la voz.
//   node tools/voice-say.mjs [voz] [palabras por minuto]      (por defecto: Paulina, 150)
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const here = (p) => fileURLToPath(new URL('../' + p, import.meta.url));
const N = JSON.parse(readFileSync(here('narration.json'), 'utf8'));
const VOICE = process.argv[2] ?? 'Paulina', RATE = process.argv[3] ?? '150';
mkdirSync(here('assets/voice'), { recursive: true });
const dur = (f) => +execFileSync('afinfo', [f]).toString().match(/estimated duration: ([\d.]+)/)[1];
/** Words spread over the take in proportion to their length, with a little weight on punctuation pauses. */
function spread(text, total) {
  const ws = text.split(/\s+/).filter(Boolean);
  const weight = (w) => w.replace(/[^\p{L}\p{N}]/gu, '').length + 1 + (/[.,;:?!]$/.test(w) ? 4 : 0);
  const sum = ws.reduce((a, w) => a + weight(w), 0), lead = 0.08, usable = Math.max(0.1, total - 0.25);
  let acc = 0;
  return ws.map((w) => { const s = lead + (acc / sum) * usable; acc += weight(w); const e = lead + ((acc - (/[.,;:?!]$/.test(w) ? 4 : 0)) / sum) * usable; return { w, s: +s.toFixed(3), e: +e.toFixed(3) }; });
}
const out = { voice: VOICE, engine: 'macos-say', scenes: {} };
for (const sc of N.scenes) {
  const segments = [], lines = [];
  sc.lines.forEach((ln, i) => {
    const base = `assets/voice/${sc.id}-${i}`;
    const aiff = here(base + '.aiff'), m4a = here(base + '.m4a');
    const text = ln.say ?? ln.text;
    execFileSync('say', ['-v', VOICE, '-r', RATE, '-o', aiff, text]);
    if (existsSync(m4a)) rmSync(m4a);
    execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', aiff, m4a]);
    rmSync(aiff);
    const d = dur(m4a);
    segments.push({ file: base + '.m4a', duration: +d.toFixed(3), first: i, last: i, from: 0 });
    lines.push({ words: spread(text, d) });
  });
  out.scenes[sc.id] = { segments, lines };
  process.stdout.write(`${sc.id} `);
}
writeFileSync(here('voice.json'), JSON.stringify(out) + '\n');
console.log(`\nvoz de borrador (${VOICE}) para ${N.scenes.length} escenas`);
