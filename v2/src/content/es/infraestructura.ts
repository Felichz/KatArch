import type { Chapter } from '../types';
import { c, doc } from '../helpers';

export const infraestructura: Chapter = {
  id: 'infraestructura',
  number: 8,
  phase: 'El diseño',
  title: 'Aterrizar en la nube',
  subtitle: 'El diseño está listo en papel; ahora tiene que correr en algún lado. Una red privada, la identidad validada en la puerta y un plan para crecer solo cuando los números lo pidan.',
  minutes: 14,
  learn: [
    'Leer una <strong>VPC</strong>: subredes públicas y privadas, dos zonas de disponibilidad y una sola puerta.',
    'Explicar por qué la identidad se valida <strong>en el balanceador</strong>, y por qué los módulos igual se piden credenciales entre sí.',
    'Distinguir una telaraña de llamadas directas de un <strong>stream basado en log</strong>.',
    'Justificar <strong>escalar vertical primero</strong>, y nombrar las señales que disparan escalar horizontal o extraer un módulo.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'Aterrizar en la nube',
      blocks: [
        { t: 'p', html: 'Todo lo anterior es lógica pura: módulos, mensajes, fronteras. En algún momento hay que pagar servidores. Este capítulo acompaña al monolito modular hasta AWS, desde el cerco alrededor de la red hasta el día en que un módulo se muda solo.' },
      ],
    },

    /* ── el recinto privado ── */
    {
      id: 'recinto',
      kicker: 'La red privada',
      title: 'Un terreno vallado en la nube',
      visual: { scene: 'infra-vpc', state: 'layers' },
      evidence: { src: '/img/infra-vpc.png', alt: 'Diagrama original de la topología de red VPC en AWS', caption: 'La VPC del equipo: una región, dos zonas de disponibilidad, subredes públicas y privadas, y las puertas en el borde.' },
      describe: '<ol><li>Región de AWS us-east, la más cercana a Detroit.</li><li>Adentro, la VPC 10.0.0.0/16: una red privada con su propio rango de direcciones.</li><li>Dos zonas de disponibilidad, us-east-1a y us-east-1b: edificios de datacenter separados.</li><li>En cada zona, una subred pública y una privada.</li><li>En el borde, las puertas: el gateway de internet igw-1, el balanceador y el router entre subredes.</li></ol>',
      blocks: [
        { t: 'p', html: 'El equipo eligió AWS por una restricción del pliego y una razón práctica: la región más cercana a Detroit.' },
        { t: 'p', html: `La topología es una lección de ${c('vpc', 'red privada')} bien entendida ${doc('infra-network')}: un recinto privado con el balanceador en la puerta, y todo duplicado en dos edificios de datacenter distintos.` },
        { t: 'p', html: 'Recorrelo de afuera hacia adentro, como se lee el diagrama del equipo.' },
      ],
    },
    {
      id: 'subredes',
      kicker: 'La red privada',
      title: 'Dos edificios, dos tipos de cuarto',
      visual: { scene: 'infra-vpc', state: 'traffic' },
      describe: '<p>Una petición desde internet entra por igw-1, pasa el balanceador y el router, y llega a una subred pública. Las subredes privadas no tienen ruta a internet: su tabla de rutas solo conoce el rango local 10.0.0.0/16, así que el tráfico de afuera no tiene por dónde entrar. La zona b repite a la zona a.</p>',
      blocks: [
        { t: 'p', html: 'Lo que hace pública o privada a una subred es su <strong>tabla de rutas</strong>. Las públicas llegan a internet por igw-1. Las privadas solo conocen el rango local, y el equipo dejó escrito por qué: ningún servicio que corra ahí debería ser accesible desde internet directamente.' },
        { t: 'p', html: 'Ahí viven las piezas más sensibles, como el event store. Y la zona b repite a la zona a: si un edificio se cae, el otro sigue atendiendo.' },
      ],
    },

    /* ── identidad en la puerta ── */
    {
      id: 'puerta-pregunta',
      kicker: 'Identidad en la puerta',
      title: '¿Quién revisa al visitante?',
      visual: { scene: 'infra-auth', state: 'naive' },
      describe: '<p>Un usuario envía una petición que pasa por el balanceador hacia un grupo de N servidores idénticos. Si cada servidor verificara por su cuenta la identidad del visitante, la misma lógica sensible se repetiría N veces.</p>',
      blocks: [
        { t: 'p', html: 'Cada petición trae una pregunta: ¿quién es? Si cada servidor la respondiera por su cuenta, todos gastarían tiempo en eso y todos repetirían la misma lógica sensible.' },
        {
          t: 'predict',
          question: '¿Dónde validarías la identidad del visitante?',
          options: [
            { label: 'En cada módulo, en cada petición', feedback: 'Funciona, pero la misma verificación sensible termina copiada en todos lados, y cada copia puede desfasarse.' },
            { label: 'En el balanceador, antes de que el tráfico llegue a los servidores', correct: true, feedback: '<strong>Eso hizo el equipo.</strong> La puerta verifica una vez; los servidores solo reciben visitas ya verificadas.' },
            { label: 'Solo en la app del teléfono, antes de enviar', feedback: 'La app corre en un dispositivo que no controlás: cualquier cosa que “verifique” se puede falsificar.' },
            { label: 'En la base de datos, al leer los datos', feedback: 'Para entonces la petición ya cruzó todo el sistema sin que nadie preguntara quién la mandó.' },
          ],
        },
      ],
    },
    {
      id: 'puerta',
      kicker: 'Identidad en la puerta',
      title: 'Las credenciales se validan una vez, en la puerta',
      visual: { scene: 'infra-auth', state: 'flow' },
      evidence: { src: '/img/Authentication.png', alt: 'Diagrama original del flujo de autenticación con Cognito y el Application Load Balancer', caption: 'El flujo de autenticación del equipo: el listener del balanceador valida al usuario contra Cognito y recién ahí reenvía la petición.' },
      describe: '<ol><li>El usuario envía una petición sin sesión.</li><li>El balanceador lo redirige a Cognito, el servicio de identidades de AWS.</li><li>El usuario se autentica ahí, directo o con Google o Facebook.</li><li>Vuelve con una sesión autenticada.</li><li>El listener valida el token contra Cognito y reenvía la petición, con cabeceras de identidad, al grupo de auto scaling.</li></ol>',
      blocks: [
        { t: 'p', html: `En vez de que cada pieza del software verifique a cada visitante, lo hace el <strong>balanceador de entrada</strong> contra el servicio de identidades de AWS, Cognito ${doc('authentication')}, antes de que el tráfico llegue a los servidores.` },
        { t: 'p', html: 'Seguí los cinco pasos numerados del diagrama original. Los servidores de la derecha nunca ven una contraseña: confían en las cabeceras de identidad que les pasa la puerta.' },
      ],
    },
    {
      id: 'federacion',
      kicker: 'Identidad en la puerta',
      title: 'Entrar con Google, o no',
      visual: { scene: 'infra-federation' },
      describe: '<p>Dos puertas llevan al mismo pool de usuarios de Cognito. El ingreso federado, con Google, Facebook o un proveedor empresarial, genera confianza en muchos usuarios. La cuenta independiente sirve a quien confía menos en el sitio que en un gigante tecnológico, o quiere una contraseña distinta para cada servicio. El cliente ocasional que paga en efectivo nunca inicia sesión: pasa por la caja.</p>',
      blocks: [
        { t: 'p', html: 'El servicio de identidades permite además <strong>federación</strong>: entrar con la cuenta de Google o Facebook. El equipo lo anotó como argumento de producto: la federación “genera confianza inmediata en una porción grande de usuarios potenciales”.' },
        { t: 'p', html: 'Con letra chica: quien desconfíe de las cuentas de los gigantes tecnológicos siempre puede crear una cuenta independiente.' },
      ],
    },
    {
      id: 'confianza-cero',
      kicker: 'Identidad en la puerta',
      title: 'Por dentro, los módulos también se piden credenciales',
      visual: { scene: 'infra-zerotrust' },
      describe: '<p>Hoy, Ordering llama a Scheduling dentro del mismo monolito, y la llamada ya lleva el token y los claims de quien llama, que Scheduling revisa. El día que Scheduling se va como servicio propio, la misma llamada cruza la red con las mismas credenciales: no queda seguridad por agregar.</p>',
      blocks: [
        { t: 'p', html: 'Por dentro, confianza cero: los módulos también exigen autorización entre sí, con control de acceso por atributos (ABAC) desde el día uno, como si ya fueran servicios separados.' },
        { t: 'p', html: 'Alterná entre <strong>hoy</strong> y <strong>el día que se separa</strong>: cuando un módulo se muda, su seguridad ya está hecha.' },
        { t: 'decision', id: 'edge-auth' },
      ],
    },

    /* ── qué corre dónde ── */
    {
      id: 'mapa',
      kicker: 'Qué corre dónde',
      title: 'El mapa de máquinas',
      visual: { scene: 'infra-services' },
      evidence: { src: '/img/services.png', alt: 'Esquema original de servicios y hardware virtual: servidores, colas, streaming y SaaS por subred', caption: 'La topología completa del equipo: plantillas de servidor por subred, colas, streaming de logs, almacenamiento y sistemas externos.' },
      describe: '<p>Subred pública 1, en un grupo de auto scaling: los servidores Meals, con el subsistema de catálogo, y los servidores Ordering, con el procesamiento de órdenes. Subred privada 2: los servidores Purchase, con la pasarela de compra, y el event store. Amazon MQ conecta a los módulos. Kafka managed streams alimenta las notificaciones de SNS, el monitoreo de DataDog y los reportes de Tableau. S3 y DynamoDB guardan imágenes, backups y los datos del event store. A los sistemas externos se llega por HTTPS. Las subredes 3 y 4 son copias de la 1 y la 2.</p>',
      blocks: [
        { t: 'p', html: `El cuadro completo ${doc('infra-services')}: cada servidor es una <strong>plantilla t3.medium</strong>, y las etiquetas “1..N” son la promesa de escala.` },
        { t: 'p', html: 'Los módulos se hablan por una cola administrada, como si el monolito ya estuviera partido. Todo lo que sale de los módulos (notificaciones, métricas, reportes) viaja por un stream administrado. Tocá cada zona.' },
      ],
    },
    {
      id: 'rio',
      kicker: 'Qué corre dónde',
      title: 'Nada de espagueti con albóndigas',
      visual: { scene: 'infra-stream' },
      evidence: { src: '/img/FF_LogBasedStream.PNG', alt: 'Diagrama original de propagación de información vía stream basado en log', caption: 'La propagación por log: los productores escriben una vez; notificaciones, reportes y cualquier consumidor futuro leen a su ritmo.' },
      describe: '<p>Con llamadas directas, cada servicio le habla a cada otro, y un servicio caído deja esperando a los que lo llaman. Con un stream basado en log, los productores agregan cada cambio al log una sola vez, y cada consumidor lee a su ritmo. Si un consumidor se cae, los productores siguen escribiendo, y se pone al día cuando vuelve.</p>',
      blocks: [
        { t: 'p', html: `El equipo nombró el anti-patrón que quería evitar ${doc('system-approach')}: el <em>“espagueti con albóndigas”</em>, cada servicio gritándole a cada otro. Su inspiración: los escritos de Martin Kleppmann sobre logs como infraestructura de datos.` },
        { t: 'p', html: 'Los cambios viajan por un <strong>stream basado en log</strong>, y cada consumidor lee a su ritmo, sin depender de que el otro esté vivo. El beneficio secundario es económico: consumidores con requisitos relajados pueden correr en máquinas más baratas.' },
      ],
    },
    {
      id: 'codigo',
      kicker: 'Qué corre dónde',
      title: 'La red se escribe, no se clickea',
      visual: { scene: 'infra-iac' },
      describe: '<ol><li>La infraestructura se escribe como una especificación declarativa: el estado deseado, no los pasos.</li><li>Las pruebas de arquitectura corren contra la especificación antes de desplegar nada.</li><li>Ejecutar la especificación crea exactamente lo que se probó, y los entornos derivados salen de transformaciones estándar.</li><li>Si alguien cambia algo a mano, como agregar una IP pública, la detección de drift levanta una alerta.</li></ol>',
      blocks: [
        { t: 'p', html: `La infraestructura no se arma clickeando: se define como <strong>código declarativo</strong>, CloudFormation en el ${doc('adr-016', 'ADR 016')}, sin cerrar la puerta a Terraform.` },
        { t: 'p', html: 'Además de la reproducibilidad (subredes que nacen como copias exactas), permite correr <strong>pruebas de arquitectura contra la especificación</strong> antes de desplegar nada, y detectar <em>drift</em> cuando alguien cambia algo a mano.' },
      ],
    },

    /* ── si el negocio crece ── */
    {
      id: 'crecer',
      kicker: 'Si el negocio crece',
      title: '¿Una máquina más grande, o más máquinas?',
      visual: { scene: 'infra-scale', state: 'options' },
      describe: '<p>Dos maneras de absorber más carga. Escala vertical: el mismo servidor, en hardware virtual más grande. Escala horizontal: varias instancias del servidor detrás de un balanceador.</p>',
      blocks: [
        { t: 'p', html: `Todo sistema crece. La pregunta que responde la estrategia de escala del equipo ${doc('infra-scaling')} es cuándo pagar ese crecimiento.` },
        {
          t: 'predict',
          question: 'La carga empieza a crecer. ¿Qué harías primero?',
          options: [
            { label: 'Sumar instancias detrás del balanceador desde el día uno', feedback: 'Es adonde puede llegar el sistema, pero pagar un cluster antes de que exista la carga compra una complejidad que nadie necesita todavía.' },
            { label: 'Mudar todo a Kubernetes', feedback: 'El ADR 014 lo descartó a propósito: aprender y operar la plataforma era demasiado esfuerzo para este tamaño.' },
            { label: 'Agrandar la máquina hasta que la telemetría marque el techo', correct: true, feedback: '<strong>Esa es la estrategia del equipo.</strong> Primero vertical; horizontal recién cuando los números digan que la vertical ya no da.' },
            { label: 'Partir cada módulo en su propio servicio', feedback: 'Es justo la optimización prematura que el monolito modular eligió evitar.' },
          ],
        },
      ],
    },
    {
      id: 'umbral',
      kicker: 'Si el negocio crece',
      title: 'Primero vertical, con un umbral escrito',
      visual: { scene: 'infra-scale', state: 'policy' },
      describe: '<ol><li>El sistema arranca en una máquina chica.</li><li>Cuando la carga crece, se agranda la máquina.</li><li>Cuando la CPU pasa el 75% o la memoria el 85% en el tamaño máximo, la telemetría muestra que la vertical tocó techo.</li><li>Recién entonces se multiplican instancias detrás del balanceador.</li></ol>',
      blocks: [
        { t: 'p', html: `Primero una máquina más grande; más instancias solo cuando la ${c('telemetry', 'telemetría')}, obligatoria por el principio número tres, muestre el techo. Los umbrales iniciales son concretos: <strong>CPU arriba del 75% o memoria arriba del 85%</strong>.` },
        { t: 'decision', id: 'scale-up' },
        { t: 'callout', tone: 'warn', title: 'La trampa inversa', html: 'La nube deja escalar vertical <em>durante mucho tiempo</em>, y eso puede <strong>postergar indefinidamente</strong> la escala horizontal. El antídoto: evaluar el camino crítico del negocio directamente en producción.' },
      ],
    },
    {
      id: 'extraer',
      kicker: 'Si el negocio crece',
      title: 'El módulo con más presión se muda',
      visual: { scene: 'infra-extract' },
      evidence: { src: '/img/menu-catalog-extraction.png', alt: 'Diagrama original: el Menu Catalog como servicio con balanceador y réplicas propias', caption: 'El caso de extracción trabajado: el Menu Catalog como servicio, con balanceador propio y N réplicas de filtrado más caché.' },
      describe: '<p>El servicio Menu Catalog conserva su capa anticorrupción (Meals Offer, Loyalty, Menu Catalog API), su dominio y sus consumidores. Debajo del dominio, un balanceador reparte ahora las consultas entre N réplicas idénticas, cada una con filtrado y su propia caché. La frontera, la aduana y los comandos y eventos no cambiaron.</p>',
      blocks: [
        { t: 'p', html: 'Al momento del corte, el módulo con más presión se extrae del monolito, exactamente como se diseñó en el capítulo 4. El equipo trabajó el caso con el Menu Catalog del capítulo 5.' },
        { t: 'p', html: 'Fijate qué se escaló: la parte que sirve consultas (filtrado más caché), no el dominio. Bajo carga, el cuello de botella es servir lecturas, no aplicar reglas. Un grupo afuera, cero cirugía en el resto.' },
      ],
    },
    {
      id: 'telemetria',
      kicker: 'Si el negocio crece',
      title: 'Un cliente fantasma recorre el camino crítico',
      visual: { scene: 'infra-health' },
      describe: '<ol><li>Los endpoints de salud del monolito reportan tres niveles: si cada módulo está listo para operar, métricas del negocio y métricas técnicas.</li><li>Un cliente sintético recorre el camino crítico cada tantos minutos: elegir comida, pagar, retirar.</li><li>Las máquinas pueden verse sanas con la lógica de negocio clavada; el cliente sintético se entera.</li><li>Esos números son además la señal de cuándo partir el monolito.</li></ol>',
      blocks: [
        { t: 'p', html: 'Los endpoints de salud exponen tres niveles: si cada módulo está <strong>listo para operar</strong>, métricas del <strong>negocio</strong> (cómo se procesan los pedidos) y <strong>técnicas</strong> (tasa de requests, tasa de fallos).' },
        { t: 'p', html: 'Encima, <strong>escenarios sintéticos</strong>, elegidos en un taller de atributos de calidad: un cliente dummy recorre el camino crítico cada tantos minutos y mide si el resultado es correcto y cuánto tarda. Una máquina puede estar “sana” con el negocio clavado.' },
      ],
    },

    /* ── riesgos ── */
    {
      id: 'riesgos',
      kicker: 'Los riesgos',
      title: 'Cada riesgo con su mitigación al lado',
      visual: { scene: 'infra-risks' },
      describe: '<ul><li>Cae la pasarela de pagos: guardar las órdenes y reintentar por un período definido; mientras tanto, confianza en conocidos y suscriptores.</li><li>Review bombing: solo opina quien tiene un cobro confirmado.</li><li>Falla el canal de notificación: canal de respaldo, o ninguno si la comida ya llegó.</li><li>Reserva sin retiro: la reserva se prepaga.</li><li>La heladera se llena: sin mitigación técnica, decisión del negocio.</li><li>Pedido fuera del horario de cocina: punto abierto para el dueño.</li><li>Cae la cocina fantasma: seguir con la información interna, con protocolo de compensación.</li><li>Un cambio rompe el formato de mensajes: versionado de API y avisos de sunset.</li><li>Escalar dispara la factura: tope de instancias y confirmación humana.</li><li>Un release rompe algo: hot-swap al release anterior.</li></ul>',
      blocks: [
        { t: 'p', html: `El análisis termina con una lista de riesgos donde cada uno tiene su mitigación escrita al lado ${doc('risks')}.` },
        { t: 'p', html: 'No todos son técnicos: algunos son decisiones de negocio que el equipo dejó explícitamente para el dueño. Cuando la heladera se llena físicamente, los autores fueron tajantes: no hay mitigación técnica. Tocá cada riesgo.' },
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
              q: '¿Dónde valida el equipo quién es el visitante?',
              options: [
                'En cada módulo, cada vez que recibe una petición',
                'En la app del teléfono, antes de enviar la petición',
                'En el balanceador de entrada, contra Cognito',
                'En la base de datos, cuando por fin se leen los datos',
              ],
              answer: 2,
              why: 'El listener valida el token contra Cognito y reenvía la petición con cabeceras de identidad: los servidores nunca ven una contraseña.',
            },
            {
              q: '¿Por qué los módulos del monolito igual se piden autorización entre sí?',
              options: [
                'Para que el día que un módulo se extraiga, su seguridad ya esté hecha',
                'Porque Cognito rechaza cualquier llamada interna que no traiga token',
                'Porque cada módulo corre en su propia máquina desde el día uno',
                'Porque validar credenciales hace más rápidas las llamadas internas',
              ],
              answer: 0,
              why: 'ADR 006: las llamadas llevan autenticación y claims desde el principio, así un módulo puede volverse servicio sin sumar seguridad después.',
            },
            {
              q: 'La carga sigue creciendo. ¿Qué viene primero en la estrategia del equipo?',
              options: [
                'Más instancias detrás del balanceador, ya mismo',
                'Mudar el sistema entero a Kubernetes',
                'Extraer cada módulo como microservicio',
                'Una máquina más grande, hasta tocar el techo',
              ],
              answer: 3,
              why: 'Primero vertical. Los umbrales de CPU arriba del 75% o memoria arriba del 85% marcan cuándo la vertical ya no da.',
            },
            {
              q: '¿Qué clonó detrás de un balanceador la extracción del Menu Catalog?',
              options: [
                'El dominio, para aplicar las reglas N veces en paralelo',
                'La parte que sirve consultas: el filtrado con su caché',
                'La capa anticorrupción y sus tres adaptadores',
                'El monolito entero, duplicado en la segunda zona',
              ],
              answer: 1,
              why: 'Bajo carga, el cuello de botella es servir lecturas, no aplicar reglas. La frontera y la aduana quedaron iguales.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Repasá lo esencial antes de seguir.' },
        { t: 'p', html: 'Las máquinas están elegidas, hasta la plantilla de servidor. Queda la pregunta que hace todo dueño: <strong>¿cuánto cuesta todo esto por año?</strong> El próximo capítulo suma la factura, línea por línea.' },
      ],
    },
  ],
};
