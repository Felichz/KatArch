# Bloque 14 · IA en el sistema

**Enseña:** un modelo se equivoca con la misma seguridad con la que acierta, así que antes de ponerlo a trabajar se decide qué no puede decidir, qué pasa cuando duda, de dónde saca lo que sabe y cómo se mide. Cuatro familias (el modelo describe y una regla decide, decidir dentro de límites, darle contexto en vez de entrenarlo, medirlo) con lo que gana y paga cada una.
**Par:** ClearView saca al modelo de la decisión; MobilityCorp lo deja decidir rodeado de reglas y de bandas de confianza. Contexto: Certifiable busca respuestas ya corregidas en vez de entrenar. Medir: ShopWise (una medida sola engaña) y Certifiable (un juez separado).
**Trae (ver `ACTO2-CONTINUIDAD.md`):** la historia anónima y el emparejamiento de ClearView (apertura, bloque 11); las fotos de MobilityCorp y su modelo gestionado (bloques 1, 11 y 13); ShopWise y su asistente (bloques 8 y 12). **Presenta:** Certifiable; sesgo, rasgo, banda de confianza, índice de ejemplos, fidelidad y relevancia.
**Pieza de ClearView:** la IA fuera de la decisión.

## Sacarle la decisión {#clearview}

**Narración**

El riesgo principal de ClearView con la inteligencia artificial era el sesgo. Los modelos de lenguaje traen prejuicios aprendidos, y emparejar personas con puestos es justo donde un prejuicio hace daño. Además, un modelo no siempre responde igual, y un cambio en sus instrucciones puede cambiar el resultado.

El equipo comparó seis formas de usar el modelo. La que le dejaba emparejar directamente currículums y puestos quedó descartada por el sesgo. Eligió que el modelo haga una tarea angosta. Lee la historia anónima y el puesto, y extrae rasgos que una persona puede leer, que después quedan fijos. El puntaje lo calcula una regla común con esos rasgos, sin el modelo.

Así, al modelo se le quitó justo la decisión que más podía torcer. Y lo que queda en el medio, los rasgos, se puede leer, explicar y probar.

**Visual**
- Estás aquí: la región "IA en el sistema".
- Sello: ClearView. Seis opciones en fila; la que empareja directo se tacha con "sesgo". Después: historia y puesto → modelo (hexágono) → rasgos legibles (etiquetas fijas, con candado) → regla → puntaje.

## Cuatro familias {#familias}

**Narración**

Poner un modelo dentro de un sistema obliga a decidir qué hace, qué pasa cuando duda, de dónde saca lo que sabe y cómo se mide. Hay cuatro familias.

La primera es que el modelo describa y una regla decida, como en ClearView. Gana con resultados que se pueden explicar y probar. Paga con que el modelo aporta menos de lo que podría.

La segunda es dejarlo decidir dentro de límites, con reglas que no se negocian y con bandas de confianza que dicen qué pasa cuando duda. Gana con que el modelo trabaja y el negocio queda protegido. Paga con reglas que escribir y con personas que revisan los casos dudosos.

La tercera es darle contexto en lugar de entrenarlo, buscar ejemplos parecidos y pasárselos junto con la pregunta. Gana con que se adapta a casos nuevos sin volver a entrenar. Paga con un índice de ejemplos que construir y mantener.

La cuarta es medirlo, antes y mientras funciona. Gana con saber cuándo empeora. Paga con medidas que hay que elegir bien, porque una sola engaña.

**Visual**
- El tramo del mapa: "IA en el sistema" en naranja y sus cuatro tarjetas.

## Rodearlo de límites {#mobilitycorp}

**Narración**

MobilityCorp deja decidir a sus modelos, pero adentro de límites escritos. El precio de un alquiler depende de la demanda, del clima y de los eventos de la ciudad, y su decisión reparte el trabajo. Un modelo estima cómo responde la demanda al precio. Otro explica el precio con palabras. Y unas reglas escritas en código aplican lo que no se puede romper, el margen mínimo, la regulación local y los descuentos de los suscriptores. Dejarlo todo al modelo quedó descartado, porque podía fallar en los casos límite, como una ley local o una tarifa mínima.

Y cuando el modelo duda, el sistema ya sabe qué hacer. Al devolver un auto, el cliente sube fotos, y un modelo decide si vuelve sucio, lo que lleva un cargo. Si la confianza del modelo pasa del noventa por ciento, decide solo. Entre ochenta y noventa, el caso va a una persona que revisa. Y por debajo de ochenta, el cargo no se cobra, así que si el modelo duda, pierde la empresa y no el cliente.

**Visual**
- Sello: MobilityCorp. Tres capas apiladas para el precio: "estima la demanda", "explica el precio", "reglas" (margen, regulación, suscriptores); la flecha "todo al modelo" tachada. Después, una barra de confianza de 0 a 100 con tres bandas: abajo de 80 (verde, "no se cobra"), 80 a 90 (ámbar, una persona), arriba de 90 (el modelo decide).

## Sacarlo o rodearlo {#par}

**Narración**

ClearView y MobilityCorp le pusieron límites al modelo de dos maneras. ClearView lo sacó de la decisión y lo dejó para lo que hace bien, describir. MobilityCorp lo dejó decidir, rodeado de reglas que no se negocian y con una salida escrita para cuando duda. Los dos contestaron antes qué no podía decidir el modelo y qué pasaba cuando no estaba seguro.

**Visual**
- Dos mitades: ClearView (modelo → rasgos → regla → puntaje, con el modelo fuera de la decisión) y MobilityCorp (el modelo dentro de un marco de reglas, y la barra de bandas debajo).

## Darle ejemplos en vez de entrenarlo {#contexto}

**Narración**

Certifiable es una empresa que certifica arquitectos de software, y quería que un modelo corrigiera las respuestas cortas de su examen. El modelo tenía que acertar también con preguntas nuevas, que nunca había visto.

Comparó tres caminos. Pedirle la nota sin ejemplos era rápido, pero frágil e inconsistente. Entrenar un modelo con respuestas corregidas funcionaba con preguntas conocidas, y caía con las nuevas. Eligió el tercero. Para cada respuesta, el sistema busca respuestas parecidas que ya corrigió un experto y se las pasa al modelo como ejemplo.

El precio está anotado. Hace falta un índice para buscar esos ejemplos, la corrección suma un paso, y cuantos más ejemplos se pasan, más tarda y más cuesta.

**Visual**
- Sello: Certifiable (primera aparición): un diploma con un sello. Una respuesta nueva entra; tres caminos: "sin ejemplos" (frágil), "entrenar" (cae con lo nuevo), "buscar ejemplos" (elegido). En el elegido, un índice de respuestas corregidas (tarjetas con su nota); tres parecidas viajan al modelo junto con la respuesta. Debajo, en ámbar, "índice", "un paso más", "más ejemplos, más costo".

## Medirlo {#medir}

**Narración**

Antes de confiar en un modelo, hay que medirlo. ShopWise comparó tres modelos para su asistente con dos medidas automáticas. Una mide si la respuesta se apoya en los datos que recibió el modelo, lo que llaman fidelidad. La otra, si responde lo que se preguntó, la relevancia.

Uno de los modelos sacó relevancia alta y fidelidad cero. Respondía pidiendo el número de pedido, que ya estaba en la pregunta, y esa sola frase contaba como relevante. El equipo dejó escrita la conclusión, que una medida sola no alcanza y hay que leerlas juntas.

Certifiable mide de otra forma, en cada respuesta. Separó dos piezas, una que corrige y pone la nota, y otro modelo que juzga cuánta confianza merece esa nota. Si la confianza supera un umbral, la nota queda firme. Si no, la revisa un experto. Y tenerlos separados permite mejorar o probar uno mientras el otro queda fijo.

**Visual**
- Sello: ShopWise. Una pregunta "¿dónde está mi pedido 48213?" y la respuesta "¿me das tu número de pedido?". Dos medidores: relevancia alta (verde), fidelidad en cero (rojo). "una sola engaña".
- Sello: Certifiable. Respuesta → corrector (hexágono) → nota → juez (hexágono) → confianza; arriba del umbral, "firme"; abajo, un experto.

## La pregunta que decide {#pregunta}

**Narración**

En esta región la pregunta es qué no puede decidir el modelo, y qué pasa cuando duda. Se contesta antes de ponerlo a trabajar, porque un modelo se equivoca con la misma seguridad con la que acierta.

**Visual**
- El tramo del mapa con las cuatro familias; debajo, la pregunta; "la IA fuera de la decisión" de ClearView marcada en su tarjeta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ClearView: sesgos de los modelos de lenguaje como riesgo; "Any change to AI or the prompt has the potential to change the outcome." | `Pragmatic/Requirements/requirements-and-assumptions.md` (A8); `Pragmatic/Requirements/Research/interview-ai-expert.md` l. 27 |
| ClearView ADR-011 (Accepted): seis opciones A-F; la C (la IA empareja directamente) descartada "due to bias concerns"; elige B: rasgos extraídos por la IA, legibles y fijados; puntaje sin IA; "better control over the AI and interpretability"; "transparency, testability" | `Pragmatic/ADR/ADR-011-deterministic-matching.md` l. 27-60 |
| MobilityCorp ADR-0018: un modelo de aprendizaje automático para la elasticidad de la demanda, uno generativo para explicar el precio, reglas para "minimum margin, local regulations, subscription discounts"; solo aprendizaje automático "may fail under corner cases (e.g., local laws, minimum fare) without deterministic rules" | `Five-Nines/adrs/ADR-0018 - Hybrid AI for Dynamic Pricing calculation.md` l. 28-50 |
| FR#2L: fotos al devolver; "AI confidence >90% auto-decides. 80-90% human review. <80% waives fee." | `Five-Nines/requirements/2_FRs.md` l. 20 |
| Los umbrales cambian entre documentos (85/70 en ADR-0020); se usan los del requisito | `Five-Nines/adrs/ADR-0020…` |
| Certifiable: certifica arquitectos de software; corrección de respuestas cortas | `ZAITects/README.md`; `ZAITects/usecases/hmw-ai-grading-short-answers.md` |
| Certifiable ADR-003 (Accepted): tres alternativas (sin ejemplos: "Prompts can be brittle… inconsistent"; ajuste fino: "Quality drops significantly on unseen questions"; RAG con ejemplos: "Strong generalization to unseen items"); decide recuperar ejemplos ya calificados; costos: "Extra Infrastructure (Retriever Index)", "Retrieval adds an extra step", "Cost vs. Accuracy Tradeoff… number of retrievals" | `ZAITects/ADRs/003-adr-llm-based-short-answer-evalaution-strategy.md` |
| ShopWise: tres modelos; fidelidad y relevancia; un modelo con 0,8 de relevancia y 0,0 de fidelidad; "asking for an order ID even when the order was provided"; "individual metrics are not enough on their own" | `ConnectedAI/6_test_cases/evaluation.md` l. 45-62 |
| Certifiable: Grader y Judge; "configurable threshold"; "Pending Manual Review"; "Splitting the Grader and Judge into separate components allows us improve/test one component while keeping the other component constant." | `ZAITects/usecases/hmw-ai-grading-short-answers.md` l. 29-85 |
| "¿dónde está mi pedido 48213?" | Ilustración del caso que describe la fuente; no se narra como cita |
| "un modelo se equivoca con la misma seguridad con la que acierta"; lo que gana y paga cada familia | Conocimiento general (externo), coherente con los documentos citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El plan lista cinco familias (gestionado o propio, recuperar contexto, gateway de modelos, reglas alrededor, evaluación) | Gestionado o propio ya está en el bloque 13; el gateway de modelos no tiene un caso que lo enseñe sin sumar otro; quedan cuatro: describir y regla, decidir dentro de límites, contexto, medir |
| 1 | Diseño del aprendizaje | La versión anterior abría con una explicación abstracta de cómo falla un modelo | Se abre con ClearView y su sesgo; la idea abstracta va en una frase dentro del caso y vuelve en la pregunta final |
| 1 | Diseño del aprendizaje | Certifiable es caso nuevo, a más de dos minutos de Wildlife Watcher | Se presenta en su propia frase, y vuelve en la escena de medir |
| 2 | Arquitecto senior | "Sesgo" se usa sin definir | "prejuicios aprendidos" en la frase siguiente |
| 2 | Arquitecto senior | "Recuperar contexto" (RAG) es jerga | Se narra el mecanismo: busca respuestas parecidas ya corregidas y se las pasa como ejemplo |
| 3 | Verificador | Los umbrales de MobilityCorp cambian entre documentos | Se usan los del requisito (90/80) |
| 3 | Verificador | "relevancia alta": la fuente dice 0,8 | Se dice "alta"; la cifra se dibuja |
| 4 | Guionista | "pierde la empresa y no el cliente" roza la fórmula "no es X, es Y" | Una sola vez en el curso |
| 5 | Espectador de prueba | "Fidelidad" y "relevancia" son nombres técnicos | Cada uno con su definición en la misma frase |
| 6 | Dirección visual | Hace falta el mundo o el sello de Certifiable | Ícono de diploma (`award`) para el sello |
| 7 | Producción | Ids: `clearview`, `familias`, `mobilitycorp`, `par`, `contexto`, `medir`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
