# Five Nines · Guion del curso en video

Curso en video de KatArch sobre el ganador de la O'Reilly Architecture Kata Q4 2025 (*AI-Enabled Architecture*, caso MobilityCorp): el equipo **Five Nines**. Columna vertebral: `HISTORIA.md` (el orden en que el equipo razonó, con commits). Vara pedagógica: `KatArch/video/PEDAGOGY.md`. Formato de los guiones: el de `KatArch/video/ch5/narration.json` (misma configuración de voz). Los archivos de cada capítulo están en `video/chN/narration.json` y coinciden línea por línea con las secciones "Guion" de este documento (este documento y los `narration.json` se generan desde las mismas fuentes, en `fuentes/`, con `python3 fuentes/build.py`).

## 1. Visión general

### El espectador
El mismo de KatArch: un desarrollador con un par de años de experiencia, que programa bien pero nunca diseñó un sistema entero, no conoce la jerga (ADR, MLOps, LLM, human-in-the-loop) y no puede pausar para buscarla. Puede no haber visto el curso de ArchColider: ningún capítulo da por sabido nada de él.

### Qué hace distinto a este curso
Los katas de 2025 piden **arquitectura con IA**. El caso de MobilityCorp no se gana por la elección de estilo (como en Farmacy Food) sino por **dónde se pone la IA, de qué tipo, cómo se confía en ella y cómo se sobrevive a sus proveedores**. El equipo ganador lo resolvió con un método que el historial muestra paso a paso: primero el negocio (la IA no es meta), después un estado de flota confiable, después una herramienta por escenario, después confianza y escape, y al final un relato con compuertas de valor.

### Lo que el espectador puede hacer al terminar
1. Separar metas de soluciones y rastrear cada pieza de IA hasta la meta que mueve.
2. Elegir, escenario por escenario, entre código, aprendizaje automático e IA generativa, y justificar dónde **no** usar IA generativa.
3. Diseñar la confianza en un modelo probabilístico: bandas de confianza, revisión humana y vigilancia en producción.
4. Escribir el precio de atarse a un proveedor y dejar salidas.
5. Presentar un plan de IA por compuertas medibles, distinguiendo números dados, calculados y supuestos.

### Por qué 8 capítulos
El repositorio es más delgado en razonamiento explícito que el de ArchColider (sin pizarras, sin preguntas al cliente, sin costos calculados) pero tiene 22 ADRs, un historial denso de 9 días y un cambio de relato después de la semifinal. Eso sostiene 8 ideas grandes; menos obligaría a comprimir conceptos nuevos (LLM, MLOps, human-in-the-loop) por debajo de los 20 s; más sería relleno (por ejemplo, un capítulo por cada escenario de IA repetiría el mismo patrón).

### Orden y cronología
Los capítulos siguen el orden real del equipo (ver `HISTORIA.md` §3–4), con dos ajustes declarados:
- El capítulo 3 (fuente única de verdad, 16–20 oct) y el 4 (herramienta por escenario, 17–22 oct) se solapan en fechas; va primero el 3 porque los títulos de ADR del 16 (nube y telemetría) son anteriores a la columna "Tech Choice" del 17.
- El capítulo 7 (proveedores) recoge decisiones del 16 al 23; va después del pronóstico porque su contenido más propio (riesgos en cada ADR, MoCoP) se apoya en lo que ya se decidió.

### Términos y dónde se definen
kata, pliego, arquitectura, IA generativa, determinista, ADR (cap. 1) · impulsor, meta, supuesto, restricción (cap. 2) · telemetría, MQTT, Pub/Sub, fuente única de verdad, trade-off, nube (cap. 3) · código vs. aprendizaje automático vs. IA generativa, LLM, híbrido (cap. 4) · confianza, falso positivo, falso negativo, human-in-the-loop, deriva, MLOps (cap. 5) · pronóstico de demanda, serie de tiempo, solver (cap. 6) · vendor lock-in, plano de control de modelos (MoCoP), Model Context Protocol (cap. 7) · compuerta de valor, modo sombra, visión artificial (cap. 8).

### Lo que se deja fuera a propósito (lo cubre el repositorio o un curso escrito)
RAG y búsqueda vectorial (ADRs 0006 y 0008), Agent Builder (0010), retención de fotos y GDPR (0017), datos de entrenamiento y sesgo (0015, salvo la idea de acuerdo entre revisores), el lakehouse de datos y analítica, el contexto completo de autos y camionetas, las multas y tarifas del Apéndice A, el asistente de rutas en detalle (ADR-0005; su cambio borde → nube queda en `HISTORIA.md`), el marketing con IA de "Future scope", los OKRs y la tabla de ROI.

## 2. Lista de capítulos

| # | Título | Ideas esenciales | Anclas (repo y commits) | Al terminar, el espectador puede… | Min |
| - | - | - | - | - | - |
| 1 | El encargo | Dos flotas y sus reglas; los tres problemas (lugar, baterías, hábito); la escala (10.400 por país, 96 % micromovilidad); los criterios del jurado (IA útil, porqué, incertidumbre, verificación) | Subtítulos de la sesión inaugural (8a5ce24, `sessions/#1/captions_en.txt`, borrado en 31d6ccc) | Leer un pliego de IA buscando el problema y los criterios, y hacer la primera cuenta | 6,6 |
| 2 | Antes de la IA, el negocio | La IA es solución, no meta; cadena impulsor → meta → solución; números dados, calculados y supuestos; supuestos contrastados con el pliego | b7d92fb, 338c9ec, 3f7786d (`requirements/1_0_…`); 5c155f1, eea5927 (`4_Assumptions…`); 57b8370 | Filtrar propuestas de IA por la meta que mueven y auditar supuestos | 6,2 |
| 3 | Una sola fuente de verdad | Cuenta del tráfico de telemetría; MQTT + Pub/Sub; Fleet Service absorbe ubicación y se vuelve fuente única de verdad; trade-off del riesgo concentrado; GCP el segundo día | c9524d4, 446bf8a → 8ba0904; ADR-0002 (0f1e34d); ADR-0007 (9ed6b7c); ADR-0001 (938eb08); `hld/core-func/` | Justificar un estado central con reglas frente a copias distribuidas | 6,4 |
| 4 | ¿IA generativa, aprendizaje automático o código? | Las tres herramientas y sus costos; la columna "Tech Choice"; el asistente híbrido (botones en código, dinero en código); dónde no usarla (consejo de carga); precios: ML calcula, IA generativa explica | 0d0036f, 95046f0 (`2_FRs.md`); ADR-0012 (b424c11); ADR-0021 (971a0c1); ADR-0018 (2526e17) | Etiquetar cada escenario con la herramienta más simple que alcanza | 5,8 |
| 5 | Confiar en una IA que se equivoca | Dos errores y cuál duele más; bandas de confianza y human-in-the-loop; correcciones como datos; MLOps, deriva y métricas de negocio | FR#2L (`2_FRs.md`); ADR-0014, 0016 (ac13ebd); ADR-0011 (6e54388); NFR_9; `hld/mlops/README.md` (076f519) | Diseñar umbrales, revisión humana y vigilancia para un modelo probabilístico | 5,8 |
| 6 | El vehículo correcto, en el lugar correcto | El problema n.º 1 se diseñó al final; circuito de operarios (baterías + reubicación); pronóstico como serie de tiempo; escalera Prophet → ML con condición medible; rutas: IA generativa vs. solver (Nimrods) | 34760da, 4b17796 (ADR-0022); 91e0c8b, 9d430ad; ADR-0019; Nimrods `012-redistribution-optimizer-algo.md` | Empezar por un modelo simple y escribir la condición para escalar | 5,8 |
| 7 | Cuando el proveedor cambia las reglas | Lock-in elegido a conciencia; riesgos escritos en cada ADR (desde el 20/10); salidas (API determinista, modelo más chico, portabilidad); el intermediario MoCoP; cabos sueltos | 4497171 + c0d4888…0aa4148; ADR-0004; ADR-0013 (fbab35b → 17db325); `hld/scenarios/feedback-analysis/README.md` | Escribir el precio de una dependencia y diseñar al menos una salida | 5,3 |
| 8 | Contar la arquitectura | Después de la foto solo cambia el relato; reorden a 3 casos de uso con el pronóstico primero; compuertas de valor ("ganar antes, gastar después"); cifras supuestas presentadas como resultados; el método completo | `git diff ebf6d83 e930bcb`; 87da42f, 3b1591c (`video-scenario-…`); 88bedef (`narrative.md`); 02f177b (PDF) | Presentar un plan de IA con compuertas verificables en vez de promesas | 5,4 |

**Total estimado:** unos 47 minutos (voz a 2,2 palabras/s más pausas escritas).

---

## Capítulo 1 · El encargo

### Plan
- **Ideas esenciales:** (1) MobilityCorp y sus dos flotas, con reglas distintas; (2) los tres problemas del cliente, que apuntan a lo mismo; (3) la cuenta de la flota: 96 % es micromovilidad; (4) los cuatro criterios del jurado sobre IA.
- **Anclas:** subtítulos de la sesión inaugural (min 7–17, 25–27, 37, 45–59, ~72), recuperados del commit 8a5ce24. El calendario sale de la misma sesión.
- **Puente de entrada:** ninguno (primer capítulo). Se explica qué es un kata sin suponer el curso de ArchColider.
- **Piénsalo:** después de los criterios del jurado; el espectador los aplica a "un chatbot porque está de moda". La respuesta se retoma en los capítulos 4 y 5.
- **Decisión de fuente:** se usan los subtítulos crudos, no el resumen del equipo. La cuenta de 10.400 y el 96 % se declaran como nuestras.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (85 p) | kata, pliego, arquitectura | ~8 s cada uno; la condición de IA ~7 s + 1 s | Sí: la competencia antes del término | Sí, en una frase cada uno | Sí: el kata como práctica | Sí: tres palabras, una por línea | Bien |
| negocio (127 p) | última milla; dos flotas | Última milla ~8 s; flotas ~40 s | Sí: estación → casa antes del nombre | Sí | Sí: cada flota trae problemas distintos | Sí: dos columnas fijas toda la escena | Bien |
| numeros (90 p) | la cuenta de la flota | ~41 s + 1,6 s | Sí: los números antes de la proporción | — | Sí: el volumen marca dónde están los problemas | Sí: barras que crecen una por vez | Bien |
| desafios (142 p) | tres problemas, preferencia por la flota existente | ~15 s por problema; conexión hábito-confianza ~6 s + 1 s | Sí: el monumento antes del "lugar equivocado" | — | Sí: el cliente los conecta | Sí: cuatro tarjetas acumuladas | Bien |
| entregables (100 p) | ADR; calendario | ADR ~10 s + 1 s; calendario ~20 s | Sí: el repositorio antes del ADR | Sí: qué, alternativas, porqué | Sí: el calendario permite reconstruir el proceso | Sí: línea de tiempo fija | Bien |
| criterios (128 p) | IA generativa; los 4 criterios; determinista | IA generativa ~6 s; cada criterio ~7–9 s; determinista ~12 s + 1 s | A medias: los criterios se enuncian, el caso llega en el piénsalo | Sí | Sí: por qué importa verificar | Sí: 4 casilleros, 6 s juntos al final | Aceptable: lista de 4, cada uno con su frase y su ícono; se trabajan en el resto del curso |
| piensalo (76 p) | aplicar los criterios | ~35 s + 3 s | Sí | — | Sí | Sí | Bien |
| outro (83 p) | repaso | ~5 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería el espectador:** en la lista de criterios (cuatro ideas seguidas). Mitigación: una frase y un ícono por criterio, la definición de "determinista" con su ejemplo, y el piénsalo que obliga a usar dos de ellos. **Qué preguntaría:** "¿por qué me cuentan las reglas de entrega?" Respuesta en la escena: porque git guarda las fechas, y el curso se apoya en ellas.

### Guion
{{SCRIPT_1}}

---

## Capítulo 2 · Antes de la IA, el negocio

### Plan
- **Ideas esenciales:** (1) la IA es una solución, no un objetivo (la nota al margen); (2) la cadena impulsor → meta → solución como filtro; (3) un número puede ser dado, calculado o supuesto; (4) los supuestos se escriben para compararlos con el pliego.
- **Anclas:** b7d92fb (borrador con la nota), 338c9ec (cadena), 3f7786d (metas con números; "Automate Capabilities" desaparece), 5c155f1 y eea5927 (supuestos), 57b8370 y README (las cuatro áreas), captions min 41 (sin economía).
- **Puente:** "¿Recuerdas los tres problemas?" Y se aclara que el día 2 también se eligió la nube (cap. 3), para no falsear el orden.
- **Piénsalo:** el supuesto del GPS cada 30 minutos contra los 30 segundos del pliego, después de enseñar qué es un supuesto y de mostrar una diferencia (las bicicletas).
- **Decisión de fuente:** ante el choque 30 min / 30 s y 500 / 5.000, se sigue al pliego y se dice en voz alta.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (54 p) | — (andamiaje) | ~25 s | — | — | Sí: aclara el orden real | Sí | Bien |
| nota (102 p) | la IA como solución, no meta | **~46 s + 3 s** | Sí: la lista de seis objetivos antes de la nota | Sí: objetivo = qué gana la empresa | Sí: si la herramienta es meta, cualquier uso parece éxito | Sí: seis renglones acumulados, nota manuscrita 10 s | Bien |
| cadena (128 p) | impulsor, meta, solución; la cadena como filtro | Impulsor ~12 s; meta ~4 s; solución ~4 s; ejemplo ~18 s + 1 s; filtro ~8 s + 1 s (total ~58 s) | Sí: la competencia como impulsor con caso | Sí, los tres | Sí: el filtro | Sí: una fila de ejemplo que se recorre | Bien |
| origen (94 p) | número dado / calculado / supuesto | ~43 s + 2 s | Sí: el 23 % del ejemplo anterior | Sí | Sí: cada tipo merece confianza distinta | Sí: tres cajones fijos | Bien |
| supuestos (108 p) | supuesto, restricción, contraste con el pliego | Supuesto ~6 s; restricción ~5 s; contraste ~30 s + 2,6 s | Sí: el documento antes de las definiciones | Sí | Sí: permite comparar | Sí: dos columnas enfrentadas | Bien |
| piensalo (101 p) | aplicar el contraste | ~46 s + 5 s | Sí | — | Sí: viajes invisibles, scooters fantasma | Sí | Bien |
| alcance (104 p) | las cuatro áreas de IA sobre el núcleo | ~6 s por área; el orden ~10 s | Sí: lo básico del alquiler antes | Sí, cada área en una frase | Sí: anticipa el capítulo 6 | Sí: bloques apilados | Aceptable: lista de cuatro, pero cada área se desarrolla después |
| outro (80 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en "impulsor" (palabra poco usada). Mitigación: definición + ejemplo de la competencia. **Qué preguntaría:** "¿entonces las metas del equipo son inventadas?" La escena `origen` lo responde sin descalificar: son metas elegidas, y hay que saberlo.

### Guion
{{SCRIPT_2}}

---

## Capítulo 3 · Una sola fuente de verdad

### Plan
- **Ideas esenciales:** (1) hacer la cuenta del tráfico de telemetría; (2) MQTT para aparatos pequeños y Pub/Sub para publicar una vez; (3) Fleet Service como fuente única de verdad (el cambio desde el primer boceto); (4) el precio: riesgo concentrado.
- **Anclas:** captions min 37 (30 s); ADR-0002 (0f1e34d); `hld/core-func/Vehicle Connectivity.png`; c9524d4 y 446bf8a (Location Service) → 8ba0904 (desaparece) → ADR-0007 (9ed6b7c); ADR-0001 (938eb08).
- **Puente:** la cuenta del capítulo 1.
- **Piénsalo:** dos copias del estado de batería, después de definir fuente única de verdad y antes de su precio.
- **Decisión de fuente:** la cuenta de ~350 mensajes/s es nuestra y se dice. Se usa 30 s (pliego), no 30 min.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (38 p) | — | ~17 s | — | — | — | Sí | Bien |
| volumen (112 p) | telemetría; la cuenta | Telemetría ~8 s; cuenta ~30 s + 1,8 s; orden de magnitud ~10 s + 1 s | Sí | Sí | Sí: muchos mensajes pequeños, señal que va y viene | Sí: la operación escrita y el contador fijo | Bien |
| mqtt (118 p) | MQTT; HTTP descartado; Pub/Sub; publicar/suscribirse | MQTT ~14 s; HTTP ~11 s + 1 s; Pub/Sub ~20 s + 2 s | Sí: el tráfico de la escena anterior | Sí: protocolo liviano; tablero de anuncios | Sí: batería, cortes, entrega garantizada; desacople | Sí: metáfora visual estable | Bien |
| boceto (81 p) | el primer diseño y su cambio | ~37 s + 1,8 s | Sí: se muestra el diseño antes del cambio | — | Se deja abierto a propósito (lo responde la escena siguiente) | Sí: superposición de diagramas lenta | Bien |
| verdad (122 p) | fuente única de verdad; reglas en el estado | Definición ~12 s + 1 s; reglas ~13 s + 1 s; alternativa ~12 s + 1 s (total **~56 s**) | Sí | Sí | Sí: estados que no coinciden, lógica repetida | Sí | Bien |
| piensalo (76 p) | aplicar | ~35 s + 4 s | Sí | — | Sí | Sí: dos medidores distintos | Bien |
| precio (77 p) | trade-off; riesgo concentrado | Trade-off ~8 s + 0,8 s; resto ~25 s | Sí: el costo antes de la palabra | Sí | Sí | Sí: balanza | Bien |
| nube (96 p) | nube; GCP por los mapas | Nube ~5 s; razones ~25 s | Sí | Sí | Sí: los mapas y la IA integrada | Sí | Bien (el lock-in se desarrolla en el cap. 7) |
| outro (77 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en "Pub/Sub" (nombre de producto). Mitigación: se dice qué es (mensajería de Google) y la metáfora del tablero. **Qué preguntaría:** "¿350 por segundo es mucho?" No se compara con nada externo para no inventar; se enfatiza el tipo de tráfico (pequeño, constante, de aparatos con poca batería), que es lo que decide MQTT.

### Guion
{{SCRIPT_3}}

---

## Capítulo 4 · ¿IA generativa, aprendizaje automático o código?

### Plan
- **Ideas esenciales:** (1) tres herramientas con costos y riesgos distintos; (2) la columna que obliga a elegir por escenario; (3) el híbrido: IA generativa solo en el borde del lenguaje libre, el dinero siempre en código; (4) dónde no usarla: el consejo de carga.
- **Anclas:** 0d0036f y 95046f0 (`requirements/2_FRs.md`); ADR-0012 (b424c11, 168c5ce); ADR-0021 (971a0c1, 355cdd0); ADR-0018 (2526e17).
- **Puente:** el criterio del jurado del capítulo 1 ("¿dónde decidiste no usarla?").
- **Piénsalo:** precios dinámicos, calcular vs. explicar, después del asistente y del consejo de carga.
- **Honestidad:** se anuncia que no todas las etiquetas siguen la regla (rutas de operarios, cap. 6). En el guion no se discute la etiqueta "GenAI" para el pronóstico de costos de mantenimiento (FR 2K), que también es discutible; queda registrada aquí.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (41 p) | — | ~19 s | — | — | — | Sí | Bien |
| herramientas (143 p) | código; aprendizaje automático; IA generativa; LLM | Código ~13 s + 1 s; ML ~25 s + 1 s; IA generativa y LLM ~23 s + 1 s | Sí: un ejemplo concreto por herramienta | Sí, las tres y LLM | Sí: costo, velocidad, riesgo | Sí: tres tarjetas acumuladas, 65 s en pantalla | Bien |
| columna (96 p) | tabla de escenarios; "híbrido" | ~44 s + 1,8 s | Sí | Sí | Sí: cada fila con su motivo | Sí: solo tres filas | Bien |
| asistente (115 p) | flujo híbrido; dinero en código | ~52 s + 2 s | Sí: lo que pide la gente antes del diseño | — | Sí: costo por mensaje; la IA conversa pero no ejecuta | Sí: flujo de dos ramas | Bien |
| carga (102 p) | no usar IA generativa | ~46 s + 2,2 s | Sí: el scooter con poca batería | — | Sí: plantillas alcanzan, costo | Sí | Bien |
| piensalo (96 p) | aplicar al precio | ~44 s + 4 s | Sí | — | Sí: precisión numérica | Sí: dos casilleros | Bien |
| regla (57 p) | la escalera de herramientas | ~26 s + 1 s | Sí (síntesis de lo visto) | Sí | Sí | Sí | Bien |
| outro (73 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en el flujo del asistente (dos componentes de IA en una frase). Mitigación: el visual de dos ramas y la síntesis "lo caro y probabilístico quedan solo donde aportan". **Qué preguntaría:** "¿por qué no IA generativa para todo, si entiende todo?" Respuestas en el guion: costo por mensaje, latencia, errores con seguridad, sin control para pagos.

### Guion
{{SCRIPT_4}}

---

## Capítulo 5 · Confiar en una IA que se equivoca

### Plan
- **Ideas esenciales:** (1) un modelo probabilístico se equivoca de dos formas, y hay que decidir cuál duele más; (2) bandas de confianza con revisión humana, y la duda a favor del cliente; (3) las correcciones alimentan el modelo siguiente; (4) MLOps: evaluar antes, vigilar la deriva después, y mirar el negocio.
- **Anclas:** FR#2L (`2_FRs.md`, umbrales 90/80 y el riesgo de falsos positivos); ADR-0014 y ADR-0016 (ac13ebd); NFR_9 (80 % durante 14 días); ADR-0011; `hld/mlops/README.md`; ADR-0020 (85/70).
- **Puente:** la foto de devolución del capítulo 1, y la pregunta "¿cómo sabrás si responde bien?" del piénsalo del capítulo 1 (implícita).
- **Piénsalo:** un caso al 85 %, después de las bandas.
- **Honestidad:** los porcentajes son metas, no mediciones (escena `abierto`).

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (57 p) | el caso de la limpieza | ~26 s + 1 s | Sí | — | Sí | Sí | Bien |
| riesgo (104 p) | confianza; falso positivo; falso negativo | Confianza ~9 s; cada error ~8 s + 1 s; cuál duele más ~10 s + 1 s | Sí | Sí, con ejemplo cada uno | Sí: confianza del cliente y el objetivo de hábito | Sí: tabla 2×2 con dos celdas | Bien |
| bandas (102 p) | bandas; human-in-the-loop; costo de los cortes | Bandas ~22 s + 2,2 s; HITL ~10 s + 1 s; costo ~8 s | Sí: las bandas antes del nombre | Sí | Sí: la duda favorece al cliente | Sí: la regla de colores queda fija | Bien |
| circuito (88 p) | correcciones como datos; acuerdo entre revisores | ~40 s + 2 s | Sí | Sí | Sí | Sí | Bien |
| mlops (121 p) | deriva; MLOps; evaluación previa; reentrenamiento | Deriva ~14 s + 1 s; MLOps ~9 s + 1 s; evaluación y monitor ~23 s (total con `negocio` **~81 s**) | Sí: la pregunta "¿un mes después?" antes del nombre | Sí | Sí: cámaras y estaciones cambian | Sí: ciclo de cinco estaciones | Bien |
| negocio (57 p) | métrica de negocio como señal | ~26 s + 2 s | Sí | — | Sí | Sí | Bien |
| piensalo (61 p) | aplicar las bandas | ~28 s + 4 s | Sí | — | Sí | Sí | Bien |
| abierto (56 p) | metas, no resultados; cortes por modelo | ~26 s + 1 s | — | — | Sí: cada decisión tiene su costo de error | Sí | Bien |
| outro (70 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** "deriva" y "MLOps" en la misma escena. Mitigación: deriva con caso propio (cámaras, estaciones) y pausa de 1 s antes de MLOps. **Qué preguntaría:** "¿quién paga las revisiones humanas?" Respondido: los cortes tienen costo, y las revisiones son la fábrica de datos.

### Guion
{{SCRIPT_5}}

---

## Capítulo 6 · El vehículo correcto, en el lugar correcto

### Plan
- **Ideas esenciales:** (1) el problema n.º 1 se diseñó al final (lo prueba git; el porqué es inferencia, y se dice); (2) baterías y reubicación en un mismo circuito de operarios; (3) empezar por un modelo estadístico y escribir la condición para escalar; (4) la debilidad: rutas por IA generativa, frente al solver del segundo puesto.
- **Anclas:** fechas de `hld/scenarios/*` (b1f4b0e, 9fcd218, 1053f20, 4faf79d, 91e0c8b, 34760da); ADR-0022 (4b17796); 9d430ad; diagrama de baterías y asignación de flota; ADR-0019; Nimrods `docs/decisions/012-redistribution-optimizer-algo.md` y `005-dispatch-agent-orchestrator.md`.
- **Puente:** el problema 1 del capítulo 1 y el anuncio del capítulo 2 ("ese orden va a tener consecuencias"); la escalera remite a las bandas del capítulo 5.
- **Piénsalo:** ciudad nueva sin datos, después de la escalera.
- **Contrapunto del podio:** una sola vez, como en ADR-001 de KatArch.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (41 p) | — | ~19 s | — | — | — | Sí | Bien |
| orden (105 p) | el orden real de diseño | ~48 s + 2 s | Sí: las fechas antes de la conclusión | — | Inferencia marcada como "lectura posible" | Sí: línea de tiempo | Bien |
| operarios (125 p) | circuito de mantenimiento; vida útil de la batería; unión de tareas | Circuito ~20 s; batería ~10 s; unión ~17 s + 1 s | Sí | Sí | Sí: el operario ya está en la calle | Sí: flujo numerado | Bien |
| pronostico (87 p) | pronóstico de demanda; serie de tiempo | Pronóstico ~6 s; serie de tiempo ~10 s + 0,8 s; patrones ~15 s + 1 s | Sí: bicicletas y camionetas como ejemplo | Sí | Sí | Sí: gráfico semanal | Bien |
| escalera (122 p) | Prophet; dos modelos por flota; condición para escalar | Prophet ~15 s; separación ~8 s + 1 s; condición ~20 s + 1,2 s (total **~56 s**) | Sí | Sí ("modelo estadístico clásico") | Sí: rápido y explicable; escalar solo con evidencia | Sí: condición escrita a la vista | Bien |
| piensalo (60 p) | aplicar (arranque en frío) | ~27 s + 4 s | Sí | — | Sí | Sí | Bien |
| podio (124 p) | optimización de rutas; solver | ~56 s + 3 s | Sí: el problema de rutas antes de las soluciones | Sí: "herramienta matemática hecha para rutas" | Sí: calcular es matemática, conversar es lenguaje | Sí: pantalla partida | Bien |
| outro (66 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** "Prophet" y "OR-Tools" son nombres propios sin significado. Mitigación: cada uno se presenta por lo que hace, no por su nombre. **Qué preguntaría:** "¿por qué el ganador tiene una debilidad?" Respuesta implícita en el guion: el curso muestra aciertos y huecos; cerrarlo así refuerza la regla del capítulo 4.

### Guion
{{SCRIPT_6}}

---

## Capítulo 7 · Cuando el proveedor cambia las reglas

### Plan
- **Ideas esenciales:** (1) atarse a un proveedor es válido si se elige con el costo escrito; (2) desde el 20 de octubre, cada ADR trae su tabla de riesgos; (3) salidas concretas; (4) el intermediario que elige el modelo (MoCoP).
- **Anclas:** captions min 54–59, 57–58, 68–69; 4497171, c0d4888, f7d0ef7, d27d2d2, 7dde15d, 0aa4148; ADR-0001 (competidores en GCP); ADR-0004 (respaldo en Maps API); `hld/scenarios/feedback-analysis/README.md`; ADR-0003/0014 (portabilidad); ADR-0013 (fbab35b → 17db325); ADR-0005 (nombre viejo).
- **Puente:** el tercer criterio del jurado (cap. 1) y la nube del día 2 (cap. 3).
- **Piénsalo:** Gemini triplica su precio; aplica la regla del capítulo 4 como defensa.
- **Honestidad:** dos cabos sueltos (ADR-0013 frente a Vertex; la sigla MCP).

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (46 p) | incertidumbre de proveedores | ~21 s + 1 s | Sí: tres ejemplos del anfitrión | — | Sí | Sí | Bien |
| apuesta (109 p) | Vertex AI, Gemini (recordatorio); vendor lock-in | Lock-in ~10 s + 1 s; postura del jurado ~10 s | Sí: la apuesta antes del nombre | Sí | Sí: competidores en GCP; elegir sabiendo el costo | Sí | Bien |
| seccion (89 p) | la tabla de riesgos en cada ADR | ~40 s + 2 s | Sí: ADRs sin riesgos antes del cambio | — | Sí: una decisión sin precio está a medias | Sí: relojes 10:59–11:03 | Bien |
| salidas (95 p) | tres salidas | ~10 s cada una + 1 s; síntesis ~8 s | Sí | Sí ("determinista", ya definido en cap. 1) | Sí | Sí: tres puertas | Bien |
| intermediario (97 p) | plano de control de modelos | **~44 s + 2 s** | Sí: las apps apuntando directo a un modelo antes del intermediario | Sí | Sí: cambiar sin tocar las apps; salir rápido | Sí | Bien |
| cabos (94 p) | dos inconsistencias; Model Context Protocol | ~20 s cada una | — | Sí (MCP en una frase) | Sí: confunde a cualquier lector | Sí: dos tarjetas | Aceptable: dos ideas, pero son honestidad, no conceptos para aprender |
| piensalo (64 p) | aplicar | ~29 s + 4 s | Sí | — | Sí | Sí | Bien |
| outro (71 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en la escena `cabos` (dos siglas). Mitigación: el visual muestra los dos globos de MCP; la frase de cierre da la lección (una sigla con dos significados confunde). **Qué preguntaría:** "¿cómo se llama el proveedor del intermediario?" El repositorio no lo nombra; queda en `HISTORIA.md` §6.

### Guion
{{SCRIPT_7}}

---

## Capítulo 8 · Contar la arquitectura

### Plan
- **Ideas esenciales:** (1) después de la foto, la arquitectura no cambia: cambia el relato, para una audiencia de negocio; (2) el reorden: tres casos de uso, con el problema n.º 1 primero; (3) compuertas de valor: "ganar antes, gastar después"; (4) números supuestos presentados como resultados, frente a reglas verificables. Cierre con el método completo.
- **Anclas:** `git diff ebf6d83 e930bcb --stat`; 87da42f y 3b1591c (`video/video-scenario-business-management-5min.md`, cifras en blanco); 88bedef (`video/narrative.md`); 02f177b (`FiveNines - 2025 AI kata final presentation.pdf`, pp. 6–8); d81160a (orden del README).
- **Puente:** la foto del 23 de octubre (caps. 1 y 7); los tres cajones de números (cap. 2); la escalera y las bandas (caps. 5 y 6).
- **Piénsalo:** proyección contra regla, después de mostrar ambas.
- **Decisión de fuente:** ante cifras distintas entre `narrative.md` y el PDF, no se elige ninguna: se muestra la discrepancia.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (40 p) | — | ~18 s + 1 s | — | — | — | Sí: gráfico de commits | Bien |
| congelado (76 p) | solo cambia la comunicación | ~35 s + 2,6 s | Sí: la comparación antes de la conclusión | — | Sí: audiencia de negocio | Sí | Bien |
| reorden (95 p) | tres casos de uso; visión artificial | ~43 s + 2,8 s | Sí: el orden viejo antes del nuevo | Sí (visión artificial) | Sí: el problema n.º 1 primero | Sí: tarjetas que se reacomodan | Bien |
| compuertas (119 p) | compuerta de valor; fases 0–3; modo sombra | Compuerta ~9 s + 1 s; fases ~33 s + 1 s; lema y eco ~12 s + 1 s (total **~54 s**) | Sí: se enlaza con la escalera y las bandas | Sí | Sí: gastar solo con evidencia | Sí: camino con compuertas | Bien |
| cifras (114 p) | número supuesto presentado como resultado | ~52 s + 3,2 s | Sí: las cifras en blanco y después llenas | Sí (vuelve a los tres cajones) | Sí: sin cálculo y con discrepancias | Sí: dos hojas superpuestas | Bien |
| piensalo (73 p) | aplicar | ~33 s + 4 s | Sí | — | Sí | Sí | Bien |
| metodo (85 p) | repaso del método (6 pasos) | ~6 s por paso | — | — | — | Sí: 6 tarjetas, 6 s juntas | Bien (consolidación, no conceptos nuevos) |
| outro (68 p) | cierre | — | — | — | — | Sí | Bien |

**Dónde se perdería:** en la lista de fases (cuatro elementos). Mitigación: una frase por fase y el visual del camino; la idea que importa es la compuerta, no el contenido de cada fase. **Qué preguntaría:** "¿entonces el equipo mintió?" El guion evita juzgar: son supuestos presentados como resultados, y la lección es distinguirlos.

### Guion
{{SCRIPT_8}}
