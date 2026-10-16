39 ideas, duración 4:44

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Farmacy Food es un servicio de comidas preparadas que se entregan en refrigeradores inteligentes. | 1 | 1 | Farmacy Food | Todo se recuerda de las lecciones 1 y 5 (misma frase en la 5, l. 107). Es caso nuevo solo para esta lección. |
| 2 | 0:06 | Cuando el cliente confirma, el pedido pasa al estado "listo para pagar". | 2 | 1 | — | Un nombre de estado nuevo. Mismo caso. |
| 3 | 0:06 | Ese cambio viaja como un mensaje: lo que una parte del sistema le manda a otra. | 1 | 2 | — | Mensaje y partes del sistema ya están en la lección 6; se redefinen. Conector "Ese cambio". |
| 4 | 0:18 | Ese mensaje tiene que llegar al procesamiento del pago sí o sí. | 3 | 2 | — | Exigencia nueva, combinada con el mensaje de la 3. |
| 5 | 0:18 | Y a la vez, el pedido puede procesarse más de una vez. | 3 | 2 | — | Segunda exigencia nueva, que hay que comparar con la 4. |
| 6 | 0:25 | Lo que no puede pasar es que eso termine en cargos dobles en la cuenta de un cliente. | 3 | 2 | — | Cargos dobles, nuevo; se deduce de la 5. |
| 7 | 0:30 | Las dos exigencias tiran en sentidos opuestos, y las dos se diseñan. | 3 | 1 | — | Tesis nueva ("se diseñan") que compara las dos exigencias. |
| 8 | 0:35 | (pregunta) Lo mismo vale para cualquier mensaje entre las partes de un sistema. | 2 | 3 | — | Generalización nueva; salto de un caso a un principio sin puente. |
| 9 | 0:39 | Un mensaje tiene un camino feliz: cuando todo sale bien, el pedido se paga sin problemas. | 3 | 2 | — | "Camino feliz", nuevo, combinado con la generalización de la 8. |
| 10 | 0:47 | Cuatro preguntas: qué pasa si el mensaje llega dos veces, si no llega y cómo se reintenta, si un dato deja de llegar, y cómo se sabe si el negocio funciona. | 5 | 2 | — | Cuatro elementos nuevos en una sola frase de narración. Pico de la lección. |
| 11 | 1:03 | (duplicado) Empecemos por el mensaje que llega dos veces: hace falta una cola, el lugar donde esperan los mensajes. | 1 | 3 | — | La cola ya se definió en la lección 6 (un buzón). El salto es un hilo anunciado ("Empecemos"). |
| 12 | 1:13 | La cola pide un acuse de recibo, que confirma que el trabajo terminó. Si ese acuse no llega, la cola vuelve a entregar el mensaje. | 3 | 1 | — | Acuse de recibo y reentrega: dos elementos nuevos. Continuación de la 11. |
| 13 | 1:22 | El acuse también se puede perder aunque el trabajo ya esté hecho, y el mensaje llega dos veces. | 3 | 2 | — | Paso nuevo combinado con la reentrega de la 12. Es el mecanismo central. |
| 14 | 1:32 | Esa garantía se llama entrega al menos una vez. | 2 | 1 | — | Un término nuevo. |
| 15 | 1:35 | En un pago: el cobro se hizo, el acuse se perdió y el pedido llega de nuevo. Sin defensa, el cliente pagaría otra vez. | 2 | 2 | — | Aplica el mecanismo a un pago. "Sin defensa" se usa antes de definirla (la 16). |
| 16 | 1:42 | Farmacy Food propone resolverlo con un identificador único: con él se comprueba si el pedido ya existe, y un pedido repetido se reconoce. | 3 | 3 | — | Identificador único y el paso de comprobar si existe: dos nuevos. Vuelve al caso sin puente. |
| 17 | 1:51 | Además propone un número de versión: un mensaje con una versión ya vista se descarta, y el duplicado no se procesa dos veces. | 3 | 2 | — | Número de versión y regla de descarte: dos nuevos. |
| 18 | 2:00 | El costo es que baja un poco el rendimiento. A cambio se gana integridad de los datos, que es que sean correctos y no se pierdan. | 3 | 2 | — | La integridad se define aquí de otra forma que en la lección 5 (ver errores). Definición nueva combinada con el costo. |
| 19 | 2:08 | Para un pago, eso incluye que el cobro no se duplique. | 1 | 1 | — | Aplica lo ya dicho. |
| 20 | 2:12 | (reintento) Ahora, el mensaje que no llega a destino. | 1 | 3 | — | Cambio de hilo anunciado ("Ahora"). Ningún elemento nuevo. |
| 21 | 2:15 | Tomemos el pago del pedido, con el proveedor de pagos caído. Entre los riesgos que anotó el equipo aparece una opción, no una decisión: guardar los pedidos y reintentar el pago durante un plazo. | 5 | 2 | — | Cuatro nuevos: proveedor de pagos caído, riesgos del equipo como fuente, distinción opción y decisión, reintento con plazo. Pico de la lección. |
| 22 | 2:28 | Ese plazo no se fija, y qué pasa cuando vence tampoco está escrito. | 3 | 1 | — | Dos huecos nuevos combinados con la opción de la 21. |
| 23 | 2:32 | Sí hay un final escrito para otra falla del pago. Si no llega confirmación de que el pago se aceptó o se rechazó, la aplicación del cliente debería avisarle al usuario y ofrecerle reintentar. O sea, el cliente se entera y puede volver a intentar. | 4 | 3 | — | Confirmación de aceptación o rechazo, app del cliente y aviso al usuario, combinados con el plazo. Cambio de falla anunciado ("otra falla"). |
| 24 | 2:48 | (silencio) Queda el fallo más sutil, el del mensaje que simplemente deja de llegar. | 2 | 3 | — | El silencio como tipo de fallo es nuevo. Cambio de hilo anunciado. |
| 25 | 2:52 | MonitorMe es un sistema para hospitales: muestra en la estación de enfermería los signos vitales y avisa cuando algo sale de rango. | 1 | 4 | MonitorMe | Todo se recuerda de las lecciones 2 a 4 (misma frase en la 4, l. 69). Aparece sin puente, en medio del argumento. |
| 26 | 3:02 | Los sensores quedan fuera del sistema, pero lo que el sistema hace cuando un sensor falla sí se diseña. | 3 | 2 | — | Sensores y "fuera del sistema" se recuerdan de la 4. Nuevo que la falla del sensor se diseña, combinado con el silencio. |
| 27 | 3:08 | Si un sensor falla, la pantalla deja de mostrar ese dato, y las reglas que analizan al paciente tampoco reciben esa señal. | 4 | 1 | — | Reglas que analizan al paciente, dejar de mostrar y no recibir la señal: tres nuevos combinados con la 26. |
| 28 | 3:15 | O sea, nadie ve que ese dato falta. | 3 | 2 | — | Consecuencia nueva, combinada con la 27. |
| 29 | 3:18 | Por eso las reglas se pueden configurar para el caso en que el dato no existe o es demasiado viejo: la regla no se ejecuta o salta una alerta, y el silencio puede terminar en un aviso. | 4 | 2 | — | Configurar reglas, dato demasiado viejo y regla que no se ejecuta, combinados con el silencio de la 24. |
| 30 | 3:30 | Las alertas salen por dos canales, al teléfono de los profesionales y a la estación de enfermería, que sigue funcionando si se cae internet. | 4 | 1 | — | Dos canales, teléfono de los profesionales y caída de internet: tres nuevos, combinados con las alertas. |
| 31 | 3:42 | (negocio) Todavía falta un silencio, más difícil de ver. | 2 | 3 | — | Silencio del negocio, nuevo. Cambio de hilo anunciado. |
| 32 | 3:45 | El procesador y la memoria pueden estar bien mientras los pedidos no avanzan. | 4 | 1 | — | Procesador, memoria y pedidos que no avanzan: tres nuevos, combinados con la 31. |
| 33 | 3:51 | Regresemos a Farmacy Food. Allí lo atienden con chequeos de salud del negocio. | 2 | 3 | — | Chequeos de salud del negocio, nuevo. Vuelta al caso anunciada. |
| 34 | 3:56 | Los hace una pieza aparte del sistema, el supervisor. | 3 | 1 | — | Supervisor y pieza aparte, nuevos, combinados con los chequeos. |
| 35 | 3:59 | El supervisor manda un mensaje de prueba por un recorrido importante, como hacer un pedido (ejemplo nuestro). Después mide si el resultado es correcto y cuánto tarda. | 5 | 1 | — | Mensaje de prueba, recorrido importante, medir corrección y medir tiempo: cuatro nuevos. |
| 36 | 4:10 | Diseñar esos mensajes cuesta esfuerzo y complejidad. A cambio se detecta el caso en que la parte técnica está sana pero algo de la lógica del negocio quedó trabado. | 4 | 2 | — | Costo de esfuerzo y complejidad, parte técnica sana y lógica trabada: tres nuevos, combinados con la 35. |
| 37 | 4:21 | (cierre) Con todo esto, vuelve el pedido listo para pagar de Farmacy Food. | 1 | 3 | — | Vuelta al caso de la apertura, anunciada. Ningún elemento nuevo. |
| 38 | 4:25 | Empezó con dos exigencias que tiraban en sentidos opuestos. Las respuestas que propone el equipo no evitan que el mensaje se repita: aceptan que llegue más de una vez, y hacen que repetirlo no cueste un cobro doble. | 3 | 1 | — | Síntesis nueva (las respuestas aceptan la repetición), combinada con las exigencias de la 4 y la 5. |
| 39 | 4:39 | Eso mismo se decide, para cada mensaje importante de un sistema, antes de construir. | 3 | 2 | — | Principio nuevo (decidir antes de construir), combinado con la 38. |

## Lo que muestran los puntajes

1. **Carga 4 o más con fricción 3 o más:** solo la idea 23 (2:32). Tres elementos nuevos (confirmación de aceptación o rechazo, app del cliente, aviso al usuario) en un cambio de falla anunciado, justo después de la idea 21 (carga 5). El tramo del pago concentra la mayor densidad de la lección.
2. **Fricción 3 o más con carga 3 o más:** ideas 16 (1:42, vuelve a Farmacy Food sin puente, con identificador único y comprobación nuevos) y 23 (2:32). La idea 25 (2:52, MonitorMe) tiene fricción 4 pero carga 1: no es carga de elementos, es el salto de un caso sin puente en medio del argumento.
3. **Pares seguidos con carga 4 o más:** 29 y 30 (3:18 y 3:30: reglas configurables, después dos canales, ambas 4 sin pausa entre ellas) y 35 y 36 (3:59 y 4:10: mensaje de prueba con cuatro elementos, luego el costo con tres, ambas en 5 y 4). Los dos pares están en el tramo de silencio y de negocio.
4. **Casos nuevos a menos de dos minutos:** ninguno. La lección presenta dos casos nuevos, Farmacy Food (0:01) y MonitorMe (2:52), separados por 2 min 51 s.
5. **Pico y tramo de menor encaje:** la carga 5 aparece tres veces (idea 10 a las 0:47, idea 21 a las 2:15, idea 35 a las 3:59). El tramo de negocio (31 a 36, 3:42 a 4:21) suma seis ideas con carga 2 a 5 sobre salud del negocio, chequeos, supervisor y medición. La decisión de diseño de la lección es el silencio de un dato, y el chequeo de negocio es un ejemplo suelto de operación (en el DISENO-CURSO, "Operar" queda como ejemplos dentro de R3 y R5, no como resultado propio).

## Errores de hecho y contradicciones

1. **Integridad de los datos se define dos veces, y la nota dice que es la primera.** Idea 18 (2:00) y la nota de verificación (fila de "Cola con acuse de recibo", l. 87) dicen que la definición "se da aquí por primera vez". No es así: lección 5, l. 29: "Hay un término que conviene fijar. La integridad de los datos es que se mantengan correctos aunque varios servicios los toquen." Esa definición restringe el concepto a varios escritores, y la que cita la lección 7 viene de la fuente Pragmatic `ArchitectureCharacteristics/Characteristics.md` l. 20: "The data across the system is correct and there is no data loss in the system". La fuente pide correcto y sin pérdida, sin condicionarlo a escrituras concurrentes. Las dos lecciones tienen que decir lo mismo.
2. **"Ese plazo no se fija" (idea 22, 2:28) no coincide con la fuente.** La nota (fila de "Proveedor de pagos caído", l. 92) dice "sin plazo". La fuente, ArchColider `2.SolutionBackground/RisksAndSensitivePoints.md` l. 26, dice: "can be retried for a defined period of time". El documento define un plazo, pero no dice cuánto dura. Lo correcto sería "el documento no dice cuánto dura ese plazo".

Verificado sin error: ADR-008 (l. 11, 17, 21), ADR-004 health check (l. 21, 27, 29), Failover.md (l. 5 a 8) y InformationModels l. 239 coinciden con lo que la lección dice.

## Qué cambiaría

1. **Corregir los dos errores de la sección anterior.** En la narración de la idea 18, decir que la integridad se entiende igual que en la lección 5 (o unificar la definición en la 5). En la idea 22, cambiar "no se fija" por "no dice cuánto dura". Y corregir las dos notas de verificación.
2. **Partir la idea 21 (carga 5) y la idea 23 (carga 4).** Primero "proveedor caído y opción, no decisión" y después "guardar y reintentar durante un plazo". En la 23, separar "qué confirma el pago" de "qué hace la app del cliente". Así ninguna idea supera 3 elementos nuevos. Y no volver a definir la cola ni el mensaje en las ideas 3 y 11 (ya están en la lección 6): decir "la cola de la lección 6" baja el trabajo de la 11.
3. **Puentear MonitorMe (idea 25, fricción 4).** Por ejemplo: "Para ver el silencio en un caso que ya conocemos, volvamos a MonitorMe." Y recortar la descripción a una frase, porque la misma está en las lecciones 2 y 4. Baja la fricción a 2 y ahorra unos 10 segundos.
4. **Aligerar el bloque de negocio y poner puentes en los pares densos.** Entre las ideas 29 y 30, y entre 35 y 36, cambiar de tema con una frase de transición ("Las alertas tienen su propio recorrido" o "Eso también tiene un precio"). En el negocio, quitar "pieza aparte del sistema" (34) y dejar una sola medida ("si el resultado es correcto y cuánto tarda", que hoy son dos). Se puede contar como una idea de dos elementos, con carga 3 en vez de 5.
