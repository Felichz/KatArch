# Five Nines · Capítulo 3 en video: Una sola fuente de verdad

El capítulo 3 del curso de Five Nines (ganador de la O'Reilly Architecture Kata Q4 2025, caso MobilityCorp) como clase en video, hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) con la misma estructura que los capítulos de KatArch. El guion, su plan y su auditoría pedagógica están en `../../GUION.md` (capítulo 3); el proceso del equipo, con commits, en `../../HISTORIA.md`.

Cómo el equipo ordenó los datos de la flota antes de poner IA. Cuatro ideas: hacer la cuenta del tráfico de telemetría (unos 350 mensajes por segundo, cuenta del curso), MQTT y Pub/Sub, el servicio de flota como fuente única de verdad (el cambio desde el primer boceto) y su precio, el riesgo concentrado. Cierra con la elección de Google Cloud el segundo día.

**La voz todavía no está generada.** Los tiempos salen del narrador simulado (`node tools/timing.mjs estimate`): 9 escenas, 43 líneas, 797 palabras habladas, **6:42** en el estimado. A 2,2 palabras por segundo, la velocidad de referencia de `PEDAGOGY.md`, serían unos 6:23, más el aire entre escenas (en KatArch, la voz real terminó más corta que el estimado). Todas las animaciones están ancladas a palabras de la narración (`W(i, 'palabra')`), así que se reajustan solas cuando exista `voice.json`. La escena `piensalo` tiene la pausa de 3 s para pensar, con el anillo de cuenta regresiva, y por eso su audio se corta en dos.

## Escenas

| # | Escena | Sección | Duración (estimada) | Qué hace |
| - | - | - | - | - |
| 1 | `intro` | Capítulo 3 | 0:22 | Los 10.400 vehículos del capítulo 1, cada uno con su posición y su batería. Título. |
| 2 | `volumen` | Haz la cuenta | 0:57 | Qué es la telemetría y la cuenta del peor caso: unos 350 mensajes por segundo en un país (cuenta del curso). |
| 3 | `mqtt` | Cómo hablan los vehículos | 1:01 | MQTT para los vehículos (y por qué no HTTP), y Pub/Sub como un tablero de anuncios. |
| 4 | `boceto` | El primer boceto | 0:43 | El primer boceto (16 de octubre), con servicios de flota y de ubicación separados, y el diagrama del 19, donde ubicación desaparece. |
| 5 | `verdad` | Fuente única de verdad | 0:59 | ADR-0007: el servicio de flota como fuente única de verdad, con sus reglas, y la alternativa descartada. |
| 6 | `piensalo` | Piénsalo tú | 0:40 | Piénsalo tú: dos copias de la batería de un mismo scooter. |
| 7 | `precio` | El precio | 0:38 | El costo que el equipo anotó (riesgo concentrado), sus mitigaciones y qué es un trade-off. |
| 8 | `nube` | La nube, el segundo día | 0:46 | Qué es la nube y por qué Google Cloud el segundo día (ADR-0001): mapas e IA integrada. Anticipo del capítulo 7. |
| 9 | `outro` | Para llevarte | 0:43 | Repaso y avance del capítulo 4. |

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
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap3.mp4
```
