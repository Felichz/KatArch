# Capítulo 2 · Antes de la IA, el negocio

*Versión «lecture-style» híbrida (skill `guion-curso`). Gancho concreto (la nota al margen), pregunta en una frase, pasos con el caso que vuelve, una sola pausa, cierre sobre el argumento. Sin opiniones del narrador. Los títulos son los pasos de la clase y no se dicen. [PAUSA] = silencio a propósito.*

---

## Una nota al margen

El jueves dieciséis de octubre, por la noche, el equipo guarda el primer borrador de las metas del negocio. Son seis objetivos, casi todos los que uno esperaría encontrar: aumentar los ingresos, crecer en Europa, cumplir con las normas. Y entre ellos hay uno que dice, en inglés, «aprovechar la inteligencia artificial para optimizar». Junto a ese, una integrante del equipo dejó una nota corta. Dice, más o menos: esto no es una meta del negocio, es una solución.

Esa nota separa dos cosas que suelen mezclarse. Una meta dice qué gana la empresa: más ingresos, menos costos, clientes más contentos. Una solución es una forma de conseguirlo, y la inteligencia artificial es una solución. Si la pones como meta, cualquier cosa que lleve inteligencia artificial parece un éxito, aunque no mueva ningún número del negocio.

La reacción del equipo fue gradual. Al día siguiente, ese objetivo cambió de nombre y pasó a llamarse «automatizar capacidades», que sigue siendo una herramienta con otro nombre. Y el domingo, cuando el equipo les puso cifras a sus metas, ya no estaba.

La pregunta de fondo, en este capítulo, es qué tiene que estar escrito antes de decidir dónde va la inteligencia artificial.

## Una cadena de tres eslabones

Entre la nota y las cifras, el viernes diecisiete, el equipo reorganizó todo en una cadena: impulsores, metas y soluciones. Un impulsor es una fuerza que decide si al negocio le va bien o mal; por ejemplo, la eficiencia operativa, o sea, cuánto cuesta mantener la flota funcionando. Una meta es un objetivo que se puede medir y que tiene fecha. Y solo al final aparecen las soluciones, que es donde entra la inteligencia artificial.

Un renglón de su tabla lo muestra. El impulsor es la eficiencia operativa. La meta es bajar un veintitrés por ciento los costos de mantenimiento antes de que termine dos mil veintiséis. Y la solución es usar inteligencia artificial para optimizar el mantenimiento y la ubicación de la flota.

La cadena se puede leer al revés, y de ahí sale su utilidad. Empiezas por la solución y preguntas: ¿qué meta mueve esto? Si no hay respuesta, esa pieza sobra. Es el mismo criterio de la nota al margen, convertido en un procedimiento que cualquiera puede repetir.

## ¿De dónde sale ese veintitrés por ciento?

Ese número lleva a una pregunta: de dónde sale. El cliente no compartió ningún dato económico, así que las metas del equipo las eligió el equipo, este veintitrés por ciento y otras con porcentajes igual de redondos. En el repositorio no hay un cálculo detrás. Eso no invalida las metas, porque fijar una meta es una decisión y no un descubrimiento, pero cambia cuánto se le puede creer a cada cifra.

Para ordenar eso, en este curso usamos tres categorías. Hay números dados, que para el equipo vienen del cliente, como los vehículos del capítulo uno, aunque el cliente los haya elegido en vivo. Hay números calculados, que alguien derivó de otros: la suma de diez mil cuatrocientos vehículos fue nuestra. Y hay números elegidos o supuestos, que nadie dio ni calculó. La tercera categoría es la más difícil de reconocer, porque un número que aparece en una tabla bien alineada se parece a los otros dos.

## Escribir lo que se da por cierto

La misma idea, la de dejar por escrito lo que se da por cierto, la aplicó el equipo en un documento de supuestos y restricciones. Un supuesto es algo que das por cierto para poder avanzar, aunque nadie te lo haya confirmado. Una restricción es algo que te imponen, como operar solo en la Unión Europea. La ventaja de escribirlos es práctica: cualquiera puede ponerlos al lado del encargo y compararlos, y cuando se compara, aparecen diferencias.

El viernes diecisiete, en ese documento, el equipo anotó un supuesto: el GPS de cada vehículo informa su posición cada treinta minutos. El cliente había pedido, como mínimo, un reporte cada treinta segundos. Antes de ver qué pasa, ¿qué se rompe si te quedas con el supuesto del equipo?

[PAUSA]

Se rompe todo lo que necesita saber dónde está un vehículo ahora. Un viaje corto puede empezar y terminar entre dos reportes, y para el sistema ese viaje nunca existió. Y la aplicación le mostraría al cliente scooters que en realidad ya no están ahí, lo contrario de resolver el problema del monumento.

Además, el propio repositorio se contradice. Un documento escrito unos días después habla de treinta segundos, mientras que una decisión de esos mismos días sigue diciendo treinta minutos. No sabemos si fue un error que nadie corrigió o una decisión que no quedó escrita. En este curso seguimos al encargo, que dice treinta segundos, y cada vez que el repositorio diga otra cosa lo vamos a marcar.

## Qué iban a diseñar

Con las metas y los supuestos, quedó también claro qué se iba a diseñar. Primero, lo básico del alquiler, que alguien tenía que mantener funcionando: reservar, abrir, pagar y devolver. Y encima, cuatro áreas con inteligencia artificial. Un asistente dentro de la aplicación, que es el chatbot del capítulo uno. Precios dinámicos, para que el precio cambie según la demanda, el clima o la competencia. Un pronóstico de demanda, para saber dónde se van a necesitar vehículos. Y la optimización del mantenimiento: las baterías, los traslados, las tareas de los operarios.

La lista ya tenía un orden antes de las metas. El miércoles quince, el primer día, la página principal del repositorio nombraba tres áreas, y los precios dinámicos iban primero, aunque el cliente nunca los había mencionado como un problema. El problema del monumento no tenía un área propia. Quedó repartido entre el pronóstico de demanda y el mantenimiento, y eso lo deducimos nosotros, no lo dice el repositorio. Lo dejamos anotado porque ese lugar secundario va a tener consecuencias más adelante.

## La regla que dejó la nota

Entre el jueves y el viernes, el equipo escribió qué quería lograr el negocio antes de discutir con qué herramienta. De esa nota salió una regla que vamos a usar hasta el final del curso: cada pieza de inteligencia artificial tiene que poder señalar qué número del negocio mueve.

Con eso queda contestada la mitad de la segunda pregunta del jurado, la de si la solución encaja en el negocio. La otra mitad, el porqué de cada decisión técnica, empieza con un problema concreto. Miles de vehículos le hablan al sistema cada pocos segundos, y alguien tiene que saber en todo momento la verdad sobre cada uno.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Primer borrador de metas del jueves 16, seis objetivos (ingresos, presencia en la UE, eficiencia operativa, «Leverage AI for Optimization», experiencia del cliente, cumplimiento) | b7d92fb (`requirements/business requirements.md`), verificado contra el repositorio |
| La nota al margen: «not a business goal but a solution» | b7d92fb |
| Al día siguiente pasa a «Automate Capabilities» (viernes 17) | 338c9ec |
| El domingo 19 las metas llevan cifras y el objetivo ya no está | 3f7786d |
| La cadena impulsores → metas → soluciones, del viernes 17 | 338c9ec (Drivers → Goals → Solutions) |
| Renglón: «Operational Efficiency \| Decrease maintenance costs by 23% \| AI for maintenance optimization. AI for supply planning/placement.»; metas para fines de 2026 | 3f7786d, verificado contra el repositorio |
| Otras metas con porcentajes (96 % de satisfacción, +15 % de mercado) | 3f7786d |
| El cliente no compartió el modelo económico | Subtítulos, min 41 |
| Metas sin cálculo detrás | Ausencia comprobada (`HISTORIA.md` §6) |
| Las tres categorías (dado, calculado, elegido o supuesto) | Clasificación del curso |
| Supuesto del GPS cada 30 minutos (viernes 17) | 5c155f1 |
| El cliente pidió «al menos cada 30 segundos» | Subtítulos, min 37–38 |
| El repositorio se contradice: Apéndice A dice 30 segundos; ADR-0021, «IoT messaging is every 30 min only» | 71648c7; ADR-0021 (`HISTORIA.md` §5) |
| Las consecuencias (viajes entre dos reportes, scooters fantasma) | Razonamiento del curso, dicho como tal |
| Cuatro áreas con IA; el asistente es el chatbot (se agrega el 17) | 0d0036f; ADR-0012 |
| README del 15 con tres áreas y los precios dinámicos primero | 57b8370 (`HISTORIA.md` §3) |
| El problema del monumento repartido entre pronóstico y mantenimiento | **Deducción del curso**, dicha como tal |
