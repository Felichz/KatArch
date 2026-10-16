# Ficha · monArch · Hey Blue! (Otoño 2022)

Fuente: repositorio `MonArch-src` (10 archivos de texto). Las rutas entre paréntesis son relativas a la raíz del repo. Marcas: `[DATO]` lo que el repo dice; `[DEDUCCIÓN]` lo que se infiere (se explica de qué); `[HUECO]` lo que el repo no dice o deja sin resolver.

## 1. El caso

Hey Blue! es una iniciativa de John Verdi, ex policía y cofundador de la ONG EcoSchool (Readme.md, Introduction) `[DATO]`. Pide una app móvil que acerca a oficiales y ciudadanos: registra conexiones cuando están cerca, presenciales o virtuales, y premia cada conexión con puntos de valor monetario, en forma de descuentos o de donaciones a caridad (Readme.md, Introduction) `[DATO]`. El Readme sitúa el centro del problema en la conexión en tiempo real entre un ciudadano y un oficial cercano, con escalado a "millions of geographically distributed users" (Readme.md, Driving Characteristics; Connections Manager) `[DATO]`; que ese sea el problema central es `[DEDUCCIÓN]`, por el peso que el Readme le da al componente Connections ("the most intricate part of the system", Readme.md, Connections Manager). Restricciones: proyecto greenfield sin infraestructura previa (Readme.md, Technical Constraints) `[DATO]`; organización sin fines de lucro, financiada con subvenciones y patrocinios, con un modelo de afiliación de marketing (Readme.md, Business Constraints) `[DATO]`; el sistema no procesa transacciones financieras, solo genera cupones verificables al canjear puntos (Readme.md, Assumptions) `[DATO]`. La única cifra de volumen es una estimación para 50.000 usuarios activos mensuales (Readme.md, Cost Analysis) `[DATO]`. Regulación: no nombra norma; exige cifrado en tránsito y en reposo, de-identificación y políticas zero-trust (Readme.md, Implicit Characteristics) `[DATO]`. Plazos y presupuesto: no declara. El documento de requisitos es un enlace externo a Google Docs, no está en el repo `[HUECO]` (Readme.md, Requirements).

## 2. Qué entregó el equipo

- `Readme.md`: documento principal. Contiene caso, características de arquitectura, enfoque, contexto (actores, casos de uso, event storming), contenedores, componentes, despliegue, costos, evaluación y riesgos, e índice de ADR `[DATO]`. No hay otros documentos de requisitos ni de arquitectura en el repo `[DATO]`.
- `ADRs/ADR01` a `ADRs/ADR07`: 7 ADR. Todos tienen estado "Proposed" (ADR04 lo escribe entre corchetes); ninguno aparece como Accepted `[DATO]`.
- `ADRs/ADRTemplate.md`: plantilla de ADR, no cuenta como decisión `[DATO]`.
- `Diagrams/`: 20 PNG (uno por cada una de las 19 figuras numeradas del Readme, más `1p.png` de portada) y `gcp.excalidraw`, fuente editable del diagrama de despliegue (Readme.md, Figuras 1 a 19) `[DATO]`. Imágenes no leídas `[HUECO]`.
- Tipos de diagrama, según la lista de figuras del Readme `[DATO]`: gráfico de características (Fig. 1); contexto y casos de uso (Fig. 2); event storming en tres pasos (Fig. 3 a 5); monolito modular (Fig. 6); contenedores (Fig. 7); capa de API (Fig. 8); acoplamiento y quanta (Fig. 9); componentes por servicio (Fig. 10 a 12, 15 a 18); secuencia del flujo de conexión (Fig. 13); grafo de geolocalización (Fig. 14); despliegue en GCP (Fig. 19).
- `markdownCheatSheet.md`: hoja de referencia de Markdown genérica, no es un artefacto del equipo `[DATO]`.
- Event storming: sí, descrito en el Readme (Readme.md, Event Storming) `[DATO]`.
- C4: el Readme dice usar el modelo C4 y describe contexto, contenedores y componentes (Readme.md, Architecture Approach) `[DATO]`.
- Fitness functions: se proponen "ideally as part of the CI/CD pipeline" (Readme.md, Evaluation) `[DATO]`. El repo no contiene código, pruebas ni configuración de CI `[HUECO]` (árbol del clon en `MonArch`, commit HEAD).
- OKR, historias de usuario, glosario y topología de equipos: no aparecen `[HUECO]`.
- Estimación de costo mensual en GCP con fórmulas por servicio (Readme.md, Cost Analysis) `[DATO]`.
- Riesgos: dos riesgos declarados (Readme.md, Evaluation, Risks) `[DATO]`.
- Equipo: tres integrantes nombrados en el Readme (Readme.md, encabezado) `[DATO]`.
- Historia: 33 commits en el clon hermano, del 2022-11-09 al 2023-03-10. Los archivos de ADR se agregan en f160de4 (2022-11-09, "initial commit") y en 4ed6b4e (2022-11-28, "most TODOs done, updated diagrams") (`git log` en `MonArch`) `[DATO]`.

## 3. Decisiones

Estado de los 7 ADR: Proposed (ADRs/ADR01 a ADR07) `[DATO]`.

| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas |
|---|---|---|---|---|---|
| ADR01 (ADRs/ADR01-Microservices-architecture.md) | `[DATO]` Modelar Hey Blue! con arquitectura de microservicios. | no declara | `[DATO]` Bajo acoplamiento y alta cohesión, separación de responsabilidades y principios de DDD; da una hoja de ruta para la evolución del sistema y permite separar en procesos propios los componentes muy usados (Rationale; Consequences, Positive). | `[DATO]` Duplicación de datos y de código; difícil ejecutar rápido si se sigue la arquitectura estrictamente y cada servicio se desarrolla desde cero (Consequences, Negative). | microservicios, DDD, evolutividad, escalabilidad |
| ADR02 (ADRs/ADR02-Hexagonal-microservices.md) | `[DATO]` Diseñar los microservicios con arquitectura hexagonal. | no declara | `[DATO]` Permite varias interfaces por componente, por ejemplo mostrar a un ciudadano solo parte del perfil de un oficial; cada servicio es dueño de sus datos y puede simularlos para probar (Rationale). | `[DATO]` Más esfuerzo de desarrollo para soportar varias interfaces de una misma funcionalidad; requiere scaffolding adicional del framework (Consequences, Negative). | hexagonal, testabilidad |
| ADR03 (ADRs/ADR03-Rest-over-http-and-websockets.md) | `[DATO]` Usar REST sobre HTTP para las APIs síncronas y websockets para los mensajes, en las APIs públicas. | `[DATO]` SOAP, RPC y GraphQL frente a REST; server-sent events y gRPC frente a websockets (Rationale). | `[DATO]` Protocolos web estándar; REST es la abstracción de más alto nivel que no supone nada del sistema subyacente; los clientes websocket tienen más soporte en frameworks que gRPC (Rationale). | `[DATO]` Las apps móviles no pueden mantener websockets en servicio de fondo: el usuario debe estar usando la app; gRPC sobre HTTP/2 sería más rápido en teoría (Consequences, Negative). | otro: REST-y-websockets, rendimiento-latencia |
| ADR04 (ADRs/ADR04-API-Layer.md) | `[DATO]` Usar una capa de API como interfaz pública unificada del sistema. | no declara | `[DATO]` Solo algunas interfaces de cada servicio deben ser accesibles desde fuera; la capa centraliza concerns transversales (balanceo, logs, monitoreo, autenticación) y desacopla la UI de los servicios (Rationale; Consequences, Positive). | `[DATO]` Overhead de desarrollo y mantenimiento de un servicio más; mayor latencia por el ruteo (Consequences, Adverse). | API-gateway, observabilidad, seguridad |
| ADR05 (ADRs/ADR05-CQRS-EventSourcing.md) | `[DATO]` Aplicar CQRS a las actualizaciones de perfil por mensajes (conexiones, canje y donación de puntos) y event sourcing a los eventos transaccionales que consumen varios servicios. | `[DATO]` Consulta síncrona de Reporting al servicio de Profile; descartada por el volumen de datos y el acoplamiento que agrega (Rationale). | `[DATO]` Las actualizaciones de perfil llegan de otros servicios; Reporting necesita datos de varios servicios; se elige consistencia eventual en lugar de atomicidad (Rationale). | `[DATO]` Se renuncia a la atomicidad; posible duplicación de datos y de código; transacciones que se pierden si un servicio cae (Consequences, Negative). | CQRS, event-sourcing, event-driven, cola-de-mensajes |
| ADR06 (ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md) | `[HUECO]` Redactada como pregunta ("Will we use an in memory cache and/or a graph data structure..."): caché en memoria y/o estructura de grafo para hallar al oficial disponible más cercano. | `[DATO]` Tabla con búsqueda lineal; Memcached y Redis como bases en memoria; RedisGraph, a evaluar contra implementación propia en velocidad (Rationale). | `[DATO]` Un procesador de mensajes puede tener miles de sockets activos y el I/O de disco sería demasiado lento; el grafo baja el costo de búsqueda frente a la tabla y la agrupación por código postal lo reduce más (Rationale). | `[DATO]` Más memoria y hardware; el grafo encarece agregar o quitar ubicaciones frente a una tabla (Consequences, Negative). | cache, rendimiento-latencia, costo |
| ADR07 (ADRs/ADR07-Device-triggered-notifications.md) | `[DATO]` Usar notificaciones disparadas por el dispositivo y APIs de geofencing en servicios de fondo instalados con la app. | `[DATO]` Detección de proximidad en el servidor, que el ADR usa como respaldo (Consequences, Negative). El Readme compara además la detección por Bluetooth (Readme.md, Proximity Detection). | `[DATO]` Disparar avisos de proximidad sin intervención del servidor y bajar su carga de procesamiento (Consequences, Positive). | `[DATO]` Servicios de fondo que afectan rendimiento y batería; permisos adicionales; no permite mostrar usuarios cercanos en el mapa, por eso el servidor sigue como respaldo (Rationale; Consequences, Negative). | otro: geofencing, otro: notificaciones-en-dispositivo |

## 4. Patrones y prácticas presentes

- **microservicios** `[DATO]`: siete componentes (IAM, Profile, Connections, Rewards, ETL, Reporting, Social Media API) más la capa de API (Readme.md, Components; ADRs/ADR01-Microservices-architecture.md). El número de contenedores que declara el Readme no cuadra (ver §7).
- **monolito-modular** `[DATO]`: el Readme lo declara "viable" para prototipar un MVP a menor costo, con cada contexto acotado como módulo. No se decide por él (Readme.md, Goals y Modular Monolith).
- **DDD** `[DATO]`: contextos acotados y agregados salen del event storming (Readme.md, Event Storming). ADR01 invoca los principios de DDD (ADRs/ADR01-Microservices-architecture.md, Rationale).
- **event-storming** `[DATO]`: eventos de dominio, comandos, actores, agregados y políticas de automatización. Las políticas definen la comunicación asíncrona entre contextos (Readme.md, Event Storming, Figuras 3 a 5).
- **C4** `[DATO]`: caja negra con actores y casos de uso, luego contenedores y componentes por servicio (Readme.md, Architecture Approach, Context, Containers, Components).
- **hexagonal** `[DATO]`: cada componente expone uno o más adaptadores, y los puertos pueden cambiar sin alterar la interfaz (Readme.md, Goals; ADRs/ADR02-Hexagonal-microservices.md).
- **event-driven** `[DATO]`: Profile consume eventos de Rewards y Connections; Reporting consume eventos de Profile (Readme.md, Dynamic Coupling).
- **CQRS** y **event-sourcing** `[DATO]`: Profile tiene un modelo de actualización propio para eventos de otros servicios y guarda esos eventos como registros inmutables ligados al perfil (ADRs/ADR05-CQRS-EventSourcing.md, Rationale y Decision).
- **API-gateway** `[DATO]`: entrada única para los clientes móviles públicos. En el despliegue de ejemplo, el API gateway de GCP hace autenticación, ruteo, monitoreo y trazas, y Firebase podría reemplazar al servicio IAM (Readme.md, API Layer y Deployment).
- **otro: APIs-separadas-por-audiencia** `[DATO]`: la capa de API atiende solo a clientes móviles. Administradores y organizaciones usan APIs y un dashboard propios (Readme.md, API Layer, Note).
- **db-por-servicio** `[DATO]`: principio declarado de que cada servicio es dueño de sus datos (ADRs/ADR02-Hexagonal-microservices.md, Rationale).
- **db-compartida** `[DATO]`: ETL y Rewards comparten base de datos, y es lo que une sus quanta. El Readme dice que el diagrama muestra dos bases separadas "for clarity and semantic reasons" y que separarlas no reduciría el acoplamiento de contrato (Readme.md, Static Coupling).
- **cache** `[DATO]`: grafo de ubicaciones de oficiales en memoria, agrupado por código postal, para la búsqueda de proximidad (ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md; Readme.md, Location Tracking).
- **cola-de-mensajes** `[DATO]`: Pub/Sub para colas y topics asíncronos. Hay un topic "Established connections" (Readme.md, Deployment; Establishing Connection).
- **escalabilidad** `[DATO]`: Connections es "horizontally scalable", cada instancia atiende varios códigos postales, y se diseña sin estado (Readme.md, Connections Manager; Evaluation).
- **contenedores**, **serverless**, **cloud-gestionada** `[DATO]`: Cloud Run para Connections, Profile, Rewards y el dashboard de administración. El Readme describe Cloud Run como producto serverless para aplicaciones en contenedor (Readme.md, Deployment). ADR01 dice que los microservicios pueden ir en serverless si son contenedores sin estado (ADRs/ADR01-Microservices-architecture.md, Rationale).
- **batch-analytics** `[DATO]`: Reporting mantiene un data warehouse con OLAP y jobs de agregación y reporte. En el despliegue de ejemplo, BigQuery (Readme.md, Reporting and Analytics; Deployment).
- **seguridad**, **zero-trust**, **privacidad-GDPR** `[DATO]`: cifrado en tránsito y en reposo, de-identificación de datos personales y políticas zero-trust para el acceso de desarrollo, administración y negocio (Readme.md, Implicit Characteristics). No nombra ninguna norma.
- **observabilidad** `[DATO]`: el API gateway ofrece logging, monitoreo, alertas y trazas (Readme.md, Deployment).
- **testabilidad** `[DATO]`: cada servicio mockea sus propios datos sin interfaces externas (ADRs/ADR02-Hexagonal-microservices.md, Rationale). Riesgo declarado: probar flujos distribuidos (Readme.md, Risks).
- **evolutividad** `[DATO]`: Extensibility está entre las tres características marcadas, y el Readme la evalúa con microservicios, event-driven y serverless (Readme.md, Driving Characteristics; Evaluation).
- **costo** `[DATO]`: estimación mensual en GCP, con fórmulas por servicio (Readme.md, Cost Analysis). ADR06 agrega costo de memoria.
- **fitness-functions** `[DATO]` propuestas; `[HUECO]` sin implementar en el repo (Readme.md, Evaluation).
- **ADR** `[DATO]`: 7 ADR en `ADRs/`, con plantilla propia (ADRs/ADRTemplate.md).
- **supuestos-explicitos** `[DATO]`: sección Assumptions del caso de negocio (Readme.md, Business Case).
- **fuera-de-alcance-explicito** `[DATO]`: "The system does not support financial transactions" (Readme.md, Assumptions).
- **riesgos-explicitos** `[DATO]`: dos riesgos, bases de datos como cuello de botella y testabilidad de flujos distribuidos (Readme.md, Risks).
- **tradeoffs-explicitos** `[DATO]`: en el Readme (Microservices y performance; Proximity Detection) y en la sección Negative de cada ADR.
- **otro: REST-y-websockets** `[DATO]`: protocolo de las APIs públicas (ADRs/ADR03-Rest-over-http-and-websockets.md).
- **otro: geofencing** y **otro: notificaciones-en-dispositivo** `[DATO]`: servicios de fondo en el dispositivo para los avisos de proximidad (ADRs/ADR07-Device-triggered-notifications.md).
- **resiliencia-fallos** `[DATO]` requisito de recuperación "in a consistent state"; `[HUECO]` no declara mecanismo (Readme.md, Others Considered).
- **disponibilidad-HA** `[DATO]` requisito "availiable at all times", no priorizado (Readme.md, Driving Characteristics).
- **otro: portabilidad** `[DATO]`: requisito de evitar lock-in, no priorizado; el Readme lista alternativas de Azure y AWS por servicio (Readme.md, Driving Characteristics; Deployment).

## 5. Cómo llegan de los requisitos a la arquitectura

Cadena parcial `[HUECO]`.

- Dentro del Readme sí hay un enlace: el apartado de evaluación asocia Scalability con servicios sin estado y con Connections sin almacenamiento persistente; Performance con la partición de datos y servicios y el evitar transacciones distribuidas; Extensibility con microservicios, event-driven y serverless (Readme.md, Evaluation) `[DATO]`.
- Los ADR no citan características ni requisitos, y no tienen identificadores de requisito (ADRs/ADR01 a ADR07) `[DATO]`. Los ADR sí quedan enlazados desde el Readme por ruta, en cada componente (Readme.md, Components).
- El requisito de origen está en un documento externo que no se leyó (Readme.md, Requirements) `[HUECO]`. Por eso no se puede seguir la cadena requisito → característica → decisión dentro del repo.
- Características de arquitectura: 11 en total `[DATO]` (Readme.md, Architecture Characteristics). Seis de conducción, de las cuales se marcan tres: Scalability, Extensibility y Performance. Las no marcadas son Portability, Upgradeability y Availability. Tres implícitas: Security, Usability y Cost. Dos consideradas: Reliability y Recoverability.
- El orden entre las tres marcadas no se declara `[HUECO]`. La tabla las lista en el orden de conducción y no las ordena por prioridad.
- Sin decisión trazable en el repo `[DEDUCCIÓN]`: Security (solo requisito y menciones de cifrado y zero-trust); Usability (sin decisión); Availability (requisito sin ADR); Recoverability (sin mecanismo declarado); Portability y Upgradeability (sin ADR, con alternativas de nube por servicio). Solo Scalability, Extensibility y Performance tienen evaluación en el Readme (Readme.md, Evaluation).
- La Figura 1 compara estilos contra las tres características marcadas, y el texto dice que coincidan los estilos elegidos con esas tres es "incidental" (Readme.md, Architecture Approach). La imagen no se leyó `[HUECO]`.

## 6. Lo distintivo

**6.1 Monolito modular como etapa válida, microservicios como medio.** Hecho: el Readme dice que la arquitectura "is not meant to be prescriptive" y que el sistema podría construirse como monolito modular para prototipar el MVP "at a reduced overall cost of development" (Readme.md, Goals) `[DATO]`. Aun así elige microservicios (ADRs/ADR01-Microservices-architecture.md, Decision). Qué cuesta: duplicación de datos y código, y desarrollo lento si se sigue la arquitectura estrictamente (ADRs/ADR01, Negative) `[DATO]`. Qué no justifica: el repo no explica por qué empezar por microservicios en lugar de la etapa que el propio Readme llama viable `[HUECO]`.

**6.2 Connections aislado y sin estado, con el grafo de oficiales en memoria.** Hecho: Connections "is therefore designed to be stateless with no associated persistent data store" (Readme.md, Evaluation); escala por instancia con varios códigos postales (Readme.md, Connections Manager); el lookup usa un grafo en memoria (ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md). El Readme justifica el aislamiento con la penalización de rendimiento de los microservicios: se aísla lo que tiene requisitos de rendimiento mucho más altos (Readme.md, Architecture Approach). Qué cuesta: más memoria y hardware, y un grafo que encarece cada alta o baja de ubicación (ADRs/ADR06, Negative) `[DATO]`. Contradicción de almacenamiento en §7 (C1).

**6.3 Dos mecanismos de proximidad comparados por escrito.** Hecho: el Readme enumera la detección por Bluetooth y la detección en servidor, y da dos ventajas de la segunda: no requiere Bluetooth activo todo el tiempo y permite mostrar a ambos en un mapa (Readme.md, Proximity Detection) `[DATO]`. ADR07 elige avisos disparados por el dispositivo con geofencing y deja el servidor como respaldo (ADRs/ADR07-Device-triggered-notifications.md). Qué cuesta: consumo de batería, permisos adicionales y ningún mapa de usuarios cercanos en el dispositivo (ADR07, Negative) `[DATO]`. Qué no declara: cuál de los dos mecanismos es el principal en el MVP `[HUECO]`.

**6.4 Consistencia eventual admitida para puntos y conexiones.** Hecho: ADR05 usa CQRS para las actualizaciones de perfil y event sourcing solo para los eventos que consumen varios servicios, y declara "eventual consistency rather than atomicity" (ADRs/ADR05-CQRS-EventSourcing.md, Rationale) `[DATO]`. Qué cuesta: transacciones que se pierden si un servicio cae (ADR05, Negative) `[DATO]`. El repo no declara cómo se recupera un evento perdido `[HUECO]`.

**6.5 Alcance cerrado: sin pagos, solo cupones verificables.** Hecho: "The system does not support financial transactions." La compra ocurre en el sistema del comercio o en tienda. El sistema solo genera cupones verificables al canjear puntos. Las donaciones de valor monetario a caridades se hacen fuera del sistema, y los comercios deben ofrecer esa vía (Readme.md, Assumptions) `[DATO]`. La suposición tiene origen declarado: "mentioned by the founder in the initial discussion" (Readme.md, Assumptions) `[DATO]`. Qué no declara: cómo se verifica un cupón en tienda `[HUECO]`.

## 7. Huecos, inconsistencias y cosas fuera de alcance

**Fuera de alcance o futuro, declarados**
- Sin transacciones financieras; la compra es en el sistema del comercio o en tienda (Readme.md, Assumptions) `[DATO]`.
- Donaciones a caridad redimidas fuera del sistema (Readme.md, Assumptions) `[DATO]`.
- Implementar un OpenID Connect propio "may later" (Readme.md, Identity and Access Manager) `[DATO]`.
- Carga masiva de cuentas de oficiales desde TI de los precintos, descrita como "another possible use case" (Readme.md, ETL Manager) `[DATO]`.
- Mostrar usuarios cercanos en el mapa, no posible con detección en el dispositivo (ADRs/ADR07, Negative) `[DATO]`.
- Gamificación del Introduction (trofeos virtuales, citas, animaciones) no aparece en ningún componente ni ADR `[HUECO]` (Readme.md, Introduction; Components).

**Contradicciones entre fuentes**
- **C1 Almacenamiento de Connections.** Readme.md, Evaluation: Connections "designed to be stateless with no associated persistent data store". Readme.md, Connections Manager (Location Tracking): el Orchestrator "creates a record of a busy connection in it's local database". Puede ser memoria, pero no lo dice `[HUECO]`.
- **C2 Disponibilidad.** Readme.md, Driving Characteristics: "The system needs to be availiable at all times". Readme.md, Others Considered: "not mission critical, and cost of downtime is low". Availability no está priorizada y no tiene decisión asociada `[HUECO]`.
- **C3 Publicación en redes.** Readme.md, Introduction: las conexiones "are recorded and shared on social media". Readme.md, Coupling: el Social Media API "is invoked directly from admin dashboards". No declara si la publicación es automática o manual `[HUECO]`.
- **C4 Websockets en segundo plano.** ADRs/ADR03, Negative: "The users will need to be actively using the app for a websocket connection". Readme.md, Location Tracking, y ADRs/ADR07 (servicios de fondo): el flujo de ubicación por websocket y la ventana de 15 minutos no dicen qué ocurre con la app en segundo plano `[HUECO]`.
- **C5 Seguridad de sesión.** Readme.md, Implicit Characteristics: datos "secured in transit and at rest". Readme.md, Identity and Access Manager: el token de sesión "should be part of the URI for all post authentication requests", "will only expire if the user explicitly logs out", y se guarda un refresh token. El repo no discute el riesgo de un token en la URL ni de su expiración `[HUECO]`.
- **C6 Suma de costos.** Readme.md, Cost Analysis: "450 + 1000 + 1260 = $2780". Esa suma da 2710. La diferencia de 70 coincide con el costo de Pub/Sub Lite, que aparece en el total pero no en la suma escrita `[DATO]` para la cifra; la atribución de los 70 a Pub/Sub Lite es `[DEDUCCIÓN]`.
- **C7 Complejidad de búsqueda.** ADRs/ADR06, Rationale: "linear O(1) in the best case". Lineal y O(1) no pueden referirse a la misma búsqueda; el ADR compara después con O(log n) `[DATO]`.
- **C8 Conteo de contenedores.** Readme.md, Coupling: "8 distinct containers including the API layer". Readme.md, Coupling: Social Media API "trivial enough not warrant it's own Microservice". La cuenta depende de la Figura 7 o 9, que no se leyó `[HUECO]`.
- **C9 Escala.** Readme.md, Driving Characteristics: "millions of geographically distributed users". Readme.md, Cost Analysis: el único cálculo es para 50.000 usuarios activos mensuales. No hay estimación para la escala declarada `[HUECO]`.

**Cifras y supuestos sin fuente en el Readme (Cost Analysis)**
- "~$50 * 20 Instances" para Cloud Run: no explica de dónde salen 50 dólares por instancia ni por qué 20 `[HUECO]`.
- "3000 calls per month per user": sin fuente `[HUECO]`.
- Cloud SQL aparece solo en el costo, no en el texto de despliegue (Readme.md, Deployment) `[HUECO]`.
- Pub/Sub Lite en el costo y Pub/Sub en el despliegue, sin explicación `[HUECO]`.
- Sin costo: BigQuery, Cloud Data Fusion, Firebase, el servicio de notificaciones y las demás piezas no listadas `[HUECO]`.

**ADR sin alternativas o con formato pendiente**
- Sin alternativas declaradas: ADR01, ADR02, ADR04 (ADRs/*) `[DATO]`.
- ADR06 está redactado como pregunta, no como decisión afirmativa (ADRs/ADR06, Decision) `[DATO]`.
- ADR07 conserva en la línea 4 el texto de la plantilla: "Describe here the forces that influence the design decision" (ADRs/ADR07-Device-triggered-notifications.md) `[DATO]`.
- ADR04 escribe el estado entre corchetes: "[Proposed]" (ADRs/ADR04-API-Layer.md) `[DATO]`.

**Qué no resuelve el repo**
- Mecanismo de proximidad final (§6.3) `[HUECO]`.
- Dónde viven las bases de datos de Profile, IAM y Connections, y su tipo `[HUECO]`.
- Mecanismo de autenticación de administradores (Readme.md, API Layer: "significantly different" sin detalle) `[HUECO]`.
- Mitigación de bases de datos como cuello de botella: se listan sharding y replicación como posibles (Readme.md, Risks) sin decidir `[HUECO]`.
- Regulación de datos personales aplicable: no nombrada `[HUECO]`.
- Reporting, ETL, Social Media y el servicio de notificaciones no aparecen en el texto de despliegue, salvo Reporting (BigQuery) y ETL (Cloud Data Fusion) `[HUECO]` (Readme.md, Deployment).

## 8. Candidatas a verdades enseñables

1. **Un sistema puede empezar como monolito modular con los mismos contextos que tendrá como servicios, y separar después los componentes que lo necesitan.** Ejemplo: el Readme define el monolito con cada contexto acotado como módulo, y dice que puede prototiparse así; ADR01 pide que la estructura modular refleje la arquitectura en cada capa. Fuentes: Readme.md (Goals; Modular Monolith); ADRs/ADR01-Microservices-architecture.md. Respaldo: **FUERTE**.
2. **Un componente con carga muy distinta al resto se aísla en su propio servicio para escalarlo por separado.** Ejemplo: Connections, con su escalado horizontal y su diseño sin estado; el Readme lo justifica con la penalización de rendimiento de los microservicios. Fuentes: Readme.md (Architecture Approach; Evaluation); ADRs/ADR01-Microservices-architecture.md (Consequences, Positive). Respaldo: **FUERTE**.
3. **Los límites de los servicios salen de los eventos y las políticas del dominio, y después se agrupan en contextos.** Ejemplo: el event storming de monArch pasa por eventos, comandos, agregados y políticas de automatización antes de definir los contextos. Fuentes: Readme.md (Event Storming, Figuras 3 a 5). Respaldo: **MEDIA** (un documento; el texto no lista los contextos, están en la figura 5).
4. **Si las actualizaciones llegan por eventos, se pierde atomicidad y eso se declara como costo.** Ejemplo: Profile recibe eventos de Rewards y Connections, y ADR05 declara la pérdida de atomicidad y las transacciones que se pierden en una caída. Fuentes: ADRs/ADR05-CQRS-EventSourcing.md (Rationale; Consequences, Negative). Respaldo: **MEDIA** (un ADR; el Readme confirma el flujo de eventos).
5. **Una estructura de datos optimizada para la consulta encarece la escritura.** Ejemplo: el grafo de oficiales acelera la búsqueda de proximidad y encarece agregar o quitar ubicaciones frente a una tabla. Fuentes: ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md (Consequences, Negative); Readme.md (Proximity Detection). Respaldo: **FUERTE** (ADR y Readme dicen lo mismo, pero el ADR tiene un error de complejidad en su Rationale, ver §7 C7).
6. **Declarar lo que el sistema no hace reduce el alcance antes de diseñar.** Ejemplo: sin transacciones financieras, con la compra en el sistema del comercio y la donación fuera del sistema. Fuentes: Readme.md (Assumptions). Respaldo: **MEDIA** (un documento, con el origen de la suposición declarado).
7. **Una estimación de costo en la nube puede hacerse por servicio con fórmulas antes de construir, pero sigue siendo aproximada.** Ejemplo: el Readme calcula API gateway, Cloud Run, Cloud SQL y Pub/Sub Lite, y advierte que "Actual cost ... can only be determined after building and staging the services". La suma escrita no cierra (§7 C6). Fuentes: Readme.md (Cost Analysis). Respaldo: **MEDIA** (un documento).
8. **Un acoplamiento por base de datos compartida une servicios en la misma unidad de arquitectura.** Ejemplo: ETL y Rewards comparten base; el Readme cuenta 6 quanta por eso. Fuentes: Readme.md (Coupling and Architecture Quanta). Respaldo: **MEDIA** (un documento; la cuenta de quanta depende del conteo de contenedores de §7 C8).

## 9. Fragmentos citables

1. "The modular structure of the system should at all times mirror the overall architecture proposed here, at each layer." (ADRs/ADR01-Microservices-architecture.md, Rationale)
2. "The communication workflow between these services relies on eventual consistency rather than atomicity." (ADRs/ADR05-CQRS-EventSourcing.md, Rationale)
3. "The performance penalty however does not apply to individual microservices, in cases where one service has much higher performance requirements than others." (Readme.md, Architecture Approach)
4. "The graph based approach reduces the cost of lookup at the expense of higher algorithmic cost when adding vertices compared to a tabular approach" (ADRs/ADR06-InMemory-Graph-Store-For-location-lookup.md, Consequences, Negative)
5. "The system does not support financial transactions." (Readme.md, Assumptions)
6. "it is therefore designed to be stateless with no associated persistent data store." (Readme.md, Evaluation, Scalability)
7. "Mobile client apps will not be able to establish background service based websocket connections." (ADRs/ADR03-Rest-over-http-and-websockets.md, Consequences, Negative)
8. "Hexagonal architecture aligns well with microservices, as each service is meant to own it's data." (ADRs/ADR02-Hexagonal-microservices.md, Rationale)

## 10. Etiquetas presentes

microservicios, monolito-modular, DDD, event-storming, C4, hexagonal, event-driven, CQRS, event-sourcing, API-gateway, db-por-servicio, db-compartida, cache, cola-de-mensajes, escalabilidad, contenedores, serverless, cloud-gestionada, batch-analytics, seguridad, zero-trust, privacidad-GDPR, observabilidad, testabilidad, evolutividad, costo, fitness-functions, ADR, supuestos-explicitos, fuera-de-alcance-explicito, riesgos-explicitos, tradeoffs-explicitos, resiliencia-fallos, disponibilidad-HA, rendimiento-latencia, otro: REST-y-websockets, otro: geofencing, otro: notificaciones-en-dispositivo, otro: APIs-separadas-por-audiencia, otro: portabilidad
