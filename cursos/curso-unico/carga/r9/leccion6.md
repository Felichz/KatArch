Total: 37 ideas, duración aproximada 5:53.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Sysops Squad es soporte técnico de una empresa de electrónica; su sistema de tickets es un monolito que pierde tickets y se congela | 1 | 1 | Sysops Squad | Frase casi idéntica a la de las lecciones 4 y 5; no trae nada nuevo |
| 2 | 0:11 | El equipo propone separar la parte de clientes, que tiene que seguir hablando con las demás | 2 | 2 | — | Un paso nuevo: la parte separada tiene que comunicarse; "parte de clientes" ya es de la lección 4 |
| 3 | 0:18 | Cada vez que dos partes se hablan hay una conversación | 3 | 2 | — | "Conversación" como término nuevo, generalizado sobre la idea anterior |
| 4 | 0:22 | Conversaciones síncronas (quien llama espera) o asíncronas (deja el mensaje y sigue) | 4 | 2 | — | Dos términos nuevos (síncrona, asíncrona) combinados con "conversación" |
| 5 | 0:34 | La tarjeta es una de esas conversaciones: sus datos pasan a facturación; hacerla síncrona anularía el esfuerzo de la parte de clientes | 1 | 2 | — | Tarjeta, facturación y el argumento de anular el esfuerzo ya están en la lección 4 (l. 9 y 49) |
| 6 | 0:52 | (pregunta) Eso nos lleva a una idea más general: cada conexión entre partes es una decisión, y hay que decidir cómo se hablan | 3 | 3 | — | Generalización nueva sobre la tarjeta; el salto de caso a principio está anunciado ("idea más general") |
| 7 | 1:01 | En un diagrama la conexión es una flecha, y la tarjeta es una; para decidir ayudan dos cosas | 3 | 2 | — | "Flecha" como notación nueva, combinada con la tarjeta; "dos cosas" anunciadas |
| 8 | 1:09 | Una cosa es la pregunta de cada flecha; la otra, los sistemas de otros | 3 | 2 | — | Dos elementos nuevos sin presentar: "la pregunta" y "los sistemas de otros" |
| 9 | 1:15 | (flecha) La pregunta: si quien llama necesita la respuesta para seguir | 3 | 2 | — | Criterio nuevo aplicado a la flecha; continúa la lista anunciada |
| 10 | 1:21 | Si la necesita, espera; si no, deja el mensaje en una cola | 3 | 3 | — | "Cola" se usa sin presentar; se define una línea después (idea 11) |
| 11 | 1:25 | Una cola es como un buzón, del que el otro lado retira el mensaje cuando puede | 4 | 1 | — | Dos elementos nuevos: la metáfora del buzón y el retiro por el receptor, combinados con la cola |
| 12 | 1:30 | Sysops usa la pregunta en algunas conversaciones; casi todas sus decisiones son propuestas, no construidas | 3 | 4 | — | Estado de propuesta: tema de la lección 11 (estado de los ADR), sin puente |
| 13 | 1:39 | La tarjeta va por mensajes asíncronos, y así se evita anular el esfuerzo | 1 | 2 | — | Aplica lo ya dicho; "La tarjeta, por ejemplo" tiende el puente de vuelta |
| 14 | 1:45 | Las llamadas que entran desde la pantalla son síncronas: si el cliente cambia su perfil y recarga, el cambio tiene que verse enseguida | 3 | 2 | — | "Pantalla" como origen de llamadas, sin definir; caso del perfil nuevo; contraste con "en cambio" |
| 15 | 1:55 | Una misma parte de clientes usa mensajes para unas flechas y llamadas para otras | 3 | 2 | — | Síntesis que combina la tarjeta con la pantalla; no trae término nuevo |
| 16 | 2:05 | (reserva) Ahora otro caso: MobilityCorp, empresa que alquila vehículos eléctricos | 2 | 3 | MobilityCorp | Caso nuevo; el cambio de caso está anunciado ("otro caso") |
| 17 | 2:11 | Al reservar, lo primero es una preautorización: una retención del monto en la tarjeta, sin cobrarlo | 3 | 1 | — | "Preautorización" nueva, combinada con la tarjeta; siguiente paso del mismo caso |
| 18 | 2:23 | Un servicio de reservas pide la preautorización a un servicio de pagos y espera, porque sin pago aprobado no tiene sentido guardar la reserva | 5 | 2 | — | Pico: servicio de reservas, servicio de pagos y la regla de guardar solo con pago aprobado, combinados con "espera" |
| 19 | 2:31 | Esa flecha espera, como las llamadas de la pantalla; con el pago aprobado, el servicio guarda la reserva | 1 | 1 | — | Aplica el criterio ya visto; guardar la reserva es continuación |
| 20 | 2:40 | Después publica un evento, un aviso de que la reserva existe, que se manda y no se espera, como los mensajes de la tarjeta | 3 | 1 | — | Paso nuevo (publicar tras guardar) combinado con lo asíncrono; "evento" viene de la lección 5 |
| 21 | 2:48 | La gestión de flota recibe el aviso y actualiza qué autos ven libres los demás clientes | 4 | 2 | — | Dos elementos nuevos: "gestión de flota" como servicio y la lista de autos libres, combinados con el evento |
| 22 | 2:58 | La actualización puede tardar porque no es crítica; el cliente no la espera; el pago se asegura primero | 2 | 1 | — | Un paso nuevo (la lista de autos no es crítica); el resto es síntesis |
| 23 | 3:19 | (precio) Falta el precio de lo asíncrono, y para eso volvemos a Sysops Squad | 3 | 3 | — | Vuelta a un caso de hace casi dos minutos, con puente anunciado; "precio de lo asíncrono" es marco nuevo |
| 24 | 3:24 | La cola puede ser un punto único de falla: si se cae, se detiene todo lo que pasa por ella; por eso su carga se reparte entre copias | 3 | 2 | — | "Punto único de falla" nuevo, combinado con la cola; la carga repartida viene de la lección 3 |
| 25 | 3:34 | La propuesta acepta ese costo, porque el tiempo de respuesta, la disponibilidad y la capacidad de crecer son críticos | 3 | 2 | — | Paso nuevo (se acepta el costo por esas tres), combinado con cualidades de las lecciones 2 y 3 |
| 26 | 3:47 | El costo se paga a cambio de esas tres cosas; aplicado a la tarjeta, se gana crecer y disponibilidad | 1 | 2 | — | Repite y aplica; "la cola resuelve un problema y trae otro" es frase de eslogan |
| 27 | 3:58 | Lo que se paga es la complejidad: un flujo de tickets más difícil de probar y de depurar; lo deducimos nosotros | 4 | 2 | — | Dos elementos nuevos (la complejidad como costo y "depurar"), combinados con el costo de la tarjeta |
| 28 | 4:10 | (externos) Falta ver los sistemas de otros; un último caso: ClearView, plataforma sin fines de lucro que empareja currículums anonimizados con puestos | 1 | 3 | ClearView | Caso ya conocido de las lecciones 2 y 5, con la misma descripción; cambio de tema anunciado |
| 29 | 4:22 | Un empleador puede desbloquear el currículum completo de un candidato, y ClearView lo envía al sistema de recursos humanos de ese empleador | 4 | 1 | — | Dos elementos nuevos: desbloquear el currículum completo y el sistema de RR. HH. del empleador, combinados con ClearView |
| 30 | 4:32 | Cada empleador configura el suyo; según los supuestos del equipo, pueden llegar a doscientas mil configuraciones | 4 | 1 | — | Dos elementos nuevos: configuraciones por empleador y la cifra de doscientas mil, combinados con el sistema de RR. HH. |
| 31 | 4:39 | Con tantas, escriben, se espera que las fallas ocurran con regularidad; por eso el envío es asíncrono | 4 | 2 | — | Dos elementos nuevos: la expectativa de fallas regulares y el argumento de no bloquear, combinados con lo asíncrono |
| 32 | 4:50 | Como los sistemas son distintos, hay un adaptador por tipo de sistema: una pieza que traduce entre su formato y el de ClearView | 3 | 2 | — | "Adaptador" nuevo, combinado con las configuraciones de la idea 30 |
| 33 | 5:00 | El resto del sistema no conoce esos formatos; que sean distintos es un supuesto del equipo, que supone unos cien tipos | 4 | 1 | — | Dos elementos nuevos: la cifra de unos cien tipos y el aislamiento de formatos, combinados con el adaptador |
| 34 | 5:08 | Este envío tiene su precio: la pantalla debe avisar los fallos con más cuidado; deducimos que el usuario ya no recibe un error en el momento | 4 | 2 | — | Dos elementos nuevos: el aviso de fallos en la interfaz y la pérdida del error inmediato, combinados con el envío asíncrono |
| 35 | 5:21 | (cierre) La tarjeta va por asíncronos y el perfil espera; eso cambia cómo se ve el problema: ya no se elige una vez para todo el sistema, se pregunta a cada flecha | 1 | 3 | — | Recuerda lo ya dicho; vuelve al hilo de la tarjeta tras ClearView (salto con puente) |
| 36 | 5:39 | Cada respuesta trae una garantía: lo que se puede esperar que le pase al mensaje si algo falla | 3 | 2 | — | "Garantía" como término nuevo, definido en la misma frase, combinado con la pregunta de la flecha |
| 37 | 5:46 | Si falla la llamada de la pantalla, el cliente lo ve enseguida; si falla el mensaje de la tarjeta, nadie lo ve | 4 | 1 | — | Dos consecuencias nuevas de fallo, combinadas con la garantía; la segunda no tiene respaldo en la fuente (ver errores) |

### Lo que muestran los puntajes

1. **Carga 4 o más con fricción 3 o más: ninguna idea.** Los picos de carga y los de fricción aparecen en ideas distintas. Las de carga 4 o más tienen fricción 1 o 2 (ideas 4, 11, 18, 21, 27, 29, 30, 31, 33, 34, 37).

2. **Carga 3 o más con fricción 3 o más:** idea 6 (0:52, generalización "cada conexión es una decisión" tras un anuncio de idea general, carga 3, fricción 3); idea 10 (1:21, "cola" usada antes de definirla, carga 3, fricción 3); idea 12 (1:30, estado "propuesta" que es tema de la lección 11, carga 3, fricción 4); idea 23 (3:19, vuelta a Sysops Squad tras MobilityCorp, carga 3, fricción 3).

3. **Pares consecutivos con carga 4 o más:** idea 29 (4:22) y 30 (4:32), idea 30 y 31 (4:39): tres ideas seguidas de carga 4 en el bloque de ClearView (empleador, configuraciones, fallas regulares). Idea 33 (5:00) y 34 (5:08), también seguidas. Entre 4:22 y 5:08 hay cinco ideas de carga 4 en 46 segundos, y casi todas combinan una cifra o un sistema nuevo con el envío asíncrono. Idea 18 (2:23), carga 5, es el pico absoluto: tres elementos nuevos en una frase, con la espera ya usada.

4. **Pares de casos nuevos a menos de dos minutos:** ninguno. Sysops Squad (0:01), MobilityCorp (2:05) y ClearView (4:10) quedan separados por 2:04 y 2:05. Están justo en el límite. Sysops Squad y ClearView ya se presentaron en las lecciones 2, 4 y 5, así que para la carga no son elementos nuevos; la columna "Caso nuevo" sigue el criterio de primera aparición en la lección.

5. **Términos usados sin presentar, o que aparecen una vez:** "pantalla" aparece cuatro veces (1:45, 5:08, 5:21, 5:46) y nunca se dice qué es (una página, una app o un gateway). "Cola" se usa en 1:21 y se define en 1:25. "Garantía" (5:39) se define en el cierre y no vuelve a aparecer. "Adaptador" (4:50) se usa dos veces y no se retoma.

### Errores de hecho y contradicciones

1. **"Si falla el mensaje de la tarjeta, nadie lo ve" (idea 37, guion l. 77).** No tiene respaldo en la fuente y no está marcada como deducción (el resto de la lección sí lo marca). La fuente dice lo contrario de lo que sugiere: "we should guarantee message delivery to the exact destination" (`C:\Users\felix\dev\katarch-corpus\Team-7-src\ADR\ADR-2-event-driven-broker.md` l. 21), y para facturas usa "a persistent message queue" (`...\ADR-5-extract-customer-quantum.md` l. 28). Ninguno de los dos documentos describe qué pasa cuando falla el mensaje de la tarjeta.

2. **Cifra que cambia el sentido de la fuente (idea 31, guion l. 65).** La lección dice "doscientas mil configuraciones" y "con tantas... se espera que las fallas ocurran". La fuente de la falla dice miles: "Q16 indicates, that we need to cater for thousands of different configurations. With that many different external systems interfacing, failures are expected to occur regularly" (`C:\Users\felix\dev\katarch-corpus\Pragmatic-src\ADR\ADR-023-adapters-for-hr-systems.md` l. 15-16). Doscientas mil es el tope de Q16 ("in the thousands, up to 200'000", `...\Pragmatic-src\Requirements\requirements-and-assumptions.md` l. 77), que sale de A30 (100.000 empleadores) por A31 (dos sistemas por empleador), l. 110-111. La lección le atribuye a "tantas" (200.000) lo que la fuente sostiene con "miles".

3. **Estado de las decisiones (ideas 13, 14, 35; guion l. 25, 27, 73).** La lección dice "casi todas son propuestas" (l. 23), pero después presenta como hechos la tarjeta por mensajes asíncronos y las llamadas de la pantalla síncronas. Ambas son propuestas: `...\Team-7-src\ADR\ADR-5-extract-customer-quantum.md` l. 3-4 ("Proposed") y `...\ADR-12-gateways.md` l. 4-5 ("Proposed"). Es un error de encuadre, no de contenido.

4. **Contradicción dentro de la fuente de MobilityCorp (no es error de la lección).** El diagrama dice `UPDATE vehicle SET status='reserved'` dentro de la transacción (`C:\Users\felix\dev\katarch-corpus\Five-Nines-src\hld\core-func\car-van-rental\4_Sequence_Diagram.md` l. 48) y `UPDATE vehicle SET availability='free'` en SD-007 (l. 554), pero la misma fuente fija la actualización de disponibilidad "via event" (l. 65), igual que `3_Domain_Model.md` l. 209 y ADR-0007 (Fleet como fuente única). La lección (ideas 21 y 22, guion l. 43) sigue el evento, que es lo que fija la fuente más general. Está bien, pero conviene que la verificación lo diga.

Contradicciones entre lecciones sobre Sysops Squad, MobilityCorp o ClearView: ninguna encontrada. Las descripciones de ClearView (lecciones 2, 5 y 6) coinciden, y lo que dice la lección 4 sobre la llamada con espera y la facturación caída es consistente con la 6.

### Qué cambiaría

1. Reemplazar "si falla el mensaje de la tarjeta, nadie lo ve" (guion l. 77) por algo que la fuente sostenga: "La propuesta no dice qué pasa si ese mensaje falla; lo que pide es que la entrega esté garantizada." Así la garantía queda como pregunta abierta y no como afirmación.

2. Presentar "la pantalla" la primera vez (guion l. 22) con una frase, por ejemplo "lo que ve el cliente en la web o en la app", y definir "cola" antes de usarla en la línea 21 (o cambiar el orden de las líneas 21 y 23). Eso baja la fricción de las ideas 10 y 14.

3. En el bloque de ClearView (guion l. 65), decir "miles de configuraciones", que es lo que sostiene la fuente, y dejar doscientas mil solo como tope de los supuestos. Quitar una de las dos cifras de cada frase baja la carga de las ideas 30 y 33 de 4 a 3.

4. Sacar el estado de propuesta de la idea 12 (guion l. 23) o llevarlo a la lección 11, y decir "la propuesta" al hablar de la tarjeta y de las llamadas de la pantalla. Así se quita el salto de tema (fricción 4) y se corrige el encuadre de la contradicción 3.
