import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Smartphone, Refrigerator, Cloud, CloudOff, KeyRound, Server, Timer, CreditCard, Check, Delete, Wifi, WifiOff,
  DoorOpen, FileSpreadsheet, MapPin, Camera, UserCog, Inbox, Bell, AlertTriangle, ShieldAlert, Fingerprint,
  RotateCcw, Play, XCircle, BookOpen,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── purchase: the command / event alphabet ───────────────────────── */
type LaneKey = 'u' | 'lo' | 'so' | 'cat' | 'all';
const LANES: { k: LaneKey; x: number }[] = [
  { k: 'u', x: 100 },
  { k: 'lo', x: 262 },
  { k: 'so', x: 480 },
  { k: 'cat', x: 670 },
  { k: 'all', x: 860 },
];
const X = Object.fromEntries(LANES.map((l) => [l.k, l.x])) as Record<string, number>;
const MSGS = [
  { from: 'u', to: 'lo', y: 150, kind: 'cmd' as const, tok: 'Start Order' },
  { from: 'lo', to: 'so', y: 220, kind: 'cmd' as const, tok: 'Confirm Order by User' },
  { from: 'so', to: 'cat', y: 290, kind: 'evt' as const, tok: 'MealStockReserved' },
  { from: 'cat', to: 'all', y: 360, kind: 'evt' as const, tok: 'MealStockUpdated' },
  { from: 'so', to: 'u', y: 430, kind: 'evt' as const, tok: 'OrderPurchased' },
];

const PURCHASE = defineStrings({
  es: {
    title: 'Una compra instantánea, mensaje por mensaje',
    legendCmd: 'Comando: pide que algo ocurra',
    legendEvt: 'Evento: algo ya ocurrió',
    canvas: 'Diagrama de secuencia de una compra: Start Order y Confirm Order son comandos; MealStockReserved, MealStockUpdated y OrderPurchased son eventos',
    phone: 'teléfono',
    server: 'servidor',
    lanes: {
      u: { t: 'Usuario', s: 'app' },
      lo: { t: 'Orden local', s: 'en el teléfono' },
      so: { t: 'Orden del sistema', s: 'servidor' },
      cat: { t: 'Catálogo', s: 'servidor' },
      all: { t: 'Todos los usuarios', s: 'cada dispositivo' },
    } as Record<LaneKey, { t: string; s: string }>,
    caps: [
      '<strong>Comando local.</strong> El teléfono arma el carrito sin molestar al servidor.',
      '<strong>Comando.</strong> El usuario confirma: recién acá la orden cruza la frontera hacia el servidor. Todavía puede fallar.',
      '<strong>Evento.</strong> La vianda quedó apartada. Ya ocurrió: el catálogo solo se entera.',
      '<strong>Evento difundido.</strong> Todos los dispositivos refrescan su catálogo local.',
      '<strong>Evento.</strong> El pago se procesó: llega la confirmación final al usuario.',
    ],
  },
  en: {
    title: 'An instant purchase, message by message',
    legendCmd: 'Command: asks for something to happen',
    legendEvt: 'Event: something already happened',
    canvas: 'Sequence diagram of a purchase: Start Order and Confirm Order are commands; MealStockReserved, MealStockUpdated and OrderPurchased are events',
    phone: 'phone',
    server: 'server',
    lanes: {
      u: { t: 'User', s: 'app' },
      lo: { t: 'Local order', s: 'on the phone' },
      so: { t: 'System order', s: 'server' },
      cat: { t: 'Catalog', s: 'server' },
      all: { t: 'All users', s: 'every device' },
    },
    caps: [
      '<strong>Local command.</strong> The phone builds the cart without bothering the server.',
      '<strong>Command.</strong> The user confirms: only now does the order cross the boundary to the server. It can still fail.',
      '<strong>Event.</strong> The meal is set aside. It already happened: the catalog just finds out.',
      '<strong>Broadcast event.</strong> Every device refreshes its local catalog.',
      '<strong>Event.</strong> The payment went through: the final confirmation reaches the user.',
    ],
  },
});

export function Purchase({ reduced }: SceneProps) {
  const t = useT(PURCHASE);
  const s = usePhases(MSGS.length, { interval: 3000, reduced });
  const p = s.phase;
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'cmd', label: t.legendCmd }, { tone: 'evt', label: t.legendEvt }]} />}
      foot={<Stepper phase={p} count={MSGS.length} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} labels={MSGS.map((m) => m.tok)} />}
    >
      <Canvas w={960} h={480} label={t.canvas}>
        {(ids) => (
          <>
            <rect x={371} y={20} width={0.1} height={450} />
            <line x1={372} x2={372} y1={24} y2={470} stroke="var(--line-strong)" strokeWidth={1.5} strokeDasharray="3 6" />
            <Label x={362} y={466} anchor="end" size={10}>{t.phone}</Label>
            <Label x={382} y={466} anchor="start" size={10}>{t.server}</Label>
            {LANES.map((l) => (
              <g key={l.k}>
                <line x1={l.x} x2={l.x} y1={84} y2={450} stroke="var(--line)" strokeWidth={1.5} strokeDasharray="2 5" />
                <Node x={l.x} y={52} w={l.k === 'so' || l.k === 'all' ? 164 : 140} h={52} kind={l.k === 'u' || l.k === 'all' ? 'plain' : 'cmp'} label={t.lanes[l.k].t} sub={t.lanes[l.k].s} />
              </g>
            ))}
            {MSGS.map((m, i) => {
              const x1 = X[m.from];
              const x2 = X[m.to];
              const dir = x2 > x1 ? 1 : -1;
              const a: [number, number] = [x1 + dir * 6, m.y];
              const b: [number, number] = [x2 - dir * 8, m.y];
              const shown = i <= p;
              const midx = (x1 + x2) / 2;
              return (
                <g key={m.tok}>
                  <Edge points={[a, b]} tone={m.kind} marker={m.kind === 'cmd' ? ids.arrowCmd : ids.arrowEvt} show={shown} />
                  <motion.g initial={false} animate={{ opacity: shown ? (i === p ? 1 : 0.55) : 0 }}>
                    <rect x={midx - (m.tok.length * 7.3 + 20) / 2} y={m.y - 30} width={m.tok.length * 7.3 + 20} height={22} rx={11} className={`pk pk--${m.kind}`} />
                    <text x={midx} y={m.y - 15} textAnchor="middle" className="pk-t">{m.tok}</text>
                    <circle cx={x1} cy={m.y} r={4} fill={`var(--${m.kind})`} />
                    <text x={Math.min(x1, x2) - 16} y={m.y + 4} textAnchor="end" className="lb lb--muted" style={{ fontSize: 10 }}>{i + 1}</text>
                  </motion.g>
                  {i === p && !reduced && <Packet key={`pk${p}`} reduced={reduced} tone={m.kind} points={[a, b]} duration={1.1} w={14} />}
                </g>
              );
            })}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── window: the 30-second undo ───────────────────────── */
type WinState = 'idle' | 'window' | 'canceled' | 'charged' | 'refunded';
const WINDOW_S = 30;
const SPEED = 4; // simulated seconds per real second

const UNDO = defineStrings({
  es: {
    title: 'Simulador · la ventana de deshacer',
    speed: (n: number) => `tiempo acelerado ×${n} · la ventana real dura entre 10 y 30 segundos`,
    msg: {
      idle: 'Confirmá una compra y probá arrepentirte a tiempo, o dejá pasar la ventana.',
      window: 'La orden está <strong>retenida en memoria</strong>. La pasarela todavía no sabe nada.',
      canceled: 'Cancelada en memoria: <span class="tok tok--evt">MealStockCanceled</span> y <span class="tok tok--evt">MealStockUpdated</span> devuelven la vianda al catálogo. <strong>La pasarela nunca se enteró.</strong>',
      charged: 'Pasó la ventana sin cancelación: <strong>recién ahora</strong> se invoca al pago. Para el usuario, “procesar el pago” tardó unos segundos, como siempre.',
      refunded: 'Cancelar después de cobrar es un reembolso real: <strong>comisión de cobro + comisión de reembolso</strong>, por la misma comida.',
    } as Record<WinState, string>,
    confirmed: 'Orden confirmada',
    waiting: 'esperando',
    meal: 'lasaña de espinaca',
    memWindow: 'Ventana en memoria',
    barLabel: 'Tiempo de la ventana',
    gateway: 'Pasarela de pago',
    payCharged: 'cobro iniciado',
    payRefunded: 'cobro + reembolso',
    payNever: 'nunca invocada',
    payIdle: 'sin tocar',
    fees: (n: number) => `${n === 1 ? 'comisión' : 'comisiones'} pagadas`,
    confirm: 'Confirmar compra',
    cancel: 'Cancelar la orden',
    again: 'Otra vez',
  },
  en: {
    title: 'Simulator · the undo window',
    speed: (n: number) => `time sped up ×${n} · the real window lasts 10 to 30 seconds`,
    msg: {
      idle: 'Confirm a purchase and try changing your mind in time, or let the window run out.',
      window: 'The order is <strong>held in memory</strong>. The gateway doesn’t know anything yet.',
      canceled: 'Canceled in memory: <span class="tok tok--evt">MealStockCanceled</span> and <span class="tok tok--evt">MealStockUpdated</span> return the meal to the catalog. <strong>The gateway never found out.</strong>',
      charged: 'The window ran out with no cancellation: <strong>only now</strong> is the payment called. To the user, “processing payment” took a few seconds, as always.',
      refunded: 'Canceling after the charge means a real refund: <strong>charge fee + refund fee</strong>, for the same meal.',
    },
    confirmed: 'Order confirmed',
    waiting: 'waiting',
    meal: 'spinach lasagna',
    memWindow: 'In-memory window',
    barLabel: 'Window time',
    gateway: 'Payment gateway',
    payCharged: 'charge started',
    payRefunded: 'charge + refund',
    payNever: 'never called',
    payIdle: 'untouched',
    fees: (n: number) => (n === 1 ? 'fee paid' : 'fees paid'),
    confirm: 'Confirm purchase',
    cancel: 'Cancel the order',
    again: 'Start over',
  },
});

export function UndoWindow({ reduced }: SceneProps) {
  const tx = useT(UNDO);
  const [st, setSt] = useState<WinState>('idle');
  const [t, setT] = useState(0);
  const raf = useRef<number | undefined>(undefined);
  const start = useRef(0);

  useEffect(() => {
    if (st !== 'window') return;
    start.current = performance.now() - (t * 1000) / SPEED;
    const tick = (now: number) => {
      const sim = ((now - start.current) / 1000) * SPEED;
      if (sim >= WINDOW_S) {
        setT(WINDOW_S);
        setSt('charged');
        return;
      }
      setT(sim);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
  }, [st]);

  const fees = st === 'refunded' ? 2 : st === 'charged' ? 1 : 0;
  const confirm = () => { setT(0); setSt('window'); };
  const cancel = () => setSt(st === 'window' ? 'canceled' : 'refunded');
  const reset = () => { setT(0); setSt('idle'); };
  const pct = (t / WINDOW_S) * 100;

  const msg = tx.msg;

  return (
    <Frame title={tx.title} foot={<p className="win__speed mono">{tx.speed(SPEED)}</p>}>
      <div className="win">
        <div className="win__pipe">
          <div className={`win__box ${st !== 'idle' ? 'is-on' : ''}`}>
            <Inbox size={20} aria-hidden />
            <strong>{tx.confirmed}</strong>
            <span>{st === 'idle' ? tx.waiting : tx.meal}</span>
          </div>
          <div className="win__arrow" aria-hidden />
          <div className={`win__box win__box--mem ${st === 'window' ? 'is-live' : ''} ${st === 'canceled' ? 'is-ok' : ''}`}>
            <Timer size={20} aria-hidden />
            <strong>{tx.memWindow}</strong>
            <div className="win__bar" role="progressbar" aria-valuemin={0} aria-valuemax={WINDOW_S} aria-valuenow={Math.round(t)} aria-label={tx.barLabel}>
              <motion.div className="win__fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="mono">{Math.floor(t)} / {WINDOW_S} s</span>
          </div>
          <div className="win__arrow" aria-hidden />
          <div className={`win__box win__box--pay ${st === 'charged' || st === 'refunded' ? 'is-hit' : ''} ${st === 'canceled' ? 'is-never' : ''}`}>
            <CreditCard size={20} aria-hidden />
            <strong>{tx.gateway}</strong>
            <span>{st === 'charged' ? tx.payCharged : st === 'refunded' ? tx.payRefunded : st === 'canceled' ? tx.payNever : tx.payIdle}</span>
          </div>
        </div>

        <div className="win__panel vcard">
          <div className="win__msg" aria-live="polite" dangerouslySetInnerHTML={{ __html: msg[st] }} />
          <div className="win__row">
            <div className={`win__fees ${fees ? 'is-bad' : 'is-good'}`}>
              <span className="mono">{fees}</span> {tx.fees(fees)}
            </div>
            <div className="win__btns">
              {st === 'idle' && (
                <button type="button" className="play-btn play-btn--primary" onClick={confirm}>
                  <Play size={14} aria-hidden /> {tx.confirm}
                </button>
              )}
              {(st === 'window' || st === 'charged') && (
                <button type="button" className="play-btn" onClick={cancel}>
                  <XCircle size={14} aria-hidden /> {tx.cancel}
                </button>
              )}
              {st !== 'idle' && st !== 'window' && (
                <button type="button" className="play-btn" onClick={reset}>
                  <RotateCcw size={14} aria-hidden /> {tx.again}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────── offline: the basement fridge ───────────────────────── */
const OFFLINE = defineStrings({
  es: {
    title: 'Hospital · subsuelo 2',
    canvas: 'Una heladera en el subsuelo de un hospital, sin señal celular, con un cliente que ya pagó esperando su comida',
    cloud: 'Plataforma en la nube',
    cloudSub: 'valida, cobra, registra',
    ground: 'planta baja',
    basement: 'subsuelo',
    noSignal: 'sin señal celular',
    fridge: 'Heladera',
    fridgeSub: 'no puede hablar con la nube',
    customer: 'Cliente',
    customerSub: 'ya pagó su almuerzo',
    ask: '¿abro?',
    known: 'algo que ya conoce',
  },
  en: {
    title: 'Hospital · basement 2',
    canvas: 'A fridge in a hospital basement, with no cell signal, and a customer who already paid waiting for their meal',
    cloud: 'Cloud platform',
    cloudSub: 'validates, charges, records',
    ground: 'ground floor',
    basement: 'basement',
    noSignal: 'no cell signal',
    fridge: 'Fridge',
    fridgeSub: 'can’t talk to the cloud',
    customer: 'Customer',
    customerSub: 'already paid for lunch',
    ask: 'open?',
    known: 'what it already knows',
  },
});

export function Offline({ chosen, props }: SceneProps) {
  const t = useT(OFFLINE);
  const revealed = chosen !== null && chosen === (props?.correct ?? -1);
  return (
    <Frame title={t.title}>
      <Canvas w={960} h={520} label={t.canvas}>
        {(ids) => (
          <>
            <Node x={480} y={70} w={220} h={64} kind="core" icon={Cloud} label={t.cloud} sub={t.cloudSub} />
            <line x1={120} x2={840} y1={210} y2={210} stroke="var(--line-strong)" strokeWidth={2} />
            <Label x={130} y={200} anchor="start">{t.ground}</Label>
            <rect x={200} y={212} width={560} height={290} rx={4} className="zone-fill" />
            <Label x={215} y={236} anchor="start">{t.basement}</Label>
            <Edge points={[[480, 104], [480, 180]]} tone="danger" dashed />
            <g>
              <circle cx={480} cy={180} r={17} fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth={1.5} />
              <foreignObject x={468} y={168} width={24} height={24}>
                <div style={{ color: 'var(--danger)', display: 'grid', placeItems: 'center', height: '100%' }}><WifiOff size={15} /></div>
              </foreignObject>
            </g>
            <Label x={500} y={150} anchor="start" tone="danger">{t.noSignal}</Label>
            <Node x={600} y={380} w={210} h={80} kind="cmp" icon={Refrigerator} label={t.fridge} sub={t.fridgeSub} />
            <Node x={330} y={380} w={200} h={80} icon={Smartphone} label={t.customer} sub={t.customerSub} />
            <Edge points={[[432, 380], [492, 380]]} tone="cmd" marker={ids.arrowCmd} />
            <Label x={462} y={366} tone="cmd">{t.ask}</Label>
            <motion.g initial={false} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }} transition={{ duration: 0.4 }}>
              <rect x={505} y={436} width={190} height={34} rx={17} className="pk pk--evt" />
              <foreignObject x={515} y={441} width={24} height={24}>
                <div style={{ color: 'var(--evt)', display: 'grid', placeItems: 'center', height: '100%' }}><KeyRound size={15} /></div>
              </foreignObject>
              <text x={612} y={458} textAnchor="middle" className="pk-t">{t.known}</text>
            </motion.g>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── pin: prepare (online) ───────────────────────── */
const PIN_PREPARE = defineStrings({
  es: {
    title: 'Mientras hay señal',
    legend: 'PIN de un solo uso',
    canvas: 'Con señal, la nube genera un PIN de un solo uso y lo envía al teléfono del cliente y a la memoria de la heladera',
    platform: 'Plataforma',
    platformSub: 'genera un PIN por entrega',
    phone: 'Teléfono del cliente',
    phoneSub: 'guarda su PIN',
    fridge: 'Heladera',
    fridgeSub: 'guarda los PIN pendientes',
    online: '✓ con señal',
    packet: 'PIN 482 917',
    mem: 'memoria local',
    memRows: ['482 917 · lasaña', '305 118 · wrap', '771 402 · bowl'],
    digits: '6 a 8 dígitos · atado a una comida',
  },
  en: {
    title: 'While there is signal',
    legend: 'One-time PIN',
    canvas: 'With signal, the cloud generates a one-time PIN and sends it to the customer’s phone and to the fridge’s memory',
    platform: 'Platform',
    platformSub: 'generates one PIN per delivery',
    phone: 'Customer’s phone',
    phoneSub: 'stores their PIN',
    fridge: 'Fridge',
    fridgeSub: 'stores pending PINs',
    online: '✓ online',
    packet: 'PIN 482 917',
    mem: 'local memory',
    memRows: ['482 917 · lasagna', '305 118 · wrap', '771 402 · bowl'],
    digits: '6 to 8 digits · tied to one meal',
  },
});

export function PinPrepare({ reduced }: SceneProps) {
  const t = useT(PIN_PREPARE);
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'evt', label: t.legend }]} />}>
      <Canvas w={960} h={520} label={t.canvas}>
        {(ids) => (
          <>
            <Node x={480} y={80} w={240} h={70} kind="core" icon={Server} label={t.platform} sub={t.platformSub} />
            <Node x={210} y={360} w={210} h={80} icon={Smartphone} label={t.phone} sub={t.phoneSub} />
            <Node x={750} y={360} w={210} h={80} kind="cmp" icon={Refrigerator} label={t.fridge} sub={t.fridgeSub} />
            <Edge points={[[400, 115], [210, 115], [210, 318]]} tone="evt" marker={ids.arrowEvt} />
            <Edge points={[[560, 115], [750, 115], [750, 318]]} tone="evt" marker={ids.arrowEvt} />
            <Label x={480} y={160} tone="evt">
              {t.online}
            </Label>
            <Packet reduced={reduced} tone="evt" label={t.packet} points={[[400, 115], [210, 115], [210, 316]]} duration={2} repeat repeatDelay={1.5} />
            <Packet reduced={reduced} tone="evt" label={t.packet} points={[[560, 115], [750, 115], [750, 316]]} duration={2} repeat repeatDelay={1.5} />
            <foreignObject x={640} y={410} width={220} height={100}>
              <div className="pinmem">
                <span className="mono pinmem__k">{t.mem}</span>
                {t.memRows.map((r, i) => (
                  <span key={i} className="mono">{r}</span>
                ))}
              </div>
            </foreignObject>
            <Label x={210} y={430} tone="muted">{t.digits}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── pin: pickup (offline, interactive keypad) ───────────────────────── */
const PIN = '482917';

const PIN_PICKUP = defineStrings({
  es: {
    title: 'Sin señal · la heladera decide sola',
    logBad: 'PIN inválido: reintentá',
    logOpen: ['PIN validado contra la memoria local', 'Puerta destrabada: retiro OK', 'Retiro guardado para reportar después'],
    logSynced: 'Volvió la señal: retiro reportado a la nube',
    netOn: 'Señal recuperada',
    netOff: 'Sin conexión con la nube',
    yourPin: 'tu PIN de retiro',
    hint: 'También guardado en tu teléfono: no hace falta señal para verlo.',
    fridge: 'Heladera · subsuelo 2',
    entered: (n: number) => `PIN ingresado: ${n} dígitos`,
    opened: 'Puerta abierta',
    keypad: 'Teclado de la heladera',
    erase: 'Borrar',
    validate: 'Validar PIN',
    logTitle: 'registro de la heladera',
    empty: 'Teclea el PIN, o usá “autocompletar”.',
    autofill: 'Autocompletar el PIN',
    restore: 'Volver la señal',
    again: 'Otra vez',
  },
  en: {
    title: 'No signal · the fridge decides on its own',
    logBad: 'Invalid PIN: try again',
    logOpen: ['PIN checked against local memory', 'Door unlocked: pickup OK', 'Pickup saved to report later'],
    logSynced: 'Signal is back: pickup reported to the cloud',
    netOn: 'Signal restored',
    netOff: 'No connection to the cloud',
    yourPin: 'your pickup PIN',
    hint: 'Also saved on your phone: you don’t need signal to see it.',
    fridge: 'Fridge · basement 2',
    entered: (n: number) => `PIN entered: ${n} digits`,
    opened: 'Door open',
    keypad: 'Fridge keypad',
    erase: 'Delete',
    validate: 'Validate PIN',
    logTitle: 'fridge log',
    empty: 'Type the PIN, or use “autofill”.',
    autofill: 'Autofill the PIN',
    restore: 'Restore signal',
    again: 'Start over',
  },
});

export function PinPickup({ reduced }: SceneProps) {
  const t = useT(PIN_PICKUP);
  const [entry, setEntry] = useState('');
  const [status, setStatus] = useState<'typing' | 'bad' | 'open' | 'synced'>('typing');
  const log: string[] = [];
  if (status === 'bad') log.push(t.logBad);
  if (status === 'open' || status === 'synced') log.push(...t.logOpen);
  if (status === 'synced') log.push(t.logSynced);

  const press = (d: string) => {
    if (status === 'open' || status === 'synced') return;
    setStatus('typing');
    setEntry((e) => (e.length < 6 ? e + d : e));
  };
  const back = () => setEntry((e) => e.slice(0, -1));
  const ok = () => setStatus(entry === PIN ? 'open' : 'bad');
  const auto = () => {
    setEntry('');
    setStatus('typing');
    PIN.split('').forEach((d, i) => setTimeout(() => setEntry((e) => e + d), reduced ? 0 : 140 * (i + 1)));
  };
  const reset = () => { setEntry(''); setStatus('typing'); };

  return (
    <Frame title={t.title}>
      <div className="pinx">
        <div className={`pinx__net ${status === 'synced' ? 'is-on' : ''}`}>
          {status === 'synced' ? <Wifi size={15} aria-hidden /> : <CloudOff size={15} aria-hidden />}
          {status === 'synced' ? t.netOn : t.netOff}
        </div>
        <div className="pinx__grid">
          <div className="pinx__phone vcard">
            <Smartphone size={18} aria-hidden />
            <span className="pinx__lbl mono">{t.yourPin}</span>
            <strong className="pinx__code mono">482 917</strong>
            <span className="pinx__hint">{t.hint}</span>
          </div>
          <div className={`pinx__door vcard ${status === 'open' || status === 'synced' ? 'is-open' : ''} ${status === 'bad' ? 'is-bad' : ''}`}>
            <div className="pinx__head"><Refrigerator size={16} aria-hidden /> {t.fridge}</div>
            <div className="pinx__display mono" aria-live="polite" aria-label={t.entered(entry.length)}>
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className={i < entry.length ? 'on' : ''}>{entry[i] ?? '·'}</span>
              ))}
            </div>
            {status === 'open' || status === 'synced' ? (
              <motion.div className="pinx__opened" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <DoorOpen size={28} aria-hidden /> {t.opened}
              </motion.div>
            ) : (
              <div className="pinx__pad" role="group" aria-label={t.keypad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                  <button key={d} type="button" onClick={() => press(d)}>{d}</button>
                ))}
                <button type="button" onClick={back} aria-label={t.erase}><Delete size={16} /></button>
                <button type="button" onClick={() => press('0')}>0</button>
                <button type="button" className="ok" onClick={ok} aria-label={t.validate}><Check size={18} /></button>
              </div>
            )}
          </div>
          <div className="pinx__log vcard">
            <span className="pinx__lbl mono">{t.logTitle}</span>
            <ol>
              <AnimatePresence initial={false}>
                {log.length === 0 && <li className="muted">{t.empty}</li>}
                {log.map((l, i) => (
                  <motion.li key={l} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : i * 0.25 }} className={l === t.logBad ? 'bad' : ''}>
                    {l}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          </div>
        </div>
        <div className="pinx__ctl">
          {status !== 'open' && status !== 'synced' && (
            <button type="button" className="play-btn" onClick={auto}><KeyRound size={14} aria-hidden /> {t.autofill}</button>
          )}
          {status === 'open' && (
            <button type="button" className="play-btn play-btn--primary" onClick={() => setStatus('synced')}><Wifi size={14} aria-hidden /> {t.restore}</button>
          )}
          {status === 'synced' && (
            <button type="button" className="play-btn" onClick={reset}><RotateCcw size={14} aria-hidden /> {t.again}</button>
          )}
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────── trust: ArchColider vs Jedis ───────────────────────── */
type TrustCol = { tag: string; title: string; items: string[]; trust: string };

const TRUST = defineStrings({
  es: {
    archcolider: {
      tag: '1.º puesto',
      title: 'Un código pre-compartido',
      items: ['El PIN se genera antes, mientras hay señal.', 'La heladera lo valida con su memoria local.', 'El retiro se reporta cuando vuelve la conexión.'],
      trust: 'La identidad vive en un código que ya conocen la heladera y el cliente.',
    } as TrustCol,
    jedis: {
      tag: '3.er puesto',
      title: 'Una sesión de compra',
      items: ['La “purchase session” se crea antes de abrir la puerta.', 'La identidad sale de la tarjeta deslizada o del token de la app.', 'Si el cliente toma una comida que no es suya, suena la alarma.', 'La sesión cachea los detalles por si pagos se cae.'],
      trust: 'La identidad vive en la sesión, no en un código pre-compartido.',
    } as TrustCol,
    q: 'Dos modelos de confianza para la misma puerta. Ninguno es “el correcto”: cada uno compra una garantía distinta.',
  },
  en: {
    archcolider: {
      tag: '1st place',
      title: 'A pre-shared code',
      items: ['The PIN is generated ahead of time, while there is signal.', 'The fridge validates it against its local memory.', 'The pickup is reported when the connection comes back.'],
      trust: 'Identity lives in a code that the fridge and the customer already know.',
    },
    jedis: {
      tag: '3rd place',
      title: 'A purchase session',
      items: ['The “purchase session” is created before the door opens.', 'Identity comes from the swiped card or the app’s token.', 'If the customer takes a meal that isn’t theirs, the alarm goes off.', 'The session caches the details in case the payment service goes down.'],
      trust: 'Identity lives in the session, not in a pre-shared code.',
    },
    q: 'Two trust models for the same door. Neither is “the right one”: each one buys a different guarantee.',
  },
});

export function Trust({ reduced }: SceneProps) {
  const t = useT(TRUST);
  const cols = [
    { team: 'ArchColider', icon: KeyRound, ...t.archcolider },
    { team: 'Jedis', icon: Fingerprint, ...t.jedis },
  ];
  return (
    <div className="trust">
      {cols.map((c, i) => (
        <motion.section key={c.team} className={`vcard trust__col ${i === 0 ? 'is-main' : ''}`} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.45, ease: EASE }}>
          <header className="trust__head">
            <span className="trust__icon" aria-hidden><c.icon size={20} /></span>
            <div>
              <p className="trust__team mono">{c.team} · {c.tag}</p>
              <h3>{c.title}</h3>
            </div>
          </header>
          <ul>
            {c.items.map((it, j) => <li key={j}>{it}</li>)}
          </ul>
          <p className="trust__foot">{c.trust}</p>
        </motion.section>
      ))}
      <p className="trust__q">{t.q}</p>
    </div>
  );
}

/* ───────────────────────── catalog in your pocket ───────────────────────── */
const POCKET = defineStrings({
  es: {
    title: 'Navegar es local, cobrar es verdad',
    cmd: 'Comando',
    evt: 'Evento',
    canvas: 'El catálogo vive en el teléfono; el servidor difunde avisos de cambio y el stock real se verifica solo al pagar',
    phone: 'Teléfono',
    phoneSub: 'catálogo guardado',
    meals: ['Lasaña de espinaca', 'Wrap sin gluten', 'Bowl para diabéticos', 'Guiso de lentejas'],
    platform: 'Plataforma',
    platformSub: 'stock real por heladera',
    updated: 'CatalogUpdated · solo id y ubicación, no el catálogo entero',
    atPay: 'al pagar: ¿queda stock de verdad?',
    reply: 'stock confirmado, o alternativas',
    changed: 'algo cambió',
    pay: 'pagar',
    browse1: 'Navegar: instantáneo, sin señal,',
    browse2: 'quizás un poco viejo',
    charge1: 'Cobrar: nunca',
    charge2: 'con datos viejos',
  },
  en: {
    title: 'Browsing is local, charging is real',
    cmd: 'Command',
    evt: 'Event',
    canvas: 'The catalog lives on the phone; the server broadcasts change notices and real stock is checked only at payment',
    phone: 'Phone',
    phoneSub: 'saved catalog',
    meals: ['Spinach lasagna', 'Gluten-free wrap', 'Diabetic-friendly bowl', 'Lentil stew'],
    platform: 'Platform',
    platformSub: 'real stock per fridge',
    updated: 'CatalogUpdated · only id and location, not the whole catalog',
    atPay: 'at payment: is it really in stock?',
    reply: 'stock confirmed, or alternatives',
    changed: 'something changed',
    pay: 'pay',
    browse1: 'Browsing: instant, offline,',
    browse2: 'maybe a little stale',
    charge1: 'Charging: never',
    charge2: 'on stale data',
  },
});

export function PocketCatalog({ reduced }: SceneProps) {
  const t = useT(POCKET);
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'cmd', label: t.cmd }, { tone: 'evt', label: t.evt }]} />}>
      <Canvas w={960} h={520} label={t.canvas}>
        {(ids) => (
          <>
            <Node x={200} y={260} w={230} h={300} icon={Smartphone} label={t.phone} sub={t.phoneSub} labelTop>
              <foreignObject x={16} y={70} width={198} height={210}>
                <ul className="pcat">
                  <li><span>{t.meals[0]}</span><em>✓</em></li>
                  <li><span>{t.meals[1]}</span><em>✓</em></li>
                  <li><span>{t.meals[2]}</span><em>✓</em></li>
                  <li className="old"><span>{t.meals[3]}</span><em>?</em></li>
                </ul>
              </foreignObject>
            </Node>
            <Node x={770} y={260} w={220} h={90} kind="core" icon={Server} label={t.platform} sub={t.platformSub} />
            <Edge points={[[770, 214], [770, 90], [200, 90], [200, 108]]} tone="evt" marker={ids.arrowEvt} />
            <Label x={485} y={70} tone="evt">{t.updated}</Label>
            <Edge points={[[316, 390], [770, 390], [770, 306]]} tone="cmd" marker={ids.arrowCmd} />
            <Label x={540} y={422} tone="cmd">{t.atPay}</Label>
            <Edge points={[[700, 306], [700, 350], [318, 350]]} tone="evt" marker={ids.arrowEvt} />
            <Label x={500} y={340} tone="evt">{t.reply}</Label>
            <Packet reduced={reduced} tone="evt" label={t.changed} points={[[770, 214], [770, 90], [200, 90], [200, 110]]} duration={2.4} repeat repeatDelay={2} />
            <Packet reduced={reduced} tone="cmd" label={t.pay} points={[[316, 390], [770, 390], [770, 308]]} duration={2} delay={2.2} repeat repeatDelay={2.4} />
            <Label x={200} y={440} tone="text" size={13}>{t.browse1}</Label>
            <Label x={200} y={458} tone="text" size={13}>{t.browse2}</Label>
            <Label x={792} y={176} anchor="start" tone="text" size={13}>{t.charge1}</Label>
            <Label x={792} y={194} anchor="start" tone="text" size={13}>{t.charge2}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── partition: spreadsheet + cities ───────────────────────── */
const PARTITION = defineStrings({
  es: {
    cities: [
      { n: 'Detroit', d: 'cocinas, heladeras y clientes de Detroit' },
      { n: 'Nueva York', d: 'si algún día llega: sus propios datos' },
    ],
    sheet: 'Promociones',
    sheetTag: 'hoja de cálculo · ejemplo',
    head: ['Campaña', 'Comida', 'Descuento'],
    rows: [
      ['Lunes verde', 'Bowls', '15%'],
      ['2×1 gimnasio', 'Wraps', '50%'],
      ['Suscriptor+', 'Todo', '10%'],
    ],
    arrow: <>→ el sistema solo consume el <strong>resultado final</strong></>,
    why: 'Cambian poco y las deciden personas. Sincronizarlas entre operadores con algoritmos de consistencia distribuida sería resolver un problema que no existe.',
    chips: ['catálogo', 'stock', 'órdenes'],
    note: '“Las cocinas de Detroit no ofrecen comida en Nueva York.” Los datos se parten por ciudad, casi sin replicar nada entre regiones.',
  },
  en: {
    cities: [
      { n: 'Detroit', d: 'Detroit’s kitchens, fridges and customers' },
      { n: 'New York', d: 'if it ever comes: its own data' },
    ],
    sheet: 'Promotions',
    sheetTag: 'spreadsheet · example',
    head: ['Campaign', 'Meal', 'Discount'],
    rows: [
      ['Green Monday', 'Bowls', '15%'],
      ['Gym 2-for-1', 'Wraps', '50%'],
      ['Subscriber+', 'Everything', '10%'],
    ],
    arrow: <>→ the system only consumes the <strong>final result</strong></>,
    why: 'They rarely change and people decide them. Syncing them between operators with distributed-consistency algorithms would be solving a problem that doesn’t exist.',
    chips: ['catalog', 'stock', 'orders'],
    note: '“Ghost kitchens in Detroit won’t offer meals in New York City.” Data is split by city, with almost nothing replicated across regions.',
  },
});

export function Partition({ reduced }: SceneProps) {
  const t = useT(PARTITION);
  const cities = t.cities;
  return (
    <div className="part">
      <motion.section className="vcard part__sheet" initial={{ opacity: 0, x: reduced ? 0 : -14 }} animate={{ opacity: 1, x: 0 }}>
        <header><FileSpreadsheet size={18} aria-hidden /> <strong>{t.sheet}</strong> <span className="mono">{t.sheetTag}</span></header>
        <table>
          <thead><tr>{t.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
          <tbody>
            {t.rows.map((r, i) => (
              <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
        <p className="part__arrow">{t.arrow}</p>
        <p className="part__why">{t.why}</p>
      </motion.section>
      <motion.section className="part__cities" initial={{ opacity: 0, x: reduced ? 0 : 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
        {cities.map((c, i) => (
          <div key={i} className={`vcard part__city ${i ? 'is-future' : ''}`}>
            <header><MapPin size={16} aria-hidden /> <strong>{c.n}</strong></header>
            <div className="part__chips">
              {t.chips.map((ch, j) => <span key={j}>{ch}</span>)}
            </div>
            <p>{c.d}</p>
          </div>
        ))}
        <p className="part__note">{t.note}</p>
      </motion.section>
    </div>
  );
}

/* ───────────────────────── journey: the rainy day ───────────────────────── */
type JourneyLane = 'sus' | 'hel' | 'fb' | 'ord' | 'not';
const JL: { k: JourneyLane; y: number }[] = [
  { k: 'sus', y: 80 },
  { k: 'hel', y: 180 },
  { k: 'fb', y: 280 },
  { k: 'ord', y: 380 },
  { k: 'not', y: 470 },
];

const JOURNEY = defineStrings({
  es: {
    lanes: { sus: 'Suscriptor', hel: 'Heladera', fb: 'Reclamos', ord: 'Órdenes', not: 'Notificaciones' } as Record<JourneyLane, string>,
    caps: [
      'El suscriptor ingresa su código de acceso en la heladera.',
      '¿Código válido? Si no, reintenta. Por eso los códigos también viven en su teléfono: nadie queda atrapado en el loop.',
      'El código es válido… pero la vianda queda <strong>físicamente trabada</strong>. Ningún software empuja la bandeja.',
      'Desde la app, el suscriptor saca una <strong>foto</strong> y registra el reclamo.',
      'Una persona, un administrador, revisa la evidencia y <strong>aprueba el reclamo</strong>.',
      'El sistema de órdenes registra la compensación: <strong>una orden nueva</strong> (o un cupón).',
      'La notificación cierra el círculo: el suscriptor se entera de que su reclamo fue aprobado.',
    ],
    title: 'Subscribed user cannot pick up the meal',
    physical: 'Falla física',
    human: 'Decisión humana',
    canvas: 'Journey del error: el suscriptor ingresa su código, la vianda se traba, reclama con foto, un administrador aprueba, se crea una orden nueva y se lo notifica',
    enters: 'Ingresa su código',
    valid: '¿válido?',
    retry: 'no: reintentar',
    yes: 'sí',
    stuck: 'La vianda se traba',
    stuckSub: 'falla física',
    photo: 'Foto + reclamo',
    admin: 'Admin aprueba',
    adminSub: 'persona, no software',
    newOrder: 'Orden nueva',
    newOrderSub: 'o un cupón',
    approved: 'Aprobado',
    compensated: 'Compensado',
  },
  en: {
    lanes: { sus: 'Subscriber', hel: 'Fridge', fb: 'Feedback', ord: 'Orders', not: 'Notifications' },
    caps: [
      'The subscriber enters their access code at the fridge.',
      'Is the code valid? If not, they retry. That’s why the codes also live on their phone: nobody gets stuck in the loop.',
      'The code is valid… but the meal is <strong>physically stuck</strong>. No software can push the tray.',
      'From the app, the subscriber takes a <strong>photo</strong> and files the complaint.',
      'A person, an administrator, reviews the evidence and <strong>approves the complaint</strong>.',
      'The ordering system records the compensation: <strong>a new order</strong> (or a coupon).',
      'The notification closes the loop: the subscriber learns that their complaint was approved.',
    ],
    title: 'Subscribed user cannot pick up the meal',
    physical: 'Physical failure',
    human: 'Human decision',
    canvas: 'Error journey: the subscriber enters their code, the meal gets stuck, they file a complaint with a photo, an administrator approves it, a new order is created and the subscriber is notified',
    enters: 'Enters their code',
    valid: 'valid?',
    retry: 'no: retry',
    yes: 'yes',
    stuck: 'Meal gets stuck',
    stuckSub: 'physical failure',
    photo: 'Photo + complaint',
    admin: 'Admin approves',
    adminSub: 'a person, not software',
    newOrder: 'New order',
    newOrderSub: 'or a coupon',
    approved: 'Approved',
    compensated: 'Settled',
  },
});

export function Journey({ reduced }: SceneProps) {
  const t = useT(JOURNEY);
  const s = usePhases(t.caps.length, { interval: 3400, reduced });
  const p = s.phase;
  const on = (i: number) => p >= i;
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'danger', label: t.physical }, { tone: 'accent', label: t.human }]} />}
      foot={<Stepper phase={p} count={t.caps.length} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}
    >
      <Canvas w={960} h={520} label={t.canvas}>
        {(ids) => (
          <>
            {JL.map((l, i) => (
              <g key={l.k}>
                <rect x={0} y={l.y - 44} width={960} height={i === JL.length - 1 ? 84 : 100} fill={i % 2 ? 'transparent' : 'var(--bg-grid)'} />
                <text x={14} y={l.y + 4} className="lb lb--muted" style={{ fontSize: 10.5 }}>{t.lanes[l.k]}</text>
              </g>
            ))}
            <Node x={250} y={80} w={160} h={56} icon={KeyRound} label={t.enters} show={on(0)} highlight={p === 0} />
            <Edge points={[[250, 108], [250, 150]]} show={on(1)} tone="plain" marker={ids.arrow} />
            {/* diamond */}
            <motion.g initial={false} animate={{ opacity: on(1) ? 1 : 0 }}>
              <polygon points="250,146 312,180 250,214 188,180" className={`nd ${p === 1 ? 'is-hl' : ''}`} />
              <text x={250} y={184} textAnchor="middle" style={{ fontSize: 12.5, fontWeight: 650, fill: 'var(--text)' }}>{t.valid}</text>
            </motion.g>
            <Edge points={[[188, 180], [150, 180], [150, 80], [166, 80]]} show={on(1)} tone="muted" dashed marker={ids.arrow} />
            <Label x={146} y={134} anchor="end" show={on(1)} size={10}>{t.retry}</Label>
            <Edge points={[[312, 180], [352, 180]]} show={on(2)} tone="plain" marker={ids.arrow} />
            <Label x={330} y={170} show={on(2)} size={10}>{t.yes}</Label>
            <Node x={440} y={180} w={170} h={60} kind="danger" icon={AlertTriangle} label={t.stuck} sub={t.stuckSub} show={on(2)} highlight={p === 2} />
            <Edge points={[[440, 150], [440, 110]]} show={on(3)} tone="danger" marker={ids.arrowDanger} />
            <Node x={440} y={80} w={170} h={56} icon={Camera} label={t.photo} show={on(3)} highlight={p === 3} />
            <Edge points={[[525, 80], [620, 80], [620, 248]]} show={on(4)} tone="plain" marker={ids.arrow} />
            <Node x={620} y={280} w={180} h={60} kind="core" icon={UserCog} label={t.admin} sub={t.adminSub} show={on(4)} highlight={p === 4} />
            <Edge points={[[710, 280], [770, 280], [770, 348]]} show={on(5)} tone="cmd" marker={ids.arrowCmd} />
            <Node x={770} y={380} w={160} h={56} kind="cmp" icon={Inbox} label={t.newOrder} sub={t.newOrderSub} show={on(5)} highlight={p === 5} />
            <Edge points={[[850, 380], [870, 380], [870, 443]]} show={on(6)} tone="evt" marker={ids.arrowEvt} />
            <Node x={870} y={470} w={140} h={50} kind="evt" icon={Bell} label={t.approved} show={on(6)} highlight={p === 6} />
                        <Edge points={[[940, 470], [954, 470], [954, 80], [872, 80]]} show={on(6)} tone="evt" dashed marker={ids.arrowEvt} />
            <Node x={790} y={80} w={160} h={48} kind="evt" icon={Check} label={t.compensated} show={on(6)} />
          </>
        )}
      </Canvas>
    </Frame>
  );
}
