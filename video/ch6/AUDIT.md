# Auditoría pedagógica · Capítulo 6, El mundo físico

Se audita contra `video/PEDAGOGY.md`. Los segundos se estiman a 2,2 palabras habladas por segundo, contando las palabras que dice la voz (`say` si existe). El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero y no vio el capítulo escrito.

## 1. El guion anterior

9 escenas, **547 palabras**, unos **4,1 minutos de voz** (267 s con pausas, según la estimación de `tools/timing.mjs`). Sobre ese tiempo había que meter siete conceptos nuevos: race condition, lock, modelo de actores, event sourcing, cola con confirmación, entrega "al menos una vez" con idempotencia, ventana de cancelación y PIN offline. Además había material secundario: el router, la difusión del catálogo y el día nublado.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro | El "mundo físico"; los tres problemas | 3 problemas en una frase de 16 palabras: unos 7 s | Sí | Sí | — | Las tres tarjetas aparecen en 7 s: justo | Aceptable. Funciona como mapa, pero no ancla nada del caso. |
| race | Contención (el último plato); bloquear la base de datos; el costo de esperar; la comida no salta de refrigerador | Caso: 8 s · bloqueo: 7 s · costo: **3,6 s** · observación física: 8 s | **No.** Nunca se ve qué pasa *sin* bloqueo, que es la doble venta. El candado resuelve un problema que el espectador no sintió. | "Lock" no se nombra aquí, y en la escena siguiente aparece sin definir. | **No.** "Cada compra espera a la anterior" no explica por qué eso es malo. | El cartel "un mundo aparte" entra al final de la frase y se va con el corte. | **Rehacer.** Falta la race condition, que es el caso que vuelve necesario todo lo demás. |
| actors | Actor; router; cola por refrigerador; el orden de Ana y Beto; sin locks; el catálogo avisa a las pantallas | Actor: **7 s** · router: 8 s · Ana y Beto: 7 s · sin locks: 6 s · catálogo: **4,5 s** | Parcial | "Actor" queda a medio definir: "atiende sus compras una por una". "Router" no se define. | **No.** No se dice el puente: stock independiente, entonces no hay nada que coordinar, entonces alcanza un proceso en serie por refrigerador. | El diagrama de 3×4 nodos con paquetes se arma en 8 s, y el cartel de 12 palabras sale junto. | **Rehacer.** Son cinco ideas en 32 s. Encima, contradice la escena anterior: con el actor, Beto también espera. ¿Cuál es la diferencia con el lock? |
| ledger | Evidencia; tabla que se reescribe; event sourcing; el reclamo; cola con confirmación, identificador único, sin pérdida ni duplicado | Tabla: 7 s · event sourcing: **7 s** · reclamo: 8 s · cola + ack + id + sin pérdida + sin doble cobro: **9 s para cinco ideas** | Sí para event sourcing. **No** para la cola. | Event sourcing se nombra y se define en la misma frase. "Al menos una vez", "ack" e "idempotencia" solo aparecen en carteles del visual. | Para event sourcing falta el porqué del equipo: la reputación y los reclamos (ADR 007). Para la cola no hay ninguno. | Los carteles de la cola (más de 10 palabras) aparecen en el último segundo de la escena. | **Rehacer.** Es el peor apuro del capítulo: el tema más difícil (entregas repetidas e idempotencia) en una sola frase. |
| window | 2 a 5% de cancelaciones; dos comisiones; "deshacer envío"; la cancelación a tiempo | Unos 8 s cada idea | Sí | "Pasarela" no se define. | Sí, con los números del caso | Sí | **Aceptable.** Una idea por frase y una analogía buena (del propio equipo: "como hace gmail"). Solo hay que definir la pasarela y recortar. |
| offline | El sótano sin señal; la pregunta "piénsalo tú"; cuatro opciones; la respuesta | Caso: 10 s · 4 opciones: **10 s para unas 40 palabras de pantalla** · pausa: 3 s | Sí | — | **No.** Nunca dice por qué fallan abrir, esperar o mandar a soporte. | No. Leer las cuatro opciones a 3 palabras por segundo lleva unos 13 s. | **Rehacer.** La pregunta llega *antes* de dar herramientas (el principio 5 lo prohíbe), y la respuesta ("preparar la validación") se anuncia en 8 palabras. |
| pin | PIN por adelantado; el viaje a teléfono y refrigerador; validar, abrir y reportar; enlace al capítulo 3 | PIN: 4,5 s · viaje: 9,5 s · validar + abrir + reportar: **8,6 s en una frase** | Sí (viene de offline) | Sí | Parcial: falta el trade-off del equipo (alguien puede adivinar un PIN, por eso 6 a 8 dígitos, ADR 011) y por qué el PIN también queda en el teléfono. | El registro de 4 renglones entra en 8 s | **Mejorar.** El mecanismo está, pero apurado y sin el riesgo que lo justifica. |
| cloudy | Día de sol y día nublado; la comida atascada; la salida humana | Unos 8 s por idea; la salida humana es una lista de 3 pasos en 10 s | Sí | "Día de sol" no se presenta como el vocabulario del equipo | Sí ("ningún software empuja la bandeja") | Los carriles con 7 pasos se arman en 10 s | Aceptable, pero secundario frente a lo que falta en los problemas 1 y 2. |
| outro | Repaso | El repaso entero dura **3 s**: "sin locks, sin borrar nada, sin depender de la nube" | — | — | No: son eslóganes, no repasan el porqué | Sí | **Rehacer.** Necesita repasar las ideas, una por una. |

### Dónde se pierde el espectador tipo

- **"¿Y qué pasa si no bloqueo nada?"** El guion salta directo a la solución de manual. El espectador nunca ve la lasaña vendida dos veces, así que el lock parece la respuesta a una pregunta que nadie hizo.
- **"¿Qué es un lock?"** Se dice "bloquear la base de datos" y, una escena después, "no hacen falta locks". Para un junior son dos cosas distintas.
- **"Si el actor también atiende de a uno, ¿Beto no espera igual? ¿Cuál es la diferencia?"** Esta es la pregunta central del problema 1 y el guion no la contesta. La respuesta es que la fila es *por refrigerador*: solo esperan las compras que compiten por la misma comida, y una compra en el hospital nunca espera a una del gimnasio.
- **"¿Qué tiene que ver que la comida no salte con los actores?"** Falta el razonamiento intermedio: cada stock es independiente, entonces no hay nada que coordinar entre refrigeradores, entonces alcanza un proceso en serie por refrigerador.
- **"¿Qué es un actor?"** Queda como "algo que atiende compras". Falta decir que es un proceso con una fila de mensajes propia, que atiende de a uno.
- **"¿Router? ¿Catálogo que avisa?"** Son dos conceptos laterales metidos en la misma escena. Distraen del central.
- **"¿Por qué event sourcing y no una tabla con una columna de historial?"** No se dice que Farmacy Food depende de su reputación y que resolver reclamos rápido y con precisión es esencial (ADR 007). Tampoco se menciona el precio (más trabajo mental).
- **"¿Confirmación de qué? ¿Por qué se cobraría doble?"** La cola se despacha en una frase. Faltan el ack, el caso del servicio que se cae después de cobrar, la consecuencia "al menos una vez" y el remedio: identificador único, es decir, idempotencia. El espectador no puede reconstruir nada de esto.
- **"¿Qué es la pasarela?"** No se define.
- **"¿Cómo voy a responder si todavía no sé nada?"** El "piénsalo tú" del sótano pregunta antes de enseñar, y las cuatro opciones no se pueden leer en el tiempo que duran.
- **"¿Y si alguien adivina el PIN? ¿Por qué también en el teléfono?"** El riesgo y su mitigación, que son el razonamiento del equipo, no aparecen.
- **El cierre** repasa con eslóganes. No queda ninguna regla para llevarse.

## 2. El plan

### Las ideas esenciales

1. **Un actor por refrigerador hace innecesarios los locks**, porque una comida no puede saltar de un refrigerador a otro. Se cuenta en orden: la doble venta (race condition), el lock y lo que cuesta, la observación física, el actor, Ana y Beto otra vez, y un "piénsalo tú" con Carla en el hospital.
2. **Con dinero de por medio, se guarda cada hecho y el cobro no se pierde ni se duplica.** Primero el reclamo que una tabla no puede contestar, después event sourcing. Primero el mensaje que se pierde, después la cola con ack; después el mensaje repetido, y por último el identificador único (idempotencia).
3. **Lo que va a fallar se prepara antes.** El sótano sin señal, por qué fallan las salidas obvias, la pregunta "¿cuándo sí había señal?", el PIN, su riesgo y un "piénsalo tú" sobre el teléfono, que ahora sí se responde con la regla recién aprendida.

La frase del equipo que une las tres: *la arquitectura madura no elimina los problemas del mundo real; los espera preparada.*

### Qué gana espacio

- La **race condition** tiene ahora su propia escena (30 s). Es el caso que vuelve necesario todo el problema 1.
- El **lock** se define y se muestra lo que cuesta, con el hospital esperando al gimnasio (34 s).
- El **actor** se presenta en dos escenas: la observación y la definición (34 s), y después el caso resuelto con el "piénsalo tú" de Carla (39 s).
- El **event sourcing** pasa de una escena a dos: el reclamo sin respuesta (21 s) y la solución con el porqué y el precio (34 s).
- La **cola** pasa de 9 s a dos escenas: ack y entrega al menos una vez (38 s), e idempotencia (24 s).
- En el **PIN** entran el riesgo de adivinarlo, la regla y un "piénsalo tú" que sí se puede responder.

### Qué se recorta (lo cubre el curso escrito)

- La difusión del catálogo a todas las pantallas.
- El router como término: se dice "cada orden entra en la fila de su refrigerador".
- RabbitMQ como nombre de producto y los números de versión por agregado.
- Las cuatro opciones del sótano. Quedan las dos que enseñan algo: abrir a cualquiera (fraude) y hacer esperar (sin almuerzo).
- **El día nublado completo.** Es una buena práctica del equipo, pero agrega una cuarta idea a un capítulo que ya tiene tres densas. El cierre conserva su espíritu en "lo que va a fallar, se prepara antes".
- La comida que vuelve al catálogo tras la cancelación. La ventana se queda con lo esencial: el número, las dos comisiones, deshacer envío y cero comisiones.

### Las escenas nuevas

| # | Escena | Qué cuenta |
| - | - | - |
| 1 | `intro` | Del software limpio a refrigeradores reales en la ciudad: los tres problemas |
| 2 | `race` | La última lasaña, el código simple de leer y restar, la doble venta, y su nombre: race condition |
| 3 | `locks` | Qué es un lock, cómo arregla el error, y que hace esperar al hospital por el gimnasio |
| 4 | `actors` | La comida no salta, cada stock es un mundo aparte, y qué es un actor |
| 5 | `serial` | Ana y Beto en la fila del gimnasio, sin locks, y el "piénsalo tú" de Carla en el hospital |
| 6 | `claim` | El reclamo "me cobraron y nunca retiré", y la tabla que solo dice "pagada" |
| 7 | `ledger` | Por qué event sourcing (la reputación), qué es, el reclamo respondido, y su precio |
| 8 | `queue` | El mensaje de cobro: perderlo, la cola con ack, el caso del servicio que se cae después de cobrar, y la entrega al menos una vez |
| 9 | `dedup` | Identificador único, qué es idempotencia, y la síntesis: ni perdido ni duplicado |
| 10 | `window` | El 2 a 5% de cancelaciones, las dos comisiones, deshacer envío y cero comisiones |
| 11 | `offline` | El sótano sin señal, por qué fallan abrir y esperar, y la pregunta: ¿cuándo sí había señal? |
| 12 | `pin` | El PIN por adelantado, la validación local, el riesgo y la regla |
| 13 | `pinq` | El "piénsalo tú" del teléfono en el sótano, y el enlace al requerimiento del capítulo 3 |
| 14 | `outro` | Repaso de las tres ideas, la frase del equipo, y el capítulo 7 |

## 3. El guion nuevo

14 escenas, **943 palabras habladas** (dentro del rango de 800 a 950). A 2,2 palabras por segundo son 7,1 minutos de voz; con las pausas deliberadas (22 s), los silencios entre frases y los cruces de escena, la estimación de `tools/timing.mjs estimate` da **470,9 s, unos 7,8 minutos**. El narrador simulado de la herramienta es conservador. En los capítulos 4 y 5, que ya tienen la voz generada con esta misma voz, el ritmo medido fue de unas 2,9 a 3 palabras por segundo, así que la toma real probablemente quede entre 6 y 6,5 minutos.

Segundos a 2,2 palabras por segundo, contando el caso, el nombre, la definición, el porqué y la síntesis de cada concepto, más su pausa:

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro | Del software limpio al mundo físico; los tres problemas, como mapa | 18 s en total. Cada problema vuelve después con su propia sección. | Sí: refrigeradores reales en la ciudad | — | — | Las tarjetas (2 a 3 palabras) quedan unos 6 s | Bien |
| race | **Race condition** | Caso (última lasaña, Ana y Beto): 10 s · código de leer y restar: 5,5 s · doble venta: 11 s + 1 s de pausa · nombre y definición: 5,5 s. **Unos 33 s.** | **Sí:** la doble venta se ve paso a paso antes de nombrarla | Sí: "dos operaciones compiten por el mismo dato" | Sí: alguien abre un refrigerador vacío | Las filas de la línea de tiempo entran de a una, con la palabra que las nombra. La definición queda 5 s o más. | Bien |
| locks | **Lock** y su costo | Definición y cómo arregla el error: 16,5 s · costo (todas las compras de la ciudad en una fila; el hospital espera al gimnasio): 13 s · síntesis: 4,5 s + 1 s. **Unos 35 s.** | Sí: el mismo caso de Ana y Beto | Sí: "un candado sobre el dato" | Sí: por qué la espera es un problema concreto | La fila de 5 compras y sus carteles quedan unos 12 s | Bien |
| actors | Observación física · **actor** | Observación ("una comida no salta" → "cada stock es un mundo aparte"): 15,5 s + 1 s · actor (nombre, definición y fila por refrigerador): 18,5 s. **Unos 35 s.** | **Sí:** primero la observación del equipo, después el patrón | Sí: "un pequeño proceso con su propia fila de mensajes, que atiende de a uno, en orden", también en un cartel | Sí: el puente explícito "stock aparte → no hay que coordinar → un actor por refrigerador" | El cartel de definición (12 palabras) queda unos 12 s | Bien |
| serial | Sin locks gracias al actor · "piénsalo tú" de Carla | Caso resuelto (Ana 1 → 0, Beto agotado, sin lock): 20,5 s + 1 s · pregunta: 7,3 s + 3 s de anillo · respuesta y síntesis: 11,4 s + 1 s. **Unos 44 s.** | Sí | — | Sí: contesta la duda "¿el actor no hace esperar igual?": solo hacen fila las compras que compiten por la misma comida | La pregunta (14 palabras en pantalla) queda unos 10 s | Bien. El "piénsalo tú" llega **después** de dar la herramienta: una fila por refrigerador. |
| claim | El reclamo y la tabla que se reescribe | **Unos 22 s** (21 s + 1 s) | Sí: "me cobraron y nunca retiré mi lasaña" | Sí: "guarda solo el estado actual" | Sí: la tabla solo puede decir "pagada" | Los estados cambian con cada palabra; el cartel rojo queda unos 6 s antes del cruce, y sigue visible en la escena siguiente | Bien |
| ledger | **Event sourcing** y su trade-off | Porqué (la reputación): 6 s · definición y analogía: 14,5 s · reclamo respondido: 7 s + 1 s · precio: 6,5 s. **Unos 35 s, más los 22 s del caso en claim.** | Sí (claim) | Sí: "guardar cada hecho como un evento nuevo, con su hora, sin borrar nunca nada" | Sí: reputación y evidencia (ADR 007), y el precio de más trabajo mental (decision-map) | El registro crece evento por evento. La tabla queda a la izquierda para comparar. | Bien |
| queue | **Cola con ack** · **entrega al menos una vez** | Mensaje perdido → cola → ack y reentrega: 20,5 s · el caso del servicio que cobra y se cae → nombre → doble cobro: 17,3 s + 1 s. **Unos 39 s.** | Sí, las dos: primero el mensaje que se pierde, después el que llega repetido | Sí: "ack" = la respuesta "listo"; "al menos una vez" = nunca se pierde, pero puede repetirse (también en un cartel) | Sí: perder dinero o cobrar doble (ADR 008) | Cada cartel entra con su palabra; la definición queda unos 6 s | Bien. "Al menos una vez" tiene 18 s propios, más los 11 s de dedup que siguen con el mismo caso. |
| dedup | **Idempotencia** | Identificador y memoria de cobros: 7 s · el duplicado descartado: 4,5 s · nombre y definición: 6,4 s + 1 s · síntesis: 6,4 s. **Unos 25 s.** | Sí: el mensaje repetido de la escena anterior | Sí: "procesar algo dos veces tiene el mismo efecto que una" | Sí | La definición queda unos 14 s; la ecuación final, unos 6 s | Bien |
| window | **Ventana de cancelación** | El número: 7,3 s · las dos comisiones (con la pasarela definida): 9,5 s · deshacer envío: 8,6 s · cero comisiones: 6,4 s + 1 s. **Unos 33 s.** | Sí: el 2 a 5% del propio caso | Sí, también la pasarela | Sí: las comisiones | Sí | Bien |
| offline | El problema sin señal y las salidas que fallan | **Unos 32 s** | Sí: el sótano del hospital y el cliente que ya pagó | — | Sí: fraude o cliente sin almuerzo | Las dos tarjetas quedan unos 8 s | Bien. Ya no pregunta antes de enseñar: plantea la clave ("¿cuándo sí había señal?") y la responde. |
| pin | **PIN offline**, su riesgo y la regla | Mecanismo: 25 s + 1 s · riesgo y mitigación (6 a 8 dígitos, un solo uso): 7,3 s · regla: 5 s + 1 s. **Unos 39 s.** | Sí (offline) | Sí | Sí: el riesgo y el trade-off son del ADR 011 | El registro entra renglón por renglón; la regla queda sola en pantalla | Bien |
| pinq | "Piénsalo tú" del teléfono · enlace al capítulo 3 | Pregunta: 8,6 s + 3 s de anillo · respuesta: 6,8 s + 1 s · capítulo 3: 5,9 s. **Unos 25 s.** | — | — | Sí: el teléfono está en el mismo sótano | La pregunta (16 palabras) queda unos 11 s | Bien. Se responde con la regla recién dada. |
| outro | Repaso de las tres ideas y la frase del equipo | Unos 7 s por idea (repaso, no conceptos nuevos), más la frase y 2 s de pausa: **unos 36 s** | — | — | Cada idea se repasa con su porqué | Las tarjetas (unas 15 palabras cada una) quedan 13 s o más | Bien |

**Ningún concepto importante tiene menos de unos 20 segundos.** Los más cortos son "al menos una vez" (18 s propios, más 11 s en dedup con el mismo caso) y la observación física (16,5 s), que funciona como el primer paso del concepto de actor (35 s en total).

### Verificación

- `node tools/timing.mjs estimate` → 14 escenas · 71 líneas · 470,94 s.
- `npx hyperframes@0.8.139 check` → 0 errores de lint, runtime, layout y motion; contraste 121/121 AA. La advertencia de `#chrome` es la esperada. Quedan avisos informativos de superposición en dos lugares, ambos intencionales: el cruce de `claim` a `ledger`, donde la tabla es la misma en las dos escenas, y la tarjeta de la regla de `pin`, que se dibuja sobre el diagrama atenuado.
- Las capturas están en `snapshots/peda` (cada escena al final y a mitad de camino) y `snapshots/peda2` (momentos intermedios: la pregunta de Carla, los estados de la tabla, el ack, las comisiones y el retiro). Lo que se ve coincide con lo que se dice en cada momento.
