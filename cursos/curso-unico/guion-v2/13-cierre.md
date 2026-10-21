# Cierre · ClearView de punta a punta

**Enseña:** las decisiones de arquitectura no son una lista, son una cadena; cada una obliga a la siguiente. Es la etapa de generalización: el mismo sistema de la apertura, ahora con su porqué.
**Caso:** solo ClearView. Nada nuevo entra en este bloque.

## El mismo dibujo {#vuelta}

**Narración**

Al principio del curso apareció este dibujo, el sistema de ClearView, con cuatro preguntas encima. Por qué varios servicios comparten una base. Por qué el servicio que empareja no puede leer el currículum. Por qué la inteligencia artificial no decide quién encaja. Y qué pasa cuando un sistema de recursos humanos no contesta. Cada una ya tiene respuesta, y las respuestas están atadas entre sí.

**Visual**
- Sello: ClearView.
- Imagen central: el diagrama maestro completo, como en la apertura, con los cuatro signos de pregunta.
- «al decir "Cada una ya tiene respuesta"» → los cuatro signos de pregunta se desvanecen.
- «al decir "atadas entre sí"» → el diagrama pasa a segundo plano entero; queda listo para que la cadena se arme encima.
- Al final: el diagrama en segundo plano, vacío de resaltados.

## La cadena {#cadena}

**Narración**

Todo empieza por el dinero. ClearView es una organización que vive de donaciones, y la inteligencia artificial tiene un costo que nadie puede predecir del todo. El equipo lo escribió así: ahorra a propósito en el resto de la arquitectura para poder pagar lo incierto de la IA.

Ese ahorro elige el estilo. Pocos servicios grandes, más baratos de construir y de mantener, que comparten una misma base de datos.

Compartir la base trae un riesgo, que cualquiera cambie cualquier cosa. Y eso obliga a la regla siguiente, un solo servicio con derecho a escribir cada dato, impuesto con permisos de la base.

Esos mismos permisos resuelven lo que el producto promete. Si el currículum original solo lo puede leer el servicio de candidatos, el servicio que empareja no puede ver quién es la persona, aunque esté a un paso. La anonimización no depende de que alguien la respete.

El emparejamiento, entonces, trabaja con la historia anónima, y ahí entra la IA. Pero el sesgo y el costo la sacan de la decisión. El modelo solo describe con rasgos que una persona puede leer, y una regla fija compara. Eso, a su vez, hace posible probar el sistema paso a paso, con casos cuyo resultado se conoce de antemano.

Del otro lado están los sistemas de recursos humanos, unos cien distintos, que se van a caer con regularidad. Eso obliga a que toda conversación con ellos sea asíncrona, a un adaptador por sistema y a una cola donde los envíos fallidos se reintentan. Y lo que el equipo pensó agregar ahí y descartó, la memoria para los reintentos, quedó escrito con la condición para volver a discutirlo.

**Visual**
- Imagen central: el diagrama maestro, con la cadena de decisiones que se arma encima, pieza por pieza, como flechas naranjas de una decisión a la siguiente. Nunca más de dos eslabones resaltados a la vez; los anteriores quedan en naranja tenue.
- «al decir "Todo empieza por el dinero"» → arriba a la izquierda, una moneda con "donaciones" y un hexágono con una curva de costo incierta.
- «al decir "ahorra a propósito"» → de la moneda sale el primer eslabón hacia una etiqueta "costo primero".
- «al decir "Ese ahorro elige el estilo"» → eslabón hacia la zona central; los servicios y la base compartida se resaltan (la pieza guardada en el bloque 4).
- «al decir "un solo servicio con derecho a escribir"» → eslabón hacia la base; aparecen los candados por tabla (pieza del bloque 6).
- «al decir "el servicio que empareja no puede ver"» → eslabón hacia el candado del currículum; la lectura de Emparejamiento rebota (pieza del bloque 9).
- «al decir "ahí entra la IA"» → eslabón hacia la zona de Emparejamiento; aparece modelo → rasgos fijos → regla (pieza del bloque 11).
- «al decir "probar el sistema paso a paso"» → junto a cada paso del flujo (currículum → historia → rasgos → puntaje) aparece un tilde de prueba.
- «al decir "unos cien distintos"» → eslabón hacia la derecha; los sistemas de recursos humanos (tres y "×100"); uno `caer`.
- «al decir "toda conversación con ellos sea asíncrona"» → las flechas hacia ellos se vuelven verdes a trazos; aparece un adaptador por sistema y una cola de reintentos; un envío fallido vuelve a la cola y sale de nuevo.
- «al decir "quedó escrito con la condición"» → la caché tachada (pieza del bloque 12), con su condición en naranja.
- Al final: el diagrama completo con la cadena entera en naranja tenue, de la moneda a la caché tachada.

## Lo que se lleva {#cierre}

**Narración**

Mirado así, el sistema de ClearView no es un conjunto de buenas ideas sueltas. Es una cadena, y cada eslabón existe porque el anterior lo pidió. La falta de dinero llevó a compartir una base, compartirla llevó a los permisos, los permisos protegieron a las personas.

Esa es la forma de mirar cualquier sistema nuevo. Frente a cada decisión, preguntar qué la obliga, y qué va a obligar ella a su vez. Y dejarla escrita, con lo que cuesta y lo que la pide, para que la próxima persona pueda seguir la cadena sin tener que adivinarla.

**Visual**
- Imagen central: la cadena completa sobre el diagrama.
- «al decir "cada eslabón existe porque el anterior lo pidió"» → la cadena se ilumina de punta a punta, en un recorrido continuo de la moneda a la caché.
- «al decir "La falta de dinero llevó a compartir una base"» → se resaltan solo los tres primeros eslabones, en orden, al ritmo de la frase.
- «al decir "Frente a cada decisión"» → el diagrama se aparta y queda una sola pieza en el centro (un rectángulo vacío, "tu decisión"), con una flecha que entra ("qué la obliga") y otra que sale ("qué obliga").
- «al decir "Y dejarla escrita"» → el rectángulo se convierte en una hoja de decisión con sus cuatro franjas (contexto, alternativas, costo, requisito), la misma del bloque 1.
- Al final: la hoja de decisión sola, con las dos flechas. Fundido.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ONG que vive de donaciones; costo de la IA difícil de predecir | `Pragmatic/README.md`; `Requirements/requirements-and-assumptions.md` (A25, A26) |
| "We deliberately save cost in other parts of the architecture in order to mitigate the unpredictable price tag of such an AI solution" | `Pragmatic/README.md` l. 48-49 |
| Estilo basado en servicios, más barato de construir y mantener, con base compartida | `Pragmatic/ADR/ADR-002-architecture-style.md`; `ADR/ADR-014`; `C4/C2-container.md` l. 7 |
| Un solo escritor por objeto, impuesto con permisos | `Pragmatic/ADR/ADR-015` l. 16, 20 |
| Currículum solo en candidatos; el emparejamiento sin permiso para leerlo | `Pragmatic/ADR/ADR-010` l. 16 |
| La IA extrae rasgos legibles fijos; puntaje determinista; opción C descartada por sesgo | `Pragmatic/ADR/ADR-011` l. 27-60 |
| Conjuntos de prueba con resultados esperados por etapa | `Pragmatic/ADR/ADR-025-ai-test-concept.md` |
| ~100 sistemas de RR. HH.; "failures are expected to occur regularly"; comunicación con sistemas externos asíncrona; adaptador por sistema; cola de reintentos con espera creciente | `Pragmatic/Requirements/requirements-and-assumptions.md` (A29); `ADR/ADR-005`; `ADR/ADR-023` l. 13-22; `C4/C3-components-hr-integration.md` |
| Caché rechazado con condición de reapertura | `Pragmatic/ADR/ADR-024-caching-of-resumes.md` l. 24-25 |
| "Cada eslabón existe porque el anterior lo pidió" | Lectura del curso sobre las decisiones citadas |
