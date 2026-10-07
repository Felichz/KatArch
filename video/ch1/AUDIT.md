# Auditoría pedagógica · Capítulo 1 · El terreno de juego

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero, no vio el capítulo escrito y no puede pausar.

Los segundos se estiman a 2,2 palabras habladas por segundo (se cuentan las palabras de `say` cuando existe). Las fuentes son `src/content/es/terreno.ts`, las cadenas `es` de `src/visuals/ch1.tsx` y, del repositorio del equipo (`src/content/original-docs.ts`), *Objetivo de negocio y alcance*, *Restricciones*, *Stakeholders* y *Supuestos*.

## 1. El guion anterior (10 escenas, 503 palabras, unos 3:50)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (40 palabras, 18 s) | Architecture Kata (implícita), pliego, "diseñar la arquitectura", ArchColider | Kata 0 s (no se nombra ni se define), pliego 0 s, arquitectura 0 s | — | **No**: "pliego" y "arquitectura completa" se dan por sabidos. La palabra kata solo está en un subtítulo de pantalla | No: no dice qué es un kata ni por qué importa que el caso sea real | Sí | Gancho visual bueno, pero el espectador no sabe qué está mirando |
| mission (51 palabras, 23 s) | El negocio, el lema, comida para necesidades médicas, sin restaurantes | 5 a 6 s cada uno | Sí | Sí | **A medias**: "¿El truco? No tener restaurantes" sin decir por qué (el rubro más caro) | Sí | Correcta, pero la razón de "sin restaurantes" queda como un acertijo |
| pieces (93 palabras, 42 s) | Ghost kitchen, lotes, refrigerador inteligente, RFID (sin nombrarlo), kiosco, Toast POS, "con y sin personas" | Unos 6 a 8 s cada pieza; Toast POS 0 s | Sí | Ghost kitchen sí. "Toast POS" (POS sin definir) no | **No**: nunca dice por qué importa que haya dos formas de vender (cada una trae problemas distintos) | Sí, salvo los cinco pasos del refrigerador, que se encienden uno por palabra | Bien contada, pero la síntesis no dice para qué sirve |
| users (62 palabras, 28 s) | Tres usuarios, tres formas de pagar, la venta en efectivo invisible | Suscriptor y conocido **en una sola frase de 22 palabras** (unos 5 s cada uno); ocasional 5 s; el detalle 5 s | Sí | A medias: "el conocido reserva desde la app" | No: no dice por qué la forma de pagar importa al arquitecto | Sí | Dos usuarios encadenados en una frase. El detalle clave (efectivo invisible) dura 5 s |
| systems (50 palabras, 23 s) | Byte, Toast, ChefTec, Stripe, QuickBooks, la Plataforma Central, **restricción** | Cinco sistemas **en una frase** (unos 2 s cada uno); plataforma 5 s; restricción **4 s** | No: "Son restricciones" llega como etiqueta | **No**: "restricción" no se define como concepto de arquitectura | **No**: ni qué consecuencia tiene que algo venga dado | No: seis nodos y cinco candados aparecen en unos 8 s | **La falla principal del primer bloque**: el concepto central del capítulo dura 4 s |
| scope (38 palabras, 17 s) | Fuera de alcance (camionetas, firmware, movimientos), "alcance", la primera decisión | Tres exclusiones en **una frase de 26 palabras**; alcance 0 s hablado (solo en pantalla); la regla 4 s | A medias | **No**: "alcance" aparece en un chip, la voz no lo nombra ni lo define. "Firmware" sin definir | **No**: por qué decidir qué no resolver es una decisión (un equipo pequeño no puede con todo) | No: tres tarjetas tachadas en unos 10 s | Lista de tres en una línea; el concepto queda sin nombre |
| (no existía) | Diagrama de contexto | **0 s** | — | — | — | — | El dibujo de `systems` es un diagrama de contexto, pero nunca se dice que es una herramienta, ni qué muestra, ni por qué va primero |
| numbers (46 palabras, 21 s + 3 s de pausa) | Locaciones y comidas, "peticiones por segundo", "hora pico", el "piénsalo tú" | Números 7 s; la pregunta 6 s | — | **No**: "petición por segundo" y "tráfico" se usan sin definir | **No**: por qué un arquitecto mide en peticiones por segundo | Sí | **El "piénsalo tú" llega sin herramientas**: el espectador no sabe pasar de comidas por día a peticiones por segundo, así que adivina |
| rate (32 palabras, 15 s) | La división por 86.400, el segundo ampliado | La cuenta 6 s; el segundo 3 s; la respuesta 4 s | — | "86.400" sin decir que son los segundos de un día | A medias | **No**: 42 puntos, el eje, la lupa y la cuenta en 15 s | Respuesta apurada; el método (dividir por los segundos del día) nunca se enseña como método |
| growth (44 palabras, 20 s) | 8 y 68 locaciones, 1.000 suscriptores × 10, 10.000 por semana, la vara de 604.800, el 2 % | **Seis números en dos frases** (unos 3 s cada uno); la vara 4 s, sin decir de dónde sale | — | **No**: no explica que 604.800 son los segundos de una semana | No | No: cuatro barras que cambian de escala en 1 s | Ráfaga de números: imposible seguirla sin pausar |
| outro (47 palabras, 21 s) | "Guarda el número", adelanto del capítulo 2 | 5 s; 10 s | — | — | **No**: "todavía no sabes para qué sirve" (lo dice textual) | Sí | No repasa las ideas del capítulo y deja sin explicar por qué el número importa |

### Dónde se pierde el espectador tipo

- **"¿Qué es una Architecture Kata? ¿Qué es un pliego?"** El capítulo arranca con diez equipos y un pliego sin decir qué es ninguna de las dos cosas. Tampoco dice qué significa "diseñar la arquitectura".
- **"¿Por qué sin restaurantes?"** Se plantea como truco, sin la razón (son el gasto más caro de un negocio de comida).
- **"Vale, tres piezas. ¿Y qué?"** Las piezas pasan bien, pero nadie dice por qué importa al sistema que una venda sin personas y otra con personas.
- **"¿Por qué me cuentan cómo paga cada cliente?"** El suscriptor y el conocido se despachan en la misma frase. El dato que vuelve en capítulos futuros (la venta en efectivo invisible) dura 5 s.
- **"¿Qué es una restricción, en arquitectura?"** Se usa como etiqueta. No se define, ni se dice qué consecuencia tiene: la plataforma se adapta a lo que recibe, no al revés.
- **"¿Qué es el alcance? ¿Por qué decidir qué no hacer es una decisión?"** El nombre no se pronuncia. Tres exclusiones caen en una sola frase y la regla se enuncia sin porqué.
- **"¿Qué es este dibujo?"** El diagrama de contexto aparece sin nombre, sin qué muestra (una caja cerrada y su entorno) y sin por qué se dibuja primero.
- **"¿Qué es una petición por segundo y por qué me importa?"** La medida que gobierna el resto del curso no se define ni se justifica.
- **"¿Cómo hago la cuenta?"** Se pregunta antes de enseñar a pasar de comidas por día a peticiones por segundo.
- **"Pero una compra no es una sola petición."** La objeción natural de un desarrollador queda sin respuesta.
- **"¿De dónde sale 604.800?"** La vara aparece sin explicación, entre otros cinco números.
- **"¿Para qué sirve este número?"** El guion lo admite ("todavía no sabes para qué sirve") y nunca lo dice.
- **"¿Qué me llevo?"** No hay repaso.

## 2. El plan

### Las ideas esenciales del capítulo

1. **Primero, el negocio.** Comida para necesidades médicas, a precio de comida rápida, sin restaurantes. Tres piezas físicas (una cocina, dos formas de vender: sin personas y con personas) y tres clientes que se distinguen por cómo pagan. Cada forma de vender y de pagar le trae al sistema un problema distinto, y la venta en efectivo no avisa al sistema central.
2. **Separar lo que recibes de lo que construyes.** Casi todo el software ya existía: eso son **restricciones** (algo que viene dado y alrededor de lo cual diseñas). El pliego dice por escrito qué queda afuera: eso es el **alcance**. Y el **diagrama de contexto** pone las dos cosas en un dibujo: el sistema como caja cerrada, con quién habla.
3. **Hacer la cuenta antes de elegir herramientas.** Qué es una petición y por qué se mide por segundo (dice cuánta maquinaria hace falta). Cómo se pasa de comidas por día a peticiones por segundo (dividir por 86.400), con un ejemplo trabajado. Recién entonces, el "piénsalo tú". Después, la respuesta, la objeción de las peticiones por compra, el crecimiento contra una vara explicada, y para qué sirve el número.

### Qué recibe más espacio

- **El kata, el pliego y la arquitectura**, definidos en la intro en una línea cada uno (unos 35 s en total).
- **La razón de cada cosa del negocio**: sin restaurantes porque son el gasto más caro; dos formas de vender porque cada una trae problemas distintos.
- **Restricción**: de 4 s a unos 30 s, con su definición, su consecuencia (la plataforma se adapta a Byte, no al revés) y la síntesis.
- **Alcance**: de 0 s hablados a unos 38 s, con una exclusión por frase, el nombre, la definición y el porqué (un equipo pequeño no puede con todo).
- **Diagrama de contexto**: escena nueva (unos 33 s), armado por partes antes de nombrarlo.
- **Los números**, de unos 55 s a unos 2:50, en cinco escenas: la unidad y su porqué (`count`), el método con ejemplo trabajado y la pregunta (`convert`), la respuesta con el día de puntos y el segundo ampliado (`rate`), el crecimiento contra una vara explicada (`growth`) y para qué sirve el número (`why`).
- **Un repaso final** de las tres ideas, cada una con su pausa.

### Qué se recorta

- **Los nombres de los cinco sistemas como lista hablada.** La voz dice las cinco funciones (refrigeradores, kioscos, cocinas, pagos, contabilidad) y los proveedores quedan en pantalla, como subtítulo de cada caja.
- **"Toast POS"**: queda "terminal Toast", sin la sigla.
- **El crecimiento en locaciones (2, 8, 68)** y la meta de 1.500 a 2.000 comidas: la voz se queda con la cifra más alta (1.000 suscriptores, 10.000 comidas) y la compara con la vara. El curso escrito cubre el resto.
- **El "ideal" del suscriptor y la conversión de ocasionales en suscriptores**: es un objetivo de negocio que el capítulo 3 presenta en su escena de trazabilidad.
- **Las otras restricciones del pliego** (equipo pequeño, prisa, presupuesto): el capítulo 4 las presenta con su consecuencia. Aquí solo aparece "un equipo pequeño" como razón del alcance.
- **El jurado**: lo presenta el capítulo 2.

### Las escenas nuevas

| # | id | Kicker | Qué enseña |
| - | - | - | - |
| 1 | `intro` | Capítulo 1 | Qué es una Architecture Kata, qué es un pliego, qué es diseñar la arquitectura. Farmacy Food y ArchColider. "Antes de diseñar, conocer el terreno" |
| 2 | `mission` | El negocio | El negocio y su lema; comida para necesidades médicas a precio de comida rápida; sin restaurantes, porque son el gasto más caro |
| 3 | `pieces` | Las piezas físicas | Ghost kitchen por lotes, refrigerador que se cobra solo, kiosco con cajero. Una cocina, dos formas de vender, problemas distintos |
| 4 | `users` | Quién compra | Tres clientes, uno por frase, según cómo pagan. La venta en efectivo no avisa al sistema central |
| 5 | `systems` | Lo que ya existía | Casi todo existía; solo se construye la Plataforma Central. Restricción: definición, consecuencia y síntesis |
| 6 | `scope` | El alcance | Tres exclusiones, una por frase. Alcance: nombre, definición, porqué. Primera decisión de un arquitecto |
| 7 | `context` | El mapa | El diagrama armado por partes; su nombre; qué muestra (caja cerrada); por qué va primero |
| 8 | `count` | Los números | 2 locaciones, 300 por semana, 42 por día. Qué es una petición y por qué se mide por segundo (dice cuánta maquinaria hace falta) |
| 9 | `convert` | Los números | Dividir por 86.400 (de dónde sale); ejemplo: un millón por día son unas 12 por segundo; "piénsalo tú" con la herramienta en pantalla |
| 10 | `rate` | Los números | La respuesta; una venta cada media hora; el día de puntos y el segundo vacío; aun con diez peticiones por compra, lejos de una por segundo |
| 11 | `growth` | Los números | La meta más alta (10.000 por semana) contra la vara de una petición por segundo durante una semana (604.800): menos del 2 % |
| 12 | `why` | Para qué sirve | Cada servidor se paga para aguantar carga; con carga casi cero, es dinero que no hace falta gastar todavía. La regla |
| 13 | `outro` | Para llevarte | Repaso de las tres ideas y adelanto del capítulo 2, "El dilema del podio" |

## 3. El guion nuevo (13 escenas, 960 palabras)

**Duración estimada:** a 2,2 palabras por segundo, más las pausas escritas (unos 31 s), da unos 7:45. Al ritmo real que midió el capítulo 4 con esta misma voz (2,28 palabras por segundo, contando los silencios entre frases), da unos 7:30. `node tools/timing.mjs estimate` da 493 s (8:13), porque su narrador simulado es más lento que la voz real. Queda por encima de los 7 minutos: el guion anterior duraba la mitad porque nombraba los conceptos sin explicarlos. Antes de quitar más, ya se recortaron los nombres de sistemas como lista, el crecimiento en locaciones, el suscriptor ideal y las demás restricciones. Lo que queda sostiene las tres ideas.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (35 s) | Architecture Kata; pliego; arquitectura | Kata y pliego 9 s (con la escena de los diez equipos alrededor del pliego); arquitectura 7 s, con un dibujo genérico de piezas que se hablan | Sí: los diez equipos y el pliego antes de la palabra | Sí, en una línea cada uno | Sí: "antes de diseñar nada, hay que conocer el terreno" | Sí: el anillo, el pliego y el dibujo llegan uno por frase | Correcta. Son definiciones de andamiaje, no conceptos del capítulo |
| mission (25 s) | El negocio; sin restaurantes | Negocio 18 s; sin restaurantes 6 s + 1 s de pausa | Sí | Sí | **Sí**: el gasto más caro de un negocio de comida | Sí: la cita palabra por palabra, después los chips y el tachado | Correcta |
| pieces (46 s) | Tres piezas; dos formas de vender | Unos 8 a 9 s por pieza; síntesis 8 s + pausas | Sí | Sí: ghost kitchen, refrigerador que se cobra solo, kiosco con cajero | **Sí**: cada forma de vender trae problemas distintos | Sí: cada pieza aparece con su frase; los cinco pasos del refrigerador se encienden con la voz | Correcta |
| users (33 s) | Tres clientes; la venta invisible | Cada cliente en su frase, 6 a 7 s; el detalle 9 s + 1 s de pausa | Sí | Sí | Sí: los distingue cómo pagan; el efectivo no avisa al sistema | Sí: un cliente iluminado por frase, con su medio de pago viajando por el cable | Correcta. Es contexto; el problema del efectivo vuelve en capítulos futuros |
| systems (44 s) | Lo que ya existía; la Plataforma Central; **restricción** | Lo existente 10 s; la plataforma 8 s; **restricción 30 s** (lo recibido 6 s, nombre y definición 6 s, consecuencia 8 s, síntesis 5 s, pausas 3 s) | **Sí**: cinco piezas que el arquitecto recibe, y después el nombre | Sí: "algo que viene dado, y alrededor de lo cual diseñas", en tarjeta | **Sí**: la plataforma se adapta a Byte, no al revés | Sí: la tarjeta de la definición queda hasta el final de la escena | Correcta |
| scope (38 s) | **Alcance**; la primera decisión | Exclusiones 15 s (una por frase); **alcance 23 s** (nombre y definición 8 s, porqué 7 s, regla 5 s, pausas) | **Sí**: las tres exclusiones antes del nombre | Sí: "la línea entre lo que el sistema resuelve y lo que no" | **Sí**: un equipo pequeño no puede con todo; lo que queda afuera es trabajo ahorrado | Sí: cada tarjeta se tacha con su frase; el borde punteado aparece con el nombre | Correcta |
| context (33 s) | **Diagrama de contexto** | **33 s**: el dibujo armado 13 s, nombre 3 s, qué muestra 8 s, porqué 6 s, pausas 3 s | **Sí**: el dibujo se arma antes de nombrarlo | Sí: "el sistema como una caja cerrada: con quién habla, y nada de cómo está hecho por dentro" | Sí: antes de discutir el interior, se acuerdan los bordes | Sí: la caja se "cierra" visualmente y el rótulo queda en pantalla | Correcta |
| count (34 s) | Los números del pliego; **petición por segundo** | Números 9 s; **petición por segundo 24 s** (la medida 4 s, definición 8 s, porqué 8 s, pausas) | Sí: primero las comidas, después la medida del arquitecto | Sí: "cada vez que alguien le pide algo al servidor" | **Sí**: dice cuánta maquinaria hace falta; muchas peticiones exigen muchos servidores | Sí: las tarjetas cuentan, después la fila de clientes y servidor, después la fila de mucha carga con seis servidores | Correcta |
| convert (28 s + 3 s de silencio) | **El método**: dividir por 86.400; "piénsalo tú" | Método 9 s; ejemplo 8 s; pregunta 7 s + 3 s con el anillo | — | Sí: 86.400 se explica en pantalla (24 h × 3.600 s) | Sí | Sí: la ecuación y el ejemplo se arman por partes; la herramienta "42 ÷ 86.400 = ?" queda junto a las opciones | Correcta. **El "piénsalo tú" llega después de la herramienta y del ejemplo** |
| rate (35 s) | La respuesta; el segundo vacío; la objeción de varias peticiones por compra | Respuesta y cuenta 9 s; el día y el segundo 14 s; la objeción 7 s; pausas 3 s | — | Sí | Sí: una venta cada media hora; aun en hora pico, menos de una por minuto; aun con diez peticiones por compra, lejos de una por segundo | Sí: el eje aparece con su frase, los puntos con "cada punto es una venta", la lupa con "ampliemos" | Correcta |
| growth (34 s) | La meta más alta; **la vara** | Meta 8 s; **vara 8 s**, explicada; comparación 6 s; síntesis 5 s; pausas 3 s | — | Sí: "una petición por segundo, sin parar, toda una semana" | Sí: ni hoy ni en la meta se llega a una por segundo | Sí: dos barras, después la vara, después el reescalado, con la cuenta debajo | Correcta. Se dejó un solo número de crecimiento para no hacer una ráfaga |
| why (19 s + 2,5 s de pausas) | Para qué sirve el número; la regla | **21 s** | Sí: los servidores y su costo antes de la regla | Sí | **Sí**: cada servidor se paga para aguantar carga; con carga casi cero, es dinero que no hace falta gastar todavía | Sí: la regla queda en pantalla con 1,5 s de pausa | Correcta. Se apoya en `count` (la medida dice cuánta maquinaria hace falta), así que la idea completa recibe unos 45 s |
| outro (34 s) | Repaso de las tres ideas; adelanto | Cada idea 5 a 7 s, con pausa; adelanto 12 s | — | — | — | Sí: las tres tarjetas quedan juntas hasta el final del repaso | Correcta |

**Ningún concepto importante queda por debajo de unos 20 s.** Restricción (30 s), alcance (23 s), diagrama de contexto (33 s), petición por segundo (24 s) y el método de conversión con su ejemplo (17 s, más la pregunta que lo aplica y la respuesta que lo repite en `rate`) tienen caso, nombre, definición, porqué y síntesis. Kata, pliego y arquitectura son definiciones de andamiaje en una línea.

### Verificación

- `node tools/timing.mjs estimate`: 13 escenas, 72 líneas, 493 s estimados.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, runtime y layout. Contraste: 93 de 93 textos pasan WCAG AA. La única advertencia es la esperada de `#chrome`. Los dos avisos informativos de superposición son intencionales (las cajas "¿?" de las piezas debajo de la pieza real, y la palabra "medicina" cuando late).
- Capturas en `snapshots/peda` (al final de cada frase), `snapshots/peda2` (a mitad de escena) y `snapshots/peda3`. A partir de ellas se corrigieron: el chip de síntesis de las piezas, que tapaba "con personas"; la cita de la misión, que rozaba el chip de Detroit; el arranque de `context`, que dejaba la pantalla vacía; el rayado de la caja cerrada, que no dejaba leer el nombre de la plataforma; el eje del día, que aparecía antes de que la voz lo nombrara; el borde de la barra de la vara, que se veía antes de crecer; y la etiqueta de la segunda barra, que se salía del margen.
