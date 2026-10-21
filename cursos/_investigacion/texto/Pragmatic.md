# Pragmatic · investigación fase 1 (texto)

Rutas relativas a `katas-src/Pragmatic/`. Archivos de texto leídos: 39 (README, `.gitignore`, 24 archivos en `ADR/` incluida la plantilla, 4 en `Requirements/`, `ArchitectureCharacteristics/Characteristics.md`, `EventStorming/event_storming.md`, 6 en `C4/`, `UseCases/use-case-upload-a-resume.md`).

## 1. El caso

[DATO] El cliente es el Diversity Cyber Council, una organización sin fines de lucro que ayuda a grupos subrepresentados en la industria tecnológica con educación, colocación y formación (README.md:28-29). [DATO] Su programa ClearView quiere usar IA para emparejar candidatos con puestos abiertos a partir de currículums anonimizados (README.md:31-32). [DATO] Tres objetivos: plataforma de emparejamiento con IA que reduzca el sesgo, análisis de disparidades entre contratados y no contratados con métricas y encuestas, e integración con los sistemas de RR. HH. de los empleadores (README.md:53, 66-67, 74-75). [DATO] Restricciones que el equipo declara: el Council se financia con donaciones y tiene recursos financieros y de desarrolladores limitados (ArchitectureCharacteristics/Characteristics.md:53-54); los LLM son caros, de costo difícil de predecir, con límites de tasa y ciclos de vida cortos (README.md:43-46); el sesgo de los LLM no debe filtrarse al emparejamiento (README.md:45-46). [DATO] Cifras de tamaño, todas supuestas por el equipo: 25.000 puestos al mes y un número parecido de candidatos activos (A17, Requirements/requirements-and-assumptions.md:95-97); unos 100 sistemas de RR. HH. distintos (A29, :109); 100.000 empleadores de TI (A30, :110); hasta 200.000 configuraciones de sistemas de RR. HH. (A31 y Q16, :77, :111-112); respuestas de LLM de hasta 60 s (A22, :102). [HUECO] El enunciado original de la kata no está en el repositorio; los requisitos "Given and implied" se presentan como derivados de él (Requirements/requirements-and-assumptions.md:16, 57).

## 2. Qué entregó el equipo

- `README.md`: índice, equipo, introducción, objetivos con los ADR que los cubren, top 3 de características, estilo, C4 y limitaciones conocidas (README.md:1-209).
- `Requirements/requirements-and-assumptions.md`: requisitos funcionales (R), cualitativos (Q) y supuestos (A) numerados, con la regla de no renumerar al borrar (:3-7).
- `Requirements/glossary.md`: glosario de 16 términos (Story, Features, Human-readable features, Match, Score, Token...) (:5-20).
- `Requirements/Research/interview-ai-expert.md`: entrevista parafraseada con un experto en IA, Dario Röthlisberger, que alimenta supuestos (:4-7).
- `Requirements/Research/token-estimation.md`: estimación de tokens y precio de un prompt de ejemplo para generar una Story (:1-45).
- `ArchitectureCharacteristics/Characteristics.md`: 12 características candidatas, 7 elegidas, top 3 (feasibility, interoperability, testability) (:7-50).
- `EventStorming/event_storming.md`: resumen del taller de Event Storming en dos iteraciones (física y digital) (:1-77).
- `ADR/`: 23 ADR numerados entre 001 y 025 más la plantilla ADR-000; faltan los números 012 y 013 (listado de `ADR/`).
- `C4/`: un C1, un C2 y cuatro C3 (Job Candidate, Story, Matching, HR Integration), cada uno con texto de flujo de datos.
- `UseCases/use-case-upload-a-resume.md`: caso de uso "subir y enviar un currículum" con dos diagramas de secuencia (:1-48).

Cuentas: [DATO] requisitos funcionales numerados R1-R32 con huecos y R30 repetido (Requirements/requirements-and-assumptions.md:17-53); cualitativos Q1-Q16 con huecos y Q3 repetido (:58-77); supuestos A1-A31 con huecos (:80-112). [DEDUCCIÓN, contando las líneas] 33 entradas R (R30 aparece dos veces, con contenidos distintos, :40 y :53), 15 entradas Q, 28 entradas A (A1-A13 y A17-A31). Diagramas referidos por el texto: 6 C4, 2 de secuencia, 1 de estilo, 1 de proceso de emparejamiento, 1 de características, 1 de Event Storming digital más 1 foto de notas adhesivas.

Métodos reconocibles: [DATO] DDD con Event Storming (ADR/ADR-001-use-ddd.md:17-20); modelo C4 (README.md:142); una "architecture style worksheet" para elegir estilo (ADR/ADR-004-data-integrity-downplayed.md:18); ADR con secciones "Strengthened / Weakened characteristics" (p. ej. ADR/ADR-002-architecture-style.md:35-41); arquitectura limpia/hexagonal dentro de un servicio (ADR/ADR-017-analytics-and-reporting-as-own-service.md:29-31).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| ADR-001 | Usar DDD con Event Storming para llegar a un entendimiento común del problema. | Accepted | no declara | Tiempo limitado para llegar a una arquitectura inicial; participan técnicos y no técnicos. | Se gasta mucho tiempo en DDD que podría faltar en otro lado. | no cita | ADR/ADR-001-use-ddd.md:9-25 |
| ADR-002 | Arquitectura basada en servicios, con eventos donde haga falta por interoperabilidad y despliegue. | Accepted | Microkernel, descartada por límites en escalabilidad y tolerancia a fallos. | Requisitos y características; más barata y rápida de construir y mantener. | Eventos agregan complejidad; se debilita la elasticidad por bases compartidas. | Testability, cost, agility; scalability, fault tolerance; depende de ADR-004 | ADR/ADR-002-architecture-style.md:9-41 |
| ADR-003 | Análisis y reportes por lotes diarios y mensuales. | Proposed | no declara (menciona que no hace falta tiempo real) | Análisis y reportes son caros; los requisitos piden reportes mensuales y análisis diarios. | Reportes y análisis no son en tiempo real. | no cita número | ADR/ADR-003-batch-for-analytics.md:6-18 |
| ADR-004 | Bajar la prioridad de la integridad de datos como característica de arquitectura. | Accepted | no declara | La calidad de los modelos ya la cubre testability; muchas medidas son de código; la característica no está en la worksheet de estilos. | Su control queda a nivel de código, no de arquitectura. | Data integrity, testability | ADR/ADR-004-data-integrity-downplayed.md:6-22 |
| ADR-005 | Enviar datos a sistemas externos de forma asíncrona. | Accepted | no declara | Un sistema de RR. HH. caído no debe bloquear procesos. | Los terceros necesitan interfaces asíncronas o hace falta un mecanismo de reintento. | Interoperability | ADR/ADR-005-async-with-external-systems.md:6-18 |
| ADR-006 | Correr los modelos de IA en su propio conjunto de contenedores. | Superseded by ADR-007 | no declara | Los modelos necesitan mucha memoria y CPU; su tráfico difiere del de los servicios de dominio; escalar un servicio de dominio arrancaría modelos de más. | Otra API que mantener. La frase de la decisión queda cortada ("driven by the", :29) y la lista de debilitadas está vacía. | Elasticity, cost, scalability, maintainability, testability, fault tolerance | ADR/ADR-006-ai-models-run-on-separate-containers.md:9-48 |
| ADR-007 | Usar LLM externos (Azure, Google, OpenAI) y un diseño por eventos para cada cliente de LLM. | Accepted | B: LLM abierto propio en la nube; C: LLM abierto propio on-prem; cada una con pros y contras. | Poco costo de desarrollo, adaptación a modelos nuevos, tendencia a abaratarse, salida rápida al mercado; apoyado en A20, A21, A24, A25. | Caro; límites de tasa, demoras, cuotas, modelos de vida corta; revisar privacidad; peor capacidad de respuesta, observabilidad y despliegue; control de tasa sin resolver. | A20, A21, A24, A25; cost, feasibility, interoperability, fault tolerance, availability | ADR/ADR-007-use-of-external-llms.md:6-66 |
| ADR-008 | Desacoplar con colas las llamadas largas de la UI y correr el emparejamiento periódicamente en segundo plano. | Accepted | no declara | UI con buena respuesta; algunas llamadas externas son largas o caras. | La UI debe manejar fallos y mensajes con más cuidado; baja testability por más órdenes de mensajes posibles. | Cita "Q26", que no existe en la lista de requisitos | ADR/ADR-008-ui-reactivity.md:6-27 |
| ADR-009 | Crear las Stories en un servicio propio. | Accepted | A: en Job candidate Service; B: en Matching Service; C: servicio propio. | El caso es independiente en el dominio y no es urgente; Matching no necesita el currículum y Job candidate no necesita la Story; se evita el acoplamiento por esos modelos. | Otro servicio que implementar; pierde simplicidad y costo. | Maintainability, fault tolerance, security (relaciona ADR-010) | ADR/ADR-009-creation-of-story-as-own-microservice.md:7-39 |
| ADR-010 | Los currículums solo se guardan en el servicio de candidatos, con privilegios que el servicio de emparejamiento no tiene. | Accepted | no declara | Principio que se puede imponer con la arquitectura limitando el acceso del algoritmo a los currículums. Remite a "Q4", que no existe. | Baja adaptability. La decisión queda cortada ("The story service does", :18). | Feasibility, security | ADR/ADR-010-create-features-from-story-not-resumes.md:6-27 |
| ADR-011 | La IA extrae rasgos legibles por humanos y fijos (opción B); el puntaje y el emparejamiento son deterministas, sin IA. | Accepted | A, B, C, D, E, F (seis procesos de emparejamiento); C descartada por sesgo y por contradecir ADR-010; F descartada por demasiado cara. | Transparencia, control humano, eficiencia; prompts lineales O(n+m) para A y B frente a cuadráticos en las demás; mejor costo ante actualizaciones (Q15). | No declara debilitadas (lista vacía). README lo lista como limitación: definir los rasgos para todas las Stories y puestos es difícil. | Q14, Q15; testability, feasibility, cost, deployability, data integrity, performance | ADR/ADR-011-deterministic-matching.md:7-83; README.md:183-186 |
| ADR-014 | Varios servicios pueden acceder a la misma base de datos. | Accepted | no declara | Varios servicios usan los mismos objetos (la Story la usan cuatro); la arquitectura basada en servicios lo permite. | Puede llevar a acoplamiento caótico; bajan maintainability, testability, data integrity y fault tolerance. | Cost, simplicity | ADR/ADR-014-multiple-services-on-same-database.md:6-34 |
| ADR-015 | Un solo servicio escribe cada objeto de la base; es dueño del esquema y se impone con permisos. | Accepted | no declara | Contener el acoplamiento de ADR-014; cambios de esquema más predecibles. | Esfuerzo de documentar la propiedad y de configurar permisos. | Maintainability, adaptability, data integrity, testability | ADR/ADR-015-schema-ownership-and-permissions.md:6-26 |
| ADR-016 | Publicar los emparejamientos y sus cambios de estado en una cola de eventos. | Accepted | Comunicación síncrona, descrita como acoplamiento fuerte (no como opción formal). | Los cambios de estado de un emparejamiento afectan muchas partes; la comunicación síncrona acopla y empeora la tolerancia a fallos. | Bajan testability y simplicidad; queda una decisión de tecnología pendiente. | Fault tolerance, evolvability, performance, scalability | ADR/ADR-016-matches-published-as-events.md:5-27 |
| ADR-017 | Un solo servicio para Analytics y Reporting, del que no depende ningún proceso operativo urgente. | Accepted | Separar Analytics y Reporting (objetivo de separación) frente a juntarlos (costo y complejidad). | Separar lo operativo del análisis; juntarlos sale más barato y simple; los reportes salen por email, fuera de la UI. | Si se piden reportes en la UI, hay que partir el servicio; bajan adaptability y security (acceso a todos los datos y conexión externa). | Evolvability, cost, maintainability, fault tolerance | ADR/ADR-017-analytics-and-reporting-as-own-service.md:6-51 |
| ADR-018 | Los disparadores de encuestas viven en los servicios de candidato y de empleador, con aviso por email. | Accepted | A: nuevo servicio 'Surveys'; B: en los servicios de candidato y empleador; (implícito) dentro de Analytics, descartado por ADR-017. | Los emails de los usuarios no salen de sus servicios; sin servicios nuevos. | No declara debilitadas (lista vacía); ADR-020 dice que la conexión externa se mantiene dos veces. | Cost, simplicity, maintainability | ADR/ADR-018-location-of-survey-triggers.md:6-39; ADR/ADR-020-externalizing-survey-processes.md:29-30 |
| ADR-019 | Analytics lee directamente la base de datos de candidatos para los datos demográficos. | Accepted | Opt 1: lectura directa; Opt 2: el servicio de candidatos envía; Opt 3: entrega asíncrona por topic. | Simplicidad, mantenimiento, rendimiento; separación de lo operativo. | Acceso directo a información sensible; baja security. | Data Point 5; simplicity, maintainability, performance | ADR/ADR-019-data-transmission-for-analytics.md:6-28 |
| ADR-020 | Externalizar las encuestas en SurveyMonkey o similar. | Accepted | no declara | Ya existen soluciones baratas. | Otro servicio externo (baja fault tolerance); la conexión se mantiene dos veces por ADR-018. | Cost, simplicity, agility, interoperability | ADR/ADR-020-externalizing-survey-processes.md:6-30 |
| ADR-021 | No resolver por ahora la concurrencia de varios hiring managers en la arquitectura. | Denied | Websockets para una UI reactiva; bloqueo por sesión abierta en UX; bloqueo optimista más adelante. | El requisito es supuesto y no explícito; websockets suben la complejidad. | UX queda más limitada en su diseño. | Q2 | ADR/ADR-021-addressing-concurrency-of-hiring-managers.md:6-24 |
| ADR-022 | Decisiones iniciales de tecnología (cola o streaming, IAM, base, runtime, bóveda) sin decisión escrita. | Open | Kafka frente a RabbitMQ (Kafka más capaz y más caro). | No hace falta concurrencia ni rendimiento máximos en la mensajería. | Consecuencias "intended": bajan configurability y performance. | Cost, simplicity | ADR/ADR-022-initial-technology-decisions.md:6-30 |
| ADR-023 | Servicio aparte para enviar a los sistemas de RR. HH., con cola de mensajes fallidos (dead-letter queue) reintentada periódicamente. | Accepted | no declara | Con miles de configuraciones de sistemas externos, los fallos van a ser habituales. | No declara debilitadas (lista vacía). El backoff exponencial se plantea como posible ("one could implement"). | R21, Q16; fault tolerance, performance, observability, interoperability | ADR/ADR-023-adapters-for-hr-systems.md:6-32 |
| ADR-024 | No cachear los currículums en el servicio de integración de RR. HH. | Denied | Cachear; espaciar más los reintentos del backoff. | Si el sistema externo no responde, la entrega ya no es urgente; el caché exige invalidación y memoria cara. | Se acepta la carga sobre el servicio de candidatos; se revisa si llega a ser cuello de botella. | no cita | ADR/ADR-024-caching-of-resumes.md:6-25 |
| ADR-025 | Concepto de pruebas de IA con conjuntos grandes de casos esperados y seis alcances de prueba. | Accepted | no declara | Cumplir Q14 y Q15; estabilidad del emparejamiento de ADR-011. | La anonimización solo la verifica un humano u otro LLM; las pruebas consumen prompts y suben el costo. | Q14, Q15, R3, R9; testability, data integrity, feasibility, maintainability, adaptability, deployability | ADR/ADR-025-ai-test-concept.md:6-46 |

No se incluye `ADR/ADR-000-template.md` (plantilla de ADR, :1-16). No hay ADR sobre cómo usar ADR. Los números 012 y 013 no existen en la carpeta.

## 4. Hallazgos para el curso

#### H01 · Matching determinista: la IA extrae, una regla fija compara
- Idea: separar la parte no determinista (el LLM) de la decisión final permite probar, explicar y abaratar el sistema; la IA produce una representación intermedia legible y el puntaje lo calcula un algoritmo fijo.
- Lo que hizo el equipo: [DATO] eligió la opción B: la IA extrae rasgos legibles por humanos ("spyder"/"spiders") que se fijan, y el puntaje y el emparejamiento no usan IA (ADR/ADR-011-deterministic-matching.md:55-56; C4/C3-components-matching.md:15-17; C4/C2-container.md:23-24).
- Razón declarada: [DATO] mejor control sobre la IA e interpretabilidad (ADR-011:27-28); transparencia, testability y eficiencia (:55-56); Q14 solo se resuelve con pruebas exhaustivas (:43-44); la representación intermedia permite pruebas más chicas y precisas (:76).
- Costo o trade-off admitido: [DATO] definir los rasgos de forma completa para todas las Stories y puestos es difícil (README.md:183-186). [HUECO] La lista de características debilitadas del ADR está vacía (ADR-011:83).
- Alternativas que nombra: [DATO] seis, A-F (ADR-011:33-40); C descartada por sesgo y por contradecir ADR-010 (:35-36); F descartada por demasiado cara en cómputo (:58-60).
- Estado: Accepted.
- Fuente: ADR/ADR-011-deterministic-matching.md:7-83; README.md:58-61, 183-186; Requirements/glossary.md:9, 11.
- Completitud: *completo* (decisión, razón, alternativas y costo, este último en README).
- Contexto para contarlo: qué es una Story (currículum anonimizado); qué son los rasgos legibles frente a los embeddings; ClearView.
- Depende de imagen: sí (ADR/images/ADR-011-matching-process.png) para ver las opciones; la decisión se entiende sin ella.
- Verificado: [ ]

#### H02 · Elegir el algoritmo por cuántas llamadas a la IA cuesta
- Idea: cuando cada llamada a un LLM cuesta dinero, la complejidad asintótica se mide en prompts, y eso decide el diseño.
- Lo que hizo el equipo: [DATO] comparó opciones por el número de prompts: lineal O(n+m) para A y B, cuadrático para las demás (ADR-011:45-46); también por prompts ante actualizaciones de un currículum o puesto, que exige Q15 (:47-48).
- Razón declarada: [DATO] el costo de los prompts varía mucho según tamaño y modelo (A24, Requirements/requirements-and-assumptions.md:104); los LLM son el mayor costo técnico (A25, :105); scalability se pide por la complejidad cuadrática del emparejamiento (ArchitectureCharacteristics/Characteristics.md:33).
- Costo o trade-off admitido: [DATO] la complejidad solo importa si se consideran muchos puestos por currículum; si el candidato acota los puestos antes, el costo puede bajar mucho (ADR-011:49-51).
- Alternativas que nombra: las seis de ADR-011.
- Estado: Accepted.
- Fuente: ADR/ADR-011-deterministic-matching.md:42-51, 70-72, 78; Requirements/Research/token-estimation.md:30-43.
- Completitud: *completo*.
- Contexto para contarlo: qué es un token y que se paga por token; la cifra de la estimación (unos 850 tokens de entrada, unos 1.400 de respuesta, entre 0,001 y 0,025 USD por prompt según modelo, token-estimation.md:30-43); n candidatos y m puestos.
- Depende de imagen: no.
- Verificado: [ ]

#### H03 · Imponer la anonimización con la arquitectura, no con una regla escrita
- Idea: un principio de negocio (el emparejamiento no ve el currículum) se puede garantizar quitando el acceso a nivel de datos.
- Lo que hizo el equipo: [DATO] los currículums solo se guardan en el servicio de candidatos y su acceso pide privilegios que el servicio de emparejamiento no tiene (ADR/ADR-010-create-features-from-story-not-resumes.md:16-17); la Story se crea en un servicio propio para que Matching no necesite el currículum ni Job candidate la Story (ADR/ADR-009-creation-of-story-as-own-microservice.md:22-25).
- Razón declarada: [DATO] "principle that can be enforced also through architecture by limiting the matching algorithms access to resumes" (ADR-010:11-12); la IA solo debe considerar la Story (Q5, Requirements/requirements-and-assumptions.md:73); los LLM existentes tienen sesgos (A8, :88).
- Costo o trade-off admitido: [DATO] baja adaptability (ADR-010:27); otro servicio que implementar, menos simplicidad y más costo (ADR-009:28, 38-39).
- Alternativas que nombra: [DATO] para dónde crear la Story: en Job candidate, en Matching o en servicio propio (ADR-009:17-19). ADR-010: no declara.
- Estado: Accepted.
- Fuente: ADR-009, ADR-010, Q5, Q9 (requirements-and-assumptions.md:67, 73).
- Completitud: *parcial*: ADR-010 tiene la decisión cortada (:18) y cita "Q4", que no existe; [DEDUCCIÓN] por el contenido, el requisito que encaja es Q5.
- Contexto para contarlo: qué es la Story; que Matching es un servicio distinto del de candidatos.
- Depende de imagen: no.
- Verificado: [ ]

#### H04 · Base compartida con un solo dueño de escritura por objeto
- Idea: compartir base de datos entre servicios abarata y simplifica, y el acoplamiento que trae se contiene con una regla de propiedad impuesta con permisos.
- Lo que hizo el equipo: [DATO] varios servicios pueden usar la misma base (ADR/ADR-014-multiple-services-on-same-database.md:18); por cada objeto, un solo servicio escribe, es dueño del esquema y se impone con permisos de base (ADR/ADR-015-schema-ownership-and-permissions.md:14-16).
- Razón declarada: [DATO] la Story la usan los servicios Job candidate, Story, Matching y Employer; al no ser microservicios se puede compartir (ADR-014:11-14); la regla hace los cambios de esquema más predecibles (ADR-015:15).
- Costo o trade-off admitido: [DATO] acoplamiento caótico posible; bajan maintainability, testability, data integrity y fault tolerance (ADR-014:21, 30-34); esfuerzo de documentar y configurar permisos (ADR-015:19-20); elasticidad baja por bases compartidas (ADR/ADR-002-architecture-style.md:41).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-014, ADR-015; C4/C2-container.md:7.
- Completitud: *parcial*: falta alternativa nombrada (una base por servicio no aparece como opción).
- Contexto para contarlo: qué es una arquitectura basada en servicios frente a microservicios; los servicios de ClearView.
- Depende de imagen: no.
- Verificado: [ ]

#### H05 · Estilo basado en servicios por costo y testability
- Idea: el estilo se elige desde las características prioritarias; una organización con poco presupuesto elige un estilo más barato de construir y mantener y agrega eventos solo donde hacen falta.
- Lo que hizo el equipo: [DATO] arquitectura basada en servicios, con arquitectura dirigida por eventos donde haga falta por interoperabilidad y despliegue (ADR/ADR-002-architecture-style.md:21-23; README.md:135-136).
- Razón declarada: [DATO] más barata y rápida de construir y mantener (ADR-002:32); top 3 interoperability, feasibility, testability (README.md:129-136); feasibility porque el Council vive de donaciones y la IA es cara (Characteristics.md:52-54).
- Costo o trade-off admitido: [DATO] los eventos agregan complejidad (ADR-002:33); baja elasticidad (:41).
- Alternativas que nombra: [DATO] microkernel, descartada por escalabilidad y tolerancia a fallos (ADR-002:27-28).
- Estado: Accepted.
- Fuente: ADR-002; README.md:103-138; ArchitectureCharacteristics/Characteristics.md:23-63.
- Completitud: *completo*, aunque la comparación entre estilos está en una imagen.
- Contexto para contarlo: qué es "feasibility" en el sentido del equipo (plazos, presupuesto y habilidades, Characteristics.md:11); qué es una arquitectura basada en servicios.
- Depende de imagen: sí (ADR/images/ADR-002-architecture-style.png; ArchitectureCharacteristics/images/architecture-characteristics.png).
- Verificado: [ ]

#### H06 · Ahorrar en lo básico para pagar lo incierto
- Idea: si un componente tiene un costo difícil de predecir, el resto de la arquitectura se elige barata y predecible para compensar.
- Lo que hizo el equipo: [DATO] "We deliberately save cost in other parts of the architecture in order to mitigate the unpredictable price tag of such an AI solution" (README.md:48-49); feasibility se define como decisiones de costo que reducen la varianza del costo de lo básico (Characteristics.md:29). Decisiones con "Cost" fortalecido: ADR-002:37, ADR-006:40, ADR-007:55, ADR-011:78, ADR-014:27, ADR-017:45, ADR-018:35, ADR-020:22, ADR-022:25.
- Razón declarada: [DATO] financiar proyectos sin fines de lucro es difícil si el costo estimado varía mucho (A26, requirements-and-assumptions.md:106); los LLM son el mayor costo técnico (A25, :105).
- Costo o trade-off admitido: [DATO] la mayoría declara su costo (p. ej. ADR-014:30-34, ADR-019:28); ADR-011:83, ADR-018:39 y ADR-023:32 dejan vacía la sección de debilitadas.
- Alternativas que nombra: no declara (es un criterio general).
- Estado: no declara (criterio del README, no un ADR).
- Fuente: README.md:43-49; Characteristics.md:29, 52-54; A25, A26.
- Completitud: *ilustrativo*: criterio declarado sin un ADR propio; se ve en varios ADR.
- Contexto para contarlo: ClearView es una ONG financiada con donaciones; los LLM se pagan por token.
- Depende de imagen: no.
- Verificado: [ ]

#### H07 · Comprar el LLM hecho frente a alojarlo
- Idea: la decisión de usar un servicio de IA externo o alojar un modelo propio se compara por costo de desarrollo, infraestructura, personal, privacidad y obsolescencia.
- Lo que hizo el equipo: [DATO] usa LLM externos (Azure, Google, OpenAI) y un diseño por eventos para cada cliente de LLM (ADR/ADR-007-use-of-external-llms.md:44-45). Reemplaza a ADR-006, que proponía contenedores propios para los modelos (ADR/ADR-006-ai-models-run-on-separate-containers.md:9, 28).
- Razón declarada: [DATO] poco costo de desarrollo, adaptación a modelos nuevos, tendencia a abaratarse, salida rápida (ADR-007:21-24); los modelos propios quedan superados pronto (A20, :32); más desarrollo, mantenimiento y know-how (:33); el experto dice que alojarlo en la nube no baja el costo frente a lo externo y on-prem obliga a pagar mantenimiento (Requirements/Research/interview-ai-expert.md:57-59).
- Costo o trade-off admitido: [DATO] caro, límites de tasa, demoras, cuotas, ciclo de vida corto, privacidad (ADR-007:25-27); bajan responsiveness, observability y deployability por el fin de vida de modelos (:61-66); el control de tasa queda sin resolver (:50; README.md:192-197).
- Alternativas que nombra: [DATO] B: LLM abierto propio en la nube; C: on-prem (ADR-007:28-40).
- Estado: Accepted.
- Fuente: ADR-006, ADR-007; interview-ai-expert.md:28-40, 56-64; README.md:192-197.
- Completitud: *completo*.
- Contexto para contarlo: qué es un LLM gestionado (externo) frente a uno propio; límites de tasa; fin de vida de un modelo.
- Depende de imagen: no.
- Verificado: [ ]

#### H08 · Investigar antes de decidir: entrevista a un experto y estimación de tokens
- Idea: los supuestos de costo y comportamiento de una tecnología nueva se consiguen con investigación explícita, y esos supuestos se citan en los ADR.
- Lo que hizo el equipo: [DATO] entrevistó a un experto en IA (interview-ai-expert.md:4-7) y estimó tokens y precio de un prompt de ejemplo (token-estimation.md:30-43); de ahí salen supuestos numerados A20-A28 (requirements-and-assumptions.md:100-108) que ADR-007 cita en parte: A20, A21, A24 y A25 (ADR-007:10-17).
- Razón declarada: [DATO] leading to many assumptions and requirements (README.md:55-57; interview-ai-expert.md:7).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: Requirements/Research/*.md; requirements-and-assumptions.md:9-11, 100-108; ADR-007:10-17.
- Completitud: *ilustrativo*.
- Contexto para contarlo: qué es un token; datos del experto como 60 s de demora y 500.000 USD por 500.000 prompts en un proyecto suyo (interview-ai-expert.md:29-30, 49); PTU de 60.000 USD al mes como cifra oída (:32-34).
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · Probar un sistema con IA: conjuntos de casos esperados por cada paso
- Idea: si cada cambio de prompt o de modelo puede cambiar el resultado, la arquitectura necesita un concepto de pruebas de regresión con conjuntos grandes y alcances por paso.
- Lo que hizo el equipo: [DATO] cinco conjuntos de prueba (currículum→Story y rasgos; currículum→consejos; puesto→rasgos; empleador→datos públicos; emparejamientos esperados) y seis alcances (ADR/ADR-025-ai-test-concept.md:17-29). Testability es una del top 3 (Characteristics.md:60-63).
- Razón declarada: [DATO] cumplir Q14 (cambiar prompt o modelo sin degradar el emparejamiento) y Q15 (reprocesar puntajes) (ADR-025:11-13; requirements-and-assumptions.md:75-76); los modelos cambian resultados entre versiones (A10, :90-91; A28, :108); el experto dice que todo cambio puede dar comportamiento caótico y que hace falta un conjunto grande (interview-ai-expert.md:42-43).
- Costo o trade-off admitido: [DATO] la anonimización solo la verifica un humano u otro LLM; las pruebas consumen prompts (ADR-025:34-35, 46).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-025; ADR-011:76; Characteristics.md:60-63.
- Completitud: *parcial*: faltan alternativas.
- Contexto para contarlo: qué es una prueba de regresión; que los modelos externos llegan a fin de vida (A27); H01 (la representación intermedia hace posible probar por partes).
- Depende de imagen: no.
- Verificado: [ ]

#### H10 · Integrar miles de sistemas externos que fallan: adaptadores, asincronía y dead-letter queue
- Idea: con muchos sistemas externos distintos, los fallos son lo normal; la integración se aísla en un servicio, con un adaptador por sistema y una cola de reintentos.
- Lo que hizo el equipo: [DATO] envíos a sistemas externos asíncronos (ADR/ADR-005-async-with-external-systems.md:13); servicio aparte para la transmisión a RR. HH. y una cola de fallidos reintentada periódicamente (ADR/ADR-023-adapters-for-hr-systems.md:19-22); un adaptador por sistema, que solo crea el equipo de ClearView (C4/C3-components-hr-integration.md:12-13, 28); credenciales en un almacén de claves (:26).
- Razón declarada: [DATO] un sistema de RR. HH. caído no debe bloquear procesos (ADR-005:13); con miles de configuraciones los fallos van a ser habituales (ADR-023:13-16); hasta 200.000 configuraciones (Q16, A29-A31, requirements-and-assumptions.md:77, 109-112).
- Costo o trade-off admitido: [DATO] los terceros necesitan interfaces asíncronas o un mecanismo de reintento (ADR-005:16-17). ADR-023 no declara debilitadas.
- Alternativas que nombra: no declara en ADR-005 ni ADR-023.
- Estado: Accepted.
- Fuente: ADR-005, ADR-023; C4/C3-components-hr-integration.md:7-39; Characteristics.md:38 (configurability baja porque las integraciones nuevas salen como releases).
- Completitud: *parcial*: faltan alternativas y costo de ADR-023.
- Contexto para contarlo: qué es una cola de mensajes fallidos (dead-letter queue) y un backoff exponencial; qué es un adaptador; la cifra de 200.000 configuraciones como supuesto.
- Depende de imagen: sí, opcional (C4/images/C3-components-hr-integration.svg).
- Verificado: [ ]

#### H11 · Decidir no hacer algo: el caché denegado
- Idea: un ADR denegado documenta por qué una optimización no compensa, y deja escrita la condición para volver a abrirlo.
- Lo que hizo el equipo: [DATO] rechazó cachear currículums en el servicio de integración (ADR/ADR-024-caching-of-resumes.md:7, 24).
- Razón declarada: [DATO] si el sistema externo no responde, la entrega ya no es urgente y se pueden espaciar los reintentos; el caché pide invalidación y memoria cara (ADR-024:15-20).
- Costo o trade-off admitido: [DATO] "we prefer the load over the memory cost"; se reconsidera si el servicio de candidatos llega a ser cuello de botella (ADR-024:24-25).
- Alternativas que nombra: [DATO] caché frente a ajustar el backoff exponencial (ADR-024:13-17).
- Estado: Denied.
- Fuente: ADR-024; ADR-023.
- Completitud: *completo*.
- Contexto para contarlo: H10 (la cola de reintentos); qué es invalidar un caché.
- Depende de imagen: no.
- Verificado: [ ]

#### H12 · Postergar un problema supuesto: la concurrencia de hiring managers
- Idea: un requisito que solo es supuesto no justifica complejidad; se puede dejar escrito por qué no se resuelve ahora y cómo se resolvería.
- Lo que hizo el equipo: [DATO] decidió no resolver por ahora las carreras entre hiring managers (ADR/ADR-021-addressing-concurrency-of-hiring-managers.md:7, 19-21).
- Razón declarada: [DATO] el requisito es supuesto y no explícito; websockets suben la complejidad; se resuelve con UX (bloqueo por sesión abierta) o más tarde con bloqueo optimista (ADR-021:15-21).
- Costo o trade-off admitido: [DATO] la UX queda más limitada (ADR-021:24).
- Alternativas que nombra: [DATO] websockets, bloqueo por sesión, bloqueo optimista.
- Estado: Denied.
- Fuente: ADR-021; Q2 y A2 (requirements-and-assumptions.md:72, 81).
- Completitud: *completo*.
- Contexto para contarlo: qué es un hiring manager; qué es una condición de carrera; qué es el bloqueo optimista.
- Depende de imagen: no.
- Verificado: [ ]

#### H13 · Separar lo operativo del análisis
- Idea: ningún proceso que atiende al usuario en tiempo real debe depender del servicio de análisis; el análisis va por lotes y lee datos de todo el sistema.
- Lo que hizo el equipo: [DATO] un solo servicio para Analytics y Reporting, del que no depende ningún proceso operativo urgente; conecta varias bases y colas (ADR/ADR-017-analytics-and-reporting-as-own-service.md:35-38); reportes por email (:24-25); lotes diarios y mensuales (ADR/ADR-003-batch-for-analytics.md:14); lectura directa de la base de candidatos para datos demográficos (ADR/ADR-019-data-transmission-for-analytics.md:18).
- Razón declarada: [DATO] separar lo operativo del análisis (ADR-017:18-19); juntar Analytics y Reporting es más barato y simple (:21-22); análisis y reportes son caros y no hace falta tiempo real (ADR-003:10-14).
- Costo o trade-off admitido: [DATO] si se piden reportes en la UI, el servicio se parte (ADR-017:26-27); baja security por acceso a todos los datos (ADR-017:51; ADR-019:28); reportes no en tiempo real (ADR-003:17).
- Alternativas que nombra: [DATO] en ADR-019, tres opciones de transmisión (:12-15). ADR-017 plantea el conflicto juntar/separar (:18-22).
- Estado: ADR-017 y ADR-019 Accepted; ADR-003 Proposed.
- Fuente: ADR-003, ADR-017, ADR-019; C4/C2-container.md:32-40.
- Completitud: *completo* en ADR-017 y ADR-019; ADR-003 está Proposed.
- Contexto para contarlo: los "Data Points" (R15-R19, R30, requirements-and-assumptions.md:30-40); qué es un proceso por lotes.
- Depende de imagen: no.
- Verificado: [ ]

#### H14 · Lectura directa de datos sensibles a cambio de simplicidad
- Idea: dar a un servicio acceso directo a la base de otro simplifica, y el costo se paga en seguridad; las opciones con menos acceso tienen otro costo (acoplamiento).
- Lo que hizo el equipo: [DATO] Analytics lee directamente la base de candidatos para el Data Point 5 (demográficos) (ADR-019:10, 18).
- Razón declarada: [DATO] simplicidad, mantenimiento, rendimiento (ADR-019:23-25); tolerancia a fallos y separación de lo operativo (:13).
- Costo o trade-off admitido: [DATO] acceso directo a información sensible; baja security (ADR-019:13, 28).
- Alternativas que nombra: [DATO] Opt 2, el servicio de candidatos envía (más privacidad, acoplamiento fuerte); Opt 3, entrega asíncrona por topic (acoplamiento más débil) (ADR-019:14-15).
- Estado: Accepted.
- Fuente: ADR-019.
- Completitud: *completo*.
- Contexto para contarlo: H13; qué son los datos demográficos en ClearView (R30, R32).
- Depende de imagen: no.
- Verificado: [ ]

#### H15 · Comprar lo que no es el núcleo: encuestas externas
- Idea: una función que no diferencia al producto y ya existe barata se compra hecha; el costo es otra dependencia externa.
- Lo que hizo el equipo: [DATO] encuestas en SurveyMonkey o similar (ADR/ADR-020-externalizing-survey-processes.md:17); los disparadores van en los servicios de candidato y empleador, que ya tienen los emails (ADR/ADR-018-location-of-survey-triggers.md:22-24, 29-30).
- Razón declarada: [DATO] ya existen soluciones baratas (ADR-020:11); los emails no salen de sus servicios (ADR-018:23-24); ADR-017 deja lo operativo fuera de Analytics (ADR-018:17-18).
- Costo o trade-off admitido: [DATO] otro servicio externo baja la tolerancia a fallos; la conexión se mantiene dos veces (ADR-020:28-30).
- Alternativas que nombra: [DATO] en ADR-018, servicio 'Surveys' nuevo (:21) frente a servicios existentes. ADR-020: no declara.
- Estado: Accepted.
- Fuente: ADR-018, ADR-020; C4/C1-context.md:26.
- Completitud: *parcial*: ADR-020 no nombra alternativas.
- Contexto para contarlo: R18-R19 (encuestas de cinco preguntas, requirements-and-assumptions.md:33-35).
- Depende de imagen: no.
- Verificado: [ ]

#### H16 · Separar la IA del dominio para escalarla aparte (decisión reemplazada)
- Idea: un componente con necesidades de recursos y tráfico muy distintas no debe escalar junto con los servicios que lo llaman.
- Lo que hizo el equipo: [DATO] propuso contenedores propios para los modelos (ADR-006:28), luego reemplazado por LLM externos (ADR-006:9).
- Razón declarada: [DATO] los modelos necesitan mucha memoria y CPU; si un servicio de dominio escala, arrancaría otro modelo sin necesidad (ADR-006:13-20); en DDD no hay razón para alojar la IA en un dominio (:22-24).
- Costo o trade-off admitido: [DATO] otra API que mantener (ADR-006:33).
- Alternativas que nombra: no declara.
- Estado: Superseded by ADR-007.
- Fuente: ADR-006. [DATO] C3 Story sigue citando ADR-006 (C4/C3-components-story.md:9).
- Completitud: *parcial*: frase de decisión cortada (:29), sin alternativas ni debilitadas.
- Contexto para contarlo: H07.
- Depende de imagen: no.
- Verificado: [ ]

#### H17 · Asincronía para la UI: colas para llamadas largas y emparejamiento periódico
- Idea: las llamadas largas o caras se sacan del camino del usuario con colas, y el trabajo pesado se hace en segundo plano; el costo es manejar fallos visibles y más órdenes posibles de mensajes.
- Lo que hizo el equipo: [DATO] colas para llamadas largas y emparejamiento periódico (ADR/ADR-008-ui-reactivity.md:15-17); el envío del currículum termina antes de crear la Story (UseCases/use-case-upload-a-resume.md:46-48); los consejos se generan en segundo plano (:24-33).
- Razón declarada: [DATO] UI con buena respuesta; llamadas externas largas o caras (ADR-008:11-12); respuestas de LLM de hasta 60 s (A22, requirements-and-assumptions.md:102).
- Costo o trade-off admitido: [DATO] la UI tiene que considerar fallos con más cuidado; baja testability (ADR-008:20, 27); el emparejamiento no es en tiempo real (README.md:188-190).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-008; UseCases/use-case-upload-a-resume.md; README.md:188-190.
- Completitud: *parcial*: sin alternativas; cita "Q26", que no existe ([DEDUCCIÓN] por el contenido, encaja con Q13, requirements-and-assumptions.md:69).
- Contexto para contarlo: qué es una cola; la Story.
- Depende de imagen: sí, opcional (UseCases/images/*.png).
- Verificado: [ ]

#### H18 · Eventos para los cambios de estado que afectan a muchos
- Idea: un hecho de negocio que interesa a varias partes del sistema se publica como evento para no acoplarlas de forma síncrona.
- Lo que hizo el equipo: [DATO] cola de eventos para los emparejamientos y su estado (ADR/ADR-016-matches-published-as-events.md:14); la integración de RR. HH. consume ese topic (C4/C2-container.md:27; C4/C3-components-hr-integration.md:32-35).
- Razón declarada: [DATO] la comunicación síncrona acopla todo el sistema y empeora la tolerancia a fallos (ADR-016:9-11).
- Costo o trade-off admitido: [DATO] bajan testability y simplicidad (ADR-016:25-27); la tecnología queda abierta (ADR-022:11-14, Kafka frente a RabbitMQ).
- Alternativas que nombra: comunicación síncrona, mencionada en el contexto.
- Estado: Accepted.
- Fuente: ADR-016, ADR-022.
- Completitud: *completo*.
- Contexto para contarlo: qué es un evento/topic; estados de un emparejamiento (unlocked, passed, hired, C2-container.md:34).
- Depende de imagen: no.
- Verificado: [ ]

#### H19 · Bajar la prioridad de una cualidad, por escrito
- Idea: descartar una cualidad como motor de la arquitectura es una decisión que se documenta con razones, aunque la cualidad siga importando a nivel de código.
- Lo que hizo el equipo: [DATO] data integrity queda fuera de las características de arquitectura (ADR/ADR-004-data-integrity-downplayed.md:14-18); extensibility, configurability y abstraction también se bajan con una razón cada una (Characteristics.md:35-40).
- Razón declarada: [DATO] testability ya cubre la calidad de los modelos; las medidas van en código; no está en la worksheet de estilos (ADR-004:16-18).
- Costo o trade-off admitido: [DATO] se controla en código, no en arquitectura (ADR-004:22).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: ADR-004; Characteristics.md:35-40.
- Completitud: *parcial*: sin alternativas.
- Contexto para contarlo: qué es una característica de arquitectura; lista de las 12 candidatas.
- Depende de imagen: no.
- Verificado: [ ]

#### H20 · Supuestos numerados que sostienen requisitos
- Idea: cuando el enunciado no dice algo, el equipo escribe el supuesto con número y deriva de él el requisito, para que se pueda revisar si el supuesto cae.
- Lo que hizo el equipo: [DATO] requisitos "Assumed" con su supuesto: R11 de A1, R26 de A4, Q2 de A2, Q16 de A31 (requirements-and-assumptions.md:44-53, 71-77); regla de no renumerar al borrar (:6-7); ADR-021 deniega por ser un requisito supuesto (ADR-021:15).
- Razón declarada: [DATO] proceso iterativo (requirements-and-assumptions.md:6).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: Requirements/requirements-and-assumptions.md; README.md:93-99.
- Completitud: *ilustrativo*.
- Contexto para contarlo: el caso ClearView; ejemplo de cadena A30→A31→Q16→ADR-023.
- Depende de imagen: no.
- Verificado: [ ]

#### H21 · Riesgo de inyección de instrucciones en el currículum
- Idea: si un texto de usuario llega a un LLM, ese texto puede traer instrucciones maliciosas y hace falta preprocesarlo.
- Lo que hizo el equipo: [DATO] lo registra el experto: los atacantes pueden incluir instrucciones en su currículum; hace falta preprocesar (interview-ai-expert.md:74-75). A13 supone candidatos maliciosos (requirements-and-assumptions.md:94).
- Razón declarada: la del experto.
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara.
- Fuente: interview-ai-expert.md:74-75.
- Completitud: *ilustrativo*: [HUECO] ningún ADR ni C3 recoge el preprocesamiento.
- Contexto para contarlo: qué es un prompt.
- Depende de imagen: no.
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `.gitignore`: configuración del repositorio, sin contenido de arquitectura.
- `ADR/ADR-000-template.md`: plantilla vacía.
- `ADR/ADR-001-use-ddd.md`: decisión sobre el método de trabajo del equipo en el concurso (usar DDD/Event Storming por falta de tiempo), no sobre el sistema.
- `EventStorming/event_storming.md`: describe el taller en términos genéricos; los ejemplos de comandos y eventos ("placing an order", "Payment Processed", :22, :27) no son de ClearView; su única decisión (pago síncrono, :43) no reaparece en ningún ADR.
- `README.md:18-24` (equipo) y `:205-208` (herramienta de diagramas): datos del equipo y de la herramienta.
- `ADR/ADR-022-initial-technology-decisions.md`: abierto sin decisión; aporta solo la comparación Kafka/RabbitMQ en una línea (:14), ya recogida en H18.
- `C4/C3-components-job-candidate.md`, `C4/C3-components-story.md`, `C4/C3-components-matching.md`: flujos paso a paso que repiten decisiones de ADR (ADR-005, ADR-007, ADR-011); útiles solo como apoyo de H01, H03 y H17.
- `README.md:199-203` (administración de usuarios): limitación conocida que depende de una decisión de tecnología abierta; no enseña una decisión.

## 6. Imágenes para fase 2

- `ADR/images/ADR-011-matching-process.png`: las opciones de proceso de emparejamiento A-F; citada en ADR/ADR-011-deterministic-matching.md:29.
- `ADR/images/ADR-002-architecture-style.png`: comparación de estilos (probablemente la worksheet de estilos); citada en ADR/ADR-002-architecture-style.md:25 y README.md:138.
- `ArchitectureCharacteristics/images/architecture-characteristics.png`: las 7 características elegidas y el top 3; citada en README.md:109.
- `C4/images/C2-Container.svg`: contenedores, base compartida y topic de emparejamientos; citada en C4/C2-container.md:5 y README.md:162.
- `C4/images/C3-components-hr-integration.svg`: orquestador, adaptadores, almacén de claves y colas de reintento; citada en C4/C3-components-hr-integration.md:18.
- `C4/images/C3-components-matching.svg`: Feature Extractor, Match Creator, Matches Publisher; citada en C4/C3-components-matching.md:20.
- `C4/images/C1-Context.svg`: actores y sistemas externos; citada en C4/C1-context.md:5 y README.md:152.
- `C4/images/C3-components-story.svg` y `C4/images/C3-components-job-candidate.svg`: componentes de Story y Job Candidate; citadas en sus C3 (:15 y :16).
- `UseCases/images/upload-a-resume.png` y `UseCases/images/submit-a-resume.png`: secuencias asíncronas de subir y enviar un currículum; citadas en UseCases/use-case-upload-a-resume.md:21, 39.
- `EventStorming/assets/Eventstorming.png`: resultado digital del Event Storming; citada en EventStorming/event_storming.md:73.

## 7. Preguntas abiertas

- ¿Qué opciones compara y qué puntajes da la imagen de ADR-002 (la "architecture style worksheet" que menciona ADR-004:18)?
- ¿Cuáles son exactamente las siete características elegidas? El texto de Characteristics.md:27-33 lista siete y ADR-002:27-28 dice que scalability y fault tolerance están entre "7 driving characteristics"; la imagen lo confirmaría.
- ¿Qué decía la decisión completa de ADR-010 (cortada en :18) y de ADR-006 (cortada en :29)? Solo el historial del repositorio podría responderlo.
- ¿Qué requisito quiso citar ADR-010 con "Q4" y ADR-008 con "Q26"? Ninguno existe en la lista.
- ADR-007 dice que el costo es más predecible (:51) y a la vez lista "Expensive" (:25); ¿más predecible respecto de qué opción? El texto no lo dice.
- El Event Storming decide un pago síncrono (event_storming.md:43); ADR-005 pide asincronía con sistemas externos y nombra el billing system (:10); ¿cuál vale para la facturación de R16?
- ADR-023 lleva por título "Dead-letter queue for HR systems" y archivo "adapters-for-hr-systems"; los adaptadores por sistema solo aparecen en C3 HR Integration (:12-13). ¿Hay una decisión de adaptadores aparte?
- ¿Existieron ADR-012 y ADR-013? La numeración salta de 011 a 014.
- C2 llama "microservice" al servicio de Story (C4/C2-container.md:20) dentro de una arquitectura basada en servicios (ADR-002); el texto no aclara si es una excepción de estilo.
- C3 Story sigue remitiendo a ADR-006 (C4/C3-components-story.md:9), que está reemplazado; ¿el diagrama muestra contenedores propios de IA o servicios externos?
