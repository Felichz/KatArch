# Curso v2: cómo se sigue

Este archivo es la entrada. Dice en qué estado está cada bloque, cómo se prepara una máquina nueva y qué comando corre cada paso. El proceso completo, con sus revisiones y listas de chequeo, está en `PROCESO.md`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Plan del curso: bloques, pares de casos, familias, preguntas | `cursos/_investigacion/PLAN-CURSO.md` |
| Proceso de un bloque (escribir, revisar, guion visual, producir, repasar) | `cursos/curso-v2/PROCESO.md` |
| Guiones en prosa, por bloque | `cursos/curso-unico/guion-v2/NN-slug.md` |
| Qué trae el espectador al entrar a cada bloque | `cursos/curso-unico/guion-v2/ACTO1-CONTINUIDAD.md` |
| Gramática visual y estilo "Pizarra y forma" | `cursos/curso-unico/GUIA-VISUAL.md` |
| Kit de animación compartido | `cursos/curso-v2/video/kit/` (API de tiza: `video/kit/TIZA.md`) |
| Plantilla del guion visual | `cursos/curso-v2/video/kit/IDEAL.plantilla.md` |
| Un bloque producido | `cursos/curso-v2/video/bNN/` (`IDEAL.md`, `narration.json`, `compositions/`, `timing.js`, `voice.json`, `assets/voice/`) |
| Lista de bloques y su estado en el sitio | `src/curso/curso.ts` (`etapas`: guion, visual, voz, video) |
| Datos del sitio generados desde los renders | `node scripts/build-curso-data.mjs` → `src/curso/bloques.json`, `public/curso/bNN.webp`, `public/local-video/curso/bNN.mp4` |

El número de bloque (`NN`) es el `n` de `src/curso/curso.ts`, y el slug también sale de ahí. La carpeta de video es `video/bNN` con ese mismo número.

## Estado (2026-10-22)

**Los 17 bloques están publicados en los dos idiomas.** Voz en español de producción (ElevenLabs, Pablo Macias, `eleven_v4`, unos 65.400 caracteres), voz en inglés de borrador (VoxCPM2 local, voz `aiden-en2`, con `C:\Users\felix\qwen-tts\v2_en.py` y `tools/importar-voz.mjs`), 34 renders (`tools/render-cola.sh es|en`, ninguno con silencios largos) subidos a R2 como `curso/bNN.mp4` y `curso/bNN.en.mp4` (`tools/subir-r2.sh`). El sitio abre en `/curso/`; cada bloque tiene un selector Español / English. Falta: la aprobación de Felix de los guiones 3 a 16 (cambiar uno ahora implica volver a pagar la voz de esas escenas) y una voz de producción en inglés. La tabla de abajo es el estado previo, por bloque.

| # | Bloque (slug) | Guion | Guion visual (`IDEAL.md`) | Video | Falta |
|---|---|---|---|---|---|
| 0 | Apertura (`apertura`) | `00-apertura.md`, aprobado | escrito | render hecho, en el estilo anterior (`dg.js`, no tiza) | Pasarlo a "Pizarra y forma", para que el curso abra en el mismo estilo que sigue (recomendado, no hecho) |
| 1 | Qué es una decisión de arquitectura (`decision`) | `01-decision.md`, revisado por sombreros | escrito, revisado (3 vueltas), comparado ✓ | render del 2026-10-20 02:36, revisado | **Un render más**: el último no tiene la corrección del kit que hace llegar el relleno de las hojas grandes después del trazo (en la escena 5, la hoja FR#2L se ve como un rectángulo oscuro medio segundo). Después, hoja de cuadros y `build-curso-data.mjs` |
| 2 | Del requisito a las cualidades (`cualidades`) | `02-cualidades.md`, revisado | escrito, revisado (2 vueltas), comparado ✓ | render final del 2026-10-20 10:51, revisado entero | Nada (salvo voz de producción) |
| 3 | Comprobar con una cuenta (`cuenta`) | `03-cuenta.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado (2 vueltas), animado y comparado con capturas (normales e inversas) ✓ | — | Voz de borrador o de producción, render (4.8) y sitio (4.9) |
| 4 | El estilo (`estilo`) | `04-estilo.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado (2 vueltas), animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 5 | Dónde se corta un sistema (`corte`) | `05-corte.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado (2 vueltas), animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 6 | guardar-datos | `06-guardar-datos.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 7 | mover-y-procesar | `07-mover-y-procesar.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 8 | donde-corre | `08-donde-corre.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 9 | el-borde | `09-el-borde.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 10 | cuando-algo-falla | `10-cuando-algo-falla.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 11 | identidad-y-datos-sensibles | `11-identidad-y-datos-sensibles.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 12 | ver-que-pasa | `12-ver-que-pasa.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 13 | comprar-construir-crecer | `13-comprar-construir-crecer.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 14 | ia-en-el-sistema | `14-ia-en-el-sistema.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 15 | cambiar-sin-romper | `15-cambiar-sin-romper.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |
| 16 | cierre | `16-cierre.md`, revisado por sombreros; **falta la aprobación de Felix** | escrito, revisado, animado y comparado con capturas (normales e inversas) ✓ | — | Voz, render (4.8) y sitio (4.9) |

Para todos: la voz de producción (ElevenLabs), subir los MP4 a R2 y publicar los hace Felix (ver "Lo que hace solo Felix").

### Los guiones del acto 2

`PLAN-CURSO.md` reorganizó el territorio en diez regiones (bloques 6 a 15), con una forma fija por bloque: un caso que abre, el problema en una frase, las familias en el mapa, un par de ganadores, la pregunta que decide y el mapa que se actualiza. Los bloques 6 a 16 ya están escritos con esa forma. Los guiones de la organización anterior, que dieron el material (pares, narración, verificación), están en `guion-v2/v1/`:

| Bloque nuevo (`curso.ts`) | Material de la versión anterior |
|---|---|
| 6 `guardar-datos` | `v1/06-datos.md` |
| 7 `mover-y-procesar` | `v1/07-comunicacion.md` |
| 8 `donde-corre` | nuevo (ver la fila 8 del plan) |
| 9 `el-borde` | nuevo; algo de `v1/07-comunicacion.md` |
| 10 `cuando-algo-falla` | `v1/08-fallo.md` |
| 11 `identidad-y-datos-sensibles` | `v1/09-sensibles.md` |
| 12 `ver-que-pasa` | nuevo |
| 13 `comprar-construir-crecer` | `v1/10-comprar.md` (más las premisas que envejecen: DataDog) |
| 14 `ia-en-el-sistema` | `v1/11-ia.md` |
| 15 `cambiar-sin-romper` | `v1/12-cambiar.md` |
| 16 `cierre` | `v1/13-cierre.md` |

Convención: el guion nuevo se llama `guion-v2/NN-<slug de curso.ts>.md`. Cuando se escribe, el archivo viejo que le dio el material se mueve a `guion-v2/v1/` en el mismo cambio, para que no queden dos archivos con el mismo número. El orden recomendado es el del curso (3, 4, 5, después 6 a 16): cada bloque cuenta con lo que presentaron los anteriores, y la nota de continuidad se va llenando en ese orden.

## Preparar una máquina nueva

```bash
git fetch && git switch curso-v2      # la rama con todo el trabajo del curso v2
npm install                           # el sitio (Astro)
node scripts/clone-katas.mjs          # los doce repos en katas-src/ (ignorado); --shallow para clonar sin historia
```

Hace falta:
- **Node** 22 o más nuevo (se trabajó con 24).
- **ffmpeg y ffprobe en el PATH**: el render los usa para mezclar el audio, y la revisión para las hojas de cuadros. En macOS, `brew install ffmpeg`.
- **macOS** para la voz de borrador (`say` y `afconvert`, voz Paulina). En otra plataforma se puede saltar la voz de borrador solo si ya están `voice.json` y `assets/voice/` del bloque (vienen en el repo).
- HyperFrames no se instala: se corre con `npx --yes hyperframes@0.8.139`, siempre esa versión. **Nunca** `hyperframes preview`: reescribe las composiciones.

Lo que no está en el repo (lo ignora git): los renders (`video/bNN/renders/`), las capturas (`snapshots/`), los MP4 locales del sitio (`public/local-video/`) y `katas-src/`. Un render se vuelve a hacer con el comando del paso 4.8; tarda de 45 a 60 minutos por bloque.

**Cuidado en una máquina sin renders:** `build-curso-data.mjs` arma `bloques.json` solo con los bloques que tienen su MP4 en `renders/`. Si se corre sin los renders de los bloques 0 a 2, los saca del sitio. Antes, copiar los MP4 de la otra máquina a `video/bNN/renders/` o volver a renderizar.

## Comandos de cada paso

Desde la raíz del repo, salvo donde dice `cd`. `NN` es el número del bloque y `slug`, el de `curso.ts`.

| Paso de `PROCESO.md` | Comando | Sale |
|---|---|---|
| 1–3. Guion y revisión | a mano, en `guion-v2/NN-slug.md`; verificación contra `katas-src/` | el guion con sus tablas de verificación y de revisión |
| 4.1 Narración | `node cursos/curso-v2/tools/guion-a-narracion.mjs cursos/curso-unico/guion-v2/NN-slug.md cursos/curso-v2/video/bNN slug` | `bNN/narration.json` (crea la carpeta si falta) |
| 4.2 Kit | `node cursos/curso-v2/video/sync-kit.mjs` | copia el kit a cada `bNN/`; crea `index.html`, `package.json`, `.gitignore` si faltan |
| 4.3 Voz de borrador y tiempos | `cd cursos/curso-v2/video/bNN && node tools/voice-say.mjs && node tools/timing.mjs` | `assets/voice/*.m4a`, `voice.json`, `timing.js` (con las ranuras de escena y los clips de voz en `index.html`) |
| 4.4 Guion visual | a mano, en `bNN/IDEAL.md`, desde `video/kit/IDEAL.plantilla.md` | el blanco fijo de la animación |
| 4.5 Animación | `bNN/compositions/<id de escena>.html`, una por escena, con `TZ(K)` (ver `video/kit/TIZA.md`) | |
| 4.6 Comprobar | `cd cursos/curso-v2/video/bNN && npx --yes hyperframes@0.8.139 check` | 0 errores; falla si un ancla `W()` no existe |
| 4.6 Capturas | `npx --yes hyperframes@0.8.139 snapshot --describe false --no-end --at 12,30.5,48` | `snapshots/frame-*.png`, `contact-sheet.jpg` |
| 4.7 Prueba de visibilidad | las mismas capturas en orden inverso (`--at 280,200,120,40`) | lo que aparece solo en una de las dos órdenes es un error del kit o de la composición |
| 4.8 Render | `cd cursos/curso-v2/video/bNN && npx --yes hyperframes@0.8.139 render -o renders/katarch-bNN.mp4 --quality looks --fps 30` | `renders/katarch-bNN.mp4`; sin otros `ffmpeg` ni renders en paralelo |
| 4.8 Comprobar el MP4 | `ls -l renders/` (la hora tiene que ser la del render) y `ffprobe -v error -show_entries format=duration -of csv=p=0 renders/katarch-bNN.mp4` | la duración del bloque, con video y audio |
| 4.8 Hoja de cuadros | `ffmpeg -v error -i renders/katarch-bNN.mp4 -vf "fps=1/5,scale=320:-1,tile=8x4" -y snapshots/hoja-%02d.jpg` (cada hoja cubre 160 s) | un cuadro cada 5 s para revisar contra `IDEAL.md` |
| 4.9 Sitio | `node scripts/build-curso-data.mjs`; en `src/curso/curso.ts`, las `etapas` del bloque | `bloques.json`, miniaturas, MP4 locales |
| 4.9 Probar | `PUBLIC_LOCAL_VIDEO=curso npm run dev` → `http://localhost:4321/curso/` | el bloque en el mapa y su página |

| 4.6 Anclas | `node cursos/curso-v2/tools/anclas.mjs cursos/curso-v2/video/bNN` | avisa si un ancla `W()` ya no existe en la narración, y qué líneas en inglés no tienen las mismas oraciones |

Si cambia el guion después de animar: se repiten 4.1 y 4.3. Las composiciones se anclan a palabras y no a segundos, así que siguen valiendo; `check` avisa si una palabra ancla desapareció.

## La versión en inglés

Cada bloque tiene su narración en inglés y el diccionario de sus textos en pantalla. El español sigue siendo la fuente: si cambia un guion, se actualiza también su inglés.

- `video/bNN/narration.en.md`: la traducción legible, escena por escena (`## id · título`), un párrafo por línea de voz y, en lo posible, una oración por cada oración española. `node cursos/curso-v2/tools/ingles.mjs cursos/curso-v2/video/bNN` la convierte en `narration.en.json` y copia las pausas del español.
- `video/bNN/textos.en.json` y `video/kit/tools/textos.comun.en.json` (regiones, "gana" y "paga", el mapa, el dibujo de ClearView): textos en español → inglés. Un rótulo de varias líneas va entero, con sus `<br>`. `node cursos/curso-v2/tools/textos.mjs cursos/curso-v2/video/bNN --faltan` lista lo que falta; `textos-enteros.mjs` arma los rótulos de varias líneas a partir de sus partes.
- Las animaciones siguen ancladas a palabras en español: en inglés, cada ancla cae en el mismo punto relativo de su oración traducida (por eso conviene la misma cantidad de oraciones). Al terminar cada escena, el kit traduce sus textos con el diccionario.
- Armar el bloque en inglés: `cd cursos/curso-v2/video/bNN && node tools/timing.mjs --en` (con `estimate` si todavía no hay voz en inglés). Volver a español: `node tools/timing.mjs` (o `estimate`). El render en inglés usa el mismo comando del paso 4.8, con otro nombre de archivo (`renders/katarch-bNN.en.mp4`).
- Probar: `bash cursos/curso-v2/tools/prueba-ingles.sh cursos/curso-v2/video/bNN` saca una captura en inglés al final de cada escena (`snapshots/en`) y deja el bloque en español.

## Lo que hace solo Felix

Claude no lo ejecuta (producción y servicios compartidos):
- **Voz de producción:** `cd cursos/curso-v2/video/bNN && ELEVENLABS_API_KEY=… node tools/voice.mjs <voiceId> && node tools/timing.mjs`, y volver a renderizar. La clave nunca va a un archivo. Producción en español: Pablo Macias (`68nvxRVrtyK9nd4hTKmR`, `eleven_v4`).
- **Voz en inglés:** lo mismo con `--en` (`node tools/voice.mjs <voiceId> --en && node tools/timing.mjs --en`); escribe `assets/voice/en/` y `voice.en.json`. La voz en inglés todavía no está elegida.
- **Subir los videos:** `renders/katarch-bNN.mp4` a R2 (`katarch-videos`) como `curso/bNN.mp4`.
- **Publicar:** merge de `curso-v2` a `main` y push (Vercel despliega `main`).

## Cómo se ve el avance en el sitio

- **Producción** (lo que falta hacer): cada bloque muestra sus cuatro etapas (vacía, en borrador, lista). Un bloque sin video aparece en el mapa con borde punteado y la etiqueta "En producción"; su página es una ficha con lo que enseña, la pregunta, el par de casos y las familias. La barra "Producción del curso" de la portada suma las etapas listas de todos los bloques.
- **Espectador** (lo que vio cada persona, guardado solo en su navegador con la clave `curso2/<slug>`): un bloque visto al 95 % se pinta verde en la barra de progreso, en su estación o región, y enciende su pieza en el diagrama de ClearView del cierre. El botón "Empezar" o "Seguir" lleva al primer bloque disponible que falta ver.
- Cuando un bloque pasa a `video: 'listo'` y tiene su entrada en `bloques.json`, el mapa lo muestra disponible sin tocar nada más.
