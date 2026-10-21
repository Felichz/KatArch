# Bloque 14 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`).

**La idea del bloque en una imagen:** el modelo como un hexágono, siempre con algo alrededor: una regla después de él, un marco de reglas y una barra de confianza, un índice de ejemplos antes, un juez al lado.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **El modelo** (hexágono, en violeta claro) | Una pieza que puede equivocarse con seguridad | Todas |
| **La cadena** (modelo → rasgos → regla → puntaje) | El modelo describe, una regla decide | Escenas 1 y 4 |
| **El marco de reglas** alrededor del modelo y **la barra de confianza** con tres bandas | Decidir dentro de límites; qué pasa cuando duda | Escenas 3 y 4 |
| **El índice de ejemplos** (tarjetas con nota) que alimenta al modelo | Darle contexto en vez de entrenarlo | Escena 5 |
| **Los medidores** y **el juez** (un segundo hexágono que mira al primero) | Medirlo | Escena 6 |
| **El tramo del mapa** | Las cuatro familias de la región | Escenas 2 y 7 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que se gana o protege; ámbar lo que se paga o duda; rojo lo que se descarta o falla.

## 0 · Estás aquí

`T.aqui(14)`, "Bloque 14", "IA en el sistema".

## 1 · Sacarle la decisión (#clearview)

| Frase | Lo que se dibuja |
|---|---|
| «El riesgo principal de ClearView con la inteligencia artificial era el sesgo.» | Sello de ClearView. El modelo (hexágono) al centro; "sesgo" en ámbar. |
| «…emparejar personas con puestos es justo donde un prejuicio hace daño.» | A la izquierda, una persona; a la derecha, un puesto; una flecha del modelo entre los dos, torcida. |
| «Además, un modelo no siempre responde igual…» | La misma entrada dos veces da dos salidas distintas ("A", "B"). |
| «El equipo comparó seis formas de usar el modelo.» | Todo se borra. Seis casillas "A" a "F". |
| «La que le dejaba emparejar directamente… descartada por el sesgo.» | La "C" se tacha; "sesgo" debajo. |
| «Eligió que el modelo haga una tarea angosta.» | La "B" se rodea en naranja; las demás se borran. |
| «Lee la historia anónima y el puesto, y extrae rasgos… que después quedan fijos.» | Historia y puesto → modelo → tres etiquetas de rasgos con un candado. |
| «El puntaje lo calcula una regla común…» | Rasgos → regla → puntaje "82". |
| «…al modelo se le quitó justo la decisión que más podía torcer.» | El modelo queda a la izquierda de una línea punteada; "decide" queda del lado de la regla. |
| «…los rasgos, se puede leer, explicar y probar.» | Sobre los rasgos, "leer · explicar · probar" en verde. |

## 2 · Cuatro familias (#familias)

| Frase | Lo que se dibuja |
|---|---|
| «Poner un modelo dentro de un sistema obliga a decidir…» | Barrido. El modelo al centro con cuatro marcas: "qué hace", "cuando duda", "qué sabe", "cómo se mide". |
| «Hay cuatro familias.» | Todo se borra; arriba las regiones con "IA en el sistema" en naranja. |
| «La primera es que el modelo describa y una regla decida…» y siguientes | Tarjeta 1 "describe, la regla decide"; "ClearView" debajo. |
| «La segunda es dejarlo decidir dentro de límites…» y siguientes | Tarjeta 2 "decide con límites". |
| «La tercera es darle contexto…» y siguientes | Tarjeta 3 "darle ejemplos". |
| «La cuarta es medirlo…» y siguientes | Tarjeta 4 "medirlo". |

## 3 · Rodearlo de límites (#mobilitycorp)

| Frase | Lo que se dibuja |
|---|---|
| «MobilityCorp deja decidir a sus modelos, pero adentro de límites escritos.» | Barrido. Sello de MobilityCorp. |
| «El precio de un alquiler depende de la demanda, del clima y de los eventos…» | Tres íconos (gente, nube, calendario) que apuntan a "precio". |
| «Un modelo estima cómo responde la demanda al precio.» | Capa 1: hexágono "estima la demanda". |
| «Otro explica el precio con palabras.» | Capa 2: hexágono "explica el precio". |
| «Y unas reglas escritas en código aplican lo que no se puede romper…» | Capa 3, rectángulo sólido: "reglas: margen, regulación, suscriptores". |
| «Dejarlo todo al modelo quedó descartado…» | A la derecha, "todo al modelo" tachado; "casos límite". |
| «Y cuando el modelo duda, el sistema ya sabe qué hacer.» | Las capas se borran. Un auto y una foto. |
| «…un modelo decide si vuelve sucio…» | La foto → modelo → "sucio: cargo". |
| «Si la confianza del modelo pasa del noventa por ciento, decide solo.» | Una barra de 0 a 100; la banda de arriba de 90: "decide el modelo". |
| «Entre ochenta y noventa, el caso va a una persona…» | Banda 80 a 90 en ámbar: una persona. |
| «Y por debajo de ochenta, el cargo no se cobra…» | Banda debajo de 80 en verde: "no se cobra"; "pierde la empresa, no el cliente". |

## 4 · Sacarlo o rodearlo (#par)

| Frase | Lo que se dibuja |
|---|---|
| «ClearView y MobilityCorp le pusieron límites…» | Barrido. Dos mitades con sus nombres; las figuras apagadas. |
| «ClearView lo sacó de la decisión…» | Izquierda: modelo → rasgos → regla → puntaje; "describe" en verde. |
| «MobilityCorp lo dejó decidir, rodeado de reglas…» | Derecha: el modelo dentro de un marco de reglas y la barra de bandas; "decide con límites" en verde. |
| «Los dos contestaron antes qué no podía decidir…» | Debajo: "¿qué no puede decidir?" y "¿qué pasa cuando duda?" en naranja. |

## 5 · Darle ejemplos en vez de entrenarlo (#contexto)

| Frase | Lo que se dibuja |
|---|---|
| «Certifiable es una empresa que certifica arquitectos de software…» | Barrido. Sello de Certifiable (diploma). Una hoja de examen con una respuesta corta. |
| «El modelo tenía que acertar también con preguntas nuevas…» | Una pregunta con "nueva" en naranja. |
| «Comparó tres caminos.» | Tres columnas. |
| «Pedirle la nota sin ejemplos era rápido, pero frágil…» | Columna 1 "sin ejemplos": "rápido" verde, "frágil" ámbar; se apaga. |
| «Entrenar un modelo… caía con las nuevas.» | Columna 2 "entrenar": "conocidas" verde, "nuevas" rojo; se apaga. |
| «Eligió el tercero.» | Columna 3 "buscar ejemplos" se rodea en naranja. |
| «…busca respuestas parecidas que ya corrigió un experto…» | Las columnas se borran. Un índice de tarjetas con su nota; tres parecidas viajan al modelo junto con la respuesta nueva; sale una nota. |
| «El precio está anotado.» | "precio" en ámbar. |
| «Hace falta un índice…» | "un índice que mantener", "un paso más", "más ejemplos, más costo" en ámbar. |

## 6 · Medirlo (#medir)

| Frase | Lo que se dibuja |
|---|---|
| «Antes de confiar en un modelo, hay que medirlo.» | Barrido. Sello de ShopWise. Tres modelos en fila. |
| «…dos medidas automáticas.» | Dos medidores debajo de cada modelo. |
| «…fidelidad.» / «…la relevancia.» | Los nombres de los medidores. |
| «Uno de los modelos sacó relevancia alta y fidelidad cero.» | En el tercero, relevancia 0,8 (verde) y fidelidad 0,0 (rojo). |
| «Respondía pidiendo el número de pedido…» | Un chat: "¿dónde está mi pedido 48213?" → "¿me das tu número de pedido?". |
| «…una medida sola no alcanza…» | "una sola engaña" en naranja. |
| «Certifiable mide de otra forma, en cada respuesta.» | Lo de ShopWise se borra. Sello de Certifiable. |
| «Separó dos piezas…» | Respuesta → corrector (hexágono) → nota → juez (hexágono) → confianza. |
| «Si la confianza supera un umbral, la nota queda firme.» | Una línea de umbral; arriba, "firme" en verde. |
| «Si no, la revisa un experto.» | Abajo, una persona "experto". |
| «Y tenerlos separados permite mejorar o probar uno…» | El juez queda con un candado ("fijo") mientras el corrector se ilumina ("se prueba"). |

## 7 · La pregunta que decide (#pregunta)

| Frase | Lo que se dibuja |
|---|---|
| «En esta región la pregunta es qué no puede decidir el modelo…» | Barrido. El tramo del mapa con las cuatro tarjetas; debajo, la pregunta en naranja; "la IA fuera de la decisión" bajo la primera. |
| «…se equivoca con la misma seguridad con la que acierta.» | "se equivoca con la misma seguridad" en ámbar. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Sesgo; seis opciones A-F; C descartada por sesgo; B elegida; rasgos legibles fijados; puntaje sin IA | `Pragmatic/ADR/ADR-011-deterministic-matching.md` (Accepted) |
| Tres capas del precio; reglas de margen, regulación y suscriptores; todo al modelo descartado por los casos límite | `Five-Nines/adrs/ADR-0018…` |
| Bandas 90 / 80 a 90 / menos de 80 | `Five-Nines/requirements/2_FRs.md` l. 20 |
| Tres caminos para corregir; recuperar ejemplos ya calificados; índice; costo | `ZAITects/ADRs/003-…` (Accepted) |
| Tres modelos; relevancia 0,8 y fidelidad 0,0; pedir el número de pedido | `ConnectedAI/6_test_cases/evaluation.md` l. 45-62 |
| Corrector y juez; umbral; revisión manual; uno fijo mientras se prueba el otro | `ZAITects/usecases/hmw-ai-grading-short-answers.md` |
| "82", "48213", los íconos de demanda, clima y eventos | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El modelo tiene que reconocerse en todas las escenas | Siempre hexágono violeta claro |
| 1 | Dirección visual | La escena 6 tiene dos casos | ShopWise se borra antes de Certifiable |
| 1 | Verificador | "82" no está en la fuente | Ilustración |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 1 | El puntaje aparece después de la regla, aunque la voz los nombra al revés | El orden de la cadena tiene que leerse de izquierda a derecha |
| 3 | Lo que mueve el precio aparece desde la primera frase; el auto, apenas se borra el precio | La escena empezaba vacía cinco segundos, y otra vez a la mitad |
| 3 | "una persona" sube sobre "decide el modelo" | Se encimaban (`check`) |
| 6 | La respuesta y el corrector aparecen con el sello de Certifiable | La primera frase de Certifiable no tenía imagen |
| 7 | Tarjetas más bajas; la pregunta y la nota bajan | "la IA fuera de la decisión" tocaba la pregunta |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.
