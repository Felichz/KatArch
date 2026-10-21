# Bloque 4 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano. Se escribe y se revisa antes de animar (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo y medidas: `cursos/curso-unico/GUIA-VISUAL.md`. Las duraciones son estimadas (`timing.mjs estimate`; en esta máquina no hay voz de borrador): con la voz cambian los segundos, no las anclas.

**La idea del bloque en una imagen:** una planilla de estrellas con una columna elegida y otra que la completa en una fila; y, al lado, dos sistemas que eligieron distinto con la misma moneda arriba.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **El espectro** (de un bloque único a muchos bloques chicos, con formas intermedias en el medio) | Los estilos van de una sola pieza a muchas, y cada punto es bueno en unas cualidades y malo en otras | Escena 1 |
| **La planilla de estrellas** (columnas de estilos, filas de cualidades, estrellas en tipografía) | Se elige mirando las filas que importan, no la suma de todo | Escenas 1 y 2 |
| **La estrella del bloque 1** (servicios alrededor de una base compartida) | El estilo basado en servicios es justo la base compartida que ya se conoce | Escenas 2 y 4 |
| **Dos zonas con frontera** (los servicios con su base; la integración con mensajes que viajan) | El estilo puede cambiar por parte del sistema | Escenas 2 y 4 |
| **Copias que esperan a la misma base** | Lo que se paga: la elasticidad | Escena 2 |
| **El bloque con módulos** (una caja grande con cuatro módulos y fronteras firmes) | Un monolito modular: una sola aplicación, ordenada por dentro | Escenas 3 y 4 |
| **La misma moneda, dos salidas** (una moneda arriba de cada mitad) | La misma presión de dinero lleva a estilos distintos según qué más pese | Escenas 3 y 4 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que se gana (y los mensajes, como en la gramática); ámbar lo que se paga y las estrellas; rojo solo si algo falla.

## 0 · Estás aquí (unos 3 s)

`T.aqui(4)`: el mapa con los bloques anteriores rellenos y el 4 en naranja; "Bloque 4" y "El estilo". Se barre antes de la primera palabra.

## 1 · Una planilla con estrellas (#planilla)

**Entiende:** con sus tres cualidades, ClearView tenía que elegir la forma general del sistema; los estilos van de un monolito a los microservicios, y cada uno es bueno en unas cualidades y malo en otras; se elige con una planilla de estrellas, mirando las filas que importan.

**Forma:** las tres cualidades arriba; el espectro de estilos; la planilla.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «ClearView ya tenía sus tres cualidades: poder probarlo, poder pagarlo y poder hablar con muchos sistemas ajenos.» (8,6 s) | Sello de ClearView desde la primera palabra. Tres notas verdes (440 × 96) en fila a la altura y 300: **«probarlo»** "testabilidad", **«pagarlo»** "factibilidad", **«hablar»** "interoperabilidad". |
| «Con ellas tenía que elegir la forma general del sistema, lo que se llama su estilo.» (6,4 s) | Las notas suben y se achican (quedan arriba). **«forma general»**: abajo, una caja punteada grande con "?"; **«estilo»**: "estilo" a mano al lado. |
| «En un extremo está el monolito, una sola pieza que se despliega entera.» (5,4 s) | La caja punteada se borra. **«monolito»**: a la izquierda, un bloque único (260 × 260) con "monolito" debajo. |
| «En el otro, los microservicios, muchas piezas pequeñas que se despliegan por separado.» (6,6 s) | **«microservicios»**: a la derecha, doce cajitas sueltas en una grilla de 4 × 3, con "microservicios" debajo. Una flecha doble une los dos extremos. |
| «Entre los dos hay varias formas intermedias, y cada una es buena en unas cualidades y mala en otras.» (7,6 s) | **«intermedias»**: entre los dos, tres formas con 2, 4 y 6 piezas. **«buena»**: sobre cada forma, un "+" verde; **«mala»**: debajo, un "–" ámbar. |
| «El equipo eligió con una planilla de estilos que armó Mark Richards, uno de los que presentan el concurso.» (8,1 s) | Todo se borra salvo el sello. **«planilla»**: el marco de la planilla (de x 140 a 1800, de y 190 a 860) y, arriba a la izquierda, "planilla de estilos · Mark Richards" a mano. |
| «Tiene una columna por estilo y una fila por cualidad, y cada casilla lleva de una a cinco estrellas.» (7,6 s) | **«columna»**: los ocho nombres de estilo arriba, en dos renglones de 24 px; **«fila»**: seis cualidades a la izquierda (costo, simplicidad, interoperabilidad, testabilidad, elasticidad, escalabilidad), 32 px; **«estrellas»**: las estrellas, en ámbar, en un barrido de izquierda a derecha. |
| «El equipo marcó las filas de sus cualidades y miró qué columna sumaba más donde importaba.» (6,7 s) | **«marcó»**: las filas costo, simplicidad, interoperabilidad y testabilidad quedan encerradas en un recuadro ámbar; las otras dos bajan al 35 %. |

## 2 · Lo que eligió ClearView (#clearview)

**Entiende:** ganó el estilo basado en servicios por costo y testabilidad; en interoperabilidad tenía pocas estrellas, y para esa parte ClearView usa eventos; el estilo puede variar por parte; lo que se paga es la elasticidad, porque las copias esperan a la misma base.

**Forma:** la planilla con dos columnas marcadas; después, ClearView en dos zonas; al final, las copias que esperan a la base.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Ganó el estilo basado en servicios, unos pocos servicios grandes que comparten la base de datos.» (7,3 s) | La planilla de la escena anterior. **«basado en servicios»**: la columna se encierra en naranja y arriba aparece una ✕ naranja. |
| «Tiene cuatro estrellas en costo, que el equipo usa para medir si lo puede pagar, y cuatro en testabilidad.» (8,2 s) | **«costo»**: la casilla se encierra en un óvalo verde; **«testabilidad»**: la suya también. |
| «El equipo escribe que es más barato y rápido de construir y más fácil de mantener.» (6,2 s) | Arriba a la derecha, a mano en verde: "más barato, más fácil de mantener". |
| «Pero en interoperabilidad, la tercera, tiene solo dos estrellas.» (4,9 s) | **«interoperabilidad»**: la casilla de esa columna se encierra en ámbar. |
| «Y ClearView no la soltó.» (1,8 s) | El nombre de la fila "interoperabilidad" se repasa en naranja. |
| «Donde el sistema tiene que hablar con los sistemas de recursos humanos de las empresas, usa otro estilo, uno por eventos.» (9,3 s) | **«por eventos»**: la columna "por eventos" se encierra y lleva su ✕. |
| «En ese estilo, las partes se avisan con mensajes en vez de llamarse y esperar la respuesta.» (7,0 s) | Debajo de esa columna, fuera de la planilla no cabe: a la derecha del encabezado, dos puntitos verdes que viajan por una flecha a trazos (mensaje), en chico. |
| «En la planilla, tiene una estrella más en esa fila.» (3,9 s) | **«una estrella más»**: su casilla de interoperabilidad se encierra en verde, con "3 > 2" al lado. |
| «Así, la forma general la eligen las cualidades que mandan, y una parte con otra necesidad puede apartarse de ella.» (8,7 s) | La planilla se borra. **«forma general»**: a la izquierda, la estrella del bloque 1 (cuatro servicios alrededor de la base compartida) dentro de una frontera punteada rotulada "basado en servicios". **«otra necesidad»**: a la derecha, otra frontera "por eventos": el servicio de integración y tres sistemas de recursos humanos (cajas punteadas), con mensajes verdes que viajan. |
| «La decisión también dice lo que pierde.» (2,9 s) | "pierde" a mano en ámbar sobre la zona izquierda. |
| «Compartir la base debilita la elasticidad.» (3,1 s) | La base se repasa en ámbar; "elasticidad ↓" en ámbar al lado. |
| «Cuando llega un pico, cada servicio puede sumar copias, pero todos terminan esperando a la misma base.» (7,8 s) | **«sumar copias»**: detrás de cada servicio aparece una copia. **«esperando»**: de cada copia sale una línea a la base, que queda en el centro, sola, en ámbar. |

## 3 · Lo que eligió Farmacy Food (#farmacy)

**Entiende:** Farmacy Food, con la misma presión de dinero, eligió un monolito modular por su estado (equipo chico, salir rápido, poco presupuesto, un negocio que todavía cambia); los microservicios pueden crecer después; el costo es la disciplina entre módulos.

**Forma:** el mundo del caso; la misma moneda con dos salidas; el bloque con módulos.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Farmacy Food vende comidas preparadas que se retiran de refrigeradores inteligentes, y trabaja con muy poco presupuesto.» (8,9 s) | Barrido. El mundo de Farmacy Food (el refrigerador con sus comidas) al centro, dos tercios del alto. **«poco presupuesto»**: una moneda ámbar al lado. |
| «Tenía la misma presión de dinero que ClearView, y llegó a otro lugar.» (5,3 s) | El mundo se achica al sello. La moneda pasa al centro arriba; de ella salen dos flechas: a la izquierda "ClearView" a mano (gris), a la derecha **«otro lugar»** una flecha naranja. |
| «Eligió un monolito modular, una sola aplicación dividida por dentro en módulos con fronteras claras.» (7,5 s) | **«monolito modular»**: abajo de la flecha naranja, una caja grande (900 × 480); **«módulos»**: adentro, cuatro módulos en 2 × 2: opiniones, fidelización, catálogo, retiro. "una sola aplicación" a mano arriba. |
| «Sus razones salen del estado del negocio.» (3,0 s) | La moneda y las flechas se borran. La caja se corre a la izquierda. |
| «El equipo es chico, hay que salir rápido y el presupuesto es corto.» (5,1 s) | A la derecha, tres señas en columna: **«chico»** dos personas y "equipo chico"; **«rápido»** un reloj y "salir rápido"; **«presupuesto»** una moneda y "poco dinero". |
| «Además, escribe que los microservicios piden un negocio estable y bien entendido, y que para su sistema de pedidos eso todavía no se cumple.» (10,7 s) | Las señas bajan al 35 %. **«estable»**: las fronteras internas de los módulos se borran y se vuelven a trazar un poco corridas; "el negocio todavía cambia" a mano en ámbar a la derecha. |
| «Los microservicios, dice, deberían crecer a medida que hagan falta.» (5,1 s) | **«crecer»**: fuera de la caja, a la derecha del módulo "catálogo", una caja punteada con "servicio, cuando haga falta" a mano y una flecha punteada desde el módulo. |
| «El costo también está anotado.» (2,2 s) | "costo" a mano en ámbar arriba de la caja. |
| «Hace falta disciplina para que los módulos no se mezclen con el tiempo.» (5,3 s) | **«disciplina»**: la línea entre dos módulos se borra y se vuelve a afirmar en ámbar; "disciplina entre módulos" a mano. |

## 4 · La misma presión, dos formas (#comparacion)

**Entiende:** con la misma presión de dinero, cada caso eligió el estilo cuyos costos podía pagar, por lo que más pesaba en su caso, y dejó escrito el costo.

**Forma:** las dos mitades con la misma disposición: arriba la moneda, en el medio el sistema, abajo el costo.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «ClearView y Farmacy Food tenían poco dinero, y lo pusieron arriba de todo.» (5,6 s) | Barrido. Dos mitades: "ClearView" y "Farmacy Food" a mano arriba; **«poco dinero»**: una moneda ámbar arriba de cada una a la vez. |
| «Uno terminó con unos pocos servicios grandes y el otro con una sola aplicación, porque además pesaban otras cosas.» (8,6 s) | **«servicios grandes»**: a la izquierda, la estrella con su base y la zona de eventos, en chico; **«una sola aplicación»**: a la derecha, la caja con cuatro módulos. |
| «En un caso, la necesidad de hablar con muchos sistemas ajenos.» (4,7 s) | La zona de eventos se repasa en naranja. |
| «En el otro, un negocio que todavía se movía.» (3,4 s) | Las fronteras de los módulos se repasan en naranja. |
| «Ninguno eligió un estilo sin costos.» (2,7 s) | Las dos mitades vuelven a blanco. |
| «Cada uno eligió el que tenía los costos que podía pagar, y dejó escrito cuáles eran.» (6,4 s) | **«costos»**: bajo cada mitad, en ámbar: "elasticidad ↓" y "disciplina entre módulos". **«escrito»**: al lado de cada costo, una hoja chica. Queda así. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Las tres cualidades de ClearView | `Pragmatic/ArchitectureCharacteristics/Characteristics.md` |
| "planilla de estilos · Mark Richards" | `Pragmatic/ADR/images/ADR-002-architecture-style.png` ("Created by Mark Richards") |
| Los ocho estilos y las estrellas de seis filas: costo 5 5 5 1 4 1 3 2; simplicidad 5 5 4 1 3 1 1 1; interoperabilidad 1 1 3 3 2 5 3 2; testabilidad 2 2 3 5 4 1 2 1; elasticidad 1 1 1 5 2 3 4 5; escalabilidad 1 1 1 5 3 3 5 5 (en el orden capas, monolito modular, microkernel, microservicios, basado en servicios, orientado a servicios, por eventos, basado en espacio); filas resaltadas y columnas marcadas | La misma imagen |
| "más barato, más fácil de mantener"; "elasticidad ↓" | `Pragmatic/ADR/ADR-002-architecture-style.md` (Accepted) |
| La estrella con la base compartida; el servicio de integración con los sistemas de recursos humanos | `Pragmatic/ADR/ADR-014`; `Pragmatic/C4/` (bloque 1) |
| Los cuatro módulos: opiniones, fidelización, catálogo, retiro | `ArchColider/2.SolutionBackground/SystemAppoach.md` l. 164 ("Feedback, Loyalty, Menu catalog, Meal pickup") |
| Equipo chico, salir rápido, poco dinero | `ArchColider/1.ProblemBackground/Constraints.md` |
| "el negocio todavía cambia"; "servicio, cuando haga falta"; "disciplina entre módulos" | `ArchColider/2.SolutionBackground/SystemAppoach.md` l. 137-139; `ArchColider/4.ADRs/002 System approach.md` l. 47 (Accepted) |
| El espectro de estilos, el refrigerador, las copias, las monedas | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | La estrella del bloque 1 vuelve igual para "basado en servicios": la idea vuelve combinada; la moneda arriba de las dos mitades dice el par | Se mantiene |
| 1 | Arquitecto senior | La planilla real tiene diecisiete filas; con seis se ve lo que la voz dice (las cuatro marcadas, y elasticidad y escalabilidad, que explican lo que se paga) | Seis filas, con la fuente en la tabla |
| 1 | Verificador | Las estrellas se copiaron de la imagen, fila por fila; los módulos de Farmacy Food son los de `SystemAppoach.md` | Tabla de verificación con cada fila |
| 1 | Guionista | Las anotaciones a mano no pasan de seis palabras | Sin cambios |
| 1 | Espectador de prueba | "Simplicidad" aparece marcada sin que la voz la nombre; se entiende como parte de "poder pagarlo" | Se acepta: es lo que marcó el equipo |
| 1 | Dirección visual | La planilla llena la pantalla; los nombres de estilo de 24 px se leen a la mitad de tamaño solo en dos renglones | Dos renglones por nombre |
| 1 | Producción | Hace falta el mundo de Farmacy Food en el kit (se agregó también el de Sysops Squad, para el bloque 5); no cambia nada de lo ya producido | `tiza.js`: `farmacy` y `sysops` en `MUNDOS` |
| 2 | Los siete | Lectura seguida: cada frase cambia algo en pantalla y las formas vuelven iguales en la comparación | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 1 y 2 | "planilla de estilos · Mark Richards" va arriba, a la izquierda del centro | Pegada al borde tapaba el sello de ClearView; centrada tocaba la ✕ de la columna elegida |
| 2 | Sin "3 > 2" junto a la casilla de por eventos: queda el óvalo verde | El rótulo caía sobre la fila de abajo |
| 2 | Los óvalos de las casillas se borran con la planilla | Quedaban sueltos sobre la zona de eventos |
| 2 | Los mensajes de la columna por eventos viajan por una flecha arriba de la planilla, en chico | Dentro de la planilla no había lugar sin tapar estrellas |
| 3 | Las señas (equipo chico, salir rápido, poco dinero) se borran al decir «crecer» | Apagadas se encimaban con "servicio, cuando haga falta" y con "disciplina entre módulos" |
| 3 | "el negocio todavía cambia" arriba a la derecha | A la altura de las señas se encimaba con "salir rápido" |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.

| Plano | Estado |
|---|---|
| 0 · Estás aquí | |
| 1 · Una planilla con estrellas | |
| 2 · Lo que eligió ClearView | |
| 3 · Lo que eligió Farmacy Food | |
| 4 · La misma presión, dos formas | |
