# Brief: pasada visual de una lección (pulido antes del render)

Curso en video de KatArch (HyperFrames: HTML + GSAP "seekable"), en español neutro. Worktree `C:\Users\felix\dev\katarch-katas`, curso en `cursos/curso-unico/`. **Trabaja solo en `cursos/curso-unico/video/chN/compositions/`.** No toques la carpeta `C:\Users\felix\dev\katarch-katas\video\` (es otro curso).

El contenido de cada escena ya está bien y coincide con la voz. Esta pasada es **solo visual**: no cambies qué se dice ni qué datos se muestran, y deja cada cue anclado a la misma palabra. Solo puedes moverlo unas décimas de segundo si hace falta para que algo no se pise.

**Mientras trabajas se está generando la voz de la lección.** `timing.js` e `index.html` pueden cambiar en cualquier momento: pasan de tiempos estimados a tiempos reales. Es normal. Vuelve a leer `timing.js` justo antes de elegir los tiempos de cada tanda de capturas, y no edites `timing.js`, `index.html`, `narration.json` ni los guiones.

## Qué arreglar en cada escena

1. **Cajas vacías de espera.** Varias escenas muestran rectángulos punteados vacíos (`.sl` con `border: 2px dashed`, o tarjetas sin texto) durante segundos, antes de que llegue el contenido. Se ve como una página que no cargó. Corrígelo así:
   - Si es un hueco que solo espera contenido, sácalo y deja que cada tarjeta aparezca entera cuando la voz la nombra.
   - Si las cajas comunican algo (por ejemplo "son cuatro opciones" o "son cinco casos"), muéstralas con un rótulo mínimo desde el principio, como el número, el ícono o el nombre, para que nunca estén vacías.
   - `.tc--ext` (borde punteado de "sistema externo") es un significado del kit, no un hueco: no lo toques.
2. **Pantallas cargadas arriba.** El contenido tiene que estar centrado verticalmente en la zona útil, de y = 120 a y = 880. Si una pantalla deja vacía la mitad inferior, baja el bloque o agrándalo. Una idea grande por pantalla, con tamaño:
   - Títulos de 52 a 64 px.
   - Cifras protagonistas de 120 px o más.
   - Tarjetas de al menos 320 px de ancho cuando hay 3 o 4.
3. **Texto chico.** Ningún texto que se tenga que leer por debajo de 24 px. Texto de tarjetas de 26 px o más. Las fuentes (`.src`) pueden quedar en 20–22 px. Si al agrandar algo no entra, acorta el diseño (menos columnas o dos filas), no el texto.
4. **Pantallas casi vacías.** Si entre dos ideas queda la pantalla vacía, o con un solo rótulo chico, más de 2 s, haz que lo anterior se quede hasta que entre lo siguiente, o adelanta lo siguiente a la primera palabra de su línea.
5. **Superposiciones y cortes.** Nada se pisa, nada se corta en los bordes, y la franja inferior (desde y = 900) queda libre para el subtítulo.

## Cómo verificar
- `npx --yes hyperframes@0.8.139 check` en `video/chN` tiene que dar 0 errores. Los avisos "info" de layout se miran; "connector_orphan", el warning de `#chrome` y los solapes durante un crossfade son conocidos.
- Capturas: toma 3 por escena, al 20 %, al 55 % y al 90 % de la escena según `timing.js`, con `npx --yes hyperframes@0.8.139 snapshot --at "t1,t2,..." --no-end --timeout 25000 -o snapshots/pulido`. **Mira** las `contact-sheet-*.jpg` con la herramienta de leer imágenes.
- Haz una pasada de arreglos y una de confirmación, no más.

## Reglas que costó aprender (no repetir)
- **Nunca corras `hyperframes preview`**: reescribe todas las composiciones.
- No generes voz ni renderices. No toques `C:\Users\felix\qwen-tts` ni `seq.sh`.
- Sin transforms CSS en elementos que anima GSAP. `fromTo` pinta su estado inicial antes de tiempo, así que usa los helpers del kit (`pop`, `fade`, `hide`, `dim`, `to`, `count`, `draw`).
- Un `pop()` sobre el objeto que devuelve `node()` necesita `.e`.
- Los bloques `title()` y `next()` se montan fuera del root de la escena, así que el CSS `#escena .x` no los alcanza.
- Destructura de `K` todos los helpers que uses.
- Los `.html` pueden tener saltos de línea CRLF. Para editar, usa Read/Edit/Write, no `sed` ni `node -e`.
- No borres carpetas con `rm -rf`. Para capturas nuevas, usa otro nombre de carpeta.

## Qué entregar (respuesta final, breve)
- Por escena, una línea con lo que cambió, o "sin cambios".
- Resultado del último `check` y lo que viste en las capturas de confirmación.
