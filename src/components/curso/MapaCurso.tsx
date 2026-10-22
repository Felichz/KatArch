import { useEffect, useState } from 'react';
import { Check, Play } from 'lucide-react';
import { readVideoProgress, type VideoProgress } from '../../lib/videoProgress';
import { useIdioma, type Idioma } from '../../lib/idioma';

/** Lo que el índice necesita de cada bloque (src/curso/curso.ts, serializado en la página). */
export interface BloqueMapa {
  n: number; slug: string; acto: 'apertura' | 'metodo' | 'territorio' | 'cierre'; titulo: string; etiqueta: string; ensena: string;
  ruta: string; disponible: boolean; duracion?: number; poster?: string; clave: string; pieza?: string;
  /** el mismo bloque en inglés (src/curso/curso.en.ts) */
  en?: { titulo: string; etiqueta: string; ensena: string; pieza?: string };
}

/** Los textos del índice en los dos idiomas. */
const TX = {
  es: {
    bloques: (n: number) => `${n} ${n === 1 ? 'bloque' : 'bloques'}`,
    wip: 'En producción', visto: 'Visto',
    nada: 'Todavía no empezaste', todo: 'Viste el curso entero', vistos: (n: number, t: number) => `Viste ${n} de ${t} bloques`,
    empieza: 'Empieza por', sigue: 'Sigue', volver: 'Puedes volver a cualquier bloque', empezar: 'Empezar el curso', seguir: 'Seguir viendo',
    piezas: (n: number, t: number) => `${n} de ${t} piezas de ClearView`, piezasBajada: 'Cada bloque que terminas le agrega su pieza al diagrama.',
    cv: 'El diagrama de ClearView que se completa con el curso',
    sec: {
      ap: ['Apertura', 'Antes de empezar', 'De dónde sale el material, y el sistema que el curso va a desarmar.'],
      a1: ['Acto 1', 'Cómo se decide', 'El método, en orden: cada bloque se apoya en el anterior.'],
      a2: ['Acto 2', 'El territorio', 'Diez regiones del mapa. En cada una, las familias de soluciones que existen, qué gana y qué paga cada una, y dos ganadores que eligieron distinto.'],
      ci: ['Cierre', 'Todo junto', 'El sistema de la apertura otra vez, ahora con cada decisión en su lugar.'],
    },
  },
  en: {
    bloques: (n: number) => `${n} ${n === 1 ? 'block' : 'blocks'}`,
    wip: 'In production', visto: 'Watched',
    nada: "You haven't started yet", todo: 'You watched the whole course', vistos: (n: number, t: number) => `You watched ${n} of ${t} blocks`,
    empieza: 'Start with', sigue: 'Up next', volver: 'You can go back to any block', empezar: 'Start the course', seguir: 'Keep watching',
    piezas: (n: number, t: number) => `${n} of ${t} ClearView pieces`, piezasBajada: 'Each block you finish adds its piece to the diagram.',
    cv: 'The ClearView diagram that the course completes',
    sec: {
      ap: ['Opening', 'Before starting', 'Where the material comes from, and the system the course will take apart.'],
      a1: ['Act 1', 'How it is decided', 'The method, in order: each block builds on the previous one.'],
      a2: ['Act 2', 'The territory', 'Ten regions of the map. In each one, the families of solutions that exist, what each one gains and pays, and two winners that chose differently.'],
      ci: ['Closing', 'All together', 'The system from the opening again, now with each decision in its place.'],
    },
  },
} satisfies Record<Idioma, unknown>;
type Tx = (typeof TX)['es'];

const min = (s?: number) => (s ? `${Math.round(s / 60)} min` : '');
const total = (bs: BloqueMapa[]) => {
  const m = Math.round(bs.reduce((a, b) => a + (b.duracion ?? 0), 0) / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`;
};

type Estado = 'visto' | 'empezado' | 'disponible' | 'produccion';
function estadoDe(b: BloqueMapa, p: VideoProgress): Estado {
  const x = p[b.clave];
  if (x?.done) return 'visto';
  if (!b.disponible) return 'produccion';
  return x && x.t > 10 ? 'empezado' : 'disponible';
}

/** Un bloque: miniatura, número, título y qué enseña. `ancha` pone la miniatura al lado del texto (apertura y cierre). */
function Tarjeta({ b, p, t, ancha }: { b: BloqueMapa; p: VideoProgress; t: Tx; ancha?: boolean }) {
  const estado = estadoDe(b, p);
  const avance = estado === 'empezado' ? Math.min(100, (p[b.clave].t / p[b.clave].d) * 100) : 0;
  return (
    <a className={`mc-card mc-card--${estado}${ancha ? ' mc-card--ancha' : ''}`} href={b.ruta}>
      <span className="mc-card__img">
        {b.poster ? <img src={b.poster} alt="" loading="lazy" width="960" height="540" /> : <span className="mc-card__wip">{t.wip}</span>}
        {b.disponible && <span className="mc-card__dur">{min(b.duracion)}</span>}
        {estado === 'visto' && <span className="mc-card__ok"><Check size={13} strokeWidth={3} /> {t.visto}</span>}
        {b.disponible && <span className="mc-card__play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>}
        {avance > 0 && <span className="mc-card__bar" style={{ width: `${avance}%` }} />}
      </span>
      <span className="mc-card__txt">
        <span className="mc-card__k">{b.etiqueta}</span>
        <span className="mc-card__t">{b.titulo}</span>
        <span className="mc-card__e">{b.ensena}</span>
      </span>
    </a>
  );
}

/** El diagrama de ClearView que el espectador va completando: una pieza por bloque visto. */
function ClearViewMini({ piezas, label }: { piezas: { pieza: string; vista: boolean }[]; label: string }) {
  const on = (i: number) => (piezas[i]?.vista ? 'mc-cv__on' : '');
  return (
    <svg className="mc-cv" viewBox="0 0 360 200" role="img" aria-label={label}>
      <g className="mc-cv__ln">
        <path d="M70 100 H120" /><path d="M200 60 V80" /><path d="M200 140 V120" /><path d="M160 100 H120" /><path d="M240 100 H290" /><path d="M240 70 L290 40" /><path d="M240 130 L290 160" />
      </g>
      <circle cx="50" cy="100" r="16" className="mc-cv__p" />
      <rect x="160" y="40" width="80" height="22" rx="6" className={`mc-cv__s ${on(1)}`} />
      <rect x="160" y="138" width="80" height="22" rx="6" className={`mc-cv__s ${on(1)}`} />
      <rect x="100" y="89" width="58" height="22" rx="6" className={`mc-cv__s ${on(1)}`} />
      <ellipse cx="200" cy="100" rx="38" ry="20" className={`mc-cv__db ${on(0)}`} />
      <path d="M190 100 h20" className={`mc-cv__lock ${on(2)} ${on(4)}`} />
      <rect x="290" y="28" width="56" height="24" rx="6" className={`mc-cv__ext ${on(5)}`} />
      <rect x="290" y="88" width="56" height="24" rx="6" className={`mc-cv__ext ${on(3)}`} />
      <rect x="290" y="148" width="56" height="24" rx="6" className={`mc-cv__ext ${on(6)}`} />
    </svg>
  );
}

function Seccion({ id, txt: [k, titulo, bajada], t, bs, children }: { id: string; txt: string[]; t: Tx; bs: BloqueMapa[]; children: React.ReactNode }) {
  return (
    <section className="mc-sec" aria-labelledby={id}>
      <header className="mc-sec__h">
        <span className="mc-sec__k">{k}</span>
        <h2 id={id}>{titulo}</h2>
        <p>{bajada}</p>
        <span className="mc-sec__meta">{t.bloques(bs.length)} · {total(bs)}</span>
      </header>
      {children}
    </section>
  );
}

export default function MapaCurso({ bloques: todos }: { bloques: BloqueMapa[] }) {
  const l = useIdioma();
  const t = TX[l];
  const bloques = l === 'en' ? todos.map((b) => (b.en ? { ...b, ...b.en } : b)) : todos;
  const [p, setP] = useState<VideoProgress>({});
  useEffect(() => setP(readVideoProgress()), []);

  const vistos = bloques.filter((b) => p[b.clave]?.done).length;
  const siguiente = bloques.find((b) => b.disponible && !p[b.clave]?.done);
  const empezado = siguiente && (p[siguiente.clave]?.t ?? 0) > 10;
  const por = (acto: BloqueMapa['acto']) => bloques.filter((b) => b.acto === acto);
  const ap = por('apertura'), met = por('metodo'), ter = por('territorio'), ci = por('cierre');
  const piezas = bloques.filter((b) => b.pieza).map((b) => ({ pieza: b.pieza!, vista: !!p[b.clave]?.done }));

  return (
    <div className="mc">
      <div className="mc-progreso">
        <div className="mc-progreso__txt">
          <b>{vistos === 0 ? t.nada : vistos === bloques.length ? t.todo : t.vistos(vistos, bloques.length)}</b>
          <span>{siguiente ? `${vistos === 0 && !empezado ? t.empieza : t.sigue}: ${siguiente.etiqueta.toLowerCase()}, ${siguiente.titulo}` : t.volver}</span>
        </div>
        <ol className="mc-barra" aria-hidden="true">
          {bloques.map((b) => <li key={b.slug} className={`mc-barra__${estadoDe(b, p)}`} title={`${b.etiqueta}: ${b.titulo}`} />)}
        </ol>
        {siguiente && (
          <a className="vbtn vbtn--primary" href={siguiente.ruta}>
            <Play size={15} fill="currentColor" />
            {vistos === 0 && !empezado ? t.empezar : t.seguir}
          </a>
        )}
      </div>

      <Seccion id="mc-ap" txt={t.sec.ap} t={t} bs={ap}>
        {ap.map((b) => <Tarjeta key={b.slug} b={b} p={p} t={t} ancha />)}
      </Seccion>

      <Seccion id="mc-a1" txt={t.sec.a1} t={t} bs={met}>
        <div className="mc-grid">{met.map((b) => <Tarjeta key={b.slug} b={b} p={p} t={t} />)}</div>
      </Seccion>

      <Seccion id="mc-a2" txt={t.sec.a2} t={t} bs={ter}>
        <div className="mc-grid">{ter.map((b) => <Tarjeta key={b.slug} b={b} p={p} t={t} />)}</div>
      </Seccion>

      <Seccion id="mc-ci" txt={t.sec.ci} t={t} bs={ci}>
        <div className="mc-cierre">
          {ci.map((b) => <Tarjeta key={b.slug} b={b} p={p} t={t} ancha />)}
          {piezas.length > 0 && (
            <div className="mc-piezas">
              <ClearViewMini piezas={piezas} label={t.cv} />
              <div>
                <b>{t.piezas(piezas.filter((x) => x.vista).length, piezas.length)}</b>
                <p>{t.piezasBajada}</p>
                <ul>{piezas.map((x) => <li key={x.pieza} className={x.vista ? 'is-on' : ''}>{x.pieza}</li>)}</ul>
              </div>
            </div>
          )}
        </div>
      </Seccion>
    </div>
  );
}
