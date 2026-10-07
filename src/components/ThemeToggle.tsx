import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { UI } from '../i18n/ui';
import type { Locale } from '../i18n/locales';

export function ThemeToggle({ locale }: { locale: Locale }) {
  const ui = UI[locale].theme;
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as 'dark' | 'light') ?? 'dark');
  }, []);
  const toggle = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('katarch:theme', t); } catch {}
    setTheme(t);
  };
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? ui.toLight : ui.toDark}>
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
