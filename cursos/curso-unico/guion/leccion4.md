# Dónde se corta un sistema

## Lección 4 {#gancho}

Sysops Squad, el soporte técnico de la empresa de electrónica, guarda en su sistema de tickets las tarjetas de crédito de sus clientes, para cobrarles el plan de cada mes. Por eso puede tener que pasar una auditoría PCI, que es la norma de seguridad para quien guarda datos de tarjetas. Y cuanto más grande sea la parte del sistema que toca esas tarjetas, más pesada es la auditoría.

Así que el equipo propone separar la facturación del resto. Quedaría como una zona aislada, a la que las otras partes del sistema no pueden llamar directamente. Una razón de seguridad, y de costo de auditoría, decide dónde pasa una frontera.

## Dónde van las fronteras {#pregunta}

Dónde se corta un sistema en partes es de las decisiones que más cuesta cambiar después. Y hay un orden que se repite. El negocio propone las partes, lo que cada parte necesita decide dónde va cada corte, y recién después se elige el estilo.

## El negocio propone las partes {#eventos}

Una técnica para encontrar las partes es el event storming. Se anota todo lo que pasa en el negocio, escrito en pasado y en orden. En MonitorMe, por ejemplo: llegó una lectura de un sensor, se detectó un problema, se envió una alerta, la enfermera vio la alerta. Después esos hechos se agrupan por proceso del negocio, y cada grupo es una zona donde cada palabra tiene un solo significado.

El mismo ejercicio sirve para decidir qué queda fuera. MonitorMe dejó fuera los propios sensores, con una decisión escrita. Y al registro de pacientes lo dejó dentro, pero como una parte de apoyo a la que no le presta foco, también por escrito. Sacar algo del alcance, o decidir que no se le dedica esfuerzo, también es un corte.

## Cada parte necesita algo distinto {#necesidades}

El negocio da los candidatos, pero la razón escrita de cada corte suele ser otra: lo que esa parte necesita. Sysops Squad lo muestra con sus cuatro áreas.

La de clientes, donde se abren tickets y se edita el perfil, necesita estar disponible y responder rápido. La de operación necesita que el técnico, ya en la casa del cliente, encuentre el ticket y la base de conocimiento.

La de facturación necesita seguridad, porque una filtración de tarjetas, escriben, podría tener consecuencias legales. Y la de administración, con reportes y gestión de usuarios, tolera demoras, porque no pasa nada grave si un reporte tarda un poco más. Cada frontera queda puesta donde la necesidad cambia.

## Decidir también qué no partir {#nopartir}

Hay otra forma de decidir cada corte, y viene de Farmacy Family, una comunidad de salud que mejora el sistema de Farmacy Food.

Su equipo usó una tabla. Para cada funcionalidad anotó, entre otras cosas, cuánto cambia el código, cuánto tiene que escalar y qué tan sensibles son sus datos. Con esa tabla separaron, en casi todos los dominios, la parte de administración de la parte de los clientes.

Y en uno decidieron lo contrario. La autenticación y la autorización quedaron juntas, en la misma pieza, porque el sistema necesita las dos y no puede operar si una se cae. Separarlas solo agregaría costo. O sea, no partir también es una decisión, y se escribe con la misma razón que un corte.

## Lo que se llama, cae junto {#quanta}

Hay un criterio más, que tiene que ver con cómo se llaman las partes entre sí. Si un servicio tiene que esperar la respuesta de otro para poder seguir, los dos dependen el uno del otro, y si uno se cae, el otro tampoco puede responder.

Spotlight, la plataforma de empleo que pedía entre tres y cuatro nueves, agrupó los servicios que se llaman así en una sola unidad, que llama quantum. Y eso le permitió pedirle a cada unidad lo que necesita. Las que no dependen de otras de ese modo, como los reportes, apuntan a tres nueves de disponibilidad. Las que sí, como las notificaciones, a cuatro. Con un solo número para todo el sistema, y esto es lectura nuestra, habría que pagar cuatro nueves en todas partes.

## El estilo, después del corte {#estilo}

Con las partes definidas, queda elegir cómo se despliegan y se comunican, que es el estilo. Farmacy Food eligió un monolito modular, que es una sola aplicación dividida por dentro en módulos con fronteras claras.

Su razón tiene que ver con el estado del negocio. Los microservicios piden, de preferencia, un modelo del dominio estable y conocido, y el equipo escribe que para su sistema de pedidos eso no aplica. Los microservicios, dicen, deberían crecer a medida que hagan falta. El costo también está escrito: hace falta disciplina para que los módulos no se mezclen. Y quedó anotada la condición para separar un módulo, que las métricas muestren que está bajo más presión que los demás.

## La pregunta que trae cada corte {#cierre}

La facturación de Sysops Squad, aislada, achica la parte del sistema que toca tarjetas. Pero el corte trae enseguida una pregunta. Si la tarjeta ya no está en la parte del cliente, ¿cómo la ve el cliente para editarla? El equipo la responde por escrito: le alcanza con ver los últimos cuatro dígitos.

Un corte que decidió la seguridad dejó a la vista otra decisión, la de qué parte del sistema guarda cada dato y qué ven las demás.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Sysops Squad guarda tarjetas (ASM-4); "the system may need to pass a Payment Card Industry (PCI) audit"; "The bigger part of the system deals with credit card data, the more onerous the procedure is." Estado **Proposed** (se narra "propone") | Team 7: `ADR/ADR-4-extract-billing-quanta.md` l. 4-5, 8 |
| Facturación aislada, "with no incoming requests from the other domains"; filtración "may have legal implications" | Team 7: `ADR/ADR-1-service-based.md` l. 13-16 |
| Event storming de MonitorMe: eventos en pasado, ordenados, agrupados por proceso | BluzBrothers: `EventStorming/EventStorming.md` |
| Sensores fuera (ADR-006 l. 14); registro de pacientes "supporting sub-domain. It will be a part of the system, but we won't be focusing on it" | BluzBrothers: `ADR/ADR-005` l. 15, `ADR-006` l. 14 |
| Cuatro áreas y sus necesidades | Team 7: `ADR/ADR-1-service-based.md` l. 11-16 |
| Farmacy Family (Archangels) mejora el sistema de Farmacy Foods; tabla de granularidad (siete columnas: volatilidad, escalabilidad, tolerancia a fallos, seguridad, transacciones, dependencias, flujo; se nombran tres); cortes admin/cliente; ADR-012 "cannot operate if one goes down, so the overhead of splitting is avoided" | Archangels: `1.ProblemBackground/BusinessGoalsDriversAndRequirements.md` l. 10; `ArchitectureAnalysis.md` (Granularity); `4.ADRs/011-017` |
| Spotlight: quanta por dependencias síncronas; 3 y 4 nueves por quantum; el contrafactual del número único es lectura nuestra | Pegasuz: `quanta/quanta-identification.md` l. 9; `README.md` l. 138-140 |
| Farmacy Food (ADR-002, Accepted): monolito modular "best option for now"; "preferably a stable and known domain model", "For the ordering system it's not applicable"; "Microservices should grow naturally as the need arises."; disciplina o "big ball of mud"; "based on metrics and trends" | ArchColider: `4.ADRs/002 System approach.md`; `2.SolutionBackground/SystemAppoach.md` l. 96-139 |
| "It is enough to display the last 4 digits" | Team 7: `ADR/ADR-4-extract-billing-quanta.md` l. 19-20 |
