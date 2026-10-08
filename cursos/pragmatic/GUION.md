# Guion del curso en video · Pragmatic

Kata de otoño 2024 de O'Reilly · ClearView (Diversity Cyber Council) · equipo **Pragmatic**, primer puesto. Slug: `pragmatic`.

Este documento es el plan y el guion completo del curso en video. Su columna vertebral es [`HISTORIA.md`](./HISTORIA.md): el orden en que el equipo entendió y decidió, reconstruido con la historia de git. La vara pedagógica es la de KatArch (`video/PEDAGOGY.md`); el método, el de su ADR-001 (un solo equipo como columna, sin spoilers, cada afirmación anclada al repositorio, honestidad sobre los huecos).

Los `video/chN/narration.json` se generaron desde la misma fuente que las secciones de guion de este documento, así que el texto coincide línea por línea. El esquema y la configuración de voz son los de `KatArch/video/ch5/narration.json`.

---

## 1. Decisiones de diseño del curso

### Cuántos capítulos y por qué

**Ocho.** ArchColider tenía 11 con un repositorio más grande (pizarras, planilla de costos, presentación). Pragmatic tiene unas 11.700 palabras, 25 ADR y 89 commits repartidos en 12 días con actividad. Cada capítulo de este curso corresponde a un bloque real de razonamiento con artefactos propios; no hay capítulos de relleno ni de «arquitectura final». Se descartó un capítulo de «C4 completo»: los diagramas aparecen en el capítulo donde se decide lo que muestran.

### El orden: cronológico, con el día de cada decisión

| Cap. | Título | Qué razonó el equipo | Cuándo | Evidencia principal |
| - | - | - | - | - |
| 1 | El encargo | Entender el pliego con un event storming; la primera duda: ¿la historia es legible? | 23/09 | `35471ec`, tablero fechado 23.09.2024 |
| 2 | Tres de siete | Siete características, el top 3 y el estilo, el primer día | 23–26/09 | hojas fechadas 2024/09/23, `c277932`, `d093b51` |
| 3 | Lo que no sabían | Requisitos y supuestos numerados; la contradicción A9/A10; la entrevista al experto | 25–29/09 | `cad0b4f`, `870a617`, `4923a1c`, `72923e5` |
| 4 | Alquilar la IA | De contenedores propios a LLM externo; el costo de una historia | 26–29/09 | `4923a1c` → `72923e5`, `ab2291b`, token-estimation |
| 5 | Miles de puertas | La integración con RR. HH.: asincronía, eventos, adaptadores, dead-letter queue | 23/09 (ADR-005), 26–28/09 | `246c55e`, `af4443a` (primer C3) |
| 6 | Dónde decide la IA | ADR-010 y ADR-011: seis caminos, contar prompts, matching determinista | 29/09 | `0f2599c`, `7f015e4`, `86c346e` |
| 7 | Probar lo impredecible | El camino del currículum, el servicio de historia, el concepto de pruebas de IA | 26/09 (ADR-008/009), 30/09 (ADR-025) | `06b6cfc`, `9a3c22b` |
| 8 | Ahorrar donde no duele | Base compartida, reportes por lotes, encuestas alquiladas, lo no hecho; el pulido final | 26/09 (decisiones), 30/09 y 14–16/10 | `72923e5`, `8516c51`, `9891219` |

Dos matices de orden, ambos fieles a la historia:

- El capítulo 5 (integración con RR. HH.) va **antes** que el matching porque el equipo dibujó el C3 de integración el 28/09 (`af4443a`), un día antes de escribir ADR-011. Pedagógicamente también ayuda: el matching, que es el clímax, llega con colas, eventos y adaptadores ya entendidos.
- El capítulo 4 cuenta la decisión de alquilar con el texto del ADR-007, escrito el 29/09, pero la decisión ya estaba tomada el 28/09: el C2 de ese día tiene la leyenda «Service with external AI». El guion lo sitúa después de la entrevista (26–27/09) sin dar una fecha exacta.

### Reglas que el guion aplica

- **Sin nombres.** Se dice «el equipo» y «un experto en IA». Los nombres solo están en `HISTORIA.md`, como autores de commit acreditados en el README.
- **El podio, una sola vez** (capítulo 6, escena `podio`), después de la decisión de Pragmatic, como hace el ADR-001 de KatArch con su «dilema del podio».
- **Las inferencias se dicen como tales**, en voz y en pantalla: «el repositorio no dice por qué» (cap. 5), «es nuestra cuenta, no la del equipo» (cap. 6), «el repositorio no lo escribe como un procedimiento único» (cap. 7), «muy probablemente esa fue la fecha de entrega» (cap. 8).
- **Ningún número inventado.** Todas las cifras son del repositorio (A17, A29–A31, la estimación de tokens, el «medio millón» del experto) o una multiplicación de esas cifras declarada como propia (cap. 6: 50.000 frente a más de 600 millones de prompts). El ejemplo de backoff (1, 2, 4, 8 minutos) se rotula «ejemplo».
- **Cuando el repositorio se contradice, el guion sigue esta fuente** (detalle en `HISTORIA.md` §6):
  - Matching: ADR-011 (la IA extrae, el puntaje es determinista), no el C2 ni el C3 previo al 15/10.
  - Dónde corre la IA: ADR-007 (externa), no el C3 de historia que cita ADR-006.
  - Costo de los LLM: la entrevista, A25, A26 y la introducción del README (alto e impredecible), no la línea «Cost is more predictable» de ADR-007.
  - Event storming: el tablero (foto y digital), no los ejemplos genéricos de `event_storming.md`.
  - Integridad de datos: `Characteristics.md` y ADR-004, no la imagen final de la hoja (que la omite).
  - Referencias colgadas (Q4, Q26): se cita el contenido, no el número.
- **Español neutro con tú**, sin rayas. Términos que la industria dice en inglés quedan en inglés (event storming, service-based, rate limit, dead-letter queue, backoff, prompt, token, match), siempre definidos la primera vez.
- **`say`** cuando hay dígitos o siglas: números en letras; «ADR 007» → «A-D-R cero cero siete»; LLM → «L-L-M»; ATS, API y GPT deletreados; «Ctrl+Alt+Elite» → «Control Alt Elite»; «S.M.A.R.T.» → «smart»; códigos de requisito («Q14» → «cu catorce», «A17» → «a diecisiete»). El generador verifica que ninguna línea hablada conserve dígitos.

### Duración

Estimada a 2,2 palabras por segundo más las pausas escritas, como pide la guía:

| # | Capítulo | Escenas | Palabras | Duración estimada |
| - | - | - | - | - |
| 1 | El encargo | 8 | 789 | 6:13 |
| 2 | Tres de siete | 8 | 856 | 6:46 |
| 3 | Lo que no sabían | 9 | 903 | 7:09 |
| 4 | Alquilar la IA | 8 | 759 | 6:02 |
| 5 | Miles de puertas | 8 | 796 | 6:16 |
| 6 | Dónde decide la IA | 11 | 938 | 7:25 |
| 7 | Probar lo impredecible | 9 | 843 | 6:40 |
| 8 | Ahorrar donde no duele | 8 | 756 | 5:55 |
| | **Total** | 69 | 6640 | **52:26** |

Con la voz real de KatArch, que en el capítulo 5 habló un 15 % más rápido que el estimado (ver `KatArch/video/ch5/AUDIT.md`), el curso quedaría en unos **45 minutos**. Dos capítulos superan los 7:00 estimados:

- **Capítulo 3 (7:09):** concentra todo el vocabulario de LLM. Si hay que recortar, lo primero es la escena `experto` (34 s), cuyas preguntas pueden pasar a pantalla con una sola línea de voz.
- **Capítulo 6 (7:25):** es el capítulo central (ADR-011). Si hay que recortar, lo primero es la última línea de `precio` (la corrección tardía del C3, 12 s) y la línea de Q15 en `numeros` (11 s), que el capítulo 7 retoma.

### Términos y dónde se definen por primera vez

| Capítulo | Términos |
| - | - |
| 1 | kata, pliego, sesgo, ATS, historia, S.M.A.R.T., puntaje y match, desbloquear, LLM, ADR, event storming, evento, actor, comando |
| 2 | característica de arquitectura, factibilidad, interoperabilidad, determinista, testabilidad, estilo de arquitectura, service-based, event-driven, microkernel |
| 3 | requisito, supuesto, trazabilidad, prompt, token, temperatura, comportamiento caótico, rate limit, vida útil de un modelo, conjunto de pruebas (anunciado) |
| 4 | contenedor, API de un LLM, código abierto en la nube frente a servidores propios, estado «reemplazado» de un ADR |
| 5 | sincrónico y asíncrono, cola, topic, adaptador, almacén de secretos, dead-letter queue, backoff exponencial, copia en memoria (cache) |
| 6 | características vectoriales (vector), características legibles, gráfico de araña, n + m frente a n × m, matching determinista, base de datos vectorial |
| 7 | segundo plano, conjunto de prueba, pruebas por tramos, prueba de regresión, doble de prueba |
| 8 | microservicios, acoplamiento caótico, dueño único de un dato, proceso por lotes, bloqueo optimista |

### Artefactos originales que la etapa de composición debe redibujar

| Capítulo | Artefacto | Ruta en el repositorio |
| - | - | - |
| 1 | Foto de la mesa de post-its; tablero digital | `EventStorming/assets/eventstorming_stickynotes.jpeg`, `EventStorming/assets/Eventstorming.png` |
| 1 | El pliego (texto) | Google Doc enlazado desde `Equihire-Architects/README.md` |
| 2 | Hoja de características (versión del 23/09 y la del 26/09 con integridad de datos) | `ArchitectureCharacteristics/images/architecture-characteristics.png` (`1e333a8`, `19cdc81`) |
| 2 | Hoja de estilos con el asterisco | `ADR/images/ADR-002-architecture-style.png` |
| 3 | Archivo de requisitos y supuestos (primera versión con «Notes for later») | `Requirements/requirements-and-assumptions.md` (`cad0b4f`) |
| 3 | Preguntas y notas de la entrevista | `Requirements/Research/interview-ai-expert.md` |
| 4 | Prompt de prueba y cálculo | `Requirements/Research/token-estimation.md` |
| 4 | C2 del 28/09 («Service with external AI») | `C4/images/C2-Container.png` en `2899b87` |
| 5 | C3 de integración con RR. HH. | `C4/images/C3-components-hr-integration.svg` |
| 6 | Diagrama de los seis procesos de matching | `ADR/images/ADR-011-matching-process.png` |
| 6 | C3 de matching | `C4/images/C3-components-matching.svg` |
| 7 | Diagramas de secuencia del caso de uso | `UseCases/images/upload-a-resume.png`, `UseCases/images/submit-a-resume.png` |
| 7 | C3 de candidato y de historia (adaptadores de IA) | `C4/images/C3-components-job-candidate.svg`, `C4/images/C3-components-story.svg` |
| 8 | C2 final (base compartida, Analytics, topic) | `C4/images/C2-Container.svg` |
| 8 | Commits por día de los finalistas | `HISTORIA.md` §3.9 |

### Verificación hecha

- El generador comprueba, para cada capítulo: ninguna línea hablada con dígitos, ninguna raya, ids de escena únicos, y un JSON idéntico en estructura al de `KatArch/video/ch5/narration.json` (mismas claves, misma voz).
- Cada cifra del guion se cotejó con el archivo y el commit citados en las anclas del capítulo.
- Se releyó el guion completo buscando regionalismos (se cambiaron «chico», «alcanza con» y «andar» por formas neutras).
- No se generó voz ni se construyeron composiciones: eso es la etapa siguiente.

---

## 2. Los capítulos de un vistazo

| # | Título | Ideas esenciales | Anclas | Al terminar, puedes |
| - | - | - | - | - |
| 1 | El encargo | El recorrido de ClearView; los huecos del pliego; el event storming; la duda de la historia legible | Pliego; ADR-001; tablero | Correr un event storming mínimo y separar lo que el pliego da de lo que deja abierto |
| 2 | Tres de siete | Qué es una característica; el top 3 desde tres desafíos; de la hoja al estilo (y el asterisco); elegir temprano con criterio escrito | Hojas de Richards; `Characteristics.md`; ADR-002, ADR-004 | Justificar un top 3 y elegir un estilo con una hoja, adaptándola si le falta un criterio |
| 3 | Lo que no sabían | Códigos estables y trazabilidad; suponer con fuente; la contradicción A9/A10; vocabulario de LLM desde la entrevista | Requisitos y supuestos; entrevista | Escribir supuestos rastreables y explicar token, temperatura y rate limit |
| 4 | Alquilar la IA | Contenedores propios (ADR-006); tres caminos y alquilar (ADR-007); «reemplazado»; costo de una historia | ADR-006/007; token-estimation | Comparar alojar o alquilar un modelo y estimar el costo de una llamada |
| 5 | Miles de puertas | Fallar es lo normal; asincronía y eventos; un adaptador por sistema; dead-letter queue y un ADR rechazado | A29–A31; ADR-005/016/023/024; C3 HR | Diseñar una integración tolerante a fallas con reintentos |
| 6 | Dónde decide la IA | La IA no ve el currículum; vectorial frente a legible; contar prompts; matching determinista; podio | ADR-010/011; diagrama de seis caminos | Comparar diseños con IA contando llamadas y separar «traducir» de «decidir» |
| 7 | Probar lo impredecible | Lo lento en segundo plano; servicio de historia; conjuntos y tramos; dobles; cambio de modelo | Caso de uso; ADR-008/009/025 | Armar un concepto de pruebas para componentes con IA |
| 8 | Ahorrar donde no duele | La tesis de ahorro; base con dueño único; reportes por lotes; encuestas alquiladas; lo no hecho; el método | README; ADR-014/015/017/019/020/021/022 | Encontrar dónde ahorrar sin dañar lo esencial, y reconstruir el método completo |

---

## 3. Plan, auditoría y guion por capítulo

## Capítulo 1 · El encargo

**Duración estimada:** 789 palabras habladas, 5:59 de voz a 2,2 palabras/s, más 14,0 s de pausas escritas: **6:13**. 8 escenas.

### Plan

**Ideas esenciales**

1. Qué pide ClearView, como un recorrido: el currículum se vuelve una historia anónima, se compara con puestos, la empresa paga por desbloquearlo y todo se mide para detectar sesgos.
2. Lo que el pliego no dice: ningún volumen, sistemas de RR. HH. «de ejemplo» y una sola frase sobre la IA. Con huecos así, cada integrante imagina un sistema distinto.
3. El primer movimiento del equipo: un event storming (ADR-001). Hechos del negocio en orden, quién los provoca, y las dudas en rosado.
4. La primera duda escrita: ¿la historia es legible por humanos? Es la semilla de la decisión central (capítulo 6).

**Anclas en el repositorio**

- Pliego: documento de Google enlazado desde `Equihire-Architects/README.md` (ver `HISTORIA.md` §1).
- `ADR/ADR-001-use-ddd.md` (`35471ec`, 23/09 08:52).
- `EventStorming/assets/eventstorming_stickynotes.jpeg` y `Eventstorming.png` (fechado 23.09.2024; subidos en `0f2599c`).
- `Requirements/requirements-and-assumptions.md`, Q3 (representación legible más una condensada para comparar).

**Al terminar, el espectador puede**

- Contar el recorrido de un currículum en ClearView, de la subida al reporte.
- Separar lo que el pliego da de lo que deja abierto.
- Correr un event storming mínimo: eventos en pasado y en orden, después comandos y actores, y las dudas a la vista.

**Qué se deja afuera (y por qué)**

- Los consultores de DEI que acompañan entrevistas (el pliego los menciona; el equipo los reduce a R29, hallazgos cargados a mano).
- Los recorridos detallados de cada usuario y la lista de 11 sistemas de RR. HH. (aparece en pantalla, no se lee).
- La discusión sobre «contratado» (Data Point 1) y la nota de pago sincrónico: detalle secundario.
- El detalle de DDD como disciplina: aquí solo importa el taller.

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (67 palabras, ~31 s) | Kata y pliego; El método del curso (seguir el orden real) | Kata y pliego ~15 s; El método del curso (seguir el orden real) ~9 s | Sí: se muestra el cliente entregando el pliego | Sí | Sí: el curso sigue el orden del razonamiento | Sí | Bien |
| cliente (92 palabras, ~43 s) | Sesgo; ATS | Sesgo ~19 s; ATS ~10 s | Sí: el currículum con indicios antes de la palabra «sesgo» | Sí | Sí: es el problema que justifica el producto | Sí: dos imágenes, una por problema | Bien |
| clearview (152 palabras, ~72 s) | La historia anónima; Puntaje y match; Desbloquear y pagar; Medir (data points); Síntesis | La historia anónima ~17 s; Puntaje y match ~13 s; Desbloquear y pagar ~18 s; Medir (data points) ~14 s; Síntesis ~5 s | Sí: se cuenta como recorrido de un caso | Sí: historia, match, desbloquear y S.M.A.R.T., cada uno en su línea | Sí: medir para revelar diferencias | Sí: la línea se arma al ritmo de la voz y queda completa ~6 s | Bien |
| huecos (91 palabras, ~43 s) | Los huecos del pliego; LLM; El riesgo de los modelos mentales distintos | Los huecos del pliego ~24 s; LLM ~11 s; El riesgo de los modelos mentales distintos ~8 s | Sí: los huecos antes del riesgo, y el riesgo antes de la técnica | Sí: LLM con referente cotidiano | Sí: prepara la razón del taller | Sí: un hueco por línea | Bien |
| storming (141 palabras, ~66 s) | ADR; Event storming; Evento; Actor y comando; Notas de duda; Síntesis | ADR ~19 s; Event storming ~9 s; Evento ~9 s; Actor y comando ~9 s; Notas de duda ~6 s; Síntesis ~5 s | Sí: viene del riesgo de la escena anterior | Sí: ADR, evento, actor, comando, cada uno en su línea | Sí: «para entender el problema juntos» y «poco tiempo» (texto del ADR) | Sí: la leyenda de colores queda fija toda la escena | Bien |
| mesa (71 palabras, ~33 s) | El flujo del negocio en eventos; Eventos para reportes (plantado) | El flujo del negocio en eventos ~19 s; Eventos para reportes (plantado) ~10 s | Sí: es el tablero real | — | — | Sí: la fila se resalta por tramos; la nota queda ~6 s | Bien (consolida lo anterior con el artefacto real) |
| piensalo (90 palabras, ~45 s) | Aplicar: leer una duda en el tablero; La tensión texto legible frente a números comparables; Puente al capítulo 6 | Aplicar: leer una duda en el tablero ~9 s; La tensión texto legible frente a números comparables ~23 s; Puente al capítulo 6 ~7 s | Sí: la pregunta llega después de conocer la historia y el puntaje | — | Sí: quién lee la historia decide su forma | Sí: las notas reales quedan en pantalla hasta el final | Bien |
| outro (85 palabras, ~40 s) | Repaso de las 4 ideas; Avance | Repaso de las 4 ideas ~30 s; Avance ~10 s | — | — | — | Sí: una tarjeta por idea | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| El recorrido de ClearView (historia anónima, match, desbloqueo, medición) | ~79 s | `clearview`, `outro` |
| Los huecos del pliego | ~38 s | `huecos`, `outro` |
| ADR | ~19 s | `storming` |
| Event storming (técnica, evento, actor, comando, dudas) | ~94 s | `storming`, `mesa`, `piensalo`, `outro` |
| Historia legible frente a números comparables | ~38 s | `piensalo`, `outro` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Qué es un kata? ¿Y un pliego?» Se definen en las dos primeras líneas, con el ejemplo concreto.
- «¿Qué es S.M.A.R.T.?» Se dice qué significa la sigla, en una frase, sin detenerse: no vuelve a importar.
- «¿Qué es un ATS?» Se nombra con su traducción («programas de seguimiento de candidatos») y su problema.
- «¿Qué es un LLM?» Se define con un referente cotidiano (ChatGPT). Se retoma en el capítulo 3.
- «¿Por qué post-its y no diagramas?» La escena `huecos` planta el riesgo (cada uno imagina un sistema distinto) antes de nombrar la técnica.
- «¿Evento, comando, actor?» Cada uno con su color y un ejemplo del tablero real.

### Guion

#### `intro` · Capítulo 1 (~31 s)

> **Visual.** Logo de O'Reilly Architecture Katas, otoño 2024. La palabra «kata» se descompone: un cliente entrega un documento (el pliego) a varios equipos; cada uno dibuja cajas y flechas. Aparece el nombre del equipo, Pragmatic, con una línea de commits que avanza. Título del capítulo.

- En otoño de 2024, O'Reilly organizó otra Architecture Kata. *(dice: «En otoño de dos mil veinticuatro, O'Reilly organizó otra Architecture Kata.»)*
- Una kata es un ejercicio de práctica: un cliente entrega un pliego, el documento con lo que necesita.
- Y cada equipo diseña la arquitectura: qué piezas tiene el sistema, y cómo se hablan.
- Ganó un equipo de tres personas llamado Pragmatic. Este curso sigue su repositorio, en el orden en que razonaron. *(pausa 0.6 s)*
- Capítulo 1: el encargo. *(dice: «Capítulo uno: el encargo.»)*

#### `cliente` · El cliente (~43 s)

> **Visual.** Tarjeta de Diversity Cyber Council («501c3, sin fines de lucro»). Un currículum en pantalla: tres indicios (raza, cultura, estilo de vida) se iluminan en rojo y una balanza se inclina. Rótulo «sesgo». Después, una pila de currículums entra en una caja gris «ATS» y salen emparejados con puestos equivocados.

- El cliente era Diversity Cyber Council, una organización sin fines de lucro de Estados Unidos.
- Ayuda a personas de grupos poco representados en tecnología a formarse y a conseguir empleo.
- Su pliego parte de un problema: al leer un currículum, pueden pesar indicios de raza, de cultura o de estilo de vida, aunque nadie lo quiera.
- Eso se llama sesgo: una inclinación que decide por ti, sin que lo notes. *(pausa 1 s)*
- Y hay un segundo problema: los programas de seguimiento de candidatos que usan las empresas, los ATS, emparejan mal personas con puestos. *(dice: «Y hay un segundo problema: los programas de seguimiento de candidatos que usan las empresas, los A-T-S, emparejan mal personas con puestos.»)*

#### `clearview` · La idea (~72 s)

> **Visual.** El recorrido de ClearView como una línea horizontal que se arma paso a paso: currículum → (IA) → historia sin nombre → comparación con puestos (un puntaje) → la empresa lee la historia → candado que se abre con un pago → el currículum viaja a un sistema de RR. HH. Debajo, los cinco data points se encienden uno por uno. Al final, cuatro verbos: anonimizar, comparar, cobrar, medir.

- La respuesta se llama ClearView. Mira el recorrido de un currículum.
- La candidata lo sube. Una IA lo reescribe como una historia: su formación, su experiencia y sus logros, sin nada que revele quién es.
- El pliego pide el formato S.M.A.R.T.: metas específicas, medibles, alcanzables, relevantes y con plazo. *(dice: «El pliego pide el formato smart: metas específicas, medibles, alcanzables, relevantes y con plazo.»)*
- Esa historia se compara con los puestos abiertos, y recibe un puntaje de parecido.
- Si el puntaje pasa un umbral, hay un match: la historia y el puesto encajan.
- Con un match, la empresa lee la historia. Y si le interesa, paga para desbloquear el perfil completo. *(pausa 0.8 s)*
- Recién ahí aparece la persona, y su currículum viaja al sistema de recursos humanos de la empresa. *(pausa 1 s)*
- Además, el pliego pide medir: quién avanzó, a quién contrataron, una encuesta a cada parte, y datos demográficos.
- Todo, para revelar diferencias entre contratados y descartados que no deberían existir.
- Anonimizar, comparar, cobrar y medir: esa es la promesa. *(pausa 1 s)*

#### `huecos` · Lo que no dice (~43 s)

> **Visual.** El pliego como documento. Tres huecos marcados con signos de pregunta: «volumen: ?», «sistemas de RR. HH.: 11 ejemplos» (logos que se desvanecen), «IA: supón un LLM entrenado». Después, tres burbujas de pensamiento sobre tres siluetas, cada una con un sistema distinto.

- Ahora fíjate en lo que el pliego no dice.
- No dice cuántos candidatos habrá, ni cuántos puestos. No trae un solo número de volumen.
- Nombra once sistemas de recursos humanos, como Workday o SAP, y aclara que son solo ejemplos.
- Y sobre la IA dice una sola frase: supón un LLM entrenado. *(dice: «Y sobre la IA dice una sola frase: supón un L-L-M entrenado.»)*
- Un LLM, un modelo de lenguaje grande, es el tipo de IA detrás de herramientas como ChatGPT: recibe texto, y responde con texto. *(pausa 1 s; dice: «Un L-L-M, un modelo de lenguaje grande, es el tipo de IA detrás de herramientas como ChatGPT: recibe texto, y responde con texto.»)*
- Con tantos huecos, hay un riesgo: que cada integrante del equipo se imagine un sistema distinto. *(pausa 1 s)*

#### `storming` · Event storming (~66 s)

> **Visual.** Calendario: lunes 23/09. Una tarjeta de ADR con tres secciones (contexto, decisión, consecuencias) que se llenan con el texto del ADR-001. Después, una mesa vacía y la leyenda real del tablero: amarillo = evento, azul = comando, naranja = actor, verde = sistema externo, rosado = duda. Aparecen tres eventos amarillos de ejemplo en orden.

- Por eso, el lunes 23 de septiembre, lo primero que hizo el equipo no fue dibujar cajas. Fue un taller. *(dice: «Por eso, el lunes veintitrés de septiembre, lo primero que hizo el equipo no fue dibujar cajas. Fue un taller.»)*
- Lo dejó escrito en su primer ADR. Un ADR es un registro de decisión de arquitectura: un documento corto con el contexto, la decisión y sus consecuencias. *(dice: «Lo dejó escrito en su primer A-D-R. Un A-D-R es un registro de decisión de arquitectura: un documento corto con el contexto, la decisión y sus consecuencias.»)*
- Este dice: tenemos poco tiempo, así que usamos event storming, para entender el problema juntos.
- Event storming es un taller con post-its. Se escribe, en orden, todo lo que pasa en el negocio. *(pausa 0.6 s)*
- Cada post-it amarillo es un evento: algo que ya ocurrió, escrito en pasado. Currículum subido. Historia publicada. Candidato contratado.
- Después, para cada evento, quién lo provoca y con qué acción: el actor, en naranja, y el comando, en azul.
- Y en rosado, todo lo que nadie sabe responder todavía. *(pausa 1 s)*
- Primero, los hechos del negocio en orden. Las piezas del software, después.

#### `mesa` · La mesa (~33 s)

> **Visual.** La foto real de la mesa con post-its, que se funde en el tablero digital redibujado. Se resalta la fila central evento por evento al ritmo de la voz. Al final, zoom a la nota amarilla de la esquina («Most events are used for analytics & reports»), con su traducción.

- Así quedó la mesa. Sigue la fila del medio.
- Currículum enviado. Currículum publicado. Currículum anonimizado como historia. Historia publicada.
- Match creado. La empresa revisa, desbloquea y paga. El currículum sale hacia uno o varios sistemas de recursos humanos.
- Al final, candidato contratado, y una encuesta para cada parte. *(pausa 1 s)*
- Y en una esquina, una nota: la mayoría de los eventos sirven para los reportes.
- Guarda esa nota. Vuelve en el capítulo 8. *(dice: «Guarda esa nota. Vuelve en el capítulo ocho.»)*

#### `piensalo` · Piénsalo tú (~45 s)

> **Visual.** Zoom al tramo «currículum anonimizado como historia → historia publicada». Debajo, un post-it rosado en blanco. Anillo de cuenta regresiva de 3 s. Después el post-it se llena con las notas reales de la foto: «What format?» y «Human readable?», traducidas. Dos caminos salen de la historia: hacia una persona (texto) y hacia una máquina (números).

- Mira el tramo de la historia. Pegada debajo, hay una nota rosada.
- Piénsalo tú: con lo que sabes del pliego, ¿qué preguntarías sobre esa historia? *(pausa 3 s)*
- El equipo escribió dos preguntas: ¿qué formato tiene? ¿Y es legible por humanos?
- Parece un detalle. Pero si la historia la lee una persona, tiene que ser texto. Si la compara una máquina, conviene que sean números.
- Y para dar un puntaje de parecido, hacen falta las dos cosas. *(pausa 1 s)*
- De esa nota rosada va a salir la decisión central del equipo, en el capítulo 6. *(dice: «De esa nota rosada va a salir la decisión central del equipo, en el capítulo seis.»)*

#### `outro` · Para llevarte (~40 s)

> **Visual.** Cuatro tarjetas, una por idea, que se acumulan: el recorrido (cuatro verbos), el pliego con huecos, la mesa de post-its, la nota rosada. Al final, una hoja de trabajo en blanco con siete renglones: avance del capítulo 2.

- Repasemos. ClearView anonimiza el currículum, lo compara con puestos, cobra por desbloquearlo y mide los sesgos.
- El pliego deja huecos: ningún volumen, y una sola frase sobre la IA.
- El equipo empezó con un event storming: los hechos del negocio en orden, y las dudas a la vista.
- Y la primera duda fue si la historia la lee una persona o una máquina. *(pausa 1 s)*
- Ese mismo día, el equipo eligió las tres cualidades que iban a mandar sobre todo lo demás. Capítulo 2: tres de siete. *(dice: «Ese mismo día, el equipo eligió las tres cualidades que iban a mandar sobre todo lo demás. Capítulo dos: tres de siete.»)*


---

## Capítulo 2 · Tres de siete

**Duración estimada:** 856 palabras habladas, 6:29 de voz a 2,2 palabras/s, más 17,2 s de pausas escritas: **6:46**. 8 escenas.

### Plan

**Ideas esenciales**

1. Qué es una característica de arquitectura: cómo debe comportarse el sistema, no qué hace. Se eligen pocas porque cada una cuesta algo.
2. El top 3 de Pragmatic (factibilidad, interoperabilidad, testabilidad) sale de tres desafíos del caso: el dinero de una ONG, los sistemas ajenos y una IA no determinista. Y bajaron otras con su motivo.
3. De características a estilo con la hoja de Mark Richards. La hoja no tiene factibilidad: la reemplazan por costo y simplicidad a medio peso, y lo anotan. Gana service-based, con event-driven donde hace falta conectar; microkernel se descarta.
4. Lo que muestra el historial: estilo y top 3 se fijaron el primer día y no cambiaron; el porqué completo del estilo se escribió después de la entrega.

**Anclas en el repositorio**

- `ArchitectureCharacteristics/images/architecture-characteristics.png` (versión `1e333a8`, 23/09, top 3 ya marcado; final `548bbe0`).
- `ArchitectureCharacteristics/Characteristics.md` (`c277932` 24/09: las 7; `d093b51` 25/09: el top 3; `19cdc81` 26/09: integridad de datos).
- `ADR/ADR-002-architecture-style.md` y `ADR/images/ADR-002-architecture-style.png` (hoja fechada 23/09; «*» = sustituto de feasibility, 0,5 de peso).
- `ADR/ADR-004-data-integrity-downplayed.md` (`8c0e5f4`, 30/09).
- El porqué del ADR-002 agregado el 15/10 (`c6523b5`).

**Al terminar, el espectador puede**

- Distinguir una característica de arquitectura de un requisito funcional.
- Justificar un top 3 con desafíos concretos del caso, y bajar prioridades con motivo.
- Usar una hoja de estilos con estrellas, y adaptar el método cuando le falta un criterio, dejándolo escrito.

**Qué se deja afuera (y por qué)**

- Las definiciones textuales de las 12 características de la tabla (se ven en pantalla).
- Abstracción y extensibilidad como descartes (se mencionan en pantalla; la voz se queda con configurabilidad, que vuelve en el capítulo 5).
- Observabilidad como característica implícita.
- El detalle de las ocho columnas de la hoja de estilos: la voz compara solo service-based, event-driven y microkernel.
- El contrapunto del podio sobre el top 3 (Katamarans: costo, abstracción, integración; Ctrl+Alt+Elite: escalabilidad, rendimiento, interoperabilidad): queda en `HISTORIA.md` §8 para usar el podio una sola vez, en el capítulo 6.

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (32 palabras, ~15 s) | Puente desde el capítulo 1 | Puente desde el capítulo 1 ~13 s | — | — | — | Sí | Bien |
| que (79 palabras, ~37 s) | Característica de arquitectura; Por qué pocas (trade-off) | Característica de arquitectura ~24 s; Por qué pocas (trade-off) ~13 s | Sí: dos sistemas iguales que se comportan distinto | Sí | Sí: cada una cuesta | Sí | Bien |
| siete (130 palabras, ~61 s) | La hoja y su límite de siete; Cuatro de las siete, con motivo; Bajar con motivo (configurabilidad, integridad) | La hoja y su límite de siete ~10 s; Cuatro de las siete, con motivo ~29 s; Bajar con motivo (configurabilidad, integridad) ~22 s | Sí: cada característica se ata a un hecho del caso | Sí, por su motivo (la definición formal queda en pantalla) | Sí: una razón por característica, del texto del equipo | Sí: cada motivo queda escrito junto a su renglón | Bien (cuatro características son detalle: una frase cada una, como admite la guía; el top 3 tiene escena propia) |
| top3 (173 palabras, ~82 s) | Factibilidad; Interoperabilidad; Testabilidad y determinismo; Síntesis | Factibilidad ~18 s; Interoperabilidad ~25 s; Testabilidad y determinismo ~24 s; Síntesis ~9 s | Sí: cada desafío del caso antes de su característica | Sí, las tres y «determinista» | Sí: es el razonamiento escrito por el equipo (`Characteristics.md`) | Sí: cada casilla se marca y queda | Bien |
| piensalo (99 palabras, ~50 s) | Estilo de arquitectura; Aplicar: adaptar la herramienta cuando le falta un criterio; La sustitución y por qué se anota | Estilo de arquitectura ~17 s; Aplicar: adaptar la herramienta cuando le falta un criterio ~16 s; La sustitución y por qué se anota ~17 s | Sí: el hueco en la tabla antes de la pregunta | Sí: estilo | Sí: anotarlo deja revisar el atajo | Sí: la nota al pie queda ~6 s | Bien |
| estilo (144 palabras, ~68 s) | Service-based; Event-driven; Microkernel y su descarte; Síntesis | Service-based ~25 s; Event-driven ~20 s; Microkernel y su descarte ~18 s; Síntesis ~5 s | Sí: el estilo aparece después de los criterios que lo eligen | Sí, los tres | Sí: estrellas en las filas elegidas; el descarte con sus dos filas | Sí: cada columna se resalta mientras se habla de ella | Bien |
| historial (118 palabras, ~56 s) | El orden real (estilo antes que requisitos); El porqué escrito tarde; elasticidad cedida; La regla: criterio por escrito | El orden real (estilo antes que requisitos) ~16 s; El porqué escrito tarde; elasticidad cedida ~20 s; La regla: criterio por escrito ~14 s | Sí: las fechas antes de la conclusión | Elasticidad, con su efecto, sin el nombre | Sí | Sí: la línea de tiempo queda toda la escena | Bien |
| outro (81 palabras, ~38 s) | Repaso; Avance | Repaso ~26 s; Avance ~11 s | — | — | — | Sí | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| Característica de arquitectura | ~44 s | `que`, `outro` |
| Factibilidad (y su sustitución por costo y simplicidad) | ~65 s | `top3`, `piensalo`, `outro` |
| Interoperabilidad | ~25 s | `top3` |
| Testabilidad y determinismo | ~24 s | `top3` |
| Estilo: service-based + event-driven (y microkernel descartado) | ~90 s | `piensalo`, `estilo`, `outro` |
| Elegir temprano con criterio escrito | ~56 s | `historial` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Característica de arquitectura? ¿No es un requisito?» La escena `que` abre con dos sistemas que hacen lo mismo y se comportan distinto, antes del nombre.
- «¿Por qué solo tres?» Se dice que cada una cuesta y que algunas se estorban; la hoja pone el límite de siete.
- «¿Factibilidad?» Se define con las palabras del equipo: dinero, tiempo y gente.
- «¿Determinista?» Se define al pasar: misma entrada, misma salida.
- «¿Service-based? ¿Event-driven? ¿Microkernel?» Cada uno en una línea propia, con un ancla al capítulo 1 para los eventos.
- «¿Elegir el estilo el primer día está bien?» La escena `historial` lo trata como apuesta, con su condición.

### Guion

#### `intro` · Capítulo 2 (~15 s)

> **Visual.** Las notas rosadas del capítulo 1 se apilan a un costado («todavía abiertas»). En el centro, la hoja de características de Mark Richards en blanco, con siete renglones. Título.

- ¿Recuerdas las notas rosadas del capítulo 1? Esas dudas siguieron abiertas. *(dice: «¿Recuerdas las notas rosadas del capítulo uno? Esas dudas siguieron abiertas.»)*
- Pero ese mismo lunes, el equipo hizo otra cosa: decidir qué cualidades del sistema importaban más. *(pausa 0.6 s)*
- Capítulo 2: tres de siete. *(dice: «Capítulo dos: tres de siete.»)*

#### `que` · Características (~37 s)

> **Visual.** Dos cajas idénticas, «Sistema A» y «Sistema B», con las mismas funciones listadas. Un proveedor externo se cae: A sigue en verde, B se pone rojo. Dos etiquetas de costo: A barato, B caro. Rótulo: «características de arquitectura = cómo se comporta». Una balanza: subir una característica baja otra.

- Dos sistemas pueden hacer exactamente lo mismo, y aun así ser muy distintos.
- Si un proveedor externo se cae, uno sigue funcionando y el otro se detiene. Uno es barato de construir. El otro, no.
- Esas cualidades se llaman características de arquitectura: no dicen qué hace el sistema, sino cómo tiene que comportarse.
- Y no se pueden tener todas. Cada una cuesta algo, y algunas se estorban entre sí. *(pausa 1 s)*
- Por eso se eligen pocas, y se dice por qué.

#### `siete` · Las siete (~61 s)

> **Visual.** La hoja real del 23/09 redibujada. Siete renglones que se escriben a mano uno por uno; cuando la voz nombra una, aparece su motivo en una línea a la derecha. Al final, la columna «otras consideradas» con configurabilidad tachada y su motivo; más abajo, integridad de datos con una etiqueta «26/09».

- El equipo usó una hoja de trabajo de Mark Richards, coautor de un libro clásico de arquitectura. Su regla: como máximo, siete.
- Anotaron siete, cada una con su motivo. Seguridad: el valor del producto es, justamente, anonimizar.
- Tolerancia a fallos: si el sistema de recursos humanos de una empresa se cae, ClearView sigue.
- Adaptabilidad: la IA cambia rápido, y el sistema tiene que cambiar con ella.
- Escalabilidad: comparar todas las historias con todos los puestos podría crecer de forma cuadrática. Guarda esa palabra. *(pausa 1 s)*
- También dejaron afuera otras, con su motivo. Por ejemplo, poder configurar cada integración en caliente: las integraciones nuevas llegarían con versiones nuevas del sistema.
- Tres días después, bajaron también la integridad de los datos: creían que se cuida en el código, y que la cubren las pruebas. *(pausa 1 s)*

#### `top3` · El top 3 (~82 s)

> **Visual.** Tres casillas que se marcan con una X, una por desafío. Cada desafío aparece primero como un dibujo (una alcancía de donaciones con una moneda que se va por cada consulta a la IA; muchos enchufes de formas distintas; una IA que responde distinto a la misma pregunta) y después su característica y su definición. Al final, las tres juntas bajo el rótulo «dinero, sistemas ajenos, IA impredecible».

- De las siete, marcaron tres. Y las justificaron con tres desafíos del caso.
- Primero: el cliente es una ONG que vive de donaciones, y la IA cobra por cada uso.
- De ahí, factibilidad: que el sistema se pueda construir y mantener con el dinero, el tiempo y la gente que hay. *(pausa 1 s)*
- Segundo: cada empresa usa su propio sistema de recursos humanos, y cada uno tiene una API distinta. *(dice: «Segundo: cada empresa usa su propio sistema de recursos humanos, y cada uno tiene una A-P-I distinta.»)*
- De ahí, interoperabilidad: poder conectarse con sistemas ajenos para completar una tarea.
- Para ClearView, eso es entregar un currículum a cualquier sistema de recursos humanos. Y también poder cambiar de modelo de IA sin rehacer todo. *(pausa 1 s)*
- Tercero: la IA no es determinista. Determinista quiere decir: misma entrada, misma salida. Con la IA, cada versión nueva puede cambiar los resultados.
- De ahí, testabilidad: qué tan fácil y completo es probar el sistema. Si no puedes revisar lo que hace la IA, nadie puede confiar en sus resultados. *(pausa 1 s)*
- Mira las tres juntas: dinero, sistemas ajenos e IA impredecible. Ninguna habla de velocidad, ni de millones de usuarios.

#### `piensalo` · Piénsalo tú (~50 s)

> **Visual.** La hoja de estilos de Richards: ocho columnas con iconos (layered, modular monolith, microkernel, microservices, service-based, service-oriented, event-driven, space-based) y filas con estrellas. Las filas de interoperabilidad y testabilidad se resaltan. Un hueco donde debería estar «factibilidad». Anillo de 3 s. Después aparecen resaltadas «cost» y «simplicity» con un asterisco y la nota al pie real: «* used as a substitute for feasibility (each 0.5x weight)».

- Con las tres elegidas, faltaba lo grande: el estilo de arquitectura, la forma general del sistema. Una sola pieza o muchas, y cómo se hablan.
- La misma hoja compara ocho estilos, con estrellas, una fila por característica.
- Pero hay un problema: la hoja no tiene una fila para factibilidad. *(pausa 0.8 s)*
- Piénsalo tú: si lo que más te importa no está en la tabla, ¿qué haces? *(pausa 3 s)*
- El equipo la reemplazó por dos filas que sí están: costo y simplicidad, cada una con la mitad del peso.
- Y lo dejó anotado al pie de la hoja. Un atajo, pero a la vista. *(pausa 1 s)*

#### `estilo` · El estilo (~68 s)

> **Visual.** Columna service-based resaltada con sus recuadros reales: costo ★★★★, simplicidad ★★★, testabilidad ★★★★, interoperabilidad ★★. Diagrama simple: cuatro servicios grandes (candidatos, empleadores, historia, matching) sobre una base compartida. Después, la columna event-driven con su recuadro en interoperabilidad ★★★ y una flecha de aviso entre dos servicios, con un post-it amarillo del capítulo 1 encima. Por último, microkernel: núcleo con complementos, sus filas de escalabilidad ★ y tolerancia a fallos ★ en rojo, y una X.

- Con esas filas, ganó un estilo llamado service-based, basado en servicios.
- Son unos pocos servicios grandes, uno por área del negocio, como candidatos o matching. Se despliegan por separado, y suelen compartir la base de datos.
- Saca cuatro estrellas en costo y en testabilidad, y tres en simplicidad. Pero en interoperabilidad, solo dos. *(pausa 0.8 s)*
- Para eso sumaron un segundo estilo, solo donde haga falta: event-driven, dirigido por eventos.
- Un servicio publica un aviso de que algo pasó, y los demás reaccionan cuando pueden, sin esperarse. ¿Recuerdas los eventos del taller? Son esos avisos, ahora entre programas. *(pausa 1 s)*
- Hubo un candidato serio: microkernel, un núcleo pequeño al que se le enchufan complementos. Es barato y simple.
- Lo descartaron porque saca una sola estrella en escalabilidad y en tolerancia a fallos, dos de las siete del equipo. *(pausa 1 s)*
- Servicios grandes para ahorrar y probar. Eventos donde hay que conectar.

#### `historial` · Lo que muestra git (~56 s)

> **Visual.** Línea de tiempo del repositorio. Las dos hojas caen en el 23/09. Más adelante: «requisitos 25/09», «experto 26–27/09», «entrega 30/09». Una línea continua marca que el estilo no cambia. El 15/10 aparece la sección «fortalecidas / debilitadas» del ADR-002 (testabilidad, costo, agilidad / elasticidad).

- Ahora, un detalle que solo se ve en el historial de git.
- Las dos hojas tienen la misma fecha: 23 de septiembre. El primer día. *(dice: «Las dos hojas tienen la misma fecha: veintitrés de septiembre. El primer día.»)*
- El estilo se eligió antes de escribir la lista de requisitos, y antes de hablar con un experto en IA. Y nunca cambió.
- Lo que llegó tarde fue el porqué completo: lo que el estilo gana y lo que cede se escribió después de la entrega. *(pausa 1 s)*
- Por ejemplo, lo que cede: con la base compartida, el sistema crece peor cuando la carga sube de golpe.
- Elegir el estilo temprano es una apuesta. Lo que la vuelve defendible es que el criterio quedó por escrito: tres características y una hoja que cualquiera puede revisar. *(pausa 1 s)*

#### `outro` · Para llevarte (~38 s)

> **Visual.** Cuatro tarjetas: «cómo se comporta, no qué hace»; las tres casillas con sus desafíos; la hoja con el asterisco; service-based + eventos. Avance: un signo de pregunta sobre la palabra «LLM».

- Repasemos. Las características dicen cómo se comporta el sistema. Se eligen pocas, y con su porqué.
- Pragmatic eligió factibilidad, interoperabilidad y testabilidad, por tres desafíos: dinero, sistemas ajenos e IA impredecible.
- Cuando a la hoja le faltó factibilidad, la reemplazaron por costo y simplicidad, y lo anotaron.
- Resultado: servicios grandes, y eventos donde hay que conectar. *(pausa 1 s)*
- Pero quedaba lo más incierto: nadie en el equipo sabía bien cuánto cuesta, ni cómo se comporta, un LLM. Capítulo 3: lo que no sabían. *(dice: «Pero quedaba lo más incierto: nadie en el equipo sabía bien cuánto cuesta, ni cómo se comporta, un L-L-M. Capítulo tres: lo que no sabían.»)*


---

## Capítulo 3 · Lo que no sabían

**Duración estimada:** 903 palabras habladas, 6:50 de voz a 2,2 palabras/s, más 18,6 s de pausas escritas: **7:09**. 9 escenas.

### Plan

**Ideas esenciales**

1. Requisitos y supuestos numerados con códigos estables (R, Q, A; nunca renumerar) para que cada ADR se pueda rastrear hasta lo que lo sostiene. Y cuando falta un dato, se supone con fuente (A17).
2. La contradicción escrita como «nota para después»: un proceso justo pide determinismo (A9), y la IA cambia con cada versión (A10). Debajo: «usar la menor IA posible».
3. Lo que no sabían, lo preguntaron: la entrevista al experto como curso rápido de LLM (prompt, token, temperatura, rate limit, vida útil, conjuntos de prueba).
4. Las respuestas se vuelven supuestos numerados y requisitos (A20–A28, Q14, Q15).

**Anclas en el repositorio**

- `Requirements/requirements-and-assumptions.md`: primera versión `cad0b4f` (25/09 00:30) con «Open Questions» y «Notes for later»; A17 en `870a617`; A20–A31 y Q12–Q16 en `72923e5` (29/09).
- `Requirements/Research/interview-ai-expert.md`: preguntas `870a617` (25/09), pregunta extra `6af9574` (26/09), notas `4923a1c` (27/09), limpieza `a774a6b` (30/09).
- Referencia colgada: ADR-010 cita Q4, borrado en `c7a9e8e`.

**Al terminar, el espectador puede**

- Escribir requisitos y supuestos con identificadores estables y citarlos desde las decisiones.
- Suponer un número que falta, con su fuente, y dejarlo discutible.
- Explicar qué es un prompt, un token, la temperatura y un rate limit, y por qué importan en un diseño.

**Qué se deja afuera (y por qué)**

- La lista completa de requisitos (pantalla, no voz).
- Las preguntas abiertas del primer borrador, salvo la nota de la contradicción.
- El precio por flat rate (PTU): las notas crudas y las limpias se contradicen (ver `HISTORIA.md` §6).
- Contexto frente a fine-tuning, OCR y modelos multimodales, privacidad de Azure: detalle para el curso escrito (privacidad vuelve en el capítulo 4).
- Prompt injection: el experto lo advierte, pero ningún ADR lo trata; se menciona en `HISTORIA.md` §7.

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (38 palabras, ~18 s) | Puente | Puente ~15 s | — | — | — | Sí | Bien |
| lista (161 palabras, ~76 s) | Requisito y supuesto; Códigos estables; Trazabilidad; El error real | Requisito y supuesto ~38 s; Códigos estables ~16 s; Trazabilidad ~7 s; El error real ~9 s | Sí: el par A1 → R11 antes de la regla | Sí | Sí: la regla se justifica por sus citas | Sí: cada flecha queda ~5 s | Bien |
| numero (86 palabras, ~40 s) | Suponer un número con fuente (A17) | Suponer un número con fuente (A17) ~36 s | Sí: el hueco del pliego del capítulo 1 | — | Sí: sin volumen no se puede dimensionar nada | Sí: el embudo queda armado | Bien |
| nota (98 palabras, ~47 s) | La contradicción A9/A10; «Usar la menor IA posible» | La contradicción A9/A10 ~36 s; «Usar la menor IA posible» ~11 s | Sí: las dos tarjetas antes de la conclusión | Determinismo ya definido en el capítulo 2 | Sí: el producto promete justicia con una herramienta cambiante | Sí: la nota original con traducción queda ~10 s | Bien |
| experto (74 palabras, ~34 s) | Preguntar a un experto con preguntas preparadas | Preguntar a un experto con preguntas preparadas ~34 s | Sí: viene de la contradicción y de los huecos | — | Sí: lo que no sabes, lo preguntas | Sí | Bien |
| respuestas (195 palabras, ~92 s) | Prompt y token; Temperatura (determinismo); Rate limit y demora; Vida útil del modelo; Conjunto de pruebas (plantado para el capítulo 7) | Prompt y token ~26 s; Temperatura (determinismo) ~25 s; Rate limit y demora ~21 s; Vida útil del modelo ~10 s; Conjunto de pruebas (plantado para el capítulo 7) ~11 s | Sí: cada término llega como respuesta a una pregunta ya planteada | Sí, todos | Sí: cada uno con su consecuencia (costo, resultados que cambian, cortes, migraciones) | Sí: una tarjeta por respuesta, ~15 s cada una | Bien (vida útil recibe ~9 s: se trabaja de nuevo en el capítulo 4) |
| piensalo (43 palabras, ~24 s) | Aplicar: dónde está el costo | Aplicar: dónde está el costo ~24 s | Sí: después de token y medio millón de dólares | — | Sí, con la frase del experto | Sí | Bien |
| supuestos (126 palabras, ~60 s) | Supuestos A25 y A26; Q14 y Q15; La cadena de trazabilidad | Supuestos A25 y A26 ~24 s; Q14 y Q15 ~28 s; La cadena de trazabilidad ~9 s | Sí: salen de la entrevista recién vista | — | Sí: Q15 atado al trato justo de A9 | Sí: cada renglón queda escrito | Bien |
| outro (82 palabras, ~38 s) | Repaso; Avance | Repaso ~29 s; Avance ~9 s | — | — | — | Sí | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| Requisitos, supuestos, códigos estables y trazabilidad | ~91 s | `lista`, `supuestos`, `outro` |
| Suponer un número con fuente (A17) | ~46 s | `numero`, `outro` |
| La contradicción A9/A10 y «la menor IA posible» | ~68 s | `nota`, `supuestos`, `outro` |
| Prompt, token y costo | ~49 s | `respuestas`, `piensalo` |
| Temperatura (determinismo) | ~25 s | `respuestas` |
| Rate limit y demora (vuelven en los capítulos 4, 7 y 8) | ~21 s | `respuestas` |
| De la entrevista a supuestos y requisitos (Q14, Q15) | ~51 s | `supuestos` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Supuesto? ¿No es lo mismo que requisito?» Se definen juntos, en contraste, con el par A1 → R11.
- «¿Por qué no renumerar?» Se responde con la consecuencia: las citas apuntarían a otra cosa. Y se muestra que al equipo se le escapó una.
- «¿De dónde sale 25.000?» Se dice la fuente (Statista) y la cuota supuesta (10 %).
- «¿Token? ¿Prompt? ¿Temperatura? ¿Rate limit?» Cada uno con su línea, y con la cifra o consecuencia que lo hace importar.
- «¿Por qué Q15 importa?» Se ata al trato justo de A9: si a unos los midió un modelo y a otros otro, el trato no es el mismo.

### Guion

#### `intro` · Capítulo 3 (~18 s)

> **Visual.** La línea de tiempo del capítulo 2 con el estilo fijado. A la derecha, un LLM como caja negra con signos de pregunta. Título.

- En el capítulo 2, el equipo eligió el estilo en un día. Pero tenía una deuda. *(dice: «En el capítulo dos, el equipo eligió el estilo en un día. Pero tenía una deuda.»)*
- El pliego dejaba huecos, y nadie en el equipo sabía bien cómo se comporta un LLM. *(pausa 0.6 s; dice: «El pliego dejaba huecos, y nadie en el equipo sabía bien cómo se comporta un L-L-M.»)*
- Capítulo 3: lo que no sabían. *(dice: «Capítulo tres: lo que no sabían.»)*

#### `lista` · Requisitos y supuestos (~76 s)

> **Visual.** Un archivo que se abre a las 00:30 del 25/09. Tres columnas con color: R (qué hace), Q (cómo debe hacerlo), A (supuestos). Una flecha une A1 con R11. Arriba, la regla original resaltada: «When deleting, do not reorder or reassign numbers but just leave a gap». Un ADR con una cita «Q5» que apunta al renglón correcto; si se renumera, la flecha queda apuntando a otro. Al final, el ADR-010 con su cita a «Q4» y un renglón vacío.

- El miércoles 25, pasada la medianoche, apareció un archivo nuevo: requisitos y supuestos. *(dice: «El miércoles veinticinco, pasada la medianoche, apareció un archivo nuevo: requisitos y supuestos.»)*
- Un requisito es algo que el sistema tiene que hacer o cumplir. Un supuesto es algo que el equipo da por cierto, sin que el cliente lo haya dicho.
- Cada uno lleva un código: R para lo que el sistema hace, Q para cómo tiene que hacerlo, y A para los supuestos.
- Por ejemplo, el supuesto A1: una empresa puede tener varios responsables de contratación, uno por área. De ahí sale el requisito R11: la empresa puede abrirles cuentas. *(pausa 0.8 s; dice: «Por ejemplo, el supuesto a uno: una empresa puede tener varios responsables de contratación, uno por área. De ahí sale el requisito erre once: la empresa puede abrirles cuentas.»)*
- Arriba del archivo, una regla: si borras uno, no renumeres. Deja el hueco.
- ¿Por qué? Porque las decisiones van a citar esos códigos. Si los números se corren, las citas apuntan a otra cosa. *(pausa 1 s)*
- Así, cada decisión se puede seguir hasta el supuesto que la sostiene. Eso se llama trazabilidad.
- Y aun así, se les escapó una: un ADR terminó citando un requisito que ya habían borrado. *(pausa 1 s; dice: «Y aun así, se les escapó una: un A-D-R terminó citando un requisito que ya habían borrado.»)*

#### `numero` · Un número propio (~40 s)

> **Visual.** El pliego con su hueco de «volumen: ?». Al lado, el supuesto A17 con la fuente Statista. Un embudo: 250.000 puestos por mes → 10 % → 25.000 puestos y unos 25.000 candidatos. El número queda en una tarjeta «guárdalo».

- El pliego no traía volúmenes, así que el equipo los supuso. Supuesto A17. *(dice: «El pliego no traía volúmenes, así que el equipo los supuso. Supuesto a diecisiete.»)*
- En Estados Unidos, en el sector de la información, se abren como máximo unos 250.000 puestos por mes, según Statista. *(dice: «En Estados Unidos, en el sector de la información, se abren como máximo unos doscientos cincuenta mil puestos por mes, según Statista.»)*
- Si ClearView llegara al 10 % de ese mercado: 25.000 puestos por mes, y más o menos la misma cantidad de candidatos activos. *(dice: «Si ClearView llegara al diez por ciento de ese mercado: veinticinco mil puestos por mes, y más o menos la misma cantidad de candidatos activos.»)*
- No es un dato del cliente. Es un supuesto con su fuente, que cualquiera puede discutir. *(pausa 1 s)*
- Guarda este número: en el capítulo 6 decide mucho. *(dice: «Guarda este número: en el capítulo seis decide mucho.»)*

#### `nota` · Una nota para después (~47 s)

> **Visual.** Al pie del archivo, la sección «Notes for later» con su texto original y la traducción. A9 y A10 aparecen como dos tarjetas que chocan: «trato justo = siempre igual» contra «la IA cambia con cada versión». En el centro, el producto: «IA para contratar con justicia». Después, la segunda nota en grande: «Use as little AI as necessary» / «usar la menor IA posible».

- Al pie del archivo, el equipo dejó una nota para después. Dice: «A9 y A10 muestran una contradicción. Podría ser la base de un buen argumento». *(dice: «Al pie del archivo, el equipo dejó una nota para después. Dice: A nueve y A diez muestran una contradicción. Podría ser la base de un buen argumento.»)*
- A9: un proceso de contratación justo busca más determinismo, y menos arbitrariedad. Que la misma persona reciba siempre el mismo trato. *(dice: «a nueve: un proceso de contratación justo busca más determinismo, y menos arbitrariedad. Que la misma persona reciba siempre el mismo trato.»)*
- A10: los modelos de IA cambian. Cada versión nueva da resultados distintos. *(dice: «a diez: los modelos de IA cambian. Cada versión nueva da resultados distintos.»)*
- Y el producto entero consiste en usar IA para que contratar sea más justo. *(pausa 1.2 s)*
- Debajo, una segunda nota, muy corta: usar la menor IA posible.
- Quédate con esa frase. Es la semilla del capítulo 6. *(pausa 1 s; dice: «Quédate con esa frase. Es la semilla del capítulo seis.»)*

#### `experto` · Preguntar (~34 s)

> **Visual.** Una libreta con las preguntas reales, que se escriben una por una (costo, previsibilidad del costo, determinismo, pruebas, vida útil). El 26/09 a la mañana se agrega la última, sobre las API. Después, la libreta se llena de respuestas (sin nombre del experto).

- Para salir de dudas, el equipo hizo algo poco común en un kata: preparó una entrevista con un experto en IA.
- Escribió las preguntas antes: cuánto cuesta, si se puede predecir el costo, cuándo es determinista, cómo se prueba, y cuánto dura un modelo.
- La mañana del jueves, agregó una más: ¿las API de los modelos responden al instante, o tardan? *(dice: «La mañana del jueves, agregó una más: ¿las A-P-I de los modelos responden al instante, o tardan?»)*
- Las respuestas quedaron en el repositorio, resumidas. Son un curso rápido de LLM. *(pausa 0.8 s; dice: «Las respuestas quedaron en el repositorio, resumidas. Son un curso rápido de L-L-M.»)*

#### `respuestas` · Lo que respondió (~92 s)

> **Visual.** Cuatro tarjetas que entran de a una. 1) Costo: un prompt partido en tokens (pedazos de colores) que entran a un medidor; cifra «500.000 prompts ≈ 500.000 USD». 2) Temperatura: un dial que baja a 0, y aun así dos prompts casi iguales dan respuestas distintas. 3) Límites: un medidor de tokens por minuto que llega al tope y corta; un reloj de 60 s. 4) Vida útil: una línea de 1 a 2 años con el modelo retirado al final. Al pie, una pila «conjunto de pruebas».

- Primero, el costo. Lo que le envías al modelo se llama prompt.
- Y se cobra por token: un pedazo de texto, más o menos una parte de una palabra. Pagas los tokens que envías, y los que vuelven.
- El experto contó un proyecto con prompts largos: medio millón de prompts, medio millón de dólares. *(pausa 1 s)*
- Segundo, el determinismo. Hay un ajuste, la temperatura, que controla cuánto azar mete el modelo.
- Puedes bajarla a cero. Aun así, cambiar el prompt, o cambiar de modelo, puede cambiar mucho el resultado.
- El experto lo llamó comportamiento caótico: un cambio pequeño en la entrada, y un cambio grande en la salida. *(pausa 1 s)*
- Tercero, los límites. Cada servicio impone un rate limit: cuántos tokens por minuto acepta. Si lo pasas, te corta.
- Para un sistema que procesa miles de currículums, ese corte no es un detalle: es un techo.
- Y una respuesta puede tardar hasta 60 segundos. *(pausa 0.8 s; dice: «Y una respuesta puede tardar hasta sesenta segundos.»)*
- Cuarto, la vida útil. Con tanta competencia, un modelo queda viejo en uno o dos años, y el proveedor lo retira. *(pausa 0.8 s)*
- Y para probar, hace falta un conjunto de pruebas grande, que se vuelve a correr cada vez que cambia el prompt o el modelo.

#### `piensalo` · Piénsalo tú (~24 s)

> **Visual.** Dos columnas de costo: «servidores de ClearView» y «la IA». Anillo de 3 s. Después la balanza cae del lado de la IA, con la frase de las notas crudas: «el costo operativo lo dominará la IA».

- Piénsalo tú. Con lo que dijo el experto, ¿qué va a costar más en ClearView: los servidores propios, o la IA? *(pausa 3 s)*
- La IA. El mismo experto lo dijo: el costo de operar lo va a dominar el LLM, y el resto será despreciable. *(pausa 1 s; dice: «La IA. El mismo experto lo dijo: el costo de operar lo va a dominar el L-L-M, y el resto será despreciable.»)*

#### `supuestos` · De la charla a la lista (~60 s)

> **Visual.** Las tarjetas de la entrevista se convierten en renglones numerados A20…A28, que entran al archivo de requisitos. Se resaltan A25 y A26. Flechas hacia Q14 y Q15. Al final, una cadena: duda → pregunta → supuesto → requisito.

- Nada de esto quedó como anécdota. Se convirtió en nueve supuestos nuevos, numerados.
- Por ejemplo, A25: contando pruebas, conocimiento y uso, los LLM son el mayor costo técnico de ClearView. *(dice: «Por ejemplo, a veinticinco: contando pruebas, conocimiento y uso, los L-L-M son el mayor costo técnico de ClearView.»)*
- Y A26: a una ONG le cuesta conseguir fondos, sobre todo si el costo es difícil de estimar. *(pausa 0.8 s; dice: «Y a veintiséis: a una ONG le cuesta conseguir fondos, sobre todo si el costo es difícil de estimar.»)*
- De esos supuestos salen requisitos. Q14: cambiar el prompt o el modelo no debe empeorar los matches. *(dice: «De esos supuestos salen requisitos. cu catorce: cambiar el prompt o el modelo no debe empeorar los matches.»)*
- Q15: si cambian, hay que volver a calcular los puntajes de todos los matches. *(pausa 0.8 s; dice: «cu quince: si cambian, hay que volver a calcular los puntajes de todos los matches.»)*
- ¿Por qué todos? Por A9: si a unos los midió un modelo y a otros otro, el trato ya no es el mismo. *(pausa 1 s; dice: «¿Por qué todos? Por a nueve: si a unos los midió un modelo y a otros otro, el trato ya no es el mismo.»)*
- La cadena completa: una duda, una pregunta al experto, un supuesto con número, y un requisito que lo cita.

#### `outro` · Para llevarte (~38 s)

> **Visual.** Cuatro tarjetas: R/Q/A con la regla del hueco; el embudo de 25.000; la nota de la contradicción; las cuatro respuestas del experto. Avance: una nube con «alquilar» y un servidor con «correr propio».

- Repasemos. Requisitos y supuestos numerados, sin renumerar, para que cada decisión se pueda rastrear.
- Cuando falta un dato, se supone, con fuente: 25.000 puestos por mes. *(dice: «Cuando falta un dato, se supone, con fuente: veinticinco mil puestos por mes.»)*
- La contradicción entre una IA cambiante y un trato justo quedó escrita, junto a una idea: usar la menor IA posible.
- Y lo que no sabían, lo preguntaron: tokens, temperatura, límites, y modelos que envejecen. *(pausa 1 s)*
- Con eso, había que decidir dónde vive la IA: ¿la corren ellos, o la alquilan? Capítulo 4: alquilar la IA. *(dice: «Con eso, había que decidir dónde vive la IA: ¿la corren ellos, o la alquilan? Capítulo cuatro: alquilar la IA.»)*


---

## Capítulo 4 · Alquilar la IA

**Duración estimada:** 759 palabras habladas, 5:45 de voz a 2,2 palabras/s, más 16,7 s de pausas escritas: **6:02**. 8 escenas.

### Plan

**Ideas esenciales**

1. La primera idea fue correr los modelos en contenedores propios (ADR-006), con buenas razones: el modelo pesa y se usa poco, así que conviene que escale aparte.
2. Tres caminos (ADR-007): LLM externo, open source en la nube, open source en servidores propios. Gana alquilar, por factibilidad. ADR-006 no se borra: queda «reemplazado por ADR-007».
3. Medir antes de decidir: un prompt de prueba con tokens y precios con fecha. Una historia cuesta entre una décima de centavo y 2,5 centavos según el modelo (A24).
4. El precio de alquilar: rate limit, modelos que se retiran, privacidad. Por eso todo cliente del LLM es asíncrono. Y la tesis: ahorrar en el resto para pagar la IA.

**Anclas en el repositorio**

- `ADR/ADR-006-ai-models-run-on-separate-containers.md`: esqueleto *Accepted* en `4923a1c`; texto y estado *Superseded* en `72923e5`.
- `ADR/ADR-007-use-of-external-llms.md`: esqueleto «Flexibility toward AI models» en `4923a1c`; renombrado y escrito en `72923e5`.
- `Requirements/Research/token-estimation.md` (`72923e5`, 29/09; precios archivados el 29/09).
- C2 del 28/09 (`ab2291b`): leyenda «Service with external AI».
- `README.md`: *Known limitations* (rate limit, `d4c4fbb`) e introducción (`9891219`, 15/10).

**Al terminar, el espectador puede**

- Comparar alojar un modelo propio frente a alquilarlo, con pros y contras concretos.
- Estimar el costo de una llamada a un LLM con tokens de entrada, de salida y una tabla de precios.
- Usar el estado «reemplazado» de un ADR para registrar un cambio de opinión.

**Qué se deja afuera (y por qué)**

- El detalle de PTU (tarifa plana) y su contradicción en las notas.
- Las características «fortalecidas y debilitadas» completas de ADR-006 y ADR-007 (pantalla).
- La contradicción de ADR-007 «el costo es más predecible» frente a A25/A26 (en `HISTORIA.md` §6; la voz sigue a la entrevista).
- La verificación propia de los precios por millón de tokens (en `HISTORIA.md` §6).

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (28 palabras, ~13 s) | Puente | Puente ~11 s | — | — | — | Sí | Bien |
| primera (103 palabras, ~48 s) | Contenedor; Separar el modelo (ADR-006) y su porqué; La pregunta escondida | Contenedor ~10 s; Separar el modelo (ADR-006) y su porqué ~31 s; La pregunta escondida ~6 s | Sí: el problema de escalar juntos antes de la solución | Sí | Sí: memoria, hardware y uso desigual | Sí | Bien |
| tres (144 palabras, ~68 s) | A: LLM externo; B: open source en la nube; C: on-prem | A: LLM externo ~30 s; B: open source en la nube ~18 s; C: on-prem ~13 s | Sí: la pregunta escondida de la escena anterior | Sí: cada opción por lo que es | Sí: pros y contras del ADR, con el dato del experto | Sí: la tabla queda armada al final | Bien |
| piensalo (19 palabras, ~12 s) | Aplicar el top 3 a una decisión | Aplicar el top 3 a una decisión ~12 s | Sí: después de las tres opciones y del top 3 | — | — | Sí: la tabla sigue visible | Bien |
| decision (92 palabras, ~45 s) | La elección y su porqué; Estado «reemplazado»; Síntesis | La elección y su porqué ~16 s; Estado «reemplazado» ~24 s; Síntesis ~4 s | Sí | Sí: reemplazado | Sí: factibilidad y tendencia de precios (ADR-007) | Sí: el cambio de estado se anima y queda | Bien |
| precio (163 palabras, ~77 s) | El prompt de prueba; Tokens de entrada y salida; Precio por modelo (25 veces); A24 y el método | El prompt de prueba ~22 s; Tokens de entrada y salida ~14 s; Precio por modelo (25 veces) ~24 s; A24 y el método ~17 s | Sí: la pregunta concreta antes de la cuenta | Tokens ya definidos en el capítulo 3 | Sí: medir para estimar un costo incierto | Sí: la barra de 25× queda ~5 s con pausa | Bien |
| costo (128 palabras, ~60 s) | Los costos de alquilar; Clientes del LLM por mensajes; La tesis de ahorro (plantada) | Los costos de alquilar ~26 s; Clientes del LLM por mensajes ~16 s; La tesis de ahorro (plantada) ~18 s | Sí: los contras de la opción A vuelven como costos | Mensajes ya vistos como eventos en el capítulo 2 | Sí | Sí | Bien (la asincronía se formaliza en el capítulo 5) |
| outro (82 palabras, ~38 s) | Repaso; Avance | Repaso ~25 s; Avance ~13 s | — | — | — | Sí | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| Separar el modelo en su contenedor (ADR-006) | ~48 s | `primera` |
| Tres caminos y la elección de alquilar (ADR-007) | ~101 s | `tres`, `piensalo`, `decision`, `outro` |
| Estado «reemplazado» | ~32 s | `decision`, `outro` |
| Estimar el costo de una historia (A24) | ~87 s | `precio`, `outro` |
| El precio de alquilar y los clientes por mensajes | ~42 s | `costo` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Contenedor?» Se define al nombrarlo, con su ventaja (se enciende en cualquier servidor).
- «¿Por qué no correr el modelo propio, si es más privado?» Se dan sus pros reales antes del contra del experto.
- «¿Qué es «reemplazado»?» Se define: no se borra, queda enlazado al que lo sustituye.
- «¿850 tokens es mucho?» Se descompone: instrucciones más un currículum de ejemplo.
- «¿Por qué veinticinco veces?» Se dice que es la misma tarea con otro modelo, y se ata a A24.
- «¿Asíncrono?» Se usa sin definir formalmente; la definición completa llega en el capítulo 5. Aquí se explica por su efecto: nada se traba si el modelo tarda.

### Guion

#### `intro` · Capítulo 4 (~13 s)

> **Visual.** La balanza del capítulo 3 inclinada hacia la IA. Una pregunta: «¿dónde corre?». Título.

- ¿Recuerdas al experto del capítulo 3? Dijo que la IA iba a ser el mayor costo del sistema. *(dice: «¿Recuerdas al experto del capítulo tres? Dijo que la IA iba a ser el mayor costo del sistema.»)*
- Ahora tocaba decidir dónde corre. *(pausa 0.6 s)*
- Capítulo 4: alquilar la IA. *(dice: «Capítulo cuatro: alquilar la IA.»)*

#### `primera` · La primera idea (~48 s)

> **Visual.** El ADR-006 en su esqueleto del 26/09 (una línea, estado «Accepted»). Diagrama: servicio de candidatos y de empleadores (livianos) y, aparte, un contenedor grande «modelo de IA» con un chip. Cuando el tráfico sube, el servicio de candidatos se duplica, y el modelo no. Al final, un signo de pregunta adentro del contenedor del modelo.

- En la sesión de diseño del jueves 26, el equipo anotó una primera decisión: los modelos de IA corren en sus propios contenedores. *(dice: «En la sesión de diseño del jueves veintiséis, el equipo anotó una primera decisión: los modelos de IA corren en sus propios contenedores.»)*
- Un contenedor es un paquete con un programa y todo lo que necesita para correr. Se enciende y se apaga en cualquier servidor.
- La razón era buena. Un modelo pide mucha memoria, y a veces hardware especial. Y se usa en pocas funciones.
- Si el servicio de candidatos se duplica por tráfico, no tiene sentido duplicar también el modelo. Separados, cada uno crece a su ritmo. *(pausa 1 s)*
- Pero esa decisión traía otra pregunta, escondida: ¿qué modelo corre ahí adentro? ¿Uno propio?

#### `tres` · Tres caminos (~68 s)

> **Visual.** Tres columnas que se arman de a una, con iconos: A) una nube con logos genéricos de proveedor y una flecha de API; B) una nube con un contenedor propio y un modelo open source; C) un edificio con servidores, un enchufe y personas. Debajo de cada una, sus pros en verde y contras en rojo, con las palabras exactas de la voz.

- El ADR 007 pone tres caminos sobre la mesa, con sus pros y sus contras. *(dice: «El A-D-R cero cero siete pone tres caminos sobre la mesa, con sus pros y sus contras.»)*
- A: alquilar un LLM externo, de Azure, Google u OpenAI. Se usa por una API: envías el prompt, y te devuelve la respuesta. *(dice: «A: alquilar un L-L-M externo, de Azure, Google u OpenAI. Se usa por una A-P-I: envías el prompt, y te devuelve la respuesta.»)*
- A favor: casi no hay que desarrollar nada, se sale rápido, y siempre tienes el modelo más nuevo.
- En contra: es caro, tiene límites de uso, los modelos se retiran pronto, y el texto del candidato viaja a otra empresa. *(pausa 1 s)*
- B: un modelo de código abierto, como los de Meta o Mistral, en contenedores propios en la nube.
- Da más control, y más privacidad. Pero según el experto no sale más barato, y exige gente que sepa operarlo. *(pausa 1 s)*
- C: ese mismo modelo, en servidores propios. Control total.
- Pero hay que comprar hardware especial, contratar personal y pagar la electricidad, y eso demora el proyecto. *(pausa 1 s)*

#### `piensalo` · Piénsalo tú (~12 s)

> **Visual.** Las tres columnas en pantalla. Arriba, las tres casillas del top 3, con factibilidad resaltada, y una alcancía de donaciones. Anillo de 3 s.

- Piénsalo tú. Recuerda el top 3: factibilidad primero, para una ONG que vive de donaciones. ¿A, B o C? *(pausa 3 s; dice: «Piénsalo tú. Recuerda el top tres: factibilidad primero, para una ONG que vive de donaciones. ¿A, B o C?»)*

#### `decision` · La decisión (~45 s)

> **Visual.** La columna A se ilumina. Tres razones aparecen debajo. Después, el ADR-006 cambia su estado: «Accepted» se tacha y aparece «Superseded by ADR-007» con una flecha hacia el ADR-007. El C2 del 28/09 con su leyenda «Service with external AI» se ilumina.

- El equipo eligió A: alquilar.
- Por factibilidad: sin hardware, sin especialistas propios, y con el modelo más nuevo desde el primer día.
- Y porque los precios tienden a bajar: alquilando, esa baja llega sola. *(pausa 1 s)*
- Con esto, el ADR 006 cambió de estado: reemplazado por el ADR 007. *(dice: «Con esto, el A-D-R cero cero seis cambió de estado: reemplazado por el A-D-R cero cero siete.»)*
- No se borró. Quedó marcado como reemplazado, con un enlace a la decisión que lo sustituye. *(pausa 0.8 s)*
- Así, quien lea el repositorio ve también el camino que no se tomó, y por qué. *(pausa 1 s)*
- Un registro de decisiones guarda también las que cambian.

#### `precio` · Cuánto cuesta una historia (~77 s)

> **Visual.** El prompt de prueba real, traducido, con la lista de factores a eliminar resaltada. Un contador de tokens: 850 de entrada (instrucciones + un currículum de ejemplo), 1.400 de salida. La página de precios con fecha 29/09. Dos monedas: GPT-4o ≈ 0,025 USD; GPT-4o mini ≈ 0,001 USD. Una barra 25 veces más larga que la otra. Al final, el renglón A24.

- Alquilar tiene una consecuencia: se paga por uso. Entonces, ¿cuánto cuesta crear una historia?
- El equipo no se quedó con la duda. Escribió un prompt de prueba: transforma este currículum en una historia, y elimina la raza, el sexo, el género, la orientación sexual, la salud y el atractivo.
- Con el texto de un currículum de ejemplo, unos 850 tokens de entrada. *(dice: «Con el texto de un currículum de ejemplo, unos ochocientos cincuenta tokens de entrada.»)*
- Para una historia de unas 400 palabras, supusieron unos 1.400 tokens de salida. *(pausa 0.8 s; dice: «Para una historia de unas cuatrocientas palabras, supusieron unos mil cuatrocientos tokens de salida.»)*
- Y consultaron la página de precios de OpenAI ese mismo domingo.
- Con el modelo más nuevo, GPT-4o, unos dos centavos y medio de dólar por historia. Con el más barato, GPT-4o mini, una décima de centavo. *(dice: «Con el modelo más nuevo, G-P-T cuatro o, unos dos centavos y medio de dólar por historia. Con el más barato, G-P-T cuatro o mini, una décima de centavo.»)*
- La misma tarea, veinticinco veces más cara según el modelo. *(pausa 1.5 s)*
- De ahí salió el supuesto A24: el costo varía muchísimo con el tamaño del prompt y con el modelo elegido. *(dice: «De ahí salió el supuesto a veinticuatro: el costo varía muchísimo con el tamaño del prompt y con el modelo elegido.»)*
- Fíjate en el método: no adivinaron. Midieron un caso concreto, con fuente y con fecha. *(pausa 1 s)*

#### `costo` · El precio de alquilar (~60 s)

> **Visual.** Tres iconos de costo que se encienden: un semáforo (rate limit) con la etiqueta «limitación conocida»; un modelo con fecha de retiro; un sobre que sale hacia otra empresa (privacidad). Después, un servicio que deja un mensaje en un buzón hacia el LLM y sigue trabajando; el LLM tarda, y nada se traba. Al final, la frase de la introducción del README con su fecha (15/10).

- Alquilar resuelve mucho, pero el equipo anotó lo que paga.
- Los límites de uso: si se pasan, el servicio corta. Eso quedó como una limitación conocida, sin resolver.
- Los modelos que se retiran: cada cambio obliga a probar todo de nuevo. Y la privacidad: el texto viaja a otra empresa, y hay que revisar las reglas. *(pausa 1 s)*
- Por eso, cada parte del sistema que le habla a un LLM lo hace con mensajes, sin quedarse esperando la respuesta. *(dice: «Por eso, cada parte del sistema que le habla a un L-L-M lo hace con mensajes, sin quedarse esperando la respuesta.»)*
- Si el modelo tarda un minuto, o corta, nada se traba. *(pausa 1 s)*
- Y después de la entrega, el equipo escribió la idea que ordena todo lo demás: ahorrar a propósito en el resto del sistema, para poder pagar una IA de precio impredecible.
- Cómo lo hicieron, lo verás en el capítulo 8. *(dice: «Cómo lo hicieron, lo verás en el capítulo ocho.»)*

#### `outro` · Para llevarte (~38 s)

> **Visual.** Cuatro tarjetas: el contenedor separado (con «reemplazado»); las tres columnas con A marcada; la barra de 25×; la frase de ahorro. Avance: muchas puertas de colores distintos.

- Repasemos. La primera idea fue correr los modelos en contenedores propios. Tenía razones, y quedó registrada.
- Comparados tres caminos, ganó alquilar: factibilidad para una ONG.
- El ADR viejo no se borró: quedó como reemplazado. *(dice: «El A-D-R viejo no se borró: quedó como reemplazado.»)*
- Y midieron cuánto cuesta una historia: de una décima de centavo a dos centavos y medio, según el modelo. *(pausa 1 s)*
- Antes de escribir todo esto, el equipo ya había dibujado en detalle otra parte del sistema: la que conecta con miles de sistemas ajenos. Capítulo 5: miles de puertas. *(dice: «Antes de escribir todo esto, el equipo ya había dibujado en detalle otra parte del sistema: la que conecta con miles de sistemas ajenos. Capítulo cinco: miles de puertas.»)*


---

## Capítulo 5 · Miles de puertas

**Duración estimada:** 796 palabras habladas, 6:02 de voz a 2,2 palabras/s, más 14,0 s de pausas escritas: **6:16**. 8 escenas.

### Plan

**Ideas esenciales**

1. La escala supuesta: unos 100 sistemas de RR. HH., 100.000 empresas, hasta 200.000 configuraciones (A29–A31, Q16). Con tantos sistemas ajenos, fallar es lo normal.
2. No esperar: a lo externo se le envía de forma asíncrona (ADR-005, del primer día), y cada cambio de estado de un match se publica como evento (ADR-016).
3. Un servicio de integración con orquestador, un adaptador por sistema y un almacén de secretos. Los adaptadores nuevos los escribe el equipo de ClearView (por eso se descartó la configurabilidad).
4. Lo fallido espera en una dead-letter queue con backoff exponencial (ADR-023). Y la copia en memoria se rechaza por escrito (ADR-024): un ADR rechazado también enseña.

**Anclas en el repositorio**

- `Requirements/requirements-and-assumptions.md`: A29–A31, Q16 (`72923e5`); esqueleto ADR-023 con «around 10'000 employers» (`4923a1c`).
- `ADR/ADR-005-async-with-external-systems.md` (`246c55e`, 23/09).
- `ADR/ADR-016-matches-published-as-events.md`.
- `C4/C3-components-hr-integration.md` y su diagrama (`af4443a`, 28/09: el primer C3 del repositorio).
- `ADR/ADR-023-adapters-for-hr-systems.md` (título: «Dead-letter queue for HR systems») y `ADR/ADR-024-caching-of-resumes.md` (*Denied*).

**Al terminar, el espectador puede**

- Dimensionar una integración a partir de supuestos y sacar la conclusión correcta (diseñar para la falla).
- Explicar la diferencia entre comunicación sincrónica y asíncrona, y qué es una cola de eventos.
- Diseñar reintentos con una dead-letter queue y backoff exponencial.
- Escribir un ADR que rechaza una optimización y dice cuándo revisarla.

**Qué se deja afuera (y por qué)**

- El caso de empresas sin sistema de RR. HH. (R27: envío por correo o enlace de descarga).
- Los hilos concurrentes de los adaptadores y el detalle de la base documental de configuraciones.
- Billing como consumidor del mismo evento (se ve en pantalla, la voz lo nombra en una frase).

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (40 palabras, ~19 s) | Puente | Puente ~17 s | — | — | — | Sí | Bien |
| cuenta (129 palabras, ~60 s) | La escala supuesta (A29–A31); El cambio sin motivo (honestidad); Fallar es lo normal | La escala supuesta (A29–A31) ~27 s; El cambio sin motivo (honestidad) ~12 s; Fallar es lo normal ~22 s | Sí: los números antes de la conclusión | — | Sí: miles de sistemas ajenos fallan | Sí: la multiplicación queda armada | Bien |
| asincronia (77 palabras, ~36 s) | Sincrónico frente a asíncrono; El precio: reintentar | Sincrónico frente a asíncrono ~30 s; El precio: reintentar ~6 s | Sí: viene de «fallar es lo normal» | Sí, con analogía | Sí: un sistema caído no bloquea | Sí | Bien |
| eventos (106 palabras, ~49 s) | Evento publicado (ADR-016); Cola y tema; Desacople y su porqué | Evento publicado (ADR-016) ~15 s; Cola y tema ~19 s; Desacople y su porqué ~15 s | Sí: la pregunta concreta antes del mecanismo | Sí | Sí: si uno falla, los demás siguen | Sí: los tres oyentes quedan en pantalla | Bien |
| adaptadores (123 palabras, ~58 s) | Orquestador; Adaptador; Almacén de secretos; Adaptadores por versión (configurabilidad); Síntesis | Orquestador ~7 s; Adaptador ~12 s; Almacén de secretos ~8 s; Adaptadores por versión (configurabilidad) ~19 s; Síntesis ~7 s | Sí: el desbloqueo que llega por el tema | Sí: adaptador por lo que hace | Sí: secretos aparte; configurabilidad atada al capítulo 2 | Sí: el C3 se arma pieza por pieza | Bien (orquestador y secretos son detalle: una frase cada uno) |
| dlq (122 palabras, ~57 s) | Dead-letter queue; Backoff exponencial; Escalamiento de reintentos; Síntesis | Dead-letter queue ~20 s; Backoff exponencial ~18 s; Escalamiento de reintentos ~9 s; Síntesis ~6 s | Sí: la pregunta concreta antes del nombre | Sí, ambos; el ejemplo numérico se marca como ejemplo | Sí: no saturar un sistema caído | Sí: la línea de tiempo queda ~8 s | Bien |
| piensalo (121 palabras, ~60 s) | Aplicar: una optimización tentadora; El rechazo y sus razones; El valor de un ADR rechazado | Aplicar: una optimización tentadora ~17 s; El rechazo y sus razones ~36 s; El valor de un ADR rechazado ~7 s | Sí: después de ver los reintentos | Cache se explica por lo que hace (copia en memoria) | Sí: urgencia, costo de memoria e invalidación | Sí: el sello y las razones quedan ~12 s | Bien |
| outro (78 palabras, ~36 s) | Repaso; Avance | Repaso ~26 s; Avance ~11 s | — | — | — | Sí | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| Escala supuesta: fallar es lo normal | ~65 s | `cuenta`, `outro` |
| Sincrónico frente a asíncrono | ~36 s | `asincronia` |
| Evento publicado, cola y tema | ~56 s | `eventos`, `outro` |
| Adaptador por sistema | ~48 s | `adaptadores`, `outro` |
| Dead-letter queue y backoff exponencial | ~65 s | `dlq`, `outro` |
| Un ADR rechazado (cache) | ~60 s | `piensalo` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿De dónde salen 200.000?» Se muestra la multiplicación de los supuestos, y se dice honestamente que el repositorio no explica el salto de 10.000 a 100.000.
- «¿Sincrónico, asíncrono?» Con la analogía llamada / mensaje, que ya usa el curso.
- «¿Cola? ¿Tema? ¿Publicar?» Se definen como buzón entre programas, con quién escucha qué.
- «¿Adaptador?» Se define por lo que hace: traduce el idioma de un solo sistema ajeno.
- «¿Dead-letter queue? ¿Backoff exponencial?» Cada uno con su definición y un ejemplo numérico marcado como ejemplo.
- «¿Por qué no cachear?» Se da como piénsalo, y la respuesta trae las dos razones del ADR.

### Guion

#### `intro` · Capítulo 5 (~19 s)

> **Visual.** El recorrido del capítulo 1; zoom al último tramo: candado abierto → currículum que viaja a un sistema de RR. HH. El tramo se multiplica en muchas puertas de colores. Título.

- ¿Recuerdas el final del recorrido del capítulo 1? La empresa paga, y el currículum viaja a su sistema de recursos humanos. *(dice: «¿Recuerdas el final del recorrido del capítulo uno? La empresa paga, y el currículum viaja a su sistema de recursos humanos.»)*
- Parece un paso menor. Pero fue lo primero que el equipo dibujó en detalle. *(pausa 0.6 s)*
- Capítulo 5: miles de puertas. *(dice: «Capítulo cinco: miles de puertas.»)*

#### `cuenta` · La cuenta (~60 s)

> **Visual.** Los 11 logos de ejemplo del pliego. Después, tres supuestos que se multiplican: A29 «~100 sistemas», A30 «100.000 empresas», A31 «× 2 = hasta 200.000 configuraciones». Una nota tachada «10.000» (esqueleto del 26/09) reemplazada por «100.000» (29/09), con la etiqueta «sin motivo escrito». Al final, un tablero con luces: siempre hay alguna roja.

- El pliego nombra once sistemas de recursos humanos, y aclara que son ejemplos. El equipo supuso cuántos habría en la práctica.
- Supuesto A29: unos cien sistemas distintos. A30: unas 100.000 empresas de tecnología que podrían usar ClearView. *(dice: «Supuesto A veintinueve: unos cien sistemas distintos. A treinta: unas cien mil empresas de tecnología que podrían usar ClearView.»)*
- A31: si cada una tiene, en promedio, dos sistemas, son hasta 200.000 configuraciones. *(pausa 0.8 s; dice: «A treinta y uno: si cada una tiene, en promedio, dos sistemas, son hasta doscientas mil configuraciones.»)*
- Un detalle del historial: en la sesión del jueves, la nota decía diez mil empresas. Tres días después, cien mil. El repositorio no dice por qué.
- Pero cualquiera de las dos cifras lleva a la misma conclusión: con tantos sistemas ajenos, algo va a fallar todos los días. *(pausa 1 s)*
- No es un riesgo. Es lo normal. La pregunta deja de ser cómo evitar las fallas, y pasa a ser cómo vivir con ellas.

#### `asincronia` · No esperar (~36 s)

> **Visual.** ADR-005 con su fecha (23/09, el primer día). Dos escenas lado a lado: una llamada (teléfono, reloj de arena, pantalla congelada) y un mensaje (sobre en un buzón, la persona sigue con lo suyo). Debajo, la consecuencia escrita del ADR: «hace falta un mecanismo de reintento».

- La primera respuesta es del primer día, el ADR 005: a los sistemas externos se les envía de forma asíncrona. *(dice: «La primera respuesta es del primer día, el A-D-R cero cero cinco: a los sistemas externos se les envía de forma asíncrona.»)*
- Sincrónico es como una llamada: pides algo, y esperas en línea la respuesta. Asíncrono es como un mensaje: lo dejas, y sigues con lo tuyo.
- Si el sistema de una empresa está caído, ningún proceso de ClearView se queda trabado esperándolo. *(pausa 1 s)*
- El precio quedó escrito en el mismo ADR: hace falta un mecanismo para reintentar. *(dice: «El precio quedó escrito en el mismo A-D-R: hace falta un mecanismo para reintentar.»)*

#### `eventos` · El aviso (~49 s)

> **Visual.** Un match cambia de estado a «desbloqueado» y deja un mensaje en un buzón con el rótulo «tema de matches». Tres servicios lo escuchan: integración (recoge los desbloqueos), cobro (también), análisis (lee todo). El servicio que publica no tiene flechas hacia ellos. Uno de los oyentes se pone rojo; los otros siguen en verde.

- ¿Y cómo se entera el servicio de integración de que la empresa desbloqueó un match?
- ADR 016: cada cambio de estado de un match se publica como evento, en una cola. *(dice: «A-D-R cero uno seis: cada cambio de estado de un match se publica como evento, en una cola.»)*
- Una cola es un buzón entre programas: uno deja mensajes, y otros los retiran. Aquí es un topic, un tema de matches: varios servicios escuchan el mismo buzón.
- Integración escucha los desbloqueos. Cobro, también. Y el análisis de datos lo lee todo.
- Quien publica no sabe quién escucha. Si uno de ellos falla, los demás siguen. *(pausa 1 s)*
- ¿Recuerdas el estilo dirigido por eventos del capítulo 2, solo donde haga falta? Este es el lugar. *(dice: «¿Recuerdas el estilo dirigido por eventos del capítulo dos, solo donde haga falta? Este es el lugar.»)*

#### `adaptadores` · Una puerta por sistema (~58 s)

> **Visual.** El C3 de HR Integration redibujado, pieza por pieza: suscriptor al tema → orquestador → adaptadores (uno por sistema, con logos genéricos) → sistemas externos; abajo, una base de configuraciones y un almacén de secretos con una llave. Después, una empresa intenta agregar un sistema no soportado y aparece un candado: «lo agrega el equipo de ClearView, en una versión nueva». Al final, «100 adaptadores ≠ 200.000 programas».

- Adentro del servicio de integración, el diagrama muestra tres piezas.
- Un orquestador: recibe el desbloqueo, busca qué sistemas configuró esa empresa, y pide el currículum.
- Un adaptador por cada sistema de recursos humanos. Un adaptador traduce: habla el idioma de un solo sistema ajeno, para que el resto no tenga que hacerlo.
- Y un almacén de secretos para las credenciales de cada empresa, separado de los datos comunes. *(pausa 1 s)*
- Una regla: una empresa no puede agregar un sistema que no esté soportado. Cada adaptador nuevo lo escribe el equipo de ClearView, y llega en una versión nueva.
- ¿Recuerdas la configurabilidad que dejaron afuera en el capítulo 2? Esta es la razón. *(dice: «¿Recuerdas la configurabilidad que dejaron afuera en el capítulo dos? Esta es la razón.»)*
- Cien sistemas, cien adaptadores. Pero 200.000 configuraciones no son 200.000 programas. *(pausa 1 s; dice: «Cien sistemas, cien adaptadores. Pero doscientas mil configuraciones no son doscientos mil programas.»)*

#### `dlq` · La cola de los fallidos (~57 s)

> **Visual.** Un envío que falla cae a una cola aparte, rotulada «dead-letter queue». Un reloj procesa la cola periódicamente. Ejemplo (rotulado «ejemplo»): reintentos a 1, 2, 4 y 8 minutos, en una línea de tiempo que se estira. Un sistema caído todo el día recibe pocos intentos espaciados. Al final, el pedido sube a colas de reintento más espaciadas.

- Falta lo más importante: ¿qué pasa cuando un envío falla?
- ADR 023: el envío fallido va a una cola aparte, la dead-letter queue, o cola de mensajes muertos. *(dice: «A-D-R cero dos tres: el envío fallido va a una cola aparte, la dead-letter queue, o cola de mensajes muertos.»)*
- Es donde esperan los mensajes que no se pudieron entregar, en lugar de perderse. Cada cierto tiempo, se procesa, y se reintenta. *(pausa 0.8 s)*
- Pero no a ciegas: con backoff exponencial. Cada espera es más larga que la anterior. Por ejemplo, el doble: un minuto, dos, cuatro, ocho.
- Así, un sistema caído todo un día no recibe miles de intentos inútiles. *(pausa 1 s)*
- Y si sigue fallando, el pedido pasa a colas de reintento todavía más espaciadas, hasta que se deja de intentar.
- Una falla deja de ser una emergencia, y pasa a ser una espera.

#### `piensalo` · Piénsalo tú (~60 s)

> **Visual.** En cada reintento, una flecha vuelve a pedir el currículum al servicio de candidatos. Aparece la idea: una copia en memoria junto al orquestador. Anillo de 3 s. Después, el ADR-024 con el sello «Denied» y sus dos razones; al pie, la condición para revisarlo.

- Un detalle más. En cada reintento, el orquestador vuelve a pedirle el currículum al servicio de candidatos.
- Piénsalo tú: ¿guardarías una copia del currículum en memoria, para no pedirlo cada vez? *(pausa 3 s)*
- El equipo lo pensó, en el ADR 024, y dijo que no. *(dice: «El equipo lo pensó, en el A-D-R cero dos cuatro, y dijo que no.»)*
- Si el sistema de la empresa está caído, la entrega ya no es urgente: basta con reintentar más espaciado.
- Y una copia en memoria tiene costo: la memoria es cara, y hay que saber cuándo la copia quedó vieja. *(pausa 0.8 s)*
- Prefirieron la carga a la memoria. Y dejaron escrito cuándo revisarlo: si el servicio de candidatos se vuelve un cuello de botella. *(pausa 1 s)*
- Un ADR rechazado también sirve: evita que alguien proponga lo mismo sin conocer el motivo. *(dice: «Un A-D-R rechazado también sirve: evita que alguien proponga lo mismo sin conocer el motivo.»)*

#### `outro` · Para llevarte (~36 s)

> **Visual.** Cuatro tarjetas: el tablero con luces rojas; el buzón del tema de matches; el C3 con los adaptadores; la línea de reintentos espaciados. Avance: una historia y un puesto frente a frente, con un signo de pregunta entre ellos.

- Repasemos. Con hasta 200.000 configuraciones, las fallas son lo normal. *(dice: «Repasemos. Con hasta doscientas mil configuraciones, las fallas son lo normal.»)*
- A lo externo se le habla de forma asíncrona, y los matches se publican como eventos.
- Un adaptador por sistema, escrito por el equipo, y los secretos aparte.
- Lo fallido espera en una cola de mensajes muertos, con reintentos cada vez más espaciados. *(pausa 1 s)*
- Con las puertas resueltas, quedaba el corazón del producto: quién decide si una historia y un puesto encajan. Capítulo 6: dónde decide la IA. *(dice: «Con las puertas resueltas, quedaba el corazón del producto: quién decide si una historia y un puesto encajan. Capítulo seis: dónde decide la IA.»)*


---

## Capítulo 6 · Dónde decide la IA

**Duración estimada:** 938 palabras habladas, 7:06 de voz a 2,2 palabras/s, más 18,9 s de pausas escritas: **7:25**. 11 escenas.

### Plan

**Ideas esenciales**

1. Primera regla: las características se sacan de la historia, nunca del currículum (ADR-010), y lo hace cumplir un permiso, no una promesa.
2. Seis caminos para decidir un match (ADR-011), entendidos con dos piezas: características vectoriales (ilegibles) y características legibles (ejes definidos por especialistas).
3. El criterio que los separa: contar prompts. n + m frente a n × m. Solo A y B son lineales; con los números del capítulo 3, la diferencia es enorme (cuenta nuestra, declarada como tal).
4. La decisión B: la IA extrae características legibles una vez por historia y por puesto; el puntaje es una fórmula fija. Su precio: definir esas características, que quedó abierto. Contrapunto del podio.

**Anclas en el repositorio**

- `ADR/ADR-010-create-features-from-story-not-resumes.md` (esqueleto `4923a1c`, texto `72923e5`).
- `ADR/ADR-011-deterministic-matching.md`: dos versiones el 29/09 (`7f015e4` y `72923e5`), fusión `86c346e`; diagrama `ADR/images/ADR-011-matching-process.png` (`0f2599c`).
- Semillas: nota rosada del tablero (capítulo 1), «A9 y A10…» y «use as little AI as necessary» (`cad0b4f`), «complejidad cuadrática» en `Characteristics.md` (`c277932`).
- Glosario: *Features* (relacionadas con *embeddings*) y *Human-readable features* (definidas por profesionales de RR. HH.).
- Corrección del C3 de matching el 15/10 (`3641df8`). *Known limitations* del README.
- Podio: `Katamarans/ADR/ADR-011-matching-engine-solution.md`; `Ctrl-Alt-Elite/README.md` (Vector Database, re-ranker).

**Al terminar, el espectador puede**

- Comparar alternativas de diseño con IA contando llamadas al modelo en función del tamaño de los datos.
- Explicar la diferencia entre un vector de características y unas características legibles, y qué se gana con cada una.
- Separar en un diseño lo que hace la IA (traducir) de lo que decide una regla fija (puntuar).

**Qué se deja afuera (y por qué)**

- La notación O(n+m): se dice «n más m» y «n por m» sin notación.
- La opción F en detalle (características por puesto): una frase.
- Las definiciones del ADR (Resume, Story, Features, Spyder, Score) como lista: se usan en contexto.
- El nombre «Spyder» del equipo: se dice «gráfico de araña».

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (36 palabras, ~17 s) | Puente | Puente ~14 s | — | — | — | Sí | Bien |
| regla (107 palabras, ~51 s) | Características desde la historia (ADR-010); Hacerlo cumplir con permisos | Características desde la historia (ADR-010) ~30 s; Hacerlo cumplir con permisos ~21 s | Sí: el riesgo del sesgo antes de la regla | — | Sí: A8, los modelos traen sesgos | Sí | Bien |
| piezas (78 palabras, ~37 s) | Características vectoriales; Características legibles | Características vectoriales ~16 s; Características legibles ~16 s | Sí: la nota «¿legible por humanos?» ya planteó la tensión | Sí, ambas, con quién puede leerlas | Sí: legible = revisable | Sí: las dos imágenes quedan lado a lado | Bien |
| caminos (106 palabras, ~49 s) | A y B (cálculo fijo); C (descartada por la regla); D, E y F (la IA juzga) | A y B (cálculo fijo) ~11 s; C (descartada por la regla) ~11 s; D, E y F (la IA juzga) ~23 s | Sí: las piezas y la regla ya están dadas | — | C sí; el resto se resuelve con el criterio de la escena siguiente | Sí: el diagrama real queda fijo y se ilumina por filas | Aceptable: seis opciones en ~37 s; se compensa porque el criterio y el piénsalo las vuelven a recorrer (~75 s más) |
| contar (103 palabras, ~49 s) | Q14 como criterio; Contar prompts: n + m frente a n × m | Q14 como criterio ~11 s; Contar prompts: n + m frente a n × m ~37 s | Sí: el ejemplo chico antes de la generalización | Sí: n y m | Sí: los prompts se pagan (capítulo 4) | Sí: la grilla crece al ritmo de la voz | Bien |
| piensalo (23 palabras, ~13 s) | Aplicar los dos criterios a las seis opciones | Aplicar los dos criterios a las seis opciones ~13 s | Sí: después de las piezas, las opciones y el criterio | — | — | Sí: el diagrama sigue visible | Bien |
| decision (113 palabras, ~54 s) | Lineales frente a cuadráticas; Legible frente a vectorial; Matching determinista | Lineales frente a cuadráticas ~17 s; Legible frente a vectorial ~12 s; Matching determinista ~24 s | Sí: la respuesta del piénsalo, paso a paso | Sí: matching determinista | Sí: costo lineal y resultado revisable (ADR-011) | Sí: la animación final se repite y queda | Bien |
| numeros (133 palabras, ~63 s) | La cuenta con A17 (declarada como propia); El límite: prefiltrado; Q15: cambiar de modelo | La cuenta con A17 (declarada como propia) ~41 s; El límite: prefiltrado ~11 s; Q15: cambiar de modelo ~11 s | Sí: números del curso, ya vistos | — | Sí: el costo de la diferencia; y su límite según el ADR | Sí: el rótulo «cuenta nuestra» está siempre visible | Bien |
| precio (67 palabras, ~31 s) | El costo de B y el hueco del repositorio; La corrección tardía | El costo de B y el hueco del repositorio ~20 s; La corrección tardía ~12 s | — | — | Sí: lo admite el equipo | Sí | Bien |
| podio (96 palabras, ~45 s) | Contrapunto: Katamarans; Contrapunto: Ctrl+Alt+Elite; Síntesis | Contrapunto: Katamarans ~11 s; Contrapunto: Ctrl+Alt+Elite ~13 s; Síntesis ~16 s | Sí: la misma pregunta del capítulo | Base vectorial definida por lo que hace | Sí: explicar, probar y presupuestar (el top 3) | Sí: tres columnas fijas | Bien (único uso del podio en el curso) |
| outro (76 palabras, ~36 s) | Repaso; Avance | Repaso ~26 s; Avance ~9 s | — | — | — | Sí | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| Características desde la historia, con permisos (ADR-010) | ~57 s | `regla`, `outro` |
| Vectorial frente a legible | ~50 s | `piezas`, `decision` |
| Los seis caminos | ~80 s | `caminos`, `piensalo`, `decision` |
| Contar prompts: n + m frente a n × m | ~103 s | `contar`, `decision`, `numeros`, `outro` |
| Matching determinista (opción B) | ~32 s | `decision`, `outro` |
| El precio de B | ~37 s | `precio`, `outro` |
| Contrapunto del podio | ~45 s | `podio` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Por qué la IA no puede ver el currículum, si va a anonimizarlo?» Se responde con A8: los modelos traen sesgos; solo el servicio de historia trata el currículum (capítulo 7).
- «¿Qué es un vector? ¿Y características legibles?» Dos líneas propias antes de las opciones, cada una con quién puede leerla.
- «¿Seis opciones de golpe?» Se agrupan: C cae por la regla; el resto se separa con dos preguntas (cuántos prompts, quién entiende el resultado). En pantalla, el diagrama real queda fijo.
- «¿n y m?» Se define con historias y puestos, y se ata a la palabra «cuadrática» del capítulo 2.
- «¿De dónde salen 600 millones?» Se dice que es una cuenta nuestra con su supuesto A17, y se da el límite que el propio ADR anota (prefiltrado).
- «¿Entonces la IA no decide nada?» Se dice exactamente: traduce texto a números revisables; la fórmula decide.

### Guion

#### `intro` · Capítulo 6 (~17 s)

> **Visual.** Tres recortes del pasado que se juntan: la nota rosada «Human readable?» (capítulo 1), la palabra «cuadrática» (capítulo 2) y la nota «usar la menor IA posible» (capítulo 3). Fecha: domingo 29/09. Título.

- ¿Recuerdas la nota rosada del capítulo 1: la historia, ¿es legible por humanos? ¿Y la del capítulo 3: usar la menor IA posible? *(dice: «¿Recuerdas la nota rosada del capítulo uno: la historia, ¿es legible por humanos? ¿Y la del capítulo tres: usar la menor IA posible?»)*
- El domingo 29, las dos se encontraron. *(pausa 0.6 s; dice: «El domingo veintinueve, las dos se encontraron.»)*
- Capítulo 6: dónde decide la IA. *(dice: «Capítulo seis: dónde decide la IA.»)*

#### `regla` · Primera regla (~51 s)

> **Visual.** Un currículum y una historia. Una flecha del currículum hacia «matching» se tacha. Un LLM con una mochila rotulada «sesgos del texto de entrenamiento». Después, dos servicios con candado: el currículum vive en «candidatos»; «matching» intenta leerlo y un permiso lo bloquea.

- Antes de elegir cómo comparar, el equipo fijó qué se compara. ADR 010: las características se sacan de la historia, nunca del currículum. *(dice: «Antes de elegir cómo comparar, el equipo fijó qué se compara. A-D-R cero uno cero: las características se sacan de la historia, nunca del currículum.»)*
- La razón está en sus supuestos: los modelos de lenguaje traen sesgos de los textos con que se entrenaron. Justo los que ClearView quiere eliminar.
- Si el modelo ve datos personales, puede usarlos, aunque nadie se lo pida. *(pausa 1 s)*
- Y no lo dejaron como una buena intención: el currículum vive solo en el servicio de candidatos, y el de matching no tiene permiso para leerlo.
- Una regla que la arquitectura hace cumplir vale más que una que depende de la memoria de alguien. *(pausa 1 s)*

#### `piezas` · Dos piezas (~37 s)

> **Visual.** Una historia entra a una IA y sale una tira larga de números (vector), con una persona confundida al lado. Después, la misma historia sale como un gráfico de araña con pocos ejes rotulados genéricamente («eje 1…eje 5») y una persona que asiente; rótulo «ejes definidos por especialistas de RR. HH.». Los dos quedan lado a lado: «vectorial / legible».

- Para entender los caminos que el equipo dibujó, hacen falta dos piezas.
- La primera: características vectoriales. Una IA convierte un texto en una lista larga de números, un vector, que sirve para medir parecidos.
- Para la máquina funciona muy bien. Pero ninguna persona puede leerlo. *(pausa 0.8 s)*
- La segunda: características legibles. Unos pocos ejes, definidos por especialistas en recursos humanos, con un valor en cada uno.
- Se dibujan como un gráfico de araña, y una persona entiende qué está mirando. *(pausa 1 s)*

#### `caminos` · Seis caminos (~49 s)

> **Visual.** El diagrama real de ADR-011 redibujado, fila por fila, A a F. Cada fila se ilumina cuando la voz la nombra: A (vectores + cálculo fijo), B (legibles + cálculo fijo), C (currículum y puesto directo a la IA, tachado), D (historia y puesto a la IA), E (legibles, pero puntúa la IA), F (características por puesto). Las filas que puntúa la IA llevan un ícono de IA en el centro; las de cálculo fijo, un ícono de fórmula.

- Con esas dos piezas, el equipo dibujó seis caminos.
- En A, la IA saca vectores de la historia y del puesto, y una cuenta fija los compara. B es igual, pero con características legibles.
- En C, la IA lee el currículum y el puesto, y pone el puntaje. Cayó enseguida: rompe la regla del ADR 010. *(dice: «En C, la IA lee el currículum y el puesto, y pone el puntaje. Cayó enseguida: rompe la regla del A-D-R cero uno cero.»)*
- En D, la IA lee la historia y el puesto, y decide si encajan.
- En E, saca características legibles, pero el puntaje lo pone otra vez la IA.
- Y en F, cada puesto elige sus propias características, y la IA evalúa cada historia según las de ese puesto. *(pausa 1 s)*

#### `contar` · Contar prompts (~49 s)

> **Visual.** Q14 en una tarjeta. Después, n historias en una columna y m puestos en otra. Modo «una vez por elemento»: un rayo de IA por cada historia y cada puesto (n + m). Modo «una vez por par»: una grilla n × m que se llena de rayos. Primero con 3 y 3 (6 frente a 9), después con números grandes, donde la grilla desborda la pantalla. Rótulo: «cuadrática» (la palabra del capítulo 2).

- Para elegir, el equipo usó dos criterios. El primero ya lo conoces: Q14, poder probar que un cambio de modelo no empeora los matches. *(dice: «Para elegir, el equipo usó dos criterios. El primero ya lo conoces: cu catorce, poder probar que un cambio de modelo no empeora los matches.»)*
- El segundo es nuevo: contar cuántos prompts exige cada camino.
- Imagina n historias y m puestos. Si la IA trabaja una vez sobre cada historia y una vez sobre cada puesto, son n más m prompts.
- Si tiene que mirar cada par, historia contra puesto, son n por m. *(pausa 1 s)*
- Con tres historias y tres puestos casi da igual: seis prompts contra nueve. Con miles, ya no.
- ¿Recuerdas la palabra del capítulo 2, cuadrática? Es esta: n por m. *(pausa 1 s; dice: «¿Recuerdas la palabra del capítulo dos, cuadrática? Es esta: n por m.»)*

#### `piensalo` · Piénsalo tú (~13 s)

> **Visual.** El diagrama de los seis caminos, a la izquierda; a la derecha, dos preguntas: «¿n + m prompts?» y «¿una persona entiende por qué hubo match?». Anillo de 3 s.

- Piénsalo tú. De los seis caminos, ¿cuáles cuestan n más m prompts? ¿Y cuál deja que una persona entienda por qué hubo match? *(pausa 3 s)*

#### `decision` · La opción B (~54 s)

> **Visual.** Las filas A y B quedan iluminadas con «n + m»; D, E y F se oscurecen con «n × m». Entre A y B, una lupa: los vectores de A ilegibles, el gráfico de araña de B legible. B se marca. Animación final: historia → (IA) → gráfico de araña; puesto → (IA) → gráfico de araña; los dos entran a una fórmula fija que da un número; se repite y da el mismo número.

- Solo A y B son lineales: la IA trabaja una vez por historia y una vez por puesto, y el puntaje es una cuenta fija.
- En D, E y F, en cambio, la IA trabaja sobre cada par.
- Entre A y B, la diferencia es quién puede leer el resultado. Los vectores de A no los entiende nadie. Las características de B, sí. *(pausa 1 s)*
- El equipo eligió B. La IA extrae características legibles de cada historia y de cada puesto. Y el puntaje lo calcula una fórmula, siempre igual.
- Misma historia, mismo puesto, mismo puntaje. Eso quiere decir matching determinista. *(pausa 1.5 s)*
- La IA solo traduce texto a números que una persona puede revisar. No decide.

#### `numeros` · La cuenta (~63 s)

> **Visual.** Rótulo visible todo el tiempo: «cuenta nuestra, con el supuesto A17 del equipo». Dos barras: 50.000 prompts (B) y más de 600 millones (un juicio por par), con la segunda fuera de escala. Debajo, a una décima de centavo: 50 USD frente a más de 600.000 USD. Después, un filtro que la candidata ajusta: la grilla se achica. Al final, Q15: cambiar de modelo re-extrae cada historia y cada puesto una vez.

- El ADR da la regla, pero no hace la cuenta. Hagámosla con su supuesto del capítulo 3: 25.000 puestos, y unos 25.000 candidatos. *(dice: «El A-D-R da la regla, pero no hace la cuenta. Hagámosla con su supuesto del capítulo tres: veinticinco mil puestos, y unos veinticinco mil candidatos.»)*
- Con B: 25.000 más 25.000, unos 50.000 prompts. *(dice: «Con B: veinticinco mil más veinticinco mil, unos cincuenta mil prompts.»)*
- Con un juicio por par: 25.000 por 25.000, más de 600 millones. *(pausa 1 s; dice: «Con un juicio por par: veinticinco mil por veinticinco mil, más de seiscientos millones.»)*
- Aunque cada prompt costara una décima de centavo, el precio más bajo que midieron, serían 50 dólares contra más de 600.000. *(pausa 1 s; dice: «Aunque cada prompt costara una décima de centavo, el precio más bajo que midieron, serían cincuenta dólares contra más de seiscientos mil.»)*
- Es nuestra cuenta, no la del equipo. Pero muestra por qué contaron prompts.
- El mismo ADR anota un límite: si la candidata filtra antes a qué puestos se postula, los pares bajan mucho, y la diferencia se achica. *(dice: «El mismo A-D-R anota un límite: si la candidata filtra antes a qué puestos se postula, los pares bajan mucho, y la diferencia se achica.»)*
- Y cuando cambia el modelo, como pide Q15, B vuelve a extraer cada historia y cada puesto una vez. No cada par. *(pausa 1 s; dice: «Y cuando cambia el modelo, como pide cu quince, B vuelve a extraer cada historia y cada puesto una vez. No cada par.»)*

#### `precio` · El precio de B (~31 s)

> **Visual.** El gráfico de araña con los ejes en blanco y un signo de pregunta: «¿qué ejes?». El renglón de *Known limitations* sobre las características. Una línea de tiempo: 29/09 ADR-011; el C3 de matching dice «califica con IA» hasta el 15/10, cuando se corrige.

- B tiene su precio, y el equipo lo dejó escrito entre sus limitaciones: definir bien esas características, para cualquier historia y cualquier puesto, es difícil.
- El repositorio no dice qué ejes tendría el gráfico. Es el hueco más grande del diseño. *(pausa 1 s)*
- Y la idea era tan nueva que un diagrama siguió diciendo que la IA calificaba los matches dos semanas más. Lo corrigieron antes de la final.

#### `podio` · El podio (~45 s)

> **Visual.** Tres columnas: 1.º Pragmatic (IA → características legibles → fórmula), 2.º Katamarans (palabras clave con pesos → comparación, sin LLM), 3.º Ctrl+Alt+Elite (base vectorial + grafo → LLM que reordena). Una línea horizontal separa «el modelo fuera del puntaje» (1.º y 2.º) de «el modelo en el centro» (3.º).

- ¿Cómo respondieron la misma pregunta los otros dos equipos del podio?
- Katamarans, segundo puesto, tampoco dejó que un LLM pusiera el puntaje: separa currículum y puesto en palabras clave, con un peso cada una, y compara. *(dice: «Katamarans, segundo puesto, tampoco dejó que un L-L-M pusiera el puntaje: separa currículum y puesto en palabras clave, con un peso cada una, y compara.»)*
- Ctrl+Alt+Elite, tercer puesto, hizo lo contrario: una base de datos que guarda vectores y busca los más parecidos, y después un LLM que reordena los resultados. *(dice: «Control Alt Elite, tercer puesto, hizo lo contrario: una base de datos que guarda vectores y busca los más parecidos, y después un L-L-M que reordena los resultados.»)*
- El primero y el segundo sacaron al modelo del puntaje. El tercero lo puso en el centro. *(pausa 1 s)*
- Ninguna es correcta por definición. Pero la de Pragmatic se puede explicar, probar y presupuestar.

#### `outro` · Para llevarte (~36 s)

> **Visual.** Cuatro tarjetas: el candado del currículum; «n + m frente a n × m»; la animación historia → araña → fórmula; el gráfico de araña con ejes en blanco. Avance: tres flechas de IA antes de la fórmula, cada una con un signo de pregunta.

- Repasemos. La IA nunca ve el currículum: lo impide un permiso, no una promesa.
- Para comparar caminos, se cuentan prompts: n más m crece tranquilo, n por m se dispara.
- Pragmatic eligió que la IA extraiga características legibles, y que el puntaje sea una cuenta fija.
- Su precio: definir esas características, que quedó como problema abierto. *(pausa 1 s)*
- La fórmula fija se puede probar como cualquier código. Pero la IA que extrae, no. Capítulo 7: probar lo impredecible. *(dice: «La fórmula fija se puede probar como cualquier código. Pero la IA que extrae, no. Capítulo siete: probar lo impredecible.»)*


---

## Capítulo 7 · Probar lo impredecible

**Duración estimada:** 843 palabras habladas, 6:23 de voz a 2,2 palabras/s, más 17,0 s de pausas escritas: **6:40**. 9 escenas.

### Plan

**Ideas esenciales**

1. El camino de un currículum (caso de uso): todo lo que llama a un LLM va en segundo plano, porque puede tardar un minuto (ADR-008). El precio: los matches no son en tiempo real.
2. La historia vive en su propio servicio (ADR-009): candidatos no necesita la historia, matching no necesita el currículum; ninguno tiene las dos cosas.
3. Probar lo no determinista (ADR-025): conjuntos de prueba grandes con respuestas esperadas, y pruebas por tramos, posibles gracias al punto intermedio legible de ADR-011.
4. Lo que no se automatiza: la anonimización la verifican personas u otro LLM; y probar también gasta prompts. El resto del sistema se prueba sin el proveedor, con dobles detrás de los adaptadores de IA; y cambiar de modelo se vuelve un procedimiento (Q14 → Q15 → recalcular).

**Anclas en el repositorio**

- `UseCases/use-case-upload-a-resume.md` y sus diagramas de secuencia (`72df315`, `06b6cfc`, 30/09).
- `ADR/ADR-008-ui-reactivity.md`; R30 «soportar demoras de 60 s»; *Known limitations* («Delayed Matching Process»).
- `ADR/ADR-009-creation-of-story-as-own-microservice.md`.
- `ADR/ADR-025-ai-test-concept.md` (`9a3c22b`, 30/09 12:24: la última decisión nueva antes de la entrega).
- `ADR/ADR-011-deterministic-matching.md`: «la representación intermedia permite pruebas más chicas y precisas».
- `ArchitectureCharacteristics/Characteristics.md` → *Testability*: pruebas de regresión sin depender de terceros; ADR-006 (*Superseded*): «mock AI centrally»; adaptadores de IA en `C4/C3-components-*.md`.

**Al terminar, el espectador puede**

- Identificar qué pasos de un flujo deben ir en segundo plano y qué se paga por eso.
- Diseñar un concepto de pruebas para componentes con IA: conjuntos con respuesta esperada y alcances por tramo.
- Reconocer qué propiedades no se pueden verificar con una igualdad y cómo se cubren.
- Aislar un proveedor externo en las pruebas con un adaptador y un doble.

**Qué se deja afuera (y por qué)**

- El autocompletado de datos de la empresa por IA (R9) como tramo de prueba: aparece en pantalla.
- Las características fortalecidas y debilitadas de ADR-008 y ADR-009.
- La notificación por correo de los consejos listos (extensión posible del caso de uso).
- La contradicción del C3 de historia que cita ADR-006 (en `HISTORIA.md` §6).

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (41 palabras, ~19 s) | Puente | Puente ~17 s | — | — | — | Sí | Bien |
| camino (119 palabras, ~56 s) | Lo lento en segundo plano (ADR-008); Historia y matching asíncronos; El precio | Lo lento en segundo plano (ADR-008) ~29 s; Historia y matching asíncronos ~14 s; El precio ~6 s | Sí: el caso de uso antes de la regla | Segundo plano, por su efecto | Sí: los 60 s del capítulo 3 | Sí: el diagrama avanza paso a paso | Bien |
| muro (89 palabras, ~41 s) | Servicio de historia propio (ADR-009); El costo | Servicio de historia propio (ADR-009) ~37 s; El costo ~5 s | Sí: las tres ubicaciones antes de la elección | Acoplado, por su efecto | Sí: quién necesita qué dato (texto del ADR) | Sí | Bien |
| problema (65 palabras, ~31 s) | Probar algo no determinista | Probar algo no determinista ~31 s | Sí: la prueba clásica antes del problema | Determinismo ya definido | Sí: Q14 (capítulo 3) | Sí | Bien |
| conjuntos (132 palabras, ~63 s) | Conjunto de prueba; Pruebas por tramos; Por qué funciona: el punto intermedio | Conjunto de prueba ~20 s; Pruebas por tramos ~14 s; Por qué funciona: el punto intermedio ~25 s | Sí: el problema de la escena anterior | Sí: conjunto de prueba | Sí: la representación intermedia (ADR-011) | Sí: la tabla y la cadena quedan armadas | Bien |
| doble (131 palabras, ~61 s) | Prueba de regresión; Adaptadores de IA y dobles de prueba; Síntesis | Prueba de regresión ~21 s; Adaptadores de IA y dobles de prueba ~34 s; Síntesis ~6 s | Sí: el pedido escrito del equipo antes de la técnica | Sí: regresión y doble | Sí: sin pagar prompts ni depender del proveedor | Sí: la sustitución se anima y queda | Bien (el doble es la técnica general; el repositorio lo anota como «mock AI centrally» en ADR-006 y exige la independencia en `Characteristics.md`) |
| piensalo (81 palabras, ~42 s) | Aplicar: qué no se prueba con igualdad; El costo de probar | Aplicar: qué no se prueba con igualdad ~26 s; El costo de probar ~16 s | Sí: después de los tramos | — | Sí: texto del ADR-025 | Sí | Bien |
| cambio (107 palabras, ~51 s) | El procedimiento de cambio de modelo (Q14, Q15, ADR-025, ADR-011); Síntesis | El procedimiento de cambio de modelo (Q14, Q15, ADR-025, ADR-011) ~42 s; Síntesis ~8 s | Sí: el retiro de modelos del capítulo 3 como caso | — | Sí: cada paso con su requisito | Sí: tres pasos numerados fijos | Bien (se declara que el procedimiento lo arma el curso con piezas del repositorio) |
| outro (78 palabras, ~36 s) | Repaso; Avance | Repaso ~27 s; Avance ~9 s | — | — | — | Sí | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| Lo lento en segundo plano (ADR-008) | ~61 s | `camino`, `outro` |
| Servicio propio para la historia (ADR-009) | ~46 s | `muro`, `outro` |
| Probar lo no determinista: conjuntos y tramos (ADR-025) | ~105 s | `problema`, `conjuntos`, `outro` |
| Regresión sin el proveedor: adaptadores y dobles | ~61 s | `doble` |
| Lo que no se automatiza y el costo de probar | ~48 s | `piensalo`, `outro` |
| Cambiar de modelo como procedimiento | ~51 s | `cambio` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Por qué la subida «termina» antes de los consejos?» Se ata a los 60 s del capítulo 3.
- «¿Por qué un servicio más, si cuesta?» Se explica con quién necesita qué dato, y se dice el costo.
- «¿Conjunto de prueba?» Se define con su forma: entrada más respuesta esperada.
- «¿Por qué por tramos?» Se responde con el ejemplo de un match que sale mal y dónde buscar.
- «¿Qué no se puede probar así?» Es el piénsalo; la respuesta viene del ADR.
- «¿Prueba de regresión? ¿Doble?» Cada uno con su línea, después del pedido del equipo que los vuelve necesarios.
- «¿Esto lo escribió el equipo?» En `cambio` se dice explícitamente que el procedimiento lo arma el curso con piezas del repositorio.

### Guion

#### `intro` · Capítulo 7 (~19 s)

> **Visual.** La fórmula fija del capítulo 6 con un tilde verde («se prueba como código»). Delante, tres pasos con IA con signos de pregunta: currículum → historia, historia → características, puesto → características. Fecha: lunes 30/09, día de la entrega. Título.

- En el capítulo 6, el puntaje quedó como una cuenta fija. Pero antes de esa cuenta hay pasos con IA, y ninguno es determinista. *(dice: «En el capítulo seis, el puntaje quedó como una cuenta fija. Pero antes de esa cuenta hay pasos con IA, y ninguno es determinista.»)*
- El lunes 30, día de la entrega, el equipo escribió cómo probarlos. *(pausa 0.6 s; dice: «El lunes treinta, día de la entrega, el equipo escribió cómo probarlos.»)*
- Capítulo 7: probar lo impredecible. *(dice: «Capítulo siete: probar lo impredecible.»)*

#### `camino` · El camino de un currículum (~56 s)

> **Visual.** El diagrama de secuencia real del caso de uso, redibujado simple. 1) La candidata sube el currículum; se guarda; se dispara el pedido de consejos; la subida termina (tilde). 2) En segundo plano, el pedido va al LLM; un reloj de hasta 60 s; los consejos vuelven y se guardan. 3) La candidata vuelve y los ve. 4) Envía el currículum; la historia se crea en segundo plano. 5) Un reloj periódico: matching extrae características y calcula puntajes. Al final, la limitación «los matches no son en tiempo real».

- Sigue un currículum por el sistema, con el caso de uso que dibujó el equipo.
- La candidata lo sube. Se guarda, y se le pide a la IA una lista de consejos para mejorarlo.
- Y aquí está el detalle: la subida termina ahí. Los consejos llegan después, en segundo plano.
- ¿Recuerdas los 60 segundos que puede tardar un LLM? Nadie mira una pantalla congelada durante un minuto. *(pausa 0.8 s; dice: «¿Recuerdas los sesenta segundos que puede tardar un L-L-M? Nadie mira una pantalla congelada durante un minuto.»)*
- Cuando la candidata vuelve a la página, los consejos ya están.
- Después, envía el currículum. Su historia se crea también en segundo plano.
- Y cada cierto tiempo, el servicio de matching extrae características de lo nuevo, y calcula puntajes. *(pausa 1 s)*
- El precio quedó entre las limitaciones: los matches no aparecen en el momento.

#### `muro` · Un servicio para la historia (~41 s)

> **Visual.** Tres cajas candidatas: «candidatos», «matching», «servicio propio». En cada una, qué datos tendría: si la historia vive en candidatos, esa caja tiene currículum + historia; si vive en matching, matching tendría que recibir el currículum. La tercera opción deja cada dato en su caja. Al final, la etiqueta de costo: «un servicio más».

- ¿Y dónde se crea la historia? Había tres lugares posibles: en el servicio de candidatos, en el de matching, o en uno propio.
- Eligieron uno propio, en el ADR 009. *(dice: «Eligieron uno propio, en el A-D-R cero cero nueve.»)*
- El servicio de candidatos no necesita la historia. El de matching no necesita el currículum. Si la historia viviera en uno de ellos, ese servicio quedaría acoplado a los dos modelos.
- Un servicio aparte deja cada dato donde se usa, y refuerza la regla del capítulo 6. *(pausa 1 s; dice: «Un servicio aparte deja cada dato donde se usa, y refuerza la regla del capítulo seis.»)*
- El costo, anotado: un servicio más que construir y mantener.

#### `problema` · El problema de probar (~31 s)

> **Visual.** Una prueba clásica: «2 + 2 → espero 4 → ✓». Después, un LLM: la misma entrada da dos textos distintos. Un cambio de modelo (etiqueta «versión nueva») y los matches se mueven sin que nadie lo vea. La casilla de testabilidad del top 3 se ilumina.

- Ahora, el problema de fondo. Una prueba normal compara la salida con un valor esperado: si sumas dos más dos, esperas cuatro.
- Con un LLM, la misma entrada puede dar textos distintos. Y cada modelo nuevo, o cada prompt nuevo, puede cambiarlo todo. *(dice: «Con un L-L-M, la misma entrada puede dar textos distintos. Y cada modelo nuevo, o cada prompt nuevo, puede cambiarlo todo.»)*
- Si un cambio de modelo empeora los matches, nadie lo notaría a tiempo. *(pausa 1 s)*
- Por eso la testabilidad estaba en el top 3. *(dice: «Por eso la testabilidad estaba en el top tres.»)*

#### `conjuntos` · Conjuntos y tramos (~63 s)

> **Visual.** Una tabla que se llena: columna «entrada», columna «respuesta esperada». Filas: currículum → historia esperada y características esperadas; puesto → características esperadas; pares → matches esperados. Después, la cadena currículum → historia → características → fórmula → match, con cada tramo encerrado en su propio recuadro de prueba. Un match sale mal: una lupa recorre los tramos y se detiene en uno.

- El ADR 025 responde con dos ideas. *(dice: «El A-D-R cero dos cinco responde con dos ideas.»)*
- La primera: conjuntos de prueba grandes, armados con cuidado, con los casos importantes del negocio.
- Un conjunto de prueba es una colección de entradas, cada una con su respuesta esperada: currículums con su historia esperada, puestos con sus características esperadas, y matches esperados. *(pausa 0.8 s)*
- La segunda: probar por tramos. De currículum a historia, con foco en la anonimización. De historia a características. De puesto a características.
- Cada tramo se prueba por separado. *(pausa 1 s)*
- ¿Por qué funciona? Por la decisión del capítulo 6. Las características legibles son un punto intermedio que se puede revisar. *(dice: «¿Por qué funciona? Por la decisión del capítulo seis. Las características legibles son un punto intermedio que se puede revisar.»)*
- Si un match sale mal, sabes en qué tramo se rompió: en la historia, en las características, o en la fórmula.
- Y la fórmula, que es fija, se prueba como cualquier código. *(pausa 1 s)*

#### `doble` · Probar sin el proveedor (~61 s)

> **Visual.** La frase de `Characteristics.md` resaltada: «las pruebas de regresión deben poder correr sin depender de sistemas de terceros». Los tres C3 en miniatura con sus adaptadores de IA iluminados (consejos, anonimizar, extraer características), al lado de los adaptadores de RR. HH. del capítulo 5. En modo prueba, cada adaptador de IA se reemplaza por una pieza gris rotulada «doble», que devuelve siempre la misma respuesta. Un contador de prompts queda en cero.

- Hay un tercer pedido, que el equipo escribió entre sus razones para la testabilidad: las pruebas de regresión tienen que correr aunque los sistemas de terceros no funcionen.
- Una prueba de regresión verifica que lo que ya funcionaba siga funcionando después de un cambio. *(pausa 0.8 s)*
- Mira los diagramas de componentes: cada llamada a un LLM pasa por un adaptador, como las puertas del capítulo 5. Uno para los consejos, uno para anonimizar, uno para extraer características. *(dice: «Mira los diagramas de componentes: cada llamada a un L-L-M pasa por un adaptador, como las puertas del capítulo cinco. Uno para los consejos, uno para anonimizar, uno para extraer características.»)*
- En una prueba, ese adaptador se puede reemplazar por un doble: una pieza falsa que responde siempre lo mismo, sin llamar a nadie.
- Así se prueba el resto del sistema sin gastar prompts, y sin depender de que el proveedor esté disponible. *(pausa 1 s)*
- La IA real se prueba aparte, con los conjuntos. Todo lo demás, con dobles.

#### `piensalo` · Piénsalo tú (~42 s)

> **Visual.** La cadena de tramos con sus recuadros. Anillo de 3 s. Después, el tramo «currículum → historia» se pone ámbar: «¿no revela raza, género, salud?» no es una igualdad. Dos verificadores: una persona y un segundo LLM (con la etiqueta «más complejidad»). Al final, un contador de prompts que sube en cada corrida de pruebas.

- Piénsalo tú: de todos esos tramos, ¿cuál no se puede verificar comparando con una respuesta esperada? *(pausa 3 s)*
- La anonimización. Que una historia no revele raza, género o salud no se comprueba con una igualdad.
- El ADR lo admite: solo lo pueden verificar personas, o un segundo LLM, que agrega complejidad. *(pausa 1 s; dice: «El A-D-R lo admite: solo lo pueden verificar personas, o un segundo L-L-M, que agrega complejidad.»)*
- Y anotaron otro costo: probar también gasta prompts. Cada corrida de pruebas se paga.
- ¿Recuerdas al experto? Cada cambio de prompt o de modelo obliga a correr todo el conjunto otra vez. *(pausa 1 s)*

#### `cambio` · El día que cambia el modelo (~51 s)

> **Visual.** Un aviso del proveedor: «modelo retirado». Tres pasos numerados que se encienden: 1) el modelo nuevo corre los conjuntos, tramo por tramo, contra las respuestas esperadas (etiqueta Q14); 2) re-extraer características de todas las historias y todos los puestos, una vez cada uno (etiqueta Q15, contador n + m); 3) la fórmula recalcula los puntajes (etiqueta «sin IA, gratis»). Rótulo al pie: «piezas del equipo, procedimiento armado por el curso».

- Juntemos las piezas. ¿Qué pasa el día que el proveedor retira el modelo?
- El repositorio no lo escribe como un procedimiento único, pero las piezas están.
- Primero, el modelo nuevo corre los conjuntos de prueba, tramo por tramo, contra las respuestas esperadas. Es Q14: que no empeore. *(dice: «Primero, el modelo nuevo corre los conjuntos de prueba, tramo por tramo, contra las respuestas esperadas. Es cu catorce: que no empeore.»)*
- Si pasa, se vuelven a extraer las características de todas las historias y todos los puestos, una vez cada uno. Es Q15: todos medidos con el mismo modelo. *(dice: «Si pasa, se vuelven a extraer las características de todas las historias y todos los puestos, una vez cada uno. Es cu quince: todos medidos con el mismo modelo.»)*
- Y la fórmula recalcula los puntajes. Esa parte no usa IA: no cuesta prompts. *(pausa 1 s)*
- Cambiar de modelo deja de ser un salto al vacío, y pasa a ser un procedimiento. *(pausa 1 s)*

#### `outro` · Para llevarte (~36 s)

> **Visual.** Cuatro tarjetas: el reloj en segundo plano; tres cajas con cada dato en la suya; la tabla entrada / esperado con los tramos y el doble gris; la persona que revisa la anonimización. Avance: una alcancía y la frase del README del capítulo 4.

- Repasemos. Lo lento va en segundo plano: consejos, historias y matches.
- La historia vive en su propio servicio, lejos del currículum.
- La IA se prueba con conjuntos grandes y por tramos, gracias al punto intermedio del capítulo 6. El resto, con dobles que reemplazan al LLM. *(dice: «La IA se prueba con conjuntos grandes y por tramos, gracias al punto intermedio del capítulo seis. El resto, con dobles que reemplazan al L-L-M.»)*
- Y lo que no se automatiza, como la anonimización, lo revisan personas. *(pausa 1 s)*
- Quedaba una cuenta pendiente: pagar una IA cara con el dinero de una ONG. Capítulo 8: ahorrar donde no duele. *(dice: «Quedaba una cuenta pendiente: pagar una IA cara con el dinero de una ONG. Capítulo ocho: ahorrar donde no duele.»)*


---

## Capítulo 8 · Ahorrar donde no duele

**Duración estimada:** 756 palabras habladas, 5:44 de voz a 2,2 palabras/s, más 11,8 s de pausas escritas: **5:55**. 8 escenas.

### Plan

**Ideas esenciales**

1. La tesis del diseño, escrita después de la entrega: ahorrar a propósito en el resto para pagar una IA de precio impredecible.
2. Tres ahorros con su resguardo: una base compartida con un solo dueño por dato (ADR-014/015); reportes por lotes, fuera del camino del usuario y por correo (ADR-003/017/019, con la seguridad cedida a la vista); encuestas alquiladas y disparadas desde servicios existentes (ADR-018/020).
3. Lo que decidieron no hacer, a la vista: ADR rechazados y abiertos, y limitaciones conocidas en la portada.
4. El cierre: las dos semanas de pulido y el método completo del equipo en seis pasos.

**Anclas en el repositorio**

- `README.md`, introducción (`9891219`, 15/10) y *Known limitations* (`8516c51`, `d4c4fbb`, `ed4dc28`).
- `ADR/ADR-014-multiple-services-on-same-database.md`, `ADR/ADR-015-schema-ownership-and-permissions.md`.
- `ADR/ADR-003-batch-for-analytics.md`, `ADR/ADR-017-analytics-and-reporting-as-own-service.md`, `ADR/ADR-019-data-transmission-for-analytics.md`.
- `ADR/ADR-018-location-of-survey-triggers.md` (esqueleto «Survey service as its own service → Denied»), `ADR/ADR-020-externalizing-survey-processes.md`.
- `ADR/ADR-021-addressing-concurrency-of-hiring-managers.md` (*Denied*), `ADR/ADR-022-initial-technology-decisions.md` (*Open*).
- Actividad de los finalistas por fecha (ver `HISTORIA.md` §3.9).

**Al terminar, el espectador puede**

- Identificar dónde un diseño puede ahorrar sin dañar lo esencial, y qué resguardo exige cada ahorro.
- Explicar una regla de dueño único sobre una base compartida.
- Separar procesos operativos de procesos por lotes.
- Reconstruir el método del equipo y aplicarlo a otro caso.

**Qué se deja afuera (y por qué)**

- La arquitectura hexagonal dentro del servicio de analytics (ADR-017).
- Las opciones 2 y 3 de ADR-019 en detalle.
- La gestión de usuarios y proveedores de identidad (limitación del README, ADR-022).
- El reparto de autores del equipo.

### Auditoría del guion

Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (31 palabras, ~15 s) | Puente | Puente ~12 s | — | — | — | Sí | Bien |
| tesis (60 palabras, ~28 s) | La tesis de ahorro | La tesis de ahorro ~26 s | Sí: viene del costo de la IA | — | Sí: es la frase del equipo | Sí: la cita queda ~8 s con pausa | Bien |
| base (126 palabras, ~59 s) | Base compartida (ADR-014) y su riesgo; Dueño único con permisos (ADR-015) | Base compartida (ADR-014) y su riesgo ~32 s; Dueño único con permisos (ADR-015) ~27 s | Sí: la maraña antes de la regla | Microservicios, en una frase; acoplamiento caótico, por su efecto | Sí: barato y simple; el resguardo, por el riesgo | Sí | Bien |
| reportes (149 palabras, ~71 s) | Un servicio de reportes por lotes; Fuera del camino del usuario; por correo; Lectura directa y seguridad cedida (ADR-019) | Un servicio de reportes por lotes ~25 s; Fuera del camino del usuario; por correo ~19 s; Lectura directa y seguridad cedida (ADR-019) ~17 s | Sí: la nota del taller del capítulo 1 | Sí: por lotes | Sí: separación operativo / analítico; el trade-off de seguridad escrito | Sí | Bien |
| encuestas (73 palabras, ~34 s) | Encuestas alquiladas y disparadas desde servicios existentes; El criterio común con la IA | Encuestas alquiladas y disparadas desde servicios existentes ~23 s; El criterio común con la IA ~6 s | Sí | — | Sí: costo y datos de contacto en su lugar | Sí | Bien |
| no (102 palabras, ~47 s) | ADR rechazado (021) y bloqueo optimista; ADR abierto (022); Limitaciones a la vista | ADR rechazado (021) y bloqueo optimista ~14 s; ADR abierto (022) ~13 s; Limitaciones a la vista ~16 s | — | Bloqueo optimista, en una frase | Sí: simplicidad y costo | Sí: tres sellos fijos | Aceptable: tres detalles compactos; el valor está en mostrarlos, no en desarrollarlos |
| final (76 palabras, ~36 s) | Lo que muestra el corte (y lo que se infiere); Pulir para que se entienda | Lo que muestra el corte (y lo que se infiere) ~18 s; Pulir para que se entienda ~17 s | Sí: el gráfico antes de la conclusión | — | Sí, marcando la inferencia | Sí | Bien |
| cierre (139 palabras, ~65 s) | Repaso del capítulo; Repaso del curso (6 pasos); Síntesis final | Repaso del capítulo ~14 s; Repaso del curso (6 pasos) ~36 s; Síntesis final ~11 s | — | — | — | Sí: una tarjeta por paso, ~4 s cada una más la pausa | Bien |

**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)

| Concepto clave | Segundos | Dónde |
| - | - | - |
| La tesis de ahorro | ~42 s | `tesis`, `cierre` |
| Base compartida con dueño único (ADR-014/015) | ~59 s | `base` |
| Reportes por lotes fuera del camino del usuario | ~71 s | `reportes` |
| Encuestas alquiladas | ~34 s | `encuestas` |
| Lo no hecho, a la vista | ~47 s | `no` |
| El método completo | ~52 s | `cierre` |

**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**

- «¿Por qué compartir base no es un error?» Se explica que el estilo lo permite, se nombra el riesgo con el texto del ADR y se muestra el resguardo.
- «¿Por lotes?» Se define con su horario fijo, frente a «en el momento».
- «¿Bloqueo optimista?» Se define en una frase.
- «¿Por qué contar el silencio de dos semanas?» Se dice qué prueba y qué no (fecha de entrega inferida del patrón de todos los finalistas).
- «¿Qué me llevo del curso entero?» La escena `cierre` da el método en seis pasos.

### Guion

#### `intro` · Capítulo 8 (~15 s)

> **Visual.** La barra de 25× del capítulo 4 y la alcancía de la ONG. Una balanza con «IA» de un lado y «todo lo demás» del otro. Título.

- ¿Recuerdas el precio de la IA del capítulo 4? Impredecible, y el más alto del sistema. *(dice: «¿Recuerdas el precio de la IA del capítulo cuatro? Impredecible, y el más alto del sistema.»)*
- Este capítulo trata del otro lado de la cuenta. *(pausa 0.6 s)*
- Capítulo 8: ahorrar donde no duele. *(dice: «Capítulo ocho: ahorrar donde no duele.»)*

#### `tesis` · La tesis (~28 s)

> **Visual.** La introducción del README con fecha 15/10. La frase original resaltada con su traducción. Después, un mapa del sistema en dos colores: oro para IA, integración y pruebas; gris para todo lo demás. Tres lupas sobre lo gris: base de datos, reportes, encuestas.

- Después de la entrega, el equipo reescribió la introducción de su repositorio. Una frase resume el diseño entero.
- «Ahorramos costo deliberadamente en otras partes de la arquitectura, para mitigar el precio impredecible de la IA». *(pausa 1.2 s)*
- Lo esencial recibe lo mejor: la IA, la integración y las pruebas. El resto, lo más barato que funcione.
- Mira tres lugares donde lo hicieron.

#### `base` · Una base para varios (~59 s)

> **Visual.** Primero, microservicios: cada servicio con su propia base (muchos cilindros). Después, service-based: cuatro servicios sobre una base compartida (un cilindro). Una maraña de flechas de escritura cruzadas: rótulo «acoplamiento caótico». Después, cada tabla con un solo escritor (flecha gruesa) y los demás leen (flechas finas); un candado de permisos en la base.

- Primero, la base de datos. En microservicios, que son muchos servicios pequeños, cada uno suele tener su base propia.
- En el estilo basado en servicios del capítulo 2, se puede compartir. ADR 014: varios servicios usan la misma base. Es más barato, y más simple. *(dice: «En el estilo basado en servicios del capítulo dos, se puede compartir. A-D-R cero uno cuatro: varios servicios usan la misma base. Es más barato, y más simple.»)*
- El riesgo quedó anotado en el mismo ADR: acoplamiento caótico. Si todos escriben en todo, nadie sabe qué cambio rompe a quién. *(pausa 1 s; dice: «El riesgo quedó anotado en el mismo A-D-R: acoplamiento caótico. Si todos escriben en todo, nadie sabe qué cambio rompe a quién.»)*
- Por eso agregaron una regla, el ADR 015: cada tipo de dato tiene un solo dueño. Solo ese servicio lo escribe. Los demás, lo leen. *(dice: «Por eso agregaron una regla, el A-D-R cero uno cinco: cada tipo de dato tiene un solo dueño. Solo ese servicio lo escribe. Los demás, lo leen.»)*
- Y se hace cumplir con permisos de la base de datos, no con buena voluntad. *(pausa 1 s)*
- ¿Te suena? Es la idea del capítulo 6: una regla que la arquitectura hace cumplir. *(dice: «¿Te suena? Es la idea del capítulo seis: una regla que la arquitectura hace cumplir.»)*

#### `reportes` · Los reportes (~71 s)

> **Visual.** La nota amarilla del tablero del capítulo 1 («la mayoría de los eventos sirven para los reportes»). Un servicio de análisis y reportes con un reloj de luna (de noche) y un calendario (mensual). Una línea roja separa los procesos que atienden usuarios del servicio de reportes: ninguna flecha cruza hacia él desde el camino del usuario. El reporte sale como un sobre de correo. Al final, una flecha directa a la base de candidatos con un rótulo «seguridad cedida».

- Segundo, los reportes. ¿Recuerdas la nota del taller del capítulo 1? La mayoría de los eventos sirven para los reportes. *(dice: «Segundo, los reportes. ¿Recuerdas la nota del taller del capítulo uno? La mayoría de los eventos sirven para los reportes.»)*
- El pliego pide un reporte mensual para cada empresa. El equipo lo resolvió con un solo servicio de análisis y reportes, que trabaja por lotes.
- Un proceso por lotes junta muchos datos y los procesa de una vez, en un horario fijo, como cada noche o cada mes, en lugar de en el momento. *(pausa 0.8 s)*
- Y una regla: ningún proceso que atiende a un usuario depende de este servicio. Si se cae, ninguna candidata ni empresa se queda esperando.
- Los reportes salen por correo, no en una pantalla propia: una interfaz menos que construir. *(pausa 1 s)*
- Para los datos demográficos, el servicio lee directo de la base de candidatos. Es lo más simple, y el equipo anotó lo que cede: un servicio que accede a casi todo es un riesgo de seguridad. *(pausa 1 s)*

#### `encuestas` · Lo que se alquila (~34 s)

> **Visual.** El esqueleto del 26/09: «Survey service as its own service → Denied». Un servicio de encuestas tachado. En su lugar, un logo genérico de herramienta de encuestas externa; el servicio de candidatos y el de empresas disparan el correo, cada uno con su libreta de contactos que no sale de su caja. Contador: «servicios nuevos: 0».

- Tercero, las encuestas del pliego: cinco preguntas a cada parte.
- En la sesión de diseño, la nota fue corta: un servicio propio de encuestas, rechazado.
- Se alquilan, con SurveyMonkey o algo parecido. Y el envío lo dispara el servicio de cada usuario, que ya tiene su correo: los datos de contacto no salen de su lugar.
- Cero servicios nuevos. *(pausa 1 s)*
- El mismo criterio de la IA: lo que no diferencia a ClearView, se alquila.

#### `no` · Lo que no hicieron (~47 s)

> **Visual.** Tres sellos: ADR-021 «Denied», ADR-022 «Open», y la sección *Known limitations* del README. Bajo el 021, dos responsables editando el mismo puesto y un aviso al guardar (bloqueo optimista). Bajo el 022, casillas vacías: base de datos, cola, nube; una nota «RabbitMQ > Kafka, por costo». Bajo las limitaciones, tres renglones.

- Un repositorio honesto también muestra lo que no se hizo.
- ADR 021, rechazado: dos responsables editando el mismo puesto a la vez. Se resuelve con la interfaz, o más adelante con bloqueo optimista: detectar el choque al guardar. *(dice: «A-D-R cero dos uno, rechazado: dos responsables editando el mismo puesto a la vez. Se resuelve con la interfaz, o más adelante con bloqueo optimista: detectar el choque al guardar.»)*
- ADR 022, abierto: base de datos, colas, nube. Las tecnologías concretas quedaron sin elegir. Solo una pista: una cola liviana como RabbitMQ antes que Kafka, por costo. *(dice: «A-D-R cero dos dos, abierto: base de datos, colas, nube. Las tecnologías concretas quedaron sin elegir. Solo una pista: una cola liviana como RabbitMQ antes que Kafka, por costo.»)*
- Y en la portada, sus limitaciones conocidas: el límite de uso del LLM, sin resolver; matches que no son en tiempo real; y características legibles, difíciles de definir. *(pausa 1 s; dice: «Y en la portada, sus limitaciones conocidas: el límite de uso del L-L-M, sin resolver; matches que no son en tiempo real; y características legibles, difíciles de definir.»)*
- Nada de eso está escondido.

#### `final` · Las dos semanas (~36 s)

> **Visual.** Un gráfico de commits por día: el pico del 30/09 (23 commits), dos semanas vacías, un rebrote del 14 al 16/10. Debajo, las barras de Katamarans, Jazz-Executor, ArchZ y DevExperts, con su pico el mismo 30/09, rotulado «inferido: fecha de entrega». Lo que cambió después: enlaces, nombres, el C3 de matching alineado, el porqué del ADR-002, la introducción.

- Queda una última pista del historial. El 30 de septiembre, el equipo hizo 23 commits. Después, dos semanas de silencio. *(dice: «Queda una última pista del historial. El treinta de septiembre, el equipo hizo veintitrés commits. Después, dos semanas de silencio.»)*
- Varios finalistas tienen su pico de commits ese mismo día, así que muy probablemente esa fue la fecha de entrega.
- Cuando volvieron, no rediseñaron nada. Corrigieron enlaces y nombres, alinearon un diagrama con el ADR del matching, y escribieron el porqué que les faltaba. *(dice: «Cuando volvieron, no rediseñaron nada. Corrigieron enlaces y nombres, alinearon un diagrama con el A-D-R del matching, y escribieron el porqué que les faltaba.»)*
- El diseño ya estaba decidido. Lo que pulieron fue que se entendiera. *(pausa 1 s)*

#### `cierre` · El método (~65 s)

> **Visual.** Seis tarjetas que se acumulan, cada una con su artefacto real en miniatura: la mesa de post-its; la hoja de características; el archivo R/Q/A con la libreta del experto; la estimación de tokens; el diagrama de los seis caminos con B marcada; el mapa oro y gris. Al final, el logo del equipo.

- Repasemos este capítulo: una base con un solo dueño por dato, reportes por lotes fuera del camino del usuario, encuestas alquiladas, y lo no resuelto a la vista. *(pausa 1 s)*
- Y ahora, el curso entero, en el orden del equipo.
- Uno: entender el negocio con todos, en post-its, con las dudas a la vista.
- Dos: elegir pocas características, con su porqué. Y de ahí, el estilo.
- Tres: numerar requisitos y supuestos. Y lo que no sabes, preguntárselo a quien sabe.
- Cuatro: medir antes de decidir. Un prompt de prueba, con precios y con fecha.
- Cinco: poner la IA donde se pueda probar, y contar sus prompts.
- Seis: ahorrar en todo lo demás, para pagar lo que importa. *(pausa 1.2 s)*
- El diseño ganador no apuesta todo a la IA. La usa poco, en un lugar donde se puede probar, y deja escrito por qué.

