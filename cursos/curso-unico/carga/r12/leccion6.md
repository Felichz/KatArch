# Lección 6 · Cómo se hablan las partes: carga y fricción

Total: 37 ideas. Duración: 5:25.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Sysops Squad: un monolito viejo que pierde tickets y se cae seguido | 1 | 1 | Sysops Squad | Repite casi literal la presentación de L4 (l. 5); ningún elemento nuevo. Es caso nuevo solo por la regla de la lección |
| 2 | 0:11 | Esa parte de clientes tiene que seguir hablando con las demás; cada vez que dos partes se hablan hay una conversación | 3 | 2 | — | "Conversación" es término nuevo, combinado con la separación de clientes que viene de L4 |
| 3 | 0:22 | Síncrona: quien llama se queda esperando la respuesta. Asíncrona: deja el mensaje y sigue | 4 | 2 | — | Dos términos nuevos (síncrona, asíncrona), combinados con "conversación" |
| 4 | 0:36 | La tarjeta de crédito es una de esas conversaciones; sus datos pasan a facturación, la parte que cobra | 1 | 2 | — | Aplica la definición; tarjeta y facturación ya vienen de L4 |
| 5 | 0:43 | El equipo escribe que hacerlo síncrono anularía su esfuerzo: atender a más clientes y estar siempre disponible | 3 | 2 | — | Argumento nuevo sobre lo síncrono, combinado con la definición de la idea 3 |
| 6 | 0:51 | (pregunta) Eso nos lleva a una idea general: cada conexión entre partes es una decisión, y en un diagrama se dibuja como flecha | 4 | 3 | — | "Decisión" por conexión y "flecha" son dos elementos nuevos combinados con la conversación; sube de caso a regla general, anunciado |
| 7 | 1:00 | La tarjeta que va a facturación es una flecha. Dos cosas ayudan a decidir cada flecha: la pregunta que viene ahora y los sistemas de otros, que vienen después | 4 | 2 | — | Dos factores nuevos, combinados con la flecha de la idea 6 |
| 8 | 1:13 | (flecha) Empecemos por la pregunta: si quien llama necesita la respuesta para seguir, espera | 3 | 2 | — | Criterio nuevo, combinado con la síncrona de la idea 3 |
| 9 | 1:21 | Si no, deja el mensaje en una cola, un buzón del que el otro lado retira el mensaje. Quien llama no depende de que le contesten | 3 | 2 | — | "Cola" es término nuevo; es la rama contraria del criterio |
| 10 | 1:31 | Sysops Squad responde la pregunta en algunas conversaciones; según la propuesta, la tarjeta va por mensajes asíncronos, y así se evita anular el esfuerzo | 3 | 2 | — | Primera aplicación de la pregunta; "algunas" queda sin explicar qué usan las demás |
| 11 | 1:42 | Falta otra flecha de esa parte: la pantalla es la aplicación con la que el cliente usa el sistema; sus llamadas son síncronas | 3 | 3 | — | "Pantalla" es elemento nuevo; "falta otra flecha" anuncia un componente nuevo |
| 12 | 1:52 | Un cliente cambia su perfil y recarga la página; el cambio tiene que verse enseguida, así que la llamada espera | 4 | 2 | — | Ejemplo nuevo (perfil, recarga) más el paso "verse enseguida implica esperar", combinado con la pregunta |
| 13 | 1:57 | O sea, la misma parte usa mensajes que no esperan y una llamada que espera | 3 | 2 | — | Conclusión nueva (una misma parte con los dos modos), combinada con 11 y 12 |
| 14 | 2:05 | (reserva) Ahora, la misma pregunta en otro caso: MobilityCorp es una empresa que alquila vehículos eléctricos | 2 | 3 | MobilityCorp | Caso nuevo en el curso (primera mención); cambio de caso anunciado |
| 15 | 2:11 | Al reservar, lo primero es una preautorización: una retención del monto en la tarjeta, sin cobrarlo todavía; el dinero se aparta, pero no se cobra | 3 | 2 | — | "Preautorización" y "retención", dos términos nuevos |
| 16 | 2:22 | Un servicio de reservas pide la preautorización a un servicio de pagos, y espera la respuesta | 4 | 2 | — | Dos servicios nuevos, combinados con la regla de espera |
| 17 | 2:27 | Sin pago aprobado no tiene sentido guardar nada; esa flecha espera, como las llamadas de la pantalla | 3 | 2 | — | Paso nuevo (el pago decide si se guarda), combinado con la pantalla |
| 18 | 2:34 | Con el pago aprobado, el servicio guarda la reserva y después publica un evento, un aviso; el evento se manda y no se espera | 2 | 2 | — | "Evento" ya visto en L2 y L5 (se recuerda); lo nuevo es el orden guardar y luego publicar |
| 19 | 2:46 | Lo recibe la gestión de flota; según su decisión, es la fuente del estado de los vehículos | 4 | 3 | — | Nombre nuevo y "fuente del estado" sin presentar ("su decisión" remite a un documento no nombrado), combinados con el evento |
| 20 | 2:52 | Cuando le llega, actualiza qué autos ven libres los demás clientes; eso puede tardar porque no es crítico | 3 | 2 | — | Lista de autos libres es elemento nuevo; "no es crítico" aplica el criterio de L5 a este caso |
| 21 | 3:02 | En el diagrama, el cliente recibe la confirmación, con el código para desbloquear el auto, antes de que el evento llegue a la flota | 4 | 3 | — | Confirmación, código y orden nuevos; "en el diagrama" cambia de medio |
| 22 | 3:02 | O sea, ya tiene su reserva aunque la lista de autos libres siga atrasada | 3 | 2 | — | Deducción nueva, combinada con la confirmación y la lista atrasada |
| 23 | 3:16 | En la misma reserva, una flecha espera y la otra no; la que espera protege el pago | 3 | 2 | — | "Protege el pago" es la razón nueva, combinada con ambas flechas |
| 24 | 3:22 | (precio) Falta el precio de lo asíncrono, y para eso volvemos a Sysops Squad | 2 | 3 | — | Tema nuevo (costo de lo asíncrono); vuelta al caso con puente explícito |
| 25 | 3:26 | La cola puede convertirse en un punto único de falla: si se cae, se detiene todo lo que pasa por ella; por eso su carga se reparte entre copias | 4 | 2 | — | "Punto único de falla" y el reparto entre copias, combinados con la cola |
| 26 | 3:37 | La propuesta pide garantizar la entrega de cada ticket; o sea, la cola no puede perder mensajes | 3 | 2 | — | "Entrega garantizada" es término nuevo, aplicado a la cola |
| 27 | 3:44 | Aun así, la propuesta acepta el costo: el tiempo de respuesta bajo, la disponibilidad y la capacidad de crecer son críticos | 3 | 2 | — | Decisión de aceptar el costo, combinada con las cualidades de L2 y L3 |
| 28 | 3:52 | O sea, lo asíncrono no sale gratis: la cola resuelve un problema y trae otro, y el costo se paga a cambio | 3 | 2 | — | Principio nuevo, combinado con la cola y las cualidades; "se paga a cambio" es vago |
| 29 | 3:59 | Aplicado a la tarjeta, se gana esa capacidad y esa disponibilidad, y se paga con un flujo de tickets más difícil de probar y de depurar | 4 | 2 | — | "Depurar" es nuevo; el costo que se nombra es el de los tickets, aplicado a la tarjeta sin aclararlo |
| 30 | 4:09 | Eso lo deducimos nosotros, porque la propuesta lo escribe para los tickets | 3 | 2 | — | Admite que el costo de la tarjeta es inferencia; combina con la idea 29 |
| 31 | 4:14 | (externos) Falta ver los sistemas de otros; para eso, un último caso: ClearView, una plataforma sin fines de lucro que empareja currículums anonimizados con puestos | 1 | 3 | ClearView | Caso recurrente, con el descriptor de L5 (l. 5); el cambio de caso se anuncia |
| 32 | 4:26 | Cuando un empleador desbloquea el currículum completo, ClearView lo envía al sistema de recursos humanos de ese empleador; cada empleador usa el suyo | 5 | 2 | — | Desbloqueo, sistema de RR. HH. del empleador y la diferencia entre empleadores, combinados con los sistemas de otros (idea 7) |
| 33 | 4:37 | Se esperan miles de configuraciones, con un tope previsto de doscientas mil; con tantas, las fallas ocurren con regularidad, por eso es asíncrono | 5 | 2 | — | "Configuraciones", dos cifras y la regla de fallas, combinados con la decisión asíncrona |
| 34 | 4:49 | Hay un adaptador por cada tipo de sistema; un adaptador traduce entre el formato de ese sistema y el de ClearView | 4 | 2 | — | "Adaptador" es término nuevo; "tipo de sistema" se distingue de "configuración", combinado con la idea 33 |
| 35 | 4:58 | (cierre) La tarjeta va por mensajes asíncronos; el perfil que se recarga en la pantalla sigue esperando una respuesta | 1 | 3 | — | Recuerda dos casos ya vistos; vuelve a la tarjeta después de ClearView, con referencia al inicio pero sin puente |
| 36 | 5:07 | Eso cambia cómo se ve el problema: ya no se elige una vez entre síncrono y asíncrono; se le hace la pregunta a cada flecha | 2 | 2 | — | Tesis reformulada; un paso nuevo ("no se elige una vez") |
| 37 | 5:15 | Cada respuesta trae su garantía, es decir, lo que se puede esperar que le pase al mensaje si algo falla; en los tickets, la propuesta pide garantizar la entrega | 3 | 2 | — | "Garantía" es término nuevo, presentado en el último minuto; combinado con la entrega garantizada de la idea 26 |

Método: escala del brief tal como está (0 elementos nuevos da 1; cada elemento nuevo suma 1; combinar con algo anterior suma 1; tope 5). Cuentan como recordados los elementos de L1 a L5 que el guion repite: Sysops Squad, ClearView, tarjeta, facturación, mensajes, evento, costo, escalabilidad, disponibilidad, testabilidad, crítico y consistencia eventual. La fórmula escrita en el brief daría un punto menos en cada fila; usé la tabla.

## Lo que muestran los puntajes

1. **Externos, carga sostenida.** Las ideas 32, 33 y 34 tienen carga 5, 5 y 4 seguidas (de 4:26 a 4:57, casi 30 s con carga 4 o más). La 33 mete configuraciones, dos cifras y una regla de fallas en una sola frase.
2. **Carga 4 con fricción 3.** Ideas 6, 19 y 21. La 6 (0:51) pasa de un caso a una regla general con dos conceptos nuevos. La 19 (2:46) usa "fuente del estado" sin presentarla. La 21 (3:02) junta confirmación, código y orden en el diagrama, y cambia de medio.
3. **Carga 3 o más con fricción 3 o más.** Ideas 6, 11, 19 y 21. La 11 (1:42) introduce la pantalla tras "falta otra flecha", cuando ya hay tres criterios en juego.
4. **Pares seguidos con carga 4 o más.** 6 y 7 (4 y 4, de 0:51 a 1:08); 32 y 33 (5 y 5); 33 y 34 (5 y 4). **Casos nuevos a menos de dos minutos: ninguno.** Sysops Squad (0:01) y MobilityCorp (2:05) quedan a 2:04; MobilityCorp y ClearView (4:14) a 2:09.
5. **Estructura.** (a) La idea 29 pone el costo de los tickets sobre la tarjeta, y la 30 lo admite como deducción diez segundos después; el espectador tiene que reconstruir el paso solo. (b) "Garantía" (37) aparece solo en el último minuto, y es el tema de L7 (qué pasa si el mensaje llega dos veces), que L6 no desarrolla. (c) "En algunas conversaciones" (10) no dice qué usan las demás; la fuente dice replicación por tabla (ADR-5 l. 20). (d) La idea 1 repite casi igual la presentación de Sysops de L4 (l. 5): diez segundos de recordatorio. La regla de "caso nuevo" marca a Sysops y a ClearView aunque no traen elementos nuevos.

## Errores de hecho y contradicciones

Ninguno entre lecciones. Sysops Squad (L4, L5, L8), ClearView (L2, L5, L10, L11) y MobilityCorp (L9 a L11) se describen de forma coherente con esta lección.

Verificado en la fuente, sin error:
- ADR-5 l. 22 (`Team-7-src\ADR\ADR-5-extract-customer-quantum.md`): "Doing this synchronously ... will nullify our efforts on scalability and availability for the customer quantum" (idea 5).
- `Five-Nines-src\hld\core-func\car-van-rental\4_Sequence_Diagram.md` l. 54-60: la confirmación con el QR (l. 54-56) va antes de `ReservationCreated` hacia Fleet (l. 59) (ideas 21 y 22).
- `Pragmatic-src\Requirements\requirements-and-assumptions.md` l. 77: "in the thousands, up to 200'000" (idea 33).
- `Pragmatic-src\C4\C3-components-hr-integration.md` l. 13: "For each HR system (e.g., SAP SuccessFactors, Workday), a dedicated adapter", y A29 (l. 109): "around 100 different HR systems". La narración, "por tipo de sistema", es correcta (idea 34).

Tensión dentro de la fuente, no error del guion: `Five-Nines-src\hld\core-func\car-van-rental\4_Sequence_Diagram.md` l. 48 hace `UPDATE vehicle SET status='reserved'` dentro de la transacción de la reserva, mientras `adrs\ADR-0007` l. 15 dice "Use Fleet Service as the single source of truth for all vehicle state" y l. 65 del diagrama dice "Vehicle availability update via event". La idea 19 sigue la decisión y el evento, como dice la tabla de verificación; la lección no menciona el UPDATE directo.

## Qué cambiaría

1. **Partir la idea 33** en dos: "se esperan miles de configuraciones, con un tope previsto de doscientas mil" (carga 3) y "con tantas, las fallas ocurren con regularidad; por eso es asíncrono" (carga 3). Así no quedan tres ideas seguidas con carga 4 o más.
2. **Quitar "es la fuente del estado de los vehículos"** de la idea 19 (carga 4 a 3) y **"con el código para desbloquear el auto"** de la 21 (carga 4 a 3). El mecanismo (la flota recibe el evento y actualiza) sostiene la lección sin esos rótulos.
3. **Invertir el orden de las ideas 29 y 30**: primero "eso lo deducimos nosotros: la propuesta escribe el costo para los tickets", y después "aplicado a la tarjeta, ...". Así la tarjeta no lleva un costo que no le corresponde sin aclarar.
4. **Cerrar sin "garantía"** (37): "cada respuesta trae lo que se puede esperar que le pase al mensaje si algo falla; en los tickets, la propuesta pide garantizar la entrega" (carga 3 a 2). El término se queda para L7, donde se desarrolla.
