import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { UI } from '../i18n/ui';
import type { Locale } from '../i18n/locales';

type Theme = 'dark' | 'light';
const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

export function ThemeToggle({ locale }: { locale: Locale }) {
  const ui = UI[locale].theme;
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    setTheme(current());
    // The theme can also change from outside the button (a page embedding the course sets the
    // attribute): the button follows the attribute, not only its own clicks.
    const seen = new MutationObserver(() => setTheme(current()));
    seen.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => seen.disconnect();
  }, []);
  const toggle = () => {
    const t = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('katarch:theme', t); } catch {}
  };
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? ui.toLight : ui.toDark}>
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
