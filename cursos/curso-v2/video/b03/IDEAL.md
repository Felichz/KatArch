# Bloque 3 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano. Se escribe y se revisa antes de animar (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo y medidas: `cursos/curso-unico/GUIA-VISUAL.md`, "Pizarra y forma" y "Cómo se ve un cuadro terminado". Las duraciones son estimadas (`timing.mjs estimate`): en esta máquina no hay voz de borrador; con la voz cambian los segundos, no las anclas.

**La idea del bloque en una imagen:** una barra de un segundo, repartida en tramos, con una perilla encima de los dos tramos grandes: girarla un milímetro desborda la barra.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **La barra del presupuesto** (una barra horizontal larga, "1 s" en su extremo, que se llena con segmentos de izquierda a derecha) | Una cualidad elegida se vuelve un número que alcanza o no alcanza | Escenas 1, 2 y 4 |
| **El camino que suelta sus tramos** (cinco piezas en fila sobre la barra; cada una deja caer su segmento) | La cuenta sigue a una señal de punta a punta y suma lo que tarda cada tramo | Escena 1 |
| **La perilla del supuesto** (un dial sobre los segmentos grandes; al girarlo, los segmentos crecen) | Un solo supuesto mueve todo el resultado; ese es el número que hay que medir | Escenas 2 y 4 |
| **La decisión sobre su apoyo** (una hoja sobre una columna con la condición adentro, como la renuncia del bloque 2) | Si el número no se puede medir todavía, la decisión queda apoyada en él, por escrito | Escenas 2 y 4 |
| **La grilla contra la línea** (historias × puestos, una moneda por celda; contra una columna y una fila con una moneda cada una) | Multiplicar contra sumar: la forma de emparejar decide cuánto se paga | Escena 3 |

Colores de tiza: blanco para lo que está; naranja para lo que la voz señala ahora; verde para lo que sobra o se gana; ámbar para lo que se paga (las monedas, el supuesto); rojo solo para lo que desborda el segundo.

## 0 · Estás aquí (unos 3 s)

**Entiende:** que está en la tercera estación del acto 1.

- `T.aqui(3)`: el mapa con la apertura y los bloques 1 y 2 rellenos; el 3 se traza en naranja. Arriba, "Bloque 3" y "Comprobar con una cuenta". Se barre justo antes de la primera palabra.

## 1 · Un segundo, repartido (#monitorme)

**Entiende:** MonitorMe convirtió "un segundo o menos" en una cuenta: cuántas señales llegan en el pico y cuánto tarda cada tramo del camino de una señal; la suma da 693 ms, dentro del segundo.

**Forma:** la barra del presupuesto abajo, a lo ancho; arriba, primero el embudo de señales (un paciente que se multiplica) y después el camino que suelta sus tramos en la barra.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «MonitorMe, el sistema para hospitales, tiene que mostrar los signos vitales en un segundo o menos.» (7,5 s) | Desde la primera palabra, el mundo de MonitorMe (la pantalla de la estación con sus curvas) arriba, en dos tercios del alto. **«un segundo»**: junto a la pantalla, "≤ 1 s" en 120 px naranja. |
| «Su equipo no se quedó en la frase y la convirtió en una cuenta.» (4,8 s) | El mundo se achica al sello. **«cuenta»**: abajo, a lo ancho (x 160 a 1760, y 780), la barra del presupuesto: un rectángulo de 1600 × 110 px, vacío, con "1 s = 1.000 ms" en su extremo derecho, en tipografía limpia. "≤ 1 s" se borra. |
| «Primero calcularon cuántas señales llegan.» (3,0 s) | Arriba a la izquierda, una persona (círculo y hombros) de unos 160 px, con "un paciente" a mano debajo. |
| «En promedio, cada paciente manda poco más de cuatro señales por segundo, entre todos sus sensores.» (7,5 s) | **«cuatro señales»**: de la persona salen cuatro rayitas cortas hacia la derecha (los sensores) y, al lado, "4,2 / s" en 96 px. A mano debajo: "promedio". |
| «Para el peor momento el equipo supuso ocho, y una instalación tiene hasta quinientos pacientes.» (7,2 s) | **«supuso ocho»**: "4,2 / s" se borra y aparece "8 / s" en ámbar, con "pico, supuesto" a mano. **«quinientos»**: a la derecha, una grilla de 10 × 5 personitas que se traza de una vez, con "× 500" en 72 px al lado. |
| «En el pico, eso da cuatro mil señales por segundo.» (3,9 s) | La persona y la grilla bajan al 35 %. **«cuatro mil»**: a la derecha, "4.000 señales / s" en 120 px naranja. |
| «Después siguieron el camino de una señal, de punta a punta.» (4,5 s) | Lo de arriba se borra (la barra queda). A lo ancho, a la altura y 380, una línea punteada de izquierda a derecha: el camino, con un punto naranja que lo recorre. |
| «Pasa por el servicio que la guarda y por el que la muestra en pantalla.» (5,4 s) | Sobre el camino, **«guarda»**: caja "guarda" (300 × 120); **«muestra»**: caja "muestra". |
| «Pasa también por la base de datos y por el intermediario de mensajes, la pieza que los reparte entre los servicios.» (8,7 s) | **«base de datos»**: un cilindro; **«intermediario»**: una caja angosta con bandas verticales (la cola), con "reparte" a mano debajo. |
| «Y viaja por la red del hospital.» (2,4 s) | Al final del camino, una línea ondulada ("red") que llega a una pantallita (la estación). |
| «A cada tramo le pusieron un tiempo y los sumaron.» (3,7 s) | **«un tiempo»**: cada pieza deja caer su segmento a la barra, uno tras otro, con su número en tipografía limpia encima: 320, 320 (cada uno casi un tercio de la barra), 16, 5 y 32 (tiritas finas). |
| «Dio poco menos de setecientos milisegundos, por debajo del segundo.» (5,0 s) | **«setecientos»**: sobre el borde derecho de los segmentos, "693 ms" en 120 px naranja. **«por debajo»**: el resto de la barra, hasta "1 s", se rellena con rayas verdes, y "sobra" a mano en verde. |

## 2 · El número que manda (#supuesto)

**Entiende:** lo que pesa en la cuenta son los dos tramos de procesamiento, y los dos salen de un solo supuesto (2 ms por señal); con 3 ms la suma pasa del segundo; por eso ese es el número que hay que medir primero, y si no se puede, la decisión queda apoyada en él.

**Forma:** la misma barra, de cerca; la perilla del supuesto sobre los dos tramos grandes; al final, la decisión sobre su apoyo.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Esa cuenta dice algo más si se la mira de cerca, y lo que sigue ya es lectura nuestra de sus números.» (7,8 s) | El camino se borra; la barra queda con sus segmentos y "693 ms". **«de cerca»**: la cámara se acerca a la barra (unas 1,3 veces). **«lectura nuestra»**: arriba a la derecha, "cuenta nuestra" a mano en ámbar. |
| «Más del noventa por ciento del tiempo está en los dos servicios que procesan la señal.» (6,5 s) | **«noventa»**: los dos segmentos de 320 se repasan en naranja; los otros tres bajan al 35 %. Encima de los dos, "92 %" en 120 px naranja. |
| «La base de datos, el intermediario y la red, que es lo que más se suele discutir, pesan muy poco.» (7,7 s) | "92 %" baja al 35 %. **«base de datos»**: un círculo de lupa alrededor de las tres tiritas, con "16 · 5 · 32 ms" al lado en tipografía limpia. **«pesan muy poco»**: "poco" a mano junto a la lupa. |
| «Y esos dos tramos salen de un solo supuesto que el equipo dejó escrito, que procesar una señal tarda dos milisegundos.» (9,0 s) | La lupa se borra. **«un solo supuesto»**: sobre el límite entre los dos segmentos grandes, una perilla (círculo de 120 px con una aguja) y una línea fina que baja a cada segmento. **«dos milisegundos»**: en la perilla, "2 ms" en 56 px; arriba, "supuesto" a mano en ámbar. |
| «Con tres milisegundos, la suma pasa del segundo.» (3,7 s) | **«tres»**: la aguja gira; "2 ms" pasa a "3 ms". Los dos segmentos crecen a 480 cada uno y empujan a los demás: la barra pasa la marca de "1 s" y el exceso se traza en rojo. **«pasa del segundo»**: "1.013 ms" en rojo, 96 px. |
| «La cuenta no solo aprueba el diseño.» (2,7 s) | La aguja vuelve; "2 ms"; los segmentos vuelven a 320 y el rojo se borra. Junto a "693 ms", un tilde verde. |
| «También dice qué número hay que medir antes que nada.» (4,0 s) | **«medir»**: la perilla se repasa en naranja; al lado, un cronómetro chico y "medir primero" a mano. |
| «Y si todavía no se puede medir, la decisión queda condicionada a ese número, y eso también se escribe.» (7,9 s) | La cámara vuelve al cuadro entero. **«la decisión»**: a la derecha, una hoja de decisión sobre una columna, como la renuncia del bloque 2; **«condicionada»**: dentro de la columna, "2 ms por señal" en tipografía limpia, y una línea punteada naranja une la perilla con la columna. **«se escribe»**: en la hoja, una franja se repasa. |

## 3 · La cuenta en dinero (#clearview)

**Entiende:** ClearView paga por cada llamada al modelo; medir en llamadas sus formas de emparejar muestra que unas crecen como una multiplicación y otras como una suma; con números de ejemplo, cien mil contra mil cien; eligió una de las que suman.

**Forma:** el modelo con su moneda por llamada; después, la grilla contra la línea, lado a lado.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «ClearView hizo una cuenta del mismo tipo, pero en dinero.» (4,4 s) | Barrido. Sello de ClearView. Al centro, una moneda grande (círculo con "$") en ámbar, 160 px. |
| «Usa un modelo de lenguaje, la inteligencia artificial que lee y escribe texto.» (5,9 s) | La moneda se corre a la derecha. **«modelo de lenguaje»**: al centro, un hexágono de 260 px con "modelo" adentro. |
| «Cada vez que le pide algo, paga por el texto que manda y por el que recibe.» (5,8 s) | **«manda»**: una flecha entra al hexágono desde la izquierda con tres renglones (texto); **«recibe»**: otra sale a la derecha con dos renglones. **«paga»**: en cada flecha, una moneda chica ámbar. |
| «Así que el equipo midió sus opciones de emparejamiento en cantidad de llamadas al modelo.» (6,6 s) | **«llamadas»**: debajo del hexágono, "costo ≈ llamadas" en 56 px, con "llamadas" en naranja. |
| «Compararon seis formas de emparejar las historias, las versiones anónimas de los currículums, con los puestos.» (8,3 s) | Lo anterior se borra salvo el sello. **«seis»**: arriba, seis círculos con letras A a F en tipografía limpia. **«historias»**: a la izquierda, una columna de cinco tarjetas (historias); **«puestos»**: arriba de la grilla, una fila de cuatro tarjetas (puestos). |
| «En algunas, el modelo mira cada historia junto a cada puesto.» (4,7 s) | La pantalla se divide en dos mitades con la misma disposición (columna de historias, fila de puestos). Izquierda: **«cada historia junto a cada puesto»**: las veinte celdas de la grilla se llenan, una moneda ámbar por celda, en un barrido rápido. |
| «En otras, el modelo describe una sola vez cada historia y cada puesto, y el emparejamiento se hace después sin él.» (8,8 s) | Derecha: **«una sola vez»**: una moneda junto a cada historia y a cada puesto (nueve). **«sin él»**: en el centro de la mitad derecha, una caja "regla" (con un ícono de balanza), sin moneda, une las dos. |
| «Para las primeras, las llamadas crecen con las historias multiplicadas por los puestos.» (6,5 s) | Debajo de la izquierda: "historias × puestos" en 56 px, con "×" en ámbar. |
| «Para las segundas, crecen con las historias sumadas a los puestos.» (5,0 s) | Debajo de la derecha: "historias + puestos", con "+" en verde. |
| «Con números nuestros, para verlo: mil historias y cien puestos son cien mil llamadas en el primer caso, y mil cien en el segundo.» (10,1 s) | **«números nuestros»**: arriba al centro, "ejemplo nuestro" a mano en ámbar. **«mil historias»**: "1.000 × 100" bajo la izquierda y "1.000 + 100" bajo la derecha (en lugar de las fórmulas). **«cien mil»**: "100.000 llamadas" en 96 px ámbar a la izquierda. **«mil cien»**: "1.100 llamadas" en 96 px verde a la derecha. |
| «Cuando cambia un currículum, el segundo camino vuelve a pedir una sola descripción.» (6,3 s) | **«cambia»**: una historia de cada lado se repasa en naranja. Izquierda: las cuatro monedas de su fila se repasan en naranja. Derecha: **«una sola»**: solo su moneda. |
| «El equipo eligió una forma del segundo grupo.» (3,4 s) | **«segundo grupo»**: la mitad derecha se encierra en un óvalo naranja; la izquierda baja al 35 %. |

## 4 · Tiempo y dinero (#comparacion)

**Entiende:** las dos cuentas tienen la misma forma: un solo número mueve el resultado, y ese número dice qué medir primero y qué decisión depende de él.

**Forma:** dos columnas con la misma disposición: arriba la cuenta en miniatura, en el medio su perilla, abajo la decisión sobre su apoyo.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Una cuenta mide tiempo y la otra mide dinero, y en las dos un solo número mueve todo.» (6,6 s) | Barrido. Dos columnas: izquierda "MonitorMe", la barra chica con sus segmentos y "693 ms"; derecha "ClearView", la grilla y la línea en miniatura con "1.100". **«un solo número»**: debajo de cada una, una perilla; las dos se repasan en naranja a la vez. |
| «En MonitorMe, los dos milisegundos por señal.» (3,4 s) | En la perilla izquierda, "2 ms / señal" en 44 px. |
| «En ClearView, cuántas veces se llama al modelo.» (3,6 s) | En la perilla derecha, "llamadas al modelo" en 44 px. |
| «Ese número dice qué hay que medir primero, y qué decisión depende de él.» (5,5 s) | **«medir»**: bajo la izquierda un cronómetro, bajo la derecha una moneda con un contador. **«qué decisión»**: debajo de cada una, una hoja sobre su columna, unida a la perilla por una línea punteada. Queda así. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| "≤ 1 s" (respuesta media de un segundo o menos) | `BluzBrothers/Business/Requirements.md` |
| "4,2 / s" por paciente en promedio; "8 / s" en el pico; "× 500"; "4.000 señales / s" | `BluzBrothers/FitnessFunctions/Sizing.md` l. 16, 22-25 |
| Las cinco piezas del camino en ese orden (Recorder, Streamer, base, plataforma de mensajes, red) y sus tiempos 320, 320, 16, 5, 32; total 693 ms | `BluzBrothers/FitnessFunctions/Sizing.md` l. 58-67 |
| "92 %" (640 de 693); "1.013 ms" con 3 ms por señal | Cuentas nuestras sobre `Sizing.md`, rotuladas "cuenta nuestra" |
| "2 ms" por señal, supuesto | `BluzBrothers/FitnessFunctions/Sizing.md` l. 51 |
| La decisión apoyada en el número (hoja sobre columna) | Ilustración del curso de lo que dice la narración; MonitorMe no tiene un ADR que lo escriba así |
| Seis formas (A a F); multiplicar contra sumar (O(n·m) contra O(n+m)); actualizar una historia cuesta menos en el segundo grupo; eligió B | `Pragmatic/ADR/ADR-011-deterministic-matching.md` (Accepted) |
| Paga por el texto que manda y recibe | `Pragmatic/Requirements/Research/interview-ai-expert.md` l. 28-29 |
| "1.000 × 100", "1.000 + 100", "100.000" y "1.100" | Ejemplo nuestro, rotulado "ejemplo nuestro" |
| La persona, la grilla de personas, el cronómetro, la moneda, la perilla, la lupa, la caja "regla" | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | La forma "decisión sobre su apoyo" del bloque 2 vuelve igual para "la decisión queda condicionada": la idea vuelve combinada | Se mantiene, con la misma disposición (hoja arriba, columna con la condición) |
| 1 | Arquitecto senior | La grilla de 5 × 4 representa n·m y la línea n+m; con cinco historias y cuatro puestos las monedas dan 20 contra 9, coherente con lo que se dice | Sin cambios |
| 1 | Verificador | "4,2 / s" y "8 / s" tienen que quedar separados (promedio y pico); "92 %" y "1.013 ms" son cuentas nuestras: se rotulan | "cuenta nuestra" a mano desde la primera frase de la escena 2 |
| 1 | Guionista | Las anotaciones no pasan de seis palabras; "costo ≈ llamadas" resume la frase sin repetirla | Sin cambios |
| 1 | Espectador de prueba | "Recorder" y "Streamer" no se entienden: se rotulan "guarda" y "muestra", como dice la voz | Rótulos en español |
| 1 | Dirección visual | En la escena 1, entre «cuenta» y «Primero» la barra está sola arriba de un fondo vacío unos 3 s: se acepta, porque es la forma que se presenta. En la escena 3, la grilla de 20 monedas y la línea de 9 a la vez son muchas piezas chicas: la cámara no se acerca, pero cada mitad ocupa casi la mitad del ancho y las monedas son de 44 px | Monedas de 44 px; tarjetas de 120 × 70 |
| 1 | Producción | No hace falta ninguna pieza nueva del kit: la moneda, el hexágono y la perilla se dibujan con `circle`, `path` y `label` | Sin cambios en el kit |
| 2 | Los siete | Lectura seguida de la escena 0 a la 4: cada frase tiene un cambio en pantalla, ninguna más de unos 4 s sin cambio salvo las de desarrollo, y las formas vuelven iguales en la comparación | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 1 | "sobra" va arriba de la barra, no debajo | Debajo caía en la franja del subtítulo |
| 2 | "693 ms" se borra mientras se ve la lupa y vuelve apagado con la perilla | "16 · 5 · 32 ms" se encimaba con "693 ms" |
| 2 | "cuenta nuestra" se borra cuando entra la hoja de la decisión | La hoja y la línea punteada la tapaban |
| 3 | Las cifras ("1.000 × 100", "100.000 llamadas") reemplazan a las fórmulas en el mismo lugar, debajo de cada mitad | Arriba de las fórmulas tapaban la última fila de monedas |
| 3 | Los rótulos con "×", "+" y "≈" llevan espacios duros | El rótulo es una caja flex y se comía los espacios alrededor del símbolo |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: ver `README.md`, paso 4.8). Las capturas al final de cada frase (`node cursos/curso-v2/tools/capturas.mjs cursos/curso-v2/video/b03 r1`) y en orden inverso (`… inv --inversa`) coinciden con este guion visual, plano por plano.

| Plano | Estado |
|---|---|
| 0 · Estás aquí | |
| 1 · Un segundo, repartido | |
| 2 · El número que manda | |
| 3 · La cuenta en dinero | |
| 4 · Tiempo y dinero | |
