39 ideas, duración 3:31 (según `tiempos-ch1.txt`).

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (intro) Las decisiones que más pesan en un sistema se toman antes de escribir código y se siguen pagando después | 2 | 1 | — | Tesis de apertura. Un solo elemento nuevo (decisiones que pesan antes del código); "se siguen pagando" es su consecuencia. |
| 2 | 0:11 | Este es un curso sobre ellas | 1 | 1 | — | Repite "decisiones" con un pronombre. |
| 3 | 0:13 | Trata de diseñar un sistema entero; las decisiones casi siempre se aprenden equivocándose | 3 | 1 | — | Dos afirmaciones nuevas: el tema es diseñar un sistema entero y se aprende equivocándose. Continuación directa. |
| 4 | 0:19 | Para enseñarlas, el curso usa un material especial | 2 | 2 | — | "Material especial" se anuncia sin nombrarlo; la idea siguiente lo define. Paso con "Para". |
| 5 | 0:23 | Son ejercicios de diseño llamados katas; en una kata, un equipo diseña la solución de un caso de negocio | 3 | 2 | — | Dos términos nuevos en la misma frase: kata y caso de negocio. Define el material anunciado. |
| 6 | 0:30 | Alguien hace de cliente | 3 | 1 | — | Rol de cliente (1 nuevo) combinado con la kata de la idea 5. |
| 7 | 0:32 | O'Reilly organiza katas de arquitectura; el curso usa lo que dejaron los equipos que las ganaron | 3 | 2 | — | O'Reilly (nombre propio) y la fuente del material: los equipos ganadores. |
| 8 | 0:38 | Fue entre 2020 y 2025 | 4 | 1 | — | Dos cifras (años) que se combinan con los equipos ganadores de la idea 7. Ver "Qué cambiaría". |
| 9 | 0:40 | (ruta) Con ese material, veamos adónde lleva el curso | 1 | 3 | — | Cambio de hilo anunciado: de la fuente del material a la ruta del curso. Sin elementos nuevos. |
| 10 | 0:43 | Al terminar, frente a un sistema nuevo, vas a poder decir qué decisiones hay que tomar y en qué orden | 2 | 1 | — | Objetivo. Un elemento nuevo: el orden de las decisiones. Continúa la ruta. |
| 11 | 0:49 | Primero se decide qué importa en el pedido del cliente; después, cómo se divide y se conecta el sistema | 3 | 2 | — | "Pedido del cliente" y "dividir y conectar el sistema" son dos etapas nuevas, sobre el orden de la idea 10. |
| 12 | 0:56 | (kata) Antes de seguir, una aclaración: lo que dejaron los equipos son sobre todo diseños y documentos | 3 | 3 | — | Corta la ruta con una aclaración. "Diseños y documentos" (nada se construyó ni se operó) se combina con el material de la idea 7. |
| 13 | 1:03 | (decision) Con eso claro, pasemos a un caso. El caso se llama Farmacy Food | 2 | 3 | Farmacy Food | Cambio de caso anunciado. Un nombre propio nuevo. |
| 14 | 1:07 | Es un servicio de comidas preparadas que se entregan en refrigeradores inteligentes | 4 | 1 | — | Dos elementos nuevos (comidas preparadas; refrigeradores inteligentes) combinados con Farmacy Food. Continuación de la descripción. |
| 15 | 1:13 | Su equipo tuvo que decidir cómo vigilar los servidores del sistema; esa decisión es de arquitectura, y hay dos motivos | 4 | 2 | — | Tres elementos nuevos: el monitoreo como decisión, el criterio "de arquitectura" y la cifra "dos motivos". |
| 16 | 1:21 | El primero es que cuesta cambiarla, porque otras decisiones se apoyan en ella; o sea, cambiarla obliga a revisar esas otras decisiones | 4 | 2 | — | Dos conceptos nuevos (costo de cambio; dependencia entre decisiones) combinados con la decisión de monitoreo. La parte "o sea" es paráfrasis y no suma. |
| 17 | 1:30 | El segundo es que no afecta a una función en particular, sino al sistema entero | 3 | 1 | — | Criterio nuevo (alcance: una función o el sistema) combinado con el motivo anunciado. Continuación directa. |
| 18 | 1:35 | (ejemplo) Veamos qué opciones tenía ese equipo | 1 | 2 | — | Paso a los ejemplos. Sin elementos nuevos. |
| 19 | 1:38 | Había herramientas gratuitas, de código abierto; hay que instalarlas y mantenerlas | 3 | 1 | — | "Código abierto" como término (1) y el costo de mantener la herramienta (2). Primera opción de la lista. |
| 20 | 1:43 | Y estaba DataDog. Cuesta quince dólares por servidor al mes | 4 | 1 | — | DataDog (nombre) y la cifra de quince dólares, combinados con la lista de la idea 19. Segunda opción de la misma lista. |
| 21 | 1:47 | El equipo propuso DataDog | 2 | 2 | — | Hecho nuevo: la elección del equipo. Pasa de la lista de opciones a la decisión del caso, sin conector. |
| 22 | 1:47 | Con una herramienta de código abierto, alguien tendría que dedicar entre un quinto y la mitad de su tiempo al monitoreo | 4 | 2 | — | Dos cifras (un quinto y la mitad) y un costo que no es dinero (tiempo de una persona), combinados con la opción de código abierto. |
| 23 | 1:56 | Ese tiempo también es un costo, aunque no figure en ninguna lista de precios | 3 | 1 | — | Concepto nuevo de costo no monetario, combinado con el tiempo de la idea 22. |
| 24 | 2:01 | A eso se le llama trade-off, lo que se gana con una opción junto con lo que se paga a cambio | 4 | 2 | — | Término nuevo (trade-off, en inglés) y su definición, combinados con el ejemplo. Es el término central y no vuelve a aparecer en la lección. |
| 25 | 2:07 | (adr) Veamos ahora cómo quedó escrita esa decisión | 1 | 3 | — | Cambio de hilo anunciado: de las opciones al documento. |
| 26 | 2:10 | Quedó en un documento corto que se llama ADR, el registro de una decisión de arquitectura | 3 | 2 | — | Sigla ADR (1) y su definición (2). Conector "se llama". |
| 27 | 2:16 | Un ADR completo responde cuatro cosas. Primero, por qué había que decidir | 3 | 2 | — | Estructura de cuatro partes (1) y la primera parte (2). |
| 28 | 2:21 | Aquí, porque el sistema iba a crecer y había que agregar servidores a tiempo | 3 | 1 | — | Razón concreta (crecimiento y escalado) que responde la primera parte de la idea 27. |
| 29 | 2:25 | Después, qué otras opciones había y cuánto costaba cada una; luego, qué cuesta lo elegido | 2 | 1 | — | Partes 2 y 3 de la estructura. El contenido ya se conoció (opciones y costos); solo se nombra como sección. |
| 30 | 2:31 | Y por último, el requisito que pide la decisión. Un requisito es algo que el cliente pidió | 3 | 2 | — | "Requisito" como término (1) y la parte 4 de la estructura (2). |
| 31 | 2:37 | (falta) Falta mirar qué tiene ese ADR | 1 | 2 | — | Vuelve al ejemplo con un conector. |
| 32 | 2:39 | Tiene las tres primeras partes y le falta la cuarta. Dice que el sistema crece rápido, pero no remite a ningún requisito del cliente | 3 | 2 | — | Veredicto (le falta la cuarta parte) y "no remite a un requisito", combinados con las cuatro partes de las ideas 27 a 30. |
| 33 | 2:47 | Veamos si eso pasa solo en este ADR | 1 | 3 | — | Cambio de alcance anunciado: de un ADR a las decisiones de los equipos. |
| 34 | 2:50 | Contamos a mano las decisiones escritas de los equipos ganadores. Algo más de una de cada cuatro remite, con un identificador o un enlace, a lo que la origina | 4 | 1 | — | Método de conteo, criterio de "remite" (identificador o enlace) y una cifra aproximada ("una de cada cuatro"), combinados con el requisito de la idea 30. |
| 35 | 3:00 | (cierre) Al comienzo dijimos que las decisiones que más pesan se toman antes de escribir código y se siguen pagando; la del monitoreo de Farmacy Food cabe en un documento corto | 2 | 2 | — | Vuelve a la idea 1 con puente explícito ("al comienzo"). Lo nuevo es que el caso cabe en un documento. |
| 36 | 3:11 | En ese documento quedó escrito el tiempo que costaría la opción de código abierto. Sin esa línea, habría parecido gratis | 3 | 2 | — | Dato del ADR (0,2 a 0,5 de un desarrollador) y una consecuencia contrafáctica, combinados con el trade-off de la idea 24. |
| 37 | 3:19 | Eso cambia de dónde se puede aprender | 3 | 3 | — | "Eso" no dice qué cambia. "Aprender de decisiones ajenas" es nuevo y el salto no tiene puente claro. |
| 38 | 3:21 | Además de los errores propios, hay decisiones ajenas, como esta | 3 | 3 | — | "Errores propios" se usa sin presentar (de quién, qué errores). "Decisiones ajenas" es un concepto nuevo. |
| 39 | 3:21 | Si están escritas completas, otra persona puede comprobarlas antes de apoyar nada encima | 3 | 1 | — | Comprobar una decisión (paso nuevo) combinado con "escritas completas" (las cuatro partes). Es el tema de la lección 11. |

## Lo que muestran los puntajes

1. **Carga 4 o más con fricción 3 o más: ninguna.** Las ocho ideas con carga 4 son 8, 14, 15, 16, 20, 22, 24 y 34, y ninguna pasa de fricción 2. La carga alta llega, pero cada idea sigue a la anterior con un conector o una continuación.

2. **Fricción 3 o más con carga 3 o más: ideas 12, 37 y 38.** La 12 es una aclaración en medio de la ruta (0:56). Las 37 y 38 están en el cierre (3:19 a 3:21): "Eso cambia de dónde se puede aprender" no dice qué cambia, y "los errores propios" aparece sin haberse presentado.

3. **Pares seguidos con carga 4 o más: 14–15 y 15–16.** Son tres ideas de carga 4 seguidas, entre 1:07 y 1:21 (la 15 aparece en ambos pares). En unos 20 segundos el espectador recibe siete elementos nuevos: el caso, sus refrigeradores, la decisión de monitoreo, el criterio de arquitectura, los dos motivos, el costo de cambio y la dependencia entre decisiones.

4. **Cluster de costo: ideas 20 a 24 (1:43 a 2:01).** Cinco ideas en 18 segundos, con carga 4, 2, 4, 3 y 4. El trade-off (idea 24) llega cuando el espectador todavía tiene en la cabeza DataDog, "quince dólares" y "un quinto y la mitad", así que el término nuevo se suma a cifras frescas.

5. **Casos nuevos y piezas fuera de lugar.** Solo hay un caso nuevo (Farmacy Food, idea 13), así que no hay pares de casos nuevos a menos de dos minutos. Dos piezas no pertenecen a esta lección o no se reutilizan: "trade-off" se define en la idea 24 y no vuelve a aparecer (el cierre de la idea 36 es el lugar natural), y la idea 39 ("otra persona puede comprobarlas") es el tema de la lección 11.

## Errores de hecho y contradicciones

Ninguno. Lo que se cotejó coincide con la fuente:

- DataDog "$15 USD per host, per month": ADR-003 (`ArchColider-src\4.ADRs\003 Tracing and Monitoring Sytem.md`), líneas 19 y 38. La narración dice "quince dólares por servidor al mes".
- "0.2-0.5 time of a developer / administrator", línea 35: la narración dice "entre un quinto y la mitad de su tiempo".
- "Status Proposed", línea 7: la narración dice "el equipo propuso DataDog". Sin contradicción, aunque la línea 35 dice "we decided to choose DataDog". La narración sigue el estado.
- "fast growing system and just-in-time scaling is essential", línea 10: la narración dice "el sistema iba a crecer y había que agregar servidores a tiempo".
- ADR-003 no cita requisito por identificador ni enlace. Por eso dice "no remite a ningún requisito", y coincide con D7 (`_corpus\dossiers\D7-decisiones-escritas.md`), §2.1, línea 46: 50 de 183 (27 %) remiten al requisito.
- Años 2020 a 2025: `katas-src\dotgithub\profile\README.md` líneas 11, 22 y 27 (Autumn/Fall 2020 a Q4 2025). Coincide con la narración.
- Farmacy Food como servicio de comidas en refrigeradores inteligentes: coincide con D7 línea 137 ("vende comida desde neveras inteligentes"). No abrí `BusinessGoalAndScope.md`.

No hay contradicción con las demás lecciones sobre el caso: en la lección 5 y la 7 se vuelve a presentar Farmacy Food con la misma frase de la lección 1, pero eso es repetición, no contradicción.

## Qué cambiaría

1. **Quitar "Fue entre 2020 y 2025" (idea 8).** Son dos cifras que suben la carga a 4 justo antes del caso. Además, la memoria de Felix dice "sin fechas ni años" para el curso. Los años son correctos según la fuente, así que la decisión es de estilo y no de hecho.

2. **Reescribir el cierre (ideas 36 a 38).** En la 36, decir "el trade-off de la opción de código abierto" para que el término vuelva a usarse. En la 37, sustituir "eso cambia de dónde se puede aprender" por la frase que lo dice. En la 38, presentar "errores propios" (de quién y qué errores) o quitarlo. La idea 39 queda para la lección 11.

3. **Separar el pico de 14 a 16.** Dar el criterio de costo de cambio (idea 16) con un ejemplo que ya salga del caso, por ejemplo que la decisión de monitoreo condiciona escalar o extraer servicios, como dice el ADR-003 en su línea 11. Así el espectador ve el criterio en una cosa concreta en vez de dos conceptos abstractos seguidos. Conviene una frase de transición entre 15 y 16.

4. **Mover la aclaración de la idea 12.** "Lo que dejaron son diseños y documentos" corta la ruta (9 a 11) y el caso (13). Pasarla a la sección del material, justo después de la idea 8, o reducirla a una frase dentro de la idea 7.

## Archivos

- Este resultado: `cursos/curso-unico/carga/r10/leccion1.md`
- Guion puntuado: `cursos/curso-unico/guion/leccion1.md` (no editado)
- Fuente del caso: `katas-src/ArchColider/4.ADRs/003 Tracing and Monitoring Sytem.md`
