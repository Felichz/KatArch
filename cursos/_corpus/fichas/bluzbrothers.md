# Ficha · BluzBrothers · MonitorMe (Invierno 2024)

Fuentes: archivos del repo `BluzBrothers-src` (rutas relativas a la raíz del repo, sin `-src`). Marcas: `[DATO]` lo que el repo dice; `[DEDUCCIÓN]` inferido de lo que dice; `[HUECO]` lo que el repo no dice o deja sin resolver.

## 1. El caso

[DATO] StayHealthy, Inc., empresa de software médico de San Francisco, quiere un sistema de monitoreo de pacientes para hospitales que lea los signos vitales de dispositivos propios de la empresa (README.md; Business/Requirements.md). Son ocho fuentes: frecuencia cardíaca, presión arterial, oxígeno, azúcar en sangre, respiración, ECG, temperatura corporal y estado de sueño (Business/Requirements.md; Business/Glossary.md). Cada dispositivo transmite a su propio ritmo: 500 ms la frecuencia cardíaca, 1 s la respiración y el ECG, 5 s el oxígeno, 2 min azúcar y sueño, 5 min la temperatura y 1 h la presión (Business/Requirements.md, "Requirements (cont.)"). La pantalla consolidada por estación de enfermería debe mostrar los signos con respuesta promedio de 1 s o menos, rotar entre pacientes cada 5 s y admitir hasta 20 pacientes por estación (Business/Requirements.md; Business/DistilledRequirements.md, FR2). Cada instalación física tiene tope de 500 pacientes (Business/Requirements.md). Hay que guardar 24 h de lecturas por signo y permitir revisarlas filtrando por tiempo y signo (Business/Requirements.md; FR3). El sistema analiza cada paciente, alerta por push al celular y a la pantalla de enfermería, y genera un snapshot que se sube a MyMedicalData por API HTTP segura (Business/Requirements.md; FR4 y FR5). Se instala on-premises, con una instalación completa por hospital (Business/Requirements.md). La confidencialidad es obligatoria, pero no hay cumplimiento regulatorio exigido, por ejemplo HIPAA (Business/Requirements.md, "Other Considerations").

[DEDUCCIÓN] El problema central que el repo fija es mantener el monitoreo y las alertas cuando falla un dispositivo o un componente de software. Lo declara como requisito (Business/Requirements.md: "If any of vital sign device (or software) fails, MonitorMe must still function") y lo vuelve prueba de aptitud (README.md, fila "Fail-over").

[HUECO] Los documentos no dan presupuesto, fecha de entrega ni número de hospitales. Business/Overview.md describe otro escenario (sensores "wearables", integración con historias clínicas electrónicas, pacientes crónicos y ancianos), que no coincide con el on-premises de Business/Requirements.md (ver sección 7).

## 2. Qué entregó el equipo

- README.md: índice del caso; resume los cuatro flujos de datos, las decisiones, los diagramas y las tres fitness functions.
- Business/Overview.md: visión, objetivos estratégicos y features de negocio.
- Business/Requirements.md: requisitos del cliente, tal como llegaron.
- Business/DistilledRequirements.md: requisitos destilados en FR1 a FR10.
- Business/Actors.md: actores (personal médico, pacientes, administradores, personal de StayHealthy, reguladores como actor indirecto).
- Business/Glossary.md: glosario de términos y de los componentes.
- Business/TeamsTopology.md: mapa de contexto DDD y topología de equipos (dos equipos alineados al flujo y un equipo de plataforma).
- ArchitectureCharacteristics/Characteristics.md: las nueve características candidatas, la lista de siete, la de tres y cómo se eligieron.
- ADR/: 20 ADR (ADR-001 a ADR-020) y la plantilla ADR-000.
- EventStorming/EventStorming.md: las seis fases del taller de event storming, con contextos y actores.
- C4/C1-context.md, C4/C2-containers.md, C4/C3-components.md: vistas C4 de contexto, contenedores y componentes (C3 solo para el Vital Sign Analyzer).
- Deployment/Deployment.md: despliegue en Kubernetes sobre tres máquinas virtuales on-premises.
- FitnessFunctions/Sizing.md: cálculo de throughput y de la cadena sensor a pantalla.
- FitnessFunctions/Alerts.md: fitness function de entrega de alertas por dos canales.
- FitnessFunctions/Failover.md: fitness function de falla de un sensor.
- UseCases/US1-monitor.md, US2-alert.md, US3-snapshot.md, US4-review-data.md: cuatro casos de uso con diagramas de secuencia.

Conteo: 20 ADR [DATO] (ADR/). Diagramas: event storming (imágenes en EventStorming/images), mapa de contexto DDD (Business/images/contextMap.png), C4 C1, C2 y C3 (C4/images), cuatro diagramas de secuencia (UseCases/images), despliegue Kubernetes (Deployment/images), topología de equipos (Business/images/teamsTopology.png), tarjetas de características (ArchitectureCharacteristics/images) y un benchmark de Kafka (FitnessFunctions/images). Fitness functions: tres (README.md) [DATO]. C4: sí, niveles C1 a C3 [DATO]. Event storming: sí [DATO]. Glosario: sí [DATO]. Supuestos explícitos: sí, en FitnessFunctions/Sizing.md y en ADR-020 [DATO]. Riesgos: las consecuencias negativas de cada ADR, sin sección propia [DATO]. OKR: no hay [HUECO]. Historias de usuario: no hay; hay casos de uso con diagramas [DATO] (UseCases/).

## 3. Decisiones

Todas las celdas salen del archivo ADR indicado, salvo las marcadas como [DEDUCCIÓN] o [HUECO]. "No declara" significa que el texto del ADR no menciona alternativas o costos.

| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas |
|---|---|---|---|---|---|
| ADR-001 (ADR/ADR-001-use-adr.md) | Usar Architecture Decision Records según Michael Nygard. | No declara. | Comunicación, mejor toma de decisiones e historia de decisiones. | Esfuerzo de mantenimiento; curva de aprendizaje. | ADR |
| ADR-002 (ADR/ADR-002-update-move-to-next-phase.md) | Excluir la actualización del sistema de la primera fase. | No declara (dice que se reevaluará en fases siguientes). | Tiempo de entrega, piloto con alcance limitado, foco en estabilidad, costo inicial. | Riesgo de quedar desactualizado; menos capacidad de mejora temprana; trabajo extra en la segunda fase. | ADR, fuera-de-alcance-explicito, tradeoffs-explicitos |
| ADR-003 (ADR/ADR-003-use-time-series-db.md) | Usar una base de datos de series temporales (TSDB) como almacenamiento principal, sin nombrar el producto. | No declara por nombre. Dice "after thorough evaluation of various database technologies" sin listarlas. | Rendimiento de ingesta y consulta, escalabilidad, funciones de series temporales, comunidad. | Curva de aprendizaje; posibles límites de integración; inversión en infraestructura y formación. | ADR, time-series, tradeoffs-explicitos |
| ADR-004 (ADR/ADR-004-data-retention-policy.md) | Borrar los datos dentro de la base a las 24 h. (El encabezado dice "DR-004", error de tipeo.) | No declara. | Privacidad ("privacy laws"), rendimiento y costo de almacenamiento. | Puede perderse dato útil para análisis; choque con auditorías o regulaciones; hace falta una estrategia de respaldo y archivo que el ADR solo menciona. | ADR, retencion-de-datos, privacidad-GDPR, costo |
| ADR-005 (ADR/ADR-005-patient-registration-out-of-scope.md) | Tratar el registro de pacientes como subdominio de soporte: forma parte del sistema pero no es foco. | No declara. | "Seamless alignment with an existing solution" y evitar features fuera de alcance. | El sistema debe adaptarse a una solución externa. | ADR, fuera-de-alcance-explicito, tradeoffs-explicitos |
| ADR-006 (ADR/ADR-006-sensor-out-of-scope.md) | Crear un contexto acotado separado para sensores; el sistema no maneja ese contexto. | No declara. | Responsabilidades de hardware fuera del sistema. | No hay protocolo definido; se supone que los datos llegan por streaming. | ADR, fuera-de-alcance-explicito, supuestos-explicitos |
| ADR-007 (ADR/ADR-007-component-naming.md) | Prefijar "Vital Sign" a los componentes y renombrar "Monitor" a "Streamer". | No declara. | Claridad de responsabilidades a nivel sistema. | "No identified drawbacks at this time." | ADR, glosario |
| ADR-008 (ADR/ADR-008-scalibility-downplayed.md) | Bajar la prioridad de la escalabilidad. | No declara como alternativa; el texto dice que el escalado sería manual (nodos o hardware nuevos). | Los requisitos ya fijan el máximo; instalación on-premises; sin aumento de tráfico previsto. | Dificulta migrar a la nube. | ADR, escalabilidad, tradeoffs-explicitos |
| ADR-009 (ADR/ADR-009-deployability-downplayed.md) | Excluir la deployability como característica crítica. | No declara. | Instalación local, un solo producto por hospital. | Dificulta una futura migración a la nube. | ADR, deployability, tradeoffs-explicitos |
| ADR-010 (ADR/ADR-010-availability-not-used-for-choosing-system-architecture.md) | No usar la disponibilidad como criterio para elegir la arquitectura. | No declara. | La plantilla no la incluye; se resuelve a nivel de instancia, duplicando instancias críticas. | Puede pasar por alto optimizaciones arquitectónicas de disponibilidad. | ADR, disponibilidad-HA, tradeoffs-explicitos |
| ADR-011 (ADR/ADR-011-top3-characteristics.md) | Elegir Evolvability, Performance y Elasticity como top 3. | No declara. Dice que sale de un diagrama que mapea características a componentes. | Foco y selección dirigida. | Puede dejar fuera otros aspectos; depende de la exactitud del diagrama. | ADR, evolutividad, rendimiento-latencia, escalabilidad, tradeoffs-explicitos |
| ADR-012 (ADR/ADR-012-event-driven-architecture.md) | Usar arquitectura event-driven. | No declara. Dice que tiene una calificación de 14 estrellas en un esquema de selección (el esquema no está en el repo). | Elasticidad, evolvability y performance. | Complejidad de diseño; manejo de eventos y mensajes. | ADR, event-driven |
| ADR-013 (ADR/ADR-013-mobile-app-out-of-scope.md) | La app móvil queda fuera de la arquitectura; recibe push desde un sistema de notificaciones (ejemplo: Firebase). | No declara. | Enfocar el diseño en el núcleo; desarrollo independiente. | Coordinación entre equipos; riesgo de desalineación. | ADR, fuera-de-alcance-explicito, tradeoffs-explicitos |
| ADR-014 (ADR/ADR-014-separation-nurse-station.md) | La app de la estación de enfermería es aplicación externa que consume datos por WebSocket. | No declara. | Separar componentes núcleo de auxiliares; desarrollo independiente. | Coordinación; consistencia del formato de datos; dependencias. | ADR, fuera-de-alcance-explicito, tradeoffs-explicitos |
| ADR-015 (ADR/ADR-015-event-broker-kafka.md) | Adoptar Apache Kafka como broker de eventos. | No declara. | Compatibilidad con event-driven, baja latencia y escalabilidad. | Complejidad de implementación y operación; monitoreo necesario. | ADR, kafka, cola-de-mensajes, tradeoffs-explicitos |
| ADR-016 (ADR/ADR-016-separation-of-data-transmission-responsibilities.md) | Alertas al móvil por HTTP y datos a la estación por WebSocket; si uno de los dos receptores no está disponible, se notifica por el otro. | No declara. | "In the context of prioritizing human life", redundancia de alertas. | Dos protocolos; formato de datos consistente; monitoreo continuo de ambos canales. | ADR, resiliencia-fallos, tradeoffs-explicitos |
| ADR-017 (ADR/ADR-017-centralized-patient-data-security.md) | Los datos de pacientes no circulan por todo el ecosistema; la info para enfermería sale solo del sistema de registro de pacientes con sensores. | No declara. | Seguridad, al concentrar la información en un solo lugar. | Acceso limitado en tiempo real; exige seguridad robusta en el registro; desafíos de sincronización. | ADR, seguridad, fuente-unica-de-verdad, tradeoffs-explicitos |
| ADR-018 (ADR/ADR-018-high-availability-automated-instance-duplication.md) | Alta disponibilidad por duplicación de instancias con un orquestador (Kubernetes), con escalado automático cuando una instancia cae. | No declara. | Alta disponibilidad; prácticas DevOps modernas. | Complejidad de orquestación; más recursos y costo; depende de configuración y monitoreo. | ADR, disponibilidad-HA, contenedores, resiliencia-fallos, costo, tradeoffs-explicitos |
| ADR-019 (ADR/ADR-019-distributed-cache-analyzer.md) | Usar una caché distribuida (ejemplo: Redis) para que el Analyzer guarde datos y las nuevas instancias reconstruyan reglas. | No declara como alternativa; Redis aparece como ejemplo ("such as Redis"). | Recuperación rápida y reconstrucción de reglas tras fallas del Analyzer. | Complejidad; más recursos y costo; configuración y monitoreo. | ADR, cache, resiliencia-fallos, costo, tradeoffs-explicitos |
| ADR-020 (ADR/ADR-020-duplicate-instances-high-availability.md) | No diseñar failover de instancias individuales; duplicar todas y asumir que las nuevas instancias se levantan en 30 s o menos. | No declara. | Enfoque directo de alta disponibilidad; sencillez de failover. | Puede haber indisponibilidad temporal; más costo; el supuesto de 30 s puede no cumplirse. | ADR, disponibilidad-HA, resiliencia-fallos, supuestos-explicitos, costo, tradeoffs-explicitos |

## 4. Patrones y prácticas presentes

- event-driven: el flujo va de Vital Sign Recorder a un topic de signos, de ahí a Vital Sign Analyzer, luego a un topic de alertas y, desde allí, a Vital Sign Alert y Vital Sign Streamer (C4/C2-containers.md; UseCases/US1-monitor.md; UseCases/US2-alert.md; ADR/ADR-012-event-driven-architecture.md).
- streaming / cola-de-mensajes: "Message Streaming Platform" con topics "Vital Sign topic" y "Alert topic". El repo fija Kafka en ADR-015 y en FitnessFunctions/Sizing.md, pero el texto de C4/C2-containers.md y los casos de uso usan el nombre neutro (C4/C2-containers.md; ADR/ADR-015-event-broker-kafka.md).
- Pub/sub: Vital Sign Streamer se suscribe al topic de signos y Vital Sign Alert al topic de alertas (UseCases/US1-monitor.md; UseCases/US2-alert.md).
- time-series: almacenamiento particionado por ID de sensor (UseCases/US1-monitor.md; ADR/ADR-003-use-time-series-db.md).
- retención de 24 h: borrado de datos a las 24 h (ADR/ADR-004-data-retention-policy.md; EventStorming/EventStorming.md, paso 6).
- caché por instancia del Analyzer: el Analyzer guarda en caché la configuración y los datos recientes por sensor y paciente para no llamar a la TSDB en cada evento (C4/C2-containers.md).
- caché distribuida compartida entre instancias del Analyzer: su uso evita perder datos si el Analyzer cae (C4/C3-components.md, "Decisions"; ADR/ADR-019-distributed-cache-analyzer.md).
- motor de reglas configurable: Rule Engine (CRUD) guarda reglas por conjunto de sensores; el Logic Processor evalúa señal por señal y agrupadas por paciente (C4/C3-components.md).
- canales de alerta redundantes por protocolo: push al móvil y WebSocket a la estación (ADR/ADR-016-separation-of-data-transmission-responsibilities.md; FitnessFunctions/Alerts.md).
- contenedores y orquestación: Kubernetes con al menos 3 pods disponibles siempre, en tres máquinas virtuales (Deployment/Deployment.md; ADR/ADR-018-high-availability-automated-instance-duplication.md).
- duplicación de todas las instancias sin failover individual (ADR/ADR-020-duplicate-instances-high-availability.md).
- fuente única para datos de pacientes: sistema de registro centralizado (ADR/ADR-017-centralized-patient-data-security.md).
- mapa de contexto DDD y relaciones entre contextos: el análisis de datos y el registro colaboran en modo "conformist"; entre streaming y alarmas hay una anti-corruption layer (Business/TeamsTopology.md).
- topología de equipos: dos equipos alineados al flujo y uno de plataforma; supuesto de Ley de Conway (Business/TeamsTopology.md).
- event storming: seis fases, con contextos, actores y comandos (EventStorming/EventStorming.md).
- C4 (C1 a C3): vistas de contexto, contenedores y componentes del Analyzer (C4/).
- fitness functions: tres, de rendimiento (Sizing), de entrega de alertas (Alerts) y de falla de sensor (Failover) (README.md; FitnessFunctions/).
- ADR: 20 registros con estado, fecha, contexto, decisión y consecuencias (ADR/).
- glosario y actores escritos (Business/Glossary.md; Business/Actors.md).
- práctica de proceso: historial de git con cada ADR en su propio commit y mensajes de cambio por archivo [DATO] (git log del clon hermano, 184 commits del 2024-02-19 al 2024-03-07).

## 5. Cómo llegan de los requisitos a la arquitectura

[DATO] La cadena tiene pasos visibles con enlaces explícitos entre documentos:

1. Business/Requirements.md (requisitos del cliente) se destila en Business/DistilledRequirements.md (FR1 a FR10). Cada requisito tiene número.
2. Business/Requirements.md y Business/DistilledRequirements.md alimentan el event storming (EventStorming/EventStorming.md, pasos 1 a 6) y el análisis de características (ArchitectureCharacteristics/Characteristics.md, "Requirements Refinement").
3. Characteristics.md asigna requisitos a cuatro características: Availability, Evolvability, Performance y Elasticity (secciones "Availability", "Evolvability", "Performance" y "Elasticity").
4. Lista de siete características prioritarias en Characteristics.md ("Choosing the Top 7 characteristics"), con Scalability y Deployability marcadas como rebajadas por ADR-008 y ADR-009.
5. Selección de tres con tarjetas en el diagrama (ArchitectureCharacteristics/images/top3-final.png) y enlace a ADR-010 y ADR-011.
6. ADR-012 elige event-driven y enlaza a README.md#choosing-the-architecture.
7. C4 (C1 a C3) y use cases (UseCases/) bajan la decisión a contenedores y secuencias.
8. Fitness functions (FitnessFunctions/) prueban la decisión contra requisitos numéricos (1 s, 4000 señales/s, falla de sensor).

[DEDUCCIÓN] Se ordenan de forma explícita: primero requisitos, luego características, luego ADR. Las tres características prioritarias salen de tarjetas en un diagrama, no de una tabla de ponderación. Lo que el repo no muestra es una matriz de trazabilidad que cruce cada FR con cada decisión.

[HUECO] FR8 (exactitud de los datos) y el estado de sueño de FR4 no aparecen en ningún ADR ni en el C3. El C3 describe reglas sobre datos cacheados, pero no dice cómo el estado de sueño altera las alertas.

## 6. Lo distintivo

1. Cálculo de cadena contra el requisito de 1 s. [DATO] FitnessFunctions/Sizing.md suma la cadena sensor a pantalla: Recorder 320 ms, Streamer 320 ms, base de datos 16 ms, streaming 5 ms y LAN 32 ms, total 693 ms. Parte de supuestos explícitos: 500 pacientes, 1 kB por señal, 2 ms por señal y 20 pacientes por conexión. Qué evita: decidir sin cifras de carga. Qué cuesta: el pico de 8 señales por segundo por paciente no tiene fuente en el repo, y los tiempos se suman en serie sin prueba medida (FitnessFunctions/Sizing.md).
2. Canales de alerta separados por protocolo, con una regla de falla explícita. [DATO] ADR-016: "the unavailability of one data receiver will trigger notifications on the other". FitnessFunctions/Alerts.md agrega que la estación sigue recibiendo alertas aunque caiga internet. Qué evita: que una sola ruta de red silencie una alerta. Qué cuesta: dos protocolos y dos formatos que mantener.
3. Disponibilidad delegada al nivel de instancia, con un tiempo de recuperación supuesto. [DATO] ADR-010 saca la disponibilidad del criterio arquitectónico; ADR-020 no diseña failover individual y asume 30 s para levantar una instancia nueva. Qué evita: complejidad de failover por componente. Qué cuesta: indisponibilidad temporal durante esos 30 s y más recursos, según sus propias consecuencias. [HUECO] Ningún fitness function prueba los 30 s (FitnessFunctions/Failover.md trata falla de sensor, no de instancia).
4. Estado del Analyzer fuera de la instancia. [DATO] ADR-019 y C4/C3-components.md: una caché distribuida guarda los datos para que una instancia nueva reconstruya las reglas si el Analyzer cae. Qué evita: pérdida de datos de análisis en una caída. Qué cuesta: complejidad, recursos y configuración de la caché (ADR/ADR-019-distributed-cache-analyzer.md, "Cons").
5. Alcance excluido con decisión registrada y respaldo del cliente. [DATO] ADR-005, ADR-006, ADR-013 y ADR-014 excluyen registro de pacientes, sensores, app móvil y estación; EventStorming/EventStorming.md cita la respuesta del cliente por correo como base de ADR-005 y ADR-006. Qué evita: que el equipo construya lo que el cliente va a resolver en otro lado. Qué cuesta: integración con sistemas externos y riesgo de desalineación (ADR-013 y ADR-014, "Cons").

## 7. Huecos, inconsistencias y cosas fuera de alcance

- Push fuera de alcance vs. push requerido. README.md ("Postponed decisions") dice que las notificaciones push "fall outside the scope of the current architecture proposal". Business/Requirements.md exige alertas push al celular, y ADR-013, FitnessFunctions/Alerts.md, UseCases/US2-alert.md y C4/C2-containers.md las describen como parte del diseño.
- Registro de pacientes: ADR-005 lo deja fuera de foco, pero Business/TeamsTopology.md asigna su implementación al Equipo B y README.md dice que la siguiente iteración debe mostrar cómo registrar pacientes.
- ADR-005 y ADR-006 tienen títulos que no coinciden con la decisión. ADR-005 se llama "out of scope" pero dice que el registro forma parte del sistema. ADR-006 se llama "Sensor Bounded Context", su nombre de archivo dice "sensor-out-of-scope", y la decisión crea un contexto separado mientras dice que el sistema no lo maneja.
- ADR-006 dice que la decisión llega "after implementing event sourcing". En el repo, event sourcing aparece solo en ese ADR; ningún otro documento lo usa [HUECO].
- Escalabilidad: ADR-008 y Characteristics.md la rebajan ("no significant increase in traffic"), pero Requirements FR6 pide "scalability to accommodate up to 500 patients per physical MonitorMe instance". Deployment/Deployment.md habla de auto-escalado "advanced", y ADR-018 dice que las instancias escalan solas.
- Disponibilidad: Characteristics.md incluye Availability en el top 7, pero ADR-010 dice que no se usa para elegir arquitectura y Characteristics.md también dice "Availability is not considered in the selection of the system architecture". FitnessFunctions/Alerts.md promete "a near 100% uptime guarantee" sin medición.
- Evolvability vs. actualizaciones: Characteristics.md dice que el sistema "should support updates and enhancements without significant downtime", y es una de las tres características. ADR-002 excluye el mecanismo de actualización de la primera fase. EventStorming elimina el evento "Software updated".
- Réplicas: ADR-018 y Deployment/Deployment.md piden al menos 3 pods; ADR-020 y Deployment/Deployment.md recomiendan "three (or at least two) independent servers". Con dos servidores no se garantizan tres pods separados por hardware [DEDUCCIÓN].
- Recuperación del Analyzer: ADR-019 y C4/C3 cubren la caché, pero ningún documento dice cómo se detecta la caída ni cuánto tarda el reemplazo, más allá de los 30 s de ADR-020.
- Nombre del broker: ADR/ADR-015-event-broker-kafka.md decide Kafka en título y decisión. Los commits del clon hermano dicen "changed Kafka to neutral 'Message Streaming Platform'" (a363588) y "changing Kafka as a Streaming Platform (based on jury feedback)" (b4395e4). Los diagramas y C4/C2-containers.md usan el nombre neutro. [HUECO] Ningún documento registra la decisión del nombre.
- Base de series temporales: ADR-003 no nombra el producto. FitnessFunctions/Sizing.md usa InfluxDB "for now" y dice que la decisión final será después.
- Cifras de Sizing: FitnessFunctions/Sizing.md pone 5 ms para "Send to Streaming Platform" en la tabla y 4 ms en el texto. Además, 4000 eventos a 237 871 por segundo da unos 16,8 ms, no 16 ms (cálculo propio sobre las cifras del archivo).
- Fuente de la estación de enfermería: ADR-017 dice que la información de enfermería sale "exclusively from the patient registration system with sensors". En UseCases/US1-monitor.md y C4/C2-containers.md, el Streamer recibe datos del topic de signos, no del registro.
- Overview vs. requisitos: Business/Overview.md menciona sensores "wearable", integración con historias clínicas electrónicas y pacientes crónicos. Business/Requirements.md habla de dispositivos propios de StayHealthy en hospitales, on-premises, y de MyMedicalData como destino.
- Conexión por socket: UseCases/US1-monitor.md habla de "encrypted socket" solo en un bloque comentado. El texto activo dice "secure socket connection" y no hay ADR de seguridad para ese canal [HUECO].
- Rotación de pacientes cada 5 s (Business/Requirements.md) aparece solo en requisitos; ningún diagrama o ADR la trata [HUECO].
- Fitness functions con resultado "Success" (README.md): Sizing es un cálculo; Alerts y Failover son razonamientos sin medición en el repo [HUECO].
- Fuera de alcance declarado: sistema de actualizaciones (ADR-002), registro de pacientes y sensores (ADR-005, ADR-006), app móvil (ADR-013), estación de enfermería (ADR-014), autenticación y autorización (README.md), VPN a sistemas externos (README.md), hardware (README.md), integración con MonitorThem (README.md), y el rol de administrador de TI (Deployment/Deployment.md).
- ADR sin consecuencias en el repo: ADR-007 declara "No identified drawbacks at this time".

## 8. Candidatas a verdades enseñables (máx. 8)

1. Una arquitectura con meta de latencia puede validarse antes de construirse, sumando la cadena de procesos con cifras de carga declaradas. Ejemplo: 693 ms contra 1 s en FitnessFunctions/Sizing.md. Fuente: FitnessFunctions/Sizing.md; README.md (tabla de fitness functions). Respaldo: MEDIA (un documento claro, con enlace en README).
2. Las alertas críticas conviene enviarlas por dos canales de protocolos distintos, con una regla explícita para cuando uno falle. Ejemplo: HTTP al móvil y WebSocket a la estación con la regla "unavailability of one data receiver will trigger notifications on the other" (ADR-016). Fuente: ADR/ADR-016-separation-of-data-transmission-responsibilities.md; FitnessFunctions/Alerts.md; UseCases/US2-alert.md. Respaldo: FUERTE.
3. Si la disponibilidad se delega a la duplicación de instancias, el tiempo de recuperación se vuelve un supuesto que debe declararse. Ejemplo: 30 s en ADR-020, con ADR-010 y ADR-018 como base. Fuente: ADR/ADR-020-duplicate-instances-high-availability.md; ADR/ADR-010-availability-not-used-for-choosing-system-architecture.md. Respaldo: MEDIA (30 s aparece solo en ADR-020).
4. Lo que queda fuera del sistema se registra como decisión, con la razón y el origen de la decisión. Ejemplo: ADR-005 y ADR-006 citan la respuesta del cliente. Fuente: ADR/ADR-005-patient-registration-out-of-scope.md; ADR/ADR-006-sensor-out-of-scope.md; EventStorming/EventStorming.md. Respaldo: FUERTE.
5. Un componente que evalúa datos puede reconstruir su estado tras una caída si ese estado vive en una caché fuera de la instancia. Ejemplo: caché distribuida del Analyzer (ADR-019). Fuente: ADR/ADR-019-distributed-cache-analyzer.md; C4/C3-components.md; C4/C2-containers.md. Respaldo: FUERTE.
6. Un dato que deja de llegar es un caso de diseño: el sistema debe definir qué hace cuando falta o está viejo. Ejemplo: la regla del Logic Processor que no se ejecuta o alerta si el dato es antiguo (FitnessFunctions/Failover.md). Fuente: FitnessFunctions/Failover.md; Business/DistilledRequirements.md (FR1). Respaldo: MEDIA.
7. La estructura de equipos se diseña para seguir a la arquitectura (Ley de Conway). Ejemplo: dos equipos alineados al flujo de monitoreo y alertas, y uno de plataforma. Fuente: Business/TeamsTopology.md. Respaldo: MEDIA (un documento, que lo enuncia como supuesto).
8. Registrar el costo junto a cada decisión es práctica habitual; declarar alternativas es menos habitual. Ejemplo: los 20 ADR listan consecuencias negativas, pero solo ADR-003 y ADR-012 mencionan que hubo evaluación, sin listar opciones. Fuente: ADR/ (todos); ADR/ADR-003-use-time-series-db.md; ADR/ADR-012-event-driven-architecture.md. Respaldo: FUERTE.

## 9. Fragmentos citables

1. "The decision is to exclude availability as a criterion in the selection of the system architecture." (ADR/ADR-010-availability-not-used-for-choosing-system-architecture.md)
2. "In the context of prioritizing human life, the unavailability of one data receiver will trigger notifications on the other." (ADR/ADR-016-separation-of-data-transmission-responsibilities.md)
3. "and it is assumed that new instances will be raised within a maximum of 30 seconds." (ADR/ADR-020-duplicate-instances-high-availability.md)
4. "This decision prioritizes data security by centralizing patient information in one location." (ADR/ADR-017-centralized-patient-data-security.md)
5. "The Distributed Cache is used to ensure that crucial data is not lost even if the Vital Sign Analyzer crashes." (C4/C3-components.md)
6. "This idea implements the most important function in the system: PROTECT HUMANS LIFE." (C4/C2-containers.md)
7. "Based on the map, it was observed that the context related to patient data analysis and recording can collaborate on a conformist basis." (Business/TeamsTopology.md)
8. "Scalability has been downplayed. The team has emphasized that all relevant obligations have been specified in the requirements." (ADR/ADR-008-scalibility-downplayed.md)
9. "Our recommendation is to organize the hardware with three (or at least two) independent servers to safeguard against hardware failures." (Deployment/Deployment.md)

## 10. Etiquetas presentes (para comparar entre repos)

ADR, event-driven, streaming, cola-de-mensajes, kafka, time-series, cache, retencion-de-datos, fuente-unica-de-verdad, DDD, disponibilidad-HA, escalabilidad, rendimiento-latencia, seguridad, privacidad-GDPR, resiliencia-fallos, costo, evolutividad, deployability, contenedores, C4, event-storming, fitness-functions, supuestos-explicitos, riesgos-explicitos, fuera-de-alcance-explicito, tradeoffs-explicitos, topologia-de-equipos, glosario, otro: casos-de-uso-con-secuencia
