# Lo que queda escrito

## Lección 11 {#gancho}

En el repositorio de MobilityCorp hay tres documentos que hablan de cuánto tiempo se guardan las fotos de los vehículos. Los requisitos dicen que las fotos se guardan noventa días, sin distinguir de qué fotos se trata. La decisión que fija la política dice ciento ochenta días para las fotos originales, más si hay una disputa, y noventa para las copias de trabajo. Y un diagrama de la devolución dice "fotos guardadas noventa días", sin decir cuáles, y cita como respaldo esa misma decisión.

Puede que el noventa del requisito hable solo de las copias, o puede que la decisión se haya apartado del requisito a propósito. Leyendo el repositorio, no hay forma de saber cuál de las dos cosas es.

## Que otro pueda comprobarla {#pregunta}

Una decisión escrita sirve si otra persona puede comprobarla sin preguntarle al autor. Para eso tiene que decir qué requisito la pide, mantenerse al día cuando cambia, y marcar dónde termina el sistema. Y tiene que decir su estado, una palabra que indica si la decisión rige, si cambió o si sigue pendiente: propuesta, aceptada, reemplazada, rechazada o abierta.

## El eslabón que falta {#cifras}

En la primera lección vimos que la parte menos escrita de una decisión es el requisito que la pide, que aparece apenas en una de cada cuatro. Las fotos de MobilityCorp muestran lo que se pierde. La decisión cita los requisitos de las fotos de limpieza y de daños, pero no el que fija los noventa días. Y como no lo cita, tampoco dice si se aparta de él, ni por qué.

Si una decisión se aparta de un requisito, esa decisión es el lugar para decirlo, y para explicar la razón. Si no lo dice, quien lea los dos documentos encuentra dos cifras y no sabe cuál manda.

## Una decisión reemplazada sin razón {#reemplazo}

ClearView tiene una decisión que dice que los modelos de inteligencia artificial corren en contenedores propios. Su estado dice que la reemplazó otra, la que elige usar modelos externos. La nueva compara las dos opciones y explica por qué elige la externa, pero no nombra a la decisión que reemplaza, y la vieja no dice por qué quedó reemplazada. El vínculo entre las dos hay que deducirlo.

Y el reemplazo no llegó a todos los documentos. El diagrama del servicio que anonimiza los currículums sigue citando solo la decisión vieja. Quien lea ese diagrama va a creer que los modelos corren adentro del sistema. O sea, reemplazar una decisión es escribir por qué, y actualizar todo lo que la cita.

## Lo obsoleto y lo repetido {#obsoleto}

Sysops Squad marcó una de sus decisiones como obsoleta, la que copiaba datos de facturación entre bases, tabla por tabla. No dice por qué quedó obsoleta, ni qué la reemplaza. Y otra decisión, que queda como propuesta, usa ese mismo mecanismo. Quien lea las dos no sabe si el mecanismo se usa o no.

Road Warrior, el panel de reservas de viaje, muestra otra forma de perder información. Cinco de sus decisiones sobre comunicación entre partes empiezan con el mismo párrafo de contexto, palabra por palabra. Los costos que anotan son los de la categoría en general, no los de esa conexión en ese sistema. El texto está, pero no permite comprobar ninguna de esas cinco decisiones en particular.

## El estado es información {#estado}

Casi todas las decisiones de los ganadores están aceptadas o propuestas. Unas pocas usan otros estados, y esos dicen cosas que aceptado no dice.

ClearView rechazó guardar currículums en una memoria temporal para aliviar los reintentos, porque prefiere la carga al costo de esa memoria. Y dejó escrita la condición para reabrir la discusión: que algún día la carga se vuelva un cuello de botella. También rechazó resolver, por ahora, que dos gerentes trabajen a la vez sobre el mismo candidato, porque ese requisito solo se suponía.

Y dejó una decisión abierta, sin elegir, con lo que el sistema va a necesitar y lo que ya se sabe de cada opción. Rechazado dice qué se consideró y por qué no. Abierto dice qué falta decidir. Los dos evitan que alguien vuelva a discutir lo mismo sin saberlo.

## Cerrar lo que queda fuera {#fuera}

MonitorMe es el único de los doce repositorios donde cuatro decisiones se dedican a lo que queda fuera. El registro de pacientes es parte del sistema, pero no es el foco. Los sensores son otro contexto, algo que aclaró el cliente cuando le preguntaron. Y la aplicación del teléfono y la estación de enfermería las diseñan otros equipos.

Pero fuera de alcance no quiere decir sin conexión. Dos de esas decisiones fijan el borde: las alertas llegan al teléfono por HTTP, los datos llegan a la estación por WebSocket, y si un canal falla, avisa el otro. Además, la página principal mantiene una tabla de decisiones postergadas, de la autenticación a la integración con otro producto de la empresa, y cada una dice lo que falta saber.

## Noventa o ciento ochenta {#cierre}

Las fotos de MobilityCorp siguen teniendo dos cifras que no se explican entre sí. Si la decisión hubiera citado el requisito de los noventa días, habría tenido que decir si su noventa para las copias es ese mismo, o si se aparta y por qué. La duda se habría resuelto el día en que se escribió.

Eso es lo que hace que una decisión se pueda comprobar. Dice qué cuesta, qué descartó y qué la pide, dice si sigue vigente, y cuando cambia, deja el rastro del cambio. Lo que no queda escrito, el próximo que lea el diseño tiene que adivinarlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| NFR_7 "photos 90 days" (sin distinguir clases; NFR_7 aparece dos veces en el archivo); ADR-0017: originales "Default: 180 days" (hasta 2 años con disputa), derivados 90 días; SD-003 "Photos stored 90 days (ADR-0017: GDPR compliance)"; ADR-0017 cita FR-CV-007, FR#2M, FR#2L y no NFR_7 | Five Nines: `requirements/3_NFRs.md` l. 19, 30; `adrs/ADR-0017…` l. 6-8, 37-41; `hld/core-func/car-van-rental/4_Sequence_Diagram.md` l. 249; D7 B1 |
| 27 % de las decisiones remite al requisito con identificador o enlace | Conteo a mano, D7 §2.1 |
| ADR-006 "Superseded by ADR-007", sin razón; ADR-007 compara LLM propio en contenedor y externo y elige el externo, sin nombrar ADR-006; C3 de Story cita solo ADR-006 (el README cita ADR-006 y ADR-007 juntos; no se narra) | Pragmatic: `ADR/ADR-006`; `ADR/ADR-007` l. 28-44; `README.md` l. 62-63, 194; `C4/C3-components-story.md` l. 9; D7 B2 |
| Team 7 ADR-8 "OBSOLETE" sin motivo ni reemplazo; ADR-5 (Proposed) usa replicación por tabla | Team 7: `ADR/ADR-8-messaging-sync.md`; `ADR/ADR-5` l. 4, 20; D7 B3 |
| Road Warrior: 5 ADR con el mismo Context; costos de categoría | Data Alchemists: `adrs/adr-3` a `adr-7`; D7 B5 |
| 152 de 183 entre Accepted, Confirmed, Approved y Proposed; 23 sin estado | D7 V3 |
| ADR-024 Denied: "we prefer the load over the memory cost"; condición de reapertura | Pragmatic: `ADR/ADR-024-caching-of-resumes.md` l. 24-25 |
| ADR-021 Denied: "The requirement is only assumed and not explicit."; ADR-022 Open (mensajería, identidad, base de datos, entorno de ejecución, almacén de secretos) | Pragmatic: `ADR/ADR-021`, `ADR-022` l. 11-18 |
| MonitorMe ADR-005, 006, 013, 014, 016 ("único repo donde cuatro ADR se dedican a lo que se deja fuera", D7 V4); ADR-014 fija el WebSocket, ADR-016 el HTTP y la conmutación; tabla "Postponed decisions or well-known issues" | BluzBrothers: `ADR/`; `README.md` l. 98-106; D7 V4 |
