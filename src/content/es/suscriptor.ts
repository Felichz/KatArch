import type { Chapter } from '../types';
import { c, doc, cmd, evt } from '../helpers';

export const suscriptor: Chapter = {
  id: 'suscriptor',
  number: 7,
  phase: 'El diseño',
  title: 'El viaje de una vianda',
  subtitle: 'Del calendario a la heladera: el ciclo del suscriptor en eventos.',
  minutes: 13,
  learn: [
    'Explicar por qué el equipo guardó la suscripción como una <strong>agenda</strong> en vez de crear de antemano todas las órdenes futuras.',
    'Seguir una vianda programada por sus comandos y eventos, <strong>del calendario a la heladera</strong>.',
    'Explicar por qué una orden recién está disponible cuando <strong>la heladera la confirma</strong>.',
    'Leer la cancelación de una orden programada como un <strong>reembolso en dos mensajes</strong>.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'El viaje de una vianda',
      blocks: [
        {
          t: 'p',
          html: 'El capítulo anterior terminó con una pregunta abierta: ¿y el suscriptor, que pide para toda la semana? Este capítulo sigue una de sus viandas del calendario a la heladera, y de vuelta cuando se arrepiente.',
        },
      ],
    },

    /* ── el cabo suelto ── */
    {
      id: 'cabo',
      kicker: 'El cabo suelto',
      title: 'El cliente que desapareció',
      visual: { scene: 'sub-ladder' },
      describe: '<p>Tres escalones: el usuario ocasional (kiosco, efectivo), el usuario conocido (app y tarjeta) y, destacado arriba, el suscriptor (menú semanal prepagado). Las flechas muestran la conversión que busca el negocio. Abajo: 1.000 suscriptores a fin de año, a unas 10 comidas por semana cada uno, son unas 10.000 comidas por semana.</p>',
      blocks: [
        { t: 'p', html: `El capítulo 1 presentó tres tipos de usuario, y el negocio quería uno por sobre todos: el <strong>suscriptor</strong>, que prepaga un menú semanal. Su primer impulsor de negocio pide convertir ocasionales en conocidos, y conocidos en suscriptores ${doc('business-drivers')}.` },
        { t: 'p', html: 'El objetivo era <strong>1.000 suscriptores</strong> a fin de año, a unas 10 comidas por semana cada uno. Y sin embargo, todos los diagramas mostraron hasta acá una compra instantánea.' },
        { t: 'p', html: `¿Cómo llega físicamente la comida de un suscriptor? El equipo lo trabajó de punta a punta ${doc('user-scenarios')}.` },
      ],
    },

    /* ── la idea ── */
    {
      id: 'idea',
      kicker: 'La idea',
      title: '“IDEA!!!”: nace la suscripción',
      visual: { scene: 'sub-idea', state: 'draw' },
      evidence: { src: '/img/whiteboard-subscriber-idea.png', alt: 'Pizarra original “IDEA!!!”: un usuario con cuenta, una heladera con comidas y una fila de días prepagados', caption: 'La pizarra original del equipo: el momento en que se inventa la suscripción, con un menú prepagado por día (1d, 2d, 3d) y puntos de lealtad.' },
      describe: '<ol><li>Un monigote con una etiqueta de cuenta y un “+1” sobre la cabeza: el usuario con cuenta.</li><li>Una heladera con cinco comidas disponibles, de la A a la E.</li><li>Las flechas 2 y 3 van del usuario a dos comidas, con un signo $: elegir, reservar y pagar.</li><li>La flecha 1 va a una fila debajo de la heladera: casilleros prepagados por día 1d, 2d, 3d, con las leyendas “+ puntos de lealtad” y “menú de suscripción”.</li></ol>',
      blocks: [
        { t: 'p', html: 'El repositorio guarda hasta el momento en que nació: un garabato en la pizarra titulado “IDEA!!!”.' },
        { t: 'p', html: 'Un usuario con cuenta, una heladera con sus comidas disponibles y, abajo, algo nuevo: <strong>una fila de casilleros prepagados por día</strong> (1d, 2d, 3d) que además suman <strong>puntos de lealtad</strong>.' },
        { t: 'p', html: 'Recorré el dibujo paso a paso: va del usuario a la heladera, y de ahí a esa fila de abajo.' },
      ],
    },
    {
      id: 'dos-filas',
      kicker: 'La idea',
      title: 'Dos filas: el presente y el futuro comprometido',
      visual: { scene: 'sub-idea', state: 'rows' },
      evidence: { src: '/img/whiteboard-subscriber-idea.png', alt: 'Pizarra original “IDEA!!!”: un usuario con cuenta, una heladera con comidas y una fila de días prepagados', caption: 'En el original, las comidas sueltas están arriba, en la heladera, y los días prepagados en una fila aparte, abajo.' },
      describe: '<p>La misma pizarra, leída como dos filas. Arriba, la heladera con sus comidas disponibles: el presente, que se elige y se paga en el momento. Abajo, los casilleros prepagados por día: el futuro comprometido, pagado antes, que suma puntos de lealtad.</p>',
      blocks: [
        { t: 'p', html: 'El dibujo se parte en dos filas. Arriba, las comidas sueltas: lo que hay hoy en la heladera, elegido y pagado en el momento. Abajo, el <strong>menú prepagado por día</strong>: un futuro que el cliente ya pagó.' },
        { t: 'p', html: `Los requerimientos dicen lo mismo ${doc('business-drivers')}: el suscriptor arma un menú semanal, prepagado, y fija un horario de retiro. Y las compras planificadas suman puntos de lealtad.` },
        { t: 'callout', tone: 'note', title: 'Por qué importa', html: 'De esa fila de abajo sale todo este capítulo: agenda, despacho, retiro y reembolsos.' },
      ],
    },

    /* ── la agenda ── */
    {
      id: 'materializar',
      kicker: 'La agenda',
      title: '¿Dónde vive un mes de almuerzos?',
      visual: { scene: 'sub-tradeoff', state: 'ask', props: { correct: 1 } },
      describe: '<p>Un suscriptor prepagó cuatro semanas de almuerzos: una grilla de veinte casilleros de lunes a viernes, cada uno una orden futura marcada con un signo de pregunta. ¿Dónde tienen que vivir hasta que llegue su día?</p>',
      blocks: [
        { t: 'p', html: 'Un suscriptor prepaga cuatro semanas de almuerzos: veinte comidas futuras. Cada una va a terminar siendo una orden real que una cocina prepara y una heladera entrega.' },
        {
          t: 'predict',
          question: 'Hasta que llegue su día, ¿cómo guardarías esas veinte órdenes?',
          options: [
            { label: 'Crear ya las veinte órdenes, cada una con su fecha', feedback: 'El equipo la evaluó: procesar se vuelve simple, porque todas las órdenes ya existen. El problema aparece cuando el menú cambia.' },
            { label: 'Guardar el menú como agenda y generar las órdenes de cada día', correct: true, feedback: '<strong>Eso eligió el equipo.</strong> El menú es una estructura lógica, y de ella salen cada día las órdenes nuevas.' },
            { label: 'Que el suscriptor confirme cada orden el día anterior', feedback: 'Eso trae de vuelta justo lo que la agenda venía a sacar: pedir una y otra vez.' },
            { label: 'Darle la lista entera a la cocina y que la guarde ella', feedback: 'La cocina es un sistema externo que el equipo no controla. La promesa al suscriptor no puede vivir ahí.' },
          ],
        },
      ],
    },
    {
      id: 'agenda',
      kicker: 'La agenda',
      title: 'Una agenda que genera cada día',
      visual: { scene: 'sub-tradeoff', state: 'compare' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Diagrama de información original: preparación de órdenes programadas', caption: 'El trade-off está escrito junto a este diagrama en los modelos de información del equipo: órdenes de antemano, o una agenda que las genera.' },
      describe: '<p>Dos paneles. A: las veinte órdenes creadas de antemano; cambiar el menú desde la semana 2 obliga a cazar y reescribir quince. B: un menú que cada mañana genera la orden de hoy, marcada como prepagada; cambiar el menú es un solo cambio.</p>',
      blocks: [
        { t: 'p', html: `El equipo dejó el trade-off por escrito ${doc('info-models')}. Crear todas las órdenes de antemano simplifica el procesamiento, pero infla la base de órdenes, y cada cambio o cancelación obliga a muchas actualizaciones.` },
        { t: 'p', html: 'Generar las órdenes de cada día desde el menú abarata los cambios. Cambiá el menú en el diagrama y compará.' },
        { t: 'callout', tone: 'note', title: 'La renuncia', html: 'Las órdenes generadas hay que <strong>marcarlas como prepagadas</strong>: una regla más para pagos, quizás resuelta con una campaña especial “suscriptor”.' },
      ],
    },

    /* ── del calendario a la heladera ── */
    {
      id: 'manana',
      kicker: 'Del calendario a la heladera',
      title: 'Cada mañana, una lista para la cocina',
      visual: { scene: 'sub-cycle', state: 'morning' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Diagrama de información original: preparación de órdenes programadas', caption: 'El diagrama original del equipo: GetScheduledOrders (1) y PrepareOrders (2) arrancan el día.' },
      describe: '<ol><li>El planificador envía GetScheduledOrders a la orden del sistema, que responde desde una proyección.</li><li>El planificador envía PrepareOrders a la cocina fantasma, una vez por día: la lista de lo que hay que cocinar.</li></ol>',
      blocks: [
        { t: 'p', html: `Las cocinas no trabajan 24/7: preparan lo que reciben al empezar su jornada ${doc('assumptions')}. Entonces, cada día, el planificador pide las órdenes programadas de hoy (${cmd('GetScheduledOrders')}) y le manda a la cocina la lista de lo que hay que cocinar (${cmd('PrepareOrders')}).` },
        { t: 'p', html: `Esa lista es el <em>inventory update</em> que pedía el enunciado, armada desde los menús de los suscriptores. Y el planificador nunca consulta el event store: lee ${c('cqrs', 'proyecciones')}, copias listas que alguien más mantiene al día.` },
      ],
    },
    {
      id: 'vocabulario',
      kicker: 'Del calendario a la heladera',
      title: 'Cuatro palabras de la cocina',
      visual: { scene: 'sub-vocab' },
      describe: '<p>La cocina fantasma, un sistema externo con su propio software de seguimiento, recibe PrepareOrders cada mañana. Responde con cuatro palabras: aceptado (recibió la lista), despachado (que se vuelve el evento OrderDispatched), no puedo (un riesgo que el equipo anotó: un menú que no se puede preparar) y demorado (los suscriptores pidieron enterarse de la comida que se demora).</p>',
      blocks: [
        { t: 'p', html: `La cocina es un sistema externo que ya tiene su propio software de seguimiento. El equipo supuso que podía responder con un vocabulario mínimo ${doc('assumptions')}: <strong>aceptado, despachado, no puedo, demorado</strong>.` },
        { t: 'p', html: 'Cuatro palabras alcanzan para tener informado a un suscriptor. Y una de ellas, <strong>despachado</strong>, es la que pone en marcha el resto de la cadena.' },
      ],
    },
    {
      id: 'despacho',
      kicker: 'Del calendario a la heladera',
      title: 'Un hecho, cuatro oyentes',
      visual: { scene: 'sub-cycle', state: 'dispatch' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Diagrama de información original: preparación de órdenes programadas', caption: 'En el original salen cuatro flechas de OrderDispatched (3): User, Catalog, Reporting y System Order.' },
      describe: '<p>La cocina fantasma publica OrderDispatched. Lo reciben cuatro oyentes: el catálogo, el reporting, la orden del sistema y el usuario.</p>',
      blocks: [
        { t: 'p', html: `Cuando la cocina despacha, publica ${evt('OrderDispatched')}. No llama a nadie por su nombre: el que tiene interés, escucha.` },
        { t: 'p', html: 'El <strong>catálogo</strong> actualiza su stock, el <strong>reporting</strong> lo registra, la <strong>orden</strong> avanza y el <strong>usuario</strong> se entera de que su vianda está en camino. “Usuario informado, usuario feliz”, escribió el equipo.' },
        { t: 'p', html: 'Pasa como mucho un par de veces por día por heladera: las entregas no se multiplican a pedido.' },
      ],
    },
    {
      id: 'heladera',
      kicker: 'Del calendario a la heladera',
      title: 'Solo la heladera puede decir “llegó”',
      visual: { scene: 'sub-cycle', state: 'fridge' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Diagrama de información original: preparación de órdenes programadas', caption: 'El final del ciclo original: OrderPlacedInFridge (4) y OrderAvailableForPicking (5).' },
      describe: '<p>La heladera inteligente confirma OrderPlacedInFridge a la orden del sistema. Recién entonces la orden del sistema emite OrderAvailableForPicking hacia el usuario, que recibe el aviso con su PIN.</p>',
      blocks: [
        { t: 'p', html: `Una vianda despachada todavía no está en la heladera. Recién cuando entra físicamente, la heladera confirma ${evt('OrderPlacedInFridge')}, y recién entonces la orden emite ${evt('OrderAvailableForPicking')}: el usuario recibe su aviso con el PIN.` },
        { t: 'p', html: 'Ningún paso se adelanta. Si la cocina no despacha, la cadena simplemente se frena, y nadie recibe aviso de una vianda que no está.' },
        { t: 'p', html: 'Lo sostiene un supuesto: cada comida tiene un id único que la ata a su usuario, algo que necesitan las comidas personalizadas, como una lasaña sin lactosa.' },
      ],
    },

    /* ── el arrepentimiento ── */
    {
      id: 'cancelar',
      kicker: 'El arrepentimiento',
      title: 'Cancelar fuera de la ventana',
      visual: { scene: 'sub-cancel', state: 'ask', props: { correct: 3 } },
      describe: '<p>Del lado del cliente, la app envía Get Scheduled Orders y Cancel Order by User a la orden del sistema. Del lado del servidor esperan tres componentes: el catálogo, el reporting y el proveedor de pagos. ¿Cuál tiene que enterarse de la cancelación?</p>',
      blocks: [
        { t: 'p', html: 'La ventana de 30 segundos del capítulo 6 cubre las compras impulsivas. Un suscriptor que cancela una orden programada es otra historia: la plata se pagó hace días, y quizás la cocina ya compró los ingredientes.' },
        {
          t: 'predict',
          question: 'El suscriptor cancela una orden programada. ¿Qué componente NO necesita enterarse?',
          options: [
            { label: 'Pagos, que tiene la plata', feedback: 'Pagos tiene que enterarse: sin él, no hay reembolso.' },
            { label: 'El reporting, que lleva los números', feedback: 'El reporting escucha: una cancelación es un dato que el negocio quiere.' },
            { label: 'La app, que muestra la agenda', feedback: 'La app necesita la confirmación final de que la plata volvió.' },
            { label: 'El catálogo, que muestra las comidas disponibles', correct: true, feedback: '<strong>Exacto.</strong> Una vianda programada todavía no está en ninguna heladera: el suscriptor cancela algo que no existe, así que no hay stock que liberar.' },
          ],
        },
      ],
    },
    {
      id: 'reembolso',
      kicker: 'El arrepentimiento',
      title: 'Un reembolso lleva dos mensajes',
      visual: { scene: 'sub-cancel', state: 'flow' },
      evidence: { src: '/img/IM_cancel_scheduled_order_by_user.PNG', alt: 'Diagrama de información original: cancelación de una orden programada con reembolso', caption: 'El original del equipo: ClaimRefund viaja a Payment, RefundSuccessful vuelve a la App y ninguna flecha llega al Catalog.' },
      describe: '<ol><li>La app pide sus órdenes programadas.</li><li>La app envía Cancel Order by User a la orden del sistema.</li><li>En paralelo, la orden del sistema emite MealStockCanceled hacia el reporting y envía ClaimRefund a pagos. Al catálogo no le llega nada.</li><li>Pagos responde RefundSuccessful, que vuelve hasta la app.</li></ol>',
      blocks: [
        { t: 'p', html: `Después de ${cmd('Cancel Order by User')}, la orden del sistema hace dos cosas en paralelo: emite ${evt('MealStockCanceled')} para el reporting y envía ${cmd('ClaimRefund')} al proveedor de pagos.` },
        { t: 'p', html: `Pagos cierra el círculo con ${evt('RefundSuccessful')}, que vuelve hasta la app. “Pedí la plata” y “la plata volvió” son hechos distintos, registrados por separado.` },
        { t: 'p', html: 'Sin eventos, “¿se lo devolvimos o no?” es justo la clase de pregunta que le quita el sueño a un equipo de soporte.' },
      ],
    },
    {
      id: 'letra-chica',
      kicker: 'El arrepentimiento',
      title: 'La letra chica: desde el día hábil siguiente',
      visual: { scene: 'sub-calendar' },
      describe: '<p>Simulador: una semana de almuerzos prepagados, de lunes a viernes, más el lunes siguiente. Elegís el día en que cancelás. Las viandas ya retiradas quedan como están; la de ese día ya está preparada y no se cancela; desde el día hábil siguiente, las viandas se cancelan y se envía un ClaimRefund. Si cancelás un viernes, rige desde el lunes.</p>',
      blocks: [
        { t: 'p', html: `Las reglas de negocio también quedaron escritas ${doc('info-models')}: cancelar un menú programado rige <strong>desde el día hábil siguiente</strong>. Una vianda que ya se preparó no se cancela.` },
        { t: 'p', html: 'En vez de perderse, puede liberarse al stock común, una decisión que el equipo dejó en manos del negocio. También anotaron un riesgo de baja probabilidad: cocinas que preparan hasta tres días antes.' },
        { t: 'p', html: 'Elegí en el calendario el día en que cancelás.' },
      ],
    },

    /* ── el patrón ── */
    {
      id: 'patron',
      kicker: 'El patrón',
      title: 'Las mismas piezas simples',
      visual: { scene: 'sub-recap' },
      blocks: [
        { t: 'p', html: 'Tres eventos y un vocabulario de cuatro palabras: hasta el cliente más valioso del negocio se sostiene con las mismas piezas simples que el resto del sistema.' },
        { t: 'callout', tone: 'note', title: 'El patrón', html: 'Modelá el futuro como una <strong>regla que genera hechos</strong>, no como una pila de hechos escritos de antemano. Cuando la regla cambia, no hay nada que salir a cazar.' },
      ],
    },
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Cuatro preguntas antes de seguir',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: '¿Por qué el equipo generó las órdenes de cada día desde el menú en vez de crearlas todas de antemano?',
              options: [
                'Porque la cocina solo puede guardar las órdenes de un día',
                'Porque el proveedor de pagos cobra por cada orden creada',
                'Porque así cambiar el menú no obliga a reescribir decenas de órdenes',
                'Porque la heladera rechaza órdenes con fecha futura',
              ],
              answer: 2,
              why: 'La agenda es una estructura lógica: un cambio toca una sola cosa. El precio es marcar las órdenes generadas como prepagadas.',
            },
            {
              q: '¿Cuándo queda disponible para retiro una orden programada?',
              options: [
                'Cuando la heladera confirma OrderPlacedInFridge',
                'Cuando la cocina acepta la lista del día',
                'Cuando el planificador envía PrepareOrders',
                'Cuando la cocina publica OrderDispatched',
              ],
              answer: 0,
              why: 'Despachada no quiere decir en la heladera. Solo la confirmación de la heladera convierte la orden en OrderAvailableForPicking, con el aviso y el PIN.',
            },
            {
              q: 'Un suscriptor cancela una orden programada. ¿Por qué no se entera el catálogo?',
              options: [
                'Porque el catálogo se actualiza una vez por semana',
                'Porque el proveedor de pagos le avisa más tarde',
                'Porque las cancelaciones no se registran en ningún lado',
                'Porque la vianda no está en ninguna heladera: no hay stock que liberar',
              ],
              answer: 3,
              why: 'El suscriptor cancela algo que todavía no existe. Solo necesitan saberlo el reporting y pagos.',
            },
            {
              q: '¿Por qué el reembolso son dos mensajes, ClaimRefund y RefundSuccessful, y no uno solo?',
              options: [
                'Porque la pasarela necesita dos llamadas para aceptar un reembolso',
                'Porque pedir la plata y recuperarla son hechos distintos',
                'Porque los comandos no pueden viajar a sistemas externos',
                'Porque la app tiene que enviar los dos mensajes a la vez',
              ],
              answer: 1,
              why: 'Cada hecho queda registrado por separado, así que “¿se lo devolvimos o no?” siempre tiene respuesta.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Repasá lo esencial del capítulo antes de seguir.' },
        { t: 'p', html: 'Hasta acá, todo fue lógica pura. <strong>Tarde o temprano alguien tiene que pagar servidores</strong>: el próximo capítulo baja el diseño a la nube.' },
      ],
    },
  ],
};
