# Brief: análisis de carga cognitiva y fricción de un guion

Curso en video de KatArch, en español neutro. Enseña arquitectura de software a partir de los 12 equipos que ganaron las O'Reilly Architecture Katas. Es un solo curso de once lecciones; los guiones están en `cursos/curso-unico/guion/leccionN.md`. Cada `## Título {#id}` es una escena del video, y la tabla del final ("Notas de verificación") no se narra.

## Contexto que tienes que leer
- El guion de la lección que te tocó, completo.
- Los títulos de las once lecciones (primera línea de cada `leccionN.md`), para saber qué tema le toca a cada una.
- `cursos/_corpus/DISENO-CURSO.md`, sobre todo los objetivos de aprendizaje (R1–R6 y el transversal) y el elenco de casos. Sirve para juzgar si una idea pertenece a esta lección o a otra.
- Los tiempos reales de cada escena, que puedes sacar de `cursos/curso-unico/video/chN/timing.js` (`window.TIMING.scenes[i].lines[j].start/end`, en segundos). Si no puedes leerlos, omite la columna de tiempo.

## Qué hacer
1. Divide la narración en **ideas**: cada afirmación, dato, ejemplo, definición o argumento que el espectador tiene que entender por separado. Quédate entre 25 y 40 por lección: una enumeración del mismo tipo (tres ejemplos seguidos, tres cifras de un mismo requisito) cuenta como una sola idea.
2. Para cada idea, asigna dos puntajes de 1 a 5.
   - **Carga cognitiva** se cuenta, no se siente: es el número de **elementos nuevos** que la idea le pide al espectador, más uno si además tiene que combinarlos con algo anterior (compararlo, deducir una consecuencia, seguir una cadena). Un **elemento nuevo** es un nombre propio (caso, producto, equipo, documento), un término técnico o sigla, una cifra, o un paso de un razonamiento que no se dio antes. Escala:
     - 1: ningún elemento nuevo (repite o aplica algo ya dicho).
     - 2: un elemento nuevo (un término, o un nombre, o una cifra).
     - 3: dos elementos nuevos, o uno nuevo combinado con algo anterior.
     - 4: tres elementos nuevos, o dos nuevos combinados con algo anterior.
     - 5: cuatro o más elementos nuevos.
     Cuenta con esta regla aunque la idea "suene" simple: una frase con un término nuevo y dos cifras es carga 4.
   - **Fricción con la idea anterior**: cuánto salto hay respecto de la idea inmediatamente anterior. Sube con un cambio de caso, un cambio de hilo o de tema, un concepto usado antes de presentarlo, una vuelta a un hilo abandonado sin puente, o un cambio brusco de nivel de abstracción. Usa toda la escala:
     - 1: continuación natural (el siguiente ejemplo de la misma lista).
     - 2: paso lógico con conector ("la segunda forma…", "por eso…").
     - 3: cambio de caso o de hilo anunciado, o un término usado sin presentar.
     - 4: herramienta, caso o tema nuevo que aparece en medio de un argumento sin presentación, o un cambio de tema que pertenece a otra lección.
     - 5: tema distinto sin ningún puente.
3. Justifica cada puntaje en una frase corta y concreta: qué nombre, qué cifra o qué salto lo explica.
4. Busca además problemas de estructura: cosas que la voz usa y nunca presentó, cifras que se contradicen, ideas que aparecen una vez y no se vuelven a usar, ideas que pertenecen al tema de otra lección, y casos nuevos por minuto.
5. **Contradicciones con otras lecciones.** Cuando la lección cuenta algo de un caso que aparece en otras lecciones (busca el nombre del caso en los otros `leccionN.md`), compara lo que dicen. Si dos lecciones dicen cosas incompatibles sobre el mismo caso, confirma en la fuente que cita la tabla de verificación, bajo `katas-src/<Repo>/`, cuál es la correcta, y dilo con la cita. Haz lo mismo con las cifras: si la lección redondea o simplifica una cifra de la fuente de forma que cambia su sentido, señálalo.

## Qué es un "caso nuevo"
La primera vez, en la lección, que se cuenta algo de un producto o caso (MonitorMe, ClearView, Sysops Squad, Farmacy Food, MobilityCorp, Spotlight, Farmacy Family, Certifiable, ShopWise, Wildlife Watcher, Hey Blue!, Road Warrior), sea recurrente o invitado. Una mención de pasada que no cuenta nada del caso no cuenta. En la tabla se anota el nombre del caso en la fila de esa primera vez, y "—" en las demás.

## Qué entregar
Escribe el resultado en `cursos/curso-unico/carga/leccionN.md`, en español neutro, con esta forma exacta (un script la va a leer):

1. Una línea con el total de ideas y la duración.
2. Una tabla con esta cabecera exacta: `| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |`. Una fila por idea, numeradas 1, 2, 3… sin saltos. **Tiempo** va como `m:ss` (puedes sacarlo de `timing.js`). **Carga** y **Fricción** son un solo entero del 1 al 5, sin negritas, sin rangos y sin texto. **Caso nuevo** es el nombre del caso o "—". No agregues filas de cabecera por escena: pon el id de la escena entre paréntesis al inicio de la columna "Idea" cuando empiece una escena nueva, por ejemplo `(gancho) El pedido de…`.
3. **Lo que muestran los puntajes**: de 4 a 6 hallazgos, cada uno con los números de idea que lo sostienen. Incluye explícitamente: ideas con carga 4 o más y fricción 3 o más; ideas con fricción 3 o más y carga 3 o más; pares de ideas seguidas con carga 4 o más; pares de casos nuevos a menos de dos minutos.
4. **Errores de hecho y contradicciones** que encontraste (punto 5 de "Qué hacer"), cada uno con la cita de la fuente. Si no encontraste ninguno, di "ninguno".
5. **Qué cambiaría**: de 2 a 4 cambios concretos.

No edites los guiones ni ningún otro archivo. Puntúa lo que lees, sin ayudar al guion: si una idea llega sin preparación, el puntaje lo dice. Tu respuesta final es un resumen de 5 líneas con los picos de carga y de fricción.
