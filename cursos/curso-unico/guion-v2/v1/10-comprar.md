# Bloque 10 · Comprar, construir y empezar simple

**Enseña:** qué se compra y qué se construye, y una capa propia sobre lo comprado; el costo de operar lo propio; empezar por lo más simple que cumple y escribir de antemano la métrica que dispara el cambio.
**Primer par:** Spotlight compra lo que no es su núcleo y lo envuelve; ShopWise construye una pieza que podía comprar.
**Segundo par:** MobilityCorp mide su modelo para saber cuándo cambiarlo; Farmacy Food mide el negocio para saber cuándo partir.
**Vuelven:** DataDog (bloque 1); la base única de Sysops Squad (bloque 6, ahora como transición).

## Una fortaleza para nadie {#gancho}

**Narración**

Spotlight empezaba de cero, sin saber si alguien iba a usarlo. En su análisis, el equipo dejó escrita una pregunta que ordena todo lo demás. Por qué el negocio invertiría en construir una fortaleza si no está seguro de que alguien vaya a vivir en ella.

De esa pregunta salen dos decisiones. Qué se compra hecho y qué se construye. Y cómo se empieza simple sin quedar atrapado en lo simple cuando el negocio crezca.

**Visual**
- Sello: Spotlight.
- Imagen central: un castillo que se construye solo, ladrillo a ladrillo, en un terreno vacío.
- «al decir "si no está seguro de que alguien vaya a vivir en ella"» → el castillo terminado, sin nadie alrededor; el viento mueve una bandera.
- «al decir "Qué se compra hecho y qué se construye"» → el castillo se desvanece; aparecen dos pilas: una de cajas con etiqueta de proveedor y otra de ladrillos.
- Al final: las dos pilas.

## Comprar y envolver {#comprar}

**Narración**

Spotlight escribió su criterio como seis preguntas que se le hacen a cada pieza. La primera es qué tan cerca está esa pieza de aquello por lo que alguien usaría Spotlight y no otra cosa. Las demás son más prácticas, como si el equipo sabe construirla o cuánto cuesta construirla frente a comprarla. Con esas preguntas decidieron comprar, entre otras cosas, la autenticación y el chat, y construir el núcleo.

Comprar tiene un costo que el equipo admite, que el proveedor limita lo que se puede hacer. Y lo resolvieron con una pieza propia, una fachada, que se pone delante del proveedor. El resto del sistema le habla a la fachada, nunca al proveedor, y la fachada construye lo que el proveedor no trae. Si un día hay que cambiar de proveedor, cambia solo la fachada.

**Visual**
- Imagen central: el sistema de Spotlight en el centro, con piezas alrededor.
- «al decir "qué tan cerca está esa pieza"» → círculos concéntricos tipo diana; el núcleo en el centro (emparejar personas con organizaciones); la autenticación, el chat y los documentos en los anillos de afuera.
- «al decir "comprar"» → las piezas de afuera se convierten en sistemas externos punteados con logo genérico de proveedor.
- «al decir "una fachada"» → delante del proveedor de autenticación aparece una pieza propia delgada; las flechas del resto del sistema llegan a ella, no al proveedor.
- «al decir "construye lo que el proveedor no trae"» → dentro de la fachada aparece un pequeño bloque extra.
- «al decir "cambia solo la fachada"» → el proveedor punteado se reemplaza por otro; la fachada parpadea; nada más se mueve.
- Al final: el núcleo construido, lo comprado afuera con su fachada.

## Construir lo que se podía comprar {#construir}

**Narración**

La respuesta no siempre es comprar. ShopWise, una tienda en línea con un asistente de inteligencia artificial, necesitaba un gateway delante de sus servicios. Había productos comerciales listos, bien documentados y fáciles de integrar.

El equipo construyó el suyo. La razón está escrita, que los productos comerciales traían funciones que no iban a usar, con un costo de licencia por ellas, y poca libertad para adaptarlos. También el precio de su elección, que construir y mantener la pieza cuesta más trabajo y necesita gente dedicada.

Ese precio en personas es el mismo que apareció al principio del curso, con el monitoreo de Farmacy Food. Allí, lo gratis costaba el tiempo de una persona, y por eso convenía pagar. Aquí, lo comercial costaba funciones que nadie usaría, y por eso convenía construir.

**Visual**
- Sello: ShopWise (ícono de carrito). Entra con su frase de presentación como palabra clave.
- Imagen central: un gateway comercial grande, lleno de íconos de funciones.
- «al decir "funciones que no iban a usar"» → la mayoría de los íconos del gateway comercial pasan a gris; quedan tres en color.
- «al decir "un costo de licencia"» → sobre los íconos grises, monedas.
- «al decir "El equipo construyó el suyo"» → al lado, un gateway propio, pequeño, solo con las tres funciones en color.
- «al decir "necesita gente dedicada"» → junto al gateway propio aparecen dos personas con una barra de tiempo.
- «al decir "el monitoreo de Farmacy Food"» → a la izquierda reaparece, chica, la escena del bloque 1: las opciones gratuitas con la persona y su barra de tiempo.
- Al final: las dos escenas, la de Farmacy Food y la de ShopWise, cada una con su persona y su barra.

## Una pregunta, dos respuestas {#comparacion1}

**Narración**

Spotlight y ShopWise se hicieron la misma pregunta y respondieron al revés. Spotlight compró porque la pieza estaba lejos de lo que lo hace distinto, y la envolvió para no depender del proveedor. ShopWise construyó porque lo que se vendía traía más de lo que necesitaba, y pagaba por eso. Lo que decide no es una regla fija, sino cuánto se aleja la pieza del núcleo y qué se paga de cada lado, en dinero y en personas.

**Visual**
- Imagen central: `comparar`. Izquierda, Spotlight: proveedor punteado con fachada. Derecha, ShopWise: gateway propio pequeño, y el comercial en gris detrás.
- «al decir "estaba lejos de lo que lo hace distinto"» → izquierda, aparece la diana chica con la pieza en el anillo exterior; «al decir "traía más de lo que necesitaba"» → derecha, los íconos grises con monedas.
- «al decir "en dinero y en personas"» → bajo cada mitad, una moneda y una persona con barra.
- Al final: las dos mitades.

## Empezar simple, con la salida escrita {#modelo}

**Narración**

La segunda decisión es cuándo crecer. MobilityCorp necesitaba un modelo que mirara las fotos de cada vehículo devuelto y encontrara daños. Podía usar un servicio gestionado, donde el proveedor entrena y aloja el modelo a partir de fotos de ejemplo. O podía construir un modelo propio, entrenado y operado por el equipo. Empezó por el gestionado, más rápido y con menos trabajo de operación, y dejó escrito cuándo pasaría al propio.

Las condiciones tienen número. La primera usa una medida de cero a uno de qué tan bien encuentra los daños. Si a los tres meses en producción no llega a setenta y cinco centésimos, se cambia. Las otras se miran de forma sostenida, no en un mal día. Que los falsos positivos, los daños marcados donde no los hay, pasen del diez por ciento. O que, de cada veinte fotos, más de una tarde más de cinco segundos en responder. Construir el modelo propio desde el primer día lo rechazaron, porque era optimizar antes de tiempo.

**Visual**
- Sello: MobilityCorp.
- Imagen central: una escalera de dos peldaños: abajo "gestionado", arriba "propio".
- «al decir "un servicio gestionado"» → peldaño de abajo: un sistema externo con un hexágono adentro y fotos de ejemplo que entran.
- «al decir "un modelo propio"» → peldaño de arriba: un hexágono dentro de la frontera de MobilityCorp, con dos personas del equipo al lado.
- «al decir "Empezó por el gestionado"» → un marcador se pone en el peldaño de abajo.
- «al decir "Las condiciones tienen número"» → al lado de la escalera, tres medidores tipo velocímetro, con su umbral marcado en naranja.
- «al decir "setenta y cinco centésimos"» → medidor 1: aguja de 0 a 1, umbral en 0,75, etiqueta "a los 3 meses".
- «al decir "pasen del diez por ciento"» → medidor 2: umbral en 10 %, etiqueta "sostenido".
- «al decir "de cada veinte fotos, más de una"» → medidor 3: veinte fotos en fila, una marcada en rojo con un reloj "> 5 s", etiqueta "sostenido".
- «al decir "optimizar antes de tiempo"» → un intento de saltar directo al peldaño de arriba se tacha.
- Al final: la escalera con el marcador abajo y los tres medidores.

## Medir el negocio {#negocio}

**Narración**

Farmacy Food escribió algo parecido, pero midiendo otra cosa. Su monolito modular, del bloque cuatro, se iba a partir cuando hiciera falta, y para saber cuándo, el equipo decidió medir el negocio, no solo las máquinas.

Un supervisor manda pedidos de prueba que recorren los caminos críticos del negocio, por ejemplo, comprar una comida, y mide si salen bien y cuánto tardan. Con esos tiempos, el equipo planea qué módulo extraer y cuándo escalar, sobre hechos. Y la medición avisa también del caso más difícil de ver, cuando las máquinas están sanas y el negocio está trabado.

Sysops Squad pensó el cambio en dos tiempos, con su base de datos. Propone resolver primero lo urgente y quedarse con una sola base hasta que se convierta en un cuello de botella, y separarla después.

**Visual**
- Sello: Farmacy Food.
- Imagen central: el monolito modular del bloque 4.
- «al decir "Un supervisor manda pedidos de prueba"» → una pieza "supervisor" a la izquierda; un pedido de prueba (punto con borde punteado) entra y recorre los módulos en orden.
- «al decir "mide si salen bien y cuánto tardan"» → al salir, un tilde y un cronómetro con un tiempo.
- «al decir "qué módulo extraer"» → el cronómetro de un módulo sube; ese módulo `separar` del bloque.
- «al decir "las máquinas están sanas y el negocio está trabado"» → los indicadores de CPU y memoria en verde; el pedido de prueba queda trabado en un módulo y su cronómetro se pone rojo.
- Sello: Sysops Squad (propuesta). «al decir "en dos tiempos"» → una base única para las cuatro partes; un indicador de carga sube; al llegar al tope, la base se separa en cuatro.
- Al final: el módulo extraído de Farmacy Food y las bases separadas de Sysops Squad.

## Qué medir {#comparacion2}

**Narración**

MobilityCorp y Farmacy Food empezaron por lo simple y escribieron de antemano qué los haría cambiar. La diferencia está en qué miden. MobilityCorp mide el modelo, con umbrales y plazos. Farmacy Food mide el negocio, con caminos de prueba de punta a punta. Empezar simple sirve si la salida está escrita, porque sin ella, empezar simple no dice cuándo dejar de serlo.

**Visual**
- Imagen central: `comparar`. Izquierda, la escalera de MobilityCorp con los medidores. Derecha, el monolito de Farmacy Food con el supervisor y el cronómetro.
- «al decir "mide el modelo"» → izquierda, los medidores laten; «al decir "mide el negocio"» → derecha, el cronómetro late.
- «al decir "si la salida está escrita"» → bajo cada mitad, una hoja de decisión con su umbral.
- Al final: las dos mitades con sus hojas.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| "Why should the business invest to build a fortress when it is not sure if anyone would be staying in it or using it." | `Pegasuz/other-artifacts/Requirement-analysis.md` l. 59 |
| Spotlight ADR-003 (Accepted): seis preguntas; comprar autenticación, chat, documentos y notificaciones; construir el núcleo; el proveedor limita; "a wrapper service that would serve the missing and needed functionality" | `Pegasuz/ADRs/003.adr-build-vs-buy.md` l. 5-31 |
| ADR-009: IdP gestionado; "behave as an identity facade for the rest of the system" | `Pegasuz/ADRs/009.adr-idp.md` l. 29-37 |
| ShopWise ADR-003 (Accepted): gateway propio; los productos comerciales "include features that are unnecessary", "additional licensing costs", "limited flexibility"; costo: "Higher development and maintenance costs", "requiring dedicated resources" | `ConnectedAI/4_adrs/003_adr_custom_api_gateway.md` l. 7-56 |
| MobilityCorp ADR-0020: Phase 1 con servicio gestionado (Vertex AI AutoML) por "rapid time-to-value and minimal MLOps overhead"; disparadores: "mAP < 0.75 after 3 months in production", "False positive rate > 10% consistently", "Latency consistently exceeds 5s at p95"; modelo propio desde el día uno rechazado por "Premature optimization" | `Five-Nines/adrs/ADR-0020 - Damage Detection Model Architecture.md` l. 29-131 |
| p95 > 5 s dicho como "de cada veinte fotos, más de una tarde más de cinco segundos" | Traducción de la definición de p95 |
| Farmacy Food ADR-004 (Accepted): chequeos de salud del negocio con mensajes de prueba de un supervisor por escenarios críticos; tiempo y corrección; planear extracción y escalado "based on facts"; caso de máquinas sanas y lógica trabada | `ArchColider/4.ADRs/004 Health check endpoints.md` l. 11-29 |
| "Comprar una comida" como ejemplo de camino crítico | Ejemplo nuestro |
| Sysops Squad (Proposed): "stick with a monolithic database until it becomes a bottleneck", luego migrar | `Team-7/README.md` l. 285-291 |
