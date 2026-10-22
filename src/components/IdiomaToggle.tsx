import { Languages } from 'lucide-react';
import { ponerIdioma, useIdioma } from '../lib/idioma';

/** One click switches the bilingual course pages between Spanish and English; it shows the current language. */
export function IdiomaToggle() {
  const l = useIdioma();
  const otro = l === 'es' ? 'en' : 'es';
  return (
    <button
      type="button"
      className="vlang"
      onClick={() => ponerIdioma(otro)}
      aria-label={l === 'es' ? 'Switch to English' : 'Cambiar a español'}
      title={l === 'es' ? 'Switch to English' : 'Cambiar a español'}
      lang={otro}
    >
      <Languages size={15} aria-hidden="true" />
      <span aria-hidden="true">{l.toUpperCase()}</span>
    </button>
  );
}
