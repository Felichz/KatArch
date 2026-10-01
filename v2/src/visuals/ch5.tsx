import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BookOpen, Inbox, Heart, MessageSquare, CalendarClock, BarChart3, Bell, CreditCard, ChefHat, Smartphone, Store, ShoppingCart,
  Sparkles, Star, Filter, Refrigerator, ArrowRight, Check, X, RotateCcw, MapPin, Eye, Server, Shield, Layers, Package, Map as MapIcon,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  es: {
    caps: {
      cat: 'Catálogo de comidas',
      ord: 'Órdenes',
      loy: 'Lealtad',
      fb: 'Opiniones',
      sch: 'Agenda de cocina',
      rep: 'Reportes',
      not: 'Notificaciones',
      pay: 'Pagos',
    },
    cls: { core: 'Core', sup: 'Soporte', gen: 'Genérico' },
    sorter: {
      title: 'Clasificá cada capacidad',
      compare: 'Comparar con el equipo',
      missing: (n: number) => `Faltan ${n}`,
      score: (score: number, total: number) => <><strong className="mono">{score}/{total}</strong> como el equipo</>,
      again: 'Otra vez',
      q1: <><strong>1.</strong> ¿Esto diferencia a Farmacy Food de su competencia?</>,
      q2: <><strong>2.</strong> ¿Ya existe hecho y probado en el mercado?</>,
      groupLabel: (cap: string) => `Clasificación de ${cap}`,
    },
    domainMap: {
      title: 'Mapa estratégico de dominios',
      legendCore: 'Core: construir',
      legendSup: 'Soporte: adaptar',
      legendGen: 'Genérico: alquilar',
      canvas: 'Mapa de dominios por unicidad y complejidad: Core arriba a la derecha con lealtad, catálogo y órdenes; Soporte arriba a la izquierda con opiniones y agenda; Genérico abajo con reportes, notificaciones y pagos',
      uniqueness: 'unicidad',
      complexity: 'complejidad',
      zoneSup: 'Soporte · adaptar',
      zoneCore: 'Core · construir a medida',
      zoneGen: 'Genérico · alquilar',
    },
    acl: {
      title: 'Menu Catalog · servicio con su aduana',
      legendExt: 'Externo',
      legendCmd: 'Comando',
      legendEvt: 'Evento',
      legendDomain: 'Dominio',
      canvas: 'El dominio del catálogo, protegido por una capa anticorrupción con tres piezas de traducción; los externos solo tocan la capa, y los consumidores internos reciben comandos y eventos',
      service: 'Menu Catalog · servicio',
      layer: 'capa anticorrupción',
      translates: 'traduce',
      commands: 'comandos',
      pureDomain: 'el dominio puro',
      cons: { cart: 'Carrito', rec: 'Recomendaciones', rev: 'Reviews', fil: 'Filtrado' },
      events: 'eventos',
      toOrders: 'a Órdenes',
      lasagnas: '40 lasañas (formato ajeno)',
      internal: 'formato interno',
      stockUpdated: 'stock actualizado',
      byte: 'Heladeras Byte',
      byteSub: 'API cruda, sin eventos',
      rawData: 'datos crudos',
      catalogUpdated: 'catálogo actualizado',
      fabricates: 'la capa fabrica el evento',
    },
    wrapper: {
      title: 'Mismo instinto, dos formas',
      legendThird: 'Tercero',
      legendOwn: 'Pieza propia',
      canvas: 'Arriba, ArchColider: una capa de traducción dentro del módulo. Abajo, Myagis-Forest: un microservicio wrapper por cada sistema externo',
      archTitle: 'ArchColider · una capa dentro del módulo del monolito',
      module: 'un módulo del monolito',
      kitchen: 'Cocina',
      translation: 'Capa de traducción',
      domain: 'Dominio',
      myagisTitle: 'Myagis-Forest · ADR 004 · un wrapper por tercero',
      fridges: 'Heladeras',
      wrapperOf: (x: string) => `Wrapper ${x.toLowerCase()}`,
      microservice: 'microservicio',
      business: 'Servicios de negocio',
      standard: 'estándar interno',
    },
    facade: {
      title: 'Una sola pieza delante de muchas redes',
      legendOwn: 'Fachada propia',
      legendExt: 'Externo',
      moment: 'Momento',
      today: 'Hoy',
      tomorrow: 'Mañana, si la expansión lo exige',
      canvasLater: 'La fachada de pagos empieza a hablar directo con una red de tarjetas, paso a paso, sin que el resto del sistema cambie',
      canvasNow: 'Los módulos le hablan a una fachada de pagos propia, que hoy delega en un proveedor que conecta con todas las redes',
      orders: 'Órdenes',
      subs: 'Suscripciones',
      facadeSub: 'fachada · MSG',
      provider: 'Proveedor',
      providerSub: 'Stripe o similar',
      direct: 'integración directa, de a una red',
      charge: 'cobrar',
      footLater: 'Órdenes y Suscripciones no se enteran del cambio',
      footNow: 'ningún módulo habla directo con una red de tarjetas',
    },
    maps: {
      osm: { price: 'Gratis', pro: 'Sin costo, open source' },
      tomtom: { price: 'Gratis hasta 2.500 pedidos diarios', pro: 'Mejor navegación' },
      mapbox: { price: 'Gratis hasta 50.000 pedidos diarios', pro: 'Mapas personalizables' },
      here: { price: 'Gratis hasta 250.000 pedidos mensuales', pro: 'Mejores servicios de visualización' },
      chosen: 'elegido',
      gov: <><strong>Consecuencia aceptada:</strong> vigilar la cantidad de pedidos mes a mes para no empezar a pagar de más sin notarlo.</>,
    },
    mm: {
      names: {
        place: 'Lugar',
        ordType: 'Tipo de orden',
        promoRule: 'Regla de promoción',
        userType: 'Tipo de usuario',
        actType: 'Tipo de acción',
        ordState: 'Estado de orden',
        fbType: 'Tipo de feedback',
        promoType: 'Tipo de promoción',
        mealType: 'Tipo de comida',
        user: 'Usuario',
        act: 'Acción',
        order: 'Orden',
        fb: 'Feedback',
        sched: 'Agenda',
        promo: 'Promoción',
        menu: 'Menú',
        gk: 'Ghost Kitchen',
        meal: 'Comida',
      },
      /** the Spanish UI shows the team's original English name next to each box */
      showOriginal: true,
      mealTypeVal: 'con jerarquía propia',
      verbs: {
        'userType>actType': 'puede hacer',
        'actType>ordState': 'impacta',
        'ordState>ordType': 'depende de',
        'ordType>promoType': 'puede tener',
        'promoRule>promoType': 'define',
        'promoType>mealType': 'se aplica a',
        'place>actType': 'sitúa',
        'userType>user': 'describe',
        'actType>act': 'limita',
        'ordState>order': 'controla',
        'fbType>fb': '',
        'promoType>promo': 'describe',
        'mealType>meal': 'describe',
        'user>act': 'realiza',
        'act>order': 'se aplica a',
        'fb>order': 'basado en',
        'order>sched': 'se ejecuta según',
        'order>menu': 'formada por',
        'promo>menu': 'aplica a ítems',
        'menu>meal': 'formado por',
        'gk>menu': 'provee',
      },
      promoCap: [
        'Arriba, una <strong>regla de promoción</strong> define un <strong>tipo de promoción</strong>.',
        'Ese tipo se aplica a <strong>tipos de comida</strong> y se combina con <strong>tipos de orden</strong>: “este descuento, solo para reservas de tal tipo de comida”.',
        'Abajo, una <strong>promoción concreta</strong> aplica esa regla a los ítems de un <strong>menú</strong>, nunca a una comida suelta: así una cocina puede ofrecer su propia promoción sin tocar el resto.',
        '<strong>Cambiar la campaña es tocar arriba.</strong> El partido de abajo no se reescribe.',
      ],
      titlePromo: 'Seguí una promoción',
      titleLevels: 'Metamodelo · reglamento arriba, partido abajo',
      legendK: 'Nivel de conocimiento (reglas)',
      legendO: 'Nivel operacional (hechos)',
      isRule: 'Es una regla: cambiarla no reescribe los hechos de abajo.',
      isFact: 'Es un hecho del día a día, gobernado por las reglas de arriba.',
      hint: 'Tocá una caja para ver sus valores y con qué se conecta.',
      canvas: 'Metamodelo: arriba el nivel de conocimiento con tipos de usuario, acción, orden, promoción y comida; abajo el nivel operacional con usuario, acción, orden, promoción, menú, comida y ghost kitchen',
      knowledge: 'nivel de conocimiento',
      operational: 'nivel operacional',
      rule: 'regla',
      fact: 'hecho',
    },
    comp: {
      zones: {
        fe: { t: 'Apps de front-end', qa: 'Usabilidad, performance, autonomía', why: 'Tiene que funcionar sin señal. Y un detalle de coherencia: la app del cajero no es otro producto, impersona usuarios y recorre el mismo flujo.' },
        cat: { t: 'Subsistema de catálogo', qa: 'Extensibilidad, mantenibilidad, disponibilidad', why: '“Sin buena disponibilidad no hay flujo de caja.” Con una admisión honesta: disponibilidad resuelta con reinicios y escala vertical; una caída corta sigue siendo posible.' },
        ord: { t: 'Procesamiento de órdenes', qa: 'Confiabilidad, integridad', why: 'La parte que protege el dinero: si una orden se corrompe, hay pérdida directa.' },
        pur: { t: 'Pasarela de compra', qa: 'Seguridad, disponibilidad', why: '“No poder pagar es pérdida directa de plata.”' },
        not: { t: 'Notificaciones', qa: 'Confiabilidad', why: 'Pieza genérica: se alquila y se exige que no pierda avisos.' },
        rep: { t: 'Reportes', qa: 'Confiabilidad', why: 'Pieza genérica, fuera del camino crítico de la venta.' },
      },
      title: 'Composición del sistema y presupuesto de calidad',
      legendGravity: 'Centro de gravedad',
      legendModule: 'Módulo',
      legendExt: 'Externo',
      hint: 'Tocá un subsistema: ¿qué le pasa al negocio si esa pieza falla?',
      canvas: 'Composición: apps de front-end, subsistema de catálogo, procesamiento de órdenes y pasarela de compra, con notificaciones y reportes arriba y los sistemas externos abajo; catálogo y órdenes son los centros de gravedad',
      notifications: 'Notificaciones',
      reports: 'Reportes',
      mobile: 'App móvil',
      pos: 'Punto de venta',
      feedback: 'Feedback',
      promo: 'Promoción / Descuento',
      pickup: 'Retiro de comida',
      schedule: 'Agenda',
      purchase: 'Compra',
      paySystems: 'Sistemas de pago',
      mapProvider: 'Proveedor de mapas',
      fridgeMgmt: 'Gestión de heladeras',
    },
  },
  en: {
    caps: {
      cat: 'Meal Catalog',
      ord: 'Ordering',
      loy: 'Loyalty',
      fb: 'Feedback',
      sch: 'Scheduling',
      rep: 'Reporting',
      not: 'Notifications',
      pay: 'Payments',
    },
    cls: { core: 'Core', sup: 'Supporting', gen: 'Generic' },
    sorter: {
      title: 'Classify each capability',
      compare: 'Compare with the team',
      missing: (n: number) => `${n} left`,
      score: (score: number, total: number) => <><strong className="mono">{score}/{total}</strong> match the team</>,
      again: 'Try again',
      q1: <><strong>1.</strong> Does this set Farmacy Food apart from its competitors?</>,
      q2: <><strong>2.</strong> Does it already exist, built and proven, on the market?</>,
      groupLabel: (cap: string) => `How you classify ${cap}`,
    },
    domainMap: {
      title: 'Strategic domain map',
      legendCore: 'Core: build',
      legendSup: 'Supporting: adapt',
      legendGen: 'Generic: rent',
      canvas: 'Domain map by uniqueness and complexity: Core at the top right with Loyalty, Meal Catalog and Ordering; Supporting at the top left with Feedback and Scheduling; Generic at the bottom with Reporting, Notifications and Payments',
      uniqueness: 'unique',
      complexity: 'complexity',
      zoneSup: 'Supporting · adapt',
      zoneCore: 'Core · build in-house',
      zoneGen: 'Generic · rent',
    },
    acl: {
      title: 'Menu Catalog · a service with its customs office',
      legendExt: 'External',
      legendCmd: 'Command',
      legendEvt: 'Event',
      legendDomain: 'Domain',
      canvas: 'The catalog domain, protected by an anti-corruption layer with three translation pieces; the external systems only touch the layer, and the internal consumers receive commands and events',
      service: 'Menu Catalog · service',
      layer: 'anti-corruption layer',
      translates: 'translates',
      commands: 'commands',
      pureDomain: 'the pure domain',
      cons: { cart: 'Shopping Cart', rec: 'Recommendations', rev: 'Reviews', fil: 'Filtering' },
      events: 'events',
      toOrders: 'to Ordering',
      lasagnas: '40 lasagnas (their format)',
      internal: 'internal format',
      stockUpdated: 'stock updated',
      byte: 'Byte fridges',
      byteSub: 'raw API, no events',
      rawData: 'raw data',
      catalogUpdated: 'catalog updated',
      fabricates: 'the layer makes the event',
    },
    wrapper: {
      title: 'Same instinct, two shapes',
      legendThird: 'Third party',
      legendOwn: 'In-house piece',
      canvas: 'Top, ArchColider: a translation layer inside the module. Bottom, Myagis-Forest: one wrapper microservice for each external system',
      archTitle: 'ArchColider · one layer inside a monolith module',
      module: 'one monolith module',
      kitchen: 'Kitchen',
      translation: 'Translation layer',
      domain: 'Domain',
      myagisTitle: 'Myagis-Forest · ADR 004 · one wrapper per third party',
      fridges: 'Fridges',
      wrapperOf: (x: string) => `${x} wrapper`,
      microservice: 'microservice',
      business: 'Business services',
      standard: 'internal standard',
    },
    facade: {
      title: 'One piece in front of many networks',
      legendOwn: 'In-house facade',
      legendExt: 'External',
      moment: 'Timeframe',
      today: 'Today',
      tomorrow: 'Tomorrow, if expansion requires it',
      canvasLater: 'The payment facade starts talking directly to a card network, step by step, without the rest of the system changing',
      canvasNow: 'The modules talk to an in-house payment facade, which today delegates to a provider that connects to all the networks',
      orders: 'Ordering',
      subs: 'Subscriptions',
      facadeSub: 'facade · MSG',
      provider: 'Provider',
      providerSub: 'Stripe or similar',
      direct: 'direct integration, one network at a time',
      charge: 'charge',
      footLater: 'Ordering and Subscriptions never notice the change',
      footNow: 'no module talks directly to a card network',
    },
    maps: {
      osm: { price: 'Free', pro: 'No cost, open source' },
      tomtom: { price: 'Free for 2,500 requests a day', pro: 'Better navigation' },
      mapbox: { price: 'Free for 50,000 requests a day', pro: 'Custom map features' },
      here: { price: 'Free for 250,000 requests a month', pro: 'Better visualization services' },
      chosen: 'chosen',
      gov: <><strong>Accepted consequence:</strong> watch the number of requests month by month so you do not start overpaying without noticing.</>,
    },
    mm: {
      names: {
        place: 'Place',
        ordType: 'Order Type',
        promoRule: 'Promotion Rule',
        userType: 'User Type',
        actType: 'Action Type',
        ordState: 'Order State',
        fbType: 'Feedback Type',
        promoType: 'Promotion Type',
        mealType: 'Meal Type',
        user: 'User',
        act: 'Action',
        order: 'Order',
        fb: 'Feedback',
        sched: 'Schedule',
        promo: 'Promotion/Discount',
        menu: 'Menu',
        gk: 'Ghost Kitchen',
        meal: 'Meal',
      },
      /** in English the box label already is the team's original name */
      showOriginal: false,
      mealTypeVal: 'with its own hierarchy',
      verbs: {
        'userType>actType': 'can do',
        'actType>ordState': 'impacts',
        'ordState>ordType': 'depends on',
        'ordType>promoType': 'can have',
        'promoRule>promoType': 'defines',
        'promoType>mealType': 'applies to',
        'place>actType': 'situates',
        'userType>user': 'describes',
        'actType>act': 'limits',
        'ordState>order': 'controls',
        'fbType>fb': '',
        'promoType>promo': 'describes',
        'mealType>meal': 'describes',
        'user>act': 'performs',
        'act>order': 'applies to',
        'fb>order': 'based on',
        'order>sched': 'runs on',
        'order>menu': 'formed from',
        'promo>menu': 'applies to items',
        'menu>meal': 'formed from',
        'gk>menu': 'provides',
      },
      promoCap: [
        'At the top, a <strong>promotion rule</strong> defines a <strong>promotion type</strong>.',
        'That type applies to <strong>meal types</strong> and combines with <strong>order types</strong>: “this discount, only for reservations of this meal type”.',
        'Below, a <strong>concrete promotion</strong> applies that rule to the items of a <strong>menu</strong>, never to a single meal: that way a kitchen can offer its own promotion without touching the rest.',
        '<strong>Changing the campaign means touching the top.</strong> The match below is not rewritten.',
      ],
      titlePromo: 'Follow a promotion',
      titleLevels: 'Metamodel · rulebook on top, match below',
      legendK: 'Knowledge level (rules)',
      legendO: 'Operational level (facts)',
      isRule: 'It is a rule: changing it does not rewrite the facts below.',
      isFact: 'It is an everyday fact, governed by the rules above.',
      hint: 'Tap a box to see its values and what it connects to.',
      canvas: 'Metamodel: on top, the knowledge level with user, action, order, promotion and meal types; below, the operational level with user, action, order, promotion, menu, meal and ghost kitchen',
      knowledge: 'knowledge level',
      operational: 'operational level',
      rule: 'rule',
      fact: 'fact',
    },
    comp: {
      zones: {
        fe: { t: 'Front-end apps', qa: 'Usability, performance, autonomy', why: 'It has to work offline. And a detail that keeps things consistent: the cashier’s app is not a separate product; it impersonates users and follows the same workflow.' },
        cat: { t: 'Meal Catalog subsystem', qa: 'Extensibility, maintainability, availability', why: '“Without good availability there won’t be cash flow.” With an honest admission: availability is solved with restarts and vertical scaling, so a short outage is still possible.' },
        ord: { t: 'Order processing subsystem', qa: 'Reliability, integrity', why: 'The part that protects the money: if an order gets corrupted, that is a direct loss.' },
        pur: { t: 'Purchase gateway', qa: 'Security, availability', why: '“Inability to make payment causes direct money loss.”' },
        not: { t: 'Notifications', qa: 'Reliability', why: 'A generic piece: you rent it and require that it never loses a notification.' },
        rep: { t: 'Reporting', qa: 'Reliability', why: 'A generic piece, off the critical path of a sale.' },
      },
      title: 'System composition and quality budget',
      legendGravity: 'Gravity center',
      legendModule: 'Module',
      legendExt: 'External',
      hint: 'Tap a subsystem: what happens to the business if that piece fails?',
      canvas: 'Composition: front-end apps, Meal Catalog subsystem, order processing subsystem and purchase gateway, with notifications and reporting on top and the external systems at the bottom; catalog and ordering are the gravity centers',
      notifications: 'Notifications',
      reports: 'Reporting',
      mobile: 'Mobile App',
      pos: 'Point of Sale',
      feedback: 'Feedback',
      promo: 'Promotion / Discount',
      pickup: 'Meal Pickup',
      schedule: 'Scheduling',
      purchase: 'Purchase',
      paySystems: 'Payment Systems',
      mapProvider: 'Map Provider',
      fridgeMgmt: 'Smart-Fridge Management',
    },
  },
});
type T = (typeof S)['es'];

type Cls = 'core' | 'sup' | 'gen';
type CapK = keyof T['caps'];
const CAPS: { k: CapK; icon: any; team: Cls }[] = [
  { k: 'cat', icon: BookOpen, team: 'core' },
  { k: 'ord', icon: Inbox, team: 'core' },
  { k: 'loy', icon: Heart, team: 'core' },
  { k: 'fb', icon: MessageSquare, team: 'sup' },
  { k: 'sch', icon: CalendarClock, team: 'sup' },
  { k: 'rep', icon: BarChart3, team: 'gen' },
  { k: 'not', icon: Bell, team: 'gen' },
  { k: 'pay', icon: CreditCard, team: 'gen' },
];

/* ───────────────────────── sorter: classify like the team ───────────────────────── */
export function Sorter({ reduced }: SceneProps) {
  const t = useT(S);
  const ts = t.sorter;
  const [pick, setPick] = useState<Record<string, Cls>>({});
  const [shown, setShown] = useState(false);
  const all = CAPS.every((c) => pick[c.k]);
  const score = CAPS.filter((c) => pick[c.k] === c.team).length;
  return (
    <Frame title={ts.title} foot={
      <div className="sorter__ctl">
        {!shown ? (
          <button type="button" className="play-btn play-btn--primary" disabled={!all} onClick={() => setShown(true)}>
            {all ? ts.compare : ts.missing(CAPS.filter((c) => !pick[c.k]).length)}
          </button>
        ) : (
          <>
            <span className="sorter__score">{ts.score(score, CAPS.length)}</span>
            <button type="button" className="play-btn" onClick={() => { setPick({}); setShown(false); }}><RotateCcw size={14} aria-hidden /> {ts.again}</button>
          </>
        )}
      </div>
    }>
      <div className="sorter">
        <div className="sorter__qs">
          <span>{ts.q1}</span>
          <span>{ts.q2}</span>
        </div>
        <ul className="sorter__list">
          {CAPS.map((c, i) => {
            const ok = shown && pick[c.k] === c.team;
            const ko = shown && pick[c.k] !== c.team;
            return (
              <motion.li key={c.k} className={`sorter__row ${ok ? 'is-ok' : ''} ${ko ? 'is-ko' : ''}`} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <span className="sorter__cap"><c.icon size={16} aria-hidden /> {t.caps[c.k]}</span>
                <span className="sorter__opts" role="radiogroup" aria-label={ts.groupLabel(t.caps[c.k])}>
                  {(['core', 'sup', 'gen'] as Cls[]).map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={pick[c.k] === k} disabled={shown} className={`sorter__opt sorter__opt--${k} ${pick[c.k] === k ? 'is-on' : ''} ${shown && c.team === k ? 'is-team' : ''}`} onClick={() => setPick((p) => ({ ...p, [c.k]: k }))}>
                      {t.cls[k]}
                    </button>
                  ))}
                </span>
                <span className="sorter__mark" aria-hidden>{ok ? <Check size={16} /> : ko ? <X size={16} /> : null}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Frame>
  );
}

/* ───────────────────────── strategic domain map ───────────────────────── */
const DPOS: Record<string, { x: number; y: number; w?: number }> = {
  fb: { x: 230, y: 165 }, sch: { x: 400, y: 165 },
  loy: { x: 640, y: 120 }, cat: { x: 810, y: 120 }, ord: { x: 810, y: 205 },
  // "Notificaciones" is one unbreakable word in Spanish: its box is wider
  rep: { x: 225, y: 345 }, not: { x: 225, y: 430, w: 184 }, pay: { x: 415, y: 430 },
};

export function DomainMap({ reduced }: SceneProps) {
  const t = useT(S);
  const td = t.domainMap;
  return (
    <Frame title={td.title} legend={<Legend items={[{ tone: 'accent', label: td.legendCore }, { tone: 'cmp', label: td.legendSup }, { tone: 'ext', label: td.legendGen }]} />}>
      <Canvas w={960} h={520} label={td.canvas}>
        {(ids) => (
          <>
            <Edge points={[[80, 490], [80, 40]]} marker={ids.arrow} />
            <Edge points={[[80, 490], [920, 490]]} marker={ids.arrow} />
            <Label x={70} y={50} anchor="end">{td.uniqueness}</Label>
            <Label x={910} y={512} anchor="end">{td.complexity}</Label>
            <motion.rect x={120} y={60} width={380} height={200} rx={16} fill="color-mix(in srgb, var(--cmp-soft) 60%, transparent)" stroke="var(--cmp)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <motion.rect x={530} y={60} width={380} height={200} rx={16} fill="color-mix(in srgb, var(--accent-soft) 70%, transparent)" stroke="var(--accent)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
            <motion.rect x={120} y={285} width={380} height={185} rx={16} className="zone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
            <Label x={140} y={245} anchor="start" tone="cmp" size={12}>{td.zoneSup}</Label>
            <Label x={550} y={245} anchor="start" tone="accent" size={12}>{td.zoneCore}</Label>
            <Label x={490} y={305} anchor="end" size={12}>{td.zoneGen}</Label>
            {CAPS.map((c, i) => (
              <Node key={c.k} x={DPOS[c.k].x} y={DPOS[c.k].y} w={DPOS[c.k].w ?? 160} h={52} kind={c.team === 'core' ? 'core' : c.team === 'sup' ? 'cmp' : 'ext'} icon={c.icon} label={t.caps[c.k]} delay={reduced ? 0 : 0.3 + i * 0.08} />
            ))}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── anti-corruption layer ───────────────────────── */
const EXT = [
  { k: 'gk', t: 'Ghost Kitchen', icon: ChefHat, y: 170 },
  { k: 'lm', t: 'Loyalty Management', icon: Heart, y: 290 },
  { k: 'fe', t: 'Front End + PoS', icon: Smartphone, y: 410 },
];
const ACLN = [
  { k: 'mo', t: 'Meals Offer', y: 170 },
  { k: 'ly', t: 'Loyalty', y: 290 },
  { k: 'api', t: 'Menu Catalog API', y: 410 },
];
const CONS: { k: keyof T['acl']['cons']; icon: any; y: number }[] = [
  { k: 'cart', icon: ShoppingCart, y: 120 },
  { k: 'rec', icon: Sparkles, y: 230 },
  { k: 'rev', icon: Star, y: 340 },
  { k: 'fil', icon: Filter, y: 450 },
];

export function Acl({ state = 'structure', reduced }: SceneProps) {
  const ta = useT(S).acl;
  const flow = state === 'flow';
  const fab = state === 'fabricate';
  const D = { x: 600, y: 290 };
  return (
    <Frame title={ta.title} legend={<Legend items={[{ tone: 'ext', label: ta.legendExt }, { tone: 'cmd', label: ta.legendCmd }, { tone: 'evt', label: ta.legendEvt }, { tone: 'accent', label: ta.legendDomain }]} />}>
      <Canvas w={1020} h={590} label={ta.canvas}>
        {(ids) => (
          <>
            <rect x={235} y={50} width={757} height={510} rx={18} className="zone" />
            <Label x={250} y={40} anchor="start">{ta.service}</Label>
            <rect x={262} y={110} width={196} height={360} rx={14} fill="color-mix(in srgb, var(--warn-soft) 55%, transparent)" stroke="var(--warn)" strokeDasharray="5 4" />
            <Label x={360} y={100} tone="muted">{ta.layer}</Label>

            {EXT.map((e, i) => (
              <g key={e.k}>
                <Node x={110} y={e.y} w={180} h={56} kind="ext" icon={e.icon} label={e.t} delay={0.05 * i} />
                <Edge points={[[200, e.y], [270, e.y]]} marker={ids.arrow} />
              </g>
            ))}
            {ACLN.map((a) => (
              <g key={a.k}>
                <Node x={360} y={a.y} w={170} h={56} kind="plain" label={a.t} sub={ta.translates} highlight={(flow && a.k === 'mo') || (fab && a.k === 'api')} />
                <Edge points={[[445, a.y], [D.x - 88, D.y + (a.y - 290) / 6]]} tone="cmd" dashed marker={ids.arrowCmd} />
              </g>
            ))}
            <Label x={478} y={283} tone="cmd" size={10} masked>{ta.commands}</Label>
            <Node x={D.x} y={D.y} w={170} h={80} kind="core" icon={BookOpen} label="Menu Catalog" sub={ta.pureDomain} highlight={flow || fab} />
            {CONS.map((cn) => (
              <g key={cn.k}>
                <Edge points={[[D.x + 86, D.y + (cn.y - 290) / 5], [776, cn.y]]} tone="evt" dashed marker={ids.arrowEvt} />
                <Node x={878} y={cn.y} w={200} h={52} kind="cmp" icon={cn.icon} label={ta.cons[cn.k]} />
              </g>
            ))}
            <Label x={728} y={352} tone="evt" size={10} anchor="start" masked>{ta.events}</Label>
            <Edge points={[[978, 120], [1016, 120]]} marker={ids.arrow} />
            <Label x={1014} y={84} anchor="end" size={9} masked>{ta.toOrders}</Label>

            {flow && (
              <>
                {/* the two hops are shorter than their names: small dots travel, the names stay put next to the hop */}
                <Label x={20} y={128} anchor="start" size={10}>{ta.lasagnas}</Label>
                <Label x={360} y={130} tone="cmd" size={10}>{ta.internal}</Label>
                <Packet reduced={reduced} tone="muted" points={[[200, 170], [272, 170]]} duration={1.4} repeat repeatDelay={3.2} w={14} />
                <Packet reduced={reduced} tone="cmd" points={[[445, 170], [512, 280]]} duration={1.2} delay={1.4} repeat repeatDelay={3.4} w={14} />
                {CONS.map((cn, i) => (
                  <Packet key={cn.k} reduced={reduced} tone="evt" points={[[D.x + 86, D.y + (cn.y - 290) / 5], [776, cn.y]]} duration={1.1} delay={2.7 + i * 0.05} repeat repeatDelay={3.5} w={14} />
                ))}
                <Label x={600} y={360} tone="evt" size={11}>{ta.stockUpdated}</Label>
              </>
            )}
            <Node x={110} y={515} w={180} h={50} kind="danger" icon={Refrigerator} label={ta.byte} sub={ta.byteSub} show={fab} />
            <Edge points={[[200, 515], [240, 515], [240, 430], [270, 430]]} tone="danger" marker={ids.arrowDanger} show={fab} />
            {fab && (
              <>
                <Packet reduced={reduced} tone="danger" label={ta.rawData} points={[[200, 515], [240, 515], [240, 430], [272, 430]]} duration={1.6} repeat repeatDelay={2.6} />
                <Packet reduced={reduced} tone="evt" points={[[445, 410], [512, 300]]} duration={1.3} delay={1.6} repeat repeatDelay={2.9} w={14} />
                <Label x={360} y={498} tone="evt" size={10}>{ta.fabricates}</Label>
              </>
            )}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── ACL vs wrapper per third party ───────────────────────── */
export function Wrapper({ reduced }: SceneProps) {
  const tw = useT(S).wrapper;
  return (
    <Frame title={tw.title} legend={<Legend items={[{ tone: 'ext', label: tw.legendThird }, { tone: 'cmp', label: tw.legendOwn }]} />}>
      <Canvas w={960} h={500} label={tw.canvas}>
        {(ids) => (
          <>
            <Label x={40} y={40} anchor="start" tone="accent" size={12}>{tw.archTitle}</Label>
            <rect x={330} y={60} width={560} height={150} rx={16} className="zone zone--accent" />
            <Label x={610} y={228} tone="muted">{tw.module}</Label>
            <Node x={130} y={135} w={170} h={52} kind="ext" icon={ChefHat} label={tw.kitchen} delay={0.1} />
            <Edge points={[[215, 135], [360, 135]]} marker={ids.arrow} />
            <Node x={450} y={135} w={170} h={70} kind="plain" icon={Shield} label={tw.translation} delay={0.2} />
            <Edge points={[[535, 135], [650, 135]]} tone="cmd" marker={ids.arrowCmd} />
            <Node x={750} y={135} w={170} h={70} kind="core" icon={Layers} label={tw.domain} delay={0.3} />

            <Label x={40} y={290} anchor="start" tone="cmp" size={12}>{tw.myagisTitle}</Label>
            {[{ k: 'kitchen', t: tw.kitchen, y: 340, icon: ChefHat }, { k: 'fridges', t: tw.fridges, y: 430, icon: Refrigerator }].map((r, i) => (
              <g key={r.k}>
                <Node x={130} y={r.y} w={170} h={52} kind="ext" icon={r.icon} label={r.t} delay={0.4 + i * 0.1} />
                <Edge points={[[215, r.y], [370, r.y]]} marker={ids.arrow} />
                <Node x={450} y={r.y} w={160} h={60} kind="cmp" icon={Package} label={tw.wrapperOf(r.t)} sub={tw.microservice} delay={0.5 + i * 0.1} />
                <Edge points={[[530, r.y], [668, 385]]} tone="cmd" marker={ids.arrowCmd} />
              </g>
            ))}
            <Node x={760} y={385} w={180} h={70} kind="cmp" icon={Server} label={tw.business} sub={tw.standard} delay={0.7} />
            {!reduced && <Packet reduced={reduced} tone="cmd" points={[[530, 340], [668, 385]]} duration={1.3} repeat repeatDelay={1.5} w={14} />}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── payment facade ───────────────────────── */
export function Facade({ reduced }: SceneProps) {
  const tf = useT(S).facade;
  const [later, setLater] = useState(false);
  const nets = [
    { t: 'Visa', y: 120 },
    { t: 'Mastercard', y: 250 },
    { t: 'PayPal', y: 380 },
  ];
  return (
    <Frame title={tf.title} legend={<Legend items={[{ tone: 'accent', label: tf.legendOwn }, { tone: 'ext', label: tf.legendExt }]} />}
      foot={
        <div className="seg seg--lg" role="group" aria-label={tf.moment}>
          <button type="button" aria-pressed={!later} onClick={() => setLater(false)}>{tf.today}</button>
          <button type="button" aria-pressed={later} onClick={() => setLater(true)}>{tf.tomorrow}</button>
        </div>
      }>
      <Canvas w={960} h={500} label={later ? tf.canvasLater : tf.canvasNow}>
        {(ids) => (
          <>
            <Node x={110} y={180} w={170} h={56} kind="cmp" icon={Inbox} label={tf.orders} />
            <Node x={110} y={320} w={170} h={56} kind="cmp" icon={CalendarClock} label={tf.subs} />
            <Edge points={[[195, 180], [260, 180], [260, 240], [320, 240]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[195, 320], [260, 320], [260, 270], [320, 270]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[495, 255], [578, 255]]} marker={ids.arrow} />
            {/* the charge goes into the facade and comes out the other side, so it travels behind the box */}
            {!later && <Packet reduced={reduced} tone="cmd" label={tf.charge} points={[[195, 180], [260, 180], [260, 240], [320, 240], [495, 255], [578, 255]]} duration={2.6} repeat repeatDelay={1} />}
            <Node x={410} y={255} w={170} h={90} kind="core" icon={CreditCard} label="Payment" sub={tf.facadeSub} />
            <Node x={660} y={255} w={160} h={70} kind="ext" icon={Server} label={tf.provider} sub={tf.providerSub} />
            {nets.map((n) => (
              <g key={n.t}>
                <Node x={870} y={n.y} w={140} h={50} kind="ext" label={n.t} />
                <Edge points={[[740, 255], [768, 255], [768, n.y], [798, n.y]]} marker={ids.arrow} show={!(later && n.t === 'Visa')} />
              </g>
            ))}
            <Edge points={[[495, 225], [520, 225], [520, 100], [798, 100], [798, 115]]} tone="accent" marker={ids.arrowAccent} show={later} />
            <Label x={660} y={90} tone="accent" show={later}>{tf.direct}</Label>
            {later && <Packet reduced={reduced} tone="accent" points={[[495, 225], [520, 225], [520, 100], [798, 100], [798, 113]]} duration={1.8} repeat repeatDelay={1} w={14} />}
            <Label x={300} y={440} tone="text" size={13}>{later ? tf.footLater : tf.footNow}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── maps provider (ADR 015) ───────────────────────── */
export function Maps({ reduced }: SceneProps) {
  const tm = useT(S).maps;
  const ps: { t: string; price: string; pro: string; pick?: boolean }[] = [
    { t: 'OpenStreetMap', ...tm.osm },
    { t: 'TomTom', ...tm.tomtom },
    { t: 'Mapbox', ...tm.mapbox },
    { t: 'Here Maps', ...tm.here, pick: true },
  ];
  return (
    <div className="maps">
      <div className="maps__grid">
        {ps.map((p, i) => (
          <motion.div key={p.t} className={`vcard maps__p ${p.pick ? 'is-pick' : ''}`} initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <MapIcon size={18} aria-hidden />
            <strong>{p.t}</strong>
            <span className="maps__price">{p.price}</span>
            <span className="maps__pro">{p.pro}</span>
            {p.pick && <span className="maps__badge mono">{tm.chosen}</span>}
          </motion.div>
        ))}
      </div>
      <motion.div className="maps__gov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Eye size={16} aria-hidden /> <span>{tm.gov}</span>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── metamodel ───────────────────────── */
type MK = keyof T['mm']['names'];
type MN = { k: MK; x: number; y: number; en: string; lvl: 'k' | 'o'; vals?: string[]; w?: number };
const MM: MN[] = [
  { k: 'place', x: 245, y: 70, en: 'Place', lvl: 'k', vals: ['App', 'PoS'] },
  { k: 'ordType', x: 585, y: 70, en: 'Order Type', lvl: 'k', vals: ['Instant', 'Reservation', 'Planned'] },
  { k: 'promoRule', x: 755, y: 70, en: 'Promotion Rule', lvl: 'k' },
  { k: 'userType', x: 75, y: 200, en: 'User Type', lvl: 'k', vals: ['Subscriber', 'Known', 'Occasional', 'PointOfSale'] },
  { k: 'actType', x: 245, y: 200, en: 'Action Type', lvl: 'k', vals: ['Select', 'Pay', 'Grab', 'Schedule', 'List', 'Cancel'] },
  { k: 'ordState', x: 415, y: 200, en: 'Order State', lvl: 'k', vals: ['Started', 'Finalized', 'PaymentAwaited', 'Purchased', 'Dispatched', 'Picked', 'Scheduled', 'Canceled'] },
  { k: 'fbType', x: 585, y: 200, en: 'Feedback Type', lvl: 'k' },
  { k: 'promoType', x: 755, y: 200, en: 'Promotion Type', lvl: 'k' },
  // mealType's only value is prose, so it comes from the strings table (mealTypeVal)
  { k: 'mealType', x: 935, y: 200, en: 'Meal Type', lvl: 'k' },
  { k: 'user', x: 75, y: 400, en: 'User', lvl: 'o' },
  { k: 'act', x: 245, y: 400, en: 'Action', lvl: 'o' },
  { k: 'order', x: 415, y: 400, en: 'Order', lvl: 'o' },
  { k: 'fb', x: 585, y: 400, en: 'Feedback', lvl: 'o' },
  { k: 'sched', x: 585, y: 495, en: 'Schedule', lvl: 'o' },
  { k: 'promo', x: 755, y: 400, en: 'Promotion/Discount', lvl: 'o', w: 172 },
  { k: 'menu', x: 415, y: 570, en: 'Menu', lvl: 'o' },
  { k: 'gk', x: 170, y: 570, en: 'Ghost Kitchen', lvl: 'o' },
  { k: 'meal', x: 935, y: 570, en: 'Meal', lvl: 'o' },
];
const P = Object.fromEntries(MM.map((n) => [n.k, n]));
type Verb = keyof T['mm']['verbs'];
const ME: [string, string][] = [
  ['userType', 'actType'], ['actType', 'ordState'], ['ordState', 'ordType'],
  ['ordType', 'promoType'], ['promoRule', 'promoType'], ['promoType', 'mealType'],
  ['place', 'actType'],
  ['userType', 'user'], ['actType', 'act'], ['ordState', 'order'], ['fbType', 'fb'],
  ['promoType', 'promo'], ['mealType', 'meal'],
  ['user', 'act'], ['act', 'order'], ['fb', 'order'], ['order', 'sched'],
  ['order', 'menu'], ['promo', 'menu'], ['menu', 'meal'], ['gk', 'menu'],
];
const PROMO_PATH = [
  ['promoRule', 'promoType'],
  ['promoType', 'mealType', 'ordType'],
  ['promo', 'menu'],
  [],
];

export function Metamodel({ state = 'levels', reduced }: SceneProps) {
  const tm = useT(S).mm;
  const promo = state === 'promo';
  const [sel, setSel] = useState<string | null>(null);
  const s = usePhases(4, { interval: 3800, reduced, key: state, auto: promo });
  useEffect(() => setSel(null), [state]);
  const hlSet = new Set<string>(promo ? (s.phase === 3 ? ['promoRule', 'promoType', 'mealType', 'ordType'] : PROMO_PATH[s.phase]) : sel ? [sel, ...ME.filter(([a, b]) => a === sel || b === sel).map(([a, b]) => (a === sel ? b : a))] : []);
  const selN = sel ? P[sel] : null;
  const selVals = selN ? (selN.k === 'mealType' ? [tm.mealTypeVal] : selN.vals) : undefined;
  // boxes are narrower than the column pitch (170) so every relation keeps a visible stretch of line;
  // the Spanish edition stacks the team's English name under each box, so its boxes are taller
  const W = 136, H = tm.showOriginal ? 58 : 46;
  const half = (k: string) => (P[k].w ?? W) / 2;
  const MENU_IN = 558, MENU_OUT = 582; // promo enters Menu from the right, Meal leaves it lower down
  const edgePts = (a: string, b: string): [number, number][] => {
    const A = P[a], B = P[b];
    if (a === 'promo' && b === 'menu') return [[A.x, A.y + H / 2], [A.x, MENU_IN], [B.x + half(b), MENU_IN]];
    if (a === 'menu' && b === 'meal') return [[A.x + half(a), MENU_OUT], [B.x - half(b), MENU_OUT]];
    if (A.y === B.y) {
      const d = B.x > A.x ? 1 : -1;
      return [[A.x + d * half(a), A.y], [B.x - d * half(b), B.y]];
    }
    if (A.x === B.x) {
      const d = B.y > A.y ? 1 : -1;
      return [[A.x, A.y + (d * H) / 2], [B.x, B.y - (d * H) / 2]];
    }
    // elbow
    const d = B.y > A.y ? 1 : -1;
    const my = a === 'order' && b === 'sched' ? 450 : (A.y + B.y) / 2;
    return [[A.x, A.y + (d * H) / 2], [A.x, my], [B.x, my], [B.x, B.y - (d * H) / 2]];
  };
  /** Where a relation's verb sits: never on top of a box, never across another line. */
  const verbAt = (a: string, b: string, pts: [number, number][], v: string): { x: number; y: number; anchor: 'start' | 'middle' } => {
    const A = P[a], B = P[b];
    if (a === 'promo' && b === 'menu') return { x: (pts[1][0] + pts[2][0]) / 2, y: MENU_IN - 6, anchor: 'middle' };
    if (a === 'menu' && b === 'meal') return { x: (pts[0][0] + pts[1][0]) / 2 + 40, y: MENU_OUT + 14, anchor: 'middle' };
    if (pts.length === 2 && A.y === B.y) {
      const gap = Math.abs(pts[1][0] - pts[0][0]);
      const mx = (pts[0][0] + pts[1][0]) / 2;
      // short links between neighbours: the verb goes above the pair instead of over the boxes
      return gap >= v.length * 6.4 + 14 ? { x: mx, y: A.y - 6, anchor: 'middle' } : { x: mx, y: A.y - H / 2 - 8, anchor: 'middle' };
    }
    if (pts.length === 2) {
      // rules to facts: just under the rule; within a level: halfway, clear of the labels that sit above neighbouring pairs
      const y = A.lvl !== B.lvl ? A.y + H / 2 + 38 : (pts[0][1] + pts[1][1]) / 2 + 4;
      return { x: A.x + 7, y, anchor: 'start' };
    }
    return { x: (pts[1][0] + pts[2][0]) / 2, y: pts[1][1] - 6, anchor: 'middle' };
  };
  return (
    <Frame
      title={promo ? tm.titlePromo : tm.titleLevels}
      legend={<Legend items={[{ tone: 'cmd', label: tm.legendK }, { tone: 'cmp', label: tm.legendO }]} />}
      foot={promo ? (
        <Stepper phase={s.phase} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={tm.promoCap} />
      ) : (
        <div className="mm-info" aria-live="polite">
          {selN ? (
            <span><strong>{tm.names[selN.k]}</strong>{tm.showOriginal ? <> <span className="mono">({selN.en})</span></> : null}{selVals ? <>: {selVals.join(' · ')}</> : null}. {selN.lvl === 'k' ? tm.isRule : tm.isFact}</span>
          ) : (
            <span className="eco-info__hint">{tm.hint}</span>
          )}
        </div>
      )}
    >
      <Canvas w={1020} h={620} label={tm.canvas}>
        {(ids) => (
          <>
            <line x1={10} x2={1010} y1={300} y2={300} stroke="var(--line-strong)" strokeDasharray="6 6" strokeWidth={1.5} />
            {ME.map(([a, b]) => {
              const v = tm.verbs[`${a}>${b}` as Verb];
              const on = hlSet.has(a) && hlSet.has(b);
              const pts = edgePts(a, b);
              const at = v ? verbAt(a, b, pts, v) : null;
              return (
                <g key={a + b}>
                  <Edge points={pts} tone={on ? 'accent' : 'muted'} width={on ? 2.2 : 1.4} />
                  {at && <text x={at.x} y={at.y} textAnchor={at.anchor} className={`lb lb--masked ${on ? 'lb--accent' : 'lb--muted'}`} style={{ fontSize: 9.5 }}>{v}</text>}
                </g>
              );
            })}
            <text x={14} y={290} className="lb lb--cmd lb--masked" style={{ fontSize: 10 }}>{tm.knowledge}</text>
            <text x={14} y={318} className="lb lb--cmp lb--masked" style={{ fontSize: 10 }}>{tm.operational}</text>
            {MM.map((n, i) => (
              <g key={n.k} onClick={promo ? undefined : () => setSel(sel === n.k ? null : n.k)} onKeyDown={(e) => { if (!promo && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setSel(sel === n.k ? null : n.k); } }} tabIndex={promo ? undefined : 0} role={promo ? undefined : 'button'} aria-label={`${tm.names[n.k]}, ${n.lvl === 'k' ? tm.rule : tm.fact}`} className="mm-hit">
                <Node x={n.x} y={n.y} w={n.w ?? W} h={H} kind={n.lvl === 'k' ? 'cmd' : 'cmp'} label={tm.names[n.k]} sub={tm.showOriginal ? n.en : undefined} highlight={hlSet.has(n.k)} dim={hlSet.size > 0 && !hlSet.has(n.k)} delay={reduced ? 0 : i * 0.03} />
              </g>
            ))}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── composition + quality budget ───────────────────────── */
const ZONES: { k: keyof T['comp']['zones']; x: number; y: number; w: number; h: number }[] = [
  { k: 'fe', x: 30, y: 190, w: 200, h: 240 },
  { k: 'cat', x: 270, y: 130, w: 200, h: 390 },
  { k: 'ord', x: 510, y: 220, w: 200, h: 200 },
  { k: 'pur', x: 750, y: 250, w: 190, h: 120 },
  { k: 'not', x: 30, y: 30, w: 200, h: 110 },
  { k: 'rep', x: 270, y: 20, w: 200, h: 90 },
];

export function Composition({ reduced }: SceneProps) {
  const tc = useT(S).comp;
  const [sel, setSel] = useState<string | null>(null);
  const zones = ZONES.map((zn) => ({ ...zn, ...tc.zones[zn.k] }));
  const z = zones.find((x) => x.k === sel);
  return (
    <Frame title={tc.title} legend={<Legend items={[{ tone: 'accent', label: tc.legendGravity }, { tone: 'cmp', label: tc.legendModule }, { tone: 'ext', label: tc.legendExt }]} />}
      foot={
        <div className="mm-info" aria-live="polite">
          {z ? <span><strong>{z.t}</strong> · <span className="mono">{z.qa}</span>. {z.why}</span> : <span className="eco-info__hint">{tc.hint}</span>}
        </div>
      }>
      <Canvas w={960} h={620} label={tc.canvas}>
        {(ids) => (
          <>
            <Edge points={[[230, 310], [270, 310]]} />
            <Edge points={[[470, 320], [510, 320]]} />
            <Edge points={[[710, 310], [750, 310]]} />
            <Edge points={[[845, 370], [845, 440]]} marker={ids.arrow} />
            <Edge points={[[130, 140], [130, 190]]} />
            <Edge points={[[370, 110], [370, 130]]} />
            <Edge points={[[130, 430], [130, 540]]} />
            <Edge points={[[330, 520], [330, 540]]} />
            <Edge points={[[430, 520], [430, 530], [520, 530], [520, 540]]} />
            {zones.map((zn) => (
              <g key={zn.k} className="mm-hit" role="button" tabIndex={0} aria-label={`${zn.t}: ${zn.qa}`} onClick={() => setSel(sel === zn.k ? null : zn.k)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(sel === zn.k ? null : zn.k); } }}>
                <rect x={zn.x} y={zn.y} width={zn.w} height={zn.h} rx={14} className={`zone ${sel === zn.k ? 'zone--accent' : ''}`} fill={sel === zn.k ? 'color-mix(in srgb, var(--accent-soft) 40%, transparent)' : 'transparent'} style={{ fill: sel === zn.k ? undefined : 'color-mix(in srgb, var(--surface) 40%, transparent)' }} />
                <text x={zn.x + 12} y={zn.y + 20} className="lb lb--muted" style={{ fontSize: 10 }}>{zn.t}</text>
                <text x={zn.x + 12} y={zn.y + zn.h - 10} className="lb lb--cmp" style={{ fontSize: 9, textTransform: 'none', letterSpacing: 0 }}>{zn.qa}</text>
              </g>
            ))}
            <g className="pe-none">
            <Node x={130} y={90} w={170} h={40} kind="cmp" icon={Bell} label={tc.notifications} />
            <Node x={370} y={68} w={170} h={36} kind="cmp" icon={BarChart3} label={tc.reports} />
            <Node x={130} y={260} w={170} h={50} kind="cmp" icon={Smartphone} label={tc.mobile} />
            <Node x={130} y={340} w={170} h={50} kind="cmp" icon={Store} label={tc.pos} />
            <Node x={370} y={180} w={170} h={46} kind="cmp" icon={MessageSquare} label={tc.feedback} />
            <Node x={370} y={260} w={170} h={46} kind="cmp" label={tc.promo} />
            <Node x={370} y={340} w={170} h={54} kind="core" icon={BookOpen} label="Menu Catalog" highlight={!reduced && sel === null} />
            <Node x={370} y={420} w={170} h={46} kind="cmp" label={tc.pickup} />
            <Node x={610} y={280} w={170} h={50} kind="cmp" icon={CalendarClock} label={tc.schedule} />
            <Node x={610} y={360} w={170} h={54} kind="core" icon={Inbox} label="Ordering" highlight={!reduced && sel === null} />
            <Node x={845} y={305} w={160} h={50} kind="cmp" icon={CreditCard} label={tc.purchase} />
            <Node x={845} y={470} w={170} h={50} kind="ext" label={tc.paySystems} />
            <Node x={130} y={570} w={170} h={50} kind="ext" icon={MapPin} label={tc.mapProvider} />
            <Node x={330} y={570} w={170} h={50} kind="ext" icon={ChefHat} label="Ghost Kitchen" />
            <Node x={530} y={570} w={180} h={50} kind="ext" icon={Refrigerator} label={tc.fridgeMgmt} />
            </g>
          </>
        )}
      </Canvas>
    </Frame>
  );
}
