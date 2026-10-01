import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  User, BookOpen, Inbox, CreditCard, Refrigerator, Users, Rocket, Wallet, Cloud, Gauge, CalendarClock, MessageSquare, Tag,
  Zap, Eye, DollarSign, Monitor, Soup, Filter, Server, Box, StickyNote, XCircle, CheckCircle2, HelpCircle, GitFork,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── the Entity Trap ───────────────────────── */
const NOUNS = [
  { k: 'usuario', icon: User },
  { k: 'menú', icon: BookOpen },
  { k: 'orden', icon: Inbox },
  { k: 'pago', icon: CreditCard },
  { k: 'heladera', icon: Refrigerator },
] as const;

const TRAP = defineStrings({
  es: {
    nouns: { usuario: 'Usuario', 'menú': 'Menú', orden: 'Orden', pago: 'Pago', heladera: 'Heladera' },
    titleFlows: 'Un solo flujo atraviesa todas las cajas',
    titleNouns: 'Un componente por sustantivo',
    legendFlow: 'Un flujo real: comprar una vianda',
    canvas: 'La Entity Trap: se crea un servicio por cada sustantivo del negocio, y un flujo real como comprar una vianda tiene que atravesarlos todos',
    sentence: <>Un <mark>usuario</mark> elige un <mark>menú</mark>, arma una <mark>orden</mark>, la <mark>paga</mark> y la retira de una <mark>heladera</mark>.</>,
    sub: 'servicio CRUD',
    packet: 'comprar',
    noteFlows: 'cada cambio del negocio toca cinco servicios a la vez',
    noteNouns: 'suena ordenado',
  },
  en: {
    nouns: { usuario: 'User', 'menú': 'Menu', orden: 'Order', pago: 'Payment', heladera: 'Fridge' },
    titleFlows: 'A single workflow cuts across every box',
    titleNouns: 'One component per noun',
    legendFlow: 'A real workflow: buying a meal',
    canvas: 'The Entity Trap: one service is created per business noun, and a real workflow like buying a meal has to cut across all of them',
    sentence: <>A <mark>user</mark> picks a <mark>menu</mark>, builds an <mark>order</mark>, <mark>pays</mark> for it and picks it up from a <mark>fridge</mark>.</>,
    sub: 'CRUD service',
    packet: 'buy',
    noteFlows: 'every business change touches five services at once',
    noteNouns: 'sounds tidy',
  },
});

export function EntityTrap({ state = 'nouns', reduced }: SceneProps) {
  const t = useT(TRAP);
  const flows = state === 'flows';
  const xs = [120, 300, 480, 660, 840];
  const path: [number, number][] = [];
  xs.forEach((x, i) => {
    path.push([x, 300]);
    if (i < xs.length - 1) path.push([x, 380], [xs[i + 1], 380]);
  });
  return (
    <Frame title={flows ? t.titleFlows : t.titleNouns} legend={flows ? <Legend items={[{ tone: 'cmd', label: t.legendFlow }]} /> : undefined}>
      <Canvas w={960} h={480} label={t.canvas}>
        {(ids) => (
          <>
            <foreignObject x={60} y={30} width={840} height={70}>
              <p className="trap__sentence">
                {t.sentence}
              </p>
            </foreignObject>
            {NOUNS.map((n, i) => (
              <g key={n.k}>
                <Edge points={[[xs[i], 104], [xs[i], 222]]} tone="muted" dashed show={!flows} delay={0.2 + i * 0.08} />
                <Node x={xs[i]} y={260} w={160} h={70} kind="cmp" icon={n.icon} label={t.nouns[n.k]} sub={t.sub} delay={0.3 + i * 0.1} highlight={flows} />
              </g>
            ))}
            <Edge points={path} tone="cmd" show={flows} marker={ids.arrowCmd} delay={0.2} />
            {flows && <Packet reduced={reduced} tone="cmd" label={t.packet} points={path} duration={5} repeat repeatDelay={0.6} />}
            <Label x={480} y={440} tone={flows ? 'danger' : 'muted'} size={flows ? 12 : 11}>
              {flows ? t.noteFlows : t.noteNouns}
            </Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── constraints + the number ───────────────────────── */
const CONS = defineStrings({
  es: {
    cs: [
      { t: 'Equipo chico', s: 'la solución debe ser simple al comienzo para probar las ideas de negocio' },
      { t: 'Salida al mercado crítica', s: 'con un equipo chico, el despliegue tiene que ser súper simple' },
      { t: 'AWS', s: 'la plataforma de despliegue principal' },
      { t: 'Presupuesto muy limitado', s: 'software libre y herramientas de la plataforma, primero' },
    ],
    num: '< 1 petición por segundo',
    numSub: 'hoy y en la meta a un año, del capítulo 1',
  },
  en: {
    cs: [
      { t: 'Limited team', s: 'the solution should be simple at the beginning to prove business ideas' },
      { t: 'Time-to-market is critical', s: 'with a small team, it should be super simple to deploy' },
      { t: 'AWS', s: 'the primary target platform for deployment' },
      { t: 'Very limited budget', s: 'OSS and tools provided by the target platform come first' },
    ],
    num: '< 1 request per second',
    numSub: 'today and at the one-year target, from chapter 1',
  },
});
const CONS_ICONS = [Users, Rocket, Cloud, Wallet];

export function Constraints({ reduced }: SceneProps) {
  const t = useT(CONS);
  const cs = t.cs.map((c, i) => ({ ...c, icon: CONS_ICONS[i] }));
  return (
    <div className="cons">
      <div className="cons__grid">
        {cs.map((c, i) => (
          <motion.div key={i} className="cons__c vcard" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <c.icon size={20} aria-hidden />
            <strong>{c.t}</strong>
            <span>{c.s}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="cons__num" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }}>
        <Gauge size={22} aria-hidden />
        <span className="mono">{t.num}</span>
        <span>{t.numSub}</span>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── ADR 002 value map ───────────────────────── */
const STYLES = ['mono', 'micro', 'kernel', 'modmono'] as const;
const ATTRS: [AttrKey, number[]][] = [
  ['deploy', [2, -1, -1, 2]],
  ['avail', [-1, 2, 1, -1]],
  ['autonomy', [-2, 2, 2, 1]],
  ['trace', [2, -1, 1, 0]],
  ['perf', [2, 1, 1, 2]],
  ['modif', [0, 2, 1, 1]],
  ['maint', [-1, 2, 1, 1]],
  ['integrity', [2, -2, 0, 1]],
  ['security', [-1, 2, 1, 2]],
  ['scale', [-2, 2, -1, 1]],
];
type AttrKey = 'deploy' | 'avail' | 'autonomy' | 'trace' | 'perf' | 'modif' | 'maint' | 'integrity' | 'security' | 'scale';
const SYM: Record<number, string> = { 2: '++', 1: '+', 0: 'O', [-1]: '−', [-2]: '−−' };

const VMAP = defineStrings({
  es: {
    styles: { mono: 'Monolito', micro: 'Microservicios', kernel: 'Micro-kernel', modmono: 'Monolito modularizado' },
    attrs: {
      deploy: 'Facilidad de despliegue', avail: 'Disponibilidad', autonomy: 'Autonomía', trace: 'Trazabilidad', perf: 'Performance',
      modif: 'Modificabilidad', maint: 'Mantenibilidad', integrity: 'Integridad', security: 'Seguridad', scale: 'Escalabilidad',
    } as Record<AttrKey, string>,
    title: 'ADR 002 · mapa de valores',
    legend: '++ promueve fuerte · + promueve · O neutral · − negativo · −− muy negativo',
    hint: 'Tocá una columna para resaltarla.',
    chosen: 'La elegida por el equipo está marcada.',
    total: 'Suma sin pesos',
    totalNote: '(solo para orientarte)',
  },
  en: {
    styles: { mono: 'Monolith', micro: 'Microservices', kernel: 'Micro-kernel', modmono: 'Modularized Monolith' },
    attrs: {
      deploy: 'Ease of Deployment', avail: 'Availability', autonomy: 'Autonomy', trace: 'Traceability', perf: 'Performance',
      modif: 'Modifiability', maint: 'Maintainability', integrity: 'Integrity', security: 'Security', scale: 'Scalability',
    },
    title: 'ADR 002 · value map',
    legend: '++ strongly promotes · + promotes · O neutral · − negative · −− strongly negative',
    hint: 'Select a column to highlight it.',
    chosen: 'The team’s choice is marked.',
    total: 'Unweighted sum',
    totalNote: '(just to help you orient)',
  },
});

export function ValueMap({ chosen, props }: SceneProps) {
  const t = useT(VMAP);
  const revealed = chosen !== null && chosen === props?.correct;
  const [col, setCol] = useState<number | null>(null);
  const active = col ?? (revealed ? 3 : null);
  const totals = STYLES.map((_, j) => ATTRS.reduce((a, [, v]) => a + v[j], 0));
  return (
    <Frame title={t.title} legend={<p className="vmap__legend mono">{t.legend}</p>}
      foot={<p className="vmap__hint">{t.hint} {revealed ? t.chosen : ''}</p>}>
      <div className="vmap-wrap">
        <table className="vmap">
          <thead>
            <tr>
              <th />
              {STYLES.map((s, j) => (
                <th key={s} className={active === j ? 'is-col' : ''}>
                  <button type="button" onClick={() => setCol(col === j ? null : j)} aria-pressed={col === j}>{t.styles[s]}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATTRS.map(([a, v], i) => (
              <motion.tr key={a} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <th scope="row">{t.attrs[a]}</th>
                {v.map((x, j) => (
                  <td key={j} className={`s${x < 0 ? 'm' : 'p'}${Math.abs(x)} ${active === j ? 'is-col' : ''}`}>
                    <span className="mono">{SYM[x]}</span>
                  </td>
                ))}
              </motion.tr>
            ))}
            <tr className="vmap__tot">
              <th scope="row">{t.total} <span>{t.totalNote}</span></th>
              {totals.map((tot, j) => (
                <td key={j} className={active === j ? 'is-col' : ''}><span className="mono">{tot > 0 ? '+' : ''}{tot}</span></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

/* ───────────────────────── modular monolith: inside and extraction ───────────────────────── */
const MODS = [
  { k: 'cat', icon: BookOpen, x: 170, y: 190 },
  { k: 'ord', icon: Inbox, x: 360, y: 190 },
  { k: 'sch', icon: CalendarClock, x: 550, y: 190 },
  { k: 'pay', icon: CreditCard, x: 170, y: 340 },
  { k: 'fb', icon: MessageSquare, x: 360, y: 340 },
  { k: 'pro', icon: Tag, x: 550, y: 340 },
] as const;

const EXTRACT_ROUTE: [number, number][] = [[360, 159], [360, 128], [705, 128], [705, 250], [748, 250]];

const MM = defineStrings({
  es: {
    mods: { cat: 'Catálogo', ord: 'Órdenes', sch: 'Agenda', pay: 'Pagos', fb: 'Opiniones', pro: 'Promociones' },
    titleExtract: 'El día que la telemetría lo pide',
    titleInside: 'Un solo despliegue, módulos con fronteras',
    legendModule: 'Módulo',
    legendMsg: 'Mensaje por contrato',
    legendBoundary: 'Límite de despliegue',
    canvasExtract: 'Un módulo sale del monolito como servicio propio sin cambiar sus mensajes',
    canvasInside: 'Un monolito con seis módulos separados que se hablan por contratos',
    app: 'una aplicación · pocas máquinas de AWS',
    own: 'servicio propio',
    scales: 'escala por su lado',
    replicas: 'N réplicas',
    module: 'módulo',
    same: 'mismo mensaje',
    load: 'telemetría: carga alta',
    noteExtract: 'la frontera ya existía: extraer no reescribe a los demás',
    noteInside: 'cada módulo habla por contratos, como si hubiera red entre ellos',
  },
  en: {
    mods: { cat: 'Catalog', ord: 'Orders', sch: 'Schedule', pay: 'Payments', fb: 'Feedback', pro: 'Promotions' },
    titleExtract: 'The day telemetry asks for it',
    titleInside: 'One deployment, modules with boundaries',
    legendModule: 'Module',
    legendMsg: 'Message through a contract',
    legendBoundary: 'Deployment boundary',
    canvasExtract: 'A module leaves the monolith as its own service without changing its messages',
    canvasInside: 'A monolith with six separate modules that talk through contracts',
    app: 'one application · a few AWS machines',
    own: 'its own service',
    scales: 'scales on its own',
    replicas: 'N replicas',
    module: 'module',
    same: 'same message',
    load: 'telemetry: high load',
    noteExtract: 'the boundary already existed: extracting it rewrites nothing else',
    noteInside: 'each module talks through contracts, as if there were a network between them',
  },
});

export function ModMono({ state = 'inside', reduced }: SceneProps) {
  const t = useT(MM);
  const extract = state === 'extract';
  return (
    <Frame title={extract ? t.titleExtract : t.titleInside} legend={<Legend items={[{ tone: 'cmp', label: t.legendModule }, { tone: 'cmd', label: t.legendMsg }, { tone: 'accent', label: t.legendBoundary }]} />}>
      <Canvas w={960} h={500} label={extract ? t.canvasExtract : t.canvasInside}>
        {(ids) => (
          <>
            <rect x={60} y={100} width={620} height={330} rx={18} className="zone zone--accent" />
            <Label x={80} y={90} anchor="start" tone="accent">{t.app}</Label>
            <motion.rect x={730} y={150} width={200} height={230} rx={18} className="zone zone--accent" initial={false} animate={{ opacity: extract ? 1 : 0 }} />
            <Label x={830} y={140} tone="accent" show={extract}>{t.own}</Label>
            <Label x={830} y={400} tone="muted" show={extract}>{t.scales}</Label>
            {/* contract lines */}
            <Edge points={[[250, 190], [278, 190]]} tone="cmd" marker={ids.arrowCmd} show={!extract} />
            <Edge points={[[440, 190], [468, 190]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[360, 222], [360, 308]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[170, 308], [170, 222]]} tone="cmd" marker={ids.arrowCmd} show={!extract} />
            {/* the extracted catalog is reached over the top of the row, never through the Schedule module */}
            <Edge points={EXTRACT_ROUTE} tone="cmd" marker={ids.arrowCmd} show={extract} delay={0.4} />
            {MODS.map((m) => {
              const out = extract && m.k === 'cat';
              return <Node key={m.k} x={out ? 830 : m.x} y={out ? 250 : m.y} w={160} h={62} kind="cmp" icon={m.icon} label={t.mods[m.k]} sub={out ? t.replicas : t.module} highlight={out} />;
            })}
            {!extract && <Packet reduced={reduced} tone="cmd" points={[[440, 190], [468, 190]]} duration={1.2} repeat repeatDelay={1.4} w={14} />}
            {!extract && <Packet reduced={reduced} tone="cmd" points={[[360, 222], [360, 308]]} duration={1.2} delay={0.8} repeat repeatDelay={1.4} w={14} />}
            {extract && <Packet reduced={reduced} tone="cmd" label={t.same} points={EXTRACT_ROUTE} duration={2.2} repeat repeatDelay={1} />}
            <motion.g initial={false} animate={{ opacity: extract ? 1 : 0 }} transition={{ delay: extract ? 0.3 : 0 }}>
              <rect x={740} y={294} width={180} height={32} rx={16} className="pk pk--danger" />
              <text x={830} y={314.5} textAnchor="middle" className="pk-t">{t.load}</text>
            </motion.g>
            <Label x={370} y={465} tone="text" size={13}>{extract ? t.noteExtract : t.noteInside}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── the 29 Oct 2020 whiteboard ───────────────────────── */
const SAT = [
  { icon: null, t: 'N' },
  { icon: Zap },
  { icon: Eye },
  { icon: DollarSign },
  { icon: Monitor },
  { icon: Soup },
  { icon: Filter },
];

const WB = defineStrings({
  es: {
    sat: ['nutrición', 'recomendaciones', 'reviews', 'descuentos', 'front-end', 'comidas', 'filtrado'],
    cap: [
      'En el centro, el núcleo <strong>Menu</strong>: la pieza que no puede fallar. Alrededor, extensiones candidatas, como plug-ins.',
      'El núcleo vive en una máquina grande: <strong>4 núcleos y 8 GB</strong> en AWS.',
      'Separada a propósito, una pieza chica de <strong>1 núcleo y 2 GB</strong>, con balanceador y su propio paquete (JAR): escala por su lado. Entre ambas, un canal de <strong>mensajes</strong>.',
      'Y el post-it, la política completa del monolito modular escrita a mano antes de cualquier diagrama formal.',
    ],
    title: 'Pizarra de la sesión del 29 de octubre de 2020, redibujada',
    canvas: 'Pizarra: el núcleo Menu rodeado de plug-ins en una máquina de 4 núcleos, una pieza escalable aparte de 1 núcleo, un canal de mensajes y un post-it con la política de comunicación',
    postit: '“Se comunica con los plug-ins por protocolo de mensajería (el protocolo debe ser lo bastante inteligente como para desacoplar después). Si el núcleo se congestiona, le agregamos caché.”',
  },
  en: {
    sat: ['nutrition', 'recommendations', 'reviews', 'discounts', 'front-end', 'meals', 'filtering'],
    cap: [
      'In the center, the <strong>Menu</strong> core: the piece that cannot fail. Around it, candidate extensions, like plug-ins.',
      'The core runs on a big machine: <strong>4 cores and 8 GB</strong> on AWS.',
      'Deliberately separate, a small piece with <strong>1 core and 2 GB</strong>, a load balancer and its own package (JAR): it scales on its own. Between the two, a <strong>message</strong> channel.',
      'And the sticky note: the whole modular monolith policy, written by hand before any formal diagram.',
    ],
    title: 'Whiteboard from the October 29, 2020 session, redrawn',
    canvas: 'Whiteboard: the Menu core surrounded by plug-ins on a 4-core machine, a separate scalable 1-core piece, a message channel and a sticky note with the communication policy',
    postit: '“Communicates with plug-ins thru messaging protocol (the protocol should be smart enough to decouple later). If the core menu gets congested, we can have a cache.”',
  },
});

export function Whiteboard({ reduced }: SceneProps) {
  const t = useT(WB);
  const s = usePhases(4, { interval: 3400, reduced });
  const p = s.phase;
  const cx = 290, cy = 260, r = 140;
  return (
    <Frame title={t.title}
      foot={<Stepper phase={p} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.cap} />}>
      <Canvas w={960} h={500} label={t.canvas}>
        {(ids) => (
          <>
            <motion.rect x={24} y={50} width={542} height={420} rx={20} className="zone" initial={false} animate={{ opacity: p >= 1 ? 1 : 0 }} />
            <Label x={44} y={40} anchor="start" show={p >= 1}>AWS · 4 cores / 8 GB</Label>
            {SAT.map((st, i) => {
              const a = (i / SAT.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(a) * r;
              const y = cy + Math.sin(a) * r;
              return (
                <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.2 + i * 0.08 }}>
                  <line x1={cx + Math.cos(a) * 58} y1={cy + Math.sin(a) * 58} x2={x - Math.cos(a) * 30} y2={y - Math.sin(a) * 30} stroke="var(--text-3)" strokeWidth={1.4} />
                  <circle cx={x} cy={y} r={30} className="nd nd--cmp" />
                  <foreignObject x={x - 12} y={y - 12} width={24} height={24}>
                    <div className="wb-ic">{st.icon ? <st.icon size={17} /> : <strong>{st.t}</strong>}</div>
                  </foreignObject>
                  {/* the label sits on the outer side of its circle, so no spoke ever runs through it */}
                  <text x={x + Math.cos(a) * 40} y={y + Math.sin(a) * 42 + 4} textAnchor={Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle'} className="lb lb--muted" style={{ fontSize: 10 }}>{t.sat[i]}</text>
                </motion.g>
              );
            })}
            <circle cx={cx} cy={cy} r={58} className="nd nd--core" />
            <text x={cx} y={cy + 7} textAnchor="middle" style={{ fontSize: 22, fontWeight: 750, fill: 'var(--text)' }}>Menu</text>

            <motion.g initial={false} animate={{ opacity: p >= 2 ? 1 : 0 }}>
              <rect x={690} y={120} width={220} height={190} rx={16} className="zone zone--accent" />
              <text x={800} y={110} textAnchor="middle" className="lb lb--accent" style={{ fontSize: 11 }}>1 core / 2 GB</text>
            </motion.g>
            <Node x={800} y={165} w={160} h={44} kind="plain" icon={Server} label="LoadBalancer" show={p >= 2} />
            <Node x={800} y={250} w={184} h={50} kind="cmp" icon={Box} label="JAR" sub="caching / scaling" show={p >= 2} />
            <Edge points={[[566, 230], [688, 230]]} tone="cmd" marker={ids.arrowCmd} show={p >= 2} />
            <Label x={627} y={220} tone="cmd" show={p >= 2}>MSG</Label>
            {p >= 2 && <Packet reduced={reduced} tone="cmd" points={[[566, 230], [686, 230]]} duration={1.4} repeat repeatDelay={1} w={14} />}

            <motion.g initial={false} animate={{ opacity: p >= 3 ? 1 : 0, rotate: p >= 3 ? -2 : 0 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <rect x={590} y={330} width={350} height={150} rx={4} fill="#fde68a" stroke="#d6a93a" />
              <foreignObject x={604} y={340} width={322} height={134}>
                <p className="postit">
                  <StickyNote size={14} aria-hidden /> {t.postit}
                </p>
              </foreignObject>
            </motion.g>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── the spectrum of discarded extremes ───────────────────────── */
const SPECTRUM_OK = [false, true, false];

const SPEC = defineStrings({
  es: {
    stops: [
      { t: 'Monolito puro', verdict: 'Descartado', q: '“Sirve para una prueba de concepto, pero acá sería simplificación de más.”' },
      { t: 'Monolito modular', verdict: 'Elegido', q: '“La mejor opción por ahora. Al mismo tiempo, abre la posibilidad de migrar a microservicios cuando sea necesario.” (ADR 002)' },
      { t: 'Microservicios desde el día uno', verdict: 'Descartado', q: '“Exigen un modelo de dominio estable que todavía no existe: el esfuerzo se pierde y el usuario no lo ve.”' },
    ],
    aria: 'Espectro de estilos',
    fewer: 'menos piezas',
    more: 'más piezas',
    foot: 'El punto medio es deliberado, no una apuesta a ciegas. Tocá cada extremo para leer por qué quedó afuera.',
  },
  en: {
    stops: [
      { t: 'Pure monolith', verdict: 'Rejected', q: '“Good for a Proof of Concept, but here pure monolith would be oversimplification.”' },
      { t: 'Modular monolith', verdict: 'Chosen', q: '“The best option for now. At the same time it opens the possibility to migrate to microservices when needed.” (ADR 002)' },
      { t: 'Microservices from day one', verdict: 'Rejected', q: '“Requires a stable and known domain model, which doesn’t exist yet: developers’ effort will be wasted or invisible for end-users.”' },
    ],
    aria: 'Spectrum of styles',
    fewer: 'fewer pieces',
    more: 'more pieces',
    foot: 'The middle point is deliberate, not a blind bet. Select each extreme to read why it was left out.',
  },
});

export function Spectrum({ reduced }: SceneProps) {
  const t = useT(SPEC);
  const SPECTRUM = t.stops.map((s, i) => ({ ...s, ok: SPECTRUM_OK[i] }));
  const [sel, setSel] = useState(1);
  const cur = SPECTRUM[sel];
  return (
    <div className="spec">
      <div className="spec__line" role="radiogroup" aria-label={t.aria}>
        {SPECTRUM.map((s, i) => (
          <button key={i} type="button" role="radio" aria-checked={sel === i} className={`spec__stop ${sel === i ? 'is-sel' : ''} ${s.ok ? 'is-ok' : ''}`} onClick={() => setSel(i)}>
            <span className="spec__dot" aria-hidden />
            <span className="spec__t">{s.t}</span>
          </button>
        ))}
      </div>
      <div className="spec__axis mono" aria-hidden><span>{t.fewer}</span><span>{t.more}</span></div>
      <AnimatePresence mode="wait">
        <motion.div key={sel} className={`vcard spec__card ${cur.ok ? 'is-ok' : 'is-no'}`} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <p className="spec__v mono">{cur.ok ? <CheckCircle2 size={15} aria-hidden /> : <XCircle size={15} aria-hidden />} {cur.verdict}</p>
          <p className="spec__q">{cur.q}</p>
        </motion.div>
      </AnimatePresence>
      <p className="spec__foot">{t.foot}</p>
    </div>
  );
}

/* ───────────────────────── the fork: ArchColider vs Myagis-Forest ───────────────────────── */
const FORK = defineStrings({
  es: {
    cols: [
      {
        team: 'ArchColider', adr: 'ADR 002', steps: ['Hoy: monolito modular', 'Mañana, si la telemetría lo justifica: extraer módulos'],
        why: ['La experiencia y las capacidades del equipo también se consideran.', 'Bajo costo de desarrollo y complejidad cognitiva: una sola base de código, menos reuniones de sincronización.'],
      },
      {
        team: 'Myagis-Forest', adr: 'ADR 001', steps: ['Hoy: microservicios en contenedores Docker', 'Sin una segunda migración por etapas'],
        why: ['En una startup el modo es “shut up and type”: no ven necesidad de diseñar arquitecturas por etapas.', 'Microservicios desde el arranque, viables en tiempo, técnica y financieramente, amparados en la madurez de herramientas y desarrolladores.'],
      },
    ],
    top: 'La misma bifurcación, dos salidas por escrito',
    foot: 'Dos equipos serios, salidas opuestas, cada una con su justificación escrita: la primera ley funcionando en la práctica.',
  },
  en: {
    cols: [
      {
        team: 'ArchColider', adr: 'ADR 002', steps: ['Today: modular monolith', 'Tomorrow, if telemetry justifies it: extract modules'],
        why: ['The team’s experience and capabilities are taken into account too.', 'Low cost of development and cognitive complexity: a single code base, fewer synchronization meetings.'],
      },
      {
        team: 'Myagis-Forest', adr: 'ADR 001', steps: ['Today: microservices in Docker containers', 'No second, staged migration'],
        why: ['In a startup the mode is “shut up and type”: they see no need to design the architecture in stages.', 'Microservices from the start, feasible time-wise, technically and financially, backed by the maturity of the tooling and the developers.'],
      },
    ],
    top: 'The same fork, two exits in writing',
    foot: 'Two serious teams, opposite exits, each with its written justification: the first law working in practice.',
  },
});

export function Fork({ reduced }: SceneProps) {
  const t = useT(FORK);
  const cols = t.cols;
  return (
    <div className="fork">
      <div className="fork__top"><GitFork size={20} aria-hidden /> {t.top}</div>
      <div className="fork__cols">
        {cols.map((c, i) => (
          <motion.section key={c.team} className={`vcard fork__col ${i === 0 ? 'is-main' : ''}`} initial={{ opacity: 0, x: reduced ? 0 : (i ? 16 : -16) }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.15, duration: 0.45, ease: EASE }}>
            <header><strong>{c.team}</strong><span className="mono">{c.adr}</span></header>
            <ol className="fork__path">
              {c.steps.map((s, k) => <li key={k}>{s}</li>)}
            </ol>
            <ul className="fork__why">
              {c.why.map((w, k) => <li key={k}>{w}</li>)}
            </ul>
          </motion.section>
        ))}
      </div>
      <p className="fork__foot">{t.foot}</p>
    </div>
  );
}

/* ───────────────────────── reframe the question ───────────────────────── */
const REFRAME = defineStrings({
  es: {
    qs: ['¿Qué volumen real tengo?', '¿Qué equipo tengo?', '¿Cuánto cuesta cada estilo en ese contexto?'],
    bad: '¿Monolito o microservicios?',
    ans: <>Con 42 comidas al día, la respuesta era <strong>matemática, no ideológica</strong>.</>,
  },
  en: {
    qs: ['What real volume do I have?', 'What team do I have?', 'How much does each style cost in that context?'],
    bad: 'Monolith or microservices?',
    ans: <>With 42 meals a day, the answer was <strong>math, not ideology</strong>.</>,
  },
});

export function Reframe({ reduced }: SceneProps) {
  const t = useT(REFRAME);
  const qs = t.qs;
  return (
    <div className="reframe">
      <motion.p className="reframe__bad" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span>{t.bad}</span>
      </motion.p>
      <motion.div className="reframe__good" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <HelpCircle size={20} aria-hidden />
        <ol>
          {qs.map((q, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: reduced ? 0 : -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.15 }}>{q}</motion.li>
          ))}
        </ol>
      </motion.div>
      <motion.p className="reframe__ans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        {t.ans}
      </motion.p>
    </div>
  );
}
