import type { ComponentType } from 'react';
import { motion } from 'motion/react';
import {
  Search, Scale, CloudRain, Receipt, Users, Gauge, Boxes, Server, Map as MapIcon, HelpCircle, Check,
  WifiOff, Clock, MessageSquare, CreditCard, Refrigerator, KeyRound, Smartphone, ScrollText, RotateCw, Camera,
  ExternalLink,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, EASE, spring, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useLocale, useT } from '../i18n/react';
import { getCourse } from '../content/course';
import { homeUrl } from '../i18n/paths';

const pad = (n: number) => String(n).padStart(2, '0');

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  en: {
    stepN: (n: number) => `Step ${n}`,
    ch: 'Ch.',
    chShort: 'CH',
    stations: [
      { l: 'Understand', s: 'the business first' },
      { l: 'Principles', s: 'criteria first' },
      { l: 'Reality first', s: 'the real world' },
      { l: 'The bill', s: 'cost per year' },
    ],
    method: {
      title: 'The method in four steps',
      legendStep: 'Step of the method',
      legendCh: 'Chapter of the course',
      canvas: {
        overview: 'Four steps in a row: understand, principles, reality first, the bill. Under each step, the numbers of the chapters where it happened.',
        focus: (n: number) => `Step ${n} of the method highlighted, with the moments of the case where it happened.`,
        skip: 'The four steps, and under each one what happens if you skip it.',
      },
      chapters: 'where each step happened · chapter numbers',
      moments: [
        [
          { ch: 1, l: '42 meals a day: less than one request per second' },
          { ch: 3, l: 'A first week of business documents, zero diagrams' },
          { ch: 3, l: 'Questions for the client instead of invented answers' },
          { ch: 1, l: 'What is not the architect’s problem, written down' },
        ],
        [
          { ch: 3, l: 'Four principles, distilled from the constraints' },
          { ch: 4, l: 'The style decided by arithmetic, not by taste' },
          { ch: 3, l: 'Every decision in an ADR, downsides included' },
          { ch: 10, l: 'The structural decisions, each with its trade-off' },
        ],
        [
          { ch: 5, l: 'What happens to the business if this piece fails?' },
          { ch: 6, l: 'One actor per fridge, a PIN for when there is no signal' },
          { ch: 7, l: 'Kitchens that can answer “can’t do” or “delayed”' },
          { ch: 8, l: 'Every risk with its mitigation written next to it' },
        ],
        [
          { ch: 2, l: 'The podium’s question was economic, not technical' },
          { ch: 9, l: 'Bytes and frequencies before choosing servers' },
          { ch: 9, l: 'Three scenarios: $12,248 to $22,481 a year' },
          { ch: 9, l: 'Paid monitoring, because the team’s hours cost too' },
        ],
      ],
      takeaways: [
        'Knowing the real volume is the fact that settles everything else.',
        'Criteria first, tools second: otherwise it turns into a war of tastes.',
        'Expect the problems prepared, instead of pretending they don’t exist.',
        'The client doesn’t deploy diagrams: they deploy invoices.',
      ],
      skipK: (n: number) => `Without step ${n}`,
      skips: [
        'You design for the imaginary system, not the real one.',
        'Every technical debate becomes a war of tastes.',
        'Problems arrive and find a design that pretended they didn’t exist.',
        'The architecture is incomplete: nobody knows what it costs to run.',
      ],
      order: 'The order is part of the method.',
    },
    yard: {
      title: 'One number, many decisions',
      legendNum: 'The real number',
      legendImag: 'The imaginary one',
      canvas: 'On the left, the imaginary system with thousands of requests per second, crossed out, and the real one with less than one request per second. From the real number, four decisions: a modular monolith, scaling up first, the free tier of Here Maps and about 1,000 dollars a month.',
      imagK: 'the imaginary system',
      imag: 'Thousands per second',
      imagSub: 'the scale of a mass-market app',
      realK: 'the real system',
      real: '< 1 request per second',
      realSub: '42 meals a day · Ch. 1',
      decK: 'what that number decided',
      decs: [
        { l: 'A modular monolith', s: 'no distributed machinery for this volume · Ch. 4' },
        { l: 'Scale up first', s: 'one bigger machine before a cluster · Ch. 8' },
        { l: 'Here Maps’ free tier', s: '250,000 free requests a month were plenty · Ch. 5' },
        { l: 'About $1,000 a month', s: 'the whole business, base scenario · Ch. 9' },
      ],
    },
    tie: {
      title: 'Four ties from the case',
      legendTie: 'The tie',
      legendPr: 'The principle',
      legendDec: 'The decision',
      canvas: 'Four rows. Many services or one: cognitive simplicity decides one modular application. Split the modules today: evolvability decides to design for extraction later. Scale up or out: mandatory telemetry decides a bigger machine first. Call or send a message: messages over calls decides commands, events and a log.',
      heads: ['the tie', 'the principle', 'the decision'],
      rows: [
        { q: 'Many services or one?', qs: 'Ch. 4', p: 'Cognitive simplicity', d: 'One modular application', ds: 'complexity must pay for itself' },
        { q: 'Split the modules today?', qs: 'Ch. 4', p: 'Evolvability', d: 'Design to extract later', ds: 'when telemetry justifies it' },
        { q: 'Scale up or scale out?', qs: 'Ch. 8', p: 'Mandatory telemetry', d: 'Bigger machine first', ds: 'thresholds: CPU 75%, memory 85%' },
        { q: 'Call or send a message?', qs: 'Ch. 5 · Ch. 8', p: 'Messages over calls', d: 'Commands, events and a log', ds: 'nobody waits for another to be alive' },
      ],
      foot: 'Every technical decision in the case traces back to one of these four.',
    },
    ready: {
      title: 'Ready when the problem knocks',
      legendReal: 'What reality brings',
      legendReady: 'What was already waiting',
      canvas: 'Five problems of the physical world, each with the answer that was already in the design: signal loss and the PIN generated in advance; late stock data and the local catalog with stock checked at payment; a disputed charge and every order kept as events; the payment gateway down and orders stored and retried; a stuck meal and the photo, human review and compensation.',
      heads: ['what reality brings', 'what was already waiting'],
      rows: [
        { p: 'The fridge loses signal', a: 'A PIN generated in advance', s: 'Ch. 6 · ADR 011' },
        { p: 'Stock data arrives late', a: 'Local catalog, stock checked at payment', s: 'Ch. 6 · ADRs 012 and 013' },
        { p: 'A customer disputes a charge', a: 'Every order kept as events', s: 'Ch. 6 · ADR 007' },
        { p: 'The payment gateway goes down', a: 'Orders stored and retried', s: 'Ch. 8 · the risk list' },
        { p: 'The meal gets physically stuck', a: 'Photo, human review, compensation', s: 'Ch. 6 · the rainy day' },
      ],
    },
    inv: {
      kicker: 'Invoice · year 1',
      title: 'Minimum scenario',
      src: 'the team’s spreadsheet · Ch. 9',
      rows: [
        { n: 'Monitoring', w: 'DataDog' },
        { n: 'Machines', w: 'EC2' },
        { n: 'Database', w: 'DynamoDB' },
        { n: 'Reporting', w: 'Tableau' },
        { n: 'Everything else', w: 'MQ, Kafka, SNS, S3, VPN' },
      ],
      money: (v: number) => `$${v.toLocaleString('en-US')}`,
      total: 'Total per year',
      scen: [
        { k: 'Projected', v: '$12,548' },
        { k: 'Rapid ×10', v: '$22,481' },
      ],
      hiddenK: 'The line no invoice shows',
      hiddenQ: 'Answer the question in the panel to reveal it.',
      hiddenN: 'Self-hosting the free stack (Grafana, ELK)',
      hiddenV: '$0 in licenses + the team’s hours',
      label: 'Yearly invoice in the minimum scenario',
    },
    card: {
      k: 'Field guide · the method in your pocket',
      title: 'Your next system',
      steps: [
        { t: 'Understand the business', q: 'What volume does the real system handle, and what is not my problem?', ch: [1, 3] },
        { t: 'Set the principles', q: 'Which criteria break the tie when two options deadlock?', ch: [3, 4, 10] },
        { t: 'Design for reality', q: 'What will fail in the physical world, and what does the design do then?', ch: [5, 6, 7, 8] },
        { t: 'Close with the bill', q: 'What does it cost per year, counting the people who maintain it?', ch: [2, 9] },
      ],
      chapters: 'chapters',
      map: 'Back to the course map',
      repos: 'The repositories on GitHub',
      label: 'The four steps of the method as questions for your next system',
    },
  },
  es: {
    stepN: (n: number) => `Paso ${n}`,
    ch: 'Cap.',
    chShort: 'CAP',
    stations: [
      { l: 'Entender', s: 'primero el negocio' },
      { l: 'Principios', s: 'primero los criterios' },
      { l: 'Realidad primero', s: 'el mundo real' },
      { l: 'La factura', s: 'costo por año' },
    ],
    method: {
      title: 'El método en cuatro pasos',
      legendStep: 'Paso del método',
      legendCh: 'Capítulo del curso',
      canvas: {
        overview: 'Cuatro pasos en fila: entender, principios, realidad primero, la factura. Debajo de cada paso, los números de los capítulos donde ocurrió.',
        focus: (n: number) => `El paso ${n} del método resaltado, con los momentos del caso donde ocurrió.`,
        skip: 'Los cuatro pasos, y debajo de cada uno qué pasa si te lo salteás.',
      },
      chapters: 'dónde ocurrió cada paso · números de capítulo',
      moments: [
        [
          { ch: 1, l: '42 comidas por día: menos de una petición por segundo' },
          { ch: 3, l: 'Una primera semana de documentos de negocio, cero diagramas' },
          { ch: 3, l: 'Preguntas al cliente en vez de respuestas inventadas' },
          { ch: 1, l: 'Lo que no es problema del arquitecto, por escrito' },
        ],
        [
          { ch: 3, l: 'Cuatro principios, destilados de las restricciones' },
          { ch: 4, l: 'El estilo decidido por aritmética, no por gusto' },
          { ch: 3, l: 'Cada decisión en un ADR, con sus contras incluidas' },
          { ch: 10, l: 'Las decisiones estructurales, cada una con su renuncia' },
        ],
        [
          { ch: 5, l: '¿Qué le pasa al negocio si esta pieza falla?' },
          { ch: 6, l: 'Un actor por heladera, un PIN para cuando no hay señal' },
          { ch: 7, l: 'Cocinas que pueden responder “no puedo” o “demorado”' },
          { ch: 8, l: 'Cada riesgo con su mitigación escrita al lado' },
        ],
        [
          { ch: 2, l: 'La pregunta del podio era económica, no técnica' },
          { ch: 9, l: 'Bytes y frecuencias antes de elegir servidores' },
          { ch: 9, l: 'Tres escenarios: de 12.248 a 22.481 USD por año' },
          { ch: 9, l: 'Monitoreo pago, porque las horas del equipo también cuestan' },
        ],
      ],
      takeaways: [
        'Saber el volumen real es el dato que desempata todo lo demás.',
        'Primero los criterios, después las herramientas: si no, es una guerra de gustos.',
        'Esperar los problemas preparado, en vez de pretender que no existan.',
        'El cliente no despliega diagramas: despliega facturas.',
      ],
      skipK: (n: number) => `Sin el paso ${n}`,
      skips: [
        'Diseñás para el sistema imaginario, no para el real.',
        'Cada discusión técnica se vuelve una guerra de gustos.',
        'Los problemas llegan y encuentran un diseño que hizo de cuenta que no existían.',
        'La arquitectura queda incompleta: nadie sabe cuánto cuesta operarla.',
      ],
      order: 'El orden es parte del método.',
    },
    yard: {
      title: 'Un número, muchas decisiones',
      legendNum: 'El número real',
      legendImag: 'El imaginario',
      canvas: 'A la izquierda, el sistema imaginario con miles de peticiones por segundo, tachado, y el real con menos de una petición por segundo. Del número real salen cuatro decisiones: un monolito modular, escalar primero en vertical, la capa gratis de Here Maps y unos 1.000 USD por mes.',
      imagK: 'el sistema imaginario',
      imag: 'Miles por segundo',
      imagSub: 'la escala de una app masiva',
      realK: 'el sistema real',
      real: '< 1 petición por segundo',
      realSub: '42 comidas por día · Cap. 1',
      decK: 'lo que decidió ese número',
      decs: [
        { l: 'Un monolito modular', s: 'nada distribuido para este volumen · Cap. 4' },
        { l: 'Primero escala vertical', s: 'una máquina más grande, no un clúster · Cap. 8' },
        { l: 'La capa gratis de Here Maps', s: '250.000 pedidos gratis al mes sobraban · Cap. 5' },
        { l: 'Unos 1.000 USD por mes', s: 'todo el negocio, escenario base · Cap. 9' },
      ],
    },
    tie: {
      title: 'Cuatro empates del caso',
      legendTie: 'El empate',
      legendPr: 'El principio',
      legendDec: 'La decisión',
      canvas: 'Cuatro filas. Muchos servicios o uno: la simplicidad cognitiva decide una sola aplicación modular. Separar los módulos hoy: la evolucionabilidad decide diseñar para extraer después. Escalar vertical u horizontal: la telemetría obligatoria decide primero una máquina más grande. Llamar o mandar un mensaje: mensajes antes que llamadas decide comandos, eventos y un log.',
      heads: ['el empate', 'el principio', 'la decisión'],
      rows: [
        { q: '¿Muchos servicios o uno?', qs: 'Cap. 4', p: 'Simplicidad cognitiva', d: 'Una sola aplicación modular', ds: 'si no se paga sola, no se compra' },
        { q: '¿Separar los módulos hoy?', qs: 'Cap. 4', p: 'Evolucionabilidad', d: 'Diseñar para extraer después', ds: 'cuando la telemetría lo justifique' },
        { q: '¿Escalar vertical u horizontal?', qs: 'Cap. 8', p: 'Telemetría obligatoria', d: 'Máquina más grande primero', ds: 'umbrales: CPU 75%, memoria 85%' },
        { q: '¿Llamar o mandar un mensaje?', qs: 'Cap. 5 · Cap. 8', p: 'Mensajes, no llamadas', d: 'Comandos, eventos y un log', ds: 'nadie depende de que otro esté vivo' },
      ],
      foot: 'Cada decisión técnica del caso se remonta a uno de estos cuatro.',
    },
    ready: {
      title: 'Preparados cuando el problema golpea',
      legendReal: 'Lo que trae la realidad',
      legendReady: 'Lo que ya estaba esperando',
      canvas: 'Cinco problemas del mundo físico, cada uno con la respuesta que ya estaba en el diseño: la pérdida de señal y el PIN generado de antemano; el dato de stock que llega tarde y el catálogo local con stock verificado al pagar; un cobro reclamado y cada orden guardada como eventos; la pasarela de pago caída y las órdenes guardadas y reintentadas; una comida trabada y la foto, la revisión humana y la compensación.',
      heads: ['lo que trae la realidad', 'lo que ya estaba esperando'],
      rows: [
        { p: 'La heladera pierde señal', a: 'Un PIN generado de antemano', s: 'Cap. 6 · ADR 011' },
        { p: 'El dato de stock llega tarde', a: 'Catálogo local, stock al pagar', s: 'Cap. 6 · ADRs 012 y 013' },
        { p: 'Un cliente reclama un cobro', a: 'Cada orden guardada como eventos', s: 'Cap. 6 · ADR 007' },
        { p: 'La pasarela de pago se cae', a: 'Órdenes guardadas y reintentadas', s: 'Cap. 8 · la lista de riesgos' },
        { p: 'La comida se traba adentro', a: 'Foto, revisión humana, compensación', s: 'Cap. 6 · el día nublado' },
      ],
    },
    inv: {
      kicker: 'Factura · año 1',
      title: 'Escenario mínimo',
      src: 'la planilla del equipo · Cap. 9',
      rows: [
        { n: 'Monitoreo', w: 'DataDog' },
        { n: 'Máquinas', w: 'EC2' },
        { n: 'Base de datos', w: 'DynamoDB' },
        { n: 'Reportes', w: 'Tableau' },
        { n: 'Todo lo demás', w: 'MQ, Kafka, SNS, S3, VPN' },
      ],
      money: (v: number) => `${v.toLocaleString('de-DE')} USD`,
      total: 'Total por año',
      scen: [
        { k: 'Proyectado', v: '12.548 USD' },
        { k: 'Rápido ×10', v: '22.481 USD' },
      ],
      hiddenK: 'La línea que ninguna factura muestra',
      hiddenQ: 'Respondé la pregunta del panel para verla.',
      hiddenN: 'Montar el stack gratis propio (Grafana, ELK)',
      hiddenV: '0 USD de licencias + las horas del equipo',
      label: 'Factura anual en el escenario mínimo',
    },
    card: {
      k: 'Guía de campo · el método en el bolsillo',
      title: 'Tu próximo sistema',
      steps: [
        { t: 'Entender el negocio', q: '¿Qué volumen maneja el sistema real, y qué no es problema mío?', ch: [1, 3] },
        { t: 'Fijar los principios', q: '¿Qué criterios desempatan cuando dos opciones se trancan?', ch: [3, 4, 10] },
        { t: 'Diseñar para la realidad', q: '¿Qué va a fallar en el mundo físico, y qué hace el diseño cuando pase?', ch: [5, 6, 7, 8] },
        { t: 'Cerrar con la factura', q: '¿Cuánto cuesta por año, contando a las personas que lo mantienen?', ch: [2, 9] },
      ],
      chapters: 'capítulos',
      map: 'Volver al mapa del curso',
      repos: 'Los repositorios en GitHub',
      label: 'Los cuatro pasos del método como preguntas para tu próximo sistema',
    },
  },
});

/* ───────────────────────── the method (one scene, six states) ───────────────────────── */
const XS = [135, 378, 621, 864];
const SW = 220;
const SH = 76;
const ICONS = [Search, Scale, CloudRain, Receipt];
const CHAPTERS_OF = [[1, 3], [3, 4, 10], [5, 6, 7, 8], [2, 9]];
const ROW_Y = [202, 278, 354, 430];
const ROW_X = 92;
const ROW_W = 868;
const ROW_H = 60;
const RAIL_X = 60;

function GuideMethod({ state = 'overview', reduced }: SceneProps) {
  const t = useT(S);
  const tm = t.method;
  const locale = useLocale();
  const course = getCourse(locale);
  const titleOf = (n: number) => course.find((c) => c.number === n)?.title ?? '';
  const focus = /^s[1-4]$/.test(state) ? Number(state[1]) - 1 : null;
  const mode: 'overview' | 'focus' | 'skip' = focus !== null ? 'focus' : state === 'skip' ? 'skip' : 'overview';
  const gy = mode === 'overview' ? 236 : mode === 'focus' ? 84 : 150;
  const d = (s: number) => (reduced ? 0 : s);
  const label = mode === 'overview' ? tm.canvas.overview : mode === 'skip' ? tm.canvas.skip : tm.canvas.focus((focus ?? 0) + 1);
  return (
    <Frame title={tm.title} legend={<Legend items={[{ tone: 'accent', label: tm.legendStep }, ...(mode === 'overview' || mode === 'focus' ? [{ tone: 'cmp' as const, label: tm.legendCh }] : [])]} />}>
      <Canvas w={1000} h={560} label={label}>
        {(ids) => (
          <>
            {/* the four stations move as one piece */}
            <motion.g initial={false} animate={{ y: gy }} transition={reduced ? { duration: 0 } : spring}>
              {XS.map((x, i) => {
                const on = focus === null || focus === i;
                return (
                  <text key={`k${i}`} x={x} y={-52} textAnchor="middle" className={`lb ${on ? 'lb--accent' : 'lb--muted'}`} style={{ fontSize: 11 }}>
                    {t.stepN(i + 1)}
                  </text>
                );
              })}
              {XS.slice(0, 3).map((x, i) => (
                <Edge key={`e${i}`} points={[[x + SW / 2 + 3, 0], [XS[i + 1] - SW / 2 - 3, 0]]} tone={focus === null ? 'accent' : 'muted'} marker={focus === null ? ids.arrowAccent : ids.arrow} />
              ))}
              {XS.map((x, i) => (
                <Node
                  key={`n${i}`}
                  x={x}
                  y={0}
                  w={SW}
                  h={SH}
                  kind={focus === null || focus === i ? 'core' : 'plain'}
                  icon={ICONS[i]}
                  label={t.stations[i].l}
                  sub={t.stations[i].s}
                  highlight={focus === i}
                  dim={focus !== null && focus !== i}
                />
              ))}
            </motion.g>

            {/* overview: the chapters under each step */}
            {mode === 'overview' && (
              <motion.g key="ov" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d(0.35), duration: 0.4 }}>
                {XS.map((x, i) =>
                  CHAPTERS_OF[i].map((n, j, all) => {
                    const cx = x + (j - (all.length - 1) / 2) * 44;
                    return (
                      <g key={`${i}-${n}`}>
                        <circle cx={cx} cy={332} r={17} className="c11-chip" />
                        <text x={cx} y={336.5} textAnchor="middle" className="c11-chip__t">{pad(n)}</text>
                      </g>
                    );
                  }),
                )}
                <Label x={500} y={398}>{tm.chapters}</Label>
              </motion.g>
            )}

            {/* focus: the moments of the case for one step */}
            {mode === 'focus' && focus !== null && (
              <g key={`f${focus}`}>
                <Edge points={[[XS[focus], 84 + SH / 2], [XS[focus], 152], [RAIL_X, 152], [RAIL_X, ROW_Y[ROW_Y.length - 1]]]} tone="accent" delay={d(0.35)} />
                {ROW_Y.map((y, j) => (
                  <Edge key={`t${j}`} points={[[RAIL_X, y], [ROW_X - 2, y]]} tone="accent" delay={d(0.6 + j * 0.12)} />
                ))}
                {tm.moments[focus].map((m, j) => (
                  <motion.g
                    key={j}
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: d(0.6 + j * 0.12), duration: 0.45, ease: EASE }}
                  >
                    <rect x={ROW_X} y={ROW_Y[j] - ROW_H / 2} width={ROW_W} height={ROW_H} rx={12} className="nd" />
                    <foreignObject x={ROW_X} y={ROW_Y[j] - ROW_H / 2} width={ROW_W} height={ROW_H}>
                      <div className="c11-mo">
                        <span className="c11-mo__ch mono">{t.chShort} {pad(m.ch)}</span>
                        <span className="c11-mo__tx">
                          <span className="c11-mo__l">{m.l}</span>
                          <span className="c11-mo__s">{titleOf(m.ch)}</span>
                        </span>
                      </div>
                    </foreignObject>
                  </motion.g>
                ))}
                <motion.text
                  x={ROW_X + ROW_W / 2}
                  y={514}
                  textAnchor="middle"
                  className="c11-take"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: d(1.2), duration: 0.4 }}
                >
                  {tm.takeaways[focus]}
                </motion.text>
              </g>
            )}

            {/* skip: what each missing step leaves behind */}
            {mode === 'skip' && (
              <g key="skip">
                {XS.map((x, i) => (
                  <g key={i}>
                    <Edge points={[[x, 150 + SH / 2], [x, 250]]} tone="danger" dashed marker={ids.arrowDanger} delay={d(0.35 + i * 0.12)} />
                    <motion.g initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d(0.45 + i * 0.12), duration: 0.45, ease: EASE }}>
                      <rect x={x - SW / 2} y={256} width={SW} height={128} rx={12} className="nd nd--danger" />
                      <foreignObject x={x - SW / 2} y={256} width={SW} height={128}>
                        <div className="c11-skip">
                          <span className="c11-skip__k">{tm.skipK(i + 1)}</span>
                          <span className="c11-skip__t">{tm.skips[i]}</span>
                        </div>
                      </foreignObject>
                    </motion.g>
                  </g>
                ))}
                <motion.text x={500} y={452} textAnchor="middle" className="c11-take c11-take--strong" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d(1.1), duration: 0.4 }}>
                  {tm.order}
                </motion.text>
              </g>
            )}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── one number, many decisions ───────────────────────── */
const DEC_Y = [134, 246, 358, 470];
const DEC_ICONS = [Boxes, Server, MapIcon, Receipt];

function GuideYardstick({ reduced }: SceneProps) {
  const t = useT(S).yard;
  const d = (s: number) => (reduced ? 0 : s);
  const REAL = { x: 170, y: 340, w: 290, h: 84 };
  const BUS = 450;
  const DX = 540; // left edge of the decisions
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'accent', label: t.legendNum }, { tone: 'ext', label: t.legendImag }]} />}>
      <Canvas w={1000} h={540} label={t.canvas}>
        {(ids) => (
          <>
            <Label x={REAL.x} y={98}>{t.imagK}</Label>
            <Node x={REAL.x} y={150} w={REAL.w} h={70} kind="muted" icon={Users} label={t.imag} sub={t.imagSub} crossed />
            <Label x={REAL.x} y={282} tone="accent">{t.realK}</Label>
            {DEC_Y.map((y, i) => (
              <Edge key={`e${i}`} points={[[REAL.x + REAL.w / 2, REAL.y], [BUS, REAL.y], [BUS, y], [DX, y]]} tone="accent" marker={ids.arrowAccent} delay={d(0.4 + i * 0.15)} />
            ))}
            {!reduced && DEC_Y.map((y, i) => (
              <Packet key={`p${i}`} points={[[REAL.x + REAL.w / 2, REAL.y], [BUS, REAL.y], [BUS, y], [DX, y]]} tone="accent" w={14} delay={1 + i * 0.35} duration={1.3} reduced={reduced} />
            ))}
            <Node x={REAL.x} y={REAL.y} w={REAL.w} h={REAL.h} kind="core" icon={Gauge} label={t.real} sub={t.realSub} highlight />
            <Label x={DX + 215} y={82}>{t.decK}</Label>
            {DEC_Y.map((y, i) => (
              <Node key={i} x={DX + 215} y={y} w={430} h={68} kind="plain" icon={DEC_ICONS[i]} label={t.decs[i].l} sub={t.decs[i].s} delay={d(0.7 + i * 0.15)} />
            ))}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── four principles, four ties ───────────────────────── */
const TIE_Y = [118, 226, 334, 442];
const COL = { tie: { x: 151, w: 270 }, pr: { x: 466, w: 260 }, dec: { x: 815, w: 338 } };

function GuideTiebreak({ reduced }: SceneProps) {
  const t = useT(S).tie;
  const ph = usePhases(4, { interval: 1500, reduced });
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'ext', label: t.legendTie }, { tone: 'cmp', label: t.legendPr }, { tone: 'accent', label: t.legendDec }]} />}>
      <Canvas w={1000} h={540} label={t.canvas}>
        {(ids) => (
          <>
            <Label x={COL.tie.x} y={52}>{t.heads[0]}</Label>
            <Label x={COL.pr.x} y={52} tone="cmp">{t.heads[1]}</Label>
            <Label x={COL.dec.x} y={52} tone="accent">{t.heads[2]}</Label>
            {t.rows.map((r, i) => {
              const show = ph.phase >= i;
              const dl = reduced ? 0 : 0.1;
              return (
                <g key={i}>
                  <Edge points={[[COL.tie.x + COL.tie.w / 2 + 3, TIE_Y[i]], [COL.pr.x - COL.pr.w / 2 - 3, TIE_Y[i]]]} show={show} marker={ids.arrow} delay={dl + 0.25} />
                  <Edge points={[[COL.pr.x + COL.pr.w / 2 + 3, TIE_Y[i]], [COL.dec.x - COL.dec.w / 2 - 3, TIE_Y[i]]]} show={show} tone="accent" marker={ids.arrowAccent} delay={dl + 0.6} />
                  <Node x={COL.tie.x} y={TIE_Y[i]} w={COL.tie.w} h={76} kind="ext" icon={HelpCircle} label={r.q} sub={r.qs} show={show} delay={dl} />
                  <Node x={COL.pr.x} y={TIE_Y[i]} w={COL.pr.w} h={76} kind="cmp" icon={Scale} label={r.p} show={show} delay={dl + 0.35} />
                  <Node x={COL.dec.x} y={TIE_Y[i]} w={COL.dec.w} h={76} kind="core" icon={Check} label={r.d} sub={r.ds} show={show} delay={dl + 0.7} />
                </g>
              );
            })}
            <motion.text x={500} y={520} textAnchor="middle" className="c11-take" initial={false} animate={{ opacity: ph.phase >= 3 ? 1 : 0 }} transition={{ delay: reduced ? 0 : 1.1, duration: 0.4 }}>
              {t.foot}
            </motion.text>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── ready when the problem knocks ───────────────────────── */
const READY_Y = [100, 194, 288, 382, 476];
const PROB_ICONS = [WifiOff, Clock, MessageSquare, CreditCard, Refrigerator];
const ANS_ICONS = [KeyRound, Smartphone, ScrollText, RotateCw, Camera];
const LEFT = { x: 200, w: 360 };
const RIGHT = { x: 770, w: 420 };

function GuideReady({ reduced }: SceneProps) {
  const t = useT(S).ready;
  const ph = usePhases(5, { interval: 1300, reduced });
  const x0 = LEFT.x + LEFT.w / 2;
  const x1 = RIGHT.x - RIGHT.w / 2;
  return (
    <Frame title={t.title} legend={<Legend items={[{ tone: 'danger', label: t.legendReal }, { tone: 'accent', label: t.legendReady }]} />}>
      <Canvas w={1000} h={540} label={t.canvas}>
        {(ids) => (
          <>
            <Label x={LEFT.x} y={44} tone="danger">{t.heads[0]}</Label>
            <Label x={RIGHT.x} y={44} tone="accent">{t.heads[1]}</Label>
            {t.rows.map((r, i) => {
              const show = ph.phase >= i;
              return (
                <g key={i}>
                  <Edge points={[[x0 + 3, READY_Y[i]], [x1 - 3, READY_Y[i]]]} show={show} tone="accent" marker={ids.arrowAccent} delay={reduced ? 0 : 0.3} />
                  {show && !reduced && (
                    <Packet points={[[x0, READY_Y[i]], [x1, READY_Y[i]]]} tone="danger" w={14} delay={0.35} duration={0.9} reduced={reduced} />
                  )}
                  <Node x={LEFT.x} y={READY_Y[i]} w={LEFT.w} h={64} kind="danger" icon={PROB_ICONS[i]} label={r.p} show={show} />
                  <Node x={RIGHT.x} y={READY_Y[i]} w={RIGHT.w} h={64} kind="core" icon={ANS_ICONS[i]} label={r.a} sub={r.s} show={show} delay={reduced ? 0 : 0.55} />
                </g>
              );
            })}
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── the yearly invoice ───────────────────────── */
// minimum scenario, year 1 (the team's spreadsheet): the "everything else" line is MQ 508.32 + SNS 366.12 + S3 262.32 + Kafka 138.72 + VPN 9.13
const INV = [3336, 3115, 3072, 1440, 1285];
const INV_TOTAL = 12248;

function GuideInvoice({ chosen, props, reduced }: SceneProps) {
  const t = useT(S).inv;
  const revealed = chosen !== null && chosen === (props?.correct ?? -1);
  const max = Math.max(...INV);
  return (
    <div className="c11-inv" role="figure" aria-label={t.label}>
      <header className="c11-inv__head">
        <span className="c11-inv__k"><Receipt size={14} aria-hidden /> {t.kicker}</span>
        <span className="c11-inv__t">{t.title}</span>
        <span className="c11-inv__src mono">{t.src}</span>
      </header>
      <ul className="c11-inv__rows">
        {t.rows.map((r, i) => (
          <motion.li
            key={i}
            className={`c11-inv__row ${i === 0 ? 'is-top' : ''} ${i === 0 && revealed ? 'is-hl' : ''}`}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.08 * i, duration: 0.35 }}
          >
            <span className="c11-inv__n"><strong>{r.n}</strong><span>{r.w}</span></span>
            <span className="c11-inv__bar" aria-hidden>
              <motion.span initial={reduced ? false : { width: 0 }} animate={{ width: `${(INV[i] / max) * 100}%` }} transition={{ delay: reduced ? 0 : 0.2 + 0.08 * i, duration: 0.6, ease: EASE }} />
            </span>
            <span className="c11-inv__amt mono">{t.money(INV[i])}</span>
          </motion.li>
        ))}
      </ul>
      <div className="c11-inv__total">
        <span>{t.total}</span>
        <span className="mono">{t.money(INV_TOTAL)}</span>
      </div>
      <div className="c11-inv__scen mono">
        {t.scen.map((s) => (
          <span key={s.k}>{s.k} <strong>{s.v}</strong></span>
        ))}
      </div>
      <div className={`c11-inv__hidden ${revealed ? 'is-on' : ''}`} aria-live="polite">
        <span className="c11-inv__hk mono">{t.hiddenK}</span>
        {revealed ? (
          <motion.span className="c11-inv__hrow" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
            <span>{t.hiddenN}</span>
            <strong>{t.hiddenV}</strong>
          </motion.span>
        ) : (
          <span className="c11-inv__hq">{t.hiddenQ}</span>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── the field card (closing) ───────────────────────── */
function GuideCard({ reduced }: SceneProps) {
  const t = useT(S);
  const tc = t.card;
  const locale = useLocale();
  return (
    <div className="c11-card" role="figure" aria-label={tc.label}>
      <p className="c11-card__k">{tc.k}</p>
      <h3 className="c11-card__t">{tc.title}</h3>
      <ol className="c11-card__list">
        {tc.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <motion.li
              key={i}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduced ? 0 : 0.15 + i * 0.12, duration: 0.4, ease: EASE }}
            >
              <span className="c11-card__n mono">{i + 1}</span>
              <span className="c11-card__ic" aria-hidden><Icon size={18} /></span>
              <span className="c11-card__body">
                <strong>{s.t}</strong>
                <span className="c11-card__q">{s.q}</span>
              </span>
              <span className="c11-card__ch mono">{t.ch} {s.ch.join(' · ')}</span>
            </motion.li>
          );
        })}
      </ol>
      <div className="c11-card__foot">
        <a className="btn btn--primary" href={homeUrl(locale)}>
          <MapIcon size={16} aria-hidden /> {tc.map}
        </a>
        <a className="btn" href="https://github.com/TheKataLog" target="_blank" rel="noopener noreferrer">
          {tc.repos} <ExternalLink size={14} aria-hidden />
        </a>
      </div>
    </div>
  );
}


/** Scenes of chapter 11, registered in ./index.ts through this map. */
export const SCENES11: Record<string, ComponentType<SceneProps>> = {
  'guide-method': GuideMethod,
  'guide-yardstick': GuideYardstick,
  'guide-tiebreak': GuideTiebreak,
  'guide-ready': GuideReady,
  'guide-invoice': GuideInvoice,
  'guide-card': GuideCard,
};
