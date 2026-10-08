# Five Nines · Capítulo 6 en video: El vehículo correcto, en el lugar correcto

El capítulo 6 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 6); el proceso del equipo, con commits, en `../../HISTORIA.md`.

El problema número uno del cliente, vehículos fuera de lugar, y un dato del historial: fue lo último que el equipo diseñó. Cuatro ideas: el orden real de diseño, baterías y reubicación en un mismo circuito de operarios, empezar con un modelo simple y escribir la condición para escalar, y la debilidad: rutas con IA generativa frente al solver del segundo puesto.

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 8 escenas, 43 líneas, 730 palabras habladas, **6:18** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 5:50, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 6 | 0:24 | El problema más grande del cliente y lo que muestra el historial. Título. |
| 2 | `orden` | El orden real | 0:53 | Las fechas de cada escenario en el repositorio; el pronóstico llega último. Una lectura posible, marcada como tal. |
| 3 | `operarios` | El circuito de los operarios | 1:00 | El circuito de las baterías y, desde el 20 de octubre, la reubicación en el mismo recorrido. |
| 4 | `pronostico` | Pronosticar la demanda | 0:42 | Qué es pronosticar la demanda y qué es una serie de tiempo. |
| 5 | `escalera` | Empezar simple | 1:05 | ADR-0022: un modelo estadístico primero, uno por flota, y la condición escrita para subir de peldaño. |
| 6 | `piensalo` | Piénsalo tú | 0:35 | Piénsalo tú: una ciudad nueva, sin datos. |
| 7 | `podio` | Lo que el podio hizo distinto | 1:06 | Las rutas de los operarios: IA generativa con reglas (Five Nines) frente a un solver, OR-Tools (Nimrods, segundo puesto). |
| 8 | `outro` | Para llevarte | 0:37 | Repaso y avance del capítulo 7. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap6.mp4
```
