# Five Nines · Curso en video de KatArch

Un curso en video, con el método de KatArch, sobre el equipo **Five Nines**, ganador (1.er puesto) de la O'Reilly Architecture Kata Q4 2025 (*AI-Enabled Architecture*). El caso es MobilityCorp, una empresa europea de alquiler de scooters, bicicletas, autos y camionetas eléctricas que pidió decidir dónde usar inteligencia artificial, y dónde no.

Como en KatArch, el curso sigue a un solo equipo, en el orden en que razonó, y ancla cada afirmación a su repositorio ([TheKataLog/Five-Nines](https://github.com/TheKataLog/Five-Nines)), con los huecos contados como huecos. Son **8 capítulos**, **66 escenas** y unas 5.900 palabras habladas en español neutro: unos **47 minutos** a la velocidad de referencia de `KatArch/video/PEDAGOGY.md` (2,2 palabras por segundo, con pausas), **50:41** en el narrador simulado.

## Qué hay aquí

| Ruta | Qué es |
| - | - |
| [`HISTORIA.md`](HISTORIA.md) | El proceso del equipo, reconstruido día por día desde git, con commits: §1 el pliego (recuperado de los subtítulos de la sesión inaugural, agregados en 8a5ce24 y borrados en 31d6ccc), §2 inventario de artefactos, §3 el proceso día por día, §4 lo que entendió primero, lo que cambió y lo que fue pulido, §5 inconsistencias del repositorio y qué fuente seguimos, §6 lo que falta, §7 el contrapunto del podio. |
| [`GUION.md`](GUION.md) | El curso: visión general, lista de capítulos con sus anclas, y por capítulo su plan, su auditoría pedagógica y el guion completo, con una nota visual por escena. |
| [`fuentes/`](fuentes/) | El generador del guion: `ch1.py` … `ch8.py` (las escenas, con su nota visual y sus líneas), `guion_tpl.md` (el resto de `GUION.md`), `lib.py`, `stats.py` (palabras y segundos por escena) y `build.py`, que escribe `GUION.md` y los ocho `video/chN/narration.json`. |
| [`video/kit/`](video/kit/) | El kit compartido del curso: `assets/kit.base.css` (el de KatArch), `assets/kit.fn.css` (las piezas propias de este curso), `assets/kit.js` (el de KatArch más los bloques que se repiten: título, piénsalo, respuestas, repaso, próximo capítulo), fuentes, `icons.js`, `index.tpl.html` y las herramientas (`timing.mjs`, `voice.mjs`, `icons.mjs`). |
| [`video/sync-kit.mjs`](video/sync-kit.mjs) | Copia el kit a cada capítulo y escribe los archivos de proyecto (`package.json` con HyperFrames 0.8.139 fijo, `hyperframes.json`, `meta.json`, `.gitignore`, e `index.html` si falta). |
| `video/ch1/` … `video/ch8/` | Un proyecto de HyperFrames por capítulo, con la misma estructura que los de KatArch. Cada uno tiene su `README.md`. |

## Capítulos

| # | Capítulo | Escenas | Palabras | A 2,2 palabras/s | Estimado (`timing.mjs estimate`) |
| - | - | - | - | - | - |
| 1 | [El encargo](video/ch1/README.md) | 8 | 831 | 6:35 | 7:06 |
| 2 | [Antes de la IA, el negocio](video/ch2/README.md) | 8 | 771 | 6:11 | 6:39 |
| 3 | [Una sola fuente de verdad](video/ch3/README.md) | 9 | 797 | 6:23 | 6:42 |
| 4 | [¿IA generativa, aprendizaje automático o código?](video/ch4/README.md) | 8 | 723 | 5:46 | 6:18 |
| 5 | [Confiar en una IA que se equivoca](video/ch5/README.md) | 9 | 716 | 5:45 | 5:59 |
| 6 | [El vehículo correcto, en el lugar correcto](video/ch6/README.md) | 8 | 730 | 5:50 | 6:18 |
| 7 | [Cuando el proveedor cambia las reglas](video/ch7/README.md) | 8 | 665 | 5:19 | 5:42 |
| 8 | [Contar la arquitectura](video/ch8/README.md) | 8 | 670 | 5:25 | 5:57 |
| | **Total** | **66** | **5.903** | **47:14** | **50:41** |

## Estado

- Guion, notas visuales y composiciones de las 66 escenas: hechos. Los tiempos son estimados (narrador simulado); todas las animaciones están ancladas a palabras, así que se reajustan solas con la voz real.
- **Pendiente: la voz y el render.** Generar la voz consume créditos de ElevenLabs y queda a cargo de quien mantiene el curso (comandos abajo).

## El repositorio del equipo

Las fuentes se leen desde un clon completo del repositorio, en `katas-src/Five-Nines` (en la raíz del repositorio de KatArch, ignorado por git):

```bash
git clone https://github.com/TheKataLog/Five-Nines katas-src/Five-Nines
# el pliego (subtítulos de la sesión inaugural), que no está en el árbol final:
git -C katas-src/Five-Nines show '8a5ce24:sessions/#1/captions_en.txt'
```

## Comandos

Cambiar el guion (nunca a mano en `GUION.md` ni en `narration.json`):

```bash
python3 cursos/five-nines/fuentes/build.py          # reescribe GUION.md y video/chN/narration.json
python3 cursos/five-nines/fuentes/stats.py 3        # palabras y segundos por escena del capítulo 3
cd cursos/five-nines/video/ch3 && node tools/timing.mjs estimate && npm run check
```

Cambiar el kit (en `video/kit/`, nunca en la copia de un capítulo):

```bash
cd cursos/five-nines/video/kit && NODE_PATH=/ruta/a/node_modules node tools/icons.mjs   # react, react-dom y lucide-react
node cursos/five-nines/video/sync-kit.mjs           # copia el kit a los ocho capítulos
```

La voz y el render, capítulo por capítulo (necesita `ffmpeg` y `ffprobe`):

```bash
cd cursos/five-nines/video/ch1
ELEVENLABS_API_KEY=... node tools/voice.mjs         # una toma por escena; solo pide las escenas que cambiaron
node tools/timing.mjs                               # reajusta las animaciones a la voz real
npm run check                                       # lint, runtime, layout, movimiento y contraste
npx --yes hyperframes@0.8.139 render -o renders/five-nines-cap1.mp4
```

La voz (`assets/voice/`, `voice.json`), los renders y las capturas (`snapshots/`) quedan fuera de git; los archivos temporales, en `.tmp/`.

## Atribución

Un proyecto educativo independiente, construido sobre material público de la competencia. Los documentos, diagramas y ADRs pertenecen al equipo Five Nines y se publican en [TheKataLog](https://github.com/TheKataLog); el curso los cita y los redibuja, sin copiar sus imágenes. Las menciones a Nimrods (2.º puesto) se limitan a un contrapunto en el capítulo 6.
