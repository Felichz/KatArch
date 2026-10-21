# Bloque 9 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`).

**La idea del bloque en una imagen:** una línea punteada, el borde, con lo de afuera a un lado y los servicios al otro; cada familia es una forma distinta de cruzarla (una puerta común, una puerta a la medida, un camino que no pasa por los servicios, una flecha que sale desde afuera).

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **El borde** (una línea vertical punteada: afuera a la izquierda, los servicios a la derecha) | Por dónde entra lo de afuera | Escenas 1, 3, 4 y 5 |
| **La puerta** (un rectángulo angosto, violeta claro, parado sobre el borde) | Un gateway: recibe, revisa y dirige | Escenas 1, 3 y 4 |
| **Viajes** (flechas que van y vuelven; el grosor de la vuelta es la cantidad de datos) | Muchos viajes y datos de más contra un viaje justo | Escena 1 |
| **El camino que no pasa** (el archivo va directo al almacenamiento, por encima de los servicios) | Archivos directo | Escena 5 |
| **Quién empieza** (una flecha que sale de la plataforma contra una que sale de la cámara, en ciclos) | Quién inicia la conversación | Escena 6 |
| **El tramo del mapa** | Las cuatro familias de la región | Escenas 2 y 7 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que se gana; ámbar lo que se paga; rojo la falla; violeta claro (`#c8b6ff`) las puertas.

## 0 · Estás aquí

`T.aqui(9)`, "Bloque 9", "El borde".

## 1 · Una puerta para las aplicaciones (#gancho)

**Entiende:** una pantalla del celular que pide a varios servicios hace muchos viajes y recibe de más; una puerta hecha para la aplicación junta todo en un viaje. Los terceros entran por otra puerta. La puerta nueva cuesta: si cae, las aplicaciones no andan.
**Forma:** el borde con el celular a la izquierda y tres servicios a la derecha; primero las flechas por separado, después la puerta.

| Frase | Lo que se dibuja |
|---|---|
| «Spotlight, la plataforma de empleo…» | Sello de Spotlight. A la izquierda, un celular grande con una pantalla de tres recuadros (colores de los servicios). Al lado, el ícono de pantalla web, más chico. |
| «Una pantalla… necesita datos de varios servicios a la vez.» | A la derecha, tres servicios (cajas) con su color; el borde punteado al medio. |
| «Si la aplicación le pide a cada servicio por separado…» | Tres flechas de ida, una a cada servicio; vuelven tres flechas gruesas en ámbar ("de más"). "3 viajes" a mano. |
| «El equipo puso delante un servicio hecho para sus aplicaciones…» | Las flechas se borran. Sobre el borde, la puerta: "para las apps". |
| «…un solo pedido con GraphQL…» | Una flecha del celular a la puerta con "GraphQL" encima; adentro de la flecha, una lista corta de campos. |
| «Ese servicio junta lo que hace falta…» | De la puerta a los tres servicios, flechas finas; vuelve una sola flecha verde fina al celular: "1 viaje". |
| «Las organizaciones y los terceros…» | Abajo a la izquierda, un edificio "terceros"; su flecha entra por debajo de la puerta, directo a un servicio, con "REST". |
| «Hay un servicio más que vigilar, y si se cae…» | La puerta se pone roja con una ✕; las pantallas del celular se apagan. |
| «…lo despliegan en varias zonas de la nube.» | La ✕ se va; la puerta aparece duplicada (dos puertas, "zona A", "zona B"); el celular se vuelve a encender. |

## 2 · Cuatro familias (#familias)

**Entiende:** el borde es una línea; las cuatro familias son cuatro formas de cruzarla.
**Forma:** el borde grande al centro; después, el tramo del mapa con cuatro tarjetas.

| Frase | Lo que se dibuja |
|---|---|
| «El borde de un sistema es por donde entra lo que viene de afuera…» | Barrido. El borde punteado vertical al centro. "afuera" a la izquierda con una persona y un sistema; "adentro" a la derecha con servicios. |
| «Ahí se decide quién entra y por dónde.» | Una puerta sobre el borde; la persona pasa por ella. |
| «Hay cuatro familias.» | Todo se borra; arriba, las regiones con "el borde" en naranja. |
| «La primera es una puerta común, un gateway…» y siguientes | Tarjeta 1 "gateway": "gana" y "paga". |
| «La segunda es una puerta por tipo de cliente, como la de Spotlight.» y siguientes | Tarjeta 2 "una puerta por cliente"; "Spotlight" a mano debajo. |
| «La tercera es dejar que los archivos vayan directo…» y siguientes | Tarjeta 3 "archivos directo". |
| «La cuarta es decidir quién empieza la conversación…» y siguientes | Tarjeta 4 "quién empieza". |

## 3 · Una puerta por parte (#gateways)

**Entiende:** Sysops Squad pone una puerta delante de cada parte; las partes se hablan solo por las puertas; la puerta no tiene lógica del negocio.
**Forma:** las cuatro partes de Sysops Squad en cuadrantes, con una puerta en la entrada de cada una.

| Frase | Lo que se dibuja |
|---|---|
| «Sysops Squad, el soporte técnico… propone otra forma de cuidar el borde.» | Barrido. Sello de Sysops Squad (propuesta). Las cuatro partes de siempre: clientes, técnicos, facturación, administración. |
| «…dónde resolver la autenticación, la autorización y el registro…» | En cada parte, tres íconos chicos (llave, escudo, cuaderno) en ámbar: repetidos cuatro veces. |
| «Repetirlos en cada servicio era duplicar código.» | "×4" en ámbar. |
| «Propone un gateway por cada parte…» | Los íconos repetidos se borran. Delante de cada parte, una puerta violeta. |
| «Facturación… va aislada en el suyo…» | La puerta de facturación con un candado; facturación se resalta en naranja. |
| «Administración tiene otro… todos los permisos…» | La puerta de administración con una llave; "todos los permisos" a mano. |
| «Las partes solo se hablan a través de esas puertas…» | Una flecha de clientes a técnicos pasa por las dos puertas; adentro de clientes, dos servicios unidos por una flecha corta directa. |
| «…que el gateway no tenga lógica del negocio.» | Un recuadro "lógica del negocio" va hacia la puerta de clientes y rebota (se tacha). |
| «Revisa el acceso y la seguridad, y manda cada pedido a donde va.» | Al lado de la puerta: "acceso · seguridad · dirigir" en verde. |
| «El precio también está escrito.» | "precio" a mano en ámbar. |
| «…varias copias para no ser el punto que, si cae…» | Una puerta aparece duplicada; "más servicios que mantener" en ámbar. |

## 4 · Dos puertas distintas (#par)

**Entiende:** las dos puertas tienen la forma de quien llega y de lo que se cuida.
**Forma:** dos mitades; la de Spotlight, el celular y una puerta; la de Sysops Squad, las partes con su puerta cada una.

| Frase | Lo que se dibuja |
|---|---|
| «Spotlight y Sysops Squad pusieron puertas por razones distintas.» | Barrido. Dos mitades con sus nombres; las dos figuras, apagadas. |
| «Spotlight armó una para sus aplicaciones…» | Izquierda se enciende: celular → puerta → servicios; "a la medida de la app" en verde. |
| «Sysops Squad propone una por parte…» | Derecha se enciende: cuatro partes con su puerta; "una por riesgo y carga" en verde. |
| «En los dos casos, la puerta tiene la forma…» | Debajo, a lo ancho: "quién llega" ↔ "qué se cuida", en naranja. |

## 5 · Archivos que no pasan por los servicios (#archivos)

**Entiende:** el archivo va del celular al almacenamiento sin pasar por el servicio; una dirección firmada limita qué se sube y por cuánto tiempo.
**Forma:** el borde con dos caminos: el de abajo pasa por el servicio y lo infla; el de arriba salta al almacenamiento.

| Frase | Lo que se dibuja |
|---|---|
| «Los archivos son un caso aparte.» | Barrido. El celular a la izquierda con un archivo; el borde; el servicio de documentos; el almacenamiento a la derecha (cilindro con nube). |
| «En Spotlight se suben currículums, fotos y documentos…» | Sello de Spotlight. Tres archivos chicos salen del celular: "currículum", foto, documento. |
| «Pasarlos por el servicio de documentos…» | El camino de abajo: celular → servicio → almacenamiento; el servicio se infla (crece) en ámbar; "memoria" a mano. |
| «Así que la aplicación los sube directo…» | El camino de abajo se tacha; arriba, una flecha verde directa del celular al almacenamiento. |
| «El riesgo lo anotó el equipo.» | "riesgo" a mano en ámbar. |
| «Alguien podría subir un archivo enorme…» | Un archivo enorme y uno con "?" van por la flecha directa en rojo. |
| «Lo cubre con direcciones firmadas…» | Una tarjeta "dirección firmada" sobre la flecha directa. |
| «…sirve para un archivo, con su tamaño y su formato, y que vence enseguida.» | En la tarjeta: "un archivo", "tamaño · formato", un reloj; los archivos rojos rebotan. |

## 6 · Quién empieza a hablar (#camara)

**Entiende:** si el de afuera es poco confiable, conviene que pregunte él; el precio es que el cambio no llega al instante.
**Forma:** plataforma a la izquierda, cámara a la derecha; primero la flecha sale de la plataforma; después sale de la cámara, en ciclos.

| Frase | Lo que se dibuja |
|---|---|
| «Wildlife Watcher es un sistema de cámaras…» | Barrido. El mundo de Wildlife Watcher (árbol, cámara atada, ciervo); se achica al sello. |
| «Las cámaras se configuran desde una plataforma.» | Plataforma (pantalla con engranaje) a la izquierda; cámara con batería a la derecha; línea de red punteada entre las dos. |
| «Una opción era que la cámara tuviera una puerta siempre abierta…» | Arriba, "opción 1". Una puerta abierta en la cámara con una antena; la plataforma empuja un punto "cambio". |
| «Eso gasta batería escuchando… el cambio no llega.» | La batería baja a rojo; la red se corta y el punto se pierde. |
| «La otra era que la cámara pregunte cada tanto…» | "opción 2". La puerta se cierra; la cámara manda "¿hay cambios?" hacia la plataforma: un ciclo cortado (✕), el siguiente pasa, y el cambio vuelve con la respuesta. |
| «Ganó la segunda, y el costo quedó escrito.» | "opción 2" en naranja; "opción 1" se apaga. |
| «La configuración ya no llega en el momento…» | Un reloj entre el cambio en la plataforma y la cámara: "llega en el próximo ciclo" en ámbar. |
| «Cuando el de afuera es poco confiable…» | La flecha que sale de la cámara se repasa en naranja. |

## 7 · La pregunta que decide (#pregunta)

| Frase | Lo que se dibuja |
|---|---|
| «En esta región la pregunta es quién entra, por dónde, y quién controla esa puerta.» | Barrido. El tramo del mapa con las cuatro tarjetas; debajo, la pregunta en naranja. |
| «Las aplicaciones propias y los terceros…» | Debajo de cada tarjeta, a mano, el caso: "Sysops Squad", "Spotlight", "Spotlight", "Wildlife Watcher". |
| «Y cada puerta que se agrega es una pieza más…» | La pregunta se borra; "cada puerta, una pieza más que cuidar" en ámbar. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Aplicaciones web y móvil; muchos viajes y datos de más ("over-fetching and under-fetching"); GraphQL en la puerta; REST para terceros | `Pegasuz/ADRs/002.adr-api-standard.md` (Accepted) |
| Un solo servicio que junta datos de varios; punto único de falla; varias zonas de disponibilidad | `Pegasuz/ADRs/004.adr-bff.md` (Accepted) |
| Las cuatro partes de Sysops Squad; un gateway por parte; facturación aislada; administración con todos los permisos; entre partes solo por gateways; sin lógica del negocio; acceso, seguridad, dirigir; más servicios y copias | `Team-7/ADR/ADR-12-gateways.md` (Proposed); `ADR-1-service-based.md` |
| Currículums, fotos, documentos; la memoria que se infla; subida directa; dirección firmada con tamaño, formato y vencimiento | `Pegasuz/quanta/document.md`; `Pegasuz/ADRs/008.adr-upload-directly-to-document-storage.md` (Accepted) |
| Cámaras con batería en la naturaleza; API siempre encendida; cambio que no llega; la cámara pregunta en ciclos; sin configuración en tiempo real | `Celus-Ceals/3.ARDs/003.CameraUpdateStrategy.md` (Accepted) |
| El ciervo, el árbol, el engranaje de la plataforma, los colores de los servicios, "3 viajes / 1 viaje" | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El borde (línea punteada) tiene que leerse igual en las escenas 1, 2, 3 y 5 | Siempre vertical, siempre gris punteado; afuera a la izquierda |
| 1 | Dirección visual | Las puertas necesitan un color propio que no compita con el naranja | Violeta claro para las puertas, como el gateway del bloque 5 |
| 1 | Dirección visual | En la escena 1 son muchas piezas (celular, web, tres servicios, puerta, terceros, dos zonas) | La pantalla web es un ícono chico; los terceros entran abajo, sin cajas extra |
| 1 | Verificador | En Sysops Squad, solo facturación y administración tienen su razón escrita | Solo esas dos puertas llevan ícono y nota |
| 1 | Producción | Hace falta el mundo de Wildlife Watcher | Agregado a `tiza.js` |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 1 | El borde empieza debajo de "para las apps" | La nota de los tres viajes cruzaba la línea punteada |
| 2 | Los servicios de adentro aparecen con el borde; la flecha que cruza la puerta espera al segundo "dónde" | "por donde entra" adelantaba la flecha a la primera frase |
| 3 | "Lógica del negocio" se acerca a la puerta, vuelve, y se tacha con una línea que no tapa el texto; las notas de la izquierda bajan | La cruz grande tapaba la etiqueta y quedaba pegada al sello |
| 4 | Solo el candado de facturación queda en naranja | Había tres naranjas a la vez con la conclusión de abajo |
| 5 | El camino por el servicio se marca con una ✕ chica sobre su flecha, no con una diagonal | La diagonal cruzaba "documentos" y "su memoria se infla" |
| 6 | "El cambio" que vuelve, en tiza; al final queda en naranja solo la pregunta de la cámara | Dos y tres naranjas en el mismo cuadro |
| 7 | Tarjetas más altas; los casos y la pregunta bajan | El "paga" tocaba el borde de la tarjeta |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.
