# Dossier D4 · R4: decidir dónde vive cada dato sensible, cuánto se guarda y quién puede leerlo, como parte de la estructura

Verdades: T4a (dónde vive cada dato sensible y cuánto se guarda) y T4b (la seguridad es parte de la estructura).
Todo se comprobó contra los archivos originales en `C:\Users\felix\dev\katarch-corpus\<Repo>-src\`. Las fichas se usaron solo como índice.
Marcas: [DATO] lo que el repo dice, [DEDUCCIÓN] lo que se infiere, [HUECO] lo que no dice.

## 0. Resumen del veredicto

- T4a se sostiene, con una formulación más estrecha que la del mapa (ver sección 1). Tiene al menos cuatro repos con ADR o documento de diseño que la sostienen con mecanismo concreto: Team 7 (ADR-4), Archangels (ADR-005), Five Nines (ADR-0017), Pragmatic (ADR-009/010). BluzBrothers, Data Alchemists y ZAItects la sostienen solo en parte.
- T4b se sostiene, también más estrecha. Los casos con mecanismo son Team 7 (ADR-1, 4, 12), Pragmatic (ADR-009, 010, 015), Archangels (ADR-017, 018, 019), ArchColider (ADR-006, en estado Proposed) y ConnectedAI (una línea de verificación de pertenencia del pedido). "Zero trust" como práctica con mecanismo aparece en un solo ADR (ArchColider ADR-006, Proposed, sin detalle de mecanismo) y como advertencia en Archangels. BluzBrothers NO sostiene T4b.
- Pegasuz NO sostiene T4a: contradice su propia regla de "no guardar PII". Se puede usar como contraejemplo (sección 4).
- Ningún repo midió ni operó nada: son diseños en papel. Las cifras de retención son decisiones, no resultados.
- Hallazgo importante: dentro de Five Nines la retención de fotos aparece como 90 días en cuatro documentos y como 180 días en el ADR que la define (sección 2 y sección 5).

---

## 1. Las verdades, reformuladas

### T4a · lo que de verdad sostiene la evidencia
Un dato sensible se trata como una decisión de diseño con cuatro preguntas: ¿en qué parte del sistema vive?, ¿quién es el único que lo guarda?, ¿cuánto tiempo se conserva? y ¿cómo se borra o se oculta cuando ya no hace falta? Los equipos responden de cuatro maneras distintas, y cada una cuesta algo:

1. **Guardarlo en un solo lugar y dejar en los demás una versión reducida** (Team 7: tarjeta completa solo en el componente de facturación, los últimos 4 dígitos en el resto).
2. **Ponerle fecha de vencimiento por nivel** (Five Nines: originales 180 días, copias de trabajo 90, conjuntos de entrenamiento anonimizados mientras hagan falta; BluzBrothers: 24 horas).
3. **Diseñar el borrado desde el principio** (Archangels: una clave de cifrado por usuario guardada aparte; borrar la clave equivale a borrar los datos; Five Nines: índice por cliente para borrar en todas las copias).
4. **Que lo guarde un tercero** (Archangels: un producto de bóveda para datos médicos; Data Alchemists: contraseñas en manos de Google/Apple/Microsoft; ArchColider: el cobro lo hace un proveedor de pagos).

Lo que NO se sostiene: que "anonimizar" o "no guardar PII" se cumpla solo por decirlo. Pegasuz lo dice y su propio diseño lo contradice; Pragmatic declara que la verificación de su anonimización solo la pueden hacer personas u otro LLM (ADR-025).

### T4b · lo que de verdad sostiene la evidencia
La seguridad cambia la forma del sistema: se decide qué componentes existen, en qué zona viven, quién puede hablar con quién y qué puede leer cada uno. La protección se pone en más de una capa porque los propios equipos admiten que la capa de la puerta (el login) puede saltarse. Cuatro formas concretas aparecen en los ADR:

1. **Aislar el componente con el dato más delicado** en su propia zona de red y su propio gateway (Team 7).
2. **Quitarle a un componente el permiso de leer** lo que no necesita, con permisos de base de datos y no solo con una regla escrita (Pragmatic ADR-010 y ADR-015).
3. **No confiar en que la red interna es segura**: cada llamada interna lleva identidad y permisos (ArchColider ADR-006; la misma advertencia en Archangels ADR-018 y 019).
4. **Verificar dentro de la herramienta** que el recurso pedido pertenece al usuario autenticado (ConnectedAI, tool de pedidos).

Matiz: "zero trust" y "acceso mínimo" son la etiqueta de los equipos. El curso debe enseñar el mecanismo (cada llamada con credenciales; cada componente con permisos mínimos), no la etiqueta como si fuera un estándar establecido.

---

## 2. Verificación por repo

### Tabla T4a (dónde vive el dato y cuánto se guarda)

| Repo | ¿La sostiene? | Evidencia (archivo + cita corta) | Detalle concreto |
|---|---|---|---|
| Team 7 | **Sí** (mecanismo claro) | Team-7: `ADR/ADR-4-extract-billing-quanta.md`: "It is enough to display the last 4 digits of the credit card number" | El número completo, vencimiento y CVC2 viven solo en el componente de facturación (billing quantum). El componente de clientes guarda los últimos 4 dígitos. Motivo declarado: reducir el alcance de la auditoría PCI. Todos los ADR están en estado Proposed. |
| Archangels | **Sí** (mecanismo claro) | Archangels: `4.ADRs/005-use-crypto-shredding.md`: "Therefore to delete all records we can simply remove the key." | Una clave por usuario, en un almacén de claves separado. Se borra la clave y los datos quedan inutilizables cuando también se eliminan las copias de respaldo. ADR-010 agrega un producto de bóveda (Skyflow, "we suggest considering") para los datos médicos. |
| Five Nines | **Sí** (la mejor con cifras) | Five-Nines: `adrs/ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md`: "Default: 180 days" | Retención por niveles, desenfoque automático de caras y matrículas, cifrado con claves del cliente (CMEK), borrado indexado por cliente. Contradicción interna con otros documentos (ver abajo). |
| BluzBrothers | **Parcial** | BluzBrothers: `ADR/ADR-004-data-retention-policy.md`: "mandates the deletion of data after a 24-hour period" | El plazo de 24 h ya es un requisito del cliente (`Business/Requirements.md`: "record and store the past 24 hours"). El ADR agrega la justificación de privacidad, rendimiento y costo, sin cifras. Los 4 documentos del repo no dicen igual qué pasa a las 24 h (ver abajo). |
| Pragmatic | **Sí** (por minimización, no por plazo) | Pragmatic: `ADR/ADR-010-create-features-from-story-not-resumes.md`: "Resumes are only persisted in the Job candidate service" | El currículum solo vive en un servicio; el resto del sistema trabaja con la "story" anonimizada. No define plazo de conservación; el único borrado es el requisito R24 (el candidato puede borrar su currículum). |
| Data Alchemists | **Parcial** | Data-Alchemists: `functional_viewpoint/README.md`: "Our system will not store user/password information" | No guarda contraseñas (las delegan a proveedores de identidad). Los reportes a agencias llevan solo datos agregados. La clave sustituta se justifica con GDPR pero sin explicar cómo ayuda (ver [HUECO] abajo). No hay ADR de datos personales: la evidencia está en los documentos de vistas. |
| ZAItects | **Parcial** | ZAItects: `ADRs/007-adr-llm-deployment.md`: "Sensitive candidate information, such as anonymized personal details, will be processed on-premises to maintain privacy" | Decide dónde se procesa el dato (en local frente a nube) según su sensibilidad. No define qué es "sensible", ni plazos, ni cómo se borra. |
| ArchColider | **Parcial / en tensión** | ArchColider: `3.ViewsAndPerspectives/InformationModels.md`: "kept indefinitely, or based on retention policy that might be 1-2 years" | El pago lo delega en un proveedor (ADR-009). Guarda todos los eventos con event sourcing (ADR-007) sin resolver el borrado. En `2.SolutionBackground/SystemAppoach.md`, sección "Missed topics", el propio equipo lista "Local compliance with user privacy". |
| monArch | **Parcial** (solo README, sin ADR) | MonArch: `Readme.md`, sección Security: "data de-identification mechanisms" | Declara que hacen falta mecanismos de des-identificación; no los diseña. La ubicación del agente se guarda solo en memoria y se borra al vencer la ventana de 15 minutos (`Readme.md`, flujo Location Tracking); el texto lo presenta como rendimiento (ADR06), no como privacidad [DEDUCCIÓN: tiene efecto de retención mínima]. |
| Pegasuz | **No** (contradicción interna) | Pegasuz: `engineering-practices/Data-compliance-security.md`: "Store no PII data in our system and store them entirely in a 3rd party system that is compliant." frente a `other-services/auth-service.md`: "Since this service stores PII, data life cycle needs to follow certain compliance rules." | La regla de no guardar PII convive con un servicio de autenticación y un servicio de candidatos (`quanta/npo-candidate.md`: gestiona registro y perfil) que sí guardan datos personales. `other-artifacts/Requirement-analysis.md` pide "Use just one place where the data can be stored and retrieved" y no hay ADR que lo implemente. |
| ConnectedAI | **No** | ConnectedAI: `4_adrs/004_adr_in_memory_state_session_management.md` | El estado de sesión se guarda en memoria y se pierde al reiniciar; el ADR lo justifica por velocidad, no por privacidad. No define retención ni borrado de conversaciones. |
| CELUS Ceals | **No** | Celus-Ceals: `2.SolutionBackground/1.ArchitecturePrinciples.md` | Solo menciona que contraseñas y tokens de integración se guardan en la plataforma. No hay decisión sobre datos sensibles. |

**Detalles de las contradicciones internas que encontré (fuente directa):**

- **Five Nines, 90 frente a 180 días.** `requirements/3_NFRs.md` (NFR_7): "photos 90 days". `requirements/Appendix A_ Core functionality.md`: "Photos 90 days". `hld/core-func/car-van-rental/2_Container_Diagram.md`: "Retention 90 days (photos)". `hld/core-func/car-van-rental/4_Sequence_Diagram.md` (línea 249): "Photos stored 90 days (ADR-0017: GDPR compliance)", citando el ADR que dice 180. `ADR-0017`: originales 180 días, copias de trabajo 90. `ADR-0020` repite "180-day policy". Además, `ADR-0014` y `ADR-0015` dicen "Photo Retention ADR TBD" (se escribieron antes que el 0017). [DEDUCCIÓN] Los documentos de requisitos y diagramas no se actualizaron cuando se escribió el ADR. Para el curso: no enseñar un número como "el" plazo; enseñar la estructura de niveles y decir qué documento lo fija.
- **Five Nines, otras retenciones.** NFR_7: "telemetry 30d→1y→3y"; `ADR-0022`: eventos crudos "90 days in Pub/Sub, 2 years in BigQuery". No coinciden.
- **BluzBrothers, qué pasa a las 24 horas.** `EventStorming/EventStorming.md` lista dos eventos: "History data archived after 24h" y "History data deleted after 24h". ADR-004 dice borrado y, en las consecuencias negativas, pide "a robust backup and archiving strategy" que no define. El archivo largo plazo del paciente lo cubre el envío de instantáneas (snapshots) a MyMedicalData (`UseCases/US3-snapshot.md`, por HTTPS). [DEDUCCIÓN] MyMedicalData es el sistema que conserva el historial, MonitorMe solo 24 h.
- **BluzBrothers, motivo del plazo.** `Business/Requirements.md`: "MonitorMe does not have to meet any government regulatory requirements (e.g., HIPAA)." Y el ADR-004 invoca "Adhering to privacy laws". [DEDUCCIÓN] La razón de privacidad es del equipo, no del cliente; el requisito sí fija las 24 h.
- **Data Alchemists, clave sustituta y GDPR.** `information_viewpoint/README.md`: "This serves as a surrogate primary key, prioritizing performance and simplifying GDPR compliance procedures." No explica el cómo. [HUECO] Además la entidad Reservation guarda "Tracking Info: Natural key comprising personal details", es decir, datos personales (nombres de pasajeros) siguen en el sistema. La ficha del repo ya advertía que no muestra cumplimiento de GDPR; se confirma. El historial del documento (Revision 4) dice "Rewrite All entity sections with help of chatgpt".
- **Pragmatic, componente de anonimización.** `C4/C3-components-story.md` dice que la anonimización corre "on separate containers" y cita ADR-006, que está "Superseded by ADR-007" (LLM externo). [DEDUCCIÓN] El diagrama C3 describe una opción ya descartada. Las dos descripciones implican cosas distintas para la privacidad: en una el currículum no sale de la infraestructura propia; en la otra se envía a un tercero (`C4/C3-components-job-candidate.md` lo dice para las recomendaciones: "sends the resume data to the external AI Resume Tips System").
- **Pragmatic, ADR-010 está incompleto.** La sección Decision termina con "The story service does" sin terminar. La decisión central sí está en la primera viñeta.

### Tabla T4b (la seguridad es parte de la estructura)

| Repo | ¿La sostiene? | Evidencia (archivo + cita corta) | Detalle concreto |
|---|---|---|---|
| Team 7 | **Sí** (mecanismo claro) | Team-7: `ADR/ADR-1-service-based.md`: "This is an isolated security zone with no incoming requests from the other domains." | Cuatro dominios con distintas necesidades; facturación en zona de red aislada. ADR-4: facturación detrás de red virtual y VPN para administradores. ADR-12: gateways separados por dominio, con la regla "API Gateways should contain no domain logic". Costo declarado: complejidad y gateways como punto único de falla. |
| Pragmatic | **Sí**, con concesiones declaradas | Pragmatic: `ADR/ADR-015-schema-ownership-and-permissions.md`: "This should be enforced with DB permissions." | ADR-010 (matching sin acceso a currículums), ADR-009 (servicio de story propio, fortalece "Security: stronger isolation of job candidate service"), ADR-015 (un solo servicio escribe cada objeto). Pero ADR-017 y ADR-019 debilitan la seguridad a propósito (ver sección 4). |
| Archangels | **Sí** | Archangels: `4.ADRs/019-use-auth-for-human-system-integration.md`: "Zero-trust and further authorisation checks should be implemented also." | Autenticación y autorización en la puerta para humanos (ADR-019) y para sistemas externos (ADR-018), con el riesgo declarado de que alguien entre por otro camino. "Authorisation" se sube a característica principal (`1.ProblemBackground/ArchitectureAnalysis.md`). ADR-017 separa el dominio médico en admin y cliente "from an authorisation perspective". |
| ArchColider | **Sí**, pero ADR en Proposed y sin detalle | ArchColider: `4.ADRs/006 Zero trust architecture.md`: "Internal calls from modules should contain security info with auth and claims info from the very beginning." | Aplica zero trust dentro de un monolito modular para poder extraer módulos como servicios más adelante. `3.ViewsAndPerspectives/infrastructure/InfrastructureAndNetworking.md`: "We will not allow any traffic from the internet directly on our private subnets." |
| ConnectedAI | **Parcial** (una línea) | ConnectedAI: `3_architecture_and_design/c3-component-order-processing-agent.md`: "A check is applied to ensure the order belongs to the given customer." | La herramienta de detalle de pedido (Order Details Tool) verifica pertenencia. ADR-008: invitados "limited to specific API endpoints". No dice de dónde sale el customer ID que se compara [HUECO] (ver sección 5). |
| ZAItects | **Parcial** | ZAItects: `ADRs/017-adr-llm-governance.md`: "Implement RBAC and ACLs to restrict retrieval based on user roles." | ADR-017: control de acceso sobre qué contenido puede recuperar el LLM. ADR-016: "layered security approach" sobre la lista OWASP de riesgos de LLM (genérica, copiada de un estándar, sin vincular a componentes del sistema). |
| Five Nines | **Parcial** | Five-Nines: `adrs/ADR-0016 - Human-in-the-Loop Workflow Design for AI Decisions.md`: "Enforce least-privilege IAM, EU-only storage, and minimal retention; blur PII when not required." | ADR-0017 pide "Least-privilege service accounts per workload" y claves por cubeta "for blast-radius reduction". `hld/core-func/hld-data-and-analytics.md`: RBAC/ABAC y seguridad por fila. |
| Data Alchemists | **Parcial** | Data-Alchemists: `information_viewpoint/README.md`: "Its sole purpose is for authorization." (entidad Trip Access Control List) | Control de acceso solo a nivel de viaje, con roles que van de "full read access" a "trip dates and locations". ADR-2: capa de API única que simplifica "attaching roles and permissions to specific endpoints". |
| monArch | **Parcial** (README, sin ADR) | MonArch: `Readme.md`, sección Security: "zero-trust verification policies" | Pide políticas para acceso del equipo de desarrollo y administración. Una API aparte para usuarios administrativos, con identidad y control de acceso distintos (`Readme.md`, nota bajo Figure 8). No hay mecanismo. |
| BluzBrothers | **No** (casi) | BluzBrothers: `README.md`, tabla "Postponed decisions": "Authentication and Authorization" pospuesto | Seguridad entre las 7 características, pero marcada solo en módulos individuales (`ArchitectureCharacteristics/Characteristics.md`); autenticación y VPN quedan postergadas. Única decisión estructural: ADR-017 (datos de pacientes en un solo lugar). |
| CELUS Ceals | **Parcial / débil** | Celus-Ceals: `3.ARDs/009.SimpleSecurityOnCameraAPI.md`: "Generate an unique token per camera, that must be set on each camera as a hard-coded value." | Seguridad "básica" declarada (ADR 009); autenticación y autorización fusionadas (ADR 008) por simplicidad. Principio: "Users will have access only to their resources". |
| Pegasuz | **Parcial** | Pegasuz: `ADRs/009.adr-idp.md` | Identidad delegada a proveedor gestionado para no cargar con seguridad ni cumplimiento; mitigación: una fachada propia. No hay decisión sobre qué puede leer cada servicio. |

---

## 3. Los mejores ejemplos para enseñar

### T4a

#### Ejemplo 1 · Team 7, "la tarjeta completa vive en un solo lugar" (ADR-4, ADR-1, ADR-5)

- **El caso.** Sysops Squad: una empresa de soporte técnico a domicilio que guarda, ella misma, las tarjetas de crédito de sus clientes. Los clientes registran su plan de soporte, y la empresa los factura cada mes.
- **La situación que obliga a decidir.** [DATO] El supuesto ASM-4 (`README.md`) dice: "The company stores customer credit card information locally and does not interoperate with a 3-party authority". La seguridad (QA-5) pide cumplir PCI. El ADR-4 explica el problema: "The bigger part of the system deals with credit card data, the more onerous the procedure is." Pero hay tres tipos de usuario que necesitan algo de la facturación: clientes (alta y edición de su tarjeta), administradores (resolver problemas de cobro) y gerentes (reportes financieros).
- **Qué decidió.**
  1. [DATO] Sacar la facturación a un componente propio (billing quantum) y dejarlo como zona aislada (ADR-1).
  2. [DATO] El cliente no necesita ver la tarjeta completa para editarla: "It is enough to display the last 4 digits of the credit card number". Si quiere cambiarla, borra la tarjeta y registra otra.
  3. [DATO] Cuando el cliente teclea la tarjeta en la interfaz, el dato se pasa de inmediato al componente de facturación y en el de clientes solo queda el final de 4 dígitos. Se envía por una cola de mensajes asíncrona para que el cliente no espere el procesamiento (ADR-4 y ADR-5).
  4. [DATO] Los administradores entran por una interfaz de facturación propia, y el componente puede esconderse detrás de una red virtual con VPN.
  5. [DATO] Para los gerentes: o usan la misma interfaz, o los datos necesarios para reportes se replican a un componente de reportes (por tabla o con una carga ETL).
- **Alternativas.** [DATO] ADR-4 solo plantea alternativas para los gerentes (usar la interfaz de facturación o replicar). Sobre guardar la tarjeta frente a delegarla a un procesador externo, el supuesto ASM-4 la da por resuelta y no hay ADR que la discuta [HUECO].
- **Costo admitido.** [DATO] ADR-4, consecuencias: "Adds complexity." y "We need to ensure that passing of credit card data between quanta is secure." ADR-6 agrega una base de clientes separada y su costo: "We need to keep in sync customer billing information". El README (sección de riesgos de seguridad) reconoce: "There is a risk that admin staff can get access to the customer credit card data." y lo resuelve con la separación.
- **Qué enseña.** Que el lugar donde vive un dato se decide por la pregunta "¿quién necesita verlo completo?", y que casi nadie lo necesita. También que aislar el dato más delicado reduce el alcance de una auditoría (el equipo lo plantea como razón de negocio, no solo técnica). Es el ejemplo más limpio de "una versión reducida en todas partes y la completa en un solo lugar".
- **Por qué este y no otro.** Es el único donde el dato sensible tiene un destino claro, un consumidor por rol y un camino de entrada descrito. Hay una advertencia: todos los ADR de Team 7 están en Proposed (ADR-8 está Obsoleto), así que se presentan como propuesta, no como decisión confirmada.
- **Fuentes.** Team-7: `README.md` (QA-5, ASM-4, sección de riesgos de seguridad, flujo UC-2); `ADR/ADR-1-service-based.md`; `ADR/ADR-4-extract-billing-quanta.md`; `ADR/ADR-5-extract-customer-quantum.md`; `ADR/ADR-6-separate-customer-db.md`.

#### Ejemplo 2 · Archangels, "borrar es perder una clave" (ADR-005 y ADR-010)

- **El caso.** Farmacy Family: una comunidad de salud y nutrición que guarda perfiles personales y resultados médicos de sus clientes y los comparte con clínicas (con permiso del cliente).
- **La situación.** [DATO] `ADR-005`, contexto: "users may want all of their data removed from the system, which can prove difficult in distributed systems, especially where data backups are involved." [DEDUCCIÓN] Los datos terminan repartidos en varios almacenes (un almacén general aún sin decidir, un grafo para analítica en ADR-008, almacenamiento de archivos en ADR-009) y en copias de respaldo.
- **Qué decidió.** [DATO] "Hold a separate crypto key store that holds a key per user that is used to encrypt that particular users data." La clave nunca vive junto a los datos cifrados, de modo que "to delete all records we can simply remove the key". Los datos quedan irrecuperables cuando se eliminan también las copias de la clave. Fecha: 2021-10-21. Estado: Accepted. Complementa ADR-010 (Confirmed, 2021-10-29): usar un producto estándar de bóveda de datos (se sugiere Skyflow) para los registros médicos, "to avoid reinventing the wheel and the possibility of making mistakes" (`1.ProblemBackground/RAID.md`).
- **Alternativas.** [HUECO] El ADR-005 no lista alternativas. El ADR-010 sí contrasta, solo en la consecuencia, que evaluar varios proveedores puede llevar tiempo.
- **Costo admitido.** [DATO] Negativo: "Need to introduce a short-lived cache of unecrypted data for querying so that the system can remain performant" (el error de ortografía es del original). Riesgo: "If a key is leaked it becomes effectively impossible to delete a users data via crypto shredding".
- **Qué enseña.** Que borrar datos distribuidos y respaldados se resuelve de otra manera: en vez de perseguir cada copia, se cifra por usuario y se destruye la clave. Y que ese diseño tiene su precio: el cifrado por usuario obliga a mantener una caché temporal de datos en claro para poder consultarlos, y una clave filtrada anula la garantía de borrado.
- **Por qué este y no otro.** Ningún otro repo diseña el borrado por usuario con un mecanismo. Five Nines lo resuelve con un índice y automatizaciones, que es el camino contrario (perseguir las copias).
- **Límites propios del ejemplo.** [DEDUCCIÓN] El repo no explica cómo conviven el borrado por clave con el almacén de grafo de analítica (ADR-008), donde las pruebas médicas se vinculan al cliente (`2.SolutionBackground/DataStore.md`). Tampoco reconcilia el almacén de claves propio (ADR-005) con la bóveda de terceros (ADR-010). Tampoco existe ADR-007 en la carpeta.
- **Fuentes.** Archangels: `4.ADRs/005-use-crypto-shredding.md`; `4.ADRs/010-We-will-use-a-secure-data-solution.md`; `1.ProblemBackground/RAID.md`; `1.ProblemBackground/ConstraintsAndAssumptions.md` (restricción 4: "Medical data is highly sensitive and so the system must implement high security around this data as a minimum.").

#### Ejemplo 3 · Five Nines, retención por niveles (ADR-0017)

- **El caso.** MobilityCorp: un servicio europeo de alquiler de autos, furgonetas, scooters y bicicletas. Los clientes y el equipo de operaciones fotografían los vehículos al devolverlos, para verificar limpieza y daños; esas fotos alimentan modelos de visión por computadora.
- **La situación.** [DATO] Las fotos contienen datos personales ("license plates, potentially people, locations") y caen bajo GDPR. El ADR enumera cuatro necesidades que tiran en direcciones distintas: cumplimiento legal (minimización, límite de conservación, derecho al borrado), disputas y fraude, entrenamiento de IA y costo de almacenamiento.
- **Qué decidió.** [DATO] Una política en tres niveles con separación estricta:
  1. **Originales** (clientes y equipo): 180 días por defecto; "Up to 2 years only when linked to an active dispute, chargeback, insurance claim, or legal request" (con identificador de caso y plazo).
  2. **Copias de trabajo** (miniaturas, copias anotadas): 90 días; se borran cuando se borra el original.
  3. **Conjuntos de entrenamiento y evaluación anonimizados**: se conservan mientras los modelos estén activos y se revisan cada año, sin enlaces a metadatos identificables.
  Medidas que acompañan: almacenamiento solo en la UE, cifrado con claves gestionadas por el cliente (CMEK) y rotadas cada año, desenfoque automático de caras y matrículas "when not required to be visible", borrado de datos EXIF salvo hora y GPS aproximado, ciclo de vida automático (a almacenamiento más barato a los 30 y 90 días, borrado a los 180), bloqueos legales mientras haya una disputa, índice de fotos "by rental session, customer ID, and vehicle ID" para borrar de forma dirigida en originales y copias, y registros de auditoría con retención de 400 días.
- **Alternativas declaradas y por qué se descartaron.** [DATO] (1) Guardar todo indefinidamente en almacenamiento barato: "Rejected: Violates GDPR storage limitation and increases breach impact and cost". (2) Borrar justo tras la verificación: "Rejected: Insufficient for disputes, chargebacks, insurance, and quality audits". (3) Un solo bucket sin separación de funciones: se rechaza porque dificulta el menor privilegio y agranda el radio de daño.
- **Costo admitido.** [DATO] Tabla de riesgos: "Deletion at 180 days may hinder late disputes" (mitigación: plazos de disputa claros en los términos y condiciones, bloqueos legales); la anonimización "may remove useful signals" para la IA; y la complejidad de borrar a la vez en originales, copias y conjuntos de entrenamiento ("DSAR complexity").
- **Qué enseña.** Que "cuánto se guarda" no es una cifra sino una tabla de niveles, cada uno con un propósito, un plazo y una razón; que el plazo lo fija la disputa más tardía que el negocio quiere poder resolver; y que el mismo dato (la foto) se transforma al pasar de nivel (se desenfoca, se anonimiza). Es el ejemplo que mejor muestra la tensión entre dos obligaciones legales y de negocio opuestas (conservar para disputas, borrar por privacidad) resueltas con una estructura y no con una frase.
- **Por qué este y no otro.** Es el único ADR del corpus con plazos por nivel, alternativas rechazadas con motivo, bloqueo legal y costos. BluzBrothers tiene un solo plazo y sin alternativas.
- **Advertencia obligatoria.** [DATO] Los documentos de requisitos y diagramas del mismo repo dicen 90 días para las fotos (sección 2). Al contarlo en el curso, citar los 180 días como lo que fija el ADR-0017 y no presentar el número como un hecho del negocio.
- **Fuentes.** Five-Nines: `adrs/ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md`; `adrs/ADR-0015 - Training Data Strategy and Bias Mitigation for Vision Models.md` (desidentificación, consentimiento); `adrs/ADR-0020 - Damage Detection Model Architecture.md`; `requirements/3_NFRs.md` (NFR_7); `hld/core-func/car-van-rental/4_Sequence_Diagram.md`.

#### Ejemplo 4 · BluzBrothers, 24 horas y quién conserva el historial (ADR-004, ADR-017)

- **El caso.** MonitorMe: un sistema hospitalario que lee ocho signos vitales de cada paciente y los muestra en la central de enfermería, con alertas.
- **La situación.** [DATO] El requisito del cliente dice que el sistema debe "record and store the past 24 hours of all vital sign readings" y que los profesionales puedan revisarlos. [DATO] Las cifras de carga (`FitnessFunctions/Sizing.md`): hasta 500 pacientes y 1 kB por señal dan 2,1 MB/s en promedio y 4 MB/s en pico. [DEDUCCIÓN] Por aritmética mía (no está en el repo), 2,1 MB/s durante 24 horas son unos 181 GB.
- **Qué decidió.** [DATO] ADR-004 (2024-02-17, Accepted): una política de retención en la propia base de datos de series temporales que borra los datos a las 24 horas. Tres razones: "Compliance and Privacy", rendimiento (menos datos acumulados) y costo. ADR-017 (2024-02-21): los datos del paciente "will not be transmitted throughout the entire ecosystem"; el personal de enfermería los obtiene del sistema de registro de pacientes y sensores, para centralizar la información en un lugar.
- **Alternativas.** [HUECO] Ninguno de los dos ADR lista alternativas rechazadas.
- **Costo admitido.** [DATO] ADR-004: "Risk of losing potentially valuable data that could contribute to future analysis or insights if the retention period is too short." y la necesidad de una estrategia de respaldo y archivo que no se define. ADR-017: "The decision necessitates robust security measures for the centralized patient registration system." y "Limited accessibility to patient data may pose challenges".
- **Qué enseña.** Que la retención corta es una forma de seguridad: lo que ya no existe no se puede filtrar. Y que "quién conserva qué" puede repartirse entre sistemas: MonitorMe conserva 24 horas y el expediente permanente vive en MyMedicalData, al que el personal envía instantáneas. También enseña a separar lo que dice el cliente (las 24 h son requisito) de lo que agrega el equipo (la justificación de privacidad).
- **Por qué este y no otro.** Es el caso más simple y entendible para el plazo corto, con un requisito claro detrás. Se usa mejor como segundo ejemplo, junto a Five Nines, para mostrar los dos extremos (24 horas y varios niveles hasta 2 años).
- **Límites.** Los dos ADR no tienen alternativas, `EventStorming.md` describe a la vez "archived" y "deleted" a las 24 h, y el repo admite que no necesita cumplir regulación estatal (HIPAA).
- **Fuentes.** BluzBrothers: `ADR/ADR-004-data-retention-policy.md`; `ADR/ADR-017-centralized-patient-data-security.md`; `Business/Requirements.md`; `EventStorming/EventStorming.md`; `UseCases/US3-snapshot.md`; `FitnessFunctions/Sizing.md`.

**Ejemplos secundarios de T4a (cortos, si hace falta un contraste breve):**
- Data Alchemists: los reportes a agencias de viaje solo llevan datos agregados; la clave primaria del reporte es "Time period / Agency / User Geo Region / Reservation Geo Region", "designed to anonymize personal information" (`information_viewpoint/README.md`). [HUECO] No fijan un tamaño mínimo de grupo, así que en una región pequeña un grupo puede ser de una persona. Las contraseñas las guardan Google, Apple o Microsoft (`functional_viewpoint/README.md`, `operational_viewpoint/README.md`).
- Pragmatic: la "story" como versión del currículum sin los factores que permiten discriminar (raza, sexo, género, orientación sexual, salud, atractivo, según el prompt de `Requirements/Research/token-estimation.md`). El objetivo declarado es evitar sesgo, no solo privacidad (`Requirements/glossary.md`: "excluding information that could lead to unfair discrimination").

### T4b

#### Ejemplo 1 · Team 7, zonas, gateways y quién habla con quién (ADR-1, ADR-12)

- **El caso.** El mismo de Team 7 (Sysops Squad).
- **La situación.** [DATO] ADR-12, contexto: ya hay 8 servicios extraídos y surge la pregunta "how do we handle authentication and authorization? How do we ensure that front-ends access only services they are permitted to?". Repetir esa lógica en cada servicio duplicaría código.
- **Qué decidió.** [DATO] Una puerta de entrada (API Gateway) por dominio, porque cada dominio pide características distintas. El primero es el de facturación, "the highest security risk": "The least thing we want that either admin staff or customer users gain access to somebody credit card data." Segundo, la API de administración, porque "any intrusion here will make a high impact on the whole business". Los de clientes y soporte se separan por disponibilidad y escalabilidad. Los gateways "should care exceptionally about access control, security checks, and simple message routing", sin lógica de dominio; los servicios de dominios distintos solo hablan a través de los gateways. Antes, ADR-1 ya había separado cuatro dominios por necesidades distintas: el de clientes en una zona de red "where only incoming requests are allowed", el de facturación en una zona sin solicitudes entrantes desde otros dominios.
- **Alternativas.** [DATO] Implementar autenticación y autorización en cada servicio (descartado por duplicación de código). En ADR-12 la alternativa de gateway es solo nombrada (hay opciones de código abierto, propietarias o en la nube).
- **Costo admitido.** [DATO] ADR-12: "Again, this adds complexity" y "API Gateways also require additional development cost and future maintenance"; además un gateway mal balanceado "may become a bottleneck or a single point of failure". En el README de Team 7: un único gateway es riesgo de disponibilidad.
- **Qué enseña.** Que la seguridad decide cuántos componentes hay y dónde está cada uno: el corte del sistema sigue también la sensibilidad del dato, no solo el negocio. Y que cada capa (zona de red, gateway, componente) añade costo que el equipo escribe.
- **Por qué este y no otro.** Es el único repo donde la seguridad es la razón explícita de una de las separaciones del sistema, con la zona de red como parte del diagrama.
- **Fuentes.** Team-7: `ADR/ADR-1-service-based.md`; `ADR/ADR-12-gateways.md`; `ADR/ADR-4-extract-billing-quanta.md`; `README.md` (sección Security de riesgos de la arquitectura de transición).

#### Ejemplo 2 · Pragmatic, el matching no puede leer currículums (ADR-009, ADR-010, ADR-015) y lo que el equipo cedió (ADR-017, ADR-019)

- **El caso.** ClearView: una plataforma sin fines de lucro que empareja candidatos con puestos de trabajo usando IA sobre currículums anonimizados, para reducir la discriminación. [DATO] La seguridad es la primera característica principal: "Essential, as the product’s USP is resume anonymization" (`ArchitectureCharacteristics/Characteristics.md`).
- **La situación.** [DATO] El requisito Q5 exige que la IA, al emparejar o evaluar, "must only consider its story (anonymized representation)". El ADR-010 observa que ese principio "can be enforced also through architecture by limiting the matching algorithms access to resumes".
- **Qué decidió.**
  1. [DATO] ADR-010: "Resumes are only persisted in the Job candidate service, and access requires special privileges which are not given to the matching service."
  2. [DATO] ADR-009: la creación de la story es un servicio propio, porque "Matching Service does not require the resume, and Job candidate service does not require the story". Además de evitar acoplamiento, fortalece "Security: stronger isolation of job candidate service, related to ADR-010".
  3. [DATO] ADR-014 permite que varios servicios compartan una base de datos, y su consecuencia admite que "May lead to chaotic coupling". ADR-015 lo acota: cada objeto tiene un solo servicio con derecho de escritura, y "This should be enforced with DB permissions."
  4. [DATO] El empleador solo recibe el currículum completo al "desbloquear" una coincidencia (requisito R15), cosa que se factura (R16).
- **Alternativas.** [DATO] ADR-009 evalúa tres lugares para crear la story (en el servicio de candidato, en el de matching, o aparte). Para el emparejamiento, `ADR-011` descarta dejar que la IA compare directamente currículums y puestos "due to bias concerns and it contradicts ADR-010".
- **Costo admitido.** [DATO] ADR-009: otro servicio por implementar; debilita Simplicity y Cost. ADR-010: debilita Adaptability. ADR-015: esfuerzo de documentar propietarios y configurar permisos.
- **Lo que el equipo cedió a sabiendas (importante para el curso).**
  - [DATO] ADR-019 (datos demográficos hacia Analytics): las opciones eran leer directo de la base del candidato ("But direct access to sensitive information"), que el candidato envíe los datos, o un tópico asíncrono. Decidió: "Analytics may read directly from job candidate DB". Fortalece Simplicity, Maintainability, Performance. Debilita "Security (since it can access and holds most data)".
  - [DATO] ADR-017: el servicio de Analytics "has access to all the data needed", y lo registra como debilidad: "Security (access to all data containers while also maintaining an external connection)".
- **Qué enseña.** Que se puede imponer una regla de privacidad (el emparejamiento no ve identidades) con permisos y con el corte de servicios, no solo con una norma escrita; y que cada concesión se anota con la característica que se debilita. Muestra que "seguridad primero" no significa "seguridad en todas partes".
- **Por qué este y no otro.** Es el caso que une los ADR de estructura (009, 010, 015) con los ADR que ceden seguridad (017, 019) dentro del mismo sistema. Eso permite enseñar el criterio, no una receta.
- **Límites.** [HUECO] ADR-010 tiene la decisión incompleta. [DATO] ADR-025 admite: "anonymization can only be verified by humans or by leveraging other LLMs (which adds complexity)". Y el currículum se envía a un LLM externo para crear la story (ADR-007); la entrevista con el experto en IA (`Requirements/Research/interview-ai-expert.md`) anota: "Due to regulatory reasons, Azure, for example, stores prompts." El ADR-007 lista como debilidad "Feasibility (Need to check privacy regulations)".
- **Fuentes.** Pragmatic: `ADR/ADR-009-creation-of-story-as-own-microservice.md`; `ADR/ADR-010-create-features-from-story-not-resumes.md`; `ADR/ADR-014-multiple-services-on-same-database.md`; `ADR/ADR-015-schema-ownership-and-permissions.md`; `ADR/ADR-017-analytics-and-reporting-as-own-service.md`; `ADR/ADR-019-data-transmission-for-analytics.md`; `ADR/ADR-007-use-of-external-llms.md`; `ADR/ADR-025-ai-test-concept.md`; `Requirements/requirements-and-assumptions.md` (Q5, R15, R24, A3).

#### Ejemplo 3 · "No confiar en la puerta": ArchColider ADR-006 con la advertencia de Archangels (ADR-018, ADR-019)

- **El caso.** ArchColider (Farmacy Food): refrigeradores inteligentes con comida preparada; el sistema de pedidos es un monolito modular que más adelante se partirá en servicios. Archangels (Farmacy Family): comunidad con datos médicos.
- **La situación ArchColider.** [DATO] ADR-006 (2020-10-30, **Proposed**), contexto: el sistema de pedidos se comunica con sistemas de arriba y de abajo en la nube y "we can't rely on an assumption that requests from the same subnetwork are safe". Los módulos del monolito se extraerán como servicios, y "We have to secure such calls at an early stage to make it easier to migrate from module to service."
- **Qué decidió ArchColider.** "Internal calls from modules should contain security info with auth and claims info from the very beginning." Referencia: la técnica de Thoughtworks Radar.
- **Costo admitido.** [DATO] "Applying such an approach will add complexity to communication between modules within the same domain. This may not be obvious to many developers." Requiere involucrar un servicio de identidad. [HUECO] No dice cómo (qué token, qué claims).
- **La situación Archangels.** [DATO] ADR-018 y ADR-019 exigen autenticación y autorización para sistemas externos y humanos. Ambos registran el mismo riesgo: "If access to the system was gained by another method the attacker would skip the Interface authentication and authorisation." La respuesta es una sola línea: "Zero-trust and further authorisation checks should be implemented also." `2.SolutionBackground/Security.md` lo vincula con controles de red: "Within Farmacy Family we can use these controls to create a Zero Trust infrastructure to help protect against intruders who may manage to circumnavigate authentication controls." [HUECO] El detalle queda como opciones de servicios de AWS, sin decisión.
- **Qué enseña.** Que la autenticación en la entrada no basta, porque la entrada puede saltarse; que se protege dentro del sistema con credenciales en cada llamada, y que es más barato hacerlo antes de partir el monolito. ArchColider da el momento (decidirlo antes de extraer los módulos) y Archangels el motivo (el atacante que entra por otro camino).
- **Por qué este y no otro.** Es el único ADR del corpus titulado zero trust. Es honesto presentarlo como propuesta y con poco detalle.
- **Fuentes.** ArchColider: `4.ADRs/006 Zero trust architecture.md`; `3.ViewsAndPerspectives/infrastructure/InfrastructureAndNetworking.md`. Archangels: `4.ADRs/018-use-interface-for-system-system-integration.md`; `4.ADRs/019-use-auth-for-human-system-integration.md`; `2.SolutionBackground/Security.md`; `4.ADRs/017-We-will-split-medical-domain.md`.

#### Ejemplo 4 · ConnectedAI, la herramienta verifica que el pedido es del cliente

- **El caso.** ShopWise: una tienda en línea con un asistente de IA que atiende consultas de productos, pedidos y devoluciones. Un agente de pedidos usa herramientas (tools) que consultan la base de datos.
- **La situación.** [DATO] Los clientes pueden entrar con usuario o como invitados (ADR-008). Un cliente puede preguntar por "my order with Order ID X"; la herramienta de detalle recibe un identificador de pedido, no un cliente.
- **Qué decidió.** [DATO] En la herramienta de detalle de pedido, "A check is applied to ensure the order belongs to the given customer." La de historial devuelve "the entire order history for the given customer". Los invitados tienen "limited to specific API endpoints" (ADR-008). El gateway valida las sesiones (ADR-003, `architecture.md`).
- **Alternativas.** [DATO] ADR-008 compara usuario y contraseña con JWT (elegida), OAuth 2.0, proveedores externos e invitado, pero la verificación de pertenencia no tiene ADR; está en una línea del diagrama C3.
- **Costo admitido.** [DATO] ADR-008: "Requires secure key management to prevent JWT token misuse." y "Guest access introduces additional responsibility for monitoring and limiting access rights."
- **Qué enseña.** Que el control de acceso también va en la herramienta que toca los datos y no solo en el login: tener un token válido no autoriza a ver cualquier pedido. En un asistente de IA, donde el usuario escribe un identificador de pedido en una frase, esa verificación en el último paso es lo que impide ver el pedido de otro.
- **Por qué este y no otro.** Es el único caso donde la verificación está dentro de la herramienta. Sirve de puente al módulo de IA (R6). Su evidencia es fina: una línea.
- **Límites.** [HUECO] El documento no dice de dónde sale "the given customer" (¿del token firmado o del texto del chat?). Los mensajes de ejemplo incluyen un campo `customerId` en el cuerpo de la petición (`8_code/ai-backend/README.md`), y el caso de prueba "Order Customer Wrong" existe como video pero sin descripción. Un caso de prueba pregunta "Can you list my previous orders? My customer id is X." (`6_test_cases/test-cases.md`). [DEDUCCIÓN] No se puede afirmar que la verificación use la identidad autenticada y no la que escribe el usuario.
- **Fuentes.** ConnectedAI: `3_architecture_and_design/c3-component-order-processing-agent.md`; `4_adrs/008_adr_authentication_and_authorization.md`; `4_adrs/003_adr_custom_api_gateway.md`; `3_architecture_and_design/architecture.md`; `6_test_cases/test-cases.md`; `8_code/ai-backend/README.md`.

---

## 4. Decisiones contrarias

| Tema | Decisión A | Decisión contraria | De qué depende |
|---|---|---|---|
| Quién guarda la tarjeta | Team 7 la guarda y aísla en un componente propio (ASM-4: sin procesador externo) | ArchColider ADR-009 delega el pago a un proveedor ("Use a 3rd party payment provider"); Data Alchemists y Pegasuz delegan identidad (ADR-009 de Pegasuz: "Building or managing an identity service is expensive and adds the overhead of security and compliance") | De si el negocio tiene la obligación o la restricción de guardar el dato. Delegar quita carga de cumplimiento pero deja un riesgo: ArchColider anota "Need to be careful while processing the personal/demographic details" y Pegasuz limita lo que el proveedor ofrece. |
| Dónde corre el modelo con datos personales | ZAItects ADR-007: híbrido, lo sensible en local (y consecuencia admitida: complejidad y costo de operar en local) | Pragmatic ADR-007: LLM externo, con la privacidad como debilidad declarada ("Need to check privacy regulations"); Five Nines ADR-0013: servicio gestionado con residencia en la UE y acuerdos DPA/SCC | De cuánto pesan privacidad frente a costo y velocidad. Pragmatic descarta la opción en local por "Specialized hardware needs to be procured and additional staff needed", ZAItects acepta ese costo a cambio de no exponer datos. |
| Cuánto tiempo se conserva | BluzBrothers: 24 h | Five Nines: 180 días, hasta 2 años con bloqueo legal; ArchColider: eventos "kept indefinitely, or based on retention policy that might be 1-2 years" | Del plazo de la disputa o del servicio que el negocio quiere poder resolver, y del requisito (BluzBrothers lo tiene en el pliego). |
| Abrir el dato a analítica | Pragmatic ADR-010: el matching no lee currículums | Pragmatic ADR-019: Analytics lee directo de la base del candidato (datos demográficos), "Weakened: Security" | De qué se gana: simplicidad y rendimiento. Es el mismo equipo, con una razón declarada. |
| Seguridad pospuesta | Archangels, Team 7, Pragmatic la diseñan | BluzBrothers pospone autenticación y VPN; CELUS Ceals usa un token fijo por cámara y lo llama "basic security" | BluzBrothers: sistema instalado dentro de un hospital, sin regulación exigida por el cliente. CELUS: cámaras sin conexión estable, factibilidad. [DEDUCCIÓN] En ninguno el ADR dice que el aislamiento de red sea la razón. |
| Una sola fuente de datos personales | Pegasuz `Requirement-analysis.md`: "Use just one place where the data can be stored and retrieved." | Pegasuz `auth-service.md` y `npo-candidate.md`: dos servicios guardan datos personales; `Data-compliance-security.md`: "Store no PII data in our system" | **No hay razón válida: es una contradicción entre documentos del mismo equipo.** Sirve de contraejemplo de "una regla de privacidad sin estructura que la cumpla". |
| Borrado | Archangels borra cambiando una clave (ADR-005) | Five Nines borra persiguiendo las copias con un índice; ArchColider no lo resuelve (event sourcing guarda todo) | Del tipo de almacenamiento. [DEDUCCIÓN] El borrado por clave es una respuesta conocida al historial inmutable de eventos, pero ArchColider no la menciona. |

---

## 5. Límites

- **Nada se construyó ni se operó.** Son diseños juzgados por expertos. Ningún repo midió el efecto de su decisión (ni de seguridad ni de costo de almacenamiento). No se puede decir "funciona", solo "así lo decidieron y esto admitieron".
- **Las cifras de retención son decisiones, no resultados.** En Five Nines hay dos cifras para las fotos (90 y 180 días). No se debe presentar ninguna como "el plazo correcto", y las dos son para un servicio europeo de alquiler.
- **GDPR no se verifica.** Los equipos nombran GDPR, PCI o HIPAA; ningún repo muestra una revisión legal. Data Alchemists nombra GDPR sin mecanismo, y BluzBrothers aclara que no necesita regulación estatal. El curso no puede afirmar que un diseño "cumple" nada.
- **Varios de los mejores ejemplos están en Proposed o con huecos.** Todos los ADR de Team 7 son Proposed (y ADR-8 Obsoleto); ArchColider ADR-006 es Proposed; Pragmatic ADR-010 está truncado; ADR-0017 de Five Nines no tiene campo de estado.
- **"Zero trust" no se puede presentar como práctica establecida del corpus.** Un solo ADR lo nombra como decisión (ArchColider ADR-006, sin mecanismo), uno lo exige como complemento (Archangels) y monArch lo nombra como política deseada en su README sin ADR. Solo se puede enseñar la idea (credenciales en cada llamada) y que se propone.
- **Cifrado.** Varios equipos dicen "cifrado en tránsito y en reposo" (Archangels, Five Nines, monArch, Data Alchemists) como línea genérica. Solo Archangels (clave por usuario) y Five Nines (claves por cubeta rotadas anualmente) lo convierten en una decisión con consecuencias.
- **Anonimización no verificada.** Pragmatic reconoce que solo personas u otro LLM pueden verificar la anonimización (ADR-025) y que el dato viaja a un LLM externo. Five Nines asume que el desenfoque es automático sin medir su calidad (ADR-0017: "Anonymization may remove useful signals").
- **Muestra y sesgo.** Los datos médicos (Archangels, BluzBrothers), de pago (Team 7, ArchColider) y de fotos (Five Nines) tienen un ejemplo cada uno; los datos de ubicación (monArch) solo tienen un párrafo de README. No hay ejemplo de datos de menores ni de cifrado por campo en una base de datos.
- **Los equipos pueden haber copiado el vocabulario.** Los ADR de ZAItects (016, 017) siguen la lista OWASP de LLM y los de Team 7 siguen el vocabulario del método (quantum, ADR). Que varios usen los mismos términos no prueba que lo hayan descubierto por separado (autorrevisión 3 del diseño).
- **La cadena requisito → decisión se corta a menudo.** Team 7 ADR-4 cita ASM-4 en el texto pero no el requisito QA-5; BluzBrothers ADR-004 enlaza al Event Storming y no al requisito de las 24 h; Pragmatic ADR-010 remite a "Q4", que no existe en la lista de requisitos (existen Q3 repetido y Q5, que sí dice que la IA solo ve la story).

---

## 6. Para elegir el elenco

**Pragmatic.**
- T4b: lo ilustra bien, mejor que ningún otro repo, porque une estructura (ADR-009, 010, 015) y concesión (ADR-017, 019), con la característica de seguridad como primera de la lista. Todo está en sus propios ADR, con "Strengthened/Weakened" por ADR.
- T4a: lo ilustra a medias. Muestra minimización (la story sustituye al currículum) y que el currículum viaja a un LLM externo; no tiene plazos de conservación, ni cifrado, ni borrado más allá del requisito R24. Su anonimización es además un control de sesgo, lo que da un matiz útil.
- Debilidades: ADR-010 truncado, C3 de story cita un ADR superado.

**Five Nines.**
- T4a: es el que mejor la ilustra con cifras (ADR-0017: tres niveles, bloqueo legal, DSAR, costos y riesgos). Se debe advertir la inconsistencia 90/180 días del repo.
- T4b: aparece solo como líneas de "menor privilegio" dentro de ADR de IA y en el HLD de datos; no hay un ADR de seguridad estructural. El ADR-0016 (humano en el circuito) liga con R6.
- Ventaja: el mismo caso lleva IA, así que la retención de fotos conecta con R6 sin cambiar de caso.

**Mejor que ambos, según la verdad.**
- Para T4a el borrado por clave: **Archangels** (ADR-005), que ni Pragmatic ni Five Nines tienen.
- Para T4a "dónde vive el dato y a quién se le muestra una versión reducida": **Team 7** (ADR-4), con un caso más claro que cualquier otro y fácil de dibujar.
- Para T4b "zonas, gateways": **Team 7** (ADR-1, 12). Para "dentro de la herramienta": **ConnectedAI** (una línea, pero única).

**Combinación concreta que propongo.** T4a: Five Nines como principal (plazos por nivel) + Archangels como segundo (borrado por clave) + Team 7 solo si el módulo necesita el caso de la tarjeta. T4b: Pragmatic como principal + Team 7 como segundo (zonas y gateways, porque es otra cosa: aislar un componente) + ArchColider/Archangels como párrafo corto de zero trust + ConnectedAI al llegar al módulo de IA.

---

## 7. Términos que hay que explicar

- **PII (datos personales identificables)**: cualquier dato que permite saber de qué persona se trata (nombre, correo, matrícula, foto de la cara).
- **GDPR**: reglamento europeo de protección de datos; entre otras cosas obliga a guardar los datos solo el tiempo necesario y a borrarlos cuando la persona lo pide.
- **Derecho al borrado / DSAR**: la solicitud de una persona para ver o borrar los datos que una empresa tiene de ella (DSAR = data subject access request).
- **Retención**: cuánto tiempo se conserva un dato antes de borrarlo.
- **Retención por niveles**: distintas copias del mismo dato con distinto plazo según para qué se usan.
- **Bloqueo legal (legal hold)**: suspender el borrado automático de un dato porque está en una disputa o investigación.
- **Anonimización / desenfoque**: quitar o tapar lo que identifica a una persona (cara, matrícula, nombre) para poder usar el dato sin saber de quién es.
- **Pseudonimización / clave sustituta (surrogate key)**: reemplazar el identificador real por uno sin significado propio, de modo que los datos solo se relacionan con la persona consultando otra tabla.
- **Cifrado en reposo y en tránsito**: cifrar el dato mientras está guardado y mientras viaja por la red.
- **Crypto shredding**: cifrar los datos de cada usuario con una clave propia y borrar la clave para que los datos queden ilegibles.
- **CMEK (claves de cifrado gestionadas por el cliente)**: la empresa, y no el proveedor de la nube, controla la clave con la que se cifran sus datos.
- **PCI**: norma de seguridad para quien guarda o procesa tarjetas de pago; cuanto más del sistema toca la tarjeta, más se audita.
- **Tokenización**: reemplazar el número de tarjeta por un código que sirve solo dentro del sistema.
- **Quantum (cuanto arquitectónico)**: parte del sistema que se despliega y escala por separado (Team 7 la llama billing quantum a la parte de facturación).
- **API Gateway**: la puerta de entrada que recibe las peticiones, comprueba quién es y a dónde puede ir, y las reenvía.
- **Zona de red / subred privada / VPN**: parte de la red a la que no se llega desde internet, y túnel cifrado para que alguien autorizado entre desde fuera.
- **Zero trust**: no asumir que una llamada es segura por venir de la red interna; cada llamada demuestra quién es.
- **Claims**: afirmaciones firmadas dentro de un token (quién es el usuario, qué rol tiene).
- **RBAC / ACL**: control de acceso por rol (qué puede hacer cada rol) y lista de permisos por recurso (quién puede ver este viaje, este pedido).
- **Menor privilegio**: dar a cada componente o persona solo el permiso que necesita.
- **Autenticación y autorización**: comprobar quién eres y decidir qué puedes hacer.
- **JWT**: token firmado que lleva la identidad del usuario en cada petición.
- **Proveedor de identidad (IdP) / SSO**: servicio externo (Google, Apple, Microsoft, Auth0) que confirma la identidad para que el sistema no guarde contraseñas.
- **Tool (herramienta) de un agente de IA**: función que el modelo puede invocar para consultar o cambiar datos.
- **Event sourcing**: guardar cada cambio como un evento inmutable en vez de solo el estado final (choca con el borrado).
- **Story (Pragmatic)**: versión anonimizada del currículum en texto, sin los factores que permiten discriminar.
- **ETL / replicación**: copiar datos de un sistema a otro, de forma periódica o continua.

---

## 8. Qué se puede mostrar en pantalla

| Visual | Contenido | Fuente |
|---|---|---|
| Tarjeta partida | La tarjeta completa en el billing quantum, "last 4 digits" en el de clientes; flecha por cola asíncrona; red virtual con VPN para administradores | Team-7: `ADR/ADR-4-extract-billing-quanta.md` (imagen `images/adr-4.jpg` del repo; el texto original ya describe el esquema) |
| Mapa de zonas | Cuatro dominios: clientes (solo entrada), operación, facturación ("isolated security zone with no incoming requests"), administración; un gateway por dominio | Team-7: `ADR/ADR-1-service-based.md`; `ADR/ADR-12-gateways.md` |
| Tabla de niveles de retención | Originales 180 d (hasta 2 años con bloqueo legal) → copias de trabajo 90 d → conjunto de entrenamiento anonimizado (revisión anual); más Nearline a 30 d, Coldline a 90 d | Five-Nines: `adrs/ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md` |
| Contradicción 90/180 | Cuatro documentos dicen 90 días y el ADR dice 180 | Five-Nines: `requirements/3_NFRs.md` (NFR_7); `hld/core-func/car-van-rental/4_Sequence_Diagram.md` línea 249; ADR-0017 |
| Clave por usuario | Datos cifrados en un almacén, claves en otro; borrar la clave = datos ilegibles; costo: caché temporal en claro | Archangels: `4.ADRs/005-use-crypto-shredding.md` |
| Frase "Therefore to delete all records we can simply remove the key." | Cita corta | Archangels: `4.ADRs/005-use-crypto-shredding.md` |
| Línea de tiempo de 24 h | Sensores → base de series temporales → borrado a las 24 h; instantánea → MyMedicalData | BluzBrothers: `ADR/ADR-004-data-retention-policy.md`; `UseCases/US3-snapshot.md` |
| Cifras de carga | 2,1 MB/s promedio, 4 MB/s pico, hasta 500 pacientes, 1 kB por señal | BluzBrothers: `FitnessFunctions/Sizing.md` |
| "El matching no ve currículums" | Servicio Job candidate (currículum) → Story (anonimiza) → Matching (solo story); permisos de base de datos | Pragmatic: `ADR/ADR-010-create-features-from-story-not-resumes.md`; `ADR/ADR-015-schema-ownership-and-permissions.md`; `C4/C2-container.md` |
| Las concesiones | Opt 1, 2 y 3 de ADR-019 con "Weakened: Security" | Pragmatic: `ADR/ADR-019-data-transmission-for-analytics.md` |
| Prompt de la story | Lista de factores a eliminar (raza, sexo, género, orientación sexual, salud, atractivo) | Pragmatic: `Requirements/Research/token-estimation.md` |
| Atacante que entra por otro camino | Puerta de autenticación y flecha que la salta; cita "the attacker would skip the Interface authentication and authorisation" | Archangels: `4.ADRs/018-use-interface-for-system-system-integration.md` |
| Línea de verificación de pedido | "A check is applied to ensure the order belongs to the given customer." sobre el diagrama C3 | ConnectedAI: `3_architecture_and_design/c3-component-order-processing-agent.md` |
| Citas en conflicto | "Store no PII data in our system…" frente a "Since this service stores PII…" | Pegasuz: `engineering-practices/Data-compliance-security.md`; `other-services/auth-service.md` |
| Roles de acceso a un viaje | De "full read access" a "trip dates and locations" | Data-Alchemists: `information_viewpoint/README.md` (Trip Access Control List) |
