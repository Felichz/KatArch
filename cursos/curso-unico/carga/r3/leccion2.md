Total: 40 ideas, duración 6:48 (tiempos de `carga\r3\tiempos-ch2.txt`).

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) MonitorMe es un sistema para hospitales que muestra en la estación de enfermería los signos vitales y avisa cuando salen de rango. | 3 | 1 | MonitorMe | Caso nuevo con nombre propio y dos términos (estación de enfermería, rango) en una frase. Es el arranque, sin salto previo. |
| 2 | 0:10 | El pedido tiene dos frases que condicionan el diseño: una pide respuesta media de un segundo o menos; la otra, que siga funcionando si falla un dispositivo. | 3 | 1 | — | Dos requisitos con cifra en la misma idea; "condicionan el diseño" es abstracto. Continúa el gancho. |
| 3 | 0:24 | Ninguna de las dos dice cómo es el sistema por dentro, y sin embargo de ellas sale casi toda su forma. | 2 | 1 | — | Idea de transición con conector ("y sin embargo"). Sin cifras ni nombres nuevos. |
| 4 | 0:32 | (pregunta) Esas frases piden una cualidad: una propiedad que el sistema tiene aparte de lo que hace. | 3 | 2 | — | Concepto central nuevo, definido en la misma frase. El cambio de escena se apoya en "esas frases". |
| 5 | 0:40 | La primera frase pide rendimiento, o sea, qué tan rápido responde. | 2 | 1 | — | Un término nuevo con gloss. Continúa el ejemplo anterior. |
| 6 | 0:40 | En la comunidad de las katas las llaman características de arquitectura, pero aquí se dice cualidades. | 2 | 1 | — | Repite la definición de la lección 1 (cualidades y características de arquitectura ya están en su línea 45). Carga baja, pero no aporta nada nuevo. |
| 7 | 0:50 | Un pedido da más cualidades de las que se pueden atender a la vez, por eso se arma una lista corta de prioridades: en estos ejemplos, siete. | 3 | 1 | — | Cifra (siete) y un concepto de priorización. Se apoya en la idea de cualidades ya dada. |
| 8 | 0:59 | Tres de esas prioridades mandan, y sirven para elegir la forma general del sistema, lo que se llama su estilo. | 3 | 2 | — | "Estilo" aparece como término nuevo, presentado en la misma frase. Sube un nivel de abstracción. |
| 9 | 1:08 | (estilo) Falta decir qué es un estilo y cómo se elige. | 1 | 2 | — | Puente de escena: anuncia el tema sin contenido nuevo. |
| 10 | 1:11 | Un estilo es esa forma general. El monolito es todo el sistema en una pieza que se despliega junta; microservicios son muchas piezas pequeñas que se despliegan por separado. | 3 | 1 | — | Dos estilos con definición en la misma idea. Continúa lo anterior sin salto. |
| 11 | 1:23 | Para elegir, los equipos usan una tabla de estilos: una cualidad por fila, un estilo por columna, cada casilla de una a cinco estrellas, filas fijas para todos los proyectos. | 4 | 2 | — | Herramienta nueva con tres reglas en una sola idea (estructura, escala, fijeza). Anunciada por el puente, así que la fricción es paso lógico. |
| 12 | 1:40 | Una cualidad de ejemplo es la elasticidad: aguantar los picos de carga sin que se note. | 3 | 2 | — | Cualidad nueva que entra como ejemplo de la tabla. Sin nombre previo. |
| 13 | 1:47 | En la tabla, el monolito saca una estrella en elasticidad y microservicios saca cinco. La explicación es nuestra. | 3 | 1 | — | Dos cifras de la tabla y un aviso de origen (la explicación no sale del repositorio). |
| 14 | 1:54 | Para atender un pico hay que levantar copias del sistema: con un monolito se copia todo, con microservicios solo la pieza saturada. | 3 | 1 | — | Cadena causal que explica la cifra anterior. "Pieza saturada" es un término nuevo. |
| 15 | 2:03 | Se mira la fila de cada cualidad que manda y se elige el estilo que suma más estrellas. Quedan dos caminos para llegar a esas cualidades. | 3 | 2 | — | Regla de decisión y anuncio de dos caminos. Cierra la escena de estilo. |
| 16 | 2:13 | (cadena) Primer camino: leer el pedido frase por frase y anotar qué cualidad pide cada una. Así lo hizo MonitorMe, con notas adhesivas. | 2 | 2 | — | Método anunciado con el "primer camino". Introduce el caso que ya se conoce. |
| 17 | 2:23 | La frase de un segundo recibió una nota de rendimiento; la del dispositivo que falla recibió, entre otras, una de disponibilidad: que el sistema funcione cuando se lo necesita. | 3 | 1 | — | Disponibilidad se presenta aquí con su definición. Dos notas de dos frases. |
| 18 | 2:37 | La frase de más dispositivos recibió varias notas, entre ellas evolutividad (qué tan fácil resulta cambiar el sistema) y elasticidad. | 3 | 1 | — | Evolutividad nueva, con definición. Continúa el recorrido por frases. |
| 19 | 2:47 | El pedido dio nueve candidatas; siete quedaron prioritarias; tres mandan: evolutividad, rendimiento y elasticidad. | 4 | 1 | — | Tres cifras (9, 7, 3) y tres cualidades en un solo párrafo. Es el resumen del primer camino. |
| 20 | 2:59 | Entre las que se bajaron está la escalabilidad: manejar cargas cada vez mayores sin perder rendimiento. | 3 | 2 | — | Término nuevo que se parece a la elasticidad. La frase "entre las que se bajaron" sugiere más de una y solo nombra una. Su definición no coincide con la de la lección 3. |
| 21 | 3:07 | Con las tres, el equipo fue a la tabla y eligió un estilo basado en eventos, event-driven: las partes se avisan de lo que pasa mandándose mensajes. | 3 | 2 | — | Estilo nuevo con nombre en inglés y una glosa que es del curso. Salto de un paso a la tabla. |
| 22 | 3:20 | En la tabla, event-driven saca cuatro estrellas en elasticidad, cinco en evolutividad y cinco en rendimiento: suma catorce, de quince posibles. | 4 | 1 | — | Tres cifras, tres cualidades y una suma con máximo, en la misma frase. Cifras verificadas en la tabla. |
| 23 | 3:29 | (disponibilidad) Queda la disponibilidad, la nota que no llegó a las tres que mandan. No quedó fuera por falta de peso. | 2 | 2 | — | Vuelta a un hilo abandonado, con puente ("queda"). "Peso" no está definido en la lección. |
| 24 | 3:35 | El equipo dividió el problema en seis partes. Cuatro son el trabajo del sistema y las llamó módulos: guardar las lecturas, analizarlas, mostrarlas y enviar los avisos. | 4 | 3 | — | Cambio de hilo sin anunciar: de las notas de cualidades a la descomposición del sistema. "Seis partes" y "módulos" llegan juntos, con cuatro nombres de función. Es el único punto con carga 4 y fricción 3. |
| 25 | 3:46 | Sobre cada módulo pegó notas con las cualidades que necesitaba. | 2 | 1 | — | Continúa la descomposición. Sin cifras. |
| 26 | 3:50 | La disponibilidad aparecía en los cuatro módulos, igual que la evolutividad; el rendimiento y la elasticidad, en tres. | 3 | 1 | — | Cuatro cifras de conteo en dos frases. Continúa el recuento. |
| 27 | 3:57 | El equipo tuvo dos razones. La primera es un razonamiento suyo: si el sistema responde rápido y aguanta los picos, debería seguir disponible. | 3 | 2 | — | Razón que encadena rendimiento, elasticidad y disponibilidad. Marcada como razonamiento del equipo. |
| 28 | 4:06 | La segunda: la tabla no tiene fila para disponibilidad, así que no ayuda a elegir el estilo. El equipo lo dejó escrito en una decisión propia con su costo, que puede hacer perder optimizaciones. | 3 | 1 | — | Decisión escrita, costo y optimizaciones, en una sola idea. "Optimizaciones de arquitectura" es abstracto y no se ejemplifica. |
| 29 | 4:24 | (dificultades) Queda visto el primer camino. Para el segundo hace falta otro caso. | 1 | 3 | — | Cambio de caso anunciado. Carga baja, pero el salto de caso pesa. |
| 30 | 4:28 | ClearView es la plataforma de una organización sin fines de lucro que empareja currículums, anonimizados, con puestos de trabajo. | 3 | 1 | ClearView | Caso nuevo: nombre propio, organización sin fines de lucro, anonimización. Primera aparición en esta lección. |
| 31 | 4:36 | Su equipo escribió primero las tres dificultades del caso y después buscó qué cualidad respondía a cada una. | 2 | 1 | — | Método contado en orden. "Dificultades" queda definida por el uso. |
| 32 | 4:44 | La primera dificultad es que usa inteligencia artificial, que no da siempre el mismo resultado; una versión nueva del modelo puede cambiar lo que sale. Eso pide testabilidad: qué tan fácil y completo resulta probar el sistema. | 4 | 1 | — | IA y no determinismo, más una cualidad nueva definida, en la misma idea. Dos conceptos abstractos seguidos. |
| 33 | 4:57 | La segunda dificultad es que la organización vive de donaciones y el modelo cuesta dinero. Eso pide factibilidad: decidir teniendo en cuenta los plazos, el presupuesto y las habilidades del equipo. | 3 | 1 | — | Cualidad nueva con definición de tres factores. Se apoya en la dificultad. |
| 34 | 5:09 | La tercera dificultad es integrarse con muchos sistemas de recursos humanos, cada uno con una forma distinta de conectarse. Eso pide interoperabilidad. | 3 | 1 | — | Tercera cualidad nueva, con su definición. "Recursos humanos" queda sin explicar. |
| 35 | 5:22 | La seguridad encabeza las siete prioridades de ClearView, pero no está entre las tres que eligen el estilo, porque esas salieron de las dificultades. | 3 | 2 | — | Vuelta a la lista de prioridades, ahora de otro caso. Mezcla siete y tres en una frase. |
| 36 | 5:32 | (tabla) La tabla le puso un límite a ClearView: bajó la integridad de los datos (que sean correctos y no se pierdan), por tres razones: la testabilidad ya la cubre, se resuelve en el código y la tabla no tiene esa fila. | 4 | 2 | — | Cualidad nueva con definición, más tres razones en una sola idea (conteo de la misma clase). Es la idea más cargada del tramo final. |
| 37 | 5:50 | La factibilidad, que sí es una de sus tres, tampoco tiene fila. Una nota al pie la reemplaza por costo y simplicidad, y cada una cuenta la mitad. | 4 | 1 | — | Nota al pie, costo y simplicidad sin definir, y "cuenta la mitad" sin decir de qué. Verificado en la imagen de la tabla (asteriscos y 0,5x). |
| 38 | 6:01 | Una cualidad sin fila no ayuda por sí sola a elegir: se la deja fuera con su costo, como MonitorMe con la disponibilidad, o se la reemplaza; en los dos casos queda escrito. | 3 | 2 | — | Regla general, con vuelta a MonitorMe por comparación. |
| 39 | 6:15 | (cierre) Con esto, las dos frases del principio quedan en lugares distintos y parecían pesar lo mismo. La de un segundo llegó a las tres que mandan y eligió el estilo; la del dispositivo quedó fuera de la elección, pero no del sistema. | 2 | 2 | — | Vuelta a la apertura, con puente ("con esto"). Recuerda lo ya dicho. |
| 40 | 6:31 | El equipo puso la disponibilidad entre sus siete prioridades porque el sistema afecta vidas humanas y tiene que vigilarse de forma continua (razón del equipo). Se resuelve aparte, con copias duplicadas del sistema, y esa decisión también quedó escrita. | 3 | 1 | — | Cierre con razón del equipo y solución separada. Contiene "vidas humanas" y "copias duplicadas" sin explicar el segundo. |

## Lo que muestran los puntajes

1. **Un único punto con carga 4 y fricción 3.** Idea 24 (3:35): el equipo dividió el problema en seis partes y cuatro módulos. Cambia de hilo sin anunciar, desde las notas de cualidades hasta la descomposición, y trae cuatro nombres de función. Ideas 23 y 25 la rodean: 23 tiene carga 2, y 25 tiene carga 2 y fricción 1. Es el salto más grande del capítulo.

2. **Carga 4 seguida, en el tramo de la tabla de ClearView.** Ideas 36 y 37 (5:32 y 5:50) tienen carga 4 una después de la otra. La 36 mete una cualidad nueva con definición, tres razones y una tabla en una sola idea. La 37 mete una nota al pie, dos factores sin definir y "cuenta la mitad", sin decir de qué. Es el par más denso de la lección.

3. **Carga 4 con cifras, en dos sumas separadas.** Ideas 19 (2:47: nueve, siete y tres) y 22 (3:20: cuatro, cinco, cinco, catorce de quince). Las dos traen cifras de conteo con nombres de cualidad en la misma frase. Entre ellas hay solo dos ideas de carga 3 (20 y 21). La 22 es correcta, pero se lee como lista.

4. **Fricción 2 cada vez que cambia de tema, con varias vueltas.** Ideas 4, 8, 15, 21, 27, 35, 36 y 39 tienen fricción 2: cambio de escena o de tema con puente explícito. La 29 tiene fricción 3 (cambio de caso anunciado). La 20 es fricción 2 porque "las que se bajaron" queda con un solo nombre. No hay ideas con fricción 5. Ningún concepto se usa antes de presentarse; "katas" y "características de arquitectura" ya están definidos en la lección 1.

5. **Pares de casos nuevos a menos de dos minutos: ninguno.** Hay dos casos nuevos: MonitorMe (idea 1, 0:01) y ClearView (idea 30, 4:28). Están a 4 min 27 s. El caso de MonitorMe se usa durante casi 4 minutos antes de que aparezca el segundo, y cuando ClearView entra, ya no hay más casos nuevos.

6. **Ideas con fricción 3 o más y carga 3 o más:** solo la 24. **Ideas con carga 4 o más y fricción 3 o más:** solo la 24. **Pares de ideas seguidas con carga 4 o más:** 36 y 37.

## Errores de hecho y contradicciones

- **Definición de escalabilidad distinta en la lección 2 y en la lección 3.**
  - Lección 2, idea 20 (2:59): "manejar cargas cada vez mayores sin perder rendimiento". Coincide con la fuente de MonitorMe: `katas-src/BluzBrothers/ArchitectureCharacteristics/Characteristics.md` l. 18, "handle increased loads without compromising performance or user experience".
  - Lección 3, `guion\leccion3.md` línea 21: "la escalabilidad, que es poder crecer en tamaño total". Esa glosa no está en la fuente de MonitorMe. Solo se acerca a la de ClearView (`Pragmatic-src\ArchitectureCharacteristics\Characteristics.md` l. 15, "capacity and growth over time"), que es otro caso.
  - Conclusión: la de la lección 2 es la que sostiene la fuente. La lección 3 debería usar la misma, o al menos decir que es otra cosa.

- **"Entre las que se bajaron" nombra una sola.** Nueve candidatas menos siete prioritarias dan dos bajadas. La lección 2 nombra la escalabilidad y omite la despliegabilidad (deployability). Está en `BluzBrothers-src\ArchitectureCharacteristics\Characteristics.md` l. 33 ("its significance is diminished") y en `ADR\ADR-008-scalibility-downplayed.md` l. 11-21 (lista de nueve). No es un error, pero la cuenta no cierra para el espectador.

- **Verificado, sin error.** Para que conste, estas cifras y atribuciones coinciden con la fuente:
  - Notas por frase, con rendimiento en la frase del segundo: `images\characteristics.png`.
  - Disponibilidad y evolutividad en los cuatro módulos; elasticidad y rendimiento en tres: `images\components-sticky-cards.png`.
  - Event-driven con 4, 5 y 5 estrellas (14, de 15); monolito con 1 en elasticidad; microservicios con 5: `images\chosen-architecture.png`. La otra columna más alta es space-based, con 13 (5+3+5), así que "ningún otro estilo supera 13" es correcto. ADR-012 dice "14 stars".
  - Costo y simplicidad como sustitutos de factibilidad, "each 0.5x weight": `Pragmatic-src\ADR\images\ADR-002-architecture-style.png` (asteriscos en esas filas).
  - Integridad de los datos bajada por tres razones: `Pragmatic-src\ADR\ADR-004-data-integrity-downplayed.md` l. 14-18.

Ningún error de cifra ni de atribución. El único desacuerdo es la definición de escalabilidad entre las lecciones 2 y 3, y la omisión de la despliegabilidad en la idea 20.

## Qué cambiaría

1. **Anunciar el cambio de hilo en idea 24 (3:35).** Antes de "El equipo había dividido el problema en seis partes", una frase de puente: por ejemplo, "Para ver qué pasó con la disponibilidad, hay que mirar cómo partió el problema el equipo". Y "seis partes" se explica en la misma frase: seis partes del problema, cuatro de ellas son el sistema. Con eso la fricción baja de 3 a 2 y la carga de 4 a 3.

2. **Partir la idea 36 y explicar "cuenta la mitad" (ideas 36 y 37).** La 36 puede dividirse en dos: qué se bajó y por qué (tres razones, en una frase cada una o en dos ideas). En la 37, "cada una cuenta la mitad" debe decir de qué: "cada una vale la mitad de una cualidad normal en la tabla". Así el par de carga 4 se reduce a una idea de carga 4 y otra de carga 3.

3. **Unificar la definición de escalabilidad y nombrar la otra bajada (ideas 20 y lección 3, línea 21).** Usar en las dos lecciones la de la fuente de MonitorMe, o decir de qué otra cosa se habla. En la idea 20 agregar la otra bajada: "y la despliegabilidad, que se bajó porque el sistema se instala una sola vez por hospital". Eso cierra el 9 a 7 para el espectador.

4. **Quitar la repetición de la lección 1 (idea 6).** "En la comunidad de las katas las llaman características de arquitectura" ya está en la lección 1 (línea 45). Borrar la idea o reducirla a una cláusula. Baja la cantidad de ideas a 39 y deja libre un espacio de carga para el par de las ideas 36 y 37.

## Verificación

Lecturas hechas para este informe, solo en fuentes y en guiones de otras lecciones (no se leyó nada de `carga\v1`, `carga\r1`, `carga\r2` ni de otras lecciones de `carga\r3`): `BRIEF-carga.md`, `guion\leccion2.md`, `tiempos-ch2.txt`, los títulos de las once lecciones, `_corpus\DISENO-CURSO.md`, `guion\leccion1.md` (definiciones de kata, cualidad y trade-off), los pasajes de las lecciones 3, 4, 5, 6, 7, 9, 10 y 11 que nombran MonitorMe o ClearView, y las fuentes de `katarch-corpus\BluzBrothers-src` y `Pragmatic-src` citadas arriba, incluidas las imágenes de la tabla de estilos y de las notas.
