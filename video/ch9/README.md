# Capítulo 9 en video: La factura anual

El capítulo 9 de KatArch como clase en video, de unos 7:30 estimados, para narrar con Pablo Macias (es-MX) en ElevenLabs **v4**. El guion sigue `../PEDAGOGY.md`, y su auditoría está en `AUDIT.md`. Tiene tres ideas (medir antes de comprar, costos fijos y variables, y el costo real con quien lo mantiene) y dos pausas para pensar: el mensaje más pesado y qué le pasa a la factura con diez veces la carga. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**Voz pendiente.** Todavía no hay `voice.json`: `tools/timing.mjs` corre en modo estimado (un narrador simulado), así que los tiempos y la duración se reajustan solos cuando llegue la voz real.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `compositions/*.html` | Las 9 escenas: intro, la planilla (precio de lista y TCO), volumetría, los pronósticos, la factura (costos fijos y variables), el total con diez veces la carga, comprar o construir (monitoreo), las encuestas (privacy) y el cierre. Cada animación está anclada a una palabra, por ejemplo `W(1, '22.481')`. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (solo escenas nuevas o cambiadas)
node tools/timing.mjs                         # reajusta todo a la voz (o al estimado, sin voice.json)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap9.mp4
```
