Total: 40 ideas. Duración: 6:23 (tiempos de `carga/r4/tiempos-ch5.txt`).

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) ClearView, plataforma de una organización sin fines de lucro que empareja currículums anonimizados con puestos | 1 | 1 | ClearView | Repite la descripción de la lección 2; no trae elementos nuevos. |
| 2 | 0:08 | Su equipo decidió que varios servicios usaran una misma base; el riesgo es el acoplamiento caótico, o sea que cualquiera cambie cualquier cosa | 3 | 1 | — | Dos elementos nuevos: la decisión de compartir base y el término "acoplamiento caótico". |
| 3 | 0:20 | Por eso escribió una segunda decisión para contenerlo | 3 | 2 | — | Un elemento nuevo (la segunda decisión) combinado con el riesgo de la idea 2. |
| 4 | 0:23 | La segunda decisión pone una regla: un único servicio con derecho a escribir cada dato, impuesta con permisos de la base | 4 | 1 | — | Regla de escritura única y permisos de la base, dos elementos combinados con la idea 3. |
| 5 | 0:35 | (pregunta) La regla de ClearView es una respuesta, y hay otras posibles | 1 | 2 | — | No agrega elementos; pasa del caso al marco general sin nombrar aún las alternativas. |
| 6 | 0:39 | Cuando un sistema se parte hay tres decisiones: si las piezas comparten base o tienen la suya, qué se pierde al separarlas y qué datos llegan tarde | 5 | 3 | — | Cifra "tres", base propia, pérdida al separar y datos tardíos: cuatro elementos en dos frases, y salto del caso al marco. |
| 7 | 0:53 | (compartir) Empecemos por compartir la base, lo que hizo ClearView: pocos servicios grandes en vez de microservicios | 3 | 2 | — | Microservicios y servicios grandes ya vistos (lecciones 1 y 4); el paso nuevo es que ese estilo permite una base común. |
| 8 | 1:07 | Gana en costo, porque necesita menos bases | 2 | 2 | — | Un elemento nuevo: la ganancia en costo, con su razón. |
| 9 | 1:10 | A cambio se debilitan la integridad de los datos y la tolerancia a fallos, que es la capacidad de seguir funcionando cuando una parte falla | 4 | 3 | — | "Tolerancia a fallos" se nombró sin definir en la lección 4 y aquí se define; la pérdida combina con la ganancia de costo. |
| 10 | 1:22 | El ejemplo es la versión anonimizada del currículum, que usan cuatro servicios distintos | 3 | 2 | — | La cifra "cuatro" combinada con la idea de compartir base. |
| 11 | 1:22 | Con un solo dueño por dato, dice el equipo, los cambios se vuelven más predecibles | 3 | 2 | — | "Predecibles" es nuevo y se combina con la regla de escritura única. |
| 12 | 1:35 | El costo quedó anotado: documentar quién es dueño de cada parte y configurar los permisos | 3 | 2 | — | Documentar los dueños es nuevo; los permisos ya estaban en la idea 4. |
| 13 | 1:40 | Hay un dato con una regla más estricta, el currículum original; lo guarda un solo servicio | 3 | 2 | — | El currículum original como dato aparte es nuevo; se combina con la regla de la idea 4. |
| 14 | 1:49 | El servicio que empareja no tiene permiso para leer el original, así que trabaja con la versión anonimizada; ni dentro de ClearView todos ven todo | 4 | 2 | — | "Servicio que empareja" y permiso de lectura son nuevos; la conclusión los combina con la idea 13. |
| 15 | 2:00 | (separar) Con ClearView alcanza para compartir. Falta el camino contrario, y para eso hace falta otro caso | 1 | 2 | — | Anuncia el cambio de caso; no agrega elementos. |
| 16 | 2:06 | Sysops Squad es el servicio de soporte técnico de una empresa de electrónica; su sistema de tickets es un monolito viejo que pierde tickets y se congela | 1 | 3 | Sysops Squad | Caso ya visto en la lección 4, con la misma descripción; el cambio de caso es anunciado. |
| 17 | 2:16 | Su equipo propone dos bases separadas, una para los clientes y otra para los reportes; hay que mantener sincronizados los datos que quedan en las dos | 4 | 2 | — | Base de clientes, base de reportes y sincronización: tres elementos nuevos. |
| 18 | 2:16 | Un reporte pesado o el mantenimiento de la base operativa no afectarían a quienes usan el sistema | 4 | 2 | — | "Reporte pesado" y "base operativa" son nuevos, con el efecto causal combinado con la idea 17. |
| 19 | 2:34 | La propuesta no se hace de golpe, porque separar exige un esfuerzo grande: en la primera fase se resuelve lo urgente con la base única | 4 | 2 | — | Dos fases, base única y el esfuerzo de separar: tres elementos nuevos. |
| 20 | 2:43 | Eso dura hasta que haya un cuello de botella, o sea la parte que frena a todo lo demás; en la segunda fase se migra a la meta del equipo | 4 | 2 | — | "Cuello de botella" y "meta del equipo" son nuevos, combinados con las fases de la idea 19. |
| 21 | 2:54 | (atomicidad) Separar los datos tiene un precio, y para verlo hace falta un término. Una transacción es un grupo de cambios que se guardan todos o ninguno | 2 | 3 | — | Un término nuevo (transacción), anunciado como cambio de tema. |
| 22 | 3:03 | Con una sola base, si algo falla a la mitad no queda nada a medias; con bases distintas, una transacción ya no las cubre a todas | 3 | 1 | — | Un paso nuevo (una base cubre todo) combinado con la definición de la idea 21. |
| 23 | 3:11 | Lo vemos en Sysops Squad: un ticket nuevo se guarda en la base de clientes | 2 | 2 | — | Aplica la transacción al caso; la base de clientes ya fue nombrada. |
| 24 | 3:17 | Después se dispara un evento, un aviso para la parte que procesa los tickets; el cliente lo ve al refrescar y esa parte se entera después | 4 | 2 | — | "Evento" y la demora entre partes son nuevos, combinados con el guardado de la idea 23. |
| 25 | 3:28 | Durante ese rato las dos no coinciden: es la consistencia eventual; cuando todo coincide al momento, es consistencia fuerte | 4 | 2 | — | Dos términos nuevos (eventual y fuerte) combinados con la demora de la idea 24. |
| 26 | 3:41 | (agregados) Queda saber qué datos toleran ese rato. Un agregado es un grupo de datos que siempre se cambia junto, en una misma transacción | 3 | 2 | — | Un término nuevo (agregado) combinado con la transacción. |
| 27 | 3:51 | Tomemos otra vez el ticket de Sysops Squad, y esta lectura es nuestra: el ticket y sus datos van juntos; el aviso queda fuera y viaja por el evento | 3 | 2 | — | Aplicación del agregado; el paso "el aviso queda fuera" es nuevo y se combina con la idea 26. |
| 28 | 4:05 | De ahí sale una regla que armamos nosotros: dentro de un agregado la consistencia es fuerte; entre agregados distintos es eventual | 3 | 2 | — | La regla es nueva; se combina con las ideas 25 y 26. |
| 29 | 4:11 | Por eso, cuando los datos se reparten, hay que decidir dónde pasan las fronteras de esos grupos | 3 | 2 | — | Fronteras, nuevo, combinado con la regla de la idea 28. |
| 30 | 4:24 | (linea) Falta ver dónde pasa esa frontera, y conviene un caso con datos de distinto peso | 2 | 2 | — | "Datos de distinto peso" es un criterio nuevo; anuncia el caso. |
| 31 | 4:29 | Farmacy Food es un servicio de comidas preparadas que se entregan en refrigeradores inteligentes | 1 | 3 | Farmacy Food | Caso ya visto en las lecciones 1 y 3, con la misma descripción; cambio de caso anunciado. |
| 32 | 4:35 | Trata tres datos de tres maneras. Las decisiones que siguen son propuestas del equipo | 2 | 2 | — | La cifra "tres"; "propuestas" ya se usó con Sysops Squad. |
| 33 | 4:40 | El catálogo se guardaría en el teléfono del cliente y puede estar viejo; la disponibilidad real se comprueba al pagar; el costo es que la confirmación de la compra puede tardar más | 4 | 2 | — | Catálogo en el teléfono y comprobación al pagar: dos elementos nuevos, combinados con el costo de la demora. |
| 34 | 4:53 | El stock lo informa un sistema externo que puede dejar de mandar datos; por eso proponen una copia propia, y el riesgo es compensar con cupones; eso cuesta dinero | 4 | 2 | — | "Sistema externo", "copia propia" y "cupones" son nuevos; "cuesta dinero" es deducción. |
| 35 | 5:11 | El pago es distinto, porque vender comidas es todo el negocio; su orden tiene que llegar al menos una vez, o sea que nunca se pierde, aunque a veces llegue repetida | 4 | 2 | — | "Entrega al menos una vez" y "orden repetida" son términos nuevos, combinados con la razón de negocio. |
| 36 | 5:21 | A cambio, baja un poco el rendimiento | 2 | 2 | — | "Rendimiento" ya visto en la lección 2; la pérdida combina con la idea 35. |
| 37 | 5:24 | (sin prefijo) Con los tres datos a la vista aparece un criterio, que deducimos nosotros: cuánto se pierde si el dato llega tarde o repetido; se aplica a catálogo, stock y pago | 4 | 3 | — | Criterio y "llega tarde o repetido" son nuevos; aplicarlo a tres datos a la vez es el salto más abstracto del tramo. |
| 38 | 5:45 | (cierre) Con esos casos a la vista, se puede releer ClearView; compartió una base y dejó escrito quién escribe cada dato | 1 | 2 | — | Repite las ideas 2 y 4; vuelve a ClearView con un puente explícito. |
| 39 | 6:01 | El repositorio no muestra si esos permisos llegaron a configurarse, así que es un diseño pedido y no algo comprobado | 3 | 3 | — | "Repositorio" no se presentó antes (término sin presentar) y "no comprobado" es un paso nuevo. |
| 40 | 6:08 | Compartir la base no obliga al caos si cada dato tiene dueño; separarla tampoco lo resuelve todo, porque lo copiado hay que sincronizarlo y saber qué datos toleran la diferencia | 2 | 1 | — | Solo "tolerar la diferencia" es nuevo; el resto son conclusiones de ideas anteriores. |

## Lo que muestran los puntajes

1. Picos de carga con fricción alta. Carga 4 o más con fricción 3 o más: ideas 6 (carga 5), 9 y 37 (carga 4). Carga 3 o más con fricción 3 o más: ideas 6, 9, 37 y 39 (carga 3). La 6 mete cuatro elementos nuevos en dos frases y pasa del caso al marco sin ejemplo. La 9 usa "tolerancia a fallos", que la lección 4 nombró sin definir, y suma la pérdida. La 37 presenta un criterio propio y lo aplica a tres datos en la misma idea. La 39 nombra "el repositorio" sin haberlo presentado.

2. Bloque denso de Sysops Squad, 2:16 a 2:43 (ideas 17 a 20). Cuatro ideas seguidas con carga 4 y fricción 2. Pares de carga 4 seguidas: 17-18, 18-19 y 19-20. En 27 segundos llegan diez elementos nuevos: base de clientes, base de reportes, sincronización, reporte pesado, base operativa, dos fases, base única, esfuerzo de separar, cuello de botella y meta del equipo.

3. Bloque de Farmacy Food, 4:40 a 5:11 (ideas 33, 34 y 35). Tres ideas seguidas con carga 4. Pares 33-34 y 34-35. Siete elementos nuevos en 31 segundos: catálogo en el teléfono, comprobación al pagar, sistema externo, copia propia, cupones, entrega al menos una vez y orden repetida. Cada uno de los tres datos llega con su decisión y su riesgo, sin pausa entre uno y otro.

4. Consistencia, 3:17 a 3:28 (ideas 24 y 25). Par de carga 4 seguidas, con fricción 2. Cuatro elementos nuevos en 11 segundos: evento, demora entre partes, consistencia eventual y consistencia fuerte. Las dos definiciones opuestas llegan en la misma idea y el espectador tiene que sostenerlas a la vez.

5. Casos nuevos de la lección: ClearView (idea 1, 0:01), Sysops Squad (idea 16, 2:06) y Farmacy Food (idea 31, 4:29). No hay ningún par a menos de dos minutos: ClearView a Sysops Squad son 2:05, y Sysops Squad a Farmacy Food son 2:23. Los tres casos vuelven con la descripción de lecciones anteriores (ideas 1, 16 y 31), así que suman poca carga, pero el cambio de caso sí pesa (fricción 3).

6. Repeticiones. "Baja un poco el rendimiento" (idea 36, 5:21) vuelve a decirse como "un poco más lento" en el 5:38. "Cuesta dinero" aparece en la idea 34 y otra vez en el 5:35 (dentro de la idea 37). El cierre (idea 38) repite casi textual la regla de escritura única y los permisos de las ideas 4 y 11.

## Errores de hecho y contradicciones

Ninguno. Contrasté las citas de la tabla de verificación con las fuentes:
- Pragmatic ADR-014, estado Accepted (l. 7). "the object story is used by the services Job candidate, Story, Matching and Employer" (l. 11-12) respalda "cuatro servicios distintos". "May lead to chaotic coupling. Therefore, we added ADR-015" (l. 21). Debilita "Data integrity" y "Fault tolerance" (l. 33-34).
- Pragmatic ADR-015 (l. 14-16 y 19-20): "only one service has the right to write"; "This should be enforced with DB permissions"; costos de documentación y configuración de permisos.
- Pragmatic ADR-010 (l. 16-17): "Resumes are only persisted in the Job candidate service, and access requires special privileges which are not given to the matching service".
- Team 7 ADR-6 y ADR-7 (l. 5 en ambos): "Proposed". "keep in sync customer billing information" (ADR-6, l. 17); "keep in sync reporting data" (ADR-7, l. 14).
- Team 7 README l. 224: "the requests succeeds after the ticket is saved in the customer database and the corresponding event is fired". l. 289: "stick with a monolithic database until it becomes a bottleneck".
- ArchColider ADR-008 (l. 13 y 21), ADR-012 (l. 30: "Loses on compensation by coupons for customer", Proposed) y ADR-013 (l. 22: "Users can experience longer delays during the purchase confirmation step", Proposed). Las tres coinciden con la lección.

Contradicciones entre lecciones: ninguna. Revisé la lección 4 (un quantum por área, service-based), la 6 (Sysops Squad, descripción igual), la 7 (pedido con identificador y versión, consistente con ADR-008 l. 17), la 8 (la "una por cada dominio" son puertas de entrada, no bases), la 11 (ADR-014 Accepted) y las lecciones 1 y 3 (misma descripción de Farmacy Food).

Matices (no son errores):
- 5:21: "A cambio, baja un poco el rendimiento" omite lo que ADR-008 l. 21 pone al lado: "but we get data integrity". El trade-off se narra solo con la pérdida.
- 4:40 y 4:48: "se comprueba al pagar" y "la confirmación de la compra" nombran el mismo paso. ADR-013 l. 17 usa uno solo ("an actual check during purchase confirmation"). "Pagar" además es el nombre del paso de la lección 7.

## Qué cambiaría

1. Idea 6 (0:39): partir en dos. Primero, compartir o tener base propia, con su alternativa. Después, qué se pierde al separar y qué datos llegan tarde, cada uno con un ejemplo. Baja la carga de 5 a 2 o 3 por idea.
2. Idea 9 (1:10): definir "tolerancia a fallos" en su propia frase antes de nombrar la pérdida, y decir la ganancia y la pérdida en oraciones separadas. Baja la carga a 3 y evita el término usado antes de presentarlo.
3. Bloque 2:16 a 2:43 (ideas 17 a 20): decir "la base actual" en vez de "base operativa"; quitar "meta del equipo", porque la segunda fase ya dijo "bases separadas"; y dejar la sincronización en una frase aparte, después de las dos fases.
4. Criterio del 5:24 (idea 37) y cierre (idea 38): aplicar el criterio solo al pago, que es el dato nuevo, porque catálogo y stock ya se dijeron en las ideas 33 y 34. Quitar "un poco más lento" del 5:38 y el cierre que repite las ideas 4 y 11.
