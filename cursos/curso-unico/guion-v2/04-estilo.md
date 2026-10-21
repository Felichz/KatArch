# Bloque 4 · El estilo

**Enseña:** el estilo se elige con las cualidades que mandan; se queda con el que tiene menos trade-offs, no con uno que no tenga; puede variar por parte del sistema.
**Par:** ClearView elige un estilo basado en servicios y usa eventos solo donde la interoperabilidad lo pide; Farmacy Food elige un monolito modular.

## Una planilla con estrellas {#planilla}

**Narración**

El estilo es la forma general del sistema. Un monolito es una sola pieza que se despliega entera. Los microservicios son muchas piezas pequeñas que se despliegan por separado. Entre los dos hay varias formas intermedias, y cada una es buena en unas cualidades y mala en otras.

ClearView eligió el suyo con una planilla que usan varios ganadores. Tiene una columna por estilo y una fila por cualidad, y cada casilla lleva de una a cinco estrellas. El equipo marcó las filas de sus cualidades y miró qué columna sumaba más donde importaba.

**Visual**
- Sello: ClearView.
- Imagen central: la planilla de estilos, recreada en 2D (no la imagen original): 8 columnas (capas, monolito modular, microkernel, microservicios, basado en servicios, orientado a servicios, por eventos, basado en espacio) y filas de cualidades.
- «al decir "Un monolito"» → arriba, un bloque único; «al decir "microservicios"» → muchos bloques pequeños; «al decir "varias formas intermedias"» → entre los dos, tres formas con número de bloques creciente.
- «al decir "una columna por estilo y una fila por cualidad"» → `construir` la planilla: primero encabezados, después filas, después estrellas en barrido.
- «al decir "marcó las filas de sus cualidades"» → se resaltan en naranja las filas costo, simplicidad, interoperabilidad y testabilidad; el resto a segundo plano.
- Al final: la planilla con cuatro filas resaltadas.

## Lo que eligió ClearView {#clearview}

**Narración**

Ganó el estilo basado en servicios, unos pocos servicios grandes que comparten la base de datos. Tiene cuatro estrellas en costo y en testabilidad, que eran dos de sus cualidades principales. El equipo escribe que es más barato y rápido de construir y más fácil de mantener.

Pero en interoperabilidad, la tercera, tiene solo dos. Y ClearView no la soltó. Donde el sistema tiene que hablar con los sistemas de recursos humanos de las empresas, usa otro estilo, uno por eventos. En la planilla, ese estilo tiene más estrellas en esa fila.

Esa es la segunda parte de la idea. El estilo no tiene que valer igual en todo el sistema. La forma general la eligen las cualidades que mandan, y una parte con otra necesidad puede apartarse de ella.

La decisión también dice lo que pierde. Compartir la base debilita la elasticidad, porque las partes que comparten una base no pueden crecer cada una por su lado cuando llega un pico.

**Visual**
- Imagen central: la planilla, con la columna "basado en servicios" marcada.
- «al decir "Ganó el estilo basado en servicios"» → la columna se resalta con un recuadro naranja; una ✕ en su casilla de selección.
- «al decir "cuatro estrellas en costo y en testabilidad"» → las dos casillas laten.
- «al decir "tiene solo dos"» → la casilla de interoperabilidad de esa columna se marca con un círculo.
- «al decir "uno por eventos"» → se marca la columna "por eventos" (segunda ✕); su casilla de interoperabilidad se resalta (tres estrellas).
- «al decir "una parte con otra necesidad"» → transición: la planilla se aparta y aparece el diagrama maestro de ClearView (ícono que crece). Los servicios del centro con la base compartida en un mismo tono; la parte de integración con recursos humanos, a la derecha, con flechas de eventos verdes. Una frontera punteada separa las dos zonas: "basado en servicios" y "por eventos".
- «al decir "debilita la elasticidad"» → dos servicios intentan duplicarse por separado; la base compartida queda en el medio, sin poder duplicarse con ellos; aparece la etiqueta "elasticidad ↓".
- Al final: el diagrama maestro con las dos zonas de estilo marcadas. Es la primera pieza que se guarda en el diagrama que crece.

## Lo que eligió Farmacy Food {#farmacy}

**Narración**

Farmacy Food vende comidas preparadas que se retiran de refrigeradores inteligentes, y trabaja con muy poco presupuesto. Tenía la misma presión de dinero que ClearView, y llegó a otro lugar. Eligió un monolito modular, una sola aplicación dividida por dentro en módulos con fronteras claras.

Sus razones salen del estado del negocio. El equipo es chico, hay que salir rápido y el presupuesto es corto. Además, escribe que los microservicios piden un modelo del dominio estable y conocido, y que para su sistema de pedidos eso todavía no existe. Los microservicios, dice, deberían crecer a medida que hagan falta.

El costo también está anotado. Hace falta disciplina para que los módulos no se mezclen con el tiempo.

**Visual**
- Sello: Farmacy Food (primera aparición del caso).
- «al decir "refrigeradores inteligentes"» → ilustración breve de un refrigerador con puerta de vidrio y comidas; se reduce al sello (refrigerador).
- Imagen central: un bloque grande (la aplicación) con cuatro módulos adentro separados por líneas firmes.
- «al decir "monolito modular"» → `construir` el bloque y luego los módulos (pedidos, catálogo, pagos, fidelización).
- «al decir "El equipo es chico"» → tres íconos al costado: personas (pocas), reloj, moneda.
- «al decir "un modelo del dominio estable"» → los módulos tiemblan y sus fronteras se mueven un poco; etiqueta "dominio que todavía cambia".
- «al decir "crecer a medida que hagan falta"» → un módulo se separa apenas del bloque y vuelve (anticipa el bloque 10).
- «al decir "disciplina"» → una línea entre dos módulos se borronea y se vuelve a afirmar.
- Al final: el bloque con sus cuatro módulos.

## La misma presión, dos formas {#comparacion}

**Narración**

ClearView y Farmacy Food tenían poco dinero, y lo pusieron arriba de todo. Uno terminó con unos pocos servicios grandes y el otro con una sola aplicación, porque además pesaban otras cosas. En un caso, la necesidad de hablar con muchos sistemas ajenos. En el otro, un dominio que todavía se movía. Ninguno eligió un estilo sin costos. Cada uno eligió el que tenía los costos que podía pagar, y dejó escrito cuáles eran.

**Visual**
- Imagen central: `comparar`. Izquierda, ClearView (servicios con base compartida y zona de eventos). Derecha, Farmacy Food (bloque con módulos).
- «al decir "poco dinero"» → una moneda arriba de cada mitad, al mismo tiempo.
- «al decir "hablar con muchos sistemas ajenos"» → en la izquierda se resalta la zona de eventos; «al decir "un dominio que todavía se movía"» → en la derecha, las fronteras de módulo tiemblan.
- «al decir "los costos que podía pagar"» → bajo cada mitad, su costo escrito: "elasticidad ↓" y "disciplina entre módulos".
- Al final: las dos mitades con su costo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Planilla de estilos (Architecture Styles Worksheet) de ClearView: basado en servicios y por eventos seleccionados; filas resaltadas costo, simplicidad (sustituto de factibilidad), interoperabilidad y testabilidad; basado en servicios: costo 4, testabilidad 4, interoperabilidad 2, elasticidad 2; por eventos: interoperabilidad 3 | `Pragmatic/ADR/images/ADR-002-architecture-style.png` (revisada) |
| ADR-002 (Accepted): Service Based Architecture; "Where needed for better inteoperability and deployability we want to use Event Driven Architecture"; "comparatively cheaper and faster to build and easier to maintain"; Weakened: "Elasticity (due to shared databases between servuces)" | `Pragmatic/ADR/ADR-002-architecture-style.md` |
| "No pueden crecer cada una por su lado" | Explicación del curso |
| Farmacy Food ADR-002 (Accepted): monolito modular; microservicios piden "preferably a stable and known domain model", "For the ordering system it's not applicable"; "Microservices should grow naturally as the need arises"; disciplina o "big ball of mud" | `ArchColider/4.ADRs/002 System approach.md`; `2.SolutionBackground/SystemAppoach.md` l. 96-139 |
| Restricciones: equipo chico, salida rápida, presupuesto limitado | `ArchColider/1.ProblemBackground/Constraints.md`; `BusinessDrivers.md` |
| Farmacy Food: comidas preparadas en refrigeradores inteligentes; presupuesto muy limitado (presentación del caso, antes en el bloque 1) | `ArchColider/1.ProblemBackground/BusinessDrivers.md`; `Constraints.md` |
