# Los datos que no se pueden filtrar

## Lección 8 {#gancho}

Farmacy Family es una comunidad de salud que mejora el sistema de Farmacy Food, y guarda perfiles personales y datos médicos de sus clientes. Un cliente puede pedir que se borren todos sus datos. Pero en un sistema repartido en varias bases, y con copias de respaldo, encontrar y borrar cada rastro de una persona es difícil, y el propio equipo lo escribe así.

Su decisión cabe en una línea. Cada usuario tiene su propia clave para cifrar, guardada en un almacén aparte, y todos sus datos se guardan cifrados con ella, o sea, ilegibles sin esa clave. Para borrar todos sus registros, escribieron, alcanza con eliminar la clave.

## Cuatro preguntas para un dato sensible {#pregunta}

Detrás de esa línea hay una forma de pensar un dato sensible, con cuatro preguntas: dónde vive, quién lo ve completo, cuánto tiempo se conserva y cómo se borra. Y una más, que viene después: cómo la seguridad cambia la forma del sistema, porque la puerta de entrada no es el único camino.

## Quién lo ve completo {#donde}

La pregunta que ordena las demás es quién necesita ver el dato completo. En Sysops Squad, el dato es la tarjeta de crédito, y el corte de la facturación ya dejó una respuesta. Para editar su tarjeta, el cliente no necesita el número entero. Le alcanza con los últimos cuatro dígitos.

Así que la propuesta es esta. El cliente escribe la tarjeta en su pantalla, el dato pasa enseguida a la facturación, y en la parte del cliente quedan guardados solo esos cuatro dígitos. La tarjeta completa vive en un solo lugar, y el resto del sistema trabaja con una versión reducida. Solo la facturación, y quienes la administran, necesitan el dato entero.

## Cuánto tiempo se conserva {#cuanto}

MobilityCorp saca fotos de cada vehículo al devolverlo, para revisar limpieza y daños. Esas fotos muestran matrículas, y a veces personas, así que son datos personales bajo el reglamento europeo, que obliga a guardarlos solo el tiempo necesario. Pero las fotos también sirven como prueba en una disputa, y para entrenar los modelos.

La decisión que fija cuánto guardarlas reparte esas tres necesidades en tres niveles. Las fotos originales se guardan unos meses, y más solo si hay una disputa abierta. Las copias de trabajo, menos. Y para entrenar se usan conjuntos anonimizados, con caras y matrículas difuminadas.

Las alternativas también quedaron escritas. Guardarlo todo para siempre viola el reglamento y agranda el daño de una filtración, y borrar apenas se revisa no alcanza para las disputas. El riesgo que admiten es concreto: que una disputa tardía llegue después del borrado.

## Un plazo es una decisión {#plazo}

De ahí sale algo más general. Un plazo de conservación no es un número fijo, sino una tabla de niveles, cada uno con su propósito. Y el plazo de cada nivel lo fija la necesidad más larga que el negocio quiere poder resolver, como la disputa más tardía.

MonitorMe muestra el otro extremo. Guarda las lecturas de los pacientes solo veinticuatro horas, que es lo que pide el cliente, y escribe por qué borrar lo demás: privacidad, rendimiento y costo. La visión larga del paciente vive en otro sistema, al que el personal sube instantáneas. Un dato que ya no existe no se puede filtrar.

## Cómo se borra {#borrar}

Volvamos a la clave de Farmacy Family. Resuelve el borrado sin perseguir cada copia. Si la clave desaparece, los datos cifrados quedan ilegibles en todas partes, también en los respaldos, una vez que se borran también las copias de la clave.

El costo está escrito. Para que el sistema no se vuelva lento, hace falta una memoria temporal, de vida corta, con datos sin cifrar. Y si una clave se filtra, borrarla ya no garantiza el borrado.

MobilityCorp tomó el camino contrario. Indexa cada foto por cliente, por vehículo y por alquiler, para poder encontrar y borrar todas las copias de una persona. Las dos formas funcionan, siempre que se decidan antes de guardar.

## La seguridad cambia la forma {#forma}

Para ClearView, la seguridad encabeza la lista de prioridades, porque lo que vende es anonimizar los currículums. Y esa prioridad se convirtió en estructura. El currículum original se guarda en un solo servicio, y el servicio que hace el emparejamiento no tiene permiso para leerlo. La regla de no mirar la identidad del candidato no depende de que alguien la respete, porque la impone un permiso.

El mismo equipo cedió seguridad a propósito, y lo dejó escrito. La parte de analítica lee directo de la base de candidatos, por simplicidad y rendimiento, y la decisión anota la seguridad como cualidad debilitada.

## La puerta se puede saltar {#puerta}

Farmacy Family puso la autenticación y la autorización en la entrada, para personas y para sistemas externos. En las dos decisiones escribió el mismo riesgo: si alguien logra entrar por otro camino, se saltea esa puerta, así que hacen falta más controles adentro.

Farmacy Food, el sistema sobre el que trabaja Farmacy Family, propuso una respuesta. Que cada llamada interna entre módulos lleve la identidad y los permisos de quien llama, desde el principio, para que partir el monolito después no abra un hueco. La decisión quedó como propuesta.

## Antes del primer dato {#cierre}

La clave por usuario de Farmacy Family es una decisión tomada antes de que existiera un solo dato, y ahí está su ventaja. Agregar un cifrado por usuario sobre datos que ya están repartidos en bases y respaldos daría mucho más trabajo, y eso es lectura nuestra.

Con las otras preguntas pasa lo mismo. Dónde vive el dato, quién lo ve completo, cuánto dura y cómo se borra se deciden antes de guardar, no después. Borrar a una persona parecía una búsqueda por todos los lugares y todos los respaldos, y con la clave decidida a tiempo se convierte en eliminar una sola cosa.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Farmacy Family: comunidad de salud, mejora del sistema de Farmacy Foods; perfiles y datos médicos; borrado "difficult in distributed systems, especially where data backups are involved"; clave por usuario en almacén aparte, "never kept alongside the encrypted data"; "Therefore to delete all records we can simply remove the key."; irrecuperable una vez eliminados los respaldos del almacén de claves o de los datos; costos: "short-lived cache of unecrypted data", clave filtrada (Accepted) | Archangels: `1.ProblemBackground/BusinessGoalsDriversAndRequirements.md` l. 10; `4.ADRs/005-use-crypto-shredding.md` l. 9-39 |
| Tarjeta (Proposed): "It is enough to display the last 4 digits"; el cliente la escribe en su interfaz y el dato pasa enseguida a billing; administradores y gerentes acceden a la facturación | Team 7: `ADR/ADR-4-extract-billing-quanta.md` l. 4-5, 14-24, 31 |
| ADR-0017: GDPR; originales 180 días (hasta 2 años con disputa, se narra "unos meses"); derivados 90; anonimizados; difuminado; alternativas rechazadas; "Deletion at 180 days may hinder late disputes"; índice por cliente, vehículo y alquiler | Five Nines: `adrs/ADR-0017…` l. 37-94 |
| MonitorMe: guardar las últimas 24 h (pedido); borrado justificado por privacidad, rendimiento y costo; instantáneas ("snapshot": "holistic view of vital signs and medical history") a MyMedicalData | BluzBrothers: `Business/Requirements.md` l. 7, 14, 24; `ADR/ADR-004` l. 13-17; `Glossary.md` l. 14 |
| ClearView: seguridad primera de las prioritarias; currículum sin acceso para matching; ADR-019 debilita "Security" | Pragmatic: `ArchitectureCharacteristics/Characteristics.md` l. 25-27; `ADR/ADR-010` l. 16; `ADR/ADR-019` l. 18 |
| Archangels ADR-018/019: riesgo de saltear la autenticación; "Zero-trust and further authorisation checks" | Archangels: `4.ADRs/018` l. 31; `4.ADRs/019` l. 30 |
| Farmacy Food ADR-006 (Proposed): identidad en cada llamada interna | ArchColider: `4.ADRs/006 Zero trust architecture.md` |
| "Agregar el cifrado después daría más trabajo" y "un dato que ya no existe no se puede filtrar" | Deducción del curso |
