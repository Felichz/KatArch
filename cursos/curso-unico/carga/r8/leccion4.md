Lección 4 (Dónde se corta un sistema): 39 ideas, duración 6:08.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (gancho) Sysops Squad es el soporte técnico de una empresa de electrónica; su sistema de tickets es un monolito viejo que pierde tickets y se cae | 2 | 1 | Sysops Squad | Un nombre nuevo (Sysops Squad). "Monolito" se recuerda de la lección 2. Apertura, sin idea anterior |
| 2 | 0:11 | El sistema guarda tarjetas de crédito de los clientes para cobrarles el plan mensual | 2 | 1 | — | Un hecho nuevo del caso (guarda tarjetas). Continuación de la descripción de Sysops |
| 3 | 0:11 | Guardarlas puede obligar a una auditoría PCI, la norma de seguridad para quien guarda tarjetas | 3 | 2 | — | Dos elementos nuevos: la sigla PCI y el término auditoría. Sigue como consecuencia de la idea 2 |
| 4 | 0:24 | Cuanto más grande es la parte que toca tarjetas, más pesada es la auditoría; conviene que sea lo más chica posible | 3 | 2 | — | Un paso nuevo (la auditoría crece con la parte que toca tarjetas) combinado con la idea 3 |
| 5 | 0:33 | La parte que cobra y toca tarjetas es facturación; una decisión propone aislarla, o sea, que ninguna otra parte le haga solicitudes | 4 | 2 | — | Tres elementos nuevos: facturación, aislarla, solicitudes en sentido técnico. El conector "por eso" da el paso lógico |
| 6 | 0:48 | (pregunta) Esa frontera es una decisión difícil de cambiar y lleva a una pregunta general: dónde se corta un sistema en partes | 3 | 3 | — | La pregunta general (dónde se corta) es nueva, combinada con la frontera de la idea 5. Cambio de caso a pregunta general, anunciado |
| 7 | 0:57 | En Sysops Squad, la razón del corte fue lo que necesita cada parte; la lección va primero por las necesidades y termina en el estilo | 3 | 2 | — | Un principio nuevo (el corte sigue las necesidades) combinado con la pregunta de la idea 6. "Estilo" se recuerda de la lección 2. Anuncio de la ruta |
| 8 | 1:09 | (necesidades) El equipo encontró cuatro áreas: cliente (disponible y rápido), técnicos (lo mismo, buscan el ticket en la casa), facturación (seguridad) y administración (tolera demoras) | 5 | 2 | — | Cuatro áreas nuevas, cada una con su necesidad. Va como una sola idea por ser una enumeración, pero pide cuatro elementos nuevos a la vez. Es el pico de carga de la lección |
| 9 | 1:50 | (quanta) Ya vimos qué necesita cada parte; falta ver si el corte aguanta, y eso depende de si las partes se esperan entre sí | 3 | 2 | — | Un criterio nuevo (si el corte aguanta depende de la espera) combinado con las necesidades de la idea 8 |
| 10 | 1:57 | Veámoslo con un ticket: el cliente lo envía y el sistema sigue sin esperar a que alguien lo procese; el cliente no queda pendiente | 3 | 2 | — | Un paso nuevo (el sistema no espera) combinado con el criterio de la idea 9. Ejemplo anunciado |
| 11 | 2:07 | Si una pieza llama a otra y espera su respuesta, las dos quedan atadas: si la segunda se cae, la primera tampoco puede responder | 4 | 2 | — | Tres elementos nuevos: llamada con espera, atadas, y la consecuencia de la caída (un paso de razonamiento). "En cambio" marca el contraste con el ejemplo |
| 12 | 2:17 | A un grupo de piezas atadas así se le llama quantum | 2 | 2 | — | Un término nuevo (quantum), que nombra lo que la idea 11 acaba de describir |
| 13 | 2:20 | Si el cliente tuviera que esperar, él y el sistema formarían uno; como no espera, cada uno se cae por separado | 3 | 2 | — | Un paso nuevo (cada uno se cae por separado) combinado con quantum y con el ejemplo del ticket |
| 14 | 2:29 | Por eso, Sysops Squad propone un quantum por cada una de las cuatro áreas, según lo que necesita cada una | 3 | 2 | — | Una regla nueva (un quantum por área) combinada con las cuatro áreas de la idea 8 |
| 15 | 2:35 | (vuelta) Volvamos a la tarjeta: sus datos llegan a facturación por mensajes, que no esperan y no son solicitudes, así sigue aislada | 3 | 3 | — | Un paso nuevo (mensajes que no esperan mantienen el aislamiento) combinado con las ideas 5 y 11. Vuelta al hilo de la tarjeta, anunciada |
| 16 | 2:45 | El equipo escribe que una llamada con espera anularía el esfuerzo por la disponibilidad y la escalabilidad de la parte del cliente | 2 | 2 | — | Un elemento nuevo: la cita del equipo. Disponibilidad y escalabilidad se recuerdan de las lecciones 2 y 3 |
| 17 | 2:54 | Nuestra lectura: con una llamada y la facturación caída, el cliente no podría cargar su tarjeta, y con mensajes sí | 3 | 2 | — | Una consecuencia nueva (no poder cargar la tarjeta) combinada con la idea 16. El cambio de voz ("nuestra lectura") se anuncia |
| 18 | 3:01 | (nopartir) Todo lo anterior fueron cortes; ahora toca un caso en que no se corta | 2 | 3 | — | Un concepto nuevo (no partir) y un cambio de caso anunciado |
| 19 | 3:06 | Sysops Squad propone un servicio de notificaciones, que avisa a clientes y técnicos | 2 | 1 | — | Un elemento nuevo: el servicio de notificaciones. Sigue el mismo caso |
| 20 | 3:11 | Lo usan las cuatro áreas, y por eso no es de ninguna; el equipo lo deja como una sola pieza, y los avisos de todas las áreas salen del mismo lugar | 3 | 2 | — | Un paso nuevo (uso compartido, así que no pertenece a ninguna área) combinado con las cuatro áreas de la idea 8 |
| 21 | 3:22 | Los avisos pueden llegar tarde sin ser críticos, y un servicio por área repetiría la misma implementación; no partir también se decide con una razón escrita, igual que un corte | 4 | 2 | — | Tres elementos nuevos: la tardanza no crítica, la implementación repetida, y la razón escrita como criterio para no partir (combinada con los cortes) |
| 22 | 3:36 | (eventos) Terminan los cortes de Sysops Squad; queda saber de dónde salen las partes candidatas | 2 | 3 | — | Un término nuevo (partes candidatas). Cambio de tema anunciado ("queda saber") |
| 23 | 3:42 | Para responderlo hay una técnica, event storming: anotar lo que pasa en el negocio, en pasado y en orden | 3 | 3 | — | Dos elementos nuevos: event storming y la regla de anotar en pasado y en orden. Herramienta nueva, presentada como respuesta, sin ejemplo todavía |
| 24 | 3:49 | Para ver cómo se aplica, entra MonitorMe: un sistema para hospitales que muestra en la estación de enfermería los signos vitales y avisa cuando algo sale de rango | 1 | 3 | MonitorMe | Caso nuevo en esta lección, pero la descripción es casi textual de las lecciones 2 y 3: ningún elemento nuevo para el espectador. Cambio de caso anunciado |
| 25 | 4:02 | La estación es una aplicación aparte; el sistema solo le entrega los datos | 2 | 2 | — | Un hecho nuevo (la estación es aparte), aclarado con "o sea" |
| 26 | 4:07 | Los hechos de MonitorMe se agrupan por proceso del negocio, y cada grupo es una parte candidata | 3 | 2 | — | Un paso nuevo (agrupar por proceso del negocio) combinado con event storming de la idea 23 |
| 27 | 4:12 | Dos de las seis partes recibieron una decisión aparte: los sensores y el registro de pacientes | 3 | 2 | — | Dos elementos nuevos: la cifra "seis" y el registro de pacientes. Sensores se recuerda de la lección 3. Las otras cuatro partes nunca se nombran |
| 28 | 4:18 | Los sensores quedan fuera del sistema: quien encargó el proyecto lo aclaró, y el hardware no es parte de lo que se diseña | 4 | 2 | — | Tres elementos nuevos: "fuera del sistema" como decisión, la aclaración del cliente y el hardware. Continúa la idea 27 |
| 29 | 4:28 | El registro de pacientes queda dentro del sistema, como subdominio de apoyo: una parte necesaria a la que no se le presta foco | 3 | 2 | — | Un término nuevo (subdominio de apoyo), con glosa, y un contraste ("en cambio") con la idea 28 |
| 30 | 4:38 | Dejar algo fuera también es un corte, con su razón escrita | 2 | 2 | — | Repite la idea 21 (no partir se decide con una razón escrita, igual que un corte) |
| 31 | 4:43 | (estilo) Con las partes cortadas falta elegir el estilo, la forma general del sistema; de vuelta en Sysops Squad, el equipo propone uno: service-based | 2 | 3 | — | Un nombre nuevo (service-based). "Estilo" se recuerda de la lección 2. Vuelta al caso, anunciada con "de vuelta" |
| 32 | 4:54 | Service-based es un punto intermedio entre el monolito y los microservicios: pocos servicios grandes, más piezas que un monolito y menos que los microservicios | 3 | 2 | — | Un concepto nuevo (pocos servicios grandes, punto intermedio) combinado con monolito y microservicios de la lección 2 |
| 33 | 5:06 | Sus razones son cualidades, como las de la lección 2: buena tolerancia a fallos y escalabilidad | 3 | 3 | — | "Tolerancia a fallos" es un término nuevo que se usa sin presentarlo. Escalabilidad y cualidades se recuerdan de las lecciones 2 y 3 |
| 34 | 5:13 | Dice también que da agilidad, que es la evolutividad de la lección 2, o sea, facilidad de cambiar | 3 | 2 | — | Dos elementos: agilidad (nuevo) y su equivalencia con evolutividad, que es una glosa nuestra y no un dato de la fuente |
| 35 | 5:19 | Por eso el estilo viene después: se elige con las cualidades, cuando las partes ya están cortadas | 3 | 2 | — | Un paso nuevo (el estilo se elige después de los cortes) combinado con cualidades y cortes |
| 36 | 5:26 | (cierre) Volvamos al corte del principio: aislar la facturación simplifica mucho la auditoría, según el equipo, pero otras partes necesitan sus datos | 3 | 3 | — | Un paso nuevo (otras partes necesitan datos) combinado con facturación y auditoría. Vuelta al corte inicial, anunciada |
| 37 | 5:35 | Por ejemplo, los clientes cargan su tarjeta, que llega por mensajes y no como solicitudes; el aislamiento se mantiene | 1 | 1 | — | Repite las ideas 15 y 17 |
| 38 | 5:44 | La tarjeta cruza ahora una frontera: el documento anota más complejidad y la tarea de asegurar que la tarjeta viaje protegida entre las partes | 2 | 2 | — | Un elemento nuevo: el viaje protegido de la tarjeta. La complejidad viene del ADR-4 y se dice sin término nuevo |
| 39 | 5:55 | Al principio esa frontera parecía una decisión de seguridad y nada más; vista entera, es una frontera puesta donde una parte necesita algo distinto. Tiene un costo, que se acepta por escrito | 1 | 2 | — | Síntesis de lo dicho (frontera, necesidades, costo por escrito). Ningún elemento nuevo |

## 1. Lo que muestran los puntajes

- **Carga 4 o más con fricción 3 o más:** ninguna. Las ideas con carga 4 o más son la 5, la 8, la 11, la 21 y la 28, y todas tienen fricción 2.
- **Fricción 3 o más con carga 3 o más:** ideas 6, 15, 23, 33 y 36.
- **Pares seguidos con carga 4 o más:** ninguno. Los picos sueltos son la 5 (vecinas 4 y 6, carga 3), la 8 (vecinas 7 y 9, carga 3), la 11 (vecinas 10 y 12, carga 3 y 2), la 21 (vecinas 20 y 22, carga 3 y 2) y la 28 (vecinas 27 y 29, carga 3 y 3).
- **Pares de casos nuevos a menos de dos minutos:** ninguno. Sysops Squad entra en 0:01 y MonitorMe en 3:49, a 3:48 de distancia.

Hallazgos:

1. **Pico de carga en la enumeración de las cuatro áreas (idea 8, 1:09).** Cuatro áreas con su necesidad cada una, en una sola idea de unos 40 segundos: carga 5. Las áreas vuelven a aparecer en las ideas 14 y 20, así que el espectador tiene que sostenerlas sin haberlas visto organizadas.

2. **El bloque de quanta es el más denso (ideas 9 a 14, 1:50 a 2:29).** Cinco de sus seis ideas tienen carga 3 o más. La definición (idea 11 y luego 12) llega después de haber construido el concepto de "atadas", lo que está bien en orden, pero en ese tramo el espectador suma criterio nuevo, llamada con espera, consecuencia de caída, término quantum, regla por área y ejemplo del ticket en menos de un minuto.

3. **Excursus de MonitorMe con cambios de hilo seguidos (ideas 22 a 31, 3:36 a 4:43).** Entre la idea 22 y la 31 hay cuatro anuncios de cambio de tema o de caso (22, 23, 24 y 31), y las ideas 24 a 30 ocupan 54 segundos: siete ideas, unos 7,7 segundos cada una, contra un promedio de 9,4 en toda la lección. Es el tramo con más ideas por minuto. Además, la idea 30 repite la 21.

4. **Bloque de estilo con cuatro ideas seguidas de carga 3 (ideas 32 a 35, 4:54 a 5:19).** En ese tramo aparece "tolerancia a fallos" sin presentarla (idea 33, fricción 3), y la idea 34 presenta como dato lo que es una equivalencia nuestra: agilidad igual a evolutividad. El cierre del estilo tiene cuatro conceptos nuevos o recordados en menos de 30 segundos.

5. **Elementos que aparecen una vez y no vuelven.** La cifra "seis partes" (idea 27) no se enumera y las otras cuatro partes nunca aparecen. "Subdominio de apoyo" (idea 29) y "agilidad" (idea 34) tampoco se usan después. La idea 24 es un caso nuevo para esta lección con carga 1, porque su descripción es casi igual a la de las lecciones 2 y 3: ahí el costo de la lección está en el cambio de caso, no en el dato.

## 2. Errores de hecho y contradicciones

1. **Cifras y citas de Team 7: ninguno.** Verifiqué contra `Team-7-src` las frases de las ideas 3 a 5, 8, 16 a 17, 19 y 21 y ninguna cambia el sentido:
   - ADR-1 l. 15: "This part of the system may need to pass PCI certification" y "This is an isolated security zone with no incoming requests from the other domains"; "may have legal implications".
   - ADR-1 l. 18: "good fault-tolerance, scalability, and agility possibilities".
   - ADR-4 l. 8: "the system may need to pass a Payment Card Industry (PCI) audit. The bigger part of the system deals with credit card data, the more onerous the procedure is".
   - ADR-5 l. 22: "Doing this synchronously ... will nullify our efforts on scalability and availability for the customer quantum".
   - ADR-9 l. 13: "this is not critical to the business operations"; l. 17: "will require to duplicate implementation".
   - README l. 164: "The company stores customer credit card information locally".

2. **Discrepancia de fuente sobre el registro de pacientes (idea 29).** Es ambigüedad de la fuente, no error de la lección, pero la lección la presenta como firme.
   - `BluzBrothers-src/ADR/ADR-005-patient-registration-out-of-scope.md` l. 1 dice "Patient Registration Out of Scope", y l. 15 dice "It will be a part of the system, but we won't be focusing on it".
   - `BluzBrothers-src/EventStorming/EventStorming.md` l. 126 dice "Within the scope of this solution, the following contexts have been established: Recorder, Analyzer, Monitor, and Alert", sin Patient Registration.
   - La lección 4 dice "queda dentro del sistema" sin mencionar que el título del ADR dice lo contrario. La lección 11 sí cita el título "Out of Scope", así que no hay contradicción entre lecciones, pero la lección 4 podría decir la ambigüedad.

3. **Glosa presentada como dato (idea 34).** "Agilidad, que es la evolutividad de la lección 2" es una equivalencia nuestra. ADR-1 l. 18 solo dice "agility possibilities". La tabla de verificación lo marca como glosa; la narración no.

4. **Coherencia con otras lecciones: sin contradicciones.** Sysops Squad coincide con la lección 5 (monolito, tickets), la lección 6 (la tarjeta va por mensajes asíncronos) y la lección 8 (guarda tarjetas). MonitorMe coincide con las lecciones 2 y 3 (estación de enfermería, signos vitales, alerta fuera de rango).

## 3. Qué cambiaría

1. **Dividir la idea 8 en dos.** Primero cliente y técnicos, que piden lo mismo (disponibilidad y respuesta rápida); después facturación y administración, que piden cosas distintas. Así baja de cuatro a dos elementos nuevos por idea. "Buscan el ticket en la casa del cliente" puede salir si no hace falta para la idea 14.

2. **Quitar la cifra "seis" en la idea 27, o nombrar las seis partes.** Con "Dos de las seis partes" el espectador recibe un número sin los otros cuatro nombres. Y en la idea 29, decir que el título del ADR-005 dice "fuera del alcance" pero el cuerpo lo deja dentro.

3. **Quitar la idea 30.** Repite la 21 ("igual que un corte", con razón escrita). Sin ella el excursus de MonitorMe queda en seis ideas, y el regreso a Sysops (idea 31) sigue anunciado con "de vuelta".

4. **Definir "tolerancia a fallos" en una frase (idea 33) y marcar la glosa de agilidad (idea 34).** Por ejemplo: "agilidad, parecida a la evolutividad de la lección 2: facilidad de cambiar". Así la equivalencia no pasa como dato de Team 7.
