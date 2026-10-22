# Bloque 11 · Identidad y datos sensibles

**Enseña:** con un dato sensible se decide quién es cada uno, quién lo ve completo, cómo se vuelve ilegible y cuánto vive; y se decide antes de guardar el primer dato. Cuatro familias (proveedor de identidad, permisos y aislamiento, cifrado, retención por niveles) con lo que gana y paga cada una.
**Par:** ClearView impide que el emparejamiento lea el currículum; Farmacy Family vuelve ilegible todo lo de una persona borrando una clave. Identidad: Spotlight paga un proveedor y lo envuelve en una fachada. Retención: las fotos de MobilityCorp por niveles. Alcance: Sysops Squad guarda la tarjeta completa en un solo lugar.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** la base compartida de ClearView y la historia anónima (apertura, bloque 1); la decisión de fotos de MobilityCorp (bloque 1); facturación aislada de Sysops Squad (bloques 5 y 9); autenticación y autorización (bloque 5). **Presenta:** ningún caso; proveedor de identidad, fachada, cifrado, clave, retención.
**Pieza de ClearView:** el candado del currículum.

## Lo que el emparejamiento no puede leer {#clearview}

**Narración**

Lo que vende ClearView es que una empresa elige a alguien sin saber quién es. Si el servicio que empareja pudiera leer el currículum original, con nombre, foto y dirección, la promesa dependería de que ningún programador lo use por error.

El equipo no la dejó depender de eso. El currículum original lo guarda un solo servicio, el de candidatos, y leerlo requiere un permiso especial que el servicio de emparejamiento no tiene. El emparejamiento trabaja con la historia anónima. Así, no mirar la identidad deja de ser una buena intención, porque lo impone la forma del sistema.

**Visual**
- Estás aquí: la región "identidad y sensibles".
- Sello: ClearView. La base compartida con dos tablas: el currículum (nombre, foto, dirección) y la historia anónima. Candidatos escribe el currículum y le pone un candado; emparejamiento intenta leerlo y rebota; lee la historia sin problema.

## Cuatro familias {#familias}

**Narración**

Un dato sensible, como un currículum o una historia clínica, obliga a decidir quién entra, quién lo ve completo, cómo se protege y cuánto dura. Hay cuatro familias.

La primera es un proveedor de identidad, un servicio que comprueba quién es cada persona y qué puede hacer. Gana con no tener que construir algo tan delicado. Paga con depender de lo que ese proveedor ofrece.

La segunda son los permisos y el aislamiento. El dato completo vive en un solo lugar y solo lo lee quien lo necesita, como en ClearView. Gana con que un error en otra parte no lo expone. Paga con más reglas, y con partes que no pueden leer lo que a veces les vendría bien.

La tercera es cifrar, guardar el dato de forma que sin su clave no se puede leer. Gana con que una copia robada no sirve. Paga con trabajo extra cada vez que hay que leerlo, y con claves que hay que cuidar.

La cuarta es la retención, decidir cuánto vive cada dato y que se borre al vencer. Gana con guardar menos, porque lo que no se guarda no se filtra. Paga con tener que justificar cada plazo, y con procesos que borran a tiempo.

**Visual**
- El tramo del mapa: "identidad y sensibles" en naranja y sus cuatro tarjetas.

## Borrar una clave {#clave}

**Narración**

Farmacy Family guarda perfiles y datos médicos, y un cliente puede pedir que se borre todo lo suyo. En un sistema repartido en varias bases, con copias de respaldo, encontrar y borrar cada rastro de una persona es difícil, y el equipo lo escribe así.

La decisión es que cada usuario tenga su propia clave de cifrado, en un almacén aparte, nunca junto a los datos. Todo lo de esa persona se guarda cifrado con su clave. Para borrar a una persona alcanza con borrar su clave, y cuando también se borran las copias de respaldo, sus datos quedan ilegibles en todas partes.

Borrar así tiene un costo. Para que el sistema no se vuelva lento, hace falta una memoria de vida corta con datos sin cifrar. Y si una clave se filtra, borrarla ya no garantiza nada.

**Visual**
- Sello: Farmacy Family. Tres bases y un respaldo, cada uno con una tarjeta de la misma persona. Una lupa se pierde entre ellas. A la derecha, un almacén con una llave por persona; las tarjetas se vuelven símbolos; la llave se borra y todo queda gris a la vez. Al lado del servicio, una memoria chica con un reloj de arena: "costo".

## Impedir o volver ilegible {#par}

**Narración**

ClearView y Farmacy Family protegen a una persona con mecanismos opuestos. ClearView impide que una parte del sistema lea el dato. Farmacy Family deja que el dato esté en muchos lugares, y se asegura de poder volverlo ilegible en todos de una vez. Los dos mecanismos se decidieron antes de guardar el primer dato. Agregarlos después, sobre datos ya repartidos, daría mucho más trabajo, y esto es lectura nuestra.

**Visual**
- Dos mitades: el candado de ClearView con la lectura que rebota; la llave borrada de Farmacy Family con los datos grises. Debajo, una línea de tiempo con la marca "primer dato"; los dos mecanismos quedan a su izquierda.

## Quién es quién {#identidad}

**Narración**

Antes de decidir quién ve qué, el sistema tiene que saber quién es cada uno. Spotlight comparó tres caminos para eso. Podía construir su propio servicio de identidad, correr uno de código abierto en sus máquinas, o pagar un proveedor que lo opera entero.

Eligió el proveedor. Construir o mantener algo así trae trabajo de seguridad y de cumplimiento de normas, y el equipo prefería dedicarse a lo propio del producto. El precio de comprarlo es que el proveedor limita lo que se puede hacer. Por eso propone envolverlo en un servicio propio, una fachada por la que el resto del sistema pregunta por la identidad. Esa fachada suma lo que el proveedor no trae.

**Visual**
- Sello: Spotlight. Tres columnas: "construir", "código abierto en casa", "proveedor"; las dos primeras se apagan con su razón (tiempo, operación). Después: el proveedor afuera del borde; delante, una fachada propia; los servicios le preguntan a la fachada, nunca al proveedor.

## Cuánto dura y dónde vive {#plazo}

**Narración**

La decisión de MobilityCorp sobre las fotos de los vehículos, la que cita sus requisitos por número, es una retención por niveles. Las fotos muestran matrículas y a veces personas, así que son datos personales bajo el reglamento europeo de protección de datos. Ese reglamento obliga a guardarlos solo el tiempo necesario. Pero también sirven de prueba en una disputa y para entrenar los modelos.

Por eso hay tres niveles. Las fotos originales se guardan unos meses, y más tiempo solo si hay una disputa abierta. Las copias de trabajo duran menos. Y para entrenar se usan copias anónimas, con caras y matrículas difuminadas.

Sysops Squad mira la otra pregunta, dónde vive el dato completo. Propone que la parte de los clientes guarde solo los últimos cuatro dígitos de la tarjeta, que alcanzan para mostrarla. La tarjeta completa vive solo en facturación, y así la auditoría de tarjetas abarca menos sistema.

**Visual**
- Sello: MobilityCorp. Tres estantes, uno por nivel, cada uno con su línea de tiempo: originales (una foto con "disputa" se queda más), copias de trabajo (más corta), copias anónimas (caras y matrículas difuminadas).
- Sello: Sysops Squad (propuesta). La parte de clientes con "•••• 4821"; la tarjeta completa viaja a facturación, con candado; un recuadro de auditoría rodea solo facturación.

## La pregunta que decide {#pregunta}

**Narración**

Con un dato sensible hay que contestar quién lo ve completo, cuánto dura y cómo se borra. Y conviene contestarla antes de guardar el primero, porque después cada copia repartida es un lugar más donde buscarlo.

**Visual**
- El tramo del mapa con las cuatro familias; debajo, la pregunta; el candado de ClearView queda marcado en su tarjeta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ClearView: anonimización como propuesta de valor; seguridad "Essential, as the product's USP is resume anonymization" | `Pragmatic/ArchitectureCharacteristics/Characteristics.md` l. 27 |
| ClearView ADR-010 (Accepted): "Resumes are only persisted in the Job candidate service, and access requires special privileges which are not given to the matching service" | `Pragmatic/ADR/ADR-010-create-features-from-story-not-resumes.md` l. 15-17 |
| Farmacy Family ADR-005 (Accepted): datos personales y médicos; borrado difícil en sistemas distribuidos con respaldos; una clave por usuario en un almacén aparte, "never be kept alongside the encrypted data"; borrar la clave; irrecuperable cuando se borran los respaldos; costo: caché de vida corta sin cifrar; riesgo: clave filtrada | `Archangels/4.ADRs/005-use-crypto-shredding.md` |
| "Agregarlo sobre datos ya repartidos daría más trabajo" | Lectura nuestra (se dice así) |
| Spotlight ADR-009 (Accepted): tres alternativas (propio, abierto y autoalojado, tercero gestionado); construir o gestionar "adds the overhead of security and compliance"; enfocarse en la propuesta de valor; limitación del proveedor; servicio envoltorio como "identity facade" que suma capacidades | `Pegasuz/ADRs/009.adr-idp.md` |
| MobilityCorp ADR-0017: GDPR; originales 180 días (hasta 2 años con disputa: "unos meses", "más tiempo"); derivados 90 días; conjuntos de entrenamiento anonimizados; difuminado de caras y matrículas | `Five-Nines/adrs/ADR-0017 - Photo Retention Policy…` |
| Sysops Squad ADR-4 (Proposed): auditoría PCI, "The bigger part of the system deals with credit card data, the more onerous the procedure is"; guardar solo los últimos 4 dígitos en la parte de clientes | `Team-7/ADR/ADR-4-extract-billing-quanta.md` l. 8-24 |
| Lo que gana y paga cada familia; qué es un proveedor de identidad | Conocimiento general (externo), coherente con los ADR citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El plan lista seis familias (proveedor, permisos, cifrado, anonimización, retención, achicar lo regulado) | Cuatro: anonimizar entra en retención (las copias anónimas); achicar lo regulado entra en permisos y aislamiento |
| 1 | Diseño del aprendizaje | La versión anterior repetía la subida de archivos de Spotlight y la lectura cedida de la analítica | La subida ya está en el bloque 9; la lectura cedida se corta: enseña una renuncia, no una familia de esta región |
| 1 | Diseño del aprendizaje | El bloque 13 usa a Spotlight para comprar y envolver | Aquí se cuenta solo el proveedor de identidad (ADR-009); el bloque 13 usa la decisión general de comprar (ADR-003) |
| 2 | Arquitecto senior | "Fachada" se usa sin definir | Se define en la misma frase: el servicio por el que el resto pregunta por la identidad |
| 3 | Verificador | Sysops Squad ADR-4 está en Proposed | "Propone" |
| 3 | Verificador | La retención de MobilityCorp tiene cifras (180 días, 2 años, 90 días) | Se narran como "unos meses", "más tiempo", "menos"; las cifras no cambian lo que se aprende |
| 4 | Guionista | La decisión de MobilityCorp ya se vio en el bloque 1 | Se la nombra como la misma ("la que cita sus requisitos por número") |
| 5 | Espectador de prueba | "Reglamento europeo" sin sigla | Se dice "reglamento europeo de protección de datos", sin la sigla |
| 6 | Dirección visual | Dos casos en la escena del plazo | Dos sellos en sucesión, cada uno con su mitad de la escena |
| 7 | Producción | Ids: `clearview`, `familias`, `clave`, `par`, `identidad`, `plazo`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
