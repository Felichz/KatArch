# Auditoría pedagógica · Capítulo 2 · El dilema del podio

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero, no vio el capítulo escrito y no puede pausar.

Los segundos se estiman a 2,2 palabras habladas por segundo (se cuentan las palabras de `say` cuando existe).

## 1. El guion anterior (7 escenas, 429 palabras, unos 3:07 con la voz de prueba)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (31 palabras, 14 s) | Recuerdo del número; "los equipos que compitieron" | 7 s; 4,5 s | Sí | Sí | — | Sí | Correcta, pero no dice qué va a enseñar el capítulo |
| teams (46 palabras, 21 s) | Diez equipos y tres finalistas; "tres posturas opuestas"; la pregunta "es económica"; "maquinaria" | Finalistas 6 s; "económica" 5 s; la pregunta 7 s | No: se afirma que la pregunta es económica sin mostrar por qué | **No**: nunca se dice qué cuesta dinero en un sistema (servidores que se pagan cada mes, vendas o no) | No | Sí | Afirma la idea central sin construirla. "Costo fijo" aparecerá después sin haberse definido |
| styles (163 palabras, 74 s) | Infraestructura distribuida; monolito modular; módulo; fronteras estrictas; AWS; "partir mañana"; el argumento de "hacer el trabajo dos veces"; microservicios; contenedor; despliegue; costo fijo de operación; startup que valida su mercado; analítica; bus de eventos; Kafka; tiempo real; recomendaciones; mensajería sobredimensionada | **Unos 18 conceptos en 74 s, unos 4 s cada uno.** Monolito modular: 12 s en una frase de 27 palabras. Microservicios: 9 s. Bus de eventos y Kafka: 9 s en una sola frase | No: cada postura abre con su nombre ("propusieron un monolito modular", "montaron microservicios", "todo pasa por un bus de eventos") | **No**: infraestructura distribuida, contenedor, despliegue, costo fijo, bus de eventos, Kafka, analítica y sobredimensionada, sin definir | A medias: hay una razón por postura, pero comprimida en una frase que además nombra tres términos nuevos | **No**: tres diagramas distintos se arman y desarman en 74 s, con chips que la voz no menciona (Docker) | **La falla principal del capítulo.** Las tres posturas, que son el corazón del capítulo, pasan en una sola escena a ritmo de lista |
| bets (46 palabras, 21 s) | "Ninguna es la correcta"; "qué no pagar hoy"; la primera ley; Richards y Ford; trade-off | Tabla de compra y pago 7 s (seis tarjetas); ley 10,5 s | No: la ley se enuncia, no se trabaja sobre el caso | **No**: trade-off queda en inglés sin traducir; Richards y Ford sin presentar | No: no se recorre qué compra y qué paga cada postura | **No**: seis tarjetas con unas 50 palabras en 7 s | Enuncia la ley sin el ejemplo trabajado. El capítulo 4 después dice "Richards y Ford, los de la primera ley" y da por hecho que quedaron presentados |
| jury (49 palabras, 22 s) | El jurado; la rúbrica; "piénsalo tú" | Jurado 4,5 s; pregunta 15 s (más 3 s de pausa) | — | "Rúbrica" no se define | — | Sí | El "piénsalo tú" no ata la pregunta con la ley recién vista: el espectador no tiene con qué razonarla, y la opción "la más barata" parece correcta porque ganó la postura más barata |
| rubric (45 palabras, 20 s) | Trazabilidad; los siete criterios; ADR; características arquitectónicas | Trazabilidad: 2 s, nombrada y nunca definida; siete criterios **en una sola frase de 9,5 s**; ADR 0 s | No | **No**: trazabilidad, ADR y características arquitectónicas, sin definir | A medias: "si se puede seguir cada decisión" | **No**: siete filas aparecen una por palabra, a 1,3 s cada una | Lista de siete en una línea. La idea central del cierre (trazabilidad) recibe 2 s |
| outro (49 palabras, 22 s) | "La misma vara"; el adelanto del capítulo 3 | 8 s; 12 s | — | — | — | Sí | No repasa las ideas del capítulo |

### Dónde se pierde el espectador tipo

- **"¿Por qué la pregunta es de dinero?"** (teams). Se afirma, no se muestra. Falta lo esencial: cada servidor se paga todos los meses, aunque no se venda nada.
- **"¿Qué es infraestructura distribuida?"** (styles, 0:41). Nombrada y descartada en la misma frase.
- **"¿Qué es un monolito modular?"** Una frase de 27 palabras mete monolito, módulo, frontera estricta, base de datos única y AWS. El espectador no sabe qué es un monolito, así que tampoco entiende qué agrega "modular".
- **"¿Por qué partir después sería hacer el trabajo dos veces?"** El argumento de Myagis-Forest se dice sin explicar: construirlo junto y después desarmarlo.
- **"¿Qué son los microservicios? ¿Qué es un contenedor? ¿Un despliegue?"**
- **"¿Qué es un costo fijo de operación? ¿Por qué es peor para una startup?"**
- **"¿Qué es un bus de eventos? ¿Qué es un evento? ¿Qué es Kafka?"** Tres términos en una frase, ninguno definido.
- **"¿Sobredimensionada respecto de qué?"** No se dice que Kafka está hecho para volúmenes enormes y aquí hay menos de una venta por minuto.
- **"¿Qué es un trade-off? ¿Quiénes son Richards y Ford?"**
- **"Si ganó la más barata, ¿no premiaron lo barato?"** El "piénsalo tú" deja esa trampa abierta y la respuesta no la cierra.
- **"¿Qué es la trazabilidad? ¿Qué es un ADR?"** Las dos palabras clave del cierre, sin definir.
- **"¿Qué me llevo?"** No hay repaso final.

## 2. El plan

### Las ideas esenciales del capítulo

1. **La pregunta de fondo es económica.** Un sistema cuesta dinero aunque no venda: cada servidor se paga todos los meses. Eso es el costo fijo, y a una startup que todavía prueba su negocio le pesa mucho. Con menos de una petición por segundo, la pregunta es cuánta maquinaria comprar hoy.
2. **Tres posturas, cada una con su porqué y su precio.** Cada estilo se define en una o dos frases simples, con el razonamiento real del equipo y el precio que acepta. El análisis con números queda para el capítulo 4, como promesa explícita.
   - ArchColider: con tan poca carga, repartir el sistema en muchas máquinas es tirar dinero. Monolito modular: una sola aplicación, dividida por dentro en módulos con fronteras estrictas. Barato hoy, y se puede separar mañana. El precio: partirlo será trabajo para después.
   - Myagis-Forest: ve ese mismo precio y concluye lo contrario. Partir después es hacer el trabajo dos veces. Microservicios: programas separados, cada uno con su base y su deploy. El precio: un costo fijo mucho más alto.
   - Jedis: apuesta a la analítica. Evento, bus de eventos y Kafka, cada uno definido. El precio: una plataforma pensada para volúmenes enormes, con menos de una venta por minuto.
3. **Todo es un trade-off.** Primero se trabaja sobre el caso (qué compra y qué paga cada una, una por vez), después se pone el nombre y se traduce, y al final llega la ley de Richards y Ford, presentados para que el capítulo 4 pueda recordarlos.
4. **El jurado midió trazabilidad.** El "piénsalo tú" se ata a la ley: si no hay respuesta correcta, ¿qué se puede medir? La respuesta descarta tecnología y precio. Se ven dos criterios de cerca. Después se define trazabilidad y se recorre el hilo de ArchColider.

### Qué recibe más espacio

- **El costo fijo** (escena `question`, 39 s): el caso (un servidor que se paga cada mes, vendas una comida o mil) antes del nombre.
- **Las tres posturas, una escena cada una** (de 74 s a unos 172 s): cada una con su razonamiento, su definición, su precio y su síntesis. Los mismos cinco módulos pasan de una escena a la siguiente, así que el espectador ve que es el mismo sistema armado de tres formas.
- **El trade-off** (de 21 s a unos 59 s): las tres tarjetas se llenan una por vez, con su frase, antes del nombre y de la ley.
- **La trazabilidad** (de 2 s a unos 34 s): definida y trabajada sobre el hilo real de ArchColider.
- **Un repaso final** de las tres ideas.

### Qué se recorta

- **La lista de los siete criterios** en voz. Los siete quedan en pantalla, y la voz se detiene en dos: entender los requerimientos y los ADR. Los dos llevan al capítulo 3, que trabaja requerimientos, trazabilidad y ADR en detalle.
- **Las características arquitectónicas** como criterio comentado: necesitaba otro término más, y el capítulo 4 trabaja los atributos de calidad.
- **Docker y "contenedor"**: no agregan nada a la idea de programas separados.
- **"Modelado de dominio impecable"** de Myagis-Forest: el capítulo 4 trata el modelo de dominio.
- **"La misma vara, dentro o fuera de un concurso"**: queda implícita en la síntesis de la trazabilidad.

### Las escenas nuevas

| # | id | Kicker | Qué enseña |
| - | - | - | - |
| 1 | `intro` | Capítulo 2 | Recuerda el número (42 comidas por día, menos de una petición por segundo) y anuncia qué va a enseñar el capítulo |
| 2 | `question` | La pregunta | Diez equipos y tres finalistas. Lo que los separa es el dinero: el costo fijo, definido con un servidor que se paga cada mes. Startup, definida. La pregunta |
| 3 | `arch` | Tres posturas | ArchColider: por qué descartó la infraestructura distribuida (definida), el monolito modular (monolito y modular, por separado), por qué así y su precio |
| 4 | `forest` | Tres posturas | Myagis-Forest: el mismo precio, la conclusión contraria. "El trabajo dos veces", explicado. Microservicios y deploy, definidos. Su precio: el costo fijo |
| 5 | `jedis` | Tres posturas | Jedis: analítica, evento (con ejemplos del caso), bus de eventos y Kafka, definidos. Sobredimensionada respecto de qué |
| 6 | `bets` | Ninguna es la correcta | Qué compra y qué paga cada una, una por vez. Trade-off, nombrado y traducido. Richards y Ford, presentados, y la primera ley. Promesa del capítulo 4 |
| 7 | `jury` | La vara del jurado | El jurado (con Richards), la rúbrica definida, y el "piénsalo tú" atado a la ley |
| 8 | `rubric` | La vara del jurado | La respuesta. Dos criterios de cerca. Trazabilidad, definida, y el hilo de ArchColider |
| 9 | `outro` | Para llevarte | Repaso de las tres ideas y puente al capítulo 3 |

## 3. El guion nuevo (9 escenas, 860 palabras)

**Duración estimada:** a 2,2 palabras por segundo, más 27 s de pausas escritas, da unos 6:58. Al ritmo de la voz real en otros capítulos (unas 2,3 palabras por segundo, contando los silencios entre frases), da unos 6:40. `node tools/timing.mjs estimate` da 452 s (7:32), porque su narrador simulado es más lento. Queda unas 10 palabras por encima del objetivo de 850. Se recortaron Docker, el modelado de dominio, un criterio de la rúbrica y la frase de "la misma vara". Lo que queda sostiene las cuatro ideas, y es el costo de dar a cada postura su propia escena.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (40 palabras, 18 s) | Recuerdo del número; qué enseña el capítulo | 9 s; 7 s | Sí: el número, antes del título | Sí | — | Sí: el número queda 9 s, los diez equipos aparecen con su palabra y el chip del jurado con la suya | Correcta |
| question (80 palabras, 39 s) | Lo que separa a los finalistas; costo fijo; startup; la pregunta | Finalistas 6 s; "es el dinero" 6,5 s con pausa; **costo fijo 18 s** (caso 6,4 s, nombre y definición 6,5 s con pausa, consecuencia para una startup 6,4 s); pregunta 8 s con pausa | **Sí**: el servidor que se paga cada mes aparece antes del nombre | Sí: costo fijo ("lo que pagas cada mes, aunque no vendas nada") y startup | Sí: a una empresa que todavía prueba su negocio le pesa cada gasto fijo | Sí: cada pieza llega con su frase; la definición queda unos 10 s | Correcta. El costo fijo vuelve en las tres posturas con un medidor, así que en total se trabaja durante unos 3 minutos |
| arch (118 palabras, 57 s) | Infraestructura distribuida; monolito; modular; fronteras estrictas; por qué; precio | Infraestructura distribuida 9,5 s (con su caso: seis máquinas que se reparten el trabajo); **monolito modular 33 s** (nombre 3,3 s, monolito 8 s, modular 6 s, fronteras 8 s, por qué 7 s); precio 6 s; síntesis 5,5 s | Sí: el razonamiento desde la carga antes del nombre | Sí: "una sola aplicación, con una sola base de datos"; "por dentro se divide en cinco módulos"; "ningún módulo se mete en los datos de otro" | Sí: con tan poca carga, repartir el sistema es tirar dinero; barato hoy, y se separa por la frontera | Sí: el diagrama se arma pieza por pieza al ritmo de la voz; Reportes sale del monolito cuando se dice "se separa" | Correcta. El análisis con números queda para el capítulo 4 |
| forest (111 palabras, 55 s) | El trabajo dos veces; microservicios; deploy; costo fijo alto | **El trabajo dos veces 14 s** (con pausa); **microservicios 23 s** (nombre 4 s, programa aparte con su base y la red 9 s, deploy 9 s con pausa); precio 13 s; síntesis 5 s | Sí: el argumento antes del nombre | Sí: "un programa aparte, con su propia base de datos, que habla con los demás por la red"; deploy: "se pone en producción por separado" | Sí: no quieren partir dos veces; a cambio, cinco programas encendidos todos los meses | Sí: los dos pasos quedan unos 7 s; los módulos se separan con la palabra "partieron" | Correcta |
| jedis (127 palabras, 61 s) | Analítica; evento; bus de eventos; Kafka; sobredimensionada | Analítica 11 s; **evento 13 s** (definición y dos ejemplos del caso); **bus de eventos 9 s con pausa**; Kafka 7,3 s; **sobredimensionada 16 s** (por qué y definición); síntesis 4,5 s | Sí: la apuesta (la analítica) antes del mecanismo; los ejemplos antes del bus | Sí, todos, cada uno en su frase | Sí: para analizar hace falta registrar cada cosa que pasa; Kafka está hecho para volúmenes enormes y aquí hay menos de una venta por minuto | Sí: definición, ejemplos, bus y Kafka aparecen en orden; los chips del precio quedan unos 10 s | Correcta. Bus de eventos recibe unos 30 s si se cuentan el evento y Kafka, que son parte de la misma idea |
| bets (123 palabras, 59 s) | Comparar compra y pago; trade-off; Richards y Ford; primera ley; la pregunta útil | Comparación 21 s (una postura por frase, más pausa); "ninguna tiene todo" 6 s; **trade-off 6 s de definición, con 16 s de caso antes y la ley después: unos 43 s en total**; ley 10 s con pausa; pregunta útil y promesa 11 s | **Sí**: las tres tarjetas se llenan antes del nombre | Sí: "ganas algo, y a cambio cedes otra cosa"; Richards y Ford, como autores de un libro clásico de arquitectura | Sí: cada postura eligió qué ceder | Sí: cada tarjeta se ilumina con su frase y las tres quedan juntas unos 6 s | Correcta |
| jury (77 palabras, 39 s) | El jurado; rúbrica; "piénsalo tú" | Jurado 7 s; rúbrica 8 s con pausa; pregunta 16,5 s más 3 s de silencio con el anillo | — | Sí: rúbrica ("una lista de criterios, la misma para cada equipo") | Sí: la pregunta parte de la ley ("si no hay una respuesta correcta…") | Sí: la rúbrica queda unos 5 s; cada opción aparece cuando se dice | Correcta. El "piénsalo tú" llega después de la herramienta: la primera ley |
| rubric (106 palabras, 52 s) | La respuesta; dos criterios; ADR; trazabilidad; el hilo de ArchColider | Respuesta 7 s; requerimientos 5,5 s; ADR 9,6 s con pausa; **trazabilidad 34 s** (definición 9,6 s, hilo del caso 11,5 s, síntesis 7,4 s, todo con pausas) | Sí: los dos criterios llevan a la palabra | Sí: trazabilidad ("seguir el hilo de cada decisión, desde el negocio hasta su costo"); ADR, en una línea, con la promesa del capítulo 3 | Sí: un jurado no puede premiar una respuesta correcta que no existe | Sí: los siete criterios quedan en pantalla unos 30 s, con dos destacados; el hilo se arma chip por chip | Correcta. Los siete criterios se ven, pero la voz no los enumera |
| outro (78 palabras, 38 s) | Repaso de las 3 ideas; puente al capítulo 3 | 7 a 8 s cada idea, con pausa; puente 12 s | — | — | — | Sí: las tres tarjetas quedan juntas hasta el final del repaso | Correcta |

**Ningún concepto importante queda por debajo de unos 20 s.** Costo fijo, unos 18 s más su medidor en tres escenas. Monolito modular, 33 s. Microservicios, 23 s más el "trabajo dos veces". El bus de eventos, unos 30 s con el evento y Kafka. Trade-off, unos 43 s y trazabilidad, 34 s. Reciben menos tiempo los términos de apoyo, definidos en una frase cada uno: infraestructura distribuida, deploy, startup, analítica, rúbrica y ADR. ADR solo se nombra con su promesa, porque el capítulo 3 lo desarrolla.

### Verificación

- `node tools/timing.mjs estimate`: 9 escenas, 63 líneas, 452 s estimados.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, runtime y layout. Contraste: 139 de 139 textos pasan WCAG AA. La única advertencia es la esperada de `#chrome`. El aviso de superposición es el fundido entre escenas: los cinco módulos y el medidor de costo pasan de una postura a la siguiente en el mismo lugar.
- Capturas en `snapshots/peda` y `snapshots/peda2` (al final de cada línea), y en `snapshots/peda3` y `snapshots/peda4` (momentos a mitad de escena). Lo que se ve corresponde a lo que se dice. A partir de ellas se corrigió lo siguiente: el texto de los módulos y de la base de datos, que se cortaba en dos renglones; la etiqueta del bus, que cruzaba un cable; el panel de servidores y la definición de startup, que se iban antes de poder leerlos; la rúbrica del jurado, que se iba demasiado pronto (se agregó una pausa de 0,8 s); y las tarjetas del trade-off, que quedaban medio vacías.
- Las escenas del guion anterior que se reemplazaron (`teams` y `styles`) están en `retired/`.
- Pendiente, fuera de esta tarea: generar la voz nueva (`tools/voice.mjs`). Hasta entonces los tiempos salen de `node tools/timing.mjs estimate`, porque no hay `voice.json`.
