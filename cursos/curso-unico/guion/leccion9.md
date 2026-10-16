# Comprar, construir y cuándo cambiar

## Lección 9 {#gancho}

Spotlight, la plataforma para acercar empleo a personas subrepresentadas, era un proyecto que empezaba de cero, sin saber si alguien lo iba a usar. En su análisis de requisitos, el equipo dejó una pregunta que ordena todo lo demás: por qué debería el negocio invertir en construir una fortaleza, si no está seguro de que alguien vaya a vivir en ella.

De esa pregunta salen dos decisiones. Qué se compra hecho y qué se construye, y cómo se empieza simple sin quedar atrapado en lo simple cuando el negocio crezca.

## Comprar, construir, cambiar {#pregunta}

Para la primera hacen falta criterios de compra y el precio de cada lado. Para la segunda, una condición escrita que diga cuándo cambiar, y alguna forma de vigilarla.

## Las preguntas de compra {#compra}

Spotlight escribió su criterio como seis preguntas que se le hacen a cada pieza del sistema. La primera es qué tan cerca está esa pieza del valor central del producto, o sea, de aquello por lo que alguien usaría Spotlight y no otra cosa. Las demás son más prácticas, como si el equipo sabe construirla, o cuánto cuesta construirla frente a comprarla.

Con esas preguntas decidieron comprar, entre otras cosas, la autenticación y el chat, y construir el núcleo.

Para la identidad compararon tres opciones: un servicio propio, uno de código abierto operado por ellos y uno gestionado por un proveedor. Eligieron el gestionado, porque construir u operar identidad es caro y suma la carga de la seguridad y del cumplimiento de normas.

El costo que admiten es que el proveedor limita lo que se puede hacer. Y la mitigación es una pieza propia, una fachada, que esconde al proveedor del resto del sistema y construye lo que falte. O sea, el resto del sistema le habla a la fachada, no al proveedor.

## Lo comprado sigue siendo tuyo {#depende}

El documento del chat de Spotlight tiene una sección con las cualidades que el equipo ya no necesita garantizar, porque las delegó en el proveedor: seguridad, escalabilidad, disponibilidad y rapidez de respuesta.

Pero que las dé otro no las hace desaparecer. Si el chat se cae, el usuario de Spotlight no distingue de quién es la culpa. Lo comprado sale de la lista de cosas que el equipo construye, no de la lista de cosas de las que el sistema depende. Por eso, al comprar, sirve escribir qué garantiza el proveedor, por ejemplo cuánto tiempo puede estar caído, y en el documento del chat de Spotlight eso no aparece.

## El precio de cada lado {#precio}

Farmacy Food ordenó su sistema en tres clases antes de decidir. El núcleo es lo que diferencia al negocio, como el catálogo, los pedidos y la fidelización. Lo de apoyo es lo que un producto de terceros puede cubrir con algo de integración. Y lo genérico es lo que cualquier empresa resuelve igual, como los reportes y los pagos.

Lo genérico se compra. Para los pagos usan un proveedor detrás de una fachada propia, de modo que se pueda cambiar de proveedor después.

Comparar exige poner precio a los dos lados. El del proveedor está en su lista. El de operar algo por cuenta propia casi nunca está escrito, y se mide en tiempo de personas, como el monitoreo de Farmacy Food en la primera lección.

## Cuando el criterio empuja al revés {#alreves}

La cercanía al núcleo del negocio no es el único criterio, y otros empujan en sentido contrario. La privacidad, por ejemplo. Certifiable, la empresa que certifica arquitectos, procesa los datos sensibles de los candidatos en servidores propios y deja lo general en la nube.

O la coherencia con lo ya elegido. MobilityCorp descartó servicios especializados que ya detectan daños en fotos, porque no encajaban con la plataforma de nube que había elegido antes. La pregunta es la misma, y la respuesta depende de qué pese más en cada caso.

## Empezar simple {#simple}

La segunda decisión es cuándo crecer. Varios ganadores empiezan por lo más simple que cumple, y escriben que van a cambiar después.

Farmacy Food eligió el monolito modular para ahora, y separar un módulo cuando las métricas y las tendencias lo pidan. Spotlight propone algo parecido, y la decisión queda como propuesta. Si hay una restricción de costo, empieza con un monolito modular, y pasa a microservicios cuando encuentre su mercado y el sistema necesite escalar. Sysops Squad, como vimos con sus datos, se queda con una sola base hasta que se convierta en un cuello de botella.

Las tres condiciones tienen algo en común: ninguna dice un número. Encontrar el mercado, un cuello de botella, una tendencia. Ninguna se puede comprobar sin medir algo que nadie dejó definido, ni dice quién tiene que mirar, ni cada cuánto.

## La condición con número {#numero}

MobilityCorp sí puso números, en sus modelos de inteligencia artificial. Para detectar daños en las fotos empieza con un servicio gestionado, que entrena el modelo casi solo, y deja escrito cuándo pasar a un modelo propio.

La primera condición usa el mAP, una medida de 0 a 1 de qué tan bien el modelo encuentra los daños. Si a los tres meses en producción el mAP sigue por debajo de 0,75, se cambia. Las otras tres se miran de forma sostenida, no en un mal día. Una es que los falsos positivos pasen del diez por ciento. Otra, que la respuesta tarde más de cinco segundos en el noventa y cinco por ciento de los casos. Y la última, que el negocio note que los clientes se quejan.

Construir el modelo propio desde el primer día lo rechazaron por optimización prematura. Y dejaron una pieza que hace posible el cambio. Los dos modelos, el gestionado y el propio, devuelven el mismo formato de respuesta, así que el resto del sistema no se entera de cuál está detrás. Una condición completa tiene eso: qué se mide, qué valor dispara el cambio, en cuánto tiempo, y qué queda fijo para que cambiar sea barato.

## Reglas que se vigilan solas {#reglas}

Una condición con número sirve si alguien la mide. La idea que circula en la comunidad para eso son las funciones de aptitud, o fitness functions: reglas sobre la arquitectura que se comprueban solas, como se comprueba un test. La cuenta de MonitorMe para el segundo de respuesta es una de ellas, escrita como cálculo.

Farmacy Family, la comunidad de salud, dejó escrita la regla de cómo usarlas. Si una función de aptitud falla, se arregla el sistema como se arregla un test que falla. Y si hay una buena razón para no hacerlo, se escribe una decisión y se actualiza la función. En los repositorios que leímos, estas reglas aparecen escritas, o calculadas a mano, y no encontramos ninguna automatizada.

## La fortaleza {#cierre}

La pregunta de Spotlight tenía una respuesta implícita. Construir poco al principio, comprar lo que no diferencia, y no levantar la fortaleza antes de saber si alguien va a vivir en ella. Eso funciona si la condición para crecer está escrita, y si alguien la mide.

Sin esa condición escrita, empezar simple no dice cuándo dejar de serlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| "Why should the business invest to build a fortress when it is not sure if anyone would be staying in it or using it." | Pegasuz: `other-artifacts/Requirement-analysis.md` l. 59 |
| Las seis preguntas; comprar chat, autenticación y documentos (también notificaciones, que no se nombran: la lección 4 usa el quantum de notificaciones); construir el núcleo (Accepted) | Pegasuz: `ADRs/003.adr-build-vs-buy.md` l. 5, 15-25 |
| Identidad: 3 opciones; "expensive and adds the overhead of security and compliance"; "will limit us…"; "identity facade" | Pegasuz: `ADRs/009.adr-idp.md` l. 29-37 |
| "Characteristics that we do not need as we offloaded to 3rd party vendors" (seguridad, escalabilidad, disponibilidad, "Responsiveness"); sin SLA nombrado. Lo de la culpa y la dependencia es lectura del curso | Pegasuz: `quanta/chat.md` l. 31-35; D5 T2-A |
| Core / Supportive / Generic; fachada de pagos | ArchColider: `2.SolutionBackground/SolutionOverview.md`; `SystemAppoach.md`; `4.ADRs/009` |
| Certifiable híbrido; MobilityCorp rechaza APIs de daños por la plataforma | ZAItects `ADRs/007`; Five Nines `adrs/ADR-0020` l. 138-142 |
| Farmacy Food "best option for now", "metrics and trends"; Spotlight (Proposed) "Modular Monolith if there is a cost constraint… after there is a product market fit and a system required to scale"; Sysops "until it becomes a bottleneck" | ArchColider `SystemAppoach.md`; Pegasuz `ADRs/007` l. 5-6, 29-32; Team 7 `README.md` l. 289 |
| ADR-0020: "mAP < 0.75 after 3 months in production"; "False positive rate > 10% consistently"; "Latency consistently exceeds 5s at p95"; "Business feedback indicates unacceptable customer friction"; "Premature optimization"; "standardized JSON". mAP: la fuente lo define como mAP@0.5; la narración dice solo que va de 0 a 1 | Five Nines: `adrs/ADR-0020…` l. 25-26, 45-131 |
| Fitness functions de MonitorMe ("Result: Success", cálculo a mano en `Sizing.md`); Farmacy Family "in the same way as a failing test"; ninguna automatizada en lo que leímos | BluzBrothers `README.md` l. 91-94; Archangels `1.ProblemBackground/ArchitectureAnalysis.md` l. 179; D5 §2 |
