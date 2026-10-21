# Five-Nines · investigación fase 1 (solo texto)

Rutas relativas a `katas-src/Five-Nines/`. Archivos de texto leídos: 57 (todos los `.md` del repositorio, `.gitignore` y `video/two_customers_speaking.mp4`, que es un archivo de texto de 2 bytes). No se leyeron imágenes, el PDF ni las fuentes `.drawio`.

## 1. El caso

[DATO] El cliente es MobilityCorp ("MobiCorp" en los HLD), que alquila vehículos eléctricos (autos, furgonetas, e-bikes y scooters) por app móvil en ciudades de la UE (`README.md:36`, `hld/core-func/README.md:5-6`, `requirements/4_Assumptions and constraints.md:4,14`). El repositorio es la entrega del equipo Five Nines, ganador de la kata "Q4 2025: AI-Enabled Architecture" de O'Reilly (`README.md:1-3`). Lo que se pide es diseñar desde cero cuatro funciones con IA: diálogo con el usuario (compañía en la app, consejos de ruta, precio y carga), precios dinámicos, pronóstico de demanda y optimización del mantenimiento, "while ensuring continuous and smooth system operation of the existing core rental functionality" (`README.md:69-78`). [DATO] El problema central, según el equipo: demanda fragmentada, costos de mantenimiento impredecibles y desparejos por vehículo, y dificultad para crecer con el modelo actual de precios y operación (`requirements/1_1_Business challenges.md:5-7`). Entre los puntos de dolor están la mala disponibilidad de vehículos donde y cuando se necesitan, la batería impredecible, la reubicación manual y los precios rígidos (`requirements/1_1_Business challenges.md:12-18`). [DATO] Restricciones y supuestos duros: solo UE (`4_Assumptions…:14`); flota promedio de 200 autos o furgonetas, 500 bicis y 5.000 scooters por ciudad (`4_Assumptions…:5`); GPS que reporta cada 30 minutos (`4_Assumptions…:8`); solo teléfonos con NFC (`4_Assumptions…:15`); GDPR y la Ley de IA de la UE (Reglamento (UE) 2024/1689) (`4_Assumptions…:17-18`); no hay sistema heredado para lo nuevo (`4_Assumptions…:10`). Las metas de negocio, todas con plazo a fines de 2026, incluyen +15 % de cuota de mercado, −23 % de costos de mantenimiento, 99,9 % de confiabilidad y 99,9 % de cumplimiento de licencias (`requirements/1_0_Business goals & drivers.md:14-22`). [DATO] Entre los NFR están la escala (más de 10.000 alquileres simultáneos, 500 búsquedas por segundo, al menos 3 regiones de la UE) (`requirements/3_NFRs.md:5`), un 99,5 % de disponibilidad para reservar, desbloquear y pagar (`3_NFRs.md:8`) y un costo de inferencia de IA de ≤ €0,10 por chequeo (`3_NFRs.md:33`). [HUECO] El presupuesto total del proyecto no aparece en el texto.

## 2. Qué entregó el equipo

- `README.md`: portada, enunciado del problema, tabla que mapea capacidades de negocio con FR y ADR/HLD (`README.md:107-141`), stack técnico resumido (`README.md:143-179`).
- `requirements/1_0_Business goals & drivers.md`: cadena *drivers → goals → solutions* con metas numéricas.
- `requirements/1_1_Business challenges.md`: desafíos y puntos de dolor.
- `requirements/2_FRs.md`: FR#1 (mantener lo existente), FR#2A–2M (13 escenarios de IA con entrada, salida y "Tech Choice") y FR#3 (MLOps).
- `requirements/3_NFRs.md`: NFR_1 a NFR_11 con cifras y riesgo de cada uno.
- `requirements/4_Assumptions and constraints.md`: supuestos (flota, GPS, precios, app existente) y restricciones.
- `requirements/5_Risks and mitigation.md`: registro de riesgos consolidado (10 filas).
- `requirements/Appendix A: Core functionality.md`: funcionalidad núcleo (1-1 a 1-10 para usuario, 2-1 a 2-6 para operaciones, 3-1 y 3-2 de negocio), con tarifas y multas.
- `requirements/Appendix B: AI scenarios explained.md`: explicación de cada escenario de IA.
- `requirements/Appendix C: Future scope.md`: ideas a futuro (marketing con IA, roadmap por fases).
- `requirements/suggested OKRs/OKRs.md`: OKR con valor actual y planeado.
- `adrs/`: ADR-0000 (plantilla) y 22 ADR de decisión (ADR-0001 a ADR-0022).
- `hld/README.md`: índice del HLD y la regla de dónde va cada escenario de IA.
- `hld/core-func/README.md`: vista de contenedores del núcleo.
- `hld/core-func/hld-vehicle-connectivity.md`: HLD de conectividad de vehículos (MQTT, Pub/Sub, disponibilidad).
- `hld/core-func/hld-data-and-analytics.md`: arquitectura de datos (lakehouse por capas, con un diagrama mermaid).
- `hld/core-func/car-van-rental/`: contexto delimitado de autos y furgonetas: README, diagrama de contexto, diagrama de contenedores, modelo de dominio (13 agregados o value objects y eventos de dominio) y 7 diagramas de secuencia (SD-001 a SD-007).
- `hld/data-structure/data-sourcing.md`: datos de entrada necesarios y fuentes posibles.
- `hld/mlops/README.md`: MLOps sobre Vertex AI (flujo, evaluación, ejemplos).
- `hld/scenarios/`: cinco escenarios de IA, cada uno con su vista de contenedores (asignación de flota y baterías, pronóstico de demanda, precios dinámicos, análisis de feedback, Trip Copilot).
- `video/narrative.md` y `video/video-scenario-business-management-5min.md`: guiones de la presentación final de 5 minutos.

Cuentas: 22 ADR de decisión más 1 plantilla. Requisitos: 13 FR de IA (2A–2M) más FR#1 y FR#3; 11 NFR numerados (NFR_7 aparece dos veces, ver sección 7); unas 40 funciones núcleo en el Apéndice A. Diagramas: 12 imágenes PNG citadas o presentes, 9 fuentes `.drawio` y 3 diagramas mermaid en texto (flujo de datos, agregados, secuencias). [DATO] Métodos reconocibles: modelo C4 de contexto y contenedores (`hld/core-func/car-van-rental/README.md:25-26`); DDD con contexto delimitado, lenguaje ubicuo, agregados y eventos de dominio (`hld/README.md:7`, `3_Domain_Model.md:3-5,25,113`); OKR (`requirements/suggested OKRs/OKRs.md`). [HUECO] No hay fitness functions, quanta ni event storming con ese nombre.

## 3. Decisiones

Ningún ADR declara un campo de estado. En la columna "Estado" se anota "no declara" y, entre paréntesis, si el texto condiciona la decisión.

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR-0001 | GCP como proveedor de nube principal. | no declara | AWS; Azure | Integración nativa con Google Maps "No additional integration layer needed, unlike AWS or Azure"; BigQuery, Pub/Sub y Dataflow para tiempo real; Vertex AI y Gemini sin infraestructura de ML aparte; competidores (Bird, Dott, Zoomcar) usan GCP | Lock-in, dependencia de funciones, costo impredecible (Pub/Sub, BigQuery, Maps), disponibilidad regional, habilidades, flexibilidad de integración | rastreo en tiempo real, escalabilidad (no cita IDs) | `adrs/ADR-0001 - GCP as main cloud provider.md:6,10-23,26-27,31-38,41-45` |
| ADR-0002 | Gateway MQTT en clúster sobre Kubernetes, detrás de un balanceador, con Pub/Sub como columna de streaming. | no declara | HTTPS directo; broker MQTT independiente | MQTT liviano para dispositivos IoT; Pub/Sub con escala gestionada y durabilidad; separar conectividad de procesamiento; buffering, failover y replay "Enables 99.9% availability targets" | Complejidad del broker, alinear QoS de MQTT con Pub/Sub, lock-in, credenciales por dispositivo, costo por volumen, mezcla de prioridades | disponibilidad 99,9 % | `adrs/ADR-0002 - Vehicle telemetry & integration stack.md:7,10-15,18-19,22-32` |
| ADR-0003 | Vertex AI como plataforma central de entrenamiento, serving, orquestación y agentes GenAI. | no declara | AWS SageMaker con mapas externos; Azure AI Foundry con Azure Maps; stack open source propio | Integración nativa con Google Maps; stack ML/GenAI gestionado de punta a punta; soporte de agentes | Lock-in, costo, dependencia de funciones, gobernanza del proveedor, latencia de GenAI (mitiga con un enfoque híbrido determinista + GenAI) | — | `adrs/ADR-0003 - Vertex AI as core platform for AI and GenAI.md:11,14-16,22-24,29-36` |
| ADR-0004 | Gemini con grounding en Maps para búsqueda contextual, rutas y POI; Maps Platform queda como fuente autoritativa y respaldo. | no declara | Solo Maps API tradicional; búsqueda geoespacial externa; NER y búsqueda propios | Las APIs de Maps son rígidas y obligan a orquestar mucho del lado propio; Gemini encadena llamadas y resume | Lock-in, disponibilidad, costo, latencia (API directa para rutas críticas en tiempo, Gemini para lo contextual) | — | `adrs/ADR-0004 - Use of Gemini for Maps & Search Scenarios.md:9,12-18,37-42,47-54,57` |
| ADR-0005 | Motor de optimización de rutas en la nube con ML predictivo, reglas de cumplimiento, RL y resumen GenAI, gobernado por un "Model Control Plane (MCP)". | no declara | Ruteo estático por API (rechazada); solo reglas (rechazada); procesamiento en el borde (rechazada) | Diferenciarse con rutas personalizadas y adaptativas; la latencia en la nube "can be tolerated" | Latencia de inferencia en la nube, overhead operativo, costo frente a diferenciación ("Prioritize premium route experience to justify value") | FR#2B (por la tabla del README) | `adrs/ADR-0005 - AI-Based Route Optimization for Rental Vehicles.md:4,15-23,50-60,66-72,80-82` |
| ADR-0006 | BigQuery, Cloud Storage y Dataflow para los datos de conocimiento, integrados con Vertex AI para RAG. | no declara | Azure Data Lake + Cognitive Search; Databricks; stack híbrido | Alinear con la estrategia GCP y Vertex AI; una sola plataforma | Lock-in, costo, residencia de datos | — | `adrs/ADR-0006 - Knowledge Management on GCP with Vertex AI Integration.md:4,7,16,19-21,27-29` |
| ADR-0007 | Fleet Service como única fuente de verdad del estado del vehículo y motor de reglas. | no declara | Estado distribuido en varios servicios; Pub/Sub como único mecanismo de propagación; registro IoT dedicado aparte | Evitar la fragmentación del estado; un punto de decisión; menos latencia; topología más simple | Punto único de dependencia, cuello de botella, complejidad por combinar reglas y estado, lock-in | estado en tiempo real para ruteo, reserva y mantenimiento | `adrs/ADR-0007 - Fleet Service as the Single Source of Truth for Vehicle State.md:7,15-22,38-41,47-57,65-69,77` |
| ADR-0008 | Búsqueda vectorial de BigQuery, embeddings de Vertex AI y, de forma opcional, Matching Engine para búsqueda semántica. | no declara | Azure Cognitive Search; Databricks + Milvus | Integración con Vertex AI; menos complejidad | Dependencia del proveedor, escala, costo | — | `adrs/ADR-0008 - Semantic Search on GCP.md:7,15,18-19,25-27` |
| ADR-0009 | Vertex AI Model Registry y Pipelines para el ciclo de vida de modelos GenAI. | no declara | Azure AI Foundry; Databricks MLflow | Registro nativo con versionado; CI/CD integrado | Lock-in, costo, habilidades | — | `adrs/ADR-0009 - GenAI Model Management on GCP.md:7,10-12,18-19,25-27` |
| ADR-0010 | Adoptar Vertex AI Agent Builder como capa de orquestación GenAI, empezando por una PoC. | no declara (condicionada: "If PoC results meet defined targets") | Orquestación propia en Cloud Run o GKE; orquestación con Azure OpenAI; LangChain/LlamaIndex | Runtime gestionado; herramientas, memoria y evaluación incluidas; menor time-to-market | Lock-in, funciones en preview, costo por tokens, latencia, habilidades | — | `adrs/ADR-0010 - Evaluation and Adoption of Vertex AI Agent Builder for AI Service and Orchestration.md:17,23-28,41-48,56-60,68-74` |
| ADR-0011 | Vertex AI Model Evaluation y GenAI Evaluation Service como plataforma de evaluación continua, con compuertas en CI/CD. | no declara (condicionada a un piloto: "If successful…") | Framework propio; stack con MLflow; Azure ML; evaluación manual y ad hoc | Una sola plataforma para modelos predictivos y generativos; rúbricas adaptativas; gating | Lock-in, costo, demora en el despliegue, sobreautomatización (mitiga con revisión humana) | — | `adrs/ADR-0011 - Model Evaluation Flow using Vertex AI.md:19-25,31-35,41-45,53-67,75-79,87-93` |
| ADR-0012 | Chatbot híbrido: GenAI para entender, ML para clasificar la intención y enrutar, reglas o código para funciones núcleo; orquestado por MoCoP. | no declara | Chatbot solo GenAI; bot solo reglas; router ML sin GenAI | GenAI "lacks deterministic control for operations (e.g., booking, payments)"; las reglas carecen de flexibilidad; las preguntas núcleo pueden programarse con if-else | Sobrecosto de GenAI, alucinación, latencia, GDPR, tono inconsistente | FR#2A, FR#2E (por la tabla del README) | `adrs/ADR-0012 - Hybrid AI for User-personalized in-app companionship.md:14,26-33,51,54-64,69-73` |
| ADR-0013 | MoCoP como SaaS gestionado (gateway de IA: routing, políticas, seguridad, evaluación). | no declara (revisión prevista "after 12 months") | MoCoP autoalojado; MoCoP nativo de la nube (Vertex AI, Bedrock, Azure AI); construcción propia | Habilitación rápida, poca carga operativa, residencia de datos en la UE | Lock-in, riesgo de enrutar fuera de la UE, crecimiento del costo, menos control, salto extra de latencia | FRs (genérico), GDPR | `adrs/ADR-0013 - Adoption of Managed SaaS Model MoCoP.md:5,8-11,14-20,39-41,47-51,55` |
| ADR-0014 | Clasificación de limpieza con Vertex AutoML Image primero; modelo propio de detección (EfficientDet/YOLO) solo si no se alcanzan las metas; HITL por confianza. | no declara | AutoML (elegida); detección propia; Vision APIs genéricas; inferencia en el dispositivo | Time-to-value; menos carga de MLOps; las APIs genéricas rinden menos en este dominio | Poco control de la arquitectura; puede estancarse en casos difíciles; tarifas injustas si clasifica mal | FR#2L; latencia < 2–5 s; P95 ≤ 2,5 s; falsos positivos < 5 % | `adrs/ADR-0014 - ML Model Selection for Cleanliness Assessment.md:5,14-16,20-39,61-75,81-87` |
| ADR-0015 | Pipeline de datos de entrenamiento gobernado: etiquetado en Vertex, golden set, doble ciego, muestreo estratificado, pruebas de sesgo y aprendizaje activo. | no declara | Plataforma de etiquetado propia; solo proveedores externos; auto-etiquetado con supervisión débil | Datasets representativos y auditables; reducir el sesgo por iluminación, color e interiores | Privacidad (caras y patentes), costo y tiempo del etiquetado, drift, lock-in | FR#2L, FR#2M; κ ≥ 0,8; ningún subgrupo con más de 2× la tasa de falsos positivos | `adrs/ADR-0015 - Training Data Strategy and Bias Mitigation for Vision Models.md:5-9,25-61,79-89,95-100` |
| ADR-0016 | Flujo human-in-the-loop estándar: bandas de confianza, colas de revisión con SLA, auditoría y feedback hacia el reentrenamiento. | no declara | Decisiones totalmente automáticas; inspección solo manual; revisión solo después del cobro | Evitar cobros injustos; decisiones a tiempo; aprender de las correcciones | Backlog y SLA en picos, sesgo del revisor, costo de la revisión humana, privacidad, drift de umbrales | FR#2L, FR#2M; SLA de limpieza P95 ≤ 2 h, de daños P95 ≤ 1 h | `adrs/ADR-0016 - Human-in-the-Loop Workflow Design for AI Decisions.md:5,20-56,71-81,87-92` |
| ADR-0017 | Retención de fotos por niveles: originales 180 días (hasta 2 años con retención legal), derivados 90 días, datasets anonimizados mientras el modelo esté activo; ciclo de vida automático. | no declara | Guardar todo indefinidamente (rechazada); borrar al verificar (rechazada); un solo bucket centralizado (rechazada) | Cumplir el GDPR (minimización, límite de almacenamiento); disputas; entrenamiento; costo | Pérdida de evidencia en disputas tardías; la anonimización puede quitar señal a la IA; complejidad de las solicitudes DSAR | GDPR art. 5, 6 y 17 | `adrs/ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md:11-15,23-28,36-44,55-58,83-88,93-97,107` |
| ADR-0018 | Precio dinámico híbrido: ML calcula la elasticidad y el precio base, reglas imponen los límites duros, GenAI explica el precio al usuario. | no declara | Solo reglas; solo ML; solo GenAI | ML para la precisión, reglas para las restricciones de negocio, GenAI para la explicabilidad | Drift, latencia, costo (GenAI restringido a factores en tiempo real), datos de competidores | FR#2F, FR#2C, NFR_7 | `adrs/ADR-0018 - Hybrid AI for Dynamic Pricing calculation.md:16-21,25-30,47-52,58-61` |
| ADR-0019 | Optimización de mantenimiento y abastecimiento híbrida: ML predice desbalances y demanda de carga, GenAI genera rutas e instrucciones, reglas imponen capacidades y turnos; ciclo nocturno. | no declara | Solo reglas; solo ML; planificación manual | Las reglas escalan mal; ML solo "produces non-explainable and sometimes impractical task plans for human operators" | Drift, tareas por encima de la capacidad del equipo, costo de recalcular | FR#2I, FR#2J, FR#2G, FR#2K | `adrs/ADR-0019 - Hybrid AI for Maintenance Optimization: Supply Efficiency.md:8-10,23-34,49-54,60-64` |
| ADR-0020 | Detección de daños por etapas: AutoML Vision Object Detection primero, CNN propia (EfficientDet-D2/YOLOv8) si no se cumplen los KPI; formato JSON común. | no declara | Solo AutoML (rechazada); CNN propia desde el día uno (rechazada); ensamble híbrido (rechazada); APIs de terceros como Tractable o Monk AI (rechazada); en el dispositivo (rechazada por ahora) | Entregar rápido; subir de complejidad solo si las métricas lo justifican; explicabilidad para disputas | AutoML puede no llegar a 85/80; falsos positivos por sombras; latencia; lock-in (mitiga con ONNX) | FR#2M; NFR_9 (precisión ≥ 85 %, ≤ 5 s, explicabilidad, HITL 24 h) | `adrs/ADR-0020 - Damage Detection Model Architecture.md:5,17-21,31-66,69-84,123-146,152-159` |
| ADR-0021 | Modelo ML simple (regresión o red poco profunda), sin GenAI, para el consejo de carga. | no declara | Umbrales por reglas; deep learning complejo; capa de explicación GenAI | Inferencia rápida y bajo costo; más contexto que un umbral fijo; los mensajes caben en plantillas | Calidad de los datos de sensores, telemetría cada 30 min, cobertura de estaciones, confianza del usuario | FR#2D, FR#2B | `adrs/ADR-0021 - Simple ML model for charging advice.md:6-12,16-28,32-42,46-53,57-61` |
| ADR-0022 | Pronóstico de demanda por etapas: Prophet por tipo de vehículo primero (ARIMA de respaldo), ML (LightGBM/XGBoost, LSTM, TFT) si el MAPE se estanca. | no declara | Prophet (elegida); ARIMA/SARIMA (solo de respaldo); gradient boosting (fase 2); LSTM/GRU; TFT; APIs de terceros (rechazada); R/SAS on-premise (rechazada) | Valor rápido, interpretabilidad; patrones distintos por tipo de vehículo | Prophet limitado en patrones no lineales; arranque en frío; desbalance de datos entre scooters y autos; costo de reentrenar | FR#2G, FR#2H, NFR_9, NFR_3 | `adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md:5,19-24,37-78,113-120,224-256,262-272` |

Se excluye `adrs/ADR-0000 - Template.md` (plantilla con secciones Context, Decision, Key Differentiators, Alternatives Considered, Risks & Trade-offs y Conclusion; `ADR-0000:1-19`). No hay ADR sobre cómo usar ADR. [DATO] Tres decisiones quedan como "ADR-TBD" en la matriz de contenedores (Python para servicios de IA, Go para servicios de alto rendimiento, PostgreSQL por ACID) (`hld/core-func/car-van-rental/2_Container_Diagram.md:81-84`), y la política de retención aparece como "ADR (TBD)" en ADR-0014 y ADR-0015, aunque ya existe ADR-0017 (`ADR-0014:85`, `ADR-0015:28,54`).

## 4. Hallazgos para el curso

#### H01 · Una sola fuente de verdad para el estado del vehículo
- Idea: cuando muchos módulos necesitan el mismo estado que cambia en tiempo real, concentrarlo en un servicio evita que cada uno calcule su propia versión, a cambio de crear un punto crítico.
- Lo que hizo el equipo: [DATO] Fleet Service recibe la telemetría del gateway MQTT vía Pub/Sub, persiste el último estado (ubicación, carga, disponibilidad), expone APIs, publica eventos y evalúa reglas configurables, como el umbral de carga o el geofencing (`ADR-0007:15-22`). [DATO] Combina el rol de registro de dispositivos con el de motor de reglas (`ADR-0007:22,38`).
- Razón declarada: [DATO] "To avoid state fragmentation across services (ride management, maintenance, analytics)" (`ADR-0007:7`); menos latencia, topología más simple y decisiones tomadas siempre sobre el último estado (`ADR-0007:40`).
- Costo o trade-off admitido: [DATO] "Fleet Service becomes critical for most platform functions", posible cuello de botella y más complejidad interna. Mitiga con alta disponibilidad, partición por región y reglas modulares (`ADR-0007:65-67`). La conclusión lo llama "operational concentration risk" (`ADR-0007:77`).
- Alternativas que nombra: [DATO] estado distribuido en cada módulo (riesgo de inconsistencia y reconciliación compleja); Pub/Sub como único mecanismo, con todos leyendo la telemetría (sin punto central de decisión); un registro IoT aparte (más piezas, lógica duplicada) (`ADR-0007:47-57`).
- Estado: no declara.
- Fuente: `adrs/ADR-0007 - Fleet Service as the Single Source of Truth for Vehicle State.md:5-77`; `hld/core-func/README.md:20`; `video/video-scenario-business-management-5min.md:26`.
- Completitud: *completo*.
- Contexto para contarlo: MobilityCorp y su flota conectada; qué es la telemetría; que varios módulos (viaje, mantenimiento, analítica) leen el estado.
- Depende de imagen: no (el diagrama `hld/core-func/Core Containers.drawio.png` ayudaría, pero no hace falta).
- Verificado: [ ]

#### H02 · IA híbrida: reglas para lo transaccional, GenAI solo donde aporta
- Idea: en un asistente conversacional, lo que mueve dinero o reservas va por código determinista y la IA generativa se reserva para lo abierto; así se controlan el costo y los errores.
- Lo que hizo el equipo: [DATO] La entrada del usuario pasa por una capa NLU (GenAI) que detecta la intención. Un clasificador ML puntúa la confianza y decide entre seguir con GenAI, llamar a una función predefinida (por ejemplo, la API de reservas) o pasar a soporte. La lógica de reglas resuelve las funciones núcleo, como reservar o consultar un precio (`ADR-0012:28-33`). [DATO] En el FR: "Risk of overspending by using GenAI. We will only use for non-predefined questions" (`requirements/2_FRs.md:9`).
- Razón declarada: [DATO] While pure GenAI can handle natural dialogue, it lacks deterministic control for operations (e.g., booking, payments)… all core functionality questions/requests can be predefined and programmed via if-else chat bot coding (`ADR-0012:14`); "delegating structured tasks to deterministic functions" para controlar el costo (`ADR-0012:51`).
- Costo o trade-off admitido: [DATO] latencia por la orquestación en varias etapas, tono inconsistente entre respuestas híbridas, alucinación (mitiga con plantillas deterministas para las intenciones transaccionales) (`ADR-0012:69-73`).
- Alternativas que nombra: [DATO] chatbot solo GenAI (costo alto, sin control determinista); bot solo reglas (mala experiencia); router ML sin GenAI (no maneja diálogo abierto) (`ADR-0012:54-64`).
- Estado: no declara.
- Fuente: `adrs/ADR-0012 - Hybrid AI for User-personalized in-app companionship.md:5-76`; `requirements/2_FRs.md:9`.
- Completitud: *completo*.
- Contexto para contarlo: qué es GenAI frente a un modelo ML clásico; el chatbot de la app de MobilityCorp; qué significa determinista.
- Depende de imagen: no.
- Verificado: [ ]

#### H03 · Cada requisito declara qué tipo de técnica lo resuelve
- Idea: antes de diseñar, el análisis de requisitos asigna a cada escenario de IA la técnica que necesita (GenAI, ML, código o híbrido), con su riesgo; no todo lo que dice "IA" es un LLM.
- Lo que hizo el equipo: [DATO] La tabla de FR tiene una columna "Tech Choice" por escenario. Ejemplos: 2A "Hybrid (GenAI, ML, Code)", 2C "Code" (consejo de precio basado en el motor de precios), 2D "Code, ML", 2G "ML", 2L "GenAI (Vision)" (`requirements/2_FRs.md:7-21`). [DATO] El ADR-0021 aplica ese criterio: el consejo de carga se resuelve con "simple ML", sin GenAI (`ADR-0021:16,32-33`).
- Razón declarada: [DATO] en cada fila, columna "Comments"; por ejemplo, para 2D "ML only for charging locations & their availability, and traffic conditions" (`2_FRs.md:12`).
- Costo o trade-off admitido: [DATO] en los comentarios: riesgo de gastar de más con GenAI (2A), riesgo de falsos positivos de la IA (2L), ajuste de umbrales frente a la fricción del cliente (2M) (`2_FRs.md:9,20-21`).
- Alternativas que nombra: no declara (en la tabla).
- Estado: no declara.
- Fuente: `requirements/2_FRs.md:4-24`; `requirements/Appendix B: AI scenarios explained.md:5-17`.
- Completitud: *ilustrativo* (es análisis de requisitos; las decisiones que lo respaldan están en ADR-0012, ADR-0018, ADR-0019 y ADR-0021).
- Contexto para contarlo: los escenarios de IA que pidió MobilityCorp; la diferencia entre GenAI, ML y código.
- Depende de imagen: no.
- Verificado: [ ]

#### H04 · El modelo más simple que alcanza: consejo de carga sin GenAI
- Idea: para un problema acotado de predicción alcanza con un modelo liviano; un modelo más complejo o una capa generativa suman costo sin cambiar el resultado.
- Lo que hizo el equipo: [DATO] Un modelo de regresión o una red poco profunda toma la batería, la posición GPS, la pendiente del mapa, la distancia al destino y la disponibilidad de estaciones. Predice la probabilidad de quedarse sin batería antes de llegar y solo avisa si la batería no alcanza, con mensajes de plantilla (`ADR-0021:18-25,32-33`). [DATO] Además impide empezar un viaje con batería demasiado baja y pide una doble confirmación (`ADR-0021:25`).
- Razón declarada: [DATO] "ensuring quick inference and minimal cloud cost while retaining sufficient prediction accuracy" (`ADR-0021:33`); los umbrales fijos ignoran la distancia a la estación, la pendiente y el consumo (`ADR-0021:12`).
- Costo o trade-off admitido: [DATO] lecturas incompletas de los sensores (respaldo: estimación por reglas); telemetría "every 30 min only" (mitiga con pronósticos de batería entre lecturas); dataset inicial chico (`ADR-0021:57-61`).
- Alternativas que nombra: [DATO] umbrales por reglas (no se adaptan); deep learning complejo (slightly better accuracy but unnecessary operational complexity… Too expensive); capa de explicación GenAI ("not required here; the advice can be expressed through predefined templates") (`ADR-0021:46-53`).
- Estado: no declara.
- Fuente: `adrs/ADR-0021 - Simple ML model for charging advice.md:1-65`.
- Completitud: *completo*.
- Contexto para contarlo: los scooters y bicis de MobilityCorp; la queja de quedarse sin batería (`requirements/1_1_Business challenges.md:13`); qué es un modelo de regresión.
- Depende de imagen: no.
- Verificado: [ ]

#### H05 · Empezar con lo gestionado y fijar de antemano cuándo escalar
- Idea: un modelo de IA puede arrancar con un servicio gestionado o un método estadístico simple y pasar a uno propio solo cuando una métrica, decidida por adelantado, muestra que no alcanza.
- Lo que hizo el equipo: [DATO] En daños, fase 1 con AutoML Vision Object Detection; se escala a una CNN propia si "mAP < 0.75 after 3 months in production", si los falsos positivos superan el 10 % de forma sostenida o si la latencia pasa de 5 s en p95 (`ADR-0020:33-54`). [DATO] En limpieza, AutoML primero; modelo propio si los falsos positivos superan el 5 % (`ADR-0014:20-28`). [DATO] En demanda, Prophet primero; escalada si el MAPE a 24 h supera el 30 % durante 4 semanas consecutivas (`ADR-0022:37-57`). [DATO] Todos los modelos de daños devuelven el mismo formato JSON, [DEDUCCIÓN, a partir de `ADR-0020:69`: de modo que el reemplazo no cambia a los consumidores] (`ADR-0020:68-84`).
- Razón declarada: [DATO] "Start with AutoML for rapid delivery; upgrade to custom CNN only if business metrics justify the increased complexity" (`ADR-0020:106-107`); "Premature optimization; staged approach reduces risk" como motivo para rechazar la CNN desde el día uno (`ADR-0020:131`).
- Costo o trade-off admitido: [DATO] AutoML puede quedar en "~75% mAP" y ofrece poco control (`ADR-0020:125`); Prophet está "Limited for complex non-linear patterns" (`ADR-0022:226`).
- Alternativas que nombra: [DATO] solo AutoML sin escalada (rechazada: "Lacks upgrade path"), CNN desde el día uno, ensamble, APIs de terceros, inferencia en el dispositivo (`ADR-0020:123-146`); siete alternativas en el pronóstico (`ADR-0022:224-256`).
- Estado: no declara.
- Fuente: `adrs/ADR-0020 - Damage Detection Model Architecture.md:29-66`; `adrs/ADR-0014 - ML Model Selection for Cleanliness Assessment.md:18-40`; `adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md:33-78`; `video/video-scenario-business-management-5min.md:20,49,76`.
- Completitud: *completo*.
- Contexto para contarlo: la foto de devolución de autos y furgonetas; qué es un servicio gestionado frente a un modelo propio; una métrica de precisión (mAP o MAPE) dicha en una frase.
- Depende de imagen: no.
- Verificado: [ ]

#### H06 · Revisión humana según la confianza del modelo, con la duda a favor del cliente
- Idea: cuando una decisión de IA cobra dinero, se la divide por bandas de confianza: alta se automatiza, media va a una persona y baja se resuelve a favor del cliente.
- Lo que hizo el equipo: [DATO] Con confianza alta, cobro o aceptación automáticos con evidencia registrada. Con confianza media, cola de revisión con SLA, donde el revisor ve la predicción y confirma o corrige con un código de motivo. Con confianza baja, "Default to customer-favorable outcome (no fee / defer decision)" (`ADR-0016:22-25`). [DATO] Las correcciones de los revisores vuelven como ejemplos etiquetados para reentrenar (`ADR-0016:43-45`).
- Razón declarada: [DATO] "prevent unfair customer charges, ensure timely decisions, capture reviewer feedback for model improvement" (`ADR-0016:5`).
- Costo o trade-off admitido: [DATO] backlog en picos, sesgo entre revisores, costo del tiempo humano ("Focus on medium-confidence only") (`ADR-0016:87-89`).
- Alternativas que nombra: [DATO] decisiones totalmente automáticas (riesgo de cobros injustos y pérdida de clientes); inspección solo manual (lenta y cara); revisión solo después del cobro ("harms trust; refunds after-the-fact increase support burden") (`ADR-0016:71-81`).
- Estado: no declara.
- Fuente: `adrs/ADR-0016 - Human-in-the-Loop Workflow Design for AI Decisions.md:3-96`; `adrs/ADR-0014…:32-35`; `requirements/2_FRs.md:20`.
- Completitud: *completo*.
- Contexto para contarlo: la tarifa de limpieza (Minor €50, Major €100, Severe €150, `Appendix A:65`); qué es un puntaje de confianza.
- Depende de imagen: no.
- Verificado: [ ]

#### H07 · Retención de fotos por niveles: GDPR y costo en una misma política
- Idea: los datos personales se separan por propósito (operar, revisar, entrenar) y cada nivel tiene su plazo y su ciclo automático; así se cumple el límite de almacenamiento y se baja el costo.
- Lo que hizo el equipo: [DATO] Tres niveles: originales (180 días por defecto, hasta 2 años si hay una disputa activa), derivados como miniaturas y copias anotadas (90 días) y datasets de entrenamiento anonimizados (mientras el modelo esté activo, con revisión anual) (`ADR-0017:23-26,36-44`). [DATO] Ciclo automático en almacenamiento: Nearline a los 30 días, Coldline a los 90, borrado a los 180 salvo retención legal (`ADR-0017:55-58`). [DATO] Desenfoque automático de caras y patentes al ingerir (`ADR-0017:51`).
- Razón declarada: [DATO] equilibrar el cumplimiento legal, las disputas, el entrenamiento y el costo (`ADR-0017:11-15`).
- Costo o trade-off admitido: [DATO] "Deletion at 180 days may hinder late disputes"; "Anonymization may remove useful signals" para la IA; complejidad de borrar en todas las copias (`ADR-0017:93-96`).
- Alternativas que nombra: [DATO] guardar todo indefinidamente (rechazada por el límite de almacenamiento del GDPR), borrar al verificar (rechazada: no alcanza para disputas), un solo bucket (rechazada: radio de daño mayor) (`ADR-0017:83-88`).
- Estado: no declara.
- Fuente: `adrs/ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md:1-110`.
- Completitud: *completo*. [HUECO] Otros documentos dicen 90 días para las fotos (`requirements/3_NFRs.md:19`, `Appendix A:79`, `4_Sequence_Diagram.md:154,249`); ver la sección 7.
- Contexto para contarlo: las fotos de devolución; GDPR en una frase (límite de almacenamiento, derecho al borrado).
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · Separar la conectividad de los vehículos del procesamiento
- Idea: un gateway liviano para dispositivos y un bus de eventos gestionado desacoplan la llegada de los mensajes de quien los procesa, y dan buffering y replay sin lógica propia.
- Lo que hizo el equipo: [DATO] Gateway MQTT en clúster sobre Kubernetes, detrás de un balanceador, con Pub/Sub como columna de streaming (`ADR-0002:7`). Telemetría: dispositivo → MQTT → gateway → backbone → procesamiento → almacenamiento; comandos por tópicos con ACK para las operaciones críticas (`hld/core-func/hld-vehicle-connectivity.md:39-41`).
- Razón declarada: [DATO] MQTT es liviano para dispositivos limitados; Pub/Sub escala y es durable; "Clear separation between the connectivity layer and data processing"; buffering, failover y replay "Enables 99.9% availability targets" (`ADR-0002:10-15`).
- Costo o trade-off admitido: [DATO] operar el clúster MQTT exige madurez operativa; hay que alinear el QoS de MQTT con los acuses de Pub/Sub y hacer el procesamiento idempotente (`ADR-0002:24-26`); lock-in, con migración documentada a Kafka (`ADR-0002:28`).
- Alternativas que nombra: [DATO] HTTPS directo ("less efficient for low-power devices, no QoS"); broker MQTT independiente (más complejidad operativa y menos integración con streaming) (`ADR-0002:18-19`).
- Estado: no declara.
- Fuente: `adrs/ADR-0002 - Vehicle telemetry & integration stack.md:1-35`; `hld/core-func/hld-vehicle-connectivity.md:1-77`; `requirements/5_Risks and mitigation.md:13`.
- Completitud: *completo*.
- Contexto para contarlo: qué es MQTT y qué es un bus de eventos; la flota conectada.
- Depende de imagen: no (la imagen `hld/core-func/Vehicle Connectivity.png` ilustra el flujo).
- Verificado: [ ]

#### H09 · Elegir la nube por la capacidad que el problema más usa
- Idea: la nube se eligió por lo que el dominio usa todo el tiempo (mapas, ruteo, geofencing) y se registró el lock-in como costo.
- Lo que hizo el equipo: [DATO] GCP como proveedor central (`ADR-0001:6`), por la integración nativa con las APIs de Google Maps: "No additional integration layer needed, unlike AWS or Azure" (`ADR-0001:10-11`). [DATO] La misma razón vuelve en ADR-0003 (Vertex AI por su integración con Maps) y en ADR-0004 (Gemini con grounding en Maps) (`ADR-0003:14`, `ADR-0004:22`).
- Razón declarada: [DATO] mapas, datos en tiempo real, red global e IA integrada (`ADR-0001:10-23`); competidores directos usan GCP (`ADR-0001:41-45`).
- Costo o trade-off admitido: [DATO] lock-in, dependencia de funciones de Gemini y Vertex, costo impredecible, menos familiaridad para quienes se contraten (`ADR-0001:33-38`). En el registro general de riesgos, abstracción y estándares abiertos (MQTT, REST, gRPC) (`requirements/5_Risks and mitigation.md:8`).
- Alternativas que nombra: [DATO] AWS ("requires third-party mapping integration; heavier ML setup") y Azure (mapas y analítica de flota con más trabajo propio) (`ADR-0001:26-27`).
- Estado: no declara.
- Fuente: `adrs/ADR-0001 - GCP as main cloud provider.md:1-48`.
- Completitud: *completo*.
- Contexto para contarlo: que MobilityCorp necesita rutas, geofencing y rastreo en tiempo real.
- Depende de imagen: no.
- Verificado: [ ]

#### H10 · GenAI como capa de razonamiento, con la API determinista como respaldo
- Idea: si un componente generativo orquesta consultas, la fuente autoritativa sigue siendo el servicio determinista, que además queda de respaldo para lo crítico en tiempo.
- Lo que hizo el equipo: [DATO] "Gemini will be used as a reasoning and orchestration layer, while Maps Platform provides authoritative geospatial data and routing" (`ADR-0004:18`). [DATO] Para ruteo crítico en tiempo se llama a la API directa y Gemini solo agrega contexto (`ADR-0004:50`). [DATO] "Traditional Maps APIs will be retained as fallback" (`ADR-0004:57`).
- Razón declarada: [DATO] las APIs de Maps son rígidas y obligan a orquestar mucho para dar respuestas conversacionales; Gemini encadena varias llamadas y resume (`ADR-0004:9,24-25`).
- Costo o trade-off admitido: [DATO] lock-in, caídas del servicio, costo por volumen de consultas, latencia mayor que la API directa (`ADR-0004:47-50`).
- Alternativas que nombra: [DATO] solo Maps tradicional, búsqueda geoespacial externa, NER y búsqueda propios, con pros y contras en tabla (`ADR-0004:37-42`).
- Estado: no declara.
- Fuente: `adrs/ADR-0004 - Use of Gemini for Maps & Search Scenarios.md:1-62`; `hld/scenarios/route-advice/README.md:18`.
- Completitud: *completo*.
- Contexto para contarlo: Trip Copilot (el asistente de rutas); qué es "grounding" en una frase.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Precio dinámico: cada técnica en la parte que hace bien
- Idea: un mismo cálculo puede repartirse entre ML (optimiza el número), reglas (imponen lo que no se negocia) y GenAI (explica el resultado), y la parte cara se limita a lo que la necesita.
- Lo que hizo el equipo: [DATO] ML predice la elasticidad y el precio base; reglas aplican el margen mínimo, las regulaciones locales y los descuentos de suscripción; GenAI explica el precio al usuario ("price is higher due to city event and demand increase") (`ADR-0018:25-28`). [DATO] GenAI queda restringido a los factores en tiempo real (demanda, clima, eventos, precios de competidores) por costo (`ADR-0018:60`).
- Razón declarada: [DATO] "ML ensures optimized price precision while rules ensure business constraints. GenAI layer adds user-facing explainability to promote trust" (`ADR-0018:35`); el mismo resultado alimenta el consejo de precio del chatbot (FR#2C) (`ADR-0018:14,19`).
- Costo o trade-off admitido: [DATO] drift estacional, latencia (caché y evaluación escalonada: primero ML, GenAI opcional), costo de GenAI (`ADR-0018:58-60`).
- Alternativas que nombra: [DATO] solo reglas (no se adapta), solo ML ("may fail under corner cases (e.g., local laws, minimum fare) without deterministic rules"), solo GenAI ("lacks reliability for numerical precision") (`ADR-0018:47-52`).
- Estado: no declara.
- Fuente: `adrs/ADR-0018 - Hybrid AI for Dynamic Pricing calculation.md:1-64`; `requirements/Appendix A: Core functionality.md:122-126`.
- Completitud: *completo*.
- Contexto para contarlo: los tres modelos de precio de MobilityCorp (`4_Assumptions…:7`); qué es la elasticidad de precio.
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Planes para operarios: reglas que acotan lo que el modelo propone
- Idea: cuando la salida de un modelo la ejecuta un equipo humano, las reglas duras (capacidad, turnos, normativa) acotan el plan, porque una optimización pura puede producir tareas que no se pueden cumplir.
- Lo que hizo el equipo: [DATO] ML predice desbalances de oferta y demanda de carga; GenAI genera rutas con varias paradas e instrucciones por tarea, con clima y tráfico; reglas fijan la capacidad del vehículo y del estacionamiento, los límites de turno y la normativa; el ciclo corre de noche (`ADR-0019:23-34`).
- Razón declarada: [DATO] planificar a mano o con reglas "is inefficient when managing hundreds of vehicles across multiple districts" (`ADR-0019:18`).
- Costo o trade-off admitido: [DATO] "Generated tasks may exceed Ops team capacity" (mitiga con topes por turno); recalcular para flotas grandes es costoso (`ADR-0019:61-62,64`).
- Alternativas que nombra: [DATO] solo reglas; solo ML ("produces non-explainable and sometimes impractical task plans for human operators"); planificación manual (`ADR-0019:49-54`).
- Estado: no declara.
- Fuente: `adrs/ADR-0019 - Hybrid AI for Maintenance Optimization: Supply Efficiency.md:1-67`.
- Completitud: *parcial*: la línea 27 está cortada ("Estimating even") y no dice qué estima ese modelo.
- Contexto para contarlo: el equipo de operaciones que reubica y carga vehículos de noche (FR#2I).
- Depende de imagen: no.
- Verificado: [ ]

#### H13 · Decidir con una prueba y criterios de salida
- Idea: cuando una tecnología está en preview o no hay certeza, el ADR la adopta condicionada a una prueba de concepto con metas y deja escrita la salida si no las cumple.
- Lo que hizo el equipo: [DATO] Agent Builder se adopta "starting with a proof of concept (PoC) to validate its performance, cost, and flexibility" (`ADR-0010:17`). La PoC mide latencia, tokens y costo, y "If PoC results meet defined targets, Agent Builder will be adopted" (`ADR-0010:68-74`). [DATO] La evaluación con Vertex arranca con un piloto que compara contra un flujo mínimo con MLflow, que queda como opción secundaria (`ADR-0011:87-93`). [DATO] El MoCoP gestionado se reevalúa after 12 months (`ADR-0013:55`).
- Razón declarada: [DATO] "Some Agent Builder features are in preview and may evolve" → "Use PoC to validate critical features before committing" (`ADR-0010:57`).
- Costo o trade-off admitido: [DATO] lock-in, costo por tokens, latencia de la capa de orquestación (`ADR-0010:56-59`).
- Alternativas que nombra: [DATO] orquestación propia en Cloud Run o GKE, Azure OpenAI, LangChain/LlamaIndex (`ADR-0010:41-48`).
- Estado: no declara (adopción condicionada).
- Fuente: `adrs/ADR-0010 - Evaluation and Adoption of Vertex AI Agent Builder for AI Service and Orchestration.md:15-74`; `adrs/ADR-0011 - Model Evaluation Flow using Vertex AI.md:83-93`; `adrs/ADR-0013 - Adoption of Managed SaaS Model MoCoP.md:53-55`.
- Completitud: *parcial*: [HUECO] los "defined targets" de la PoC no tienen cifras (`ADR-0010:74`).
- Contexto para contarlo: qué es un orquestador de agentes; qué es una PoC.
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · La evaluación de modelos como compuerta de despliegue
- Idea: un modelo nuevo entra a producción solo si supera al actual en una métrica fijada antes y pasa un período en sombra; la evaluación se repite en producción para detectar el drift.
- Lo que hizo el equipo: [DATO] Flujo: datasets de evaluación, métricas, evaluaciones puntuales y por pares, integración en CI/CD y uso de los resultados para promover, reentrenar y monitorear (`ADR-0011:19-25,41-45`). [DATO] En demanda: el modelo nuevo debe reducir el MAPE al menos un 5 % frente al campeón, pasar un backtesting de 4 semanas y quedar 1 semana en sombra (`ADR-0022:113-116`); alerta si el MAPE empeora más de un 10 % en 7 días (`ADR-0022:119`).
- Razón declarada: [DATO] "Evaluation is not a one-time step but a continuous part of the MLOps lifecycle" (`ADR-0011:41`).
- Costo o trade-off admitido: [DATO] "Additional evaluation steps may extend release cycle"; "Metrics alone may not reflect business quality" (combina con revisión humana) (`ADR-0011:77,79`).
- Alternativas que nombra: [DATO] framework propio, MLflow, Azure ML, evaluación manual y ad hoc (`ADR-0011:53-67`).
- Estado: no declara (piloto).
- Fuente: `adrs/ADR-0011 - Model Evaluation Flow using Vertex AI.md:1-93`; `adrs/ADR-0022…:104-120`; `hld/mlops/README.md:57-59,123-131`.
- Completitud: *completo*.
- Contexto para contarlo: qué es el drift de un modelo; qué es un despliegue en sombra (shadow) y la idea de campeón frente a retador.
- Depende de imagen: no.
- Verificado: [ ]

#### H15 · Datos de entrenamiento con sesgo medido
- Idea: la equidad de un modelo de visión se define como una métrica con umbral (ningún subgrupo con más del doble de falsos positivos) y se exige antes de promover el modelo.
- Lo que hizo el equipo: [DATO] Golden set fijo, doble ciego en el 10–20 % de las muestras con κ ≥ 0,8, muestreo estratificado por luz, clima, color e interior, pruebas periódicas de sesgo, aprendizaje activo con falsos positivos de producción (`ADR-0015:33-51`). [DATO] Criterio: "No subpopulation has >2× false positive rate vs overall" (`ADR-0015:60`).
- Razón declarada: [DATO] riesgo de sesgo "(under-representation of specific vehicle colors, interiors, lighting)" (`ADR-0015:9`).
- Costo o trade-off admitido: [DATO] "Labeling at scale can be expensive and slow" (`ADR-0015:98`); fotos con caras y patentes (`ADR-0015:95`).
- Alternativas que nombra: [DATO] plataforma de etiquetado propia, solo proveedores externos, auto-etiquetado con supervisión débil (`ADR-0015:79-89`).
- Estado: no declara.
- Fuente: `adrs/ADR-0015 - Training Data Strategy and Bias Mitigation for Vision Models.md:1-104`.
- Completitud: *completo*.
- Contexto para contarlo: las fotos de limpieza y daños; qué es un falso positivo; qué mide el κ de Cohen (acuerdo entre etiquetadores).
- Depende de imagen: no.
- Verificado: [ ]

#### H16 · Un modelo por tipo de vehículo cuando los patrones difieren
- Idea: si dos poblaciones se comportan distinto, modelos separados capturan mejor cada patrón, a cambio de más modelos que mantener.
- Lo que hizo el equipo: [DATO] Instancias separadas de Prophet por tipo de vehículo (`ADR-0022:44-47`). Los scooters usan ventanas de 30 días y reentrenamiento 2 veces por semana; los autos, 90 días y reentrenamiento semanal (`ADR-0022:53`). [DATO] Para la fase 2, "Option A (Recommended)": modelos separados; "Option B": un modelo con el tipo como variable; se empieza con A (`ADR-0022:64-71`).
- Razón declarada: [DATO] los scooters son muy sensibles al clima, con viajes cortos y volatilidad horaria; los autos tienen reservas anticipadas y patrones diarios o semanales (`ADR-0022:7-9`). La lluvia baja la demanda de scooters entre 40 y 60 % y sube la de autos entre 10 y 15 % (`ADR-0022:87-88`).
- Costo o trade-off admitido: [DATO] Option A: "More models to maintain; no cross-vehicle learning" (`ADR-0022:67`); desbalance de volumen de datos (`ADR-0022:265`).
- Alternativas que nombra: [DATO] Option B (`ADR-0022:68-70`).
- Estado: no declara.
- Fuente: `adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md:7-9,44-71,265`.
- Completitud: *completo*.
- Contexto para contarlo: la flota mixta de MobilityCorp; qué es un pronóstico de demanda.
- Depende de imagen: no.
- Verificado: [ ]

#### H17 · Un contexto delimitado propio para autos y furgonetas
- Idea: una parte del negocio con reglas y ritmos distintos se modela como un contexto delimitado propio; la IA atada a ese flujo vive adentro y la IA transversal se extrae como servicio compartido.
- Lo que hizo el equipo: [DATO] El alquiler de autos y furgonetas se modela aparte por las reservas con hasta 7 días de anticipación, la duración larga, la carga, los montos de €15–50 por hora, la devolución con 4 fotos, las cuentas corporativas y las reservas recurrentes (`hld/core-func/car-van-rental/README.md:9-19`). [DATO] AI features tightly coupled to specific business workflows (e.g., cleanliness verification at return, damage detection for fines) are documented within their bounded context… Cross-cutting AI scenarios… are in /hld/scenarios/ (`hld/README.md:7`).
- Razón declarada: [DATO] las características distintas listadas (`car-van-rental/README.md:9-17`); "context-specific AI logic stays with domain models, while shared AI services are extracted for reusability" (`hld/README.md:7`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `hld/README.md:7`; `hld/core-func/car-van-rental/README.md:1-44`; `hld/core-func/README.md:12`.
- Completitud: *ilustrativo* (no hay ADR; falta el costo).
- Contexto para contarlo: qué es un contexto delimitado (DDD); las diferencias entre alquilar un scooter y un auto.
- Depende de imagen: no.
- Verificado: [ ]

#### H18 · Consistencia fuerte dentro del agregado, eventual entre agregados
- Idea: las reglas que deben cumplirse juntas se agrupan en un agregado transaccional; entre agregados se comunica por eventos y se acepta la consistencia eventual.
- Lo que hizo el equipo: [DATO] Reserva, alquiler, pago y estado del vehículo son ACID dentro de cada agregado (`3_Domain_Model.md:198-204`); entre agregados, eventos de dominio (por ejemplo, `ReservationCreated` actualiza la disponibilidad) (`3_Domain_Model.md:206-212`). [DATO] Separan limpieza y daños en dos agregados porque usan modelos distintos (clasificación frente a detección) y permiten procesarlos en paralelo (`3_Domain_Model.md:289-293`); la telemetría es un value object (`3_Domain_Model.md:301-305`).
- Razón declarada: [DATO] Prevents distributed transactions across bounded contexts… Enables independent scaling… Maintains system resilience during partial failures (`3_Domain_Model.md:214-218`).
- Costo o trade-off admitido: [DATO] solo en la secuencia: "eventual consistency acceptable for non-critical path" (`4_Sequence_Diagram.md:65`).
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `hld/core-func/car-van-rental/3_Domain_Model.md:196-318`; `hld/core-func/car-van-rental/4_Sequence_Diagram.md:63-66`.
- Completitud: *parcial*: no hay alternativas ni ADR.
- Contexto para contarlo: qué es un agregado; qué significan consistencia eventual y transacción ACID.
- Depende de imagen: no (el diagrama de agregados es mermaid, en texto).
- Verificado: [ ]

#### H19 · Fallar rápido con el pago antes de reservar
- Idea: el orden de los pasos de un flujo es una decisión de arquitectura: primero el paso externo que más falla y después lo que se escribe.
- Lo que hizo el equipo: [DATO] En la reserva, la preautorización de pago se pide antes de insertar la reserva: "Pre-authorization created **before** reservation insert (fail-fast on payment issues)" (`4_Sequence_Diagram.md:64`). [DATO] En la devolución, el cobro se captura recién cuando termina el análisis de IA, que corre en paralelo para limpieza y daños (`4_Sequence_Diagram.md:247,250`).
- Razón declarada: [DATO] "fail-fast on payment issues" (`4_Sequence_Diagram.md:64`); Parallel AI analysis… for performance (`4_Sequence_Diagram.md:247`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `hld/core-func/car-van-rental/4_Sequence_Diagram.md:7-66,150-251`.
- Completitud: *parcial*: faltan el costo y las alternativas.
- Contexto para contarlo: qué es una preautorización de pago; el flujo de reserva de un auto.
- Depende de imagen: no.
- Verificado: [ ]

#### H20 · Encender una función de IA solo para una parte de los usuarios
- Idea: una función con costo variable puede activarse para un subconjunto de usuarios o de períodos, y el modelo puede cambiarse por uno más chico si el costo sube.
- Lo que hizo el equipo: [DATO] "To reduce costs, this feature could be activated for a subset of users enabled during certain periods of time" (`hld/scenarios/feedback-analysis/README.md:8`); "If Gemini costs rise too much, we could switch to a smaller customer model" (`hld/scenarios/feedback-analysis/README.md:25`).
- Razón declarada: [DATO] reducir costos (misma cita).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: [DATO] cambiar a un modelo más chico (`:25`).
- Estado: no declara.
- Fuente: `hld/scenarios/feedback-analysis/README.md:1-29`.
- Completitud: *ilustrativo*.
- Contexto para contarlo: el análisis de feedback con chatbot.
- Depende de imagen: no.
- Verificado: [ ]

#### H21 · Del objetivo de negocio a la solución, con cifras de partida
- Idea: las decisiones se trazan desde los drivers de negocio, pasando por metas medibles, hasta capacidades y ADR, y cada meta tiene un valor actual y uno buscado.
- Lo que hizo el equipo: [DATO] Cadena "Business Drivers → Business Goals → Capabilities / Solutions" (`requirements/1_0_Business goals & drivers.md:4,25-35`); OKR con valor actual y planeado, por ejemplo la precisión del pronóstico de demanda de 41 % a 82 % o el abandono por batería en scooters y bicis de 68 % a 6–8 % (`requirements/suggested OKRs/OKRs.md:14,16`); tabla de capacidades → FR → ADR (`README.md:107-141`).
- Razón declarada: [DATO] "Prioritizing those might help business to correctly plan/phase various parts of the project" (`OKRs.md:2`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `requirements/1_0_Business goals & drivers.md`; `requirements/suggested OKRs/OKRs.md`; `README.md:107-141`.
- Completitud: *ilustrativo*. [HUECO] El texto no dice de dónde salen los valores actuales (`OKRs.md:2` los llama "approximate").
- Contexto para contarlo: MobilityCorp y sus metas.
- Depende de imagen: no.
- Verificado: [ ]

#### H22 · Disponibilidad pedida capa por capa
- Idea: un objetivo de disponibilidad (99,9 %) se baja a medidas concretas en cada capa del camino de los datos.
- Lo que hizo el equipo: [DATO] Tabla por capa: gateway multizona N+1 con balanceador y buffering; backbone con replicación ≥ 3 y replay idempotente; procesamiento con checkpointing; dispositivos con reconexión y backoff; DR con RPO ≤ 5 min y RTO ≤ 15 min (`hld/core-func/hld-vehicle-connectivity.md:65-77`).
- Razón declarada: [DATO] "to avoid a single point of failure and ensure graceful degradation on outages, fast recovery, and controlled SLO breaches" (`hld-vehicle-connectivity.md:66`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: [DATO] servicios GCP con equivalentes neutrales (Kafka, EKS, AKS) (`hld-vehicle-connectivity.md:8,30`).
- Estado: no declara.
- Fuente: `hld/core-func/hld-vehicle-connectivity.md:1-77`.
- Completitud: *ilustrativo*.
- Contexto para contarlo: qué son el RPO y el RTO; el gateway MQTT (H08).
- Depende de imagen: no.
- Verificado: [ ]

#### H23 · Plano de control de modelos como gateway de IA comprado como servicio
- Idea: el enrutamiento entre modelos, las políticas, la redacción de datos y la auditoría se concentran en un gateway de IA, y se elige comprarlo como servicio para ganar velocidad y cumplimiento en la UE.
- Lo que hizo el equipo: [DATO] MoCoP gestionado como SaaS, que hace orquestación de prompts, enrutamiento de modelos, filtros de seguridad, observabilidad, rollback y manejo de datos alineado con el GDPR (`ADR-0013:14-20`). [DATO] Lo usan el chatbot y el precio dinámico para enrutar (`ADR-0018:30,43-44`); el costo de tokens aparece en el chatbot (`ADR-0012:51,69`).
- Razón declarada: [DATO] rapid enablement, minimal ops load, and EU data compliance (`ADR-0013:5`); "Integration within weeks" (`ADR-0013:24`).
- Costo o trade-off admitido: [DATO] lock-in con el proveedor SaaS, riesgo de enrutar fuera de la UE, menos control, un salto más de latencia (`ADR-0013:47-51`).
- Alternativas que nombra: [DATO] autoalojado, nativo de la nube (Vertex AI, Bedrock, Azure AI: "limited EU control and multi-model flexibility"), construcción propia (`ADR-0013:39-41`).
- Estado: no declara (revisión a 12 meses).
- Fuente: `adrs/ADR-0013 - Adoption of Managed SaaS Model MoCoP.md:1-55`.
- Completitud: *parcial*: [HUECO] no nombra al proveedor SaaS y no explica cómo convive con ADR-0003 y ADR-0010, que usan Vertex AI para la orquestación (ver sección 7).
- Contexto para contarlo: qué es un gateway de IA; por qué importa dónde se procesan los datos (GDPR).
- Depende de imagen: no.
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `adrs/ADR-0000 - Template.md`: plantilla vacía; no enseña una decisión.
- `hld/scenarios/placeholder.md`: archivo vacío.
- `video/README.md`: una línea que describe la carpeta.
- `video/two_customers_speaking.mp4`: archivo de texto de 2 bytes; no hay video.
- `.gitignore`: configuración del editor.
- `video/video-scenario-business-management-5min.md`: guion de la presentación con cifras en blanco ("__"); describe cómo presentar, no decisiones. Solo repite pasos ya presentes en los ADR (H05).
- `video/narrative.md`: guion de la presentación con cifras de resultados ("€240 000 uplift per month", "≥ 93 % precision") que no salen de ningún documento técnico y no coinciden con los OKR (ver sección 7). No aportan evidencia de arquitectura.
- `requirements/Appendix C: Future scope.md`: ideas fuera del alcance (marketing con IA, roadmap por fases); cifras de "industry benchmark" sin fuente (`Appendix C:70`).
- `hld/data-structure/data-sourcing.md`: lista preliminar de datos y fuentes ("Subject to extension", `:1`); no contiene decisiones.
- `hld/core-func/hld-data-and-analytics.md`: arquitectura de datos genérica (capas bronze, silver y gold; runbooks) sin decisión ni trade-off propio del caso. Su objetivo de "five nines" (`:6`) choca con el 99,9 % de otros documentos.
- Ejemplos de payloads, endpoints y montos en `4_Sequence_Diagram.md` (por ejemplo, `:27,43,192`): detalle de implementación ilustrativo; no cambia lo que se aprende de arquitectura, salvo lo anotado en H19.
- Detalle de multas, tarifas y niveles de fidelidad del Apéndice A (`:58-75`): reglas de negocio del enunciado, no decisiones de arquitectura. Solo sirven como contexto (por ejemplo, la tarifa de limpieza en H06).

## 6. Imágenes para fase 2

- `main.png`: imagen principal de la solución (sin texto alternativo); la cita `README.md:43`.
- `hld/core-func/Core Containers.drawio.png`: diagrama de contenedores del núcleo (Mobile App, API Gateway, Fleet, Ride, Price, Pub/Sub, MQTT, Vertex AI); la cita `hld/core-func/README.md:30`.
- `hld/core-func/Vehicle Connectivity.png`: flujo de comandos y datos de la conectividad de vehículos; la cita `hld/core-func/hld-vehicle-connectivity.md:24`.
- `hld/core-func/car-van-rental/diagrams/system_context.png`: contexto C4 de alquiler de autos y furgonetas (8 sistemas externos, colores por tipo); la cita `1_Context_Diagram.md:7`.
- `hld/core-func/car-van-rental/diagrams/car_van_container_graph.png`: contenedores enfocados en IA, con pasos numerados del 1 al 10 y anotaciones de NFR; la cita `2_Container_Diagram.md:3`.
- `hld/core-func/car-van-rental/diagrams/container_diagram.png`: diagrama de contenedores; ningún `.md` lo cita (el README de la carpeta remite a `diagrams/` en general, `car-van-rental/README.md:29`).
- `hld/scenarios/battery-replacement-and-fleet-allocation/Battery Replacement and Fleet Allocation.drawio.png`: contenedores del escenario de batería y asignación de flota; la cita su `README.md:19`.
- `hld/scenarios/demand-forecasting/Demand Forecasting.drawio.png`: contenedores del pronóstico de demanda; la cita su `README.md:21`.
- `hld/scenarios/dynamic-pricing/Pricing Module.drawio.png`: contenedores del módulo de precios; la cita su `README.md:18`.
- `hld/scenarios/feedback-analysis/Feedback Analysis.drawio.png`: contenedores del análisis de feedback; la cita su `README.md:27`.
- `hld/scenarios/route-advice/Scooter_Bike Route Recommendation.drawio.png`: contenedores de Trip Copilot; la cita su `README.md:22`.
- `hld/mlops/MLOps on GCP.png`: flujo de MLOps en GCP; la cita `hld/mlops/README.md:79`.
- `hld/data-structure/core-fleet.png`, `core-user-activity.png`, `ml-demand-forecast.png`: muestras de modelo de datos; `README.md:86` enlaza la carpeta como "Data Model Samples".
- `video/FiveNines - 2025 AI kata final presentation.pdf` (PDF, no imagen): presentación final; puede aclarar las cifras de `video/narrative.md`.
- Las 9 fuentes `.drawio` (por ejemplo, `hld/core-func/Vehicle Connectivity.drawio`) tienen el mismo contenido que los PNG en formato editable; no se leyeron en esta fase.

## 7. Preguntas abiertas

- Disponibilidad objetivo: 99,9 % (`1_0_Business goals…:21`, `hld-vehicle-connectivity.md:65`), 99,5 % para servicios críticos (`3_NFRs.md:8`) o "five nines" y 99,999 % en datos (`hld-data-and-analytics.md:6,227`). [HUECO] ¿Cuál rige?
- RTO: ≤ 4 h (`3_NFRs.md:8`) frente a ≤ 15 min (`hld-vehicle-connectivity.md:76`, `README.md:161`). [HUECO]
- Frecuencia de telemetría: cada 30 minutos (`4_Assumptions…:8`, `ADR-0021:58`) frente a cada 30 segundos (`Appendix A:36`, `3_Domain_Model.md:111`, `4_Sequence_Diagram.md:130`). [HUECO]
- Flota: 5.000 scooters y 200 autos "per city" (`4_Assumptions…:5`) frente a per country (`ADR-0022:265`). [HUECO]
- Retención de fotos: 180 días para los originales (`ADR-0017:38`, `ADR-0020:101`) frente a 90 días (`3_NFRs.md:19`, `Appendix A:79`, `2_Container_Diagram.md:54`, y `4_Sequence_Diagram.md:154,249`, que atribuye los 90 días a ADR-0017). [HUECO]
- Umbrales de confianza: limpieza, >90 % automático, 80–90 % revisión, <80 % sin cobro (`2_FRs.md:20`); daños, ≥85 % / 70–85 % / <70 % (`ADR-0020:40-43`); devolución, >80 % aprobación automática (`Appendix A:55`); SLA de revisión de limpieza de 30 min (`4_Sequence_Diagram.md:203`) frente a P95 ≤ 2 h (`ADR-0016:29`) frente a 24 h (`3_NFRs.md:38`). [HUECO]
- NFR_7 aparece dos veces, como Compliance y como Observability (`3_NFRs.md:19,30`). [HUECO] ¿A cuál remiten ADR-0018:30 y `2_Container_Diagram.md:54`?
- Los identificadores FR-CV-001/005/007/019/027 se citan (`1_Context_Diagram.md:85-87`, `ADR-0014:14`, `ADR-0015:28`, `ADR-0017:6`, `ADR-0022:123`) pero no están definidos en ningún archivo del repositorio. [HUECO]
- "NFR_3 (Performance): Forecast generation ≤60 seconds" (`ADR-0022:24`) y "70% KPI target" de utilización (`ADR-0022:5`) no figuran en `3_NFRs.md` ni en los OKR. [HUECO]
- ADR-0013 rechaza el MoCoP nativo de la nube (Vertex AI) por "limited EU control" (`ADR-0013:40`), mientras ADR-0010 adopta Vertex AI Agent Builder para la orquestación y ADR-0012 dice que el chatbot se despliega vía Vertex AI en la UE (`ADR-0012:42`). [DEDUCCIÓN, a partir de esas tres líneas] Hay dos capas de orquestación; el texto no dice cómo se reparten.
- ADR-0005 llama "Model Control Plane (MCP)" a lo que ADR-0012 y ADR-0013 llaman MoCoP, y "MCP" también aparece como Model Context Protocol (`2_FRs.md:10`, `route-advice/README.md:19`). ADR-0005 menciona CloudWatch, de AWS (`ADR-0005:69`). [HUECO] ¿Es el mismo componente?
- Fleet Service es la única fuente de verdad (ADR-0007), pero en SD-002 el Rental Lifecycle Service se suscribe a la telemetría y la guarda (`4_Sequence_Diagram.md:129-136`), y en SD-001 el Booking Service hace `UPDATE vehicle SET status='reserved'` directamente (`:48`). El modelo de dominio dice "Vehicle status updated via events, not direct FK" (`3_Domain_Model.md:234`). [HUECO]
- ADR-0018 cita ADR-0010 para la "consistent model evaluation" (`ADR-0018:30`); la evaluación está en ADR-0011. [HUECO] ¿Error de referencia?
- Cifras de `video/narrative.md` frente a los OKR: costo de mantenimiento "€78 → €60 per vehicle" (`narrative.md:60`) frente a €117,1 → €79,08 por trimestre (`OKRs.md:17`); "≤ 18 % error" (`narrative.md:42`) frente a 82 % de precisión planeada (`OKRs.md:14`); refunds "2.8 % → 1.4 %" (`narrative.md:77`) frente a 46 % → 6 % (`OKRs.md:19`). [HUECO] El texto no dice de dónde salen; puede aclararlo el PDF.
- `README.md:170` enlaza `/hld/mlops/MLOps on Vertex AI & Gemini.md` y `hld-data-and-analytics.md:16` enlaza `../mlops/MLOps on Vertex AI & Gemini.md`, pero el archivo existente es `hld/mlops/README.md`. `narrative.md:40,55,67` enlaza `../adrs/ADR-0007.md` y otros que no existen con ese nombre. [HUECO] Enlaces rotos.
- ADR-0019:27 termina en "Estimating even" (frase incompleta). [HUECO]
- En `hld/scenarios/battery-replacement-and-fleet-allocation/README.md:15` el usuario puede seguir con un vehículo descargado hasta 12 horas antes del bloqueo remoto; no hay ADR que lo respalde. [HUECO] ¿Decisión o supuesto?
- Los costos mensuales de ejecución (`narrative.md:86-93`, "≈ 9 000 €/month") no tienen cálculo en el texto. [HUECO] ¿Están en el PDF?
