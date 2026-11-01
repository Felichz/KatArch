/**
 * The page's theme for the islands that show a different video by theme (the light render for the light theme).
 * It follows <html data-theme>, which the layout sets before the first paint and the theme toggle changes.
 */
import { useEffect, useRef, useState } from 'react';

export type Tema = 'dark' | 'light';
const actual = (): Tema => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/** The current theme. `antes` runs before the change is applied (e.g. to note where the video was). */
export function useTema(antes?: (t: Tema) => void): Tema {
  const [t, setT] = useState<Tema>('dark');
  const cb = useRef(antes);
  cb.current = antes;
  useEffect(() => {
    setT(actual());
    let prev = actual();
    const obs = new MutationObserver(() => {
      const n = actual();
      if (n === prev) return;
      prev = n;
      cb.current?.(n);
      setT(n);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return t;
}
