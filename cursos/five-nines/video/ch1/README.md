# Five Nines · Capítulo 1 en video: El encargo

El capítulo 1 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 1); el proceso del equipo, con commits, en `../../HISTORIA.md`.

Qué pedía el cliente, MobilityCorp, y qué iba a mirar el jurado. Cuatro ideas: las dos flotas y sus reglas, los tres problemas del negocio, la cuenta de la flota (96 % es micromovilidad) y los cuatro criterios sobre IA. La fuente es la sesión inaugural del kata (los subtítulos del commit 8a5ce24).

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 8 escenas, 50 líneas, 831 palabras habladas, **7:06** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 6:35, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 1 | 0:46 | Qué es una kata, un pliego y una arquitectura; la condición del pliego (dónde usar IA y dónde no); el equipo ganador. Título. |
| 2 | `negocio` | El negocio | 1:03 | MobilityCorp, la última milla y sus dos flotas, con reglas distintas. |
| 3 | `numeros` | Los números | 0:46 | La flota por país que el cliente inventó en vivo, la suma (10.400) y la proporción, marcada como cuenta del curso. |
| 4 | `desafios` | Los problemas | 1:11 | Los tres problemas del cliente y cómo se conectan; usar mejor la flota antes de comprar más. |
| 5 | `entregables` | Las reglas | 0:51 | Qué se entregaba (README, diagramas, ADRs), qué es un ADR y el calendario que permite reconstruir el proceso con git. |
| 6 | `criterios` | Lo que mira el jurado | 1:08 | Qué es la IA generativa, los cuatro criterios del jurado y qué quiere decir determinista. |
| 7 | `piensalo` | Piénsalo tú | 0:40 | Piénsalo tú: un chatbot "porque está de moda", juzgado con los criterios. |
| 8 | `outro` | Para llevarte | 0:46 | Repaso de las tres ideas y avance del capítulo 2. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap1.mp4
```
