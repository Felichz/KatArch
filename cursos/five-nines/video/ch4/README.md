# Five Nines · Capítulo 4 en video: ¿IA generativa, aprendizaje automático o código?

El capítulo 4 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 4); el proceso del equipo, con commits, en `../../HISTORIA.md`.

Dónde va la IA, y de qué tipo. Cuatro ideas: tres herramientas con costos y riesgos distintos (código, aprendizaje automático, IA generativa), la columna "Tech Choice" que obliga a elegir por escenario, el asistente híbrido con el dinero siempre en código, y dónde no usar IA generativa (el consejo de carga).

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 8 escenas, 41 líneas, 723 palabras habladas, **6:18** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 5:46, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 4 | 0:25 | El criterio del jurado (dónde decidiste no usarla) y la columna nueva del 17 de octubre. Título. |
| 2 | `herramientas` | Tres herramientas | 1:13 | Código, aprendizaje automático e IA generativa (LLM), una por una, con su costo y su riesgo. |
| 3 | `columna` | La columna | 0:50 | La columna "Tech Choice" de la tabla de requisitos: tres filas y el comentario sobre gastar de más. |
| 4 | `asistente` | El asistente híbrido | 1:02 | El asistente híbrido (ADR-0012): botones en código, texto libre con IA generativa y un clasificador, el dinero siempre en código. |
| 5 | `carga` | Dónde no usarla | 0:51 | Dónde no usarla: el consejo de carga, con aprendizaje automático simple y plantillas (ADR-0021). |
| 6 | `piensalo` | Piénsalo tú | 0:51 | Piénsalo tú: calcular un precio dinámico y explicarlo (ADR-0018). |
| 7 | `regla` | La regla | 0:31 | La escalera: empezar por lo más simple que alcanza. Anticipo de las rutas del capítulo 6. |
| 8 | `outro` | Para llevarte | 0:41 | Repaso y avance del capítulo 5. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap4.mp4
```
