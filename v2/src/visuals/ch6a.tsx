import { AnimatePresence, motion } from 'motion/react';
import {
  Smartphone, Refrigerator, Database, Lock, Split, Cpu, BookOpen, CreditCard, Building2, Inbox, Send,
  ShieldCheck, Ban, RotateCw, Users, Swords, Banknote, WifiOff, CloudRain,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  es: {
    /* problems */
    problems: [
      { k: 'Problema 1 · Contención', t: 'Dos personas, el último plato', r: 'Sin locks', rs: 'Un actor por heladera procesa sus órdenes de a una.' },
      { k: 'Problema 2 · Evidencia', t: 'Reclamos con dinero de por medio', r: 'Sin borrar nada', rs: 'Event sourcing, colas con confirmación y 30 segundos antes de cobrar.' },
      { k: 'Problema 3 · Autonomía', t: 'Heladeras sin señal', r: 'Sin depender de la nube', rs: 'PIN validado en la heladera y catálogo en el teléfono.' },
    ],
    renuncia: 'La renuncia',
    footRecap: 'Y el día nublado: cuando el hardware falla, un camino humano diseñado de antemano.',
    footIntro: 'Cada problema viene con la solución que el equipo diseñó. Al final, el patrón que comparten.',

    /* race */
    raceTitle: 'La tentación: bloquear el stock',
    raceLegendCmd: 'Comando: quiero comprar',
    raceLegendDanger: 'Espera / conflicto',
    raceCanvas: 'Dos clientes compran la última vianda al mismo tiempo; la base de datos bloquea a uno mientras atiende al otro',
    raceAnaSub: 'compra desde la app',
    raceBetoSub: 'en el mismo segundo',
    raceDb: 'Base de datos',
    raceDbSub: 'stock bloqueado',
    raceFridge: 'Heladera del gimnasio',
    raceFridgeSub: 'queda 1 lasaña',
    racePkBuy: 'comprar',
    racePkWait: 'espera…',
    raceQuote: '“Nadie toca el stock mientras yo compro”',
    raceNote: 'cada compra espera a la anterior',

    /* actors */
    queue: 'cola',
    serialCaptions: [
      'En la cola de la heladera A esperan dos órdenes por la <strong>última lasaña</strong>: Ana llegó primero, Beto después.',
      'El actor toma la orden de Ana. Nadie más toca ese stock mientras tanto: no porque esté bloqueado, sino porque <strong>no hay nadie más</strong>.',
      'Stock en memoria: 1 → 0. La orden de Ana sigue hacia el pago.',
      'Recién entonces toma la orden de Beto: stock 0. Beto recibe un <strong>agotado</strong> limpio, sin conflicto ni reintento.',
    ],
    actorsTitleSerial: 'Dentro de una sola heladera',
    actorsTitleBroadcast: 'Dos salidas por cada orden',
    actorsTitleRoute: 'Un actor por heladera',
    legendCmd: 'Comando',
    legendEvt: 'Evento',
    legendCmp: 'Componente con estado',
    actorsCanvas: 'Clientes de tres ubicaciones envían órdenes a un router, que las reparte en una cola por heladera; cada heladera tiene su propio actor',
    clients: (k: string) => `Clientes ${k}`,
    routerSub: 'lee la ubicación',
    actor: (k: string) => `Actor ${k}`,
    lasagna: (n: number) => `lasaña: ${n}`,
    stockInMemory: 'stock en memoria',
    orderK: (k: string) => `orden ${k}`,
    anaBought: 'Ana: comprada ✓',
    betoSoldOut: 'Beto: agotado',
    oneLine: 'una fila por heladera = cero escrituras simultáneas',
    catalog: 'Catálogo',
    payment: 'Pago',
    catalogUpdated: 'catálogo actualizado · para todos los clientes',
    pkOrder: 'orden',

    /* venue */
    fridgeIds: ['H1', 'H2', 'H3'],
    venuePlace: 'Un gimnasio',
    venueTag: 'ejemplo · 1 local, 3 heladeras',
    venueUnit: 'viandas',
    venueShows: 'La app muestra el local:',
    venueSum: '¿12?',
    venueWho: '¿Quién hace la suma? La API de Byte no la garantizaba.',
    venueTotalK: 'Si la API reporta el total',
    venueTotalCode: '{ "heladera": "H2", "disponibles": 7 }',
    venueTotalT: 'Cada mensaje se sostiene solo: si uno se pierde, el siguiente corrige el número.',
    venueDeltaK: 'Si reporta solo el delta',
    venueDeltaCode: '{ "heladera": "H2", "cambio": -1 }',
    venueDeltaT: 'Hay que acumular cada cambio: un mensaje perdido deja el stock desfasado.',
    venueQ: <>La pregunta del equipo al proveedor, textual: <em>“¿el total de comidas disponibles o solo el delta del último cambio? Esperamos que sea el total.”</em></>,

    /* ledger */
    ledger: [
      { state: 'CREADA', ev: 'Orden confirmada' },
      { state: 'RESERVADA', ev: 'Stock reservado' },
      { state: 'PAGADA', ev: 'Pago confirmado' },
    ],
    ledgerTitle: 'La misma orden, guardada de dos maneras',
    ledgerCap0: <>La orden avanza. A la izquierda, cada cambio <strong>pisa</strong> al anterior. A la derecha, cada cambio se <strong>agrega</strong> como un hecho nuevo.</>,
    ledgerCap3: <>Llega un reclamo: “me cobraron y nunca retiré mi comida”.</>,
    ledgerCap4: <>Solo el registro de eventos puede responder qué pasó y cuándo. <strong>El estado actual se reconstruye repasando la historia</strong>, como un libro contable escrito en tinta.</>,
    ledgerTable: 'Tabla tradicional',
    ledgerOrder: 'Orden #481',
    ledgerStatus: 'estado:',
    ledgerTableNote: 'Un solo casillero que se reescribe.',
    ledgerBad: '“Está PAGADA.” ¿Desde cuándo? ¿Qué pasó antes? No queda rastro.',
    ledgerLog: 'Registro de eventos (event store)',
    ledgerLogNote: 'Nada se borra: cada hecho queda escrito, en orden.',
    ledgerGood: 'Reservada 12:03:11, pagada 12:03:41, ningún retiro registrado: el reclamo se resuelve con evidencia.',
    ledgerClaim: 'Reclamo · “me cobraron y nunca retiré mi comida”',

    /* ack queue */
    ackCaptions: [
      'La orden decide cobrar y deja un mensaje en la cola: <strong>“cobrá la orden #481”</strong>, con un identificador único.',
      'La cola lo entrega al servicio de pagos. Mientras no reciba confirmación, <strong>no lo borra</strong>: si algo se cae, lo vuelve a entregar.',
      'Pagos procesa el cobro con la pasarela.',
      'Pagos confirma el recibo (<strong>ack</strong>). Recién ahora la cola descarta el mensaje: no se perdió.',
      'Un reintento tardío entrega el <strong>mismo</strong> mensaje otra vez. Pasa en cualquier red.',
      'Pagos ve un identificador ya procesado y lo descarta sin efecto: <strong>no se cobra doble</strong>.',
    ],
    ackTitle: 'El mensaje que no se puede perder ni duplicar',
    ackLegendAck: 'Confirmación',
    ackCanvas: 'Una orden envía un mensaje de cobro por una cola con confirmación de recibo; un duplicado se descarta por su identificador',
    ackOrder: 'Orden',
    ackOrderSub: 'decide cobrar',
    ackQueue: 'Cola de mensajes',
    ackQueueSub: 'RabbitMQ administrado',
    ackPay: 'Servicio de pagos',
    ackPaySub: 'recuerda ids procesados',
    gateway: 'Pasarela',
    ackHeld: 'retenido hasta el ack',
    ackPkCharge: 'cobrar #481',
    ackPkCobro: 'cobro',
    ackPkAgain: 'a7f3 (otra vez)',
    ackDup: 'id a7f3 ya procesado · descartado',
    ackOne: '1 cobro, no 2',
    ackRule: 'Entrega “al menos una vez” + identificador único = ni perdido ni duplicado',

    /* refused */
    refCaptions: [
      'La orden tiene stock reservado y espera el cobro.',
      'La pasarela <strong>rechaza</strong> el cargo, o el intento expira.',
      'El stock reservado vuelve solo al catálogo: <span class="tok tok--evt">MealStockCanceled</span>.',
      'El usuario recibe el aviso de rechazo, que también alimenta los reportes: <span class="tok tok--evt">OrderPurchaseRefused</span>.',
      'Como el historial vive ~1 mes en el teléfono, el rechazo se vuelve un botón: <strong>reintentar la última orden</strong> con un toque.',
    ],
    refTitle: 'Cuando el pago falla',
    refLegendDanger: 'Rechazo',
    refCanvas: 'Si el pago es rechazado, el stock reservado se repone y el usuario recibe el aviso con opción de reintentar',
    refOrder: 'Orden del sistema',
    refOrderCanceled: 'cancelada por el pago',
    refOrderWaiting: 'esperando el cobro',
    refGwRefused: 'rechazado / expirado',
    refGwProcessing: 'procesando…',
    refCatRestocked: 'lasaña: 1 (repuesta)',
    refCatReserved: 'lasaña: 0 (reservada)',
    refApp: 'App del usuario',
    refAppRefused: 'pago rechazado',
    refAppProcessing: 'procesando pago…',
    refReports: 'Reportes',
    refPkRefused: 'rechazado',
    refRetry: 'Reintentar',
    refFoot: 'Nada queda a medias: ni un cobro huérfano, ni una comida desaparecida del catálogo',
  },
  en: {
    /* problems */
    problems: [
      { k: 'Problem 1 · Contention', t: 'Two people, the last dish', r: 'No locks', rs: 'One actor per fridge processes its orders one at a time.' },
      { k: 'Problem 2 · Evidence', t: 'Complaints with money involved', r: 'Nothing gets erased', rs: 'Event sourcing, acknowledged queues and 30 seconds before charging.' },
      { k: 'Problem 3 · Autonomy', t: 'Fridges with no signal', r: 'No dependence on the cloud', rs: 'PIN validated at the fridge and catalog on the phone.' },
    ],
    renuncia: 'What they gave up',
    footRecap: 'And the rainy day: when the hardware fails, a human path designed in advance.',
    footIntro: 'Each problem comes with the solution the team designed. At the end, the pattern they share.',

    /* race */
    raceTitle: 'The temptation: lock the stock',
    raceLegendCmd: 'Command: I want to buy',
    raceLegendDanger: 'Waiting / conflict',
    raceCanvas: 'Two customers buy the last meal at the same time; the database locks one out while it serves the other',
    raceAnaSub: 'buys from the app',
    raceBetoSub: 'in the same second',
    raceDb: 'Database',
    raceDbSub: 'stock locked',
    raceFridge: 'Gym fridge',
    raceFridgeSub: '1 lasagna left',
    racePkBuy: 'buy',
    racePkWait: 'waiting…',
    raceQuote: '“Nobody touches the stock while I’m buying”',
    raceNote: 'every purchase waits for the one before it',

    /* actors */
    queue: 'queue',
    serialCaptions: [
      'In fridge A’s queue, two orders are waiting for the <strong>last lasagna</strong>: Ana got there first, Beto second.',
      'The actor takes Ana’s order. Nobody else touches that stock in the meantime: not because it’s locked, but because <strong>there is nobody else</strong>.',
      'Stock in memory: 1 → 0. Ana’s order moves on to payment.',
      'Only then does it take Beto’s order: stock 0. Beto gets a clean <strong>sold out</strong>, with no conflict and no retry.',
    ],
    actorsTitleSerial: 'Inside a single fridge',
    actorsTitleBroadcast: 'Two outputs for every order',
    actorsTitleRoute: 'One actor per fridge',
    legendCmd: 'Command',
    legendEvt: 'Event',
    legendCmp: 'Stateful component',
    actorsCanvas: 'Customers in three locations send orders to a router, which puts them into one queue per fridge; each fridge has its own actor',
    clients: (k: string) => `Customers ${k}`,
    routerSub: 'reads the location',
    actor: (k: string) => `Actor ${k}`,
    lasagna: (n: number) => `lasagna: ${n}`,
    stockInMemory: 'stock in memory',
    orderK: (k: string) => `order ${k}`,
    anaBought: 'Ana: bought ✓',
    betoSoldOut: 'Beto: sold out',
    oneLine: 'one line per fridge = zero simultaneous writes',
    catalog: 'Catalog',
    payment: 'Payment',
    catalogUpdated: 'catalog updated · for all users',
    pkOrder: 'order',

    /* venue */
    fridgeIds: ['F1', 'F2', 'F3'],
    venuePlace: 'A gym',
    venueTag: 'example · 1 venue, 3 fridges',
    venueUnit: 'meals',
    venueShows: 'The app shows the venue:',
    venueSum: '12?',
    venueWho: 'Who adds it up? Byte’s API didn’t guarantee it.',
    venueTotalK: 'If the API reports the total',
    venueTotalCode: '{ "fridge": "F2", "available": 7 }',
    venueTotalT: 'Each message stands on its own: if one gets lost, the next one corrects the number.',
    venueDeltaK: 'If it only reports the delta',
    venueDeltaCode: '{ "fridge": "F2", "change": -1 }',
    venueDeltaT: 'You have to add up every change: one lost message leaves the stock out of sync.',
    venueQ: <>The team’s question to the vendor, word for word: <em>“We don’t know what data is provided from fridge(s): is it the total amount of meals or delta. We hope for a total amount.”</em></>,

    /* ledger */
    ledger: [
      { state: 'CREATED', ev: 'Order confirmed' },
      { state: 'RESERVED', ev: 'Stock reserved' },
      { state: 'PAID', ev: 'Payment confirmed' },
    ],
    ledgerTitle: 'The same order, stored two ways',
    ledgerCap0: <>The order moves forward. On the left, each change <strong>overwrites</strong> the previous one. On the right, each change is <strong>appended</strong> as a new fact.</>,
    ledgerCap3: <>A complaint comes in: “I was charged and never picked up my meal”.</>,
    ledgerCap4: <>Only the event log can answer what happened and when. <strong>The current state is rebuilt by replaying the history</strong>, like an accounting ledger written in ink.</>,
    ledgerTable: 'Traditional table',
    ledgerOrder: 'Order #481',
    ledgerStatus: 'status:',
    ledgerTableNote: 'A single field that gets rewritten.',
    ledgerBad: '“It’s PAID.” Since when? What happened before? No trace left.',
    ledgerLog: 'Event log (event store)',
    ledgerLogNote: 'Nothing gets erased: every fact stays written, in order.',
    ledgerGood: 'Reserved 12:03:11, paid 12:03:41, no pickup recorded: the complaint is settled with evidence.',
    ledgerClaim: 'Complaint · “I was charged and never picked up my meal”',

    /* ack queue */
    ackCaptions: [
      'The order decides to charge and leaves a message in the queue: <strong>“charge order #481”</strong>, with a unique id.',
      'The queue delivers it to the payment service. Until it gets an acknowledgment, <strong>it doesn’t delete it</strong>: if something crashes, it delivers it again.',
      'Payments processes the charge with the gateway.',
      'Payments acknowledges receipt (<strong>ack</strong>). Only now does the queue drop the message: it wasn’t lost.',
      'A late retry delivers the <strong>same</strong> message again. It happens on any network.',
      'Payments sees an id it already processed and discards it with no effect: <strong>no double charge</strong>.',
    ],
    ackTitle: 'The message that can’t be lost or duplicated',
    ackLegendAck: 'Acknowledgment',
    ackCanvas: 'An order sends a charge message through a queue with acknowledgments; a duplicate is discarded by its id',
    ackOrder: 'Order',
    ackOrderSub: 'decides to charge',
    ackQueue: 'Message queue',
    ackQueueSub: 'managed RabbitMQ',
    ackPay: 'Payment service',
    ackPaySub: 'remembers processed ids',
    gateway: 'Gateway',
    ackHeld: 'held until the ack',
    ackPkCharge: 'charge #481',
    ackPkCobro: 'charge',
    ackPkAgain: 'a7f3 (again)',
    ackDup: 'id a7f3 already processed · discarded',
    ackOne: '1 charge, not 2',
    ackRule: '“At least once” delivery + unique id = never lost, never duplicated',

    /* refused */
    refCaptions: [
      'The order has reserved stock and is waiting for the charge.',
      'The gateway <strong>refuses</strong> the charge, or the attempt times out.',
      'The reserved stock goes back to the catalog on its own: <span class="tok tok--evt">MealStockCanceled</span>.',
      'The user gets the refusal notice, which also feeds reporting: <span class="tok tok--evt">OrderPurchaseRefused</span>.',
      'Since the order history lives on the phone for about a month, the refusal becomes a button: <strong>retry the last order</strong> with one tap.',
    ],
    refTitle: 'When the payment fails',
    refLegendDanger: 'Refusal',
    refCanvas: 'If the payment is refused, the reserved stock is restored and the user gets a notice with the option to retry',
    refOrder: 'System order',
    refOrderCanceled: 'canceled by payment',
    refOrderWaiting: 'waiting for the charge',
    refGwRefused: 'refused / timed out',
    refGwProcessing: 'processing…',
    refCatRestocked: 'lasagna: 1 (restored)',
    refCatReserved: 'lasagna: 0 (reserved)',
    refApp: 'User’s app',
    refAppRefused: 'payment refused',
    refAppProcessing: 'processing payment…',
    refReports: 'Reporting',
    refPkRefused: 'refused',
    refRetry: 'Retry',
    refFoot: 'Nothing is left half-done: no orphaned charge, no meal missing from the catalog',
  },
});

/* ───────────────────────── problems (chapter roadmap + recap) ───────────────────────── */
const PROBLEMS = [
  { icon: Swords },
  { icon: Banknote },
  { icon: WifiOff },
];

export function Problems({ state = 'intro', reduced }: SceneProps) {
  const t = useT(S);
  const recap = state === 'recap';
  return (
    <div className="problems">
      <div className="problems__row">
        {PROBLEMS.map((p, i) => {
          const tx = t.problems[i];
          return (
            <motion.article
              key={i}
              className={`problem ${recap ? 'is-recap' : ''}`}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
            >
              <span className="problem__icon" aria-hidden><p.icon size={22} /></span>
              <p className="problem__k mono">{tx.k}</p>
              <h3 className="problem__t">{tx.t}</h3>
              <AnimatePresence initial={false}>
                {recap && (
                  <motion.div className="problem__r" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}>
                    <p className="problem__rk mono">{t.renuncia}</p>
                    <p className="problem__rt">{tx.r}</p>
                    <p className="problem__rs">{tx.rs}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
      <motion.div className="problems__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <CloudRain size={16} aria-hidden />
        {recap ? (
          <span>{t.footRecap}</span>
        ) : (
          <span>{t.footIntro}</span>
        )}
      </motion.div>
    </div>
  );
}

/* ───────────────────────── race: the naive temptation ───────────────────────── */
export function Race({ reduced }: SceneProps) {
  const t = useT(S);
  return (
    <Frame title={t.raceTitle} legend={<Legend items={[{ tone: 'cmd', label: t.raceLegendCmd }, { tone: 'danger', label: t.raceLegendDanger }]} />}>
      <Canvas w={960} h={540} label={t.raceCanvas}>
        {(ids) => (
          <>
            <Node x={150} y={150} w={190} icon={Smartphone} label="Ana" sub={t.raceAnaSub} />
            <Node x={150} y={390} w={190} icon={Smartphone} label="Beto" sub={t.raceBetoSub} />
            <Node x={500} y={270} w={210} h={80} kind="danger" icon={Database} label={t.raceDb} sub={t.raceDbSub} />
            <Node x={820} y={270} w={200} h={80} kind="cmp" icon={Refrigerator} label={t.raceFridge} sub={t.raceFridgeSub} />
            <Edge points={[[247, 150], [320, 150], [320, 250], [393, 250]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[247, 390], [320, 390], [320, 290], [393, 290]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[607, 270], [718, 270]]} tone="muted" marker={ids.arrow} />
            <Packet reduced={reduced} tone="cmd" label={t.racePkBuy} points={[[247, 150], [320, 150], [320, 250], [390, 250]]} duration={1.4} repeat repeatDelay={1.6} />
            <Packet reduced={reduced} tone="danger" label={t.racePkWait} points={[[247, 390], [320, 390], [320, 300], [320, 300], [320, 300]]} duration={2.4} repeat repeatDelay={0.6} hold />
            <motion.g
              initial={false}
              animate={reduced ? {} : { scale: [1, 1.12, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <circle cx={500} cy={200} r={20} fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth={1.6} />
              <foreignObject x={488} y={188} width={24} height={24}>
                <div style={{ color: 'var(--danger)', display: 'grid', placeItems: 'center', height: '100%' }}><Lock size={16} /></div>
              </foreignObject>
            </motion.g>
            <Label x={500} y={380} tone="text" size={14}>{t.raceQuote}</Label>
            <Label x={500} y={404} tone="muted">{t.raceNote}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── actors: one per fridge ───────────────────────── */
const LANES = [
  { k: 'A', y: 120 },
  { k: 'B', y: 280 },
  { k: 'C', y: 440 },
];

function Queue({ x, y, dim, items = [] as string[], hl = false }: { x: number; y: number; dim?: boolean; items?: string[]; hl?: boolean }) {
  const t = useT(S);
  return (
    <motion.g initial={false} animate={{ opacity: dim ? 0.3 : 1 }}>
      <rect x={x - 70} y={y - 26} width={140} height={52} rx={10} className={`nd ${hl ? 'is-hl' : ''}`} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={x + 36 - i * 30} y={y - 14} width={24} height={28} rx={5} fill="var(--surface-3)" />
      ))}
      <AnimatePresence>
        {items.map((it, i) => (
          <motion.g key={it} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.35 }}>
            <rect x={x + 36 - i * 30} y={y - 14} width={24} height={28} rx={5} className="pk pk--cmd" />
            <text x={x + 48 - i * 30} y={y + 5} textAnchor="middle" className="pk-t" style={{ fontSize: 11 }}>{it[0]}</text>
          </motion.g>
        ))}
      </AnimatePresence>
      <text x={x} y={y + 44} textAnchor="middle" className="lb lb--muted" style={{ fontSize: 10 }}>{t.queue}</text>
    </motion.g>
  );
}

export function Actors({ state = 'route', reduced }: SceneProps) {
  const t = useT(S);
  const serial = state === 'serial';
  const broadcast = state === 'broadcast';
  const s = usePhases(4, { interval: 2000, reduced, key: state, auto: serial });
  const ph = serial ? s.phase : 3;
  const queueA = serial ? (ph === 0 ? ['Ana', 'Beto'] : ph < 3 ? ['Beto'] : []) : [];
  const stockA = serial ? (ph >= 2 ? 0 : 1) : null;

  return (
    <Frame
      title={serial ? t.actorsTitleSerial : broadcast ? t.actorsTitleBroadcast : t.actorsTitleRoute}
      legend={<Legend items={[{ tone: 'cmd', label: t.legendCmd }, { tone: 'evt', label: t.legendEvt }, { tone: 'cmp', label: t.legendCmp }]} />}
      foot={
        serial ? (
          <Stepper phase={s.phase} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} caption={<span dangerouslySetInnerHTML={{ __html: t.serialCaptions[s.phase] }} />} />
        ) : undefined
      }
    >
      <Canvas w={960} h={560} label={t.actorsCanvas}>
        {(ids) => (
          <>
            {/* clients */}
            {LANES.map((l, i) => (
              <Node key={l.k} x={80} y={l.y} w={130} h={56} icon={Smartphone} label={t.clients(l.k)} dim={serial && i > 0} />
            ))}
            {/* router */}
            <Node x={270} y={280} w={150} h={72} kind="cmp" icon={Split} label="Router" sub={t.routerSub} dim={serial} />
            {LANES.map((l, i) => (
              <g key={l.k}>
                <Edge points={[[145, l.y], [170, l.y], [170, 280], [193, 280]]} tone="cmd" marker={ids.arrowCmd} />
                <Edge points={[[345, 280], [370, 280], [370, l.y], [407, l.y]]} tone="cmd" marker={ids.arrowCmd} />
                <Queue x={480} y={l.y} dim={serial && i > 0} items={i === 0 ? queueA : []} hl={serial && i === 0} />
                <Edge points={[[550, l.y], [597, l.y]]} tone="cmd" marker={ids.arrowCmd} />
              </g>
            ))}
            {/* actors */}
            {LANES.map((l, i) => (
              <Node key={l.k} x={675} y={l.y} w={150} h={64} kind="cmp" icon={Cpu} label={t.actor(l.k)} sub={i === 0 && stockA !== null ? t.lasagna(stockA) : t.stockInMemory} dim={serial && i > 0} highlight={serial && i === 0 && (ph === 1 || ph === 3)} />
            ))}

            {/* route packets */}
            {state === 'route' &&
              LANES.map((l, i) => (
                <Packet
                  key={l.k}
                  reduced={reduced}
                  tone="cmd"
                  label={t.orderK(l.k)}
                  points={[[145, l.y], [170, l.y], [170, 280], [193, 280], [345, 280], [370, 280], [370, l.y], [410, l.y], [550, l.y], [600, l.y]]}
                  duration={3.2}
                  delay={i * 0.9}
                  repeat
                  repeatDelay={1.4}
                />
              ))}

            {/* serial outcomes */}
            {serial && (
              <>
                <motion.g initial={false} animate={{ opacity: ph >= 2 ? 1 : 0 }}>
                  <rect x={770} y={60} width={170} height={40} rx={10} className="nd nd--evt" />
                  <text x={855} y={85} textAnchor="middle" className="pk-t">{t.anaBought}</text>
                  <Edge points={[[750, 110], [800, 100]]} show={ph >= 2} tone="evt" marker={ids.arrowEvt} />
                </motion.g>
                <motion.g initial={false} animate={{ opacity: ph >= 3 ? 1 : 0 }}>
                  <rect x={770} y={140} width={170} height={40} rx={10} className="nd nd--danger" />
                  <text x={855} y={165} textAnchor="middle" className="pk-t">{t.betoSoldOut}</text>
                  <Edge points={[[750, 130], [800, 150]]} show={ph >= 3} tone="danger" marker={ids.arrowDanger} />
                </motion.g>
                <Label x={480} y={530} tone="accent" size={12}>{t.oneLine}</Label>
              </>
            )}

            {/* broadcast */}
            <Node x={880} y={200} w={140} h={60} kind="cmp" icon={BookOpen} label={t.catalog} show={broadcast} />
            <Node x={880} y={380} w={140} h={60} kind="ext" icon={CreditCard} label={t.payment} show={broadcast} />
            {LANES.map((l) => (
              <g key={l.k}>
                <Edge points={[[750, l.y], [780, l.y], [780, 200], [808, 200]]} show={broadcast} tone="evt" marker={ids.arrowEvt} />
                <Edge points={[[750, l.y + 10], [790, l.y + 10], [790, 380], [808, 380]]} show={broadcast} tone="cmd" marker={ids.arrowCmd} />
              </g>
            ))}
            <Edge points={[[880, 170], [880, 30], [80, 30], [80, 90]]} show={broadcast} tone="evt" dashed marker={ids.arrowEvt} />
            <Label x={480} y={22} tone="evt" show={broadcast}>{t.catalogUpdated}</Label>
            {broadcast && (
              <>
                <Packet reduced={reduced} tone="evt" label="stock −1" points={[[750, 120], [780, 120], [780, 200], [808, 200]]} duration={1.4} repeat repeatDelay={2.6} />
                <Packet reduced={reduced} tone="cmd" label={t.pkOrder} points={[[750, 130], [790, 130], [790, 380], [808, 380]]} duration={1.4} delay={0.4} repeat repeatDelay={2.6} />
                <Packet reduced={reduced} tone="evt" label="CatalogUpdated" points={[[880, 170], [880, 30], [80, 30], [80, 90]]} duration={2.2} delay={1.5} repeat repeatDelay={1.8} />
              </>
            )}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── venue: several fridges per location ───────────────────────── */
export function Venue({ reduced }: SceneProps) {
  const t = useT(S);
  const fridges = [
    { id: 'H1', n: 4 },
    { id: 'H2', n: 7 },
    { id: 'H3', n: 1 },
  ];
  return (
    <div className="venue">
      <motion.section className="vcard venue__place" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}>
        <header className="venue__head">
          <Building2 size={18} aria-hidden /> <strong>{t.venuePlace}</strong> <span className="mono venue__tag">{t.venueTag}</span>
        </header>
        <div className="venue__fridges">
          {fridges.map((f, i) => (
            <motion.div key={f.id} className="venue__fridge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12 }}>
              <Refrigerator size={22} aria-hidden />
              <span className="mono">{t.fridgeIds[i]}</span>
              <strong>{f.n}</strong>
              <span className="venue__u">{t.venueUnit}</span>
            </motion.div>
          ))}
        </div>
        <div className="venue__sum">
          <span>{t.venueShows}</span>
          <strong className="mono">{t.venueSum}</strong>
          <span className="venue__who">{t.venueWho}</span>
        </div>
      </motion.section>
      <div className="venue__apis">
        <motion.section className="vcard venue__api" initial={{ opacity: 0, x: reduced ? 0 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <p className="venue__apik mono">{t.venueTotalK}</p>
          <pre className="venue__code">{t.venueTotalCode}</pre>
          <p className="venue__apit">{t.venueTotalT}</p>
        </motion.section>
        <motion.section className="vcard venue__api" initial={{ opacity: 0, x: reduced ? 0 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
          <p className="venue__apik mono">{t.venueDeltaK}</p>
          <pre className="venue__code">{t.venueDeltaCode}</pre>
          <p className="venue__apit">{t.venueDeltaT}</p>
        </motion.section>
        <motion.p className="venue__q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          {t.venueQ}
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── ledger: overwrite vs append ───────────────────────── */
const LEDGER = [
  { tok: 'Confirm Order', kind: 'cmd', t: '12:03:10' },
  { tok: 'MealStockReserved', kind: 'evt', t: '12:03:11' },
  { tok: 'OrderPurchased', kind: 'evt', t: '12:03:41' },
];

export function Ledger({ reduced }: SceneProps) {
  const t = useT(S);
  const s = usePhases(5, { interval: 1700, reduced });
  const n = Math.min(s.phase + 1, 3);
  const claim = s.phase >= 3;
  const verdict = s.phase >= 4;
  return (
    <Frame
      title={t.ledgerTitle}
      foot={
        <Stepper
          phase={s.phase}
          count={5}
          playing={s.playing}
          onPlay={() => s.setPlaying(true)}
          onPause={() => s.setPlaying(false)}
          onGo={s.goTo}
          caption={
            s.phase < 3 ? (
              <span>{t.ledgerCap0}</span>
            ) : s.phase === 3 ? (
              <span>{t.ledgerCap3}</span>
            ) : (
              <span>{t.ledgerCap4}</span>
            )
          }
        />
      }
    >
      <div className="ledger">
        <section className="vcard ledger__col">
          <p className="ledger__k mono">{t.ledgerTable}</p>
          <div className="ledger__row">
            <span className="mono ledger__id">{t.ledgerOrder}</span>
            <span className="ledger__estado">
              {t.ledgerStatus}{' '}
              <AnimatePresence mode="popLayout">
                <motion.strong key={n} className="mono" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10, textDecoration: 'line-through' }}>
                  {t.ledger[n - 1].state}
                </motion.strong>
              </AnimatePresence>
            </span>
          </div>
          <p className="ledger__note">{t.ledgerTableNote}</p>
          {verdict && (
            <motion.div className="ledger__verdict is-bad" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Ban size={15} aria-hidden /> {t.ledgerBad}
            </motion.div>
          )}
        </section>
        <section className="vcard ledger__col">
          <p className="ledger__k mono">{t.ledgerLog}</p>
          <ol className="ledger__log">
            <AnimatePresence initial={false}>
              {LEDGER.slice(0, n).map((e, i) => (
                <motion.li key={e.tok} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                  <span className="mono ledger__t">{e.t}</span>
                  <span>{t.ledger[i].ev}</span>
                  <span className={`tok tok--${e.kind}`}>{e.tok}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
          <p className="ledger__note">{t.ledgerLogNote}</p>
          {verdict && (
            <motion.div className="ledger__verdict is-good" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <ShieldCheck size={15} aria-hidden /> {t.ledgerGood}
            </motion.div>
          )}
        </section>
        <AnimatePresence>
          {claim && (
            <motion.div className="ledger__claim" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <Users size={16} aria-hidden /> {t.ledgerClaim}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

/* ───────────────────────── queue: at-least-once with acks ───────────────────────── */
export function AckQueue({ reduced }: SceneProps) {
  const t = useT(S);
  const s = usePhases(6, { interval: 1900, reduced });
  const p = s.phase;
  const inQueue = p >= 0 && p <= 3;
  return (
    <Frame
      title={t.ackTitle}
      legend={<Legend items={[{ tone: 'cmd', label: t.legendCmd }, { tone: 'evt', label: t.ackLegendAck }]} />}
      foot={<Stepper phase={p} count={6} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} caption={<span dangerouslySetInnerHTML={{ __html: t.ackCaptions[p] }} />} />}
    >
      <Canvas w={960} h={440} label={t.ackCanvas}>
        {(ids) => (
          <>
            <Node x={120} y={200} w={170} h={70} kind="cmp" icon={Inbox} label={t.ackOrder} sub={t.ackOrderSub} highlight={p === 0} />
            <Node x={400} y={200} w={190} h={80} icon={Send} label={t.ackQueue} sub={t.ackQueueSub} highlight={p === 1 || p === 3} />
            <Node x={680} y={200} w={180} h={70} kind="cmp" icon={CreditCard} label={t.ackPay} sub={t.ackPaySub} highlight={p === 2 || p === 5} />
            <Node x={880} y={200} w={120} h={60} kind="ext" label={t.gateway} sub="Stripe" />
            <Edge points={[[205, 200], [303, 200]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[495, 190], [588, 190]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[590, 215], [497, 215]]} tone="evt" marker={ids.arrowEvt} show={p >= 3} />
            <Edge points={[[770, 200], [818, 200]]} tone="muted" marker={ids.arrow} />

            {/* the message held in the queue */}
            <motion.g initial={false} animate={{ opacity: inQueue && p !== 2 ? 1 : p === 2 ? 0.5 : 0 }}>
              <rect x={345} y={262} width={110} height={26} rx={13} className="pk pk--cmd" />
              <text x={400} y={279} textAnchor="middle" className="pk-t">#481 · a7f3</text>
            </motion.g>
            <Label x={400} y={310} show={p >= 1 && p <= 2} tone="muted">{t.ackHeld}</Label>

            {p === 0 && <Packet key="p0" reduced={reduced} tone="cmd" label={t.ackPkCharge} points={[[205, 200], [303, 200]]} duration={1.3} />}
            {p === 1 && <Packet key="p1" reduced={reduced} tone="cmd" label="a7f3" points={[[495, 190], [588, 190]]} duration={1.3} />}
            {p === 2 && <Packet key="p2" reduced={reduced} tone="muted" label={t.ackPkCobro} points={[[770, 200], [818, 200]]} duration={1.1} />}
            {p === 3 && <Packet key="p3" reduced={reduced} tone="evt" label="ack a7f3" points={[[590, 215], [497, 215]]} duration={1.3} />}
            {p >= 4 && <Packet key="p4" reduced={reduced} tone="cmd" label={t.ackPkAgain} points={[[400, 110], [520, 90], [590, 170]]} duration={1.4} hold />}
            <Label x={680} y={290} show={p >= 5} tone="danger" size={12}>{t.ackDup}</Label>
            <Label x={680} y={120} show={p >= 5} tone="evt" size={11}>{t.ackOne}</Label>

            <Label x={480} y={400} tone="text" size={13}>{t.ackRule}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── refused: side B of the money path ───────────────────────── */
export function Refused({ reduced }: SceneProps) {
  const t = useT(S);
  const s = usePhases(5, { interval: 2000, reduced });
  const p = s.phase;
  return (
    <Frame
      title={t.refTitle}
      legend={<Legend items={[{ tone: 'evt', label: t.legendEvt }, { tone: 'danger', label: t.refLegendDanger }]} />}
      foot={<Stepper phase={p} count={5} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} caption={<span dangerouslySetInnerHTML={{ __html: t.refCaptions[p] }} />} />}
    >
      <Canvas w={960} h={440} label={t.refCanvas}>
        {(ids) => (
          <>
            <Node x={480} y={210} w={200} h={80} kind="cmp" icon={Inbox} label={t.refOrder} sub={p >= 2 ? t.refOrderCanceled : t.refOrderWaiting} highlight={p === 0} />
            <Node x={850} y={210} w={170} h={70} kind={p >= 1 ? 'danger' : 'ext'} icon={CreditCard} label={t.gateway} sub={p >= 1 ? t.refGwRefused : t.refGwProcessing} />
            <Node x={480} y={60} w={180} h={60} kind="cmp" icon={BookOpen} label={t.catalog} sub={p >= 2 ? t.refCatRestocked : t.refCatReserved} highlight={p === 2} />
            <Node x={130} y={210} w={200} h={80} icon={Smartphone} label={t.refApp} sub={p >= 3 ? t.refAppRefused : t.refAppProcessing} highlight={p >= 3} />
            <Node x={480} y={370} w={170} h={56} kind="muted" label={t.refReports} show={p >= 3} />
            <Edge points={[[765, 210], [582, 210]]} tone="danger" marker={ids.arrowDanger} show={p >= 1} />
            <Edge points={[[480, 168], [480, 92]]} tone="evt" marker={ids.arrowEvt} show={p >= 2} />
            <Edge points={[[378, 210], [232, 210]]} tone="evt" marker={ids.arrowEvt} show={p >= 3} />
            <Edge points={[[480, 252], [480, 340]]} tone="evt" marker={ids.arrowEvt} show={p >= 3} />
            {p === 1 && <Packet key="r1" reduced={reduced} tone="danger" label={t.refPkRefused} points={[[765, 210], [585, 210]]} duration={1.3} />}
            {p === 2 && <Packet key="r2" reduced={reduced} tone="evt" label="MealStockCanceled" points={[[480, 168], [480, 94]]} duration={1.2} />}
            {p === 3 && <Packet key="r3" reduced={reduced} tone="evt" label="OrderPurchaseRefused" points={[[378, 210], [236, 210]]} duration={1.3} />}
            {p >= 4 && (
              <foreignObject x={40} y={262} width={180} height={44}>
                <motion.button type="button" className="play-btn play-btn--primary" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', justifyContent: 'center' }} tabIndex={-1}>
                  <RotateCw size={14} aria-hidden /> {t.refRetry}
                </motion.button>
              </foreignObject>
            )}
            <Label x={480} y={425} tone="text" size={13} show={p >= 4}>{t.refFoot}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

