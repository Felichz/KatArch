# ConnectedAI · investigación fase 1 (texto)

Rutas relativas a `katas-src/ConnectedAI/`.

## 1. El caso

[DATO] ShopWise Solutions es una tienda en línea con catálogo de electrónica, ropa y artículos del hogar (`README.md:18`). Pide un asistente de soporte con IA que sea "la primera línea de soporte" de la tienda y atienda consultas de productos, pedidos, devoluciones y reembolsos, integrado con la base de datos de la empresa (`1_requirements/01-functional-requirements.md:5`). Requisitos funcionales: comprensión de lenguaje natural, contexto en diálogos de varios turnos, respuestas personalizadas, consultas anidadas (varias peticiones en un mensaje), y "Avoidance of Misinformation: Provide responses based only on verified data from the company database" (`1_requirements/01-functional-requirements.md:10-15`); comparación, alternativas, disponibilidad por atributo (color, talla) (`:21-24`); estado de pedido, seguimiento, elegibilidad de devolución, historial, demoras, pedidos con varios ítems (`:27-32`). Requisitos no funcionales: exactitud "avoiding errors and hallucinations", velocidad, usabilidad, documentación (`1_requirements/02-non-functional-requirements.md:8-11`). Supuestos: el usuario entra con ID de cliente o como invitado; interfaz web; acceso en tiempo real a datos de productos y pedidos; se usará un modelo NLP preentrenado (`1_requirements/03-assumptions-and-constraints.md:5-8`). Restricción: datos de entrenamiento limitados (`:11`). [HUECO] El texto no da cifras de carga, latencia objetivo, presupuesto ni plazos. [HUECO] El enunciado original de la kata no está en el repositorio; el caso se reconstruye desde los documentos del equipo. [DATO] Es una edición de "AI Katas" de O'Reilly (`README.md:1,9`); el equipo es de Woolworths Group, Australia (`README.md:61`).

## 2. Qué entregó el equipo

- `README.md`: índice general, equipo, enlaces a videos de presentación y demo.
- `1_requirements/`: 3 archivos (funcionales, no funcionales, supuestos y restricciones). [DATO] 18 requisitos funcionales en viñetas (`01-functional-requirements.md:10-32`) y 4 no funcionales (`02-non-functional-requirements.md:8-11`). [DEDUCCIÓN] Conteo de viñetas; los requisitos no están numerados ni tienen ID.
- `2_features_and_roadmap/features.md`: 26 funcionalidades numeradas agrupadas por área (`features.md:6-75`).
- `2_features_and_roadmap/product-roadmap.md`: separa MVP de "Future Release" (`product-roadmap.md:6-44`).
- `3_architecture_and_design/`: 9 documentos que acompañan diagramas C4: contexto (C1), dos contenedores (C2), cuatro componentes (C3), resumen y leyenda. [DATO] Método C4 declarado (`README.md:102`, `3_architecture_and_design/architecture.md:1-5`). Diagramas referidos: 10 PNG en `images/architecture/` más un PDF.
- `4_adrs/`: 13 archivos, 1 plantilla (`000_adr_template.md`) y 12 ADR de decisión. Formato con Context, Requirements, Assumptions, Decision Drivers, Considered Options (ventajas y desventajas), Decision, Reasons, Consequences (positivas y trade-offs).
- `5_tech_stack/tech-stack.md`: tecnologías por capa.
- `6_test_cases/test-cases.md`: 12 categorías de casos de prueba con prompt de ejemplo y video de demo.
- `6_test_cases/evaluation.md`: evaluación offline con Ragas (LLM-as-a-judge) y trazas con Langfuse; tabla comparativa de tres modelos.
- `7_deployment/`: instrucciones de despliegue local, nube (Cloud Run + Firebase) y carga de datos.
- `8_code/`: implementación (backend de IA en Python/LangGraph, servidor de API Node.js, interfaz React), con READMEs de uso.
- `videos/`: demo y 17 videos de pruebas (no leídos en esta fase).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR001 | Usar MongoDB como base de datos para documentos y embeddings vectoriales. | no declara | SQL (PostgreSQL, con pgvector), grafos (Neo4j), MongoDB | Esquema flexible, datos jerárquicos, escalabilidad, búsqueda vectorial vía librerías o Atlas | Rendimiento depende de índices; sin garantías ACID fuertes para transacciones complejas; curva de aprendizaje | Flexibilidad de esquema, escalabilidad, rendimiento de búsqueda vectorial; requisito interno de "transactional database ... data integrity" | `4_adrs/001_adr_nosql_database_storage.md:1-61` |
| ADR002 | Usar modelos preentrenados sin fine-tuning: Claude Sonnet 3.5 para agentes y Gemini 1.5 Flash para routers y tareas simples. | Accepted | LLM propio, preentrenados comerciales (Claude, Gemini), open source (Cohere, Hugging Face) | Rendimiento, menor tiempo de desarrollo, costo frente a desarrollo propio; elección por tarea según capacidad y costo | Dependencia de proveedores, costos de licencia y uso, poco control sobre la arquitectura del modelo | Exactitud, time-to-market, escalabilidad, flexibilidad | `4_adrs/002_adr_pre_trained_models.md:1-64` |
| ADR003 | Construir un API gateway propio. | Accepted | Gateway comercial (Apigee, Kong), sin gateway, gateway propio | Control de ruteo, seguridad y monitoreo; evitar costo de funciones no usadas; independencia de terceros | Mayor costo de desarrollo y mantenimiento, recursos dedicados, plazo inicial más largo | Seguridad, rendimiento, flexibilidad, costo | `4_adrs/003_adr_custom_api_gateway.md:1-58` |
| ADR004 | Guardar el estado de sesión en memoria. | Accepted | Persistir en base de datos, híbrido memoria + persistencia, en memoria | Baja latencia, simplicidad, sesiones de vida corta | Se pierden sesiones al reiniciar o reducir escala; sin durabilidad; riesgo de agotar memoria | Velocidad, simplicidad, escalabilidad; diálogos de varios turnos | `4_adrs/004_adr_in_memory_state_session_management.md:1-58` |
| ADR005 | Usar LangGraph para orquestar los agentes y flujos de LLM. | Accepted | CrewAI, AutoGen, Haystack, LangGraph | Flujos estructurados con ramas y lógica condicional; experiencia previa del equipo | Más complejo que las otras opciones; esfuerzo extra para diseñar flujos complejos | Gestión de flujos, escalabilidad, familiaridad del equipo | `4_adrs/005_adr_langgraph_framework.md:1-61` |
| ADR006 | Backend en GCP y frontend en Firebase. | Accepted | Backend: AWS, Azure, GCP. Frontend: Firebase, Cloud Run, Heroku, autoalojado | Alineación con infraestructura y herramientas existentes (GCP); frontend casi estático | Dos plataformas con monitoreo y gestión de costos separados; Firebase limitado a contenido estático o semidinámico | Integración, escalabilidad, simplicidad, costo | `4_adrs/006_adr_hosting.md:1-76` |
| ADR007 | Usar Langfuse para evaluación offline y trazas. | Accepted | Langfuse, Phoenix Arize, LangSmith | Autoalojable (control de datos sensibles), bajo costo, evaluación y trazas | Esfuerzo de desplegar y mantener una instancia propia; menos documentación y comunidad | Evaluación offline, trazas, costo, integración, autoalojamiento | `4_adrs/007_adr_evaulation_framework.md:1-57` |
| ADR008 | Autenticación con usuario/contraseña y JWT, más acceso de invitado limitado. | Accepted | Usuario/contraseña con JWT, OAuth 2.0, proveedores de identidad externos, acceso de invitado | JWT liviano y sin estado; cumple requisitos actuales y permite agregar OAuth2 o SSO después | Gestión segura de claves; el acceso de invitado exige monitorear y limitar permisos | Seguridad, acceso de invitado, escalabilidad, preparación para proveedores externos | `4_adrs/008_adr_authentication_and_authorization.md:1-67` |
| ADR009 | Usar GitHub Actions para CI/CD, con evaluación offline contra un conjunto de verdad de referencia dentro del pipeline. | Proposed | GitHub Actions, Jenkins, GitLab CI/CD | Integración con repositorios GitHub (`:38`); sin sección Reasons | Atado a GitHub | Automatización, calidad, iteración rápida | `4_adrs/009_adr_github_actions_ci_cd.md:1-47` |
| ADR010 | Caché del lado del servidor con Redis o Memcached. | Proposed | Caché en cliente, caché en servidor (Redis/Memcached), sin caché | Caché centralizada más fácil de gestionar y escalar; TTL e invalidación | Infraestructura extra, complejidad de invalidación, monitorear memoria | Rendimiento, escalabilidad, consistencia, simplicidad | `4_adrs/010_adr_caching.md:1-57` |
| ADR011 | Contenedores Docker desplegados en Google Cloud Run. | Accepted | Docker + Cloud Run, Docker + Kubernetes (GKE), sin contenedores | Despliegues consistentes, sin gestionar clústeres, escalado automático, pago por uso | Menos control que Kubernetes; restricciones para cargas no HTTP o procesos largos; dependencia de Google | Consistencia, escalabilidad, menor carga operativa, costo | `4_adrs/011_adr_containerization.md:1-64` |
| ADR012 | WebSockets entre frontend y backend para respuestas en streaming. | Accepted | WebSockets, Server-Sent Events, long polling, REST con polling periódico | Comunicación persistente y bidireccional, baja latencia | Más uso de recursos del servidor por conexiones persistentes; esfuerzo de implementación y pruebas; escalar para alta concurrencia | Respuesta en tiempo real, escalabilidad, simplicidad | `4_adrs/012_adr_web_socket_implementation.md:1-65` |

[DATO] Excluido: `4_adrs/000_adr_template.md` (plantilla con estados "proposed, accepted, superseded", `:4`). No hay ADR sobre cómo usar ADR.

## 4. Hallazgos para el curso

#### H01 · Un modelo de IA distinto según la tarea
- Idea: no hace falta un único modelo para todo el sistema; se puede asignar el modelo caro donde la tarea lo exige y uno barato y rápido donde basta.
- Lo que hizo el equipo: [DATO] Claude Sonnet 3.5 como LLM central de los agentes, por su razonamiento y llamado a herramientas; Gemini 1.5 Flash para routers y tareas simples, por velocidad y bajo costo (`4_adrs/002_adr_pre_trained_models.md:43-45`).
- Razón declarada: [DATO] "the choice of pre-trained models will be made based on the required capabilities and the cost-benefit analysis" (`4_adrs/002_adr_pre_trained_models.md:43`).
- Costo o trade-off admitido: [DATO] dependencia de proveedores externos, costos de licencia y uso, poco control sobre la arquitectura del modelo (`:62-64`).
- Alternativas que nombra: [DATO] LLM propio; modelos open source (Cohere, Hugging Face) (`:28-38`).
- Estado: Accepted (`:4`).
- Fuente: `4_adrs/002_adr_pre_trained_models.md:40-45`; `5_tech_stack/tech-stack.md:36`.
- Completitud: *completo*.
- Contexto para contarlo: qué es el asistente de ShopWise; qué es un "router" (componente que decide a qué agente va una pregunta); qué es llamar a una herramienta desde un LLM.
- Depende de imagen: no.
- Verificado: [ ]

#### H02 · Comprar el modelo preentrenado en vez de entrenar uno propio
- Idea: entrenar un modelo propio se descarta cuando los modelos disponibles cubren la necesidad y el costo de construirlo no se justifica; el ajuste fino queda para después.
- Lo que hizo el equipo: [DATO] usar modelos preentrenados "as-is with no fine-tuning"; el fine-tuning queda reservado para trabajo futuro (`4_adrs/002_adr_pre_trained_models.md:41`). [DATO] El roadmap pone el "LLM Fine-Tuning Pipeline" en la versión futura (`2_features_and_roadmap/product-roadmap.md:42`).
- Razón declarada: [DATO] desarrollo propio "extremely resource-intensive and unnecessary" (`4_adrs/002_adr_pre_trained_models.md:17`); menor tiempo de desarrollo y costo (`:49-51`).
- Costo o trade-off admitido: [DATO] dependencia de proveedores, costos por token, control limitado (`:34`, `:62-64`).
- Alternativas que nombra: [DATO] LLM propio (control total, sin dependencia externa; costo y tiempo altos) y open source (`:28-38`).
- Estado: Accepted.
- Fuente: `4_adrs/002_adr_pre_trained_models.md:28-51`; `1_requirements/03-assumptions-and-constraints.md:8,11`.
- Completitud: *completo*.
- Contexto para contarlo: qué es un modelo preentrenado y qué es ajuste fino (fine-tuning), definidos en una frase.
- Depende de imagen: no.
- Verificado: [ ]

#### H03 · Estado de sesión en memoria: velocidad a cambio de perder la sesión
- Idea: una decisión de estado se toma mirando cuánto vive el dato; si la sesión es corta, se puede aceptar perderla a cambio de latencia y simplicidad, y dejar la persistencia para después.
- Lo que hizo el equipo: [DATO] estado de sesión en memoria; "Future work will explore hybrid state management" (`4_adrs/004_adr_in_memory_state_session_management.md:41`).
- Razón declarada: [DATO] sesión "primarily short-lived"; persistencia ante caídas "not a strict requirement"; el estado se puede reconstruir con el historial del usuario (`:16-18`); baja latencia para diálogo en tiempo real (`:44`).
- Costo o trade-off admitido: [DATO] "Sessions are lost if the system restarts or scales down unexpectedly"; sin durabilidad; riesgo de agotar memoria bajo carga (`:56-58`).
- Alternativas que nombra: [DATO] persistir en base de datos (latencia en cada acceso), híbrido (complejidad) (`:28-34`).
- Estado: Accepted.
- Fuente: `4_adrs/004_adr_in_memory_state_session_management.md:1-58`.
- Completitud: *completo*.
- Contexto para contarlo: qué es una sesión de chat de varios turnos; qué significa que un servidor escale hacia abajo.
- Depende de imagen: no.
- Verificado: [ ]
- [DEDUCCIÓN] ADR011 elige Cloud Run con escalado automático (`4_adrs/011_adr_containerization.md:45`); ADR004 admite que las sesiones se pierden al reducir escala (`:56`). El texto no relaciona las dos decisiones.

#### H04 · Supervisor que reparte preguntas a agentes especializados
- Idea: un asistente de IA se puede partir en agentes con responsabilidad acotada y un supervisor que enruta, igual que se parte un sistema en componentes.
- Lo que hizo el equipo: [DATO] un "Customer Support Supervisor" enruta consultas a agentes de pedidos, productos y fallback (`3_architecture_and_design/c2-container-ai-assistant-system.md:12-13`); un "Product Supervisor" delega en agentes de atributos, comparación y recomendación, y estadísticas (`2_features_and_roadmap/features.md:37-44`). Cada agente tiene sus herramientas (`3_architecture_and_design/architecture.md:59-71`). El agente de fallback deriva a soporte humano (`features.md:55-56`).
- Razón declarada: no declara (solo "This modular architecture ensures scalability, flexibility", `architecture.md:83`). [HUECO] No hay ADR sobre la división en agentes; ADR005 elige el framework (LangGraph), no la estructura.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `3_architecture_and_design/architecture.md:55-71`; `3_architecture_and_design/`; `2_features_and_roadmap/features.md:28-58`.
- Completitud: *ilustrativo* (estructura documentada sin decisión que la respalde).
- Contexto para contarlo: qué es un agente de IA con herramientas; el caso ShopWise.
- Depende de imagen: sí (`images/architecture/c2-container-ai-assistant-system.png`, `c3-*.png`).
- Verificado: [ ]

#### H05 · Responder solo con datos verificados: herramientas que consultan la base
- Idea: el requisito de no inventar respuestas se traduce en arquitectura: el modelo no responde de memoria sino a través de herramientas que leen la base de datos de la empresa.
- Lo que hizo el equipo: [DATO] requisito "Provide responses based only on verified data from the company database" (`1_requirements/01-functional-requirements.md:14`) y "avoiding errors and hallucinations" (`1_requirements/02-non-functional-requirements.md:8`). Los agentes usan herramientas que leen las bases de pedidos y productos (`3_architecture_and_design/c3-component-order-processing-agent.md:9-16`). La herramienta de detalle de pedido aplica "a check ... to ensure the order belongs to the given customer" (`:12`).
- Razón declarada: [DATO] los requisitos citados.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `1_requirements/01-functional-requirements.md:14`; `3_architecture_and_design/c3-component-order-processing-agent.md:6-16`.
- Completitud: *parcial* (falta una decisión registrada con alternativas y costo).
- Contexto para contarlo: qué es una alucinación de un modelo de lenguaje; qué es una herramienta (tool) de un agente.
- Depende de imagen: no.
- Verificado: [ ]

#### H06 · Búsqueda de productos en etapas: híbrida, luego validación por LLM
- Idea: una consulta en lenguaje natural sobre el catálogo se resuelve con una cadena: búsqueda que combina vectores y palabras clave, filtros, y un LLM que verifica la relevancia de cada resultado.
- Lo que hizo el equipo: [DATO] la Product Details Tool busca en fragmentos de descripciones preprocesadas con "hybrid search (vector search and keyword search)", con límites opcionales de precio y rating; recupera el producto padre; un LLM valida en paralelo la relevancia de cada ítem; ordena por un criterio (`3_architecture_and_design/c3-component-product-attributes-agent.md:16-22`). [DATO] Los nombres y descripciones se limpian antes con un LLM "enhancing the data quality for hybrid retrieval" (`7_deployment/data_preprocessing_loading.md:9`). [DATO] ADR001 cita la compatibilidad de MongoDB con búsqueda de texto completo "enabling hybrid search" (`4_adrs/001_adr_nosql_database_storage.md:56`).
- Razón declarada: no declara para el diseño en etapas.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `3_architecture_and_design/c3-component-product-attributes-agent.md:16-22`; `7_deployment/data_preprocessing_loading.md:8-9`.
- Completitud: *ilustrativo*.
- Contexto para contarlo: qué es un embedding y una búsqueda vectorial; qué es búsqueda por palabras clave.
- Depende de imagen: sí (`images/architecture/c3-component-product-attributes-agent.png`).
- Verificado: [ ]

#### H07 · Una sola base para vectores y documentos
- Idea: elegir el almacenamiento mirando todas las formas de dato que el sistema maneja (vectores para búsqueda semántica y documentos de pedidos) evita sumar una pieza extra.
- Lo que hizo el equipo: [DATO] MongoDB para embeddings y documentos (`4_adrs/001_adr_nosql_database_storage.md:43`). Los datos con integridad relacional estricta irían a una base relacional aparte para analítica (`:23`).
- Razón declarada: [DATO] esquema flexible, datos jerárquicos, escalabilidad, búsqueda vectorial (`:46-49`). PostgreSQL descartado porque la búsqueda vectorial requiere extensiones como pgvector, "increasing complexity" (`:34`); Neo4j por complejidad innecesaria (`:37`).
- Costo o trade-off admitido: [DATO] rendimiento depende de índices; "Lacks strong ACID guarantees for complex transactional operations"; curva de aprendizaje (`:59-61`).
- Alternativas que nombra: [DATO] PostgreSQL, Neo4j (`:32-37`).
- Estado: no declara (el ADR no tiene sección Status).
- Fuente: `4_adrs/001_adr_nosql_database_storage.md:1-61`.
- Completitud: *parcial* (falta estado). [DEDUCCIÓN] El requisito `:18` pide "transactional database ... to ensure data integrity" y el trade-off `:60` admite falta de ACID fuerte; el texto no resuelve esa tensión.
- Contexto para contarlo: qué es un embedding; qué es ACID.
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · Evaluar un asistente de IA: métricas que engañan solas
- Idea: la calidad de un componente de IA se mide con un conjunto de pruebas y varias métricas a la vez; una métrica sola puede dar puntaje alto a una respuesta inútil.
- Lo que hizo el equipo: [DATO] evaluación offline con Ragas, métricas calculadas por un LLM como juez (`6_test_cases/evaluation.md:7`); dos métricas, faithfulness y answer relevancy (`:34-37`); preguntas generadas por LLM sobre elegibilidad de devolución (`:13-16`); tres modelos comparados en tiempo, costo y métricas (`:45-49`). [DATO] Gemini 1.5 Flash obtuvo relevancia alta (0.8) y faithfulness 0.0 pidiendo un número de pedido que ya estaba en la pregunta; "individual metrics are not enough on their own" (`:49`, `:53-62`).
- Razón declarada: [DATO] evaluar antes de desplegar (`:5`); ADR007 pide evaluación offline "without requiring a full deployment" (`4_adrs/007_adr_evaulation_framework.md:7`).
- Costo o trade-off admitido: [DATO] el conjunto es estrecho ("a narrow test set", `6_test_cases/evaluation.md:94`).
- Alternativas que nombra: no declara (para Ragas). Para la plataforma, ADR007: Phoenix Arize, LangSmith.
- Estado: Accepted (ADR007).
- Fuente: `6_test_cases/evaluation.md:1-99`; `4_adrs/007_adr_evaulation_framework.md`.
- Completitud: *completo* para la idea de métricas combinadas.
- Contexto para contarlo: qué es un conjunto de prueba con respuesta esperada; qué miden faithfulness (fidelidad al contexto) y answer relevancy (relevancia a la pregunta).
- Depende de imagen: no para la tabla (está en texto); sí para las capturas (`images/evaluation/*.png`).
- Verificado: [ ]

#### H09 · Elegir modelo por experiencia de usuario frente al costo, con datos a la vista
- Idea: la evaluación da cifras de costo y tiempo por modelo; la decisión final puede ir contra la opción más barata y el texto deja escrito por qué.
- Lo que hizo el equipo: [DATO] tabla: GPT-4o-mini ~0.0003 USD y ~5 s; Claude Sonnet 3.5 ~0.015 USD y ~10 s; Gemini 1.5 Flash <0.0001 USD y ~2.5 s (`6_test_cases/evaluation.md:47-49`). Eligieron Claude Sonnet 3.5 "despite it's greater cost due to the better user experience and performance" por pruebas de varios turnos y cualitativas (`:98`).
- Razón declarada: [DATO] mejor experiencia y rendimiento (`:98`).
- Costo o trade-off admitido: [DATO] mayor costo (`:98`); falta una evaluación cuantitativa más amplia, prevista "in future work" (`:99`).
- Alternativas que nombra: [DATO] GPT-4o-mini, Gemini 1.5 Flash (`:20-22`).
- Estado: no declara como ADR; enlaza con ADR002 (Accepted).
- Fuente: `6_test_cases/evaluation.md:45-49,92-99`; `4_adrs/002_adr_pre_trained_models.md:45`.
- Completitud: *parcial* (la tabla de la prueba narrow da a Claude relevancia 0.4, menor que GPT-4o-mini; la elección se apoya en pruebas cualitativas no documentadas en el texto).
- Contexto para contarlo: H08.
- Depende de imagen: no.
- Verificado: [ ]
- [HUECO] La celda de tiempo de GPT-4o-mini está escrita "~5~" (`:47`), posible error tipográfico.

#### H10 · Evaluación offline como compuerta del pipeline de despliegue
- Idea: en un sistema con IA, la prueba que bloquea un despliegue puede incluir la evaluación del modelo contra un conjunto de verdad de referencia, no solo pruebas de código.
- Lo que hizo el equipo: [DATO] "Offline evaluation of the AI assistant against a ground truth testset will be a key component of the CI/CD pipeline" (`4_adrs/009_adr_github_actions_ci_cd.md:38`).
- Razón declarada: [DATO] mantener calidad con pruebas automáticas (`:20`).
- Costo o trade-off admitido: [DATO] solo atadura a GitHub (`:47`); nada sobre el costo de la evaluación.
- Alternativas que nombra: [DATO] Jenkins, GitLab CI/CD (`:29-35`).
- Estado: Proposed (`:4`).
- Fuente: `4_adrs/009_adr_github_actions_ci_cd.md:1-47`.
- Completitud: *parcial* (Proposed, sin sección de razones).
- Contexto para contarlo: qué es CI/CD; H08.
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Herramienta de observabilidad autoalojada por los datos sensibles
- Idea: dónde corre la herramienta que guarda trazas de conversaciones es una decisión de datos: autoalojarla mantiene los datos dentro, a cambio de operarla.
- Lo que hizo el equipo: [DATO] Langfuse autoalojado para evaluación y trazas (`4_adrs/007_adr_evaulation_framework.md:41`).
- Razón declarada: [DATO] "Allow self-hosted deployment to maintain control over sensitive data" (`:13`); bajo costo (`:44`).
- Costo o trade-off admitido: [DATO] desplegar y mantener una instancia; menos documentación y comunidad (`:56-57`).
- Alternativas que nombra: [DATO] Phoenix Arize (menos documentado), LangSmith (free tier limitado, más caro) (`:32-38`).
- Estado: Accepted.
- Fuente: `4_adrs/007_adr_evaulation_framework.md:1-57`.
- Completitud: *completo*.
- Contexto para contarlo: qué es una traza (registro de entradas y salidas de cada paso).
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Streaming de respuestas: el canal se elige por la forma de la interacción
- Idea: mostrar la respuesta de un LLM a medida que se genera exige un canal que mantenga la conexión; las opciones se comparan por dirección del flujo y latencia.
- Lo que hizo el equipo: [DATO] WebSockets entre frontend y backend (`4_adrs/012_adr_web_socket_implementation.md:43`). [DATO] El backend envía la respuesta en fragmentos con `isCompleted` (`7_deployment/local-machine-deployment.md:215-221`).
- Razón declarada: [DATO] REST no sirve para streaming por su modelo pedido-respuesta (`:7`); conexión persistente y bidireccional, baja latencia (`:46-47`).
- Costo o trade-off admitido: [DATO] más recursos del servidor por conexiones persistentes; más esfuerzo de pruebas; escalar para alta concurrencia (`:58-60`).
- Alternativas que nombra: [DATO] SSE (solo servidor a cliente), long polling, REST con polling (`:30-40`).
- Estado: Accepted.
- Fuente: `4_adrs/012_adr_web_socket_implementation.md:1-65`.
- Completitud: *completo*.
- Contexto para contarlo: qué es streaming de tokens; qué es una conexión persistente.
- Depende de imagen: no.
- Verificado: [ ]
- [HUECO] El ADR descarta SSE por no ser bidireccional, pero no dice qué necesita enviar el cliente durante el streaming.

#### H13 · Contenedores en plataforma serverless en vez de Kubernetes
- Idea: el nivel de control de la infraestructura se elige según la necesidad; un servicio administrado quita trabajo operativo a cambio de restricciones y dependencia del proveedor.
- Lo que hizo el equipo: [DATO] Docker en Google Cloud Run (`4_adrs/011_adr_containerization.md:40`).
- Razón declarada: [DATO] consistencia entre entornos, sin gestionar orquestación, escalado automático (`:43-45`); pago por uso (`:23`).
- Costo o trade-off admitido: [DATO] menos control que Kubernetes; restricciones para cargas no HTTP o procesos largos; "Potential vendor lock-in" (`:56-58`).
- Alternativas que nombra: [DATO] Kubernetes (GKE), "Overkill for the project's needs" (`:31-33`); sin contenedores (`:35-37`).
- Estado: Accepted.
- Fuente: `4_adrs/011_adr_containerization.md:1-64`.
- Completitud: *completo*.
- Contexto para contarlo: qué es un contenedor; qué es serverless.
- Depende de imagen: no.
- Verificado: [ ]
- [DEDUCCIÓN] ADR012 usa conexiones persistentes y ADR011 admite restricciones para procesos largos en Cloud Run; el texto no cruza las dos.

#### H14 · Acceso de invitado con permisos acotados
- Idea: dar acceso sin cuenta es una decisión de seguridad: el invitado recibe un token con menos permisos y solo ciertos endpoints.
- Lo que hizo el equipo: [DATO] JWT para usuarios y para invitados; acceso de invitado "limited to specific API endpoints to prevent privilege escalation" (`4_adrs/008_adr_authentication_and_authorization.md:65,67`). [DEDUCCIÓN] Pedir historial requiere ID de cliente (la línea solo dice que el usuario entra con ID de cliente o como invitado) (`1_requirements/03-assumptions-and-constraints.md:5`).
- Razón declarada: [DATO] experiencia de usuario sin cuenta (`:50`); JWT sin estado para sistemas distribuidos (`:48`); OAuth2 más complejo para el despliegue inicial (`:34`).
- Costo o trade-off admitido: [DATO] gestión de claves; monitorear y limitar al invitado (`:60-61`).
- Alternativas que nombra: [DATO] OAuth 2.0, proveedores externos (Google, Facebook) (`:32-38`).
- Estado: Accepted.
- Fuente: `4_adrs/008_adr_authentication_and_authorization.md:1-67`.
- Completitud: *completo*.
- Contexto para contarlo: qué es un JWT (token firmado que el servidor verifica sin guardar sesión).
- Depende de imagen: no.
- Verificado: [ ]

#### H15 · API gateway propio frente a uno comercial
- Idea: construir una pieza de infraestructura en vez de comprarla se justifica con funciones no usadas y costo de licencia, y se paga con desarrollo y mantenimiento.
- Lo que hizo el equipo: [DATO] gateway propio (`4_adrs/003_adr_custom_api_gateway.md:41`).
- Razón declarada: [DATO] control de ruteo, seguridad y monitoreo; evitar costos de funciones no usadas; sin dependencia de terceros (`:44-46`).
- Costo o trade-off admitido: [DATO] mayor costo de desarrollo y mantenimiento, recursos dedicados, plazo inicial más largo (`:56-58`).
- Alternativas que nombra: [DATO] Apigee, Kong; sin gateway (`:28-34`).
- Estado: Accepted.
- Fuente: `4_adrs/003_adr_custom_api_gateway.md:1-58`.
- Completitud: *completo*.
- Contexto para contarlo: qué es un API gateway.
- Depende de imagen: no.
- Verificado: [ ]

#### H16 · Roadmap: MVP y lo que se deja para después
- Idea: la arquitectura separa lo que entra al MVP de lo que llega después, y la plataforma de IA responsable crece por etapas.
- Lo que hizo el equipo: [DATO] MVP con login, chat con streaming, agentes, monitoreo, dataset de ajuste y pipelines de evaluación; versión futura con pipeline de sanitización de datos, pipeline de fine-tuning, dashboards y alertas (`2_features_and_roadmap/product-roadmap.md:6-44`). [DATO] C1: en el futuro se desplegarán modelos ajustados para los agentes (`3_architecture_and_design/c1-system-context.md:12`).
- Razón declarada: no declara.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: `2_features_and_roadmap/product-roadmap.md`; `3_architecture_and_design/architecture.md:75-79`.
- Completitud: *ilustrativo*.
- Contexto para contarlo: qué es un MVP.
- Depende de imagen: sí (`images/features_and_roadmap/product-roadmap.png`).
- Verificado: [ ]
- [HUECO] `architecture.md:47` lista "Data Sanitization Pipeline" entre los contenedores de C2 sin marcarlo como futuro; el roadmap lo pone en "Future Release" (`product-roadmap.md:41`).

## 5. Lo que no tiene valor para el curso

- `7_deployment/cloud_hosting_instructions.md`, `7_deployment/local-machine-deployment.md` (salvo el formato de streaming, usado en H12), `8_code/*/README.md`, `8_code/ai-backend/example/langfuse-docker/README.md` y `docker-composer.yml`: instrucciones de instalación y comandos; no enseñan decisiones.
- `LICENSE.md`: licencia MIT.
- `8_code/apps/app-ui/public/index.html`: plantilla HTML vacía.
- `3_architecture_and_design/legend.md`: solo remite a la imagen de leyenda.
- `5_tech_stack/tech-stack.md`: lista de tecnologías por capa, repite lo decidido en los ADR; nombra Splunk y PostgreSQL en la plataforma de IA responsable sin decisión asociada (`:43`).
- `6_test_cases/test-cases.md`: lista de prompts de ejemplo y enlaces a videos; útil como muestra de capacidades, no como decisión.
- `8_code/ai-backend/data/order_data_report.html` y `product_data_report.html`: reportes generados por YData Profiling (título y metadatos leídos; contenido es perfil estadístico automático de los datasets, no documentación del equipo).
- `4_adrs/000_adr_template.md`: plantilla.

## 6. Imágenes para fase 2

- `images/architecture/c4-architecture-ai-assistant.png` (y `.pdf`): vista C4 completa de punta a punta; citada en `README.md:106`, `3_architecture_and_design/architecture.md:3,7`.
- `images/architecture/c1-system-context.png`: actores y sistemas externos; `3_architecture_and_design/c1-system-context.md:5`.
- `images/architecture/c2-container-ai-assistant-system.png`: contenedores (login, chat, gateway, sesiones, supervisor, agentes); `3_architecture_and_design/c2-container-ai-assistant-system.md:4`.
- `images/architecture/c2-container-responsible-ai-ml-ops-platform.png`: plataforma de IA responsable; `3_architecture_and_design/c2-container-responsible-ai-ml-ops-platform.md:4`.
- `images/architecture/c3-component-order-processing-agent.png`: agente de pedidos y sus herramientas; `3_architecture_and_design/c3-component-order-processing-agent.md:4`.
- `images/architecture/c3-component-product-attributes-agent.png`: etapas de la búsqueda de productos; `3_architecture_and_design/c3-component-product-attributes-agent.md:4`.
- `images/architecture/c3-component-product-comparison-recommendation-agent.png`: `3_architecture_and_design/c3-component-product-comparison-recommendation-agent.md:4`.
- `images/architecture/c3-component-product-range-overview-aghent.png`: `3_architecture_and_design/c3-component-product-range-overview-agent.md:4`.
- `images/architecture/c4-architecture-legend.png`: leyenda de los diagramas; `README.md:113`.
- `images/features_and_roadmap/product-roadmap.png`: roadmap MVP y futuro; `2_features_and_roadmap/product-roadmap.md:4`.
- `images/tech_stack/techstack.png`: stack por capa; `5_tech_stack/tech-stack.md:4`.
- `images/evaluation/gemini_eval.png`, `openai_eval.png`, `claude_eval.png`: puntajes de evaluación por modelo; `6_test_cases/evaluation.md:64,77,90`.
- `images/evaluation/langfuse_tracing.png`: ejemplo de traza; `6_test_cases/evaluation.md:28`.

## 7. Preguntas abiertas

- ADR001 no tiene sección Status; ¿se considera aceptado? (`4_adrs/001_adr_nosql_database_storage.md`).
- ADR004 (sesiones en memoria) y el código: `8_code/ai-backend/core/agents/agent_graph.py:68-69` usa `MemorySaver()` de LangGraph como checkpointer, lo que confirma estado en memoria. El ADR no dice si las sesiones viven en el gateway o en el backend de IA.
- ADR003 (gateway propio): el texto describe "API Gateway" en C2 (`c2-container-ai-assistant-system.md:10`); en código, `8_code/apps/api-server/src/routes/chat.js:47-48` reenvía a un endpoint externo y `8_code/apps/app-ui/src/components/chatComponent.js:33` abre el WebSocket directo al backend de IA. ¿El servidor Node.js es el gateway del ADR003, y el streaming lo atraviesa o no?
- ADR010 (caché, Proposed): no hay referencias a Redis ni Memcached en `8_code/ai-backend/core` ni en `8_code/apps/api-server`; consistente con estado Proposed.
- ADR009 (CI/CD, Proposed) y `7_deployment/cloud_hosting_instructions.md:104,109` citan `.github/workflows/build_docker.yaml`, que no existe en esta copia del repositorio.
- ADR002 dice Gemini 1.5 Flash para routers y Claude para agentes; en código, los agentes usan `claude-3-5-sonnet-v2@20241022` (`8_code/ai-backend/core/agents/order_agent/order_agent.py:62`, `product_agent/*_agent.py`) y `8_code/ai-backend/core/utils/chat_model.py:113` usa `gemini-1.5-flash-002`. No se verificó qué nodo usa cada modelo.
- La comprobación "order belongs to the given customer" (`c3-component-order-processing-agent.md:12`): en `8_code/ai-backend/core/agents/order_agent/order_agent_tools.py:25` la consulta filtra solo por `OrderID`; la comprobación no aparece en esa herramienta, y el prompt del agente (`8_code/ai-backend/core/agents/order_agent/order_agent.py:37-45`) no la menciona. No se revisó el resto del código.
- `6_test_cases/evaluation.md:9` cita `8_code/ai-backend/core/test_generation_pipeline.py`; el archivo está en `core/test_generation/test_generation_pipeline.py`.
- Las cifras por modelo de la tabla de evaluación vienen de un solo conjunto (return-eligibility); los resultados detallados están en `8_code/ai-backend/data/eval_sets/*.xlsx` y en `core/notebooks/test_agent.ipynb`, no leídos en esta fase.
- `tech-stack.md:43` nombra Vertex AI y Splunk en la plataforma de IA responsable; no hay ADR ni texto que explique su papel.
- `features.md:50-51` describe un "Content Refinement Service" y `features.md:57-58` un "Exit Handler"; no aparecen en los documentos C2/C3. ¿Están en el diagrama C2?
