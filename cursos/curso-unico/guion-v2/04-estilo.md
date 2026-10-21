# Bloque 4 · El estilo

**Enseña:** el estilo se elige con las cualidades que mandan; se queda con el que tiene los costos que se pueden pagar, no con uno sin costos; puede variar por parte del sistema.
**Par:** ClearView elige un estilo basado en servicios y usa eventos solo donde la interoperabilidad lo pide; Farmacy Food elige un monolito modular.
**Trae (ver `ACTO1-CONTINUIDAD.md`):** cualidades, renuncias, la base compartida de ClearView y lo que debilita, estilo (nombrado en el bloque 2), Ford y Richards. **Presenta:** Farmacy Food; monolito, microservicios, basado en servicios, por eventos, monolito modular.

## Una planilla con estrellas {#planilla}

**Narración**

ClearView ya tenía sus tres cualidades: poder probarlo, poder pagarlo y poder hablar con muchos sistemas ajenos. Con ellas tenía que elegir la forma general del sistema, lo que se llama su estilo. En un extremo está el monolito, una sola pieza que se despliega entera. En el otro, los microservicios, muchas piezas pequeñas que se despliegan por separado. Entre los dos hay varias formas intermedias, y cada una es buena en unas cualidades y mala en otras.

El equipo eligió con una planilla de estilos que armó Mark Richards, uno de los que presentan el concurso. Tiene una columna por estilo y una fila por cualidad, y cada casilla lleva de una a cinco estrellas. El equipo marcó las filas de sus cualidades y miró qué columna sumaba más donde importaba.

**Visual**
- Sello: ClearView.
- «al decir "Un monolito"» → arriba, un bloque único; «al decir "microservicios"» → muchos bloques pequeños; «al decir "varias formas intermedias"» → entre los dos, formas con número de bloques creciente.
- «al decir "una columna por estilo y una fila por cualidad"» → la planilla recreada en tiza: ocho columnas y filas de cualidades; estrellas en barrido.
- «al decir "marcó las filas de sus cualidades"» → se resaltan las filas costo, simplicidad, interoperabilidad y testabilidad.
- Al final: la planilla con cuatro filas resaltadas.

## Lo que eligió ClearView {#clearview}

**Narración**

Ganó el estilo basado en servicios, unos pocos servicios grandes que comparten la base de datos. Tiene cuatro estrellas en costo, que el equipo usa para medir si lo puede pagar, y cuatro en testabilidad. El equipo escribe que es más barato y rápido de construir y más fácil de mantener.

Pero en interoperabilidad, la tercera, tiene solo dos estrellas. Y ClearView no la soltó. Donde el sistema tiene que hablar con los sistemas de recursos humanos de las empresas, usa otro estilo, uno por eventos. En ese estilo, las partes se avisan con mensajes en vez de llamarse y esperar la respuesta. En la planilla, tiene una estrella más en esa fila.

Así, la forma general la eligen las cualidades que mandan, y una parte con otra necesidad puede apartarse de ella.

La decisión también dice lo que pierde. Compartir la base debilita la elasticidad. Cuando llega un pico, cada servicio puede sumar copias, pero todos terminan esperando a la misma base.

**Visual**
- Imagen central: la planilla, con la columna "basado en servicios" marcada.
- «al decir "Ganó el estilo basado en servicios"» → la columna se marca; «al decir "cuatro estrellas en costo"» y «"testabilidad"» → las dos casillas se encierran.
- «al decir "tiene solo dos estrellas"» → la casilla de interoperabilidad de esa columna se marca en ámbar.
- «al decir "uno por eventos"» → se marca la columna "por eventos"; su casilla de interoperabilidad se encierra.
- «al decir "una parte con otra necesidad"» → la planilla se aparta y aparece ClearView en dos zonas: los servicios con la base compartida y, a la derecha, la integración con recursos humanos con mensajes que viajan.
- «al decir "debilita la elasticidad"» → los servicios suman copias y todas apuntan a la misma base, que se repasa en ámbar.
- Al final: las dos zonas, con "elasticidad ↓".

## Lo que eligió Farmacy Food {#farmacy}

**Narración**

Farmacy Food vende comidas preparadas que se retiran de refrigeradores inteligentes, y trabaja con muy poco presupuesto. Tenía la misma presión de dinero que ClearView, y llegó a otro lugar. Eligió un monolito modular, una sola aplicación dividida por dentro en módulos con fronteras claras.

Sus razones salen del estado del negocio. El equipo es chico, hay que salir rápido y el presupuesto es corto. Además, escribe que los microservicios piden un negocio estable y bien entendido, y que para su sistema de pedidos eso todavía no se cumple. Los microservicios, dice, deberían crecer a medida que hagan falta.

El costo también está anotado. Hace falta disciplina para que los módulos no se mezclen con el tiempo.

**Visual**
- Sello: Farmacy Food (primera aparición del caso), con su ilustración: un refrigerador con puerta de vidrio y comidas.
- «al decir "monolito modular"» → un bloque grande con cuatro módulos adentro.
- «al decir "El equipo es chico"» → tres señas al costado: pocas personas, un reloj, una moneda.
- «al decir "un negocio estable"» → las fronteras de los módulos se corren un poco.
- «al decir "crecer a medida que hagan falta"» → un módulo se asoma fuera del bloque.
- «al decir "disciplina"» → una línea entre dos módulos se borronea y se vuelve a afirmar.

## La misma presión, dos formas {#comparacion}

**Narración**

ClearView y Farmacy Food tenían poco dinero, y lo pusieron arriba de todo. Uno terminó con unos pocos servicios grandes y el otro con una sola aplicación, porque además pesaban otras cosas. En un caso, la necesidad de hablar con muchos sistemas ajenos. En el otro, un negocio que todavía se movía. Ninguno eligió un estilo sin costos. Cada uno eligió el que tenía los costos que podía pagar, y dejó escrito cuáles eran.

**Visual**
- `comparar`: izquierda ClearView (servicios con base compartida y zona de eventos), derecha Farmacy Food (bloque con módulos).
- «al decir "poco dinero"» → una moneda arriba de cada mitad.
- «al decir "hablar con muchos sistemas ajenos"» → la zona de eventos; «al decir "todavía se movía"» → las fronteras de módulo.
- «al decir "los costos que podía pagar"» → bajo cada mitad su costo: "elasticidad ↓" y "disciplina entre módulos".

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Las tres cualidades de ClearView: testabilidad, factibilidad, interoperabilidad | `Pragmatic/ArchitectureCharacteristics/Characteristics.md` ("Selecting the Top 3") |
| Planilla de estilos: "Created by Mark Richards, DeveloperToArchitect.com"; ocho columnas; basado en servicios y por eventos seleccionados; filas resaltadas costo, simplicidad, interoperabilidad y testabilidad; costo y simplicidad marcadas "used as a substitute for feasibility"; basado en servicios: costo 4, testabilidad 4, interoperabilidad 2, elasticidad 2; por eventos: interoperabilidad 3 | `Pragmatic/ADR/images/ADR-002-architecture-style.png` |
| Que Mark Richards presenta el concurso | `.github/profile/README.md` (TheKataLog) |
| ADR-002 (Accepted): "Service Based Architecture. Where needed for better inteoperability and deployability we want to use Event Driven Architecture"; "comparatively cheaper and faster to build and easier to maintain"; Weakened: "Elasticity (due to shared databases between servuces)" | `Pragmatic/ADR/ADR-002-architecture-style.md` l. 9, 21-41 |
| Que las copias terminan esperando a la misma base | Explicación del curso de "due to shared databases" |
| Por eventos: las partes se avisan con mensajes en vez de llamarse y esperar | Definición general (conocimiento externo) |
| Farmacy Food ADR "System approach" (Accepted): "modularized monolith is the best option for now"; "Extra care and discipline should be applied for inter module communication, or it will be just a monolith with a tendency towards 'the big ball of mud'" | `ArchColider/4.ADRs/002 System approach.md` l. 7, 39, 47 |
| "preferably a stable and known domain model. For the *ordering system* it's not applicable"; "Microservices should grow naturally as the need arises." | `ArchColider/2.SolutionBackground/SystemAppoach.md` l. 137, 139 |
| Equipo chico, salida rápida, presupuesto muy limitado | `ArchColider/1.ProblemBackground/Constraints.md` (1, 2, 4) |
| Farmacy Food: comidas preparadas en refrigeradores inteligentes | `ArchColider/1.ProblemBackground/BusinessDrivers.md` |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El bloque abría con definiciones ("El estilo es la forma general…") antes de un caso | Abre con ClearView y sus tres cualidades, y el estilo se define al servicio de esa elección; la base compartida del bloque 1 vuelve como el costo (idea combinada) |
| 2 | Arquitecto senior | "Costo" en la planilla no es una de las tres cualidades: es la medida que el equipo usa en lugar de la factibilidad; "no pueden crecer cada una por su lado" explicaba mal la elasticidad debilitada | "costo, que el equipo usa para medir si lo puede pagar"; la elasticidad se explica con las copias que esperan a la misma base |
| 3 | Verificador | La planilla la firma Mark Richards; las frases de Farmacy Food sobre microservicios están en `SystemAppoach.md`, no en el ADR | Se nombra a Richards (ya presentado en la apertura); la tabla cita cada archivo por separado |
| 4 | Guionista | "Esa es la segunda parte de la idea" anuncia en vez de decir | Se corta; la frase queda con "Así," |
| 5 | Espectador de prueba | "Por eventos" y "modelo del dominio" sin definir | "Las partes se avisan con mensajes en vez de llamarse y esperar"; "un negocio estable y bien entendido" |
| 6 | Dirección visual | Farmacy Food necesita su mundo en tiza (no está en el kit) | Se agrega `farmacy` a los mundos de `tiza.js` al animar |
| 7 | Producción | Ids sin cambios (`planilla`, `clearview`, `farmacy`, `comparacion`) | Sin cambios |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
