# Bloque 6 · Guardar datos

**Enseña:** dónde se guarda un dato depende de su forma y de cómo se va a consultar; cuatro familias de almacén con lo que gana y paga cada una; un almacén por necesidad; y quién puede cambiar cada dato (un dueño, o una regla de un solo escritor).
**Par:** MonitorMe (un almacén de series de tiempo para lecturas con hora) y Farmacy Family (un almacén por necesidad). Dueño: MobilityCorp (un servicio dueño del estado del vehículo) y ClearView (base compartida, un solo escritor por objeto).
**Trae (ver `ACTO2-CONTINUIDAD.md`):** los cinco casos que vuelven y Farmacy Family; la base compartida de ClearView; la cuenta de MonitorMe (cuatro mil señales por segundo). **Presenta:** las familias relacional, series de tiempo, grafo y archivos; persistencia políglota; dueño de un dato.
**Forma del acto 2:** un caso que abre, el problema en una frase, las familias, el par, la pregunta que decide, el mapa que se actualiza.

## Lecturas con hora {#gancho}

**Narración**

MonitorMe, el sistema para hospitales, recibe en el peor momento cuatro mil señales por segundo. Cada señal es un número con su hora, el pulso de un paciente en un instante, su oxígeno en otro. El pedido dice que hay que guardar las últimas veinticuatro horas de cada signo vital. Y el personal tiene que poder revisarlas por rango de tiempo y por signo.

Para eso el equipo eligió una base de datos hecha para este tipo de dato, una base de series de tiempo. Escribe mucho y rápido, consulta por rangos de tiempo y borra sola lo que pasa de cierta edad. MonitorMe la configuró para borrar todo lo que tenga más de veinticuatro horas.

**Visual**
- Estás aquí: el mapa con la región "guardar datos" encendida.
- Sello: MonitorMe. Una cinta de lecturas con su hora; una ventana de 24 horas que avanza y lo viejo cae.

## Cuatro familias {#familias}

**Narración**

Dónde se guarda un dato depende de dos cosas, qué forma tiene y cómo se lo va a consultar. No hay una base de datos para todo. Hay familias, y cada una gana en algo y paga en otra cosa.

La más conocida es la relacional, la de tablas. Sirve para datos con una estructura fija y para consultas de todo tipo, y garantiza que varios cambios se guarden juntos o ninguno. Paga cuando los datos están muy conectados, porque cada relación es otra tabla y otra unión que hacer al consultar.

La de series de tiempo, la que eligió MonitorMe, gana con datos que llegan con su hora y se consultan por rangos. Paga con que sirve casi solo para eso.

La de grafos guarda los datos como puntos unidos por relaciones, y gana justo donde la relacional sufre, con datos muy conectados. Paga con que es otra tecnología que el equipo tiene que aprender.

Y el almacenamiento de archivos guarda objetos grandes, como videos o fotos, de forma barata y rápida de servir. A cambio, lo que hay dentro de un archivo no se puede consultar.

**Visual**
- El tramo del mapa: la región "guardar datos" crece y aparecen sus cuatro tarjetas, una por familia, con lo que gana (verde) y lo que paga (ámbar). La de series de tiempo queda marcada como la de MonitorMe.

## Un almacén por necesidad {#family}

**Narración**

Farmacy Family, la segunda fase de Farmacy Food, tenía tres necesidades distintas. Datos generales, como los perfiles y las inscripciones a eventos. Datos para analítica, como los resultados médicos. Y contenido grande, como los videos.

En vez de meter todo en un solo tipo de base, eligió uno por necesidad, lo que se llama persistencia políglota. Para la analítica, un grafo, porque esos datos están muy conectados. Para los videos, almacenamiento de archivos. Y dejó el costo escrito. El equipo tiene que manejar más de una tecnología, y para el grafo quizá haya que formar gente o contratarla.

**Visual**
- Sello: Farmacy Family. Tres necesidades, cada una con una flecha a su almacén: perfiles → (sin decidir), analítica → grafo, videos → archivos.

## Uno o varios {#par}

**Narración**

MonitorMe y Farmacy Family responden la misma pregunta de forma distinta. MonitorMe tiene un solo tipo de dato, lecturas con hora, y le alcanza un almacén hecho para eso. Farmacy Family tiene tres necesidades, y paga con más tecnologías para que cada una tenga el suyo. En los dos casos, lo que decidió fue la forma del dato y la consulta que se le va a hacer.

**Visual**
- Las dos mitades lado a lado: a la izquierda, una necesidad y un almacén; a la derecha, tres necesidades y sus almacenes.

## Quién puede cambiarlo {#dueno}

**Narración**

Saber dónde se guarda un dato no alcanza. También hay que decidir quién puede cambiarlo.

MobilityCorp, la empresa de vehículos eléctricos de alquiler, lo resolvió con un dueño. Casi todo su sistema necesita saber dónde está cada vehículo, cuánta batería le queda y si está libre. Si cada servicio guardara su propia copia, el equipo escribe que el riesgo sería un estado inconsistente, lógica repetida y una reconciliación complicada. Por eso un solo servicio, el de flota, es el dueño de ese estado, y los demás le preguntan a él.

El costo también está escrito. Ese servicio se vuelve crítico para casi todo el sistema, así que lo despliegan con copias que crecen con la carga.

**Visual**
- Sello: MobilityCorp. Cuatro servicios con copias que no coinciden; después, uno solo en el centro con su base, y los demás le preguntan.

## Una regla de un solo escritor {#clearview}

**Narración**

ClearView, en cambio, ya había decidido que varios servicios compartieran una base. En esa misma decisión anotó el riesgo, un acoplamiento caótico, donde cualquiera cambia cualquier cosa.

Lo contuvo con una segunda decisión de una sola regla. Cada objeto de la base tiene un único servicio con derecho a escribirlo. Leer puede leer cualquiera. Y la regla no queda como una buena intención, porque se impone con los permisos de la base.

**Visual**
- Sello: ClearView. La base compartida con flechas de escritura cruzadas; después, una sola flecha de escritura por objeto, con su candado.

## La pregunta que decide {#pregunta}

**Narración**

En esta región, la pregunta que decide tiene dos mitades. Qué forma tiene el dato y cómo se lo va a consultar, que elige la familia. Y quién puede cambiarlo, que elige al dueño. En ClearView, la respuesta a la segunda quedó como una pieza del sistema, un solo escritor por dato.

**Visual**
- El mapa con la región encendida, sus cuatro familias, y la pieza de ClearView (la base con un candado por objeto) que queda guardada.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| 4.000 señales por segundo en el pico | `BluzBrothers/FitnessFunctions/Sizing.md` l. 22-25 |
| "must record and store the past 24 hours of all vital sign readings. A medical professional can review this history, filtering on time range as well as vital sign" | `BluzBrothers/Business/Requirements.md` l. 14 |
| ADR-003 (Accepted): base de series de tiempo; "optimized for time-stamped data"; funciones de "time-based aggregation, downsampling, and retention policies"; contra: curva de aprendizaje | `BluzBrothers/ADR/ADR-003-use-time-series-db.md` |
| ADR-004 (Accepted): "deletion of data after a 24-hour period" | `BluzBrothers/ADR/ADR-004-data-retention-policy.md` |
| Relacional: "not optimal for data that is highly connected… extra tables and joins slows down the storage and retrieval"; grafo: "optimal for highly connected data… very fast for performing analytics"; blob: "optimised for unstructured binary files that are large in size, e.g. videos and images" | `Archangels/2.SolutionBackground/DataStore.md` |
| Que la relacional garantiza que varios cambios se guarden juntos o ninguno; que dentro de un archivo no se consulta; que las series de tiempo sirven casi solo para datos con hora | Conocimiento general (externo al repo) |
| Farmacy Family: tres necesidades (datos generales como perfiles e inscripciones a eventos; analítica, como resultados médicos; contenido grande como videos); "polyglot persistence" | `Archangels/2.SolutionBackground/DataStore.md` l. 8-15 |
| ADR-008 (Confirmed): grafo para analítica; riesgo: "training of current staff… or employment of staff already skilled" | `Archangels/4.ADRs/008-We-will-use-a-graph-store-for-analytics.md` |
| ADR-009 (Confirmed): almacenamiento de archivos para contenido grande; riesgo: "the technical team need to have wider knowledge" | `Archangels/4.ADRs/009-We-will-use-a-blob-storage-for-static-content.md` |
| El almacén de datos generales de Farmacy Family no está decidido (no se narra una elección) | `Archangels/2.SolutionBackground/DataStore.md` |
| MobilityCorp ADR-0007: servicio de flota como fuente única del estado del vehículo; alternativa de estado repartido: "risk of inconsistent state, duplicated logic, complex reconciliation"; riesgo: "Fleet Service becomes critical for most platform functions", mitigación "Deploy with HA and autoscaling". Los ADR de Five Nines no tienen campo de estado | `Five-Nines/adrs/ADR-0007 - Fleet Service as the Single Source of Truth for Vehicle State.md` l. 15, 49, 65 |
| ClearView ADR-014: varios servicios en la misma base; "May lead to chaotic coupling. Therefore, we added ADR-015" | `Pragmatic/ADR/ADR-014-multiple-services-on-same-database.md` l. 21 |
| ADR-015 (Accepted): "For each object in a DB only one service has the right to write to the database."; "This should be enforced with DB permissions." | `Pragmatic/ADR/ADR-015-schema-ownership-and-permissions.md` l. 7, 14, 16 |
| "Leer puede leer cualquiera" | Lectura del curso: la regla solo restringe la escritura |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El plan listaba siete familias para esta región; con siete el bloque se vuelve catálogo y rompe "como mucho cuatro por región" | Cuatro familias (las cuatro que el propio corpus compara: relacional, series de tiempo, grafo, archivos); documentos, clave-valor y vectores quedan para el atlas. `curso.ts` se actualiza |
| 1 | Diseño del aprendizaje | La base compartida del bloque 1 vuelve combinada con el dueño del dato (la regla de un solo escritor es nueva) | Se mantiene; la pieza de ClearView del bloque es "un escritor por dato" |
| 2 | Arquitecto senior | "Consistencia" se nombraba en el plan; contarla bien exige transacciones y eventos, que vuelven en el bloque 10 | Aquí solo aparece la garantía de la relacional (todo o nada); la consistencia eventual queda para cuando algo falla |
| 3 | Verificador | Farmacy Family no decidió el almacén de datos generales; los ADR de MobilityCorp no tienen estado | No se narra una elección para los perfiles; tabla al día |
| 4 | Guionista | Frases de cifras y nombres partidas; un solo "no X, sino" | Sin cambios |
| 5 | Espectador de prueba | "Persistencia políglota" llega después de explicar qué hizo el equipo; "acoplamiento caótico" se explica en la misma frase | Sin cambios |
| 6 | Dirección visual | El tramo del mapa no existe en el kit | Se agrega `region()` a `tiza.js` |
| 7 | Producción | Ids: `gancho`, `familias`, `family`, `par`, `dueno`, `clearview`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
