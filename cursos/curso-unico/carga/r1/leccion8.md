39 ideas · duración 6:56 (415,8 s)

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Farmacy Family es una comunidad de salud que guarda perfiles personales y resultados médicos | 3 | 1 | Farmacy Family | Nombre propio nuevo con dato sensible; es la primera idea, no hay salto previo. |
| 2 | 0:07 | Farmacy Family es una mejora sobre Farmacy Food, un servicio de comidas en refrigeradores inteligentes | 3 | 2 | Farmacy Food | Segundo nombre propio nuevo en la misma frase; "es una mejora sobre" conecta, pero presenta dos casos a la vez. |
| 3 | 0:16 | Su equipo previó que un cliente pidiera borrar todos sus datos, y eso se complica porque los datos no están en un solo lugar | 2 | 2 | — | Requisito dicho en lenguaje llano; "y eso se complica, porque" es un paso lógico con conector. |
| 4 | 0:25 | El sistema está repartido en varias bases, cada una con sus respaldos, y borrar cada rastro es difícil, según el propio documento del equipo | 3 | 1 | — | Bases, respaldos y rastros en una cadena; sigue la complicación de la idea 3 sin cambiar de tema. |
| 5 | 0:37 | La decisión cabe en una línea: cada usuario tiene su clave de cifrado, en un almacén aparte, y todos sus datos van cifrados con ella | 4 | 2 | — | Clave por usuario, almacén aparte y cifrado en una sola frase; "la decisión que tomaron" anuncia el paso. |
| 6 | 0:48 | Como la clave es de cada persona, se borra a una sin tocar a las demás; y como nunca queda junto a los datos, quien tenga solo una de las dos cosas no puede leer nada | 4 | 2 | — | Dos consecuencias causales con abstracción; la segunda es deducción del curso y no está en la fuente. |
| 7 | 0:59 | Para eliminar todos sus registros alcanza con eliminar su clave | 2 | 2 | — | Conclusión corta que cierra la decisión; "para" enlaza con la idea 6. |
| 8 | 1:04 | (pregunta) Esa decisión contesta solo una de las cuatro preguntas que se le hacen a un dato que no se puede filtrar: dónde vive, quién lo ve completo, cuánto se conserva y cómo se borra | 4 | 3 | — | Marco nuevo con cuatro etiquetas y un salto de nivel de abstracción desde un caso concreto. |
| 9 | 1:15 | En Farmacy Family son las bases y los respaldos, con la clave en otro lugar | 2 | 2 | — | Primera respuesta del marco, con el caso de vuelta; una sola cosa nueva. |
| 10 | 1:26 | En Farmacy Family, quien decide quién puede leer los datos de una persona es su clave | 3 | 3 | — | Afirmación que la fuente no hace; responde "quién lo ve" con Farmacy Family y la idea 12 responde lo mismo con Sysops, contra la promesa de un caso distinto por pregunta. |
| 11 | 1:42 | Cada pregunta se ve mejor con un caso distinto, y aparece algo más: cómo la seguridad cambia la forma del sistema | 2 | 2 | — | Anuncio con un tema nuevo y sin ejemplo todavía; la carga es moderada. |
| 12 | 1:51 | (donde) Sysops Squad es el sistema de tickets de una empresa: un monolito viejo, todo en una pieza, que pierde tickets y se cae en los picos de uso | 4 | 3 | Sysops Squad | Caso nuevo con cuatro rasgos a la vez; cambio de caso anunciado por la promesa de la idea 11, con la pregunta 2 todavía abierta para Farmacy. |
| 13 | 2:02 | Ahí el dato sensible es la tarjeta de crédito; por guardarla puede exigir una auditoría PCI, que cuesta más cuantas más partes toquen la tarjeta | 4 | 2 | — | Sigla sin cifra, causal y un costo que depende de un número de partes; la fuente dice la parte más grande, no el número de partes (ver errores). |
| 14 | 2:14 | Por eso el equipo propone aislar la facturación en una pieza aparte, y la decisión queda como propuesta | 2 | 2 | — | Paso lógico con "por eso"; la aclaración de propuesta no suma carga. |
| 15 | 2:22 | Para editar su tarjeta, el cliente no necesita el número entero ni el código de seguridad: le alcanzan los últimos cuatro dígitos | 2 | 1 | — | Dato concreto con una cifra; responde la pregunta que la idea 14 acaba de abrir. |
| 16 | 2:34 | Cuando la escribe, el dato pasa enseguida a facturación; en la parte del cliente quedan cuatro dígitos y la tarjeta completa vive en un solo lugar | 3 | 2 | — | Flujo de dos pasos y una regla de ubicación; "así" enlaza con la idea 15. |
| 17 | 2:47 | (forma) La puerta de entrada es la pieza por la que pasan todas las llamadas a un grupo de servicios, donde se comprueba quién llama y qué permisos tiene | 3 | 3 | — | Herramienta nueva, definida en la misma idea; "se suma otra idea" cambia de tema (de datos a llamadas) con aviso. |
| 18 | 3:00 | La propuesta de Sysops Squad pone una puerta por cada dominio; la de facturación va primera por ser el mayor riesgo de seguridad, y la de administración sigue porque una intrusión afectaría a todo el negocio | 3 | 1 | — | Dos decisiones de orden (dominio y lista de candidatas) en una idea; "lista" puede leerse como orden de construcción. |
| 19 | 3:17 | (puerta) Farmacy Family también tiene una puerta de entrada, una para personas y otra para sistemas externos; las dos tienen el mismo riesgo: si alguien entra por otro camino, se saltea la puerta | 3 | 3 | — | Vuelta al caso del comienzo, anunciada como "el caso del comienzo"; dos decisiones y su riesgo común. |
| 20 | 3:33 | Por eso piden zero trust: ninguna llamada es de confianza solo por venir de dentro de la red, y cada una tiene que demostrar quién es y qué puede hacer | 3 | 2 | — | Término nuevo definido en la misma idea; "por eso" enlaza el riesgo con la solución. |
| 21 | 3:44 | Farmacy Food propone llevar esa idea hacia adentro: su sistema de pedidos es hoy un monolito, todo en una pieza, que más adelante se separaría en servicios | 3 | 2 | — | Vuelve a Farmacy Food con "esa idea" como puente; "todo en una pieza" contradice la fuente y la idea 22 (ver errores). |
| 22 | 3:55 | Cada llamada entre módulos lleva desde el principio identidad y permisos de quien llama, para que partirlo después no abra un hueco; también es propuesta | 4 | 2 | — | Módulos, identidad, permisos y separación futura en una frase; "módulos" choca con la idea 21. |
| 23 | 4:06 | (cuanto) MobilityCorp alquila scooters, bicicletas, autos y camionetas eléctricos en Europa | 3 | 3 | MobilityCorp | Caso nuevo con cuatro tipos de vehículos; el cambio de tema está anunciado con el título, pero no hay puente con la escena anterior. |
| 24 | 4:13 | Las fotos de devolución muestran matrículas y a veces personas, así que son datos personales; el reglamento europeo obliga a guardarlos solo el tiempo necesario | 3 | 2 | — | Dato personal y regulación en una idea; "así que" es el paso lógico. |
| 25 | 4:30 | Las fotos sirven de prueba en una disputa y para entrenar modelos, y la decisión que fija su plazo las separa en tres niveles | 3 | 2 | — | Dos usos y un anuncio de tres niveles antes de describirlos; "también" enlaza. |
| 26 | 4:37 | Las originales se guardan 180 días, y hasta dos años si hay una disputa abierta | 4 | 1 | — | Dos cifras y una condición; la condición está simplificada respecto de la fuente (ver errores). |
| 27 | 4:43 | Las copias de trabajo, que son miniaturas y versiones anotadas, duran 90 días; los conjuntos para entrenar van anonimizados, con caras y matrículas difuminadas | 3 | 1 | — | Dos niveles con cifra y definición; continúa la lista de niveles. |
| 28 | 4:55 | Descartaron guardar todo para siempre y borrar al revisar; el riesgo que admiten es una disputa tardía | 3 | 2 | — | Dos alternativas rechazadas con sus motivos y un riesgo; "descartaron" abre un bloque nuevo de argumento. |
| 29 | 5:08 | (plazo) Lectura nuestra: el plazo es una tabla en la que cada nivel tiene su propósito y su plazo | 3 | 3 | — | Salto de un caso concreto a una abstracción, marcado como lectura propia. |
| 30 | 5:15 | La disputa, que según el curso es la necesidad que más tiempo pide, estira las originales hasta dos años, y el almacenamiento aplica los plazos con reglas automáticas | 3 | 1 | — | Ranking de necesidades que la fuente no hace; continúa la idea de la tabla. |
| 31 | 5:26 | (borrar) Vuelve la pregunta del comienzo: cuando un cliente de Farmacy Family pide borrarse, se elimina su clave | 2 | 2 | — | Cierre de hilo con puente explícito; carga baja porque es la regla del gancho. |
| 32 | 5:33 | Sin la clave, lo cifrado es ilegible en cualquier base y respaldo; queda irrecuperable del todo cuando se borran también los respaldos de la clave o de los datos | 4 | 1 | — | Dos estados distintos (ilegible e irrecuperable) con una condición de respaldos; la diferencia no se explica. |
| 33 | 5:44 | El costo está en la misma decisión: hace falta una memoria temporal con datos sin cifrar, y si una clave se filtra, borrarla ya no garantiza el borrado | 3 | 2 | — | Dos costos en una idea; "el costo" enlaza con la decisión de las ideas 5 y 6. |
| 34 | 5:57 | MobilityCorp va por el otro lado: indexa cada foto por alquiler, cliente y vehículo, y así encuentra y borra todas las copias de una persona | 4 | 3 | — | Contraste con otro caso y otro método, con tres claves de índice y las copias; "va por el otro lado" anuncia el cambio sin puente de contenido. |
| 35 | 6:06 | Las dos formas funcionan si se deciden antes de guardar | 2 | 1 | — | Conclusión corta que resume la comparación. |
| 36 | 6:10 | (cierre) La clave por usuario de Farmacy Family se decidió antes de que existiera un solo dato | 2 | 2 | — | Afirmación temporal que la fuente no sostiene (ver errores); "la del comienzo" vuelve al caso para cerrar. |
| 37 | 6:17 | Lo deducimos nosotros: agregar un cifrado por usuario a datos ya repartidos daría mucho más trabajo | 3 | 1 | — | Deducción propia marcada como tal; la carga viene del planteo contrafactual. |
| 38 | 6:25 | En Sysops la tarjeta vive en una pieza y el resto ve cuatro dígitos; cada foto de MobilityCorp tiene su plazo; y a un cliente de Farmacy Family se lo borra eliminando una clave | 3 | 2 | — | Repaso de tres casos en una idea; vuelve a los tres ya vistos, cada uno con su pregunta. |
| 39 | 6:40 | (cierre) Borrar a una persona parecía una búsqueda por todas las bases y respaldos; con las cuatro preguntas contestadas antes del primer dato, el diseño ya dejó dicho dónde está cada dato y cómo se borra | 3 | 2 | — | Reabre el planteo del gancho y lo cierra con dos conclusiones en una frase. |

### Lo que muestran los puntajes

1. **Carga de 4 o más con fricción de 3 o más:** ideas 8, 12 y 34. En las tres el espectador tiene que sostener un marco o un caso nuevo y además cambiar de hilo en la misma escena: el marco de las cuatro preguntas (8), Sysops Squad mientras la pregunta 2 sigue abierta (12) y el método de MobilityCorp como contraste (34).

2. **Fricción de 3 o más con carga de 3 o más:** ideas 8, 10, 12, 17, 19, 23, 29 y 34. Seis de las ocho abren una escena nueva o vuelven a un caso (8, 12, 17, 19, 23, 29). El patrón es que cada cambio de escena trae un caso o un nivel nuevo, y el puente que lo enlaza es una frase.

3. **Pares seguidos con carga de 4 o más:** ideas 5-6 (la clave por usuario y sus dos consecuencias, de 0:37 a 0:58, sin ejemplo entre ambas) e ideas 12-13 (Sysops Squad y la auditoría PCI, de 1:51 a 2:14). En cada par se suman dos conceptos nuevos sin un caso que los ancle.

4. **Pares de casos nuevos a menos de dos minutos:** idea 1 (Farmacy Family, 0:01) con idea 2 (Farmacy Food, 0:07), y idea 2 con idea 12 (Sysops Squad, 1:51). Tres casos en menos de dos minutos, y Farmacy Food entra solo como referencia de otro caso. MobilityCorp (idea 23, 4:06) queda 2:15 después de Sysops, justo por encima del umbral.

5. **La pregunta 2 tiene dos respuestas de casos distintos:** ideas 10 y 12. "Quién lo ve completo" se responde con la clave de Farmacy Family y, después, con la pieza de facturación de Sysops Squad. El marco promete un caso distinto por pregunta, así que el espectador no sabe qué respuesta vale.

### Errores de hecho y contradicciones

1. **Farmacy Food, monolito (idea 21).** La narración dice "un monolito, todo en una pieza". La fuente dice otra cosa: `C:\Users\felix\dev\katarch-corpus\ArchColider-src\4.ADRs\006 Zero trust architecture.md` l. 13: "The _ordering system_ is implemented as a modularized monolith and those modules will eventually be extracted to become dedicated services". La decisión que lo fija está en `ArchColider-src\4.ADRs\002 System approach.md` l. 39: "modularized monolith is the best option for now". La lección 9 la enseña con ese nombre (monolito modular). Dentro de la lección 8 hay contradicción: la tabla de verificación dice "monolito modular", la idea 22 habla de "llamadas entre módulos" y la narración dice "todo en una pieza".

2. **Sysops Squad, auditoría PCI (idea 13).** La narración dice que la auditoría "cuesta más cuantas más partes toquen la tarjeta". La fuente dice lo contrario en lo que mide: `C:\Users\felix\dev\katarch-corpus\Team-7-src\ADR\ADR-4-extract-billing-quanta.md` l. 8: "The bigger part of the system deals with credit card data, the more onerous the procedure is". Es el tamaño de la parte que maneja tarjetas, no el número de partes. La lección 4 lo dice bien: "cuanto más grande es la parte que toca esas tarjetas, más pesada es la auditoría".

3. **MobilityCorp, dos años (ideas 26 y 30).** La cifra es correcta: `C:\Users\felix\dev\katarch-corpus\Five-Nines-src\adrs\ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md` l. 39: "Up to 2 years only when linked to an active dispute, chargeback, insurance claim, or legal request". La narración reduce la condición a "una disputa abierta" y deja fuera el cargo, el reclamo de seguro y el pedido legal. La propia tabla de verificación de la lección cita la condición completa. La lección 11 repite la versión reducida.

4. **Afirmaciones que la fuente no sostiene y la tabla no marca como deducción:**
   - Idea 10, "quien decide quién puede leer los datos de una persona es su clave". `C:\Users\felix\dev\katarch-corpus\Archangels-src\4.ADRs\005-use-crypto-shredding.md` l. 21-23 dice que la clave está aparte y que borrarla deja los datos irrecuperables; no dice que la clave controle la lectura.
   - Idea 36, "se decidió antes de que existiera un solo dato". La misma ADR tiene fecha (2021-10-21) pero no dice nada sobre cuándo había datos.
   - Idea 30, "la necesidad que más tiempo pide". Esa ADR (l. 39) lista cuatro disparadores sin ordenarlos.

### Qué cambiaría

1. **Dos correcciones de hecho.** En la idea 21, decir "un monolito modular: módulos dentro de una sola aplicación, que se separarían en servicios". En la idea 13, usar el planteo de la lección 4: la auditoría pesa más cuanto más grande es la parte del sistema que maneja tarjetas.

2. **Una respuesta por pregunta.** O se quita la respuesta de la clave a "quién lo ve completo" (ideas 10 y 36), o se marca como deducción y se deja esa pregunta para Sysops Squad. Si se mantiene la regla de un caso por pregunta, Farmacy Family responde solo la primera.

3. **Partir y poner puente donde se acumula la carga.** Dividir la idea 6 en dos, marcando como deducción la segunda. Antes de MobilityCorp en la idea 34, poner una frase que diga que hay otra forma de borrar y por qué se la compara con la de Farmacy Family.

4. **Condiciones completas.** En la idea 26, enumerar las cuatro condiciones de los dos años (disputa, cargo, reclamo de seguro o pedido legal, cada una con su caso). En la idea 30, quitar el ranking de necesidades.
