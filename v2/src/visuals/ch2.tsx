import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, Inbox, CreditCard, Heart, BarChart3, Database, Container, Radio, Trophy, Users, Check, ChevronDown, Gavel } from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, EASE, type SceneProps } from './kit';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── teams: ten teams, three finalists ───────────────────────── */
const TEAMS_S = defineStrings({
  es: {
    q: <>¿Cuánta maquinaria comprar hoy para un negocio que hoy vende <span>42 comidas al día</span>?</>,
    grid: 'Diez equipos, tres finalistas',
    team: (n: number) => `Equipo ${n}`,
    finalist: 'finalista',
    foot: 'Diez equipos, el mismo pliego. Tres llegaron a la final con respuestas opuestas.',
  },
  en: {
    q: <>How much machinery do you buy today for a business that sells <span>42 meals a day</span>?</>,
    grid: 'Ten teams, three finalists',
    team: (n: number) => `Team ${n}`,
    finalist: 'finalist',
    foot: 'Ten teams, the same brief. Three reached the final with opposing answers.',
  },
});

export function Teams({ reduced }: SceneProps) {
  const t = useT(TEAMS_S);
  const finalists: Record<number, string> = { 1: 'ArchColider', 4: 'Myagis-Forest', 7: 'Jedis' };
  return (
    <div className="teams">
      <motion.p className="teams__q" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {t.q}
      </motion.p>
      <div className="teams__grid" aria-label={t.grid}>
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className={`teams__t ${finalists[i] ? 'is-final' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: finalists[i] ? 1 : 0.45, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.3 + i * 0.06 + (finalists[i] ? 0.6 : 0) }}
          >
            <Users size={18} aria-hidden />
            <span>{finalists[i] ?? t.team(i + 1)}</span>
            {finalists[i] && <em className="mono">{t.finalist}</em>}
          </motion.div>
        ))}
      </div>
      <p className="teams__foot">{t.foot}</p>
    </div>
  );
}

/* ───────────────────────── styles: the same modules, three architectures ───────────────────────── */
const MODS = [
  { k: 'cat', icon: BookOpen },
  { k: 'ord', icon: Inbox },
  { k: 'pay', icon: CreditCard },
  { k: 'loy', icon: Heart },
  { k: 'rep', icon: BarChart3 },
] as const;
type Pt = { x: number; y: number };
const LAYOUT: Record<string, Pt[]> = {
  arch: [ { x: 290, y: 220 }, { x: 480, y: 220 }, { x: 670, y: 220 }, { x: 385, y: 320 }, { x: 575, y: 320 } ],
  forest: [ { x: 150, y: 150 }, { x: 480, y: 110 }, { x: 810, y: 150 }, { x: 260, y: 380 }, { x: 700, y: 380 } ],
  jedis: [ { x: 150, y: 170 }, { x: 480, y: 170 }, { x: 810, y: 170 }, { x: 250, y: 430 }, { x: 710, y: 430 } ],
};
const META: Record<string, { team: string; cost: number }> = {
  arch: { team: 'ArchColider', cost: 1 },
  forest: { team: 'Myagis-Forest', cost: 3 },
  jedis: { team: 'Jedis', cost: 2.5 },
};
type StyleText = { title: string; costLabel: string; canvas: string };
const STYLES_S = defineStrings({
  es: {
    mods: { cat: 'Catálogo', ord: 'Órdenes', pay: 'Pagos', loy: 'Lealtad', rep: 'Reportes' },
    meta: {
      arch: { title: 'Monolito modular', costLabel: 'costo fijo hoy: bajo', canvas: 'Los mismos cinco módulos organizados como Monolito modular' },
      forest: { title: 'Microservicios desde el día uno', costLabel: 'costo fijo hoy: alto', canvas: 'Los mismos cinco módulos organizados como Microservicios desde el día uno' },
      jedis: { title: 'Plataforma sobre un bus de eventos', costLabel: 'costo fijo hoy: mensajería sobredimensionada', canvas: 'Los mismos cinco módulos organizados como Plataforma sobre un bus de eventos' },
    } as Record<string, StyleText>,
    legendMod: 'Módulo o servicio',
    legendCall: 'Llamada / mensaje',
    legendEvt: 'Evento',
    archApp: 'una sola aplicación · pocas máquinas de AWS',
    archBounds: 'fronteras estrictas entre módulos, contratos como si hubiera red',
    oneDb: '1 base de datos',
    ownDb: 'su base',
    network: 'red',
    perService: 'cada servicio: su contenedor Docker, su base, su despliegue',
    kafka: 'Kafka · cada movimiento de stock y cada compra, en vivo',
    subMicro: 'microservicio',
    subBus: 'consume y publica',
    subModule: 'módulo',
    analytics: 'analítica',
  },
  en: {
    mods: { cat: 'Catalog', ord: 'Orders', pay: 'Payments', loy: 'Loyalty', rep: 'Reporting' },
    meta: {
      arch: { title: 'Modular monolith', costLabel: 'fixed cost today: low', canvas: 'The same five modules organized as a modular monolith' },
      forest: { title: 'Microservices from day one', costLabel: 'fixed cost today: high', canvas: 'The same five modules organized as microservices from day one' },
      jedis: { title: 'Platform on an event bus', costLabel: 'fixed cost today: oversized messaging', canvas: 'The same five modules organized as a platform on an event bus' },
    },
    legendMod: 'Module or service',
    legendCall: 'Call / message',
    legendEvt: 'Event',
    archApp: 'one application · a few AWS machines',
    archBounds: 'strict boundaries between modules, contracts as if over a network',
    oneDb: '1 database',
    ownDb: 'own database',
    network: 'network',
    perService: 'each service: its own Docker container, database and deployment',
    kafka: 'Kafka · every stock movement and every purchase, live',
    subMicro: 'microservice',
    subBus: 'consumes and publishes',
    subModule: 'module',
    analytics: 'analytics',
  },
});

export function Styles({ state = 'arch', reduced }: SceneProps) {
  const L = LAYOUT[state] ?? LAYOUT.arch;
  const t = useT(STYLES_S);
  const m = { ...(META[state] ?? META.arch), ...(t.meta[state] ?? t.meta.arch) };
  const arch = state === 'arch';
  const forest = state === 'forest';
  const jedis = state === 'jedis';
  return (
    <Frame title={`${m.team} · ${m.title}`} legend={<Legend items={[{ tone: 'cmp', label: t.legendMod }, { tone: 'cmd', label: t.legendCall }, { tone: 'evt', label: t.legendEvt }]} />}
      foot={
        <div className="cost" aria-label={m.costLabel}>
          <span className="cost__l mono">{m.costLabel}</span>
          <div className="cost__bar"><motion.div className="cost__fill" initial={false} animate={{ width: `${(m.cost / 3) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} /></div>
        </div>
      }
    >
      <Canvas w={960} h={520} label={m.canvas}>
        {(ids) => (
          <>
            {/* monolith shell */}
            <motion.rect x={170} y={150} width={620} height={240} rx={18} className="zone zone--accent" initial={false} animate={{ opacity: arch ? 1 : 0 }} />
            <Label x={190} y={140} anchor="start" tone="accent" show={arch}>{t.archApp}</Label>
            <Label x={480} y={410} tone="muted" show={arch}>{t.archBounds}</Label>
            <Node x={480} y={470} w={200} h={48} icon={Database} label={t.oneDb} show={arch} />

            {/* microservices network */}
            {forest && (
              <>
                {[[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [0, 2]].map(([a, b], i) => (
                  <Edge key={i} points={[[L[a].x, L[a].y], [L[b].x, L[b].y]]} tone="cmd" delay={0.3 + i * 0.05} />
                ))}
                {/* each database sits on the side of its service that no connection uses: above the top row, below the bottom row */}
                {L.map((p, i) => (
                  <Node key={i} x={p.x} y={i < 3 ? p.y - 60 : p.y + 60} w={140} h={36} icon={Database} label={t.ownDb} delay={0.4} />
                ))}
                <Packet reduced={reduced} tone="cmd" points={[[L[0].x, L[0].y], [L[1].x, L[1].y], [L[4].x, L[4].y]]} duration={2.2} repeat repeatDelay={1} label={t.network} />
                <Label x={480} y={500} tone="muted">{t.perService}</Label>
              </>
            )}

            {/* event bus */}
            <motion.rect x={60} y={288} width={840} height={24} rx={12} fill="var(--evt-soft)" stroke="var(--evt)" initial={false} animate={{ opacity: jedis ? 1 : 0 }} />
            <Label x={480} y={340} tone="evt" size={10} show={jedis}>{t.kafka}</Label>
            {jedis &&
              L.map((p, i) => <Edge key={i} points={[[p.x, p.y + (i < 3 ? 30 : -30)], [p.x, i < 3 ? 288 : 312]]} tone="evt" delay={0.2 + i * 0.05} />)}
            {jedis && (
              <>
                <Packet reduced={reduced} tone="evt" points={[[70, 300], [890, 300]]} duration={3} repeat repeatDelay={0.2} w={18} />
                <Packet reduced={reduced} tone="evt" points={[[70, 300], [890, 300]]} duration={3} delay={1.5} repeat repeatDelay={0.2} w={18} />
              </>
            )}

            {/* the same five modules move between layouts */}
            {MODS.map((mod, i) => (
              <Node key={mod.k} x={L[i].x} y={L[i].y} w={150} h={58} kind="cmp" icon={mod.icon} label={t.mods[mod.k]} sub={forest ? t.subMicro : jedis ? t.subBus : t.subModule} />
            ))}
            {forest && <Node x={480} y={250} w={120} h={40} kind="muted" icon={Container} label="Docker" />}
            {jedis && <Node x={480} y={250} w={130} h={40} kind="muted" icon={Radio} label={t.analytics} />}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── bets: what each posture buys, what it pays ───────────────────────── */
const BETS_S = defineStrings({
  es: {
    rows: [
      { place: '1.º', style: 'Monolito modular', bet: 'Barato hoy, fácil de partir mañana si hace falta.', price: 'Si hay que partirlo, será trabajo futuro: el argumento con el que el segundo puesto eligió lo contrario.' },
      { place: '2.º', style: 'Microservicios', bet: 'No hacer el trabajo dos veces; un modelado de dominio impecable desde el día uno.', price: 'Un costo fijo de operación mucho más alto mientras la startup recién valida su mercado.' },
      { place: '3.º', style: 'Bus de eventos', bet: 'La analítica futura: cada movimiento de stock y cada compra registrados en tiempo real.', price: 'Sostener una plataforma de mensajería sobredimensionada durante los primeros meses.' },
    ],
    buys: 'Lo que compra',
    pays: 'Lo que paga',
    law: <>Primera ley: <em>en arquitectura no hay decisiones correctas o incorrectas, todo es una compensación.</em></>,
  },
  en: {
    rows: [
      { place: '1st', style: 'Modular monolith', bet: 'Cheap today, easy to split tomorrow if needed.', price: 'If it has to be split, that is future work: the very argument the runner-up used to choose the opposite.' },
      { place: '2nd', style: 'Microservices', bet: 'Not doing the work twice; impeccable domain modeling from day one.', price: 'A much higher fixed operating cost while the startup is still validating its market.' },
      { place: '3rd', style: 'Event bus', bet: 'Future analytics: every stock movement and every purchase recorded in real time.', price: 'Running an oversized messaging platform during the first months.' },
    ],
    buys: 'What it buys',
    pays: 'What it pays',
    law: <>First law: <em>in architecture there are no right or wrong decisions, everything is a trade-off.</em></>,
  },
});
const BET_TEAMS = ['ArchColider', 'Myagis-Forest', 'Jedis'];

export function Bets({ reduced }: SceneProps) {
  const t = useT(BETS_S);
  const rows = t.rows.map((r, i) => ({ team: BET_TEAMS[i], ...r }));
  return (
    <div className="bets">
      <div className="bets__head">
        <span />
        <span className="mono">{t.buys}</span>
        <span className="mono">{t.pays}</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.team} className="bets__row" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.45, ease: EASE }}>
          <div className="bets__who">
            <span className="bets__place mono">{r.place}</span>
            <div>
              <strong>{r.team}</strong>
              <span>{r.style}</span>
            </div>
          </div>
          <p className="bets__bet">{r.bet}</p>
          <p className="bets__price">{r.price}</p>
        </motion.div>
      ))}
      <motion.p className="bets__law" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Trophy size={16} aria-hidden /> {t.law}
      </motion.p>
    </div>
  );
}

/* ───────────────────────── rubric: the judges and their seven criteria ───────────────────────── */
const JUDGES = ['Nate Schutta', 'Mark Richards', 'Sarah Taraporewalla', 'Luca Mezzalira'];
const RUBRIC_S = defineStrings({
  es: {
    roles: ['arquitecto de software', 'coautor de Fundamentals of Software Architecture', 'ThoughtWorks', 'VP de Arquitectura en DAZN'],
    criteria: [
      { t: 'Narrativa, organización y documentación', d: 'Una buena arquitectura que no se sabe contar, no se defiende.' },
      { t: 'Entendimiento de los requerimientos y completitud', d: '¿Responde al problema planteado, o a uno más cómodo?' },
      { t: 'Características arquitectónicas de soporte', d: '¿Qué atributos de calidad importan y dónde?' },
      { t: 'Diagramas: tipos, nivel de detalle y completitud', d: 'Citando a Neal Ford: “el objetivo de un diagrama es transmitir una comprensión clara y compartida de la arquitectura”.' },
      { t: 'Arquitectura general del sistema', d: 'La vista del sistema entero, más allá de las piezas sueltas.' },
      { t: 'Integración con los sistemas de terceros', d: 'Heladeras, kioscos y pasarela ya existían: había que conectarlos bien.' },
      { t: 'ADRs: documentación y justificación de las decisiones', d: 'Segunda ley: “el porqué importa más que el cómo”.' },
    ],
    kicker: 'Rúbrica del deck de semifinales · 7 criterios',
    veil: 'Respondé a la izquierda para ver la rúbrica',
    foot: 'Ningún criterio dice “la tecnología más moderna”. Todos miden si el razonamiento se puede seguir.',
  },
  en: {
    roles: ['software architect', 'co-author of Fundamentals of Software Architecture', 'ThoughtWorks', 'VP of Architecture at DAZN'],
    criteria: [
      { t: 'Narrative, organization, and documentation', d: 'A good architecture that cannot be explained cannot be defended.' },
      { t: 'Understanding of the requirements and completeness', d: 'Does it answer the problem posed, or a more comfortable one?' },
      { t: 'Supporting architecture characteristics', d: 'Which quality attributes matter, and where?' },
      { t: 'Diagrams: types, level of detail, completeness', d: 'Quoting Neal Ford: “the goal of a diagram is to convey a clear and shared understanding of the architecture.”' },
      { t: 'Overall systems architecture', d: 'The view of the whole system, beyond the individual pieces.' },
      { t: 'Integration architecture for third-party systems', d: 'The fridges, kiosks and payment gateway already existed: they had to be connected well.' },
      { t: 'ADRs: documentation and justification of decisions', d: 'Second law: “Why is more important than how.”' },
    ],
    kicker: 'Semifinal deck rubric · 7 criteria',
    veil: 'Answer on the left to see the rubric',
    foot: 'No criterion says “the most modern technology.” They all measure whether the reasoning can be followed.',
  },
});

export function Rubric({ state = 'full', chosen, props, reduced }: SceneProps) {
  const revealed = state === 'full' || (chosen !== null && chosen === props?.correct);
  const [open, setOpen] = useState<number | null>(null);
  const t = useT(RUBRIC_S);
  return (
    <div className="rubric">
      <div className="rubric__judges">
        {JUDGES.map((n, i) => (
          <motion.div key={n} className="rubric__judge" initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Gavel size={15} aria-hidden />
            <strong>{n}</strong>
            <span>{t.roles[i]}</span>
          </motion.div>
        ))}
      </div>
      <div className={`rubric__list vcard ${revealed ? '' : 'is-hidden'}`} aria-hidden={!revealed}>
        <p className="rubric__k mono">{t.kicker}</p>
        <ol>
          {t.criteria.map((c, i) => (
            <motion.li key={i} initial={false} animate={{ opacity: revealed ? 1 : 0.25 }} transition={{ delay: revealed ? i * 0.07 : 0 }}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} tabIndex={revealed ? 0 : -1}>
                <span className="rubric__n mono">{i + 1}</span>
                <span className="rubric__t">{c.t}</span>
                <ChevronDown size={15} aria-hidden className={open === i ? 'is-open' : ''} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p className="rubric__d" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    {c.d}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ol>
        {!revealed && <div className="rubric__veil">{t.veil}</div>}
      </div>
      {revealed && (
        <motion.p className="rubric__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Check size={15} aria-hidden /> {t.foot}
        </motion.p>
      )}
    </div>
  );
}
