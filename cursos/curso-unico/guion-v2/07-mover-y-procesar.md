# Bloque 7 · Mover y procesar

**Enseña:** cuando una parte le pasa algo a otra, se decide si quien manda espera la respuesta, por dónde viaja el mensaje (cola o stream) y cuándo se procesa (en el momento o por lotes); cuatro familias con lo que gana y paga cada una.
**Par:** Spotlight elige un stream porque un mismo evento lo leen varios y queda guardado; Sysops Squad propone colas que llevan cada ticket a un solo destino. Lotes: Sysops Squad propone asignar tickets con un trabajo que corre por calendario.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** Sysops Squad y sus cuatro partes; Spotlight; "por eventos" (las partes se avisan con mensajes). **Presenta:** llamada que espera, cola, stream, lotes por calendario.

## Esperar o seguir {#gancho}

**Narración**

Un cliente de Sysops Squad, el soporte técnico de la empresa de electrónica, hace dos cosas seguidas. Primero cambia su dirección en el perfil y recarga la página. Después abre un ticket porque se le rompió la lavadora.

El equipo propone tratar esas dos acciones de forma distinta. El cambio de perfil tiene que verse enseguida, así que esa llamada espera la respuesta antes de seguir. El ticket no, porque el cliente no tiene por qué quedarse mirando hasta que alguien lo tome. Se manda y se sigue, lo que el equipo llama disparar y olvidar.

**Visual**
- Estás aquí: la región "mover y procesar".
- Sello: Sysops Squad (propuesta). Un cliente con dos flechas: al perfil, azul y con reloj (espera); a tickets, verde a trazos (sigue).

## Cuatro familias {#familias}

**Narración**

Cada vez que una parte le pasa algo a otra hay tres preguntas. Si quien manda tiene que esperar, por dónde viaja el mensaje y cuándo se procesa. Las respuestas forman cuatro familias.

La llamada que espera da la respuesta en el momento. Paga con que, si el otro lado está lento o caído, quien llama también se queda esperando.

La cola guarda cada mensaje hasta que lo toma su destino, uno solo, y lo borra cuando lo procesa. Gana con que el mensaje no se pierde aunque el destino esté caído un rato. Paga con que no hay respuesta inmediata, y con que lo lee uno solo.

El stream es un registro que guarda los eventos durante un tiempo, y cada lector lleva la cuenta de por dónde va. Gana con que un mismo evento lo pueden leer varios, cada uno a su ritmo. Paga con que cuesta más que una cola.

Y los lotes no procesan cada mensaje cuando llega. Un trabajo corre por calendario, toma todo lo pendiente y lo procesa junto. Gana con que puede ordenar y repetir. Paga con que el resultado llega más tarde.

**Visual**
- El tramo del mapa: "mover y procesar" en naranja y sus cuatro tarjetas, cada una con lo que gana y lo que paga.

## Un evento para muchos {#stream}

**Narración**

Spotlight, la plataforma de empleo para personas subrepresentadas, eligió entre la cola y el stream con una tabla escrita. Cuando cambia la asignación de un candidato a una organización, ese mismo evento lo necesita el servicio de candidatos, y también hay que guardarlo para la analítica. Una cola se lo daría a uno solo y lo borraría. Por eso eligió el stream, y anotó el precio, que cuesta más que una cola.

**Visual**
- Sello: Spotlight. Productor, canal, lectores. Arriba la cola, abajo el stream, con la misma disposición: el evento llega a uno solo en la cola; en el stream lo leen dos, y uno lo guarda.

## Un mensaje para un destino {#cola}

**Narración**

Sysops Squad propone lo contrario para los tickets, y por una razón igual de clara. Un ticket nuevo tiene que llegar a quien lo procesa, a nadie más, y no se puede perder. El equipo propone colas con entrega garantizada, de punto a punto, y escribe que no quiere publicar el ticket para que lo lea quien se suscriba.

Las facturas siguen la misma lógica. Viajan por una cola que las guarda, para que ninguna se pierda si el sistema de avisos está en mantenimiento.

**Visual**
- Sello: Sysops Squad (propuesta). Tickets → cola → un solo destino; el destino cae un momento y el ticket espera en la cola. Al lado, la cola de facturas.

## Varios o uno {#par}

**Narración**

Spotlight eligió un canal y Sysops Squad propone el otro, y cada uno tiene su razón. Spotlight necesitaba que un mismo evento lo leyeran varios y que quedara guardado. Sysops Squad necesitaba que cada ticket llegara a un solo destino y no se perdiera. Lo que separa los dos casos es cuántos tienen que leer el mensaje.

**Visual**
- Las dos mitades lado a lado: el stream con dos lectores; la cola con un destino.

## Todo junto, a su hora {#lotes}

**Narración**

Queda la última pregunta, cuándo se procesa. Sysops Squad tenía un problema con la asignación de tickets. A veces llegaba el técnico equivocado, y a veces un ticket nunca se asignaba.

El equipo propone sacar la asignación a un trabajo que corre por calendario, por ejemplo cada hora. Procesar los tickets de a uno, a medida que llegan, no permite atender primero a los urgentes. En cambio, un trabajo que toma todos los pendientes juntos puede ordenarlos por prioridad. Y si algo sale mal, se vuelve a correr. Ese trabajo tiene su costo, y el equipo lo nombra. Si el trabajo no arranca, por un error de configuración, nadie se entera, así que hay que vigilarlo.

El cobro mensual sigue la misma idea. Es algo que pasa una vez por mes, y el equipo propone que lo haga un trabajo programado, que se puede volver a correr si falla.

**Visual**
- Sello: Sysops Squad (propuesta). Tickets que llegan de a uno; un reloj que da la hora; el trabajo los toma todos y los ordena por prioridad; una ✕ y el trabajo se vuelve a correr. Abajo, un calendario con el cobro mensual.

## La pregunta que decide {#pregunta}

**Narración**

Lo que decide en esta región tiene cuatro partes, y cada una ya apareció. Si hay que esperar la respuesta. Cuántos tienen que leer el mensaje. Si hay que guardarlo. Y si tiene que procesarse ya o puede esperar a su hora.

**Visual**
- El tramo del mapa con sus cuatro familias, y las cuatro preguntas, una por tarjeta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Sysops Squad (ADR-12, Proposed): "if a customer changes something in the profile and refreshes the page, the change should be immediately reflected" (síncrono) | `Team-7/ADR/ADR-12-gateways.md` l. 17 |
| ADR-5 (Proposed): el ticket, "simple fire and forget message"; facturas por "persistent message queue… if the Notification system is down (for maintenance, for example)" | `Team-7/ADR/ADR-5-extract-customer-quantum.md` l. 24, 28 |
| ADR-2 (Proposed): "Use message queues with guaranteed delivery for ticket workflow"; "peer-to-peer queue-based messaging, not a topic-based publisher-subscriber" | `Team-7/ADR/ADR-2-event-driven-broker.md` l. 2, 21 |
| Spotlight ADR-010 (Accepted): cola frente a stream en una tabla (entrega una vez frente a un offset por consumidor; sin retención frente a retención; costo bajo frente a alto); el evento `candidate_assignment_updated` lo lee el servicio de candidatos y se guarda para analítica; "Streams are costly compared to queues" | `Pegasuz/ADRs/010.adr-queue-stream.md` |
| ADR-3 (Proposed): problemas de asignación (técnico equivocado, tickets que nunca se asignan); trabajo por lotes "hourly for example, or even once a day"; prioridades imposibles de a un ticket; "no problem to re-run the job"; riesgo: "the job will not start due to a configuration issue or a bug, thus it will require additional monitoring" | `Team-7/ADR/ADR-3-search-expert.md` |
| Cobro mensual por un trabajo programado que se puede volver a correr (el archivo `ADR-11` se titula "ADR-10: Extract payment processing…", Proposed) | `Team-7/ADR/ADR-11-extract-payment-job.md` |
| "Se le rompió la lavadora" (un electrodoméstico de una empresa de electrónica) | Ilustración del curso |
| Las cuatro familias con lo que gana y paga cada una | Conocimiento general; la cola y el stream, además, en `Pegasuz/ADRs/010` |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El plan lista cinco familias (con la conexión abierta); con cuatro por región, la conexión abierta queda para el atlas | Cuatro: llamada que espera, cola, stream, lotes |
| 1 | Diseño del aprendizaje | El borde de cada parte y "quién inicia" estaban en el bloque viejo; ahora tienen su bloque (9) | Salen de aquí y pasan al 9 |
| 2 | Arquitecto senior | "Disparar y olvidar" es el término que el espectador va a encontrar ("fire and forget") | Se nombra en el gancho |
| 3 | Verificador | El cobro mensual está en el archivo `ADR-11-extract-payment-job.md`, titulado "ADR-10" adentro | Se narra sin número; la tabla lo anota |
| 4 | Guionista | Sin "no X, sino Y"; frases partidas | Sin cambios |
| 5 | Espectador de prueba | "Offset" no se usa: "cada lector lleva la cuenta de por dónde va" | Sin cambios |
| 6 | Dirección visual | Cada escena tiene imagen desde su primera palabra | El detalle en `video/b07/IDEAL.md` |
| 7 | Producción | Ids: `gancho`, `familias`, `stream`, `cola`, `par`, `lotes`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | "Lavarropas" es regional: en español neutro, "lavadora" | Se cambia |
