import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Check, X, ShoppingBag, BookOpen, RefreshCw, Ban, Truck, Camera, Shuffle, Minimize2, Database, Activity, BarChart3,
  Smartphone, MessageSquare, HeartPulse, Globe, Users, ShieldCheck,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, EASE, type SceneProps } from './kit';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── number formatting ───────────────────────── */
const group = (n: number, sep: string) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
const dec = (n: number, d: number, comma: boolean) => {
  const s = n.toFixed(d);
  return comma ? s.replace('.', ',') : s;
};

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  es: {
    money: (n: number) => `${group(n, '.')} USD`,
    num: (n: number) => group(n, '.'),
    dec: (n: number, d = 2) => dec(n, d, true),
    times: (r: number) => `×${Math.abs(r - Math.round(r)) < 0.05 ? Math.round(r) : dec(r, 1, true)}`,
    scen: {
      title: 'Los tres escenarios de la planilla',
      canvas: 'Tres escenarios contra la vara de una petición por segundo: mínimo, 500 peticiones por día; proyectado, 1.000; crecimiento rápido, 10.000. Incluso el rápido queda cerca de una décima de petición por segundo.',
      scenario: 'escenario',
      zero: '0',
      yard: '1 petición / segundo · capítulo 1',
      promised: 'el que anunció el capítulo 1',
      rows: [
        { name: 'Mínimo', l1: '500 peticiones por día', l2: '15 mil por mes', rate: '≈ 0,006 / s' },
        { name: 'Crecimiento proyectado', l1: '1.000 peticiones por día', l2: '31 mil por mes', rate: '≈ 0,012 / s' },
        { name: 'Crecimiento rápido', l1: '10.000 peticiones por día', l2: '310 mil por mes', rate: '≈ 0,12 / s' },
      ],
      note: 'Hasta el escenario rápido queda en una décima de petición por segundo.',
    },
    vol: {
      title: 'Volumetría de mensajes · documento original',
      legendHeavy: 'El más pesado',
      legendSync: 'Catálogo y su actualización',
      msg: 'Mensaje',
      weight: 'Peso · escala logarítmica',
      freq: 'Frecuencia',
      hidden: 'elegí una respuesta para ver los pesos',
      rows: {
        confirm: { name: 'Confirmar una orden', freq: '1 a 3 por día por usuario' },
        catalog: { name: 'Catálogo completo, sin imágenes', freq: '1 descarga por día, vive 24 h en el dispositivo' },
        stock: { name: 'Stock de una heladera', freq: 'con cada orden y por lote de la heladera' },
        cancel: { name: 'Cancelar una orden', freq: '2 a 5% de todas las órdenes' },
        dispatch: { name: 'Despacho del día a una cocina', freq: '0 a 2 por día por heladera' },
        review: { name: 'Review con foto', freq: '10% escribe reviews; 5% registra un problema' },
      },
      weights: { confirm: '0,2 kb', catalog: '500–700 kb', stock: '0,1–150 kb', cancel: '0,1 kb', dispatch: '20–50 kb', review: '~4 MB' },
      ticks: ['0,1 kb', '10 kb', '1 MB'],
      syncNote: 'El catálogo baja entero una vez por día; después lo mantienen al día mensajes chicos de stock.',
    },
    fc: {
      titleDb: 'Crecimiento de la base de datos por mes',
      titleTr: 'Tráfico por mes contra base de datos',
      legendDb: 'Base de datos',
      legendTr: 'Tráfico',
      canvasDb: 'Barras de crecimiento mensual de la base de datos para 500, 1.000, 5.000 y 10.000 peticiones por día: 1,98, 3,96, 19,80 y 39,61 GiB por mes.',
      canvasTr: 'Barras de tráfico mensual para 500, 1.000, 5.000 y 10.000 peticiones por día: 8,25, 16,50, 82,51 y 165,02 GiB, junto a la base de datos, cuatro veces más chica.',
      axisY: 'GiB por mes',
      axisX: 'peticiones por día',
      hint: 'Tocá una columna',
      records: ['15 mil', '30 mil', '150 mil', '300 mil'],
      readDb: (req: string, rec: string, v: string): ReactNode => <><tspan fontWeight={700}>{req} peticiones por día</tspan> · {rec} registros por mes → <tspan fontWeight={700} className="c9-hl">{v} GiB</tspan> de base por mes</>,
      readTr: (req: string, v: string, ph: string): ReactNode => <><tspan fontWeight={700}>{req} por día</tspan> → <tspan fontWeight={700} className="c9-hl">{v} GiB</tspan> de tráfico por mes, <tspan fontWeight={700}>{ph} GiB</tspan> de ellos en fotos</>,
    },
    asm: {
      title: 'Los supuestos, a la vista',
      uniform: { t: 'Tráfico uniforme', q: '“En la realidad, el número podría ser hasta un 60% menor.”', est: '3,96 GiB estimados', cut: 'hasta −60%' },
      gzip: { t: 'Sin compresión', q: 'Con GZIP, el tráfico y el almacenamiento bajarían de forma significativa.', est: '16,5 GiB sin comprimir', cut: 'con GZIP' },
      dynamo: { t: 'Base a 12 meses', q: '1 TB fijo de DynamoDB, igual en los tres escenarios.', db: 'DynamoDB 1 TB', ec2: 'Todas las máquinas' },
    },
    tot: {
      title: 'Costo total del año 1 por escenario',
      canvas: 'Costo anual por escenario: mínimo 12.248 USD, proyectado 12.548 USD, crecimiento rápido 22.481 USD. Si el costo creciera en proporción a la carga, el rápido costaría 125.482 USD.',
      canvasHidden: 'Costo anual por escenario: mínimo 12.248 USD, proyectado 12.548 USD; el del crecimiento rápido queda oculto hasta que respondas.',
      cols: [
        { name: 'Mínimo', sub: '500 por día' },
        { name: 'Proyectado', sub: '1.000 por día' },
        { name: 'Rápido', sub: '10.000 por día' },
        { name: '10 × proyectado', sub: 'si fuera lineal' },
      ],
      guess: '¿?',
      guessSub: 'respondé a la izquierda',
      ratio: '×1,8 la factura',
      perMonth: (m: string) => `≈ ${m} por mes`,
    },
    bill: {
      title: 'La factura del año 1, línea por línea',
      scenario: 'Escenario',
      scen: ['Mínimo', 'Proyectado', 'Rápido ×10'],
      legendGrow: 'Crece contra el mínimo',
      legendRent: 'Monitoreo y reportes',
      canvas: (s: string, total: string) => `Costo anual por servicio en el escenario ${s}; total ${total}. DataDog 3.336 USD, EC2 entre 3.115 y 6.230 USD, DynamoDB 3.072 USD, Tableau entre 1.440 y 2.880 USD, Amazon MQ, SNS, S3, Kafka y VPN.`,
      service: 'servicio',
      cost: 'costo del año 1',
      vsMin: 'vs. mínimo',
      total: 'Total del año 1',
      perMonth: (m: string) => `≈ ${m} por mes`,
      tbd: 'Balanceador de carga y transferencia saliente: “TBD” en la tabla del equipo.',
      share: 'de la factura',
      lines: {
        datadog: 'Monitoreo (DataDog)',
        tableau: 'Reportes (Tableau)',
        dynamo: 'Base (DynamoDB)',
        ec2: 'Máquinas (EC2)',
        mq: 'Colas (Amazon MQ)',
        sns: 'Avisos (SNS)',
        s3: 'Archivos (S3)',
        kafka: 'Logs (Kafka)',
        vpn: 'VPN',
      },
    },
    cmp: {
      title: 'Lo que compararon antes de pagar',
      monitoring: 'Monitoreo',
      reporting: 'Reportes',
      chosen: 'elegido',
      datadog: { p: '15 USD por servidor al mes', d: 'Servicio gestionado: integración mínima, sin mantenimiento' },
      grafana: { p: 'Gratis, open source', d: 'Descartado: exige mantenimiento propio' },
      elk: { p: 'Gratis, open source', d: 'Descartado: exige mantenimiento propio' },
      tableau: { p: '1.440 USD al año en la tabla', d: 'Tableros y reportes para el negocio' },
      powerbi: { p: 'Alternativa comparada', d: 'Viable solo si el dueño tenía suscripción Microsoft' },
      kool: { p: 'Alternativa comparada', d: 'La tercera opción que evaluaron para reportes' },
      band: <>Con open source, cuidar el monitoreo se habría llevado <strong>entre 0,2 y 0,5 de un desarrollador</strong>. (ADR 003)</>,
    },
    priv: {
      title: 'Reviews y encuestas · ADR 010',
      legendOwn: 'Construido en casa',
      legendExt: 'Tercero',
      legendBlock: 'No sale',
      canvas: 'La plataforma de Farmacy Food contiene la app, el módulo de feedback construido en casa y los perfiles de salud. Las encuestas web de terceros quedan afuera, tachadas: los datos de salud no cruzan el borde de la plataforma.',
      platform: 'plataforma Farmacy Food',
      app: 'App del suscriptor',
      feedback: 'Módulo de feedback',
      feedbackSub: 'construido en casa',
      health: 'Perfiles de salud',
      healthSub: 'diabetes, celiaquía, dietas',
      review: 'review',
      ext: 'Encuestas externas',
      extSub: 'listas para usar',
      declined: 'ADR 010 · rechazado',
      stays: 'los datos de salud no salen de la plataforma',
    },
    yard: {
      title: 'Una sola pregunta: ¿cuánto nos cuesta de verdad?',
      buy: 'Comprar',
      build: 'Construir',
      mon: {
        t: 'Monitoreo',
        buy: '15 USD por servidor al mes, sin mantenimiento',
        build: 'Licencia gratis, pero 0,2 a 0,5 de un desarrollador para mantenerlo',
        verdict: 'Alquilar DataDog',
      },
      srv: {
        t: 'Encuestas',
        buy: 'Listas para usar, pero con datos de salud en servidores de terceros',
        build: 'Más código propio que mantener, con los datos adentro',
        verdict: 'Feedback propio',
      },
    },
  },
  en: {
    money: (n: number) => `$${group(n, ',')}`,
    num: (n: number) => group(n, ','),
    dec: (n: number, d = 2) => dec(n, d, false),
    times: (r: number) => `×${Math.abs(r - Math.round(r)) < 0.05 ? Math.round(r) : dec(r, 1, false)}`,
    scen: {
      title: 'The spreadsheet’s three scenarios',
      canvas: 'Three scenarios against a yardstick of one request per second: minimum, 500 requests a day; projected, 1,000; rapid growth, 10,000. Even the rapid one stays around a tenth of a request per second.',
      scenario: 'scenario',
      zero: '0',
      yard: '1 request / second · chapter 1',
      promised: 'the one chapter 1 announced',
      rows: [
        { name: 'Minimum', l1: '500 requests a day', l2: '15k a month', rate: '≈ 0.006 / s' },
        { name: 'Projected growth', l1: '1,000 requests a day', l2: '31k a month', rate: '≈ 0.012 / s' },
        { name: 'Rapid growth', l1: '10,000 requests a day', l2: '310k a month', rate: '≈ 0.12 / s' },
      ],
      note: 'Even the rapid scenario stays around a tenth of one request per second.',
    },
    vol: {
      title: 'Message volumetry · original document',
      legendHeavy: 'The heaviest',
      legendSync: 'Catalog and its updates',
      msg: 'Message',
      weight: 'Weight · log scale',
      freq: 'Frequency',
      hidden: 'pick an answer to see the weights',
      rows: {
        confirm: { name: 'Confirming an order', freq: '1 to 3 a day per user' },
        catalog: { name: 'Full catalog, no images', freq: '1 download a day, lives 24 h on the device' },
        stock: { name: 'Stock update for one fridge', freq: 'with every order and per fridge batch' },
        cancel: { name: 'Cancelling an order', freq: '2 to 5% of all orders' },
        dispatch: { name: 'Daily dispatch to a kitchen', freq: '0 to 2 a day per fridge' },
        review: { name: 'Review with a photo', freq: '10% write reviews; 5% report a problem' },
      },
      weights: { confirm: '0.2 kb', catalog: '500–700 kb', stock: '0.1–150 kb', cancel: '0.1 kb', dispatch: '20–50 kb', review: '~4 MB' },
      ticks: ['0.1 kb', '10 kb', '1 MB'],
      syncNote: 'The catalog comes down whole once a day; small stock messages keep it fresh after that.',
    },
    fc: {
      titleDb: 'Database growth per month',
      titleTr: 'Traffic per month against the database',
      legendDb: 'Database',
      legendTr: 'Traffic',
      canvasDb: 'Monthly database growth for 500, 1,000, 5,000 and 10,000 requests a day: 1.98, 3.96, 19.80 and 39.61 GiB a month.',
      canvasTr: 'Monthly traffic for 500, 1,000, 5,000 and 10,000 requests a day: 8.25, 16.50, 82.51 and 165.02 GiB, next to the database, four times smaller.',
      axisY: 'GiB per month',
      axisX: 'requests per day',
      hint: 'Tap a column',
      records: ['15k', '30k', '150k', '300k'],
      readDb: (req: string, rec: string, v: string): ReactNode => <><tspan fontWeight={700}>{req} requests a day</tspan> · {rec} records a month → <tspan fontWeight={700} className="c9-hl">{v} GiB</tspan> of database a month</>,
      readTr: (req: string, v: string, ph: string): ReactNode => <><tspan fontWeight={700}>{req} a day</tspan> → <tspan fontWeight={700} className="c9-hl">{v} GiB</tspan> of traffic a month, <tspan fontWeight={700}>{ph} GiB</tspan> of it photos</>,
    },
    asm: {
      title: 'The assumptions, in plain sight',
      uniform: { t: 'Uniform traffic', q: '“In reality the number could be up to 60% smaller.”', est: '3.96 GiB estimated', cut: 'up to −60%' },
      gzip: { t: 'No compression', q: 'With GZIP, traffic and storage would drop significantly.', est: '16.5 GiB uncompressed', cut: 'with GZIP' },
      dynamo: { t: 'Sized for 12 months', q: 'A fixed 1 TB of DynamoDB, the same in all three scenarios.', db: 'DynamoDB 1 TB', ec2: 'All the machines' },
    },
    tot: {
      title: 'Year-1 total cost by scenario',
      canvas: 'Yearly cost by scenario: minimum $12,248, projected $12,548, rapid growth $22,481. If cost grew in proportion to load, the rapid one would cost $125,482.',
      canvasHidden: 'Yearly cost by scenario: minimum $12,248, projected $12,548; the rapid-growth one stays hidden until you answer.',
      cols: [
        { name: 'Minimum', sub: '500 a day' },
        { name: 'Projected', sub: '1,000 a day' },
        { name: 'Rapid', sub: '10,000 a day' },
        { name: '10 × projected', sub: 'if it were linear' },
      ],
      guess: '?',
      guessSub: 'answer on the left',
      ratio: '×1.8 the bill',
      perMonth: (m: string) => `≈ ${m} a month`,
    },
    bill: {
      title: 'The year-1 bill, line by line',
      scenario: 'Scenario',
      scen: ['Minimum', 'Projected', 'Rapid ×10'],
      legendGrow: 'Grows vs. minimum',
      legendRent: 'Monitoring and reporting',
      canvas: (s: string, total: string) => `Yearly cost per service in the ${s} scenario; total ${total}. DataDog $3,336, EC2 between $3,115 and $6,230, DynamoDB $3,072, Tableau between $1,440 and $2,880, Amazon MQ, SNS, S3, Kafka and VPN.`,
      service: 'service',
      cost: 'year-1 cost',
      vsMin: 'vs. minimum',
      total: 'Total, year 1',
      perMonth: (m: string) => `≈ ${m} a month`,
      tbd: 'Load balancer and outbound data transfer: “TBD” in the team’s table.',
      share: 'of the bill',
      lines: {
        datadog: 'Monitoring (DataDog)',
        tableau: 'Reporting (Tableau)',
        dynamo: 'Database (DynamoDB)',
        ec2: 'Machines (EC2)',
        mq: 'Queues (Amazon MQ)',
        sns: 'Notifications (SNS)',
        s3: 'Files (S3)',
        kafka: 'Log streams (Kafka)',
        vpn: 'VPN',
      },
    },
    cmp: {
      title: 'What they compared before paying',
      monitoring: 'Monitoring',
      reporting: 'Reporting',
      chosen: 'chosen',
      datadog: { p: '$15 per host per month', d: 'Managed service: minimal integration, no maintenance' },
      grafana: { p: 'Free, open source', d: 'Rejected: demands in-house maintenance' },
      elk: { p: 'Free, open source', d: 'Rejected: demands in-house maintenance' },
      tableau: { p: '$1,440 a year in the table', d: 'Dashboards and reports for the business' },
      powerbi: { p: 'Alternative compared', d: 'Viable only if the owner held a Microsoft subscription' },
      kool: { p: 'Alternative compared', d: 'The third option they weighed for reporting' },
      band: <>With open source, looking after monitoring would have taken <strong>0.2 to 0.5 of a developer</strong>. (ADR 003)</>,
    },
    priv: {
      title: 'Reviews and surveys · ADR 010',
      legendOwn: 'Built in-house',
      legendExt: 'Third party',
      legendBlock: 'Stays in',
      canvas: 'The Farmacy Food platform holds the app, the in-house feedback module and the health profiles. Third-party web surveys sit outside, crossed out: health data never crosses the platform boundary.',
      platform: 'Farmacy Food platform',
      app: 'Subscriber app',
      feedback: 'Feedback module',
      feedbackSub: 'built in-house',
      health: 'Health profiles',
      healthSub: 'diabetes, celiac, diets',
      review: 'review',
      ext: 'External surveys',
      extSub: 'ready-made, third party',
      declined: 'ADR 010 · declined',
      stays: 'health data never leaves the platform',
    },
    yard: {
      title: 'One question: what does it really cost us?',
      buy: 'Buy',
      build: 'Build',
      mon: {
        t: 'Monitoring',
        buy: '$15 per host per month, no maintenance',
        build: 'Free license, but 0.2 to 0.5 of a developer to keep it running',
        verdict: 'Rent DataDog',
      },
      srv: {
        t: 'Surveys',
        buy: 'Ready-made, but with health data on third-party servers',
        build: 'More in-house code to maintain, with the data kept inside',
        verdict: 'In-house feedback',
      },
    },
  },
});

/* ───────────────────────── 1 · the three scenarios against 1 req/s ───────────────────────── */
export function Scenarios({ reduced }: SceneProps) {
  const t = useT(S).scen;
  const rates = [500 / 86400, 1000 / 86400, 10000 / 86400];
  const X0 = 380, TW = 540;
  const ys = [145, 262, 395];
  return (
    <Frame title={t.title}>
      <Canvas w={960} h={520} label={t.canvas}>
        {() => (
          <>
            <Label x={40} y={72} anchor="start">{t.scenario}</Label>
            <Label x={X0} y={72} anchor="start">{t.zero}</Label>
            <Label x={X0 + TW} y={72} anchor="end">{t.yard}</Label>
            <line x1={X0} x2={X0} y1={86} y2={440} stroke="var(--line-strong)" strokeDasharray="3 5" />
            <line x1={X0 + TW} x2={X0 + TW} y1={86} y2={440} stroke="var(--line-strong)" strokeDasharray="3 5" />
            <Label x={40} y={ys[2] - 58} anchor="start" tone="accent" size={10.5}>{t.promised}</Label>
            {t.rows.map((r, i) => {
              const cy = ys[i];
              const rapid = i === 2;
              const bw = Math.max(4, rates[i] * TW);
              return (
                <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : i * 0.15, duration: 0.4 }}>
                  <rect x={24} y={cy - 46} width={326} height={92} rx={12} className={`c9-card ${rapid ? 'is-focus' : ''}`} />
                  <text x={44} y={cy - 12} className="c9-t c9-t--name">{r.name}</text>
                  <text x={44} y={cy + 12} className="c9-t c9-t--sub">{r.l1}</text>
                  <text x={44} y={cy + 31} className="c9-t c9-t--sub">{r.l2}</text>
                  <rect x={X0} y={cy - 15} width={TW} height={30} rx={8} className="c9-track" />
                  <motion.rect
                    x={X0}
                    y={cy - 15}
                    height={30}
                    rx={4}
                    className={rapid ? 'c9-bar c9-bar--accent' : 'c9-bar'}
                    initial={{ width: reduced ? bw : 0 }}
                    animate={{ width: bw }}
                    transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 0.3 + i * 0.2 }}
                  />
                  <text x={X0 + bw + 12} y={cy + 5} className={`c9-t c9-t--val ${rapid ? 'c9-hl' : ''}`}>{r.rate}</text>
                </motion.g>
              );
            })}
            <text x={480} y={488} textAnchor="middle" className="c9-t c9-t--note">{t.note}</text>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 2 · volumetry table ───────────────────────── */
type VolK = 'confirm' | 'catalog' | 'stock' | 'cancel' | 'dispatch' | 'review';
const VOL: { k: VolK; icon: any; min: number; max: number }[] = [
  { k: 'confirm', icon: ShoppingBag, min: 0.2, max: 0.2 },
  { k: 'catalog', icon: BookOpen, min: 500, max: 700 },
  { k: 'stock', icon: RefreshCw, min: 0.1, max: 150 },
  { k: 'cancel', icon: Ban, min: 0.1, max: 0.1 },
  { k: 'dispatch', icon: Truck, min: 20, max: 50 },
  { k: 'review', icon: Camera, min: 4096, max: 4096 },
];
const LOG0 = Math.log10(0.05), LOG1 = Math.log10(6000);
const logPos = (kb: number) => ((Math.log10(kb) - LOG0) / (LOG1 - LOG0)) * 100;

export function Volumetry({ state = 'guess', chosen, reduced }: SceneProps) {
  const t = useT(S).vol;
  const habit = state === 'habit';
  const shown = habit || chosen !== null;
  return (
    <Frame
      title={t.title}
      legend={<Legend items={habit ? [{ tone: 'accent', label: t.legendHeavy }, { tone: 'cmd', label: t.legendSync }] : [{ tone: 'accent', label: t.legendHeavy }]} />}
    >
      <div className="c9-vol">
        <div className="c9-vol__row c9-vol__row--head mono">
          <span>{t.msg}</span>
          <span>{t.weight}</span>
          <span>{t.freq}</span>
        </div>
        {VOL.map((r, i) => {
          const heavy = shown && r.k === 'review';
          const sync = habit && (r.k === 'catalog' || r.k === 'stock');
          const a = logPos(r.min), b = logPos(r.max);
          return (
            <div key={r.k} className={`c9-vol__row ${heavy ? 'is-heavy' : ''} ${sync ? 'is-sync' : ''}`}>
              <span className="c9-vol__name"><r.icon size={16} aria-hidden /> {t.rows[r.k].name}</span>
              <span className="c9-vol__w">
                <span className="c9-vol__track">
                  <motion.span
                    className="c9-vol__bar"
                    initial={false}
                    animate={{ width: shown ? `${a}%` : '0%' }}
                    transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : i * 0.07 }}
                  />
                  {b - a > 0.5 && (
                    <motion.span
                      className="c9-vol__range"
                      initial={false}
                      animate={{ left: shown ? `${a}%` : '0%', width: shown ? `${b - a}%` : '0%' }}
                      transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : i * 0.07 }}
                    />
                  )}
                </span>
                <span className="c9-vol__v mono">{shown ? t.weights[r.k] : '?'}</span>
              </span>
              <span className="c9-vol__f">{t.rows[r.k].freq}</span>
            </div>
          );
        })}
        <div className="c9-vol__row c9-vol__row--axis mono" aria-hidden>
          <span>{shown ? '' : t.hidden}</span>
          <span className="c9-vol__ticks">
            {t.ticks.map((tk, i) => (
              <span key={tk} style={{ left: `${logPos([0.1, 10, 1024][i])}%` }}>{tk}</span>
            ))}
          </span>
          <span />
        </div>
        {habit && (
          <motion.p className="c9-vol__note" initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.3 }}>
            <RefreshCw size={15} aria-hidden /> {t.syncNote}
          </motion.p>
        )}
      </div>
    </Frame>
  );
}

/* ───────────────────────── 3 · database and traffic forecasts ───────────────────────── */
const FC = [
  { req: 500, db: 1.98, tr: 8.25, photos: (5603.47 + 2801.75) / 1024 },
  { req: 1000, db: 3.96, tr: 16.5, photos: (11206.95 + 5603.5) / 1024 },
  { req: 5000, db: 19.8, tr: 82.51, photos: (56034.73 + 28017.5) / 1024 },
  { req: 10000, db: 39.61, tr: 165.02, photos: (112069.45 + 56035.01) / 1024 },
];

export function Forecast({ state = 'db', reduced }: SceneProps) {
  const T = useT(S);
  const t = T.fc;
  const tr = state === 'traffic';
  const [sel, setSel] = useState(1);
  const X0 = 110, X1 = 900, BASE = 440, H = 290;
  const max = tr ? 180 : 45;
  const ticks = tr ? [0, 40, 80, 120, 160] : [0, 10, 20, 30, 40];
  const colW = (X1 - X0) / 4;
  const cx = (i: number) => X0 + colW * (i + 0.5);
  const hOf = (v: number) => (v / max) * H;
  const tr0 = { duration: reduced ? 0 : 0.8, ease: EASE };
  const f = FC[sel];
  return (
    <Frame
      title={tr ? t.titleTr : t.titleDb}
      legend={<Legend items={tr ? [{ tone: 'cmp', label: t.legendDb }, { tone: 'cmd', label: t.legendTr }] : [{ tone: 'cmp', label: t.legendDb }]} />}
    >
      <Canvas w={960} h={540} label={tr ? t.canvasTr : t.canvasDb}>
        {() => (
          <>
            <text x={480} y={48} textAnchor="middle" className="c9-t c9-t--read">
              {tr ? t.readTr(T.num(f.req), T.dec(f.tr), T.dec(f.photos)) : t.readDb(T.num(f.req), t.records[sel], T.dec(f.db))}
            </text>
            <Label x={X0 - 12} y={104} anchor="start">{t.axisY}</Label>
            {ticks.map((v, i) => (
              <motion.g key={`${state}-${v}`} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: reduced ? 0 : 0.2 + i * 0.03 }}>
                <line x1={X0} x2={X1} y1={BASE - hOf(v)} y2={BASE - hOf(v)} stroke="var(--line)" strokeDasharray={v ? '3 5' : undefined} />
                <text x={X0 - 12} y={BASE - hOf(v) + 4} textAnchor="end" className="c9-t c9-t--tick">{v}</text>
              </motion.g>
            ))}
            {FC.map((d, i) => {
              const on = i === sel;
              const dbW = tr ? 56 : 92;
              const dbX = tr ? cx(i) - 62 : cx(i) - dbW / 2;
              const trX = cx(i) + 6;
              const dbH = hOf(d.db), trH = hOf(d.tr);
              return (
                <g key={d.req}>
                  <rect x={cx(i) - colW / 2 + 8} y={96} width={colW - 16} height={BASE - 96 + 58} rx={12} className={`c9-col ${on ? 'is-on' : ''}`} />
                  <motion.rect
                    className="c9-bar c9-bar--db"
                    rx={5}
                    initial={false}
                    animate={{ x: dbX, width: dbW, y: BASE - Math.max(2, dbH), height: Math.max(2, dbH), opacity: tr && !on ? 0.55 : 1 }}
                    transition={tr0}
                  />
                  <motion.text
                    textAnchor="middle"
                    className={`c9-t c9-t--bv ${on && !tr ? 'is-on' : ''}`}
                    initial={false}
                    animate={{ x: dbX + dbW / 2, y: BASE - Math.max(2, dbH) - 10 }}
                    transition={tr0}
                  >
                    {T.dec(d.db)}
                  </motion.text>
                  <motion.rect
                    className="c9-bar c9-bar--tr"
                    rx={5}
                    x={trX}
                    width={56}
                    initial={false}
                    animate={{ y: tr ? BASE - trH : BASE, height: tr ? trH : 0, opacity: tr ? 1 : 0 }}
                    transition={{ ...tr0, delay: reduced || !tr ? 0 : 0.25 }}
                  />
                  <motion.text
                    x={trX + 28}
                    textAnchor="middle"
                    className={`c9-t c9-t--bv ${on && tr ? 'is-on' : ''}`}
                    initial={false}
                    animate={{ y: (tr ? BASE - trH : BASE) - 10, opacity: tr ? 1 : 0 }}
                    transition={{ ...tr0, delay: reduced || !tr ? 0 : 0.25 }}
                  >
                    {T.dec(d.tr)}
                  </motion.text>
                  <text x={cx(i)} y={BASE + 32} textAnchor="middle" className={`c9-t c9-t--x ${on ? 'is-on' : ''}`}>{T.num(d.req)}</text>
                  <rect
                    x={cx(i) - colW / 2 + 8}
                    y={96}
                    width={colW - 16}
                    height={BASE - 96 + 58}
                    fill="transparent"
                    style={{ cursor: 'pointer', outline: 'none' }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={on}
                    aria-label={`${T.num(d.req)} ${t.axisX}`}
                    onClick={() => setSel(i)}
                    onFocus={() => setSel(i)}
                    onMouseEnter={() => setSel(i)}
                  />
                </g>
              );
            })}
            <Label x={480} y={528} tone="muted">{t.axisX}</Label>
            <Label x={X1} y={104} anchor="end" size={10}>{t.hint}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 4 · the assumptions ───────────────────────── */
export function Assumptions({ reduced }: SceneProps) {
  const T = useT(S);
  const t = T.asm;
  const cards = [
    {
      k: 'uniform',
      icon: Shuffle,
      title: t.uniform.t,
      q: t.uniform.q,
      viz: (
        <div className="c9-asm__viz">
          <span className="c9-asm__lab">{t.uniform.est}</span>
          <span className="c9-asm__bar">
            <motion.span className="c9-asm__fill c9-asm__fill--db" initial={{ width: reduced ? '40%' : '100%' }} animate={{ width: '40%' }} transition={{ duration: 1, ease: EASE, delay: reduced ? 0 : 0.6 }} />
            <span className="c9-asm__cut mono">{t.uniform.cut}</span>
          </span>
        </div>
      ),
    },
    {
      k: 'gzip',
      icon: Minimize2,
      title: t.gzip.t,
      q: t.gzip.q,
      viz: (
        <div className="c9-asm__viz">
          <span className="c9-asm__lab">{t.gzip.est}</span>
          <span className="c9-asm__bar c9-asm__bar--gzip">
            <span className="c9-asm__fill c9-asm__fill--tr" />
            <span className="c9-asm__cut mono">↓ {t.gzip.cut}</span>
          </span>
        </div>
      ),
    },
    {
      k: 'dynamo',
      icon: Database,
      title: t.dynamo.t,
      q: t.dynamo.q,
      viz: (
        <div className="c9-asm__viz c9-asm__viz--pair">
          {[
            { l: t.dynamo.db, v: 3072, cls: 'c9-asm__fill--db' },
            { l: t.dynamo.ec2, v: 3114.96, cls: '' },
          ].map((r, i) => (
            <div key={r.l} className="c9-asm__pair">
              <span className="c9-asm__lab">{r.l}</span>
              <span className="c9-asm__bar">
                <motion.span className={`c9-asm__fill ${r.cls}`} initial={{ width: reduced ? `${(r.v / 3200) * 100}%` : '0%' }} animate={{ width: `${(r.v / 3200) * 100}%` }} transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 0.5 + i * 0.15 }} />
              </span>
              <span className="c9-asm__v mono">{T.money(r.v)}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];
  return (
    <Frame title={t.title}>
      <div className="c9-asm">
        {cards.map((c, i) => (
          <motion.div key={c.k} className="vcard c9-asm__card" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : i * 0.12 }}>
            <span className="c9-asm__ic"><c.icon size={18} aria-hidden /></span>
            <strong className="c9-asm__t">{c.title}</strong>
            <p className="c9-asm__q">{c.q}</p>
            {c.viz}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ───────────────────────── 5 · ten times the load: the totals ───────────────────────── */
const TOTALS = [12247.57, 12548.17, 22480.57];

export function Totals({ chosen, reduced }: SceneProps) {
  const T = useT(S);
  const t = T.tot;
  const open = chosen !== null;
  const ghost = TOTALS[1] * 10;
  const BASE = 430, H = 300;
  const max = open ? 130000 : 25000;
  const xs = [180, 390, 600, 810];
  const W = 120;
  const hOf = (v: number) => (v / max) * H;
  const tr0 = { duration: reduced ? 0 : 0.9, ease: EASE };
  const vals = [TOTALS[0], TOTALS[1], TOTALS[2], ghost];
  return (
    <Frame title={t.title}>
      <Canvas w={960} h={540} label={open ? t.canvas : t.canvasHidden}>
        {() => (
          <>
            <line x1={60} x2={900} y1={BASE} y2={BASE} stroke="var(--line-strong)" />
            {vals.map((v, i) => {
              const isGhost = i === 3;
              const isRapid = i === 2;
              const visible = i < 2 || open;
              const h = hOf(v);
              return (
                <g key={i}>
                  <motion.rect
                    x={xs[i] - W / 2}
                    width={W}
                    rx={6}
                    className={isGhost ? 'c9-ghost' : isRapid ? 'c9-bar c9-bar--accent' : 'c9-bar'}
                    initial={false}
                    animate={{ y: visible ? BASE - h : BASE, height: visible ? h : 0, opacity: visible ? 1 : 0 }}
                    transition={{ ...tr0, delay: reduced ? 0 : isGhost ? 0.5 : isRapid ? 0.25 : 0 }}
                  />
                  <motion.text
                    x={xs[i]}
                    textAnchor="middle"
                    className={`c9-t c9-t--big ${isRapid ? 'c9-hl' : ''} ${isGhost ? 'is-ghost' : ''}`}
                    initial={false}
                    animate={{ y: (visible ? BASE - h : BASE) - 16, opacity: visible ? 1 : 0 }}
                    transition={{ ...tr0, delay: reduced ? 0 : isGhost ? 0.5 : isRapid ? 0.25 : 0 }}
                  >
                    {T.money(v)}
                  </motion.text>
                  {(i < 3 || open) && (
                    <motion.g initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : isGhost ? 0.8 : 0 }}>
                      <text x={xs[i]} y={BASE + 30} textAnchor="middle" className={`c9-t c9-t--x ${isRapid ? 'is-on' : ''}`}>{t.cols[i].name}</text>
                      <text x={xs[i]} y={BASE + 52} textAnchor="middle" className="c9-t c9-t--sub">{t.cols[i].sub}</text>
                    </motion.g>
                  )}
                </g>
              );
            })}
            {/* the unknown column, until the reader commits to an answer */}
            <motion.g initial={false} animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.3 }} style={{ pointerEvents: 'none' }}>
              <rect x={xs[2] - W / 2} y={BASE - 250} width={W} height={250} rx={6} className="c9-unknown" />
              <text x={xs[2]} y={BASE - 110} textAnchor="middle" className="c9-t c9-t--q">{t.guess}</text>
              <text x={xs[3]} y={BASE - 120} textAnchor="middle" className="c9-t c9-t--sub">{t.guessSub}</text>
            </motion.g>
            <motion.g initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.4, delay: open && !reduced ? 1 : 0 }}>
              <text x={xs[2]} y={BASE - hOf(TOTALS[2]) - 44} textAnchor="middle" className="c9-t c9-t--ratio">{t.ratio}</text>
            </motion.g>
            <text x={xs[1]} y={BASE + 76} textAnchor="middle" className="c9-t c9-t--sub">{t.perMonth(T.money(TOTALS[1] / 12))}</text>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 6 · the bill, line by line ───────────────────────── */
type LineK = 'datadog' | 'tableau' | 'dynamo' | 'ec2' | 'mq' | 'sns' | 's3' | 'kafka' | 'vpn';
const LINES: { k: LineK; v: [number, number, number] }[] = [
  { k: 'datadog', v: [3336, 3336, 3336] },
  { k: 'tableau', v: [1440, 1440, 2880] },
  { k: 'dynamo', v: [3072, 3072, 3072] },
  { k: 'ec2', v: [3114.96, 3114.96, 6230.04] },
  { k: 'mq', v: [508.32, 546.72, 1203.36] },
  { k: 'sns', v: [366.12, 366.12, 366.12] },
  { k: 's3', v: [262.32, 524.52, 5245.2] },
  { k: 'kafka', v: [138.72, 138.72, 138.72] },
  { k: 'vpn', v: [9.13, 9.13, 9.13] },
];

export function Bill({ state = 'explore', reduced }: SceneProps) {
  const T = useT(S);
  const t = T.bill;
  const rented = state === 'rented';
  const [sc, setSc] = useState(0);
  useEffect(() => { if (rented) setSc(0); }, [rented]);
  const total = TOTALS[sc];
  const X = 262, MAXW = 470, MAXV = 6230.04;
  const y0 = 100, dy = 40;
  const tr0 = { duration: reduced ? 0 : 0.7, ease: EASE };
  const share = (LINES[0].v[sc] + LINES[1].v[sc]) / total;
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'accent', label: rented ? t.legendRent : t.legendGrow }]} />}
      foot={
        <div className="seg seg--lg" role="group" aria-label={t.scenario}>
          {t.scen.map((s, i) => (
            <button key={s} type="button" aria-pressed={sc === i} onClick={() => setSc(i)}>{s}</button>
          ))}
        </div>
      }
    >
      <Canvas w={960} h={540} label={t.canvas(t.scen[sc], T.money(total))}>
        {() => (
          <>
            <Label x={36} y={66} anchor="start">{t.service}</Label>
            <Label x={X} y={66} anchor="start">{t.cost}</Label>
            {!rented && sc > 0 && <Label x={884} y={66}>{t.vsMin}</Label>}
            {LINES.map((l, i) => {
              const v = l.v[sc];
              const ratio = v / l.v[0];
              const grows = ratio >= 1.05;
              const focus = rented ? l.k === 'datadog' || l.k === 'tableau' : grows;
              const w = Math.max(2, (v / MAXV) * MAXW);
              const cy = y0 + i * dy;
              return (
                <g key={l.k}>
                  <text x={36} y={cy + 5} className={`c9-t c9-t--line ${focus ? 'is-on' : ''}`}>{t.lines[l.k]}</text>
                  <rect x={X} y={cy - 12} width={MAXW} height={24} rx={5} className="c9-track c9-track--soft" />
                  <motion.rect
                    x={X}
                    y={cy - 12}
                    height={24}
                    rx={5}
                    className={focus ? 'c9-bar c9-bar--accent' : 'c9-bar'}
                    initial={false}
                    animate={{ width: w }}
                    transition={tr0}
                  />
                  <motion.text
                    y={cy + 5}
                    className={`c9-t c9-t--val ${focus ? 'c9-hl' : ''}`}
                    initial={false}
                    animate={{ x: X + w + 10 }}
                    transition={tr0}
                  >
                    {T.money(v)}
                  </motion.text>
                  {!rented && grows && (
                    <motion.g key={`${sc}-${l.k}`} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.4 }}>
                      <rect x={850} y={cy - 12} width={68} height={24} rx={12} className="c9-chip" />
                      <text x={884} y={cy + 5} textAnchor="middle" className="c9-t c9-t--chip">{T.times(ratio)}</text>
                    </motion.g>
                  )}
                </g>
              );
            })}
            {rented && (
              <motion.g initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.3 }}>
                <path d={`M 836 ${y0 - 14} H 846 V ${y0 + dy + 14} H 836`} fill="none" stroke="var(--accent)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <text x={890} y={y0 + dy / 2 + 2} textAnchor="middle" className="c9-t c9-t--pct">{Math.round(share * 100)}%</text>
                <text x={890} y={y0 + dy / 2 + 20} textAnchor="middle" className="c9-t c9-t--tiny">{t.share}</text>
              </motion.g>
            )}
            <line x1={36} x2={924} y1={y0 + 8 * dy + 30} y2={y0 + 8 * dy + 30} stroke="var(--line-strong)" />
            <text x={36} y={y0 + 8 * dy + 64} className="c9-t c9-t--line is-on">{t.total}</text>
            <text x={X} y={y0 + 8 * dy + 66} className="c9-t c9-t--total">{T.money(total)}</text>
            <text x={X + 178} y={y0 + 8 * dy + 64} className="c9-t c9-t--sub">{t.perMonth(T.money(total / 12))}</text>
            <text x={36} y={y0 + 8 * dy + 100} className="c9-t c9-t--foot">{t.tbd}</text>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 7 · what they compared ───────────────────────── */
export function Compare({ reduced }: SceneProps) {
  const t = useT(S).cmp;
  const groups: { k: string; title: string; icon: any; items: { n: string; p: string; d: string; pick?: boolean }[] }[] = [
    {
      k: 'mon', title: t.monitoring, icon: Activity,
      items: [
        { n: 'DataDog', ...t.datadog, pick: true },
        { n: 'Grafana', ...t.grafana },
        { n: 'ELK stack', ...t.elk },
      ],
    },
    {
      k: 'rep', title: t.reporting, icon: BarChart3,
      items: [
        { n: 'Tableau', ...t.tableau, pick: true },
        { n: 'Power BI', ...t.powerbi },
        { n: 'KoolReport', ...t.kool },
      ],
    },
  ];
  return (
    <Frame title={t.title}>
      <div className="c9-cmp">
        {groups.map((g, gi) => (
          <div key={g.k} className="c9-cmp__group">
            <span className="c9-cmp__gt"><g.icon size={14} aria-hidden /> {g.title}</span>
            <div className="c9-cmp__grid">
              {g.items.map((it, i) => (
                <motion.div key={it.n} className={`vcard c9-cmp__c ${it.pick ? 'is-pick' : ''}`} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : gi * 0.3 + i * 0.08 }}>
                  <strong>{it.n}</strong>
                  <span className="c9-cmp__p">{it.p}</span>
                  <span className="c9-cmp__d">{it.d}</span>
                  {it.pick && <span className="c9-cmp__badge">{t.chosen}</span>}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        <motion.div className="c9-cmp__band" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.8 }}>
          <Users size={16} aria-hidden /> <span>{t.band}</span>
        </motion.div>
      </div>
    </Frame>
  );
}

/* ───────────────────────── 8 · privacy: the data stays in ───────────────────────── */
export function Privacy({ reduced }: SceneProps) {
  const t = useT(S).priv;
  const WALL = 624;
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'accent', label: t.legendOwn }, { tone: 'ext', label: t.legendExt }, { tone: 'danger', label: t.legendBlock }]} />}>
      <Canvas w={960} h={500} label={t.canvas}>
        {(ids) => (
          <>
            <rect x={24} y={62} width={WALL - 24} height={404} rx={18} className="zone zone--accent" />
            <Label x={44} y={52} anchor="start" tone="accent">{t.platform}</Label>
            <Node x={150} y={170} w={220} h={60} kind="cmp" icon={Smartphone} label={t.app} delay={0.05} />
            <Edge points={[[260, 170], [326, 170]]} tone="cmd" marker={ids.arrowCmd} delay={0.2} />
            <Label x={293} y={154} tone="cmd" size={10}>{t.review}</Label>
            <Node x={440} y={170} w={224} h={66} kind="core" icon={MessageSquare} label={t.feedback} sub={t.feedbackSub} delay={0.15} />
            <Edge points={[[440, 203], [440, 327]]} delay={0.3} />
            <Node x={440} y={360} w={224} h={66} kind="cmp" icon={HeartPulse} label={t.health} sub={t.healthSub} delay={0.25} />
            <Edge points={[[552, 360], [720, 360], [720, 293]]} tone="danger" dashed delay={0.4} />
            {!reduced && <Packet reduced={reduced} tone="danger" points={[[552, 360], [WALL - 12, 360]]} duration={1.1} repeat repeatDelay={1.6} w={14} />}
            <motion.g initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduced ? 0 : 0.6 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx={WALL} cy={360} r={15} className="c9-stop" />
              <path d={`M ${WALL - 5.5} 354.5 L ${WALL + 5.5} 365.5 M ${WALL + 5.5} 354.5 L ${WALL - 5.5} 365.5`} stroke="var(--danger)" strokeWidth={2.2} strokeLinecap="round" />
            </motion.g>
            <Node x={812} y={260} w={236} h={66} kind="ext" icon={Globe} label={t.ext} sub={t.extSub} crossed delay={0.35} />
            <Label x={812} y={322} tone="danger" size={11}>{t.declined}</Label>
            <text x={324} y={440} textAnchor="middle" className="c9-t c9-t--note">
              {t.stays}
            </text>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 9 · one yardstick, two answers ───────────────────────── */
export function Yardstick({ reduced }: SceneProps) {
  const t = useT(S).yard;
  const cases = [
    { k: 'mon', icon: Activity, d: t.mon, win: 'buy' as const },
    { k: 'srv', icon: MessageSquare, d: t.srv, win: 'build' as const },
  ];
  return (
    <Frame title={t.title}>
      <div className="c9-yard">
        {cases.map((c, ci) => (
          <motion.div key={c.k} className="vcard c9-yard__card" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : ci * 0.2 }}>
            <strong className="c9-yard__t"><c.icon size={18} aria-hidden /> {c.d.t}</strong>
            {(['buy', 'build'] as const).map((opt) => {
              const win = c.win === opt;
              return (
                <div key={opt} className={`c9-yard__opt ${win ? 'is-win' : 'is-lose'}`}>
                  <span className="c9-yard__mark" aria-hidden>{win ? <Check size={14} /> : <X size={14} />}</span>
                  <span className="c9-yard__ol">{opt === 'buy' ? t.buy : t.build}</span>
                  <span className="c9-yard__od">{c.d[opt]}</span>
                </div>
              );
            })}
            <motion.span className="c9-yard__verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.5 + ci * 0.2 }}>
              <ShieldCheck size={15} aria-hidden /> {c.d.verdict}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/** Scenes of chapter 9, registered in ./index.ts through this map. */
export const SCENES9: Record<string, ComponentType<SceneProps>> = {
  'cost-scenarios': Scenarios,
  'cost-volumetry': Volumetry,
  'cost-forecast': Forecast,
  'cost-assumptions': Assumptions,
  'cost-totals': Totals,
  'cost-bill': Bill,
  'cost-compare': Compare,
  'cost-privacy': Privacy,
  'cost-yardstick': Yardstick,
};
