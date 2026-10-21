# Bloque 6 · De quién es cada dato

**Enseña:** cada dato tiene un dueño; lo que se pierde al repartir los datos (la transacción); consistencia fuerte dentro de un grupo de datos que cambia junto y eventual entre grupos.
**Par:** MobilityCorp concentra el estado de cada vehículo en un servicio dueño; ClearView comparte la base con un solo escritor por objeto.

## Muchos que quieren saber dónde está el auto {#gancho}

**Narración**

En MobilityCorp, casi todo depende de saber dónde está cada vehículo, cuánta batería le queda y si está libre. Lo necesitan el que reserva, el que calcula la ruta, el que manda a mantenimiento y el que decide los precios.

Si cada uno de esos servicios guardara su propia copia, cada uno podría tener una versión distinta del mismo auto. Uno lo daría por libre y otro por reservado. El equipo lo escribe así: el riesgo es un estado inconsistente, lógica repetida y una reconciliación complicada.

**Visual**
- Sello: MobilityCorp.
- Imagen central: un auto eléctrico (ilustración breve con volumen) que emite señales; alrededor, cuatro servicios.
- «al decir "dónde está cada vehículo"» → sobre el auto, tres datos: ubicación, batería, "libre".
- «al decir "el que calcula la ruta"» → `construir` cuatro servicios en círculo: reservas, rutas, mantenimiento, precios.
- «al decir "su propia copia"» → cada servicio recibe un cilindro pequeño con una copia del auto.
- «al decir "Uno lo daría por libre y otro por reservado"» → en reservas, "libre" en verde; en mantenimiento, "reservado" en rojo; entre los dos, un rayo de conflicto.
- Al final: cuatro copias que no coinciden.

## Un solo dueño {#dueno}

**Narración**

La decisión de MobilityCorp es que un solo servicio, el de flota, sea el dueño del estado de cada vehículo. Las señales de los autos llegan a él, y todos los demás le preguntan a él. Hay un único lugar donde vive la verdad sobre cada auto.

El costo también está escrito. Ese servicio se vuelve crítico para casi todo el sistema, y concentrar el estado puede convertirlo en un cuello de botella. Por eso lo despliegan con copias que se reemplazan entre sí y crecen con la carga.

**Visual**
- Imagen central: el mismo círculo, ahora con un servicio "Flota" en el centro.
- «al decir "un solo servicio, el de flota"» → las cuatro copias se desvanecen; aparece Flota en el centro con un cilindro propio pegado.
- «al decir "Las señales de los autos llegan a él"» → puntos verdes `viajar` del auto a Flota.
- «al decir "todos los demás le preguntan a él"» → cuatro flechas azules síncronas de los servicios a Flota.
- «al decir "se vuelve crítico"» → `enfocar` Flota; las cuatro flechas se engrosan.
- «al decir "con copias que se reemplazan entre sí"» → detrás de Flota aparecen dos copias; una `caer` y la otra toma su lugar.
- Al final: Flota en el centro con su base y sus copias.

## Compartir con una regla {#clearview}

**Narración**

ClearView tomó otro camino para el mismo problema. Como su estilo es de pocos servicios grandes, decidió que varios servicios compartieran una misma base de datos. En la misma decisión anotó el riesgo, que eso puede terminar en un acoplamiento caótico, donde cualquiera cambia cualquier cosa.

Y para contenerlo escribió una segunda decisión con una sola regla. Cada objeto de la base tiene un único servicio con derecho a escribirlo. Leer puede leer cualquiera, pero escribir, solo el dueño. La decisión pide que esa regla no quede como una buena intención, sino que se imponga con los permisos de la base de datos.

**Visual**
- Sello: ClearView. El diagrama maestro se abre desde su ícono, mostrando el centro: servicios y base compartida.
- «al decir "compartieran una misma base"» → `enfocar` la base compartida; líneas grises de lectura desde todos los servicios.
- «al decir "cualquiera cambia cualquier cosa"» → flechas de escritura naranjas cruzadas desde todos los servicios hacia todas las tablas; se enredan.
- «al decir "un único servicio con derecho a escribirlo"» → las flechas cruzadas se desvanecen; queda una flecha de escritura por tabla, desde su dueño (Candidatos → currículum; Historia → historia; Emparejamiento → emparejamientos).
- «al decir "Leer puede leer cualquiera"» → reaparecen las líneas grises de lectura.
- «al decir "con los permisos de la base de datos"» → un candado aparece sobre cada tabla, con el nombre de su dueño.
- Al final: la base compartida con tablas, cada una con su candado y su dueño. Esta pieza se guarda en el diagrama que crece.

## Dos formas de tener dueño {#comparacion}

**Narración**

Quién puede cambiar este dato es la pregunta que responden MobilityCorp y ClearView, cada uno a su manera. MobilityCorp responde con un servicio que lo guarda solo y atiende a todos. ClearView responde con una base compartida y una regla de quién escribe, impuesta por permisos. La primera paga con un punto crítico que hay que cuidar. La segunda paga con documentar quién es dueño de cada tabla y mantener esos permisos al día.

**Visual**
- Imagen central: `comparar`. Izquierda, Flota en el centro con su base propia. Derecha, la base compartida de ClearView con sus candados.
- «al decir "quién puede cambiar este dato"» → en las dos mitades, se resalta una sola flecha de escritura.
- «al decir "un punto crítico"» → izquierda, Flota laten en naranja; «al decir "documentar quién es dueño"» → derecha, los candados laten.
- Al final: las dos mitades, con la escritura única resaltada en cada una.

## Lo que se pierde al repartir {#transaccion}

**Narración**

Con una sola base de datos hay algo que se obtiene sin pensar, la transacción. Varios cambios se agrupan y se aplican todos juntos o ninguno. Cuando los datos quedan repartidos entre servicios, esa garantía desaparece. Un cambio en una parte llega a la otra después, por un mensaje, y durante un rato las dos no coinciden. A eso se le llama consistencia eventual.

MobilityCorp dice dónde acepta ese rato y dónde no. Llama agregado a cada grupo de datos que cambia siempre junto, y cada agregado se guarda en una sola transacción. La reserva, por ejemplo, se guarda junto con la referencia del pago ya autorizado. Pero la disponibilidad del vehículo, que ven los demás clientes, se pone al día después, por un evento. Ese camino no es crítico y puede tardar unos instantes.

**Visual**
- Imagen central: dos cajas grandes, "reserva" y "vehículo".
- «al decir "todos juntos o ninguno"» → dentro de una base, tres cambios con un lazo alrededor; se aplican a la vez (los tres se iluminan juntos).
- «al decir "repartidos entre servicios"» → los tres cambios se separan en dos bases; el lazo se rompe.
- «al decir "durante un rato las dos no coinciden"» → un cambio llega antes que el otro; un reloj entre las dos bases; los valores no coinciden un momento y después sí.
- «al decir "agregado"» → la caja "reserva" agrupa "datos de la reserva" y "referencia del pago" con un lazo continuo (transacción).
- «al decir "se pone al día después, por un evento"» → un punto verde `viajar` de "reserva" a "vehículo"; en "vehículo", "libre" cambia a "reservado" con medio segundo de retraso; etiqueta "eventual".
- Al final: la reserva con su lazo y el vehículo unido por la flecha de evento.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| MobilityCorp ADR-0007: estado del vehículo (ubicación, carga, disponibilidad) para rutas, reservas, mantenimiento y decisiones; evitar la fragmentación del estado entre servicios | `Five-Nines/adrs/ADR-0007 - Fleet Service as the Single Source of Truth for Vehicle State.md` l. 5-9, 28 |
| Alternativa de estado distribuido: "risk of inconsistent state, duplicated logic, complex reconciliation" | ADR-0007 l. 49 |
| Riesgos: "Single point of dependency… Deploy with HA and autoscaling"; "Centralizing state may create performance bottlenecks" | ADR-0007 l. 61-66 |
| Five-Nines no usa campo de estado en sus ADR | `Five-Nines/adrs/` (ningún ADR declara estado) |
| ClearView ADR-014: servicios que comparten base; "May lead to chaotic coupling. Therefore, we added ADR-015" | `Pragmatic/ADR/ADR-014…`; `C4/C2-container.md` l. 7 |
| ADR-015: "For each object in a DB only one service has the right to write to the database."; "This should be enforced with DB permissions"; costo de documentar y configurar permisos | `Pragmatic/ADR/ADR-015…` l. 16, 20 |
| MobilityCorp: agregados con consistencia fuerte; la reserva guarda la referencia de la preautorización; disponibilidad por evento, "eventual consistency acceptable for non-critical path" | `Five-Nines/hld/core-func/car-van-rental/3_Domain_Model.md` l. 196-209; `4_Sequence_Diagram.md` l. 63-65 |
