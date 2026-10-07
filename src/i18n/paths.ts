import { chapterSlug } from '../content/course';
import { LOCALES, SITE_URL, localePrefix, type Locale } from './locales';

const BASE = import.meta.env.BASE_URL;

/** Course map URL in a locale: / or /es/ */
export const homeUrl = (l: Locale) => `${BASE}${localePrefix(l)}`;

/** Chapter URL in a locale: /terrain/ or /es/terreno/ */
export const chapterUrl = (id: string, l: Locale) => `${BASE}${localePrefix(l)}${chapterSlug(id, l)}/`;

/** The same page in every locale. */
export const alternates = (page: (l: Locale) => string) => Object.fromEntries(LOCALES.map((l) => [l, page(l)])) as Record<Locale, string>;

export const absolute = (path: string) => new URL(path, SITE_URL).href;
