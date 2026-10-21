# Qué es una decisión de arquitectura

## Lección 1 {#intro}

Este es un curso sobre cómo se decide un sistema de software entero. Qué partes tiene, cómo se hablan entre sí, qué pasa cuando algo falla y dónde viven los datos que no se pueden perder. Se apoya en decisiones reales, las que dejaron escritas los equipos que ganaron un concurso de diseño de arquitectura.

## De dónde sale el material {#kata}

El concurso se llama Architecture Katas y lo organiza O'Reilly. Lo presentan Neal Ford y Mark Richards, autores del libro Fundamentals of Software Architecture. Y un jurado que encabeza Jacqui Read elige al ganador de cada edición.

Una kata es un ejercicio. Se presenta el caso de un negocio, alguien hace de cliente y responde preguntas, y equipos pequeños diseñan la solución en poco tiempo. Lo que entregan son requisitos, diagramas y decisiones escritas. Un catálogo llamado TheKataLog reúne los repositorios de los ganadores, y este curso usa doce de ellos.

## Un ejemplo {#ejemplo}

Una de esas decisiones viene de Farmacy Food, un servicio de comidas preparadas que se entregan en refrigeradores inteligentes.

Su equipo tenía que elegir con qué vigilar los servidores del sistema, lo que se llama monitoreo, y tenía cuatro opciones. Dos eran gratuitas, de código abierto. Las otras dos cobraban, y una de ellas, DataDog, costaba quince dólares por servidor al mes.

El equipo propuso DataDog. Entre las razones que dejó escritas hay una que pesa más que el precio. Con una opción gratuita, alguien del equipo tendría que dedicar entre un quinto y la mitad de su tiempo a mantener el monitoreo. Lo gratis también tenía un precio, solo que no figuraba en ninguna lista.

## Qué la hace de arquitectura {#decision}

¿Por qué esta decisión es de arquitectura y elegir el nombre de una variable no lo es? Por dos cosas. Una decisión de arquitectura cuesta mucho cambiarla después, porque otras cosas se apoyan en ella. Cuando las alertas y los tableros dependen de una herramienta, cambiarla deja de ser un detalle. Y no afecta a una función en particular, sino a cualidades del sistema entero. Aquí, cuánto cuesta y cuánto tiempo de personas consume; en otros casos, qué tan rápido responde, cuánto tiempo está disponible o quién puede ver qué.

Esas cualidades tiran en direcciones distintas. Uno de los equipos ganadores abrió su documentación con la frase que se conoce como la primera ley de la arquitectura de software. Dice que todo en arquitectura de software es un trade-off. O sea, lo que se gana con una opción se paga con otra cosa. Decidir bien consiste en saber qué se paga y por qué conviene pagarlo.

## Una decisión escrita {#adr}

La elección de Farmacy Food quedó en un documento corto, de una página, con un formato que usan todos los ganadores. Se llama ADR, por architecture decision record: el registro de una decisión de arquitectura.

Un ADR completo responde cuatro cosas. Por qué había que decidir, qué otras opciones había, qué cuesta lo elegido y qué requisito del cliente pide la decisión. En el de Farmacy Food se ven bien las tres primeras. El sistema iba a crecer rápido, y agregar servidores a tiempo dependía de saber qué pasaba en cada uno. Las tres opciones que perdieron llevan su precio. Y admite que los quince dólares pueden subir.

## Un ADR completo {#completo}

Las cuatro partes juntas se ven en un ADR de MobilityCorp, una empresa que alquila scooters, bicicletas, autos y camionetas eléctricos en Europa. La decisión fija cuánto tiempo se guardan las fotos que se sacan de los vehículos.

Arranca citando, por su número, los tres requisitos de los que nace. Son la verificación al devolver el vehículo, la inspección antes del alquiler y la revisión de limpieza con inteligencia artificial. Después descarta tres alternativas, cada una con su razón, y cierra con una tabla de cinco riesgos y cómo se reduce cada uno.

Ese número es lo que vuelve revisable la decisión. Con él, cualquiera puede ir al requisito, leerlo y comprobar si lo decidido lo cumple, sin preguntarle a quien lo escribió.

## Cinco casos que vuelven {#elenco}

Para no saltar de un negocio a otro en cada ejemplo, el curso se apoya en cinco casos que vuelven en todas las lecciones. Dos ya aparecieron. Farmacy Food, el del monitoreo, es el caso de hacer mucho con un presupuesto muy limitado. MobilityCorp, el de las fotos, es el caso de decidir dónde usar inteligencia artificial y dónde no.

MonitorMe es un sistema para hospitales. Muestra en la estación de enfermería los signos vitales de los pacientes y avisa cuando algo sale de rango. Tiene que responder rápido y seguir funcionando aunque falle un dispositivo.

## Dos casos más {#elenco2}

ClearView es la plataforma de una organización sin fines de lucro, que vive de donaciones. Empareja currículums anonimizados con puestos usando inteligencia artificial, y en ella pesan el costo y el sesgo del modelo.

Sysops Squad es el soporte técnico de una empresa de electrónica. Su sistema de tickets es un monolito, o sea, un sistema hecho de una sola pieza que se despliega entera. Pierde tickets, se congela y guarda las tarjetas de los clientes. Es el caso de partir un sistema que ya existe.

Los otros siete ganadores entran cuando una idea necesita su ejemplo, y se presentan en una frase al llegar.

## La frase escrita {#cierre}

El precio de DataDog estaba en la tabla del ADR, en negrita: quince dólares por servidor al mes. El de la opción gratuita estaba escondido en el tiempo de una persona, y el equipo tuvo que escribirlo para poder compararlo.

Ese hábito atraviesa todo el curso. Se pone a la vista lo que cuesta cada opción, también en tiempo de personas. Y se deja escrito junto al requisito que lo pide, para que otra persona pueda comprobarlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Las katas las presentan (host) Neal Ford y Mark Richards; las juzga un equipo encabezado por la Head Judge Jacqui Read. Jacqui Read integró The Archangels en una edición; no se narra (criterio de Felix: se la nombra como jurado) | TheKataLog `profile/README.md` l. 259; `_corpus/dossiers/D7-decisiones-escritas.md` l. 104 |
| Ford y Richards son autores de *Fundamentals of Software Architecture* | Conocimiento externo al repo (D7 V5: ningún repo nombra a los autores); verificar en la página del libro antes de dar por cerrado |
| O'Reilly organiza el concurso; TheKataLog reúne los repositorios de los ganadores; el curso usa 12 | `profile/README.md`; DISENO-CURSO |
| ADR de monitoreo: cuatro opciones con precio (DataDog "$15 USD per host, per month", en negrita; Grafana y ELK gratuitas; CloudWatch de pago), estado Proposed ("propuso"), razón del tiempo "0.2-0.5 time of a developer / administrator", "the price might increase", contexto "fast growing system and just-in-time scaling" | ArchColider `4.ADRs/003 Tracing and Monitoring Sytem.md` l. 7, 10-12, 19, 23, 27, 31, 35, 38 |
| "Las tres que perdieron" llevan precio en el ADR | ADR-003 (las tres tienen precio o costo de licencia; ELK "sin costo de licencia") |
| Farmacy Food: comidas preparadas en refrigeradores inteligentes; presupuesto muy limitado | ArchColider `1.ProblemBackground/BusinessDrivers.md`, `Constraints.md` |
| Todos los ganadores usan ADR | D7 §1 V1 (los 12 repos tienen ADR de decisión) |
| MobilityCorp ADR-0017: el Context cita FR-CV-007 ("Customer return verification"), FR#2M ("Pre-rental inspection") y FR#2L ("Cleanliness assessment (AI + human review)"); tres alternativas rechazadas con razón; tabla de 5 riesgos con mitigación. Five Nines no usa campo de estado; no se narra estado | `katas-src/Five-Nines/adrs/ADR-0017…md` l. 5-8; D7 §3 A1 |
| ADR-0017 fija 180 días para originales mientras NFR_7 dice 90. No se narra ninguna cifra en esta lección. L11 usa hoy este ADR como contraejemplo y hay que rehacerla (va contra "Mostrar el modelo bueno, no el defecto") | D7 §3 B1 |
| "Todo en arquitectura de software es un trade-off. First Law of Software Architecture" (equipo de Sysops Squad; no se nombra) | Team 7 `README.md` |
| MonitorMe, ClearView (ONG financiada con donaciones), Sysops Squad, MobilityCorp: descripciones | BluzBrothers `Business/Requirements.md` l. 12, 22; Pragmatic `README.md`; Team 7 `README.md` l. 44, 46, 164; Five Nines `README.md` |

## Cambios frente a la propuesta del 17 de octubre

- `#kata`: la frase con tres personas y un libro se parte en dos. El jurado se mantiene.
- `#ejemplo`: fuera "Veamos una de esas decisiones" (puente vacío). El primer ejemplo llega en alrededor de un minuto.
- `#adr`: antes atribuía las cuatro partes al ADR de DataDog, que no cita requisito. Ahora presenta las cuatro y dice que en el de Farmacy Food "se ven bien las tres primeras", sin hablar de lo que le falta. La cuarta se muestra con el ejemplo bueno.
- `#completo`: se mantiene MobilityCorp ADR-0017, presentado en su propia frase antes de usarlo. Se corrige "cómo se reducen cada uno". Se quita "o si se aparta de él y hay que explicar por qué", que no hacía falta.
- `#elenco2`: el kicker pasa a "Dos casos más" (presenta dos).
- `#cierre`: ya no repite "ninguna lista de precios" de `#ejemplo`. Une el costo con el requisito, las dos mitades de la lección.
