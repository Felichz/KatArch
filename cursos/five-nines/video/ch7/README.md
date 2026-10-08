# Five Nines · Capítulo 7 en video: Cuando el proveedor cambia las reglas

El capítulo 7 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 7); el proceso del equipo, con commits, en `../../HISTORIA.md`.

La incertidumbre de los proveedores de IA. Cuatro ideas: atarse a un proveedor es válido si se elige con el costo escrito, la tabla de riesgos en cada ADR desde el 20 de octubre, salidas concretas, y el intermediario que elige el modelo (MoCoP). Con dos cabos sueltos contados como tales.

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 8 escenas, 37 líneas, 665 palabras habladas, **5:42** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 5:19, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 7 | 0:27 | El tercer criterio del jurado y los ejemplos de incertidumbre del anfitrión. Título. |
| 2 | `apuesta` | Todo en Google | 0:56 | Todo en Google (Vertex AI, Gemini, Maps), qué es vendor lock-in y qué pedía el jurado. |
| 3 | `seccion` | Una sección nueva | 0:43 | La sección de riesgos y trade-offs agregada a la plantilla de ADR el 20 de octubre y completada en los ADRs anteriores. |
| 4 | `salidas` | Las salidas de emergencia | 0:49 | Tres salidas: la API tradicional de Maps, un modelo propio más chico y formatos portables. |
| 5 | `intermediario` | Un intermediario | 0:49 | El plano de control de modelos (MoCoP, ADR-0013): un intermediario contratado como servicio. |
| 6 | `cabos` | Lo que no cierra | 0:46 | Dos cabos sueltos: MoCoP frente a Vertex, y la sigla MCP con dos significados. |
| 7 | `piensalo` | Piénsalo tú | 0:36 | Piénsalo tú: Gemini triplica su precio. |
| 8 | `outro` | Para llevarte | 0:41 | Repaso y avance del capítulo 8. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap7.mp4
```
