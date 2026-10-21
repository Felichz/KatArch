Total: 40 ideas. Duración: 3:39.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (intro) Muchas decisiones que más pesan se toman antes de escribir código y se siguen pagando después. | 2 | 1 | — | Tesis; un solo paso nuevo (se pagan después), sin nombres ni cifras. |
| 2 | 0:12 | Este es un curso sobre ellas: cómo se diseña un sistema entero. | 2 | 1 | — | Repite el tema de la 1; único término nuevo, "sistema entero". |
| 3 | 0:14 | Son decisiones que casi siempre se aprenden equivocándose. | 2 | 1 | — | Un paso nuevo, afirmado sin ejemplo. |
| 4 | 0:20 | Para enseñarlas, el curso usa katas: un equipo diseña la solución de un caso de negocio, y alguien hace de cliente. | 4 | 2 | — | Tres elementos nuevos (kata, caso de negocio, rol de cliente); "para enseñarlas" retoma la 3. |
| 5 | 0:31 | El curso usa lo que dejaron escrito los equipos que ganaron las katas de O'Reilly entre 2020 y 2025. | 5 | 2 | — | O'Reilly, el rango de años y el material escrito son tres elementos nuevos, combinados con las katas de la 4. |
| 6 | 0:37 | (ruta) Veamos adónde lleva el curso: al terminar, frente a un sistema nuevo, vas a poder decir qué decisiones hay que tomar y en qué orden. | 2 | 3 | — | Cambio de hilo anunciado, del material al mapa del curso; "en qué orden" es lo único nuevo. |
| 7 | 0:49 | Primero se decide qué importa en el pedido del cliente; después, cómo se divide, se conecta y se protege el sistema. | 5 | 2 | — | Cuatro elementos nuevos en una frase (qué importa, dividir, conectar, proteger), ninguno explicado. |
| 8 | 0:57 | (kata) Lo que dejaron esos equipos son diseños en papel, no un sistema funcionando. | 3 | 3 | — | Un elemento nuevo (diseño en papel) combinado con lo escrito de la 5; "antes de seguir" anuncia un desvío. |
| 9 | 1:04 | (decision) Veamos qué es una decisión de arquitectura en un caso concreto. | 2 | 3 | — | Define el término del título; cambio de caso anunciado. |
| 10 | 1:09 | Farmacy Food es un servicio de comidas preparadas que se entregan en refrigeradores inteligentes. | 4 | 3 | Farmacy Food | Tres elementos nuevos: nombre del caso, comidas preparadas, refrigeradores inteligentes. |
| 11 | 1:15 | Su equipo tuvo que decidir cómo vigilar los servidores del sistema, y esa decisión es de arquitectura por dos motivos. | 4 | 2 | — | "Vigilar los servidores" y "dos motivos" son nuevos, combinados con la definición de la 9. |
| 12 | 1:23 | El primero es que cuesta cambiarla, porque otras decisiones se apoyan en ella. | 4 | 2 | — | "Cuesta cambiarla" y la dependencia entre decisiones, combinados con el "dos motivos" de la 11. |
| 13 | 1:23 | Por ejemplo, ese monitoreo sirve para decidir cuándo agregar servidores. | 3 | 1 | — | Un elemento nuevo (el monitoreo decide cuándo escalar), combinado con la dependencia de la 12. |
| 14 | 1:32 | El segundo es que no afecta a una función en particular, sino al sistema entero. | 3 | 2 | — | "Función en particular" es nuevo y se contrasta con "sistema entero" de la 2. |
| 15 | 1:37 | (ejemplo) Veamos qué opciones tenía ese equipo. | 1 | 3 | — | Cambio de hilo anunciado, de la definición al caso de monitoreo. |
| 16 | 1:40 | Había herramientas gratuitas, de código abierto, que hay que instalar y mantener. | 3 | 1 | — | Dos elementos nuevos: código abierto y el costo de instalar y mantener. |
| 17 | 1:40 | Y estaba DataDog. | 2 | 1 | — | Nombre propio sin presentar (no dice que es un servicio de monitoreo); herramienta de terceros, no caso de la kata. |
| 18 | 1:46 | Cuesta quince dólares por servidor al mes. | 3 | 1 | — | Una cifra (15 USD por servidor al mes) ligada a DataDog de la 17. |
| 19 | 1:48 | El equipo propuso DataDog, porque casi no pide mantenimiento. | 3 | 2 | — | La razón se combina con el mantenimiento de la 16. |
| 20 | 1:48 | Pero hay otra razón. | 1 | 2 | — | Promete una segunda razón, sin contenido todavía. |
| 21 | 1:53 | Con una herramienta de código abierto, alguien tendría que dedicar entre un quinto y la mitad de su tiempo a cuidar el monitoreo. | 4 | 2 | — | Dos elementos nuevos (la cifra de tiempo y el costo en horas de una persona), combinados con la 16. |
| 22 | 2:01 | Ese tiempo también es un costo, aunque no figure en ninguna lista de precios. | 3 | 1 | — | Un concepto nuevo (costo que no es dinero), combinado con la 21. |
| 23 | 2:01 | A esto se le llama trade-off: lo que se gana con una opción junto con lo que se paga a cambio. | 4 | 2 | — | Un término en inglés y su definición, combinados con el costo de la 22. El término no vuelve en las lecciones 2, 3 y 11. |
| 24 | 2:12 | Aquí se gana tiempo del equipo, y se paga con dinero. | 2 | 2 | — | Aplica el trade-off a DataDog; sin elemento nuevo. |
| 25 | 2:16 | (adr) Veamos ahora cómo quedó escrita esa decisión. | 1 | 3 | — | Cambio de hilo anunciado, de la decisión a su registro. |
| 26 | 2:19 | Quedó en un documento corto que se llama ADR, el registro de una decisión de arquitectura. | 3 | 2 | — | Dos elementos nuevos: la sigla ADR y su definición. |
| 27 | 2:24 | Un ADR completo responde cuatro cosas. Primero, por qué había que decidir. | 3 | 2 | — | Dos elementos nuevos: el número de partes y la primera (por qué decidir). |
| 28 | 2:29 | Aquí, porque el sistema iba a crecer y había que agregar servidores a tiempo. | 3 | 1 | — | Un elemento nuevo (crecimiento que exige escalar a tiempo), combinado con la primera parte de la 27. |
| 29 | 2:34 | Después, las otras opciones y su costo. Luego, lo que cuesta lo elegido. | 3 | 2 | — | Dos partes nuevas: otras opciones con su costo, y costo de lo elegido. |
| 30 | 2:39 | Y por último, el requisito que pide la decisión, es decir, algo que el cliente pidió. | 4 | 2 | — | "Requisito" y su definición, combinados con el cliente de la 4. |
| 31 | 2:45 | (falta) Falta mirar qué tiene ese ADR: tiene las tres primeras partes y le falta la cuarta. | 2 | 2 | — | Sin elemento nuevo; aplica las partes de las ideas 27 a 30 a ADR-003. |
| 32 | 2:50 | Dice que el sistema crece rápido, pero no remite a ningún requisito del cliente. | 3 | 1 | — | Un paso nuevo (el ADR no remite a requisito), contrastado con la cuarta parte de la 30. |
| 33 | 2:55 | Cabe preguntarse si es una excepción. | 2 | 3 | — | Pasa de un ADR a todas las decisiones de los equipos, anunciado con una pregunta. |
| 34 | 2:55 | Contamos a mano las decisiones escritas de los equipos ganadores. | 3 | 2 | — | Método (conteo a mano) y población, sin el tamaño de la muestra (183 decisiones de 12 equipos). |
| 35 | 3:01 | Algo más de una de cada cuatro cita el requisito que la origina. | 4 | 2 | — | Una cifra y el criterio "cita el requisito", combinados con la 30 y la 34. |
| 36 | 3:05 | (cierre) Al comienzo dijimos que las decisiones que más pesan se toman antes de escribir código; la del monitoreo de Farmacy Food cabe en un documento corto. | 2 | 2 | — | Recapitula la 1 con puente explícito, y une el caso con el ADR de la 26. |
| 37 | 3:17 | En ese documento quedó escrito el tiempo que costaría la opción de código abierto. | 2 | 1 | — | Aplica lo dicho: el ADR registra el costo de tiempo de la 21. |
| 38 | 3:17 | Sin esa línea, habría parecido gratis. | 3 | 1 | — | Un paso contrafactual nuevo, combinado con la 37. |
| 39 | 3:24 | Con eso cambia de dónde se aprende. Además de los errores propios, se puede aprender de decisiones ajenas, si están escritas con su razón, su costo y su requisito. | 4 | 3 | — | Dos elementos nuevos (aprender de decisiones ajenas, cambio de fuente) combinados con las partes del ADR y con los errores de la 3; el puente a la 3 es una sola frase. |
| 40 | 3:35 | Así otra persona puede comprobarlas antes de apoyar nada encima. | 3 | 2 | — | Un elemento nuevo (comprobar una decisión ajena), combinado con la dependencia de la 12. |

## Lo que muestran los puntajes

1. **Carga 4 o más con fricción 3 o más: ideas 10 y 39.** La 10 es la entrada de Farmacy Food (1:09): tres elementos nuevos en una frase, justo después de que la 9 anunció el caso. La 39 (3:24) cambia de fuente de aprendizaje con dos conceptos nuevos, y su puente con la 3 es una sola frase.
2. **Fricción 3 o más con carga 3 o más: ideas 8, 10 y 39.** La 8 (0:57) afirma que los diseños son "en papel" con un "antes de seguir" que desvía de la ruta recién anunciada en la 6. Las ideas 6, 9, 15, 25 y 33 también tienen fricción 3, pero con carga 1 o 2: son transiciones anunciadas, casi todas de una línea.
3. **Pares seguidos con carga 4 o más: (4, 5), (10, 11) y (11, 12).** El primero, 0:20 a 0:31, pasa de la definición de kata al origen del material (O'Reilly, años y material escrito: carga 4 y 5). El segundo bloque, 1:09 a 1:23, es el pico de la lección: caso nuevo, "vigilar los servidores", "dos motivos" y "cuesta cambiarla", cuatro ideas de carga 3 a 4 en catorce segundos.
4. **Carga 5 sin ancla: ideas 5 y 7.** La 7 (0:49) nombra cuatro etapas (qué importa, dividir, conectar, proteger) y ninguna se explica; el espectador no tiene dónde colgarlas. La 5 junta O'Reilly, un rango de años y el material escrito. Ojo: la memoria del proyecto dice "nada de fechas exactas ni años", y DISENO-CURSO deja el rango 2020 a 2025 como único rango de años del guion. Conviene confirmarlo con Felix.
5. **Término o cifra sin base: ideas 17, 23 y 34 a 35.** "DataDog" (17) no dice qué es; la fuente lo describe como servicio SaaS de monitoreo. "Trade-off" (23, carga 4) no vuelve a aparecer en las lecciones 2, 3 y 11, aunque la 3 trata de renunciar. "Una de cada cuatro" (35) llega sin denominador: la 34 dice "decisiones escritas" pero no cuántas (183, de 12 equipos, según D7).
6. **Casos nuevos.** Solo hay un caso nuevo, Farmacy Food (idea 10), así que no hay pares a menos de dos minutos. Si DataDog cuenta como "producto" del criterio, la idea 17 (1:40) queda a 31 segundos de la 10 y forma par. La dejé en "—" porque la lista del brief son casos de las katas.

## Errores de hecho y contradicciones

- **Cifras: ninguna contradice la fuente.** "$15 USD per host, per month" (ADR-003, líneas 19 y 38); "0.2-0.5 time of a developer" (línea 35), que la narración dice como "entre un quinto y la mitad"; Status "Proposed" (línea 7); "fast growing system" (línea 10). Fuente: `katas-src/ArchColider/4.ADRs/003 Tracing and Monitoring Sytem.md`. ADR-003 tiene Status, Context, Alternatives, Decision y Consequences, y ningún requisito, así que "las tres primeras partes" es correcto.
- **E1, precisión (idea 35).** La narración dice "cita el requisito que la origina". La fuente de la cifra, `cursos/_corpus/dossiers/D7-decisiones-escritas.md`, línea 30, define "requisito citado" como remitir a un identificador o a un enlace a la sección de requisitos, y dice que "que el Context diga la necesidad con palabras no cuenta". La cifra 50 de 183 (27 %), línea 46, es correcta. La narración omite el criterio: "cita" puede leerse como "menciona la necesidad", y el Context de ADR-003 sí la menciona.
- **E2, interna (idea 8).** La narración afirma que los doce son "diseños en papel, no un sistema funcionando". La tabla de verificación (fila de la línea 85) dice que "ninguno se construyó ni se operó es lectura nuestra (no se narra)". La narración dice como hecho lo que la tabla reconoce como lectura propia. La base es `cursos/_corpus/DISENO-CURSO.md`, tabla "Lado de la demanda", fila "Rendimiento real", que lo presenta como límite del corpus. No lo verifiqué repo por repo.
- **E3, sin fuente (ideas 12 a 14).** Los dos motivos ("cuesta cambiarla", "no afecta a una función en particular") son criterio del curso, no lo que dice el ADR, y la tabla no tiene fila para ellos. Conviene marcarlos como criterio.
- **Contradicciones con otras lecciones: ninguna.** La descripción de Farmacy Food es igual en las lecciones 5 y 7 ("servicio de comidas preparadas que se entregan en refrigeradores inteligentes"), y la lección 11 repite "las cuatro partes" y "algo más de una de cada cuatro" en los mismos términos.

## Qué cambiaría

1. **Idea 7 (carga 5).** Dejar dos pasos: "Primero se decide qué importa en el pedido del cliente. Después, cómo se parte el sistema." Baja la carga de 5 a 3 o 4, y "partir" sirve de ancla para la lección 4 (dónde se corta un sistema).
2. **Ideas 11 a 13 (1:15 a 1:23).** Separar la decisión ("vigilar los servidores") del criterio ("dos motivos"), y dar el ejemplo del monitoreo que decide cuándo agregar servidores antes de nombrar la dependencia como motivo. Así el primer motivo no llega con la definición, el caso y el "dos motivos" a la vez.
3. **Ideas 8 y 39.** Mover la afirmación de "diseños en papel" a después de la kata (idea 4): ahí continúa el tema y la fricción baja de 3 a 2. Y en la 39, un puente explícito a "se aprenden equivocándose" (idea 3) antes de nombrar la fuente nueva.
4. **Ideas 35 y 23.** En la 35, dar el denominador ("50 de las 183 decisiones escritas de los doce equipos") y el criterio exacto ("remite a un requisito con número o enlace"); sube la carga a 5, pero es lo que da base a la cifra. En la 23, dejar el término "trade-off" para la lección 3 (renunciar, y hacer la cuenta) y decir acá solo "lo que se gana y lo que se paga" (carga de 4 a 2).
