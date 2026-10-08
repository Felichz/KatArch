# BluzBrothers · Historia reconstruida del proceso

Reconstrucción, a partir del historial completo de git, de cómo razonó el equipo **BluzBrothers**, primer lugar del O'Reilly Architecture Kata de invierno de 2024 (caso **MonitorMe**, de StayHealthy, Inc.). Es la columna vertebral del curso en video: `GUION.md` sigue este orden.

Convenciones:

- Los hashes son cortos (7 caracteres) y las rutas son relativas a la raíz del repositorio del equipo.
- **[Prueba]** marca lo que el historial demuestra (un commit, un diff, una imagen fechada).
- **[Inferencia]** marca lo que deduzco y no está escrito en ningún lado.
- Las horas son las del autor del commit (UTC+1).

## 1. Fuente y método

- Repositorio: `TheKataLog/BluzBrothers`, copia del original `bluzbrothers/StayHealthy.MonitorMe-Kata2024` (el nombre aparece en los merges, por ejemplo `1a2abac`). Clon completo en `scratchpad/katas/BluzBrothers`, HEAD `0b65dc9`.
- 184 commits entre el 13-02-2024 y el 07-03-2024. Hay 5 identidades de git, pero son **4 personas**: un mismo autor firma con dos grafías de su apellido (113 commits entre las dos). El README acredita a los cuatro integrantes; en el curso se los nombra por rol, si hace falta.
- Dos pull requests: `#1` (los requisitos, `e243822`) y `#2` (`e573548`, rama `kafka_agnostic_language`).
- Método: `git log --reverse --name-status` completo, `git log --follow -p` sobre cada documento clave, extracción de las imágenes en sus versiones viejas (`git show <hash>:<ruta>`) y lectura de cada imagen. Las imágenes extraídas están en `scratchpad/bluz-img/`.
- Podio del mismo kata, según el perfil de TheKataLog: 1. BluzBrothers, 2. Mighty Orbots, 3. (empate) Low Codes y Architects Evolution Zone. Los tres se clonaron con `--depth 1`, solo para el contrapunto de la sección 9.

## 2. El pliego (brief)

**Fuente:** `Business/Requirements.md`. Entró como `requirements.md` en `e23ff92` (15-02, PR `#1`) y se movió en `472f578` y `11005b9`. Comparado con la versión final, **el texto no cambió**: solo se agregaron títulos de Markdown y un banner (`git diff e23ff92:requirements.md HEAD:Business/Requirements.md`). Es el pliego tal como lo recibió el equipo.

Texto literal (en inglés, como en el repositorio):

> StayHealthy, Inc. is a large and highly successful medical software company located in San Francisco, California, US. They currently have 2 popular cloud-based SAAS products: MonitorThem and MyMedicalData.
>
> MonitorThem a comprehensive data analytics platform that is used for hospital trend and performance analytics-alert response times, patient health problem analytics, patient recovery analysis, and so on.
>
> MyMedicalData is a comprehensive cloud-based patient medical records system used by doctors, nurses, and other health professionals to record and track a patient's health records with guaranteed partitioning between patient records.
>
> StayHealthy, Inc. is now expanding into the medical monitoring market and is in need of a new medical patient monitoring system for hospitals that monitors a patient's vital signs using proprietary medical monitoring devices built by StayHealthy, Inc.
>
> **Requirements**
> - MonitorMe reads data from eight different patient-monitoring equipment vital sign input sources: heart rate, blood pressure, oxygen level, blood sugar, respiration rate, electrocardiogram (ECG), body temperature, and sleep status (sleep or awake). It then sends the data to a consolidated monitoring screen (per nurses station) with an average response time of 1 second or less. The consolidated monitoring screen displays each patient's vital signs, rotating between patients every 5 seconds. There is a maximum of 20 patients per nurses station.
> - For each vital sign, MonitorMe must record and store the past 24 hours of all vital sign readings. A medical professional can review this history, filtering on time range as well as vital sign.
> - In addition to recording raw monitoring data, the MonitorMe software must also analyze each patient's vital signs and alert a medical professional if it detects an issue (e.g., decrease in oxygen level) or reaches a preset threshold (e.g., temperature has reached 104 degrees F).
> - Some trend and threshold analysis is dependent on whether the patient is awake or asleep. For example, if the blood pressure drops, the system should notice that the patient is asleep and adjust its alerts accordingly. The same is true with the respiration rate and heart rate. For example, all of these vital signs are reduced when the patient is asleep, but if awake something might be wrong.
> - Medical professionals receive alert push notifications of a potential problem based on raw data analysis to a StayHeathy mobile app on their smart phone as well as the consolidated monitoring screen in each nurses station.
> - If any of vital sign device (or software) fails, MonitorMe must still function for other vital sign monitoring (monitor, record, analyze, and alert).
> - Medical staff can generate holistic snapshots from a patient's consolidated vital signs at any time. Medical staff can then upload the patient snapshot to MyMedicalData. The upload functionality is within the scope of the MonitorMe functionality and is done through a secure HTTP API call within MyMedicalData.
>
> **Requirements (cont.)**
> - Each patient monitoring device transmits vital sign readings at a different rate: Heart rate: every 500ms · Blood pressure: every hour · Oxygen level: every 5 seconds · Blood sugar: every 2 minutes · Respiration: every second · ECG: every second · Body temperature: every 5 minutes · Sleep status: every 2 minutes
> - MonitorMe will be deployed as an on-premises system. Each physical hospital location will have its own installation of the complete MonitorMe system (including the recorded raw monitoring data).
> - Maximum number of patients per physical MonitorMe instance: 500
> - StayHealthy. Inc. will be providing a comprehensive hardware and software for this system. The platform, data stores, databases, and other technical tools and products are unspecified at this time and will be based on your on-prem architectural solution.
>
> **Other Considerations**
> - StayHealthy, Inc. is looking towards adding more vital sign monitoring devices for MonitorMe in the future.
> - Vital sign data analyzed and recorded through MonitorMe must be as accurate as possible. After all, human lives are at stake.
> - As this is a new line of business for StayHealthy, they expect a lot of change as they learn more about this new market.
> - StayHealthy, Inc. has always taken patient confidentiality seriously. MonitorMe should be no exception to this rule. While patient monitoring data must be secure, MonitorMe does not have to meet any government regulatory requirements (e.g., HIPAA).

Hubo además **respuestas del cliente por correo** que el repo menciona pero no guarda: `EventStorming/EventStorming.md` («Based on the requirements and responses from the email») y `ADR-006` («In response to a client inquiry»). **[Prueba]** de que existieron; su contenido no está.

## 3. Cronología, día por día

### 13 al 16 de febrero: el pliego, los requisitos y la primera regla de trabajo

| Hora | Commit | Qué pasó |
| - | - | - |
| 13-02 21:59 | `a72e94a` | Repo vacío (solo README). |
| 15-02 14:54 | `e23ff92` | Entra el pliego literal (`requirements.md`). |
| 16-02 13:54 a 15:01 | `38fbf00`, `2625f7c` | Primera tabla de requisitos funcionales en el README (FR1 «reads data from eight… sources»). |
| 16-02 22:28 | `1fb91fe` | Plantilla de ADR y **ADR-001: usar ADRs** (formato de Nygard). Es la primera decisión registrada. |
| 16-02 23:06 | `8fd97d3` | **ADR-002**: la actualización del sistema queda fuera de la primera fase. Nace como «Proposed». |

**[Inferencia, fuerte]** El event storming empezó la noche del 16: el ADR-002 ya decide sobre el evento «software updated», que el documento ubica en la etapa 3 del taller (la papelera), y las fotos del tablero entran a la mañana siguiente.

### 17 de febrero: el tablero completo y la primera pasada de características

| Hora | Commit | Qué pasó |
| - | - | - |
| 08:25 | `ab63f2a` | **ADR-003: base de datos de series de tiempo** (Proposed). |
| 09:03 | `9b5af01` | **ADR-004: retención de 24 horas**. |
| 09:04 y 09:26 | `a55b212`, `f7acd36` | Fotos del tablero: `EventStorming/1.png` a `4.png`. **[Prueba]** La versión de `4.png` de este commit ya tiene los eventos **agrupados en contextos** («Patient registration», «Gateway», «Recorder», «Analyzer», «Monitor», «Notification»), la política «retention policy 24h (adr-004)» y la papelera con ADR-002 y ADR-004. O sea: el taller completo estaba hecho el 17 a la mañana. |
| 21:01 a 21:42 | `c17d791`, `0fce876`, `8496eac` | Requisitos funcionales (FR1 a FR10) y no funcionales (NFR1 a NFR7) en el README. |
| 21:47 | `7cfd748` | **Primera pasada de características** (`resources/characteristics.md` e imágenes). Ver sección 4.1. |
| 23:21 | `49d7f49` | Tabla de actores en el README. |

**[Prueba]** En `7cfd748:resources/images/characteristics_vs_modules.png` las características están pegadas sobre un **diagrama de contenedores fechado «Last modified: 2024-02-17»** que ya tiene «Signal Streaming Platform [Kafka]», «Vital Sign Analyzer», «Vital Sign Streamer», «Notification Service» y «Patient and sensors register». La plataforma de mensajería con Kafka es anterior a la elección formal del estilo.

### 18 de febrero

Sin commits.

### 19 de febrero: se rehace el análisis de características y se elige el estilo

| Hora | Commit | Qué pasó |
| - | - | - |
| 15:59 | `6a4cfd1` | «New readme form»: `README2.md` y `resources/distilled-requirements.md`. |
| 17:30 | `05adfda` | «The thinking flow description»: el relato lineal (requisitos → event storming → características → estilo → C4). Entran `chosen-architecture.png` (primera versión de la planilla de estilos), `domains.png` y `c2.png`. En ese relato los requisitos caben en **tres** flujos de datos. |
| 17:32 | `a2248c5` | README2 pasa a ser el README. |
| 22:23 | `11ae412` | **«characteristics motivation - final»**: se reescribe todo el análisis de características (sección 4.1), se vuelve a marcar la planilla de estilos y aparecen `4components.png`, `components-sticky-cards.png`, `top3-characteristics.png` y `top3-final.png`. |
| 23:27 a 23:56 | `4895ab2` y siguientes | Nace `EventStorming/EventStorming.md` y se vuelven a exportar las fotos del tablero (`5.png`, `6.png`). |

### 20 de febrero: el relato del taller, el contexto y los contenedores

| Hora | Commit | Qué pasó |
| - | - | - |
| 00:12 a 01:47 | `23e9e2b` … `60dec1a` | Seis ediciones de `EventStorming.md` en la madrugada; entra `6.1.png`. |
| 01:53 | `226a1ac` | `Business/Overview.md` (visión de negocio; ver inconsistencias). |
| 10:21 | `183bd42` | C2 actualizado (`c2.jpg`). |
| 10:22 | `13e61cd` | Esqueleto de contenedores, componentes y casos de uso (US1 a US4). En el texto del Analyzer dice «we decided in **ADR-###**» para la caché: la decisión existía antes que su ADR. |
| 20:56 a 21:04 | `88ba78a`, `c5a0a45`, `472f578` | Reorganización de carpetas, **C1** (la imagen dice «Last modified: 2024-02-17»). |
| 21:17 | `33e577e` | «Creating the history»: el README pasa de tres a **cuatro flujos** (separa revisar la historia de enviar el snapshot) y agrega la tabla de pendientes. |
| 22:45 | `dc59d65` | **C3 del Analyzer** (imagen «Last modified: 2024-02-20»). |
| 22:59 a 23:19 | `9808752`, `b6b1d24`, `419dd8b` | Se asignan los requisitos a las cuatro características candidatas y se borran los NFR de los requisitos destilados (pasan a vivir en la página de características). |

### 21 de febrero: el tablero final, los casos de uso y dieciséis ADRs en una tarde

| Hora | Commit | Qué pasó |
| - | - | - |
| 00:13 a 11:45 | `648d80b` … `037d2a4` | Nuevas exportaciones del tablero; entran `7.png`, `7.1.png` (contexto → componente) y `components.png`. |
| 13:02 | `1b5b53c` | Borrador de despliegue en Kubernetes. |
| 14:20 | `6f97260` | Diagramas de secuencia de los cuatro casos de uso. |
| 16:07 a 16:15 | `7dec006`, `4ad36ac`, `2a9d9c2`, `77c41e0` | ADR-005 (registro de pacientes **fuera de alcance**), ADR-006 (sensores fuera), ADR-007 (nombres). ADR-002 a 004 pasan de «Proposed» a «Accepted» («accepted adr after meeting»). |
| 17:22 a 18:57 | `2a62cec` … `f5a9d3a` | **ADR-008 a ADR-020**: trece ADRs en 95 minutos (escalabilidad y despliegue bajados, disponibilidad fuera del criterio, top 3, estilo, app y estación fuera, Kafka, dos canales, datos centralizados, alta disponibilidad, caché, duplicación). |
| 21:24 | `d258ebb` | Diagrama de despliegue y refactor de C1 y C2 («At least 2 Pods»). |
| 22:32 a 23:18 | `a6ea95c`, `0ed69fb`, `c796cee` | Actores, glosario y texto de los cuatro casos de uso. |

**[Prueba]** 16 de los 20 ADRs se escribieron esta tarde (16:07 a 18:57). Todos llevan fecha 2024-02-21, aunque varias decisiones son anteriores: Kafka aparece en el diagrama del 17, la caché del Analyzer en el texto del 20 con «ADR-###», el estilo en la planilla del 19. Los ADRs de esta tarde **registran** decisiones ya tomadas; los ADR-001 a 004 (16 y 17) se escribieron mientras se decidía.

### 22 de febrero: las cuentas, las fitness functions y la entrega

| Hora | Commit | Qué pasó |
| - | - | - |
| 09:06 | `0030ea8` | **Primer cálculo de dimensionamiento**, dentro de `Deployment/deployment.md`: lecturas por segundo, base de datos 16 ms, Kafka 5 ms, LAN 32 ms. Recorder y Streamer dicen «TODO». |
| 10:15 | `50d5558` | Se completa: Recorder y Streamer 320 ms cada uno, total **693 ms**. Nace `FitnessFunctions/` con sizing, alerts y failover. Los pods pasan de «at least 2» a «at least 3». La tabla de fitness functions entra al README. |
| 12:30 a 13:37 | `52799ab`, `ec105bb`, `50ea271`, `69e69ab` | Team Topologies: dos equipos alineados al flujo y uno de plataforma. |
| 13:10 | `11005b9` | «unification»: nombres de archivo en PascalCase. |
| 14:31 a 14:38 | `f4811b4`, `b1fa86b`, `d4dd3fe`, `a2f5412` | **El registro de pacientes cambia de «fuera de alcance» a «subdominio de soporte»**; la página de características agrega la razón del ADR-010 («not specified in the template»). |
| 14:34 | `73ae388` | Mapa de contextos (DDD). |
| 14:44 y 15:21 | `f303934`, `058422e` | Se agregan a los pendientes el registro de pacientes y la integración con MonitorThem. |
| 14:48 | `bf424e7` | ADR-019 deja de nombrar Redis en el título del archivo. |
| 16:03 a 17:17 | `f01a6be`, `6b530cb`, `45159c1`, `232e705` | Resolución de imágenes. **Último commit antes del silencio.** |

### 22 de febrero al 4 de marzo: once días sin commits

**[Inferencia]** Es la entrega y la evaluación. **[Prueba]** de que hubo evaluación con devolución: el primer commit posterior dice «(based on jury feedback)». No hay nada en el repo que diga si fue una semifinal o qué dijo el jurado, más allá de lo que el equipo cambió.

### 4 al 7 de marzo: lo que cambió después del jurado

| Hora | Commit | Qué pasó |
| - | - | - |
| 04-03 21:05 | `b4395e4` | «More transparent calculation description, changing Kafka as a Streaming Platform (**based on jury feedback**)»: `Sizing.md` explica de dónde salen las 25 estaciones, aclara que InfluxDB y Kafka se usan solo para estimar («the final decision… will be taken later») y renombra secciones. **Los números no cambian.** |
| 04-03 23:44 a 05-03 00:34 | `d80382d` … `ad5ad44` | Correcciones de typos («Stramer» → «Streamer») y un enlace **«context link out»** en cada ADR, que apunta al documento donde nació la decisión. |
| 05-03 14:30 a 14:46 | `e742cc7`, `e573548`, `a363588` | PR `#2` (`kafka_agnostic_language`): todos los diagramas redibujados en alta resolución y «Kafka» reemplazado por «Message Streaming Platform». |
| 05-03 15:08 a 17:15 | `f57f1e3`, `ddd106d`, `d59415a` | Diagrama de Kubernetes con colores coherentes con el C2. |
| 07-03 22:52 a 22:58 | `462e53a` … `0b65dc9` | Enlaces faltantes en ADR-017, 018, 020 y en `Deployment.md`. |

**[Prueba]** Después del jurado no cambió ninguna decisión (`git diff 232e705 HEAD` sobre ADR, C4, Deployment y EventStorming: solo enlaces, nombres neutrales, typos y diagramas redibujados).

## 4. Lo que el equipo cambió de idea

### 4.1 Las características: dos pasadas

| | Primera pasada (17-02, `7cfd748`) | Segunda pasada (19-02, `11ae412`) |
| - | - | - |
| Siete candidatas | Scalability, Reliability, Security, Performance, Deployability, Extensibility, Continuity (`top7_characteristics.png`) | Performance, Security, Availability, Evolvability, Elasticity, Fault-tolerance, Configurability |
| Cómo se marcó el pliego | Papelitos sobre el pliego (`characteristics.png`, versión vieja): Reliability ×2, Security ×2, Performance, Deployability, Extensibility, Scalability, Continuity | Papelitos nuevos sobre el mismo pliego (versión nueva): Performance ×2, Configurability ×2, Availability, Fault-tolerance, Security ×2, Deployability, Evolvability ×2, Elasticity |
| Sobre qué se etiquetó | El borrador de contenedores del 17 (`characteristics_vs_modules.png`) | Las cuatro piezas del event storming (`components-sticky-cards.png`) |
| Top 3 | **Reliability, Performance, Extensibility** (`top3_final.png`, planilla fechada 2024/02/17) | **Evolvability, Performance, Elasticity** (`top3-final.png`; la planilla nueva sigue con la fecha 2024/02/17 escrita a mano) |
| Descartes escritos | ninguno | Scalability y Deployability «downplayed» (luego ADR-008 y ADR-009) |

**[Prueba]** La primera lista quedó huérfana en el repo: `ArchitectureCharacteristics/images/top7_characteristics.png` sigue mostrando la lista vieja y ningún documento la referencia desde `11ae412`.

**[Inferencia]** La segunda pasada adopta el vocabulario de la planilla de estilos (que tiene filas para evolvability, elasticity, fault-tolerance, configurability y performance, y ninguna para reliability, extensibility, continuity ni availability). Eso explica el cambio de nombres (extensibility → evolvability, reliability → availability + fault-tolerance) y prepara el argumento del ADR-010.

### 4.2 La planilla de estilos: dos versiones el mismo día

- `05adfda` (19-02 17:30): filas marcadas **elasticity, performance, scalability**; **fault-tolerance subrayada**; columnas marcadas event-driven y space-based; tilde en event-driven.
- `11ae412` (19-02 22:23): filas marcadas **elasticity, evolvability, performance**; ya no hay subrayado en fault-tolerance; solo event-driven marcado.
- Conteo de la versión final (verificado en la imagen): event-driven 4 + 5 + 5 = **14** (lo que dice el ADR-012), space-based 5 + 3 + 5 = 13, microservicios 5 + 5 + 2 = 12, service-based 2 + 3 + 3 = 8.

### 4.3 Otros cambios de idea y de nombre

| Qué | Antes | Después | Evidencia |
| - | - | - | - |
| Contexto de los sensores | «Gateway» | «Sensors» | `f7acd36:EventStorming/4.png` vs `EventStorming/images/5.png`; el texto de la etapa 5 todavía dice «Gateway» |
| Contexto de avisos | «Notification» | «Alert» | mismas imágenes |
| Pieza de pantalla | «Monitor» | «Vital Sign Streamer» | ADR-007; `7.1.png` |
| Registro de pacientes | fuera de alcance (21-02, `2a9d9c2`) | subdominio de soporte, «part of the system, but we won't be focusing on it» (22-02, `b1fa86b`, `f4811b4`) | el título del ADR-005 sigue diciendo «Out of Scope» |
| Flujos del README | tres (`05adfda`) | cuatro (`33e577e`) | README |
| Réplicas mínimas | «At least 2 Pods» (`d258ebb`) | «At least 3 Pods» (`50d5558`) | `Deployment.md`; el diagrama sigue mostrando 2 pods por servicio |
| Nombre de la mensajería | «Kafka» | «Message Streaming Platform» | `b4395e4`, `e742cc7` (por el jurado) |

## 5. El proceso, en resumen: lo que se prueba y lo que se infiere

**Lo que el historial prueba:**

1. El equipo arrancó por el pliego y por una regla de trabajo (ADR-001, «usar ADRs») antes de diseñar nada.
2. El event storming estaba completo, agrupado y con políticas el 17 a la mañana; el documento de seis etapas se escribió entre el 19 y el 21, reexportando las fotos.
3. Las primeras decisiones técnicas salieron de la papelera del taller: base de series de tiempo y retención de 24 horas (ADR-003 y 004, 17-02).
4. El mismo 17 ya existía un diagrama de contenedores con Kafka en el centro.
5. La primera lista de características (top 3 con Reliability) se rehízo por completo el 19, con otro vocabulario, descartes escritos y etiquetado por pieza.
6. La planilla de estilos se marcó dos veces el 19; la versión final da 14 estrellas a event-driven.
7. El diseño (C1, C2, C3, casos de uso) se dibujó entre el 20 y el 21.
8. 16 de los 20 ADRs se redactaron la tarde del 21, registrando decisiones previas.
9. Las cuentas de latencia y las tres fitness functions se hicieron la mañana del 22, el último día antes del silencio.
10. Después del jurado (4 al 7 de marzo) solo hubo pulido: nombres neutrales, cuentas explicadas, enlaces de trazabilidad, diagramas redibujados.

**Lo que infiero:**

- Que el event storming fue la noche del 16 (por el ADR-002).
- Que el 22 de febrero fue la fecha de entrega.
- Que la segunda pasada de características se alineó con la planilla de estilos.
- Que el diagrama del 17 fue una intuición temprana que la planilla del 19 confirmó: el orden real fue diagrama y planilla en paralelo, no planilla y después diagrama como cuenta el README.

## 6. Inventario de artefactos

| Artefacto | Ruta final | Aparece | Contenido sustantivo | Notas |
| - | - | - | - | - |
| Pliego | `Business/Requirements.md` | `e23ff92` 15-02 | igual | sin cambios de texto |
| Requisitos destilados | `Business/DistilledRequirements.md` | README `2625f7c` 16-02; archivo `6a4cfd1` 19-02 | FR1 a FR10 | los NFR se borraron el 20 (`b6b1d24`) |
| Visión de negocio | `Business/Overview.md` | `226a1ac` 20-02 | | agrega cosas que el pliego no dice (sección 7) |
| Actores y glosario | `Business/Actors.md`, `Business/Glossary.md` | `49d7f49` 17-02 (README); `a6ea95c` 21-02 | | |
| Event storming | `EventStorming/EventStorming.md` + `images/1.png` a `7.1.png`, `components.png` | fotos `a55b212` 17-02; texto `4895ab2` 19-02 | 6 etapas + resumen | las fotos se reexportaron varias veces |
| Características | `ArchitectureCharacteristics/Characteristics.md` + 9 imágenes | `7cfd748` 17-02 | rehecho `11ae412` 19-02 | `top7_characteristics.png` es huérfana |
| Planilla de estilos | `ArchitectureCharacteristics/images/chosen-architecture.png` | `05adfda` 19-02 | remarcada `11ae412` | |
| ADRs | `ADR/ADR-000` a `ADR-020` | 001-002 el 16; 003-004 el 17; 005-020 el 21 | enlaces «context link out» el 5-03 | |
| C4 | `C4/C1-context.md`, `C2-containers.md`, `C3-components.md` + jpg | C2 imagen `05adfda` 19-02; C1 `88ba78a` 20-02; C3 `dc59d65` 20-02 | redibujados `e742cc7` 5-03 | |
| Casos de uso | `UseCases/US1` a `US4` + secuencias | `13e61cd` 20-02 | secuencias `6f97260`, texto `0ed69fb`/`c796cee` 21-02 | |
| Despliegue | `Deployment/Deployment.md` + `kubernetes.jpg`, `kubernetes-on-premise.png` | `1b5b53c` 21-02 | `d258ebb` 21-02 | `kubernetes-on-premise.png` es un esquema genérico de Kubernetes |
| Fitness functions | `FitnessFunctions/Sizing.md`, `Alerts.md`, `Failover.md` | sizing `0030ea8`, las tres `50d5558` 22-02 | sizing reescrito `b4395e4` 4-03 | |
| Team Topologies y mapa de contextos | `Business/TeamsTopology.md` + 2 imágenes | `52799ab`, `73ae388` 22-02 | | pulido del último día |

## 7. Inconsistencias del repositorio

Cuando el repo se contradice, el curso sigue la fuente indicada en la última columna.

| # | Inconsistencia | Evidencia | El curso sigue |
| - | - | - | - |
| 1 | **El ADR-010 deja afuera la disponibilidad** «porque la plantilla no la incluye». La planilla de estilos no tiene esa fila, pero sí tiene fault-tolerance, que en la primera versión estaba subrayada. Y en `components-sticky-cards.png` la disponibilidad está sobre **las cuatro** piezas (igual que evolvability), mientras que performance y elasticity están sobre tres (no sobre Alert). La más repetida quedó afuera. | ADR-010, `Characteristics.md`, las dos versiones de `chosen-architecture.png`, `components-sticky-cards.png` | El ADR, mostrando la debilidad del argumento (cap. 4) |
| 2 | Dos de las tres fitness functions prueban justamente la disponibilidad (Alerts: «Availability»; Failover: «Availability, Fault Tolerance»). | README, tabla de fitness functions | Se usa como enseñanza (cap. 7) |
| 3 | **Sizing: capacidad sumada como latencia.** Los 320 ms del Streamer son 160 lecturas por segundo × 2 ms: el tiempo que una conexión está ocupada en un segundo, no lo que espera una lectura. Lo mismo con la LAN (32 ms es todo el tráfico de un segundo del hospital) y con la base (16 ms para 4000 escrituras). | `FitnessFunctions/Sizing.md` | El cálculo del equipo, explicado y criticado (cap. 8) |
| 4 | Sizing suma «Save to DB» al camino hacia la pantalla, pero sus propios casos de uso dicen que Recorder guarda y publica **en paralelo** (threads 1 y 2). | `UseCases/US1-monitor.md`, `alerting_sequence.jpg` | Los casos de uso |
| 5 | Sizing: «160 signals per second (20 connections x 8 sensors)»: deberían ser 20 **pacientes** × 8 lecturas por segundo. | `Sizing.md` | La lectura correcta (pacientes) |
| 6 | Sizing: el pico de 8 lecturas por segundo por paciente no se deriva de nada (el promedio calculado es 4,22). | `Sizing.md` | Se presenta como supuesto |
| 7 | Sizing: Kafka «4ms» en el texto y «5ms» en la tabla; 4000 / 237 871 da 16,8 ms y se escribe 16 ms. | `Sizing.md` | La tabla (5 ms, 16 ms) |
| 8 | Sizing reparte «3 Recorder services» entre 25 estaciones de enfermería, pero el Recorder recibe de los sensores, no de las estaciones («To simplify calculations»). | `Sizing.md` | Se menciona como simplificación del equipo |
| 9 | Réplicas: `Deployment.md` dice «At least 3 Pods»; el diagrama `kubernetes.jpg` muestra 2 pods por servicio de aplicación (3 en la plataforma de mensajería). | `Deployment.md`, `kubernetes.jpg` | El curso dice «duplicadas», sin número |
| 10 | La caché distribuida (ADR-019, C3) no aparece en el diagrama de Kubernetes. El texto del C2 habla de «own internal cache». | ADR-019, `C2-containers.md`, `c3-analyzer.jpg`, `kubernetes.jpg` | ADR-019 y C3 (distribuida) |
| 11 | El ADR-005 se titula «Patient Registration Out of Scope», pero su decisión dice «supporting sub-domain… part of the system». | ADR-005 (`b1fa86b`) | La decisión (soporte) |
| 12 | El ADR-006 dice «after implementing event sourcing»: es event storming. | ADR-006 | Event storming |
| 13 | La etapa 5 de `EventStorming.md` lista el contexto «Gateway»; el resumen y las fotos finales dicen «Sensors». | `EventStorming.md` | «Sensors» |
| 14 | La papelera del tablero (foto 3) asocia los eventos de historia al **ADR-004**; el texto, desde `d80382d` (4-03), al **ADR-003**. | `EventStorming/images/3.png`, `EventStorming.md` | Los dos: el archivado y el borrado los resuelve la base de series de tiempo (003) con su retención (004) |
| 15 | «History data reviewed» fue a la papelera aunque revisar la historia es un requisito; reaparece como caso de uso US4. | foto 3, `US4-review-data.md` | Se dice en el cap. 2 y se cierra en el cap. 5 |
| 16 | El ADR-015 sigue titulado «Choosing Kafka as Event Broker» y la caja del Recorder en `c2.jpg` dice «forwards to kafka» después del cambio a lenguaje neutral. | ADR-015, `c2.jpg` | Se usa como ejemplo de rastro (cap. 9) |
| 17 | En `c3-analyzer.jpg`, la caja externa «Patient and Sensor register» tiene la descripción «The internal Microsoft Exchange e-mail system» (copia de otra plantilla). | `C4/images/c3-analyzer.jpg` | Se ignora; el registro es el de pacientes y sensores |
| 18 | Team Topologies: el texto pone «streaming, and real-time monitoring» en el equipo A; el diagrama pone «Monitor» en el equipo B. | `TeamsTopology.md`, `teamsTopology.png` | No entra al curso |
| 19 | Las definiciones de availability, evolvability, elasticity, fault-tolerance y configurability en `Characteristics.md` hablan de «a building or space»: son definiciones genéricas, no de software. | `Characteristics.md` | El curso define cada término con sus palabras |
| 20 | Elasticity se mantiene en el top 3 con la razón «additional sensors may necessitate additional nodes», que es casi la misma con la que se baja scalability («the system can be manually rescaled by incorporating additional nodes»). | `Characteristics.md`, ADR-008 | Se señala en `GUION.md` como pregunta abierta; no entra a la narración |
| 21 | `Overview.md` habla de «wearable sensors», «patient engagement» y «elderly patients», que el pliego no menciona; `Actors.md` incluye autoridades regulatorias aunque el pliego excluye regulación. | `Overview.md`, `Actors.md` | El pliego |
| 22 | El evento «nurse seen the alert» del event storming no tiene contraparte en el diseño: no hay acuse de recibo ni escalamiento de alertas. | foto 1 a 7, C2 | Se dice como hueco (cap. 6) |
| 23 | El ADR-004 justifica la retención con «privacy laws and regulations», pero el pliego dice que no hay que cumplir regulaciones. | ADR-004 | El pliego (24 horas es un requisito) |

## 8. Lo que falta en el repositorio

- Las **respuestas del cliente por correo** (se citan, no están).
- El **feedback del jurado** (solo el commit que lo menciona).
- Presentación, video o diapositivas de la final.
- Una **estimación de costos** o de hardware (el README la deja pendiente: «The hardware»).
- Autenticación y autorización, la implementación de las notificaciones push, la VPN hacia MyMedicalData, el registro de pacientes y la integración con MonitorThem: listados como pendientes en el README.
- Una fitness function para la falla de la **plataforma de mensajería** misma, por donde pasa todo; y para la falla de la pantalla de la estación.
- Acuse de recibo y escalamiento de alertas (inconsistencia 22).
- Cualquier medición: las tres fitness functions son recorridos en papel con resultado «Success».
- Un ADR específico para Kubernetes (aparece dentro de ADR-018 como «an orchestrator such as Kubernetes»).
- El detalle de las reglas de sueño y vigilia: el motor de reglas existe (C3), pero no hay ninguna regla escrita.

## 9. Contrapunto del podio (uso mínimo)

Leído de los clones `--depth 1` en `scratchpad/katas/`:

- **Mighty Orbots (2.º)**: su sección de características empieza por **Availability** («any system downtime could delay the detection of critical health issues»), y su estilo es «a combination of microservice and event-driven architecture styles» (`README.md`, secciones 3.3 y 3.4).
- **Low Codes (3.º empatado)**: su ADR de estilo usa como drivers «Concurrency, Availability, Data integrity», y en la planilla mira «Fault-tolerance; to support failover/high availability». Elige event-driven frente a microservicios y space-based (`Docs/Decisions/0000-use-event-driven-architecture.md`).
- **Architects Evolution Zone (3.º empatado)**: top 3 fault tolerance, responsiveness y performance; también event-driven (`3.ADR/ADR012-EventDrivenArchitecture.md`).

Lectura para el curso: los cuatro del podio terminan en eventos, así que el estilo no explica la diferencia. Y dos del podio hacen exactamente lo que el ADR-010 no hizo: traducir la disponibilidad a la fila de fault-tolerance de la planilla. Se usa una sola vez, en el capítulo 4.
