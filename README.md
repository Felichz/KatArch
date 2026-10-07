# KatArch

A guided course that rebuilds, step by step, how the winning team of the O'Reilly Software Architecture Kata (Fall 2020, Farmacy Food) reasoned its way to an architecture.

**[Video course](https://katarch.vercel.app)** · **[Written course](https://texto.katarch.workers.dev)** · **[Case study](https://portfolio-felix-teal.vercel.app/work/katarch/)** · **Author: [Felix Andersson](https://portfolio-felix-teal.vercel.app/)**

<a href="docs/reel/katarch-reel.mp4"><img alt="KatArch showreel, 41 seconds of motion design. 'Ten teams. One brief. One winner.': ten team tiles connect to one brief and the winner, ArchColider, lights up. The camera dives into the team's real whiteboard from October 29, 2020; its hand-drawn circles are traced in orange, the paper goes dark, and the sketch becomes the course's redrawn diagram: the Menu core with its seven plug-ins. Chapter 5: the camera rides a '40 lasagnas' message from the Ghost Kitchen into the anti-corruption layer, where it leaves as 'internal format' and reaches the Menu Catalog domain, whose 'stock updated' event fans out to four consumers. Chapter 6: Ana and Beto order the last meal in the same second; the router puts both in fridge A's queue, its actor serves Ana and Beto finds it sold out. 'No locks.' Chapter 10: sixteen ADR tiles appear, five step aside, eleven fly into three pillars and become ten decisions, and the threads between them draw. Chapter 9: the year-1 bill grows line by line to 12,248 dollars, then switches to rapid growth: ten times the load, less than twice the bill, 22,481 dollars. It closes on the KatArch mark: 11 chapters, English and Spanish, every claim linked to the team's repository." src="docs/screenshots/katarch-reel.webp"></a>

<sub>The case in 41 seconds, animated from the course's own diagrams. [Full-quality MP4](docs/reel/katarch-reel.mp4) · [WebM](docs/reel/katarch-reel.webm)</sub>

## Two editions

- **The video course** ([katarch.vercel.app](https://katarch.vercel.app)), the default: eleven narrated chapters (about 74 minutes, neutral Spanish) with sections, a synchronized transcript and saved progress. The videos are produced as code with [HyperFrames](https://github.com/heygen-com/hyperframes) in [`video/`](video/), voiced with ElevenLabs, and served from Cloudflare R2.
- **The written course** ([texto.katarch.workers.dev](https://texto.katarch.workers.dev)): the interactive, step-by-step course described below, in English and Spanish.

Both build from this repository. `PUBLIC_EDITION=texto` builds the written course; without it, the build is the video course.

```bash
npm run dev                                               # the video course, at localhost:4321
PUBLIC_EDITION=texto npm run dev                          # the written course
node scripts/build-video-data.mjs                         # after re-rendering a chapter: sections, transcript, posters
PUBLIC_EDITION=texto npx astro build --outDir dist-texto  # then deploy/texto: npx wrangler deploy
```

## What it is

In 2020 ten teams answered the same brief: an ordering system for a ghost kitchen that sells meals through smart fridges and staffed kiosks. KatArch follows the winning team, [ArchColider](https://github.com/TheKataLog/ArchColider), through its decisions in the order they were made: the business, the constraints, the guiding principles, the architecture style (a modular monolith), the domain split and the physical-world problems (concurrent fridges, payments, offline pickup). It is written for developers who have not studied software architecture, and every claim points back to the team's public repository: their diagrams, documents and ADRs open one click away, in the original English or in a Spanish translation.

The course shows one idea per screen. The team's figures are redrawn as native, animated diagrams that assemble as you advance, with "pause and predict" questions before key decisions and small interactive simulators. The interface and course text are in English by default, with a Spanish (Rioplatense) version. All eleven chapters are live: from the business and its constraints to the subscriber journey, cloud infrastructure, the yearly bill, the decision map and a closing field guide.

## Gallery

<table>
  <tr>
    <td colspan="2" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/katarch-demo-dark.webp">
        <img alt="Recording of KatArch, chapter 5, moving from the team's strategic domain map to the anti-corruption layer and then to the step 'A piece of data crosses the border', where a packet travels from the kitchen through a translator into the domain. The final frame: a text panel on the left explains the step; on the right, an animated diagram shows the Menu Catalog anti-corruption layer: Ghost Kitchen, Loyalty Management and Front End + PoS send data through three translators (Meals Offer, Loyalty, Menu Catalog API), which issue commands to the Menu Catalog domain; the domain emits a 'stock updated' event to Shopping Cart, Recommendations, Reviews and Filtering. A step counter and Previous/Next buttons sit at the bottom." src="docs/screenshots/katarch-demo-light.webp">
      </picture>
      <br><sub>Chapter 5, step by step: the strategic map, the anti-corruption layer, and a piece of data crossing the border.</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/katarch-composition-dark.webp">
        <img alt="Chapter 5, 'quality budget' step: a map of the system's subsystems (notifications, front-end apps, catalog, order processing, purchase gateway) with the quality attributes each one protects, Menu Catalog and Ordering highlighted as the two centers of gravity, and pre-existing external systems drawn with dashed borders." src="docs/screenshots/katarch-composition-light.webp">
      </picture>
      <br><sub>Every subsystem gets its own quality budget. Selecting one explains what the business loses if it fails.</sub>
    </td>
    <td width="50%" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/katarch-undo-demo-dark.webp">
        <img alt="Recording of the chapter 6 simulator 'the undo window': a purchase is confirmed, the order waits in an in-memory window while a 30 second bar fills, and cancelling it at 15 seconds returns the meal to the catalog with zero fees paid and the payment gateway never called." src="docs/screenshots/katarch-undo-demo-light.webp">
      </picture>
      <br><sub>A simulator for the team's undo window: an order is held 10 to 30 seconds before payment, so an early cancel costs no fees.</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/katarch-valuemap-dark.webp">
        <img alt="Chapter 4: the value map from ADR 002, a table scoring monolith, microservices, micro-kernel and modular monolith against ten quality attributes from strongly negative to strongly positive, next to a 'pause and predict' question asking which column a small team with a minimal budget should pick." src="docs/screenshots/katarch-valuemap-light.webp">
      </picture>
      <br><sub>ADR 002's value map, with a prediction question before the team's answer is shown.</sub>
    </td>
    <td width="50%" valign="top" align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/katarch-mobile-dark.webp">
        <img width="260" alt="The anti-corruption layer step on a phone: the diagram stacks above the text panel, with round previous and next buttons and a 05 of 13 step counter at the bottom." src="docs/screenshots/katarch-mobile-light.webp">
      </picture>
      <br><sub>On a phone the diagram stacks above the text; steps change by swipe.</sub>
    </td>
  </tr>
</table>

## How it's built

- **A step is data, and diagrams persist across steps.** Each chapter is a typed array of steps in `src/content/<locale>/<chapter>.ts`, one file per locale (`en/`, `es/`; types in `src/content/types.ts`): a title, short text blocks and `visual: { scene, state }`. The `Player` island (`src/components/Player.tsx`) keys the diagram by scene name, so consecutive steps that share a scene keep it mounted and only change its `state`. The diagram transforms in place instead of being swapped for a new figure.
- **A small SVG diagram kit.** `src/visuals/kit.tsx` provides nodes positioned by their center and animated with springs, arrows, traveling messages and a stepper; 87 scenes built on it are registered in `src/visuals/index.ts`. Any diagram opens enlarged in a dialog with zoom and pan. A fixed color alphabet runs through every scene (blue for commands, green for events, violet for stateful components, dashed grey for pre-existing external systems, red for failures). Timed sequences go through `src/visuals/usePhases.ts`, which jumps straight to the final phase when the reader prefers reduced motion.
- **Evidence and a text reading next to every diagram.** A step can declare `evidence` (the team's original image, behind "View the team’s original") and `describe` (a plain-language reading of the diagram, behind "Read as text"). Step changes are announced through an `aria-live` region; navigation works with arrow keys, Page Up/Down, Home/End and touch swipe, and each step has a deep link (`#step-N`, or `#paso-N` in Spanish).
- **Each page ships only the sources it cites.** The original documents, rendered to HTML, are about 390 KB of data. `src/lib/refs.ts` scans a chapter's content for `data-concept` and `data-doc` references and its decision blocks at build time, and passes only those concepts, documents and ADRs to that chapter's island.
- **Primary sources rendered at build time.** `scripts/generate-original-docs.mjs` renders 39 of the team's markdown files (23 documents and all 16 ADRs) with micromark and GFM, rewrites relative links and images to the team's GitHub repository, and pairs each one with its Spanish translation from `prose/docs-es/`. The output is a typed data file, so documents open in an in-page drawer (with an original/translation toggle in the Spanish version) and a link to the file on GitHub.

Reading progress per chapter is kept in `localStorage` (`src/lib/progress.ts`), and the course map offers to resume where the reader left off.

## Stack

- Astro 7 static site with React 19 islands, Motion for animation, Lucide icons, TypeScript, Inter and JetBrains Mono via Fontsource, plain CSS with light and dark themes.
- **Hosting:** Vercel.
- **Showreel:** a separate [Remotion](https://www.remotion.dev) project in `reel/`, written frame by frame in React: an SVG camera, wires that draw themselves, messages that travel along paths and kinetic type, in the course's colors and diagram alphabet.

## Getting started

Needs Node 22.12 or later.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview
```

Deployment on Vercel is driven by `vercel.json`.

The showreel lives in `reel/`:

```bash
cd reel
npm install
npm run studio    # scrub the timeline in Remotion Studio
npm run render    # 1920×1080 MP4 in reel/out/
```

To regenerate the rendered documents, clone [ArchColider](https://github.com/TheKataLog/ArchColider) into `fall-2020-farmacy-food/ArchColider/` (gitignored) and run `node scripts/generate-original-docs.mjs`. It writes `src/data/article/original-docs.ts`; `src/content/original-docs.ts` is a copy of that file.

## Project structure

```
katarch/
├── src/pages/              # course map + one static route per chapter (English at /, Spanish at /es/)
├── src/content/en/, es/    # chapter steps per locale (typed data)
├── src/content/            # course map, concepts, decisions, original docs
├── src/visuals/            # diagram kit and per-chapter scenes
├── src/components/         # Player island, drawer, text blocks, theme toggle
├── src/lib/                # per-chapter source slicing, progress
├── public/img/             # the team's original figures
├── reel/                   # the showreel (Remotion)
├── scripts/                # original-document generator
└── vercel.json             # deployment
```

## Docs

- [`ADR-001-pedagogical-strategy-and-web-platform.md`](ADR-001-pedagogical-strategy-and-web-platform.md): why the project follows one team chronologically, and its platform decisions.
- [`PRODUCT.md`](PRODUCT.md): audience and editorial constraints.

## Attribution

An independent teaching project built on public material from the competition. The original documents, diagrams and ADRs belong to team ArchColider and the other participating teams, published under [TheKataLog](https://github.com/TheKataLog), and are cited and linked where they are used. Theoretical references: *Fundamentals of Software Architecture* (Mark Richards and Neal Ford) and *Software Systems Architecture: Working with Stakeholders Using Viewpoints and Perspectives* (Nick Rozanski and Eoin Woods).
