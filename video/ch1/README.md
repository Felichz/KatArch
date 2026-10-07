# Capítulo 1 en video: El terreno de juego

El capítulo 1 de KatArch como clase en video, de unos 7:30 (estimado). El guion se reescribió siguiendo `../PEDAGOGY.md` (ver `AUDIT.md`), en español neutro, con la voz de Pablo Macias (es-MX) en ElevenLabs **v4**. Tiene la misma estructura que los capítulos 3 y 4: la escena `convert` trae la pausa para pensar ("piénsalo tú") al final de la toma. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**La voz todavía no está generada.** Por ahora los tiempos salen de un narrador simulado (`timing.js` en modo `estimated`). Cuando exista `voice.json`, `tools/timing.mjs` vuelve a ajustar todo a la voz real.

Este capítulo fue el primer prototipo, hecho como un único archivo. Esa versión quedó en `legacy/` (`index.monolithic.html` y su script de tiempos) solo como referencia: sus visuales (la cita, las piezas, los usuarios, el diagrama, el día de puntos con el segundo ampliado y las barras contra la vara) se portaron y mejoraron en las escenas nuevas.

## Cómo se hizo

- **Un audio continuo por escena.** La voz mantiene la misma entonación, energía y respiración a lo largo de toda la escena. Cada escena es una toma nueva, pero ese corte queda en la pausa y la transición visual entre escenas, donde no se nota.
- **Cortes solo en las pausas a propósito.** Una toma se corta únicamente donde el guion pide un silencio (`pauseAfter`).
- **Tiempos exactos.** ElevenLabs devuelve el momento en que suena cada carácter, así que los subtítulos y las animaciones toman los tiempos de la voz misma.
- **Una sub-composición por escena.** Cada escena vive en `compositions/<escena>.html`, y `index.html` solo organiza: monta las escenas, el audio, el encabezado y los subtítulos.
- **Kit compartido.** `assets/kit.css` y `assets/kit.js` tienen los estilos, los anclajes a la narración y los helpers de diagramas.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). `text` es lo que muestra el subtítulo; `say`, si está, es lo que pronuncia la voz (con los números en letras). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js` y `narration.txt`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `tools/icons.mjs` | Genera `assets/icons.js` con los íconos de Lucide que usa el video. |
| `compositions/*.html` | Las 13 escenas: intro, mission, pieces, users, systems, scope, context, count, convert, rate, growth, why, outro. Cada animación está anclada a una palabra, por ejemplo `W(4, 'restricción')`. |
| `legacy/` | El prototipo monolítico anterior, solo como referencia. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (solo escenas nuevas o cambiadas)
node tools/timing.mjs                         # reajusta todo a la voz
node tools/timing.mjs estimate                # fuerza el narrador simulado
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap1.mp4
```
