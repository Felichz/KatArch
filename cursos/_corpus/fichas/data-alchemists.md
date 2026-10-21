# Ficha · Profitero Data Alchemists · Road Warrior (Otoño 2023, edición externa)

Fuente: texto del repo en `katas-src/Profitero-Data-Alchemists/` (26 archivos de texto, todos leídos completos). Historia de git: clon hermano, 123 commits del 2023-09-11 al 2023-09-29. Las rutas de las citas son relativas a la raíz del repo, sin `-src`. Las líneas se indican como `archivo:línea`.

## 1. El caso

[DATO] El cliente es una startup independiente, no ligada a ninguna agencia, que quiere un panel de gestión de viajes en línea, web y móvil, para que un viajero vea todas sus reservas agrupadas por viaje (`requirements/original_requirements.md:3-5`, Q&A 1 en `requirements/original_requirements.md:36-38`). El equipo es el área de arquitectura de Profitero, una empresa de datos de e-commerce (`README.md:38`). El problema central que el repo nombra es mantener al día reservas que llegan de fuentes distintas (correo, APIs de aerolíneas, hoteles y autos, SABRE y APOLLO) y mostrar cada cambio en la app en menos de 5 minutos desde que Road Warrior lo recibe (`README.md:91`, `README.md:126`, Q13 en `requirements/original_requirements.md:92`), con hasta 2 millones de usuarios activos por semana y 15 millones de cuentas (`README.md:130`, `README.md:155`), y 150 millones de reservas que se refrescan cada 5 minutos (`README.md:131`). Restricciones duras: disponibilidad de 99,99 %, o como máximo 5 minutos de caída no planeada al mes (`README.md:121`); respuesta web en 800 ms y primer contenido móvil en menos de 1,4 s (`README.md:124-125`); operación internacional y interfaz en varios idiomas (`README.md:113-115`); integración con SABRE y APOLLO (`requirements/original_requirements.md:24`); MVP lo antes posible (Q18, `requirements/original_requirements.md:112`); cambios que se reflejan de inmediato en la app (Q22, `requirements/original_requirements.md:128`). Presupuesto y madurez del equipo quedan a criterio del equipo (Q19 a Q21, `requirements/original_requirements.md:114-124`). [HUECO] No se declara regulación externa; GDPR aparece solo como motivo de diseño en `information_viewpoint/README.md:47`.

## 2. Qué entregó el equipo

- `README.md`: portada, equipo (5 integrantes), resumen del caso, resumen de cada vista, índice de ADR e hitos de implementación por iteración (`README.md:460-478`).
- `requirements/original_requirements.md`: requisitos del cliente y 28 preguntas y respuestas con el cliente.
- `README.md`, sección "Architecture Style": tabla de características de arquitectura (`README.md:151-173`). No tiene carpeta propia; el diagrama de su ADR no está en el corpus de texto.
- `functional_viewpoint/README.md`: flujo principal y ocho subflujos (perfil, descubrimiento por correo, reservas, seguimiento, viajes, compartir, agencias, reportes).
- `context_viewpoint/README.md`: contexto (nivel 1), contenedores (nivel 2) y componentes de cada contenedor (nivel 3): trackers, notificaciones, sharing, reportes, y seis pares lector/actualizador de datos.
- `operational_viewpoint/README.md`: cómo opera el sistema: login, configuración, configuración de un viaje y compartir un viaje.
- `information_viewpoint/README.md`: modelo de datos con nueve entidades (usuario, reserva, itinerario, viaje, lista de control de acceso, agencia, notificación, reporte de usuario, reporte de proveedor) y changelog de seis revisiones.
- `concurrency_viewpoint/README.md`: tres grupos de escalado, y el detalle de actores de API, lectores/actualizadores y mensajería.
- `development_viewpoint/README.md`: estructura de código (monorepo frente a multirepo), estrategia de merge, automatización frente a manual.
- `deployment_viewpoint/README.md`: dos ambientes (producción y no producción) creados con IaC, y componentes de cada ambiente.
- `security_perspective/README.md`: lista de prácticas de seguridad requeridas (autenticación, cifrado, secretos, sesiones, pruebas, respuesta a incidentes, auditoría).
- `adrs/`: 15 ADR (`adr-1` a `adr-15`) y una plantilla (`adr-0-template.md`, que lleva el título "ADR 1: Template").

Cantidad de ADR: 15. Diagramas: el repo referencia 34 archivos de imagen distintos (diagramas de nivel 1, 2 y 3 al estilo C4, flujos funcionales, esquema de datos, actores de concurrencia, despliegue, y el flujo de GitLab). Ninguno está en el corpus de texto, así que su contenido no se leyó. [DATO]

Técnicas declaradas: Viewpoints and Perspectives de Rozanski y Woods, y C4 (`README.md:44-46`). Milestones por iteración (`README.md:460-478`). Supuestos en una sección propia (`README.md:137-142`). Sin fitness functions, event storming, OKR, glosario ni historias de usuario en el corpus. [DATO]

## 3. Decisiones

Todas las celdas son [DATO], salvo lo que se marca [DEDUCCIÓN] o [HUECO]. "No declara" significa que el ADR no nombra la alternativa ni el costo.

| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas |
|---|---|---|---|---|---|
| ADR-1 | Arquitectura orientada a eventos (event-driven) para todo el sistema. | No declara estilos alternativos. Sí declara un descarte de característica: Elasticity frente a Evolvability (`README.md:160`). | Performance, Scalability y Evolvability son las tres características prioritarias; como startup, la capacidad de adaptarse a feedback y mercado es lo primero (`README.md:151-162`, `adrs/adr-1-architecture-style.md:9`). | Complejidad en flujos de eventos y consistencia de datos; exige operación y monitoreo; curva de aprendizaje (`adrs/adr-1-architecture-style.md:23-25`). Riesgos: consistencia distribuida y routing difícil de depurar (`adrs/adr-1-architecture-style.md:28-29`). | event-driven, ADR, escalabilidad, evolutividad, tradeoffs-explicitos, riesgos-explicitos |
| ADR-2 | La capa de API (Gateway API) es el único punto de contacto de las interfaces de usuario (app móvil y web). | No declara. | Picos de uso, indisponibilidad, congelamientos y pérdida de datos observados; abstracción frente a servicios internos (`adrs/adr-2-api-layer.md:9`, `adrs/adr-2-api-layer.md:17-19`). | Complejidad adicional que puede retrasar desarrollo y mantenimiento; posible sobrecarga de rendimiento por la capa (`adrs/adr-2-api-layer.md:23-26`). Riesgos declarados (`adrs/adr-2-api-layer.md:25-27`). | API-gateway, ADR, seguridad, tradeoffs-explicitos, riesgos-explicitos |
| ADR-3 | Lectores de datos (Data Readers) síncronos, expuestos por API. | No nombra una alternativa. Su Contexto plantea elegir entre comunicación síncrona y asíncrona (`adrs/adr-3-data-reader.md:9`). | Respuesta inmediata, interfaz simple y latencia predecible para pantallas interactivas (`adrs/adr-3-data-reader.md:13`, `adrs/adr-3-data-reader.md:18-22`). | Escalar es más difícil; los hilos quedan ocupados durante la petición; flujos de varios pasos se complican (`adrs/adr-3-data-reader.md:25-29`). No tiene sección de riesgos. Contexto y Consecuencias son idénticos a los de ADR-6. | ADR, rendimiento-latencia, escalabilidad, tradeoffs-explicitos |
| ADR-4 | Actualizadores de datos (Data Updaters) asíncronos, por mensajería. | No nombra una alternativa. Su Contexto plantea síncrono frente a asíncrono (`adrs/adr-4-data-updater.md:9`). | Desacoplar los actualizadores de la base de datos para adaptarse a su rendimiento; escalar consumidores; durabilidad y reintentos (`adrs/adr-4-data-updater.md:13`, `adrs/adr-4-data-updater.md:19-23`). | Complejidad de colas y reintentos; sincronización de consumidores concurrentes; errores que el emisor no ve (`adrs/adr-4-data-updater.md:25-30`). Riesgos: TBD (`adrs/adr-4-data-updater.md:32-33`). Texto igual al de ADR-5 y ADR-7. | ADR, cola-de-mensajes, resiliencia-fallos, tradeoffs-explicitos |
| ADR-5 | Trackers de correo y de reservas asíncronos, por mensajería. | No nombra una alternativa. Su Contexto plantea síncrono frente a asíncrono (`adrs/adr-5-trackers.md:9`). | Desacoplar los trackers de las APIs de correo y de agencias, para adaptarse a su rendimiento (`adrs/adr-5-trackers.md:13`). | Los mismos costos que ADR-4 (`adrs/adr-5-trackers.md:25-30`). Riesgos: TBD (`adrs/adr-5-trackers.md:32-33`). | ADR, cola-de-mensajes, resiliencia-fallos, tradeoffs-explicitos |
| ADR-6 | Servicio de Sharing síncrono, por API. | No nombra una alternativa. Su Contexto plantea síncrono frente a asíncrono (`adrs/adr-6-sharing.md:9`). | Compartir de forma inmediata y en tiempo real entre usuarios (`adrs/adr-6-sharing.md:12-15`). | Escalar servicios síncronos, recursos retenidos y flujos complejos (`adrs/adr-6-sharing.md:27-31`). No tiene sección de riesgos. Ver tensión con el topic de Sharing en la sección 7. | ADR, rendimiento-latencia, tradeoffs-explicitos |
| ADR-7 | Publishers de redes sociales y notificaciones asíncronos, por mensajería. | No nombra una alternativa. Su Contexto plantea síncrono frente a asíncrono (`adrs/adr-7-publishers.md:9`). | Desacoplar de las APIs de notificaciones y de redes sociales (`adrs/adr-7-publishers.md:13`). | Los mismos costos que ADR-4 (`adrs/adr-7-publishers.md:25-30`). Riesgos: TBD (`adrs/adr-7-publishers.md:32-33`). | ADR, cola-de-mensajes, resiliencia-fallos, tradeoffs-explicitos |
| ADR-8 | Tres grupos de escalado separados: API, Data Readers/Updaters y Messaging. | No declara. | Escalar cada servicio según su carga; ahorro de costo al no sobre-aprovisionar (`adrs/adr-8-scaling-groups.md:9-12`, `adrs/adr-8-scaling-groups.md:36`). | Complejidad de operar tres grupos; métricas consistentes entre servicios; dependencias que pueden desbordarse (`adrs/adr-8-scaling-groups.md:43-47`). No tiene sección de riesgos. | ADR, escalabilidad, costo, observabilidad, tradeoffs-explicitos |
| ADR-9 | Topics para difusión y topics compactados, que conservan el último mensaje por clave. | No declara. | Difundir eventos a varios suscriptores a la vez; optimizar almacenamiento y entrega con compactados (`adrs/adr-9-topics.md:12-14`). | Gestión de suscriptores; rendimiento según número de topics y volumen; balanceo con muchos suscriptores (`adrs/adr-9-topics.md:25-29`). Riesgos: TBD (`adrs/adr-9-topics.md:32`). | ADR, cola-de-mensajes, tradeoffs-explicitos |
| ADR-10 | La clave de partición del topic y la de la tabla son la misma. El ADR no nombra cuál. | No declara. | Que todas las actualizaciones de un mismo registro vayan a la misma partición, sin colisiones (`adrs/adr-10-partitioning-key.md:12`). | Una clave que cambia de patrón deja de ser óptima; una clave mala fragmenta datos relacionados; complejidad operativa (`adrs/adr-10-partitioning-key.md:25-29`). No tiene sección de riesgos. | ADR, escalabilidad, rendimiento-latencia, tradeoffs-explicitos |
| ADR-11 | Dos monorepos: uno para el frontend (web y móvil) y otro para los microservicios de backend. | No lo declara el ADR. `development_viewpoint/README.md:15-17` describe monorepo y multirepo en general, sin decir que el multirepo se evaluó para este sistema. | Reuso de código, gestión de dependencias, consistencia y CI/CD más simple (`adrs/adr-11-monorepos.md:12-13`, `adrs/adr-11-monorepos.md:18-24`); "early stages" (`adrs/adr-11-monorepos.md:12`). | Tiempos de build que crecen; coordinación en equipos grandes; PRs más complejas (`adrs/adr-11-monorepos.md:27-31`). No tiene sección de riesgos. | ADR, testabilidad, evolutividad, otro: monorepo, tradeoffs-explicitos |
| ADR-12 | GitLab Flow como estrategia de merge para frontend y backend. | Las Consecuencias comparan con GitFlow y dicen que tiene menos ramas y reglas (`adrs/adr-12-gitlab-flow.md:17`). La tabla de estrategias (`development_viewpoint/README.md:29`) es una imagen no leída. | Restricciones del calendario de releases de la app móvil; simplificar releases conjuntos (`adrs/adr-12-gitlab-flow.md:12`). | Riesgo de problemas de integración por merges frecuentes; menos control granular del release; escalado a proyectos grandes (`adrs/adr-12-gitlab-flow.md:24-28`). No tiene sección de riesgos. | ADR, deployability, tradeoffs-explicitos |
| ADR-13 | Despliegue multi-zona dentro de una sola región, con balanceadores públicos y firewall. | Multi-región: descartada por los costos de red adicionales entre regiones (`adrs/adr-13-infrastructure.md:12`). | Alta disponibilidad, recuperación ante falla de una zona, latencia menor y escalado (`adrs/adr-13-infrastructure.md:9`, `adrs/adr-13-infrastructure.md:16-22`). | Complejidad; costo de hardware, red y transferencia entre zonas; latencia en sincronizaciones entre zonas (`adrs/adr-13-infrastructure.md:25-29`). No tiene sección de riesgos. [DEDUCCIÓN] El adverbio "initially" sugiere una expansión posterior (`adrs/adr-13-infrastructure.md:12`). | ADR, disponibilidad-HA, resiliencia-fallos, costo, tradeoffs-explicitos |
| ADR-14 | Base NoSQL agrupada y autogestionada (MongoDB propuesto) en Kubernetes, con tablas de modelo orientado a objetos. | No nombra una alternativa descartada. Las Consecuencias comparan con bases relacionales (`adrs/adr-14-no-sql-database.md:29`), y `information_viewpoint/README.md:5` busca eliminar los joins. | Escalado horizontal, alto rendimiento, replicación y sharding integrados; controlar costos al autogestionar en Kubernetes (`adrs/adr-14-no-sql-database.md:12`, `adrs/adr-14-no-sql-database.md:17-23`). | Sin transacciones ACID en la mayoría de los casos; consultas limitadas; integridad de datos con más esfuerzo (`adrs/adr-14-no-sql-database.md:27-31`). No tiene sección de riesgos. | ADR, escalabilidad, costo, contenedores, otro: autogestionado, tradeoffs-explicitos |
| ADR-15 | Broker de mensajes autogestionado: Kafka self-hosted en Kubernetes. | No declara alternativas. La elección de autogestionar no se compara con un servicio gestionado. | Alta disponibilidad, durabilidad y escalado horizontal en cluster; "cost savings in the initial project phases" (`adrs/adr-15-message-broker.md:12`, `adrs/adr-15-message-broker.md:17-23`). | Complejidad de cluster; sobrecarga de monitoreo y mantenimiento; configuración consistente entre nodos (`adrs/adr-15-message-broker.md:27-31`). No tiene sección de riesgos. | ADR, cola-de-mensajes, kafka, disponibilidad-HA, costo, contenedores, otro: autogestionado, tradeoffs-explicitos |

Notas de la tabla:
- [HUECO] Ningún ADR tiene estado distinto de "Proposed" (`adrs/adr-0-template.md:6` ofrece Proposed, Confirmed o Declined; el resto de los ADR tiene "Proposed" en su línea 6).
- [DEDUCCIÓN] El ADR-15 deja fuera la comparación con un servicio gestionado; el texto no dice si se evaluó.

## 4. Patrones y prácticas presentes

- [DATO] **Event-driven**, etiqueta `event-driven`: los cambios de reservas y las notificaciones viajan por topics entre contenedores (`adrs/adr-1-architecture-style.md:12`, `context_viewpoint/README.md:63-94`).
- [DATO] **Gateway API**, etiqueta `API-gateway`: entrada única de peticiones externas, con autenticación y orquestación de la lógica (`context_viewpoint/README.md:29`, `adrs/adr-2-api-layer.md:11-12`).
- [DATO] **Microservicios**, etiqueta `microservicios`: cada función es un servicio con nombre propio, por ejemplo Emails Tracker, Emails Parser, Reservations Updater, Vendor Report Generator (`context_viewpoint/README.md:63-165`).
- [DATO] **Kafka autogestionado** y **topics** para la mensajería, etiquetas `kafka` y `cola-de-mensajes`: `adrs/adr-15-message-broker.md:12`, `deployment_viewpoint/README.md:17`. El concurrency viewpoint usa la expresión "distributed event streaming platform" (`concurrency_viewpoint/README.md:10`), por eso también se etiqueta `streaming`.
- [DATO] **Topics compactados como estado de seguimiento**, etiqueta `cola-de-mensajes`: el Emails Tracker guarda la última marca de tiempo procesada en el topic compactado (`context_viewpoint/README.md:63-68`). El Reservation Tracker guarda por clave las reservas activas (`concurrency_viewpoint/README.md:63`).
- [DATO] **Misma clave de partición para topic y tabla**, etiqueta `escalabilidad`: `adrs/adr-10-partitioning-key.md:12`, `concurrency_viewpoint/README.md:51`. Un Itinerary Tracker por partición, sin solapamiento, para ordenar actualizaciones (`concurrency_viewpoint/README.md:65`).
- [DATO] **Lectura y escritura en servicios separados**, etiqueta `escalabilidad`: lectores síncronos y actualizadores asíncronos, con grupos de escalado propios (`adrs/adr-3-data-reader.md:11-12`, `adrs/adr-4-data-updater.md:12`, `adrs/adr-8-scaling-groups.md:12-27`). El término CQRS no aparece en el repo y no se etiqueta.
- [DATO] **Autoescalado y balanceador de carga**, etiqueta `escalabilidad`: `concurrency_viewpoint/README.md:11-12`, `concurrency_viewpoint/README.md:43`, `deployment_viewpoint/README.md:16`.
- [DATO] **Multi-zona en una región**, etiqueta `disponibilidad-HA`: `adrs/adr-13-infrastructure.md:12`, `deployment_viewpoint/README.md:15`.
- [DATO] **Kubernetes como gestor de recursos**, etiqueta `contenedores`: `deployment_viewpoint/README.md:16`.
- [DATO] **Infraestructura como código para dos ambientes**, etiqueta `IaC`: `deployment_viewpoint/README.md:4`. La herramienta no se nombra.
- [DATO] **Observabilidad de terceros**, etiqueta `observabilidad`: `deployment_viewpoint/README.md:7`. El proveedor no se nombra.
- [DATO] **Login delegado** en Google, Apple o Microsoft, sin guardar contraseñas, etiqueta `seguridad`: `functional_viewpoint/README.md:45`, `operational_viewpoint/README.md:33`.
- [DATO] **Prácticas de seguridad en lista**, etiqueta `seguridad`: cifrado en tránsito y en reposo, secretos fuera del código, sesiones, pruebas de seguridad, respuesta a incidentes y auditoría (`security_perspective/README.md:6-49`). Salvo el control de acceso por rol (`security_perspective/README.md:7`), no toma decisiones por componente.
- [DATO] **Clave sustituta para la reserva** y **itinerario en colección aparte**, etiqueta `privacidad-GDPR`: `information_viewpoint/README.md:46-47`, `information_viewpoint/README.md:87-92`.
- [DATO] **Reportes para proveedores solo con agregados**, etiqueta `privacidad-GDPR`: `functional_viewpoint/README.md:156`, `information_viewpoint/README.md:274-276`.
- [DATO] **Viaje "unassigned" por usuario**: todas las reservas nuevas o descubiertas por correo entran ahí (`functional_viewpoint/README.md:56-58`, `functional_viewpoint/README.md:73`, `information_viewpoint/README.md:165-178`). Sin etiqueta propia.
- [DATO] **Monorepo para frontend y para backend**, etiquetas `otro: monorepo` y `testabilidad`: `adrs/adr-11-monorepos.md:12`, `development_viewpoint/README.md:20`.
- [DATO] **GitLab Flow**, etiqueta `deployability`: `adrs/adr-12-gitlab-flow.md:12`, `development_viewpoint/README.md:35`.
- [DATO] **Automatización completa en backend, QA manual en frontend**, etiqueta `testabilidad`: `development_viewpoint/README.md:52-53`. La razón declarada es el time to market.
- [DATO] **Plantilla de ADR** con Contexto, Decisión y Consecuencias, etiqueta `ADR`: `adrs/adr-0-template.md:1-23`.
- [DATO] **C4 y Rozanski y Woods**, etiquetas `C4` y `otro: marco-viewpoints-Rozanski-Woods`: `README.md:44-46`.
- [DATO] **Supuestos en sección propia**, etiqueta `supuestos-explicitos`: `README.md:137-142`.
- [DATO] **Riesgos por ADR**, etiqueta `riesgos-explicitos`: solo ADR-1 y ADR-2 los desarrollan. Los de ADR-4, 5, 7 y 9 dicen "TBD" (sección 7).
- [DATO] **Fuera de alcance declarado**, etiqueta `fuera-de-alcance-explicito`: sección 7.
- [DATO] **Hitos por iteración de MVP**, etiqueta `otro: milestones-por-iteracion`: `README.md:460-478`.
- [DATO] **CDN global para contenido estático**, etiqueta `edge`: `context_viewpoint/README.md:28`.
- [DATO] **Redacción asistida con ChatGPT** en el modelo de información, etiqueta `otro: redaccion-con-IA`: `information_viewpoint/README.md:309` (Revisión 4) y 12 commits de git con "rewrite with chatgpt" en el clon hermano. Es un hecho de proceso, no de arquitectura.

## 5. Cómo llegan de los requisitos a la arquitectura

[DATO] La cadena visible es parcial. El orden que sigue el repo es: requisitos (`README.md:69-142`, enlazados a `requirements/original_requirements.md`), tabla de características (`README.md:151-158`), ADR-1 (`adrs/adr-1-architecture-style.md:9`), vistas funcionales, de contexto, de concurrencia y de despliegue, y por último los ADR 2 a 15. El índice del README enlaza cada ADR (`README.md:444-458`). Los subflujos se enlazan desde el flujo principal (`README.md:205-214`), y los contenedores de nivel 3 desde el nivel 2 (`README.md:275-284`).

[DATO] Características: el repo lista nueve. Tres llevan la marca "Top": Performance, Scalability y Evolvability (`README.md:153`, `README.md:155`, `README.md:158`). Tres no tienen marca: Responsiveness, Elasticity e Interoperability (`README.md:154`, `README.md:156`, `README.md:157`). Tres son implícitas: Availability, Security y Maintainability (`README.md:171-173`). El orden es solo la marca; no hay ponderación numérica. El desempate entre Elasticity y Evolvability se resolvió a favor de Evolvability (`README.md:160`).

[HUECO] Los ADR 2 a 15 no citan una fila de la tabla. ADR-3 a 7 citan "Performance, Scalability, Reliability requirements" (`adrs/adr-3-data-reader.md:9`), y Reliability no está en la tabla. ADR-13 cita "high Availability requirements" (`adrs/adr-13-infrastructure.md:9`), y el viewpoint de despliegue fija el 99,99 % (`deployment_viewpoint/README.md:14`). Esa es la única cadena requisito → decisión que se puede seguir de punta a punta, y termina en la multi-zona. No hay matriz de trazabilidad.

[DEDUCCIÓN] El supuesto de que todas las APIs de agencias tienen una interfaz estándar y cambia solo el endpoint (`README.md:138`) se refleja en la entidad Agencia, que solo tiene un campo "API URL" (`information_viewpoint/README.md:220`). Es una coincidencia entre dos documentos; el repo no lo enlaza.

## 6. Lo distintivo

1. **Estado del seguimiento dentro del topic compactado, con una instancia por partición.** Qué hizo: el Emails Tracker guarda en el topic compactado de direcciones la última marca de tiempo procesada (`context_viewpoint/README.md:63-68`). El Itinerary Tracker asigna a cada instancia una o más particiones, sin solapamiento, para que las actualizaciones de un mismo registro queden ordenadas (`concurrency_viewpoint/README.md:65`). Qué evita: una base de datos aparte para el progreso del tracker, y dos instancias que escriben el mismo registro. Qué cuesta: complejidad de flujos y errores difíciles de rastrear (`adrs/adr-5-trackers.md:25-30`). No declara el intervalo de sondeo (sección 7).

2. **Historial de itinerario en colección aparte, con datos duplicados a propósito.** Qué hizo: la reserva guarda su estado, y cada cambio de itinerario va a "Reservation Itinerary", que copia Tracking Info y pone las fechas de inicio y fin en campos propios (`information_viewpoint/README.md:87-92`, `information_viewpoint/README.md:127-156`). Qué evita: que las actualizaciones frecuentes carguen la entidad principal ("To alleviate the potential strain of itinerary updates", `information_viewpoint/README.md:133-134`). Qué cuesta: datos personales copiados en dos lugares (`information_viewpoint/README.md:136`); no describe cómo se borra la copia cuando se elimina una cuenta (`functional_viewpoint/README.md:53`).

3. **Reportes para agencias solo con agregados y sin identificadores de persona o de reserva.** Qué hizo: el reporte mensual para agencias elimina información de usuario y de reserva, y su clave primaria es el alcance estadístico: periodo, agencia, región del usuario y región de la reserva (`functional_viewpoint/README.md:156`, `information_viewpoint/README.md:280-286`). Qué evita: que la venta de datos a proveedores exponga a los viajeros. Qué cuesta: no permite análisis por persona, y el repo deja abiertas la exportación y las estadísticas (`information_viewpoint/README.md:273-278`).

4. **Un viaje "unassigned" por usuario, y control de acceso solo a nivel de viaje.** Qué hizo: al crear el perfil se crea el viaje "unassigned" y se da acceso al usuario; toda reserva nueva o descubierta por correo entra ahí sin pasos extra (`functional_viewpoint/README.md:55-58`, `functional_viewpoint/README.md:73`, `information_viewpoint/README.md:165-178`). Qué evita: pedir al usuario que agrupe antes de ver sus reservas, y reglas de acceso por reserva. Qué cuesta: la reserva conserva un UserID con función de autorización (`information_viewpoint/README.md:119-120`), en contra de la regla de acceso solo por viaje (ver sección 7).

## 7. Huecos, inconsistencias y cosas fuera de alcance

**A. Fuera de alcance o futuro declarado** [DATO]
- Plataformas de redes sociales soportadas: se determinará después (`functional_viewpoint/README.md:127`). Agregadores de redes: se especificarán después (`context_viewpoint/README.md:47`).
- Automatizar la lista de agencias: prevista a futuro (`functional_viewpoint/README.md:142-143`). Hoy la mantiene soporte a mano (`information_viewpoint/README.md:211`).
- Varias direcciones de correo por usuario: prevista a futuro (`functional_viewpoint/README.md:47`).
- Tipos de reserva rastreables: solo hotel, aerolínea y auto, con extensión prevista a futuro (`functional_viewpoint/README.md:104-105`).
- Exportación de reportes de proveedor: no está cubierta (`information_viewpoint/README.md:273-274`). Estadísticas: ilustrativas, y requieren refinamiento (`information_viewpoint/README.md:277-278`).
- Reportes en base analítica o en blob storage, si hay picos: opciones sin decidir (`information_viewpoint/README.md:247-248`, `information_viewpoint/README.md:255-257`, `information_viewpoint/README.md:271-272`).
- Segunda plataforma móvil y Versión 2.0: hitos futuros (`README.md:473-475`).
- Fuera del corpus: la presentación, el video y los perfiles de LinkedIn enlazados en el README (`README.md:3`, `README.md:9-13`) no se consultaron. Las 34 imágenes referenciadas no están en el corpus de texto.

**B. Contradicciones entre documentos** [DATO]
1. **Publicar en redes sociales.** `functional_viewpoint/README.md:126`: la app genera el post y lo dirige a la plataforma que elija el usuario, o sea que el usuario publica. `context_viewpoint/README.md:109` y `operational_viewpoint/README.md:50`: el sistema envía el post a la API social en nombre del usuario, de forma automática. Son dos modelos de publicación distintos.
2. **Contraseñas.** `functional_viewpoint/README.md:45`: "Our system will not store user/password information". `security_perspective/README.md:6`: pide "secure password storage" y MFA. El texto de seguridad es genérico, pero contradice la decisión del viewpoint funcional.
3. **Elasticidad.** `README.md:156-160` y `adrs/adr-1-architecture-style.md:9`: Elasticity queda fuera de las características prioritarias (se eligió Evolvability). `concurrency_viewpoint/README.md:5`: la solución cumple tres metas, y una de ellas es elasticidad. `README.md:128-130` la pide como requisito no funcional.
4. **Reliability.** `adrs/adr-3-data-reader.md:9`, y líneas 9 de ADR-4, 5, 6 y 7: citan "Reliability requirements". `README.md:151-173` no declara Reliability como característica.
5. **Sharing síncrono frente a asíncrono.** `adrs/adr-6-sharing.md:12`: API síncrona. `context_viewpoint/README.md:160`: los cambios de acceso del Sharing entran por el topic "Trip Access Updates". El repo no resuelve la tensión.
6. **Roles de acceso al viaje.** `context_viewpoint/README.md:103`: viewer, co-traveler u owner. `information_viewpoint/README.md:195-198`: una enumeración que va de "full read access" a "trip dates and locations", y el dueño es una referencia aparte (`information_viewpoint/README.md:168-169`). Los conjuntos de roles no coinciden.
7. **Control de acceso.** `functional_viewpoint/README.md:55`: "exclusively at the Trip level". `information_viewpoint/README.md:119-120`: la reserva guarda UserID para autorización.
8. **Reflejo inmediato de cambios manuales.** `requirements/original_requirements.md:126-128` (Q22): cambios "Immediately". `context_viewpoint/README.md:159` y `:126`: los cambios de viaje y de usuario llegan desde Gateway API por topics, y `adrs/adr-4-data-updater.md:12` los hace asíncronos. El repo no dice cómo la app confirma el cambio al usuario.

**C. Cifras que no cierran o no están dimensionadas**
- [DEDUCCIÓN, cálculo mío] `README.md:121` dice que 5 minutos al mes "corresponds to 99.99% SLA". En un mes de 30 días, 99,99 % permite unos 4,3 minutos; 5 minutos equivalen a unos 99,988 %. Son cifras cercanas pero no iguales.
- [DEDUCCIÓN, cálculo mío] `README.md:131`: 150 000 000 reservas cada 300 segundos son 500 000 actualizaciones por segundo. Ningún documento dimensiona los topics, los lectores ni la base para esa carga.
- [DATO] El repo no tiene cifras de costo. Las afirmaciones de ahorro (`adrs/adr-15-message-broker.md:12`, `adrs/adr-8-scaling-groups.md:36`) no tienen números.

**D. Huecos** [HUECO]
- Intervalo de sondeo: "periodically" (`concurrency_viewpoint/README.md:63-64`, `context_viewpoint/README.md:64`). No hay minutos ni cálculo de cómo se cumple el plazo de 5 minutos desde que Road Warrior recibe el dato (`requirements/original_requirements.md:92`).
- Correo reenviado por el usuario, opción de Q10 (`requirements/original_requirements.md:80`): la arquitectura solo describe el sondeo de la bandeja.
- Proveedores de correo: `README.md:140` nombra Gmail, Outlook e iCloud. Ningún viewpoint los nombra.
- Retiro automático al terminar el viaje: `README.md:98` y `requirements/original_requirements.md:16`. El viewpoint funcional solo dice que, al borrar un viaje, la app sugiere desactivar (`functional_viewpoint/README.md:115`). El estado "finished (due to passage of time)" existe (`information_viewpoint/README.md:108`), pero no hay proceso que lo dispare.
- Edición y borrado manual de reservas: `requirements/original_requirements.md:15`. El viewpoint funcional solo describe ingresar reservas (`functional_viewpoint/README.md:82`).
- Multi-idioma: solo hay un campo "Language" (`information_viewpoint/README.md:58`). No hay mecanismo de traducción.
- Operación internacional: el modelo no tiene moneda ni zona horaria. Las fechas son "Timestamp" (`information_viewpoint/README.md:147-148`).
- Desastre: Q21 deja la pérdida aceptable a criterio del equipo (`requirements/original_requirements.md:124`). El repo no declara RPO, RTO ni respaldos. ADR-13 habla de recuperación ante falla de zona (`adrs/adr-13-infrastructure.md:18`).
- Herramientas sin nombrar: IaC (`deployment_viewpoint/README.md:4`), observabilidad (`deployment_viewpoint/README.md:7`), y plataforma DevOps, que es "Something like GitLab or GitHub" (`README.md:396`).
- Seguridad: no hay decisiones sobre sesiones, respuesta a incidentes ni auditoría (`security_perspective/README.md:32-49`). El único control decidido es el RBAC (`security_perspective/README.md:7`).
- Clave de partición: ADR-10 no la nombra. `concurrency_viewpoint/README.md:63` la nombra solo para el topic de reservas. Las tablas de usuario, viaje e itinerario no declaran clave.
- Decisiones sin ADR: automatización de pruebas (`development_viewpoint/README.md:52-53`), ambientes con IaC (`deployment_viewpoint/README.md:4`), y el esquema de tablas (`information_viewpoint/README.md:40-43`). Ninguna tiene ADR propio.
- Worksheet de estilos citado en ADR-1 (`adrs/adr-1-architecture-style.md:9`): no está en el corpus.
- Imagen rota en el mapa: el diagrama de Notifications Data Reader/Updater enlaza el archivo `Level-3-Container-Travel-Agencies-Data-Reader-Updater.jpg` (`context_viewpoint/README.md:153`). Es el mismo nombre que el diagrama de Travel Agencies (`context_viewpoint/README.md:145`). No pude verificar la imagen.
- Clave primaria de Reservation Itinerary sin valor: "Primary Key:" está vacío (`information_viewpoint/README.md:140`).
- Plantilla mal titulada: `adrs/adr-0-template.md:1` dice "ADR 1: Template".

**E. Calidad de los ADR** [DATO]
- Todos los ADR siguen en "Proposed" (sección 3).
- ADR-3 a ADR-7 comparten el mismo párrafo de Contexto (`adrs/adr-3-data-reader.md:9` a `adrs/adr-7-publishers.md:9`). ADR-3 y ADR-6 tienen Consecuencias idénticas. ADR-4, 5 y 7 también tienen Consecuencias idénticas entre sí (`adrs/adr-4-data-updater.md:25-30`, `adrs/adr-5-trackers.md:25-30`, `adrs/adr-7-publishers.md:25-30`).
- Riesgos: "TBD" en ADR-4, 5, 7 y 9. ADR-3, 6, 8 y 10 a 15 no tienen sección de riesgos. ADR-1 y 2 sí.
- Consecuencias genéricas: en ADR-3 a 10, 14 y 15, las Consecuencias hablan de la tecnología en general, sin cifras ni elementos de Road Warrior. Por ejemplo, ADR-14 menciona "real-time analytics and gaming" (`adrs/adr-14-no-sql-database.md:21`).

## 8. Candidatas a verdades enseñables (máx. 8)

1. **Un tracker que consulta APIs externas se desacopla con colas y registra su progreso en un topic compactado.** Ejemplo: el Emails Tracker guarda la última marca de tiempo procesada en el topic compactado (`context_viewpoint/README.md:63-68`), y ADR-5 lo hace asíncrono (`adrs/adr-5-trackers.md:12-13`). Respaldo: **FUERTE** (ADR-5, `context_viewpoint/README.md`, `concurrency_viewpoint/README.md`).

2. **Guardar el historial de cambios en una colección aparte evita que las escrituras frecuentes carguen la entidad principal.** Ejemplo: "Reservation Itinerary" separa las actualizaciones de la reserva (`information_viewpoint/README.md:91-92`, `information_viewpoint/README.md:133-135`). Respaldo: **MEDIA** (un documento claro).

3. **Si importa el orden de las actualizaciones de un registro, conviene que el topic y la tabla usen la misma clave de partición.** Ejemplo: ADR-10 fija la clave común (`adrs/adr-10-partitioning-key.md:12`), y el Itinerary Tracker tiene una instancia por partición (`concurrency_viewpoint/README.md:65`). Respaldo: **MEDIA** (ADR-10 y el concurrency viewpoint, que repite la misma idea).

4. **Autogestionar una pieza de infraestructura cambia costo de licencia por costo de operación.** Ejemplo: Kafka y MongoDB se autogestionan en Kubernetes para "control costs" (`adrs/adr-14-no-sql-database.md:12`), con "cost savings in the initial project phases" (`adrs/adr-15-message-broker.md:12`), pero con "operational overhead" (`adrs/adr-15-message-broker.md:29`) y sin cifras (`deployment_viewpoint/README.md:17-18`). Respaldo: **FUERTE** (ADR-14, ADR-15, `deployment_viewpoint/README.md`).

5. **Elegir una característica de arquitectura como prioritaria significa aceptar que otra quede en segundo plano.** Ejemplo: Evolvability se eligió frente a Elasticity por ser una startup (`README.md:160`), y el concurrency viewpoint sigue prometiendo elasticidad (`concurrency_viewpoint/README.md:5`). Respaldo: **MEDIA** (`README.md`, ADR-1; la contradicción queda en la sección 7).

6. **Un informe para terceros se diseña con agregados, sin identificadores de usuario ni de reserva.** Ejemplo: el reporte mensual de agencias quita información de usuario y de reserva, y su clave es el alcance estadístico (`functional_viewpoint/README.md:156`, `information_viewpoint/README.md:274-276`). Respaldo: **MEDIA** (un documento claro y su modelo de datos).

7. **Usar claves sustitutas (surrogate keys) simplifica el cumplimiento de GDPR.** Ejemplo: la clave de reserva no depende de la clave natural del sistema externo (`information_viewpoint/README.md:46-47`, `information_viewpoint/README.md:87-88`). El repo no muestra el procedimiento de borrado, y la copia de Tracking Info en el itinerario sigue existiendo (`information_viewpoint/README.md:136`). Respaldo: **DÉBIL** (solo lo afirma el viewpoint de información, sin procedimiento).

8. **Para un 99,99 % de disponibilidad conviene empezar con varias zonas de una región, y descartar la multi-región por costo de red.** Ejemplo: ADR-13 decide multi-zona y descarta multi-región (`adrs/adr-13-infrastructure.md:12`), y el viewpoint de despliegue fija el SLA (`deployment_viewpoint/README.md:14-15`). Respaldo: **MEDIA** (ADR-13 y el viewpoint de despliegue, que repite el mismo párrafo).

## 9. Fragmentos citables

1. "The rationale behind this decision is that, as a startup, the ability to adapt to user feedback and market dynamics is paramount." (`README.md:160`)
2. "We recommend against multi-region deployment due to added network costs for inter-region communication." (`adrs/adr-13-infrastructure.md:12`)
3. "Each instance of the Itinerary Tracker is connected to one or more partitions, ensuring that no two instances are connected to the same partition." (`concurrency_viewpoint/README.md:65`)
4. "we ensure that all updates for the same record are sequentially placed in the same partition, preventing collisions during updates." (`adrs/adr-10-partitioning-key.md:12`)
5. "To ensure user privacy and data security, we will carefully remove any user or reservation-specific information and provide only aggregated data in these reports." (`functional_viewpoint/README.md:156`)
6. "Our system will not store user/password information; instead, it will rely entirely on one of the leading providers, Google, Apple, or Microsoft, for user authentication." (`functional_viewpoint/README.md:45`)
7. "Event-driven architectures can introduce complexity, especially in managing event flows and ensuring data consistency." (`adrs/adr-1-architecture-style.md:23`)
8. "To alleviate the potential strain of itinerary updates, the core itinerary data is stored in this separate data collection." (`information_viewpoint/README.md:133-134`)

## 10. Etiquetas presentes (para comparar entre repos)

Estilo: event-driven, microservicios, API-gateway, streaming
Datos: cola-de-mensajes, kafka
Calidad: disponibilidad-HA, escalabilidad, rendimiento-latencia, seguridad, privacidad-GDPR, observabilidad, resiliencia-fallos, costo, testabilidad, evolutividad, deployability
Proceso: ADR, C4, supuestos-explicitos, riesgos-explicitos, fuera-de-alcance-explicito, tradeoffs-explicitos
Cloud/infra: IaC, contenedores, edge
otro: monorepo, autogestionado, marco-viewpoints-Rozanski-Woods, milestones-por-iteracion, redaccion-con-IA
