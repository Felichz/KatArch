# De quién es cada dato

## Lección 5 {#gancho}

ClearView, la plataforma que empareja currículums con puestos, decidió que varios de sus servicios compartieran una misma base de datos. En la misma decisión anotó el riesgo: eso puede llevar a un acoplamiento caótico, donde cualquiera cambia cualquier cosa. Y por eso escribió una segunda decisión para contenerlo.

La segunda pone una sola regla. Cada objeto de la base tiene un único servicio con derecho a escribirlo. Y la decisión pide que esa regla no quede como una buena intención, sino que se imponga con los permisos de la base de datos.

## Los datos cuando el sistema se parte {#pregunta}

Cuando un sistema se parte en piezas, los datos también se reparten, y aparecen tres decisiones. Compartir la base o separarla, qué se pierde al separar, y dónde está la línea entre lo que puede llegar con retraso y lo que no.

## Compartir, con una regla {#compartir}

ClearView eligió pocos servicios grandes en vez de muchos pequeños, y compartir la base entre ellos. La razón es la cualidad que manda en su caso, la viabilidad: es una organización con poco dinero y pocos desarrolladores. Uno de sus objetos, la versión anonimizada del currículum, lo usan cuatro servicios distintos.

El riesgo de compartir es que después nadie sepa quién dejó un dato en un estado raro, y la regla de un solo escritor ataca justo eso. Leer puede leer cualquiera, pero escribir, solo el dueño. El costo quedó anotado: documentar quién es dueño de cada parte del esquema y configurar los permisos.

Con el dato más delicado, el currículum original, van todavía más lejos. Solo un servicio lo guarda, y el servicio que hace el emparejamiento no tiene permiso para leerlo.

## Separar, y cuándo {#separar}

Sysops Squad, el sistema de tickets, toma el camino contrario. Su diseño final propone separar las bases de clientes, de operación, de facturación y de reportes, porque cada parte necesita cosas distintas. El costo también está escrito: hay que mantener sincronizados los datos que más de una parte necesita.

Pero no proponen hacerlo todo de una vez. Separar las bases exige un esfuerzo grande, así que planean dos fases. En la primera resuelven lo urgente y se quedan con la base única hasta que se convierta en un cuello de botella. En la segunda, separan. Es decir, separar los datos puede ser un orden y no un salto.

## Separar no siempre desacopla {#quanta}

Hey Blue!, la aplicación que acerca a policías y vecinos, agrega un matiz. Su regla es que cada servicio sea dueño de sus datos, con una excepción. El servicio que carga los datos de los comercios y el que canjea puntos trabajan sobre las mismas ofertas, y comparten una base. Por esa base, los dos cuentan como un solo quantum, la unidad que cae junta de la lección anterior.

En su diagrama dibujan dos bases, por claridad. Pero reconocen que separarlas casi no reduce el acoplamiento, porque los dos servicios siguen dependiendo del mismo significado de los datos. Dicho de otro modo, el acoplamiento está en lo que los datos quieren decir, no solo en dónde se guardan.

## Lo que se pierde al repartir {#atomicidad}

Con una sola base de datos hay algo que se obtiene sin pensar, la transacción. Varios cambios se agrupan, y se aplican todos juntos o ninguno. Cuando los datos quedan repartidos entre servicios, esa garantía desaparece. Un cambio en una parte llega a la otra después, por un mensaje, y durante un rato las dos no coinciden. A eso se le llama consistencia eventual.

Hey Blue! dejó escrito ese precio en una decisión que queda como propuesta. Renuncian a que cada flujo se complete entero o nada, a cambio de consistencia eventual. Aceptan datos y código duplicados. Y admiten que una transacción se puede perder si un servicio está caído. Son tres costos concretos, escritos en la misma decisión que los provoca.

## Lo que cambia junto, se guarda junto {#agregados}

MobilityCorp, el de los vehículos eléctricos, da una regla fácil de usar. Llama agregado a cada grupo de datos que cambia siempre junto, y cada agregado se guarda en una sola transacción. Una reserva, por ejemplo, se guarda junto con la referencia del pago que ya se autorizó.

Entre agregados distintos, en cambio, los cambios viajan por eventos y se acepta la consistencia eventual. Es lo que pasa entre la reserva y la disponibilidad del vehículo. La razón que escriben es evitar las transacciones distribuidas, que coordinan varias bases a la vez y son caras y frágiles. Y dicen dónde aceptan el retraso: la disponibilidad del vehículo se pone al día por evento, porque ese camino no es crítico.

## La línea {#linea}

Queda la decisión más práctica, qué datos pueden quedar desactualizados un rato y cuáles no. Farmacy Food propone tratar tres datos de tres maneras distintas, y eso deja ver la línea.

El catálogo de comidas se guarda en el teléfono y puede estar viejo, porque la disponibilidad real se comprueba al pagar. El stock de cada refrigerador viene de un sistema externo que puede dejar de mandar datos, así que se guarda una copia propia que se corrige cuando llegan datos nuevos.

Y el pago es el tercero. Se pide al menos una vez, un cobro duplicado se descarta, y se acepta que el cliente espere un poco más al confirmar la compra. Spotlight, la plataforma de empleo, escribió para su propio sistema un criterio que separa estos casos: la consistencia eventual es aceptable cuando no hay en juego información crítica, de la que afecta vidas o dinero.

## Una regla que se puede comprobar {#cierre}

La regla de un solo escritor de ClearView tiene una ventaja que se ve en su diseño: se puede comprobar. Si los permisos quedan como pide la decisión, un servicio que intenta escribir un objeto que no es suyo choca con la base de datos. El error aparece el primer día, no en una revisión de código meses después.

Compartir la base dejaba abierta la pregunta de quién cambió qué. Una regla con dueño y con permiso la cierra.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ADR-014 y ADR-015 del mismo día; "May lead to chaotic coupling. Therefore, we added ADR-015"; "For each object in a DB only one service has the right to write to the database."; "This should be enforced with DB permissions" (se narra como lo que pide la decisión, no como algo verificado); costos de documentación y permisos | Pragmatic: `ADR/ADR-014…`; `ADR/ADR-015…` l. 16, 20 |
| La story ("for example the object story") la usan cuatro servicios; service-based; feasibility; "financial and developer resources limited" | Pragmatic: `ADR/ADR-014` l. 11, `ADR-002`, `ArchitectureCharacteristics/Characteristics.md` l. 53 |
| Currículum solo en Job candidate; "access requires special privileges which are not given to the matching service" (analítica sí lee directo, ADR-019) | Pragmatic: `ADR/ADR-010-…md` l. 16; `ADR-019` l. 18 |
| Sysops Squad (Proposed): bases separadas con "keep in sync"; dos fases, "until it becomes a bottleneck" | Team 7: `README.md` l. 287-303; `ADR/ADR-6`, `ADR-7` |
| Hey Blue!: ETL y Rewards comparten base ("a quanta of 6"); dos bases dibujadas "for clarity and semantic reasons"; separar "does not do much to reduce the contract coupling" | MonArch: `ADRs/ADR02`; `Readme.md` l. 182-192 |
| ADR05 (Proposed): atomicidad por consistencia eventual; duplicación; "Transactions could be missed due to service downtime" | MonArch: `ADRs/ADR05-CQRS-EventSourcing.md` l. 29-31 |
| MobilityCorp: agregados; la reserva guarda "pre-auth reference" (la preautorización ocurre antes de la transacción); consistencia eventual entre agregados; "Prevents distributed transactions"; "eventual consistency acceptable for non-critical path" (la fuente también muestra un UPDATE del vehículo en la transacción; se sigue el modelo de dominio) | Five Nines: `hld/core-func/car-van-rental/3_Domain_Model.md` l. 201-209; `4_Sequence_Diagram.md` l. 42-48, 65 |
| Farmacy Food (Proposed): catálogo en caché, stock propio, pago al menos una vez con duplicado descartado por id y versión; demora aceptada al confirmar la compra | ArchColider: `2.SolutionBackground/Tradeoffs.md` l. 3; `4.ADRs/012`, `013` l. 22, `008` l. 13-21 |
| Spotlight: "not dealing with mission critical information (such as affecting human life / money)" (criterio de su propio trade-off) | Pegasuz: `quanta/npo-candidate.md` l. 53-54 |
