import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, AlertTriangle, ArrowRight, MessageSquare, Brain, Sprout, Activity, Mail, Users, Target, ScrollText, Layers, Server, Cog, Code2, Network, Database, Workflow } from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, EASE, type SceneProps } from './kit';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── week zero ───────────────────────── */
const WEEK_DOCS = ['business-goal', 'constraints', 'functional-reqs', 'questions', 'glossary'] as const;

const S_WEEK = defineStrings({
  es: {
    docs: {
      'business-goal': 'Objetivo de negocio',
      constraints: 'Restricciones',
      'functional-reqs': 'Requerimientos, releídos',
      questions: 'Preguntas al cliente',
      glossary: 'Glosario de vocabulario',
    } as Record<(typeof WEEK_DOCS)[number], string>,
    k: 'Primera semana del repositorio',
    open: 'abrir',
    lbl: 'diagramas de software',
    sub: 'Primero se lee el negocio. Recién después se dibuja.',
  },
  en: {
    docs: {
      'business-goal': 'Business goal',
      constraints: 'Constraints',
      'functional-reqs': 'Requirements, reread',
      questions: 'Questions to the client',
      glossary: 'Vocabulary glossary',
    },
    k: 'The repository’s first week',
    open: 'open',
    lbl: 'software diagrams',
    sub: 'Read the business first. Draw only after that.',
  },
});

export function WeekZero({ reduced }: SceneProps) {
  const t = useT(S_WEEK);
  return (
    <div className="week">
      <section className="vcard week__docs">
        <p className="week__k">{t.k}</p>
        <ul>
          {WEEK_DOCS.map((id, i) => (
            <motion.li key={id} initial={{ opacity: 0, x: reduced ? 0 : -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12 }}>
              <button type="button" className="week__doc" data-doc={id}>
                <FileText size={16} aria-hidden />
                <span>{t.docs[id]}</span>
                <span className="mono week__open">{t.open}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </section>
      <motion.section className="week__zero" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5, ease: EASE }}>
        <span className="week__num mono">0</span>
        <span className="week__lbl">{t.lbl}</span>
        <span className="week__sub">{t.sub}</span>
      </motion.section>
    </div>
  );
}

/* ───────────────────────── the eight raw requirements ───────────────────────── */
const REQS = [
  { n: 1, flag: true },
  { n: 2 },
  { n: 3 },
  { n: 4 },
  { n: 5 },
  { n: 6 },
  { n: 7 },
  { n: 8 },
];

const S_REQS = defineStrings({
  es: {
    rows: [
      { raw: 'Integrarse con heladeras de terceros: inventario y compras', out: 'Vago y probablemente fuera de alcance: ya lo resuelve el sistema de gestión de las heladeras. Necesita aclaración.' },
      { raw: 'Las heladeras exponen inventario y compras por una API en la nube', out: 'Contexto del #1: describe el entorno.' },
      { raw: 'Integrarse con el punto de venta de los kioscos', out: 'Es la confirmación del vendedor. El efectivo para no suscriptores es un caso válido.' },
      { raw: 'El kiosco: espacio subalquilado, un empleado cobra en la caja', out: 'Se agrupa con el #3: acompañar a los ocasionales y soportar pagos en efectivo.' },
      { raw: 'Aplicación accesible desde móvil y web', out: 'Acompañar e incentivar a suscriptores y conocidos.' },
      { raw: 'Feedback de compras verificadas y encuestas en la app', out: 'Extensible a nuevas formas de engagement: encuestas, reviews, cupones…' },
      { raw: 'Aceptar cupones y precios promocionales', out: 'Extensión del #6.' },
      { raw: 'Enviar actualizaciones de inventario a la cocina central', out: 'Integración.' },
    ],
    title: 'Ocho requerimientos crudos → escenarios de uso',
    flagged: 'Cuestionado',
    said: 'Lo que decía el pliego',
    reread: 'Cómo lo releyó el equipo',
  },
  en: {
    rows: [
      { raw: 'Integrate with 3rd party smart fridges: inventory and purchases', out: 'Vague and probably out of scope: the fridges’ management system already handles it. Needs clarification.' },
      { raw: 'The fridges expose inventory and purchases through a cloud API', out: 'Context for #1: it describes the environment.' },
      { raw: 'Integrate with the point of sale system at kiosks', out: 'It is confirmation from the seller. Cash for non-subscribers is a valid use case.' },
      { raw: 'The kiosk: a sublet space, an employee handles the transactions', out: 'Groups with #3: support and engage occasional users, and support cash payments.' },
      { raw: 'Mobile and web accessible application', out: 'Support and engage subscribers and known users.' },
      { raw: 'Feedback on verified purchases and in-app surveys', out: 'Extensible to new forms of engagement: surveys, reviews, coupons…' },
      { raw: 'Accept coupons and promotional pricing', out: 'Extension of #6.' },
      { raw: 'Send inventory updates to the central kitchen', out: 'Integration.' },
    ],
    title: 'Eight raw requirements → usage scenarios',
    flagged: 'Questioned',
    said: 'What the brief said',
    reread: 'How the team reread it',
  },
});

export function Reqs({ reduced }: SceneProps) {
  const t = useT(S_REQS);
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'accent', label: t.flagged }]} />}>
      <div className="reqs">
        <div className="reqs__head">
          <span>{t.said}</span>
          <span />
          <span>{t.reread}</span>
        </div>
        {REQS.map((r, i) => (
          <motion.div key={r.n} className={`reqs__row ${r.flag ? 'is-flag' : ''}`} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.1 + i * 0.09 }}>
            <span className="reqs__raw"><span className="mono reqs__n">#{r.n}</span>{t.rows[i].raw}</span>
            <ArrowRight size={15} aria-hidden className="reqs__arr" />
            <span className="reqs__out">{r.flag && <AlertTriangle size={14} aria-hidden />}{t.rows[i].out}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ───────────────────────── questions to the client ───────────────────────── */
const S_QS = defineStrings<{ qs: { q: string; back?: string }[]; title: string; note: string }>({
  es: {
    qs: [
      { q: 'Si un suscriptor se enferma y no puede retirar sus comidas durante uno o varios días, ¿qué pasa?' },
      { q: '¿Puede un usuario registrado hacer un pedido por lotes que no entre en una heladera? ¿Y entonces, entrega directa?' },
      { q: '¿La comida que un suscriptor no retiró puede venderse a otros? ¿Después de cuánto tiempo? ¿Cómo se le notifica al suscriptor?', back: 'vuelve en el capítulo 7' },
      { q: 'No sabemos qué datos proveen las heladeras: ¿el total de comidas disponibles o solo el delta del último cambio? Esperamos que sea el total.', back: 'vuelve en el capítulo 6' },
    ],
    title: 'Questions.md · del equipo al cliente',
    note: 'Cada ambigüedad, anotada y enviada al dueño del negocio. Ninguna, inventada.',
  },
  en: {
    qs: [
      { q: 'What if a subscriber gets sick and can’t grab meals for one or several days?' },
      { q: 'Can registered users create a batch order that won’t fit in a fridge? What then? Direct delivery?' },
      { q: 'What if a subscriber didn’t grab a daily meal? Can it be sold to others? After what time? How will the subscriber be notified about it?', back: 'returns in chapter 7' },
      { q: 'We don’t know what data is provided from the fridges: is it the total amount of meals or a delta? We hope for a total amount.', back: 'returns in chapter 6' },
    ],
    title: 'Questions.md · from the team to the client',
    note: 'Every ambiguity, written down and sent to the business owner. None of them made up.',
  },
});

export function Questions({ reduced }: SceneProps) {
  const t = useT(S_QS);
  return (
    <Frame title={t.title}>
      <div className="chat">
        <div className="chat__who"><Users size={14} aria-hidden /> ArchColider → Farmacy Food</div>
        {t.qs.map((x, i) => (
          <motion.div key={i} className="chat__msg" initial={{ opacity: 0, y: reduced ? 0 : 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: reduced ? 0 : 0.2 + i * 0.35, duration: 0.35 }}>
            <MessageSquare size={15} aria-hidden />
            <p>“{x.q}”</p>
            {x.back && <span className="chat__back">{x.back}</span>}
          </motion.div>
        ))}
        <motion.p className="chat__note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 1.8 }}>
          {t.note}
        </motion.p>
      </div>
    </Frame>
  );
}

/* ───────────────────────── Rozanski & Woods views (team's own view map) ───────────────────────── */
const S_VIEWS = defineStrings({
  es: {
    title: 'Cómo organizó el equipo sus vistas',
    lgView: 'Vista',
    lgStructure: 'Estructura del software',
    canvas: 'Mapa de vistas: la vista de despliegue define el despliegue de la estructura del software; la operacional define su operación; la de desarrollo, sus restricciones de implementación; la estructura se compone de las vistas funcional, de información y de concurrencia',
    deployment: 'Vista de despliegue',
    deploymentSub: 'cap. 8',
    operational: 'Vista operacional',
    structure: 'Estructura del software',
    development: 'Vista de desarrollo',
    functional: 'Funcional',
    functionalSub: 'cap. 5',
    information: 'Información',
    informationSub: 'caps. 6 y 7',
    concurrency: 'Concurrencia',
    concurrencySub: 'cap. 6',
    definesOperation: 'define su operación',
    definesDeployment: 'define su despliegue',
    implConstraints: 'restricciones de implementación',
    perspectives: '+ perspectivas',
    persp1: 'seguridad, performance,',
    persp2: 'disponibilidad… atraviesan',
    persp3: 'todas las vistas',
  },
  en: {
    title: 'How the team organized its views',
    lgView: 'View',
    lgStructure: 'Software structure',
    canvas: 'View map: the deployment view defines how the software structure is deployed; the operational view defines how it is operated; the development view, its implementation constraints; the structure is made up of the functional, information and concurrency views',
    deployment: 'Deployment view',
    deploymentSub: 'ch. 8',
    operational: 'Operational view',
    structure: 'Software structure',
    development: 'Development view',
    functional: 'Functional',
    functionalSub: 'ch. 5',
    information: 'Information',
    informationSub: 'chs. 6 and 7',
    concurrency: 'Concurrency',
    concurrencySub: 'ch. 6',
    definesOperation: 'defines its operation',
    definesDeployment: 'defines its deployment',
    implConstraints: 'implementation constraints',
    perspectives: '+ perspectives',
    persp1: 'security, performance,',
    persp2: 'availability… cut across',
    persp3: 'all the views',
  },
});

export function Views({ reduced }: SceneProps) {
  const t = useT(S_VIEWS);
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'cmp', label: t.lgView }, { tone: 'accent', label: t.lgStructure }]} />}>
      <Canvas w={960} h={520} label={t.canvas}>
        {(ids) => (
          <>
            <Node x={330} y={80} w={210} h={56} kind="cmp" icon={Server} label={t.deployment} sub={t.deploymentSub} delay={0.1} />
            <Node x={780} y={80} w={210} h={56} kind="cmp" icon={Cog} label={t.operational} delay={0.2} />
            <Node x={330} y={250} w={230} h={64} kind="core" icon={Layers} label={t.structure} delay={0} />
            <Node x={780} y={250} w={210} h={56} kind="cmp" icon={Code2} label={t.development} delay={0.3} />
            <Node x={130} y={430} w={190} h={56} kind="cmp" icon={Workflow} label={t.functional} sub={t.functionalSub} delay={0.4} />
            <Node x={330} y={430} w={190} h={56} kind="cmp" icon={Database} label={t.information} sub={t.informationSub} delay={0.5} />
            <Node x={530} y={430} w={190} h={56} kind="cmp" icon={Network} label={t.concurrency} sub={t.concurrencySub} delay={0.6} />
            <Edge points={[[675, 80], [437, 80]]} marker={ids.arrow} delay={0.3} />
            <Label x={556} y={70}>{t.definesOperation}</Label>
            <Edge points={[[330, 108], [330, 216]]} marker={ids.arrow} delay={0.3} />
            <Label x={340} y={166} anchor="start">{t.definesDeployment}</Label>
            <Edge points={[[675, 250], [447, 250]]} marker={ids.arrow} delay={0.4} />
            <Label x={560} y={240}>{t.implConstraints}</Label>
            <Edge points={[[330, 282], [330, 340], [130, 340], [130, 400]]} delay={0.5} />
            <Edge points={[[330, 340], [330, 400]]} delay={0.5} />
            <Edge points={[[330, 340], [530, 340], [530, 400]]} delay={0.5} />
            <polygon points="330,282 337,290 330,298 323,290" fill="var(--surface)" stroke="var(--text-3)" strokeWidth={1.5} />
            <Label x={700} y={420} anchor="start" tone="accent" show delay={0.7}>{t.perspectives}</Label>
            <Label x={700} y={440} anchor="start" tone="text" size={13} show delay={0.7}>{t.persp1}</Label>
            <Label x={700} y={458} anchor="start" tone="text" size={13} show delay={0.7}>{t.persp2}</Label>
            <Label x={700} y={476} anchor="start" tone="text" size={13} show delay={0.7}>{t.persp3}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── principles, distilled from constraints ───────────────────────── */
const PRINC = [
  { id: 'simplicity', icon: Brain },
  { id: 'evolvability', icon: Sprout },
  { id: 'telemetry', icon: Activity },
  { id: 'messages', icon: Mail },
];

const S_PRINC = defineStrings({
  es: {
    items: [
      { t: 'Simplicidad cognitiva', s: 'si no se puede explicar fácil, se descarta', from: 'Equipo chico, presupuesto mínimo' },
      { t: 'Evolucionabilidad', s: 'módulos fáciles de extraer mañana, no hoy', from: 'Meta: de 2 a 68 locaciones' },
      { t: 'Telemetría obligatoria', s: 'escalar con datos, no con ansiedad', from: 'El costo de escalar a ciegas' },
      { t: 'Mensajes antes que llamadas', s: 'nadie depende de que el otro esté vivo', from: 'Sistemas externos que no controlan' },
    ],
    titleMap: 'Cada principio responde a una presión del caso',
    titleList: 'Cuatro criterios de desempate',
    pressure: 'Presión',
    principle: 'Principio',
    canvas: 'Cuatro principios rectores y las restricciones de las que salen',
  },
  en: {
    items: [
      { t: 'Cognitive simplicity', s: 'if it can’t be explained easily, it’s out', from: 'Small team, minimal budget' },
      { t: 'Evolvability', s: 'modules easy to extract tomorrow, not today', from: 'Goal: from 2 to 68 locations' },
      { t: 'Mandatory telemetry', s: 'scale with data, not with anxiety', from: 'The cost of scaling blind' },
      { t: 'Messages over direct calls', s: 'no one depends on the other being alive', from: 'External systems they don’t control' },
    ],
    titleMap: 'Each principle answers a pressure of the case',
    titleList: 'Four tie-breaking criteria',
    pressure: 'Pressure',
    principle: 'Principle',
    canvas: 'Four guiding principles and the constraints they come from',
  },
});

export function Principles({ state = 'list' }: SceneProps) {
  const t = useT(S_PRINC);
  const map = state === 'map';
  return (
    <Frame title={map ? t.titleMap : t.titleList} legend={map ? <Legend items={[{ tone: 'danger', label: t.pressure }, { tone: 'accent', label: t.principle }]} /> : undefined}>
      <Canvas w={960} h={500} label={t.canvas}>
        {(ids) => (
          <>
            {PRINC.map((p, i) => {
              const y = 70 + i * 120;
              const txt = t.items[i];
              return (
                <g key={p.id}>
                  <Node x={220} y={y} w={280} h={60} kind="danger" icon={Target} label={txt.from} show={map} delay={0.1 + i * 0.12} />
                  <Edge points={[[362, y], [498, y]]} tone="accent" marker={ids.arrowAccent} show={map} delay={0.35 + i * 0.12} />
                  <Node x={map ? 690 : 480} y={y} w={340} h={70} kind="core" icon={p.icon} label={txt.t} sub={txt.s} delay={i * 0.08} />
                </g>
              );
            })}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── traceability: business drivers → SARs ───────────────────────── */
const BD_COUNT = 6;
const SARS: { bd: number[]; note?: boolean }[] = [
  { bd: [1] },
  { bd: [1, 2] },
  { bd: [3] },
  { bd: [1, 3, 4, 5] },
  { bd: [1, 4, 5] },
  { bd: [1, 4, 5] },
  { bd: [2, 5] },
  { bd: [1, 5, 6] },
  { bd: [1, 5] },
  { bd: [1, 5], note: true },
];

const S_TRACE = defineStrings({
  es: {
    bds: [
      'Convertir ocasionales en conocidos, y conocidos en suscriptores',
      'Programas de lealtad ricos y fáciles de extender',
      'Información de consumo para gestionar las cocinas',
      'Fácil de usar para gente sin experiencia',
      'Uso sostenible del servicio',
      'Sumar especialistas de la salud',
    ],
    sars: [
      'Pagos en efectivo y electrónicos',
      'Feedback, encuestas y reviews enchufables',
      'Reportes de consumo por heladera y tipo de usuario',
      'Agenda para suscriptores, sin pedidos repetitivos',
      'Comprar sin registrarse antes',
      'Notificaciones sobre sus órdenes',
      'Notificaciones de lealtad y cupones nuevos',
      'Cada comida desglosada por componentes',
      'Pagos seguros',
      'Maximizar la garantía de retiro de cada comida',
    ],
    note: '→ PIN offline, cap. 6',
    title: 'BusinessDrivers.md · de dónde sale cada requerimiento',
    hintPredict: 'Impulsor 1 seleccionado.',
    hintFull: 'Tocá un impulsor de negocio o un requerimiento para ver su trazabilidad.',
    bdHead: 'Impulsores de negocio',
    sarHead: 'Requerimientos arquitectónicamente significativos',
    veil: 'Respondé a la izquierda para ver qué requerimientos salen del impulsor 1',
  },
  en: {
    bds: [
      'Convert occasional users to known users, and known users to subscribers',
      'Rich loyalty programs, easy to extend',
      'Information about consumed meals to support kitchen management',
      'Easy to use for inexperienced users',
      'Sustainable usage of service',
      'Involve other specialists in health areas',
    ],
    sars: [
      'Cash and electronic payments',
      'Pluggable feedback, surveys and reviews',
      'Reports on consumed meals by fridge and user type',
      'Scheduling for subscribers, no repetitive ordering',
      'Purchase without registering first',
      'Notifications about their orders',
      'Notifications about new loyalty programs and coupons',
      'Detailed breakdown of each meal by components',
      'Secure payments',
      'Maximizing the guarantee of each meal pickup',
    ],
    note: '→ offline PIN, ch. 6',
    title: 'BusinessDrivers.md · where each requirement comes from',
    hintPredict: 'Driver 1 selected.',
    hintFull: 'Tap a business driver or a requirement to see its traceability.',
    bdHead: 'Business drivers',
    sarHead: 'Architecturally significant requirements',
    veil: 'Answer on the left to see which requirements come from driver 1',
  },
});

export function Trace({ state = 'full', chosen, props }: SceneProps) {
  const t = useT(S_TRACE);
  const predict = state === 'predict';
  const revealed = !predict || (chosen !== null && chosen === props?.correct);
  const [bd, setBd] = useState<number | null>(predict ? 1 : null);
  const [sar, setSar] = useState<number | null>(null);
  const activeSars = bd ? SARS.map((s, i) => (s.bd.includes(bd) ? i : -1)).filter((i) => i >= 0) : sar !== null ? [sar] : [];
  const activeBds = sar !== null ? SARS[sar].bd : bd ? [bd] : [];
  return (
    <Frame title={t.title} foot={<p className="trace__hint">{predict ? t.hintPredict : t.hintFull}</p>}>
      <div className={`trace ${revealed ? '' : 'is-hidden'}`}>
        <section>
          <p className="trace__k">{t.bdHead}</p>
          <ol className="trace__list">
            {Array.from({ length: BD_COUNT }, (_, i) => {
              const n = i + 1;
              const on = activeBds.includes(n);
              return (
                <li key={n}>
                  <button type="button" className={`trace__item trace__item--bd ${on ? 'is-on' : ''}`} onClick={() => { setSar(null); setBd(bd === n ? null : n); }} aria-pressed={bd === n} disabled={predict}>
                    <span className="mono trace__n">{n}</span>
                    <span>{t.bds[i]}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
        <section>
          <p className="trace__k">{t.sarHead}</p>
          <ol className="trace__list trace__list--sar">
            {SARS.map((s, i) => {
              const on = activeSars.includes(i);
              return (
                <li key={i}>
                  <button type="button" className={`trace__item ${on ? 'is-on' : ''} ${(bd || sar !== null) && !on ? 'is-dim' : ''}`} onClick={() => { setBd(null); setSar(sar === i ? null : i); }} aria-pressed={sar === i} disabled={predict}>
                    <span className="mono trace__n">{i + 1}</span>
                    <span className="trace__t">{t.sars[i]}</span>
                    {s.note && <span className="mono trace__note">{t.note}</span>}
                    <span className="mono trace__bd">BD {s.bd.join(', ')}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {!revealed && <div className="trace__veil">{t.veil}</div>}
        </section>
      </div>
    </Frame>
  );
}

/* ───────────────────────── anatomy of an ADR ───────────────────────── */
const S_ADR = defineStrings<{
  parts: { k: string; body: string; note: string; hl?: boolean }[];
  id: string;
  h: string;
  open: string;
  law: ReactNode;
}>({
  es: {
    parts: [
      { k: 'Contexto', body: 'Necesitamos registrar las decisiones arquitectónicas tomadas en este proyecto.', note: 'Qué problema obliga a decidir.' },
      { k: 'Decisión', body: 'Usaremos Architecture Decision Records, según la descripción de Michael Nygard.', note: 'Qué se decidió, en una frase.' },
      { k: 'Consecuencias', body: 'Positivo: si aplica · Negativo: si aplica · Riesgos: si aplica', note: 'Lo que se gana y lo que se paga. Incluidas las negativas.', hl: true },
    ],
    id: 'ADR 001 · 2020-11-19 · Aceptado',
    h: 'Usamos ADR',
    open: 'abrir original',
    law: <>Segunda ley: <em>el porqué importa más que el cómo.</em> El código muestra cómo es el sistema; solo el ADR guarda por qué quedó así.</>,
  },
  en: {
    parts: [
      { k: 'Context', body: 'We need to record the architectural decisions made on this project.', note: 'What problem forces a decision.' },
      { k: 'Decision', body: 'We will use Architecture Decision Records, as described by Michael Nygard.', note: 'What was decided, in one sentence.' },
      { k: 'Consequences', body: 'Positive: If any · Negative: If any · Risks: If any', note: 'What you gain and what you pay. Including the downsides.', hl: true },
    ],
    id: 'ADR 001 · 2020-11-19 · Accepted',
    h: 'We are using ADR',
    open: 'open original',
    law: <>Second law: <em>why is more important than how.</em> Code shows how the system is; only the ADR records why it ended up that way.</>,
  },
});

export function AdrAnatomy({ reduced }: SceneProps) {
  const t = useT(S_ADR);
  const parts = t.parts;
  return (
    <div className="adrx">
      <motion.article className="vcard adrx__doc" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}>
        <header>
          <ScrollText size={18} aria-hidden />
          <div>
            <p className="mono adrx__id">{t.id}</p>
            <h3>{t.h}</h3>
          </div>
          <button type="button" className="doc-ref" data-doc="adr-001">{t.open}</button>
        </header>
        {parts.map((p, i) => (
          <motion.div key={i} className={`adrx__part ${p.hl ? 'is-hl' : ''}`} initial={{ opacity: 0, x: reduced ? 0 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.2 }}>
            <p className="mono adrx__k">{p.k}</p>
            <p className="adrx__b">{p.body}</p>
            <p className="adrx__note">{p.note}</p>
          </motion.div>
        ))}
      </motion.article>
      <motion.p className="adrx__law" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        {t.law}
      </motion.p>
    </div>
  );
}
