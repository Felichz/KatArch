Total: 40 ideas; duración 3:55.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Farmacy Family es una comunidad de salud que mejora un servicio de comidas ya existente. | 2 | 3 | Farmacy Family | Un nombre nuevo (n=1). Fricción: primera línea de la lección, tras Farmacy Food (L5 y L7), cambio de caso sin puente y nombre casi idéntico. |
| 2 | 0:01 | Guarda perfiles personales y resultados médicos de sus clientes. | 2 | 1 | — | Un elemento: el dato es sensible (categoría nueva, sin término). Sigue la descripción del caso. |
| 3 | 0:10 | Un cliente puede pedir que se borren todos sus datos, y el sistema tiene que poder cumplirlo. | 3 | 2 | — | Requisito de borrado (nuevo) aplicado a Farmacy Family (combina con 2). Hilo nuevo con conector implícito. |
| 4 | 0:10 | Eso se complica: los datos de una persona están repartidos en varios lugares. | 3 | 1 | — | Paso nuevo (datos repartidos) combinado con la complicación de 3. |
| 5 | 0:21 | Además hay copias de respaldo. | 3 | 1 | — | Término nuevo (respaldo) combinado con 4: un lugar más. |
| 6 | 0:21 | Encontrar y borrar cada rastro es difícil, y el documento del equipo lo reconoce. | 1 | 1 | — | Repite la dificultad de 4 y 5. La atribución al documento no es elemento nuevo (el ADR se define en L1). |
| 7 | 0:29 | Para resolverlo, tomaron una decisión que cabe en una línea; para entenderla hace falta una palabra. | 1 | 2 | — | Anuncia la palabra (cifrar) sin nombrar ningún elemento. |
| 8 | 0:35 | Cifrar un dato es guardarlo de modo que solo se pueda leer con una clave. | 3 | 2 | — | Dos términos nuevos: cifrar y clave. Es la definición que cumple el anuncio de 7. |
| 9 | 0:40 | Cada usuario tiene su propia clave, y todos sus datos se guardan cifrados con ella. | 3 | 2 | — | Decisión nueva (clave por usuario) combinada con cifrar y clave de 8. Conector "con eso claro". |
| 10 | 0:47 | La clave vive en un almacén aparte, y nunca queda junto a los datos cifrados. | 3 | 1 | — | Término nuevo (almacén de claves) contrastado con los datos cifrados de 9. |
| 11 | 0:47 | Por eso, para eliminar todos los registros de una persona alcanza con eliminar su clave. | 3 | 1 | — | Paso nuevo (borrar la clave borra todo) deducido de 9 y 10. |
| 12 | 0:58 | Sin la clave, lo que queda cifrado es ilegible. | 3 | 1 | — | Consecuencia nueva (ilegible) de la definición de 8. |
| 13 | 0:58 | Para que sea irrecuperable, hay que eliminar también los respaldos del almacén de claves o de los datos. | 3 | 1 | — | Término nuevo (irrecuperable) combinado con respaldos (5) y almacén (10). Es la condición que 16 omite. |
| 14 | 1:07 | Como la clave es de cada persona, se puede borrar a una sin tocar a las demás. | 3 | 1 | — | Paso nuevo (borrado individual) deducido de 9. |
| 15 | 1:07 | En otras palabras, el borrado deja de ser una búsqueda y pasa a ser un solo paso. | 1 | 1 | — | Reformula 11 y 14; no aporta elemento. |
| 16 | 1:17 | Es como una caja fuerte con una llave por persona: sin la llave de una, su caja queda cerrada para siempre. | 2 | 1 | — | Una imagen nueva (caja fuerte) que no agrega regla. "Para siempre" omite la condición de 13. |
| 17 | 1:24 | El equipo dejó escritos dos costos; el primero, una memoria temporal de vida corta con datos sin cifrar. | 3 | 2 | — | Término nuevo (memoria temporal, caché) combinado con "todos cifrados" de 9. Fricción: cambio anunciado de la decisión a sus costos. |
| 18 | 1:32 | El otro costo: si una clave se filtra, borrarla ya no garantiza el borrado. | 3 | 1 | — | Consecuencia nueva (clave filtrada) combinada con borrar la clave (11). |
| 19 | 1:38 | (pregunta) Lo que resolvió Farmacy Family es una pregunta que se repite en cualquier dato sensible: cómo se borra. | 4 | 3 | — | Término nuevo (dato sensible) y marco nuevo (tres preguntas), combinados con cómo se borra. Salto de caso a marco general, anunciado por el título. |
| 20 | 1:38 | Hay otras dos, y las dos se contestan con un mismo caso. | 2 | 1 | — | Abre dos preguntas sin nombrarlas: bucle que se cierra recién en 33. |
| 21 | 1:47 | Una es dónde vive el dato: cuantos más lugares lo guarden, más hay que proteger y recorrer al borrar. | 4 | 1 | — | Pregunta nueva (dónde vive) y regla nueva (más lugares, más trabajo), combinadas con 4 y 11. |
| 22 | 1:57 | Es decir, cada lugar de más es trabajo de más. | 1 | 1 | — | Reformula 21. |
| 23 | 2:00 | Otra es quién lo ve completo: casi nunca hace falta que todas las partes vean un dato entero. | 4 | 1 | — | Pregunta nueva (quién lo ve completo) y paso nuevo (no todas las partes necesitan el dato entero), combinados con la estructura de 21. |
| 24 | 2:07 | Cada parte que lo ve completo es un punto más desde donde puede filtrarse. | 3 | 1 | — | Paso nuevo (cada parte es un punto de filtración) combinado con 23. |
| 25 | 2:12 | (donde) Para esas dos preguntas hace falta otro caso: un dato no se protege solo con cifrarlo, también con lo que cada parte alcanza a ver. | 3 | 3 | — | Principio nuevo (cifrado más visibilidad) combinado con cifrar. Cambio de caso anunciado; el caso no llega hasta 26 (2:23). |
| 26 | 2:23 | Sysops Squad es el servicio de soporte técnico de una empresa de electrónica. | 1 | 2 | Sysops Squad | Primera mención en la lección, pero el descriptor es el de L4: ningún elemento nuevo. |
| 27 | 2:23 | Su sistema de tickets guarda las tarjetas de crédito de los clientes. | 1 | 1 | — | Dato ya dado en L4 (ASM-4): recuerdo. |
| 28 | 2:32 | El equipo propone aislar la facturación en una pieza aparte; la decisión queda como propuesta. Entonces la pregunta es qué necesita ver cada parte. | 3 | 2 | — | Aislar facturación y "propuesta" son de L4. Nuevo: aplicar la pregunta de visibilidad al caso, combinado con 25. |
| 29 | 2:42 | Para editar su tarjeta, el cliente no necesita el número entero; le alcanzan los últimos cuatro dígitos. | 4 | 1 | — | Cifra nueva (cuatro dígitos) y paso nuevo (no hace falta el número entero), combinados con 28. |
| 30 | 2:48 | Al escribir la tarjeta, el dato pasa enseguida a facturación; en la parte del cliente quedan solo los cuatro dígitos. | 3 | 1 | — | Mecanismo nuevo (pasa enseguida; L4 y L6 hablaban de mensajes) combinado con 29. |
| 31 | 2:57 | En otras palabras, la tarjeta completa vive en un solo lugar y el resto trabaja con una versión reducida. | 1 | 1 | — | Reformula 30. |
| 32 | 2:57 | Una sola parte necesita el dato entero, y las demás pueden vivir con menos. | 1 | 1 | — | Repite 23 como principio. |
| 33 | 3:10 | Eso contesta las dos preguntas a la vez: la tarjeta vive en una pieza, y solo esa pieza la ve completa. | 3 | 1 | — | Síntesis nueva (una decisión responde las dos preguntas) combinada con 21 y 23. Afirmación con error: ver E1. |
| 34 | 3:16 | (cierre) Volvamos a Farmacy Family, que dejamos hace un rato. | 1 | 2 | — | Vuelta al caso con puente explícito, sin elemento nuevo. |
| 35 | 3:16 | Su clave por usuario conviene tomarla antes de guardar el primer dato. | 3 | 1 | — | Momento nuevo de la decisión, combinado con la clave por usuario de 9. |
| 36 | 3:24 | Lo deducimos nosotros: agregar un cifrado por usuario a datos ya repartidos daría mucho más trabajo. | 3 | 1 | — | Paso nuevo (agregarlo después cuesta más), combinado con 4 y 35. Marcado como deducción propia. |
| 37 | 3:30 | Con las otras preguntas pasa algo parecido: la tarjeta de Sysops Squad, en una sola pieza, contesta dónde vive el dato y quién lo ve completo. | 3 | 2 | — | Generalización nueva ("pasa algo parecido") combinada con el caso de 26 a 33 y la decisión de 35. Fricción: vuelve a un caso ya cerrado. |
| 38 | 3:38 | Y la clave de Farmacy Family contesta cómo se borra. | 1 | 1 | — | Aplica 9 a 11 a la pregunta de 19; sin elemento nuevo. |
| 39 | 3:42 | Borrar a una persona parecía una búsqueda por todos los lugares y todos los respaldos. | 1 | 1 | — | Repite 4, 5 y 15. |
| 40 | 3:42 | Con las tres preguntas contestadas antes de guardar el primer dato, el diseño ya responde dónde vive cada dato y cómo se borra. | 3 | 1 | — | Síntesis nueva (todo se contesta antes del primer dato) combinada con 35 y 37. |

## Lo que muestran los puntajes

1. **Pico de carga en "Tres preguntas" (ideas 19 a 24, 1:38 a 2:07).** Cargas 4, 2, 4, 1, 4, 3. Son cuatro elementos nuevos en 30 segundos (dato sensible, el marco de tres preguntas, "dónde vive", "quién lo ve completo") más la regla de los lugares. Ideas con carga 4 o más y fricción 3 o más: solo la 19.
2. **Fricción 3 o más con carga 3 o más: ideas 19 (carga 4) y 25 (carga 3).** La 25 anuncia otro caso que no llega hasta 2:23. Las dos preguntas abiertas en 20 y 21 se cierran en 33 (3:10): unos 80 segundos con dos preguntas sin contestar. La apertura (1: carga 2, fricción 3) queda justo debajo del umbral.
3. **Pares seguidos con carga 4 o más: ninguno.** La sección alterna picos y reformulaciones (19 = 4, 20 = 2, 21 = 4, 22 = 1, 23 = 4). La densidad no se acumula en dos ideas seguidas, pero sí en una sección entera.
4. **Casos nuevos a menos de dos minutos: ninguno.** Farmacy Family (1, 0:01) y Sysops Squad (26, 2:23) están a 2 min 22 s. Pero el tramo de Sysops que la columna marca como caso nuevo (26 a 28, 2:23 a 2:42) tiene carga 1, 1 y 3: es un recuerdo de L4 (guarda tarjetas, aislar facturación, "propuesta") que la voz repite casi con las mismas palabras. Lo nuevo llega en 29 y 30. Son unos 20 segundos de recuerdo sin ninguna señal de que lo sea.
5. **Relleno y pocas ideas que se cierran.** 6, 15, 22, 31, 32, 38 y 39 tienen carga 1 (7 de 40 ideas, unos 40 segundos; 15, 22 y 31 abren con "en otras palabras" o "es decir"). La caja fuerte (16, carga 2) repite 9 a 14, y no vuelve a usarse. Los dos costos (17 y 18) no se retoman en el cierre (34 a 40).
6. **Apertura con nombre casi idéntico y término sin definir.** La lección arranca con Farmacy Family (1) justo después de un capítulo con Farmacy Food (L7), y nunca se dice la diferencia entre los dos nombres. "Dato sensible" (19) se usa como término y no se define.

## Errores de hecho y contradicciones

- **E1. Sobreafirmación y contradicción con L4 (idea 33, 3:10: "solo esa pieza la ve completa").** La fuente dice que, al ingresar la tarjeta en la UI del cliente, se pasa "immediately … to the billing quantum" (Team-7-src `ADR/ADR-4-extract-billing-quanta.md` l. 20): la parte del cliente recibe el número completo en ese momento. La misma ADR dice que hay que asegurar "the passing of credit card data between quanta" (l. 31), es decir, la tarjeta viaja entre piezas; L4 lo dice así: "esa tarjeta cruza ahora una frontera". Además, la ADR prevé replicar datos de facturación "required for reporting" a otra pieza (l. 24) y no dice si la tarjeta entra. Corrección: "solo facturación guarda la tarjeta completa; el cliente la escribe entera y viaja por mensajes hasta allí", con la réplica de reportes como pregunta abierta.
- **E2. Contradicción interna (idea 16, 1:17: "queda cerrada para siempre" frente a la idea 13, 0:58).** La idea 13 dice que la irrecuperabilidad exige borrar los respaldos. Archangels `4.ADRs/005-use-crypto-shredding.md` l. 22 a 23: "to delete all records we can simply remove the key. Once all backups of the keystore or data have been removed the data will become unrecoverable." Sin la clave, el dato es ilegible; no queda irrecuperable hasta borrar los respaldos.
- **E3. Sobreafirmación (idea 3, 0:10: "el sistema tiene que poder cumplirlo").** Archangels `4.ADRs/005-use-crypto-shredding.md` l. 15 a 16: "it's reasonable to assume that users may want all of their data removed". La fuente habla de un deseo razonable, no de una obligación, y la lección no cita ninguna norma.
- **Verificado sin error:** ADR-005 de Archangels (estado Accepted; una clave por usuario; almacén separado "never kept alongside"; caché sin cifrar en l. 35; clave filtrada en l. 39); "an enhancement of the existing Farmacy Foods system" (`1.ProblemBackground/BusinessGoalsDriversAndRequirements.md` l. 10); ADR-4 de Team 7 (estado Proposed; últimos cuatro dígitos en l. 19); Team-7-src `README.md` l. 44 (empresa de electrónica). La idea 36 ya está marcada como deducción propia.

## Qué cambiaría

1. **Idea 33 (y 40):** corregir "solo esa pieza la ve completa" como en E1, y dejar la réplica de reportes como pregunta abierta. Es el único error que contradice a otra lección.
2. **Ideas 3 y 16:** cambiar "tiene que poder cumplirlo" por "puede pedirlo", y quitar "para siempre" o agregar la condición de los respaldos. Quitar la caja fuerte (16) ahorra unos 8 segundos: 9 a 14 ya dicen lo mismo y la imagen no cierra nada.
3. **Ideas 26 y 27:** reemplazarlas por una frase de puente ("el caso de la lección 4") y pasar al dato nuevo de los cuatro dígitos. Ahorra unos 15 segundos y evita que el recuerdo se marque como caso nuevo.
4. **Tramo 19 a 23:** nombrar las dos preguntas en la misma frase ("dónde vive el dato y quién lo ve completo") antes de explicar la regla de los lugares. Quitar 15, 22 y 31, o convertirlas en un ejemplo (una clave de Farmacy Family en tres lugares). Cerrar los costos 17 y 18 en el cierre, o quitar la memoria temporal. Decir que el marco de "tres preguntas" es una construcción del curso y no un dato de la fuente.
