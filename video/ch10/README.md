# Capítulo 10 en video: El mapa de decisiones

El capítulo 10 de KatArch como clase en video, de unos 7:30 en el tiempo estimado (945 palabras; la auditoría pedagógica está en `AUDIT.md`), para Pablo Macias (es-MX) con ElevenLabs **v4**. **La voz todavía no está generada:** los tiempos corren en modo estimado, con un narrador simulado, y se reajustan solos cuando exista `voice.json`. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes) y sigue la misma estructura que el capítulo 3; la escena `mother` tiene la pausa para pensar (`pauseAfter`), así que su audio se va a cortar en dos.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `assets/map.js` | El mapa de las diez decisiones en tres pilares, compartido por las escenas que lo muestran (`core`, `physical`, `budget`, `mother`, `doors`, `money`), con el problema y la respuesta de cada decisión para sus fichas. |
| `compositions/*.html` | Las 11 escenas. Cada animación está anclada a una palabra, por ejemplo `W(2, 'datos')`. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (solo escenas nuevas o cambiadas)
node tools/timing.mjs                         # reajusta todo a la voz (sin voice.json: estimado)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap10.mp4
```
