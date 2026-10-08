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

{SUMMARY}

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

