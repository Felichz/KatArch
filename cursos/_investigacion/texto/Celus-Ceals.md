# Celus-Ceals · Wildlife Watcher (fase 1, texto)

Rutas relativas a `katas-src/Celus-Ceals/`. Archivos de texto leídos: 49 (48 `.md` y `.gitignore`). No se leyeron imágenes ni los dos PDF de `5.Resource/`.

## 1. El caso

[DATO] El cliente es Wildlife.ai, "a charitable trust that uses artificial intelligence to accelerate wildlife conservation" (`1.ProblemBackground/0.BusinessGoalsDrivers.md:5`). [DATO] Hoy la cámara Wildlife Watcher se usa para detectar insectos wētā, y la solución final apunta a un diseño modular para monitorear especies distintas (`0.BusinessGoalsDrivers.md:13`). [DATO] La cámara corre un modelo de aprendizaje automático "on the edge", y para automatizar del todo hace falta un ciclo de recolectar muestras, etiquetarlas, entrenar el modelo y guardarlo como unidad de despliegue (`0.BusinessGoalsDrivers.md:15`). [DATO] Lo que piden los usuarios, según la tabla de requisitos que el equipo transcribe: configurar la cámara desde una app móvil sin abrirla; analizar los videos en plataformas de etiquetado (Wildlife Insights, TrapTagger, Trapper); publicar cuadros en iNaturalist; entrenar modelos de borde con sus propios videos y subirlos a las cámaras (Roboflow, Edge Impulse, TensorFlow Lite); publicar ocurrencias en GBIF; y que la cámara procese en el dispositivo y mande una alerta corta por LoRaWAN, 3G o satélite (`4.Solution/1.FirstIteration/README.md:27-32`). [DATO] Restricciones duras que el texto declara: costos operativos mínimos por ser una organización sin fines de lucro, y la calidad de la evidencia científica primero (`0.BusinessGoalsDrivers.md:7`); internet poco fiable en el campo y cámaras a batería (`3.ARDs/003.CameraUpdateStrategy.md:11`); soporte hecho por voluntarios con distintos niveles de experiencia (`2.SolutionBackground/1.ArchitecturePrinciples.md:13`); el sistema se construye desde cero (`1.ProblemBackground/1.Requirements.md:45`). [HUECO] El texto no da cifras de usuarios, cámaras, volúmenes de datos ni presupuesto; el enunciado original está en un PDF (`5.Resource/wildlifewatcherkata1697552884552.pdf`) que no se leyó en esta fase.

## 2. Qué entregó el equipo

- `README.md`: índice del repositorio, equipo de tres personas, concurso "Architectural Katas: Fall 2023" (`README.md:5`, `README.md:9-19`).
- `1.ProblemBackground/0.BusinessGoalsDrivers.md`: misión, metas y cuatro impulsores de negocio (`:17-22`).
- `1.ProblemBackground/1.Requirements.md`: dos modelos de participación (usuarios, comunidad) y cuatro requisitos de negocio arquitectónicamente significativos (`:21-41`), más un requisito no funcional (`:45`).
- `1.ProblemBackground/2.ConsiderationsAndDataCriticality.md`: cuatro consideraciones y una tabla de criticidad de cinco tipos de dato (`:14-20`).
- `1.ProblemBackground/3.ActorsAndActions.md`: dos actores (usuario, cámara) y sus acciones.
- `1.ProblemBackground/4.RaidLog.md`: registro de riesgos con un solo riesgo (`:7`).
- `1.ProblemBackground/5.AnalysesOf3rdPartyTools.md`: comparación de tres plataformas de etiquetado (`:5-17`), tres herramientas de entrenamiento (`:23-30`) y dos plataformas de publicación (`:45-58`).
- `1.ProblemBackground/6.Glossary.md`: ocho términos.
- `2.SolutionBackground/0.Vision.md`: seis capacidades de la plataforma.
- `2.SolutionBackground/1.ArchitecturePrinciples.md`: nueve principios (características) con razón y resultado (`:7-15`) y una imagen `arch_chars.png` (`:17`).
- `2.SolutionBackground/2.ProposedScenarios.md`: once flujos en Mermaid (ocho de usuario, tres de cámara: Login, Update camera config, Upload data, Label data, Model training, Deploy camera, iNaturalist User Authorisation, Publish to GBIF, Check for updates, Capture animal, Device monitoring).
- `3.ARDs/`: quince ADR numerados 000 a 014 (`3.ARDs/README.md:3-17`); 000 y 001 son sobre el uso de ADR; 13 son decisiones.
- `4.Solution/1.FirstIteration/README.md`: metas de la primera iteración (MVP), tabla requisito→solución (seis filas, `:25-32`), supuestos y lista de tareas.
- `4.Solution/1.FirstIteration/C4Models/`: leyenda, diagrama de contexto, diagrama de contenedores y once diagramas de contenedor individual (`3.IndividualContainerDiagram.md:3-23`); todos los diagramas son imágenes.
- `4.Solution/2.Suggestion-SecondIteration/README.md`: seis propuestas para iteraciones siguientes.

[DATO] Método reconocible: C4, niveles 1 a 3 entregados; el nivel 4 queda como TODO (`4.Solution/1.FirstIteration/C4Models/README.md:7-25`). [DATO] Plantilla de ADR de Jacqui Read, con criterios de evaluación y tabla de puntajes por opción (`3.ARDs/001.ADRTemplate.md:30-39`). [DATO] Registro RAID (`1.ProblemBackground/4.RaidLog.md:1-3`). [DATO] Entrega por iteraciones (`3.ARDs/002.BuildTheSystemUsingIterations.md:21`).

Cuentas: 13 ADR de decisión; 4 requisitos de negocio significativos + 1 no funcional en `1.Requirements.md`; 6 requisitos en la tabla de `FirstIteration/README.md`; 9 principios; 11 diagramas Mermaid en escenarios + 3 en ADR-003; 15 imágenes de diagrama C4 (incluida la leyenda) y 2 imágenes de análisis (`arch_chars.png`, `arch_selection.png`).

## 3. Decisiones

| ADR | Decisión (una frase) | Estado | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|
| 002 | Entregar el sistema en iteraciones; la primera se centra en lo difícil de cambiar (hardware), las siguientes en la experiencia de usuario; revisar la arquitectura de tanto en tanto. | Accepted | no declara | Construir todo automatizado puede tomar meses o años; resolver problemas reales cuanto antes y recibir feedback antes | "Bad user experience in the beginning" | Criterios: resolver el problema, recoger feedback, experiencia de usuario | `3.ARDs/002.BuildTheSystemUsingIterations.md:9-36` |
| 003 | La cámara pide sus actualizaciones a la plataforma de forma periódica (no expone una API siempre encendida); la plataforma es la fuente de verdad y sobrescribe la configuración manual. | Accepted | API de bajo nivel siempre encendida en la cámara (5+3+3) frente a la cámara que pide cambios (4+4+4) | Tratar la cámara como recurso externo reduce la complejidad de seguridad y la hace más tolerante a fallos | La cámara guarda un token; no hay configuración en tiempo real, lo guardado en la plataforma puede no estar aplicado aún | Seguridad, uso eficiente de recursos (batería), tolerancia a fallos | `3.ARDs/003.CameraUpdateStrategy.md:9-106` |
| 004 | Notificar a los usuarios con push notifications. | Accepted | no declara | Simplicidad de integración y capacidad de respuesta; los usuarios ya tienen apps móviles | Integrar con un servicio externo | Simplicidad; notificaciones casi en tiempo real | `3.ARDs/004.TypeOfUserNotification.md:9-29` |
| 005 | Integrar primero con Wildlife Insights como plataforma de etiquetado; las anotaciones se hacen en su aplicación. | Accepted | Remite al análisis de terceros (Wildlife Insights, TrapTagger, Trapper); nota que TrapTagger es equivalente | Es SaaS y no suma complejidad a la plataforma; declara que no hay razón técnica para preferirlo sobre TrapTagger | "GCP integration" | Simplicidad | `3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md:9-36`; `1.ProblemBackground/5.AnalysesOf3rdPartyTools.md:5-19` |
| 006 | Edge Impulse como primera plataforma de entrenamiento de modelos. | Accepted | Remite a "Training tools" (Roboflow, Edge Impulse, TensorFlow Lite) | Flexibilidad, simplicidad, variedad de configuración; consume datasets de Google Cloud Storage, lo que encaja con la dependencia de GCP que trae ADR-005; amplia gama de destinos de despliegue | Precio Enterprise para dispositivos propios es "on-request"; la viabilidad económica debe confirmarse al escalar | Flexibilidad, simplicidad | `3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md:9-37`; `5.AnalysesOf3rdPartyTools.md:23-39` |
| 007 | Arquitectura de microservicios. | Accepted | Event-driven (15) y monolito modular (8); la tabla está en una imagen | Puntaje más alto (20) en los criterios | Implementación más difícil; problemas de comunicación por red; depuración y pruebas más complejas | Escalabilidad, elasticidad, extensibilidad→evolucionabilidad, modularidad→partición por dominio | `3.ARDs/007.ChoosingTheMicroserviceArchitecture.md:9-36` |
| 008 | Autenticación y autorización en un solo servicio. | Accepted | no declara | Separarlas agrega sobrecarga innecesaria | Aumenta el acoplamiento entre autenticación y autorización | Simplicidad | `3.ARDs/008.MergeAuthenticationAndAuthorization.md:9-27` |
| 009 | Un token único por cámara, cargado a mano en la cámara; mensajes con token inválido se ignoran. | Accepted | no declara | Cámaras externas sin conexión estable; seguridad básica | Cámaras con el mismo token generan datos inválidos o incoherentes | Factibilidad | `3.ARDs/009.SimpleSecurityOnCameraAPI.md:9-30` |
| 010 | Cola de mensajes entre la API que recibe datos de cámaras (productor) y el servicio que enriquece y elige usuarios (consumidor). | Accepted | no declara | Elegir el usuario es más lento que recibir datos y puede ser cuello de botella con mucha entrada | Dos servicios en lugar de uno | Escalabilidad/elasticidad, fiabilidad (no perder mensajes), uso de recursos | `3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md:9-32` |
| 011 | Base documental (como MongoDB) en los contenedores de integración para tokens y datos de herramientas externas. | Accepted | no declara | Sin esquema, no depende de migraciones de esquema | no declara | Extensibilidad (agregar integraciones) | `3.ARDs/011.IntegrationContainersDatabase.md:9-23` |
| 012 | La cámara tiene una interfaz de dispositivo para configurarla a mano y para sacar y cargar datos (SD, USB). | Accepted | no declara | Cambiar el hardware desplegado es caro; la cámara debe funcionar sin internet; ya hay pasos manuales (cargar batería) | Pasos manuales del usuario; cualquiera con acceso físico puede cambiar la cámara | Configurabilidad | `3.ARDs/012.ManualProcessOnCameras.md:9-36` |
| 013 | App móvil que usa la API del sistema y recibe push. | Accepted | no declara | Los usuarios deben configurar cámaras y recibir notificaciones | no declara | no declara | `3.ARDs/013.MobileUserInterface.md:9-13` |
| 014 | WebApp para subir datasets y elegir qué datos integrar con herramientas externas. | Accepted | no declara | Los usuarios suben datasets de la cámara; flujo de autenticación para integraciones | no declara | no declara (remite a ADR-005 y ADR-006) | `3.ARDs/014.UserInterface.md:9-20` |

No se incluyen en la tabla `000.UseADR.md` (usar ADR) ni `001.ADRTemplate.md` (elegir plantilla: compara sin plantilla, Nygard y Jacqui Read con puntajes, y elige la de Jacqui Read, `001.ADRTemplate.md:16-39`).

## 4. Hallazgos para el curso

#### H01 · La cámara pide, la plataforma no empuja
- Idea: cuando un dispositivo tiene conexión intermitente y batería limitada, que el dispositivo consulte sus cambios en ciclos (pull) en vez de escuchar órdenes (push) reduce superficie de ataque, consumo y fallos por cortes.
- Lo que hizo el equipo: [DATO] compara dos opciones con tres criterios puntuados: API siempre encendida en la cámara (seguridad 5, recursos 3, tolerancia a fallos 3) y cámara que pide actualizaciones (4, 4, 4) (`3.ARDs/003.CameraUpdateStrategy.md:43-88`). [DEDUCCIÓN, de `:92` y de los puntajes] elige la segunda: la decisión habla de "treating the camera as an external resource", que corresponde a la opción en la que la cámara pide; el texto no nombra la opción elegida con su título. [DATO] La plataforma es la fuente de verdad y sobrescribe la configuración manual (`:94`). [DATO] El flujo "Check for updates" muestra el ciclo: sin actualizaciones o sin internet, termina el ciclo y espera el siguiente (`2.SolutionBackground/2.ProposedScenarios.md:160-176`).
- Razón declarada: menor complejidad de seguridad y más tolerancia a fallos (`:92`); la cámara no necesita escuchar un puerto ni validar entradas (`:46-47`, `:85-87`); si no hay internet, recibe la actualización en el ciclo siguiente (`:88`).
- Costo o trade-off admitido: la cámara guarda un token; no hay configuración en tiempo real y lo guardado en la plataforma puede no estar aplicado todavía (`:105-106`).
- Alternativas que nombra: API de bajo nivel siempre encendida (`:21-50`).
- Estado: Accepted (`:5`).
- Fuente: `3.ARDs/003.CameraUpdateStrategy.md:1-106`; `2.SolutionBackground/2.ProposedScenarios.md:160-176`.
- Completitud: completo (con la salvedad de que la opción elegida se deduce de la frase de decisión y los puntajes).
- Contexto para contarlo: qué es Wildlife Watcher (cámara a batería en el campo que detecta animales con un modelo propio); que el internet en el campo es intermitente; diferencia entre push y pull.
- Depende de imagen: no (los diagramas son Mermaid en el texto).
- Verificado: [ ]

#### H02 · Decidir primero lo que es caro de cambiar
- Idea: en un sistema con hardware desplegado, la primera iteración fija lo que después cuesta más cambiar y deja la comodidad del usuario para después.
- Lo que hizo el equipo: [DATO] entrega por iteraciones; la primera se centra en lo difícil de cambiar (hardware) y las siguientes en la experiencia de usuario (`3.ARDs/002.BuildTheSystemUsingIterations.md:21-23`). [DATO] En el registro de riesgos, el riesgo "Change requirements for camera" se atiende tomando primero las decisiones de la cámara para que la arquitectura quede ligada a ella (`1.ProblemBackground/4.RaidLog.md:7`). [DATO] La arquitectura se revisa durante las iteraciones (`3.ARDs/002.BuildTheSystemUsingIterations.md`; `4.Solution/README.md:3`).
- Razón declarada: construir todo automatizado "can take months or years"; resolver problemas reales cuanto antes y recibir feedback antes (`3.ARDs/002.BuildTheSystemUsingIterations.md`); la plataforma debe seguir funcionando con cámaras viejas y nuevas sin "release" de cámaras nuevas (`4.RaidLog.md:7`).
- Costo o trade-off admitido: "Bad user experience in the beginning" (`3.ARDs/002.BuildTheSystemUsingIterations.md`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `3.ARDs/002.BuildTheSystemUsingIterations.md:1-36`; `1.ProblemBackground/4.RaidLog.md:7`; `4.Solution/README.md:3`.
- Completitud: parcial; falta la alternativa (no declara otra forma de entregar).
- Contexto para contarlo: el caso Wildlife Watcher; que la cámara es hardware ya desplegado en el campo.
- Depende de imagen: no.
- Verificado: [ ]

#### H03 · Aceptar pasos manuales porque el peor escenario manda
- Idea: cuando la conectividad puede faltar del todo, el diseño se hace para el peor caso y se aceptan pasos manuales (tarjeta SD, USB) que ya existían, dejando la automatización como hipótesis para después.
- Lo que hizo el equipo: [DATO] la cámara tiene una interfaz de dispositivo para configurarla y para sacar y cargar datos por SD o USB (`3.ARDs/012.ManualProcessOnCameras.md:21-25`). [DATO] Fotos y videos no se envían por internet: quedan en la SD y requieren un paso manual (`1.ProblemBackground/2.ConsiderationsAndDataCriticality.md:7`). [DATO] El modelo entrenado se descarga a la computadora del usuario, se pone en la SD y la cámara lo lee al siguiente arranque (`2.SolutionBackground/2.ProposedScenarios.md:87`, `:112-129`). [DATO] Para la segunda iteración se propone desplegar modelos y firmware por internet donde la conexión sea estable, tratado como "product hypothesis" hasta verificarlo con usuarios (`4.Solution/2.Suggestion-SecondIteration/README.md:23-25`).
- Razón declarada: cambiar el hardware desplegado es caro; la cámara debe funcionar sin internet; cargar baterías ya es manual (`3.ARDs/012.ManualProcessOnCameras.md`); "This worst case scenario took precedence when making architectural decision" (`2.Suggestion-SecondIteration/README.md:23`).
- Costo o trade-off admitido: pasos manuales del usuario; cualquiera con acceso físico puede cambiar la cámara (`3.ARDs/012.ManualProcessOnCameras.md`).
- Alternativas que nombra: no declara en el ADR; la segunda iteración nombra el despliegue remoto como mejora futura (`2.Suggestion-SecondIteration/README.md:21-25`).
- Estado: Accepted (ADR-012); la propuesta remota es sugerencia.
- Fuente: `3.ARDs/012.ManualProcessOnCameras.md`; `1.ProblemBackground/2.ConsiderationsAndDataCriticality.md:5-10`; `2.SolutionBackground/2.ProposedScenarios.md:35-57`, `:83-129`; `4.Solution/2.Suggestion-SecondIteration/README.md:21-25`; `4.Solution/1.FirstIteration/README.md:41-46`.
- Completitud: parcial; el ADR no declara alternativas.
- Contexto para contarlo: el caso; qué es un modelo en el borde que corre en la cámara.
- Depende de imagen: no.
- Verificado: [ ]

#### H04 · No todos los datos valen lo mismo
- Idea: clasificar cada tipo de dato por criticidad permite decidir qué debe estar siempre disponible y qué puede perderse.
- Lo que hizo el equipo: [DATO] tabla de criticidad: fotos y videos en la cámara y en la plataforma, datos etiquetados y modelos entrenados son Critical — Must be always available; las notificaciones de las cámaras son "Low", porque pueden no llegar por el internet en el campo (`1.ProblemBackground/2.ConsiderationsAndDataCriticality.md:14-20`). [DATO] El principio de integridad de datos se justifica porque los datos se borran de la SD una vez subidos (`2.SolutionBackground/1.ArchitecturePrinciples.md:15`).
- Razón declarada: para notificaciones, la falta de internet en el campo (`:20`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: no declara (es análisis, no ADR).
- Fuente: `1.ProblemBackground/2.ConsiderationsAndDataCriticality.md:12-20`; `2.SolutionBackground/1.ArchitecturePrinciples.md:15`.
- Completitud: ilustrativo.
- Contexto para contarlo: el caso; que las alertas viajan por redes de baja capacidad.
- Depende de imagen: no.
- Verificado: [ ]

#### H05 · Cola entre quien recibe y quien procesa lo lento
- Idea: cuando una etapa es más lenta que la llegada de datos, una cola entre productor y consumidor absorbe los picos y permite escalar solo el consumidor.
- Lo que hizo el equipo: [DATO] cola de mensajes entre la API (productora de la cola, `010:21`) y el servicio que los enriquece y elige qué usuarios reciben la notificación (`3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md:21`). [DEDUCCIÓN: que la API reciba mensajes de cámaras se infiere del nombre del contenedor.]
- Razón declarada: elegir el usuario es más lento que recibir datos y puede ser cuello de botella con mucha entrada (`:11`); criterios: escalabilidad/elasticidad, fiabilidad (los mensajes dentro de la plataforma no se pueden perder), eficiencia de recursos (`:15-17`).
- Costo o trade-off admitido: dos servicios en lugar de uno (`:32`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md:1-32`; `4.Solution/1.FirstIteration/C4Models/IndividualContainers/CameraIntegrationService.md:3`.
- Completitud: parcial; falta la alternativa.
- Contexto para contarlo: el caso; qué es una cola de mensajes, productor y consumidor.
- Depende de imagen: sí, para ver el contenedor (`4.Solution/1.FirstIteration/C4Models/IndividualContainers/images/CameraIntegrationService.png`); la idea se entiende sin ella.
- Verificado: [ ]

#### H06 · Comprar lo que no es el núcleo y decir cuándo no hay razón técnica
- Idea: para etiquetado y entrenamiento el equipo integra servicios SaaS en vez de construirlos, compara opciones en una tabla de capacidades y declara cuándo la elección entre dos equivalentes no tiene razón técnica; una elección arrastra a la siguiente por una dependencia de nube.
- Lo que hizo el equipo: [DATO] compara Wildlife Insights, TrapTagger y Trapper (despliegue, licencia, video, foto, API, entrada de datos) (`1.ProblemBackground/5.AnalysesOf3rdPartyTools.md:5-19`) y Roboflow, Edge Impulse y TensorFlow Lite (`:23-39`). [DATO] Elige Wildlife Insights por ser SaaS y declara: "there is no technical reason for choosing Wildlife Insights over TrapTragger" (`3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md:21-25`). [DATO] Elige Edge Impulse, entre otras razones, porque consume datasets de Google Cloud Storage y ADR-005 ya trae una dependencia de GCP (`3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md:22-24`). [DATO] Para una segunda iteración propone entrenar modelos dentro de la plataforma cuando crezca la adopción (`4.Solution/2.Suggestion-SecondIteration/README.md:17-19`).
- Razón declarada: SaaS no agrega complejidad a la plataforma (`3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md`); flexibilidad, simplicidad, encaje con GCS y variedad de destinos de despliegue (`3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md`).
- Costo o trade-off admitido: integración con GCP (`3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md`); precio Enterprise "on-request", viabilidad económica a confirmar al escalar (`3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md`).
- Alternativas que nombra: TrapTagger, Trapper; Roboflow, TensorFlow Lite.
- Estado: Accepted (ambos ADR).
- Fuente: `3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md`, `3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md`, `1.ProblemBackground/5.AnalysesOf3rdPartyTools.md`.
- Completitud: completo (alternativas en el análisis de terceros, razones y costos en los ADR).
- Contexto para contarlo: el caso; qué es etiquetar imágenes y entrenar un modelo; qué es SaaS; que GCP es la nube de Google.
- Depende de imagen: no.
- Verificado: [ ]

#### H07 · Elegir el estilo con las características que más pesan
- Idea: el estilo de arquitectura se elige puntuando opciones contra las pocas características que más afectan la decisión, y se dice qué cuesta el ganador.
- Lo que hizo el equipo: [DATO] toma escalabilidad, elasticidad, extensibilidad (evolucionabilidad) y modularidad (partición por dominio) como criterios (`3.ARDs/007.ChoosingTheMicroserviceArchitecture.md:13-18`) y elige microservicios con 20 puntos frente a 15 de event-driven y 8 de monolito modular (`:26`, `:32`). [DATO] Los nueve principios con razón y resultado (`2.SolutionBackground/1.ArchitecturePrinciples.md:7-15`) dan el contexto: por ejemplo, escalabilidad/elasticidad por muchos usuarios y cámaras en paralelo, y mantenibilidad porque el soporte lo hacen voluntarios (`:9`, `:13`).
- Razón declarada: puntaje más alto en los criterios (`3.ARDs/007.ChoosingTheMicroserviceArchitecture.md`).
- Costo o trade-off admitido: implementación más difícil, comunicación por red entre servicios, depuración y pruebas más complejas (`3.ARDs/007.ChoosingTheMicroserviceArchitecture.md`).
- Alternativas que nombra: event-driven, monolito modular.
- Estado: Accepted.
- Fuente: `3.ARDs/007.ChoosingTheMicroserviceArchitecture.md`; `2.SolutionBackground/1.ArchitecturePrinciples.md`.
- Completitud: parcial; el desglose de puntajes por característica está solo en una imagen (`3.ARDs/images/arch_selection.png`). [HUECO] El texto no relaciona el costo de los microservicios con la restricción de costos operativos mínimos (`0.BusinessGoalsDrivers.md:7`) ni con el soporte por voluntarios (`1.ArchitecturePrinciples.md:13`).
- Contexto para contarlo: qué son microservicios, event-driven y monolito modular; qué es una característica de arquitectura.
- Depende de imagen: sí (`3.ARDs/images/arch_selection.png`, `2.SolutionBackground/images/arch_chars.png`).
- Verificado: [ ]

#### H08 · Seguridad del tamaño de lo que se puede hacer
- Idea: para dispositivos sin conexión estable, el equipo elige un mecanismo de seguridad simple y factible, y admite el costo que deja abierto.
- Lo que hizo el equipo: [DATO] un token único por cámara, cargado a mano como valor fijo; cada pedido lleva el token y los mensajes con token inválido se ignoran (`3.ARDs/009.SimpleSecurityOnCameraAPI.md:19`). [DATO] La primera configuración de la cámara es manual e incluye ese token (`4.Solution/1.FirstIteration/README.md:43`).
- Razón declarada: las cámaras son recursos externos sin conexión estable y necesitan una seguridad básica (`3.ARDs/009.SimpleSecurityOnCameraAPI.md`); criterio: factibilidad (`:15`).
- Costo o trade-off admitido: cámaras con el mismo token generan datos inválidos o incoherentes (`:30`); en ADR-012, cualquiera con acceso físico puede cambiar la cámara (`3.ARDs/012.ManualProcessOnCameras.md`).
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `3.ARDs/009.SimpleSecurityOnCameraAPI.md`; `4.Solution/1.FirstIteration/README.md:36-46`; `3.ARDs/003.CameraUpdateStrategy.md:105`.
- Completitud: parcial; falta la alternativa.
- Contexto para contarlo: el caso; qué es un token.
- Depende de imagen: no.
- Verificado: [ ]

#### H09 · Juntar autenticación y autorización a sabiendas del acoplamiento
- Idea: unir dos responsabilidades en un servicio por simplicidad, nombrando el acoplamiento que eso crea.
- Lo que hizo el equipo: [DATO] define ambos términos ("Authentication tells who the user is. Authorization tells what the user can do.") y los une en un solo servicio (`3.ARDs/008.MergeAuthenticationAndAuthorization.md:9`, `:17`).
- Razón declarada: separarlo agrega sobrecarga innecesaria (`:17`).
- Costo o trade-off admitido: mayor acoplamiento entre autenticación y autorización (`:27`).
- Alternativas que nombra: no declara (la alternativa implícita, separarlos, aparece solo en la razón).
- Estado: Accepted.
- Fuente: `3.ARDs/008.MergeAuthenticationAndAuthorization.md`; `4.Solution/1.FirstIteration/C4Models/IndividualContainers/AuthService.md:3`.
- Completitud: parcial; alternativa no desarrollada.
- Contexto para contarlo: diferencia entre autenticación y autorización (el ADR la da en una frase).
- Depende de imagen: no.
- Verificado: [ ]

#### H10 · El ADR que registra cómo se decide
- Idea: un formato de ADR con criterios de evaluación y una tabla de puntajes por opción deja escrito cómo se comparó, no solo qué se eligió.
- Lo que hizo el equipo: [DATO] compara tres formas de escribir ADR (sin plantilla, Nygard, Jacqui Read) con criterios de simplicidad y completitud puntuados, y elige la de Jacqui Read porque incluye la toma de decisión (`3.ARDs/001.ADRTemplate.md:11-39`). [DATO] ADR-003 es el ejemplo aplicado: tres criterios, dos opciones con puntaje y razón por criterio, y consecuencias positivas y negativas (`3.ARDs/003.CameraUpdateStrategy.md:13-106`).
- Razón declarada: la plantilla elegida es más completa (`3.ARDs/001.ADRTemplate.md`).
- Costo o trade-off admitido: aprender la plantilla (`3.ARDs/001.ADRTemplate.md`).
- Alternativas que nombra: sin plantilla, plantilla de Michael Nygard.
- Estado: Accepted.
- Fuente: `3.ARDs/001.ADRTemplate.md`; `3.ARDs/003.CameraUpdateStrategy.md`.
- Completitud: completo (ADR-001); varios ADR del mismo repositorio no completan todos los campos (por ejemplo, `013.MobileUserInterface.md` no tiene criterios ni consecuencias).
- Contexto para contarlo: qué es un ADR; quién es Jacqui Read (el repositorio solo la nombra como autora de la plantilla, `001.ADRTemplate.md:30`).
- Depende de imagen: no.
- Verificado: [ ]

#### H11 · Base sin esquema para integraciones que van a crecer
- Idea: el almacenamiento de cada contenedor de integración se elige por lo fácil que sea sumar integraciones nuevas.
- Lo que hizo el equipo: [DATO] base documental, como MongoDB, para guardar tokens de API y otros datos de herramientas externas (`3.ARDs/011.IntegrationContainersDatabase.md:9`, `:17`).
- Razón declarada: al no tener esquema no depende de migraciones (`:23`); criterio: extensibilidad (`:13`).
- Costo o trade-off admitido: no declara.
- Alternativas que nombra: no declara.
- Estado: Accepted.
- Fuente: `3.ARDs/011.IntegrationContainersDatabase.md`.
- Completitud: parcial; faltan costo y alternativas.
- Contexto para contarlo: qué es una base documental y una migración de esquema.
- Depende de imagen: no.
- Verificado: [ ]

## 5. Lo que no tiene valor para el curso

- `README.md` (lista del equipo, enlaces, "Logo generated by Bing Image Creator"): datos de presentación, no de arquitectura.
- `.gitignore`: configuración del repositorio.
- `3.ARDs/000.UseADR.md`: decisión de usar ADR, sin contenido de arquitectura del caso.
- `3.ARDs/README.md`, `1.ProblemBackground/README.md`, `2.SolutionBackground/README.md`, `4.Solution/1.FirstIteration/C4Models/3.IndividualContainerDiagram.md`: índices.
- `4.Solution/1.FirstIteration/C4Models/0.Legend.md` y las once fichas de `IndividualContainers/`: solo título, referencia a un ADR y una imagen; el contenido está en las imágenes.
- `1.ProblemBackground/6.Glossary.md`: definiciones genéricas (usuario, cámara, dataset).
- `2.SolutionBackground/2.ProposedScenarios.md`, flujos "Login" y "Update camera config" (`:5-33`): navegación de pantallas sin decisión.
- `4.Solution/2.Suggestion-SecondIteration/README.md:9-11` (Hardware development): recomienda la plataforma CELUS, sin decisión de arquitectura del sistema.
- `3.ARDs/013.MobileUserInterface.md` y `014.UserInterface.md`: deciden la existencia de una app y una web sin criterios ni costos.

## 6. Imágenes para fase 2

- `3.ARDs/images/arch_selection.png`: tabla de puntajes de microservicios, event-driven y monolito modular por característica (totales 20, 15 y 8). Citada por `3.ARDs/007.ChoosingTheMicroserviceArchitecture.md:22`.
- `2.SolutionBackground/images/arch_chars.png`: características de arquitectura elegidas (posible hoja de características). Citada por `2.SolutionBackground/1.ArchitecturePrinciples.md:17`.
- `4.Solution/1.FirstIteration/C4Models/images/ContainerDiagram.png`: contenedores de la primera iteración y sus relaciones. Citada por `C4Models/2.ContainerDiagram.md:5`.
- `4.Solution/1.FirstIteration/C4Models/images/SystemContextDiagram.png`: sistema, actores y sistemas externos. Citada por `C4Models/1.SystemContextDiagram.md:5`.
- `4.Solution/1.FirstIteration/C4Models/IndividualContainers/images/CameraIntegrationService.png`: la cola de ADR-010 dentro del contenedor. Citada por `IndividualContainers/CameraIntegrationService.md:5`.
- `4.Solution/1.FirstIteration/C4Models/IndividualContainers/images/CameraManager.png`: cómo se guarda la configuración que la cámara consulta (ADR-003). Citada por `IndividualContainers/CameraManager.md:3`.
- `4.Solution/1.FirstIteration/C4Models/IndividualContainers/images/CameraMetadataManager.png`: dónde se guardan las observaciones (posible base de series temporales mencionada en la segunda iteración). Citada por `IndividualContainers/CameraMetadataManager.md:3`.

## 7. Preguntas abiertas

- ¿Cuáles son los puntajes por característica de cada estilo en ADR-007? Solo están en `arch_selection.png`.
- ¿Qué base de datos optimizada para series temporales menciona la segunda iteración (`4.Solution/2.Suggestion-SecondIteration/README.md:29`)? Ningún ADR la decide; puede estar en un diagrama de contenedor.
- ¿Por qué el actor Cámara figura como "Be configurable remotely" (`1.ProblemBackground/3.ActorsAndActions.md:33`) si ADR-012 hace manual la configuración en la primera iteración? El texto no lo concilia; ADR-003 sí define la consulta remota periódica.
- ¿Cómo encaja la criticidad "Low" de las notificaciones (`2.ConsiderationsAndDataCriticality.md:20`) con el principio de capacidad de respuesta casi en tiempo real (`1.ArchitecturePrinciples.md:14`) y la exigencia de no perder mensajes de ADR-010 (`3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md`)? [DEDUCCIÓN] Posible lectura: "Low" se refiere al tramo cámara→plataforma y la fiabilidad de ADR-010 al tramo interno; el texto no lo dice.
- ¿Qué cifras de escala, presupuesto o plazos trae el enunciado? Está en `5.Resource/wildlifewatcherkata1697552884552.pdf`, no leído en esta fase.
- ¿El título de la opción "Threat the camera request changes" (`3.ARDs/003.CameraUpdateStrategy.md`) es la opción elegida? Se deduce de la frase de decisión y los puntajes; el texto no la nombra al decidir.
