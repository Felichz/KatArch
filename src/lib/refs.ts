import type { Chapter } from '../content/types';
import { CONCEPTS } from '../content/concepts';
import { ORIGINAL_DOCS } from '../content/original-docs';
import { DECISIONS } from '../content/decision-map';
import type { Locale } from '../i18n/locales';

/**
 * Collect only the concepts, docs and decisions a chapter actually references,
 * in the given locale. The team's documents are English originals: the English
 * locale ships only the original, the Spanish one also ships our translation.
 */
export function chapterRefs(ch: Chapter, locale: Locale) {
  const json = JSON.stringify(ch);
  const conceptIds = new Set([...json.matchAll(/data-concept=\\"([\w-]+)\\"/g)].map((m) => m[1]));
  const docIds = new Set([...json.matchAll(/data-doc=\\"([\w-]+)\\"/g)].map((m) => m[1]));
  (ch.extraDocs ?? []).forEach((d) => docIds.add(d));
  const decisionIds = new Set<string>();
  for (const s of ch.steps) {
    for (const b of s.blocks) if (b.t === 'decision') decisionIds.add(b.id);
    if (s.visual?.scene === 'decision' && s.visual.props?.id) decisionIds.add(String(s.visual.props.id));
  }

  const decisions: Record<string, any> = {};
  for (const d of DECISIONS) {
    if (!decisionIds.has(d.id)) continue;
    decisions[d.id] = { title: d.title[locale], problem: d.problem[locale], decision: d.decision[locale], tradeoff: d.tradeoff[locale], adrs: d.adrs };
    d.adrs.forEach((a) => docIds.add('adr-' + a.id));
    for (const m of d.decision[locale].matchAll(/data-concept="([\w-]+)"/g)) conceptIds.add(m[1]);
  }
  const concepts: Record<string, any> = {};
  for (const id of conceptIds) if (CONCEPTS[id]) concepts[id] = { title: CONCEPTS[id].title[locale], body: CONCEPTS[id].body[locale] };
  const docs: Record<string, any> = {};
  for (const d of ORIGINAL_DOCS) if (docIds.has(d.id)) docs[d.id] = locale === 'es' ? { title: d.titleEs, file: d.file, html: d.html, htmlEs: d.htmlEs } : { title: d.titleEn, file: d.file, html: d.html, htmlEs: null };
  return { concepts, docs, decisions };
}
