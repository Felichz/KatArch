import { useEffect, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Boxes, ScrollText, MailCheck, KeyRound, Smartphone, ShieldCheck, Server, Activity, IdCard, CreditCard, DoorOpen, ArrowUpRight, ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Node, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useLocale, useT, useUi } from '../i18n/react';
import { useCourse } from '../components/CourseContext';
import { DECISIONS, PILLARS, type DecisionEntry } from '../content/decision-map';

/* ───────────────────────── shared data ───────────────────────── */

type DecId = 'monolith' | 'event-sourcing' | 'rabbitmq' | 'pin-offline' | 'catalog-cache' | 'privacy' | 'scale-up' | 'datadog' | 'edge-auth' | 'payment';

/** The chapter of this course where each decision is made. */
const FROM: Record<DecId, number> = {
  monolith: 4,
  payment: 5,
  'event-sourcing': 6,
  rabbitmq: 6,
  'pin-offline': 6,
  'catalog-cache': 6,
  'edge-auth': 8,
  'scale-up': 8,
  datadog: 9,
  privacy: 9,
};

const ICON: Record<DecId, LucideIcon> = {
  monolith: Boxes,
  'event-sourcing': ScrollText,
  rabbitmq: MailCheck,
  'pin-offline': KeyRound,
  'catalog-cache': Smartphone,
  privacy: ShieldCheck,
  'scale-up': Server,
  datadog: Activity,
  'edge-auth': IdCard,
  payment: CreditCard,
};

const byId = (id: string) => DECISIONS.find((d) => d.id === id) as DecisionEntry;
const plain = (html: string) => html.replace(/<figure[\s\S]*?<\/figure>/g, '').replace(/<[^>]+>/g, '').trim();
const firstSentence = (text: string) => (text.match(/^.+?[.!?](?=\s|$)/) ?? [text])[0];
const adrTag = (d: DecisionEntry) => 'ADR ' + d.adrs.map((a) => a.id).join(' + ');

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  es: {
    short: {
      monolith: 'Monolito modular',
      'event-sourcing': 'Event sourcing',
      rabbitmq: 'Cola con acuse',
      'pin-offline': 'PIN offline',
      'catalog-cache': 'Catálogo local',
      privacy: 'Feedback propio',
      'scale-up': 'Escala vertical',
      datadog: 'Monitoreo alquilado',
      'edge-auth': 'Identidad en el borde',
      payment: 'Fachada de pagos',
    } as Record<DecId, string>,
    pillar: 'Pilar',
    chapter: (n: number) => `Capítulo ${n}`,
    chShort: (n: number) => `cap. ${n}`,
    openCard: 'Abrir la ficha completa',
    board: {
      title: 'El mapa de decisiones',
      lead: 'Llevó a',
      same: 'Misma lógica',
      door: 'Puerta abierta',
      canvas: 'Mapa de las diez decisiones en tres pilares: el núcleo estructural en el medio, la realidad física y la privacidad a la izquierda, operación, escala y presupuesto a la derecha, con flechas entre decisiones relacionadas',
      select: (name: string) => `Ver la decisión: ${name}`,
    },
    sieve: {
      title: 'Del repositorio al mapa',
      all: 'Dieciséis ADRs en el repositorio',
      off: 'Fuera del mapa · 5',
      zone: (p: number, n: number) => `Pilar ${p} · ${n} decisiones`,
      canvas: 'Dieciséis ADRs: cinco quedan fuera del mapa y once se reparten en tres pilares, donde los ADRs 012 y 013 forman una sola decisión',
      adr: {
        1: 'Usamos ADR (plantilla)',
        2: 'Enfoque del sistema',
        3: 'Trazado y monitoreo',
        4: 'Health checks',
        5: 'Chequeos de preparación',
        6: 'Zero trust',
        7: 'Event sourcing',
        8: 'Entrega al menos una vez',
        9: 'Proveedor de pagos',
        10: 'Separar el feedback',
        11: 'PIN de retiro',
        12: 'Datos viejos de heladeras',
        13: 'Cachear el catálogo',
        14: 'Estrategia de despliegue',
        15: 'Proveedores de mapas',
        16: 'Infra como código',
      } as Record<number, string>,
      captions: [
        'El repositorio entregó <strong>dieciséis ADRs</strong>. No todos pesan lo mismo.',
        'Cinco quedan fuera: la plantilla de ADR, dos chequeos de salud, los mapas y la infraestructura como código. Útiles, no estructurales.',
        'Once ADRs se vuelven <strong>diez decisiones</strong> en tres pilares: los datos viejos de las heladeras y el catálogo en caché son una sola.',
      ],
    },
    anat: {
      title: 'Anatomía de una entrada',
      inAdr: 'En el ADR:',
      context: 'contexto',
      decision: 'decisión',
      consequences: 'consecuencias',
    },
    chain: {
      title: 'Un hilo de renuncias',
      accepts: 'Acepta',
      paysOff: 'Lo que gana',
      canvas: 'Cadena de cuatro decisiones: monolito modular, monitoreo alquilado, escala vertical e identidad en el borde, cada una con lo que acepta a cambio',
      tradeoffs: [
        'que la disciplina modular se relaje hasta volverse una bola de barro',
        'el ítem más caro del presupuesto anual',
        'una sola máquina grande es un único punto de falla',
        'una verificación extra entre módulos que podría sobrar',
      ],
      links: ['Contrapeso: telemetría por módulo', 'La telemetría avisa cuándo no da más', 'Sale el módulo con más presión'],
      payoff: 'el día que un módulo se separa, la seguridad ya está lista',
      captions: [
        '<strong>Monolito modular</strong> (capítulo 4). Acepta un riesgo: sin disciplina, los módulos se relajan hasta volverse una bola de barro.',
        'El contrapeso es la telemetría obligatoria por módulo, pagada como <strong>monitoreo alquilado</strong> (capítulo 9): el ítem más caro del presupuesto.',
        'Esa telemetría avisa cuándo una máquina más grande ya no alcanza. Hasta entonces, <strong>escala vertical</strong> (capítulo 8), con un único punto de falla.',
        'Cuando la vertical no da más, sale el módulo con más presión, y la <strong>identidad en el borde</strong> (capítulo 8) ya dejó lista la seguridad.',
        'De vuelta al principio: el módulo sale tal como lo diseñó el capítulo 4. Cada renuncia la pagó la decisión siguiente.',
      ],
    },
  },
  en: {
    short: {
      monolith: 'Modular monolith',
      'event-sourcing': 'Event sourcing',
      rabbitmq: 'Queue with receipts',
      'pin-offline': 'Offline PIN',
      'catalog-cache': 'Cached catalog',
      privacy: 'In-house feedback',
      'scale-up': 'Scale up first',
      datadog: 'Rented monitoring',
      'edge-auth': 'Identity at the edge',
      payment: 'Payment facade',
    } as Record<DecId, string>,
    pillar: 'Pillar',
    chapter: (n: number) => `Chapter ${n}`,
    chShort: (n: number) => `ch. ${n}`,
    openCard: 'Open the full card',
    board: {
      title: 'The decision map',
      lead: 'Led to',
      same: 'Same logic',
      door: 'Door left open',
      canvas: 'Map of the ten decisions in three pillars: the structural core in the middle, physical reality and privacy on the left, operations, scale and budget on the right, with arrows between related decisions',
      select: (name: string) => `Show the decision: ${name}`,
    },
    sieve: {
      title: 'From the repository to the map',
      all: 'Sixteen ADRs in the repository',
      off: 'Off the map · 5',
      zone: (p: number, n: number) => `Pillar ${p} · ${n} decisions`,
      canvas: 'Sixteen ADRs: five stay off the map and eleven go into three pillars, where ADRs 012 and 013 form a single decision',
      adr: {
        1: 'Using ADRs (template)',
        2: 'System approach',
        3: 'Tracing and monitoring',
        4: 'Health checks',
        5: 'Readiness checks',
        6: 'Zero trust',
        7: 'Event sourcing',
        8: 'At-least-once delivery',
        9: 'Payment provider',
        10: 'Feedback separation',
        11: 'Pickup PIN code',
        12: 'Stale fridge data',
        13: 'Cache the catalog',
        14: 'Deployment strategy',
        15: 'Map providers',
        16: 'Infrastructure as code',
      } as Record<number, string>,
      captions: [
        'The repository delivered <strong>sixteen ADRs</strong>. They don’t all weigh the same.',
        'Five stay off: the ADR template, two health checks, the map provider and infrastructure as code. Useful, not structural.',
        'Eleven ADRs become <strong>ten decisions</strong> in three pillars: stale fridge data and the cached catalog are one single decision.',
      ],
    },
    anat: {
      title: 'Anatomy of an entry',
      inAdr: 'In the ADR:',
      context: 'context',
      decision: 'decision',
      consequences: 'consequences',
    },
    chain: {
      title: 'One thread of trade-offs',
      accepts: 'Accepts',
      paysOff: 'Pays off',
      canvas: 'Chain of four decisions: modular monolith, rented monitoring, scale up first and identity at the edge, each with what it accepts in exchange',
      tradeoffs: [
        'modular discipline may erode into a ball of mud',
        'the most expensive line of the yearly budget',
        'one big machine is a single point of failure',
        'an extra check between modules that may seem redundant',
      ],
      links: ['Counterweight: telemetry per module', 'Telemetry says when it runs out', 'The module under most pressure leaves'],
      payoff: 'the day a module splits off, security is already in place',
      captions: [
        '<strong>Modular monolith</strong> (chapter 4). It accepts a risk: without discipline, the modules erode into a ball of mud.',
        'The counterweight is mandatory telemetry per module, paid for as <strong>rented monitoring</strong> (chapter 9): the most expensive line of the budget.',
        'That telemetry tells when a bigger machine is no longer enough. Until then, <strong>scale up first</strong> (chapter 8), with a single point of failure.',
        'When vertical scaling runs out, the module under most pressure leaves, and <strong>identity at the edge</strong> (chapter 8) has security ready.',
        'Back to the start: the module leaves exactly as chapter 4 designed it. Each trade-off was paid by the next decision.',
      ],
    },
  },
});

/* ───────────────────────── detail card (shared by board and anatomy) ───────────────────────── */

function DetailHead({ d }: { d: DecisionEntry }) {
  const t = useT(S);
  const lang = useLocale();
  const { open } = useCourse();
  return (
    <div className="c10-detail__head">
      <div className="c10-detail__id">
        <span className="c10-detail__meta mono">
          {t.pillar} {d.pillar} · {adrTag(d)} · {t.chapter(FROM[d.id as DecId])}
        </span>
        <span className="c10-detail__title">{d.title[lang]}</span>
      </div>
      <button type="button" className="play-btn c10-detail__open" onClick={() => open({ kind: 'decision', id: d.id })}>
        {t.openCard} <ArrowUpRight size={15} aria-hidden />
      </button>
    </div>
  );
}

function DetailBody({ d }: { d: DecisionEntry }) {
  const lang = useLocale();
  const ui = useUi().drawer;
  return (
    <>
      <DetailHead d={d} />
      <div className="c10-detail__cols">
        <section className="c10-col c10-col--problem">
          <h4 className="mono">{ui.problem}</h4>
          <p>{plain(d.problem[lang])}</p>
        </section>
        <section className="c10-col c10-col--decision">
          <h4 className="mono">{ui.theDecision}</h4>
          <p>{firstSentence(plain(d.decision[lang]))}</p>
        </section>
        <section className="c10-col c10-col--tradeoff">
          <h4 className="mono">{ui.tradeoff}</h4>
          <p>{plain(d.tradeoff[lang])}</p>
        </section>
      </div>
    </>
  );
}

/** The selected decision. Every decision is laid out (invisible) in the same cell, so the card keeps one height and the map never jumps. */
function Detail({ id, reduced }: { id: DecId; reduced: boolean }) {
  return (
    <div className="c10-detail c10-detail--stack">
      {DECISIONS.filter((d) => d.id !== id).map((d) => (
        <div key={d.id} className="c10-detail__sizer" aria-hidden>
          <DetailBody d={d} />
        </div>
      ))}
      <div className="c10-detail__live" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={id}
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <DetailBody d={byId(id)} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────── the map ───────────────────────── */

const NW = 250, NH = 46;
/** Pillar columns: the structural core in the middle, so most links stay between neighbours. */
const ZONES = [
  { p: 2 as const, x: 24, cx: 171 },
  { p: 1 as const, x: 353, cx: 500 },
  { p: 3 as const, x: 682, cx: 829 },
];
const ZW = 294, ZY = 24, ZH = 272;
const cxOf = (p: 1 | 2 | 3) => ZONES.find((z) => z.p === p)!.cx;

const POS: Record<DecId, { x: number; y: number }> = {
  privacy: { x: cxOf(2), y: 77 },
  'pin-offline': { x: cxOf(2), y: 170 },
  'catalog-cache': { x: cxOf(2), y: 263 },
  monolith: { x: cxOf(1), y: 77 },
  'event-sourcing': { x: cxOf(1), y: 170 },
  rabbitmq: { x: cxOf(1), y: 263 },
  datadog: { x: cxOf(3), y: 77 },
  'edge-auth': { x: cxOf(3), y: 139 },
  'scale-up': { x: cxOf(3), y: 201 },
  payment: { x: cxOf(3), y: 263 },
};
const L = (id: DecId) => POS[id].x - NW / 2;
const R = (id: DecId) => POS[id].x + NW / 2;
const TRUNK = (R('monolith') + L('datadog')) / 2;

type Link = { id: string; a: DecId; b: DecId; kind: 'lead' | 'same'; pts: [number, number][] };
const LINKS: Link[] = [
  { id: 'm-dd', a: 'monolith', b: 'datadog', kind: 'lead', pts: [[R('monolith'), 77], [L('datadog'), 77]] },
  { id: 'm-ea', a: 'monolith', b: 'edge-auth', kind: 'lead', pts: [[R('monolith'), 77], [TRUNK, 77], [TRUNK, 139], [L('edge-auth'), 139]] },
  { id: 'm-su', a: 'monolith', b: 'scale-up', kind: 'lead', pts: [[R('monolith'), 77], [TRUNK, 77], [TRUNK, 201], [L('scale-up'), 201]] },
  { id: 'cc-rmq', a: 'catalog-cache', b: 'rabbitmq', kind: 'lead', pts: [[R('catalog-cache'), 263], [L('rabbitmq'), 263]] },
  { id: 'rmq-pay', a: 'rabbitmq', b: 'payment', kind: 'lead', pts: [[R('rabbitmq'), 263], [L('payment'), 263]] },
  { id: 'es-rmq', a: 'event-sourcing', b: 'rabbitmq', kind: 'same', pts: [[cxOf(1), 170 + NH / 2], [cxOf(1), 263 - NH / 2]] },
  { id: 'pin-cc', a: 'pin-offline', b: 'catalog-cache', kind: 'same', pts: [[cxOf(2), 170 + NH / 2], [cxOf(2), 263 - NH / 2]] },
  // the one link between the two outer pillars runs around the map, above the zones; it is only drawn when lit
  { id: 'pr-dd', a: 'privacy', b: 'datadog', kind: 'same', pts: [[L('privacy'), 77], [12, 77], [12, 12], [988, 12], [988, 77], [R('datadog'), 77]] },
];

const DOORS: DecId[] = ['monolith', 'event-sourcing', 'payment', 'scale-up', 'edge-auth'];

interface BoardState {
  sel: DecId;
  nodes?: DecId[];
  links?: string[];
  zone?: 1 | 2 | 3;
  doors?: boolean;
}
const BOARD_STATES: Record<string, BoardState> = {
  explore: { sel: 'monolith' },
  p1: { sel: 'monolith', zone: 1, nodes: ['monolith', 'event-sourcing', 'rabbitmq'] },
  p2: { sel: 'pin-offline', zone: 2, nodes: ['privacy', 'pin-offline', 'catalog-cache'] },
  p3: { sel: 'payment', zone: 3, nodes: ['datadog', 'edge-auth', 'scale-up', 'payment'] },
  mother: { sel: 'monolith', nodes: ['monolith', 'datadog', 'edge-auth', 'scale-up'], links: ['m-dd', 'm-ea', 'm-su'] },
  money: { sel: 'rabbitmq', nodes: ['catalog-cache', 'rabbitmq', 'event-sourcing', 'payment'], links: ['cc-rmq', 'es-rmq', 'rmq-pay'] },
  yardstick: { sel: 'datadog', nodes: ['privacy', 'datadog'], links: ['pr-dd'] },
  doors: { sel: 'monolith', nodes: DOORS, links: [], doors: true },
};
const ORDER: DecId[] = ['monolith', 'event-sourcing', 'rabbitmq', 'privacy', 'pin-offline', 'catalog-cache', 'datadog', 'edge-auth', 'scale-up', 'payment'];

function Board({ state = 'explore', props, chosen, reduced }: SceneProps) {
  const t = useT(S);
  const tb = t.board;
  const lang = useLocale();
  const base = BOARD_STATES[state] ?? BOARD_STATES.explore;
  // the predict step keeps the monolith's arrows hidden until the right answer
  const hidden = state === 'mother' && props?.correct !== undefined && chosen !== props.correct;
  const [sel, setSel] = useState<DecId>(base.sel);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    setSel(base.sel);
    setTouched(false);
  }, [state]);

  const pick = (id: DecId) => {
    setSel(id);
    setTouched(true);
  };
  // before the reader picks anything, the step decides what lights up; afterwards the selection does
  const touching = (l: Link) => l.a === sel || l.b === sel;
  const stepLinks = hidden ? [] : base.links;
  const activeLinks = new Set(touched || !stepLinks ? LINKS.filter(touching).map((l) => l.id) : stepLinks);
  const stepNodes = hidden ? ['monolith'] : base.nodes;
  const litNodes = touched || !stepNodes ? null : new Set<string>(stepNodes);
  if (litNodes) litNodes.add(sel);

  return (
    <Frame
      title={tb.title}
      legend={
        <div className="c10-legend" aria-hidden>
          <span><svg width="26" height="10"><path d="M1 5 H20" className="eg eg--accent" strokeWidth="2" /><path d="M18 1.5 L23 5 L18 8.5" fill="none" className="eg eg--accent" strokeWidth="1.8" /></svg>{tb.lead}</span>
          <span><svg width="26" height="10"><path d="M1 5 H25" className="eg eg--accent is-dashed" strokeWidth="2" /></svg>{tb.same}</span>
          {base.doors && <span><span className="c10-legend__door"><DoorOpen size={11} /></span>{tb.door}</span>}
        </div>
      }
      foot={<Detail id={sel} reduced={reduced} />}
    >
      <Canvas w={1000} h={308} label={tb.canvas}>
        {(ids) => (
          <>
            {ZONES.map((z) => {
              const on = base.zone === z.p;
              return (
                <g key={z.p}>
                  <rect x={z.x} y={ZY} width={ZW} height={ZH} rx={14} className={`zone ${on ? 'zone--accent' : ''}`} style={{ fill: on ? 'color-mix(in srgb, var(--accent-soft) 38%, transparent)' : 'color-mix(in srgb, var(--surface) 45%, transparent)' }} />
                  <Label x={z.x + 14} y={ZY + 20} anchor="start" tone={on ? 'accent' : 'muted'} size={10.5}>
                    {z.p} · {PILLARS[lang][z.p - 1].title}
                  </Label>
                </g>
              );
            })}
            {LINKS.filter((l) => l.id !== 'pr-dd').map((l) => (
              <Edge key={l.id + '-base'} points={l.pts} tone="muted" dashed={l.kind === 'same'} marker={l.kind === 'lead' ? ids.arrow : undefined} width={1.5} />
            ))}
            {LINKS.map((l) => (
              <Edge key={l.id + '-on'} points={l.pts} tone="accent" dashed={l.kind === 'same'} marker={l.kind === 'lead' ? ids.arrowAccent : undefined} width={2.3} show={activeLinks.has(l.id)} delay={touched || reduced ? 0 : 0.15} />
            ))}
            {ORDER.map((id, i) => {
              const d = byId(id);
              const isSel = id === sel;
              const dim = litNodes ? !litNodes.has(id) : false;
              return (
                <g
                  key={id}
                  className="mm-hit"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSel}
                  aria-label={tb.select(d.title[lang])}
                  onClick={() => pick(id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      pick(id);
                    }
                  }}
                >
                  <Node x={POS[id].x} y={POS[id].y} w={NW} h={NH} kind={isSel ? 'core' : 'plain'} icon={ICON[id]} label={t.short[id]} dim={dim} delay={reduced ? 0 : i * 0.02} />
                </g>
              );
            })}
            {DOORS.map((id) => (
              <motion.g key={id + '-door'} initial={false} animate={{ opacity: base.doors ? 1 : 0, scale: base.doors ? 1 : 0.6 }} transition={{ duration: 0.3, delay: base.doors && !reduced ? 0.2 : 0 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} className="pe-none" aria-hidden>
                <circle cx={R(id) - 18} cy={POS[id].y - NH / 2} r={10} className="c10-door" />
                <DoorOpen x={R(id) - 24} y={POS[id].y - NH / 2 - 6} width={12} height={12} className="c10-door__ic" />
              </motion.g>
            ))}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── sixteen ADRs → ten decisions ───────────────────────── */

type Dest = 'off' | 1 | 2 | 3;
const ADR_DEST: Record<number, Dest> = { 1: 'off', 4: 'off', 5: 'off', 15: 'off', 16: 'off', 2: 1, 7: 1, 8: 1, 11: 2, 12: 2, 13: 2, 10: 2, 3: 3, 6: 3, 9: 3, 14: 3 };
const TW = 186, TH = 50;
const SIEVE_ZONES: { k: Dest; x: number; w: number }[] = [
  { k: 'off', x: 12, w: 210 },
  { k: 1, x: 240, w: 236 },
  { k: 2, x: 496, w: 236 },
  { k: 3, x: 752, w: 236 },
];
const SZ_TOP = 40, SZ_H = 354;
const zcx = (k: Dest) => { const z = SIEVE_ZONES.find((s) => s.k === k)!; return z.x + z.w / 2; };
/** Final slot of each ADR inside its pile. Pillar 2 leaves room for the frame that joins 012 and 013. */
const FINAL: Record<number, { x: number; y: number }> = {
  1: { x: zcx('off'), y: 106 }, 4: { x: zcx('off'), y: 168 }, 5: { x: zcx('off'), y: 230 }, 15: { x: zcx('off'), y: 292 }, 16: { x: zcx('off'), y: 354 },
  2: { x: zcx(1), y: 106 }, 7: { x: zcx(1), y: 168 }, 8: { x: zcx(1), y: 230 },
  11: { x: zcx(2), y: 106 }, 12: { x: zcx(2), y: 176 }, 13: { x: zcx(2), y: 238 }, 10: { x: zcx(2), y: 308 },
  3: { x: zcx(3), y: 106 }, 6: { x: zcx(3), y: 168 }, 9: { x: zcx(3), y: 230 }, 14: { x: zcx(3), y: 292 },
};
const DECISION_COUNT: Record<1 | 2 | 3, number> = { 1: 3, 2: 3, 3: 4 };

function Sieve({ reduced }: SceneProps) {
  const t = useT(S).sieve;
  const s = usePhases(3, { interval: 3000, reduced });
  const sorted = s.phase === 2;
  return (
    <Frame
      title={t.title}
      foot={<Stepper phase={s.phase} count={3} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.captions} />}
    >
      <Canvas w={1000} h={406} label={t.canvas}>
        {() => (
          <>
            {SIEVE_ZONES.map((z, i) => (
              <motion.g key={String(z.k)} initial={false} animate={{ opacity: sorted ? 1 : 0 }} transition={{ duration: 0.4, delay: sorted && !reduced ? 0.35 + i * 0.08 : 0 }}>
                <rect x={z.x} y={SZ_TOP} width={z.w} height={SZ_H} rx={14} className={`zone ${z.k === 'off' ? '' : 'zone--accent'}`} style={{ fill: z.k === 'off' ? 'transparent' : 'color-mix(in srgb, var(--accent-soft) 26%, transparent)' }} />
                <text x={z.w / 2 + z.x} y={SZ_TOP + 24} textAnchor="middle" className={`lb ${z.k === 'off' ? 'lb--muted' : 'lb--accent'}`} style={{ fontSize: 10.5 }}>
                  {z.k === 'off' ? t.off : t.zone(z.k, DECISION_COUNT[z.k])}
                </text>
              </motion.g>
            ))}
            <motion.rect
              x={zcx(2) - TW / 2 - 7}
              y={176 - TH / 2 - 7}
              width={TW + 14}
              height={238 - 176 + TH + 14}
              rx={12}
              className="c10-merge"
              initial={false}
              animate={{ opacity: sorted ? 1 : 0 }}
              transition={{ duration: 0.4, delay: sorted && !reduced ? 0.9 : 0 }}
            />
            <Label x={500} y={52} show={!sorted} tone="muted" size={11}>{t.all}</Label>
            {Array.from({ length: 16 }, (_, i) => {
              const n = i + 1;
              const dest = ADR_DEST[n];
              const grid = { x: 152 + (i % 4) * 232, y: 105 + Math.floor(i / 4) * 68 };
              const at = sorted ? FINAL[n] : grid;
              const off = dest === 'off';
              return (
                <Node
                  key={n}
                  x={at.x}
                  y={at.y}
                  w={TW}
                  h={TH}
                  kind="plain"
                  label={`ADR ${String(n).padStart(3, '0')}`}
                  sub={t.adr[n]}
                  dim={off && s.phase >= 1}
                  delay={reduced ? 0 : sorted ? (off ? 0 : 0.05 + (i % 6) * 0.03) : 0}
                />
              );
            })}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── anatomy of an entry ───────────────────────── */

function Anatomy({ props, reduced }: SceneProps) {
  const t = useT(S);
  const ui = useUi().drawer;
  const lang = useLocale();
  const d = byId(String(props?.id ?? 'monolith'));
  const cols = [
    { k: 'problem', h: ui.problem, adr: t.anat.context, text: plain(d.problem[lang]) },
    { k: 'decision', h: ui.theDecision, adr: t.anat.decision, text: plain(d.decision[lang]) },
    { k: 'tradeoff', h: ui.tradeoff, adr: t.anat.consequences, text: plain(d.tradeoff[lang]) },
  ];
  return (
    <Frame title={t.anat.title}>
      <div className="c10-anat">
        <div className="c10-detail c10-detail--anat">
          <DetailHead d={d} />
        </div>
        <div className="c10-anat__row">
          {cols.map((c, i) => (
            <div key={c.k} className="c10-anat__cell">
              <motion.section
                className={`c10-anat__card c10-col--${c.k}`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : 0.15 + i * 0.35, ease: EASE }}
              >
                <h4 className="mono">{c.h}</h4>
                <p>{c.text}</p>
                <span className="c10-anat__adr mono">{t.anat.inAdr} {c.adr}</span>
              </motion.section>
              {i < cols.length - 1 && (
                <motion.span className="c10-anat__arrow" aria-hidden initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.35 + i * 0.35 }}>
                  <ArrowRight size={18} />
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────── the chain of trade-offs ───────────────────────── */

const CHAIN: DecId[] = ['monolith', 'datadog', 'scale-up', 'edge-auth'];
const CX = 190, CW = 270, CH = 54, ROW0 = 46, PITCH = 100, PILL_X = 350, PILL_W = 630, PILL_H = 34;

function Chain({ reduced }: SceneProps) {
  const t = useT(S);
  const tc = t.chain;
  const s = usePhases(5, { interval: 3600, reduced });
  const cur = Math.min(s.phase, 3);
  const y = (i: number) => ROW0 + i * PITCH;
  const payoffY = y(3) + 54;
  return (
    <Frame
      title={tc.title}
      foot={<Stepper phase={s.phase} count={5} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={tc.captions} />}
    >
      <Canvas w={1000} h={428} label={tc.canvas}>
        {(ids) => (
          <>
            {tc.links.map((txt, i) => {
              const show = s.phase >= i + 1;
              const on = s.phase === i + 1;
              const y0 = y(i) + CH / 2, y1 = y(i + 1) - CH / 2;
              return (
                <g key={i}>
                  <Edge points={[[CX, y0], [CX, y1]]} tone={on ? 'accent' : 'muted'} marker={on ? ids.arrowAccent : ids.arrow} width={on ? 2.3 : 1.6} show={show} />
                  <Label x={CX + 16} y={(y0 + y1) / 2 + 4} anchor="start" tone={on ? 'accent' : 'muted'} size={10.5} show={show} delay={show && !reduced ? 0.25 : 0}>
                    {txt}
                  </Label>
                </g>
              );
            })}
            {CHAIN.map((id, i) => {
              const d = byId(id);
              const show = s.phase >= i || s.phase === 4;
              const core = s.phase === 4 ? i === 0 || i === 3 : i === cur;
              return (
                <g key={id}>
                  <Node x={CX} y={y(i)} w={CW} h={CH} kind={core ? 'core' : 'plain'} icon={ICON[id]} label={t.short[id]} sub={`${t.chShort(FROM[id])} · ${adrTag(d)}`} show={show} delay={show && !reduced ? 0.1 : 0} />
                  <motion.g initial={false} animate={{ opacity: show ? 1 : 0, x: show || reduced ? 0 : -8 }} transition={{ duration: 0.35, delay: show && !reduced ? 0.3 : 0 }}>
                    <rect x={PILL_X} y={y(i) - PILL_H / 2} width={PILL_W} height={PILL_H} rx={PILL_H / 2} className={`c10-pill ${i === cur && s.phase < 4 ? 'is-on' : ''}`} />
                    <text x={PILL_X + 18} y={y(i) + 4} className="lb c10-pill__k" style={{ fontSize: 11 }}>{tc.accepts}</text>
                    <text x={PILL_X + 100} y={y(i) + 4.5} className="c10-pill__t">{tc.tradeoffs[i]}</text>
                  </motion.g>
                </g>
              );
            })}
            <motion.g initial={false} animate={{ opacity: s.phase === 4 ? 1 : 0 }} transition={{ duration: 0.4, delay: s.phase === 4 && !reduced ? 0.2 : 0 }}>
              <rect x={PILL_X} y={payoffY - PILL_H / 2} width={PILL_W} height={PILL_H} rx={PILL_H / 2} className="c10-pill c10-pill--gain" />
              <text x={PILL_X + 18} y={payoffY + 4} className="lb c10-pill__k c10-pill__k--gain" style={{ fontSize: 11 }}>{tc.paysOff}</text>
              <text x={PILL_X + 126} y={payoffY + 4.5} className="c10-pill__t">{tc.payoff}</text>
            </motion.g>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/** Scenes of chapter 10, registered in ./index.ts through this map. */
export const SCENES10: Record<string, ComponentType<SceneProps>> = {
  'map-sieve': Sieve,
  'map-anatomy': Anatomy,
  'map-board': Board,
  'map-chain': Chain,
};
