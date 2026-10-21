# Team-7 · investigación fase 1 (texto)

Rutas relativas a `katas-src/Team-7/`. Archivos de texto leídos: 13 (`README.md` y los 12 ADR de `ADR/`).

## 1. El caso

[DATO] Penultimate Electronics es una cadena de electrónica con muchas tiendas en el país. Quien compra un equipo puede contratar un plan de soporte, y los expertos ("Sysops Squad") van al domicilio o a la oficina a arreglarlo (`README.md:44`). [DATO] El sistema de tickets actual es un monolito grande y antiguo. Se pierden tickets, a veces llega el experto equivocado, el sistema no siempre está disponible para cargar tickets por web o por teléfono, cada cambio tarda y rompe otra cosa, y el sistema se congela o se cae, según ellos por picos de uso (`README.md:46`). [DATO] Si no se resuelve, la empresa abandonará la línea de negocio y despedirá a los expertos (`README.md:46`, `README.md:56-58`). [DATO] Restricciones y supuestos que fija el equipo: millones de clientes, a lo sumo 100 tickets por cliente, escala de país (`README.md:134-137`); disponibilidad del 99,9 % para servicios de cara al cliente y la base de conocimiento (`README.md:139-141`); carga de página por debajo de 2 s y búsqueda en la base de conocimiento de "varios segundos" (`README.md:143-146`); datos de tarjeta guardados en forma segura y conforme a PCI (`README.md:151-152`); la empresa guarda las tarjetas localmente sin un procesador externo (`README.md:164`, ASM-4). [HUECO] No hay plazos ni presupuesto; la restricción CON-1 queda como pregunta abierta: "Integration? Cloud/on-prem? Technology stak?" (`README.md:158`).

## 2. Qué entregó el equipo

- `README.md`: documento único con caso de negocio, interesados, requisitos, arquitectura actual, arquitectura objetivo, vistas de proceso, despliegue, arquitectura de transición con análisis de riesgos e índice de ADR (`README.md:7-26`).
- `ADR/ADR-1` … `ADR/ADR-12`: 12 archivos de ADR (11 listados en el índice del README; ADR-8 no aparece en el índice y está marcado OBSOLETE) (`README.md:324-334`, `ADR/ADR-8-messaging-sync.md:5`).
- Requisitos: 6 interesados (SH-1…SH-6), 9 casos de uso (UC-1…UC-9), 6 cualidades (QA-1…QA-6), 1 restricción (CON-1), 4 supuestos (ASM-1…ASM-4) (`README.md:74-164`).
- Diagramas referidos en el texto: 30 imágenes en `images/` según inventario; de ellas son diagramas de arquitectura la arquitectura actual, casos de uso, contexto, contenedores, 9 vistas de proceso, despliegue, transición, marketecture, BPMN y los de ADR-1, ADR-4 y ADR-5 (`README.md:50-295`).
- Método: [DATO] vistas en estilo C4 (contexto, contenedores y vistas dinámicas), con notación informal y leyenda en cada diagrama (`README.md:169`, `README.md:180`). [DATO] Usan el término "architectural quantum" para cortar el sistema (`ADR/ADR-1-service-based.md:18`, `ADR/ADR-4-extract-billing-quanta.md:2`, `ADR/ADR-5-extract-customer-quantum.md:1`). [DATO] Un diagrama BPMN del flujo de tickets (`ADR/ADR-2-event-driven-broker.md:17-19`). [DATO] Mapean cada cualidad a casos de uso (QA-n → UC-n) (`README.md:134-155`, `README.md:184`). [DATO] Arquitectura de transición con análisis de riesgos por cualidad (`README.md:285-317`).
- [HUECO] El README enlaza `Requirements.md` (`README.md:184`), que no existe en el repositorio.

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR-1 | Estilo base service-based, con un quantum por cada uno de cuatro dominios (cliente, operación, facturación, administración). | Proposed | Microservicios (por su sobrecosto); monolito (sirve para empresa chica). | Cada dominio tiene un grupo distinto de características; service-based da tolerancia a fallos, escalabilidad y agilidad sin el sobrecosto de microservicios; es punto de partida para migrar a microservicios si hace falta. | Puede requerir dividir la base de datos; capacitar a los equipos en los límites de dominio. | Disponibilidad, rendimiento, escalabilidad, seguridad, PCI (sin número QA). | `ADR/ADR-1-service-based.md:2-26` |
| ADR-2 | Colas de mensajes con entrega garantizada, punto a punto, entre servicios de cliente y de Sysops para el flujo de tickets. | Proposed | Publicador-suscriptor por tópicos (descartado por necesitar entrega al destino exacto); consulta-respuesta (el flujo "se ve" como mensajería). | Envío de ticket "fire and forget" con baja latencia; expertos no esperan procesamiento; escalabilidad y disponibilidad independientes por quantum. | Más complejidad; la cola puede ser punto único de falla y hay que balancearla; más difícil probar y depurar. | Disponibilidad, escalabilidad, tiempo de respuesta (remite a ADR-1). | `ADR/ADR-2-event-driven-broker.md:2-29` |
| ADR-3 | La asignación de tickets a expertos es un job por lotes periódico (cron), no un servicio. | Proposed | Servicio que reacciona a eventos de ticket uno por uno (descartado por no poder priorizar). | La asignación cambia seguido (modularidad); por lotes permite priorizar; sin API es más simple de probar; se puede re-ejecutar; "Robustness is over performance here". | Riesgo de que el job no arranque por configuración o bug; requiere monitoreo extra. | Robustez (tickets perdidos, experto equivocado). | `ADR/ADR-3-search-expert.md:2-25` |
| ADR-4 | Facturación en un quantum aparte; el quantum de cliente guarda solo los últimos 4 dígitos de la tarjeta y envía los datos completos por cola. | Proposed | Para reportes financieros: acceso de gerentes por la UI de facturación, replicación por tabla al quantum de reportes, o job ETL desde facturación si las bases son de distinto proveedor. | Requisitos de seguridad específicos; auditoría PCI: cuanto más parte del sistema toca tarjetas, más pesado el procedimiento. | Más complejidad; asegurar el paso de datos de tarjeta entre quanta (TLS, control de acceso, autenticación) con esfuerzo extra. | PCI, ASM-4. | `ADR/ADR-4-extract-billing-quanta.md:2-31` |
| ADR-5 | Quantum de cliente aparte; elige por cada interacción entre replicación por tabla/ETL y mensajería asíncrona. | Proposed | Para contratos: replicación de base o ETL; para tarjetas: llamada síncrona REST/RPC (descartada); para encuestas: replicación por tabla (descartada a favor de envío asíncrono). | Responsividad y disponibilidad del lado cliente al crecer; una llamada síncrona anularía el esfuerzo de escalabilidad y disponibilidad. | No declara (sección Consequences vacía). | UC-2, UC-3, UC-4, UC-7. | `ADR/ADR-5-extract-customer-quantum.md:1-34` |
| ADR-6 | Base de datos de clientes separada de la operativa. | Proposed | No declara. | El mantenimiento de la base operativa no afecta al cliente; extensibilidad; filtrar datos; zona de red separada. | Mantener sincronizada la información de facturación del cliente con el resto. | Rendimiento, disponibilidad, escalabilidad, seguridad. | `ADR/ADR-6-separate-customer-db.md:2-17` |
| ADR-7 | Base de datos aparte para analítica y reportes. | Proposed | No declara. | Generar reportes es pesado y afecta al sistema operativo. | Mantener sincronizados los datos de reportes. | Rendimiento y disponibilidad de los servicios operativos. | `ADR/ADR-7-separate-reporting-db.md:2-14` |
| ADR-8 | Sincronizar la información de facturación del cliente por replicación de tabla. | OBSOLETE | No declara. | El cambio de datos de facturación no necesita reacción inmediata; se usa una vez al mes. | Implementación según proveedor de base (replicación o ETL). | Remite a ADR-6. | `ADR/ADR-8-messaging-sync.md:2-15` |
| ADR-9 | Un servicio de notificaciones único para todos los dominios. | Proposed | Un servicio de notificaciones por dominio (duplicaría implementación). | No pertenece a ningún dominio; si las notificaciones llegan tarde no es crítico, así que no necesita atención especial de disponibilidad ni rendimiento. | No declara un costo propio; nombra el costo de la alternativa (mantenibilidad). | UC-8 (implícito; no lo numera). | `ADR/ADR-9-notification-service.md:2-17` |
| ADR-10 | Diseñar cada servicio como monolito modular partido por subdominio, no por capas técnicas. | Proposed | Partición por capas técnicas (implícita en "rather than"). | Cada cambio obliga a cambiar cosas no relacionadas. | Puede requerir partir la base de datos en consecuencia. | Modularidad (QA-6, sin número). | `ADR/ADR-10-modular-services.md:2-15` |
| ADR-11 (título interno "ADR-10") | Extraer el cobro mensual a un job programado (Payment Job). | Proposed | Servicio siempre activo que calcula intervalos (descartado). | El cobro es mensual; usar un scheduler de terceros; sacar la lógica de lo operativo; re-ejecutar ante errores. | El job necesita acceso a la información de facturación. | UC-7 (cobro mensual, sin número). | `ADR/ADR-11-extract-payment-job.md:2-15` |
| ADR-12 | Un API Gateway por dominio (facturación, admin, cliente, Sysops), sin lógica de dominio; entre dominios solo se habla por gateway. | Proposed | Implementar autenticación, autorización y logging dentro de cada servicio (duplicación); un ESB (rechazado: "we are not building an ESB"). | Distintas características por quantum (remite a ADR-1); seguridad de facturación y admin; distinta disponibilidad para cliente y Sysops. | Más complejidad y más servicios; riesgo de cuello de botella y punto único de falla, requiere balanceo; costo de desarrollo y mantenimiento. | Seguridad, disponibilidad, escalabilidad. | `ADR/ADR-12-gateways.md:2-25` |

No hay ADR sobre cómo usar ADR ni plantillas.

## 4. Hallazgos para el curso

#### H01 · Cortar por grupos de cualidades: cuatro quanta
- Idea: el sistema se divide donde cambian las características que cada parte necesita, no por funciones.
- Lo que hizo el equipo: separó cuatro dominios (cliente, operación, facturación, administración) y describió para cada uno qué necesita: el cliente, disponibilidad, rendimiento y escalabilidad; la operación, disponibilidad y rendimiento; facturación, aislamiento por PCI; administración tolera demoras de horas pero pide seguridad de credenciales. Un quantum por dominio.
- Razón declarada: "each having a separate group of architectural characteristics" (`ADR/ADR-1-service-based.md:11`).
- Costo o trade-off admitido: puede requerir dividir la base; capacitar en límites de dominio (`ADR/ADR-1-service-based.md:25-26`).
- Alternativas que nombra: microservicios, por su sobrecosto (`ADR/ADR-1-service-based.md:18`).
- Estado: Proposed.
- Fuente: `ADR/ADR-1-service-based.md:11-18`; `README.md:199-205`.
- Completitud: completo.
- Contexto para contarlo: caso Sysops Squad; qué es un quantum; qué es service-based.
- Depende de imagen: no (`images/adr-1.jpg` complementa).
- Verificado: [ ]

#### H02 · Service-based como paso intermedio hacia microservicios
- Idea: se elige un estilo que resuelve el problema hoy y deja abierta la migración si la escala lo exige.
- Lo que hizo el equipo: eligió service-based, con unos 7 servicios, y lo presentó como punto de partida de una migración evolutiva desde el monolito.
- Razón declarada: tolerancia a fallos, escalabilidad y agilidad "free from cost overhead of Microservices"; "good starting point in evolutionary migration" (`ADR/ADR-1-service-based.md:18`, `:22`).
- Costo o trade-off admitido: dividir la base, capacitar equipos (`:25-26`).
- Alternativas que nombra: microservicios.
- Estado: Proposed.
- Fuente: `ADR/ADR-1-service-based.md:18-26`; `README.md:39`.
- Completitud: completo.
- Contexto para contarlo: monolito actual; qué es service-based frente a microservicios.
- Depende de imagen: no.
- Verificado: [ ]

#### H03 · Asignar por lotes en vez de evento por evento
- Idea: procesar en lotes periódicos permite priorizar y re-ejecutar, a cambio de latencia, cuando la robustez pesa más que la velocidad.
- Lo que hizo el equipo: la asignación de expertos es un job programado (cron, por hora o diario) que escanea estados y crea asignaciones; no acepta pedidos ni eventos. Los tickets no asignados se procesan en la siguiente corrida.
- Razón declarada: procesar uno por uno apenas se logra priorizar ("This can barely be achieved when processing one ticket at a time", `ADR-3:14`); el cliente no espera un experto al minuto; sin API es más simple; se puede re-ejecutar; "Robustness is over performance here" (`ADR/ADR-3-search-expert.md:14-22`).
- Costo o trade-off admitido: el job puede no arrancar por configuración o bug, requiere monitoreo (`ADR/ADR-3-search-expert.md:25`).
- Alternativas que nombra: servicio reactivo a eventos de ticket (`ADR/ADR-3-search-expert.md:14`).
- Estado: Proposed.
- Fuente: `ADR/ADR-3-search-expert.md:8-25`; `README.md:231-233`.
- Completitud: completo.
- Contexto para contarlo: el problema de tickets perdidos y experto equivocado; qué es un job por lotes.
- Depende de imagen: no (`images/ticket-assignment.jpg` complementa).
- Verificado: [ ]

#### H04 · Reducir el alcance de PCI aislando facturación
- Idea: cuanto menos sistema toca datos regulados, menor la superficie de auditoría; se aísla esa parte y las demás ven solo lo mínimo.
- Lo que hizo el equipo: quantum de facturación separado; el cliente guarda solo los últimos 4 dígitos y los datos completos viajan por cola a facturación; la UI de facturación para administradores puede quedar detrás de una red virtual ("can be hidden behind a virtual network", `ADR-4:22`), opción condicional y no decisión firme; recomienda dejar facturación on-prem.
- Razón declarada: "The bigger part of the system deals with credit card data, the more onerous the procedure is" (`ADR/ADR-4-extract-billing-quanta.md:8`).
- Costo o trade-off admitido: complejidad; asegurar el paso de datos entre quanta (TLS, control de acceso, autenticación) con esfuerzo extra (`ADR/ADR-4-extract-billing-quanta.md:30-31`).
- Alternativas que nombra: tres vías para que los gerentes vean datos financieros (UI de facturación, replicación por tabla, ETL) (`ADR/ADR-4-extract-billing-quanta.md:24`).
- Estado: Proposed.
- Fuente: `ADR/ADR-4-extract-billing-quanta.md:8-31`; `README.md:215`, `README.md:283`, `README.md:309`.
- Completitud: completo.
- Contexto para contarlo: qué es PCI; supuesto ASM-4 (la empresa guarda las tarjetas).
- Depende de imagen: no (`images/adr-4.jpg` complementa).
- Verificado: [ ]

#### H05 · Elegir el mecanismo de integración por cada flujo
- Idea: entre dos partes separadas no hay un único canal; cada flujo se integra según si necesita reacción, inmediatez o garantía de entrega.
- Lo que hizo el equipo: contratos de soporte por replicación de tabla o ETL (no necesitan reacción); tarjeta por mensaje asíncrono (lo síncrono anularía la disponibilidad del cliente); ticket como "fire and forget"; encuestas empujadas en asíncrono porque solo sirven a analítica; facturas por cola persistente para que no se pierdan si Notificaciones está caído.
- Razón declarada: cada una en su línea (`ADR/ADR-5-extract-customer-quantum.md:20-28`).
- Costo o trade-off admitido: no declara (Consequences vacía, `ADR/ADR-5-extract-customer-quantum.md:34`).
- Alternativas que nombra: REST/RPC síncrono para tarjetas; replicación por tabla para encuestas.
- Estado: Proposed.
- Fuente: `ADR/ADR-5-extract-customer-quantum.md:12-32`.
- Completitud: parcial (falta el costo).
- Contexto para contarlo: H01 y H04; replicación por tabla y ETL; cola persistente.
- Depende de imagen: no (`images/adr-5.jpg` resume).
- Verificado: [ ]

#### H06 · Colas punto a punto con entrega garantizada para el flujo de tickets
- Idea: si un mensaje tiene que llegar a un destino exacto, se usa cola punto a punto, no publicación por tópicos.
- Lo que hizo el equipo: colas asíncronas entre cliente y Sysops; justifica con un BPMN que el flujo es mensajería.
- Razón declarada: baja latencia para cliente y experto; escalabilidad y disponibilidad independientes; "we should guarantee message delivery to the exact destination" (`ADR/ADR-2-event-driven-broker.md:13-21`).
- Costo o trade-off admitido: complejidad; la cola como punto único de falla a balancear; pruebas y depuración más difíciles; "we accept these trade-offs" (`ADR/ADR-2-event-driven-broker.md:24-29`).
- Alternativas que nombra: pub-sub por tópicos (`:21`).
- Estado: Proposed.
- Fuente: `ADR/ADR-2-event-driven-broker.md:8-29`.
- Completitud: completo.
- Contexto para contarlo: asíncrono vs síncrono; cola vs tópico.
- Depende de imagen: no (`images/bpmn-ticket-workflow.jpg` complementa).
- Verificado: [ ]

#### H07 · Guardar antes de avisar: orden de escritura y notificación
- Idea: en un flujo asíncrono, el dato se persiste en el lado que lo muestra antes de disparar el aviso, para que el usuario vea el estado correcto al recibirlo.
- Lo que hizo el equipo: el pedido del cliente termina cuando el ticket se guarda en la base de clientes y se dispara el evento; el estado se actualiza en la base de clientes antes del evento de notificación.
- Razón declarada: que el cliente vea el ticket al refrescar y el estado real al recibir el aviso (`README.md:224`, `README.md:247`, `README.md:259`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara (vista de proceso, no ADR).
- Fuente: `README.md:224`, `:240`, `:247`, `:259`.
- Completitud: ilustrativo.
- Contexto para contarlo: base de clientes separada (H08), mensajería (H06).
- Depende de imagen: sí (`images/ticket-submission.jpg`, `images/ticket-inprogress.jpg`, `images/ticket-resolved.jpg`).
- Verificado: [ ]

#### H08 · Bases separadas para cliente y para reportes
- Idea: separar la base de una parte la protege de la carga o el mantenimiento de otra, al precio de sincronizar.
- Lo que hizo el equipo: base de clientes aparte de la operativa (ADR-6) y base de analítica y reportes aparte (ADR-7).
- Razón declarada: el mantenimiento de la base operativa no afecta al cliente; los reportes son pesados y afectan al sistema operativo (`ADR/ADR-6-separate-customer-db.md:11`, `ADR/ADR-7-separate-reporting-db.md:11`).
- Costo o trade-off admitido: mantener datos sincronizados (`ADR/ADR-6-separate-customer-db.md:17`, `ADR/ADR-7-separate-reporting-db.md:14`).
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `ADR/ADR-6-separate-customer-db.md`, `ADR/ADR-7-separate-reporting-db.md`.
- Completitud: parcial (no nombra alternativas).
- Contexto para contarlo: H01.
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · Arquitectura de transición: primero sin partir la base
- Idea: se puede llegar a la arquitectura objetivo en dos fases, resolviendo lo crítico con una base compartida y dejando los riesgos que quedan escritos.
- Lo que hizo el equipo: fase 1 con base monolítica y mensajería asíncrona (mensajes livianos, el receptor lee el detalle de la base); fase 2 hacia el objetivo. Escribe los riesgos de la fase 1: base y gateway único como cuello de botella, gateway único como punto único de falla, admin con acceso posible a tarjetas, exposición del resto del sistema desde el lado cliente, acoplamiento y cuello de botella de desarrollo del gateway.
- Razón declarada: el objetivo "can require significant development efforts because of the database split required" (`README.md:287`).
- Costo o trade-off admitido: los riesgos listados (`README.md:299-317`).
- Alternativas que nombra: la arquitectura objetivo completa.
- Estado: no declara (sección del README).
- Fuente: `README.md:285-317`.
- Completitud: completo.
- Contexto para contarlo: H01, H04, H12.
- Depende de imagen: sí (`images/transition.jpg`).
- Verificado: [ ]

#### H10 · Jobs programados para lo que ocurre por calendario
- Idea: un comportamiento que ocurre una vez al mes se saca a un job con scheduler externo en vez de vivir en un servicio siempre activo.
- Lo que hizo el equipo: Payment Job separado para el cobro mensual.
- Razón declarada: evitar calcular intervalos en un servicio siempre activo para código que corre una vez al mes; usar schedulers de terceros; re-ejecutar ante errores (`ADR/ADR-11-extract-payment-job.md:11-12`).
- Costo o trade-off admitido: el job necesita acceso a la información de facturación (`:15`).
- Alternativas que nombra: servicio siempre activo.
- Estado: Proposed.
- Fuente: `ADR/ADR-11-extract-payment-job.md`; `README.md:333`.
- Completitud: completo.
- Contexto para contarlo: H03 (mismo patrón), H04.
- Depende de imagen: no (`images/billing-sequence.jpg` complementa).
- Verificado: [ ]

#### H11 · Un servicio compartido cuando su exigencia es baja
- Idea: un servicio transversal que tolera demoras puede ser único para todos los dominios.
- Lo que hizo el equipo: un servicio de notificaciones para todos.
- Razón declarada: no pertenece a ningún dominio; una notificación tardía no es crítica (`ADR/ADR-9-notification-service.md:11-13`).
- Costo o trade-off admitido: no declara un costo propio.
- Alternativas que nombra: uno por dominio, con duplicación que afecta la mantenibilidad (`:17`).
- Estado: Proposed.
- Fuente: `ADR/ADR-9-notification-service.md`.
- Completitud: parcial (falta el costo de la opción elegida).
- Contexto para contarlo: H01.
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Un API Gateway por quantum, sin lógica de dominio
- Idea: los gateways concentran lo operativo (acceso, seguridad, ruteo) y marcan la frontera entre quanta; dentro de un quantum los servicios se hablan directo.
- Lo que hizo el equipo: gateways separados para facturación, admin, cliente y Sysops; solo control de acceso, seguridad y ruteo simple; llamadas síncronas de pasada; entre dominios solo por gateway (fachada), dentro del mismo quantum directo (Ticket Processor ↔ Ticket API).
- Razón declarada: evitar duplicar autenticación, autorización y logging; cada quantum tiene características distintas (`ADR/ADR-12-gateways.md:8-19`).
- Costo o trade-off admitido: más complejidad y servicios; riesgo de cuello de botella y punto único de falla; costo de desarrollo y mantenimiento (`:24-25`).
- Alternativas que nombra: lógica en cada servicio; ESB (`:8`, `:17`).
- Estado: Proposed.
- Fuente: `ADR/ADR-12-gateways.md`; `README.md:303-317`.
- Completitud: completo.
- Contexto para contarlo: H01; qué es un API Gateway y un ESB.
- Depende de imagen: no.
- Verificado: [ ]

#### H13 · Monolito modular por subdominio dentro de cada servicio
- Idea: dentro de cada servicio, organizar el código por subdominio en vez de por capas técnicas reduce los cambios en cadena.
- Lo que hizo el equipo: cada servicio como monolito modular por subdominio.
- Razón declarada: cada cambio obliga a cambiar cosas no relacionadas (`ADR/ADR-10-modular-services.md:8-11`).
- Costo o trade-off admitido: puede requerir partir la base (`:15`).
- Alternativas que nombra: capas técnicas (implícito).
- Estado: Proposed.
- Fuente: `ADR/ADR-10-modular-services.md`.
- Completitud: parcial (razón y alternativa en una frase).
- Contexto para contarlo: QA-6; qué es un monolito modular.
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · Cualidades atadas a interesados y casos de uso
- Idea: cada cualidad se justifica con quién la pide y en qué caso de uso, con una cifra cuando la hay.
- Lo que hizo el equipo: interesados SH-1…SH-6 con su cualidad entre paréntesis; QA-1…QA-6 con los UC a los que aplican y cifras (99,9 %, <2 s, millones de clientes).
- Razón declarada: no declara.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `README.md:74-155`.
- Completitud: ilustrativo. [DEDUCCIÓN] Los ADR no citan los QA por número (ver tabla de la sección 3).
- Contexto para contarlo: caso Sysops Squad.
- Depende de imagen: no (`images/use-case-model.jpg` complementa).
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `README.md:36-40` (origen del nombre "Team Seven"): anécdota del equipo, sin contenido de arquitectura.
- `README.md:29-30`, `README.md:321-322` (citas de las "leyes" de la arquitectura): epígrafes, no decisiones.
- `ADR/ADR-8-messaging-sync.md`: marcado OBSOLETE y fuera del índice; su contenido reaparece en ADR-5 (`ADR/ADR-5-extract-customer-quantum.md:20`).
- `README.md:281` (los colores del diagrama de despliegue no significan nada): nota de lectura.

## 6. Imágenes para fase 2

- `images/containers.jpg`: contenedores de la arquitectura objetivo, tecnologías y comunicación (`README.md:207`).
- `images/transition.jpg`: arquitectura de transición con base monolítica (`README.md:295`).
- `images/baseline.jpg`: contenedores del sistema actual (`README.md:175`).
- `images/adr-1.jpg`: los cuatro quanta del estilo service-based (`ADR/ADR-1-service-based.md:20`).
- `images/adr-4.jpg`: quantum de facturación y sus flujos con cliente, admin y reportes (`ADR/ADR-4-extract-billing-quanta.md:26`).
- `images/adr-5.jpg`: integraciones del quantum de cliente (`ADR/ADR-5-extract-customer-quantum.md:32`).
- `images/bpmn-ticket-workflow.jpg`: flujo de tickets como mensajes entre dominios (`ADR/ADR-2-event-driven-broker.md:19`).
- `images/use-case-model.jpg`: mapeo de cualidades a casos de uso (`README.md:186`).
- `images/system-context.jpg`: usuarios y dependencias externas (`README.md:193`).
- `images/deployment.jpg`: mapeo de contenedores a infraestructura (`README.md:280`).
- `images/ticket-submission.jpg`, `images/ticket-assignment.jpg`, `images/ticket-acceptance.jpg`, `images/ticket-inprogress.jpg`, `images/ticket-completion.jpg`, `images/ticket-resolved.jpg`, `images/survey-submission.jpg`: secuencia del flujo de tickets (`README.md:222-265`).
- `images/customer-registration.jpg`: registro y paso de la tarjeta a facturación (`README.md:217`).
- `images/billing-sequence.jpg`: cobro mensual (`README.md:274`).
- `images/marketecture.jpg`: vista funcional de la solución pedida (`README.md:50`).
- No citadas en el texto leído: `admin-containers.jpg`, `customer-containers.jpg`, `expert-containers.jpg`, `component-*.jpg` (5). Quedan para revisar en fase 2.

## 7. Preguntas abiertas

- ¿Qué tecnologías nombra el diagrama de contenedores? El texto dice que las muestra (`README.md:197`) pero no las escribe.
- ¿Cuáles son los "8 services" que cita ADR-12 (`ADR/ADR-12-gateways.md:8`)? El README habla de "about 7" (`README.md:39`); la lista solo estaría en las imágenes.
- ¿Qué decía `Requirements.md` (`README.md:184`)? No está en el repositorio.
- ADR-11 lleva el título interno "ADR-10" (`ADR/ADR-11-extract-payment-job.md:2`); el README lo lista como ADR-11 (`README.md:333`).
- ADR-5 no tiene consecuencias escritas (`ADR/ADR-5-extract-customer-quantum.md:34`).
- Todos los ADR vigentes están en estado Proposed; el texto no dice si alguno se aceptó.
- ¿Qué muestran las imágenes `component-*.jpg` y `*-containers.jpg` por dominio, que el README no cita?
