# Carga cognitiva y fricción · Lección 6 · Cómo se hablan las partes

37 ideas · 5:56 de duración (355,6 s, `video/ch6/timing.js`).

Tiempo = inicio de la línea de voz donde empieza la idea, redondeado hacia abajo.

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:01 | | | | |
| 1 | 0:01 | Sysops Squad separó la parte de clientes y quedaron cinco conversaciones pendientes: contratos, tarjeta, tickets, encuestas y facturas | 3 | 1 | Sysops ya está en la lección 1. La lista de cinco conversaciones llega en una frase, sin nombre propio para cada una. Es la apertura: no hay salto previo. |
| 2 | 0:15 | El equipo decidió cada conversación por separado y no todas recibieron la misma respuesta | 2 | 2 | Paso lógico desde la lista. Sin cifras ni nombres nuevos. |
| 3 | 0:21 | La frase del equipo sobre la tarjeta: hacerlo de forma síncrona "anularía todo el esfuerzo que habían hecho" | 3 | 3 | "Síncrona" aparece por primera vez aquí y no se define hasta la idea 6 (0:56). Solo tiene una glosa de paso ("una llamada que espera respuesta"). La tarjeta no vuelve a aparecer en la lista de respuestas (ideas 9 a 12). |
| 4 | 0:32 | El esfuerzo era que la parte de clientes fuera escalable y estuviera siempre disponible | 2 | 2 | Retoma "el esfuerzo" de la idea 3. Dos atributos de calidad, sin cifras. |
| **pregunta** | 0:37 | | | | |
| 5 | 0:37 | Cada conexión entre partes es una decisión, y la ordenan tres preguntas: la de cada flecha, la de los sistemas externos y quién inicia la conversación | 3 | 2 | Es el mapa de la lección. "Flecha" se usa como término sin presentar. Paso de caso a tesis, con conector. |
| **flecha** | 0:56 | | | | |
| 6 | 0:56 | Síncrona: quien llama espera la respuesta antes de seguir, como en una llamada telefónica | 2 | 2 | Definición con analogía. Es el primer término definido, 35 s después de su primer uso (idea 3). |
| 7 | 1:05 | Asíncrona: quien llama deja el mensaje en una cola y sigue con lo suyo, como quien deja un mensaje de voz | 2 | 1 | Contraparte de la idea 6, con la misma estructura. |
| 8 | 1:11 | La pregunta que decide es si quien llama necesita la respuesta para poder seguir | 3 | 2 | Regla central de la lección, en una frase abstracta. Paso lógico ("la pregunta que decide"). |
| 9 | 1:17 | Un contrato nuevo no necesita reacción inmediata, así que se copia de una base a otra cada tanto | 2 | 2 | Aplica la regla al caso, con puente explícito ("la respondió flecha por flecha"). Supone bases separadas, que es la arquitectura final de Team 7 y no la de transición (ver anexo). |
| 10 | 1:26 | El ticket nuevo se manda y se olvida, porque el cliente no tiene por qué esperar a que alguien lo tome | 2 | 1 | Siguiente ejemplo de la misma respuesta de Sysops. |
| 11 | 1:32 | Las facturas van por una cola que las guarda en disco, para que no se pierda ninguna si el sistema de notificaciones está en mantenimiento | 3 | 1 | "Cola persistente" y "sistema de notificaciones" aparecen sin presentación. La respuesta de la tarjeta no se menciona en esta lista (hallazgo 5). |
| 12 | 1:40 | Las llamadas que entran desde la pantalla siguen siendo síncronas: si el cliente cambia su perfil y recarga la página, el cambio tiene que verse enseguida | 2 | 2 | Excepción con "Y"; el ejemplo del perfil justifica la regla. Cita ADR-12, que está en "Proposed" (anexo). |
| **reserva** | 1:50 | | | | |
| 13 | 1:50 | La misma pregunta separa las flechas dentro de un flujo: MobilityCorp, al reservar un auto, pide primero al servicio de pagos una autorización previa y espera | 3 | 3 | Cambio de caso (Sysops a MobilityCorp), con puente explícito ("la misma pregunta"). "Autorización previa" no se define en la frase. |
| 14 | 2:01 | Se hace así para fallar rápido: si el pago no se autoriza, no tiene sentido seguir | 2 | 2 | Razón con conector "para". |
| 15 | 2:11 | Guardan la reserva y publican un evento; la disponibilidad del vehículo se actualiza después, porque ese camino no es crítico | 3 | 2 | "Evento" viene de la lección 5. "Crítico" se usa como juicio y la frase siguiente lo justifica ("puede ponerse al día"). Paso lógico ("con la autorización en la mano"). |
| **externos** | 2:30 | | | | |
| 16 | 2:30 | Del otro lado no hay una parte propia sino sistemas de otros: ClearView manda los currículums que un empleador desbloquea al sistema de recursos humanos de ese empleador | 3 | 3 | Cambio de caso a ClearView, con puente ("el caso se complica"). ClearView se presentó en la lección 1; lo nuevo es la integración con sistemas de RR. HH. ajenos. |
| 17 | 2:42 | El equipo supuso unos cien sistemas distintos y hasta doscientas mil configuraciones | **4** | 2 | Dos cifras en una frase, con dos unidades que se mezclan ("sistemas" y "configuraciones"). Son supuestos de Pragmatic (A29 y A31), no datos medidos, y no se dice de dónde sale la segunda (hallazgo 2). |
| 18 | 2:49 | Cada uno con su propia API, y con caídas que van a ocurrir con regularidad | 2 | 1 | Continuación directa de la cifra. La fuente dice "failures are expected to occur regularly". |
| 19 | 2:55 | Toda comunicación con sistemas externos es asíncrona, porque un sistema caído no puede bloquear los procesos propios | 2 | 2 | Conclusión con "las decisiones salen encadenadas". Reutiliza "asíncrona" de la idea 7. |
| 20 | 3:05 | Un servicio aparte se encarga solo de transmitir | 2 | 1 | Componente sin nombre; "transmitir" no dice qué se transmite. Continuación. |
| 21 | 3:08 | Cada sistema externo tiene su adaptador, una pieza que traduce entre su formato y el de ClearView | 3 | 2 | "Adaptador" se define en la misma frase. Concepto nuevo, pero con definición. |
| **supuesto** | 3:19 | | | | |
| 22 | 3:19 | Road Warrior tiene un problema parecido, con aerolíneas, hoteles y empresas de alquiler de autos, pero su diseño no tiene un adaptador por empresa | 3 | 3 | Cambio de caso a Road Warrior, presentado en la lección 3, con puente ("problema parecido"). |
| 23 | 3:29 | La razón es un supuesto escrito: que todas las agencias ofrecen la misma interfaz y solo cambian los puntos de acceso | 3 | 2 | "Supuesto escrito" es la tesis de la sección. "Agencias" cubre aerolíneas, hoteles y autos; "puntos de acceso" es jerga de endpoint. |
| 24 | 3:37 | Los dos equipos parten de supuestos opuestos: ClearView supone que cada sistema habla distinto, y Road Warrior supone que todos hablan igual | 2 | 2 | Comparación explícita; "los dos" conecta con las ideas 16 a 23. |
| 25 | 3:46 | Ninguno de los dos midió cuál es cierto en su mercado | 2 | 1 | Afirmación negativa sin cita. Ambos lo marcan como supuesto, pero el enunciado de la kata ya trae el de Road Warrior (anexo). |
| 26 | 3:50 | Poner adaptadores o no depende por completo de ese supuesto, y por eso conviene escribirlo | 2 | 2 | "Depende por completo" es una tesis fuerte sin fuente. "Por eso" conecta con la regla de escribir supuestos. |
| **iniciar** | 3:56 | | | | |
| 27 | 3:56 | Hay una tercera decisión, además de síncrono o asíncrono: quién empieza a hablar | 2 | 2 | Anunciada en la idea 5. Pasa a la tercera pregunta sin salto de tema; el caso llega en la idea siguiente. |
| 28 | 4:02 | Wildlife Watcher usa cámaras en la naturaleza, con batería y sin internet estable, y había que poder cambiar la configuración de una cámara desde la plataforma | **4** | 3 | Caso nuevo (invitado, sin presentar antes) con tres restricciones y un requisito en una sola frase. Llega sin puente tras "quién empieza a hablar" (hallazgo 1). |
| 29 | 4:12 | Una opción: la cámara tiene una API siempre encendida y la plataforma le manda los cambios; gasta batería escuchando, y sin internet el cambio se pierde | 3 | 2 | "Se pierde" es más fuerte que la fuente, que dice que la configuración "can be not applied" (anexo). Par de opciones con "una opción era". |
| 30 | 4:23 | La otra: la cámara pregunta en cada ciclo si hay cambios; ganó, con el costo de que no hay configuración en tiempo real | 3 | 2 | "Ganó la segunda" y su costo en la misma frase. "Ciclo" no se define, pero se entiende. |
| 31 | 4:34 | Cuando el otro lado es poco fiable, que sea él quien pregunte evita depender de que esté disponible en el momento justo | 3 | 2 | Generalización desde el caso a una regla. "Poco fiable" y "momento justo" son abstractos. |
| **precio** | 4:42 | | | | |
| 32 | 4:42 | Lo asíncrono tiene costo: en Sysops la cola de mensajes puede convertirse en un punto único de falla, y hay que repartir su carga | 3 | 3 | "Punto único de falla" es jerga sin definir. Cambio de tema sin anuncio: después de "quién empieza a hablar" vuelve al costo de lo asíncrono, que no es una de las tres decisiones de la idea 5. |
| 33 | 4:52 | Los tickets se vuelven más difíciles de probar y depurar, y aceptan esos trade-offs porque las cualidades son críticas para el negocio | 2 | 1 | Continuación del costo de la idea 32. La frase final es de ADR-2 ("Since aforementioned qualities are critical to the business…"). "Trade-off" se define en la lección 1. |
| 34 | 5:05 | ClearView anota otro costo: cuando las llamadas largas pasan a una cola, la pantalla tiene que mostrar un fallo que llega tarde | 3 | 3 | Vuelta a ClearView con puente ("otro costo"). El "fallo que llega tarde" resume ADR-008 de Pragmatic. |
| 35 | 5:16 | Aparecen más casos de prueba, con mensajes en distinto orden, y alguien tiene que decidir cómo se entera el usuario de un error | 3 | 1 | Continuación de ClearView. Dos costos en una idea. |
| **cierre** | 5:27 | | | | |
| 36 | 5:27 | Las conversaciones de Sysops Squad no terminaron con una respuesta: una copia periódica, un mensaje que se manda y se olvida, una cola que guarda en disco y una llamada que espera | 3 | 3 | Vuelta al caso del inicio, con puente explícito. Recuerda cuatro mecanismos ya explicados en las ideas 9 a 12, sin volver a nombrar cada uno. |
| 37 | 5:45 | Cada garantía es distinta: la diferencia no se nota mientras todo funciona, sino cuando algo falla, cuando un mensaje llega dos veces o no llega | 2 | 2 | "Llega dos veces" aparece por primera vez en la lección, sin anticipo. Lo trata la lección 7. |

## Lo que muestran los puntajes

1. **Carga alta y caso nuevo juntos (ideas 27 y 28).** La idea 28 es la única con carga 4 que además introduce un caso nuevo: Wildlife Watcher llega en una frase con tres restricciones y un requisito, justo después de "quién empieza a hablar". Es el punto de la lección donde más se acumula a la vez.
2. **Dos cifras y dos unidades en la misma frase (idea 17, carga 4).** "Cien sistemas" y "doscientas mil configuraciones" se dicen juntas, y el lector no sabe si son lo mismo. La fuente las separa: A29 habla de unos cien tipos de sistema de RR. HH., y A31 de hasta 200.000 sistemas a configurar, que sale de suponer cien mil empleadores con dos sistemas cada uno (A30 y A31).
3. **Términos usados antes de definirse (ideas 3, 5, 6, 32 y 37).** "Síncrona" aparece en la idea 3 (0:21) y se define en la idea 6 (0:56); "flecha" ya se usa en la idea 5 sin presentar. "Punto único de falla" (idea 32) y "llega dos veces" (idea 37) tampoco se definen. Son fricciones de término, no de caso.
4. **Seis cambios de caso con puente, ninguno con fricción 4 (ideas 13, 16, 22, 28, 34 y 36).** La secuencia es Sysops, MobilityCorp, ClearView, Road Warrior, Wildlife Watcher, ClearView, Sysops. Entre las ideas 16 y 34 se alternan tres casos en 19 ideas. Cada cambio tiene su puente, por eso queda en 3 y no pasa de ahí.
5. **La tarjeta del gancho queda sin respuesta (ideas 3 y 9 a 12).** La lección abre con la tarjeta y dice que pasarla de forma síncrona "anularía" el esfuerzo, pero la lista de respuestas de Sysops (ideas 9 a 12) la omite. La fuente da la respuesta (mensajería asíncrona, ADR-5 l. 22), y el lector no la ve. Es un hueco de estructura, no un problema de puntaje.
6. **Fricción baja en general, picos estructurales.** 29 de 37 ideas tienen fricción 1 o 2 (9 con 1 y 20 con 2). Las ocho ideas con fricción 3 son los seis cambios de caso, el cuarto tema de la idea 32 y el término de la idea 3. Ninguna llega a 4.

## Qué cambiaría, en orden de impacto

1. **Mover "Depende de un supuesto" (ideas 22 a 26) a la lección 3.** La lección 3 ya tiene la idea que esa sección necesita: "una cuenta con los supuestos a la vista dice qué supuesto decide el resultado" (DISENO-CURSO.md, etapas 2 a 4). Road Warrior ya está presentado allí (lección 3, línea 27), así que se quita un cambio de caso con fricción 3. En la lección 6 queda una frase en "externos" (por ejemplo, "si hacen falta adaptadores depende del supuesto de cada equipo"), o nada. Quitar la sección saca unos 37 s: de 5:56 a unos 5:19.
2. **Reordenar "precio".** Las ideas 32 y 33 (costo de lo asíncrono) pasan a continuación de la idea 12, que cierra la sección de flechas. Las ideas 34 y 35 (ClearView) pasan a continuación de la idea 21, dentro de la sección de ClearView. Así desaparece el cuarto tema sin anuncio (idea 32 baja de fricción 3 a 2) y cada caso vuelve a su sección. Cambio solo dentro de la lección 6.
3. **Cerrar la tarjeta y no adelantar "síncrona".** En la idea 11, agregar la tarjeta a la lista de respuestas: va por mensajería asíncrona, porque una llamada que espera anularía la escalabilidad y disponibilidad de la parte de clientes (ADR-5 l. 22). En la idea 3, decir "con una llamada que espera respuesta" sin la palabra "síncrona", que entra en la idea 6. Cambio dentro de la lección 6; cierra el hueco del hallazgo 5 y baja la fricción de la idea 3 a 2.
4. **Presentar a Wildlife Watcher antes de sus restricciones, y partir la cifra de la idea 17.** En la idea 28, primero el caso ("Wildlife Watcher, un sistema de cámaras en la naturaleza, es el ejemplo") y en la frase siguiente la batería y la conexión. En la idea 17, una cifra por frase, y el origen de la segunda (cien mil empleadores por dos sistemas, según Pragmatic). Ambas bajan de carga 4 a 3. Cambio dentro de la lección 6.

Nota sobre la duración: la lección dura 5:56, y DISENO-CURSO.md estima 11 a 16 minutos por lección. Con el cambio 1 queda en unos 5:19. No es un error de guion, pero conviene decidir si el tema pide más desarrollo.

## Anexo: fuentes y contradicciones

**Coinciden con la fuente (citas verificadas)**
- Team 7 ADR-5 l. 20-28: contratos por replicación de tabla, tarjeta por mensajería asíncrona (l. 22: "Doing this synchronously … will nullify our efforts on scalability and availability"), ticket "fire and forget" (l. 24), facturas por cola persistente (l. 28).
- Team 7 ADR-12 l. 17: "if a customer changes something in the profile and refreshes the page, the change should be immediately reflected".
- Five Nines `hld/core-func/car-van-rental/4_Sequence_Diagram.md` l. 42-65: CreatePreAuth antes del INSERT, "fail-fast on payment issues" (l. 64), "eventual consistency acceptable for non-critical path" (l. 65).
- Pragmatic `Requirements/requirements-and-assumptions.md` A29 (variedad de unos 100 sistemas de RR. HH.) y A31 (hasta 200.000 sistemas a configurar); ADR-023 l. 16 ("failures are expected to occur regularly"); `C4/C3-components-hr-integration.md` l. 12-13 ("For each HR system … a dedicated adapter"). El adaptador por sistema viene del C3; ADR-023 solo lo nombra en el título.
- Data Alchemists `README.md` l. 138: "All agency APIs … provide a standardized integration interface". Dato extra: `adrs/adr-5-trackers.md` desacopla los trackers con mensajería asíncrona, así que Road Warrior tampoco es síncrono. La lección no lo dice; no es un error.
- CELUS `3.ARDs/003.CameraUpdateStrategy.md`: la opción elegida es la de consulta ("The camera checks for updates regularly") y su costo, "There is no real-time configuration".
- Team 7 ADR-2 l. 26-29 y Pragmatic ADR-008 l. 20-27: coinciden con lo que dice la lección.

**Fidelidad (ajustes dentro de la lección 6)**
- Estado de las decisiones: Team 7 ADR-2, ADR-5 y ADR-12 están en "Proposed" (l. 4-5 de cada uno). La lección dice "su decisión" y "decidieron". La lección 11 enseña que el estado importa; aquí conviene "propusieron".
- CELUS 003 l. 48-50: la fuente dice "the configuration can be not applied" y, como mitigación de esa misma opción, "Platform can delay config until the camera is online". "El cambio se pierde" exagera.
- Road Warrior: el supuesto de "una interfaz estándar" ya viene en el enunciado de la kata, `requirements/original_requirements.md` l. 42 ("All of these have a standard API, so you don't have to worry about those details"). El README l. 138 lo repite como supuesto del equipo. "Ninguno de los dos midió" es correcto, pero el origen del supuesto de Road Warrior es el brief. Si la sección pasa a la lección 3, conviene citar ambos.
- "Depende por completo de ese supuesto" (idea 26): sin fuente. Es lectura de la lección; suavizar o marcar como interpretación.
- Bases separadas (idea 9): la separación es la arquitectura final. La transición de Team 7 usa "a monolithic database until it becomes a bottleneck" (README l. 287-290). La lección 9 (l. 39) lo dice bien; la lección 6 debería decir "en la arquitectura final".

**Contradicciones con otras lecciones**
- Lección 5, línea 39: "una reserva con su pago autorizado, se guarda en una sola transacción". La fuente (Five Nines 4_Sequence_Diagram l. 42-49) hace el CreatePreAuth en el servicio de Payment antes del BEGIN TRANSACTION; la transacción guarda solo el preAuthToken. La lección 6 (ideas 13 a 15) lo cuenta bien. Corregir la 5: "una reserva con el token de su pre-autorización".
- Lección 8, línea 17: "el dato pasa enseguida a la facturación". No contradice a la 6 (ADR-5 usa mensajería asíncrona para la tarjeta), pero la 6 nunca lo dice explícitamente: ver cambio 3.
- Lección 9, línea 39: "Sysops Squad se queda con una sola base de datos hasta que se convierta en un cuello de botella". Es compatible con la lección 5 (diseño final con bases separadas) y con Team 7 README l. 289. Solo hay que decir "por ahora" o "en la transición" donde corresponda.
