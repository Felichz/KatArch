# Brief: reescribir el guion de una lección con las reglas de carga cognitiva

Curso en video de KatArch, en español neutro: un solo curso de once lecciones que enseña arquitectura de software a partir de los 12 equipos que ganaron las O'Reilly Architecture Katas. Los guiones están en `C:\Users\felix\dev\katarch-katas\cursos\curso-unico\guion\leccionN.md`. Cada `## Título {#id}` abre una escena del video, y la tabla "Notas de verificación" al final no se narra. Un narrador lee el guion de corrido, sin pausas ni preguntas al espectador.

Los guiones actuales fueron analizados idea por idea. Encontraron 24 errores de hecho (ya verificados contra los repositorios) y demasiados puntos donde una idea difícil llega sin preparación. Tu trabajo es **reescribir tu lección** para que cumpla las reglas de abajo, corrija sus errores y siga enseñando lo mismo.

## Lee primero (en este orden)
1. `CANON.md`: nombres de los casos, términos y la lección que los presenta, hechos corregidos y vocabulario. Es obligatorio y manda sobre tu guion actual.
2. Tu guion actual, `guion/leccionN.md`, completo.
3. `carga/v1/leccionN.md`: el análisis de tu lección (cada idea con su carga y su fricción, y los hallazgos). Los números muestran dónde duele; las propuestas de "qué cambiaría" son sugerencias, no órdenes.
4. `carga/RESUMEN.md`, solo las filas de tu lección en las secciones 1 (errores), 2 (contradicciones), 3 (matices) y 4 (estructura). Cada error confirmado tiene que quedar corregido.
5. `C:\Users\felix\dev\katarch-katas\cursos\_corpus\DISENO-CURSO.md` (resultados de aprendizaje R1 a R6 y el transversal): lo que tu lección tiene que lograr.
6. `C:\Users\felix\dev\katarch-katas\.claude\skills\guion-curso\SKILL.md`: la voz. Las reglas de voz del proyecto siguen vigentes (abajo hay un resumen).
7. Las fuentes de los repositorios, bajo `C:\Users\felix\dev\katarch-corpus\<Repo>-src\`, para cada cifra o afirmación que escribas o cambies.

## Las reglas de carga cognitiva

Se miden idea por idea. Una **idea** es una afirmación, dato, ejemplo, definición o argumento que el espectador tiene que entender por separado. Cada idea tiene dos puntajes de 1 a 5:

- **Carga cognitiva** se cuenta, no se siente: es el número de **elementos nuevos** que la idea le pide al espectador, más uno si además tiene que combinarlos con algo anterior (compararlo, deducir una consecuencia, seguir una cadena). Un **elemento nuevo** es un nombre propio (caso, producto, equipo, documento), un término técnico o sigla, una cifra, o un paso de un razonamiento que no se dio antes. Escala:
  - 1: ningún elemento nuevo (repite o aplica algo ya dicho).
  - 2: un elemento nuevo (un término, o un nombre, o una cifra).
  - 3: dos elementos nuevos, o uno nuevo combinado con algo anterior.
  - 4: tres elementos nuevos, o dos nuevos combinados con algo anterior.
  - 5: cuatro o más elementos nuevos.
  Cuenta con esta regla aunque la idea "suene" simple: una frase con un término nuevo y dos cifras es carga 4.
- **Fricción:** cuánto salto hay desde la idea anterior. 1 es continuación natural; 2 es un paso lógico con conector; 3 es un cambio de caso o de hilo, o un término usado sin presentar; 4 es una herramienta, caso o tema nuevo que aparece en medio de un argumento sin presentación, o un tema que pertenece a otra lección; 5 es un tema distinto sin ningún puente.

Las reglas:

1. **Carga alta solo con fricción baja.** Una idea de carga 4 o más llega con todas sus piezas ya presentadas (el caso, el término, la herramienta), o sea con fricción 1 o 2.
2. **Lo nuevo entra liviano.** Un caso o un término nuevo (fricción 3 o más) entra solo con carga baja, de 1 o 2: se presenta aparte, en una frase simple que dice quién es y qué hace (para un caso) o qué significa (para un término), antes de usarlo en un argumento. Presentar y argumentar nunca van en la misma frase.
3. **Nunca dos ideas de carga 4 seguidas.** Después de una idea pesada va una más liviana que la aplica con un ejemplo o la repite con otras palabras.
4. **Presupuesto de casos nuevos.** Como máximo **un caso nuevo cada dos minutos** de narración (unas 330 palabras). "Caso nuevo" es la primera vez, en la lección, que se cuenta algo de un producto o caso del canon (recurrente o invitado). Una lección de seis minutos tiene lugar para tres o cuatro casos, no para siete u ocho. Los casos recurrentes cargan la lección; un caso invitado entra solo si la idea lo exige y no hay un caso ya presentado que la ilustre igual de bien. **Un caso que ya entró se reutiliza** en vez de abrir uno nuevo.

Cómo cumplirlas, de lo más a lo menos usado:
- **Presentar antes de usar:** una frase simple con el descriptor del canon, sola, antes de que el caso o el término trabaje en un argumento.
- **Partir:** una frase con tres nombres o cifras se convierte en dos o tres frases, cada una con una pieza.
- **Cortar:** si hay más ejemplos que los que la idea necesita, queda el mejor y se cortan los demás. **Cortar es mejor que mover** y mejor que meter más. Se puede cortar un ejemplo, una cifra, un caso invitado o un párrafo entero.
- **Reordenar:** dentro de la lección, poner lo simple antes de lo que depende de eso.
- **Respirar:** después de una idea difícil, una frase que la baja a tierra con un caso ya conocido.

## Qué conservar y qué no

- **Conserva** lo que la lección tiene que enseñar según `DISENO-CURSO.md` y `guion/leccionN.md`. No elimines una idea que la lección necesita para su objetivo; si sobra un ejemplo, quédate con el mejor.
- **Los ids de escena** (`{#id}`) se mantienen cuando la escena sigue existiendo: las animaciones están atadas a ellos. Si una escena desaparece, o si hace falta una nueva, dilo en tu respuesta final. Mantén el título de la lección (primera línea).
- **No muevas bloques a otra lección.** Se están reescribiendo las once a la vez. Si un bloque no cabe, córtalo. Las dos excepciones acordadas están al final de este brief. Las referencias a otras lecciones ("en la lección 6…") solo si la idea existe con seguridad ahí; si dudas, no la hagas.
- Cada lección tiene su gancho y su cierre. **El cierre vuelve al gancho** y dice qué cambió en cómo se ve el problema; no termina con una frase que apunta a la lección siguiente (de eso se encarga la tarjeta del video).
- La lección puede quedar **más corta**. Cinco minutos bien armados valen más que siete cargados.

## Reglas de voz (resumen; el detalle está en el SKILL.md)

- Prosa que fluye, como alguien que explica en voz alta, con frases de largo variado (hasta unas 28 palabras), conectores de habla y alguna subordinada. Un caso o una imagen se cuenta con detalle y tiempo.
- **Sin opiniones del narrador** ("me parece", "me gusta", "lo mejor es") y **sin calificativos sin base** ("lo más importante", "elegante", "el mejor"). Donde habría una valoración va el hecho o la razón.
- **Sin preguntas ni pausas dirigidas al espectador.** Una pregunta que el narrador se hace y responde en la misma explicación se admite, con moderación.
- Sin fechas ni años (el único rango permitido, "2020 a 2025", es de la lección 1).
- Tics prohibidos: "no es X, es Y" repetido, frases-eslogan seguidas, tríadas por reflejo, dos puntos en cada oración, repasos numerados dichos en voz alta, "Piensa en…/Imagina…", cierres tipo "y eso lo cambia todo", preguntas retóricas de respuesta de una palabra.
- Lo que es hecho se dice como hecho; lo que es deducción nuestra, como deducción; lo que falta, como hueco. Un estado "Proposed", un "should" o una "opción" no se narran como algo decidido o verificado.
- Español neutro, tuteo, el vocabulario del canon.

## Cómo trabajar

1. Haz la lista de ideas de tu guion nuevo mientras lo escribes. No la entregues; sirve para controlarte.
2. Escribe el guion nuevo en `guion/leccionN.md` (reemplaza el archivo), con el mismo formato: `# Título`, escenas `## Título de la escena {#id}`, prosa, y al final `## Notas de verificación` con la tabla `| Afirmación | Fuente |`. **Corrige la tabla**: cada afirmación factual con su fuente real y su línea; las seis citas que el resumen marcó como erróneas quedan corregidas.
3. Corre `node C:\Users\felix\dev\katarch-katas\.claude\skills\guion-curso\check.mjs guion/leccionN.md` (cuenta palabras, duración, frases largas y tics) y corrige lo que marque.
4. **Audítate contra las reglas**: recorre tu texto idea por idea, ponle carga y fricción a cada una, y marca los casos nuevos con el minuto aproximado (palabras acumuladas ÷ 2,75 = segundos). Busca: carga ≥ 4 con fricción ≥ 3; fricción ≥ 3 con carga ≥ 3; dos cargas ≥ 4 seguidas; dos casos nuevos a menos de dos minutos. Reescribe hasta que no quede ninguno. Sé exigente: después otro revisor, independiente, va a puntuar tu texto con el mismo método.
5. Verifica contra el repositorio cada cifra, cada estado (Proposed/Accepted) y cada cita que cambiaste o escribiste.

## Qué entregar (respuesta final, corta)
- Duración y número de palabras del guion nuevo, antes y después.
- Casos que entran, con el minuto aproximado.
- Qué cortaste y por qué.
- Los errores de hecho que corregiste (una línea cada uno) y cualquier cosa del canon que tu fuente contradiga.
- Escenas agregadas, quitadas o renombradas.
- Dudas que dejan algo sin resolver.

## La única mudanza acordada
- **Lección 2 → lección 11:** la lección 2 deja de tratar "atar la decisión al requisito que la pide" y "una copia que envejece" (las escenas `corte` y `contraste`). La lección 11 se encarga de enseñar esa idea, incluida la regla "citar el requisito por su identificador, además de copiarlo". La lección 2 cierra su cadena en el estilo y en lo que se pierde, y no abre ese tercer eslabón.

Todo lo demás que los análisis proponen mover (ShopWise, Hey Blue!, "reglas que se vigilan solas", Road Warrior, el monolito modular, etc.) no se muda: **se corta o se reduce en su lección** si no cumple el presupuesto de casos, y la lección donde ya vive ese contenido lo conserva.
