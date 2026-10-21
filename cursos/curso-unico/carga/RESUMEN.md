# Resumen consolidado de los análisis de carga (lecciones 1 a 11)

Qué es esto: la verificación de lo que los once análisis de `carga/leccionN.md` afirman como hechos, más la agrupación de los problemas de estructura. No se editó ningún guion ni ningún análisis.

Cómo se verificó: cada afirmación se abrió en la fuente (`katas-src/<Repo>/`) y en el guion (`guion/leccionN.md`). Las citas son `archivo:línea`. Las del guion son del archivo `guion/leccionN.md` (por ejemplo `L5:47` es la línea 47 de `leccion5.md`). Se abrieron también el dossier `_corpus/dossiers/D7-decisiones-escritas.md` y la imagen `BluzBrothers-src/ArchitectureCharacteristics/images/components-sticky-cards.png` (para el conteo de notas por cualidad). Las duraciones y los puntajes vienen de los análisis; se recontaron las filas con un script (coinciden con lo que dice cada análisis). Los tiempos de `timing.js` no se rehicieron (el último fin de línea de voz está unos 3 s antes de la duración que dan los análisis, en las once lecciones: es la cola de la escena final).

Veredictos usados: confirmada (la fuente respalda al análisis), refutada (el análisis se equivocó) y matiz (la fuente es ambigua o el guion simplifica sin cambiar el sentido).

---

## 1. Errores de hecho confirmados

De lo más grave a lo menos grave. Criterio: primero lo que invierte o falsea la fuente y choca con otra lección; después lo que endurece un "should / may / Proposed"; al final las precisiones perdidas (p95, MAPE) y las cifras mal rotuladas.

| Lección | Qué dice el guion | Qué dice la fuente | Corrección propuesta |
|---|---|---|---|
| L5 | "el pago no admite ninguna demora ni ningún duplicado" (`L5:47`) | ArchColider ADR-008 (estado Proposed): el pedido "can be processed one or more times, but it should not lead to doubled, tripled… charges" (`008…md:13`); el duplicado se descarta por id y versión (`:17`); "It will slightly decrease performance" (`:21`). `Tradeoffs.md:3` acepta la demora al pagar a propósito y `ADR 013:22` dice "Users can experience longer delays during the purchase confirmation step" | "el pago no admite cobros dobles": llega al menos una vez, el duplicado se descarta y la espera al pagar es aceptada. La L7 (`L7:5`, `:45`) está bien; esta frase la contradice |
| L1 | MonitorMe muestra "los signos vitales de cientos de pacientes en la estación de enfermería… y no puede apagarse" (`L1:49`) | BluzBrothers `Business/Requirements.md:12` "maximum of 20 patients per nurses station"; `:39` "Maximum number of patients per physical MonitorMe instance: 500"; `:22` pide que siga funcionando para las demás señales si falla un dispositivo | "hasta veinte pacientes por estación (quinientos por instalación), en un segundo o menos, y si un dispositivo falla el resto sigue funcionando". Corregir también la tabla de verificación (la fila dice "hasta 500 pacientes, 1 s" pero el texto no) |
| L4 | "En MonitorMe, el registro de pacientes y los propios sensores quedaron fuera del sistema, cada uno con su decisión escrita" (`L4:17`) | BluzBrothers ADR-005: el título dice "Out of Scope", pero la decisión dice "supporting sub-domain. It will be a part of the system, but we won't be focusing on it" (`ADR-005:15`). El README lo lista como tarea de la próxima iteración (`README.md:106`). Solo los sensores quedan fuera: ADR-006:14 | "el registro de pacientes queda dentro, como subdominio de apoyo al que no se le presta foco; los sensores quedaron fuera". Cortar o reescribir "sacar algo del alcance… de los que más trabajo ahorran" con el ejemplo de los sensores. La L11 (`L11:39`) tiene la versión correcta |
| L5 | "una reserva con su pago autorizado, se guarda en una sola transacción" (`L5:39`) | Five Nines `4_Sequence_Diagram.md:42` `CreatePreAuth` ocurre antes de `BEGIN TRANSACTION` (`:46`); la transacción solo guarda `preAuthToken` (`:47`). `3_Domain_Model.md:201`: el agregado Reservation guarda "pre-auth reference"; el pago es otro agregado (`:203`) | "una reserva con la referencia de su preautorización". La L6 (`L6:21`) lo cuenta bien |
| L11 | Gancho: tres documentos dicen 90, 180 y 90 días y "Nadie explica la diferencia" (`L11:7`, y el cierre `L11:45`) | Five Nines ADR-0017 `:37-41`: originales 180 días (hasta 2 años con disputa) y copias de trabajo 90 días "auto-delete when parent original is deleted". El ADR ya define el 90 para derivados. Lo que sigue sin explicar: `3_NFRs.md:19` "photos 90 days" no distingue clases; `4_Sequence_Diagram.md:249` cita ADR-0017 para "Photos stored 90 days" sin decir "derivados"; ADR-0017 no cita NFR_7 (contexto `:6-8`) | Reencuadrar: el ADR fija 180 para originales y 90 para derivados; el hueco es que el requisito dice 90 para "las fotos" sin distinguir y el ADR no dice que se aparta. Así lo propone el análisis de L11 y es lo que hace comprobable el ejemplo |
| L5 | El currículum original "lo guarda solo un servicio, y nadie más tiene permiso para leerlo" (`L5:17`) | Pragmatic ADR-010 `:16`: "access requires special privileges which are not given to the matching service". ADR-019 `:18` (Accepted): "Analytics may read directly from job candidate DB" | "el servicio que empareja no tiene permiso para leerlo". La L8 (`L8:41`) ya dice que analítica lee directo de esa base |
| L5 | Hey Blue! "consideró partir esa base en dos… Y lo descartó" (`L5:29`) | MonArch `Readme.md:182`: "We could make a case for separating… This however does not do much to reduce the contract coupling… The diagram shows two separate databases for clarity and semantic reasons" | "dibujan dos bases en el diagrama, pero reconocen que eso casi no reduce el acoplamiento por contrato". Lo que descartan es el argumento de desacoplar |
| L7 | "Ningún documento dice qué pasa con un currículum después del último intento… Es el hueco más repetido entre los ganadores. Varios diseñan el reintento, y ninguno escribe qué ocurre cuando los reintentos se acaban" (`L7:29`) | Para ClearView es cierto (`C3-components-hr-integration.md:37` termina en "until no further attempts are made"; no hay nada más en Pragmatic). Pero ArchColider `InformationModels.md:239` escribe un final para el pago: "a user should be notified and retry should be offered". No hay recuento de "el más repetido" en ningún dossier | Limitar a ClearView ("en ClearView ningún documento…") o dar el recuento. Quitar "el más repetido" y "ninguno" |
| L7 | "Si el proveedor de pagos está caído, los pedidos se guardan y se reintentan durante un plazo" (`L7:45`) y "tiene sus respuestas escritas" (`L7:45`) | ArchColider `RisksAndSensitivePoints.md:25-26` lo lista como "Options" bajo "Technical Risks", con "a defined period of time" sin valor. ADR-008 y ADR-012 están en Proposed (`:7` en ambos) | "como opción, si el proveedor cae, se guardan los pedidos y se reintentan durante un plazo que no se fija". Cambiar "resolvió"/"tiene sus respuestas" por "propone" (L7 `:17` y `:45`) |
| L5 | La regla de un solo escritor "se impone con los permisos de la base de datos" (`L5:7`) y "la base de datos se lo impide, y el error aparece el primer día" (`L5:51`) | Pragmatic ADR-015 `:16`: "This should be enforced with DB permissions"; consecuencia `:20` "Configuration effort for DB permissions". El corpus no muestra los permisos configurados | "el ADR pide que se imponga con permisos". El cierre de L5 se apoya en esa frase; hay que decir que es el diseño y no una verificación |
| L9 | "Spotlight empieza con un monolito modular y pasa a microservicios cuando encuentre su mercado" (`L9:39`) | Pegasuz ADR-007 (Proposed) `:29-32`: "Modular Monolith if there is a cost constraint. Start with the monolith and later migrate… after there is a product market fit and a system required to scale". README `:202` confirma el monolito modular del MVP; `quanta/npo-candidate.md:48`: largo plazo "Hybrid - Microservices and Event-Driven" | Decir que es una propuesta y que la condición tiene dos partes (encontrar mercado y necesitar escalar), más la condición de costo |
| L9 | MobilityCorp pasa a modelo propio "si a los tres meses la precisión queda por debajo de un umbral… o si la respuesta tarda más de cinco segundos" (`L9:45`) | Five Nines ADR-0020 `:51-54`: "mAP < 0.75 after 3 months in production"; "False positive rate > 10% consistently"; "Latency consistently exceeds 5s at p95"; cuarto disparador "Business feedback…" | "mAP por debajo de 0,75 a los tres meses", "falsos positivos sostenidos sobre 10 %", "latencia p95 sostenida sobre 5 s". La frase omite el 0,75, el "sostenido", el p95 y el cuarto disparador |
| L8 | Farmacy Food "guarda todos los eventos de su historia para investigar quejas, deja el borrado sin resolver, y lo anota como tema pendiente" (`L8:35`) | ArchColider `SystemAppoach.md:201-204`: "Missed topics: Security; Local compliance with user privacy". `InformationModels.md:168`: los eventos "will be kept indefinitely, or based on retention policy that might be 1-2 years". La fuente no menciona el borrado | "deja pendiente el cumplimiento local de privacidad; los eventos se guardan para siempre o uno a dos años" |
| L8 | Spotlight "escribió una regla clara: no guardar datos personales en el sistema" (`L8:51`) | Pegasuz `Data-compliance-security.md:7` lo dice, pero `:8` sigue: "If the system needs to store any such information, use a data-compliant database and cloud provider". `auth-service.md:27`: "Since this service stores PII, data life cycle needs to follow certain compliance rules" | El servicio de autenticación no incumple la regla completa; el guion corta la segunda viñeta. Decir que la regla tiene excepción prevista y que el servicio la ejerce sin que ninguna decisión lo estructure |
| L4 | "Eso lo obliga a pasar una auditoría PCI" (`L4:5`); "una filtración… con consecuencias legales" (`L4:23`); "Un solo número… habría obligado a pagar cuatro nueves en todas partes" (`L4:35`) | Team 7 ADR-4 `:8` "the system may need to pass a Payment Card Industry (PCI) audit"; ADR-1 `:15` "may have legal implications" y "may need to pass PCI certification". Pegasuz `README.md:138` solo dice que cuatro nueves "would also be an overkill"; el contrafactual es del curso | "puede tener que pasar"; "podría tener implicaciones legales"; marcar el contrafactual como lectura nuestra |
| L6 | Con la API siempre encendida "si no hay internet el cambio se pierde" (`L6:41`) | CELUS `3.ARDs/003.CameraUpdateStrategy.md:48` "the configuration can be not applied"; `:50` "Platform can delay config until the camera is online" | "puede no aplicarse". Hay mitigación escrita en la propia opción |
| L3 | "tres escenarios de pedidos por día" (`L3:45`); "veinte veces más tráfico cuesta menos del doble" (`L3:45`) | ArchColider `CostAnalysis.md:67-69`: son "customer requests per day" (500, 1.000 y 10.000), no pedidos. Los totales 12.247,57 y 22.480,57 USD (`:293`, cociente 1,84) dejan fuera Application Load Balancer y Data Transfer, marcados "TBD" en los tres escenarios (`:286`, `:291`) | "solicitudes de clientes por día"; "veinte veces más tráfico cuesta menos del doble, sin contar balanceador ni transferencia, que la tabla deja sin cifra" |
| L11 | "otra decisión, todavía vigente, sigue usando ese mismo mecanismo" (`L11:27`) | Team 7 ADR-5 `:4`: estado Proposed (el mecanismo es la replicación por tabla, `:20`). "Vigente" es un estado que la propia lección enseña a leer | "otra decisión, propuesta, usa el mismo mecanismo" |
| L8 | Sysops "puso una puerta de entrada por dominio, y la primera fue la de facturación… La segunda fue la de administración" (`L8:41`) | Team 7 ADR-12 `:13` "The first candidate is the billing silo"; `:14` "Admin API…". Es el orden de la lista de candidatas, no de construcción | "los primeros candidatos fueron…" o quitar "primera" y "segunda" |
| L1 | Sysops Squad "pierde pedidos" (`L1:53`) | Team 7 `README.md:46`: "lost tickets" | "pierde tickets" |
| L10 | Un modelo nuevo debe "superar al vigente por al menos un cinco por ciento" (`L10:59`); "un plazo, dos horas para la limpieza y una hora para los daños" (`L10:33`) | Five Nines ADR-0022 `:114` "outperform champion by ≥5% MAPE reduction"; ADR-0016 `:29` "Cleanliness P95 ≤ 2 hours; Damage P95 ≤ 1 hour" | "reducir el error (MAPE) al menos un 5 %"; "el 95 % de los casos en dos horas / una hora" |
| L2 | "en menos de cinco segundos por foto" (`L2:49`) | Five Nines ADR-0020 `:19` "Inference latency ≤5 seconds per photo (p95)" | "cinco segundos o menos en el 95 % de las fotos" (la lección enseña a copiar el requisito sin errores) |
| L2 | "Un hospital no puede tener un monitor… que se apague, y el pedido lo dice con todas las letras: hay vidas humanas en juego" (`L2:59`) | `Requirements.md:47`: "Vital sign data… must be as accurate as possible. After all, human lives are at stake" (habla de exactitud). Lo de seguir funcionando está en `:22` y es otra frase | Separar: el pedido pide exactitud porque hay vidas en juego, y pide seguir funcionando para las demás señales si falla un dispositivo. Quitar "con todas las letras" (mismo ajuste que L1 "no puede apagarse") |
| L2 | ClearView: "La seguridad quedó como cualidad implícita, de las que todo sistema necesita" (`L2:31`) | Pragmatic `Characteristics.md:25-27`: Security es la primera de las prioritarias, "Essential, as the product's USP is resume anonymization"; las tres finales son Feasibility, Interoperability y Testability (`:50`). La palabra "implícita" no aparece en el repositorio | "la seguridad quedó fuera de las tres que eligen el estilo, aunque la lista de prioridades la pone primera". Choca con `L8:39` ("la seguridad es la primera cualidad") |

---

## 2. Contradicciones entre lecciones confirmadas

| Lecciones | Qué dicen | Versión correcta y por qué |
|---|---|---|
| L1 vs L3 (y L2) | L1: MonitorMe muestra "cientos de pacientes en la estación" (`L1:49`). L3: "quinientos pacientes por instalación" (`L3:15`) | L3. `Requirements.md:12` (20 por estación) y `:39` (500 por instalación). L1 mezcla las dos unidades |
| L1 vs L10 | L1: ClearView "usa inteligencia artificial para emparejar currículums anonimizados con puestos" (`L1:49`). L10: la IA no empareja, solo extrae rasgos; el puntaje lo calcula código común (`L10:27-29`) | L10. Pragmatic `C3-components-matching.md:16`: "AI should only be used for feature extraction and not for the scoring and matching itself"; ADR-011 `:35`. L1 no es falsa del todo (el sistema empareja), pero con L10 se oye contradicha. Cambiar L1 por "usa IA para leer currículums y puestos y extraer rasgos" |
| L2 vs L3 | L2: MonitorMe se quedó con tres, entre ellas "que crezca cuando lleguen más sensores" (`L2:19`). L3: la escalabilidad quedó abajo y "si llegan más sensores, se agregan máquinas a mano" (`L3:15`) | Ambas siguen la fuente, que se contradice sola: `BluzBrothers Characteristics.md:27` justifica Elasticity "as additional sensors may necessitate additional nodes" y `:32` / ADR-008 `:26` bajan Scalability porque se amplía a mano. Las tres finales son Evolvability, Performance y Elasticity (ADR-011 `:15`). Hay que fijar vocabulario: en L2 decir "elasticidad" y definirla; en L3 "escalabilidad" solo para la renuncia |
| L4 vs L11 | L4: el registro de pacientes quedó fuera (`L4:17`). L11: "es parte del sistema pero no es el foco" (`L11:39`) | L11, que sigue el cuerpo de ADR-005 `:15`. Corregir L4 |
| L5 vs L6 | L5: el pago autorizado se guarda en la misma transacción (`L5:39`). L6: pide la autorización primero y espera (`L6:21`) | L6 (`SD-001:42-47`) |
| L5 vs L7 | L5: el pago "no admite ninguna demora ni ningún duplicado" (`L5:47`). L7: llega al menos una vez y el duplicado se descarta (`L7:17`, `:45`) | L7 (ADR-008 `:13`, `:17`, `:21`) |
| L5 vs L8 | L5: el currículum original no lo puede leer nadie más (`L5:17`). L8: analítica lee directo de la base de candidatos (`L8:41`) | L8, con ADR-019 `:18`; la restricción de ADR-010 `:16` es solo para el emparejamiento |
| L2 vs L8 | L2: la seguridad de ClearView "quedó implícita" (`L2:31`). L8: "es la primera cualidad" (`L8:39`) | Las dos tienen base: es la primera de las prioritarias (`Characteristics.md:27`) pero no está entre las tres que eligen el estilo (`:50`). Cada lección debe decir cuál de las dos cosas cuenta |
| L8 vs L9 (aparente) | L8: el servicio de autenticación de Spotlight guarda datos personales (`L8:51`). L9: Spotlight compró la autenticación (`L9:15`) | Ambas son ciertas: ADR-009 `:28` compra el IdP y `:35-38` pide una fachada propia; `auth-service.md:27` es el servicio propio que guarda PII. Falta el puente. La fuente no llama "fachada" al servicio; esa identificación es una inferencia del análisis |

Tensión de tono sin contradicción de hechos: L5 presenta "la condición para dar el siguiente paso escrita" como virtud (`L5:23`) y L9 dice que condiciones como "un cuello de botella" no se pueden comprobar (`L9:39-41`). Es el mismo texto de Team 7 (`README.md:289`) leído con dos intenciones; conviene que L5 deje la valoración a L9.

---

## 3. Refutadas o matices

### Refutadas (el análisis se equivocó)

- L3, idea 29, "trescientos expertos no está en la fuente": sí está. ZAITects `README.md:53` ("200 candidates per week with 300 expert architects") y `usecases/test1-approach.md:7`. La cifra es correcta; solo la tabla de verificación cita el archivo equivocado (`cost-analysis.md`).
- L7, hallazgo 3, "las alertas salen a la estación": el guion es correcto. `FitnessFunctions/Alerts.md:3-5` describe el envío redundante por push al móvil y por el Streamer a la estación; `EventStorming.md:22-23` y `Requirements.md:20` también. ADR-016 es ambiguo, pero la fuente completa respalda el guion. Agregar `Alerts.md` a la tabla de verificación de L7.
- L4, cambio 4, "cambiar 'de reportes' por 'de administración' en L5": no hace falta. L5 enumera bases de datos (ADR-6 clientes, ADR-7 reportes, ADR-4 facturación, la operativa) y L4 enumera áreas (ADR-1 `:13-16`). No se contradicen.
- L8, hallazgo 6, "la idea 18 contradice a la lección 11 por el registro de pacientes": no. "Otro sistema, al que el personal sube resúmenes" es MyMedicalData (`Requirements.md:7`, `:24`), no el registro de pacientes (ADR-005).
- L5, idea 7, "las fuentes no coinciden sobre qué es el story": coinciden. `glossary.md:19` y ADR-011 `:20` lo definen igual; `C2-container.md:23` solo dice "S.M.A.R.T stories".
- L5, idea 6, "'equipo chico' no está en el texto de Pragmatic": la paráfrasis es válida. `Characteristics.md:53`: "financial and developer resources limited".
- L10, hallazgo 1, "ADR-0020 usa 85/70 para el mismo modelo": no es el mismo modelo. ADR-0020 es el de daños (FR#2M); el gancho de L10 es limpieza (FR#2L, 90/80). Los umbrales de limpieza sí cambian entre documentos: `4_Sequence_Diagram.md:201-205` usa 90 con revisión de 30 minutos y sin el 80, y ADR-0016 `:29` da 2 horas. La advertencia del guion (`L10:35`) es correcta; el análisis la apoyó en el documento equivocado.
- L11, hallazgo 6 y `L11:23`, "la página principal del repositorio sigue citando la decisión vieja": no solo. Pragmatic `README.md:62-63` cita ADR-006 y ADR-007 juntos, y `:194` describe la IA como servicios externos "as described in ADR-007". Solo `C3-components-story.md:9` cita únicamente ADR-006.

### Matices (la fuente es ambigua o el guion simplifica sin cambiar el sentido)

- L1, CloudWatch "unos centavos por cada métrica": ADR-003 `:31` dice "$0.30 USD for first 10,000 metrics", ambiguo (por métrica o por bloque). Decir "treinta centavos de dólar por los primeros diez mil" o no dar precio. "la más cara" (`L1:31`) es nuestra inferencia: el ADR dice que ELK y Grafana son las más baratas (`:35`) y compara unidades distintas.
- L1, "la razón quedó escrita en una sola frase": la sección Decision tiene tres razones (`ADR-003:35`); la del tiempo de una persona es la última, en una sola oración.
- L1, "pocas semanas": no aparece como tal; Team 7 se rotula "April - May 2021" (`README.md:1`). Aceptable, pero sin respaldo literal.
- L1, "dónde usar IA y dónde no" (MobilityCorp): no aparece literal en `Five-Nines/README.md`; lo respaldan los ADR de IA híbrida (ADR-0012, ADR-0018). Es lectura nuestra.
- L1, Team 7 y Sysops Squad nunca se vinculan (`L1:25` y `:53`) y el análisis acierta en que es un problema de presentación, no de hecho: `Team-7-src/README.md:1-5` los une.
- L2, "la disponibilidad tenía más notas que dos de las elegidas": confirmada con la imagen `components-sticky-cards.png`: Availability 4 notas, Evolvability 4, Elasticity 3, Performance 3.
- L2, nueve candidatas, siete prioritarias y tres finales: confirmado (`Characteristics.md:8-18`, `:21-30`, `:87`; ADR-008 `:11-21`).
- L2 y L5/L7/L8, Archangels y "clientes de Farmacy Food": no hay confusión de casos en ningún guion. Farmacy Food es siempre ArchColider (L1, L3, L4, L5, L7, L8, L9) y Farmacy Family siempre Archangels (L7, L8, L9). Archangels `BusinessGoalsDriversAndRequirements.md:10` dice que Farmacy Family es una mejora del sistema Farmacy Foods "designed by Arch Colider". Lo que falta es presentar la relación (ver sección 4).
- L3, "bajó tres cualidades" frente a "nueve a tres" de L2: las cuentas cuadran. De las seis que quedaron fuera, tres tienen decisión propia (ADR-008, 009, 010) y las otras tres (seguridad, tolerancia a fallos, configurabilidad) quedaron como cualidades de módulo (`Characteristics.md:45`).
- L3, "la mayor parte del costo es fijo": cierto en los escenarios de 500 y 1.000 solicitudes por día (56 %: DynamoDB, DataDog, SNS, Kafka y VPN suman 6.922 de 12.248 USD; EC2 tampoco cambia entre esos dos). En el de 10.000 baja a 31 %.
- L3, "sesenta veces" (`L3:57`): son 30 minutos (`4_Assumptions…md:8`, GPS tracker) frente a 30 segundos (`Appendix A:36` y `SD-001:130`, telemetría). Ambos documentos hablan de GPS, así que la aparente contradicción existe; que "nadie la notó" es nuestra inferencia, y el análisis no puede afirmar que sean "dos flujos".
- L3, "doce cualidades, sin orden": `3_NFRs.md` tiene 12 entradas (NFR_7 aparece dos veces, `:19` y `:30`), agrupadas por categoría. Lo que falta es prioridad, no orden.
- L3, "cambiaría varias decisiones" (`L3:59`): el guion marca la división como nuestra; "varias decisiones" no se nombra, pero es lectura declarada.
- L3, Spotlight "cuatro nueves también son demasiado", pero la meta es "entre tres y cuatro" (`L3:5-7`): fiel a `README.md:138-140`, que se contradice sola.
- L4, "la tabla de cinco criterios" de Archangels: la tabla tiene siete columnas (volatilidad, escalabilidad, tolerancia a fallos, seguridad, transacciones, dependencias y flujo; `ArchitectureAnalysis.md`, sección Granularity). El guion no dice "cinco"; solo omite dos.
- L4, "los microservicios piden un dominio estable y el de pedidos todavía no lo era": `SystemAppoach.md` dice "preferably a stable and known domain model" y "For the ordering system it's not applicable"; "todavía no lo era" es lectura. Además `ADR 002` (Accepted) incluye una tabla de puntajes (`:24-35`), que choca con "no salen de una tabla de puntajes" (`L4:39`).
- L4, "en casi todos los repositorios la razón escrita… es otra" (`L4:21`): sin cita ni recuento en la tabla de verificación. No verificable.
- L5, "su objeto principal" (`L5:9`): ADR-014 `:11` dice "for example the object story"; "principal" es del guion.
- L5, disponibilidad del vehículo por evento: `SD-001:48` hace `UPDATE vehicle` dentro de la transacción y a la vez `:65` dice "via event"; `3_Domain_Model.md:209` la pone como consistencia eventual. La fuente se contradice; L5 y L6 siguen el modelo de dominio.
- L5, criterio de Spotlight generalizado (`L5:47`): `npo-candidate.md:53-54` es una mitigación de su propio trade-off. Además ADR-012 `:30` lista "Loses on compensation by coupons" como riesgo del stock eventual de Farmacy Food: el ejemplo roza dinero.
- L5, "heladera": es voseo rioplatense; es de estilo, no de hecho. No se verificó en la fuente.
- L6, "se copia de una base a otra cada tanto" (`L6:17`): es la arquitectura final de Team 7 (`ADR-5:20`); la transición usa una base monolítica (`README.md:289`). L9 (`L9:39`) lo dice bien.
- L6, "Road Warrior supone que todos hablan igual": el supuesto viene del enunciado de la kata (`requirements/original_requirements.md:42` "All of these have a standard API") y el README lo repite (`:138`). Es correcto, pero no es una elección del equipo.
- L7, "ADR de reintento con backoff": ADR-023 `:21-22` dice "one could implement an exponential backoff"; el C3 (`:37`) lo da por implementado. Fiel a la fuente más fuerte.
- L8, "unos meses" para las fotos: 180 días y hasta dos años con disputa (ADR-0017 `:37-39`); simplifica sin cambiar el sentido. El contraste con el 90 del requisito pertenece a L11.
- L8, "resúmenes": `Glossary.md:14` define el snapshot como "holistic view of vital signs and medical history"; mejor "instantáneas".
- L8, "MonitorMe borra a las veinticuatro horas, que es lo que pide el cliente": `Requirements.md:14` pide guardar las últimas 24 horas; ADR-004 `:13-17` justifica el borrado por privacidad, rendimiento y costo.
- L9, "el documento del chat lista seguridad, escalabilidad y disponibilidad" (`L9:21`): `quanta/chat.md:31-35` lista cuatro, con "Responsiveness".
- L9, "Spotlight empezaba con financiación incierta" (`L9:5`): `Requirement-analysis.md:68-70` dice que recaudar fue difícil en la pandemia y concluye que "funding should not be a problem, at least in the long-term".
- L9, "ninguna aparece funcionando" (`L9:53`): BluzBrothers `README.md:91-94` marca las tres funciones con "Result: Success", aunque la cuenta de `Sizing.md` es un cálculo a mano; Archangels habla en futuro (`ArchitectureAnalysis.md:179`). Verificada en dos de doce repositorios.
- L9, ShopWise bajo "coherencia con lo ya elegido" (`L9:45`): ConnectedAI ADR-003 lo justifica por costo y funciones que sobran ("unnecessary features, additional licensing costs"); el ejemplo no ilustra el criterio del párrafo.
- L9, Road Warrior autogestiona "para controlar costos": confirmado (`adr-14:12`, `adr-15`).
- L11, "Ninguna de las dos explica por qué" una decisión reemplazó a la otra (`L11:21`): ADR-006 dice "Superseded by ADR-007" sin razón, pero ADR-007 `:28-44` compara un LLM propio en contenedor con uno externo y elige el externo con razones, aunque no nombra a ADR-006. Lo que falta es el vínculo explícito.
- L11, "Las mismas decisiones fijan el borde" (`L11:41`): ADR-014 `:15` (dentro de las cuatro) fija el WebSocket; el HTTP y la conmutación por el otro canal son de ADR-016 `:15`. El dossier D7 (V4) dice que "ADR-014 y ADR-016 deciden… los dos bordes".
- L11, "MonitorMe es el que mejor cerró lo que dejaba fuera" (`L11:39`): D7 respalda un hecho verificable ("es el único repo donde cuatro ADR se dedican a lo que se deja fuera y donde el README mantiene la lista de lo postergado"). El adjetivo "mejor" sobra y el criterio de KatArch (`751406f`) pide el hecho.
- L11, "una decisión abierta" (`L11:35`): ADR-022 no es solo del sistema de mensajería; abarca mensajería, identidad, base de datos, entorno de ejecución y bóveda de secretos (`:11-18`).
- L11, la regla "casi todas aceptadas o propuestas": coincide con D7 V3 (152 de 183 entre Accepted, Confirmed, Approved y Proposed, y 23 sin campo de estado).

---

## 4. Problemas de estructura que se repiten

Agrupados desde los análisis; no se verificaron contra la fuente salvo donde se indica.

1. Casos o equipos que entran en medio de un argumento sin presentación (fricción 3 a 4, a menudo con carga 4): aparece en las once lecciones. Los picos son L1 (cinco casos en 47 s: MonitorMe, ClearView, Sysops Squad, Farmacy Food, MobilityCorp, ideas 32 a 36), L2 (ClearView, The Archangels, monArch, MobilityCorp), L3 (Road Warrior, MobilityCorp, ZAItects, Certifiable, Farmacy Food), L4 (Archangels), L5 (Hey Blue!, MobilityCorp, Spotlight), L6 (Wildlife Watcher), L7 (Archangels), L8 (Farmacy Food, ShopWise), L9 (Farmacy Food, ShopWise), L10 (Certifiable) y L11 (Sysops Squad, Road Warrior).
2. Un mismo caso con dos nombres, o dos casos con nombre casi igual, sin vincular: ArchColider y Farmacy Food (L1), Team 7 y Sysops Squad (L1), "la de Amazon" y CloudWatch (L1), y Archangels, Farmacy Family y Farmacy Food (L2, L4, L7, L8, L9). En los guiones las atribuciones son correctas; el problema es que el espectador no sabe que Farmacy Family mejora Farmacy Food (Archangels `BusinessGoalsDriversAndRequirements.md:10`). Lecciones afectadas: L1, L2, L4, L7, L8, L9.
3. Términos usados antes de definirse o nunca definidos: "estilo" (L2, L4); "síncrona" (L6, definida 35 s después); "quantum" (L4, L5); "estado" (L11, idea 9, definido en la 18); "trade-off", "katas", "monolito" (L1); "determinista" y "prompt" (L10); "camino feliz" (L7); "fitness functions" (L9); "puerta", "zero trust", "sesión" (L8); "broker" (L3, L9); "falsos positivos" (L2, L10); "transacción", "agregado" (L5); "punto único de falla" (L6). Además "hoja de estilos" suena a CSS (L2) y "cualidad", "característica" y "rendimiento"/"velocidad" nombran lo mismo (L2).
4. Casos abandonados y retomados minutos después sin puente: L1 (DataDog, idea 38), L3 (MonitorMe y Spotlight), L4 (Sysops en el cierre), L5 (ClearView en el cierre), L6 (Sysops en el cierre), L7 (el pedido del gancho, idea 34), L8 (Farmacy Family en las escenas 3, 19, 29, 38), L10 (Certifiable partido en dos bloques y entre medio MobilityCorp), L11 (ClearView en dos tramos; MobilityCorp abandonado de 1:18 a 4:19).
5. Contenido que ya está en otra lección o pertenece a otra (ver sección 5): L2 repite la definición de cualidad de L1, los trade-offs de L3 y los requisitos copiados de L11; L4 repite la respuesta de la tarjeta de L8, las cuatro bases de L5 y el monolito modular de L9; L5 repite las heladeras de L7; L7 repite la reserva de MobilityCorp de L5 y L6; L10 repite tres veces "cambiar el modelo o el prompt cambia el resultado" (ideas 7, 34, 37).
6. Cierres que no vuelven al gancho o que terminan en puente: L1 cierra abriendo el tema de L2 en lugar de volver a su gancho (que es una definición del curso, sin hecho al que volver); L2, L3, L4, L5 y L6 terminan con una frase que apunta a la lección siguiente (el CLAUDE.md del proyecto pide que el puente lo haga la tarjeta del capítulo). L8 vuelve a Farmacy Family pero deja afuera "cómo se borra" de las cuatro preguntas (idea 39); L7 cierra con un escenario (proveedor de pagos caído) que el cuerpo nunca trató.
7. Mapas anunciados que el cuerpo no cumple: L3 (la "parte del sistema" con tres y cuatro nueves nunca vuelve), L6 (el cuarto tema "el precio de lo asíncrono" no está en las tres preguntas), L7 ("las vamos a ver en ese orden", pero las dos escrituras entran entre duplicado y reintento), L8 (cuatro preguntas, el cierre repasa tres) y L1 (cinco casos prometidos con nombre; "los otros siete" sin nombres).
8. Frases con varias cifras o varias piezas técnicas a la vez: L1 (26 y 27), L2 (fila 48, carga 5), L3 (20, 21, 30), L6 (17: "cien sistemas" y "doscientas mil configuraciones" con dos unidades), L9 (30), L10 (3, 27, 31), L11 (1, 11, 28).
9. Hedges aplanados (Proposed, should, may, Options contados como decisiones): L1, L4, L5, L6, L7, L9 y L11, y todo esto choca con lo que enseña L11 ("el estado es información"). Ver el anexo.
10. Carga estructural en la mitad de la lección: L2 (cuatro ideas con carga 4 entre 1:47 y 2:16), L8 (cinco con carga 4 entre 4:02 y 5:10, con cambio de caso cada 15 a 20 s), L5 (tramo "La línea": Farmacy Food, Spotlight y ClearView en 26 s).

---

## 5. Movimientos entre lecciones que proponen los análisis

"Cuántos análisis lo proponen" cuenta los análisis que piden mover el bloque o que dependen de que viva allí; los demás casos son propuestas de un solo análisis. Las filas se ordenan por coincidencia.

| Bloque | De | A | Cuántos análisis lo proponen |
|---|---|---|---|
| Caso de las fotos de MobilityCorp y la cita del requisito (ejemplo de las cifras y "una copia que envejece", L2 filas 47 a 52) | L2 | L11 | 2 (L2 lo pide; L8 pide dejar la contradicción de las fotos para L11; L11 ya lo usa como caso central) |
| "Separar un módulo cuando las métricas lo pidan" y la sección de estilo (monolito modular de Farmacy Food, L4 filas 27 a 31; L7 fila 33) | L4 y L7 | L9 | 2 (L4 y L7) |
| Detalle de cada caso del elenco (MonitorMe 500, 20 y 1 s; Sysops tarjetas y monolito; Farmacy Food heladeras y presupuesto; ClearView costo y sesgo) | L1 | L2 y L3, L4, L7, L10 | 1 (L1) |
| "Los otros siete ganadores" (L1 idea 37) | L1 | cortar o pasar al cierre de L11 | 1 (L1) |
| Cifras de 91 % y 52 % de las 183 decisiones (L1 idea 27) | L1 | L11 | 1 (L1; condicionado a verificar que L11 las use, hoy no) |
| Frase final de L1 sobre la "página de pedidos" (idea 40) | L1 | inicio de L2 | 1 (L1) |
| "Elegir sabiendo qué se pierde": The Archangels y monArch (L2 filas 37 a 43) | L2 | L3 | 1 (L2) |
| Descartes de la disponibilidad de MonitorMe (L2 filas 20 a 25), reducirlos a una frase | L2 | L3 | 1 (L2) |
| Kubernetes, instancias y los 30 s (L3 ideas 12 a 14) | L3 | L7 | 1 (L3) |
| Cuenta de costo de Farmacy Food (L3 ideas 26 a 28) | L3 | L9 | 1 (L3) |
| Respuesta de la tarjeta, "últimos cuatro dígitos" (L4 ideas 33 y 34) | L4 | L8 | 1 (L4; L6 pide además que L6 diga que la tarjeta va por mensajería asíncrona) |
| Hey Blue! y la base compartida (L5 ideas 16 a 19) | L5 | L4 | 1 (L5) |
| Enumeración de las cuatro bases de Sysops (L5 idea 11) | L5 | remitir a L4 | 1 (L5) |
| Road Warrior y el supuesto de los adaptadores (L6 ideas 22 a 26) | L6 | L3 | 1 (L6; "Road Warrior" ya está en L3, línea 27) |
| Cinco ADR de Road Warrior con el mismo contexto (L11 ideas 16 y 17) | L11 | L6 | 1 (L11; choca con el movimiento anterior: Road Warrior iría y vendría entre L3 y L6) |
| Dos escrituras, outbox e inbox, y el caso de MobilityCorp (L7 ideas 14 a 18) | L7 | L6 (alternativa: L5) | 1 (L7) |
| Estimación de stock de las heladeras (L7 idea 28) | L7 | ya está en L5 (cortar en L7) | 1 (L7) |
| ShopWise y el control del último paso (L8 ideas 32 y 33) | L8 | L10 | 1 (L8; L9 propone mover ShopWise dentro de L9 y L10 lo deja en su sitio) |
| Borrado pendiente de Farmacy Food (L8 idea 24) | L8 | L11 | 1 (L8) |
| "Reglas que se vigilan solas", fitness functions (L9 ideas 34 a 37) | L9 | L11 | 1 (L9; L2 ya anticipa L11 en la fila 19) |
| HTTP y WebSocket de MonitorMe (L11 idea 28) | L11 | L7 | 1 (L11) |
| Repetición de Sysops ("una sola base hasta el cuello de botella", L9 idea 26) | L9 | cortar; ya está en L5 | 1 (L9) |

Movimientos dentro de la misma lección (no cruzan lecciones, pero cambian la secuencia): L6 reordena "el precio de lo asíncrono"; L10 junta Certifiable en un bloque; L11 pone "estado" antes de "reemplazo"; L9 pasa ShopWise al bloque de costo. Un cambio de L4 necesita el visto bueno de Felix: `DISENO-CURSO.md` pone el razonamiento del estilo en L4 (no se abrió el archivo para confirmarlo; lo dice el análisis de L4).

---

## 6. Picos de carga y fricción por lección

Recuento hecho con script sobre las tablas de los análisis (negritas del brief). Duración y número de ideas son las que declara cada análisis.

| Lección | Duración | Ideas | Ideas con carga >= 4 | Ideas con fricción >= 4 |
|---|---|---|---|---|
| L1 Qué es una decisión de arquitectura | 7:22 | 40 | 11 (6, 7, 18, 19, 23, 26, 27, 32, 33, 34, 35) | 1 (40) |
| L2 Del pliego a tres características | 6:11 | 55 | 15 (2, 9, 20, 21, 23, 25, 27, 29, 38, 39, 41, 46, 47, 48, 55); la 48 es la única de carga 5 | 0 |
| L3 Renunciar, y hacer la cuenta | 6:44 | 40 | 9 (7, 12, 15, 20, 21, 26, 29, 30, 34) | 1 (30) |
| L4 Dónde se corta un sistema | 4:49 | 35 | 3 (18, 24, 26) | 1 (18, carga 4 y fricción 4) |
| L5 De quién es cada dato | 5:27 | 37 | 3 (17, 24, 31) | 0 |
| L6 Cómo se hablan las partes | 5:56 | 37 | 2 (17, 28) | 0 |
| L7 Cuando algo falla | 5:14 | 36 | 2 (16, 31) | 3 (16, 33, 35); la 16 tiene carga 4 y fricción 4 |
| L8 Los datos que no se pueden filtrar | 6:20 | 39 | 10 (3, 11, 14, 20, 24, 27, 28, 31, 32, 33) | 2 (24, 32) |
| L9 Comprar, construir y cuándo cambiar | 6:31 | 39 | 3 (5, 30, 34) | 0 |
| L10 Cuando una parte del sistema es un modelo | 7:23 | 39 | 10 (3, 9, 13, 16, 18, 24, 27, 31, 33, 35) | 1 (16, carga 4 y fricción 4) |
| L11 Lo que queda escrito | 4:50 | 34 | 9 (1, 2, 9, 11, 14, 19, 21, 25, 28) | 1 (19, carga 4 y fricción 4) |
| Total | 66:47 | 431 | 77 | 10 |

Lecturas rápidas: por minuto, las lecciones con más ideas de carga 4 o más son L2 (15 en 6:11, con ideas partidas a propósito), L11 (9 en 4:50), L8 (10 en 6:20), L1 (11 en 7:22) y L10 (10 en 7:23). Las ideas que juntan carga 4 y fricción 4 son siete: L3:30, L4:18, L7:16, L8:24, L8:32, L10:16 y L11:19, y las siete son un caso o equipo que entra a mitad de argumento sin presentación. L5, L6 y L9 no tienen ninguna fricción de 4, pero sí de 3 en siete, ocho y ocho ideas respectivamente.

---

## Anexo. Hallazgos propios de la verificación que los análisis no recogieron

1. Estados "Proposed" narrados como decisiones tomadas. L8 dice una vez "quedó como propuesta" (Farmacy Food ADR-006) y L11 enseña que el estado es información, pero el resto de los guiones no marca el estado. Lo que se usa como decisión firme y está en Proposed: ArchColider ADR-003 (monitoreo con DataDog, `L1:31`; `ADR-003:7`), ADR-007 (event sourcing), ADR-008 (al menos una vez), ADR-009 (proveedor de pagos), ADR-012 (stock de heladeras) y ADR-013 (catálogo en caché); todos los de Team 7 salvo ADR-8 (que es Obsolete): ADR-1, 2, 4, 5, 6, 7 y 12 (L4, L5, L6, L8); MonArch ADR02 y ADR05 (L5); Pegasuz ADR-007 (L9); Data Alchemists adr-3 a adr-7 (L11). Aceptadas: ArchColider ADR-002 y ADR-004; todas las de BluzBrothers y casi todas las de Pragmatic. Los análisis marcaron esto en L5, L6, L7, L9 y L11, pero no en L1.
2. Citas de las tablas de verificación que no sostienen la frase: L3 (300 expertos cita `cost-analysis.md`; correcto es `ZAITects README.md:53`); L2 (seguridad "implícita" cita `Characteristics.md l. 46-50`, donde no aparece); L7 (alertas por dos canales no cita `FitnessFunctions/Alerts.md`); L4 (registro de pacientes "fuera" cita ADR-005, cuyo cuerpo dice lo contrario); L1 (CloudWatch "~0,30 USD por métrica" no es lo que dice el ADR); L9 (monolito de Spotlight sin la condición de costo).
3. El hecho de que ADR-0017 define dos plazos (180 y 90 días) y que la L8 ya lo cuenta con "unos meses… las copias de trabajo, menos" hace que el gancho de L11 pida un rediseño y no solo un retoque.
