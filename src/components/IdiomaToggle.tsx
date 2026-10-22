import { ponerIdioma, useIdioma } from '../lib/idioma';

/** ES / EN for the bilingual course pages, next to the theme toggle. */
export function IdiomaToggle() {
  const l = useIdioma();
  return (
    <div className="vlang" role="group" aria-label={l === 'en' ? 'Language' : 'Idioma'}>
      <button type="button" aria-pressed={l === 'es'} onClick={() => ponerIdioma('es')} lang="es" title="Español">ES</button>
      <button type="button" aria-pressed={l === 'en'} onClick={() => ponerIdioma('en')} lang="en" title="English">EN</button>
    </div>
  );
}
