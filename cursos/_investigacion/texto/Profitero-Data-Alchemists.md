# Profitero-Data-Alchemists · investigación de texto (fase 1)

Rutas relativas a `katas-src/Profitero-Data-Alchemists/`. Archivos de texto leídos: 27 (README raíz, 8 README de viewpoints y perspectiva, 16 ADR incluida la plantilla, requisitos originales, `.gitignore`). No se leyó `KATAS 2023 - final presentation.pptx` (office, fuera de esta fase).

## 1. El caso

[DATO] Road Warrior es una startup independiente (no afiliada a una agencia de viajes) que quiere un panel de gestión de viajes donde el viajero ve todas sus reservas existentes organizadas por viaje, en web o en el móvil (`requirements/original_requirements.md:4-5`, `:36-38`). [DATO] Volumen: 2 millones de usuarios activos por semana y 15 millones de cuentas (`requirements/original_requirements.md:8-9`); cualquiera de los 15 millones puede activarse en cualquier momento (`:94-96`). [DATO] Funciones pedidas: leer el correo buscando reservas, con filtros y listas blancas; conectarse con las interfaces de aerolíneas, hoteles y alquiler de autos para actualizar retrasos, cancelaciones y cambios de puerta; altas, cambios y bajas manuales; agrupar por viaje y retirar los elementos al terminar el viaje; compartir en redes o con personas elegidas; informes anuales para el usuario; datos analíticos de tendencias y preferencias de proveedores (`:12-20`). [DATO] Integración con SABRE y APOLLO, con la agencia preferida del usuario (botón "help me!") y funcionamiento internacional (`:24-26`). [DATO] Restricciones duras: como máximo 5 minutos al mes de caída no planificada; actualizaciones visibles en la app dentro de 5 minutos desde que la fuente las genera; respuesta web de 800 ms y first-contentful paint móvil por debajo de 1,4 s (`:29-31`). [DATO] El reloj de los 5 minutos empieza cuando Road Warrior recibe la actualización, no cuenta la latencia del proveedor de correo (`:90-92`). [DATO] Hoy solo aerolínea, hotel y auto, pero hay que anticipar tren, bus y otros (`:44-46`). [DATO] Plazo: MVP lo antes posible; presupuesto y madurez del equipo quedan "a criterio" por ser startup (`:110-120`). [DATO] Los cambios hechos en la app se reflejan de inmediato (`:126-128`).

## 2. Qué entregó el equipo

- `README.md`: documento principal. Caso de negocio, requisitos reescritos (funcionales, no funcionales, supuestos), características de arquitectura, resumen de cada viewpoint, índice de ADR e hitos de implementación (`README.md:48-478`).
- `requirements/original_requirements.md`: enunciado original de la kata y 28 preguntas y respuestas.
- `functional_viewpoint/README.md`: flujo principal y ocho flujos funcionales (perfil, descubrimiento por correo, reservas, seguimiento, viajes, compartir, agencias, informes), con restricciones funcionales.
- `context_viewpoint/README.md`: diagramas C4 nivel 1 (contexto), nivel 2 (contenedores) y nivel 3 (diez contenedores explicados).
- `operational_viewpoint/README.md`: los cuatro usos básicos (login, configuración, armar viaje, compartir) contados en prosa.
- `information_viewpoint/README.md`: modelo de datos NoSQL, nueve entidades con "Decisions", campos y enlaces; registro de revisiones del documento.
- `concurrency_viewpoint/README.md`: tres grupos de escalado y cómo escala cada uno (nivel 1 y 2).
- `development_viewpoint/README.md`: estructura del código, estrategia de merge (GitLab Flow), automatización frente a QA manual.
- `deployment_viewpoint/README.md`: dos entornos con IaC, red multizona, Kubernetes, Kafka y MongoDB autogestionados.
- `security_perspective/README.md`: lista de prácticas de seguridad (autenticación, cifrado, credenciales, pruebas, auditorías).
- `adrs/`: 15 ADR de decisión más una plantilla (`adr-0-template.md`).

Cuentas: [DATO] 15 ADR de decisión, todos con estado "Proposed" y la misma fecha (`adrs/adr-1-…` a `adr-15-…`, línea 6 de cada uno). [DATO] Requisitos reescritos: 9 grupos funcionales (`README.md:84-115`) y 4 grupos no funcionales (`README.md:120-134`), más 3 supuestos (`README.md:138-142`). [DATO] El inventario lista 42 imágenes; el texto remite a la mayoría como diagramas. 

Métodos: [DATO] Viewpoints and Perspectives de Rozanski y Woods, y C4 (`README.md:44-46`). [DATO] Architecture Styles Worksheet para elegir el estilo (`adrs/adr-1-architecture-style.md:9`). [DATO] Tabla de características con columna "Top" para marcar tres (`README.md:151-158`). [DATO] Compacted topics y particionado de Kafka como mecanismo de concurrencia (`concurrency_viewpoint/README.md:9-12`).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR-1 | Estilo event-driven para todo el sistema. | Proposed | no declara en el ADR (la elección se hizo con el worksheet, que está en imagen) | Es el estilo más adecuado para las tres características top tras evaluarlas con el Architecture Styles Worksheet. | Complejidad en flujos de eventos y consistencia de datos; prácticas operativas y monitoreo; curva de aprendizaje; riesgo de discrepancias de datos y de ruteo difícil de depurar. | Performance, Scalability, Evolvability; 15+ millones de usuarios. | `adrs/adr-1-architecture-style.md:6-29`; `README.md:160-164` |
| ADR-2 | Una capa de API como único punto de entrada para web y móvil. | Proposed | no declara | Picos de uso esperados; problemas de indisponibilidad, congelamientos y pérdida de datos. | Más complejidad; posible sobrecarga de rendimiento por la capa extra. | Picos de uso; seguridad (roles y permisos por endpoint). | `adrs/adr-2-api-layer.md:6-27` |
| ADR-3 | Lectores de datos síncronos por API. | Proposed | Comunicación síncrona frente a asíncrona (planteada en el contexto). | Acceso a datos en tiempo real y respuesta inmediata a las consultas. | Escalar es más difícil; retiene recursos (hilos) por petición; flujos de varios pasos complejos. | Performance, Scalability, Reliability. | `adrs/adr-3-data-reader.md:6-29` |
| ADR-4 | Actualizadores de datos asíncronos por mensajería. | Proposed | Síncrona frente a asíncrona. | Desacoplar los updaters del resto del sistema para adaptarse al rendimiento de la base de datos. | Complejidad de colas y reintentos; concurrencia y condiciones de carrera; manejo de errores no visible para el emisor. Riesgos: "TBD". | Performance, Scalability, Reliability. | `adrs/adr-4-data-updater.md:6-33` |
| ADR-5 | Trackers (correo y reservas) asíncronos por mensajería. | Proposed | Síncrona frente a asíncrona. | Desacoplar los trackers de las API externas para adaptarse al rendimiento de las API de correo y de agencias o sistemas de viaje. | Los mismos tres que ADR-4. Riesgos: "TBD". | Performance, Scalability, Reliability. | `adrs/adr-5-trackers.md:6-33` |
| ADR-6 | Servicio de compartir síncrono por API. | Proposed | Síncrona frente a asíncrona. | Compartir de forma inmediata y en tiempo real. | Los mismos tres que ADR-3. | Performance, Scalability, Reliability. | `adrs/adr-6-sharing.md:6-31` |
| ADR-7 | Publicadores (redes sociales y notificaciones) asíncronos por mensajería. | Proposed | Síncrona frente a asíncrona. | Desacoplar los publicadores de las API externas de notificación y redes. | Los mismos tres que ADR-4. Riesgos: "TBD". | Performance, Scalability, Reliability. | `adrs/adr-7-publishers.md:6-33` |
| ADR-8 | Tres grupos de escalado separados: API, lectores/actualizadores de datos, mensajería. | Proposed | no declara | Cada servicio escala según su carga; asignar recursos según necesidad real. | Complejidad de coordinar el escalado; monitoreo y métricas consistentes; servicios dependientes pueden saturarse entre sí. | Performance, reliability, costo. | `adrs/adr-8-scaling-groups.md:6-47` |
| ADR-9 | Topics para difusión y compacted topics que guardan solo el último mensaje por clave. | Proposed | no declara | Difundir eventos a varios suscriptores; con compactación, que el suscriptor reciba la información más reciente. | Gestión de suscriptores; rendimiento según cantidad de topics y volumen; balanceo de carga. Riesgos: "TBD". | no declara una cualidad concreta (escalabilidad en consecuencias) | `adrs/adr-9-topics.md:6-32` |
| ADR-10 | La misma clave de partición para el topic y la tabla correspondientes. | Proposed | no declara | Todas las actualizaciones de un mismo registro quedan en orden en la misma partición, sin colisiones. | La clave puede volverse subóptima si cambian los datos; fragmentación si se elige mal; complejidad de operar datos particionados. | Scalability, Performance, Load Balancing. | `adrs/adr-10-partitioning-key.md:6-29`; `concurrency_viewpoint/README.md:51` |
| ADR-11 | Dos monorepos: uno de frontend (web y móvil) y otro de backend; código compartido como librerías aparte. | Proposed | Multirepo (en el viewpoint de desarrollo). | Gestionar el desarrollo temprano y maximizar la reutilización; se puede dividir más adelante. | Tiempos de build; mejor para equipos chicos o medianos; pull requests más complejos. | Evolvability (en el viewpoint). | `adrs/adr-11-monorepos.md:6-31`; `development_viewpoint/README.md:15-21` |
| ADR-12 | GitLab Flow para frontend y backend. | Proposed | GitFlow (citado al comparar); otras estrategias en la tabla de imagen. | Restricciones del calendario de publicación de la app móvil; simplificar publicaciones conjuntas. | Riesgo de problemas de integración; menos control fino de la publicación; escala peor en proyectos grandes. | no declara una cualidad (frecuencia de publicación en consecuencias) | `adrs/adr-12-gitlab-flow.md:6-28`; `development_viewpoint/README.md:27-35` |
| ADR-13 | Despliegue multizona en una sola región, con balanceadores públicos con firewall. | Proposed | Multirregión (descartada). | Alcanzar el SLA; la multirregión suma costos de red entre regiones. | Complejidad; costo de hardware, red y transferencia entre zonas; latencia si hay sincronización frecuente entre zonas. | Availability (SLA 99,99 %). | `adrs/adr-13-infrastructure.md:6-29`; `deployment_viewpoint/README.md:14-15` |
| ADR-14 | Base NoSQL en clúster, MongoDB autogestionado en Kubernetes, con modelo orientado a objetos. | Proposed | no declara otra base; nombra la gestión propia por "razones similares" a las del broker. | Escalabilidad, disponibilidad y rendimiento; controlar costos con autogestión. | Sin transacciones ACID en general; consultas limitadas (joins); integridad de datos más costosa. | Availability, Performance, Scalability. | `adrs/adr-14-no-sql-database.md:6-31`; `information_viewpoint/README.md:5-7` |
| ADR-15 | Kafka open source autogestionado dentro de Kubernetes. | Proposed | no declara otro broker; el título y la decisión oponen "self-managed" sin nombrar la opción gestionada. | Soportar event-driven a escala; ahorro de costos en las primeras fases. | Complejidad de operar el clúster; sobrecarga operativa; gestión de configuración entre nodos. | Availability, Performance, Scalability. | `adrs/adr-15-message-broker.md:6-31`; `deployment_viewpoint/README.md:17` |

[DATO] Se excluye `adrs/adr-0-template.md` (plantilla; estados posibles "Proposed / Confirmed / Declined", `adrs/adr-0-template.md:6`). No hay ADR sobre cómo usar ADR.

[DATO] Hay decisiones fuera de los ADR, en los viewpoints: autenticación solo con Google, Apple o Microsoft (`functional_viewpoint/README.md:45`), un usuario con una sola integración de correo (`:47`), control de acceso solo a nivel de viaje con un viaje "unassigned" (`:55-58`), clave sustituta en lugar del PNR (`information_viewpoint/README.md:87-90`), itinerario como colección aparte de solo inserción (`:133-135`), automatización de pruebas solo en backend (`development_viewpoint/README.md:52-53`), Elasticity descartada del top tres a favor de Evolvability (`README.md:160`). Se recogen en los hallazgos.

## 4. Hallazgos para el curso

#### H01 · Elegir tres características y dejar una fuera con su razón
- Idea: priorizar características obliga a renunciar a alguna; la renuncia se apoya en lo que el negocio necesita.
- Lo que hizo el equipo: [DATO] marcó como top Performance, Scalability y Evolvability, y dejó Elasticity fuera del top tres aunque el sistema debe absorber picos en temporada (`README.md:151-160`). [DATO] Con esas tres eligió event-driven (`README.md:162`; `adrs/adr-1-architecture-style.md:9-12`).
- Razón declarada: [DATO] como startup, adaptarse a la reacción de los usuarios y al mercado es lo principal; su éxito depende de la agilidad para cambiar (`README.md:160`).
- Costo o trade-off admitido: [DATO] la elección se plantea como "faced with the choice between Elasticity and Evolvability" (`README.md:160`). [HUECO] No dice qué pierde el sistema en elasticidad; el viewpoint de concurrencia sigue nombrando la elasticidad como objetivo (`concurrency_viewpoint/README.md:5`).
- Alternativas que nombra: Elasticity como cuarta candidata; los demás estilos están en el worksheet (imagen).
- Estado: Proposed (ADR-1); la priorización no tiene estado propio.
- Fuente: `README.md:148-164`; `adrs/adr-1-architecture-style.md:6-29`.
- Completitud: *parcial*: falta qué se pierde al dejar Elasticity y los puntajes del worksheet (imagen).
- Contexto para contarlo: caso Road Warrior; qué es una característica de arquitectura; el requisito de picos en temporada.
- Depende de imagen: sí (`architecture_style/images/arch_style.jpg`).
- Verificado: [ ]

#### H02 · Leer síncrono, escribir asíncrono
- Idea: una misma entidad puede tener lecturas y escrituras con estilos de comunicación distintos, según lo que exige cada lado.
- Lo que hizo el equipo: [DATO] lectores de datos síncronos por API (ADR-3) y actualizadores asíncronos por mensajería (ADR-4). Cada entidad tiene un topic de actualizaciones, un microservicio updater que escribe en la tabla y un microservicio reader que la sirve (`context_viewpoint/README.md:125-127`, `:133-135`). [DATO] Lecturas y escrituras escalan por separado: los readers con balanceador y autoscaler (`concurrency_viewpoint/README.md:53-54`).
- Razón declarada: [DATO] lectura: respuesta inmediata a las consultas (`adrs/adr-3-data-reader.md:12-14`). Escritura: desacoplar los updaters para adaptarse al rendimiento de la base (`adrs/adr-4-data-updater.md:12-14`). [DATO] Separar lecturas porque su carga puede variar distinto que la de actualizaciones (`concurrency_viewpoint/README.md:54`).
- Costo o trade-off admitido: [DATO] lectura síncrona: escalar cuesta más y retiene hilos (`adrs/adr-3-data-reader.md:25-27`). Escritura asíncrona: complejidad, condiciones de carrera, errores no visibles para el emisor (`adrs/adr-4-data-updater.md:26-30`).
- Alternativas que nombra: síncrono frente a asíncrono, en el contexto de ambos ADR.
- Estado: Proposed.
- Fuente: `adrs/adr-3-data-reader.md`; `adrs/adr-4-data-updater.md`; `context_viewpoint/README.md:123-164`; `concurrency_viewpoint/README.md:47-56`.
- Completitud: *parcial*: [HUECO] no explica cómo se cumple que los cambios en la app se vean inmediatamente (`requirements/original_requirements.md:126-128`) si la escritura pasa por un topic.
- Contexto para contarlo: qué es un topic o cola; síncrono y asíncrono; los 800 ms de respuesta web.
- Depende de imagen: sí (`concurrency_viewpoint/images/Concurrency-Diagram-Level-2-Data-Managers.jpeg`).
- Verificado: [ ]

#### H03 · Aislar al sistema del ritmo de las API externas
- Idea: los componentes que hablan con servicios de terceros se desacoplan con mensajería para que la lentitud ajena no frene el resto.
- Lo que hizo el equipo: [DATO] trackers de correo y de reservas asíncronos (ADR-5); publicadores de redes y notificaciones asíncronos (ADR-7). [DATO] Las notificaciones entran a un topic `Incoming Notifications`, se filtran según la configuración del usuario y pasan a `Notifications To Send` (`context_viewpoint/README.md:87`).
- Razón declarada: [DATO] desacoplar de las API externas para adaptarse al rendimiento de las API de correo, agencias, notificaciones y redes (`adrs/adr-5-trackers.md:13`; `adrs/adr-7-publishers.md:13`).
- Costo o trade-off admitido: [DATO] complejidad, concurrencia, manejo de errores (`adrs/adr-5-trackers.md:26-30`). Riesgos "TBD".
- Alternativas que nombra: síncrono frente a asíncrono.
- Estado: Proposed.
- Fuente: `adrs/adr-5-trackers.md`; `adrs/adr-7-publishers.md`; `context_viewpoint/README.md:61-96`.
- Completitud: *parcial*: riesgos sin completar ("TBD"); la sección de consecuencias es igual en ADR-4, 5 y 7.
- Contexto para contarlo: Road Warrior consulta correos, agencias y SABRE/APOLLO; qué es un topic.
- Depende de imagen: no.
- Verificado: [ ]

#### H04 · El estado del seguimiento vive en un compacted topic
- Idea: un log compactado puede guardar la última versión de cada cosa y servir de lista de trabajo para seguir millones de reservas.
- Lo que hizo el equipo: [DATO] el `Reservation Tracker` agrega o quita reservas en un compacted topic particionado por la clave de la reserva; el `Itinerary Tracker` relee el topic, compara con la respuesta de la API de viajes y, si hay cambios, reescribe el mensaje; el `Reservations Updater` toma esos cambios (`concurrency_viewpoint/README.md:61-66`; `context_viewpoint/README.md:78-80`). [DATO] El tracker de correo guarda en el compacted topic `Email Addresses` la marca de tiempo del último correo procesado (`context_viewpoint/README.md:63-68`). [DATO] Volumen que se busca cubrir: 15 millones de usuarios con 5 o hasta 10 reservas activas, 150 millones de reservas refrescadas cada 5 minutos (`README.md:131`).
- Razón declarada: [DATO] el compacted topic retiene solo el último mensaje por clave para que los suscriptores reciban lo más reciente (`adrs/adr-9-topics.md:14`). [DEDUCCIÓN] de `concurrency_viewpoint/README.md:63-65`: el topic hace de estado del tracker sin una tabla aparte. El texto no lo dice con esas palabras.
- Costo o trade-off admitido: [DATO] gestión de suscriptores, rendimiento según cantidad de topics, balanceo (`adrs/adr-9-topics.md:25-29`).
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `adrs/adr-9-topics.md`; `concurrency_viewpoint/README.md:59-71`; `context_viewpoint/README.md:61-83`; `README.md:131`.
- Completitud: *parcial*: no hay alternativa nombrada ni cálculo de si 150 millones caben en 5 minutos.
- Contexto para contarlo: qué es un topic y qué es compactación; la cifra de 150 millones; el requisito de 5 minutos.
- Depende de imagen: sí (`concurrency_viewpoint/images/Concurrency-Diagram-Level-2-Messaging-Actors.jpg`).
- Verificado: [ ]

#### H05 · Misma clave de partición para ordenar las actualizaciones
- Idea: alinear la clave de partición del mensaje con la de la tabla garantiza que los cambios de un mismo registro se apliquen en orden, sin bloqueos.
- Lo que hizo el equipo: [DATO] topic y tabla comparten clave de partición; las actualizaciones del mismo registro quedan en orden en la misma partición (`adrs/adr-10-partitioning-key.md:12`). [DATO] Cada instancia del Itinerary Tracker se conecta a una o más particiones y nunca dos instancias a la misma (`concurrency_viewpoint/README.md:65`).
- Razón declarada: [DATO] evitar colisiones durante las actualizaciones y que el updater trabaje sin interrupciones de otros microservicios (`adrs/adr-10-partitioning-key.md:12`).
- Costo o trade-off admitido: [DATO] la clave puede quedar subóptima si cambian los patrones de datos; fragmentación si se elige mal; complejidad (`adrs/adr-10-partitioning-key.md:25-29`).
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `adrs/adr-10-partitioning-key.md`; `concurrency_viewpoint/README.md:51`, `:63-65`.
- Completitud: *parcial*: sin alternativas.
- Contexto para contarlo: qué es una partición; H02 y H04.
- Depende de imagen: no.
- Verificado: [ ]

#### H06 · Escalar por tipo de carga
- Idea: agrupar los servicios según qué dispara su trabajo permite escalar cada grupo con su propio criterio.
- Lo que hizo el equipo: [DATO] tres grupos: API (disparado por usuarios), lectores/actualizadores de datos (disparado por otros actores) y mensajería (procesa colas de tareas) (`adrs/adr-8-scaling-groups.md:12-30`). [DATO] Los actores de mensajería usan el topic como interfaz de entrada y microservicios con autoscaler (`concurrency_viewpoint/README.md:69`).
- Razón declarada: [DATO] asignar recursos según la necesidad real, evitar sobreaprovisionamiento (`adrs/adr-8-scaling-groups.md:9`, `:36`).
- Costo o trade-off admitido: [DATO] complejidad de coordinar el escalado; métricas consistentes; un servicio puede saturar a sus dependencias (`adrs/adr-8-scaling-groups.md:43-47`).
- Alternativas que nombra: no declara.
- Estado: Proposed.
- Fuente: `adrs/adr-8-scaling-groups.md`; `concurrency_viewpoint/README.md:19-37`.
- Completitud: *parcial*: sin alternativas.
- Contexto para contarlo: autoscaler y balanceador; los picos en temporada.
- Depende de imagen: sí (`concurrency_viewpoint/images/Concurrency-Diagram-Level-1.jpeg`).
- Verificado: [ ]

#### H07 · Multizona sí, multirregión no
- Idea: un objetivo de disponibilidad se cumple con el nivel de redundancia más barato que alcance, y se deja escrito qué se descartó.
- Lo que hizo el equipo: [DATO] traduce 5 minutos al mes a un SLA de 99,99 % (`README.md:121`); despliega en varias zonas de una sola región con balanceadores públicos con firewall (`adrs/adr-13-infrastructure.md:12`).
- Razón declarada: [DATO] alcanzar el SLA; descarta la multirregión por el costo de red entre regiones (`adrs/adr-13-infrastructure.md:12`).
- Costo o trade-off admitido: [DATO] complejidad, costo de red y transferencia entre zonas, latencia por sincronización entre zonas (`adrs/adr-13-infrastructure.md:25-29`).
- Alternativas que nombra: multirregión.
- Estado: Proposed.
- Fuente: `adrs/adr-13-infrastructure.md`; `deployment_viewpoint/README.md:14-15`; `README.md:121`.
- Completitud: *completo* (decisión, razón, costo y alternativa están en el texto). [HUECO] El requisito pide funcionar internacionalmente (`requirements/original_requirements.md:26`); el ADR no relaciona una sola región con eso.
- Contexto para contarlo: zona y región; qué significa 99,99 %.
- Depende de imagen: no (la imagen `deployment_viewpoint/images/deployment_env.jpg` ilustra).
- Verificado: [ ]

#### H08 · Operar uno mismo Kafka y MongoDB para ahorrar al comienzo
- Idea: autogestionar la infraestructura cambia costo de licencias o servicio por trabajo operativo.
- Lo que hizo el equipo: [DATO] Kafka open source autogestionado en Kubernetes (`adrs/adr-15-message-broker.md:12`); MongoDB autogestionado por razones similares (`adrs/adr-14-no-sql-database.md:12`). [DATO] En paralelo usa plataformas de terceros de DevOps y observabilidad para no invertir tiempo en montarlas (`deployment_viewpoint/README.md:7`).
- Razón declarada: [DATO] ahorro de costos en las primeras fases y alineación con la escalabilidad (`adrs/adr-15-message-broker.md:12`); controlar costos (`adrs/adr-14-no-sql-database.md:12`).
- Costo o trade-off admitido: [DATO] complejidad y sobrecarga operativa del clúster, gestión de configuración entre nodos (`adrs/adr-15-message-broker.md:27-31`).
- Alternativas que nombra: no declara. [DEDUCCIÓN] que se descartó un servicio gestionado se infiere de la recomendación de autogestión; ningún ADR lo nombra (`adrs/adr-14`, `adrs/adr-15`).
- Estado: Proposed.
- Fuente: `adrs/adr-14-no-sql-database.md`; `adrs/adr-15-message-broker.md`; `deployment_viewpoint/README.md:4-18`.
- Completitud: *parcial*: falta la alternativa gestionada y una cifra de ahorro.
- Contexto para contarlo: qué es un servicio gestionado y uno autogestionado; startup con MVP urgente.
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · Modelo NoSQL sin joins, con decisiones por entidad
- Idea: el modelo de datos se diseña por entidad, escribiendo el porqué de cada campo y clave.
- Lo que hizo el equipo: [DATO] tablas orientadas a objetos para evitar joins (`information_viewpoint/README.md:5-7`). [DATO] Clave sustituta en lugar de la clave natural PNR en la reserva (`:87-90`). [DATO] El itinerario se guarda en una colección aparte donde solo se lee y se inserta, nunca se actualiza; es el historial de versiones (`:128-135`). [DATO] Campos duplicados a propósito y campos dinámicos (`:136-137`). [DATO] El documento se reescribió con la pregunta 'por qué' en mente (`:313-317`).
- Razón declarada: [DATO] sin joins, mejor rendimiento de lectura y escritura; escalado horizontal por particiones (`:6-7`). Clave sustituta: rendimiento, cumplimiento de GDPR y reservas que no se pueden rastrear (traslados privados) (`:87-90`). Itinerario aparte: aliviar la carga de las actualizaciones (`:91-93`, `:133-135`).
- Costo o trade-off admitido: [DATO] sin ACID, consultas limitadas, integridad más costosa (`adrs/adr-14-no-sql-database.md:27-31`).
- Alternativas que nombra: clave natural PNR frente a clave sustituta (`information_viewpoint/README.md:87`).
- Estado: Proposed (ADR-14); las decisiones del modelo no tienen estado.
- Fuente: `information_viewpoint/README.md:5-295`; `adrs/adr-14-no-sql-database.md`.
- Completitud: *parcial*: [HUECO] no relaciona la falta de ACID con ningún flujo concreto de Road Warrior.
- Contexto para contarlo: clave natural y sustituta; PNR; qué es un join.
- Depende de imagen: sí (`information_viewpoint/images/information_viewpoint_1.jpg`).
- Verificado: [ ]

#### H10 · Un viaje sin asignar para no tener dos reglas de acceso
- Idea: una restricción funcional pequeña simplifica la autorización de todo el sistema.
- Lo que hizo el equipo: [DATO] el control de acceso se hace solo a nivel de viaje; cada usuario recibe al crear su perfil un viaje "unassigned" donde caen las reservas nuevas y las descubiertas por correo (`functional_viewpoint/README.md:55-58`, `:73`). [DATO] Al borrar un viaje, sus reservas vuelven al "unassigned" (`:115`). [DATO] La lista de control de acceso por viaje tiene roles desde lectura completa para co-viajeros hasta fechas y lugares para audiencias menos confiables (`information_viewpoint/README.md:195-198`).
- Razón declarada: [DATO] simplificar el control de acceso (`functional_viewpoint/README.md:55`); agilizar el trabajo con reservas (`information_viewpoint/README.md:165-167`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `functional_viewpoint/README.md:55-58`, `:110-118`; `information_viewpoint/README.md:158-202`.
- Completitud: *ilustrativo*: hay decisión y razón, sin costo ni alternativa.
- Contexto para contarlo: qué es un viaje en Road Warrior; compartir un viaje.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Recortar alcance con restricciones explícitas para el MVP
- Idea: escribir qué se limita a propósito acota el sistema y deja dicho qué se podrá abrir después.
- Lo que hizo el equipo: [DATO] integración solo con Gmail, Outlook e iCloud Mail (`README.md:140`); un usuario, una integración de correo (`functional_viewpoint/README.md:47`); identidad solo por Google, Apple o Microsoft, sin guardar contraseñas (`:45`); lista de agencias mantenida a mano por soporte en el MVP (`:142-143`; `information_viewpoint/README.md:211-212`); web primero y una sola plataforma móvil al inicio (`README.md:466`, `:473`).
- Razón declarada: [DATO] cubrir más usuarios con menos esfuerzo (`README.md:140`); la autenticación con esos proveedores simplifica integrar el correo (`functional_viewpoint/README.md:45`); la lista manual "acceptable for the MVP stage" (`information_viewpoint/README.md:211-212`). Un correo por usuario: no declara razón.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: [DATO] más de un correo por usuario en el futuro (`functional_viewpoint/README.md:47`); automatizar la lista de agencias (`:143`).
- Estado: no declara.
- Fuente: `README.md:140`; `functional_viewpoint/README.md:45`, `:47`, `:142-143`; `information_viewpoint/README.md:211-212`; `README.md:466`, `:473`.
- Completitud: *parcial*: faltan costos.
- Contexto para contarlo: qué es un MVP; las fuentes de reservas de Road Warrior.
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Un tipo de reserva genérico para lo que todavía no se rastrea
- Idea: un tipo "manual" absorbe lo que el sistema aún no integra y deja la puerta abierta a nuevas fuentes.
- Lo que hizo el equipo: [DATO] dos tipos de reserva: rastreables (aerolínea, hotel, auto) y "Appointment", manual, para eventos propios y para lo rastreable que todavía no se soporta, como trenes (`functional_viewpoint/README.md:83-89`). [DATO] Campo GEO dinámico para soportar tipos nuevos (`information_viewpoint/README.md:99-102`).
- Razón declarada: [DATO] que el usuario pueda gestionar todo su viaje sin importar el tipo (`functional_viewpoint/README.md:89`); el requisito pide anticipar tren y bus (`requirements/original_requirements.md:46`); "We must ensure we are able to extend this in future" (`functional_viewpoint/README.md:105`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `functional_viewpoint/README.md:83-89`, `:105`; `information_viewpoint/README.md:99-102`; `requirements/original_requirements.md:46`.
- Completitud: *ilustrativo*.
- Contexto para contarlo: los tipos de reserva de Road Warrior.
- Depende de imagen: no.
- Verificado: [ ]

#### H13 · Datos analíticos vendibles, anonimizados por la clave
- Idea: si un dato se vende a terceros, la granularidad de la clave decide cuánto se puede identificar a una persona.
- Lo que hizo el equipo: [DATO] informes mensuales para agencias solo con datos agregados, sin datos de usuario o reserva (`functional_viewpoint/README.md:154-156`). [DATO] La clave primaria del informe es período, agencia, región del usuario y región de la reserva, pensada para anonimizar sin perder granularidad útil (`information_viewpoint/README.md:275`, `:282-286`). [DATO] Los informes pueden moverse a una base analítica aparte si hay picos (`:247-248`, `:271-272`).
- Razón declarada: [DATO] privacidad y seguridad de los usuarios (`functional_viewpoint/README.md:156`); monetización (`:155`; `README.md:57`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `functional_viewpoint/README.md:154-156`; `README.md:57`; `information_viewpoint/README.md:247-248`, `:271-272`, `:275`, `:277-278`, `:282-286`.
- Completitud: *ilustrativo*: [DATO] las estadísticas son ilustrativas y piden refinarse con producto (`information_viewpoint/README.md:277-278`).
- Contexto para contarlo: el requisito de datos analíticos; qué es agregar.
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · Organizar el desarrollo para cambiar rápido
- Idea: la evolvabilidad también se decide en cómo se guarda el código, cómo se integra y qué se prueba a mano.
- Lo que hizo el equipo: [DATO] dos monorepos con código compartido como artefactos aparte (ADR-11); GitLab Flow (ADR-12); pruebas automáticas completas en backend y QA manual en frontend (`development_viewpoint/README.md:52-53`); dos entornos con IaC (`deployment_viewpoint/README.md:4`).
- Razón declarada: [DATO] gestionar el inicio y reutilizar código, divisible más adelante (`adrs/adr-11-monorepos.md:12`); restricciones del calendario de la app móvil (`adrs/adr-12-gitlab-flow.md:12`); automatizar el frontend es sensible y lento y alargaría el time to market (`development_viewpoint/README.md:53`); IaC cuesta tiempo al inicio y simplifica cambios después (`deployment_viewpoint/README.md:4`).
- Costo o trade-off admitido: [DATO] ADR-11: build, tamaño de equipo, PR complejos (`adrs/adr-11-monorepos.md:27-31`); ADR-12: integración, menos control, escala (`adrs/adr-12-gitlab-flow.md:24-28`). QA manual: no declara costo.
- Alternativas que nombra: multirepo (`development_viewpoint/README.md:17`); GitFlow (`adrs/adr-12-gitlab-flow.md:17`).
- Estado: Proposed (ADR-11, ADR-12).
- Fuente: `development_viewpoint/README.md`; `adrs/adr-11-monorepos.md`; `adrs/adr-12-gitlab-flow.md`; `deployment_viewpoint/README.md:4`.
- Completitud: *parcial*: la tabla de estrategias de merge está en imagen.
- Contexto para contarlo: Evolvability como característica top (H01).
- Depende de imagen: sí (`development_viewpoint/images/merge_strategy.jpg`).
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `README.md:7-13` y `:35-46`: miembros del equipo y presentación de la empresa; no es arquitectura.
- `README.md:48-67`: caso de negocio en términos de marketing; no agrega decisiones.
- `README.md:73-80`: lista genérica de stakeholders; no se usa en ninguna decisión.
- `README.md:460-477`: hitos de implementación con tareas genéricas de proyecto (Scrum, encuestas, marketing); solo el orden web y una plataforma móvil primero se usa en H11.
- `operational_viewpoint/README.md`: repite en prosa el flujo funcional; no agrega decisiones.
- `security_perspective/README.md`: lista de prácticas generales sin decisión ligada al caso; además [DATO] menciona "secure password storage" (`:6`) cuando el sistema no guarda contraseñas (`functional_viewpoint/README.md:45`).
- Consecuencias de los ADR 3 a 15: textos genéricos sobre la tecnología, repetidos entre ADR (3 y 6 iguales; 4, 5 y 7 iguales); solo sirven las frases de decisión.
- `information_viewpoint/README.md:297-324`: registro de revisiones del documento (incluye "Rewrite All entity sections with help of chatgpt", `:309`).
- `adrs/adr-0-template.md` y `.gitignore`: plantilla y configuración.

## 6. Imágenes para fase 2

- `architecture_style/images/arch_style.jpg`: el Architecture Styles Worksheet con los estilos puntuados que llevó a elegir event-driven. Citada en `README.md:164` y `adrs/adr-1-architecture-style.md:9`.
- `context_viewpoint/images/level1.jpg`: contexto C4 con actores y API externas. `README.md:235`.
- `context_viewpoint/images/level2.jpg`: contenedores C4 de Road Warrior. `README.md:269`.
- `context_viewpoint/images/level3_email_tracker.jpg`: topics y microservicios del tracker de correo. `context_viewpoint/README.md:74`.
- `context_viewpoint/images/level3_reservation_tracker.jpg`: compacted topics por tipo de reserva. `context_viewpoint/README.md:83`.
- `context_viewpoint/images/level3_notifications.jpg`: topics de notificaciones. `context_viewpoint/README.md:96`.
- `context_viewpoint/images/Level-3-Container-*.jpg` (seis archivos): contenedores de compartir, informes y lectores/actualizadores. `context_viewpoint/README.md:111-164`.
- `concurrency_viewpoint/images/Concurrency-Diagram-Level-1.jpeg`: tres grupos de escalado. `concurrency_viewpoint/README.md:16`.
- `concurrency_viewpoint/images/Concurrency-Diagram-Level-2-Messaging-Actors.jpg`: particiones del compacted topic e instancias del Itinerary Tracker. `concurrency_viewpoint/README.md:71`.
- `concurrency_viewpoint/images/Concurrency-Diagram-Level-2-Data-Managers.jpeg` y `ConcurrencyDiagram-Level-2-API-Actors.jpeg`: escalado de lectores, actualizadores y API. `concurrency_viewpoint/README.md:45`, `:56`.
- `information_viewpoint/images/information_viewpoint_1.jpg`: esquema de datos. `information_viewpoint/README.md:28`.
- `development_viewpoint/images/merge_strategy.jpg`: tabla de cuándo usar cada estrategia de merge. `development_viewpoint/README.md:29`.
- `development_viewpoint/images/gitlab_flow.jpg` y `development.jpg`: flujo de ramas y repos. `development_viewpoint/README.md:23`, `:37`.
- `deployment_viewpoint/images/deployment_env.jpg` y `deployment.jpg`: entorno multizona y plataformas. `deployment_viewpoint/README.md:10`, `:23`.
- `functional_viewpoint/images/main_flow.jpg` (y los ocho de flujos): flujos funcionales con restricciones. `functional_viewpoint/README.md:42-158`.
- `operational_viewpoint/images/L1_Operational_RoadWarrior.jpg`: vista operativa. `operational_viewpoint/README.md:29`.

## 7. Preguntas abiertas

- ¿Qué puntajes dio el worksheet a cada estilo y qué otros estilos se compararon? (imagen `arch_style.jpg`).
- ¿Cómo se cumple que los cambios manuales se vean inmediatamente si los updaters son asíncronos (ADR-4 frente a `requirements/original_requirements.md:126-128`)?
- ¿Cuántas particiones o instancias hacen falta para refrescar 150 millones de reservas en 5 minutos? El texto no lo calcula (`README.md:131`).
- En `context_viewpoint/README.md:105-109` el primer escenario (social) se asigna al `Trip Access Provider` y el "segundo" (invitar) al `Social Media Post Generator`; los nombres parecen invertidos respecto de la lista de `:101-103`. Hay que confirmarlo con la imagen `Level-3-Container-Sharing.jpg`.
- `context_viewpoint/README.md:153` enlaza para Notifications Data Reader/Updater la imagen de Travel Agencies; ¿cuál es el diagrama correcto?
- ADR-6 declara compartir síncrono, pero los cambios de acceso pasan por el topic `Trip Access Updates` (`context_viewpoint/README.md:160`); ¿es síncrona solo la respuesta al usuario?
- ¿Cómo encaja una sola región (ADR-13) con debe funcionar internacionalmente (`requirements/original_requirements.md:26`)?
- Las imágenes `level3_data_*`, `level3_sharing.jpg` y `level3_reports_generator.jpg` no se citan en el texto; ¿son versiones anteriores de los `Level-3-Container-*`?
- `KATAS 2023 - final presentation.pptx` no se leyó; puede contener datos que el README no trae.
