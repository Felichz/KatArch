# Ficha · ArchColider · Farmacy Food (Otoño 2020)

Rutas entre paréntesis relativas a la raíz del repo (sin la parte `-src`). Marcas: [DATO] = el repo lo dice; [DEDUCCIÓN] = inferido de lo que dice; [HUECO] = el repo no lo dice o lo deja sin resolver.

## 1. El caso

[DATO] El cliente es Farmacy Food, una startup de comida saludable que se describe como "tech-enabled" y busca ofrecer comidas "radically affordable and accessible" (1.ProblemBackground/BusinessGoalAndScope.md). Pide un *ordering system* que conecte a los usuarios con ghost kitchens: ver qué hay disponible, comprar y retirar en cualquier punto de venta o heladera inteligente (1.ProblemBackground/BusinessGoalAndScope.md, "Business goal"). Hay cuatro tipos de usuario: ocasional (paga en efectivo en PoS), conocido (con cuenta y tarjeta, sin plan), suscriptor (entrega regular) y admin de PoS (Glossary.md). [DATO] El repo marca como situación de riesgo las "concurrent updates of available meals", y pide que el catálogo mantenga consistencia de datos (The Script.md, sección "Presentation"). [DEDUCCIÓN] El problema central que se desprende es vender stock que el equipo no controla (heladeras, con datos de una API externa) sin cobrar dos veces y permitiendo retiro aun sin red (4.ADRs/008 At least once delivery for ready to pay order.md; 4.ADRs/011 Every meal delivery has pick up pin code.md; 4.ADRs/012 Stale data from fridges.md). Restricciones duras: [DATO] equipo limitado, time-to-market crítico, AWS como plataforma principal y presupuesto "very limited" (1.ProblemBackground/Constraints.md). Cifras: [DATO] 300 comidas por semana hoy; 1.500 a 2.000 por semana para diciembre; 68 ubicaciones y 1.000 suscriptores a fin de año; 10 comidas por semana por suscriptor (1.ProblemBackground/BusinessGoalAndScope.md, "Numbers/Metrics"). Regulación: [HUECO] no se nombra ninguna norma; el repo habla de datos personales de pago "w.r.t compliance, and auditing" (4.ADRs/009 Rely on payment service provider.md) y deja como tema no cubierto "Local compliance with user privacy" (2.SolutionBackground/SystemAppoach.md, "Missed topics"). Límite de alcance: [DATO] no se modifican heladeras ni sistemas de cocina (The Script.md). Brief comercial del caso, aparte del repo: [DATO] heladeras de 2 x 2 pies en edificios de departamentos, accesibles 24/7 con tarjeta de débito o crédito o con pedido en línea, y cupón de comida gratis para inquilinos nuevos (docs/Farmacy Food Smartfridge Apt Brief.pdf). [HUECO] El repo no declara que el equipo haya ganado: dice que llegó a semifinales (README.md; The Script.md, "We are thrilled..." y "semi-finals").

## 2. Qué entregó el equipo

[DATO] Cantidad de ADR: 16 (001 a 016): 4 Accepted, 10 Proposed, 1 Declined (010), 1 Draft (016) (4.ADRs/).

- `README.md`: presentación del equipo (cuatro integrantes) e índice de la solución. Los diagramas viven en un tablero Miro externo (README.md, "Resources").
- `The Script.md`: guion de la presentación oral; resume dominio, monolito modular, actor por heladera, log de eventos, costos y riesgos.
- `Glossary.md`: términos de usuarios, sistemas y "inventory update".
- `Questions.md`: preguntas al dueño sobre suscriptores, cocina, reservas y el alcance de las heladeras. No tiene respuestas. Una pregunta aparece repetida dos veces.
- `1.ProblemBackground/`: alcance y negocio (BusinessGoalAndScope.md), pre-análisis de requisitos del dueño y casos de uso (FunctionalRequirements.md), 4 restricciones (Constraints.md), tabla de stakeholders (Stakeholders.md), 6 drivers de negocio, 10 SAR y detalle de cada SAR (BusinessDrivers.md).
- `2.SolutionBackground/`: principios, estilo, dominio estratégico Core/Supportive/Generic y modelo conceptual (SolutionOverview.md); calidad por subsistema, diseño, alternativas y productos comerciales (SystemAppoach.md); 3 bloques de supuestos (Assumptions.md); 4 trade-offs (Tradeoffs.md); 7 riesgos de negocio, 7 técnicos y 5 puntos sensibles (RisksAndSensitivePoints.md).
- `3.ViewsAndPerspectives/`: vistas según Rozanski y Woods (Readme.md); escenarios de usuario con 3 journeys (UserScenariosPerspective.md); eventos y comandos con frecuencia y tamaño, backup y ciclo de vida (InformationModels.md); concurrencia de catálogo, actores y campañas (Concurrency.md); despliegue en AWS y riesgo de mapas (DeploymentView.md); costos en 3 escenarios (CostAnalysis.md); seguridad con Cognito y ALB (Security.md).
- `3.ViewsAndPerspectives/infrastructure/`: autenticación (Authentication.md), servicios y hardware virtual (Infrastructure-services-and-virtual-hardware.md), red en VPC de 2 zonas de disponibilidad (InfrastructureAndNetworking.md), escalado y balanceo (InfrastructureScalingAndBalancing.md).
- `3.ViewsAndPerspectives/docs/Data&PayloadsEstimates.xlsx`: estimaciones de tamaño y tráfico que sostienen CostAnalysis.md e InformationModels.md. [DATO] Tiene celdas con `#VALUE!` en las hojas "Forecasts" y "DataTypes".
- `4.ADRs/`: los 16 ADR.
- `docs/`: brief del caso (PDF); presentación `Architecture proposal_v2.pptx` (26 diapositivas, mismo contenido que los .md); plantillas `Architecture Description Template.docx` y `ADT sample.docx` (este último es de otro caso, CleverSupply); `slides1-3.pdf` y el PDF de Rozanski y Woods son material del curso; `tactics/` son PDF de tácticas de referencia sin contenido del caso.
- `all_adrs.json`: copia de los 16 ADR; [DATO] se comparó y es idéntica a los archivos de `4.ADRs/`. `adr-template.md` está vacío (0 bytes).
- `.github/workflows/markdown-link-checker.yml`: CI que revisa enlaces Markdown en cada push a master.
- `img/`: no se leyó (exclusión del brief). [DATO] Según los pies de figura de los .md, hay diagramas de dominio estratégico, metamodelo conceptual, componentes, modularización, actores, flujos de eventos y comandos, user journeys (.drawio), VPC y auto-scaling.

[DATO] Tipos de artefacto presentes: ADR, glosario, preguntas al dueño, supuestos, riesgos, trade-offs, vistas de Rozanski y Woods con checklists, estimaciones de volumen, análisis de costo.
[DATO] Fitness functions: se mencionan en The Script.md ("Metrics trend analysis should be used as fitness functions"), 4.ADRs/003 y 4.ADRs/016, pero no hay ninguna definida.
[DATO] No aparecen event storming, C4 ni OKR en todo el repo.
[DEDUCCIÓN] No hay historias de usuario formales; "user story" aparece una vez, en 3.ViewsAndPerspectives/UserScenariosPerspective.md, con sentido de escenario.

## 3. Decisiones

Fuente de cada fila: `4.ADRs/<número> <título>.md`, los 16 archivos leídos completos. Las columnas Decisión, Alternativas, Razón y Trade-off son [DATO], salvo lo que se indique. Las etiquetas son [DEDUCCIÓN] del contenido del ADR.

| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas |
|---|---|---|---|---|---|
| 001 Record architecture decisions (Accepted) | Usar ADR, tal como los describe Michael Nygard. | No declara. | "We need to record the architectural decisions made on this project." | No declara. Positive, Negative, Risks y Bonus Features dicen "If any", sin completar. | ADR |
| 002 System approach (Accepted) | Modularized monolith, con posibilidad de migrar a microservicios "when needed". | Monolith, Microservices, Micro-kernel (tabla de 10 atributos). El Context menciona blackboard, pero no lo evalúa en la tabla. | "Based on alternatives in the context of the business needs and a development team". | Hace falta disciplina en la comunicación entre módulos, o "the big ball of mud". En la tabla, Availability de la opción elegida es "-" y Scalability es "+". | monolito-modular, evolutividad, tradeoffs-explicitos, ADR |
| 003 Tracing and Monitoring Sytem (Proposed) | DataDog para monitoreo y alertas, como servicio SaaS. | Grafana y ELK Stack (gratuitos, requieren mantenimiento). Amazon CloudWatch (0,30 USD por 10.000 métricas). DataDog: 15 USD por host y mes. | Integración mínima sin mantenimiento. Con OSS habría que destinar "0.2-0.5 time of a developer / administrator". | 15 USD por mes, y "the price might increase in the future". Menos carga de mantenimiento por ser servicio administrado. | observabilidad, costo, cloud-gestionada, fitness-functions, tradeoffs-explicitos, ADR |
| 004 Health check endpoints (Accepted) | Endpoint de salud por servicio. Heartbeat para chequeo técnico y mensajes de prueba para caminos críticos de negocio. | No declara formalmente. Contrasta el heartbeat con el "ping pattern" (el supervisor empuja requests). | Decidir extracciones y escalado con métricas técnicas y de negocio. | Los mensajes de prueba exigen "additional effort" y suman complejidad cognitiva: "We accept this trade-off". Riesgo: que los desarrolladores no sepan implementarlos. | observabilidad, resiliencia-fallos, riesgos-explicitos, tradeoffs-explicitos, ADR |
| 005 Service readiness checks (Proposed) | Los health checks informan si el servicio está listo para procesar, y los demás servicios lo respetan. | No declara. | Servicios que tardan en iniciar (por ejemplo, calentar caché) reciben requests y provocan timeouts, nuevas instancias y "higher bills". | No declara. Consecuencia positiva: evita el efecto dog pile y falsas alarmas. | resiliencia-fallos, costo, ADR |
| 006 Zero trust architecture (Proposed) | Las llamadas internas entre módulos llevan auth y claims desde el inicio. | No declara. | "we can't rely on an assumption that requests from the same subnetwork are safe". Prepara la extracción de módulos. | "add complexity to communication between modules"; requiere servicio de identidad; habrá que optimizar módulos monolíticos. | zero-trust, seguridad, evolutividad, tradeoffs-explicitos, ADR |
| 007 Event sourcing usage (Proposed) | Event sourcing con almacén de eventos. El ADR lo llama "EventSource", OSS. | Snapshot usage (descrita con pros y contras). Event sourcing. | Historial completo para investigar quejas de usuarios; migración de modelo sin perder datos; datos de comportamiento. | "A new system might be used in a suboptimal way until developers grasp the idea". "Preferable start with SaaS solution to remove support and scale issues." | event-sourcing, tradeoffs-explicitos, ADR |
| 008 At least once delivery for "ready to pay" order (Proposed) | Cola con acknowledgment para pedidos listos para pagar. Id único del pedido y número de versión para descartar duplicados y versiones viejas. | No declara. El software de cola no se nombra. | Garantizar que el pedido se procese al menos una vez, evitando cargos dobles por concurrencia. | "It will slightly decrease performance, but we get data integrity." | cola-de-mensajes, resiliencia-fallos, event-sourcing, tradeoffs-explicitos, ADR |
| 009 Rely on payment service provider (Proposed) | Delegar en un proveedor externo de pagos. | No declara en el ADR. 2.SolutionBackground/Tradeoffs.md #4 contrasta con integrar directamente Visa, Mastercard, AmEx, JCB y PayPal. | Ahorrar el tiempo de implementar "a wide variety of payment methods". | Pagar comisiones y seguir tendencias. Cuidado con datos personales "w.r.t compliance, and auditing". No se nombra GDPR. | costo, privacidad-GDPR, tradeoffs-explicitos, ADR |
| 010 Feedback System separation (Declined) | Texto de Decision: feedback propio en la app y encuestas con terceros (SurveyMonkey, Google Surveys). Estado: Declined. | No declara alternativas formales. Usa terceros para encuestas. | Decision: reseñas que animan a armar menús, foco en el negocio central, bajo acoplamiento. Reason: brechas de datos personales con terceros, costo de agregar resultados, permisos de encuestas. | Moderar contenido vulgar (Negative). Guardar imágenes sube costos (Neutral). | tradeoffs-explicitos, ADR |
| 011 Every meal delivery has pick up pin code (Accepted) | Código de 6 a 8 dígitos por comida despachada desde una ghost kitchen. Desde 2020-11-24: id único por comida y código derivado de ese id, cargado en el dispositivo. | No declara. El Context descarta la validación en línea (tarjeta o apertura desde la app) porque la heladera puede estar sin red. | Retirar la comida aun con la heladera desconectada. | Adivinación: "Someone can be so lucky that they can guess a pin code from a first attempt". Código largo, "too long to type". Bonus: delegar la recogida. | resiliencia-fallos, seguridad, riesgos-explicitos, tradeoffs-explicitos, ADR |
| 012 Stale data from fridges (Proposed) | Mantener del lado propio el stock de heladeras y ajustarlo cuando llegan datos nuevos. | No declara. | No se controla frecuencia ni estructura de datos del sistema de heladeras. Puede no haber datos: offline, mantenimiento, throttling. | "computational pressure to our system and cognitive complexity to the concurrency model". Riesgo de perder compensaciones por cupón. Requiere decisión de negocio sobre compras no entregadas. | cache, resiliencia-fallos, observabilidad, riesgos-explicitos, tradeoffs-explicitos, ADR |
| 013 Cache the meal catalogue (Proposed) | Catálogo completo en el dispositivo del usuario. La disponibilidad se verifica en backend al confirmar la compra. | No declara. | Velocidad con conexiones lentas o inestables. Costo de transferir el catálogo (20 comidas: 500 a 700 kb sin imágenes). | "Users can experience longer delays during the purchase confirmation step". App más grande, más lógica en el cliente, catálogo que puede estar desactualizado. | cache, rendimiento-latencia, costo, riesgos-explicitos, tradeoffs-explicitos, ADR |
| 014 Deployment Strategy (Proposed) | Máquinas virtuales EC2 en AWS, con contenedores detrás de un reverse proxy. Escalar vertical primero y horizontal después. | On-premise, serverless, Kubernetes (on-prem o PaaS), OpenShift, VM de AWS o Azure (en el Context). | Costo bajo. Escalar componentes por separado. Kubernetes descartado por el esfuerzo de plataforma (cluster, monitoreo, service mesh). | Positivo: bajo costo, poco esfuerzo cognitivo, mantenimiento sencillo. Negativo: vendor lock-in. | escalabilidad, costo, contenedores, tradeoffs-explicitos, ADR |
| 015 Integration with Map Providers (Proposed) | Integrar con Here Maps. | OpenStreetMaps (gratis, open source), TomTom, MapBox, Here Maps (tabla de precios). | "good market reach and first 25K requests were free". Volumen esperado de usuarios. | "250K transactions per month looks decent". Pasar a plan premium al crecer. Vigilar las solicitudes mensuales. | costo, tradeoffs-explicitos, ADR |
| 016 Use of Infrastructure as Code (Draft) | IaC. Recomienda CloudFormation, que "is not officially part of the ADR". Terraform aceptable si el equipo lo domina. | El Context describe el aprovisionamiento imperativo como propenso a errores (no se evalúa en tabla). Terraform, mencionado. | Evitar drift. Correr fitness functions sobre la especificación antes de desplegar. Probar escenarios sin desplegar. | Se pierden cambios ad hoc sin drift. API difícil al inicio. Documentación de algunos proveedores poco madura. Roles de aprovisionamiento con permisos excesivos. | IaC, fitness-functions, deployability, tradeoffs-explicitos, riesgos-explicitos, ADR |

## 4. Patrones y prácticas presentes

- **Monolito modular con comunicación entre módulos tratada como red** (monolito-modular, evolutividad) [DATO]: "isolate communication between internal modules and make it as transparent as possible (pretending that there is a network connection)" (2.SolutionBackground/SystemAppoach.md, "Modularized services"; 4.ADRs/002 System approach.md).
- **Event sourcing para pedidos y pagos** (event-sourcing) [DATO]: el historial sirve para investigar quejas; hay read models proyectados desde el almacén (4.ADRs/007 Event sourcing usage.md; 2.SolutionBackground/SystemAppoach.md, "Event sourcing").
- **Modelos de escritura y lectura separados** (CQRS) [DEDUCCIÓN]: el repo habla de sincronizar "updates and read models" y "write and read models" (4.ADRs/007; 2.SolutionBackground/SystemAppoach.md, sección COTS, "Event Store"). No usa la palabra CQRS.
- **DDD para el núcleo** (DDD) [DATO]: "we propose building systems based on event sourcing and domain-driven design for core components" (2.SolutionBackground/SolutionOverview.md, "Style").
- **Mensajes antes que llamadas directas** (event-driven) [DATO]: principio 4, "Messages over direct calls", y comandos y eventos entre partes del monolito (2.SolutionBackground/SolutionOverview.md, "Principles"; The Script.md).
- **Log-based streaming para propagar información** (streaming, kafka) [DATO]: cada servicio consume a su ritmo. Kafka es el servicio administrado de AWS para notificaciones, métricas y reportes (2.SolutionBackground/SystemAppoach.md, "Log-based communication" y "Kafka"; 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md).
- **Cola de mensajes con acknowledgment** (cola-de-mensajes) [DATO]: RabbitMQ en Amazon MQ, con entrega al menos una vez (2.SolutionBackground/SystemAppoach.md, "RabbitMQ"; 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md, "Amazon MQ"). [HUECO] No hay ADR que lo decida; 4.ADRs/008 dice solo "MessageQueue software".
- **Un actor por heladera para el stock** (otro: actor-model) [DATO]: los pedidos pasan de actor en actor, uno a uno; cada actor es "one actor per fridge" (3.ViewsAndPerspectives/Concurrency.md; The Script.md).
- **Número de versión por agregado** (otro: versionado-de-agregados) [DATO]: "every aggregate has a version number", para evitar locks (3.ViewsAndPerspectives/Concurrency.md); también para descartar eventos viejos (4.ADRs/008).
- **Caché del stock en backend y del catálogo en el dispositivo** (cache) [DATO]: 4.ADRs/012, 4.ADRs/013 y 2.SolutionBackground/Tradeoffs.md #1.
- **Facade de pagos y de notificaciones** (otro: facade) [DATO]: el subsistema de compra "acts as a facade to the payment system"; notificaciones "facade for notification systems" (2.SolutionBackground/SystemAppoach.md, "Composition").
- **Capa de traducción frente a heladeras** (otro: anti-corruption-layer) [DATO] "ACL" en "our ACL can transform data from fridges" (3.ViewsAndPerspectives/InformationModels.md, "Catalog Updated"). [DEDUCCIÓN] Es una capa de traducción frente a un sistema externo.
- **Zero trust en llamadas internas** (zero-trust, seguridad) [DATO]: 4.ADRs/006 Zero trust architecture.md.
- **Autorización por atributos desde el inicio** (seguridad) [DATO]: "Attribute-based access control introduced from the beginning for all modules" (2.SolutionBackground/SolutionOverview.md, "Communication and security"). Login con Cognito y reglas del ALB que validan JWT (3.ViewsAndPerspectives/infrastructure/InfrastructureScalingAndBalancing.md).
- **Health checks por heartbeat y por caminos críticos** (observabilidad, resiliencia-fallos) [DATO]: 4.ADRs/004 Health check endpoints.md; 2.SolutionBackground/SystemAppoach.md, "Health checks based on business-critical path scenarios".
- **Readiness checks** (resiliencia-fallos) [DATO]: 4.ADRs/005 Service readiness checks.md (estado Proposed).
- **Circuit breaker y protección de dog pile** (resiliencia-fallos) [DATO] listados como opciones para "Service overloading" (2.SolutionBackground/RisksAndSensitivePoints.md). [HUECO] No hay ADR ni diseño que los implemente.
- **Telemetría obligatoria** (observabilidad) [DATO]: principio 3 (2.SolutionBackground/SolutionOverview.md); DataDog como agregador (4.ADRs/003).
- **Reporting en almacén histórico separado** (otro: reporting-en-almacen-separado) [DATO]: "Reports run on dedicated historical storage to avoid influence on operational data storage" (2.SolutionBackground/SystemAppoach.md, "Independent data storage for reporting").
- **Código de retiro offline** (resiliencia-fallos, seguridad) [DATO]: 4.ADRs/011 Every meal delivery has pick up pin code.md.
- **Infrastructure as Code** (IaC, deployability, fitness-functions) [DATO]: 4.ADRs/016 Use of Infrastructure as Code.md (Draft). La Constraint 2 pide "super simple to deploy" (1.ProblemBackground/Constraints.md).
- **Contenedores detrás de reverse proxy sobre EC2** (contenedores) [DATO]: 4.ADRs/014 Deployment Strategy.md.
- **Escalado vertical primero, horizontal después** (escalabilidad) [DATO]: 4.ADRs/014; 2.SolutionBackground/SystemAppoach.md, "Modularized services". Contradice 3.ViewsAndPerspectives/DeploymentView.md (ver sección 7).
- **Auto-scaling por métricas** (escalabilidad) [DATO]: como recomendación para ahora, "CPU utilization > 75%" y "Memory utilization > 85%" (3.ViewsAndPerspectives/infrastructure/InfrastructureScalingAndBalancing.md).
- **Dos zonas de disponibilidad en una región** (disponibilidad-HA) [DATO]: 3.ViewsAndPerspectives/infrastructure/InfrastructureAndNetworking.md. SystemAppoach.md dice que la disponibilidad "should be solved with restarts and vertical scale" en la primera etapa.
- **VPC con subredes públicas y privadas** (cloud-gestionada, seguridad) [DATO]: "We will not allow any traffic from the internet directly on our private subnets" (3.ViewsAndPerspectives/infrastructure/InfrastructureAndNetworking.md).
- **Servicios administrados de AWS y SaaS** (cloud-gestionada) [DATO]: Cognito, Amazon MQ, SNS, DynamoDB (en costos) y DataDog como SaaS fuera de AWS (3.ViewsAndPerspectives/CostAnalysis.md; 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md).
- **Costo por escenarios con cálculo por línea** (costo) [DATO]: MIN, PROJECTED y RAPID (3.ViewsAndPerspectives/CostAnalysis.md). Ver sección 7 por cruces en el resumen.
- **Estimación de volumen por evento** (otro: estimacion-de-volumen) [DATO]: tabla de frecuencia y tamaño en kb por evento (3.ViewsAndPerspectives/InformationModels.md) y hoja de payloads (3.ViewsAndPerspectives/docs/Data&PayloadsEstimates.xlsx).
- **Escenarios de usuario con journeys** (otro: escenarios-de-usuario) [DATO]: 3 escenarios con diagramas (3.ViewsAndPerspectives/UserScenariosPerspective.md).
- **Vistas de Rozanski y Woods con checklists** (otro: viewpoints-rozanski-woods) [DATO]: 3.ViewsAndPerspectives/Readme.md. [DEDUCCIÓN] Los checklists al final de Concurrency.md, DeploymentView.md y Security.md no tienen respuestas.
- **ADR como registro de decisiones** (ADR) [DATO]: 4.ADRs/001 Record architecture decisions.
- **Glosario** (glosario) [DATO]: Glossary.md.
- **Supuestos explícitos** (supuestos-explicitos) [DATO]: 2.SolutionBackground/Assumptions.md, en tres bloques (heladeras, cocina, equipo).
- **Riesgos y puntos sensibles explícitos** (riesgos-explicitos) [DATO]: 2.SolutionBackground/RisksAndSensitivePoints.md (7 de negocio, 7 técnicos, 3 sensibles de negocio y 2 técnicos).
- **Fuera de alcance explícito** (fuera-de-alcance-explicito) [DATO]: "Out of scope" en 1.ProblemBackground/BusinessGoalAndScope.md.
- **Trade-offs explícitos** (tradeoffs-explicitos) [DATO]: 2.SolutionBackground/Tradeoffs.md (4 puntos) y en cada ADR.
- **Preguntas al dueño** (otro: preguntas-al-dueno) [DATO]: Questions.md.
- **Pruebas y testabilidad** (testabilidad) [DATO, débil]: "Maintainability includes tests, metrics, and health checks" (2.SolutionBackground/SystemAppoach.md). [HUECO] No hay estrategia de pruebas.
- **Verificación de enlaces en CI** (otro: CI-verificacion-de-enlaces) [DATO]: .github/workflows/markdown-link-checker.yml, en push a master.
- **No aparecen en el repo:** event storming, C4, OKR, historias de usuario formales [DATO, búsqueda en todo el repo].

## 5. Cómo llegan de los requisitos a la arquitectura

[DATO] La cadena documental existe en parte, dentro de 1.ProblemBackground/BusinessDrivers.md: 6 drivers de negocio (BD) → 10 requisitos arquitectónicos significativos (SAR), con la columna "From BD" → detalle de cada SAR en 8 bloques. Las restricciones están en 1.ProblemBackground/Constraints.md (4 puntos, "drives all trade-off decisions"). Los principios y calidades están en 2.SolutionBackground/SolutionOverview.md y 2.SolutionBackground/SystemAppoach.md. Los ADR están enlazados desde 2.SolutionBackground/Assumptions.md, Tradeoffs.md y Readme.md.

[DATO] Ningún ADR cita un SAR, un BD ni una característica de calidad. Ningún SAR cita un ADR.

[DEDUCCIÓN] Relación SAR → ADR, según el contenido:
- SAR 1 (pagos en efectivo y electrónicos): ADR 009 cubre el electrónico. El efectivo no tiene ADR (3.ViewsAndPerspectives/UserScenariosPerspective.md, Risks: "Handling of cash payment. This should be discussed further").
- SAR 2 (feedback pluggable): ADR 010, en estado Declined.
- SAR 3 (reportes de comidas consumidas): sin ADR. Hay un párrafo de reporting en SystemAppoach.md.
- SAR 4 (scheduling para suscriptores): sin ADR. Hay un diagrama de "Preparing scheduled orders" en InformationModels.md.
- SAR 5 (comprar sin registrarse): sin ADR. SolutionOverview.md deja la cuenta independiente como opción.
- SAR 6 (notificaciones): sin ADR. SNS aparece en la infraestructura.
- SAR 7 (notificaciones de loyalty y cupones): sin ADR.
- SAR 8 (detalle por componentes de comida): sin ADR.
- SAR 9 (pagos seguros): ADR 009 y ADR 006 (parcial).
- SAR 10 (garantía de retiro): ADR 011 y ADR 012 (parcial).
[DATO] Seis de los 10 SAR no tienen ADR (3, 4, 5, 6, 7, 8).

[DATO] Características de calidad: 11 nombres distintos en 7 bloques de subsistemas (2.SolutionBackground/SystemAppoach.md, "System Quality Attributes", "Front-end apps", "Meal Catalog subsystem", "Order Processing subsystem", "Purchase gateway", "Reporting subsystem", "Notification subsystem"). Son Simplicity, Modifiability, Usability, Performance, Autonomous, Extensibility, Maintainability, Availability, Reliability, Integrity y Security. Cada bloque las numera 1, 2, 3.

[DATO] Orden: Simplicity y Modifiability son "dominating qualities across the system" (The Script.md). El documento dice que "overall system quality attributes should be addressed before anything else" (2.SolutionBackground/SystemAppoach.md). Los principios de SolutionOverview.md están ordenados: 1 simplicidad cognitiva, 2 extensibilidad y modificabilidad en caso de trade-off, 3 telemetría obligatoria, 4 mensajes antes que llamadas directas.

[HUECO] No hay matriz de trazabilidad. The Script.md dice "Requirements traceability is key!", pero no hay tabla que enlace requisito, calidad y decisión. El documento dice que los escenarios de calidad se identificarán "during the Quality Attribute Workshop", que no aparece en el repo (2.SolutionBackground/SystemAppoach.md, "Health checks").

## 6. Lo distintivo

1. **Costo presentado como decisión, con horas de mantenimiento incluidas.** Hizo: en 4.ADRs/003 pone el costo de DataDog (15 USD por host y mes) frente al tiempo de un desarrollador u operador que exigiría una alternativa OSS ("0.2-0.5 time of a developer / administrator"). En 3.ViewsAndPerspectives/CostAnalysis.md calcula tres escenarios (8, 8 y 16 instancias) con totales anuales de 12.247,57; 12.548,17 y 22.480,57 USD. Evitó: mantener y operar el monitoreo propio. Cuesta: el precio de DataDog, que puede subir. Las filas de Tableau y DataDog del resumen están cruzadas (ver sección 7). Fuentes: 4.ADRs/003 Tracing and Monitoring Sytem.md; 3.ViewsAndPerspectives/CostAnalysis.md.

2. **Caminos críticos de negocio como health check.** Hizo: en 4.ADRs/004 un supervisor envía "dummy messages" que recorren escenarios de usuario y mide "correctness of execution and time spent". Evitó: que las métricas de hardware digan que el sistema está sano cuando el negocio no funciona. Cuesta: código de mensajes de prueba y complejidad cognitiva, que el ADR admite. Fuentes: 4.ADRs/004 Health check endpoints.md; 2.SolutionBackground/SystemAppoach.md, "Health checks based on business-critical path scenarios".

3. **Un actor por heladera para el stock.** Hizo: en 3.ViewsAndPerspectives/Concurrency.md, cada heladera tiene un actor que resta el stock, y el resto del sistema recibe eventos. Evitó: locks y race conditions en el stock, según el documento ("without race conditions and locks"). Cuesta: un punto de venta con varias heladeras necesita un modelo para sumar disponibilidad. El documento dice que, si el sistema de heladeras no lo hace, "we have to implement it on our own". Fuentes: 3.ViewsAndPerspectives/Concurrency.md; The Script.md.

4. **Retiro sin red y catálogo local con verificación al pagar.** Hizo: en 4.ADRs/011 los códigos de retiro se generan de antemano y se entregan a la heladera y al dispositivo. En 4.ADRs/013 el catálogo queda en el dispositivo y la disponibilidad se valida en el backend al confirmar la compra. Evitó: depender de la red en el punto de retiro y en la navegación. Cuesta: códigos largos que "are too long to type"; riesgo de adivinación; demora en la confirmación de compra; catálogo que puede estar desactualizado. Fuentes: 4.ADRs/011 Every meal delivery has pick up pin code.md; 4.ADRs/013  Cache the meal catalogue.md; 2.SolutionBackground/Tradeoffs.md #1.

5. **Event sourcing para investigar quejas.** Hizo: en 4.ADRs/007 se adopta event sourcing, con el argumento de que "Keeping only the final state of a domain entity won't help to understand how we end up with a specific state". Evitó: no poder reconstruir cómo un pedido o un cobro llegó a su estado. Cuesta: un sistema nuevo para el equipo, que "might be used in a suboptimal way"; storage; y la duda entre SaaS y OSS (ver sección 7). Fuentes: 4.ADRs/007 Event sourcing usage.md; 2.SolutionBackground/Tradeoffs.md #2.

## 7. Huecos, inconsistencias y cosas fuera de alcance

**Fuera de alcance o futuro declarado**
- [DATO] Comunicación interna de las heladeras y con el resto del sistema (1.ProblemBackground/BusinessGoalAndScope.md, "Out of scope" 1). Questions.md pregunta si esto debe integrarse o no.
- [DATO] Logística de entrega y movimientos de comida no causados por el cliente (1.ProblemBackground/BusinessGoalAndScope.md, "Out of scope" 2).
- [DATO] No se modifican heladeras ni sistemas de cocina (The Script.md).
- [DATO] No se construye motor de reportes propio (2.SolutionBackground/SolutionOverview.md, "Generic").
- [DATO] No se construyen herramientas de campañas; se consumen resultados de hojas de cálculo (3.ViewsAndPerspectives/Concurrency.md, "Promotional campaigns").
- [DATO] Integración directa con Visa, Mastercard y otros se difiere a "before the greater expansion" (2.SolutionBackground/Tradeoffs.md #4).
- [DATO] Futuro: navegar el catálogo por cercanía (1.ProblemBackground/BusinessGoalAndScope.md, "Users" 2); integración con dispositivos inteligentes "at some point" (ídem, "Other" 1); código QR en la heladera, "not our case" (1.ProblemBackground/BusinessDrivers.md, punto 5.3); CDN y regiones adicionales (3.ViewsAndPerspectives/infrastructure/InfrastructureAndNetworking.md, "Evolutionary perspective").
- [DATO] Seguridad y cumplimiento local de privacidad figuran como "Missed topics" (2.SolutionBackground/SystemAppoach.md). 3.ViewsAndPerspectives/Security.md tiene la sección "Risks" vacía.

**Contradicciones entre documentos**
1. Escalado. [DATO] 3.ViewsAndPerspectives/DeploymentView.md: "we don't scale up but scale-out". Contra: 2.SolutionBackground/SystemAppoach.md, "Vertical scaling is a preferred way ... during the first months"; 4.ADRs/014 ("start with minimum instances and decide to scale up"); The Script.md ("First we suggest to scale up").
2. Event store. [DATO] 4.ADRs/007: "Preferable start with SaaS solution". Contra: 2.SolutionBackground/SystemAppoach.md, "We can start with the Open-source software (OSS) version and migrate then to Software as a Service (SaaS)". Además, el nombre cambia: "EventSource" en 4.ADRs/007 y "EventStore" en 4.ADRs/008 y en SystemAppoach.md.
3. Proveedor de mapas. [DATO] 4.ADRs/015 elige Here Maps. Contra: 3.ViewsAndPerspectives/DeploymentView.md, riesgo 1: "OpenStreet Maps have a fair-use license". El ADR 015 eligió Here Maps.
4. Cifra de Here Maps. [DATO] 4.ADRs/015, Decision: "first 25K requests were free". Contra: la misma tabla dice "Free for 250,000 requests monthly", y Consequences dice "250K transactions per month".
5. Herramienta de reportes. [DATO] 2.SolutionBackground/SystemAppoach.md, "Independent data storage for reporting": "the good option might be Apache Superset". En el mismo archivo, "Tableau is preferred", y Power BI y KoolReport como alternativas. Tableau aparece en 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md y en CostAnalysis.md (278 USD por mes).
6. Tipo de instancia. [DATO] 4.ADRs/014: "Using micro EC2 instances". Contra: 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md: "All servers are t3.medium". CostAnalysis.md no nombra el tipo y usa 0,0376 USD por hora.
7. Resumen de costos. [DATO] En 3.ViewsAndPerspectives/CostAnalysis.md, las filas del resumen anual tienen cruzados los valores de Tableau y DataDog. Detalle: DataDog = 15 USD x 8 hosts x 12 meses = 1.440 (MIN y PROJECTED), y 15 x 16 x 12 = 2.880 (RAPID). Tableau = 278 x 12 = 3.336. En el resumen, Tableau aparece con 1.440 / 1.440 / 2.880 y DataDog con 3.336 en los tres escenarios. Los totales cierran con el detalle, así que solo están mal las etiquetas. Lo mismo aparece en docs/Architecture proposal_v2.pptx, diapositiva 23.
8. Kafka. [DATO] El resumen y la sección dicen "Kafka Managed Streams". El cálculo, en cambio, usa precios de "Kinesis data stream" ("Kinesis data stream cost (monthly): 11.56 USD").
9. Días de anticipación de la cocina. [DATO] 3.ViewsAndPerspectives/Concurrency.md: "prepares food for the one/two days upfront". 3.ViewsAndPerspectives/InformationModels.md, en riesgos: "prepare meals up to 3 days upfront".
10. Id de comida en el dispositivo. [DATO] 4.ADRs/011 (actualización del 2020-11-24): "update the user's device with the meal's unique id and generate an access code based on meal ID". Contra: 4.ADRs/013: "We should not upload on client device meal ids because it might be used for access code generation".
11. Feedback declinado. [DATO] 4.ADRs/010 tiene estado Declined, pero 2.SolutionBackground/SolutionOverview.md sigue diciendo "might include survey mechanisms from other vendors". [HUECO] No hay ADR que reemplace la decisión.
12. Presupuesto y OSS. [DEDUCCIÓN] 1.ProblemBackground/Constraints.md (4): "OSS and tools provided by the target platform should end up higher in prioritization". Los ADR eligen DataDog (4.ADRs/003) y Here Maps (4.ADRs/015) sobre opciones abiertas, y cada ADR da su razón.
13. Simplicidad inicial. [DEDUCCIÓN] Constraints.md (1) pide que la solución sea "simple at the beginning". El diseño incluye event sourcing (4.ADRs/007), RabbitMQ, Kafka, DynamoDB, DataDog y Tableau (CostAnalysis.md).

**Citas que no corresponden**
- [DATO] 2.SolutionBackground/Tradeoffs.md, #2: la etiqueta dice "ADR 009" pero enlaza a `4.ADRs/007 Event sourcing usage.md`.
- [DATO] 1.ProblemBackground/BusinessDrivers.md, punto 8.2: "Pre-generated codes for pickup ... (ADR 002)". El ADR de códigos es el 011; el 002 es System approach.
- [DATO] 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md: "[ADR 003: System approach]" enlaza a `4.ADRs/002 System approach.md`. El 003 es DataDog.
- [DATO] 3.ViewsAndPerspectives/CostAnalysis.md: Amazon MQ cita "[ADR 003]", que trata monitoreo. Ningún ADR decide Amazon MQ.
- [DATO] 2.SolutionBackground/Assumptions.md cita 4.ADRs/013 para "Ghost kitchen do not work 24/7" y para "Ghost kitchen assigns unique number for every meal". El 013 no dice ninguna de las dos cosas. El id "provided by the kitchen" aparece en 4.ADRs/011. La misma cita de 013 respalda "Stock refillment happens one-two times per day", que el ADR tampoco trata.

**ADR incompletos o sin consecuencias**
- [DATO] 4.ADRs/001: Positive, Negative, Risks y Bonus Features quedan con "If any".
- [DATO] 4.ADRs/010: Declined, sin decisión sustituta. Decision propone encuestas con terceros; Reason lista los riesgos de usar terceros.
- [DATO] 4.ADRs/016: Draft.
- [DATO] 4.ADRs/002: el Context menciona blackboard, pero la tabla no la evalúa.
- [DATO] 4.ADRs/008: no nombra el software de cola. 4.ADRs/009 no declara alternativas en el ADR.
- [DATO] 4.ADRs/012: la sección Actions pide definir el umbral de alarma ("It might be minutes or hours"), sin definirlo.
- [DATO] 10 de los 16 ADR siguen en Proposed. Mientras, SystemAppoach.md presenta como decididos RabbitMQ, Kafka, DataDog y Tableau, sin ADR para Kafka, RabbitMQ ni Tableau.

**Cifras que no cierran**
- [DATO] 1.ProblemBackground/BusinessGoalAndScope.md: "First two locations in Detroit forecast of growth to eight by 2021" y "68 locations by the end of the year".
- [DEDUCCIÓN] 1.000 suscriptores x 10 comidas por semana = 10.000 comidas por semana. El mismo archivo prevé 1.500 a 2.000 comidas por semana para diciembre.
- [HUECO] CostAnalysis.md supone 10.000 usuarios y escenarios de 500, 1.000 y 10.000 solicitudes por día, sin relación declarada con los suscriptores.
- [DATO] 3.ViewsAndPerspectives/docs/Data&PayloadsEstimates.xlsx tiene `#VALUE!` en "Forecasts" y "DataTypes".
- [DATO] 3.ViewsAndPerspectives/CostAnalysis.md deja "Application Load Balancer" y "Data transfer out" como TBD. Incluye API Gateway y DynamoDB sin describir su rol en ningún otro documento.
- [DATO] Retención: 3.ViewsAndPerspectives/InformationModels.md habla de "retention policy that might be 1-2 years" o "kept indefinitely". 2.SolutionBackground/SystemAppoach.md menciona "Information policies can dictate to store information for 3-5 and more years" sin decidir.

**Huecos**
- [HUECO] Sin matriz de trazabilidad SAR → calidad → ADR (sección 5). Seis de los diez SAR no tienen ADR.
- [HUECO] Fitness functions mencionadas y sin definir (The Script.md; 4.ADRs/003; 4.ADRs/016).
- [HUECO] Sin decisión formal sobre Kafka ni RabbitMQ (SystemAppoach.md, "COTS").
- [HUECO] 4.ADRs/006 exige auth en llamadas internas. 3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md dice que los servidores "are allowed to communicate internally ... using message queues", sin mencionar autenticación.
- [HUECO] Longitud final del código de retiro: 4.ADRs/011 dice "6-8 digit", y el texto de consecuencias dice que "should be quite long".
- [HUECO] Frecuencia y forma de los datos de heladeras: "We don't know what data is provided from fridge(s): is it the total amount of meals or delta" (3.ViewsAndPerspectives/Concurrency.md, QUESTIONS). Questions.md pregunta "How often data should be updated?" sin respuesta.
- [HUECO] Preguntas sin respuesta en Questions.md: anticipación máxima de menús, cancelaciones, comidas no retiradas, catálogo desactualizado y horarios de pedido.
- [HUECO] Cancelaciones y fondos: "Business should decide about the time when an order can be canceled and what to do with the funds" (3.ViewsAndPerspectives/InformationModels.md, SENSITIVE POINTS).
- [HUECO] Pedidos en horario de cocina cerrada: aparece como punto sensible sin opción (2.SolutionBackground/RisksAndSensitivePoints.md, Sensitive points 2).
- [HUECO] Sin modelo de amenazas en 3.ViewsAndPerspectives/Security.md. Sin estrategia de pruebas.

## 8. Candidatas a verdades enseñables (máx. 8)

1. **Un monolito modular deja abierta la extracción si la comunicación entre módulos se diseña como si hubiera red.** Ejemplo: el equipo elige monolito modular con camino de migración, y pide que la comunicación entre módulos sea "as transparent as possible". Admite el riesgo de "big ball of mud" y la tabla le da "-" en disponibilidad. Fuentes: 4.ADRs/002 System approach.md; 2.SolutionBackground/SystemAppoach.md, "Modularized services"; 4.ADRs/006 Zero trust architecture.md. Respaldo: **FUERTE** (cuatro documentos).

2. **Si la fuente externa de datos no es confiable, conviene guardar una copia propia y validar al final, antes de cobrar.** Ejemplo: el stock de heladeras se mantiene del lado propio (4.ADRs/012 Stale data from fridges.md), y el catálogo queda en el dispositivo con verificación al confirmar la compra (4.ADRs/013  Cache the meal catalogue.md; 2.SolutionBackground/Tradeoffs.md #1). Respaldo: **FUERTE**.

3. **Entregar al menos una vez obliga a deduplicar por identificador y versión.** Ejemplo: en 4.ADRs/008 Ready to pay, el id único del pedido y el número de versión hacen que el evento repetido se descarte, a costo de algo de rendimiento. Fuentes: 4.ADRs/008 At least once delivery for ready to pay order.md; 2.SolutionBackground/Tradeoffs.md #3. Respaldo: **MEDIA**.

4. **Un recurso físico que no se mueve puede modelarse como un actor para evitar bloqueos.** Ejemplo: un actor por heladera (3.ViewsAndPerspectives/Concurrency.md; The Script.md). Límite: el documento no implementa ni mide el modelo, y deja abierto el caso de varias heladeras por punto de venta. Respaldo: **MEDIA**.

5. **Un health check de negocio mide un camino crítico con datos de prueba, no solo hardware.** Ejemplo: 4.ADRs/004 Health check endpoints.md, con mensajes de prueba que miden corrección y duración. Fuentes: ese ADR y 2.SolutionBackground/SystemAppoach.md. Respaldo: **MEDIA**.

6. **Un código de retiro sin red implica elegir entre adivinación y dificultad de tipeo.** Ejemplo: 4.ADRs/011 Every meal delivery has pick up pin code.md: "8th long digit codes are too long to type!" y "Someone can be so lucky ... guess a pin code". Respaldo: **MEDIA** (un ADR, con respaldo parcial en 3.ViewsAndPerspectives/UserScenariosPerspective.md, Risks: "access code generation can be cumbersome").

7. **Un costo de infraestructura se verifica por escenarios, con cada línea y su fórmula.** Ejemplo: 3.ViewsAndPerspectives/CostAnalysis.md calcula MIN, PROJECTED y RAPID. Pero el resumen cruzó las filas de Tableau y DataDog, y solo la suma por línea permite detectarlo. Respaldo: **MEDIA** (un documento).

## 9. Fragmentos citables

1. "Extra care and discipline should be applied for inter module communication, or it will be just a monolith" (4.ADRs/002 System approach.md).
2. "because it requires minimal integration without maintenance" (4.ADRs/003 Tracing and Monitoring Sytem.md).
3. "Finally, choosing an open-source solution we would have to appoint 0.2-0.5 time of a developer / administrator to take care of the monitoring." (4.ADRs/003 Tracing and Monitoring Sytem.md).
4. "We accept these consequences as we are able to operate with the estimated stocks and provide our service for end-users." (4.ADRs/012 Stale data from fridges.md).
5. "Users can experience longer delays during the purchase confirmation step, but it's ok from our perspective." (4.ADRs/013  Cache the meal catalogue.md).
6. "It will slightly decrease performance, but we get data integrity." (4.ADRs/008 At least once delivery for ready to pay order.md).
7. "Keeping only the final state of a domain entity won't help to understand how we end up with a specific state." (4.ADRs/007 Event sourcing usage.md).
8. "One actor per fridge helps keep the integrity of the amount of meals available in a certain fridge." (3.ViewsAndPerspectives/Concurrency.md).

## 10. Etiquetas presentes (para comparar entre repos)

ADR, monolito-modular, evolutividad, tradeoffs-explicitos, observabilidad, costo, cloud-gestionada, fitness-functions, resiliencia-fallos, riesgos-explicitos, zero-trust, seguridad, event-sourcing, cola-de-mensajes, privacidad-GDPR, cache, rendimiento-latencia, escalabilidad, contenedores, deployability, IaC, streaming, kafka, event-driven, DDD, CQRS, disponibilidad-HA, testabilidad, supuestos-explicitos, fuera-de-alcance-explicito, glosario, retencion-de-datos, otro: actor-model, otro: versionado-de-agregados, otro: facade, otro: anti-corruption-layer, otro: reporting-en-almacen-separado, otro: estimacion-de-volumen, otro: escenarios-de-usuario, otro: viewpoints-rozanski-woods, otro: preguntas-al-dueno, otro: CI-verificacion-de-enlaces
