import type { Chapter } from '../types';
import { c, doc } from '../helpers';

export const guia: Chapter = {
  id: 'guia',
  number: 11,
  phase: 'Para llevar',
  title: 'Guía de campo',
  subtitle: 'El método en cuatro pasos, para tu próximo sistema.',
  minutes: 10,
  learn: [
    'Nombrar los cuatro pasos del método <strong>en orden</strong>, y decir por qué importa el orden.',
    'Señalar el momento del caso en que ocurrió cada paso.',
    'Convertir cada paso en una pregunta para <strong>tu próximo sistema</strong>.',
    'Saber dónde verificar cada afirmación: los repositorios públicos de los equipos.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'Guía de campo',
      blocks: [
        {
          t: 'p',
          html: 'Sacá el caso Farmacy Food y queda un método aplicable a cualquier proyecto. El equipo ganador lo ejecutó en un orden fijo, y el orden es parte del método. Este último capítulo junta los diez anteriores en cuatro pasos que podés llevarte a tu próximo sistema.',
        },
      ],
    },

    /* ── el método ── */
    {
      id: 'metodo',
      kicker: 'El método',
      title: 'Sacá el caso y queda un método',
      visual: { scene: 'guide-method', state: 'overview' },
      describe:
        '<p>Cuatro pasos en fila, unidos por flechas: 1, entender el negocio; 2, fijar principios; 3, diseñar para la realidad; 4, cerrar con la factura. Debajo de cada paso, los capítulos donde ocurrió: 1 y 3 para el primero; 3, 4 y 10 para el segundo; 5, 6, 7 y 8 para el tercero; 2 y 9 para el cuarto.</p>',
      blocks: [
        { t: 'p', html: 'Diez capítulos de heladeras, eventos y facturas. Sacale los detalles de Farmacy Food y lo que queda es un método para cualquier proyecto, en cuatro pasos.' },
        { t: 'p', html: 'El equipo ganador los ejecutó en este orden: <strong>entender el negocio, fijar principios, diseñar para la realidad, cerrar con la factura</strong>. El orden es parte del método.' },
        { t: 'p', html: 'Los números debajo de cada paso son los capítulos donde lo viste pasar. Las próximas pantallas los recorren uno por uno.' },
      ],
    },

    /* ── paso 1 ── */
    {
      id: 'entender',
      kicker: 'Paso 1 · Entender',
      title: 'Entender el negocio antes del software',
      visual: { scene: 'guide-method', state: 's1' },
      describe:
        '<p>El paso 1 resaltado. Dónde ocurrió: en el capítulo 1, 42 comidas por día resultaron ser menos de una petición por segundo; en el capítulo 3, una primera semana de documentos de negocio sin diagramas, y preguntas al cliente en vez de respuestas inventadas; en el capítulo 1, lo que no era problema del arquitecto, por escrito. Para llevarte: saber el volumen real es el dato que desempata todo lo demás.</p>',
      blocks: [
        { t: 'p', html: `Una semana de preguntas, números y glosario antes del primer diagrama. En el capítulo 3 viste la primera semana del equipo: documentos de negocio, una lista de preguntas al cliente ${doc('questions')} y ni un solo diagrama de software.` },
        { t: 'p', html: 'La idea no es llenar carpetas. Es encontrar el dato que desempata todo: <strong>cuántas peticiones por segundo tiene el sistema real</strong>, no el imaginario.' },
      ],
    },
    {
      id: 'vara',
      kicker: 'Paso 1 · Entender',
      title: 'Un número, muchas decisiones',
      visual: { scene: 'guide-yardstick' },
      describe:
        '<p>A la izquierda, tachado, el sistema imaginario: miles de peticiones por segundo, la escala de una app masiva. Debajo, el real: menos de una petición por segundo, 42 comidas por día. Del número real salen cuatro decisiones: un monolito modular sin maquinaria distribuida (capítulo 4), escalar en vertical antes de armar un clúster (capítulo 8), la capa gratis de Here Maps, cuyos 250.000 pedidos mensuales sobraban (capítulo 5), y unos 1.000 USD por mes para operar todo el negocio (capítulo 9).</p>',
      blocks: [
        { t: 'p', html: 'En el capítulo 1 hiciste la cuenta: 42 comidas por día es <strong>menos de una petición por segundo</strong>, aun en la meta anual. Mirá hasta dónde llega ese solo número.' },
        { t: 'p', html: 'Descartó la maquinaria distribuida, puso la escala vertical antes que la horizontal, hizo alcanzar una capa gratis de mapas y dejó todo el negocio en unos 1.000 USD por mes.' },
        { t: 'decision', id: 'scale-up' },
      ],
    },

    /* ── paso 2 ── */
    {
      id: 'principios',
      kicker: 'Paso 2 · Principios',
      title: 'Fijar desempates antes de discutir herramientas',
      visual: { scene: 'guide-method', state: 's2' },
      describe:
        '<p>El paso 2 resaltado. Dónde ocurrió: en el capítulo 3, cuatro principios destilados de las restricciones, y cada decisión registrada en un ADR con sus contras; en el capítulo 4, el estilo decidido por aritmética, no por gusto; en el capítulo 10, las decisiones estructurales, cada una con su renuncia. Para llevarte: primero los criterios, después las herramientas.</p>',
      blocks: [
        { t: 'p', html: `El equipo firmó sus cuatro principios antes de discutir una sola tecnología, y anotó cada decisión en un ${c('adr', 'ADR')}, con sus contras.` },
        {
          t: 'predict',
          question: 'Dos diseñadores de tu equipo se trancan con dos herramientas. ¿Qué faltó?',
          options: [
            { label: 'Más benchmarks que comparen las dos', feedback: 'Los números ayudan, pero sin criterios nadie acuerda qué significa ganar.' },
            { label: 'Criterios de desempate acordados antes', correct: true, feedback: '<strong>Eso.</strong> Sin criterios previos, la discusión de arquitectura se vuelve una guerra de gustos. Los principios desempatan.' },
            { label: 'Alguien con jerarquía que decida y listo', feedback: 'Eso termina la reunión, no la discusión: el próximo empate arranca de cero.' },
            { label: 'Más presupuesto para probar las dos', feedback: 'El caso tenía poco presupuesto, y probar las dos no te dice con cuál quedarte.' },
          ],
        },
      ],
    },
    {
      id: 'desempate',
      kicker: 'Paso 2 · Principios',
      title: 'Cuatro principios, cuatro empates resueltos',
      visual: { scene: 'guide-tiebreak' },
      describe:
        '<ol><li>¿Muchos servicios o uno? Simplicidad cognitiva: una sola aplicación modular, porque la complejidad que no se paga sola no se compra (capítulo 4).</li><li>¿Separar los módulos hoy? Evolucionabilidad: diseñar para extraer después, cuando la telemetría lo justifique (capítulo 4).</li><li>¿Escalar vertical u horizontal? Telemetría obligatoria: primero una máquina más grande, con umbrales de 75% de CPU y 85% de memoria (capítulo 8).</li><li>¿Llamar o mandar un mensaje? Mensajes antes que llamadas: comandos, eventos y un log, para que nadie dependa de que otra parte esté viva (capítulos 5 y 8).</li></ol>',
      blocks: [
        { t: 'p', html: 'Un principio se gana su lugar cuando resuelve una discusión real. Acá tenés cuatro empates del caso, y el principio que desempató cada uno.' },
        { t: 'p', html: 'Ninguno nombra una tecnología. Salen de las restricciones que viste en el capítulo 3: un equipo chico, crecer de 2 a 68 locaciones, el costo de escalar a ciegas y sistemas que el equipo no controlaba.' },
      ],
    },

    /* ── paso 3 ── */
    {
      id: 'realidad',
      kicker: 'Paso 3 · Realidad',
      title: 'Diseñar para la realidad física, no para la ideal',
      visual: { scene: 'guide-method', state: 's3' },
      describe:
        '<p>El paso 3 resaltado. Dónde ocurrió: en el capítulo 5, la pregunta de qué le pasa al negocio si una pieza falla; en el capítulo 6, un actor por heladera y un PIN para cuando no hay señal; en el capítulo 7, cocinas que pueden responder “no puedo” o “demorado”; en el capítulo 8, cada riesgo con su mitigación escrita al lado. Para llevarte: esperar los problemas preparado.</p>',
      blocks: [
        { t: 'p', html: 'Las heladeras pierden señal, los datos llegan tarde, los reclamos llegan igual. Desde el capítulo 5, el diseño se hizo siempre la misma pregunta: <strong>¿qué le pasa al negocio cuando esto falla?</strong>' },
        { t: 'p', html: 'Las respuestas están repartidas en cuatro capítulos: un actor por heladera, un PIN que funciona sin señal, cocinas que pueden decir “demorado”, una lista donde cada riesgo trae su mitigación.' },
      ],
    },
    {
      id: 'preparados',
      kicker: 'Paso 3 · Realidad',
      title: 'Preparados cuando el problema golpea',
      visual: { scene: 'guide-ready' },
      describe:
        '<ol><li>La heladera pierde señal: un PIN generado de antemano (capítulo 6, ADR 011).</li><li>El dato de stock llega tarde: un catálogo local, con el stock verificado al pagar (capítulo 6, ADRs 012 y 013).</li><li>Un cliente reclama un cobro: cada orden guardada como eventos (capítulo 6, ADR 007).</li><li>La pasarela de pago se cae: órdenes guardadas y reintentadas (capítulo 8, la lista de riesgos).</li><li>La comida se traba adentro: una foto, una revisión humana y una compensación (capítulo 6, el día nublado).</li></ol>',
      blocks: [
        { t: 'p', html: 'Puestos uno al lado del otro, el patrón salta a la vista: cada problema del mundo físico encontró su respuesta ya esperando en el diseño.' },
        { t: 'p', html: `La lista de riesgos funciona igual ${doc('risks')}. Y cuando no había respuesta técnica, como una heladera que se llena físicamente, el equipo lo dejó escrito como decisión del negocio.` },
        { t: 'callout', tone: 'note', title: 'El paso en una línea', html: 'La arquitectura espera los problemas <strong>preparada</strong>, en vez de pretender que no existan.' },
      ],
    },

    /* ── paso 4 ── */
    {
      id: 'factura',
      kicker: 'Paso 4 · La factura',
      title: 'Cerrar con la factura',
      visual: { scene: 'guide-method', state: 's4' },
      describe:
        '<p>El paso 4 resaltado. Dónde ocurrió: en el capítulo 2, la pregunta del podio resultó ser económica, no técnica; en el capítulo 9, bytes y frecuencias antes de elegir servidores, tres escenarios de 12.248 a 22.481 USD por año, y monitoreo pago porque las horas del equipo también cuestan. Para llevarte: el cliente no despliega diagramas, despliega facturas.</p>',
      blocks: [
        { t: 'p', html: 'Una arquitectura sin costo anual estimado está incompleta: <strong>el cliente no despliega diagramas, despliega facturas</strong>.' },
        { t: 'p', html: `Ya estaba en el capítulo 2, cuando la pregunta del podio resultó ser económica. Y en el capítulo 9 el equipo cerró con una planilla: primero los volúmenes, después el ${c('tco', 'costo total de propiedad')} en tres escenarios.` },
        { t: 'p', html: 'De los diez finalistas de la kata, fue la única entrega con análisis de costos.' },
      ],
    },
    {
      id: 'horas',
      kicker: 'Paso 4 · La factura',
      title: 'La línea que falta',
      visual: { scene: 'guide-invoice', props: { correct: 2 } },
      evidence: {
        src: '/img/1y-min-tco.png',
        alt: 'La distribución del costo anual por servicio del equipo, en tres escenarios',
        caption: 'El presupuesto anual del equipo, por servicio. La factura redibuja el escenario mínimo, la primera torta.',
      },
      describe:
        '<p>Factura del año 1 en el escenario mínimo: monitoreo (DataDog) 3.336 USD, máquinas (EC2) 3.115, base de datos (DynamoDB) 3.072, reportes (Tableau) 1.440, y todo lo demás (colas, streaming, notificaciones, archivos, VPN) 1.285. Total: 12.248 USD por año; 12.548 en el escenario proyectado y 22.481 en el de crecimiento rápido. La línea que ninguna factura muestra: montar el stack gratis propio no cuesta licencias, pero cuesta las horas del equipo.</p>',
      blocks: [
        { t: 'p', html: `El costo incluye las horas de quienes mantienen cada pieza. Así defendió la planilla del equipo ${doc('cost-analysis')} su línea más cara.` },
        {
          t: 'predict',
          question: 'Monitoreo open source gratis o una suscripción de 3.336 USD por año: para un equipo chico, ¿qué sale menos?',
          options: [
            { label: 'El gratis: sin licencia, sin costo', feedback: 'La licencia es gratis; mantenerlo vivo, no. Alguien del equipo tiene que operar esos servidores.' },
            { label: 'Al final los dos cuestan más o menos igual', feedback: 'El equipo comparó las opciones: la propia exigía mantenimiento interno, y eso inclinó la balanza.' },
            { label: 'La suscripción, cuando contás las horas', correct: true, feedback: '<strong>Exacto.</strong> Grafana y ELK se descartaron por exigir mantenimiento propio: horas de desarrollador, lo más escaso de un equipo chico.' },
            { label: 'El que corra en menos servidores', feedback: 'Los servidores son la parte visible. El costo mayor eran las horas de quienes los mantienen.' },
          ],
        },
      ],
    },

    /* ── el orden ── */
    {
      id: 'orden',
      kicker: 'El orden',
      title: 'Si te salteás un paso, se nota',
      visual: { scene: 'guide-method', state: 'skip' },
      describe:
        '<p>Los cuatro pasos, y debajo de cada uno qué pasa sin él. Sin el paso 1, diseñás para el sistema imaginario, no para el real. Sin el paso 2, cada discusión técnica se vuelve una guerra de gustos. Sin el paso 3, los problemas llegan y encuentran un diseño que hizo de cuenta que no existían. Sin el paso 4, la arquitectura queda incompleta: nadie sabe cuánto cuesta operarla. El orden es parte del método.</p>',
      blocks: [
        { t: 'p', html: 'Los cuatro pasos no son un menú para elegir. Cada uno alimenta al siguiente: los principios se destilan de las restricciones que entendiste, y el diseño sigue a los principios.' },
        { t: 'p', html: 'Mirá lo que deja cada paso que falta.' },
        { t: 'callout', tone: 'info', title: 'El método entero', html: '<strong>Entender → principios → diseñar para la realidad → la factura.</strong> En ese orden.' },
      ],
    },

    /* ── checkpoint ── */
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Cuatro preguntas para cerrar el curso',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'Te llega un pliego nuevo. ¿Qué va primero, antes de cualquier diagrama?',
              options: [
                'Elegir el proveedor de nube y el stack',
                'Dibujar la arquitectura del sistema ideal',
                'Entender el negocio y sus números',
                'Estimar el costo anual de cada estilo',
              ],
              answer: 2,
              why: 'Una semana sin diagramas. Saber cuántas peticiones por segundo tiene el sistema real es el dato que desempata todo lo demás.',
            },
            {
              q: 'Dos diseñadores se trancan con dos herramientas. ¿Qué paso del método lo tendría que haber evitado?',
              options: [
                'Fijar principios de desempate antes de discutir herramientas',
                'Estimar la factura anual antes de elegir nada',
                'Pedirle al cliente más presupuesto primero',
                'Dejar que decida la persona con más antigüedad',
              ],
              answer: 0,
              why: 'Sin criterios previos, la discusión de arquitectura se vuelve una guerra de gustos. En el caso, cada decisión técnica se remonta a uno de los cuatro principios.',
            },
            {
              q: 'Una heladera en un sótano va a perder señal tarde o temprano. ¿Qué significa acá diseñar para la realidad?',
              options: [
                'Suponer una conexión estable y arreglarlo después',
                'Exigir cobertura perfecta en cada punto de venta',
                'Bloquear toda venta mientras no haya señal',
                'Prepararse: un PIN que la heladera valida sin señal',
              ],
              answer: 3,
              why: 'La arquitectura espera los problemas preparada en vez de pretender que no existan. El retiro se informa cuando vuelve la señal.',
            },
            {
              q: '¿Por qué el monitoreo pago salía más barato que la alternativa gratis?',
              options: [
                'Porque el proveedor ofrecía un descuento para startups',
                'Porque el stack gratis consume horas del equipo',
                'Porque para este volumen el monitoreo era opcional',
                'Porque los servidores venían gratis con la nube',
              ],
              answer: 1,
              why: 'El costo incluye las horas de las personas que mantienen cada pieza. Para un equipo chico, esas horas son el recurso más caro.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'El último repaso es sobre el método, no sobre el caso.' },
        { t: 'p', html: 'Queda una pantalla: los cuatro pasos como preguntas para llevarte, y el camino de vuelta al mapa del curso.' },
      ],
    },

    /* ── cierre ── */
    {
      id: 'cierre',
      kicker: 'Tu turno',
      title: 'Tu próximo sistema, en cuatro preguntas',
      visual: { scene: 'guide-card' },
      describe:
        '<ol><li>Entender el negocio: ¿qué volumen maneja el sistema real, y qué no es problema mío? (capítulos 1 y 3)</li><li>Fijar los principios: ¿qué criterios desempatan cuando dos opciones se trancan? (capítulos 3, 4 y 10)</li><li>Diseñar para la realidad: ¿qué va a fallar en el mundo físico, y qué hace el diseño cuando pase? (capítulos 5 a 8)</li><li>Cerrar con la factura: ¿cuánto cuesta por año, contando a las personas que lo mantienen? (capítulos 2 y 9)</li></ol><p>Abajo, un link de vuelta al mapa del curso y otro a los repositorios en GitHub.</p>',
      blocks: [
        { t: 'p', html: 'Ese es el método entero. Las heladeras se quedan en Detroit; las cuatro preguntas viajan con vos.' },
        { t: 'p', html: 'Todos los documentos citados en este curso están en los repositorios públicos de <a href="https://github.com/TheKataLog" target="_blank" rel="noopener noreferrer">TheKataLog en GitHub</a>. Si querés ver a tres equipos resolver el mismo problema de formas opuestas, comparar sus repositorios es la mejor manera de seguir.' },
        { t: 'p', html: 'Este curso es un análisis pedagógico independiente del material público de la competencia, con Richards &amp; Ford y Rozanski &amp; Woods como marco teórico.' },
      ],
    },
  ],
};
