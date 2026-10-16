# Ficha · Pegasuz · Spotlight (Primavera 2022)

Convención: `[DATO]` lo que el repo dice; `[DEDUCCIÓN]` lo inferido de lo que dice (se explica de qué); `[HUECO]` lo que el repo no dice o deja sin resolver. Rutas relativas a la raíz del repo, sin `-src`. La copia de texto no incluye imágenes: los diagramas, worksheets y el PrOACT de `ADRs/011.adr-cloud-providers.md` existen como imagen y no se leyeron. Los enlaces externos (Loom, Prezi, Miro, Figma) no se visitaron.

## 1. El caso

[DATO] El cliente es el Diversity Cyber Council, que quiere mejorar la inclusión y la representación en tech con programas de formación, mentoría, networking y visibilidad (`README.md`, Prelude). El problema central: en EE. UU. hay unas 1,6 millones de ONG, descentralizadas y sin marco para colaborar, y poca visibilidad de esas ONG ante más de 100 millones de personas subrepresentadas; la plataforma debe llevar a esas personas a formación con salida a empleo (`README.md`, Prelude y Goal of the platform). Restricciones que el repo declara: capacidad de diseño a 3 años de "~1 mil" candidatos (el repo no aclara si son mil o un millón; por la progresión de la tabla, 500k a 2 años, se lee como un millón [DEDUCCIÓN]) y unas 100 mil ONG, en varios estados de EE. UU. (`README.md`, Assumptions, tabla de capacidad); disponibilidad de 3 a 4 nueves según dependencias síncronas, descartando 5 nueves por no ser un sistema de misión crítica (`README.md`, Availability); borrado de PII según GDPR (`other-artifacts/Requirement-analysis.md`, Security); financiamiento inicial difícil y necesidad de validar el mercado rápido (`other-artifacts/Requirement-analysis.md`, Funding; `quanta/npo-candidate.md`, Top 3). [HUECO] No declara presupuesto, fecha de entrega ni número de equipo más allá de los autores.

## 2. Qué entregó el equipo

[DATO] El README declara al equipo como primer lugar de O'Reilly Architecture Katas Spring 2022 (`README.md`).

- `README.md`: índice, enlaces a la presentación final (Loom y Prezi), supuestos de capacidad y disponibilidad, lista de quanta, hoja de ruta MVP y largo plazo, glosario y prácticas de ingeniería.
- `ADRs/`: 12 archivos de ADR, más el índice `ADRs/README.md`. `001` es la plantilla y no toma decisión; `002` a `012` son 11 decisiones. Estado: 9 Accepted (002, 003, 004, 005, 008, 009, 010, 011, 012) y 2 Proposed (006, 007). Ocho ADR incluyen tabla PrOACT (siete en texto y `011` en imagen), según la plantilla `ADRs/001.adr-template.md`; `003`, `004` y `005` no la tienen.
- `other-artifacts/Requirement-analysis.md`: 10 requisitos de negocio, cada uno con sus NFR, más análisis de green field, fondeo, seguridad y escala, y una tabla resumen requisito, análisis, NFR.
- `quanta/quanta-identification.md`: cómo se pasó de agregados a servicios y de servicios a quanta (event storming + actor-action, luego agrupación por dependencias síncronas).
- `quanta/` (8 quanta): `npo-candidate.md` (núcleo del MVP: NP, Candidate, Assignment, Auth), `npo-integration.md` (largo plazo: integración con APIs de ONG), `chat.md`, `document.md`, `meetings.md`, `notification.md`, `recommendation.md` y `reports.md`. Cada uno tiene responsabilidades, "Top 3" de características, estilo preferido y ADR relacionados.
- `other-services/` (4): `auth-service.md`, `bff-service.md`, `infrastructure-services.md` (API gateway, sidecar logger, colector de métricas, monitoreo y alertas) y `support-service.md`.
- `engineering-practices/` (7): `CI-CD.md`, `Continous-Delivery.md`, `Data-compliance-security.md`, `Feature-Toggles.md`, `Monitoring.md`, `sidecar-pattern.md` y `twelve-factor.md` (solo enlace de referencia).
- `design/design-artifacts.md`: enlaces a los diseños de Figma, prototipos y Loom de los flujos de Candidato y de NPO (externos, no leídos).

Cantidad de ADR: 11 decisiones y 1 plantilla.

Tipos de diagrama: [DATO] el texto nombra diagrama de contexto de la plataforma, arquitectura lógica, vista física de componentes, un diagrama por quantum, tres call flows (inscripción a curso, notificación de publicación, actualización de progreso de asignación desde una hoja de cálculo), diagrama de agregados y de quanta, y worksheets por quantum (`README.md`, `quanta/*.md`). [HUECO] Ninguna imagen está en la copia de texto; no se verificó su contenido.

Técnicas nombradas: [DATO] event storming + actor-action (`quanta/quanta-identification.md`); quanta definido como "An independently deployable artifact with high functional cohesion and synchronous connascence" (`README.md`, Identifying Architectural Quanta); PrOACT (`ADRs/001.adr-template.md`); design thinking con perfiles y golden paths de Candidato y NPO (`README.md`, User experience); glosario (`README.md`, Glossary).

No declara: C4, fitness functions, OKR, historias de usuario como entregable (aparecen solo como recordatorio en `other-artifacts/Requirement-analysis.md`, requisito 10), perfiles de usuario escritos en texto, plan de pruebas, ni cifras de costo.

Historia de git (secundario, clon sin checkout): 2022-05-24 a 2023-10-29. Último cambio: `README.md` el 2023-10-29 (dos líneas). `ADRs/data-storage.md` vacío se borró el 2022-07-28 (commit `ce38531`).

## 3. Decisiones

Todas las celdas son `[DATO]` salvo que digan `[DEDUCCIÓN]` o `[HUECO]`. "no declara" significa que el ADR no lo escribe.

| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas (ver lista) |
|---|---|---|---|---|---|
| 001 (`ADRs/001.adr-template.md`; índice en `ADRs/README.md`) | Plantilla de ADR sin contenido de decisión; el índice la titula "We are using ADRs (template)". | no declara | no declara | no declara | ADR |
| 002 (`ADRs/002.adr-api-standard.md`), Accepted | REST y GraphQL juntos: GraphQL para las apps (vía BFF) y REST entre servicios y para terceros. | REST, GraphQL, gRPC (tabla PrOACT; gRPC con "feasibility: low") | GraphQL: evita over y under-fetching, payload menor en móvil, esquema tipado. REST: orientado a recursos, lo integran más fácil terceros y ONG. | Sobrecarga de infraestructura por dos estándares; mitigación: GraphQL solo en el BFF al inicio, federación después. Menor rendimiento que gRPC; mitigación: las operaciones "do not affect human life or money". | tradeoffs-explicitos, otro: GraphQL-y-REST |
| 003 (`ADRs/003.adr-build-vs-buy.md`), Accepted | Comprar auth, almacenamiento de documentos, chat y notificaciones; construir el núcleo de valor. | Construir en casa; comprar a terceros | no declara una razón por compra. Lista seis factores: cercanía al valor central, ventaja competitiva, simplicidad, go-live más rápido, competencia del equipo, costo de construir frente a comprar. | Menos flexibilidad y personalización; mitigación: un servicio envoltorio (wrapper) que cubra lo que falte. | ADR, tradeoffs-explicitos, cloud-gestionada, costo |
| 004 (`ADRs/004.adr-bff.md`), Accepted | Un servicio BFF con API GraphQL para las apps web y móvil. | no declara (describe ventajas del patrón; el contexto menciona que los servicios externos prefieren REST) | Over y under-fetching; funciones de UI distintas de las del backend; una sola llamada agregada; el equipo de frontend en TypeScript puede operarlo sin esperar APIs del backend. | BFF como punto único de falla; mitigación: desplegarlo en varias zonas de disponibilidad. Un servicio más que monitorear. Latencia de un salto extra; mitigación: mismo clúster que los servicios. | BFF, tradeoffs-explicitos, disponibilidad-HA, resiliencia-fallos |
| 005 (`ADRs/005.adr-choosing-nosql-db.md`), Accepted | Document store para la operativa y key-value para caché. | Lista cuatro familias de NoSQL (documento, grafo, key-value, columnas anchas); no compara con RDBMS (eso está en 012). | "As there won't be too many writes, a document-based store would be a better choice." Particionado para crecer por región. Key-value para caché sin consultas agregadas. | no declara | cache, escalabilidad |
| 006 (`ADRs/006.adr-deployment-method.md`), Proposed | Usar contenedores o serverless según el caso; no elige uno para todo. Contenedores para servicios que necesitan alta disponibilidad; serverless para los que no. | Contenedores, serverless (tabla PrOACT de 8 criterios) | Costo y mantenimiento de contenedores; disponibilidad, latencia y seguridad de contenedores frente a serverless; cada quantum sigue un estilo distribuido distinto. | Serverless: disponibilidad baja por cold start y acoplamiento al proveedor. Contenedores: costo y mantenimiento. Mitigación: servicios gestionados (AWS ECS o Google Cloud Run). El equipo necesita dominar ambos estilos; no declara mitigación para eso. | contenedores, serverless, costo, disponibilidad-HA |
| 007 (`ADRs/007.adr-arch-style-np-candidate-mvp.md`), Proposed | Decisión condicionada al costo: monolito modular si hay restricción de costo; microservicios + event-driven si no la hay. El ADR no dice cuál aplica. | Monolito modular; microservicio (tabla PrOACT de 5 factores) | Factores: costo (tiempo y dinero), mantenimiento, acoplamiento, escalabilidad, extensibilidad. Empezar con el monolito y migrar "after there is a product market fit and a system required to scale". | no declara en el ADR. En `quanta/npo-candidate.md` sí: costo de EDA y CI/CD, consistencia eventual, latencia por saltos de red. | monolito-modular, microservicios, event-driven, costo, evolutividad |
| 008 (`ADRs/008.adr-upload-directly-to-document-storage.md`), Accepted | El frontend sube y descarga archivos directo al proveedor de almacenamiento, sin pasar por el servicio de documentos. | Subir vía servicio de documentos; subir directo al proveedor | Tiempo de construcción mínimo; pago por uso; sin overhead de mantenimiento; el servicio de documentos no acumula memoria según el tamaño del archivo. | Riesgo de seguridad: archivos maliciosos, tamaño o formato no válidos, acceso sin autorización. Mitigación: URL prefirmadas o de vida corta que fijen tamaño, formato y validez. | cloud-gestionada, seguridad, costo |
| 009 (`ADRs/009.adr-idp.md`), Accepted | Identidad con proveedor de terceros completamente gestionado. | Construir en casa; self-hosted (Keycloak, Apache LDAP); tercero gestionado (Auth0 y Okta aparecen como ejemplos). El proveedor elegido no se nombra. | Construir y mantener identidad es caro y agrega carga de seguridad y cumplimiento; mayor velocidad al mercado; pago por uso. | Limita a lo que ofrece el proveedor; mitigación: un servicio envoltorio como fachada de identidad y capacidades propias. | cloud-gestionada, seguridad, costo, tradeoffs-explicitos, otro: fachada-sobre-proveedor |
| 010 (`ADRs/010.adr-queue-stream.md`), Accepted | Event stream como base de eventos, no cola de mensajes. | Message queue; event stream (tabla PrOACT: confiabilidad, entrega, retención, costo, mantenimiento) | Orden preservado y confiabilidad alta; cada consumidor tiene su offset; retención por un periodo; un mismo evento (ej. `candidate_assignment_updated`) lo consumen varios servicios, por ejemplo para analítica. | Costo mayor que una cola; el ADR lo acepta "given the advantages of management and reliability". | event-driven, streaming, costo |
| 011 (`ADRs/011.adr-cloud-providers.md`), Accepted | Decisión implícita: AWS. El texto no tiene una frase de decisión explícita; dice "AWS has edge over rest". | AWS, Google Cloud Platform, Microsoft Azure | Los tres están "closely placed" en oferta y precio; AWS tiene ventaja por ser líder de mercado y por su comunidad. | no declara (la tabla PrOACT está en imagen, no leída; el texto no trae cifras) | cloud-gestionada |
| 012 (`ADRs/012.adr-operational-data-storage.md`), Accepted | NoSQL en lugar de RDBMS para los datos operativos. | RDBMS; NoSQL (tabla PrOACT de 6 criterios) | Escalabilidad deseada; flexibilidad de esquema en un green field por ambigüedad y evolución del sistema. | no declara como sección propia. La tabla PrOACT marca a NoSQL con consistencia de datos "Low" (ver sección 7). | escalabilidad, evolutividad |

## 4. Patrones y prácticas presentes

- `otro: quantum-arquitectonico` [DATO]: unidad de corte definida como artefacto desplegable de forma independiente con cohesión funcional alta y connascence síncrona; los quanta se identifican por dependencias síncronas (`README.md`, Identifying Architectural Quanta; `quanta/quanta-identification.md`). Hay 8 quanta documentados; Auth va dentro de NPO-Candidate.
- `otro: estilo-por-quantum` [DATO]: no se elige un estilo para toda la plataforma; cada quantum tiene el suyo (`README.md`, Non-Functional Requirements: "we are not picking a style yet").
- `monolito-modular` [DATO]: NPO-Candidate arranca como monolito modular en el MVP y migra a microservicios + event-driven en el largo plazo (`ADRs/007.adr-arch-style-np-candidate-mvp.md`; `quanta/npo-candidate.md`, Architectural Style; `README.md`, Platform Roadmap).
- `event-driven` y `streaming` [DATO]: el NP Service publica eventos de posts, comentarios, evaluaciones y registro; Candidate escucha asignaciones; Assignment escucha evaluaciones y crea asignaciones (`quanta/npo-candidate.md`; `ADRs/010.adr-queue-stream.md`).
- `BFF` [DATO]: fachada GraphQL para la UI que agrega datos de varios servicios, traduce a REST y es stateless (`other-services/bff-service.md`; `ADRs/004.adr-bff.md`).
- `API-gateway` [DATO]: enruta, autentica y agrega un request-id a cada petición para trazabilidad (`other-services/infrastructure-services.md`).
- `otro: GraphQL-y-REST` [DATO]: GraphQL solo en el BFF, REST entre servicios y para integraciones externas (`ADRs/002.adr-api-standard.md`).
- `cloud-gestionada` [DATO]: identidad, almacenamiento de documentos, chat, notificaciones y, por recomendación, calendario de reuniones con proveedores externos (`ADRs/003...`, `ADRs/009...`, `quanta/chat.md`, `quanta/meetings.md`, `quanta/notification.md`).
- `otro: fachada-sobre-proveedor` [DATO]: chat y reuniones actúan como fachada del proveedor; la identidad tendría un servicio envoltorio como fachada (`quanta/chat.md`, Driving Architectural Characteristics; `quanta/meetings.md`; `ADRs/009.adr-idp.md`, Tradeoffs).
- `seguridad` [DATO]: subida directa con URL prefirmadas o de vida corta (`ADRs/008.adr-upload-directly-to-document-storage.md`).
- `privacidad-GDPR` y `fuente-unica-de-verdad` [DATO]: el derecho al olvido exige borrar PII; el requisito pide "Use just one place where the data can be stored and retrieved" y no dejar huellas en servicios ni logs (`other-artifacts/Requirement-analysis.md`, Security); PII a un proveedor cumplidor de norma y cifrado en reposo y tránsito (`engineering-practices/Data-compliance-security.md`).
- `observabilidad` [DATO]: cada servicio debe hacer health checks, generar métricas, escribir logs y trazar peticiones; se recomienda sidecar (`engineering-practices/Monitoring.md`).
- `otro: sidecar` [DATO]: un sidecar recolecta logs de los pods y los envía a un repositorio central; el documento de práctica lo recomienda por aislamiento de dueño, lenguaje y ubicación (`other-services/infrastructure-services.md`; `engineering-practices/sidecar-pattern.md`).
- `time-series` [DATO]: el colector de métricas guarda métricas de API (número, éxito y fallo, tiempos de respuesta) en una base de series de tiempo; no nombra el producto (`other-services/infrastructure-services.md`).
- `deployability` [DATO]: CI con lint, build sin errores, pruebas unitarias y control de calidad antes de main; CD con despliegue automático al mergear a main; un mismo build para todos los entornos; pruebas de humo en entornos bajos (`engineering-practices/CI-CD.md`; `engineering-practices/Continous-Delivery.md`).
- `otro: feature-toggles` [DATO]: banderas para ocultar funciones no liberadas, para A/B testing, canary, rollback y trunk-based; un interruptor puede cubrir varios servicios (`engineering-practices/Feature-Toggles.md`; `engineering-practices/Continous-Delivery.md`).
- `testabilidad` [DATO]: las reglas de incentivos, registro y asignación de mentores deben poder probarse fácil (`quanta/npo-candidate.md`); las funciones de transformación de la integración son independientes (`quanta/npo-integration.md`); el documento reconoce que probar un sistema event-driven es difícil y propone logging agregado y trazas distribuidas.
- `tradeoffs-explicitos` y `riesgos-explicitos` [DATO]: cada ADR y cada quanta tiene sección de trade-offs con mitigación (`ADRs/*.md`; `quanta/*.md`).
- `supuestos-explicitos` [DATO]: capacidad a 3 años, criterios de disponibilidad y el MVP sin entrenamiento de modelos (`README.md`, Assumptions y Platform Roadmap).
- `escalabilidad` y `disponibilidad-HA` [DATO]: tabla de capacidad por año; 3 nueves para quanta sin dependencias síncronas y 4 nueves para quanta con ellas (`README.md`, Assumptions).
- `otro: consistencia-eventual` [DATO]: aceptada en NPO-Candidate y en la integración con ONG; el documento de integración asume que la copia del sistema de la ONG puede diferir (`quanta/npo-candidate.md`; `quanta/npo-integration.md`, Tradeoffs).
- `serverless` [DATO]: una función por oferta de ONG que transforma y envía la asignación (`quanta/npo-integration.md`); ADR 006 lo deja como opción por caso.
- `otro: integracion-por-pull` [DATO]: un scheduler consulta ofertas activas y dispara la extracción de cada ONG; un segundo scheduler transforma los datos crudos (`quanta/npo-integration.md`, Components).
- `otro: microkernel` [DATO]: para agregar integraciones nuevas sin tocar las existentes (`quanta/npo-integration.md`, Architectural Style).
- `reglas-deterministas` [DEDUCCIÓN]: el MVP de recomendaciones es "Simple, without model training" y las reglas de negocio se describen como testeables (`README.md`, Platform Roadmap; `quanta/npo-candidate.md`).
- `ADR` [DATO]: 11 decisiones con plantilla, estado y PrOACT (`ADRs/`).
- `event-storming` [DATO]: usado para identificar agregados (`quanta/quanta-identification.md`; `README.md`, Identifying Architectural Quanta).
- `glosario` [DATO]: NPO, NFR, MVP, PII, UI, UX, IA (`README.md`, Glossary).
- `otro: PrOACT` [DATO]: tablas de criterios por alternativa en cada ADR (`ADRs/001.adr-template.md`).
- `otro: roadmap-por-fases` [DATO]: nueve ítems ordenados para el MVP y lista de largo plazo (`README.md`, Platform Roadmap).
- `otro: design-thinking` [DATO]: sesiones de design thinking con perfiles de Candidato y NPO y golden paths; los artefactos están fuera del repo (`README.md`, User experience; `design/design-artifacts.md`).
- `otro: twelve-factor` [DATO]: enlace de referencia; el repo no muestra cómo se cumple (`engineering-practices/twelve-factor.md`).

## 5. Cómo llegan de los requisitos a la arquitectura

Hay una cadena parcial. [DATO] Eslabón 1, requisito → NFR: `other-artifacts/Requirement-analysis.md` tiene una tabla resumen que asigna a cada requisito su análisis y su NFR. El README lista siete NFR (Workflow, Evolutionary, Feasibility, Scalability, Usability, Availability, Data Integrity) y remite a ese análisis. [DATO] Eslabón 2, NFR → características priorizadas: cada quantum tiene una sección "Driving Architectural Characteristics" con "Top 3" y otras características; citan nombres de NFR, no números de requisito ni la tabla. [HUECO] Ese eslabón no está enlazado explícitamente. [DATO] Eslabón 3, característica → decisión: cada quantum tiene "Relevant ADRs", que enlaza ADRs por ruta. Faltan enlaces en algunos casos: `quanta/notification.md` deja la lista vacía; `other-services/support-service.md` dice "NA"; `quanta/chat.md`, `meetings.md`, `document.md`, `recommendation.md` y `reports.md` enlazan `ADRs/003` (build vs buy) aunque ese ADR no decide sobre sus tecnologías (`quanta/reports.md` tiene dato de data warehouse sin ADR).

Características priorizadas (Top 3 de los 11 quanta y servicios que las declaran; 34 posiciones y 14 características distintas): Scalability 6 (NPO-Candidate, BFF, Document, Meetings, Notification, Recommendations); Availability 4 (NPO-Candidate, Auth, Support, Notification); Extensibility 4 (NPO-Candidate, Chat, Meetings, Notification); Feasibility 3 (NPO-Candidate, Auth, NPO-Integration); Data integrity 3 (Auth, Support, Recommendations); Testability 2 (BFF, Chat); Workflow 2 (Support, NPO-Integration); Recoverability 2 (Document, Reports); Configurability 2 (NPO-Integration, Reports); Abstraction 2 (Chat, Meetings); Fault tolerance 1 (BFF); Responsiveness 1 (Document); Adaptability 1 (Recommendations); Performance 1 (Reports).

[HUECO] Orden: dentro de cada lista el orden es el de escritura; ningún documento declara un criterio de priorización global. `quanta/npo-candidate.md` marca "(cost & time, in MVP)" y "(Post MVP)" en dos ítems; "(time)" aparece en Auth y BFF sin explicar. Los worksheets (imágenes) podrían tenerlo; no se leyeron.

[DEDUCCIÓN] Lo que falta en la cadena: "Usability" es "a hard requirement" en `other-artifacts/Requirement-analysis.md` (requisito 3) y no aparece en ningún Top 3 ni en las listas de otras características; solo `quanta/notification.md` menciona usabilidad, en sus responsabilidades. "Interoperability" aparece solo como otra característica en `quanta/npo-candidate.md`. Las características descartadas por delegación están en `quanta/chat.md` (cuatro: seguridad, escalabilidad, disponibilidad, responsividad), `quanta/notification.md` (seguridad) y `quanta/meetings.md` (tres: factibilidad, recuperabilidad, disponibilidad, con textos que las contradicen; ver sección 7).

## 6. Lo distintivo

1. **Disponibilidad fijada por quantum, con cifras.** [DATO] Tres nueves para los quanta sin dependencias síncronas (reporting y analytics) y cuatro para los que sí las tienen (notificaciones); descarta cinco nueves porque la plataforma no maneja vidas ni dinero directamente (`README.md`, Availability). Evita el costo de 5 nueves en todo el sistema. Cuesta: el repo no describe el mecanismo para llegar a esas cifras [HUECO].

2. **Monolito modular como primer paso, con condición escrita y ruta de migración.** [DATO] `ADRs/007.adr-arch-style-np-candidate-mvp.md` y `quanta/npo-candidate.md` dan el monolito para el MVP y, después, microservicios + event-driven. Evita la infraestructura distribuida antes de tener producto (el texto la llama "costly architecture" en `quanta/npo-candidate.md`). Cuesta: la condición ("if there is a cost constraint") no se resuelve por escrito, y el repo no describe la migración [HUECO]; el ADR sigue en Proposed.

3. **Subida de archivos directa a almacenamiento con URL de vida corta.** [DATO] `ADRs/008.adr-upload-directly-to-document-storage.md`. Evita que el archivo pase por el servicio de documentos, cuya memoria "will bloat un predictably based on size of document uploaded" (tabla PrOACT). Cuesta: superficie de seguridad que el ADR cubre solo con URL prefirmadas; no describe validación del contenido del archivo [HUECO].

4. **Compra de identidad, chat, reuniones y notificaciones detrás de una fachada.** [DATO] `ADRs/003.adr-build-vs-buy.md`, `ADRs/009.adr-idp.md`, `quanta/chat.md` y `quanta/meetings.md` (las dos últimas: "facade to the 3rd party"). Evita construir chat, calendario o identidad antes del MVP. Cuesta: menos flexibilidad y dependencia del proveedor. [DEDUCCIÓN] `other-services/auth-service.md` describe CRUD de usuarios, roles, cambio de contraseña y envío de correos: es el trabajo que la fachada de identidad tendría que cubrir, y el documento no dice si el proveedor hace parte de eso.

5. **Integración con las APIs de ONG por pull programado, con una función por oferta y arquitectura microkernel.** [DATO] `quanta/npo-integration.md`: un scheduler consulta ofertas activas y dispara una función por oferta; cada integración nueva no afecta a las existentes. Evita que la única fuente de progreso del candidato sea que el NP lo capture a mano en una hoja de cálculo, lo que "may leave room for error" (`quanta/npo-integration.md`, intro). Cuesta: "Data can be made eventually consistent" y "Testing an event-driven system is tough" (mitigación: logging agregado y trazas distribuidas).

## 7. Huecos, inconsistencias y cosas fuera de alcance

**Fuera de alcance o futuro declarado** [DATO]
- Largo plazo: migrar NPO-Candidate a microservicios + event-driven; análisis predictivo avanzado; recomendaciones con entrenamiento de modelos; integraciones con NPO; Support Service (`README.md`, Platform Roadmap, Long Term).
- MVP sin analítica en reports; recomendaciones simples sin entrenamiento (`README.md`, Platform Roadmap).
- Chat: recordatorio por email de mensajes sin leer, a largo plazo (`quanta/chat.md`). Support: canales de voz, chat y email, opcionales (`other-services/support-service.md`).
- Multi-zona: "consider multi-zone deployment in the longer-term" (`other-artifacts/Requirement-analysis.md`); NPO-Candidate la pone en "Post MVP" (`quanta/npo-candidate.md`).
- [HUECO] No hay sección "fuera de alcance" en el repo; lo futuro se marca con "Long Term" o "Post MVP".

**Contradicciones entre documentos**
1. Escrituras: `ADRs/005.adr-choosing-nosql-db.md` dice "As there won't be too many writes", y `ADRs/012.adr-operational-data-storage.md` puntúa a NoSQL como "High" en la fila "Write Performance Requirements". [DEDUCCIÓN] Además, `other-artifacts/Requirement-analysis.md` (requisito 5) exige registrar cualquier actividad de usuario, y `ADRs/010.adr-queue-stream.md` añade un flujo de eventos a varios consumidores. El supuesto de pocas escrituras no se sostiene con los otros dos.
2. Cifras de crecimiento: `README.md` (tabla de capacidad) dice 5 mil a 20 mil NPO al año 1 y 25 mil a 50 mil al año 2. `other-artifacts/Requirement-analysis.md` dice que con 0,5 % de adopción en 1 a 2 años habría "100k NPOs and 500k under-represented folks". [DEDUCCIÓN, cálculo propio] Con las 1,6 millones de ONG de `README.md` (Prelude), 0,5 % son 8.000, no 100.000. El cálculo de personas sí cierra: 0,5 % de 100 millones son 500.000.
3. PII: `engineering-practices/Data-compliance-security.md` dice "Store no PII data in our system". `other-services/auth-service.md` dice "Since this service stores PII", `other-artifacts/Requirement-analysis.md` (Security) lista como dato guardado "email, phone, address, ethnicity, SSN" y `quanta/npo-candidate.md` pone el perfil de candidato en Candidate Service. [HUECO] No hay decisión que diga dónde viven esos datos ni por qué se guarda SSN.
4. Tipo de archivos: `other-artifacts/Requirement-analysis.md` (requisito 7) dice "PDF ... but no other downloads". `quanta/document.md` incluye "Spreadsheet" entre los documentos a guardar, y `quanta/reports.md` exporta "PDF, CSV". [DEDUCCIÓN] No queda claro si planillas y CSV son excepciones.
5. Mismo archivo, dos posiciones: en `quanta/meetings.md`, la lista "Characteristics that we do not need as we offloaded to 3rd party vendors" incluye "Availability - The service must be available at all times since other services are dependent on it", "Recoverability - Service must recover from any failures fast and no loss of data" y "Feasibility - ... building it as part of the MVP is inevitable".
6. Copia de texto: `quanta/chat.md` dice "Recommended to use a 3rd party calendar service", que es el texto de `quanta/meetings.md`, no de chat. `quanta/meetings.md` menciona "a 3rd party chat provider" dentro de la lista de características delegadas.
7. Integridad frente a consistencia: `quanta/npo-candidate.md` acepta consistencia eventual "as the system is not dealing with mission critical information", pero `other-artifacts/Requirement-analysis.md` (requisito 4) llama "hard requirement" el seguimiento del progreso del candidato con integridad de datos. [DEDUCCIÓN]
8. Multi-zona en el BFF: `ADRs/004.adr-bff.md` mitiga el punto único de falla con "Deploy BFF in multiple availability zones"; `README.md` pone el BFF en el ítem 3 del MVP, y `other-artifacts/Requirement-analysis.md` dice que la multi-zona es "in the longer-term". [DEDUCCIÓN]
9. Estado de decisiones: `ADRs/006.adr-deployment-method.md` y `ADRs/007.adr-arch-style-np-candidate-mvp.md` están en Proposed, pero `README.md` (roadmap, ítem 1) y `quanta/npo-candidate.md` tratan el monolito modular como decidido. `ADRs/004.adr-bff.md` habla de "same cluster" y `other-services/infrastructure-services.md` de "pods", lo que implica contenedores sin que ADR 006 lo haya decidido. [DEDUCCIÓN]
10. Cola o stream: `quanta/npo-candidate.md` (mitigación de latencia) propone "a reliable message queue"; `ADRs/010.adr-queue-stream.md` elige event stream y rechaza la cola para este uso. [DATO]
11. Ubicación de Auth: el archivo `other-services/auth-service.md` existe, pero `README.md` lista "Other Services" sin Auth, y `quanta/quanta-identification.md` y `quanta/npo-candidate.md` lo ponen dentro de NPO-Candidate. [DATO]

**ADR sin consecuencias o sin decisión concreta** [HUECO]
- `ADRs/005` y `ADRs/012` no nombran ningún producto de base de datos. `ADRs/010` no nombra el broker de stream. `ADRs/009` no nombra al proveedor de identidad. `ADRs/003` no nombra a los proveedores de chat, notificaciones ni documentos.
- `ADRs/011`: decisión implícita (AWS) sin frase de decisión; la tabla PrOACT está en imagen y el texto no trae cifras de costo. Ningún ADR tiene cifras de costo.
- Reuniones: `quanta/meetings.md` recomienda un proveedor de calendario y cita `ADRs/003`, que no enumera reuniones entre las compras.
- Data warehouse y OLAP: `other-artifacts/Requirement-analysis.md` (requisito 9) dice "Consider OLAP solution"; `quanta/reports.md` consulta "data warehouse"; ningún ADR decide el almacén analítico ni el de series de tiempo.
- Indexación de categorías para búsqueda (requisito 2, "Indexing categories"): sin decisión.
- Engagement (requisito 5): no hay servicio dueño del registro de actividad; solo aparece el ejemplo del ADR 010.
- Usabilidad (requisito 3, "hard requirement"): no tiene decisión de arquitectura ni quantum que la lleve; queda en diseño externo.
- GDPR: no describe el mecanismo de borrado. El requisito pide que las cachés tengan "mechanisms in place to erase the data" y que no haya PII en logs; el sidecar logger envía logs a un repositorio central sin mencionar redacción (`other-services/infrastructure-services.md`).
- Respaldos: `quanta/document.md` dice "Regular backups need to be taken"; no dice quién, cómo ni dónde, y `ADRs/008` delega el almacenamiento al proveedor.
- Pruebas: CI/CD menciona pruebas unitarias y de humo; no hay estrategia de pruebas, de contratos ni de carga. No hay fitness functions.
- Stream a la UI: `other-services/bff-service.md` (responsabilidad 4) dice "Stream system events to UI in case of failures in async commits"; el mecanismo no está declarado.
- Twelve-factor: solo enlace; no hay evidencia de cumplimiento.
- Enlace roto: `ADRs/006.adr-deployment-method.md` apunta a `../README.md#requirement-analysis`, y el README no tiene esa ancla. [DATO]
- `quanta/notification.md` deja "Relevant ADRs" vacío, aunque `ADRs/003` le aplica. [DATO]
- Historia: `ADRs/003` y `ADRs/007` figuran con fecha 2022-06-23 en el texto y entraron al repo el 2022-06-24 (commit `e0baec6`, con nombres distintos). [DATO]

**Redacción incompleta o copiada**
- `other-services/bff-service.md`: "Service should be highly scalable as" termina sin completar.
- `ADRs/001.adr-template.md`: plantilla sin contenido.
- `ADRs/010.adr-queue-stream.md`: el contexto habla de construir "an event sourcing system" como meta; no hay diseño de event sourcing en el repo [HUECO].

## 8. Candidatas a verdades enseñables

1. **FUERTE.** Una arquitectura por fases debe escribir la condición que la cambia y el momento en que se cambia. Ejemplo: `ADRs/007` elige monolito modular si hay restricción de costo y pasa a microservicios "after there is a product market fit and a system required to scale". Sostienen esto `quanta/npo-candidate.md` (Architectural Style), `README.md` (Platform Roadmap) y `other-artifacts/Requirement-analysis.md` (Green Field). Límite: la condición no está cerrada (sección 7, punto 9).

2. **FUERTE.** Lo que no es el valor central se compra, y la compra lleva una fachada propia para lo que falte. Ejemplo: `ADRs/003` compra auth, documentos, chat y notificaciones; `ADRs/009` pide "an identity facade"; `quanta/chat.md` y `quanta/meetings.md` describen "acts like a facade". Sostienen esto cuatro documentos.

3. **MEDIA.** Un archivo grande puede ir del cliente al almacenamiento sin pasar por el servicio que lo registra, si la URL es prefirmada y de vida corta. Ejemplo: `ADRs/008` con su tabla PrOACT (memoria del servicio, costo por uso) y su mitigación de URL. Sostiene esto un ADR claro y una referencia en `quanta/document.md`.

4. **MEDIA.** La disponibilidad se asigna por quantum según sus dependencias síncronas, no como un número para el sistema entero. Ejemplo: `README.md` asigna tres nueves a reporting y analytics y cuatro a notificaciones, y descarta cinco. Lo respalda `quanta/notification.md` ("depend on this service. So this service needs to be highly available").

5. **MEDIA.** Cuando la ONG tiene su propio sistema, el progreso se trae tirando de su API con un scheduler, y se acepta la consistencia eventual. Ejemplo: `quanta/npo-integration.md` (extraction scheduler; tradeoff de consistencia). Lo respalda `other-artifacts/Requirement-analysis.md` (requisito 4: "data must be regularly pulled from their APIs").

6. **DÉBIL.** Una elección de base de datos depende del volumen de escrituras esperado, y el documento debe usar ese mismo supuesto en todas partes. Ejemplo: `ADRs/005` supone pocas escrituras; `ADRs/010` y el requisito 5 exigen registrar eventos y actividad. Se deduce del contraste entre documentos.

7. **DÉBIL.** Un crecimiento que se usa para dimensionar debe cerrar aritméticamente con su tasa de adopción y su base. Ejemplo: 0,5 % de 1,6 millones de ONG son 8.000, no las 100.000 del análisis de requisitos. Fuentes: `README.md` (Prelude) y `other-artifacts/Requirement-analysis.md` (No. of users). Cálculo propio.

8. **MEDIA.** Si el sistema dice "no guardar PII", el documento debe nombrar qué servicio guarda qué dato personal. Ejemplo: `engineering-practices/Data-compliance-security.md` (medida 1) frente a `other-services/auth-service.md` ("this service stores PII") y `other-artifacts/Requirement-analysis.md` (Security). Lo respalda la contradicción entre tres documentos.

## 9. Fragmentos citables

1. "Start with the monolith and later migrate to microservice + event driven after there is a product market fit and a system required to scale." (`ADRs/007.adr-arch-style-np-candidate-mvp.md`)
2. "considering use cases of spotlight platform with use cases of event to be delivered to multiple services" (`ADRs/010.adr-queue-stream.md`)
3. "As there won't be too many writes, a document-based store would be a better choice." (`ADRs/005.adr-choosing-nosql-db.md`)
4. "Uploading directly to 3rd party cloud storage provider from frontend may pose security risk of users uploading malicious files" (`ADRs/008.adr-upload-directly-to-document-storage.md`)
5. "Building or managing an identity service is expensive and adds the overhead of security and compliance." (`ADRs/009.adr-idp.md`)
6. "This trade-off may be acceptable as the system is not dealing with mission critical information" (`quanta/npo-candidate.md`)
7. "Why should the business invest to build a fortress when it is not sure if anyone would be staying in it or using it." (`other-artifacts/Requirement-analysis.md`, Further Analysis, Green Field Project)
8. "Since the design is pulling data from NPO's API periodically (asynchronously), the data in both systems is not guaranteed to be consistent." (`quanta/npo-integration.md`)
9. "5 nines (99.999% - 5.2 minutes of downtime per year) is unreasonable and 4 nines would also be an overkill" (`README.md`, Availability)

## 10. Etiquetas presentes (para comparar entre repos)

monolito-modular, microservicios, event-driven, serverless, BFF, API-gateway, streaming, cache, escalabilidad, disponibilidad-HA, resiliencia-fallos, rendimiento-latencia, seguridad, privacidad-GDPR, observabilidad, time-series, fuente-unica-de-verdad, costo, testabilidad, evolutividad, deployability, ADR, event-storming, supuestos-explicitos, riesgos-explicitos, tradeoffs-explicitos, glosario, cloud-gestionada, contenedores, reglas-deterministas, otro: quantum-arquitectonico, otro: estilo-por-quantum, otro: GraphQL-y-REST, otro: fachada-sobre-proveedor, otro: sidecar, otro: feature-toggles, otro: consistencia-eventual, otro: integracion-por-pull, otro: microkernel, otro: PrOACT, otro: roadmap-por-fases, otro: design-thinking, otro: twelve-factor
