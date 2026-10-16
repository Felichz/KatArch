# Receta para refinar un guion que sigue incumpliendo las reglas de carga

Un revisor independiente puntúa cada ronda desde cero, así que **los puntajes se mueven de una ronda a otra**. Corregir solo las ideas que marcó la ronda anterior no alcanza: los problemas reaparecen en ideas parecidas. Por eso, además de arreglar cada idea marcada, **aplica estas reglas a todo el guion**, sin esperar a que otra ronda las marque.

## Dónde aparecen casi todas las violaciones
1. **Aperturas de escena.** Cada `## escena` suele empezar cambiando de tema o de caso. Ese primer salto tiene fricción 3. Para que no cuente contra ti, la **primera frase de cada escena es un puente corto y solo puente** (de 8 a 15 palabras): dice de dónde venimos y a dónde vamos ("Con eso se corta el sistema. Falta ver cómo se llaman las partes."). No lleva cifras ni nombres nuevos. El contenido empieza en la frase siguiente, que ya continúa lo anunciado.
2. **Entrada de un caso.** Una frase sola con el descriptor del canon, sin cifras y sin argumento. La frase siguiente puede ya usar el caso. Además, **antes** de esa frase va un puente que anuncia que viene otro caso ("Para ver cómo se hace en la práctica, otro caso.").
3. **Vueltas a un caso o hilo que quedó lejos.** Una frase que recuerda qué se estaba contando ("Volviendo a las fotos de MobilityCorp, que dejamos hace un rato, ...") antes de seguir.
4. **Términos nuevos.** Se presentan **antes** del primer uso, en su propia frase, con un ejemplo mínimo. Si el término ya apareció, no lo vuelvas a definir, pero no lo uses antes de definirlo en esta lección.
5. **Ideas pesadas** (carga 4: varias cifras, varios nombres, una cadena causal, un término más un ejemplo más una cifra). Parte la frase en frases de **una sola pieza**. Después de una idea pesada va una idea liviana (carga 1 o 2) que la baja a tierra: un ejemplo con un caso ya conocido, o la misma idea con otras palabras. **Nunca dos pesadas seguidas.**
6. **Presupuesto de casos.** Si dos casos nuevos quedan a menos de dos minutos, alarga el tramo del primero (más contenido sobre ese caso, no relleno) o retrasa la entrada del segundo. Un caso que ya entró se reutiliza. Dos productos que son la misma historia (Farmacy Food y Farmacy Family) se presentan **en una sola frase** que dice cómo se relacionan, y el segundo no cuenta aparte; aun así, si el revisor puede leerlos como dos, deja la mención del segundo a más de dos minutos del primero o no lo nombres.

## Cómo comprobar tú mismo
Recorre tu texto frase por frase como si fueras el revisor: pon carga y fricción a cada idea. Busca mecánicamente:
- carga ≥ 4 con fricción ≥ 3;
- fricción ≥ 3 con carga 3;
- dos cargas ≥ 4 seguidas;
- dos casos nuevos a menos de 120 s (palabras acumuladas ÷ 2,75 = segundos).

Si encuentras alguno, arréglalo con las seis técnicas de arriba y vuelve a mirar. Cuando creas que no queda ninguno, corre `node C:\Users\felix\dev\katarch-katas\.claude\skills\guion-curso\check.mjs guion\leccionN.md`.

## Contra los errores de hecho
Cada afirmación que el revisor marque como error de hecho se **verifica en la fuente antes de tocarla**. Si el revisor tiene razón, corrige y deja la tabla de verificación al día. Si se equivocó, no cambies nada y dilo en tu respuesta final.

## No hagas
- No muevas bloques a otra lección ni cambies ids de escena.
- No agregues opiniones del narrador, ni preguntas al espectador, ni fechas.
- No sacrifiques un hecho verificado para bajar un puntaje: si un número es indispensable, se queda, pero solo, en una frase simple.
- No dejes referencias a lo que "dice la lección anterior" si no estás seguro de que ahí exista.

---

# Ronda 4: método de conteo y tope de palabras

Las rondas 2 y 3 mostraron que **arreglar las ideas marcadas no converge**: los puentes y las frases partidas suman ideas, y la carga "se siente" distinto en cada revisión. Desde ahora la carga **se cuenta** (rúbrica de `BRIEF-reescritura.md` y `BRIEF-carga.md`, que el revisor usa igual):

carga = número de **elementos nuevos** de la idea (nombre propio, término o sigla, cifra, paso de un razonamiento no dado antes), más uno si hay que combinarlos con algo anterior.

## Cómo trabajar
1. Recorre tu guion **frase por frase** y cuenta los elementos nuevos de cada una. Meta: **ninguna frase con más de 2 elementos nuevos**. Una frase con 3 o más se parte (cada pieza con 2 o menos) o se le corta lo accesorio.
2. **Una frase que introduce un caso o un término lleva solo ese elemento**: "Sysops Squad es el servicio de soporte técnico de una empresa de electrónica." No lleva cifras, ni argumento, ni otro término.
3. **Una frase pesada va seguida de una de carga 1**: aplica lo dicho a un caso que ya entró, con "o sea…", "es decir…", "en ese caso…". Nunca dos frases de carga 3 o más seguidas si se puede evitar, y nunca dos de carga 4.
4. **Tope de palabras: 1.150 de narración** (1.200 la lección 1). Cuéntalas con `node C:\Users\felix\dev\katarch-katas\cursos\curso-unico\narr-merge.cjs N` (la línea "words") o con `check.mjs`. Si te pasas, **corta contenido secundario**, no puentes: de cada idea se queda el mejor ejemplo y se van los demás; se puede cortar una cifra, un caso invitado, un párrafo. Es preferible una lección que enseñe tres ideas con calma a una que roce siete.
5. **Los puentes no suman ideas**: el de apertura de escena es una frase corta que se fusiona con la anterior o con la siguiente cuando se pueda. No repitas la misma fórmula ("Para verla, otro caso") en varias escenas: varía o recorta.
6. Cuando termines, audítate con la rúbrica y revisa que se cumplan las cuatro reglas (R1 a R4) antes de entregar.

## Descriptor corregido de Sysops Squad (CANON.md)
En el README de Team 7 "Sysops Squad" son los técnicos de soporte; el sistema es su sistema de tickets. Usa: "Sysops Squad es el servicio de soporte técnico de una empresa de electrónica, y su sistema de tickets es un monolito viejo que pierde tickets y se congela o se cae seguido." Que sea por los picos de uso es lo que el equipo cree, no un hecho.

---

# Ronda 5: una frase, una función

La ronda 4 dejó a la vista el problema de fondo: con la rúbrica de conteo, **la mitad de las ideas (200 de 392) puntúa carga 4 o 5**, y mientras sea así es imposible que no haya dos pesadas seguidas. No se arregla retocando frases: hay que escribir con una forma que haga la carga baja por construcción.

## La regla
**Cada frase hace una sola de estas dos cosas:**
1. **PRESENTA**: introduce **un** elemento nuevo (un nombre, un término, una cifra, o un paso del razonamiento) y nada más. Carga 2.
2. **ENLAZA**: relaciona dos cosas **ya dichas** (causa, consecuencia, comparación, ejemplo, "o sea…"), sin ningún elemento nuevo. Carga 2.

**Nunca las dos a la vez.** Una frase que presenta un término y además lo relaciona con otro, o que da una cifra y su consecuencia, se parte en dos: primero la que presenta, después la que enlaza.

Ritmo típico de un tramo: PRESENTA, ENLAZA, PRESENTA, ENLAZA. Una frase que presenta puede ir seguida de otra que presenta solo si no son de carga 4 (o sea, si cada una lleva un solo elemento nuevo). Los conectores de habla ("o sea", "es decir", "eso quiere decir", "por eso", "en ese caso", "dicho de otro modo") sirven para las que enlazan. **Varía los conectores**: no empieces dos frases seguidas igual.

## Presupuesto de elementos nuevos
Antes de escribir, **haz el inventario** de los elementos nuevos de tu lección: nombres propios de casos, términos y siglas, cifras, y pasos de razonamiento que no se dieron antes. **Cuenta solo los que no se presentaron en lecciones anteriores** (los casos y términos ya presentados en el canon o en una lección previa suman cero si los recuerdas en una frase corta). **Tope: 30 elementos nuevos por lección.** Si el inventario pasa de 30, quita elementos (los de menos peso para el objetivo de la lección) en vez de apretarlos. Un elemento solo cuenta una vez: si reaparece, ya no es nuevo.

## Cómo comprobarlo
1. Recorre el guion frase por frase y marca cada una como P (presenta) o E (enlaza). Si no puedes decir cuál es, parte la frase.
2. Verifica que **ninguna P lleve más de un elemento nuevo** y que **ninguna E lleve ninguno**.
3. Cuenta los elementos nuevos de toda la lección. Si pasan de 30, corta.
4. Mantén las reglas anteriores: casos a más de dos minutos, puentes cortos, tope de 1.150 palabras, hechos verificados.
