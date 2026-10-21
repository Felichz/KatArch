# Archangels · investigación fase 1 (texto)

Repositorio: `katas-src/Archangels`. Rutas relativas a esa carpeta. Caso: Farmacy Family (extensión de Farmacy Foods).

## 1. El caso

[DATO] Farmacy Family es una ampliación del sistema Farmacy Foods ya existente (diseñado por ArchColider en una kata anterior) que agrega una relación más estrecha con los clientes (`1.ProblemBackground/BusinessGoalsDriversAndRequirements.md:10`). El cliente es Kwaku Osei, fundador de Farmacy Food, una startup de comida saludable con tecnología (`BusinessGoalsDriversAndRequirements.md:14`). Pide tres cosas: desarrollar relaciones entre clientes comprometidos, convertir clientes transaccionales en comprometidos y generar datos analíticos a partir de información médica para demostrar los beneficios de Farmacy Foods (`BusinessGoalsDriversAndRequirements.md:18-22`). Los impulsores son conseguir inversores con mejores resultados dietarios demostrados y reducir la comida desperdiciada por tener la mezcla equivocada en una heladera (`BusinessGoalsDriversAndRequirements.md:28-31`). Los clientes son "cientos", separados por zonas geográficas (`BusinessGoalsDriversAndRequirements.md:39`); las clínicas hacen pruebas cada 3 meses (`BusinessGoalsDriversAndRequirements.md:48`). Restricciones duras: integrarse "sin costuras" con Farmacy Foods, aunque Foods pueda requerir cambios (`1.ProblemBackground/ConstraintsAndAssumptions.md:8`; NFR único en `BusinessGoalsDriversAndRequirements.md:145`); cualquiera puede registrarse sin ser cliente de Foods (`ConstraintsAndAssumptions.md:10`); los datos médicos son muy sensibles y exigen alta seguridad (`ConstraintsAndAssumptions.md:11`); plazo de entrega de la arquitectura inicial (`ConstraintsAndAssumptions.md:12`). Aclaraciones verbales del concurso: las clínicas solo se integran con Family, no con Foods (`Clarifications.md:13`); el acceso médico de clínicas es con permiso del cliente (`Clarifications.md:14`); la comunidad es la función prioritaria (`Clarifications.md:16`); se acepta software comprado si cumple, con trade-offs (`Clarifications.md:17`); la arquitectura de Foods se puede modificar si se justifica con ADR (`Clarifications.md:19`); geografía: EE. UU., Michigan (`Clarifications.md:21`); Foods trabaja con microservicios y nube (`Clarifications.md:22`); sin cuotas de membresía (`Clarifications.md:25`). No hay presupuesto declarado [HUECO].

## 2. Qué entregó el equipo

- `README.md`: portada, integrantes y estructura; se declara 1.er puesto de la edición Fall/Autumn 2021 (`README.md:3`).
- `Clarifications.md`: 15 aclaraciones verbales del Q&A de lanzamiento (`Clarifications.md:10-26`).
- `Glossary.md`: 10 términos (Engaged Customer, Transactional Customer, Clinic, Dietician, etc.) (`Glossary.md:10-21`).
- `1.ProblemBackground/BusinessGoalsDriversAndRequirements.md`: 3 objetivos, 2 impulsores, 10 requisitos arquitectónicamente significativos con su objetivo, 1 NFR (`:16-145`).
- `1.ProblemBackground/StakeholderConcerns.md`: preocupaciones de 5 interesados y primeras características asociadas (`:10-16`).
- `1.ProblemBackground/ArchitectureAnalysis.md`: 24 características candidatas, 7 elegidas (3 top), quanta por dominio, tablas de granularidad por dominio con enlace a ADR, puntos de integración, fitness functions (`:10-193`).
- `1.ProblemBackground/ActorsActionsAndSignificantScenarios.md`: 5 actores y 3 escenarios significativos (`:13-41`).
- `1.ProblemBackground/ConstraintsAndAssumptions.md`: 5 restricciones y 2 supuestos (`:6-17`).
- `1.ProblemBackground/RAID.md`: un riesgo (datos médicos valiosos para atacantes) y sus acciones (`:10`).
- `2.SolutionBackground/ArchitecturePrinciples.md`: principios con razón e implicación (`:12-49`).
- `2.SolutionBackground/ArchitecturePatterns.md`: comparación de estilos con la matriz de DeveloperToArchitect y pros/contras/mitigaciones de microservicios y event-driven (`:20-56`).
- `2.SolutionBackground/Conceptual.md`: C4 contexto, contenedores y tres diagramas de componentes con sus ADR (`:10-62`).
- `2.SolutionBackground/DataStore.md`: tipos de almacén considerados y diseño del modelo de grafo (`:8-114`).
- `2.SolutionBackground/Security.md`: opciones de servicios AWS por área de seguridad y política de contraseñas (`:12-65`).
- `2.SolutionBackground/Deployment.md`: infraestructura de alto nivel y despliegue AWS que se engancha a Kafka de Foods (`:8-24`).
- `2.SolutionBackground/Roadmap.md`: iteraciones y prioridad sugerida (`:8-67`).
- `3.ViewsAndPerspectives/`: vista funcional, event storming por requisito (6 diagramas), 3 diagramas de flujo de escenarios, C4, vista de comunicación Foods–Family. `Infrastructure/README.md` está vacío salvo encabezados (`3.ViewsAndPerspectives/Infrastructure/README.md:1-3`).
- `4.ADRs/`: 18 archivos numerados 001–019 (no hay 007): 1 ADR sobre usar ADR y 17 ADR de decisión (`4.ADRs/README.md:8-42`).
- `assets/docs/working-storage/`: 3 textos breves de guion de presentación (personas Miriam y Oliver, y analítica).
- `assets/diagrams/GraphDatastoreModel.json`: modelo del grafo (21 nodos, 33 relaciones).

Cuentas: 17 ADR de decisión; 10 requisitos significativos + 1 NFR; 5 restricciones; 2 supuestos; 15 aclaraciones; 25 diagramas citados desde el texto en `assets/diagrams/`.

Métodos reconocibles [DATO]: C4 (`3.ViewsAndPerspectives/C4Models/README.md:8-10`); Event Storming (`3.ViewsAndPerspectives/EventStorming/README.md:8-18`); características de arquitectura y quanta (`ArchitectureAnalysis.md:8-63`); worksheet de estilos de DeveloperToArchitect (`ArchitecturePatterns.md:26`); análisis de granularidad con criterios de volatilidad, escalabilidad, tolerancia a fallos, seguridad de datos, transacciones, dependencias y workflow (`ArchitectureAnalysis.md:67-145`); dominios estratégicos core/supportive/generic (`ArchitectureAnalysis.md:45-57`); fitness functions previstas (`ArchitectureAnalysis.md:177-185`); ADR al estilo Michael Nygard (`4.ADRs/001We-are-using-ADRs-(template).md:19`).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| 002 | Backend con arquitectura event-driven. | Confirmed | No en el ADR; en el análisis previo, microservicios (`ArchitecturePatterns.md:32-40`) | El análisis de características concluyó que event-driven tiene menos trade-offs (`:15`) | Interoperabilidad debe mitigarse; interoperabilidad y configurabilidad pueden seguir siendo trade-offs altos (`:29-33`) | "Cuatro de siete características" puntúan alto (`:25`) | `4.ADRs/002-We-will-use-an-event-driven-backend-architecture.md:11-33` |
| 003 | Eventos de dominio como mecanismo principal de comunicación, con especificación CloudEvents. | Accepted | no declara | Pasar datos y comunicar componentes maximizando el desacoplamiento (`:15-16`) | Consistencia eventual nueva para algunos; entrega al menos una vez exige idempotencia; problema de doble escritura (`:36-38`) | Tolerancia a fallos, evolución (`:30-31`) | `4.ADRs/003-component-communication.md:11-42` |
| 004 | Patrón outbox al publicar e inbox al suscribirse. | Accepted | no declara | Doble escritura causa inconsistencias; entrega al menos una vez exige tolerar eventos repetidos (`:15-18`) | Inbox requiere sondeo o detección de cambios; más complejidad por procesos separados (`:38-39`); riesgos "TODO" (`:43`) | no declara | `4.ADRs/004-use-inbox-outbox-pattern.md:11-43` |
| 005 | Crypto shredding: una clave por usuario en un almacén separado; borrar la clave borra los datos. | Accepted | no declara | Datos personales y médicos; borrar datos en sistemas distribuidos con backups es difícil (`:15-17`) | Caché de corta vida de datos sin cifrar para rendimiento (`:35`); si una clave se filtra ya no se puede borrar por este medio (`:39`) | no declara cualidad por nombre | `4.ADRs/005-use-crypto-shredding.md:11-43` |
| 006 | Usar producto comprado (COTS) para foros; se sugiere Vanilla Forums. | Under evaluation | Comercial u open source frente a desarrollo propio (`:23`) | Recursos limitados; invertir solo en dominios que diferencian: Medical como core, y Analytics (`:15-21`) | Integrar productos externos es difícil; puede que ninguno sirva (`:38-42`) | no declara | `4.ADRs/006-consider-buy-vs-build.md:11-46` |
| 008 | Almacén de grafo para datos de analítica. | Confirmed | Relacional, documento, blob (`2.SolutionBackground/DataStore.md:18-50`) | Óptimo para análisis rápido y datos no estructurados y muy conectados (`:15`) | Capacitar personal o contratar (`:29`) | "Meets the requirements of analytics" (`:25`) | `4.ADRs/008-We-will-use-a-graph-store-for-analytics.md:11-33` |
| 009 | Blob storage (S3) para contenido grande y estático. | Confirmed | Relacional, documento, grafo (`DataStore.md:18-50`) | Óptimo para datos grandes y estáticos (`:15`); coincide con Farmacy Foods (`:26`) | El equipo necesita conocer varias formas de almacenar (`:30`) | no declara | `4.ADRs/009-We-will-use-a-blob-storage-for-static-content.md:11-30` |
| 010 | Solución estándar para guardar datos médicos; se sugiere considerar Skyflow. | Confirmed | no declara | Evitar reinventar la rueda y cometer errores con datos médicos (`:15`; origen en `RAID.md:10`) | Evaluar proveedores puede llevar tiempo (`:29`) | no declara | `4.ADRs/010-We-will-use-a-secure-data-solution.md:11-29` |
| 011 | Partir el dominio User en Customer, Administrator y Medical; Clinic como rol Medical Admin. | Confirmed | Tabla: Dietician y Clinic "could be merged" (`ArchitectureAnalysis.md:76-77`) | Análisis de granularidad (`:15`) | Diferencias entre Clinic y Dietician a tener en cuenta en el código (`:30`) | Tolerancia a fallos (`:26`) | `4.ADRs/011-We-will-separate-the-user-domain.md:11-30` |
| 012 | No partir el dominio Security: autenticación y autorización juntas. | Confirmed | Separarlas (`:15`) | El sistema no opera si falta una; se evita el costo de dividir (`:15, :25`) | Workflows distintos (orquestadores); cuello de botella de despliegue si crece (`:30-31`) | no declara | `4.ADRs/012-We-will-combine-authentication-and-athorisation.md:11-31` |
| 013 | Community en funciones de admin y cliente, con interfaz a clases, foros y eventos (8 subdominios). | Confirmed | COTS o desarrollo propio detrás de la interfaz (`:15`) | Separar admin de cliente; posible COTS (`:15`) | Código compartido, solo el que no sea de alta seguridad (`:32`) | Tolerancia a fallos, autorización (`:26-27`) | `4.ADRs/013-We-will-split-community-domain.md:11-32` |
| 014 | Media en admin y cliente, con interfaz al almacenamiento de medios. | Confirmed | COTS o desarrollo propio (`:15`) | Separar admin de cliente; posible COTS (`:15`) | Código compartido (`:32`) | Tolerancia a fallos, autorización (`:26-27`) | `4.ADRs/014-We-will-split-media-domain.md:11-32` |
| 015 | Analytics en Administración, Ejecución y Guardado/Acceso, con interfaz a cada uno. | Confirmed | COTS o desarrollo propio (`:15`) | Admin separado para que su fallo no afecte; Run y Store separados por volatilidad de código al desplegar (`:15`) | Código compartido; podría ser otro subdominio (`:32`) | Tolerancia a fallos, autorización (`:26-27`) | `4.ADRs/015-We-will-split-analytics-domain.md:11-32` |
| 016 | Messaging en Subscription, Message, Notification y Email, con interfaz a cada uno. | Confirmed | COTS o desarrollo propio (`:15`) | Que un fallo de mensajería no impida suscribirse; Notification se relaciona con Message y Subscription a la vez (`:15`) | Código compartido (`:31`) | Tolerancia a fallos (`:26`) | `4.ADRs/016-We-will-split-messaging-domain.md:11-31` |
| 017 | Medical en Admin y Customer, con interfaz a cada uno. | Confirmed | no declara | Aislar fallos y por autorización (`:15`) | Código compartido (`:32`) | Tolerancia a fallos, autorización (`:26-27`) | `4.ADRs/017-We-will-split-medical-domain.md:11-32` |
| 018 | Una Interface única para integración sistema-sistema, con autenticación y autorización del sistema externo. | Confirmed | no declara | Tres integraciones: dos con Foods (Customer, Analytics), una con Clinics (datos) (`:15`) | Si se entra por otra vía se saltea la Interface; hace falta zero trust (`:31`) | Interoperabilidad (por `ArchitectureAnalysis.md:57`) | `4.ADRs/018-use-interface-for-system-system-integration.md:11-31` |
| 019 | Cuenta de usuario con autenticación y autorización para integración humano-sistema; autenticación extra en datos de alta seguridad. | Confirmed | no declara | Seis integraciones humanas: dos con Dietician, cuatro con Clinics (`:15`) | Si se entra por otra vía se saltea la autenticación; zero trust (`:30`) | Autorización (por `ArchitectureAnalysis.md:24`) | `4.ADRs/019-use-auth-for-human-system-integration.md:11-30` |

No incluido: ADR 001 (adoptar ADR, `4.ADRs/001We-are-using-ADRs-(template).md`). No existe ADR 007 en el repositorio [HUECO].

## 4. Hallazgos para el curso

#### H01 · Elegir estilo a partir de las características priorizadas
- Idea: el estilo sale de comparar candidatos contra las características elegidas, y la elección se queda con el que tiene menos trade-offs, no con uno sin ellos.
- Lo que hizo el equipo: [DATO] eligió 7 características y marcó 3 como top: interoperabilidad, configurabilidad y autorización (`1.ProblemBackground/ArchitectureAnalysis.md:18-26`). Con la matriz de estilos quedaron dos candidatos, microservicios y event-driven (`2.SolutionBackground/ArchitecturePatterns.md:30`), cada uno con pros, contras y mitigaciones (`:34-48`). Concluyó que event-driven tiene menos trade-offs (`:52`) y lo registró en ADR 002.
- Razón declarada: microservicios puntúa bajo en workflow, necesario para el onboarding, exige partir la base de datos con cada servicio y puntúa mal en costo y simplicidad (`ArchitecturePatterns.md:36-40`); event-driven puntúa alto en workflow (`:48`).
- Costo o trade-off admitido: interoperabilidad y configurabilidad puntúan bajo en event-driven (`ArchitecturePatterns.md:46`); se mitiga con una interfaz de integración y notando que la configurabilidad que importa es la del perfil, no la del sistema (`:46-47`); ADR 002 deja como riesgo que sigan siendo trade-offs altos (`4.ADRs/002-We-will-use-an-event-driven-backend-architecture.md`).
- Alternativas que nombra: microservicios.
- Estado: Confirmed.
- Fuente: `ArchitecturePatterns.md:8-56`; `4.ADRs/002-We-will-use-an-event-driven-backend-architecture.md:11-33`; `ArchitectureAnalysis.md:18-26`.
- Completitud: completo (los puntajes concretos están en una imagen).
- Contexto para contarlo: qué es una característica de arquitectura; Farmacy Family y su integración con Foods; qué es event-driven.
- Depende de imagen: sí (`assets/images/architectural-styles-marked.png`).
- Verificado: [ ]

#### H02 · Promover una característica implícita por un requisito concreto
- Idea: una cualidad que suele darse por sentada sube a prioridad cuando un requisito la vuelve central.
- Lo que hizo el equipo: [DATO] puso Authorisation entre las 3 top aunque normalmente es implícita, porque clínicas y dietistas necesitan autorización del cliente para ver datos médicos (`ArchitectureAnalysis.md:24`). La configurabilidad se justifica por el control fino del cliente sobre su perfil (`:23`; requisito 7 en `BusinessGoalsDriversAndRequirements.md:122-124`).
- Razón declarada: acceso a datos médicos solo con permiso del cliente (`ArchitectureAnalysis.md:24`; `Clarifications.md:14`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `ArchitectureAnalysis.md:23-35`; `Clarifications.md:14`.
- Completitud: ilustrativo (se enlaza con ADR 019, pero no hay decisión propia sobre la promoción).
- Contexto para contarlo: características explícitas e implícitas; clínica, dietista y cliente comprometido.
- Depende de imagen: no.
- Verificado: [ ]

#### H03 · Características por dominio llevan a una arquitectura distribuida
- Idea: si distintas partes del sistema necesitan distintas cualidades, eso empuja a separarlas.
- Lo que hizo el equipo: [DATO] asignó características a cada dominio (Users, Security, Data Store, Class, Event, Forum, Media, Analytics, Messaging, Medical, Interface) y lo clasificó como core, supportive o generic (`ArchitectureAnalysis.md:45-57`). Concluye que aun las características compartidas lo son por dominios que no se superponen, lo que lleva a una arquitectura distribuida (`:61`).
- Razón declarada: `ArchitectureAnalysis.md:61`.
- Costo o trade-off admitido: despliegue, backup y recuperación tienen que tener en cuenta estas características (`:61`).
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `ArchitectureAnalysis.md:39-63`.
- Completitud: parcial (el argumento visual está en el diagrama de Venn).
- Contexto para contarlo: qué es un quantum o un dominio; las características top.
- Depende de imagen: sí (`assets/diagrams/CharacteristicsVennDiagram.png`).
- Verificado: [ ]

#### H04 · Granularidad con criterios explícitos: partir por fallo, por seguridad y por volatilidad
- Idea: cada corte de un dominio se justifica con un criterio nombrado; dos piezas que dependen una de otra se pueden separar igual por otra razón.
- Lo que hizo el equipo: [DATO] tabuló cada función por volatilidad, escalabilidad, tolerancia a fallos, seguridad de datos, transacciones, dependencias y workflow (`ArchitectureAnalysis.md:73-143`) y escribió un ADR por dominio (011, 013–017). En Analytics separó Administración para que su fallo no afecte resultados ni ejecución, y separó Run de Store/Access no por tolerancia a fallos, porque Run necesita Store, sino por la volatilidad del código al desplegarlos juntos (`4.ADRs/015-We-will-split-analytics-domain.md:15`). En Messaging separó Subscription para que un fallo de mensajería no impida suscribirse, y dejó Notification aparte porque se relaciona con Message y con Subscription a la vez (`4.ADRs/016-We-will-split-messaging-domain.md:15`).
- Razón declarada: las citadas; consecuencias comunes: funciones sin superposición, fallos aislados (`015:25-27`); autorización separada entre admin y cliente (`015:27`).
- Costo o trade-off admitido: código compartido, limitado al que no es de alta seguridad (`015:32`, `013:32`, `014:32`), o separado en su propio subdominio (`016:31`).
- Alternativas que nombra: en la tabla, uniones posibles ("could be merged") entre funciones (`ArchitectureAnalysis.md:76-77, 96-103`).
- Estado: Confirmed.
- Fuente: `ArchitectureAnalysis.md:67-145`; ADR 011, 013, 014, 015, 016, 017.
- Completitud: completo.
- Contexto para contarlo: volatilidad de código; tolerancia a fallos; qué son los dominios Analytics y Messaging del caso.
- Depende de imagen: no.
- Verificado: [ ]

#### H05 · Decidir no partir: autenticación y autorización juntas
- Idea: el mismo análisis de granularidad puede concluir que separar cuesta más de lo que da.
- Lo que hizo el equipo: [DATO] dejó autenticación y autorización en un solo dominio Security (`4.ADRs/012-We-will-combine-authentication-and-athorisation.md`). La tabla anota para ambos "Don't want one without the other" (`ArchitectureAnalysis.md:86-87`).
- Razón declarada: el sistema necesita las dos y no opera si una cae, así que se evita el costo de dividir; el código de seguridad se comparte fácil (`012:15, 25-26`).
- Costo o trade-off admitido: workflows distintos (se manejarían con orquestadores) y riesgo de cuello de botella de despliegue si el dominio crece (`012:30-31`).
- Alternativas que nombra: separar las dos responsabilidades (`012:15`).
- Estado: Confirmed.
- Fuente: `4.ADRs/012-We-will-combine-authentication-and-athorisation.md:11-31`; `ArchitectureAnalysis.md:82-89`.
- Completitud: completo.
- Contexto para contarlo: autenticación frente a autorización; granularidad.
- Depende de imagen: no.
- Verificado: [ ]

#### H06 · La función prioritaria pide aislamiento e interfaces intercambiables
- Idea: lo que el cliente declara prioritario define dónde se invierte en tolerancia a fallos, y una interfaz deja abierta la elección entre comprar y construir.
- Lo que hizo el equipo: [DATO] la comunidad es la prioridad (`Clarifications.md:16`); la tolerancia a fallos se eligió porque la comunidad tiene foros, eventos y clases y "one small problem could take the whole community domain down" (`ArchitectureAnalysis.md:26`). ADR 013 separa admin y cliente y pone una interfaz delante de clases, foros y eventos: 8 subdominios (`4.ADRs/013-We-will-split-community-domain.md`).
- Razón declarada: separar admin y cliente, y que cada sección pueda ser COTS o propia (`013:15`); poder cambiar la implementación "with minimal changes to code" (`013:19, 28`).
- Costo o trade-off admitido: código compartido, solo el que no es de alta seguridad (`013:32`).
- Alternativas que nombra: COTS o desarrollo propio para cada sección (`013:15`).
- Estado: Confirmed.
- Fuente: `4.ADRs/013-We-will-split-community-domain.md:11-32`; `ArchitectureAnalysis.md:26`; `Clarifications.md:16`.
- Completitud: completo.
- Contexto para contarlo: Farmacy Family y su comunidad (foros, eventos, clases); COTS.
- Depende de imagen: no.
- Verificado: [ ]

#### H07 · Comprar lo genérico, construir lo que diferencia
- Idea: con recursos limitados, el desarrollo propio va a los dominios que distinguen al negocio y el resto se compra.
- Lo que hizo el equipo: [DATO] declaró Medical como dominio core y Analytics como diferenciador; para foros, eventos y clases propone alternativas comerciales u open source; decide COTS para foros y sugiere Vanilla Forums, que además trae eventos (`4.ADRs/006-consider-buy-vs-build.md:17-27`). El supuesto 2 deja fuera la analítica de foros, eventos, clases y media para poder evaluar COTS más fácil (`ConstraintsAndAssumptions.md:17`).
- Razón declarada: startup con recursos limitados (`006:15`).
- Costo o trade-off admitido: integrar productos externos es difícil; puede que ninguno sirva (`006:38-42`); renunciar a analítica de comunidad en el inicio (`ConstraintsAndAssumptions.md:17`).
- Alternativas que nombra: desarrollo propio frente a comercial u open source.
- Estado: Under evaluation.
- Fuente: `4.ADRs/006-consider-buy-vs-build.md:9-46`; `ConstraintsAndAssumptions.md:17`; `Clarifications.md:17`; clasificación core/generic en `ArchitectureAnalysis.md:45-57`.
- Completitud: parcial (estado "Under evaluation"; la decisión sobre eventos y clases queda abierta).
- Contexto para contarlo: dominio core; COTS; la comunidad del caso.
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · No construir la bóveda de datos médicos
- Idea: para el dato de más riesgo, usar un producto especializado reduce la posibilidad de errores propios.
- Lo que hizo el equipo: [DATO] el RAID registra que los datos médicos son valiosos para atacantes y propone un COTS de alta seguridad para dar acceso a terceros (`1.ProblemBackground/RAID.md:10`); ADR 010 decide una solución estándar y sugiere considerar Skyflow (`4.ADRs/010-We-will-use-a-secure-data-solution.md`).
- Razón declarada: "to avoid reinventing the wheel and the possibility of making mistakes" (`010:15`).
- Costo o trade-off admitido: evaluar varios proveedores lleva tiempo (`010:29`).
- Alternativas que nombra: no declara.
- Estado: Confirmed.
- Fuente: `4.ADRs/010-We-will-use-a-secure-data-solution.md:11-29`; `RAID.md:10`.
- Completitud: parcial (no nombra alternativas; el producto queda como sugerencia).
- Contexto para contarlo: datos médicos compartidos con clínicas por permiso del cliente.
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · Borrar datos en un sistema distribuido: crypto shredding
- Idea: si los datos están cifrados con una clave por usuario guardada aparte, borrar la clave equivale a borrar los datos, incluso en backups.
- Lo que hizo el equipo: [DATO] un almacén de claves separado, una clave por usuario, nunca junto a los datos cifrados; borrar la clave vuelve irrecuperables los datos una vez eliminados los backups del almacén de claves o de los datos (`4.ADRs/005-use-crypto-shredding.md:21-23`).
- Razón declarada: los usuarios pueden querer que se borren todos sus datos y eso es difícil en sistemas distribuidos con backups (`005:15-17`).
- Costo o trade-off admitido: caché de corta vida con datos sin cifrar para mantener el rendimiento (`005:35`); si una clave se filtra, ya no se puede borrar por este medio (`005:39`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `4.ADRs/005-use-crypto-shredding.md:11-43`.
- Completitud: parcial (no declara alternativas).
- Contexto para contarlo: datos personales y médicos; qué es una clave de cifrado; backups.
- Depende de imagen: no.
- Verificado: [ ]

#### H10 · Eventos de dominio y el problema de la doble escritura
- Idea: comunicar por eventos desacopla, pero obliga a resolver qué pasa si se guarda y no se publica, o si un evento llega dos veces.
- Lo que hizo el equipo: [DATO] eventos de dominio con lenguaje del negocio, formato CloudEvents (`4.ADRs/003-component-communication.md:20-23`). Para la doble escritura y la entrega al menos una vez: outbox al publicar (guardar el evento, confirmar, y que otro proceso lo envíe y lo marque) e inbox al suscribirse (guardar, confirmar, y procesar aparte) (`4.ADRs/004-use-inbox-outbox-pattern.md:22-23`). El README cita a Kleppmann sobre por qué la doble escritura es mala idea (`README.md:58`).
- Razón declarada: maximizar el desacoplamiento (`003:15-16`); evitar inconsistencias por doble escritura y tolerar eventos repetidos (`004:15-18`).
- Costo o trade-off admitido: consistencia eventual nueva para algunos desarrolladores; idempotencia obligatoria (`003:36-37`); inbox requiere sondeo o detección de cambios y procesos separados (`004:38-39`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `4.ADRs/003-component-communication.md:11-42`; `4.ADRs/004-use-inbox-outbox-pattern.md:11-43`.
- Completitud: parcial (sin alternativas; los riesgos de 004 quedan como "TODO" en `004:43`).
- Contexto para contarlo: qué es un evento y un broker; entrega al menos una vez; idempotencia.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Persistencia políglota: un almacén por tipo de necesidad
- Idea: separar las necesidades de datos (generales, analíticas, contenido grande) permite elegir un tipo de almacén para cada una.
- Lo que hizo el equipo: [DATO] distinguió tres necesidades (`2.SolutionBackground/DataStore.md:10-12`), consideró relacional, documento, blob y grafo (`:18-50`), y decidió grafo para analítica (ADR 008) y blob para contenido estático (ADR 009). El almacén para datos no analíticos quedó sin decidir (`DataStore.md:112`).
- Razón declarada: grafo para datos muy conectados y análisis rápido (`008:15`); blob para archivos binarios grandes (`DataStore.md:36`), igual que Foods (`009:26`).
- Costo o trade-off admitido: capacitar o contratar para grafos (`008:29`); el equipo técnico necesita conocer varias formas de almacenar (`009:30`).
- Alternativas que nombra: relacional, documento (`DataStore.md:18-32`).
- Estado: Confirmed (008, 009).
- Fuente: `DataStore.md:8-114`; ADR 008, ADR 009.
- Completitud: parcial (el almacén de datos generales no está decidido).
- Contexto para contarlo: tipos de base de datos; qué datos analiza Family (resultados médicos, ubicación de heladeras).
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Un modelo de grafo pensado para las consultas
- Idea: las relaciones del modelo de datos se diseñan según las preguntas que se van a hacer.
- Lo que hizo el equipo: [DATO] una relación PREVIOUS_RESULT entre resultados hace más rápido ordenarlos que seleccionar todos y ordenar por fecha (`DataStore.md:67`); una heladera está ubicada en un Locale, así que el análisis dietario de una zona se aplica a esa heladera (`DataStore.md:80`); los tests se enlazan a necesidades (p. ej. azúcar en sangre con diabetes) (`DataStore.md:72`). El JSON del modelo contiene esas relaciones (`assets/diagrams/GraphDatastoreModel.json:314-322, 482`).
- Razón declarada: velocidad de consulta y análisis por coincidencia de patrones (`DataStore.md:66-67`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: guardar fecha como propiedad o como relación a nodos de fecha (`DataStore.md:59`).
- Estado: no declara (diseño inicial, `DataStore.md:54`).
- Fuente: `DataStore.md:52-107`; `GraphDatastoreModel.json`.
- Completitud: ilustrativo.
- Contexto para contarlo: base de grafos (nodo, relación); heladeras de Farmacy Foods.
- Depende de imagen: sí (`assets/diagrams/GraphDatastoreModel*.png`).
- Verificado: [ ]

#### H13 · Una sola puerta para los sistemas externos
- Idea: concentrar las integraciones sistema-sistema en una interfaz autenticada simplifica sumar socios, pero no reemplaza la defensa interna.
- Lo que hizo el equipo: [DATO] tabuló cada punto de integración con dirección, elementos, razón y mecanismo (`ArchitectureAnalysis.md:155-165`) y decidió una Interface con autenticación y autorización del sistema externo para las tres integraciones de sistema: dos con Foods y una con clínicas (`4.ADRs/018-use-interface-for-system-system-integration.md`). La interfaz también mitiga la interoperabilidad media de event-driven (`ArchitecturePatterns.md:47`).
- Razón declarada: facilitar nuevas integraciones; un solo punto que defender (`018:25-26`).
- Costo o trade-off admitido: quien entre por otra vía saltea la Interface; hacen falta zero trust y más controles de autorización (`018:31`).
- Alternativas que nombra: no declara.
- Estado: Confirmed.
- Fuente: `4.ADRs/018-use-interface-for-system-system-integration.md:11-31`; `ArchitectureAnalysis.md:153-169`.
- Completitud: parcial (sin alternativas).
- Contexto para contarlo: Farmacy Foods como sistema existente; clínicas.
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · Permisos heredados y autenticación extra para lo sensible
- Idea: el acceso humano se modela con cuentas y permisos, y lo más sensible pide un control adicional.
- Lo que hizo el equipo: [DATO] ADR 019 usa cuentas de usuario con autenticación y autorización para las seis integraciones humanas (dos con dietistas, cuatro con clínicas) y agrega autenticación extra o pruebas de "prove you are a human" para datos de alta seguridad (`4.ADRs/019-use-auth-for-human-system-integration.md`). El dietista hereda el permiso de la clínica asociada (`ArchitectureAnalysis.md:160`), con acceso fino total, parcial o nulo (`Conceptual.md:21`). Si cambia de clínica, solo accede a los mensajes de la clínica actual (`DataStore.md:104`).
- Razón declarada: proteger el sistema y facilitar nuevas autorizaciones (`019:25-26`).
- Costo o trade-off admitido: entrada por otra vía saltea la autenticación; zero trust (`019:30`).
- Alternativas que nombra: no declara.
- Estado: Confirmed.
- Fuente: `4.ADRs/019-use-auth-for-human-system-integration.md:11-30`; `Conceptual.md:18-22`; `DataStore.md:100-105`.
- Completitud: parcial (sin alternativas).
- Contexto para contarlo: cliente, clínica, dietista; autenticación y autorización.
- Depende de imagen: no.
- Verificado: [ ]

#### H15 · Extender un sistema existente enganchándose a sus eventos
- Idea: una ampliación puede reutilizar el log de eventos del sistema que ya existe, a cambio de pedirle que emita eventos de integración más ricos.
- Lo que hizo el equipo: [DATO] Family se suma al despliegue AWS de Foods enganchándose a los streams de Kafka ya desplegados y reutiliza componentes existentes (`2.SolutionBackground/Deployment.md:20-22`). Foods ya emite eventos de dominio y debe extenderse a eventos de integración con origen y tipo de carga (`3.ViewsAndPerspectives/CommunicationView/README.md:10-12, 21`); los pedidos y los eventos de desperdicio de heladeras alimentan la analítica de ubicación de productos (`:22-25`). Si Foods y Family se hicieran en paralelo, podrían compartir el log sin interfaces específicas (`Roadmap.md:8`).
- Razón declarada: menor complejidad de despliegue y consistencia con Foods (`Deployment.md:20-22`).
- Costo o trade-off admitido: hay que modificar Foods para emitir más información (`CommunicationView/README.md:11`; `ConstraintsAndAssumptions.md:8`).
- Alternativas que nombra: log compartido si se desarrollaran en paralelo (`Roadmap.md:8`).
- Estado: no declara (se apoya en ADR 003).
- Fuente: `Deployment.md:8-24`; `CommunicationView/README.md:6-25`; `Roadmap.md:8`.
- Completitud: parcial (sin ADR propio; detalle en diagramas).
- Contexto para contarlo: Farmacy Foods y su arquitectura de eventos; Kafka como log.
- Depende de imagen: sí (`assets/diagrams/aws-deployment.png`, `assets/diagrams/ffood-communication.png`).
- Verificado: [ ]

#### H16 · Ordenar la construcción: primero la integración, luego lo que ya da valor
- Idea: el plan de iteraciones arranca por el riesgo de integración y adelanta la pieza que puede funcionar sola.
- Lo que hizo el equipo: [DATO] primera iteración: interfaces entre Foods y Family, para descubrir cambios inesperados en Foods (`2.SolutionBackground/Roadmap.md:20-30`). Segunda: analítica y su almacén, para analizar datos de Foods antes de que el resto de Family exista (`:34-42`). Luego, por preocupaciones de los interesados: usuarios, comunidad, médico, analítica médica, recursos (`:46-61`). Advierte acordar el formato de los eventos para evitar volatilidad en los contratos (`:52`).
- Razón declarada: las citadas.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara (segunda iteración "suggested", `:32`).
- Fuente: `Roadmap.md:8-67`.
- Completitud: ilustrativo.
- Contexto para contarlo: Foods existente; dominios de Family.
- Depende de imagen: no.
- Verificado: [ ]

#### H17 · Fitness functions para gobernar las decisiones
- Idea: el cumplimiento de las decisiones de arquitectura se puede verificar como un test que falla.
- Lo que hizo el equipo: [DATO] prevé fitness functions; el incumplimiento se corrige como un test fallido, o se registra la nueva decisión en un ADR y se actualiza la función (`ArchitectureAnalysis.md:179`); opciones a investigar: CloudWatch, Kibana, Lambdas (`:183-185`). La tarea quedó sin hacer (`:193`).
- Razón declarada: el cumplimiento de decisiones de arquitectura suele olvidarse en criterios de aceptación (`:175`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: CloudWatch, Kibana, Lambdas como opciones (`:183-185`).
- Estado: Open (next step sin marcar, `:193`).
- Fuente: `ArchitectureAnalysis.md:173-193`.
- Completitud: ilustrativo (sin funciones concretas).
- Contexto para contarlo: qué es una fitness function; ADR.
- Depende de imagen: no.
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `2.SolutionBackground/ArchitecturePrinciples.md`: principios genéricos (modular, seguro desde el inicio, extensible) sin decisión ni costo asociado al caso.
- `2.SolutionBackground/Security.md`: lista de servicios AWS por área como opciones, sin elección; la política de contraseñas (`:47`) es práctica general, no arquitectura del caso.
- `3.ViewsAndPerspectives/Infrastructure/README.md`: vacío.
- `3.ViewsAndPerspectives/FunctionalView/README.md`, `scenarios/README.md`, `EventStorming/README.md`, `C4Models/README.md`: texto explicativo de cada método; el contenido está en diagramas.
- `1.ProblemBackground/README.md`, `2.SolutionBackground/README.md`, `3.ViewsAndPerspectives/README.md`, `4.ADRs/README.md`: índices de navegación.
- `4.ADRs/001We-are-using-ADRs-(template).md`: adopción de ADR, sin decisión de arquitectura del sistema.
- `assets/docs/working-storage/`: frases de guion de la presentación (personas ficticias Miriam y Oliver); no contienen decisiones.
- `_config.yml`, `.gitattributes`, `.gitignore`, `assets/css/style.scss`: configuración del sitio y del repositorio.
- `Glossary.md`: útil solo como referencia de términos.

## 6. Imágenes para fase 2

- `assets/images/architectural-styles-marked.png`: matriz de estilos con puntajes y las características marcadas; base de H01 y de "Four of seven" en ADR 002. Citada en `2.SolutionBackground/ArchitecturePatterns.md:24`.
- `assets/diagrams/CharacteristicsVennDiagram.png`: características compartidas por dominios; base de H03. `1.ProblemBackground/ArchitectureAnalysis.md:63`.
- `assets/diagrams/ContextDiagram.png`: C4 nivel 1. `2.SolutionBackground/Conceptual.md:24`; `C4Models/README.md:21`.
- `assets/diagrams/ContainerDiagram.png`: dominios de Family y su relación con Foods. `Conceptual.md:30`; `Roadmap.md:67`; `C4Models/README.md:27`.
- `assets/diagrams/MedicalComponentDiagram.png`, `UserComponentDiagram.png`, `AnalyticsComponentDiagram.png`: servicios desplegables por dominio. `Conceptual.md:44, 53, 62`.
- `assets/diagrams/GraphDatastoreModel.png` y las cuatro vistas `GraphDatastoreModel-MedicalAnalysis.png`, `-FarmacyFoods.png`, `-Community.png`, `-Messaging.png`: modelo de grafo; base de H12. `DataStore.md:62-107`.
- `assets/diagrams/aws-deployment.png`: despliegue enganchado a Kafka de Foods; base de H15. `Deployment.md:24`.
- `assets/diagrams/high-level-infrastructureV2.png`: infraestructura de alto nivel con tecnologías sugeridas. `Deployment.md:14`.
- `assets/diagrams/ffood-communication.png`: comunicación Foods–Family por eventos. `CommunicationView/README.md:15`.
- `assets/diagrams/Scenario-OnboardFFoodsCustomer.png`, `Scenario-ShareProfileWithClinic.png`, `Scenario-RequestDieticianAdvice.png`: flujos de los 3 escenarios significativos. `ActorsActionsAndSignificantScenarios.md:29, 35, 41`.
- `assets/images/ff-archcolider_Overview_v1.png`: sistema Farmacy Foods existente (de ArchColider). `Roadmap.md:14`.
- Event storming por requisito (`01CustomerProfile.png`, `02GeographicalTrendAnalysis.png`, `04DieticianAdviceAndInteraction.png`, `08ThirdPartyRelationships.png`, `09HolisticUX.png`, `10CustomerEngagement.png`): eventos de dominio. `EventStorming/README.md:38-56`. Prioridad baja.
- `assets/diagrams/FunctionalView.png`: sistema como caja negra con actores reales. `FunctionalView/README.md:16`. Prioridad baja.

## 7. Preguntas abiertas

- ¿Cuáles son las cuatro de siete características que puntúan alto en ADR 002 (`002:25`)? Requiere la matriz de estilos.
- `ArchitecturePatterns.md:46` dice que interoperabilidad puntúa "fairly low" en event-driven y `:47` dice "middling"; ¿cuál vale? Requiere la matriz.
- ¿Existió un ADR 007? El índice salta de 006 a 008 (`4.ADRs/README.md:18-20`).
- ADR 003 remite al ADR de doble escritura con "TODO add link" (`003:38`); se infiere que es el 004 [DEDUCCIÓN: por el contexto de `004:15-16`].
- El contexto de ADR 009 repite la frase de ADR 008 sobre "analysis ... highly connected data" (`009:15` frente a `008:15`); ¿es la razón real o un copiado?
- ADR 011 parte Users en Customer, Administrator y Medical (`011:19`), pero la tabla habla de Customer, Dietician, Clinic y Administrator (`ArchitectureAnalysis.md:75-78`); ¿dónde va Dietician? Puede estar en `UserComponentDiagram.png`.
- Estados mixtos: "Accepted" (003, 004, 005), "Confirmed" (002, 008–019), "Under evaluation" (006); el texto no explica si significan lo mismo.
- ¿Qué almacén guarda los datos no analíticos (perfiles, RSVP)? Queda como próximo paso (`DataStore.md:112`).
- `README.md:7` dice "Spring 2021" y `README.md:1, 3` dicen Autumn/Fall 2021.
- `DataStore.md:8` habla de "Farmacy Foods system" en el documento de almacenes de Family; se infiere que se refiere a Family [DEDUCCIÓN: por el resto del documento].
- ¿Cómo se relaciona la bóveda COTS de ADR 010 con el crypto shredding de ADR 005 y el grafo de ADR 008 que guarda resultados médicos? El texto no lo resuelve; quizá en `MedicalComponentDiagram.png`.
