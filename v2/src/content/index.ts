import type { Chapter, Step, TextBlock } from './types';
import type { Locale } from '../i18n/locales';
import { CHAPTERS as es } from './es';
import { CHAPTERS as en } from './en';

/** Chapter content per locale, keyed by chapter id (the same ids in every locale). */
export const CHAPTERS: Record<Locale, Record<string, Chapter>> = { en, es };

/** Structural fingerprint of a block: everything except the prose. */
function blockShape(b: TextBlock): string {
  switch (b.t) {
    case 'list':
      return `list:${b.items.length}:${!!b.ordered}`;
    case 'cards':
      return `cards:${b.cards.length}`;
    case 'callout':
      return `callout:${b.tone}`;
    case 'predict':
      return `predict:${b.options.map((o) => (o.correct ? 1 : 0)).join('')}`;
    case 'decision':
      return `decision:${b.id}`;
    default:
      return b.t;
  }
}

function stepShape(s: Step): string {
  const v = s.visual;
  const quiz = Array.isArray(v?.props?.questions) ? (v!.props!.questions as { options: string[]; answer: number }[]).map((q) => `${q.options.length}/${q.answer}`).join(',') : '';
  const props = v?.props ? JSON.stringify(Object.fromEntries(Object.entries(v.props).filter(([k]) => k !== 'questions'))) : '';
  const json = JSON.stringify(s);
  const refs = [...json.matchAll(/data-(concept|doc)=\\"([\w-]+)\\"/g)].map((m) => `${m[1]}:${m[2]}`).sort().join(',');
  return [s.id, refs, s.layout ?? 'split', v?.scene ?? '', v?.state ?? '', props, quiz, !!s.evidence, s.evidence?.src ?? '', !!s.describe, s.blocks.map(blockShape).join('|')].join(' ~ ');
}

/**
 * Every locale must have the same chapters with the same steps, scenes,
 * states, quiz answers and block structure: progress and deep links are
 * shared across locales, so step N has to be the same step everywhere.
 * Called at build time; a mismatch fails the build.
 */
export function assertLocaleParity() {
  const ids = Object.keys(es).sort().join();
  if (Object.keys(en).sort().join() !== ids) throw new Error(`[i18n] chapter ids differ: en=${Object.keys(en)} es=${Object.keys(es)}`);
  for (const id of Object.keys(es)) {
    const a = es[id];
    const b = en[id];
    const meta = (c: Chapter) => [c.id, c.number, c.minutes, c.learn.length, (c.extraDocs ?? []).join()].join();
    if (meta(a) !== meta(b)) throw new Error(`[i18n] chapter "${id}" metadata differs between es and en`);
    if (a.steps.length !== b.steps.length) throw new Error(`[i18n] chapter "${id}": es has ${a.steps.length} steps, en has ${b.steps.length}`);
    a.steps.forEach((s, i) => {
      const x = stepShape(s);
      const y = stepShape(b.steps[i]);
      if (x !== y) throw new Error(`[i18n] chapter "${id}", step ${i + 1} differs:\n  es: ${x}\n  en: ${y}`);
    });
  }
}
