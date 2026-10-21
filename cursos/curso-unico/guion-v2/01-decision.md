# Bloque 1 · Qué es una decisión de arquitectura

**Enseña:** qué hace que una decisión sea de arquitectura; el trade-off; el ADR y sus cuatro partes.
**Par:** el ADR de ClearView que decide compartir la base (deja ver bien el contexto y el costo) y el ADR de retención de fotos de MobilityCorp (las cuatro partes juntas).
**Cambio respecto de la versión 1:** DataDog sale de este bloque (su premisa envejeció) y pasa al bloque de comprar, construir y crecer.
**Cambio aprobado (ver `ACTO1-CONTINUIDAD.md` y la revisión por sombreros al final):** abre ubicando a ClearView; se va la escena de los cinco casos (cada caso se presenta donde se usa por primera vez); la "primera ley" se atribuye a Ford y Richards; "una decisión trae la siguiente" queda solo en el cierre; la comparación final muestra solo lo que tiene el ADR de ClearView. Pasa de unos 5:50 a unos 4:40.

## Una base para cuatro {#decision}

**Narración**

En ClearView, la plataforma que empareja a personas que buscan trabajo con puestos, cada candidato tiene una historia anónima de lo que sabe hacer. Esa historia la usan cuatro servicios distintos. El que guarda a los candidatos, el que escribe la historia, el que empareja y el de las empresas. El equipo tenía que decidir dónde vive esa historia.

Lo habitual sería darle a cada servicio su propia base de datos. ClearView decidió lo contrario, que esos servicios compartan una sola base.

**Visual**
- Sello: ClearView. Ícono del diagrama maestro en la esquina.
- Imagen central: una tarjeta "historia" en el centro (sin nombre ni foto) y cuatro servicios alrededor.
- Desde la primera palabra → aparece la tarjeta en el centro; «al decir "historia anónima"» se resalta.
- «al decir "cuatro servicios distintos"» → `construir` los cuatro servicios en cruz: Candidatos (arriba), Historia (derecha), Emparejamiento (abajo), Empresas (izquierda). Una línea gris de cada uno hacia la tarjeta.
- «al decir "su propia base de datos"» → bajo cada servicio aparece un cilindro chico, cada uno con una copia de la tarjeta.
- «al decir "compartan una sola base"» → los cuatro cilindros se deslizan al centro y se funden en uno solo, debajo de la tarjeta; las cuatro líneas llegan ahora al mismo cilindro.
- Al final: cuatro servicios y una base compartida en el centro.

## Qué la hace de arquitectura {#arquitectura}

**Narración**

¿Por qué esto es una decisión de arquitectura, y elegir el nombre de una variable no lo es? Por dos cosas.

Primero, cuesta mucho cambiarla después. Si un día hay que separar esa base, hay que mover los datos y cambiar los cuatro servicios a la vez, porque los cuatro se apoyan en ella.

Segundo, cambia cualidades del sistema entero, como cuánto cuesta o qué tan fácil es mantenerlo. El equipo escribió lo que gana, menos bases que pagar y un sistema más simple. Y escribió lo que pierde. El sistema se vuelve más difícil de mantener y de probar, y los datos quedan más expuestos a que alguien los rompa. Además, una falla en la base alcanza a todos.

**Visual**
- Imagen central: el mismo diagrama.
- «al decir "una variable"» → a la izquierda, chica, una línea de código `const historia = …` que cambia a `const story = …` sin que nada más se mueva.
- «al decir "cuesta mucho cambiarla después"» → el código desaparece; sobre la base compartida aparece un intento de separarla (se parte en cuatro); los cuatro servicios tiemblan y se iluminan en naranja a la vez.
- «al decir "lo que gana"» → a la derecha, columna "gana": "menos bases" y "más simple", en verde.
- «al decir "lo que pierde"» → debajo, columna "pierde": "mantener", "probar", "integridad de los datos", "una falla alcanza a todos", en naranja.
- «al decir "una falla en la base alcanza a todos"» → la base `caer`; los cuatro servicios pasan a gris a la vez.
- Al final: el diagrama con las dos columnas.

## Todo es un trade-off {#tradeoff}

**Narración**

Esa lista tiene dos columnas, y no hay forma de quedarse con una sola. Neal Ford y Mark Richards, los que presentan el concurso, lo resumen en lo que llaman la primera ley de la arquitectura de software. Todo en arquitectura de software es un trade-off. Lo que se gana con una opción se paga con otra cosa.

La opción sin costo no existe. Decidir bien es saber qué se paga, y por qué conviene pagarlo.

**Visual**
- Imagen central: una balanza simple.
- «al decir "dos columnas"» → las columnas "gana" y "pierde" se vuelven los dos platos de una balanza.
- «al decir "primera ley"» → arriba, chico, "la primera ley de la arquitectura de software · Ford y Richards".
- «al decir "trade-off"» → la palabra "trade-off" abajo al centro, en 56 px, durante 3 segundos.
- «al decir "la opción sin costo"» → aparece un plato vacío, se tacha y desaparece.
- «al decir "por qué conviene pagarlo"» → la balanza se inclina hacia "gana"; sobre ella, la palabra "costo y simplicidad" en naranja.
- Al final: la balanza.

## La decisión, por escrito {#adr}

**Narración**

ClearView dejó esa elección en un documento corto, con un formato que usan todos los ganadores. Se llama ADR, por architecture decision record, el registro de una decisión de arquitectura.

Además de lo que se decidió, un ADR completo responde cuatro cosas. Por qué había que decidir, qué otras opciones había, qué cuesta lo elegido y qué requisito del cliente pide la decisión. En el de ClearView se ven bien la primera y la tercera. La razón, que varios servicios necesitan los mismos datos. Y el costo, en dos listas, lo que se fortalece y lo que se debilita.

Ese costo, además, tuvo una respuesta. El equipo anotó que compartir la base podía terminar en que cualquiera cambie cualquier cosa. Y escribió una segunda decisión para contenerlo, que cada dato tenga un solo servicio con derecho a escribirlo.

**Visual**
- Imagen central: un documento (hoja con esquina doblada) con cuatro franjas.
- «al decir "ADR"» → la hoja aparece con sus cuatro franjas en contorno, sin texto (la hoja no queda vacía mientras se explica la sigla); arriba, "ADR"; la sigla se expande en "architecture decision record" durante 3 segundos y vuelve a "ADR".
- «al decir "Por qué había que decidir"» → franja 1 "contexto"; «"qué otras opciones"» → franja 2 "alternativas"; «"qué cuesta"» → franja 3 "costo"; «"qué requisito"» → franja 4 "requisito".
- «al decir "la primera y la tercera"» → las franjas 1 y 3 se resaltan.
- «al decir "varios servicios necesitan los mismos datos"» → en la franja 1, la miniatura de los cuatro servicios y la base.
- «al decir "lo que se fortalece y lo que se debilita"» → en la franja 3, dos listas cortas: "costo, simplicidad" en verde; "mantener, probar, integridad, fallas" en naranja.
- «al decir "una segunda decisión"» → a la derecha aparece una segunda hoja, ADR-015, unida a la primera por una flecha naranja que sale de la franja de costo.
- «al decir "un solo servicio con derecho a escribirlo"» → en la segunda hoja, un candado con "un escritor por dato".
- Al final: dos hojas unidas por la flecha.

## Las cuatro juntas {#completo}

**Narración**

Las cuatro partes juntas se ven en una decisión de MobilityCorp, una empresa que alquila scooters, bicicletas, autos y camionetas eléctricos. La decisión fija cuánto tiempo se guardan las fotos que se sacan de los vehículos.

Arranca citando, por su número, los tres requisitos de los que nace. Son la verificación al devolver el vehículo, la inspección antes del alquiler y la revisión de limpieza con inteligencia artificial. Después descarta tres alternativas, cada una con su razón, y cierra con una tabla de cinco riesgos y cómo se reduce cada uno.

Ese número es lo que vuelve revisable la decisión. Con él, cualquiera puede ir al requisito, leerlo y comprobar si lo decidido lo cumple, sin preguntarle a quien lo escribió.

Juntos, los dos documentos muestran lo que una decisión escrita le da a quien llega después. El de ClearView deja ver qué se pagó, y hasta qué decisión trajo ese precio. El de MobilityCorp ata la decisión a lo que la pide.

**Visual**
- Sello: MobilityCorp. Desde la primera palabra, ilustración breve con volumen: un auto eléctrico y un teléfono que le saca una foto; se reduce al sello. Sin pantalla vacía al pasar desde la escena anterior.
- Imagen central: `comparar`. A la izquierda, el ADR de ClearView solo con sus franjas de contexto y costo, y la flecha a ADR-015; no se dibujan franjas vacías. A la derecha, el ADR de MobilityCorp, misma disposición.
- «al decir "citando, por su número"» → en la franja 4 del ADR de MobilityCorp aparecen `FR-CV-007`, `FR#2M`, `FR#2L`, y al lado de cada una su nombre en español en 30 px.
- «al decir "descarta tres alternativas"» → franja 2: tres líneas tachadas con una palabra de razón cada una.
- «al decir "cinco riesgos"» → franja 3: una mini tabla de cinco filas.
- «al decir "Ese número"» → una flecha naranja sale de `FR#2L` hacia una hoja de requisito que se abre; su línea se resalta.
- «al decir "deja ver qué se pagó"» → izquierda, se resaltan la franja de costo y la flecha a ADR-015; «al decir "ata la decisión a lo que la pide"» → derecha, se resalta la franja de requisito.
- Al final: los dos documentos lado a lado, cada uno con su franja resaltada.

## Una decisión trae la siguiente {#cierre}

**Narración**

La base compartida de ClearView parecía una decisión chica, una forma de ahorrar. Pero dejó escrito su precio, y ese precio pidió otra decisión, la de un solo escritor por dato. Las decisiones de arquitectura casi nunca vienen solas.

Por eso se escriben con su costo y con lo que las pide. Así, quien herede el sistema puede seguir el hilo, ver qué se pagó y por qué, y saber qué tiene que revisar el día que algo cambie.

**Visual**
- Imagen central: las dos hojas, ADR-014 y ADR-015, unidas por la flecha.
- «al decir "una forma de ahorrar"» → sobre ADR-014 aparece una moneda.
- «al decir "ese precio pidió otra decisión"» → la flecha naranja recorre de la franja de costo de ADR-014 a ADR-015.
- «al decir "casi nunca vienen solas"» → a la derecha de ADR-015 aparece una tercera hoja tenue, vacía, con una flecha punteada hacia ella.
- «al decir "con su costo y con lo que las pide"» → en la hoja vacía se resaltan las franjas de costo y requisito.
- Al final: las tres hojas en cadena, la última vacía. Fundido.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ADR-014 (Accepted): la historia ("the object story") la usan Job candidate, Story, Matching y Employer; la arquitectura basada en servicios permite compartir la base; "Services may access the same DB" | `Pragmatic/ADR/ADR-014-multiple-services-on-same-database.md` |
| Fortalece: "Cost (fewer DBs)", "Simplicity". Debilita: "Maintainability", "Testability", "Data integrity", "Fault tolerance" | ADR-014, secciones Strengthened y Weakened |
| "May lead to chaotic coupling. Therefore, we added ADR-015" | ADR-014, Consequences |
| ADR-015 (Accepted): "For each object in a DB only one service has the right to write to the database." | `Pragmatic/ADR/ADR-015-schema-ownership-and-permissions.md` |
| "Si un día hay que separar esa base, hay que mover los datos y cambiar los cuatro servicios" | Explicación del curso a partir de ADR-014 |
| "Everything in software architecture is a trade-off. First Law of Software Architecture" | `Team-7/README.md` (lo cita el equipo de Sysops Squad) |
| La primera ley es de Ford y Richards (*Fundamentals of Software Architecture*) | Conocimiento externo al corpus |
| Todos los ganadores usan ADR | Inventario de los doce repositorios (`cursos/_investigacion/inventario/`) |
| MobilityCorp alquila scooters, bicicletas, autos y camionetas eléctricos ("connected scooters, e-bikes, cars, and vans") | `Five-Nines/README.md` l. 95 |
| MobilityCorp ADR-0017: cita FR-CV-007, FR#2M y FR#2L; tres alternativas rechazadas con razón; tabla de cinco riesgos con mitigación | `Five-Nines/adrs/ADR-0017 - Photo Retention Policy…md` |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El bloque contesta la primera pregunta de la apertura; el par ClearView / MobilityCorp se compara en voz alta; tras la idea pesada (las cuatro partes) viene el caso concreto | Sin cambios de estructura |
| 2 | Arquitecto senior | "Cuatro cosas" del ADR dejaba afuera lo que se decide; "cualidades del sistema entero" se usaba sin decir qué son | "Además de lo que se decidió…"; "como cuánto cuesta o qué tan fácil es mantenerlo" |
| 3 | Verificador | "En Europa" no está dicho en el repo de MobilityCorp; la primera ley es conocimiento externo | Se quita "en Europa"; fila nueva con la fuente de la presentación; la ley queda marcada como externa |
| 4 | Guionista | Dos "no X, sino Y" en el bloque; "lo llaman" sin antecedente claro; "quien llega después" dos veces en un minuto; el comienzo repetía casi igual la frase de la apertura | Se reescriben las cuatro frases |
| 5 | Espectador de prueba | "Como sus servicios son pocos y grandes, podía hacerlo" da una razón que no se entiende sin el bloque 4 | Se corta; el bloque 4 lo explica con el estilo |
| 6 | Dirección visual | La hoja del ADR quedaba vacía mientras se explica la sigla; pantalla vacía al entrar a MobilityCorp; franjas vacías en la comparación | Franjas en contorno desde el comienzo; MobilityCorp desde la primera palabra; la comparación muestra solo lo que ClearView tiene |
| 7 | Producción | Se va la escena `elenco`; los demás ids se mantienen | Borrar `compositions/elenco.html` y regenerar narración, voz y tiempos |
