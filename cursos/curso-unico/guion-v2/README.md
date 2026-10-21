# Guion del curso, versión 2 (propuesta)

El guion completo del curso escrito desde `cursos/_investigacion/PLAN-CURSO.md`. Es una propuesta: no reemplaza a `guion/leccionN.md` ni toca `narration.json` hasta que Felix lo apruebe.

## Archivos

| Archivo | Bloque |
|---|---|
| `00-apertura.md` | El concurso y ClearView entero, sin explicar (romance) |
| `01-decision.md` | Qué es una decisión de arquitectura |
| `02-cualidades.md` | Del requisito a las cualidades, y renunciar por escrito |
| `03-cuenta.md` | Comprobar con una cuenta |
| `04-estilo.md` | El estilo |
| `05-corte.md` | Dónde se corta un sistema |
| `06-datos.md` | De quién es cada dato |
| `07-comunicacion.md` | Cómo se hablan las partes |
| `08-fallo.md` | Diseñar el fallo |
| `09-sensibles.md` | Los datos que no se pueden filtrar |
| `10-comprar.md` | Comprar, construir y empezar simple |
| `11-ia.md` | Un modelo de IA dentro del sistema |
| `12-cambiar.md` | Cambiar sin romper, y lo que queda escrito |
| `13-cierre.md` | ClearView de punta a punta (generalización) |

La división en videos se decide después: un bloque puede ser un video, o partirse en dos si pasa de unos 9 minutos.

## Forma de cada archivo

- Escenas con id (`{#id}`), en el orden en que se ven.
- **Narración:** prosa para leer en voz alta.
- **Visual:** la imagen central de la escena y los pasos, cada uno anclado a una palabra de la narración. Usa las piezas y comportamientos de `../GUIA-VISUAL.md`.
- **Notas de verificación** al final: cada hecho con su fuente, relativa a `katas-src/<Repo>/`.

## Cómo se trabajó (sombreros)

1. Dirección visual y diseño del aprendizaje: `../GUIA-VISUAL.md`.
2. Verificador: lectura de la fuente de cada ejemplo antes de escribir (lista en el plan y en cada tabla).
3. Arquitecto, guionista y diseño visual: cada bloque.
4. Espectador de prueba y editor: lectura de corrido, `check.mjs` y corrección de tics entre bloques (resultado al final de este archivo).

## Resultado de la fase 4 (espectador de prueba y editor)

- **Extensión:** unas 8.300 palabras de narración, cerca de 59 minutos a 140 palabras por minuto. Bloques de 2,7 a 5,8 minutos.
- **Frases largas:** ninguna de más de 28 palabras (`check.mjs` sobre la narración extraída de cada bloque).
- **Tics entre bloques:** las escenas de comparación abrían casi todas con "los dos" (25 veces). Cada una abre ahora por la idea o por los nombres de los casos.
- **Estados:** todo lo de Sysops Squad se narra como propuesta; DataDog y la entrega "al menos una vez" de Farmacy Food, también.
- **Anclas visuales:** cada paso «al decir "…"» se comprobó contra la narración de su escena; ninguna queda sin su frase.
- **Términos:** cada término se define en su primer uso dentro del bloque (cualidad, estilo, elasticidad, transacción, consistencia eventual, agregado, cola, stream, gateway, servicio gestionado, modelo propio, no determinista, fidelidad, relevancia). El p95 se dice como "de cada veinte fotos, más de una".
- **Casos:** cada caso invitado se presenta en su propia frase antes de usarse (Farmacy Family y Spotlight en el bloque 5, Wildlife Watcher en el 7, ShopWise en el 10, Certifiable en el 11).

## Pendiente antes de producir

- Que Felix lea y apruebe el guion.
- Decidir la división en videos (los bloques 1, 8, 10 y 11 rondan los 5,5 minutos; el resto, entre 3 y 5).
- Construir en el kit de animación las piezas y comportamientos de `../GUIA-VISUAL.md`, y el diagrama maestro de ClearView.
- Traducir a inglés cuando el español esté aprobado.
