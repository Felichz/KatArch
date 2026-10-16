# Cómo se hablan las partes

## Lección 6 {#gancho}

Sysops Squad propone separar la parte de los clientes del resto del sistema. Al hacerlo, esa parte queda con varias conversaciones pendientes: los contratos de soporte, la tarjeta de crédito, los tickets nuevos, las encuestas y las facturas. El equipo decide cada conversación por separado, y no todas reciben la misma respuesta.

Sobre la tarjeta dejaron escrita una razón. Pasarla a la facturación de forma síncrona, con una llamada que espera respuesta, anularía todo el esfuerzo que habían hecho para que la parte de clientes aguantara la carga y estuviera siempre disponible.

## Cada conexión es una decisión {#pregunta}

Cada conexión entre partes es una decisión. Para tomarla sirve una pregunta que se le hace a cada flecha del diagrama. Después aparece el caso en que del otro lado hay muchos sistemas ajenos que hablan distinto, y una decisión que suele pasar desapercibida, la de quién inicia la conversación. Y al final, lo que cuesta todo esto.

## La pregunta para cada flecha {#flecha}

Hay dos maneras básicas de que una parte le hable a otra. En la síncrona, quien llama espera la respuesta antes de seguir, como en una llamada telefónica. En la asíncrona, deja el mensaje en una cola y sigue con lo suyo, como quien deja un mensaje de voz. Y la pregunta que decide entre las dos es si quien llama necesita la respuesta para poder seguir.

Sysops Squad la responde flecha por flecha. Un contrato nuevo no necesita una reacción inmediata, así que se copia de una base a otra cada tanto. El ticket nuevo se manda y se olvida, porque el cliente no tiene por qué esperar a que alguien lo tome.

Las facturas van por una cola que las guarda en disco, para que no se pierda ninguna si el sistema de notificaciones está en mantenimiento. Y las llamadas que entran desde la pantalla siguen siendo síncronas, porque si un cliente cambia algo en su perfil y recarga la página, el cambio tiene que verse enseguida.

## Dentro de un mismo flujo {#reserva}

La misma pregunta separa las flechas dentro de un solo flujo. MobilityCorp, en la reserva de un auto, pide primero al servicio de pagos una autorización previa, y espera la respuesta. Lo hacen así para fallar rápido si hay un problema con el pago, antes de guardar nada, porque si el pago no se autoriza no tiene sentido seguir.

Con la autorización en la mano, guardan la reserva y publican un evento. La disponibilidad del vehículo, que ven los demás clientes, se actualiza después, cuando llega ese evento. Ese camino no es crítico y puede ponerse al día unos instantes más tarde. O sea, en el mismo flujo, una flecha espera y la otra no.

## Muchos sistemas que hablan distinto {#externos}

El caso se complica cuando del otro lado no hay una parte propia, sino sistemas de otros. ClearView tiene que mandar los currículums que un empleador desbloquea al sistema de recursos humanos de ese empleador. El equipo supuso que en el mercado hay unos cien sistemas distintos, cada uno con su propia API, y escribió que sus caídas van a ocurrir con regularidad.

De ahí salen tres decisiones encadenadas. Toda comunicación con sistemas externos es asíncrona, porque un sistema ajeno caído no puede bloquear los procesos propios. Un servicio aparte se encarga solo de transmitir. Y cada sistema externo tiene su adaptador, una pieza que traduce entre su formato y el de ClearView, así que el resto del sistema no tiene que conocer cien formatos distintos.

## Depende de un supuesto {#supuesto}

Road Warrior, el panel que reúne las reservas de viaje, enfrenta un problema parecido, con aerolíneas, hoteles y empresas de alquiler de autos. Pero su diseño no tiene un adaptador por empresa. La razón está en un supuesto que trae el propio enunciado de su kata, y que el equipo repite por escrito: que todas las agencias ofrecen la misma interfaz y solo cambian los puntos de acceso.

Los dos casos parten de supuestos opuestos. ClearView supone que cada sistema habla distinto, y Road Warrior, que todos hablan igual. Fíjate en que poner adaptadores o no depende por completo de ese supuesto, y por eso el supuesto también tiene que quedar escrito, como lo dejaron los dos.

## Quién inicia la conversación {#iniciar}

Hay una tercera decisión, aparte de síncrono o asíncrono: quién empieza a hablar. Para verla sirve Wildlife Watcher, un sistema de cámaras en la naturaleza, con batería y sin internet estable, que se configuran desde una plataforma.

Una opción era que la cámara tuviera una API siempre encendida, y que la plataforma le enviara los cambios. Eso gasta batería escuchando todo el tiempo, y si la cámara está sin conexión, el cambio puede no aplicarse. La otra era que la cámara pregunte en cada ciclo si hay cambios, y si no hay internet, pregunte en el siguiente.

Ganó la segunda, con su costo escrito: no hay configuración en tiempo real. Cuando el otro lado es poco fiable, que sea él quien pregunte evita depender de que esté disponible en el momento justo.

## El precio de lo asíncrono {#precio}

Lo asíncrono no es gratis, y los equipos lo anotan. En Sysops Squad, la cola de mensajes puede convertirse en un punto único de falla, una pieza que, si cae, arrastra a todo lo demás, así que hay que repartir su carga. Además, el flujo de los tickets se vuelve más difícil de probar y de depurar. La decisión cierra uniendo el costo con el negocio: como esas cualidades son críticas para el negocio, aceptan esos trade-offs.

ClearView anota otro costo, más cercano al usuario. Cuando las llamadas largas pasan a una cola, la pantalla tiene que estar diseñada para mostrar un fallo que llega tarde, y aparecen más casos que probar, con mensajes que llegan en distinto orden. El usuario ya no recibe el error en el momento, así que alguien tiene que decidir cómo se entera.

## Distintas garantías {#cierre}

Las conversaciones de Sysops Squad no terminaron con una sola respuesta, ni siquiera con dos. Una copia periódica entre bases, un mensaje que se manda y se olvida, una cola que guarda en disco, una llamada que espera. Cada una ofrece una garantía distinta sobre qué pasa con el mensaje.

Esa diferencia no se nota mientras todo funciona. Se nota cuando algo falla, cuando un mensaje llega dos veces o no llega.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Interacciones de la parte de clientes y sus respuestas (contratos por replicación, tarjeta por mensajería, ticket "fire and forget", encuestas, facturas por "persistent message queue"). Estado **Proposed** (se narra "propone") | Team 7: `ADR/ADR-5-extract-customer-quantum.md` l. 4, 20-28 |
| "Doing this synchronously … will nullify our efforts on scalability and availability for the customer quantum" | Team 7: `ADR/ADR-5…` l. 22 |
| Gateway síncrono: "if a customer changes something in the profile and refreshes the page, the change should be immediately reflected" | Team 7: `ADR/ADR-12-gateways.md` l. 17 |
| Reserva: preautorización antes de insertar ("fail-fast on payment issues"); disponibilidad por evento | Five Nines: `hld/core-func/car-van-rental/4_Sequence_Diagram.md` l. 42-65 |
| ~100 sistemas de RR. HH. (supuesto); "failures are expected to occur regularly"; servicio aparte; asíncrono; adaptador por sistema. Las 200.000 configuraciones no se narran | Pragmatic: `Requirements/requirements-and-assumptions.md`; `ADR/ADR-005`; `ADR/ADR-023`; `C4/C3-components-hr-integration.md` l. 12-13 |
| "All agency APIs … provide a standardized integration interface" (supuesto del enunciado, "All of these have a standard API", repetido en el README) | Data Alchemists: `requirements/original_requirements.md` l. 42; `README.md` l. 138 |
| Wildlife Watcher (CELUS) ADR-003: API siempre encendida ("the configuration can be not applied") frente a la cámara que consulta; "There is no real-time configuration" | Celus-Ceals: `3.ARDs/003.CameraUpdateStrategy.md` l. 48-50 |
| ADR-2: cola como punto único de falla; "more difficult for testing and debugging"; "Since aforementioned qualities are critical to the business we accept these trade-offs." | Team 7: `ADR/ADR-2-event-driven-broker.md` l. 26-29 |
| ADR-008: "The UI design to consider failures and failure messaging to the user more carefully"; "more cases of message ordering are possible" | Pragmatic: `ADR/ADR-008-ui-reactivity.md` l. 20-27 |
