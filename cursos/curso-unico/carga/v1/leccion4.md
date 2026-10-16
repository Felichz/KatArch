# Carga cognitiva y fricción · Lección 4 · Dónde se corta un sistema

35 ideas · 4:49 de duración (289,07 s, `video/ch4/timing.js`).

Tiempo = inicio de la línea de voz donde empieza la idea, redondeado hacia abajo. Las cuatro áreas de Sysops se partieron en tres filas (14 a 16) porque la de facturación trae su propia cadena causal (filtración, desastre legal).

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:00 | | | | |
| 1 | 0:01 | Sysops Squad, sistema de tickets de soporte, guarda tarjetas de crédito para cobrar el plan de cada mes | 2 | 1 | Caso y cifra de contexto (plan mensual) sin antecedente; apertura |
| 2 | 0:09 | Eso obliga a pasar una auditoría PCI, la norma de seguridad para quien guarda datos de tarjetas | 3 | 2 | Sigla PCI definida en la misma frase; "obliga" afirma más que la fuente ("may need to pass", hallazgo 2) |
| 3 | 0:14 | Cuanto más del sistema toca tarjetas, más pesada es la auditoría | 2 | 2 | Relación proporcional sin cifra; continúa la 2 |
| 4 | 0:21 | La facturación quedó como zona aislada, a la que las otras partes no pueden llamar directamente | 3 | 2 | "Zona aislada" es término nuevo; "Así que" hace el paso |
| 5 | 0:30 | La razón de seguridad y el costo de auditoría decidieron dónde va la frontera | 2 | 1 | Cierre del gancho; resume 2 a 4 |
| **pregunta** | 0:35 | | | | |
| 6 | 0:35 | Dónde se corta un sistema es de las decisiones que más cuesta cambiar después | 2 | 3 | Cambio de caso a regla general; superlativo sin respaldo |
| 7 | 0:42 | Hay un orden: el negocio propone las partes, lo que necesita cada parte decide el corte, y después se elige el estilo | 3 | 2 | Tres pasos que usan "partes", "necesita" y "estilo" antes de definirlos; "Hay un orden que funciona" conecta |
| **eventos** | 0:50 | | | | |
| 8 | 0:50 | Event storming: se anota todo lo que pasa en el negocio, escrito en pasado y en orden | 3 | 3 | Técnica nueva con nombre en inglés; cambio de tema, del orden a un método |
| 9 | 0:58 | En MonitorMe llega una lectura de sensor, se detecta un problema, se envía una alerta y la enfermera la ve | 3 | 2 | Cadena de cuatro hechos; MonitorMe es de la lección 1, pero aquí no tiene ancla |
| 10 | 1:07 | Los hechos se agrupan por proceso, y cada grupo es una zona donde cada palabra tiene un solo significado | 3 | 2 | "Zona" en sentido técnico sin nombre (contexto acotado); abstracción nueva en una frase |
| 11 | 1:15 | En MonitorMe, el registro de pacientes y los sensores quedaron fuera del sistema | 3 | 2 | Dos elementos en una frase; el registro no quedó fuera (hallazgo 1, ADR-005) |
| 12 | 1:25 | Sacar algo del alcance también es un corte, y de los que más trabajo ahorran | 2 | 2 | Superlativo sin dato; "también" enlaza con la 11 |
| **necesidades** | 1:30 | | | | |
| 13 | 1:30 | El negocio da los candidatos, pero en casi todos los repositorios la razón escrita de cada corte es lo que la parte necesita | 2 | 2 | Cambio de criterio; "casi todos los repositorios" sin cifra ni cita en la tabla de verificación |
| 14 | 1:39 | Sysops tiene cuatro áreas; clientes necesita disponibilidad y velocidad, y operación necesita que el técnico, en la casa del cliente, encuentre el ticket y la base de conocimiento | 3 | 2 | Vuelta al caso con puente ("lo muestra"); "base de conocimiento" sin definir; dos necesidades en una frase |
| 15 | 1:59 | Facturación necesita seguridad: una filtración de tarjetas sería un desastre, con consecuencias legales | 2 | 1 | Continuación del enumerado; la fuente dice "may have legal implications" (hallazgo 2) |
| 16 | 2:07 | Administración, con reportes y gestión de usuarios, tolera demoras | 2 | 1 | Cuarta área; continuación natural |
| 17 | 2:15 | Cada frontera queda puesta donde cambia la necesidad | 2 | 1 | Cierre de la sección |
| **nopartir** | 2:18 | | | | |
| 18 | 2:19 | Archangels usaron una tabla con cinco criterios por funcionalidad: cuánto cambia, cuánto escala, cuánto tolera una falla, qué tan sensibles son sus datos y de qué depende | **4** | **4** | Equipo nuevo en medio de la argumentación, sin decir qué sistema es (Farmacy Family, ver hallazgo 5); cinco criterios en una lista |
| 19 | 2:32 | Con esa tabla separaron, en casi todos los dominios, la parte de administración de la de los clientes | 2 | 2 | Paso lógico ("Con esa tabla"); "casi todos" sin cifra; ADR-011, 013, 014 y 017 lo confirman |
| 20 | 2:39 | En uno decidieron lo contrario: la autenticación y la autorización quedaron juntas | 2 | 2 | Contraste anunciado; ADR-012 |
| 21 | 2:46 | El sistema necesita las dos y no puede operar si una se cae, así que separarlas solo agrega costo | 3 | 1 | Cadena causal corta; continúa la 20 |
| 22 | 2:51 | No partir también es una decisión, y se escribe con la misma razón que un corte | 2 | 1 | Generalización de la 21; cierre de la sección |
| **quanta** | 2:56 | | | | |
| 23 | 2:56 | Hay un criterio más: cómo se llaman las partes; si un servicio espera la respuesta de otro, los dos dependen el uno del otro | 3 | 3 | Criterio nuevo anunciado; "esperar" y "dependen" en sentido técnico, glosados |
| 24 | 3:07 | Si uno se cae, el otro tampoco puede responder; Spotlight agrupó esos servicios en una unidad que llama quantum | **4** | 2 | Caso de la lección 3 sin recordar; "quantum" sin definir; "llama" se oye como "llaman" de la frase anterior |
| 25 | 3:16 | Las partes sin esa dependencia, como los reportes, apuntan a tres nueves de disponibilidad | 3 | 2 | Cifra (tres nueves, definidos en la lección 3); continúa la 24 con "Eso le permitió" |
| 26 | 3:25 | Las que sí la tienen, como las notificaciones, a cuatro; un solo número para todo el sistema habría obligado a pagar cuatro nueves en todas partes | **4** | 1 | Dos cifras y un contrafactual que es inferencia de la lección, no de la fuente (hallazgo 2) |
| **estilo** | 3:34 | | | | |
| 27 | 3:35 | Con las partes definidas, queda elegir el estilo, y se razona con el estado del negocio, no con una tabla de puntajes | 3 | 3 | Cambio de tema anunciado; "estilo" se define aquí, por primera vez en el capítulo |
| 28 | 3:47 | Farmacy Food eligió un monolito modular: una sola aplicación dividida por dentro en módulos con fronteras claras | 3 | 3 | Caso de la lección 1 que vuelve sin su problema; "monolito modular" definido en la frase |
| 29 | 3:54 | Los microservicios piden un dominio estable y conocido, el de sus pedidos todavía no lo era, y deberían crecer cuando haga falta | 3 | 2 | "Dominio" sin definir; "todavía no lo era" es lectura de la fuente, que dice "not applicable" |
| 30 | 4:06 | El costo está escrito: hace falta disciplina para que los módulos no se mezclen | 2 | 1 | Continuación; "big ball of mud" no se nombra |
| 31 | 4:11 | Quedó anotada la condición para separar un módulo: que las métricas muestren más presión que los demás | 2 | 2 | Regla que es el tema de la lección 9 (hallazgo 4) |
| **cierre** | 4:17 | | | | |
| 32 | 4:18 | La facturación de Sysops quedó aislada y la auditoría se achicó, pero el corte trajo una pregunta | 2 | 3 | Vuelta al gancho después de la sección de estilo, sin conector, solo con el nombre del caso |
| 33 | 4:25 | Si la tarjeta ya no está en la parte del cliente, ¿cómo la ve el cliente para editarla? | 2 | 2 | Pregunta que nace de la historia; continuación |
| 34 | 4:30 | El equipo la respondió por escrito: basta con ver los últimos cuatro dígitos | 2 | 2 | La respuesta ya está en la lección 8 (hallazgo 3) |
| 35 | 4:36 | Cada corte reparte también los datos: quién guarda cada dato, quién puede cambiarlo, y qué pasa cuando dos partes necesitan el mismo | 3 | 2 | Tres preguntas en una frase; puente hacia la lección 5 |

## Lo que muestran los puntajes

1. **El registro de pacientes no quedó fuera del sistema (ideas 11 y 12).** El ADR-005 de BluzBrothers se titula "Patient Registration Out of Scope", pero su decisión dice "It will be a part of the system, but we won't be focusing on it". La lección 11 sigue el cuerpo ("es parte del sistema pero no es el foco"). La lección 4 dice lo contrario, y su tabla de verificación cita ese mismo ADR para "fuera". Solo los sensores quedaron fuera: ADR-006 dice que el sistema "does not handle the sensor context". El título del ADR se contradice con su cuerpo, así que la cita tiene que decirlo.

2. **Afirmaciones más firmes que la fuente (ideas 2, 6, 12, 13, 15 y 26).** "Eso obliga a pasar" (2): el ADR-4 de Team 7 dice "may need to pass a PCI audit". "Consecuencias legales" (15): el ADR-1 dice "may have legal implications", y la lección quita el "may". "Habría obligado a pagar cuatro nueves en todas partes" (26) es inferencia de la lección: Pegasuz solo dice que cuatro nueves serían "an overkill" para Spotlight. "En casi todos los repositorios" (13) no tiene cita. Los superlativos de las ideas 6 y 12 no tienen dato que los respalde.

3. **La respuesta sobre la tarjeta se cuenta dos veces (ideas 33 y 34, y lección 8).** La lección 4 cierra con "le alcanza con ver los últimos cuatro dígitos", y la lección 8 (línea 15) dice casi lo mismo del mismo caso, con la misma cita del ADR-4 (l. 19-20). Así el cierre de la 4 entrega la respuesta que la 8 necesita para su propio argumento.

4. **La sección de estilo repite la lección 9 (ideas 27 a 31).** La lección 9 (línea 39) dice que "Farmacy Food eligió el monolito modular para ahora, y separar un módulo cuando las métricas lo pidan", y ahí desarrolla la regla de empezar simple y escribir la condición para cambiar. Son unos 42 segundos con el mismo caso y la misma condición. Solo la idea 27 (el estilo va después de las partes) es propia de la lección 4. Hay además un cambio de caso sin ancla (Farmacy Food, fricción 3) y la regla de métricas (idea 31) queda sin desarrollar aquí.

5. **Dos nombres entran sin ancla (ideas 18 y 24, cargas de 4).** "Archangels" aparece sin decir qué sistema es. La documentación del equipo (1.ProblemBackground) y la lección 8 lo ubican en Farmacy Family; la lección 2 lo llama "clientes de Farmacy Food", y ahí no se aclara. "Quantum" aparece en la frase "que llama quantum", y en la voz "llama" se confunde con el "se llaman así" de la frase anterior. En la idea 24 hay además un caso de la lección 3 que no se recuerda.

## Qué cambiaría, en orden de impacto

1. **Corregir la idea 11 y citar el cuerpo del ADR-005 (lección 4).** Hoy la lección dice algo que la 11 contradice y que la fuente solo sostiene en el título. Propuesta: "En MonitorMe, el registro de pacientes sigue dentro del sistema, como un subdominio de apoyo al que no se le presta foco; los sensores quedaron fuera." La idea 12 se mantiene con el ejemplo de los sensores, y se quita el superlativo "de los que más trabajo ahorran".

2. **Mover la sección de estilo (ideas 27 a 31) a la lección 9, "Comprar, construir y cuándo cambiar".** Ahí ya están el monolito de Farmacy Food y la condición por métricas. En la lección 4 queda la idea 27 en una frase ("el estilo se elige después de las partes, con el estado del negocio"). Quita unos 42 segundos, dos picos de fricción 3 y la repetición. Ojo: DISENO-CURSO pone el razonamiento del estilo en la lección 4; el cambio necesita el visto bueno de Felix.

3. **Dejar el cierre en la pregunta y mover la respuesta a la lección 8 (ideas 33 y 34).** La lección 8 ya la tiene, con su cita. La 4 termina con "¿cómo la ve el cliente para editarla?", y la respuesta queda como gancho del capítulo 8. Quita 6 segundos y el spoiler.

4. **Presentar "The Archangels" y "quantum" antes de usarlos (ideas 18 y 24), y alinear el nombre de la cuarta área.** En la idea 18: "The Archangels, el equipo de Farmacy Family". En la 24: "a ese grupo lo llamó quantum" en vez de "que llama quantum", con una definición de una frase. En la lección 5 (línea 21) cambiar "de reportes" por "de administración", porque así lo dice el ADR-1 de Team 7 (l. 16) y así lo dice la lección 4. La mezcla de Farmacy Food y Farmacy Family en la lección 2 queda como hallazgo para esa lección.
