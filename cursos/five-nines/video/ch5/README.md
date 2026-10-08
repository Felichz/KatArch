# Five Nines · Capítulo 5 en video: Confiar en una IA que se equivoca

El capítulo 5 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 5); el proceso del equipo, con commits, en `../../HISTORIA.md`.

Cómo confiar en un modelo que se equivoca, con el caso de la limpieza de autos devueltos. Cuatro ideas: dos formas de equivocarse y cuál duele más, las bandas de confianza con revisión humana, las correcciones como datos para el modelo siguiente, y MLOps: evaluar antes, vigilar la deriva después y mirar también el negocio.

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 9 escenas, 41 líneas, 716 palabras habladas, **5:59** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 5:45, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 5 | 0:28 | La foto de devolución y la IA que decide si el auto quedó sucio. Título. |
| 2 | `riesgo` | Dos errores | 0:52 | La confianza del modelo, el falso positivo y el falso negativo, y cuál le preocupaba más al equipo. |
| 3 | `bandas` | Tres bandas | 0:51 | Las tres bandas (90 y 80 %), human-in-the-loop y el costo de mover los cortes. |
| 4 | `circuito` | Cerrar el circuito | 0:43 | Las correcciones como datos de entrenamiento y el acuerdo entre revisores (ADR-0016). |
| 5 | `mlops` | MLOps | 1:00 | La deriva y MLOps: evaluar cada versión antes de salir y vigilarla en producción. |
| 6 | `negocio` | La señal del negocio | 0:30 | La métrica técnica dice si el modelo acierta; la del negocio, si acertar sirvió. |
| 7 | `piensalo` | Piénsalo tú | 0:32 | Piénsalo tú: una devolución con 85 % de confianza. |
| 8 | `abierto` | Lo que queda abierto | 0:29 | Los porcentajes son metas, no mediciones; los cortes de daños son otros (85 y 70). |
| 9 | `outro` | Para llevarte | 0:40 | Repaso y avance del capítulo 6. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap5.mp4
```
