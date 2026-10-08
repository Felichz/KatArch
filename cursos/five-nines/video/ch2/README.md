# Five Nines · Capítulo 2 en video: Antes de la IA, el negocio

El capítulo 2 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 2); el proceso del equipo, con commits, en `../../HISTORIA.md`.

Los dos primeros días del equipo: la IA es una solución, no un objetivo. Cuatro ideas: la nota al margen del primer borrador, la cadena impulsor → meta → solución como filtro, los tres tipos de número (dado, calculado, supuesto) y los supuestos escritos para compararlos con el pliego.

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 8 escenas, 46 líneas, 771 palabras habladas, **6:39** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 6:11, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 2 | 0:30 | Los tres problemas del capítulo 1 y lo que el equipo hizo los dos primeros días. Título. |
| 2 | `nota` | Una nota al margen | 0:54 | El primer borrador de objetivos (16 de octubre) y la nota al margen: no es un objetivo del negocio, es una solución. |
| 3 | `cadena` | Impulsor, meta, solución | 1:04 | La cadena impulsor → meta → solución, con un ejemplo de la tabla del equipo, y la cadena leída como filtro. |
| 4 | `origen` | De dónde salen los números | 0:46 | Un número puede ser dado, calculado o supuesto; las metas del equipo son elegidas. |
| 5 | `supuestos` | Los supuestos | 0:56 | Supuestos y restricciones, y la primera diferencia con el pliego: 5.000 bicicletas por país contra 500 por ciudad. |
| 6 | `piensalo` | Piénsalo tú | 0:55 | Piénsalo tú: el GPS cada 30 minutos del supuesto contra los 30 segundos del pliego. |
| 7 | `alcance` | Qué se diseña | 0:55 | Lo básico del alquiler y las cuatro áreas con IA, en el orden del README: el problema 1 no va primero. |
| 8 | `outro` | Para llevarte | 0:43 | Repaso y avance del capítulo 3. |

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`), igual a la de KatArch. `text` es lo que muestra el subtítulo; `say`, si está, es lo que pronuncia la voz (con los números en letras). Se genera desde `../../fuentes/` (`python3 fuentes/build.py`): no se edita a mano. |
| `compositions/*.html` | Una sub-composición por escena. Cada animación está anclada a una palabra o a una línea de la narración. Los diagramas del equipo están redibujados con el kit, sin imágenes del repositorio. |
| `assets/` | El kit compartido del curso (`kit.css`, `kit.js`, fuentes e `icons.js`), copiado desde `../kit/` por `../sync-kit.mjs`: no se edita aquí. |
| `tools/voice.mjs` | Genera una toma por escena con ElevenLabs y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. Necesita `ffmpeg` y `ffprobe`. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js` y `narration.txt`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `tools/icons.mjs` | Genera `assets/icons.js` con los íconos de Lucide (se corre en `../kit/`). |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente; consume créditos de ElevenLabs)
node tools/timing.mjs                         # reajusta todo a la voz (sin voice.json: estimado)
node tools/timing.mjs estimate                # fuerza el narrador simulado
npm run check                                 # lint, runtime, layout, movimiento y contraste
npx --yes hyperframes@0.8.139 snapshot --describe false --at 12,30 -o snapshots/revision   # cuadros sueltos, sin render
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap2.mp4
```
