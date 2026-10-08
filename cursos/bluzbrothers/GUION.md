# BluzBrothers · Guion del curso en video

Curso en video, en español neutro con tuteo, que reconstruye cómo razonó **BluzBrothers**, primer lugar del O'Reilly Architecture Kata de invierno de 2024 (caso **MonitorMe**, de StayHealthy, Inc.). Sigue las reglas de `video/PEDAGOGY.md` de KatArch y el método de `ADR-001-pedagogical-strategy-and-web-platform.md`: un solo equipo como columna, sin spoilers, cada afirmación anclada al repositorio, honestidad sobre los huecos.

- **Columna:** `HISTORIA.md`, la reconstrucción del proceso a partir de los 184 commits. El orden de los capítulos es el orden en que el equipo razonó, no el orden del README.
- **Fuente de verdad del texto:** los `video/chN/narration.json`. Las líneas de este guion coinciden exactamente con ellos; `node fuentes/sync.mjs` lo comprueba y recalcula las duraciones.
- **Duración total estimada:** 51:11 a 2,2 palabras por segundo, contando las pausas escritas (sin las transiciones entre escenas).

## Por qué nueve capítulos

KatArch tiene once capítulos porque el repositorio de ArchColider cubre negocio, números, principios, estilo, dominio, mundo físico, recorrido del cliente, nube y costos. El de BluzBrothers es más delgado: no tiene costos, ni nube, ni preguntas del cliente guardadas, ni presentación. Lo que sí tiene alcanza para nueve capítulos sin relleno, y cada uno corresponde a una etapa que el historial muestra con fecha:

1. el pliego (15 y 16 de febrero);
2. la tormenta de eventos (16 y 17);
3. las características, con su primera pasada y su corrección (17 y 19);
4. el estilo y el ADR-010 (19 y 21);
5. el diseño de la lectura (17 al 21);
6. el diseño de la alerta (20 y 21);
7. las fallas y la infraestructura (21 y 22);
8. las cuentas (22);
9. lo que cambió después del jurado (4 al 7 de marzo), con el cierre del curso.

Se descartaron dos cortes posibles. Juntar los capítulos 3 y 4 metía ocho conceptos nuevos en siete minutos (característica, top 7, descarte, etiquetado, estilo, planilla, eventos y la crítica al ADR-010). Juntar el 6 y el 7 dejaba sin espacio el motor de reglas y la caché, que son la respuesta del equipo al requisito más difícil del pliego (sueño y vigilia). Team Topologies y el mapa de contextos quedan afuera: son del último día y no cambian ninguna decisión.

## Decisiones pedagógicas de todo el curso

- **El orden real, con fechas.** Cada capítulo dice cuándo pasó lo que cuenta. Dos veces el curso muestra que el relato prolijo del equipo no es el orden real: la plataforma de mensajería estaba en un dibujo del 17, antes de la planilla de estilos del 19 (cap. 5), y dieciséis ADRs se escribieron en una tarde, registrando decisiones de días antes (cap. 9). El tablero agrupado el 17 frente al documento del 19 al 21 quedó fuera del video por duración (HISTORIA, sección 3).
- **Los cambios de idea son contenido.** La primera lista de características (17-02) y su corrección (19-02), el registro de pacientes que sale y vuelve, «Monitor» que pasa a «Streamer», Kafka que pasa a «plataforma de mensajería».
- **Los huecos se enseñan, no se esconden.** La razón débil del ADR-010 (cap. 4), las fitness functions en papel (cap. 7), la alerta sin confirmación (cap. 6) y el presupuesto que suma capacidad como latencia (cap. 8). En cada caso se separa la decisión (que se sostiene) del argumento (que no).
- **Ningún número inventado.** Todos los números de la narración salen del pliego, de `Sizing.md`, de la planilla de estilos o del historial. Las cuentas propias del curso (19, 17 y 16 estrellas en el cap. 4) se hacen con las estrellas de la planilla del equipo, a la vista.
- **Contrapunto del podio, una sola vez** (cap. 4, escena `regla`): Mighty Orbots y Low Codes, para mostrar que la disponibilidad se podía traducir y que el estilo no separó al ganador.
- **Piénsalo tú** en los nueve capítulos, siempre después de dar la herramienta y antes de la respuesta del equipo, con pausa de 3 s.
- **Puentes** al comienzo de cada capítulo («¿Recuerdas…?») y siembras que se cosechan después: la lluvia y la gota (cap. 1 → 6 y 8), «historia revisada» en la papelera (cap. 2 → 5), la configurabilidad que vive en una sola pieza (cap. 3 → 6), la disponibilidad que no votó (cap. 3 → 4 → 7).
- **Términos definidos en su primer uso:** kata, pliego, arquitectura, tiempo de respuesta, on-premises, restricción, snapshot, flujo de datos (cap. 1); event storming, evento de dominio, ADR, base de series de tiempo, comando, contexto delimitado, política, componente (cap. 2); característica de arquitectura, rendimiento, disponibilidad, tolerancia a fallos, configurabilidad, evolvability, elasticidad, escalabilidad, downplayed (cap. 3); estilo, monolito, microservicios, orientado a eventos, space-based, planilla de estilos (cap. 4); C4, contenedor, websocket, plataforma de mensajería, tema, Kafka (cap. 5); motor de reglas, caché, caché distribuida, notificación push (cap. 6); fitness function, Kubernetes (cap. 7); latencia, presupuesto de latencia, throughput (cap. 8).
- **Fuentes en conflicto.** Cuando el repositorio se contradice, el curso sigue la fuente indicada en `HISTORIA.md`, sección 7. Los casos que tocan la narración: réplicas (se dice «duplicada», sin número), Kafka 4 o 5 ms (se usa la tabla, 5 ms), el ADR-005 (se sigue su decisión, «de apoyo», no su título), la caché (distribuida, como en ADR-019 y C3).
- **Idioma:** español neutro, tuteo, sin regionalismos ni rayas. Los términos que la industria dice en inglés quedan en inglés (event storming, bounded context, evolvability, throughput, fitness function, websocket). Los números en `text` llevan su `say` en letras; «ADR 010» se pronuncia «A-D-R cero diez», como en KatArch.
- **Notas visuales:** cada escena dice qué hay en pantalla y qué imagen original redibujar. Las imágenes viejas se sacan del historial con `git show <hash>:<ruta>` (ya extraídas en `scratchpad/bluz-img/`).

## Capítulos

| # | Título | Ideas esenciales | Anclas principales | Palabras | Duración estimada |
| - | - | - | - | - | - |
| 1 | El caso MonitorMe | (1) MonitorMe vigila ocho signos vitales con ritmos muy distintos y debe mostrarlos en la estación de enfermería en un segundo promedio. (2) Además de mostrar, analiza y avisa por dos caminos, y las reglas dependen de si el paciente duerme. (3) Restricciones de fondo: si falla un aparato el resto sigue; todo vive on-premises, una instalación por hospital, hasta 500 pacientes. (4) El primer gesto del equipo: resumir el pliego en cuatro flujos de datos. | `Business/Requirements.md` (pliego literal, `e23ff92`, 15-02); Tabla de requisitos funcionales del README (`2625f7c`, 16-02; `c17d791`, 17-02); README, sección «MonitorMe requirements»: tres flujos en `05adfda` (19-02), cuatro en `33e577e` (20-02) | 816 | 6:28 |
| 2 | Una tormenta de eventos | (1) Event storming: encontrar las piezas desde los hechos del negocio, no desde la tecnología. (2) La papelera también decide: lo que no es un hecho del negocio puede esconder una decisión técnica (base de series de tiempo y retención de 24 h). (3) Agrupar eventos da contextos delimitados; recortar el alcance y nombrar bien da las cuatro piezas. (4) Cada decisión se escribe en un ADR desde el primer día. | `EventStorming/EventStorming.md` y `EventStorming/images/1.png` a `7.1.png`, `components.png`; Fotos del 17-02 (`a55b212`, `f7acd36`): el tablero ya agrupado; ADR-001 y ADR-002 (`1fb91fe`, `8fd97d3`, 16-02); ADR-003 y ADR-004 (`ab63f2a`, `9b5af01`, 17-02) | 881 | 6:57 |
| 3 | Qué tiene que ser el sistema | (1) Una característica de arquitectura dice qué tan bien hace el sistema lo que hace; se eligen pocas porque cada una cuesta. (2) El equipo hizo dos pasadas: la del 17 (top 3 con confiabilidad) y la del 19, con otro vocabulario y descartes escritos. (3) Etiquetar cada pieza separa lo local de lo que define todo el sistema. (4) Cuatro candidatas para tres lugares: la disponibilidad queda afuera (el porqué, en el cap. 4). | `ArchitectureCharacteristics/Characteristics.md` y su historia (`7cfd748` 17-02, `11ae412` 19-02, `9808752` 20-02); Imágenes viejas: `7cfd748:resources/images/characteristics.png`, `top7_characteristics.png`, `top3_final.png`; Imágenes nuevas: `characteristics.png`, `components-sticky-cards.png`, `top3-characteristics.png`, `top3-final.png` | 678 | 5:23 |
| 4 | El estilo y la disponibilidad que no votó | (1) Un estilo de arquitectura es la forma general del sistema; en el estilo orientado a eventos, las piezas se avisan en lugar de llamarse. (2) La planilla de estilos suma estrellas en las filas del top 3: orientado a eventos gana con 14. (3) El argumento del ADR-010 es débil: la planilla no tiene la fila, pero sí una cercana (tolerancia a fallos), y con ella el ganador no cambia. (4) Regla: si lo crítico no entra en tu herramienta, tradúcelo; no lo dejes caer. Contrapunto del podio. | ADR-010 (`5c44f08`, 21-02) y la razón agregada a `Characteristics.md` (`d4dd3fe`, 22-02); ADR-011 y ADR-012 («14 stars»); Planilla de estilos: `05adfda:resources/images/chosen-architecture.png` (19-02 17:30, con fault-tolerance subrayada) y la final `ArchitectureCharacteristics/images/chosen-architecture.png` (`11ae412`) | 692 | 5:30 |
| 5 | El camino de una lectura | (1) El modelo C4 dibuja el sistema por niveles de zoom; el contexto deja afuera la app y la pantalla (no son del equipo). (2) Una lectura entra por Recorder, que guarda y publica a la vez; una plataforma de mensajería la reparte por temas; Streamer la empuja a la pantalla. (3) Por qué esa forma sirve al top 3 (rendimiento, elasticidad, evolvability). (4) Los datos personales viven en un solo lugar; la base de series de tiempo es anónima. | `7cfd748:resources/images/characteristics_vs_modules.png` (diagrama fechado 17-02 con Kafka); `C4/C1-context.md` y `c1.jpg`; ADR-013 (app), ADR-014 (estación, websocket); `C4/C2-containers.md` y `c2.jpg`; ADR-015 (Kafka); ADR-017 (datos centralizados) | 676 | 5:21 |
| 6 | La alerta | (1) El Analyzer, la pieza más crítica: suscriptor, normalizador, motor de reglas y publicador de alertas. (2) Un motor de reglas configurable resuelve la configurabilidad sin reprogramar. (3) Las reglas que combinan signos (sueño y presión) necesitan memoria: una caché distribuida que sobrevive a una caída. (4) La alerta sale por dos caminos (teléfono e internet, estación y red local); hueco: nadie confirma que la vio. | `C4/C3-components.md` y `c3-analyzer.jpg` (`dc59d65`, 20-02); `C4/C2-containers.md` (Analyzer, «PROTECT HUMANS LIFE»); el «ADR-###» de `13e61cd`; ADR-019 (caché distribuida), ADR-016 (dos canales) | 694 | 5:29 |
| 7 | Cuando algo falla | (1) Una fitness function es una prueba objetiva de una característica de arquitectura; dos de las tres del equipo prueban la disponibilidad que no votó. (2) Tres fallas recorridas pieza por pieza: un sensor, una pieza de software, internet. (3) La disponibilidad llega por la infraestructura: Kubernetes on-premises, servidores separados, todo duplicado. (4) Probado en papel, no medido; y falta el recorrido de la falla de la plataforma de mensajería. | README, tabla «Fitness functions» (`50d5558`, `d151a59`, 22-02); `FitnessFunctions/Failover.md`, `FitnessFunctions/Alerts.md`; `Deployment/Deployment.md`, `kubernetes.jpg` (`1b5b53c`, `d258ebb`, 21-02) | 658 | 5:15 |
| 8 | Las cuentas | (1) Cuántas lecturas: 4,2 por segundo por paciente, unas 2100 por hospital, 4000 en el pico supuesto. (2) Un presupuesto de latencia reparte el segundo entre los pasos del camino; el del equipo da 693 ms. (3) Capacidad (throughput) y latencia son medidas distintas; la tabla sumó capacidad como latencia y un paso que no está en el camino. (4) La tabla exagera hacia el lado seguro; después del jurado la explicaron mejor, sin cambiar los números. | `FitnessFunctions/Sizing.md`: primera versión con «TODO» (`0030ea8`, 22-02 09:06), completa (`50d5558`, 10:15), reescrita (`b4395e4`, 04-03); `UseCases/US1-monitor.md` y `alerting_sequence.jpg` (Recorder guarda y publica en paralelo); `FitnessFunctions/images/kafka-benchmark.png` | 669 | 5:33 |
| 9 | Después del jurado | (1) Nombrar la capacidad, no el producto: Kafka pasa a ser «plataforma de mensajería» por el feedback del jurado. (2) Trazabilidad: cada ADR enlazado al documento donde nació; los ADRs pueden escribirse después, si llevan a su porqué. (3) Después del jurado no cambió ninguna decisión; lo pendiente quedó escrito. (4) El método completo, en el orden real, y tres huecos que enseñan. | `b4395e4` (04-03, «based on jury feedback»); PR `#2` `kafka_agnostic_language` (`e742cc7`, `e573548`, 05-03); Enlaces «context link out» en los ADR (`ca62e6e` … `ad5ad44`, 05-03; `462e53a` … `0b65dc9`, 07-03); Horas de creación de ADR-005 a ADR-020 (21-02, 16:07 a 18:57) | 658 | 5:14 |

## Pendientes para la etapa de composición

- Ningún capítulo tiene voz generada. Las duraciones son estimaciones a 2,2 palabras por segundo; con la voz real de KatArch (unas 2,7 palabras por segundo), cada capítulo quedaría alrededor de un 15 % más corto.
- Los diagramas originales (C1, C2, C3, Kubernetes) son de alta resolución y tienen mucho texto chico: conviene redibujarlos por partes, como indican las notas, en lugar de mostrarlos enteros.
- Los capítulos 4 y 8 tienen tablas con números; las notas piden que queden en pantalla toda la escena para que se puedan leer.


---

## Capítulo 1 · El caso MonitorMe

`video/ch1/narration.json` · 10 escenas, 55 líneas, 816 palabras de subtítulo (819 habladas). A 2,2 palabras por segundo: 6:12 de voz más 16,0 s de pausas escritas = **6:28**.

### Plan

**Ideas esenciales**

1. MonitorMe vigila ocho signos vitales con ritmos muy distintos y debe mostrarlos en la estación de enfermería en un segundo promedio.
2. Además de mostrar, analiza y avisa por dos caminos, y las reglas dependen de si el paciente duerme.
3. Restricciones de fondo: si falla un aparato el resto sigue; todo vive on-premises, una instalación por hospital, hasta 500 pacientes.
4. El primer gesto del equipo: resumir el pliego en cuatro flujos de datos.

**Anclas en el repositorio**

- `Business/Requirements.md` (pliego literal, `e23ff92`, 15-02)
- Tabla de requisitos funcionales del README (`2625f7c`, 16-02; `c17d791`, 17-02)
- README, sección «MonitorMe requirements»: tres flujos en `05adfda` (19-02), cuatro en `33e577e` (20-02)
- `Business/images/monitorMe.png` (banner)

**Al terminar, el espectador puede**

- Describir qué pide el pliego de MonitorMe sin mirar notas: signos, ritmos, pantalla, alertas, fallas, on-premises.
- Distinguir una restricción (on-premises, hardware de StayHealthy) de una función.
- Resumir un pliego en flujos de datos.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- MonitorThem en detalle (el pliego no pide integrarlo; el equipo lo deja pendiente).
- `Overview.md` y `Actors.md`: agregan cosas que el pliego no dice (HISTORIA, inconsistencia 21).
- La tabla FR1 a FR10: se reemplaza por los cuatro flujos, que son la síntesis del propio equipo.

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (78 palabras, ~37 s) | Kata y pliego; Arquitectura; El enfoque del curso (día por día) | Kata y pliego ~11 s; Arquitectura ~7 s; El enfoque del curso (día por día) ~11 s | No aplica: es el marco | Sí: kata, pliego y arquitectura en una línea cada uno | Sí: por qué seguir a un equipo | Sí: una tarjeta por término | Bien (andamiaje) |
| `empresa` (62 palabras, ~29 s) | StayHealthy y sus dos productos; MonitorMe como lo que se diseña | StayHealthy y sus dos productos ~13 s; MonitorMe como lo que se diseña ~16 s | Sí | Sí | Sí: el mercado nuevo | Sí: cuatro tarjetas, una por línea | Bien |
| `signos` (78 palabras, ~37 s) | Ocho signos y sensores; Ritmos distintos (lluvia y gota) | Ocho signos y sensores ~13 s; Ritmos distintos (lluvia y gota) ~25 s | Sí: se ven los sensores antes de hablar de ritmo | Sí: «sensor» = aparato | Se siembra para los capítulos 6 y 8 | Sí: los puntos animados quedan toda la escena | Bien |
| `pantalla` (83 palabras, ~39 s) | Estación de enfermería y pantalla consolidada; Tiempo de respuesta de 1 s | Estación de enfermería y pantalla consolidada ~15 s; Tiempo de respuesta de 1 s ~23 s | Sí: la pantalla antes de la vara | Sí | Sí: el oxígeno que cae | Sí | Bien |
| `alertas` (102 palabras, ~47 s) | Umbral y tendencia; Reglas que dependen del sueño; Dos destinos del aviso | Umbral y tendencia ~20 s; Reglas que dependen del sueño ~17 s; Dos destinos del aviso ~10 s | Sí: la fiebre y el oxígeno antes de la regla | Sí: umbral y tendencia con ejemplo | Sí: nadie mira veinte pacientes | Sí | Bien |
| `resto` (65 palabras, ~31 s) | Historia de 24 h; Snapshot; Si falla un sensor, el resto sigue | Historia de 24 h ~10 s; Snapshot ~8 s; Si falla un sensor, el resto sigue ~13 s | Sí: el sensor se apaga en pantalla | Sí: snapshot definido | Se desarrolla en el cap. 7 | Sí | Bien |
| `onprem` (91 palabras, ~43 s) | On-premises; Límite de 500 por instalación; Restricción vs libertad tecnológica | On-premises ~18 s; Límite de 500 por instalación ~4 s; Restricción vs libertad tecnológica ~22 s | Sí: el contraste con la nube antes del nombre | Sí: on-premises y restricción | Sí | Sí | Bien |
| `consideraciones` (72 palabras, ~34 s) | Las cuatro consideraciones; Puente al cap. 3 | Las cuatro consideraciones ~27 s; Puente al cap. 3 ~7 s | Sí | Sí | Se usa en el cap. 3 | Sí: tarjetas de 5 a 10 palabras con 4 a 5 s cada una | Bien |
| `piensalo` (107 palabras, ~53 s) | Flujo de datos; Piénsalo (con pausa); Los cuatro flujos del equipo | Flujo de datos ~16 s; Piénsalo (con pausa) ~10 s; Los cuatro flujos del equipo ~27 s | Sí | Sí | Sí: es la síntesis del equipo | Sí: cada flujo queda dibujado | Bien |
| `outro` (81 palabras, ~38 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~25 s | — | — | — | Sí: tarjetas juntas ~6 s | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Qué es una kata y qué es «arquitectura»? → intro, definidas en dos líneas.
- ¿Qué es una estación de enfermería? → pantalla, línea 1.
- ¿Tiempo de respuesta medido desde dónde? → pantalla, línea 4 (del aparato a la pantalla).
- 104 grados, ¿Fahrenheit? → alertas, línea 2 (se da el equivalente en Celsius).
- ¿Qué es on-premises y por qué importa si StayHealthy vende en la nube? → onprem, líneas 1 y 2.
- ¿Qué es un snapshot? → resto, línea 2.
- ¿Para qué sirve contar flujos? → piensalo, línea 2 y la cita del README.

### Guion

#### `intro` · Capítulo 1 (~37 s)

> **Visual:** Portada del curso. Banner `Business/images/monitorMe.png` y el logo del kata (`ArchitectureCharacteristics/images/Kata.png`). Al decir «kata», una tarjeta con su definición; al decir «arquitectura», un esquema mínimo de cajas y flechas. Cierra con el título del capítulo.

1. En el invierno de 2024, O'Reilly organizó una nueva Architecture Kata. · *say:* «En el invierno de dos mil veinticuatro, O'Reilly organizó una nueva Architecture Kata.»
2. Una kata es un ejercicio de práctica: una empresa entrega un pliego, el documento con lo que necesita, y cada equipo diseña la arquitectura.
3. La arquitectura es la forma del sistema: qué piezas tiene y cómo se hablan. · *pausa 0,8 s*
4. Ganó un equipo de cuatro personas: BluzBrothers. Este curso reconstruye cómo razonaron, día por día, con los commits de su propio repositorio. · *pausa 0,8 s*
5. Capítulo 1: el caso MonitorMe. · *say:* «Capítulo uno: el caso MonitorMe.»

#### `empresa` · La empresa (~29 s)

> **Visual:** Tres tarjetas: StayHealthy (software médico), MonitorThem y MyMedicalData con un ícono de nube cada una. Después aparece una cuarta tarjeta, vacía y resaltada: MonitorMe. Fuente: primeros párrafos de `Business/Requirements.md`.

1. La empresa se llama StayHealthy. Hace software médico, y ya tiene dos productos en la nube.
2. MonitorThem analiza datos de hospitales. MyMedicalData guarda la historia clínica de cada paciente.
3. Ahora quiere entrar a un mercado nuevo: vigilar a pacientes internados, con aparatos médicos que fabrica ella misma.
4. El sistema nuevo se llama MonitorMe. Es lo único que el equipo tiene que diseñar. · *pausa 1 s*

#### `signos` · Los signos vitales (~37 s)

> **Visual:** Un paciente en una cama, con ocho íconos de sensores que se encienden uno por uno (pulso, presión, oxígeno, azúcar, respiración, ECG, temperatura, sueño). Después, cada ícono emite puntos a su ritmo real: el pulso como lluvia (cada 0,5 s), la presión como una gota por hora. Fuente: lista de ritmos del pliego.

1. MonitorMe lee ocho signos vitales de cada paciente, con ocho aparatos, o sensores: del pulso y la presión a la temperatura, y hasta si está dormido o despierto.
2. Y cada sensor tiene su propio ritmo.
3. El pulso manda una lectura cada medio segundo. La respiración y el electrocardiograma, una por segundo.
4. La presión, en cambio, una sola vez por hora. · *pausa 1 s*
5. Guarda esta imagen: unos signos llegan como una lluvia, y otros como una gota de vez en cuando. · *pausa 0,8 s*

#### `pantalla` · La pantalla (~39 s)

> **Visual:** Una estación de enfermería: una pantalla con 20 mini-fichas de pacientes que rota cada 5 s (contador visible). Una flecha del sensor a la pantalla con un cronómetro «≤ 1 s promedio». En la última línea, la curva de oxígeno de una ficha cae.

1. Esas lecturas van a una pantalla en la estación de enfermería, el puesto del piso donde trabajan las enfermeras.
2. Cada pantalla muestra hasta veinte pacientes, y pasa de uno a otro cada cinco segundos.
3. El pliego pone una vara: un tiempo de respuesta promedio de un segundo o menos.
4. El tiempo de respuesta es lo que tarda una lectura en llegar del sensor a la pantalla.
5. Si el oxígeno de un paciente cae, la enfermera lo tiene que ver casi en el momento. · *pausa 1 s*

#### `alertas` · Vigilar y avisar (~47 s)

> **Visual:** Un termómetro que sube hasta 104 °F (40 °C) y dispara una campana. Una curva de oxígeno en bajada (tendencia). Luego una luna y un sol sobre la misma curva de presión: con la luna la baja queda verde, con el sol roja. Al final, la alerta viaja a dos destinos: un teléfono y la pantalla de la estación.

1. Pero nadie mira veinte pacientes sin parpadear. Por eso MonitorMe también tiene que analizar.
2. Si un signo cruza un umbral, por ejemplo una fiebre de 104 grados Fahrenheit, unos 40 Celsius, avisa. · *say:* «Si un signo cruza un umbral, por ejemplo una fiebre de ciento cuatro grados Fahrenheit, unos cuarenta Celsius, avisa.»
3. Y si detecta una tendencia, como un oxígeno que baja, también.
4. Hay un matiz: cuando el paciente duerme, la presión, el pulso y la respiración bajan, y es normal.
5. Despierto, esa misma baja puede ser un problema. Las alertas tienen que saber si el paciente duerme. · *pausa 1 s*
6. El aviso llega a dos lugares: al teléfono del personal médico, en una app de StayHealthy, y a la pantalla de la estación.

#### `resto` · Más exigencias (~31 s)

> **Visual:** Una línea de tiempo de 24 h con un filtro (rango de horas, signo). Un botón «snapshot» que genera una ficha y la sube a una nube con el nombre MyMedicalData. Al final, uno de los ocho sensores se apaga (gris) y los otros siete siguen latiendo, con cuatro verbos: mide, guarda, analiza, avisa.

1. El sistema guarda las últimas 24 horas de cada signo, y el personal las puede revisar filtrando por hora y por signo. · *say:* «El sistema guarda las últimas veinticuatro horas de cada signo, y el personal las puede revisar filtrando por hora y por signo.»
2. También puede armar un snapshot, una foto completa del paciente en ese momento, y subirlo a MyMedicalData.
3. Y una exigencia que va a pesar mucho: si un sensor falla, el resto sigue funcionando. · *pausa 0,6 s*
4. Sigue midiendo, guardando, analizando y avisando con los demás signos. · *pausa 1 s*

#### `onprem` · En el hospital (~43 s)

> **Visual:** Contraste: a la izquierda, los dos productos de StayHealthy en una nube; a la derecha, un edificio de hospital con un rack de servidores adentro. Se multiplican tres hospitales, cada uno con su copia completa. Un medidor «máx. 500 pacientes». Al decir «restricción», el borde del hospital se marca como límite.

1. Ahora, dónde vive el sistema. Los dos productos de StayHealthy viven en la nube, pero MonitorMe no va a estar ahí.
2. Va on-premises: instalado en los servidores del propio hospital. Cada hospital tiene su copia completa, con sus propios datos.
3. Una instalación atiende como máximo a 500 pacientes. · *say:* «Una instalación atiende como máximo a quinientos pacientes.»
4. StayHealthy pone el hardware. Qué bases de datos o qué herramientas usar, el pliego no lo dice: lo decide el arquitecto. · *pausa 1 s*
5. Eso es una restricción: algo que viene dado, y alrededor de lo cual diseñas. Aquí, las paredes del hospital son el límite. · *pausa 1 s*

#### `consideraciones` · Lo que no es un número (~34 s)

> **Visual:** Cuatro tarjetas que aparecen una por línea, con la frase original del pliego en chico debajo de la traducción: «more vital sign monitoring devices», «human lives are at stake», «a lot of change», «patient confidentiality… does not have to meet… HIPAA». Quedan las cuatro juntas al final.

1. El pliego cierra con cuatro consideraciones. No traen números, pero pesan.
2. Vendrán más aparatos en el futuro.
3. Los datos tienen que ser lo más exactos posible: hay vidas en juego.
4. Como es un negocio nuevo, StayHealthy espera muchos cambios mientras aprende.
5. Y la confidencialidad del paciente importa, aunque MonitorMe no tenga que cumplir ninguna regulación del gobierno. · *pausa 1 s*
6. Recuerda estas cuatro frases. El equipo las va a usar para decidir qué importa más.

#### `piensalo` · Piénsalo tú (~53 s)

> **Visual:** Primero, la definición de flujo de datos como una línea que une origen, paso y destino. Durante la pausa, el pliego entero en miniatura con anillo de cuenta regresiva de 3 s. Luego los cuatro flujos se dibujan uno por línea sobre un esquema simple (sensor → pantalla; análisis → teléfono y pantalla; consulta de 24 h; snapshot → MyMedicalData). Al final, la cita del README en inglés: «all these requirements can be covered by the four main data flows».

1. Antes de diseñar, el equipo hizo algo simple: seguir el recorrido de los datos.
2. Un flujo de datos es un camino completo: de dónde sale un dato, por dónde pasa y a quién le llega.
3. Ahora tú. Con todo lo que pide el pliego, ¿cuántos caminos distintos recorren los datos? · *pausa 3 s*
4. El equipo contó cuatro.
5. Uno: del sensor a la pantalla de la estación.
6. Dos: del análisis a la alerta, en el teléfono y en la pantalla.
7. Tres: la consulta de las últimas 24 horas. · *say:* «Tres: la consulta de las últimas veinticuatro horas.»
8. Y cuatro: el snapshot que viaja a MyMedicalData. · *pausa 1 s*
9. En su relato lo escribieron así: todos estos requisitos caben en cuatro flujos de datos.

#### `outro` · Para llevarte (~38 s)

> **Visual:** Cuatro tarjetas de repaso que se apilan, una por línea. Avance: un tablero lleno de papelitos naranjas.

1. Repasemos. MonitorMe vigila ocho signos vitales, cada uno con su ritmo, y los muestra en un segundo o menos, en promedio.
2. Analiza y avisa por dos caminos, sabiendo si el paciente duerme.
3. Si un sensor falla, el resto sigue. Y todo vive dentro de cada hospital.
4. Cuatro flujos de datos resumen el pliego. · *pausa 1 s*
5. Lo que sigue: cómo pasó el equipo de este pliego a las piezas del sistema, con una pared llena de papelitos de colores.
6. Eso, en el capítulo 2. · *say:* «Eso, en el capítulo dos.»


---

## Capítulo 2 · Una tormenta de eventos

`video/ch2/narration.json` · 10 escenas, 57 líneas, 881 palabras de subtítulo (881 habladas). A 2,2 palabras por segundo: 6:40 de voz más 16,8 s de pausas escritas = **6:57**.

> Es el capítulo más largo, porque carga cuatro ideas con un término nuevo cada una. Llegó a 7:27 y se recortó a 6:57 en la etapa de composición: salió la escena `historial` (~25 s; su idea, que el relato prolijo no es el orden real, reaparece en el cap. 5, `intro`, y en el cap. 9, `rastro`) y se acortaron tres líneas (`piensalo` 1, `alcance` 3 y `outro` 5) sin cambiar lo que dicen.

### Plan

**Ideas esenciales**

1. Event storming: encontrar las piezas desde los hechos del negocio, no desde la tecnología.
2. La papelera también decide: lo que no es un hecho del negocio puede esconder una decisión técnica (base de series de tiempo y retención de 24 h).
3. Agrupar eventos da contextos delimitados; recortar el alcance y nombrar bien da las cuatro piezas.
4. Cada decisión se escribe en un ADR desde el primer día.

**Anclas en el repositorio**

- `EventStorming/EventStorming.md` y `EventStorming/images/1.png` a `7.1.png`, `components.png`
- Fotos del 17-02 (`a55b212`, `f7acd36`): el tablero ya agrupado
- ADR-001 y ADR-002 (`1fb91fe`, `8fd97d3`, 16-02); ADR-003 y ADR-004 (`ab63f2a`, `9b5af01`, 17-02)
- ADR-005 (cambio de «fuera» a «soporte»: `2a9d9c2` el 21, `b1fa86b` el 22), ADR-006, ADR-007

**Al terminar, el espectador puede**

- Explicar qué es un evento de dominio y para qué sirve una tormenta de eventos.
- Separar un hecho del negocio de una propiedad técnica (la papelera).
- Definir contexto delimitado y explicar cómo se pasa de contextos a componentes.
- Explicar qué es un ADR y por qué conviene escribirlos.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- Los comandos en detalle («time interval», «transfer data»): solo una línea.
- Los renombres internos del tablero (Gateway → Sensors, Notification → Alert).
- El mapa de contextos y Team Topologies del 22-02 (pulido del último día).
- El tablero agrupado el 17-02 frente al documento de seis etapas del 19 al 21 (escena `historial`, recortada por duración; queda en HISTORIA.md, sección 3).

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (68 palabras, ~32 s) | Por qué importa cortar bien; Empezar por el negocio | Por qué importa cortar bien ~9 s; Empezar por el negocio ~13 s | Sí: el problema de cortar antes del método | — | Sí: si cortas mal, cada cambio toca todo | Sí | Bien |
| `que` (71 palabras, ~34 s) | Event storming; Evento de dominio (en pasado) | Event storming ~14 s; Evento de dominio (en pasado) ~20 s | Sí: viene del problema de la intro | Sí | Sí: hechos, no tecnología | Sí | Bien |
| `juntar` (65 palabras, ~31 s) | Etapa 1: juntar sin filtrar; Etapa 2: ordenar en el tiempo | Etapa 1: juntar sin filtrar ~12 s; Etapa 2: ordenar en el tiempo ~19 s | Sí | Sí | Sí: aparece el recorrido | Sí: los papelitos quedan; la fila se resalta ~10 s | Bien |
| `piensalo` (114 palabras, ~56 s) | Aplicar la definición de evento (piénsalo); La papelera y sus razones; Un descarte discutible (historia revisada) | Aplicar la definición de evento (piénsalo) ~23 s; La papelera y sus razones ~23 s; Un descarte discutible (historia revisada) ~10 s | Sí: el caso es la pregunta | Usa la definición de la escena anterior | Sí | Sí: los papelitos están en pantalla durante la pausa | Bien |
| `adr` (73 palabras, ~35 s) | ADR; La regla de trabajo del equipo (ADR-001) | ADR ~28 s; La regla de trabajo del equipo (ADR-001) ~7 s | Sí: la nota pegada en el tablero antes del nombre | Sí | Sí: sin depender de la memoria | Sí: la ficha queda ~15 s | Bien |
| `tsdb` (94 palabras, ~44 s) | Base de series de tiempo; Por qué encaja con el pliego; ADR-003 y 004 | Base de series de tiempo ~31 s; Por qué encaja con el pliego ~9 s; ADR-003 y 004 ~4 s | Sí: el borrado sin dueño antes del nombre | Sí | Sí, con el requisito de 24 h | Sí | Bien |
| `agrupar` (113 palabras, ~53 s) | Actores y comandos (menor); Contexto delimitado; Los seis contextos; Políticas (menor) | Actores y comandos (menor) ~7 s; Contexto delimitado ~21 s; Los seis contextos ~17 s; Políticas (menor) ~8 s | Sí: el agrupamiento se ve antes del nombre | Sí | Sí: una sola responsabilidad y vocabulario | Sí: el tablero agrupado queda ~25 s | Bien |
| `alcance` (116 palabras, ~55 s) | Recortar el alcance (sensores afuera); El cambio de idea sobre el registro; Los cuatro del centro | Recortar el alcance (sensores afuera) ~24 s; El cambio de idea sobre el registro ~23 s; Los cuatro del centro ~8 s | Sí | Sí: «de apoyo» explicado | Sí: el costo del ADR y por qué existe el registro | Sí | Bien |
| `nombres` (89 palabras, ~42 s) | Contexto → componente; Nombrar por la responsabilidad (Monitor → Streamer); Las cuatro piezas | Contexto → componente ~15 s; Nombrar por la responsabilidad (Monitor → Streamer) ~23 s; Las cuatro piezas ~5 s | Sí: el nombre engañoso antes de la regla | Sí: componente | Sí | Sí: las cuatro piezas quedan ~10 s | Bien |
| `outro` (88 palabras, ~41 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~29 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Por qué empezar por eventos y no por la base de datos? → intro, líneas 2 a 4.
- ¿Qué es exactamente un evento de dominio? → que, línea 3.
- ¿Qué es un ADR? → adr, línea 2.
- ¿Qué es una base de series de tiempo y por qué esa? → tsdb, líneas 3 a 5.
- ¿Qué es un contexto delimitado? → agrupar, línea 4.
- ¿Por qué el registro de pacientes queda de apoyo? → alcance, líneas 4 a 6.
- ¿Por qué Streamer y no Monitor? → nombres, líneas 3 y 4.

### Guion

#### `intro` · Capítulo 2 (~32 s)

> **Visual:** Los cuatro flujos del capítulo 1 como cuatro líneas. Sobre ellas, un signo de pregunta: ¿qué cajas? Aparecen cajas genéricas de tecnología («base de datos», «servidor») y se tachan. Título.

1. ¿Recuerdas los cuatro flujos? Dicen qué tiene que pasar, pero no qué piezas tiene el sistema.
2. Cortar un sistema en piezas es de las decisiones más difíciles de deshacer. Si cortas mal, cada cambio toca todo.
3. Muchos equipos empiezan por la tecnología: una base de datos aquí, un servidor allá.
4. BluzBrothers empezó por otro lado: por lo que pasa en el hospital. · *pausa 1 s*
5. Capítulo 2: una tormenta de eventos. · *say:* «Capítulo dos: una tormenta de eventos.»

#### `que` · Event storming (~34 s)

> **Visual:** Un tablero vacío con la leyenda del equipo (`EventStorming/images/1.png`, recuadro «legend»: naranja = evento, amarillo = actor, celeste = comando, rosa = política). Aparecen tres papelitos naranjas con los ejemplos de la voz. Debajo, en chico: «tablero digital, 6 etapas».

1. La técnica se llama event storming, tormenta de eventos.
2. Es un taller: el equipo llena un tablero con papelitos, y en cada uno escribe algo que pasa en el negocio.
3. Cada papelito es un evento de dominio: un hecho que ya ocurrió y que le importa al negocio. Por eso se escribe en pasado.
4. «Alerta enviada». «Paciente registrado». «Lectura recibida». · *pausa 0,6 s*
5. No se habla de tablas ni de servidores. Solo de hechos. · *pausa 1 s*

#### `juntar` · Juntar y ordenar (~31 s)

> **Visual:** Redibujar `EventStorming/images/1.png`: 27 papelitos naranjas aparecen desordenados (se puede ir contando). Transición a `2.png`: se acomodan de izquierda a derecha. Se ilumina la fila de la lectura: sensor data read → sent → received → saved → vital signs analyzed → issue detected → alert sent.

1. Primero, juntar. Sin ordenar ni discutir: cada uno escribe todo lo que pasa.
2. Salieron veintisiete papelitos. Del paciente registrado a la enfermera que vio la alerta.
3. Después, ordenarlos en el tiempo, de izquierda a derecha.
4. Y aparece el recorrido de una lectura: el sensor la lee y la envía, el sistema la recibe y la guarda.
5. La analiza, detecta un problema y envía la alerta. · *pausa 1 s*

#### `piensalo` · Piénsalo tú (~56 s)

> **Visual:** Zoom a cuatro papelitos de `2.png`: «history data archived after 24h», «history data deleted after 24h», «software updated» y, aparte, «history data reviewed». Anillo de 3 s. Al responder, los papelitos vuelan a la «trash» del tablero (`3.png`), con las notas ADR-004 y ADR-002 pegadas como en el original.

1. Una prueba. Recuerda: un evento de dominio es algo que le importa al negocio.
2. En el tablero había tres papelitos así: «historia archivada a las 24 horas», «historia borrada a las 24 horas» y «software actualizado». · *say:* «En el tablero había tres papelitos así: «historia archivada a las veinticuatro horas», «historia borrada a las veinticuatro horas» y «software actualizado».»
3. ¿Pertenecen a esta tormenta? · *pausa 3 s*
4. El equipo los mandó a la papelera.
5. Archivar y borrar a las 24 horas no es algo que haga una enfermera. Es algo que el almacenamiento puede hacer solo. · *say:* «Archivar y borrar a las veinticuatro horas no es algo que haga una enfermera. Es algo que el almacenamiento puede hacer solo.»
6. Y actualizar el software es real, pero no es parte de la primera versión. Lo dejaron para una fase posterior. · *pausa 1 s*
7. Con ellos se fue un cuarto papelito, «historia revisada», aunque revisar la historia sí es un requisito. Va a volver, más adelante.

#### `adr` · Decisiones por escrito (~35 s)

> **Visual:** Las notas blancas «ADR-002» y «ADR-004» del tablero se agrandan y se abren como una ficha con tres secciones: contexto, decisión, consecuencias (formato real de `ADR/ADR-000-template.md`). Una fecha «16 feb» sobre el ADR-001.

1. Junto a la papelera, el equipo pegó unas notas con un código: ADR.
2. Un ADR es un registro de decisión de arquitectura: un documento corto con el contexto, la decisión, y lo que se gana y lo que se pierde.
3. Sirve para que, meses después, alguien sepa por qué se hizo así, sin depender de la memoria de nadie. · *pausa 0,8 s*
4. La primera decisión del equipo, el 16 de febrero, fue justamente esa: escribir ADRs. · *say:* «La primera decisión del equipo, el dieciséis de febrero, fue justamente esa: escribir ADRs.» · *pausa 1 s*

#### `tsdb` · Una base para el tiempo (~44 s)

> **Visual:** Una tabla de lecturas que crece: columnas «hora», «sensor», «valor». Una línea de tiempo con una ventana de 24 h que se desplaza y borra lo que queda atrás. Un filtro por rango de horas. Al final, dos fichas: ADR-003 y ADR-004, «17 feb».

1. La papelera escondía otra decisión. Si borrar a las 24 horas no es un evento, algo tiene que hacerlo. El equipo eligió una base de datos que lo hace sola. · *say:* «La papelera escondía otra decisión. Si borrar a las veinticuatro horas no es un evento, algo tiene que hacerlo. El equipo eligió una base de datos que lo hace sola.»
2. Una base de series de tiempo: está hecha para datos que llegan como una sucesión de mediciones, cada una con su hora.
3. Escribe muy rápido, busca por rangos de tiempo, y puede borrar lo viejo con una regla.
4. Es justo lo que pide el pliego: guardar 24 horas, y revisarlas filtrando por hora y por signo. · *say:* «Es justo lo que pide el pliego: guardar veinticuatro horas, y revisarlas filtrando por hora y por signo.» · *pausa 1 s*
5. Quedó en dos ADRs, el 17 de febrero. · *say:* «Quedó en dos ADRs, el diecisiete de febrero.»

#### `agrupar` · Contextos delimitados (~53 s)

> **Visual:** Redibujar `4.png` (actores amarillos «nurse», «medical professional»; comandos celestes «transfer data», «time interval») y luego `5.png`: seis recuadros grises con título amarillo. Los seis nombres aparecen en dos grupos de tres, como dice la voz. En la última línea, los papelitos rosas de `6.png` (políticas).

1. Después sumaron quién actúa, como la enfermera, y los comandos: las órdenes que disparan un evento.
2. Con todo en el tablero, agruparon los eventos que van juntos.
3. Cada grupo es un contexto delimitado, en inglés bounded context.
4. Un contexto delimitado es una parte del sistema con una responsabilidad clara y su propio vocabulario. Adentro, cada palabra significa una sola cosa. · *pausa 1 s*
5. Salieron seis. Tres siguen a la lectura: los sensores que miden, el que graba y el que analiza.
6. Y tres miran a las personas: el registro de pacientes, el monitoreo en pantalla y las alertas. · *pausa 0,8 s*
7. Por último pegaron las políticas: reglas fijas que reaccionan a los eventos, como borrar a las 24 horas. · *say:* «Por último pegaron las políticas: reglas fijas que reaccionan a los eventos, como borrar a las veinticuatro horas.»

#### `alcance` · El alcance (~55 s)

> **Visual:** Los seis recuadros de `7.png` con las notas ADR-005 y ADR-006 pegadas. Un sobre (el correo al cliente). «Sensors» se atenúa y sale del borde del sistema. «Patient registration» primero sale (tachado «fuera», 21 feb) y vuelve a entrar en gris claro con la etiqueta «apoyo» (22 feb). Quedan cuatro recuadros iluminados.

1. Antes de diseñar seis contextos, el equipo le hizo preguntas al cliente por correo.
2. Los sensores son aparatos de StayHealthy. MonitorMe no los diseña: solo recibe sus datos.
3. El ADR admite el costo: sin un protocolo conocido, asumen que los datos llegan como un flujo continuo. · *pausa 0,8 s*
4. Con el registro de pacientes, en cambio, cambiaron de idea.
5. El 21 de febrero lo dejaron afuera. Al día siguiente lo corrigieron: es parte del sistema, pero de apoyo. · *say:* «El veintiuno de febrero lo dejaron afuera. Al día siguiente lo corrigieron: es parte del sistema, pero de apoyo.»
6. Existe, porque alguien tiene que saber qué sensor es de qué paciente. Pero no es donde ponen el esfuerzo. · *pausa 1 s*
7. Quedan cuatro contextos en el centro: el que graba, el que analiza, el monitoreo y las alertas.

#### `nombres` · Del tablero a las piezas (~42 s)

> **Visual:** Redibujar `EventStorming/images/7.1.png`: fila «Bounded context» (Recorder, Analyzer, Monitor, Alert) con flechas hacia la fila «Components». «Monitor» se tacha y aparece «Vital Sign Streamer», con la nota ADR-007. Termina en `components.png`: las cuatro piezas violetas, que van a acompañar el resto del curso.

1. Último paso: convertir cada contexto en un componente, una pieza de software con nombre propio.
2. Les pusieron un prefijo, Vital Sign, signo vital, para que cada nombre diga de qué se ocupa.
3. Y uno cambió de nombre. «Monitor» no describía bien su trabajo: esa pieza no muestra nada, transmite datos sin parar hacia la pantalla.
4. Pasó a llamarse Streamer, el que transmite. · *pausa 1 s*
5. Recorder, Analyzer, Streamer y Alert: las cuatro piezas de MonitorMe.
6. Un nombre que miente sobre lo que hace una pieza confunde a cada persona que la toca. · *pausa 0,8 s*

#### `outro` · Para llevarte (~41 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: las cuatro piezas violetas con signos de pregunta encima («¿rápida?», «¿segura?», «¿flexible?»).

1. Repasemos. Event storming parte de los hechos del negocio, escritos en pasado, no de la tecnología.
2. Lo que no es un hecho del negocio va a la papelera, y a veces esconde una decisión técnica, como la base de series de tiempo.
3. Los eventos agrupados forman contextos delimitados, y de ellos salen las piezas.
4. Y cada decisión queda escrita en un ADR. · *pausa 1 s*
5. Lo que sigue: ya hay piezas. Falta decidir cómo se comportan, y no se puede todo a la vez.
6. Eso, en el capítulo 3. · *say:* «Eso, en el capítulo tres.»


---

## Capítulo 3 · Qué tiene que ser el sistema

`video/ch3/narration.json` · 8 escenas, 47 líneas, 678 palabras de subtítulo (678 habladas). A 2,2 palabras por segundo: 5:08 de voz más 14,8 s de pausas escritas = **5:23**.

> La línea 2 de `segunda` es una inferencia (HISTORIA, sección 4.1) y se dice como tal: «una pista». En `segunda`, cada una de las siete características recibe solo 5 a 10 s de definición; está bien porque cada una se trabaja después con su caso: disponibilidad y tolerancia a fallos en el cap. 4 (`prueba`, `piensalo`) y el cap. 7; rendimiento, elasticidad y evolvability en el cap. 4 (`planilla`) y el cap. 5 (`pantalla`); configurabilidad en el cap. 6 (`reglas`); seguridad en el cap. 5 (`piensalo`).

### Plan

**Ideas esenciales**

1. Una característica de arquitectura dice qué tan bien hace el sistema lo que hace; se eligen pocas porque cada una cuesta.
2. El equipo hizo dos pasadas: la del 17 (top 3 con confiabilidad) y la del 19, con otro vocabulario y descartes escritos.
3. Etiquetar cada pieza separa lo local de lo que define todo el sistema.
4. Cuatro candidatas para tres lugares: la disponibilidad queda afuera (el porqué, en el cap. 4).

**Anclas en el repositorio**

- `ArchitectureCharacteristics/Characteristics.md` y su historia (`7cfd748` 17-02, `11ae412` 19-02, `9808752` 20-02)
- Imágenes viejas: `7cfd748:resources/images/characteristics.png`, `top7_characteristics.png`, `top3_final.png`
- Imágenes nuevas: `characteristics.png`, `components-sticky-cards.png`, `top3-characteristics.png`, `top3-final.png`
- ADR-008 (escalabilidad), ADR-009 (despliegue), ADR-011 (top 3)

**Al terminar, el espectador puede**

- Distinguir una función de una característica de arquitectura.
- Marcar un pliego con características y justificar un descarte.
- Usar el etiquetado por pieza para separar características locales de globales.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- Las definiciones del repo que hablan de «a building or space» (HISTORIA, inconsistencia 19).
- La tabla larga de requisitos asignados a cada característica (`9808752`).
- La pregunta de por qué elasticidad se queda y escalabilidad se baja con casi la misma razón (HISTORIA, inconsistencia 20): queda como nota para el curso escrito.

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (53 palabras, ~25 s) | Función vs cualidad (caso) | Función vs cualidad (caso) ~17 s | Sí: el caso de 1 s vs 10 s | Se define en la escena siguiente | Sí | Sí | Bien |
| `caracteristicas` (121 palabras, ~56 s) | Característica de arquitectura; Cada una cuesta (trade-off), con un caso; Máximo 7, top 3 | Característica de arquitectura ~15 s; Cada una cuesta (trade-off), con un caso ~23 s; Máximo 7, top 3 ~18 s | Sí (viene de la intro) | Sí | Sí: optimizar todo es no optimizar nada | Sí | Bien |
| `primera` (58 palabras, ~28 s) | Marcar el pliego con características; El primer top 3; El cambio de idea | Marcar el pliego con características ~19 s; El primer top 3 ~6 s; El cambio de idea ~4 s | Sí | Sí (por contexto) | Se explica en la escena siguiente | Sí | Bien |
| `segunda` (141 palabras, ~67 s) | Por qué cambió el vocabulario (inferencia marcada); Rendimiento; Disponibilidad vs tolerancia a fallos; Configurabilidad; Evolvability; Elasticidad; Seguridad | Por qué cambió el vocabulario (inferencia marcada) ~18 s; Rendimiento ~6 s; Disponibilidad vs tolerancia a fallos ~18 s; Configurabilidad ~7 s; Evolvability ~7 s; Elasticidad ~5 s; Seguridad ~5 s | Sí: cada término sale de una frase del pliego | Sí, una línea cada uno | Sí: la frase del pliego es el porqué | Sí: la frase y la tarjeta quedan juntas | Aceptable: siete términos; cada uno tiene su frase y vuelve en las escenas siguientes |
| `descartes` (80 palabras, ~37 s) | Descartar escalabilidad; Descartar despliegue; Downplayed como decisión | Descartar escalabilidad ~12 s; Descartar despliegue ~7 s; Downplayed como decisión ~18 s | Sí: el máximo de 500 y la instalación única | Sí: escalabilidad y despliegue | Sí, con los hechos del pliego | Sí | Bien |
| `etiquetas` (92 palabras, ~44 s) | Etiquetar por pieza; Local vs global; Cuatro candidatas | Etiquetar por pieza ~14 s; Local vs global ~21 s; Cuatro candidatas ~9 s | Sí: el tablero antes de la regla | Sí | Sí: lo local se resuelve local | Sí: el tablero queda toda la escena | Bien |
| `piensalo` (49 palabras, ~26 s) | Elegir el top 3 (piénsalo); La decisión del equipo | Elegir el top 3 (piénsalo) ~12 s; La decisión del equipo ~15 s | Sí | — | Queda abierto a propósito: es el gancho del cap. 4 | Sí | Bien |
| `outro` (84 palabras, ~39 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~28 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Qué diferencia hay entre una función y una característica? → caracteristicas, línea 2.
- ¿Por qué no elegir todas? → caracteristicas, líneas 3 y 4.
- ¿Disponibilidad y tolerancia a fallos no son lo mismo? → segunda, líneas 3 a 5.
- ¿Qué es evolvability, elasticidad, configurabilidad? → segunda, una línea cada una.
- ¿Bajar la escalabilidad no es peligroso? → descartes, líneas 2 y 4.
- ¿Por qué la seguridad no entra al top 3 si hay datos de pacientes? → etiquetas, líneas 3 y 4 (es local a una pieza).

### Guion

#### `intro` · Capítulo 3 (~25 s)

> **Visual:** Las cuatro piezas violetas del capítulo 2. Luego dos pantallas lado a lado con la misma ficha de paciente: una se actualiza en 1 s, la otra en 10 s (cronómetros). La segunda se apaga en rojo. Título.

1. ¿Recuerdas las cuatro piezas? Recorder, Analyzer, Streamer y Alert.
2. Saber qué hace cada una no alcanza. Imagina dos sistemas que hacen lo mismo: uno muestra la lectura en un segundo, el otro en diez.
3. Los dos cumplen la función. Solo uno sirve en un hospital. · *pausa 1 s*
4. Capítulo 3: qué tiene que ser el sistema. · *say:* «Capítulo tres: qué tiene que ser el sistema.»

#### `caracteristicas` · Características de arquitectura (~56 s)

> **Visual:** Dos columnas: «qué hace» (función) y «qué tan bien» (característica), con ejemplos. Tres perillas (rapidez, seguridad, facilidad de cambio) que no pueden estar todas al máximo: al subir una, otra baja. Después, la planilla en blanco del equipo (parte izquierda de `top3-characteristics.png`) con sus instrucciones resaltadas: «no more than 7», «top 3».

1. Esa diferencia tiene nombre: característica de arquitectura.
2. Una función dice qué hace el sistema. Una característica dice qué tan bien lo hace: qué tan rápido, qué tan seguro, qué tan fácil de cambiar.
3. Y aquí está el problema: cada característica cuesta. Lo que hace a un sistema más rápido a veces lo hace más difícil de cambiar.
4. En MonitorMe, por ejemplo: más copias de cada pieza dan más disponibilidad, pero cuestan más hardware en cada hospital.
5. Optimizar todo es no optimizar nada. · *pausa 1 s*
6. Por eso el equipo usó una planilla con una regla simple: elegir como máximo siete características, y de esas, las tres que manden.
7. Las tres que manden son las que van a decidir la forma de todo el sistema.

#### `primera` · Primera pasada (~28 s)

> **Visual:** Redibujar la versión vieja de `characteristics.png` (`7cfd748`): el pliego con papelitos verdes a la derecha, que aparecen uno por frase. Luego la planilla vieja `top3_final.png` (fecha manuscrita 2024/02/17) con tildes en Reliability, Performance, Extensibility. Al final, un sello «19 feb: rehecho».

1. El 17 de febrero hicieron la primera pasada. Leyeron el pliego y pegaron un papelito junto a cada frase que pedía algo. · *say:* «El diecisiete de febrero hicieron la primera pasada. Leyeron el pliego y pegaron un papelito junto a cada frase que pedía algo.»
2. Junto al segundo de respuesta, confiabilidad. Junto a los ritmos de los sensores, rendimiento. Junto a la confidencialidad, seguridad.
3. Eligieron siete, y de ellas, tres: confiabilidad, rendimiento y extensibilidad. · *pausa 1 s*
4. Dos días después, lo rehicieron casi entero. · *pausa 1 s*

#### `segunda` · Segunda pasada (~67 s)

> **Visual:** Redibujar la versión nueva de `characteristics.png` (`11ae412`): mismo pliego, papelitos nuevos. Cada línea ilumina una frase del pliego y su papelito, y suma una tarjeta con la definición en 6 a 10 palabras. Al final quedan las siete tarjetas juntas (lista de `Characteristics.md`, «Choosing the Top 7»).

1. El 19 de febrero volvieron al pliego, frase por frase, con un vocabulario más preciso. · *say:* «El diecinueve de febrero volvieron al pliego, frase por frase, con un vocabulario más preciso.»
2. No dejaron escrito por qué. Una pista: las palabras nuevas son las mismas de la planilla que usarían después para elegir el estilo. · *pausa 0,8 s*
3. El segundo de respuesta y los ritmos de los sensores: rendimiento, o performance.
4. El sensor que falla y el resto que sigue: ahí vieron dos características distintas.
5. Disponibilidad: que el sistema esté funcionando cuando se lo necesita.
6. Y tolerancia a fallos: que si una parte se rompe, las demás sigan. · *pausa 1 s*
7. Las alertas que cambian si el paciente duerme: configurabilidad, cambiar el comportamiento con configuración, sin reprogramar.
8. Los aparatos nuevos y los cambios del negocio: evolvability, que el sistema sea fácil de cambiar.
9. Y elasticidad: sumar recursos cuando la carga crece, y soltarlos cuando baja.
10. Más la seguridad, por los datos del paciente. Siete. · *pausa 1 s*

#### `descartes` · Bajarle el volumen (~37 s)

> **Visual:** Dos papelitos que quedaron fuera de la lista, «Scalability» y «Deployability», bajan de tamaño con un control de volumen. Junto a cada uno, la razón en una línea y su ADR (008, 009). Palabra «downplayed» en pantalla.

1. Tan importante como elegir fue descartar, con las razones por escrito.
2. La escalabilidad, crecer para atender más carga, quedó abajo. El pliego ya fija el máximo: 500 pacientes. Si llegan sensores nuevos, se agrega un servidor a mano. · *say:* «La escalabilidad, crecer para atender más carga, quedó abajo. El pliego ya fija el máximo: quinientos pacientes. Si llegan sensores nuevos, se agrega un servidor a mano.»
3. La facilidad de despliegue, también: el sistema se instala una vez por hospital, sin migraciones.
4. El equipo lo llamó «downplayed»: no desaparecen, pero no mandan. Cada una quedó en su ADR. · *pausa 1 s*
5. Descartar con una razón escrita es una decisión, no un olvido.

#### `etiquetas` · Característica por pieza (~44 s)

> **Visual:** Redibujar `ArchitectureCharacteristics/images/components-sticky-cards.png`: las cuatro piezas azules y los papelitos verdes encima, que se pegan uno por uno. Seguridad (solo sobre Alert), tolerancia a fallos y configurabilidad (cada una sobre una sola pieza, en el original junto al Analyzer) se atenúan. Quedan cuatro resaltadas. Al final, «4 candidatas / 3 lugares».

1. Siete siguen siendo demasiadas. Para llegar a tres, el equipo hizo algo ingenioso.
2. Puso las cuatro piezas en el tablero, y pegó sobre cada una las características que esa pieza necesita.
3. La seguridad quedó sobre una sola pieza, Alert. La tolerancia a fallos y la configurabilidad, también sobre una sola cada una.
4. Una característica que vive en una sola pieza se resuelve dentro de esa pieza. No define la forma de todo el sistema. · *pausa 1 s*
5. Quedaron cuatro que se repetían en varias piezas: disponibilidad, evolvability, rendimiento y elasticidad.
6. Cuatro candidatas, y tres lugares. · *pausa 1 s*

#### `piensalo` · Piénsalo tú (~26 s)

> **Visual:** Las cuatro tarjetas candidatas en fila con el anillo de 3 s. Al responder, «Disponibilidad» se desliza fuera del marco. Queda `top3-final.png` redibujado: Evolvability, Elasticity, Performance.

1. Ahora tú. Un sistema que vigila a pacientes internados. Tienes que dejar afuera una de las cuatro.
2. ¿Cuál sacarías? · *pausa 3 s*
3. El equipo sacó la disponibilidad.
4. Sí: en un sistema donde hay vidas en juego, dejaron afuera que el sistema esté funcionando. · *pausa 1 s*
5. El top 3 quedó así: evolvability, rendimiento y elasticidad. · *say:* «El top tres quedó así: evolvability, rendimiento y elasticidad.»

#### `outro` · Para llevarte (~39 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: la tarjeta «Disponibilidad» fuera del marco, con un signo de pregunta.

1. Repasemos. Una característica de arquitectura dice qué tan bien hace el sistema lo que hace.
2. Se eligen pocas, porque cada una cuesta, y se descartan otras con razones escritas.
3. Pegarlas sobre cada pieza separa lo local de lo que define todo el sistema.
4. Y el equipo rehízo su primera lista dos días después. Pensar dos veces también es método. · *pausa 1 s*
5. Lo que sigue: por qué dejaron afuera la disponibilidad, si fue un error, y cómo eligieron la forma del sistema.
6. Eso, en el capítulo 4. · *say:* «Eso, en el capítulo cuatro.»


---

## Capítulo 4 · El estilo y la disponibilidad que no votó

`video/ch4/narration.json` · 8 escenas, 44 líneas, 692 palabras de subtítulo (693 habladas). A 2,2 palabras por segundo: 5:15 de voz más 15,4 s de pausas escritas = **5:30**.

### Plan

**Ideas esenciales**

1. Un estilo de arquitectura es la forma general del sistema; en el estilo orientado a eventos, las piezas se avisan en lugar de llamarse.
2. La planilla de estilos suma estrellas en las filas del top 3: orientado a eventos gana con 14.
3. El argumento del ADR-010 es débil: la planilla no tiene la fila, pero sí una cercana (tolerancia a fallos), y con ella el ganador no cambia.
4. Regla: si lo crítico no entra en tu herramienta, tradúcelo; no lo dejes caer. Contrapunto del podio.

**Anclas en el repositorio**

- ADR-010 (`5c44f08`, 21-02) y la razón agregada a `Characteristics.md` (`d4dd3fe`, 22-02)
- ADR-011 y ADR-012 («14 stars»)
- Planilla de estilos: `05adfda:resources/images/chosen-architecture.png` (19-02 17:30, con fault-tolerance subrayada) y la final `ArchitectureCharacteristics/images/chosen-architecture.png` (`11ae412`)
- `components-sticky-cards.png` (la disponibilidad sobre las cuatro piezas)
- Podio: `Mighty-Orbots/README.md` §3.3–3.4; `LowCode/Docs/Decisions/0000-use-event-driven-architecture.md`

**Al terminar, el espectador puede**

- Explicar qué es un estilo de arquitectura y cómo funciona uno orientado a eventos.
- Usar una planilla de estilos: marcar filas, sumar, comparar.
- Evaluar un argumento de descarte separando la decisión de su razón.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- La descripción de los ocho estilos de la planilla: solo se definen los tres que compiten, y space-based en una frase.
- La versión intermedia de la planilla con escalabilidad marcada (se menciona solo el subrayado de tolerancia a fallos, que es lo que importa al argumento).
- Architects Evolution Zone en el contrapunto (basta con dos del podio).

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (70 palabras, ~33 s) | Puente y tensión | Puente y tensión ~28 s | Sí: la tensión con el pliego | — | — | Sí | Bien |
| `razones` (84 palabras, ~40 s) | Las tres razones del ADR-010 | Las tres razones del ADR-010 ~35 s | Sí | — | Es el porqué del equipo, textual | Sí: tres tarjetas cortas, ~8 s cada una | Bien |
| `estilo` (90 palabras, ~43 s) | Estilo de arquitectura; Orientado a eventos | Estilo de arquitectura ~17 s; Orientado a eventos ~25 s | Sí: el ejemplo con las piezas del caso | Sí | Sí: quien anuncia no depende de quien escucha | Sí | Bien |
| `planilla` (108 palabras, ~51 s) | Cómo se lee la planilla; La suma: 14 vs 13 vs 12; El subrayado borrado | Cómo se lee la planilla ~20 s; La suma: 14 vs 13 vs 12 ~20 s; El subrayado borrado ~11 s | Sí | Sí: la planilla y space-based | Sí: suma de las filas del top 3 | Sí: la tabla queda toda la escena; los totales ~15 s | Bien |
| `prueba` (82 palabras, ~39 s) | La fila cercana (tolerancia a fallos); La evidencia de sus propios papelitos | La fila cercana (tolerancia a fallos) ~24 s; La evidencia de sus propios papelitos ~16 s | Sí | Reusa la definición del cap. 3 | Sí | Sí | Bien |
| `piensalo` (58 palabras, ~30 s) | Recalcular con la fila cercana (piénsalo); Decisión vs razón | Recalcular con la fila cercana (piénsalo) ~18 s; Decisión vs razón ~12 s | Sí | — | Sí | Sí: las estrellas están en pantalla durante la pausa | Bien |
| `regla` (106 palabras, ~50 s) | La regla: traducir, no descartar; Contrapunto del podio; Gancho al cap. 7 | La regla: traducir, no descartar ~14 s; Contrapunto del podio ~28 s; Gancho al cap. 7 ~8 s | Sí (viene del piénsalo) | — | Sí | Sí: tarjetas del podio ~15 s | Bien |
| `outro` (95 palabras, ~44 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~34 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Qué es un estilo? → estilo, línea 1.
- ¿Qué gana un sistema con eventos? → estilo, líneas 4 y 5.
- ¿De dónde salen las estrellas? → planilla, línea 2 (la planilla es una referencia del método; el equipo la usó tal cual).
- ¿Qué es space-based? → planilla, línea 5, en una frase.
- Entonces, ¿estuvo mal dejar afuera la disponibilidad? → piensalo y regla: la decisión se sostiene, la razón no.
- ¿Qué hicieron los otros finalistas? → regla, líneas 3 a 5.

### Guion

#### `intro` · Capítulo 4 (~33 s)

> **Visual:** La tarjeta «Disponibilidad» fuera del marco, como cerró el capítulo 3. Al lado, dos frases del pliego en inglés: «human lives are at stake» y «MonitorMe must still function». Título.

1. ¿Recuerdas el final del capítulo anterior? Cuatro candidatas, tres lugares, y la disponibilidad afuera.
2. Suena raro. El pliego dice que hay vidas en juego, y que si un sensor falla, el resto tiene que seguir.
3. Hoy vamos a ver las razones del equipo, a ponerlas a prueba, y a usar las tres que quedaron para elegir la forma del sistema. · *pausa 0,8 s*
4. Capítulo 4: el estilo, y la disponibilidad que no votó. · *say:* «Capítulo cuatro: el estilo, y la disponibilidad que no votó.»

#### `razones` · Las razones del equipo (~40 s)

> **Visual:** Tres tarjetas numeradas, una por razón, con la frase original en chico («Availability is contingent upon both Performance and Elasticity», «not specified in the template», «ensured at the infrastructure level»). Al final, la ficha del ADR-010 con su título en inglés.

1. El equipo dio tres razones, por escrito.
2. Primera: la disponibilidad depende del rendimiento y de la elasticidad. Si esas dos funcionan bien, el sistema sigue disponible.
3. Segunda: la plantilla que iban a usar para elegir el estilo no tiene una fila para la disponibilidad.
4. Tercera: se va a asegurar en la infraestructura, duplicando las piezas críticas. · *pausa 0,8 s*
5. Lo dejaron en un ADR con un título claro: la disponibilidad no se usa para elegir la arquitectura. · *pausa 1 s*
6. Para entender la segunda razón, hay que ver esa plantilla.

#### `estilo` · Estilos de arquitectura (~43 s)

> **Visual:** Tres miniaturas de forma: un bloque único (monolito), muchas cajitas sueltas (microservicios) y cajas unidas por un canal central con mensajes (eventos). Después, las piezas del curso: Recorder emite un pulso «llegó una lectura» y Streamer y Analyzer se encienden al recibirlo. Recorder no tiene flechas hacia ellos.

1. Un estilo de arquitectura es la forma general de un sistema: cómo se organizan sus piezas y cómo se comunican.
2. Hay unos pocos estilos conocidos. Un monolito: todo en una sola aplicación. Microservicios: muchas piezas pequeñas e independientes.
3. Y el estilo orientado a eventos.
4. En él, las piezas no se llaman entre sí. Cuando pasa algo, una pieza lo anuncia, y las que estén interesadas reaccionan. · *pausa 0,8 s*
5. En MonitorMe sería así: Recorder anuncia «llegó una lectura». Streamer la lleva a la pantalla, y Analyzer la revisa. Recorder ni sabe que existen. · *pausa 1 s*

#### `planilla` · La planilla de estilos (~51 s)

> **Visual:** Redibujar `ArchitectureCharacteristics/images/chosen-architecture.png`: 8 columnas, 16 filas, estrellas. Se marcan las filas elasticity, evolvability, performance como en el original (óvalos a mano). Los números 14, 13 y 12 aparecen bajo event-driven, space-based y microservices. Al final, la versión anterior del mismo día (`05adfda`) con el subrayado en fault-tolerance, que se borra.

1. La plantilla es una tabla. Las columnas son ocho estilos. Las filas, dieciséis características.
2. Cada casilla tiene de una a cinco estrellas: qué tan bien da ese estilo esa característica.
3. Se marcan las filas del top 3, y se suman las estrellas de cada columna. · *say:* «Se marcan las filas del top tres, y se suman las estrellas de cada columna.»
4. Orientado a eventos: cuatro en elasticidad, cinco en evolvability, cinco en rendimiento. Catorce. · *pausa 1 s*
5. Space-based, un estilo pensado para picos enormes de carga, suma trece. Microservicios, doce.
6. Ganó orientado a eventos, por una estrella. Quedó en el ADR 012. · *say:* «Ganó orientado a eventos, por una estrella. Quedó en el A-D-R cero doce.» · *pausa 1 s*
7. Un detalle del historial: en una versión anterior de esta planilla, del mismo día, también habían subrayado la tolerancia a fallos. Después la borraron.

#### `prueba` · Ponerlo a prueba (~39 s)

> **Visual:** La columna de filas de la planilla con lupa: no hay «availability»; «fault-tolerance» se ilumina. Luego `components-sticky-cards.png`: los cuatro papelitos «Availability» parpadean (uno por pieza) frente a tres de «Performance» y tres de «Elasticity».

1. Ahora, la segunda razón. ¿Es verdad que la plantilla no tiene lugar para la disponibilidad?
2. No hay una fila con ese nombre. Pero hay una muy cercana: tolerancia a fallos, que si una parte se rompe, el resto siga.
3. Es justo lo que pide el pliego cuando falla un sensor. · *pausa 1 s*
4. Y en sus propios papelitos, la disponibilidad estaba pegada sobre las cuatro piezas. El rendimiento y la elasticidad, sobre tres. · *pausa 1 s*
5. O sea: la que más se repetía fue la que quedó afuera.

#### `piensalo` · Piénsalo tú (~30 s)

> **Visual:** La planilla con solo tres columnas visibles (event-driven, microservices, space-based) y cuatro filas marcadas. Las estrellas de fault-tolerance (5, 5, 3) se resaltan. Anillo de 3 s. Al responder, los totales 19, 17 y 16 se escriben a mano debajo.

1. Ahora tú. Toma la fila de tolerancia a fallos como si fuera la disponibilidad, y súmala a las otras tres.
2. Orientado a eventos tiene cinco estrellas ahí. Microservicios, cinco. Space-based, tres.
3. ¿Cambia el ganador? · *pausa 3 s*
4. No cambia. Orientado a eventos suma diecinueve, microservicios diecisiete, y space-based dieciséis.
5. La decisión se sostiene. Lo que no se sostiene es la razón. · *pausa 1 s*

#### `regla` · La regla, y el podio (~50 s)

> **Visual:** Una tarjeta grande con la regla. Después, un podio con tres tarjetas: Mighty Orbots (2.º) con «Availability» al principio de su lista; Low Codes (3.º) con «Fault-tolerance; to support failover/high availability» de su ADR; BluzBrothers (1.º). Debajo de los tres, el mismo ícono de eventos.

1. Una herramienta sin una fila no vuelve menos importante a un requisito.
2. Si lo crítico no entra en tu planilla, tradúcelo a lo más cercano. No lo dejes caer. · *pausa 1 s*
3. En el mismo kata hubo quien lo hizo así. Mighty Orbots, segundo lugar, puso la disponibilidad primera en su lista de características.
4. Y Low Codes, uno de los terceros, la usó para elegir su estilo, apoyada justamente en la tolerancia a fallos.
5. Los tres equipos eligieron eventos, solos o combinados. El estilo no fue lo que separó al ganador. · *pausa 1 s*
6. Y la disponibilidad de BluzBrothers no desapareció: vuelve por la puerta de la infraestructura, en el capítulo 7. · *say:* «Y la disponibilidad de BluzBrothers no desapareció: vuelve por la puerta de la infraestructura, en el capítulo siete.»

#### `outro` · Para llevarte (~44 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: una lectura de pulso como un punto de luz que entra a un diagrama.

1. Repasemos. Un estilo de arquitectura es la forma general del sistema. En el orientado a eventos, las piezas se avisan en lugar de llamarse.
2. La planilla de estilos suma estrellas en las filas del top 3. Orientado a eventos ganó con catorce. · *say:* «La planilla de estilos suma estrellas en las filas del top tres. Orientado a eventos ganó con catorce.»
3. La disponibilidad quedó afuera por una razón débil: la planilla no tenía su fila.
4. Con la fila más cercana, el ganador no cambia. La decisión se sostiene; el argumento, no. · *pausa 1 s*
5. Lo que sigue: el diseño. Vamos a seguir una lectura del pulso desde el sensor hasta la pantalla.
6. Eso, en el capítulo 5. · *say:* «Eso, en el capítulo cinco.»


---

## Capítulo 5 · El camino de una lectura

`video/ch5/narration.json` · 9 escenas, 43 líneas, 676 palabras de subtítulo (678 habladas). A 2,2 palabras por segundo: 5:08 de voz más 13 s de pausas escritas = **5:21**.

### Plan

**Ideas esenciales**

1. El modelo C4 dibuja el sistema por niveles de zoom; el contexto deja afuera la app y la pantalla (no son del equipo).
2. Una lectura entra por Recorder, que guarda y publica a la vez; una plataforma de mensajería la reparte por temas; Streamer la empuja a la pantalla.
3. Por qué esa forma sirve al top 3 (rendimiento, elasticidad, evolvability).
4. Los datos personales viven en un solo lugar; la base de series de tiempo es anónima.

**Anclas en el repositorio**

- `7cfd748:resources/images/characteristics_vs_modules.png` (diagrama fechado 17-02 con Kafka)
- `C4/C1-context.md` y `c1.jpg`; ADR-013 (app), ADR-014 (estación, websocket)
- `C4/C2-containers.md` y `c2.jpg`; ADR-015 (Kafka); ADR-017 (datos centralizados)
- `UseCases/US1-monitor.md` y `monitoring_sequence.jpg` (guardar y publicar en paralelo); `US3-snapshot.md`, `US4-review-data.md`

**Al terminar, el espectador puede**

- Leer un diagrama C4 de contexto y de contenedores.
- Explicar qué es una plataforma de mensajería y un tema, y por qué desacopla.
- Seguir un dato de punta a punta en un diseño orientado a eventos.
- Justificar dónde se guardan los datos personales.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- El nivel de código de C4 (el equipo no lo dibujó).
- El detalle de la API del Recorder y el «proprietary protocol» de los sensores.
- La base relacional del registro (se nombra como «su propia base»).

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (60 palabras, ~28 s) | Intuición antes que la planilla | Intuición antes que la planilla ~22 s | Sí | — | Sí | Sí | Bien |
| `c4` (69 palabras, ~32 s) | Modelo C4 y sus niveles | Modelo C4 y sus niveles ~32 s | Sí: la analogía del mapa | Sí: incluido «contenedor» en sentido C4 | Sí | Sí | Bien |
| `contexto` (99 palabras, ~46 s) | Contexto: qué queda fuera; Websocket | Contexto: qué queda fuera ~32 s; Websocket ~14 s | Sí | Sí: websocket | Sí: foco | Sí | Bien |
| `grabar` (49 palabras, ~23 s) | Recorder: guardar y publicar en paralelo | Recorder: guardar y publicar en paralelo ~23 s | Sí: el punto de luz | Recuerda la base del cap. 2 | Se explica en la escena «pantalla» | Sí | Bien |
| `plataforma` (78 palabras, ~36 s) | Plataforma de mensajería y tema; Kafka (ADR-015); Desacople | Plataforma de mensajería y tema ~22 s; Kafka (ADR-015) ~11 s; Desacople ~4 s | Sí: viene de «la publica» | Sí | Sí | Sí | Bien |
| `pantalla` (82 palabras, ~39 s) | Streamer y websocket; Rendimiento; Elasticidad; Evolvability | Streamer y websocket ~12 s; Rendimiento ~12 s; Elasticidad ~6 s; Evolvability ~8 s | Sí: la lectura llega antes de la explicación | — | Sí: es la justificación del diseño con el top 3 (razonamiento del curso sobre el diseño del equipo) | Sí | Bien |
| `piensalo` (82 palabras, ~41 s) | Dónde viven los datos personales (piénsalo); Centralizar y anonimizar (ADR-017) | Dónde viven los datos personales (piénsalo) ~15 s; Centralizar y anonimizar (ADR-017) ~26 s | Sí | — | Sí | Sí | Bien |
| `registro` (84 palabras, ~39 s) | Revisar la historia y snapshot; Cierre de «historia revisada» | Revisar la historia y snapshot ~27 s; Cierre de «historia revisada» ~12 s | Sí | — | Sí | Sí | Bien |
| `outro` (75 palabras, ~35 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~25 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Qué es C4 y qué es un contenedor? → c4, líneas 1 a 4.
- ¿Por qué la app y la pantalla quedan fuera? → contexto, líneas 2, 3 y 5.
- ¿Qué es un websocket? → contexto, línea 3.
- ¿Qué es Kafka? ¿Qué es un tema? → plataforma, líneas 1 a 4.
- ¿Por qué guardar y publicar a la vez? → pantalla, línea 4.
- ¿Dónde quedó «historia revisada»? → registro, línea 4.

### Guion

#### `intro` · Capítulo 5 (~28 s)

> **Visual:** Mostrar el diagrama original del 17 de febrero (`7cfd748:resources/images/characteristics_vs_modules.png`), sin los papelitos si es posible, con zoom a la caja «Signal Streaming Platform [Kafka]» y al sello «Last modified: 2024-02-17». Al lado, la planilla del 19. Título.

1. ¿Recuerdas la planilla? Orientado a eventos ganó el 19 de febrero. · *say:* «¿Recuerdas la planilla? Orientado a eventos ganó el diecinueve de febrero.»
2. El historial muestra algo más: un dibujo del 17 ya tenía, en el centro, una plataforma de mensajes llamada Kafka. · *say:* «El historial muestra algo más: un dibujo del diecisiete ya tenía, en el centro, una plataforma de mensajes llamada Kafka.»
3. La intuición llegó antes que la planilla. La planilla la confirmó, y la dejó por escrito. · *pausa 1 s*
4. Hoy vemos ese dibujo, ya terminado. Capítulo 5: el camino de una lectura. · *say:* «Hoy vemos ese dibujo, ya terminado. Capítulo cinco: el camino de una lectura.»

#### `c4` · El modelo C4 (~32 s)

> **Visual:** Un mapa con tres niveles de zoom: país, ciudad, calle. Se transforma en tres marcos de diagrama: «1 Contexto», «2 Contenedores», «3 Componentes». En el nivel 2, una caja «aplicación» y un cilindro «base de datos».

1. Para dibujar el sistema, el equipo usó el modelo C4: diagramas en niveles de zoom, como un mapa. · *say:* «Para dibujar el sistema, el equipo usó el modelo ce cuatro: diagramas en niveles de zoom, como un mapa.»
2. El primer nivel, el contexto, muestra el sistema como una sola caja, con quienes lo rodean.
3. El segundo abre esa caja. Muestra los contenedores: cada cosa que corre o guarda datos por separado, como una aplicación o una base de datos.
4. El tercero entra en una sola de esas piezas. · *pausa 1 s*

#### `contexto` · Nivel 1: el contexto (~46 s)

> **Visual:** Redibujar `C4/images/c1.jpg`: paciente a la izquierda, «MonitorMe ecosystem» al centro, a la derecha «mobile app», «Nurse station app» y «MyMedicalData», y el personal médico. Las tres cajas de la derecha en gris (fuera del diseño) con los ADR 013 y 014 pegados. Una línea abierta y continua entre MonitorMe y la estación para el websocket.

1. En el centro, MonitorMe. A la izquierda, el paciente, que manda sus signos vitales.
2. A la derecha, tres sistemas que no son parte del diseño. La app del teléfono la hace otro equipo, y recibe avisos de un servicio de notificaciones, como Firebase.
3. La pantalla de la estación es una aplicación aparte. Recibe los datos por un websocket: una conexión que queda abierta, para que el servidor empuje datos sin que la pantalla pregunte.
4. Y MyMedicalData, que ya existía, recibe los snapshots. · *pausa 1 s*
5. Dejar afuera lo que no es tuyo mantiene el diseño enfocado. Cada exclusión quedó en su ADR.

#### `grabar` · Nivel 2: entra una lectura (~23 s)

> **Visual:** Redibujar `C4/images/c2.jpg` de a partes. Aparece solo la columna de sensores y «Vital Sign Recorder». Un punto de luz (la lectura de pulso) entra y se divide en dos: uno baja al cilindro «Time Series DB», otro va al cilindro horizontal «Vital Sign topic». Etiquetas «hilo 1» y «hilo 2», como en `monitoring_sequence.jpg`.

1. Ahora abramos la caja, y sigamos una lectura del pulso.
2. Llega a Vital Sign Recorder, el que graba. Y Recorder hace dos cosas a la vez.
3. Una: la guarda en la base de series de tiempo. ¿Recuerdas? La del capítulo 2. · *say:* «Una: la guarda en la base de series de tiempo. ¿Recuerdas? La del capítulo dos.»
4. Dos: la publica en una plataforma de mensajería. · *pausa 1 s*

#### `plataforma` · La plataforma de mensajería (~36 s)

> **Visual:** Una cinta transportadora con carriles con nombre («signos vitales», «alertas»). Un productor deja cajitas; dos lectores las toman a ritmos distintos; las cajitas quedan en la cinta un rato. Al final, el logo genérico de Kafka y la ficha del ADR-015.

1. Una plataforma de mensajería es como una cinta transportadora central.
2. Quien produce un mensaje lo deja en un tema, un canal con nombre. Aquí, el tema de signos vitales.
3. Quien lo necesita, lo lee a su ritmo. Y el mensaje queda guardado un tiempo, aunque alguien se atrase.
4. La más conocida es Kafka, y fue la que el equipo eligió en su ADR: baja latencia, y que escala bien. · *pausa 1 s*
5. Recorder no sabe quién va a leer. Solo publica.

#### `pantalla` · Hasta la pantalla (~39 s)

> **Visual:** Sigue el C2: aparece «Vital Sign Streamer», que toma el punto del tema y lo empuja por la línea del websocket a «Consolidated monitoring display». Luego tres tarjetas, una por característica del top 3, cada una con un mini-dibujo: dos caminos en paralelo; copias del Streamer leyendo el mismo tema; una pieza nueva que se suscribe.

1. Del otro lado, Vital Sign Streamer lee el tema de signos vitales.
2. Y empuja cada lectura por el websocket hasta la pantalla de la estación. · *pausa 1 s*
3. Mira por qué esta forma sirve al top 3. · *say:* «Mira por qué esta forma sirve al top tres.»
4. Rendimiento: la pantalla no espera a que la base termine de guardar. Las dos cosas van en paralelo.
5. Elasticidad: si hay más estaciones, se suman copias del Streamer, leyendo el mismo tema.
6. Evolvability: una pieza nueva que necesite las lecturas se suscribe al tema, sin tocar el Recorder. · *pausa 1 s*

#### `piensalo` · Piénsalo tú (~41 s)

> **Visual:** El C2 completo y atenuado. Una ficha de paciente con un nombre ficticio genérico flota sin lugar. Anillo de 3 s. Al responder, la ficha entra al contenedor «Patient and sensors register» y a su base; el cilindro de series de tiempo muestra solo «sensor 17 · 72 lpm · 03:12» y la frase original «Data is anonymous».

1. Ahora tú. StayHealthy cuida la confidencialidad, y la base de series de tiempo va a guardar millones de lecturas.
2. ¿Dónde pondrías el nombre de cada paciente? · *pausa 3 s*
3. El equipo lo puso en un solo lugar: el registro de pacientes y sensores, con su propia base.
4. La base de series de tiempo guarda lecturas por sensor, sin nombres. Su diagrama lo dice: los datos son anónimos.
5. Solo el registro sabe qué sensor es de quién. Menos lugares con datos personales, menos lugares que proteger. · *pausa 1 s*

#### `registro` · Los otros dos flujos (~39 s)

> **Visual:** Del C2: «Patient and sensors register» con dos flechas: hacia la base de series de tiempo («Read data») y hacia MyMedicalData (HTTPS). Mini secuencias de `data_review_sequence.jpg` y `snapshot_sequence.jpg`. Al final, el papelito «history data reviewed» del tablero vuelve de la papelera y se pega junto a US4.

1. Ese registro también resuelve los otros dos flujos del capítulo 1. · *say:* «Ese registro también resuelve los otros dos flujos del capítulo uno.»
2. Para revisar la historia, la pantalla le pide al registro un rango de horas, y el registro consulta la base de series de tiempo.
3. Para el snapshot, el registro junta los datos del paciente con sus lecturas, y los envía a MyMedicalData por una conexión segura. · *pausa 1 s*
4. ¿Recuerdas «historia revisada», el papelito que fue a la papelera? Volvió aquí, como uno de los cuatro casos de uso que el equipo dibujó paso a paso.

#### `outro` · Para llevarte (~35 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: la pantalla de 20 pacientes y una enfermera que mira hacia otro lado.

1. Repasemos. El modelo C4 dibuja el sistema en niveles de zoom: contexto, contenedores, componentes. · *say:* «Repasemos. El modelo ce cuatro dibuja el sistema en niveles de zoom: contexto, contenedores, componentes.»
2. Una lectura entra por Recorder, que guarda y publica a la vez.
3. La plataforma de mensajería reparte las lecturas por temas, y Streamer las empuja a la pantalla.
4. Y los datos personales viven en un solo lugar. · *pausa 1 s*
5. Lo que sigue: el flujo que salva vidas. ¿Quién mira las lecturas cuando nadie está mirando la pantalla?
6. Eso, en el capítulo 6. · *say:* «Eso, en el capítulo seis.»


---

## Capítulo 6 · La alerta

`video/ch6/narration.json` · 8 escenas, 43 líneas, 694 palabras de subtítulo (695 habladas). A 2,2 palabras por segundo: 5:16 de voz más 13 s de pausas escritas = **5:29**.

### Plan

**Ideas esenciales**

1. El Analyzer, la pieza más crítica: suscriptor, normalizador, motor de reglas y publicador de alertas.
2. Un motor de reglas configurable resuelve la configurabilidad sin reprogramar.
3. Las reglas que combinan signos (sueño y presión) necesitan memoria: una caché distribuida que sobrevive a una caída.
4. La alerta sale por dos caminos (teléfono e internet, estación y red local); hueco: nadie confirma que la vio.

**Anclas en el repositorio**

- `C4/C3-components.md` y `c3-analyzer.jpg` (`dc59d65`, 20-02)
- `C4/C2-containers.md` (Analyzer, «PROTECT HUMANS LIFE»); el «ADR-###» de `13e61cd`
- ADR-019 (caché distribuida), ADR-016 (dos canales)
- `UseCases/US2-alert.md`, `alerting_sequence.jpg`
- Evento «nurse seen the alert» en `EventStorming/images/1.png` a `7.png`

**Al terminar, el espectador puede**

- Describir los pasos internos del Analyzer.
- Explicar qué es un motor de reglas y por qué una regla multi-signo necesita estado.
- Justificar una caché distribuida y dos canales de aviso.
- Detectar un hueco de diseño (alerta sin confirmación).

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- El CRUD de reglas y su base relacional en detalle.
- El filtrado de signos que ninguna regla usa (nota del primer C2).
- HTTP vs websocket por canal (ADR-016): se dice «por internet» y «por la red local».

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (66 palabras, ~31 s) | Por qué hace falta el análisis | Por qué hace falta el análisis ~25 s | Sí | — | Sí | Sí | Bien |
| `c3` (93 palabras, ~43 s) | Los cuatro pasos del Analyzer; Dónde se le pone nombre a la lectura (andamiaje al cap. 5) | Los cuatro pasos del Analyzer ~33 s; Dónde se le pone nombre a la lectura (andamiaje al cap. 5) ~10 s | Sí | Sí: cada paso en su línea | Sí | Sí: cada caja ~5 s; el diagrama queda | Bien |
| `reglas` (88 palabras, ~41 s) | Motor de reglas; Configurabilidad resuelta (andamiaje); Umbral simple | Motor de reglas ~23 s; Configurabilidad resuelta (andamiaje) ~8 s; Umbral simple ~10 s | Sí | Sí | Sí | Sí | Bien |
| `piensalo` (72 palabras, ~37 s) | Regla de varios signos (piénsalo); Ritmos distintos (andamiaje al cap. 1) | Regla de varios signos (piénsalo) ~22 s; Ritmos distintos (andamiaje al cap. 1) ~15 s | Sí: el caso antes de la caché | — | Sí | Sí | Bien |
| `cache` (99 palabras, ~47 s) | Caché; Caché distribuida y recuperación; El precio (ADR-019) | Caché ~24 s; Caché distribuida y recuperación ~15 s; El precio (ADR-019) ~8 s | Sí: el problema del piénsalo | Sí: caché y distribuida | Sí | Sí | Bien |
| `canales` (115 palabras, ~54 s) | Dos canales (ADR-016); Eventos: sumar un lector | Dos canales (ADR-016) ~44 s; Eventos: sumar un lector ~10 s | Sí: el corte y la estación vacía | Sí: notificación push por contexto | Sí | Sí | Bien |
| `hueco` (76 palabras, ~36 s) | Alerta sin confirmación (hueco); Push pendiente | Alerta sin confirmación (hueco) ~20 s; Push pendiente ~16 s | Sí | — | Sí | Sí | Bien (idea secundaria) |
| `outro` (86 palabras, ~40 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~30 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Por qué solo dibujaron por dentro el Analyzer? → intro, línea 4.
- ¿Qué es normalizar una lectura? → c3, línea 3.
- ¿Qué es un motor de reglas? → reglas, líneas 1 y 2.
- ¿Qué es una caché y por qué distribuida? → cache, líneas 1, 4 y 5.
- ¿Por qué dos canales? → canales, línea 4.
- ¿Y si nadie ve la alerta? → hueco.

### Guion

#### `intro` · Capítulo 6 (~31 s)

> **Visual:** La pantalla de 20 pacientes rotando y una enfermera atendiendo a otro paciente, de espaldas. Una ficha se pone roja cuando la pantalla ya pasó a otra. Después, el C2 con el contenedor «Vital Sign Analyzer» iluminado. Título.

1. ¿Recuerdas el segundo flujo? Del análisis a la alerta.
2. Una pantalla con veinte pacientes, que cambia cada cinco segundos, no alcanza. La enfermera no puede mirarla todo el tiempo.
3. Alguien tiene que vigilar cada lectura. Esa pieza es Vital Sign Analyzer, y el equipo la consideró la más crítica y la más compleja. · *pausa 1 s*
4. Por eso es la única que dibujaron por dentro. Capítulo 6: la alerta. · *say:* «Por eso es la única que dibujaron por dentro. Capítulo seis: la alerta.»

#### `c3` · Nivel 3: dentro del Analyzer (~43 s)

> **Visual:** Redibujar `C4/images/c3-analyzer.jpg`: a la izquierda el tema de signos vitales; adentro, cuatro cajas en fila que se encienden una por línea (Topic Subscriber, Signal Normalizer, Logic Processor for Rule Engine, Alert Publisher); a la derecha el tema de alertas. La flecha del normalizador al «Patient and Sensor register» aparece con la línea 3.

1. El Analyzer lee el mismo tema de signos vitales que el Streamer. Adentro, cada lectura recorre cuatro pasos.
2. Uno: un suscriptor la toma del tema.
3. Dos: un normalizador le agrega el contexto: de qué paciente es, y qué médico lo atiende. Eso lo pide al registro.
4. ¿Recuerdas que las lecturas se guardan sin nombre? Aquí, por un momento, se asocian a su paciente, para poder evaluar sus reglas.
5. Tres: un procesador de reglas decide si hay un problema.
6. Cuatro: si lo hay, un publicador deja una alerta en otro tema, el de alertas. · *pausa 1 s*

#### `reglas` · Un motor de reglas (~41 s)

> **Visual:** Zoom a «Rule Engine (CRUD)» y su base «Stores configured rules». Una regla escrita como ficha editable («si temperatura > 104 °F → alerta»), que alguien edita sin abrir código. La tarjeta «Configurabilidad» del cap. 3, que estaba sobre una sola pieza, se pega aquí.

1. Las reglas no están escritas en el código. Viven en una base de datos, y se cargan y se editan como datos.
2. Eso es un motor de reglas: el sistema evalúa reglas que se pueden configurar, sin reprogramar.
3. Así, ajustar una regla no obliga a esperar una versión nueva del software.
4. ¿Recuerdas la configurabilidad del capítulo 3? Vivía en una sola pieza: esta. Aquí está resuelta. · *say:* «¿Recuerdas la configurabilidad del capítulo tres? Vivía en una sola pieza: esta. Aquí está resuelta.» · *pausa 1 s*
5. Un umbral simple es fácil: si la temperatura pasa de 104 grados Fahrenheit, alerta. · *say:* «Un umbral simple es fácil: si la temperatura pasa de ciento cuatro grados Fahrenheit, alerta.»
6. Pero el pliego pide algo más difícil.

#### `piensalo` · Piénsalo tú (~37 s)

> **Visual:** Un reloj en las 3:00 y una luna. La curva de presión de un paciente baja. Anillo de 3 s. Al responder, aparece el sensor de sueño; luego dos líneas de tiempo paralelas: presión (una marca por hora) y sueño (una marca cada 2 min), que casi nunca coinciden.

1. Son las tres de la mañana. La presión de un paciente baja.
2. Con esa sola lectura, ¿la regla puede decidir si alerta? ¿Qué otro dato necesita? · *pausa 3 s*
3. Necesita saber si el paciente duerme. Dormido, la baja es normal. Despierto, puede ser grave.
4. Pero el estado de sueño llega cada dos minutos, y la presión una vez por hora. Casi nunca llegan juntos. · *pausa 1 s*
5. ¿Recuerdas la lluvia y la gota del capítulo 1? Aquí importa. · *say:* «¿Recuerdas la lluvia y la gota del capítulo uno? Aquí importa.»

#### `cache` · La memoria del Analyzer (~47 s)

> **Visual:** Una tabla por paciente con la última lectura de cada signo y su hora. Llega la presión; una flecha busca «sueño: dormido · 02:58» en la tabla; la regla queda verde. Después, la tabla sale del Analyzer a un cilindro aparte «Distributed Cache (e.g. Redis)» como en `c3-analyzer.jpg`. Una copia del Analyzer se apaga, aparece otra y se conecta a la misma caché.

1. La solución es una caché: una memoria rápida que guarda datos a mano, para no tener que ir a buscarlos cada vez.
2. El Analyzer guarda la última lectura de cada signo, agrupada por paciente.
3. Cuando llega la presión, la regla mira en la caché el último estado de sueño. Y decide. · *pausa 1 s*
4. Además, la caché es distribuida: vive fuera del Analyzer, en un servicio aparte, como Redis.
5. Si una copia del Analyzer se cae, la copia nueva encuentra la memoria intacta. No arranca a ciegas.
6. Lo dejaron en un ADR, con su precio: una pieza más que operar y vigilar. · *pausa 1 s*

#### `canales` · Dos caminos para avisar (~54 s)

> **Visual:** Del C2: el tema de alertas con dos lectores, «Vital Sign Alert» (flecha a una nube «internet» y a un teléfono) y «Vital Sign Streamer» (flecha por «red local» a la pantalla). Se corta la nube: la estación sigue en rojo. Se vacía la estación: el teléfono vibra. Al final la frase original en mayúsculas «PROTECT HUMANS LIFE» de `C2-containers.md`.

1. La alerta queda en el tema de alertas. Y ahí la leen dos piezas.
2. Vital Sign Alert la manda al teléfono del personal, por internet, como notificación push: un aviso que aparece en la pantalla del teléfono aunque la app esté cerrada.
3. Y el Streamer, el mismo de la pantalla, la muestra en la estación, por la red local del hospital.
4. ¿Por qué dos? Si se corta internet, la estación igual avisa. Si nadie está en la estación, suena el teléfono. · *pausa 1 s*
5. En su documento, el equipo escribió el porqué en mayúsculas: proteger la vida humana.
6. Y aquí se ve la ventaja de los eventos: sumar el segundo camino fue sumar otro lector al mismo tema. · *pausa 1 s*

#### `hueco` · Lo que falta (~36 s)

> **Visual:** El papelito «nurse seen the alert» del tablero (`EventStorming/images/1.png`). Una flecha intenta llevarlo al C2 y no encuentra caja: queda un hueco punteado con un signo de pregunta.

1. Un hueco, con honestidad. En la tormenta de eventos había un papelito: «la enfermera vio la alerta».
2. En el diseño no aparece. No hay forma de confirmar que alguien vio la alerta, ni de avisarle a otra persona si nadie responde. · *pausa 1 s*
3. Y el canal del teléfono tampoco está diseñado del todo: el equipo dejó escrito que la implementación de las notificaciones push queda para después.
4. Para un sistema así, son preguntas que el diseño deja abiertas.

#### `outro` · Para llevarte (~40 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: tres íconos que se apagan uno por uno: un sensor, un servidor, una nube.

1. Repasemos. El Analyzer toma cada lectura, le agrega su paciente, y la pasa por un motor de reglas configurable.
2. Las reglas que combinan signos necesitan memoria: una caché distribuida, que sobrevive si el Analyzer se cae.
3. La alerta sale por dos caminos, el teléfono y la estación, para que un corte no la silencie.
4. Y queda un hueco: nadie confirma que la vio. · *pausa 1 s*
5. Lo que sigue: ¿qué pasa cuando algo se rompe? Un sensor, un servidor, internet. Ahí vuelve la disponibilidad.
6. Eso, en el capítulo 7. · *say:* «Eso, en el capítulo siete.»


---

## Capítulo 7 · Cuando algo falla

`video/ch7/narration.json` · 8 escenas, 43 líneas, 658 palabras de subtítulo (660 habladas). A 2,2 palabras por segundo: 5:00 de voz más 14,8 s de pausas escritas = **5:15**.

### Plan

**Ideas esenciales**

1. Una fitness function es una prueba objetiva de una característica de arquitectura; dos de las tres del equipo prueban la disponibilidad que no votó.
2. Tres fallas recorridas pieza por pieza: un sensor, una pieza de software, internet.
3. La disponibilidad llega por la infraestructura: Kubernetes on-premises, servidores separados, todo duplicado.
4. Probado en papel, no medido; y falta el recorrido de la falla de la plataforma de mensajería.

**Anclas en el repositorio**

- README, tabla «Fitness functions» (`50d5558`, `d151a59`, 22-02)
- `FitnessFunctions/Failover.md`, `FitnessFunctions/Alerts.md`
- `Deployment/Deployment.md`, `kubernetes.jpg` (`1b5b53c`, `d258ebb`, 21-02)
- ADR-018 (duplicación automática), ADR-020 (todo duplicado, 30 s)

**Al terminar, el espectador puede**

- Definir fitness function y distinguir una prueba medida de un recorrido en papel.
- Recorrer un escenario de falla pieza por pieza.
- Explicar en una frase qué hace Kubernetes y por qué se reparten copias en servidores distintos.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- Pods, namespaces e ingress (vocabulario de Kubernetes que no cambia la idea).
- El número exacto de réplicas: el texto dice 3 y el diagrama 2 (HISTORIA, inconsistencia 9); el curso dice «duplicada».
- `kubernetes-on-premise.png` (es un esquema genérico de Kubernetes, no del equipo).

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (32 palabras, ~15 s) | Puente al ADR-010 | Puente al ADR-010 ~13 s | Sí | — | — | Sí | Bien |
| `fitness` (93 palabras, ~44 s) | Fitness function, con un ejemplo; Las tres del equipo (dos de disponibilidad) | Fitness function, con un ejemplo ~34 s; Las tres del equipo (dos de disponibilidad) ~10 s | Sí: viene de la promesa del ADR | Sí | Sí: que nadie la rompa sin enterarse | Sí | Bien |
| `sensor` (102 palabras, ~48 s) | Aislamiento: el resto sigue; El silencio como riesgo y la regla de dato viejo | Aislamiento: el resto sigue ~24 s; El silencio como riesgo y la regla de dato viejo ~25 s | Sí | — | Sí | Sí | Bien |
| `instancia` (120 palabras, ~57 s) | Kubernetes; Duplicar y reemplazar (ADR-018 y 020); Cierre del ADR-010 | Kubernetes ~22 s; Duplicar y reemplazar (ADR-018 y 020) ~25 s; Cierre del ADR-010 ~9 s | Sí: la copia que se cae | Sí: Kubernetes en una frase | Sí | Sí | Bien |
| `piensalo` (75 palabras, ~38 s) | Repartir copias (piénsalo); La regla | Repartir copias (piénsalo) ~31 s; La regla ~7 s | Sí | — | Sí | Sí | Bien |
| `internet` (55 palabras, ~26 s) | Dos caminos ante un corte (andamiaje al cap. 6); La promesa del 100 % | Dos caminos ante un corte (andamiaje al cap. 6) ~19 s; La promesa del 100 % ~7 s | Sí | — | Sí | Sí | Bien |
| `honestidad` (109 palabras, ~52 s) | Recorrido vs medición; La falla que falta; La regla | Recorrido vs medición ~31 s; La falla que falta ~13 s; La regla ~8 s | Sí: las tres pruebas vistas antes | — | Sí | Sí | Bien |
| `outro` (74 palabras, ~35 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~22 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Qué es una fitness function? → fitness, líneas 1 a 3.
- Si un sensor se calla, ¿quién se entera? → sensor, líneas 4 a 6.
- ¿Qué es Kubernetes? → instancia, línea 2.
- ¿Qué pasa en esos 30 segundos? → instancia, líneas 4 y 5 (la otra copia sigue atendiendo).
- ¿El «cerca del 100 %» está medido? → honestidad, líneas 2 y 3.

### Guion

#### `intro` · Capítulo 7 (~15 s)

> **Visual:** La ficha del ADR-010 con su título y la frase «ensured at the infrastructure level» resaltada. Título.

1. ¿Recuerdas el ADR 010? La disponibilidad no votó, pero el equipo prometió resolverla en la infraestructura. · *say:* «¿Recuerdas el A-D-R cero diez? La disponibilidad no votó, pero el equipo prometió resolverla en la infraestructura.»
2. Hoy vemos si cumplió, y con qué herramienta lo comprobó. · *pausa 0,8 s*
3. Capítulo 7: cuando algo falla. · *say:* «Capítulo siete: cuando algo falla.»

#### `fitness` · Funciones de aptitud (~44 s)

> **Visual:** Una balanza o un medidor con una aguja sobre una característica. Luego la tabla de fitness functions del README redibujada (tres filas: Infrastructure validation / Performance; Guarantee to receive alert / Availability; Fail-over / Availability, Fault Tolerance). Las dos filas con «Availability» se iluminan junto a la tarjeta «Disponibilidad» que quedó fuera en el cap. 3.

1. La herramienta se llama fitness function, función de aptitud.
2. Es una prueba objetiva de que la arquitectura cumple una característica. Como un test, pero para la arquitectura entera.
3. Lo ideal es que sea automática, y que corra una y otra vez, para que nadie rompa la característica sin enterarse.
4. Por ejemplo, una prueba que cada noche mida cuánto tarda una lectura en llegar a la pantalla, y que falle si pasa del segundo. · *pausa 1 s*
5. El equipo escribió tres. Una prueba el rendimiento.
6. Las otras dos prueban la disponibilidad. Justo la que había quedado afuera. · *pausa 1 s*

#### `sensor` · Falla un sensor (~48 s)

> **Visual:** Las ocho fuentes del paciente; el sensor de pulso se apaga. Recorder y Streamer quedan sin puntos de ese signo; los otros siete siguen. En el Analyzer, la tabla de la caché muestra «pulso: 72 · hace 1 h» en ámbar, y una regla «si la última lectura es vieja → alerta» se enciende. Fuente: `FitnessFunctions/Failover.md`.

1. Primera falla: se apaga el sensor de pulso de un paciente.
2. Recorder no recibe nada, así que no guarda ni publica. El Streamer tampoco recibe, así que no muestra.
3. No se cae ninguna pieza. Y los otros siete signos siguen su camino, porque cada lectura viaja como un mensaje aparte. · *pausa 1 s*
4. El riesgo está en el Analyzer: el silencio de un sensor no dispara ninguna regla.
5. La caché ayuda: guarda la última lectura con su hora. Una regla puede decir: si el último pulso es demasiado viejo, alerta.
6. El equipo lo escribe con honestidad: el resultado depende de cómo se configuren las reglas. · *pausa 1 s*

#### `instancia` · Se cae una pieza (~57 s)

> **Visual:** Redibujar `Deployment/images/kubernetes.jpg` simplificado: el clúster con los servicios (Analyzer, Recorder, Streamer, Alert, Patient & Sensor) y cada uno con dos copias. Debajo, tres servidores físicos. Una copia del Analyzer se apaga; la otra sigue; aparece una nueva con un cronómetro «≤ 30 s (supuesto)». Fichas ADR-018 y ADR-020.

1. Segunda falla: se cae una pieza de software, por ejemplo una copia del Analyzer.
2. Aquí entra Kubernetes: un sistema que reparte aplicaciones entre varios servidores, y reemplaza solo las copias que mueren.
3. El equipo lo puso dentro del hospital, sobre tres servidores independientes, o al menos dos. · *pausa 1 s*
4. Cada pieza corre duplicada. Si una copia muere, la otra sigue atendiendo, y Kubernetes levanta una nueva.
5. Cuántas copias, el repositorio no lo deja claro: el texto pide al menos tres, y el diagrama dibuja dos. Lo seguro es que nunca hay una sola.
6. Asumieron que una copia nueva tarda, como máximo, 30 segundos en arrancar. · *say:* «Asumieron que una copia nueva tarda, como máximo, treinta segundos en arrancar.»
7. Es la tercera razón del ADR 010, cumplida: la disponibilidad se resolvió duplicando, debajo del diseño. · *say:* «Es la tercera razón del A-D-R cero diez, cumplida: la disponibilidad se resolvió duplicando, debajo del diseño.» · *pausa 1 s*

#### `piensalo` · Piénsalo tú (~38 s)

> **Visual:** Los tres servidores con las copias repartidas. Uno se apaga de golpe con todo lo suyo. Anillo de 3 s. Al responder, las copias en los otros dos servidores siguen encendidas, y la frase original de `Alerts.md`: «Kubernetes agents are installed on separate hardware».

1. Ahora tú. Uno de los tres servidores se apaga de golpe, con todo lo que tenía adentro.
2. ¿Se pierden las alertas? · *pausa 3 s*
3. No deberían. Las copias de cada pieza están repartidas en servidores distintos, así que las de los otros siguen.
4. El equipo lo escribió así: todo duplicado, en hardware separado, para que no haya un único punto de falla. · *pausa 1 s*
5. La regla: una copia en el mismo servidor no protege de que se caiga ese servidor.

#### `internet` · Se corta internet (~26 s)

> **Visual:** La nube «internet» se corta. El teléfono queda en gris; la pantalla de la estación sigue recibiendo alertas por la red local. Fuente: `FitnessFunctions/Alerts.md`. Al final, la frase original «near 100% uptime guarantee» entre comillas.

1. Tercera falla: se corta internet en el hospital.
2. Las notificaciones al teléfono dejan de llegar. Pero la estación sigue avisando por la red local.
3. Es la segunda fitness function del equipo: garantizar que la alerta llegue, por dos caminos. · *pausa 1 s*
4. Ahí escribieron que, con todo duplicado, el sistema garantiza un funcionamiento cercano al 100 por ciento. · *say:* «Ahí escribieron que, con todo duplicado, el sistema garantiza un funcionamiento cercano al cien por ciento.»

#### `honestidad` · Lo que vale una prueba (~52 s)

> **Visual:** Las tres filas de la tabla con «Success» en verde. Un sello aparece encima: «razonado, no medido». Luego un ícono de engranaje que se repite (prueba automática) como contraste. Al final, el C2 con la plataforma de mensajería en el centro y un signo de pregunta: ¿y si falla ella?

1. Ahora, con honestidad. En un kata no hay un sistema real que apagar.
2. Estas fitness functions son recorridos escritos, razonados en papel. El resultado dice «éxito», pero es un razonamiento, no una medición.
3. Y el «cercano al 100 por ciento» es una promesa sin un número que la respalde. · *say:* «Y el «cercano al cien por ciento» es una promesa sin un número que la respalde.» · *pausa 1 s*
4. Aun así, sirven: obligan a recorrer cada falla pieza por pieza, y dejan escrito qué se espera.
5. Falta un recorrido importante: ¿qué pasa si falla la plataforma de mensajería, por donde pasa todo? En el diagrama tiene copias, pero nadie escribió esa falla. · *pausa 1 s*
6. La regla: una fitness function vale lo que vale su medición. En un sistema real, se automatiza.

#### `outro` · Para llevarte (~35 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: un cronómetro con «1 s» y una calculadora.

1. Repasemos. Una fitness function es una prueba objetiva de una característica de arquitectura.
2. El equipo escribió tres, y dos prueban la disponibilidad que no votó.
3. La disponibilidad llegó por la infraestructura: Kubernetes, servidores separados, todo duplicado, y dos caminos para avisar.
4. Probado en papel, no medido. · *pausa 1 s*
5. Lo que sigue: la tercera fitness function, la del segundo de respuesta. Con números, y con un error que vale la pena entender.
6. Eso, en el capítulo 8. · *say:* «Eso, en el capítulo ocho.»


---

## Capítulo 8 · Las cuentas

`video/ch8/narration.json` · 9 escenas, 47 líneas, 669 palabras de subtítulo (694 habladas). A 2,2 palabras por segundo: 5:15 de voz más 17,6 s de pausas escritas = **5:33**.

### Plan

**Ideas esenciales**

1. Cuántas lecturas: 4,2 por segundo por paciente, unas 2100 por hospital, 4000 en el pico supuesto.
2. Un presupuesto de latencia reparte el segundo entre los pasos del camino; el del equipo da 693 ms.
3. Capacidad (throughput) y latencia son medidas distintas; la tabla sumó capacidad como latencia y un paso que no está en el camino.
4. La tabla exagera hacia el lado seguro; después del jurado la explicaron mejor, sin cambiar los números.

**Anclas en el repositorio**

- `FitnessFunctions/Sizing.md`: primera versión con «TODO» (`0030ea8`, 22-02 09:06), completa (`50d5558`, 10:15), reescrita (`b4395e4`, 04-03)
- `UseCases/US1-monitor.md` y `alerting_sequence.jpg` (Recorder guarda y publica en paralelo)
- `FitnessFunctions/images/kafka-benchmark.png`

**Al terminar, el espectador puede**

- Calcular el volumen de lecturas a partir de los ritmos del pliego.
- Armar un presupuesto de latencia con los pasos del camino crítico.
- Distinguir capacidad de latencia y detectar cuándo una cuenta las mezcla.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- Las discrepancias menores de la tabla (Kafka 4 ms en el texto y 5 en la tabla; 16,8 ms escrito como 16; «20 connections» por «20 patients»): quedan en HISTORIA.
- El detalle de los benchmarks de InfluxDB y de Kafka.
- El reparto de 3 Recorders entre 25 estaciones (simplificación del equipo).

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (46 palabras, ~22 s) | Puente y contexto temporal | Puente y contexto temporal ~20 s | Sí | — | — | Sí | Bien |
| `lecturas` (99 palabras, ~47 s) | Lecturas por paciente; Lecturas por hospital; Pico supuesto | Lecturas por paciente ~22 s; Lecturas por hospital ~6 s; Pico supuesto ~19 s | Sí: los ritmos del cap. 1 | — | Sí | Sí: la tabla queda toda la escena | Bien |
| `presupuesto` (107 palabras, ~52 s) | Latencia y presupuesto de latencia; Los pasos y el total | Latencia y presupuesto de latencia ~22 s; Los pasos y el total ~30 s | Sí: el segundo del pliego | Sí: latencia y presupuesto | Sí | Sí: la barra queda toda la escena | Bien |
| `trescientos` (56 palabras, ~26 s) | La cuenta del 320 | La cuenta del 320 ~26 s | Sí | — | Sí | Sí: la cuenta queda escrita | Bien |
| `medidas` (90 palabras, ~43 s) | Throughput; Latencia; La diferencia, con un ejemplo | Throughput ~5 s; Latencia ~6 s; La diferencia, con un ejemplo ~28 s | Sí: la caja antes de la regla | Sí | Sí | Sí | Bien |
| `piensalo` (66 palabras, ~34 s) | Aplicar la distinción (piénsalo); El error central | Aplicar la distinción (piénsalo) ~21 s; El error central ~13 s | Sí | Usa la escena anterior | Sí | Sí | Bien |
| `revision` (103 palabras, ~50 s) | La red: el mismo error; Un paso fuera del camino; Conclusión vs demostración; La regla | La red: el mismo error ~12 s; Un paso fuera del camino ~13 s; Conclusión vs demostración ~14 s; La regla ~11 s | Sí | — | Sí | Sí | Bien |
| `jurado` (46 palabras, ~22 s) | La reescritura del 4 de marzo | La reescritura del 4 de marzo ~22 s | Sí | — | Se amplía en el cap. 9 | Sí | Bien (secundaria) |
| `outro` (81 palabras, ~38 s) | Repaso de las cuatro ideas | Repaso de las cuatro ideas ~28 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿De dónde sale el 8 del pico? → lecturas, línea 7 (es un supuesto).
- ¿Qué es la latencia? → presupuesto, línea 2.
- ¿De dónde sale el 320? → trescientos, líneas 1 a 5.
- ¿Qué es throughput? → medidas, línea 2.
- Entonces, ¿cumple o no cumple el segundo? → revision, líneas 3 y 4.

### Guion

#### `intro` · Capítulo 8 (~22 s)

> **Visual:** El cronómetro «≤ 1 s promedio» del capítulo 1. Luego la primera versión de la tabla (`0030ea8`), con las filas Recorder y Streamer en «TODO», que se completan con un fundido a la versión de las 10:15. Título.

1. Falta comprobar la exigencia más medible del pliego: un segundo, en promedio, del sensor a la pantalla.
2. El equipo hizo las cuentas el último día, el 22 de febrero. Por la mañana, la tabla tenía casillas vacías. Una hora después, estaba completa. · *say:* «El equipo hizo las cuentas el último día, el veintidós de febrero. Por la mañana, la tabla tenía casillas vacías. Una hora después, estaba completa.» · *pausa 0,8 s*
3. Capítulo 8: las cuentas. · *say:* «Capítulo ocho: las cuentas.»

#### `lecturas` · Cuántas lecturas (~47 s)

> **Visual:** Redibujar la primera tabla de `Sizing.md` («Signals per second»): ocho filas que se llenan una por línea; las cuatro pequeñas se agrupan como «casi nada». Total 4,22. Luego un multiplicador ×500 → 2100/s; y la segunda tabla (AVERAGE / PEAK): 4,2 × 500 y 8 × 500, con 2,1 MB/s y 4 MB/s. El «8» lleva una etiqueta «supuesto».

1. Primero, cuántas lecturas manda un paciente por segundo.
2. El pulso, cada medio segundo: dos por segundo. La respiración y el electrocardiograma: una cada uno.
3. El oxígeno, cada cinco segundos: dos décimas. Los otros cuatro casi no suman.
4. Total: unas 4,2 lecturas por segundo, por paciente. · *say:* «Total: unas cuatro coma dos lecturas por segundo, por paciente.» · *pausa 1 s*
5. Por 500 pacientes, unas 2100 lecturas por segundo en un hospital. · *say:* «Por quinientos pacientes, unas dos mil cien lecturas por segundo en un hospital.»
6. Para tener margen, asumieron un pico de 8 por paciente: 4000 lecturas por segundo. A un kilobyte cada una, 4 megabytes por segundo. · *say:* «Para tener margen, asumieron un pico de ocho por paciente: cuatro mil lecturas por segundo. A un kilobyte cada una, cuatro megabytes por segundo.» · *pausa 1 s*
7. Ese 8 no sale de ninguna cuenta: es un supuesto, casi el doble del promedio. · *say:* «Ese ocho no sale de ninguna cuenta: es un supuesto, casi el doble del promedio.»

#### `presupuesto` · Un presupuesto de tiempo (~52 s)

> **Visual:** Una barra horizontal de 1000 ms que se va llenando con segmentos de colores, uno por línea: DB 16, plataforma 5, LAN 32, Recorder 320, Streamer 320. Total 693 ms y un sello «Success», como en la tabla final de `Sizing.md`.

1. Después, el método: un presupuesto de latencia.
2. La latencia es lo que tarda un dato en llegar. El presupuesto reparte el segundo entre los pasos del camino, como se reparte un sueldo entre los gastos del mes.
3. Si la suma da menos de un segundo, cumple. · *pausa 1 s*
4. Guardar en la base: 16 milisegundos, según una prueba de rendimiento publicada para InfluxDB. · *say:* «Guardar en la base: dieciséis milisegundos, según una prueba de rendimiento publicada para InfluxDB.»
5. Publicar en la plataforma de mensajería: 5 milisegundos, según una prueba de Kafka en un servidor mediano. · *say:* «Publicar en la plataforma de mensajería: cinco milisegundos, según una prueba de Kafka en un servidor mediano.»
6. Cruzar la red del hospital: 32 milisegundos. · *say:* «Cruzar la red del hospital: treinta y dos milisegundos.»
7. Y Recorder y Streamer: 320 milisegundos cada uno. · *say:* «Y Recorder y Streamer: trescientos veinte milisegundos cada uno.» · *pausa 1 s*
8. Total: 693 milisegundos. Menos de un segundo. Resultado: éxito. · *say:* «Total: seiscientos noventa y tres milisegundos. Menos de un segundo. Resultado: éxito.» · *pausa 1 s*

#### `trescientos` · De dónde sale el 320 (~26 s)

> **Visual:** Un esquema: 25 estaciones repartidas entre 3 copias del Streamer (≈ 8 conexiones cada una). Zoom a una conexión: 20 pacientes × 8 = 160 lecturas por segundo. Luego 160 × 2 ms = 320 ms, escrito como una cuenta.

1. Mira de dónde sale el 320. · *say:* «Mira de dónde sale el trescientos veinte.»
2. Supusieron tres copias del Streamer para 25 estaciones: unas ocho conexiones por copia. · *say:* «Supusieron tres copias del Streamer para veinticinco estaciones: unas ocho conexiones por copia.»
3. Cada conexión lleva 20 pacientes, a 8 lecturas por segundo: 160 lecturas por segundo. · *say:* «Cada conexión lleva veinte pacientes, a ocho lecturas por segundo: ciento sesenta lecturas por segundo.»
4. Si cada lectura tarda 2 milisegundos en procesarse, 160 por 2 da 320. · *say:* «Si cada lectura tarda dos milisegundos en procesarse, ciento sesenta por dos da trescientos veinte.» · *pausa 1 s*
5. Para el Recorder, asumieron lo mismo.

#### `medidas` · Dos medidas distintas (~43 s)

> **Visual:** Una caja de supermercado: una barra de una hora en la que se marcan 20 atenciones de 2 minutos (40 minutos ocupada). Un cliente con un reloj propio que marca solo sus 2 minutos. Dos etiquetas: «capacidad (throughput)» sobre la barra de la caja, «latencia» sobre el reloj del cliente.

1. Antes de juzgar esa cuenta, dos palabras.
2. Capacidad, o throughput: cuánto trabajo hace el sistema por unidad de tiempo.
3. Latencia: cuánto espera un dato desde que entra hasta que sale. · *pausa 0,8 s*
4. Piensa en una caja de supermercado que atiende a cada cliente en dos minutos. Si en una hora pasan veinte clientes, la caja está ocupada cuarenta minutos de esa hora.
5. Pero ningún cliente espera cuarenta minutos. Espera sus dos, más la fila, si la hay. · *pausa 1 s*
6. Lo ocupada que está la caja es capacidad. Lo que espera un cliente es latencia.

#### `piensalo` · Piénsalo tú (~34 s)

> **Visual:** La fila del Streamer de la tabla («Vital Sign Streamer · 320ms») resaltada, con la cuenta 160 × 2 ms al lado. Anillo de 3 s. Al responder, el 320 se mueve a la etiqueta «capacidad», y un reloj chico «≈ 2 ms» queda en «latencia».

1. Ahora tú. Mira otra vez la fila del Streamer: 160 lecturas por segundo, a 2 milisegundos cada una, da 320. · *say:* «Ahora tú. Mira otra vez la fila del Streamer: ciento sesenta lecturas por segundo, a dos milisegundos cada una, da trescientos veinte.»
2. Esos 320 milisegundos, ¿son lo que espera una lectura, o lo ocupada que está la conexión? · *say:* «Esos trescientos veinte milisegundos, ¿son lo que espera una lectura, o lo ocupada que está la conexión?» · *pausa 3 s*
3. Son lo ocupada que está: capacidad. Una lectura sola tarda sus 2 milisegundos, más la fila, si la hay. · *say:* «Son lo ocupada que está: capacidad. Una lectura sola tarda sus dos milisegundos, más la fila, si la hay.»
4. La tabla sumó capacidad como si fuera latencia. · *pausa 1 s*

#### `revision` · La cuenta, revisada (~50 s)

> **Visual:** La barra de 1000 ms de la escena «presupuesto». El segmento LAN se etiqueta «todo el tráfico de 1 s». El segmento DB se separa de la barra y se pone en paralelo, citando la secuencia de `alerting_sequence.jpg` (hilo 1 y hilo 2). Los segmentos de 320 se encogen a una marca fina. Al final, la regla en una tarjeta grande.

1. Pasa lo mismo con la red: 32 milisegundos es lo que tarda en cruzar todo el tráfico de un segundo del hospital, no una lectura. · *say:* «Pasa lo mismo con la red: treinta y dos milisegundos es lo que tarda en cruzar todo el tráfico de un segundo del hospital, no una lectura.»
2. Y hay otro detalle, en sus propios diagramas: Recorder guarda y publica a la vez. Guardar en la base no está en el camino hacia la pantalla. · *pausa 1 s*
3. O sea, la tabla exagera. La conclusión, menos de un segundo, probablemente se sostiene, y con más margen.
4. Pero la cuenta, tal como está escrita, no lo demuestra. · *pausa 1 s*
5. La regla: en un presupuesto de latencia, suma solo lo que espera una lectura, y solo los pasos de su camino. · *pausa 1 s*

#### `jurado` · Después de la entrega (~22 s)

> **Visual:** Lado a lado, la sección del Streamer de `Sizing.md` antes y después de `b4395e4`: se resaltan las frases agregadas («25 nurse stations / 3 services», «the final decision… will be taken later»). Los números de la tabla, iguales en las dos.

1. Después de la entrega, con la devolución del jurado, el equipo volvió a esta página.
2. El 4 de marzo la reescribieron para que fuera más transparente: de dónde salen las 25 estaciones, y que InfluxDB y Kafka eran solo ejemplos para estimar. · *say:* «El cuatro de marzo la reescribieron para que fuera más transparente: de dónde salen las veinticinco estaciones, y que InfluxDB y Kafka eran solo ejemplos para estimar.»
3. Los números no cambiaron. · *pausa 1 s*

#### `outro` · Para llevarte (~38 s)

> **Visual:** Cuatro tarjetas de repaso. Avance: un calendario con once días en blanco entre el 22 de febrero y el 4 de marzo.

1. Repasemos. Un paciente manda unas 4,2 lecturas por segundo. Un hospital, unas 2100. · *say:* «Repasemos. Un paciente manda unas cuatro coma dos lecturas por segundo. Un hospital, unas dos mil cien.»
2. Un presupuesto de latencia reparte el segundo entre los pasos del camino.
3. Capacidad y latencia son medidas distintas. Sumar una como si fuera la otra infla la cuenta.
4. La tabla del equipo dio 693 milisegundos: exagerada, pero del lado seguro. · *say:* «La tabla del equipo dio seiscientos noventa y tres milisegundos: exagerada, pero del lado seguro.» · *pausa 1 s*
5. Lo que sigue: once días de silencio, y lo que cambió después del jurado.
6. Eso, en el capítulo 9, el último. · *say:* «Eso, en el capítulo nueve, el último.»


---

## Capítulo 9 · Después del jurado

`video/ch9/narration.json` · 8 escenas, 44 líneas, 658 palabras de subtítulo (658 habladas). A 2,2 palabras por segundo: 4:59 de voz más 15 s de pausas escritas = **5:14**.

### Plan

**Ideas esenciales**

1. Nombrar la capacidad, no el producto: Kafka pasa a ser «plataforma de mensajería» por el feedback del jurado.
2. Trazabilidad: cada ADR enlazado al documento donde nació; los ADRs pueden escribirse después, si llevan a su porqué.
3. Después del jurado no cambió ninguna decisión; lo pendiente quedó escrito.
4. El método completo, en el orden real, y tres huecos que enseñan.

**Anclas en el repositorio**

- `b4395e4` (04-03, «based on jury feedback»); PR `#2` `kafka_agnostic_language` (`e742cc7`, `e573548`, 05-03)
- Enlaces «context link out» en los ADR (`ca62e6e` … `ad5ad44`, 05-03; `462e53a` … `0b65dc9`, 07-03)
- Horas de creación de ADR-005 a ADR-020 (21-02, 16:07 a 18:57)
- README, «Postponed decisions or well-known issues»
- `git diff 232e705 HEAD`: ninguna decisión cambia

**Al terminar, el espectador puede**

- Explicar por qué una arquitectura nombra capacidades y no productos.
- Usar ADRs como rastro hacia el razonamiento, aunque se escriban después.
- Repetir el método del equipo, en orden, sobre otro caso.

**Qué se corta (lo cubre el curso escrito o HISTORIA.md)**

- El detalle de los diagramas redibujados (calidad de imagen, colores).
- Team Topologies y el mapa de contextos (pulido del 22-02; HISTORIA, sección 3).
- La VPN hacia MyMedicalData y la integración con MonitorThem (se nombran como «pendientes» sin detalle).

### Auditoría

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| `intro` (49 palabras, ~23 s) | El silencio y la devolución | El silencio y la devolución ~21 s | Sí | — | — | Sí | Bien |
| `producto` (73 palabras, ~34 s) | Del producto a la capacidad (el hecho); Lo que no sabemos | Del producto a la capacidad (el hecho) ~25 s; Lo que no sabemos ~10 s | Sí: el cambio antes de la regla | Reusa la definición del cap. 5 | Se pregunta en la escena siguiente | Sí | Bien |
| `piensalo` (107 palabras, ~54 s) | Por qué nombrar la capacidad (piénsalo); La regla; El rastro que quedó | Por qué nombrar la capacidad (piénsalo) ~33 s; La regla ~9 s; El rastro que quedó ~12 s | Sí | — | Sí, con hechos del pliego | Sí | Bien |
| `rastro` (146 palabras, ~68 s) | Trazabilidad ADR → origen; ADRs escritos después | Trazabilidad ADR → origen ~28 s; ADRs escritos después ~40 s | Sí | Reusa ADR del cap. 2 | Sí | Sí | Bien |
| `nocambio` (72 palabras, ~35 s) | Nada de fondo cambió; Lo pendiente, por escrito | Nada de fondo cambió ~20 s; Lo pendiente, por escrito ~15 s | Sí | — | Sí | Sí | Bien |
| `metodo` (85 palabras, ~40 s) | El método en orden | El método en orden ~40 s | — | — | — | Sí: una tarjeta por línea; la línea de tiempo queda ~10 s al final | Bien (repaso del curso) |
| `huecos` (70 palabras, ~34 s) | Los tres huecos; Razonamiento a la vista | Los tres huecos ~22 s; Razonamiento a la vista ~11 s | — | — | Sí | Sí | Bien |
| `outro` (56 palabras, ~26 s) | Repaso del capítulo y cierre del curso | Repaso del capítulo y cierre del curso ~23 s | — | — | — | Sí | Bien |

**Preguntas del espectador tipo, y dónde se responden**

- ¿Qué dijo el jurado? → intro, línea 3 (solo se sabe lo que el commit dice y lo que cambiaron).
- ¿Por qué no decir Kafka si es lo que van a usar? → piensalo, líneas 3 a 5.
- ¿Escribir un ADR después no es trampa? → rastro, líneas 4 a 6.
- ¿Cambió el diseño? → nocambio, líneas 2 y 3.

### Guion

#### `intro` · Capítulo 9 (~23 s)

> **Visual:** Un calendario de febrero y marzo de 2024 con un punto por commit. Una racha densa hasta el 22 de febrero, once días vacíos, y un punto el 4 de marzo con el mensaje del commit en inglés: «(based on jury feedback)». Título.

1. El 22 de febrero por la tarde, el equipo hizo su último commit antes de la entrega. · *say:* «El veintidós de febrero por la tarde, el equipo hizo su último commit antes de la entrega.»
2. Después, once días sin un solo cambio.
3. El 4 de marzo, el repositorio vuelve a moverse. El mensaje del commit dice: basado en el feedback del jurado. · *say:* «El cuatro de marzo, el repositorio vuelve a moverse. El mensaje del commit dice: basado en el feedback del jurado.» · *pausa 1 s*
4. Capítulo 9: después del jurado. · *say:* «Capítulo nueve: después del jurado.»

#### `producto` · El nombre del producto (~34 s)

> **Visual:** Un diagrama C2 en dos versiones (`05adfda:resources/images/c2.png` o el de `6b530cb`, y el final `c2.jpg`): las etiquetas «[Kafka]» se transforman en «[Message Streaming Platform]». La rama `kafka_agnostic_language` como etiqueta. Luego, en `Sizing.md`, la frase «the final decision will be taken later».

1. El cambio más visible: la palabra Kafka desapareció de los diagramas.
2. En su lugar dice «Message Streaming Platform»: plataforma de mensajería.
3. Hicieron una rama solo para ese cambio, y redibujaron los diagramas de arquitectura.
4. Y en las cuentas aclararon que Kafka e InfluxDB eran ejemplos para estimar. La elección final, más adelante. · *pausa 1 s*
5. No sabemos qué dijo el jurado, palabra por palabra. Sabemos lo que el equipo cambió, y el mensaje que lo explica.

#### `piensalo` · Piénsalo tú (~54 s)

> **Visual:** Dos tarjetas del capítulo 1: «StayHealthy pone el hardware» y «herramientas sin especificar». Anillo de 3 s. Al responder, la caja de la plataforma muestra tres capacidades (temas, mensajes guardados, varios lectores) y varios logos genéricos de productos que encajan. Al final, la ficha del ADR-015 con su título viejo, «Choosing Kafka as Event Broker», y una mancha de tinta.

1. Ahora tú. ¿Recuerdas, del capítulo 1, quién pone el hardware, y qué decía el pliego de las herramientas? · *say:* «Ahora tú. ¿Recuerdas, del capítulo uno, quién pone el hardware, y qué decía el pliego de las herramientas?»
2. Con eso, ¿qué gana el diseño al cambiar «Kafka» por «plataforma de mensajería»? · *pausa 3 s*
3. Gana libertad. StayHealthy pone el hardware, y el pliego deja las herramientas sin especificar.
4. El diseño necesita una capacidad: temas, mensajes guardados un tiempo, varios lectores. Cualquier producto que la dé, sirve. · *pausa 1 s*
5. La regla: en la arquitectura, nombra la capacidad que necesitas. El producto se elige después, cuando se conocen las condiciones.
6. Quedó un rastro: el ADR todavía se titula «Kafka como broker de eventos». Cambiar una idea es más rápido que cambiar todos sus papeles. · *pausa 1 s*

#### `rastro` · Cada decisión, con su origen (~68 s)

> **Visual:** Una ficha de ADR con la línea nueva «context link out» y una flecha que salta al documento de origen (ADR-003 → la papelera del event storming; ADR-010 → `Characteristics.md`). Luego una línea de tiempo del 21 de febrero de 16:00 a 19:00 con dieciséis marcas (ADR-005 a 020) y, más atrás, el dibujo del 17 con la plataforma.

1. El segundo cambio es menos vistoso. A cada ADR, menos al primero, le agregaron un enlace al documento donde nació la decisión.
2. El de la base de series de tiempo apunta a la papelera de la tormenta de eventos. El de la disponibilidad, a la página de características.
3. Así, quien lee una decisión puede volver al razonamiento que la produjo. · *pausa 1 s*
4. El historial muestra por qué hacía falta: dieciséis de los veinte ADRs se escribieron en una sola tarde, la del 21 de febrero. · *say:* «El historial muestra por qué hacía falta: dieciséis de los veinte ADRs se escribieron en una sola tarde, la del veintiuno de febrero.»
5. Registraban decisiones tomadas días antes. La plataforma de mensajes, por ejemplo, ya estaba en el dibujo del 17. · *say:* «Registraban decisiones tomadas días antes. La plataforma de mensajes, por ejemplo, ya estaba en el dibujo del diecisiete.»
6. Y el 20 de febrero, el texto del Analyzer ya decía que la caché se había decidido en un ADR sin número: tres numerales, para completar después. · *say:* «Y el veinte de febrero, el texto del Analyzer ya decía que la caché se había decidido en un ADR sin número: tres numerales, para completar después.»
7. Escribir el ADR después no es trampa. Lo que importa es que lleve de vuelta a su porqué. · *pausa 1 s*

#### `nocambio` · Lo que no cambió (~35 s)

> **Visual:** Una lista de cambios posteriores al jurado (nombres, cuentas, enlaces, diagramas) con tildes, y al lado una lista de decisiones (estilo, piezas, top 3, disponibilidad afuera) con un candado. Luego la tabla «Postponed decisions or well-known issues» del README redibujada, con cuatro filas destacadas.

1. Lo que no cambió dice tanto como lo que cambió.
2. Después del jurado no se movió ninguna decisión. Ni el estilo, ni las piezas, ni la disponibilidad afuera del top 3. · *say:* «Después del jurado no se movió ninguna decisión. Ni el estilo, ni las piezas, ni la disponibilidad afuera del top tres.»
3. Pulieron nombres, cuentas, enlaces y diagramas. El diseño ya estaba. · *pausa 1 s*
4. Y en su página principal dejaron una lista de lo que no resolvieron: la autenticación, las notificaciones push, el hardware, el registro de pacientes.
5. Decir qué queda pendiente también es diseñar. · *pausa 1 s*

#### `metodo` · El método (~40 s)

> **Visual:** Una línea de tiempo horizontal con las fechas reales y una tarjeta por paso, que se encienden una por línea: 15–16 feb pliego y flujos; 16–17 feb tormenta de eventos; 17–19 feb características; 19 feb estilo; 20–21 feb diseño; 21–22 feb fallas; 22 feb cuentas; 4–7 mar jurado. Cada tarjeta lleva el número de capítulo.

1. Miremos el camino completo, en el orden en que lo recorrió el equipo.
2. Leer el pliego, y resumirlo en cuatro flujos de datos.
3. Una tormenta de eventos, para encontrar las piezas desde el negocio y no desde la tecnología.
4. Elegir pocas características, descartar otras con razones, y pegarlas sobre cada pieza.
5. Elegir el estilo con una planilla, y seguir una lectura por el diseño.
6. Recorrer cada falla, hacer las cuentas, y escuchar al jurado.
7. Y en cada paso, dejar la decisión escrita en un ADR. · *pausa 1 s*

#### `huecos` · Lo que enseñan sus huecos (~34 s)

> **Visual:** Tres tarjetas con borde ámbar: «disponibilidad: razón débil, resuelta en la infraestructura» (cap. 4 y 7), «latencia: capacidad sumada como espera» (cap. 8) y «alerta sin confirmación» (cap. 6). Al final, el repositorio abierto como un libro.

1. Y tres huecos que enseñan tanto como los aciertos.
2. La disponibilidad quedó afuera por una razón débil, y volvió por la infraestructura.
3. El presupuesto de latencia sumó capacidad como si fuera latencia, y exageró la cuenta.
4. Y la alerta no tiene quién confirme que alguien la vio. · *pausa 1 s*
5. Un diseño ganador no es un diseño sin errores. Este dejó cada razonamiento a la vista, y por eso hoy lo puedes revisar. · *pausa 1 s*

#### `outro` · Para llevarte (~26 s)

> **Visual:** Tres tarjetas de repaso. Cierre con el banner de MonitorMe, el nombre del equipo y la URL del repositorio en TheKataLog.

1. Repasemos. Después del jurado, el equipo cambió el nombre de un producto por el de una capacidad.
2. Ató cada ADR a su origen, y dejó por escrito lo pendiente.
3. Ninguna decisión de fondo cambió. · *pausa 1 s*
4. Ahora te toca a ti: elige un kata, y recorre este camino, paso a paso.
5. Gracias por acompañar a BluzBrothers hasta aquí.

