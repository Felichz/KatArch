# Carga cognitiva y fricción: lección 1, "Qué es una decisión de arquitectura"

40 ideas, duración 7:22 (442 s, según `video/ch1/timing.js`, modo voz).

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **intro** | 0:01 | | | | |
| 1 | 0:01 | Es un curso sobre el diseño de un sistema entero, no de un lenguaje ni de una herramienta, y trata de las decisiones que lo forman | 2 | 1 | Lista de cuatro temas (partes, comunicación, fallas, datos) sin explicar; es la apertura |
| 2 | 0:21 | Estas decisiones se aprenden con los años, equivocándose | 1 | 1 | Afirmación general, sin nombres ni cifras |
| 3 | 0:27 | El material son los equipos que ganaron las Architecture Katas de O'Reilly, 2020 a 2025 | 3 | 3 | "Katas" aparece sin definir; se define recién en la idea 9 |
| 4 | 0:38 | Se leyeron sus doce repositorios y se quedó lo que se repite y se sostiene | 2 | 2 | Método: paso lógico con conector ("Leímos", "nos quedamos") |
| **ruta** | 0:46 | | | | |
| 5 | 0:46 | Objetivo: frente a un sistema nuevo, decidir qué hay que decidir, en qué orden, y justificarlo con lo que cuesta | 2 | 2 | Objetivo abstracto, sin nombres; conector "La idea es que" |
| 6 | 0:55 | Primera mitad del recorrido: qué importa y a qué se renuncia; dónde se corta; de quién es cada dato; cómo se hablan las partes y qué pasa cuando algo falla | **4** | 2 | Cinco temas nuevos encadenados (renuncia, corte, dueño del dato, comunicación, fallas) sin explicar. Enumeración del mismo tipo, cuenta como una idea |
| 7 | 1:10 | Segunda mitad del recorrido: datos sensibles, comprar o construir y cambiar después, modelos de IA, y qué queda escrito | **4** | 1 | Continúa la lista, pero suma "modelo de inteligencia artificial" y "comprar hecho" sin definir |
| 8 | 1:29 | Esta lección pone las bases: qué hace que una decisión sea de arquitectura, cómo se deja escrita, y los cinco casos del curso | 2 | 2 | Anuncia el contenido; los "cinco casos" se prometen sin nombrarlos |
| **kata** | 1:37 | | | | |
| 9 | 1:37 | Una kata es un ejercicio: un caso de negocio, un cliente que responde preguntas, equipos pequeños con pocas semanas | 3 | 3 | Cambio de sección ("De dónde sale el material") y definición de un término usado en la idea 3 |
| 10 | 1:49 | Lo que dejan son documentos, diagramas y decisiones escritas; son diseños en papel, juzgados por expertos, que nadie construyó ni operó | 3 | 1 | Continuación natural; "nadie construyó ni operó" es una limitación abstracta que el espectador debe retener |
| 11 | 2:03 | "Responde en menos de un segundo" es un cálculo, no una medición, y eso cambia cómo se lee cada ejemplo | 3 | 2 | Distinción nueva (cálculo y medición) sin ejemplo; "Eso cambia" es paso lógico |
| 12 | 2:12 | Que varios ganadores hagan lo mismo no prueba que sea correcto, porque comparten plantillas y vocabulario; por eso el curso muestra la razón, el costo y cuándo deja de valer | 3 | 2 | "Plantillas y vocabulario compartidos" no se explican; la idea se cierra con "Por eso" |
| **decision** | 2:26 | | | | |
| 13 | 2:26 | No toda decisión es de arquitectura: el nombre de una variable no lo es; compartir una base de datos entre dos partes, sí | 2 | 3 | Cambio de sección ("Qué la hace de arquitectura") anunciado por el encabezado |
| 14 | 2:36 | Una decisión de arquitectura cuesta mucho cambiarla porque otras se apoyan en ella, y afecta a cualidades del sistema entero: rapidez, disponibilidad, costo, quién ve qué | 3 | 1 | Dos criterios y cuatro cualidades que hay que sostener a la vez; continuación de la idea 13 |
| 15 | 2:56 | Esas cualidades tiran en direcciones distintas. Team 7 abrió su documentación con la "primera ley de la arquitectura de software" | 3 | 2 | Primera aparición de "Team 7", nombre de equipo con número, que no se conecta con ningún caso del curso (Sysops Squad, idea 34) |
| 16 | 3:07 | Todo en arquitectura es un trade-off: cada vez que se gana algo, se paga con otra cosa | 3 | 2 | "Trade-off" aparece en la cita antes de definirse; la definición llega en la misma frase, con "O sea" |
| 17 | 3:14 | No existe la opción sin costo, así que decidir bien es saber qué se paga y por qué conviene pagarlo | 2 | 1 | Conclusión de la idea 16, sin nombres |
| **ejemplo** | 3:21 | | | | |
| 18 | 3:21 | El equipo ArchColider diseñaba el sistema de pedidos de una cocina de comida a domicilio, y tenía que elegir con qué vigilar sus servidores | **4** | 3 | Caso nuevo con dos nombres (equipo ArchColider, cocina que luego se llama Farmacy Food en la idea 35) sin decir que son lo mismo. Sube por nombre de equipo, dominio y tema (monitoreo) |
| 19 | 3:31 | Cuatro opciones: Grafana y ELK gratis; "la de Amazon", a centavos por métrica; DataDog, a quince dólares por servidor al mes | **4** | 2 | Cuatro herramientas y tres precios en una frase. "La de Amazon" se llama CloudWatch recién en la idea 23, sin puente |
| 20 | 3:44 | Eligieron DataDog, la más cara, con una razón escrita en una frase: sin una opción gratis, alguien dedicaría entre un quinto y la mitad de su tiempo al monitoreo | 3 | 2 | El costo oculto (tiempo de una persona) es el concepto central del ejemplo; paso lógico con "Con una opción gratuita" |
| **adr** | 4:01 | | | | |
| 21 | 4:01 | ArchColider dejó esa decisión en un ADR, documento de una página con un formato que usan los doce ganadores (architecture decision record) | 3 | 2 | Término nuevo, sigla definida en la misma frase; el formato compartido se afirma sin mostrarlo |
| 22 | 4:14 | Un ADR completo responde cuatro cosas: por qué había que decidir, qué otras opciones había, qué cuesta lo elegido y qué requisito lo pide | 3 | 2 | Enumeración de cuatro partes que se usa en todo el curso; "requisito" es el concepto más abstracto de la lista |
| 23 | 4:26 | En el ADR, el sistema crecía rápido y escalar a tiempo dependía de ver cada servidor; las alternativas eran Grafana, ELK y CloudWatch, con precio | **4** | 3 | Cadena causal (crecer, escalar, monitorear) y nombre nuevo de la alternativa de la idea 19. Vuelve a "la de Amazon" con otro nombre sin decir que es la misma |
| 24 | 4:39 | Lo que cuesta lo elegido: el ADR admite que los quince dólares pueden subir. El requisito que la pide se anuncia y se verifica después | 2 | 1 | Continuación directa; anuncia la cuarta parte que el ADR no cumple |
| **falta** | 4:45 | | | | |
| 25 | 4:45 | El ADR de ArchColider tiene las tres primeras partes y le falta la cuarta: no cita ningún requisito del cliente | 2 | 2 | Vuelve al mismo ADR con el puente "Ese ADR"; lo que falta ya fue anunciado |
| 26 | 4:55 | La cuarta parte es la que más falta: se contaron las cuatro partes en 183 decisiones de los doce ganadores | **4** | 3 | Cambio de caso (un ADR) a un universo de 183 decisiones y a un método de conteo que no se explica (conteo a mano) |
| 27 | 5:04 | Nueve de cada diez admiten algún costo; algo más de la mitad nombra una alternativa descartada; uno de cada cuatro cita el requisito | **4** | 1 | Tres porcentajes de tres criterios en una sola frase; las cifras son correctas (91, 52 y 27 %, D7 §2.1) |
| 28 | 5:14 | Lo que más se escribe es el costo, y lo que menos, el vínculo con el requisito | 2 | 2 | Conclusión "O sea", paso lógico |
| 29 | 5:20 | Cada lección deja una o dos decisiones escritas, y la última muestra qué se pierde si falta cada parte | 2 | 2 | Promesa de estructura del curso, sin nombres |
| **elenco** | 5:32 | | | | |
| 30 | 5:32 | El curso se apoya en cinco casos que vuelven, para no saltar de un negocio a otro | 2 | 3 | Cambio de sección ("Cinco casos que vuelven") que cambia de hilo, de la métrica al elenco |
| 31 | 5:39 | Cada caso se eligió porque tiene un problema que obliga a decidir algo distinto | 2 | 1 | Criterio de elección, sin nombres |
| 32 | 5:45 | MonitorMe, un sistema para hospitales que muestra los signos vitales de "cientos de pacientes" en la estación de enfermería en un segundo o menos, y no puede apagarse | **4** | 2 | Caso con nombre, cifras (cientos, un segundo) y un requisito de disponibilidad en una frase. La cifra de estación no coincide con la fuente (ver hallazgo 5) |
| 33 | 5:56 | ClearView, una ONG que vive de donaciones, usa IA para emparejar currículums anonimizados con puestos; el costo y el sesgo del modelo pesan en cada decisión | **4** | 2 | Caso nuevo, IA como tema por primera vez, y "sesgo del modelo" y "costo del modelo" sin definir |
| **elenco2** | 6:09 | | | | |
| 34 | 6:09 | Sysops Squad, un sistema de tickets de soporte: un monolito viejo que pierde pedidos, se cae en los picos y guarda tarjetas de crédito; es el caso de partir un sistema existente | **4** | 3 | "Monolito" sin definir; cuatro problemas en una frase; el caso es Team 7 (idea 15), pero nunca se conecta. Dice "pedidos" donde la fuente dice tickets |
| 35 | 6:21 | Farmacy Food, la cocina del ejemplo del monitoreo, vende comida en heladeras inteligentes con un presupuesto muy limitado; es el caso de hacer mucho con poco | **4** | 3 | Vuelve al ejemplo de ArchColider (idea 18) con otro nombre, a dos minutos de distancia, sin puente explícito. "Heladeras inteligentes" es concepto nuevo |
| 36 | 6:32 | MobilityCorp alquila scooters, bicicletas, autos y camionetas eléctricos en Europa, y quiere decidir dónde usar IA y dónde no | 3 | 2 | Caso nuevo con cuatro tipos de vehículo; el hilo de IA que se abre aquí vuelve en las lecciones 10 y 11 |
| 37 | 6:43 | Los otros siete ganadores aparecen cuando tienen el mejor ejemplo, con una frase para situarlos | 2 | 2 | Promesa sin nombres: nadie puede ubicar a los siete que se nombran después |
| **cierre** | 6:48 | | | | |
| 38 | 6:48 | El precio de DataDog estaba en la tabla del ADR, en negrita, quince dólares por servidor al mes; el precio de la opción gratuita estaba escondido en el tiempo de una persona, y hubo que escribirlo | 2 | 3 | Vuelve a un hilo abandonado desde la idea 24, después de dos minutos de casos; el puente es el nombre DataDog. La negrita está en la fuente |
| 39 | 7:01 | Ese es el hábito del curso: poner a la vista lo que cuesta cada opción, incluido lo que no aparece en ninguna lista de precios | 2 | 2 | Generalización de la tesis de la lección |
| 40 | 7:11 | El primer lugar donde se aplica es el principio de cualquier diseño, cuando un cliente entrega una página de pedidos y hay que decidir qué importa | 3 | **4** | Cierre que abre el tema de la lección 2 ("qué importa", "página de pedidos") en vez de volver al hecho de apertura |

## Lo que muestran los puntajes

1. **Cinco casos nuevos en 47 segundos (ideas 32 a 36, 5:45 a 6:32).** MonitorMe, ClearView, Sysops Squad, Farmacy Food y MobilityCorp entran uno tras otro, cada uno con nombre, cifras o un problema propio. Cuatro de los cinco puntúan 4 de carga. Es el pico del video, y justo después el espectador tiene que recordar los cinco nombres.

2. **Equipo y producto con nombres distintos, sin conexión (ideas 15, 18, 19, 23, 34, 35).** El espectador oye "ArchColider" (18), luego "Farmacy Food" (35); "Team 7" (15), luego "Sysops Squad" (34); "la de Amazon" (19), luego "CloudWatch" (23). Ninguno de los cambios se anuncia. Además, "Farmacy Food" se parece demasiado a "Farmacy Family", que es otro equipo (Archangels) en las lecciones 7 y 8.

3. **Saltos de tema en la segunda mitad y en el cierre (ideas 36, 38, 40).** Después de MobilityCorp (36) el texto vuelve a DataDog (38), que ya no es el hilo; y la última idea (40) abre el tema de la lección 2 con un concepto nuevo ("qué importa"). El cierre pide volver al hecho de apertura, pero la lección 1 abre con una definición del curso, no con un hecho de un caso, así que no hay nada a lo que volver.

4. **Términos usados antes de definirse (ideas 3, 9, 16, 34, 33).** "Architecture Katas" (3, fricción 3) se define en la 9; "trade-off" (16) se usa antes de definirse, en la misma frase; "monolito" (34) y "sesgo del modelo" (33) nunca se definen. Son las palabras que más cargan la lección sin ganar nada en el ejemplo.

5. **Cifras que no coinciden con la fuente (ideas 19, 32, 34).** Estos errores son de contenido, no de carga:
   - CloudWatch: el ADR dice "$0.30 USD for first 10,000 metrics" (`ArchColider-src/4.ADRs/003 Tracing and Monitoring Sytem.md`). La lección dice "unos centavos por cada métrica" (idea 19), y la tabla de verificación repite "~0,30 USD por métrica". Cambia el sentido. Como la comparación con DataDog (15 USD por host y mes) usa otra unidad, "la más cara" tampoco se sostiene sin aclarar eso.
   - MonitorMe: la lección dice "cientos de pacientes en la estación de enfermería" (idea 32). La fuente dice máximo 20 pacientes por estación de enfermería y 500 por instalación (`BluzBrothers-src/Business/Requirements.md`). La lección 3 dice "quinientos pacientes por instalación", así que la lección 1 se contradice con la 3. "No puede apagarse" tampoco es lo que dice la fuente, que pide que el sistema siga funcionando si falla un dispositivo.
   - Sysops Squad: "pierde pedidos" (idea 34); la fuente habla de "lost tickets".
   - La razón de DataDog "quedó escrita en una sola frase" (idea 20): la sección de decisión del ADR tiene tres frases.
   - "Pocas semanas" (idea 9) no aparece en las fuentes del corpus que cita la tabla de verificación.

6. **Contradicción entre lecciones (ideas 18, 32; lecciones 3, 7 y 8).** La lección 3 da 500 pacientes por instalación, la lección 1 habla de cientos en la estación. Y el nombre "Farmacy Food" (ArchColider) se confunde con "Farmacy Family" (Archangels) en las lecciones 7 y 8. Verificado en la fuente: ArchColider es Farmacy Food (D7 §2.1, "AC (Farmacy Food, 2020)"), así que la lección 1 no se equivoca; el problema es que nunca lo dice.

Confirmado contra la fuente, sin cambios: DataDog 15 USD por host y mes, en negrita (ADR-003); "0.2-0.5 time of a developer / administrator"; "the price might increase"; "Everything in software architecture is a trade-off. First Law" (Team 7 README:29-30); ASM-4 (tarjetas, Team 7 README:164); donación de la ONG (Pragmatic, Characteristics.md:53); Farmacy Food con presupuesto muy limitado (ArchColider `Constraints.md`:8); heladeras inteligentes (ArchColider `BusinessGoalAndScope.md`); 183 decisiones, 91 %, 52 % y 27 % (D7 V1 y §2.1). MobilityCorp en Europa aparece en los archivos de regulación de la UE. "Dónde usar IA y dónde no" no lo encontré literal en el README de Five Nines; conviene confirmarlo en `requirements/` antes de dejarlo.

## Qué cambiaría, en orden de impacto

1. **Nombrar equipo y producto una vez, en su primera aparición (ideas 15, 18, 19 y 35).** En la lección 1, en 3:21: "ArchColider, el equipo que diseñó Farmacy Food, un sistema de pedidos para una cocina de delivery". En 2:56, Team 7 sin número: "Sysops Squad, el equipo que ganó con la primera ley de la arquitectura de software". En 4:26, presentar CloudWatch como "la de Amazon". Así Farmacy Food (idea 35) y Sysops Squad (idea 34) ya tienen un puente. Quedaría en la lección 1 y baja la carga de 18, 34 y 35 a 2 o 3. Hay que avisar en las lecciones 7 y 8 que Farmacy Family es otro equipo.

2. **Adelgazar el elenco en la lección 1: una línea por caso, sin cifras (ideas 32 a 37).** Cada caso queda con nombre, equipo, y el problema en una frase, por ejemplo "MonitorMe, un sistema de monitoreo de hospital que no puede dejar de mostrar datos". Las cifras se mueven a su lección, donde el caso se usa: MonitorMe (500 por instalación, 20 por estación, un segundo) a la lección 2, donde ya aparece el pedido, y a la 3 para la cuenta; Sysops Squad (tarjetas, monolito) a la lección 4; Farmacy Food (heladeras, presupuesto) a la lección 7; ClearView (costo y sesgo del modelo) a la lección 10. La idea 37 ("los otros siete") se corta o pasa al cierre de la lección 11, porque en esta lección no aporta nada.

3. **Cerrar sin salir del tema y abrir con un hecho de un caso (ideas 1, 38 a 40).** Se corta la frase de "página de pedidos y qué importa" (idea 40) y se pasa al inicio de la lección 2, que trata del pliego y de qué importa. La lección 1 cierra en DataDog y el hábito (38 y 39). Como el diseño pide que cada lección abra con un hecho concreto de un caso, la apertura "Este es un curso sobre..." (idea 1) también conviene reescribirla con el ejemplo de ArchColider, y cerrar en ese mismo hecho. Así la fricción de 40 baja de 4 a 1.

4. **Partir la idea de las 183 decisiones (ideas 26 y 27).** Primero una frase con el método y el número ("se contaron las cuatro partes en 183 decisiones de los doce ganadores, a mano"), y después una sola cifra, la del requisito (uno de cada cuatro), que es la que la lección usa para su tesis. Los 91 % y 52 % se dejan para la lección 11 si allí ya aparecen (conviene verificarlo). La carga de 27 baja de 4 a 2. Además, corregir antes del render: CloudWatch (idea 19), MonitorMe (idea 32), "pedidos" por "tickets" (idea 34) y la tabla de verificación de CloudWatch y de MonitorMe.
