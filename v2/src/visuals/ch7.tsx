import { useEffect, useState, type ComponentType } from 'react';
import { motion } from 'motion/react';
import {
  User, UserCheck, CalendarCheck, CalendarDays, ChefHat, Refrigerator, ChartColumn, BookOpen, Smartphone, Inbox,
  CreditCard, Truck, Receipt, Pencil, RotateCcw, ClipboardList,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

type Pt = [number, number];

/* ───────────────────────── ladder: the customer who went missing ───────────────────────── */
const LADDER = defineStrings({
  es: {
    title: 'Los tres usuarios del negocio',
    canvas: 'Escalera de tres usuarios: ocasional, conocido y suscriptor, arriba y destacado. Mil suscriptores a unas diez comidas por semana son unas diez mil comidas por semana',
    occ: 'Usuario ocasional',
    occSub: 'kiosco · efectivo',
    known: 'Usuario conocido',
    knownSub: 'app + tarjeta',
    sub: 'Suscriptor',
    subSub: 'menú semanal prepagado',
    convert: 'convertir',
    ask: '¿cómo llega su comida?',
    driverK: 'Impulsor de negocio 1',
    driver: '“Convertir usuarios ocasionales en conocidos, y conocidos en suscriptores.”',
    goal: 'objetivo de fin de año',
    stat: <><strong>1.000</strong> suscriptores × <strong>~10</strong> comidas por semana</>,
    statEq: <>≈ <strong>10.000</strong> comidas por semana</>,
  },
  en: {
    title: 'The business’s three users',
    canvas: 'A ladder of three users: occasional, known and subscriber, highlighted at the top. A thousand subscribers at about ten meals a week is about ten thousand meals a week',
    occ: 'Occasional user',
    occSub: 'kiosk · cash',
    known: 'Known user',
    knownSub: 'app + card',
    sub: 'Subscriber',
    subSub: 'prepaid weekly menu',
    convert: 'convert',
    ask: 'how does their food arrive?',
    driverK: 'Business driver 1',
    driver: '“Converting occasional users to known users, and known users to subscribers.”',
    goal: 'end-of-year goal',
    stat: <><strong>1,000</strong> subscribers × <strong>~10</strong> meals a week</>,
    statEq: <>≈ <strong>10,000</strong> meals a week</>,
  },
});

const LADDER_ROUTE: Pt[] = [[317, 372], [480, 372], [480, 294], [480, 262], [640, 262], [760, 262], [760, 188]];

export function Ladder({ reduced }: SceneProps) {
  const t = useT(LADDER);
  return (
    <Frame title={t.title}>
      <Canvas w={960} h={480} label={t.canvas}>
        {(ids) => (
          <>
            <foreignObject x={24} y={20} width={420} height={120}>
              <div className="c7-quote">
                <span className="mono">{t.driverK}</span>
                <p>{t.driver}</p>
              </div>
            </foreignObject>
            <Edge points={[[317, 372], [480, 372], [480, 294]]} tone="accent" marker={ids.arrowAccent} />
            <Label x={492} y={344} anchor="start" tone="accent">{t.convert}</Label>
            <Edge points={[[597, 262], [760, 262], [760, 188]]} tone="accent" marker={ids.arrowAccent} delay={0.3} />
            <Label x={772} y={234} anchor="start" tone="accent">{t.convert}</Label>
            {/* the dot climbs behind the middle step: drawn before the boxes */}
            <Packet reduced={reduced} tone="accent" points={LADDER_ROUTE} w={14} duration={2.6} repeat repeatDelay={1.4} />
            <Node x={200} y={372} w={230} h={64} icon={User} label={t.occ} sub={t.occSub} />
            <Node x={480} y={262} w={230} h={64} icon={UserCheck} label={t.known} sub={t.knownSub} delay={0.1} />
            <Node x={760} y={150} w={240} h={72} kind="core" icon={CalendarCheck} label={t.sub} sub={t.subSub} delay={0.2} highlight />
            <Label x={760} y={96} tone="accent">{t.ask}</Label>
            <foreignObject x={560} y={336} width={380} height={124}>
              <div className="c7-stat">
                <span className="mono">{t.goal}</span>
                <p>{t.stat}</p>
                <p className="c7-stat__eq">{t.statEq}</p>
              </div>
            </foreignObject>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── idea: the IDEA!!! whiteboard ───────────────────────── */
const IDEA = defineStrings({
  es: {
    title: 'La pizarra “IDEA!!!”, redibujada',
    canvas: 'Pizarra: un usuario con cuenta, una heladera con comidas A a E y, abajo, una fila de casilleros prepagados por día (1d, 2d, 3d) que suman puntos de lealtad',
    account: 'Cuenta',
    fridge: 'heladera',
    available: 'comidas disponibles',
    prepaid: 'prepagado',
    menu: 'menú de suscripción',
    loyalty: '+ puntos de lealtad',
    presentK: 'el presente:',
    present: 'elegís y pagás ahora',
    futureK: 'el futuro comprometido:',
    future: 'pagado antes, por día',
    caps: [
      'Un usuario <strong>con cuenta</strong>. El “+1” sobre la cabeza insinúa el punto que gana.',
      'La <strong>heladera</strong>, con sus comidas disponibles, de la A a la E.',
      'Las flechas 2 y 3 van a las comidas: elegir y reservar. El <strong>$</strong> es pagar.',
      'Y abajo, la novedad: casilleros <strong>prepagados por día</strong> (1d, 2d, 3d) que además suman <strong>puntos de lealtad</strong>.',
    ],
  },
  en: {
    title: 'The “IDEA!!!” whiteboard, redrawn',
    canvas: 'Whiteboard: a user with an account, a fridge with meals A to E and, below it, a row of prepaid day slots (1d, 2d, 3d) that add loyalty points',
    account: 'Account',
    fridge: 'fridge',
    available: 'available meals',
    prepaid: 'prepaid',
    menu: 'subscribed menu',
    loyalty: '+ loyalty points',
    presentK: 'the present:',
    present: 'choose and pay now',
    futureK: 'the committed future:',
    future: 'paid ahead, by day',
    caps: [
      'A user <strong>with an account</strong>. The “+1” over their head hints at the point they earn.',
      'The <strong>fridge</strong>, with its available meals, A to E.',
      'Arrows 2 and 3 go to the meals: choose and reserve. The <strong>$</strong> is paying.',
      'And below, the novelty: <strong>prepaid day slots</strong> (1d, 2d, 3d) that also add <strong>loyalty points</strong>.',
    ],
  },
});

const MEALS: { l: string; x: number; y: number }[] = [
  { l: 'A', x: 446, y: 124 },
  { l: 'B', x: 446, y: 192 },
  { l: 'C', x: 446, y: 260 },
  { l: 'D', x: 526, y: 124 },
  { l: 'E', x: 526, y: 192 },
];
const SLOTS = ['1d', '2d', '3d'];

export function Idea({ state = 'draw', reduced }: SceneProps) {
  const t = useT(IDEA);
  const rows = state === 'rows';
  const s = usePhases(4, { interval: 3200, reduced, key: state });
  const p = rows ? 3 : s.phase;
  const on = (i: number) => rows || p >= i;
  const fade = (i: number, dim = false) => ({ initial: false as const, animate: { opacity: on(i) ? (dim ? 0.35 : 1) : 0 }, transition: { duration: 0.45, ease: EASE } });
  return (
    <Frame
      title={t.title}
      legend={rows ? <Legend items={[{ tone: 'cmp', label: t.presentK.replace(':', '') }, { tone: 'accent', label: t.futureK.replace(':', '') }]} /> : undefined}
      foot={rows ? undefined : <Stepper phase={s.phase} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}
    >
      <Canvas w={960} h={500} label={t.canvas}>
        {(ids) => (
          <>
            <text x={36} y={58} className="c7-idea">IDEA!!!</text>

            {/* the user */}
            <motion.g {...fade(0)}>
              <text x={150} y={200} textAnchor="middle" className="c7-plus">+1</text>
              <circle cx={150} cy={234} r={20} className="c7-ink" />
              <path d="M150 254 L150 318 M116 276 L184 270 M150 318 L128 360 M150 318 L172 360" className="c7-ink" />
              <rect x={24} y={300} width={76} height={28} rx={4} className="c7-ink" />
              <text x={62} y={319} textAnchor="middle" className="c7-hand">{t.account}</text>
            </motion.g>

            {/* the fridge */}
            <motion.g {...fade(1)}>
              <rect x={410} y={100} width={330} height={230} rx={10} className={`c7-box ${rows ? 'c7-box--now' : ''}`} />
              {MEALS.map((m) => (
                <g key={m.l}>
                  <rect x={m.x} y={m.y} width={54} height={54} rx={6} className={`c7-meal ${rows ? 'c7-meal--now' : ''}`} />
                  <text x={m.x + 27} y={m.y + 34} textAnchor="middle" className="c7-slot-t">{m.l}</text>
                </g>
              ))}
              <Label x={724} y={316} anchor="end">{t.fridge}</Label>
              <Label x={756} y={146} anchor="start">{t.available}</Label>
            </motion.g>

            {/* the arrows to the fridge */}
            <motion.g {...fade(2, rows)}>
              <Edge points={[[192, 262], [442, 152]]} marker={ids.arrow} show={on(2)} />
              <Edge points={[[192, 280], [442, 218]]} marker={ids.arrow} show={on(2)} />
              <text x={300} y={196} className="c7-hand c7-hand--n">2</text>
              <text x={318} y={240} className="c7-hand c7-hand--n">3</text>
              <text x={322} y={282} className="c7-hand c7-hand--n">$</text>
            </motion.g>

            {/* the prepaid row */}
            <motion.g {...fade(3)}>
              <rect x={410} y={370} width={330} height={96} rx={10} className={`c7-box ${rows ? 'c7-box--future' : ''}`} />
              <text x={428} y={393} className="c7-hand">{t.loyalty}</text>
              {SLOTS.map((sl, i) => (
                <g key={sl}>
                  <rect x={430 + i * 90} y={404} width={70} height={48} rx={6} className={`c7-meal ${rows ? 'c7-meal--future' : 'c7-meal--pre'}`} />
                  <text x={465 + i * 90} y={434} textAnchor="middle" className="c7-slot-t">{sl}</text>
                </g>
              ))}
              <text x={702} y={434} className="c7-slot-t">…</text>
              <Label x={756} y={420} anchor="start">{t.prepaid}</Label>
              <Label x={575} y={488}>{t.menu}</Label>
            </motion.g>
            <motion.g {...fade(3, rows)}>
              <Edge points={[[184, 334], [426, 424]]} marker={ids.arrow} show={on(3)} />
              <text x={292} y={364} className="c7-hand c7-hand--n">1</text>
            </motion.g>

            {/* the two rows, read as present and future */}
            <motion.g initial={false} animate={{ opacity: rows ? 1 : 0 }} transition={{ duration: 0.4, delay: rows ? 0.3 : 0 }}>
              <Label x={756} y={178} anchor="start" tone="cmp">{t.presentK}</Label>
              <Label x={756} y={198} anchor="start" tone="text" size={13}>{t.present}</Label>
              <Label x={756} y={446} anchor="start" tone="accent">{t.futureK}</Label>
              <Label x={756} y={466} anchor="start" tone="text" size={13}>{t.future}</Label>
            </motion.g>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── trade-off: orders up front, or a schedule ───────────────────────── */
const TRADE = defineStrings({
  es: {
    titleAsk: 'Un suscriptor prepaga cuatro semanas',
    titleCmp: 'Dos maneras de guardar el futuro',
    canvasAsk: 'Un suscriptor prepagó cuatro semanas de almuerzos: veinte casilleros de lunes a viernes, cada uno una orden futura con un signo de pregunta',
    canvasCmp: 'Comparación: a la izquierda, las veinte órdenes creadas de antemano; a la derecha, un menú que genera cada día la orden de hoy, marcada como prepagada',
    sub: 'Suscriptor',
    subSub: 'prepagó 4 semanas',
    days: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi'],
    week: (n: number) => `S${n}`,
    lunches: '20 almuerzos prepagados · ejemplo',
    q: '¿Dónde viven hasta que llega su día?',
    aTitle: 'A · Crear todas las órdenes ya',
    bTitle: 'B · Generarlas cada día desde el menú',
    choice: 'la elección del equipo',
    aIdle: '20 órdenes ya en la base',
    aChanged: '15 órdenes que cazar y reescribir',
    aPro: '+ procesar es simple: todo existe',
    aCon: '− infla la base; cada cambio, muchas escrituras',
    menu: 'Menú',
    menuSub: 'estructura lógica',
    menuNew: 'menú cambiado',
    morning: 'cada mañana',
    today: 'Orden de hoy',
    todaySub: 'sale del menú',
    prepaid: 'prepagada',
    bIdle: 'una sola cosa que mantener',
    bChanged: '1 cambio: el menú',
    bPro: '+ cambiar o cancelar toca una sola cosa',
    bCon: '− hay que marcar las órdenes prepagadas',
    change: 'Cambiar el menú desde la semana 2',
    reset: 'Volver',
  },
  en: {
    titleAsk: 'A subscriber prepays four weeks',
    titleCmp: 'Two ways to store the future',
    canvasAsk: 'A subscriber prepaid four weeks of lunches: twenty weekday slots, each one a future order with a question mark',
    canvasCmp: 'Comparison: on the left, the twenty orders created up front; on the right, a menu that generates today’s order every day, marked as prepaid',
    sub: 'Subscriber',
    subSub: 'prepaid 4 weeks',
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr'],
    week: (n: number) => `W${n}`,
    lunches: '20 prepaid lunches · example',
    q: 'Where do they live until their day?',
    aTitle: 'A · Create every order now',
    bTitle: 'B · Generate each day from the menu',
    choice: 'the team’s choice',
    aIdle: '20 orders already in the database',
    aChanged: '15 orders to hunt down and rewrite',
    aPro: '+ simple to process: everything exists',
    aCon: '− bloats the base; every change, many writes',
    menu: 'Menu',
    menuSub: 'a logical structure',
    menuNew: 'menu changed',
    morning: 'every morning',
    today: 'Today’s order',
    todaySub: 'comes from the menu',
    prepaid: 'prepaid',
    bIdle: 'one thing to maintain',
    bChanged: '1 change: the menu',
    bPro: '+ changing or canceling touches one thing',
    bCon: '− orders must be marked as prepaid',
    change: 'Change the menu from week 2',
    reset: 'Undo',
  },
});

export function Tradeoff({ state = 'ask', reduced }: SceneProps) {
  const t = useT(TRADE);
  const ask = state === 'ask';
  const [changed, setChanged] = useState(false);
  useEffect(() => setChanged(false), [state]);
  const cells = Array.from({ length: 20 }, (_, i) => ({ r: Math.floor(i / 5), c: i % 5, i }));
  return (
    <Frame
      title={ask ? t.titleAsk : t.titleCmp}
      foot={ask ? undefined : (
        <button type="button" className={`play-btn ${changed ? '' : 'play-btn--primary'}`} onClick={() => setChanged(!changed)}>
          {changed ? <RotateCcw size={14} aria-hidden /> : <Pencil size={14} aria-hidden />} {changed ? t.reset : t.change}
        </button>
      )}
    >
      <Canvas w={960} h={480} label={ask ? t.canvasAsk : t.canvasCmp}>
        {(ids) => ask ? (
          <>
            <Node x={150} y={255} w={210} h={64} kind="core" icon={CalendarCheck} label={t.sub} sub={t.subSub} />
            <Edge points={[[257, 255], [392, 255]]} tone="accent" marker={ids.arrowAccent} />
            <Label x={620} y={100}>{t.lunches}</Label>
            {t.days.map((d, c) => <Label key={d} x={472 + c * 74} y={138} size={10}>{d}</Label>)}
            {[1, 2, 3, 4].map((w) => <Label key={w} x={428} y={178 + (w - 1) * 50} anchor="end" size={10}>{t.week(w)}</Label>)}
            {cells.map(({ r, c, i }) => (
              <motion.g key={i} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.03 * i, duration: 0.3 }}>
                <rect x={440 + c * 74} y={154 + r * 50} width={64} height={40} rx={8} className="c7-cell c7-cell--q" />
                <text x={472 + c * 74} y={179 + r * 50} textAnchor="middle" className="c7-cell-t">?</text>
              </motion.g>
            ))}
            <Label x={620} y={390} tone="text" size={16}>{t.q}</Label>
          </>
        ) : (
          <>
            {/* A: every order up front */}
            <rect x={14} y={20} width={452} height={440} rx={16} className="zone" />
            <Label x={36} y={52} anchor="start" tone="text" size={15}>{t.aTitle}</Label>
            {t.days.map((d, c) => <Label key={d} x={112 + c * 66} y={90} size={10}>{d}</Label>)}
            {[1, 2, 3, 4].map((w) => <Label key={w} x={68} y={121 + (w - 1) * 44} anchor="end" size={10}>{t.week(w)}</Label>)}
            {cells.map(({ r, c, i }) => {
              const hit = changed && r >= 1;
              return (
                <g key={i}>
                  <rect x={82 + c * 66} y={100 + r * 44} width={58} height={34} rx={7} className={`c7-cell ${hit ? 'c7-cell--hit' : 'c7-cell--order'}`} />
                  <text x={111 + c * 66} y={122 + r * 44} textAnchor="middle" className="c7-cell-t c7-cell-t--s">{hit ? '✎' : `#${i + 1}`}</text>
                </g>
              );
            })}
            <Label x={240} y={384} tone={changed ? 'danger' : 'muted'} size={12}>{changed ? t.aChanged : t.aIdle}</Label>
            <Label x={36} y={414} anchor="start" tone="text" size={13}>{t.aPro}</Label>
            <Label x={36} y={438} anchor="start" tone="text" size={13}>{t.aCon}</Label>

            {/* B: a schedule that generates each day */}
            <rect x={494} y={20} width={452} height={440} rx={16} className="zone zone--accent" />
            <Label x={516} y={52} anchor="start" tone="text" size={15}>{t.bTitle}</Label>
            <Label x={924} y={80} anchor="end" tone="accent" size={10}>{t.choice}</Label>
            <Node x={720} y={146} w={250} h={96} kind="core" icon={CalendarDays} label={t.menu} sub={changed ? t.menuNew : t.menuSub} highlight={changed} labelTop>
              <foreignObject x={16} y={60} width={218} height={28}>
                <div className="c7-menu-days">
                  {t.days.map((d) => <span key={d} className={changed ? 'is-new' : ''}>{d}</span>)}
                </div>
              </foreignObject>
            </Node>
            <Edge points={[[720, 194], [720, 252]]} tone="cmd" marker={ids.arrowCmd} />
            <Label x={736} y={228} anchor="start" tone="cmd" size={10}>{t.morning}</Label>
            <Packet reduced={reduced} tone="cmd" points={[[720, 194], [720, 254]]} w={14} duration={1} repeat repeatDelay={2} />
            <Node x={720} y={284} w={250} h={60} kind="cmp" icon={Inbox} label={t.today} sub={t.todaySub} />
            <rect x={670} y={326} width={100} height={24} rx={12} className="pk pk--accent" />
            <text x={720} y={342.5} textAnchor="middle" className="pk-t c7-on-accent">{t.prepaid}</text>
            <Label x={720} y={384} tone={changed ? 'evt' : 'muted'} size={12}>{changed ? t.bChanged : t.bIdle}</Label>
            <Label x={516} y={414} anchor="start" tone="text" size={13}>{t.bPro}</Label>
            <Label x={516} y={438} anchor="start" tone="text" size={13}>{t.bCon}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── cycle: from calendar to fridge ───────────────────────── */
type CycleState = 'morning' | 'dispatch' | 'fridge';
const LEVEL: Record<CycleState, number> = { morning: 0, dispatch: 1, fridge: 2 };

const CYCLE = defineStrings({
  es: {
    title: 'Preparar las órdenes programadas',
    cmd: 'Comando',
    evt: 'Evento',
    cmp: 'Módulo',
    ext: 'Sistema externo',
    canvas: {
      morning: 'Cada mañana el planificador pide las órdenes programadas del día a la orden del sistema, que responde desde una proyección, y le manda a la cocina fantasma la lista de lo que debe preparar',
      dispatch: 'La cocina despacha y publica OrderDispatched: lo escuchan el catálogo, el reporting, la orden del sistema y el usuario',
      fridge: 'La heladera confirma OrderPlacedInFridge a la orden del sistema, y recién entonces la orden emite OrderAvailableForPicking hacia el usuario, con su PIN',
    } as Record<CycleState, string>,
    user: 'Usuario',
    catalog: 'Catálogo',
    reporting: 'Reporting',
    order: 'Orden del sistema',
    kitchen: 'Cocina fantasma',
    fridge: 'Heladera',
    schedule: 'Planificador',
    projection: 'lee una proyección',
    daily: 'una vez por día',
    pin: 'aviso + PIN',
  },
  en: {
    title: 'Preparing scheduled orders',
    cmd: 'Command',
    evt: 'Event',
    cmp: 'Module',
    ext: 'External system',
    canvas: {
      morning: 'Every morning the scheduler asks the system order for today’s scheduled orders, answered from a projection, and sends the ghost kitchen the list of what to prepare',
      dispatch: 'The kitchen dispatches and publishes OrderDispatched: the catalog, reporting, the system order and the user all listen',
      fridge: 'The fridge confirms OrderPlacedInFridge to the system order, and only then does the order emit OrderAvailableForPicking to the user, with their PIN',
    },
    user: 'User',
    catalog: 'Catalog',
    reporting: 'Reporting',
    order: 'System Order',
    kitchen: 'Ghost Kitchen',
    fridge: 'SmartFridge',
    schedule: 'Schedule',
    projection: 'reads a projection',
    daily: 'once a day',
    pin: 'notice + PIN',
  },
});

/* routes, drawn edge to edge */
const R = {
  schToM1: [[440, 462], [440, 412]] as Pt[],
  m1ToSo: [[440, 370], [440, 320]] as Pt[],
  schToM2: [[531, 490], [613, 490]] as Pt[],
  m2ToGk: [[787, 490], [860, 490], [860, 320]] as Pt[],
  gkToM3: [[860, 262], [860, 170], [777, 170]] as Pt[],
  m3ToCat: [[640, 150], [640, 56], [527, 56]] as Pt[],
  m3ToRep: [[740, 150], [740, 56], [773, 56]] as Pt[],
  m3ToSo: [[680, 190], [680, 290], [552, 290]] as Pt[],
  m3ToUser: [[600, 150], [600, 112], [300, 112], [300, 56], [237, 56]] as Pt[],
  frToM4: [[150, 462], [150, 412]] as Pt[],
  m4ToSo: [[262, 390], [290, 390], [290, 302], [328, 302]] as Pt[],
  soToM5: [[330, 274], [200, 274], [200, 192]] as Pt[],
  m5ToUser: [[150, 148], [150, 86]] as Pt[],
};

export function Cycle({ state = 'morning', reduced }: SceneProps) {
  const t = useT(CYCLE);
  const st = (state in LEVEL ? state : 'morning') as CycleState;
  const lv = LEVEL[st];
  const act = (...levels: number[]) => levels.includes(lv);
  // a message group: visible from its level on, muted once the story has moved past it
  const grp = (from: number) => ({ initial: false as const, animate: { opacity: lv < from ? 0 : lv === from ? 1 : 0.4 }, transition: { duration: 0.45, ease: EASE } });
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'cmd', label: t.cmd }, { tone: 'evt', label: t.evt }, { tone: 'cmp', label: t.cmp }, { tone: 'ext', label: t.ext }]} />}
    >
      <Canvas w={1000} h={540} label={t.canvas[st]}>
        {(ids) => (
          <>
            {/* 1 + 2: the morning */}
            <motion.g {...grp(0)}>
              <Edge points={R.schToM1} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={R.m1ToSo} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={R.schToM2} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={R.m2ToGk} tone="cmd" marker={ids.arrowCmd} />
              <Node x={440} y={390} w={236} h={40} kind="cmd" label="GetScheduledOrders (1)" />
              <Node x={700} y={490} w={174} h={40} kind="cmd" label="PrepareOrders (2)" />
              <Label x={568} y={394} anchor="start" tone="cmd" size={10}>{t.projection}</Label>
              <Label x={700} y={530} tone="cmd" size={10}>{t.daily}</Label>
            </motion.g>
            {/* 3: dispatched */}
            <motion.g {...grp(1)}>
              <Edge points={R.gkToM3} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.m3ToCat} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.m3ToRep} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.m3ToSo} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.m3ToUser} tone="evt" marker={ids.arrowEvt} />
              <Node x={680} y={170} w={196} h={40} kind="evt" label="OrderDispatched (3)" />
            </motion.g>
            {/* 4 + 5: the fridge */}
            <motion.g {...grp(2)}>
              <Edge points={R.frToM4} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.m4ToSo} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.soToM5} tone="evt" marker={ids.arrowEvt} />
              <Edge points={R.m5ToUser} tone="evt" marker={ids.arrowEvt} />
              <Node x={150} y={390} w={224} h={40} kind="evt" label="OrderPlacedInFridge (4)" />
              <Node x={150} y={170} w={260} h={40} kind="evt" label="OrderAvailableForPicking (5)" />
              <Label x={164} y={126} anchor="start" tone="evt" size={10}>{t.pin}</Label>
            </motion.g>

            {/* packets of the current part of the story */}
            {st === 'morning' && (
              <g key="pk-morning">
                <Packet reduced={reduced} tone="cmd" points={R.schToM1} w={14} duration={0.8} repeat repeatDelay={3} />
                <Packet reduced={reduced} tone="cmd" points={R.m1ToSo} w={14} duration={0.8} delay={0.8} repeat repeatDelay={3} />
                <Packet reduced={reduced} tone="cmd" points={R.schToM2} w={14} duration={0.8} delay={1.8} repeat repeatDelay={3} />
                <Packet reduced={reduced} tone="cmd" points={R.m2ToGk} w={14} duration={1.2} delay={2.6} repeat repeatDelay={2.6} />
              </g>
            )}
            {st === 'dispatch' && (
              <g key="pk-dispatch">
                <Packet reduced={reduced} tone="evt" points={R.gkToM3} w={14} duration={1.2} repeat repeatDelay={2.4} />
                {[R.m3ToCat, R.m3ToRep, R.m3ToSo, R.m3ToUser].map((r, i) => (
                  <Packet key={i} reduced={reduced} tone="evt" points={r} w={14} duration={1.4} delay={1.3} repeat repeatDelay={2.2} />
                ))}
              </g>
            )}
            {st === 'fridge' && (
              <g key="pk-fridge">
                <Packet reduced={reduced} tone="evt" points={R.frToM4} w={14} duration={0.8} repeat repeatDelay={3.4} />
                <Packet reduced={reduced} tone="evt" points={R.m4ToSo} w={14} duration={1} delay={0.9} repeat repeatDelay={3.2} />
                <Packet reduced={reduced} tone="evt" points={R.soToM5} w={14} duration={1} delay={2.1} repeat repeatDelay={3.2} />
                <Packet reduced={reduced} tone="evt" points={R.m5ToUser} w={14} duration={0.8} delay={3.1} repeat repeatDelay={3.4} />
              </g>
            )}

            {/* participants */}
            <Node x={150} y={56} w={170} h={56} icon={Smartphone} label={t.user} dim={!act(1, 2)} highlight={lv === 2} />
            <Node x={440} y={56} w={170} h={56} kind="cmp" icon={BookOpen} label={t.catalog} dim={!act(1)} />
            <Node x={860} y={56} w={170} h={56} kind="cmp" icon={ChartColumn} label={t.reporting} dim={!act(1)} />
            <Node x={440} y={290} w={220} h={56} kind="cmp" icon={Inbox} label={t.order} dim={false} />
            <Node x={860} y={290} w={200} h={56} kind="ext" icon={ChefHat} label={t.kitchen} dim={!act(0, 1)} highlight={lv === 1} />
            <Node x={150} y={490} w={180} h={56} kind="ext" icon={Refrigerator} label={t.fridge} dim={!act(2)} highlight={lv === 2} />
            <Node x={440} y={490} w={180} h={56} kind="cmp" icon={CalendarDays} label={t.schedule} dim={!act(0)} highlight={lv === 0} />
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── vocabulary: four words from the kitchen ───────────────────────── */
const VOCAB = defineStrings({
  es: {
    title: 'El vocabulario de la cocina',
    cmd: 'Comando',
    evt: 'Respuesta de la cocina',
    ext: 'Sistema externo',
    canvas: 'La cocina fantasma recibe PrepareOrders cada mañana y responde con cuatro palabras: aceptado, despachado, no puedo y demorado',
    kitchen: 'Cocina fantasma',
    kitchenSub: 'su propio sistema',
    morning: 'cada mañana',
    not247: 'no trabaja 24/7:',
    not247b: 'cocina lo que llega al',
    not247c: 'empezar su día',
    words: [
      { w: 'aceptado', a: 'Confirma que recibió la lista del día.', b: '' },
      { w: 'despachado', a: 'Se vuelve el evento OrderDispatched:', b: 'la comida sale hacia las heladeras.' },
      { w: 'no puedo', a: 'Un riesgo que el equipo anotó: el menú', b: 'de un suscriptor que no se puede preparar.' },
      { w: 'demorado', a: 'Los suscriptores pidieron enterarse', b: 'de la comida que llega o se demora.' },
    ],
  },
  en: {
    title: 'The kitchen’s vocabulary',
    cmd: 'Command',
    evt: 'Kitchen’s answer',
    ext: 'External system',
    canvas: 'The ghost kitchen receives PrepareOrders every morning and answers with four words: accepted, dispatched, can’t do and delayed',
    kitchen: 'Ghost Kitchen',
    kitchenSub: 'its own system',
    morning: 'every morning',
    not247: 'not open 24/7:',
    not247b: 'cooks what arrives at',
    not247c: 'the start of its day',
    words: [
      { w: 'accepted', a: 'Confirms it received the day’s list.', b: '' },
      { w: 'dispatched', a: 'Becomes the event OrderDispatched:', b: 'the food leaves for the fridges.' },
      { w: 'can’t do', a: 'A risk the team wrote down: a subscriber’s', b: 'menu that can’t be prepared.' },
      { w: 'delayed', a: 'Subscribers asked to hear about food', b: 'that is arriving or running late.' },
    ],
  },
});

const WORD_Y = [96, 196, 296, 396];

export function Vocab({ reduced }: SceneProps) {
  const t = useT(VOCAB);
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'cmd', label: t.cmd }, { tone: 'evt', label: t.evt }, { tone: 'ext', label: t.ext }]} />}>
      <Canvas w={960} h={480} label={t.canvas}>
        {(ids) => (
          <>
            <Node x={160} y={60} w={180} h={40} kind="cmd" label="PrepareOrders" />
            <Edge points={[[160, 80], [160, 204]]} tone="cmd" marker={ids.arrowCmd} />
            <Label x={176} y={146} anchor="start" tone="cmd" size={10}>{t.morning}</Label>
            <Packet reduced={reduced} tone="cmd" points={[[160, 80], [160, 206]]} w={14} duration={1} repeat repeatDelay={3.2} />
            {WORD_Y.map((y, i) => (
              <Edge key={i} points={[[270, 246], [320, 246], [320, y], [383, y]]} tone="evt" marker={ids.arrowEvt} delay={0.2 + i * 0.12} />
            ))}
            <Packet reduced={reduced} tone="evt" points={[[270, 246], [320, 246], [320, 196], [385, 196]]} w={14} duration={1} delay={1.2} repeat repeatDelay={3.2} />
            <Node x={160} y={246} w={220} h={80} kind="ext" icon={ChefHat} label={t.kitchen} sub={t.kitchenSub} />
            <Label x={160} y={322} tone="muted" size={10}>{t.not247}</Label>
            <Label x={160} y={344} tone="text" size={13}>{t.not247b}</Label>
            <Label x={160} y={362} tone="text" size={13}>{t.not247c}</Label>
            {t.words.map((wd, i) => {
              const y = WORD_Y[i];
              const key = i === 1;
              return (
                <motion.g key={i} initial={{ opacity: 0, x: reduced ? 0 : -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : 0.3 + i * 0.15, duration: 0.4, ease: EASE }}>
                  <Node x={470} y={y} w={170} h={48} kind="evt" label={wd.w} highlight={key} />
                  <Label x={580} y={wd.b ? y - 4 : y + 5} anchor="start" tone="text" size={13.5}>{wd.a}</Label>
                  {wd.b && <Label x={580} y={y + 16} anchor="start" tone="text" size={13.5}>{wd.b}</Label>}
                </motion.g>
              );
            })}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── cancel: a scheduled order, with refund ───────────────────────── */
const CANCEL = defineStrings({
  es: {
    title: 'Cancelar una orden programada',
    cmd: 'Comando',
    evt: 'Evento',
    ext: 'Sistema externo',
    canvasAsk: 'La app, del lado del cliente, envía Get Scheduled Orders y Cancel Order by User a la orden del sistema. Del lado del servidor esperan el catálogo, el reporting y el proveedor de pagos',
    canvasFlow: 'La app pide sus órdenes programadas y cancela una. La orden del sistema emite MealStockCanceled hacia el reporting y ClaimRefund hacia pagos; pagos responde RefundSuccessful a la app. Al catálogo no le llega nada',
    client: 'cliente',
    server: 'servidor',
    app: 'App',
    order: 'Orden del sistema',
    catalog: 'Catálogo',
    reporting: 'Reporting',
    payment: 'Pagos',
    who: '¿quién tiene que enterarse?',
    noEvent: 'ningún evento llega',
    caps: [
      '<strong>1 · Consulta.</strong> La app pide las órdenes programadas: no se puede cancelar lo que no se ve.',
      '<strong>2 · Comando.</strong> El suscriptor cancela una orden. El pedido cruza del cliente al servidor.',
      '<strong>3 · Dos cosas en paralelo.</strong> El evento <span class="tok tok--evt">MealStockCanceled</span> va al reporting y el comando <span class="tok tok--cmd">ClaimRefund</span> viaja a pagos.',
      '<strong>4 · Evento.</strong> Pagos cierra la conversación: <span class="tok tok--evt">RefundSuccessful</span> vuelve hasta la app. La plata, confirmada.',
    ],
  },
  en: {
    title: 'Canceling a scheduled order',
    cmd: 'Command',
    evt: 'Event',
    ext: 'External system',
    canvasAsk: 'The app, on the client side, sends Get Scheduled Orders and Cancel Order by User to the system order. On the server side, the catalog, reporting and the payment provider wait',
    canvasFlow: 'The app asks for its scheduled orders and cancels one. The system order emits MealStockCanceled to reporting and ClaimRefund to payment; payment answers RefundSuccessful to the app. Nothing reaches the catalog',
    client: 'client',
    server: 'server',
    app: 'App',
    order: 'System Order',
    catalog: 'Catalog',
    reporting: 'Reporting',
    payment: 'Payment',
    who: 'who needs to hear about it?',
    noEvent: 'no event reaches it',
    caps: [
      '<strong>1 · Query.</strong> The app asks for the scheduled orders: you can’t cancel what you can’t see.',
      '<strong>2 · Command.</strong> The subscriber cancels an order. The request crosses from client to server.',
      '<strong>3 · Two things in parallel.</strong> The event <span class="tok tok--evt">MealStockCanceled</span> goes to reporting and the command <span class="tok tok--cmd">ClaimRefund</span> travels to payment.',
      '<strong>4 · Event.</strong> Payment closes the conversation: <span class="tok tok--evt">RefundSuccessful</span> travels all the way back to the app. The money, confirmed.',
    ],
  },
});

const C = {
  appToGso: [[150, 240], [180, 240], [180, 190], [213, 190]] as Pt[],
  appToCou: [[150, 262], [180, 262], [180, 310], [213, 310]] as Pt[],
  gsoToSo: [[417, 190], [540, 190], [540, 216]] as Pt[],
  couToSo: [[417, 310], [540, 310], [540, 284]] as Pt[],
  soToCr: [[610, 218], [610, 160], [693, 160]] as Pt[],
  soToMsc: [[642, 258], [678, 258]] as Pt[],
  mscToRep: [[840, 282], [840, 455], [627, 455]] as Pt[],
  crToPay: [[847, 160], [940, 160], [940, 141]] as Pt[],
  payToRs: [[940, 81], [940, 60], [862, 60]] as Pt[],
  rsToApp: [[678, 60], [85, 60], [85, 216]] as Pt[],
};

export function Cancel({ state = 'ask', reduced }: SceneProps) {
  const t = useT(CANCEL);
  const flow = state === 'flow';
  const s = usePhases(4, { interval: 3400, reduced, key: state, auto: flow });
  const p = flow ? s.phase : -1;
  const on = (i: number) => flow && p >= i;
  const g = (i: number, always = false) => ({ initial: false as const, animate: { opacity: always || on(i) ? (flow && p !== i ? 0.5 : 1) : 0 }, transition: { duration: 0.4, ease: EASE } });
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'cmd', label: t.cmd }, { tone: 'evt', label: t.evt }, { tone: 'ext', label: t.ext }]} />}
      foot={flow ? <Stepper phase={s.phase} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} /> : undefined}
    >
      <Canvas w={1020} h={500} label={flow ? t.canvasFlow : t.canvasAsk}>
        {(ids) => (
          <>
            <line x1={315} x2={315} y1={40} y2={490} stroke="var(--line-strong)" strokeWidth={1.5} strokeDasharray="4 6" />
            <Label x={303} y={30} anchor="end" size={10}>{t.client}</Label>
            <Label x={327} y={30} anchor="start" size={10}>{t.server}</Label>

            <motion.g {...g(0, !flow)}>
              <Edge points={C.appToGso} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={C.gsoToSo} tone="cmd" marker={ids.arrowCmd} />
              <Node x={315} y={190} w={204} h={44} kind="cmd" label="Get Scheduled Orders" />
            </motion.g>
            <motion.g {...g(1, !flow)}>
              <Edge points={C.appToCou} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={C.couToSo} tone="cmd" marker={ids.arrowCmd} />
              <Node x={315} y={310} w={204} h={44} kind="cmd" label="Cancel Order by User" />
            </motion.g>
            <motion.g {...g(2)}>
              <Edge points={C.soToCr} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={C.crToPay} tone="cmd" marker={ids.arrowCmd} />
              <Edge points={C.soToMsc} tone="evt" marker={ids.arrowEvt} />
              <Edge points={C.mscToRep} tone="evt" marker={ids.arrowEvt} />
              <Node x={770} y={160} w={150} h={40} kind="cmd" label="ClaimRefund" />
              <Node x={770} y={258} w={180} h={44} kind="evt" label="MealStockCanceled" />
            </motion.g>
            <motion.g {...g(3)}>
              <Edge points={C.payToRs} tone="evt" marker={ids.arrowEvt} />
              <Edge points={C.rsToApp} tone="evt" marker={ids.arrowEvt} />
              <Node x={770} y={60} w={180} h={40} kind="evt" label="RefundSuccessful" />
            </motion.g>

            {flow && !reduced && (
              <g key={`pk${p}`}>
                {p === 0 && <>
                  <Packet reduced={reduced} tone="cmd" points={C.appToGso} w={14} duration={0.8} />
                  <Packet reduced={reduced} tone="cmd" points={C.gsoToSo} w={14} duration={0.9} delay={0.8} />
                </>}
                {p === 1 && <>
                  <Packet reduced={reduced} tone="cmd" points={C.appToCou} w={14} duration={0.8} />
                  <Packet reduced={reduced} tone="cmd" points={C.couToSo} w={14} duration={0.9} delay={0.8} />
                </>}
                {p === 2 && <>
                  <Packet reduced={reduced} tone="cmd" points={C.soToCr} w={14} duration={0.8} />
                  <Packet reduced={reduced} tone="cmd" points={C.crToPay} w={14} duration={0.8} delay={0.8} />
                  <Packet reduced={reduced} tone="evt" points={C.soToMsc} w={14} duration={0.6} />
                  <Packet reduced={reduced} tone="evt" points={C.mscToRep} w={14} duration={1.2} delay={0.6} />
                </>}
                {p === 3 && <>
                  <Packet reduced={reduced} tone="evt" points={C.payToRs} w={14} duration={0.6} />
                  <Packet reduced={reduced} tone="evt" points={C.rsToApp} w={14} duration={2} delay={0.6} />
                </>}
              </g>
            )}

            <Node x={85} y={250} w={130} h={64} icon={Smartphone} label={t.app} highlight={p === 3} />
            <Node x={540} y={250} w={200} h={64} kind="cmp" icon={Inbox} label={t.order} highlight={p === 1 || p === 2} />
            <Node x={540} y={370} w={170} h={56} kind="cmp" icon={BookOpen} label={t.catalog} dim={flow && p >= 2} />
            <Node x={540} y={455} w={170} h={56} kind="cmp" icon={ChartColumn} label={t.reporting} highlight={p === 2} />
            <Node x={940} y={110} w={130} h={56} kind="ext" icon={CreditCard} label={t.payment} highlight={p === 2 || p === 3} />
            <Label x={780} y={262} tone="accent" size={12} show={!flow}>{t.who}</Label>
            <Label x={637} y={374} anchor="start" tone="muted" size={10} show={flow && p >= 2}>{t.noEvent}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── calendar: from the next business day ───────────────────────── */
const CAL = defineStrings({
  es: {
    title: 'Simulador · cancelar el menú',
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Lunes'],
    next: 'semana siguiente',
    pick: 'Cancelás el:',
    status: {
      done: 'ya retirada',
      today: 'ya preparada: sigue siendo tuya',
      canceled: 'cancelada · reembolso',
    },
    msg: (d: string, n: number, nextDay: string) =>
      `Cancelás el <strong>${d}</strong>: la vianda de ese día ya está hecha y no se cancela. Rige desde el día hábil siguiente, <strong>${nextDay}</strong>: ${n} ${n === 1 ? 'vianda cancelada' : 'viandas canceladas'} y un <span class="tok tok--cmd">ClaimRefund</span>.`,
    stock: 'Si la vianda preparada no se retira, ¿puede pasar al stock común? El equipo lo dejó como decisión del negocio.',
    risk: 'Riesgo anotado, de baja probabilidad: cocinas que preparan hasta 3 días antes.',
    lunch: 'almuerzo prepagado',
  },
  en: {
    title: 'Simulator · canceling the menu',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monday'],
    next: 'next week',
    pick: 'You cancel on:',
    status: {
      done: 'already picked up',
      today: 'already prepared: still yours',
      canceled: 'canceled · refund',
    },
    msg: (d: string, n: number, nextDay: string) =>
      `You cancel on <strong>${d}</strong>: that day’s meal is already made and isn’t canceled. It takes effect from the next business day, <strong>${nextDay}</strong>: ${n} ${n === 1 ? 'meal canceled' : 'meals canceled'} and one <span class="tok tok--cmd">ClaimRefund</span>.`,
    stock: 'If the prepared meal isn’t picked up, can it go to the common stock? The team left it as a business decision.',
    risk: 'Risk noted, low probability: kitchens preparing up to 3 days ahead.',
    lunch: 'prepaid lunch',
  },
});

export function Calendar({ reduced }: SceneProps) {
  const t = useT(CAL);
  const [d, setD] = useState(1);
  const status = (i: number) => (i < d ? 'done' : i === d ? 'today' : 'canceled') as keyof typeof t.status;
  const nextDay = d === 4 ? `${t.days[5]} (${t.next})` : t.days[d + 1];
  return (
    <Frame title={t.title}>
      <div className="c7-cal">
        <div className="c7-cal__week">
          {t.days.map((day, i) => {
            const st = status(i);
            return (
              <motion.div key={i} layout={!reduced} className={`c7-day is-${st} ${i === 5 ? 'is-next' : ''}`} transition={{ duration: 0.3, ease: EASE }}>
                <span className="c7-day__n">{day}</span>
                <span className="c7-day__w mono">{i === 5 ? t.next : ' '}</span>
                <span className="c7-day__meal"><ClipboardList size={15} aria-hidden /> {t.lunch}</span>
                <span className="c7-day__st">{t.status[st]}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="c7-cal__pick" role="group" aria-label={t.pick}>
          <span>{t.pick}</span>
          {t.days.slice(0, 5).map((day, i) => (
            <button key={i} type="button" className={`c7-chip ${i === d ? 'is-on' : ''}`} aria-pressed={i === d} onClick={() => setD(i)}>{day}</button>
          ))}
        </div>
        <div className="vcard c7-cal__out">
          <p aria-live="polite" dangerouslySetInnerHTML={{ __html: t.msg(t.days[d], 5 - d, nextDay) }} />
          <p className="c7-cal__note">{t.stock}</p>
          <p className="c7-cal__note">{t.risk}</p>
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────── recap: the same simple pieces ───────────────────────── */
const RECAP = defineStrings({
  es: {
    cards: [
      { k: 'La agenda', t: 'Un menú, no una pila de órdenes', h: 'Las órdenes de cada día salen del menú. Lo único extra: marcarlas como prepagadas.' },
      { k: 'Del calendario a la heladera', t: 'Tres eventos en cadena', h: '<span class="tok tok--evt">OrderDispatched</span> → <span class="tok tok--evt">OrderPlacedInFridge</span> → <span class="tok tok--evt">OrderAvailableForPicking</span>' },
      { k: 'La cocina', t: 'Un vocabulario de cuatro palabras', h: 'aceptado · despachado · no puedo · demorado' },
      { k: 'El arrepentimiento', t: 'Un reembolso es una conversación', h: '<span class="tok tok--cmd">ClaimRefund</span> pide la plata; <span class="tok tok--evt">RefundSuccessful</span> confirma que volvió.' },
    ],
    foot: 'Comandos que piden, eventos que informan: el mismo alfabeto que la compra instantánea.',
  },
  en: {
    cards: [
      { k: 'The schedule', t: 'A menu, not a pile of orders', h: 'Each day’s orders come out of the menu. The only extra: marking them as prepaid.' },
      { k: 'From calendar to fridge', t: 'Three chained events', h: '<span class="tok tok--evt">OrderDispatched</span> → <span class="tok tok--evt">OrderPlacedInFridge</span> → <span class="tok tok--evt">OrderAvailableForPicking</span>' },
      { k: 'The kitchen', t: 'A four-word vocabulary', h: 'accepted · dispatched · can’t do · delayed' },
      { k: 'Second thoughts', t: 'A refund is a conversation', h: '<span class="tok tok--cmd">ClaimRefund</span> asks for the money; <span class="tok tok--evt">RefundSuccessful</span> confirms it came back.' },
    ],
    foot: 'Commands that ask, events that report: the same alphabet as the instant purchase.',
  },
});

const RECAP_ICONS = [CalendarDays, Truck, ChefHat, Receipt];

export function Recap({ reduced }: SceneProps) {
  const t = useT(RECAP);
  return (
    <div className="c7-recap">
      <div className="c7-recap__grid">
        {t.cards.map((c, i) => {
          const Icon = RECAP_ICONS[i];
          return (
            <motion.article key={i} className="vcard c7-recap__card" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : i * 0.12, duration: 0.45, ease: EASE }}>
              <span className="c7-recap__icon" aria-hidden><Icon size={20} /></span>
              <p className="c7-recap__k mono">{c.k}</p>
              <h3>{c.t}</h3>
              <p className="c7-recap__h" dangerouslySetInnerHTML={{ __html: c.h }} />
            </motion.article>
          );
        })}
      </div>
      <p className="c7-recap__foot">{t.foot}</p>
    </div>
  );
}

/** Scenes of chapter 7, registered in ./index.ts through this map. */
export const SCENES7: Record<string, ComponentType<SceneProps>> = {
  'sub-ladder': Ladder,
  'sub-idea': Idea,
  'sub-tradeoff': Tradeoff,
  'sub-cycle': Cycle,
  'sub-vocab': Vocab,
  'sub-cancel': Cancel,
  'sub-calendar': Calendar,
  'sub-recap': Recap,
};
