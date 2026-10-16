38 ideas · duración 5:43 (343 s, según timing.js)

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Sysops Squad es un sistema de tickets de soporte técnico: un monolito viejo que pierde tickets y se cae en los picos de uso | 3 | 1 | Sysops Squad | Nombre nuevo, monolito ya visto en la lección 1 y dos hechos; primera idea, no hay anterior |
| 2 | 0:09 | Además guarda las tarjetas de crédito de sus clientes, para cobrarles el plan de cada mes | 2 | 2 | — | Dato nuevo del mismo caso; "Además" lo une a la idea anterior |
| 3 | 0:15 | Guardar tarjetas tiene una consecuencia: puede exigir una auditoría PCI, la norma de seguridad para quien maneja datos de tarjetas | 3 | 2 | — | Sigla nueva, glosada en la misma frase; cadena guardar tarjetas, auditoría |
| 4 | 0:25 | Según el equipo, cuanto más grande es la parte que toca las tarjetas, más pesada es la auditoría | 2 | 1 | — | Regla atribuida, sin cifras; continúa la cadena de la idea 3 |
| 5 | 0:32 | Por eso el equipo propone aislar la facturación como zona de seguridad que no recibe pedidos de las otras áreas | 3 | 2 | — | "Las otras áreas" se usa antes de presentar las cuatro áreas (idea 9); "zona aislada" es concepto nuevo |
| 6 | 0:40 | Las decisiones de este caso quedaron escritas como propuestas | 2 | 2 | — | Salto a una observación sobre el documento, no sobre el sistema |
| 7 | 0:44 | (pregunta) Dónde se corta un sistema es una decisión costosa de cambiar; en Sysops Squad la razón fue lo que necesita cada parte | 3 | 3 | — | Pasa de un caso concreto a un principio general, sin ejemplo que lo sostenga; el hilo se anuncia pero no se conecta con la tarjeta |
| 8 | 0:55 | La lección sigue con de dónde salen las partes, qué se deja afuera y, al final, el estilo | 2 | 2 | — | Hoja de ruta; "de dónde salen las partes" se anuncia segundo y llega en la idea 24 |
| 9 | 1:04 | (necesidades) Cuatro áreas: cliente, técnicos en terreno, facturación y administración; cada una pide algo distinto | 4 | 2 | — | Cuatro nombres de área nuevos en una sola frase, y "técnicos en terreno" como nombre propio de un grupo |
| 10 | 1:16 | El cliente y los técnicos necesitan disponibilidad y respuesta rápida, porque nada deja tan descontento a un cliente como un sistema lento o caído | 3 | 1 | — | Dos cualidades con su razón; sigue la enumeración de la idea 9 |
| 11 | 1:28 | Quien llega a la casa del cliente tiene que poder buscar el ticket; si no puede, quizá no arregle el problema | 2 | 1 | — | Un solo escenario concreto que continúa la lista de necesidades |
| 12 | 1:35 | La facturación necesita seguridad: una filtración de datos de tarjetas sería un desastre, con implicaciones legales | 2 | 1 | — | Tercer ítem de la lista; "implicaciones legales" sin explicar |
| 13 | 1:43 | La administración tolera demoras: si un reporte tarda un poco más, no pasa nada grave | 2 | 1 | — | Último ítem de la lista de necesidades |
| 14 | 1:51 | Cada frontera queda donde la necesidad cambia | 3 | 2 | — | Principio general que resume la lista; la lección no lo marca como lectura propia |
| 15 | 1:54 | (quanta) Una frontera solo separa de verdad si las partes no se esperan | 3 | 3 | — | Cambio de hilo: de necesidades a comunicación entre partes; regla general sin ejemplo |
| 16 | 1:58 | Si una pieza llama a otra y espera su respuesta, las dos quedan atadas; si la segunda se cae, un grupo así se cae junto | 4 | 2 | — | Concepto nuevo (llamada con espera) y cadena causal de tres pasos en una frase |
| 17 | 2:09 | Ese grupo recibe el nombre de quantum | 3 | 1 | — | Término nuevo y central; definición del canon, no de la fuente |
| 18 | 2:13 | Sysops Squad evita esa espera entre sus áreas: el ticket queda en una cola de mensajes y el sistema sigue | 3 | 2 | — | Vuelve al caso con puente explícito; "cola de mensajes" sin explicar; "entre sus áreas" es más amplio que ADR-2 |
| 19 | 2:21 | Con la tarjeta pasa igual; una llamada con espera anularía el esfuerzo por mantener disponible la parte del cliente | 3 | 2 | — | Vuelve al hilo de la tarjeta (ideas 2 a 5) con "igual" como puente; "anularía el esfuerzo" es abstracto |
| 20 | 2:30 | Por eso el documento habla de un quantum por área; lo que sigue es una lectura nuestra: las necesidades dicen dónde cortar y las llamadas dicen si el corte aguanta | 3 | 2 | — | Conclusión marcada como lectura propia; une dos variables nuevas en una frase |
| 21 | 2:41 | (nopartir) Cortar no siempre es la respuesta: el servicio de notificaciones no pertenece a ninguna de las áreas y lo usan todas | 4 | 2 | — | Principio contrario, servicio nuevo y una doble negación relativa en la misma frase |
| 22 | 2:53 | El equipo propone dejarlo como una sola pieza: llegar un poco tarde no le perjudica a los avisos, y un servicio por área repetiría la misma implementación | 3 | 1 | — | Decisión con dos razones; continúa el ejemplo de la idea 21 |
| 23 | 3:05 | No partir también se decide con una razón escrita, igual que un corte | 2 | 1 | — | Cierre del ejemplo; repite el principio de la idea 20 |
| 24 | 3:09 | (eventos) Para saber de dónde salen las partes, una técnica es el event storming: anotar lo que pasa en el negocio, en pasado y en orden | 4 | 3 | — | Técnica nueva, pregunta nueva y "partes candidatas" en la misma frase; anunciada en la idea 8, pero llega después de tres decisiones de corte |
| 25 | 3:24 | MonitorMe es un sistema para hospitales que muestra en la estación de enfermería los signos vitales y avisa cuando algo sale de rango | 3 | 3 | MonitorMe | Caso nuevo anunciado una frase antes ("entra otro caso"); hospital y estación de enfermería como contexto nuevo |
| 26 | 3:32 | Su event storming tiene hechos como estos: llegaron datos de un sensor, se detectó un problema, se envió una alerta, la enfermera vio la alerta | 3 | 1 | — | Lista de cuatro hechos del caso; continúa el ejemplo sin salto |
| 27 | 3:42 | Los hechos se agrupan por proceso del negocio, y cada grupo es una parte candidata; a MonitorMe le salieron seis, y con dos hubo que decidir aparte | 4 | 1 | — | Dos cifras (seis, dos) y la regla de agrupación en una sola frase |
| 28 | 3:52 | Los sensores quedan fuera del sistema, y así el hardware no es responsabilidad del equipo; lo que se paga es que no hay protocolo conocido y se asume un flujo continuo | 4 | 1 | — | Decisión, razón y costo con dos términos sin explicar ("protocolo conocido", "flujo continuo") |
| 29 | 4:05 | El registro de pacientes queda dentro, como subdominio de apoyo; lo que se paga es adaptarse a una solución externa que ya existe | 3 | 1 | — | "Subdominio de apoyo" es término nuevo, con definición inline; contraste con la idea 28 |
| 30 | 4:17 | Dejar algo fuera, o a medio camino, también es un corte, con su razón y su costo escritos | 2 | 2 | — | Vuelve al principio general para cerrar el caso; sin ejemplo nuevo |
| 31 | 4:23 | (estilo) Con las áreas definidas, Sysops Squad propone el estilo; el monolito es una sola pieza y los microservicios son muchas piezas pequeñas | 3 | 3 | — | Vuelve de MonitorMe a Sysops tras nueve ideas; "con las áreas definidas" es puente, pero es un tema nuevo (estilo) |
| 32 | 4:33 | El estilo que propone es service-based, un punto intermedio con un servicio grande por área | 3 | 1 | — | Término en inglés nuevo; "un servicio por área" no coincide con la cifra de la fuente (unos siete servicios) |
| 33 | 4:39 | Sus razones son cualidades: buena tolerancia a fallos, escalabilidad y agilidad, sin el sobrecosto de los microservicios | 4 | 2 | — | Tres cualidades, referencia a la lección 2 y "sobrecosto" en una frase; sin cifra que lo ancle |
| 34 | 4:53 | Primero vinieron las áreas y lo que necesita cada una, y solo después el estilo | 2 | 1 | — | Resumen del orden de decisión; repite la hoja de ruta de la idea 8 |
| 35 | 4:58 | (cierre) Volvamos a la facturación de Sysops Squad: aislarla simplifica mucho la auditoría, según el equipo | 2 | 3 | — | Vuelta explícita a un hilo dejado en 0:32, más de cuatro minutos antes; el puente existe pero es largo |
| 36 | 5:05 | Pero otras partes necesitan sus datos: los clientes cargan y editan su tarjeta, los administradores resuelven problemas de pago y los gerentes ven informes financieros | 3 | 2 | — | Dos roles nuevos (administradores, gerentes) en una enumeración; "pero" marca el contraste |
| 37 | 5:16 | Eso cruza una frontera: el documento anota como consecuencias más complejidad y la tarea de asegurar que la tarjeta viaje protegida | 3 | 2 | — | Consecuencias de la propuesta; "viaje protegida" sin explicar |
| 38 | 5:27 | Al principio parecía una decisión de seguridad; vista entera, cortar un sistema es poner una frontera donde una parte necesita algo distinto, y aceptar por escrito lo que cuesta cruzarla | 3 | 2 | — | Conclusión general en una sola frase larga; vuelve a la frase de 0:32 |

## Lo que muestran los puntajes

1. **Pico de carga en el tramo de MonitorMe (ideas 24 a 28).** La idea 24 pone carga 4 y fricción 3 a la vez (técnica nueva, pregunta nueva, cambio de tema), justo antes del caso nuevo de las ideas 25 y 26. Después vienen las ideas 27 y 28, las dos con carga 4 y seguidas: seis contextos, dos decididos aparte, sensores, protocolo, flujo continuo. Ese es el único par consecutivo con carga 4 o más (27 y 28).

2. **Ideas con carga 4 o más y fricción 3 o más: solo la 24.** Las demás ideas de carga 4 (9, 16, 21, 27, 28 y 33) llegan con fricción 1 o 2, así que el espectador carga sin ayuda de un puente. La 16 (llamada con espera, cadena causal en una frase) y la 21 (doble negación en la misma frase) son las más pesadas de ese grupo.

3. **Ideas con fricción 3 o más y carga 3 o más: 7, 15, 24, 25 y 31.** Son los saltos de hilo. La 7 pasa de la tarjeta a un principio general sin ejemplo; la 15 enuncia una regla sin caso; la 25 trae a MonitorMe; la 31 vuelve a Sysops después de nueve ideas. La 35 (fricción 3, carga 2) es otra vuelta, esta vez a la facturación, que quedó abandonada desde 0:32.

4. **Términos que aparecen una vez y no vuelven: quantum (ideas 16 a 20), event storming (24), service-based (32) y subdominio de apoyo (29).** Buscados en los guiones de las otras diez lecciones, ninguno aparece en la narración. "Cola de mensajes" (18) se usa sin explicar aquí, y la lección 6 lo retoma después.

5. **La hoja de ruta no coincide con el orden real (idea 8 frente a ideas 9 a 24).** La idea 8 anuncia "de dónde salen las partes" en segundo lugar, pero llega en la idea 24, después de necesidades, quanta y "no partir". El diseño del curso (DISENO-CURSO.md, etapas 2 a 4) dice que el dominio da los candidatos y que cada corte se justifica después por lo que la parte necesita: la lección hace el orden inverso.

6. **La descripción de Sysops Squad se repite en cuatro lecciones.** La idea 1 es la misma frase que `leccion5.md` línea 25 y `leccion6.md` línea 5, y casi la misma que `leccion8.md` línea 19. Eso no sube la carga de esta lección, pero si se ven en orden, el espectador oye la misma presentación tres veces seguidas.

## Errores de hecho y contradicciones

Cifras verificadas, sin contradicción: cuatro áreas (`Team-7-src/ADR/ADR-1-service-based.md` l. 11 a 16), seis contextos (`BluzBrothers-src/EventStorming/EventStorming.md` l. 104 a 118) y dos decididos aparte (`EventStorming.md` l. 123 y 124).

1. **Sensores, idea 28: la lección omite el origen de la decisión.** La lección lo presenta como razón del equipo ("el hardware no es responsabilidad del equipo"). La fuente dice: "In response to a client inquiry, it was clarified that the system does not handle the sensor context" (`BluzBrothers-src/ADR/ADR-006-sensor-out-of-scope.md` l. 14). Y `EventStorming.md` l. 123 dice que el registro de pacientes también se decidió "based on the client's response". La lección 11 sí lo dice ("porque el cliente aclaró"), así que no se contradicen, pero la lección 4 deja afuera la causa.

2. **Service-based, idea 32: la glosa no coincide con la cifra de la fuente.** La lección dice "un servicio grande por área" (cuatro áreas, cuatro servicios). `Team-7-src/README.md` l. 39 dice: "the average number of services in Service-based architecture that we defined as our initial candidate, is about 7". La lección lo marca como glosa propia en la tabla, pero en el guion no se nota.

3. **Principios sin marca de lectura propia, ideas 14 y 15.** "Cada frontera queda donde la necesidad cambia" no está en ninguna fuente: `ADR-1` l. 11 a 18 solo dice que cada dominio tiene su propio grupo de características. "Una frontera solo separa de verdad si las partes no se esperan" es la definición de quantum del canon (`CANON.md` §2), dicha como ley. La idea 20 sí se marca como "lectura nuestra" y estas no.

4. **"Evita esa espera entre sus áreas", idea 18: generalización.** `Team-7-src/ADR/ADR-2-event-driven-broker.md` l. 12 a 15 habla de la relación entre cliente y servicios de Sysops (flujo de tickets). `ADR-5` l. 20 y 26 cubre contratos y encuestas con replicación de tablas o colas, sin espera. El espíritu está respaldado, pero "entre sus áreas" es más amplio que lo que cita la tabla.

5. **"Las decisiones de este caso quedaron escritas como propuestas", idea 6: cierto para los ADR citados, no para todo el caso.** ADR-1, 2, 4, 5 y 9 están en Proposed. Pero `Team-7-src/ADR/ADR-8-messaging-sync.md` l. 5 dice **OBSOLETE**. La lección no cita el ADR-8, así que no hay error en el guion, pero "todas" sería falso.

6. **Contradicción de nombres entre lecciones: mecanismo de ticket.** La idea 18 dice "cola de mensajes". `leccion5.md` línea 35 dice "Después se dispara un evento, un aviso". Son compatibles (la cola transporta el evento), pero el mismo mecanismo tiene dos nombres. Fuente: `ADR-2` l. 12, "asynchronous message queues".

7. **PCI, idea 3 frente a lección 8: definición distinta.** La idea 3 dice "la norma de seguridad para quien maneja datos de tarjetas". `leccion8.md` línea 21 dice "la de los pagos con tarjeta" (la auditoría). `ADR-4` l. 8 dice "Payment Card Industry (PCI) audit". Menor, pero conviene una sola definición.

## Qué cambiaría

1. **Mover "El negocio propone las partes" (ideas 24 a 27) antes de "Cada parte necesita algo distinto".** Así el orden de la lección coincide con el diseño (el dominio da los candidatos y después se justifica cada corte) y con la hoja de ruta de la idea 8. Si no se quiere mover, al menos corregir la hoja de ruta.

2. **Separar el pico de MonitorMe.** Dar la técnica (idea 24) después del caso (25 y 26), y partir la idea 27 (seis y dos aparte) de la 28 (sensores y protocolo) con una frase de transición. Explicar "cola de mensajes" (18) y "subdominio de apoyo" (29) en su primer uso, o usar en su lugar términos que la lección ya haya presentado.

3. **Puentes explícitos y un ejemplo antes de la regla.** En la idea 15, poner primero el ticket de Sysops esperando a facturación y después "una frontera solo separa si..."; en la 31 decir a qué punto del caso se vuelve; en la 35 decir "dejamos la facturación en el minuto 0:32" o acortar la distancia entre 5 y 35.

4. **Atribuir bien las afirmaciones.** En la idea 28, decir que el cliente aclaró el alcance (`ADR-006` l. 14; `EventStorming.md` l. 123). En la idea 32, usar la cifra de la fuente (unos siete servicios) o decir que cuatro áreas dan cuatro servicios en esta lectura. En las ideas 14 y 15, marcar como canon o como lectura propia, igual que la idea 20.
