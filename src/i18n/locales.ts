/**
 * Locale configuration and URL helpers.
 *
 * English is the default locale and lives at the site root with English slugs
 * (/terrain/). Spanish lives under /es/ with the original Spanish slugs
 * (/es/terreno/). Chapter ids (terreno, podio, ...) are the same in both
 * locales, so reading progress is shared: step N is the same step in both.
 */
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

// the written course is the 'texto' edition, on its own subdomain
export const SITE_URL = import.meta.env.PUBLIC_EDITION === 'texto' ? 'https://texto.katarch.workers.dev' : 'https://katarch.vercel.app';

/** localStorage key for the reader's explicit language choice */
export const LANG_STORAGE_KEY = 'katarch:lang';

export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', es: 'Español' };

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as readonly string[]).includes(v);

export const otherLocale = (l: Locale): Locale => (l === 'en' ? 'es' : 'en');

/** Path prefix of a locale, relative to the site base ('' for English, 'es/' for Spanish). */
export const localePrefix = (l: Locale) => (l === DEFAULT_LOCALE ? '' : `${l}/`);

const STEP_HASH: Record<Locale, string> = { en: 'step', es: 'paso' };

/** Deep link to a step, 1-based: #step-3 in English, #paso-3 in Spanish. */
export const stepHash = (l: Locale, n: number) => `#${STEP_HASH[l]}-${n}`;

/** Reads a step deep link in either locale's format. Returns the 1-based step or null. */
export function readStepHash(hash: string): number | null {
  const m = hash.match(/^#(?:step|paso)-(\d+)$/);
  return m ? parseInt(m[1], 10) : null;
}
