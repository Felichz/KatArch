# ArchColider · fase 1 (texto)

Rutas relativas a `katas-src/ArchColider/`. Leídos: 47 archivos de texto (.md y .yml). No se leyeron imágenes, PDF, .docx, .pptx, .xlsx, .mp4 ni los `.drawio` (diagramas fuente, quedan para fase 2).

## 1. El caso

[DATO] Farmacy Food es una startup de comida saludable que crea comidas según las necesidades dietéticas de las personas; su misión es hacer la salud "radically affordable and accessible" (`1.ProblemBackground/BusinessGoalAndScope.md:11`). [DATO] El objetivo declarado por el dueño: una "ghost kitchen" necesita un sistema de pedidos para que los usuarios vean qué hay disponible, compren y retiren en cualquiera de sus puntos de venta o neveras inteligentes (`BusinessGoalAndScope.md:7`). [DATO] Requisitos del dueño: integrar neveras inteligentes de terceros (con sistema propio en la nube y API), integrar el punto de venta de los quioscos (un espacio subarrendado dentro de otro negocio, con un empleado), app móvil y web, feedback solo de compras verificadas y encuestas, cupones y promociones, y enviar actualizaciones de inventario a la cocina central (`1.ProblemBackground/FunctionalRequirements.md:9-16`). [DATO] Cifras: hoy 300 comidas por semana, plan de 1500-2000 por semana "by December"; 68 ubicaciones a fin de año; 1000 suscriptores a fin de año; 10 comidas por semana por suscriptor (`BusinessGoalAndScope.md:40-43`). [DATO] En el mismo archivo: "First two locations in Detroit forecast of growth to eight by 2021" (`BusinessGoalAndScope.md:20`). [DEDUCCIÓN] Las dos cifras de ubicaciones (8 y 68) no coinciden; el texto no las concilia. [DATO] Restricciones globales "que guían todas las decisiones": equipo de desarrollo limitado (solución simple al principio para probar la idea de negocio), time-to-market crítico (despliegue "super simple"), AWS como plataforma, presupuesto muy limitado (OSS y herramientas de la plataforma primero) (`1.ProblemBackground/Constraints.md:3-8`). [DATO] Fuera de alcance: la comunicación con las neveras y toda la logística de entrega (`BusinessGoalAndScope.md:68-71`). [DATO] Supuesto: la cocina fantasma no trabaja 24/7 (`2.SolutionBackground/Assumptions.md:12`; `The Script.md:16`).

## 2. Qué entregó el equipo

- `README.md`: presentación del equipo (cuatro miembros), recursos y tabla de contenidos (`README.md:1-47`). Edición "Architectural Katas 2020 Fall" (`README.md:1`).
- `Glossary.md`: tipos de usuario (Occasional, Known, Subscriber, PoS admin) y sistemas (Ordering system, Kiosk Mgmt system, Ghost Kitchen, User App) (`Glossary.md:3-19`).
- `Questions.md`: preguntas al dueño sobre suscriptores, cocina, reservas y alcance; sin respuestas en el repo (`Questions.md:1-34`).
- `The Script.md`: guion de la presentación oral (`The Script.md:1-55`).
- `1.ProblemBackground/`: objetivo y alcance, análisis de requisitos funcionales con áreas core/support/generic, restricciones, partes interesadas, impulsores de negocio y requisitos arquitectónicamente significativos.
- `2.SolutionBackground/`: principios y estilo (`SolutionOverview.md`), supuestos, enfoque por subsistema con atributos de calidad, alternativas y COTS (`SystemAppoach.md`), trade-offs (`Tradeoffs.md`), riesgos y puntos sensibles (`RisksAndSensitivePoints.md`).
- `3.ViewsAndPerspectives/`: escenarios de usuario, vista de información (eventos, frecuencias, tamaños), vista de concurrencia, vista de despliegue, perspectiva de seguridad, análisis de costos, y cuatro documentos de infraestructura AWS (`infrastructure/`).
- `4.ADRs/`: 16 archivos; 001 es la plantilla/decisión de usar ADR; 15 ADR de decisión (002-016).
- `.github/workflows/markdown-link-checker.yml`: verificación de enlaces en push a master.
- Cuentas: 6 impulsores de negocio (`BusinessDrivers.md:9-14`); 10 requisitos significativos (SAR) con trazabilidad al impulsor (`BusinessDrivers.md:20-31`); 8 requisitos del dueño (`FunctionalRequirements.md:9-16`); 4 restricciones (`Constraints.md:5-8`); 29 imágenes distintas referenciadas desde los .md.
- Métodos con fuente: vistas y perspectivas de Rozanski y Woods (`3.ViewsAndPerspectives/Readme.md:3,13`); ADR según Michael Nygard (`4.ADRs/001 We are using ADR (template).md:15`); diseño estratégico de dominio core/supportive/generic (`SolutionOverview.md:21-46`); modelo conceptual con nivel de conocimiento y nivel operacional (`SolutionOverview.md:48-58`); métricas como fitness functions (`The Script.md:38`; `4.ADRs/003 Tracing and Monitoring Sytem.md:11`; `4.ADRs/016 Use of Infrastructure as Code.md:17`); Quality Attribute Workshop mencionado como paso futuro (`SystemAppoach.md:118`); tácticas de arquitectura por atributo de calidad, solo como PDF en `docs/tactics/` (no leídos).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| 002 System approach | Monolito modularizado ahora, con posibilidad de migrar a microservicios | Accepted | Monolith, Microservices, Micro-kernel (tabla con 10 cualidades); "blackboard" solo en el contexto | Necesidades del negocio, equipo de desarrollo, restricciones técnicas; ahorro en entornos dev/test/qa/prod y menos reuniones de sincronización | Hace falta disciplina en la comunicación entre módulos o termina en "big ball of mud"; a veces copiar código para evitar dependencias ocultas | Ease of deployment, Availability, Autonomy, Traceability, Performance, Modifiability, Maintainability, Integrity, Security, Scalability | `4.ADRs/002 System approach.md:11-47` |
| 003 Tracing and monitoring | DataDog como sistema de monitoreo | Proposed | Grafana, ELK Stack, Amazon CloudWatch | Integración mínima sin mantenimiento; con OSS habría que dedicar 0.2-0.5 de un desarrollador/administrador | 15 USD (por host y mes, según 003:19) y el precio puede subir | Monitoreo como base de decisiones de escalado y extracción; fitness functions | `4.ADRs/003 Tracing and Monitoring Sytem.md:10-38` |
| 004 Health check endpoints | Un endpoint de salud por servicio; heartbeat para salud técnica y escenarios de camino crítico con mensajes ficticios para salud de negocio | Accepted | Ping pattern (descartado frente a heartbeat) | Decidir con hechos la extracción de módulos y el escalado | Mensajes ficticios: esfuerzo extra y más complejidad cognitiva; riesgo de impacto en peticiones reales | Métricas técnicas y de negocio; presupuesto | `4.ADRs/004 Health check endpoints.md:11-35` |
| 005 Service readiness checks | Los endpoints de salud informan si el servicio está listo y los demás lo respetan | Proposed | no declara | Servicios que tardan en iniciar (cache) provocan timeouts, nuevas instancias en cascada y facturas más altas | no declara | Evitar efecto dog pile y falsas alarmas | `4.ADRs/005 Service readiness checks.md:11-21` |
| 006 Zero trust architecture | Las llamadas internas entre módulos llevan información de autenticación y claims desde el principio | Proposed | no declara | No se puede suponer que la misma subred es segura; facilitar la migración de módulo a servicio | Más complejidad entre módulos; requiere servicio de identidad; optimizaciones posteriores | Seguridad; extracción futura de servicios | `4.ADRs/006 Zero trust architecture.md:11-25` |
| 007 Event sourcing usage | Event sourcing con una herramienta dedicada ("EventSource") | Proposed | Snapshot usage | Historia completa para investigar quejas; migración gradual de modelos de datos; datos para analizar comportamiento | Uso subóptimo hasta que el equipo aprenda el paradigma; preferible empezar en SaaS | Resolución de quejas, reputación, user engagement | `4.ADRs/007 Event sourcing usage.md:11-41` |
| 008 At least once delivery | Pedidos "ready to pay" por cola con acuse de recibo; id único del cliente y número de versión para descartar duplicados | Proposed | no declara | Pagar pedidos es crítico; evitar cobros dobles por concurrencia | "Slightly decrease performance" | Integridad de datos | `4.ADRs/008 At least once delivery for ready to pay order.md:11-21` |
| 009 Rely on payment service provider | Delegar en un proveedor de pagos externo | Proposed | no declara en el ADR (Tradeoffs.md:14 contrasta con implementar Visa/MasterCard/AmEx/JCB/Paypal) | Muchos sistemas de pago con API distintas | Comisiones por transacción; seguir tendencias; cuidado con datos personales (cumplimiento, auditoría) | Variedad de medios de pago; crecer la base de usuarios | `4.ADRs/009 Rely on payment service provider.md:11-23` |
| 010 Feedback System separation | Feedback propio en la app y encuestas delegadas a terceros (SurveyMonkey, Google) | Declined | no declara | (del rechazo) riesgo de brechas de datos personales con terceros; recolección y almacenamiento engorrosos; permisos difíciles | Moderar reseñas; almacenar imágenes sube costos | Feedback y encuestas (SAR 2) | `4.ADRs/010 Feedback System separation.md:7-33` |
| 011 Pick up pin code | Cada comida despachada lleva un código de 6-8 dígitos | Accepted | no declara en el ADR (FunctionalRequirements.md:103 nombra códigos de recuperación o pasar la tarjeta) | Retirar la comida aunque la nevera esté sin red | Códigos generados por adelantado y enviados a nevera y dispositivo; riesgo de adivinarlo; "8 dígitos es demasiado largo" | Maximizar que el usuario retire la comida (SAR 10) | `4.ADRs/011 Every meal delivery has pick up pin code.md:11-34` |
| 012 Stale data from fridges | Mantener en el propio sistema una copia del stock de las neveras hasta recibir datos nuevos | Proposed | no declara | El sistema de neveras es externo; no controlamos frecuencia ni formato; puede no responder | Presión computacional y complejidad de concurrencia; pérdidas compensando con cupones; decisión de negocio para lo comprado y no entregado | Precisión del inventario; satisfacción del usuario | `4.ADRs/012 Stale data from fridges.md:11-33` |
| 013 Cache the meal catalogue | Guardar el catálogo completo en el dispositivo y comprobar disponibilidad real al confirmar la compra | Proposed | no declara | Rapidez con conexión lenta; el catálogo cambia poco en el día; transferir el catálogo completo a cada usuario cuesta dinero | Más espera al confirmar; más lógica y tamaño en app y PoS; API adicional; catálogo puede estar desactualizado | Velocidad de la app, costo de propiedad | `4.ADRs/013  Cache the meal catalogue.md:11-32` |
| 014 Deployment strategy | Máquinas virtuales EC2 en AWS; escalar primero vertical y luego horizontal | Proposed | On-premise, serverless, Kubernetes (on-premise o PaaS), OpenShift, VMs en AWS o Azure | Empezar con pocas instancias; escalar componentes por carga; esfuerzo de aprender y operar Kubernetes | Vendor lock-in | Costo bajo, baja carga cognitiva, mantenimiento fácil | `4.ADRs/014 Deployment Strategy.md:11-24` |
| 015 Integration with Map Providers | Integrar Here Maps | Proposed | OpenStreet Maps, TomTom, MapBox, Here Maps (tabla de precios) | Modelo de negocio y volumen; alcance de mercado; requests gratuitos | Pasar a plan premium al crecer; vigilar el número de requests | Costo | `4.ADRs/015 Integration with Map Providers.md:11-33` |
| 016 Use of Infrastructure as Code | Usar infraestructura como código declarativa (recomienda CloudFormation, fuera del ADR) | Draft | Despliegue imperativo; Terraform como alternativa a CloudFormation | Evitar drift; correr fitness functions sobre la especificación | Se pierden cambios ad hoc; APIs difíciles al principio; riesgo de privilegios del rol de aprovisionamiento | Evolutividad | `4.ADRs/016 Use of Infrastructure as Code.md:11-46` |

ADR excluido de la tabla: `4.ADRs/001 We are using ADR (template).md` (decide usar ADR de Nygard; consecuencias sin rellenar, "If any"). `adr-template.md` está vacío (0 bytes).

[DATO] Decisiones fuera de los ADR, en `2.SolutionBackground/SystemAppoach.md`: Kafka para streaming (`:183-185`), RabbitMQ como broker (`:187-189`), DataDog frente a Grafana y ELK como "we decided" (`:191-193`), Tableau preferido frente a Power BI y KoolReport (`:195-199`), EventStore OSS y luego SaaS (`:179-181`), y Apache Superset como opción para reportes (`:129`).

## 4. Hallazgos para el curso

#### H01 · Monolito modular elegido con una tabla de cualidades
- Idea: el estilo se elige comparando opciones contra cualidades concretas y contra las restricciones del cliente (equipo chico, salida rápida, poco presupuesto), no por moda.
- Lo que hizo el equipo: [DATO] compara Monolith, Microservices, Micro-kernel y Modularized Monolith en diez cualidades con escala ++ a -- (`4.ADRs/002 System approach.md:17-35`) y elige monolito modularizado "for now", con posibilidad de migrar a microservicios (`:39`). [DATO] En la tabla el monolito modular saca "-" en Availability y "++" en Ease of Deployment, Performance y Security (`:26-34`). [DATO] Rechaza microservicios desde el principio porque exigen infraestructura y un dominio estable, y el monolito puro por ser "oversimplification" ante cierto nivel de madurez (`2.SolutionBackground/SystemAppoach.md:131-143`).
- Razón declarada: necesidades del negocio y del equipo (`002:13,39`); restricciones de equipo, time-to-market y presupuesto (`1.ProblemBackground/Constraints.md:5-8`; `SolutionOverview.md:12`); ahorro en entornos y menos reuniones (`002:43`).
- Costo o trade-off admitido: disciplina en la comunicación entre módulos o se vuelve "big ball of mud"; a veces copiar código para evitar dependencias ocultas (`002:47`).
- Alternativas que nombra: Monolith, Microservices, Micro-kernel; "blackboard" se nombra en el contexto sin evaluarse (`002:11`).
- Estado: Accepted.
- Fuente: `4.ADRs/002 System approach.md:11-47`; `2.SolutionBackground/SystemAppoach.md:131-143`; `2.SolutionBackground/SolutionOverview.md:12`.
- Completitud: completo.
- Contexto para contarlo: Farmacy Food y sus restricciones; qué es un monolito modular; escala de la tabla.
- Depende de imagen: no.
- Verificado: [ ]

#### H02 · Módulos que se hablan como si hubiera red, para extraerlos después
- Idea: dentro de un monolito se puede preparar la extracción futura haciendo que los módulos se comuniquen por mensajes y con seguridad como si fueran servicios separados.
- Lo que hizo el equipo: [DATO] aislar la comunicación entre módulos "pretending that there is a network connection" (`SystemAppoach.md:90`); comandos y eventos entre partes lógicas del monolito para que la extracción no duela (`The Script.md:34-36`); módulos que se hablan por cola de mensajes (Amazon MQ) as if they were not part of a single monolith (`3.ViewsAndPerspectives/infrastructure/Infrastructure-services-and-virtual-hardware.md:29`); llamadas internas con auth y claims desde el principio (`4.ADRs/006 Zero trust architecture.md:17`). [DATO] Principio "Messages over direct calls" (`SolutionOverview.md:8`).
- Razón declarada: que cada módulo pueda extraerse "in a short time" (`SolutionOverview.md:93`); no suponer segura la misma subred y facilitar la migración de módulo a servicio (`006:11-13`).
- Costo o trade-off admitido: más complejidad entre módulos, poco obvia para muchos desarrolladores; requiere servicio de identidad; optimizaciones al reincorporar módulos (`006:21-25`).
- Alternativas que nombra: no declara.
- Estado: ADR 006 Proposed; el resto en documentos sin estado.
- Fuente: `2.SolutionBackground/SystemAppoach.md:88-96`; `4.ADRs/006 Zero trust architecture.md:11-25`; `The Script.md:34-36`.
- Completitud: parcial (no declara alternativas; ADR en Proposed).
- Contexto para contarlo: H01; qué es extraer un módulo a servicio; qué son claims.
- Depende de imagen: sí (`img/FF_Modularization.PNG`, `img/FF_ModularizationExtraction.PNG`).
- Verificado: [ ]

#### H03 · Extraer o escalar según métricas: salud de negocio por escenarios críticos
- Idea: la decisión de cuándo separar un módulo o escalar se apoya en mediciones, incluida una medición del recorrido de negocio de punta a punta, no solo de CPU o red.
- Lo que hizo el equipo: [DATO] un endpoint de salud por servicio; heartbeat para la salud técnica; para la salud de negocio, escenarios de camino crítico que un supervisor dispara con un mensaje ficticio, midiendo corrección y duración (`4.ADRs/004 Health check endpoints.md:17-21`). [DATO] "hardware/network metrics don't provide information about actual system availability" (`SystemAppoach.md:116`). [DATO] Las métricas de tendencia se usan como fitness functions (`The Script.md:38`; `4.ADRs/003 Tracing and Monitoring Sytem.md:11`).
- Razón declarada: planificar con hechos la extracción y el escalado (`004:11,25`); detectar lógica de negocio atascada aunque lo técnico esté sano (`004:29`).
- Costo o trade-off admitido: diseñar e implementar mensajes ficticios cuesta esfuerzo y suma complejidad cognitiva (`004:27`); riesgo de que los desarrolladores no sepan implementarlo y afecte peticiones reales (`004:35`).
- Alternativas que nombra: ping pattern frente a heartbeat (`004:19`).
- Estado: Accepted.
- Fuente: `4.ADRs/004 Health check endpoints.md:11-35`; `2.SolutionBackground/SystemAppoach.md:114-118`.
- Completitud: completo.
- Contexto para contarlo: H01; qué es un health check; qué es una fitness function.
- Depende de imagen: no.
- Verificado: [ ]

#### H04 · Comprobar que un servicio está listo antes de mandarle trabajo
- Idea: un servicio que tarda en arrancar puede disparar instancias nuevas en cascada si nadie distingue "lento" de no listo.
- Lo que hizo el equipo: [DATO] los endpoints de salud informan si el servicio está listo y los demás respetan esa información (`4.ADRs/005 Service readiness checks.md:17`).
- Razón declarada: servicios que calientan cache al iniciar provocan timeouts; el supervisor puede crear instancias nuevas "that leads to a cascading effect and higher bills" (`005:11-13`); evitar el efecto dog pile y falsas alarmas (`005:21`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `4.ADRs/005 Service readiness checks.md:9-21`; `2.SolutionBackground/RisksAndSensitivePoints.md:57-60`.
- Completitud: parcial (sin costo ni alternativas).
- Contexto para contarlo: H03; qué es autoescalado.
- Depende de imagen: no.
- Verificado: [ ]

#### H05 · Core, supporting y generic deciden qué se construye y qué se compra
- Idea: clasificar los subdominios por cuánto diferencian al negocio decide dónde se escribe software propio y dónde se usa un producto del mercado.
- Lo que hizo el equipo: [DATO] Core: Meal Catalog, Ordering, Loyalty (`SolutionOverview.md:27-33`). Supportive: Feedback y Scheduling (`:35-39`). Generic: Reporting, Payments, Notifications, cubiertos por productos del mercado (`:41-46`). [DATO] "Not all parts of the system are equally important, so we need to know what we build or buy" (`The Script.md:24`).
- Razón declarada: Ordering necesita extensibilidad y control que un sistema de catering estándar no da (`SolutionOverview.md:32`); Loyalty no debe quedar atado a límites de otros proveedores (`:33`); para Reporting, Payments y Notifications, los productos ahorran tiempo y dinero (`:44-46`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `2.SolutionBackground/SolutionOverview.md:21-46`; `1.ProblemBackground/FunctionalRequirements.md:48-69`.
- Completitud: ilustrativo (clasificación con razones por módulo, sin ADR propio; ADR 009 aplica la idea a pagos).
- Contexto para contarlo: qué es un subdominio; Farmacy Food.
- Depende de imagen: sí (`img/FF_StrategicDomainDesign.jpg`).
- Verificado: [ ]

#### H06 · Pagos delegados a un proveedor, con un servicio propio como fachada
- Idea: una pieza genérica se compra, pero se deja una capa propia para poder cambiarla después.
- Lo que hizo el equipo: [DATO] delegar en un proveedor de pagos externo (`4.ADRs/009 Rely on payment service provider.md:15`); el sistema interno deja lugar para adaptadores nuevos (`009:21`); el subsistema Purchase actúa como fachada (`SolutionOverview.md:95`).
- Razón declarada: muchos sistemas de pago con API distintas (`009:11`); antes de expandirse a otros países conviene una sola API de proveedor y migrar paso a paso cuando haga falta (`Tradeoffs.md:14`).
- Costo o trade-off admitido: comisiones por transacción y seguir tendencias (`009:19`); cuidado con datos personales, cumplimiento y auditoría (`009:23`).
- Alternativas que nombra: en `Tradeoffs.md:14`, implementar la comunicación con Visa/MasterCard/AmEx/JCB/Paypal; en el ADR, no declara.
- Estado: Proposed.
- Fuente: `4.ADRs/009 Rely on payment service provider.md:9-23`; `2.SolutionBackground/Tradeoffs.md:14`.
- Completitud: parcial (ADR en Proposed; la alternativa está en otro documento).
- Contexto para contarlo: H05; qué es un proveedor de pagos.
- Depende de imagen: no.
- Verificado: [ ]

#### H07 · Event sourcing para pedidos, porque hay que poder explicar cada queja
- Idea: guardar cada cambio en lugar del estado final se justifica cuando el negocio necesita reconstruir cómo se llegó a un estado.
- Lo que hizo el equipo: [DATO] propone event sourcing para el manejo de pedidos, con una herramienta dedicada (`4.ADRs/007 Event sourcing usage.md:35`); EventStore OSS y luego SaaS (`SystemAppoach.md:179-181`).
- Razón declarada: Farmacy Food depende de su reputación y necesita resolver quejas con exactitud; el estado final no explica cómo se llegó (`007:11`); migrar modelos de datos de forma gradual (`007:13`); analizar comportamiento de usuarios (`007:15`); reconstruir errores (`SystemAppoach.md:100`).
- Costo o trade-off admitido: se cambia simplicidad y espacio por historia y visibilidad (`Tradeoffs.md:8`); exige entender bien el sistema y herramientas extra (`Tradeoffs.md:9-10`); uso subóptimo hasta que el equipo aprenda (`007:39`).
- Alternativas que nombra: "Snapshot usage" (estado final más logs), fácil de implementar pero sin historia confiable y con correlación manual costosa (`007:19-25`).
- Estado: Proposed.
- Fuente: `4.ADRs/007 Event sourcing usage.md:9-41`; `2.SolutionBackground/Tradeoffs.md:8-10`; `2.SolutionBackground/SystemAppoach.md:98-102`.
- Completitud: completo (con estado Proposed).
- Contexto para contarlo: qué es event sourcing; qué es una proyección.
- Depende de imagen: no (`img/FF_OrdersAndScheduler.PNG` ilustra, no es necesaria).
- Verificado: [ ]

#### H08 · Entrega al menos una vez sin cobrar dos veces
- Idea: si un mensaje puede llegar repetido, el receptor tiene que reconocer el duplicado; la garantía de entrega y la idempotencia van juntas.
- Lo que hizo el equipo: [DATO] los pedidos "ready to pay" van por una cola con acuse de recibo; el pedido trae un id único desde el dispositivo; al procesar se comprueba si existe y el número de versión descarta el evento repetido (`4.ADRs/008 At least once delivery for ready to pay order.md:17`).
- Razón declarada: cobrar es el escenario crítico ("selling meals is the whole point") y hay que evitar cargos dobles o triples por concurrencia (`008:11-13`).
- Costo o trade-off admitido: "It will slightly decrease performance, but we get data integrity" (`008:21`); en general se cambia rendimiento del backend por integridad (`Tradeoffs.md:12`).
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `4.ADRs/008 At least once delivery for ready to pay order.md:9-21`; `2.SolutionBackground/Tradeoffs.md:12`; `2.SolutionBackground/SystemAppoach.md:189`.
- Completitud: parcial (sin alternativas).
- Contexto para contarlo: qué es una cola de mensajes; qué es acuse de recibo; H07 (versiones de agregados).
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · El catálogo cambia exactitud por disponibilidad; la verdad se comprueba al pagar
- Idea: se puede aceptar un dato desactualizado al navegar si la comprobación exacta ocurre en el momento que importa.
- Lo que hizo el equipo: [DATO] el catálogo completo se guarda en el dispositivo y se comprueba la disponibilidad real al confirmar la compra (`4.ADRs/013  Cache the meal catalogue.md:17-18`). [DATO] "The meals catalog sacrifices accuracy for availability at the time of browsing" (`Tradeoffs.md:3`). [DATO] El catálogo vive unas 24 horas en el dispositivo (`InformationModels.md:106`).
- Razón declarada: rapidez con conexión lenta (`013:11`); el catálogo no cambia mucho en el día (`013:11`); un catálogo de 20 comidas pesa 500-700 kb sin imágenes y multiplicado por usuarios cuesta transferencia; las actualizaciones de cantidad van como eventos livianos (`013:11`); el pago ya tarda y la espera extra no cambia la percepción (`013:13`; `Tradeoffs.md:3`); menos presión sobre la API de las neveras (`Tradeoffs.md:6`).
- Costo o trade-off admitido: más espera al confirmar; más lógica y tamaño en app y PoS; API adicional; catálogo puede estar desactualizado (`013:22-32`). No subir ids de comida al dispositivo porque sirven para generar códigos de acceso (`013:28`).
- Alternativas que nombra: no declara en el ADR; en `InformationModels.md:54`, para el evento CatalogUpdated, compara enviar el catálogo completo (push) contra avisar solo del cambio.
- Estado: Proposed.
- Fuente: `4.ADRs/013  Cache the meal catalogue.md:9-32`; `2.SolutionBackground/Tradeoffs.md:3-6`; `3.ViewsAndPerspectives/InformationModels.md:37-54,104-109`.
- Completitud: parcial (sin alternativas en el ADR).
- Contexto para contarlo: Farmacy Food (neveras, catálogo); qué es una cache.
- Depende de imagen: no.
- Verificado: [ ]

#### H10 · Copia propia del stock cuando el sistema externo no es confiable
- Idea: cuando un dato vital viene de un sistema que no controlas, mantener tu propia copia te deja operar aunque ese sistema falle, a cambio de reconciliar.
- Lo que hizo el equipo: [DATO] cachear y mantener la integridad del stock de las neveras del lado propio hasta recibir datos nuevos (`4.ADRs/012 Stale data from fridges.md:19`); los pedidos de usuarios se restan del stock en el backend (`Concurrency.md:26`).
- Razón declarada: no controlan frecuencia, estructura ni gestión de posiciones del sistema de neveras; puede estar offline, en mantenimiento o con throttling (`012:11-13`). [DATO] El usuario ocasional que paga en efectivo es el factor principal; lo prepagado no contribuye (`012:15`).
- Costo o trade-off admitido: presión computacional y complejidad de concurrencia; decisión de negocio sobre lo comprado y no entregado; pérdidas compensando con cupones (`012:23,29-30`). Exige monitoreo y alerta del sistema de neveras, y ping si no tiene health check (`012:25-27`).
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `4.ADRs/012 Stale data from fridges.md:9-33`; `3.ViewsAndPerspectives/Concurrency.md:18-37`.
- Completitud: parcial (sin alternativas).
- Contexto para contarlo: Farmacy Food; las neveras son un sistema externo; H09.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Código PIN para retirar la comida sin red
- Idea: un requisito de negocio (que el usuario se lleve su comida) se protege frente a un fallo físico (la nevera sin conexión) con un mecanismo que funciona offline.
- Lo que hizo el equipo: [DATO] cada comida despachada lleva un código de 6-8 dígitos (`4.ADRs/011 Every meal delivery has pick up pin code.md:22`), generado por adelantado y enviado a nevera y dispositivo (`011:28`); actualización posterior: el código se genera a partir del id único de la comida que da la cocina (`011:14-18`).
- Razón declarada: si se pierde la red, la nevera no puede validar la tarjeta ni la apertura desde la app, pero tiene teclado y memoria (`011:11-12`).
- Costo o trade-off admitido: generar y distribuir códigos antes; código largo contra fuerza bruta; riesgo de acierto al primer intento; "8th long digit codes are too long to type!" (`011:28-34`).
- Alternativas que nombra: en `FunctionalRequirements.md:103`, códigos de recuperación de un solo uso o pasar la tarjeta; en el ADR, no declara.
- Estado: Accepted.
- Fuente: `4.ADRs/011 Every meal delivery has pick up pin code.md:9-34`; `2.SolutionBackground/RisksAndSensitivePoints.md:13-17`; `1.ProblemBackground/BusinessDrivers.md:31,88-91`.
- Completitud: completo (alternativas en otro documento).
- Contexto para contarlo: Farmacy Food (neveras con teclado); SAR 10 "Maximizing guarantee of a meal picking up by user".
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Un actor por nevera para evitar carreras sobre el stock
- Idea: si el dominio ya tiene unidades naturales que no comparten estado, cada una puede procesar sus pedidos en serie y la concurrencia se resuelve sin locks.
- Lo que hizo el equipo: [DATO] propone el modelo de actores con un actor por nevera para mantener la integridad de la cantidad disponible (`3.ViewsAndPerspectives/Concurrency.md:30,47`); cada agregado lleva número de versión para evitar locks (`:53`); el catálogo se parte por geolocalización para mantenerlo chico y consistente (`:28`).
- Razón declarada: "A user always buys from a specific fridge, and a meal can't magically jump from one fridge to another" (`The Script.md:43`); el punto sensible son las actualizaciones concurrentes de usuarios (`Concurrency.md:30`).
- Costo o trade-off admitido: no declara. [DATO] Riesgos: un lugar con varias neveras obliga a sumar disponibilidad, quizá implementándolo ellos mismos (`Concurrency.md:36-37`).
- Alternativas que nombra: no declara.
- Estado: no declara (propuesta en vista de concurrencia).
- Fuente: `3.ViewsAndPerspectives/Concurrency.md:9-61`; `The Script.md:42-45`; `3.ViewsAndPerspectives/InformationModels.md:9`.
- Completitud: ilustrativo (sin ADR).
- Contexto para contarlo: qué es el modelo de actores; H10.
- Depende de imagen: sí (`img/FF_concurency_order_processing.PNG`, `img/FF_concurency_front.png`).
- Verificado: [ ]

#### H13 · Un log de eventos para que los servicios de apoyo lean a su ritmo
- Idea: publicar eventos en un log que cada consumidor lee a su ritmo evita llamadas directas entre servicios y relaja los requisitos de los consumidores.
- Lo que hizo el equipo: [DATO] comunicación por stream basado en log para propagar información a servicios de apoyo como reportes y mensajería, inspirada en Martin Kleppmann (`2.SolutionBackground/SystemAppoach.md:106-108`); Kafka como herramienta (`:183-185`); la cola (RabbitMQ / Amazon MQ) queda para la comunicación entre módulos (`:187-189`; `Infrastructure-services-and-virtual-hardware.md:29-32`).
- Razón declarada: evitar el antipatrón "spaghetti with meatballs" (`SystemAppoach.md:108`); "every service can consume data at its own pace", lo que relaja disponibilidad y rendimiento de algunos servicios y permite instancias más baratas (`:110`); evitar problemas de concurrencia a nivel de sistema (`The Script.md:45`; `Concurrency.md:71`).
- Costo o trade-off admitido: Kafka "exceeds current need in terms of performance and other provided features" (`SystemAppoach.md:185`).
- Alternativas que nombra: "Not many options to choose from" (`SystemAppoach.md:185`); no nombra ninguna.
- Estado: no declara.
- Fuente: `2.SolutionBackground/SystemAppoach.md:106-112,183-189`; `3.ViewsAndPerspectives/Concurrency.md:51,69-71`.
- Completitud: parcial (sin ADR ni alternativas nombradas).
- Contexto para contarlo: qué es un log de eventos; diferencia entre cola y log.
- Depende de imagen: sí (`img/FF_LogBasedStream.PNG`).
- Verificado: [ ]

#### H14 · Almacenamiento separado para reportes desde el principio
- Idea: separar los datos de reportes de la base operativa protege el rendimiento y permite aplicar retención distinta.
- Lo que hizo el equipo: [DATO] el servicio de reportes arma su propio almacén desde el log, mapea eventos a modelos de lectura y aplica retención (`SystemAppoach.md:120-127`); no construir un motor propio, Apache Superset como opción (`:129`); Tableau preferido en COTS (`:195-197`).
- Razón declarada: "Too often, reporting works on the same data storage as an operational database"; políticas de 3-5 años o más dejan datos en la base operativa, bajan el rendimiento y complican migraciones (`SystemAppoach.md:122`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: para la herramienta, Tableau, Power BI, KoolReport (`SystemAppoach.md:195-199`); para la separación, no declara.
- Estado: no declara.
- Fuente: `2.SolutionBackground/SystemAppoach.md:120-129,195-199`; `2.SolutionBackground/SolutionOverview.md:96`.
- Completitud: parcial (sin costo ni ADR).
- Contexto para contarlo: H13; qué es un modelo de lectura.
- Depende de imagen: no.
- Verificado: [ ]

#### H15 · Pagar un servicio gestionado para no gastar horas del equipo
- Idea: la opción gratuita puede costar más si exige tiempo de un equipo chico; el costo de operación entra en la comparación.
- Lo que hizo el equipo: [DATO] elige DataDog frente a Grafana, ELK y CloudWatch (`4.ADRs/003 Tracing and Monitoring Sytem.md:16-35`).
- Razón declarada: ELK o Grafana son más baratos, pero DataDog requiere integración mínima sin mantenimiento; con OSS habría que dedicar 0.2-0.5 de un desarrollador o administrador (`003:35`).
- Costo o trade-off admitido: 15 USD por host y mes que pueden subir (`003:19,38`).
- Alternativas que nombra: Grafana, ELK Stack, Amazon CloudWatch (`003:21-31`).
- Estado: Proposed (aunque `SystemAppoach.md:193` dice "we decided to go with DataDog").
- Fuente: `4.ADRs/003 Tracing and Monitoring Sytem.md:9-38`; `2.SolutionBackground/SystemAppoach.md:191-193`; `3.ViewsAndPerspectives/CostAnalysis.md:231-243`.
- Completitud: completo (con estado Proposed).
- Contexto para contarlo: restricción de equipo chico y presupuesto; qué es monitoreo SaaS.
- Depende de imagen: no.
- Verificado: [ ]

#### H16 · Máquinas virtuales en lugar de Kubernetes; primero escalar vertical
- Idea: la plataforma de despliegue se elige por lo que el equipo puede operar hoy; escalar hacia arriba primero pospone la complejidad de escalar hacia afuera.
- Lo que hizo el equipo: [DATO] EC2 en AWS; empezar con mínimas instancias, escalar vertical y, al tocar el límite, horizontal (`4.ADRs/014 Deployment Strategy.md:15`); contenedores detrás de reverse proxy (`014:20`). [DATO] Lo mismo en `SystemAppoach.md:96` y `The Script.md:47`.
- Razón declarada: escalar componentes según su carga; el esfuerzo de aprender y aprovisionar Kubernetes con monitoreo, métricas y service mesh (`014:15`); "cheaper and faster as the system's load is small at the beginning" (`The Script.md:47`).
- Costo o trade-off admitido: "Vendor lock-in" (`014:24`).
- Alternativas que nombra: on-premise, serverless, Kubernetes (on-premise o PaaS), OpenShift, VMs en AWS o Azure (`014:11`).
- Estado: Proposed.
- Fuente: `4.ADRs/014 Deployment Strategy.md:9-24`; `2.SolutionBackground/SystemAppoach.md:96`; `2.SolutionBackground/RisksAndSensitivePoints.md:55-56`.
- Completitud: completo (con estado Proposed). [DEDUCCIÓN] `3.ViewsAndPerspectives/DeploymentView.md:15` dice lo contrario ("we don't scale up but scale-out"); el texto no lo concilia.
- Contexto para contarlo: escalado vertical y horizontal; restricción AWS.
- Depende de imagen: no.
- Verificado: [ ]

#### H17 · Decidir con la tabla de precios a la vista: proveedor de mapas
- Idea: entre servicios externos equivalentes, el volumen esperado y el tramo gratuito deciden, y la decisión trae una tarea de vigilancia.
- Lo que hizo el equipo: [DATO] compara OpenStreet Maps, TomTom, MapBox y Here Maps por precio y ventajas, y elige Here Maps (`4.ADRs/015 Integration with Map Providers.md:14-25`).
- Razón declarada: modelo de negocio, volumen actual y cercano, alcance de mercado y requests gratuitos (`015:25`).
- Costo o trade-off admitido: pasar a premium al crecer; vigilar los requests mensuales para no gastar de más (`015:29-33`). [DATO] Riesgo atribuido a OpenStreet Maps por licencia fair-use en `DeploymentView.md:30`, aunque la decisión es Here Maps.
- Alternativas que nombra: OpenStreet Maps, TomTom, MapBox.
- Estado: Proposed.
- Fuente: `4.ADRs/015 Integration with Map Providers.md:9-33`; `3.ViewsAndPerspectives/DeploymentView.md:29-32`.
- Completitud: parcial ([DEDUCCIÓN] la razón dice "first 25K requests were free" (`015:25`) y la tabla y consecuencias dicen 250.000 por mes (`015:19,29`); cifras no coinciden).
- Contexto para contarlo: ubicación de las neveras.
- Depende de imagen: no.
- Verificado: [ ]

#### H18 · Infraestructura como código para correr fitness functions antes de desplegar
- Idea: describir la infraestructura de forma declarativa permite probarla sobre la especificación y detectar desvíos.
- Lo que hizo el equipo: [DATO] propone infraestructura como código declarativa; recomienda CloudFormation pero lo deja fuera del ADR porque el equipo podría dominar Terraform (`4.ADRs/016 Use of Infrastructure as Code.md:17-20`).
- Razón declarada: el despliegue imperativo es propenso a errores (ejemplo: una IP pública añadida por accidente) (`016:11`); evita drift y permite correr fitness functions sobre la especificación (`016:17-18`).
- Costo o trade-off admitido: se pierden cambios ad hoc sin causar drift; APIs difíciles y documentación inmadura; riesgo de privilegios del rol que aprovisiona (`016:24,36-41`).
- Alternativas que nombra: despliegue imperativo (`016:11`); Terraform (`016:20`).
- Estado: Draft.
- Fuente: `4.ADRs/016 Use of Infrastructure as Code.md:9-46`.
- Completitud: completo (con estado Draft).
- Contexto para contarlo: qué es drift; qué es una fitness function.
- Depende de imagen: no.
- Verificado: [ ]

#### H19 · Un ADR rechazado que deja escrita la razón del rechazo
- Idea: registrar una decisión rechazada con su motivo deja constancia de por qué no se hizo algo razonable.
- Lo que hizo el equipo: [DATO] propuso feedback propio en la app con encuestas delegadas a terceros (SurveyMonkey, Google) (`4.ADRs/010 Feedback System separation.md:19-20`); estado "Declined" (`010:7`).
- Razón declarada (del rechazo): riesgo de brechas de datos personales con terceros; recolección, agregación y almacenamiento engorrosos; permisos para crear y detener encuestas difíciles (`010:33`).
- Costo o trade-off admitido: moderar reseñas; almacenar imágenes aumenta costos (`010:27-29`).
- Alternativas que nombra: no declara.
- Estado: Denied (escrito "Declined").
- Fuente: `4.ADRs/010 Feedback System separation.md:1-33`.
- Completitud: parcial (no dice qué se hace en su lugar).
- Contexto para contarlo: feedback de compras verificadas (requisito del dueño).
- Depende de imagen: no.
- Verificado: [ ]

#### H20 · Costo anual en tres escenarios de crecimiento
- Idea: proyectar el costo de la infraestructura con varios escenarios de carga hace visible qué servicios pesan y cuáles cambian al crecer.
- Lo que hizo el equipo: [DATO] estima costo por servicio en MIN (500 peticiones diarias), PROJECTED (1000) y RAPID (10.000) (`3.ViewsAndPerspectives/CostAnalysis.md:67-69`); total anual 12.247,57 / 12548.17 / 22480.57 USD (`:293`); región us-east por cercanía a Detroit (`:31`).
- Razón declarada: costos y presupuesto limitado guiaron la selección; en casos raros se eligió lo más caro por conveniencia (`CostAnalysis.md:7`).
- Costo o trade-off admitido: estimación con tráfico uniforme y sin compresión; base de datos quizá 60% menor (`:18,25`).
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `3.ViewsAndPerspectives/CostAnalysis.md:1-298`.
- Completitud: ilustrativo. [DEDUCCIÓN] Inconsistencias internas: DataDog figura con 120 USD/mes (`:237`) y Tableau con 278 USD/mes (`:229`), pero el resumen anual pone 3.336 a DataDog y 1.440 a Tableau (`:288-289`), valores que corresponden a 278×12 y 120×12, es decir intercambiados; VPN 9,13 USD/mes (`:95`) figura como 9,13 anual (`:282`); la sección "Kafka Managed Stream" calcula "Kinesis data stream cost" (`:187,215`); supone 10.000 usuarios (`:12`) frente a 1000 suscriptores (`BusinessGoalAndScope.md:42`); Amazon MQ cita ADR 003, que es de monitoreo (`:38`).
- Contexto para contarlo: restricción de presupuesto; servicios AWS nombrados.
- Depende de imagen: sí (`3.ViewsAndPerspectives/docs/database_forecast.png`, `traffic_forecst.png`, `img/1y-min-tco.png`).
- Verificado: [ ]

#### H21 · Trazabilidad de requisitos a impulsores de negocio
- Idea: cada requisito arquitectónicamente significativo se ata al impulsor de negocio que lo justifica.
- Lo que hizo el equipo: [DATO] seis impulsores de negocio (`1.ProblemBackground/BusinessDrivers.md:9-14`) y una tabla de diez SAR con la columna "From BD" (`:20-31`); "Requirements traceability is key!" (`The Script.md:20`).
- Razón declarada: no declara más allá de la frase citada.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `1.ProblemBackground/BusinessDrivers.md:1-91`.
- Completitud: ilustrativo.
- Contexto para contarlo: Farmacy Food; qué es un requisito arquitectónicamente significativo.
- Depende de imagen: no.
- Verificado: [ ]

#### H22 · Atributos de calidad distintos por subsistema
- Idea: además de las cualidades del sistema, cada subsistema prioriza las suyas y eso guía qué patrón usar en cada parte.
- Lo que hizo el equipo: [DATO] sistema: Simplicity y Modifiability (`SystemAppoach.md:13-23`); front-end: Usability, Performance, Autonomous (PoS sin red) (`:25-37`); Meal Catalog: Extensibility, Maintainability, Availability (`:39-53`); Order Processing: Reliability, Integrity (`:56-64`); Purchase gateway: Security, Availability (`:66-74`); Reporting y Notification: Reliability (`:76-86`). [DATO] "every subsystem has its own quality attributes. It helps to pick patterns based on the specific needs of a subsystem" (`The Script.md:32`).
- Razón declarada: por subsistema (p. ej., la disponibilidad del catálogo se resuelve con reinicios y escala vertical, "not confuse it with survivability" porque aún se prueba el modelo de negocio, `SystemAppoach.md:51`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `2.SolutionBackground/SystemAppoach.md:5-86`; `The Script.md:30-32`.
- Completitud: ilustrativo.
- Contexto para contarlo: qué es un atributo de calidad; H01.
- Depende de imagen: sí (`img/FF_system_approach.png`).
- Verificado: [ ]

#### H23 · Riesgos de negocio separados de los técnicos, para que decida el dueño
- Idea: algunos riesgos los tiene que resolver el negocio y no la arquitectura; listarlos aparte con opciones permite que el dueño elija.
- Lo que hizo el equipo: [DATO] siete riesgos de negocio y siete técnicos con opciones (`2.SolutionBackground/RisksAndSensitivePoints.md:3-41`); puntos sensibles, entre ellos "Review bombing" (`:43-60`); una opción dice "*Need decision from the business on how to handle this situation*" (`:48`). [DATO] "only the owner can decide how to handle risk" (`The Script.md:53`).
- Razón declarada: "a variety of solutions is broad, and only the owner can decide how to handle risk" (`The Script.md:53`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: opciones por riesgo (p. ej., `:6,10-12,26-29`).
- Estado: no declara.
- Fuente: `2.SolutionBackground/RisksAndSensitivePoints.md:1-60`; `The Script.md:53-55`.
- Completitud: ilustrativo.
- Contexto para contarlo: Farmacy Food; punto sensible.
- Depende de imagen: no.
- Verificado: [ ]

#### H24 · Pedidos programados: generar todo por adelantado o generar cada día
- Idea: una misma regla de negocio admite dos modelos de datos con costos opuestos, y el equipo deja escrito el trade-off.
- Lo que hizo el equipo: [DATO] compara crear por adelantado todos los pedidos del período (simple al procesar, costoso al cambiar o cancelar) con un horario lógico que genera pedidos cada día (fácil de cambiar, reglas extra para el pago prepagado) (`3.ViewsAndPerspectives/InformationModels.md:164`).
- Razón declarada: no declara decisión.
- Costo o trade-off admitido: el de cada opción (`:164`).
- Alternativas que nombra: las dos opciones.
- Estado: Open (no declara decisión).
- Fuente: `3.ViewsAndPerspectives/InformationModels.md:144-168`.
- Completitud: ilustrativo.
- Contexto para contarlo: suscriptores de Farmacy Food que arman un menú semanal prepagado.
- Depende de imagen: no.
- Verificado: [ ]

#### H25 · Ventana de cancelación para no tener que reembolsar
- Idea: retrasar unos segundos una acción costosa de revertir evita la compensación en el caso frecuente.
- Lo que hizo el equipo: [DATO] retener la ejecución del pedido 10-30 segundos "as gmail do" para cancelar sin reembolso ni sistema de pago (`3.ViewsAndPerspectives/InformationModels.md:76`); cancelaciones estimadas en 2%-5% (`:83-84`).
- Razón declarada: la compra puede ser impulsiva y la cancelación inmediata (`:76`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `3.ViewsAndPerspectives/InformationModels.md:72-85`.
- Completitud: ilustrativo.
- Contexto para contarlo: flujo de compra de Farmacy Food.
- Depende de imagen: sí (`img/IM_cancel_order_by_user.PNG`).
- Verificado: [ ]

#### H26 · Lo simple antes que lo sofisticado: campañas en una planilla
- Idea: si un requisito cambia poco y lo usan pocas personas, no hace falta construir la herramienta; basta consumir el resultado.
- Lo que hizo el equipo: [DATO] las campañas se preparan en Google Spreadsheet u Office 365 Excel y el sistema solo consume el resultado final, sin CRDT (`3.ViewsAndPerspectives/Concurrency.md:67`).
- Razón declarada: las campañas cambian poco y no habrá decenas de operadores (`:67`); son actualizaciones de un solo sentido (`:65`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: CRDT (`:67`).
- Estado: no declara.
- Fuente: `3.ViewsAndPerspectives/Concurrency.md:63-67`.
- Completitud: parcial (sin costo).
- Contexto para contarlo: promociones de Farmacy Food; qué es un CRDT (o evitar el término).
- Depende de imagen: no.
- Verificado: [ ]

#### H27 · Separar lo que el sistema hace de lo que ya hace otro sistema
- Idea: leer los requisitos del cliente con cuidado puede mostrar que algo es descripción del entorno y no responsabilidad del sistema a diseñar; se pregunta al dueño.
- Lo que hizo el equipo: [DATO] interpreta el requisito de integrar neveras como algo fuera del sistema de pedidos, porque ya existe un sistema independiente (Kiosk Mgmt System) (`1.ProblemBackground/FunctionalRequirements.md:20`), y lo pregunta al dueño (`Questions.md:23-27`); lo deja fuera de alcance (`BusinessGoalAndScope.md:70`).
- Razón declarada: en la sesión introductoria se dijo que el sistema de neveras es independiente y ya establecido (`Questions.md:27`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: Open ("Need clarification", `FunctionalRequirements.md:20`).
- Fuente: `1.ProblemBackground/FunctionalRequirements.md:18-36`; `Questions.md:21-27`.
- Completitud: ilustrativo.
- Contexto para contarlo: Farmacy Food; neveras de terceros.
- Depende de imagen: no.
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `README.md:3-20` y `The Script.md:1-5`: presentación del equipo, nombre, miembros y enlaces; no enseñan arquitectura.
- `.github/workflows/markdown-link-checker.yml`: verificación de enlaces del propio repo.
- `img/README.md` ("Diagrams folder"), `docs/tactics/README.md` (vacío), `adr-template.md` (vacío): sin contenido.
- `4.ADRs/001 We are using ADR (template).md`: decide usar ADR; consecuencias sin rellenar ("If any").
- Checklists al final de `Concurrency.md:73-85`, `DeploymentView.md:75-93` y `Security.md:62-70`: listas genéricas de verificación de la vista, sin respuestas.
- `DeploymentView.md:37-73` (glosario de abreviaturas) y `Security.md:48-56` (tabla genérica de aplicabilidad a vistas): definiciones y plantilla.
- `Security.md:16-42` y `infrastructure/Authentication.md:9-35`: configuración de Cognito (texto duplicado entre ambos archivos), detalle de producto sin decisión.
- `infrastructure/InfrastructureAndNetworking.md:14-66`: explicación tutorial de subredes, CIDR y tablas de rutas.
- `CostAnalysis.md:71-268`: cálculos línea a línea por servicio; solo el resumen y los escenarios sirven (H20).
- `SolutionOverview.md:74-104` duplicado casi literal de `SystemAppoach.md:145-175`.
- `FunctionalRequirements.md:149-192`: secciones con plantilla de escenarios vacía.

## 6. Imágenes para fase 2

- `img/FF_StrategicDomainDesign.jpg`: mapa de subdominios core/supportive/generic. Citada en `2.SolutionBackground/SolutionOverview.md:23`.
- `img/FF_system_approach.png`: composición de componentes con "gravity centers". Citada en `SolutionOverview.md:76`, `SystemAppoach.md:9,147`.
- `img/FF_Modularization.PNG` y `img/FF_ModularizationExtraction.PNG`: módulos y su extracción a servicios. Citadas en `SystemAppoach.md:92,94`.
- `img/FF_Metamodel_v1.png`: modelo conceptual con nivel de conocimiento y operacional. Citada en `SolutionOverview.md:52`.
- `img/FF_LogBasedStream.PNG`: comunicación por log. Citada en `SystemAppoach.md:112`.
- `img/FF_OrdersAndScheduler.PNG`: pedidos y planificador con event sourcing. Citada en `SystemAppoach.md:104`.
- `img/FF_concurency_front.png`, `img/FF_concurency_order_processing.PNG`, `img/FF_concurency_orders.png`: actores por nevera y flujo de pedidos. Citadas en `3.ViewsAndPerspectives/Concurrency.md:11,45,55`.
- `img/IM_meal_stock_update.PNG`, `img/IM_meal_purchase.PNG`, `img/IM_cancel_order_by_user.PNG`, `img/IM_cancel_scheduled_order_by_user.PNG`, `img/IM_cancel_order_by_payment_system.png`, `img/IM_preparing_scheduled_orders.PNG`: secuencias de eventos y comandos. Citadas en `InformationModels.md:41,58,74,91,134,148`.
- `3.ViewsAndPerspectives/docs/database_forecast.png` y `traffic_forecst.png`: proyecciones de tamaño de base y tráfico. Citadas en `CostAnalysis.md:20,27`.
- `img/1y-min-tco.png`: distribución del costo anual en escenario MIN. Citada en `CostAnalysis.md:298`.
- `img/scaling-strategies.png`: estrategias de escalado. Citada en `DeploymentView.md:17`.
- `img/services.png`, `img/infra-vpc.png`, `img/infra-auto-scaling.png`, `img/Balancing-Overview.png`, `img/Authentication.png`: infraestructura AWS. Citadas en `infrastructure/` y `Security.md:11`.
- `img/view-context.png`: relación entre vistas (reproducción de Rozanski y Woods). Citada en `3.ViewsAndPerspectives/Readme.md:1`.
- `img/user journey/Subscriber.png`, `Ocasional User.png`, `Error - Subscriber.png`: recorridos de usuario. Citadas en `UserScenariosPerspective.md:9,24,39`.
- Sin cita en el texto: `img/FF_Overview.PNG`, `img/FF_Overview_v1.PNG`, `img/functional_domain.PNG`, `img/HealthFood System.jpg`.

## 7. Preguntas abiertas

- ¿Escalar primero vertical (ADR 014, `SystemAppoach.md:96`, `The Script.md:47`) o "we don't scale up but scale-out" (`DeploymentView.md:15`)? `scaling-strategies.png` podría aclararlo.
- ¿8 ubicaciones (`BusinessGoalAndScope.md:20`) o 68 (`:41`)? ¿1000 suscriptores (`:42`) o 10.000 usuarios (`CostAnalysis.md:12`)? El brief del PDF (`docs/Farmacy Food Smartfridge Apt Brief.pdf`) podría resolverlo.
- Here Maps: ¿25K o 250K requests gratuitos? (`015:19,25,29`).
- Tamaño del catálogo: 500-700 kb para 20 comidas (`013:11`) frente a 150-300 kb en `InformationModels.md:50`.
- Referencias cruzadas erróneas: `Tradeoffs.md:8` dice "ADR 009" y enlaza a 007; `CostAnalysis.md:38` cita ADR 003 para Amazon MQ; `Infrastructure-services-and-virtual-hardware.md:18` dice "ADR 003: System approach" y enlaza a 002; `BusinessDrivers.md:91` remite a "ADR 002" para los códigos de retiro (es ADR 011).
- ADR 007 nombra la herramienta "EventSource" (`007:29,35`) y `SystemAppoach.md:181` "EventStore"; se asume la misma.
- Streaming: "Kafka Managed Streams" en el texto (`Infrastructure-services-and-virtual-hardware.md:31`) y cálculo de Kinesis en `CostAnalysis.md:187-215`; no se puede decidir cuál sin mirar `Data&PayloadsEstimates.xlsx` o las diapositivas.
- Resumen de costos: DataDog y Tableau parecen intercambiados y VPN no anualizado (`CostAnalysis.md:282,288-289`).
- ¿Qué decidieron finalmente para el feedback tras declinar ADR 010? Ningún texto lo dice.
- Las respuestas del dueño a `Questions.md` no están en el repo.
- Las diapositivas (`docs/slides1-3.pdf`, `Architecture proposal_v2.pptx`) y el video (`img/han-archcolider.mp4`) pueden tener decisiones o estados distintos a los .md.
