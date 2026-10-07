# Capítulo 11 en video: Guía de campo

El capítulo 11 de KatArch, el último del curso, como clase en video, de unos 7 minutos (930 palabras; ver `AUDIT.md`). La voz todavía no está generada: los tiempos corren en modo estimado. Va a narrarlo Pablo Macias (es-MX) con ElevenLabs **v4**, en español neutro. Cada paso del método se cuenta en dos escenas: el caso trabajado y, después, la pregunta que el espectador se lleva. La escena de la factura tiene la pausa para pensar a mitad de la toma, así que su audio se va a cortar en dos. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes).

## Escenas

| Escena | Qué enseña |
| - | - |
| `intro` | Re-ancla el caso (Farmacy Food) y anuncia que, sin el caso, queda un método. |
| `method` | Los cuatro pasos en orden, y el patrón de cada uno: qué hizo el equipo, por qué, tu pregunta. |
| `understand` | Paso 1: la primera semana sin diagramas y la cuenta de 42 comidas por día (menos de una petición por segundo). |
| `yard` | Paso 1: lo que decidió ese número, lo que habría costado diseñar para miles por segundo, y la pregunta para llevar. |
| `principles` | Paso 2: la guerra de gustos, qué es un principio y de dónde sale (equipo pequeño → simplicidad). |
| `tiebreak` | Paso 2: el empate "¿muchos servicios o una sola aplicación?" resuelto por tres principios, y la pregunta para llevar. |
| `reality` | Paso 3: el refrigerador sin señal y el PIN preparado de antemano, de punta a punta. |
| `ready` | Paso 3: "¿qué le pasa al negocio cuando esto falla?", dos respuestas más y la pregunta para llevar. |
| `bill` | Paso 4: la factura de un año, el monitoreo como línea más cara y el piénsalo tú. |
| `hours` | Paso 4: las horas del equipo, la regla, el único análisis de costos y la pregunta para llevar. |
| `order` | El hilo del caso a través de los cuatro pasos, y qué pasa sin el primero. |
| `outro` | Las cuatro preguntas, lo que ya puedes hacer, los repositorios públicos y el cierre del curso. |

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz (`voiceId`, `voiceModel`, `voiceSettings`). |
| `tools/voice.mjs` | Genera una toma por escena y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. Sin `voice.json`, estima los tiempos. |
| `compositions/*.html` | Las 12 escenas. Cada animación está anclada a una palabra, por ejemplo `W(2, 'refrigerador')`. |

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente)
node tools/timing.mjs                         # reajusta todo a la voz (o al estimado)
npm run check                                 # lint, runtime, layout y contraste
npx hyperframes render -o renders/katarch-cap11.mp4
```
