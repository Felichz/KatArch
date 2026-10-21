39 ideas, duración 6:13.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Sysops Squad es el servicio de soporte de una empresa de electrónica; su sistema de tickets es un monolito viejo que pierde tickets | 1 | 1 | Sysops Squad | Nombre, monolito y tickets ya dados en L2, L4 y L5 (la apertura repite la de L5); primera idea, sin salto |
| 2 | 0:11 | Su equipo propone separar la parte de clientes, y esa parte tiene que seguir hablando con las demás | 2 | 1 | — | Un elemento nuevo: la premisa de que al cortar, las partes deben hablarse; la parte de clientes viene de L4 |
| 3 | 0:18 | O sea, cada vez que dos partes se hablan hay una conversación | 2 | 2 | — | "Conversación" como nombre de toda conexión entre partes (término nuevo); conector "O sea" |
| 4 | 0:22 | Las conversaciones pueden ser síncronas: quien llama se queda esperando la respuesta | 2 | 2 | — | "Síncrona" (término nuevo); la espera ya se conoce de L4 |
| 5 | 0:29 | También pueden ser asíncronas: quien llama deja el mensaje y sigue con lo suyo | 3 | 1 | — | "Asíncrona" (nuevo) comparada con síncrona (combinación); "mensaje" viene de L4 |
| 6 | 0:34 | La tarjeta de crédito es una de esas conversaciones; sus datos pasan a la facturación | 1 | 1 | — | Tarjeta y facturación vienen de L4; solo se aplica la definición de conversación |
| 7 | 0:41 | Hacerlo de forma síncrona anularía el esfuerzo de la parte de clientes, que era atender a más clientes y estar siempre disponible | 1 | 1 | — | La frase del equipo es la de L4; escalabilidad y disponibilidad vienen de L2; todo es recuerdo |
| 8 | 0:54 | (pregunta) Eso nos lleva a una idea más general | 1 | 3 | — | Sin contenido nuevo; el salto del caso a un principio se anuncia, pero cambia el nivel de abstracción |
| 9 | 0:56 | La tarjeta muestra que cada conexión entre partes es una decisión; en un diagrama, esa conexión es una flecha | 4 | 2 | — | Dos elementos nuevos (el principio "cada conexión es una decisión" y la flecha como símbolo) combinados con la tarjeta de la idea 6 |
| 10 | 1:03 | La tarjeta que va a facturación es una flecha. Dos cosas ayudan a tomarla: la pregunta de cada flecha y qué hacer cuando del otro lado hay sistemas de otros (1:09) | 4 | 2 | — | "La pregunta" y "sistemas de otros" son dos elementos nuevos, anunciados sin explicar, combinados con la flecha |
| 11 | 1:17 | (flecha) La pregunta: quien llama necesita la respuesta para seguir | 3 | 2 | — | El criterio es nuevo y se combina con síncrona y asíncrona; "Empecemos por" es conector |
| 12 | 1:23 | Si la necesita, espera, como en una llamada telefónica; si no, deja el mensaje en una cola | 4 | 1 | — | Dos elementos nuevos: la analogía de la llamada y el término "cola", combinados con espera y asíncrona |
| 13 | 1:29 | Una cola funciona como un buzón del que el otro lado retira el mensaje cuando puede | 4 | 1 | — | "Buzón" (metáfora nueva) y la regla de retirar cuando puede (paso nuevo), combinados con la cola de la idea 12 |
| 14 | 1:34 | Sysops Squad usa esa pregunta en algunas de sus conversaciones; otras, como los contratos, se resuelven copiando una tabla de una base a otra | 4 | 3 | — | Contratos y copia por tabla son dos elementos nuevos, sin presentar el mecanismo, combinados con la pregunta; cambio de hilo sin puente |
| 15 | 1:43 | Sus decisiones figuran como propuestas, no como algo ya construido | 2 | 2 | — | "Propuesta" como estado de una decisión (un elemento nuevo); es un matiz sobre el caso |
| 16 | 1:47 | La tarjeta, por ejemplo, va por mensajes asíncronos, así se evita anular el esfuerzo de aquella frase | 1 | 2 | — | Solo recuerdo; vuelve a la tarjeta con "por ejemplo", que hace de puente |
| 17 | 1:54 | (pantalla) Las llamadas que entran desde la pantalla son síncronas: si un cliente cambia su perfil y recarga la página, el cambio tiene que verse enseguida | 4 | 2 | — | "Llamadas desde la pantalla" como categoría nueva y la exigencia de verse enseguida, combinadas con la tarjeta asíncrona |
| 18 | 2:13 | (reserva) Ahora, otro caso: MobilityCorp es una empresa que alquila vehículos eléctricos | 3 | 3 | MobilityCorp | Nombre nuevo más el rubro (dos elementos); cambio de caso anunciado |
| 19 | 2:18 | Al reservar, lo primero es una preautorización: una retención del monto en la tarjeta, sin cobrarlo todavía; el dinero se aparta, pero no se cobra | 4 | 2 | — | "Preautorización" y "retención" son dos elementos nuevos, combinados con la tarjeta y el cobro de la idea 6 |
| 20 | 2:30 | En la reserva intervienen dos servicios, el de reservas y el de pagos, y el de reservas le pide la preautorización al de pagos | 4 | 2 | — | "Servicio de reservas" y "servicio de pagos" son dos elementos nuevos, combinados con la preautorización de la idea 19 |
| 21 | 2:37 | Esa flecha espera, porque sin pago aprobado no tiene sentido guardar nada; como las llamadas de la pantalla | 3 | 2 | — | La razón de la espera es un paso nuevo, combinado con la llamada de pantalla de la idea 17 |
| 22 | 2:47 | Con el pago aprobado, el servicio guarda la reserva; en ese guardado, la preautorización queda solo como una referencia | 4 | 2 | — | Dos pasos nuevos (guardar con pago aprobado; la preautorización como referencia), combinados con la preautorización de la idea 19 |
| 23 | 2:54 | Después publica un evento, un aviso de que la reserva existe, que se manda y no se espera; lo recibe la gestión de flota, que actualiza la disponibilidad que ven los clientes | 4 | 2 | — | "Gestión de flota" (servicio nuevo) y la actualización de disponibilidad (paso nuevo; aquí "disponibilidad" es de autos y no la cualidad de L2), combinados con el "no se espera" de la tarjeta |
| 24 | 3:13 | Esa actualización puede tardar unos instantes, porque no es crítica; en la misma reserva, una flecha espera y la otra no, y la que espera protege el pago | 3 | 2 | — | Un paso nuevo ("la que espera protege el pago") combinado con las dos flechas de la misma reserva; "eventual" y "crítica" vienen de L5 |
| 25 | 3:31 | (precio) Falta el precio de lo asíncrono, y para eso volvemos a Sysops Squad | 2 | 3 | — | "Precio de lo asíncrono" como concepto nuevo; vuelta de caso con puente explícito ("volvemos a") |
| 26 | 3:35 | La cola puede convertirse en un punto único de falla: si se cae, se detiene todo lo que pasa por ella; por eso su carga se reparte entre varias copias (3:43) | 4 | 2 | — | "Punto único de falla" (término) y el reparto entre copias (mecanismo), combinados con la cola de la idea 12 |
| 27 | 3:46 | La propuesta acepta ese costo, porque el tiempo de respuesta, la disponibilidad y la capacidad de crecer son críticos: el costo se paga a cambio de esas tres cosas, y la cola resuelve un problema y trae otro | 1 | 2 | — | Sin término nuevo: aplica el trade-off de L1 y las cualidades de L2. La palabra "trade-off" no reaparece, así que el espectador hace la conexión solo |
| 28 | 4:02 | Aplicado a la tarjeta, se gana capacidad de crecer y disponibilidad; se paga la complejidad: un flujo de tickets más difícil de probar y de depurar, lo que deducimos nosotros (4:08) | 4 | 2 | — | "Probar y depurar" como costo nuevo y el traslado a la tarjeta de una cuenta escrita para tickets (paso nuevo), combinados con el balance de la idea 27 |
| 29 | 4:20 | (externos) Falta ver los sistemas de otros. Para eso, un último caso: ClearView es la plataforma de una organización sin fines de lucro que empareja currículums anonimizados con puestos | 1 | 3 | ClearView | Descripción ya dada en L2 y L5 (casi textual); cambio de hilo anunciado |
| 30 | 4:32 | Un empleador puede desbloquear el currículum completo de un candidato; entonces ClearView lo envía al sistema de recursos humanos de ese empleador, es decir, cada currículum va al sistema que usa ese empleador (4:41) | 4 | 2 | — | "Desbloquear el currículum" (mecanismo) y el "sistema de recursos humanos del empleador" (término nuevo), combinados con ClearView |
| 31 | 4:46 | Cada empleador configura el suyo; según los supuestos del equipo, pueden ser miles, con un techo de doscientas mil configuraciones | 4 | 2 | — | Tres elementos nuevos sin combinar: "configuración por empleador", "miles" y "200.000" (cifras del mismo requisito, que cuentan cada una) |
| 32 | 4:54 | Con tantas, se espera que las fallas ocurran con regularidad; por eso el envío es asíncrono: un sistema caído no puede bloquear los procesos propios | 4 | 2 | — | Dos pasos nuevos (fallas regulares por escala; el sistema caído no bloquea), combinados con las "miles" de la idea 31 |
| 33 | 5:05 | Como los sistemas son distintos, hay un adaptador por cada tipo de sistema: una pieza que traduce entre su formato y el de ClearView | 4 | 2 | — | "Adaptador" (término) y la regla "uno por tipo" (nueva), combinados con la diferencia entre configuración y tipo de la idea 31 |
| 34 | 5:15 | Así el resto del sistema no tiene que conocer todos esos formatos; que los sistemas sean distintos es un supuesto, y el equipo lo dejó por escrito: calcula unos cien tipos | 4 | 2 | — | Dos elementos nuevos (el principio de no conocer formatos y "unos cien tipos"), combinados con las cifras de las ideas 31 y 33. "Calcula" sugiere un cálculo y es un supuesto |
| 35 | 5:26 | Este envío también tiene su precio: según el equipo, la pantalla tiene que pensar con más cuidado cómo avisar los fallos; el usuario ya no recibe un error en el momento, y alguien tiene que decidir cómo se entera, lo que deducimos nosotros (5:34) | 4 | 2 | — | Dos pasos nuevos (la pantalla avisa fallos; alguien decide cómo se entera), combinados con el envío asíncrono de la idea 32 |
| 36 | 5:43 | (cierre) La tarjeta con la que empezó la lección va por mensajes asíncronos; el perfil que se recarga en la pantalla sigue esperando una respuesta | 1 | 3 | — | Todo es recuerdo; vuelve a Sysops desde ClearView, con puente explícito ("con la que empezó la lección") |
| 37 | 5:52 | Eso cambia cómo se ve el problema: ya no se elige una vez, para todo el sistema, entre lo síncrono y lo asíncrono; se le hace la pregunta a cada flecha (5:59) | 3 | 2 | — | Una conclusión nueva (la decisión es por flecha) combinada con síncrono, asíncrono y la pregunta |
| 38 | 6:02 | Cada respuesta trae algo más, y ese algo tiene un nombre: garantía. Es lo que se puede esperar que le pase al mensaje si algo falla | 5 | 2 | — | Tres elementos nuevos (el término "garantía", la idea de que cada respuesta trae algo más, la definición ligada a fallos) más la combinación con la pregunta. Sin ejemplo |
| 39 | 6:10 | Esa diferencia no se nota mientras todo funciona | 1 | 1 | — | Cierre sin elementos nuevos |

## Lo que muestran los puntajes

1. **Carga alta con salto alto (la única idea de carga 4 o más y fricción 3 o más es la 14; la única de fricción 3 o más y carga 3 o más, además de la 14, es la 18).** La idea 14 mete contratos y la copia de una tabla de una base a otra en medio del argumento de la pregunta, sin presentar el mecanismo. La idea 18 abre MobilityCorp con su nombre, su rubro y el cambio de caso en la misma línea. En ambos casos el espectador tiene que cambiar de hilo y procesar elementos nuevos al mismo tiempo.

2. **Pares de ideas seguidas con carga 4 o más.** Son 9-10 (la decisión como principio y la tarjeta como flecha), 12-13-14 (llamada, cola, buzón, contratos), 19-20 (preautorización y servicios), 22-23 (guardar la reserva y el evento de gestión de flota) y 30-35 (seis ideas seguidas, el bloque de ClearView). El bloque 30-35 dura 1:11 (4:32 a 5:43) y mete cuatro cifras o términos de sistemas (empleador, miles, 200.000, cien tipos) más el adaptador, sin pausa.

3. **Casos nuevos.** Son tres: Sysops Squad (idea 1, 0:01), MobilityCorp (idea 18, 2:14) y ClearView (idea 29, 4:23). No hay pares a menos de dos minutos. El par más cercano es MobilityCorp y ClearView, a 2:09.

4. **La palabra "disponibilidad" cambia de sentido dentro de la lección.** En las ideas 23 y 24 significa la disponibilidad de los autos para alquilar. En las ideas 27 y 28 significa la cualidad de L2 (que el sistema funcione cuando hace falta). El espectador tiene que distinguirlas sin que el texto lo marque, y en la idea 23 el término aparece como un elemento nuevo más.

5. **Cierre con un término nuevo sin ejemplo, y arranque apoyado en memoria.** La idea 38 es la de mayor carga de la lección (5). Introduce "garantía" en el último minuto, sin caso ni ejemplo; L7 la retoma, pero aquí queda como promesa. Por otro lado, las ideas 1 a 7 y 16 son carga 1 solo si el espectador recuerda L4 y L5 (la apertura de Sysops, la tarjeta, la frase del equipo). Sin esa memoria, la primera mitad tendría carga 2 o 3.

## Errores de hecho y contradicciones

1. **Idea 15: "Sus decisiones figuran como propuestas".** No es cierto para todas. `katas-src/Team-7/ADR/ADR-8-messaging-sync.md` l. 4-5 dice "## Status: **OBSOLETE**". ADR-8 trata justamente de la sincronización por tabla de los datos de facturación del cliente. Los demás ADR citados (ADR-5, l. 3-4) sí dicen "Proposed". Corrección: "la mayoría figuran como propuestas".

2. **Idea 24: "puede tardar unos instantes".** La fuente no da plazo. `katas-src/Five-Nines/hld/core-func/car-van-rental/4_Sequence_Diagram.md` l. 64-65 dice "Vehicle availability update via event (eventual consistency acceptable for non-critical path)". "Unos instantes" es una duración inventada.

3. **Idea 34: "calcula unos cien tipos".** Es un supuesto y no un cálculo. `katas-src/Pragmatic/Requirements/requirements-and-assumptions.md` l. 109: "A29: There is a variety of around 100 different HR systems." Las cifras de miles y de 200.000 sí coinciden con Q16 (l. 77) y A31 (l. 112).

4. **Contradicción de la fuente, no del guion.** `4_Sequence_Diagram.md` l. 46-49 hace `UPDATE vehicle SET status='reserved'` dentro de la transacción, y l. 65 dice que la disponibilidad va por evento. El guion sigue el evento, como dice la tabla de verificación, pero no lo aclara.

Contradicciones con otras lecciones: ninguna. Sysops (L4, L5, L8), ClearView (L2, L5, L10, L11) y MobilityCorp (L9-L11: "scooters, bicicletas, autos y camionetas eléctricos en Europa", que no choca con "vehículos eléctricos") son coherentes. La definición de "garantía" en L6 encaja con "entrega al menos una vez" de L7.

## Qué cambiaría

1. **Idea 14 (contratos y tabla).** Quitar el mecanismo o nombrarlo en una frase: "Otras, como los contratos, no pasan por esa pregunta: se copian de una base a otra." Así la carga baja de 4 a 2 y se elimina el salto de fricción 3.

2. **Bloque de ClearView, ideas 30 a 35.** Dejar una cifra por idea (quitar "cien tipos" o "miles"), decir una vez y en una frase que configuración no es tipo de sistema, quitar "por escrito" de la idea 34 y cambiar "calcula" por "supone" (error 3).

3. **Disponibilidad de autos (ideas 23 y 24).** Renombrar el término de los autos ("qué autos están libres") para no reutilizar la cualidad de L2.

4. **Garantía (idea 38).** Mostrar la palabra antes, en la idea 16 o en la 12-13, con el ejemplo de la tarjeta: "si el mensaje de la tarjeta se pierde, la garantía dice qué pasa". Así el cierre solo la nombra, la carga baja de 5 a 3, y L7 tiene de dónde partir.
