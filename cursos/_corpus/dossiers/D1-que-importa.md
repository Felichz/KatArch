# Dossier D1 · R1: pasar del problema del negocio a las pocas características de calidad que importan, decir a cuáles renuncia y comprobarlas con cifras

Verdades: T0 (la cadena requisito → características → estilo/decisiones), T7 (priorizar es renunciar), T6 (el costo se estima con supuestos escritos) y la estimación de carga como forma de comprobar el diseño (la llamo E1 en este documento).

Método: leí completos los archivos originales de BluzBrothers (Characteristics, ADR-003 a 020, Requirements, DistilledRequirements, Sizing, Failover, Alerts, Deployment, C2, US1), Data Alchemists (README, requirements, ADR-1, 8 a 10, 13 a 15, deployment), Pegasuz (README, Requirement-analysis, quanta, ADR-003, 007, 011), Pragmatic (Characteristics, requisitos y supuestos, token-estimation, entrevista con el experto, ADR-002, 004, 007, 011, README), Five Nines (3_NFRs, 4_Assumptions, business goals, ADR-0002, 0017, 0020, 0022, narrativa del video), ArchColider (CostAnalysis, Tradeoffs, Constraints, BusinessDrivers, SystemAppoach), ZAItects (cost-analysis, README, architecture-characteristics, fitness-functions, requisitos de negocio), Team 7 (README y ADR-1, 3), Archangels (ArchitectureAnalysis, ArchitecturePatterns, ADR-002), monArch (Readme: características y costo), CELUS Ceals (principios, ADR-002, 007, 012) y ConnectedAI (NFR y ADR-004). Revisé las imágenes de las hojas de trabajo de BluzBrothers y Pragmatic. Los 7 repos que solo tienen texto no traen imágenes, así que sus hojas de trabajo no se pudieron leer. Las cuentas marcadas "(mía)" son aritmética que hice yo; el repo no las escribe.

---

## 1. Las verdades, reformuladas

**T0 · La cadena se sostiene en sus dos primeros eslabones y casi siempre se corta en el último.**
Los equipos pasan del problema del negocio a una lista corta de características de calidad (la regla que citan es "no más de siete", con "las tres principales" marcadas), y de esa lista eligen el estilo. Esos dos pasos quedan escritos y se pueden seguir. El tercer paso, de la característica a cada decisión (ADR), se corta: en la mayoría de los repos los ADR no citan el requisito ni la característica que los origina. Los que sí lo hacen (Five Nines, BluzBrothers en los ADR de priorización, Data Alchemists en ADR-13, Pragmatic en 7 ADR) se pueden auditar. Dos matices para el curso: (a) el método no lo descubrieron doce equipos por separado: la hoja "Architecture Styles Worksheet" de Mark Richards aparece en BluzBrothers y Pragmatic (imágenes), Archangels (cita su fuente), Data Alchemists (ADR-1), monArch (cita el libro *Fundamentals of Software Architecture*) y Pegasuz (hojas por quantum); (b) esa hoja tiene filas fijas, y varios equipos dejaron fuera una característica porque no tiene fila (ver T7).

**T7 · Priorizar es renunciar, y la renuncia se escribe con su razón y su costo: se sostiene, en más repos que los tres del mapa.**
Cuando un equipo elige tres características, las demás quedan por debajo, y los mejores casos dicen cuáles bajan, por qué esa baja es segura en ese negocio y qué se pierde. La renuncia no es descuido: BluzBrothers baja la escalabilidad porque la carga máxima está fijada en los requisitos, Pegasuz baja la disponibilidad porque no hay vidas ni dinero en juego. Lo que no se sostiene como está en el mapa es la parte "validarlo con cifras": solo BluzBrothers valida su prioridad con una cuenta (Sizing.md). Data Alchemists y Pegasuz renuncian con razones, sin cifras de comprobación.

**T6 · El costo se calcula con supuestos escritos: se sostiene, con una advertencia.**
Cuatro repos escriben una cuenta de costo con volumen, precio unitario y escenarios (ArchColider, ZAItects, Pragmatic, monArch); Five Nines solo pone techos por unidad (≤ €0,10 por chequeo) y una tabla de costo mensual en la narración del video. La advertencia: las cuentas tienen errores internos que se ven justamente porque los supuestos están escritos (etiquetas cambiadas, una suma que no suma, dos tarifas por hora distintas). Lo que enseña la verdad no es "el costo estimado es correcto", sino "una estimación con supuestos a la vista se puede auditar y se sabe qué supuesto mover".

**E1 · La carga se estima para comprobar el diseño: solo un repo lo hace de punta a punta.**
BluzBrothers convierte "1 segundo" en un presupuesto por etapa y suma 693 ms. ZAItects hace la cuenta en horas de experto en vez de servidores. Pragmatic y ArchColider estiman costo, no latencia. Five Nines, Data Alchemists y Pegasuz escriben números de carga pero no los convierten en una comprobación (y en Five Nines dos documentos se contradicen 60 veces en la frecuencia de telemetría). Reformulación: "estimar la carga es sumar un presupuesto de tiempo o de costo por etapa, con cada supuesto a la vista, para saber cuál supuesto decide el resultado".

---

## 2. Verificación por repo

### T0 · La cadena requisito → características → estilo → decisiones

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| BluzBrothers | Sí, en los cuatro eslabones | `ArchitectureCharacteristics/Characteristics.md`; ADR-008 a 012; `FitnessFunctions/Sizing.md` | Requisitos numerados (FR1 a FR10) → palabras clave pegadas a 9 características → 7 prioritarias → tarjetas por componente → 3 finales (Evolvability, Performance, Elasticity) → ADR-012 elige event-driven con "a rating of 14 stars". Los ADR de priorización enlazan a Characteristics.md. Sizing.md vuelve al requisito de 1 segundo. |
| Pragmatic | Sí en características y estilo; parcial en ADR | `ArchitectureCharacteristics/Characteristics.md`; README "Architecture Characteristics"; ADR-002 | 12 definidas, 7 priorizadas, 3 top (Feasibility, Interoperability, Testability), elegidas por "three main challenges" del levantamiento. README lista los ADR de cada característica top. Solo 7 ADR citan IDs de requisitos (007, 008, 010, 011, 021, 023, 025). ADR-008 cita Q26 y ADR-010 cita Q4: el documento de requisitos termina en Q16 y Q4 no existe. |
| Five Nines | Sí, es el repo con la cadena más trazable | `requirements/3_NFRs.md`; `requirements/2_FRs.md`; `adrs/ADR-0020`; `hld/.../4_Sequence_Diagram.md` | NFR_9 (85 % de precisión en daños, ≤5 s) y FR#2M (80 % de detección, <10 % de falsos positivos) aparecen en el contexto de ADR-0020; la secuencia SD-003 usa umbrales de confianza de 85 % y 70-85 %. Pero las cifras cambian entre documentos y no hay prioridad entre las 12 NFR. |
| Pegasuz | Sí en requisito → NFR; débil después | `other-artifacts/Requirement-analysis.md`; `quanta/*.md` | Tabla de 12 filas: requisito → análisis → NFR, incluidas 3 NFR "[Derived]" que el equipo agregó (GDPR, número de usuarios, multirregión). Cada quantum tiene su "Top 3". El enlace NFR → característica del quantum no está escrito ni numerado. |
| Archangels | Sí en característica → estilo; parcial antes | `1.ProblemBackground/ArchitectureAnalysis.md`; `2.SolutionBackground/ArchitecturePatterns.md`; `4.ADRs/002` | La tabla de características tiene una columna "Source" con el requisito de origen. Compara microservicios y event-driven contra la hoja de Richards. ADR-002 cita el análisis, no un requisito. |
| Team 7 | Sí hasta las características; corta en los ADR | README (SH-1 a SH-6, UC-1 a UC-9, QA-1 a QA-6); `ADR/` | IDs encadenados: stakeholder → caso de uso → característica. En los ADR solo ADR-5 cita UC-n; ningún ADR cita QA-n ni SH-n. |
| Data Alchemists | Parcial | README "Driving characteristics"; ADR-1, ADR-13; `deployment_viewpoint` | Tabla con 9 características (3 "Top", 3 implícitas). ADR-1 cita el worksheet. Una sola cadena de punta a punta: 99,99 % de disponibilidad (NFR) → ADR-13 (multi-zona). Los ADR 2 a 15 no citan filas de la tabla. |
| ArchColider | Parcial: hay cadena de negocio, no de calidad | `1.ProblemBackground/BusinessDrivers.md`; `4.ADRs/` | 6 drivers → 10 requisitos arquitectónicos (columna "From BD"). Ningún ADR cita un requisito (búsqueda propia sobre los ADR, sin coincidencias de SAR ni BD). 6 de los 10 requisitos no tienen ADR (dato de la ficha, consistente con lo que revisé). Las calidades están por subsistema en `SystemAppoach.md`. |
| ZAItects | Parcial | `other_design_docs/architecture-characteristics.md` | Top 3 por caso de uso, en tabla. Security, Privacy y Observability quedan fuera del top 3 por ser "implicit". Ningún ADR cita el documento de características (revisión de la ficha). |
| monArch | Parcial | Readme "Architecture Characteristics", "Architecture Approach" | 3 marcadas (Scalability, Extensibility, Performance). La Figura 1 compara estilos con esas tres, y el texto reconoce que Microservices puntúa bajo en Performance y se usa igual. Los ADR no citan características. |
| CELUS Ceals | No | `2.SolutionBackground/1.ArchitecturePrinciples.md`; ADR-007 | 9 principios con "reason" y "outcomes", sin marcar ninguno como top. ADR-007 elige microservicios con 4 criterios y un puntaje (20, 15 y 8). Mantenibilidad aparece en los principios por "volunteers with different levels of expertise" y no es criterio de ADR-007; el ADR lista "lacks simplicity" como negativo. |
| ConnectedAI | No | `1_requirements/02-non-functional-requirements.md` | 4 NFR sin cifras ("Ensure quick response times"). Los ADR repiten el problema con sus propias palabras, sin citar el requisito. |

### T7 · Priorizar es renunciar

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| BluzBrothers | Sí, con razón, costo y cifra | ADR-008, 009, 010, 011; Characteristics.md; Sizing.md | Escalabilidad rebajada porque "no significant increase in traffic is anticipated with the addition of new sensors"; Deployability porque la instalación es una sola por hospital; Availability queda fuera de la elección de estilo pero se resuelve con duplicación de instancias (ADR-018, 020). Costo declarado en ADR-008 y 009: dificultad de migrar a la nube. |
| Pegasuz | Sí | README "Availability"; `quanta/chat.md`, `notification.md`, `npo-candidate.md`, ADR-003 | 5 nueves "unreasonable", 4 "overkill"; objetivo de 3 nueves (quanta sin dependencias síncronas) a 4 (con ellas). Chat y Notification listan "Characteristics that we do not need as we offloaded to 3rd party vendors". Costo escrito: "Event driven + microservices is a costly architecture." Meetings tiene la lista de "no necesarias" con textos que dicen lo contrario (ver sección 5). |
| Data Alchemists | Sí en la renuncia; no hay cifra ni ADR | README "Driving characteristics" | Entre Elasticity y Evolvability el equipo eligió la segunda. Ningún ADR lo registra (ADR-1 lista solo tres características) y el costo no se escribe. El mismo README dice después que Kubernetes cubre "scaling and elasticity requirements". |
| Pragmatic | Sí (no estaba en el mapa) | Characteristics.md "Reduced priorities"; ADR-004; ADR-002 | Baja 4 características con razón cada una (Extensibility, Configurability, Abstraction, Data integrity). ADR-004 es un ADR solo para bajar Data integrity; ADR-002 lista "Weakened characteristics: Elasticity". |
| ArchColider | Sí (no estaba en el mapa) | `2.SolutionBackground/Tradeoffs.md`; `SystemAppoach.md`; `Constraints.md` | Cuatro trade-offs con pares explícitos: precisión de stock por disponibilidad, simplicidad y espacio por historia, rendimiento por integridad, construir pagos por tiempo. Disponibilidad "solved with restarts and vertical scale" por ahora. |
| Archangels | Sí (no estaba en el mapa) | ArchitecturePatterns.md, ADR-002 | El estilo elegido puntúa bajo en 2 de las 3 características top, y lo declaran: "Interoperability and configurability may still be high trade-offs after mitigation." |
| Team 7 | Sí, a nivel de ADR | ADR-3, ADR-1 | "Robustness is over performance here." (asignación de tickets como batch) y "nothing critical will happen if a report generation will take a little longer" (dominio de administración). |
| ConnectedAI | Sí, a nivel de ADR | `4_adrs/004_adr_in_memory_state_session_management.md` | Estado de sesión en memoria: "Sessions are lost if the system restarts or scales down unexpectedly." Elige velocidad sobre durabilidad. |
| monArch | Parcial | Readme "Others Considered" | Availability "needs to be available at all times" pero no marcada top 3; Reliability "not mission critical, and cost of downtime is low". Sin ADR de disponibilidad. |
| Five Nines | No | `3_NFRs.md` | 12 NFR sin orden y sin renuncia declarada. Es el caso contrario: lista todo. |
| ZAItects | No | architecture-characteristics.md | Deja Security, Privacy y Observability fuera del top 3 por implícitas; no las baja, las da por supuestas. |
| CELUS Ceals | No | Principios | 9 principios sin orden. |

### T6 · El costo se estima con supuestos escritos

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| ArchColider | Sí, la más completa | `3.ViewsAndPerspectives/CostAnalysis.md` | Supuestos (10 000 usuarios, 1 000 solicitudes/día, imágenes de 4 MiB, 10 % escribe reseñas, 5 % envía feedback), tres escenarios (500, 1 000 y 10 000 solicitudes/día), precio unitario por servicio y total anual: 12 247,57 / 12 548,17 / 22 480,57 USD. Totales verificados (míos). Errores: ver sección 3. |
| ZAItects | Sí, en horas de experto | `other_design_docs/cost-analysis.md`; README | 200 candidatos por semana, 3 h y 8 h de corrección, 80 % pasa; tarifa 50 USD/h; factor de revisión humana 0,2; precios por token; escenarios 5x y 10x. Resultado: 470 → ~95 USD por candidato. Incoherencias en sección 3. |
| Pragmatic | Sí, para IA | `Requirements/Research/token-estimation.md`; `interview-ai-expert.md`; A24 a A26; ADR-007 | Prompt de ~850 tokens, respuesta de ~1 400; 0,025 USD con GPT-4o y 0,001 con GPT-4o mini por prompt. No multiplica por el volumen de A17. |
| monArch | Parcial | Readme "Cost Analysis" | 50 000 usuarios activos al mes, 3 000 llamadas por usuario, cuenta por servicio. La suma escrita es "450 + 1000 + 1260 = $2780", que da 2 710; los 70 USD de Pub/Sub Lite explican la diferencia pero no están en la fórmula. |
| Five Nines | Parcial | `3_NFRs.md` NFR_8; `video/narrative.md` | Techos por unidad (≤ €0,10 por chequeo de IA) y una tabla de costo mensual de ~9 000 € en la narración del video; sin derivación a partir de volumen. |
| Data Alchemists | No | ADR-14, ADR-15 | Decide autogestionar Kafka y MongoDB "for cost savings" y no escribe ninguna cifra. |
| ConnectedAI | No (como estimación) | ficha; `6_test_cases/evaluation.md` | Mide costo por modelo en la evaluación, no estima un costo del sistema. No lo revisé a fondo. |

### E1 · Estimar la carga para comprobar el diseño

| Repo | ¿La sostiene? | Evidencia | Detalle concreto |
|---|---|---|---|
| BluzBrothers | Sí, el único de punta a punta | `FitnessFunctions/Sizing.md`; README "Fitness functions" | De 8 sensores y sus frecuencias a 4,22 señales por segundo por paciente, a 4 000 señales/s en el pico, a un presupuesto por etapa que suma 693 ms frente al requisito de 1 s. |
| ZAItects | Sí, con horas en lugar de servidores | cost-analysis.md; README | Carga actual 200 candidatos/semana a 1 880 horas; 10x a 18 800 horas. Con IA: 3 760 horas. |
| ArchColider | Parcial | CostAnalysis.md | Escenarios de volumen con costo; sin latencia. |
| Pragmatic | Parcial | A17, ADR-011, Characteristics.md | 25 000 aperturas al mes y ~25 000 candidatos; el costo de emparejarlos se razona con complejidad (O(n+m) frente a cuadrática), sin multiplicar. |
| Pegasuz | Parcial | README "Capacity planning" | Tabla de capacidad a 3 meses, 6 meses, 1, 2 y 3 años; no se convierte en una comprobación. Dos cifras no cuadran (sección 3). |
| Five Nines | Parcial y contradictorio | `4_Assumptions`; Appendix A; ADR-0021, 0022 | Flota por ciudad y NFR de carga, pero telemetría cada 30 min en unos documentos y cada 30 s en otros. |
| Data Alchemists | No | README "Non-functional Requirements" | Escribe "150M reservations to be refreshed every 5 minutes" y no calcula lo que implica. |
| Team 7 | No | README QA-1 | Las cifras son supuestos declarados ("let's assume something crazy"), sin cuenta. |

---

## 3. Los mejores ejemplos para enseñar

### T0 (cadena)

**T0-A · BluzBrothers: de "1 segundo" a tres características, con una característica que sale por razonamiento, no por conteo**

- El caso: StayHealthy, una empresa de software médico, necesita un sistema para monitorear signos vitales de pacientes en hospitales, instalado dentro de cada hospital. [DATO] Requirements.md: el requisito es una respuesta promedio de "1 second or less", 20 pacientes por estación de enfermería, máximo 500 pacientes por instalación.
- La situación que obliga a decidir: el enunciado trae unas 25 frases de requisitos y ninguna dice "elige tres características". El equipo tiene que convertir frases en características y elegir.
- Qué hicieron, en orden [DATO]: (1) destilar los requisitos en FR1 a FR10; (2) pegar una nota autoadhesiva con una característica en cada frase del enunciado (imagen `characteristics.png`: "average response time of 1 second or less" recibe Performance; "must still function" recibe Availability y Fault-tolerance; "adding more vital sign monitoring devices" recibe Configurability, Evolvability y Elasticity; "must be secure" recibe Security); (3) listar 7 características prioritarias; (4) con Event Storming sacar 4 componentes y pegar notas por componente (imagen `components-sticky-cards.png`); (5) cortar a 3. El resultado: Evolvability, Performance, Elasticity.
- El detalle que enseña [DATO + lectura de la imagen mía]: en la imagen por componentes, Availability y Evolvability están en los 4 componentes (Recorder, Analyzer, Streamer, Alert); Elasticity y Performance en 3 (todos salvo Alert); Fault-tolerance y Configurability en uno; Security en uno. Availability, con más notas, no entra en el top 3. El texto dice por qué: "If both are satisfactory, the system should remain available." (disponibilidad como consecuencia de rendimiento y elasticidad) y ADR-010 agrega que "the template does not include availability as a characteristic for consideration". Es decir, el recuento de notas no decidió; decidió un razonamiento, y el límite de la hoja de estilos.
- Alternativas declaradas y por qué se descartan [DATO]: ADR-012 no lista estilos alternativos con nombre; solo dice que el event-driven tiene "a rating of 14 stars according to the selection schema". En la imagen `chosen-architecture.png` (hoja de Richards con el event-driven marcado) las tres filas encerradas dan 4 + 5 + 5 = 14 estrellas. Mi lectura de las mismas tres filas en otros estilos: space-based 13, microservicios 12, service-based 8, microkernel 7, service-oriented 6, layered 5, modular monolith 5. El margen sobre el segundo es de una estrella (lectura mía de la imagen; el repo solo escribe el 14).
- Costo admitido [DATO]: ADR-012: "Implementing an event-driven architecture may introduce additional complexity to the system design and development." ADR-011: "Prioritizing only three characteristics may overlook other important aspects of the system architecture."
- Qué enseña: el camino requisito → nota → característica → componente → top 3 → estilo, y que el paso de 4 a 3 se justifica con una razón escrita (ADR-010 y ADR-011), no con una votación.
- Por qué este y no otro: es el único repo donde cada eslabón tiene un archivo propio con enlaces entre sí, y las dos imágenes se pueden mostrar. Fuentes: BluzBrothers: `ArchitectureCharacteristics/Characteristics.md`, `ArchitectureCharacteristics/images/characteristics.png`, `components-sticky-cards.png`, `chosen-architecture.png`, `ADR/ADR-010`, `ADR-011`, `ADR-012`.

**T0-B · Pragmatic: tres dificultades del problema eligen tres características**

- El caso: ClearView, una organización sin fines de lucro, quiere un sistema que anonimice currículos con IA y los empareje con vacantes; lo financian donaciones.
- La situación: 12 características candidatas, 7 que importan, y hay que elegir 3. [DATO] Characteristics.md ("Selecting the Top 3") no usa una tabla de pesos: usa tres problemas del caso: (1) la IA introduce un comportamiento no determinista, (2) "ClearView, as a nonprofit organization using AI, faces the risk of excessive costs", (3) integrar muchos sistemas de RR. HH. es costoso porque cada API es distinta.
- Qué decidió [DATO]: dificultad 1 a Testability; dificultad 2 a Feasibility; dificultad 3 a Interoperability. Security, la propuesta de valor, queda como característica implícita (la hoja marca la flecha de Security a "implicit"). Estilo: service-based con event-driven donde hace falta (ADR-002); se descartó microkernel por escalabilidad y tolerancia a fallos, "two of our top 7 driving characteristics".
- Costo admitido [DATO]: ADR-002 lista "Weakened characteristics: Elasticity (due to shared databases between servuces)".
- Alternativas: la hoja de estilos de la imagen `ADR-002-architecture-style.png` marca service-based y event-driven. Mi lectura: con la regla de la hoja ("cost" y "simplicity" cuentan 0,5 como sustituto de feasibility), microkernel suma más que service-based con las tres filas top (mía: 10,5 frente a 9,5). El ADR lo descarta con las siete, no con las tres. Es un caso donde la elección sale de la lista de 7 y no de la de 3.
- Qué enseña: cómo se encuentra cada característica en el problema (una dificultad concreta del caso, no una lista genérica), y que las tres top y las siete no siempre apuntan al mismo estilo.
- Fuentes: Pragmatic: `ArchitectureCharacteristics/Characteristics.md`, `ADR/ADR-002-architecture-style.md`, `ADR/images/ADR-002-architecture-style.png`, `ArchitectureCharacteristics/images/architecture-characteristics.png`, README "Architecture Characteristics".

**T0-C · Archangels: el estilo elegido le falla a dos de las tres características, y lo dicen**

- El caso: Farmacy Family, una red social de salud y alimentación que debe integrarse con Farmacy Foods, nutricionistas y clínicas.
- La situación: tabla "Selected Architecture Characteristics" con columna "Source": por ejemplo Authorisation "although normally an implicit architecture characteristic (see below) this is promoted here" porque nutricionistas y clínicas necesitan permiso del cliente para ver datos médicos.
- Qué decidió [DATO]: top 3 = Interoperability/Integration, Configurability, Authorisation. Compararon dos estilos con la hoja de Richards (sin Data Integrity, que no tiene fila, y la mandan a la elección del almacén de datos). Microservicios puntúa bajo en configurability, workflow, cost y simplicity y exigiría partir la base. Event-driven puntúa bajo en interoperabilidad y configurabilidad. Eligieron event-driven: "Both architecture options have trade-offs, but the trade-offs for the Event-Driven architecture are lower overall."
- Costo admitido [DATO]: ADR-002: "Interoperability and configurability may still be high trade-offs after mitigation." Mitigación escrita: interoperabilidad con una capa de interfaz (ADR-018), configurabilidad "of the profile" y no del sistema.
- Qué enseña: que se puede elegir un estilo que no maximiza las top 3 si se escribe qué se pierde y cómo se mitiga. Es el ejemplo mejor de "decidir con la renuncia a la vista".
- Fuentes: Archangels: `1.ProblemBackground/ArchitectureAnalysis.md`, `2.SolutionBackground/ArchitecturePatterns.md`, `4.ADRs/002-We-will-use-an-event-driven-backend-architecture.md`.

**T0-D · Donde se corta la cadena (para mostrar el último eslabón)**

- Pragmatic: ADR-008 cita "Q26" y ADR-010 cita "Q4"; el documento de requisitos termina en Q16, y su regla de numeración dice que al borrar un requisito se deja un hueco. El requisito de la decisión no se puede comprobar. [DATO] `Requirements/requirements-and-assumptions.md`, `ADR/ADR-008-ui-reactivity.md`, `ADR/ADR-010-...`.
- ArchColider: 6 de los 10 requisitos arquitectónicos no tienen ADR y ningún ADR cita un requisito. [DATO, ficha y búsqueda propia] `1.ProblemBackground/BusinessDrivers.md`; `The Script.md` dice "Requirements traceability is key!" y no hay matriz.
- Team 7: ADR-5 cita UC-2, UC-3, UC-4 y UC-7, y ningún ADR cita QA-n.
- Contraste: Five Nines. ADR-0020 copia en su contexto las líneas de NFR_9 y FR#2M. Sirve para mostrar cómo se ve un ADR que dice qué requisito lo pide (y que las cifras difieren entre documentos: NFR_9 85 % de precisión, FR#2M 80 % de detección, la narración del video "≥ 93 % precision").

### T7 (renunciar)

**T7-A · BluzBrothers: ADR-008, 009, 010 (tres renuncias con tres razones distintas)**

- El caso y la situación: ver T0-A. Con 9 características en juego, tres quedan fuera del top y cada una tiene su ADR.
- Qué decidió y por qué [DATO]:
  - Scalability (ADR-008): rebajada porque "the maximum load has already been defined" (Characteristics.md): 500 pacientes por instalación en los requisitos, y el sistema es local; agregar sensores se resuelve "manually" con nodos o hardware. Costo: "Limitation in easy migration to a cloud-based environment due to the on-premises installation."
  - Deployability (ADR-009): "the system will be installed only once per hospital, without the need for migrations". Costo: dificultad de migrar a la nube.
  - Availability (ADR-010): sale de la elección de estilo y se resuelve "at the instance level", duplicando instancias. Costo: "Excluding availability as an architectural criterion may overlook potential architectural optimizations related to ensuring system availability."
- Después, la disponibilidad se paga en otra parte [DATO]: ADR-018 (al menos 3 pods con Kubernetes), ADR-020 (todas las instancias duplicadas, "new instances will be raised within a maximum of 30 seconds"), ADR-016 (alertas por dos canales: "the unavailability of one data receiver will trigger notifications on the other").
- Lo que hay que decir con cuidado [DEDUCCIÓN]: la renuncia a la escalabilidad es de la elección de estilo. El diseño final sí escala: Sizing.md reparte 25 estaciones entre 3 instancias de Streamer. Y hay una tensión interna: el mismo Characteristics.md justifica Elasticity (top 3) con "additional sensors may necessitate additional nodes or hardware", que es la misma razón con la que ADR-008 rebaja Scalability.
- Qué enseña: una renuncia útil nombra la condición del negocio que la hace segura (carga máxima fijada, instalación única), el costo que paga (la nube) y dónde se resuelve lo que se renuncia (disponibilidad en la infraestructura). Distingue "sacar de la elección del estilo" de "no importar".
- Por qué este y no otro: es el único con la renuncia, la razón, el costo y la cifra de comprobación (T7 + E1) en el mismo repo.
- Fuentes: BluzBrothers: `ADR/ADR-008`, `ADR-009`, `ADR-010`, `ADR-016`, `ADR-018`, `ADR-020`, `ArchitectureCharacteristics/Characteristics.md`, `Deployment/Deployment.md`.

**T7-B · Pegasuz: cuántos nueves, y por qué menos de los que se piden siempre**

- El caso: Spotlight, una plataforma que conecta candidatos de poblaciones subrepresentadas con organizaciones sin fines de lucro (ONG) en EE. UU.
- La decisión [DATO] README "Availability": como Spotlight "is not a public safety or mission critical (dealing with lives or money directly) platform", 5 nueves ("99.999% - 5.2 minutes of downtime per year") es "unreasonable" y 4 nueves "an overkill". Objetivo: 3 nueves para los quanta sin dependencias síncronas (reportes y analítica) y 4 para los que las tienen (notificaciones). Las dos cifras de minutos por año cuadran (mías: 5,26 y 52,6 minutos).
- Segunda renuncia [DATO]: en Chat y en Notification, una sección "Characteristics that we do not need as we offloaded to 3rd party vendors" (seguridad, escalabilidad, disponibilidad, responsividad en Chat: "Service highly depends on third party service for uptime"). Es renunciar porque se compró (se cruza con ADR-003, build vs buy).
- Tercera, en el tiempo [DATO]: `quanta/npo-candidate.md` marca "Availability (Post MVP)" y pone "Feasibility (cost & time, in MVP)" como la primera de las top: "quick market validation of the idea is paramount". Estilo en el MVP: monolito modular; después, microservicios.
- Costo admitido [DATO]: consistencia eventual aceptable porque "the system is not dealing with mission critical information (such as affecting human life / money)"; "Event driven + microservices is a costly architecture."
- Qué enseña: la razón para bajar un número de disponibilidad es la consecuencia del fallo (vidas, dinero), no la preferencia. Se puede variar el objetivo por parte del sistema, y se puede renunciar "por ahora" (Post MVP).
- Límite: el repo no calcula cuánto cuesta más pasar de 3 a 4 nueves; la renuncia se justifica con razón, no con cifra de costo.
- Contexto de comparación (cifras de otros repos, ver sección 4).
- Fuentes: Pegasuz: README "Availability"; `quanta/chat.md`, `notification.md`, `npo-candidate.md`; `ADRs/003.adr-build-vs-buy.md`; `ADRs/007.adr-arch-style-np-candidate-mvp.md`.

**T7-C · Data Alchemists: Elasticity frente a Evolvability**

- El caso: Road Warrior, un panel de viajes para 15 millones de usuarios registrados y 2 millones activos por semana, de una startup (kata de 2023).
- La situación [DATO]: 3 características top marcadas (Performance, Scalability, Evolvability) y Elasticity sin marca. "when faced with the choice between Elasticity and Evolvability, the team opted for the latter." Razón: "as a startup, the ability to adapt to user feedback and market dynamics is paramount."
- Lo que viene con eso [DATO]: el mismo documento usa Kubernetes con escaladores automáticos "for meeting our scaling and elasticity requirements" (deployment) y el viewpoint de concurrencia dice que la solución facilita elasticity.
- Qué enseña: "elasticity no es top 3" no significa "el diseño no escala con la demanda"; significa que cuando dos características compiten por la estructura (estilo, partición), la estructura sirve a Evolvability. Elasticity la cubre la infraestructura.
- Límite [HUECO]: ningún ADR registra esta renuncia; ADR-1 (estado "Proposed") lista solo tres características y no menciona Elasticity ni su costo. La razón vive en un párrafo del README.
- Por qué lo incluyo: es el único caso de empate entre dos características por escrito, con la razón (un negocio de startup).
- Fuentes: Profitero-Data-Alchemists: README "Driving characteristics"; `adrs/adr-1-architecture-style.md`; `deployment_viewpoint/README.md`; `concurrency_viewpoint/README.md`.

**T7-D · ArchColider: cuatro pares "a cambio de" y una disponibilidad por reinicio**

- El caso: Farmacy Food, una cocina "fantasma" con refrigeradores inteligentes y una app de pedidos. Restricciones (`Constraints.md`): equipo limitado, salida al mercado crítica, AWS, presupuesto muy limitado ("drives all trade-off decisions").
- Qué decidió [DATO] `Tradeoffs.md`: (1) el catálogo "sacrifices accuracy for availability at the time of browsing": el catálogo se guarda en el dispositivo y el stock real se verifica al iniciar el pago; (2) event sourcing: "we trade simplicity and storage space for history and operations visibility"; (3) "trade-off performance on the backend for data integrity"; (4) usar un proveedor de pagos en vez de integrar tarjetas, con la salida de migrar después paso a paso.
- Disponibilidad [DATO] `SystemAppoach.md`: "Availability should be solved with restarts and vertical scale", y "In later stages it might become more important and other architectural tactics will be involved." Explicación: "service restarting, short outage and so on is still possible".
- Qué enseña: renuncias escritas como pares (lo que se deja, lo que se compra), con la razón en la restricción del negocio. Y que se renuncia "por ahora" y se dice qué cambiaría (T1).
- Fuentes: ArchColider: `2.SolutionBackground/Tradeoffs.md`, `2.SolutionBackground/SystemAppoach.md`, `1.ProblemBackground/Constraints.md`.

Nota para el guion: renuncias más pequeñas del mismo tipo, por si hace falta un ejemplo corto: Team 7 ADR-3 (asignación de tickets por lote, "Robustness is over performance here", con la razón "they don't expect that an expert be waiting behind the door in a next minute" y el costo: el trabajo puede no arrancar y "will require additional monitoring"); ConnectedAI ADR-004 (sesión en memoria); Pragmatic ADR-004 (Data integrity).

### T6 (costo con supuestos)

**T6-A · ArchColider: una tabla de costo con tres escenarios, y lo que muestra**

- El caso y la situación: presupuesto "very limited"; hay que elegir infraestructura. [DATO] CostAnalysis.md: "Provided costs are estimated base on the list of assumption mentioned below and projection of user growth and traffic they might generate." Supuestos: 10 000 usuarios, imágenes de 4 MiB, 10 % escribe reseñas y 5 % envía feedback, tráfico uniforme y sin compresión (lo dice, y dice que con GZIP bajaría).
- Qué hicieron [DATO]: tres escenarios por solicitudes por día: MIN 500, PROJECTED 1 000 y RAPID 10 000. Cuenta por servicio con precio unitario: EC2 8 instancias × 0,0376 USD × 730 h = 219,58 USD, más 40 USD de disco; Amazon MQ; S3; DynamoDB; Kafka administrado; Tableau; DataDog; SNS. Total anual: 12 247,57 / 12 548,17 / 22 480,57 USD (reproduje las sumas: coinciden).
- Lo que muestra la tabla (cuentas mías): 20 veces más tráfico (de 500 a 10 000 solicitudes por día) cuesta 1,84 veces más (22 480,57 / 12 247,57). En el escenario MIN, DynamoDB, Tableau y DataDog suman 7 848 USD de 12 247,57 (64 %), y no dependen del tráfico. Duplicar el tráfico (MIN a PROJECTED) sube el costo 2,5 %. Lo que decide el costo no es el volumen sino lo que se paga fijo.
- Costos y errores [DATO + cuenta mía]: (a) en la tabla de resumen, las filas Tableau y DataDog tienen los números cambiados: la fila Tableau muestra 1 440 / 1 440 / 2 880 USD, que son 120 × 12 y 240 × 12 (DataDog), y la fila DataDog muestra 3 336, que es 278 × 12 (Tableau); los totales no cambian. (b) DynamoDB se estima en 1 TB (256 USD/mes) mientras la proyección de la base es de 3,96 GiB por mes; la relación no se explica. (c) Las imágenes: 16 GiB por mes de almacenamiento no salen de los porcentajes escritos (10 % + 5 % de 10 000 usuarios a 4 MiB da unos 5,9 GiB; cuenta mía). (d) El Application Load Balancer y la salida de datos quedan en "TBD". (e) La estimación de Kafka es "a very rough approximation" y usa 1 000 registros por minuto, mientras el resto usa 1 000 solicitudes por día.
- Cuál fue la decisión de producto detrás [DATO]: "In rare cases we decided to pick more expensive solutions the reason for that was convenience of chosen service to exceed its monetary value."
- Qué enseña: cómo se escribe una estimación (supuestos arriba, escenarios, unitario × cantidad = total), y que la tabla revela qué parte del costo es fija. La verdad para el espectador: una estimación con supuestos a la vista se puede revisar y corregir.
- Fuentes: ArchColider: `3.ViewsAndPerspectives/CostAnalysis.md` (hay una hoja `docs/Data&PayloadsEstimates.xlsx` enlazada; no la abrí).

**T6-B · ZAItects: el costo calculado en horas de experto**

- El caso: Certifiable Inc. certifica 200 candidatos por semana con 300 arquitectos expertos que corrigen; espera entre 5 y 10 veces más demanda. Quiere usar IA generativa para corregir.
- La situación [DATO] README y cost-analysis.md: Test 1 lleva 3 horas de corrección por candidato; pasan al Test 2 los que sacan 80 % o más, y ese lleva 8 horas. 200 × 3 = 600 horas; 200 × 0,8 × 8 = 1 280 horas; total 1 880 horas por semana. A 50 USD/h (README), 94 000 USD, es decir 470 USD por candidato. Con 10x: 18 800 horas y 940 000 USD.
- Qué decidió [DATO]: un híbrido, con IA corrigiendo y expertos revisando una parte. Supuesto central: "Assuming 20% of candidate's submissions involve human evaluation". Costo de la IA: llamadas por candidato × candidatos × (tokens de entrada × precio + tokens de salida × precio), con 10 llamadas por entrega del Test 2 y 2 000 tokens de entrada y de salida. Resultado a 10x: 190 700 USD por semana, unos 95 USD por candidato frente a 470.
- Lo que hay que ver (cuentas mías): el costo de IA es 1,35 USD por candidato (0,15 USD por llamada × (1 + 10 × 0,8)), 1,4 % del total. El resultado depende del factor de revisión humana: con 0,5 en vez de 0,2 el costo por candidato sube a unos 236 USD, y solo con revisión humana de casi todo (factor cerca de 1) la IA deja de ahorrar. El documento no hace esa prueba de sensibilidad; dice que el 0,2 "is expected to come down further".
- Errores internos [DATO]: (a) el texto dice que a 10x "expert costs exceed $1M" y su tabla da 940 000 USD; (b) la tabla de revisión con IA da 94 500 USD para 1 880 horas y la tabla total usa 94 550 (a 50 USD/h serían 94 000); (c) el archivo de requisitos del Test 2 da "$960K-$1.2M per week" para 1 200 a 1 500 evaluaciones de 8 horas, que implica 100 USD/h y no 50; (d) los precios por token que escribe (0,000015 y 0,00006 por token, o sea 15 y 60 USD por millón) se presentan como "around the same as" o3-mini; esas tarifas me parecen muy superiores a las públicas de o3-mini, que recuerdo en 1,10 y 4,40 USD por millón (dato de fuera del repo, a verificar). Si fuera así, la estimación sobreestima el costo de IA y la conclusión no cambia por el 1,4 %.
- Qué enseña: cuando el costo dominante es humano, la estimación va en horas. Y la sensibilidad: qué supuesto mover para romper la conclusión.
- Fuentes: ZAItects: `other_design_docs/cost-analysis.md`, README "Challenges in Expansion Plans" y "Business outcomes", `business-requirements/case-study-grading-business-requirements.md`, `short-answer-grading-business-requirements.md`.

**T6-C · Pragmatic: el costo de la IA decide una característica top**

- El caso: ClearView (ver T0-B). Cada currículo se transforma en un "story" anonimizado con un LLM.
- La cadena [DATO]: entrevista con un experto en IA (`interview-ai-expert.md`): un proyecto "where 500'000 prompts resulted in a 500'000 USD bill" y una tarifa plana que él escuchó de "60'000 / month" → token-estimation.md (prompt de ~850 tokens, respuesta de ~400 palabras, ~1 400 tokens; 0,025 USD con GPT-4o y 0,001 con GPT-4o mini por prompt y respuesta; "Leading to assumption A24") → A24 ("varies greatly with prompt size and model choice"), A25 ("LLMs are the biggest technical cost driving factor"), A26 (fondos de ONG difíciles "if the estimation of cost varies highly") → Feasibility como característica top → ADR-007 (usar LLM externos; "Cost is more predictable") y ADR-011 (emparejamiento determinista).
- La cuenta que el repo deja sin hacer [mía, solo orden de magnitud]: A17 supone 25 000 aperturas al mes y "around the same number of active job candidates". ADR-011 dice que con las opciones A y B el número de prompts crece como n + m y con las otras opciones, de forma cuadrática. Con 25 000 y 25 000, n + m son 50 000 prompts y n × m son 625 millones (suponiendo un prompt por elemento o por par y el mismo precio). A 0,001 USD son unos 50 USD frente a 625 000 USD; a 0,025 USD son 1 250 frente a unos 15,6 millones. El ADR escribe la razón (opción F "too computationally expensive") sin la cuenta.
- Observación [DEDUCCIÓN]: el repo no escribe las tarifas por token. Los 0,025 USD de GPT-4o solo cuadran con 5 y 15 USD por millón (entrada y salida), y los 0,001 de la versión mini con unos 0,15 y 0,60 USD por millón; la fecha del archivo guardado es 2024-09-29.
- Costo admitido [DATO]: ADR-007: "Need to somehow track rate to avoid surpassing rate-limit (currently not solved...)". Q12 está escrito al revés: "LLMs should not be used only where needed and with intention".
- Qué enseña: cómo un requisito de costo (donaciones) se convierte en una característica (Feasibility) y de ahí en dos decisiones, con la estimación como eslabón. Y que la estimación se queda corta si no se multiplica por el volumen.
- Fuentes: Pragmatic: `Requirements/Research/token-estimation.md`, `interview-ai-expert.md`, `requirements-and-assumptions.md` (A17, A24 a A26, Q12), `ADR/ADR-007`, `ADR/ADR-011`.

Cuarto caso, solo como advertencia: monArch estima 2 780 USD al mes para 50 000 usuarios activos con la fórmula "450 + 1000 + 1260 = $2780" (la suma da 2 710; con los 70 USD de Pub/Sub Lite da 2 780), y antes avisa que el costo real "can only be determined after building and staging the services". Fuente: monArch: `Readme.md` "Cost Analysis".

### E1 (estimar la carga y comprobar)

**E1-A · BluzBrothers: el presupuesto de 693 ms**

- El caso y la situación: el requisito es "an average response time of 1 second or less" desde el sensor hasta la pantalla de la estación. El equipo lo trata como una función de aptitud (fitness function): una cuenta que dice si el diseño aguanta.
- La cuenta [DATO] Sizing.md, en orden:
  1. Frecuencias de los 8 sensores (2 por segundo el corazón, 1 la respiración, 1 el ECG, 0,2 el oxígeno y cuatro casi nulos): 4,22 señales por segundo por paciente.
  2. Pico asumido de 8 por paciente, 500 pacientes, 1 kB por señal: 4 000 señales/s y 4 MB/s. Texto: el sistema "MUST be ready to process 4000 signals in one second".
  3. Base de datos: con un benchmark de otro producto (237 871 eventos/s), 4 000 eventos/s caben en 16 ms. "the final decision which database to use, will be taken later".
  4. Kafka: 5 ms en la tabla (4 ms en el texto).
  5. Red de 1 Gb/s: 4 MB tardan 32 ms.
  6. 3 instancias de Streamer y 25 estaciones: 8,33 conexiones por instancia; 20 pacientes × 8 sensores = 160 señales/s por conexión; "If we assume that processing 1 signal takes 2 milliseconds", 320 ms. El Recorder se supone igual: "the amount of data is exactly the same as the Streamer process".
  7. Suma: 320 + 320 + 16 + 5 + 32 = 693 ms.
- Qué decidió el equipo [DATO]: marcó la función como "Success" en la tabla del README.
- Lo que la cuenta enseña (cuentas mías):
  - Cuatro sensores (corazón, respiración, ECG, oxígeno) producen 4,2 de las 4,22 señales por segundo: el 99,5 %. Los otros cuatro (presión, glucosa, temperatura, sueño) producen el 0,5 %.
  - Las dos etapas de procesamiento suman 640 ms de los 693 (92 %); base de datos, Kafka y red suman 53 ms (8 %). Las partes sobre las que se discute (la base de datos, el broker, la red) casi no pesan; el supuesto que pesa es "2 milisegundos por señal", que no tiene fuente.
  - Punto de quiebre: con más de unos 2,96 ms por señal, la suma pasa de 1 000 ms (resolviendo 2 × 160 × t + 53 = 1 000). La cuenta dice qué número hay que medir antes de seguir.
  - La cuenta es conservadora en un punto: el diagrama de secuencia (US1) dice que el Recorder guarda en la base y publica en Kafka "in parallel", y Sizing.md suma los 16 ms de la base como si fueran en serie.
  - Compara el pico (8 por paciente) con un requisito de promedio; el 8 no se explica ([HUECO]).
- Límites [HUECO / DATO]: nada se midió; es papel. Las otras dos funciones de aptitud (Alerts.md y Failover.md) no tienen cifras: son recorridos escritos del flujo de datos, y Alerts.md termina con "a near 100% uptime guarantee for the system" sin cuenta. Y la prioridad (Availability, Performance, Elasticity) se prueba con tres funciones, de las cuales solo una es numérica.
- Qué enseña: cómo bajar una frase de requisito a un presupuesto por etapa con cada supuesto escrito, y cómo la cuenta señala el supuesto que decide.
- Fuentes: BluzBrothers: `FitnessFunctions/Sizing.md`, `Business/Requirements.md`, `UseCases/US1-monitor.md`, `Deployment/Deployment.md` (3 pods), `README.md` "Fitness functions".

**E1-B · Five Nines: la frecuencia de telemetría que dice 30 minutos y 30 segundos**

- El caso: MobiCorp, una empresa de movilidad en la UE (autos, bicicletas y scooters eléctricos) con una plataforma de IA.
- Lo que escribe [DATO]: flota promedio "200 cars/vans, 500 bikes, and 5,000 scooters ... per city" (Assumptions), pero ADR-0022 dice "Scooters (5,000/country) vs cars (200/country)". Telemetría: Assumptions: "GPS tracker shares information with the central or regional server every 30 min"; ADR-0021 repite "every 30 min only"; pero Appendix A dice "every 30 seconds via Pub/Sub", y el Domain Model y el diagrama de secuencia también usan 30 segundos. NFR_1: "10,000+ concurrent rentals", "500 searches/sec peak load". ADR-0002: "thousands to tens of thousands of devices".
- Lo que implica (cuentas mías): con 5 700 vehículos por ciudad, 30 s son 190 mensajes por segundo por ciudad y 30 min son 3,2: una diferencia de 60 veces. Con 10 000 dispositivos activos, 333 mensajes por segundo frente a 5,6. Ningún documento hace esa cuenta, y la decisión de ADR-0002 (clúster MQTT y Pub/Sub) está justificada sin cifras.
- Otro dato: la narración del video escribe "< €0.30 per vehicle" para un costo de ~9 000 €/mes, lo que implica más de 30 000 vehículos (mío), o sea más de 5 ciudades; el número de ciudades no se escribe en el repo.
- Qué enseña (como contraste): lo que cuesta no convertir los supuestos en una cuenta. Los números de carga existen, pero dos documentos los contradicen y la contradicción pasa sin que nadie la note. Sirve para mostrar por qué escribir el supuesto en un solo lugar.
- Fuentes: Five Nines: `requirements/4_Assumptions and constraints.md`, `requirements/Appendix A_ Core functionality.md`, `hld/core-func/car-van-rental/3_Domain_Model.md`, `4_Sequence_Diagram.md`, `adrs/ADR-0002`, `ADR-0021`, `ADR-0022`, `video/narrative.md`.

**E1-C · Data Alchemists y Pegasuz: números de carga escritos sin cuenta**

- Data Alchemists: "Handle reservations from 15M users, with 5 or even 10 active reservations each, which result in 150M reservations to be refreshed every 5 minutes." Mi cuenta: 150 millones cada 300 segundos son 500 000 actualizaciones por segundo. El repo no hace la cuenta; decide Kafka y MongoDB partidos por la misma clave (ADR-10) y 3 grupos de escalado (ADR-8) sin una cifra de partes. La pregunta 8 de los organizadores en la sesión de preguntas es relevante: "would a monolithic system easily scale to 1 million users?"
- Pegasuz: tabla de capacidad a 3 meses, 6 meses, 1, 2 y 3 años. Dos inconsistencias [DATO + cuenta mía]: el análisis dice que con 0,5 % de adopción habría "100k NPOs and 500k under-represented folks" en 1 a 2 años, pero 0,5 % de 1,6 millones de ONG son 8 000, y la tabla pone 25 000 a 50 000 ONG a los 2 años y 100 000 a los 3.
- Qué enseña: cómo un número sin cuenta no sirve para comprobar ni decidir, y qué se ve cuando alguien rehace la cuenta.
- Fuentes: Data Alchemists: README "Non-functional Requirements", `requirements/original_requirements.md`. Pegasuz: README "Assumptions", `other-artifacts/Requirement-analysis.md`.

---

## 4. Decisiones contrarias

- **Cuántos nueves de disponibilidad (T7).** Mismo requisito, objetivos distintos según la consecuencia del fallo: Data Alchemists fija 99,99 % ("5 minutes per month of unplanned downtime" en el requisito del kata) y lo paga con multi-zona (ADR-13) y Kubernetes; Pegasuz fija 3 a 4 nueves y dice que 4 es excesivo; ArchColider resuelve la disponibilidad con reinicios y escala vertical por ahora; Team 7 escribe 99,9 % con "seems reasonable here"; Five Nines tiene 99,5 % en NFR_2 y 99,9 % en ADR-0002 y en los objetivos de negocio. BluzBrothers (vidas en juego) no pone un número de disponibilidad, la saca de la elección del estilo y la paga duplicando todo con recuperación en 30 s. Presupuesto de caída por mes (míos, mes de 30,4 días): 99,5 % son 3,65 h; 99,9 %, 43,8 min; 99,99 %, 4,4 min; 99,999 %, 26 s. Muestra de qué depende la verdad: del costo de que el sistema esté caído.
- **Poner cada característica en la lista o dejarla implícita (T7).** Five Nines lista 12 NFR sin orden y CELUS Ceals 9 principios sin orden; BluzBrothers y Pragmatic bajan características con ADR propio. Los primeros evitan renunciar; los segundos pueden decir qué se paga. Ningún repo muestra un daño concreto por listar todo. Lo que el repo sí permite afirmar [HUECO]: en Five Nines las 12 NFR no traen orden, así que ninguna decisión puede citar una prioridad escrita.
- **Elegir el estilo contra el puntaje (T0).** monArch usa microservicios aunque su propia hoja los puntúa bajo en Performance (una de sus tres): "this performance penalty is applicable to the entire system" y no a cada servicio. CELUS Ceals elige microservicios por 20 puntos frente a 15 y 8 y anota "lacks simplicity". Pragmatic descarta el microkernel por dos de sus 7 características aunque (según mi lectura) puntúa más en las tres top. Muestran que la cadena es una guía con excepciones, y que la excepción se escribe.
- **Autogestionar por costo (T6).** Data Alchemists elige Kafka y MongoDB autogestionados por "cost savings"; Pragmatic elige LLM externos y paga más por prompt a cambio de menos personal y hardware (ADR-007: "Cost is more predictable"). Mismo criterio de costo, direcciones contrarias, ninguno con cifra comparada (el segundo, al menos, enumera tres alternativas con sus costos cualitativos).
- **Renunciar por comprar (T7).** Pegasuz renuncia a seguridad, escalabilidad y disponibilidad en Chat porque las compra a un proveedor. Pragmatic, con IA externa, deja Observability y Deployability como características "Weakened" en ADR-007. Es el costo de comprar: lo que se renuncia pasa a depender de otro.

---

## 5. Límites

- **Todos son diseños en papel.** Ningún repo midió latencia, carga ni costo en producción. Sizing.md usa un benchmark ajeno y un supuesto de 2 ms por señal que nadie midió; ArchColider, ZAItects y monArch usan precios de lista. Las funciones de aptitud de BluzBrothers están marcadas "Success" sin haber corrido nada.
- **El método viene de una fuente común.** La hoja de estilos y la regla de "tres características principales" son material de Richards y Ford (ver T0); los repos las usan como método de la comunidad. Que doce equipos coincidan no prueba que la cadena sea el único camino; prueba que es el método que enseñan los organizadores. No cuenté cuáles citan el libro más allá de los casos listados (Archangels cita la hoja, monArch el libro, Pragmatic y BluzBrothers usan las hojas con su formato).
- **Parte de la evidencia de T0 son imágenes.** Las notas de BluzBrothers y las hojas de Pragmatic las leí como imágenes; las de Pegasuz, Data Alchemists y otros repos de solo texto no están disponibles aquí. Las sumas de estrellas de estilos distintos del elegido son lectura mía.
- **La cadena no está trazada de punta a punta en ningún repo.** Ninguno tiene una matriz requisito → característica → ADR → prueba (lo dicen las fichas y lo confirmé en ArchColider, Team 7, Pragmatic, ZAItects, Data Alchemists, monArch y CELUS Ceals).
- **Las "renuncias" de IA y de compras son pocas.** T7 en Pegasuz mezcla lo bien dicho con lo contradictorio: `quanta/meetings.md` pone Feasibility, Recoverability y Availability bajo "Characteristics that we do not need as we offloaded to 3rd party vendors", y el texto de cada una dice lo contrario ("must be available at all times", "building it as part of the MVP is inevitable"). No se puede citar Meetings como renuncia.
- **ZAItects no declara renuncias**: solo marca implícitas. Five Nines no declara ninguna.
- **No sé de dónde sale cada número de partida.** BluzBrothers (8 señales en el pico), ZAItects (factor de revisión de 0,2), Pragmatic (tokens por currículo) y ArchColider (1 TB de DynamoDB) escriben el número sin fuente o sin derivación.
- **Cifras de fuera del repo.** La afirmación sobre las tarifas por token de o3-mini y las de GPT-4o que menciono salen de lo que recuerdo, no del repo; hay que verificarlas antes de usarlas en pantalla.
- **ADR "Proposed".** Los ADR de Data Alchemists y el ADR-007 de Pegasuz tienen estado "Proposed"; no son decisiones aceptadas sino propuestas.

---

## 6. Para elegir el elenco

**Pragmatic**
- T0: muy bien, con una condición. Tiene la cadena con una razón concreta por característica (tres dificultades del problema), un ADR propio de renuncia (ADR-004), un ADR con "weakened characteristics" (ADR-002) y la hoja de estilos como imagen. Pierde en el último eslabón (IDs de requisito inexistentes).
- T7: bien (cuatro características reducidas con razón, ADR-004). El costo escrito de la renuncia en ADR-004 es corto y el tercer argumento ("Data integrity is not included ... in the architecture style worksheet") depende de la hoja, no del problema.
- T6: es el mejor para costo de IA (entrevista, tokens, supuestos A24 a A26, y de ahí a ADR-007 y ADR-011). Le falta la multiplicación por el volumen. Esa cuenta se puede mostrar en pantalla como la que el equipo dejó sin hacer.
- E1: parcial.
- Si es caso principal: conviene para T0, T6 y T7; E1 habría que cubrirlo con otro repo.

**Five Nines**
- T0: la cadena más trazable (NFR_9, FR#2M, ADR-0020, SD-003), pero sin prioridad entre las 12 NFR, y con cifras que cambian entre documentos.
- T7: no lo ilustra (lista todo). Sirve de contraste.
- T6: débil (techos por unidad, tabla de costo en el video).
- E1: números de carga abundantes y contradictorios (30 min frente a 30 s, ciudad frente a país): sirve como ejemplo de lo que pasa cuando no se hace la cuenta, no como ejemplo de comprobación.
- Si es caso principal: no cubre R1 por sí solo. Sirve para T0 (cadena con IDs) y para el tema de datos y cifras que no cuadran.

**Mejor que ambos para R1**
- **BluzBrothers**: el único con T0, T7 y E1 en una misma historia (de "1 segundo" y 500 pacientes a tres características, tres renuncias con ADR y un presupuesto de 693 ms). Lo recomendaría como caso de R1, aunque su sustento en el resto del curso sea más débil.
- **ArchColider**: el mejor de T6 (tres escenarios con cuenta completa y errores que se pueden encontrar) y buen T7 (`Tradeoffs.md`).
- **Pegasuz**: el mejor de T7 sobre disponibilidad (razón de negocio, número y por parte del sistema) y de requisito → NFR con una tabla.
- **ZAItects**: el mejor ejemplo de costo cuando lo que se estima no son servidores sino horas, y de sensibilidad que falta.
- **Archangels**: el mejor de "el estilo elegido pierde en dos de las tres top y lo dice".
- **Data Alchemists**: el único empate entre dos características (Elasticity y Evolvability), útil en un minuto.

Resumen para R1 [DEDUCCIÓN, sobre la evidencia de este dossier]: el hilo de R1 podría salir de BluzBrothers (cadena y presupuesto), con Pragmatic o ArchColider para el costo y Pegasuz para la renuncia por disponibilidad. Ninguno de los dos candidatos a caso principal cubre R1 de punta a punta.

---

## 7. Términos que hay que explicar

- **Característica de calidad (architecture characteristic, "-ility", requisito no funcional):** una propiedad del sistema que no es una función, como la velocidad, la disponibilidad o la facilidad para cambiarlo.
- **Característica "driving" o "top 3":** las pocas características que más pesan en la decisión de arquitectura. La hoja de trabajo pide como máximo siete, y de ellas tres.
- **Característica implícita:** la que todo sistema necesita (seguridad, por ejemplo) y no se discute, salvo que se vuelva crítica.
- **Estilo de arquitectura:** una forma general de organizar el sistema (monolito modular, servicios, microservicios, orientado a eventos).
- **Hoja de estilos (Architecture Styles Worksheet):** una tabla que califica con estrellas cada estilo en cada característica; se suman las filas elegidas.
- **ADR (Architecture Decision Record):** una nota corta que registra una decisión, su contexto, las alternativas y las consecuencias.
- **Event storming:** una sesión de pared con notas adhesivas en la que se listan los eventos del negocio para encontrar sus partes.
- **Quantum de arquitectura:** una parte que se despliega sola y tiene sus propias características (lo usa Pegasuz).
- **Escalabilidad / elasticidad:** la primera es aguantar más carga; la segunda, ajustar los recursos cuando la carga sube y baja.
- **Evolvability (evolucionabilidad):** la facilidad para cambiar el sistema con el tiempo.
- **Disponibilidad y "nueves":** el porcentaje del tiempo en que el sistema funciona. 99,9 % deja unos 44 minutos de caída al mes; 99,99 %, unos 4.
- **Fitness function (función de aptitud):** una prueba o cuenta que dice si el diseño cumple una característica.
- **Presupuesto de latencia:** repartir el tiempo máximo permitido entre las etapas por las que pasa un dato.
- **Pico y promedio:** la carga máxima frente a la media; el diseño se dimensiona con el pico.
- **Throughput (rendimiento en señales por segundo):** cuántos elementos se procesan por unidad de tiempo.
- **Broker de mensajes (Kafka) y Pub/Sub:** un intermediario que recibe mensajes y los entrega a quien los espera.
- **Base de series de tiempo (InfluxDB):** una base pensada para datos con marca de tiempo, como las lecturas de sensores.
- **LLM, token, prompt:** un modelo de lenguaje, la unidad en que cobra y mide (más o menos una palabra o fragmento) y el texto que se le envía.
- **Complejidad O(n+m) frente a O(n·m):** si el trabajo crece sumando los elementos de dos listas o multiplicándolos.
- **Escenario de costo y TCO (costo total de propiedad):** supuestos de volumen con su costo, a un año.
- **Instancia, pod, Kubernetes:** una copia del programa en ejecución; la unidad que corre en Kubernetes; el sistema que arranca y reemplaza copias.
- **Fuera de alcance:** lo que el diseño declara que no resuelve.

---

## 8. Qué se puede mostrar en pantalla

| Qué | Fuente |
|---|---|
| El enunciado con notas pegadas a cada frase: "average response time of 1 second or less" → Performance; "must still function" → Availability y Fault-tolerance | BluzBrothers: `ArchitectureCharacteristics/images/characteristics.png` |
| Las notas por componente (Availability y Evolvability en los 4; Elasticity y Performance en 3) y las 3 notas finales (Evolvability, Elasticity, Performance) | BluzBrothers: `images/components-sticky-cards.png`, `top3-final.png` |
| La hoja de estilos con las tres filas encerradas y el event-driven marcado (4 + 5 + 5 = 14 estrellas) | BluzBrothers: `images/chosen-architecture.png`; ADR-012 |
| La tabla del presupuesto: 320 + 320 + 16 + 5 + 32 = 693 ms | BluzBrothers: `FitnessFunctions/Sizing.md`, "Final calculation" |
| Frecuencias por sensor y total por paciente: 4,22 señales por segundo | BluzBrothers: `Sizing.md`, tabla "Throughput" |
| ADR-008, 009 y 010 con sus costos ("Cons") en tres bloques | BluzBrothers: `ADR/ADR-008`, `ADR-009`, `ADR-010` |
| Frase: "5 nines ... is unreasonable and 4 nines would also be an overkill" y la tabla de capacidad | Pegasuz: README "Availability" y "Capacity planning" |
| Tabla requisito → análisis → NFR, con las filas "[Derived]" | Pegasuz: `other-artifacts/Requirement-analysis.md` (tabla "Summary") |
| "Characteristics that we do not need as we offloaded to 3rd party vendors" | Pegasuz: `quanta/chat.md`, `quanta/notification.md` |
| Las tres dificultades y las tres características top; la lista "Reduced priorities" | Pragmatic: `ArchitectureCharacteristics/Characteristics.md` |
| La hoja de características con las casillas marcadas y la hoja de estilos con service-based y event-driven | Pragmatic: `ArchitectureCharacteristics/images/architecture-characteristics.png`, `ADR/images/ADR-002-architecture-style.png` |
| La entrevista (500 000 prompts, 500 000 USD), el cálculo de tokens y A24 a A26 en una sola pantalla | Pragmatic: `Requirements/Research/interview-ai-expert.md`, `token-estimation.md`, `requirements-and-assumptions.md` |
| La tabla "Selected Architecture Characteristics" con columna "Source" | Archangels: `1.ProblemBackground/ArchitectureAnalysis.md` |
| Las dos tablas de pros y contras de microservicios y event-driven, y la frase "may still be high trade-offs after mitigation" | Archangels: `ArchitecturePatterns.md`, `ADR 002` |
| Cuatro pares de trade-offs | ArchColider: `2.SolutionBackground/Tradeoffs.md` |
| Escenarios MIN, PROJECTED y RAPID y la tabla de costo anual (12 247,57 / 12 548,17 / 22 480,57 USD), con las filas Tableau y DataDog cambiadas | ArchColider: `3.ViewsAndPerspectives/CostAnalysis.md`, "Summary of costs per year" |
| La cuenta de 1 880 horas → 94 000 USD → 470 USD por candidato, y la de 3 760 horas → 190 700 USD | ZAItects: `other_design_docs/cost-analysis.md` |
| El empate Elasticity y Evolvability | Data Alchemists: README "Driving characteristics" |
| IDs encadenados SH → UC → QA | Team 7: README |
| La cadena NFR_9 → FR#2M → ADR-0020 con sus cifras | Five Nines: `requirements/3_NFRs.md`, `2_FRs.md`, `adrs/ADR-0020` |
| 30 minutos frente a 30 segundos de telemetría, en dos documentos | Five Nines: `4_Assumptions and constraints.md`, `Appendix A_ Core functionality.md` |
