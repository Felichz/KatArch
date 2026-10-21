# Bloque 3 · Comprobar con una cuenta

**Enseña:** una cualidad elegida se comprueba con números; la cuenta muestra qué supuesto decide el resultado; si todavía no se puede medir, la decisión queda condicionada a ese número.
**Par:** la latencia de MonitorMe, tramo por tramo, y el algoritmo de ClearView, elegido por cuántas llamadas al modelo hace.

## Un segundo, repartido {#monitorme}

**Narración**

MonitorMe tiene que mostrar los signos vitales en un segundo o menos. Su equipo no se quedó en la frase y la convirtió en una cuenta.

Primero calcularon cuántas señales llegan en el peor momento. Cada paciente manda poco más de cuatro señales por segundo, entre todos sus sensores, y una instalación tiene hasta quinientos pacientes. En el pico, eso da unas cuatro mil señales por segundo.

Después siguieron el camino de una señal, de punta a punta. Pasa por el servicio que la guarda y por el que la muestra en pantalla. Pasa también por la base de datos, por el intermediario de mensajes y por la red del hospital. A cada tramo le pusieron un tiempo y los sumaron. Dio poco menos de setecientos milisegundos, por debajo del segundo.

**Visual**
- Sello: MonitorMe.
- Imagen central: una barra horizontal de 1000 ms (el presupuesto), y debajo el camino de la señal.
- «al decir "un segundo o menos"» → la barra vacía con "1 s" a la derecha.
- «al decir "poco más de cuatro señales por segundo"» → un paciente (persona) con un contador "4,2/s"; «al decir "hasta quinientos pacientes"» → la persona se multiplica en una grilla que se llena rápido; «al decir "unas cuatro mil señales por segundo"» → `cifra` "4.000/s".
- «al decir "el camino de una señal"» → `construir` cinco piezas de izquierda a derecha: Recorder ("guarda"), Streamer ("muestra"), base de datos, broker (pieza cola), red (línea). Un punto `viajar` por todas.
- «al decir "A cada tramo le pusieron un tiempo"» → cada pieza suelta un segmento de color que cae a la barra: 320, 320, 16, 5, 32. Los dos de 320 ocupan casi todo.
- «al decir "poco menos de setecientos"» → `cifra` "693 ms" sobre la barra; el resto, hasta 1000, en verde.
- Al final: la barra llena hasta 693 con sus cinco segmentos.

## El número que manda {#supuesto}

**Narración**

Esa cuenta dice algo más si se la mira de cerca, y lo que sigue es lectura nuestra de sus números. Más del noventa por ciento del tiempo está en los dos servicios que procesan la señal. La base de datos, el intermediario y la red, que es lo que más se suele discutir, pesan muy poco.

Y esos dos tramos salen de un solo supuesto que el equipo dejó escrito, que procesar una señal tarda dos milisegundos. Con tres milisegundos, la suma pasa del segundo. La cuenta no solo aprueba el diseño. También dice qué número hay que medir antes que nada. Y si todavía no se puede medir, la decisión queda condicionada a ese número, y eso también se escribe.

**Visual**
- Imagen central: la misma barra.
- «al decir "Más del noventa por ciento"» → `enfocar` los dos segmentos de 320; el resto a segundo plano. Etiqueta "92 %".
- «al decir "pesan muy poco"» → los tres segmentos chicos se agrandan un momento con una lupa y vuelven a su tamaño.
- «al decir "procesar una señal tarda dos milisegundos"» → sobre los dos segmentos grandes aparece una perilla con "2 ms" (marcada "supuesto").
- «al decir "Con tres milisegundos"» → la perilla gira a "3 ms"; los dos segmentos crecen hasta 480 cada uno; la barra pasa de 1000 y el exceso se vuelve rojo.
- «al decir "qué número hay que medir"» → la perilla se resalta en naranja.
- Al final: la perilla vuelve a 2 ms; la barra vuelve a 693.

## La cuenta en dinero {#clearview}

**Narración**

ClearView hizo una cuenta del mismo tipo, pero en dinero. Cada vez que el sistema le pide algo a un modelo de lenguaje, paga por el texto que manda y por el que recibe. Así que el equipo midió sus opciones de emparejamiento en cantidad de llamadas al modelo.

Compararon seis formas de emparejar historias con puestos. En algunas, el modelo mira cada historia junto a cada puesto. En otras, el modelo describe una sola vez cada historia y cada puesto, y el emparejamiento se hace después sin él. Para las primeras, las llamadas crecen con las historias multiplicadas por los puestos. Para las segundas, crecen con las historias sumadas a los puestos.

Con números nuestros, para verlo: mil historias y cien puestos son cien mil llamadas en el primer caso, y mil cien en el segundo. Cuando cambia un currículum, el segundo camino vuelve a pedir una sola descripción. El equipo eligió una forma del segundo grupo.

**Visual**
- Sello: ClearView. Ícono del diagrama maestro.
- Imagen central: una grilla de historias (filas) por puestos (columnas).
- «al decir "paga por el texto"» → un modelo (hexágono) con una moneda que sale por cada llamada.
- «al decir "el modelo mira cada historia junto a cada puesto"» → la grilla se llena celda por celda, cada celda con una moneda; las monedas se acumulan rápido.
- «al decir "describe una sola vez cada historia y cada puesto"» → nueva vista: una columna de historias y una fila de puestos, cada una con una sola moneda; el emparejamiento ocurre en una pieza "regla" sin monedas.
- «al decir "mil historias y cien puestos"» → `comparar`: izquierda `cifra` "100.000 llamadas"; derecha `cifra` "1.100 llamadas". Arriba de los números, en 24 px, "ejemplo nuestro".
- «al decir "Cuando cambia un currículum"» → en la derecha, una historia cambia y se ilumina una sola moneda; en la izquierda, se ilumina una fila entera.
- Al final: las dos cifras lado a lado.

## Tiempo y dinero {#comparacion}

**Narración**

Una cuenta mide tiempo y la otra mide dinero, y en las dos un solo número mueve todo. En MonitorMe, los dos milisegundos por señal. En ClearView, cuántas veces se llama al modelo. Encontrar ese número es la mitad del trabajo, porque dice qué hay que medir primero y qué decisión depende de él.

**Visual**
- Imagen central: `comparar`. Izquierda, la barra de MonitorMe con la perilla "2 ms". Derecha, la cifra de llamadas de ClearView con una perilla "llamadas al modelo".
- «al decir "un solo número mueve todo"» → las dos perillas se resaltan en naranja a la vez.
- «al decir "qué hay que medir primero"» → bajo cada perilla aparece un instrumento de medida simple (un cronómetro; una moneda con contador).
- Al final: las dos perillas resaltadas.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| 4,22 señales por segundo por paciente; 500 pacientes; ~4.000 señales/s en pico | `BluzBrothers/FitnessFunctions/Sizing.md` l. 6-25 |
| Tramos: 320 + 320 (Recorder y Streamer, 2 ms por señal, supuesto) + 16 (cota de escritura) + 5 (Kafka, tabla final) + 32 (LAN) = 693 ms | `BluzBrothers/FitnessFunctions/Sizing.md` l. 29-65 ("Let's assume that processing 1 signal takes 2 milliseconds", l. 51) |
| 640 de 693 ms (92 %); con 3 ms la suma pasa de 1.000 ms | Cuenta nuestra sobre `Sizing.md` |
| ClearView compara seis procesos de emparejamiento (A-F) | `Pragmatic/ADR/ADR-011-deterministic-matching.md` l. 33-40 |
| "linear, O(n+m), for A and B, but quadratic for all others"; actualizaciones "significantly better for option B and A" | ADR-011 l. 45-48 |
| Costo por token (paga por texto enviado y recibido) | `Pragmatic/Requirements/Research/interview-ai-expert.md` l. 28-30 |
| Mil historias y cien puestos: 100.000 frente a 1.100 llamadas | Ejemplo nuestro, se dice como tal |
| Eligió la opción B | ADR-011 l. 55-56 |
