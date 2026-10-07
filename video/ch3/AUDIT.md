# Auditoría pedagógica · Capítulo 3 · Las reglas antes del primer diagrama

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero, no vio el capítulo escrito y no puede pausar.

Los segundos se estiman a 2,2 palabras habladas por segundo (se cuentan las palabras de `say` cuando existe).

## 1. El guion anterior (7 escenas, 448 palabras, unos 3:25)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (33 palabras, 15 s) | Recuerdo del jurado; "el orden" como método | 3 s; 8 s | — | Sí | No: no se dice qué haría uno normalmente, así que "el orden" no tiene contra qué contrastar | Sí | Gancho correcto pero sin tensión |
| week (40 palabras, 18 s) | Semana sin diagramas; cuatro documentos de negocio; "aburrido, y por eso funciona" | 9 s; 5,5 s para los cuatro documentos en una línea; 4 s | Sí | Los documentos, solo con su nombre | **No**: "por eso funciona" es un eslogan. Nunca se dice qué se gana leyendo antes de dibujar | Sí | Afirma sin razonar |
| reqs (83 palabras, 38 s) | Requerimientos crudos; **escenarios de uso**; requerimiento 1 "vago"; preguntar al cliente; el ejemplo del suscriptor | Crudos 3,6 s; escenarios de uso 6 s (nombre solo); vago 9 s; preguntar 8,6 s; ejemplo 10,5 s | Parcial | **"Escenario de uso" nunca se define** | El requerimiento vago sí (ya lo resuelve el sistema de los refrigeradores). Preguntar, no: no se dice qué cambia en el diseño según la respuesta | **No**: 8 filas y 7 etiquetas "escenario de uso" en unos 6 s | Cinco ideas en 38 s; el término central queda vacío |
| principles (105 palabras, 48 s) | Principio como desempate; simplicidad cognitiva; evolucionabilidad; telemetría; mensajes antes que llamadas; de qué restricción sale cada uno; "se destilan" | Desempate 9,5 s **sin caso**; cada principio de 3,6 a 6,4 s; las cuatro restricciones **en una sola frase de 30 palabras** (unos 3,4 s cada una) | **No**: los principios se nombran antes de cualquier problema que resuelvan | **No**: "cognitiva", "evolucionabilidad", "telemetría", "escalar", "mensaje" y "llamada directa" quedan sin definir | No: cada principio es un eslogan ("escalar con datos, no con ansiedad"). **Nunca se ve un empate desempatado** | **No**: 8 tarjetas y 4 cables (unas 60 palabras) en 13 s | **La falla principal del capítulo**: cuatro conceptos en una lista, sin ejemplo trabajado |
| trace (92 palabras, 42 s) | Trazabilidad; impulsor de negocio; requerimiento que moldea la arquitectura; "piénsalo tú"; 8 de 10; requerimiento 10 → PIN offline | Trazabilidad nombrada 5 s antes del caso, definida en 7 s; el resto, 4 a 11 s | No: abre con el nombre ("la pieza que los jueces más valoran") | La tabla, en una línea. "Impulsor" y "requerimiento arquitectónico", no | No: no se dice para qué sirve el hilo (defender cada decisión, detectar lo que sobra). No se dice por qué los microservicios son la opción equivocada | **No**: 16 filas (unas 110 palabras) aparecen en un segundo | El "piénsalo tú" funciona, pero la tabla se ve y no se lee; "retiro offline por PIN" llega sin contexto |
| adr (58 palabras, 26 s) | ADR; tres partes; negativas; 16 ADRs | ADR 6 s; partes 6 s; negativas 6,4 s; 16 ADRs 8 s | **No**: "queda una pieza más" | El ADR, en una línea | **No**: nunca se dice para qué se escribe una decisión, ni por qué las negativas importan más allá del eslogan | Sí, pero el documento en pantalla es la plantilla del ADR 001 ("si aplica"): no muestra ninguna negativa real | Introducido de pasada, sin ejemplo |
| outro (37 palabras, 17 s) | Repaso del método; puente al capítulo 4 | 7 s; 8 s | — | — | — | Sí | No repasa los principios, la trazabilidad ni el ADR |

### Dónde se pierde el espectador tipo

- **"¿Por qué funciona leer el negocio?"** El guion lo afirma ("aburrido, y por eso funciona") pero no da la razón: un diagrama del primer día diseña para un negocio imaginado.
- **"¿Qué es un escenario de uso?"** Se nombra como el resultado de releer el pliego y nunca se explica.
- **"¿Por qué importa preguntarle al cliente si se puede revender una comida?"** Falta decir que la respuesta cambia lo que el sistema tiene que hacer.
- **"¿Qué es un principio, y cuándo se usa?"** Se dice "desempatan" sin mostrar ninguna discusión.
- **"¿Qué es la simplicidad *cognitiva*?"** La palabra "cognitiva" queda sin traducir.
- **"¿Evolucionabilidad? ¿Extraer qué, adónde?"** Sin el caso del catálogo, "módulos fáciles de extraer mañana" no significa nada.
- **"¿Qué es la telemetría? ¿Qué es escalar? ¿Qué tiene que ver la ansiedad?"**
- **"¿Qué diferencia hay entre un mensaje y una llamada directa? ¿Quién tiene que estar vivo?"** Es el principio más técnico y recibe 6 s.
- **"¿De qué restricción salía cada uno?"** Las cuatro restricciones pasan en una frase. El capítulo 1 definió "restricción" y no se recuerda.
- **"¿Nunca vi un empate resuelto?"** La función de los principios se dice pero no se demuestra.
- **"¿Trazabilidad no era lo del capítulo 2?"** No se ata al hilo que el capítulo 2 ya presentó.
- **"¿Qué es un impulsor de negocio? ¿Qué requerimientos "moldean" la arquitectura?"**
- **"¿Por qué no microservicios?"** La opción A del "piénsalo tú" se descarta sin decir por qué.
- **"¿Qué es un ADR, para qué lo escribo, y cómo se ve uno de verdad?"** El que aparece en pantalla es una plantilla vacía.
- **"¿Por qué las desventajas?"** El eslogan de la propaganda no dice qué se gana al escribirlas.
- **"¿Qué me llevo?"** No hay un repaso de las ideas.

## 2. El plan

### Las ideas esenciales del capítulo

1. **Leer el negocio antes de dibujar, y preguntar en vez de inventar.** El pliego se relee preguntando "¿esto le toca a nuestro sistema?". El requerimiento 1 resulta resuelto por el sistema de los refrigeradores, y la duda se le manda al cliente. Cada respuesta cambia el diseño; inventarla esconde una decisión del negocio en el código.
2. **Los principios son reglas de desempate, y salen de las restricciones.** Primero el problema (dos opciones razonables, nadie que decida), después el nombre. Cada principio con su restricción, su definición en palabras simples y su porqué. Un empate trabajado paso a paso (¿separar ya el catálogo?) presenta la evolucionabilidad y la telemetría en acción. Mensaje y llamada directa se definen con la cocina como caso.
3. **Trazabilidad: cada requerimiento sale de un objetivo del negocio.** Se ata al hilo del capítulo 2. La tabla se lee por partes, se dice para qué sirve (lo que no sale de ningún impulsor, sobra) y el espectador la aplica en el "piénsalo tú".
4. **El ADR: la decisión por escrito, con lo que se paga.** Qué es, para qué se escribe, sus tres partes, y un ejemplo real con su negativa: el ADR 003 (DataDog), que además es la telemetría puesta en práctica.

### Qué recibe más espacio

- **Leer y preguntar**: de unos 55 s a unos 95 s en tres escenas, con la razón de cada paso.
- **Los principios**: de 48 s a unos 2:50 en cuatro escenas. Cada uno arranca por su restricción y recibe definición y porqué. El empate del catálogo dura un minuto. Mensajes contra llamadas tiene su propia escena con dos carriles animados (la compra trabada, la compra que sigue).
- **La trazabilidad**: de 42 s a unos 70 s en dos escenas, con la tabla armada por partes y el porqué de las opciones del "piénsalo tú".
- **El ADR**: de 26 s a unos 70 s en dos escenas, con un ejemplo real en el que la negativa está escrita.
- **El repaso final**: cuatro tarjetas, una por idea.

### Qué se recorta

- **"Escenarios de uso"**: el término no hace falta para la idea (releer y cuestionar el pliego). El curso escrito lo cubre.
- **La lista de las 8 etiquetas** del pliego reescrito: queda solo el requerimiento 1 como ejemplo trabajado.
- **El conteo "8 de los 10 requerimientos"**: detalle menor.
- **"ArchColider entregó dieciséis"**: detalle menor; los ADR aparecen en cada capítulo.
- **El ADR 001** (la plantilla): reemplazado por el ADR 003, que sí muestra una negativa real.
- **Los eslóganes** ("escalar con ansiedad", "nadie depende de que el otro esté vivo") se reemplazan por la explicación.

### Las escenas nuevas

| # | id | Kicker | Qué enseña |
| - | - | - | - |
| 1 | `intro` | Capítulo 3 | Recuerda lo que premió el jurado. Contraste: lo normal sería abrir el editor; el equipo empezó por otro lado |
| 2 | `week` | Semana cero | Cero diagramas la primera semana; los documentos del negocio; por qué: un diagrama del primer día diseña para el negocio imaginado |
| 3 | `reqs` | Semana cero | Releer el pliego preguntando "¿esto le toca a nuestro sistema?"; el requerimiento 1, ya resuelto por el sistema de los refrigeradores, marcado y preguntado al cliente |
| 4 | `ask` | Semana cero | Preguntar en vez de inventar: la comida no retirada; la respuesta cambia el diseño |
| 5 | `tie` | Principios | El problema (dos opciones razonables, nadie decide), el nombre (principio = regla de desempate acordada antes) y su origen (restricciones, recuerdo del capítulo 1) |
| 6 | `simple` | Principios | Equipo pequeño → simplicidad cognitiva, definida y aplicada a dos opciones |
| 7 | `grow` | Principios | El empate trabajado: ¿separar ya el catálogo? Simplicidad dice hoy no; 2 → 68 locaciones trae la evolucionabilidad; poco presupuesto trae la telemetría. Empate resuelto con razones |
| 8 | `msgs` | Principios | Sistemas ajenos (la cocina): llamada directa contra mensaje, con la compra trabada y la compra que sigue. El mapa de las cuatro restricciones y los cuatro principios |
| 9 | `trace` | Trazabilidad | El hilo del capítulo 2; la tabla por partes; lo que no sale de ningún impulsor, sobra |
| 10 | `think` | Trazabilidad | "Piénsalo tú" con el impulsor 1, la respuesta y por qué los microservicios no son un requerimiento. El hilo sigue hasta el PIN del capítulo 6 |
| 11 | `adr` | El cuaderno | Qué es un ADR, para qué se escribe, y sus tres partes |
| 12 | `adr003` | El cuaderno | El ADR 003 real: opciones, decisión, por qué, y la negativa escrita. La regla de la propaganda |
| 13 | `outro` | Para llevarte | Repaso de las cuatro ideas y el puente al capítulo 4 |

## 3. El guion nuevo (13 escenas, 920 palabras)

**Duración estimada:** a 2,2 palabras por segundo, la voz suma unos 418 s, más 24 s de pausas escritas: unos 7:22. Con los silencios entre frases y entre escenas, unos 8:00, que es lo que da `node tools/timing.mjs estimate` (482 s). Al ritmo de la voz real de Pablo Macias en el capítulo 4 (unas 2,28 palabras por segundo), quedaría en unos 7:45. Queda por encima de los 7 minutos, igual que los capítulos 4 y 5: es el costo de dar caso, definición y porqué a los cuatro principios. Si hay que bajar, lo primero que se recorta es la línea de los dos caminos en `ask` (unos 10 s) y la segunda mitad de `think` (el hilo hasta el PIN, unos 11 s).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (44 palabras, 21 s) | Recuerdo del capítulo 2; el contraste con el reflejo de abrir el editor | 6 s; 10 s | Sí | — | Sí: plantea la tensión que el capítulo resuelve | Sí: cada chip llega con su palabra; los pasos quedan 5 s | Correcta |
| week (46 palabras, 22 s) | Semana sin diagramas; documentos del negocio; por qué leer primero | 6 s; 6 s; 8 s, más 1 s de pausa | Sí | Sí: cada documento con su subtítulo en palabras simples | **Sí**: un diagrama del primer día diseña para el negocio que imaginas | Sí: un documento por palabra; el contraste queda 8 s | Correcta (es preparación, no un concepto pesado) |
| reqs (64 palabras, 30 s) | Cuestionar el pliego: el requerimiento 1 | **30 s**: la pregunta 6 s, el caso 5 s, el porqué 8 s (recuerdo del capítulo 1), la acción 10 s más 1 s de pausa | Sí: la pregunta y el caso antes de la etiqueta "vago" | Sí | Sí: ese sistema ya existe y ya entrega los datos | Sí: quedan solo el requerimiento 1, el sistema de los refrigeradores y la pregunta escrita | Correcta |
| ask (53 palabras, 25 s) | Preguntar en vez de inventar | **25 s**: el caso 9 s, el porqué 10 s, la síntesis 6 s más 1,2 s | Sí | — | **Sí**: si la respuesta es sí, el sistema tiene que liberar la comida y avisar; si es no, nada de eso existe | Sí: dos ramas de 2 y 1 renglones; la síntesis queda 8 s | Correcta. Con `reqs`, la idea 1 recibe 55 s |
| tie (58 palabras, 27 s) | Principio como regla de desempate; su origen en las restricciones | **Principio 20 s** (caso 12 s, nombre y definición 6 s, más 1 s); origen 9 s | **Sí**: dos diseñadores y nadie que decida, antes del nombre | Sí: "reglas acordadas de antemano, para desempatar"; "restricción: algo que viene dado" (recuerdo del capítulo 1) | Sí: sin criterio común, gana el que insiste más | Sí: cuatro casilleros y cuatro chips, una palabra cada uno | Correcta |
| simple (51 palabras, 24 s) | Simplicidad cognitiva | **24 s**: restricción 7 s, nombre y definición 7 s, regla 4,5 s, porqué 5 s más 1 s | Sí: el equipo pequeño primero | Sí: "que el diseño se entienda sin esfuerzo" | Sí: lo que nadie entiende, un equipo pequeño no lo puede mantener | Sí: cuatro tarjetas cortas, que quedan en pantalla | Correcta |
| grow (130 palabras, 62 s) | El empate trabajado; evolucionabilidad; telemetría obligatoria | **Empate 62 s en total**. Evolucionabilidad **~25 s** (restricción de las 68 locaciones 5 s, nombre y definición 6 s, aplicación 6 s más 1 s, y vuelve en la síntesis). Telemetría **~25 s** (pregunta 4,5 s, definición 5,5 s, porqué con el presupuesto 8 s más 1 s, y la flecha del catálogo) | **Sí**: la discusión del catálogo antes de cada nombre | Sí: "crecer sin reescribirlo"; "cada módulo mide cómo se usa: cuántos pedidos recibe, y cuánto tarda"; "escalar" queda dicho como comprar máquinas | Sí: un servidor más que pagar; 2 → 68 locaciones; cada máquina cuesta dinero y hay poco | Sí: el diagrama de la aplicación muestra el módulo, el servidor de mañana y los medidores mientras se dicen | Correcta. Es el núcleo del capítulo: el ejemplo trabajado que faltaba |
| msgs (105 palabras, 51 s) | Llamada directa; mensaje; el cuarto principio; el mapa restricciones → principios | **Mensajes contra llamadas ~40 s**: el caso (la cocina no es del equipo) 6 s, la llamada directa y su falla 15 s, el mensaje 11 s, el principio 8 s más 1 s. Mapa 8 s, más 2,2 s de pausas | Sí: la cocina y la compra, antes del nombre | Sí: llamada = "le pide algo a otro y espera"; mensaje = "se deja en un buzón, y lo lee cuando puede", con la analogía del teléfono y el mensaje de texto | Sí: si la cocina no contesta, la compra se traba | Sí: dos carriles animados. El mapa repite pares ya vistos (unas 30 palabras) durante unos 10 s | Correcta. El mapa es repaso de lo ya explicado, no contenido nuevo |
| trace (68 palabras, 33 s) | Trazabilidad (recuerdo del capítulo 2); impulsor de negocio; requerimiento que cambia la forma del sistema | **Trazabilidad 33 s, más 38 s de aplicación en `think`**: recuerdo 7 s, impulsores 9 s, requerimientos y vínculo 10 s más 1 s, porqué 4,5 s más 0,6 s | Sí: el hilo conocido antes de la tabla | Sí: "lo que Farmacy Food quiere lograr"; "requerimientos que cambian la forma del sistema" | **Sí**: si un requerimiento no sale de ningún impulsor, sobra | Sí: la tabla se arma columna por columna; cada requerimiento muestra de qué impulsores sale; nadie tiene que leer las 16 filas | Correcta |
| think (77 palabras, 39 s) | "Piénsalo tú"; la respuesta; el hilo hasta el PIN | Pregunta 7 s más 3 s de silencio con el anillo; respuesta 11 s; hilo 11 s más 0,6 s | — (aplicación) | El ocasional se recuerda (sin cuenta) antes de preguntar | Sí: sin cuenta obligatoria, el ocasional compra; los microservicios son una solución, no un pedido del negocio | Sí: tres opciones cortas; cada respuesta deja su porqué escrito | Correcta. El "piénsalo tú" llega después de dar las herramientas |
| adr (54 palabras, 25 s) | ADR; para qué se escribe; sus tres partes | **ADR 25 s, más 46 s del ejemplo**: nombre y definición 7 s, porqué 8 s, partes 9 s más 1 s | Sí: "cada decisión de ese hilo" lo ata a la trazabilidad | Sí: "un registro de decisión de arquitectura"; cada parte con su pregunta | **Sí**: meses después se sabe por qué se eligió algo, y nadie lo deshace sin saberlo | Sí: el documento se llena parte por parte | Correcta |
| adr003 (94 palabras, 46 s) | Un ADR real; por qué importan las negativas | **46 s**: el ejemplo 9 s, opciones y decisión 8 s, porqué 10 s más 1 s, la negativa y para qué sirve 11 s más 1 s, la regla 5 s más 1,2 s | Sí: el ejemplo antes de la regla de la propaganda | — | **Sí**: la negativa dice cuándo revisar la decisión (si el precio sube) | Sí: el documento real, con su negativa resaltada; el porqué en una tarjeta aparte | Correcta. Ata además el ADR con el principio de la telemetría |
| outro (76 palabras, 37 s) | Repaso de las 4 ideas; puente al capítulo 4 | 5 a 7 s por idea, con 0,6 a 1 s de pausa; el puente 7 s | — | — | — | Sí: las cuatro tarjetas quedan juntas unos 8 s | Correcta |

**Ningún concepto importante queda por debajo de unos 20 s.** Los cuatro principios reciben entre 24 y 40 s cada uno, más el mapa que los repasa. La trazabilidad recibe 33 s más 38 s de aplicación. El ADR recibe 25 s más 46 s de ejemplo.

### Verificación

- `node tools/timing.mjs estimate`: 13 escenas, 60 líneas, 481,8 s estimados.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, de runtime y de layout. El contraste pasa. La única advertencia es la esperada de `#chrome`.
- Capturas en `snapshots/peda` y `snapshots/peda2` (el final de cada línea) y `snapshots/peda3` (el arranque de cada escena y momentos a mitad de escena). Muestran lo que la voz dice en cada momento, y ninguna escena queda vacía mientras habla la voz. A partir de ellas se adelantó el primer elemento de seis escenas que arrancaban vacías, se enderezaron los cables de `ask` y se corrigió el contraste de las opciones del "piénsalo tú".
- La escena retirada (`principles`) y las versiones anteriores de `reqs`, `trace` y `adr` están en `retired/`.
- Pendiente, fuera de esta tarea: generar la voz nueva (`tools/voice.mjs`) con Pablo Macias. Mientras tanto, `timing.js` está en modo `estimated`.
