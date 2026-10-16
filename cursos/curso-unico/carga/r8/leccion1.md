Lección 1 (Qué es una decisión de arquitectura): 40 ideas, duración 3:40 (tiempos de `carga/r8/tiempos-ch1.txt`).

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (intro) Las decisiones que más pesan se toman antes de escribir código y se siguen pagando después. Este es un curso sobre ellas. | 2 | 1 | — | Un concepto nuevo ("decisiones que pesan"). Es la primera idea, no hay salto. |
| 2 | 0:14 | Trata de cómo se diseña un sistema entero, y se aprende equivocándose. | 2 | 2 | — | "Sistema entero" como alcance y "aprender equivocándose" como afirmación sin ejemplo. Continúa la idea anterior. |
| 3 | 0:21 | Para enseñarlas, el curso usa katas: un equipo diseña la solución de un caso de negocio. | 3 | 3 | — | "Kata" y "caso de negocio" son dos términos nuevos sin presentación previa. "Para enseñarlas" anuncia el cambio de hilo. |
| 4 | 0:30 | Alguien hace de cliente. | 2 | 1 | — | Un rol nuevo (el cliente de la kata). Continúa la descripción. |
| 5 | 0:31 | O'Reilly organiza katas de arquitectura. | 2 | 3 | — | Nombre propio nuevo que entra sin anuncio. No vuelve a aparecer en la lección. |
| 6 | 0:31 | El curso usa lo que dejaron escrito los equipos que las ganaron. | 2 | 2 | — | Un elemento nuevo: el material escrito por los ganadores. Paso lógico con "El curso usa". |
| 7 | 0:38 | Fue entre 2020 y 2025. | 2 | 1 | — | Un rango de años (una cifra). No vuelve a aparecer en la lección. |
| 8 | 0:40 | (ruta) Con ese material, veamos adónde lleva el curso; al terminar, frente a un sistema nuevo, vas a poder decir qué decisiones hay que tomar y en qué orden. | 2 | 2 | — | Un elemento nuevo: el objetivo de la lección. Es un anuncio de sección, sin salto de tema. |
| 9 | 0:50 | Primero se decide qué importa en el pedido del cliente. | 2 | 2 | — | Un elemento nuevo: "qué importa en el pedido", primer paso del método. Continúa el objetivo. |
| 10 | 0:50 | Después, cómo se divide, se conecta y se protege el sistema. | 4 | 2 | — | Tres temas nuevos en una sola frase (dividir, conectar, proteger). La enumeración cuenta como una idea, pero pesa tres elementos. |
| 11 | 0:58 | (kata) Antes de seguir, una aclaración: en los repositorios que leímos hay diseños y documentos, no un sistema funcionando. | 3 | 3 | — | "Repositorios" y "sistema funcionando" son dos elementos nuevos. "Antes de seguir" anuncia el cambio, del método a la naturaleza del material. |
| 12 | 1:07 | (decision) Con eso claro, pasemos a un caso. | 1 | 3 | — | Sin elementos nuevos. Anuncia el cambio de caso. |
| 13 | 1:09 | Farmacy Food es un servicio de comidas preparadas. | 3 | 3 | Farmacy Food | Nombre del caso más un concepto (comidas preparadas): dos elementos nuevos. Entra con un cambio de caso anunciado. |
| 14 | 1:09 | Esas comidas se entregan en refrigeradores inteligentes. | 2 | 1 | — | Un elemento nuevo (refrigeradores inteligentes). Continúa el caso. |
| 15 | 1:15 | Su equipo tuvo que decidir cómo vigilar los servidores del sistema; esa decisión es de arquitectura, y hay dos motivos. | 3 | 2 | — | "Monitoreo" y la definición de decisión de arquitectura: dos elementos nuevos. Anuncia dos motivos. |
| 16 | 1:23 | Primer motivo: cuesta cambiarla, porque otras decisiones se apoyan en ella; cambiarla obliga a revisar esas otras. | 3 | 2 | — | Un criterio nuevo (costo de cambiar, dependencias) combinado con la "decisión de arquitectura" de la línea anterior. |
| 17 | 1:32 | Por ejemplo, ese monitoreo sirve para decidir cuándo agregar servidores. | 3 | 2 | — | Un elemento nuevo (el monitoreo como base para escalar) combinado con la dependencia de la idea 16. |
| 18 | 1:36 | Segundo motivo: no afecta a una función en particular, sino al sistema entero. | 2 | 2 | — | Un criterio nuevo (alcance transversal). "Sistema entero" ya se dijo en la idea 2. |
| 19 | 1:42 | (ejemplo) Veamos qué opciones tenía ese equipo. | 1 | 2 | — | Sin elementos nuevos. Anuncio de sección. |
| 20 | 1:44 | Había herramientas gratuitas, de código abierto, que hay que instalar y mantener. | 3 | 2 | — | Dos conceptos nuevos: código abierto como categoría y el costo de mantener. |
| 21 | 1:44 | Estaba DataDog, que cuesta quince dólares por servidor al mes. | 4 | 2 | — | Nombre propio (DataDog, producto, no es del elenco) y una cifra (15 dólares por servidor al mes), comparados con las herramientas gratuitas de la idea 20. |
| 22 | 1:53 | El equipo propuso DataDog porque casi no pide mantenimiento. | 3 | 2 | — | Un criterio nuevo (mantenimiento) combinado con el precio de la idea 21. |
| 23 | 1:53 | Con una herramienta de código abierto, alguien tendría que dedicar entre un quinto y la mitad de su tiempo a cuidar el monitoreo. | 4 | 2 | — | Una cifra (0,2 a 0,5 del tiempo de una persona) y el tiempo como costo, combinados con el mantenimiento de la idea 22. |
| 24 | 2:04 | Ese tiempo es un costo aunque no figure en ninguna lista de precios. | 3 | 2 | — | Un concepto nuevo (costo que no aparece en precios) combinado con el tiempo de la idea 23. |
| 25 | 2:04 | A esto se le llama trade-off: lo que se gana con una opción junto con lo que se paga a cambio. | 3 | 2 | — | Un término nuevo con su definición (dos elementos). Se presenta en la misma frase, así que no hay salto. |
| 26 | 2:15 | Aquí se gana tiempo del equipo y se paga con dinero. | 1 | 2 | — | Aplica el trade-off al caso. Sin elementos nuevos. |
| 27 | 2:19 | (adr) Veamos ahora cómo quedó escrita esa decisión. | 1 | 3 | — | Sin elementos nuevos. Cambio de hilo anunciado: de la decisión al documento. |
| 28 | 2:22 | Quedó en un documento corto que se llama ADR, el registro de una decisión de arquitectura. | 3 | 2 | — | Sigla nueva (ADR) con su definición: dos elementos nuevos. Entra presentada. |
| 29 | 2:27 | Un ADR completo responde cuatro cosas; primero, por qué había que decidir. | 3 | 2 | — | La estructura de cuatro partes y la primera parte: dos elementos nuevos. |
| 30 | 2:32 | Aquí: el sistema iba a crecer y había que agregar servidores a tiempo. | 3 | 2 | — | El motivo del caso (crecimiento) es un elemento nuevo combinado con la primera parte de la idea 29. |
| 31 | 2:37 | Después, las otras opciones y su costo; luego, lo que cuesta lo elegido; y por último, el requisito, algo que el cliente pidió. | 3 | 1 | — | Un término nuevo: requisito. Las opciones y sus costos ya se vieron en las ideas 20 a 26. Es la lista que empezó en la idea 29. |
| 32 | 2:48 | (falta) Falta mirar qué tiene ese ADR: tiene las tres primeras partes y le falta la cuarta. | 1 | 3 | — | Aplica la lista de cuatro. Cambio de hilo: se pasa a evaluar el ADR del caso. |
| 33 | 2:53 | Dice que el sistema crece rápido, pero no remite a ningún requisito del cliente. | 2 | 2 | — | Un elemento nuevo: la diferencia entre decir una necesidad y remitir a un requisito. Ver error 1. |
| 34 | 2:58 | Cabe preguntarse si es una excepción; contamos a mano las decisiones escritas de los ganadores. | 3 | 3 | — | Un método nuevo (contar a mano) y una pregunta nueva. Cambio de hilo: de un ADR a una estadística. |
| 35 | 3:04 | Algo más de una de cada cuatro cita el requisito que la origina. | 3 | 2 | — | Una cifra (27 %, 50 de 183) combinada con la pregunta de la idea 34. El enunciado omite el criterio "con identificador o enlace" (error 1). |
| 36 | 3:08 | (cierre) Al comienzo dijimos que las decisiones que más pesan se toman antes de escribir código; la del monitoreo de Farmacy Food cabe en un documento corto. | 1 | 2 | — | Vuelta a la idea 1 con puente explícito. Sin elementos nuevos. |
| 37 | 3:20 | En ese documento quedó escrito el costo de la opción de código abierto. Sin esa línea, habría parecido gratis. | 3 | 2 | — | Una idea nueva (el ADR registra el costo oculto) combinada con el trade-off de las ideas 24 a 26. |
| 38 | 3:27 | Eso cambia de dónde se puede aprender. | 2 | 3 | — | Una tesis nueva (aprender de decisiones ajenas) sin preparación. Salto de abstracción: de un ADR a la forma de aprender. |
| 39 | 3:30 | Además de los errores propios, hay decisiones ajenas, como esta. | 4 | 2 | — | Dos conceptos nuevos (errores propios, decisiones ajenas) combinados con "aprender" de la idea 38. |
| 40 | 3:30 | Si están escritas completas, otra persona puede comprobarlas antes de apoyar nada encima. | 4 | 2 | — | Comprobar y apoyarse encima (dos elementos nuevos) combinados con "escritas completas", que remite al ADR de la idea 29. |

## Lo que muestran los puntajes

1. **Carga 4 o más con fricción 3 o más: ninguna.** Las ideas de carga 4 (10, 21, 23, 39, 40) tienen fricción 2. Son densas, pero no saltan.
2. **Fricción 3 o más con carga 3 o más:** ideas 3 (katas, 0:21), 11 (repositorios, 0:58), 13 (Farmacy Food, 1:09) y 34 (conteo de ADR, 2:58). Las tres primeras llegan con un cambio de hilo anunciado ("Para enseñarlas", "Antes de seguir", "pasemos a un caso"). La 34 pasa de un ADR a una estadística sin transición.
3. **Pares seguidos con carga 4 o más:** 39 y 40, las dos a las 3:30, en el cierre. Son ocho elementos nuevos en los últimos segundos ("errores propios", "decisiones ajenas", "comprobar", "apoyar encima"). La idea 38 (fricción 3) llega sin preparación.
4. **Casos nuevos:** la lección tiene uno solo, Farmacy Food (idea 13, 1:09), así que no hay pares a menos de dos minutos. DataDog no cuenta como caso: es un producto que no está en el elenco, y en la tabla se puntúa como nombre propio.
5. **Arranque de kata con tres cambios de hilo en 40 segundos:** ideas 3, 5 y 11 con fricción 3 (0:21 a 0:58). La 5 (O'Reilly) y la 7 (2020 a 2025) son nombres o fechas que no vuelven a aparecer en la lección: se suman al costo sin que nada se apoye en ellos.
6. **Peaks de fricción en general:** nueve ideas con fricción 3 (3, 5, 11, 12, 13, 27, 32, 34, 38). Casi todas tienen un anuncio antes, así que el salto se avisa, pero el espectador debe cambiar de tema nueve veces en 3:40.

## Errores de hecho y contradicciones

1. **Criterio de la cifra 27 % (ideas 33 y 35).** La narración dice que "algo más de una de cada cuatro cita el requisito que la origina". La fuente cuenta otra cosa. `_corpus/dossiers/D7-decisiones-escritas.md`, línea 11: "50 de 183 (27 %) citan el requisito o la característica que los origina **con un identificador o un enlace**." La línea 50 del mismo dossier dice que cuatro de los repos que no citan así (AC, CC, CA, ZA) sí "dicen la necesidad con palabras en el Context". Esto cambia el sentido: el espectador entiende "menciona el requisito", y ADR-003 sí menciona la necesidad en palabras ("This is a fast growing system", `4.ADRs/003 Tracing and Monitoring Sytem.md`, línea 10). Con la definición completa, el ejemplo de la idea 33 queda más claro, no contradictorio. La misma frase aparece en la lección 11 (línea 25), con el mismo problema.
2. **Precisión: "vigilar los servidores" (idea 15).** No es un error grave, pero el ADR-003 habla de otra cosa: "get the full picture of correlated business events, connected services and amount of consumed resources" (ADR-003, Context, línea 12). El monitoreo no es solo de servidores.
3. **Precisión: "se entregan en refrigeradores inteligentes" (idea 14).** La fuente dice que el usuario "pick up items at any one of their points of sale / smart-fridge" (`1.ProblemBackground/BusinessDrivers.md`, línea 5 del objetivo de negocio). El cliente retira la comida en la heladera; "se entregan" deja abierto que la lleva alguien.
4. **Cifras verificadas sin diferencias:** $15 USD por host al mes (ADR-003, Decision/Consequences), "0.2-0.5 time of a developer / administrator" como "entre un quinto y la mitad" (Decision, línea 35), Proposed (línea 7), Grafana "free of charge" y ELK "no financial costs" (líneas 19 a 23). Las lecciones 5 y 7 repiten la misma definición de Farmacy Food, y son consistentes con esta. Ninguna otra lección cita DataDog ni el ADR-003.

## Qué cambiaría

1. **Escribir el criterio en la cifra.** Idea 35: "Algo más de una de cada cuatro decisiones cita su requisito con un número o un enlace." Idea 33: "Dice que el sistema crece rápido: lo dice con palabras, sin número ni enlace al requisito." Igual en la lección 11, línea 25.
2. **Partir las ideas 21 y 23 (carga 4).** En la 21: primero "Estaba DataDog", después "cuesta quince dólares por servidor al mes", en otra frase. En la 23: primero "alguien tendría que dedicar tiempo a cuidar el monitoreo", y después "entre un quinto y la mitad". Cada parte queda en carga 2 o 3.
3. **Cerrar con el hilo del caso.** Cortar "Además de los errores propios" (idea 39). Antes de "decisiones ajenas" (38) y de "comprobarlas" (40), conectar con el ADR que se acaba de analizar: "por eso el ADR de Farmacy Food sirve para aprender". Así las ideas 38 a 40 dejan de ser una tesis nueva al final.
4. **Quitar O'Reilly y el rango de años** (ideas 5 y 7), o moverlos a la lección 11, que es donde se cierra el material. Ninguno se usa después en la lección, y bajan el arranque de kata de tres cambios de hilo a uno.

**Nota fuera del brief:** la idea 7 ("Fue entre 2020 y 2025") choca con la regla de la memoria del proyecto ("Sin fechas ni arqueología: nada de fechas exactas ni años"). Conviene decidir si se mantiene.
