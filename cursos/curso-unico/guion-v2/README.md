# Guion del curso, versión 2

El guion completo del curso, escrito desde `cursos/_investigacion/PLAN-CURSO.md` y producido con el proceso de `cursos/curso-v2/PROCESO.md`. Cada bloque pasó por la revisión de los sombreros; falta la aprobación de Felix en los bloques 3 a 16 (el estado de cada uno está en `cursos/curso-v2/README.md`).

## Archivos

| Archivo | Bloque | Duración estimada |
|---|---|---|
| `00-apertura.md` | El concurso y ClearView entero, sin explicar | 2,4 min |
| `01-decision.md` | Qué es una decisión de arquitectura | 4,6 min |
| `02-cualidades.md` | Del requisito a las cualidades, y renunciar por escrito | 4,8 min |
| `03-cuenta.md` | Comprobar con una cuenta | 3,9 min |
| `04-estilo.md` | El estilo | 4,0 min |
| `05-corte.md` | Dónde se corta un sistema | 5,2 min |
| `06-guardar-datos.md` | Guardar datos | 5,6 min |
| `07-mover-y-procesar.md` | Mover y procesar | 5,3 min |
| `08-donde-corre.md` | Dónde corre | 4,8 min |
| `09-el-borde.md` | El borde | 7,2 min |
| `10-cuando-algo-falla.md` | Cuando algo falla | 7,4 min |
| `11-identidad-y-datos-sensibles.md` | Identidad y datos sensibles | 6,4 min |
| `12-ver-que-pasa.md` | Ver qué pasa | 5,4 min |
| `13-comprar-construir-crecer.md` | Comprar, construir y crecer | 6,5 min |
| `14-ia-en-el-sistema.md` | IA en el sistema | 6,8 min |
| `15-cambiar-sin-romper.md` | Cambiar sin romper | 5,7 min |
| `16-cierre.md` | ClearView de punta a punta | 3,9 min |

En total, unas 11.600 palabras y unos 90 minutos con el narrador estimado (la voz real cambia un poco los tiempos). Las duraciones salen de `timing.mjs estimate`.

- `ACTO1-CONTINUIDAD.md` y `ACTO2-CONTINUIDAD.md`: qué trae y qué presenta cada bloque (casos, términos, piezas de ClearView), y el resultado de la lectura seguida de todos los bloques.
- `v1/`: los guiones de la organización anterior, que dieron el material de los bloques 6 a 16.
- La traducción al inglés vive junto a cada video: `cursos/curso-v2/video/bNN/narration.en.md`.

## Forma de cada archivo

- Escenas con id (`{#id}`), en el orden en que se ven.
- **Narración:** prosa para leer en voz alta, un párrafo por línea de voz.
- **Visual:** la imagen de la escena, en pocas líneas. El guion visual completo, plano por plano, está en `cursos/curso-v2/video/bNN/IDEAL.md`.
- **Notas de verificación:** cada hecho con su fuente, relativa a `katas-src/<Repo>/`, y si el documento está en Proposed, Accepted o Draft.
- **Revisión por sombreros:** lo que encontró cada sombrero y qué se decidió.
