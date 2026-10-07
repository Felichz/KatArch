# Capítulo 7 en video: El viaje de una comida

El capítulo 7 de KatArch como clase en video, en español neutro. Tiene once escenas, dos pausas para pensar (la agenda y la cancelación) y una sub-composición por escena. El guion sigue `../PEDAGOGY.md`; la auditoría y el plan están en `AUDIT.md`. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**La voz todavía no está generada.** Mientras no exista `voice.json`, `tools/timing.mjs` usa un narrador estimado (unos 8:00, más lento que la voz real), así que los subtítulos y las animaciones ya están anclados a cada palabra y se reajustan solos cuando llega la voz.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `compositions/*.html` | Las 11 escenas: intro, cabo, agenda, precio, alfabeto, manana, despacho, heladera, cancel, refund y outro. Cada animación está anclada a una palabra, por ejemplo `W(0, 'evento')`. `idea.html` y `cycle.html` son del guion anterior y ya no se montan. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente)
node tools/timing.mjs                         # reajusta todo a la voz (o al estimado, sin voice.json)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap7.mp4
```
