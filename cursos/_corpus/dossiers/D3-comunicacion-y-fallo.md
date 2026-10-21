# Dossier D3 · R3: decidir cómo se hablan las partes y los sistemas externos (síncrono o asíncrono, colas, adaptadores) y qué pasa cuando algo falla

Verdades: T15 y T3 del mapa, más la operación como parte del diseño (ArchColider ADR-003, 004, 005).
Rutas: todos los repos están en `katas-src/<Repo>/`. En las citas abrevio `Repo: ruta` sin ese prefijo.
Todo lo de abajo se leyó en los archivos originales. Las fichas solo se usaron como índice.

Resumen del veredicto antes de entrar en detalle:

| Verdad | Veredicto | Por qué en una línea |
|---|---|---|
| T15 | Se sostiene, con dos matices | Síncrono/asíncrono según si quien llama necesita la respuesta: lo sostienen 6 repos con razones explícitas. "Un adaptador por sistema externo" solo se sostiene cuando los sistemas hablan distinto (Pragmatic, Pegasuz, CELUS Ceals); Data Alchemists supone lo contrario. Aparece un tercer eje que el mapa no tenía: quién inicia la conversación (pull). |
| T3 | Se sostiene partida en piezas; outbox/inbox NO se sostiene como verdad general | Reintentos y cola que guarda: varios repos. Que recibir dos veces sea inofensivo: 4 repos, con profundidad desigual. Outbox/inbox: un solo repo (Archangels). Vía manual diseñada: un solo repo (CELUS Ceals). |

---

## 1. Las verdades, reformuladas

### T15 (formulación que sostiene la evidencia)
Cada conversación entre dos partes se decide preguntando si quien llama necesita la respuesta para poder seguir. Si la necesita (cobrar, ver el cambio que acaba de hacer, comprobar el stock en el momento de comprar), va síncrona. Si no la necesita, o si el otro lado puede estar caído, lento o con tope de ritmo, el mensaje se deja en una cola y el resultado se muestra después. Cuando los sistemas externos son muchos y cada uno habla distinto, cada uno se conecta por un adaptador propio; Data Alchemists, que supone que todas las agencias hablan igual, no dibuja adaptadores por agencia.

Dos agregados que salen de la lectura (no estaban en el mapa):
- **Quién inicia la conversación** es una tercera decisión, aparte de síncrono/asíncrono. CELUS Ceals y Pegasuz hacen que sea el lado más débil o menos controlado el que "consulta", no el que "recibe".
- Lo asíncrono tiene un precio que los repos declaran: más difícil de probar y depurar, orden de mensajes, y la pantalla tiene que saber mostrar un fallo que llega tarde.

### T3 (formulación que sostiene la evidencia)
Una cola no resuelve el fallo por sí sola. Para cada mensaje importante hay que decidir cuatro cosas: (1) si el receptor está caído, el mensaje se guarda y se reintenta (con pausas, no en bucle); (2) si el mismo mensaje llega dos veces, no debe cobrar dos veces ni duplicar nada (id único y versión, o una bandeja de entrada); (3) si el reintento nunca funciona, alguien se entera y queda un camino que no depende del sistema que falló; (4) qué significa que un dato no llegue (silencio = alarma, o dato viejo declarado como viejo).

Lo que NO se sostiene tal como estaba en el mapa:
- "outbox/inbox" como parte de la verdad. Solo Archangels lo decide (ADR-004), y en su ADR la sección Risks queda con solo "TODO". Ningún otro repo lo nombra. Se puede contar como la respuesta a un problema real (escribir en la base y publicar el evento son dos operaciones que pueden quedar a medias), pero no como práctica repetida.
- "vía manual" como práctica repetida. Solo CELUS Ceals la diseña como camino de primera clase (ADR-012). En otros repos el equivalente es parcial: PIN offline (ArchColider ADR-011), reproceso manual del trabajo (Team 7), revisión humana cuando falla la IA (Five Nines), canal redundante (BluzBrothers).
- La parte "reintentos" y "cola persistente" sí tiene varios repos, pero algunos solo la nombran sin diseñarla (ver sección 2).

### Operación como parte del diseño (solo ArchColider lo hace con ADR propios)
No se sostiene como verdad independiente (un repo con ADRs propios, otros con menciones sueltas). Lo que sí enseña ArchColider, en hechos: las métricas de máquina no dicen si el negocio funciona, así que el sistema incluye pruebas de camino de negocio que corren solas y miden resultado y duración, y esa medición alimenta decisiones de escalar o extraer servicios. Se cuenta como ejemplo dentro de R3, sin resultado propio.

---

## 2. Verificación por repo

### T15 · síncrono donde hace falta la respuesta, asíncrono con cola donde no; un adaptador por sistema externo

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| Pragmatic | Sí (asíncrono y adaptador); la parte síncrona solo aparece en un documento aparte | ADR/ADR-005-async-with-external-systems.md: "Unavailable HR systems should not lead to blocking processes." ADR/ADR-023: "We use a separate service for handling the transmission to the external HR systems." C4/C3-components-hr-integration.md: un adaptador por sistema (SAP SuccessFactors, Workday). EventStorming/event_storming.md: "One key decision was to make the payment process synchronous" | ADR-005 (2024-09-24) decide enviar a sistemas externos de forma asíncrona. ADR-016 pone los cambios de estado de matches en una cola de eventos. ADR-008 pone en cola las llamadas largas desde la UI. ADR-007: cada cliente de LLM externo con diseño orientado a eventos. Requisitos: Q16 "thousands, up to 200'000" configuraciones de HR; A29 unos 100 sistemas HR distintos. |
| Data Alchemists | Sí (síncrono/asíncrono por tipo de componente); no hay adaptadores por sistema | adrs/adr-3-data-reader.md y adr-6-sharing.md: síncronos. adr-4-data-updater.md, adr-5-trackers.md, adr-7-publishers.md: asíncronos con mensajería | Cinco ADR con el mismo contexto: lecturas y "sharing" síncronos (respuesta inmediata), escrituras, trackers de correo/reservas y publishers (redes sociales, notificaciones) asíncronos "decoupling trackers from external APIs". Todos en estado "Proposed". README supone: "All agency APIs, including those for airlines, hotels, and car rentals, provide a standardized integration interface." |
| Team 7 | Sí, el más explícito caso por caso | ADR/ADR-5-extract-customer-quantum.md; ADR-2-event-driven-broker.md; ADR-12-gateways.md; ADR-9-notification-service.md | En un solo ADR decide por cada interacción: contratos y encuestas por replicación de tablas (sin reacción inmediata), tarjeta de crédito y tickets por mensajería asíncrona, facturas por cola persistente. ADR-12: gateways hacia servicios de dominio síncronos. |
| Pegasuz | Sí (quién inicia, adaptador por NPO) | quanta/npo-integration.md; README.md (definición de quantum con "synchronous connascence") | Dos modos de integrar una ONG: que ella empuje datos a un stream, o que Spotlight consulte su API (el documento desarrolla el segundo, marcado "Long Term"). Una función por cada NPO y oferta; "Should be able to introduce new NPO integrations without affecting the existing ones." No hay ADR para esto. |
| CELUS Ceals | Sí (quién inicia; cola; un contenedor de integración por herramienta externa) | 3.ARDs/003.CameraUpdateStrategy.md; 010.UseAQueueOnCameraIntegrationServiceContainer.md; 4.Solution/.../IndividualContainers/ (GBIFIntegration, iNaturalistIntegration, LabellingPlatformIntegration) | La cámara consulta actualizaciones cada ciclo en vez de recibir (ADR-003). Cola entre la API que recibe mensajes de cámaras y el servicio que los enriquece (ADR-010). Un contenedor de integración por plataforma (GBIF, iNaturalist, plataforma de etiquetado); los archivos de los contenedores son solo un diagrama con enlace al ADR. |
| BluzBrothers | Parcial | ADR/ADR-016; C4/C2-containers.md | Topics en Kafka entre grabador, analizador, alertas y streamer; las alertas salen por HTTP al móvil y por websocket a la estación de enfermería. Ningún ADR razona "síncrono vs asíncrono"; ADR-012 elige el estilo por elasticidad, evolutividad y rendimiento. |
| Five Nines | Parcial pero con material propio (en HLD, no en ADR) | hld/core-func/car-van-rental/4_Sequence_Diagram.md (SD-001, SD-002); adrs/ADR-0002; adrs/ADR-0004 | SD-001: preautorización de pago síncrona antes de insertar la reserva, disponibilidad por evento con consistencia eventual. SD-002: desbloqueo por NFC como camino principal y llamada remota como respaldo. ADR-0004: "Maps API remains as fallback". |
| MonArch | Parcial | Readme.md (acoplamiento dinámico); ADRs/ADR05-CQRS-EventSourcing.md; ADRs/ADR03-Rest-over-http-and-websockets.md | Perfil pide datos a IAM de forma síncrona; Perfil ingiere eventos de Rewards y Connections de forma asíncrona; Reportes ingiere eventos de Perfil. ADR-005 rechaza que Reportes pida los datos a Perfil de forma síncrona por volumen y acoplamiento. |
| ArchColider | Parcial (adaptadores y cola, sin regla general) | ADR 009 Rely on payment service provider.md: "The internal payment system still should leave room for implementing additional adapters for emerging payment systems."; SystemAppoach.md (comunicación por log) | El pago va por proveedor externo; la comunicación entre servicios, por log de eventos "every service can consume data at its own pace". |
| Archangels | Parcial | 4.ADRs/003-component-communication.md; 018-use-interface-for-system-system-integration.md | Eventos de dominio como mecanismo principal. ADR-018: una Interfaz para todo sistema externo, con autenticación; no habla de síncrono o asíncrono sino de quién entra. |
| ZAItects | Parcial, fuera de este tema | usecases/hmw-ai-grading-short-answers.md | El Grader publica en una cola de consultas al LLM y se suscribe a la de respuestas; un gateway las reparte. No hay ADR que razone síncrono vs asíncrono. |
| ConnectedAI | No | features.md solo menciona un "Fallback Agent" | Búsqueda por palabras clave sin hallazgos sobre comunicación entre partes. |

### T3 · diseñar el fallo y la entrega

Separo la verdad en las piezas que el mapa mencionaba.

| Pieza | Repos que la sostienen | Evidencia principal |
|---|---|---|
| Reintentos con pausa | Pragmatic (diseñado), ArchColider (declarado en riesgos), Five Nines (HLD, lista de medidas), Data Alchemists (solo nombrado) | Pragmatic ADR-023; ArchColider 2.SolutionBackground/RisksAndSensitivePoints.md; Five Nines hld-vehicle-connectivity.md; Data Alchemists adr-4: "Robust error handling and retry mechanisms are essential." |
| Cola que no pierde (persistente / con acuse) | Team 7 (ADR-5), ArchColider (RabbitMQ con acuse y persistencia), Five Nines (Pub/Sub durable), Pragmatic (cola de eventos; tecnología en ADR-022 sin decidir), CELUS Ceals ("cannot be lost" sin detalle) | Team 7 ADR-5; ArchColider SystemAppoach.md; Five Nines ADR-0002 |
| Recibir dos veces es inofensivo (idempotencia) | ArchColider (id único + versión), Archangels (suscriptores idempotentes, inbox), Five Nines (manejo idempotente, deduplicación), ZAItects (el Grader comprueba si ya existe la entrada) | ArchColider ADR 008; Archangels ADR-003 y 004; Five Nines ADR-0002 y ADR-0017; ZAItects hmw-ai-grading-short-answers.md |
| Outbox / inbox | Solo Archangels | Archangels ADR-004 |
| Vía manual o fuera de línea | Solo CELUS Ceals como diseño (ADR-012); parcial en ArchColider (PIN), Five Nines (revisión humana), Team 7 (reproceso) | ver tabla de abajo |
| Decidir qué significa el silencio / dato viejo | BluzBrothers (Failover.md), ArchColider (ADR-012) | ver sección 3 |

Tabla por repo:

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| ArchColider | Sí, el más completo en entrega y duplicados | 4.ADRs/008 At least once delivery for ready to pay order.md; 012 Stale data from fridges.md; 011 Every meal delivery has pick up pin code.md; 2.SolutionBackground/RisksAndSensitivePoints.md; 3.ViewsAndPerspectives/InformationModels.md | ADR-008: acuse de mensaje + id único del cliente + número de versión; "the event with the same version will be discarded by the processing service." Riesgo técnico 1: proveedor de pago caído, los pedidos se guardan y se reintenta "for a defined period of time". Copia de seguridad: no se respalda la cola de pedidos porque el cliente reintenta con tiempo de espera. Estados: 008 Proposed, 012 Proposed, 011 Accepted. |
| Pragmatic | Parcial: reintento y cola de fallos sí; duplicados, tope y vía manual no | ADR/ADR-023-adapters-for-hr-systems.md; ADR/ADR-024-caching-of-resumes.md; C4/C3-components-hr-integration.md; C4/C3-components-story.md | Cola de mensajes fallidos que se procesa y reintenta "periodically"; C3: "If failures persist, requests are escalated to a higher retry queue until no further attempts are made." No dice qué pasa al final, ni cómo evita enviar el mismo currículum dos veces. ADR-023 deja la sección "Weakened characteristics:" vacía. |
| Archangels | Sí en entrega e idempotencia (solo ADR, sin diseño más allá) | 4.ADRs/003-component-communication.md; 004-use-inbox-outbox-pattern.md | Define el problema ("duel write") y el patrón; dos pasajes quedan con "TODO" (la sección Risks de 004; el enlace al ADR siguiente en 003). |
| CELUS Ceals | Sí en vía manual; parcial en el resto | 3.ARDs/012.ManualProcessOnCameras.md; 003; 010; 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md | La cámara funciona sin internet; datos por tarjeta SD y USB; la plataforma es la fuente de verdad de la configuración. ADR-010: cola con la razón "messages from inside the platform cannot be lost", sin decir si es persistente. |
| BluzBrothers | Parcial: diseña el fallo del receptor y del sensor, no el de la cola | ADR/ADR-016; ADR-019; ADR-020; FitnessFunctions/Alerts.md y Failover.md; C4/C3-components.md | Si un receptor de alertas falla, el otro canal sigue. Caché distribuida para que un analizador nuevo reconstruya reglas. Supuesto de 30 s para levantar instancias nuevas. No dice qué pasa con las señales durante esos 30 s ni cómo retoma el consumidor. |
| Team 7 | Parcial | ADR/ADR-2-event-driven-broker.md; ADR-5; ADR-3; ADR-11-extract-payment-job.md | Cola persistente para facturas, mensajería "guaranteed delivery" sin explicar el mecanismo, trabajos por lotes que se pueden volver a ejecutar. El README dice que la petición "succeeds after the ticket is saved in the customer database and the corresponding event is fired", sin decir cómo se asegura que el evento salga. |
| Five Nines | Parcial: lista de medidas, sin elegir entre alternativas | adrs/ADR-0002; hld/core-func/hld-vehicle-connectivity.md (tabla "Availability Enhancements"); hld/.../4_Sequence_Diagram.md | Tabla por capa: buffer local, réplica, ACK y reintento, reconexión con espera creciente, RPO ≤ 5 min y RTO ≤ 15 min. En SD-001 la reserva se confirma (COMMIT) y después se publica el evento, sin mecanismo para el caso de que la publicación falle. Ninguna secuencia dibuja la rama de pago fallido. |
| Data Alchemists | Parcial / no: solo menciones genéricas | adrs/adr-4-data-updater.md, adr-5, adr-7; adr-15-message-broker.md | Los tres ADR de mensajería repiten el mismo texto sobre "message durability" y "retry mechanisms"; el apartado Risks dice solo "TBD". No hay diseño de reintento, duplicado ni fallo. |
| Pegasuz | Parcial | quanta/npo-integration.md; other-services/bff-service.md; ADRs/010.adr-queue-stream.md | Extracción de datos de la ONG guardada "as is" con campo para marcar si se procesó (parecido a una bandeja de entrada, [DEDUCCIÓN]). El BFF debe "Stream system events to UI incase of failures in async commits". ADR-010: stream y no cola, por fidelidad al orden y a varios consumidores; costo declarado. |
| MonArch | Parcial (admite el costo) | ADRs/ADR05-CQRS-EventSourcing.md | Consecuencia negativa declarada: "Transactions could be missed due to service downtime". No propone mecanismo. |
| ZAItects | Parcial, en una pieza | usecases/hmw-ai-grading-short-answers.md | Paso 2 del Grader: si ya existe la entrada, se salta el procesamiento; si no, se crea marcada "being processed". El mapa mencionaba reintento o failover; lo que aparece de circuit breaker (usecases/hmw-ai-content-updates.md) es contenido de una evaluación de ejemplo, no una decisión de diseño. |
| ConnectedAI | No | features.md | Solo un agente de respaldo hacia soporte humano. |

### Operación (ArchColider y lo que hacen otros)

| Repo | ¿Lo hace? | Evidencia | Detalle |
|---|---|---|---|
| ArchColider | Sí, tres ADR | 4.ADRs/003 Tracing and Monitoring Sytem.md (Proposed); 004 Health check endpoints.md (Accepted); 005 Service readiness checks.md (Proposed); SystemAppoach.md | Ver ejemplo 5 de la sección 3. |
| Team 7 | Una mención | ADR-3-search-expert.md | El trabajo por lotes que asigna expertos "will require additional monitoring" porque puede no arrancar. |
| Pegasuz | Práctica general, no decisión | engineering-practices/Monitoring.md; other-services/infrastructure-services.md | Cada servicio hace health checks, métricas, logs y trazas con patrón sidecar. |
| Pragmatic | Citada como característica fortalecida | ADR-023 y ADR-007 | "Observability" aparece como fortalecida en ADR-023 y debilitada en ADR-007 ("Fewer metrics about external system"). |
| Five Nines | En una tabla | hld-vehicle-connectivity.md | "Dashboards for connection count, message rate, latency, backlogs"; "SLOs for telemetry freshness and command latency". |
| BluzBrothers | En contra | Deployment/Deployment.md | El rol de administración y monitoreo "is not a part of this architectural proposal". |

---

## 3. Los mejores ejemplos para enseñar

### T15

#### Ejemplo 1 · Team 7: una sola quantum, cinco interacciones, cinco respuestas distintas (ADR-5, ADR-2, ADR-12, ADR-9)
- **Caso.** Un sistema de tickets de soporte de una empresa de electrónica (Sysops Squad). Los clientes se quejan de tickets perdidos y de que el sistema se cae en picos de uso (README, contexto).
- **Situación que obliga a decidir.** Extraen el área del cliente para que sea disponible y rápida (ADR-5), pero el cliente interactúa con otras partes: contratos de soporte, datos de tarjeta, envío de tickets, encuestas, facturas. Una llamada síncrona de la parte del cliente a otra parte la ataría a la disponibilidad de la otra.
- **Qué decidió, por interacción.**
  - Contratos y encuestas: replicación de tablas (o un trabajo ETL periódico), porque "are not the kind of an event that needs a reaction". Las encuestas, además, solo sirven para analítica, así que también pueden empujarse de forma asíncrona.
  - Tarjeta de crédito: no se guarda en la parte del cliente; pasa a la parte de facturación. Alternativa descartada, con su razón: "Doing this synchronously (via a REST API or a RPC call) will nullify our efforts on scalability and availability for the customer quantum". Va por mensajería asíncrona (ADR-4 añade que así el cliente no espera a que se procese la tarjeta).
  - Ticket nuevo: "simple fire and forget message", porque el cliente no tiene por qué esperar a que se tome en proceso. En el README: la petición termina cuando el ticket queda guardado en la base del cliente y se dispara el evento.
  - Facturas: "persistent message queue" entre facturación y cliente. Razón: si el sistema de notificaciones está caído, "we don't want any invoices to be missed; customers should eventually get their invoices".
  - Del gateway a los servicios de dominio (ADR-12): se dejan síncronos "making gateways simple pass-through interfaces", con la razón de que si el cliente cambia algo en su perfil y recarga la página, el cambio debe verse enseguida. Entre dominios, las comunicaciones pasan por los gateways, ya sean síncronas o por cola.
  - Notificaciones (ADR-9): el servicio no necesita consideraciones especiales de disponibilidad porque que lleguen tarde por mantenimiento o fallo "is not critical to the business operations".
- **Alternativas declaradas.** Replicar por tabla vs ETL vs mensaje (ADR-5); notificación separada por dominio (ADR-9), descartada por duplicar implementación; un servicio de asignación reactivo a eventos (ADR-3), descartado por no poder priorizar tickets uno a uno.
- **Costo admitido.** ADR-2: "added complexity", la cola puede ser un punto único de falla (hay que balancearla) y "ticket workflow becomes more difficult for testing and debugging". Cierre del ADR: "Since aforementioned qualities are critical to the business we accept these trade-offs."
- **Qué enseña.** Que la pregunta "síncrono o asíncrono" no se responde una vez para todo el sistema: se responde por flecha, preguntando qué necesita saber quien llama y cuánto aguanta que el otro esté caído. También que "asíncrono" tiene sabores (replicación, olvidar-y-enviar, cola persistente) con garantías distintas.
- **Por qué este y no otro.** Es el único repo que pone las cinco respuestas en un mismo documento con la razón de cada una. Data Alchemists lo hace por componente pero con texto genérico; Pragmatic lo hace por sistema externo.
- **Salvedades.** Todos los ADR están "Proposed". El ADR-8 (replicación de la información de facturación) está marcado "OBSOLETE" y su mecanismo sigue apareciendo en ADR-5 para los contratos: el repo no explica qué lo reemplazó [HUECO; DEDUCCIÓN: lo reemplaza la mensajería de ADR-5 para la tarjeta].
- **Fuentes.** Team-7: ADR/ADR-5-extract-customer-quantum.md, ADR-4-extract-billing-quanta.md, ADR-2-event-driven-broker.md, ADR-12-gateways.md, ADR-9-notification-service.md; README.md.

#### Ejemplo 2 · Pragmatic: miles de sistemas de RR. HH. que fallan, y una plataforma que no se detiene (ADR-005, 008, 016, 023, 007)
- **Caso.** ClearView conecta candidatos con ofertas mediante currículos anonimizados, para una organización sin fines de lucro. Cuando un empleador desbloquea un currículum, hay que enviarlo a su sistema de recursos humanos.
- **Situación que obliga a decidir.** Los requisitos suponen unos 100 sistemas de RR. HH. distintos (A29), dos por empresa en promedio, hasta 200.000 configuraciones (A31, Q16). Cada API es distinta: el documento de características lo cuenta entre los tres retos principales ("Integrating multiple HR systems is a costly endeavor, as each system's API is different."). Y la característica que debe sostenerse: "Ensures product stability even if integrated HR systems experience downtime."
- **Qué decidió.**
  - ADR-005: toda comunicación hacia sistemas externos es asíncrona.
  - ADR-016: los cambios de estado de un match se publican en una cola de eventos, para que ningún proceso quede acoplado a otro; la razón: "With synchronous communication, the whole system is strongly coupled leading to bad fault-tolerance."
  - ADR-023: un servicio aparte para transmitir a los sistemas externos y una cola de mensajes fallidos que se procesa y reintenta periódicamente, con espera creciente ("one could implement an exponential backoff algorithm", ADR; el C3 lo da por implementado). Un adaptador por sistema (C3).
  - ADR-008: las llamadas largas desde la pantalla se desacoplan con colas; el costoso emparejamiento corre periódicamente en segundo plano.
  - ADR-007: cada cliente de un LLM externo con diseño orientado a eventos, porque las respuestas pueden tardar hasta 60 s (A22) y hay límites de ritmo duros (A23).
- **Alternativas declaradas.** En ADR-024 (rechazado): guardar los currículos en una caché del servicio de RR. HH. para aliviar carga. Descartada con la razón de que, si el sistema externo no responde, el envío "is not time sensitive anymore", así que basta espaciar más los reintentos; la caché trae invalidación y memoria cara. Decisión: "Denied, we prefer the load over the memory cost." Condición de revisión: si la carga sobre el servicio de candidatos se vuelve cuello de botella.
- **Costo admitido.** ADR-005: los sistemas de terceros necesitan interfaz asíncrona o, si no, "A retry mechanism is needed". ADR-008: "The UI design to consider failures and failure messaging to the user more carefully", y debilita la testabilidad ("more cases of message ordering are possible"). ADR-016 debilita testabilidad y simplicidad. ADR-007: el ritmo contra el límite del LLM "currently not solved" (aparece en Known Limitations del README).
- **Qué enseña.** Cómo el número y la inestabilidad de los sistemas externos (miles, cada uno distinto, con fallos frecuentes: ADR-023 dice que los fallos "are expected to occur regularly") empujan a cuatro decisiones encadenadas: asíncrono, servicio de transmisión aparte, adaptador por sistema, cola de fallos con reintento espaciado. También enseña el costo en la pantalla.
- **Por qué este y no otro.** Es el único caso donde el tamaño del problema está escrito con cifras (100 sistemas, 200.000 configuraciones) y donde las cuatro decisiones se apoyan unas en otras con referencias cruzadas.
- **Salvedades.** El archivo `ADR-023-adapters-for-hr-systems.md` lleva el título "Dead-letter queue for HR systems"; README y EventStorming lo citan como "adapters". La sección de características debilitadas de ADR-023 está vacía. ADR-022 (tecnología de cola: Kafka vs RabbitMQ) queda "Open" y sin decisión. ADR-005 menciona el sistema de facturación como externo asíncrono, mientras event_storming.md dice que el pago es síncrono: el repo no concilia las dos cosas [HUECO].
- **Fuentes.** Pragmatic: ADR/ADR-005, 008, 016, 022, 023, 024, 007; C4/C3-components-hr-integration.md; ArchitectureCharacteristics/Characteristics.md; Requirements/requirements-and-assumptions.md (Q16, A22, A23, A29, A31); README.md (Known Limitations); EventStorming/event_storming.md.

#### Ejemplo 3 · CELUS Ceals y Pegasuz: que consulte el más débil (pull)
- **Caso.** CELUS Ceals: cámaras de fauna silvestre con batería y conexión intermitente que informan a una plataforma. Pegasuz: una plataforma que integra ONG, algunas con API propia y otras sin sistema.
- **Situación que obliga a decidir.** CELUS: la cámara no tiene internet de forma estable ("the internet connection is not always reliable and available") y la batería limita el consumo. Hay que cambiar su configuración desde la plataforma. Pegasuz: la plataforma necesita el progreso de los candidatos que cada ONG lleva en su sistema.
- **Qué decidió.**
  - CELUS ADR-003: evalúa dos opciones con puntaje de 1 a 5 en seguridad, uso de recursos y tolerancia a fallos. API siempre encendida en la cámara (3/5 en tolerancia, 3/5 en recursos). La cámara consulta cada ciclo (4/5 y 4/5; seguridad 4/5 contra 5/5 de la primera). Gana la segunda. Razón: "Treating the camera as an external resource reduces the security complexity and makes the camera system be more fault-tolerant." La plataforma es la fuente de verdad: "must override any camera manual configuration". Si no hay internet, el ciclo termina y se espera al siguiente (2.SolutionBackground/2.ProposedScenarios.md).
  - Pegasuz npo-integration.md: dos formas de integrar. (1) La ONG empuja a un stream. (2) Spotlight consulta la API de la ONG. Desarrolla la segunda: un planificador (scheduler) consulta periódicamente cada ONG activa, guarda lo traído "as is" y otro paso lo transforma y publica un evento.
- **Alternativas declaradas.** CELUS: la API siempre encendida (puntajes arriba). Pegasuz: empuje de la ONG, que "is straightforward" y se resuelve con los servicios de otro quantum; consulta propia "requires a sophisticated system that can be built in the longer term".
- **Costo admitido.** CELUS: "There is no real-time configuration, the platform stored configuration can not be applied yet on the camera"; la cámara debe guardar un token. Pegasuz: "the data in both systems is not guaranteed to be consistent", mitigado como eventualmente consistente "based on the frequency of the scheduler".
- **Qué enseña.** Que además de síncrono o asíncrono existe quién inicia. Cuando el otro lado es poco fiable o no es nuestro, que consulte (o que lo consultemos nosotros en ciclos) evita depender de que esté disponible en el momento justo, a costa de tiempo real.
- **Por qué este y no otro.** Son los únicos dos repos que razonan la dirección de la llamada. CELUS lo hace con una tabla de puntajes; Pegasuz lo describe sin ADR.
- **Salvedades.** Los puntajes de CELUS son estimaciones del equipo. El quantum de integración de Pegasuz está marcado "[Long Term]" y no tiene ADR. En CELUS ADR-003 el título de la opción 2 dice "Threat the camera request changes" (error de tipeo en el original).
- **Fuentes.** Celus-Ceals: 3.ARDs/003.CameraUpdateStrategy.md, 2.SolutionBackground/2.ProposedScenarios.md. Pegasuz: quanta/npo-integration.md.

#### Ejemplo 4 · Five Nines: las flechas de una reserva, una por una (SD-001, SD-002)
- **Caso.** Alquiler de autos y vans de MobilityCorp. El flujo de reserva y el de desbloqueo muestran, en una secuencia, qué va síncrono y qué por evento.
- **Situación que obliga a decidir.** Reservar debe cerrarse en 2 s (NFR_3); desbloquear, en 3 s al percentil 99.
- **Qué decidió.** Reserva: la preautorización de pago se pide primero y de forma síncrona ("fail-fast on payment issues"); luego se inserta la reserva en una transacción y se publica un evento; la disponibilidad de los vehículos se actualiza por evento: "eventual consistency acceptable for non-critical path". Desbloqueo: el NFC con el vehículo es el camino principal; si falla, llamada remota a través del backend con "Circuit breaker on Vehicle IoT calls (fail gracefully if down)".
- **Alternativas declaradas.** No hay alternativas por flecha. Sí las hay en ADR-0002 para la telemetría: HTTPS directo ("no QoS"), o un broker MQTT autónomo.
- **Costo admitido.** Consistencia eventual para la disponibilidad; el respaldo remoto del desbloqueo tarda 3 a 5 s según la propia secuencia.
- **Qué enseña.** Que dentro de un solo flujo conviven llamadas síncronas (las que deciden si se puede seguir) y eventos (lo que puede ponerse al día después), y que el camino principal puede no pasar por el backend.
- **Por qué este y no otro.** Muestra con un caso de uso corriente (reservar, desbloquear) la pregunta por flecha. Su límite: ninguna secuencia dibuja qué pasa cuando el pago falla, y estas secuencias no son ADR sino documentos de apoyo.
- **Fuentes.** Five-Nines: hld/core-func/car-van-rental/4_Sequence_Diagram.md; adrs/ADR-0002; hld/core-func/hld-vehicle-connectivity.md.

### T3

#### Ejemplo 1 · ArchColider ADR-008: el pedido "listo para pagar" puede llegar dos veces y debe cobrarse una
- **Caso.** Farmacy Food: comidas saludables entregadas en refrigeradores inteligentes; el sistema de pedidos recibe los pedidos de las apps.
- **Situación que obliga a decidir.** El pago es el escenario crítico del negocio ("selling meals is the whole point"). Hay que garantizar que cada pedido listo para pagar llegue al procesador (entrega al menos una vez), y al mismo tiempo que no se cobre doble: "it should not lead to doubled, tripled, and so on charges from a user's account".
- **Qué decidió.** Una cola de mensajes con acuse de recibo. El cliente manda el pedido con un id único; el procesamiento comprueba si ya existe un pedido con ese id y usa un número de versión para detectar mensajes viejos; "the event with the same version will be discarded by the processing service". Sobre eso, Event Store con proyecciones. Elección de herramienta (SystemAppoach): RabbitMQ porque ofrece entrega al menos una vez, acuse y persistencia integrada.
- **Alternativas declaradas.** El ADR no compara alternativas; SystemAppoach.md presenta Kafka (log de eventos) y RabbitMQ (acuse, persistencia) en la misma sección de herramientas, sin una comparación escrita entre ambos [DATO]; que cada uno cubra un uso distinto es [DEDUCCIÓN].
- **Costo admitido.** "It will slightly decrease performance, but we get data integrity." Estado: Proposed.
- **Piezas vecinas del mismo repo que completan el cuadro.** (a) Riesgo técnico "Payment provider's service is temporarily down": todos los pedidos se guardan y la petición al sistema de pago puede reintentarse durante un plazo definido; política de confianza para usuarios conocidos (RisksAndSensitivePoints.md). (b) InformationModels.md: no se respalda la cola de pedidos porque la app del cliente tiene un tiempo de espera y, si no hay confirmación, ofrece reintentar; la cola solo se apoya en su persistencia integrada para el reinicio del servicio. (c) El pago rechazado o vencido notifica al usuario y la app puede reintentar el último pedido con su confirmación.
- **Qué enseña.** Que "entregar al menos una vez" obliga a pensar en el duplicado, y que la forma barata de resolverlo es un identificador único que viene de quien origina el mensaje, más una versión. También que el usuario puede ser parte del reintento.
- **Por qué este y no otro.** Es el único ADR de los 12 repos que enlaza las dos mitades (garantía de entrega y no-doble-cobro) para un caso de dinero.
- **Salvedades.** No dice qué pasa con un pedido que nunca confirma, más allá del tiempo de espera del cliente. No hay cifras de carga de pedidos (el análisis de costos usa de 500 a 10.000 peticiones al día, CostAnalysis.md).
- **Fuentes.** ArchColider: 4.ADRs/008 At least once delivery for ready to pay order.md; 2.SolutionBackground/SystemAppoach.md (sección RabbitMQ); 2.SolutionBackground/RisksAndSensitivePoints.md; 3.ViewsAndPerspectives/InformationModels.md (secciones de pago cancelado y respaldos).

#### Ejemplo 2 · Pragmatic ADR-023/024: reintentar con espacio, y qué cuesta no reintentar más rápido
- **Caso.** El mismo envío de currículos a sistemas de RR. HH. del ejemplo 2 de T15.
- **Situación que obliga a decidir.** Con miles de configuraciones, los fallos "are expected to occur regularly" (ADR-023). Cada reintento vuelve a pedir el currículum al servicio de candidatos.
- **Qué decidió.** Cola de mensajes fallidos: se procesa y reintenta de forma periódica; para gastar menos recursos se puede espaciar con espera creciente guardando en una base el momento del siguiente intento. El C3 agrega: si el fallo persiste, la petición pasa a una cola de reintento de nivel superior "until no further attempts are made".
- **Alternativas declaradas.** ADR-024: guardar el currículum en caché del adaptador. Descartada: con el sistema externo caído la entrega ya no es urgente; espaciar los reintentos reduce la carga sin invalidación de caché ni memoria cara.
- **Costo admitido.** Más carga sobre el servicio de candidatos ("we prefer the load over the memory cost"). Del lado de la pantalla, ADR-008 admite que hay que diseñar el mensaje de fallo al usuario.
- **Qué enseña.** Que el reintento tiene un costo en carga propia, y que la espera creciente es una palanca para pagarlo; que decidir no optimizar también se escribe (con su condición de revisión).
- **Por qué este y no otro.** Es el único caso donde se ve la decisión de reintento junto con la decisión rechazada de ahorrar carga, con razón.
- **Salvedades (qué falta en el repo).** Nada dice qué pasa tras el último reintento (el C3 sugiere en una nota que "email notifications" son una mejora futura), ni cómo se evita enviar el mismo currículum dos veces, ni quién ve la cola de fallos. Hay un requisito (R27) de que el empleador pueda recibir un currículum sin sistema configurado "(f. ex. Email or Download-Link)", pero está planteado como funcionalidad, no como respaldo ante fallos [DEDUCCIÓN: podría servir de vía manual; el repo no lo conecta].
- **Fuentes.** Pragmatic: ADR/ADR-023-adapters-for-hr-systems.md, ADR-024-caching-of-resumes.md, ADR-008-ui-reactivity.md; C4/C3-components-hr-integration.md; Requirements/requirements-and-assumptions.md (R27).

#### Ejemplo 3 · CELUS Ceals ADR-012: cuando el camino manual es parte del diseño
- **Caso.** Cámaras de fauna silvestre en lugares sin internet fiable, usadas por voluntarios.
- **Situación que obliga a decidir.** "Cameras should be able to work without internet given the location where it is set." Cambiar el hardware de una cámara ya desplegada es caro, y recargar baterías o sacar la tarjeta ya son pasos manuales. Las fotos y videos son críticos ("Must be always available"); las notificaciones, de criticidad baja ("can be not available because of the internet in the wild").
- **Qué decidió.** Las cámaras tienen una interfaz de dispositivo para configurarlas; los datos se leen de la tarjeta SD y se cargan en otro equipo; los modelos y configuraciones pueden entrar por USB. Es el camino principal para los datos pesados: el principio de integridad dice que los datos se borran de la SD cuando se suben a la plataforma ("Data will be erased from SD once is uploaded"). La primera configuración (token) también es manual. El ADR-003 hace que la plataforma anule cualquier configuración manual de la cámara.
- **Alternativas declaradas.** No se declaran alternativas en ADR-012 (solo criterio "Configurability").
- **Costo admitido.** "Manual steps of the user" y "Any person can change a camera if they have physical access to it". ADR-009 agrega que cámaras con el mismo token generan datos incoherentes.
- **Qué enseña.** Qué datos pueden depender de la red y cuáles no, escrito como tabla de criticidad; y que el respaldo manual se diseña (quién lo hace, con qué, qué admite) en vez de dejarlo como "se resolverá".
- **Por qué este y no otro.** Es el único repo que trata la ausencia de red como situación normal y de ahí deriva decisiones de comunicación (pull), de datos (SD) y de seguridad (token fijo).
- **Salvedades.** Esto es un fallo del enlace con el dispositivo, no de una cola; no cubre reintentos ni duplicados.
- **Fuentes.** Celus-Ceals: 3.ARDs/012.ManualProcessOnCameras.md, 009.SimpleSecurityOnCameraAPI.md, 003; 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md; 2.SolutionBackground/1.ArchitecturePrinciples.md; 4.Solution/1.FirstIteration/README.md (supuestos).

#### Ejemplo 4 · Archangels ADR-003/004: el problema de escribir y publicar a la vez
- **Caso.** Farmacy Family, extensión del sistema de Farmacy Foods; se conecta a los flujos de Kafka ya desplegados (2.SolutionBackground/Deployment.md; CommunicationView).
- **Situación que obliga a decidir.** Con eventos de dominio, al ocurrir algo hay que guardarlo y publicarlo: "This introduces a common cause of data inconsistencies, often referred to the duel write problem". Y quien suscribe suele recibir "at least once", por lo que el mismo evento puede llegar dos veces.
- **Qué decidió.** Publicar con outbox: guardar el evento en un almacén de datos, acusar recibo y que otro proceso lo envíe y lo marque como enviado. Suscribir con inbox: guardar el evento, acusar recibo y que otro proceso lo maneje y lo marque como manejado. Beneficios declarados: el outbox garantiza que el mensaje se envía al menos una vez y es fácil agregar reenvío; el inbox permite manejar los mensajes a su ritmo y "Easy to implement idempotency, can ignore events we have already logged in the data soter".
- **Alternativas declaradas.** Ninguna distinta en ADR-004.
- **Costo admitido.** La bandeja de entrada requiere sondeo o detección de cambios; "adds complexity as we need processes to handle the inboxes/outboxes separatly form the publisher or subscriber". ADR-003 reconoce que la entrega al menos una vez obliga a que los suscriptores sean idempotentes y que la consistencia eventual puede ser nueva para quienes vienen de sistemas transaccionales.
- **Qué enseña.** Nombra el problema (dos escrituras que pueden quedar a medias) y el mecanismo clásico. Es el vocabulario con que explicar qué falta en el cuadro de otros repos (por ejemplo, Five Nines SD-001: COMMIT y después publicación).
- **Por qué este y no otro.** Es el único repo con el patrón.
- **Salvedades.** La sección Risks de ADR-004 dice solo "TODO"; no hay diagrama ni tecnología de almacén elegida para la bandeja; el ADR-003 remite al siguiente ADR con "TODO add link". Es una decisión de papel con una página y media.
- **Fuentes.** Archangels: 4.ADRs/003-component-communication.md, 004-use-inbox-outbox-pattern.md; 3.ViewsAndPerspectives/CommunicationView/README.md.

### Operación como parte del diseño

#### Ejemplo 5 · ArchColider ADR-004, 005, 003: probar el negocio, no solo la máquina
- **Caso.** El sistema de pedidos de Farmacy Food empieza como monolito modular y puede partirse en servicios.
- **Situación que obliga a decidir.** Hay que saber cuándo extraer un módulo a servicio o escalar, y las métricas de máquina no alcanzan: "hardware/network metrics don't provide information about actual system availability" (SystemAppoach). Además, un servicio que arranca lento (calienta caché) puede parecer caído.
- **Qué decidió.**
  - ADR-004 (Accepted): un endpoint de salud por servicio. Chequeo técnico con latido (el supervisor escucha pasivamente en vez de preguntar). Chequeo de negocio: conjuntos de escenarios de camino crítico; "Each scenario starts with a dummy message from a dedicated supervisor to measure execution of specific user scenarios", y se mide si el resultado es correcto y cuánto tarda.
  - ADR-005 (Proposed): los endpoints informan también si el servicio está listo, y los demás deben respetarlo, para evitar que un tiempo de espera lleve al supervisor a levantar más instancias y se produzca un efecto cascada con "higher bills".
  - ADR-003 (Proposed): sistema de monitoreo y trazas. Alternativas comparadas con precio: DataDog ($15 por host y mes), Grafana (gratis), ELK (gratis), CloudWatch (unos $0,30 por los primeros 10.000 métricas). Elige DataDog porque casi no requiere integración ni mantenimiento; con una opción abierta "we would have to appoint 0.2-0.5 time of a developer / administrator to take care of the monitoring".
- **Costo admitido.** ADR-004: los mensajes de prueba hay que diseñarlos en el código ("this requires additional effort and increases cognitive complexity"); riesgo: "Developers may be unaware of how to implement it correctly and the possible impact on processing real requests from users." ADR-003: pagar la cuota y que el precio suba.
- **Qué enseña.** Que operar es una decisión de diseño que se escribe con alternativas y costos como cualquier otra, y que el chequeo de negocio detecta lo que el técnico no ("a healthy technical case, but something in a business logic stucked"). Las mediciones sirven para decidir cuándo escalar o extraer, con hechos.
- **Por qué este y no otro.** Es el único repo con ADR propio de operación; BluzBrothers deja el monitoreo fuera de alcance y Pegasuz lo trata como práctica general.
- **Salvedades.** Todo en papel: no hay cifras de lo que tarda un escenario ni umbrales. ADR-003 menciona "$15 USD per host, per month" y su decisión dice "$15 USD per month": dos formulaciones distintas del mismo precio. Que ArchColider diga que el monitoreo debe actuar como "architecture fitness functions" enlaza con T12 (otro dossier).
- **Fuentes.** ArchColider: 4.ADRs/003 Tracing and Monitoring Sytem.md, 004 Health check endpoints.md, 005 Service readiness checks.md; 2.SolutionBackground/SystemAppoach.md (sección "Health checks based on business-critical path scenarios").

#### Ejemplo 6 · Qué significa el silencio: BluzBrothers y ArchColider ADR-012
- **BluzBrothers (monitoreo de pacientes).** Failover.md recorre el flujo cuando falla un sensor: el grabador no guarda nada, el streamer no muestra nada ("nothing happens; only some signals are lost"), y el analizador depende de reglas del procesador lógico, que puede configurarse para que, si el dato no existe o es viejo, "the rule will not be executed, or an alert will be sent". La caché conserva la última señal con su hora. ADR-016: si un receptor de alertas no está disponible se activan notificaciones en el otro ("the unavailability of one data receiver will trigger notifications on the other"); C2: la plataforma de mensajes se eligió para tener al menos dos formas de entregar alertas. ADR-019/C3: caché distribuida para "ensure that crucial data is not lost even if the Vital Sign Analyzer crashes". ADR-020: recuperación supuesta en 30 s, con la admisión "which may not always be achievable".
- **ArchColider ADR-012.** El sistema de refrigeradores es externo y puede dejar de enviar datos (fuera de línea, mantenimiento, límites de ritmo). Decisión: llevar y mantener en el sistema propio un stock estimado, que se ajusta cuando llegan datos nuevos. Costo: presión de cómputo y complejidad de concurrencia; "requires a business decision about the edge case when something was purchased but not delivered"; acción abierta: acordar con negocio cuándo se levanta una alarma por hueco de datos ("It might be minutes or hours").
- **Qué enseña.** Que la ausencia de datos es una situación a diseñar (qué se muestra, qué alarma suena y a los cuántos minutos), y que la decisión de negocio queda escrita como pendiente cuando no se puede resolver en papel.
- **Salvedades.** BluzBrothers no documenta el arranque del consumidor tras un reinicio ni la pérdida de señales durante los 30 s. ArchColider deja la alarma sin umbral.
- **Fuentes.** BluzBrothers: FitnessFunctions/Failover.md, Alerts.md; ADR/ADR-016, 019, 020; C4/C2-containers.md, C3-components.md. ArchColider: 4.ADRs/012 Stale data from fridges.md.

---

## 4. Decisiones contrarias

| Repo | Qué decidió | Razón declarada | Qué muestra |
|---|---|---|---|
| Pragmatic ADR-019 | Analítica lee directo de la base de candidatos, en vez de recibir los datos por un tema asíncrono (opción 3, "weaker coupling, better fault-tolerance") | Simplicidad, mantenibilidad y rendimiento; debilita la seguridad ("since it can access and holds most data") | Dentro del mismo repo que defiende lo asíncrono, el acoplamiento por base de datos se acepta cuando el proceso no es crítico en el tiempo y se declara el costo de seguridad. |
| Pragmatic event_storming | Pago síncrono | "to improve user experience and system accuracy" | Cobrar es un caso donde quien llama necesita la respuesta. El repo no lo desarrolla en un ADR. |
| Data Alchemists | Lecturas y "sharing" síncronos (ADR-3, ADR-6) | Respuesta inmediata, simplicidad, latencia predecible | Lo síncrono se elige por lo mismo que lo asíncrono se descarta: el usuario espera. |
| Data Alchemists README | Supone APIs de agencias estandarizadas | Se afirma como supuesto, sin razón | Sin adaptadores por sistema: la misma verdad depende de si los sistemas hablan igual. Pragmatic supone lo contrario (cada API es distinta). Ningún repo mide cuál suposición es verdadera. |
| Team 7 ADR-12 | Del gateway al dominio, síncrono | Un cambio en el perfil debe verse al recargar | Dentro de un diseño asíncrono, lo que el usuario ve a continuación se mantiene síncrono. |
| ArchColider ADR-013 | Catálogo guardado en el dispositivo y comprobación real al confirmar la compra | Respuesta rápida con conexión lenta; la espera de la confirmación de pago ya existe | Se acepta un catálogo viejo y se paga con una comprobación síncrona en el único momento que importa ("Users can experience longer delays during the purchase confirmation step"). |
| BluzBrothers ADR-010 | La disponibilidad no entra en la elección del estilo; se resuelve a nivel de instancias (duplicarlas) | "availability should be addressed outside of the system architecture" | El fallo se resuelve con infraestructura (réplicas y orquestador), no con el diseño de los mensajes. ADR-020 renuncia a la conmutación por instancia y confía en reponerlas en 30 s. |
| Pragmatic ADR-004 | Integridad de datos "downplayed": se trata en el código, no en la arquitectura | La calidad de los modelos ya la cubre la testabilidad | La idempotencia y los duplicados no aparecen en ningún ADR de Pragmatic; coincide con el vacío observado en la sección 2. |
| Pragmatic ADR-021 | No resolver la concurrencia de hiring managers por ahora (estado "Denied") | Se puede resolver por UX o con bloqueo optimista luego | Una carrera de datos se pospone con una alternativa barata escrita. |
| Team 7 ADR-3 | Asignación de tickets como trabajo por lotes y no como servicio reactivo a eventos | Priorizar tickets y poder volver a correr el trabajo | Una alternativa a la cola: un barrido periódico, que no necesita reintento porque lo no asignado se toma en la siguiente pasada ("will never be lost" según el README). |
| Pegasuz ADR-010 | Stream en vez de cola | Varios consumidores y orden; cola con confiabilidad "low" en su tabla | Un criterio distinto a "cola persistente": la cola de mensaje único no sirve si varios servicios necesitan el mismo evento. |

---

## 5. Límites

- **Ningún repo midió esto en producción.** Todos son diseños en papel juzgados por expertos. Las cifras de comportamiento ante fallos (30 s de BluzBrothers, 693 ms de la cadena de BluzBrothers, RPO/RTO de Five Nines, tiempos de reintento de Pragmatic) son objetivos o supuestos, no mediciones.
- **Estados de los ADR.** Muchos están "Proposed": todo Data Alchemists, todo Team 7 (salvo uno obsoleto), ArchColider 003, 005, 008 y 012, Pragmatic ADR-003 y ADR-022 ("Open" y sin decisión). Los aceptados relevantes: Pragmatic 005, 008, 016, 023; Archangels 003 y 004; ArchColider 004 y 011; CELUS Ceals 003, 010, 012; BluzBrothers 012 a 020.
- **Outbox/inbox y la idempotencia con mecanismo dependen de un repo cada uno** (Archangels y ArchColider). No se puede afirmar que sea práctica de los ganadores.
- **"Vía manual" depende de un repo (CELUS Ceals)** y se refiere a un dispositivo, no a una cola. No se puede afirmar que los ganadores diseñen rutas manuales para fallos de mensajería.
- **Qué pasa cuando se agotan los reintentos** no está definido en Pragmatic; ArchColider solo da un plazo y la reintentabilidad desde la app. Ningún repo describe quién recibe una alerta por mensaje muerto.
- **Los ADR de Data Alchemists sobre mensajería son genéricos**: el mismo contexto en los cinco ADR y las mismas consecuencias dentro de cada grupo (síncronos / asíncronos); en los tres asíncronos el apartado Risks dice solo "TBD". Se pueden usar para mostrar la regla (síncrono para lo que el usuario espera, asíncrono para el resto), no para mostrar cómo se diseñó el fallo.
- **Cifras de carga que justifiquen el asíncrono** aparecen solo en Data Alchemists (150 M de reservas a refrescar cada 5 minutos, README) y BluzBrothers (4.000 señales por segundo en pico, Sizing.md). Ninguno vincula esas cifras con la decisión de cola. El cálculo "unas 500.000 consultas por segundo" para Data Alchemists es una división mía (150.000.000 / 300 s), no un dato del repo.
- **El origen de la regla "caso por caso".** Team 7, Pragmatic y MonArch usan vocabulario del método de los organizadores (quanta, estilos, características). Repetirse no prueba independencia (ver DISENO-CURSO, hallazgo 3).
- **Queda fuera de este dossier:** los umbrales y la revisión humana de la IA (T10) y la disposición de datos sensibles al enviar entre servicios (T4a); solo se tocan como ejemplos.

---

## 6. Para elegir el elenco

**Pragmatic.**
- T15: lo ilustra mejor que cualquier otro repo para sistemas externos. Cinco ADR enlazados (005, 008, 016, 023, 007), un C3 propio de la integración, cifras del problema (100 sistemas, hasta 200.000 configuraciones) y una decisión contraria dentro del mismo repo (ADR-019). Falta la parte síncrona razonada: el pago síncrono solo aparece en el acta de event storming.
- T3: ilustra bien reintento espaciado (ADR-023/024) y el costo en carga. No ilustra duplicados, final de los reintentos ni vía manual. Un guion no puede afirmar que Pragmatic "resuelve" la entrega.
- Operación: casi nada.
- Continuidad hacia IA (R6): los clientes de LLM son asíncronos por la misma lógica (60 s de espera, límites de ritmo). Esto permite pasar de R3 a R6 sin cambiar de caso.

**Five Nines.**
- T15: ilustra bien con un caso corriente (reservar, desbloquear) qué flecha es síncrona y cuál va por evento, y camino principal sin backend con respaldo remoto. Pero sale de documentos de apoyo (secuencias), no de ADR con alternativas por flecha.
- T3: la mejor lista de medidas (buffer local, replay idempotente, ACK y reintento, RPO/RTO, circuito, tiempo de espera de 30 s con respaldo de revisión humana). La lista no declara alternativas medida por medida (salvo ADR-0002) y no dibuja ningún fallo de pago. Hay un contraste útil con Archangels: SD-001 confirma y después publica, sin mecanismo.
- Operación: SLOs y paneles en una tabla; sin decisión.

**Qué otro repo ilustra mejor que ambos.**
- T3, entrega y duplicados: **ArchColider** (ADR-008 + riesgos del proveedor de pago + reintento desde la app). Es el mejor ejemplo individual de la verdad.
- T15, caso por caso en un mismo diseño: **Team 7** (ADR-5 y ADR-12).
- Quién inicia y vía manual: **CELUS Ceals**.
- Outbox/inbox, solo como explicación del problema: **Archangels**.
- Operación: **ArchColider** (ADR-004, 005, 003).

Recomendación sobre el elenco para R3, en hechos: con Pragmatic como caso principal, T15 queda cubierta casi entera y T3 queda a medias; los huecos (duplicados, qué hace falta cuando se agotan los reintentos, operación) se llenan con ArchColider (ADR-008 y ADR-004). Con Five Nines como caso principal, T15 y T3 se cubren con una sola lista de medidas, pero sin las decisiones rechazadas que enseñan el costo. No hace falta un tercer caso para esta verdad más allá de ArchColider; Team 7 y CELUS Ceals entran como segundo ejemplo solo si el curso necesita "caso por caso" y "quién inicia", que ninguno de los dos candidatos principales muestra.

---

## 7. Términos que hay que explicar

- **Síncrono / asíncrono**: en síncrono quien llama espera la respuesta antes de seguir; en asíncrono deja el pedido y sigue, y la respuesta (si hay) llega después.
- **Cola de mensajes (queue)**: lugar donde un servicio deja un pedido para que otro lo tome cuando pueda.
- **Cola persistente**: cola que guarda los mensajes en disco, de modo que sobreviven a un reinicio.
- **Broker**: el programa que administra las colas y los temas (Kafka, RabbitMQ).
- **Topic / stream (tema, flujo)**: canal donde un evento puede ser leído por varios consumidores, a diferencia de una cola donde cada mensaje lo toma uno solo.
- **Evento**: aviso de que algo ya ocurrió ("pedido pagado"), no una orden.
- **Acuse de recibo (ack)**: el receptor avisa que el mensaje se procesó; si no llega, el broker lo reenvía.
- **Entrega al menos una vez (at-least-once)**: nada se pierde, pero un mensaje puede llegar repetido.
- **Idempotencia**: propiedad de una operación que, aplicada dos veces con los mismos datos, tiene el mismo efecto que aplicada una.
- **Cola de mensajes fallidos (dead-letter queue)**: cola aparte donde van los mensajes que no pudieron entregarse, para reintentarlos o revisarlos.
- **Reintento con espera creciente (exponential backoff)**: cada nuevo intento espera más que el anterior, para no saturar al otro lado.
- **Outbox / inbox**: tablas donde se guarda el mensaje antes de enviarlo (outbox) o antes de procesarlo (inbox), para no perderlo ni procesarlo dos veces.
- **Escritura doble (dual write)**: guardar en la base y publicar el evento son dos operaciones separadas; si una falla, los datos quedan inconsistentes.
- **Adaptador**: pieza que traduce entre el formato de un sistema externo y el nuestro, de modo que el resto del sistema no conoce esos detalles.
- **API gateway / BFF**: puerta de entrada única para los clientes; BFF es la que se arma a la medida de las pantallas.
- **Consistencia eventual**: los datos de dos partes coinciden con un poco de retraso, no en el mismo instante.
- **Pull / push (consultar / empujar)**: en pull, quien necesita el dato lo pide cada tanto; en push, quien lo tiene se lo manda.
- **Trabajo por lotes (batch job)**: proceso que corre en horarios fijos sobre todo lo pendiente, en vez de reaccionar a cada evento.
- **Replicación de tablas / ETL**: copiar datos de una base a otra de forma automática o periódica.
- **Circuit breaker (cortacircuitos)**: deja de llamar a un servicio que está fallando durante un rato, para no agravar el problema.
- **Health check / latido (heartbeat) / readiness**: pruebas con que un servicio dice si vive y si está listo para recibir trabajo.
- **Dog pile**: avalancha de peticiones acumuladas que satura a un servicio recién levantado.
- **Failover / redundancia**: tener una copia lista para tomar el relevo cuando falla la principal.
- **Rate limit (límite de ritmo)**: tope de peticiones por unidad de tiempo que impone un servicio externo.
- **QoS (de MQTT)**: nivel de garantía de entrega del protocolo para dispositivos (0, 1 o 2).
- **RPO / RTO**: cuántos datos se pueden perder (RPO) y cuánto se puede tardar en recuperar el servicio (RTO) tras un desastre.
- **Quantum (de arquitectura)**: parte desplegable por separado con alta cohesión y dependencias síncronas con sus vecinos (definición de Pegasuz, README).

---

## 8. Qué se puede mostrar en pantalla

| Visual | Contenido | Fuente |
|---|---|---|
| Tabla "una interacción, una respuesta" | Contratos: replicación de tablas; tarjeta: mensajería asíncrona; ticket: olvidar-y-enviar; facturas: cola persistente; gateway a dominio: síncrono | Team-7: ADR/ADR-5-extract-customer-quantum.md y ADR-12-gateways.md |
| Cita | "Doing this synchronously (via a REST API or a RPC call) will nullify our efforts on scalability and availability for the customer quantum" | Team-7: ADR/ADR-5-extract-customer-quantum.md |
| Diagrama de componentes de la integración con RR. HH. | Orquestador, adaptadores, cola de fallos con reintentos | Pragmatic: C4/images/C3-components-hr-integration.svg y C4/C3-components-hr-integration.md |
| Cifras del problema | "up to 200'000" configuraciones; ~100 sistemas; hasta 60 s de respuesta de un LLM | Pragmatic: Requirements/requirements-and-assumptions.md (Q16, A29, A31, A22) |
| Recuadro "decisión rechazada" | ADR-024: caché de currículos, "Denied", y la razón | Pragmatic: ADR/ADR-024-caching-of-resumes.md |
| Tabla de puntajes de la actualización de la cámara | Seguridad 5/5 vs 4/5, recursos 3/5 vs 4/5, tolerancia a fallos 3/5 vs 4/5 | Celus-Ceals: 3.ARDs/003.CameraUpdateStrategy.md |
| Tabla de criticidad de datos | Video y fotos: crítico; notificaciones: bajo | Celus-Ceals: 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md |
| Secuencia de dos caminos | Pedido con id único y versión; un mensaje con la misma versión se descarta | ArchColider: 4.ADRs/008 At least once delivery for ready to pay order.md (texto; el diagrama de pedidos es img/FF_concurency_orders.png, sin revisar) |
| Cita sobre el chequeo de negocio | "Each scenario starts with a dummy message from a dedicated supervisor to measure execution of specific user scenarios." | ArchColider: 4.ADRs/004 Health check endpoints.md |
| Tabla de alternativas de monitoreo con precios | DataDog $15 por host y mes; Grafana y ELK gratis (con 0,2 a 0,5 de un desarrollador); CloudWatch ~$0,30 | ArchColider: 4.ADRs/003 Tracing and Monitoring Sytem.md |
| Cadena de tiempos de BluzBrothers | Grabador 320 ms + streamer 320 ms + base 16 ms + plataforma 5 ms + LAN 32 ms = 693 ms | BluzBrothers: FitnessFunctions/Sizing.md |
| Secuencia de alertas por dos canales | Imagen de la secuencia de alerta | BluzBrothers: UseCases/images/alerting_sequence.jpg; texto en UseCases/US2-alert.md |
| Tabla "Availability Enhancements" | Medidas por capa, RPO ≤ 5 min y RTO ≤ 15 min | Five-Nines: hld/core-func/hld-vehicle-connectivity.md |
| Secuencia de reserva | Preautorización síncrona, commit, evento, actualización eventual | Five-Nines: hld/core-func/car-van-rental/4_Sequence_Diagram.md (SD-001, mermaid) |
| Tabla de dos modos de integrar ONG | Empuje de la ONG vs consulta de la plataforma | Pegasuz: quanta/npo-integration.md |
| Bloque de código del patrón | "save the event to a data store, ack, and have a separate process send the event and mark as sent" | Archangels: 4.ADRs/004-use-inbox-outbox-pattern.md |
| Pares de ADR en un solo cuadro | ADR-3, ADR-6 (síncronos) frente a ADR-4, ADR-5, ADR-7 (asíncronos) | Profitero-Data-Alchemists: adrs/ |
