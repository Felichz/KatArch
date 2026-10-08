# Capítulo 1 en video: Un examen que no da abasto

El capítulo 1 del curso de ZAItects (O'Reilly Architecture Kata, invierno 2025, caso Certifiable, Inc.), como clase en video de unos 6:50 en modo estimado (798 palabras; el plan y la auditoría están en `../../GUION.md`). Presenta el negocio, sus dos pruebas corregidas a mano, la restricción que gobierna todo (la exactitud), los dos criterios del jurado que ordenan el curso y el orden real del equipo, que empezó por una solución. Está hecho con [HyperFrames](https://github.com/heygen-com/hyperframes), con el kit compartido del curso (`../kit/`).

**La voz todavía no está generada.** Por ahora los tiempos salen de un narrador simulado (`timing.js` en modo `estimated`). Cuando exista `voice.json`, `tools/timing.mjs` vuelve a ajustar todo a la voz real, porque cada animación está anclada a una palabra.

## Escenas

| Escena | Qué enseña |
| - | - |
| `intro` | Qué es una kata, un pliego y una arquitectura; el pedido nuevo (IA generativa) y el equipo que ganó. Título. |
| `ley` | La ley de licencias, la SALB, Certifiable (más del 80 % de las empresas acepta su certificado) y la expansión a otras regiones. |
| `examen` | Las dos pruebas: test 1 (opción múltiple automática, respuesta corta a mano, 3 h) y test 2 (caso de estudio, 8 h). Lo común: personas y horas. |
| `gente` | 300 expertos a 50 USD la hora, 5 designados, por qué importa que un caso no se filtre, la demanda de 5 a 10 veces y el precio fijo. |
| `restriccion` | La exactitud como restricción principal, la definición de restricción, los dos candados y el costo "algo flexible". |
| `encargo` | El encargo, qué es la IA generativa y un LLM, y la tensión: una herramienta potente pero falible frente a notas que deciden carreras. |
| `jurado` | Los siete criterios del jurado (del repo de Litmus) y los dos que vuelven en todo el curso: validación y antipatrones. |
| `piensalo` | Piénsalo tú (anillo de 3 s): qué tarea se lleva más horas. Respuesta: corregir. |
| `equipo` | El equipo por roles y la línea de commits: repo vacío el 5 de febrero, una solución el 14, el problema con números el 17. |
| `outro` | Las tres ideas del capítulo y el avance del capítulo 2. |

## Cómo está armado

| Archivo | Qué es |
| - | - |
| `narration.json` | El guion por escena y la configuración de la voz. Se genera desde `../../fuentes/` (`build.py`), junto con `GUION.md`: no se edita a mano. |
| `tools/voice.mjs` | Genera una toma por escena con ElevenLabs y guarda los tiempos de cada palabra en `voice.json`. Solo vuelve a pedir las escenas cuyo texto cambió. |
| `tools/timing.mjs` | Ubica las tomas en la línea de tiempo y genera `timing.js` y `narration.txt`. También escribe en `index.html` las ventanas de las escenas y los clips de audio. Sin `voice.json`, estima. |
| `tools/icons.mjs` | Genera `assets/icons.js` con los íconos de Lucide del curso. |
| `assets/kit.css`, `assets/kit.js` | Copias del kit del curso (`../kit/`, se sincronizan con `node ../kit/sync.mjs 1`). |
| `compositions/*.html` | Las 10 escenas. Cada animación está anclada a una palabra, por ejemplo `W(2, 'exactitud')`. |

Diagramas y datos redibujados de: `README.md` del equipo (problema y equipo, `374c5d8`), la historia de git (`614878c`, `86180ee`, `374c5d8`). Los criterios del jurado vienen de `Litmus/README.md` (2.º puesto) y la cita de la exactitud del pliego verbatim de Software Architecture Guild (3.º), porque ZAItects no incluye ninguno de los dos; lo dice la pantalla.

## Comandos

```bash
ELEVENLABS_API_KEY=... node tools/voice.mjs   # la voz (pendiente)
node tools/timing.mjs                         # reajusta todo a la voz (sin voz: node tools/timing.mjs estimate)
node tools/icons.mjs                          # solo si cambia la lista de íconos
npm run check                                 # lint, runtime, layout y contraste
../kit/snap.sh ch1                            # capturas de control en snapshots/qa (no entran en git)
npx hyperframes render -o renders/zaitects-cap1.mp4
```
