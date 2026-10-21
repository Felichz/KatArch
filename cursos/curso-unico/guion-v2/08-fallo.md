# Bloque 8 · Diseñar el fallo

**Enseña:** proteger lo que le importa al negocio cuando algo falla; el silencio también se diseña; un mensaje que llega dos veces; guardar y avisar sin que quede a medias.
**Primer par:** el código PIN de Farmacy Food, que funciona sin red, y los dos canales de alerta de MonitorMe.
**Segundo par:** el mismo sistema en dos fases. Farmacy Food descarta el pedido duplicado; Farmacy Family evita la escritura a medias.

## La nevera sin red {#pin}

**Narración**

Un cliente de Farmacy Food llega al refrigerador a retirar su comida, y justo en ese momento el refrigerador no tiene red. No puede comprobar en línea quién es esa persona ni qué compró. El equipo lo anotó como uno de los riesgos del negocio, porque lo que se vende es que el cliente se lleve su comida.

La respuesta fue un código. Cada comida que sale de la cocina lleva un código de seis a ocho dígitos. Se genera de antemano y se manda temprano al refrigerador y al teléfono del cliente. Si la red se cae, el refrigerador compara el código con lo que ya tiene en su memoria y abre igual.

El equipo anotó también lo que eso trae. Alguien con mucha suerte podría adivinar un código al primer intento. Ocho dígitos son demasiados para escribir con comodidad. Y aparece algo a favor, que retirar la comida de otra persona se vuelve fácil.

**Visual**
- Sello: Farmacy Food. Ilustración con volumen del refrigerador, ahora con un teclado numérico en la puerta y una persona delante.
- «al decir "no tiene red"» → la antena del refrigerador se apaga; la línea hacia la nube `cortar` (roja).
- «al decir "No puede comprobar en línea"» → la persona acerca una tarjeta; un signo de pregunta sobre el refrigerador.
- «al decir "lleva un código de seis a ocho dígitos"» → transición a diagrama plano: Cocina → comida con una etiqueta "4 8 2 1 7 3"; `cifra` "6–8 dígitos".
- «al decir "se manda temprano al refrigerador y al teléfono"» → dos puntos verdes `viajar`: a la memoria del refrigerador (un cilindro chico dentro de la nevera) y al teléfono del cliente; los dos muestran el mismo código. Esto ocurre con la red encendida (línea verde).
- «al decir "Si la red se cae"» → la línea `cortar`; la persona escribe el código en el teclado; el refrigerador lo compara con su memoria; la puerta se abre (tilde verde).
- «al decir "adivinar un código"» → abajo, tres etiquetas pequeñas: "adivinar (riesgo)", "8 dígitos, largo (riesgo)", "retirar por otro (a favor)".
- Al final: el refrigerador sin red, con la puerta abierta.

## Las alertas por dos caminos {#alertas}

**Narración**

En MonitorMe, lo que no puede fallar es la alerta. Si un paciente empeora, alguien tiene que enterarse. El equipo escribió que esa es la función más importante del sistema, proteger la vida de las personas.

Así que la alerta sale por dos caminos distintos. Uno manda una notificación al teléfono del personal médico, por internet. El otro la muestra en la pantalla de la estación de enfermería, por la red local del hospital. Si internet se cae, la estación sigue avisando. Si se cae la red local, sigue avisando el teléfono.

**Visual**
- Sello: MonitorMe.
- Imagen central: Analizador a la izquierda; a la derecha, arriba un teléfono y abajo la pantalla de la estación.
- «al decir "la alerta"» → en el Analizador aparece un triángulo de alerta naranja.
- «al decir "Uno manda una notificación al teléfono"» → flecha hacia el teléfono, etiqueta "internet"; un punto `viajar`.
- «al decir "El otro la muestra en la pantalla"» → flecha hacia la estación, etiqueta "red local"; un punto `viajar`.
- «al decir "Si internet se cae"» → la flecha del teléfono `cortar`; el punto llega igual a la estación.
- «al decir "Si se cae la red local"» → se restaura la de arriba y se corta la de abajo; el punto llega al teléfono.
- Al final: las dos flechas, las dos encendidas.

## Lo que hacen los dos {#comparacion1}

**Narración**

El refrigerador y la alerta resuelven el mismo problema de dos maneras. Ambos parten de lo que el negocio no puede perder, que el cliente se lleve su comida, que el médico se entere. Farmacy Food lo protege con algo que funciona sin red. MonitorMe lo protege con un segundo camino. En los dos casos, el diseño empieza por preguntar qué pasa si esto falla, antes de que falle.

**Visual**
- Imagen central: `comparar`. Izquierda, el refrigerador sin red que abre con el código. Derecha, las dos flechas de alerta, una cortada y la otra llegando.
- «al decir "lo que el negocio no puede perder"» → arriba de cada mitad, una palabra: "retirar la comida" y "enterarse".
- «al decir "algo que funciona sin red"» → izquierda, se resalta el código; «al decir "un segundo camino"» → derecha, se resalta la flecha que sigue viva.
- Al final: las dos mitades.

## Cuando el dato deja de llegar {#silencio}

**Narración**

A veces el fallo no hace ruido. En MonitorMe, si un sensor deja de mandar datos, nada se rompe. La pantalla simplemente deja de mostrar esa señal. Y eso es peligroso, porque el silencio de un sensor de pulso no es lo mismo que un pulso normal.

El equipo recorrió el camino del dato, pieza por pieza, para ver qué hace cada una cuando el dato no llega. El que guarda no guarda nada. El que muestra no muestra nada. El que analiza conserva la última lectura con su hora. Y sus reglas se pueden configurar para el caso en que el dato no existe o es demasiado viejo. En ese caso, la regla no se aplica, o directamente salta una alerta.

**Visual**
- Imagen central: un sensor de pulso → Recorder, Streamer, Analizador (con su caché).
- «al decir "deja de mandar datos"» → el sensor `caer`; los puntos dejan de salir.
- «al decir "La pantalla simplemente deja de mostrar"» → en la estación, una curva de pulso se corta y queda una línea plana gris (no roja).
- «al decir "pieza por pieza"» → `enfocar` cada pieza en orden: Recorder ("nada que guardar"), Streamer ("nada que mostrar"), Analizador.
- «al decir "conserva la última lectura con su hora"» → en la caché del Analizador, "pulso 72 — hace 1 h".
- «al decir "demasiado viejo"» → la hora se vuelve naranja; «al decir "salta una alerta"» → el triángulo de alerta aparece y sale por los dos caminos de la escena anterior.
- Al final: el sensor caído y la alerta enviada.

## Un pedido que llega dos veces {#duplicado}

**Narración**

Cuando las partes se hablan con mensajes, aparecen dos fallos clásicos. El primero es el duplicado. Para no perder un mensaje, la cola espera que quien lo procesa avise que terminó, y si el aviso no llega, lo vuelve a entregar. Pero el aviso también se puede perder, aunque el trabajo se haya hecho. Por eso esa garantía se llama entrega al menos una vez, y trae duplicados.

En Farmacy Food, el mensaje que no se puede perder es el del pedido listo para pagar. El equipo propone que viaje con dos datos, un identificador único que genera el teléfono del cliente y un número de versión. Al procesarlo, si ya hay un pedido con ese identificador y esa versión, el duplicado se descarta. El costo está en una línea, baja un poco el rendimiento a cambio de que los datos sean correctos.

**Visual**
- Sello: Farmacy Food, etiqueta "propuesta".
- Imagen central: teléfono → cola → Pagos.
- «al decir "espera que quien lo procesa avise"» → un pedido llega a Pagos; Pagos devuelve un tilde (aviso) hacia la cola.
- «al decir "el aviso también se puede perder"» → el tilde se pierde en el camino (`cortar` breve); la cola reenvía el pedido: `duplicar` (segundo punto con "×2").
- «al decir "identificador único"» → sobre el pedido, una etiqueta monoespaciada "id 7f3a · v1".
- «al decir "el duplicado se descarta"» → el segundo pedido llega a Pagos, se compara con el registro ("7f3a · v1 ya visto") y se desvanece; un solo cobro (una moneda).
- Al final: un solo cobro.

## Guardar y avisar {#dosescrituras}

**Narración**

El segundo fallo es la escritura a medias. Cuando algo pasa en el negocio, el sistema tiene que guardarlo en su base y además avisar a los demás. Son dos escrituras distintas. Si el sistema se cae entre la primera y la segunda, la base dice una cosa y el resto del sistema nunca se entera.

Farmacy Family, la segunda fase del mismo negocio, lo resolvió con un patrón conocido, en dos mitades. Al avisar, el evento se guarda primero en la misma base, en una bandeja de salida, y otro proceso lo envía y lo marca como enviado. Al recibir, el evento se guarda primero en una bandeja de entrada, y otro proceso lo maneja y lo marca como manejado. Eso permite ignorar los que ya llegaron. En inglés se los llama outbox e inbox.

El duplicado y la escritura a medias aparecieron en el mismo negocio, uno en cada fase. Uno es el mensaje que llega dos veces, el otro es el mensaje que se pierde entre guardar y avisar. Cada uno pide su respuesta, y las dos se diseñan antes de que el primer pedido viaje.

**Visual**
- Sello: Farmacy Family (segunda fase).
- Imagen central: Servicio A con su base → Servicio B.
- «al decir "guardarlo en su base y además avisar"» → dos flechas salen de A: una a su base, otra hacia B.
- «al decir "si el sistema se cae entre la primera y la segunda"» → la primera escritura llega (la base se ilumina); A `caer`; la segunda flecha nunca sale; B queda con un dato viejo (rayo de conflicto).
- «al decir "en una bandeja de salida"» → se rebobina; dentro de la base de A aparece una tabla "salida"; el evento se guarda ahí junto con el dato (un solo lazo de transacción).
- «al decir "otro proceso lo envía"» → un proceso chico lee la bandeja, manda el evento a B y marca "enviado".
- «al decir "una bandeja de entrada"» → en B aparece "entrada"; el evento entra, se procesa y se marca; un duplicado llega y se ignora al ver la marca.
- «al decir "aparecieron en el mismo negocio"» → `comparar`: izquierda, el duplicado descartado (escena anterior); derecha, la escritura a medias resuelta con bandejas. Sellos Farmacy Food y Farmacy Family encima.
- Al final: las dos mitades.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ADR-011 de Farmacy Food (Accepted): la red se puede perder al retirar; el refrigerador tiene teclado y memoria; código de 6 a 8 dígitos; generado de antemano y entregado temprano al refrigerador y al teléfono; riesgo de adivinar; "8th long digit codes are too long to type!"; "easier to delegate meal grabbing to other people" | `ArchColider/4.ADRs/011 Every meal delivery has pick up pin code.md` l. 5-34 |
| "Maximizing guarantee of a meal picking up by user" como impulsor de negocio | `ArchColider/1.ProblemBackground/BusinessDrivers.md` l. 31 |
| Riesgo de la nevera sin red, opción de códigos | `ArchColider/2.SolutionBackground/RisksAndSensitivePoints.md` l. 13-17 |
| MonitorMe: dos caminos de alerta (push al teléfono por internet; Streamer a la estación por la red local); "PROTECT HUMANS LIFE" | `BluzBrothers/C4/C2-containers.md` l. 17-22; `FitnessFunctions/Alerts.md` l. 1-7; `ADR/ADR-016` |
| Recorrido del fallo de un sensor: Recorder y Streamer no reciben; la caché conserva la última señal con hora; reglas para dato inexistente o viejo: no se ejecuta o se envía alerta | `BluzBrothers/FitnessFunctions/Failover.md` l. 3-10 |
| Farmacy Food ADR-008 (Proposed): pedido "Ready to pay"; acuse de recibo; id único desde el dispositivo del cliente y número de versión; duplicado descartado; "It will slightly decrease performance, but we get data integrity." | `ArchColider/4.ADRs/008 At least once delivery for ready to pay order.md` l. 7-21 |
| Farmacy Family ADR-004 (Accepted): el problema de la doble escritura; outbox e inbox | `Archangels/4.ADRs/004-use-inbox-outbox-pattern.md` l. 11-23 |
