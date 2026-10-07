# Capítulo 8 en video: Aterrizar en la nube

El capítulo 8 de KatArch como clase en video, de unos 7:45 según el narrador simulado (unas 6:15 con el ritmo de la voz real), en español neutro, con la voz de Pablo Macias (es-MX) en ElevenLabs **v4**. El guion se reescribió siguiendo `../PEDAGOGY.md`: la auditoría y el plan están en `AUDIT.md`. Las escenas con pausas escritas (`pauseAfter`) cortan su audio en esos silencios. La de la puerta incluye la pausa para pensar. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**La voz todavía no está generada.** Por ahora los tiempos salen de un narrador simulado (`timing.js` en modo `estimated`). Cuando exista `voice.json`, `tools/timing.mjs` vuelve a ajustar todo a la voz real.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `compositions/*.html` | Las 10 escenas: intro, red, subredes, zonas, puerta, cognito, confianza, crecer, sintetico y outro. Cada animación está anclada a una palabra, por ejemplo `W(0, 'Cognito')`. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (solo escenas nuevas o cambiadas)
node tools/timing.mjs                         # reajusta todo a la voz
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap8.mp4
```
