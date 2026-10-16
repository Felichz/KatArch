# Cuando algo falla

## Lección 7 {#gancho}

En Farmacy Food, cuando un cliente confirma su pedido, el pedido pasa a un estado que el equipo llama listo para pagar. Ese mensaje tiene que llegar al procesamiento del pago sí o sí, porque vender comidas es todo el negocio. Y a la vez, escribieron, ese pedido puede terminar procesándose más de una vez.

Lo que no puede pasar es que eso termine en cargos dobles, triples, y así, en la cuenta de un cliente. Que llegue siempre y que no se cobre dos veces son dos exigencias que tiran en sentidos opuestos, y las dos se diseñan.

## Qué se diseña para cada mensaje {#pregunta}

Cuando las partes se hablan con mensajes, hay cosas que se diseñan aparte del camino feliz, que es el camino en que todo sale bien. Qué pasa si un mensaje llega dos veces, o si se guarda a medias. Cómo se reintenta uno que no llegó, y qué pasa cuando los reintentos se acaban. Y qué significa que un dato, o el negocio entero, se quede en silencio.

## Al menos una vez {#duplicado}

Para que un mensaje no se pierda, la cola espera un acuse de recibo. Si el que procesa no avisa que terminó, la cola lo vuelve a entregar. El problema es que el aviso también se puede perder, aunque el trabajo se haya hecho. Por eso esta garantía se llama entrega al menos una vez, y trae los duplicados de regalo.

Farmacy Food propone resolver el duplicado con dos datos que viajan con el pedido: un identificador único, que genera el propio teléfono del cliente, y un número de versión. Al procesar, se comprueba si ya existe un pedido con ese identificador, y un evento con una versión ya vista se descarta.

El costo está escrito en una línea. Baja un poco el rendimiento, pero se gana integridad de los datos, o sea, que los datos sean correctos y no se pierdan.

## Dos escrituras que pueden quedar a medias {#dosescrituras}

Hay un problema vecino. Cuando algo pasa en el negocio, el sistema tiene que guardarlo en su base y además publicar el evento para los demás. Son dos escrituras distintas, y si el sistema se cae entre la primera y la segunda, la base dice una cosa y el resto del sistema nunca se entera.

Farmacy Family, la comunidad de salud que mejora el sistema de Farmacy Food, lo resolvió con un patrón conocido, en dos mitades. La primera se llama outbox. Al publicar, el evento se guarda primero en la misma base, y otro proceso lo envía y lo marca como enviado.

La segunda mitad se llama inbox, y es la misma idea al recibir. El evento se guarda primero, otro proceso lo maneja y lo marca como manejado, y eso permite ignorar los que ya llegaron.

MobilityCorp, en cambio, en la reserva confirma la transacción y después publica el evento, sin decir qué pasa si la publicación falla. Es justo el hueco que ese patrón cubre.

## Reintentar, con espera {#reintento}

ClearView manda currículums a sistemas de recursos humanos que se caen con frecuencia. Cuando un envío falla, el pedido va a una cola de mensajes fallidos y se reintenta con una espera que crece en cada intento, para no saturar al sistema que ya está en problemas. Si los fallos siguen, pasa a colas de reintento de nivel superior, hasta que ya no se hacen más intentos.

Y ahí termina lo escrito. En ClearView, ningún documento dice qué pasa con un currículum después del último intento, ni quién se entera de que no llegó.

Farmacy Food sí escribe un final para su pago. Si la aplicación no recibe confirmación de que el pago se aceptó o se rechazó, el usuario debería enterarse, y se le debería ofrecer reintentar. Diseñar el fallo incluye ese final: alguien tiene que enterarse, y tiene que haber un camino que no dependa del sistema que falló.

## El silencio también se diseña {#silencio}

A veces el fallo no es un mensaje repetido, sino uno que deja de llegar. En MonitorMe, si un sensor falla, la pantalla simplemente deja de mostrar ese dato. Por eso las reglas que analizan al paciente se pueden configurar para el caso en que el dato no existe o es demasiado viejo: la regla no se ejecuta, o salta una alerta. Y las alertas salen por dos canales distintos, al teléfono y a la estación de enfermería, de modo que si uno no está disponible, avisa el otro.

Farmacy Food enfrenta lo mismo con los refrigeradores, que pueden dejar de mandar su stock por falta de red o por mantenimiento. Propone guardar una estimación propia y corregirla cuando lleguen datos nuevos. Y dejó una pregunta escrita como pendiente, para acordar con el negocio: cuándo levantar una alarma por un hueco de datos, si a los minutos o a las horas.

## Saber si el negocio funciona {#negocio}

Hay un silencio más difícil de ver, el del negocio. Las métricas de las máquinas, como el procesador o la memoria, pueden decir que todo está bien mientras algo en la lógica del negocio se trabó.

Para eso, Farmacy Food agregó chequeos de salud del negocio. Un supervisor manda mensajes de prueba que recorren los escenarios críticos, por ejemplo hacer un pedido, y mide si el resultado es correcto y cuánto tarda.

El costo está escrito: esos mensajes de prueba hay que diseñarlos en el código, y eso agrega esfuerzo y complejidad. A cambio, el sistema tiene una capa más de seguridad para el caso en que las máquinas están sanas y el negocio no.

## Las preguntas de cada mensaje {#cierre}

El pedido listo para pagar de Farmacy Food tiene sus respuestas propuestas por escrito. Llega al menos una vez, el duplicado se descarta por identificador y versión, y si el pago no se confirma, el usuario se entera y puede reintentar.

Lo que empezó como dos exigencias opuestas, que llegue siempre y que no se cobre dos veces, quedó resuelto en el papel antes de construir nada. Cada mensaje importante de un sistema trae sus propias preguntas de fallo, y responderlas en un documento cuesta mucho menos que descubrirlas con un cliente al que se le cobró dos veces.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Pedido "Ready to pay"; "in theory, it can be processed one or more times, but it should not lead to doubled, tripled, and so on charges". Estado **Proposed** (se narra "propone") | ArchColider: `4.ADRs/008 At least once delivery for ready to pay order.md` l. 7, 13 |
| Cola con acuse ("message acknowledgment option"), id único desde los dispositivos del cliente, número de versión; el evento con la misma versión se descarta; "It will slightly decrease performance, but we get data integrity." Definición de integridad: explicación del curso, igual que en L2 y L5 | ArchColider: `4.ADRs/008…` l. 17-21 |
| Outbox e inbox; Farmacy Family mejora el sistema de Farmacy Foods | Archangels: `4.ADRs/004-use-inbox-outbox-pattern.md` l. 16-23; `1.ProblemBackground/BusinessGoalsDriversAndRequirements.md` l. 10 |
| MobilityCorp SD-001: COMMIT y después Publish ReservationCreated | Five Nines: `hld/core-func/car-van-rental/4_Sequence_Diagram.md` l. 49-52 |
| Dead-letter queue, backoff exponencial (ADR: "one could implement"; el C3 lo da por implementado), colas superiores "until no further attempts are made"; nada sobre el después en Pragmatic | Pragmatic: `C4/C3-components-hr-integration.md` l. 37; `ADR/ADR-023` l. 16-22 |
| Farmacy Food: "If there is no confirmation about payment acceptance or rejection, a user should be notified and retry should be offered" (se narra con "debería") | ArchColider: `3.ViewsAndPerspectives/InformationModels.md` l. 239 |
| MonitorMe: reglas para dato inexistente o viejo; alertas por dos canales (push al móvil y Streamer a la estación) | BluzBrothers: `FitnessFunctions/Failover.md` l. 5-8; `FitnessFunctions/Alerts.md` l. 3-5; `ADR/ADR-016` |
| Refrigeradores (Proposed): stock estimado; "when to raise an alarm in case of a data gap. It might be minutes or hours" | ArchColider: `4.ADRs/012 Stale data from fridges.md` l. 23-33 |
| Health check de negocio (Accepted) con "dummy message from a dedicated supervisor", "correctness of execution and time spent"; "in case of a healthy technical case, but something in a business logic stucked"; costo "additional effort and increases cognitive complexity". "Hacer un pedido" es ejemplo nuestro | ArchColider: `4.ADRs/004 Health check endpoints.md` l. 21-29 |
