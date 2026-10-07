import { LANG_STORAGE_KEY, LOCALES, LOCALE_NAMES, type Locale } from '../i18n/locales';
import { UI } from '../i18n/ui';

/**
 * EN / ES switcher. `href` holds the equivalent URL of the current page in
 * each locale (including the current step for chapter pages). Choosing a
 * language stores it, so later visits open in that language.
 */
export function LangSwitch({ locale, href }: { locale: Locale; href: Record<Locale, string> }) {
  const ui = UI[locale].lang;
  const remember = (l: Locale) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {}
  };
  return (
    <nav className="lang" aria-label={ui.switcher}>
      {LOCALES.map((l) =>
        l === locale ? (
          <span key={l} className="lang__opt" aria-current="true" lang={l}>
            <span aria-hidden>{l.toUpperCase()}</span>
            <span className="sr-only">{LOCALE_NAMES[l]}</span>
          </span>
        ) : (
          <a key={l} className="lang__opt" href={href[l]} hrefLang={l} lang={l} onClick={() => remember(l)}>
            <span aria-hidden>{l.toUpperCase()}</span>
            {/* written in the target language, matching the link's lang */}
            <span className="sr-only">{ui.switchTo}</span>
          </a>
        ),
      )}
    </nav>
  );
}
