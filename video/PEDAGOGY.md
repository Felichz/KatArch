# Guía pedagógica de los videos de KatArch

Estos videos son un curso. Un video bien animado que pasa de un concepto al siguiente sin darle tiempo a la cabeza del espectador no enseña: solo muestra. Esta guía es la vara con la que se audita y se reescribe cada capítulo. Dice **qué** se enseña y en qué orden; **cómo suena** la narración lo fija el skill `guion-curso` (`.claude/skills/guion-curso/SKILL.md`) y el `CLAUDE.md` personal de Felix («Cómo se escribe la narración»).

> **Octubre de 2026 (Five Nines):** los principios 4, 5, 6 y 7 se ajustaron y se agregó el 9, después de medir que la versión anterior producía una narración robótica: frases cortas y parejas, una síntesis por escena, repasos numerados y un «piénsalo tú» fijo en cada capítulo. Los cursos escritos antes de este cambio (ArchColider) siguen la versión anterior.
>
> **14 de octubre de 2026:** se eliminan la pausa de "piénsalo tú" y las preguntas al espectador (decisión de Felix). El curso explica todo de forma fluida; donde este documento menciona el dilema, la pausa o el anillo de cuenta regresiva, ya no aplica.

**El espectador tipo** es un desarrollador con un par de años de experiencia. Programa bien, pero nunca diseñó un sistema entero. No conoce la jerga de arquitectura, como DDD, capa anticorrupción, event sourcing o ADR. No vio el capítulo del curso escrito y no puede pausar para googlear.

## Los principios

1. **Primero el caso, después el nombre.** Antes de nombrar un concepto, se muestra el problema concreto de Farmacy Food que lo vuelve necesario, y el espectador siente la tensión. Recién entonces se le pone nombre. Nunca abrir con "El equipo usó X" si el espectador todavía no sabe por qué haría falta X.

2. **Cada término se define la primera vez, en palabras simples.** Si aparece "Domain-Driven Design", la frase siguiente dice qué es y para qué sirve, en una línea que un junior entienda. Una sigla o un término en inglés sin definir es un bache.

3. **El porqué de cada decisión, aplicado al caso.** Clasificar, elegir o descartar sin razonamiento no enseña nada. Por cada decisión importante, se dice por qué se tomó con los hechos del caso: el catálogo es core porque decide qué comida hay en cada refrigerador y a qué precio, y ahí está el negocio. Se usa el razonamiento real del equipo (`src/content/original-docs.ts`, `src/content/es/*.ts`). Si el equipo no lo escribió, se razona con los hechos del caso sin inventar datos.

4. **Una idea por párrafo, con espacio.** Un párrafo (30 a 60 segundos de voz) avanza una sola idea nueva; las frases pueden ser largas y subordinadas si el párrafo avanza de a una idea. Nunca tres conceptos nuevos encadenados ni listas de cinco cosas en una línea. Si una lista importa, cada elemento tiene su momento y su porqué. Si no importa, se resume en una frase y se deja para el curso escrito.

5. **Ejemplo trabajado → regla → aplicación.** El orden que funciona:
   - el equipo enfrenta un caso concreto;
   - se ve cómo lo resuelve, paso a paso;
   - se extrae la regla general;
   - el espectador la aplica en un dilema.

   El dilema (la pausa de "piénsalo tú") va **después** de dar las herramientas para responderla, solo donde nace de la historia, y como máximo una vez por capítulo. Se formula como se le preguntaría a alguien en una charla, no como un bloque fijo ("Ahora tú.").

6. **Andamiaje.** Cada concepto nuevo se ata a algo que el espectador ya tiene: un capítulo anterior o algo de su día a día como desarrollador. La referencia a un capítulo anterior va solo cuando aporta información, nunca como apertura de fórmula ("¿Recuerdas…?"). Las analogías se usan con moderación, solo cuando aclaran de verdad.

7. **Respirar y consolidar.**
   - El aire lo dan el ritmo del párrafo y el silencio: entre párrafos va una pausa corta (`"pauseAfter": 0.8` a `1`) mientras el visual sostiene la idea.
   - Las escenas **no** cierran con una frase-síntesis de fórmula, y el capítulo **no** cierra con un repaso numerado ("Repasemos: uno…").
   - Cada capítulo abre con una situación concreta (una fecha, un número, una escena del caso) y cierra volviendo a ella, diciendo qué cambió en cómo se ve el problema. La tarjeta del capítulo siguiente hace el puente.
   - Cada decisión deja un criterio que el espectador pueda llevarse, dicho como parte de la historia.

8. **El visual va con lo que se dice, y deja leer.** En pantalla aparece lo que la voz está explicando, en el momento en que lo explica. Si hay texto en pantalla, la voz no lo contradice y le da tiempo al espectador para leerlo: unas 3 palabras por segundo, como mínimo, antes de reemplazarlo. Nada aparece "de golpe" y se va antes de entenderse.

9. **Hecho, deducción y hueco.** Lo que prueba la fuente se dice como hecho; lo que deducimos, como deducción ("esa cuenta es nuestra"); lo que falta, como hueco, una sola vez. El narrador no da opiniones propias. Fechas, commits y ADRs se dicen solo si cambian cómo se entiende la decisión; el resto va a la tabla de verificación del guion.

10. **Menos contenido, mejor contado.** Primero se identifican las 2 a 4 ideas esenciales del capítulo y se les da todo el espacio que necesitan. Los detalles secundarios se recortan sin culpa, porque el curso escrito los cubre. Es preferible un capítulo de 6 minutos que se entiende a uno de 4 que se saltea los conceptos.

## Duración y ritmo

- Cada capítulo dura lo que necesite: normalmente **7 a 9 minutos**, unas 950 a 1.200 palabras habladas (en los cursos anteriores a octubre de 2026, 5 a 7 minutos).
- La voz real habla a unas 2,2 palabras por segundo.
- Un concepto nuevo importante necesita **al menos 20 a 40 segundos**: el caso, el nombre, la definición, el porqué y la síntesis. Un detalle menor puede ir en una sola frase.
- La pausa del dilema es de 3 segundos, con el anillo de cuenta regresiva visible.
- El guion se escribe primero como prosa en `guion/capN.md`, se revisa con `node .claude/skills/guion-curso/check.mjs`, y recién después se corta en escenas y líneas.

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
