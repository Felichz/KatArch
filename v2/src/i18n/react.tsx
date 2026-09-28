import { createContext, useContext } from 'react';
import { DEFAULT_LOCALE, type Locale } from './locales';
import { UI, type Messages } from './ui';

/** Current locale for everything rendered inside the Player island (blocks, drawer, scenes). */
export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export const useLocale = () => useContext(LocaleContext);

/** UI message catalog for the current locale. */
export const useUi = (): Messages => UI[useContext(LocaleContext)];

/** Picks the current locale's table from a `defineStrings` table. */
export function useT<T>(tables: Record<Locale, T>): T {
  return tables[useContext(LocaleContext)];
}
