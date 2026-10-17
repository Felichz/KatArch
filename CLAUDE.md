# KatArch

Un único curso en video de arquitectura de software, once lecciones narradas, hecho a partir de lo que dejaron escrito los doce equipos que ganaron las Architecture Katas de O'Reilly (repositorios reunidos en TheKataLog). El sitio es Astro 7 con islas React; se despliega en Vercel desde `main`.

Este archivo fija cómo se escriben y se revisan los guiones. Lo dictó Felix a lo largo de las revisiones del curso; si algo choca con una preferencia nueva de Felix, gana la de Felix. Las reglas de voz generales viven además en `~/.claude/CLAUDE.md` ("Cómo se escribe la narración") y en `.claude/skills/guion-curso/`.

## Dónde está cada cosa

- `cursos/curso-unico/guion/leccionN.md`: guion en prosa de cada lección (con tabla de verificación al final). Las propuestas de cambio van en `leccionN.propuesta.md` hasta que Felix las aprueba.
- `cursos/curso-unico/video/chN/`: `narration.json` (español), `narration.en.json` (inglés), `compositions/*.html` (animaciones), `timing.js`, `index.html`, `renders/` (ignorado).
- `cursos/curso-unico/CANON.md`: hechos y términos, fuente de verdad (nombres de casos, cifras, vocabulario). `carga/v1/RESUMEN.md`: correcciones de hecho.
- `cursos/_corpus/`: fichas, dossiers (`D1`…`D7`), `GUION-MAESTRO.md`, `DISENO-CURSO.md`. Repos fuente en `C:\Users\felix\dev\katarch-corpus`.
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

**Todo se entiende sin contexto.**
- Un término se define en una frase simple antes de su primer uso. Si el término ya apareció en otra lección o en otro sentido, no cuenta como definido: se vuelve a definir donde se usa en el sentido nuevo. Ejemplo que Felix marcó: "modelo gestionado" y "modelo propio" (lección 9, escena `numero`) se usan sin definirse para modelos de IA; solo se definió "gestionado" para el servicio de identidad.
- Una frase suelta que nombra un tema futuro sin contexto ("lo que conviene comprar hecho") confunde: o se explica en el momento o se corta.
- Un caso o equipo se presenta antes de usarse, y la fuente (el concurso, los equipos) se presenta antes del primer caso.
- Al revisar un término, buscar su última mención previa: ¿en este capítulo o en los anteriores? ¿en el mismo sentido?

**Fuentes y jurado.** Los organizadores y jurados se nombran con lo que dice TheKataLog (`profile/README.md`: las katas las presentan Neal Ford y Mark Richards; las juzga un equipo encabezado por Jacqui Read). Lo que no está en un repo (por ejemplo, que Ford y Richards escribieron *Fundamentals of Software Architecture*) es conocimiento externo y se marca así en la tabla de verificación.

**Voz** (ver también `~/.claude/CLAUDE.md`):
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

## Cómo se revisa un guion

La revisión la hace una lectura atenta, a mano, ubicándose como espectador que ve el video una sola vez sin poder volver atrás. **No se usan bucles de revisores que puntúan con números** (se probó con agentes Haiku en doce rondas: el recuento no bajó, osciló ±20 con el mismo texto, y el guion empeoró). Quien juzga es la lectura de Felix. Su QA, escrito mientras mira el video por minutos, es la forma de feedback que mejor funciona: se trabaja punto por punto y se contesta qué cambió.

Lista de lectura, en este orden:

1. **Apertura:** ¿cuánto pasa hasta el primer ejemplo real? ¿Hay preámbulo, temario o aclaraciones antes del caso?
2. **Términos:** para cada término o sigla, ¿dónde se definió por última vez? ¿Se entiende sin haber visto nada antes? ¿Aparece una frase que nombra un tema sin explicarlo?
3. **Casos y equipos:** ¿cada caso está presentado antes de usarse? ¿Se presenta la fuente antes del primer caso?
4. **Contenido que no enseña:** aclaraciones sobre el método, estadísticas de lo que falta, ejemplos defectuosos, datos que no cambian lo que se aprende.
5. **Ejemplos:** ¿el ejemplo que enseña una práctica la hace bien?
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

- Borrador en español: Loquendo "Jorge" por el generador nativo, sin estirar. Producción: ElevenLabs (nunca guardar la API key en archivos). Borrador en inglés: VoxCPM2 local (`C:\Users\felix\qwen-tts`, `en_course.py`).
- Los videos viven en Cloudflare R2 (`katarch-videos`, `PUBLIC_VIDEO_BASE`); `PUBLIC_LOCAL_VIDEO=1` sirve los MP4 locales.
- Pendiente: versión por defecto en inglés (web y videos) con opción de cambiar a español.

## Git

El worktree `katarch-katas` es la rama `cursos/nuevas-katas`; el repositorio principal `katarch` está en `main`. Las publicaciones al sitio salen de `main` (Vercel).
