# Qué es una decisión de arquitectura

## Lección 1 {#intro}

Este es un curso sobre cómo se diseña un sistema de software entero. No trata de un lenguaje ni de una herramienta. Trata de las decisiones que dan forma a un sistema antes de escribir la primera línea de código: qué partes tiene, cómo se hablan, qué pasa cuando algo falla, dónde viven los datos que no se pueden perder. Son decisiones que se suelen aprender con los años, proyecto a proyecto, muchas veces equivocándose.

Para enseñarlas, el curso usa un material poco común. O'Reilly organiza unas competencias de diseño que se llaman Architecture Katas, y el curso usa lo que dejaron escrito los equipos que las ganaron entre 2020 y 2025. Leímos sus doce repositorios, comparamos lo que decidieron y nos quedamos con lo que se repite y se sostiene.

## Qué vas a poder hacer {#ruta}

La idea es que al terminar, frente a un sistema nuevo, sepas qué decisiones hay que tomar, en qué orden, y cómo justificar cada una con lo que cuesta.

El curso sigue ese mismo orden. Empieza por cómo se decide qué importa en un sistema y a qué se renuncia para conseguirlo. Sigue con cómo se corta el sistema en partes, de quién es cada dato y cómo se hablan esas partes, también cuando algo falla. Y termina con temas que cruzan todo lo anterior, como los datos sensibles, lo que conviene comprar hecho, la inteligencia artificial dentro del sistema y lo que tiene que quedar escrito. Esta primera lección pone las bases: qué hace que una decisión sea de arquitectura, cómo se deja escrita, y cuáles son los cinco casos que acompañan todo el curso.

## De dónde sale el material {#kata}

Una kata de arquitectura es un ejercicio. Se presenta un caso de negocio, alguien hace de cliente y responde preguntas, y equipos pequeños tienen poco tiempo para diseñar la solución. Lo que entregan son documentos de requisitos, diagramas y, sobre todo, decisiones escritas. Son, en su mayoría, diseños en papel que juzgan expertos, y no traen mediciones de un sistema en uso.

Eso cambia cómo hay que leer cada ejemplo. Cuando un equipo dice que su diseño responde en menos de un segundo, eso es un cálculo, no una medición. Y que varios ganadores hagan lo mismo tampoco prueba que sea lo correcto, porque comparten plantillas y vocabulario. Por eso, en cada caso, el curso muestra la razón y el costo de la decisión, y cuándo esa razón deja de valer.

## Qué la hace de arquitectura {#decision}

No toda decisión de un proyecto es de arquitectura. Elegir el nombre de una variable no lo es; decidir si dos partes del sistema comparten una base de datos, sí. La diferencia está en dos cosas. Una decisión de arquitectura cuesta mucho cambiarla después, porque otras decisiones se apoyan en ella. Y no afecta a una función en particular, sino a cualidades del sistema entero, como qué tan rápido responde, cuánto tiempo está disponible, cuánto cuesta o quién puede ver qué.

Esas cualidades tiran en direcciones distintas. Uno de los equipos ganadores abrió su documentación con una frase que se conoce como la primera ley de la arquitectura de software: todo en arquitectura de software es un trade-off. O sea, lo que se gana con una opción se paga con otra cosa. Como la opción sin costo no existe, decidir bien consiste en saber qué se paga y por qué conviene pagarlo.

## Un ejemplo {#ejemplo}

Un ejemplo lo hace concreto, y viene de Farmacy Food, un servicio de comidas preparadas que se entregan en refrigeradores inteligentes.

Su equipo tenía que elegir con qué vigilar los servidores del sistema, lo que se llama monitoreo. Tenía cuatro opciones. Dos eran gratuitas, de código abierto. Las otras dos cobraban, y una de ellas, DataDog, costaba quince dólares por servidor al mes.

El equipo propuso DataDog. Entre las razones que dejó escritas hay una que pesa más que el precio. Con una opción gratuita, alguien del equipo tendría que dedicar entre un quinto y la mitad de su tiempo a mantener el monitoreo. Lo gratis también tenía un precio, solo que no figuraba en ninguna lista.

## Una decisión escrita {#adr}

Esa elección quedó en un documento corto, de una página, con un formato que usan todos los ganadores. Se llama ADR, por architecture decision record: el registro de una decisión de arquitectura.

Un ADR completo responde cuatro cosas, y el de Farmacy Food sirve para verlas. Dice por qué había que decidir: el sistema iba a crecer rápido, y agregar servidores a tiempo dependía de saber qué pasaba en cada uno. Dice qué otras opciones había, y anota el precio de las tres que perdieron. Dice qué cuesta lo elegido, y admite que los quince dólares pueden subir. La cuarta cosa es el requisito del cliente que pide la decisión, el que permite a otra persona comprobar si la decisión lo cumple.

## La parte que falta {#falta}

Justo esa cuarta parte es la que le falta a este ADR. Explica con sus palabras por qué hacía falta el monitoreo, pero no remite a ningún requisito del cliente.

Y no es un caso aislado. Contamos a mano las cuatro partes en las ciento ochenta y tres decisiones escritas de los doce ganadores. Nueve de cada diez admiten algún costo. Algo más de la mitad nombra una alternativa descartada. Y apenas una de cada cuatro remite, con un identificador o un enlace, al requisito que la origina.

O sea, lo que más se escribe es el costo, y lo que menos, el vínculo entre la decisión y lo que la pide. Cada lección del curso deja una o dos decisiones escritas, así que vas a ver esas cuatro partes una y otra vez, y la última lección muestra qué se pierde cuando falta cada una.

## Cinco casos que vuelven {#elenco}

Para no saltar de un negocio a otro en cada ejemplo, el curso se apoya en cinco casos que vuelven en todas las lecciones. Farmacy Food ya apareció. Cada uno de los otros cuatro se eligió porque tiene un problema que obliga a decidir algo distinto.

MonitorMe es un sistema para hospitales. Muestra en la estación de enfermería los signos vitales de los pacientes y avisa cuando algo sale de rango, así que tiene que responder rápido y seguir funcionando aunque falle un dispositivo.

ClearView es la plataforma de una organización sin fines de lucro que vive de donaciones. Empareja currículums anonimizados con puestos de trabajo y usa inteligencia artificial para leerlos, de modo que el costo y el sesgo del modelo pesan en cada decisión.

## Tres casos más {#elenco2}

Sysops Squad es el servicio de soporte técnico de una empresa de electrónica. Su sistema de tickets es un monolito viejo, o sea, un sistema hecho de una sola pieza que se despliega entera. Pierde tickets, se congela o se cae seguido, y además guarda las tarjetas de crédito de los clientes. Es el caso de partir un sistema que ya existe.

Farmacy Food, el del monitoreo, trabaja con un presupuesto muy limitado. Es el caso de hacer mucho con poco.

Y MobilityCorp alquila scooters, bicicletas, autos y camionetas eléctricos en Europa. Usa inteligencia artificial en partes de su sistema, como la revisión de las fotos de cada vehículo devuelto, y es el caso de decidir dónde usarla. Los otros siete ganadores entran cuando una idea necesita su ejemplo, y se presentan en una frase al llegar.

## La frase escrita {#cierre}

El precio de DataDog estaba en la tabla del ADR, en negrita: quince dólares por servidor al mes. El de la opción gratuita estaba escondido en el tiempo de una persona, y el equipo tuvo que escribirlo para poder compararlo.

Ese hábito atraviesa todo el curso. Poner a la vista lo que cuesta cada opción, incluido lo que no aparece en ninguna lista de precios, y dejarlo escrito para que otra persona pueda revisarlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| ADR de monitoreo: cuatro opciones con precio (DataDog "$15 USD per host, per month", en negrita; Grafana y ELK gratuitas, de código abierto; CloudWatch "$0.30 USD for first 10,000 metrics"). La narración no nombra Grafana, ELK ni CloudWatch. Estado **Proposed** (se narra "propuso") | ArchColider: `4.ADRs/003 Tracing and Monitoring Sytem.md` l. 7, 19, 23, 27, 31 |
| La sección Decision tiene tres razones; la del tiempo, "0.2-0.5 time of a developer / administrator", es la última (se narra "entre las razones… hay una"); "the price might increase" | ADR-003 l. 35, 38 |
| Contexto: "fast growing system and just-in-time scaling is essential" | ADR-003 l. 10-12 |
| Farmacy Food: sistema de pedidos de una "ghost kitchen" con puntos de venta en refrigeradores inteligentes; presupuesto muy limitado | ArchColider: `1.ProblemBackground/BusinessDrivers.md` l. 5; `BusinessGoalAndScope.md`; `Constraints.md` |
| El ADR-003 dice la necesidad con palabras pero no remite a un requisito por identificador o enlace | `_corpus/dossiers/D7-decisiones-escritas.md` §2.1, fila AC |
| 183 ADR de decisión; 167 con costo (91 %), 96 con alternativa (52 %), 50 que remiten con identificador o enlace al requisito (27 %) | D7 V1 y §2.1, fila Total; conteo a mano |
| Diseños en papel, sin mediciones de sistemas en uso (ShopWise trae código para correr en local, no datos de uso); plantillas y vocabulario compartidos | Dossiers, sección Límites; D7 §2.4; `ConnectedAI-src/8_code/apps` |
| Los 12 son primer lugar de su edición de las Architecture Katas de O'Reilly, de 2020 a 2025 | TheKataLog `profile/README.md` |
| "Everything in software architecture is a trade-off. First Law of Software Architecture" (equipo de Sysops Squad; no se nombra) | Team 7: `README.md` |
| MonitorMe: estación de enfermería, alertas fuera de rango; si falla un dispositivo, el resto "must still function" | BluzBrothers: `Business/Requirements.md` l. 12, 22 |
| ClearView: ONG financiada con donaciones; IA para extraer rasgos de currículums y puestos (no para puntuar); costo y sesgo de los LLM | Pragmatic: `README.md`; `ArchitectureCharacteristics/Characteristics.md`; `C3-components-matching.md` l. 16 |
| Sysops Squad: soporte técnico de una empresa de electrónica; monolito; "lost tickets"; se congela o se cae; guarda tarjetas (ASM-4) | Team 7: `README.md` l. 44, 46, 164 |
| MobilityCorp: alquiler de vehículos eléctricos en Europa; IA para detectar daños en fotos; IA híbrida (dónde usarla es lectura del curso) | Five Nines: `README.md`; `adrs/ADR-0012`, `ADR-0018`, `ADR-0020` |
