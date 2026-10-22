/**
 * The language of the bilingual course pages (/curso/): Spanish or English, for the whole UI and the video.
 * Kept in this browser. The layout (VideoBase with `bilingue`) applies it before the first paint as
 * <html data-lang>, so static text written in both languages (Dos.astro) shows the right one without a flash;
 * React islands follow it with useIdioma().
 */
import { useEffect, useRef, useState } from 'react';

export type Idioma = 'es' | 'en';
export const IDIOMA_KEY = 'katarch:video:lang';
const EVENTO = 'katarch:idioma';

export function leerIdioma(): Idioma {
  try {
    return localStorage.getItem(IDIOMA_KEY) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

/** Changes the language of the page: the stored choice, <html lang data-lang>, the tab's title, and every island. */
export function ponerIdioma(l: Idioma) {
  try { localStorage.setItem(IDIOMA_KEY, l); } catch {}
  const h = document.documentElement;
  h.dataset.lang = l;
  h.lang = l;
  const t = l === 'en' ? h.dataset.titleEn : h.dataset.titleEs;
  if (t) document.title = t;
  window.dispatchEvent(new CustomEvent<Idioma>(EVENTO, { detail: l }));
}

/** The current language. `antes` runs before the change is applied (e.g. to note where the video was). */
export function useIdioma(antes?: (l: Idioma) => void): Idioma {
  const [l, setL] = useState<Idioma>('es');
  const cb = useRef(antes);
  cb.current = antes;
  useEffect(() => {
    setL(leerIdioma());
    const on = (e: Event) => {
      const n = (e as CustomEvent<Idioma>).detail;
      cb.current?.(n);
      setL(n);
    };
    window.addEventListener(EVENTO, on);
    return () => window.removeEventListener(EVENTO, on);
  }, []);
  return l;
}
