# Capítulo 2 · Antes de la IA, el negocio

*Guion narrado, piloto del estilo «razona con ellos». Se lee en voz alta. Los títulos de sección son solo para orientarse: no se dicen. La marca [PAUSA] es el único momento en que la voz se calla a propósito.*

---

## Una nota al margen

El jueves dieciséis de octubre, por la noche, el equipo guarda el primer borrador de las metas del negocio. Son seis objetivos, de los que uno esperaría: aumentar los ingresos, crecer en Europa, cumplir con las normas. Y entre ellos hay uno que dice, en inglés, «aprovechar la inteligencia artificial para optimizar». Junto a ese, una integrante del equipo dejó una nota corta. Dice, más o menos: esto no es una meta del negocio, es una solución.

Esa nota me parece una buena puerta de entrada a este capítulo, porque dice en una línea algo que cuesta ver. Una meta dice qué gana la empresa: más ingresos, menos costos, clientes más contentos. Una solución es una forma de conseguirlo, y la inteligencia artificial es una solución. Si la pones como meta, cualquier cosa que lleve inteligencia artificial parece un éxito, aunque no mueva ningún número del negocio.

Lo que pasó después es lo que me gusta de este equipo: no lo corrigieron de golpe. Al día siguiente, ese objetivo cambió de nombre y pasó a llamarse «automatizar capacidades», que sigue siendo una herramienta con otro nombre. Y el domingo, cuando el equipo les puso cifras a sus metas, ya no estaba.

## La cadena

Entre la nota y las cifras, el viernes diecisiete, el equipo reorganizó todo en una cadena de tres eslabones: impulsores, metas y soluciones. Un impulsor es una fuerza que decide si al negocio le va bien o mal; por ejemplo, la eficiencia operativa, o sea, cuánto cuesta mantener la flota funcionando. Una meta es un objetivo que se puede medir y que tiene fecha. Y recién al final aparecen las soluciones, y ahí es donde entra la inteligencia artificial.

Un renglón de su tabla lo muestra bien. El impulsor es la eficiencia operativa. La meta es bajar un veintitrés por ciento los costos de mantenimiento antes de que termine dos mil veintiséis. Y la solución es usar inteligencia artificial para optimizar el mantenimiento y la ubicación de la flota.

Lo valioso de esa cadena es que se puede leer al revés. Empiezas por la solución y preguntas: ¿qué meta mueve esto? Si no hay respuesta, esa pieza sobra. Funciona como un filtro, y es una de esas ideas que me llevaría a cualquier proyecto, tenga inteligencia artificial o no.

## ¿De dónde sale ese veintitrés por ciento?

Y ya que mencionamos ese número, conviene preguntarse de dónde sale. La respuesta, otra vez, es incómoda. Recuerda que el cliente no compartió ningún dato económico. Así que las metas del equipo, el veintitrés por ciento menos de costos de mantenimiento, el noventa y seis por ciento de satisfacción, el quince por ciento más de mercado, son metas que el equipo eligió. En el repositorio no hay un cálculo detrás. Y eso no está mal: fijar una meta es una decisión, no un descubrimiento. Lo importante es saber qué clase de número tienes delante.

Yo los separo en tres cajones. Hay números dados, que vienen del cliente, como los vehículos del capítulo uno, aunque el cliente los haya inventado en vivo. Hay números calculados, que alguien derivó de otros: la suma de diez mil cuatrocientos fue nuestra. Y hay números elegidos o supuestos, que nadie dio ni nadie calculó. Cada cajón merece una confianza distinta, y el que más cuesta reconocer es el tercero, porque cuando un número aparece en una tabla bien alineada se parece a los otros dos.

## Los supuestos

La misma idea, la de escribir lo que se da por cierto, la aplicó el equipo en un documento de supuestos y restricciones. Un supuesto es algo que das por cierto para poder avanzar, aunque nadie te lo haya confirmado. Una restricción es algo que te imponen, como operar solo en la Unión Europea. La ventaja de escribirlos es muy práctica: cualquiera puede ponerlos al lado del encargo y comparar. Y cuando se compara, aparecen diferencias.

El viernes diecisiete, en ese documento, el equipo anotó un supuesto: el GPS de cada vehículo informa su posición cada treinta minutos. El cliente había pedido, como mínimo, un reporte cada treinta segundos. Antes de que te cuente qué pasa, piénsalo. ¿Qué se rompe si te quedas con el supuesto del equipo?

[PAUSA]

Se rompe todo lo que necesita saber dónde está un vehículo ahora. Un viaje corto puede empezar y terminar entre dos reportes, y para el sistema ese viaje nunca existió. Y la aplicación le mostraría al cliente scooters que en realidad ya no están ahí, que es justo lo contrario de resolver el problema número uno del cliente.

Hay un detalle que me parece todavía más interesante: el propio repositorio se contradice. Un documento escrito unos días después habla de treinta segundos, mientras que una decisión de esos mismos días sigue diciendo treinta minutos. No sabemos si fue un error que nadie corrigió o una decisión que no quedó escrita. En este curso seguimos al encargo, que dice treinta segundos, y cada vez que el repositorio diga otra cosa lo vamos a marcar.

## Qué iban a diseñar

Con las metas y los supuestos puestos, el equipo definió qué iba a diseñar. Primero, lo básico del alquiler, que alguien tenía que mantener funcionando: reservar, abrir, pagar y devolver. Y encima de eso, cuatro áreas con inteligencia artificial. Un asistente dentro de la aplicación, para hablar con el usuario. Precios dinámicos, para que el precio cambie según la demanda, el clima o la competencia. Un pronóstico de demanda, para saber dónde se van a necesitar vehículos. Y la optimización del mantenimiento: las baterías, los traslados, las tareas de los operarios.

Fíjate en el orden. En el primer archivo de presentación del equipo, el del miércoles quince, los precios dinámicos iban primero, aunque el cliente nunca los había mencionado como un problema. Y lo que sí había llamado su mayor desafío, que los vehículos estén donde se los necesita, estaba en la lista, pero no primero: si lo lees bien, vive repartido entre el pronóstico de demanda y el mantenimiento. Eso lo deducimos nosotros. No lo digo como una crítica; lo digo porque ese orden va a tener consecuencias que vamos a ver más adelante, y prefiero que lo hayas notado desde ahora.

## Volver a la nota

Volvamos a la nota al margen. En dos días, el equipo hizo algo que conviene hacer en cualquier proyecto: escribió qué quería lograr el negocio antes de discutir con qué herramienta. Y dejó una regla que vamos a usar hasta el final del curso: cada pieza de inteligencia artificial tiene que poder señalar qué número del negocio mueve.

Eso contesta una parte de la segunda pregunta del jurado, la de si la solución encaja en el negocio. Falta la otra parte, la de entender el porqué de cada decisión técnica, y de eso trata lo que sigue. Porque el equipo, además de metas, tenía un problema bien terrenal: miles de vehículos que le hablan al sistema cada pocos segundos, y alguien que tiene que saber, en todo momento, la verdad sobre cada uno.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Primer borrador de metas del jueves 16, con seis objetivos y uno sobre aprovechar la IA para optimizar («Leverage AI for Optimization») | b7d92fb (`requirements/business requirements.md`). Los otros objetivos (ingresos, Europa, normas) se citan como ejemplos, tal como los lista el guion anterior; **verificar la lista exacta contra el commit** (`HISTORIA.md` dice que el de IA era el cuarto; el guion anterior lo ponía último, por eso aquí no se dice su lugar) |
| La nota al margen: «not a business goal but a solution» | b7d92fb, nota en línea de una integrante |
| Al día siguiente pasa a «Automate Capabilities» (viernes 17) | 338c9ec |
| El domingo 19 las metas llevan cifras y el objetivo ya no está | 3f7786d |
| La cadena impulsores → metas → soluciones, del viernes 17 | 338c9ec (Drivers → Goals → Solutions) |
| Renglón de ejemplo: eficiencia operativa; meta de bajar 23 % los costos de mantenimiento a fines de 2026; solución de IA para mantenimiento y ubicación de la flota | `requirements/` (metas con cifras, 3f7786d), tal como lo resume el guion anterior; **verificar la redacción exacta del renglón** |
| Las otras metas: 96 % de satisfacción, +15 % de mercado | 3f7786d |
| El cliente no compartió el modelo económico | Subtítulos, min 41 («no lo inventé») |
| Metas sin cálculo detrás en el repositorio | Ausencia comprobada (`HISTORIA.md` §6, «base de las cifras de negocio») |
| Los tres cajones (dado, calculado, supuesto) | Clasificación del curso |
| Supuesto del GPS cada 30 minutos (viernes 17) | 5c155f1 |
| El cliente pidió «al menos cada 30 segundos» | Subtítulos, min 37–38 |
| El repositorio se contradice: el Apéndice A dice cada 30 segundos; el ADR-0021 dice «IoT messaging is every 30 min only» | 71648c7 y ADR-0021 (`HISTORIA.md` §5, inconsistencia 2) |
| Las consecuencias (viajes entre dos reportes, scooters fantasma) | Razonamiento del curso, dicho como tal |
| Las cuatro áreas con IA; primer README del 15 con los precios dinámicos primero | 57b8370 (15 de octubre, tres áreas: precios, pronóstico, mantenimiento); el asistente se agrega el 17 (`HISTORIA.md` §4) |
| El problema número uno vive entre pronóstico y mantenimiento | **Deducción del curso**; el narrador la dice como tal |
| «Los precios dinámicos van primero aunque el pliego no los nombra como problema» | `HISTORIA.md` §3, miércoles 15 |
