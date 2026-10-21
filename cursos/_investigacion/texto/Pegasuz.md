# Pegasuz · investigación fase 1 (texto)

Fuente: `katas-src/Pegasuz/`. Archivos de texto leídos: 38 (README, 13 archivos en `ADRs/`, `design/design-artifacts.md`, `other-artifacts/Requirement-analysis.md`, 7 en `engineering-practices/`, 4 en `other-services/`, 9 en `quanta/`, 2 `.gitignore`). El `.mp4` de `other-artifacts/` y `diagrams/.DS_Store` no son texto y no se leyeron.

## 1. El caso

[DATO] El equipo PegasuZ, de la empresa Zemoso, ganó el primer puesto de las O'Reilly Architecture Katas de primavera 2022 con la plataforma Spotlight (`README.md:1`, `README.md:7`, `README.md:43`). [DATO] El cliente es Diversity Cyber Council, que busca aumentar la inclusión y la representación en la industria tecnológica con formación, mentoría, redes y programas de visibilidad (`README.md:77`). [DATO] Objetivo declarado: una cantera de talento sostenible y diversa que dé acceso a programas de formación que lleven a empleo directo (`README.md:80`). [DATO] Problema central según el equipo: las organizaciones sin fines de lucro (NPO) están descentralizadas, no tienen marco de colaboración y su poca visibilidad es una barrera de acceso para las personas subrepresentadas (`README.md:71`). [DATO] Requisitos duros citados del enunciado: facilidad de uso para el usuario final, seguimiento del progreso del candidato y seguimiento del compromiso (`other-artifacts/Requirement-analysis.md:19`, `:25`, `:31`); las ofertas solo admiten texto enriquecido, enlaces y contenido legible descargable como PDF (`:37`); informes operativos y analíticos para administradores (`:44`). [DATO] Restricciones que el equipo deriva: proyecto greenfield con financiación difícil (`Requirement-analysis.md:53-73`), PII como SSN y etnia sujeta a derecho al olvido de GDPR (`:75-79`), crecimiento estimado hasta ~1 millón de candidatos y ~100k NPO en 3 años (`README.md:129-135`), disponibilidad objetivo entre tres y cuatro nueves (`README.md:138-140`). [HUECO] El texto del repositorio no reproduce el enunciado completo de la kata; los requisitos aparecen citados dentro del análisis.

## 2. Qué entregó el equipo

- `README.md`: documento principal; glosario, preludio, NFR, contexto, experiencia de usuario, supuestos de capacidad y disponibilidad, roles, quanta, vistas lógica y física, hoja de ruta y prácticas (`README.md:19-38`).
- `other-artifacts/Requirement-analysis.md`: análisis requisito por requisito con las características (NFR) que deriva de cada uno y tabla resumen (`:1-109`).
- `ADRs/`: 12 archivos numerados (001 plantilla + 11 decisiones, 002 a 012) y un índice `README.md`.
- `quanta/`: 8 documentos de quantum (NPO-Candidate, Reports, Notification, Recommendations, Chat, Meetings, Document, NPO Integration) y uno que explica cómo se identificaron (`quanta/quanta-identification.md`). Cada quantum declara responsabilidades, top 3 de características, estilo preferido y ADR relevantes.
- `other-services/`: Auth, BFF, Support y componentes de infraestructura (API Gateway, sidecar logger, colector de métricas, monitoreo).
- `engineering-practices/`: 7 notas breves (CI/CD, entrega continua, cumplimiento y seguridad de datos, feature toggles, monitoreo, patrón sidecar, twelve-factor).
- `design/design-artifacts.md`: enlaces a Figma, prototipos y Loom de los recorridos de candidato y NPO.
- Diagramas (imágenes): contexto, arquitectura lógica, diagrama de componentes, 8 diagramas de quanta, 3 diagramas de flujo de llamadas, más worksheets de características y de estilo por quantum en `images/`.
- Cuentas: 11 ADR de decisión; 10 requisitos del enunciado analizados más 3 derivados (`Requirement-analysis.md:96-109`); 7 NFR de plataforma (`README.md:87-93`); 14 diagramas en `diagrams/` (contexto 1, lógico 1, componentes 1, quanta 8, flujos 3).
- Métodos reconocibles: [DATO] quanta arquitectónicos con definición explícita (`README.md:154`); [DATO] event storming + actor-acción para identificar agregados, servicios y quanta (`README.md:156`, `quanta/quanta-identification.md:3-9`); [DATO] tablas PrOACT dentro de los ADR (`ADRs/001.adr-template.md:9`); [DATO] design thinking y "golden paths" de usuario (`README.md:106`); [DEDUCCIÓN] worksheets de características y de estilo arquitectónico por quantum, por los nombres de archivo `*-quantum-worksheet` y `*-style-worksheet` citados en cada `quanta/` (contenido en imágenes).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| 002 API Standard | Usar REST y GraphQL a la vez | Accepted | REST, GraphQL, gRPC | GraphQL evita sobre y sub-fetching y da payload menor en móvil y tipado por esquema; REST es fácil de integrar para terceros u ONG | Sobrecarga de infraestructura por dos estándares (mitiga: GraphQL solo en el BFF, servicios en REST, federación GraphQL a largo plazo); menor rendimiento que gRPC, aceptado porque las operaciones no son críticas | Feasibility, latencia, facilidad para el cliente, madurez, comunidad, adaptabilidad (tabla PrOACT); responsiveness y usability en contexto | `ADRs/002.adr-api-standard.md:5-40` |
| 003 Build vs Buy | Comprar auth, almacenamiento de documentos, chat y notificaciones; construir el núcleo | Accepted | Construir en casa, comprar a terceros | Greenfield ambiguo y riesgoso; ciclo de feedback corto y menor tiempo de salida al mercado; invertir ingeniería en la propuesta de valor central. Seis factores de decisión | Menor flexibilidad y personalización (mitiga: servicio envoltorio que cubra lo que falta) | Feedback loop, go to market, simplicidad, costo, competencias del equipo | `ADRs/003.adr-build-vs-buy.md:5-31` |
| 004 BFF con GraphQL | Un servicio BFF con API GraphQL para las apps | Accepted | no declara (sigue a ADR 002) | Evita sobre/sub-fetching, cubre requisitos propios de UI, una sola llamada agrega datos de varios servicios, el frontend puede mantenerlo | Punto único de falla (mitiga: varias zonas de disponibilidad); un servicio más que monitorear; latencia por un salto extra (mitiga: mismo clúster) | Latencia, disponibilidad | `ADRs/004.adr-bff.md:5-26` |
| 005 Tipo de NoSQL | Almacén de documentos; clave-valor para cachés | Accepted | Documentos, grafos, clave-valor, columnas anchas (tipos enumerados) | Pocas escrituras; particionado de datos útil al expandirse a regiones; clave-valor para cachés sin consultas agregadas | no declara | Escala por regiones | `ADRs/005.adr-choosing-nosql-db.md:5-27` |
| 006 Contenedores vs serverless | Usar contenedores o serverless según el servicio | Proposed | Contenedores, serverless | Arquitectura distribuida con estilos distintos por quantum; serverless para servicios sin alta disponibilidad (costo y mantenimiento); contenedores para los que deben ser muy disponibles y responsivos | Serverless puede afectar disponibilidad; contenedores suman costo y mantenimiento (mitiga: servicios gestionados tipo ECS o Cloud Run); el equipo debe conocer ambos | Costo, mantenimiento, portabilidad, factibilidad, escalabilidad, disponibilidad, latencia, seguridad (PrOACT); feasibility (costo) | `ADRs/006.adr-deployment-method.md:4-38` |
| 007 Estilo NPO-Candidate | Monolito modular si hay restricción de costo y migrar luego a microservicios + eventos; microservicios + eventos si no la hay | Proposed | Monolito modular, microservicios | Proyecto greenfield con ambigüedades y riesgos; migrar tras encontrar product-market fit | no declara sección de trade-offs; la tabla PrOACT pone al monolito con acoplamiento alto y escalabilidad y extensibilidad bajas | Costo (tiempo+dinero), mantenimiento, acoplamiento, escalabilidad, extensibilidad | `ADRs/007.adr-arch-style-np-candidate-mvp.md:4-32` |
| 008 Subida directa | Subir archivos desde el frontend directo al almacenamiento de terceros | Accepted | Vía servicio de documentos, directo al almacenamiento | Tabla PrOACT: tiempo mínimo, pago por uso, mayor confiabilidad (el servicio no se infla en memoria con archivos grandes), sin carga de mantenimiento, menor latencia | Riesgo de archivos maliciosos o acceso sin autorización (mitiga: URL prefirmadas o de vida corta con tamaño, formato y validez) | Tiempo, costo, confiabilidad, mantenimiento, latencia, seguridad | `ADRs/008.adr-upload-directly-to-document-storage.md:4-31` |
| 009 Identity Provider | Usar un proveedor de identidad gestionado de terceros | Accepted | Construir en casa; autoalojado open source (Keycloak, Apache LDAP); gestionado (Auth0, Okta) | Construir o gestionar identidad es caro y agrega carga de seguridad y cumplimiento; salida al mercado más rápida; pago por uso | Limita a las capacidades del proveedor (mitiga: servicio envoltorio como fachada de identidad) | Tiempo, costo, mantenimiento, flexibilidad | `ADRs/009.adr-idp.md:4-38` |
| 010 Cola vs stream | Event stream | Accepted | Cola de mensajes, event stream | Un evento debe llegar a varios servicios (ejemplo: `candidate_assignment_updated` lo consume el servicio de candidato y se guarda para analítica); base para event sourcing | Costo mayor que una cola, aceptado por gestión y confiabilidad | Confiabilidad, entrega, retención, costo, mantenimiento | `ADRs/010.adr-queue-stream.md:3-30` |
| 011 Proveedor cloud | AWS | Accepted | AWS, GCP, Azure | Los tres están parejos en oferta y precio; AWS es líder de mercado con comunidad amplia | no declara | Precio (comparación en imagen) | `ADRs/011.adr-cloud-providers.md:4-23` |
| 012 Almacén operacional | NoSQL sobre RDBMS | Accepted | RDBMS, NoSQL | Se desea escalabilidad; flexibilidad de esquema en greenfield por ambigüedad y evolución temprana | La tabla PrOACT da a NoSQL consistencia de datos baja; no lo trata como trade-off en texto | Flexibilidad de esquema, escalabilidad, disponibilidad, consistencia, escritura, costo | `ADRs/012.adr-operational-data-storage.md:3-36` |

Se excluye `ADRs/001.adr-template.md` (plantilla: Status, Context, Alternatives, PrOACT, Decision, Tradeoffs - Mitigations) y `ADRs/README.md` (índice, que llama a 001 "We are using ADRs (template)", `ADRs/README.md:3`).

## 4. Hallazgos para el curso

#### H01 · Quanta: estilos distintos dentro de una misma plataforma
- Idea: una plataforma se divide en quanta desplegables por separado y cada uno elige su estilo según sus propias características, en vez de fijar un estilo único.
- Lo que hizo el equipo: [DATO] no eligió estilo de plataforma porque "several architectural quanta, each with its own architectural style" (`README.md:95`). Define quantum como "An independently deployable artifact with high functional cohesion and synchronous connascence" (`README.md:154`). [DATO] Resultado por quantum: NPO-Candidate monolito modular en MVP y microservicios + eventos a largo plazo (`quanta/npo-candidate.md:47-48`); Notification microservicios + eventos (`quanta/notification.md:26`); Reports eventos + microservicios (`quanta/reports.md:26`); Chat, Meetings, Document y Recommendations microservicios (`quanta/chat.md:40`, `quanta/meetings.md:36`, `quanta/document.md:26`, `quanta/recommendation.md:30`); NPO Integration eventos + microkernel (`quanta/npo-integration.md:63-64`).
- Razón declarada: la identificación de quanta "helps in defining different parts of the platform" (`README.md:156`).
- Costo o trade-off admitido: no declara a nivel plataforma; ADR 006 admite que el equipo debe conocer ambos estilos de despliegue (`ADRs/006.adr-deployment-method.md:38`).
- Alternativas que nombra: no declara (a nivel plataforma).
- Estado: no declara.
- Fuente: `README.md:95`, `README.md:153-170`, `quanta/`.
- Completitud: parcial; falta la comparación de estilos por quantum, que está en imágenes de worksheets.
- Contexto para contarlo: qué es un quantum; el caso Spotlight; qué son características arquitectónicas.
- Depende de imagen: sí (`images/*-style-worksheet.jpg`, `images/*-arch-characteristics.jpg`).
- Verificado: [ ]

#### H02 · Encontrar los quanta: eventos, agregados y dependencias sincrónicas
- Idea: los límites de los quanta salen de agrupar agregados en servicios y luego juntar los servicios con dependencias sincrónicas.
- Lo que hizo el equipo: [DATO] hizo event storming + actor-acción para identificar agregados; agrupó agregados en servicios; los servicios con dependencias sincrónicas formaron quanta (`quanta/quanta-identification.md:3-9`). [DATO] Lista resultante: NPO-Candidate (NPO, Candidate, Assignment, Assignment Scheduler, Auth), Chat, Notification (con Email, SMS y proveedores de terceros), Meeting, NPO-Integration, Recommendation, Documents (`:14-33`).
- Razón declarada: la de H01 (`README.md:156`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `quanta/quanta-identification.md:1-33`, `README.md:156`.
- Completitud: parcial; el resultado del event storming y el agrupamiento están en imágenes.
- Contexto para contarlo: event storming, agregado, quantum.
- Depende de imagen: sí (`images/aggregate-identification.jpg`, `images/quanta-identification.jpg`).
- Verificado: [ ]

#### H03 · Monolito modular primero, condicionado al costo
- Idea: el estilo del núcleo se decide según una restricción del negocio (costo, validar el mercado) y se planea su migración.
- Lo que hizo el equipo: [DATO] ADR 007 decide monolito modular "if there is a cost constraint", con migración a microservicios + eventos tras product-market fit; microservicios + eventos si no hay restricción (`ADRs/007.adr-arch-style-np-candidate-mvp.md:29-32`). [DATO] La hoja de ruta pone el quantum NPO-Candidate como monolito modular en el primer puesto del MVP y su migración en el largo plazo (`README.md:202`, `README.md:219`).
- Razón declarada: proyecto greenfield con ambigüedades y riesgos (`ADRs/007.adr-arch-style-np-candidate-mvp.md`); en el quantum, factibilidad de costo y tiempo porque "quick market validation of the idea is paramount" y la financiación inicial puede ser difícil (`quanta/npo-candidate.md:27`).
- Costo o trade-off admitido: la tabla PrOACT da al monolito acoplamiento alto, escalabilidad y extensibilidad bajas (`ADRs/007.adr-arch-style-np-candidate-mvp.md`). En el quantum, admite que microservicios + eventos es costoso y eventualmente consistente (`quanta/npo-candidate.md:51-56`).
- Alternativas que nombra: monolito modular, microservicios (`ADRs/007.adr-arch-style-np-candidate-mvp.md`).
- Estado: Proposed (`ADRs/007.adr-arch-style-np-candidate-mvp.md`).
- Fuente: `ADRs/007.adr-arch-style-np-candidate-mvp.md`, `quanta/npo-candidate.md:26-56`, `README.md:197-223`.
- Completitud: parcial; el ADR no tiene sección de trade-offs y está en Proposed.
- Contexto para contarlo: monolito modular; product-market fit; greenfield.
- Depende de imagen: no (la tabla PrOACT está en texto).
- Verificado: [ ]

#### H04 · Comprar lo que no es núcleo, con un envoltorio
- Idea: se compra lo que no es la propuesta de valor y se tapa la falta de flexibilidad con un servicio propio que hace de fachada.
- Lo que hizo el equipo: [DATO] ADR 003 decide comprar auth, almacenamiento de documentos, chat y notificaciones (`ADRs/003.adr-build-vs-buy.md:25`), con seis preguntas como factores (`:15-21`). [DATO] ADR 009 elige un IdP gestionado sobre construirlo o autoalojarlo (`ADRs/009.adr-idp.md:11-29`). [DATO] Chat y Meetings se definen como fachadas a proveedores de terceros con "Abstraction" y "Extensibility" entre sus características (`quanta/chat.md:27-28`, `quanta/meetings.md:21-25`). [DATO] Esos quanta listan características que "Characteristics that we do not need as we offloaded to 3rd party vendors": seguridad, escalabilidad, disponibilidad y responsiveness en Chat (`quanta/chat.md:31-35`); seguridad del correo en Notification (`quanta/notification.md:21-22`).
- Razón declarada: greenfield ambiguo y riesgoso, feedback corto y menor tiempo de salida (`ADRs/003.adr-build-vs-buy.md`); para identidad, costo y carga de seguridad y cumplimiento (`ADRs/009.adr-idp.md`, `:29`).
- Costo o trade-off admitido: menor flexibilidad y personalización; mitigación con servicio envoltorio (`ADRs/003.adr-build-vs-buy.md`, `ADRs/009.adr-idp.md`).
- Alternativas que nombra: construir o comprar (003); construir, Keycloak/Apache LDAP autoalojado, Auth0/Okta (009).
- Estado: Accepted (ambos).
- Fuente: `ADRs/003.adr-build-vs-buy.md`, `ADRs/009.adr-idp.md`, `quanta/chat.md`, `quanta/meetings.md`, `quanta/notification.md`.
- Completitud: completo (009); 003 no tiene tabla comparativa pero sí factores, decisión y trade-off.
- Contexto para contarlo: qué es un IdP; fachada o wrapper; qué es la propuesta de valor de Spotlight.
- Depende de imagen: no.
- Verificado: [ ]

#### H05 · Subir archivos directo al almacenamiento con URL prefirmadas
- Idea: sacar del servicio propio el tráfico pesado de archivos y recuperar la seguridad perdida con URL firmadas y de vida corta.
- Lo que hizo el equipo: [DATO] el frontend sube directo al almacenamiento de un tercero en vez de pasar por el servicio de documentos (`ADRs/008.adr-upload-directly-to-document-storage.md:27`).
- Razón declarada: la tabla PrOACT marca al paso por el servicio con confiabilidad baja "Low - because service memory will bloat un predictably based on size of document uploaded", tiempo de construcción muy alto y carga de mantenimiento (`ADRs/008.adr-upload-directly-to-document-storage.md`).
- Costo o trade-off admitido: la vía directa tiene seguridad baja frente a la alta del servicio (`:23`); riesgo de archivos maliciosos (demasiado grandes, formato inválido) y de acceso sin autorización; mitigación con URL prefirmadas o de vida corta que fijan tamaño, formato y validez (`:30-31`).
- Alternativas que nombra: vía servicio de documentos; directo al almacenamiento (`:11-12`).
- Estado: Accepted.
- Fuente: `ADRs/008.adr-upload-directly-to-document-storage.md:1-35`, `quanta/document.md:1-33`.
- Completitud: completo.
- Contexto para contarlo: el quantum Document; qué es una URL prefirmada; requisito de que las ofertas solo admiten PDF y contenido legible (`other-artifacts/Requirement-analysis.md:38`).
- Depende de imagen: no.
- Verificado: [ ]

#### H06 · BFF con GraphQL: un estándar para las apps, otro para terceros
- Idea: dos consumidores con necesidades distintas pueden recibir estándares de API distintos, y el costo se contiene poniendo uno solo en un punto.
- Lo que hizo el equipo: [DATO] ADR 002 decide REST y GraphQL (`ADRs/002.adr-api-standard.md:30`); para no obligar a todos los servicios a soportar los dos, GraphQL va solo en el BFF y los servicios hablan REST (`:38`, `ADRs/004.adr-bff.md:8`, `:18`). [DATO] El BFF traduce GraphQL a REST, agrega datos de varios servicios y es completamente stateless (`other-services/bff-service.md:6-11`).
- Razón declarada: GraphQL evita sobre y sub-fetching y reduce el payload en redes móviles; REST facilita la integración de terceros u ONG (`ADRs/002.adr-api-standard.md`); una sola llamada del frontend agrega datos (`ADRs/004.adr-bff.md`).
- Costo o trade-off admitido: sobrecarga de infraestructura por dos estándares (`ADRs/002.adr-api-standard.md`); rendimiento menor que gRPC (`:39-40`); el BFF es punto único de falla, un servicio más y un salto extra de latencia, con mitigaciones de multi-zona y mismo clúster (`ADRs/004.adr-bff.md`).
- Alternativas que nombra: REST, GraphQL, gRPC (`ADRs/002.adr-api-standard.md`).
- Estado: Accepted (ambos).
- Fuente: `ADRs/002.adr-api-standard.md`, `ADRs/004.adr-bff.md`, `other-services/bff-service.md`.
- Completitud: completo.
- Contexto para contarlo: qué es un BFF; sobre-fetching; requisito de interoperabilidad con NPO (`Requirement-analysis.md:21`).
- Depende de imagen: no.
- Verificado: [ ]

#### H07 · Disponibilidad dimensionada al tipo de sistema
- Idea: el objetivo de disponibilidad se fija por lo que está en juego y por quantum, no al máximo.
- Lo que hizo el equipo: [DATO] descarta cinco nueves (5,2 min de caída al año) y considera excesivos cuatro nueves (52,5 min) porque Spotlight "not a public safety or mission critical (dealing with lives or money directly) platform" (`README.md:138`). [DATO] Diseña entre tres nueves para quanta sin dependencias sincrónicas, como reportes, y cuatro nueves para quanta con dependencias sincrónicas, como notificaciones (`README.md:140`).
- Razón declarada: el tipo de plataforma (`README.md:138`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: cinco y cuatro nueves para toda la plataforma (`README.md:138`).
- Estado: no declara.
- Fuente: `README.md:137-142`; relacionados `ADRs/002.adr-api-standard.md` y `quanta/npo-candidate.md:54` (mismo argumento no crítico para aceptar menor rendimiento y consistencia eventual).
- Completitud: parcial; no dice cómo se logra cada nivel.
- Contexto para contarlo: qué significa "nueves"; qué es una dependencia sincrónica.
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · Del requisito de negocio a la característica arquitectónica
- Idea: cada característica arquitectónica se justifica desde un requisito concreto del enunciado o derivado.
- Lo que hizo el equipo: [DATO] análisis requisito por requisito con sus NFR: incentivos configurables sin ingeniería → Configurability (`other-artifacts/Requirement-analysis.md:11-14`); seguimiento de progreso con datos tirados de APIs de NPO → Workflow, Data Integrity (`:25-30`); usuarios poco familiarizados con la tecnología → Usability; APIs documentadas para NPO → Interoperability (`:19-24`); greenfield → Feasibility, Evolutionary (`:53-65`). Tabla resumen (`:96-109`). [DATO] De ahí salen 7 NFR de plataforma (`README.md:87-93`).
- Razón declarada: cada fila tiene su análisis (`Requirement-analysis.md:96-109`).
- Costo o trade-off admitido: no aplica.
- Alternativas que nombra: no aplica.
- Estado: no declara.
- Fuente: `other-artifacts/Requirement-analysis.md`, `README.md:83-95`.
- Completitud: ilustrativo (método de análisis, sin decisión).
- Contexto para contarlo: el caso Spotlight; NFR.
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · Greenfield: no construir una fortaleza para nadie
- Idea: en un producto nuevo sin mercado probado, factibilidad y evolución pesan más que la escala inicial, y eso se traduce en decisiones concretas.
- Lo que hizo el equipo: [DATO] cita "Why should the business invest to build a fortress when it is not sure if anyone would be staying in it or using it." (`other-artifacts/Requirement-analysis.md:59`) y concluye que la arquitectura debe evolucionar con el negocio (`:61`). [DATO] Ese argumento aparece en ADR 003 (`:8`), ADR 007 (`:11`), ADR 012 (flexibilidad de esquema, `:36`) y en el top 3 de NPO-Candidate (`quanta/npo-candidate.md:27-29`). [DATO] La hoja de ruta separa MVP (recomendaciones "Simple, without model training", reportes sin analítica) del largo plazo (`README.md:197-223`).
- Razón declarada: viabilidad, financiación y tiempo (`Requirement-analysis.md:54-57`); financiación difícil durante COVID (`:68`).
- Costo o trade-off admitido: ver H03.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `other-artifacts/Requirement-analysis.md:52-73`, `README.md:194-223`.
- Completitud: ilustrativo (el hilo conductor); las decisiones que lo respaldan están en H03, H04 y H11.
- Contexto para contarlo: greenfield, MVP, product-market fit.
- Depende de imagen: no.
- Verificado: [ ]

#### H10 · Event stream en vez de cola por consumidores múltiples
- Idea: la elección entre cola y stream depende de si un mismo evento tiene varios consumidores y si hay que retenerlo.
- Lo que hizo el equipo: [DATO] elige event stream (`ADRs/010.adr-queue-stream.md:26`).
- Razón declarada: eventos que deben llegar a varios servicios; ejemplo, `candidate_assignment_updated` lo usa el servicio de candidato y se guarda para analítica, lo que una cola no ofrece (`:27`); construir event sourcing (`:7`).
- Costo o trade-off admitido: mayor costo, aceptado por gestión y confiabilidad (`:30`).
- Alternativas que nombra: cola de mensajes, event stream (`:10-11`).
- Estado: Accepted.
- Fuente: `ADRs/010.adr-queue-stream.md`; relacionado `quanta/npo-candidate.md:11` (Candidate Service escucha actualizaciones de asignación para incentivar).
- Completitud: completo.
- Contexto para contarlo: cola vs stream, offset, retención; el quantum NPO-Candidate y sus eventos.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · NoSQL documental por flexibilidad de esquema y escala
- Idea: la base operacional se elige por la incertidumbre del dominio (esquema cambiante) y la expansión por regiones.
- Lo que hizo el equipo: [DATO] NoSQL sobre RDBMS (`ADRs/012.adr-operational-data-storage.md:35`), y dentro de NoSQL un almacén de documentos, con clave-valor para cachés (`ADRs/005.adr-choosing-nosql-db.md:25-27`).
- Razón declarada: escalabilidad deseada y flexibilidad de esquema en un greenfield (`ADRs/012.adr-operational-data-storage.md`); pocas escrituras y particionado útil al expandirse a regiones (`ADRs/005.adr-choosing-nosql-db.md`).
- Costo o trade-off admitido: la tabla PrOACT asigna a NoSQL consistencia baja (`ADRs/012.adr-operational-data-storage.md`); el texto no lo desarrolla como trade-off.
- Alternativas que nombra: RDBMS, NoSQL (012); documentos, grafos, clave-valor, columnas anchas (005).
- Estado: Accepted (ambos).
- Fuente: `ADRs/005.adr-choosing-nosql-db.md`, `ADRs/012.adr-operational-data-storage.md`.
- Completitud: parcial; falta el trade-off escrito y la tabla de 012 da a NoSQL Write Performance Requirements: High mientras 005 justifica documentos por "As there won't be too many writes" (`ADRs/012.adr-operational-data-storage.md`, `ADRs/005.adr-choosing-nosql-db.md`).
- Contexto para contarlo: teorema CAP (en imagen); tipos de NoSQL.
- Depende de imagen: sí (`images/cap-theorem.png`, `images/cap-pyramid.png`).
- Verificado: [ ]

#### H12 · Integración con NPO: microkernel para sumar socios sin redesplegar
- Idea: cuando hay que integrar muchos sistemas externos distintos, cada integración se aísla como plug-in y el flujo se vuelve asíncrono y eventualmente consistente.
- Lo que hizo el equipo: [DATO] distingue dos formas: que la NPO empuje datos a un stream de Spotlight (simple) o que Spotlight tire de la API de la NPO (requiere un sistema sofisticado, a largo plazo) (`quanta/npo-integration.md:9-14`). [DATO] Para el segundo caso diseña funciones serverless por NPO y oferta, schedulers de extracción e ingesta, y funciones que publican en el event stream (`:27-44`). [DATO] Estilo: eventos para el flujo de ingesta y microkernel para sumar integraciones sin afectar las existentes (`:63-64`).
- Razón declarada: seguimiento de progreso y facilidad de uso son requisitos duros; sin automatizar, los usuarios de la NPO actualizarían a mano con riesgo de errores (`:5`); integrar una NPO nueva no debe exigir redesplegar el quantum (`:53`).
- Costo o trade-off admitido: datos no garantizados consistentes entre ambos sistemas; eventualmente consistentes según la frecuencia del scheduler (`:68-69`); probar un sistema de eventos es difícil, mitigado con logs agregados y trazas distribuidas (`:70-71`).
- Alternativas que nombra: push de la NPO vs pull de Spotlight (`:9-12`).
- Estado: no declara (marcado "Long Term", `:1`, `README.md:222`).
- Fuente: `quanta/npo-integration.md:1-71`.
- Completitud: parcial; no hay ADR que lo respalde y el estilo se compara en una imagen.
- Contexto para contarlo: microkernel; NPO; requisito de seguimiento de progreso; event stream (H10).
- Depende de imagen: sí (`images/np-integration-quantum-style-worksheet.jpg`, `diagrams/quanta/np-integration-quanta.jpg`).
- Verificado: [ ]

#### H13 · Contenedores o serverless según la disponibilidad que pide cada servicio
- Idea: el método de despliegue se decide por servicio según su disponibilidad requerida y el costo.
- Lo que hizo el equipo: [DATO] usar ambos: serverless para servicios que no requieren alta disponibilidad, contenedores para los que deben ser muy disponibles y responsivos (`ADRs/006.adr-deployment-method.md:29-32`).
- Razón declarada: costo y mantenimiento de contenedores; serverless con disponibilidad baja por arranque en frío (`:18-23`, `:31`).
- Costo o trade-off admitido: ver tabla de sección 3 (`:36-38`).
- Alternativas que nombra: contenedores, serverless.
- Estado: Proposed (`:5`).
- Fuente: `ADRs/006.adr-deployment-method.md`; relacionado `quanta/npo-integration.md:28` (funciones serverless por NPO).
- Completitud: parcial; Proposed y no asigna cada quantum a un método.
- Contexto para contarlo: serverless, cold start; disponibilidad por quantum (H07).
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · PII en un solo lugar para poder borrarla
- Idea: el derecho al olvido condiciona dónde vive la información personal: un solo almacén, sin huellas en logs ni servicios.
- Lo que hizo el equipo: [DATO] identifica PII (email, teléfono, dirección, etnia, SSN) y el requisito GDPR de borrar al usuario que lo pida (`other-artifacts/Requirement-analysis.md:76-77`); propone no dejar PII en servicios y logs, guardarla en un solo lugar y que los cachés tengan mecanismos de borrado (`:79`). [DATO] Medidas: no guardar PII en el sistema propio y dejarla en un tercero que cumpla la normativa; si hace falta guardarla, usar base y proveedor que cumplan; cifrar en reposo y tránsito (`engineering-practices/Data-compliance-security.md:7-9`).
- Razón declarada: GDPR (`Requirement-analysis.md:77`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `other-artifacts/Requirement-analysis.md:75-79`, `engineering-practices/Data-compliance-security.md`, `other-services/auth-service.md:27`.
- Completitud: ilustrativo (no hay ADR).
- Contexto para contarlo: PII, derecho al olvido.
- Depende de imagen: no.
- Verificado: [ ]

#### H15 · Capacidad planeada por etapas y regiones
- Idea: la estimación de carga se escalona en el tiempo y en la geografía, y eso orienta escalabilidad y despliegue multizona.
- Lo que hizo el equipo: [DATO] tabla de 3 meses a 3 años, de 5k-10k a ~1 millón de candidatos, de 500-1k a ~100k NPO, de una ciudad a varios estados (`README.md:129-135`). [DATO] Supone 0,5% de adopción en 1-2 años: 100k NPO y 500k personas (`other-artifacts/Requirement-analysis.md:84`); propone despliegue multizona a largo plazo (`:86`).
- Razón declarada: cifras de 1,6 millones de NPO y más de 100 millones de personas subrepresentadas en EE. UU. (`README.md:71`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `README.md:126-135`, `other-artifacts/Requirement-analysis.md:82-90`.
- Completitud: ilustrativo.
- Contexto para contarlo: el caso Spotlight.
- Depende de imagen: no (la tabla está en texto; `images/capacity-planning.jpg` no está referenciada por ningún texto).
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `README.md:3-55` (agradecimientos, integrantes, origen del nombre PegasuZ): datos del equipo, no de arquitectura.
- `design/design-artifacts.md`: solo enlaces externos a Figma y Loom.
- `engineering-practices/CI-CD.md`, `Continous-Delivery.md`, `Feature-Toggles.md`, `twelve-factor.md`: definiciones genéricas de prácticas sin decisión ligada a Spotlight.
- `engineering-practices/sidecar-pattern.md` y `Monitoring.md`: descripción genérica del patrón; solo se aplica en una línea (`other-services/infrastructure-services.md:18-19`).
- `other-services/support-service.md`: servicio de tickets de largo plazo, sin ADR (`:22-23`).
- `ADRs/011.adr-cloud-providers.md`: la decisión se apoya en líder de mercado y en una imagen de precios, sin requisito citado.
- `.gitignore`, `diagrams/.gitignore`: configuración del repositorio.

## 6. Imágenes para fase 2

- `diagrams/context/spotlight-context-diagram.jpg`: contexto de la plataforma; `README.md:100`.
- `diagrams/logical-arch/spotlight-logical-architecture.jpg`: vista lógica; `README.md:185`.
- `diagrams/component/spotlight-component-diagram.jpg`: vista física de componentes; `README.md:190`.
- `images/aggregate-identification.jpg`: resultado del event storming (agregados); `quanta/quanta-identification.md:5`.
- `images/quanta-identification.jpg`: agrupamiento de servicios en quanta; `quanta/quanta-identification.md:11`.
- `diagrams/quanta/np-candidate-quanta.jpg`: servicios y eventos del quantum núcleo; `quanta/npo-candidate.md:2`, `ADRs/007.adr-arch-style-np-candidate-mvp.md`.
- `images/np-candidate-quantum-worksheet.jpg` y `images/np-candidate-quantum-style-worksheet.jpg`: características y comparación de estilos del núcleo; `quanta/npo-candidate.md:24`, `:46`.
- `diagrams/quanta/np-integration-quanta.jpg` y `images/np-integration-quantum-style-worksheet.jpg`: diseño microkernel de integraciones y comparación de estilos; `quanta/npo-integration.md:3`, `:62`.
- `images/npo-integration-quantum-worksheet.jpg`: características del quantum de integración; `quanta/npo-integration.md:48`.
- Worksheets de características y estilo de los demás quanta (chat, documents, meetings, notification, recommendations, reports): `images/chat-quantum-worksheet.jpg`, `images/chat-quantum-arch-characteristics.jpg`, `images/documents-quantum-worksheet.png`, `images/document-quantum-arch-characteristics.jpg`, `images/meetings-quantum-worksheet.jpg`, `images/meeting-quantum-arch-characteristics.jpg`, `images/notification-quantum-worksheet.jpg`, `images/notification-quantum-arch-characteristics.jpg`, `images/recommendations-quantum-worksheet.jpg`, `images/recommendations-quantum-style-worksheet.jpg`, `images/reports-quantum-worksheet.png`, `images/report-quantum-arch-characteristics.jpg`; citados en cada `quanta/`.
- Diagramas de quanta restantes (`diagrams/quanta/chat-quanta.jpg`, `documents-quanta.jpg`, `meeting-quanta.jpg`, `notifications-quanta.jpg`, `recommendations-quanta.jpg`, `Reports-quanta.jpg`): componentes de cada quantum; primera línea de cada `quanta/`.
- `diagrams/call-flows/call-flow-course-enrollment.jpg`, `call-flow-post-notification.jpg`, `call-flow-candidate-assignment-progress.jpg`: flujos de llamadas; `quanta/npo-candidate.md:62-68`.
- `images/cloud-pricing-comparision.png`: comparación de precios que sostiene ADR 011; `ADRs/011.adr-cloud-providers.md:19`.
- `images/cap-theorem.png`, `images/cap-pyramid.png`: CAP en ADR 005 y 012; `ADRs/005.adr-choosing-nosql-db.md`, `ADRs/012.adr-operational-data-storage.md`.
- `images/candidate-golden-path.jpg`, `images/non-profit-organization-golden-path.jpg`: recorridos de usuario; `README.md:113`, `:120`.
- No referenciadas por ningún texto: `images/capacity-planning.jpg`, `design/mobile-flow.png`.

## 7. Preguntas abiertas

- Qué comparación de estilos lleva a cada quantum a su estilo (solo en worksheets de imagen).
- Cómo se ve la frontera entre quanta en el diagrama de componentes y qué comunicaciones son síncronas.
- `quanta/chat.md:9` recomienda un servicio de calendario de terceros para el chat; parece copiado de `quanta/meetings.md:5`. No se puede confirmar la intención sin más fuente.
- `quanta/meetings.md:29` pone Feasibility entre las características que no necesitamos pero dice que Meetings es la propuesta de valor central y sugiere un proveedor de chat de terceros; el texto es contradictorio.
- `quanta/npo-candidate.md:56` mitiga con una cola de mensajes confiable, mientras ADR 010 elige event stream; no se aclara si es lo mismo.
- ADR 011 decide AWS, pero ADR 006 sigue hablando de AWS ECS o Google Cloud Run, según el proveedor elegido (`ADRs/006.adr-deployment-method.md`); ADR 006 tiene fecha anterior (2022-06-21) y sigue Proposed.
- `ADRs/006.adr-deployment-method.md` enlaza `README.md#requirement-analysis`, ancla que no existe en el README.
- `other-services/bff-service.md:16-17`: "Fault tolerance (time)" y Scalability - Service should be highly scalable as quedan incompletos.
- `other-services/auth-service.md` no está enlazado desde el README (sí desde `quanta/npo-candidate.md:19`).
- El video `other-artifacts/spotlight-platform-team-pegasuz.mp4` y la presentación en Loom/Prezi pueden contener argumentos que el texto no tiene.
