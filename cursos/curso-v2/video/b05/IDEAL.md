# Bloque 5 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano. Se escribe y se revisa antes de animar (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo y medidas: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`): con la voz cambian los segundos, no las anclas.

**La idea del bloque en una imagen:** una frontera que pasa justo donde la necesidad cambia: de un lado la falla se queda adentro; del otro, cada parte con su propio número.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **La tabla de criterios** (filas de funciones, columnas de criterios, con valores reales de la tabla) | Cada corte se decide con criterios escritos | Escenas 2, 3 y 6 |
| **La falla que se propaga o se queda** (tres secciones dentro de una frontera; una cae: sin corte caen todas, con corte e interfaces cae una sola) | El criterio del fallo: cortar contiene la falla | Escena 2 |
| **Dos mitades que no se separan** (una pieza con "quién es" y "qué puede ver"; separadas, si una cae, se cae todo) | No partir también es una decisión, con su razón | Escena 3 |
| **El bloque que se parte en cuatro, cada parte con su cualidad** | Sysops Squad corta donde cambia la cualidad que se necesita | Escenas 4 y 6 |
| **La regla de nueves y las partes con su número** | Cada parte puede pedir su propio nivel de servicio | Escena 5 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que sigue funcionando; ámbar lo que se paga; rojo solo la falla.

## 0 · Estás aquí

`T.aqui(5)`, "Bloque 5", "Dónde se corta un sistema". Se barre antes de la primera palabra.

## 1 · La segunda fase (#gancho)

**Entiende:** Farmacy Family es la segunda fase de Farmacy Food, con una comunidad de salud; su equipo tenía que decidir en cuántas piezas partirla, y lo hizo con una tabla.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Después de Farmacy Food vino una segunda fase…» (7,6 s) | Desde la primera palabra, a la izquierda, el refrigerador de Farmacy Food en chico (260 px de alto) con "Farmacy Food" a mano. **«segunda fase»**: una flecha hacia la derecha con "segunda fase" a mano encima. |
| «Se llama Farmacy Family y suma al negocio una comunidad de salud.» (4,9 s) | **«Farmacy Family»**: a la derecha, el mundo de Farmacy Family (el refrigerador rodeado de personas, un globo de foro, una agenda y un corazón), dos tercios del alto. |
| «Los clientes tienen un perfil, participan en foros, eventos y clases, y pueden compartir sus datos médicos con clínicas y dietistas.» (10,1 s) | El refrigerador chico y la flecha se borran; el mundo se corre a la izquierda. A la derecha, una columna de rótulos que aparecen al nombrarse: **«perfil»**, **«foros, eventos y clases»**, **«datos médicos»** (con "clínicas y dietistas" debajo, más chico). |
| «Su equipo tenía que decidir en cuántas piezas partir todo eso.» (4,6 s) | El mundo se achica al sello "Farmacy Family". Los rótulos se juntan en una caja grande; **«cuántas piezas»**: líneas punteadas de corte la cruzan, con "?" naranja. |
| «Y lo hizo con una tabla.» (1,8 s) | La caja se borra; se traza el marco de la tabla. |

## 2 · Una tabla de criterios (#tabla)

**Entiende:** la tabla tiene una fila por función y una columna por criterio; en la comunidad decidió el fallo: un problema chico tiraba todo, así que la partieron y pusieron interfaces; la falla queda adentro y una sección se puede cambiar por un producto comprado.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «La tabla tiene una fila por función y una columna por criterio.» (4,7 s) | **«fila»**: cuatro filas: "administrar el foro", "leer el foro", "autenticación", "autorización". **«columna»**: cinco columnas. |
| «Cuánto cambia esa parte del código, cuánto tiene que crecer, qué pasa si falla, qué tan sensibles son sus datos y de qué otras partes depende.» (11,0 s) | Cada encabezado al nombrarse: "cambia", "crece", "si falla", "datos sensibles", "depende de". Las casillas se llenan con los valores reales, en 26 px (medio, bajo uso, separar de clientes, alta; bajo, uso medio, separar de administración, baja; bajo, no hace falta, no una sin la otra, alta). |
| «Y cada grupo de filas termina en una decisión escrita, partir o juntar.» (4,0 s) | Debajo de las dos filas del foro, una hoja chica "ADR-013 · partir"; debajo de las dos de seguridad, "ADR-012 · juntar". |
| «En la comunidad, el criterio que decidió fue el fallo.» (4,1 s) | La columna "si falla" de las filas del foro se encierra en naranja; lo demás al 35 %. |
| «La comunidad es lo que el cliente pidió como prioridad, y tiene foros, eventos y clases.» (6,8 s) | La tabla se borra. Una frontera grande "Comunidad", con "prioridad" a mano; **«foros, eventos y clases»**: tres cajas adentro. |
| «Un problema chico en una de esas secciones podía tirar la comunidad entera.» (5,6 s) | **«problema»**: "foros" se tacha en rojo; **«entera»**: las otras dos se apagan en rojo, una tras otra. |
| «Así que la partieron en la parte de administración y la parte de los clientes.» (5,0 s) | Todo vuelve a blanco. **«partieron»**: una línea vertical divide la frontera: "administración" a la izquierda, "clientes" a la derecha. |
| «Delante de cada sección pusieron una interfaz, una puerta de entrada propia por la que el resto le habla.» (8,8 s) | **«interfaz»**: delante de cada sección, una barra angosta violeta (la puerta), y flechas de las dos partes hacia las puertas. |
| «Con eso, un fallo no arrastra a lo que no tiene que ver, y cada sección se puede reemplazar por un producto comprado sin tocar el resto.» (10,5 s) | **«un fallo»**: "foros" se tacha en rojo; las otras dos siguen en verde. **«producto comprado»**: la caja "eventos" se vuelve punteada (un producto de afuera), detrás de su misma puerta. |

## 3 · Decidir no partir (#nopartir)

**Entiende:** la autenticación y la autorización quedaron juntas porque el sistema no funciona sin las dos; el costo es que esa pieza puede frenar los despliegues; no partir se escribe igual que un corte.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «La misma tabla llevó a lo contrario en otra parte.» (3,8 s) | Una caja grande "seguridad" al centro (700 × 300). |
| «La seguridad tiene dos tareas… autenticación y autorización.» (10,0 s) | Adentro, dos mitades: **«quién es»** "quién es" con un ícono de llave; **«qué puede ver»** "qué puede ver" con un ojo. **«autenticación»** y **«autorización»**: debajo de cada mitad, el nombre en tipografía limpia. |
| «El equipo las dejó juntas en una sola pieza.» (3,3 s) | La línea del medio se apaga; el borde se repasa en naranja. |
| «La razón está escrita.» (1,6 s) | Al costado, una hoja chica "ADR-012". |
| «El sistema necesita las dos, y no puede funcionar si una se cae, así que separarlas solo agregaría trabajo.» (8,2 s) | **«si una se cae»**: abajo, en chico, las dos mitades separadas; "qué puede ver" se tacha en rojo y una fila de pantallas (el resto del sistema) se apaga en rojo. **«agregaría trabajo»**: el dibujo de abajo se borra. |
| «El costo también.» (1,2 s) | "costo" a mano en ámbar. |
| «Si esa parte crece mucho, va a frenar los despliegues.» (4,1 s) | La caja crece un poco; detrás, una fila de cuatro cajitas "despliegue" en ámbar, esperando. |
| «No partir es una decisión, y se escribe con su razón igual que un corte.» (5,6 s) | Lado a lado, chicas: "ADR-013 · partir" y "ADR-012 · juntar", con la misma forma. |

## 4 · Por grupos de cualidades (#sysops)

**Entiende:** Sysops Squad propone cortar su monolito por grupos de cualidades: cuatro partes, cada una con lo que necesita.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Sysops Squad es el soporte técnico de una empresa de electrónica.» (4,8 s) | Barrido. El mundo de Sysops Squad (el monolito, la pila de tickets, el auricular), dos tercios de la pantalla. |
| «Su sistema de tickets es un monolito que pierde tickets, se congela o se cae seguido, y guarda las tarjetas de los clientes.» (9,5 s) | **«pierde tickets»**: el ticket rojo de abajo cae fuera de la pila. **«tarjetas»**: una tarjeta de crédito chica junto al monolito. Al final, el mundo se achica al sello, con "propuesta" a mano al lado. |
| «Su equipo propone cortarlo con otra pregunta.» (3,3 s) | Al centro, el monolito grande (1100 × 560), una sola caja. |
| «No miró función por función, sino qué cualidades necesitaba cada grupo de funciones, y encontró cuatro grupos.» (8,4 s) | **«cuatro grupos»**: dos líneas punteadas parten la caja en cuatro, que se separan un poco. |
| «La parte de los clientes… disponible y responder rápido.» (8,9 s) | Cuadrante 1: "clientes"; **«disponible»** chip verde "disponible"; **«rápido»** chip "rápida". |
| «La de los técnicos necesita que el experto… encuentre el ticket y la base de conocimiento.» (9,0 s) | Cuadrante 2: "técnicos"; un teléfono con un ticket y un libro. |
| «La de facturación necesita seguridad, porque guarda tarjetas de crédito.» (5,4 s) | Cuadrante 3: "facturación"; candado y la tarjeta. |
| «Y la de administración, con reportes, tolera demoras…» (7,8 s) | Cuadrante 4: "administración"; un reloj de arena y "puede esperar". |
| «El equipo propone poner cada frontera donde cambia la necesidad.» (4,7 s) | Las cuatro fronteras se repasan en naranja a la vez. |

## 5 · Cada parte, su disponibilidad (#nueves)

**Entiende:** cortar permite pedirle a cada parte lo que necesita; Spotlight pide tres nueves a lo que no depende de otros y cuatro a lo que sí; con un solo número, habría que pagar el más alto en todas partes.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Cortar así permite algo más, pedirle a cada parte lo que necesita.» (5,0 s) | Las cuatro partes de Sysops Squad, chicas, arriba; cada una se repasa una vez en naranja. |
| «Spotlight, una plataforma que acerca empleo a personas subrepresentadas, lo hizo con la disponibilidad.» (7,8 s) | Las partes se borran. El mundo de Spotlight (un foco que ilumina a una persona con un maletín), dos tercios del alto; al final se achica al sello. |
| «Para hablar de disponibilidad se usan nueves.» (3,3 s) | Una regla horizontal con tres marcas. |
| «Tres nueves… unas nueve horas de caída al año.» (7,5 s) | Primera marca: "99,9 %" en 96 px y "≈ 9 h caído al año". |
| «Cuatro nueves, menos de una hora.» (2,6 s) | Segunda marca: "99,99 %" y "< 1 h". |
| «Spotlight escribió que cinco nueves eran irrazonables… vidas ni dinero de forma directa.» (8,9 s) | Tercera marca: "99,999 %", que se tacha en rojo. "ni vidas ni dinero" a mano. |
| «Y repartió el resto por partes.» (2,3 s) | La regla se achica arriba. |
| «Agrupó los servicios que se llaman esperando respuesta… quantum.» (8,9 s) | Abajo, dos fronteras. En la derecha, tres servicios unidos por flechas azules con un relojito (esperan); **«quantum»**: "quantum" a mano en la frontera. |
| «Los que no dependen de otros para responder, como los reportes, apuntan a tres nueves.» (6,6 s) | Frontera izquierda: un servicio solo, "reportes"; "99,9 %" en verde. |
| «Los que sí dependen, como las notificaciones, a cuatro.» (4,3 s) | Frontera derecha: "notificaciones"; "99,99 %" en naranja. |
| «Con un solo número para todo el sistema… cuatro nueves en todas partes.» (8,8 s) | "lectura nuestra" a mano en ámbar arriba. Las dos fronteras se juntan en una con "99,99 %" en ámbar, y "más caro" a mano. |

## 6 · Dos preguntas para cortar (#comparacion)

**Entiende:** dos preguntas distintas (qué pasa con cada función; qué cualidades comparte cada grupo) llevan a fronteras donde la necesidad cambia, con su razón escrita.

| Frase (duración) | Lo que se dibuja |
|---|---|
| «Para cortar un sistema sirven preguntas distintas.» (3,7 s) | Barrido. Dos mitades, "Farmacy Family" y "Sysops Squad" a mano. |
| «Farmacy Family se preguntó, en cada función, qué pasaba si fallaba…» (8,3 s) | Izquierda: la tabla chica con la columna "si falla" en naranja. |
| «Sysops Squad se preguntó qué cualidades compartía cada grupo de funciones.» (5,5 s) | Derecha: las cuatro partes con sus chips de cualidad en naranja. |
| «Con una o con otra, la frontera quedó donde la necesidad cambia… y cada parte puede pedir lo suyo.» (10,0 s) | **«la frontera»**: en las dos mitades, una línea de corte se repasa en naranja a la vez. **«razón escrita»**: una hoja chica al lado de cada una. **«lo suyo»**: debajo, "partir · juntar" a la izquierda y "cada parte, su cualidad" a la derecha. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Farmacy Family: comunidad de salud; perfil, foros, eventos y clases, datos médicos con clínicas y dietistas | `Archangels/1.ProblemBackground/BusinessGoalsDriversAndRequirements.md`; `ArchitectureAnalysis.md` |
| Las filas y valores de la tabla (administrar el foro: medio, bajo uso, separar de clientes, alta; leer el foro: bajo, uso medio, separar de administración, baja; autenticación y autorización: bajo, no hace falta, no una sin la otra, alta) | `Archangels/1.ProblemBackground/ArchitectureAnalysis.md` ("System Granularity") |
| "ADR-013 · partir", "ADR-012 · juntar" (Confirmed) | `Archangels/4.ADRs/012-…`, `013-…` |
| Comunidad como prioridad; un problema chico tira la comunidad | `Archangels/Clarifications.md` l. 16; `ArchitectureAnalysis.md` l. 26 |
| La falla que queda adentro; cambiar una sección por un producto comprado | `Archangels/4.ADRs/013-We-will-split-community-domain.md` (Consequences) |
| El costo: freno de los despliegues | `Archangels/4.ADRs/012-…` (Risks) |
| Las cuatro partes de Sysops Squad y sus cualidades (propuesta) | `Team-7/ADR/ADR-1-service-based.md` (Proposed) |
| 99,9 % ≈ 9 h; 99,99 % < 1 h; 99,999 % tachado; reportes 3 nueves, notificaciones 4; quantum; el quantum de notificaciones con sus servicios de correo y SMS | `Pegasuz/README.md` l. 138-140; `Pegasuz/quanta/quanta-identification.md`; cálculo estándar |
| "lectura nuestra" (un solo número) | Lectura del curso |
| Los mundos, el foco, las personas, las pantallas que se apagan | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Verificador | La tabla original no tiene columna de veredicto (el guion lo decía): el partir o juntar vive en la columna del fallo y en el ADR de cada área | Corregido en el guion; en pantalla, valores reales y una hoja ADR por grupo de filas |
| 1 | Diseño del aprendizaje | La forma "decisión en su hoja" vuelve igual para partir y para juntar (lado a lado en la escena 3) | Se mantiene |
| 1 | Arquitecto senior | La caída en cadena de la escena 2 es ilustración de "podía tirar la comunidad entera", no un hecho medido | Se dibuja como lo dice el equipo; queda en la tabla como ilustración |
| 1 | Espectador de prueba | "Quantum" llega con el dibujo de los servicios que esperan, antes de la palabra | Sin cambios |
| 1 | Dirección visual | La tabla con cinco columnas y valores en 26 px es el texto más chico del bloque; se lee a la mitad de tamaño solo si la tabla ocupa todo el ancho | Tabla a todo el ancho, filas de 110 px |
| 1 | Guionista | Las anotaciones no pasan de seis palabras | Sin cambios |
| 1 | Producción | Hacen falta los mundos de Farmacy Family y Spotlight | Agregados a `tiza.js` (no cambian lo ya producido) |
| 2 | Los siete | Lectura seguida sin hallazgos nuevos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 2 | "puerta de entrada" va debajo de las secciones, dentro de la frontera | Al costado cruzaba el borde de la comunidad |
| 3 | "despliegues esperando" va debajo de la fila | A la derecha se cortaba en el borde |
| 4 | El ticket que cae va a la derecha de la pila | Debajo pisaba el nombre del caso |
| 5 | El quantum de notificaciones muestra sus servicios reales (correo, SMS) | Al animar se habían usado nombres inventados |
| 5 | "99,99 % en todas partes" y "más caro" van a la izquierda; "lectura nuestra" bajo la regla | Tapaban la caja de SMS y las marcas de la regla |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.

| Plano | Estado |
|---|---|
| 0 · Estás aquí | |
| 1 · La segunda fase | |
| 2 · Una tabla de criterios | |
| 3 · Decidir no partir | |
| 4 · Por grupos de cualidades | |
| 5 · Cada parte, su disponibilidad | |
| 6 · Dos preguntas para cortar | |
