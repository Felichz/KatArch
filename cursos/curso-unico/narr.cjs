// Builds video/chN/narration.json from guion/leccionN.md.
// The script: "# Title", then one "## Kicker {#scene-id}" per scene with its paragraphs, and optionally a final
// "## Notas de verificación" (ignored). Lines pack up to 2 sentences / 38 words; 0.8 s between paragraphs.
// text = say (a subtitle can later show digits through `text`, keeping `say` untouched).
//   node narr.cjs 1 2 3 …
const fs = require('fs');
const ROOT = __dirname.split(String.fromCharCode(92)).join('/');
const VOICE = { voice: 'Pablo Macias (es-MX), calmo y claro, ritmo de clase', voiceId: '68nvxRVrtyK9nd4hTKmR', voiceModel: 'eleven_v4', voiceSettings: { stability: 0.5, similarity_boost: 0.8, style: 0.1, use_speaker_boost: true } };
const MAXW = 38;
const words = (s) => s.split(/\s+/).filter(Boolean).length;
for (const n of process.argv.slice(2).map(Number)) {
  const md = fs.readFileSync(`${ROOT}/guion/leccion${n}.md`, 'utf8').replace(/\r/g, '');
  const title = md.match(/^# (.*)$/m)[1].trim();
  const body = md.split(/\n## Notas de verificaci/)[0];
  const scenes = [];
  let cur = null;
  for (const block of body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)) {
    if (block.startsWith('# ')) continue;
    const h = block.match(/^## (.+?)\s*\{#([a-z0-9-]+)\}\s*$/);
    if (h) { cur = { id: h[2], kicker: h[1], lines: [] }; scenes.push(cur); continue; }
    if (block.startsWith('#') || block.startsWith('>') || block === '---') continue;
    if (!cur) throw new Error(`leccion${n}: text before the first scene: ${block.slice(0, 60)}`);
    const sents = block.replace(/\s+/g, ' ').split(/(?<=[.?!…»])\s+(?=[A-ZÁÉÍÓÚÑ¿«])/);
    let line = [];
    for (const s of sents) {
      if (line.length && (line.length >= 2 || words(line.join(' ') + ' ' + s) > MAXW)) { cur.lines.push({ text: line.join(' ') }); line = []; }
      line.push(s);
    }
    if (line.length) cur.lines.push({ text: line.join(' ') });
    cur.lines.at(-1).pauseAfter = 0.8;
  }
  for (const sc of scenes) delete sc.lines.at(-1).pauseAfter;
  const N = { title, chapter: n, ...VOICE, scenes };
  fs.mkdirSync(`${ROOT}/video/ch${n}`, { recursive: true });
  fs.writeFileSync(`${ROOT}/video/ch${n}/narration.json`, JSON.stringify(N, null, 2) + '\n');
  const tot = scenes.reduce((a, s) => a + s.lines.reduce((b, l) => b + words(l.text), 0), 0);
  console.log(`ch${n}: ${scenes.length} scenes, ${tot} words (~${(tot / 2.6 / 60 + scenes.length * 0.03).toFixed(1)} min) · ${scenes.map((s) => `${s.id}(${s.lines.reduce((a, l) => a + words(l.text), 0)}w)`).join(' ')}`);
}
