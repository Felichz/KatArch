# Carga cognitiva y fricción · Lección 5 · De quién es cada dato

37 ideas · 5:27 de duración (326,6 s, `video/ch5/timing.js`).

Tiempo = inicio de la primera palabra de la idea, redondeado hacia abajo. Las filas de escena dan el inicio de cada escena en el timing. Las enumeraciones (tres decisiones, tres costos) cuentan como una sola idea.

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:00 | | | | |
| 1 | 0:01 | ClearView decide que varios de sus servicios compartan una base de datos | 2 | 1 | Caso ya presentado en la lección 1; "base compartida" se entiende sin definirla. Apertura |
| 2 | 0:06 | En esa misma decisión anota el riesgo: acoplamiento caótico, donde cualquiera cambia cualquier cosa | 3 | 2 | "Acoplamiento" aparece sin definir y se explica solo con la metáfora. Conector "eso puede llevar a" |
| 3 | 0:13 | Por eso escribe una segunda decisión: una sola regla, un único servicio con derecho a escribir cada objeto | 3 | 2 | "Objeto de la base" sin definir; la regla es abstracta. "Por eso" enlaza |
| 4 | 0:24 | La regla se impone con los permisos de la base, y no es solo una buena intención | 2 | 1 | Continúa la regla. Afirma como hecho lo que ADR-015 pide ("should be enforced"); ver hallazgo 3 |
| **pregunta** | 0:30 | | | | |
| 5 | 0:31 | Cuando un sistema se parte, los datos también se reparten: aparecen tres decisiones (compartir o separar, qué se pierde, dónde está la línea del retraso) | 3 | 3 | Cambio de hilo anunciado, de un caso a un principio. "Línea" y "retraso" usados sin definir |
| **compartir** | 0:44 | | | | |
| 6 | 0:44 | ClearView elige pocos servicios grandes y una base compartida, por viabilidad: poco dinero y equipo chico | 3 | 2 | Vuelve al caso. "Viabilidad" viene de la lección 2. "Equipo chico" no está en el texto de Pragmatic (hallazgo 3) |
| 7 | 0:58 | Su objeto principal, la versión anonimizada del currículum, lo usan cuatro servicios | 3 | 1 | Cifra cuatro: correcta (ADR-014). "Objeto principal" es término nuevo, y las fuentes no coinciden sobre qué es el story (hallazgo 3) |
| 8 | 1:05 | El riesgo de compartir es que nadie sepa quién dejó un dato en un estado raro; la regla de un escritor por objeto ataca eso | 3 | 2 | Riesgo y regla en una frase; liga con la idea 3 |
| 9 | 1:14 | Leer puede leer cualquiera; escribir, solo el dueño. El costo: documentar a los dueños del esquema y configurar permisos | 2 | 1 | Dos reglas y un costo; continuación directa de la 8 |
| 10 | 1:24 | El currículum original lo guarda un solo servicio, y nadie más tiene permiso para leerlo | 3 | 2 | "Dato más delicado" sin contexto. "Nadie más" va más allá de ADR-010 y contradice la lección 8 (hallazgos 3 y 4) |
| **separar** | 1:32 | | | | |
| 11 | 1:32 | Sysops Squad toma el camino contrario: separa las bases de clientes, operación, facturación y reportes | 3 | 3 | Cambio de caso anunciado con "contrario". El mismo desglose ya está en la lección 4 (hallazgo 4). Team 7 lo deja como "Proposed" |
| 12 | 1:43 | El costo es mantener sincronizados los datos que más de una parte necesita | 2 | 2 | Costo de separar; paso lógico con "también" |
| 13 | 1:50 | No lo hicieron de una vez: separar exige un esfuerzo grande, así que planearon dos fases | 2 | 2 | Conector "pero". "Dos fases" es cifra correcta (Team 7 README l. 287-290) |
| 14 | 1:58 | En la primera fase se quedan con una base única hasta que sea un cuello de botella; en la segunda separan | 2 | 1 | Continúa la idea de fases. "Cuello de botella" coloquial, sin medida |
| 15 | 2:06 | Separar los datos puede ser un orden y no un salto, con la condición para el siguiente paso escrita | 3 | 2 | Abstracción (orden contra salto). Presenta como virtud una condición que la lección 9 considera no comprobable (hallazgo 4) |
| **quanta** | 2:12 | | | | |
| 16 | 2:12 | Hey Blue!, caso de monArch, agrega un matiz: cada servicio es dueño de sus datos, con una excepción | 3 | 3 | Cambio de caso anunciado con "agrega un matiz". Hey Blue! se presentó en la lección 2 |
| 17 | 2:20 | El servicio que carga los datos de comercios y el que canjea puntos comparten una base de ofertas, y por eso cuentan como una sola unidad independiente | **4** | 2 | Dos servicios nuevos (ETL, Rewards), base compartida y "unidad independiente" sin nombrar el quantum de la lección 4. Tres pasos causales en una frase |
| 18 | 2:34 | El equipo consideró partir esa base en dos, una para datos maestros y otra para canjes, y lo descartó | 3 | 2 | "Datos maestros" sin definir. "Lo descartó" no coincide con la fuente (hallazgo 3) |
| 19 | 2:43 | Separarlas no cambia mucho, porque los dos servicios dependen del mismo significado de los datos: el acoplamiento está en lo que los datos quieren decir, no solo en dónde se guardan | 3 | 1 | Argumento abstracto ("significado de los datos") sin ejemplo. Continúa la 18 |
| **atomicidad** | 2:54 | | | | |
| 20 | 2:54 | Con una sola base, varios cambios se hacen en una transacción, que se aplica entera o no se aplica | 3 | 3 | Cambio de hilo anunciado: de los datos repartidos a lo que se pierde. "Transacción" sin definir |
| 21 | 3:03 | Al repartir los datos, esa garantía desaparece: un cambio llega a la otra parte por un evento y durante un rato no coinciden. A eso se le llama consistencia eventual | 3 | 2 | Evento y consistencia eventual en una idea. El término se define en el mismo párrafo |
| 22 | 3:18 | Hey Blue! lo escribió con todas las letras: renuncian a la atomicidad de los flujos a cambio de consistencia eventual | 2 | 2 | Vuelve al caso monArch, un minuto después. La fuente (ADR05) está en "Proposed" y la lección la trata como decisión firme |
| 23 | 3:26 | Aceptan datos y código duplicados, y admiten que una transacción se puede perder si un servicio está caído. Son tres costos, escritos en la misma decisión | 3 | 1 | Lista de tres costos, citas exactas (ADR05 l. 29-31). Continúa la 22 |
| **agregados** | 3:37 | | | | |
| 24 | 3:38 | MobilityCorp da la regla más fácil: cada grupo de datos que cambia junto, como una reserva con su pago autorizado, se guarda en una transacción, con consistencia fuerte | **4** | 3 | Cambio de caso sin puente. "Grupo de datos" es el agregado, sin nombrarlo. El pago autorizado no entra en la transacción (hallazgo 3) |
| 25 | 3:49 | Entre grupos distintos, como la reserva y la disponibilidad del vehículo, los cambios viajan por eventos y la consistencia es eventual | 3 | 1 | Dos grupos nuevos. Continuación de la regla |
| 26 | 3:58 | La razón es evitar transacciones distribuidas, que coordinan varias bases a la vez y son caras y frágiles | 3 | 2 | "Transacciones distribuidas" sin definir. La razón coincide con 3_Domain_Model ("Prevents distributed transactions") |
| 27 | 4:05 | La disponibilidad del vehículo se pone al día por evento, porque ese camino no es crítico | 3 | 1 | Ejemplo de la regla. Retoma "crítico" y deja el criterio para más adelante. Fuente en contradicción (hallazgo 3) |
| **linea** | 4:12 | | | | |
| 28 | 4:13 | Queda la decisión más práctica: qué datos pueden quedar desactualizados un rato, y cuáles no | 2 | 2 | Cambio de hilo que sí se anuncia. Paso lógico |
| 29 | 4:19 | Farmacy Food trata tres datos de tres maneras distintas, y eso permite ver la línea | 3 | 3 | Cambio de caso desde MobilityCorp. Farmacy Food se presentó en la lección 1 |
| 30 | 4:24 | El catálogo de comidas se guarda en el teléfono y puede estar viejo, porque la disponibilidad real se comprueba al pagar | 3 | 1 | Continúa el caso. Fuente correcta (ArchColider 013, Tradeoffs 1) |
| 31 | 4:32 | El stock de cada heladera viene de un sistema externo que puede dejar de mandar datos, así que se guarda una copia propia que se corrige cuando llegan datos nuevos | **4** | 1 | Tres elementos (sistema externo, copia propia, corrección) y el caso de las heladeras, que la lección 7 retoma después. "Heladera" es voseo rioplatense: el curso va en español neutro |
| 32 | 4:42 | El pago no admite ninguna demora ni ningún duplicado | 3 | 2 | Afirmación fuerte, contraria a ADR-008 ("at least once delivery", "slightly decrease performance") y a la lección 7 (hallazgo 3) |
| 33 | 4:45 | Spotlight pone en una frase el criterio que separa esos casos | 2 | 3 | Cambio a otro caso dentro de la misma escena, presentado como criterio general. Spotlight se presentó en la lección 3 |
| 34 | 4:49 | La consistencia eventual es aceptable cuando no hay en juego información crítica, de esa que afecta vidas o dinero | 3 | 1 | Criterio general tomado de una frase de Spotlight sobre su propio trade-off. El stock de Farmacy tiene riesgo de compensación (hallazgo 5) |
| **cierre** | 4:55 | | | | |
| 35 | 4:56 | La regla de un solo escritor de ClearView tiene algo que la mayoría de las reglas de diseño no tienen: se puede comprobar | 2 | 2 | Vuelve al caso de la apertura, con un puente explícito |
| 36 | 5:04 | Si un servicio intenta escribir un objeto que no es suyo, la base de datos se lo impide, y el error aparece el primer día | 2 | 1 | Afirma como hecho lo que ADR-015 pide que se haga. El corpus no muestra que los permisos estén configurados (hallazgo 3) |
| 37 | 5:15 | Los datos repartidos tienen que viajar de una parte a otra, y cómo viajan es otra decisión | 2 | 2 | Puente a la lección 6, sin contenido propio. Aceptable |

## Lo que muestran los puntajes

1. **Los picos de carga aparecen cuando dos cosas nuevas llegan juntas** (ideas 17, 24 y 31, todas con carga 4). En la 17 entran ETL, Rewards, una base compartida y una "unidad independiente" que es el quantum de la lección 4, sin nombrarlo. En la 24, el agregado (sin nombre), la transacción y el pago autorizado llegan en la misma frase. En la 31, un sistema externo, una copia propia y su corrección, sobre el caso de las heladeras que la lección 7 desarrolla después.

2. **Hay siete cambios de caso o de hilo con fricción 3 en 5 minutos** (ideas 5, 11, 16, 20, 24, 29 y 33). Los casos se suceden así: ClearView, Sysops Squad, Hey Blue!, transacciones en general, MobilityCorp, Farmacy Food, Spotlight y de vuelta a ClearView. Son seis casos en 5:27. El tramo peor es "La línea": de Farmacy Food a Spotlight hay 26 segundos (ideas 29 a 33), y el criterio de Spotlight se dice sin que el espectador esté en su caso.

3. **Hay afirmaciones que la fuente no sostiene** (ideas 4, 6, 7, 10, 18, 24, 27, 32, 36):
   - Ideas 4 y 36: ADR-015 dice "This should be enforced with DB permissions", una prescripción. El corpus no muestra que los permisos existan. La lección lo cuenta como hecho y el cierre se apoya en eso.
   - Idea 10: ADR-010 dice que el acceso al currículum "requires special privileges which are not given to the matching service". La restricción es para el emparejamiento, no para "nadie más". ADR-019 (Accepted) además da a Analytics lectura directa de la base de Job candidate.
   - Idea 18: MonArch `Readme.md` l. 182 dice que separar la base "does not do much to reduce the contract coupling", y que el diagrama muestra dos bases "for clarity and semantic reasons". Lo que descartaron es el argumento de desacoplar, no la separación en el diagrama. "Lo descartó" es inexacto.
   - Idea 24: en `4_Sequence_Diagram.md` (SD-001), el `CreatePreAuth` ocurre antes del `BEGIN TRANSACTION` (l. 46). La transacción guarda solo el `preAuthToken`. El pago autorizado no entra en la transacción. La lección 6 lo describe bien ("pide primero... una autorización previa, y espera la respuesta").
   - Idea 27: la misma SD-001 hace `UPDATE vehicle SET status='reserved'` dentro de la transacción (l. 48), mientras `3_Domain_Model.md` pone la disponibilidad detrás de `ReservationCreated` como consistencia eventual. Las dos fuentes se contradicen, y la lección sigue el modelo de dominio sin decirlo. Hace falta una decisión de Felix.
   - Idea 7: ADR-011 define Story como "Anonymized format of the resume as text", pero `C2-container.md` dice que las S.M.A.R.T stories se generan a partir del currículum anonimizado. La lección sigue ADR-011; conviene decir cuál es.
   - Idea 6: "equipo chico" no aparece en el texto de Pragmatic (el equipo está en una imagen). "Poco dinero" sí (`Characteristics.md` l. 47-54).
   - Ideas 11 y 22: Team 7 ADR-6 y ADR-7 están en "Proposed", y MonArch ADR02 y ADR05 también. La lección los presenta como decisiones cerradas.
   - Idea 32: ADR-008 dice "at least once delivery" y "It will slightly decrease performance". La lección dice "ninguna demora ni ningún duplicado". Según la fuente, el duplicado se descarta por identificador y versión; no es que no haya.
   - Cifras: cuatro servicios (ADR-014 lista Job candidate, Story, Matching y Employer), tres costos (ADR05 l. 29-31) y dos fases (Team 7 l. 289) son correctas. Ninguna cifra cambia de sentido.

4. **Contradicciones con otras lecciones**, sobre los mismos casos:
   - Idea 10 (lección 5) contra la lección 8, l. 41: "La parte de analítica lee directo de la base de candidatos". La fuente confirma la lección 8 (ADR-019). Hay que matizar la 5 o la 8.
   - Idea 24 (lección 5) contra la lección 6 y la lección 7: la 6 dice que la reserva espera la autorización previa, y la 7 que confirma la transacción y después publica el evento. La 5 mete el pago en la transacción. Gana la 6 y la 7.
   - Idea 32 (lección 5) contra la lección 7: la 7 dice "Llega al menos una vez, y el duplicado se descarta por identificador y versión". Gana la 7.
   - Idea 15 (lección 5) contra la lección 9: la 9 dice que "cuello de botella" es una de tres condiciones que "ninguna se puede comprobar". La 5 presenta la misma condición de Sysops como ejemplo de condición escrita. Son posturas opuestas sobre la misma frase.
   - Idea 11 (lección 5) repite la lección 4, que ya dice que Sysops Squad "lo muestra con sus cuatro áreas".

5. **El criterio de Spotlight no separa los casos de Farmacy** (ideas 33 y 34). La frase de Spotlight (`npo-candidate.md` l. 53-54: "not dealing with mission critical information (such as affecting human life / money)") es un trade-off propio, no un criterio general. La lección lo generaliza. Además, el stock de Farmacy, que la lección pone como consistencia eventual aceptable, tiene riesgo de "compensation by coupons" (ADR-012 l. 29-30). Hay dinero en juego y el criterio no lo excluye. El propio ejemplo contradice la regla.

## Qué cambiaría, en orden de impacto

1. **Corregir las afirmaciones de los hallazgos 3 y 4, sin mover escenas.** En la lección 5: "se impone" pasa a "el ADR pide que se imponga con permisos"; "nadie más tiene permiso" pasa a "el emparejamiento no tiene permiso" (ADR-010); "lo descartó" pasa a "lo dejó en el diagrama, pero no reduce el acoplamiento"; el pago sale de la transacción y entra su referencia; "ningún duplicado ni demora" pasa a "llega al menos una vez y el duplicado se descarta". En la lección 8 hay que matizar la lectura de analítica. La fuente del vehículo (SD-001 frente a 3_Domain_Model) se decide antes de grabar la escena de MobilityCorp.

2. **Mover el bloque de Hey Blue! (ideas 16 a 19, de 2:12 a 2:55) a la lección 4**, "Dónde se corta un sistema", donde ya aparecen quantum y dependencias síncronas (l. 33). En la lección 5 queda una frase de referencia. Así sale la idea de carga 4 (17) y un caso de los cuatro cambios de hilo de la escena quanta.

3. **Cortar la enumeración de las cuatro bases de Sysops Squad (idea 11, 1:32) y remitirla a la lección 4**, que ya la dice (l. 21). Queda la idea de costo (12) y la de fases (13). En la idea 15, quitar "con la condición para el siguiente paso escrita" o reemplazarla por la condición concreta de la fuente, y dejar a la lección 9 la discusión de si esa condición se puede comprobar.

4. **Cambiar la cita de Spotlight (ideas 33 y 34, en "La línea") por el criterio de Farmacy Food en el mismo caso**: el pago es un escenario de negocio crítico (ADR-008) y el stock tiene riesgo de compensación (ADR-012). Así se quita el tercer cambio de caso en 26 segundos (fricción 3) y el criterio queda respaldado por el ejemplo que lo ilustra. El cambio es dentro de la lección 5.
