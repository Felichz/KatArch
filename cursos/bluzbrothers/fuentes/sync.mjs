// Checks that GUION.md and video/chN/narration.json say the same thing, line by line, and prints each
// chapter's numbers (scenes, lines, caption words, spoken words, estimate at 2.2 words/s plus written pauses).
// narration.json is the source of truth for the text; GUION.md repeats it with a visual note per scene.
//
//   node cursos/bluzbrothers/fuentes/sync.mjs          → check and print stats (exit 1 on any mismatch)
//
// GUION.md line format (inside "### Guion" of each chapter):
//   N. <text> · *say:* «<say>» · *pausa X s*
import { readFileSync } from 'node:fs';
const ROOT = new URL('../', import.meta.url);
const G = readFileSync(new URL('GUION.md', ROOT), 'utf8');
const words = (s) => s.split(/\s+/).filter(Boolean).length;
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
let bad = 0, total = 0;
for (let n = 1; n <= 9; n++) {
  const N = JSON.parse(readFileSync(new URL(`video/ch${n}/narration.json`, ROOT), 'utf8'));
  const start = G.indexOf(`\n## Capítulo ${n} ·`);
  const end = n < 9 ? G.indexOf(`\n## Capítulo ${n + 1} ·`) : G.length;
  const chap = G.slice(start, end);
  const gScenes = [...chap.matchAll(/^#### `([^`]+)`[^\n]*\n([\s\S]*?)(?=^#### |\n---|$(?![\s\S]))/gm)].map((m) => ({ id: m[1], lines: [...m[2].matchAll(/^\d+\. (.*)$/gm)].map((x) => x[1]) }));
  const ids = N.scenes.map((s) => s.id).join(',');
  if (gScenes.map((s) => s.id).join(',') !== ids) { console.log(`ch${n}: scene ids differ\n  json: ${ids}\n  guion: ${gScenes.map((s) => s.id).join(',')}`); bad++; }
  let cw = 0, sw = 0, pauses = 0, nl = 0;
  N.scenes.forEach((sc) => {
    const g = gScenes.find((x) => x.id === sc.id);
    sc.lines.forEach((ln, i) => {
      nl++; cw += words(ln.text); sw += words(ln.say ?? ln.text); pauses += ln.pauseAfter ?? 0;
      let want = ln.text;
      if (ln.say) want += ` · *say:* «${ln.say}»`;
      if (ln.pauseAfter) want += ` · *pausa ${String(ln.pauseAfter).replace('.', ',')} s*`;
      const got = g?.lines[i];
      if (got !== want) { console.log(`ch${n} ${sc.id}[${i}] differs\n  json:  ${want}\n  guion: ${got}`); bad++; }
    });
    if (g && g.lines.length !== sc.lines.length) { console.log(`ch${n} ${sc.id}: ${sc.lines.length} lines in json, ${g.lines.length} in GUION`); bad++; }
  });
  const est = sw / 2.2 + pauses;
  total += est;
  console.log(`ch${n} · ${N.scenes.length} escenas, ${nl} líneas, ${cw} palabras de subtítulo (${sw} habladas) · ${fmt(sw / 2.2)} de voz + ${pauses.toFixed(1)} s de pausas = ${fmt(est)}`);
}
console.log(`total ${fmt(total)}`);
if (bad) { console.log(`${bad} mismatches`); process.exit(1); }
console.log('GUION.md and narration.json are in sync');
