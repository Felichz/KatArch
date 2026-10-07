# Capítulo 5 en video: Qué se construye y qué se alquila

El capítulo 5 de KatArch como clase en video, narrado en español neutro con ElevenLabs. Después de una auditoría pedagógica (`AUDIT.md`), el guion se reescribió. Ahora Domain-Driven Design y la capa anticorrupción tienen su propio desarrollo, y en los dos casos el problema aparece antes del nombre. La escena del piénsalo tiene una pausa para pensar, así que su audio se corta en dos. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**La voz del guion nuevo todavía no está generada.** `voice.json` corresponde al guion anterior, así que por ahora los tiempos salen de `node tools/timing.mjs estimate`. En ese modo el video dura unos 8:42; con la voz real quedaría en unos 7:20. Todas las animaciones están ancladas a palabras, así que se reajustan solas cuando llegue la voz.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `compositions/*.html` | Las 12 escenas: intro, problema, ddd, cajones, core, resto, piensalo, riesgo, capa, flujo, fachada, outro. |
| `retired/` | Las escenas del guion anterior que se recortaron: vara, mapa, aduana, metamodelo y presupuesto. |
| `AUDIT.md` | La auditoría pedagógica: el guion anterior, el plan y el guion nuevo, con los segundos que recibe cada concepto. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente)
node tools/timing.mjs                         # reajusta todo a la voz (hasta tenerla: node tools/timing.mjs estimate)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap5.mp4
```
