# BluzBrothers · MonitorMe (fase 1, texto)

Rutas relativas a `katas-src/BluzBrothers/`. Archivos de texto leídos: 41 (README, 6 de `Business/`, 21 ADR, `Characteristics.md`, 3 de `C4/`, `Deployment.md`, `EventStorming.md`, 3 de `FitnessFunctions/`, 4 de `UseCases/`).

## 1. El caso

[DATO] StayHealthy, Inc., empresa de software médico de San Francisco con dos productos SaaS en la nube (MonitorThem, analítica hospitalaria; MyMedicalData, historia clínica), entra al mercado de monitoreo y pide MonitorMe, un sistema que vigila los signos vitales de pacientes de hospital con dispositivos propios de la empresa (`Business/Requirements.md:3-9`). [DATO] Lee ocho fuentes (ritmo cardíaco, presión, oxígeno, glucosa, respiración, ECG, temperatura, estado de sueño) y las muestra en una pantalla consolidada por estación de enfermería con tiempo de respuesta medio de 1 segundo o menos, rotando de paciente cada 5 segundos, con un máximo de 20 pacientes por estación (`Business/Requirements.md:12`). [DATO] Guarda las últimas 24 horas de lecturas, filtrables por rango de tiempo y signo vital (`:14`); analiza y alerta por umbral o tendencia, ajustando según el paciente esté dormido o despierto (`:16-18`); avisa por push a la app móvil y a la pantalla de enfermería (`:20`); si falla un dispositivo, el resto sigue funcionando (`:22`); genera instantáneas que se suben a MyMedicalData por HTTP seguro (`:24`). [DATO] Cada dispositivo transmite a su ritmo, de cada 500 ms (ritmo cardíaco) a cada hora (presión) (`:27-35`). [DATO] Restricciones duras: instalación on-premises completa en cada hospital, incluidos los datos (`:37`); máximo 500 pacientes por instancia (`:39`); plataforma y bases de datos sin especificar (`:41`); habrá más dispositivos (`:45`); exactitud porque "human lives are at stake" (`:47`); mucho cambio esperado por ser negocio nuevo (`:49`); datos seguros pero sin obligación regulatoria como HIPAA (`:51`).

## 2. Qué entregó el equipo

- `README.md`: relato completo de la solución, tabla de fitness functions con resultado y tabla de decisiones pospuestas (`README.md:91-107`).
- `Business/Requirements.md`: enunciado original de la kata.
- `Business/DistilledRequirements.md`: 10 requisitos destilados FR1–FR10 (`:7-16`).
- `Business/Overview.md`, `Business/Actors.md`, `Business/Glossary.md`: visión de negocio, actores y glosario.
- `Business/TeamsTopology.md`: mapa de contextos DDD y organización en dos equipos stream-aligned y un equipo de plataforma.
- `EventStorming/EventStorming.md`: seis fases de event storming que terminan en los cuatro componentes.
- `ArchitectureCharacteristics/Characteristics.md`: de 9 características a 7 y luego a las 3 principales.
- `C4/C1-context.md`, `C4/C2-containers.md`, `C4/C3-components.md`: vistas C4 (C3 solo para el Vital Sign Analyzer).
- `Deployment/Deployment.md`: despliegue en Kubernetes on-premises.
- `FitnessFunctions/Sizing.md`, `Alerts.md`, `Failover.md`: tres fitness functions (cálculo de rendimiento, entrega de alertas, fallo de sensor).
- `UseCases/US1`–`US4`: cuatro casos de uso con diagrama de secuencia descrito en texto.
- `ADR/`: 21 archivos (ADR-000 plantilla, ADR-001 uso de ADR, 19 ADR de decisión, ADR-002 a ADR-020).

Cuentas: [DATO] 19 ADR de decisión; 10 requisitos destilados; 36 imágenes en el inventario (diagramas C4, despliegue, secuencias, event storming, características). Métodos nombrados: [DATO] Event Storming (`README.md:36`, `EventStorming/EventStorming.md:2`); C4 (`README.md:59`); fitness functions (`README.md:91`); Team Topologies y Context Map de DDD (`Business/TeamsTopology.md:3-5`); ADR de Michael Nygard (`ADR/ADR-001-use-adr.md:13`); una "selection schema for architectural styles" con puntaje en estrellas (`ADR/ADR-012-event-driven-architecture.md:15`). [DEDUCCIÓN, de la mención a "template" y "stars" en ADR-010:15 y ADR-012:15] la plantilla de selección de estilos parece la hoja de calificación de estilos por estrellas; el texto no la nombra.

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR-002 | El mecanismo de actualización del sistema queda fuera de la primera fase. | Accepted | no declara | Complejidad que alargaría la primera entrega; un piloto permite recoger feedback sin actualizar; foco en lo central. | Riesgo de quedar desactualizado; menos capacidad de mejorar con feedback temprano; trabajo grande en la segunda fase. | no cita requisito | `ADR/ADR-002-update-move-to-next-phase.md:12-30` |
| ADR-003 | Base de datos de series temporales (TSDB) como almacenamiento principal. | Accepted | no declara (dice "thorough evaluation of various database technologies" sin nombrarlas) | Rendimiento con datos con marca de tiempo; escalabilidad; funciones de agregación, downsampling y retención; comunidad. | Curva de aprendizaje; posibles límites de integración; inversión en infraestructura y formación. | escalabilidad, rendimiento, fiabilidad (genérico) | `ADR/ADR-003-use-time-series-db.md:9-30` |
| ADR-004 | Política de retención que borra los datos a las 24 horas. | Accepted | no declara | Cumplimiento de normas de privacidad, rendimiento, costo de almacenamiento. | Pérdida de datos útiles para análisis futuro; problemas si hace falta auditar; necesidad de respaldo para lo que deba durar más. | no cita requisito (el requisito de 24 h está en `Business/Requirements.md:14`) | `ADR/ADR-004-data-retention-policy.md:9-26` |
| ADR-005 | El registro de pacientes es un subdominio de soporte: parte del sistema, sin foco en él. | Accepted | no declara | Surgió en event storming; respuesta del cliente (`EventStorming/EventStorming.md:122-123`). | El sistema tiene que adaptarse a una solución externa. | no cita | `ADR/ADR-005-patient-registration-out-of-scope.md:10-23` |
| ADR-006 | Los sensores son un bounded context aparte, fuera del sistema. | Accepted | no declara | El cliente aclaró que el sistema no maneja sensores; el hardware queda fuera. | No hay protocolo conocido; se asume que los datos llegan en streaming. | no cita | `ADR/ADR-006-sensor-out-of-scope.md:10-22` |
| ADR-007 | Prefijo "Vital Sign" en los componentes y "Monitor" pasa a llamarse "Streamer". | Accepted | no declara | Claridad de responsabilidades. | "No identified drawbacks at this time." | no cita | `ADR/ADR-007-component-naming.md:10-23` |
| ADR-008 | Se resta importancia a la escalabilidad. | Accepted | no declara | Carga máxima ya definida en los requisitos; on-premises; nuevos sensores se agregan a mano con nodos o hardware. | Limita migrar a la nube. | 9 características; on-premises | `ADR/ADR-008-scalibility-downplayed.md:9-36`; `ArchitectureCharacteristics/Characteristics.md:32` |
| ADR-009 | Se excluye la desplegabilidad como característica crítica. | Accepted | no declara | Instalación local, una por hospital, sin migraciones. | Dificulta una futura migración a la nube. | on-premises | `ADR/ADR-009-deployability-downplayed.md:14-22`; `Characteristics.md:33` |
| ADR-010 | La disponibilidad no se usa como criterio para elegir el estilo; se resuelve a nivel de instancia. | Accepted | no declara | La plantilla de selección no incluye disponibilidad; se garantiza duplicando instancias. | Puede pasar por alto optimizaciones de arquitectura ligadas a la disponibilidad. | disponibilidad | `ADR/ADR-010-availability-not-used-for-choosing-system-architecture.md:14-23`; `Characteristics.md:86` |
| ADR-011 | Las tres características principales son evolvability, performance y elasticity. | Accepted | no declara (en el texto vecino, la cuarta candidata era availability, `Characteristics.md:46-50`) | Diagrama que mapea características a componentes. | Puede pasar por alto otros aspectos; depende de la exactitud del diagrama. | evolvability, performance, elasticity | `ADR/ADR-011-top3-characteristics.md:14-26` |
| ADR-012 | Estilo event-driven. | Accepted | no declara en el texto (la comparación está en imagen) | Criterios de elasticidad, evolvabilidad y rendimiento; 14 estrellas en el esquema de selección. | Complejidad añadida; manejo de eventos y sus trampas; depende de que los criterios sean correctos. | elasticity, evolvability, performance | `ADR/ADR-012-event-driven-architecture.md:14-26` |
| ADR-013 | La app móvil queda fuera del diseño; recibe push por un servicio como Firebase y la hace otro equipo. | Accepted | no declara | Foco en el núcleo; desarrollo independiente. | Coordinación entre equipos; riesgo de desalineación. | no cita | `ADR/ADR-013-mobile-app-out-of-scope.md:14-25` |
| ADR-014 | La aplicación Nurse Station es externa y recibe datos en tiempo real por web socket. | Accepted | no declara | Separar núcleo de aplicaciones auxiliares; desarrollo independiente. | Coordinación; consistencia del formato de datos; dependencias. | no cita | `ADR/ADR-014-separation-nurse-station.md:14-26` |
| ADR-015 | Apache Kafka como broker de eventos. | Accepted | nombra "simpler event brokers" sin identificarlos | Compatible con event-driven; baja latencia y alta escalabilidad; durabilidad y tolerancia a fallos. | Complejidad de implementación y mantenimiento; monitoreo; coordinación. | rendimiento, escalabilidad | `ADR/ADR-015-event-broker-kafka.md:14-26` |
| ADR-016 | Alertas al móvil por HTTP y datos a Nurse Station por web socket; si un receptor no está, se avisa por el otro. | Accepted | no declara | Separación de responsabilidades; "prioritizing human life". | Dos protocolos; formato consistente; monitoreo de ambos canales. | no cita requisito (relacionado con `Requirements.md:20`) | `ADR/ADR-016-separation-of-data-transmission-responsibilities.md:14-26` |
| ADR-017 | Los datos del paciente no circulan por todo el ecosistema; salen solo del registro de pacientes y sensores. | Accepted | no declara | Seguridad al centralizar los datos en un lugar. | Menos acceso cuando se necesita información completa en tiempo real; el registro central necesita seguridad fuerte; integración. | seguridad | `ADR/ADR-017-centralized-patient-data-security.md:13-25` |
| ADR-018 | Alta disponibilidad duplicando instancias con un orquestador como Kubernetes, que levanta instancias solo. | Accepted | no declara | Sin intervención manual de administradores. | Complejidad del orquestador; más recursos y costo; depende de la configuración. | disponibilidad | `ADR/ADR-018-high-availability-automated-instance-duplication.md:13-25` |
| ADR-019 | Caché distribuida (por ejemplo Redis) para el Analyzer. | Accepted | no declara | Que una instancia nueva reconstruya reglas con los datos recientes si falla la actual. | Complejidad; recursos y costo; configuración y monitoreo. | no cita | `ADR/ADR-019-distributed-cache-analyzer.md:14-26` |
| ADR-020 | No hay failover por instancia individual: todo se duplica y se asume que una instancia nueva sube en 30 s como máximo. | Accepted | no declara | Enfoque simple para la alta disponibilidad. | Indisponibilidad temporal en fallos concretos; más recursos; los 30 s pueden no cumplirse. | disponibilidad | `ADR/ADR-020-duplicate-instances-high-availability.md:13-25` |

No incluidos: `ADR/ADR-000-template.md` (plantilla) y `ADR/ADR-001-use-adr.md` (decisión de usar ADR de Nygard).

## 4. Hallazgos para el curso

#### H01 · Las características salen de palabras del requisito y se recortan
- Idea: las características de arquitectura se derivan de frases concretas del requisito, se listan todas y luego se descartan con razón escrita las que el contexto vuelve secundarias.
- Lo que hizo el equipo: [DATO] partió de palabras clave del requisito (`ArchitectureCharacteristics/Characteristics.md:4`), definió 9 características (`:8-18`), eligió 7 con una razón por cada una (`:21-29`) y bajó escalabilidad y desplegabilidad (`:32-33`) en ADR-008 y ADR-009.
- Razón declarada: escalabilidad, porque la carga máxima ya está definida y nuevos sensores se agregan a mano (`Characteristics.md:32`); desplegabilidad, porque se instala una vez por hospital sin migraciones (`:33`).
- Costo o trade-off admitido: ambas ADR admiten que dificulta migrar a la nube (`ADR/ADR-008-scalibility-downplayed.md:36`; `ADR/ADR-009-deployability-downplayed.md:22`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `Characteristics.md:4-33`; ADR-008; ADR-009; `Business/Requirements.md:37-39`.
- Completitud: *parcial*: no hay alternativas declaradas; la razón y el costo sí están.
- Contexto para contarlo: MonitorMe; on-premises por hospital; tope de 500 pacientes por instancia.
- Depende de imagen: no (la tabla `characteristics.png` acompaña, pero el texto basta).
- Verificado: [ ]

#### H02 · Elegir las tres principales marcando las características sobre cada componente
- Idea: para reducir a tres, el equipo puso cada característica sobre los componentes que la necesitan; las que importan solo a un componente se tratan ahí y no deciden el estilo de todo el sistema.
- Lo que hizo el equipo: [DATO] etiquetó los cuatro módulos del event storming con notas por característica (`Characteristics.md:37-43`); seguridad, tolerancia a fallos y configurabilidad resultaron importantes solo para módulos individuales (`:45`); quedaron availability, evolvability, performance y elasticity (`:46-50`); el final fue evolvability, performance y elasticity (`:87`, ADR-011).
- Razón declarada: "Based on a diagram mapping characteristics to components" (`ADR/ADR-011-top3-characteristics.md:15`).
- Costo o trade-off admitido: priorizar tres puede pasar por alto otros aspectos; depende de la exactitud del diagrama (`ADR-011:24-26`).
- Alternativas que nombra: availability como cuarta candidata (`Characteristics.md:46-50`).
- Estado: Accepted.
- Fuente: `Characteristics.md:36-90`; ADR-011.
- Completitud: *parcial*: el mapeo concreto característica por componente está solo en imagen.
- Contexto para contarlo: los cuatro componentes (Recorder, Analyzer, Streamer, Alert); qué es una característica de arquitectura.
- Depende de imagen: sí (`ArchitectureCharacteristics/images/components-sticky-cards.png`, `4components.png`, `top3-final.png`).
- Verificado: [ ]

#### H03 · La disponibilidad se saca de la elección de estilo y se resuelve en la infraestructura
- Idea: una cualidad crítica no tiene que decidir el estilo si se puede garantizar en otra capa; el equipo lo escribe como decisión y la cubre con duplicación de instancias.
- Lo que hizo el equipo: [DATO] excluyó la disponibilidad como criterio de estilo (ADR-010) y argumentó que depende de rendimiento y elasticidad (`Characteristics.md:86-87`); la garantiza con Kubernetes duplicando instancias, al menos 3 pods (`Deployment/Deployment.md:17`, ADR-018) y tres (o al menos dos) servidores independientes (`Deployment.md:28`, ADR-020).
- Razón declarada: la plantilla de selección no incluye disponibilidad; se garantiza a nivel de instancia (`ADR/ADR-010-availability-not-used-for-choosing-system-architecture.md:15`); Availability is contingent upon both Performance and Elasticity (`Characteristics.md:86`).
- Costo o trade-off admitido: puede pasar por alto optimizaciones de arquitectura para la disponibilidad (`ADR-010:23`); más recursos y costo por duplicar (`ADR-018:24`, `ADR-020:24`); indisponibilidad temporal sin failover individual (`ADR-020:23`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-010, ADR-018, ADR-020; `Characteristics.md:86-87`; `Deployment/Deployment.md:9-28`.
- Completitud: *parcial*: sin alternativas; [DEDUCCIÓN, de ADR-010:15] la razón principal es una limitación de la plantilla usada, no del caso.
- Contexto para contarlo: qué es disponibilidad; qué es duplicar instancias con un orquestador; el requisito de que el sistema siga si falla un dispositivo.
- Depende de imagen: no.
- Verificado: [ ]

#### H04 · Event-driven elegido por las tres características, con Kafka como broker
- Idea: el estilo se elige puntuando estilos contra las tres características principales; luego se elige la pieza concreta (el broker) que lo implementa.
- Lo que hizo el equipo: [DATO] eligió event-driven con 14 estrellas según el esquema de selección (`ADR/ADR-012-event-driven-architecture.md:15`); eligió Apache Kafka como broker (`ADR/ADR-015-event-broker-kafka.md:15`).
- Razón declarada: elasticidad, evolvabilidad y rendimiento (`ADR-012:15`); compatibilidad, baja latencia, escalabilidad (`ADR-015:15`).
- Costo o trade-off admitido: complejidad y manejo de eventos (`ADR-012:24-26`); complejidad de mantener Kafka frente a brokers más simples (`ADR-015:24-26`).
- Alternativas que nombra: los otros estilos solo en imagen; "simpler event brokers" sin nombre (`ADR-015:24`).
- Estado: Accepted. [DATO] Pero `FitnessFunctions/Sizing.md:36` dice que Kafka fue elegido para el cálculo y "the final decision will be taken later".
- Fuente: ADR-012, ADR-015; `README.md:53-55`; `FitnessFunctions/Sizing.md:36`.
- Completitud: *parcial*: la comparación de estilos y el puntaje de los demás están solo en imagen.
- Contexto para contarlo: qué es arquitectura event-driven y qué es un broker; las tres características principales.
- Depende de imagen: sí (`ArchitectureCharacteristics/images/chosen-architecture.png`, `top3-characteristics.png`).
- Verificado: [ ]

#### H05 · Un cálculo de presupuesto de latencia como fitness function
- Idea: el requisito de 1 segundo se comprueba sumando el tiempo de cada tramo, de sensor a pantalla, con supuestos escritos.
- Lo que hizo el equipo: [DATO] calculó 4,22 señales por segundo por paciente (`FitnessFunctions/Sizing.md:6-16`); con 500 pacientes y 1 kB por señal, 2.100 req/s de media y 4.000 de pico, 4 MB/s (`:18-25`); escritura en InfluxDB con una cota de 16 ms calculada por el equipo (`:29-33`); Kafka 4 ms (`:41`); LAN de 1 Gb/s 32 ms (`:44`); Streamer y Recorder 320 ms cada uno con 3 instancias y 2 ms por señal como supuesto (`:47-55`, `:51`); total 693 ms (`:60-67`). El README marca la función como "Success" (`README.md:94`).
- Razón declarada: comprobar el objetivo de respuesta media de 1 s o menos (`README.md:94`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara; InfluxDB y Kafka se usan para el cálculo con decisión final pospuesta (`Sizing.md:29`, `:36`).
- Estado: no declara.
- Fuente: `FitnessFunctions/Sizing.md`; `README.md:92-94`.
- Completitud: *parcial*: [HUECO] el pico de 8 señales por segundo por paciente no se justifica (`Sizing.md:23`); [DATO] el texto da 4 ms para Kafka (`:41`) y la tabla final usa 5 ms (`:65`); el "20 connections x 8 sensors" (`:50`) cuenta pacientes como conexiones.
- Contexto para contarlo: el requisito de 1 s; los ritmos de cada sensor; qué es Recorder y Streamer.
- Depende de imagen: sí, para el dato de Kafka (`FitnessFunctions/images/kafka-benchmark.png`).
- Verificado: [ ]

#### H06 · Dos canales de alerta para que una falla no deje sin aviso
- Idea: la función que protege vidas se entrega por dos caminos independientes (push por internet y pantalla por la LAN local), de modo que la caída de uno no silencia la alerta.
- Lo que hizo el equipo: [DATO] el Analyzer publica en un topic de alertas; Vital Sign Alert lo envía por push al móvil y Vital Sign Streamer a la Nurse Station por socket (`UseCases/US2-alert.md:26-32`; `C4/C2-containers.md:17-22`); ADR-016 separa HTTP para el móvil y web socket para la estación, y si un receptor no está disponible se avisa por el otro (`ADR-016:15`).
- Razón declarada: "In the context of prioritizing human life" (`ADR-016:15`); "PROTECT HUMANS LIFE" (`C2-containers.md:22`); alertas accesibles aunque se corte internet (`FitnessFunctions/Alerts.md:5`).
- Costo o trade-off admitido: dos protocolos, formato consistente, monitoreo de ambos canales (`ADR-016:24-26`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-016; `C4/C2-containers.md:17-30`; `FitnessFunctions/Alerts.md:1-7`; `UseCases/US2-alert.md`.
- Completitud: *parcial*: sin alternativas. [HUECO] La fitness function de alertas afirma "near 100% uptime guarantee" (`Alerts.md:7`) sin cálculo ni prueba.
- Contexto para contarlo: el requisito de alertas al móvil y a la estación; qué es un topic en un broker.
- Depende de imagen: no (el diagrama `alerting_sequence.jpg` acompaña).
- Verificado: [ ]

#### H07 · Qué pasa cuando falla un sensor, recorrido componente por componente
- Idea: una fitness function de fallo se razona siguiendo el flujo de datos y viendo qué hace cada componente cuando deja de llegar una señal.
- Lo que hizo el equipo: [DATO] Recorder y Streamer simplemente no reciben ni muestran esa señal (`FitnessFunctions/Failover.md:4-5`); el Analyzer guarda en caché la última señal con marca de tiempo y el Logic Processor puede tener reglas para datos ausentes o viejos: no ejecutar la regla o enviar una alerta (`:6-9`).
- Razón declarada: requisito de que si falla un dispositivo el resto siga funcionando (`README.md:96`; `Business/Requirements.md:22`).
- Costo o trade-off admitido: no declara; [DATO] admite que la falta de ritmo cardíaco "is a critical concern" (`Failover.md:6`).
- Alternativas que nombra: no declara.
- Estado: no declara (README la marca "Success", `README.md:96`).
- Fuente: `FitnessFunctions/Failover.md`; `C4/C3-components.md`.
- Completitud: *ilustrativo*: muestra el razonamiento; la conducta depende de una configuración no definida.
- Contexto para contarlo: los componentes Recorder, Streamer, Analyzer; la caché del Analyzer.
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · Caché distribuida para que una instancia nueva del Analyzer retome el estado
- Idea: un componente con estado (reglas que combinan varios sensores) guarda ese estado fuera de la instancia para que el reemplazo automático no lo pierda.
- Lo que hizo el equipo: [DATO] caché distribuida tipo Redis para el Analyzer (`ADR-019:15`); evita llamadas innecesarias a la TSDB y permite análisis multiparámetro (`C4/C2-containers.md:15`); conserva datos si el Analyzer cae y se comparte entre instancias (`C4/C3-components.md:24-25`).
- Razón declarada: que las instancias nuevas reconstruyan las reglas con los datos recientes (`ADR-019:15`).
- Costo o trade-off admitido: complejidad, recursos y costo, configuración (`ADR-019:24-26`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-019; `C4/C2-containers.md:15`; `C4/C3-components.md:9-25`.
- Completitud: *parcial*: sin alternativas. [DATO] `C2-containers.md:15` habla de "own internal cache" mientras ADR-019 dice caché distribuida.
- Contexto para contarlo: el Analyzer; que las instancias se duplican y se reemplazan solas (H03); qué es una caché.
- Depende de imagen: sí, para la estructura interna (`C4/images/c3-analyzer.jpg`).
- Verificado: [ ]

#### H09 · Del event storming a los componentes, y lo que queda fuera
- Idea: los límites del sistema salen de agrupar eventos de dominio; algunos contextos se declaran fuera (sensores) o de soporte (registro de pacientes) tras consultar al cliente.
- Lo que hizo el equipo: [DATO] seis fases (recolectar eventos, ordenar, validar hacia atrás, actores y comandos, agrupar, políticas) (`EventStorming/EventStorming.md:4-94`); seis contextos (`:106-118`); registro de pacientes como subdominio de soporte (ADR-005) y sensores fuera (ADR-006); quedan Recorder, Analyzer, Monitor y Alert (`:126`), y Monitor se renombra Streamer (`:130-134`, ADR-007).
- Razón declarada: respuesta del cliente por email (`EventStorming.md:122-124`; `ADR-006:14`).
- Costo o trade-off admitido: adaptarse a una solución externa (`ADR-005:23`); no hay protocolo de sensor y se asume streaming (`ADR-006:22`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `EventStorming/EventStorming.md`; ADR-005, ADR-006, ADR-007.
- Completitud: *parcial*: los mapas de eventos están en imágenes; las razones de agrupación no se detallan.
- Contexto para contarlo: qué es event storming y qué es un bounded context.
- Depende de imagen: sí (`EventStorming/images/5.png`, `7.png`, `7.1.png`, `components.png`).
- Verificado: [ ]

#### H10 · Recortar el alcance de la primera fase con un ADR que admite el costo
- Idea: dejar algo fuera de la primera versión es una decisión de arquitectura que se escribe con su costo.
- Lo que hizo el equipo: [DATO] excluyó el mecanismo de actualización de la primera fase (ADR-002); dejó fuera del diseño la app móvil (ADR-013) y la Nurse Station como aplicación externa (ADR-014); lista decisiones pospuestas: autenticación, push, VPN, hardware, registro de pacientes, integración con MonitorThem (`README.md:98-107`).
- Razón declarada: tiempo de entrega y recursos limitados, piloto para recoger feedback (`ADR-002:15-17`).
- Costo o trade-off admitido: riesgo de quedar desactualizado, menos mejora temprana, trabajo grande en la segunda fase (`ADR-002:27-29`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-002, ADR-013, ADR-014; `README.md:98-107`.
- Completitud: *parcial*: sin alternativas. [DATO] El requisito pide cambio frecuente (`Requirements.md:49`) y la característica evolvability habla de actualizaciones sin parada (`Characteristics.md:67`); ADR-002 no relaciona esto con la exclusión.
- Contexto para contarlo: MonitorMe; que el negocio espera mucho cambio.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Datos del paciente en un solo lugar
- Idea: limitar por dónde circulan los datos personales reduce la superficie que hay que proteger, a costa de concentrar la seguridad en un punto.
- Lo que hizo el equipo: [DATO] los datos del paciente no se transmiten por todo el ecosistema; salen solo del registro de pacientes y sensores (`ADR-017:14`); el Analyzer empareja la señal con el paciente vía Signal Normalizer (`C4/C3-components.md:11`) y la instantánea se arma en el Patient and Sensor Register (`UseCases/US3-snapshot.md:12-15`).
- Razón declarada: seguridad por centralizar (`ADR-017:14`).
- Costo o trade-off admitido: menos acceso cuando hace falta información completa en tiempo real; seguridad fuerte en el registro central; integración (`ADR-017:23-25`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-017; `UseCases/US3-snapshot.md`; `US4-review-data.md`.
- Completitud: *parcial*: sin alternativas.
- Contexto para contarlo: requisito de confidencialidad sin HIPAA (`Requirements.md:51`); el registro de pacientes.
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Base de series temporales y retención de 24 horas
- Idea: la forma de los datos (lecturas con marca de tiempo) y el plazo del requisito eligen el tipo de base y su política de borrado.
- Lo que hizo el equipo: [DATO] TSDB como almacenamiento principal (ADR-003); borrado a las 24 horas (ADR-004); datos particionados por ID de sensor (`UseCases/US1-monitor.md:35`); los eventos de archivado y borrado del event storming se eliminaron porque lo resuelve la TSDB (`EventStorming.md:42`).
- Razón declarada: rendimiento y funciones de retención (`ADR-003:16-19`); privacidad, rendimiento, costo (`ADR-004:15-17`).
- Costo o trade-off admitido: curva de aprendizaje e integración (`ADR-003:27-29`); pérdida de datos útiles, auditoría, respaldo (`ADR-004:24-26`).
- Alternativas que nombra: no declara; la TSDB concreta no se nombra en el ADR; InfluxDB aparece solo para el cálculo, con decisión final pospuesta (`Sizing.md:29`).
- Estado: Accepted.
- Fuente: ADR-003, ADR-004; `Business/Requirements.md:14`.
- Completitud: *parcial*: [DATO] ADR-004 da como razón cumplir normas de privacidad, mientras el requisito dice que no hay obligación regulatoria (`Requirements.md:51`); no cita el requisito de 24 h.
- Contexto para contarlo: qué es una base de series temporales; el requisito de 24 h.
- Depende de imagen: no.
- Verificado: [ ]

#### H13 · Equipos alineados a los componentes
- Idea: la organización de equipos se diseña según la arquitectura (ley de Conway), con equipos por flujo y uno de plataforma.
- Lo que hizo el equipo: [DATO] Context Map con relación conformista entre análisis y registro, y capa anticorrupción entre monitoreo/streaming y alarmas (`Business/TeamsTopology.md:23`); dos equipos stream-aligned (A: monitoreo; B: alertas y registro de pacientes) y uno de plataforma (`:25-61`); supuesto de Conway (`:65`).
- Razón declarada: alinear equipos con la arquitectura (`TeamsTopology.md:3`, `:65`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `Business/TeamsTopology.md`; `README.md:108-111`.
- Completitud: *ilustrativo*: sin ADR ni costo.
- Contexto para contarlo: ley de Conway; Team Topologies; los componentes.
- Depende de imagen: sí (`Business/images/contextMap.png`, `teamsTopology.png`).
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `Business/Overview.md`: visión y objetivos de marketing (pacientes crónicos, wearables, EHR) que no coinciden con el enunciado de hospital (`Overview.md:8-16`); no aporta decisiones.
- `Business/Actors.md` y `Business/Glossary.md`: listados de actores y términos; repiten el enunciado.
- `ADR/ADR-000-template.md` y `ADR/ADR-001-use-adr.md`: plantilla y adopción del formato ADR.
- Tabla de definiciones en `Characteristics.md:8-18`: [DATO] varias definiciones (availability, evolvability, elasticity, fault-tolerance, configurability) hablan de "a building or space"; no sirven para definir los términos en el curso.
- `C4/C1-context.md` y párrafos introductorios de C2/C3 y `TeamsTopology.md:3`: explicaciones genéricas del modelo C4 y de Team Topologies.
- `ADR/ADR-007-component-naming.md`: renombrado de componentes; no cambia la arquitectura.
- `UseCases/US4-review-data.md` y `US3-snapshot.md`: flujos REST simples; el único dato útil (datos centralizados) ya está en H11.

## 6. Imágenes para fase 2

- `ArchitectureCharacteristics/images/chosen-architecture.png`: tabla de estilos con estrellas (event-driven 14); citada en `README.md:55` y ADR-012.
- `ArchitectureCharacteristics/images/components-sticky-cards.png`: características marcadas sobre cada componente; `Characteristics.md:43`.
- `ArchitectureCharacteristics/images/top3-characteristics.png` y `top3-final.png`: las tres características finales; `README.md:50`, `Characteristics.md:90`.
- `ArchitectureCharacteristics/images/characteristics.png`: palabras clave del requisito mapeadas a características; `Characteristics.md:6`.
- `C4/images/c2.jpg`: vista de contenedores; `README.md:75`, `C2-containers.md:3`.
- `C4/images/c3-analyzer.jpg`: componentes internos del Analyzer; `C3-components.md:7`.
- `Deployment/images/kubernetes.jpg` y `kubernetes-on-premise.png`: despliegue con pods y tres máquinas; `Deployment.md:6`, `:26`.
- `FitnessFunctions/images/kafka-benchmark.png`: benchmark que sostiene los 4 ms de Kafka; `Sizing.md:39`.
- `UseCases/images/alerting_sequence.jpg`: secuencia de doble canal de alerta; `US2-alert.md:16`.
- `EventStorming/images/7.1.png` y `components.png`: contextos dentro del alcance y componentes finales; `EventStorming.md:128`, `:136`.
- `Business/images/contextMap.png`: mapa de contextos con conformista y anticorrupción; `TeamsTopology.md:21`.

## 7. Preguntas abiertas

- Qué estilos y puntajes compara el esquema de selección que da 14 estrellas a event-driven (solo en imagen).
- Qué característica se marcó sobre qué componente en las notas adhesivas (solo en imagen).
- Por qué el pico de carga es 8 señales por segundo por paciente (`Sizing.md:23`).
- Cuál es el valor de Kafka correcto en el cálculo: 4 ms (`Sizing.md:41`) o 5 ms (`:65`).
- Si Kafka es decisión aceptada (ADR-015) o provisional (`Sizing.md:36`).
- Si la caché del Analyzer es interna (`C2-containers.md:15`) o distribuida (ADR-019, `C3-components.md:24`).
- US2 lista los mismos contenedores que US1 y no nombra Analyzer ni Alert (`US2-alert.md:7-13`); el diagrama `US2.jpg` lo aclararía.
- ADR-006 menciona "after implementing event sourcing" (`:10`) sin que el resto del texto defina ni use event sourcing.
- Cómo se conecta ADR-016 (HTTP al móvil) con ADR-013 (servicio de push tipo Firebase) y US2 (servicio de push en la nube).
