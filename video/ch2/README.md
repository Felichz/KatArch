# Capítulo 2 en video: El dilema del podio

El capítulo 2 de KatArch como clase en video, narrado en español neutro por Pablo Macias (es-MX) con ElevenLabs **v4**. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

Después de una auditoría pedagógica (`AUDIT.md`), el guion se reescribió entero. Ahora cada una de las tres posturas finalistas tiene su propia escena, con su razonamiento, su definición y su precio. El costo fijo se construye con el caso antes de nombrarlo. El trade-off se trabaja sobre las tres posturas antes de enunciar la primera ley. Y la trazabilidad se define y se recorre sobre el hilo real de ArchColider.

**La voz del guion nuevo todavía no está generada.** La voz de prueba anterior se descartó, así que por ahora los tiempos salen de `node tools/timing.mjs estimate`. En ese modo el video dura unos 7:32; con la voz real quedaría en unos 6:40. Todas las animaciones están ancladas a palabras, así que se reajustan solas cuando llegue la voz.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. Corta una toma solo donde el guion pide un silencio (`pauseAfter`). |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `tools/icons.mjs` | Genera `assets/icons.js` con los íconos de Lucide que usa el video. |
| `compositions/*.html` | Las 9 escenas: intro, question, arch, forest, jedis, bets, jury, rubric, outro. Cada animación está anclada a una palabra, por ejemplo `W(4, 'canal')`. |
| `assets/kit.css`, `assets/kit.js` | Los estilos compartidos, los anclajes a la narración y los helpers de diagramas. |
| `retired/` | Las escenas del guion anterior que se reemplazaron: teams y styles. |
| `AUDIT.md` | La auditoría pedagógica: el guion anterior, el plan y el guion nuevo, con los segundos que recibe cada concepto. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente)
node tools/timing.mjs                         # reajusta todo a la voz (hasta tenerla: node tools/timing.mjs estimate)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap2.mp4
```
