# Cómo razonó Pragmatic: reconstrucción del proceso

Kata de otoño 2024 de O'Reilly · ClearView (Diversity Cyber Council) · equipo **Pragmatic**, primer puesto.

Este documento es la columna vertebral del curso `pragmatic`. Reconstruye, con la historia completa de git, en qué orden entendió y decidió el equipo. Cada afirmación lleva su evidencia (hash corto y ruta). Las marcas significan:

- **[Probado]**: lo dice el repositorio (un commit, un archivo, una fecha escrita en un artefacto).
- **[Inferido]**: una lectura razonable de la evidencia, que el repositorio no afirma. Se dice de qué se infiere.

Fechas en hora de Europa central (los commits llevan `+0200`). Cuando difieren la fecha de autor y la de commit, se aclara.

---

## 0. Ficha

| Dato | Valor | Fuente |
| - | - | - |
| Repositorio | `github.com/TheKataLog/Pragmatic` (clon completo) | `git remote -v` |
| Resultado | 1.º puesto; 2.º Katamarans; 3.º Ctrl+Alt+Elite; finalistas ArchZ, DevExperts, Equihire Architects, Jazz-Executor | Perfil de la organización TheKataLog, sección «Finalists: Autumn/Fall 2024» (`github.com/TheKataLog/.github`, `profile/README.md`) |
| Periodo | 2024-09-19 (commit inicial) → 2024-10-16 | `git log` |
| Commits | 89 (incluye 2 merges) | `git log` |
| Autores | 3, acreditados en `README.md` → *Team*. Reparto: 48 commits de quien arma la estructura y el C4 (Tobias Heller), 16 de quien escribe requisitos, entrevista y la mayoría de los ADR (James Dermelj), 25 del handle `smart-contract-check.com` (event storming digital, ADR-011, los C3 de candidato, historia y matching, SVG) | `git log --format=%an` |
| Volumen final | ~11.700 palabras en Markdown; 25 ADR numerados del 000 al 025, sin 012 ni 013 | árbol final |

En el guion no se nombra a nadie: se habla de «el equipo». Aquí se usan los nombres tal como aparecen como autores de commit y en el README, solo para atribuir el trabajo.

---

## 1. El pliego (lo que recibió el equipo)

**No está en el repositorio de Pragmatic.** Se recuperó del documento de Google que enlaza el README de Equihire Architects (finalista del mismo kata), en la sección *Requirements*: `docs.google.com/document/d/1jCHMAvgzqaYaAp09br12OC4ozpVXZR3s9ezgEqncZ9U`. Se descargó como texto (solo lectura) y su contenido coincide con lo que citan DevExperts (`README.md` → *Problem*) y ArchZ (`business-requirements/requirement-analysis.md`, que cita los requisitos textualmente).

Resumen fiel del pliego, «Diversity Cyber Council Kata Requirements 2024»:

- **Cliente.** Diversity Cyber Council, una organización sin fines de lucro (501c3) que ayuda a grupos subrepresentados en tecnología con formación, mentoría y empleo.
- **Programa.** *ClearView*, una plataforma de RR. HH. complementaria que **anonimiza** la información del candidato y destaca habilidades objetivas y experiencia, para reducir el sesgo en la contratación. También será *service based* en otro sentido: consultores de DEI acompañan entrevistas y reportan a la dirección.
- **Dos problemas.** (1) Faltan métricas que identifiquen y reduzcan sesgos en contratación y entrevistas. (2) Los ATS tradicionales (*applicant tracking software*) son redundantes e ineficaces para emparejar candidatos con puestos.
- **La solución pedida.** IA que construye **historias** del candidato en formato S.M.A.R.T. (específico, medible, alcanzable, relevante, con plazo), alineadas **cuantificablemente** con los puestos abiertos. Toda información personal se elimina hasta decidir a quién se avanza. **La empresa paga por desbloquear** el perfil. Los datos se agregan para revelar disparidades entre contratados y descartados. Lema: *Transparent Decision Making*.
- **Usuarios.** Empleadores, candidatos, administradores.
- **Requisitos «duros».** IA que reconstruye currículums en formato S.M.A.R.T. y los alinea con puestos; puntaje de similitud; consejos de IA para el currículum; IA que elimina indicadores raciales, de estilo de vida y culturales; agregación de datos en el backend.
- **Cinco *data points*.** 1: avanzar con un candidato. 2: desbloquear el perfil completo para ofrecer entrevista. 3: encuesta de 5 preguntas al candidato sobre el entrevistador. 4: encuesta de 5 preguntas al entrevistador sobre el candidato. 5: datos demográficos al rechazar o al ofertar. Más un reporte mensual de KPI.
- **Recorridos.** Empleador (registro, autocompletado de datos por IA, panel, carga de puestos), candidato (con preguntas abiertas del propio pliego, por ejemplo «Mark as inactive (hired!) – does the system do this?»), administrador.
- **Detalles técnicos.** «Assume a trained LLM». Integrarse con los sistemas de RR. HH. más populares; da 11 ejemplos (SAP SuccessFactors, UKG Pro, Paycor, Workday, Paycom, Namely, GoCo, isolved, Paylocity, Trinet, Gusto).

**Lo que el pliego no da:** ningún volumen (usuarios, puestos, transacciones), ningún presupuesto, ningún plazo. El equipo tuvo que suponerlos (ver A17, A29 a A31).

**Hubo además unas diapositivas** que no se conservan. Las preguntas abiertas del primer borrador de requisitos (`cad0b4f`, borradas en `a774a6b`) dicen: «Contradictions in slides vs. doc: word "resume" vs. "full profile" in an unlock; suddenly it's an interview..». [Probado que existían; contenido no recuperado.]

---

## 2. Cómo se hizo esta reconstrucción

- `git log --stat` completo, con fecha de autor y de commit.
- `git show <hash>:<ruta>` de cada versión intermedia de los archivos clave: requisitos, entrevista, características, ADR-002, ADR-006, ADR-007, ADR-011, C1, C2, C3 de matching.
- Las versiones históricas de las imágenes: la hoja de características (`1e333a8`, `19cdc81`, final), el C1 y el C2 del 28/09 (`2899b87`).
- Las fechas escritas **dentro** de los artefactos (las hojas de trabajo y el tablero digital dicen 23/09/2024) se cruzaron con las fechas de commit.
- Para el corte 30/09 → 14/10 se comparó la actividad de los siete finalistas (ver §3.9).

---

## 3. Cronología día por día

### 3.1. Jueves 19/09: el repositorio existe

- `f5002d8` 18:06: commit inicial, un README de dos líneas («A (hopefully) pragmatic approach to the Architectural Kata 2024»). [Probado]
- Otros finalistas tienen su primer commit el 19 o el 20/09 (ArchZ, Equihire, Jazz-Executor el 19; Ctrl+Alt+Elite y DevExperts el 20). [Probado] → El kata probablemente arrancó el 19/09. [Inferido]

### 3.2. Lunes 23/09: el día del taller

Es el día más denso en decisiones, aunque solo deja 8 commits.

1. **07:52 `6ea3eb9`**: esqueleto de documentación. Plantilla de ADR (`ADR/ADR-000-template.md`: Date, Status, Context, Decision, Consequences), la hoja de características de Mark Richards en PDF (vacía; resaltadas como implícitas *feasibility* y *security*), `C4/TODO.md`, `EventStorming/TODO.md`. [Probado] → **Antes de pensar el sistema, eligieron las herramientas del método**: event storming, hoja de características, ADR y C4. [Inferido del esqueleto]
2. **08:52 `35471ec`, ADR-001** (*Use Domain Driven Design*): «Tenemos poco tiempo para llegar a una arquitectura inicial», así que usan DDD y **event storming** para lograr un entendimiento común en el que participen todos. Consecuencia escrita: «se gasta mucho tiempo en DDD, que puede faltar en otra parte». [Probado]
3. **El event storming.** El tablero digital (`EventStorming/assets/Eventstorming.png`) dice «Team: Pragmatic, Date: 23.09.2024». La foto de la mesa con post-its (`eventstorming_stickynotes.jpeg`) es la primera iteración. Ambos se suben recién el 29/09 (`0f2599c`). [Probado] Lo que el tablero muestra:
   - El flujo central: registrarse → subir currículum (→ «consejos recibidos») → **enviar currículum → «currículum publicado» → «currículum anonimizado a historia» → «historia publicada»** → «match creado con historia y puesto» → el responsable de contratación revisa, **desbloquea** → «proceso de cobro iniciado» → sistema de cobro → «pago aceptado» → «candidato desbloqueado» → sistemas de RR. HH. «(1 a n)» → «contratado» → encuestas a ambos.
   - Notas rosadas (supuestos, preguntas, problemas, decisiones). En la foto: «Human readable?», «What format?», «Story is an anonymized version of the resume». En el digital: «A: Human Readable», «A: Story is an anonymized version of the resume», «D: payment process synchronous», «A: Job Candidate can overrule a hiring» frente a «A: We don't want that users must accept it», «D: [el reporte mensual] should be automatically».
   - Una nota amarilla en la mesa: «Most events are used for analytics & reports». En el digital: «For the sake of clarity, analysis and report data are not explicitly included in the flow».
   - → **La pregunta del formato de la historia (¿legible por humanos?) aparece en el primer día**, y es la semilla de ADR-011. [Inferido: la nota está en la foto y la decisión llega el 29/09]
4. **La hoja de características** (`ArchitectureCharacteristics/images/architecture-characteristics.png`, subida 16:26 en `1e333a8`) dice «Date: 2024/09/23» y **ya tiene marcado el top 3**: *interoperability*, *feasibility*, *testability*. Las 7 conductoras: security (subida desde implícitas con una flecha), interoperability, feasibility (subida desde implícitas), fault tolerance, testability, adaptability, scalability. «Otras consideradas»: extensibility, configurability, abstraction. Implícita que queda: observability. [Probado]
5. **La hoja de estilos** (`ADR/images/ADR-002-architecture-style.png`, subida el 27/09 en `fd63c82`) también dice «2024/09/23». Marca **service-based** y **event-driven**. Nota al pie: «\* Is used as a substitute for feasibility (each 0.5x weight)»: como la hoja no tiene fila de *feasibility*, la reemplazan por **cost** y **simplicity** con medio peso cada una. Recuadros: en service-based, cost (4 estrellas), simplicity (3) y testability (4); en event-driven, interoperability (3). [Probado]
6. **16:26–16:31 ADR-002** (*Architecture style*): «service-based; donde haga falta, event-driven para mejor interoperabilidad y *deployability*». El 26/09 (`102e306`) queda un «TODO: James»; el 27/09 (`fd63c82`) se agrega la hoja y el descarte del **microkernel** «por sus limitaciones en escalabilidad y tolerancia a fallos, dos de nuestras 7 características». [Probado] La sección «fortalecidas / debilitadas» recién se escribe **el 15/10** (`c6523b5`), después del corte. [Probado]
7. **14:02 `246c55e`, ADR-005** (*Async APIs with external systems*, fecha interna 24/09): enviar a sistemas externos (RR. HH., cobro) de forma asíncrona; «un sistema de RR. HH. caído no debe bloquear procesos». Consecuencia: hace falta un mecanismo de reintento. [Probado]
8. **16:36 ADR-003** (*Batch for analytics*, estado *Proposed*): reportes y análisis en procesos programados (diarios, mensuales), no en tiempo real. [Probado]

→ **Lectura del día:** en un solo día pasaron del negocio (event storming) a las características y al estilo, **antes** de escribir la lista de requisitos y **antes** de hablar con el experto en IA. [Probado por fechas] El estilo no se revisó después: sobrevivió a todo lo que vino. [Probado: ADR-002 nunca cambió de decisión]

### 3.3. Martes 24/09: escribir el porqué de las 7

- **`c277932` 17:24**: `Characteristics.md` con la tabla de definiciones y una línea de porqué por cada una de las 7. Dos importan para el curso: *Feasibility*: «decisiones económicas minimizan la variación de costo de lo básico, compensando la incertidumbre de la IA»; *Scalability*: «hace falta para manejar la **complejidad cuadrática del proceso de matching**». Top 3: «TODO». [Probado]
- → El 24/09 ya intuían que el matching podía crecer de forma cuadrática. Cinco días después, ADR-011 lo resuelve por otro lado. [Inferido; buen puente narrativo]
- `e5e65c5`: se prepara el C1.

### 3.4. Miércoles 25/09: supuestos numerados, preguntas para el experto, C1 y top 3 escrito

- **00:30 `cad0b4f`**: `Requirements/requirements-and-assumptions.md`, primera versión. Requisitos funcionales **R**, cualitativos **Q**, supuestos **A**, con una regla escrita: «Es un proceso iterativo: al borrar, no reordenes ni reasignes números; deja el hueco». Incluye «Open Questions» y «Notes for later». [Probado] Lo más valioso de ese borrador, después borrado (`a774a6b`, 30/09):
  - «**A9 & A10 shows a contradiction. Could be a interesting base for an argument.**» A9: «un proceso justo busca más determinismo y menos arbitrariedad». A10: «los modelos de IA pueden ser deterministas, pero el entrenamiento usa aleatoriedad; versiones distintas dan resultados distintos».
  - «**Idea: Use as little AI as necessary.**»
  - Una decisión sobre «hired»: representa una contratación real y no «pasó de ronda», aunque «nuestra decisión contradice el Data Point 1 del documento» (escrito en alemán en el original).
  - «Important!: Matching pre-filtering? Does user need to enter, where they want to apply?»
  - → **La tensión que define la solución (IA no determinista frente a un proceso justo y repetible) está escrita como «nota para después» el 25/09 a la madrugada.** [Probado]
- **01:08 `870a617`**: A17, el único número de volumen: «tope de 250.000 puestos abiertos por mes en el sector de información de EE. UU. (Statista); con 10 % de mercado, 25.000 puestos por mes y más o menos la misma cantidad de candidatos activos». A18: uso esporádico, cargas livianas de texto. Y las **preguntas para el experto en IA** (`Evidence/interview-ai-expert.md`): soluciones empresariales, conocimiento especializado, ciclo de vida de modelos, contexto frente a entrenamiento, determinismo, costos, previsibilidad del costo, cómo probar la IA, apoyo a ONG. [Probado]
- **`5a293a4`/`f58bf5c`**: C1 (contexto) con 4 personas y el sistema de RR. HH. **Todavía no hay «AI System» en el C1** (entra recién el 30/09, `8516c51`). [Probado]
- **16:43 `d093b51`**: se escribe el **porqué del top 3**, con tres desafíos: (1) la IA introduce comportamiento no determinista e incertidumbre en cada versión nueva; (2) una ONG que usa IA corre el riesgo de costos excesivos; (3) integrar muchos sistemas de RR. HH. es caro porque cada API es distinta. → *Feasibility*, *Interoperability*, *Testability*. [Probado]

### 3.5. Jueves 26/09: la sesión de diseño (y probablemente la entrevista)

- **09:11 `6af9574`**: se agrega una pregunta para el experto: «¿Cómo son las API de los modelos (sincrónicas, asincrónicas, de larga duración)?». [Probado]
- **20:04 `4cb40d5`**: C1 suma *Mail Server* y *Survey System* como sistemas externos. [Probado]
- **20:10 `19cdc81`**: *data integrity* entra a «otras consideradas», con el porqué: «impacta sobre todo la implementación y se solapa con la testabilidad de la IA». [Probado]
- **22:03 `c7a9e8e`, «Requirements and assumptions after today's session»**: se borra Q4 (los puestos necesitan una representación condensada para compararse), se reescribe Q2 (concurrencia de responsables de contratación), aparece A19. [Probado]
- **Los ADR 006 a 024 llevan todos «Date: 2024-09-26»** y nacen como esqueletos de una o dos líneas en `4923a1c` (27/09 20:11), varios con notas en alemán. [Probado] → Son las actas de la sesión del 26/09: allí se tomaron casi todas las decisiones de diseño, y se redactaron el 29/09. [Inferido de la fecha interna común y del mensaje «after today's session»] Lo que dicen los esqueletos:
  - ADR-006: «AI Models run on separate containers → availability, scalability, testability, fault-tolerance». Estado *Accepted*.
  - ADR-007: «**Flexibility toward AI models** – need to be runnable externally, if local models are not feasable or». Frase sin terminar.
  - ADR-010: «Create features from story, and not from resumes. Reason: Anonymization».
  - ADR-011: «Matching based on AI or deterministic: Decision / Nachvollziehbarkeit, testbarkeit, performant / Wie? / Gegenargument: Es wird dynamischer. Anpassbarer» (trazabilidad, testabilidad, rendimiento; ¿cómo?; contraargumento: se vuelve más dinámico, más adaptable).
  - ADR-012: «Matching algorithmus und Spyder».
  - ADR-013: «All users and matches should be influenced by the same AI models and prompts to ensure fairness».
  - ADR-017: analytics y reporting en un servicio, con arquitectura hexagonal adentro.
  - ADR-018: «Survey service as its own service → Denied».
  - ADR-019: tres opciones para llevar el Data Point 5 a analytics.
  - ADR-022: «RabidMQ > Kafka», identidad, OAuth, ¿base de datos?, plataforma de contenedores.
  - ADR-023: «around **10'000** employers, 100 different HR Systems, average perhaps 2 HR systems per employer».
  - ADR-024 (archivo `caching-of-reviews`): «not time sensitive, if HR system is down anyways; memory is more expensive than a queue». *Denied*.
- **La entrevista.** Las preguntas se completan el 26/09 a la mañana y las notas crudas se suben el 27/09 20:11 (`4923a1c`). El C2 del 28/09 08:42 (`ab2291b`) ya tiene la leyenda «Service with external AI». [Probado] → La entrevista ocurrió el 26 o el 27/09. [Inferido]

### 3.6. Viernes 27 y sábado 28/09: el C2 y la integración con RR. HH.

- **27/09** `bfdda60`, `d346795`: borradores del C2. `fd63c82`: se sube la hoja de estilos al ADR-002. `4923a1c`: esqueletos de ADR 006–024 y notas de la entrevista. [Probado]
- **Notas crudas de la entrevista** (`4923a1c`, antes de la limpieza): soluciones Azure, Google Cloud, OpenAI; diseñar la solución exige conocimiento muy especializado («pagas los errores o pagas profesionales»); el *prompt engineering* es prueba y error; temperatura al mínimo, pero «aun con temperatura 0… puede llevar a comportamiento caótico»; costo por token, «500.000 prompts → 500.000 USD» en un proyecto con prompts grandes de texto; flat rate (PTU) desde 60.000 USD/mes; cada cambio de prompt o modelo puede volverse caótico, hace falta un set de pruebas grande; no conoce apoyo especial a ONG; REST con demoras, «max 60s», si se llega al rate limit «te bloquea»; tendencia: cada vez más barato; modelos open source, pero para que salga más barato hay que tenerlos on-prem y pagar el mantenimiento; «el costo operativo lo dominará la IA, el nuestro será despreciable»; ciclo de vida corto de los modelos; preprocesar currículums contra *prompt injection*. [Probado]
- **28/09** `ab2291b`, `26bb562`: C2 final y su documento. Contenedores: UI, Job candidate, Matching, Employer, Story (los cuatro con ícono «AI»), base compartida, *Matches Topic*, Billing, HR Integration, Analytics con base analítica, Admin UI. En esa versión existe todavía una base propia de candidatos, que después desaparece. [Probado por imagen `2899b87`]
- **28/09 11:45 `af4443a`**: el **primer C3 es el de HR Integration**, antes que los de IA. Suscriptor al topic de matches, orquestador, un adaptador por sistema de RR. HH., base de configuraciones, almacén de secretos, *dead-letter queue*. [Probado] → La integración con RR. HH. se diseñó en detalle **antes** que el matching. [Probado por orden de commits]

### 3.7. Domingo 29/09: el día de la IA

- **18:20 `0f2599c`** (`smart-contract-check.com`): se suben el event storming (foto y digital) y su documento, los C3 de candidato, historia y matching (imágenes), y el **diagrama de los seis procesos de matching** (`matching_process.drawio.png`, luego `ADR/images/ADR-011-matching-process.png`). [Probado]
- **18:50 `7f015e4`/`0998734`**: **primera versión de ADR-011** en otro archivo (`ADR-011-matching-based-on-ai-or-deterministic-methods.md`): las opciones A–F y la elección de B, con argumentos de transparencia y «menos cómputo». [Probado]
- **23:45 `72923e5`** (James Dermelj), el commit más grande del proceso: «ADRs written». Redacta en prosa los ADR 006–024. **ADR-006 pasa a «Superseded by ADR-007» en el mismo commit en que se escribe su contenido.** ADR-007 cambia de nombre (`flexibility-toward-ai-models` → `use-of-external-llms`) y de contenido: tres propuestas (LLM externo, open source en contenedor en la nube, open source on-prem) y gana **la externa**. ADR-012 y ADR-013 **se borran**. Crea `Evidence/token-estimation.md`. Agrega **A20 a A31** (todos los supuestos sobre LLM y la escala de RR. HH.) y **Q12 a Q16**. [Probado] Su propio ADR-011 (`ADR-011-deterministic-matching.md`) tiene «TODO» donde van las opciones y «Option X has the best properties, with only linear».
- **23:59 `86c346e`, «Merged text of ADR-011»**: une las dos versiones. De una salen las opciones, el diagrama y la decisión B; de la otra, el marco de costo, los criterios Q14 y Q15, y la **complejidad en cantidad de prompts: lineal, O(n+m), para A y B; cuadrática para el resto**, con la salvedad del prefiltrado. [Probado] El archivo paralelo se borra el 30/09 (`a774a6b`).
- **La estimación de tokens** (`Evidence/token-estimation.md`): un prompt simple de unos 850 tokens (instrucciones + unos 700 tokens de currículum), una respuesta de unos 400 palabras ≈ 1.400 tokens, y el precio de OpenAI archivado el **29/09** (`web.archive.org/web/20240929131353/...`): con GPT-4o, «al menos 0,025 $ por prompt y respuesta»; con GPT-4o mini, «0,001 $». Concluye en A24. [Probado]

### 3.8. Lunes 30/09: el día de la entrega

23 commits, el pico del proceso. [Probado]

- **07:52 `8c0e5f4`**: aparece **ADR-004** (*Data integrity downplayed*), con fecha interna 23/09: se baja la integridad de datos porque la cubre la testabilidad, se resuelve en código y «no está en la hoja de estilos». ADR-002 pasa de *Proposed* a *Accepted* y suma «Needs ADR-004». [Probado] → La decisión se tomó el 23 o el 26/09 y se documentó el 30. [Inferido]
- **08:08–12:03**: glosario (`1c343ff`, `30f7dfc`, `3f170ab`), *Known limitations* (`8516c51`), **AI System entra al C1** (`8516c51`), limpieza de la entrevista y traslado de `Evidence/` a `Requirements/Research/` (`a774a6b`, donde también se borran las preguntas abiertas), casos de uso con diagramas de secuencia (`72df315`, `06b6cfc`). [Probado]
- **12:24 `9a3c22b`, ADR-025** (*AI test concept*): sets de prueba (currículum → historia esperada y características esperadas; currículum → consejos; puesto → características; empleador → datos públicos; matches esperados) y alcances de prueba por tramo. Consecuencia: la anonimización solo la verifican humanos u otro LLM. Debilita el costo: las pruebas también consumen prompts. [Probado] Es la última decisión de diseño nueva antes de la entrega.
- **15:55 `d4c4fbb`**: limitación por rate limit en el README. [Probado]
- **19:43–21:04**: diagramas C4 actualizados, iconos del event storming, enlaces. [Probado]
- **22:21 `023dc6f`**: «Linking ADRs to support top 3 driving characteristics»: el README lista qué ADR realiza cada una de las tres; ADR-015 mueve *adaptability* de «debilitada» a «fortalecida»; ADR-005 y ADR-020 suman «interoperability». [Probado] → El mapa «top 3 → ADR» se armó al final, mirando hacia atrás. [Inferido; es una lectura retrospectiva, no la causa de las decisiones]
- `a803eb4`: escrito el 30/09 15:10 pero commiteado el 14/10 17:12. [Probado] → Un commit del día de entrega que quedó sin subir. [Inferido]

### 3.9. El corte del 1 al 13/10

- Ningún commit. [Probado]
- Cinco de los siete finalistas tienen su día de más commits el 30/09: Pragmatic (23), Katamarans (62), Jazz-Executor (103), ArchZ (20) y DevExperts (23, su único día de trabajo después del commit inicial). Las excepciones: Equihire (5 commits el 29/09 y 3 el 30/09; su pico es el 14–15/10) y Ctrl+Alt+Elite (7 commits en total, casi todo subido el 16 y 17/10). [Probado]
- Vuelven a commitear entre el 13 y el 17/10: Pragmatic, ArchZ, Equihire, Jazz-Executor y Ctrl+Alt+Elite; Katamarans, uno solo el 16/10. [Probado]
- → El 30/09 fue la fecha de entrega de la ronda clasificatoria, y del 14 al 16/10 los finalistas pulieron antes de la presentación final. [Inferido: el patrón se repite en la mayoría de los equipos, pero ningún repositorio menciona las fechas del concurso]

### 3.10. Del 14 al 16/10: pulido, más dos aclaraciones de fondo

Casi todo es forma: enlaces rotos, erratas, «candidate» → «jobcandidate» en todos los archivos (`06555b6`), tablas reformateadas, gramática (`72882d2`), carpeta `.idea` subida y borrada, PNG → SVG (`842e304`), crédito al experto (`c959930`). [Probado]

Lo que sí cambia el contenido:

- **`9891219` 15/10: la introducción del README.** Antes era una lista de objetivos. Ahora es la tesis: los LLM prometen soluciones fáciles, pero traen riesgos (pocos ingenieros con experiencia, costo alto e impredecible, rate limits, ciclos de vida cortos, sesgo propio); «nuestra arquitectura navega todos estos riesgos» y «ahorramos costo deliberadamente en otras partes de la arquitectura para mitigar el precio impredecible de la IA». [Probado] → La frase que resume el proyecto se escribió después de la entrega. [Probado]
- **`c6523b5` 15/10**: ADR-002 suma el contexto (cambiar de estilo después es caro) y las características fortalecidas (testabilidad, costo, agilidad) y debilitadas (elasticidad, por la base compartida). [Probado]
- **`3641df8` 15/10**: el C3 de matching decía que el sistema «los califica usando IA». Se corrige a «**la IA solo extrae características; el puntaje y el match no**», en línea con ADR-011. Y el C3 de historia deja de decir que la anonimización es determinista. [Probado] → Hasta el 15/10, el texto del C3 contradecía el ADR central. [Probado]
- **`ed4dc28` 16/10**: la limitación del rate limit suma: si hace falta conocer el tráfico de todos los clientes del LLM, habrá que juntarlos en un solo contenedor. [Probado] → Vuelve, como limitación, la idea de centralizar la IA del ADR-006 descartado. [Inferido]
- **`79335af`/`548bbe0` 14/10**: se resube la hoja de características «sin el corrector ortográfico». La nueva versión **ya no tiene *data integrity*** en «otras consideradas». [Probado]

---

## 4. Lo que cambiaron de opinión

| Qué | Antes | Después | Evidencia | Qué lo movió |
| - | - | - | - | - |
| Dónde corre la IA | ADR-006 «modelos en contenedores separados», *Accepted*; ADR-007 «flexibilidad: que se pueda correr afuera si lo local no es factible» | ADR-007 «usar LLM externos»; ADR-006 *Superseded* | `4923a1c` → `72923e5` | La entrevista: lo local solo abarata on-prem y con mantenimiento propio; el conocimiento es caro y escaso; los modelos quedan viejos en 1–2 años (A20, A21, A24, A25). [Inferido de las citas de ADR-007] |
| El matching | 24/09: «escalabilidad por la complejidad cuadrática del matching» | 29/09: la IA solo extrae características legibles; el puntaje es determinista; prompts lineales | `c277932` → `86c346e` | La nota «A9 y A10 se contradicen» y la idea «usar la menor IA posible» (`cad0b4f`). [Probado que existían; el vínculo es inferido] |
| ADR-012 y ADR-013 | Esqueletos: «algoritmo de matching y Spyder»; «mismos modelos y prompts para todos, por justicia» | Borrados; «Spyder» entra a ADR-011 como definición; la justicia reaparece como Q14/Q15 (cambiar prompt o modelo obliga a reprocesar los puntajes) | `72923e5` | Fusión de temas en ADR-011. [Inferido: no hay mensaje que lo explique] |
| Escala de RR. HH. | ADR-023 «unos 10.000 empleadores» | A30 «100.000 empleadores de TI», A31/Q16 «hasta 200.000 configuraciones» | `4923a1c` → `72923e5` | Sin fuente citada para el cambio. [Probado el cambio; el motivo no consta] |
| Encuestas | ADR-018 «servicio propio de encuestas → Denied» | ADR-018 «Location of survey triggers», opción B aceptada: los disparadores van en los servicios de candidato y empleador; ADR-020: encuestas en SurveyMonkey o similar | `4923a1c` → `72923e5` | Reformulación de la misma decisión, con DDD (los correos no salen de su servicio). [Probado] |
| Puestos condensados | Q4: los puestos necesitan una representación condensada | Q4 borrado el 26/09 | `c7a9e8e` | La sesión del 26/09. ADR-010 sigue citando «Q4». [Probado] |
| Automatización | A15 «el trabajo manual es caro» y Q10 «automatizar el backend» | Borrados | `72923e5` | Sin explicación. [Probado] |
| Integridad de datos | Ausente | 26/09 «otras consideradas»; 30/09 ADR-004; 14/10 desaparece de la imagen | `19cdc81`, `8c0e5f4`, `79335af` | [Probado] |
| C3 de matching | «califica con IA» | «la IA solo extrae características» | `3641df8` (15/10) | Alinear el diagrama con ADR-011. [Probado] |

Lo que **no** cambió nunca: el estilo (service-based + event-driven), el top 3 y el envío asíncrono a sistemas externos. Las tres cosas son del 23/09.

---

## 5. Inventario de artefactos

| Artefacto | Primera aparición | Contenido sustantivo | Últimos cambios |
| - | - | - | - |
| Plantilla ADR, TODO de C4 y de event storming | `6ea3eb9` 23/09 | — | `8c0e5f4` 30/09 |
| ADR-001 DDD + event storming | `35471ec` 23/09 | mismo día; ampliado `72923e5` | `72882d2` |
| Hoja de características (PNG) | `1e333a8` 23/09 | top 3 ya marcado | `548bbe0` 14/10 (sin *data integrity*) |
| `Characteristics.md` | `c277932` 24/09 | top 3 `d093b51` 25/09 | `89ed35c` 15/10 (formato) |
| ADR-002 estilo | `1e333a8` 23/09 | `7cbeba6` 23/09; hoja `fd63c82` 27/09 | `c6523b5` 15/10 (porqué) |
| ADR-003 batch para analytics | `1e333a8` 23/09 | `7d8335f` 23/09 | `9a3c22b` (título corregido: decía «ADR-001») |
| ADR-004 integridad de datos | `8c0e5f4` 30/09 (fecha interna 23/09) | mismo commit | `72882d2` |
| ADR-005 asincronía con externos | `246c55e` 23/09 | mismo commit | `023dc6f` 30/09 |
| Requisitos y supuestos | `cad0b4f` 25/09 | A20–A31 y Q12–Q16 en `72923e5` 29/09 | `06555b6`, `72882d2` |
| Entrevista al experto | `870a617` 25/09 (preguntas) | `4923a1c` 27/09 (notas) | `ed4dc28` 16/10 |
| Estimación de tokens | `72923e5` 29/09 | mismo commit | `30f7dfc` 30/09 |
| C1 contexto | `5a293a4` 25/09 | `f58bf5c` 25/09; IA externa en `8516c51` 30/09 | `842e304` 16/10 (SVG) |
| C2 contenedores | `d6809ee` 25/09 (preparación) | `ab2291b`/`26bb562` 28/09 | `842e304` |
| C3 HR Integration | `af4443a` 28/09 | mismo commit | `842e304` |
| C3 candidato, historia, matching | `0f2599c` 29/09 (imágenes) | textos `0ff6e3b` 29/09 y `716e1d1` 30/09 | `3641df8` 15/10 |
| ADR-006 a ADR-024 | esqueletos `4923a1c` 27/09 (fecha interna 26/09) | `72923e5` 29/09 | varios hasta 16/10 |
| ADR-011 (dos versiones) | `7f015e4` y `72923e5` 29/09 | fusión `86c346e` 29/09 23:59 | `06555b6` 14/10 |
| Diagrama de los seis procesos | `0f2599c` 29/09 | renombrado `7f015e4` | — |
| Event storming (foto, digital, documento) | `0f2599c` 29/09 (tablero fechado 23/09) | `eec75a7` 30/09 (íconos) | `30e0721` 14/10 |
| ADR-025 concepto de pruebas de IA | `9a3c22b` 30/09 | mismo commit | `a2dc69a` 15/10 |
| Glosario | `a774a6b` 30/09 | `30f7dfc`, `3f170ab` 30/09 | `0b7a977` 15/10 |
| Caso de uso «subir y enviar currículum» | `8c0e5f4` 30/09 | `06b6cfc` 30/09 (secuencias) | `72882d2` |
| *Known limitations* (README) | `8516c51` 30/09 | `d4c4fbb` 30/09 | `ed4dc28` 16/10 |
| Introducción del README | `43b3b75` 28/09 | `9891219` 15/10 (la tesis) | — |

### Borrados y renombrados

- **ADR-012** (`matching-algorithm-and-spyder`) y **ADR-013** (`fairness-in-ai-models`): creados como esqueletos en `4923a1c` (27/09), **borrados en `72923e5`** (29/09). Nunca tuvieron contenido más allá de una línea. Por eso la numeración salta de 011 a 014, siguiendo la misma regla de «no reasignar números» de los requisitos. [Probado el borrado; la razón del salto es inferida]
- ADR-007: `flexibility-toward-ai-models` → `use-of-external-llms` (`72923e5`).
- ADR-011: dos archivos paralelos; queda `deterministic-matching` (`a774a6b` borra el otro).
- ADR-018: `survey-service-decision` → `location-of-survey-triggers` (`72923e5`).
- ADR-024: `caching-of-reviews` → `caching-of-resumes` (`26bb562`).
- `Evidence/` → `Requirements/Research/` (`a774a6b`).
- `ArchitectureCharacteristics/architecture-characteristics-worksheet.pdf` → PNG (`1e333a8`).
- Todas las imágenes C4 PNG → SVG (`842e304`).

---

## 6. Inconsistencias del repositorio (y qué fuente sigue el curso)

1. **Referencias colgadas.** ADR-010 cita «Q4» (borrado el 26/09; el contenido corresponde a Q5). ADR-008 cita «Q26» (no existe; corresponde a Q13, «facilidad de uso»). → El curso cita el contenido, no el número.
2. **Numeración duplicada.** R30 aparece dos veces (datos demográficos y «soportar demoras de 60 s del LLM»). Q3 aparece dos veces. La cabecera dice «los funcionales empiezan con A» (son R). → El curso no usa esos números.
3. **Q12 dice lo contrario de lo que quiere decir:** «LLMs should **not** be used **only** where needed». La intención, por A25 y por la nota «use as little AI as necessary», es «solo donde hace falta». → El curso sigue la intención y lo aclara en `HISTORIA`, no en el video.
4. **«PTU pricing is very intransparent»** en las notas crudas (`4923a1c`) pasa a «**very transparent**» en la versión limpia (`a774a6b`). → El curso no usa el dato PTU.
5. **ADR-007 dice «Cost is more predictable»** como consecuencia, mientras A25, A26, la entrevista y la introducción del README dicen que el costo de los LLM es alto e impredecible. → El curso sigue la entrevista y la introducción, y menciona la tensión.
6. **ADR-007 lista *feasibility* como fortalecida y como debilitada** (por la regulación de privacidad). Es coherente si se lee como dos aspectos; el curso lo explica así.
7. **El C3 de historia sigue citando ADR-006** («la IA corre en contenedores separados»), que está *Superseded*. → El curso sigue ADR-007 y el C2 (IA externa).
8. **El C3 de matching** decía «califica con IA» hasta el 15/10; y su versión final dice que el extractor busca «pares de puestos e historias sin puntaje», aunque extrae características de a una. El diagrama del C2 describe Matching como «implementa el algoritmo de IA». → El curso sigue ADR-011: la IA extrae, el puntaje es determinista.
9. **Estimación de tokens.** El prompt pide «unas 1.000 palabras», pero la estimación supone 400. Y 400 palabras ≈ 1.400 tokens es generoso (la regla habitual en inglés es ~0,75 palabras por token). Los precios sí cierran: 850 tokens de entrada y 1.400 de salida dan 0,025 $ con las tarifas de 5 y 15 $ por millón (GPT-4o de mayo de 2024) y ~0,001 $ con 0,15 y 0,60 $ (GPT-4o mini). [Verificación propia, no escrita por el equipo] → El curso usa sus cifras tal cual, como orden de magnitud, sin repetir esta verificación en el video.
10. **Fechas internas que no coinciden con la escritura.** ADR-004 dice 23/09 y se escribe el 30/09; ADR-006 a ADR-024 dicen 26/09 y se escriben el 29/09; ADR-011 dice 26/09 y se escribe el 29/09. → El curso usa la fecha de la decisión (interna) para el orden de razonamiento y menciona cuándo se escribió cuando importa.
11. **La hoja de características** final ya no lista *data integrity* en «otras consideradas», aunque `Characteristics.md` y ADR-004 sí. → El curso sigue `Characteristics.md` y ADR-004.
12. **`event_storming.md`** describe ejemplos genéricos que no están en el tablero («Order Placed», «Payment Processed», «placing an order»). → El curso sigue el tablero (foto y digital).
13. **ADR-023**: el archivo se llama `adapters-for-hr-systems`, pero el título es «Dead-letter queue for HR systems»; los adaptadores están en el C3, no en el texto del ADR. → El curso cuenta ambos, citando el C3 para los adaptadores.
14. **ADR-002** cita «microkernel… scalability and fault-tolerance, dos de nuestras top 7». La hoja confirma 1 estrella en ambas filas para microkernel. Consistente.
15. **ADR-006 y ADR-010** tienen frases cortadas («Separation of AI containers is driven by the», «The story service does»). → No se citan esas frases.
16. **ADR-022** queda *Open*, sin decisión, y aun así lista características «fortalecidas» como intención.

---

## 7. Lo que falta

- **El pliego y las diapositivas** del cliente (el pliego se recuperó de otra fuente; las diapositivas no).
- **Las respuestas del cliente.** Ningún archivo registra preguntas al cliente ni respuestas. Las «Open Questions» del 25/09 se borraron el 30/09 sin resolverse por escrito (salvo la de «hired»).
- **Ninguna cifra de costo total** del sistema: solo el costo por prompt y la anécdota del experto. No hay presupuesto anual ni estimación de infraestructura.
- **Ningún diagrama de despliegue** ni elección de nube. ADR-022 (tecnologías) quedó abierto.
- **La justificación del salto 10.000 → 100.000 empleadores.**
- **La cuenta de prompts del matching.** ADR-011 da la complejidad (O(n+m) frente a cuadrática), pero no multiplica con A17. La cuenta del guion (capítulo 6) es nuestra y se presenta como tal.
- **La técnica concreta de extracción** de características legibles: qué ejes tiene la «Spyder» (`Characteristics.md` no lo dice; *Known limitations* admite que definirlos es difícil).
- **El umbral del match**: el glosario lo declara «detalle de implementación».
- **Prompt injection**: lo advierte el experto; ningún ADR lo trata.
- **El rate limit**: reconocido como limitación no resuelta.
- **Las presentaciones** (semifinal y final): no están en el repositorio.

---

## 8. Contrapunto del podio (para usar con moderación)

Las mismas dos preguntas, respondidas por los tres primeros:

| | Top 3 de características | ¿Quién decide el match? |
| - | - | - |
| **Pragmatic** (1.º) | interoperabilidad, factibilidad, testabilidad | La IA extrae características legibles de cada historia y cada puesto, una vez; el puntaje es una cuenta determinista (ADR-011, opción B). |
| **Katamarans** (2.º) | costo, abstracción, integración (`ADR/ADR-007-top-3-characteristics.md`) | Ningún LLM en el puntaje: se separan currículum y puesto en palabras clave, cada palabra lleva un peso (las técnicas pesan más) y se compara (`ADR/ADR-011-matching-engine-solution.md`). Descartan el análisis semántico por costo. |
| **Ctrl+Alt+Elite** (3.º) | escalabilidad, rendimiento, interoperabilidad (`README.md` → *Top 3 Characteristics*) | Base de datos vectorial + grafo de conocimiento con métricas de similitud, y después un LLM que reordena los resultados; ajuste fino del LLM con las encuestas (`README.md` → *Vector Database*; ADR-03 a ADR-06). |

El curso lo usa una sola vez, en el capítulo 6, después de la decisión de Pragmatic: el primero y el segundo puesto sacaron al LLM del puntaje; el tercero lo puso en el centro. (Katamarans llama *tokens* a palabras, no a tokens de un LLM: en el video se dice «palabras clave» para no confundir.)

---

## 9. El proceso, en una línea por día

| Fecha | Qué entendieron o decidieron | Evidencia |
| - | - | - |
| 23/09 | El negocio en post-its; la pregunta «¿la historia es legible?»; el top 3; el estilo; lo externo, asíncrono | tablero, hojas, ADR-001/002/003/005 |
| 24/09 | El porqué de cada característica; el miedo a un matching cuadrático | `c277932` |
| 25/09 | Requisitos y supuestos numerados; la contradicción A9/A10; «usar la menor IA posible»; preguntas al experto; el porqué del top 3 | `cad0b4f`, `870a617`, `d093b51` |
| 26–27/09 | Sesión de diseño (ADR 006–024 en una línea); entrevista al experto | `4923a1c`, `c7a9e8e` |
| 28/09 | C2 con IA externa; C3 de integración con RR. HH. | `ab2291b`, `af4443a` |
| 29/09 | La IA, por escrito: LLM externo, matching determinista, costo por token, supuestos A20–A31 | `72923e5`, `86c346e`, `0f2599c` |
| 30/09 | Pruebas de IA (ADR-025), limitaciones, glosario, casos de uso; mapa top 3 → ADR | `9a3c22b`, `8516c51`, `023dc6f` |
| 14–16/10 | Pulido; la tesis del README; el C3 de matching alineado con ADR-011 | `9891219`, `3641df8`, `842e304` |
