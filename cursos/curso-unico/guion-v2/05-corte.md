# Bloque 5 · Dónde se corta un sistema

**Enseña:** cada corte con un criterio nombrado; decidir no partir también es una decisión; cada parte puede pedir su propio nivel de servicio.
**Par:** Farmacy Family corta cada dominio con criterios escritos, y decide no partir la seguridad; Sysops Squad corta en cuatro partes por grupos de cualidades.
**Vuelve:** la cuenta de disponibilidad, ahora por parte (Spotlight).

## La segunda fase {#gancho}

**Narración**

Después de Farmacy Food vino una segunda fase, diseñada por otro equipo en otra edición del concurso. Se llama Farmacy Family y suma al negocio una comunidad de salud. Los clientes tienen un perfil, participan en foros, eventos y clases, y pueden compartir sus datos médicos con clínicas y dietistas.

Su equipo tenía que decidir en cuántas piezas partir todo eso. Y lo hizo con una tabla.

**Visual**
- Sello: Farmacy Food, y al lado aparece un segundo sello "Farmacy Family", unido al primero con una flecha "segunda fase".
- Imagen central: el refrigerador del bloque 1 a la izquierda; a la derecha crecen tres íconos: perfil, comunidad (foro, evento, clase), datos médicos (clínica, dietista).
- «al decir "con una tabla"» → los íconos se apartan y aparece una tabla vacía.
- Al final: la tabla vacía.

## Una tabla de criterios {#tabla}

**Narración**

La tabla tiene una fila por función y una columna por criterio. Cuánto cambia esa parte del código, cuánto tiene que crecer, qué pasa si falla, qué tan sensibles son sus datos y de qué otras partes depende. Cada fila termina con un veredicto, partir o juntar.

En la comunidad, el criterio que decidió fue el fallo. La comunidad es lo que el cliente pidió como prioridad, y tiene foros, eventos y clases. Un problema chico en una de esas secciones podía tirar la comunidad entera. Así que la partieron en la parte de administración y la parte de los clientes, y pusieron una interfaz delante de cada sección. Con eso, un fallo no arrastra a lo que no tiene que ver, y cada sección se puede reemplazar por un producto comprado sin tocar el resto.

**Visual**
- Imagen central: la tabla de granularidad, recreada: columnas "cambia", "crece", "si falla", "datos sensibles", "depende de", "veredicto".
- «al decir "una fila por función"» → `construir` filas con nombres (cliente, administrador, comunidad, mensajes, seguridad).
- «al decir "Cada fila termina con un veredicto"» → la última columna se llena con "partir" o "juntar".
- «al decir "el criterio que decidió fue el fallo"» → `enfocar` la columna "si falla" en la fila "comunidad".
- «al decir "podía tirar la comunidad entera"» → transición al diagrama: una frontera "Comunidad" con tres servicios dentro (foros, eventos, clases); uno `caer` y, sin corte, los otros dos también caen (rojo en cadena).
- «al decir "la partieron"» → se rebobina; la frontera se divide en "administración" y "clientes"; delante de foros, eventos y clases aparece una pieza delgada "interfaz" (gateway violeta pequeño). Se repite el fallo: ahora cae solo foros, los demás siguen normales.
- «al decir "un producto comprado"» → eventos se reemplaza por un sistema externo punteado detrás de su interfaz, sin que nada más cambie.
- Al final: la comunidad partida, con interfaces.

## Decidir no partir {#nopartir}

**Narración**

La misma tabla llevó a lo contrario en otra parte. La seguridad tiene dos tareas, comprobar quién es la persona y decidir qué puede ver. El equipo las dejó juntas en una sola pieza.

La razón está escrita. El sistema necesita las dos, y no puede funcionar si una se cae, así que separarlas solo agregaría trabajo. El costo también. Si esa parte crece mucho, va a frenar los despliegues. No partir es una decisión, y se escribe con su razón igual que un corte.

**Visual**
- Imagen central: una pieza "seguridad" con dos mitades dibujadas adentro: "quién es" y "qué puede ver".
- «al decir "las dejó juntas"» → las dos mitades se intentan separar, se tensan, y vuelven a juntarse en una pieza.
- «al decir "no puede funcionar si una se cae"» → simulación: se separan; una `caer`; todo el sistema detrás queda bloqueado (gris). Se rebobina a la pieza única.
- «al decir "va a frenar los despliegues"» → la pieza se agranda lentamente y una fila de "despliegues" en espera se forma detrás.
- «al decir "No partir es una decisión"» → en la tabla, la fila "seguridad" se resalta con su veredicto "juntar".
- Al final: la tabla con dos veredictos resaltados, "partir" (comunidad) y "juntar" (seguridad).

## Por grupos de cualidades {#sysops}

**Narración**

Sysops Squad es el soporte técnico de una empresa de electrónica. Su sistema de tickets es un monolito que pierde tickets, se congela y guarda las tarjetas de los clientes. Su equipo propone cortarlo con otra pregunta. No miró función por función, sino qué cualidades necesitaba cada grupo de funciones, y encontró cuatro grupos.

La parte de los clientes, donde se abren tickets y se edita el perfil, necesita estar disponible y responder rápido. La de los técnicos necesita que el experto, ya en la casa del cliente, encuentre el ticket y la base de conocimiento. La de facturación necesita seguridad, porque guarda tarjetas de crédito. Y la de administración, con reportes, tolera demoras, porque no pasa nada grave si un reporte tarda. El equipo propone poner cada frontera donde cambia la necesidad.

**Visual**
- Sello: Sysops Squad, con la etiqueta "propuesta" (primera aparición del caso).
- «al decir "soporte técnico"» → ilustración breve de un técnico con auricular frente a una pila de tickets; «al decir "pierde tickets"» → un ticket se cae de la pila. Se reduce al sello (auricular).
- Imagen central: el monolito de tickets como un bloque grande que se parte en cuatro.
- «al decir "cuatro grupos"» → el bloque se divide en cuatro fronteras punteadas: clientes, técnicos, facturación, administración (`separar`).
- «al decir "disponible y responder rápido"» → sobre "clientes", dos íconos: un reloj rápido y un ícono de siempre encendido.
- «al decir "el experto, ya en la casa del cliente"» → sobre "técnicos", un teléfono con un ticket y un libro.
- «al decir "guarda tarjetas"» → sobre "facturación", un candado.
- «al decir "tolera demoras"» → sobre "administración", un reloj de arena lento.
- Al final: cuatro fronteras, cada una con sus íconos de cualidad.

## Cada parte, su disponibilidad {#nueves}

**Narración**

Cortar así permite algo más, pedirle a cada parte lo que necesita. Spotlight, una plataforma que acerca empleo a personas subrepresentadas, lo hizo con la disponibilidad.

Para hablar de disponibilidad se usan nueves. Tres nueves, un noventa y nueve coma nueve por ciento, permiten unas nueve horas de caída al año. Cuatro nueves, menos de una hora. Spotlight escribió que cinco nueves eran irrazonables para su caso, porque no maneja vidas ni dinero de forma directa. Y repartió el resto por partes. Las que no dependen de otras para responder, como los reportes, apuntan a tres nueves. Las que sí dependen, como las notificaciones, a cuatro. Con un solo número para todo el sistema, y esto es lectura nuestra, habría que pagar cuatro nueves en todas partes.

**Visual**
- Sello: Spotlight (ícono de foco), entra por primera vez, con su frase de presentación como palabra clave: "empleo para personas subrepresentadas".
- Imagen central: una regla de nueves.
- «al decir "Tres nueves"» → `cifra` "99,9 %" y debajo "≈ 9 h de caída al año"; «al decir "Cuatro nueves"» → "99,99 %" y "< 1 h".
- «al decir "irrazonables"» → "99,999 %" aparece y se tacha; al lado, "no maneja vidas ni dinero de forma directa".
- «al decir "repartió el resto por partes"» → dos fronteras: "reportes" con "99,9 %" y "notificaciones" con "99,99 %". Entre notificaciones y otra parte, una flecha síncrona azul con un reloj (depende para responder).
- «al decir "un solo número para todo el sistema"» → las dos fronteras se fusionan en una con "99,99 %"; aparece un costo grande en naranja; arriba, en 24 px, "lectura nuestra".
- Al final: las dos fronteras separadas con su número.

## Dos preguntas para cortar {#comparacion}

**Narración**

Para cortar un sistema sirven preguntas distintas. Farmacy Family se preguntó, en cada función, qué pasaba si fallaba, qué tan sensible era y cuánto cambiaba. Sysops Squad se preguntó qué cualidades compartía cada grupo de funciones. Con una o con otra, la frontera quedó donde la necesidad cambia, con la razón escrita al lado. Una vez cortado el sistema, cada parte tiene sus datos, y eso trae la pregunta de quién es dueño de cada uno.

**Visual**
- Imagen central: `comparar`. Izquierda, la tabla de Farmacy Family con sus veredictos. Derecha, las cuatro fronteras de Sysops Squad con sus íconos.
- «al decir "qué pasaba si fallaba"» → en la izquierda se resalta la columna "si falla"; «al decir "qué cualidades compartía cada grupo"» → en la derecha se resaltan los íconos.
- «al decir "donde la necesidad cambia"» → en las dos mitades, las fronteras laten a la vez.
- «al decir "quién es dueño de cada uno"» → dentro de cada frontera aparece un cilindro pequeño de base de datos con un signo de pregunta (puente al bloque 6).
- Al final: las dos mitades con sus bases y la pregunta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Farmacy Family mejora el sistema de Farmacy Foods; comunidad, perfiles, datos médicos, clínicas y dietistas | `Archangels/1.ProblemBackground/BusinessGoalsDriversAndRequirements.md` l. 10; `ArchitectureAnalysis.md` |
| Tabla de granularidad con columnas Volatility, Scalability, Fault Tolerance, Data Security, Data Transactions, Data Dependencies, Workflow | `Archangels/1.ProblemBackground/ArchitectureAnalysis.md` l. 67-145 |
| Comunidad como prioridad ("Community is the priority feature") | `Archangels/Clarifications.md` l. 16 |
| "one small problem could take the whole community domain down" | `Archangels/1.ProblemBackground/ArchitectureAnalysis.md` l. 26 |
| ADR-013 (Confirmed): comunidad partida en administración y cliente, con interfaz a clases, foros y eventos; "Faults do not bring unrelated functionality down"; "easy to swap out functionality, e.g. change between home-grown and COTS" | `Archangels/4.ADRs/013-We-will-split-community-domain.md` l. 11-32 |
| ADR-012 (Confirmed): "The Security domain will not be split"; "cannot operate if one goes down, so the overhead of splitting is avoided"; riesgo: "If the domain gets large it will be a bottleneck for deployment" | `Archangels/4.ADRs/012-We-will-combine-authentication-and-athorisation.md` l. 11-32 |
| Sysops Squad (Proposed): cuatro áreas y sus necesidades | `Team-7/ADR/ADR-1-service-based.md` l. 11-16; `README.md` l. 199-205 |
| Spotlight: "5 nines … is unreasonable and 4 nines would also be an overkill"; no maneja vidas ni dinero de forma directa; 3 nueves sin dependencias síncronas (reportes), 4 con dependencias (notificaciones) | `Pegasuz/README.md` l. 138-140; `quanta/quanta-identification.md` l. 9 |
| Tres nueves ≈ 8,8 h de caída al año; cuatro nueves ≈ 53 min | Cálculo estándar (el README de Spotlight da 52,5 min para cuatro nueves) |
| El contrafactual del número único | Lectura nuestra |
| Sysops Squad: soporte de una empresa de electrónica; monolito; pierde tickets; se congela; guarda tarjetas; decisiones en Proposed (presentación del caso, antes en el bloque 1) | `Team-7/README.md` l. 44, 46, 164; `Team-7/ADR/` |
