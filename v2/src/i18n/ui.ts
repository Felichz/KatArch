/**
 * UI message catalogs.
 *
 * `en` defines the shape; `es` is typed as `Messages`, so a key missing from
 * either catalog (or an extra one) is a TypeScript error. Interpolated
 * messages are functions.
 */
import type { Locale } from './locales';

const pad = (n: number) => String(n).padStart(2, '0');

const en = {
  meta: {
    hubTitle: 'KatArch · The Farmacy Food case',
    description:
      "A guided software architecture course built on a real case: Farmacy Food (O'Reilly Architecture Kata, Fall 2020).",
    chapterTitle: (n: number, title: string) => `${pad(n)} · ${title} · KatArch`,
  },
  lang: {
    switcher: 'Language',
    switchTo: 'Leer en español',
    current: 'English (current)',
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  hub: {
    repo: 'Winning team’s repository ↗',
    start: 'Start with chapter 1 →',
    resume: 'Continue where you left off →',
    how: [
      ['One idea per screen.', 'Move forward with the arrow keys or by swiping.'],
      ['Diagrams that assemble.', 'Every figure from the team, redrawn so you can walk through it step by step.'],
      ['Evidence one click away.', 'The original from the repository, the documents and the decisions are always available.'],
    ] as [string, string][],
    mapLabel: 'Course chapters',
    locked: 'under construction',
    done: 'complete',
  },
  player: {
    brandLabel: 'KatArch, course map',
    chapterShort: (n: number) => `Ch. ${pad(n)}`,
    stage: 'Diagram',
    showDiagram: 'Show diagram',
    readAsText: 'Read as text',
    backToInteractive: 'Back to the interactive diagram',
    viewOriginal: 'View the team’s original',
    openFullSize: 'Open full size',
    prevLabel: 'Previous step',
    prev: 'Previous',
    nextLabel: 'Next step',
    next: 'Next',
    start: 'Start',
    nextChapter: 'Next chapter',
    backToMap: 'Back to the map',
    announce: (n: number, total: number, title: string) => `Step ${n} of ${total}: ${title}`,
  },
  cover: {
    minutes: (m: number) => `${m} min`,
    steps: (n: number) => `${n} steps`,
    start: 'Start the chapter',
    learn: 'By the end you will be able to',
    route: 'Route',
  },
  blocks: {
    predict: 'Pause and predict',
    tryAgain: 'Try another option, or keep going: the answer shows up in the diagram.',
    decisionLabel: (adrs: string) => `Recorded decision · ${adrs}`,
  },
  drawer: {
    close: 'Close',
    concept: 'Concept',
    doc: 'Team’s original document',
    decision: 'Architecture decision',
    steps: (n: number) => `Chapter ${pad(n)} · steps`,
    docNotFound: 'Document not found.',
    docLanguage: 'Document language',
    translation: 'Translation',
    original: 'Original',
    viewOnGitHub: 'View on GitHub',
    problem: 'The problem',
    theDecision: 'The decision',
    tradeoff: 'What it costs',
    readAdr: (label: string) => `Read ${label}`,
    courseMap: 'Course map',
  },
  stepper: {
    prev: 'Previous diagram step',
    next: 'Next diagram step',
    step: (n: number) => `Step ${n}`,
    pause: 'Pause',
    replay: 'Replay',
    play: 'Play',
  },
  quiz: {
    questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
    options: 'Options',
    right: 'Exactly.',
    wrong: 'Not quite.',
    nextQuestion: 'Next question',
    seeResult: 'See the result',
    score: (score: number, total: number) => `${score} of ${total}`,
    perfect: 'You have the chapter down. Keep going.',
    review: 'Review the steps that made you hesitate from the chapter index, or try again.',
    retry: 'Try again',
  },
  redirect: {
    moved: 'This page moved to',
  },
};

export type Messages = typeof en;

const es: Messages = {
  meta: {
    hubTitle: 'KatArch · El caso Farmacy Food',
    description:
      "Curso guiado de arquitectura de software a partir del caso real Farmacy Food (O'Reilly Architecture Kata, otoño 2020).",
    chapterTitle: (n, title) => `${pad(n)} · ${title} · KatArch`,
  },
  lang: {
    switcher: 'Idioma',
    switchTo: 'Read in English',
    current: 'Español (actual)',
  },
  theme: {
    toLight: 'Cambiar a tema claro',
    toDark: 'Cambiar a tema oscuro',
  },
  hub: {
    repo: 'Repositorio del equipo ganador ↗',
    start: 'Empezar por el capítulo 1 →',
    resume: 'Continuar donde quedaste →',
    how: [
      ['Una idea por pantalla.', 'Avanzás con las flechas del teclado o deslizando.'],
      ['Diagramas que se arman.', 'Cada figura del equipo, redibujada para recorrerla paso a paso.'],
      ['Evidencia a un clic.', 'El original del repositorio, los documentos y las decisiones siempre disponibles.'],
    ],
    mapLabel: 'Capítulos del curso',
    locked: 'en construcción',
    done: 'completo',
  },
  player: {
    brandLabel: 'KatArch, mapa del curso',
    chapterShort: (n) => `Cap. ${pad(n)}`,
    stage: 'Diagrama',
    showDiagram: 'Ver diagrama',
    readAsText: 'Leer como texto',
    backToInteractive: 'Volver al diagrama interactivo',
    viewOriginal: 'Ver el original del equipo',
    openFullSize: 'Abrir en tamaño completo',
    prevLabel: 'Paso anterior',
    prev: 'Anterior',
    nextLabel: 'Paso siguiente',
    next: 'Siguiente',
    start: 'Empezar',
    nextChapter: 'Capítulo siguiente',
    backToMap: 'Volver al mapa',
    announce: (n, total, title) => `Paso ${n} de ${total}: ${title}`,
  },
  cover: {
    minutes: (m) => `${m} min`,
    steps: (n) => `${n} pasos`,
    start: 'Empezar el capítulo',
    learn: 'Al terminar vas a poder',
    route: 'Recorrido',
  },
  blocks: {
    predict: 'Pausá y predecí',
    tryAgain: 'Probá otra opción, o seguí: la respuesta aparece en el diagrama.',
    decisionLabel: (adrs) => `Decisión registrada · ${adrs}`,
  },
  drawer: {
    close: 'Cerrar',
    concept: 'Concepto',
    doc: 'Documento original del equipo',
    decision: 'Decisión de arquitectura',
    steps: (n) => `Capítulo ${pad(n)} · pasos`,
    docNotFound: 'Documento no encontrado.',
    docLanguage: 'Idioma del documento',
    translation: 'Traducción',
    original: 'Original',
    viewOnGitHub: 'Ver en GitHub',
    problem: 'El problema',
    theDecision: 'La decisión',
    tradeoff: 'Lo que se paga a cambio',
    readAdr: (label) => `Leer ${label}`,
    courseMap: 'Mapa del curso',
  },
  stepper: {
    prev: 'Paso anterior del diagrama',
    next: 'Paso siguiente del diagrama',
    step: (n) => `Paso ${n}`,
    pause: 'Pausa',
    replay: 'Repetir',
    play: 'Reproducir',
  },
  quiz: {
    questionOf: (n, total) => `Pregunta ${n} de ${total}`,
    options: 'Opciones',
    right: 'Exacto.',
    wrong: 'No exactamente.',
    nextQuestion: 'Siguiente pregunta',
    seeResult: 'Ver resultado',
    score: (score, total) => `${score} de ${total}`,
    perfect: 'Tenés el capítulo en la cabeza. Seguí adelante.',
    review: 'Repasá los pasos que te hicieron dudar desde el índice del capítulo, o volvé a intentarlo.',
    retry: 'Reintentar',
  },
  redirect: {
    moved: 'Esta página se mudó a',
  },
};

export const UI: Record<Locale, Messages> = { en, es };

/**
 * Per-module string tables (used by the diagram scenes). The Spanish table
 * fixes the shape; the English one must match it key for key.
 */
export function defineStrings<T>(tables: { es: T; en: NoInfer<T> }): Record<Locale, T> {
  return tables;
}
