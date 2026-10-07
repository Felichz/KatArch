# Capítulo 6 en video: El mundo físico

El capítulo 6 de KatArch como clase en video, en español neutro. Son 14 escenas, de unos 6,5 a 8 minutos según la voz, y una sub-composición por escena. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

El guion se reescribió siguiendo `video/PEDAGOGY.md`. La auditoría del guion anterior, el plan y la tabla del guion nuevo están en `AUDIT.md`. Las tres ideas del capítulo son:

1. Un actor por refrigerador hace innecesarios los locks.
2. El dinero exige guardar cada hecho (event sourcing) y un cobro que no se pierda ni se duplique (cola con ack más identificador único).
3. Lo que va a fallar se prepara antes (el PIN offline).

Hay dos pausas para pensar: Carla en el hospital, en la escena `serial`, y el teléfono en el sótano, en `pinq`.

**La voz todavía no está generada.** Mientras no exista `voice.json`, `tools/timing.mjs` estima los tiempos con un narrador simulado. Los subtítulos y las animaciones ya están anclados al guion y se reajustan solos cuando llega la voz real.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js` y las ventanas de las escenas en `index.html`. Sin `voice.json`, estima. |
| `compositions/*.html` | Las 14 escenas: intro, race, locks, actors, serial, claim, ledger, queue, dedup, window, offline, pin, pinq y outro. Cada animación está anclada a una palabra, por ejemplo `W(1, 'agotado')`. `cloudy.html` (el día nublado) quedó fuera del guion y no se monta. |
| `assets/kit.css`, `assets/kit.js` | Estilos, anclajes a la narración y helpers de diagramas, compartidos con los otros capítulos. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente)
node tools/timing.mjs                         # reajusta todo a la voz (o estima, si no hay voice.json)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap6.mp4
```
