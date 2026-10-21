# Bloque 7 · Cómo se hablan las partes

**Enseña:** síncrono si quien llama necesita la respuesta para seguir; cola o stream según cuántos tienen que leer un mensaje; quién inicia la conversación; el borde de cada parte.
**Par:** Spotlight elige un stream porque un mismo evento lo leen varios; Sysops Squad usa colas que llevan cada mensaje a un destino exacto.

## Esperar o seguir {#flecha}

**Narración**

Una vez cortado el sistema, cada flecha entre dos partes es una decisión. Hay dos maneras básicas de que una parte le hable a otra. En la síncrona, quien llama espera la respuesta antes de seguir, como en una llamada telefónica. En la asíncrona, deja el mensaje y sigue con lo suyo, como quien deja un mensaje de voz.

La pregunta que decide entre las dos es si quien llama necesita la respuesta para poder seguir. Sysops Squad lo propone así. Cuando un cliente cambia algo en su perfil y recarga la página, tiene que ver el cambio enseguida, así que esa llamada espera. Cuando abre un ticket, no tiene por qué esperar a que alguien lo tome, así que lo manda y se olvida.

**Visual**
- Imagen central: dos piezas, A y B, unidas por una flecha.
- «al decir "síncrona"» → flecha azul continua; un punto va de A a B y vuelve; mientras tanto A muestra un reloj y queda quieta.
- «al decir "asíncrona"» → flecha verde a trazos; un punto va de A a B; A se ilumina enseguida y sigue (un segundo punto sale de A hacia otro lado).
- «al decir "si quien llama necesita la respuesta"» → la pregunta, en 44 px, abajo al centro, durante 4 segundos.
- Sello: Sysops Squad (propuesta). «al decir "cambia algo en su perfil"» → persona cliente → Perfil con flecha azul y reloj; la pantalla se actualiza al volver el punto.
- «al decir "abre un ticket"» → persona cliente → Tickets con flecha verde; el cliente se aleja enseguida.
- Al final: las dos flechas, azul y verde, desde el mismo cliente.

## Un evento para muchos {#stream}

**Narración**

Cuando el mensaje es asíncrono, todavía queda elegir por dónde viaja. Spotlight dejó esa elección escrita, entre una cola de mensajes y un stream de eventos.

Una cola entrega cada mensaje una vez, a quien lo toma, y después lo borra. Un stream es un registro que guarda los eventos durante un tiempo, y cada lector lleva la cuenta de por dónde va. En Spotlight, cuando cambia la asignación de un candidato, ese mismo evento lo necesita el servicio de candidatos y también lo necesita la analítica, que lo guarda. Una cola no da eso. Eligieron el stream, y anotaron el precio, que un stream cuesta más que una cola.

**Visual**
- Sello: Spotlight.
- Imagen central: `comparar` de los dos mecanismos, misma disposición: un productor a la izquierda, el canal en el centro y lectores a la derecha.
- «al decir "Una cola entrega cada mensaje una vez"» → arriba: pieza cola; un mensaje entra, lo toma un lector y desaparece de la cola.
- «al decir "Un stream es un registro"» → abajo: pieza stream (banda con marcas); un evento entra y queda marcado en la banda.
- «al decir "cada lector lleva la cuenta de por dónde va"» → dos lectores con una flecha cada uno apuntando a posiciones distintas de la banda.
- «al decir "cambia la asignación de un candidato"» → en el stream entra el evento "asignación actualizada"; «al decir "el servicio de candidatos"» → un lector lo lee; «al decir "la analítica, que lo guarda"» → otro lector lo lee y lo copia a su cilindro.
- «al decir "Una cola no da eso"» → arriba, el mismo evento llega a la cola; lo toma candidatos y la analítica queda sin nada (un hueco gris).
- «al decir "cuesta más"» → bajo el stream, una moneda con "+"; bajo la cola, una moneda con "−".
- Al final: el stream con dos lectores, resaltado.

## Un mensaje para un destino {#cola}

**Narración**

Sysops Squad propone lo contrario para el flujo de los tickets, y por una razón igual de clara. Un ticket nuevo tiene que llegar a quien lo procesa, y a nadie más, y no se puede perder. El equipo propone colas de mensajes con entrega garantizada, de punto a punto, y escribe que no quiere publicar el ticket para que lo lea quien se suscriba.

Las facturas siguen la misma lógica. Van por una cola que las guarda en disco, para que ninguna se pierda si el sistema de notificaciones está en mantenimiento.

**Visual**
- Sello: Sysops Squad (propuesta).
- Imagen central: Tickets → cola → procesador de tickets.
- «al decir "a quien lo procesa, y a nadie más"» → un ticket recorre la cola y llega a un único destino; un candado chico en la llegada.
- «al decir "no se puede perder"» → el procesador `caer` un momento; el ticket espera en la cola (sigue visible) y entra cuando el procesador vuelve.
- «al decir "las guarda en disco"» → al lado, una segunda cola "facturas" con un ícono de disco; notificaciones en mantenimiento (gris); las facturas se acumulan en la cola y salen cuando vuelve.
- Al final: la cola de tickets con un destino.

## Cola o stream {#comparacion}

**Narración**

Spotlight eligió un canal y Sysops Squad propone el opuesto, y cada uno tiene razón. Spotlight necesitaba que un mismo evento lo leyeran varios, y que quedara guardado. Sysops Squad necesitaba que cada ticket llegara a un solo destino y no se perdiera. La pregunta que separa los dos casos es cuántos tienen que leer el mensaje y si hace falta guardarlo.

**Visual**
- Imagen central: `comparar`. Izquierda, el stream de Spotlight con dos lectores. Derecha, la cola de Sysops Squad con un destino.
- «al decir "lo leyeran varios"» → izquierda, los dos lectores laten; «al decir "a un solo destino"» → derecha, el destino único late.
- «al decir "cuántos tienen que leer el mensaje"» → abajo al centro, dos palabras clave: "¿cuántos leen?" y "¿hay que guardarlo?".
- Al final: las dos mitades con las dos preguntas.

## Quién inicia {#iniciar}

**Narración**

Hay una tercera decisión, aparte de esperar o no: quién empieza a hablar. Wildlife Watcher es un sistema de cámaras en la naturaleza, con batería y sin internet estable, que se configuran desde una plataforma.

Una opción era que la cámara tuviera una puerta siempre abierta y que la plataforma le enviara los cambios. Eso gasta batería escuchando todo el tiempo, y si la cámara está sin conexión, el cambio puede no llegar nunca. La otra era que la cámara pregunte, en cada ciclo, si hay cambios para ella, y si no hay internet, pregunte en el siguiente. Ganó la segunda, con su costo escrito, que la configuración ya no es en tiempo real. Cuando el otro lado es poco fiable, que sea él quien pregunte evita depender de que esté disponible en el momento justo.

**Visual**
- Sello: Wildlife Watcher (ícono de cámara). Ilustración breve con volumen: una cámara atada a un árbol, con una batería que baja; se reduce al sello.
- Imagen central: Plataforma a la izquierda, cámara a la derecha, una línea de conexión intermitente entre ellas.
- «al decir "la plataforma le enviara los cambios"» → la plataforma manda un punto; la conexión `cortar` justo cuando pasa; el punto se pierde. La batería de la cámara baja con una antena siempre encendida.
- «al decir "que la cámara pregunte, en cada ciclo"» → nueva escena: la cámara manda una pregunta hacia la plataforma cada cierto tiempo (latido); en un ciclo la conexión está cortada y la pregunta no sale; en el siguiente sale, y el cambio vuelve con la respuesta.
- «al decir "ya no es en tiempo real"» → un reloj entre el cambio en la plataforma y su llegada a la cámara.
- Al final: la cámara preguntando en ciclos.

## La puerta de cada parte {#borde}

**Narración**

Queda el borde de cada parte, por dónde entra lo que viene de afuera. Sysops Squad propone una puerta de entrada, un gateway, para cada una de sus partes. Las partes distintas solo se hablan a través de esas puertas, mientras que adentro de una misma parte los servicios se llaman directo.

La regla que escribe el equipo es que el gateway no tenga lógica del negocio. Se ocupa del acceso, de la seguridad y de dirigir cada pedido a donde va. El precio está anotado. Hay más piezas que construir y mantener, y cada gateway tiene que poder duplicarse para no ser el punto que, si cae, deja a todos sin entrada.

**Visual**
- Imagen central: las cuatro fronteras de Sysops Squad del bloque 5.
- «al decir "una puerta de entrada, un gateway"» → en el borde de cada frontera aparece un gateway (violeta, angosto).
- «al decir "solo se hablan a través de esas puertas"» → una flecha entre clientes y facturación pasa por los dos gateways.
- «al decir "adentro de una misma parte"» → dentro de clientes, dos servicios unidos por una flecha directa.
- «al decir "no tenga lógica del negocio"» → `enfocar` un gateway; adentro aparecen tres íconos chicos: llave (acceso), escudo (seguridad), flecha que se bifurca (dirigir). Un ícono de regla de negocio intenta entrar y rebota.
- «al decir "tiene que poder duplicarse"» → el gateway de clientes aparece duplicado; uno `caer`, el otro sigue.
- Al final: las cuatro fronteras con sus gateways.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Sysops Squad (Proposed): gateway síncrono, "if a customer changes something in the profile and refreshes the page, the change should be immediately reflected"; ticket "fire and forget" | `Team-7/ADR/ADR-12-gateways.md` l. 17; `ADR/ADR-5-extract-customer-quantum.md` l. 20-28 |
| Spotlight ADR-010 (Accepted): cola frente a stream (entrega una vez frente a cada consumidor con su offset; sin retención frente a retención); decisión stream; ejemplo del evento de asignación que lee el servicio de candidatos y se guarda para analítica; "Streams are costly compared to queues" | `Pegasuz/ADRs/010.adr-queue-stream.md` l. 14-30 |
| Sysops Squad ADR-2 (Proposed): "Use message queues with guaranteed delivery for ticket workflow"; "guarantee message delivery to the exact destination so this peer-to-peer queue-based messaging, not a topic-based publisher-subscriber" | `Team-7/ADR/ADR-2-event-driven-broker.md` l. 2, 21 |
| Facturas por cola persistente, por si notificaciones está caído | `Team-7/ADR/ADR-5-extract-customer-quantum.md` l. 28 |
| Wildlife Watcher ADR-003 (Accepted): API siempre encendida frente a la cámara que consulta; "There is no real-time configuration" | `Celus-Ceals/3.ARDs/003.CameraUpdateStrategy.md` l. 48-50 |
| Sysops Squad ADR-12 (Proposed): un gateway por cada quantum de dominio; sin lógica de dominio; acceso, seguridad, ruteo; servicios de dominios distintos solo a través de gateways, dentro del quantum directo; costo: más servicios, evitar cuellos de botella y punto único de falla, costo de desarrollo y mantenimiento | `Team-7/ADR/ADR-12-gateways.md` l. 11-25 |
