# Lección 7: Cuando algo falla. Análisis de carga y fricción

39 ideas, duración 4:21 (tiempos de `carga/r11/tiempos-ch7.txt`).

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Farmacy Food es un servicio de comidas preparadas que se entregan en refrigeradores inteligentes. | 1 | 1 | Farmacy Food | Misma frase que la lección 5; ningún elemento nuevo. Arranque, sin salto. |
| 2 | 0:06 | Al confirmar, el pedido pasa al estado "listo para pagar", y ese cambio viaja como mensaje. | 3 | 1 | — | "Listo para pagar" es término nuevo; "mensaje" viene de la lección 6, pero hay que unirlo al cambio de estado. |
| 3 | 0:18 | El mensaje tiene que llegar al pago sí o sí, y el pedido puede procesarse más de una vez. | 2 | 2 | — | "Llegar sí o sí" se recuerda de la lección 5; "procesarse más de una vez" es nuevo. "A la vez" abre una tensión sin presentarla. |
| 4 | 0:25 | Lo que no puede pasar es que eso termine en cargos dobles. | 3 | 1 | — | "Cargos dobles" es término nuevo, combinado con "procesarse más de una vez" de la 3. |
| 5 | 0:28 | Las dos exigencias tiran en sentidos opuestos, y las dos se diseñan. | 2 | 1 | — | Síntesis nueva ("se diseñan"); continúa la tensión de la 3 y la 4 sin salto. |
| 6 | 0:33 | (pregunta) Lo mismo vale para cualquier mensaje entre partes: hay que diseñar lo que pasa fuera del "camino feliz", o sea, fuera del caso en que todo sale bien. | 3 | 3 | — | Pasa de un caso a una regla general ("lo mismo vale") y trae "camino feliz", término nuevo. |
| 7 | 0:44 | Primero, qué pasa si el mensaje llega dos veces; después, qué pasa si no llega. | 3 | 2 | — | "No llega" es un modo de falla nuevo y el plan de dos preguntas es un paso nuevo; conector "primero… después". |
| 8 | 0:49 | (duplicado) Empecemos por el mensaje que llega dos veces: hace falta una cola, y la cola pide un acuse de recibo, o sea, sabe que ya puede olvidar el mensaje. | 3 | 2 | — | "Cola" viene de la lección 6 (se recuerda); "acuse de recibo" es término nuevo y la consecuencia de olvidar es paso nuevo. |
| 9 | 1:05 | Si el acuse no llega, la cola vuelve a entregar el mensaje. | 3 | 1 | — | La reentrega es un paso nuevo, combinado con el acuse de la 8. |
| 10 | 1:09 | El acuse también se puede perder aunque el trabajo esté hecho, y entonces el mensaje llega dos veces. | 3 | 2 | — | Giro nuevo (acuse perdido con trabajo hecho) combinado con la reentrega de la 9. "También" es conector. |
| 11 | 1:15 | Esa garantía se llama entrega al menos una vez; en un pago eso es un cobro doble: el cobro se hizo, el acuse se perdió y el pedido llega de nuevo. | 3 | 1 | — | "Entrega al menos una vez" es término nuevo que hay que unir al mecanismo de 8 a 10; la cadena del cobro se recuerda de la 4. |
| 12 | 1:25 | Farmacy Food propone dos datos con cada pedido: un identificador único y un número de versión. | 4 | 3 | — | Tres elementos nuevos: "identificador único", "número de versión" y la cifra "dos datos". Cambio de hilo anunciado ("veamos cómo se defiende el caso"). |
| 13 | 1:30 | Antes de procesarlo se comprueba si la marca ya existe; si llega una versión ya vista, se descarta. | 4 | 2 | — | Dos pasos nuevos (comprobar existencia y descartar por versión) combinados con el identificador y la versión de la 12. |
| 14 | 1:44 | El costo es que baja un poco el rendimiento; a cambio se gana integridad de los datos, y para un pago eso incluye que el cobro no se duplique. | 3 | 2 | — | "Integridad" y "rendimiento" se recuerdan (lecciones 2 y 5); nuevos: el costo concreto de este diseño y la lectura del cobro, que es nuestra. |
| 15 | 1:58 | (reintento) Ahora, el mensaje que no llega a destino: tomemos el pago del pedido, y el proveedor de pagos puede estar caído. | 2 | 3 | — | "Proveedor de pagos" es actor nuevo. Cambio de tema anunciado ("ahora"): de los duplicados a la pérdida. |
| 16 | 2:05 | El equipo escribió una lista de riesgos técnicos. | 2 | 2 | — | "Lista de riesgos técnicos" es documento nuevo; paso lógico desde el proveedor caído. |
| 17 | 2:05 | En esa lista aparece una opción, no una decisión: guardar los pedidos y reintentar el pago durante un plazo. | 5 | 1 | — | Cuatro elementos nuevos: la distinción opción/decisión, "guardar los pedidos", "reintentar el pago" y "plazo". Es la idea más cargada de la lección. |
| 18 | 2:15 | El plazo queda definido, pero sin cifra; y qué pasa cuando vence tampoco está escrito. | 3 | 1 | — | "Sin cifra" y "qué pasa al vencer" son dos elementos nuevos; "plazo" viene de la 17. |
| 19 | 2:21 | Hay otra falla del pago, la de una confirmación que nunca llega, y para esa sí hay un final escrito. | 4 | 2 | — | Dos elementos nuevos ("confirmación que nunca llega" y "final escrito") combinados con el "no está escrito" de la 18. |
| 20 | 2:27 | La aplicación del cliente debería avisarle al usuario y ofrecerle reintentar; o sea, el cliente se entera y puede volver a intentar. | 3 | 1 | — | "Aplicación del cliente" y el aviso al usuario son elementos nuevos; "reintentar" ya se dijo en la 17. |
| 21 | 2:36 | (silencio) Queda el fallo más sutil, el del mensaje que deja de llegar. | 2 | 3 | — | "Fallo silencioso" es un tipo de falla nuevo. Cambio de tema anunciado: del pago a otro sistema. |
| 22 | 2:40 | Para verlo hace falta mirar otro sistema: MonitorMe, un sistema para hospitales que muestra signos vitales y avisa cuando algo sale de rango. | 1 | 3 | MonitorMe | Caso presentado en las lecciones 2 a 4, se recuerda: ningún elemento nuevo. Salto de caso anunciado. |
| 23 | 2:52 | Los sensores quedan fuera del sistema, como aclaró el cliente; pero qué hace el sistema cuando falta el dato de un sensor sí se diseña. | 2 | 2 | — | "Sensores fuera" se recuerda de la lección 4; nuevo: el diseño del dato faltante. "Cliente" choca con la convención de la lección 4 (ver errores). |
| 24 | 3:01 | Si un sensor falla, la estación de enfermería deja de mostrar ese dato. | 3 | 1 | — | Consecuencia nueva ("deja de mostrar") combinada con el sensor que falla de la 23. |
| 25 | 3:01 | Las reglas que analizan al paciente tampoco reciben algunas señales, como los latidos. | 4 | 3 | — | "Reglas" (componente) y "latidos" llegan sin presentar; "tampoco" obliga a combinarlos con la 24. "Latidos" es el mismo signo que el "pulso" de la lección 3. |
| 26 | 3:11 | O sea, nadie ve que falta. | 2 | 1 | — | Conclusión nueva (un paso); continúa la 25 sin salto. |
| 27 | 3:13 | Por eso esas reglas se configuran para el dato que no existe o es demasiado viejo. | 3 | 2 | — | "Dato demasiado viejo" es elemento nuevo combinado con las reglas de la 25. "Por eso" es conector. |
| 28 | 3:13 | En ese caso la regla no se ejecuta, o salta una alerta. | 3 | 1 | — | "La regla no se ejecuta" es paso nuevo combinado con la condición de la 27; "alerta" se recuerda de la lección 4. |
| 29 | 3:21 | O sea, el silencio puede terminar en un aviso. | 2 | 1 | — | Síntesis: el vínculo silencio-aviso es paso nuevo; los términos se recuerdan. |
| 30 | 3:25 | (negocio) Todavía falta un silencio, más difícil de ver: el del negocio. | 2 | 3 | — | "Silencio del negocio" es concepto nuevo. Cambio de tema anunciado: de la parte técnica a la lógica. |
| 31 | 3:28 | El procesador y la memoria pueden estar bien mientras los pedidos no avanzan. | 4 | 1 | — | Dos elementos nuevos ("procesador y memoria" como métricas técnicas y "pedidos que no avanzan" como síntoma) combinados con el silencio de la 30. |
| 32 | 3:34 | Regresemos a Farmacy Food, que se atiende con chequeos de salud del negocio. | 2 | 3 | — | "Chequeos de salud del negocio" es término nuevo. Vuelta al caso anunciada tras MonitorMe; Farmacy Food ya no es caso nuevo. |
| 33 | 3:38 | Los chequeos mandan un mensaje de prueba por un camino importante, como hacer un pedido (ejemplo nuestro). | 4 | 1 | — | "Mensaje de prueba" y "camino importante" son elementos nuevos combinados con los chequeos de la 32. "Camino importante" suena a "camino feliz" de la 6. La aclaración "ejemplo nuestro" es del autor dentro de la voz. |
| 34 | 3:38 | Después miden si el resultado es correcto. | 3 | 1 | — | Paso nuevo (medir corrección) combinado con el mensaje de prueba de la 33. |
| 35 | 3:48 | Diseñar esos mensajes cuesta esfuerzo y complejidad. | 2 | 1 | — | Costo nuevo; el trade-off se recuerda de la lección 1. |
| 36 | 3:48 | A cambio se detecta el caso en que la parte técnica está sana pero la lógica del negocio quedó trabada. | 3 | 2 | — | "Lógica del negocio trabada" es término nuevo combinado con la "parte técnica sana" de la 31. |
| 37 | 3:58 | (cierre) Con todo esto, vuelve el pedido listo para pagar de Farmacy Food. | 1 | 2 | — | Recuerda "listo para pagar" de la 2; "con todo esto" hace el puente. |
| 38 | 4:02 | Empezó con dos exigencias que tiraban en sentidos opuestos; las respuestas que el equipo propone no evitan que el mensaje se repita, aceptan que llegue más de una vez y hacen que repetirlo no cueste un cobro doble. | 3 | 1 | — | Síntesis: "no evitan que se repita" es paso nuevo combinado con las exigencias de la 1 a la 5; lo demás se recuerda. |
| 39 | 4:15 | Eso mismo se decide, para cada mensaje importante de un sistema, antes de construir. | 2 | 2 | — | "Antes de construir" es principio nuevo; generaliza la 6, un nivel ya usado. "Eso mismo" es conector. |

## Lo que muestran los puntajes

1. **Carga 4 o más con fricción 3 o más:** ideas 12 (1:25, carga 4, fricción 3: tres elementos nuevos al cambiar de hilo hacia la defensa) y 25 (3:01, carga 4, fricción 3: "reglas" y "latidos" llegan sin presentar).
2. **Fricción 3 o más con carga 3 o más:** ideas 6 (0:33, carga 3, fricción 3: paso de caso a regla general), 12 y 25. Son las tres transiciones que más cuestan; las dos últimas son las mismas de arriba.
3. **Pares seguidos con carga 4 o más:** solo 12 y 13 (1:25 y 1:30, ambas 4). Cerca hay dos picos aislados: la 17 (carga 5, entre una 2 y una 3, en 2:05) y la 31 (carga 4, en 3:28), que llega justo después de la 30 (carga 2) y antes de la 32 (carga 2) y la 33 (carga 4).
4. **Casos nuevos a menos de dos minutos:** ninguno. Farmacy Food es caso nuevo en la 1 (0:01) y MonitorMe en la 22 (2:40); están separados por 2:39. Farmacy Food vuelve en la 32 (3:34) sin ser caso nuevo.
5. **Tramo más denso y elementos sin presentar:** las ideas 21 a 29 (2:36 a 3:21) suman carga 22 en 45 segundos. Ahí la voz usa "reglas" y "latidos" sin presentarlos, y "dato demasiado viejo" y "la regla no se ejecuta" aparecen una sola vez.
6. **Ideas que aparecen una vez y no vuelven:** "procesador y memoria" (31), "lógica del negocio trabada" (36), "mensaje de prueba" (33 y 34), "dato demasiado viejo" (27). No son errores, pero la lección no las reutiliza en el cierre; el cierre solo retoma "listo para pagar".

## Errores de hecho y contradicciones

Contradicciones de contenido con otras lecciones: **ninguna**. La descripción de Farmacy Food coincide con la lección 5 (línea 91), MonitorMe coincide con las lecciones 2 a 4, y "integridad de los datos" usa la misma definición que las lecciones 2 y 5.

1. **Naming del cliente (idea 23, 2:52).** Dice "como aclaró el cliente". La lección 4 dice "Lo aclaró quien encargó el proyecto", y su tabla de verificación explica que se hace "para no confundirlo con el cliente de Sysops". En esta lección "cliente" ya es el del pedido de Farmacy Food (ideas 2 y 20). Fuente: `BluzBrothers-src\ADR\ADR-006-sensor-out-of-scope.md` l. 13-14 ("In response to a client inquiry…"). Corrección: "como aclaró quien encargó el proyecto".
2. **Dos nombres para un signo (idea 25, 3:01).** Usa "latidos"; la lección 3 dice "como el pulso y la presión" (Requirements l. 12). La fuente usa "heartbeats" (`BluzBrothers-src\FitnessFunctions\Failover.md` l. 6). Es el mismo signo: conviene usar "pulso".
3. **Atribución de componente (idea 25).** Dice "las reglas que analizan al paciente tampoco reciben algunas señales". La fuente dice: "The Analyzer will not receive certain signals, such as heartbeats" (`Failover.md` l. 6). Las reglas son del Logic Processor, que es un componente interno de esa parte (l. 8). Quien no recibe es el Analyzer, no las reglas.
4. **Tiempo verbal (idea 27, 3:13).** Dice "esas reglas se configuran para el dato que no existe o es demasiado viejo", como si ya estuviera hecho. La fuente dice: "can be configured with rules that dictate actions if the data doesn't exist or if it's outdated" (`Failover.md` l. 8). Es una posibilidad de configuración, no un hecho del sistema.
5. **Cifras:** la lección no tiene cifras que se contradigan con otras; la única cifra es "dos datos" (idea 12), que coincide con el ADR-008 de Farmacy Food.

## Qué cambiaría

1. **Partir la idea 17 (2:05, carga 5).** Dejar la lista de riesgos y la opción en una idea, y "guardar los pedidos y reintentar el pago durante un plazo" en otra, con una frase que defina "plazo" antes de usarlo.
2. **Separar los nombres de la idea 12 (1:25, carga 4).** Quitar la cifra "dos datos" de la misma frase: presentar "identificador único" con el problema que resuelve (la 11 ya lo dice) y "número de versión" en la frase siguiente.
3. **Presentar "reglas" y cambiar "latidos" por "pulso" (idea 25, 3:01).** Una frase antes que diga qué es la parte que decide las alertas, y en la 27 cambiar "se configuran" por "pueden configurarse", como dice la fuente.
4. **Corregir el naming y la voz (ideas 23 y 33).** En la 23, "quien encargó el proyecto" como en la lección 4. En la 33, "camino importante" pasa a "camino clave" o se define, para no chocar con "camino feliz" de la 6; "ejemplo nuestro" sale de la voz y queda en la tabla de verificación.
