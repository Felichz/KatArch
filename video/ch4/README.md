# Capítulo 4 en video: Cuánta maquinaria comprar

El capítulo 4 de KatArch como clase en video, de unos 7:20 (estimado; el guion se reescribió siguiendo `../PEDAGOGY.md`, ver `AUDIT.md`), en español neutro, con la voz de Pablo Macias (es-MX) en ElevenLabs **v4**. Tiene la misma estructura que el capítulo 3: la escena `weigh` (el peso de cada fila del mapa de valores) trae la pausa para pensar a mitad de la toma, así que su audio se va a cortar en dos. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**La voz todavía no está generada.** Por ahora los tiempos salen de un narrador simulado (`timing.js` en modo `estimated`). Cuando exista `voice.json`, `tools/timing.mjs` vuelve a ajustar todo a la voz real.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `compositions/*.html` | Las 12 escenas: intro, styles, trap, actions, count, read, weigh, why, modmono, extract, price, outro. Cada animación está anclada a una palabra, por ejemplo `W(2, 'telemetría')`. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (solo escenas nuevas o cambiadas)
node tools/timing.mjs                         # reajusta todo a la voz
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap4.mp4
```
