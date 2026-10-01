import { useEffect, useMemo, useState } from 'react';
import { animate, motion } from 'motion/react';
import {
  ChefHat, Refrigerator, Store, User, UserCheck, CalendarCheck, Smartphone, Server, CreditCard, BookOpenCheck,
  Truck, Cpu, PackageX, Apple, Wheat, UserRound, MapPin, HeartPulse,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, type SceneProps, EASE } from './kit';
import { defineStrings } from '../i18n/ui';
import { useLocale, useT } from '../i18n/react';

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  es: {
    mission: {
      tags: ['Diabetes', 'Celiaquía', 'Dietas prescriptas'],
      quote: <>“Que la comida<br />sea tu <span>medicina</span>”</>,
      eq: ['Comida saludable y a medida', 'precio de comida rápida', 'sin restaurantes'],
    },
    eco: {
      info: {
        fridge: '<strong>Heladeras de Byte Technology.</strong> Informan el stock y cobran al cerrarse la puerta. La plataforma consume su API; su firmware no es asunto del arquitecto.',
        kiosk: '<strong>Kioscos con cajero.</strong> Un cajero registra las ventas en Toast POS, incluidas las del ocasional que paga en efectivo.',
        app: '<strong>App web y móvil.</strong> Donde conocidos y suscriptores navegan el catálogo, reservan y pagan.',
        platform: '<strong>Plataforma Central de Órdenes.</strong> Lo único que se construye: catálogo, órdenes, pagos y reportes, en el medio de todo.',
        kitchen: '<strong>Cocinas.</strong> Reciben por ChefTec la lista consolidada de lo que deben cocinar.',
        stripe: '<strong>Stripe.</strong> Procesa los cobros digitales de la app.',
        books: '<strong>QuickBooks.</strong> La contabilidad oficial de la empresa.',
      } as Record<string, string>,
      titlePhysical: 'El mundo físico',
      titleUsers: 'Quién compra y dónde',
      titleStake: 'A quién más le importa',
      titleScope: 'Qué entra y qué no',
      titleContext: 'Diagrama de contexto',
      legendBuilt: 'Se construye',
      legendExisting: 'Ya existía (restricción)',
      hint: 'Pasá el cursor o tocá cualquier pieza para repasarla.',
      canvas: 'Diagrama del ecosistema de Farmacy Food',
      scope: 'Alcance del kata',
      colInputs: 'Canales de entrada',
      colExisting: 'Sistemas que ya existían',
      colBuilt: 'Lo que se construye',
      batches: 'viandas por lotes',
      cycles: '1 o 2 ciclos de cocina por día',
      batchMorning: 'Lote mañana',
      batchAfternoon: 'Lote tarde',
      noDining: 'Sin salón: cocina solo para despacho y retiro',
      cash: 'efectivo',
      unseen: 'el sistema central no se entera',
      kitchens: 'Cocinas',
      ghostKitchen: 'Ghost kitchen',
      kitchenSub: 'cocina por lotes · ChefTec',
      kitchenAria: 'Cocinas, ChefTec',
      fridges: 'Heladeras',
      smartFridge: 'Heladera inteligente',
      fridgeApi: 'API de Byte Technology',
      fridgeSub: 'Byte · RFID · cobro al cerrar',
      fridgeAria: 'Heladeras, API de Byte Technology',
      kiosks: 'Kioscos',
      staffedKiosk: 'Kiosco con cajero',
      kioskApi: 'API de Toast POS',
      kioskSub: 'venta asistida · Toast POS',
      kioskAria: 'Kioscos, API de Toast POS',
      known: 'Conocido',
      knownSub: 'cuenta + tarjeta',
      subscriber: 'Suscriptor',
      subscriberSub: 'menú semanal prepago',
      occasional: 'Ocasional',
      occasionalSub: 'efectivo, sin cuenta',
      cashier: 'Cajero',
      cashierSub: 'registra ventas en Toast',
      nutritionists: 'Nutricionistas',
      nutritionistsSub: 'buscan por nutriente',
      suppliers: 'Proveedores',
      suppliersSub: 'quieren prever compras',
      app: 'App web y móvil',
      appSub: 'conocidos y suscriptores',
      platform: 'Plataforma Central de Órdenes',
      platformSub: 'catálogo · órdenes · pagos · reportes',
      payments: 'Pagos',
      paymentsAria: 'Pagos, Stripe',
      accounting: 'Contabilidad',
      accountingAria: 'Contabilidad, QuickBooks',
      outOfScope: 'Fuera de alcance, por escrito en el pliego',
      trucks: 'Logística de camionetas',
      firmware: 'Firmware de heladeras',
      nonPurchase: 'Movimientos sin compra',
    },
    stats: [
      { label: 'locaciones piloto en el día 1', sub: 'en Detroit' },
      { label: 'comidas por semana al empezar', sub: 'unas 42 por día, en toda la ciudad' },
      { label: 'locaciones como meta a 12 meses', sub: 'y 1.000 suscriptores' },
      { label: 'peticiones por segundo', sub: 'menos de una por minuto en hora pico' },
    ],
    rate: {
      title: 'Un día de ventas en toda la ciudad',
      legend: '1 punto = 1 comida vendida',
      canvas: 'Línea de tiempo de un día con 42 ventas distribuidas y un segundo ampliado vacío',
      axis: '42 ventas · 24 horas · 86.400 segundos',
      second: '1 segundo, en plena hora pico',
      zero: '0 ventas',
      math: '42 ÷ 86.400 ≈ 0,0005 comidas por segundo',
      peak: 'Aun en hora pico, el tráfico web queda en menos de una petición por minuto.',
      prompt: 'Elegí una respuesta a la izquierda para ampliar un segundo cualquiera.',
    },
    growth: {
      bars: [
        { label: 'Hoy', txt: '~300 comidas por semana' },
        { label: 'Meta a un año', txt: '1.500 a 2.000 por semana' },
        { label: '1.000 suscriptores', txt: '1.000 × ~10 comidas = ~10.000 por semana' },
      ],
      locs: ['Día 1', '2021', 'Meta 12 meses'],
      locations: 'Locaciones',
      volume: 'Volumen semanal contra una vara de referencia',
      ref: <><strong className="mono">604.800</strong> por semana = <strong>una</strong> petición por segundo, sostenida</>,
      note: 'Ni la barra más grande llega al 2% de la vara. Una comida puede generar varias peticiones, pero la escala sigue siendo otra.',
    },
  },
  en: {
    mission: {
      tags: ['Diabetes', 'Celiac disease', 'Prescribed diets'],
      quote: <>“Let food<br />be thy <span>medicine</span>”</>,
      eq: ['Healthy, tailored food', 'fast-food prices', 'no restaurants'],
    },
    eco: {
      info: {
        fridge: '<strong>Byte Technology fridges.</strong> They report stock and charge when the door closes. The platform consumes their API; their firmware is not the architect’s concern.',
        kiosk: '<strong>Staffed kiosks.</strong> A cashier records sales in Toast POS, including those of the occasional user who pays cash.',
        app: '<strong>Web and mobile app.</strong> Where known users and subscribers browse the catalog, reserve and pay.',
        platform: '<strong>Central Ordering Platform.</strong> The only thing that gets built: catalog, orders, payments and reporting, in the middle of everything.',
        kitchen: '<strong>Kitchens.</strong> They receive, through ChefTec, the consolidated list of what they need to cook.',
        stripe: '<strong>Stripe.</strong> Processes the app’s digital payments.',
        books: '<strong>QuickBooks.</strong> The company’s official accounting.',
      },
      titlePhysical: 'The physical world',
      titleUsers: 'Who buys, and where',
      titleStake: 'Who else cares',
      titleScope: 'What is in and what is out',
      titleContext: 'Context diagram',
      legendBuilt: 'Gets built',
      legendExisting: 'Already existed (constraint)',
      hint: 'Hover over or tap any piece to review it.',
      canvas: 'Farmacy Food ecosystem diagram',
      scope: 'Kata scope',
      colInputs: 'Input channels',
      colExisting: 'Systems that already existed',
      colBuilt: 'What gets built',
      batches: 'meals in batches',
      cycles: '1 or 2 cooking cycles per day',
      batchMorning: 'Morning batch',
      batchAfternoon: 'Afternoon batch',
      noDining: 'No dining room: cooks only for delivery and pickup',
      cash: 'cash',
      unseen: 'the central system never finds out',
      kitchens: 'Kitchens',
      ghostKitchen: 'Ghost kitchen',
      kitchenSub: 'batch cooking · ChefTec',
      kitchenAria: 'Kitchens, ChefTec',
      fridges: 'Fridges',
      smartFridge: 'Smart fridge',
      fridgeApi: 'Byte Technology API',
      fridgeSub: 'Byte · RFID · charge on close',
      fridgeAria: 'Fridges, Byte Technology API',
      kiosks: 'Kiosks',
      staffedKiosk: 'Staffed kiosk',
      kioskApi: 'Toast POS API',
      kioskSub: 'assisted sales · Toast POS',
      kioskAria: 'Kiosks, Toast POS API',
      known: 'Known user',
      knownSub: 'account + card',
      subscriber: 'Subscriber',
      subscriberSub: 'prepaid weekly menu',
      occasional: 'Occasional user',
      occasionalSub: 'cash, no account',
      cashier: 'Cashier',
      cashierSub: 'records sales in Toast',
      nutritionists: 'Nutritionists',
      nutritionistsSub: 'search by nutrient',
      suppliers: 'Suppliers',
      suppliersSub: 'want to forecast purchases',
      app: 'Web and mobile app',
      appSub: 'known users, subscribers',
      platform: 'Central Ordering Platform',
      platformSub: 'catalog · orders · payments · reporting',
      payments: 'Payments',
      paymentsAria: 'Payments, Stripe',
      accounting: 'Accounting',
      accountingAria: 'Accounting, QuickBooks',
      outOfScope: 'Out of scope, in writing in the brief',
      trucks: 'Truck logistics',
      firmware: 'Fridge firmware',
      nonPurchase: 'Non-purchase movements',
    },
    stats: [
      { label: 'pilot locations on day 1', sub: 'in Detroit' },
      { label: 'meals per week at the start', sub: 'about 42 a day, across the whole city' },
      { label: 'locations as the 12-month target', sub: 'and 1,000 subscribers' },
      { label: 'requests per second', sub: 'less than one per minute at peak time' },
    ],
    rate: {
      title: 'One day of sales across the whole city',
      legend: '1 dot = 1 meal sold',
      canvas: 'Timeline of one day with 42 sales spread across it and one zoomed-in second that is empty',
      axis: '42 sales · 24 hours · 86,400 seconds',
      second: '1 second, right at peak time',
      zero: '0 sales',
      math: '42 ÷ 86,400 ≈ 0.0005 meals per second',
      peak: 'Even at peak time, web traffic stays below one request per minute.',
      prompt: 'Pick an answer on the left to zoom into any single second.',
    },
    growth: {
      bars: [
        { label: 'Today', txt: '~300 meals per week' },
        { label: 'One-year target', txt: '1,500 to 2,000 per week' },
        { label: '1,000 subscribers', txt: '1,000 × ~10 meals = ~10,000 per week' },
      ],
      locs: ['Day 1', '2021', '12-month target'],
      locations: 'Locations',
      volume: 'Weekly volume against a reference yardstick',
      ref: <><strong className="mono">604,800</strong> per week = <strong>one</strong> request per second, sustained</>,
      note: 'Not even the largest bar reaches 2% of the yardstick. One meal can generate several requests, but the scale is in a different league.',
    },
  },
});

/* ───────────────────────── mission ───────────────────────── */
export function Mission({ reduced }: SceneProps) {
  const t = useT(S).mission;
  const tags = [
    { icon: HeartPulse, t: t.tags[0] },
    { icon: Wheat, t: t.tags[1] },
    { icon: Apple, t: t.tags[2] },
  ];
  return (
    <div className="mission">
      <motion.p className="mission__place mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <MapPin size={14} aria-hidden /> Detroit, Michigan · 2020
      </motion.p>
      <motion.blockquote
        className="mission__quote"
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      >
        {t.quote}
      </motion.blockquote>
      <div className="mission__tags">
        {tags.map((x, i) => (
          <motion.span key={i} className="mission__tag" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.1 }}>
            <x.icon size={15} aria-hidden /> {x.t}
          </motion.span>
        ))}
      </div>
      <motion.div className="mission__eq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <span>{t.eq[0]}</span>
        <span className="mission__plus">+</span>
        <span>{t.eq[1]}</span>
        <span className="mission__plus">+</span>
        <span>{t.eq[2]}</span>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── ecosystem (morphing context diagram) ───────────────────────── */
const PHYS = ['kitchen', 'fridge', 'kiosk', 'users', 'stakeholders'];
type P = { x: number; y: number };

export function Ecosystem({ state = 'kitchen', reduced }: SceneProps) {
  const t = useT(S).eco;
  const phys = PHYS.includes(state);
  const step = PHYS.indexOf(state);
  const showFridge = !phys || step >= 1;
  const showKiosk = !phys || step >= 2;
  const showUsers = phys && step >= 3;
  const showStake = phys && step >= 4;
  const soft = state === 'systems' || state === 'scope' || state === 'complete';
  const scope = state === 'scope';
  const complete = state === 'complete';
  const [hover, setHover] = useState<string | null>(null);
  useEffect(() => setHover(null), [state]);

  const pos: Record<string, P> = phys
    ? { kitchen: state === 'kitchen' ? { x: 480, y: 270 } : { x: 170, y: 300 }, fridge: { x: 500, y: 170 }, kiosk: { x: 500, y: 430 } }
    : { kitchen: { x: 800, y: 150 }, fridge: { x: 160, y: 150 }, kiosk: { x: 160, y: 290 } };

  const hl = (k: string) => (state === k ? true : hover === k);
  const enter = complete ? (k: string) => () => setHover(k) : () => undefined;

  const title =
    state === 'kitchen' || state === 'fridge' || state === 'kiosk'
      ? t.titlePhysical
      : state === 'users'
        ? t.titleUsers
        : state === 'stakeholders'
          ? t.titleStake
          : state === 'scope'
            ? t.titleScope
            : t.titleContext;

  const legend = soft ? (
    <Legend items={[{ tone: 'accent', label: t.legendBuilt }, { tone: 'ext', label: t.legendExisting }]} />
  ) : undefined;

  return (
    <Frame
      title={title}
      legend={legend}
      foot={
        complete ? (
          <div className="eco-info" aria-live="polite">
            {hover ? <span dangerouslySetInnerHTML={{ __html: t.info[hover] }} /> : <span className="eco-info__hint">{t.hint}</span>}
          </div>
        ) : undefined
      }
    >
      <Canvas w={960} h={600} label={t.canvas}>
        {(ids) => (
          <>
            {/* scope boundary */}
            <motion.rect x={24} y={34} width={912} height={446} rx={18} className="zone zone--accent" initial={false} animate={{ opacity: scope ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <Label x={40} y={26} anchor="start" tone="accent" show={scope}>{t.scope}</Label>

            {/* column labels, software view */}
            <Label x={160} y={80} show={soft}>{t.colInputs}</Label>
            <Label x={800} y={80} show={soft}>{t.colExisting}</Label>
            <Label x={480} y={196} tone="accent" show={soft}>{t.colBuilt}</Label>

            {/* physical edges: food flow */}
            <Edge points={[[272, 300], [330, 300], [330, 170], [386, 170]]} show={phys && showFridge} tone="muted" marker={ids.arrow} />
            <Edge points={[[272, 300], [330, 300], [330, 430], [386, 430]]} show={phys && showKiosk} tone="muted" marker={ids.arrow} delay={0.1} />
            {phys && step <= 2 && (
              <>
                <Label x={322} y={236} anchor="end" show={step >= 1}>{t.batches}</Label>
                {showFridge && <Packet reduced={reduced} tone="cmp" points={[[272, 300], [330, 300], [330, 170], [386, 170]]} duration={2.2} repeat repeatDelay={0.8} />}
                {showKiosk && <Packet reduced={reduced} tone="cmp" points={[[272, 300], [330, 300], [330, 430], [386, 430]]} duration={2.2} delay={1.1} repeat repeatDelay={0.8} />}
              </>
            )}

            {/* batch cycles, kitchen-only state */}
            <Label x={480} y={352} show={state === 'kitchen'} delay={0.3}>{t.cycles}</Label>
            {[0, 1].map((k) => (
              <motion.g key={k} initial={false} animate={{ opacity: state === 'kitchen' ? 1 : 0 }} transition={{ delay: state === 'kitchen' ? 0.45 + k * 0.2 : 0 }}>
                <rect x={330 + k * 160} y={372} width={140} height={40} rx={10} className="nd nd--cmp" />
                <text x={400 + k * 160} y={397} textAnchor="middle" className="pk-t">{k === 0 ? t.batchMorning : t.batchAfternoon}</text>
              </motion.g>
            ))}
            <Label x={480} y={452} tone="text" size={13} show={state === 'kitchen'} delay={0.8}>{t.noDining}</Label>

            {/* user edges */}
            <Edge points={[[728, 110], [680, 110], [680, 160], [614, 160]]} show={showUsers} tone="cmd" marker={ids.arrowCmd} delay={0.2} />
            <Edge points={[[728, 240], [680, 240], [680, 180], [614, 180]]} show={showUsers} tone="cmd" marker={ids.arrowCmd} delay={0.3} />
            <Edge points={[[728, 430], [614, 430]]} show={showUsers} tone="danger" dashed marker={ids.arrowDanger} delay={0.4} />
            <Label x={670} y={420} tone="danger" show={showUsers} delay={0.5}>{t.cash}</Label>
            <Label x={830} y={488} tone="danger" show={state === 'users'} delay={0.7} size={10.5}>{t.unseen}</Label>
            <Edge points={[[500, 468], [500, 512]]} show={showStake} tone="muted" delay={0.1} />

            {/* software edges */}
            <Edge points={[[262, 150], [310, 150], [310, 262], [358, 262]]} show={soft} tone="plain" marker={ids.arrow} delay={0.3} />
            <Edge points={[[262, 290], [358, 290]]} show={soft} tone="plain" marker={ids.arrow} delay={0.35} />
            <Edge points={[[262, 430], [310, 430], [310, 318], [358, 318]]} show={soft} tone="plain" marker={ids.arrow} delay={0.4} />
            <Edge points={[[602, 262], [650, 262], [650, 150], [698, 150]]} show={soft} tone="plain" marker={ids.arrow} delay={0.45} />
            <Edge points={[[602, 290], [698, 290]]} show={soft} tone="plain" marker={ids.arrow} delay={0.5} />
            <Edge points={[[602, 318], [650, 318], [650, 430], [698, 430]]} show={soft} tone="plain" marker={ids.arrow} delay={0.55} />

            {/* nodes that morph between both views */}
            <Node {...pos.kitchen} w={204} h={72} kind={soft ? 'ext' : 'cmp'} icon={ChefHat} label={soft ? t.kitchens : t.ghostKitchen} sub={soft ? 'ChefTec' : t.kitchenSub} highlight={hl('kitchen')} onEnter={complete ? enter('kitchen') : undefined} ariaLabel={t.kitchenAria} />
            <Node {...pos.fridge} w={soft ? 204 : 224} h={72} kind={soft ? 'ext' : 'cmp'} icon={Refrigerator} label={soft ? t.fridges : t.smartFridge} sub={soft ? t.fridgeApi : t.fridgeSub} show={showFridge} highlight={hl('fridge')} onEnter={complete ? enter('fridge') : undefined} ariaLabel={t.fridgeAria} />
            <Node {...pos.kiosk} w={soft ? 204 : 224} h={72} kind={soft ? 'ext' : 'cmp'} icon={Store} label={soft ? t.kiosks : t.staffedKiosk} sub={soft ? t.kioskApi : t.kioskSub} show={showKiosk} highlight={hl('kiosk')} onEnter={complete ? enter('kiosk') : undefined} ariaLabel={t.kioskAria} />

            {/* users */}
            <Node x={830} y={110} w={200} h={64} icon={UserCheck} label={t.known} sub={t.knownSub} show={showUsers} delay={0.05} />
            <Node x={830} y={240} w={200} h={64} icon={CalendarCheck} label={t.subscriber} sub={t.subscriberSub} show={showUsers} delay={0.12} />
            <Node x={830} y={430} w={200} h={64} icon={User} label={t.occasional} sub={t.occasionalSub} show={showUsers} delay={0.19} highlight={state === 'users'} />

            {/* stakeholders */}
            <Node x={500} y={544} w={204} h={60} icon={UserRound} label={t.cashier} sub={t.cashierSub} show={showStake} highlight={state === 'stakeholders'} />
            <Node x={170} y={110} w={210} h={60} kind="muted" icon={Apple} label={t.nutritionists} sub={t.nutritionistsSub} show={showStake} delay={0.1} highlight={state === 'stakeholders'} />
            <Node x={170} y={490} w={210} h={60} kind="muted" icon={Truck} label={t.suppliers} sub={t.suppliersSub} show={showStake} delay={0.2} highlight={state === 'stakeholders'} />

            {/* software-only nodes */}
            <Node x={160} y={430} w={204} h={72} icon={Smartphone} label={t.app} sub={t.appSub} show={soft} delay={0.2} highlight={hl('app')} onEnter={complete ? enter('app') : undefined} ariaLabel={t.app} />
            <Node x={480} y={290} w={244} h={120} kind="core" icon={Server} label={t.platform} sub={t.platformSub} show={soft} delay={0.1} highlight={state === 'systems' || hl('platform')} onEnter={complete ? enter('platform') : undefined} ariaLabel={t.platform} />
            <Node x={800} y={290} w={204} h={72} kind="ext" icon={CreditCard} label={t.payments} sub="Stripe" show={soft} delay={0.25} highlight={hl('stripe')} onEnter={complete ? enter('stripe') : undefined} ariaLabel={t.paymentsAria} />
            <Node x={800} y={430} w={204} h={72} kind="ext" icon={BookOpenCheck} label={t.accounting} sub="QuickBooks" show={soft} delay={0.3} highlight={hl('books')} onEnter={complete ? enter('books') : undefined} ariaLabel={t.accountingAria} />

            {/* out of scope */}
            <Label x={480} y={516} tone="danger" show={scope} delay={0.2}>{t.outOfScope}</Label>
            <Node x={180} y={560} w={250} h={54} kind="muted" icon={Truck} label={t.trucks} show={scope} delay={0.3} crossed />
            <Node x={480} y={560} w={250} h={54} kind="muted" icon={Cpu} label={t.firmware} show={scope} delay={0.4} crossed />
            <Node x={780} y={560} w={250} h={54} kind="muted" icon={PackageX} label={t.nonPurchase} show={scope} delay={0.5} crossed />

            {complete && !reduced && (
              <>
                <Packet reduced={reduced} tone="cmd" points={[[262, 150], [310, 150], [310, 262], [358, 262]]} duration={1.6} repeat repeatDelay={2.4} />
                <Packet reduced={reduced} tone="cmd" points={[[262, 430], [310, 430], [310, 318], [358, 318]]} duration={1.6} delay={1.3} repeat repeatDelay={2.4} />
                <Packet reduced={reduced} tone="evt" points={[[602, 262], [650, 262], [650, 150], [698, 150]]} duration={1.6} delay={0.8} repeat repeatDelay={2.4} />
                <Packet reduced={reduced} tone="evt" points={[[602, 290], [698, 290]]} duration={1.4} delay={2} repeat repeatDelay={2.6} />
              </>
            )}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── stats ───────────────────────── */
function CountUp({ to, prefix = '', reduced, delay = 0 }: { to: number; prefix?: string; reduced: boolean; delay?: number }) {
  const locale = useLocale();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) return setV(to);
    const c = animate(0, to, { duration: 1.1, delay, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to, reduced, delay]);
  return (
    <>
      {prefix}
      {v.toLocaleString(locale === 'es' ? 'es-AR' : 'en-US')}
    </>
  );
}

export function Stats({ reduced }: SceneProps) {
  const t = useT(S).stats;
  const items = [
    { v: 2, p: '', ...t[0], key: false },
    { v: 300, p: '~', ...t[1], key: false },
    { v: 68, p: '', ...t[2], key: false },
    { v: 0, p: '~', ...t[3], key: true },
  ];
  return (
    <div className="stats">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className={`stat ${it.key ? 'stat--key' : ''}`}
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
        >
          <div className="stat__v mono">
            <CountUp to={it.v} prefix={it.p} reduced={reduced} delay={i * 0.12} />
          </div>
          <div className="stat__l">{it.label}</div>
          <div className="stat__s">{it.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────────── rate (the arithmetic) ───────────────────────── */
function seeded(n: number) {
  let s = 20201029;
  const r = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  // sales cluster around lunch (12-14h) and early dinner (18-20h)
  return Array.from({ length: n }, (_, i) => {
    const u = r();
    const base = u < 0.55 ? 11.5 + r() * 3 : u < 0.85 ? 17.5 + r() * 3 : 8 + r() * 14;
    return { h: Math.min(23.9, Math.max(7, base)), lane: r(), i };
  });
}

export function Rate({ chosen, props, reduced }: SceneProps) {
  const t = useT(S).rate;
  const revealed = chosen !== null && chosen === (props?.correct ?? -1);
  const dots = useMemo(() => seeded(42), []);
  const X0 = 70, X1 = 900, Y = 170;
  const hx = (h: number) => X0 + (h / 24) * (X1 - X0);
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'cmp', label: t.legend }]} />}>
      <Canvas w={960} h={560} label={t.canvas}>
        {() => (
          <>
            <rect x={X0} y={Y - 70} width={X1 - X0} height={140} rx={12} className="zone-fill" />
            {Array.from({ length: 25 }, (_, h) => (
              <g key={h}>
                <line x1={hx(h)} x2={hx(h)} y1={Y + 70} y2={Y + (h % 6 === 0 ? 82 : 76)} stroke="var(--line-strong)" />
                {h % 3 === 0 && <text x={hx(h)} y={Y + 98} textAnchor="middle" className="lb lb--muted" style={{ fontSize: 11 }}>{String(h).padStart(2, '0')}h</text>}
              </g>
            ))}
            {dots.map((d, k) => (
              <motion.circle
                key={d.i}
                cx={hx(d.h)}
                cy={Y - 52 + d.lane * 104}
                r={6}
                fill="var(--cmp)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: reduced ? 0 : 0.2 + k * 0.035, duration: 0.3 }}
              />
            ))}
            <text x={X0} y={Y - 84} className="lb lb--muted" style={{ fontSize: 11 }}>{t.axis}</text>

            {/* zoom into one second at peak */}
            <motion.g initial={false} animate={{ opacity: revealed ? 1 : 0.0 }} transition={{ duration: 0.5 }}>
              <path d={`M ${hx(12.9)} ${Y + 70} L 330 330 M ${hx(12.92)} ${Y + 70} L 630 330`} stroke="var(--accent)" strokeWidth={1.4} strokeDasharray="4 5" fill="none" />
              <rect x={hx(12.9) - 2} y={Y - 72} width={6} height={144} fill="var(--accent)" opacity={0.5} rx={2} />
              <rect x={330} y={330} width={300} height={110} rx={14} fill="var(--surface)" stroke="var(--accent)" strokeWidth={1.8} />
              <text x={480} y={362} textAnchor="middle" className="lb lb--accent" style={{ fontSize: 11 }}>{t.second}</text>
              <text x={480} y={412} textAnchor="middle" style={{ fontSize: 34, fontWeight: 700, fill: 'var(--text)' }}>{t.zero}</text>
            </motion.g>
            <motion.g initial={false} animate={{ opacity: revealed ? 1 : 0 }} transition={{ duration: 0.5, delay: revealed ? 0.3 : 0 }}>
              <text x={480} y={486} textAnchor="middle" style={{ fontSize: 17, fill: 'var(--text-2)' }}>{t.math}</text>
              <text x={480} y={516} textAnchor="middle" style={{ fontSize: 15, fill: 'var(--text-3)' }}>{t.peak}</text>
            </motion.g>
            <motion.text x={480} y={400} textAnchor="middle" initial={false} animate={{ opacity: revealed ? 0 : 1 }} style={{ fontSize: 16, fill: 'var(--text-3)' }}>
              {t.prompt}
            </motion.text>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── growth ───────────────────────── */
export function Growth({ reduced }: SceneProps) {
  const t = useT(S).growth;
  const REF = 604800;
  const bars = [
    { ...t.bars[0], v: 300 },
    { ...t.bars[1], v: 2000 },
    { ...t.bars[2], v: 10000 },
  ];
  const locs = [
    { label: t.locs[0], n: 2 },
    { label: t.locs[1], n: 8 },
    { label: t.locs[2], n: 68 },
  ];
  return (
    <div className="growth">
      <section className="vcard">
        <h3 className="growth__h mono">{t.locations}</h3>
        <div className="growth__locs">
          {locs.map((l, j) => (
            <div key={j} className="growth__loc">
              <div className="growth__dots" aria-hidden>
                {Array.from({ length: 68 }, (_, i) => (
                  <motion.span
                    key={i}
                    className={i < l.n ? 'on' : ''}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduced ? 0 : j * 0.3 + (i < l.n ? i * 0.012 : 0.4) }}
                  />
                ))}
              </div>
              <div className="growth__cap"><strong className="mono">{l.n}</strong> {l.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="vcard">
        <h3 className="growth__h mono">{t.volume}</h3>
        <div className="growth__ref">
          <div className="growth__refbar" />
          <div className="growth__reftxt">
            {t.ref}
          </div>
        </div>
        {bars.map((b, i) => (
          <div key={i} className="growth__row">
            <span className="growth__lab">{b.label}</span>
            <div className="growth__track">
              <motion.div
                className="growth__bar"
                initial={{ width: 0 }}
                animate={{ width: `max(4px, ${(b.v / REF) * 100}%)` }}
                transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 0.4 + i * 0.2 }}
              />
              <span className="growth__txt">{b.txt}</span>
            </div>
          </div>
        ))}
        <p className="growth__note">{t.note}</p>
      </section>
    </div>
  );
}
