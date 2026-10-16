# Carga cognitiva y fricción: lección 10, "Cuando una parte del sistema es un modelo"

39 ideas, duración 7:23 (443 s, voz real de `video/ch10/timing.js`).

Escala: **Carga** 1 a 5 (cuánto sostiene el espectador a la vez). **Fricción** 1 a 5 (salto respecto de la idea anterior). Puntajes de 4 o más en negrita. La primera idea no tiene anterior.

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:01 | | | | |
| 1 | 0:01 | Un cliente de MobilityCorp devuelve el auto y sube cuatro fotos desde la app | 2 | — (inicio) | Presenta el caso y una cifra; sin nombres nuevos más allá de MobilityCorp. |
| 2 | 0:07 | Un modelo de visión decide si el auto vuelve sucio; el cargo es de 50, 100 o 150 euros | 3 | 1 | Tres montos en una sola idea; "modelo de visión" sin definir. Continuación del caso. |
| 3 | 0:15 | Requisito de Five Nines: más de 90 % decide el modelo solo; 80 a 90 % revisa una persona; menos de 80 % no se cobra | **4** | 2 | Tres cifras de un mismo requisito (una idea), un nombre de equipo nuevo y "confianza" del modelo sin definir. Paso lógico desde el cargo. |
| **pregunta** | 0:32 | | | | |
| 4 | 0:32 | Qué cambia con una pieza que es un modelo: las mismas decisiones, aplicadas a una pieza no determinista; la lección responde cuatro preguntas | 3 | 3 | "Determinista" se usa sin presentar. El hilo pasa del caso a la teoría con una pregunta. La lista de cuatro preguntas es el mapa de la lección. |
| **fallo** | 0:50 | | | | |
| 5 | 0:50 | Un servicio común falla de maneras visibles: se cae, tarda, devuelve error | 1 | 2 | Idea concreta y conocida. Cambia el tema a la falla. |
| 6 | 0:56 | Un modelo responde rápido y mal, con la misma seguridad que una respuesta correcta; es el fallo más común y nadie lo marca como error | 2 | 2 | Contraste con la idea 5 con conector. Sin nombres nuevos. |
| 7 | 1:06 | Con el mismo código, el comportamiento cambia por una versión del modelo o una palabra del prompt; las preguntas de lecciones anteriores siguen valiendo | 3 | 2 | "Prompt" sin definir. "Versión del modelo" vuelve en 34 y 37. |
| **limites** | 1:26 | | | | |
| 8 | 1:26 | El precio de un alquiler en MobilityCorp depende de la demanda, el clima y los eventos | 2 | 3 | Cambio de tema: de los fallos al precio. El caso es conocido, el tema no. |
| 9 | 1:35 | Reparto en tres capas: un modelo de aprendizaje automático estima cómo responde la demanda al precio; un modelo generativo lo explica; reglas en código fijan margen mínimo, regulación y descuentos | **4** | 2 | Tres piezas con tipos nuevos (aprendizaje automático, generativo, reglas) y tres restricciones en una frase. "Aprendizaje automático" sin definir. |
| 10 | 1:52 | La alternativa de dejarlo todo al aprendizaje automático queda descartada: podría fallar en casos límite, como una ley local o una tarifa mínima | 3 | 2 | "Casos límite" y "reglas deterministas" sin ejemplo previo. Conector "la alternativa". |
| 11 | 2:05 | En el asistente conversacional pasa lo mismo: reservas y pagos con plantillas y funciones fijas, porque un generativo no controla una operación que mueve dinero | 3 | 2 | "Su asistente" no se presenta en esta lección; el argumento viene de la decisión ADR-0012. |
| **quitar** | 2:18 | | | | |
| 12 | 2:18 | ClearView resolvió el mismo problema de otra manera: su riesgo principal es el sesgo, así que el modelo hace una sola tarea angosta | 3 | 3 | Vuelve a ClearView (presentado en la lección 1), con "de otra manera" como único puente. |
| 13 | 2:27 | El modelo lee el currículum anonimizado y el puesto, y extrae rasgos legibles; el puntaje lo calcula código común con esos rasgos fijos | **4** | 2 | "Currículum anonimizado", "rasgos legibles" y "puntaje" como conceptos nuevos en una idea. Es la pieza central del caso ClearView. |
| 14 | 2:41 | Quedó descartada la opción de que la inteligencia artificial empareje directamente currículums y puestos, por el sesgo | 2 | 1 | Continuación natural de 13. |
| 15 | 2:50 | El servicio que empareja no tiene permiso para leer el currículum original, como vimos en la lección cinco | 3 | 2 | Referencia cruzada sin repetir el mecanismo; "permiso" se entiende por la lección 5. |
| 16 | 2:55 | Certifiable llegó a una conclusión parecida con los agentes autónomos: no los usa en sus tres casos, porque un agente es probabilístico | **4** | **4** | Caso que vuelve sin presentación en medio del argumento de ClearView. "Agentes autónomos" y "probabilístico" sin definir. Pico de fricción de la lección. |
| **duda** | 3:09 | | | | |
| 17 | 3:09 | Los autos sucios de MobilityCorp muestran qué pasa cuando el modelo sí decide | 2 | 3 | Vuelve al caso del gancho después de 16, sin puente explícito. |
| 18 | 3:19 | Las franjas: la alta aplica la política sin intervención; la media va a una cola con plazo de dos horas para limpieza y una hora para daños | **4** | 2 | Franjas, plazos y dos cifras. "Plazo" simplifica un P95 de la fuente (ver hallazgo 6). |
| 19 | 3:30 | La persona ve la predicción, las zonas que la explican y las fotos, y confirma o corrige con un código de razón | 3 | 1 | "Zonas que la explican" sin definir. Continuación del flujo de revisión. |
| 20 | 3:37 | En la franja baja, el resultado por defecto favorece al cliente, sin cargo; cada corrección sirve para reentrenar y todo queda auditado | 3 | 1 | Tres efectos en una idea. Introduce "resultado por defecto", que vuelve en 39. |
| 21 | 3:49 | Tres alternativas descartadas: la decisión automática (cargos injustos), la revisión solo manual (lenta y cara) y cobrar primero (daña la confianza) | 3 | 2 | Enumeración de tres alternativas, una idea. Cada una vuelve a conectar con el diseño. |
| 22 | 4:03 | Los umbrales exactos cambian entre documentos del mismo repositorio; conviene quedarse con el mecanismo | 2 | 2 | El aviso llega cuatro minutos después de dar 90 y 80 como requisito (hallazgo 1). |
| **juez** | 4:11 | | | | |
| 23 | 4:11 | Certifiable usa un modelo para corregir las respuestas cortas de su examen de arquitectura | 3 | 3 | Vuelve a Certifiable después de la sección de duda; 16 quedó separada de este caso. |
| 24 | 4:18 | Un calificador pone la nota; un juez, que es otro modelo, estima la confianza; si supera el umbral la nota queda firme, y si no, pasa a revisión manual | **4** | 2 | Cuatro piezas (calificador, juez, umbral, revisión) en una idea. El umbral es el de la idea 22. |
| 25 | 4:36 | Se separan para poder mejorar o probar una pieza mientras la otra queda fija | 2 | 1 | Razón escrita. Continuación de 24. |
| 26 | 4:42 | El valor del umbral no está escrito, y de ese valor depende cuántos exámenes llegan a un experto | 2 | 2 | Paso con "lo que no está escrito". Introduce el costo, que sigue en 27. |
| **costo** | 4:49 | | | | |
| 27 | 4:49 | En la cuenta de Certifiable (lección 3), el modelo de lenguaje es el 1,4 % del costo y el resto son horas de experto; la cifra que lo mueve es el 1 de 5 de exámenes que revisa una persona | **4** | 2 | Tres cifras y un supuesto en una idea. Vuelve a un caso de la lección 3 con una referencia explícita. |
| 28 | 5:09 | Con un modelo, el umbral es la perilla de costo y de riesgo: bajarlo ahorra horas de experto y deja pasar errores; subirlo protege al candidato y llena la cola; quien lo fija decide las dos cosas | 3 | 2 | Tesis que cambia de cifras a abstracción. Carga media por las dos direcciones. |
| **medir** | 5:28 | | | | |
| 29 | 5:28 | Antes de confiar en un modelo hay que medirlo: ShopWise comparó tres modelos de su asistente con dos métricas automáticas | 3 | 3 | Vuelve a ShopWise (lección 8). "Hay que medirlo" es el puente. |
| 30 | 5:37 | Una métrica mide si la respuesta se apoya en los datos recibidos; la otra mide si responde lo que se preguntó | 3 | 1 | Las dos métricas se describen sin nombre; los nombres llegan en 31. |
| 31 | 5:47 | Uno de los modelos sacó 0,8 en relevancia y 0 en fidelidad; respondía pidiendo el número de pedido, que ya estaba en la pregunta | **4** | 1 | Dos cifras y dos nombres de métrica que llegan después de la descripción. Un ejemplo que hay que volver a cruzar con las métricas. |
| 32 | 5:54 | La conclusión: una métrica sola no alcanza, y hay que leerlas juntas | 2 | 1 | Conclusión directa de 31. |
| 33 | 6:03 | MobilityCorp mide por grupos: ningún subgrupo, como las fotos de noche o con lluvia, puede tener más del doble de falsos positivos que el promedio | **4** | 2 | Subgrupos, falsos positivos, "el doble del promedio" y un caso nuevo de medición, en una idea. "Lo lleva más lejos" enlaza. |
| **version** | 6:13 | | | | |
| 34 | 6:13 | En la entrevista que ClearView le hizo a un experto en inteligencia artificial, cualquier cambio en el modelo o en el prompt puede cambiar el resultado | 3 | 3 | Fuente nueva (entrevista) para una idea ya dicha en 7. Vuelve a ClearView. |
| 35 | 6:24 | Por eso el equipo diseñó conjuntos de prueba con resultados esperados por etapa, del currículum a la versión anonimizada y a los rasgos; separar en etapas hizo posible probar por partes | **4** | 2 | Tres etapas, "conjuntos de prueba" sin definir y una razón en la misma idea. |
| 36 | 6:38 | MobilityCorp escribió cómo entra un modelo nuevo: el de pronóstico de demanda debe superar al vigente en al menos un 5 % | 3 | 3 | Cambio de caso. La cifra omite la métrica (MAPE) y que es una reducción del error (hallazgo 6). |
| 37 | 6:47 | El modelo nuevo corre una semana en sombra, con predicciones que nadie usa; un modelo nuevo es una versión nueva del sistema | 3 | 1 | Repite la idea de versión de 7 y 34. |
| **cierre** | 6:57 | | | | |
| 38 | 6:57 | Por debajo del 80 % de confianza no se cobra el cargo, y eso es una decisión de arquitectura: elige que pierda la empresa y no el cliente | 3 | 3 | Vuelve al umbral de 3 cinco minutos después, sin recordar la advertencia de 22. |
| 39 | 7:14 | Quién pierde cuando el sistema se equivoca decide hacia dónde se inclina el resultado por defecto | 3 | 1 | Cierre de tesis. Reutiliza "resultado por defecto" de 20. |

## Lo que muestran los puntajes

1. **Umbrales sin una sola versión (ideas 3, 22, 38).** El gancho da 90 y 80 como el requisito de Five Nines (idea 3, carga 4). La aclaración de que los umbrales cambian entre documentos llega en la idea 22, cuatro minutos después, y el cierre vuelve al 80 % (idea 38, fricción 3) sin recordarla. Fuente: el requisito de FR#2L da 90/80, pero `Five-Nines-src/adrs/ADR-0020 - Damage Detection Model Architecture.md` l. 41 a 43 usa 85 % y 70 % para el mismo modelo de daños. El espectador escucha dos umbrales para una misma decisión sin saber cuál es el vigente.

2. **Contradicción con la lección 1 (ideas 12 a 14 frente a la lección 1, línea 49).** La lección 1 dice que ClearView "usa inteligencia artificial para emparejar currículums anonimizados con puestos de trabajo". La lección 10 dice lo contrario (ideas 13 y 14). Fuente: `Pragmatic-src/C4/C3-components-matching.md` l. 16: "AI should only be used for feature extraction and not for the scoring and matching itself". La lección 10 es la correcta; la lección 1 está mal y el error aparece en la presentación del caso que todas las lecciones usan.

3. **Certifiable y ClearView se cortan (ideas 16, 23, 17, 29, 34, 36, 38).** Diez de 39 ideas tienen fricción de 3 o más. El pico es la idea 16 (fricción 4): Certifiable aparece en medio del argumento de ClearView, sin puente y con "agentes autónomos" sin definir. Su segunda aparición (idea 23) llega después de la sección de duda, que se ocupa de MobilityCorp. El caso vuelve a cambiar en las ideas 17, 29, 34, 36 y 38.

4. **La idea de versión se repite tres veces (ideas 7, 34 y 37).** "Cambiar el modelo o el prompt cambia el resultado" aparece en el fallo (7), en la entrevista de ClearView (34) y en la semana en sombra (37). La lección 2 (línea 31) también usa el mismo punto con otras palabras. La carga de la idea 7 sube por "prompt", que no se define en ningún lado.

5. **Términos y métricas que se nombran después de usarlos (ideas 4, 7, 9, 30, 31).** "Determinista" (4) y "prompt" (7) no se presentan; "aprendizaje automático" (9) se usa sin definir. En la idea 30 las dos métricas se describen sin nombre, y 31 las nombra después (fidelidad y relevancia). Presentar el nombre antes de describir la métrica bajaría la carga de 31.

6. **Cifras simplificadas que cambian el sentido (ideas 18 y 36).** En la idea 36, "superar al vigente en al menos un 5 %" puede entenderse como cinco puntos de precisión. La fuente es `Five-Nines-src/adrs/ADR-0022…` l. 114: "New model must outperform champion by ≥5% MAPE reduction", es decir, reducir el error MAPE al menos 5 %. En la idea 18, "plazo de dos horas" y "una hora" son P95 en `Five-Nines-src/adrs/ADR-0016…` l. 29 ("Cleanliness P95 ≤ 2 hours; Damage P95 ≤ 1 hour"): el plazo vale para el 95 % de los casos, no para todos.

## Qué cambiaría, en orden de impacto

1. **Un solo umbral vigente en la lección 10 (ideas 3, 22 y 38).** En la idea 3, decir que 90 y 80 son los del requisito FR#2L de Five Nines, y que el modelo de daños de ADR-0020 usa 85 y 70. Mover la advertencia de la idea 22 a la misma frase de la idea 3, y que la idea 38 diga "el umbral de 80 % del requisito" para que el cierre no contradiga la advertencia. Va dentro de la lección 10.

2. **Corregir la lección 1 (línea 49).** Cambiar "usa inteligencia artificial para emparejar currículums ... con puestos de trabajo" por algo como "usa inteligencia artificial para extraer rasgos de los currículums; el puntaje lo calcula código fijo". Va a la lección 1, no a la 10. Es el cambio de mayor impacto porque corrige un error factual en el caso que acompaña todo el curso.

3. **Juntar las apariciones de Certifiable (mover la idea 16).** Mover la idea 16 (agentes autónomos) a la sección "El calificador y el juez", justo después de la idea 26, con una frase de contexto ("como en la lección tres") y una definición de agente autónomo. Así el caso aparece en un solo bloque (ideas 16, 23 a 27) y no entre dos casos de MobilityCorp. Va dentro de la lección 10.

4. **Cortar repeticiones y presentar antes de usar (ideas 7, 9, 30, 31, 36 y 18).** Dejar la explicación de la versión en la idea 34 y quitarla de la 7 (queda "las preguntas anteriores siguen valiendo"). Nombrar fidelidad y relevancia antes de describir las métricas (30). Definir "determinista" y "prompt" en su primera aparición (4 y 7). Reescribir la cifra de la idea 36 como "reducir el error (MAPE) al menos un 5 %" y la de la idea 18 como "el 95 % de los casos, dos horas para limpieza y una hora para daños". Va dentro de la lección 10; el texto de la lección 2 (línea 31) puede quedarse como referencia.
