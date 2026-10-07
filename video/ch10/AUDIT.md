# Auditoría pedagógica · Capítulo 10 · El mapa de decisiones

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero, no vio el capítulo escrito y no puede pausar. Además, en este capítulo hay un riesgo propio: es una síntesis, y el espectador **no recuerda** con detalle los nueve capítulos anteriores. Cada decisión que se nombra necesita volver a anclarse en una frase llana (qué problema resolvió), o es solo un nombre.

Los segundos se estiman a 2,2 palabras habladas por segundo (se cuentan las palabras de `say` cuando existe).

## 1. El guion anterior (8 escenas, 490 palabras, unos 4:05)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (20 s) | "leer las decisiones como sistema"; tres preguntas (qué resolvió, cuánto costó, cuál forzó a la siguiente) | 4 s la idea; las tres preguntas, en una sola frase de 9 s | — | "Como sistema" queda abstracto | No: no dice por qué importa juntarlas | Sí: los diez nodos se acomodan con calma | Gancho aceptable, pero arranca con una lista de tres preguntas en una línea |
| sieve (29 s) | ADR (sin recordar qué es); curaduría; cinco ADRs fuera (plantilla, dos chequeos de salud, mapas, infraestructura como código); "estructural"; tres pilares; 11 → 10 | ADR 0 s; los cinco excluidos, **5 nombres en una frase de 10 s**; pilares 0 s (solo se nombran); la fusión 012 + 013, unos 4 s | No | **No**: ni ADR, ni "health check", ni "infraestructura como código", ni "estructural", ni "pilar" | Parcial: "útiles, no estructurales", sin decir qué significa estructural. La fusión de dos ADRs no se justifica | **No**: 16 fichas, 4 pilas con etiquetas de pilar que todavía no se explicaron, y el movimiento de 11 fichas en una sola frase | Lista de cinco en una línea. Los pilares aparecen como etiquetas antes de existir. El espectador no sabe por qué dos ADRs son una sola decisión |
| anatomy (34 s) | Problema / decisión / renuncia; la decisión madre; monolito modular; "bola de barro"; contrapeso; ADR del capítulo 3; "propaganda" | Las tres preguntas 6 s; el ejemplo 14 s; "bola de barro" 0 s de definición; el cierre 5 s | Sí: el ejemplo del monolito llega enseguida | El marco sí. "Bola de barro", "contratos" y "telemetría" (en pantalla), no. Además los capítulos 4 y 5 la llamaron "bola de lodo" | Sí para el marco. No para "propaganda": se dice sin explicar | Las tres columnas tienen unas 25 palabras cada una, y la del costo cambia de tema (el contrapeso) sin que la voz lo diga | Buena idea, comprimida. El contrapeso, que después es la respuesta del "piénsalo tú", queda solo en pantalla |
| board (41 s) | Mapa; caja = decisión, zona = pilar; los 3 pilares; **10 decisiones nombradas**; flechas llenas y punteadas | Cada pilar, unos 2 s; cada decisión, **1 a 2 s** ("feedback propio, PIN offline y catálogo local"); las líneas punteadas, 3 s | No: los pilares y las decisiones se nombran sin el problema que los une | **No**: diez nombres de decisión sin una sola frase de qué resolvió cada una. "Feedback propio", "identidad en el borde", "fachada de pagos" o "cola con acuse" no se entienden si no recuerdas el capítulo | **No**: no se dice por qué cada decisión está en su pilar ni qué significa "núcleo estructural" | **No**: 10 nodos aparecen al ritmo de una lista. Las punteadas ("misma lógica") no se explican nunca | **La falla principal del capítulo.** Es exactamente lo que el usuario describió: un mapa de diez decisiones que pasa volando. El espectador ve nombres, no decisiones |
| mother (34 s) | Decisión madre (por qué); "piénsalo tú"; monitoreo alquilado como contrapeso; telemetría obligatoria; confianza cero; agrandar la máquina | Pregunta 9 s + 3 s; respuesta 6 s; **dos flechas más en una frase de 6 s** | Parcial | "Telemetría", "confianza cero" y "agrandar antes de separar", no | La respuesta sí ("así se pagó la telemetría"). Las otras dos flechas, no: no se dice por qué el monolito lleva a confianza cero ni a escala vertical | El mapa se apaga y vuelve, bien. Las dos flechas finales llegan juntas | El "piénsalo tú" llega **sin herramientas**: el espectador no oyó que el contrapeso del monolito fuera medir cada módulo (estaba solo en pantalla, en `anatomy`), ni qué hace el monitoreo alquilado. Responde por descarte |
| money (32 s) | Recorrido de una compra; catálogo viejo / stock verificado al pagar; cola que confirma; "historia de eventos"; fachada | Cada paso, 5 a 7 s | Sí: es un caso | "Una cola que confirma el recibo" y "fachada" se dan por sabidos | Parcial: "sin perderse ni duplicarse" sí; la fachada, no | Sí: los chips llegan con la voz | El mejor hilo del guion, pero se apoya en decisiones que el espectador no tiene ancladas |
| chain (34 s) | Cadena de renuncias; telemetría por módulo; ítem más caro; escala vertical; único punto de falla; extracción de un módulo; identidad en el borde | Cada eslabón, 5 a 7 s | Parcial | "Único punto de falla", "escala vertical" y "la identidad en el borde ya dejó lista la seguridad", sin explicar | **No**: no se dice por qué se acepta un único punto de falla (menos de una petición por segundo) ni qué tiene que ver la identidad con un módulo que sale | Sí: una fila por frase | Repite las mismas cuatro decisiones de `mother` con otro marco, sin avisarlo. El hilo se enuncia, no se recorre |
| outro (25 s) | Trazabilidad; el jurado; el método | 9 s; 5 s | — | Sí | Sí | Sí | No repasa las ideas del capítulo. Faltan dos hilos del capítulo escrito ("una misma vara" y "cinco puertas abiertas") |

### Dónde se pierde el espectador tipo

- **"¿Qué es un ADR?"** El capítulo arranca con "dieciséis ADRs" y no recuerda que es el registro escrito de una decisión (capítulo 3).
- **"¿Qué es un health check? ¿Qué es infraestructura como código?"** Cinco nombres técnicos en una frase, para descartarlos. No hacía falta nombrarlos: alcanzaba con decir por qué quedan fuera.
- **"¿Qué significa 'estructural'?"** Es el criterio de la curaduría y no se explica.
- **"¿Por qué dos ADRs son una sola decisión?"** Se afirma sin el porqué: uno es el problema (el stock llega tarde) y el otro su respuesta (un catálogo en el teléfono).
- **"¿Qué es un pilar? ¿Por qué estas decisiones van juntas?"** Las zonas se nombran con títulos largos y ningún criterio.
- **"¿Qué era 'identidad en el borde'? ¿Y 'feedback propio'? ¿Y la 'fachada'? ¿Y la 'cola con acuse'?"** Diez decisiones nombradas en 20 s. Para alguien que vio el capítulo 6 hace una semana, son etiquetas vacías. Esta es la pregunta que más se repite.
- **"¿Qué significan las líneas punteadas?"** "La misma lógica" no dice qué lógica.
- **"¿Por qué el monitoreo es el contrapeso del monolito?"** El "piénsalo tú" pide una relación que la voz nunca dio.
- **"¿Por qué el monolito lleva a confianza cero? ¿Y a escala vertical?"** Las dos flechas se nombran sin su porqué.
- **"¿Por qué aceptar un único punto de falla?"** Falta el número del caso: menos de una petición por segundo.
- **"¿Por qué `mother` y `chain` me muestran las mismas cuatro decisiones?"** Son el mismo hilo contado dos veces, con marcos distintos y sin unirlos.
- **"¿Bola de barro o bola de lodo?"** Los capítulos 4 y 5 dicen "bola de lodo".
- **"¿Qué me llevo?"** No hay repaso final.

## 2. El plan

### Las ideas esenciales del capítulo

1. **Cada decisión se lee como problema, decisión y renuncia.** Es el ADR del capítulo 3 en lenguaje llano. Una decisión sin renuncia escrita es propaganda.
2. **Las diez decisiones se ordenan en tres pilares, según el tipo de problema que resuelven**: la forma del sistema, el choque con el mundo real y el dinero de una startup pequeña. Cada decisión vuelve a anclarse en una frase: qué problema resolvió.
3. **Ninguna decisión está sola.** Una lleva a la otra (las flechas del monolito), y cada renuncia la paga la decisión siguiente (la cadena). Una compra cruza los tres pilares.

El cierre las repasa y ata la tercera con la trazabilidad que premió el jurado.

### Qué recibe más espacio

- **La curaduría, con su porqué** (`sieve`, unos 40 s). Se recuerda qué es un ADR. Los cinco excluidos no se enumeran: se dice por qué quedan fuera ("útiles, pero no cambian la forma del sistema"). La fusión 012 + 013 se explica como problema y respuesta.
- **La anatomía, con el contrapeso dicho en voz alta** (`anatomy`, unos 55 s). "Bola de lodo" se define ("todo depende de todo"). El contrapeso, medir cada módulo con telemetría, se dice: es la herramienta del "piénsalo tú" posterior.
- **El mapa, en tres escenas, una por pilar** (`core`, `physical`, `budget`, unos 2:30 en total). Cada pilar abre con el tipo de problema que agrupa y cierra con una frase de síntesis. **Cada una de las diez decisiones recibe su frase propia**, con su capítulo de origen, el problema y la respuesta, y una ficha en pantalla con esas dos líneas. Son recuerdos, no conceptos nuevos: de 6 a 12 s cada uno, unos 15 s por pilar más la síntesis.
- **Las flechas del monolito y el "piénsalo tú"** (`mother`, unos 50 s). El mapa completo se arma, y recién entonces se explica qué significa una flecha. El "piénsalo tú" llega cuando el espectador ya oyó que el contrapeso es medir cada módulo (`anatomy`) y que el monitoreo alquilado es quien hace las mediciones (`budget`).
- **La cadena de renuncias, recorrida paso a paso** (`chain`, unos 55 s). Continúa el hilo de `mother`, en lugar de repetirlo: monitoreo → escala vertical → extracción → confianza cero. Cada eslabón dice su renuncia **y por qué se acepta** (el monitoreo, porque mide; el único punto de falla, por menos de una petición por segundo; la verificación extra, porque deja lista la seguridad).
- **Las cinco puertas abiertas** (`doors`, unos 24 s). **Ahora sí entra**: es la conclusión natural de la cadena (el hilo termina con un módulo que sale, y eso estaba previsto). Se nombra el principio del capítulo 3, la evolucionabilidad, con su definición. Las cinco decisiones se marcan en el mapa sin enumerarlas en voz alta: el espectador acaba de oír las cinco.
- **El camino del dinero** (`money`, unos 34 s), más breve que antes porque sus cuatro decisiones ya están ancladas: es un recorrido de repaso, un paso por frase.
- **Un repaso final** de las tres ideas, cada una con su línea y su pausa.

### Qué se recorta

- **"Una misma vara, respuestas opuestas"** (comprar el monitoreo, construir el feedback). **Sigue fuera**, con criterio: el capítulo 9 cerró con esa misma lección unos minutos antes ("la misma pregunta, la respuesta opuesta"). No es una flecha entre decisiones, que es la tesis de este capítulo. Bien contada costaba unos 40 s más, y el capítulo ya está en el límite de los 7 minutos. El curso escrito la cubre, y el checkpoint la pregunta.
- **La enumeración de los cinco ADRs excluidos** (plantilla, chequeos de salud, mapas, infraestructura como código): se ven en pantalla, apagados, y la voz da solo el criterio.
- **Las etiquetas de pilar en la escena de la curaduría**: los pilares todavía no existen en ese momento. Ahora hay dos pilas: fuera del mapa y en el mapa.
- **Las líneas punteadas "de la misma lógica"**: nunca se explicaban. Solo queda la que une la cola con event sourcing en el camino del dinero, y ahí la voz dice qué hacen juntas.
- **Los rótulos "En el ADR: contexto / decisión / consecuencias"** en `anatomy`: competían con la voz.
- **Las dos flechas finales de `mother`**, que se decían en 6 s: ahora las recorre `chain`.

### Las escenas nuevas

| # | id | Kicker | Qué enseña |
| - | - | - | - |
| 1 | `intro` | Capítulo 10 | Las decisiones no viven solas: una lleva a la otra. Hoy, el mapa |
| 2 | `sieve` | La curaduría | Qué es un ADR (recuerdo). Por qué cinco quedan fuera. Por qué dos son una sola decisión. Once ADRs, diez decisiones |
| 3 | `anatomy` | La curaduría | Problema, decisión y renuncia, con el monolito. Bola de lodo, definida. El contrapeso, dicho. Sin renuncia, propaganda |
| 4 | `core` | El mapa | Los tres pilares. Pilar 1, el núcleo: monolito, event sourcing y cola con acuse, cada uno con su problema |
| 5 | `physical` | El mapa | Pilar 2, el mundo real: PIN offline, catálogo local y feedback propio, cada uno con su problema |
| 6 | `budget` | El mapa | Pilar 3, el dinero: monitoreo alquilado, identidad en el borde y confianza cero, escala vertical y fachada de pagos |
| 7 | `mother` | Los hilos | El mapa completo; qué es una flecha; por qué el monolito es la decisión madre; "piénsalo tú" con herramientas |
| 8 | `chain` | Los hilos | La cadena de renuncias, eslabón por eslabón, con el porqué de cada renuncia aceptada |
| 9 | `doors` | Los hilos | Cinco decisiones dejan escrita su salida: la evolucionabilidad del capítulo 3 |
| 10 | `money` | Los hilos | Una compra cruza los tres pilares |
| 11 | `outro` | Para llevarte | Repaso de las tres ideas, la trazabilidad y el adelanto del capítulo 11 |

## 3. El guion nuevo (11 escenas, 945 palabras)

**Duración estimada:** a 2,2 palabras por segundo, más las pausas escritas (22 s), da unos 7:30. Al ritmo que tuvo la voz real en el capítulo 4 (2,28 palabras por segundo, contando los silencios entre frases), da unas 7:15. `node tools/timing.mjs estimate` da 479 s (8:00), porque su narrador simulado es más lento que la voz real. Queda un poco por encima de los 7 minutos: el tramo del mapa (tres escenas, unos 2:30) es lo que el capítulo anterior pasaba en 41 s, y es justo lo que el usuario señaló. Antes de recortarlo, se sacaron "una misma vara", la enumeración de los ADRs excluidos y la repetición entre `mother` y `chain`.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (23 s) | Las decisiones no viven solas (la tesis del capítulo) | 14 s, con su pausa, y vuelve en `mother`, `chain` y el repaso | Sí: primero las diez sueltas, después una flecha entre dos, después el mapa | Sí | Sí: "una lleva a la otra" | Sí: los diez nodos llegan de a uno, la flecha se dibuja con la frase y el mapa se arma con "juntamos" | Correcta |
| sieve (41 s) | ADR (recuerdo del capítulo 3); el criterio de la curaduría; 012 + 013, una sola decisión | ADR 7 s (recuerdo, con chip en pantalla); criterio 10 s, con pausa; la fusión 18 s | Sí: las 16 fichas antes de filtrarlas; el problema y la respuesta antes de "una sola decisión" | Sí: "el registro escrito de una decisión"; "útiles, pero no cambian la forma del sistema" | Sí: dos ADRs son el problema y su respuesta | Sí: se apaga una ficha por frase, el criterio queda escrito bajo la pila, y las fichas 012 y 013 se encienden cuando se nombran | Correcta. Los cinco excluidos se ven, pero la voz no los enumera |
| anatomy (54 s) | Problema, decisión y renuncia; bola de lodo; contrapeso; propaganda | El marco 12 s; el ejemplo completo 38 s (bola de lodo 10 s, con pausa; contrapeso 7 s); propaganda 4 s, con pausa | Sí: las tres preguntas se ven vacías y se llenan con el monolito | Sí: "bola de lodo, donde todo depende de todo"; "medir cada módulo por separado, con telemetría" | Sí | Sí: cada columna se llena con su frase, y su texto es el mismo que dice la voz | Correcta. El contrapeso queda dicho: es la herramienta del "piénsalo tú" |
| core (46 s) | Qué es un pilar; pilar 1; event sourcing y cola con acuse (recuerdos del capítulo 6) | Pilares 8 s, con pausa; núcleo 5 s; monolito 5 s (recién explicado); event sourcing 10 s; cola 9 s; síntesis 6 s, con pausa | Sí: cada decisión con su problema | Sí: cada una en una frase llana | Sí: reclamos con evidencia; un cobro que espera confirmación | Sí: una ficha por decisión, con unas 15 palabras, que queda toda la frase (de 5 a 10 s) | Correcta |
| physical (47 s) | Pilar 2; PIN offline, catálogo local y feedback propio (recuerdos) | Pilar 5 s; PIN 9 s; catálogo 11 s; feedback 11 s; síntesis 8 s, con pausa | Sí | Sí | Sí: sin señal, el código se entregó antes; el stock llega tarde; los datos de salud no salen | Sí: ficha por decisión y tarjeta de síntesis con tres filas | Correcta |
| budget (60 s) | Pilar 3; monitoreo alquilado, identidad en el borde con confianza cero, escala vertical y fachada de pagos (recuerdos) | Pilar 4 s; monitoreo 12 s; identidad y confianza cero 12,5 s; escala 8 s; fachada 14 s (respuesta y porqué); síntesis 6 s, con pausa | Sí | Sí. La fachada se define: "una pieza propia" a la que le hablan las órdenes, en lugar del proveedor | Sí: lo gratis costaba horas; validar una vez; poca carga; cambiar de proveedor sin tocar las órdenes | Sí. En la fachada, la respuesta aparece con su frase y el problema con la siguiente, en el orden en que se dicen | Correcta. Las "mediciones" del monitoreo atan con el contrapeso de `anatomy` |
| mother (48 s) | El mapa completo; qué es una flecha; la decisión madre; "piénsalo tú"; el monitoreo como contrapeso | Mapa 4 s; flecha y madre 11 s, con pausa; renuncia 6,5 s; pregunta 5 s + 3 s; respuesta 14 s, con pausa | Sí: primero las flechas, después el nombre "decisión madre" | Sí: "cada flecha dice que una decisión llevó a otra" | Sí: el contrapeso exigía medir, alguien tenía que pagarlo, y medir dice cuándo separar | Sí: la pregunta en pantalla repite el riesgo y el contrapeso, así que se responde con lo ya dicho | Correcta. El "piénsalo tú" llega con las herramientas dadas en `anatomy` y `budget` |
| chain (55 s) | La cadena de renuncias; único punto de falla y por qué se acepta; confianza cero como la que espera al módulo | Cuatro eslabones, de 7 a 15 s cada uno; el porqué del único punto de falla 7 s, con pausa; la regla 3 s, con pausa | Sí: se recorre eslabón por eslabón antes de enunciar la regla | Sí: "mientras no haya copias, la máquina grande es un único punto de falla" | Sí: cada renuncia con la razón por la que se acepta (mide; menos de una petición por segundo; deja lista la seguridad) | Sí: una fila y una renuncia por frase; la nota del porqué aparece con su frase | Correcta. Continúa el hilo de `mother` en lugar de repetirlo |
| doors (23 s) | Cinco decisiones con salida escrita; evolucionabilidad (recuerdo del capítulo 3) | 23 s en total; el principio, 7 s con pausa, con la tarjeta en pantalla | Sí: el final del hilo (un módulo que sale) antes del principio | Sí: "diseñar para separar mañana, sin separar hoy" | Sí: la salida estaba prevista desde el día uno | Sí: las cinco puertas llegan de a una, cada 0,45 s, y quedan 7 s antes de la tarjeta | Correcta. Es un detalle de síntesis, y una frase basta porque las cinco decisiones se acaban de ver |
| money (31 s) | El recorrido de una compra (repaso) | Un paso por frase, de 4 a 6,5 s cada uno; síntesis 4 s, con pausa | Sí | Sí: las cuatro decisiones se anclaron hace menos de 3 minutos | Sí: stock al pagar; sin perderse ni duplicarse; evidencia para un reclamo | Sí: cada nodo se enciende y su chip aparece con su frase | Correcta |
| outro (42 s) | Repaso de las 3 ideas; trazabilidad; adelanto | Cada idea de 6 a 7 s, con pausa; la trazabilidad 8 s, con pausa | — | — | — | Sí: las tres tarjetas quedan juntas hasta el final del repaso | Correcta |

**Ningún concepto importante queda por debajo de unos 20 s.** Las diez decisiones del mapa son recuerdos de capítulos anteriores: cada una recibe su propia frase, de 5 a 14 s, con el problema y la respuesta, y vuelven a aparecer en los hilos (el monolito, el monitoreo, la escala, la confianza cero, la cola, event sourcing, el catálogo y la fachada, todos dos veces o más).

### Verificación

- `node tools/timing.mjs estimate`: 11 escenas, 67 líneas, 479 s estimados.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, runtime y layout. Contraste: 138 de 138 textos pasan WCAG AA. La única advertencia es la esperada de `#chrome`. Los avisos informativos de texto tapado son el mapa atenuado debajo de la tarjeta del principio, en `doors`, a propósito.
- Capturas en `snapshots/peda` (al final de cada escena y en los momentos clave) y `snapshots/peda2` (las transiciones entre fichas, las puertas y la pregunta). A partir de ellas se corrigieron el criterio de la curaduría, que tapaba la última ficha excluida; la tarjeta del principio, que partía "hoy." en dos líneas; y dos fichas del núcleo que llegaban tarde y dejaban la mitad derecha vacía mientras la voz ya nombraba la decisión.
