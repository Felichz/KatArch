# Dossier D5 · R5: decidir qué se compra y qué se construye, empezar por lo simple y dejar escrita la condición que obliga a cambiar, con reglas que se verifican solas

Verdades: T2 (comprar u operar, con fachada propia), T1 (empezar simple y escribir la condición de cambio), T12 (fitness functions).
Método: leí completos los ADR y documentos citados en el brief (Pegasuz 003/007/009; Archangels 006; CELUS Ceals 002/005; ConnectedAI 002/003; Five Nines 0013/0014/0020/0022; ZAItects 007 y roll-out; Pragmatic 007; Data Alchemists 14; ArchColider 002/009/003; monArch Readme; Team 7) y busqué por palabras clave en los 12 repos. Todas las citas entre comillas se comprobaron con un script contra los archivos originales. Rutas relativas a `katas-src/<Repo>/`.

Nota de lectura: casi todos los ADR de este dossier tienen estado "Proposed", "Draft" o "Under evaluation" (se indica en cada caso). Los repos de Five Nines no tienen campo de estado en sus ADR.

---

## 1. Las verdades, reformuladas

**Resumen del veredicto**

| Verdad | ¿Se sostiene? | Como queda |
|---|---|---|
| T2 comprar/operar con fachada | Sí, con matices | El criterio "¿es el corazón del negocio?" lo escriben 3 repos; hay otros 3 criterios que deciden en el sentido contrario. La fachada la mencionan 7 repos pero ninguno muestra su interfaz. Las cifras de ambos lados casi no existen. |
| T1 empezar simple + condición medible | **Solo la mitad** | "Empezar simple y escribir que se cambiará": sí (7 repos). "Condición medible": solo Five Nines, y solo para subir de un modelo de IA gestionado/simple a uno propio/complejo. En monolito → servicios, todos los disparadores son frases sin número. |
| T12 fitness functions | **Se sostiene la idea, no la palabra "automáticas"** | BluzBrothers, ZAItects y Five Nines escriben reglas medibles; ArchColider, Archangels y monArch las proponen. Ninguno muestra una regla corriendo (ni código, ni pipeline, ni resultado de ejecución). BluzBrothers las calcula en papel; Archangels y monArch las proponen. |

**T2 reformulada.** Antes de comprar o construir, algunos equipos preguntan qué parte del sistema es la que diferencia al negocio; lo que no lo es se contrata o se adopta como producto, y se le pone una capa propia (wrapper, fachada, interfaz) para poder cambiarlo sin reescribir el sistema. Cada lado tiene su cuenta: el proveedor cobra y limita lo que se puede personalizar; operarlo uno mismo cuesta tiempo de personas. El corpus sostiene bien el "qué" y la capa propia; sostiene mal "sabiendo qué cuesta cada lado": solo ArchColider pone una cifra al lado de operar (0,2 a 0,5 de un desarrollador), y las demás cifras son del lado del proveedor.

Matiz importante: "core vs. no core" es un criterio entre cuatro que aparecen en los ADR:
1. Es el corazón del negocio o no (Pegasuz ADR-003, Archangels ADR-006, ArchColider).
2. Dónde pueden ir los datos / qué regulación aplica (Pragmatic ADR-007, ZAItects ADR-007, Five Nines ADR-0013, ConnectedAI ADR-007).
3. Cuánto cuesta operarlo uno mismo (ArchColider ADR-003 compra; Data Alchemists ADR-14/15 opera para ahorrar).
4. Coherencia con la plataforma ya elegida (Five Nines ADR-0020/0022 descartan APIs de terceros porque chocan con ADR-0003).

**T1 reformulada, en dos afirmaciones que el mapa tenía juntas.**
- T1a. Varios equipos eligen la opción más simple que cumple y escriben que cambiarán después (Pegasuz, ArchColider, Team 7, Pragmatic ADR-017, ZAItects ADR-007, Five Nines en modelos). Lo hacen con condiciones cualitativas: "product market fit", "until it becomes a bottleneck", "metrics and trends".
- T1b. Poner un número, una ventana de tiempo y la acción siguiente a esa condición ("mAP < 0,75 tras 3 meses en producción → modelo propio") solo lo hace Five Nines (ADR-0014, 0020, 0022), y solo en escaleras de modelos de IA. Ningún cambio de estilo de arquitectura (monolito → servicios) tiene un número.
- Contra-dato: monArch, CELUS Ceals, Data Alchemists y Five Nines (a nivel de estilo) arrancan con microservicios o event-driven, no con algo simple.

**T12 reformulada.** Cada característica prioritaria se traduce en una regla con un valor medible y una forma de comprobarla. Eso sí lo hacen BluzBrothers (3 reglas con cálculo), ZAItects (8 métricas con puntaje 0 a 1) y Five Nines (umbrales de promoción, alerta y reentrenamiento, sin llamarlos fitness functions). ArchColider (monitoreo y health checks "como fitness functions"), Archangels y monArch las proponen sin definir valores. "Se verifican solas": en el corpus es una intención o una especificación, no algo mostrado funcionando. Tampoco hay ninguna regla estructural (dependencias entre módulos), ni siquiera en los monolitos modulares que dependen de "disciplina" (ArchColider ADR-002).

---

## 2. Verificación por repo

### T2 · Comprar / contratar vs. operar, con fachada y costo de cada lado

| Repo | ¿La sostiene? | Evidencia (archivo + cita corta) | Detalle concreto |
|---|---|---|---|
| Pegasuz | **Sí** (la más completa) | `ADRs/003.adr-build-vs-buy.md`: "What's the cost of building and buying?" (una de 6 preguntas); `ADRs/009.adr-idp.md`: "behave as an identity facade for the rest of the system" | ADR-003 (Accepted): comprar auth, document storage, chat, notificaciones; construir el núcleo. Mitigación: wrapper service. ADR-009 compara 3 opciones en 4 criterios. Sin vendor, precio ni SLA en ningún documento [HUECO]. |
| Archangels | **Sí** (ADR "Under evaluation") | `4.ADRs/006-consider-buy-vs-build.md`: "expend development effort only in the domains in which it can differentiate itself from the competition" | Núcleo = dominio Medical + analítica. COTS para Forums (sugiere Vanilla Forums). ADR-010 (Confirmed): COTS para registros médicos (sugiere Skyflow). ADR-013 (Confirmed): interfaces para cambiar entre COTS y propio. Sin cifras. |
| CELUS Ceals | Parcial | `3.ARDs/005...md`: "Wildlife Insight was chosen for being a SaaS, which doesn't increase the complexity of the platform with multiple dimensions." | Elige integrar primero con SaaS (Wildlife Insights, Edge Impulse en ADR-006) y deja la puerta a TrapTagger. No hay "construir" como alternativa. Costo admitido: precio "on-request" sin confirmar. |
| ConnectedAI | Parcial, y con un **contra-ejemplo** | `4_adrs/002_adr_pre_trained_models.md`; `4_adrs/003_adr_custom_api_gateway.md` | ADR-002 compra el modelo (Claude Sonnet 3.5 + Gemini 1.5 Flash). ADR-003 **construye** el API gateway por "unnecessary features" de los comerciales. `6_test_cases/evaluation.md` mide costo por llamada de 3 modelos. Sin fachada hacia los proveedores de modelo [HUECO]. |
| Five Nines | Parcial | `adrs/ADR-0013 ... MoCoP.md`: "Self-Hosted MoCoP — Full control but high ops effort and compliance cost." | ADR-0013 compra un SaaS de control plane de modelos. ADR-0020/0022 descartan APIs de terceros (Tractable, Monk AI, AWS Forecast) por chocar con ADR-0001/0003. 14 de 22 ADR nombran "lock-in" y casi todos con la misma mitigación genérica. NFR_9: "Vendor abstraction layer (<2 week migration)". |
| ArchColider | **Sí** (la única con cuentas en ambos lados) | `4.ADRs/003 Tracing and Monitoring Sytem.md`: "we would have to appoint 0.2-0.5 time of a developer / administrator"; `The Script.md`: "we need to know what we build or buy" | Clasificación Core/Supportive/Generic. DataDog ($15/host/mes) frente a Grafana/ELK gratuitos. Pago por proveedor externo con fachada. Maps con tabla de 4 proveedores. TCO a 3 escenarios. Estados: Proposed en 003, 006, 007, 009 y 015. |
| ZAItects | Parcial | `ADRs/005-adr-prompt-orchestrator.md`: "Abstract the orchestration layer behind our own API."; `ADRs/007-adr-llm-deployment.md` | ADR-005: adopta LangChain frente a un orquestador propio, con abstracción propia. ADR-007: despliegue híbrido (datos sensibles on-prem, el resto en LLM gestionado). `other_design_docs/cost-analysis.md` calcula costo de LLM frente a costo de expertos. |
| Pragmatic | **Sí** (la más numérica del lado proveedor) | `ADR/ADR-007-use-of-external-llms.md`; `Requirements/Research/interview-ai-expert.md` | 3 opciones (externo, open-source en nube, on-prem) con pros y contras; decisión: externo. Cifras de entrevista y estimación de tokens. ADR-020 externaliza encuestas ("Existing cheap solutions exist already."). Sin fachada hacia el LLM: la mitigación son tests (ADR-025). |
| Data Alchemists | **Sentido contrario** (opera él mismo) | `adrs/adr-15-message-broker.md`: "This approach helps with cost savings in the initial project phases"; `adr-14-no-sql-database.md` | ADR-14 y ADR-15 (ambos Proposed): Kafka y MongoDB autogestionados en Kubernetes para controlar costos. No declaran alternativa gestionada ni cifras [HUECO]. El mismo README dice que usarán DevOps y observabilidad de terceros. |
| monArch (no marcado) | Parcial | `Readme.md`, componente IAM: reemplazaría al proveedor por un OpenID Connect propio "if it becomes cost prohibitive" | Recomienda proveedor OIDC en la nube y deja escrito cuándo lo reemplazaría (condición cualitativa). Estimación de costo mensual para 50.000 MAU: $2.780. Hexagonal: adaptadores intercambiables. |
| Team 7 (no marcado) | Parcial, con un **contra-ejemplo** | `README.md` ASM-4: "does not interoperate with a 3-party authority"; `ADR/ADR-11-extract-payment-job.md`: "we can leverage 3rd-party schedulers" | Asume que guarda tarjetas localmente y aísla el billing en un quantum (PCI). No compara con contratar un procesador de pagos [HUECO]. ADR-12: el gateway es "a facade to other quanta" (interna, no hacia un proveedor). |
| BluzBrothers | No | ADR-003 (TSDB), ADR-015 (Kafka) | Eligen tecnologías sin marco comprar/construir. |

### T1 · Empezar simple y escribir la condición que dispara el cambio

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| Five Nines | **Sí** (T1a y T1b; el único con números) | ADR-0014, 0020, 0022 | Escalera de 2 peldaños en visión (AutoML → modelo propio) y en pronóstico (Prophet → ML). Disparadores con métrica, umbral y ventana. Ver 3.T1-A y 3.T1-B. ADR-0013 usa un plazo en vez de una métrica: "Reassess after 12 months". |
| ZAItects | Parcial | `ADRs/007`: "We can start with serverless architecture in the begining and evolve to a dedicated service"; `other_design_docs/roll-out-strategy.md` | 3 fases (piloto en paralelo con humanos → IA primero → IA autónoma). KPIs por fase (50 % menos revisiones; precisión > 90 %; intervención < 10 %), pero **no** dice "se pasa a la fase 2 cuando…" [HUECO]. |
| ArchColider | Parcial (T1a sí, T1b no) | `4.ADRs/002 System approach.md`: "modularized monolith is the best option for now" ; `SystemAppoach.md`: "extracting modules should be made based on metrics and trends" | Monolito modular con módulos que se comunican como si hubiera red. La condición es "métricas y tendencias" sin valores. Diseña cómo obtener esas métricas (ADR-004, ADR-003). |
| CELUS Ceals | Parcial | ADR-002 (iteraciones); `4.Solution/2.Suggestion-SecondIteration/README.md` | ADR-002: entregar por iteraciones, lo difícil de cambiar (hardware) primero. "Train models inside the platform" queda para "when the Wildlife Watcher reaches mass adoption". **El estilo no es simple**: ADR-007 elige microservicios (puntaje 20 frente a 15 y 8). |
| monArch | **No** (T1a solo mencionada) | `Readme.md`: "could even be developed and deployed as a modular monolith"; `ADRs/ADR01-Microservices-architecture.md` (Proposed): "even if we decide to build the system as a modular monolith, we can still apply the proposed architecture" | Diseña microservicios y menciona el monolito modular como alternativa viable para el MVP, sin disparador. El único cambio con condición es el IAM propio "if it becomes cost prohibitive". |
| Pegasuz | Parcial (T1a sí, T1b cualitativa) | `ADRs/007...md` (Proposed): "after there is a product market fit and a system required to scale" | MVP monolito modular si hay restricción de costo; luego microservicios + event-driven. Tabla de 5 criterios en Low/High. |
| Team 7 | Parcial | `README.md`, "Transition Architecture": "stick with a monolithic database until it becomes a bottleneck"; `ADR-1`: "if a new scalability level will become necessary" | Dos fases (resolver lo crítico con la BD monolítica; luego partir). Parte de un monolito existente (kata de migración). Condición sin métrica. |
| Pragmatic (no marcado) | Parcial | `ADR/ADR-017`: "If in the future, requirements of reporting in our own UI arises, the Reporting part of this service needs to be split" | Un servicio para analytics y reporting; condición de partir = aparece un requisito. Mitiga con arquitectura hexagonal. ADR-021 (Denied) pospone el manejo de concurrencia. ADR-022 (Open) deja la decisión Kafka/RabbitMQ vacía. |
| BluzBrothers (no marcado) | Parcial, solo alcance | `ADR/ADR-002-update-move-to-next-phase.md`: "In subsequent project phases, we will reevaluate this decision" | Pospone el mecanismo de actualización a la fase 2; sin condición. |
| Data Alchemists | No | ADR-1, ADR-13 | Event-driven para 15 millones de usuarios y 99,99 %. ADR-13: "initially employing multi-zone deployment within a single region", sin decir cuándo se cambia. |
| ConnectedAI | No | ADR-002 | "Fine-tuning will be reserved for future work", sin condición. |
| Archangels | No | `2.SolutionBackground/Roadmap.md` | Iteraciones con tareas, sin condiciones de paso. |

### T12 · Reglas de arquitectura verificadas automáticamente (fitness functions)

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| ZAItects | Parcial (reglas escritas, sin automatización) | `other_design_docs/fitness-functions.md`: 8 funciones | Cada una con objetivo y puntaje 0 a 1. Parámetros numéricos en 2 ("a mean around 70% and a standard deviation of approximately 15"; fácil 80 %+, medio 40–80 %, difícil < 40 %). Ninguna con umbral que dispare una acción; ninguna enlazada a un ADR. |
| BluzBrothers | Parcial (cálculo en papel) | `README.md` tabla "Fitness functions"; `FitnessFunctions/Sizing.md`, `Alerts.md`, `Failover.md` | 3 funciones con resultado "Success". La de rendimiento suma 693 ms frente a una meta de 1 s. Es un cálculo, no una prueba ejecutable. |
| ArchColider | Parcial (intención + diseño de métricas) | ADR-003: "should act architecture fitness functions"; ADR-016 (Draft): "run architectural fitness functions on the specification instead of the run-time environment"; `The Script.md`: "Metrics trend analysis should be used as fitness functions." | ADR-004 (Accepted): health checks de negocio con mensajes de prueba que miden corrección y duración. Sin umbrales. |
| Archangels | Parcial (propuesta, no implementada) | `1.ProblemBackground/ArchitectureAnalysis.md`, "Architectural Governance" | "Non-compliance will need to be fixed ... in the same way as a failing test". Opciones: CloudWatch, Kibana, Lambdas. Paso siguiente sin marcar: "Investigate options for Fitness Functions". |
| monArch | Parcial (mención) | `Readme.md`, "Evaluation, Risks and Architecture Fitness" | "Performance requirements for certain components need to be enforced by explicit architecture fitness functions"; "ideally as part of the CI/CD pipeline". Sin definiciones. Admite: "it is difficult to test a system for extensibilty". Cita *Building Evolutionary Architectures* en las referencias. |
| Five Nines (no marcado) | Parcial (reglas automáticas especificadas; no usa la palabra) | ADR-0011, 0020, 0022; `requirements/3_NFRs.md` | Gates de promoción, alertas por deriva, reentrenamiento automático. Ver 3.T12-C. |
| ConnectedAI (no marcado) | Parcial | `4_adrs/009_adr_github_actions_ci_cd.md` | "Offline evaluation of the AI assistant against a ground truth testset will be a key component of the CI/CD pipeline." Evalúa calidad del modelo, no estructura. |
| Pragmatic (no marcado) | Parcial | `ADR/ADR-025-ai-test-concept.md` | Conjuntos de prueba para resume → story, features, matches. Admite que la anonimización "can only be verified by humans or by leveraging other LLMs". |
| Pegasuz, CELUS, Data Alchemists, Team 7 | No | — | Sin fitness functions. Pegasuz tiene CI genérico (lint, build, tests unitarios). |

Búsqueda de herramientas de reglas estructurales (ArchUnit, NetArchTest, dependency-cruiser, quality gate, etc.) en todo el corpus: **0 resultados**.

---

## 3. Los mejores ejemplos para enseñar

### T2 (comprar / operar)

#### T2-A · Pegasuz (Spotlight, 2022): comprar lo que no es el corazón, con un wrapper para lo que falta
**El caso.** Spotlight es una plataforma para conectar a candidatos de grupos subrepresentados con organizaciones sin fines de lucro (NPO). Es un proyecto desde cero ("greenfield") con financiación incierta.

**La situación que obliga a decidir.** ADR-003 (Accepted, 2022-06-23) parte de que "Greenfield projects are ambiguous and risky" y de que importa acortar el ciclo de retroalimentación. Escribe seis preguntas como factores: qué tan cerca está la función de la propuesta de valor, si da ventaja competitiva, qué opción conserva la simplicidad, cuál es la salida más rápida, si el equipo tiene competencia para construirla y cuánto cuesta construir y comprar. Sobre la financiación, `other-artifacts/Requirement-analysis.md` dice: "Why should the business invest to build a fortress when it is not sure if anyone would be staying in it or using it."

**Qué decidió y qué alternativas declaró.** Comprar auth, document storage, chat y notificaciones (in-app, push) y construir las funciones del núcleo. Alternativas: construir en casa o comprar a terceros. Para la identidad (ADR-009, Accepted) la tabla compara tres opciones en cuatro criterios:

| Criterio | Servicio propio | Plataforma open-source autoalojada (Keycloak, Apache LDAP) | Plataforma gestionada (Auth0, Okta) |
|---|---|---|---|
| Tiempo de construir/integrar | Very high | low | low |
| Costo | Build + maintain | maintain | pay as you go |
| Mantenimiento y monitoreo | high | high | no overhead |
| Flexibilidad | high | medium | low |

Decisión: gestionada, porque "Building or managing an identity service is expensive and adds the overhead of security and compliance."

**Qué costo admitió.** ADR-003: "Flexibility and customizability around the features we buy is going to be less." ADR-009: "Choosing a 3rd party vendor will limit us to building for capabilities it does not offer." Mitigación en ambos: un servicio wrapper que "behave as an identity facade for the rest of the system" y construya lo que el proveedor no ofrece. En `quanta/chat.md` y `quanta/meetings.md` la fachada es un criterio de arquitectura de primer orden ("Abstraction": "The chat service acts like a facade to the 3rd party chat provider.").

**Qué enseña.** (1) El criterio de compra se puede escribir como preguntas que cualquiera puede responder. (2) Comprar tiene un precio con nombre (menos flexibilidad) y un remedio con nombre (el wrapper). (3) Lo comprado sale de la lista de características que uno tiene que garantizar: en `chat.md` el equipo escribe una lista "Characteristics that we do not need as we offloaded to 3rd party vendors" con Security, Scalability, Availability y Responsiveness. [DEDUCCIÓN] Esas características pasan a depender del proveedor, y el repo no menciona ningún SLA que las respalde.

**Por qué este y no otro.** Es el único que escribe a la vez las preguntas de decisión, la comparación de tres opciones con criterios y el par costo + mitigación. Archangels es más corto y su ADR sigue "Under evaluation".

**Huecos e inconsistencias (no se debe afirmar más).** Ningún documento nombra proveedor de chat, notificaciones ni almacenamiento, ni precios ni SLA [HUECO]. `quanta/meetings.md` pone "Feasibility" bajo "Characteristics that we do not need as we offloaded", pero su texto dice que la factibilidad importa; y recomienda un calendario de terceros que ADR-003 no lista. `engineering-practices/Data-compliance-security.md` dice "Store no PII data in our system" mientras `other-services/auth-service.md` dice que el servicio de auth guarda PII (ya estaba señalado en el mapa).

**Fuentes.** Pegasuz: `ADRs/003.adr-build-vs-buy.md`, `ADRs/009.adr-idp.md`, `quanta/chat.md`, `quanta/meetings.md`, `other-artifacts/Requirement-analysis.md`.

#### T2-B · ArchColider (Farmacy Food, 2020): clasificar cada subsistema y poner precio a ambos lados
**El caso.** Un startup de comidas en refrigeradores inteligentes, con presupuesto limitado y un equipo pequeño y con experiencia (`The Script.md`). Estimaron costos con 10.000 usuarios (`3.ViewsAndPerspectives/CostAnalysis.md`).

**La situación.** `The Script.md`: "Not all parts of the system are equally important, so we need to know what we build or buy." `2.SolutionBackground/SolutionOverview.md` reparte los subsistemas en tres clases:

| Clase | Subsistemas | Razón escrita |
|---|---|---|
| Core | Meal Catalog, Ordering, Loyalty | "A standard catering system might not help here as we need rich extensibility and control over orders." (Ordering); "limitations from other vendors should not tie the system owners." (Loyalty) |
| Supportive | Feedback, Scheduling | "3rd party tools may close the feature gap with proper customization or integration." |
| Generic | Reporting, Payments | "No need to implement a custom reporting engine"; "We will only build a gateway to payment systems or even pick a payment provider" |

**Qué decidió y por qué descartó alternativas (cada decisión de compra, con su cuenta).**
- Monitoreo (ADR-003, Proposed): DataDog ($15 por host y mes), Grafana (gratuito), ELK (gratuito), CloudWatch ($0,30 por los primeros 10.000 métricas). Elige DataDog aunque no es el más barato: "Finally, choosing an open-source solution we would have to appoint 0.2-0.5 time of a developer / administrator to take care of the monitoring."
- Pagos (ADR-009, Proposed): proveedor externo. Costo: "We save time required for implementing large payment systems but have to track trends and pay fees for processing money transactions." Fachada: `SystemAppoach.md`, "It acts as a facade to the payment system and handles all nuances of payment system usage." Salida: `Tradeoffs.md`, "Later it can be changed, as there is still an internal payment service on our side".
- Event sourcing (ADR-007): usar EventStore y "Preferable start with SaaS solution to remove support and scale issues."
- Reporting: "There is no sense to build in-house reporting service, and the good option might be Apache Superset." Más tarde la hoja de costos usa Tableau ($278 por mes, 1 Creator + 5 Explorers).
- Mapas (ADR-015, Proposed): tabla de 4 proveedores con precios (OpenStreetMap gratis; TomTom 2.500 solicitudes gratis al día; MapBox 50.000 al día; Here 250.000 al mes) y elige Here. Gobernanza: "constant surveillance on the number of requests per month to avoid additional expenditure".

**Qué costo admitió.** ADR-003: "We will have to spend $15 USD and the price might increase in the future." `CostAnalysis.md`: "In rare cases we decided to pick more expensive solutions the reason for that was convenience of chosen service to exceed its monetary value." TCO a 1 año con tres escenarios (500, 1.000 y 10.000 solicitudes al día): 12.247,57; 12.548,17 y 22.480,57 USD.

**Qué enseña.** Primero se clasifica; luego, cada compra lleva un precio del lado del proveedor y el costo de no comprar medido en personas. Es el único ejemplo donde la alternativa "operarlo yo" tiene una cifra.

**Por qué este y no otro.** Pegasuz explica el criterio pero no pone cifras; ArchColider pone la cifra de operar. Combinados cubren "sabiendo qué cuesta cada lado".

**Detalles a no repetir sin cuidado.** (a) En ADR-003 la decisión dice "$15 USD per month" mientras el costo es por host; `CostAnalysis.md` usa 8 hosts ($120 al mes). (b) En la tabla resumen del TCO, la fila de DataDog muestra 3.336 USD y la de Tableau 1.440 USD; [DEDUCCIÓN] parecen intercambiadas (120 × 12 = 1.440 corresponde a DataDog y 278 × 12 = 3.336 a Tableau); los totales no cambian. (c) ADR-015: la tabla dice "Free for 250,000 requests monthly" y la decisión "first 25K requests were free". (d) ADR-010 (Feedback) tiene estado "Declined" aunque describe el uso de encuestas de terceros.

**Fuentes.** ArchColider: `4.ADRs/003 Tracing and Monitoring Sytem.md`, `009 Rely on payment service provider.md`, `007 Event sourcing usage.md`, `015 Integration with Map Providers.md`, `2.SolutionBackground/SolutionOverview.md`, `SystemAppoach.md`, `Tradeoffs.md`, `3.ViewsAndPerspectives/CostAnalysis.md`, `The Script.md`.

#### T2-C · Pragmatic (ClearView, 2024): comprar el modelo después de averiguar cuánto cuesta
**El caso.** ClearView es una plataforma de contratación que transforma el CV de cada candidato en una "story" anonimizada con un LLM para evitar decisiones sesgadas (`Requirements/Research/token-estimation.md`).

**La situación.** Cuatro usos de IA: consejos al CV, llenado automático de datos del empleado, CV a story, extracción de features. Supuestos escritos: A17 (hasta 250.000 vacantes al mes en EE. UU.; con 10 % de mercado, "25'000 openings per month and around the same number of active job candidates"), A20 (los LLM actuales serán superados pronto), A21 (el know-how es caro), A22 (respuestas de hasta 60 s), A23 (límites de tasa estrictos), A25: "When including testing, AI know-how, and operational cost, LLMs are the biggest technical cost driving factor for ClearView."

**Qué decidió y qué alternativas declaró (ADR-007, Accepted, 2024-09-26).**
- A: servicio externo (Azure, Google, OpenAI). Pros: poco costo de desarrollo, adaptación a nuevos modelos, tendencia a bajar de precio, salida rápida. Contras: "Expensive", límites de API, consideraciones regulatorias.
- B: LLM open-source propio en contenedor en la nube. Pros: hardware especializado como servicio, control del fine-tuning, menos consideraciones de privacidad. Contras: "Current LLMs will be surpassed soon due to fast evolving market. (A20)", más desarrollo y mantenimiento, alto costo de infraestructura.
- C: LLM open-source on-prem. Pros: privacidad y control. Contras: comprar hardware y contratar personal, retraso, electricidad.
- Decisión: A, más "an event-driven design for every LLM client in the system" para tolerancia a fallos e interoperabilidad.

**De dónde salen las cifras (entrevista con un experto en IA, parafraseada por el equipo).** "500'000 prompts resulted in a 500'000 USD bill"; el plan de capacidad reservada (PTU) más barato que conoce: "60'000 / month"; autoalojar en la nube "does not lead to a reduced cost compared to external"; "To get it cheaper, you need it on-prem, but then pay for maintenance-cost yourself." Estimación propia (`token-estimation.md`): unos 850 tokens de entrada y 1.400 de salida; mínimo 0,025 USD por prompt y respuesta con GPT-4o y 0,001 USD con GPT-4o mini.

**Qué costo admitió.** Consecuencias: "Need to somehow track rate to avoid surpassing rate-limit (currently not solved ..." (queda en "Known Limitations" del README). Características debilitadas: privacidad/factibilidad, tiempo de respuesta, observabilidad ("Fewer metrics about external system") y desplegabilidad ("High effort of testing and migrating to new LLMs"). El mismo ADR lista "-: Expensive." y luego "Cost is more predictable." [HUECO] no reconcilia las dos frases.

**Cómo cubre el riesgo de cambiar de modelo.** No con una fachada, sino con pruebas: el requisito Q14 ("Change of prompts or AI models need to work without significant decay of matching performance.") se atiende en ADR-025 con conjuntos de prueba. Admite el límite: la anonimización solo se verifica con humanos o con otros LLM.

**Qué enseña.** Medir en la unidad del proveedor (tokens) antes de comparar; que el motivo para comprar puede ser un riesgo de obsolescencia (los modelos duran 1 a 2 años según el experto), no solo el precio; que lo comprado deja un costo de migración que se paga en pruebas.

**Por qué este y no otro.** Tiene las cifras del lado proveedor más trazables (entrevista → supuesto → ADR) y conecta con el módulo de IA (R6). ConnectedAI complementa con costos medidos (abajo).

**Dato complementario (ConnectedAI, `6_test_cases/evaluation.md`).** Tabla medida con 3 modelos sobre un conjunto de prueba: GPT-4o-mini ~0,0003 USD, 0,3 de fidelidad (faithfulness), 0,8 de relevancia; Claude Sonnet 3.5 ~0,015 USD, 0,3 y 0,4; Gemini 1.5 Flash < 0,0001 USD, 0,0 y 0,8. Eligieron Sonnet "despite it's greater cost" por la experiencia en conversaciones de varios turnos. [DEDUCCIÓN] 0,015 / 0,0003 = 50 veces el costo por llamada de la opción más barata con la misma fidelidad en la tabla. Ellos mismos advierten que es un conjunto estrecho.

**Fuentes.** Pragmatic: `ADR/ADR-007-use-of-external-llms.md`, `ADR/ADR-025-ai-test-concept.md`, `Requirements/Research/interview-ai-expert.md`, `Requirements/Research/token-estimation.md`, `Requirements/requirements-and-assumptions.md`, `README.md` ("Known Limitations"). ConnectedAI: `6_test_cases/evaluation.md`, `4_adrs/002_adr_pre_trained_models.md`.

#### T2-D · Archangels (Farmacy Family, 2021): decidir qué es el núcleo y dejar la compra reversible
**El caso.** Plataforma de comunidad y datos médicos para la misma startup de comidas. Aclaración de la kata (`Clarifications.md`, 06): "Off The Shelf is an option if it meets the requirements. There are trade-offs with this."

**La situación.** ADR-006 (Under evaluation, 2021-10-27): una startup "has limited resources", debe enfocarse en dominios donde se diferencia. El núcleo es el dominio Medical (colaboración con profesionales) más el uso de analítica. "In all other domains ... good commercial or open source alternatives should be considered."

**Qué decidió.** COTS para Forums (sugiere Vanilla Forums, que además trae eventos comunitarios). ADR-010 (Confirmed): un producto estándar de alta seguridad para compartir registros médicos con terceros (sugiere Skyflow), "to avoid reinventing the wheel and the possibility of making mistakes". ADR-013 (Confirmed): el dominio Community se parte y expone interfaces de Classes, Forums y Events; "Interfaces mean it is easy to swap out functionality, e.g. change between home-grown and COTS options for e.g. Events."

**Qué costo admitió.** ADR-006: "Integrating with off-the-shelf or open source products can be a challenge." Riesgo: "None of the available off-the-shelf or open source products may be suitable." ADR-010: evaluar proveedores "may be time consuming". Sin cifras [HUECO].

**Qué enseña.** (1) Dentro del dominio núcleo se compra la parte que no diferencia (la seguridad del almacenamiento), no todo el dominio. (2) Una decisión de compra puede estar sin confirmar mientras la estructura (la interfaz) ya está decidida; la compra se vuelve reversible.

**Por qué este y no otro.** Pegasuz muestra el wrapper como mitigación posterior; Archangels lo usa para que el estado "Under evaluation" no bloquee el diseño.

**Fuentes.** Archangels: `4.ADRs/006-consider-buy-vs-build.md`, `010-We-will-use-a-secure-data-solution.md`, `013-We-will-split-community-domain.md`, `Clarifications.md`.

*Mención menor, CELUS Ceals ADR-005/006.* Elige SaaS "which doesn't increase the complexity of the platform with multiple dimensions", y admite que "there is no technical reason for choosing Wildlife Insights over TrapTragger". ADR-006 admite que el precio empresarial es "on-request" y su viabilidad económica "needs to be confirmed when scaling". [DEDUCCIÓN] La tabla `1.ProblemBackground/5.AnalysesOf3rdPartyTools.md` marca "Handle video" como no soportado para Wildlife Insights, y los requisitos hablan de fotos y video; el ADR no menciona esa limitación. Sirve como ejemplo de "costo desconocido admitido" y de "limitación visible en el análisis pero no en el ADR".

---

### T1 (empezar simple y escribir la condición de cambio)

#### T1-A · Five Nines (MobilityCorp, 2025): la escalera de visión con cuatro disparadores
**El caso.** MobilityCorp alquila scooters, bicicletas eléctricas, autos y furgonetas en Europa. Las fotos de devolución y de inspección se analizan con IA para cobrar daños y limpieza (FR#2M, FR#2L).

**La situación.** Requisitos: detectar 80 % de los daños con menos de 10 % de falsos positivos (FR#2M); NFR_9: precisión ≥ 85 % en daños, latencia ≤ 5 s (p95), costo "≤€0.10-0.15 per check", reentrenamiento automático "if <80% accuracy for 14 days". Un cobro injusto daña al cliente.

**Qué decidió (ADR-0020, daño; ADR-0014, limpieza).** Peldaño 1: Vertex AI AutoML Vision Object Detection. Peldaño 2: modelo propio (EfficientDet-D2 o YOLOv8-Medium) en Vertex AI. Se pasa al peldaño 2 si:
- "mAP < 0.75 after 3 months in production"
- "False positive rate > 10% consistently"
- latencia p95 por encima de 5 s de forma sostenida
- "Business feedback indicates unacceptable customer friction" (no medible)

Para limpieza (ADR-0014) el disparador es "(e.g., false positives >5%, precision/recall below thresholds)".

**Alternativas declaradas y por qué se descartaron (ADR-0020).** Solo AutoML sin escalada: "Lacks upgrade path if business KPIs are not met." Modelo propio desde el día uno: "Rejected: Premature optimization; staged approach reduces risk." Ensamble: complejidad no justificada "unless neither single approach meets KPIs". APIs listas (Tractable, Monk AI): "Rejected: Conflicts with ADR-0003 (Vertex AI platform) and ADR-0001 (GCP-first posture)." Dispositivo móvil: "Considered for future optimization if latency becomes critical."

**Qué costo admitió.** AutoML: control limitado, "May plateau at ~75% mAP". Propio: "more ML expertise and ops overhead; longer time-to-value" (ADR-0014). Sin cifras de dinero para ningún peldaño [HUECO]. Pide mínimo 10.000 imágenes etiquetadas por categoría de daño; [DEDUCCIÓN] con 7 categorías listadas son 70.000 imágenes, y el ADR no lo suma ni lo cuesta.

**La pieza que hace posible el cambio.** "All models (AutoML or custom) must output standardized JSON", con campo `model_version`. El contrato de salida no cambia entre peldaños; solo cambia lo que hay detrás.

**Qué enseña.** Una condición de cambio completa tiene métrica, umbral, ventana de tiempo y decisión siguiente; y viene con un contrato que mantiene estable lo que consume el resto del sistema.

**Observaciones sobre el propio ADR [DEDUCCIÓN, de dos pasajes del mismo documento].** El umbral de escalada (mAP < 0,75) coincide con el nivel en que el ADR dice que AutoML puede estancarse (~75 % mAP). Los valores 5 %, 10 %, 0,75 y 3 meses no se derivan de ningún dato del repo [HUECO].

**Fuentes.** Five Nines: `adrs/ADR-0020 - Damage Detection Model Architecture.md`, `ADR-0014 - ML Model Selection for Cleanliness Assessment.md`, `requirements/3_NFRs.md`.

#### T1-B · Five Nines ADR-0022 (y ADR-0021): pronóstico de demanda, de lo simple a lo complejo con compuertas
**El caso.** Pronóstico de demanda por zona y tipo de vehículo para reposicionar flota (FR#2G/2H), con objetivo de utilización de 70 %.

**Qué decidió.** Peldaño 1: Prophet (estadístico, interpretable), con una instancia por tipo de vehículo (30 días de entrenamiento para scooters y bicicletas, 90 para autos y furgonetas); ARIMA/SARIMA como respaldo. Objetivo: "24h MAPE ≤25% (threshold for Phase 2 escalation: >30% for 4 consecutive weeks)". Peldaño 2: LightGBM/XGBoost, LSTM/GRU o Temporal Fusion Transformer si el estadístico se estanca ("Prophet/ARIMA MAPE consistently >30% for 24h forecasts (for any vehicle type)").

**Compuertas para promover un modelo nuevo.** "New model must outperform champion by ≥5% MAPE reduction"; backtesting de las últimas 4 semanas; "Shadow deployment for 1 week before full promotion". Monitoreo: "Alert if MAPE degrades >10% from baseline over 7-day window".

**Alternativas descartadas con su propia condición.** LSTM: "Consider only if booking history >2 years and clear sequential patterns exist." TFT: "Future consideration if demand forecasting becomes core business differentiator." (una condición de negocio, no técnica). Modelos separados por vehículo vs. uno solo: "Start with Option A; consider Option B if cross-vehicle patterns emerge". APIs de terceros (AWS Forecast, Azure AutoML): "Rejected in favor of Vertex AI native approach."

**ADR-0021 (carga de baterías).** Descarta el modelo profundo: "Provides slightly better accuracy but unnecessary operational complexity for this use case. Too expensive." Sin cifras.

**Qué costo admitió.** Tabla de riesgos con 11 filas; el costo de Vertex AI/BigQuery aparece como riesgo ("4 vehicle types × many zones") sin cifras [HUECO].

**Inconsistencia a tener presente.** El umbral aparece en cuatro formas: más de 30 % durante 4 semanas consecutivas (objetivos), "consistently >30%" (condiciones de Fase 2), "MAPE >30%" (tabla de riesgos) y "if accuracy targets (NFR_9: 75-80% forecasting accuracy) are not met" (conclusión). Solo la primera tiene ventana.

**Qué enseña.** La compuerta de promoción (cuánto mejor tiene que ser el modelo nuevo y cómo se prueba) es el otro lado del disparador: la escalera sube solo si el peldaño nuevo pasa.

**Por qué esta pareja (A y B) y no otro caso.** Es el único conjunto del corpus con métricas, umbrales, ventanas y compuertas en más de un ADR del mismo caso. Es evidencia de IA; para estilos de arquitectura ver T1-C y T1-D.

**Fuentes.** Five Nines: `adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md`, `ADR-0021 - Simple ML model for charging advice.md`.

#### T1-C · ArchColider: monolito modular y cómo prepararse para extraer
**El caso.** El mismo startup de T2-B.

**La situación y la decisión (ADR-002, Accepted, 2020-10-29).** Matriz de 4 opciones (monolito, microservicios, micro-kernel, monolito modularizado) contra 10 atributos con símbolos de ++ a --. El monolito modularizado: despliegue ++, rendimiento ++, seguridad ++, disponibilidad -, autonomía +, modificabilidad +, mantenibilidad +, integridad +, escalabilidad +. Decisión: "modularized monolith is the best option for now. At the same time it opens the possibility to migrate to microservices when needed."

**Qué descartó y por qué.** "Microservices from the start" requiere atención a infraestructura y "preferably a stable and known domain model. For the ordering system it's not applicable"; y "Microservices should grow naturally as the need arises." El monolito puro "would be oversimplification".

**Qué dejó escrito para extraer.**
- Condición: "The decision about extracting modules should be made based on metrics and trends that some modules have higher pressure than others." Antes, escalar verticalmente ("preferred way ... during the first months, years"); horizontal cuando eso no alcance.
- Preparación: los módulos se hablan con comandos y eventos como si hubiera red; seguridad zero trust entre módulos (ADR-006); fachadas entre módulos.
- Cómo conseguir las métricas: health checks por servicio (ADR-004, Accepted) con "business health checks" que envían un mensaje de prueba por un escenario crítico y miden corrección y duración; "we can proactively plan extraction of functionality and scaling cloud instances based on facts."

**Qué costo admitió.** ADR-002: "Extra care and discipline should be applied for inter module communication", porque si no será un monolito con tendencia al "big ball of mud". ADR-004: los mensajes de prueba exigen código y "increases cognitive complexity".

**Qué enseña.** Cuando no se puede poner un número, se escribe qué se va a medir, de dónde sale la medida y qué se dejó preparado para que extraer cueste poco.

**Qué NO hay [HUECO].** Ningún valor que diga cuándo extraer. [DEDUCCIÓN] Los escenarios de costo (500, 1.000 y 10.000 solicitudes al día; 8 y 16 instancias EC2) no están enlazados a ninguna decisión de extraer. Y "disciplina" aparece donde una regla automática sobre dependencias entre módulos sería comprobable.

**Fuentes.** ArchColider: `4.ADRs/002 System approach.md`, `004 Health check endpoints.md`, `006 Zero trust architecture.md`, `2.SolutionBackground/SystemAppoach.md`, `The Script.md`.

#### T1-D · Pegasuz ADR-007 y Team 7: cómo se ve un disparador cualitativo
**Pegasuz (ADR-007, Proposed).** Dos alternativas (monolito modular, microservicios) en una tabla Low/High de 5 criterios (costo, mantenimiento, acoplamiento, escalabilidad, extensibilidad). Decisión condicional: monolito modular "if there is a cost constraint"; migrar a microservicios + event-driven "after there is a product market fit and a system required to scale"; sin restricción de costo, microservicios desde el inicio. `README.md` fija el orden: el módulo NPO-Candidate es monolito modular en el MVP y se migra en el largo plazo; el MVP debe "be sufficient for the business to get market feedback and pivot, if needed". Costo de la opción compleja (`quanta/npo-candidate.md`): "Event driven + microservices is a costly architecture." Su mitigación: "this should not be a concern" por los avances de DevOps [HUECO: sin fuente].

**Team 7 (kata de migración; ADR-1 y "Transition Architecture", todos los ADR en Proposed).** Estilo service-based como "a good starting point in evolutionary migration from a monolith to a highly distributed architecture", hacia microservicios "if a new scalability level will become necessary". Transición en dos fases: resolver lo crítico y "stick with a monolithic database until it becomes a bottleneck"; luego partir la base. Lista los riesgos de la fase intermedia (rendimiento de la BD monolítica, gateway único como punto de falla, acceso del personal a datos de tarjeta).

**Qué enseñan.** Que product market fit, un nuevo nivel de escalabilidad y un cuello de botella son condiciones que nadie puede comprobar sin medir; contrastan con T1-A. También que la condición cualitativa sí permite ordenar las fases y listar los riesgos de la intermedia.

**Fuentes.** Pegasuz: `ADRs/007.adr-arch-style-np-candidate-mvp.md`, `README.md` ("Platform Roadmap"), `quanta/npo-candidate.md`. Team 7: `ADR/ADR-1-service-based.md`, `README.md`.

---

### T12 (fitness functions)

#### T12-A · BluzBrothers (MonitorMe, 2024): una meta de 1 segundo convertida en un presupuesto por etapa
**El caso.** MonitorMe es un sistema de monitoreo de signos vitales en un hospital (sensores → recorder/streamer → estación de enfermería).

**La regla.** `README.md`, tabla "Fitness functions": "Infrastructure validation", objetivo: cumplir "an average response time of 1 second or less for displaying vital signs" (característica: rendimiento; resultado: Success). Otras dos: "Guarantee to receive alert" (disponibilidad) y "Fail-over" (disponibilidad, tolerancia a fallos).

**El cálculo (`FitnessFunctions/Sizing.md`).** Señales por segundo y paciente: 8 sensores suman 4,22 (frecuencia cardíaca 2; respiración 1; ECG 1; oxígeno 0,2; etc.). Hasta 500 pacientes: promedio 2.100 señales/s (2,1 MB/s) y pico 4.000/s (8 × 500; 4 MB/s con 1 kB por señal). Presupuesto por etapa:

| Etapa | Tiempo |
|---|---|
| Vital Sign Recorder | 320 ms |
| Vital Sign Streamer | 320 ms |
| Guardar en BD | 16 ms |
| Enviar a la plataforma de streaming | 5 ms |
| Red local (LAN) | 32 ms |
| **Total** | **693 ms** |

La BD sale de un benchmark ("Influx DB can save at least 237871 events/s" → 4.000 eventos/s caben en 16 ms); Kafka, de un benchmark de AWS; la LAN, de 1 Gb/s; Streamer y Recorder, de 3 instancias, 25 estaciones, 2 ms por señal. `Failover.md` recorre el flujo de datos para ver qué pasa si falla un sensor y qué componente reacciona (el Logic Processor con reglas para datos ausentes o viejos).

**Qué costo / límite admite.** Para el cálculo eligieron InfluxDB, pero "the final decision which database to use, will be taken later". Es un cálculo con benchmarks de terceros, no una prueba.

**Qué enseña.** Una característica ("rendimiento") se convierte en una meta con número (1 s), se reparte en etapas con fuente y se suma contra la meta; cada etapa es una regla que se puede volver a comprobar si cambia el diseño.

**Por qué este y no otro.** Es el único caso con regla, cálculo y resultado en el mismo repo. [DEDUCCIÓN] Hay detalles a no mostrar sin revisar: la tabla de pasos suma Recorder y Streamer en serie y el repo no dice si corren en paralelo [HUECO]; el paso de Kafka es 4 ms en el texto y 5 ms en la tabla; el cálculo del Streamer usa 8 señales por paciente y segundo (el valor de pico), no 4,22.

**Fuentes.** BluzBrothers: `README.md`, `FitnessFunctions/Sizing.md`, `Failover.md`, `Alerts.md`.

#### T12-B · ArchColider: el monitoreo y la infraestructura como código como reglas
**La regla escrita.** ADR-003: el monitoreo "should support business decisions and should act architecture fitness functions". `The Script.md`: "All decisions about extracting or scaling services are based on facts. Metrics trend analysis should be used as fitness functions." ADR-016 (Draft) propone infraestructura como código para correr las reglas "on the specification instead of the run-time environment", con el ejemplo "accidentally added a public IP to a machine" como desviación que se quiere detectar, con detección de drift y alertas.

**Qué costo admitió.** ADR-016: "The team will lose the ability to make ad-hoc changes without causing drift." ADR-004: mensajes de prueba en el código.

**Qué enseña.** La regla más concreta del corpus (un servidor no debe tener IP pública) es comprobable sobre la plantilla antes de desplegar, y las métricas de negocio (duración y corrección de un escenario crítico) pueden ser la regla que decide una extracción.

**Límites.** ADR-003 es Proposed y ADR-016 es Draft; ninguno tiene umbrales. [DEDUCCIÓN] El ejemplo de la IP pública es hipotético, no una regla que el repo declare para su propio sistema.

**Fuentes.** ArchColider: `4.ADRs/003 ...`, `004 ...`, `016 Use of Infrastructure as Code.md`, `The Script.md`.

#### T12-C · Five Nines: reglas que actúan sin intervención, especificadas en los ADR
**Qué hay escrito.** El repo no usa la expresión "fitness function" [DATO: búsqueda sin resultados], pero define reglas con métrica, umbral y acción automática:
- Promoción de modelos: ≥5 % de reducción de MAPE contra el campeón, backtesting de 4 semanas, 1 semana en sombra (ADR-0022); "Evaluation gates per ADR-0011 before production promotion" (ADR-0020).
- Alertas: MAPE que se degrada más de 10 % en 7 días (ADR-0022); "drift detection alerts (mAP drop >5%)" y reentrenamiento trimestral (ADR-0020).
- Reentrenamiento: NFR_9, "Auto-retraining if <80% accuracy for 14 days".
- Reglas de ejecución: bandas de confianza 85 % / 70 % que mandan la foto a revisión humana; en limpieza, la baja confianza queda por defecto en "Acceptable (customer benefit)" (ADR-0014).
- Portabilidad: "Vendor abstraction layer (<2 week migration)" (NFR_9), una regla con número sobre el costo de salir de un proveedor.

**Qué costo / límite.** ADR-0011 cierra con que se hará un piloto para "Define adaptive rubrics and gating policies": las políticas de compuerta todavía no están definidas. Entre sus riesgos figura la sobreautomatización: "Metrics alone may not reflect business quality".

**Qué enseña.** Una regla que "se verifica sola" necesita métrica, umbral, ventana y la acción que dispara (bloquear, alertar, reentrenar); la regla de portabilidad (< 2 semanas) es la única del corpus que mide el costo de cambiar de proveedor.

**Fuentes.** Five Nines: `adrs/ADR-0011 - Model Evaluation Flow using Vertex AI.md`, `ADR-0014`, `ADR-0020`, `ADR-0022`, `requirements/3_NFRs.md`.

#### T12-D · Archangels y ZAItects: reglas escritas que todavía no están automatizadas
**Archangels (`1.ProblemBackground/ArchitectureAnalysis.md`, "Architectural Governance").** Plantea que cumplir las decisiones de arquitectura "is often forgotten and not even included in the acceptance criteria in a user story". Las fitness functions "will be implemented"; un incumplimiento se corrige "in the same way as a failing test" o, si hay buena razón, se registra la decisión en un ADR y se actualiza la función. Opciones: CloudWatch, Kibana o funciones Lambda propias. El paso siguiente figura sin marcar: "Investigate options for Fitness Functions". Es el único lugar del corpus que ata la regla al ADR: si se rompe la regla, se arregla el sistema o se cambia el ADR y la regla.

**ZAItects (`other_design_docs/fitness-functions.md`).** Ocho funciones sobre el sistema de certificación: precisión de la evaluación, equidad de las notas, balance de dificultad de preguntas, escalabilidad, eficiencia, precisión de la calificación por IA (comparada con el cambio que hace un experto), credibilidad y costo (frente a la calificación manual). Todas con puntaje de 0 a 1 y la misma meta en el resumen ("Score close to 1"). [DEDUCCIÓN] Ninguna dice a partir de qué valor se actúa; la numeración repite el 7.

**Qué enseña.** Dos formas de escribirlas y lo que les falta para ser reglas que se verifican solas (umbral y acción), más el vínculo con el ADR.

**Fuentes.** Archangels: `1.ProblemBackground/ArchitectureAnalysis.md`. ZAItects: `other_design_docs/fitness-functions.md`.

---

## 4. Decisiones contrarias

| Eje | Repo y decisión | La razón válida que declara | De qué depende la verdad |
|---|---|---|---|
| Construir lo que otros compran | **ConnectedAI** ADR-003 (Accepted): API gateway propio, descartando Apigee y Kong | "Avoids unnecessary costs and overhead associated with off-the-shelf solutions." Admite: "Higher development and maintenance costs compared to off-the-shelf solutions." | Sin cifras en ninguno de los dos lados. [DEDUCCIÓN] El C2 describe el gateway como algo que "validates user sessions and forwards requests to backend services". Pegasuz y ArchColider compran piezas equivalentes. |
| Operar uno mismo por costo | **Data Alchemists** ADR-14/15 (Proposed): MongoDB y Kafka en Kubernetes | "Self-management within Kubernetes enables us to control costs while ensuring robust database performance and availability." | Contrasta con ArchColider (DataDog por el tiempo del desarrollador). El repo no pone cifras ni lista alternativa gestionada. [DEDUCCIÓN] Con 99,99 % de disponibilidad (5 minutos al mes) y 2 millones de usuarios activos por semana, no se compara la carga de operar los clústeres contra ese presupuesto. La kata respondió "If it works for the solution." a si se aceptan servicios gestionados. |
| Misma categoría, respuesta opuesta | **Five Nines** ADR-0013 compra un SaaS de MoCoP (menos carga operativa, residencia de datos en la UE verificada) frente a **ConnectedAI** ADR-007 (Accepted) que aloja Langfuse por sí mismo ("maintaining control over sensitive data and reducing operational costs") | Datos sensibles y costo (ConnectedAI) frente a plazo y operación mínima (Five Nines) | Depende de qué pesa más: control de datos y costo, o tiempo de salida y carga operativa. ConnectedAI admite: "Requires additional development effort to deploy and maintain a local instance." |
| LLM externo vs. propio | **ZAItects** ADR-007 (Accepted): híbrido, datos sensibles procesados on-prem; **Pragmatic** ADR-007: todo externo | ZAItects: datos de candidatos y cumplimiento GDPR/DPDP. Pragmatic: costo de hardware y personal, obsolescencia de modelos (1 a 2 años) | Depende de la sensibilidad de los datos. Pragmatic deja el requisito de privacidad como riesgo ("Need to check privacy regulations"). |
| Comprar vs. cumplir uno mismo | **Team 7**: guarda las tarjetas y aísla el billing por PCI (ASM-4, supuesto) | No explicada: es un supuesto, no una comparación | ArchColider ADR-009 compra la pasarela. Team 7 no compara (kata de migración con un sistema existente). |
| Comprar la plataforma, no la pieza | **Five Nines** descarta APIs especializadas (Tractable, AWS Forecast) y adopta la plataforma gestionada | Coherencia con ADR-0001/0003 y lock-in de datos | "Lock-in" cuenta en ambos lados: lo mismo se usa para rechazar al tercero y se lista como riesgo de la plataforma elegida. |
| Estilo complejo desde el inicio | **CELUS Ceals** ADR-007 (microservicios, 20 frente a 15 y 8); **monArch** ADR-01; **Data Alchemists** ADR-1; **Five Nines** (microservicios en Cloud Run) | Escalabilidad, elasticidad, extensibilidad con carga alta (15 millones de usuarios en Data Alchemists; 50.000 MAU estimados en monArch) | T1a depende de si el equipo puede pagar el costo operativo del estilo complejo y de cuánto cambia el dominio. CELUS admite: "Implementation is a harder because it lacks simplicity." |
| Reglas no automatizables | **monArch**: "it is difficult to test a system for extensibilty" | Hay cualidades sin regla medible | T12 se limita a las características que admiten una medida. |

No encontré ningún repo que sostenga lo contrario de T12 (que las reglas de arquitectura no valgan la pena).

---

## 5. Límites

1. **Ningún repo construyó ni operó el sistema.** Son diseños en papel que juzgó un jurado. Ningún disparador se activó, ningún costo se midió en producción y ninguna fitness function se ejecutó.
2. **Muchas decisiones no están cerradas.** Proposed: Pegasuz 007; ArchColider 003, 006, 007, 009, 015; Data Alchemists 14, 15; monArch ADR-01; Team 7 (todos los citados). Draft: ArchColider 016. Under evaluation: Archangels 006. Open (decisión vacía): Pragmatic 022. Five Nines no tiene campo de estado.
3. **Los disparadores medibles son de un solo repo y de un solo tipo de cambio** (modelos de IA en Five Nines). No hay ejemplo medible de monolito → servicios ni de "operar uno mismo → comprar" (o al revés). El único plazo de revisión es el de ADR-0013 (12 meses), y es calendario, no métrica.
4. **Los umbrales de Five Nines no se justifican.** No hay datos, benchmarks ni cuenta que expliquen 5 %, 10 %, 30 %, 0,75, 3 meses o 4 semanas.
5. **El lado "construir" casi nunca tiene cifra.** Solo ArchColider lo cuantifica (0,2 a 0,5 de un desarrollador); Pragmatic y ZAItects lo mencionan sin valor (ZAItects dice que incluye "build costs" en el análisis, pero no los pone).
6. **Las fachadas se mencionan y no se muestran.** Ninguno publica la interfaz del wrapper. La excepción es el contrato de salida JSON de Five Nines (ADR-0020/0022) y la regla "< 2 semanas de migración". No se puede afirmar que una fachada funcione ni cuánto cuesta mantenerla.
7. **No hay fitness functions ejecutables** (0 resultados al buscar ArchUnit, NetArchTest, dependency-cruiser, quality gate) **ni reglas estructurales** (dependencias entre módulos). No se puede enseñar "cómo se escribe el test" con este corpus. Se puede enseñar cómo se escribe la regla y qué le falta para automatizarse.
8. **El vocabulario viene del libro.** monArch cita *Building Evolutionary Architectures* en sus referencias; el término "fitness function" puede ser vocabulario de ese método y no un hallazgo independiente de cada equipo [DEDUCCIÓN: otros repos no citan el libro].
9. **Las cifras de precios son de los equipos** y de la fecha de cada kata. No las verifiqué con los proveedores. ZAItects atribuye sus precios por token a un modelo concreto sin fuente.
10. **Inconsistencias internas** (ver cada ejemplo): ArchColider (TCO y DataDog/Tableau; 250K frente a 25K en Maps), ZAItects (`cost-analysis.md` dice que el costo de expertos a 10x "exceed $1M" y su tabla da $940.000), Pragmatic ("Expensive" y "Cost is more predictable"), Pegasuz (documentos sobre PII y sobre qué se compra), Five Nines (varios ADR hablan de un Model Control Plane distinto: ADR-0005 "cloud-based", ADR-0013 SaaS que descarta la opción nativa de la nube, y ADR-0010 adopta Vertex AI Agent Builder como capa de orquestación; no se reconcilian).

---

## 6. Para elegir el elenco

| | Pragmatic | Five Nines | Mejor otro |
|---|---|---|---|
| **T2** comprar/operar | **Fuerte** en IA: opciones A/B/C, entrevista, estimación en tokens, riesgos de obsolescencia y límites de tasa. Además externaliza encuestas (ADR-020). Sin fachada (tests en su lugar) y sin cifra del lado "propio". | **Media**: ADR-0013 (SaaS) y rechazo de APIs de terceros por coherencia de plataforma; lock-in en 14 de 22 ADR con mitigación genérica; una regla medible de portabilidad (< 2 semanas). Sin precios de proveedor. | **ArchColider** (clases Core/Supportive/Generic, fachada de pagos, cuentas de ambos lados, TCO) y **Pegasuz** (criterio escrito como preguntas, tabla de 3 opciones, wrapper). ConnectedAI aporta costos medidos por modelo. |
| **T1** empezar simple + disparador | **Débil**: ADR-017 (condición cualitativa), ADR-021 (pospuesto), ADR-022 (vacío). | **La mejor para el disparador medible**: ADR-0014/0020/0022 (escaleras con métrica, umbral y ventana, más compuertas de promoción). Solo en IA; el estilo es microservicios desde el inicio. | **ArchColider** para el monolito modular y cómo prepararse (sin números); **Pegasuz** y **Team 7** para disparadores cualitativos. |
| **T12** reglas | **Casi nada**: ADR-025 (conjuntos de prueba de IA). | **Media**: umbrales de promoción, alerta y reentrenamiento, más la regla de portabilidad. No las llama fitness functions. | **BluzBrothers** (3 reglas con cálculo y resultado) para el ejemplo más completo; **ArchColider** y **Archangels** para el vínculo con ADR y la regla "como un test que falla". |

Para este resultado de aprendizaje (R5) con una sola columna de caso principal:
- **Five Nines cubre mejor R5** como hilo: T1 (todos sus peldaños), una parte de T2 y una parte de T12. Conecta con el módulo de IA.
- **Pragmatic cubre T2 muy bien** en su parte de IA, pero casi no cubre T1 ni T12; solo serviría como caso principal de R5 acompañado de otros.
- **Ninguno de los dos cubre T2 "core vs. generic"** con cifras en ambos lados ni T12 con un cálculo: faltan ArchColider (T2 y la intención de T12) y BluzBrothers (T12). Son tres o cuatro apariciones puntuales, no casos de hilo.

---

## 7. Términos que hay que explicar

- **Build vs. buy:** decidir si una pieza se desarrolla en casa o se adquiere hecha (producto, servicio, librería).
- **COTS (commercial off-the-shelf):** producto comercial que se usa tal cual, con poca o ninguna modificación.
- **SaaS:** software que se usa como servicio, alojado y operado por el proveedor, normalmente con cuota mensual.
- **Operarlo uno mismo (self-hosted / self-managed):** instalar y mantener el software en infraestructura propia; se paga en tiempo de personas.
- **Dominio núcleo, de apoyo y genérico (Core, Supportive, Generic):** el núcleo es lo que diferencia al negocio; el de apoyo ayuda pero no diferencia; el genérico lo resuelve igual cualquier empresa.
- **Wrapper / fachada / adaptador:** capa propia que esconde al proveedor detrás de una interfaz, para cambiarlo sin tocar el resto.
- **Vendor lock-in:** quedar atado a un proveedor porque salir cuesta mucho.
- **Greenfield / MVP / product-market fit:** proyecto desde cero; versión mínima para probar la idea; momento en que hay evidencia de que el producto sirve a un mercado.
- **Monolito modular:** una sola aplicación desplegada junta, pero dividida por dentro en módulos con fronteras claras.
- **Extraer un módulo:** sacarlo del monolito y desplegarlo como servicio propio.
- **Escalar vertical y horizontalmente:** más potencia en la misma máquina, o más máquinas.
- **Disparador (trigger) de cambio:** condición escrita que, al cumplirse, obliga a pasar al siguiente peldaño.
- **Escalera de decisión (staged approach):** empezar con la opción simple y reservar la compleja para cuando el disparador se cumpla.
- **ADR y estados (Proposed, Accepted, Draft, Under evaluation, Superseded):** registro de una decisión; el estado dice cuán firme es.
- **Fitness function:** regla con valor medible que comprueba una característica de la arquitectura; se puede ejecutar a mano o en automático.
- **Característica de arquitectura:** cualidad como rendimiento o disponibilidad que el sistema debe tener.
- **CI/CD:** conjunto automático de pasos que compila, prueba y despliega cada cambio.
- **Quality gate / compuerta:** condición que un cambio debe cumplir para pasar al siguiente paso.
- **Infraestructura como código (IaC) y drift:** describir la infraestructura en archivos; el drift es la diferencia entre lo escrito y lo que realmente existe.
- **Health check y heartbeat:** consulta o señal periódica que dice si un servicio está vivo; un "business health check" prueba además un escenario de negocio.
- **TCO:** costo total de tener algo funcionando durante un periodo.
- **Token:** unidad en que los LLM cuentan y cobran el texto de entrada y de salida.
- **Rate limit, PTU:** tope de uso que impone el proveedor; PTU es capacidad reservada con tarifa fija.
- **Modelo gestionado vs. modelo propio (AutoML vs. modelo a medida):** el primero se entrena y se sirve con herramientas del proveedor con poca configuración; el segundo se diseña y se opera en casa.
- **mAP, MAPE, falsos positivos:** mAP mide qué tan bien un modelo detecta y localiza objetos; MAPE es el error porcentual medio de un pronóstico; falso positivo es una alarma sobre algo que no ocurrió.
- **Campeón y retador (champion/challenger), shadow deployment:** comparar el modelo en uso con uno nuevo; probar el nuevo en paralelo sin que decida nada.
- **Human-in-the-loop y bandas de confianza:** una persona revisa los casos en que el modelo no está seguro, según umbrales de confianza.
- **Deriva (drift) del modelo:** el modelo rinde peor con el tiempo porque los datos cambian.
- **SLA / SLO / p95:** compromiso de nivel de servicio; objetivo medible; el valor bajo el cual queda el 95 % de las mediciones.

---

## 8. Qué se puede mostrar en pantalla

| Visual | Contenido | Fuente |
|---|---|---|
| Las 6 preguntas de compra | "How close to the core value proposition...?", competitive advantage, simplicity, fastest go-live, team competency, cost of building and buying | Pegasuz: `ADRs/003.adr-build-vs-buy.md` |
| Tabla de identidad, 3 opciones × 4 criterios | Very high / low / low; Build + maintain / maintain / pay as you go; etc. | Pegasuz: `ADRs/009.adr-idp.md` |
| Lista "Characteristics that we do not need as we offloaded" | Security, Scalability, Availability, Responsiveness | Pegasuz: `quanta/chat.md` |
| Mapa Core / Supportive / Generic | Meal Catalog, Ordering, Loyalty / Feedback, Scheduling / Reporting, Payments | ArchColider: `2.SolutionBackground/SolutionOverview.md` |
| Cuatro opciones de monitoreo con precio y la frase de 0,2 a 0,5 de un desarrollador | DataDog $15 por host y mes; Grafana y ELK gratuitos; CloudWatch $0,30 | ArchColider: `4.ADRs/003 Tracing and Monitoring Sytem.md` |
| TCO a 3 escenarios | 12.247,57 / 12.548,17 / 22.480,57 USD al año (500, 1.000, 10.000 solicitudes al día) | ArchColider: `3.ViewsAndPerspectives/CostAnalysis.md` (revisar la fila DataDog/Tableau antes de mostrarla) |
| Matriz de 4 estilos × 10 atributos | ++ / + / O / - / -- | ArchColider: `4.ADRs/002 System approach.md` |
| Tres opciones de LLM con pros y contras | Externo / open-source en nube / on-prem | Pragmatic: `ADR/ADR-007-use-of-external-llms.md` |
| Cifras de la entrevista | 500.000 prompts → 500.000 USD; PTU de 60.000 al mes; 0,025 y 0,001 USD por prompt | Pragmatic: `Requirements/Research/interview-ai-expert.md`, `token-estimation.md` |
| Tabla medida de 3 modelos | Costo, tiempo, fidelidad y relevancia | ConnectedAI: `6_test_cases/evaluation.md` |
| Escalera con disparadores (diagrama de 2 peldaños y las 4 condiciones) | AutoML → EfficientDet/YOLO si mAP < 0,75 a los 3 meses, FP > 10 %, p95 > 5 s | Five Nines: `adrs/ADR-0020 - Damage Detection Model Architecture.md` |
| Escalera de pronóstico con compuertas | MAPE ≤ 25 %; > 30 % durante 4 semanas; ≥ 5 % de mejora; 1 semana en sombra; alerta si empeora > 10 % en 7 días | Five Nines: `adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md` |
| JSON de salida común | `predictions`, `confidence`, `bounding_box`, `model_version` | Five Nines: `ADR-0020` |
| Reglas con número en los requisitos no funcionales | "Vendor abstraction layer (<2 week migration)", "Auto-retraining if <80% accuracy for 14 days" | Five Nines: `requirements/3_NFRs.md` |
| Presupuesto de 693 ms | Tabla de etapas (320 + 320 + 16 + 5 + 32) frente a la meta de 1 s | BluzBrothers: `FitnessFunctions/Sizing.md` |
| Tabla de las 3 fitness functions con "Success" | Rendimiento, disponibilidad, tolerancia a fallos | BluzBrothers: `README.md` |
| Regla de gobernanza | "in the same way as a failing test" y las 3 opciones de implementación | Archangels: `1.ProblemBackground/ArchitectureAnalysis.md` |
| Las 8 fitness functions de ZAItects en una tabla | Objetivo, definición, puntaje 0 a 1 | ZAItects: `other_design_docs/fitness-functions.md` |
| Condiciones cualitativas lado a lado | "after there is a product market fit and a system required to scale" (Pegasuz) / "until it becomes a bottleneck" (Team 7) / "metrics and trends" (ArchColider) frente a la condición con número de Five Nines | Pegasuz ADR-007; Team 7 `README.md`; ArchColider `SystemAppoach.md`; Five Nines ADR-0020 |
