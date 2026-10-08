# Stage 3 brief: build the HyperFrames videos for a course (no render, no voice)

Each course in `cursos/<slug>/` already has `HISTORIA.md` (the team's process reconstructed from git), `GUION.md` (course plan, per-chapter audit and full script with a visual note per scene) and `video/chN/narration.json` (the script in KatArch's schema). Your job is to turn every chapter into a HyperFrames project.

## Reference (read-only)
KatArch's video chapters at `/Users/felixandersson/dev/felichz/KatArch/video`:
- `PEDAGOGY.md`: binding rules. Principle 8 matters most here: what the voice says is on screen when it says it, about 3 words/s of reading time, nothing appears and leaves before it can be read.
- `ch1/CLAUDE.md`: HyperFrames rules (data-start, one paused root timeline per composition on window.__timelines, deterministic only).
- `ch10/`, `ch11/`: the latest kit (`assets/kit.css`, `assets/kit.js`, fonts) and tools (`tools/timing.mjs`, `tools/voice.mjs`, `tools/icons.mjs`). Read several compositions in ch5, ch9, ch11 to learn the house style: dark theme, a fixed color alphabet (blue commands, green events, violet stateful, dashed grey external, red failures, orange accent), and animations anchored to words of the narration (e.g. `W(i, 'palabra')` via kit.js + timing.js), plus the "piénsalo tú" countdown ring.

## Per chapter, `cursos/<slug>/video/chN/` is a full project mirroring KatArch's chapter layout
package.json (same pinned hyperframes version), hyperframes.json, meta.json, .gitignore, index.html, assets/ (kit.css, kit.js, fonts, icons.js), tools/ (timing.mjs, voice.mjs, icons.mjs; adjust only what is chapter-specific), compositions/<sceneId>.html (one per scene in narration.json), README.md (like KatArch's chapter READMEs: what the chapter is, scene table, voice pending, commands). Keep ONE shared kit consistent across the course's chapters (a master copy in `video/kit/` synced into each chapter is fine).

Redraw the team's diagrams natively per the visual notes. Team images (board photos, original diagrams) only sparingly, when the scene is literally "look at their original", copied into assets/ and credited. Never embed third-party images.

## Then, per chapter
1. `node tools/timing.mjs estimate` (writes timing.js, narration.txt and lays out index.html).
2. Icons: `tools/icons.mjs` needs react, react-dom and lucide-react, installed at `/Users/felixandersson/dev/felichz/KatArch-katas/node_modules` (run it from a path that resolves there, or via NODE_PATH).
3. `npm run check` (npx hyperframes check: lint, runtime, layout, contrast). Fix all errors; review warnings. If check cannot run here, say so explicitly and run `npx hyperframes lint` at least.
4. If the CLI can snapshot single frames without rendering an MP4, take one per scene and look at them: layout fits, text is legible, the visual matches the line being said. Snapshots stay out of git.

Finally write `cursos/<slug>/README.md`: what the course is, index of HISTORIA.md, GUION.md, fuentes/ (if any) and the chapters with durations, and the commands for the user to generate the voice (`ELEVENLABS_API_KEY=... node tools/voice.mjs`, then `node tools/timing.mjs`) and render.

## Rules
- Write only under `cursos/<slug>/` in the worktree `/Users/felixandersson/dev/felichz/KatArch-katas` (branch `cursos/nuevas-katas`). Never touch `/Users/felixandersson/dev/felichz/KatArch`. Do not commit.
- The team's repo with full history is at `/Users/felixandersson/dev/felichz/KatArch-katas/katas-src/<Repo>` (gitignored). Temporary files go in a gitignored `cursos/<slug>/.tmp/`.
- No ElevenLabs or any paid/mutating API, no network writes, no voice generation, no MP4 render.
- If you change a line of the script, keep GUION.md, narration.json and any generator in `fuentes/` in sync.

Report when done (under 250 words): per chapter scene count, estimated duration, check result (errors/warnings), and anything you could not verify.
