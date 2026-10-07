# Capítulo 3 en video: Las reglas antes del primer diagrama

El capítulo 3 de KatArch como clase en video, de unos 7:45 a 8:00 (estimado; el guion se reescribió siguiendo `../PEDAGOGY.md`, ver `AUDIT.md`), en español neutro, con la voz de Pablo Macias (es-MX) en ElevenLabs **v4**. La escena `think` (el "piénsalo tú" de la trazabilidad) trae la pausa para pensar a mitad de la toma, así que su audio se va a cortar en dos. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

**La voz todavía no está generada.** La voz de prueba anterior se descartó. Por ahora los tiempos salen de un narrador simulado (`timing.js` en modo `estimated`). Cuando exista `voice.json`, `tools/timing.mjs` vuelve a ajustar todo a la voz real.

## Las ideas del capítulo

1. Leer el negocio antes de dibujar, y preguntar en vez de inventar.
2. Los principios son reglas de desempate, y cada uno sale de una restricción del caso (con un empate trabajado: ¿separar ya el catálogo?).
3. Trazabilidad: cada requerimiento sale de un objetivo del negocio.
4. El ADR: la decisión por escrito, con lo que se gana y lo que se paga (el ADR 003 como ejemplo real).

## Cómo se hizo

- **Un audio continuo por escena.** La voz mantiene la misma entonación, energía y respiración a lo largo de toda la escena. Cada escena es una toma nueva, pero ese corte queda en la pausa y la transición visual entre escenas, donde no se nota. Cada pedido incluye el texto de las escenas vecinas para que la toma arranque y termine en el registro correcto.
- **Cortes solo en las pausas a propósito.** Una toma se corta únicamente donde el guion pide un silencio (`pauseAfter`), justo en la mitad de la pausa que la voz ya hizo.
- **Tiempos exactos.** ElevenLabs devuelve el momento en que suena cada carácter, así que los subtítulos y las animaciones toman los tiempos de la voz misma.
- **Una sub-composición por escena.** Cada escena vive en `compositions/<escena>.html`, y `index.html` solo organiza: monta las escenas, el audio, el encabezado y los subtítulos.
- **Kit compartido.** `assets/kit.css` y `assets/kit.js` tienen los estilos, los anclajes a la narración y los helpers de diagramas.

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `AUDIT.md` | La auditoría pedagógica del guion anterior, el plan y la tabla del guion nuevo. |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. |
| `compositions/*.html` | Las 13 escenas: intro, week, reqs, ask, tie, simple, grow, msgs, trace, think, adr, adr003, outro. Cada animación está anclada a una palabra, por ejemplo `W(5, 'telemetría')`. |
| `retired/` | La escena `principles` retirada y las versiones anteriores de `reqs`, `trace` y `adr`. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (solo escenas nuevas o cambiadas)
node tools/timing.mjs                         # reajusta todo a la voz
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap3.mp4
```
