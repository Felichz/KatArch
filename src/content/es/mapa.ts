import type { Chapter } from '../types';
import { c } from '../helpers';

export const mapa: Chapter = {
  id: 'mapa',
  number: 10,
  phase: 'La realidad económica',
  title: 'El mapa de decisiones',
  subtitle: 'Las diez decisiones estructurales en tres pilares, y los hilos que las atan entre sí.',
  minutes: 12,
  learn: [
    'Explicar por qué dieciséis ADRs se vuelven <strong>diez decisiones estructurales</strong>.',
    'Leer cada decisión como <strong>problema, decisión y renuncia</strong>.',
    'Ubicar cada decisión en su <strong>pilar</strong> y en el capítulo donde se tomó.',
    'Seguir los <strong>hilos</strong>: qué decisión forzó a cuál, y la cadena de renuncias que recorre el caso.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'El mapa de decisiones',
      blocks: [
        { t: 'p', html: 'Nueve capítulos de decisiones, de a una. Este pone una al lado de la otra las diez que de verdad definen la arquitectura y las lee como sistema: qué resolvió cada una, cuánto costó y cuál forzó a la siguiente.' },
      ],
    },
    {
      id: 'curaduria',
      kicker: 'La curaduría',
      title: 'Dieciséis ADRs, diez decisiones',
      visual: { scene: 'map-sieve' },
      describe: '<p>Dieciséis fichas de ADR. Cinco quedan fuera del mapa: 001 (la plantilla de ADR), 004 (health checks), 005 (chequeos de preparación), 015 (proveedores de mapas) y 016 (infraestructura como código). Las otras once van a tres pilares. Pilar 1: ADRs 002, 007 y 008. Pilar 2: ADRs 011, 012 con 013 (una sola decisión) y 010. Pilar 3: ADRs 003, 006, 009 y 014. Once ADRs, diez decisiones.</p>',
      blocks: [
        { t: 'p', html: `El repositorio entregó dieciséis ${c('adr', 'ADRs')}, y no todos pesan lo mismo: algunos son decisiones estructurales profundas, otros son higiene operativa y algunos son trámite documental.` },
        { t: 'p', html: 'La curaduría se queda con los que de verdad definen esta arquitectura: <strong>diez decisiones</strong>, agrupadas en tres pilares.' },
        { t: 'p', html: 'Mirá la letra chica: dos ADRs, los datos viejos de las heladeras y el catálogo en caché, son una sola decisión.' },
      ],
    },
    {
      id: 'anatomia',
      kicker: 'La curaduría',
      title: 'Cada entrada responde tres preguntas',
      visual: { scene: 'map-anatomy', props: { id: 'monolith' } },
      describe: '<p>La entrada del monolito modular, del capítulo 4, en tres fichas. El problema: dos locaciones, unas 42 comidas por día y un equipo chico, sin hipotecar el crecimiento a 68 locaciones. La decisión: un monolito dividido en módulos con fronteras estrictas que se hablan por contratos. Lo que se paga: el riesgo de que los módulos se relajen hasta volverse una bola de barro, con contratos, telemetría por módulo y revisión como contrapeso.</p>',
      blocks: [
        { t: 'p', html: 'Cada decisión del mapa se lee igual: el <strong>problema</strong> que la forzó, la <strong>decisión</strong> en sí y la <strong>renuncia</strong> que el equipo aceptó.' },
        { t: 'p', html: 'Es el ADR del capítulo 3 (contexto, decisión, consecuencias) contado en lenguaje llano. Y la regla de oro sigue en pie: una entrada sin contras sería propaganda.' },
        { t: 'p', html: 'A la derecha, la decisión madre del caso, del capítulo 4.' },
      ],
    },
    {
      id: 'mapa',
      kicker: 'El mapa',
      title: 'Diez decisiones en un mapa',
      visual: { scene: 'map-board', state: 'explore' },
      describe: '<p>Tres zonas de pilares. En el medio, el núcleo estructural: monolito modular, event sourcing y cola con acuse de recibo. A la izquierda, la realidad física y la privacidad: feedback propio, PIN offline y catálogo local. A la derecha, operación, escala y presupuesto: monitoreo alquilado, identidad en el borde, escala vertical y fachada de pagos.</p><p>Flechas llenas: el monolito lleva al monitoreo alquilado, a la identidad en el borde y a la escala vertical; el catálogo local lleva a la cola, y la cola a la fachada de pagos. Las líneas punteadas unen decisiones con la misma lógica: event sourcing con la cola, el PIN offline con el catálogo local, y el monitoreo alquilado con el feedback propio.</p>',
      blocks: [
        { t: 'p', html: 'Acá está el mapa completo. Cada caja es una decisión, cada zona punteada un pilar. Las flechas llenas dicen que una decisión llevó a otra; las líneas punteadas unen decisiones con la misma lógica.' },
        { t: 'p', html: 'El núcleo estructural va en el medio porque por ahí pasan casi todos los hilos.' },
        { t: 'p', html: '<strong>Tocá cualquier decisión</strong>: debajo del mapa aparecen su problema, la decisión y lo que se paga, el capítulo de donde salió y un botón que abre su ficha completa.' },
      ],
    },
    {
      id: 'pilar-1',
      kicker: 'El mapa',
      title: 'Pilar 1: el núcleo estructural',
      visual: { scene: 'map-board', state: 'p1' },
      describe: '<p>Se resalta la zona del medio: monolito modular (capítulo 4), event sourcing y cola con acuse de recibo (las dos del capítulo 6). Una línea punteada une event sourcing con la cola: las dos cuidan el dinero.</p>',
      blocks: [
        { t: 'p', html: 'Las decisiones que definen la forma del sistema: cómo se organiza, cómo guarda sus datos y cómo se hablan sus partes.' },
        { t: 'p', html: 'El estilo vino primero, en el capítulo 4. Las otras dos llegaron en el capítulo 6, con un cliente que reclama un cobro: guardar la evidencia, y que el mensaje de cobro no se pierda ni se duplique.' },
        { t: 'decision', id: 'monolith' },
        { t: 'decision', id: 'event-sourcing' },
        { t: 'decision', id: 'rabbitmq' },
      ],
    },
    {
      id: 'pilar-2',
      kicker: 'El mapa',
      title: 'Pilar 2: la realidad física y la privacidad',
      visual: { scene: 'map-board', state: 'p2' },
      describe: '<p>Se resalta la zona de la izquierda: feedback propio (capítulo 9), PIN offline y catálogo local (los dos del capítulo 6). Una línea punteada une el PIN offline con el catálogo local: los dos aceptan la realidad física.</p>',
      blocks: [
        { t: 'p', html: 'Decisiones nacidas donde el software choca con el mundo real: heladeras que pierden señal, datos de stock que llegan tarde, datos de salud de clientes reales.' },
        { t: 'p', html: 'El PIN y el catálogo local vienen del capítulo 6 y comparten su patrón: aceptar la realidad física en vez de pelearla. El feedback propio viene del capítulo 9: los perfiles de salud no salen de la plataforma.' },
        { t: 'decision', id: 'pin-offline' },
        { t: 'decision', id: 'catalog-cache' },
        { t: 'decision', id: 'privacy' },
      ],
    },
    {
      id: 'pilar-3',
      kicker: 'El mapa',
      title: 'Pilar 3: operación, escala y presupuesto',
      visual: { scene: 'map-board', state: 'p3' },
      describe: '<p>Se resalta la zona de la derecha: monitoreo alquilado (capítulo 9), identidad en el borde y escala vertical (las dos del capítulo 8) y la fachada de pagos (capítulo 5).</p>',
      blocks: [
        { t: 'p', html: 'Las que cuidan el bolsillo de la startup: cuándo escalar, qué monitorear, dónde validar identidades, qué comprar hecho. Los pagos salieron en el capítulo 5, identidad y escala en el 8, monitoreo en el 9.' },
        { t: 'decision', id: 'payment' },
        { t: 'decision', id: 'edge-auth' },
        { t: 'decision', id: 'scale-up' },
        { t: 'decision', id: 'datadog' },
      ],
    },
    {
      id: 'madre',
      kicker: 'Los hilos',
      title: 'La decisión madre arrastra otras tres',
      visual: { scene: 'map-board', state: 'mother', props: { correct: 1 } },
      describe: '<p>Tres flechas salen del monolito modular hacia el tercer pilar: monitoreo alquilado (la telemetría por módulo que compensa su riesgo), identidad en el borde (confianza cero entre módulos, lista para el día que se separen) y escala vertical (el módulo con más presión se extrae cuando la escala vertical ya no da).</p>',
      blocks: [
        { t: 'p', html: 'El capítulo 4 llamó al estilo la decisión madre del caso. En el mapa se ve por qué: del monolito modular salen tres flechas.' },
        {
          t: 'predict',
          question: 'El monolito acepta el riesgo de degradarse en una bola de barro. ¿Qué decisión posterior es parte del contrapeso?',
          options: [
            { label: 'El retiro offline por PIN', feedback: 'Esa responde a las heladeras que pierden señal, no al riesgo del monolito.' },
            { label: 'El monitoreo alquilado', correct: true, feedback: '<strong>Exacto.</strong> El contrapeso incluye telemetría obligatoria por módulo, y DataDog es cómo se pagó. Las otras dos flechas: confianza cero entre módulos, y agrandar la máquina antes de separar.' },
            { label: 'El módulo de feedback propio', feedback: 'Esa protege datos de salud; no tiene que ver con el riesgo del monolito.' },
          ],
        },
      ],
    },
    {
      id: 'dinero',
      kicker: 'Los hilos',
      title: 'El camino del dinero cruza los tres pilares',
      visual: { scene: 'map-board', state: 'money' },
      describe: '<p>Se enciende el camino de una compra: del catálogo local (pilar 2) a la cola con acuse de recibo (pilar 1), unida a event sourcing, y de la cola a la fachada de pagos (pilar 3).</p>',
      blocks: [
        { t: 'p', html: 'Seguí una compra por el mapa. El catálogo del teléfono puede estar viejo mientras navegás, nunca mientras pagás: el stock real se verifica en el momento del pago.' },
        { t: 'p', html: 'De ahí el cobro viaja por una cola que confirma el recibo, para que no se pierda ni se duplique, y cada orden queda guardada como historia de eventos, lista para cualquier reclamo.' },
        { t: 'p', html: 'En la otra punta espera el proveedor de pagos, detrás de una fachada propia. Tres pilares, un solo camino.' },
      ],
    },
    {
      id: 'vara',
      kicker: 'Los hilos',
      title: 'Una misma vara, respuestas opuestas',
      visual: { scene: 'map-board', state: 'yardstick' },
      describe: '<p>Una línea punteada rodea el mapa desde el feedback propio (pilar 2) hasta el monitoreo alquilado (pilar 3): la misma pregunta de comprar o construir, con respuestas opuestas.</p>',
      blocks: [
        { t: 'p', html: 'Dos decisiones del capítulo 9 viven en pilares distintos y salieron de la misma pregunta: ¿se compra o se construye?' },
        { t: 'p', html: 'Para el monitoreo ganó comprar: la alternativa gratis costaba horas de desarrollo, el recurso más caro de un equipo chico. Para las encuestas ganó construir: las herramientas hechas ponían datos de salud en servidores de terceros.' },
        { t: 'callout', tone: 'info', title: 'La vara', html: 'La factura mensual nunca decide sola. El costo real incluye quién mantiene la pieza, y qué datos salen de la casa.' },
      ],
    },
    {
      id: 'puertas',
      kicker: 'Los hilos',
      title: 'Cinco decisiones dejan una puerta abierta',
      visual: { scene: 'map-board', state: 'doors' },
      describe: '<p>Cinco decisiones llevan una insignia de puerta: monolito modular, event sourcing, identidad en el borde, escala vertical y fachada de pagos. Cada una resuelve el volumen de hoy y deja escrita su salida.</p>',
      blocks: [
        { t: 'p', html: 'Buscá la insignia de la puerta. Cinco decisiones resuelven el volumen de hoy y dejan escrito, en la misma ficha, cómo salir después:' },
        {
          t: 'list',
          items: [
            '<strong>Monolito:</strong> extraer un módulo el día que la telemetría lo justifique.',
            '<strong>Event sourcing:</strong> EventStore open source primero, el servicio administrado solo si el volumen lo pide.',
            '<strong>Pagos:</strong> un proveedor ahora, una fachada propia que puede asumir las redes.',
            '<strong>Escala:</strong> una máquina más grande hoy, más instancias cuando la telemetría lo diga.',
            '<strong>Confianza cero:</strong> la seguridad lista antes de separar.',
          ],
        },
        { t: 'p', html: 'Es el principio de evolucionabilidad del capítulo 3: diseñar para extraer mañana, sin extraer hoy.' },
      ],
    },
    {
      id: 'cadena',
      kicker: 'Los hilos',
      title: 'La cadena de renuncias',
      visual: { scene: 'map-chain' },
      describe: '<p>Cuatro decisiones en cadena. El monolito modular acepta que los módulos se relajen hasta volverse una bola de barro. El contrapeso es la telemetría por módulo, que lleva al monitoreo alquilado, el ítem más caro del presupuesto anual. Esa telemetría avisa cuándo la escala vertical ya no da, que es de lo que depende escalar primero la máquina, aceptando un único punto de falla. Cuando no da más, el módulo con más presión sale del monolito, y la identidad en el borde ya dejó la seguridad lista para eso, al precio de una verificación extra entre módulos.</p>',
      blocks: [
        { t: 'p', html: 'El capítulo 1 prometió una cadena de renuncias que recorre todo el caso. Acá tenés un hilo entero: cada renuncia la paga la decisión siguiente.' },
        { t: 'p', html: `El monolito acepta un riesgo, la ${c('telemetry', 'telemetría')} lo cubre, la telemetría cuesta plata y decide cuándo escalar, y cuando por fin sale un módulo, la confianza cero ya lo está esperando. Recorrelo con los controles.` },
        { t: 'callout', tone: 'note', title: 'Por qué importa', html: 'Ninguna decisión está sola. Esa es la trazabilidad que premió el jurado: del negocio a la decisión, y de la decisión al costo.' },
      ],
    },
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Cuatro preguntas antes del último capítulo',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'Once ADRs alimentan el mapa, pero el mapa tiene solo diez decisiones. ¿Por qué?',
              options: [
                'El jurado descartó uno de los once ADRs',
                'Los datos viejos de las heladeras y el catálogo en caché son una sola decisión',
                'Uno de los ADRs era un duplicado cargado por error',
                'El mapa deja la decisión de pagos para más adelante',
              ],
              answer: 1,
              why: 'Los ADRs 012 y 013 alimentan una sola decisión: navegar un catálogo en caché y verificar el stock real al pagar.',
            },
            {
              q: '¿A qué pilar pertenece el retiro offline por PIN?',
              options: ['Al núcleo estructural', 'A operación, escala y presupuesto', 'A la realidad física y la privacidad', 'A ninguno: queda fuera del mapa'],
              answer: 2,
              why: 'Nació de una heladera que pierde señal en el subsuelo de un hospital: el software chocando con el mundo físico.',
            },
            {
              q: '¿Por qué tiene sentido la confianza cero entre módulos dentro de un monolito?',
              options: [
                'Porque la seguridad queda lista el día que un módulo se separa',
                'Porque los módulos de un monolito no pueden confiar en la red',
                'Porque Cognito solo funciona si cada módulo valida tokens',
                'Porque hace más rápida cada petición dentro del monolito',
              ],
              answer: 0,
              why: 'Es la otra flecha de la decisión madre: el monolito está diseñado para separarse, así que la seguridad también.',
            },
            {
              q: 'El monitoreo alquilado y el feedback propio salieron de la misma pregunta de comprar o construir. ¿Por qué respuestas opuestas?',
              options: [
                'El monitoreo era más barato de construir que las encuestas',
                'El feedback era un dominio core y el monitoreo no',
                'Al equipo no le alcanzó el tiempo para construir el monitoreo',
                'Comprar monitoreo ahorraba horas de desarrollo; comprar encuestas exponía datos de salud',
              ],
              answer: 3,
              why: 'Misma vara, costo completo: las horas de quien mantiene la pieza, y los datos que saldrían de la plataforma.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Repasá el mapa antes del último tramo.' },
        { t: 'p', html: 'Diez decisiones y, debajo de ellas, una forma de trabajar. El último capítulo saca el caso de encima y se queda con el método: cuatro pasos que podés llevar a tu próximo sistema.' },
      ],
    },
  ],
};
