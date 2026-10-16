# Carga cognitiva y fricción · Lección 7 · Cuando algo falla

36 ideas · 5:14 de duración (313,5 s, `video/ch7/timing.js`).

Tiempo = inicio de la línea de voz donde empieza la idea, redondeado hacia abajo. Las ideas que juntan dos cosas que se entienden por separado se partieron.

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:00 | | | | |
| 1 | 0:01 | En Farmacy Food, un pedido confirmado pasa al estado "listo para pagar" | 3 | 1 | Caso conocido de la lección 1; "listo para pagar" es nombre del equipo sin explicar; primera idea de la lección |
| 2 | 0:08 | Ese mensaje tiene que llegar al procesamiento del pago, sí o sí | 2 | 1 | Exigencia clara; continúa la 1; "procesamiento del pago" sin definir |
| 3 | 0:14 | Ese pedido puede procesarse más de una vez | 2 | 2 | Conector "Y a la vez" que introduce la tensión con la 2 |
| 4 | 0:20 | No puede terminar en cargos dobles ni triples en la cuenta del cliente | 2 | 2 | Contraexigencia ("Lo que no puede pasar"); enumeración de un solo tipo |
| 5 | 0:26 | Llegar siempre y no cobrar dos veces tiran en sentidos opuestos, y las dos se diseñan | 3 | 2 | Tesis abstracta; paso lógico desde la 3 y la 4 |
| **pregunta** | 0:33 | | | | |
| 6 | 0:34 | Hay cosas que se diseñan aparte del camino feliz | 3 | 3 | "Camino feliz" sin definir; cambia de caso (Farmacy Food) a regla general |
| 7 | 0:39 | Qué pasa si un mensaje llega dos veces, y cómo se reintenta uno que no llegó | 2 | 1 | Hoja de ruta, primera mitad; continuación de la 6 |
| 8 | 0:44 | Qué significa que un dato deje de llegar, y cómo se sabe si el negocio funciona | 3 | 2 | "Silencio" y "salud del negocio" como temas nuevos. Anuncia "en ese orden", que el cuerpo no cumple (hallazgo 2) |
| **duplicado** | 0:51 | | | | |
| 9 | 0:52 | La cola espera un acuse de recibo; si no llega, vuelve a entregar el mensaje | 2 | 2 | "Cola" y "acuse de recibo" en una frase; primer mecanismo, después de la hoja de ruta |
| 10 | 1:00 | El acuse también se puede perder aunque el trabajo esté hecho, y por eso la garantía se llama "al menos una vez" | 3 | 1 | Nombre de garantía nuevo; causa que continúa la 9 |
| 11 | 1:11 | Farmacy Food resuelve el duplicado con un id único que genera el teléfono y un número de versión | 3 | 2 | Vuelta al caso del gancho; dos datos nuevos; la decisión figura como "Proposed" (hallazgo 3) |
| 12 | 1:21 | Al procesar, se comprueba si el id ya existe, y un evento con una versión ya vista se descarta | 3 | 1 | Dos comprobaciones; "evento" y "versión" en la misma frase; continúa la 11 |
| 13 | 1:28 | El costo está escrito: baja un poco el rendimiento, y se gana integridad de los datos | 3 | 1 | Dos cualidades en tensión; "está escrito" como motivo recurrente (hallazgo 4) |
| **dosescrituras** | 1:35 | | | | |
| 14 | 1:35 | Hay un problema vecino: al pasar algo en el negocio, hay que guardarlo en la base y publicar el evento | 3 | 3 | "Problema vecino" anuncia cambio de tema que no está en la hoja de ruta; "publicar el evento" sin nombre (dual write) |
| 15 | 1:44 | Si el sistema se cae entre las dos escrituras, la base dice una cosa y el resto no se entera | 2 | 1 | Consecuencia concreta; continúa la 14 |
| 16 | 1:54 | The Archangels, en Farmacy Family, usan un patrón conocido: el evento se guarda, otro proceso lo envía y lo marca | **4** | **4** | Producto Farmacy Family nuevo en la lección; equipo en inglés; patrón sin nombre (outbox); tres pasos |
| 17 | 2:05 | Al recibir, el evento se guarda primero, otro proceso lo maneja y se ignoran los que ya llegaron | 3 | 1 | Espejo de la 16 (inbox), sin nombre; se entiende solo si se entendió la 16 |
| 18 | 2:13 | MobilityCorp confirma la reserva y después publica el evento, sin decir qué pasa si la publicación falla | 3 | 2 | Caso ya presentado (lecciones 1 y 6); "del otro lado" conecta; el mismo flujo ya aparece en las lecciones 5 y 6 |
| **reintento** | 2:24 | | | | |
| 19 | 2:25 | ClearView manda currículums a sistemas de recursos humanos que se caen; si un envío falla, "el pedido" va a una cola de mensajes fallidos | 3 | 3 | Hilo de la hoja de ruta sin puente; "pedido" para un currículum (el término es de Farmacy Food); dead-letter sin nombre |
| 20 | 2:35 | El reintento espera más en cada intento, para no saturar un sistema que ya está en problemas | 2 | 1 | Backoff explicado en lenguaje llano, sin nombre |
| 21 | 2:41 | Si los fallos siguen, el pedido pasa a colas de reintento de nivel superior, hasta que no hay más intentos | 3 | 1 | "Nivel superior" es un concepto nuevo; "pedido" otra vez para un currículum |
| 22 | 2:49 | Ningún documento dice qué pasa con un currículum después del último intento, ni quién se entera | 2 | 2 | Conector "Y ahí termina lo escrito"; pasa de mecanismo a ausencia; "documento" es meta del corpus (hallazgo 3) |
| 23 | 2:57 | Es el hueco más repetido entre los ganadores: varios diseñan el reintento y ninguno dice qué pasa cuando se acaban | 3 | 2 | Superlativo y "ninguno" sin recuento; ArchColider sí da un final para pagos (hallazgo 3) |
| 24 | 3:05 | Diseñar el fallo incluye ese final: alguien tiene que enterarse, y debe haber un camino que no dependa del sistema caído | 3 | 1 | Principio abstracto; "camino" sin ejemplo; continúa la 22 y la 23 |
| **silencio** | 3:12 | | | | |
| 25 | 3:13 | A veces el fallo es un mensaje que deja de llegar: en MonitorMe, si un sensor falla, la pantalla deja de mostrar el dato | 2 | 3 | Hilo anunciado en la hoja de ruta; MonitorMe ya conocido; "sensor" sin describir |
| 26 | 3:23 | Las reglas pueden configurarse para un dato inexistente o viejo: la regla no se ejecuta, o salta una alerta | 3 | 1 | "Regla" como lógica de análisis sin definir; continúa la 25 |
| 27 | 3:33 | Las alertas salen por dos canales, al teléfono y a la estación de enfermería; si uno no está, avisa el otro | 2 | 1 | Dos canales, con matiz respecto de la fuente (hallazgo 3) |
| 28 | 3:42 | Farmacy Food: las heladeras pueden dejar de mandar su stock; el sistema guarda una estimación propia y la corrige | 2 | 2 | Repite casi palabra por palabra la lección 5 (hallazgo 4); "enfrenta lo mismo" es paso lógico |
| 29 | 3:54 | Queda pendiente acordar con el negocio cuándo alarmar por un hueco de datos: a los minutos o a las horas | 2 | 2 | Pregunta abierta y honesta; la fuente la deja como acción pendiente |
| **negocio** | 4:03 | | | | |
| 30 | 4:03 | Las métricas de las máquinas pueden decir que todo está bien mientras los pedidos no avanzan | 3 | 2 | "Un silencio más difícil" da el puente; "procesador" y "memoria" sin explicar |
| 31 | 4:14 | Farmacy Food agrega chequeos de salud del negocio: un supervisor manda mensajes de prueba por escenarios críticos y mide si el resultado es correcto y cuánto tarda | **4** | 2 | Cuatro términos nuevos (chequeo de salud, supervisor, mensaje de prueba, escenario crítico) y dos métricas en una oración |
| 32 | 4:26 | Esos mensajes de prueba se diseñan en el código, y eso cuesta esfuerzo y complejidad | 2 | 1 | Costo de la 31; "el costo está escrito" de nuevo (hallazgo 4) |
| 33 | 4:34 | A cambio, detecta fallos que ninguna métrica muestra, y el equipo tiene hechos para decidir cuándo escalar o separar un módulo | 3 | **4** | "Separar un módulo" es el tema de la lección 9, no de esta |
| **cierre** | 4:42 | | | | |
| 34 | 4:42 | El pedido listo para pagar de Farmacy Food tiene sus respuestas escritas: llega al menos una vez, y el duplicado se descarta por id y versión | 2 | 3 | Vuelve al hilo del gancho tres minutos después, sin puente; presenta como resuelto un ADR "Proposed" |
| 35 | 4:52 | Si el proveedor de pagos está caído, los pedidos se guardan y se reintentan durante un plazo | 3 | **4** | Escenario que el cuerpo nunca trató, aparece en el cierre; "un plazo" sin cifra; la fuente lo lista como opción (hallazgo 3) |
| 36 | 4:58 | Para cada mensaje importante, esas preguntas se responden antes de construir: qué pasa si llega dos veces, cómo se reintenta, qué pasa si nunca llega y qué significa que deje de llegar | 3 | 2 | Lista de cuatro preguntas; "nunca llega" y "deje de llegar" se confunden en el cuerpo; generaliza |

## Lo que muestran los puntajes

1. **Pico de carga y de fricción en el bloque de The Archangels (ideas 16 y 17).** Farmacy Family es un producto que la lección no presentó, aparece en medio del argumento de la base de datos, y el equipo se nombra en inglés. El patrón no tiene nombre: el espectador oye "un patrón conocido" y después dos procesos que guardan, envían y marcan, sin oír nunca "outbox" ni "inbox". La 17 es el espejo de la 16. Es el único punto de la lección con carga 4 y fricción 4 a la vez.

2. **La hoja de ruta no coincide con el orden de la lección (ideas 7, 8 y 14 a 25).** La voz promete "duplicado, reintento, dato que deja de llegar, negocio. Las vamos a ver en ese orden". Pero el bloque de dos escrituras (14 a 18, casi un minuto) entra entre el duplicado y el reintento y no está en la promesa. Por eso el reintento (19) y el silencio (25) cambian de hilo con fricción 3, y el espectador tiene que recordar un anuncio que el cuerpo ya no sigue.

3. **Afirmaciones que las fuentes no sostienen o matizan (ideas 11, 22, 23, 27, 34 y 35).**
   - "Ningún documento" y "ninguno" (22, 23): las fuentes de ClearView (`Pragmatic-src/C4/C3-components-hr-integration.md` l. 37) no dicen nada después del último intento, pero el mismo corpus de Farmacy Food sí tiene un final. `ArchColider-src/3.ViewsAndPerspectives/InformationModels.md` l. 239: "If there is no confirmation about payment acceptance or rejection, a user should be notified and retry should be offered". `GUION-MAESTRO.md` l. 70 repite "lo que ningún repo dice". Lo que la fuente sostiene es que ClearView no lo dice. "El hueco más repetido" (23) no tiene recuento en ninguna tabla.
   - "Resolvió" y "tiene sus respuestas escritas" (11, 34): el ADR 008 está en estado Proposed (`ArchColider-src/4.ADRs/008 …md` l. 7), y el ADR 012 de las heladeras también (l. 7). La lección 11 dice que "propuesta" dice cosas que "aceptado" no dice. El espectador oye una decisión tomada.
   - "Durante un plazo" (35): `ArchColider-src/2.SolutionBackground/RisksAndSensitivePoints.md` l. 25-26 lo pone como "Options" dentro de "Technical Risks", no como decisión, y sin plazo. La lección 5 (l. 47) dice que el pago "no admite ninguna demora", así que las dos lecciones chocan. Además, el cierre repite el hueco que la lección critica: qué pasa al vencer el plazo, no está escrito.
   - Alertas (27): `BluzBrothers-src/ADR/ADR-016…md` l. 15 manda las alertas al móvil por HTTP y los datos a la estación por WebSocket; cada receptor avisa si el otro cae. La voz dice que las alertas salen a la estación. `C1-context.md` l. 12 sí atribuye alertas a la estación, así que la fuente no es unívoca: conviene citar la decisión y no la frase.
   - Verificado y correcto: la cita de ADR 008 l. 13 y su decisión l. 17-21; la línea de Five Nines (l. 49-52, COMMIT y luego Publish, sin manejo de fallo de la publicación); el outbox e inbox de Archangels; el dummy message de ArchColider 004 (l. 21-29); la pregunta "minutes or hours" (ADR 012 l. 33); el failover de MonitorMe (l. 5-8).

4. **Repeticiones y temas de otras lecciones (ideas 13, 18, 28, 32, 33).** Las heladeras (28) ya están en la lección 5 (l. 47): "se guarda una copia propia, que se corrige cuando llegan datos nuevos". MobilityCorp en la reserva (18) se explicó en la lección 6 (l. 21, autorización previa y espera) y en la 5 (l. 39). "Separar un módulo" (33) es la lección 9 (l. 39). El costo "está escrito" aparece tres veces (13, 32 y el "escrito" de la 34), con el mismo tono de la lección 3.

5. **Vocabulario sin presentar y términos que cambian de sentido (ideas 6, 19, 21, 31, 36).** "Camino feliz" (6) no se define. "Pedido" nombra la orden de Farmacy Food en el resto de la lección, y en el reintento nombra un currículum (19, 21). "Cola de mensajes fallidos" y "colas de reintento de nivel superior" son la dead-letter queue y las colas escalonadas, sin nombre. La 31 suma cuatro términos nuevos en una oración. El verbo "escrito" se repite en seis ideas y pisa el título de la lección 11, "Lo que queda escrito".

## Qué cambiaría, en orden de impacto

1. **Mover el bloque de dos escrituras (ideas 14 a 18, de 1:35 a 2:24) a la lección 6, "Cómo se hablan las partes".** La lección 6 ya cierra con "cada una ofrece una garantía distinta sobre qué pasa con el mensaje", y el outbox es la forma de no perder un evento al publicarlo. El caso de MobilityCorp (18) se vería junto a su autorización previa (L6, l. 21). La alternativa es la lección 5, donde ya se dice que al repartir "se pierde la transacción única" (l. 35). Con eso, la L7 sigue el orden que anuncia (duplicado, reintento, silencio, negocio) y se van unos 50 segundos de carga 3-4 y fricción 3-4 de la lección.

2. **Corregir las afirmaciones antes de grabar (lecciones 7 y 5).** En la 7: quitar "ningún documento" y "el hueco más repetido" (ideas 22, 23), y decir que ClearView no lo dice y que ArchColider sí da un camino para el pago (l. 239); cambiar "resolvió" por "propone" en las ideas 11 y 34, y "tiene sus respuestas" por "tiene respuestas propuestas"; en la 35, decir que el plazo no está fijado y que lo que pasa al vencerlo no está escrito. En la 5 (l. 47), cambiar "el pago no admite ninguna demora" por "no admite duplicados", y dejar la espera a la lección 7. Estos cambios cambian texto, así que hay que re-anclar las escenas afectadas (`gancho`, `duplicado` y `cierre`).

3. **Presentar antes, en la lección 7, lo que hoy se usa sin nombre (ideas 6, 16, 17, 19, 21, 31).** Si el bloque de la 2 queda aquí: nombrar outbox e inbox y presentar Farmacy Family en una frase; definir "camino feliz" con un ejemplo (el pago que sale bien); cambiar "pedido" por "currículum" en 19 y 21; nombrar la cola de mensajes fallidos una vez (dead-letter). En la 31, separar el chequeo de salud en dos oraciones, una por métrica.

4. **Sacar de la lección 7 lo que es de la 9 y de la 5 (ideas 28, 32, 33).** "Separar un módulo" (33) pasa a la lección 9, donde ya se dice "separar un módulo cuando las métricas lo pidan"; en la 7 queda "detecta fallos que ninguna métrica muestra". Las heladeras (28) quedan solo en la pregunta pendiente (29), porque la copia propia ya está en la lección 5. Con los cortes 2 y 4 la lección baja a unas 29 ideas.
