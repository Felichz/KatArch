/**
 * El curso v2 (cursos/_investigacion/PLAN-CURSO.md): apertura, acto 1 (cómo se decide), acto 2 (el territorio,
 * una región del mapa por bloque) y cierre. Cada bloque dice qué enseña, su par de casos y en qué etapa de
 * producción está. Los datos del video de un bloque listo (secciones, transcripción, subtítulos) los genera
 * scripts/build-curso-data.mjs en src/curso/bloques.json.
 */
import generated from './bloques.json';

export type Acto = 'apertura' | 'metodo' | 'territorio' | 'cierre';
export type Etapa = 'listo' | 'borrador' | 'pendiente';
/** Las etapas de producción de un bloque, en orden. */
export const ETAPAS = ['guion', 'visual', 'voz', 'video'] as const;
export type EtapaId = (typeof ETAPAS)[number];
export const ETAPA_NOMBRE: Record<EtapaId, string> = { guion: 'Guion', visual: 'Animación', voz: 'Voz', video: 'Video' };

export interface Bloque {
  n: number;
  slug: string;
  acto: Acto;
  titulo: string;
  /** Una frase: qué se lleva quien lo ve. */
  ensena: string;
  /** El par de casos que se comparan. */
  par?: [string, string];
  /** La pregunta que decide (bloques del territorio). */
  pregunta?: string;
  /** Las familias de soluciones de la región (bloques del territorio). */
  familias?: string[];
  /** Ícono de lucide para el mapa. */
  icono: string;
  etapas: Record<EtapaId, Etapa>;
  /** La pieza que este bloque le agrega al diagrama de ClearView. */
  pieza?: string;
}

export interface VideoBloque {
  duration: number;
  video: string;
  poster: string;
  voz: string;
  sections: { title: string; start: number }[];
  transcript: { start: number; end: number; text: string }[];
  captions: { start: number; end: number; words: [string, number][] }[];
}

const pend = { guion: 'pendiente', visual: 'pendiente', voz: 'pendiente', video: 'pendiente' } as const;
const guionBorrador = { ...pend, guion: 'borrador' } as const;
/** Guion revisado por sombreros (falta la aprobación de Felix), guion visual y animación hechos; falta la voz y el render. */
const animado = { ...pend, guion: 'borrador', visual: 'listo' } as const;

export const ACTOS: { id: Acto; nombre: string; bajada: string }[] = [
  { id: 'apertura', nombre: 'Apertura', bajada: 'Un sistema entero y el mapa vacío, antes de explicar nada.' },
  { id: 'metodo', nombre: 'Acto 1 · Cómo se decide', bajada: 'El método: cualidades, renuncias, cuentas, estilo y cortes, y cómo se deja escrito.' },
  { id: 'territorio', nombre: 'Acto 2 · El territorio', bajada: 'Diez regiones del mapa. En cada una, las familias de soluciones, qué gana y qué paga cada una, y dos ganadores que eligieron distinto.' },
  { id: 'cierre', nombre: 'Cierre', bajada: 'ClearView de punta a punta: cada pieza en su región y la cadena de decisiones encima.' },
];

export const BLOQUES: Bloque[] = [
  { n: 0, slug: 'apertura', acto: 'apertura', titulo: 'Un sistema entero, antes de explicarlo', icono: 'map', ensena: 'De dónde sale el material, y un sistema real con cuatro preguntas que el curso va a contestar.', etapas: { guion: 'listo', visual: 'listo', voz: 'borrador', video: 'listo' } },
  { n: 1, slug: 'decision', acto: 'metodo', titulo: 'Qué es una decisión de arquitectura', icono: 'scale', ensena: 'Qué hace que una decisión sea de arquitectura, qué es un trade-off, y cómo se deja escrita en un ADR de cuatro partes.', par: ['ClearView comparte una base y escribe su precio', 'MobilityCorp ata su decisión a los requisitos que la piden'], etapas: { guion: 'listo', visual: 'listo', voz: 'borrador', video: 'listo' }, pieza: 'la base compartida' },
  { n: 2, slug: 'cualidades', acto: 'metodo', titulo: 'Del requisito a las cualidades', icono: 'listChecks', ensena: 'Cómo salen las pocas cualidades que mandan, y por qué cada renuncia se escribe con la condición que la hace segura.', par: ['MonitorMe lee el pedido frase por frase', 'ClearView parte de lo que hace difícil el caso'], etapas: { guion: 'listo', visual: 'listo', voz: 'borrador', video: 'listo' } },
  { n: 3, slug: 'cuenta', acto: 'metodo', titulo: 'Comprobar con una cuenta', icono: 'calculator', ensena: 'Cómo una cualidad se vuelve un número que se puede comprobar, y cuál es el supuesto que mueve todo.', par: ['MonitorMe reparte un segundo entre tramos', 'ClearView cuenta llamadas al modelo'], etapas: animado },
  { n: 4, slug: 'estilo', acto: 'metodo', titulo: 'El estilo', icono: 'layers', ensena: 'Cómo se elige la forma general del sistema con las cualidades, y por qué puede variar por parte.', par: ['ClearView: servicios y eventos donde hace falta', 'Farmacy Food: un monolito modular'], etapas: animado, pieza: 'el estilo por zonas' },
  { n: 5, slug: 'corte', acto: 'metodo', titulo: 'Dónde se corta un sistema', icono: 'split', ensena: 'Cortar con un criterio nombrado, decidir no partir, y pedirle a cada parte su propio nivel de servicio.', par: ['Farmacy Family corta por criterio', 'Sysops Squad propone cortar por cualidades'], etapas: animado },
  { n: 6, slug: 'guardar-datos', acto: 'territorio', titulo: 'Guardar datos', icono: 'db', ensena: 'Qué familias de almacén existen, qué consulta sirve cada una, y quién puede cambiar cada dato.', familias: ['relacional', 'series de tiempo', 'grafo', 'archivos'], par: ['MonitorMe guarda lecturas con hora', 'Farmacy Family elige un almacén por necesidad'], pregunta: '¿Qué forma tiene el dato, cómo se consulta y quién puede cambiarlo?', etapas: animado, pieza: 'un escritor por dato' },
  { n: 7, slug: 'mover-y-procesar', acto: 'territorio', titulo: 'Mover y procesar', icono: 'route', ensena: 'Esperar o seguir, cola o stream, en línea o por lotes: cómo se elige por dónde viaja cada mensaje.', familias: ['llamada que espera', 'cola', 'stream', 'conexión abierta', 'lotes y calendario'], par: ['Spotlight: un evento, varios lectores', 'Sysops Squad: un mensaje, un destino'], pregunta: '¿Hay que esperar? ¿Cuántos leen? ¿Hay que guardarlo?', etapas: pend },
  { n: 8, slug: 'donde-corre', acto: 'territorio', titulo: 'Dónde corre', icono: 'server', ensena: 'Máquinas propias, contenedores, plataformas gestionadas o el propio dispositivo: cuánto se controla y cuánto se opera.', familias: ['máquinas propias', 'contenedores con orquestador', 'gestionado o sin servidores', 'en el dispositivo'], par: ['MonitorMe corre en cada hospital', 'ShopWise usa una plataforma gestionada'], pregunta: '¿Cuánto quiero controlar y cuánto quiero operar?', etapas: pend },
  { n: 9, slug: 'el-borde', acto: 'territorio', titulo: 'El borde', icono: 'door', ensena: 'Por dónde entra lo que viene de afuera: gateways, una API por tipo de cliente, archivos directo al almacenamiento.', familias: ['gateway', 'una API por cliente', 'archivos directo', 'quién inicia'], par: ['Spotlight: GraphQL para sus apps', 'Sysops Squad: un gateway por parte'], pregunta: '¿Quién entra, por dónde, y quién controla esa puerta?', etapas: pend },
  { n: 10, slug: 'cuando-algo-falla', acto: 'territorio', titulo: 'Cuando algo falla', icono: 'zap', ensena: 'Proteger lo que el negocio no puede perder: segundo camino, reintentos, duplicados, guardar y avisar sin quedar a medias.', familias: ['réplicas', 'segundo camino', 'reintentos', 'descartar duplicados', 'funcionar sin red'], par: ['Farmacy Food: un código que abre sin red', 'MonitorMe: la alerta por dos caminos'], pregunta: '¿Qué no puede perder el negocio, y qué pasa si esto falla?', etapas: pend, pieza: 'la cola de reintentos' },
  { n: 11, slug: 'identidad-y-datos-sensibles', acto: 'territorio', titulo: 'Identidad y datos sensibles', icono: 'lock', ensena: 'Dónde vive el dato sensible, quién lo ve completo, cuánto dura y cómo se borra.', familias: ['proveedor de identidad', 'permisos', 'cifrado', 'retención por niveles'], par: ['ClearView: un permiso que impide leer', 'Farmacy Family: borrar una clave'], pregunta: '¿Quién lo ve completo, cuánto dura y cómo se borra?', etapas: pend, pieza: 'el candado del currículum' },
  { n: 12, slug: 'ver-que-pasa', acto: 'territorio', titulo: 'Ver qué pasa', icono: 'activity', ensena: 'Registros, métricas, trazas y salud del negocio: cómo enterarse de que algo anda mal antes que el cliente.', familias: ['registros', 'métricas', 'trazas', 'salud del negocio'], par: ['Farmacy Food mide el negocio', 'ShopWise guarda sus trazas en casa'], pregunta: '¿Cómo me entero antes que el cliente?', etapas: pend },
  { n: 13, slug: 'comprar-construir-crecer', acto: 'territorio', titulo: 'Comprar, construir y crecer', icono: 'package', ensena: 'Qué se compra y qué se construye, empezar simple con la salida escrita, y las premisas que envejecen.', familias: ['servicio comprado', 'abierto y operado', 'gestionado', 'construido'], par: ['Spotlight compra y envuelve', 'ShopWise construye su gateway'], pregunta: '¿Qué tan cerca está de lo que nos hace distintos, y qué premisa sostiene la elección?', etapas: pend },
  { n: 14, slug: 'ia-en-el-sistema', acto: 'territorio', titulo: 'IA en el sistema', icono: 'brainCircuit', ensena: 'Qué no puede decidir un modelo, qué pasa cuando duda, cómo se mide y cómo se le pone arquitectura alrededor.', familias: ['gestionado o propio', 'recuperar contexto', 'gateway de modelos', 'reglas alrededor', 'evaluación'], par: ['ClearView saca al modelo de la decisión', 'MobilityCorp lo rodea de reglas'], pregunta: '¿Qué no puede decidir el modelo, y qué pasa cuando duda?', etapas: pend, pieza: 'la IA fuera de la decisión' },
  { n: 15, slug: 'cambiar-sin-romper', acto: 'territorio', titulo: 'Cambiar sin romper', icono: 'git', ensena: 'Sombra, fases, activar de a poco, y lo que se decide no hacer dejado por escrito.', familias: ['integración continua', 'infraestructura como código', 'activar para una parte', 'sombra y fases'], par: ['MobilityCorp prueba en sombra', 'Certifiable corre en paralelo con personas'], pregunta: '¿Cómo sé que funciona antes de darle el control?', etapas: pend, pieza: 'el caché rechazado' },
  { n: 16, slug: 'cierre', acto: 'cierre', titulo: 'ClearView de punta a punta', icono: 'workflow', ensena: 'La cadena entera: cada decisión obliga a la siguiente, y cada pieza cae en su región del mapa.', etapas: guionBorrador },
];

export const VIDEOS = generated as Record<string, VideoBloque>;
export const videoDe = (b: Bloque): VideoBloque | null => VIDEOS[b.slug] ?? null;
export const disponible = (b: Bloque) => b.etapas.video === 'listo' && !!videoDe(b);
export const rutaBloque = (b: Bloque) => `/curso/${b.slug}/`;
export const claveProgreso = (b: Bloque) => `curso2/${b.slug}`;
export const etiqueta = (b: Bloque) => (b.acto === 'apertura' ? 'Apertura' : b.acto === 'cierre' ? 'Cierre' : `Bloque ${b.n}`);
/** Avance de producción de un bloque, de 0 a 1 (listo cuenta 1, borrador medio). */
export const avanceProduccion = (b: Bloque) => ETAPAS.reduce((a, e) => a + (b.etapas[e] === 'listo' ? 1 : b.etapas[e] === 'borrador' ? 0.5 : 0), 0) / ETAPAS.length;
