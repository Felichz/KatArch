# Bloque 9 · El borde

**Enseña:** el borde es por donde entra lo que viene de afuera; ahí se decide quién entra, por dónde y quién controla esa puerta. Cuatro familias (gateway, una puerta por tipo de cliente, archivos directo al almacenamiento, quién inicia la conversación) con lo que gana y paga cada una.
**Par:** Spotlight pone una puerta hecha para sus aplicaciones (GraphQL, backend para el frontend) y deja REST para los terceros; Sysops Squad propone un gateway por parte, sin lógica del negocio. Archivos: Spotlight sube directo al almacenamiento con direcciones firmadas. Quién inicia: las cámaras de Wildlife Watcher preguntan ellas.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** Spotlight; Sysops Squad y sus cuatro partes; la interfaz como puerta de entrada (bloque 5); autenticación y autorización. **Presenta:** Wildlife Watcher; borde, gateway, backend para el frontend, GraphQL, REST, dirección firmada.

## Una puerta para las aplicaciones {#gancho}

**Narración**

Spotlight, la plataforma de empleo para personas subrepresentadas, tiene aplicaciones web y de celular. Una pantalla de esas aplicaciones muchas veces necesita datos de varios servicios a la vez. Si la aplicación le pide a cada servicio por separado, hace varios viajes por la red del celular y recibe más datos de los que va a mostrar.

El equipo puso delante un servicio hecho para sus aplicaciones, lo que se llama un backend para el frontend. La aplicación le hace un solo pedido con GraphQL, una forma de pedir exactamente los campos que la pantalla va a mostrar. Ese servicio junta lo que hace falta de los demás y lo devuelve en un viaje.

Las organizaciones y los terceros que se conectan con Spotlight entran por otro lado, con REST, el estándar que lleva décadas y que casi cualquiera sabe usar. Y también figura el costo. Hay un servicio más que vigilar, y si se cae, las aplicaciones dejan de funcionar, así que lo despliegan en varias zonas de la nube.

**Visual**
- Estás aquí: la región "el borde".
- Sello: Spotlight. Un celular con una pantalla de tres recuadros; tres servicios; primero tres flechas largas que vuelven gordas (muchos viajes, datos de más); después, una puerta "para las apps" entre el celular y los servicios: un pedido, una respuesta justa. A un lado, los terceros con "REST". Costo: la puerta duplicada en dos zonas.

## Cuatro familias {#familias}

**Narración**

El borde de un sistema es por donde entra lo que viene de afuera, de una persona o de otro sistema. Ahí se decide quién entra y por dónde. Hay cuatro familias.

La primera es una puerta común, un gateway, que recibe los pedidos, revisa quién los hace y manda cada uno al servicio que corresponde. Gana con que el acceso y la seguridad se resuelven en un solo lugar. Paga con una pieza más por la que pasa todo, y que no se puede caer.

La segunda es una puerta por tipo de cliente, como la de Spotlight. Gana con que cada aplicación recibe justo lo que necesita. Paga con más servicios que mantener, uno por cada tipo de cliente.

La tercera es dejar que los archivos vayan directo al almacenamiento, sin pasar por los servicios. Gana con que los servicios no cargan con archivos pesados. Paga con que el control de quién sube y quién baja cada archivo se tiene que resolver de otra forma.

La cuarta es decidir quién empieza la conversación, si el sistema le habla al de afuera o el de afuera pregunta. Que pregunte el de afuera gana con que no hace falta encontrarlo conectado. Paga con que los cambios le llegan recién cuando pregunta.

**Visual**
- El tramo del mapa: "el borde" en naranja y sus cuatro tarjetas.

## Una puerta por parte {#gateways}

**Narración**

Sysops Squad, el soporte técnico de la empresa de electrónica, propone otra forma de cuidar el borde. Después de separar el sistema en partes, el equipo se preguntó dónde resolver la autenticación, la autorización y el registro de lo que pasa. Repetirlos en cada servicio era duplicar código.

Propone un gateway por cada parte, porque cada una pide cualidades distintas. Facturación, que guarda tarjetas de crédito, va aislada en el suyo, porque es el riesgo de seguridad más alto. Administración tiene otro, porque opera con todos los permisos y una intrusión ahí golpea a todo el negocio. Las partes solo se hablan a través de esas puertas, y adentro de una misma parte los servicios se llaman directo.

La regla que escribe el equipo es que el gateway no tenga lógica del negocio. Revisa el acceso y la seguridad, y manda cada pedido a donde va. Esa regla tiene su precio. Hay más servicios que construir y mantener, y cada gateway tiene que repartirse en varias copias para no ser el punto que, si cae, deja a todos afuera.

**Visual**
- Sello: Sysops Squad (propuesta). Las cuatro partes de siempre; delante de facturación, un gateway con candado; delante de administración, otro. Una flecha de una parte a otra pasa por las puertas; adentro de una parte, flechas directas. Un recuadro "lógica del negocio" intenta entrar al gateway y rebota.

## Dos puertas distintas {#par}

**Narración**

Spotlight y Sysops Squad pusieron puertas por razones distintas. Spotlight armó una para sus aplicaciones, porque sus pantallas necesitan datos juntos y pocos viajes por la red. Sysops Squad propone una por parte, porque cada parte tiene su propio riesgo y su propia carga. En los dos casos, la puerta tiene la forma de quien llega a ella y de lo que hay que cuidar detrás.

**Visual**
- Dos mitades: Spotlight (la puerta delante de los servicios, cortada a la medida del celular) y Sysops Squad (una puerta delante de cada parte, con candado en facturación).

## Archivos que no pasan por los servicios {#archivos}

**Narración**

Los archivos son un caso aparte. En Spotlight se suben currículums, fotos y documentos de las organizaciones. Pasarlos por el servicio de documentos llevaba mucho trabajo, y lo hacía poco confiable, porque su memoria se inflaría según el tamaño de cada archivo. Así que la aplicación los sube directo al almacenamiento de un proveedor de la nube.

El riesgo lo anotó el equipo. Alguien podría subir un archivo enorme o de un formato inválido, o bajar uno que no le corresponde. Lo cubre con direcciones firmadas, que duran poco. El sistema entrega una dirección que sirve para un archivo, con su tamaño y su formato, y que vence enseguida.

**Visual**
- Sello: Spotlight. Arriba, el camino largo: el celular, el servicio de documentos (que se infla), el almacenamiento; se tacha. Abajo, el camino directo: el celular al almacenamiento. Una tarjeta "dirección firmada" con "un archivo", "tamaño y formato" y un reloj que se vacía.

## Quién empieza a hablar {#camara}

**Narración**

Wildlife Watcher es un sistema de cámaras que se dejan en la naturaleza para identificar animales, con batería y sin internet estable. Las cámaras se configuran desde una plataforma.

Una opción era que la cámara tuviera una puerta siempre abierta y que la plataforma le mandara cada cambio. Eso gasta batería escuchando todo el tiempo, y si la conexión se cae en el medio, el cambio no llega. La otra era que la cámara pregunte cada tanto si hay cambios para ella, y que si no hay internet, pregunte en la vuelta siguiente.

Ganó la segunda, y el costo quedó escrito. La configuración ya no llega en el momento en que se cambia. Cuando el de afuera es poco confiable, que sea él quien pregunte evita depender de encontrarlo conectado.

**Visual**
- Sello: Wildlife Watcher (primera aparición): una cámara atada a un árbol, con su batería. La plataforma a la izquierda, la cámara a la derecha. Primero la plataforma empuja un cambio; la red se corta y el cambio se pierde; la batería baja con una antena siempre encendida. Después la cámara pregunta en ciclos; en uno la red está cortada, en el siguiente el cambio vuelve con la respuesta. Un reloj entre el cambio y su llegada.

## La pregunta que decide {#pregunta}

**Narración**

En el borde, lo que hay que contestar es quién entra, por dónde, y quién controla esa puerta. Las aplicaciones propias y los terceros piden puertas distintas, un archivo pesado conviene que no pase por los servicios, y una cámara sin red conviene que pregunte ella. Y cada puerta que se agrega es una pieza más que alguien tiene que mantener en pie.

**Visual**
- El tramo del mapa con las cuatro familias; debajo, la pregunta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Spotlight: apps web y móvil; REST y GraphQL; GraphQL resuelve "over-fetching and under-fetching… especially for mobile apps… smaller payload over mobile networks"; terceros y ONG integran con REST; "supporting multiple API standards will add an infrastructure overhead" | `Pegasuz/ADRs/002.adr-api-standard.md` (Accepted) |
| BFF con GraphQL: "the frontend client would only need to hit a single service to fetch aggregated data from multiple services"; contras: "Single point of failure… Deploy BFF in multiple availability zones"; "Extra service… to monitor" | `Pegasuz/ADRs/004.adr-bff.md` (Accepted) |
| Documentos: currículums, imágenes, ofertas de las organizaciones | `Pegasuz/quanta/document.md` l. 4 |
| Subida directa: vía servicio "Very high" tiempo de construcción, confiabilidad baja "because service memory will bloat un predictably based on size of document"; riesgo de archivos "too large, invalid formats" y de bajar sin autorización; "presigned or short-lived URLs… specify the file size, format, validity" | `Pegasuz/ADRs/008.adr-upload-directly-to-document-storage.md` (Accepted) |
| Sysops Squad ADR-12 (Proposed): autenticación, autorización, registro, duplicación de código; un gateway por quantum de dominio por sus distintas características; facturación "highest security risk"; "Admin API operates with admin permissions so any intrusion here will make a high impact on the whole business"; sin lógica de dominio; "access control, security checks, and simple message routing"; entre dominios solo por gateways, adentro directo; consecuencias: más servicios, evitar cuello de botella y punto único de falla, costo de desarrollo y mantenimiento | `Team-7/ADR/ADR-12-gateways.md` |
| Wildlife Watcher: cámaras que identifican animales, con batería, internet no siempre disponible | `Celus-Ceals/3.ARDs/003.CameraUpdateStrategy.md` (Accepted), contexto |
| Opción API siempre encendida ("must listen to a port all the time"; "when the internet is down or unstable, the configuration can be not applied"; "connection can be dropped in the middle"); opción la cámara pide ("can get updates in the next cycle"); decisión; "There is no real-time configuration" | `Celus-Ceals/3.ARDs/003.CameraUpdateStrategy.md` |
| REST "lleva décadas" | `Pegasuz/ADRs/002` ("have been around for decades") |
| Lo que gana y paga cada familia; qué es un gateway | Conocimiento general (externo), coherente con los ADR citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | Un solo caso nuevo (Wildlife Watcher), a más de dos minutos de ShopWise | Se mantiene; se presenta en su propia frase |
| 1 | Diseño del aprendizaje | El gateway ya asomó en el bloque 5 como "interfaz" de Farmacy Family | No se vuelve a contar; se define "gateway" de nuevo en la primera familia |
| 2 | Arquitecto senior | GraphQL, REST y "backend para el frontend" son tres nombres seguidos | Cada uno entra en una frase con lo que hace; REST, con la razón de los terceros |
| 2 | Arquitecto senior | En Sysops Squad el ADR agrupa clientes y técnicos en un gateway de forma ambigua | Se nombran solo los dos gateways claros (facturación y administración) |
| 3 | Verificador | Sysops Squad ADR-12 está en Proposed; los tres ADR de Spotlight y el de Wildlife Watcher, en Accepted | "Propone" para Sysops Squad |
| 3 | Verificador | "vence enseguida": el ADR dice "short-lived" | Se mantiene sin cifra |
| 4 | Guionista | "La pregunta que decide" enumera cuatro casos | Se agrupan en dos frases, sin repaso numerado |
| 5 | Espectador de prueba | "Dirección firmada" sin definir | Se explica en la misma frase: sirve para un archivo, con tamaño y formato, y vence |
| 6 | Dirección visual | Hace falta el mundo de Wildlife Watcher | Se agrega al animar |
| 7 | Producción | Ids: `gancho`, `familias`, `gateways`, `par`, `archivos`, `camara`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
