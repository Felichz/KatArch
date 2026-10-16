# Dossier D6 · R6: meter un modelo de IA en un sistema aplicando lo anterior

Verdades que tocan a este dossier: T8, T9, T10. Fuentes en los archivos originales de `C:\Users\felix\dev\katarch-corpus\`. Leídos completos: Five-Nines-src (ADR-0009, 0011, 0012, 0013, 0014, 0015, 0016, 0017 en su parte de política, 0018, 0019, 0020, 0021; ADR-0022 hasta la línea 125; `requirements/` salvo los apéndices A y C leídos en parte; `hld/mlops/README.md`; SD-003 del `4_Sequence_Diagram.md`), Pragmatic-src (ADR-004, 006, 007, 009, 010, 011, 025; `Requirements/` completo; `Characteristics.md`; C3 de matching y story; README), ZAITects-src (README; ADR-001, 002, 003, 007, 009, 010, 012; `hmw-ai-grading-short-answers.md`; `roll-out-strategy.md`, `fitness-functions.md`, `cost-analysis.md`), ConnectedAI-src (`1_requirements/`, `evaluation.md`, ADR-002, 007, `features.md`, C2/C3). Leídos en parte o por búsqueda de palabras clave: Five Nines ADR-0003, 0004, 0005, 0006, 0008, 0010; Pragmatic ADR-002; ZAItects ADR-004, 011, 015, 016, 017, 018 y el caso de estudio (prueba 2); ConnectedAI ADR-005, 008; Celus-Ceals ADR-005, 006 y `4.Solution`. Búsqueda por palabras clave (IA, ML, LLM, anomaly) en BluzBrothers, Data Alchemists, monArch, Pegasuz, Archangels, Team 7 y ArchColider: ninguno tiene un componente de IA que decida algo (ver sección 5).

Rutas abreviadas: `FN` = Five-Nines-src, `PR` = Pragmatic-src, `ZA` = ZAITects-src, `CA` = ConnectedAI-src, `CE` = Celus-Ceals-src.

---

## 1. Las verdades, reformuladas

**T8 · Se sostiene, pero con tres motivos distintos y con un matiz que el mapa no recogía.**
Formulación que sostiene la evidencia: *Cuando un error del modelo cuesta dinero, discrimina a una persona o es inaceptable, el modelo no decide solo. El sistema fija con código y con datos propios lo que el modelo no puede violar (márgenes mínimos, qué datos puede ver, de dónde salen los hechos) y le deja al modelo lo que el código no sabe hacer (interpretar texto o fotos, extraer, redactar).*
- Dinero: Five Nines (precio dinámico, cargos por limpieza y daños).
- Sesgo: Pragmatic (el modelo solo extrae atributos legibles; el puntaje lo calcula código, y quien puntúa no ve el currículum).
- Error inaceptable: ZAItects (descarta agentes autónomos y pone filtros por reglas antes del modelo).
- ConnectedAI lo sostiene solo en parte: exige que las respuestas salgan "only from verified data" de la base de la empresa, pero no declara reglas deterministas propias.
- Matiz: en Five Nines el reparto es explícito por capa (reglas para restricciones duras, ML para optimizar, GenAI para explicar); en Pragmatic no es "reglas alrededor del modelo" sino "el modelo adentro de un proceso determinista" y el motivo principal es que el resultado se pueda probar y explicar.

**T9 · Se sostiene solo en parte; hay que estrecharla.**
Formulación que sostiene la evidencia: *Antes de dejar que el componente decida (y cada vez que cambia el modelo o el prompt), se mide contra casos con respuesta conocida y con más de un número, porque un solo número puede esconder una falla.*
- "Varias métricas" lo sostienen con evidencia propia ConnectedAI (caso Gemini: relevancia alta, fidelidad baja) y Five Nines (precisión y recall por clase, falsos positivos por franja de luz, kappa del etiquetado, MAPE/RMSE/MAE en pronóstico, compuertas de promoción).
- Pragmatic y ZAItects sostienen "evaluar antes de confiar" pero no "varias métricas": Pragmatic define conjuntos de prueba por etapa sin ninguna métrica numérica; ZAItects enumera técnicas de evaluación (métricas automáticas, rúbrica, LLM juez, humano) y corre IA y humanos en paralelo, con pocas cifras.
- Ningún repo muestra resultados de evaluación del sistema final; el único experimento con números es el de ConnectedAI, de dos métricas y un conjunto de prueba estrecho que el propio equipo califica de limitado.

**T10 · Se sostiene con dos repos firmes y se cae en uno de los tres que marcaba el mapa.**
Formulación que sostiene la evidencia: *El modelo reporta cuánta confianza tiene; por encima de un umbral el sistema decide solo, en la franja media decide una persona, y por debajo el resultado por defecto es el que no perjudica a nadie y queda registrado. El umbral es una decisión de negocio y de costo, no del modelo.*
- Five Nines: bandas de confianza, resultado favorable al cliente por defecto, cola de revisión con SLA, auditoría. Es el único repo con resultado por defecto declarado y cifras de umbral.
- ZAItects: umbral "configurable" sin valor; el resultado por defecto en confianza baja es "Pending Manual Review" (no una decisión, una cola). El costo del curso depende de cuánta gente entra a esa cola (factor 0,2).
- Pragmatic **no** la sostiene (el mapa lo marcaba): no hay revisor humano de las decisiones de IA ni umbral de confianza; la decisión final de desbloquear a un candidato la toma el empleador, que es parte del producto, no un control del modelo. Pragmatic resuelve el mismo riesgo con otra técnica (T8).
- ConnectedAI la menciona sin detalle: un "Fallback Agent" que redirige a soporte humano, sin umbral.

**Hallazgo adicional (candidato a T16, no estaba en el mapa): el modelo y el prompt son una dependencia que cambia, y cada cambio se trata como una nueva versión con pruebas de regresión.** Lo sostienen Pragmatic (A10, A20, A27, A28, Q14, Q15, ADR-007, ADR-025), Five Nines (ADR-0011, ADR-0020 y ADR-0022: comparación campeón contra retador, una semana en sombra) y ZAItects (gestor de prompts con versiones; paso 4 del Grader). Es la forma en que R5 ("dejar escrita la condición para cambiar") toca a un componente cuyo comportamiento cambia aunque el código no cambie.

### Puente con R1 a R5 (cómo se cuenta el módulo)

| Resultado | Qué hacen los equipos con un componente determinista | Qué hacen con un componente que no lo es (con fuente) |
|---|---|---|
| R1 · cualidades y cifras | Convierten el requisito en cualidades medibles | ZAItects vuelve a derivar las cualidades principales para el sistema con IA: sin IA, "data integrity, usability and availability"; con IA, "accuracy, workflow and explainability" (`ZA/other_design_docs/architecture-characteristics.md`). Pragmatic elige "Feasibility, Interoperability, Testability" porque la IA introduce "non-deterministic behavior" y costo (`PR/ArchitectureCharacteristics/Characteristics.md`). Five Nines pone cifras a la IA en NFR_8 y NFR_9 (≤€0,10 por chequeo; exactitud 90 %/85 %/75-80 %). |
| R2 · dueño del dato | Cada dato tiene un servicio dueño | Pragmatic ADR-010: el currículum solo vive en Job candidate y el matching no tiene permiso de leerlo. Five Nines ADR-0016 §4: la IA publica la decisión; el Payment Service es quien cobra o perdona. ConnectedAI: la herramienta comprueba que el pedido sea del cliente. ZAItects ADR-018: una colección vectorial por tipo de dato. |
| R3 · diseñar el fallo | Colas, reintentos, vía manual | Un modelo falla además dando una respuesta equivocada con seguridad; eso se cubre con el resultado por defecto (T10). Fallos de servicio: Pragmatic ADR-007 (clientes LLM guiados por eventos; R30 "support 60s delays"), Five Nines (timeout 30 s y revisión humana con SLA 24 h en `FN/hld/core-func/car-van-rental/2_Container_Diagram.md`; Maps API tradicional de respaldo en ADR-0004), ZAItects (colas de consulta y respuesta al modelo, caché, porcentaje manual configurable "with rollback capabilities"). |
| R4 · datos sensibles | Retención, anonimización, acceso mínimo | Five Nines ADR-0017: tres clases de foto con retención distinta (originales 180 días, derivadas 90, conjuntos de entrenamiento anonimizados). Pragmatic: el "story" anonimiza antes de que el modelo de matching vea nada. ZAItects ADR-007: datos sensibles en servidores propios, tareas generales en la nube. |
| R5 · empezar simple y condición escrita | Monolito primero; condición medible para cambiar | Five Nines ADR-0014/0020/0022: empezar con un modelo gestionado o estadístico y escribir cuándo se pasa a uno propio (falsos positivos >5 %; mAP <0,75 tras 3 meses; MAPE >30 % cuatro semanas seguidas). ZAItects ADR-003: RAG en vez de fine-tuning. Fachada hacia el proveedor: ZAItects ADR-001 (AI gateway), Five Nines ADR-0013 (MoCoP) y NFR_9 "Vendor abstraction layer (<2 week migration)". |

---

## 2. Verificación por repo

### T8 · reglas y datos propios alrededor del modelo

| Repo | ¿La sostiene? | Evidencia (archivo + cita corta) | Detalle concreto |
|---|---|---|---|
| Five Nines | Sí | `FN/adrs/ADR-0018`: "Apply hard constraints and business policies (minimum margin, local regulations, subscription discounts)." | Precio: ML estima elasticidad, GenAI explica, reglas fijan margen mínimo, regulación local y descuentos. Alternativa descartada, solo ML: "may fail under corner cases (e.g., local laws, minimum fare) without deterministic rules". Mismo reparto en ADR-0005 (rutas: "Rule-based constraints for compliance") y ADR-0012 (chatbot). |
| Five Nines | Sí | `FN/adrs/ADR-0012`: "While pure GenAI can handle natural dialogue, it lacks deterministic control for operations (e.g., booking, payments)." | Las acciones transaccionales las hacen reglas y plantillas; la GenAI solo entiende y redacta. `FN/requirements/2_FRs.md` FR#2A: "We will only use for non-predefined questions." |
| Pragmatic | Sí (otro motivo: sesgo y probabilidad de probar) | `PR/C4/C3-components-matching.md`: "AI should only be used for feature extraction and not for the scoring and matching itself" | ADR-011 elige la opción B (características legibles extraídas por IA y luego fijas) y descarta C (la IA empareja directo) "due to bias concerns". ADR-010: "access requires special privileges which are not given to the matching service". |
| ZAItects | Parcial | `ZA/README.md` (Anti patterns): "Low Error Tolerance: Agents, being probabilistic, can occasionally make incorrect decisions" | Descartan agentes para los tres casos. ADR-010: filtros por reglas ("Stripping phrases like 'Ignore all instructions'") antes del modelo, luego un LLM guardia, luego un humano. ADR-003: los ejemplos de contexto salen de respuestas ya calificadas por expertos (datos propios). El README no dice cuánto cuesta no usar agentes. |
| ConnectedAI | Parcial | `CA/1_requirements/01-functional-requirements.md`: "Provide responses based only on verified data from the company database." | Las herramientas leen la base de pedidos y productos; la de pedidos "A check is applied to ensure the order belongs to the given customer" (`CA/3_architecture_and_design/c3-component-order-processing-agent.md`). [HUECO] No dice si la elegibilidad de devolución la calcula la herramienta o la decide el modelo. |
| CELUS Ceals | No | `CE/3.ARDs/006`, `CE/1.ProblemBackground/0.BusinessGoalsDrivers.md` | El modelo corre en la cámara; el repo diseña cómo se etiqueta, entrena y despliega, no qué reglas lo rodean. |

### T9 · evaluar con varias métricas antes de confiar

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| ConnectedAI | Sí (explícito) | `CA/6_test_cases/evaluation.md`: "This suggests that individual metrics are not enough on their own, and we need to consider them holistically." | Tres modelos, dos métricas de Ragas (fidelidad y relevancia de la respuesta). Gemini 1.5 Flash: relevancia 0,8 y fidelidad 0,0. Ver sección 3. |
| Five Nines | Sí | `FN/adrs/ADR-0014`, `ADR-0015`, `ADR-0020`, `ADR-0022` | Cleanliness: falsos positivos <5 %, precisión y recall por clase de severidad. Daños: mAP@0,5 ≥0,75, precisión ≥85 %, recall ≥80 %, latencia ≤5 s. Sesgo: "No subpopulation has >2× false positive rate vs overall". Etiquetado: kappa de Cohen ≥0,8 con conjunto de oro. Pronóstico: MAPE principal, RMSE, MAE y exactitud direccional; compuertas de promoción (ver sección 3). ADR-0011 es la plataforma de evaluación, no define métricas. |
| ZAItects | Parcial | `ZA/ADRs/009-adr-llm-evaluation.md`: "A Hybrid Evaluation Strategy will be implemented" | Cuatro técnicas combinadas (métricas automáticas, rúbrica con LLM, LLM juez, humano). Las cifras están en otro lado: `roll-out-strategy.md` ">90% AI grading accuracy (compared to human baselines)" y `fitness-functions.md` (exactitud medida con los cambios que hace el experto). No hay métricas por clase ni por subgrupo. |
| Pragmatic | Parcial (evalúa antes de confiar, sin métricas) | `PR/ADR/ADR-025`: "Large Test-sets with important business cases needs to be carefully created" | Conjuntos de prueba por etapa (currículum a story, a tips, a características; rol a características; empleador a datos). Ninguna métrica ni umbral declarados. Motivo: Q14 (cambiar prompt o modelo sin pérdida de calidad) que ADR-011 dice poder resolver "only through exhaustive testing". |
| CELUS Ceals | Parcial débil | `CE/1.ProblemBackground/0.BusinessGoalsDrivers.md`: "With enough confidence in built models, the solutions can be run with certainty" | Prevé desplegar modelos en cámaras "for evaluation of the model performance"; sin métricas ni umbral. En `4.Solution/2.Suggestion-SecondIteration/README.md` propone votación de expertos en iNaturalist porque un solo anotador produce "noisy labels". |

### T10 · humano en el circuito con umbral y resultado por defecto seguro

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| Five Nines | Sí | `FN/adrs/ADR-0016`: "Low confidence: Default to customer-favorable outcome (no fee / defer decision); flag for dataset enrichment." | Tres bandas; cola de revisión con SLA (limpieza P95 ≤2 h, daños P95 ≤1 h); códigos de razón; auditoría (quién, cuándo, versión del modelo, umbral). Cifras de umbral en `2_FRs.md` y ADR-0020, que no coinciden entre sí (ver sección 5). |
| ZAItects | Sí (sin valor de umbral) | `ZA/usecases/hmw-ai-grading-short-answers.md`: "If the confidence score exceeds a configurable threshold, the result is finalized automatically." | La confianza la calcula un segundo LLM ("ASAS Judge"), no el calificador. Bajo el umbral: "Pending Manual Review". Fase 1 con IA y humanos en paralelo; porcentaje manual configurable. |
| Pragmatic | **No** | `PR/Requirements/glossary.md`: "Threshold definition is an implementation detail." | El umbral que existe es el del puntaje de match, no el de confianza del modelo, y no dispara revisión humana. El humano que decide es el empleador (R15, R17). La entrevista menciona "Human control for matches" solo como forma de fine-tuning (`PR/Requirements/Research/interview-ai-expert.md`). |
| ConnectedAI | Parcial débil | `CA/2_features_and_roadmap/features.md`: "Redirects unresolved queries to human support or alternative agents." | Agente de respaldo; no hay umbral ni criterio de "unresolved". El monitoreo de IA responsable figura como componente futuro. |

---

## 3. Los mejores ejemplos para enseñar

### T8

**Ejemplo 8.1 · Five Nines: tres capas, cada una con su trabajo (precio, rutas, chatbot).**
- Caso: MobilityCorp alquila scooters, e-bikes, autos y vans en varias ciudades de la UE (OKR actual: 9.345 alquileres al mes, ingresos mensuales de €181.824, `FN/requirements/suggested OKRs/OKRs.md`). Quiere precio dinámico, rutas y un chatbot con IA.
- Situación que obliga a decidir: el precio depende de demanda, clima, eventos y precios de la competencia (FR#2F), pero hay mínimos que no se pueden romper. ADR-0018 nombra "minimum margin, local regulations, subscription discounts". El chatbot (ADR-0012) debe ejecutar reservas y pagos.
- Decisión: tres capas. ML predice elasticidad y optimiza el precio base; GenAI explica el precio en lenguaje natural ("price is higher due to city event and demand increase"); código aplica restricciones duras. En el chatbot, un clasificador de intención "scores confidence and routes to either GenAI continuation, predefined function (e.g., booking API), or support".
- Alternativas declaradas: reglas solas ("lacks adaptability and misses optimization opportunities"), solo ML ("may fail under corner cases (e.g., local laws, minimum fare) without deterministic rules"), solo GenAI ("lacks reliability for numerical precision and may introduce compliance risks"). En el chatbot: "Full GenAI Chatbot" (alto costo, sin control determinista, riesgos de cumplimiento) y "Rule-Based Bot Only" (mala experiencia).
- Costo admitido: la tabla de riesgos de ADR-0012 enumera costo de GenAI sin control ("Cost Overrun"), alucinación, latencia de la orquestación en varias etapas y tono inconsistente; mitiga con ruteo con presupuesto de tokens y "deterministic templates for transactional intents". ADR-0018: latencia y costo de usar GenAI para todo; "Restrict GenAI to real-time factors". [HUECO] Ningún ADR cifra cuánto cuesta mantener las tres capas.
- Qué enseña: el reparto de trabajo se decide por el costo del error de cada tarea (un precio por debajo del margen o un cobro mal hecho no se corrigen con una disculpa), no por la moda de la herramienta. Por qué este ejemplo: es el único donde el mismo patrón se repite en cuatro ADR (0005, 0012, 0018, 0019) y se puede mostrar cómo se reutiliza.
- Fuentes: `FN/adrs/ADR-0018`, `ADR-0012`, `ADR-0005`, `ADR-0019` (Hard constraints), `FN/requirements/2_FRs.md` filas 2A y 2F.

**Ejemplo 8.2 · Pragmatic: el modelo solo extrae, el código puntúa (sesgo).**
- Caso: ClearView (Diversity Cyber Council, organización sin fines de lucro) empareja candidatos con puestos usando currículos anonimizados. El sesgo es "the very thing we seek to control" (README).
- Situación: A7 "Decisions made by AI are especially difficult to comprehend and justify"; A8 "Existing LLMs contain all kinds of biases, including those ClearView seeks to eliminate"; A9 "A fair hiring process seeks to increase determinism"; A10 "Different versions of models therefore quickly lead to different results". Q5: la IA solo debe considerar el story anonimizado.
- Decisión (ADR-010 + ADR-011, 2024-09-26): el currículum solo se guarda en el servicio de candidatos y el matching no tiene permiso para leerlo; la IA extrae "características legibles por humanos" de story y rol y se fijan; el puntaje lo calcula código. Opción B de seis (A a F).
- Alternativas declaradas: A (extraer de ambos y emparejar estático), C (la IA empareja currículum y rol: descartada "due to bias concerns" y por contradecir ADR-010), D (la IA decide si story y rol coinciden), E (características legibles con puntaje), F (características propias por rol: "too resource-intensive"). Complejidad en número de prompts: lineal O(n+m) para A y B, cuadrática para las demás.
- Costo admitido: README, Known Limitations: "Defining these features comprehensively for all S.M.A.R.T stories and open roles can be challenging." ADR-010: debilita Adaptability. ADR-011 deja vacía la sección de características debilitadas. ADR-025: las pruebas consumen prompts (Cost debilitado).
- Qué enseña: se puede dejar al modelo una tarea angosta (extraer atributos) y sacar la decisión de su alcance; así la decisión se puede inspeccionar, probar con pruebas pequeñas y no depende de qué versión del modelo esté activa. Por qué este ejemplo: es la alternativa a los umbrales de T10: en vez de vigilar la confianza del modelo, se le quita la decisión. Sirve de contraste con Five Nines.
- Fuentes: `PR/ADR/ADR-010`, `ADR-011`, `C4/C3-components-matching.md`, `Requirements/requirements-and-assumptions.md` (A7 a A10, Q5, Q9, Q14, Q15), `README.md`. Nota: ADR-010 está incompleto (la frase "The story service does" queda cortada y remite a un "Q4" que no existe en la lista).

**Ejemplo 8.3 · ZAItects: no usar agentes donde el error se paga caro, y poner reglas antes del modelo.**
- Caso: Certifiable Inc. certifica 200 candidatos por semana con 300 expertos y espera de 5 a 10 veces más demanda; cada licencia cuesta $800 y la corrección manual $470 en promedio (58 %).
- Situación: ADR-010 enumera ataques (inyección de instrucciones, intentos de engañar al modelo con texto que parece parte de la rúbrica, sesgo de estilo). La restricción de negocio dice que las evaluaciones inexactas "could impact candidates' careers" (README, Business Constraints).
- Decisión: tres pasos en cascada (reglas, LLM guardia, humano) y, en el README, "we deliberately avoided" los agentes. Razones listadas: flujos bien definidos, baja tolerancia al error, costo y latencia, cumplimiento. Deja los agentes "best suitable for the analytics use case".
- Alternativas: ADR-010 evalúa filtros por reglas, LLM evaluador y revisión humana con tabla de seis criterios (proximidad, robustez, resultado, adaptabilidad, costo, tiempo); elige las tres.
- Costo admitido: los filtros por reglas "May require frequent updates as attack methods evolve"; la revisión humana "Not scalable for all cases"; README: "The system relies on human reviewers for low-confidence cases, which can become a bottleneck as submission volume grows." [HUECO] No cuantifica el costo de no usar agentes.
- Qué enseña: el nivel de autonomía del componente es una decisión de arquitectura con razones escritas. Por qué este ejemplo: es el único repo que justifica rechazar un patrón de IA popular; sirve de contraste con ConnectedAI (ver sección 4).
- Fuentes: `ZA/README.md` (Anti patterns, Business Constraints), `ZA/ADRs/010`, `ZA/ADRs/003`.

### T9

**Ejemplo 9.1 · ConnectedAI: dos métricas, un modelo con respuesta útil en apariencia (Gemini) y una decisión que los números no explican.**
- Caso: ShopWise, tienda en línea, quiere un asistente que responda sobre pedidos y devoluciones leyendo su base de datos. Equipo de Woolworths Group (Australia).
- Situación: tres modelos candidatos con el mismo conjunto de prueba (`return-eligibility-test-set`, preguntas de variaciones sobre "Can I return my order, the order ID is 1234", generadas con LLM). Dos métricas de Ragas, calculadas por un LLM juez: fidelidad al contexto y relevancia de la respuesta.
- Resultados (tabla del archivo, tal como está escrita): GPT-4o-mini, ~5 s (escrito "~5~"), ~$0,0003, fidelidad 0,3, relevancia 0,8; Claude Sonnet 3.5, ~10 s, ~$0,015, fidelidad 0,3, relevancia 0,4; Gemini 1.5 Flash, ~2,5 s, <$0,0001, fidelidad 0,0, relevancia 0,8.
- Qué pasó con Gemini: "asking for an order ID even when the order was provided in each of the questions". Su relevancia salió alta porque "the relevancy score is related to the number of relevant statements in the answer, and the answer is only one statement". Fidelidad baja porque no usó el contexto. Conclusión del equipo: las métricas individuales no alcanzan.
- Decisión y costo admitido: eligieron Claude Sonnet 3.5 "despite it's greater cost due to the better user experience and performance", tras "multi-turn conversations and qualitative testing". Cierran con: "In future work, we would like to quantitatively evaluate the performance of the model in a more comprehensive manner". [DEDUCCIÓN] Con sus propias dos métricas, Sonnet tiene la misma fidelidad que GPT-4o-mini, la mitad de relevancia y unas 50 veces el costo por consulta (0,015 / 0,0003); la elección se apoya en revisión cualitativa, no en esos números. El repo lo reconoce en parte.
- Qué enseña: (1) una métrica sola se puede cumplir sin que el sistema sirva; (2) la métrica puede estar mal construida para el caso; (3) la decisión final suele mezclar números y juicio, y conviene decir cuáles pesaron. Por qué este ejemplo: es el único donde el propio equipo muestra una métrica engañando y lo explica; es corto y cabe en un minuto de video.
- Fuentes: `CA/6_test_cases/evaluation.md` (completo), `CA/4_adrs/002_adr_pre_trained_models.md` (Sonnet para razonamiento y herramientas, Gemini Flash para ruteo y tareas simples), `CA/4_adrs/007_adr_evaulation_framework.md` (Langfuse autoalojado).

**Ejemplo 9.2 · Five Nines: la evaluación como parte del ciclo, con compuertas.**
- Caso: la misma plataforma de movilidad; modelos de visión para limpieza (FR#2L) y daños (FR#2M) y de pronóstico de demanda (FR#2G/H).
- Situación: un falso positivo cobra €50 a €150 a un cliente (FR#2L) o le atribuye un daño (daños sin tope: "Actual repair cost (uncapped, based on quote)", `Appendix A_ Core functionality.md` 1-8); el chequeo de IA cuesta "≤€0.10/check" (NFR_8). [DEDUCCIÓN] La asimetría entre lo que cuesta medir y lo que cuesta equivocarse es la razón de que midan tanto, pero ningún ADR lo dice con esas palabras.
- Decisión (varios ADR): (a) objetivos numéricos por modelo antes de entrenar: limpieza, falsos positivos <5 % (ADR-0014); daños, mAP@0,5 ≥0,75, precisión por clase ≥85 %, recall ≥80 % (ADR-0020); (b) conjunto de oro fijo, doble etiquetado en 10 a 20 % de las muestras, kappa ≥0,8, sondas de sesgo por franja (luz día/noche, clima, color, interior/exterior): "No subpopulation has >2× false positive rate vs overall; severity calibration within ±10% per stratum" (ADR-0015); (c) para pronóstico, MAPE como principal más RMSE, MAE y exactitud direccional; "New model must outperform champion by ≥5% MAPE reduction", prueba retrospectiva de 4 semanas y "Shadow deployment for 1 week before full promotion" (ADR-0022); (d) monitoreo continuo: reentrenar automático si la exactitud baja de 80 % durante 14 días (NFR_9); alerta si el mAP cae más de 5 % (ADR-0020).
- Alternativas: ADR-0011 compara plataforma gestionada, marco propio, MLflow, Azure ML y evaluación manual (la descarta: "poor scalability, governance gaps, increased drift risk"). El repo no compara conjuntos de métricas.
- Costo admitido: ADR-0011 lista costo de evaluar con muestreo, latencia hasta el despliegue, dependencia del proveedor y "Over-automation: Metrics alone may not reflect business quality" (mitigación: revisión humana de las versiones críticas). ADR-0015: "Labeling at scale can be expensive and slow". La adopción de la plataforma queda condicionada a un piloto ("A pilot will be executed"); el repo no tiene resultados del piloto.
- Qué enseña: lo que se mide, con qué número mínimo se promueve y cómo se detecta que algo empeora se escribe antes de construir. Por qué este ejemplo: muestra las métricas en cascada (negocio, modelo, subgrupo, etiquetado) y las compuertas.
- Fuentes: `FN/adrs/ADR-0011`, `0014`, `0015`, `0020`, `0022`, `FN/requirements/3_NFRs.md` (NFR_8, NFR_9), `FN/hld/mlops/README.md` (escenarios de evaluación de modelos combinados, p. ej. "LLM (Gemini) → ML scorer → rule-based post-filter → final output").

**Ejemplo 9.3 · Pragmatic: cambiar el prompt es cambiar el sistema, así que hay un plan de pruebas.**
- Caso: ClearView (ver 8.2).
- Situación: entrevista con el experto: "Any change to AI or the prompt has the potential to change the outcome." A10, A20, A27, A28: los modelos quedan obsoletos en 1 a 2 años, los prompts distintos dan salidas distintas "even if temperature setting is set very low". Q14: el cambio de prompts o modelos debe funcionar "without significant decay of matching performance". Q15: debe poder recalcularse el puntaje.
- Decisión (ADR-025, 2024-09-30): conjuntos de prueba grandes con resultado esperado, por etapa: currículum a story (foco en anonimización), a consejos, a características; story a características; rol a características; empleador a datos públicos; matches esperados. La separación en etapas viene de ADR-011: la representación intermedia "allows for smaller, more precise tests".
- Alternativas: no declara (se lo puede contrastar con ADR-004, donde bajan "integridad de datos" porque "Quality assurance of the AI models is already addressed by the characteristic testability").
- Costo admitido: "Cost (tests require LLM prompts, which drive cost)" y "anonymization can only be verified by humans or by leveraging other LLMs (which adds complexity)".
- Qué enseña: la testabilidad es una cualidad de arquitectura que se compra: dividir el proceso en etapas con salidas verificables hace posible medir. Por qué este ejemplo: conecta T9 con R5 (condición para cambiar de modelo) y con el costo; no tiene métricas, así que se usa para "antes de confiar" y no para "varias métricas".
- Fuentes: `PR/ADR/ADR-025`, `ADR-011`, `ADR-004`, `PR/Requirements/requirements-and-assumptions.md`, `PR/Requirements/Research/interview-ai-expert.md`.

**Ejemplo 9.4 (corto) · ZAItects: correr IA y humanos en paralelo antes de cambiar nada.**
- Caso: ZAItects (ver 8.3). Fase 1 de `other_design_docs/roll-out-strategy.md`: "AI and human grading run in parallel to measure accuracy and refine AI decisions." Indicador: "AI vs. human grading alignment (% similarity in evaluation)". Fase 3 declara como meta ">90% AI grading accuracy (compared to human baselines)" e intervención de expertos "below 10% of cases". La función de aptitud 6 mide la exactitud de la IA "by comparing the actual grading given by an expert who would have overriden the grade".
- Costo admitido: ninguno cifrado. [HUECO] El plan no dice cuánto dura la fase 1 ni quién decide pasar a la fase 2.
- Qué enseña: la medición más barata antes de confiar es dejar que el sistema viejo siga decidiendo mientras el nuevo propone. Fuentes: `ZA/other_design_docs/roll-out-strategy.md`, `fitness-functions.md`.

### T10

**Ejemplo 10.1 · Five Nines: el cargo por limpieza con tres bandas y un resultado por defecto que favorece al cliente.**
- Caso: MobilityCorp cobra cargos de limpieza (Minor €50, Major €100, Severe €150) a partir de 4 fotos que sube el cliente al devolver el vehículo, clasificadas por un modelo de visión. Ventana de disputa: 48 horas, decisión en 5 días, una escalación. Línea base de disputas: 12 % de los alquileres, objetivo 4 % (OKR 4.2).
- Situación: FR#2L fija "AI confidence >90% auto-decides. 80-90% human review. <80% waives fee. Gold tier first offense waived" y marca el riesgo: "AI false positives damaging customer trust". ADR-0014: "Confidence thresholds must minimize false positives to protect customer experience".
- Decisión (ADR-0014 y ADR-0016): alta confianza, se acepta o cobra según política; media, cola de revisión con SLA (limpieza P95 ≤2 h; daños P95 ≤1 h en horario hábil; fuera de horario, escalamiento a guardia); baja, "Default to customer-favorable outcome (no fee / defer decision)". El revisor ve la predicción, pistas de explicación y galería de evidencia, y "must confirm or override with reason code". Auditoría completa (quién, cuándo, versión del modelo, umbrales, evidencia). Las correcciones del revisor alimentan el reentrenamiento y la calibración con conjuntos de oro. Las decisiones se publican al Payment Service.
- Alternativas declaradas (ADR-0016): decisión totalmente automática ("higher risk of unfair charges and churn; no guardrails for ambiguous cases"), solo inspección manual ("slow, expensive, inconsistent; poor scalability") y ventana de revisión solo después del cargo ("harms trust; refunds after-the-fact increase support burden and frustration").
- Costo admitido: riesgos del propio ADR-0016: retraso y acumulación de casos en horas pico, inconsistencia entre revisores (mitigación: kappa ≥0,8, guías y calibración), costo de tiempo humano ("Focus on medium-confidence only"), deriva de los umbrales ("Threshold drift"). ADR-0014: errores "→ unfair fees or missed revenue". [DEDUCCIÓN] El resultado por defecto favorable al cliente significa que en baja confianza la empresa deja de cobrar algo que quizá correspondía; el repo no estima cuánto.
- Qué enseña: (1) decidir de antemano qué pasa cuando el modelo no sabe; (2) quién pierde si el sistema se equivoca define hacia dónde se inclina el valor por defecto; (3) la revisión humana es un servicio con SLA, capacidad y auditoría, no una frase en el diagrama; (4) las correcciones humanas son datos para mejorar el modelo. Por qué este ejemplo: es el único repo con valores por defecto, SLA y flujo de feedback escritos.
- Fuentes: `FN/requirements/2_FRs.md` (2L, 2M), `FN/adrs/ADR-0014`, `ADR-0016`, `ADR-0020`, `FN/requirements/Appendix A_ Core functionality.md` (1-8), `FN/requirements/suggested OKRs/OKRs.md`.

**Ejemplo 10.2 · ZAItects: el calificador y el juez son dos componentes, y el umbral decide cuánto cuesta el sistema.**
- Caso: ZAItects (ver 8.3), calificación de respuestas cortas de la prueba 1 (hoy 3 horas de experto por candidato).
- Situación: "Accuracy – the system must grade the short answers with accuracy levels equivalent to that of manual grading". Limitación declarada de costo: la IA no debe subir los costos de calificación más de 30 %.
- Decisión (`hmw-ai-grading-short-answers.md`): el "ASAS Grader" califica con RAG, ejemplos y cadena de razonamiento; el "ASAS Judge" asigna una confianza; si supera un umbral configurable, la nota queda final; si no, pasa a "Pending Manual Review" y la corrección del experto retroalimenta al Judge. "Splitting the Grader and Judge into separate components allows us improve/test one component while keeping the other component constant." Para los casos de estudio (prueba 2) el Judge es "an external LLM" que evalúa la nota que dieron otros modelos.
- Economía (`other_design_docs/cost-analysis.md`): "Human Review Factor is assumed to be 0.2". A escala 10x (2.000 candidatos por semana): horas de experto 18.800 → 3.760; costo de expertos $940.000 → $188.000; costo de LLM $2.700; total $190.700; $95,35 por candidato frente a $470. [DEDUCCIÓN] El LLM pesa 1,4 % del total (2.700 / 190.700); la variable que mueve el costo es la fracción que va a revisión humana, o sea el umbral. Cálculo de lectura, el archivo no lo dice así. La cifra 0,2 es un supuesto, no una medición, y el archivo agrega "is expected to come down further". El plan por fases fija la meta final en "Expert intervention rate below 10% of cases".
- Alternativas: ADR-009 lista la evaluación manual con "Time-consuming, costly, and not scalable" y elige un híbrido; ADR-010 compara reglas, LLM y humano y elige los tres. No hay una alternativa escrita a un umbral único (por tipo de pregunta, por candidato, etc.).
- Costo admitido: README: cuello de botella de la revisión humana al crecer el volumen. ADR-009 reconoce que LLM como juez tiene exactitud "Moderate" y "Requires fine-tuning and validation to ensure reliability". [DEDUCCIÓN] La confianza viene de otro modelo, no de una probabilidad calibrada del primero; el repo no dice cómo se verifica que el Judge sea fiable, solo que "manual review outcomes feed back into the ASAS Judge".
- Qué enseña: (1) de dónde sale el número de confianza importa y debe tener su propia evaluación; (2) el porcentaje que va a revisión es la palanca de costo; (3) el despliegue por fases (en paralelo, IA primero con supervisión, IA con auditoría) usa la intervención humana como indicador. Por qué este ejemplo: es el único que cierra la cuenta económica del humano en el circuito, y permite contrastarla con Pragmatic (ver sección 4).
- Fuentes: `ZA/usecases/hmw-ai-grading-short-answers.md`, `ZA/usecases/hmw-ai-grading-case-studies.md` ("Case study Judge and Human in the loop"), `ZA/other_design_docs/cost-analysis.md`, `roll-out-strategy.md`, `ZA/README.md` (Business Constraints, Roadmap, Limitations).

**Ejemplo 10.3 (corto) · ZAItects: nada llega al examen sin aprobación humana.**
- ADR-004 y README: las preguntas generadas con búsqueda web y RAG pasan por filtro de reglas, evaluación por LLM y "Human-in-the-Loop (HITL) Review – For final verification of high-stakes content"; los arquitectos expertos "can review the questions ... and include them in the tests if they are satisfactory". Aquí no hay umbral: el resultado por defecto es que el contenido no se publica. Enseña que el humano puede ir al final del proceso como puerta, no solo en la franja de duda. Fuentes: `ZA/ADRs/004-adr-new-questions-and-case-studies-strategy.md`, `ZA/README.md`.

### 3.4 Puente con R1 a R5 (frases-guía para el módulo, ya con respaldo)
- "Dueño del dato": en Pragmatic la IA es un cliente más del dato y se le niega el currículum con un permiso; en Five Nines la IA publica una decisión y otro servicio es el dueño del cobro. El modelo no es dueño de nada. (`PR/ADR/ADR-010`; `FN/adrs/ADR-0016` §4.)
- "Diseñar el fallo": para un modelo, el fallo habitual no es una excepción sino una respuesta equivocada; por eso el diseño del fallo es la banda baja de confianza y su resultado por defecto (T10).
- "Condición escrita para cambiar": tres ADR de Five Nines escriben el disparador de la fase 2 con números (ADR-0014: falsos positivos >5 %; ADR-0020: mAP <0,75 tras 3 meses, falsos positivos >10 %, latencia p95 >5 s; ADR-0022: MAPE >30 % cuatro semanas seguidas). ADR-0021 aplica lo mismo hacia abajo: descarta el modelo profundo porque da "slightly better accuracy but unnecessary operational complexity".
- "Cuenta de costo con supuestos escritos": Pragmatic estima por prompt (≈850 tokens de entrada, ≈1.400 de salida; $0,025 con GPT-4o y $0,001 con GPT-4o mini, "at minimum"; `PR/Requirements/Research/token-estimation.md`); ZAItects con una fórmula y el factor 0,2; Five Nines con un tope por chequeo. Los tres escriben el supuesto.

---

## 4. Decisiones contrarias

1. **Humano que revisa vs. quitarle la decisión al modelo.** Five Nines deja que el modelo cobre a confianza alta y manda a un humano la franja media (T10). Pragmatic no tiene revisor ni umbral: reduce lo que el modelo hace a extraer características y deja la decisión en código (ADR-011) y en el empleador (R15). Razón de Pragmatic: A7 a A10 (decisiones de IA difíciles de justificar, sesgos de los modelos, versiones que cambian resultados). [DEDUCCIÓN] Además es una organización financiada con donaciones y su primera cualidad es Feasibility; el repo no dice que haya descartado la revisión humana por costo. Razón de Five Nines para la revisión: la alternativa de inspección solo manual es "slow, expensive, inconsistent; poor scalability" (ADR-0016). De qué depende: de si se puede reducir la tarea del modelo a algo verificable; la clasificación de fotos de limpieza no se puede reducir así.
2. **Agentes: ZAItects los descarta, ConnectedAI los adopta.** ZAItects: "Agents, being probabilistic, can occasionally make incorrect decisions—unacceptable in a high-stakes certification process." ConnectedAI: un "Customer Support Supervisor" enruta a agentes con herramientas (`architecture.md`), orquestados con LangGraph (ADR-005), y un agente de respaldo hacia soporte humano. [HUECO] ConnectedAI no escribe la razón de por qué acepta ese riesgo. [DEDUCCIÓN] En ConnectedAI las herramientas leen datos y el costo de un error (decir mal el estado de un pedido) es menor que el de una nota de certificación; el repo no lo dice.
3. **Qué domina el costo de la IA.** Pragmatic: "The infrastructure cost of an external LLM will very likely be the main driver of the overall infrastructural cost", con la anécdota "500'000 prompts resulted in a 500'000 USD bill" (entrevista). ZAItects: el LLM pesa 1,4 % del total y el costo está en las horas de expertos. De qué depende: de si hay personas pagas en el circuito.
4. **Chatbot totalmente generativo.** Five Nines lo descarta ("High cost, no deterministic control, compliance risks, unstable API behavior", ADR-0012). ConnectedAI usa un modelo de lenguaje para todo el diálogo con herramientas de lectura sobre la base de datos (ADR-002, ADR-005). La diferencia práctica en los repos: Five Nines ejecuta reservas y pagos desde el chat, ConnectedAI responde consultas.
5. **Aplicar IA o no.** Five Nines ADR-0021 descarta GenAI para el consejo de carga ("the advice can be expressed through predefined templates") mientras en el precio la usa para explicar. BluzBrothers (MonitorMe) detecta anomalías en signos vitales con "a set of globally defined rules" y no declara haber considerado ML (`BluzBrothers-src/UseCases/US2-alert.md`); no es una decisión contraria porque no hay alternativa escrita.

---

## 5. Límites

- **Todas son katas en papel.** Nadie midió exactitud, tasa de revisión humana ni costo reales. Los únicos números medidos son los de ConnectedAI (una evaluación pequeña) y los de la tabla de Pragmatic (precios de lista de un día). Las cifras de Five Nines y ZAItects son metas o supuestos.
- **Selección sesgada.** Las cuatro katas con IA (Five Nines 2025, ZAItects 2025, Pragmatic 2024, ConnectedAI 2024) piden IA en el enunciado; CELUS 2023 usa modelos en la cámara pero no los pone en una decisión. Los otros siete repos no tienen IA que decida. No se puede decir que "los ganadores" hagan algo con IA, solo que lo hacen quienes recibieron una kata de IA. Además, que varios equipos repitan una práctica no prueba que la hayan descubierto por separado (autorrevisión 3 en `DISENO-CURSO.md`).
- **Los umbrales de Five Nines no coinciden entre documentos del mismo repo.** Cleanliness: FR#2L ">90 % decide, 80-90 % revisa, <80 % sin cargo"; Context Diagram "Human review if confidence < 90%"; SD-003 "Confidence < 90% (Medium confidence)" sin banda baja; ADR-0014 y ADR-0016 no dan cifras. Daños: ADR-0020 y SD-003 85/70. Falsos positivos: ADR-0014 "<5%", FR#2M y ADR-0020 "<10%", `video/narrative.md` "< 2 % false positives" y "≥ 93 % precision". SLA de revisión: 30 min (Appendix A, SD-003), P95 2 h y 1 h (ADR-0016), 24 h (NFR_9). Retención de fotos: ADR-0017 180 días; NFR_7 y SD-003 90 días. Para el video: enseñar el mecanismo (bandas, default, SLA) y citar una cifra solo con su archivo; no presentar un valor como "el umbral de Five Nines".
- **`FN/video/narrative.md` es un guion de presentación, no un ADR.** Sus cifras (por ejemplo "82 % prediction accuracy", "Refund rate 2.8 % → 1.4 %", "≈ €120 000 savings per month") no aparecen en los ADR ni en los requisitos; no usarlas como evidencia.
- **Nadie dimensiona la cola de revisión.** Ni Five Nines ni ZAItects dicen qué fracción cae en cada banda, salvo el supuesto 0,2 de ZAItects. [DEDUCCIÓN] Con los OKR de Five Nines (9.345 alquileres al mes hoy, 12.335 planeados) y 4 fotos de devolución por alquiler salen unas 37.000 a 49.000 fotos al mes; ADR-0014 habla de "~hundreds of thousands monthly photos". No coinciden y el repo no explica la diferencia.
- **Ningún umbral sale de datos.** No hay curvas de precisión y recall, ni calibración, ni costo de cada tipo de error en cifras. ZAItects ni siquiera da valor al umbral. Se puede enseñar que el umbral se decide por el costo de cada error, pero no se puede mostrar cómo se calculó en ningún repo.
- **"Confianza" no significa lo mismo.** En Five Nines es la salida de un clasificador de visión; en ZAItects la calcula un LLM juez; en Five Nines ADR-0012 es un clasificador de intención. El repo no discute calibración.
- **Datos que faltan.** ConnectedAI: no dice quién calcula la elegibilidad de devolución; el código del backend no está en el repo (solo READMEs); los componentes de IA responsable están marcados como futuros; las imágenes referenciadas en `evaluation.md` no están. Pragmatic: ADR-010 truncado; ADR-012 y 013 no existen; los umbrales de match son "an implementation detail". ZAItects: ADR-015 no tiene sección Decision; varios ADR sin fecha. CELUS Ceals: no define criterios de aceptación de un modelo.
- **Seguridad del modelo.** Prompt injection aparece en ZAItects (ADR-010, ADR-016) y en la entrevista de Pragmatic ("Resume preprocessing ... will be needed"), pero Pragmatic no lo convierte en ADR. Se puede nombrar el riesgo; no hay una solución verificable que enseñar.
- **T16 (cambio de modelo como cambio de versión)** tiene respaldo en 3 repos pero salió de este dossier, no del mapa; falta que Felix la apruebe como verdad.

---

## 6. Para elegir el elenco

- **Five Nines.** Cubre T8, T9 y T10 con ADR completos y seguidos en una sola historia (cleanliness: FR#2L → ADR-0014 → ADR-0015 → ADR-0016 → ADR-0017). Además la plataforma tiene una parte sin IA (retención de fotos, `Fleet Service` como fuente única, NFR de disponibilidad) para que el caso principal llegue a R6 sin cambiar de caso. Debilidades: las cifras no coinciden entre documentos (sección 5); muchos ADR están acoplados a Vertex AI; los ADR de IA comparan enfoques (reglas, ML, GenAI) y casi no comparan modelos concretos; ADR-0019 concluye que la plataforma logra "perfect vehicle availability", sin dato que lo respalde.
- **Pragmatic.** Ilustra T8 con una decisión contraria a la de Five Nines y con motivo distinto (sesgo, probabilidad de probar), y es el mejor para "el costo de la IA se estima con supuestos escritos" (token-estimation, entrevista) y para el cambio de modelo (T16). No ilustra T10 y T9 solo en la forma "plan de pruebas". Si fuera el caso principal, R6 enseñaría "hacer el componente verificable" y no "qué hacer cuando el modelo duda". Su parte sin IA (adaptadores para hasta 200.000 configuraciones de sistemas de RR. HH., un solo servicio por contexto) es fuerte para R2 y R3.
- **ZAItects.** Mejor que ambos en la economía del humano en el circuito (factor 0,2, $95 contra $470), en el despliegue por fases con intervención humana como indicador y en el rechazo documentado de los agentes. Su umbral sin valor y su confianza calculada por otro LLM hay que decirlos tal cual. Como caso principal sería débil: el caso es solo IA.
- **ConnectedAI.** Ningún otro repo muestra una métrica engañando (caso Gemini). Aporta un minuto, no un módulo.
- **CELUS Ceals.** No aporta a T8, T9 ni T10. Lo que aporta es de R5 (comprar el entrenamiento a un proveedor: Edge Impulse, ADR-006, con el costo "Enterprise pricing ... on-request") y una idea de etiquetas probabilísticas por votación de expertos (documento de segunda iteración, sin implementar). No lo usaría en este módulo.
- **Recomendación concreta para este módulo:** si el caso principal es Five Nines, T10 y T9 salen de ahí, T8 se enseña con ADR-0018 más el contraste de Pragmatic (ADR-011), el costo del humano sale de ZAItects (cost-analysis) y el aviso sobre una sola métrica sale de ConnectedAI. Si el caso principal es Pragmatic, T10 tiene que venir de Five Nines y el módulo cambia de caso en la mitad.

---

## 7. Términos que hay que explicar

- **Modelo no determinista:** el mismo dato de entrada puede dar salidas distintas, o una pequeña variación del prompt cambia el resultado.
- **LLM / GenAI:** modelo de lenguaje que genera texto; en estos repos se usa para entender, redactar y calificar.
- **Prompt:** el texto de instrucciones que se le da a un LLM.
- **Token:** unidad en que se cobra y se limita el texto de un LLM (aproximadamente un trozo de palabra).
- **Temperature:** parámetro que controla cuánta aleatoriedad tiene la respuesta de un LLM (Pragmatic: con valor 0, los cambios de prompt pueden causar cambios más erráticos).
- **Fine-tuning (ajuste fino):** reentrenar un modelo con datos propios.
- **RAG:** el sistema busca ejemplos o documentos propios y se los pasa al modelo en el prompt, en vez de reentrenarlo.
- **Prompt injection:** texto malicioso dentro de la entrada (por ejemplo, en un currículum) que intenta cambiar las instrucciones del modelo.
- **Alucinación:** respuesta inventada que el modelo presenta como cierta.
- **Guardrails:** controles antes o después del modelo que bloquean entradas o salidas no permitidas.
- **Confidence score (puntaje de confianza):** número que acompaña a la predicción e indica cuánto "cree" el modelo, o un segundo modelo, que acertó.
- **Umbral y bandas de confianza:** valores de corte que separan lo que se decide solo, lo que revisa una persona y lo que se descarta.
- **Resultado por defecto:** lo que hace el sistema cuando no hay suficiente confianza.
- **Human-in-the-loop (HITL):** una persona revisa o aprueba ciertas decisiones del sistema.
- **SLA / P95:** compromiso de tiempo de respuesta; P95 es el tiempo que cumple el 95 % de los casos.
- **Falso positivo / falso negativo:** el modelo marca algo que no existe (cobra una suciedad que no hay) / no marca algo que sí existe.
- **Precisión y recall:** de lo que el modelo marcó, cuánto era cierto / de lo que era cierto, cuánto marcó.
- **mAP, IoU:** métricas para detección de objetos en imágenes (qué tan bien el recuadro coincide con el daño real).
- **MAPE, RMSE, MAE:** formas de medir el error de un pronóstico (porcentaje, cuadrático, absoluto).
- **Conjunto de oro (golden set):** conjunto fijo de casos con respuesta correcta conocida, usado para comparar versiones del modelo.
- **Kappa de Cohen:** medida de cuánto coinciden dos personas al etiquetar, descontando el azar.
- **Sondas de sesgo:** pruebas por subgrupos (luz, tipo de vehículo) para ver si el modelo falla más en uno.
- **Deriva (drift):** el comportamiento del modelo empeora porque los datos reales cambian con el tiempo.
- **Campeón y retador / despliegue en sombra:** el modelo nuevo corre junto al actual y se compara antes de reemplazarlo; en sombra corre sin afectar decisiones.
- **LLM como juez:** un segundo modelo evalúa la respuesta del primero.
- **Fidelidad y relevancia (Ragas):** si la respuesta se apoya en el contexto dado / si responde lo que se preguntó.
- **Agente / IA agéntica:** LLM que decide solo qué herramientas usar y en qué orden.
- **AutoML:** servicio que entrena un modelo a partir de datos etiquetados sin diseñar la arquitectura a mano.
- **Gateway de IA / MoCoP:** capa intermedia entre las aplicaciones y los modelos que registra, filtra y enruta las llamadas.
- **MLOps:** prácticas para versionar, desplegar y monitorear modelos.
- **Anonimización / retención:** quitar rasgos identificables / cuánto tiempo se guarda un dato.
- **Función de aptitud (fitness function):** prueba automática que verifica una regla de arquitectura (en ZAItects, "exactitud de la IA").

---

## 8. Qué se puede mostrar en pantalla

| Visual | Contenido | Fuente |
|---|---|---|
| Fila de la tabla de requisitos | "AI confidence >90% auto-decides. 80-90% human review. <80% waives fee. Gold tier first offense waived. **Risk:** AI false positives damaging customer trust" y tarifas Minor €50 / Major €100 / Severe €150 | `FN/requirements/2_FRs.md`, fila 2L |
| Tres bandas con su resultado | Alta: acepta o cobra; media: cola con SLA y códigos de razón; baja: "no fee / defer decision" | `FN/adrs/ADR-0016` §1 |
| Secuencia de devolución con la decisión | Diagrama Mermaid con `alt Confidence < 90%` y `else ≥ 90%`; en daños `> 85%` y `70-85%` | `FN/hld/core-func/car-van-rental/4_Sequence_Diagram.md` SD-003 |
| JSON de salida estandarizado con `"review_required": false` y `"model_version"` | Contrato que todo modelo debe respetar | `FN/adrs/ADR-0020`, "Model Output Format" |
| Tabla de disparadores de cambio | falsos positivos >5 % → modelo propio; mAP <0,75 tras 3 meses; MAPE >30 % por 4 semanas | `FN/adrs/ADR-0014`, `ADR-0020`, `ADR-0022` |
| Compuertas de promoción | "New model must outperform champion by ≥5% MAPE reduction", "Shadow deployment for 1 week" | `FN/adrs/ADR-0022` |
| Tres capas de precio | ML (elasticidad), GenAI (explicación), reglas (margen mínimo, regulación, descuentos) | `FN/adrs/ADR-0018` |
| Dos filas de OKR sobre disputas | 12 % → 4 % de disputas por alquiler; 46 % → 6 % de reembolsos | `FN/requirements/suggested OKRs/OKRs.md` 4.2 y 4.3 |
| Opciones A a F y diagrama | Lista de seis opciones de matching y `ADR-011-matching-process.png` | `PR/ADR/ADR-011-deterministic-matching.md`, `PR/ADR/images/ADR-011-matching-process.png` |
| C3 de matching | "AI should only be used for feature extraction..." con el SVG | `PR/C4/C3-components-matching.md`, `PR/C4/images/C3-components-matching.svg` |
| Frase y cita de seguridad de datos | "Resumes are only persisted in the Job candidate service..." | `PR/ADR/ADR-010` |
| Cálculo de tokens | Prompt de ≈850 tokens, respuesta ≈1.400 tokens; $0,025 (GPT-4o) y $0,001 (GPT-4o mini) por prompt | `PR/Requirements/Research/token-estimation.md` |
| Frase de la entrevista | "500'000 prompts resulted in a 500'000 USD bill" | `PR/Requirements/Research/interview-ai-expert.md` |
| Tabla de costos 5x y 10x | horas y dólares con y sin IA; $470 contra $95,35 por candidato; "Human Review Factor is assumed to be 0.2" | `ZA/other_design_docs/cost-analysis.md` |
| Flujo Grader, Judge, Gateway | GIF `short-answer-grading-dataflow.gif` y C3 `test1-grader-c3.jpg` | `ZA/assets/` ; descritos en `ZA/usecases/hmw-ai-grading-short-answers.md` |
| Plan por fases con indicadores | Paralelo, IA primero con supervisión, auditoría; metas ">90%" y "below 10%" | `ZA/other_design_docs/roll-out-strategy.md`, imagen `ZA/assets/rollout-strategy.png` |
| Tabla de resultados de Ragas y cita de Gemini | Tres modelos, tiempos, costos, fidelidad y relevancia; "asking for an order ID even when the order was provided in each of the questions" | `CA/6_test_cases/evaluation.md` |
| Razones para no usar agentes | "Anti patterns": cuatro razones listadas | `ZA/README.md`, sección Anti patterns |

Nota para el guion: ninguna de las cifras en sección 8 debe mezclarse con otras del mismo repo sin comprobar el archivo (ver sección 5, umbrales y retención de Five Nines).
