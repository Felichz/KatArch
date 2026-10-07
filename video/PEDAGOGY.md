# Guía pedagógica de los videos de KatArch

Estos videos son un curso. Un video bien animado que pasa de un concepto al siguiente sin darle tiempo a la cabeza del espectador no enseña: solo muestra. Esta guía es la vara con la que se audita y se reescribe cada capítulo.

**El espectador tipo** es un desarrollador con un par de años de experiencia. Programa bien, pero nunca diseñó un sistema entero. No conoce la jerga de arquitectura, como DDD, capa anticorrupción, event sourcing o ADR. No vio el capítulo del curso escrito y no puede pausar para googlear.

## Los principios

1. **Primero el caso, después el nombre.** Antes de nombrar un concepto, se muestra el problema concreto de Farmacy Food que lo vuelve necesario, y el espectador siente la tensión. Recién entonces se le pone nombre. Nunca abrir con "El equipo usó X" si el espectador todavía no sabe por qué haría falta X.

2. **Cada término se define la primera vez, en palabras simples.** Si aparece "Domain-Driven Design", la frase siguiente dice qué es y para qué sirve, en una línea que un junior entienda. Una sigla o un término en inglés sin definir es un bache.

3. **El porqué de cada decisión, aplicado al caso.** Clasificar, elegir o descartar sin razonamiento no enseña nada. Por cada decisión importante, se dice por qué se tomó con los hechos del caso: el catálogo es core porque decide qué comida hay en cada refrigerador y a qué precio, y ahí está el negocio. Se usa el razonamiento real del equipo (`src/content/original-docs.ts`, `src/content/es/*.ts`). Si el equipo no lo escribió, se razona con los hechos del caso sin inventar datos.

4. **Una idea por vez, con espacio.** Una frase lleva una sola idea nueva. Nunca tres conceptos encadenados ni listas de cinco cosas en una línea. Si una lista importa, cada elemento tiene su momento, su frase y su porqué. Si no importa, se resume en una frase y se deja para el curso escrito.

5. **Ejemplo trabajado → regla → aplicación.** El orden que funciona:
   - el equipo enfrenta un caso concreto;
   - se ve cómo lo resuelve, paso a paso;
   - se extrae la regla general;
   - el espectador la aplica en un "piénsalo tú".

   La pregunta de "piénsalo tú" va **después** de dar las herramientas para responderla, nunca antes.

6. **Andamiaje.** Cada concepto nuevo se ata a algo que el espectador ya tiene: un capítulo anterior ("¿recuerdas el número del capítulo 1?") o algo de su día a día como desarrollador. Las analogías se usan con moderación, solo cuando aclaran de verdad.

7. **Respirar y consolidar.**
   - Después de una idea clave va una pausa corta (`"pauseAfter": 1` a `1.5`) mientras el visual la sostiene.
   - Cada escena cierra con una frase de síntesis.
   - El capítulo cierra repasando sus 2 a 4 ideas centrales.

8. **El visual va con lo que se dice, y deja leer.** En pantalla aparece lo que la voz está explicando, en el momento en que lo explica. Si hay texto en pantalla, la voz no lo contradice y le da tiempo al espectador para leerlo: unas 3 palabras por segundo, como mínimo, antes de reemplazarlo. Nada aparece "de golpe" y se va antes de entenderse.

9. **Menos contenido, mejor contado.** Primero se identifican las 2 a 4 ideas esenciales del capítulo y se les da todo el espacio que necesitan. Los detalles secundarios se recortan sin culpa, porque el curso escrito los cubre. Es preferible un capítulo de 6 minutos que se entiende a uno de 4 que se saltea los conceptos.

## Duración y ritmo

- Cada capítulo dura lo que necesite: normalmente **5 a 7 minutos**, unas 650 a 900 palabras habladas.
- La voz real habla a unas 2,2 palabras por segundo.
- Un concepto nuevo importante necesita **al menos 20 a 40 segundos**: el caso, el nombre, la definición, el porqué y la síntesis. Un detalle menor puede ir en una sola frase.
- La pausa de "piénsalo tú" es de 3 segundos, con el anillo de cuenta regresiva visible.

## Cómo auditar un capítulo (antes de reescribir)

Por cada escena del guion actual, anotar en `AUDIT.md`:

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |

Después, con la cabeza del espectador tipo, anotar:

- dónde se perdería;
- qué daría por sabido;
- qué preguntaría si pudiera ("¿por qué esto va acá?").

Cada pregunta así es un hueco que el nuevo guion tiene que llenar.

## Cómo verificar la reescritura

- Releer el guion completo en voz alta, imaginando al espectador tipo. Cada concepto tiene su caso, su definición, su porqué y su síntesis.
- La tabla de auditoría del guion nuevo no tiene ningún concepto importante con menos de unos 20 segundos.
- Las capturas confirman que lo que se ve corresponde a lo que se dice en ese momento, y que el texto en pantalla queda el tiempo suficiente para leerlo.

## Idioma (sin cambios)

- Español neutro con tuteo, sin regionalismos: refrigerador, comida, dinero.
- Los términos técnicos que la industria dice en inglés quedan en inglés: trade-off, deploy, cache, offline.
- Cada término técnico se define la primera vez que aparece.
