# Dossier D7 · Transversal: dejar escrita cada decisión (el ADR) y cerrar lo que queda fuera

Todo lo de abajo sale de leer los ADR originales de los 12 repos (`C:\Users\felix\dev\katarch-corpus\<Repo>-src\`), no de las fichas. Marcas: `[DATO]` lo que el repo dice, `[DEDUCCIÓN]` lo que se infiere (con su base), `[HUECO]` lo que el repo no dice. Los conteos son míos, hechos a mano ADR por ADR con los criterios de 2.1; donde un caso es dudoso lo digo.

Abreviaturas de repos: AC = ArchColider, AA = Archangels, BB = BluzBrothers, CC = CELUS Ceals, CA = ConnectedAI, FN = Five Nines, MA = monArch, PG = Pegasuz, PR = Pragmatic, DA = Data Alchemists, T7 = Team 7, ZA = ZAITects. Las rutas se escriben sin el sufijo `-src`.

---

## 1. Las verdades, reformuladas

**V1. Un ADR completo dice cuatro cosas: por qué hacía falta decidir, qué otras opciones había y por qué perdieron, qué cuesta lo elegido, y qué requisito lo pide.** Los 12 ganadores usan ADR: 183 ADR de decisión en total, más 5 ADR sobre "usar ADR" o la plantilla y 1 catálogo (ZA ADR-015) que no decide. Lo que escriben no es igual: 167 de 183 (91 %) admiten al menos un costo; 96 de 183 (52 %) nombran al menos una alternativa descartada; 50 de 183 (27 %) citan el requisito o la característica que los origina con un identificador o un enlace. La práctica más repetida es el costo; la menos repetida es el vínculo con el requisito.

**V2. Lo que un ADR no dice se paga después, y se paga en un lugar concreto.** Sin el requisito citado, el ADR no se puede comprobar contra el requisito (FN ADR-0017 fija 180 días para las fotos; el requisito dice 90). Sin las alternativas, no se sabe qué se descartó (BB ADR-003 no nombra la base de datos). Sin la razón del cambio de estado, el lector no sabe si la decisión sigue vigente (PR ADR-006, T7 ADR-8). La verdad no es "escribe más": es "escribe lo que permite que otro compruebe la decisión sin preguntarte".

**V3. El estado del ADR es información, y casi nadie lo usa para eso.** De 183 ADR, 88 están "Accepted", 13 "Confirmed", 3 "Approved", 48 "Proposed", 23 no tienen campo de estado, y solo 8 usan un estado de otra clase: Superseded (1), Obsolete (1), Denied (2), Declined (1), Open (1), Under evaluation (1), Draft (1). Los estados raros registran dos cosas útiles: lo que se consideró y se rechazó (Denied) y lo que no se ha decidido (Open). Solo 2 ADR del corpus se retiran (PR ADR-006, T7 ADR-8) y en ninguno de los dos el ADR explica por qué.

**V4 (= T11). Lo que queda fuera se puede cerrar de cuatro maneras, y las cuatro aparecen en el corpus:** (a) un ADR que dice "esto queda fuera" y deja la frontera descrita (BB ADR-005, 006, 013, 014); (b) un ADR con estado Denied u Open que guarda la condición para reabrirlo (PR ADR-021, 022, 024); (c) una tabla o sección del README con supuestos, decisiones postergadas o límites (BB, PR, MA, FN Apéndice C, CC "segunda iteración"); (d) la pregunta al dueño del problema con su respuesta (BB, AA, AC). El mapa daba T11 para 5 repos; con lectura completa los 5 la sostienen con distinto grado (ver 2.3), y aparece sin ADR en AC, T7, AA, ZA y CA.

**V5. Que 12 equipos usen la misma práctica no prueba que la descubrieran por separado.** [DATO] Solo 2 repos citan *Fundamentals of Software Architecture* (AC en su README, MA en sus referencias), ambos por enlace y ninguno por nombre de autor; "Richards" y "Ford" como autores no aparecen en ningún repo. [DATO] El vocabulario del método sí aparece repartido: "architecture characteristics" en 9 repos, "quantum/quanta" en 4, "fitness function" en 5, "worksheet" en 4. [DATO] Los formatos de ADR se copian entre equipos: AA usa los mismos campos que AC; CC compara tres plantillas y elige la de Jacqui Read (que es integrante de AA); PG y ZA usan exactamente la misma plantilla de 6 secciones. Lo que se puede afirmar es que es el método de la comunidad de las katas; no que sea independiente.

---

## 2. Verificación por repo

### 2.1 Tabla de los 12 repos (conteo mirando los ADR reales)

Criterios, aplicados a cada ADR de decisión (se excluyen la plantilla vacía y los ADR "usar ADR / plantilla"):
- **Alternativa**: el ADR nombra, en su propio texto, al menos una opción que no se eligió. No cuenta que otra pieza del repo (un README, una imagen) tenga la comparación.
- **Costo**: el ADR declara al menos una consecuencia negativa, riesgo o característica debilitada de lo elegido (no solo dinero). Una sección de costos vacía o con "ninguno" no cuenta.
- **Requisito citado**: el ADR remite a un identificador (FR#, NFR_, Q/A/R, ASM, UC) o a un enlace a la sección de requisitos o de características de calidad. Que el Context diga la necesidad con palabras no cuenta aquí (va en la penúltima columna, aproximada).

| Repo (kata, año) | ADR de decisión | Estados usados | Secciones que usa | Alternativa | Costo | Requisito citado | Necesidad dicha en el Context (aprox.) | Fecha en el ADR | Palabras por ADR (media) |
|---|---|---|---|---|---|---|---|---|---|
| AC (Farmacy Food, 2020) | 15 (+ 001 "usar ADR") | Proposed 10, Accepted 3, Declined 1, Draft 1 | Fecha, Status, Context, a veces Alternatives, Decision, Consequences; en algunos Positive/Negative/Risks/Bonus Features | 7/15 (con encabezado propio o tabla: 002, 003, 007, 015) | 14/15 (falta 005) | 0/15 | 12/15 | 15/15 | 306 |
| AA (Farmacy Family, 2021) | 17 (+ 001) | Confirmed 13, Accepted 3, Under evaluation 1 | Fecha, Status, Context, Decision, Consequences con Positive/Negative/Risks/Bonus Features | 2/17 (006, 012); otras 3 viven en documentos enlazados (002, 008, 009) | 17/17 | 10/17 (002 → ArchitecturePatterns.md; 011 a 019 → ArchitectureAnalysis.md) | 13/17 | 17/17 | 178 |
| BB (MonitorMe, 2024) | 19 (+ 001) | Accepted 19 | Fecha, Status, Context con "context link out", Decision, Consequences con Pros/Cons | 0/19 | 18/19 (ADR-007: "No identified drawbacks at this time.") | 19/19 (todos enlazan una sección de otro documento) | 6/19; 15/19 tienen un Context de 28 palabras o menos | 19/19 | 188 |
| CC (Wildlife Watcher, 2023) | 13 (+ 000 y 001, ambos sobre ADR) | Accepted 13 (la plantilla permite Accepted, Confirmed, Rejected, Superseded, Proposed) | Status, Context, Evaluation Criteria, Options con puntaje, Decision, Implications con Positive/Negative; la plantilla define "Consultation" | 3/13 (003, 005, 007); 005 y 006 remiten a un documento de análisis | 10/13 (faltan 011, 013, 014) | 0/13 | 11/13 | 0/13 | 158 |
| CA (ShopWise, 2024) | 12 | Accepted 9, Proposed 2 (009, 010), sin estado 1 (001) | Context and Problem Statement, Requirements, Business and Technical Assumptions, Decision Drivers, Considered Options, Decision con Reasons, Consequences con Positive Impacts / Trade-offs and Limitations | 12/12 | 12/12 | 0/12 (los requisitos se reescriben dentro de cada ADR; ninguno enlaza `1_requirements/`) | 12/12 | 0/12 | 455 |
| FN (MobilityCorp, 2025) | 22 | **Ningún ADR tiene campo de estado** | Context, Decision, Key Differentiators, Alternatives Considered, Risks & Trade-offs (tabla riesgo / descripción / mitigación), Conclusion | 22/22 | 22/22 | 10/22 (0013 enlaza `2_FRs.md`; 0014 a 0022 citan FR#, FR-CV o NFR_) | 22/22 | 0/22 | 713 |
| MA (Hey Blue!, 2022) | 7 | Proposed 7 | Status, Rationale, Decision, Consequences con Positive/Negative | 4/7 (003, 005, 006, 007) | 7/7 | 0/7 | 4/7 | 0/7 | 312 |
| PG (Spotlight, 2022) | 11 (+ plantilla 001) | Accepted 9, Proposed 2 (006, 007) | Fecha, Status, Context, Alternatives, PrOACT (tabla de criterios), Decision, Tradeoffs - Mitigations, References | 9/11 (faltan 004, 005) | 7/11 (faltan 005, 007, 011, 012) | 1/11 (006 → "Requirement Analysis" del README) | 9/11 | 9/11 | 215 |
| PR (ClearView, 2024) | 23 (faltan 012 y 013) | Accepted 18, Denied 2 (021, 024), Open 1 (022), Superseded 1 (006), Proposed 1 (003) | Fecha, Status, Context, Decision, Consequences, **Strengthened / Weakened characteristics (17 de 23)** | 12/23 (lista formal con letras u "Opt" en 007, 009, 011, 018, 019; en prosa con razón en 002, 006, 016, 017, 021, 022, 024) | 20/23 (faltan 011, 018, 023) | 8/23 (002, 007, 008, 010, 011, 021, 023, 025) | 18/23 | 23/23 | 178 |
| DA (Road Warrior, 2023) | 15 | Proposed 15 | Fecha, Status, Context, Decision, Consequences con Positive/Negative/Risks | 0/15 con sección; 6 nombran la opción contraria en el texto (003 a 007 por el Context común; 013 "multi-region") | 15/15 (4 con "Risks - TBD": 004, 005, 007, 009) | 0/15 | 4/15 (001, 002, 012, 013) | 15/15 (todos 2023-09-15) | 305 |
| T7 (Sysops Squad, 2021) | 12 | Proposed 11, Obsolete 1 (ADR-8) | Title, Status, Context, Decision, Consequences | 8/12 | 8/12 (ADR-5 tiene Consequences vacío) | 2/12 (ADR-4 cita ASM-4; ADR-5 cita UC-2, UC-3, UC-4, UC-7) | 12/12 como característica ("mejorar disponibilidad…") | 0/12 | 245 |
| ZA (Certifiable, 2025) | 17 (+ ADR-015, que es un catálogo y no decide) | Accepted 14, Approved 3 | Status, Fecha (en 12 de 18 archivos), Context, Alternatives, PrOACT (Problem, Objectives, Alternatives, Consequences, Trade-offs), Decision, Tradeoffs - Mitigations | 17/17 | 17/17 (cada costo con su mitigación) | 0/17 | 17/17 | 12/18 | 534 |
| **Total** | **183** (+5 "usar ADR", +1 catálogo) | | | **96/183 (52 %)** | **167/183 (91 %)** | **50/183 (27 %)** | | | |

Notas de la tabla:
- [DATO] Los repos con alternativas en todos o casi todos sus ADR son FN (22/22), CA (12/12), ZA (17/17) y PG (9/11). Los que no las ponen en el ADR son BB (0/19) y DA (0/15); BB las lleva, si las lleva, a una imagen (`ArchitectureCharacteristics/images/chosen-architecture.png`) que el corpus de texto no incluye.
- [DATO] Los repos que citan el requisito por identificador o enlace son 6 de 12 (AA, BB, FN, PG, PR, T7). Los otros 6 (AC, CC, CA, MA, DA, ZA) no lo citan; cuatro de ellos (AC, CC, CA, ZA) sí dicen la necesidad con palabras en el Context.
- [DATO] El único repo que escribe "característica fortalecida / debilitada" en el ADR es PR (17 ADR). Ningún otro repo usa esos encabezados.
- [DEDUCCIÓN] La longitud media va de 158 a 713 palabras. FN (713) y ZA (534) llevan más texto porque cada ADR trae tabla de riesgos con mitigación; AA, PR y CC (158 a 178) son los más cortos. No hay relación entre más palabras y más vínculo con el requisito: BB (188 palabras) enlaza el 100 %, ZA (534) el 0 %.

Listas por ADR para poder comprobar el conteo:
- AC alternativa: 002, 003, 007, 010, 014, 015, 016. Costo: todos salvo 005. Necesidad en palabras: 002, 003, 004, 007 a 015 salvo 005.
- AA alternativa en el ADR: 006, 012. Requisito enlazado: 002, 011, 012, 013, 014, 015, 016, 017, 018, 019.
- BB Context de 28 palabras o menos: 005, 006, 007, 009 a 020. Necesidad con palabras: 002, 003, 004, 005, 008, 018.
- CC alternativa: 003, 005, 007. Costo: 002 a 010 y 012. Sin criterios de evaluación: 013, 014.
- MA alternativa: 003, 005, 006, 007.
- PG sin sección de alternativas: 004, 005. Costo: 002, 003, 004, 006, 008, 009, 010.
- PR sin costo declarado: 011, 018, 023. Remiten a requisito: 002, 007, 008, 010, 011, 021, 023, 025.
- T7 alternativa: 001, 002, 003, 004, 005, 009, 010, 011. Costo: 001, 002, 003, 004, 006, 007, 010, 012.

### 2.2 Estados (con qué ADR)

| Repo | Estados | Caso poco habitual |
|---|---|---|
| PR | Accepted 18; Proposed 1 (003); **Superseded by ADR-007** (006); **Denied** (021, 024); **Open** (022) | Es el repo con más clases de estado distintas (5). La plantilla (ADR-000) dice "Accepted / Proposed / Superseded". Denied y Open no están en la plantilla. |
| T7 | Proposed 11; **OBSOLETE** (ADR-8) | El README lista ADR-1 a 7 y 9 a 12; omite el 8. |
| AA | Confirmed 13; Accepted 3; **Under evaluation** (006) | ADR-006 tiene decisión escrita ("COTS solution will be used for Forums") y estado "Under evaluation". No existe ADR-007: la numeración salta de 006 a 008, también en el README de ADR. |
| AC | Proposed 10; Accepted 3; **Declined** (010); **Draft** (016) | ADR-010 se titula "Feedback System separation" y está Declined; el ADR no dice qué parte se rechazó (ver 3, B6). |
| ZA | Accepted 14; **Approved** 3 (016, 017, 018) | Dos palabras distintas para el mismo estado dentro del repo. |
| MA | Proposed 7 | La plantilla ofrece "Proposed / Accepted / Deprecated / Superseded"; ninguno pasó de Proposed. |
| DA | Proposed 15 | La plantilla ofrece "Proposed / Confirmed / Declined"; ninguno pasó de Proposed; todos llevan la fecha 2023-09-15. |
| CC | Accepted 13 | La plantilla (ADR-001) lista Accepted, Confirmed, Rejected, Superseded, Proposed. |
| CA | Accepted 9; Proposed 2 (009 CI/CD, 010 caching); ADR-001 sin campo | `7_deployment/cloud_hosting_instructions.md` describe un pipeline de GitHub Actions que construye la imagen, mientras ADR-009 sigue "Proposed". Con búsqueda por texto no aparece caché ni Redis en `3_architecture_and_design/` ni en `5_tech_stack/tech-stack.md`, y ADR-010 propone caché de servidor con Redis o Memcached. |
| PG | Accepted 9; Proposed 2 (006, 007) | ADR-007 es de decisión condicional (ver 3, D3). |
| BB | Accepted 19 | Los ADR llevan fechas del 2024-02-16, 17 y 21 (tres fechas en 6 días). |
| FN | Sin campo de estado | ADR-0010 y 0011 dejan la adopción a lo que resulte de un PoC o un piloto; ADR-0013 dice "Reassess after 12 months". Nada de eso queda marcado como estado. |

### 2.3 T11 (lo que queda fuera y lo que no se decidió) por repo

| Repo | ¿Lo sostiene? | Evidencia | Detalle |
|---|---|---|---|
| BB | Sí | `ADR/ADR-005, 006, 013, 014`; `README.md` sección "Postponed decisions or well-known issues"; `EventStorming/EventStorming.md` sección Summary | 4 ADR de "fuera de alcance" y una tabla de 6 decisiones postergadas. ADR-006: "In response to a client inquiry, it was clarified that the system does not handle the sensor context." EventStorming: "based on the client's response, we consider it as a supporting sub-domain". El texto del correo del cliente no está en el repo `[HUECO]`. |
| PR | Sí | `ADR/ADR-021, 022, 024`; `README.md` sección "Known Limitations" | 2 Denied, 1 Open y 4 límites conocidos. ADR-024 y ADR-021 dejan la condición para reabrirlos. |
| MA | Parcial | `Readme.md`, secciones "Technical Constraints", "Business Constraints", "Assumptions", "Others Considered"; no hay ADR | 2 supuestos sobre lo que el sistema no hace (transacciones financieras; canje de las ONG fuera del sistema). Uno se apoya en la voz del fundador: "(This was mentioned by the founder in the initial discussion)". |
| CC | Parcial | `4.Solution/2.Suggestion-SecondIteration/README.md`; `3.ARDs/002.BuildTheSystemUsingIterations.md`; `1.ProblemBackground/4.RaidLog.md` | La segunda iteración lista 6 cosas que se dejan para después; una se declara hipótesis: "until verified should be treated as a product hypothesis". ADR-002 fija el criterio: la primera iteración se centra en lo difícil de cambiar (el hardware de la cámara). |
| FN | Parcial | `requirements/Appendix C_ Future scope.md`; `adrs/ADR-0010, 0011, 0013` | Apéndice C: 8 ideas de IA y 7 mejoras del núcleo fuera del alcance actual. Solo la primera idea (marketing por IA) se desarrolla, con fases 2, 3 y 4 (post-lanzamiento, 6 a 12 meses, 12 a 18 meses) y "Dependencies & Prerequisites". No da una razón por cada exclusión `[HUECO]`; la condición que sí da, para esa idea, es el requisito previo de la fase 1. |
| AC | Sí, sin ADR | `1.ProblemBackground/BusinessGoalAndScope.md` ("Out of scope"); `Questions.md` ("Question to the Owner"); `2.SolutionBackground/Assumptions.md` | Fuera de alcance: la comunicación interna de las neveras y la logística de la comida. Las preguntas al dueño no traen respuesta en el repo `[HUECO]`. Assumptions.md enlaza cada supuesto al ADR que depende de él (ADR 012, 013, 015). |
| T7 | Parcial | `README.md`, sección "Assumptions" | ASM-3: "Call tracking system is out of scope of Sysops Squad system." ASM-4 (guardan las tarjetas localmente) es el supuesto que ADR-4 cita como origen. |
| AA | Parcial | `Clarifications.md`; `1.ProblemBackground/ArchitectureAnalysis.md` ("Next Steps") | 15 aclaraciones del Q&A de arranque. La 09 dice sobre protocolos de integración: "No specific requirements, just document why." La 08: si el equipo cambia la arquitectura de Farmacy Foods, "Indicate it and use ADRs." `Next Steps` deja dos puntos sin marcar (diagramas de granularidad y fitness functions). |
| ZA | Parcial | `README.md`, secciones "Limitations with adoption of Gen AI" y "Anti patterns" | Dice que evitó los agentes de IA por 4 razones y que quedan para el caso de análisis. No hay ADR. |
| CA | Débil | `2_features_and_roadmap/product-roadmap.md` ("Future Release") | Lista funciones futuras; sin razones. |
| PG, DA | No encontrado | — | PG tiene un "Platform Road map" en el README que no leí a fondo para esta verdad. DA: sin sección de límites. |

### 2.4 Fuentes del método citadas (grep en los 12 repos)

| Fuente o término | Repos donde aparece | Cómo aparece |
|---|---|---|
| *Fundamentals of Software Architecture* (Richards y Ford) | **2 de 12:** AC, MA | AC `README.md` línea 19: enlace "fundamentals-of-software" (lista "Resources"), junto con el video "software-architecture-fundamentals". MA `Readme.md` línea 370: enlace en "References". Ningún repo nombra a Richards ni a Ford. |
| Otros libros (MA) | 1: MA | *Building Microservices*, *Building Evolutionary Architectures*, *Building Event-Driven Microservices*, *Documenting Software Architectures: Views and Beyond*. El enlace de "Architecture: The Hard Parts" apunta a la página de arquitectura hexagonal de Cockburn `[DATO]`. |
| Michael Nygard (artículo sobre ADR) | 4: AC, AA, BB, CC | Cada uno en su ADR de "usar ADR". CC compara la plantilla de Nygard (completitud 3/5, "Missing decision making") con la de Jacqui Read (5/5) y adopta la segunda. BB fecha su plantilla ADR-000 el 2011-11-15, la fecha del artículo de Nygard `[DEDUCCIÓN, conocimiento externo]`. |
| Jacqui Read | 2: CC (plantilla), AA (integrante) | CC ADR-001: "Use Jacqui Read’s template." AA README la lista como integrante. |
| "architecture characteristics" / "driving characteristics" / "Top 3" | 9 / 5 / 7 | Características: AA, BB, CC, MA, PG, PR, DA, T7, ZA. No aparece como término en AC, CA, FN (FN y CA usan requisitos no funcionales). |
| "quantum / quanta" | 4: AA, MA, PG, T7 | PG tiene un documento por quantum con su "worksheet" como imagen; T7 nombra los ADR "Extract billing quantum" y "Extract customer quantum". |
| "fitness function" | 5: AC, AA, BB, MA, ZA | BB tiene `FitnessFunctions/` con tres pruebas; ZA, `other_design_docs/fitness-functions.md`; AA solo las propone. |
| "worksheet" (hoja de estilos / características) | 4: AA, PG, PR, DA | AA enlaza `developertoarchitect.com/downloads/worksheets.html`; PR ADR-004 y DA ADR-1 mencionan la "architecture style(s) worksheet". |
| C4 | 9: AA, BB, CC, CA, MA, PR, DA, T7, ZA | FN usa "Context Diagram" y "Container Diagram" sin nombrar C4. AC y PG no lo mencionan. |
| Event Storming | 6: AA, BB, MA, PG, PR, ZA | |
| PrOACT | 2: PG, ZA | Como sección de la plantilla; ningún repo cita su origen. |
| "First Law" y "Second Law of Software Architecture" | 1: T7 | `README.md` líneas 29-30 ("Everything in software architecture is a trade-off") y encabezado de la sección ADR ("Why is more important than how"). `[DEDUCCIÓN, conocimiento externo]` son las dos leyes del libro de Richards y Ford. |
| "least-worst" | 1: AA | `ArchitectureAnalysis.md`: "identify the *least-worst* solution". |
| Katas anteriores (índice) | AA, MA, AC | AA cita a AC y a "The Mad Katas" (anterior de Jacqui Read) y reutiliza una imagen de AC en su `Roadmap.md`; MA enlaza "Previous Kata Entries" (`tekiegirl/SoftwareArchitectureResources`). |
| La propia kata pide ADR | AA | `Clarifications.md` 08 y 09: "Indicate it and use ADRs." y "No specific requirements, just document why." (Q&A de arranque de la edición 2021). |

`[DEDUCCIÓN]` Dos repos citan el libro, pero 9 usan su vocabulario y 6 la práctica de Event Storming. La práctica que la mayoría repite es la de la comunidad de las katas (plantillas, hojas de trabajo, repos anteriores); no hay forma de separar, con estos archivos, lo que sale del libro de lo que sale de leer los repos anteriores.

---

## 3. Los mejores ejemplos para enseñar

Agrupados por la verdad que enseñan (V1 a V4). La V5 va en 2.4 y en la sección 5, porque no lleva ejemplo de ADR.

### Verdad V1 · El ADR completo

**A1. Five Nines ADR-0017: cuánto tiempo se guardan las fotos de los vehículos**
- **El caso.** MobilityCorp alquila coches, furgonetas, bicis y patinetes eléctricos en la UE. La app toma fotos del vehículo al devolverlo, antes del alquiler y en tareas del personal, y esas fotos incluyen matrículas y a veces personas.
- **La situación que obliga a decidir.** Las fotos son datos personales bajo el RGPD. El ADR enumera cuatro fuerzas que se tiran entre sí: cumplimiento legal, disputas y fraude, entrenamiento de los modelos de IA y costo de almacenamiento. Cita los requisitos de origen por identificador: FR-CV-007 (verificación al devolver), FR#2M (inspección previa) y FR#2L (limpieza con IA).
- **Qué decidió.** Una política en tres niveles: originales operativos (180 días por defecto, hasta 2 años solo con una disputa, reclamo o requerimiento legal con número de caso), derivados de trabajo (90 días, se borran con el original) y conjuntos de entrenamiento anonimizados (se revisan cada año). Almacenamiento solo en la UE con claves CMEK, difuminado automático de caras y matrículas, y reglas de ciclo de vida: Nearline a los 30 días, Coldline a los 90, borrado a los 180.
- **Alternativas y por qué se descartaron (con cita).** Tres: guardar todo para siempre en almacenamiento barato, "Rejected: Violates GDPR storage limitation and increases breach impact and cost"; borrar apenas se verifica, rechazada porque no alcanza para disputas, contracargos, seguros y auditorías; un único bucket sin separación de funciones, rechazado porque dificulta el acceso mínimo y agranda el daño de una filtración.
- **Costo admitido.** Una tabla de 5 riesgos con su mitigación. El primero: "Deletion at 180 days may hinder late disputes", mitigado con ventanas de disputa claras en los términos y retenciones legales. También: la anonimización puede borrar señales útiles para los modelos, los picos de costo antes de que actúen las transiciones, la complejidad de atender solicitudes de borrado cuando hay copias en tres niveles.
- **Qué enseña.** Que se puede escribir una decisión sobre datos personales con números (días, clases de almacenamiento, quién accede) y que cada número viene con su razón y su riesgo. Por qué este y no otro: es el único ADR del corpus que combina requisito citado por ID, tres alternativas rechazadas con razón, tabla de riesgos con mitigación y valores concretos (T4a). Este mismo ADR es el ejemplo B1 de lo que falta.
- **Fuentes.** FN: `adrs/ADR-0017 - Photo Retention Policy for Vehicle Photos (GDPR, storage costs).md`.

**A2. ArchColider ADR-003: qué herramienta de monitoreo contratar**
- **El caso.** Farmacy Food vende comida desde neveras inteligentes. El equipo quiere decidir cuándo escalar o extraer un servicio con datos y no por intuición, y para eso necesita monitoreo de todo el sistema.
- **La situación.** El contexto dice que el sistema crece rápido, que hay que escalar "justo a tiempo" y que el monitoreo debe servir como fitness function ("should act architecture fitness functions"). Elige entre cuatro opciones con su precio en el propio ADR: DataDog (US$ 15 por host al mes), Grafana (gratis), ELK (sin costo de licencia) y CloudWatch (aprox. US$ 0,30 por los primeros 10.000 métricos).
- **Qué decidió y por qué.** DataDog, aun cuando Grafana y ELK son más baratos. El ADR cuenta el costo escondido de las baratas: "we would have to appoint 0.2-0.5 time of a developer / administrator to take care of the monitoring".
- **Costo admitido (con cita).** "We will have to spend $15 USD and the price might increase in the future." Y agrega su estimación de que el aumento no sería significativo ("We think it unlikely"). Estado: Proposed.
- **Qué enseña.** Que comparar opciones incluye el costo de operarlas (tiempo de una persona), no solo el precio de lista. Por qué este: es la comparación de costo más concreta del repo y la decisión va contra la opción más barata por una razón que el ADR cuantifica.
- **Fuentes.** AC: `4.ADRs/003 Tracing and Monitoring Sytem.md`.

**A3. Pragmatic ADR-007: modelos de lenguaje externos u operados por el equipo**
- **El caso.** ClearView, de Diversity Cyber Council (organización sin fines de lucro), empareja candidatos y puestos con IA. Hay cuatro usos de IA: consejos al currículum, relleno de datos del empleador, transformar el currículum en "story" anónima y extraer características.
- **La situación.** El ADR parte de requisitos y supuestos numerados: "[A24, A25, A21, A20]" del documento `requirements-and-assumptions.md` (A20: los LLM quedan superados pronto; A21: el conocimiento es caro; A24 y A25: el costo de los prompts varía mucho y los LLM son el mayor costo técnico). Plantea tres proposiciones, cada una con sus ventajas y desventajas: A) servicios externos, B) modelo abierto propio en un contenedor en la nube, C) modelo abierto propio en servidores propios.
- **Qué decidió.** A, con diseño orientado a eventos para cada cliente de LLM, para ganar tolerancia a fallos e interoperabilidad.
- **Costo admitido.** Una lista de cinco características fortalecidas (costo, viabilidad, interoperabilidad, tolerancia a fallos, disponibilidad) y cuatro debilitadas (viabilidad por la regulación de privacidad, capacidad de respuesta, observabilidad, desplegabilidad por el riesgo de fin de vida de los modelos). Además un costo no resuelto, dicho como tal: "Need to somehow track rate to avoid surpassing rate-limit (currently not solved, part of our Known Limitations)". "Feasibility" figura en las dos listas, con razones distintas.
- **Qué enseña.** Que una decisión puede declarar a la vez lo que gana y lo que pierde en el vocabulario de las características de calidad, y que un problema abierto se enlaza con la sección de límites del README. Por qué este y no otro: es el ADR de PR que mejor junta requisito por ID, tres opciones y características fortalecidas y debilitadas.
- **Fuentes.** PR: `ADR/ADR-007-use-of-external-llms.md`; `Requirements/requirements-and-assumptions.md` (A20 a A25); `README.md` sección "Known Limitations".

**A4. CELUS ADR-003: cómo se actualiza la configuración de una cámara en el campo**
- **El caso.** Wildlife Watcher: cámaras con IA que identifican animales, alimentadas a batería, a menudo sin internet fiable.
- **La situación.** Tres criterios escritos antes de comparar: seguridad (solo personas autorizadas cambian la configuración), uso eficiente de recursos (batería) y tolerancia a fallos (recibir la actualización aunque no haya internet).
- **Qué decidió.** Dos opciones con puntaje de 1 a 5 y justificación por celda. A) La cámara expone una API siempre encendida: seguridad 5, recursos 3, tolerancia 3. B) La cámara consulta periódicamente si hay cambios: 4, 4, 4. Decide B: "Treating the camera as an external resource reduces the security complexity and makes the camera system be more fault-tolerant", y fija una regla de autoridad: la plataforma es la fuente de verdad y pisa la configuración manual de la cámara.
- **Costo admitido.** Las cámaras deben guardar un token; no hay configuración en tiempo real (la configuración guardada en la plataforma puede no estar aplicada todavía en la cámara).
- **Qué enseña.** Cómo se ve una comparación con criterios previos y puntaje, y que la opción ganadora puede perder en un criterio (la seguridad baja de 5 a 4). Además el ADR agrega una regla de fuente de verdad que no estaba en la pregunta. Por qué este: es el único ADR de CC con una comparación por puntaje escrita en el texto (la de ADR-007 es una imagen; el texto solo trae el resultado: 20 puntos para microservicios, 15 para eventos, 8 para monolito modular).
- **Complemento, ADR-005.** Admite que su elección no se apoya en una razón técnica: "there is no technical reason for choosing Wildlife Insights over TrapTragger" (elige Wildlife Insights por ser SaaS; la comparación con TrapTagger no desempata).
- **Fuentes.** CC: `3.ARDs/003.CameraUpdateStrategy.md`, `3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md`, `3.ARDs/007.ChoosingTheMicroserviceArchitecture.md`, `3.ARDs/001.ADRTemplate.md`.

**A5. Team 7 ADR-2 y ADR-3: aceptar un costo porque el negocio lo exige**
- **El caso.** Sysops Squad, una empresa de soporte técnico a domicilio. Los clientes envían tickets; los expertos buscan tickets y artículos en el campo.
- **La situación (ADR-3).** Síntomas concretos del problema: "Often times the wrong expert shows up to fix something they know nothing about." Y: los tickets a veces nunca se asignan y se pierden.
- **Qué decidió.** ADR-2: colas de mensajes con entrega garantizada entre el lado del cliente y el de los expertos, no consulta-respuesta ni publicador-suscriptor por tópicos. ADR-3: la asignación de tickets pasa a un trabajo por lotes periódico y no a un servicio que atiende cada ticket; la alternativa "servicio independiente" se descarta porque procesar de a un ticket impide ordenar por prioridad.
- **Costo admitido (con cita).** ADR-2 lista tres costos (complejidad, la cola como punto único de falla, pruebas y depuración más difíciles) y cierra: "Since aforementioned qualities are critical to the business we accept these trade-offs." ADR-3: el riesgo de que el trabajo no arranque por una configuración o un error, y por eso pide monitoreo adicional.
- **Qué enseña.** La frase que une costo con negocio: el costo se acepta porque una cualidad es crítica para el negocio. Por qué este: ningún otro ADR del corpus hace esa conexión explícita en la misma consecuencia.
- **Fuentes.** T7: `ADR/ADR-2-event-driven-broker.md`, `ADR/ADR-3-search-expert.md`.

### Verdad V2 · Lo que falta y qué se pierde

**B1. Five Nines ADR-0017 frente al requisito: 90 días contra 180**
- **Lo que hay.** [DATO] El requisito NFR_7 dice "photos 90 days" (`requirements/3_NFRs.md`) y el Apéndice A repite "Photos 90 days." (`requirements/Appendix A_ Core functionality.md`). ADR-0017 fija "Default: 180 days" para los originales y 90 días para los derivados. [DATO] El diagrama de secuencia del repo escribe "Photos stored 90 days (ADR-0017: GDPR compliance)" (`hld/core-func/car-van-rental/4_Sequence_Diagram.md`).
- **Lo que no está.** [DATO] ADR-0017 cita FR-CV-007, FR#2M y FR#2L, pero no cita NFR_7 ni el número 90 como requisito. [HUECO] Ningún documento explica por qué la política pasa de 90 a 180 días, si NFR_7 queda reemplazado o si el 90 se refiere a los derivados. El diagrama de secuencia cita el ADR como respaldo de una cifra que el ADR no fija para los originales.
- **Qué se pierde.** Un lector que cruza el ADR con el requisito encuentra dos cifras sin saber cuál manda. No es un error comprobado: puede ser un cambio deliberado que quedó sin escribir.
- **Qué enseña.** Que el vínculo con el requisito sirve para detectar cuándo una decisión se aparta de él, y que el ADR es el lugar para justificar el apartamiento.
- **Fuentes.** FN: `adrs/ADR-0017…`, `requirements/3_NFRs.md` (NFR_7), `requirements/Appendix A_ Core functionality.md` (línea de retención), `hld/core-func/car-van-rental/4_Sequence_Diagram.md`.
- **Nota relacionada.** ADR-0002 dice "Enables 99.9% availability targets." sin citar de dónde sale la cifra; en el repo hay 99,9 % en los objetivos del negocio y los OKR, y 99,5 % en NFR_2 (`requirements/3_NFRs.md`). `[HUECO]`: el ADR no dice cuál de las dos toma.

**B2. Pragmatic ADR-006 → ADR-007: reemplazado sin decir por qué**
- **Lo que hay.** [DATO] ADR-006 ("AI Models run on separate containers", 2024-09-26) tiene estado "Superseded by ADR-007". ADR-007 ("Use of external LLMs", misma fecha) elige servicios externos.
- **Lo que no está.** [HUECO] Ninguno de los dos ADR dice que el 007 reemplaza al 006 ni por qué (la lectura natural es que si los modelos son externos ya no hay contenedores propios, pero eso es deducción mía). [DATO] ADR-006 tiene la frase cortada "Separation of AI containers is driven by the" y la lista "Weakened characteristics" vacía. [DATO] `README.md` (línea 62) y `C4/C3-components-story.md` (línea 9) siguen citando ADR-006 como decisión vigente, mientras `C4/C2-container.md` cita ADR-007 y dice que los modelos operan como servicios externos.
- **Qué se pierde.** El lector del C3 de Story cree que hay contenedores de IA propios; el C2 dice lo contrario. No hay forma de saber cuál diagrama está al día sin preguntar.
- **Fuentes.** PR: `ADR/ADR-006…`, `ADR/ADR-007…`, `README.md`, `C4/C3-components-story.md`, `C4/C2-container.md`.

**B3. Team 7 ADR-8 "OBSOLETE": sin motivo ni reemplazo**
- **Lo que hay.** [DATO] ADR-8 ("Use table-based synchronization of customer billing info") tiene estado "**OBSOLETE**". Su decisión: copiar la información de facturación del cliente por replicación entre tablas o por un trabajo ETL, porque no exige reacción inmediata.
- **Lo que no está.** [HUECO] Ningún texto dice qué lo volvió obsoleto ni qué lo reemplaza. [DATO] El README lista los ADR 1 a 7 y 9 a 12 y omite el 8. [DATO] Otros ADR siguen usando el mismo mecanismo: ADR-5 propone replicación entre tablas para los contratos de soporte y las encuestas; ADR-4 dice que los datos de facturación para reporte pueden replicarse "on a table basis". [DEDUCCIÓN] ADR-4 y ADR-5 mandan los datos de tarjeta por cola de mensajes, lo que podría explicar que el ADR-8 (sobre la facturación del cliente) quedara obsoleto; el repo no lo dice. ADR-5 tiene el apartado "Consequences" vacío.
- **Qué se pierde.** El lector no sabe si la replicación entre tablas sigue vigente (ADR-5 la usa) o no (ADR-8 la declara obsoleta).
- **Fuentes.** T7: `ADR/ADR-8-messaging-sync.md`, `ADR/ADR-4-extract-billing-quanta.md`, `ADR/ADR-5-extract-customer-quantum.md`, `README.md` sección "Architecture Decision Records".

**B4. BluzBrothers ADR-012: la alternativa vive en una imagen**
- **Lo que hay.** [DATO] ADR-012 elige arquitectura dirigida por eventos "supported by a rating of 14 stars according to the selection schema for architectural styles". Enlaza a la sección "Choosing the architecture" del README, que solo trae una imagen (`ArchitectureCharacteristics/images/chosen-architecture.png`).
- **Lo que no está en el texto.** [HUECO] Qué otros estilos se compararon y cuántas estrellas tuvieron. ADR-003 elige "a Time Series Database" sin nombrar el producto. Quince de los 19 contextos tienen 28 palabras o menos (por ejemplo, "The decision is needed to select the architectural style for the 'MonitorMe' project…"); la razón está en el documento que enlazan.
- **Qué se pierde.** Quien lee solo el ADR no puede reconstruir por qué ganó el estilo. La contrapartida: los 19 ADR enlazan a la sección exacta de EventStorming, Characteristics, C4 o Deployment, así que el camino hacia el motivo existe.
- **Fuentes.** BB: `ADR/ADR-012-event-driven-architecture.md`, `ADR/ADR-003-use-time-series-db.md`, `README.md` sección "Choosing the architecture".

**B5. Data Alchemists ADR-3 a ADR-7: un mismo Context para cinco decisiones**
- **Lo que hay.** [DATO] ADR-3 (lectores síncronos), 4 (actualizadores asíncronos), 5 (trackers asíncronos), 6 (servicio de compartir síncrono) y 7 (publicadores asíncronos) tienen el mismo Context textual: "Choosing between synchronous and asynchronous communication in a software system is a critical decision…". Dentro de cada grupo (3 y 6; 4, 5 y 7) las listas de costos también son iguales palabra por palabra. Los 15 ADR están en "Proposed" y llevan la fecha 2023-09-15. Cuatro (4, 5, 7, 9) tienen "Risks - TBD".
- **Lo que no está.** [HUECO] Por qué los lectores y el servicio de compartir son síncronos y los demás asíncronos: lo único que lo distingue es la frase de la Decision de cada uno ("real-time", "decoupling … from external APIs"). Ninguno cita el requisito que lo origina.
- **Qué se pierde.** El costo es el de la categoría (síncrono / asíncrono), no el de la decisión en este sistema. Por ejemplo, el costo "Complex Workflows" del síncrono no se discute para los lectores de este sistema.
- **Fuentes.** DA: `adrs/adr-3-data-reader.md` a `adrs/adr-7-publishers.md`.

**B6. Faltas menores que cambian la lectura**

| Repo | Qué dice el archivo | Qué información falta |
|---|---|---|
| PR ADR-008 y ADR-010 | ADR-008: "we need to ensure a responsive UI" (cita Q26). ADR-010: "Reasoning can be seen in Q4." | En `requirements-and-assumptions.md` no existen Q4 ni Q26 (la lista llega a Q16 con huecos). Q13 pide una UI "responsive" y Q5 pide que la IA solo vea la story, que es lo que ADR-010 describe `[DEDUCCIÓN]`. El documento dice que al borrar un requisito se deja el hueco sin renumerar, así que el número citado podría ser uno borrado `[HUECO]`. |
| PR ADR-010 | La Decision termina con "The story service does" | La frase está cortada y no hay apartado "Consequences". |
| PR ADR-022 | Estado "Open", "## Decision" vacío | Lista cinco necesidades (cola, identidad, base de datos, plataforma de ejecución, bóveda de secretos) y una comparación Kafka/RabbitMQ; no decide ninguna. |
| PR (numeración) | Salta de 011 a 014 | No hay ADR-012 ni ADR-013 ni referencia a ellos en el repo. |
| MA ADR-06 | La Decision está escrita como pregunta: "Will we use an in memory cache and/or a graph data structure to find the closest available police officer…" | Estado "Proposed"; la plantilla pide "State the decision in full sentences, with active voice ("We will...")". |
| AA ADR-009 | Su Context repite la frase del ADR-008 ("…optimal for fast analysis, access and storage of unstructured and highly connected data") para el almacenamiento de blobs | La razón propia del blob storage está en `2.SolutionBackground/DataStore.md`, no en el ADR. |
| AA ADR-003 y 004 | "See next ADR TODO add link"; "Risks: TODO" | Dos marcas de pendiente dejadas. |
| ZA ADR-015 | Catálogo de 6 patrones y 5 antipatrones sin Status ni Decision | No es un registro de decisión; la conclusión (microservicios para IA) aparece en la última sección. |
| ZA ADR-002 | La alternativa 2 se llama "Multi model Processing" y la decisión "multi-model AI strategy" | El ADR no distingue entre la alternativa 2 y lo elegido. |
| CC | Plantilla con campo "Consultation" | Ninguno de los 13 ADR lo usa; en ADR-000 "Evaluation Criteria" dice "Not applicable". |
| CA | Plantilla ADR-000 de 4 secciones | Los 12 ADR usan una estructura de 9 secciones distinta de su propia plantilla. |
| PG ADR-012 | Tabla: consistencia de datos "High" en RDBMS y "Low" en NoSQL | La Decision justifica NoSQL por escalabilidad y flexibilidad de esquema y no lista la menor consistencia como costo; no hay sección de trade-offs. |

### Verdad V3 · El estado como información

**C1. Pragmatic ADR-021 (Denied): no resolver la concurrencia de gerentes de contratación**
- **El caso.** Varios gerentes de contratación pueden trabajar a la vez sobre los mismos puestos y candidatos.
- **La situación.** Hay riesgo de condiciones de carrera; el requisito Q2 existe pero es un supuesto (Q2 se apoya en A2). El ADR lo dice: "The requirement is only assumed and not explicit." Resolverlo con websockets suma complejidad.
- **Qué decidió.** "We decide not to solve this problem for the moment", porque se puede resolver con UX (bloquear el acceso si hay una sesión abierta) o más adelante con bloqueo optimista. Estado: Denied.
- **Costo admitido.** La UX queda más limitada para el diseño (así lo dice el apartado Consequences).
- **Qué enseña.** Que "no lo resolvemos ahora" también es una decisión, que se anota con la razón (el requisito es solo supuesto), las salidas baratas que quedan abiertas (UX, bloqueo optimista) y el costo. Por qué este: es el único ADR del corpus que dice que el requisito que lo originaba es un supuesto.
- **Fuentes.** PR: `ADR/ADR-021-addressing-concurrency-of-hiring-managers.md`; `Requirements/requirements-and-assumptions.md` (Q2, A2).

**C2. Pragmatic ADR-024 (Denied): no guardar currículums en caché del adaptador de RR. HH.**
- **El caso.** Cuando un sistema de RR. HH. externo no responde, el adaptador reintenta con backoff exponencial y cada intento vuelve a pedir el currículum al servicio de candidatos.
- **La situación y las dos salidas.** Guardar el currículum en el adaptador quita carga al sistema pero pide memoria (cara) y una caché que invalidar. La alternativa: espaciar más los reintentos, porque "when an external system is not reachable, the delivery is not time sensitive anymore" (el ADR lo escribe como supuesto: "we can assume").
- **Qué decidió.** "Denied, we prefer the load over the memory cost." Y deja la condición de reapertura: "Should the load on Job candidate service ever be a bottleneck, the ADR should be considered again."
- **Qué enseña.** Que un ADR rechazado dice qué se probó, qué pesó más (carga frente a memoria y complejidad) y qué medición lo reabriría. Por qué este: tiene la condición de reapertura más explícita del corpus. Se conecta con T1 (la condición que dispara el cambio).
- **Fuentes.** PR: `ADR/ADR-024-caching-of-resumes.md`, `ADR/ADR-023-adapters-for-hr-systems.md`.

**C3. Pragmatic ADR-022 (Open): lo que se sabe que hace falta y todavía no se eligió**
- **El caso.** ClearView necesita cola o streaming, gestión de identidad, base de datos, plataforma de ejecución y bóveda de secretos.
- **Qué dice.** Para la cola: no se necesita alta concurrencia ni máximo rendimiento; Kafka es "much more capable, but also more expensive than a lightweight solution like RabbitMQ". "Decision" queda vacío. "Intended Consequences" lista costo y simplicidad como fortalecidos y configurabilidad y rendimiento como debilitados.
- **Qué enseña.** Que se puede escribir qué decisiones faltan y qué se sabe de ellas. El README ata una limitación a este ADR: la administración de usuarios depende de si el cliente ya tiene un proveedor de identidad (sección "Known Limitations").
- **Fuentes.** PR: `ADR/ADR-022-initial-technology-decisions.md`, `README.md` sección "Known Limitations".

**C4. Otros estados** (resumen en 2.2). Para pantalla sirve comparar qué estados define cada plantilla con cuáles se usaron: CC define 5 y usa 1; MA define 4 y usa 1; DA define 3 y usa 1; PR define 3 y usa 5.

### Verdad V4 · Cerrar lo que queda fuera

**D1. BluzBrothers: tres maneras de dejar algo fuera, con la frontera descrita**
- **El caso.** MonitorMe es el sistema de monitoreo de pacientes de StayHealthy: lee 8 signos vitales, los muestra con respuesta media de 1 segundo, alerta y guarda 24 horas. Despliegue local en el hospital, hasta 500 pacientes por instalación.
- **La situación.** El enunciado menciona los 8 sensores, las alertas a una app móvil de StayHealthy y la pantalla consolidada por estación de enfermería. El registro de pacientes surgió en la sesión de event storming (ADR-005: "a business need emerged").
- **Qué decidió.**
  - ADR-005: el registro de pacientes es un subdominio de apoyo: "It will be a part of the system, but we won't be focusing on it." La razón está en otro documento: "based on the client's response".
  - ADR-006: los sensores son un contexto acotado aparte. "In response to a client inquiry, it was clarified that the system does not handle the sensor context." Costo: sin protocolo definido, hay que suponer que los datos llegan por streaming.
  - ADR-013: la app móvil queda fuera; recibe notificaciones push (Firebase) y la diseña otro equipo. ADR-014: la estación de enfermería es una aplicación externa que recibe datos por WebSocket. ADR-016: las alertas van por HTTP a la app móvil y los datos a la estación por WebSocket, y si uno de los receptores no está disponible se avisa por el otro.
  - README, "Postponed decisions or well-known issues": 6 filas (autenticación y autorización, notificaciones push, VPN, el hardware, el registro de pacientes, la integración con MonitorThem). Ejemplo: autenticación, "it is a known issue that could be solved on both ways" (como parte de MonitorMe o como SSO del hospital).
- **Alternativas.** Las dos maneras de resolver la autenticación se nombran y no se eligen. Los ADR de fuera de alcance no nombran alternativas.
- **Costo admitido.** ADR-013 y ADR-014 listan el esfuerzo de coordinar con otro equipo y el riesgo de que el formato de datos o las decisiones no queden alineados.
- **Qué enseña.** Que lo que queda fuera se escribe con tres partes: qué queda fuera, quién lo responde (el cliente u otro equipo) y cuál es el borde (qué protocolo cruza). "Fuera de alcance" no es "sin interfaz": ADR-014 y ADR-016 deciden el WebSocket y el HTTP de los dos bordes. Por qué este y no otro: es el único repo donde cuatro ADR se dedican a lo que se deja fuera y donde el README mantiene la lista de lo postergado.
- **Lo que falta.** [HUECO] El texto del correo del cliente (la pregunta y la respuesta) no está en el repo. ADR-005 y ADR-006 lo resumen; ADR-013 y ADR-014 no mencionan al cliente.
- **Fuentes.** BB: `ADR/ADR-005…`, `ADR-006…`, `ADR-013…`, `ADR-014…`, `ADR-016…`; `EventStorming/EventStorming.md` (Summary); `README.md` sección "Postponed decisions or well-known issues"; `Business/Requirements.md`.

**D2. Pragmatic: lo que no se decidió, con tres estados más una sección de límites**
- Ver C1 (Denied: concurrencia), C2 (Denied: caché), C3 (Open: tecnología). Además `README.md` sección "Known Limitations": cuatro límites, cada uno enlazado al ADR que lo causa. Por ejemplo, el emparejamiento es periódico y no en tiempo real (ADR-008), y definir las características legibles para todos los casos "can be challenging" (ADR-011).
- **Qué enseña.** Un recorrido completo: el ADR que causa el límite, el límite escrito en el README, y el ADR Open o Denied que dice qué se necesita para cerrarlo. Fuentes: ver C1 a C3.

**D3. Decisiones condicionales: se decide hoy con una condición escrita**
- **Pegasuz ADR-007.** La decisión es doble: "Modular Monolith" si hay una restricción de costo (empezar monolito y migrar a microservicios y eventos tras encontrar el ajuste producto-mercado) o "Microservice + Event Driven" si no la hay. Estado Proposed. Tabla PrOACT con 5 criterios (costo, mantenimiento, acoplamiento, escalabilidad, extensibilidad). [HUECO] No hay una restricción de costo medida; la condición queda a cargo de quien la tenga.
- **Five Nines ADR-0010 y 0011.** Adoptar Agent Builder (0010) y la evaluación de Vertex AI (0011) empezando por una prueba de concepto o un piloto: "If PoC results meet defined targets, Agent Builder will be adopted as the primary orchestration layer". Los objetivos de la PoC se enumeran (latencia de punta a punta, tokens, costo, resiliencia) sin cifras. ADR-0013 (MoCoP como SaaS): "Reassess after 12 months". [HUECO] Los resultados de la PoC y el piloto no están en el repo (es un diseño en papel).
- **monArch.** README: el equipo puede implementar su propio OpenID Connect si el proveedor en la nube se vuelve prohibitivo ("if it becomes cost prohibitive"); no hay ADR de identidad.
- **CELUS "segunda iteración".** Seis líneas de trabajo para después; la de despliegue remoto de modelos "is heavily dependent on user research and feedback and until verified should be treated as a product hypothesis". ADR-002 dice que la arquitectura debe revisarse de tanto en tanto.
- **Qué enseña.** Que la condición escrita (costo, resultado de una prueba, un plazo, una verificación) convierte "no sé" en una decisión con fecha de revisión. Se conecta con T1.
- **Fuentes.** PG: `ADRs/007.adr-arch-style-np-candidate-mvp.md`. FN: `adrs/ADR-0010…`, `ADR-0011…`, `ADR-0013…`, `requirements/Appendix C_ Future scope.md`. MA: `Readme.md` (línea 199). CC: `4.Solution/2.Suggestion-SecondIteration/README.md`, `3.ARDs/002.BuildTheSystemUsingIterations.md`.

**D4. monArch y Five Nines: supuestos y alcance fuera de los ADR**
- **monArch.** Dos supuestos en el README: el sistema no hace transacciones financieras (el cupón se genera, la compra ocurre en el comercio) y las organizaciones benéficas canjean el valor fuera del sistema. La fuente del primero es la voz del fundador en la primera conversación. También separa "Driving Characteristics" (escalabilidad, extensibilidad y rendimiento marcadas como las tres principales) de "Others Considered" (fiabilidad, recuperabilidad).
- **Five Nines Apéndice C.** Ideas de IA fuera del alcance actual (marketing por IA, inspección automática del vehículo por teléfono, etc.) y mejoras del núcleo (reservas recurrentes, tránsito público). Para el caso de marketing: capacidad, componentes, riesgos (privacidad, spam, sesgo), hoja de ruta por fases y trazabilidad (ADR-0003, 0018 y 0022 sobre los que se apoyaría). [HUECO] No dice por qué cada idea queda fuera; solo cuándo entraría.
- **Qué enseña.** Que se puede cerrar lo de afuera sin ADR: con supuestos con fuente, con una lista de futuros con fases y con prerrequisitos. Por qué estos: FN muestra la forma más completa de "futuro", MA la forma más corta de "supuesto con fuente".
- **Fuentes.** MA: `Readme.md` secciones "Business Case", "Assumptions", "Architecture Characteristics". FN: `requirements/Appendix C_ Future scope.md`, `requirements/4_Assumptions and constraints.md`.

---

## 4. Decisiones contrarias

| Tema | Una decisión | La contraria, con su razón |
|---|---|---|
| Dónde vive la comparación de alternativas | FN, CA, ZA: dentro de cada ADR, con ventajas y desventajas por opción (713, 455 y 534 palabras de media) | AA y BB: el ADR es corto (178 y 188 palabras de media) y enlaza al documento donde está la comparación (AA ADR-002 → `ArchitecturePatterns.md`, con tabla de pros, contras y mitigaciones por estilo; BB: "context link out" en los 19 ADR). Razón que se deduce: el análisis se hace una vez para varias decisiones (en AA, 9 ADR enlazan el mismo `ArchitectureAnalysis.md`). Costo: quien lee el ADR solo no ve la comparación. |
| Qué estado poner | PR: usa Denied, Open, Superseded | FN: no tiene campo de estado; las decisiones condicionadas por PoC (0010, 0011) y por plazo (0013) se escriben en el texto. DA y MA: todos Proposed. |
| Cómo se registra un rechazo | PR: un ADR con estado Denied (021, 024) con la condición de reapertura | AC: ADR-010 "Declined" que no dice qué se rechazó; en el resto de los repos los rechazos solo se guardan dentro de "Alternatives". |
| Cuánto costo se declara | FN, ZA, PG: cada costo con su mitigación (columna o sección de mitigación) | DA: costos genéricos de categoría; BB: lista de contras sin mitigación; PR: característica debilitada con una palabra y sin mitigación. Razón posible: la mitigación obliga a más escritura por ADR. |
| Qué pasa con lo que no es el sistema | BB: ADR de "fuera de alcance" con la frontera decidida (HTTP, WebSocket) | MA: supuesto en el README sin ADR; FN: lista de futuro sin ADR. |
| Costo no resuelto | PR ADR-007: lo marca "currently not solved" y lo manda a Known Limitations | AA ADR-004: "Risks: TODO". Mismo hecho (riesgo abierto), distinto tratamiento. |
| Formato para comparar | PG y ZA: PrOACT (tabla de criterios) y Tradeoffs-Mitigations | PR: características fortalecidas / debilitadas; CC: puntaje de 1 a 5 por criterio; AC: tabla con "++ / + / O / - / --". Cuatro formas de comparar; ninguna cita su fuente en los repos (PrOACT no tiene referencia en ninguno de los dos). |

---

## 5. Límites

- **Conteos hechos a mano.** Los criterios están en 2.1; los casos dudosos (qué cuenta como "nombra una alternativa" en PR y DA, qué cuenta como "necesidad dicha") pueden mover el total unos puntos. Por eso doy las listas de ADR.
- **No sabemos qué se discutió y no se escribió.** Un ADR sin alternativas no prueba que el equipo no las evaluó; prueba que no quedó escrito. Lo mismo con el costo.
- **Las fechas no son de decisión.** Los 15 ADR de DA llevan la misma fecha (2023-09-15); los de BB, tres fechas en 6 días; los 23 de PR, cuatro fechas en 8 días. [DEDUCCIÓN] Son fechas de escritura, probablemente en el marco de la entrega de la kata. No se puede usar el ADR para reconstruir la secuencia de decisiones.
- **Son diseños en papel.** Ninguna decisión se implementó ni se operó; no se sabe si el costo admitido coincide con el costo real, ni cómo respondió el jurado a cada ADR.
- **Faltan las imágenes** en los repos de solo texto. Pueden contener alternativas o criterios: CC ADR-007 (`arch_selection.png`), BB ADR-012 (`chosen-architecture.png`), PG ADR-011 (comparación de precios de nube), PR ADR-002 (`ADR-002-architecture-style.png`) y los "worksheets" de los quanta de PG (`quanta/*.md` los citan como imágenes).
- **Los identificadores solo se comprobaron** contra el documento de requisitos en PR, FN y T7. En AA, BB y PG verifiqué que el enlace existe, no que lo enlazado justifique la decisión.
- **Sobre el libro.** No se puede afirmar que los equipos aprendieron el método del libro: solo AC y MA lo citan (por enlace) y ninguno por autor. Lo que sí se puede afirmar es que el vocabulario y la plantilla circulan entre los equipos (AA usa los campos de AC; CC cita a Jacqui Read, integrante de AA; PG y ZA comparten plantilla).
- **Conocimiento externo al repo** (marcado como tal): que las frases de T7 "First Law" y "Second Law" son las del libro de Richards y Ford, que la fecha 2011-11-15 de la plantilla de BB es la del artículo de Nygard, y que developertoarchitect.com es el sitio de Mark Richards. Ninguna de esas relaciones está escrita en un repo.
- **No cubre** el contenido técnico de las decisiones (eso es de los otros dossiers); solo cómo están escritas.

---

## 6. Para elegir el elenco

- **Pragmatic** ilustra mejor que cualquiera el vocabulario del costo: 17 ADR con "características fortalecidas / debilitadas", requisitos y supuestos numerados con trazabilidad ("Q2, based on A2"), 8 ADR que los citan, y 4 estados fuera de lo habitual (Denied ×2, Open, Superseded) más una sección "Known Limitations" enlazada a los ADR. Es el caso con más material para "cerrar lo que queda fuera" (C1, C2, C3, D2). Defectos que también enseñan: ADR-006 → 007 sin motivo (B2), referencias a Q4 y Q26 que no existen (B6), ADR-010 cortado, ADR-012 y 013 ausentes. [DEDUCCIÓN] Sirve como caso principal si el curso quiere mostrar un ADR vivo con sus imperfecciones.
- **Five Nines** ilustra mejor el ADR con alternativas y riesgos sistemáticos: 22 de 22 con alternativas y tabla de riesgos con mitigación, 10 con requisito por ID. Es el mejor ejemplo para "ADR completo" (A1) y el único con una discrepancia verificable entre ADR y requisito (B1). No tiene estado ni fecha, y los ADR 0001 a 0012 no citan requisitos. Para "lo que queda fuera" aporta el Apéndice C y las decisiones condicionales por PoC (D3, D4), con menos material que BB y PR.
- **Mejor que ambos para partes concretas:**
  - **BluzBrothers** para cerrar lo que queda fuera (D1): ADR de fuera de alcance, tabla de postergados y respuestas del cliente; y para el enlace ADR → documento (19 de 19).
  - **ArchColider** para la comparación con números y costo de operar (A2) y para el registro de trade-offs (`2.SolutionBackground/Tradeoffs.md` enlaza cada trade-off a su ADR).
  - **CELUS Ceals** para criterios con puntaje y para el ADR que admite que no hay razón técnica (A4).
  - **Team 7** para aceptar un costo porque la cualidad es crítica para el negocio (A5).
  - **Pegasuz** para la decisión condicional y la plantilla PrOACT con trade-offs y mitigaciones (D3).
- **Qué conviene no tomar como ejemplo de ADR completo:** DA (costos de categoría, mismo Context en cinco ADR) y MA (todo Proposed, alternativas en 4 de 7); sirven como contraste (B5).

---

## 7. Términos que hay que explicar

- **ADR (Architecture Decision Record):** una nota corta que anota una decisión de diseño con su contexto y sus consecuencias, para que alguien pueda entender después por qué se decidió así.
- **Plantilla de Nygard:** el formato original de ADR (estado, contexto, decisión, consecuencias); AC, AA, BB y CC enlazan su artículo.
- **Estado de un ADR (Proposed, Accepted, Superseded, Denied, Open, Obsolete):** dice si la decisión está propuesta, vigente, reemplazada por otra, rechazada, pendiente o ya sin uso.
- **Trazabilidad:** poder seguir una decisión hasta el requisito que la pidió, y al revés.
- **Característica de calidad (architecture characteristic):** una cualidad que se le pide al sistema aparte de lo que hace (rendimiento, disponibilidad, seguridad…); en el vocabulario del método, una decisión la "fortalece" o la "debilita".
- **Trade-off:** renunciar a algo para ganar otra cosa.
- **Mitigación:** la medida que reduce un costo o riesgo ya declarado.
- **PrOACT:** un método de decisión (problema, objetivos, alternativas, consecuencias, trade-offs) que PG y ZA usan como sección del ADR.
- **Quantum (quanta, plural):** la parte del sistema que se despliega y escala como unidad con sus propias características; vocabulario del método.
- **Fitness function:** una prueba automática que comprueba que el sistema cumple una característica.
- **Bounded context / subdominio de apoyo:** un límite dentro del cual las palabras del negocio tienen un solo significado; "de apoyo" es el que sostiene el negocio pero no lo diferencia.
- **Fuera de alcance / decisión postergada:** lo que el diseño deja sin resolver a propósito, y la razón o la condición.
- **COTS:** producto comercial listo para usar.
- **PoC (prueba de concepto) / piloto:** una prueba pequeña para comprobar una decisión antes de adoptarla.
- **RAID log:** tabla de riesgos, supuestos, problemas y dependencias.
- **RGPD (GDPR) / datos personales:** la norma europea que limita guardar datos personales (ADR-0017).

---

## 8. Qué se puede mostrar en pantalla

- **Tabla de los 12 repos** (2.1): ADR, alternativas, costo y requisito, con los tres totales 96 / 167 / 50 sobre 183. Fuente: conteo propio, en este dossier.
- **Los tres números como barras:** costo 91 %, alternativa 52 %, requisito citado 27 %.
- **Una misma plantilla de ADR por repo, lado a lado:** Nygard en AC/AA/BB (Status, Context, Decision, Consequences), PR (con "Strengthened / Weakened characteristics"), FN (Alternatives Considered + tabla Risks & Trade-offs), PG/ZA (Alternatives + PrOACT + Tradeoffs-Mitigations), CC (Evaluation Criteria + Options con puntaje). Fuentes: `ADR-000-template.md` (PR), `ADR-0000 - Template.md` (FN), `001.adr-template.md` (PG), `001.ADRTemplate.md` (CC), `4.ADRs/001…` (AC).
- **FN ADR-0017:** la tabla de riesgos (5 filas) y el bloque "Alternatives Considered" con los tres "Rejected". Fuente: `adrs/ADR-0017…`.
- **FN: las dos cifras:** NFR_7 "photos 90 days" frente a ADR-0017 "Default: 180 days" y el diagrama de secuencia "Photos stored 90 days (ADR-0017: GDPR compliance)". Fuentes en B1.
- **AC ADR-003:** las cuatro opciones con precio y la frase "we would have to appoint 0.2-0.5 time of a developer / administrator…". Fuente: `4.ADRs/003…`.
- **PR ADR-007 y ADR-024:** las listas de características fortalecidas y debilitadas, y la frase "Denied, we prefer the load over the memory cost."
- **Línea de estados de PR:** ADR-006 "Superseded by ADR-007", ADR-021 "Denied", ADR-022 "Open", ADR-024 "Denied". Fuente: cabecera de cada ADR.
- **BB:** la tabla "Postponed decisions or well-known issues" (6 filas) y la secuencia ADR-005 / 006 / 013 / 014 con la frase "In response to a client inquiry, it was clarified…". Fuentes: `README.md`, `ADR/ADR-006…`.
- **T7 ADR-8:** el estado "**OBSOLETE**" junto a la lista de ADR del README sin el 8. Fuentes: `ADR/ADR-8-messaging-sync.md`, `README.md`.
- **CC ADR-003:** las dos tablas de puntaje (5/3/3 y 4/4/4).
- **Citas del método:** AC `README.md` línea 19 y MA `Readme.md` línea 370 (los dos enlaces al libro); T7 `README.md` líneas 29-30 y su "Second Law".
