# KatArch v2 · Guided course

A from-scratch rebuild of KatArch as a guided course: one idea per screen, horizontal progression, and native diagrams that assemble step by step. Same pedagogical content as v1 (prose, concepts, decisions, original documents), new structure and presentation.

Status: all eleven chapters complete, in English (default, at `/`) and Spanish (at `/es/`).

Live: <https://katarch.vercel.app>

## Running

Requires Node 22.12 or higher.

```bash
cd v2
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## How it is built

- **Astro + React islands.** Each chapter is a static page with a single island, `Player`, which handles steps, keyboard navigation (← →), swipe, progress (localStorage) and the side drawer of concepts, documents and decisions.
- **One step = one screen.** `src/content/<locale>/<chapter>.ts` (`en/`, `es/`) defines the steps: title, short text (blocks) and `visual: { scene, state }`. Consecutive steps sharing the same `scene` keep the diagram mounted and only change its `state`: that is why the diagram transforms instead of being replaced.
- **Scenes.** `src/visuals/`: `kit.tsx` (nodes, arrows, traveling messages, stepper), `ch1.tsx` through `ch5.tsx`, `ch6a.tsx`, `ch6b.tsx`, `ch7.tsx` through `ch11.tsx`, `quiz.tsx`. They are registered in `src/visuals/index.ts`.
- **Showreel.** `src/pages/reel.astro` (not linked, not indexed) plays real scenes on a 1920×1080 timeline (`src/components/Reel.tsx`). `npm run reel`, with the dev server running, renders it frame by frame on a virtual clock (`scripts/render-reel.mjs`) to MP4, WebM and a poster in `../docs/reel/`.
- **Evidence.** Every step can declare `evidence` (the team's original PNG, behind the "View the original" button) and `describe` (a text reading of the diagram, for screen readers and "Read as text").
- **Data reused from v1.** `src/content/concepts.ts`, `decision-map.ts` and `original-docs.ts` are copies of `src/data/article/`. `src/lib/refs.ts` ships each page only the concepts, documents and ADRs that the chapter uses.

## The diagram alphabet

Fixed across the whole course, with a legend in every scene:

| Color | Meaning |
|---|---|
| Blue | Command: someone asks for something to happen (it can fail) |
| Green | Event: something that has already happened |
| Violet | Stateful component (actor, order, catalog) |
| Grey dashed border | Pre-existing external system |
| Orange | What is being built / interface accent |
| Red | Failure, rejection, conflict |

## Languages

- **Routes.** English at the root with English slugs (`/terrain/`), Spanish under `/es/` with the Spanish slugs (`/es/terreno/`). Slugs live in `src/content/course.ts`. The pre-i18n Spanish URLs (`/terreno/`) redirect to `/es/terreno/` (HTTP redirect in `vercel.json`, plus a static redirect page that keeps the hash). Step deep links are `#step-N` in English and `#paso-N` in Spanish; both formats are accepted everywhere.
- **UI strings.** `src/i18n/ui.ts` holds the typed catalogs: `en` defines the shape and `es` must match it key for key.
- **Diagram labels.** Each scene file keeps its text in `defineStrings({ es, en })` tables and reads them with `useT()`; the Player provides the locale through React context.
- **Content.** `src/content/en/` mirrors `src/content/es/`. A build-time check (`assertLocaleParity` in `src/content/index.ts`) fails the build if the locales differ in steps, scenes, states, quiz answers, block structure or cited concepts and documents.
- **Language choice.** The header switcher keeps the chapter and step and stores the choice in `localStorage` (`katarch:lang`); first visits get English. Reading progress is shared between languages (same chapter ids and steps).

## Adding a chapter

1. Create `src/content/es/<id>.ts` and `src/content/en/<id>.ts`, each exporting a `Chapter` (see `types.ts`) with the same steps.
2. Register them in `src/content/es/index.ts` and `src/content/en/index.ts`, and mark `available: true` in `src/content/course.ts`.
3. If it needs new scenes, write them with the kit, with their text in a `defineStrings` table, and register them in `src/visuals/index.ts`.
