# MonArch · investigación fase 1 (texto)

Repositorio: `katas-src/MonArch`. Kata: Hey Blue! (O'Reilly Architecture Katas, fall 2022, `Readme.md:1-3`). Equipo: Aryaveer Singh, Manav Rathi, Mayank Sinha (`Readme.md:7-10`).

Archivos de texto leídos: `Readme.md`, `ADRs/ADR01` a `ADRs/ADR07`, `ADRs/ADRTemplate.md`, `markdownCheatSheet.md`, `.gitignore` (11). No leídos en esta fase: 20 PNG, `Diagrams/gcp.excalidraw` (fuente de diagrama) y `Diagrams/.DS_Store`.

## 1. El caso

[DATO] Hey Blue! es una iniciativa de John Verdi, ex policía y cofundador de la organización sin fines de lucro EcoSchool (`Readme.md:50`). Quiere acercar a policías y a las comunidades que sirven, permitiéndoles conectarse cuando están cerca, virtualmente o en persona, con el móvil (`Readme.md:51`). Las conexiones se premian con puntos que tienen valor monetario como descuentos o donaciones a beneficencia (`Readme.md:51`). La app debe mostrar el impacto social con animaciones, trofeos virtuales y citas, y las conexiones se comparten en redes sociales (`Readme.md:51-52`). [DATO] Restricciones: proyecto greenfield sin infraestructura existente (`Readme.md:58`); la organización sin fines de lucro debe sostener el sistema con un modelo de marketing de afiliados (`Readme.md:60`); la financiación inicial viene de subvenciones y patrocinios (`Readme.md:61`). [DATO] Supuesto: el sistema no procesa transacciones financieras; la compra ocurre en el sistema o la tienda del comercio y el sistema solo genera vales verificables al canjear puntos ("mencionado por el fundador en la discusión inicial") (`Readme.md:63`). Las organizaciones benéficas cobran el valor de los puntos donados fuera del sistema (`Readme.md:64`). [DATO] Escala esperada: "millions of geographically distributed users" (`Readme.md:73`), conexiones en tiempo real "de todo Estados Unidos" (`Readme.md:219`). [HUECO] El documento de requisitos está en un Google Doc externo (`Readme.md:56`); el repositorio no lo copia ni numera requisitos.

## 2. Qué entregó el equipo

- `Readme.md`: documento único con caso, características, enfoque, contexto, event storming, contenedores, componentes, despliegue en GCP, costos, evaluación y riesgos, lista de ADR y referencias (`Readme.md:12-45`).
- `ADRs/ADR01`–`ADR07`: siete ADR de decisión, todos en estado Proposed (`ADR01:6`, `ADR02:6`, `ADR03:7`, `ADR04:10`, `ADR05:6`, `ADR06:6`, `ADR07:7`).
- `ADRs/ADRTemplate.md`: plantilla de ADR (secciones Status, Rationale, Decision, Consequences).
- `Diagrams/`: 20 PNG; el README numera 19 figuras (Figura 1 a Figura 19, `Readme.md:112-304`) más la imagen de portada `1p.png` (`Readme.md:5`). Un `gcp.excalidraw` fuente.
- `markdownCheatSheet.md`: hoja de ayuda genérica de Markdown.
- Cuentas: 7 ADR de decisión; 0 requisitos numerados (están en un documento externo, `Readme.md:56`); 19 figuras citadas.
- [DATO] Métodos declarados: modelo C4 (contexto como caja negra, luego contenedores y componentes) (`Readme.md:96`); event storming para bounded contexts y agregados (`Readme.md:97`, `Readme.md:129-144`); tabla de características con "Top 3" (`Readme.md:71-78`); comparación de estilos por estrellas (`Readme.md:109-114`); arquitectura quanta y acoplamiento estático/dinámico (`Readme.md:170-192`); fitness functions mencionadas como pruebas continuas en CI/CD (`Readme.md:77`, `Readme.md:347`).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR01 | Usar arquitectura de microservicios para modelar Hey Blue!; aplicable aunque se construya como monolito modular | Proposed | Monolito modular (como forma de construir, no como alternativa rechazada) | Bajo acoplamiento y alta cohesión; principios de DDD; la estructura modular debe reflejar la arquitectura en cada capa | Duplicación de datos y código; difícil de ejecutar rápido si se desarrolla cada microservicio desde cero | Escalar componentes muy usados por separado (sin nombrar característica) | `ADRs/ADR01-Microservices-architecture.md:6-24` |
| ADR02 | Usar el patrón hexagonal para diseñar cada microservicio | Proposed | no declara | Componentes intercambiables con varias interfaces por consumidor; vistas distintas de los mismos datos (el ciudadano ve un subconjunto del perfil del policía); cada servicio simula sus datos para pruebas | Más esfuerzo de desarrollo al soportar varias interfaces; andamiaje adicional de framework | Testabilidad (implícita en "independently testable") | `ADRs/ADR02-Hexagonal-microservices.md:6-24` |
| ADR03 | REST sobre HTTP para peticiones síncronas y websockets para mensajes en las API públicas | Proposed | SOAP, RPC, GraphQL (frente a REST); Server-Sent Events y gRPC (frente a websockets) | Estándares web, TLS, acceso por URL; SSE es solo servidor→cliente; las librerías cliente de websockets tienen más disponibilidad que gRPC | Las apps móviles no pueden mantener websockets en segundo plano: el usuario debe tener la app activa; gRPC/protobuf sobre HTTP/2 es "in theory" más rápido | no cita | `ADRs/ADR03-Rest-over-http-and-websockets.md:7-33` |
| ADR04 | Una capa de API expone la interfaz pública unificada del sistema | [Proposed] | no declara | Solo un subconjunto de interfaces debe ser accesible a usuarios externos; en vez de que cada servicio se exponga, se accede por la capa de API | Sobrecarga de crear y mantener un servicio adicional; más latencia por el enrutamiento | no cita | `ADRs/ADR04-API-Layer.md:4-23` |
| ADR05 | CQRS para actualizar perfiles por mensajes (conexiones, canje/donación de puntos) y event sourcing para eventos transaccionales que consumen varios servicios | Proposed | Que Reporting pida los datos de forma síncrona al servicio de perfiles (descartada) | Volumen de datos a devolver y acoplamiento por endpoints extra para reportes | Renunciar a la atomicidad a favor de consistencia eventual; posible duplicación de datos y código; transacciones perdidas por caída de un servicio | no cita | `ADRs/ADR05-CQRS-EventSourcing.md:6-31` |
| ADR06 | Almacén en memoria y/o estructura de grafo para encontrar al policía disponible más cercano | Proposed | Memcached, Redis, RedisGraph o implementación propia; búsqueda tabular frente a grafo | Un procesador de mensajes puede tener miles de sockets activos; E/S a disco sería demasiado lenta; el grafo baja el costo de búsqueda a O(log n) | Más requisitos de memoria/hardware; insertar vértices cuesta más que en una tabla | Latencia (consecuencia positiva) | `ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md:6-29` |
| ADR07 | Notificaciones disparadas por el dispositivo y geofencing en servicios en segundo plano de la app, junto con notificaciones del servidor | Proposed | Notificaciones empujadas por el servidor con detección de proximidad en servidor (queda como respaldo) | Notificar sin intervención del servidor; menos carga de procesamiento en el servidor | Rendimiento y batería del móvil; no se pueden mostrar usuarios cercanos en el mapa (menos usabilidad); la detección en servidor sigue haciendo falta como respaldo | Usabilidad (como costo) | `ADRs/ADR07-Device-triggered-notifications.md:7-26` |

No se incluye `ADRs/ADRTemplate.md` (plantilla). No hay ADR sobre cómo usar ADR.

[DATO] `ADR07:4` conserva la línea de instrucciones de la plantilla ("Describe here the forces...") en lugar de un contexto propio. [DATO] `ADR04` pone Rationale antes de Status (`ADR04:6-10`). [DATO] La decisión de ADR06 está escrita como "Will we use an in memory cache and/or a graph data structure" (`ADR06:22`), sin fijar una de las dos opciones. [DATO] El README dice que el patrón hexagonal "no pretende ser prescriptivo" y que el sistema podría desplegarse como monolito modular (`Readme.md:103`).

## 4. Hallazgos para el curso

#### H01 · Microservicios como mapa, monolito modular como primer paso
- Idea: una arquitectura de servicios puede servir como modelo de partición y hoja de ruta aunque la primera entrega se construya y despliegue como un único monolito modular.
- Lo que hizo el equipo: [DATO] Modeló el sistema como microservicios (`ADR01:14`) y declaró que podría desarrollarse y desplegarse como monolito modular, todos los bounded contexts en un contenedor escalado por instancias, como vía para un MVP (`Readme.md:103`). [DATO] Primero dibujó el monolito modular (cada bounded context es un módulo, `Readme.md:148`) y luego lo separó en contenedores siguiendo los mismos límites (`Readme.md:153`). [DATO] "The modular structure of the system should at all times mirror the overall architecture proposed here, at each layer" (`ADR01:11`).
- Razón declarada: [DATO] prototipar rápido un MVP "at a reduced overall cost of development" (`Readme.md:103`); microservicios dan una hoja de ruta para la evolución y permiten separar componentes muy usados para escalarlos (`ADR01:18-19`). [DATO] Cita a Sam Newman: "Microservices are not the goal, you don't win by having microservices" (`Readme.md:101`).
- Costo o trade-off admitido: [DATO] duplicación de datos y código; difícil de ejecutar rápido si se desarrolla cada microservicio desde cero (`ADR01:23-24`).
- Alternativas que nombra: monolito modular, presentado como forma de construir, no como alternativa descartada (`Readme.md:103`, `ADR01:11`).
- Estado: Proposed (`ADR01:6`).
- Fuente: `ADRs/ADR01-Microservices-architecture.md:6-24`, `Readme.md:101-103`, `Readme.md:146-153`.
- Completitud: parcial. [HUECO] No dice qué señal haría pasar del monolito modular a servicios separados.
- Contexto para contarlo: caso Hey Blue!; qué es un monolito modular; qué es un bounded context.
- Depende de imagen: sí (`Diagrams/modmono.png`, `Diagrams/containers.png`).
- Verificado: [ ]

#### H02 · Un estilo con mala nota en una cualidad se usa igual, aislando la parte que la necesita
- Idea: la puntuación de un estilo para una cualidad vale para el sistema entero; se puede elegir el estilo y atender la cualidad solo en el servicio que la exige.
- Lo que hizo el equipo: [DATO] Eligió como top 3 Scalability, Extensibility y Performance (`Readme.md:73-77`). [DATO] Reconoce que los microservicios puntúan bajo en rendimiento y aun así los usa: la penalización viene de la latencia de red y de la gestión de transacciones distribuidas y aplica al sistema completo, no a un servicio aislado; la funcionalidad crítica en rendimiento se aísla en un microservicio que atiende muchas más peticiones (`Readme.md:115`). [DATO] Ese servicio es Connections, "most compute intensive", diseñado sin estado y sin almacén persistente (`Readme.md:350`).
- Razón declarada: [DATO] "This is the approach we take to mitigate this overall performance penalty" (`Readme.md:115`).
- Costo o trade-off admitido: no declara un costo de esta mitigación más allá de los de ADR01.
- Alternativas que nombra: [DATO] compara estilos en la Figura 1 y dice que es "incidental" que los elegidos puntúen más (`Readme.md:109-114`); dice que event-driven y serverless quedan incluidos en microservicios (`Readme.md:116-118`). Los demás estilos de la tabla no se nombran en el texto.
- Estado: no declara (es texto del README; se apoya en ADR01, Proposed).
- Fuente: `Readme.md:71-78`, `Readme.md:109-118`, `Readme.md:350-351`.
- Completitud: parcial. [HUECO] La tabla de estrellas está solo en imagen; no hay cifras de rendimiento exigido.
- Contexto para contarlo: qué es una característica de arquitectura; la tabla de estilos por estrellas; el servicio de conexiones.
- Depende de imagen: sí (`Diagrams/characteristics.png`).
- Verificado: [ ]

#### H03 · Del event storming a los límites de servicio
- Idea: los límites de los servicios salen de un modelado del dominio (eventos, comandos, agregados, políticas), no de la tecnología.
- Lo que hizo el equipo: [DATO] Identificó eventos de dominio (notas naranjas en una pizarra virtual), luego los comandos que los disparan y los actores, agrupó comandos y eventos en agregados, determinó políticas de automatización para comandos sin actor externo y agrupó agregados en bounded contexts (`Readme.md:130-144`). [DATO] Las políticas de automatización "indicate asynchronous communication coupling between the bounded contexts" (`Readme.md:140`). [DATO] Cada bounded context se volvió módulo y luego servicio (`Readme.md:148`, `Readme.md:153`).
- Razón declarada: [DATO] "The prerequisite to our goal of modelling the system as a set of independent microservices is to start with domain partitioning" (`Readme.md:130`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `Readme.md:97`, `Readme.md:129-153`.
- Completitud: ilustrativo (el proceso está descrito; los resultados están en imágenes).
- Contexto para contarlo: evento de dominio, comando, agregado, bounded context.
- Depende de imagen: sí (`Diagrams/domainEvents.png`, `Diagrams/commandsAndActors.png`, `Diagrams/automationPolicies.png`).
- Verificado: [ ]

#### H04 · Una base de datos compartida une dos servicios en un mismo quantum
- Idea: contar quanta obliga a ver que dos servicios que comparten base de datos se despliegan y fallan juntos, aunque se dibujen separados.
- Lo que hizo el equipo: [DATO] El servicio ETL y Rewards Manager están acoplados estáticamente por una base compartida; separar datos maestros de transacciones (ETL escribe, Rewards lee) "does not do much to reduce the contract coupling" por los datos compartidos; el diagrama los muestra separados "for clarity and semantic reasons" (`Readme.md:182`). [DATO] Con esa base compartida, el sistema tiene 6 quanta (`Readme.md:192`). [DATO] La capa de API se excluye del análisis por ser un proxy sin lógica de dominio (`Readme.md:173-174`). [DATO] Acoplamiento dinámico: Profile consulta a IAM de forma síncrona; Rewards y Connections consultan a Profile de forma síncrona; Profile recibe eventos de Rewards y Connections; Reporting recibe eventos de Profile (`Readme.md:185-188`). [DATO] Social Media API no depende de otros servicios; es "trivial" para ser microservicio propio pero no encaja semánticamente en otro (`Readme.md:190`).
- Razón declarada: [DATO] contrato acoplado por datos compartidos (`Readme.md:182`).
- Costo o trade-off admitido: [DATO] el acoplamiento de contrato se mantiene aunque se separen las bases (`Readme.md:182`).
- Alternativas que nombra: [DATO] separar transacciones y datos maestros en dos bases (`Readme.md:182`).
- Estado: no declara.
- Fuente: `Readme.md:170-192`.
- Completitud: parcial. [DEDUCCIÓN] De 7 servicios sin la capa de API (`Readme.md:173`) y ETL+Rewards juntos salen 6 quanta; [HUECO] el texto no explica por qué el acoplamiento síncrono (Profile→IAM, Rewards/Connections→Profile) no une más quanta.
- Contexto para contarlo: qué es un quantum de arquitectura; acoplamiento estático y dinámico; los servicios de Hey Blue!.
- Depende de imagen: sí (`Diagrams/quanta.png`).
- Verificado: [ ]

#### H05 · CQRS y eventos para que un servicio no tenga que pedirle todo a otro
- Idea: cuando varios servicios necesitan los mismos hechos, publicarlos como eventos evita endpoints de reporte y llamadas pesadas, a cambio de consistencia eventual.
- Lo que hizo el equipo: [DATO] El perfil se actualiza de dos formas: el usuario lo edita por un componente CRUD, y otros servicios lo cambian por eventos (una conexión registrada, puntos canjeados o donados), que Profile recibe de una cola o tópico (`ADR05:9-11`). [DATO] Esos cambios los aplica otro componente con su propio modelo de actualización (CQRS); el modelo de lectura del CRUD puede suscribirse a los mismos eventos para ser consistente con cambios pendientes (`ADR05:12`). [DATO] Profile guarda los eventos de Rewards y Connections como registros inmutables ligados a perfiles; Reporting obtiene otras representaciones de esos eventos desde Profile (`ADR05:15-16`, `Readme.md:289`).
- Razón declarada: [DATO] Pedir los datos de forma síncrona obliga a devolver mucho volumen y añade acoplamiento con endpoints extra para reportes (`ADR05:14`).
- Costo o trade-off admitido: [DATO] se renuncia a la atomicidad a favor de consistencia eventual; posible duplicación de datos y código; transacciones perdidas si un servicio cae (`ADR05:29-31`). [DATO] Riesgo general: probar flujos dirigidos por eventos entre varios servicios (`Readme.md:356`).
- Alternativas que nombra: [DATO] petición síncrona de Reporting a Profile (`ADR05:14`).
- Estado: Proposed (`ADR05:6`).
- Fuente: `ADRs/ADR05-CQRS-EventSourcing.md:6-31`, `Readme.md:210-216`, `Readme.md:287-292`.
- Completitud: completo.
- Contexto para contarlo: CQRS (modelo de escritura separado del de lectura); event sourcing; consistencia eventual; servicios Profile, Rewards, Connections, Reporting.
- Depende de imagen: no (la Figura 11 y 17 lo ilustran, pero el ADR se entiende sin ellas).
- Verificado: [ ]

#### H06 · La capa de API pública atiende solo a la app; los administradores van por otro camino
- Idea: una puerta de entrada única concentra autenticación, balanceo y monitoreo, y se puede decidir quién pasa por ella según quién es el usuario.
- Lo que hizo el equipo: [DATO] Todas las peticiones externas pasan por una capa de API en vez de conectarse a cada servicio (`Readme.md:162`, `ADR04:13`). [DATO] Esa capa solo sirve a clientes móviles públicos; los usuarios administrativos son "small fraction", tienen casos de uso distintos y mecanismos de identidad y control de acceso "significantly different", por lo que tienen APIs separadas (`Readme.md:168`). [DATO] En GCP, el API Gateway puede autenticar con Firebase Authentication, que "can completely stand in for" el servicio IAM descrito (`Readme.md:310`).
- Razón declarada: [DATO] solo un subconjunto de interfaces debe ser externo (`ADR04:7`); la capa resuelve concerns transversales (balanceo, logging, monitoreo, autenticación) y desacopla la UI de los servicios (`ADR04:17-18`).
- Costo o trade-off admitido: [DATO] sobrecarga de crear y mantener un servicio adicional; latencia añadida por el enrutamiento (`ADR04:22-23`).
- Alternativas que nombra: [DATO] que cada servicio exponga su funcionalidad directamente (`ADR04:7`).
- Estado: [Proposed] (`ADR04:10`).
- Fuente: `ADRs/ADR04-API-Layer.md:1-23`, `Readme.md:161-168`, `Readme.md:310-312`.
- Completitud: completo.
- Contexto para contarlo: qué es un API gateway; los dos tipos de usuario (app móvil y panel web administrativo, `Readme.md:124`).
- Depende de imagen: no (la Figura 8 lo ilustra).
- Verificado: [ ]

#### H07 · Detectar la cercanía en el teléfono o en el servidor
- Idea: la misma función (saber que un policía está cerca) puede vivir en el dispositivo o en el servidor; cada lugar cambia el costo de servidor, la batería y lo que la interfaz puede mostrar.
- Lo que hizo el equipo: [DATO] Describe dos formas: Bluetooth en el dispositivo, "similar to how Covid Tracking apps work", con servicios en segundo plano que buscan UUID cercanos y consultan al servidor; o cálculo de proximidad en el servidor (`Readme.md:251-257`). [DATO] Ventajas del servidor: el Bluetooth no tiene que estar siempre encendido y las ubicaciones se pueden mostrar en un mapa (`Readme.md:257-259`). [DATO] ADR07 decide usar notificaciones disparadas por el dispositivo y geofencing en servicios en segundo plano, junto con notificaciones del servidor; un servicio "beacon" en los dispositivos de policías y un servicio que escucha (`ADR07:11-17`).
- Razón declarada: [DATO] notificar sin intervención del servidor y bajar la carga de procesamiento del servidor (`ADR07:21-22`).
- Costo o trade-off admitido: [DATO] rendimiento y batería del móvil; no se ven usuarios cercanos en el mapa; la detección en servidor sigue siendo necesaria como respaldo (`ADR07:25-26`). [DATO] Los UUID Bluetooth se generan al azar, así que hay que mantener actualizado su mapeo con cuentas (`Readme.md:255`). [DATO] Requiere permisos específicos en Android e iOS además de ubicación y Bluetooth (`ADR07:11`).
- Alternativas que nombra: [DATO] proximidad calculada en el servidor (`Readme.md:257`, `ADR07:10`).
- Estado: Proposed (`ADR07:7`).
- Fuente: `Readme.md:250-268`, `ADRs/ADR07-Device-triggered-notifications.md:1-26`.
- Completitud: completo.
- Contexto para contarlo: cómo funciona Hey Blue! (el policía se pone disponible, el ciudadano se acerca); geofencing; servicio en segundo plano del móvil.
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · Buscar al policía más cercano en memoria, con una ventana de 15 minutos
- Idea: la parte más exigente del sistema se diseña aparte: conexiones abiertas en tiempo real, datos en memoria y una estructura pensada para la consulta que más se repite.
- Lo que hizo el equipo: [DATO] Connections Manager es "most intricate part"; cada instancia atiende varios códigos postales; tiene un Orchestrator que lleva el registro de websockets libres y ocupados y un Message Processor (`Readme.md:219-221`). [DATO] El policía se declara disponible durante una ventana de 15 minutos; el Orchestrator le da la URL de un websocket libre; la app envía la ubicación en cada cambio; el Message Processor la guarda en un grafo en memoria agrupado por geolocalización; para el ciudadano, busca al policía más cercano y le envía la ubicación y datos de perfil por el mismo canal; al vencer la ventana se cierra el websocket (`Readme.md:229-243`). [DATO] ADR06 propone memoria porque un procesador puede tener miles de sockets activos y la E/S a disco sería demasiado lenta; agrupar por código postal reduce el tiempo de búsqueda (`ADR06:13`). [DATO] Propone un grafo donde cada nodo se conecta con los más cercanos por distancia haversine, para bajar el costo de búsqueda a O(log n) (`ADR06:15-16`).
- Razón declarada: [DATO] latencia de búsqueda con miles de conexiones (`ADR06:13`, `ADR06:26`).
- Costo o trade-off admitido: [DATO] más memoria y hardware; insertar o quitar ubicaciones cuesta más que en una tabla (`ADR06:28-29`, `Readme.md:261`).
- Alternativas que nombra: [DATO] Memcached, Redis, RedisGraph (a evaluar en velocidad frente a implementación propia), búsqueda tabular (`ADR06:13`, `ADR06:15`, `ADR06:18`).
- Estado: Proposed (`ADR06:6`); la decisión dice "in memory cache and/or a graph data structure" (`ADR06:22`).
- Fuente: `Readme.md:218-264`, `ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md:1-29`.
- Completitud: parcial. [HUECO] La decisión no elige entre caché y grafo; [HUECO] el ADR llama "linear O(1) in the best case" a la búsqueda tabular (`ADR06:15`), notación que no coincide con "lineal"; [HUECO] `Readme.md:350` dice que Connections no tiene almacén persistente, mientras `Readme.md:233` habla de una "local database" del Orchestrator (no se dice si es persistente).
- Contexto para contarlo: websocket; en memoria frente a disco; el flujo de disponibilidad del policía.
- Depende de imagen: sí, para el detalle (`Diagrams/connection.png`, `Diagrams/connectionSeq.png`, `Diagrams/latlongGraph.png`).
- Verificado: [ ]

#### H09 · Elegir protocolos con su costo móvil a la vista
- Idea: el protocolo se elige por estándares y soporte de clientes, y el ADR deja escrito lo que esa elección no puede hacer en un teléfono.
- Lo que hizo el equipo: [DATO] REST sobre HTTP para peticiones síncronas y websockets para mensajes en las API públicas (`ADR03:20`). [DATO] Descartó SSE porque solo transmite del servidor al cliente; prefirió websockets a gRPC porque sus librerías cliente para móvil, escritorio y web están más disponibles (`ADR03:14-15`). [DATO] Menciona que Uber usa SSE en su plataforma RAMEN y busca pasar a gRPC (`ADR03:17`).
- Razón declarada: [DATO] estándares web, TLS, acceso por URL, soporte en todo framework de servidor (`ADR03:10`, `ADR03:25-28`).
- Costo o trade-off admitido: [DATO] las apps móviles no pueden mantener websockets en segundo plano; el usuario debe estar usando la app (`ADR03:32`); gRPC sobre HTTP/2 es "in theory" más rápido (`ADR03:33`).
- Alternativas que nombra: [DATO] SOAP, RPC, GraphQL; SSE, gRPC (`ADR03:12-14`).
- Estado: Proposed (`ADR03:7`).
- Fuente: `ADRs/ADR03-Rest-over-http-and-websockets.md:1-33`.
- Completitud: completo.
- Contexto para contarlo: websocket, SSE, gRPC en una frase cada uno.
- Depende de imagen: no.
- Verificado: [ ]
- [DEDUCCIÓN] El costo de ADR03 (sin websockets en segundo plano) es el mismo hueco que ADR07 cubre con servicios de fondo del sistema operativo (`ADR03:32`, `ADR07:11`); el texto no los enlaza explícitamente.

#### H10 · Identidad: usar un proveedor OpenID Connect antes que construirla
- Idea: para una organización sin fines de lucro, la identidad se compra hecha y se deja la puerta abierta a cambiarla si el costo sube.
- Lo que hizo el equipo: [DATO] Implementar registro y autenticación propios por contraseña es "optional and not recommended"; recomienda registrar el servicio con un proveedor OpenID Connect en la nube y usar una librería cliente OIDC (`Readme.md:197-198`). [DATO] Hey Blue! podría implementar su propio OpenID Connect más tarde "if it becomes cost prohibitive" (`Readme.md:199`). [DATO] Inicio de sesión con redes sociales; verificación del teléfono con contraseña de un solo uso por un proveedor SMS externo; el teléfono asocia la cuenta a un único dispositivo (`Readme.md:200-203`). [DATO] En GCP, Firebase Authentication "can completely stand in for" el IAM (`Readme.md:310`).
- Razón declarada: no declara más allá de no recomendado y el costo como motivo de un cambio futuro.
- Costo o trade-off admitido: [DATO] posible costo prohibitivo del proveedor (`Readme.md:199`).
- Alternativas que nombra: [DATO] componente propio de contraseñas; OIDC propio (`Readme.md:197-199`).
- Estado: no declara (no hay ADR).
- Fuente: `Readme.md:196-208`, `Readme.md:310`.
- Completitud: parcial. Falta la razón explícita para no construirla.
- Contexto para contarlo: qué es OpenID Connect y un proveedor de identidad gestionado.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Hexagonal para servir vistas distintas del mismo dato
- Idea: separar el núcleo de un servicio de sus interfaces permite dar a cada consumidor solo la parte de los datos que necesita y probar el servicio sin dependencias externas.
- Lo que hizo el equipo: [DATO] Diseña cada microservicio con el patrón hexagonal (`ADR02:14`). [DATO] Ejemplo: cuando un ciudadano pide conectarse con un policía, solo ve un subconjunto del perfil (nombre, foto, número de conexiones) (`ADR02:10`). [DATO] La definición de interfaces pasa a ser "an extrinsic configuration concern" (`Readme.md:104`).
- Razón declarada: [DATO] varias vistas de los mismos datos; cada servicio dueño de sus datos los simula en pruebas sin interfaces externas (`ADR02:10-11`).
- Costo o trade-off admitido: [DATO] más esfuerzo al soportar varias interfaces para la misma funcionalidad; andamiaje adicional (`ADR02:23-24`).
- Alternativas que nombra: no declara.
- Estado: Proposed (`ADR02:6`).
- Fuente: `ADRs/ADR02-Hexagonal-microservices.md:1-24`, `Readme.md:104`.
- Completitud: parcial. Faltan alternativas.
- Contexto para contarlo: arquitectura hexagonal (puertos y adaptadores). [DATO] El README usa "ports" para los componentes internos y "adapters" para las interfaces (`Readme.md:104`).
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Restricciones del negocio que achican el sistema
- Idea: un supuesto acordado con el cliente (no procesar pagos) saca del alcance toda una parte del sistema, y el modelo de financiación convierte el costo en característica implícita.
- Lo que hizo el equipo: [DATO] El sistema no procesa transacciones financieras: solo genera vales y cupones verificables; la compra ocurre en el comercio (`Readme.md:63`). [DATO] Las organizaciones benéficas cobran fuera del sistema (`Readme.md:64`). [DATO] El costo es característica implícita por ser un proyecto sin fines de lucro (`Readme.md:85-86`); el negocio se sostiene con marketing de afiliados (`Readme.md:60`).
- Razón declarada: [DATO] lo mencionó el fundador en la discusión inicial (`Readme.md:63`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara (supuesto).
- Fuente: `Readme.md:57-64`, `Readme.md:85-86`.
- Completitud: ilustrativo.
- Contexto para contarlo: el modelo de puntos de Hey Blue!.
- Depende de imagen: no.
- Verificado: [ ]

#### H13 · Elegir tres características y bajar la disponibilidad
- Idea: priorizar obliga a dejar cualidades fuera del top y decir por qué; en un sistema no crítico, la caída cuesta poco.
- Lo que hizo el equipo: [DATO] De seis características (Scalability, Portability, Upgradeability, Extensibility, Performance, Availability) marca tres como top: Scalability, Extensibility, Performance (`Readme.md:71-78`). [DATO] Seguridad, usabilidad y costo son implícitas (`Readme.md:80-86`). [DATO] Reliability: "While the system is not mission critical, and cost of downtime is low", aunque debe ser confiable para no interrumpir a usuarios (`Readme.md:89`); Recoverability: volver a un estado consistente tras una caída (`Readme.md:91`).
- Razón declarada: [DATO] una por fila en la tabla (`Readme.md:73-78`); p. ej., escalabilidad por "millions of geographically distributed users" (`Readme.md:73`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: las otras características de la tabla.
- Estado: no declara.
- Fuente: `Readme.md:66-91`.
- Completitud: parcial. [HUECO] La disponibilidad aparece en la tabla con needs to be available at all times (`Readme.md:78`) pero no está en el top; no se explica por qué quedó fuera más allá de la nota de Reliability.
- Contexto para contarlo: qué es una característica de arquitectura.
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · Estimación de costo mensual para 50 000 usuarios activos
- Idea: un costo aproximado por servicio, con sus supuestos de uso, sirve para hablar con un cliente sin fines de lucro antes de construir.
- Lo que hizo el equipo: [DATO] Advierte que el costo real solo se conoce tras construir y montar los servicios (`Readme.md:327`). [DATO] Estimación para 50 000 MAU: API Gateway $450 (3000 llamadas por usuario al mes, $3 por millón); Cloud Run ~$1000 (~$50 × 20 instancias); Cloud SQL $1260 (".035/GB/Hr" en el texto, con 50 GB, `Readme.md:338`); Pub/Sub Lite ~$70 (`Readme.md:329-341`). Total escrito: "450 + 1000 + 1260 = $2780" (`Readme.md:344`).
- Razón declarada: [DATO] obtenido con calculadoras de precios por servicio (`Readme.md:329`).
- Costo o trade-off admitido: no aplica.
- Alternativas que nombra: [DATO] alternativas en Azure y AWS para Cloud Run, API Gateway, Pub/Sub, BigQuery y Cloud Data Fusion (`Readme.md:306-324`); esas líneas no dan alternativa para Cloud SQL.
- Estado: no declara.
- Fuente: `Readme.md:300-344`.
- Completitud: parcial. [DEDUCCIÓN] 450 + 1000 + 1260 = 2710; 2780 es la suma si se agregan los $70 de Pub/Sub Lite, que no figuran en la fórmula escrita. [HUECO] No se costean BigQuery ni Cloud Data Fusion, que aparecen en el despliegue (`Readme.md:318-324`).
- Contexto para contarlo: el despliegue en GCP (Cloud Run, Pub/Sub, API Gateway).
- Depende de imagen: no para las cifras; sí para el despliegue (`Diagrams/gcp.png`).
- Verificado: [ ]

#### H15 · Evaluar la arquitectura contra sus características y nombrar riesgos
- Idea: cerrar el diseño volviendo a las características elegidas, diciendo cómo se prueba cada una y qué no se puede probar.
- Lo que hizo el equipo: [DATO] Escalabilidad: servicios sin estado; pruebas contra clústeres de staging con tráfico simulado (`Readme.md:350`). Rendimiento: partición de datos y servicios y evitar transacciones distribuidas; cada servicio se mide por separado (`Readme.md:351`). Extensibilidad: "it is difficult to test a system for extensibilty"; hace falta adherirse a bajo acoplamiento y alta cohesión (`Readme.md:352`). [DATO] Riesgos: las bases de datos pueden ser cuello de botella para escalar horizontalmente (mitigación: bases serverless, sharding, replicación); testabilidad de flujos dirigidos por eventos entre servicios (`Readme.md:355-356`). [DATO] Las fitness functions deberían correr en CI/CD (`Readme.md:347`).
- Razón declarada: no aplica.
- Costo o trade-off admitido: [DATO] los dos riesgos citados.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `Readme.md:346-356`.
- Completitud: parcial. [HUECO] No hay umbrales ni fitness functions concretas.
- Contexto para contarlo: qué es una fitness function.
- Depende de imagen: no.
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `markdownCheatSheet.md`: hoja de sintaxis Markdown genérica de markdownguide.org; no trata del caso.
- `ADRs/ADRTemplate.md`: plantilla vacía de ADR.
- `.gitignore` y `Diagrams/.DS_Store`: archivos de herramienta.
- `Readme.md:268` (nombres de clases `UNNotificationTrigger` y `Service`): detalle de implementación de plataforma que no cambia la decisión.
- `Readme.md:366-376` (referencias): lista de libros; el enlace de "Architecture: The Hard Parts" apunta a la página de arquitectura hexagonal (`Readme.md:374`).

## 6. Imágenes para fase 2

- `Diagrams/characteristics.png`: tabla de estilos de arquitectura puntuados con estrellas frente al top 3 (Figura 1, `Readme.md:109-114`). Necesaria para H02.
- `Diagrams/blackbox.png`: actores y casos de uso del contexto (Figura 2, `Readme.md:126-127`).
- `Diagrams/domainEvents.png`: eventos de dominio del event storming (Figura 3, `Readme.md:133-134`).
- `Diagrams/commandsAndActors.png`: comandos, actores y agregados (Figura 4, `Readme.md:137-138`).
- `Diagrams/automationPolicies.png`: políticas de automatización y bounded contexts (Figura 5, `Readme.md:141-142`).
- `Diagrams/modmono.png`: monolito modular con un módulo por bounded context (Figura 6, `Readme.md:149-150`).
- `Diagrams/containers.png`: contenedores de servicio y actores, sin acoplamiento síncrono (Figura 7, `Readme.md:156-159`).
- `Diagrams/apiLayer.png`: capa de API solo para clientes móviles (Figura 8, `Readme.md:164-168`).
- `Diagrams/quanta.png`: acoplamiento, bases propias y compartidas, 6 quanta con líneas punteadas (Figura 9, `Readme.md:178-192`). Necesaria para H04.
- `Diagrams/connection.png` y `Diagrams/connectionSeq.png`: Connections Manager y su diagrama de secuencia (Figuras 12 y 13, `Readme.md:223-248`).
- `Diagrams/latlongGraph.png`: grafo de geolocalizaciones (Figura 14, `Readme.md:263-264`).
- `Diagrams/gcp.png` (y su fuente `gcp.excalidraw`): despliegue en GCP (Figura 19, `Readme.md:303-304`).
- `Diagrams/IAM.png`, `profile.png`, `rewards.png`, `etl.png`, `reporting.png`, `social.png`: componentes internos de cada servicio (Figuras 10, 11, 15-18). Secundarias.
- `Diagrams/1p.png`: imagen de portada sin pie (`Readme.md:5`); contenido desconocido.

## 7. Preguntas abiertas

- Qué estilos y puntajes contiene la tabla de la Figura 1 (solo en `characteristics.png`).
- Cuáles son los 7 servicios y qué líneas punteadas definen los 6 quanta (solo en `quanta.png` y `containers.png`).
- Si el acoplamiento síncrono Profile→IAM y Rewards/Connections→Profile se considera al contar quanta (`Readme.md:185-192`).
- Si el Orchestrator de Connections tiene un almacén persistente (`Readme.md:233` frente a `Readme.md:350`).
- Qué quiso decir ADR06 con "linear O(1) in the best case" para la búsqueda tabular (`ADR06:15`).
- Si el total de costos $2780 incluye Pub/Sub Lite (la fórmula escrita da $2710, `Readme.md:344`).
- Qué dice el documento de requisitos externo (Google Doc, `Readme.md:56`); no está en el repositorio.
- Qué contiene `gcp.excalidraw` más allá de lo que muestra `gcp.png`.
