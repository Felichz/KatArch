# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 static site with React 19 islands (Motion, Lucide), plain CSS with light and dark themes. Two editions from one renderer: English at `/`, Spanish at `/es/`. Chapter content is typed data in `src/content/<locale>/`. Deployed on Vercel.

## Users

- **Primary:** Felix — senior developer, Spanish-speaking (Rioplatense), no prior software-architecture experience, ADHD. Reads long-form on a desktop browser, dark mode by default, scans with h3 rhythm before committing to a paragraph.
- **Secondary:** any developer learning software architecture who has not read "Fundamentals of Software Architecture"; judges/kata participants arriving from the TheKataLog repos.

## Product Purpose

KatArch reconstructs, step by step and in order, how the winning team (ArchColider) reasoned through the O'Reilly Software Architecture Kata Fall 2020 (Farmacy Food case). Success = the reader finishes able to reproduce the reasoning method (understand → principles → reality-first design → the bill), not just admire the final architecture.

## Positioning

A chronological reasoning walkthrough with every claim anchored to the primary repositories (original docs rendered in-page, ADRs as bilingual cards, verified cross-finalist counterpoints). No other coverage of this case shows the decisions emerging in order with clickable sources.

## Constraints & commitments

- Bilingual ES/EN editions, one renderer; ES is the authoring edition.
- Editorial rules are binding: no em-dashes in ES, no ungrounded qualifiers or population claims, self-sufficient main thread, ADR mentions open in-app cards.
- Content architecture (blocks, concepts, decision map, original-docs system) is product truth; the redesign touches presentation, never content or interaction contracts (in-page modals, reading guides under figures, lens, decision map anchors).
- A guided course: 11 chapters, one idea per screen, each step must fit a laptop viewport without scrolling.

## Voice

Rioplatense Spanish, direct, warm-functional; second person ("fijate", "mirá"); honesty as content (assumptions, unresolved risks shown, not hidden).
