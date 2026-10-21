# Cierre · ClearView de punta a punta

**Enseña:** las decisiones de un sistema forman una cadena, y cada una obliga a la siguiente; cada eslabón cae en una región del mapa. Es la etapa de generalización: el mismo sistema de la apertura, ahora con su porqué.
**Caso:** solo ClearView. Nada nuevo entra en este bloque.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** el dibujo de la apertura y sus cuatro preguntas; la base compartida (bloque 1); el estilo basado en servicios (bloque 4); un escritor por dato (bloque 6); la cola de reintentos (bloque 10); el candado del currículum (bloque 11); la IA fuera de la decisión (bloque 14); el caché rechazado (bloque 15); la premisa (bloque 13); el mapa de diez regiones.

## El mismo dibujo {#vuelta}

**Narración**

Al principio del curso apareció este dibujo, el sistema de ClearView, con cuatro preguntas encima. Por qué varios servicios comparten una base. Por qué el servicio que empareja no puede leer el currículum. Por qué la inteligencia artificial no decide quién encaja. Y qué pasa cuando un sistema de recursos humanos no contesta. Cada una ya tiene respuesta, y las respuestas están atadas entre sí.

**Visual**
- Sello: ClearView. El dibujo de la apertura, en tiza: las personas a la izquierda, los servicios y la base compartida al centro, los modelos arriba a la derecha y los sistemas de recursos humanos abajo a la derecha. Cuatro signos de pregunta aparecen sobre sus piezas al ritmo de la voz y se borran juntos al final.

## La cadena {#cadena}

**Narración**

Todo empieza por el dinero. ClearView es una organización que vive de donaciones, y la inteligencia artificial tiene un costo que nadie puede predecir del todo. El equipo escribió que ahorra a propósito en el resto de la arquitectura para poder pagar lo incierto de la IA.

Ese ahorro elige el estilo, pocos servicios grandes, más baratos de construir y de mantener, que comparten una misma base de datos.

Compartir la base trae un riesgo, que cualquiera cambie cualquier cosa. Eso obliga a la regla siguiente, un solo servicio con derecho a escribir cada dato, impuesto con permisos de la base.

Esos mismos permisos cumplen lo que el producto promete. El currículum original solo lo puede leer el servicio de candidatos, así que el servicio que empareja no puede ver quién es la persona, aunque la tenga a un paso.

El emparejamiento trabaja entonces con la historia anónima, y ahí entra la IA. El sesgo y el costo de las consultas la sacan de la decisión. El modelo solo describe con rasgos que una persona puede leer, y una regla fija compara. Eso, a su vez, permite probar el sistema paso a paso, con casos cuyo resultado se conoce de antemano.

Del otro lado están los sistemas de recursos humanos, unos cien distintos, que van a fallar seguido. Eso obliga a que toda conversación con ellos sea asíncrona, con un servicio aparte y una cola donde los envíos fallidos se reintentan. Y lo que el equipo pensó agregar ahí y descartó, una memoria para los reintentos, quedó escrito con la condición para reabrirlo.

**Visual**
- El mismo dibujo, apagado. La cadena se arma encima, eslabón por eslabón, con flechas naranjas de una decisión a la siguiente; nunca más de dos eslabones encendidos, los anteriores en naranja tenue. Moneda "donaciones" y una curva de costo incierta → "ahorrar a propósito" → servicios y base compartida → candados por dato → el candado del currículum con la lectura que rebota → modelo → rasgos → regla, con tildes de prueba → los cien sistemas, uno cae → cola de reintentos → el caché tachado con su condición.

## En el mapa {#mapa}

**Narración**

Y cada eslabón tiene su lugar en el mapa que recorrimos. La base compartida y su único escritor quedan en guardar datos, y la cola de reintentos, en cuando algo falla. El candado del currículum va a identidad y datos sensibles, la IA que describe sin decidir, a su región, y el caché rechazado, a cambiar sin romper. Las regiones se recorrieron de a una, pero en el sistema se tocan todas, encadenadas.

**Visual**
- Barrido. El mapa del acto 2, las diez regiones. Cada pieza de ClearView, chica, vuela a su región al nombrarla, y la región se enciende. Al final, la cadena se dibuja por encima del mapa, uniendo las regiones encendidas en el orden de las decisiones.

## Lo que se lleva {#cierre}

**Narración**

Mirado así, cada pieza de ClearView existe porque la anterior la pidió. La falta de dinero llevó a compartir una base, compartirla llevó a los permisos, y los permisos protegieron a las personas.

Esa es la forma de mirar cualquier sistema nuevo. Frente a cada decisión, preguntar qué la obliga y qué va a obligar ella a su vez. Y dejarla escrita, con lo que cuesta, lo que la pide y la premisa que la sostiene, para que la próxima persona pueda seguir la cadena sin tener que adivinarla.

**Visual**
- La cadena se ilumina de punta a punta; después se resaltan solo los tres primeros eslabones, al ritmo de la frase. El mapa se aparta y queda una sola pieza al centro, "tu decisión", con una flecha que entra ("qué la obliga") y otra que sale ("qué obliga"). La pieza se convierte en una hoja de decisión con sus franjas: contexto, alternativas, costo, requisito, y una nueva, "premisa".

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ONG que vive de donaciones; costo de la IA difícil de predecir | `Pragmatic/README.md`; `Requirements/requirements-and-assumptions.md` (A25, A26) |
| "We deliberately save cost in other parts of the architecture in order to mitigate the unpredictable price tag of such an AI solution" | `Pragmatic/README.md` l. 48-49 |
| Estilo basado en servicios, más barato de construir y mantener, con base compartida | `Pragmatic/ADR/ADR-002-architecture-style.md`; `ADR/ADR-014-multiple-services-on-same-database.md`; `C4/C2-container.md` l. 7 |
| Acoplamiento caótico como riesgo de la base compartida; "For each object in a DB only one service has the right to write"; "enforced with DB permissions" | `Pragmatic/ADR/ADR-014`; `ADR/ADR-015` l. 16-18 |
| Currículum solo en candidatos; el emparejamiento sin permiso para leerlo | `Pragmatic/ADR/ADR-010` l. 15-17 |
| La IA extrae rasgos legibles fijos; puntaje determinista; opción C descartada por sesgo; consultas a la IA que crecen de forma cuadrática en las otras opciones | `Pragmatic/ADR/ADR-011` l. 27-60 |
| Conjuntos de prueba con resultados esperados por etapa | `Pragmatic/ADR/ADR-025-ai-test-concept.md` (Accepted) |
| Unos cien sistemas de recursos humanos; "failures are expected to occur regularly"; comunicación asíncrona; servicio aparte; cola de fallidos con reintentos | `Pragmatic/Requirements/requirements-and-assumptions.md` (A29); `ADR/ADR-005`; `ADR/ADR-023` l. 13-22 |
| Caché rechazado con condición de reapertura | `Pragmatic/ADR/ADR-024-caching-of-resumes.md` l. 22-25 |
| "cada pieza existe porque la anterior la pidió"; la ubicación de cada pieza en el mapa | Lectura del curso sobre las decisiones citadas |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | Al borrador le faltaba el mapa, que el plan pone en el cierre | Escena nueva `mapa`: cada pieza vuela a su región y la cadena se dibuja encima |
| 1 | Diseño del aprendizaje | El cierre tiene que volver a la historia de la apertura | Abre con el mismo dibujo y sus cuatro preguntas, y termina en la hoja de decisión del bloque 1 |
| 2 | Arquitecto senior | La premisa (bloque 13) no estaba en la lección final | Se suma a lo que se deja escrito |
| 3 | Verificador | "el sesgo y el costo": el ADR-011 da el sesgo como razón del descarte y la complejidad de consultas como criterio | Se mantienen los dos, como en la fuente |
| 4 | Guionista | El borrador decía "no es un conjunto de buenas ideas sueltas, es una cadena" | Se corta la fórmula: "cada pieza existe porque la anterior la pidió" |
| 4 | Guionista | La escena del mapa enumera cinco piezas | Van de a dos por frase, en el orden de la cadena, sin numerar |
| 5 | Espectador de prueba | "la IA que describe sin decidir, a su región" omite el nombre | Se dibuja el nombre de la región en pantalla |
| 6 | Dirección visual | El dibujo de la apertura está hecho con el kit anterior (`dg.js`) | Se redibuja en tiza con las mismas posiciones, para que se reconozca |
| 7 | Producción | Ids: `vuelta`, `cadena`, `mapa`, `cierre` | Bloque 16 |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
