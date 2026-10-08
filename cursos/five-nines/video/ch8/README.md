# Five Nines · Capítulo 8 en video: Contar la arquitectura

El capítulo 8 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 8); el proceso del equipo, con commits, en `../../HISTORIA.md`.

Después de la foto del repositorio, la arquitectura no cambia: cambia cómo se cuenta. Cuatro ideas: solo cambió la comunicación, el reorden a tres casos de uso con el problema 1 primero, las compuertas de valor (ganar antes, gastar después) y las cifras supuestas presentadas como resultados. Cierra con el método completo del equipo.

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 8 escenas, 44 líneas, 670 palabras habladas, **5:57** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 5:25, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 8 | 0:24 | El historial de commits: dos semanas quieto después de la foto. Título. |
| 2 | `congelado` | Qué cambió | 0:40 | Entre la semifinal y la final no cambia ningún ADR ni diagrama: solo la comunicación. |
| 3 | `reorden` | Otro orden | 0:51 | De cinco escenarios a tres casos de uso, con el pronóstico primero. |
| 4 | `compuertas` | Compuertas de valor | 1:00 | El portafolio de IA con compuertas de valor: las fases 0 a 3 y "ganar antes, gastar después". |
| 5 | `cifras` | Las cifras del video | 1:01 | Las cifras del video: en blanco el 8 de noviembre, llenas el 9, sin cálculo y con discrepancias. |
| 6 | `piensalo` | Piénsalo tú | 0:39 | Piénsalo tú: ¿una proyección o una regla frente al jurado? |
| 7 | `metodo` | El método | 0:47 | El método del equipo, en seis pasos. |
| 8 | `outro` | Para llevarte | 0:39 | Cierre: el repositorio público y las cuatro preguntas para llevarse. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap8.mp4
```
