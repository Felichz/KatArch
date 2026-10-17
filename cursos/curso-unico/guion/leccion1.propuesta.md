# Qué es una decisión de arquitectura

## Lección 1 {#intro}

Este es un curso sobre cómo se decide un sistema de software entero. Qué partes tiene, cómo se hablan entre sí, qué pasa cuando algo falla y dónde viven los datos que no se pueden perder. Se apoya en decisiones reales, las que dejaron escritas los equipos que ganaron un concurso de diseño de arquitectura.

## De dónde sale el material {#kata}

El concurso se llama Architecture Katas y lo organiza O'Reilly. Lo presentan Neal Ford y Mark Richards, los autores del libro Fundamentals of Software Architecture, y un jurado que encabeza Jacqui Read elige al ganador de cada edición.

Una kata es un ejercicio. Se presenta el caso de un negocio, alguien hace de cliente y responde preguntas, y equipos pequeños diseñan la solución en poco tiempo. Lo que entregan son requisitos, diagramas y decisiones escritas, todo en un repositorio. Un catálogo llamado TheKataLog reúne los repositorios de los ganadores, y este curso usa doce de ellos.

## Un ejemplo {#ejemplo}

Veamos una de esas decisiones. Viene de Farmacy Food, un servicio de comidas preparadas que se entregan en refrigeradores inteligentes.

Su equipo tenía que elegir con qué vigilar los servidores del sistema, lo que se llama monitoreo, y tenía cuatro opciones. Dos eran gratuitas, de código abierto. Las otras dos cobraban, y una de ellas, DataDog, costaba quince dólares por servidor al mes.

El equipo propuso DataDog. Entre las razones que dejó escritas hay una que pesa más que el precio. Con una opción gratuita, alguien del equipo tendría que dedicar entre un quinto y la mitad de su tiempo a mantener el monitoreo. Lo gratis también tenía un precio, solo que no figuraba en ninguna lista.

## Qué la hace de arquitectura {#decision}

¿Por qué esta decisión es de arquitectura y elegir el nombre de una variable no lo es? Por dos cosas. Una decisión de arquitectura cuesta mucho cambiarla después, porque otras cosas se apoyan en ella. Cuando las alertas y los tableros dependen de una herramienta, cambiarla deja de ser un detalle. Y no afecta a una función en particular, sino a cualidades del sistema entero. Aquí, cuánto cuesta y cuánto tiempo de personas consume; en otros casos, qué tan rápido responde, cuánto tiempo está disponible o quién puede ver qué.

Esas cualidades tiran en direcciones distintas. Uno de los equipos ganadores abrió su documentación con la frase que se conoce como la primera ley de la arquitectura de software. Dice que todo en arquitectura de software es un trade-off. O sea, lo que se gana con una opción se paga con otra cosa. Decidir bien consiste en saber qué se paga y por qué conviene pagarlo.

## Una decisión escrita {#adr}

La elección de Farmacy Food quedó en un documento corto, de una página, con un formato que usan todos los ganadores. Se llama ADR, por architecture decision record: el registro de una decisión de arquitectura.

Un ADR completo responde cuatro cosas. Dice por qué había que decidir: aquí, el sistema iba a crecer rápido y agregar servidores a tiempo dependía de saber qué pasaba en cada uno. Dice qué otras opciones había, con el precio de las tres que perdieron. Dice qué cuesta lo elegido, y admite que los quince dólares pueden subir. Y dice qué requisito del cliente pide la decisión, que es lo que permite a otra persona comprobar si la decisión lo cumple.

## Un ADR completo {#completo}

Para ver las cuatro partes juntas sirve el ADR de MobilityCorp sobre cuánto tiempo guardar las fotos de los vehículos. Arranca citando, por su número, los requisitos de los que nace: la verificación al devolver el vehículo, la inspección previa y la limpieza con inteligencia artificial. Después descarta tres alternativas, cada una con su razón, y cierra con una tabla de cinco riesgos y cómo se reducen cada uno.

Ese número es lo que vuelve revisable la decisión. Con él, cualquiera puede ir al requisito y ver si lo que se decidió lo cumple, o si se aparta de él y hay que explicar por qué.

## Cinco casos que vuelven {#elenco}

Para no saltar de un negocio a otro en cada ejemplo, el curso se apoya en cinco casos que vuelven en todas las lecciones. Farmacy Food, el del monitoreo, es el de hacer mucho con un presupuesto muy limitado. MobilityCorp, el de las fotos, alquila scooters, bicicletas, autos y camionetas eléctricos en Europa, y es el caso de decidir dónde usar inteligencia artificial.

MonitorMe es un sistema para hospitales. Muestra en la estación de enfermería los signos vitales de los pacientes y avisa cuando algo sale de rango. Tiene que responder rápido y seguir funcionando aunque falle un dispositivo.

## Tres casos más {#elenco2}

ClearView es la plataforma de una organización sin fines de lucro. Empareja currículums anonimizados con puestos usando inteligencia artificial, y en ella pesan el costo y el sesgo del modelo.

Sysops Squad es el soporte técnico de una empresa de electrónica. Su sistema de tickets es un monolito, o sea, un sistema hecho de una sola pieza que se despliega entera. Pierde tickets, se congela y guarda las tarjetas de los clientes. Es el caso de partir un sistema que ya existe.

Los otros siete ganadores entran cuando una idea necesita su ejemplo, y se presentan en una frase al llegar.

## La frase escrita {#cierre}

El precio de DataDog estaba en la tabla del ADR, en negrita: quince dólares por servidor al mes. El de la opción gratuita estaba escondido en el tiempo de una persona, y el equipo tuvo que escribirlo para poder compararlo.

Ese hábito atraviesa todo el curso. Poner a la vista lo que cuesta cada opción, incluido lo que no aparece en ninguna lista de precios, y dejarlo escrito para que otra persona pueda revisarlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Las katas las presenta (host) Neal Ford y Mark Richards; las juzga un equipo encabezado por la Head Judge Jacqui Read | TheKataLog `profile/README.md` l. 259 (`katarch-corpus/dotgithub/profile/README.md`) |
| Ford y Richards son autores de *Fundamentals of Software Architecture* | Conocimiento externo al repo (D7 §5 lo marca igual); verificar en la página del libro antes de dar por cerrado |
| O'Reilly organiza el concurso; TheKataLog reúne los repositorios de los ganadores; el curso usa 12 | `profile/README.md`; DISENO-CURSO |
| ADR de monitoreo: cuatro opciones con precio (DataDog "$15 USD per host, per month", en negrita; Grafana y ELK gratuitas; CloudWatch de pago), estado Proposed ("propuso"), razón del tiempo "0.2-0.5 time of a developer / administrator", "the price might increase", contexto "fast growing system and just-in-time scaling" | ArchColider `4.ADRs/003 Tracing and Monitoring Sytem.md` l. 7, 10-12, 19, 23, 27, 31, 35, 38 |
| "Las tres que perdieron" llevan precio en el ADR | ADR-003 (las tres tienen precio o costo de licencia; ELK "sin costo de licencia") |
| Farmacy Food: comidas preparadas en refrigeradores inteligentes; presupuesto muy limitado | ArchColider `1.ProblemBackground/BusinessDrivers.md`, `Constraints.md` |
| Todos los ganadores usan ADR | D7 §1 (los 12 repos tienen carpeta o plantilla de ADR; ver tabla de repos) |
| MobilityCorp ADR-0017: cita FR-CV-007 (verificación al devolver), FR#2M (inspección previa), FR#2L (limpieza con IA); tres alternativas rechazadas con razón; tabla de 5 riesgos con mitigación | Five Nines `adrs/ADR-0017 - Photo Retention Policy…`; D7 §3 A1 |
| ADR-0017 fija 180 días para originales mientras NFR_7 dice 90 (se narra solo que cita los requisitos, no que coincida) | D7 §3 B1 |
| "Todo en arquitectura de software es un trade-off. First Law of Software Architecture" (equipo de Sysops Squad; no se nombra) | Team 7 `README.md` |
| MonitorMe, ClearView, Sysops Squad, MobilityCorp: descripciones | `BluzBrothers Business/Requirements.md` l. 12, 22; Pragmatic `README.md`; Team 7 `README.md` l. 44, 46, 164; Five Nines `README.md` |
