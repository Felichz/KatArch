# Bloque 9 · Los datos que no se pueden filtrar

**Enseña:** para un dato sensible se decide dónde vive, quién lo ve completo, cuánto dura y cómo se borra; la seguridad es parte de la forma del sistema, no una capa encima.
**Par:** ClearView impide que el servicio que empareja lea el currículum; Farmacy Family puede volver ilegibles todos los datos de una persona borrando una clave.
**Vuelven:** Sysops Squad y su facturación aislada (bloque 5), ahora como seguridad; Spotlight y su subida de archivos.

## Lo que el emparejamiento no puede leer {#clearview}

**Narración**

Lo que vende ClearView es que una empresa elige a alguien sin saber quién es. Si el servicio que empareja pudiera leer el currículum original, con nombre, foto y dirección, esa promesa dependería de que ningún programador lo use nunca por error.

El equipo no la dejó depender de eso. El currículum original lo guarda un solo servicio, el de candidatos, y leerlo requiere un permiso que el servicio de emparejamiento no tiene. El emparejamiento trabaja con la historia anónima y con los rasgos que salen de ella. La regla de no mirar la identidad deja de ser una buena intención, porque la impone la estructura.

**Visual**
- Sello: ClearView. El diagrama maestro se abre desde su ícono.
- «al decir "el currículum original"» → `enfocar` la tabla del currículum en la base compartida; adentro, una tarjeta con nombre, foto y dirección.
- «al decir "lo guarda un solo servicio, el de candidatos"» → una flecha de escritura de Candidatos a esa tabla; la tabla lleva un candado con el nombre "Candidatos".
- «al decir "un permiso que el servicio de emparejamiento no tiene"» → Emparejamiento intenta leer la tabla; la flecha de lectura choca con el candado y rebota (roja un instante).
- «al decir "con la historia anónima"» → Emparejamiento lee, sin problema, la tabla de historias (tarjeta sin nombre ni foto).
- Al final: el candado del currículum resaltado. Esta pieza se guarda en el diagrama que crece.

## Lo que se cede a propósito {#cedido}

**Narración**

El mismo equipo cedió seguridad en otro lugar, y lo dejó escrito. La parte de análisis, que busca sesgos en las contrataciones, lee directo de la base de candidatos, porque es más simple y más rápido. La decisión anota la seguridad como la cualidad que sale perdiendo. Que una lectura directa exista no es un descuido si está escrita con su razón y su costo.

**Visual**
- Imagen central: el mismo diagrama.
- «al decir "La parte de análisis"» → `enfocar` Análisis.
- «al decir "lee directo de la base de candidatos"» → una flecha de lectura gris de Análisis a la base de candidatos, con una etiqueta pequeña "solo lectura".
- «al decir "la seguridad como la cualidad que sale perdiendo"» → sobre la flecha, una hoja de decisión pequeña con "seguridad ↓" en naranja.
- Al final: el diagrama con el candado y la lectura cedida, las dos visibles.

## Borrar una clave {#clave}

**Narración**

Farmacy Family guarda perfiles y datos médicos, y un cliente puede pedir que se borre todo lo suyo. En un sistema repartido en varias bases, con copias de respaldo, encontrar y borrar cada rastro de una persona es difícil, y el equipo lo escribe así.

Su decisión cabe en una línea. Cada usuario tiene su propia clave de cifrado, guardada en un almacén aparte, y todos sus datos se guardan cifrados con ella, ilegibles sin esa clave. Para borrar a una persona alcanza con borrar su clave. Los datos quedan ilegibles en todas partes, también en los respaldos, una vez que se borran también las copias de la clave.

El costo está anotado. Para que el sistema no se vuelva lento, hace falta una memoria de vida corta con datos sin cifrar. Y si una clave se filtra, borrarla ya no garantiza nada.

**Visual**
- Sello: Farmacy Family.
- Imagen central: tres bases y un respaldo, cada uno con una tarjeta de la misma persona.
- «al decir "encontrar y borrar cada rastro"» → una lupa recorre las bases y el respaldo; se pierde entre ellas.
- «al decir "su propia clave de cifrado"» → aparece una llave con el ícono de la persona, en un almacén aparte (un cofre a la derecha).
- «al decir "todos sus datos se guardan cifrados"» → las tarjetas en las bases y el respaldo se vuelven bloques de símbolos.
- «al decir "alcanza con borrar su clave"» → la llave se desvanece del cofre; todos los bloques quedan grises, ilegibles, a la vez.
- «al decir "una memoria de vida corta"» → al lado del servicio, un cilindro pequeño con un reloj de arena y datos legibles adentro; etiqueta "costo".
- Al final: la llave borrada y los datos grises en todas partes.

## Impedir o volver ilegible {#comparacion}

**Narración**

Proteger a una persona admite mecanismos opuestos. ClearView impide que una parte del sistema lea el dato. Farmacy Family deja que el dato esté en muchos lugares, pero se asegura de poder volverlo ilegible en todos de una vez. Tienen algo en común, que se decidieron antes de guardar el primer dato. Agregar cualquiera de los dos sobre datos ya repartidos daría mucho más trabajo, y esto es lectura nuestra.

**Visual**
- Imagen central: `comparar`. Izquierda, el candado de ClearView con la lectura que rebota. Derecha, la llave borrada de Farmacy Family con los datos grises.
- «al decir "impide que una parte del sistema lea"» → izquierda, el rebote se repite; «al decir "volverlo ilegible en todos de una vez"» → derecha, los bloques pasan a gris otra vez.
- «al decir "antes de guardar el primer dato"» → una línea de tiempo abajo, con una marca "primer dato"; los dos mecanismos aparecen a la izquierda de la marca.
- Al final: las dos mitades sobre la línea de tiempo.

## Cuánto dura y dónde vive {#plazo}

**Narración**

MobilityCorp saca fotos de cada vehículo al devolverlo. Muestran matrículas y a veces personas, así que son datos personales bajo el reglamento europeo, que obliga a guardarlos solo el tiempo necesario. Pero también sirven como prueba en una disputa y para entrenar los modelos. La decisión reparte esas necesidades en niveles. Las fotos originales se guardan unos meses, y más solo si hay una disputa abierta. Las copias de trabajo, menos. Y para entrenar se usan copias con caras y matrículas difuminadas. Cada plazo lo fija la necesidad más larga de su nivel.

Dónde vive el dato es la otra pregunta. Sysops Squad, al aislar su facturación, propone también que la parte de los clientes guarde solo los últimos cuatro dígitos de la tarjeta, porque le alcanzan para mostrarla. La tarjeta completa vive en un solo lugar, y así la auditoría de tarjetas abarca menos sistema.

**Visual**
- Sello: MobilityCorp. Ilustración breve: un teléfono que fotografía un auto; se reduce.
- Imagen central: tres estantes horizontales, uno por nivel.
- «al decir "Las fotos originales"» → estante 1 con fotos y una línea de tiempo corta; «al decir "si hay una disputa abierta"» → una foto con un sello de disputa se queda más tiempo en la línea.
- «al decir "Las copias de trabajo, menos"» → estante 2, línea más corta.
- «al decir "caras y matrículas difuminadas"» → estante 3, fotos con zonas difuminadas.
- Sello: Sysops Squad (propuesta). «al decir "solo los últimos cuatro dígitos"» → frontera Clientes con una tarjeta "•••• 4821"; la tarjeta completa viaja a la frontera Facturación, que tiene candado.
- «al decir "la auditoría de tarjetas abarca menos sistema"» → un recuadro de auditoría rodea solo Facturación.
- Al final: los estantes y la facturación con su recuadro.

## Archivos que no pasan por el servicio {#subida}

**Narración**

La seguridad también cambia la forma del sistema en el camino de los archivos. Spotlight necesitaba que las personas subieran documentos, como currículums, y compararon dos caminos. Si los archivos pasaban por su propio servicio, la memoria de ese servicio crecería sin control según el tamaño de cada archivo. Si iban directo al almacenamiento de un proveedor, desde la aplicación, el servicio se libraba de ese peso, pero perdía el control de quién sube qué.

Eligieron el camino directo y recuperaron el control con direcciones firmadas. Cada una sirve para un archivo, con un tamaño y un formato fijados, y vence al poco tiempo.

**Visual**
- Sello: Spotlight.
- Imagen central: `comparar`. Izquierda: aplicación → servicio de documentos → almacenamiento; un archivo grande pasa por el servicio y el servicio se hincha. Derecha: aplicación → almacenamiento directo; el servicio queda al costado.
- «al decir "perdía el control"» → derecha, archivos de formatos raros entran sin filtro (signo de pregunta).
- «al decir "direcciones firmadas"» → el servicio entrega a la aplicación una tarjeta "dirección firmada" con tres datos: tamaño, formato, vence en 5 min (ejemplo). La aplicación sube con esa tarjeta; un archivo inválido es rechazado en la puerta del almacenamiento.
- Al final: la subida directa con su dirección firmada.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Seguridad como primera prioridad: "Essential, as the product's USP is resume anonymization" | `Pragmatic/ArchitectureCharacteristics/Characteristics.md` l. 27 |
| ADR-010: currículum solo en el servicio de candidatos; "access requires special privileges which are not given to the matching service" | `Pragmatic/ADR/ADR-010-create-features-from-story-not-resumes.md` l. 16 |
| ADR-019: analítica lee directo; seguridad como cualidad debilitada | `Pragmatic/ADR/ADR-019-data-transmission-for-analytics.md` l. 18 |
| Farmacy Family ADR-005 (Accepted): borrado difícil en sistemas distribuidos con respaldos; clave por usuario en almacén aparte; borrar la clave; irrecuperable una vez eliminadas las copias de la clave; costos: caché de vida corta sin cifrar, clave filtrada | `Archangels/4.ADRs/005-use-crypto-shredding.md` l. 11-43 |
| "Agregarlo sobre datos ya repartidos daría más trabajo" | Lectura nuestra |
| MobilityCorp ADR-0017: GDPR; originales 180 días (hasta 2 años con disputa, se narra "unos meses"); derivados 90; conjuntos de entrenamiento anonimizados; difuminado de caras y matrículas | `Five-Nines/adrs/ADR-0017…` l. 23-58 |
| Sysops Squad ADR-4 (Proposed): auditoría PCI, "The bigger part of the system deals with credit card data, the more onerous the procedure is"; "It is enough to display the last 4 digits" | `Team-7/ADR/ADR-4-extract-billing-quanta.md` l. 8-24 |
| Spotlight ADR-008 (Accepted): dos caminos; confiabilidad baja por memoria que se infla con el tamaño del documento; seguridad baja en la subida directa; mitigación con URL prefirmadas o de vida corta con tamaño, formato y validez | `Pegasuz/ADRs/008.adr-upload-directly-to-document-storage.md` l. 7-30 |
| "Vence en 5 min" en la animación | Ejemplo visual, no está en la fuente; no se narra |
