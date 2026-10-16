# Five Nines · Fase de estilo y revisión pedagógica

*Documento para decidir. Nada de lo que sigue está aplicado al curso salvo los pilotos (`guion/cap1.md`, `cap2.md` y `cap3.md`), que son borradores para leer en voz alta.*

> **Actualización:** Felix **no quiere opiniones del narrador** («a mí me parece…», «me gusta del equipo…»). Donde este documento habla de una voz «con criterio» que opina, léase: una voz clara que explica, marca qué es dato, inferencia o imagen, y **no valora**. Los tres pilotos todavía conservan esas opiniones (unas 4 o 5 por capítulo) y hay que sacarlas. La regla quedó en el `CLAUDE.md` personal.

> **Decisiones aplicadas (12 de octubre de 2026, «haz todo lo pendiente»):** estilo híbrido «razonar con ellos» sin opiniones, con la estructura del skill `lecture-style` de OpenMAIC adaptada en el skill propio `guion-curso`; guiones nuevos en `guion/lecture/cap1.md` a `cap8.md`; unos 7 a 10 minutos por capítulo con la voz de Pablo (el cap. 1 es el más largo); «la nube» pasó del capítulo 3 al 7; el capítulo 8 cierra con «lo que el repositorio no tiene»; `PEDAGOGY.md` actualizada (principios 4–7 y 9 nuevo). Datos verificados contra un clon del repositorio del equipo. ArchColider sigue sin tocar.

## En seis líneas

1. **Nunca elegimos el estilo.** El guion actual salió de la inercia del primer capítulo y de `PEDAGOGY.md`, que ya pide frases cortas, una síntesis por escena, repasos y un «piénsalo tú». Esa guía es la fuente del tono robótico.
2. **Lo medí.** Contra tu referencia (*Proceso y realidad*, cap. 1): frases más cortas y parejas, el doble de dos puntos, 26 aperturas de fórmula contra 1, 16 enumeraciones dichas en voz alta contra 1, y ninguna voz propia.
3. **Un revisor independiente** (un agente que leyó el curso como el espectador tipo, sin ver mi análisis) llegó a lo mismo y encontró algo más grave que el tono: el curso cuenta lo que decidió el equipo, pero **no enseña a decidir**.
4. **Comparé cuatro maneras de contarlo** con el mismo pasaje y las puntué contra siete criterios.
5. **Recomiendo una: «razonar con ellos»**: un narrador con criterio que piensa cada decisión en voz alta junto al equipo, con el repositorio como evidencia, y que se detiene a decidir solo dos veces por capítulo.
6. **Cuesta tiempo:** el piloto dura unos 10 minutos y medio contra los 4:45 del capítulo actual. Hay que decidir cuánto, antes de gastar créditos de voz.

---

## 1. Qué debería enseñar este curso

Al terminar, el espectador (un desarrollador con un par de años de oficio, que nunca diseñó un sistema entero) debería poder, frente a un sistema suyo:

- decidir **dónde va la IA y dónde no**, con una pregunta concreta por herramienta;
- escribir **el precio** de cada decisión y dejar salidas;
- saber **cuánto confiar** en un número (dado, calculado o supuesto) y cómo se verifica que una IA funciona.

Eso es lo transferible. Lo que el equipo hizo cada día es el material, no el objetivo.

## 2. Auto-review: qué está mal y con qué evidencia

### 2.1 Medición (misma regla sobre cuatro textos)

| Medida | Five Nines (actual) | ArchColider (11 cap.) | Referencia: *Proceso y realidad* cap. 1 | Piloto: Five Nines cap. 3 |
| - | - | - | - | - |
| Palabras por frase (media) | 11,6 | 11,0 | 15,6 | 17,3 |
| Variación del largo (desv. estándar) | 6,5 | 5,1 | 8,6 | 8,5 |
| % de frases de 6 palabras o menos | 23 % | 23 % | 11 % | 9 % |
| % de frases de 25 palabras o más | 3 % | 1 % | 16 % | 21 % |
| Dos puntos por 100 palabras | 2,9 | 3,9 | 1,2 | 1,3 |
| Voz en primera persona (por 100 palabras) | 0 | 0 | 0,2 | 0,2 |
| Aperturas de fórmula («¿Recuerdas…?», «Ahora tú», «Repasemos») | 26 | 16 | 1 | 0 |
| Enumeraciones dichas en voz alta («Uno:… Dos:…», «Primera:…») | 16 | 36 | 1 | 0 |
| Pregunta retórica con respuesta de ≤ 5 palabras | 9 | 28 | 0 | 0 |

Lectura honesta: el ensayo de referencia es un género distinto (una persona que piensa ideas), así que no es el blanco exacto: señala la dirección. Y el piloto confirma que el estilo cambió, no que sea bueno: eso lo decides leyéndolo en voz alta.

### 2.2 El esqueleto es una plantilla

- **6 de 8 capítulos abren con «¿Recuerdas…?»** (del 2 al 7) y **7 de 8 cierran con «Repasemos…» más un anzuelo** («Capítulo N+1: …»).
- **8 de 8 tienen un «Ahora tú»** en la misma posición (escena 6 o 7) y con la misma pausa de 3 segundos.
- Cada escena mide entre 34 y 142 palabras (mediana 87): todo avanza al mismo paso.

### 2.2b Lo que dijo el revisor independiente

*(Resumen; el informe completo lo escribió un agente que solo leyó los guiones y la guía.)*

- **Se pierde** en el capítulo 3 (`volumen` a `verdad`): seis términos nuevos en unos 90 segundos, y «servicio» nunca se define. También en los capítulos 5 (`mlops`), 6 (`podio`) y 8 (`compuertas`).
- **Se aburre** con los repasos («listas de tres ítems que acabo de oír»), con los «recuerdas» que «solo me lo recuerdan, no construyen», y con fechas y números de ADR que no sirven para decidir nada.
- **No cree** en el «Ahora tú»: «tres segundos no alcanzan para pensar nada, es decoración». Y las dos advertencias de «estos números son supuestos» (cap. 5 y 8) restan confianza a lo anterior.
- **Suena a IA** en frases como «Dos flotas, dos formas de usar el servicio, y problemas distintos para cada una» (tríada que cierra en eslogan), «una decisión sin su precio escrito está tomada a medias» (aforismo) y las listas de fragmentos paralelos.
- **Funciona**: el caso del GPS (cap. 2), los falsos positivos y las tres bandas (cap. 5), las dos copias de la batería (cap. 3), y el «dado, calculado o supuesto».
- **No podría hacer** al final: diseñar un sistema. «El curso narra decisiones ya tomadas, casi nunca me enseña a tomarlas.» No hay método para partir un sistema en servicios ni para estimar volumen y costo.
- **Hilo conductor:** parcial. «El vehículo correcto, cargado, en el lugar correcto» aparece en el 1 y el 6, pero del 2 al 5 no parece avanzar hacia eso.

### 2.3 Hallazgos y qué hacer

| # | Hallazgo | Gravedad | Arreglo |
| - | - | - | - |
| P1 | El curso narra, no enseña a decidir | Alta | Cada capítulo deja **un criterio reutilizable** y plantea **un dilema real** antes de revelar qué hizo el equipo |
| P2 | Voz robótica (medición) | Alta | Estilo nuevo (sección 4 y 5) |
| P3 | Picos de densidad (cap. 3, 5, 6, 8) | Alta | Un concepto nuevo por párrafo y con su caso antes del nombre; las piezas secundarias se mueven o se cortan |
| P4 | Plantilla repetida (apertura, repaso, anzuelo, «Ahora tú») | Media | Abrir con una situación, cerrar volviendo a ella; «piénsalo» solo donde nace de la historia, con pausa real |
| P5 | No hay hilo conductor | Media | Las **cuatro preguntas del jurado** (cap. 1) como columna vertebral (sección 6) |
| P6 | Fechas, commits y números de ADR sin función | Media | Solo si cambian cómo entiendes la decisión; el resto va a las notas |
| P7 | La honestidad sobre números se repite y erosiona la confianza | Media | Se enseña una vez (cap. 2, con la herramienta «dado, calculado, supuesto») y después se aplica en una frase |
| P8 | No enseña a estimar volumen ni costo | Media | Cap. 8 cierra con «lo que el repositorio no tiene» (`HISTORIA.md` §6): un ejercicio honesto, porque es lo que el espectador tendrá que hacer solo |

### 2.4 Mi propia autocrítica del proceso

- La poda que hicimos antes (345 palabras menos) trató el contenido, no la voz: **un guion robótico más corto sigue siendo robótico.**
- `PEDAGOGY.md` codifica el problema («una idea por frase», «una síntesis por escena», repaso, «piénsalo»). Hay que revisarla, no solo seguirla.
- Se iba a gastar la voz de ElevenLabs sobre este guion. Esta fase tenía que ir antes.

---

## 3. Cuatro maneras de contarlo (el mismo pasaje)

El pasaje: el equipo pasa de dos servicios que guardan el estado de los vehículos a uno solo, y lo justifica. Los hechos son los mismos en las cuatro.

**A · Instructor (el actual).** Voz impersonal, definiciones directas, síntesis y «piénsalo».
> «Ahora, ¿quién guarda el estado de cada vehículo? El primer boceto del equipo, del 16 de octubre, tenía dos servicios para eso. Un servicio de flota, que recibía los mensajes de los vehículos. Y un servicio de ubicación, que guardaba dónde estaba cada uno. Tres días después, en el diagrama nuevo, el servicio de ubicación ya no estaba. Su trabajo pasó entero al servicio de flota. El 20 de octubre, el equipo escribió el porqué en su ADR número 7: el servicio de flota es la fuente única de verdad del estado de cada vehículo. Fuente única de verdad quiere decir que hay un solo lugar donde ese dato es oficial.»

**B · Narrador con criterio.** Una persona que estudió el repositorio y te cuenta lo que significa. Prosa que fluye, opinión con su porqué, imagen antes del término. (Es el estilo de tu *Proceso y realidad*.)
> «Y acá llega la pregunta que, a mi juicio, es la central del capítulo, la que parece menor y no lo es: quién guarda el estado de cada vehículo. El primer boceto del equipo respondía con dos servicios, uno de flota y otro de ubicación. Tres días después, el de ubicación ya no está. El repositorio no dice por qué pasó ese domingo, y no voy a inventarlo. Lo que sí dice, al día siguiente, es por qué quedó así: el servicio de flota es la “fuente única de verdad”. Que es una manera elegante de decir que hay un solo lugar donde ese dato es oficial. A mí me parece la decisión correcta, y la razón se ve mejor con el caso contrario.»

**C · Detective del repositorio.** Estructura de investigación: un hecho raro en la evidencia, pistas, hipótesis marcadas como nuestras, y lo que no se puede saber.
> «Hay una desaparición en este repositorio. El jueves dieciséis, el primer boceto tiene dos servicios para guardar el estado de los vehículos: flota y ubicación. El domingo diecinueve, hay uno solo. Busco el commit que lo explique y no lo hay: ni una nota, ni un mensaje. Lo único que tenemos es lo que pasó después. El lunes, a la una y diez, aparece la decisión siete, y su título casi confiesa: el servicio de flota es la “fuente única de verdad”. Si juntas las dos pistas, la hipótesis es razonable, aunque es nuestra y no suya: dos servicios guardaban el mismo dato, y con dos copias, tarde o temprano, discrepan.»

**D · Taller de decisiones.** Te pone en el lugar del equipo: primero el dilema, tú piensas, después ves qué hicieron y comparas.
> «Ponte en el lugar del equipo. Cada scooter manda su posición y su batería cada treinta segundos, y tienes que decidir quién guarda ese estado. La salida cómoda es que cada servicio lea los mensajes y se arme su propia versión. Antes de seguir, piénsalo: ¿qué es lo primero que se te rompe con esa salida? [pausa] A mí se me ocurren dos cosas. Mantenimiento manda a un operario a cambiar una batería que, para viajes, está bien. Y la aplicación te ofrece un scooter que ya no puede salir. Eso es lo que el equipo resolvió en su decisión siete: un solo servicio, el de flota, es la fuente única de verdad.»

## 4. Cómo los evalué

Criterios elegidos por lo que este curso necesita (no genéricos). Puntaje de 1 a 5, **mi juicio**, con peso doble en los tres que más importan.

| Criterio | Peso | A Instructor | B Narrador | C Detective | D Taller | **E Híbrido** |
| - | - | - | - | - | - | - |
| Enseña a decidir (lo transferible) | ×2 | 2 | 3 | 2 | 5 | **4** |
| Suena a persona (hablado, no leído) | ×2 | 1 | 5 | 4 | 3 | **5** |
| Honestidad con la fuente (dato / inferencia / opinión) | ×2 | 3 | 4 | 5 | 3 | **5** |
| Claridad para el espectador tipo | ×1 | 4 | 4 | 3 | 4 | **4** |
| Encaja con el formato (animaciones ancladas, subtítulos, voz de TTS) | ×1 | 5 | 3 | 3 | 3 | **3** |
| Variedad entre capítulos (evita la plantilla) | ×1 | 1 | 4 | 3 | 3 | **4** |
| Costo de producir y mantener (5 = barato) | ×1 | 5 | 2 | 3 | 2 | **2** |
| **Total (máximo 50)** | | 27 | 37 | 34 | 34 | **41** |

Por qué cada uno quedó donde quedó:

- **A** es barato y encaja con el formato, pero es la causa del problema. Ya lo tenemos y no lo recomiendo.
- **B** es el que más suena a persona, pero por sí solo narra bien sin garantizar que el espectador aprenda a decidir.
- **C** es el más honesto y el que mejor aprovecha lo que este curso tiene de único (la historia en git, los huecos como método). Pero un capítulo entero de «pistas» cansa, y arriesga convertir el curso en trivia de commits.
- **D** es el único que ataca de frente el hallazgo P1, pero se vuelve condescendiente si se usa en cada escena, y exige pausas largas.
- **E**, el híbrido, toma lo mejor de cada uno (sección 5).

## 5. Decisión recomendada: «razonar con ellos»

**La voz de B, la estructura de decisión de D en dos momentos por capítulo, y el método de honestidad de C.** Un narrador que opina con su porqué, que piensa cada decisión en voz alta junto al equipo, y que en cada frase deja claro si algo es un dato del repositorio, una inferencia nuestra o su opinión.

### Reglas de estilo

1. **Voz clara, sin opiniones propias.** El narrador explica, duda en voz alta cuando algo es incierto y se corrige. No opina ni valora; donde habría una valoración, va el hecho o la razón. Sin inventar recuerdos personales.
2. **Abrir con una situación, no con un callback.** Cada capítulo empieza en una escena concreta (el scooter a las ocho de la mañana) y **cierra volviendo a ella**, diciendo qué cambió en cómo se ve el problema. Nada de «¿Recuerdas…?» de apertura ni de «Repasemos».
3. **Un párrafo, una idea** (30 a 60 segundos). Cambia el principio 4 de `PEDAGOGY.md` («una idea por frase»): las frases pueden ser largas si el párrafo avanza de a una idea.
4. **Caso antes del nombre, y definir en caliente.** El término aparece con su explicación dicha como se diría en una charla («o sea, un solo lugar donde ese dato es oficial»), no como un bloque de definición.
5. **Tres capas, siempre distinguibles:** *lo que dice el repositorio*, *lo que inferimos* («es nuestra, no suya»), *lo que opino*. Los huecos se cuentan como huecos, **una vez** (P7).
6. **Dilema solo donde nace de la historia.** Como máximo dos por capítulo, con pausa real (5 a 8 segundos, anillo visible). El resto del tiempo es el narrador quien piensa en voz alta. Se acabó el «Ahora tú» fijo de 3 segundos.
7. **Cada decisión deja un criterio.** Una frase que el espectador pueda llevarse y usar, dicha como parte de la historia, no como lista.
8. **Fechas, commits y ADRs solo si cambian cómo se entiende la decisión.** Una fecha ancla por capítulo; el resto, a las notas de verificación.
9. **Cierre sin lista.** El cierre vuelve a la historia del comienzo, dice qué cambió, y la tarjeta del capítulo siguiente ya hace el puente.
10. **Tics prohibidos** (los de tu `CLAUDE.md`): «no es X, es Y» repetido, frases-eslogan seguidas, tríadas por reflejo, dos puntos en cada frase, «y eso lo cambia todo», preguntas retóricas con respuesta de una palabra.
11. **Pensado para la voz.** Frases de hasta unas 28 palabras, números en letras, siglas deletreadas donde se dicen así. Los subtítulos parten las frases largas en dos cuadros.

### Qué pasa con cada principio de `PEDAGOGY.md`

| Principio | Qué hacemos |
| - | - |
| 1. Primero el caso, después el nombre | **Se queda** |
| 2. Cada término se define la primera vez | **Se queda**, pero se dice «en caliente» (regla 4) |
| 3. El porqué de cada decisión | **Se queda y sube de categoría:** es el centro del curso (regla 5) |
| 4. Una idea por vez, con espacio | **Se adapta:** una idea por párrafo, no por frase (regla 3) |
| 5. Ejemplo → regla → aplicación | **Se queda;** la aplicación pasa a ser un dilema real, no un «piénsalo» fijo (regla 6) |
| 6. Andamiaje | **Se adapta:** el callback solo cuando aporta información |
| 7. Respirar y consolidar | **Se adapta:** el aire lo da el ritmo del párrafo y el silencio; la síntesis por escena y el repaso numerado se **van** |
| 8. El visual va con lo que se dice | **Se queda** (es del formato) |
| 9. Menos contenido, mejor contado | **Se queda,** y se extiende a fechas y ADRs |

Tras tu aprobación, actualizo `PEDAGOGY.md` con esto: ahora mismo no la toqué.

## 6. Hilo conductor: las cuatro preguntas del jurado

El capítulo 1 ya las dice, pero no se vuelven a usar. Propongo que sean la columna vertebral, y que cada capítulo avise qué pregunta está respondiendo:

| Pregunta del jurado | Capítulos |
| - | - |
| ¿Es un uso de la IA que resuelve un problema real del negocio? | 4 (dónde sí y dónde no), 6 (el problema número uno) |
| ¿Encaja en el negocio y se entiende el porqué de cada decisión? | 2 (metas y supuestos), 3 (datos y fuente única) |
| ¿Cómo te defiendes de la incertidumbre? | 3 (el precio del riesgo concentrado), 7 (proveedor) |
| ¿Cómo sabes que la IA funciona? | 5 (errores, bandas, MLOps), 8 (compuertas) |

El **arco del equipo** acompaña: empiezan creyendo que la IA es una meta (cap. 2), diseñan el problema número uno al final (cap. 6), y llegan a la final con cifras sin cálculo (cap. 8). El curso no los juzga: muestra cómo razonaron y dónde les faltó, y cierra con lo que el espectador tendría que hacer solo (P8).

## 7. Lo que cuesta

| | Hoy | Con el estilo recomendado |
| - | - | - |
| Duración del cap. 3 | 4:45 (782 palabras) | **unos 10:30** en el piloto (1.376 palabras, con una pausa), si se mantiene todo el contenido |
| Duración total | 34:31 | ~75 min si todos los capítulos crecen como el 3; **~60 min** si cada uno apunta a 7–8 min |
| Créditos de voz (ElevenLabs) | ~34.000 caracteres | ~50.000 con 60 min (~62.000 con 75) |
| Trabajo | — | Reescribir 8 guiones (el grueso), re-anclar las animaciones de las 64 escenas (todas cambian de texto, el material visual se reutiliza en gran parte) y volver a renderizar |

El piloto mantuvo todo el contenido del capítulo 3 para que lo compares sin trampa. Para llegar a 7–8 minutos mi propuesta es mover «La nube, desde el primer día» al capítulo 7, donde pesa más (quedar atado a un proveedor), y acortar la cuenta del volumen.

## 8. Los pilotos

Tres capítulos completos en el estilo recomendado, cada uno con su tabla de verificación (qué dice el repositorio, qué es nuestro y qué debe verificarse contra el original, porque el clon del repositorio del equipo no está en esta máquina):

| Capítulo | Archivo | Palabras | Duración aprox. | Pregunta del jurado |
| - | - | - | - | - |
| 1 · El encargo | `guion/cap1.md` | 1.354 | 10:20 | Planta las cuatro |
| 2 · Antes de la IA, el negocio | `guion/cap2.md` | 1.147 | 8:50 | 2.ª (encaja en el negocio) |
| 3 · Una sola fuente de verdad | `guion/cap3.md` | ~1.400 | 10:30 | 2.ª, y roza la 3.ª |

Total de los tres: unos 29 minutos, contra los 14:20 actuales.

**Cómo juzgarlos:** léelos **en voz alta**, como lo diría un narrador, y de corrido, del 1 al 3, porque lo que quiero saber es si el hilo se sostiene. Fíjate en tres cosas: si se entiende sin ver nada, si en algún punto suena a «locutor» (eso sería exceso de estilo), y si al terminar el 3 sabrías explicarle a alguien por qué el equipo eligió una sola fuente de verdad.

Cada capítulo tiene **un solo momento de pausa** (marcado `[PAUSA]`): el dilema que nace de la historia. En el 1, qué le preguntarías a quien propone un chatbot; en el 2, qué se rompe con un GPS que informa cada 30 minutos; en el 3, qué pasa con dos copias de la batería.

Una decisión de estos pilotos que conviene que revises: en el capítulo 1 el narrador cuenta que **los cinco criterios del jurado se juntaron en cuatro preguntas** (dos van de la mano) y lo dice en voz alta, para que el hilo sea honesto.

## 9. Plan, con puntos de decisión

| Fase | Qué | Quién decide |
| - | - | - |
| **0 · Ahora** | Confirmar estilo, duración por capítulo y si el capítulo de la nube se mueve | Tú |
| 1 | Escribir cada guion como prosa en `guion/capN.md` con su tabla de verificación | Tú apruebas leyendo en voz alta (de a uno o de a dos capítulos) |
| 2 | Cortar en escenas y líneas, generar `narration.json`, voz local de borrador, re-anclar las composiciones, verificar | Yo, con revisión de capturas |
| 3 | Voz real de ElevenLabs, **solo después de aprobar el borrador** | Tú |
| 4 | Render, subida y publicación | Tú |

## 10. Lo que necesito de ti

1. **¿Estilo?** «Razonar con ellos» (E), u otro de los cuatro.
2. **¿Duración?** 7–8 minutos por capítulo (~60 min en total) o completo como el piloto (~75 min).
3. **¿Muevo «la nube» al capítulo 7?**
4. **¿El capítulo 8 cierra con «lo que el repositorio no tiene» (volumen, costos, base de las cifras)?**
5. **¿Actualizo `PEDAGOGY.md`** con lo de la sección 5, tras tu aprobación?
6. **ArchColider** tiene el mismo problema, más acentuado (36 enumeraciones dichas en voz alta, 28 preguntas retóricas con respuesta corta). No lo toqué: decides después de ver cómo queda Five Nines.
