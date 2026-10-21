# Dossier D2 · R2: cortar el sistema a partir del negocio, darle un dueño a cada dato y aceptar por escrito lo que se pierde al repartir

Método: leídos completos los ADR y documentos citados en `Pragmatic`, `Team-7` (README y los 12 ADR), `MonArch` (Readme y ADR 01 a 05), `Five-Nines` (ADR-0007, `3_Domain_Model.md`, `4_Sequence_Diagram.md`, parte de `2_Container_Diagram.md`), `ArchColider` (ADR 002, 007, 008, 010, 012, 013, `SystemAppoach.md`, `Tradeoffs.md`), `Profitero-Data-Alchemists` (ADR 1, 3 a 6, 10, 14, viewpoint de contexto), `Archangels` (ADR 002, 003, 004, 010 a 018, `ArchitectureAnalysis.md`, `ArchitecturePatterns.md`, `DataStore.md`), `Pegasuz` (`quanta/`, README, ADR 007 y 012), `BluzBrothers` (`EventStorming.md`, ADR 005, 006, 010, 012, 014, 016, C2). Búsqueda por palabras clave en `ZAITects`, `ConnectedAI` y `Celus-Ceals`. Rutas relativas a `katas-src/<Repo>/`. No se leyeron imágenes (el corpus es solo texto): lo que en estos repos solo está en un diagrama se marca como `[HUECO]`.

Etiquetas: `[DATO]` lo que el repo dice, `[DEDUCCIÓN]` lo que se infiere (se dice de qué), `[HUECO]` lo que el repo no dice.

---

## 1. Las verdades, reformuladas

### T13 · Los límites salen del dominio. Se sostiene, pero más estrecha y con otro matiz.

**Formulación que sostiene la evidencia:** los equipos parten de lo que el negocio hace (eventos, luego agregados, luego contextos) y después ajustan cada corte con criterios técnicos: qué debe fallar por separado, qué cambia seguido, quién puede ver qué, qué escala distinto. El dominio da la lista de candidatos a parte; la razón escrita de cada corte casi siempre es una característica de calidad.

Lo que se sostiene y lo que no:
- **Event storming como método de corte, documentado paso a paso:** solo en 3 repos (BluzBrothers, monArch, Pegasuz). En Pragmatic y Archangels el event storming existe pero el texto no muestra cómo produjo los servicios (ver sección 2).
- **"No de la tecnología":** solo un ADR lo dice con esas palabras (Team 7, ADR-10: "around sub-domain rather than technical layers"). En los demás se deduce de que ningún repo corta por capas técnicas, pero ninguno lo declara.
- **"Quanta" como criterio de corte:** lo usan Pegasuz, monArch, Team 7 y Archangels, cada uno con una definición distinta (ver abajo). No es un método único.

### T5 · Un dueño por dato; la base compartida acopla; partirla por fases. Se sostiene en partes, y las partes apuntan en direcciones distintas.

**Formulación que sostiene la evidencia:** cuando varios servicios necesitan el mismo dato, o se comparte la base y se acepta el acoplamiento (con una regla que contenga el daño: un solo servicio escribe cada objeto), o se separan las bases y se acepta el costo de mantenerlas sincronizadas. Cuatro repos declaran por escrito que compartir la base acopla o que partirla es caro (Pragmatic, monArch, Team 7, Archangels). Solo Team 7 propone partirla por fases.

Matices que el mapa no tenía:
- Pragmatic elige **compartir la base a propósito** (ADR-014) y la regla "un escritor por objeto" (ADR-015) es lo que contiene el acoplamiento. No es "partir la base".
- "Un dueño por dato" tiene tres versiones en el corpus: dueño del **esquema** (Pragmatic ADR-015), dueño del **estado de un dato** (Five Nines ADR-0007) y dueño de **los datos de un servicio** (monArch ADR02).
- La parte "por fases" la sostiene **un solo repo** (Team 7, README "Transition Architecture"). Con las reglas del diseño de curso (mínimo dos repos), esa parte **no se sostiene como verdad general**; se puede enseñar como un caso.

### T14 · La consistencia eventual y la atomicidad perdida se declaran como costo. Se sostiene, con una condición que importa más que la declaración.

**Formulación que sostiene la evidencia:** al repartir los datos se pierde la transacción única. Los equipos que lo declaran dicen dónde lo aceptan (información que no es dinero ni vidas, lecturas de catálogo, reportes) y dónde no (pagos), y qué ponen en los lugares donde no (identificador único, versión, comprobación al momento de comprar). Lo que enseña no es "la consistencia eventual tiene un costo", sino **dónde pasa la línea entre lo que se puede dejar eventual y lo que no**.

Quién lo dice con todas las letras: monArch (ADR05), Pegasuz (npo-candidate, npo-integration), Five Nines (modelo de dominio y secuencia SD-001), ArchColider (Tradeoffs 1 y ADR-013, y el contraste con ADR-008). Pragmatic y Team 7 **no** lo declaran con ese vocabulario (ver sección 2).

### E1 (adicional pedida en el encargo) · Cómo justifican los ganadores el estilo. Se sostiene como "razones", no como catálogo.

**Formulación que sostiene la evidencia:** de 10 repos con un ADR o texto que elige estilo, 7 apoyan la elección en puntajes de una hoja de estilos (Pragmatic, Data Alchemists, Archangels, monArch, Pegasuz, BluzBrothers, Celus Ceals; Archangels cita el origen, developertoarchitect.com, y Pragmatic la nombra: "architecture style worksheet"). En 3 de esos 7 la tabla es toda la razón escrita (Data Alchemists, BluzBrothers, Celus Ceals). En los otros 4 hay algo más: Archangels compara pros, contras y mitigaciones de dos candidatos, monArch argumenta contra su propio puntaje bajo en performance, Pegasuz condiciona la elección a si hay restricción de costo, Pragmatic descarta un candidato por dos características concretas. Los 3 que no usan la hoja (ArchColider, Team 7, ZAITects) razonan por el estado del equipo y del dominio, el costo de los microservicios o los casos de uso. Los que no dependen solo de la tabla son los que mejor muestran *qué razones* se usan.

---

## 2. Verificación por repo

### T13 · Los límites salen del dominio

| Repo | ¿La sostiene? | Evidencia (archivo + cita corta) | Detalle concreto |
|---|---|---|---|
| BluzBrothers | **sí** | `EventStorming/EventStorming.md`: "Events were grouped according to functionality or business processes"; "facilitated the design of bounded context" | Cadena escrita en 6 pasos: 22 eventos recogidos, orden temporal, se eliminan 3 de historial, actores y comandos, agrupación en 6 contextos, políticas. Después 2 contextos se sacan del alcance (ADR-005 registro de pacientes "supporting sub-domain"; ADR-006 sensores) y quedan 4 componentes: Vital Sign Recorder, Analyzer, Streamer, Alert (ADR-007). [DATO] |
| monArch | **sí** | `Readme.md` (Event Storming): "Grouping the semantically related aggregates together gives us the bounded contexts and the blueprint for individual microservices." | Eventos de dominio → comandos y actores → agregados → políticas de automatización (indican acoplamiento asíncrono entre contextos) → contextos. Cada contexto es un módulo del monolito modular y luego un servicio. Los contextos nombrados no están en el texto, solo en la Figura 5; los servicios del texto son IAM, Profile, Connections, Rewards, ETL, Reporting & Analytics y Social Media API. [DATO] / [HUECO] |
| Pegasuz | **sí** | `quanta/quanta-identification.md`: "The aggregates were then grouped to identify services. Services with synchronous dependencies were identified to identify quanta." | Event storming + actor-acción → agregados → servicios → quanta. Resultado: 8 quanta (NPO-Candidate, Chat, Notification, Meeting, NPO-Integration, Recommendation, Documents, Reports según README). Cada quantum tiene sus características y su estilo; el README define el quantum como "An independently deployable artifact with high functional cohesion and synchronous connascence". [DATO] |
| Team 7 | **parcial** | `ADR/ADR-1-service-based.md`: "We discovered four main domain areas here each having a separate group of architectural characteristics" | Cuatro áreas (clientes, operaciones, facturación, administración). Cada una se justifica por **qué característica necesita** (disponibilidad, aislamiento de seguridad PCI, tolerar demoras), no por event storming. ADR-10: partir por subdominio "rather than technical layers". Sin event storming en el repo (búsqueda por "storming": 0 resultados). Responde la duda del mapa: sí descompone por dominio, y lo justifica con características. [DATO] |
| Archangels | **parcial** | `1.ProblemBackground/ArchitectureAnalysis.md`: tabla de "System Granularity" por funcionalidad con volatilidad, escalabilidad, tolerancia a fallos, seguridad de datos, transacciones, dependencias, workflow; ADR-011, 013 a 017 | Parte de 11 dominios identificados (clasificados Core / Supportive / Generic) y los afina con 7 criterios por funcionalidad. Los cortes dentro de un dominio son casi todos admin/cliente y se justifican por tolerancia a fallos, autorización o, en un caso, "code volatility" (ADR-015). Hay event storming (6 diagramas) pero el texto no lo conecta con los dominios. [DATO] / [HUECO] |
| Pragmatic | **parcial** | `ADR/ADR-001-use-ddd.md`: "to get a common understanding of the business problem at hand"; ADR-009: "By choosing C, we avoid coupling via these models." | ADR-009 corta "Story" como servicio porque "Matching Service does not require the resume, and Job candidate service does not require the story": criterio de independencia en el modelo de dominio. `EventStorming/event_storming.md` tiene ejemplos genéricos ("Order Placed", "Payment Processed") que no son del dominio de ClearView y no dice qué servicios salieron. [DATO] / [HUECO] |
| Five Nines | **parcial** | `hld/core-func/car-van-rental/3_Domain_Model.md` (sección "Why These Aggregate Boundaries?") | Un solo contexto delimitado ("Car/Van Rental"), 12 agregados y un value object (Telemetry), y una razón escrita por cada límite (ciclo de vida distinto, perfil de escalado distinto, auditoría/cumplimiento, modelos de IA distintos). No hay event storming ni documento que asigne agregados a servicios. [DATO] / [HUECO] |
| ArchColider | **parcial** | `2.SolutionBackground/SystemAppoach.md`: "Identified services (separated by bounded context) share common Quality Attributes, so the same set of Tactics can be applied" | Subsistemas (catálogo, pedidos, pasarela de compra, reportes, notificaciones) cada uno con sus atributos de calidad. Sin event storming (el repo no lo usa). [DATO] |
| Celus Ceals | no | `3.ARDs/007.ChoosingTheMicroserviceArchitecture.md` | "Modularity => Domain partitioning" figura como criterio para elegir estilo; no se muestra un corte por dominio. [DATO] |
| Data Alchemists | no | `context_viewpoint/README.md` | Los componentes salen de fases del producto (gateway, readers/updaters, trackers, sharing, reporting), sin método de dominio. [DATO] |
| ZAITects, ConnectedAI | no | búsqueda por "bounded context", "DDD", "event storm": solo la rúbrica de la kata en ZAITects (`business-requirements/test2-grading-process.md`), que no es un diseño del equipo | Sin evidencia. |

### T5 · Un dueño por dato; la base compartida acopla; partirla por fases

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| Pragmatic | **sí** (en sentido contrario al del mapa) | ADR-014: "May lead to chaotic coupling. Therefore, we added ADR-015"; ADR-015: "For each object in a DB only one service has the right to write to the database." | Comparte la base **a propósito** ("Since we opted for a service-based architecture and not microservices"). Regla: un servicio escribe cada objeto, "enforced with DB permissions". Costos escritos: esfuerzo de documentar propiedad del esquema y de configurar permisos; ADR-014 debilita mantenibilidad, testabilidad, integridad de datos y tolerancia a fallos. ADR-010: los currículums solo se guardan en el servicio de candidatos y el de matching no tiene permiso de acceso. [DATO] |
| Team 7 | **sí** | README "Transition Architecture"; ADR-4, 5, 6, 7 | Objetivo: bases separadas para clientes, operación, facturación y reportes. Plan en dos fases: "Solve critical problems an stick with a monolithic database until it becomes a bottleneck" y luego "Migrate further to the target architecture". Razón de fases: la separación "can require significant development efforts because of the database split required". Costo declarado de cada separación: "We need to keep in sync…" (ADR-6, ADR-7). [DATO] |
| monArch | **sí** | Readme "Coupling and Architecture Quanta"; ADR02 | ADR02: "each service is meant to own it's data". Excepción declarada: ETL y Rewards "are statically coupled through a shared database", y por eso el repo cuenta "a quanta of 6" para 7 servicios. Admite que separar en dos bases "does not do much to reduce the contract coupling introduced by shared data". [DATO] |
| Five Nines | **parcial** | ADR-0007: "Use Fleet Service as the single source of truth for all vehicle state." | Un dueño para un dato (estado del vehículo), con 3 alternativas rechazadas y tabla de 5 riesgos. Pero los diagramas de secuencia muestran otros servicios escribiendo las mismas tablas (ver ejemplo D de T5). [DATO] / [DEDUCCIÓN] |
| Archangels | **parcial** | `2.SolutionBackground/ArchitecturePatterns.md` (contra de microservicios): "Requires that the database be split along with each microservice. This would be very complex and another big trade-off." | No declara dueños por servicio; usa el costo de partir la base como razón para **no** elegir microservicios. Los datos van a un dominio "Data Store" común (ADR-008, DataStore.md). [DATO] / [HUECO] |
| ArchColider | **parcial** | `SystemAppoach.md` ("Independent data storage for reporting"); `Concurrency.md` | Reportes con su propio almacenamiento "to secure reports' execution time"; el catálogo se parte por ciudad. Sin regla de dueño por dato. Propone "One actor per fridge" para proteger la cantidad de comidas de cada heladera (como opción: "One of the solutions might be"). [DATO] |
| Data Alchemists, Pegasuz, BluzBrothers, ZAITects, ConnectedAI, Celus | no | búsqueda de "shared database", "database per service", "source of truth", "data owner" | Sin evidencia. En Data Alchemists los cambios pasan por los "Data Updaters" (context_viewpoint), lo que se puede leer como un solo escritor, pero el repo no lo dice. [DEDUCCIÓN] |

### T14 · La consistencia eventual y la atomicidad perdida se declaran como costo

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| monArch | **sí** | ADR05, Consecuencias negativas: "Giving up atomicity in workflows in favor of eventual consistency" | La frase está en el ADR de CQRS/Event Sourcing. Otros dos costos en el mismo ADR: "Possible data and code duplication" y "Transactions could be missed due to service downtime". Razón de aceptarlo: evitar que Reporting pida datos sincrónicamente a Profile y el acoplamiento que eso agrega. [DATO] |
| Pegasuz | **sí** | `quanta/npo-candidate.md`: "Data is not consistent in an event driven system. It would be eventually consistent." | Mitigación: "This trade-off may be acceptable as the system is not dealing with mission critical information (such as affecting human life / money)." En `quanta/npo-integration.md` repite el costo para la integración que consulta periódicamente la API de las ONG. [DATO] |
| Five Nines | **sí** | `3_Domain_Model.md`, "Aggregate Consistency Boundaries"; `4_Sequence_Diagram.md` SD-001 | Dentro de un agregado, transacción ACID; entre agregados, eventos y consistencia eventual. Razón escrita: "Prevents distributed transactions across bounded contexts". Alcance: "eventual consistency acceptable for non-critical path". Pero SD-001 también hace una transacción que toca la reserva y el vehículo (ver T5-D). [DATO] / [DEDUCCIÓN] |
| ArchColider | **sí** | `Tradeoffs.md` 1: "The meals catalog sacrifices accuracy for availability at the time of browsing."; ADR-013 Riesgos; ADR-008 | Tres lugares. Catálogo: puede estar desactualizado y se verifica en la compra. Stock de heladeras: se mantiene una copia propia y se corrige con cada actualización (ADR-012). Pago: no se acepta (ADR-008). Es el único repo que muestra la línea en ambos lados. [DATO] |
| Archangels | **parcial** | ADR-003: "Eventual consistency may be a new approach for some developers used to a more synchronous or transactional system" | Lo declara como costo de aprendizaje del equipo, no como efecto sobre el negocio. ADR-004 (outbox/inbox) trata el "dual write problem". [DATO] |
| Data Alchemists | **parcial** | ADR-1 Riesgos: "Ensuring data consistency across distributed components can be challenging"; ADR-14: "Lack of ACID Transactions" | Cada ADR de comunicación repite la misma lista genérica de ventajas y desventajas; ningún ADR dice qué dato queda eventual ni qué se hace al respecto. [DATO] |
| Team 7 | **no** (confirma la nota del mapa) | ADR-2, 5, 6, 7 | Declara complejidad y "keep in sync", y una regla de orden ("the ticket is saved in the customer database prior to the notification event", README). No usa el concepto de consistencia eventual; la palabra "eventually" aparece una vez, sobre facturas ("customers should eventually get their invoices", ADR-5). [DATO] |
| Pragmatic | **no** | ADR-004 | Deprioriza la integridad de datos como característica: "do not significantly influence the overall architecture". No hay ADR que declare consistencia eventual aunque usa colas (ADR-016) y base compartida. Es decisión contraria, ver sección 4. [DATO] |
| BluzBrothers, Celus, ConnectedAI, ZAITects | no | búsqueda por "eventual", "atomic", "consistency" | Sin evidencia. |

### E1 · Cómo justifican el estilo

| Repo | Estilo elegido | Razones que escribe | Alternativas que nombra | Costo que admite |
|---|---|---|---|---|
| Pragmatic ADR-002 | Service-based, con event-driven donde hace falta | Remite a las 7 características que dirigen (tres principales: feasibility, interoperability, testability). Descarta microkernel por escalabilidad y tolerancia a fallos. Consecuencia buscada: "cheaper and faster to build". [DATO] | Microkernel | Event streaming "adds complexity"; elasticidad debilitada "due to shared databases". ADR-004 decide antes qué características cuentan. |
| Data Alchemists ADR-1 | Event-driven | Tres características (performance, scalability, evolvability), evaluadas "By using the Architecture Styles Worksheet". Justificación de escala: más de 15 millones de usuarios. [DATO] | No nombra alternativas en el ADR. [HUECO] | Complejidad, operación, curva de aprendizaje; riesgo de inconsistencias. |
| Archangels ADR-002 | Event-driven | Compara solo dos candidatos que salieron de la matriz (microservicios y event-driven) en tablas de pros, contras y mitigaciones. "Both architecture options have trade-offs, but the trade-offs for the Event-Driven architecture are lower overall." [DATO] | Microservicios (rechazado por separar la base, workflow, configurabilidad, costo, simplicidad) | "Four of seven characteristics score highly"; interoperabilidad por mitigar. |
| monArch ADR01 + Readme | Microservicios | ADR01 argumenta desde acoplamiento y cohesión, no desde características. El Readme admite que los microservicios puntúan bajo en performance (una de sus tres características) y lo compensa aislando en un servicio lo que más rinde. Admite que "could even be developed and deployed as a modular monolith". [DATO] | Monolito modular (viable para MVP) | "Data and code duplication"; "Difficult to execute quickly". |
| Team 7 ADR-1 | Service-based | Cuatro áreas con distintas características; "free from cost overhead of Microservices approach"; punto de partida para migrar a microservicios. [DATO] | Microservicios | Puede exigir partir la base; capacitar a los equipos en los límites de dominio. Estado "Proposed". |
| ArchColider ADR-002 | Monolito modularizado | Tabla de 10 criterios con 4 opciones (monolito, microservicios, microkernel, monolito modularizado). Razón fuera de la tabla: el equipo y el costo de ambientes. "extra care and discipline" en la comunicación entre módulos. [DATO] | Las 3 restantes. En `SystemAppoach.md`: microservicios desde el inicio descartados porque piden "a stable and known domain model"; "Microservices should grow naturally as the need arises." | Riesgo de "big ball of mud"; copiar código a veces para evitar dependencias ocultas. |
| Pegasuz ADR-007 | Monolito modular en el MVP del quantum central; microservicios con eventos después | Tabla de 5 factores (costo, mantenimiento, acoplamiento, escalabilidad, extensibilidad). Decisión condicionada: "if there is a cost constraint". [DATO] | Microservicios | Acoplamiento alto y escalabilidad baja en el monolito (en la tabla). |
| Celus Ceals ADR-007 | Microservicios | Puntaje: 20 contra 15 (event-driven) y 8 (monolito modular), con 4 criterios. [DATO] | Event-driven, monolito modular | "lacks simplicity"; red, depuración y pruebas más complejas. |
| BluzBrothers ADR-012 | Event-driven | Elasticidad, evolvabilidad, performance; "a rating of 14 stars according to the selection schema". [DATO] | No nombra alternativas en el ADR. [HUECO] | Complejidad y "event-driven pitfalls". |
| ZAITects `ADRs/015-ai-architecture-patterns.md` | Microservicio por caso de uso, con gateway de IA | Cada caso necesita varios modelos, métricas y guardrails (conclusión del documento). Solo leí la conclusión. [DATO] parcial | Monolito de IA (anti-patrón en el mismo doc) | Sin leer. |
| Five Nines, ConnectedAI | microservicios (mención) | Sin ADR de estilo. Five Nines lo nombra solo en `hld/core-func/car-van-rental/README.md` ("Microservices with clear aggregate boundaries (DDD)") y en el README. [HUECO] | | |

---

## 3. Los mejores ejemplos para enseñar

### T13 · cortar a partir del negocio

#### T13-A · BluzBrothers (MonitorMe, 2024): de 22 eventos a 4 componentes

- **El caso:** un sistema que recibe señales vitales de pacientes y avisa a enfermería cuando algo sale de rango. El equipo documenta de punta a punta cómo pasó de la lista de cosas que ocurren en el negocio a los componentes.
- **La situación que obliga a decidir:** hay que decidir dónde pasan las fronteras antes de elegir tecnología. El requisito de negocio que lo condiciona está en el repo: los datos se ven en pantalla "in average 1s" y se conservan 24 horas (ADR-004; `EventStorming.md` paso 6).
- **Qué hizo, en orden** (`EventStorming/EventStorming.md`):
  1. Recogió 22 eventos del negocio (por ejemplo "Sensor data received", "Issue detected", "Alert sent", "Nurse seen the alert").
  2. Los ordenó en el tiempo.
  3. Eliminó los que no aportaban. Tres eventos de historial ("history data reviewed", "archived after 24h", "deleted after 24h") salieron porque la base de series temporales los resuelve (ADR-003); "Software updated" también salió (ADR-002).
  4. Agregó actores y comandos.
  5. Agrupó eventos "according to functionality or business processes" y obtuvo seis contextos: registro de pacientes, gateway, recorder, analyzer, monitor, alert.
  6. Agregó políticas (retención de 24 h, alertas por reglas, 1 s en pantalla).
  Después sacó dos contextos del alcance: el registro de pacientes (ADR-005) y los sensores (ADR-006), con la razón "hardware responsibilities are kept outside the scope". Quedaron cuatro componentes: Vital Sign Recorder, Analyzer, Streamer y Alert. El estilo (event-driven) se elige **después** en ADR-012.
- **Alternativas declaradas:** para registro de pacientes, "Seamless alignment with an existing solution" frente a construirlo; para sensores, dejarlo fuera frente a diseñarlo. No hay alternativas de corte (otro agrupamiento de eventos) en el repo. [HUECO]
- **Costo admitido:** ADR-005, "The need for the system to adapt to an external solution." ADR-006, "Absence of a defined protocol, requiring the assumption of data streaming to the MonitorMe system."
- **Qué enseña:** el orden de los pasos y que sacar cosas del alcance es parte del corte. Por qué este y no otro: es el único repo donde la secuencia completa está escrita en texto, paso por paso, con lo que se eliminó y por qué.
- **Advertencia:** los seis contextos de la lista intermedia no coinciden del todo con los del resumen (lista: Patient Registration, Gateway, Recorder, Analyzer, Monitor, Alert; resumen: Patient Registration, Sensors, Recorder, Monitor, Analyzer, Alert). [DATO] El repo no explica el cambio de Gateway a Sensors.
- **Fuentes:** BluzBrothers: `EventStorming/EventStorming.md`; `ADR/ADR-005`, `ADR-006`, `ADR-007`, `ADR-012`; `C4/C2-containers.md`.

#### T13-B · Pegasuz (Spotlight, 2022): de agregados a quanta por dependencias síncronas

- **El caso:** una plataforma que conecta ONG con candidatos y mentores. Es la única donde el corte por quanta se hace con un criterio operativo explícito.
- **La situación:** un sistema con muchas partes (chat, reuniones, documentos, notificaciones, recomendaciones, reportes, integración con las ONG). Preguntan qué partes hay que tratar juntas.
- **Qué hizo** (`quanta/quanta-identification.md`, README): event storming con actor-acción para hallar los agregados; los agregados se agrupan en servicios; los servicios con dependencias **síncronas** entre sí forman un quantum. Resultado: 8 quanta, y el de NPO-Candidate agrupa cinco servicios (NPO, Candidate, Assignment, Assignment Scheduler, Auth). Luego cada quantum recibe su propio análisis de características y su propio estilo. Una consecuencia concreta que escribe: "between 3 nines (for quanta which do not have synchronous dependencies, like reporting and analytics) and 4 nines (for quanta which have synchronous dependencies, like notifications)": la disponibilidad objetivo depende del quantum. [DATO]
- **Alternativas declaradas:** el README no elige estilo global: "each with its own architectural style. So, we are not picking a style yet." El quantum central parte como monolito modular (ADR-007) y pasa a microservicios y eventos "after there is a product market fit" (ADR-007). [DATO]
- **Costo admitido:** `quanta/npo-candidate.md`, "Event driven + microservices is a costly architecture"; para el quantum de integración, datos no garantizados consistentes (ver T14-B).
- **Qué enseña:** que "cortar" tiene dos pasos distintos (qué cosas pertenecen juntas por el dominio, y qué cosas se despliegan juntas por cómo se llaman entre sí) y que el corte permite tener objetivos distintos por parte.
- **Advertencia:** los diagramas de agregados y quanta están en imágenes que el corpus no incluye. [HUECO]
- **Fuentes:** Pegasuz: `quanta/quanta-identification.md`, `quanta/npo-candidate.md`, `README.md` (Quanta, Availability, MVP), `ADRs/007.adr-arch-style-np-candidate-mvp.md`.

#### T13-C · Team 7 (Sysops Squad, 2021): cuatro dominios, cada uno con lo que necesita

- **El caso:** reemplazar un sistema monolítico de tickets de soporte. Mejor ejemplo de un corte justificado por qué necesita cada parte, con el aislamiento de facturación como caso fuerte.
- **La situación:** la facturación guarda datos de tarjetas ("Since we store the customer's credit card information in the database (see ASM-4), the system may need to pass a Payment Card Industry (PCI) audit") y ADR-4 observa que "The bigger part of the system deals with credit card data, the more onerous the procedure is."
- **Qué hizo:** ADR-1 identifica cuatro áreas (clientes, operaciones, facturación, administración) porque cada una tiene un grupo distinto de características: clientes y operaciones necesitan disponibilidad y desempeño; facturación, un "isolated security zone with no incoming requests from the other domains"; administración tolera demoras. ADR-4 resuelve cómo seguir dando servicio sin acceso directo a los datos: el cliente ve solo los últimos 4 dígitos, el resto va a facturación por cola; el administrador entra por una interfaz de facturación detrás de VPN; los reportes se copian por réplica de tablas o ETL. ADR-10 pide que cada servicio se organice "around sub-domain rather than technical layers".
- **Alternativas declaradas:** para la facturación vista por gerentes, dos: usar la interfaz de facturación (como los administradores) o replicar los datos al servicio de reportes. Para el estilo, microservicios (ADR-1: "cost overhead").
- **Costo admitido:** ADR-1, "This may require splitting the database" y capacitación en límites de dominio. ADR-4, "Adds complexity" y asegurar el paso de datos de tarjeta entre quanta.
- **Qué enseña:** que una razón regulatoria o de seguridad es una razón válida de corte, y que cada corte arrastra preguntas ("¿cómo ve el cliente su tarjeta si ya no la guardamos?") que hay que responder por escrito.
- **Advertencia:** casi todos los ADR están en estado "Proposed"; ADR-8 está "OBSOLETE" (replicación de tablas) pero ADR-5 sigue proponiendo replicación de tablas. [DATO] El repo no explica la contradicción.
- **Fuentes:** Team-7: `ADR/ADR-1-service-based.md`, `ADR-4-extract-billing-quanta.md`, `ADR-10-modular-services.md`, `README.md` (Business Case, Containers).

#### T13-D · Archangels (Farmacy Family, 2021): afinar con siete criterios y decidir también qué no partir

- **El caso:** una plataforma de comunidad, mensajería, datos médicos y analítica. Muestra la tabla de granularidad más completa del corpus.
- **La situación:** cada dominio se puede partir en varias piezas. Hay que decidir cuántas.
- **Qué hizo** (`ArchitectureAnalysis.md`): primero pregunta si las características aplican a todo el sistema o a partes ("do they apply to the whole system or are there clear sets applying to different parts of the system?"). Lista 11 dominios y los clasifica en Core, Supportive y Generic. Luego, para cada funcionalidad, una fila con volatilidad, escalabilidad, tolerancia a fallos, seguridad de datos, transacciones, dependencias y workflow. Con esa tabla decide, por ADR: separar usuarios (ADR-011), comunidad (013), media (014), analítica (015), mensajería (016), médico (017) y **no** partir seguridad (ADR-012: autenticación y autorización juntas porque "cannot operate if one goes down, so the overhead of splitting is avoided").
- **Razones de corte que escribe:** tolerancia a fallos ("so that a fault in messaging does not affect customers being able to subscribe"), autorización separada admin/cliente, posibilidad de cambiar una pieza por un producto comprado, y en analítica "code volatility causing headaches in deploying run and store/access functionality together".
- **Alternativas declaradas:** microservicios (rechazados por dividir la base, el workflow, la configurabilidad, costo y simplicidad).
- **Costo admitido:** cada ADR tiene riesgos; el repetido: "Some code may need to be shared, but this should only be code that is NOT high-security".
- **Qué enseña:** que el corte es una decisión con criterios medibles por fila y que "no partir" también se decide y se escribe.
- **Advertencia:** muchos cortes son "admin frente a cliente", lo que depende del dominio de esta kata. El event storming (seis diagramas) no se conecta con la lista de dominios en el texto. [HUECO]
- **Fuentes:** Archangels: `1.ProblemBackground/ArchitectureAnalysis.md`, `4.ADRs/011`, `012`, `013`, `015`, `016`.

### T5 · un dueño por dato

#### T5-A · Pragmatic (ClearView, 2024): compartir la base, pero un solo escritor por objeto

- **El caso:** una plataforma sin fines de lucro que empareja candidatos con vacantes usando currículums anonimizados. Es el ejemplo más claro de que "compartir la base" y "tener dueño" no se contradicen.
- **La situación:** "the object story is used by the services Job candidate, Story, Matching and Employer" (ADR-014). Varios servicios necesitan el mismo objeto; el equipo es pequeño, el presupuesto es de una organización sin fines de lucro y la característica principal es la viabilidad (feasibility).
- **Qué decidió:** ADR-014 permite que varios servicios usen la misma base y declara el riesgo ("May lead to chaotic coupling"). ADR-015, el mismo día, agrega la regla: "For each object in a DB only one service has the right to write to the database", impuesta con permisos de base de datos. ADR-010 lleva la idea al extremo con el dato más sensible: los currículums solo se guardan en el servicio de candidatos y el de matching no recibe el permiso. ADR-009 evita que el servicio que crea las historias dependa del modelo de currículum y del de matching.
- **Alternativas declaradas:** ADR-009 compara tres lugares donde crear la historia (A: en Job candidate; B: en Matching; C: servicio propio). Para ADR-014 el repo no lista una alternativa; la opción de microservicios con bases separadas aparece solo implícita en "and not microservices". [HUECO]
- **Costo admitido:** ADR-014 debilita "Maintainability, Testability, Data integrity, Fault tolerance"; ADR-015 pide "Documentation effort for schema ownerships" y "Configuration effort for DB permissions". ADR-002 admite que la elasticidad se debilita "due to shared databases between servuces".
- **Qué enseña:** que la base compartida tiene costo, que se contiene con una regla verificable (permisos, no solo convención) y que la regla se escribió el mismo día que se aceptó el riesgo.
- **Por qué este y no otro:** es el único repo con la regla de escritura impuesta por la base de datos. Tiene dos tensiones que hay que tener presentes: ADR-019 deja que Analytics lea directo de la base de candidatos pese a los datos demográficos (Opción 1, costo "Security (since it can access and holds most data)"), lo que no viola ADR-015 (solo regula quién escribe); y ADR-009 dice que el servicio de candidatos no necesita el story mientras ADR-014 dice que lo usa. [DATO] / [DEDUCCIÓN: una de las dos frases es imprecisa; el repo no la reconcilia]
- **Fuentes:** Pragmatic: `ADR/ADR-014`, `ADR-015`, `ADR-010` (el texto del ADR está truncado en "The story service does"), `ADR-009`, `ADR-019`, `ADR-002`, `C4/C2-container.md`.

#### T5-B · Team 7: cuándo y cómo se separan las bases, y en qué orden

- **El caso:** el mismo de T13-C. Es el único ejemplo donde la separación de bases está planeada por fases.
- **La situación:** el diseño final separa bases de clientes (ADR-6), operaciones, facturación y reportes (ADR-7), pero el propio README dice que ese diseño "can require significant development efforts because of the database split required".
- **Qué decidió:** dos fases. Fase 1: resolver lo crítico con asincronía entre servicios pero con una sola base ("Since we have a single monolithic database we can save some efforts on additional messaging and replication"; los mensajes llevan menos información porque el receptor lee el resto de la base). Fase 2: migrar a la arquitectura objetivo. Para cada separación define cómo se sincroniza según el tipo de dato (ADR-5): los contratos de soporte no necesitan reacción, por lo que alcanza la replicación de tablas o un ETL periódico; los datos de tarjeta van por cola asíncrona porque una llamada síncrona "will nullify our efforts on scalability and availability"; las facturas por cola persistente para que no se pierdan si el servicio de notificaciones está caído.
- **Alternativas declaradas:** para ADR-5, replicación de tablas integrada en la base o ETL ("in case we want to avoid this database level coupling"), frente a mensajería. Para la fase 1, una base monolítica frente a la separación completa.
- **Costo admitido:** el análisis de riesgo de la fase 1 nombra tres: el cuello de botella de rendimiento de una base única, un solo API gateway que puede ser punto único de fallo, y la seguridad (que el personal de administración llegue a datos de tarjeta) que "We certainly want to prevent … by extracting billing into a separate architectural quantum".
- **Qué enseña:** que "repartir los datos" no es una sola decisión; es un orden (qué se separa primero y por qué) y un método por dato (¿necesita reacción inmediata? ¿se puede perder? ¿cuánto tarda en llegar?).
- **Advertencia:** el README no dice qué parte de la facturación queda separada en la fase 1; el diagrama de transición es una imagen. [HUECO] Las dos fases las sostiene solo Team 7.
- **Fuentes:** Team-7: `README.md` ("Transition Architecture" y "Risk Analysis"), `ADR/ADR-5`, `ADR-6`, `ADR-7`, `ADR-4`.

#### T5-C · monArch (Hey Blue!, 2022): una base compartida cambia cuántas partes independientes hay

- **El caso:** una app móvil que conecta ciudadanos con policías y reparte puntos canjeables.
- **La situación:** siete servicios con sus datos y una excepción: ETL (carga datos de comercios, municipios y organizaciones) y Rewards (canje de puntos) trabajan sobre los mismos datos de ofertas.
- **Qué decidió:** el Readme muestra que cada servicio tiene sus bases (ADR02: "each service is meant to own it's data") y reconoce que ETL y Rewards comparten una. Una posible separación (ETL escribe maestros, Rewards solo lee) "does not do much to reduce the contract coupling introduced by shared data they have to work with", y se dibuja con dos bases solo "for clarity and semantic reasons". Consecuencia contada: con esa base compartida, "the system architecure has a quanta of 6".
- **Alternativas declaradas:** la separación en maestro y transacciones, descartada como mejora real de acoplamiento.
- **Costo admitido:** ADR01 lista "Data and code duplication" como costo de los microservicios; el ADR02 no declara costo propio de "cada servicio es dueño de sus datos".
- **Qué enseña:** cómo se mide el efecto de una base compartida (cuenta de quanta) y que separar físicamente dos bases no elimina el acoplamiento si los dos servicios siguen dependiendo del mismo significado de los datos.
- **Fuentes:** MonArch: `Readme.md` (Coupling and Architecture Quanta), `ADRs/ADR01`, `ADR02`.

#### T5-D · Five Nines (MobilityCorp, 2025): un dueño declarado y diagramas que lo contradicen

- **El caso:** una plataforma de movilidad (autos, vans, scooters) con IA.
- **La situación:** ADR-0007: la plataforma "requires a reliable, real-time, and authoritative view of vehicle state"; evitar que cada módulo (alquiler, mantenimiento, analítica) lleve su propia copia parcial.
- **Qué decidió:** "Use Fleet Service as the single source of truth for all vehicle state." El servicio recibe la telemetría, guarda el estado en una base propia (por ejemplo Firestore), publica eventos y aplica reglas.
- **Alternativas declaradas con su contra:** (1) estado distribuido entre módulos: "risk of inconsistent state, duplicated logic, complex reconciliation"; (2) solo Pub/Sub, sin decisión central: "higher coupling"; (3) un registro de dispositivos aparte: "increased operational overhead, more moving parts".
- **Costo admitido:** tabla de riesgos: dependencia única ("Fleet Service becomes critical for most platform functions"), escalabilidad, complejidad, dependencia del proveedor, latencia, cada uno con mitigación.
- **Qué enseña:** cómo se escribe la decisión "un solo dueño" con alternativas y riesgos.
- **Lo que hay que saber antes de usarlo:** [DEDUCCIÓN] los diagramas de secuencia del mismo repo (`4_Sequence_Diagram.md`) escriben en las mismas tablas desde varios servicios: Booking hace `UPDATE vehicle SET status='reserved'` en SD-001; Rental hace `UPDATE reservation SET status='active'` en SD-002; Dispute hace `UPDATE payment_record SET status='disputed'` en SD-006. Todos usan un único participante "DB: PostgreSQL". La tabla de contenedores dice "PostgreSQL for ACID compliance … All services". El repo no dice si es una instancia o varias ni quién es dueño de cada tabla. [HUECO] Además, el contenedor "Fleet Service" no figura en la tabla de contenedores de `2_Container_Diagram.md` (seis contenedores sin Fleet), pero sí en `hld/core-func/README.md`. Si se usa este ejemplo, la enseñanza correcta es: el ADR declara el dueño y los diagramas no lo respetan; o bien el participante "DB" es una simplificación del dibujo. El repo no permite saber cuál.
- **Fuentes:** Five-Nines: `adrs/ADR-0007 - Fleet Service as the Single Source of Truth for Vehicle State.md`, `hld/core-func/car-van-rental/4_Sequence_Diagram.md`, `2_Container_Diagram.md`, `hld/core-func/README.md`.

### T14 · aceptar por escrito lo que se pierde al repartir

#### T14-A · monArch ADR05: la frase exacta y los tres costos

- **El caso:** el perfil de usuario recibe actualizaciones de dos orígenes distintos: lo que el usuario edita (CRUD directo) y lo que le llega por eventos de otros servicios (una conexión lograda, puntos canjeados o donados).
- **La situación:** Reporting necesita datos de transacciones de varios servicios. Pedirlos sincrónicamente a Profile implica mover gran volumen y mantener endpoints solo para eso.
- **Qué decidió:** CQRS para aplicar los cambios por eventos al perfil y event sourcing para los eventos que consumen varios servicios. El perfil guarda los eventos de Rewards y Connections; Reporting consume los eventos que publica Profile.
- **Alternativa declarada:** que Reporting pida los datos sincrónicamente a Profile; descartada por volumen y acoplamiento.
- **Costo admitido (citas):** "Giving up atomicity in workflows in favor of eventual consistency"; "Possible data and code duplication"; "Transactions could be missed due to service downtime".
- **Qué enseña:** cómo se redacta la pérdida de atomicidad: nombra qué se entrega (workflows con atomicidad), a cambio de qué (menos acoplamiento, más suscriptores posibles) y qué puede salir mal en la práctica (transacciones perdidas por caída). Por qué este: es la frase más directa y completa del corpus.
- **Fuentes:** MonArch: `ADRs/ADR05-CQRS-EventSourcing.md`; Readme (Evaluación: "avoiding distributed transactions").

#### T14-B · Pegasuz: la condición para aceptar consistencia eventual

- **El caso:** quantum NPO-Candidate (flujo basado en eventos) y quantum de integración con las ONG (consulta periódica de sus APIs).
- **La situación:** con eventos entre servicios los datos no coinciden en todo momento; con la integración, los datos de la plataforma y los de la ONG "is not guaranteed to be consistent".
- **Qué decidió y por qué:** aceptar la consistencia eventual en el primero: "This trade-off may be acceptable as the system is not dealing with mission critical information (such as affecting human life / money)." En el segundo, la consistencia se logra "based on the frequency of the scheduler".
- **Costo admitido:** la propia frase de arriba: el costo se acepta **porque** el sistema no maneja vidas ni dinero.
- **Qué enseña:** que "se acepta" necesita un porqué, y que el porqué es una propiedad del negocio (qué pasa si el dato se ve tarde), no de la tecnología. La misma frase explica por qué ArchColider y MonitorMe no pueden hacer lo mismo en pagos y alertas.
- **Fuentes:** Pegasuz: `quanta/npo-candidate.md` (Trade-offs), `quanta/npo-integration.md` (Tradeoffs), README (Availability).

#### T14-C · ArchColider (Farmacy Food, 2020): la línea trazada en un solo repo

- **El caso:** pedidos de comidas desde heladeras inteligentes.
- **La situación:** el repo trata tres datos distintos con tres reglas distintas.
  1. **Catálogo de comidas:** "The meals catalog sacrifices accuracy for availability at the time of browsing." El catálogo se baja al dispositivo y la disponibilidad real se confirma al pagar (ADR-013: "Catalog might be stale in terms of available meals, but we are going to check the possibility of purchase on the backend anyway.").
  2. **Stock de heladeras:** el sistema no controla la frecuencia de actualización del sistema de heladeras, mantiene una copia propia y la corrige cuando llegan datos nuevos (ADR-012). Costo escrito: "requires a business decision about the edge case when something was purchased but not delivered".
  3. **Pedido listo para pagar:** no se acepta duplicado ni pérdida. ADR-008 usa una cola con confirmación, un id único enviado por el cliente y un número de versión para descartar eventos repetidos, para que no haya "doubled, tripled, and so on charges". Costo: "It will slightly decrease performance, but we get data integrity."
- **Alternativas declaradas:** en ADR-007 (event sourcing) frente a guardar solo el estado final con registro aparte. En ADR-012, la pregunta abierta de qué hacer si no llegan datos nuevos.
- **Qué enseña:** que dentro de un mismo sistema conviven datos que se pueden ver desactualizados (con una verificación en el momento que importa) y datos que no, y que la decisión se toma dato por dato. Por qué este: junto con Pegasuz da el criterio completo (dinero y vidas frente a información de navegación).
- **Advertencia:** ADR-007, 008, 012 y 013 figuran como "Proposed". El repo no usa el término "eventual consistency" para el catálogo, lo nombra como "sacrifices accuracy for availability". [DATO]
- **Fuentes:** ArchColider: `2.SolutionBackground/Tradeoffs.md`, `4.ADRs/008`, `012`, `013`, `007`.

#### T14-D · Five Nines: fuerte dentro del agregado, eventual entre agregados

- **El caso:** el modelo de dominio del alquiler de autos y vans.
- **La situación:** hay 12 agregados y un value object (Telemetry). Si cada cambio entre ellos fuera una transacción, harían falta transacciones distribuidas.
- **Qué decidió:** transacción ACID dentro de un agregado (reserva, alquiler, registro de pago, estado del vehículo) y eventos con consistencia eventual entre agregados (reserva → disponibilidad del vehículo, alquiler → pago, limpieza → tarea de equipo, carga → estado del vehículo). Razón escrita: "Prevents distributed transactions across bounded contexts", "Enables independent scaling of aggregates", "Maintains system resilience during partial failures".
- **Alternativa declarada:** ninguna. [HUECO] Costo admitido: SD-001 limita el alcance: "eventual consistency acceptable for non-critical path". No dice qué pasa si el evento de disponibilidad llega tarde (por ejemplo, doble reserva). [HUECO]
- **Qué enseña:** la regla de los límites de la transacción (lo que cambia junto se guarda junto). Es la formulación más didáctica del corpus.
- **Advertencia:** en SD-001 la reserva y la actualización de `vehicle.status` están en la misma transacción, y a la vez Fleet actualiza su copia por evento. Es decir, lo que el modelo dice eventual aquí es una transacción única. [DEDUCCIÓN]
- **Fuentes:** Five-Nines: `3_Domain_Model.md` (Aggregate Consistency Boundaries), `4_Sequence_Diagram.md` (SD-001).

### E1 · razones para elegir el estilo

#### E1-A · ArchColider ADR-002: empezar por el monolito modularizado y decir por qué no microservicios todavía

- **El caso:** un sistema de pedidos para una startup que prueba su modelo de negocio.
- **La situación:** hay un equipo concreto y un negocio sin validar: "developer's team experience and capabilities should be considered".
- **Qué decidió:** tabla de cuatro opciones contra diez criterios; elige el monolito modularizado: "we think that modularized monolith is the best option for now". `SystemAppoach.md` explica por qué no microservicios: piden "a stable and known domain model" y el esfuerzo "will be wasted or invisible for end-users"; "Microservices should grow naturally as the need arises". Y cuándo extraer: "should be made based on metrics and trends".
- **Costo admitido:** "Extra care and discipline should be applied for inter module communication, or it will be just a monolith with a tendency towards the big ball of mud." También que a veces conviene copiar código "to avoid hidden dependencies".
- **Qué enseña:** que la razón del estilo puede ser el estado del negocio y del equipo, no solo las características, y que se deja escrita la condición para cambiar. Por qué este: tabla completa + razones fuera de la tabla + condición de cambio.
- **Fuentes:** ArchColider: `4.ADRs/002 System approach.md`, `2.SolutionBackground/SystemAppoach.md` (Alternatives; Modularized services).

#### E1-B · Archangels: elegir entre dos candidatos con pros, contras y mitigaciones

- **El caso:** de la matriz de estilos salen dos candidatos (microservicios y event-driven); el repo los compara fila por fila.
- **Qué decidió y por qué:** event-driven. En la tabla, los microservicios fallan en configurabilidad y workflow (dos características que importan) y exigen partir la base: "This would be very complex and another big trade-off." Event-driven falla en interoperabilidad y configurabilidad pero con una mitigación (una interfaz para integraciones) y según el repo "the trade-offs for the Event-Driven architecture are lower overall".
- **Costo admitido:** ADR-002, "Interoperability needs to be mitigated" y riesgo de que "Interoperability and configurability may still be high trade-offs after mitigation".
- **Qué enseña:** que se compara contra la lista de características propias, que se escriben las mitigaciones y que se admite el riesgo que queda.
- **Fuentes:** Archangels: `2.SolutionBackground/ArchitecturePatterns.md`, `4.ADRs/002`.

#### E1-C · Pragmatic ADR-002 más ADR-004: una característica que no entra a la tabla no pesa en la decisión

- **El caso:** ADR-002 elige service-based por las siete características; ADR-004 (anterior en lógica, "Needs ADR-004 for the decision") decide qué características cuentan.
- **Qué decidió:** ADR-004 deprioriza la integridad de datos porque (1) la calidad de los modelos de IA ya la cubre testabilidad, (2) muchas medidas "are best implemented at the code level", (3) no figura en la hoja de estilos: "Data integrity is not included as a characteristic in the architecture style worksheet, and therefore does not contribute to selecting the overall architecture style."
- **Qué enseña:** que la herramienta con la que se compara condiciona qué se compara. Es la razón (3), y está escrita por el propio equipo.
- **Costo admitido:** "The checking of the data integrity will not be considered on architecture level."
- **Fuentes:** Pragmatic: `ADR/ADR-002-architecture-style.md`, `ADR/ADR-004-data-integrity-downplayed.md`, `ArchitectureCharacteristics/Characteristics.md`.

---

## 4. Decisiones contrarias

- **Compartir la base (Pragmatic ADR-014) frente a separarla (Team 7 ADR-6 y 7, monArch ADR02).** Pragmatic la comparte por viabilidad (presupuesto y equipo pequeños, característica principal "feasibility") y paga con permisos y documentación; Team 7 la separa por disponibilidad y seguridad y paga con sincronización, y aun así planea quedarse con una base única en la fase 1. Depende de cuál es la característica dominante y de cuánto margen de desarrollo hay.
- **Analytics lee directo de la base de otro (Pragmatic ADR-019) frente a una base de reportes separada (Team 7 ADR-7; ArchColider "Independent data storage for reporting"; monArch, Reporting alimentado por eventos).** Pragmatic escribe el costo ("Security (since it can access and holds most data)") y prefiere la simplicidad; los otros tres separan para proteger el rendimiento operativo.
- **Monolito modular frente a microservicios.** ArchColider y Pegasuz (MVP) empiezan con monolito modular; monArch (microservicios) admite que el monolito modular "could even" ser su forma inicial; Celus Ceals elige microservicios por puntaje. Razón que cambia la decisión en cada caso: dominio todavía inestable (ArchColider), restricción de costo (Pegasuz), puntaje de la tabla (Celus).
- **Aceptar consistencia eventual (Pegasuz) frente a no aceptarla (ArchColider ADR-008 en pagos).** El criterio que los separa es lo que se pierde si el dato llega tarde (dinero o vidas frente a información de navegación).
- **No partir un dominio (Archangels ADR-012: autenticación y autorización juntas) frente a partir todos los demás.** Razón: el servicio no puede funcionar si una de las dos mitades cae.
- **Integridad de datos fuera del estilo (Pragmatic ADR-004) frente a repos donde la integridad es característica de primer orden y orienta decisiones (ArchColider ADR-008, Archangels: lista "Data Integrity" entre las siete características).**
- **Microservicios a pesar de puntuar bajo en la característica principal (monArch):** compensado con aislar en un servicio lo que más rinde; es una razón válida si el repo la justifica, y la justifica por escrito.

## 5. Límites

- **Ninguno de estos repos se construyó ni se operó.** Que la base compartida "acopla" lo afirma el propio equipo (Pragmatic ADR-014: "may lead to chaotic coupling") y nadie lo midió. Tampoco se midió retraso de consistencia, ni pérdida de eventos.
- **La cadena evento → contexto → servicio** se puede mostrar en texto en un solo repo (BluzBrothers). En monArch y Pegasuz los contextos y agregados están en imágenes que el corpus no incluye; en Archangels y Pragmatic el event storming no se conecta con los cortes. No se puede afirmar que "los ganadores cortan con event storming": lo usan 5 de 12 (BluzBrothers, monArch, Pegasuz, Pragmatic y Archangels), y solo tres lo muestran produciendo los límites.
- **"Un dueño por dato" con regla verificable** (permisos de base) aparece en un solo repo (Pragmatic). "Dueño del estado de un dato" (Five Nines) y "dueño de los datos de cada servicio" (monArch) son declaraciones de principio sin mecanismo.
- **"Partir la base por fases"** solo lo dice Team 7. No hay segundo repo.
- **La condición para aceptar consistencia eventual** (no dinero ni vidas) está escrita en Pegasuz y se deduce de ArchColider; ningún otro repo la formula como criterio.
- **Estilo:** 7 de 10 repos que eligen estilo usan puntajes de una hoja de estilos (Pragmatic, Data Alchemists, Archangels, monArch, Pegasuz, BluzBrothers, Celus Ceals); en 6 de ellos los puntajes están en imágenes que no se pudieron leer (en Data Alchemists el ADR solo dice que se usó la hoja). No se pueden contrastar los puntajes con los ADR.
- **Estado de los ADR:** muchos figuran como "Proposed" (Team 7 casi todos; monArch los cinco leídos; ArchColider 007, 008, 012, 013; Data Alchemists los siete leídos). El corpus no dice si algo se revisó después.
- **Vocabulario heredado:** quanta, características principales y hoja de estilos son términos del libro *Fundamentals of Software Architecture* y de las clases de los organizadores. Repetirse en 6 repos no prueba que lo descubrieran por separado (ver autorrevisión 3 del diseño). Búsqueda del título del libro (y de *Hard Parts*) en los .md de los 12 repos: solo monArch lo cita (sección References del Readme). Otros pueden citarlo sin el título completo. [DATO] / [HUECO]
- **Five Nines:** se puede usar para la *redacción* de ADR-0007 y para el modelo de consistencia, no para mostrar que el diseño se respeta (los diagramas de secuencia no lo respetan o simplifican). Los "Domain Experts: Fleet Operations Manager, Customer Success Lead" del modelo de dominio están listados sin fuente; no se sabe si fueron consultados.
- **No se puede afirmar** que haya un método único de corte: BluzBrothers/monArch/Pegasuz usan event storming, Team 7 y Archangels características, Five Nines agregados con razones, ArchColider contextos con atributos de calidad.

## 6. Para elegir el elenco

| Verdad | Pragmatic | Five Nines | Otro mejor |
|---|---|---|---|
| **T13** (cortar desde el dominio) | **Media.** ADR-001 (event storming) y ADR-009 (servicio de Story por independencia de modelos, con 3 opciones declaradas) son citables. El documento de event storming es genérico y no muestra cómo salieron los servicios. | **Media.** Modelo de dominio con razón por cada límite (12 agregados); sin event storming ni asignación a servicios. Sirve para "qué razón justifica un límite", no para el método. | **BluzBrothers** (cadena completa y escrita), **Pegasuz** (quanta por dependencias síncronas), **Team 7** (aislamiento de facturación). |
| **T5** (dueño por dato) | **Fuerte.** ADR-014 + ADR-015 + ADR-010 + ADR-019 forman una historia con regla, mecanismo (permisos), costos y una excepción propia (ADR-019). Conecta con ADR-002 (elasticidad debilitada por la base compartida). | **Media, con problema.** ADR-0007 es un buen ADR de un dueño (alternativas + riesgos), pero los diagramas del mismo repo no lo respetan. Usable solo si se cuenta la discrepancia. | **Team 7** (fases y método de sincronización por dato) y **monArch** (efecto de la base compartida en los quanta). |
| **T14** (costo declarado) | **No la sostiene** (no usa el concepto; ADR-004 la deja fuera a propósito). Sirve como decisión contraria. | **Fuerte.** Límites de transacción dentro y entre agregados, con razón escrita. Con la salvedad de SD-001. | **ArchColider** (la línea entre lo eventual y lo que no, con las tres decisiones), **monArch** (la frase) y **Pegasuz** (la condición). |
| **E1** (razones de estilo) | **Buena.** ADR-002 + ADR-004. Una razón fuera de la tabla: viabilidad. | **No aplica** (sin ADR de estilo). | **ArchColider** (razón fuera de la tabla, condición para cambiar), **Team 7**, **Archangels** (comparación completa). |

Resumen concreto: **Pragmatic** cubre bien T5 y E1 y mal T14; **Five Nines** cubre bien T14 y a medias T13 y T5. Ninguno de los dos cubre T13 con el método completo ni T5 por fases. Un caso principal que arrastre las tres verdades necesita aportes de Team 7 (fases y facturación), ArchColider (línea de la consistencia) y BluzBrothers (cadena de corte), cada uno donde enseña algo que el caso principal no enseña.

## 7. Términos que hay que explicar

- **Event storming:** taller donde el equipo pone en una pared los hechos del negocio (en pasado: "pedido realizado"), el orden en que ocurren y quién los provoca.
- **Evento de dominio / comando / actor:** hecho del negocio ya ocurrido / orden que lo provoca / persona o sistema que da la orden.
- **Agregado:** grupo de datos que se cambian siempre juntos y se guardan en una sola transacción (una reserva con sus reglas).
- **Contexto delimitado (bounded context):** parte del sistema donde cada palabra del negocio tiene un solo significado.
- **Subdominio core / supportive / generic:** qué partes del negocio dan ventaja competitiva, cuáles lo apoyan y cuáles son comunes y se pueden comprar.
- **Quantum de arquitectura:** pieza que se despliega por separado y cuyas partes dependen unas de otras de forma síncrona; cuantos más enlaces síncronos, menos quanta independientes.
- **Estilos (monolito modular, service-based, microservicios, event-driven):** formas de organizar el despliegue y la comunicación; en el curso se enseñan por las razones que usan, no por catálogo. Service-based: pocos servicios grandes, a menudo con una base compartida. Monolito modular: un solo despliegue con módulos separados dentro.
- **Característica de calidad (driving characteristic):** propiedad que el sistema debe tener (disponibilidad, escalabilidad…) y que guía las decisiones.
- **Base compartida / dueño del esquema:** varias partes usan la misma base de datos / una sola parte puede escribir cada objeto.
- **Fuente única de verdad (single source of truth):** un solo lugar autoritativo para un dato; los demás lo consultan o lo copian.
- **Transacción ACID / atomicidad:** conjunto de cambios que se aplica completo o no se aplica; en una base única es automático, entre servicios no.
- **Transacción distribuida:** intento de lograr atomicidad entre varios servicios o bases; es lo que los equipos evitan.
- **Consistencia eventual:** los datos de dos partes coinciden después de un tiempo, no en el mismo instante.
- **Replicación de tablas / ETL:** copiar datos de una base a otra por una función de la base o por un proceso periódico.
- **CQRS y event sourcing:** separar cómo se escribe de cómo se lee un dato (CQRS) y guardar la historia de cambios en vez del estado final (event sourcing).
- **Cola con garantía de entrega / idempotencia:** el mensaje no se pierde / procesarlo dos veces produce el mismo resultado (por eso el id único y la versión de ADR-008).
- **PCI:** norma de seguridad para quien guarda datos de tarjetas; cuanto más sistema los toca, más se audita.
- **ADR:** registro corto de una decisión: contexto, decisión, consecuencias.
- **Hoja de estilos (architecture styles worksheet):** tabla que puntúa estilos contra características; la usan varios repos.

## 8. Qué se puede mostrar en pantalla

- **Pragmatic, par de ADR del mismo día:** ADR-014 ("Services may access the same DB" / "May lead to chaotic coupling. Therefore, we added ADR-015") junto a ADR-015 ("only one service has the right to write", "enforced with DB permissions"). Fuentes: `ADR/ADR-014-multiple-services-on-same-database.md`, `ADR/ADR-015-schema-ownership-and-permissions.md`. Fecha de ambos: 2024-09-26.
- **Pragmatic ADR-009:** las tres opciones A, B, C y la razón de la elegida. `ADR/ADR-009-creation-of-story-as-own-microservice.md`.
- **Team 7, README "Transition Architecture":** las dos fases en dos líneas, y la tabla de riesgos de la fase 1 (rendimiento, disponibilidad, seguridad). `README.md`. Lista de "four main domain areas" de ADR-1 con su característica por área.
- **Team 7, ADR-4:** "last 4 digits" en el cliente, el resto en facturación por cola, acceso de administradores por VPN. `ADR/ADR-4-extract-billing-quanta.md`.
- **monArch:** los cinco pasos del event storming (eventos, comandos, agregados, políticas, contextos), con las Figuras 3 a 5 en el repo original; la lista "Dynamic Coupling" y la frase "a quanta of 6". `Readme.md`. Cita de ADR05: "Giving up atomicity in workflows in favor of eventual consistency".
- **BluzBrothers:** la lista de 22 eventos, los 6 contextos y los 4 componentes que quedan. `EventStorming/EventStorming.md`.
- **Pegasuz:** lista de 8 quanta, definición de quantum, y las dos disponibilidades objetivo (3 y 4 nueves) según dependencia síncrona. `README.md`, `quanta/quanta-identification.md`.
- **Archangels:** una fila de la tabla de granularidad (por ejemplo Analytics: Run / Administer / Store con volatilidad "High", escalabilidad "Required") y la tabla de dominios con Core/Supportive/Generic. `1.ProblemBackground/ArchitectureAnalysis.md`.
- **ArchColider, ADR-002:** la tabla de 4 opciones por 10 criterios con +, ++, -, --. `4.ADRs/002 System approach.md`. Y los tres datos con tres reglas: catálogo (Tradeoffs 1), stock (ADR-012), pago (ADR-008).
- **Five Nines:** el diagrama Mermaid de agregados del modelo de dominio coloreado por grupo (booking, pago, operaciones, monitoreo), y los dos bloques "Transactional Consistency (Strong)" y "Eventual Consistency (Across Aggregates)". `hld/core-func/car-van-rental/3_Domain_Model.md`. Tabla de riesgos de ADR-0007.
- **Estilo:** las razones lado a lado, en una tabla de una frase por repo (la de la sección 2, E1).
