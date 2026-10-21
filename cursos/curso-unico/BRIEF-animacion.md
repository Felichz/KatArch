# Brief: componer las animaciones de una lección del curso único de KatArch

Curso en video (HyperFrames: HTML + GSAP "seekable"), en español neutro, que enseña arquitectura de software a partir de los 12 equipos que ganaron las O'Reilly Architecture Katas. Worktree `la raíz del repositorio`, curso en `cursos/curso-unico/`. Cada lección es un proyecto en `video/chN/` con su `narration.json` (escenas y líneas ya cortadas desde `guion/leccionN.md`) y el kit copiado. **No existen composiciones: las creas desde cero.**

## Lee antes de empezar
- `guion/leccionN.md`: la prosa completa y su tabla de verificación (qué se dice y de dónde sale cada dato). Lo que pongas en pantalla tiene que coincidir con eso.
- `video/chN/narration.json` y `video/chN/timing.js` (tiempos estimados).
- `video/chN/assets/kit.js` (el kit completo: `KIT.scene(id)` y sus helpers) y `assets/kit.css`.
- Ejemplos del mismo kit, ya terminados, para imitar el estilo y el uso de los helpers: `cursos/five-nines/video/ch1-lecture/compositions/` (sobre todo `cifra.html`, `numeros.html`, `outro.html`) y `cursos/five-nines/video/ch4-lecture/compositions/`, `ch6-lecture/compositions/`. Mira cómo se anclan los cues, cómo se arman tarjetas, barras, chips, nodos con cables, citas (`.hand`, `.hd`, `.src`, `.card`, `.tag`), y cómo se usan `title()` y `next()`.
- `video/PEDAGOGY.md` (en `video/PEDAGOGY.md`): el visual sostiene lo que dice la voz, una idea por pantalla, nada de texto que compita con la narración. **Ignora todo lo de la pausa "piénsalo", `think()` y `ring()`: el curso ya no tiene pausas ni preguntas al espectador.**

## Qué hacer en `video/chN/`
1. Una composición por escena: `compositions/<id>.html`, con el mismo esqueleto que los ejemplos (`<template>`, `<style>` con selectores `#<id> ...`, `<div id="<id>" class="scene" data-composition-id="<id>" data-width="1920" data-height="1080">`, `<div class="scene-bg"></div>`, y un `<script>` con `KIT.scene('<id>')` que termina en `K.done()`). El esqueleto de `index.html` ya lista las escenas entre los marcadores `<!-- film -->`; no lo toques salvo que falte una escena.
2. Las animaciones se anclan a palabras de la narración con `W(línea, 'prefijoDePalabra', n?)`, `L(i)` (inicio de línea), `LE(i)` (fin de línea); nunca segundos fijos. `W` busca entre las palabras del `text` de la línea (normalizado sin tildes ni signos), por prefijo; `n` es la ocurrencia (desde 0). Cada elemento aparece cuando la voz lo nombra; los elementos que ya no se nombran se atenúan (`dim`) o se ocultan (`hide`) antes de la idea siguiente, para que la pantalla no se llene.
3. **Qué mostrar.** El curso vive de casos reales: muestra el dato concreto que dice la voz (la cifra, la cita del repo, la tabla de opciones, el diagrama de las partes). Las citas textuales de los repos van en su idioma original (inglés), entre comillas, con el nombre del equipo y el archivo en pequeño (`.src`), y si hace falta una línea corta en español debajo. Diagramas con `node()`/`wire()`/`chip()` del kit cuando la voz describe partes que se hablan. Textos de pantalla en español neutro (tuteo, sin "vos" ni "acá"), cortos, sin opiniones.
4. **Primera escena:** muestra al final el título de la lección con `title({ k: 'Lección N', h: '<título de narration.json>', s: 'KatArch · el curso de los ganadores de las Architecture Katas' })` y `T.show(...)`, cuando termina el gancho y la pregunta, como en `cursos/five-nines/video/ch1-lecture/compositions/cifra.html`. Si el gancho está en la primera escena y la pregunta en la segunda, pon el título al final de la segunda.
5. **Última escena:** termina con la tarjeta de la lección siguiente con `next()` (mira cómo se usa en los `outro.html` de Five Nines). El título siguiente te lo da el pedido. La lección 11 no tiene siguiente: cierra con "KatArch" y la frase final en pantalla.
6. Puedes cambiar el **subtítulo** de una línea (`text`) para mostrar cifras con dígitos (por ejemplo "15 USD" en lugar de "quince dólares") **solo si agregas `say` con el texto original exacto**. Nunca cambies lo que se dice, ni ids, ni cantidad u orden de escenas, ni la partición en líneas, ni `pauseAfter`.
7. Verifica: `npx --yes hyperframes@0.8.139 check` hasta 0 errores (los avisos "info" de layout se miran; "connector_orphan" y el warning de `#chrome` son conocidos). Después capturas: 2 o 3 tiempos por escena (lee `timing.js`), `npx --yes hyperframes@0.8.139 snapshot --at "t1,t2,..." --no-end --timeout 25000 -o snapshots/qa`, y **mira** las `contact-sheet-*.jpg` con la herramienta de leer imágenes. Arregla superposiciones, textos cortados, pantallas vacías largas, textos que no coinciden con la voz. Una pasada de arreglos y una de confirmación; no más.

## Reglas que costó aprender (no repetir)
- **Nunca corras `hyperframes preview`**: reescribe todas las composiciones.
- No generes voz ni renderices, ni toques nada de `$TTS_DIR` ni `seq.sh`.
- Sin transforms CSS en elementos que anima GSAP; `fromTo` pinta su estado inicial antes de tiempo (usa los helpers `pop`, `fade`, `hide`, `dim`, `to`, `count`, `draw` del kit).
- Un `pop()` sobre el objeto que devuelve `node()` necesita `.e`.
- Los bloques del kit (`title`, `next`, `recap`, `answers`) se montan fuera del root de la escena: el CSS `#escena .x` no los alcanza salvo que los muevas adentro.
- Destructura de `K` todos los helpers que uses (`const { tl, W, L, LE, pop, hide, dim, to, fade, count, el, IC, $, title, next, node, wire, chip } = K;`); olvidar uno rompe la escena en silencio.
- Los `.html` pueden tener saltos de línea CRLF: al reemplazar texto con scripts, no incluyas `\n` en el texto buscado. En Bash, no metas código JS con `$(...)` dentro de `node -e "..."`. Para editar, usa Read/Edit/Write.
- Íconos: `<span data-icon="nombre">` con nombres que existan en `assets/icons.js` (míralo); si necesitas otro, no lo inventes, usa uno parecido.
- Pantalla 1920×1080: deja márgenes de al menos 120 px y no pongas texto de cuerpo por debajo de 22 px; el subtítulo lo dibuja el reproductor abajo, así que deja libre la franja inferior (desde y = 900).

## Qué entregar (respuesta final, breve)
- Escenas creadas y qué muestra cada una en una línea.
- Resultado del último `check` y lo que viste en las capturas.
- Cualquier dato del guion que no pudiste representar o que te pareció dudoso.

## Lo que dejó la revisión del piloto (lección 1)
- **Usa toda la pantalla.** En el piloto, casi todo quedó apilado en la mitad superior, con tarjetas chicas y la mitad de abajo vacía. Centra el contenido verticalmente en la zona útil (de y = 120 a y = 880) y dale tamaño: títulos de 52 a 64 px, cifras grandes de 120 px o más, texto de tarjetas de 26 px o más, tarjetas de al menos 320 px de ancho cuando hay 3 o 4. Una pantalla con una sola idea grande se lee mejor que cuatro cajas pequeñas.
- **Nada de pantallas casi vacías durante más de unos segundos.** Si la voz cuenta una escena (una fecha, un equipo), muestra algo con peso visual: la cifra, el nombre del caso con su ícono grande, la cita.
