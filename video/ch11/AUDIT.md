# Auditoría pedagógica · Capítulo 11 · Guía de campo

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero, no vio el capítulo escrito y no puede pausar. En este capítulo hay un riesgo extra: es el último, y llega después de diez capítulos que el espectador quizás vio hace días o semanas.

Los segundos se estiman a 2,2 palabras habladas por segundo (se cuentan las palabras de `say` cuando existe).

## 1. El guion anterior (8 escenas, 515 palabras, unos 3:55)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (34 palabras, 15 s) | "Diez decisiones, tres pilares y sus hilos" (recuerdo del capítulo 10); el método | Recuerdo 7 s; método 7 s | No: abre con jerga del capítulo 10 sin decir qué caso es | No: "pilares" e "hilos" se dan por sabidos | — | No: 10 tarjetas con "Event sourcing", "Cola con acuse", "Identidad en el borde" aparecen y se van en 6 s | Floja: nunca dice qué es Farmacy Food, y el espectador del último capítulo puede no recordarlo |
| method (46 palabras, 21 s) | Los cuatro pasos; los capítulos donde ocurrió cada uno; "el orden es parte del método" | Cuatro pasos en una sola línea de 14 palabras (unos 1,5 s cada uno); capítulos 0 s hablados (11 números en círculos) | — | No: cada paso es un eslogan | No: "el orden también es parte del método" se afirma sin decir por qué | Los círculos con números de capítulo aparecen sin que la voz diga qué pasó en cada uno | Lista de cuatro eslóganes; los números de capítulo no anclan nada si el espectador no recuerda el capítulo |
| understand (77 palabras, 35 s) | Primera semana sin diagramas; "el número que desempata"; 42 comidas y menos de una petición por segundo; cuatro decisiones del número | Semana 6 s; número 6 s; 42 comidas 8 s; **cuatro decisiones en una sola frase de 21 palabras (unos 2,5 s cada una)** | Sí para el número | "Monolito modular", "escalar en vertical", "capa gratis de Here Maps" sin definir | No: no dice por qué el número lleva a cada decisión, ni qué habría pasado sin él | No: cuatro tarjetas con subtítulos (unas 40 palabras) en los últimos 10 s | Buen núcleo, comprimido: la parte que enseña (por qué un número decide tanto) pasa en una frase |
| principles (63 palabras, 29 s) | "Desempates"; guerra de gustos; cuatro principios con su empate y su decisión | Desempate 5 s; **cada fila (empate, principio y decisión) unos 6 s** | No: el nombre "desempates" llega antes del caso | No: "simplicidad cognitiva", "evolucionabilidad", "telemetría" y "mensajes" solo se nombran | No: no se dice de dónde salen los principios (las restricciones), ni por qué cada uno decide lo que decide | **No**: una tabla de 4 filas por 3 columnas (unas 60 palabras) se arma en 24 s | **Falla**: las filas problema → respuesta pasan a la carrera; cuatro términos sin definir |
| reality (93 palabras, 42 s) | "Realidad física"; la pregunta "¿qué le pasa al negocio cuando esto falla?"; cinco problemas con su respuesta | Pregunta 8 s; **cinco problemas en tres frases (unos 5 s cada uno)**; síntesis 6 s | No: el caso se resume en eslóganes ("un PIN generado de antemano") | No: "PIN generado de antemano", "guardada como eventos", "pasarela" sin explicar | No: ninguna respuesta dice cómo funciona ni por qué resuelve el problema | No: 10 tarjetas en unos 26 s | **Falla**: cinco recuerdos de capítulos distintos sin re-anclar ninguno; el espectador no recuerda qué es "guardar como eventos" |
| bill (87 palabras, 40 s + 3 s) | La factura; el monitoreo como línea más cara; piénsalo; Grafana y ELK; el costo incluye a las personas; único análisis de costos | Factura 7 s; monitoreo 5 s; piénsalo 10 s; respuesta 9 s; regla 4 s; finalistas 5 s | Sí para el piénsalo | "Monitoreo", "Grafana", "ELK" sin definir | A medias: "exigían mantenimiento propio", sin el dato del equipo (de 0,2 a 0,5 de un desarrollador) | La factura (5 filas) y el total se arman en 6 s; los números se recitan rápido | Aceptable en estructura, apurada en números. La pregunta llega sin la herramienta clave (que el equipo es pequeño y lo gratis lo mantiene alguien) |
| order (46 palabras, 21 s) | Qué deja cada paso que falta | Unos 4 s por paso | — | — | No: dice qué pasa sin cada paso, no por qué cada uno alimenta al siguiente | Tarjetas de unas 10 palabras cada 4 s | Floja: cuatro consecuencias en dos frases dobles |
| outro (69 palabras, 31 s) | Las cuatro preguntas; los repositorios; el cierre | **Cuatro preguntas en una sola frase de 23 palabras (unos 3 s cada una)**; repos 7 s; cierre 9 s | — | — | — | Las filas tienen textos largos y números de capítulo | Floja: el momento que el espectador se lleva pasa en 10 s, y el cierre del curso es una frase |

### Dónde se pierde el espectador tipo y qué preguntaría

- **"¿De qué caso hablamos?"** El capítulo abre con "diez decisiones, tres pilares y sus hilos". Quien vuelve al curso después de unos días no recuerda qué es Farmacy Food: refrigeradores que venden comida saludable en Detroit. Falta una frase que re-ancle el caso.
- **"¿Qué significa cada paso?"** Los cuatro pasos llegan como eslóganes en una sola línea. "Fijar principios" o "diseñar para la realidad" no le dicen al espectador qué hacer el lunes.
- **"¿Qué pasó en el capítulo 6?"** Las referencias son números de capítulo ("desde el capítulo 5", "Cap. 6 · ADR 011"). Sin una frase que cuente lo que pasó en el caso, el número no ancla nada.
- **"¿Por qué un solo número decide un monolito, una máquina más grande y mil dólares al mes?"** Las cuatro decisiones se recitan en una frase, sin el razonamiento: poco tráfico, entonces no hace falta repartir el sistema ni comprar maquinaria.
- **"¿Qué es la simplicidad cognitiva? ¿La evolucionabilidad? ¿La telemetría?"** Se nombran en filas de 6 s. Tampoco se dice qué es un principio ni de dónde salen (de las restricciones del caso).
- **"¿Qué es un PIN generado de antemano? ¿Cómo abre el refrigerador sin señal?"** Cinco problemas → respuestas en 26 s, cada uno un eslogan. Ninguno se desarrolla, así que la pregunta "¿qué le pasa al negocio cuando esto falla?" queda como frase y no como hábito.
- **"¿Qué es guardar una orden como eventos? ¿Qué es una pasarela?"** Términos de capítulos anteriores, sin definir.
- **"¿Por qué saldría más barato pagar?"** La pregunta del piénsalo llega sin recordar que el equipo es pequeño y que lo gratis lo mantiene alguien. La respuesta no da el dato del equipo (de un quinto a la mitad de un desarrollador).
- **"¿Y cómo aplico esto a mi sistema?"** Es la promesa del capítulo, y es lo que menos espacio recibe: las cuatro preguntas aparecen juntas en una frase al final, sin el caso que respalda cada una.
- **"¿Por qué ese orden?"** Se afirma dos veces y nunca se muestra el hilo que une los pasos en el caso.
- **Ritmo**: una sola pausa en todo el capítulo (los 3 s del piénsalo). Ninguna escena cierra con una síntesis, y el curso termina con una línea de agradecimiento.

## 2. El plan

### Las ideas esenciales del capítulo

1. **El método son cuatro pasos, y cada uno se convierte en una pregunta que el espectador se lleva.** Cada paso sigue el mismo patrón: qué hizo el equipo (caso), por qué (con los hechos del caso), y la pregunta general para tu próximo sistema. El patrón se anuncia en `method` y se repite en una tarjeta al final de cada paso.
2. **Cada paso, con un ejemplo trabajado del caso y su porqué.**
   - Paso 1: la primera semana sin diagramas, y la cuenta de 42 comidas por día → menos de una petición por segundo. Después, por qué ese número decidió una sola aplicación, una máquina más grande, la capa gratis de mapas y unos 1.000 USD por mes, y qué habría costado diseñar para miles por segundo.
   - Paso 2: qué es un principio (un desempate acordado de antemano), de dónde salen (las restricciones), y un empate resuelto paso a paso: ¿muchos servicios o una sola aplicación? La simplicidad, la evolucionabilidad y la telemetría lo deciden entre las tres.
   - Paso 3: un solo caso desarrollado, el refrigerador sin señal y el PIN, contado de punta a punta. Después la pregunta que lo generó y dos respuestas más, cada una en su frase con su término definido.
   - Paso 4: la factura de un año, la línea más cara, la opción gratis, el piénsalo (con las herramientas dadas antes) y el dato del equipo: de un quinto a la mitad de un desarrollador.
3. **El orden importa, porque cada paso alimenta al siguiente.** Se muestra como un solo hilo del caso: el número → la simplicidad → una sola aplicación preparada para fallar → unos 1.000 USD por mes. Y qué pasa si se saca el primero.
4. **El cierre del curso**: las cuatro preguntas, una por vez; qué puede hacer ahora el espectador; dónde están los documentos; la tarjeta final.

### Qué recibe más espacio

- **Cada paso pasa de unos 30 s a unos 80 s**, en dos escenas: el caso trabajado y, después, la generalización con su pregunta.
- **El re-anclaje del caso** en la intro (qué es Farmacy Food) y en cada recuerdo: en vez de "capítulo 6", se cuenta lo que pasó (un refrigerador en el sótano de un hospital pierde la señal).
- **Las cuatro preguntas para llevar**: cada una tiene su tarjeta propia al final de su paso, con el caso arriba ("en el caso: 42 comidas por día…") y la acción abajo ("haz la cuenta antes de elegir herramientas"), de 8 a 10 s en pantalla. En el `outro` se repasan las cuatro juntas.
- **Los números de la factura**: un número por frase, con la factura en pantalla y el total contando.
- **Pausas**: 12 pausas escritas (de 1 a 3 s), una después de cada idea clave y una al cerrar cada paso.

### Qué se recorta (lo cubre el curso escrito)

- Los **números de capítulo** como anclas (círculos y "Cap. 6 · ADR 011"): se reemplazan por una frase sobre lo que pasó en el caso.
- El cuarto principio (**mensajes antes que llamadas**): no entra en el empate trabajado, y nombrarlo sin desarrollarlo era otro término sin definir.
- Dos de los cinco problemas del paso 3: **el stock que llega tarde** y **la comida trabada**. Quedan el PIN (desarrollado) y dos respuestas en una frase cada una: el reclamo de un cobro y la pasarela caída.
- **Grafana, ELK y DataDog** como nombres hablados: quedan solo en pantalla. La voz dice "herramientas open source" y "el monitoreo, que vigila que todo funcione".
- Los escenarios de 12.548 y 22.481 USD, y el desglose de la línea "todo lo demás".
- La lista de "qué pasa si te saltas cada paso": queda un solo ejemplo concreto (sin el paso 1).

### La lista nueva de escenas

| # | id | Kicker | Qué hace |
| - | - | - | - |
| 1 | `intro` | Capítulo 11 | Re-ancla el caso (Farmacy Food, refrigeradores, Detroit) y lo que vio el espectador (por qué se decidió cada pieza). Se saca el caso y queda un método. Título. |
| 2 | `method` | El método | Los cuatro pasos, uno por vez y en orden, y el patrón con que se va a contar cada uno: qué hizo el equipo, por qué, tu pregunta. |
| 3 | `understand` | Paso 1 · Entender | La primera semana sin diagramas (objetivos, restricciones, preguntas). El dato que buscaban. 42 comidas repartidas en 24 horas: menos de una petición por segundo, frente a los miles de una app masiva. |
| 4 | `yard` | Paso 1 · Entender | Lo que decidió ese número, una decisión por frase, y lo que habría costado diseñar para miles por segundo. Tarjeta: "¿qué volumen tiene de verdad tu sistema?". |
| 5 | `principles` | Paso 2 · Principios | La guerra de gustos. Qué es un principio. Firmados antes de cualquier tecnología y sacados de las restricciones: equipo pequeño → simplicidad. |
| 6 | `tiebreak` | Paso 2 · Principios | El empate del caso trabajado: ¿muchos servicios o una sola aplicación? Simplicidad, evolucionabilidad y telemetría, cada una con su aporte. Resultado. Tarjeta: "¿qué criterios van a desempatar?". |
| 7 | `reality` | Paso 3 · Realidad | El refrigerador en el sótano sin señal y el cliente que ya pagó. Las dos malas respuestas. El PIN preparado mientras hay señal, validado sin ella, y el aviso al volver. |
| 8 | `ready` | Paso 3 · Realidad | La pregunta detrás: ¿qué le pasa al negocio cuando esto falla? Dos respuestas más (la historia de cada orden, los reintentos de pago). Síntesis. Tarjeta: "¿qué va a fallar en tu mundo real?". |
| 9 | `bill` | Paso 4 · La factura | Por qué la factura (el cliente paga una cuenta cada mes). El costo de un año. La línea más cara: el monitoreo. La opción gratis. Piénsalo tú (3 s) y la respuesta. |
| 10 | `hours` | Paso 4 · La factura | De un quinto a la mitad de un desarrollador. Las horas valen más que la suscripción. La regla. El único análisis de costos entre diez finalistas. Tarjeta: "¿cuánto cuesta tu sistema por año?". |
| 11 | `order` | El orden | El hilo del caso a través de los cuatro pasos, y qué pasa si se saca el primero. |
| 12 | `outro` | Para llevarte | Las cuatro preguntas, una por vez. Lo que ya puedes hacer. Los repositorios públicos. Fin del curso. |

## 3. El guion nuevo (12 escenas, 930 palabras)

**Duración estimada:** a 2,2 palabras por segundo, más los 23 s de pausas escritas, da unos 7:26. `node tools/timing.mjs estimate` da 477 s (7:57), porque su narrador simulado es más lento que la voz real. Al ritmo que tuvo la voz real en el capítulo 4 (unas 2,28 palabras por segundo, contando los silencios entre frases), quedaría en unos **6:50**. Las 930 palabras incluyen los números dichos en letras (`say`). Para no pasar de ahí se recortaron dos de los cinco problemas del paso 3, el cuarto principio y los escenarios de costo.

| Escena | Conceptos nuevos | Segundos que recibe cada uno (a 2,2 palabras/s, más pausas) | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (46 palabras) | Re-anclaje del caso; "quitar el caso y queda un método" | Caso 9 s; lo que viste 4 s; método 6 s, más 1 s | Sí: primero Farmacy Food, después el método | Sí: "refrigeradores que venden comida saludable en Detroit" | — | Sí: una tarjeta del caso, un mapa de 9 decisiones en palabras simples (como textura) y los 4 pasos | Bien (es andamiaje) |
| method (42 palabras) | Los cuatro pasos; el patrón de cada paso | Pasos 7 s, más 1 s (cada uno aparece cuando se dice, y después recibe ~80 s propios); patrón 9 s, más 1 s | — | Cada paso tiene un subtítulo en pantalla; se desarrollan en sus escenas | Sí: se anuncia que cada paso tendrá su porqué | Sí: las 3 tarjetas del patrón quedan ~8 s | Bien (es una hoja de ruta, no un concepto) |
| understand (88 palabras) | Primera semana sin diagramas; el dato que pesa más; 42 comidas → menos de una petición por segundo | Semana ~14 s; el dato ~6 s, más 1 s; la cuenta ~18 s, más 1 s (**paso 1, 42 s en esta escena**) | Sí: primero lo que hizo el equipo, después la regla | Sí: "cuánto trabajo tiene el sistema de verdad" | Sí: es el dato que desempata todo lo demás | Sí: un día de 24 h con 42 puntos, y la comparación con una app masiva queda ~5 s | Bien |
| yard (76 palabras) | Las decisiones de ese número; el costo de diseñar para lo imaginario; la pregunta del paso 1 | Una sola aplicación ~5 s; una máquina más grande ~3,5 s; mapas y 1.000 USD ~8 s, más 1 s; costo de lo imaginario ~7 s; pregunta ~7 s, más 1,2 s (**paso 1, ~80 s en total**) | Sí | Sí: "una sola aplicación, ordenada en módulos"; "una máquina más grande, no varias" | **Sí**: poco tráfico, entonces no hacen falta muchos servicios; diseñar para miles es pagar cada mes maquinaria que nadie usa | Sí: cada decisión aparece con su frase y queda; la tarjeta queda ~9 s | Bien. Las decisiones son recuerdos de capítulos anteriores, re-anclados en una frase cada una |
| principles (83 palabras) | Guerra de gustos; principio; principios destilados de las restricciones | Guerra ~12 s, más 1 s; principio ~7 s; destilados ~7 s; ejemplo (simplicidad) ~9 s, más 1 s (**~38 s**) | **Sí**: primero dos personas trabadas, después el nombre | Sí: "un desempate acordado de antemano: una regla corta que dice qué pesa más"; simplicidad: "si algo no se explica fácil, se descarta" | Sí: el equipo era pequeño y tenía poco presupuesto | Sí: la definición queda en pantalla toda la segunda mitad (~23 s) | Bien |
| tiebreak (94 palabras) | El empate trabajado; evolucionabilidad; telemetría; la pregunta del paso 2 | Empate ~7 s; simplicidad aplicada ~8 s; evolucionabilidad ~10 s; telemetría ~5 s, más 1 s; resultado ~5 s; pregunta ~8 s, más 1,2 s (**paso 2, ~85 s en total**) | Sí: el empate antes de los principios | Sí: evolucionabilidad, "módulos bien separados, para que una pieza pueda salir"; telemetría, "medir cada módulo" | Sí: con menos de una petición por segundo, la complejidad no se paga; la evolucionabilidad viene de la meta de crecer | Sí: cada principio deja su fila y su efecto en el diagrama (tachado, módulos, la pieza que sale) | Bien. Evolucionabilidad y telemetría reciben ~10 s y ~6 s: son recuerdos de los capítulos 3 y 4, definidos en una línea, al servicio del ejemplo |
| reality (89 palabras) | El caso del refrigerador sin señal; el PIN preparado de antemano | Caso ~9 s; malas respuestas ~9 s, más 1 s; PIN ~10 s; sin señal ~8 s, más 1 s (**~40 s en un solo caso**) | **Sí**: el problema completo antes de la respuesta | Sí: cómo funciona el PIN, paso a paso | Sí: abrirle a cualquiera es robo y hacerlo esperar lo deja sin comida | Sí: el diagrama se arma frase por frase (nube, refrigerador, cliente, PIN, retiro, aviso) | Bien |
| ready (94 palabras) | La pregunta del paso 3; la historia de cada orden; la pasarela de pago; la pregunta para llevar | Pregunta ~9 s; reclamo ~10 s; pasarela ~9 s, más 1 s; síntesis ~6 s; pregunta ~9 s, más 1,2 s (**paso 3, ~85 s en total**) | Sí: la pregunta llega después de ver el caso del PIN | Sí: "cada orden guarda lo que le pasó, paso a paso, con su hora"; "la pasarela, el servicio que cobra la tarjeta" | Sí: es la evidencia ante un reclamo; las órdenes no se pierden si el pago se cae | Sí: tres filas de dos tarjetas, cada una con su frase; quedan ~10 s juntas | Bien |
| bill (98 palabras) | Por qué la factura; el costo de un año; la línea más cara; la opción gratis; piénsalo | Factura ~10 s; costo anual ~8 s; monitoreo ~10 s; opción gratis ~6 s; piénsalo ~6 s, más 3 s con el anillo; respuesta ~3 s | Sí: la factura antes de la pregunta | Sí: "el monitoreo, que vigila que todo funcione"; "herramientas open source, mantenidas por el propio equipo" | Sí: el cliente paga una cuenta cada mes, y un diseño sin costo no se puede comparar | Sí: la factura queda ~25 s; el total cuenta mientras se dice; la pregunta tiene 2 opciones cortas | Bien. El piénsalo llega después de dar las herramientas: equipo pequeño, y lo gratis lo mantiene alguien |
| hours (74 palabras) | El costo en horas; la regla; el único análisis de costos; la pregunta del paso 4 | Horas ~8 s; comparación ~7 s, más 1 s; regla ~6 s; finalistas ~6 s; pregunta ~6 s, más 1,2 s (**paso 4, ~80 s en total**) | Sí | — | Sí, con el dato del equipo: de un quinto a la mitad de un desarrollador | Sí: la barra del desarrollador, la comparación y la regla, cada una con su frase | Bien |
| order (65 palabras) | El orden como hilo | Por qué el orden ~6 s; el hilo ~19 s, más 1 s; sin el paso 1 ~6 s (**~31 s**) | Sí: el hilo del caso antes de la conclusión | — | Sí: cada paso usa lo que dejó el anterior | Sí: una tarjeta "en el caso" bajo cada paso, unidas por un cable | Bien |
| outro (81 palabras) | Repaso de las 4 preguntas; lo que ya puedes hacer; fuentes; cierre del curso | Preguntas ~11 s, más 1,2 s (una fila por pregunta, en el momento en que se dice); lo que ya puedes hacer ~9 s; repos ~6 s; cierre ~6 s, más la tarjeta final ~3 s | — | — | — | Sí: la tarjeta de las 4 preguntas queda ~12 s; la tarjeta final queda hasta el fin | Bien |

**Ningún concepto importante queda por debajo de unos 20 s.** Cada paso del método recibe unos 80 a 85 s, repartidos entre el caso trabajado, su porqué y la pregunta para llevar. Los elementos de menos de 10 s son recuerdos de capítulos anteriores al servicio de un ejemplo (las decisiones del número, la evolucionabilidad, la telemetría, la historia de la orden, la pasarela), cada uno re-anclado en una frase de lenguaje simple.

### Verificación

- `node tools/timing.mjs estimate`: 12 escenas, 66 líneas, 477 s estimados.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, de runtime y de layout. Contraste: 113 de 113 textos pasan WCAG AA. Queda la advertencia esperada de `#chrome`. Los 3 avisos informativos son la factura atenuada al 7 % detrás de la pregunta del piénsalo, una superposición intencional.
- Capturas en `snapshots/peda` y `snapshots/peda2` al final de cada línea (66 momentos), y en `snapshots/peda3` momentos a mitad de escena. A partir de ellas se corrigieron dos cosas: las tarjetas del empate (`tiebreak`) heredaban el estilo `.opt` del kit y se armaban mal, y en el `outro` quedaba medio segundo de pantalla vacía entre los repositorios y la tarjeta final.
- Ninguna escena se retiró: las 8 originales se reescribieron y se sumaron `yard`, `tiebreak`, `ready` y `hours`.
- Pendiente, fuera de esta tarea: generar la voz nueva (`tools/voice.mjs`) y volver a correr `node tools/timing.mjs`.
