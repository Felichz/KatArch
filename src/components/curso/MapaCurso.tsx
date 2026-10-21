import { useEffect, useState } from 'react';
import {
  Activity, BrainCircuit, Calculator, Check, Database, DoorOpen, GitBranch, Layers, ListChecks, Lock, Map, Package, Play, Route,
  Scale, Server, Split, Workflow, Zap, type LucideIcon,
} from 'lucide-react';
import { readVideoProgress } from '../../lib/videoProgress';

/** Lo que el mapa necesita de cada bloque (src/curso/curso.ts, serializado en la página). */
export interface BloqueMapa {
  n: number; slug: string; acto: 'apertura' | 'metodo' | 'territorio' | 'cierre'; titulo: string; etiqueta: string; ensena: string;
  icono: string; familias?: string[]; ruta: string; disponible: boolean; duracion?: number; clave: string; pieza?: string;
  etapas: Record<'guion' | 'visual' | 'voz' | 'video', 'listo' | 'borrador' | 'pendiente'>;
}

const ICONOS: Record<string, LucideIcon> = {
  map: Map, scale: Scale, listChecks: ListChecks, calculator: Calculator, layers: Layers, split: Split, db: Database, route: Route,
  server: Server, door: DoorOpen, zap: Zap, lock: Lock, activity: Activity, package: Package, brainCircuit: BrainCircuit, git: GitBranch, workflow: Workflow,
};
const ETAPAS: [keyof BloqueMapa['etapas'], string][] = [['guion', 'Guion'], ['visual', 'Animación'], ['voz', 'Voz'], ['video', 'Video']];
/** Dónde cae cada región en el plano del territorio (las áreas de la grilla en curso.css). */
const AREA: Record<string, string> = {
  'guardar-datos': 'datos', 'mover-y-procesar': 'mover', 'el-borde': 'borde', 'donde-corre': 'corre', 'cuando-algo-falla': 'falla',
  'identidad-y-datos-sensibles': 'ident', 'ver-que-pasa': 'ver', 'comprar-construir-crecer': 'comprar', 'ia-en-el-sistema': 'ia', 'cambiar-sin-romper': 'cambiar',
};
const min = (s?: number) => (s ? `${Math.round(s / 60)} min` : '');

type Estado = 'visto' | 'disponible' | 'produccion';
function estadoDe(b: BloqueMapa, vistos: Set<string>): Estado {
  if (vistos.has(b.clave)) return 'visto';
  return b.disponible ? 'disponible' : 'produccion';
}

function Etapas({ b }: { b: BloqueMapa }) {
  return (
    <span className="mc-etapas" aria-label="Etapas de producción">
      {ETAPAS.map(([k, nombre]) => (
        <span key={k} className={`mc-etapa mc-etapa--${b.etapas[k]}`} title={`${nombre}: ${b.etapas[k]}`}>
          <i />
          {nombre}
        </span>
      ))}
    </span>
  );
}

function Insignia({ estado, b }: { estado: Estado; b: BloqueMapa }) {
  if (estado === 'visto') return <span className="mc-badge mc-badge--visto"><Check size={14} />Visto</span>;
  if (estado === 'disponible') return <span className="mc-badge mc-badge--disp"><Play size={13} />{min(b.duracion)}</span>;
  return <span className="mc-badge mc-badge--prod">En producción</span>;
}

/** Una estación: un bloque del método, la apertura o el cierre. */
function Estacion({ b, estado }: { b: BloqueMapa; estado: Estado }) {
  const Ico = ICONOS[b.icono] ?? Map;
  return (
    <a className={`mc-est mc-est--${estado}`} href={b.ruta}>
      <span className="mc-est__dot"><Ico size={20} /></span>
      <span className="mc-est__k">{b.etiqueta}</span>
      <span className="mc-est__t">{b.titulo}</span>
      <Insignia estado={estado} b={b} />
      {estado === 'produccion' && <Etapas b={b} />}
    </a>
  );
}

/** Un barrio del territorio: una región del mapa con sus familias de soluciones. */
function Region({ b, estado }: { b: BloqueMapa; estado: Estado }) {
  const Ico = ICONOS[b.icono] ?? Map;
  return (
    <a className={`mc-reg mc-reg--${estado}`} href={b.ruta} style={{ gridArea: AREA[b.slug] }}>
      <span className="mc-reg__top">
        <span className="mc-reg__ic"><Ico size={22} /></span>
        <span className="mc-reg__k">{b.etiqueta}</span>
        <Insignia estado={estado} b={b} />
      </span>
      <span className="mc-reg__t">{b.titulo}</span>
      <span className="mc-reg__fam">
        {(b.familias ?? []).slice(0, 5).map((f) => <span key={f}>{f}</span>)}
      </span>
      {estado === 'produccion' && <Etapas b={b} />}
    </a>
  );
}

/** El diagrama de ClearView que el espectador va completando: una pieza por bloque visto. */
function ClearViewMini({ piezas }: { piezas: { pieza: string; vista: boolean }[] }) {
  const on = (i: number) => (piezas[i]?.vista ? 'mc-cv__on' : '');
  return (
    <svg className="mc-cv" viewBox="0 0 360 200" role="img" aria-label="El diagrama de ClearView que se completa con el curso">
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

export default function MapaCurso({ bloques }: { bloques: BloqueMapa[] }) {
  const [vistos, setVistos] = useState<Set<string>>(new Set());
  useEffect(() => {
    const p = readVideoProgress();
    setVistos(new Set(Object.entries(p).filter(([, v]) => v.done).map(([k]) => k)));
  }, []);

  const total = bloques.length;
  const nVistos = bloques.filter((b) => vistos.has(b.clave)).length;
  const nDisp = bloques.filter((b) => b.disponible).length;
  const siguiente = bloques.find((b) => b.disponible && !vistos.has(b.clave));
  const por = (acto: BloqueMapa['acto']) => bloques.filter((b) => b.acto === acto);
  const piezas = bloques.filter((b) => b.pieza).map((b) => ({ pieza: b.pieza!, vista: vistos.has(b.clave) }));
  const ap = por('apertura')[0], ci = por('cierre')[0];

  return (
    <div className="mc">
      <div className="mc-progreso">
        <div className="mc-progreso__txt">
          <b>{nVistos === 0 ? 'Todavía no empezaste' : `${nVistos} de ${total} bloques vistos`}</b>
          <span>{nDisp} de {total} ya disponibles · el resto, en producción</span>
        </div>
        <div className="mc-barra" aria-hidden="true">
          {bloques.map((b) => <i key={b.slug} className={`mc-barra__${estadoDe(b, vistos)}`} title={`${b.etiqueta}: ${b.titulo}`} />)}
        </div>
        {siguiente && (
          <a className="vbtn vbtn--primary" href={siguiente.ruta}>
            <Play size={15} fill="currentColor" />
            {nVistos === 0 ? 'Empezar' : 'Seguir'}: {siguiente.titulo}
          </a>
        )}
      </div>

      <section className="mc-acto mc-acto--met" aria-labelledby="mc-a1">
        <header className="mc-acto__h">
          <span className="mc-acto__n">Acto 1</span>
          <h2 id="mc-a1">Cómo se decide</h2>
          <p>El método. Cada bloque se apoya en el anterior.</p>
        </header>
        <div className="mc-camino">
          {ap && <Estacion b={ap} estado={estadoDe(ap, vistos)} />}
          {por('metodo').map((b) => <Estacion key={b.slug} b={b} estado={estadoDe(b, vistos)} />)}
        </div>
      </section>

      <section className="mc-acto mc-acto--ter" aria-labelledby="mc-a2">
        <header className="mc-acto__h">
          <span className="mc-acto__n">Acto 2</span>
          <h2 id="mc-a2">El territorio</h2>
          <p>Diez regiones. En cada una, las familias de soluciones que existen y lo que gana y paga cada una.</p>
        </header>
        <div className="mc-plano">
          {por('territorio').map((b) => <Region key={b.slug} b={b} estado={estadoDe(b, vistos)} />)}
        </div>
      </section>

      <section className="mc-acto mc-acto--cie" aria-labelledby="mc-a3">
        <header className="mc-acto__h">
          <span className="mc-acto__n">Cierre</span>
          <h2 id="mc-a3">Un sistema entero</h2>
          <p>El ClearView de la apertura, de punta a punta. Cada bloque que ves le agrega una pieza.</p>
        </header>
        <div className="mc-cierre">
          <ClearViewMini piezas={piezas} />
          <div className="mc-cierre__txt">
            <b>{piezas.filter((p) => p.vista).length} de {piezas.length} piezas de ClearView</b>
            <ul>{piezas.map((p) => <li key={p.pieza} className={p.vista ? 'is-on' : ''}>{p.pieza}</li>)}</ul>
            {ci && <Estacion b={ci} estado={estadoDe(ci, vistos)} />}
          </div>
        </div>
      </section>
    </div>
  );
}
