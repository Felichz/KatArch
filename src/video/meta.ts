/**
 * The video edition: one course, eleven lessons, built from what the twelve first places of the O'Reilly
 * Architecture Katas left written. Timings, sections, transcript and captions come from src/video/courses/curso.json
 * (scripts/build-video-data.mjs); the editorial layer (phase, blurb, ideas) lives here.
 */
import curso from './courses/curso.json';

export interface VideoSection { title: string; start: number }
export interface VideoLine { start: number; end: number; text: string }
export interface VideoCue { start: number; end: number; words: [string, number][] }
export interface VideoChapter {
  id: string;
  number: number;
  title: string;
  duration: number;
  video: string;
  poster: string;
  sections: VideoSection[];
  transcript: VideoLine[];
  captions: VideoCue[];
  phase: string;
  blurb: string;
  ideas: string[];
}

export interface Course {
  slug: string;
  title: string;
  lead: string;
  chapters: VideoChapter[];
}

/** Where the MP4s live (Cloudflare R2). Override with PUBLIC_VIDEO_BASE, e.g. a custom domain. */
export const VIDEO_BASE = (import.meta.env.PUBLIC_VIDEO_BASE ?? 'https://pub-6f7b6eb91057473ca260f6f34d89ad81.r2.dev').replace(/\/$/, '');

/** Each lesson's part of the course, one-line description and the ideas it leaves. */
const META: Record<string, { phase: string; blurb: string; ideas: string[] }> = {
  decisiones: {
    phase: 'Las bases',
    blurb: 'Qué hace que una decisión sea de arquitectura, cómo se deja escrita en un ADR y los cinco casos que acompañan el curso.',
    ideas: [
      'Una decisión de arquitectura cuesta cambiarla y afecta a cualidades del sistema entero.',
      'Un ADR completo dice por qué había que decidir, qué se descartó, qué cuesta y qué requisito la pide.',
      'Lo que más falta en las decisiones de los ganadores es el vínculo con el requisito.',
    ],
  },
  cualidades: {
    phase: 'Qué importa',
    blurb: 'Del pedido del cliente a las pocas cualidades que deciden la forma del sistema, y qué pasa con las que quedan fuera.',
    ideas: [
      'Las cualidades salen de leer el pedido frase por frase o de partir de lo que hace difícil el caso.',
      'Lo que la tabla de estilos no tiene no pesa en la elección: queda por decidir dónde se resuelve.',
      'Copiar el requisito ata la decisión a una versión; citarlo por su identificador permite seguirla.',
    ],
  },
  renuncias: {
    phase: 'Qué importa',
    blurb: 'Renunciar a una cualidad sin descuidarla, y comprobar con cuentas de tiempo y de costo que lo elegido aguanta.',
    ideas: [
      'Una renuncia escrita nombra la condición del negocio que la hace segura.',
      'Una cuenta dice qué supuesto decide el resultado, y ese es el número que hay que medir.',
      'Lo útil de una cuenta de costo es qué parte se mueve con la carga y qué parte no.',
    ],
  },
  fronteras: {
    phase: 'Cómo se parte',
    blurb: 'El negocio propone las partes, lo que cada parte necesita decide el corte, y el estilo se elige después.',
    ideas: [
      'Cada frontera queda donde cambia lo que necesita cada parte.',
      'No partir también es una decisión, y se escribe con la misma razón que un corte.',
      'Lo que se llama esperando respuesta cae junto: agruparlo permite pedirle a cada parte lo que necesita.',
    ],
  },
  datos: {
    phase: 'Cómo se parte',
    blurb: 'Compartir o separar la base de datos, qué se pierde al repartir y dónde está la línea entre lo que puede llegar tarde y lo que no.',
    ideas: [
      'Una base compartida necesita una regla con dueño, y un permiso de la base puede imponerla.',
      'Al repartir los datos se pierde la transacción y aparece la consistencia eventual.',
      'Lo que cambia junto se guarda junto; entre grupos distintos, los cambios viajan por eventos.',
    ],
  },
  comunicacion: {
    phase: 'Cómo se parte',
    blurb: 'Cuándo una parte espera la respuesta de otra y cuándo deja un mensaje y sigue, con sistemas propios y ajenos.',
    ideas: [
      'Para cada flecha se pregunta si quien llama necesita la respuesta para seguir.',
      'Poner adaptadores o no depende de un supuesto, y el supuesto también se escribe.',
      'Cuando el otro lado es poco fiable, que sea él quien pregunte.',
    ],
  },
  fallos: {
    phase: 'Cómo se parte',
    blurb: 'Mensajes duplicados, escrituras a medias, reintentos que se acaban y silencios: lo que se diseña aparte del camino feliz.',
    ideas: [
      'Entregar al menos una vez trae duplicados, y el duplicado se descarta por identificador y versión.',
      'Guardar el evento primero en la misma base evita las escrituras a medias.',
      'Diseñar el fallo incluye su final: alguien tiene que enterarse.',
    ],
  },
  'datos-sensibles': {
    phase: 'Lo que cruza todo',
    blurb: 'Dónde vive un dato sensible, quién lo ve completo, cuánto se conserva y cómo se borra, decidido antes de guardarlo.',
    ideas: [
      'Casi siempre una sola parte necesita el dato entero; las demás pueden vivir con menos.',
      'Un plazo de conservación es una tabla de niveles, cada uno con su propósito.',
      'Una clave por usuario convierte el borrado en eliminar una sola cosa.',
    ],
  },
  'comprar-o-construir': {
    phase: 'Lo que cruza todo',
    blurb: 'Qué se compra hecho, qué se construye, y la condición escrita que dice cuándo dejar de empezar simple.',
    ideas: [
      'Lo comprado sale de la lista de lo que se construye, no de la lista de lo que el sistema necesita.',
      'Una condición de cambio completa dice qué se mide, qué valor la dispara y en cuánto tiempo.',
      'Una regla sobre la arquitectura que se comprueba sola se llama función de aptitud.',
    ],
  },
  modelos: {
    phase: 'Lo que cruza todo',
    blurb: 'Qué cambia cuando una pieza del sistema es un modelo de IA que no siempre responde igual.',
    ideas: [
      'Lo que el modelo no puede violar va en reglas escritas en código.',
      'Cuando el modelo duda, el resultado por defecto dice quién pierde.',
      'Un modelo nuevo se trata como una versión nueva del sistema.',
    ],
  },
  'lo-escrito': {
    phase: 'Lo que cruza todo',
    blurb: 'Qué tiene que quedar escrito para que otra persona pueda comprobar una decisión sin preguntarle al autor.',
    ideas: [
      'Si una decisión se aparta de un requisito, esa decisión es el lugar para decirlo.',
      'El estado de una decisión es información: reemplazada, rechazada y abierta dicen cosas que aceptada no dice.',
      'Lo que queda fuera del sistema también se cierra por escrito.',
    ],
  },
};

type Raw = Omit<VideoChapter, 'phase' | 'blurb' | 'ideas'>;

export const COURSE: Course = {
  slug: 'curso',
  title: 'Decisiones de arquitectura',
  lead: 'Cómo se diseña un sistema de software entero, contado en once videos a partir de lo que dejaron escrito los equipos que ganaron las Architecture Katas de O\'Reilly entre 2020 y 2025.',
  chapters: (curso as unknown as Raw[]).map((c) => ({ ...c, ...META[c.id] })),
};

/** The five cases that come back in every lesson (CANON.md). */
export const CASES: { name: string; what: string; why: string; team: string }[] = [
  { name: 'MonitorMe', what: 'Un sistema para hospitales que muestra en la estación de enfermería los signos vitales de los pacientes y avisa cuando algo sale de rango.', why: 'Responder rápido y seguir funcionando aunque falle un dispositivo.', team: 'BluzBrothers' },
  { name: 'ClearView', what: 'La plataforma de una organización sin fines de lucro que empareja currículums anonimizados con puestos de trabajo.', why: 'Usar inteligencia artificial con poco dinero, cuidando el sesgo.', team: 'Pragmatic' },
  { name: 'Sysops Squad', what: 'El servicio de soporte técnico de una empresa de electrónica, con un sistema de tickets viejo que pierde tickets y se cae seguido.', why: 'Partir un sistema que ya existe y guarda tarjetas de crédito.', team: 'Team 7' },
  { name: 'Farmacy Food', what: 'Un servicio de comidas preparadas que se entregan en refrigeradores inteligentes.', why: 'Hacer mucho con un presupuesto muy limitado.', team: 'ArchColider' },
  { name: 'MobilityCorp', what: 'Una empresa que alquila scooters, bicicletas, autos y camionetas eléctricos en Europa.', why: 'Decidir en qué partes del sistema usar inteligencia artificial.', team: 'Five Nines' },
];

/** The twelve first places the course reads, newest first (TheKataLog). */
export const WINNERS: { team: string; edition: string; year: number; case: string; repo: string }[] = [
  { team: 'Five Nines', edition: 'Q4 2025', year: 2025, case: 'MobilityCorp', repo: 'https://github.com/TheKataLog/Five-Nines' },
  { team: 'ZAItects', edition: 'Invierno 2025', year: 2025, case: 'Certifiable', repo: 'https://github.com/TheKataLog/ZAITects' },
  { team: 'Pragmatic', edition: 'Otoño 2024', year: 2024, case: 'ClearView', repo: 'https://github.com/TheKataLog/Pragmatic' },
  { team: 'ConnectedAI', edition: 'AI Kata 2024', year: 2024, case: 'ShopWise', repo: 'https://github.com/TheKataLog/ConnectedAI' },
  { team: 'BluzBrothers', edition: 'Invierno 2024', year: 2024, case: 'MonitorMe', repo: 'https://github.com/TheKataLog/BluzBrothers' },
  { team: 'Profitero Data Alchemists', edition: 'Otoño 2023 · externa', year: 2023, case: 'Road Warrior', repo: 'https://github.com/TheKataLog/Profitero-Data-Alchemists' },
  { team: 'CELUS Ceals', edition: 'Otoño 2023', year: 2023, case: 'Wildlife Watcher', repo: 'https://github.com/TheKataLog/Celus-Ceals' },
  { team: 'monArch', edition: 'Otoño 2022', year: 2022, case: 'Hey Blue!', repo: 'https://github.com/TheKataLog/MonArch' },
  { team: 'Pegasuz', edition: 'Primavera 2022', year: 2022, case: 'Spotlight', repo: 'https://github.com/TheKataLog/Pegasuz' },
  { team: 'The Archangels', edition: 'Otoño 2021', year: 2021, case: 'Farmacy Family', repo: 'https://github.com/TheKataLog/Archangels' },
  { team: 'Team 7', edition: 'Primavera 2021', year: 2021, case: 'Sysops Squad', repo: 'https://github.com/TheKataLog/Team-7' },
  { team: 'ArchColider', edition: 'Otoño 2020', year: 2020, case: 'Farmacy Food', repo: 'https://github.com/TheKataLog/ArchColider' },
];

export const coursePath = () => '/';
export const chapterPath = (id: string) => `/${id}/`;

/** The MP4 of a lesson. PUBLIC_LOCAL_VIDEO=curso serves them from public/local-video/ instead (gitignored). */
const LOCAL = ['1', 'curso'].includes(String(import.meta.env.PUBLIC_LOCAL_VIDEO ?? ''));
export const videoUrl = (c: VideoChapter) => (LOCAL ? `/local-video/${c.video}` : `${VIDEO_BASE}/${c.video}`);

export const totalSeconds = (c: Course) => c.chapters.reduce((a, ch) => a + ch.duration, 0);
export const phasesOf = (c: Course) => [...new Set(c.chapters.map((ch) => ch.phase))];
export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
export const fmtTotal = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
  return h ? `${h} h ${m} min` : `${m} min`;
};

/** The key a lesson's progress is stored under (prefixed, so it never collides with the old per-kata courses). */
export const progressKey = (id: string) => `curso/${id}`;

/** Lesson slugs and old per-kata course URLs, sent to the course home. */
export const OLD_COURSES: Record<string, string[]> = {
  archcolider: ['terreno', 'podio', 'principios', 'estilo', 'dominio', 'concurrencia', 'suscriptor', 'infraestructura', 'costos', 'mapa', 'guia'],
  'five-nines': ['encargo', 'negocio', 'fuente-de-verdad', 'herramientas', 'confianza', 'flota', 'proveedor', 'contar'],
};
