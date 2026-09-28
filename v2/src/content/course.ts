import type { CourseEntry } from './types';
import type { Locale } from '../i18n/locales';

/**
 * Course map. The structure (ids, order, availability, URL slugs) is shared;
 * the text is per locale and keyed by chapter id, so both locales must cover
 * every chapter.
 */
export const CHAPTER_IDS = [
  'terreno',
  'podio',
  'principios',
  'estilo',
  'dominio',
  'concurrencia',
  'suscriptor',
  'infraestructura',
  'costos',
  'mapa',
  'guia',
] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

const STRUCTURE: Record<ChapterId, { number: number; available: boolean; slug: Record<Locale, string> }> = {
  terreno: { number: 1, available: true, slug: { en: 'terrain', es: 'terreno' } },
  podio: { number: 2, available: true, slug: { en: 'podium', es: 'podio' } },
  principios: { number: 3, available: true, slug: { en: 'principles', es: 'principios' } },
  estilo: { number: 4, available: true, slug: { en: 'style', es: 'estilo' } },
  dominio: { number: 5, available: true, slug: { en: 'domain', es: 'dominio' } },
  concurrencia: { number: 6, available: true, slug: { en: 'concurrency', es: 'concurrencia' } },
  suscriptor: { number: 7, available: false, slug: { en: 'subscriber', es: 'suscriptor' } },
  infraestructura: { number: 8, available: false, slug: { en: 'infrastructure', es: 'infraestructura' } },
  costos: { number: 9, available: false, slug: { en: 'costs', es: 'costos' } },
  mapa: { number: 10, available: false, slug: { en: 'map', es: 'mapa' } },
  guia: { number: 11, available: false, slug: { en: 'guide', es: 'guia' } },
};

export const chapterSlug = (id: string, locale: Locale) => STRUCTURE[id as ChapterId]?.slug[locale] ?? id;

interface CourseMeta {
  kicker: string;
  title: string;
  subtitle: string;
  intro: string;
}
type ChapterText = Record<ChapterId, { phase: string; title: string; blurb: string }>;

const META: Record<Locale, CourseMeta> = {
  en: {
    kicker: "O'Reilly Software Architecture Kata · Fall 2020",
    title: 'The Farmacy Food case',
    subtitle: 'How real architecture decisions get made, rebuilt step by step from the winning team’s repository.',
    intro:
      'A guided course for developers with no architecture experience. Eleven chapters, one idea per screen, and every diagram built for you to walk through.',
  },
  es: {
    kicker: "O'Reilly Software Architecture Kata · Otoño 2020",
    title: 'El caso Farmacy Food',
    subtitle: 'Cómo se toman decisiones reales de arquitectura, reconstruido paso a paso desde el repositorio del equipo ganador.',
    intro:
      'Un curso guiado para devs sin experiencia en arquitectura. Once capítulos, una idea por pantalla, y cada diagrama construido para que lo recorras vos.',
  },
};

const TEXT: Record<Locale, ChapterText> = {
  en: {
    terreno: { phase: 'The problem', title: 'The playing field', blurb: 'The business, its physical pieces and the number that governs the whole case.' },
    podio: { phase: 'The problem', title: 'The podium’s dilemma', blurb: 'Three finalists, three opposite answers, and the jury’s actual rubric.' },
    principios: { phase: 'The decision framework', title: 'The rules before the first diagram', blurb: 'Questions for the client, guiding principles and the decision log.' },
    estilo: { phase: 'The decision framework', title: 'How much machinery to buy', blurb: 'The Entity Trap, the traffic arithmetic and the modular monolith.' },
    dominio: { phase: 'The design', title: 'What to build and what to rent', blurb: 'Domains, an anti-corruption layer, a payment facade and a metamodel.' },
    concurrencia: { phase: 'The design', title: 'The physical world', blurb: 'Fridges, money and unstable connections: three real problems, three trade-offs.' },
    suscriptor: { phase: 'The design', title: 'A meal’s journey', blurb: 'From the calendar to the fridge: the subscriber cycle as events.' },
    infraestructura: { phase: 'The design', title: 'Landing in the cloud', blurb: 'Private network, identity at the edge, vertical scaling and module extraction.' },
    costos: { phase: 'The economic reality', title: 'The yearly bill', blurb: 'Volume estimates, three cost scenarios and why paid monitoring won.' },
    mapa: { phase: 'The economic reality', title: 'The decision map', blurb: 'The ten structural decisions in three pillars.' },
    guia: { phase: 'Takeaways', title: 'Field guide', blurb: 'The method in four steps, for your next system.' },
  },
  es: {
    terreno: { phase: 'El problema', title: 'El terreno de juego', blurb: 'El negocio, sus piezas físicas y el número que gobierna todo el caso.' },
    podio: { phase: 'El problema', title: 'El dilema del podio', blurb: 'Tres finalistas, tres respuestas opuestas, y la rúbrica real del jurado.' },
    principios: { phase: 'El marco de decisión', title: 'Las reglas antes del primer diagrama', blurb: 'Preguntas al cliente, principios rectores y el cuaderno de decisiones.' },
    estilo: { phase: 'El marco de decisión', title: 'Cuánta maquinaria comprar', blurb: 'La Entity Trap, la aritmética del tráfico y el monolito modular.' },
    dominio: { phase: 'El diseño', title: 'Qué se construye y qué se alquila', blurb: 'Dominios, capa anticorrupción, fachada de pagos y metamodelo.' },
    concurrencia: { phase: 'El diseño', title: 'El mundo físico', blurb: 'Heladeras, dinero y conexiones inestables: tres problemas reales, tres renuncias.' },
    suscriptor: { phase: 'El diseño', title: 'El viaje de una vianda', blurb: 'Del calendario a la heladera: el ciclo del suscriptor en eventos.' },
    infraestructura: { phase: 'El diseño', title: 'Aterrizar en la nube', blurb: 'Red privada, identidad en el borde, escala vertical y extracción de módulos.' },
    costos: { phase: 'La realidad económica', title: 'La factura anual', blurb: 'Volumetría, tres escenarios de costo y por qué el monitoreo pago ganó.' },
    mapa: { phase: 'La realidad económica', title: 'El mapa de decisiones', blurb: 'Las diez decisiones estructurales en tres pilares.' },
    guia: { phase: 'Para llevar', title: 'Guía de campo', blurb: 'El método en cuatro pasos, para tu próximo sistema.' },
  },
};

export const courseMeta = (locale: Locale): CourseMeta => META[locale];

export function getCourse(locale: Locale): CourseEntry[] {
  return CHAPTER_IDS.map((id) => ({
    id,
    slug: STRUCTURE[id].slug[locale],
    number: STRUCTURE[id].number,
    available: STRUCTURE[id].available,
    ...TEXT[locale][id],
  }));
}
