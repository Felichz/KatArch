# Brief: poner al día las animaciones de una lección después de reescribir su guion

Curso en video de KatArch (HyperFrames: HTML + GSAP "seekable"), en español neutro. Enseña arquitectura de software a partir de los 12 equipos que ganaron las O'Reilly Architecture Katas. Worktree `la raíz del repositorio`, curso en `cursos/curso-unico/`.

**Trabaja solo en `cursos/curso-unico/video/chN/`.** Hay otra carpeta `video/chN/` (otro curso, con archivos versionados): no la toques ni corras nada adentro.

## Qué pasó
El guion de la lección (`guion/leccionN.md`) se reescribió para que cada párrafo sirva a los objetivos del curso: se sacaron fechas, recuentos del proceso de los equipos, cifras que no cambian ninguna decisión, repeticiones entre lecciones y temas fuera de objetivo. `video/chN/narration.json` y `video/chN/timing.js` (tiempos estimados) ya están regenerados desde el guion nuevo. Las composiciones de `video/chN/compositions/` son las del guion **viejo**: muchas tienen cues que ya no existen (`cue not found`) y textos en pantalla de cosas que la voz ya no dice.

## Qué hacer
1. Lee `guion/leccionN.md` completo (prosa y tabla de verificación), `video/chN/narration.json`, y `video/chN/assets/kit.js` si necesitas recordar los helpers.
2. Corre `npx --yes hyperframes@0.8.139 check` en `video/chN` para ver qué escenas fallan.
3. **Revisa todas las escenas, no solo las que fallan.** Para cada una, compara lo que muestra la pantalla con lo que dice ahora la voz, línea por línea:
   - Lo que la voz ya no dice se saca de la pantalla (una fecha, un equipo, una cifra, un paso del proceso).
   - Lo que la voz dice nuevo y tiene peso (una cifra, una cita, una lista de opciones, partes que se hablan) se muestra.
   - Cada cue se ancla a una palabra que exista en la línea nueva: `W(línea, 'prefijo', n?)`, `L(i)`, `LE(i)`. Nunca segundos fijos. `W` busca por prefijo entre las palabras del `text` de la línea, normalizado sin tildes ni signos; `n` es la ocurrencia, desde 0. Si una escena ahora tiene menos líneas, ningún cue puede apuntar a una línea que no existe.
   - Lo que sigue valiendo y está bien hecho se conserva: reescribe lo que haga falta, no más.
4. Reglas de contenido en pantalla:
   - **Sin fechas ni años** (nada de "2020", "otoño de…", "en marzo"). La única excepción es el rango "2020–2025" de la introducción de la lección 1, si la voz lo dice.
   - Nada de "piénsalo", anillos de cuenta regresiva ni preguntas al espectador.
   - Textos en español neutro (tuteo), cortos y sin opiniones. Las citas de los repos van en inglés, entre comillas, con equipo y archivo en pequeño (`.src`).
   - Los datos tienen que coincidir con el guion y su tabla de verificación.
5. **Escena final:** la tarjeta `next()` usa `k: 'Próxima lección · N+1'` y el título de la lección siguiente (te lo da el pedido). Si tiene `q`, que diga algo que la lección siguiente realmente trata. La lección 11 no tiene siguiente.
6. **Primera escena (o segunda, si el gancho ocupa dos):** el `title()` de la lección se mantiene con `k: 'Lección N'` y el título de `narration.json`.
7. Puedes cambiar el subtítulo (`text`) de una línea de `narration.json` para mostrar cifras con dígitos **solo si agregas `say` con el texto original exacto**. Si lo haces, corre `node tools/timing.mjs estimate` en `video/chN`. Nunca cambies lo que se dice, los ids, la cantidad u orden de escenas o de líneas, ni `pauseAfter`.
8. Verifica:
   - `check` hasta 0 errores. Los avisos "info" de layout se miran; "connector_orphan" y el warning de `#chrome` son conocidos.
   - Después, capturas de 2 o 3 tiempos por escena (mira `timing.js`) con `npx --yes hyperframes@0.8.139 snapshot --at "t1,t2,..." --no-end --timeout 25000 -o snapshots/qa`. **Mira** las `contact-sheet-*.jpg` con la herramienta de leer imágenes.
   - Arregla superposiciones, textos cortados, pantallas vacías por más de unos segundos y textos que no coincidan con la voz. Haz una pasada de arreglos y una de confirmación, no más.

## Reglas que costó aprender (no repetir)
- **Nunca corras `hyperframes preview`**: reescribe todas las composiciones.
- No generes voz ni renderices. No toques `$TTS_DIR`, `seq.sh`, `index.html` (lo arma `timing.mjs`) ni los guiones `.md`.
- Sin transforms CSS en elementos que anima GSAP. `fromTo` pinta su estado inicial antes de tiempo: usa los helpers del kit (`pop`, `fade`, `hide`, `dim`, `to`, `count`, `draw`).
- Un `pop()` sobre el objeto que devuelve `node()` necesita `.e`.
- Los bloques del kit (`title`, `next`) se montan fuera del root de la escena, así que el CSS `#escena .x` no los alcanza.
- Destructura de `K` todos los helpers que uses. Si olvidas uno, la escena se rompe sin avisar.
- Los `.html` pueden tener saltos de línea CRLF. Para editar, usa Read/Edit/Write, no `sed` ni `node -e`.
- Íconos: `<span data-icon="nombre">`, solo con nombres que existan en `assets/icons.js`.
- Pantalla de 1920×1080:
  - Contenido entre y = 120 e y = 880; la franja inferior es del subtítulo.
  - Títulos de 52 a 64 px, cifras grandes de 120 px o más, texto de tarjetas de 26 px o más.
  - Una idea grande por pantalla, no cuatro cajas chicas.

## Qué entregar (respuesta final, breve)
- Por escena, una línea con lo que cambió: re-anclada, contenido actualizado o sin cambios.
- Resultado del último `check` y lo que viste en las capturas.
- Cualquier dato del guion que no pudiste representar o que te pareció dudoso.
