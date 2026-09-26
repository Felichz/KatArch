# KnowGraph v2 · Guided course

A from-scratch rebuild of KnowGraph as a guided course: one idea per screen, horizontal progression, and native diagrams that assemble step by step. Same pedagogical content as v1 (prose, concepts, decisions, original documents), new structure and presentation.

Status: chapters 1–6 complete (Spanish); chapters 7–11 are listed on the map as "under construction".

Live: <https://know-graph.vercel.app/react>

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
- **One step = one screen.** `src/content/es/<chapter>.ts` defines the steps: title, short text (blocks) and `visual: { scene, state }`. Consecutive steps sharing the same `scene` keep the diagram mounted and only change its `state`: that is why the diagram transforms instead of being replaced.
- **Scenes.** `src/visuals/`: `kit.tsx` (nodes, arrows, traveling messages, stepper), `ch1.tsx` through `ch5.tsx`, `ch6a.tsx`, `ch6b.tsx`, `quiz.tsx`. They are registered in `src/visuals/index.ts`.
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

## Adding a chapter

1. Create `src/content/es/<id>.ts` exporting a `Chapter` (see `types.ts`).
2. Register it in `src/content/es/index.ts` and mark `available: true` in `src/content/course.ts`.
3. If it needs new scenes, write them with the kit and register them in `src/visuals/index.ts`.
