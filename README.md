# KatArch · Software Architecture Kata, taught from the winner's repo

**Live demo (guided course): <https://katarch.vercel.app>**

KatArch is a pedagogical reconstruction of the winning solution of the first **O'Reilly Software Architecture Kata** (*Fall 2020: Farmacy Food*). It teaches how real architecture decisions get made by replaying the winning team's reasoning in its original order — grounded in *Fundamentals of Software Architecture* (Mark Richards & Neal Ford) and *Viewpoints and Perspectives* (Rozanski & Woods), and anchored to the team's public repository: every diagram, document, spreadsheet and ADR is one click away.

---

## The case

The Software Architecture Katas are premier system design competitions organized by O'Reilly: engineering teams receive a realistic company's brief and design its full architecture from scratch, defended before a jury. The Fall 2020 semifinal jury was **Nate Schutta**, **Mark Richards**, **Sarah Taraporewalla** and **Luca Mezzalira** (verified against the judges' own deck in the team's repository).

The analysis focuses exclusively on the winner:

- **1st place: [ArchColider](https://github.com/TheKataLog/ArchColider)** — a modular monolith on AWS with event sourcing, actor-per-fridge concurrency, offline PIN pickup, and 16 Nygard-style ADRs.

The reasoning is reconstructed in its natural order — business → constraints → principles → style → domain → concurrency → infrastructure → cost — with the finalists Myagis-Forest and Jedis appearing as the podium counterpoint, including repo-verified contrasts (their ADR 001 against ArchColider's modular monolith, their Wrapper pattern against the anti-corruption layer, their purchase-session fridge model against the offline PIN).

## The eleven chapters

1. **The playing field** — the business, the three physical actors (ghost kitchens, smart fridges, staffed kiosks), the three user types, the pre-existing systems, and the real day-one numbers (2 locations, ~42 meals/day, ~0 requests/second).
2. **The podium's dilemma** — the three opposing answers of the finalists, plus the judges' actual seven-criterion rubric quoted from their semifinal deck.
3. **The rules of the game** — the team's real questions to the client, Rozanski & Woods, the four guiding principles, the ADR format (and the Second Law), and the business-goal → architectural-requirement traceability table.
4. **The big decision** — the Entity Trap, the traffic arithmetic, the team's original whiteboard, and the modular monolith (ADR 002).
5. **Splitting the system** — strategic DDD (core/supporting/generic), the anti-corruption layer around the Menu Catalog, the payment facade (ADR 009), and the knowledge/operational metamodel.
6. **The physical world** — actor per fridge, the venue-aggregation problem, event sourcing, acknowledged queues (and the payment-refused flow), the 30-second inhibition window, offline PIN pickup, the rainy-day journey, and the promotions-in-a-spreadsheet pragmatism.
7. **The subscriber's meal journey** — from the "IDEA!!!" whiteboard to OrderAvailableForPicking.
8. **Landing in the cloud** — VPC topology, authentication at the edge (ALB + Cognito), vertical-first scaling with concrete thresholds, the module-extraction case, synthetic health checks, and the curated risk list.
9. **The yearly bill** — message volumetry (including the 4 MB review photo), three TCO scenarios, the raw spreadsheet's honest assumptions, and why paid monitoring beat self-hosted.
10. **The decision map** — the ten structural decisions in three pillars, each linked to its original ADR.
11. **Field guide** — the method in four transferable steps.

---

## The guided course

One idea per screen, horizontal progression, and native diagrams that assemble step by step instead of static figures.

- **Astro + React islands.** Each chapter is a static page with a single island (`Player`) handling steps, keyboard (← →), swipe, progress (localStorage) and the side drawer of concepts, documents and decisions.
- **One step = one screen.** `v2/src/content/es/<chapter>.ts` defines steps (title, short text blocks, `visual: { scene, state }`). Consecutive steps sharing a `scene` keep the diagram mounted and only change its `state` — so diagrams transform instead of being replaced.
- **Scenes** live in `v2/src/visuals/` (`kit.tsx` with nodes, arrows, traveling messages and a stepper, plus per-chapter scenes), all registered in `v2/src/visuals/index.ts`.
- **Evidence.** Every step can declare `evidence` (the team's original PNG behind a "view the original" button) and `describe` (a text reading of the diagram, for screen readers and "read as text").
- **Data reused from v1.** `concepts.ts`, `decision-map.ts` and `original-docs.ts` are copies of the v1 article data; `v2/src/lib/refs.ts` ships each page only the concepts, documents and ADRs that chapter uses.
- **A fixed diagram alphabet** (legend in every scene): blue = command, green = event, violet = stateful component, dashed grey = pre-existing external system, orange = what gets built / UI accent, red = failure or rejection.

Chapters 1–6 are complete (Spanish); 7–11 are shown on the map as under construction.

## The v1 article platform

Built with **Astro** and **Tailwind CSS**, content-driven from typed data files — one renderer, two languages:

- **Bilingual:** English (`/`, default) and Spanish (`/es`) editions from `src/data/article/{es,en}.ts`.
- **Concept deep-dives:** 15 contextual modal chips explained the moment each concept first appears.
- **Decision map:** the curated three-pillar digest of ten ADR decisions, each a card linked to the original ADR.
- **Original artifacts:** 27 images from the ArchColider repository (diagrams, 2020 whiteboards, judges' deck material, forecasts, TCO charts) rendered full-width with attribution.
- **Original-document viewer:** 39 markdown docs from the repository — including all 16 ADRs with Spanish translations — rendered at build time into reading modals, each linking to the original GitHub file.
- **Interactive figures:** a full-screen lens stage (wheel to zoom), collapsible TOC rail with active-section tracking, native `<dialog>` modals with scroll lock and focus restore.

---

## Repository structure

```
katarch/
├── README.md                                         # This file
├── ADR-001-pedagogical-strategy-and-web-platform.md  # Project ADR (pedagogical strategy, platform)
├── DESIGN.md / PRODUCT.md                            # Visual system & product truth (v1 article surface)
├── vercel.json                                       # Deploys v2 (build: v2, output: v2/dist)
├── v2/                                               # Guided course — the deployed experience
│   ├── src/pages/                                    # Hub + [chapter] routes
│   ├── src/content/es/                               # Chapter steps (typed) + course map
│   ├── src/visuals/                                  # React diagram scenes + kit
│   ├── src/components/                               # Player island, drawers, theme toggle
│   └── src/lib/refs.ts                               # Per-chapter concept/doc/ADR slicing
├── src/                                              # v1 long-form article (Astro + Tailwind)
│   ├── components/article/                           # Renderer, blocks, decision cards, map
│   ├── data/article/                                 # es/en article, concepts, decisions, docs
│   ├── layouts/Layout.astro                          # Shell, themes, world tokens
│   └── scripts/article-interactions.ts               # Modals, lens stage, TOC, world picker
├── prose/                                            # Editorial source artifacts (ES) + doc translations
├── public/img/                                       # Original ArchColider figures (v1)
├── scripts/generate-original-docs.mjs                # Build-time markdown renderer for repo docs
└── fall-2020-farmacy-food/                           # The 10 original kata repositories (source material)
```

## Development

```bash
cd v2
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in v2/dist
```

Deployment on Vercel is driven by `vercel.json`

## Attribution

Independent pedagogical analysis of public material from the competition: the teams' original documents, diagrams and spreadsheets, cited and linked throughout. Theoretical framework: *Fundamentals of Software Architecture* (Richards & Ford) and *Software Architecture and Design Explained* (Rozanski & Woods). All original repositories belong to their teams under [TheKataLog](https://github.com/TheKataLog).
