# Bloque 10 · Cuando algo falla

**Enseña:** se empieza por lo que el negocio no puede perder, y se decide antes qué pasa si eso falla. Cuatro familias (un segundo camino, seguir sin el otro, reintentar, que repetir no haga daño) con lo que gana y paga cada una.
**Par:** Farmacy Food abre el refrigerador sin red con un código; MonitorMe manda la alerta por dos caminos. Reintentar: la cola de fallidos de ClearView. Que repetir no haga daño: Farmacy Food descarta el pedido duplicado; Farmacy Family guarda y avisa con dos bandejas.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** el refrigerador con su memoria (bloque 8), los sistemas de recursos humanos de ClearView (apertura), la cola y el mensaje (bloque 7), Farmacy Family como segunda fase (bloque 5). **Presenta:** ningún caso; código de retiro, segundo camino, cola de fallidos, duplicado, bandeja de salida y de entrada.
**Pieza de ClearView:** la cola de reintentos.

## La nevera sin red {#gancho}

**Narración**

Un cliente de Farmacy Food llega al refrigerador a retirar su comida, y justo en ese momento el refrigerador no tiene red. No puede comprobar en línea quién es esa persona ni qué compró. Y lo que el negocio vende es, justamente, que el cliente se lleve su comida.

La respuesta del equipo fue un código. Cada comida que sale de la cocina lleva un código de seis a ocho dígitos, que se genera de antemano. Se manda temprano al refrigerador y al teléfono del cliente, mientras hay red. Si después la red se cae, el refrigerador compara el código con lo que tiene en su memoria y abre igual.

El equipo anotó también lo que eso trae. Alguien con mucha suerte podría adivinar un código al primer intento, y ocho dígitos ya son incómodos de escribir. Y anotó una ventaja que vino de regalo, que mandar a otra persona a retirar la comida se vuelve fácil.

**Visual**
- Estás aquí: la región "cuando algo falla".
- Sello: Farmacy Food. El refrigerador con su teclado y un cliente delante; la red se corta. El código viaja antes, con la red arriba, a la memoria del refrigerador y al teléfono; con la red cortada, el cliente escribe el código y la puerta se abre. Debajo, dos riesgos en ámbar y una ventaja en verde.

## Cuatro familias {#familias}

**Narración**

Cuando algo falla, la primera pregunta es qué no puede perder el negocio. Lo demás puede fallar un rato sin que pase nada grave. Para proteger lo que no se puede perder hay cuatro familias.

La primera es un segundo camino, otra copia u otro canal que sigue andando si el primero cae. Gana con que la falla de una pieza no corta el servicio. Paga con el doble de cosas que mantener.

La segunda es seguir sin el otro, como el refrigerador que abre sin red. Gana con que lo esencial sigue funcionando. Paga con trabajo previo, porque lo que hace falta tiene que estar en su lugar antes de la falla.

La tercera es reintentar. Lo que falló se guarda en una cola y se vuelve a intentar más tarde. Gana con que una falla pasajera no pierde nada. Paga con demoras, y con que lo mismo puede llegar más de una vez.

La cuarta es que repetir no haga daño. Cada mensaje lleva con qué reconocerlo, y quien lo recibe descarta el que ya procesó. Gana con datos correctos aunque los mensajes se repitan. Paga con algo de rendimiento y con piezas que llevan la cuenta.

**Visual**
- El tramo del mapa: "cuando algo falla" en naranja y sus cuatro tarjetas.

## Las alertas por dos caminos {#alertas}

**Narración**

En MonitorMe, lo que no puede fallar es la alerta. Si un paciente empeora, alguien tiene que enterarse. El equipo escribió que, en este sistema, la prioridad es la vida de las personas.

Así que la alerta sale por dos caminos distintos. Uno manda una notificación al teléfono del personal médico, por internet. El otro la muestra en la pantalla de la estación de enfermería, por la red local del hospital. Si uno de los dos no está disponible, el aviso sale igual por el otro.

El costo también está escrito. Son dos formas de comunicación que mantener, con los datos en el mismo formato en las dos, y hay que vigilarlas a las dos para que sigan andando.

**Visual**
- Sello: MonitorMe. El analizador a la izquierda; a la derecha, el teléfono arriba y la estación de enfermería abajo. La alerta sale por los dos caminos; se corta internet y llega a la estación; se corta la red local y llega al teléfono.

## Lo que protege cada uno {#par}

**Narración**

Farmacy Food y MonitorMe protegen lo que su negocio no puede perder, con dos familias distintas. Farmacy Food necesita que el cliente se lleve su comida, y lo logra con un refrigerador que sigue sin red. MonitorMe necesita que el médico se entere, y lo logra con un segundo camino. Los dos empezaron por preguntarse qué pasa si esto falla, antes de que fallara.

**Visual**
- Dos mitades: el refrigerador que abre sin red ("retirar la comida") y las dos flechas de alerta, una cortada y la otra llegando ("enterarse").

## Lo que falla todos los días {#reintentos}

**Narración**

ClearView tiene un borde difícil. Cuando una empresa desbloquea a un candidato, el currículum tiene que llegar al sistema de recursos humanos de esa empresa. Son unos cien sistemas distintos, con miles de configuraciones, y el equipo escribió que las fallas van a ser algo de todos los días.

Lo primero que decidió fue que un sistema de recursos humanos caído no bloquee nada. El envío es asíncrono y lo hace un servicio aparte. Si un envío falla, va a una cola de fallidos, y esa cola se vuelve a intentar cada tanto. Para no gastar de más, el equipo anota que se puede esperar cada vez un poco más entre un intento y el siguiente.

**Visual**
- Sello: ClearView. El currículum desbloqueado sale hacia tres sistemas de recursos humanos punteados con "×100"; uno no contesta. El envío cae a una cola de fallidos; la cola reintenta con esperas cada vez más largas (1, 2, 4) hasta que el sistema vuelve y el currículum llega.

## Un pedido que llega dos veces {#duplicado}

**Narración**

Reintentar trae su propio problema. Para no perder un mensaje, la cola espera que quien lo procesa avise que terminó, y si el aviso no llega, lo entrega otra vez. Pero el aviso también se puede perder, aunque el trabajo ya se haya hecho. Así, el mismo mensaje llega dos veces.

En Farmacy Food, el mensaje que no se puede perder es el del pedido listo para pagar, y lo que no se puede repetir es el cobro. El equipo propone que el pedido viaje con un identificador único, que genera el teléfono del cliente, y con un número de versión. Si llega un pedido con un identificador y una versión que ya se procesaron, se descarta. El costo está en una línea, un poco menos de rendimiento a cambio de datos correctos.

**Visual**
- Sello: Farmacy Food (propuesta). Teléfono → cola → pagos. Pagos devuelve el aviso; el aviso se pierde; la cola entrega otra vez. El pedido lleva "id 7f3a · v1"; el segundo llega, se compara con lo ya visto y se descarta; un solo cobro.

## Guardar y avisar {#bandejas}

**Narración**

Hay otra forma de quedar a medias. Cuando algo pasa en el negocio, el sistema tiene que guardarlo en su base y además avisar a las otras partes. Son dos escrituras, y si el sistema se cae entre una y otra, la base dice una cosa y el resto nunca se entera.

Farmacy Family, la segunda fase del mismo negocio, lo resolvió con dos bandejas. Al avisar, el evento se guarda primero en la misma base, en una bandeja de salida, y otro proceso lo envía y lo marca como enviado. Al recibir, el evento entra a una bandeja de entrada, y otro proceso lo maneja y lo marca como manejado. Así, si llega dos veces, la segunda se ignora. El precio es más complejidad, con procesos aparte que revisan las bandejas.

**Visual**
- Sello: Farmacy Family. Una parte con su base → otra parte. Las dos flechas (guardar, avisar); la parte cae entre las dos y la otra queda sin enterarse. Se rebobina: en la base aparece "salida", el evento se guarda junto al dato; un proceso chico lo envía y marca "enviado". En la otra parte, "entrada": el evento entra y se marca; un duplicado llega y se ignora.

## La pregunta que decide {#pregunta}

**Narración**

En esta región la pregunta es qué no puede perder el negocio, y qué pasa si esto falla. Si no puede haber ni un corte, hace falta un segundo camino. Si lo de afuera no es confiable, conviene poder seguir sin él. Y si lo que importa es que llegue aunque tarde, se reintenta, cuidando que repetir no haga daño.

**Visual**
- El tramo del mapa con las cuatro familias; debajo, la pregunta; la cola de reintentos de ClearView queda marcada en su tarjeta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ADR-011 de Farmacy Food (Accepted): la red se puede perder al retirar; el refrigerador no puede comprobar al usuario en línea; tiene teclado y memoria; código de 6 a 8 dígitos; "formed upfront and delivered early to devices (smart-fridge and user-device)"; riesgo de adivinar al primer intento; "8th long digit codes are too long to type!"; "Bonus feature: it's easier to delegate meal grabbing to other people" | `ArchColider/4.ADRs/011 Every meal delivery has pick up pin code.md` |
| "Maximizing guarantee of a meal picking up by user" como impulsor de negocio | `ArchColider/1.ProblemBackground/BusinessDrivers.md` l. 31 |
| MonitorMe ADR-016 (Accepted): alertas al móvil por HTTP y a la estación por streamer; "In the context of prioritizing human life, the unavailability of one data receiver will trigger notifications on the other"; contras: dos protocolos, formato consistente, monitoreo y mantenimiento de los dos canales | `BluzBrothers/ADR/ADR-016-separation-of-data-transmission-responsibilities.md` |
| Push al teléfono "via an internet connection"; estación "within the local infrastructure… even if internet connectivity is disrupted" | `BluzBrothers/FitnessFunctions/Alerts.md` l. 3-5 |
| ClearView: unos cien sistemas de recursos humanos (apertura); "thousands of different configurations"; "failures are expected to occur regularly" | `Pragmatic/ADR/ADR-023-adapters-for-hr-systems.md` l. 15-16; `Requirements/requirements-and-assumptions.md` l. 77 |
| ClearView ADR-005 (Accepted): envío asíncrono; "Unavailable HR systems should not lead to blocking processes"; "A retry mechanism is needed" | `Pragmatic/ADR/ADR-005-async-with-external-systems.md` |
| ClearView ADR-023 (Accepted): servicio aparte para el envío; "dead-letter queue that holds failed attempts… processed and retried periodically"; "one could implement an exponential backoff" | `Pragmatic/ADR/ADR-023-adapters-for-hr-systems.md` l. 18-22 |
| Farmacy Food ADR-008 (Proposed): pedido "Ready to pay"; acuse de recibo; evitar cobros dobles; id único desde el dispositivo del cliente y número de versión; el evento con la misma versión se descarta; "It will slightly decrease performance, but we get data integrity." | `ArchColider/4.ADRs/008 At least once delivery for ready to pay order.md` |
| Farmacy Family ADR-004 (Accepted): el problema de la doble escritura; outbox (guardar, otro proceso envía y marca enviado) e inbox (guardar, otro proceso maneja y marca manejado); ignorar los ya registrados; contras: sondeo, más complejidad con procesos aparte | `Archangels/4.ADRs/004-use-inbox-outbox-pattern.md` |
| Cómo un aviso perdido produce el duplicado (entrega al menos una vez); lo que gana y paga cada familia | Conocimiento general (externo), coherente con los ADR citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El plan lista cinco familias (réplicas, segundo camino, reintentos, duplicados, sin red); el máximo es cuatro | Réplicas y segundo camino se juntan en "un segundo camino"; duplicados y bandejas, en "que repetir no haga daño" |
| 1 | Diseño del aprendizaje | La escena del sensor que deja de mandar datos (versión anterior) enseña sobre ver qué pasa | Sale de este bloque; queda disponible para el bloque 12 |
| 1 | Diseño del aprendizaje | Ningún caso nuevo; el refrigerador ya se vio en el bloque 8 con su memoria | El código se cuenta aquí completo; el bloque 8 solo dijo que el refrigerador procesa pedidos |
| 2 | Arquitecto senior | "Entrega al menos una vez" es el nombre que se usa en la industria | Se explica el mecanismo sin el nombre, para no sumar un término |
| 3 | Verificador | Farmacy Food ADR-008 está en Proposed; ADR-011, ADR-016, ADR-005, ADR-023 y ADR-004, en Accepted | "Propone" para el pedido duplicado; "anota que se puede" para la espera creciente ("one could implement") |
| 3 | Verificador | "unos cien sistemas" viene de la apertura; "miles de configuraciones" del ADR-023 | Se dicen las dos cosas, en ese orden |
| 4 | Guionista | El cierre del par ("antes de que fallara") y la pregunta repetían "qué pasa si esto falla" | Se mantiene: la pregunta de la región es esa frase; el par la anticipa |
| 4 | Guionista | La pregunta final enumera tres familias | Va como guía de elección, no como repaso; la cuarta queda dentro de la tercera |
| 5 | Espectador de prueba | "Bandeja de salida" sin imagen previa | El visual la dibuja dentro de la base, junto al dato |
| 6 | Dirección visual | Cinco casos en pantalla a lo largo del bloque | Cada escena tiene un solo sello |
| 7 | Producción | Ids: `gancho`, `familias`, `alertas`, `par`, `reintentos`, `duplicado`, `bandejas`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
