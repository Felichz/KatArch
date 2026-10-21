# Bloque 6 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`): con la voz cambian los segundos, no las anclas.

**La idea del bloque en una imagen:** la región "guardar datos" encendida con cuatro tarjetas (gana en verde, paga en ámbar), y debajo la base compartida de ClearView con una sola flecha de escritura y un candado por objeto.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **La cinta de lecturas con su ventana** (puntos con hora que entran por la derecha; una ventana de 24 h; lo que sale por la izquierda se borra) | Datos con hora que se consultan por rango y se borran por edad | Escena 1 |
| **El tramo del mapa** (`region()`: diez regiones arriba, la del bloque en naranja; cuatro tarjetas debajo) | Las familias de esta región, cada una con lo que gana y lo que paga; vuelve igual en cada bloque del acto 2 | Escenas 2 y 7 |
| **Una necesidad, un almacén** (necesidades a la izquierda, almacenes a la derecha, unidos por flechas) | Elegir el almacén por la forma del dato y la consulta | Escenas 3 y 4 |
| **Copias que no coinciden contra un dueño** (cuatro servicios con su copia, contra uno en el centro al que todos preguntan) | Quién puede cambiar el dato: un dueño | Escena 5 |
| **Escrituras cruzadas contra un solo escritor** (flechas de todos a todos, contra una flecha por objeto con su candado) | Quién puede cambiar el dato: una regla impuesta con permisos | Escena 6 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que se gana y las lecturas; ámbar lo que se paga; rojo solo el conflicto o la falla.

## 0 · Estás aquí

`T.aqui(6)`: el mapa del curso con el acto 1 relleno y la región 6 en naranja; "Bloque 6", "Guardar datos".

## 1 · Lecturas con hora (#gancho)

**Entiende:** MonitorMe recibe muchas lecturas con hora, guarda 24 horas y las consulta por rango; eligió una base de series de tiempo que borra sola lo viejo.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «MonitorMe… cuatro mil señales por segundo.» (7,3 s) | Sello de MonitorMe. "4.000 señales / s" en 96 px arriba; una cinta horizontal a lo ancho (y 560) donde entran puntos verdes desde la derecha. |
| «Cada señal es un número con su hora…» (7,5 s) | **«con su hora»**: tres puntos de la cinta llevan rótulo: "pulso · 10:02:01", "oxígeno · 10:02:03", "pulso · 10:02:04". |
| «El pedido dice que hay que guardar las últimas veinticuatro horas de cada signo vital.» (6,0 s) | **«veinticuatro horas»**: sobre la cinta, un marco naranja "24 h" que cubre la parte derecha. |
| «Y el personal tiene que poder revisarlas por rango de tiempo y por signo.» (6,0 s) | **«rango»**: dentro del marco, un tramo se encierra en verde con "de 10:00 a 10:05 · pulso". |
| «Para eso el equipo eligió… una base de series de tiempo.» (7,9 s) | Debajo de la cinta, un cilindro con un reloj chico y "series de tiempo" a mano. |
| «Escribe mucho y rápido, consulta por rangos de tiempo y borra sola lo que pasa de cierta edad.» (7,2 s) | **«escribe»**: flechas de la cinta al cilindro; **«borra sola»**: los puntos que quedan a la izquierda del marco se apagan y caen. |
| «MonitorMe la configuró para borrar todo lo que tenga más de veinticuatro horas.» (5,9 s) | "más de 24 h → se borra" a mano en ámbar a la izquierda. |

## 2 · Cuatro familias (#familias)

**Entiende:** dónde se guarda depende de la forma y la consulta; cuatro familias, cada una con lo que gana y lo que paga.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Dónde se guarda un dato depende de dos cosas…» (7,0 s) | Barrido. Al centro, dos rótulos grandes: "qué forma tiene" y "cómo se consulta". |
| «No hay una base de datos para todo.» (2,7 s) | Un cilindro único con "para todo" tachado. |
| «Hay familias, y cada una gana en algo y paga en otra cosa.» (4,5 s) | Todo se borra. Arriba, las diez regiones del acto 2; **«familias»**: "guardar datos" en naranja. |
| «La más conocida es la relacional, la de tablas.» (3,6 s) | Tarjeta 1, "relacional". |
| «Sirve para datos con estructura fija… juntos o ninguno.» (9,9 s) | **«estructura»**: su "gana" en verde. |
| «Paga cuando los datos están muy conectados…» (8,7 s) | Su "paga" en ámbar. |
| «La de series de tiempo… se consultan por rangos.» (8,7 s) | Tarjeta 2, "series de tiempo", con su "gana"; un aro naranja: la de MonitorMe. |
| «Paga con que sirve casi solo para eso.» (2,9 s) | Su "paga". |
| «La de grafos… con datos muy conectados.» (9,9 s) | Tarjeta 3, "grafo", con su "gana". |
| «Paga con que es otra tecnología…» (4,9 s) | Su "paga". |
| «Y el almacenamiento de archivos guarda objetos grandes…» (8,6 s) | Tarjeta 4, "archivos", con su "gana". |
| «A cambio, lo que hay dentro de un archivo no se puede consultar.» (4,9 s) | Su "paga". |

## 3 · Un almacén por necesidad (#family)

**Entiende:** Farmacy Family tiene tres necesidades y elige un almacén para cada una (persistencia políglota), pagando con más tecnologías.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Farmacy Family… tres necesidades distintas.» (6,2 s) | Barrido. Sello de Farmacy Family. A la izquierda, tres lugares para las necesidades. |
| «Datos generales, como los perfiles y las inscripciones a eventos.» (4,9 s) | Necesidad 1: "datos generales" con dos fichas. |
| «Datos para analítica, como los resultados médicos.» (3,8 s) | Necesidad 2: "analítica" con una red de puntos. |
| «Y contenido grande, como los videos.» (2,8 s) | Necesidad 3: "contenido grande" con un cuadro de video. |
| «En vez de meter todo en un solo tipo de base… persistencia políglota.» (8,6 s) | A la derecha, un cilindro grande con las tres flechas entrando, que se tacha; **«uno por necesidad»**: en su lugar, tres almacenes, uno por fila; **«persistencia políglota»**: el nombre a mano arriba. |
| «Para la analítica, un grafo…» (5,2 s) | El almacén de la fila 2 se dibuja como grafo (puntos y líneas), unido por una flecha naranja. |
| «Para los videos, almacenamiento de archivos.» (3,3 s) | Fila 3: archivos (una pila de hojas). |
| «Y dejó el costo escrito.» (1,8 s) | "costo" a mano en ámbar. |
| «El equipo tiene que manejar más de una tecnología…» (8,3 s) | Tres íconos de herramienta en ámbar y "formar o contratar" a mano. La fila 1 queda con "sin decidir" en gris. |

## 4 · Uno o varios (#par)

**Entiende:** los dos casos deciden por la forma del dato y la consulta: uno necesita un almacén, el otro tres.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «MonitorMe y Farmacy Family responden la misma pregunta de forma distinta.» (5,4 s) | Barrido. Dos mitades con sus nombres. |
| «MonitorMe tiene un solo tipo de dato…» (7,4 s) | Izquierda: "lecturas con hora" → un cilindro "series de tiempo". |
| «Farmacy Family tiene tres necesidades…» (7,4 s) | Derecha: tres necesidades → tres almacenes; "más tecnologías" en ámbar. |
| «En los dos casos, lo que decidió fue la forma del dato y la consulta…» (7,0 s) | Abajo, a lo ancho: "forma del dato + consulta → almacén" en naranja. |

## 5 · Quién puede cambiarlo (#dueno)

**Entiende:** además de dónde, hay que decidir quién cambia el dato; MobilityCorp pone un servicio dueño del estado del vehículo, y paga con un punto crítico que despliega con copias.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Saber dónde se guarda un dato no alcanza.» (3,1 s) | Barrido. Un cilindro al centro. |
| «También hay que decidir quién puede cambiarlo.» (3,4 s) | Un lápiz y "¿quién?" junto al cilindro. |
| «MobilityCorp… lo resolvió con un dueño.» (6,6 s) | Sello de MobilityCorp. Al centro, el vehículo (rueda, scooter en chico) con tres datos: "dónde", "batería", "libre". |
| «Casi todo su sistema necesita saber…» (7,7 s) | Cuatro servicios alrededor: reservas, rutas, mantenimiento, operación. |
| «Si cada servicio guardara su propia copia… reconciliación complicada.» (11,6 s) | **«copia»**: un cilindro chico junto a cada servicio; **«inconsistente»**: en uno "libre" verde, en otro "reservado" rojo, unidos por un rayo rojo. |
| «Por eso un solo servicio, el de flota, es el dueño…» (7,6 s) | Las copias se borran; al centro, "flota" con su cilindro; **«le preguntan»**: flechas de los cuatro hacia flota. |
| «El costo también está escrito.» (2,2 s) | "costo" a mano en ámbar. |
| «Ese servicio se vuelve crítico… copias que crecen con la carga.» (8,7 s) | **«crítico»**: flota en naranja; **«copias»**: dos copias detrás de flota. |

## 6 · Una regla de un solo escritor (#clearview)

**Entiende:** ClearView comparte la base y contiene el riesgo con una regla: un solo servicio escribe cada objeto; leer, cualquiera; impuesta con permisos.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «ClearView, en cambio, ya había decidido que varios servicios compartieran una base.» (6,3 s) | Barrido. Sello de ClearView. La estrella del bloque 1: cuatro servicios y la base al centro, con tres objetos adentro (currículum, historia, emparejamiento). |
| «En esa misma decisión anotó el riesgo… cualquiera cambia cualquier cosa.» (7,8 s) | **«cualquiera»**: flechas naranjas de cada servicio a cada objeto, enredadas; "caótico" a mano en ámbar. |
| «Lo contuvo con una segunda decisión de una sola regla.» (4,0 s) | Las flechas se borran. Una hoja chica "ADR-015". |
| «Cada objeto de la base tiene un único servicio con derecho a escribirlo.» (5,4 s) | Una flecha naranja por objeto, desde su dueño. |
| «Leer puede leer cualquiera.» (2,0 s) | Líneas finas grises de todos los servicios a la base. |
| «Y la regla no queda como una buena intención… permisos de la base.» (7,0 s) | **«permisos»**: un candado sobre cada objeto. |

## 7 · La pregunta que decide (#pregunta)

**Entiende:** la pregunta de la región tiene dos mitades, la familia y el dueño; la pieza de ClearView que queda es un escritor por dato.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «En esta región, la pregunta que decide tiene dos mitades.» (4,4 s) | Barrido. El tramo del mapa: regiones arriba y las cuatro tarjetas, chicas. |
| «Qué forma tiene el dato y cómo se lo va a consultar, que elige la familia.» (5,7 s) | "¿qué forma tiene y cómo se consulta?" en naranja sobre las tarjetas. |
| «Y quién puede cambiarlo, que elige al dueño.» (3,4 s) | "¿quién puede cambiarlo?" debajo. |
| «En ClearView… un solo escritor por dato.» (7,7 s) | A la derecha, la base de ClearView en chico con su candado; "un escritor por dato" en naranja. Queda así. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| 4.000 señales / s; 24 h; revisar por rango y por signo; base de series de tiempo; borrar después de 24 h | `BluzBrothers/FitnessFunctions/Sizing.md`; `Business/Requirements.md` l. 14; `ADR/ADR-003`, `ADR-004` (Accepted) |
| Las horas de los puntos ("10:02:01") y el rango "10:00 a 10:05" | Ilustración del curso |
| Lo que gana y paga cada familia | `Archangels/2.SolutionBackground/DataStore.md`; `BluzBrothers/ADR/ADR-003` (contra); conocimiento general, marcado en el guion |
| Las tres necesidades de Farmacy Family y sus almacenes; "sin decidir" para los datos generales; el costo | `Archangels/2.SolutionBackground/DataStore.md`; `4.ADRs/008`, `009` (Confirmed) |
| Flota como dueño; los cuatro usos (reservas, rutas, mantenimiento, operación); el riesgo y la mitigación | `Five-Nines/adrs/ADR-0007 …` l. 5-9, 49, 65 |
| ClearView: base compartida, riesgo caótico, un escritor por objeto, permisos | `Pragmatic/ADR/ADR-014`, `ADR-015` (Accepted) |
| Los nombres de los tres objetos de la base (currículum, historia, emparejamiento) | `Pragmatic/C4/C2-container.md` (bloque 1) |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El tramo del mapa aparece dos veces (al presentar las familias y al cerrar), con la misma disposición | Se mantiene: es la forma fija del acto 2 |
| 1 | Arquitecto senior | Los "pulso · 10:02:01" son ilustración; no hay horas en la fuente | Rotulados como ilustración en la tabla |
| 1 | Verificador | Los servicios que necesitan el estado del vehículo salen del ADR-0007: "routing, booking, maintenance, and operational decision-making" | Reservas, rutas, mantenimiento y operación (no "precios") |
| 1 | Dirección visual | Cuatro tarjetas de 377 px con textos de 30 px: "gana" y "paga" tienen que entrar en dos renglones | Textos de cada tarjeta de cuatro a cinco palabras |
| 1 | Producción | Necesita `region()` (nuevo en el kit) | Agregado |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 3 | La escena abre con el mundo de Farmacy Family hasta «generales» | Las necesidades llegaban a los 6 s: la pantalla quedaba vacía |
| 3 | El ícono de video va más a la izquierda | Pisaba "contenido grande" |
| 6 | Los tres objetos de la base, más anchos y con rótulo de 23 px | "emparejamiento" se salía de su caja |
| 7 | Al aparecer la pieza de ClearView se borran también las regiones | El sello de ClearView chocaba con la primera región |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.

| Plano | Estado |
|---|---|
| 0 · Estás aquí | |
| 1 · Lecturas con hora | |
| 2 · Cuatro familias | |
| 3 · Un almacén por necesidad | |
| 4 · Uno o varios | |
| 5 · Quién puede cambiarlo | |
| 6 · Una regla de un solo escritor | |
| 7 · La pregunta que decide | |
