# Bloque 7 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`).

**La idea del bloque en una imagen:** un mismo productor y tres canales con la misma disposición: la flecha que espera (con su reloj), la cola que lleva a uno, el stream que leen varios; y aparte, un reloj de pared que dispara un trabajo que toma todo junto.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **Esperar o seguir** (flecha azul continua con reloj y punto que va y vuelve; flecha verde a trazos con punto que va y quien manda sigue) | Síncrono contra asíncrono, como en `GUIA-VISUAL.md` | Escenas 1 y 2 |
| **Productor, canal, lectores** (la misma disposición para cola y stream) | La cola entrega a uno y borra; el stream guarda y lo leen varios | Escenas 3, 4 y 5 |
| **El reloj que dispara el lote** (mensajes que se acumulan, un reloj, un trabajo que los toma todos y los ordena) | Procesar por calendario | Escena 6 |
| **El tramo del mapa** | Las cuatro familias de la región | Escenas 2 y 7 |

Colores: azul para lo que espera; verde para lo que va sin esperar (mensajes); naranja lo que la voz señala; ámbar lo que se paga; rojo solo la falla.

## 0 · Estás aquí

`T.aqui(7)`, "Bloque 7", "Mover y procesar".

## 1 · Esperar o seguir (#gancho)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Un cliente de Sysops Squad… hace dos cosas seguidas.» (7,7 s) | Sello de Sysops Squad y "propuesta". A la izquierda, una persona "cliente"; a la derecha, dos cajas: "perfil" arriba y "tickets" abajo. |
| «Primero cambia su dirección en el perfil y recarga la página.» (4,6 s) | Flecha azul continua del cliente a "perfil". |
| «Después abre un ticket porque se le rompió la lavadora.» (4,1 s) | Flecha verde a trazos del cliente a "tickets". |
| «El equipo propone tratar esas dos acciones de forma distinta.» (4,5 s) | Las dos flechas se repasan. |
| «El cambio de perfil tiene que verse enseguida… espera la respuesta…» (7,8 s) | **«espera»**: un punto azul va a "perfil" y vuelve; mientras tanto, un reloj sobre el cliente. "espera" a mano en azul. |
| «El ticket no… hasta que alguien lo tome.» (7,0 s) | Un punto verde va a "tickets"; el cliente se ilumina y sigue (sin reloj). |
| «Se manda y se sigue… disparar y olvidar.» (4,9 s) | "disparar y olvidar" a mano en verde junto a la flecha de abajo. |

## 2 · Cuatro familias (#familias)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Cada vez que una parte le pasa algo a otra hay tres preguntas.» (4,7 s) | Barrido. Tres rótulos grandes, uno debajo del otro, que aparecen al nombrarse en la frase siguiente. |
| «Si quien manda tiene que esperar, por dónde viaja el mensaje y cuándo se procesa.» (6,2 s) | "¿espera?", "¿por dónde viaja?", "¿cuándo se procesa?". |
| «Las respuestas forman cuatro familias.» (2,8 s) | Los rótulos se borran; arriba, las diez regiones con "mover y procesar" en naranja. |
| «La llamada que espera…» (3,9 s) / «Paga con que…» (6,9 s) | Tarjeta 1 con su "gana"; después, su "paga". |
| «La cola guarda cada mensaje…» (7,5 s) / «Gana…» (5,6 s) / «Paga…» (5,2 s) | Tarjeta 2: marco y nombre; "gana"; "paga". |
| «El stream es un registro…» (8,6 s) / «Gana…» (5,6 s) / «Paga…» (2,8 s) | Tarjeta 3. |
| «Y los lotes no procesan cada mensaje cuando llega.» (3,7 s) / «Un trabajo corre por calendario…» (5,7 s) / «Gana…» (2,8 s) / «Paga…» (3,2 s) | Tarjeta 4. |

## 3 · Un evento para muchos (#stream)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Spotlight… eligió entre la cola y el stream con una tabla escrita.» (9,3 s) | Barrido. Sello de Spotlight. Dos filas con la misma disposición: arriba "cola" (un tubo con bandas), abajo "stream" (una banda larga con marcas). A la izquierda de las dos, un productor "asignaciones". |
| «Cuando cambia la asignación… el servicio de candidatos, y también hay que guardarlo para la analítica.» (12,6 s) | **«asignación»**: un evento naranja sale del productor. **«candidatos»**: a la derecha de las dos filas, un lector "candidatos"; **«analítica»**: otro lector "analítica" con un cilindro. |
| «Una cola se lo daría a uno solo y lo borraría.» (3,5 s) | Arriba: el evento recorre la cola y llega solo a "candidatos"; la cola queda vacía; "analítica" queda en gris con "nada". |
| «Por eso eligió el stream… cuesta más que una cola.» (5,7 s) | Abajo: el evento queda marcado en la banda; dos flechas, una a cada lector, desde posiciones distintas de la banda. **«cuesta más»**: "cuesta más" en ámbar bajo el stream. La fila del stream se encierra en naranja. |

## 4 · Un mensaje para un destino (#cola)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Sysops Squad propone lo contrario para los tickets…» (6,3 s) | Barrido. Sello de Sysops Squad, "propuesta". Productor "tickets" → cola → un destino "asignación". |
| «Un ticket nuevo tiene que llegar a quien lo procesa, a nadie más, y no se puede perder.» (6,8 s) | **«a nadie más»**: un ticket recorre la cola y llega al único destino. |
| «El equipo propone colas con entrega garantizada… quien se suscriba.» (11,0 s) | **«garantizada»**: el destino cae (rojo); un segundo ticket espera en la cola; **«suscriba»**: el destino vuelve y el ticket entra. |
| «Las facturas siguen la misma lógica.» (2,7 s) | Abajo, otra fila igual: "facturas" → cola → "avisos". |
| «Viajan por una cola que las guarda… en mantenimiento.» (8,3 s) | **«mantenimiento»**: "avisos" en gris con una llave; tres facturas se acumulan en la cola. |

## 5 · Varios o uno (#par)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Spotlight eligió un canal y Sysops Squad propone el otro…» (6,2 s) | Barrido. Dos mitades: Spotlight y Sysops Squad. |
| «Spotlight necesitaba que un mismo evento lo leyeran varios…» (6,1 s) | Izquierda: el stream con dos lectores, los dos en naranja. |
| «Sysops Squad necesitaba que cada ticket llegara a un solo destino…» (6,2 s) | Derecha: la cola con un destino, en naranja. |
| «Lo que separa los dos casos es cuántos tienen que leer el mensaje.» (5,0 s) | Abajo, al centro: "¿cuántos leen?" en 64 px naranja. |

## 6 · Todo junto, a su hora (#lotes)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Queda la última pregunta, cuándo se procesa.» (3,3 s) | Barrido. Un reloj grande al centro. |
| «Sysops Squad tenía un problema con la asignación de tickets.» (4,5 s) | Sello. El reloj se corre a la derecha; a la izquierda, tickets que llegan de a uno. |
| «A veces llegaba el técnico equivocado, y a veces un ticket nunca se asignaba.» (5,9 s) | Un ticket con una persona equivocada (✕ roja); otro ticket que queda solo, en gris, con "nunca". |
| «El equipo propone sacar la asignación a un trabajo que corre por calendario…» (7,5 s) | **«trabajo»**: una caja "trabajo" bajo el reloj; **«cada hora»**: la aguja del reloj y "cada hora" a mano. |
| «Procesar los tickets de a uno… no permite atender primero a los urgentes.» (7,3 s) | Los tickets en fila, uno urgente al final (rojo naranja "urgente"), que no puede pasar adelante. |
| «En cambio, un trabajo que toma todos los pendientes juntos puede ordenarlos por prioridad.» (6,8 s) | El trabajo toma la fila entera; los tickets se reordenan: el urgente primero. |
| «Y si algo sale mal, se vuelve a correr.» (3,1 s) | Una ✕ sobre el trabajo y una flecha circular: se vuelve a correr. |
| «El costo está escrito.» (1,6 s) | "costo" a mano en ámbar. |
| «Si el trabajo no arranca… hay que vigilarlo.» (7,8 s) | Un ojo en ámbar junto al reloj; "vigilar que arranque". |
| «El cobro mensual sigue la misma idea.» (2,8 s) | Abajo, un calendario con un día marcado. |
| «Es algo que pasa una vez por mes… volver a correr si falla.» (9,9 s) | "cobro mensual" junto al calendario; la flecha circular de volver a correr. |

## 7 · La pregunta que decide (#pregunta)

| Frase (duración) | Lo que se dibuja |
|---|---|
| «En esta región la pregunta tiene cuatro partes…» (5,4 s) | Barrido. El tramo del mapa con sus cuatro tarjetas. |
| «Si hay que esperar la respuesta.» (2,4 s) | Debajo de la tarjeta 1, "¿esperar?" en naranja. |
| «Cuántos tienen que leer el mensaje.» (2,6 s) | Entre las tarjetas 2 y 3, "¿cuántos leen?". |
| «Si hay que guardarlo.» (1,6 s) | Debajo de la 3, "¿guardarlo?". |
| «Y si tiene que procesarse ya o puede esperar a su hora.» (4,2 s) | Debajo de la 4, "¿ya o a su hora?". Queda así. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Perfil síncrono; ticket "disparar y olvidar"; facturas por cola persistente | `Team-7/ADR/ADR-12-gateways.md`; `ADR-5-extract-customer-quantum.md` (Proposed) |
| Cola de punto a punto con entrega garantizada | `Team-7/ADR/ADR-2-event-driven-broker.md` (Proposed) |
| Cola frente a stream; el evento de asignación; candidatos y analítica; cuesta más | `Pegasuz/ADRs/010.adr-queue-stream.md` (Accepted) |
| Trabajo por lotes cada hora; prioridades; volver a correr; vigilarlo | `Team-7/ADR/ADR-3-search-expert.md` (Proposed) |
| Cobro mensual por un trabajo programado | `Team-7/ADR/ADR-11-extract-payment-job.md` (Proposed) |
| El cliente, la lavadora, el técnico equivocado dibujado, el destino que cae | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | Cola y stream con la misma disposición (productor, canal, lectores), arriba y abajo, como pide la guía para los pares | Se mantiene |
| 1 | Verificador | "asignación" como destino de la cola de tickets: ADR-2 habla del flujo de tickets; el destino que los procesa es la asignación (ADR-3) | Se rotula "asignación" |
| 1 | Dirección visual | La escena 6 tiene muchas piezas; el reloj, la fila y el trabajo ocupan cada uno un tercio | Se mantiene |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 2 | Las tres preguntas aparecen apagadas al empezar la escena y se encienden al nombrarse | La pantalla quedaba vacía cinco segundos |
| 2 y 7 | La tarjeta "llamada que espera" se titula "llamada"; los textos de la cola se acortan ("si el destino cae", "no responde ya") | No entraban en la tarjeta |
| 3 | El evento naranja sale a la derecha del productor | Tapaba el rótulo "asignaciones" |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.
