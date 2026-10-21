39 ideas. Duración: 6:38.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Sysops Squad es un sistema de tickets, un monolito que pierde tickets y se cae; el equipo cree que la causa son los picos de uso | 4 | 1 | Sysops Squad | Nombre propio nuevo, monolito sin glosa y una causa atribuida al equipo; es la primera idea, no hay salto |
| 2 | 0:12 | Guarda las tarjetas de crédito de los clientes para cobrarles el plan mensual | 2 | 1 | — | Dato concreto sobre el caso ya presentado; "además" sigue la misma lista |
| 3 | 0:17 | Eso puede obligar a una auditoría PCI, la norma de seguridad para quien maneja tarjetas | 3 | 2 | — | Sigla PCI definida en la misma frase; paso causal con "eso tiene una consecuencia" |
| 4 | 0:26 | Según el equipo, cuanto más grande es la parte que toca tarjetas, más pesada es la auditoría | 3 | 2 | — | Relación proporcional atribuida al equipo; conector "y según" |
| 5 | 0:32 | Propone aislar la facturación como zona de seguridad que no recibe pedidos de afuera; las decisiones del caso son propuestas | 3 | 2 | — | "No recibe pedidos de afuera" cambia el alcance de la fuente (ver errores 1 y 2); "por eso" enlaza |
| 6 | 0:44 | (pregunta) Dónde se corta un sistema es una decisión que cuesta cambiar; en Sysops la razón fue lo que necesita cada parte | 3 | 3 | — | "Una pregunta más general" anuncia el cambio de caso a principio; "corte" y "parte" se usan sin definir |
| 7 | 0:56 | La lección tiene tres partes: necesidades y si el corte aguanta; qué no cortar y de dónde salen las partes; el estilo | 2 | 2 | — | Mapa de tres temas que el conector "va en ese orden" vuelve fácil de seguir; "estilo" aún sin definir |
| 8 | 1:10 | (necesidades) Cuatro áreas del negocio: cliente, técnicos en terreno, facturación y administración, cada una con una necesidad distinta | 3 | 3 | — | Cuatro áreas nuevas en una frase; sale del mapa de la lección para entrar al análisis por área |
| 9 | 1:27 | Cliente y técnicos necesitan disponibilidad y respuesta rápida, porque nada deja tan descontento a un cliente como un sistema lento o caído | 2 | 1 | — | Continuación de la lista de áreas; "lo mismo" reutiliza la idea |
| 10 | 1:40 | Técnicos: quien llega a la casa del cliente tiene que poder buscar el ticket, y si no puede quizá no arregle el problema | 2 | 1 | — | Ejemplo concreto del requisito de técnicos |
| 11 | 1:46 | Facturación necesita seguridad: una filtración de datos de tarjetas sería un desastre y podría tener implicaciones legales | 2 | 1 | — | Continúa la lista; "implicaciones legales" sin cifra ni ejemplo |
| 12 | 1:54 | Administración tolera demoras: un reporte que tarda un poco más no es grave | 1 | 1 | — | Dato simple del mismo tipo que las áreas anteriores |
| 13 | 2:02 | (quanta) Con las necesidades claras falta saber si el corte aguanta; depende de si las partes se esperan entre sí, y con un ticket se ve bien | 3 | 3 | — | Cambio de pregunta anunciado; "esperar entre partes" aparece sin término todavía |
| 14 | 2:10 | Con un ticket, el sistema deja el pedido en una cola de mensajes, un buzón donde otro lo recoge, y sigue sin esperar | 3 | 2 | — | "Cola de mensajes" definida con metáfora; el ejemplo del ticket pasa a concepto |
| 15 | 2:18 | Si una pieza llama a otra y espera su respuesta, las dos quedan atadas: si la segunda se cae, la primera tampoco responde | 3 | 2 | — | Cadena causal de dos eslabones; conector "en cambio" |
| 16 | 2:27 | Un grupo de piezas atadas así se cae junto; ese grupo se llama quantum | 3 | 2 | — | Término central, definido aquí por primera vez y sin ejemplo que lo ancle |
| 17 | 2:32 | Sysops propone un quantum por cada una de las cuatro áreas | 2 | 1 | — | Aplica el término recién definido a cuatro áreas ya conocidas |
| 18 | 2:36 | Volvamos a la tarjeta del principio: mandarla con una llamada que espera anularía la disponibilidad de la parte del cliente, así que va por un mensaje sin espera | 3 | 3 | — | Vuelta al gancho con puente explícito, dos minutos después; junta quantum, espera y cliente en una frase |
| 19 | 2:50 | Lectura nuestra: cada frontera queda donde cambia la necesidad, y la espera entre las partes dice si el corte aguanta | 3 | 2 | — | Dos principios en una frase, marcados como lectura de la lección; sin ejemplo que los sostenga |
| 20 | 2:59 | (nopartir) Ahora un caso en que se decide no cortar: el servicio de notificaciones de Sysops, que avisa a clientes y técnicos, sin dueña porque lo usan todas las áreas | 3 | 3 | — | Cambio anunciado a otro componente; "no partir" es concepto nuevo; "dueña" sin definir |
| 21 | 3:14 | El equipo propone dejarlo como una sola pieza, porque a esos avisos no les perjudica llegar un poco tarde | 2 | 1 | — | Continuación directa con su razón |
| 22 | 3:20 | Un servicio por área repetiría la misma implementación en varios lugares; no partir también se decide con una razón escrita | 2 | 2 | — | Razón del equipo; la frase final generaliza con paso lógico |
| 23 | 3:30 | (eventos) Las cuatro áreas dejaron abierta la pregunta de dónde salen las partes candidatas | 2 | 3 | — | Vuelta a Sysops tras el caso de notificaciones; el puente es la frase "dejaron abierta" |
| 24 | 3:35 | Event storming: anotar lo que pasa en el negocio, escrito en pasado y en orden | 3 | 2 | — | Técnica presentada con definición en la misma frase; tres reglas en una idea |
| 25 | 3:44 | Para ver cómo se hace, otro caso: MonitorMe, un sistema de hospitales que recibe signos vitales, avisa cuando algo sale de rango y los muestra en la estación de enfermería | 4 | 3 | MonitorMe | Caso nuevo con sistema, dominio, alerta y estación de enfermería en una sola idea; "entra otro caso" lo anuncia |
| 26 | 3:59 | Hechos del event storming de MonitorMe: llegaron datos de un sensor, se detectó un problema, se envió una alerta, la enfermera vio la alerta | 3 | 2 | — | Cuatro hechos en pasado como ejemplo de la técnica; "sensor" aparece sin contexto |
| 27 | 4:08 | Esos hechos se agrupan por proceso del negocio y cada grupo es una parte candidata; a MonitorMe le salieron seis | 3 | 1 | — | Término "parte candidata" nuevo; cifra seis con el mismo ejemplo |
| 28 | 4:15 | Cuatro de las seis hacen el trabajo del sistema: una recibe y guarda, otra analiza, otra transmite a la estación y otra envía avisos; las otras dos se decidieron aparte | 4 | 1 | — | Cuatro funciones con nombre, una cifra y el resto de la cuenta en la misma idea |
| 29 | 4:31 | Sensores fuera: quien encargó el proyecto aclaró que el sistema no se ocupa de ellos; lo que se paga es no tener protocolo conocido y asumir un flujo continuo | 4 | 2 | — | "Quien encargó el proyecto" sin nombre; "protocolo" y "flujo continuo" sin definir; razón y costo juntos |
| 30 | 4:50 | El registro de pacientes queda dentro, como subdominio de apoyo al que no se le presta foco, porque ya existe una solución externa; el costo es adaptarse a ella | 4 | 2 | — | "Subdominio de apoyo" sin definir más allá de la glosa; motivo y costo en la misma idea |
| 31 | 5:06 | Dejar algo fuera, o dentro sin foco, también es un corte, con su razón y su costo escritos | 2 | 2 | — | Conclusión con "también" que cierra el bloque de MonitorMe |
| 32 | 5:13 | (estilo) Con las partes cortadas falta elegir la forma general del sistema; de vuelta en Sysops, el equipo propone service-based | 3 | 3 | — | "Estilo" definido como forma general; "de vuelta" retoma Sysops tras MonitorMe; service-based es nuevo |
| 33 | 5:24 | Service-based es un punto intermedio entre monolito y microservicios, con pocos servicios grandes en lugar de muchos pequeños; un estilo así suele tener unos siete | 3 | 2 | — | "Microservicios" sin definir (solo el contraste "muchos pequeños"); la cifra siete es promedio general de la fuente, no del diseño |
| 34 | 5:35 | Sus razones son cualidades como las de la lección 2: buena tolerancia a fallos, escalabilidad y agilidad; y evita el sobrecosto de los microservicios | 3 | 2 | — | Cualidades remitidas a la lección 2; tres atributos en una lista y el sobrecosto en la misma idea |
| 35 | 5:49 | Por eso el estilo viene después: se elige con las cualidades, cuando las partes ya están cortadas | 2 | 2 | — | Conclusión con "por eso" que cierra la escena |
| 36 | 5:56 | (cierre) Volvamos al corte de la facturación: aislarla simplifica mucho la auditoría, según el equipo, pero otras partes necesitan sus datos | 2 | 3 | — | Vuelta a un hilo de más de cinco minutos con "volvamos"; la atribución "según el equipo" marca el contraste |
| 37 | 6:05 | Los clientes cargan y editan su tarjeta, el personal de administración resuelve problemas de pago y los gerentes ven informes financieros | 2 | 1 | — | Enumeración de tres actores como una sola idea; continúa la tarjeta de la idea 36 |
| 38 | 6:14 | Todo eso cruza una frontera ahora: el documento anota más complejidad y la tarea de asegurar que la tarjeta viaje protegida | 3 | 2 | — | Consecuencias de la fuente; "cruza una frontera" retoma la metáfora del corte |
| 39 | 6:24 | Vista entera, cortar un sistema es poner una frontera donde una parte necesita algo distinto, y aceptar por escrito lo que cuesta cruzarla | 3 | 2 | — | Generalización de cierre; tres ideas abstractas en una frase |

### Lo que muestran los puntajes

1. Pico de carga en MonitorMe (ideas 25 a 30). La idea 25 es la única con carga 4 y fricción 3 a la vez, porque junta un caso nuevo, su dominio, la alerta y la estación de enfermería tras un "entra otro caso". Después vienen las ideas 28, 29 y 30, todas con carga 4: hay pares seguidos de carga 4 en 28–29 y en 29–30. La 29 mete tres términos sin definir (protocolo, flujo continuo, quien encargó el proyecto) y la 30 usa "subdominio de apoyo" con solo una glosa. Casos nuevos: Sysops Squad en la idea 1 (0:01) y MonitorMe en la 25 (3:44). Están separados por 3:43, así que no hay pares de casos nuevos a menos de dos minutos.

2. Tramo sostenido de carga alta en el bloque de quanta (ideas 13 a 20). Ocho ideas seguidas: siete tienen carga 3 y la 17 tiene carga 2. La 16 define quantum y, a los pocos segundos, la 18 vuelve a la tarjeta del gancho y junta quantum, espera y cliente en una sola frase. La carga no baja en ningún momento entre 2:02 y 3:14, aunque hay un puente explícito en cada cambio.

3. Saltos de hilo con carga 3 o más y fricción 3 o más: ideas 6, 8, 13, 18, 20, 25 y 32 (la 25 con carga 4). Hay además nueve ideas con fricción 3 en total (6, 8, 13, 18, 20, 23, 25, 32 y 36), y todas llevan un puente anunciado. Aun así se apilan: la lección cambia de hilo nueve veces en seis minutos. El caso de notificaciones (20) corta el hilo de los quanta y la vuelta a Sysops (23) lo retoma con otra frase de puente.

4. Términos sin definir o usados antes de definirse: "monolito" (idea 1, sin glosa), "protocolo" y "flujo continuo" (29), "subdominio de apoyo" (30), "dueña" (20) y "microservicios" (33, solo contrastado con "muchos pequeños"). Los más costosos son "protocolo" y "subdominio de apoyo", porque sus ideas ya están en carga 4.

5. Atribución: la idea 30 presenta como motivo del registro de pacientes que "ya existe una solución externa". La tabla de verificación de la lección dice que ese motivo es lectura nuestra, pero la narración no lo marca. La idea 19 sí lo marca como "lectura nuestra", así que la lección no es uniforme con sus propias marcas.

### Errores de hecho y contradicciones

1. Contradicción de la facturación entre lección 4, lección 8 y las fuentes del equipo 7. La idea 5 dice que la facturación es una zona "que no recibe pedidos de afuera". La fuente, `katas-src/Team-7/ADR/ADR-1-service-based.md` l. 15, dice: "This is an isolated security zone with no incoming requests from the other domains", es decir, de otros dominios y no de afuera del sistema. Además, `ADR-12-gateways.md` (Proposed) l. 13 dice: "The first candidate is the billing silo", y l. 19: "services in different domains should communicate only through the API Gateways". La lección 8 (líneas 49 y 95) habla de una "puerta de entrada por dominio" que empieza por facturación. Los dos ADR están en Proposed, así que ninguno es "el correcto": el equipo se contradice, y la lección 4 cita solo el ADR-1 sin decirlo.

2. "Las decisiones de este caso quedaron escritas como propuestas" (idea 5). `Team-7-src\ADR\ADR-8-messaging-sync.md` l. 5 dice **OBSOLETE**. Los demás ADR del equipo (1 a 7 y 9 a 12) están en Proposed. La frase es casi cierta, pero no dice que una decisión ya está obsoleta.

3. Simplificación, no error de hecho: la idea 25 dice que MonitorMe "avisa cuando algo sale de rango". `BluzBrothers-src\README.md` l. 30 dice que alerta cuando se detectan anomalías "based on defined and easily extendable rules". Salir de rango es una forma posible de esa regla, no la única.

No encontré cifras contradictorias: cuatro áreas, seis partes, cuatro que hacen el trabajo del sistema y "unos siete" coinciden con las fuentes.

### Qué cambiaría

1. Idea 5 (0:32): decir la frontera como la dice la fuente, "según su primera propuesta, la facturación no recibe pedidos de otros dominios", y, si se menciona la puerta de la lección 8, presentarla como una segunda propuesta que la contradice. Cambiar "las decisiones del caso quedaron escritas como propuestas" por "casi todas quedaron como propuestas; la de sincronizar por tabla los datos de facturación está obsoleta".
2. Bloque de quanta (ideas 13 a 20): poner una consecuencia concreta entre la 15 y la 16, por ejemplo qué le pasa al cliente cuando la facturación no contesta. Así el término quantum no llega después de siete ideas de carga 3 en ocho.
3. Bloque de MonitorMe (ideas 25 a 30): partir en dos escenas, una con el caso y la estación (25) y otra con las partes (28 a 30). Definir "protocolo" y "subdominio de apoyo" la primera vez que aparecen, en las ideas 29 y 30.
4. Idea 30: marcar como lectura de la lección la razón del registro de pacientes, como ya lo hace la tabla de verificación, o citar la razón que da la fuente (la alineación con una solución existente, ADR-005).
