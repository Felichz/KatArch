# KatArch

Un único curso en video de arquitectura de software, once lecciones narradas, hecho a partir de lo que dejaron escrito los doce equipos que ganaron las Architecture Katas de O'Reilly (repositorios reunidos en TheKataLog). El sitio es Astro 7 con islas React; se despliega en Vercel desde `main`.

Este archivo fija cómo se escriben y se revisan los guiones. Lo dictó Felix a lo largo de las revisiones del curso; si algo choca con una preferencia nueva de Felix, gana la de Felix. Junto con `.claude/skills/guion-curso/` tiene todas las reglas: no depende de configuración personal de ninguna máquina. El repositorio se clona y se trabaja igual en cualquier computadora; nada de rutas absolutas ni de herramientas de una máquina en particular en el código ni en la documentación.

## Lo que manda: enseñar arquitectura de software real

El objetivo del curso es que quien lo vea pueda tomar decisiones de arquitectura reales: elegir cualidades y renunciar a otras, cortar un sistema, decidir cómo se hablan sus partes y qué pasa cuando fallan, cuidar los datos sensibles, comprar o construir, meter un modelo de IA y dejar todo eso escrito (objetivos R1 a R6 y el transversal en `cursos/_corpus/DISENO-CURSO.md`). Las katas son la evidencia: el curso quiere aprovechar todo lo que enseñan, dicho de la forma más clara y ordenada posible.

Todas las reglas de abajo sirven a ese objetivo y se aplican con criterio, no de forma mecánica. Antes de cambiar un guion, la pregunta es qué aprende mejor el espectador con el cambio. Si una regla empuja a un cambio que no mejora lo que se enseña (o que lo empeora), la regla se está aplicando mal. Lecciones aprendidas en las revisiones de Felix:

- **Una decisión de Felix se respeta salvo que una regla de verdad la afecte.** Antes de cambiar algo que Felix eligió en una propuesta (un ejemplo, un ADR, un dato), comprobar que el problema aparece en lo que se narra. Ejemplo: se cambió el ADR de MobilityCorp de la lección 1 porque otro documento del repo tiene una cifra distinta, pero la lección no menciona esa cifra; el cambio dejó un ejemplo más abstracto y se revirtió.
- **No se recorta un hecho con fuente por un tecnicismo.** Si TheKataLog dice que Jacqui Read encabeza el jurado, se dice, aunque en una edición haya competido. Un caso límite va a la tabla de verificación, no justifica quitar el hecho del texto.
- **Mostrar el modelo bueno vale también al describir los cambios.** Si un ejemplo muestra solo parte de una práctica, el guion dice qué muestra ("en el de Farmacy Food se ven bien las tres primeras") y pasa al ejemplo que muestra el resto. No se señala lo que le falta, ni en el texto ni como objetivo de un cambio.
- **Antes de cortar una idea que aporta, buscarle lugar** (ver "Exprimir el jugo de las katas").
- **Las decisiones de contenido las toma Claude.** Qué casos entran o salen, qué ejemplo usa cada idea y en qué orden va el contenido salen del corpus, y Claude los conoce mejor que Felix: se deciden y se explica la razón, sin preguntarle. A Felix se le pregunta solo lo que es suyo (gusto, prioridades del curso, producción). La cantidad de lecciones y la división en videos se deciden después del contenido, pensando en cuánto puede sostener el espectador de una vez.
- **Se verifica contra los doce repositorios, nunca contra una parte.** Si un hecho no se puede comprobar, primero se clonan los repos (abajo) y se busca; recién entonces se marca como hueco.

## Cómo se trabaja: el sombrero que haga falta, como un equipo profesional

Por defecto, Claude trabaja en este proyecto como lo haría un equipo profesional que diseña un curso: antes de decidir algo, se pone el sombrero (o los sombreros) que la decisión requiere y aplica lo que ese oficio sabe, sin esperar a que Felix lo pida. Al explicar una decisión, dice qué sombrero la guió cuando no sea obvio. Si dos sombreros chocan, gana lo que acerca al objetivo del curso (ver arriba).

| Sombrero | Cuándo se pone | Qué aporta |
|---|---|---|
| **Diseño del aprendizaje** (ciencia del aprendizaje, diseño instruccional) | Al organizar el curso, elegir ejemplos, ordenar ideas y partir en videos | Cómo aprende una persona: ver principios abajo |
| **Arquitecto de software senior** | Al decidir qué ideas son arquitectura real y a qué nivel contarlas | Qué decisiones importan en sistemas reales, qué es detalle de implementación, qué sabe ya un desarrollador con un par de años de experiencia |
| **Investigador y verificador de hechos** | Al extraer del corpus y antes de dar un dato por bueno | Cada afirmación contra su fuente, estado Proposed o Accepted, cifras que cierran o no |
| **Guionista y editor** | Al escribir y revisar la prosa | Voz, ritmo, claridad, las reglas de "Cómo queremos los guiones" |
| **Espectador de prueba** | Al revisar un guion o un video | Verlo una sola vez sin poder volver atrás, como alguien que no conoce los casos: dónde se pierde, qué término no entiende, dónde se aburre |
| **Dirección visual** | Al diseñar o revisar animaciones | Que la imagen sostenga lo que dice la voz, una idea por pantalla, con la gramática de `cursos/curso-unico/GUIA-VISUAL.md` (2D, formas y colores fijos, pares lado a lado) |
| **Producción** | Al cortar narración, generar voz, renderizar y publicar | La cadena de producción, la coherencia entre lecciones, lo que se rompe al cambiar un guion |

**Principios del diseño del aprendizaje** que el curso aplica (el plan los usa en `cursos/_investigacion/PLAN-CURSO.md`):
- **Pocas ideas, muchas combinaciones** (Whitehead, *The Aims of Education*): pocas ideas principales, que vuelven combinadas con otras a lo largo del curso. Ninguna se enseña una vez y se abandona.
- **Romance, precisión, generalización** (Whitehead): abrir con el todo para despertar preguntas, recorrer cada parte con rigor, cerrar volviendo al todo con lo aprendido.
- **Pares contrastados** (Gick y Holyoak; Schwartz y Bransford): cada idea con dos casos que comparten el principio y difieren en lo superficial, y la comparación dicha en voz alta. Dos comparados enseñan más que varios en fila.
- **Espaciado e intercalado**: un ejemplo que no forma el par de su bloque reaparece más adelante, cuando la idea vuelve combinada con otra. No se pierde.
- **Carga cognitiva** (Sweller): un caso nuevo entra en su propia frase; como máximo un caso nuevo cada dos minutos; tras una idea pesada, una liviana que la aplica (ver "Carga cognitiva" abajo).
- **Cada ejemplo trae un aspecto nuevo**: si repite lo que otro ya mostró, se corta.

## Cómo se construye el curso: primero los repos, después el curso

El curso sale de la investigación, no al revés. El orden es:

1. **Investigar cada ganador por separado y a fondo.** Se lee todo el repositorio (texto, diagramas, imágenes, PDF, código) para encontrar lo mejor que tiene para enseñar arquitectura real. La pregunta de lectura es general: qué enseña esto sobre cómo se decide una arquitectura y qué tan bien lo muestra. No se lee buscando temas elegidos de antemano: lo que no encaja en un plan previo es justo lo que se perdería.
2. **Verificar** cada hallazgo contra su fuente, con una lectura distinta de la que lo extrajo (sí o no contra el archivo, no puntajes).
3. **Análisis de conjunto.** Con los doce repos investigados, se ve qué enseñan juntos, qué ejemplo es el mejor para cada idea, qué casos conviene que vuelvan y en qué orden se entiende todo. Lo valioso que no entra queda anotado con su razón.
4. **Plan del curso** (`cursos/_investigacion/PLAN-CURSO.md`): organización y contenido, con el par de ejemplos de cada idea y el arco que abre y cierra con el mismo caso. Felix lo aprueba, y recién entonces se escriben los guiones.
5. **División en videos**, cuando el contenido esté escrito, según cuánto puede sostener el espectador de una vez.

La investigación vive en `cursos/_investigacion/` (inventario de cada repo con lo que se leyó, los hallazgos, el análisis de conjunto y `PLAN-CURSO.md`, que fija la organización y el contenido del curso). El material de `cursos/_corpus/` es de una primera vuelta que partió de verdades elegidas antes y casi no miró diagramas; sirve como índice, no como fuente.

## Dónde está cada cosa

- `cursos/curso-unico/guion/leccionN.md`: guion en prosa de cada lección (con tabla de verificación al final). Las propuestas de cambio van en `leccionN.propuesta.md` hasta que Felix las aprueba.
- `cursos/curso-unico/guion-v2/`: el guion completo del curso escrito desde `PLAN-CURSO.md`, por bloques, con narración, diseño visual de cada escena y verificación. Es una propuesta hasta que Felix lo apruebe; no reemplaza todavía a `guion/` ni toca `narration.json`.
- `cursos/curso-unico/GUIA-VISUAL.md`: cómo se ve el curso (principios, gramática visual, comportamientos animados, el diagrama maestro de ClearView y cómo se escribe lo visual en el guion).
- `cursos/curso-unico/video/chN/`: `narration.json` (español), `narration.en.json` (inglés), `compositions/*.html` (animaciones), `timing.js`, `index.html`, `renders/` (ignorado).
- `cursos/curso-unico/CANON.md`: hechos y términos, fuente de verdad (nombres de casos, cifras, vocabulario). `carga/v1/RESUMEN.md`: correcciones de hecho.
- `cursos/_corpus/`: fichas, dossiers (`D1`…`D7`), `GUION-MAESTRO.md`, `DISENO-CURSO.md`. Las rutas que citan (`ADR/ADR-011…md`, `4.ADRs/003…`) son relativas a `katas-src/<Repo>/`.
- `katas-src/` (ignorado por git): los repositorios de los doce ganadores y el perfil de TheKataLog (`katas-src/.github/profile/README.md`: presentadores y jurado). Se crea y se actualiza con `node scripts/clone-katas.mjs` (`--shallow` para clonar sin historia). La lista sale de `WINNERS` en `src/video/meta.ts`. Correrlo antes de revisar o escribir un guion.
- Sitio: `src/video/meta.ts` (curso, casos, ganadores), `src/video/courses/curso.json` (generado con `node scripts/build-video-data.mjs curso`), `src/components/video/`.

## Cómo queremos los guiones

**Orden de trabajo.** Primero se escribe prosa corrida en `guion/leccionN.md`, Felix la lee y la aprueba, y solo entonces se corta en `narration.json` y `narration.en.json`, se genera la voz y se re-anclan las animaciones. Un cambio grande de un guion se propone en un archivo aparte (`.propuesta.md`) antes de tocar la narración.

**Qué se quiere enseñar manda.** Cada minuto tiene que acercar al espectador a lo que el curso quiere enseñar. Los repositorios son evidencia, no el esqueleto. No se narra cronología del equipo, reversiones ni detalles que no cambien lo que se aprende de arquitectura.

**Ir al grano.**
- Al caso concreto cuanto antes: el primer ejemplo real llega en menos de un minuto. Nada de temario, ruta ni "qué vas a poder hacer" antes del primer ejemplo (el temario ya está en la página de inicio).
- El concepto abstracto va después del ejemplo que lo ilustra, no antes.
- Si un párrafo no enseña lo que queremos enseñar, se corta, aunque sea cierto.

**Nada de meta-explicaciones sobre el material.** No se aclara cómo hay que leer los ejemplos ("eso es un cálculo, no una medición", "varios ganadores hacen lo mismo porque comparten plantillas", "son diseños en papel"). La introducción dice qué es el material y de dónde sale (concurso, organizadores, jurado, catálogo) y basta.

**Mostrar el modelo bueno, no el defecto.** Para enseñar cómo se hace algo se usa el ejemplo que lo hace bien (un ADR completo, con requisito citado por su número) y se dice por qué importa. No se muestra un ejemplo al que le falta la pieza ni se construye una explicación alrededor de lo que falta. No se dice que "a la mayoría de los equipos les faltó X" ni se usan estadísticas de carencias.

**El ejemplo más simple que enseñe lo mismo.** Si un ADR o un ejemplo obliga a agregar complejidad que no hace falta para la idea (un caso nuevo que presentar, términos extra, cifras que no coinciden entre documentos, salvedades, un estado Proposed que hay que aclarar), se busca otro ADR o ejemplo que enseñe lo mismo sin ese peso, aunque el primero sea correcto o más vistoso. Se prefiere, en este orden, un caso recurrente ya presentado, un ADR aceptado y un ejemplo sin aclaraciones. Solo se acepta la complejidad extra cuando no hay otro ejemplo en el corpus que enseñe la idea, y entonces se anota en la tabla de verificación por qué se eligió. La complejidad se mide en lo que se narra: un ADR que tiene un defecto en otro documento sirve igual si la lección no necesita mencionarlo.

**Exprimir el jugo de las katas, sin sumar complejidad.** Antes de cortar una idea que aporta, se busca dónde cuenta con menos fricción: en la lección y el momento donde ya está el contexto que necesita, y si se puede, con un caso que ya está en pantalla en vez de uno nuevo. Ejemplo: en la lección 2, la idea de Hey Blue! (un estilo con mala nota en una cualidad se puede usar igual, atendiéndola en la parte que la necesita) se cuenta con ClearView, que ya estaba en la lección y hace lo mismo. Se corta solo lo que no acerca al objetivo o lo que no encuentra un lugar sin complejidad extra.

**Todo se entiende sin contexto.**
- Un término se define en una frase simple antes de su primer uso. Si el término ya apareció en otra lección o en otro sentido, no cuenta como definido: se vuelve a definir donde se usa en el sentido nuevo. Ejemplo que Felix marcó: "modelo gestionado" y "modelo propio" (lección 9, escena `numero`) se usan sin definirse para modelos de IA; solo se definió "gestionado" para el servicio de identidad.
- Una frase suelta que nombra un tema futuro sin contexto ("lo que conviene comprar hecho") confunde: o se explica en el momento o se corta.
- Un caso o equipo se presenta antes de usarse, y la fuente (el concurso, los equipos) se presenta antes del primer caso.
- Al revisar un término, buscar su última mención previa: ¿en este capítulo o en los anteriores? ¿en el mismo sentido?

**Fuentes y jurado.** Los organizadores y jurados se nombran con lo que dice TheKataLog (`profile/README.md`: las katas las presentan Neal Ford y Mark Richards; las juzga un equipo encabezado por Jacqui Read; se la nombra como jurado aunque haya integrado un equipo en una edición). Lo que no está en un repo (por ejemplo, que Ford y Richards escribieron *Fundamentals of Software Architecture*) es conocimiento externo y se marca así en la tabla de verificación.

**Voz:**
- Una sola voz que explica; sin opiniones ni valoraciones del narrador; hecho, deducción e imagen se distinguen.
- Frases de hasta unas 28 palabras. Se parten las frases con varias cifras o varios nombres.
- Sin pausas de "piénsalo" ni preguntas al espectador. La explicación fluye de punta a punta. Las preguntas que el narrador se hace y responde en el mismo párrafo sí valen.
- Sin fechas exactas ni años ("en octubre de 2020"); suenan a arqueología. A lo sumo, un rango del material en la introducción.
- Sin calificativos sin base ("lo más importante", "precioso"), sin tics ("no es X, es Y" repetido, tríadas por reflejo, repasos numerados dichos en voz alta, "Imagina…" como muletilla).
- "O sea" y otros conectores de habla solo cuando aportan; el bucle de revisores multiplicó el "o sea" de relleno por catorce.
- Los cierres no empiezan siempre igual y no anuncian el próximo capítulo.

**Carga cognitiva** (criterio de lectura, no puntaje):
1. Una idea difícil llega con el caso, el término y la herramienta ya presentados.
2. Un caso o término nuevo entra en una frase simple (quién es, qué hace) antes de usarse en un argumento.
3. Tras una idea pesada va una liviana que la aplica a un caso conocido.
4. Como máximo un caso nuevo cada dos minutos. Los cinco casos recurrentes (Farmacy Food, MonitorMe, ClearView, Sysops Squad, MobilityCorp) cargan el curso; un caso invitado entra solo si la idea lo exige, y se presenta en su propia frase.

## Cómo se hace un bloque del curso v2

Cada bloque sigue `cursos/curso-v2/PROCESO.md`: borrador, revisión secuencial a mano con un sombrero por lectura y su lista de chequeo (diseño del aprendizaje, arquitecto senior, verificador, guionista, espectador de prueba, dirección visual, producción), consolidación por Claude, aprobación de Felix, producción (que empieza por describir la versión ideal del video, plano por plano, en `video/bNN/IDEAL.md`, y termina comparando cada captura contra ella) y un paso final de repaso y mejora que suma a las listas lo que se escapó. La revisión no se delega en scripts. La tabla de la revisión queda al final del guion. Felix aprueba el guion revisado y comenta después de ver el video; sus comentarios vuelven a entrar por la consolidación.

## Cómo se revisa un guion

La revisión la hace una lectura atenta, a mano, ubicándose como espectador que ve el video una sola vez sin poder volver atrás. **No se usan bucles de revisores que puntúan con números** (se probó con agentes Haiku en doce rondas: el recuento no bajó, osciló ±20 con el mismo texto, y el guion empeoró). Quien juzga es la lectura de Felix. Su QA, escrito mientras mira el video por minutos, es la forma de feedback que mejor funciona: se trabaja punto por punto y se contesta qué cambió.

Lista de lectura, en este orden:

1. **Apertura:** ¿cuánto pasa hasta el primer ejemplo real? ¿Hay preámbulo, temario o aclaraciones antes del caso?
2. **Términos:** para cada término o sigla, ¿dónde se definió por última vez? ¿Se entiende sin haber visto nada antes? ¿Aparece una frase que nombra un tema sin explicarlo?
3. **Casos y equipos:** ¿cada caso está presentado antes de usarse? ¿Se presenta la fuente antes del primer caso?
4. **Contenido que no enseña:** aclaraciones sobre el método, estadísticas de lo que falta, ejemplos defectuosos, datos que no cambian lo que se aprende.
5. **Ejemplos:** ¿el ejemplo que enseña una práctica la hace bien? ¿Trae complejidad que la idea no necesita (caso nuevo, términos, cifras contradictorias, salvedades, estado Proposed)? Si la trae, ¿hay en el corpus otro ADR o ejemplo que enseñe lo mismo sin ella? Si lo hay, se cambia.
6. **Voz:** opiniones, fechas, años, calificativos, tics, frases de más de 28 palabras, "o sea" de relleno.
7. **Hechos:** cada cifra, nombre y cita contra la fuente; lo pendiente de comprobar va solo en la tabla de verificación, nunca dentro del texto narrado. Nunca narrar como decidido lo que el repositorio marca como Proposed. Mantener los ids de escena para no romper las composiciones.
8. **Lectura seguida de las once lecciones:** los tics nuevos aparecen entre lecciones. Una fórmula, como mucho una vez en el curso.

Herramientas de apoyo (no jueces): `node .claude/skills/guion-curso/check.mjs <guion.md>` mide palabras, duración, frases largas, tics y dos puntos; `grep` de años y meses; `carga/check-reglas.cjs` solo cuenta violaciones y no decide.

## Revisión del video

- La animación se ancla a palabras de la narración (`W(línea, 'prefijo')`, `L(i)`), nunca a segundos fijos. Tras cambiar un guion hay que re-anclar y correr `npx hyperframes@0.8.139 check` (0 errores). No ejecutar `hyperframes preview`: reescribe las composiciones.
- Sin pantallas vacías al comienzo de una escena y sin silencios largos (más de unos 3,8 s): `blank-check.sh N MIN` y `render-queue.sh`.
- Las tarjetas de título se quedan en pantalla el tiempo de leerse y siguen la línea que las introduce. Un título gigante que dura uno o dos segundos y desaparece se ve raro (queja de Felix en la lección 1).
- Renders a 30 fps (`--quality looks --fps 30`). Mirar las capturas (`snapshot`) antes de dar una escena por buena.

## Voz y despliegue

- Borrador en español: Loquendo "Jorge" por el generador nativo, sin estirar. Producción: ElevenLabs (nunca guardar la API key en archivos). Borrador en inglés: VoxCPM2 local (`en_course.py`). Las herramientas de voz local viven fuera del repo; `seq.sh` y `carga/tiempos.mjs` reciben su carpeta en la variable `TTS_DIR`.
- Los videos viven en Cloudflare R2 (`katarch-videos`, `PUBLIC_VIDEO_BASE`); `PUBLIC_LOCAL_VIDEO=1` sirve los MP4 locales.
- Pendiente: versión por defecto en inglés (web y videos) con opción de cambiar a español.

## Git

La rama `cursos/nuevas-katas` tiene los cursos en preparación (se suele trabajar en un worktree aparte); `main` tiene el curso publicado. Las publicaciones al sitio salen de `main` (Vercel).
