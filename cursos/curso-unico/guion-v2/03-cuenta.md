# Bloque 3 · Comprobar con una cuenta

**Enseña:** una cualidad elegida se comprueba con números; la cuenta muestra qué supuesto decide el resultado; si todavía no se puede medir, la decisión queda condicionada a ese número.
**Par:** la latencia de MonitorMe, tramo por tramo, y el algoritmo de ClearView, elegido por cuántas llamadas al modelo hace.
**Trae (ver `ACTO1-CONTINUIDAD.md`):** MonitorMe y sus tres cualidades (el rendimiento entre ellas), ClearView y sus historias anónimas, el emparejamiento, la factibilidad. **Presenta:** ningún caso; los términos modelo de lenguaje, intermediario de mensajes y supuesto.

## Un segundo, repartido {#monitorme}

**Narración**

MonitorMe, el sistema para hospitales, tiene que mostrar los signos vitales en un segundo o menos. Su equipo no se quedó en la frase y la convirtió en una cuenta.

Primero calcularon cuántas señales llegan. En promedio, cada paciente manda poco más de cuatro señales por segundo, entre todos sus sensores. Para el peor momento el equipo supuso ocho, y una instalación tiene hasta quinientos pacientes. En el pico, eso da cuatro mil señales por segundo.

Después siguieron el camino de una señal, de punta a punta. Pasa por el servicio que la guarda y por el que la muestra en pantalla. Pasa también por la base de datos y por el intermediario de mensajes, la pieza que los reparte entre los servicios. Y viaja por la red del hospital. A cada tramo le pusieron un tiempo y los sumaron. Dio poco menos de setecientos milisegundos, por debajo del segundo.

**Visual**
- Sello: MonitorMe.
- Imagen central: una barra horizontal de 1000 ms (el presupuesto), y debajo el camino de la señal.
- «al decir "un segundo o menos"» → la barra vacía con "1 s" a la derecha.
- «al decir "poco más de cuatro señales"» → un paciente con un contador "4,2/s"; «al decir "supuso ocho"» → el contador pasa a "8/s"; «al decir "quinientos pacientes"» → la persona se multiplica en una grilla; «al decir "cuatro mil señales por segundo"» → `cifra` "4.000/s".
- «al decir "el camino de una señal"» → cinco piezas de izquierda a derecha: el servicio que guarda, el que muestra, la base de datos, el intermediario (pieza cola), la red (línea). Un punto `viajar` por todas.
- «al decir "A cada tramo le pusieron un tiempo"» → cada pieza suelta un segmento que cae a la barra: 320, 320, 16, 5, 32.
- «al decir "poco menos de setecientos"» → `cifra` "693 ms" sobre la barra; el resto, hasta 1000, en verde.
- Al final: la barra llena hasta 693 con sus cinco segmentos.

## El número que manda {#supuesto}

**Narración**

Esa cuenta dice algo más si se la mira de cerca, y lo que sigue ya es lectura nuestra de sus números. Más del noventa por ciento del tiempo está en los dos servicios que procesan la señal. La base de datos, el intermediario y la red, que es lo que más se suele discutir, pesan muy poco.

Y esos dos tramos salen de un solo supuesto que el equipo dejó escrito, que procesar una señal tarda dos milisegundos. Con tres milisegundos, la suma pasa del segundo. La cuenta no solo aprueba el diseño. También dice qué número hay que medir antes que nada. Y si todavía no se puede medir, la decisión queda condicionada a ese número, y eso también se escribe.

**Visual**
- Imagen central: la misma barra.
- «al decir "Más del noventa por ciento"» → los dos segmentos de 320 en naranja; el resto a segundo plano. Etiqueta "92 %".
- «al decir "pesan muy poco"» → los tres segmentos chicos se señalan con una lupa.
- «al decir "procesar una señal tarda dos milisegundos"» → sobre los dos segmentos grandes, una perilla con "2 ms" (marcada "supuesto").
- «al decir "Con tres milisegundos"» → la perilla gira a "3 ms"; los dos segmentos crecen a 480; la barra pasa de 1000 y el exceso se vuelve rojo.
- «al decir "qué número hay que medir"» → la perilla en naranja.
- Al final: la perilla vuelve a 2 ms; la barra vuelve a 693.

## La cuenta en dinero {#clearview}

**Narración**

ClearView hizo una cuenta del mismo tipo, pero en dinero. Usa un modelo de lenguaje, la inteligencia artificial que lee y escribe texto. Cada vez que le pide algo, paga por el texto que manda y por el que recibe. Así que el equipo midió sus opciones de emparejamiento en cantidad de llamadas al modelo.

Compararon seis formas de emparejar las historias, las versiones anónimas de los currículums, con los puestos. En algunas, el modelo mira cada historia junto a cada puesto. En otras, el modelo describe una sola vez cada historia y cada puesto, y el emparejamiento se hace después sin él. Para las primeras, las llamadas crecen con las historias multiplicadas por los puestos. Para las segundas, crecen con las historias sumadas a los puestos.

Con números nuestros, para verlo: mil historias y cien puestos son cien mil llamadas en el primer caso, y mil cien en el segundo. Cuando cambia un currículum, el segundo camino vuelve a pedir una sola descripción. El equipo eligió una forma del segundo grupo.

**Visual**
- Sello: ClearView.
- Imagen central: una grilla de historias (filas) por puestos (columnas).
- «al decir "paga por el texto"» → el modelo con una moneda que sale por cada llamada.
- «al decir "el modelo mira cada historia junto a cada puesto"» → la grilla se llena celda por celda, cada celda con una moneda.
- «al decir "describe una sola vez cada historia y cada puesto"» → una columna de historias y una fila de puestos, cada una con una sola moneda; el emparejamiento ocurre en una pieza "regla" sin monedas.
- «al decir "mil historias y cien puestos"» → `comparar`: izquierda "100.000 llamadas"; derecha "1.100 llamadas"; arriba, "ejemplo nuestro".
- «al decir "Cuando cambia un currículum"» → en la derecha, una historia cambia y se ilumina una sola moneda; en la izquierda, una fila entera.
- Al final: las dos cifras lado a lado.

## Tiempo y dinero {#comparacion}

**Narración**

Una cuenta mide tiempo y la otra mide dinero, y en las dos un solo número mueve todo. En MonitorMe, los dos milisegundos por señal. En ClearView, cuántas veces se llama al modelo. Ese número dice qué hay que medir primero, y qué decisión depende de él.

**Visual**
- Imagen central: `comparar`. Izquierda, la barra de MonitorMe con la perilla "2 ms". Derecha, la cifra de llamadas de ClearView con una perilla "llamadas al modelo".
- «al decir "un solo número mueve todo"» → las dos perillas en naranja a la vez.
- «al decir "qué hay que medir primero"» → bajo cada perilla, un cronómetro y una moneda con contador.
- Al final: las dos perillas resaltadas.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Promedio de 4,22 señales por segundo por paciente; pico supuesto de 8 por paciente; 500 pacientes; 4.000 señales/s en el pico ("PEAK · 8 * 500 · 4000") | `BluzBrothers/FitnessFunctions/Sizing.md` l. 4-25 |
| Tramos: 320 (Vital Sign Recorder, el que guarda) + 320 (Vital Sign Streamer, el que muestra) + 16 (escritura en la base) + 5 (plataforma de mensajes, "Send to Streaming Platform") + 32 (LAN) = 693 ms | `BluzBrothers/FitnessFunctions/Sizing.md` l. 27-67 |
| "If we assume that processing 1 signal takes 2 milliseconds" | `BluzBrothers/FitnessFunctions/Sizing.md` l. 51 |
| "Intermediario de mensajes": el documento lo llama "Message Streaming Platform" (Kafka como ejemplo; la elección final queda para después) | `BluzBrothers/FitnessFunctions/Sizing.md` l. 35-41 |
| 640 de 693 ms (92 %); con 3 ms: 480 + 480 + 53 = 1.013 ms | Cuenta nuestra sobre `Sizing.md` |
| ClearView compara seis procesos de emparejamiento (A a F); el ADR está Accepted | `Pragmatic/ADR/ADR-011-deterministic-matching.md` l. 9, 31-40 |
| "linear, O(n+m), for A and B, but quadratic for all others"; las actualizaciones "significantly better for option B and A" | `Pragmatic/ADR/ADR-011-deterministic-matching.md` l. 45-48 |
| Historia: "Anonymized format of the resume as text" | `Pragmatic/ADR/ADR-011-deterministic-matching.md` l. 20 |
| Pago por texto enviado y recibido: "pay per token (scales with the amount of text in the prompt & also incoming token)" | `Pragmatic/Requirements/Research/interview-ai-expert.md` l. 28-29 |
| Mil historias y cien puestos: 100.000 frente a 1.100 llamadas | Ejemplo nuestro, se dice como tal |
| Eligió la opción B | `Pragmatic/ADR/ADR-011-deterministic-matching.md` l. 55 |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El bloque abre sin ubicar a MonitorMe (un video se puede ver suelto); el par se compara en voz alta en la última escena; la idea del bloque 2 (una renuncia con su condición) vuelve como "la decisión queda condicionada a ese número" | Se agrega "el sistema para hospitales" en la primera frase; el resto se mantiene |
| 2 | Arquitecto senior | La cuenta suma tiempos de tramos con distinta base (procesar un segundo de señales de una conexión, una escritura, la red), pero es lo que hizo el equipo y la lección no la presenta como medición; "modelo de lenguaje" e "intermediario" son los términos que el espectador va a encontrar | Se mantiene la cuenta como cuenta del equipo; se definen los dos términos |
| 3 | Verificador | El borrador decía que 4,2 señales por paciente por 500 pacientes daban 4.000 en el pico: eso es el promedio (2.100); el pico sale de un supuesto de 8 por paciente | La narración separa promedio y pico; la tabla cita la fila "PEAK"; la fila de tramos nombra cada servicio |
| 4 | Guionista | "Encontrar ese número es la mitad del trabajo" es un calificativo sin base | Se corta: queda lo que ese número dice |
| 5 | Espectador de prueba | "Historias" no se entiende si no se vio la apertura; "modelo de lenguaje" e "intermediario de mensajes" sin definir (pendiente anotado en `ACTO1-CONTINUIDAD.md`) | "Las historias, las versiones anónimas de los currículums"; las dos definiciones en una frase cada una |
| 6 | Dirección visual | Cada escena tiene imagen desde la primera palabra (la barra, la perilla, la grilla, el par); el detalle va en `video/b03/IDEAL.md` | Sin cambios en el guion |
| 7 | Producción | Ids sin cambios (`monitorme`, `supuesto`, `clearview`, `comparacion`); unas 640 palabras, unos 4,5 minutos | Sin cambios |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
