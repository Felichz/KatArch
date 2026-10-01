import { useState, type ComponentType, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Cloud, Network, Router, Globe, Lock, Ban, UserRound, ShieldCheck, KeyRound, Inbox, CalendarClock, BookOpen,
  MessageSquare, Server, Database, Send, Bell, Activity, ChartBar, Banknote, FileCode, Check, TriangleAlert,
  Utensils, CreditCard, Package, Split, Refrigerator, ChefHat, Gauge, RotateCcw, Clock, Users,
} from 'lucide-react';
import { Canvas, Edge, Frame, Label, Legend, Node, Packet, Stepper, EASE, type SceneProps } from './kit';
import { usePhases } from './usePhases';
import { defineStrings } from '../i18n/ui';
import { useT } from '../i18n/react';

/* ───────────────────────── strings ───────────────────────── */
const S = defineStrings({
  es: {
    vpc: {
      titleLayers: 'La red del equipo, de afuera hacia adentro',
      titleTraffic: 'Por dónde entra el tráfico, y por dónde no',
      canvas: 'Topología de red en AWS: región us-east, VPC 10.0.0.0/16, dos zonas de disponibilidad con una subred pública y una privada cada una, y las puertas: gateway de internet, balanceador y router',
      region: 'AWS · región us-east',
      zone: (k: string) => `zona us-east-1${k}`,
      pub: (cidr: string) => `pública · ${cidr}`,
      priv: (cidr: string) => `privada · ${cidr}`,
      alb: 'Balanceador',
      routerSub: 'entre subredes',
      pubRoute: 'ruta 0.0.0.0/0 → igw-1',
      privRoute: 'solo 10.0.0.0/16 · local',
      copy: 'copia de la zona a',
      blocked: 'sin ruta hacia las subredes privadas',
      legendReq: 'Petición',
      legendBlocked: 'Sin ruta',
      caps: [
        '<strong>AWS, región us-east</strong>: la más cercana a Detroit. Elegir bien la región baja la latencia.',
        '<strong>La VPC, 10.0.0.0/16</strong>: el recinto privado. Todo lo de adentro toma direcciones de su propio rango.',
        '<strong>Dos zonas de disponibilidad</strong>, us-east-1a y 1b: edificios de datacenter físicamente separados.',
        'En cada zona, <strong>una subred pública y una privada</strong>, cada una con su porción del rango.',
        'Y las <strong>puertas</strong>: igw-1, la única salida a internet; el balanceador, el recepcionista; y el router entre subredes.',
      ],
    },
    auth: {
      titleNaive: 'Sin puerta: cada servidor verifica',
      titleFlow: 'La identidad se valida en el borde de la red',
      canvas: 'Un usuario, el balanceador con su listener HTTPS, Cognito, un proveedor federado y el grupo de auto scaling con N instancias',
      user: 'Usuario',
      userSub: 'conocido o suscriptor',
      listener: 'balanceador · listener https',
      check: 'Verificar',
      checkSub: 'con Cognito',
      fwd: 'Reenviar',
      fwdSub: 'según ruta',
      fedSub: 'acceso federado',
      hdr1: 'cabeceras',
      hdr2: 'de identidad',
      naive: 'n copias del mismo control',
      req: 'petición',
      redirect: 'redirigir',
      login: 'ingresar',
      legendReq: 'Petición',
      legendExt: 'Identidad externa',
      caps: [
        '<strong>1 ·</strong> El usuario pide algo sin sesión. El listener HTTPS del balanceador no lo deja pasar.',
        '<strong>2 ·</strong> El balanceador lo redirige al proveedor de identidad: Cognito.',
        '<strong>3 ·</strong> El usuario se autentica contra el pool de Cognito, directo o con un proveedor federado como Google o Facebook.',
        '<strong>4 ·</strong> Vuelve al balanceador con una sesión autenticada.',
        '<strong>5 ·</strong> El listener valida el token contra Cognito y reenvía la petición, con cabeceras de identidad, al grupo de auto scaling.',
      ],
    },
    fed: {
      pool: 'Pool de usuarios de Cognito',
      poolSub: 'ingreso con usuario o email verificado; teléfono y email como atributos',
      k1: 'Puerta 1 · Federada',
      t1: 'Google, Facebook o empresarial',
      q1: '“Genera confianza inmediata en una porción grande de usuarios potenciales.”',
      n1: 'La nota del equipo sobre la federación',
      k2: 'Puerta 2 · Independiente',
      t2: 'Una cuenta propia',
      x2: 'Para quien confía menos en el sitio que en un gigante tecnológico, o quiere una contraseña distinta para cada servicio.',
      foot: 'El cliente ocasional que paga en efectivo nunca inicia sesión en la nube: pasa por la caja.',
    },
    zt: {
      title: 'Confianza cero entre módulos',
      canvas: 'Ordering llama a Scheduling con token y claims; Scheduling los revisa contra el servicio de identidad. El día que Scheduling se separa, la llamada cruza la red con las mismas credenciales',
      monolith: 'monolito · un solo proceso',
      own: 'servicio propio',
      caller: 'envía token y claims',
      callee: 'revisa los claims',
      idp: 'Servicio de identidad',
      claims: 'claims',
      abac: 'token + atributos (abac)',
      network: 'red',
      other: 'otro módulo',
      footToday: 'Dentro de un solo proceso, la llamada ya lleva credenciales: trabajo extra que hoy parece de más.',
      footSplit: 'El módulo se mudó; la llamada y sus credenciales no cambiaron.',
      today: 'Hoy',
      split: 'El día que se separa',
      moment: 'Momento',
      legendModule: 'Módulo',
      legendCall: 'Llamada con credenciales',
    },
    svc: {
      title: 'Qué corre en cada subred',
      canvas: 'Mapa de servicios: subred pública con servidores Meals y Ordering, subred privada con Purchase y el event store, Amazon MQ, Kafka hacia SNS, DataDog y Tableau, S3 y DynamoDB, y sistemas externos por HTTPS',
      stream: 'streaming · saas',
      band: 'Kafka managed streams',
      snsSub: 'notificaciones',
      ddSub: 'monitoreo · SaaS',
      tabSub: 'reportes · SaaS',
      pub: 'subred pública 1 · auto scaling',
      priv: 'subred privada 2',
      data: 'almacenamiento',
      ext: 'sistemas externos',
      mealsSub: 'subsistema de catálogo',
      ordSub: 'procesamiento de órdenes',
      purSub: 'pasarela de compra',
      esSub: 'solo red privada',
      mqSub: 'entre módulos',
      s3Sub: 'imágenes y backups',
      dynSub: 'la base del event store',
      exts: ['Apps front-end', 'Punto de venta', 'Sistemas de pago', 'Gestión de heladeras', 'Cocina fantasma', 'Proveedor de mapas'],
      hint: 'Tocá cada zona. Cada servidor es una plantilla t3.medium; las subredes 3 y 4, en la zona b, son copias de la 1 y la 2.',
      legendModule: 'Servidor con módulos',
      legendExt: 'Servicio alquilado o externo',
      zones: {
        public: { t: 'Subred pública 1', qa: 'grupo de auto scaling', x: 'Los servidores Meals alojan todo el subsistema de catálogo (feedback, lealtad, menú, retiro, proyecciones); los Ordering, órdenes y scheduling. La subred 3 es su copia.' },
        private: { t: 'Subred privada 2', qa: 'sin acceso desde afuera', x: 'Los servidores Purchase con la pasarela de compra, y el event store, que no es accesible desde fuera de la VPC y escala por separado. La subred 4 es su copia.' },
        mq: { t: 'Amazon MQ', qa: 'RabbitMQ administrado', x: 'Los módulos se hablan por la cola como si no fueran parte de un mismo monolito.' },
        stream: { t: 'Kafka managed streams', qa: 'lo que sale de los módulos', x: 'Pedidos de notificación a SNS (SMS, email, push), métricas a DataDog, datos a Tableau. DataDog y Tableau son SaaS, fuera de AWS.' },
        data: { t: 'S3 y DynamoDB', qa: 'almacenamiento administrado', x: 'S3 guarda imágenes, backups del event store y del servicio de reportes; DynamoDB es la base del event store.' },
        ext: { t: 'Sistemas externos', qa: 'HTTPS', x: 'Apps, punto de venta, pagos, gestión de heladeras, cocinas fantasma y el proveedor de mapas, siempre por canales seguros.' },
      },
    },
    st: {
      title: 'Cómo viajan los cambios',
      canvasSpag: 'Seis servicios conectados todos con todos por llamadas directas; Reporting está caído y los que lo llaman esperan',
      canvasLog: 'Tres productores escriben en un stream basado en log; tres consumidores leen a su ritmo',
      spaghetti: 'Llamadas directas',
      log: 'Stream basado en log',
      view: 'Vista',
      svcs: ['Ordering', 'Scheduling', 'Menu Catalog', 'Notificaciones', 'Reportes', 'Payment Tracker'],
      down: 'caído',
      reader: 'lector del log',
      upToDate: 'al día',
      catching: 'poniéndose al día',
      future: 'Consumidor futuro',
      futureSub: 'nadie lo toca',
      band: 'stream basado en log',
      write: 'escriben una vez',
      read: 'cada uno lee a su ritmo',
      footSpag: 'Cada servicio le grita a cada otro: si uno se cae, los que lo llaman se quedan esperando.',
      footLog: [
        'Los productores escriben una vez; cada consumidor lee a su ritmo.',
        'Reportes se cayó. Los productores siguen escribiendo y los demás siguen leyendo.',
        'Reportes se cayó. Los productores siguen escribiendo y los demás siguen leyendo.',
        'Reportes volvió y se pone al día desde donde había quedado.',
      ],
      legendWrite: 'Cambio publicado',
      legendModule: 'Servicio',
      legendDown: 'Caído',
    },
    iac: {
      title: 'Infraestructura como código',
      spec: 'Especificación',
      specTag: 'declarativa · ilustrativa',
      specLines: [
        ['vpc', '10.0.0.0/16'],
        ['subnet-1', 'pública · 10.0.1.0/24'],
        ['subnet-2', 'privada · 10.0.2.0/24'],
        ['subnet-3', 'copia de subnet-1'],
        ['subnet-4', 'copia de subnet-2'],
        ['servidores', 't3.medium'],
      ],
      checks: 'Pruebas de arquitectura',
      checksTag: 'de ejemplo · sobre la especificación',
      checkList: ['Las subredes privadas no tienen ruta a igw-1', 'Ninguna IP pública en una subred privada', 'subnet-3 coincide con subnet-1'],
      run: 'Lo que corre',
      runTag: 'igual a la especificación',
      envs: ['desarrollo', 'test', 'producción'],
      derived: 'entornos derivados con transformaciones estándar',
      drift: 'Alguien agrega una IP pública a mano',
      driftAlert: 'Drift detectado: lo que corre ya no es lo que dice el código',
      caps: [
        'La infraestructura se escribe como el <strong>estado deseado</strong>, no como una lista de pasos. Las subredes 3 y 4 nacen como copias exactas.',
        'Las <strong>pruebas de arquitectura</strong> corren contra la especificación: muchos escenarios probados sin encender un solo servidor.',
        'Ejecutar la especificación despliega exactamente lo que se probó. Los entornos derivados salen de transformaciones estándar.',
        'Alguien agrega una IP pública a mano. Lo que corre ya no coincide con el código: <strong>drift</strong>, y salta una alerta.',
      ],
    },
    sc: {
      titleOptions: 'Dos maneras de crecer',
      titlePolicy: 'La política del equipo',
      canvasOptions: 'A la izquierda, un solo servidor que se agranda; a la derecha, varias instancias detrás de un balanceador',
      canvasPolicy: 'Un servidor que se agranda hasta que la CPU pasa el 75%, y recién entonces se multiplica detrás de un balanceador',
      up: 'escala vertical',
      out: 'escala horizontal',
      oneServer: '1 servidor',
      upCap: 'El mismo servidor, en hardware virtual más grande',
      outCap: 'Más instancias detrás de un balanceador',
      lb: 'Balanceador',
      inst: (k: string) => `Instancia ${k}`,
      sizes: ['chica', 'más grande', 'tamaño máximo'],
      ceiling: 'techo',
      cpu: 'cpu',
      mem: 'memoria',
      thresholds: 'Umbrales iniciales del equipo: CPU > 75% o memoria > 85%',
      caps: [
        'Arrancar con lo mínimo: <strong>una máquina chica</strong>. La telemetría está encendida desde el día uno.',
        'La carga crece: <strong>una máquina más grande</strong>. La arquitectura no cambia.',
        'En el tamaño máximo, la CPU pasa el <strong>75%</strong> (o la memoria el <strong>85%</strong>): la telemetría muestra que la vertical tocó techo.',
        'Recién ahora: <strong>más instancias detrás del balanceador</strong>. El grupo de auto scaling las suma con esas mismas métricas.',
      ],
    },
    ex: {
      title: 'Extracción del Menu Catalog',
      canvas: 'El servicio Menu Catalog con su capa anticorrupción, su dominio y sus consumidores; debajo, un balanceador reparte consultas entre N réplicas de filtrado con caché',
      service: 'menu catalog · servicio',
      acl: 'capa anticorrupción',
      providers: ['Ghost Kitchen', 'Gestión de lealtad', 'Front end · punto de venta'],
      aclNodes: ['Meals Offer', 'Loyalty', 'Menu Catalog API'],
      domain: 'dominio',
      consumers: ['Carrito', 'Recomendaciones', 'Reseñas', 'Filtrado'],
      cache: 'Caché',
      lb: 'Balanceador',
      cmdEvt: 'comandos y eventos',
      toOrdering: 'a ordering',
      legendDomain: 'Dominio',
      legendCmp: 'Componente',
      legendExt: 'Sistema externo',
      caps: [
        'El Menu Catalog como lo dejó el capítulo 5: aduana a la izquierda, dominio en el medio, consumidores a la derecha. <strong>Filtrado</strong> es uno de ellos.',
        'Bajo carga, la parte que sirve consultas sale del dominio y se <strong>clona</strong>: N réplicas de filtrado, cada una con su caché, detrás de un balanceador.',
        'Todo lo de arriba quedó idéntico: <strong>misma frontera, misma aduana, mismos comandos y eventos</strong>. La extracción no reescribió nada.',
      ],
    },
    hl: {
      title: 'Saber cuándo',
      endpoint: 'Endpoint de salud',
      endpointTag: 'tres niveles',
      ready: 'Listo para operar',
      business: 'Negocio',
      businessX: 'cómo se procesan los pedidos',
      technical: 'Técnico',
      technicalX: 'tasa de requests · tasa de fallos',
      mods: ['Catálogo', 'Órdenes', 'Scheduling', 'Compra'],
      healthy: 'máquinas sanas',
      synthetic: 'Cliente sintético',
      syntheticTag: 'cada tantos minutos',
      path: ['Elegir comida', 'Pagar', 'Retirar'],
      ok: 'Resultado correcto, a tiempo',
      stuck: 'Se clavó: la lógica de negocio no responde',
      waiting: 'Esperando la próxima vuelta',
      banner: 'Esos números son la señal que decide cuándo partir el monolito.',
      caps: [
        'Los endpoints de salud responden tres preguntas: ¿cada módulo está <strong>listo</strong>? ¿Cómo va el <strong>negocio</strong>? ¿Y lo <strong>técnico</strong>?',
        'Cada tantos minutos, un <strong>cliente sintético</strong> recorre el camino crítico: elegir comida, pagar, retirar. Revisa el resultado y el tiempo.',
        'Las máquinas se ven sanas, pero el cliente sintético se clava: <strong>la lógica de negocio está caída</strong> y salta la alarma.',
        'Y los mismos números cumplen otra función: muestran <strong>cuándo</strong> un módulo se ganó su propio servicio.',
      ],
    },
    rk: {
      hint: 'Tocá un riesgo para ver su mitigación. Íconos ámbar: decisiones para el dueño.',
      mitigation: 'Mitigación',
      owner: 'Para el dueño',
      ownerTag: 'decisión de negocio',
      items: [
        { t: 'Cae la pasarela de pagos', m: 'Las órdenes se guardan y se reintenta por un período definido. Mientras tanto, política de confianza para conocidos y suscriptores: ya sabemos quiénes son.' },
        { t: 'Review bombing contra cocinas', m: 'Solo puede opinar quien tiene un cobro confirmado. La reputación también se diseña.' },
        { t: 'Falla el canal de notificación', m: 'Canal de respaldo. Y si la comida ya llegó a la heladera, a veces la mejor notificación es ninguna.' },
        { t: 'Reserva y no retira', m: 'La reserva se prepaga: el costo del olvido lo asume quien se olvida, no la cocina que ya cocinó.' },
        { t: 'La heladera se llena', m: 'Suscriptores y conocidos juntos pueden pedir más comida de la que entra. No hay mitigación técnica: “decisión pendiente del negocio”.' },
        { t: 'Pedido fuera de horario', m: 'Las cocinas no operan 24/7. Queda como punto abierto para el dueño.' },
        { t: 'Se cae la cocina fantasma', m: 'Se sigue operando con la información interna del sistema de órdenes; si un despacho falla, protocolo de compensación.' },
        { t: 'Un cambio rompe los mensajes', m: 'Versionado de API y compatibilidad hacia atrás negociada, con avisos de fin de vida (“sunset”) para los consumidores.' },
        { t: 'Escalar dispara la factura', m: 'Tope máximo de instancias por servicio; por encima del umbral, confirmación humana antes de encender nada.' },
        { t: 'Un release rompe algo', m: 'Hot-swap al release anterior, como requisito de plataforma, no como esperanza.' },
      ],
    },
  },
  en: {
    vpc: {
      titleLayers: 'The team’s network, from the outside in',
      titleTraffic: 'Where traffic gets in, and where it doesn’t',
      canvas: 'AWS network topology: region us-east, VPC 10.0.0.0/16, two availability zones with one public and one private subnet each, and the gates: internet gateway, load balancer and router',
      region: 'AWS · region us-east',
      zone: (k: string) => `zone us-east-1${k}`,
      pub: (cidr: string) => `public · ${cidr}`,
      priv: (cidr: string) => `private · ${cidr}`,
      alb: 'Load balancer',
      routerSub: 'between subnets',
      pubRoute: 'route 0.0.0.0/0 → igw-1',
      privRoute: 'only 10.0.0.0/16 · local',
      copy: 'copy of zone a',
      blocked: 'no route to the private subnets',
      legendReq: 'Request',
      legendBlocked: 'No route',
      caps: [
        '<strong>AWS, region us-east</strong>: the one closest to Detroit. Choosing the region well lowers latency.',
        '<strong>The VPC, 10.0.0.0/16</strong>: the private enclosure. Everything inside gets addresses from its own range.',
        '<strong>Two availability zones</strong>, us-east-1a and 1b: physically separate datacenter buildings.',
        'In each zone, <strong>a public subnet and a private one</strong>, each with its own slice of the range.',
        'And the <strong>gates</strong>: igw-1, the only way out to the internet; the load balancer, the receptionist; and the router between subnets.',
      ],
    },
    auth: {
      titleNaive: 'No gate: every server checks',
      titleFlow: 'Identity checked at the network edge',
      canvas: 'A user, the load balancer with its HTTPS listener, Cognito, a federated provider and the auto scaling group with N instances',
      user: 'User',
      userSub: 'known or subscriber',
      listener: 'load balancer · https listener',
      check: 'Check',
      checkSub: 'vs Cognito',
      fwd: 'Forward',
      fwdSub: 'by path',
      fedSub: 'federated access',
      hdr1: 'identity',
      hdr2: 'headers',
      naive: 'n copies of the same check',
      req: 'request',
      redirect: 'redirect',
      login: 'log in',
      legendReq: 'Request',
      legendExt: 'External identity',
      caps: [
        '<strong>1 ·</strong> The user asks for something without a session. The load balancer’s HTTPS listener doesn’t let it through.',
        '<strong>2 ·</strong> The load balancer redirects them to the identity provider: Cognito.',
        '<strong>3 ·</strong> The user authenticates against the Cognito user pool, directly or through a federated provider like Google or Facebook.',
        '<strong>4 ·</strong> They come back to the load balancer with an authenticated session.',
        '<strong>5 ·</strong> The listener checks the token against Cognito and forwards the request, with identity headers, to the auto scaling group.',
      ],
    },
    fed: {
      pool: 'Cognito user pool',
      poolSub: 'sign-in with username or verified email; phone and email kept as attributes',
      k1: 'Door 1 · Federated',
      t1: 'Google, Facebook or enterprise',
      q1: '“Will immediately generate trust in your system with a large portion of potential users.”',
      n1: 'The team’s note on federation',
      k2: 'Door 2 · Independent',
      t2: 'An account of its own',
      x2: 'For anyone who trusts the site less than a tech giant, or wants a different password for each service.',
      foot: 'The occasional customer who pays cash never signs in to the cloud: they go through the cashier.',
    },
    zt: {
      title: 'Zero trust between modules',
      canvas: 'Ordering calls Scheduling with a token and claims; Scheduling checks them against the identity service. The day Scheduling splits off, the call crosses the network with the same credentials',
      monolith: 'monolith · one process',
      own: 'its own service',
      caller: 'sends token and claims',
      callee: 'checks the claims',
      idp: 'Identity service',
      claims: 'claims',
      abac: 'token + attributes (abac)',
      network: 'network',
      other: 'another module',
      footToday: 'Inside one process, the call already carries credentials: extra work that looks redundant today.',
      footSplit: 'The module moved out; the call and its credentials did not change.',
      today: 'Today',
      split: 'The day it splits',
      moment: 'Moment',
      legendModule: 'Module',
      legendCall: 'Call with credentials',
    },
    svc: {
      title: 'What runs in each subnet',
      canvas: 'Services map: public subnet with Meals and Ordering servers, private subnet with Purchase and the event store, Amazon MQ, Kafka feeding SNS, DataDog and Tableau, S3 and DynamoDB, and external systems over HTTPS',
      stream: 'streaming · saas',
      band: 'Kafka managed streams',
      snsSub: 'notifications',
      ddSub: 'monitoring · SaaS',
      tabSub: 'reporting · SaaS',
      pub: 'public subnet-1 · auto scaling',
      priv: 'private subnet-2',
      data: 'storage',
      ext: 'external systems',
      mealsSub: 'meal catalog subsystem',
      ordSub: 'order processing subsystem',
      purSub: 'purchase gateway',
      esSub: 'private network only',
      mqSub: 'between modules',
      s3Sub: 'images and backups',
      dynSub: 'the event store’s database',
      exts: ['Front-end apps', 'Point of Sale', 'Payment systems', 'Fridge management', 'Ghost kitchen', 'Map provider'],
      hint: 'Tap each zone. Every server is a t3.medium template; subnets 3 and 4, in zone b, are copies of 1 and 2.',
      legendModule: 'Server with modules',
      legendExt: 'Rented or external service',
      zones: {
        public: { t: 'Public subnet 1', qa: 'auto scaling group', x: 'Meals servers host the whole meal catalog subsystem (feedback, loyalty, menu catalog, meal pickup, projections); Ordering servers host ordering and scheduling. Subnet 3 is its copy.' },
        private: { t: 'Private subnet 2', qa: 'no access from outside', x: 'Purchase servers with the purchase gateway, and the event store, which is not reachable from outside the VPC and scales separately. Subnet 4 is its copy.' },
        mq: { t: 'Amazon MQ', qa: 'managed RabbitMQ', x: 'Modules talk through the queue as if they were not part of a single monolith.' },
        stream: { t: 'Kafka managed streams', qa: 'what leaves the modules', x: 'Notification requests to SNS (SMS, email, push), metrics to DataDog, data to Tableau. DataDog and Tableau are SaaS, outside AWS.' },
        data: { t: 'S3 and DynamoDB', qa: 'managed storage', x: 'S3 keeps images, event store backups and reporting backups; DynamoDB is the event store’s database.' },
        ext: { t: 'External systems', qa: 'HTTPS', x: 'Front-end apps, point of sale, payments, fridge management, ghost kitchens and the map provider, always over secured channels.' },
      },
    },
    st: {
      title: 'How changes travel',
      canvasSpag: 'Six services all connected to each other by direct calls; Reporting is down and its callers wait',
      canvasLog: 'Three producers write to a log-based stream; three consumers read at their own pace',
      spaghetti: 'Direct calls',
      log: 'Log-based stream',
      view: 'View',
      svcs: ['Ordering', 'Scheduling', 'Menu Catalog', 'Notifications', 'Reporting', 'Payment Tracker'],
      down: 'down',
      reader: 'log reader',
      upToDate: 'up to date',
      catching: 'catching up',
      future: 'Future consumer',
      futureSub: 'touches no one',
      band: 'log-based stream',
      write: 'producers write once',
      read: 'each reads at its own pace',
      footSpag: 'Every service shouts at every other: if one goes down, its callers are left waiting.',
      footLog: [
        'Producers write once; each consumer reads at its own pace.',
        'Reporting is down. Producers keep writing and the other consumers keep reading.',
        'Reporting is down. Producers keep writing and the other consumers keep reading.',
        'Reporting is back and catches up from where it left off.',
      ],
      legendWrite: 'Published change',
      legendModule: 'Service',
      legendDown: 'Down',
    },
    iac: {
      title: 'Infrastructure as code',
      spec: 'Specification',
      specTag: 'declarative · illustrative',
      specLines: [
        ['vpc', '10.0.0.0/16'],
        ['subnet-1', 'public · 10.0.1.0/24'],
        ['subnet-2', 'private · 10.0.2.0/24'],
        ['subnet-3', 'copy of subnet-1'],
        ['subnet-4', 'copy of subnet-2'],
        ['servers', 't3.medium'],
      ],
      checks: 'Fitness functions',
      checksTag: 'examples · run on the spec',
      checkList: ['Private subnets have no route to igw-1', 'No public IP in a private subnet', 'subnet-3 matches subnet-1'],
      run: 'What runs',
      runTag: 'same as the specification',
      envs: ['development', 'test', 'production'],
      derived: 'derived environments through standard transformations',
      drift: 'Someone attaches a public IP by hand',
      driftAlert: 'Drift detected: what runs is no longer what the code says',
      caps: [
        'The infrastructure is written as the <strong>desired state</strong>, not as a list of steps. Subnets 3 and 4 are born as exact copies.',
        'Architecture <strong>fitness functions</strong> run against the specification: many scenarios tested without starting a single server.',
        'Executing the specification deploys exactly what was tested. Derived environments come from standard transformations.',
        'Someone attaches a public IP by hand. What runs no longer matches the code: <strong>drift</strong>, and an alert goes off.',
      ],
    },
    sc: {
      titleOptions: 'Two ways to grow',
      titlePolicy: 'The team’s policy',
      canvasOptions: 'On the left, a single server that grows; on the right, several instances behind a load balancer',
      canvasPolicy: 'A server that grows until CPU passes 75%, and only then multiplies behind a load balancer',
      up: 'scale up · vertical',
      out: 'scale out · horizontal',
      oneServer: '1 server',
      upCap: 'The same server, on bigger virtual hardware',
      outCap: 'More instances behind a load balancer',
      lb: 'Load balancer',
      inst: (k: string) => `Instance ${k}`,
      sizes: ['small', 'bigger', 'top size'],
      ceiling: 'ceiling',
      cpu: 'cpu',
      mem: 'memory',
      thresholds: 'The team’s initial thresholds: CPU > 75% or memory > 85%',
      caps: [
        'Start with the minimum: <strong>one small machine</strong>. Telemetry is on from day one.',
        'Load grows: <strong>a bigger machine</strong>. The architecture does not change.',
        'At the top size, CPU crosses <strong>75%</strong> (or memory <strong>85%</strong>): telemetry shows vertical has hit its ceiling.',
        'Only now: <strong>more instances behind the load balancer</strong>. The auto scaling group adds them on those same metrics.',
      ],
    },
    ex: {
      title: 'Extracting the Menu Catalog',
      canvas: 'The Menu Catalog service with its anti-corruption layer, its domain and its consumers; below, a load balancer spreads queries across N replicas of filtering with cache',
      service: 'menu catalog · service',
      acl: 'anti-corruption layer',
      providers: ['Ghost Kitchen', 'Loyalty Management', 'Front end · Point of Sale'],
      aclNodes: ['Meals Offer', 'Loyalty', 'Menu Catalog API'],
      domain: 'domain',
      consumers: ['Shopping Cart', 'Recommendations', 'Reviews', 'Filtering'],
      cache: 'Cache',
      lb: 'Load balancer',
      cmdEvt: 'commands & events',
      toOrdering: 'to ordering',
      legendDomain: 'Domain',
      legendCmp: 'Component',
      legendExt: 'External system',
      caps: [
        'The Menu Catalog as chapter 5 left it: customs layer on the left, domain in the middle, consumers on the right. <strong>Filtering</strong> is one of them.',
        'Under load, the part that serves queries leaves the domain and gets <strong>cloned</strong>: N replicas of filtering, each with its own cache, behind a load balancer.',
        'Everything above is identical: <strong>same boundary, same customs layer, same commands and events</strong>. The extraction rewrote nothing.',
      ],
    },
    hl: {
      title: 'Knowing when',
      endpoint: 'Health endpoint',
      endpointTag: 'three levels',
      ready: 'Ready to operate',
      business: 'Business',
      businessX: 'how orders are being processed',
      technical: 'Technical',
      technicalX: 'request rate · failure rate',
      mods: ['Catalog', 'Ordering', 'Scheduling', 'Purchase'],
      healthy: 'machines healthy',
      synthetic: 'Synthetic customer',
      syntheticTag: 'every few minutes',
      path: ['Pick a meal', 'Pay', 'Pick up'],
      ok: 'Correct result, on time',
      stuck: 'Stuck: the business logic does not answer',
      waiting: 'Waiting for the next run',
      banner: 'Those numbers are the signal that decides when to split the monolith.',
      caps: [
        'The health endpoints answer three questions: is each module <strong>ready</strong>? How is the <strong>business</strong> doing? And the <strong>technical</strong> side?',
        'Every few minutes, a <strong>synthetic customer</strong> walks the critical path: pick a meal, pay, pick up. It checks the result and the time.',
        'The machines look healthy, but the synthetic customer gets stuck: <strong>the business logic is down</strong> and the alarm goes off.',
        'And the same numbers do one more job: they show <strong>when</strong> a module has earned its own service.',
      ],
    },
    rk: {
      hint: 'Tap a risk to see its mitigation. Amber icons: decisions left for the owner.',
      mitigation: 'Mitigation',
      owner: 'For the owner',
      ownerTag: 'business decision',
      items: [
        { t: 'Payment gateway goes down', m: 'Orders are stored and retried for a defined period. Meanwhile, a trust policy for known users and subscribers: we already know who they are.' },
        { t: 'Review bombing of kitchens', m: 'Only someone with a confirmed charge can post a review. Reputation is designed too.' },
        { t: 'Notification channel fails', m: 'A backup channel. And if the meal already reached the fridge, sometimes the best notification is none.' },
        { t: 'Reserved, never picked up', m: 'The reservation is prepaid: the cost of forgetting falls on whoever forgot, not on the kitchen that already cooked.' },
        { t: 'The fridge fills up', m: 'Subscribers and known users together can order more food than fits inside. No technical mitigation: “need decision from the business”.' },
        { t: 'Order outside kitchen hours', m: 'Kitchens don’t run 24/7. Left open as a point for the owner.' },
        { t: 'Ghost kitchen goes down', m: 'Keep operating on the ordering system’s internal information; if a dispatch fails, a compensation protocol kicks in.' },
        { t: 'A change breaks the messages', m: 'API versioning and negotiated backward compatibility, with end-of-life (“sunset”) warnings for consumers.' },
        { t: 'Scaling spikes the bill', m: 'A maximum number of instances per service; above the threshold, a human confirms before anything is turned on.' },
        { t: 'A release breaks something', m: 'Hot-swap to the previous release, as a platform requirement, not a hope.' },
      ],
    },
  },
});

/** A zone that appears and can light up as the current layer. */
function Zone({ x, y, w, h, show = true, on = false, fill = false }: { x: number; y: number; w: number; h: number; show?: boolean; on?: boolean; fill?: boolean }) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={16}
      className={`zone ${on ? 'zone--accent c8-zone-on' : ''} ${fill ? 'c8-zone-fill' : ''}`}
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}

/* ───────────────────────── 1 · the VPC ───────────────────────── */
const SUBNETS = [
  { k: 'subnet-1', x: 626, y: 190, pub: true, cidr: '10.0.1.0/24' },
  { k: 'subnet-2', x: 850, y: 190, pub: false, cidr: '10.0.2.0/24' },
  { k: 'subnet-3', x: 626, y: 394, pub: true, cidr: '10.0.3.0/24' },
  { k: 'subnet-4', x: 850, y: 394, pub: false, cidr: '10.0.4.0/24' },
];

const HOPS: [number, number][][] = [
  [[136, 440], [243, 440]],
  [[330, 412], [330, 344]],
  [[330, 278], [330, 224]],
  [[415, 190], [529, 190]],
];

export function Vpc({ state = 'layers', reduced }: SceneProps) {
  const t = useT(S).vpc;
  const traffic = state === 'traffic';
  const s = usePhases(5, { interval: 3000, reduced, key: state, auto: !traffic });
  const p = traffic ? 4 : s.phase;
  const cur = (n: number) => !traffic && p === n;
  return (
    <Frame
      title={traffic ? t.titleTraffic : t.titleLayers}
      legend={traffic ? <Legend items={[{ tone: 'cmd', label: t.legendReq }, { tone: 'danger', label: t.legendBlocked }]} /> : undefined}
      foot={traffic ? undefined : <Stepper phase={s.phase} count={5} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}
    >
      <Canvas w={1000} h={560} label={t.canvas}>
        {(ids) => (
          <g>
            <Zone x={170} y={14} w={816} h={532} on={cur(0)} />
            <Label x={188} y={37} anchor="start" tone={cur(0) ? 'accent' : 'muted'}>{t.region}</Label>
            <Zone x={196} y={48} w={774} h={482} show={p >= 1} on={cur(1)} fill />
            <Label x={954} y={72} anchor="end" tone={cur(1) ? 'accent' : 'muted'} show={p >= 1}>VPC · 10.0.0.0/16</Label>
            <Zone x={516} y={100} w={442} h={182} show={p >= 2} on={cur(2)} />
            <Zone x={516} y={302} w={442} h={184} show={p >= 2} on={cur(2)} />
            <Label x={532} y={121} anchor="start" tone={cur(2) ? 'accent' : 'muted'} show={p >= 2}>{t.zone('a')}</Label>
            <Label x={532} y={323} anchor="start" tone={cur(2) ? 'accent' : 'muted'} show={p >= 2}>{t.zone('b')}</Label>

            {/* wiring from the gates to the subnets */}
            <Edge points={[[136, 440], [243, 440]]} show={p >= 4} marker={ids.arrow} />
            <Edge points={[[330, 412], [330, 344]]} show={p >= 4} marker={ids.arrow} />
            <Edge points={[[330, 278], [330, 224]]} show={p >= 4} marker={ids.arrow} />
            <Edge points={[[415, 190], [529, 190]]} show={p >= 4} marker={ids.arrow} />
            <Edge points={[[470, 190], [470, 394], [529, 394]]} show={p >= 4} marker={ids.arrow} />
            <Edge points={[[330, 158], [330, 80], [738, 80], [738, 190], [753, 190]]} show={p >= 4} marker={ids.arrow} />
            <Edge points={[[738, 190], [738, 394], [753, 394]]} show={p >= 4} marker={ids.arrow} />

            {traffic && (
              <>
                {/* the request hops gate by gate, always in the open between two boxes (blue = request, see the legend) */}
                {HOPS.map((h, i) => (
                  <Packet key={i} reduced={reduced} tone="cmd" points={h} duration={0.7} delay={i * 0.7} repeat repeatDelay={2.5} w={14} />
                ))}
                <Edge points={[[76, 466], [76, 510], [184, 510]]} tone="danger" dashed />
                <Packet reduced={reduced} tone="danger" points={[[76, 466], [76, 510], [175, 510]]} duration={1.4} delay={1.6} repeat repeatDelay={3.4} w={14} hold />
                <circle cx={196} cy={510} r={11} fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth={1.6} />
                <foreignObject x={188} y={502} width={16} height={16}>
                  <div className="c8-ic c8-ic--danger"><Ban size={12} /></div>
                </foreignObject>
                <Label x={216} y={514} anchor="start" tone="danger" size={10}>{t.blocked}</Label>
                <Label x={626} y={254} tone="muted" size={10}>{t.pubRoute}</Label>
                <Label x={850} y={254} tone="muted" size={10}>{t.privRoute}</Label>
                <Label x={738} y={462} tone="muted" size={10}>{t.copy}</Label>
              </>
            )}

            <Node x={76} y={440} w={120} h={52} kind="ext" label="Internet" show={p >= 4} />
            <Node x={330} y={440} w={170} h={56} icon={Cloud} label="Gateway" sub="igw-1 · internet" show={p >= 4} highlight={cur(4)} />
            <Node x={330} y={310} w={184} h={64} icon={Network} label={t.alb} sub="ALB" show={p >= 4} highlight={cur(4)} />
            <Node x={330} y={190} w={170} h={64} icon={Router} label="Router" sub={t.routerSub} show={p >= 4} highlight={cur(4)} />
            {SUBNETS.map((sn) => (
              <Node key={sn.k} x={sn.x} y={sn.y} w={190} h={64} icon={sn.pub ? Globe : Lock} label={sn.k} sub={sn.pub ? t.pub(sn.cidr) : t.priv(sn.cidr)} show={p >= 3} highlight={cur(3)} />
            ))}
          </g>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 2 · identity at the gate ───────────────────────── */
const INSTANCES = [
  { k: '1', x: 818 },
  { k: '2', x: 870 },
  { k: 'N', x: 956 },
];

export function Auth({ state = 'flow', reduced }: SceneProps) {
  const t = useT(S).auth;
  const naive = state === 'naive';
  const s = usePhases(5, { interval: 3200, reduced, key: state, auto: !naive });
  const p = s.phase;
  const fl = !naive;
  return (
    <Frame
      title={naive ? t.titleNaive : t.titleFlow}
      legend={<Legend items={[{ tone: 'cmd', label: t.legendReq }, { tone: 'ext', label: t.legendExt }]} />}
      foot={naive ? undefined : <Stepper phase={p} count={5} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}
    >
      <Canvas w={1000} h={470} label={t.canvas}>
        {(ids) => (
          <g>
            <Zone x={372} y={236} w={310} h={184} fill />
            <Label x={388} y={408} anchor="start">{t.listener}</Label>
            <Zone x={780} y={236} w={208} h={184} fill />
            <Label x={796} y={408} anchor="start">auto scaling group</Label>

            {/* request line (1, 4), redirect back (2), login (3), check against Cognito (5), forward (5) */}
            <Edge points={[[212, 304], [380, 304]]} tone="cmd" marker={ids.arrowCmd} />
            <Edge points={[[380, 336], [214, 336]]} marker={ids.arrow} show={fl && p >= 1} />
            <Edge points={[[112, 268], [112, 90], [365, 90]]} tone="cmd" marker={ids.arrowCmd} show={fl && p >= 2} />
            <Edge points={[[600, 90], [549, 90]]} marker={ids.arrow} show={fl && p >= 2} />
            <Edge points={[[457, 288], [457, 124]]} tone="accent" dashed marker={ids.arrowAccent} show={fl && p >= 4} />
            <Edge points={[[532, 320], [550, 320]]} marker={ids.arrow} />
            <Edge points={[[672, 320], [794, 320]]} tone="cmd" marker={ids.arrowCmd} show={naive || p >= 4} />

            {fl && p === 0 && <Packet key="a0" reduced={reduced} tone="cmd" label={t.req} points={[[212, 304], [380, 304]]} duration={1.3} repeat repeatDelay={1} />}
            {fl && p === 1 && <Packet key="a1" reduced={reduced} tone="muted" label={t.redirect} points={[[380, 336], [214, 336]]} duration={1.3} repeat repeatDelay={1} />}
            {fl && p === 2 && <Packet key="a2" reduced={reduced} tone="cmd" label={t.login} points={[[112, 268], [112, 90], [365, 90]]} duration={2} repeat repeatDelay={1} />}
            {fl && p === 2 && <Packet key="a2f" reduced={reduced} tone="muted" points={[[600, 90], [549, 90]]} duration={1} delay={1.4} w={14} />}
            {fl && p === 3 && <Packet key="a3" reduced={reduced} tone="cmd" label="token" points={[[212, 304], [380, 304]]} duration={1.3} repeat repeatDelay={1} />}
            {fl && p === 4 && <Packet key="a4" reduced={reduced} tone="accent" points={[[457, 288], [457, 124]]} duration={1.1} w={14} />}
            {fl && p === 4 && <Packet key="a4b" reduced={reduced} tone="cmd" points={[[672, 320], [794, 320]]} duration={1.1} delay={1.2} w={14} repeat repeatDelay={1.6} />}
            {naive && <Packet reduced={reduced} tone="cmd" points={[[212, 304], [380, 304]]} duration={1} repeat repeatDelay={1.6} w={14} />}
            {naive && <Packet reduced={reduced} tone="cmd" points={[[672, 320], [794, 320]]} duration={1} delay={1.1} repeat repeatDelay={1.6} w={14} />}
            <Label x={730} y={348} tone="cmd" size={10} show={fl && p >= 4}>{t.hdr1}</Label>
            <Label x={730} y={361} tone="cmd" size={10} show={fl && p >= 4}>{t.hdr2}</Label>

            <Node x={112} y={300} w={200} h={64} icon={UserRound} label={t.user} sub={t.userSub} highlight={fl && (p === 0 || p === 3)} />
            <Node x={457} y={90} w={180} h={64} kind="ext" icon={KeyRound} label="Cognito" sub="User Pool" dim={naive} highlight={fl && p === 2} />
            <Node x={700} y={90} w={200} h={56} kind="ext" label="Google · Facebook" sub={t.fedSub} show={fl} />
            <Node x={457} y={320} w={150} h={64} icon={ShieldCheck} label={t.check} sub={t.checkSub} dim={naive} highlight={fl && (p === 1 || p === 4)} />
            <Node x={612} y={320} w={120} h={64} label={t.fwd} sub={t.fwdSub} highlight={fl && p === 4} />
            {INSTANCES.map((i) => (
              <Node key={i.k} x={i.x} y={320} w={44} h={44} kind="cmp" label={i.k} highlight={fl && p === 4} />
            ))}
            <text x={913} y={326} textAnchor="middle" className="lb lb--muted" style={{ fontSize: 16 }}>…</text>
            {naive && (
              <>
                {INSTANCES.map((i) => (
                  <g key={i.k}>
                    <circle cx={i.x} cy={275} r={11} fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth={1.4} />
                    <foreignObject x={i.x - 8} y={267} width={16} height={16}>
                      <div className="c8-ic c8-ic--danger"><KeyRound size={11} /></div>
                    </foreignObject>
                  </g>
                ))}
                <Label x={884} y={374} tone="danger" size={10}>{t.naive}</Label>
              </>
            )}
          </g>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 3 · federation: two doors, one pool ───────────────────────── */
export function Federation({ reduced }: SceneProps) {
  const t = useT(S).fed;
  const rise = (d: number) => ({ initial: { opacity: 0, y: reduced ? 0 : 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: EASE, delay: reduced ? 0 : d } });
  return (
    <div className="c8-fed">
      <div className="c8-fed__doors">
        <motion.article className="vcard c8-fed__door" {...rise(0)}>
          <p className="c8-k mono">{t.k1}</p>
          <h3 className="c8-fed__t"><Users size={18} aria-hidden /> {t.t1}</h3>
          <blockquote className="c8-fed__q">{t.q1}</blockquote>
          <p className="c8-fed__n">{t.n1}</p>
        </motion.article>
        <motion.article className="vcard c8-fed__door" {...rise(0.12)}>
          <p className="c8-k mono">{t.k2}</p>
          <h3 className="c8-fed__t"><UserRound size={18} aria-hidden /> {t.t2}</h3>
          <p className="c8-fed__x">{t.x2}</p>
        </motion.article>
      </div>
      <div className="c8-fed__arrows" aria-hidden>
        <span /><span />
      </div>
      <motion.div className="vcard c8-fed__pool" {...rise(0.3)}>
        <span className="c8-fed__pic"><KeyRound size={20} aria-hidden /></span>
        <span>
          <strong>{t.pool}</strong>
          <span className="c8-fed__ps">{t.poolSub}</span>
        </span>
      </motion.div>
      <motion.p className="c8-fed__foot" {...rise(0.45)}>
        <Banknote size={16} aria-hidden /> {t.foot}
      </motion.p>
    </div>
  );
}

/* ───────────────────────── 4 · zero trust inside ───────────────────────── */
export function ZeroTrust({ reduced }: SceneProps) {
  const t = useT(S).zt;
  const [split, setSplit] = useState(false);
  const sx = split ? 830 : 500;
  const call: [number, number][] = split ? [[275, 220], [728, 220]] : [[275, 220], [398, 220]];
  const verify: [number, number][] = split ? [[830, 188], [830, 50], [627, 50]] : [[500, 188], [500, 80]];
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'cmp', label: t.legendModule }, { tone: 'cmd', label: t.legendCall }, { tone: 'ext', label: t.idp }]} />}
      foot={
        <div className="seg seg--lg" role="group" aria-label={t.moment}>
          <button type="button" aria-pressed={!split} onClick={() => setSplit(false)}>{t.today}</button>
          <button type="button" aria-pressed={split} onClick={() => setSplit(true)}>{t.split}</button>
        </div>
      }
    >
      <Canvas w={1000} h={460} label={t.canvas}>
        {(ids) => (
          <g>
            <Zone x={40} y={120} w={580} h={270} on />
            <Label x={56} y={143} anchor="start" tone="accent">{t.monolith}</Label>
            <Zone x={712} y={146} w={236} h={150} show={split} on />
            <Label x={728} y={168} anchor="start" tone="accent" show={split}>{t.own}</Label>

            <Edge key={split ? 'v1' : 'v0'} points={verify} tone="muted" dashed marker={ids.arrow} />
            <Edge key={split ? 'c1' : 'c0'} points={call} tone="cmd" marker={ids.arrowCmd} />
            <Packet key={split ? 'p1' : 'p0'} reduced={reduced} tone="cmd" label={t.claims} points={call} duration={split ? 2.4 : 1.2} repeat repeatDelay={1.2} />
            <Packet key={split ? 'q1' : 'q0'} reduced={reduced} tone="muted" points={verify} duration={1.2} delay={split ? 2.4 : 1.4} repeat repeatDelay={split ? 2.4 : 1.4} w={14} />
            <Label x={split ? 666 : 337} y={split ? 200 : 278} tone={split ? 'accent' : 'cmd'} size={split ? 11 : 10}>{split ? t.network : t.abac}</Label>
            {split && <Label x={480} y={250} tone="cmd" size={10}>{t.abac}</Label>}

            <Node x={500} y={50} w={250} h={56} kind="ext" icon={KeyRound} label={t.idp} />
            <Node x={165} y={220} w={220} h={64} kind="cmp" icon={Inbox} label="Ordering" sub={t.caller} />
            <Node x={sx} y={220} w={200} h={64} kind="cmp" icon={CalendarClock} label="Scheduling" sub={t.callee} highlight />
            <Node x={165} y={336} w={220} h={52} kind="cmp" icon={BookOpen} label="Menu Catalog" dim />
            <Node x={500} y={336} w={200} h={52} kind="cmp" icon={MessageSquare} label="Feedback" dim />
            <Label x={500} y={440} tone="text" size={13}>{split ? t.footSplit : t.footToday}</Label>
          </g>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 5 · the services map ───────────────────────── */
type ZK = 'public' | 'private' | 'mq' | 'stream' | 'data' | 'ext';
const SVC_ZONES: { k: ZK; x: number; y: number; w: number; h: number }[] = [
  { k: 'stream', x: 36, y: 22, w: 608, h: 172 },
  { k: 'public', x: 40, y: 210, w: 340, h: 260 },
  { k: 'private', x: 400, y: 210, w: 240, h: 260 },
  { k: 'mq', x: 300, y: 484, w: 200, h: 64 },
  { k: 'data', x: 676, y: 20, w: 308, h: 146 },
  { k: 'ext', x: 676, y: 190, w: 308, h: 350 },
];
const EXTS = [
  { x: 755, y: 262 }, { x: 905, y: 262 },
  { x: 755, y: 336 }, { x: 905, y: 336 },
  { x: 755, y: 410 }, { x: 905, y: 410 },
];

export function Services(_: SceneProps) {
  const t = useT(S).svc;
  const [sel, setSel] = useState<ZK | null>(null);
  const z = sel ? t.zones[sel] : null;
  const zoneLabel: Partial<Record<ZK, string>> = { stream: t.stream, public: t.pub, private: t.priv, data: t.data, ext: t.ext };
  const toggle = (k: ZK) => setSel(sel === k ? null : k);
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'cmp', label: t.legendModule }, { tone: 'evt', label: 'Kafka' }, { tone: 'ext', label: t.legendExt }]} />}
      foot={
        <div className="mm-info" aria-live="polite">
          {z ? <span><strong>{z.t}</strong> · <span className="mono">{z.qa}</span>. {z.x}</span> : <span className="eco-info__hint">{t.hint}</span>}
        </div>
      }
    >
      <Canvas w={1000} h={580} label={t.canvas}>
        {(ids) => (
          <>
            {SVC_ZONES.map((zn) => (
              <g
                key={zn.k}
                className="c8-hit"
                role="button"
                tabIndex={0}
                aria-pressed={sel === zn.k}
                aria-label={t.zones[zn.k].t}
                onClick={() => toggle(zn.k)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(zn.k); } }}
              >
                <rect x={zn.x} y={zn.y} width={zn.w} height={zn.h} rx={14} className={`zone ${sel === zn.k ? 'zone--accent c8-zone-sel' : 'c8-zone-idle'}`} />
                {zoneLabel[zn.k] && <text x={zn.x + 16} y={zn.y + 20} className={`lb ${sel === zn.k ? 'lb--accent' : 'lb--muted'}`} style={{ fontSize: 10.5 }}>{zoneLabel[zn.k]}</text>}
              </g>
            ))}
            <g className="pe-none">
              {/* the log band and what reads from it */}
              <rect x={40} y={150} width={600} height={34} rx={8} className="c8-band" />
              <text x={340} y={172} textAnchor="middle" className="c8-band-t">{t.band}</text>
              {[140, 340, 540].map((x) => <Edge key={x} points={[[x, 150], [x, 104]]} tone="evt" marker={ids.arrowEvt} />)}
              <Edge points={[[210, 210], [210, 187]]} tone="evt" marker={ids.arrowEvt} />
              <Edge points={[[210, 470], [210, 516], [313, 516]]} />
              <Edge points={[[520, 470], [520, 516], [487, 516]]} />
              <Edge points={[[625, 400], [658, 400], [658, 128], [683, 128]]} />
              <Edge points={[[80, 470], [80, 562], [830, 562], [830, 543]]} marker={ids.arrow} />
              <Label x={600} y={554} size={10}>HTTPS</Label>

              <Node x={140} y={76} w={170} h={52} kind="ext" icon={Bell} label="SNS" sub={t.snsSub} />
              <Node x={340} y={76} w={170} h={52} kind="ext" icon={Activity} label="DataDog" sub={t.ddSub} />
              <Node x={540} y={76} w={170} h={52} kind="ext" icon={ChartBar} label="Tableau" sub={t.tabSub} />
              <Node x={210} y={300} w={250} h={64} kind="cmp" icon={Server} label="Meals 1..N" sub={t.mealsSub} />
              <Node x={210} y={400} w={250} h={64} kind="cmp" icon={Server} label="Ordering 1..N" sub={t.ordSub} />
              <Node x={520} y={300} w={210} h={64} kind="cmp" icon={Server} label="Purchase 1..N" sub={t.purSub} />
              <Node x={520} y={400} w={210} h={64} kind="cmp" icon={Database} label="Event Store" sub={t.esSub} />
              <Node x={400} y={516} w={170} h={48} icon={Send} label="Amazon MQ" sub={t.mqSub} />
              <Node x={830} y={70} w={290} h={48} kind="ext" icon={Package} label="Amazon S3" sub={t.s3Sub} />
              <Node x={830} y={128} w={290} h={48} kind="ext" icon={Database} label="DynamoDB" sub={t.dynSub} />
              {EXTS.map((e, i) => <Node key={i} x={e.x} y={e.y} w={140} h={56} kind="ext" label={t.exts[i]} />)}
            </g>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 6 · spaghetti vs the log ───────────────────────── */
const HEX = [0, 1, 2, 3, 4, 5].map((i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 3;
  return { x: Math.round(500 + Math.cos(a) * 330), y: Math.round(232 + Math.sin(a) * 170) };
});
const HW = 90, HH = 26;
/** Point where the segment from a box center towards `to` leaves the box. */
function exitPoint(c: { x: number; y: number }, to: { x: number; y: number }, gap = 2): [number, number] {
  const dx = to.x - c.x, dy = to.y - c.y;
  const k = Math.min(Math.abs(dx) > 1e-6 ? (HW + gap) / Math.abs(dx) : Infinity, Math.abs(dy) > 1e-6 ? (HH + gap) / Math.abs(dy) : Infinity);
  return [c.x + dx * k, c.y + dy * k];
}
const PAIRS: [number, number][] = [];
for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) PAIRS.push([i, j]);
const DOWN = 4; // Reporting

const COLS = [260, 520, 780];

export function Stream({ reduced }: SceneProps) {
  const t = useT(S).st;
  const [log, setLog] = useState(true);
  const s = usePhases(4, { interval: 2600, reduced, loop: true, key: log ? 'log' : 'spag', auto: log });
  const p = log ? s.phase : 0;
  const repDown = p === 1 || p === 2;
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'cmp', label: t.legendModule }, { tone: 'evt', label: t.legendWrite }, { tone: 'danger', label: t.legendDown }]} />}
      foot={
        <div className="seg seg--lg" role="group" aria-label={t.view}>
          <button type="button" aria-pressed={!log} onClick={() => setLog(false)}>{t.spaghetti}</button>
          <button type="button" aria-pressed={log} onClick={() => setLog(true)}>{t.log}</button>
        </div>
      }
    >
      <Canvas w={1000} h={470} label={log ? t.canvasLog : t.canvasSpag}>
        {(ids) => (
          <g key={log ? 'log' : 'spag'}>
          {!log ? (
            <>
              {PAIRS.map(([i, j]) => {
                const bad = i === DOWN || j === DOWN;
                return <Edge key={`${i}-${j}`} points={[exitPoint(HEX[i], HEX[j]), exitPoint(HEX[j], HEX[i])]} tone={bad ? 'danger' : 'muted'} width={bad ? 1.6 : 1.4} />;
              })}
              {[0, 2, 5].map((i, n) => (
                <Packet key={i} reduced={reduced} tone="danger" points={[exitPoint(HEX[i], HEX[DOWN]), exitPoint(HEX[DOWN], HEX[i], 10)]} duration={1.6} delay={n * 0.5} repeat repeatDelay={1.2} w={14} hold />
              ))}
              {HEX.map((h, i) => (
                <Node key={i} x={h.x} y={h.y} w={HW * 2} h={HH * 2} kind={i === DOWN ? 'danger' : 'cmp'} label={t.svcs[i]} sub={i === DOWN ? t.down : undefined} />
              ))}
              <Label x={500} y={456} tone="text" size={13}>{t.footSpag}</Label>
            </>
          ) : (
            <>
              <rect x={60} y={205} width={880} height={50} rx={10} className="c8-band" />
              {Array.from({ length: 22 }, (_, i) => (
                <rect key={i} x={84 + i * 38} y={219} width={24} height={22} rx={5} className={`c8-entry ${i >= 19 ? 'is-new' : ''}`} />
              ))}
              <Label x={64} y={194} anchor="start">{t.band}</Label>
              {COLS.map((x, i) => (
                <g key={x}>
                  <Edge points={[[x, 352], [x, 258]]} tone="evt" marker={ids.arrowEvt} />
                  <Edge key={`rd${i}-${i === 1 && repDown}`} points={[[x, 205], [x, 121]]} tone={i === 1 && repDown ? 'danger' : 'muted'} dashed={i === 1 && repDown} marker={i === 1 && repDown ? undefined : ids.arrow} />
                  <Packet reduced={reduced} tone="evt" points={[[x, 352], [x, 258]]} duration={1.1} delay={i * 0.6} repeat repeatDelay={1.3} w={14} />
                  {!(i === 1 && repDown) && (
                    <Packet key={`r${i}-${p === 3 ? 'f' : 'n'}`} reduced={reduced} tone="evt" points={[[x, 205], [x, 121]]} duration={i === 1 && p === 3 ? 0.6 : 1.1 + i * 0.5} delay={0.3 + i * 0.4} repeat repeatDelay={i === 1 && p === 3 ? 0.2 : 1.2 + i * 0.6} w={14} />
                  )}
                </g>
              ))}
              <Label x={650} y={168} tone="muted" size={10}>{t.read}</Label>
              <Label x={650} y={312} tone="evt" size={10}>{t.write}</Label>
              <Node x={260} y={92} w={190} h={56} kind="cmp" icon={Bell} label={t.svcs[3]} sub={t.reader} />
              <Node x={520} y={92} w={190} h={56} kind={repDown ? 'danger' : 'cmp'} icon={ChartBar} label={t.svcs[4]} sub={repDown ? t.down : p === 3 ? t.catching : t.upToDate} />
              <Node x={780} y={92} w={190} h={56} kind="muted" label={t.future} sub={t.futureSub} />
              <Node x={260} y={380} w={190} h={56} kind="cmp" icon={BookOpen} label="Menu Catalog" />
              <Node x={520} y={380} w={190} h={56} kind="cmp" icon={Inbox} label="Ordering" />
              <Node x={780} y={380} w={190} h={56} kind="cmp" icon={CalendarClock} label="Scheduling" />
              <Label x={500} y={456} tone="text" size={13}>{t.footLog[p]}</Label>
            </>
          )}
          </g>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 7 · infrastructure as code ───────────────────────── */
export function Iac({ reduced }: SceneProps) {
  const t = useT(S).iac;
  const s = usePhases(4, { interval: 3400, reduced });
  const p = s.phase;
  return (
    <Frame title={t.title} foot={<Stepper phase={p} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}>
      <div className="c8-iac">
        <section className={`vcard c8-iac__col ${p === 0 ? 'is-cur' : ''}`}>
          <p className="c8-k mono"><FileCode size={13} aria-hidden /> {t.spec}</p>
          <pre className="c8-code">
            {t.specLines.map(([k, v]) => (
              <span key={k}><b>{k}</b>: {v}{'\n'}</span>
            ))}
          </pre>
          <p className="c8-tag mono">{t.specTag}</p>
        </section>
        <section className={`vcard c8-iac__col ${p === 1 ? 'is-cur' : ''} ${p >= 1 ? '' : 'is-off'}`}>
          <p className="c8-k mono"><ShieldCheck size={13} aria-hidden /> {t.checks}</p>
          <ul className="c8-checks">
            {t.checkList.map((c, i) => (
              <motion.li key={c} initial={false} animate={{ opacity: p >= 1 ? 1 : 0.35 }} transition={{ delay: p >= 1 && !reduced ? 0.25 + i * 0.35 : 0 }}>
                <span className={`c8-dot ${p >= 1 ? 'is-ok' : ''}`}><Check size={12} aria-hidden /></span>
                {c}
              </motion.li>
            ))}
          </ul>
          <p className="c8-tag mono">{t.checksTag}</p>
        </section>
        <section className={`vcard c8-iac__col ${p >= 2 ? 'is-cur' : 'is-off'} ${p === 3 ? 'is-drift' : ''}`}>
          <p className="c8-k mono"><Server size={13} aria-hidden /> {t.run}</p>
          <div className="c8-envs">
            {t.envs.map((e) => <span key={e} className={`c8-env ${p >= 2 ? 'is-on' : ''}`}>{e}</span>)}
          </div>
          <p className="c8-iac__x">{t.derived}</p>
          <AnimatePresence initial={false}>
            {p === 3 && (
              <motion.div className="c8-drift" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="c8-drift__a"><Globe size={14} aria-hidden /> {t.drift}</p>
                <p className="c8-drift__b"><TriangleAlert size={14} aria-hidden /> {t.driftAlert}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {p < 3 && <p className="c8-tag mono">{t.runTag}</p>}
        </section>
      </div>
    </Frame>
  );
}

/* ───────────────────────── 8 · scaling: the two options, then the policy ───────────────────────── */
const SIZES = [
  { w: 120, h: 78 },
  { w: 180, h: 118 },
  { w: 236, h: 156 },
];
const GX = 620, GW = 300;

function Gauge2({ y, label, value, limit }: { y: number; label: string; value: number; limit: number }) {
  const over = value > limit;
  return (
    <g>
      <text x={GX} y={y - 14} className="lb lb--muted" style={{ fontSize: 11 }}>{label}</text>
      <rect x={GX} y={y} width={GW} height={18} rx={9} className="c8-track" />
      <motion.rect x={GX} y={y} height={18} rx={9} className={over ? 'c8-fill is-over' : 'c8-fill'} initial={false} animate={{ width: (GW * value) / 100 }} transition={{ duration: 0.8, ease: EASE }} />
      <line x1={GX + (GW * limit) / 100} x2={GX + (GW * limit) / 100} y1={y - 8} y2={y + 26} className="c8-limit" />
      <text x={GX + (GW * limit) / 100} y={y - 14} textAnchor="middle" className={`lb ${over ? 'lb--danger' : 'lb--muted'}`} style={{ fontSize: 11 }}>{limit}%</text>
      <text x={GX + GW + 12} y={y + 14} className={`c8-val ${over ? 'is-over' : ''}`}>{value}%</text>
    </g>
  );
}

const POLICY = [
  { cpu: 35, mem: 40 },
  { cpu: 55, mem: 60 },
  { cpu: 82, mem: 71 },
  { cpu: 41, mem: 46 },
];

export function Scale({ state = 'options', reduced }: SceneProps) {
  const t = useT(S).sc;
  const policy = state === 'policy';
  const s = usePhases(4, { interval: 3200, reduced, key: state, auto: policy });
  const p = s.phase;
  if (!policy) {
    return (
      <Frame title={t.titleOptions}>
        <Canvas w={1000} h={440} label={t.canvasOptions}>
          {(ids) => (
            <>
              <Zone x={24} y={30} w={456} h={380} />
              <Zone x={520} y={30} w={456} h={380} />
              <Label x={44} y={56} anchor="start">{t.up}</Label>
              <Label x={540} y={56} anchor="start">{t.out}</Label>
              <motion.rect
                className="nd nd--cmp"
                rx={14}
                initial={false}
                animate={reduced ? { x: 252 - 118, y: 220 - 78, width: 236, height: 156 } : { x: [252 - 60, 252 - 90, 252 - 118, 252 - 118, 252 - 60], y: [220 - 39, 220 - 59, 220 - 78, 220 - 78, 220 - 39], width: [120, 180, 236, 236, 120], height: [78, 118, 156, 156, 78] }}
                transition={reduced ? { duration: 0 } : { duration: 6, times: [0, 0.25, 0.5, 0.85, 1], repeat: Infinity, ease: EASE }}
              />
              <foreignObject x={252 - 70} y={220 - 20} width={140} height={40}>
                <div className="c8-box-l"><Server size={16} aria-hidden /> {t.oneServer}</div>
              </foreignObject>
              <Label x={252} y={372} tone="text" size={13}>{t.upCap}</Label>

              <Node x={620} y={220} w={140} h={56} label={t.lb} />
              {[130, 220, 310].map((y, i) => (
                <g key={y}>
                  <Edge points={[[690, 220], [720, 220], [720, y], [753, y]]} marker={ids.arrow} />
                  <Node x={840} y={y} w={170} h={52} kind="cmp" icon={Server} label={t.inst(i === 2 ? 'N' : String(i + 1))} />
                </g>
              ))}
              <Label x={748} y={372} tone="text" size={13}>{t.outCap}</Label>
            </>
          )}
        </Canvas>
      </Frame>
    );
  }
  const v = POLICY[p];
  const size = SIZES[Math.min(p, 2)];
  const out = p === 3;
  return (
    <Frame
      title={t.titlePolicy}
      foot={<Stepper phase={p} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}
    >
      <Canvas w={1000} h={440} label={t.canvasPolicy}>
        {(ids) => (
          <>
            <AnimatePresence initial={false}>
              {!out && (
                <motion.g key="one" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.rect
                    className={`nd nd--cmp ${p === 2 ? 'c8-ceiling' : ''}`}
                    rx={14}
                    initial={false}
                    animate={{ x: 360 - size.w / 2, y: 210 - size.h / 2, width: size.w, height: size.h }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />
                  <foreignObject x={360 - 70} y={210 - 20} width={140} height={40}>
                    <div className="c8-box-l"><Server size={16} aria-hidden /> {t.oneServer}</div>
                  </foreignObject>
                  <text x={360} y={318} textAnchor="middle" className={`lb ${p === 2 ? 'lb--danger' : 'lb--muted'}`} style={{ fontSize: 11 }}>
                    {t.sizes[Math.min(p, 2)]}{p === 2 ? ` · ${t.ceiling}` : ''}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
            <Node x={120} y={210} w={184} h={56} icon={Network} label={t.lb} show={out} />
            {[110, 210, 310].map((y, i) => (
              <g key={y}>
                <Edge points={[[212, 210], [240, 210], [240, y], [273, y]]} show={out} marker={ids.arrow} delay={0.2} />
                <Node x={360} y={y} w={170} h={56} kind="cmp" icon={Server} label={t.inst(i === 2 ? 'N' : String(i + 1))} show={out} delay={0.15 * i} />
              </g>
            ))}
            <Gauge2 y={150} label={t.cpu} value={v.cpu} limit={75} />
            <Gauge2 y={250} label={t.mem} value={v.mem} limit={85} />
            <Label x={GX + GW / 2} y={330} tone="text" size={12.5}>{t.thresholds}</Label>
          </>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 9 · extracting the Menu Catalog ───────────────────────── */
const ROWS3 = [100, 176, 252];
const CONS = [90, 160, 230, 300];

export function Extract({ reduced }: SceneProps) {
  const t = useT(S).ex;
  const s = usePhases(3, { interval: 3600, reduced });
  const p = s.phase;
  const out = p >= 1;
  const same = p === 2;
  return (
    <Frame
      title={t.title}
      legend={<Legend items={[{ tone: 'accent', label: t.legendDomain }, { tone: 'cmp', label: t.legendCmp }, { tone: 'ext', label: t.legendExt }]} />}
      foot={<Stepper phase={p} count={3} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}
    >
      <Canvas w={1000} h={560} label={t.canvas}>
        {(ids) => (
          <g>
            <Zone x={190} y={40} w={660} h={300} on={same} />
            <Label x={190} y={30} anchor="start" tone={same ? 'accent' : 'muted'}>{t.service}</Label>
            <Zone x={200} y={56} w={172} h={268} on={same} />
            <Label x={286} y={312} tone={same ? 'accent' : 'muted'} size={10}>{t.acl}</Label>

            {ROWS3.map((y) => (
              <g key={y}>
                <Edge points={[[170, y], [209, y]]} />
                <Edge points={[[361, y], [385, y], [385, 176], [408, 176]]} tone="cmd" marker={ids.arrowCmd} />
              </g>
            ))}
            <Label x={500} y={132} tone="cmd" size={10}>{t.cmdEvt}</Label>
            {CONS.map((y, i) => (
              <Edge key={y} points={[[590, 176], [620, 176], [620, y], [648, y]]} tone="evt" marker={ids.arrowEvt} show={!(out && i === 3)} />
            ))}
            <Edge points={[[820, 90], [890, 90]]} marker={ids.arrow} />
            <Label x={898} y={94} anchor="start" size={10}>{t.toOrdering}</Label>

            {/* below the domain: the balancer and the cloned query side */}
            <Edge points={[[500, 208], [500, 378]]} tone="cmd" marker={ids.arrowCmd} show={out} delay={0.5} />
            {out && <Packet reduced={reduced} tone="cmd" points={[[500, 210], [500, 376]]} duration={1.4} repeat repeatDelay={1.2} w={14} />}
            <Label x={518} y={300} anchor="start" tone="cmd" size={10} show={out}>{t.cmdEvt}</Label>
            <Edge points={[[500, 420], [500, 436], [320, 436], [320, 452]]} show={out} marker={ids.arrow} delay={0.7} />
            <Edge points={[[500, 436], [680, 436], [680, 452]]} show={out} marker={ids.arrow} delay={0.7} />
            <Zone x={190} y={454} w={260} h={80} show={out} />
            <Zone x={550} y={454} w={260} h={80} show={out} />
            <Edge points={[[327, 494], [337, 494]]} show={out} />
            <Edge points={[[687, 494], [697, 494]]} show={out} />
            <motion.text x={500} y={500} textAnchor="middle" className="lb lb--muted" style={{ fontSize: 22 }} initial={false} animate={{ opacity: out ? 1 : 0 }}>…</motion.text>

            {t.providers.map((l, i) => <Node key={l} x={95} y={ROWS3[i]} w={150} h={56} kind="ext" label={l} />)}
            {t.aclNodes.map((l, i) => <Node key={l} x={286} y={ROWS3[i]} w={150} h={56} label={l} highlight={same} />)}
            <Node x={500} y={176} w={180} h={64} kind="core" icon={BookOpen} label="Menu Catalog" sub={t.domain} highlight={same} />
            {t.consumers.map((l, i) =>
              i < 3 ? (
                <Node key={l} x={735} y={CONS[i]} w={170} h={52} kind="cmp" label={l} />
              ) : (
                <Node key={l} x={out ? 265 : 735} y={out ? 494 : CONS[i]} w={out ? 124 : 170} h={out ? 48 : 52} kind="cmp" label={l} highlight={p === 1} />
              ),
            )}
            <Node x={385} y={494} w={96} h={48} kind="cmp" label={t.cache} show={out} highlight={p === 1} delay={0.5} />
            <Node x={625} y={494} w={124} h={48} kind="cmp" label={t.consumers[3]} show={out} highlight={p === 1} delay={0.7} />
            <Node x={745} y={494} w={96} h={48} kind="cmp" label={t.cache} show={out} highlight={p === 1} delay={0.8} />
            <Node x={500} y={400} w={440} h={40} label={t.lb} show={out} delay={0.6} />
          </g>
        )}
      </Canvas>
    </Frame>
  );
}

/* ───────────────────────── 10 · health endpoints and the synthetic customer ───────────────────────── */
const PATH_ICONS = [Utensils, CreditCard, Refrigerator];

export function Health({ reduced }: SceneProps) {
  const t = useT(S).hl;
  const s = usePhases(4, { interval: 3600, reduced });
  const p = s.phase;
  const stuck = p === 2;
  const run = p === 1 || p === 2;
  return (
    <Frame title={t.title} foot={<Stepper phase={p} count={4} playing={s.playing} onPlay={() => s.setPlaying(true)} onPause={() => s.setPlaying(false)} onGo={s.goTo} captions={t.caps} />}>
      <div className="c8-hl">
        <section className={`vcard c8-hl__card ${p === 0 ? 'is-cur' : ''}`}>
          <p className="c8-k mono"><Activity size={13} aria-hidden /> {t.endpoint} <span className="c8-k__tag">{t.endpointTag}</span></p>
          <div className="c8-hl__row">
            <strong>{t.ready}</strong>
            <span className="c8-hl__mods">
              {t.mods.map((m) => <span key={m} className="c8-mod"><i className="c8-led is-ok" />{m}</span>)}
            </span>
          </div>
          <div className="c8-hl__row">
            <strong>{t.business}</strong>
            <span className="c8-hl__x">{t.businessX}</span>
          </div>
          <div className="c8-hl__row">
            <strong>{t.technical}</strong>
            <span className="c8-hl__x">{t.technicalX}</span>
          </div>
          <p className={`c8-hl__healthy ${stuck ? 'is-on' : ''}`}><Gauge size={14} aria-hidden /> {t.healthy}</p>
        </section>
        <section className={`vcard c8-hl__card ${run ? 'is-cur' : ''} ${stuck ? 'is-alarm' : ''}`}>
          <p className="c8-k mono"><Clock size={13} aria-hidden /> {t.synthetic} <span className="c8-k__tag">{t.syntheticTag}</span></p>
          <ol className="c8-path">
            {t.path.map((step, i) => {
              const Icon = PATH_ICONS[i];
              const lit = p === 1 || p === 3 || (stuck && i === 0);
              const bad = stuck && i === 1;
              return (
                <motion.li
                  key={step}
                  className={`c8-path__s ${lit ? 'is-ok' : ''} ${bad ? 'is-bad' : ''}`}
                  initial={false}
                  animate={{ opacity: run || p === 3 ? 1 : 0.45 }}
                  transition={{ delay: run && !reduced ? i * 0.5 : 0 }}
                >
                  <span className="c8-path__ic"><Icon size={18} aria-hidden /></span>
                  {step}
                </motion.li>
              );
            })}
          </ol>
          <p className={`c8-hl__res ${p === 1 || p === 3 ? 'is-ok' : stuck ? 'is-bad' : ''}`}>
            {p === 0 ? t.waiting : stuck ? <><TriangleAlert size={14} aria-hidden /> {t.stuck}</> : <><Check size={14} aria-hidden /> {t.ok}</>}
          </p>
        </section>
        <motion.p className="c8-hl__banner" initial={false} animate={{ opacity: p === 3 ? 1 : 0, y: p === 3 || reduced ? 0 : 6 }}>
          <Split size={16} aria-hidden /> {t.banner}
        </motion.p>
      </div>
    </Frame>
  );
}

/* ───────────────────────── 11 · the risks ───────────────────────── */
const RISK_ICONS = [CreditCard, MessageSquare, Bell, CalendarClock, Refrigerator, Clock, ChefHat, FileCode, Gauge, RotateCcw];
const OWNER = [4, 5];

export function Risks({ reduced }: SceneProps) {
  const t = useT(S).rk;
  const [sel, setSel] = useState(0);
  const it = t.items[sel];
  const owner = OWNER.includes(sel);
  const SelIcon = RISK_ICONS[sel];
  return (
    <div className="c8-rk">
      <div className="c8-rk__grid" role="group" aria-label={t.hint}>
        {t.items.map((r, i) => {
          const Icon = RISK_ICONS[i];
          return (
            <motion.button
              key={r.t}
              type="button"
              className={`c8-rk__b ${sel === i ? 'is-sel' : ''} ${OWNER.includes(i) ? 'is-owner' : ''}`}
              aria-pressed={sel === i}
              onClick={() => setSel(i)}
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : i * 0.04 }}
            >
              <Icon size={16} aria-hidden />
              <span>{r.t}</span>
            </motion.button>
          );
        })}
      </div>
      <div className={`vcard c8-rk__d ${owner ? 'is-owner' : ''}`} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={sel} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="c8-k mono">
              <SelIcon size={13} aria-hidden /> {it.t}
              <span className={`c8-k__tag ${owner ? 'is-owner' : ''}`}>{owner ? `${t.owner} · ${t.ownerTag}` : t.mitigation}</span>
            </p>
            <p className="c8-rk__m">{it.m}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="c8-rk__hint">{t.hint}</p>
    </div>
  );
}

/** Scenes of chapter 8, registered in ./index.ts through this map. */
export const SCENES8: Record<string, ComponentType<SceneProps>> = {
  'infra-vpc': Vpc,
  'infra-auth': Auth,
  'infra-federation': Federation,
  'infra-zerotrust': ZeroTrust,
  'infra-services': Services,
  'infra-stream': Stream,
  'infra-iac': Iac,
  'infra-scale': Scale,
  'infra-extract': Extract,
  'infra-health': Health,
  'infra-risks': Risks,
};

