# Ficha · CELUS Ceals · Wildlife Watcher (Otoño 2023)

Fuente: corpus de texto en `katas-src/Celus-Ceals/` (48 archivos de texto, leídos completos). Historia de git en el clon hermano (`Celus-Ceals`, 8 commits, 2023-10-19 a 2023-11-26), usada como fuente secundaria. Las rutas de las fuentes son relativas a la raíz del repo, sin `-src`. Las imágenes no están en el corpus de texto y no se leyeron (ver sección 7.3).

---

## 1. El caso

[DATO] Wildlife.ai es una organización benéfica que usa inteligencia artificial para acelerar la conservación de fauna silvestre, y su misión declarada es "Using artificial intelligence to accelerate wildlife conservation" (1.ProblemBackground/0.BusinessGoalsDrivers.md). El problema que el equipo recibe: los practicantes necesitan información precisa y casi en tiempo real, y las dos tareas urgentes son la identificación de especies y el conteo de animales únicos (1.ProblemBackground/0.BusinessGoalsDrivers.md). El dispositivo existente es la cámara Wildlife Watcher, hoy desplegada para detectar insectos Wētā, y debe pasar a un diseño modular para monitorear otras especies (1.ProblemBackground/0.BusinessGoalsDrivers.md). La cámara debe correr un modelo de ML en el borde, y para eso hace falta un ciclo iterativo: recolectar muestras, etiquetarlas, entrenar, guardar el modelo como unidad de despliegue y enviarlo a las cámaras que la comunidad elija (1.ProblemBackground/0.BusinessGoalsDrivers.md). Restricciones duras declaradas: las cámaras no transmiten fotos ni video por internet, los datos quedan en una SD y se extraen con un paso manual; subir un modelo por internet puede no ser posible; la cámara tiene internet solo cuando hay (1.ProblemBackground/2.ConsiderationsAndDataCriticality.md). Cambiar el hardware de una cámara desplegada es caro (3.ARDs/012.ManualProcessOnCameras.md). El sistema debe construirse desde cero, sin integrarse a una solución existente (1.ProblemBackground/1.Requirements.md). Como restricción de negocio, el costo operativo debe reducirse al mínimo, y la calidad de la evidencia científica tiene la máxima prioridad (1.ProblemBackground/0.BusinessGoalsDrivers.md).

[HUECO] No declara plazos, volumen de datos (el requisito dice "a large amount of data" sin cifra), número de cámaras, latencia objetivo en milisegundos, presupuesto ni marco regulatorio (1.ProblemBackground/1.Requirements.md).

---

## 2. Qué entregó el equipo

[DATO] Estructura del repo (README.md, índice de la raíz):

- `1.ProblemBackground/` (8 archivos): metas y drivers (0), requisitos (1), consideraciones y criticidad de datos (2), actores y acciones (3), RAID con 1 solo riesgo (4), análisis de 8 herramientas de terceros: 3 de etiquetado, 3 de entrenamiento y 2 de publicación (5), glosario de 9 términos (6). Fuente: archivos listados en el propio README.md.
- `2.SolutionBackground/` (4 archivos): visión en 6 viñetas (0.Vision.md), tabla de 9 características de arquitectura con razón y resultado (1.ArchitecturePrinciples.md), y 11 diagramas de flujo de escenarios (2.ProposedScenarios.md).
- `3.ARDs/` (16 archivos): 15 ADR numerados 000 a 014 más un índice (3.ARDs/README.md). 000 es el ADR que adopta ADR; 001 es la plantilla; 002 a 014 son 13 decisiones de arquitectura. Todos tienen Status "Accepted".
- `4.Solution/1.FirstIteration/`: objetivo de la iteración, tabla de 6 requisitos con su solución, supuestos y lista de tareas (README.md).
- `4.Solution/1.FirstIteration/C4Models/`: leyenda (0.Legend.md), diagramas de nivel 1 (contexto) y 2 (contenedores) como imagen, nivel 3 con 11 contenedores individuales, y nivel 4 marcado como TODO (C4Models/README.md).
- `4.Solution/2.Suggestion-SecondIteration/`: 6 propuestas que el repo marca como futuras (README.md).
- `README.md` (raíz): índice, integrantes y enlaces a `5.Resource/` (dos PDF, no incluidos en el corpus de texto).

[DATO] Tipos de diagramas: C4 niveles 1 a 3 (todos imagen, no leídos); 11 flujos Mermaid de escenarios (8 de usuario y 3 de cámara, 2.ProposedScenarios.md); 3 diagramas Mermaid `sequenceDiagram` en 3.ARDs/003.CameraUpdateStrategy.md; 17 imágenes referenciadas en total.

[DATO] Cantidad de ADR: 15 archivos (000 a 014), 13 decisiones de arquitectura (002 a 014).

[DATO] Ausentes en el repo: fitness functions, event storming, OKR, historias de usuario y topología de equipos.

---

## 3. Decisiones

Notas de lectura: "no declara" significa que el documento no lo dice. Solo 6 de los 15 ADR tienen sección Options (000, 001, 003, 005, 006, 007). Los ADR 002, 004, 008 a 014 no tienen opciones. Los ADR 013 y 014 no tienen sección de consecuencias. Los puntajes de 003 están en el texto; los de 007 solo en una imagen, con totales 20/15/8 declarados en el texto.

| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas |
| --- | --- | --- | --- | --- | --- |
| ADR-000 · 3.ARDs/000.UseADR.md | Usar ADR para registrar las decisiones del proyecto. | No usar ADR (Options). | Permite revisar decisiones en el futuro y documentarlas. | No declara (solo consecuencias positivas). | ADR |
| ADR-001 · 3.ARDs/001.ADRTemplate.md | Adoptar la plantilla de Jacqui Read, que incluye decision making. | No seguir plantilla (simplicidad 5/5, completitud 1/5); plantilla de Michael Nygard (simplicidad 4/5, completitud 3/5, sin decision making). | Completitud: todos los campos, y decision making cuando hace falta. | Hay que aprender la plantilla. | ADR |
| ADR-002 · 3.ARDs/002.BuildTheSystemUsingIterations.md | Entregar el sistema en partes; la primera se enfoca en lo difícil de cambiar, como el hardware de la cámara. | No declara (sin sección Options). | Resolver problemas reales pronto, recoger retroalimentación y cuidar la experiencia de usuario (criterios). | Mala experiencia de usuario al principio. | otro: entregas-iterativas |
| ADR-003 · 3.ARDs/003.CameraUpdateStrategy.md | La cámara consulta a la plataforma por actualizaciones; la plataforma es la fuente de verdad y sobreescribe cualquier configuración manual de la cámara. | (a) API de bajo nivel siempre escuchando: seguridad 5/5, uso de recursos 3/5, tolerancia a fallos 3/5. (b) La cámara consulta cambios: 4/5, 4/5, 4/5. [DEDUCCIÓN: la decisión describe la opción (b) y el ADR no la nombra.] | Tratar la cámara como recurso externo reduce la complejidad de seguridad y la hace más tolerante a fallos. | La cámara debe guardar un token; no hay configuración en tiempo real. | seguridad, resiliencia-fallos, fuente-unica-de-verdad, tradeoffs-explicitos |
| ADR-004 · 3.ARDs/004.TypeOfUserNotification.md | Notificaciones push para los usuarios. | No declara. | Simplicidad de integración y su capacidad de respuesta (el texto menciona responsiveness, que no figura como criterio). | Hay que integrarse con un servicio externo. | rendimiento-latencia |
| ADR-005 · 3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md | Integrar Wildlife Insights como primera plataforma de etiquetado; las anotaciones se hacen en su aplicación. | TrapTagger y Trapper, según "See Analyses of 3rd party tools" (5.AnalysesOf3rdPartyTools.md). | Es SaaS y no aumenta la complejidad de la plataforma; es más fácil de implementar. | Integración con GCP. Admite que no hay razón técnica para elegir Wildlife Insights sobre TrapTagger. | cloud-gestionada, human-in-the-loop, integracion-con-terceros, tradeoffs-explicitos |
| ADR-006 · 3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md | Edge Impulse como primera plataforma de entrenamiento. | Roboflow y TensorFlow Lite, según "See Training tools" (5.AnalysesOf3rdPartyTools.md). | Flexibilidad y simplicidad; consume datasets de Google Cloud Storage por la dependencia de ADR-005; amplia gama de destinos de despliegue. | Precio enterprise para despliegue en dispositivo personalizado, "on-request"; la viabilidad económica hay que confirmarla al escalar. | cloud-gestionada, ml-clasico, edge, mlops, tradeoffs-explicitos |
| ADR-007 · 3.ARDs/007.ChoosingTheMicroserviceArchitecture.md | Arquitectura de microservicios. | Event-driven (15 puntos) y monolito modular (8 puntos); microservicios suma 20 (Implications). El desglose por criterio está en una imagen (3.ARDs/images/arch_selection.png), no leída. | Mayor puntaje en escalabilidad, elasticidad, extensibilidad (evolvability) y modularidad (partición por dominio). | Implementación más difícil; comunicación de red entre servicios; depuración y pruebas más complejas. | microservicios, escalabilidad, evolutividad, tradeoffs-explicitos |
| ADR-008 · 3.ARDs/008.MergeAuthenticationAndAuthorization.md | Un solo servicio para autenticación y autorización. | No declara. | Separarlos agrega sobrecarga innecesaria. Criterio: simplicidad. | Mayor acoplamiento entre autenticación y autorización. | seguridad |
| ADR-009 · 3.ARDs/009.SimpleSecurityOnCameraAPI.md | Un token único por cámara, fijado como valor en cada cámara; las solicitudes con token inválido se ignoran. | No declara. | Las cámaras son recursos externos sin conexión estable y necesitan una validación básica (contexto). Criterio: factibilidad. | Cámaras con el mismo token generan datos inválidos o incoherentes. | seguridad |
| ADR-010 · 3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md | Una cola de mensajes entre la API (productor) y el servicio que enriquece y selecciona usuarios (consumidor). | No declara. No nombra el broker. | Seleccionar usuarios es más lento que recibir datos y puede ser cuello de botella (contexto). Criterios: escalabilidad/elasticidad, confiabilidad, uso de recursos. | Dos servicios en lugar de uno. | cola-de-mensajes, escalabilidad, tradeoffs-explicitos |
| ADR-011 · 3.ARDs/011.IntegrationContainersDatabase.md | Base de datos documental (ejemplo: MongoDB) en el contenedor de integración para guardar token y datos de herramientas externas. | No declara. | Sin esquema, no necesita migraciones (Implications). Criterio: extensibilidad. | No declara. | evolutividad, db-por-servicio (parcial: el ADR solo habla de contenedores de integración) |
| ADR-012 · 3.ARDs/012.ManualProcessOnCameras.md | La cámara tiene una interfaz física para configurarla; los datos salen de la SD y se cargan en otro equipo o desde un USB. | No declara. | Cambiar hardware desplegado es caro; las cámaras deben funcionar sin internet; criterio: configurabilidad por servicio. | Pasos manuales del usuario; cualquiera con acceso físico puede cambiar una cámara. | resiliencia-fallos, otro: operacion-manual-en-campo, tradeoffs-explicitos |
| ADR-013 · 3.ARDs/013.MobileUserInterface.md | App móvil que usa la API del sistema y recibe notificaciones push. | No declara. | Los usuarios deben configurar cámaras y recibir notificaciones (contexto). | No declara (sin sección de consecuencias). | otro: interfaces-de-usuario |
| ADR-014 · 3.ARDs/014.UserInterface.md | App web que usa las APIs para subir datasets y elegir integraciones con herramientas externas. | No declara. | Los usuarios necesitan subir datasets desde la cámara (contexto). | No declara (sin sección de consecuencias). | otro: interfaces-de-usuario |

---

## 4. Patrones y prácticas presentes

- **ADR**: registro de decisiones con plantilla de Jacqui Read. 15 archivos. La plantilla define el campo "Consultation", y ningún ADR lo llena (3.ARDs/001.ADRTemplate.md, 3.ARDs/000.UseADR.md).
- **C4**: diagramas de niveles 1 a 3 en imagen, con nivel 4 pendiente; los 11 contenedores individuales tienen su propio archivo con imagen (4.Solution/1.FirstIteration/C4Models/README.md, C4Models/3.IndividualContainerDiagram.md).
- **microservicios**: 11 servicios en la primera iteración: AuthService, LabellingPlatformIntegration, DatasetManager, MLTrainingManager, iNaturalistIntegration, GBIFIntegration, CameraMetadataManager, CameraManager, UserPreferences, CameraIntegrationService, NotificationService (4.Solution/1.FirstIteration/C4Models/3.IndividualContainerDiagram.md; 3.ARDs/007.ChoosingTheMicroserviceArchitecture.md).
- **cola-de-mensajes**: productor (API) y consumidor (enriquecimiento y selección de usuarios) en el contenedor de integración de cámaras (3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md).
- **fuente-unica-de-verdad**: la plataforma es la fuente de verdad y sobreescribe la configuración manual de la cámara (3.ARDs/003.CameraUpdateStrategy.md).
- **resiliencia-fallos**: la cámara consulta actualizaciones cada ciclo y, si no hay internet, termina el ciclo y reintenta en el siguiente. El flujo "Check for updates" lo muestra (2.ProposedScenarios.md; 3.ARDs/003.CameraUpdateStrategy.md).
- **seguridad**: token por cámara, fijado como valor en el dispositivo (3.ARDs/009.SimpleSecurityOnCameraAPI.md); servicio único de autenticación y autorización (3.ARDs/008.MergeAuthenticationAndAuthorization.md); autorización de iNaturalist con flujo de código y token de acceso (2.ProposedScenarios.md, "iNaturalist User Authorisation").
- **db-por-servicio** (parcial): base documental en cada contenedor de integración (3.ARDs/011.IntegrationContainersDatabase.md). [DEDUCCIÓN: el ADR no habla de los demás contenedores.]
- **cloud-gestionada**: los dos primeros servicios de etiquetado y entrenamiento son SaaS de terceros (3.ARDs/005, 3.ARDs/006; 5.AnalysesOf3rdPartyTools.md).
- **integracion-con-terceros**: iNaturalist por API con autorización, GBIF por API con basic auth (`user:password`) (5.AnalysesOf3rdPartyTools.md; 2.ProposedScenarios.md, "Publish to GBIF").
- **human-in-the-loop**: el etiquetado lo hace el usuario en la aplicación de Wildlife Insights (3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md). La votación de expertos en iNaturalist es una propuesta futura (4.Solution/2.Suggestion-SecondIteration/README.md).
- **mlops** [DEDUCCIÓN]: el repo describe el ciclo iterativo de construir y evaluar modelos, y guardar cada modelo como unidad de despliegue (1.ProblemBackground/0.BusinessGoalsDrivers.md; 2.ProposedScenarios.md, "Model training"). No usa la palabra MLOps.
- **evaluacion-de-modelos**: el flujo de entrenamiento evalúa el modelo nuevo en un conjunto de prueba antes de exportar (2.ProposedScenarios.md, "Model training").
- **ml-clasico**: detección de objetos en imágenes, no generativa (3.ARDs/006; 5.AnalysesOf3rdPartyTools.md, "Dataset labeling": Edge Impulse "for object detection in images only").
- **edge**: el modelo corre en la cámara; la cámara lee el modelo desde la SD al arrancar (1.ProblemBackground/0.BusinessGoalsDrivers.md; 2.ProposedScenarios.md, "Model training").
- **rendimiento-latencia**: notificaciones push, con el criterio de "near real-time" (3.ARDs/004.TypeOfUserNotification.md; 1.ProblemBackground/1.Requirements.md).
- **disponibilidad-HA**: principio "System always up and running" y criticidad "must be always available" para fotos, video, etiquetas y modelos. No declara ningún mecanismo (2.SolutionBackground/1.ArchitecturePrinciples.md; 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md).
- **escalabilidad**: principio con elasticidad; criterio en ADR-007 y ADR-010 (2.SolutionBackground/1.ArchitecturePrinciples.md).
- **evolutividad**: principios de extensibilidad y modularidad; criterio en ADR-007 y ADR-011 (2.SolutionBackground/1.ArchitecturePrinciples.md).
- **costo**: la reducción de costo operativo es un driver de negocio (1.ProblemBackground/0.BusinessGoalsDrivers.md). No hay cifras.
- **observabilidad** (solo salud del dispositivo): el flujo "Device monitoring" envía el estado de la cámara a la plataforma si el chequeo está activo (2.ProposedScenarios.md).
- **retencion-de-datos**: principio "Data will be erased from SD once is uploaded" (2.SolutionBackground/1.ArchitecturePrinciples.md).
- **supuestos-explicitos**: cuatro consideraciones (1.ProblemBackground/2.ConsiderationsAndDataCriticality.md) y la lista de supuestos de la primera iteración (4.Solution/1.FirstIteration/README.md).
- **riesgos-explicitos**: un solo riesgo en el RAID: cambios de requisitos de la cámara (1.ProblemBackground/4.RaidLog.md).
- **tradeoffs-explicitos**: cada ADR con criterios y consecuencias negativas, y la tabla comparativa de herramientas de terceros (5.AnalysesOf3rdPartyTools.md).
- **fuera-de-alcance-explicito**: la segunda iteración se declara como "product hypothesis" y como propuesta (4.Solution/2.Suggestion-SecondIteration/README.md).
- **glosario**: 9 términos (1.ProblemBackground/6.Glossary.md).
- **otro: entregas-iterativas**: entrega en iteraciones con revisión de la arquitectura entre iteraciones (3.ARDs/002.BuildTheSystemUsingIterations.md).
- **otro: flujos-de-usuario**: escenarios como diagramas de flujo Mermaid, 11 en total (2.SolutionBackground/2.ProposedScenarios.md).
- **otro: principios-de-arquitectura**: tabla de características con razón y resultado (2.SolutionBackground/1.ArchitecturePrinciples.md).
- **otro: requisito-a-solucion**: tabla de 6 requisitos con su solución, sin identificadores (4.Solution/1.FirstIteration/README.md).
- **otro: revision-por-pull-request** [DATO, de git]: siete commits de documentos llevan número de PR (#5 a #10 y #13) (`git log` de Celus-Ceals).
- **otro: mantenibilidad-voluntarios**: el principio menciona que el soporte lo hacen voluntarios con distintos niveles de experiencia (2.SolutionBackground/1.ArchitecturePrinciples.md). No hay práctica asociada.

---

## 5. Cómo llegan de los requisitos a la arquitectura

[DATO] Hay un tramo explícito: requisito a solución. La tabla de 4.Solution/1.FirstIteration/README.md asocia 6 requisitos con una solución (Mobile App; "Trigger integration using WebApp" en 4 filas; Push notifications). El mismo documento lista qué ADR se relacionan con la iteración (ADR-003 a 007, 012 a 014) y en supuestos los ADR-009 y 012.

[DATO] Requisito a característica de calidad: no hay enlace. 1.Requirements.md tiene 4 requisitos numerados (actualización de configuración por app; integración externa con tokens; almacenamiento de gran cantidad de datos; reportes casi en tiempo real) y 1 no funcional (construir desde cero). Ningún ADR cita un número ni un título de requisito (búsqueda sobre 3.ARDs/).

[HUECO] Característica a decisión: los criterios de cada ADR usan nombres de característica, pero no enlazan con el documento de principios:
- ADR-007: escalabilidad, elasticidad, extensibilidad (evolvability), modularidad (cuatro criterios que "affect our final decision the most").
- ADR-003: seguridad, uso eficiente de recursos, tolerancia a fallos.
- ADR-010: escalabilidad/elasticidad, confiabilidad, uso de recursos.
- ADR-004, 005, 008: simplicidad. ADR-006: simplicidad y flexibilidad. ADR-009: factibilidad. ADR-011: extensibilidad. ADR-012: configurabilidad.

[DEDUCCIÓN] Del documento de principios (9 características), ningún criterio de ADR usa mantenibilidad ni integridad de datos. Disponibilidad y rendimiento aparecen solo como texto, no como criterio evaluado. Responsiveness aparece solo en el texto de ADR-004.

Cuántas características priorizan y cómo las ordenan: 9 características en el documento de principios, sin orden ni peso (2.SolutionBackground/1.ArchitecturePrinciples.md). En ADR-007, 4 criterios sin peso. El repo no declara método de ponderación ni escala. El total de ADR-007 (20/15/8) no tiene escala declarada, y el desglose está en una imagen. En la versión entregada (git 206f697), ADR-007 listaba 5 características, incluidas responsividad e integridad de datos; la versión final quitó esas dos y agregó modularidad (ver sección 7).

---

## 6. Lo distintivo

1. **La cámara es un recurso externo que consulta, y la plataforma manda** (3.ARDs/003.CameraUpdateStrategy.md). Qué hizo: descartó la API que escucha siempre en la cámara; la cámara pide configuración en cada ciclo; la plataforma sobreescribe cualquier cambio manual. Qué evitó: validar solicitudes entrantes en la cámara y depender de conexión para aplicar cambios. Qué cuesta: la cámara guarda un token, y no hay configuración en tiempo real (mismo ADR, Implications). Fuente de la comparación: puntajes de las dos opciones en el mismo ADR.

2. **El canal manual de datos es parte del diseño, no un parche** (3.ARDs/012.ManualProcessOnCameras.md; 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md; 2.ProposedScenarios.md, "Upload data"). Qué hizo: parte de la premisa de que las fotos y los videos no viajan por internet ("Cameras don't need to stream or send photos/videos over the internet"); los datos salen por SD o USB y el usuario los sube. Qué evitó: depender de conexión en campo para los datos más pesados. Qué cuesta: pasos manuales en cada ciclo y acceso físico sin control (ADR-012, Negative).

3. **Una decisión que cambiaría el resto se toma antes, y el orden de iteraciones sigue esa regla** (3.ARDs/002.BuildTheSystemUsingIterations.md; 1.ProblemBackground/4.RaidLog.md). Qué hizo: declaró que la primera iteración se enfoca en lo difícil de cambiar, y el RAID dice que las decisiones de cámara se toman primero "so the architecture is linked to it". Qué cuesta: "Bad user experience in the beginning" (ADR-002, Negative). Ver sección 7: la primera iteración no contiene trabajo de hardware.

4. **Una elección de herramienta se declara como no técnica cuando lo es** (3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md). Qué hizo: eligió Wildlife Insights por ser SaaS y dejó escrito que, frente a TrapTagger, no hay razón técnica. Qué evitó: complejidad propia para la plataforma. Qué cuesta: dependencia de GCP. ADR-006 la aprovecha: como esa dependencia ya existe, Edge Impulse consume datasets desde Google Cloud Storage.

5. **Una cola en un solo punto, con la razón escrita** (3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md). Qué hizo: puso una cola solo entre la API y el servicio que enriquece y selecciona usuarios, porque esa etapa es más lenta que la recepción. Qué cuesta: dos servicios en lugar de uno. No declara si se evaluaron colas en otros puntos.

---

## 7. Huecos, inconsistencias y cosas fuera de alcance

### 7.1 Fuera de alcance o futuro declarado (4.Solution/2.Suggestion-SecondIteration/README.md)

[DATO] Propuestas que el repo no compromete: desarrollo de hardware con la plataforma CELUS ("as soon as it launches in Q1 2024", que es un dato de un tercero); votación de expertos en iNaturalist para etiquetas con ruido; entrenamiento de modelos dentro de la plataforma; despliegue remoto de modelos y firmware por internet ("should be treated as a product hypothesis"); analítica de fauna sobre una base optimizada para series de tiempo.

### 7.2 Contradicciones y huecos entre documentos

1. **[CONTRADICCIÓN] Video contra herramienta de etiquetado.** 4.Solution/1.FirstIteration/README.md pide analizar videos en plataformas de etiquetado y entrenar con "their own labelled videos". 2.ProposedScenarios.md dice que la cámara guarda "video clips of 5-10sec". 1.Requirements.md incluye video. 5.AnalysesOf3rdPartyTools.md marca "Handle video" con ❌ para Wildlife Insights y TrapTagger, y ✅ solo para Trapper. Edge Impulse etiqueta solo imágenes ("Built-in for object detection in images only"). 3.ARDs/005 elige Wildlife Insights. El repo no resuelve esto.
2. **[CONTRADICCIÓN] Aplicación de escritorio contra WebApp.** 2.ProposedScenarios.md, "Upload data": "via a desktop application or manually". 3.ARDs/014.UserInterface.md: "A WebApp". No hay ADR de aplicación de escritorio.
3. **[CONTRADICCIÓN] Configuración por plataforma contra configuración manual.** 3.ARDs/003: la plataforma "must override any camera manual configuration". 3.ARDs/012: los usuarios cambian la configuración por la interfaz del dispositivo. 4.Solution/1.FirstIteration/README.md: "Cameras can be configured manually via a device interface". No declara cuál gana si ambas cambian.
4. **[HUECO] Qué viaja por internet en la primera iteración.** 4.Solution/2.Suggestion-SecondIteration/README.md dice que el envío de modelos y firmware por internet es una hipótesis futura. 3.ARDs/003 ya define que la cámara consulta actualizaciones por internet, y 2.ProposedScenarios.md, "Check for updates", tiene "apply changes". No declara si el ciclo de actualización lleva modelos o solo configuración.
5. **[CONTRADICCIÓN] Hardware primero contra alcance de la primera iteración.** 3.ARDs/002: "The first iteration must focus on parts that are harder to change in the future (hardware)". 4.Solution/1.FirstIteration/README.md: objetivos y tareas sin trabajo de hardware; el hardware aparece como propuesta de la segunda iteración.
6. **[DATO, git] ADR-007 cambió después de la entrega.** En 206f697 (entrega, 2023-10-31) los criterios eran: escalabilidad, elasticidad, evolvability y extensibilidad, responsividad, integridad de datos; la tabla tenía Good/Weak por opción, y Event-driven tenía "Weak" en integridad de datos. En 8c1bd51 (2023-11-26) los criterios pasaron a escalabilidad, elasticidad, extensibilidad y modularidad, y la tabla se reemplazó por una imagen con puntajes. El estado sigue "Accepted" y no hay nota de revisión.
7. **[DATO, git] Principios reescritos después de la entrega.** En ac31bb8 y c59f8f2 (2023-11-26) cambiaron las filas de reliability, security y maintainability. Por ejemplo, reliability pasó de "Multiple users" a "Dataset must be consistent".
8. **[CONTRADICCIÓN] Diseño de la autenticación de integraciones.** 3.ARDs/014 dice "User must have an authentication flow for all integrations. (See ADR-005)". 3.ARDs/005 no describe autenticación. El flujo está en 2.ProposedScenarios.md solo para iNaturalist. Para GBIF, 2.ProposedScenarios.md pide credenciales al usuario, y no declara si se guardan.
9. **[CONTRADICCIÓN] Almacenamiento del dataset de Edge Impulse.** 3.ARDs/006 dice que Edge Impulse consume datasets de Google Cloud Storage. 5.AnalysesOf3rdPartyTools.md dice que su bucket es "S3 compatible". No declara cómo se conecta.
10. **[HUECO] Enlace de la cámara con la plataforma.** 4.Solution/1.FirstIteration/README.md pide que la cámara envíe alertas "via LoraWan, 3G or satellite" con respuesta "Push notifications". ADR-004 solo elige push para el usuario. Ningún ADR elige el enlace entre cámara y plataforma.
11. **[HUECO] Disponibilidad de datos en la cámara.** 2.ConsiderationsAndDataCriticality.md marca "Video and photos on camera" como "Critical, must always be available". Los datos viven en una SD y el principio dice que se borran al subir. No hay respaldo declarado.
12. **[HUECO] Verificación antes de borrar.** 2.SolutionBackground/1.ArchitecturePrinciples.md: "Data will be erased from SD once is uploaded". No declara cómo se verifica que la subida terminó.
13. **[HUECO] Compatibilidad entre versiones de cámara.** 1.ProblemBackground/4.RaidLog.md: la plataforma debe seguir funcionando "with old and new camera versions". La acción es "The decisions about the camera are made in the first place". No hay ADR de versionado de firmware ni de API.
14. **[HUECO] Garantía de entrega.** 3.ARDs/010 exige que los mensajes "cannot be lost", pero no nombra el broker, ni la entrega garantizada, ni los reintentos.
15. **[HUECO] Modelo de permisos.** 2.SolutionBackground/1.ArchitecturePrinciples.md: "Users will have access only to their resources". 3.ARDs/008 no describe permisos.
16. **[HUECO] Rotación del token de cámara.** 3.ARDs/009 fija el token en la cámara. No declara rotación ni revocación.
17. **[HUECO] Formato de publicación.** 4.Solution/1.FirstIteration/README.md menciona "camtrap-dp" para GBIF. Ningún ADR ni análisis lo trata.
18. **[HUECO] Privacidad.** Hay datos de usuarios, y el repo no declara privacidad, GDPR ni retención por usuario.
19. **[HUECO] Costos sin cifras.** El driver de costo mínimo (1.ProblemBackground/0.BusinessGoalsDrivers.md) no tiene cifras. El costo del despliegue enterprise de Edge Impulse no está cuantificado (3.ARDs/006).
20. **[HUECO] Cifras ausentes.** No hay volumen de datos, número de cámaras, tamaño de modelos ni latencia en milisegundos.
21. **ADR sin consecuencias o sin opciones.** 3.ARDs/013 y 014 no tienen sección de consecuencias ni opciones. 3.ARDs/011 no tiene consecuencias negativas. Los ADR 002, 004 y 008 a 014 no tienen sección de opciones.

### 7.3 Lo que no se pudo leer

- **17 imágenes sin leer**: diagrama de contexto, diagrama de contenedores, leyenda, 11 diagramas de contenedores individuales, `arch_chars.png` (características), `arch_selection.png` (puntajes de ADR-007) y el logo. Consecuencia: la arquitectura de contenedores solo se conoce por los nombres de los 11 servicios y sus enlaces a ADR. Los puntajes de ADR-007 por criterio tampoco son legibles en el corpus de texto.
- **5.Resource/**: los dos PDF (presentación del kickoff y datos de los equipos) están en el repo según git (commit 206f697), pero no están en el corpus de texto. No se leyeron.

---

## 8. Candidatas a verdades enseñables

1. **Si un dispositivo puede quedar sin conexión, es preferible que él consulte la configuración y no que se la empujen.**
   Ejemplo: en el ADR-003, la cámara consulta en cada ciclo y, sin internet, termina el ciclo y reintenta; la opción que escucha siempre puntuó 3/5 en tolerancia a fallos y la otra 4/5.
   Fuentes: 3.ARDs/003.CameraUpdateStrategy.md; 2.ProposedScenarios.md ("Check for updates"); 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md.
   Respaldo: **FUERTE** (tres documentos y un ADR relacionado, ADR-009).

2. **Cuando el dispositivo es caro de cambiar, el diseño tiene que incluir una vía manual que no dependa de la red.**
   Ejemplo: las fotos y videos salen por SD o USB; los datos no viajan por internet; el repo lo asume como decisión y declara sus pasos manuales.
   Fuentes: 3.ARDs/012.ManualProcessOnCameras.md; 1.ProblemBackground/2.ConsiderationsAndDataCriticality.md; 4.Solution/1.FirstIteration/README.md.
   Respaldo: **FUERTE**.

3. **Un SaaS de terceros reduce la complejidad propia de la plataforma, y a cambio crea dependencia de proveedor y de nube.**
   Ejemplo: Wildlife Insights se eligió como SaaS que no aumenta la complejidad, y ADR-005 lista la integración con GCP como costo; ADR-006 declara que el precio de despliegue enterprise es "on-request".
   Fuentes: 3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md; 3.ARDs/006.ChooseTheFirstModelTrainingIntegration.md.
   Respaldo: **FUERTE**.

4. **Un ADR puede decir que una elección no se basa en criterios técnicos, y dejarlo registrado.**
   Ejemplo: ADR-005 escribe que no hay razón técnica para elegir Wildlife Insights sobre TrapTagger.
   Fuente: 3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md.
   Respaldo: **MEDIA** (un documento claro).

5. **Una cola de mensajes se justifica en el punto donde la etapa siguiente puede frenar la entrada.**
   Ejemplo: en ADR-010, la selección de usuarios es más lenta que la recepción, así que la cola va entre la API y ese servicio.
   Fuente: 3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md.
   Respaldo: **MEDIA** (un ADR).

6. **Declarar lo que queda para después separa lo decidido de lo que es hipótesis.**
   Ejemplo: la segunda iteración se marca como "product hypothesis" hasta que la investigación de usuarios la confirme.
   Fuente: 4.Solution/2.Suggestion-SecondIteration/README.md.
   Respaldo: **MEDIA** (un documento claro).

7. **Un cambio de criterios después de la entrega tiene que quedar anotado en el propio ADR.**
   Ejemplo: en ADR-007, la decisión (microservicios) no cambió, pero los criterios sí (commit 8c1bd51); el ADR sigue en estado "Accepted" y no tiene nota de revisión.
   Fuentes: git `206f697` y `8c1bd51` del clon hermano; 3.ARDs/007.ChoosingTheMicroserviceArchitecture.md.
   Respaldo: **DÉBIL** (un caso, y se deduce de git; el repo no declara una regla al respecto).

8. **Un requisito sin identificador en las decisiones deja de poder verificarse.**
   Ejemplo: 1.Requirements.md numera 4 requisitos, ningún ADR los cita, y el único enlace es la tabla de 6 filas de la primera iteración.
   Fuentes: 1.ProblemBackground/1.Requirements.md; 4.Solution/1.FirstIteration/README.md.
   Respaldo: **DÉBIL** (se deduce de la ausencia de referencias).

---

## 9. Fragmentos citables

1. "Users should be able to analyse the videos using common camera trap labelling platforms" (4.Solution/1.FirstIteration/README.md)
2. "The first iteration must focus on parts that are harder to change in the future (hardware) and are based on other parts." (3.ARDs/002.BuildTheSystemUsingIterations.md)
3. "Treating the camera as an external resource reduces the security complexity and makes the camera system be more fault-tolerant." (3.ARDs/003.CameraUpdateStrategy.md)
4. "the platform must be the source of true and must override any camera manual configuration." (3.ARDs/003.CameraUpdateStrategy.md)
5. "there is no technical reason for choosing Wildlife Insights over TrapTragger." (3.ARDs/005.ChooseTheFirstLabellingPlatformIntegrat.md)
6. "The selection of user is a slower then receiving data, and can be a bottleneck in case of huge input." (3.ARDs/010.UseAQueueOnCameraIntegrationServiceContainer.md)
7. "Once cameras are deployed, it can be very expensive the change it hardware requirements." (3.ARDs/012.ManualProcessOnCameras.md)
8. "Generate an unique token per camera, that must be set on each camera as a hard-coded value." (3.ARDs/009.SimpleSecurityOnCameraAPI.md)
9. "This feature is heavily dependent on user research and feedback and until verified should be treated as a product hypothesis." (4.Solution/2.Suggestion-SecondIteration/README.md)

---

## 10. Etiquetas presentes

ADR, C4, microservicios, cola-de-mensajes, db-por-servicio (parcial), seguridad, resiliencia-fallos, fuente-unica-de-verdad, escalabilidad, evolutividad, rendimiento-latencia, disponibilidad-HA, costo, observabilidad, retencion-de-datos, cloud-gestionada, edge, ml-clasico, mlops, evaluacion-de-modelos, human-in-the-loop, tradeoffs-explicitos, supuestos-explicitos, riesgos-explicitos, fuera-de-alcance-explicito, glosario, otro: entregas-iterativas, otro: integracion-con-terceros, otro: flujos-de-usuario, otro: principios-de-arquitectura, otro: requisito-a-solucion, otro: revision-por-pull-request, otro: operacion-manual-en-campo, otro: interfaces-de-usuario, otro: mantenibilidad-voluntarios
