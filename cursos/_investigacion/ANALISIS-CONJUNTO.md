# Análisis de conjunto · fase 1 (solo texto)

Qué enseñan juntos los doce ganadores, cuál es el mejor ejemplo de cada idea, qué casos conviene que vuelvan y en qué orden se entiende todo. Sale de los 206 hallazgos de `texto/` (índice en `texto/INDICE.md`). No es el diseño del curso: es la base para decidirlo, y lo decide Felix.

Criterios para elegir el ejemplo de cada idea (de `CLAUDE.md`): que muestre la práctica bien hecha; que no obligue a narrar complejidad que la idea no necesita (caso nuevo, cifras que no coinciden, estado Proposed que aclarar); entre dos que enseñan lo mismo, el de un caso que ya está en pantalla. "Completo" y "parcial" vienen de la extracción.

**Límite de este análisis.** Los hallazgos pasaron una comprobación mecánica (citas literales, archivos, líneas y cifras), no una verificación de sentido completa. Los que este documento elige como ejemplo principal (unos 40) hay que releerlos contra la fuente antes de escribir un guion. Las ideas que dependen de una imagen están marcadas.

---

## 1. Lo que los doce enseñan juntos

Los hallazgos se agrupan en catorce ideas. Las once primeras coinciden con el arco del curso actual. Las tres últimas son material que el curso actual no tiene y que los repositorios traen bien hecho.

| # | Idea | Cuántos repos la muestran | Fuerza de la evidencia |
|---|---|---|---|
| 1 | Las cualidades salen del requisito, y elegir es renunciar por escrito | 9 | Alta |
| 2 | Comprobar una cualidad con una cuenta | 5 | Media: varias cuentas tienen cifras que no cierran |
| 3 | El estilo se elige con las cualidades, y puede variar por parte | 8 | Alta |
| 4 | Dónde se corta un sistema (y dónde no) | 7 | Alta |
| 5 | De quién es cada dato y qué consistencia se acepta | 7 | Alta |
| 6 | Cómo se hablan las partes | 8 | Alta |
| 7 | Diseñar el fallo | 7 | Alta |
| 8 | Datos sensibles: dónde viven, quién los ve, cuánto duran | 9 | Alta |
| 9 | Comprar o construir, y la capa propia sobre lo comprado | 9 | Alta |
| 10 | Empezar simple y escribir cuándo cambiar | 7 | Alta |
| 11 | Un modelo de IA dentro del sistema | 5 | Muy alta: es lo más rico del corpus |
| 12 | Escribir y gobernar las decisiones | 8 | Alta |
| 13 | **Nueva:** introducir un cambio riesgoso en producción (por fases, en paralelo, en sombra) | 4 | Media-alta |
| 14 | **Nueva:** el borde del sistema (API por consumidor, gateways, tráfico pesado fuera del servicio) | 5 | Media-alta |
| — | (Transversal) el costo como criterio, incluido el costo de operar | 8 | Alta, pero repartido en otras ideas |

---

## 2. El mejor ejemplo de cada idea

Para cada idea: el ejemplo principal, uno de respaldo y lo que se descarta y por qué.

### 1 · Cualidades desde el requisito, y renunciar por escrito
- **Principal:** MonitorMe deriva cada cualidad de una frase del pedido, se queda con tres y deja escrita cada renuncia (BluzBrothers H01, H03; Accepted). La disponibilidad sale de la elección del estilo y se resuelve en la infraestructura.
- **Respaldo:** ClearView parte de las dificultades del caso y baja la prioridad de una cualidad con un ADR propio (Pragmatic H05, H19; Accepted).
- **Para completar la idea:** Farmacy Family sube una cualidad implícita cuando un requisito la vuelve central (Archangels H02). Sysops Squad ata cada cualidad a un interesado y un caso de uso (Team-7 H14).
- **Descartado:** Road Warrior H01 y Hey Blue! H13 enseñan lo mismo con menos (sin alternativas, imágenes).
- **Imagen necesaria:** el mapeo de MonitorMe de cualidades sobre componentes (BluzBrothers H02).

### 2 · Comprobar una cualidad con una cuenta
- **Principal:** el presupuesto de latencia de MonitorMe, tramo por tramo (BluzBrothers H05). Sirve si se dice que 2 ms por señal es un supuesto y 16 ms una cota calculada (corregido en la extracción).
- **Respaldo para costo:** ClearView mide el algoritmo de emparejamiento en cantidad de llamadas al modelo (Pragmatic H02; Accepted, completo). Es una cuenta de costo sin cifras que se contradigan.
- **Descartado como ejemplo principal:** los costos de Farmacy Food (ArchColider H20), de Hey Blue! (MonArch H14) y de Certifiable (ZAITects H04). Los tres tienen cifras que no cierran entre documentos o sumas mal hechas. Por la regla del ejemplo más simple, no se usan para enseñar a hacer una cuenta.
- **Complemento:** Spotlight fija la disponibilidad según lo que está en juego y por quantum (Pegasuz H07). Es una cuenta de nueves sin aritmética compleja.

### 3 · El estilo se elige con las cualidades
- **Principal:** ClearView elige un estilo basado en servicios por costo y testabilidad, y usa eventos solo donde la interoperabilidad lo pide (Pragmatic H05; Accepted, completo). Ya está en la propuesta de la lección 2.
- **Respaldo:** Farmacy Food elige monolito modular con una tabla de cualidades contra las restricciones del cliente (ArchColider H01; Accepted, completo).
- **Para completar:** Farmacy Family elige el estilo con menos trade-offs, no uno sin ellos (Archangels H01; Confirmed). Hey Blue! usa un estilo con mala nota en rendimiento aislando la parte que lo necesita (MonArch H02); la misma idea se cuenta con ClearView.
- **Imagen necesaria:** las tablas de puntaje de estilos (Pragmatic ADR-002, Archangels H01).

### 4 · Dónde se corta un sistema
- **Principal:** Farmacy Family corta cada dominio con un criterio nombrado (fallo, seguridad, volatilidad) y decide no partir autenticación y autorización porque separarlas cuesta más de lo que da (Archangels H04, H05, H06; Confirmed, completos). Es el mejor modelo del corpus para esta idea.
- **Respaldo:** Sysops Squad corta por grupos de cualidades en cuatro quanta (Team-7 H01; Proposed). Spotlight define quanta y deja que cada uno elija su estilo (Pegasuz H01, H02; parcial, con imágenes).
- **Cómo encontrar los límites:** event storming en MonitorMe, con lo que queda fuera escrito (BluzBrothers H09).
- **Decisión pendiente:** Farmacy Family es un caso invitado, distinto de Farmacy Food aunque mejora su sistema. Si se usa aquí, conviene presentarlo como "la segunda fase del sistema de Farmacy Food", o asumir que entra como caso nuevo.

### 5 · De quién es cada dato
- **Principal:** MobilityCorp concentra el estado del vehículo en un solo servicio como fuente de verdad, y admite el punto crítico que eso crea (Five-Nines H01; completo).
- **Respaldo:** ClearView comparte la base entre servicios con una regla de un solo escritor por objeto, impuesta con permisos (Pragmatic H04).
- **Consistencia:** MobilityCorp separa consistencia fuerte dentro del agregado y eventual entre agregados (Five-Nines H18; parcial). Hey Blue! usa CQRS y eventos para no pedirle todo a otro servicio (MonArch H05; Proposed, completo).
- **Partir la base en fases:** Sysops Squad llega a la arquitectura objetivo sin partir la base al principio (Team-7 H09; completo).

### 6 · Cómo se hablan las partes
- **Principal:** Spotlight elige entre cola y stream según si un evento tiene varios consumidores y hay que retenerlo (Pegasuz H10; Accepted, completo).
- **Quién inicia:** Wildlife Watcher hace que la cámara pida los cambios en vez de recibirlos (Celus H01; Accepted, completo).
- **Por flujo:** Sysops Squad elige el mecanismo de integración de cada flujo por separado (Team-7 H05, H06; Proposed).
- **Hacia el usuario:** ClearView saca las llamadas largas del camino del usuario con colas (Pragmatic H17). ShopWise elige el canal de streaming por la forma de la interacción (ConnectedAI H12; Accepted, completo).

### 7 · Diseñar el fallo
- **Principal:** Farmacy Food protege que el cliente retire su comida aunque la nevera no tenga red, con un código PIN que funciona sin conexión (ArchColider H11; Accepted, completo). Es un ejemplo concreto, simple y bien hecho, que el curso actual no usa.
- **Respaldo:** MonitorMe manda las alertas por dos canales independientes y razona componente por componente qué pasa si falla un sensor (BluzBrothers H06, H07).
- **Mensajes:** la doble escritura y los eventos duplicados (Archangels H10; Accepted, parcial). Integración con miles de sistemas que fallan, con adaptadores y cola de reintentos (Pragmatic H10; Accepted).
- **Orden de pasos:** fallar rápido con el pago antes de reservar (Five-Nines H19).
- **Con estado Proposed:** entrega al menos una vez sin cobrar dos veces (ArchColider H08). Es el ejemplo actual de la lección 7; se puede mantener diciendo que es una propuesta.

### 8 · Datos sensibles
- **Principal:** ClearView impone la anonimización con la arquitectura (el servicio de emparejamiento no tiene permiso para leer el currículum) y admite por escrito una lectura directa de datos sensibles a cambio de simplicidad (Pragmatic H03, H14; Accepted).
- **Borrado:** crypto shredding en Farmacy Family (Archangels H09; Accepted).
- **Retención:** fotos de MobilityCorp por niveles de propósito (Five-Nines H07; completo). Se puede contar sin cifras, porque el 90 frente a 180 días no hace falta para la idea.
- **Reducir el alcance regulado:** Sysops Squad aísla facturación para achicar la auditoría PCI (Team-7 H04; Proposed, completo).
- **Nuevos:** ShopWise autoaloja la herramienta de trazas de conversaciones por los datos que guarda (ConnectedAI H11; Accepted, completo) y da a los invitados un token con menos permisos (H14). Certifiable decide dónde corre el modelo según qué tan sensible es el dato (ZAITects H06).

### 9 · Comprar o construir
- **Principal:** Spotlight compra lo que no es núcleo y pone una fachada propia delante (Pegasuz H04; Accepted, completo).
- **El sentido contrario:** ShopWise construye su propio API gateway en vez de comprar uno comercial, por funciones que no usaría y costo de licencia (ConnectedAI H15; Accepted, completo). Sirve para mostrar que la regla no es "siempre comprar".
- **Costo de operar:** el ADR de DataDog de Farmacy Food (ArchColider H15). Es la base de la lección 1; está en Proposed.
- **Decir cuándo no hay razón técnica:** Wildlife Watcher elige un servicio de etiquetado y escribe que la elección no tiene razón técnica (Celus H06; Accepted, completo).
- **IA:** comprar el modelo hecho frente a alojarlo (Pragmatic H07, ConnectedAI H02).

### 10 · Empezar simple y escribir cuándo cambiar
- **Principal:** MobilityCorp empieza con un servicio gestionado y fija de antemano la métrica que dispara el paso a un modelo propio (Five-Nines H05; completo).
- **Respaldo:** Farmacy Food decide extraer o escalar según métricas, incluida una medición del recorrido del negocio de punta a punta (ArchColider H03; Accepted, completo).
- **Arquitectura de transición:** Sysops Squad usa service-based como paso intermedio (Team-7 H02, H09).
- **Descartado:** la condición de Spotlight para crecer (Pegasuz H03) y la de Hey Blue! (MonArch H01) no dicen qué señal dispara el cambio.

### 11 · Un modelo de IA dentro del sistema
Es lo más rico del corpus: cuatro repositorios (Five-Nines, Pragmatic, ZAITects, ConnectedAI) con decisiones Accepted y completas. Da para dos lecciones.
- **Qué no decide el modelo:** ClearView, donde la IA extrae rasgos y una regla fija compara (Pragmatic H01). MobilityCorp, con reglas para lo transaccional y GenAI solo donde aporta, y el precio repartido entre ML, reglas y GenAI (Five-Nines H02, H11).
- **Cuando el modelo duda:** bandas de confianza con la duda a favor del cliente (Five-Nines H06). Umbral de confianza entre IA y experto (ZAITects H02; parcial, no da el valor).
- **Medir:** métricas que engañan solas (ConnectedAI H08). Evaluar el sistema, no solo el modelo (ZAITects H09). Sesgo medido con un umbral (Five-Nines H15).
- **Cambiar el modelo:** evaluación como compuerta de despliegue, con período en sombra (Five-Nines H14). Pruebas por paso del flujo (Pragmatic H09).
- **Arquitectura alrededor del modelo:** un gateway entre la aplicación y los modelos (ZAITects H05). Un modelo distinto según la tarea (ConnectedAI H01). Recuperar respuestas corregidas en vez de entrenar (ZAITects H03). No usar agentes donde el flujo es fijo y el error es caro (ZAITects H07; el texto se contradice, revisar). Responder solo con datos verificados mediante herramientas (ConnectedAI H05).
- **Riesgo nuevo:** inyección de instrucciones en el texto del usuario (Pragmatic H21; ilustrativo).

### 12 · Escribir y gobernar las decisiones
- **ADR con criterios y puntaje:** Wildlife Watcher (Celus H10; Accepted, completo).
- **Rechazado y postergado:** ClearView deja escrita la condición para reabrir (Pragmatic H11, H12; Denied, completos).
- **Supuestos numerados:** ClearView (Pragmatic H20).
- **Riesgos de negocio para el dueño:** Farmacy Food separa los riesgos que decide el negocio (ArchColider H23).
- **Comprobar que se cumplen:** fitness functions, de las cuales MonitorMe tiene la única calculada (BluzBrothers H05). Ninguna está automatizada en el corpus.
- **Lo que queda fuera:** MonitorMe (BluzBrothers H09, H10) y la adopción condicionada a una prueba de concepto con criterios de salida (Five-Nines H13).

### 13 · Nueva: introducir un cambio riesgoso en producción
- Certifiable pone la IA a corregir en paralelo con las personas antes de darle el control (ZAITects H11; ilustrativo).
- MobilityCorp promueve un modelo nuevo solo si supera al actual y pasa una semana en sombra (Five-Nines H14; completo).
- Farmacy Food comprueba que un servicio está listo antes de mandarle trabajo (ArchColider H04; Proposed).
- MobilityCorp enciende una función cara de IA solo para una parte de los usuarios (Five-Nines H20; ilustrativo).
- **Lectura:** la idea está bien sostenida, pero repartida. Puede ser una lección propia o la segunda mitad de la de IA.

### 14 · Nueva: el borde del sistema
- Spotlight sube archivos directo al almacenamiento con URL firmadas para sacar el tráfico pesado del servicio (Pegasuz H05; Accepted, completo).
- Spotlight usa GraphQL para sus apps y otro estándar para terceros (Pegasuz H06; Accepted, completo).
- Sysops Squad pone un gateway por quantum sin lógica de dominio (Team-7 H12; Proposed, completo).
- Hey Blue! hace que la API pública atienda solo a la app y los administradores entren por otro camino (MonArch H06; Proposed, completo).
- **Lectura:** sirve como parte de "cómo se hablan las partes" o de "datos sensibles". No parece pedir lección propia.

---

## 3. Qué casos conviene que vuelvan

Cuántas veces cada caso aparece como ejemplo principal o de respaldo en las catorce ideas, y con qué estado:

| Caso (repo) | Ideas donde es principal o respaldo | Estado de sus decisiones | Lectura |
|---|---|---|---|
| ClearView (Pragmatic) | 1, 2, 3, 5, 6, 7, 8, 9, 11, 12 | Accepted casi todas; Denied y Superseded usados con razón | El caso más útil del corpus. Cubre diez ideas con decisiones aceptadas. |
| MobilityCorp (Five-Nines) | 5, 7, 8, 10, 11, 13 | Sin campo de estado (no hay que aclarar Proposed) | Muy fuerte en IA, datos y evolución. |
| MonitorMe (BluzBrothers) | 1, 2, 4, 7, 12 | Accepted | El caso más simple de entender, y el mejor para cualidades y fallo. |
| Farmacy Food (ArchColider) | 3, 7, 9, 10, 12 | Mayoría Proposed; las mejores (H01, H03, H11) son Accepted | Costo y operación, más el PIN sin red. El dominio es fácil de entender. |
| Sysops Squad (Team-7) | 4, 5, 6, 8, 10, 14 | Todas Proposed | Único caso de partir un sistema que ya existe. Hay que decir "propone" siempre. |
| Farmacy Family (Archangels) | 4, 7, 8 | Confirmed y Accepted | El mejor ejemplo de dónde cortar. Es invitado y se confunde con Farmacy Food. |
| Spotlight (Pegasuz) | 2, 4, 6, 9, 14 | Accepted casi todas | Fuerte en comprar, comunicación y borde. |
| Certifiable (ZAITects), ShopWise (ConnectedAI) | 11, 13, 8 | Accepted | Necesarios para IA, en la lección de IA. |
| Wildlife Watcher (Celus), Hey Blue! (MonArch), Road Warrior (Profitero) | 1 o 2 ideas cada uno | Celus Accepted; MonArch y Profitero Proposed | Invitados puntuales. Road Warrior casi no aporta un ejemplo principal. |

**Recomendación:** mantener los cinco casos recurrentes del curso actual (ClearView, MobilityCorp, MonitorMe, Farmacy Food, Sysops Squad). La evidencia los sostiene: entre los cinco cubren las catorce ideas, y cada uno aporta algo que los otros no tienen. Los cambios que propone el análisis son de ejemplos, no de elenco:
- **Spotlight** gana peso como invitado frecuente (comprar, comunicación, borde).
- **Farmacy Family** entra en "dónde cortar", presentado como la segunda fase del sistema de Farmacy Food, que es lo que el repositorio dice. Así no cuenta como caso nuevo.
- **Road Warrior** puede salir del curso. Su único hallazgo completo (multizona, H07) lo cubren otros, y casi todas sus decisiones están en Proposed.

---

## 4. En qué orden se entiende todo

El orden del curso actual se sostiene. Lo que pide la evidencia:

1. **Qué es una decisión de arquitectura y cómo se escribe.** ADR, trade-off, los cinco casos.
2. **Cualidades y renuncias** (idea 1).
3. **Comprobar con una cuenta** (idea 2). Usar MonitorMe y ClearView, no las cuentas de costo con cifras que no cierran.
4. **Estilo, y dónde se corta** (ideas 3 y 4). La idea 4 gana con Farmacy Family.
5. **De quién es cada dato** (idea 5).
6. **Cómo se hablan las partes**, incluido el borde (ideas 6 y 14).
7. **Diseñar el fallo** (idea 7). Gana el PIN sin red de Farmacy Food.
8. **Datos sensibles** (idea 8).
9. **Comprar, construir y empezar simple** (ideas 9 y 10).
10. **Un modelo en el sistema** (idea 11, primera parte: qué decide, cuándo duda, cómo se mide).
11. **Cambiar con seguridad** (idea 11, segunda parte, más la idea 13: evaluación como compuerta, sombra, por fases).
12. **Escribir y gobernar** (idea 12).

Son doce lecciones en vez de once. La diferencia es partir la IA en dos y sumar el cambio en producción. Si se prefiere quedarse en once, la 11 se funde con la 10.

Dependencias que el orden respeta: "cuántos sistemas" (corte) antes que "cómo se hablan"; "cómo se hablan" antes que "qué pasa si falla"; las ideas de IA después de datos sensibles y de comprar o construir, porque las usan.

---

## 5. Lo valioso que no entra, y por qué

| Hallazgo | Por qué no entra |
|---|---|
| Event sourcing para explicar quejas (ArchColider H07) | Es buen material, pero pide presentar un patrón nuevo. Encaja solo si la lección de datos tiene tiempo. |
| Actor por nevera para evitar carreras (ArchColider H12) | Ilustrativo, sin ADR. |
| Ventana de cancelación para no reembolsar (ArchColider H25) | Ilustrativo, sin decisión. Bonito ejemplo de diseño del fallo; candidato si sobra lugar en la lección 7. |
| Pedidos programados (ArchColider H24) | Decisión abierta, sin elegir. |
| Compacted topic y clave de partición (Profitero H04, H05) | Proposed, técnico y fuera del nivel del espectador. |
| Asignar por lotes, jobs por calendario (Team-7 H03, H10) | Bien hechos, pero cuentan algo secundario frente a las ideas de comunicación. Candidatos para la lección 6 si se busca un ejemplo de procesamiento por tiempo. |
| Equipos alineados a componentes, organización del desarrollo (BluzBrothers H13, Profitero H14) | Organización, no arquitectura del sistema. |
| Modelo de grafo para consultas, persistencia políglota (Archangels H11, H12) | Ilustrativo o parcial; pide presentar tipos de almacenes. |
| Búsqueda aproximada, colecciones de vectores, chunking (ZAITects H13, H18, H19) | Detalle de implementación de IA. Fuera del nivel del curso. |
| Contenedores en serverless, VM en vez de Kubernetes (ConnectedAI H13, ArchColider H16) | Plataforma de despliegue. ArchColider H16 además se contradice con otro documento. |
| Costos de Farmacy Food, Hey Blue! y Certifiable (ArchColider H20, MonArch H14, ZAITects H04) | Cifras que no cierran. Se pueden mencionar como contexto, no como modelo de cuenta. |

---

## 6. Lo que falta antes de diseñar el curso

1. **Verificación de sentido de los ejemplos elegidos.** Son unos 40 hallazgos (los marcados como principal o respaldo arriba). Releerlos contra la fuente es mucho menos trabajo que verificar los 206, y es lo que el curso necesita.
2. **Fase 2, solo las imágenes de los ejemplos elegidos:** puntajes de estilos de ClearView y Farmacy Family, mapeo de cualidades de MonitorMe, worksheets de quanta de Spotlight.
3. **Decisiones de Felix:**
   - ¿Doce lecciones (IA en dos, más cambio en producción) u once?
   - ¿Farmacy Family entra como segunda fase de Farmacy Food en la lección de corte?
   - ¿Road Warrior sale del curso?
   - ¿Se mantiene el ADR de DataDog (Proposed) como ejemplo central de la lección 1, o se busca uno aceptado?
4. **La lección 11 actual** se arma sobre defectos (ADR-0017 como contraejemplo). Con este análisis puede rehacerse sobre los ejemplos buenos de la idea 12: el ADR rechazado con condición de reapertura de ClearView y lo que queda fuera en MonitorMe.
