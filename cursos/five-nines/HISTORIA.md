# Five Nines · Historia del proceso

Reconstrucción de cómo razonó el equipo **Five Nines**, ganador (1.er puesto) de la O'Reilly Architecture Kata Q4 2025 (*AI-Enabled Architecture*, caso MobilityCorp), a partir del historial completo de su repositorio.

- **Repositorio:** `github.com/TheKataLog/Five-Nines` (fork). Clon completo: 305 commits, del 2025-10-15 al 2025-11-24.
- **Autores en git:** 4 (146, 92, 46 y 21 commits). El README acredita a 5 personas. En este documento se habla de "el equipo" y, cuando importa, del rol ("quien llevó los requisitos", "quien llevó el contexto de autos y camionetas").
- **Podio oficial** (perfil de `TheKataLog`, sección *Finalists: Q4 2025*): 1. Five Nines, 2. Nimrods, 3. Kata-na; runner-up: Katainenmobility.
- **Horas:** los commits están en la hora local de cada autor (+0100, +0200, +0300). Cuando importa (la foto del 23 de octubre), se convierte a la hora del este de EE. UU. (ET), que es la del calendario oficial.

Convenciones: **[P]** = lo prueba el historial (commit y archivo citados). **[I]** = inferencia nuestra, razonable pero no escrita por el equipo.

---

## 1. El pliego (fuente y contenido)

### 1.1 Dónde está

El pliego no está en el árbol final del repositorio ni en el de los otros finalistas. Pero el equipo lo subió el primer día y lo borró después:

- **8a5ce24** (2025-10-15 20:06) agrega `sessions/#1/`: `captions_en.txt` (subtítulos WebVTT crudos de la sesión inaugural en vivo, 1:20 h), `Q4200025_video1_transcript_updated.md` (un resumen limpio de esos subtítulos) y `chat_session.json` (el chat del evento).
- **31d6ccc** (2025-10-22 18:28) borra la carpeta `sessions/` entera.

No se copian a este repositorio: se recuperan del historial de Five-Nines con `git show '8a5ce24:sessions/#1/captions_en.txt'` (agregados en **8a5ce24**, borrados en **31d6ccc**). Los minutos citados aquí son los de ese archivo WebVTT. **Seguimos los subtítulos crudos (`captions_en.txt`)**. El resumen `..._transcript_updated.md` es una paráfrasis: tiene marcas de tiempo desordenadas y respuestas de la sesión de preguntas que no aparecen textuales en los subtítulos (por ejemplo, la lista de criterios y algunas respuestas de "fuera de alcance"). No leímos ni usamos el chat (`chat_session.json`) porque contiene datos de asistentes.

Los otros finalistas no traen el pliego: Kata-na (`PROBLEM_STATEMENTS/PROBLEM_STATEMENT.md`) lo reescribe con cifras inventadas (15–25 % de reservas perdidas, etc.); Nimrods (`docs/requirements.md`) da otra flota (2.000 scooters y 2.000 bicicletas por área metropolitana); Katainenmobility cita solo los tres problemas clave. Sirven como contraste, no como fuente.

### 1.2 Qué dice (de los subtítulos, con minuto)

- **Formato:** kata de O'Reilly, anfitrión Sam Newman. Empresa "ficticia, pero realista" (min 6). Se pide decidir dónde usar IA, "o dónde la consideraste y decidiste no usarla" (min 6).
- **Negocio:** MobilityCorp, alquiler de corta duración para la última milla: scooters y bicicletas eléctricas, y una flota creciente de autos y camionetas eléctricas para compartir (min 7–8). Ciudades, con planes suburbanos.
- **Reservas:** autos y camionetas hasta 7 días antes, con duración fija; bicicletas y scooters hasta 30 minutos antes, abiertas, máximo 12 horas (min 9). Pago por minuto, multas por devolución tardía o en lugar equivocado (min 10). Preautorización en la tarjeta (min 32–33). Sin duración mínima (min 42).
- **Vehículos:** GPS, bloqueo/desbloqueo remoto por API, teléfono con NFC para abrir, desactivación remota de autos y camionetas (min 10–12). Telemetría "al menos cada 30 segundos", ajustable si se justifica (min 37–38). La interfaz con el vehículo (HTTP, MQTT…) la define el equipo (min 31–32).
- **Devolución:** lugares designados; foto como prueba; autos y camionetas enchufados al cargador (min 12). Bicicletas y scooters en zonas geocercadas, con zonas de velocidad limitada (min 19–20).
- **Operación:** baterías intercambiables en bicicletas y scooters, cambiadas por cuadrillas en la calle; redistribución por acumulación (ejemplo: todos dejan la bicicleta en Buckingham Palace) (min 13–14).
- **Problemas del negocio** (min 14–17): (1) los vehículos no están donde y cuando se necesitan, "nuestro mayor desafío" (min 34); (2) priorizar a dónde mandar las cuadrillas de baterías; (3) uso ocasional, se quiere uso habitual (diario, para ir al trabajo), y el cliente conecta (3) con (1): si el servicio es confiable, la gente lo usa más.
- **Preferencia:** usar mejor la flota existente antes de comprar más vehículos (min 27).
- **Escala** (min 25–26, "me lo invento en vivo"): por país, "5000 bikes, 5000 scooters and a couple of 100 cars and a couple of 100 vans, 200 vans, 200 cars". Hay dos deslices orales ("200 bikes", min 26 y 40); seguimos la formulación principal: **200 autos, 200 camionetas, 5.000 bicicletas, 5.000 scooters por país**. Opera en todos los países de la UE (min 25, 39–40).
- **Alcance regulatorio:** solo UE (GDPR, varias monedas e idiomas). Seguros fuera de alcance. KYC ya existe (min 42).
- **Economía:** "No voy a compartir el modelo económico porque no lo inventé", pero el costo debe pesar en la solución (min 41).
- **Entregables** (min 45–47): README con narrativa, diagramas simples (cajas, flechas, palabras; C4 como inspiración), ADRs, documentos de discusión; video de 5 minutos para semifinalistas.
- **Criterios** (min 47–50): usos interesantes de IA generativa; adecuación de la solución; nivel de detalle del razonamiento; cómo se maneja la incertidumbre del mundo de la IA; validación y verificación de resultados de IA. (Un criterio sobre "arquitectura existente" se retiró en vivo: es greenfield, min 49 y 67–68.)
- **Incertidumbre** (min 54–59): el mejor modelo cambia mes a mes; precios subsidiados que van a subir; proveedores que pueden cerrar; ¿cómo cambiarías de modelo? ¿Cómo notarías que un modelo de terceros se degrada? Ir "con todo" a un proveedor es válido si se escribe en un ADR (min 57–58, 68–69).
- **Jurado:** Andrew Harmel-Law ("quiero ver tu tren de pensamiento", min 61–62), Gayathri ("supuestos explícitos, riesgos, precios y practicidad", min 63–64) y Kent Beck (semifinal y final).
- **Calendario** (min ~72): foto del repositorio el **23 de octubre a las 23:59 ET**; semifinalistas el **5 de noviembre**; videos el **9 de noviembre**; final el **13 de noviembre**.

---

## 2. Inventario de artefactos (árbol final)

| Carpeta | Artefactos | Primer commit | Contenido sustantivo |
| - | - | - | - |
| `README.md` | Narrativa, mapa de capacidades → FR → ADR, stack | 599463d (10-15) | 57b8370 (10-15 objetivos), 6d37ef2…d0b2a49 (10-21 mapa), d81160a (10-22 narrativa) |
| `requirements/` | Metas e impulsores, desafíos, FRs, NFRs, supuestos, riesgos, apéndices A/B/C | e20f6ec (10-15) | b7d92fb (10-16), 0d0036f (10-17), 3f7786d (10-19) |
| `requirements/suggested OKRs/` | Tabla de OKRs con "valor actual" y "valor planificado" | bf8ece8 (11-07) | ce59acf…ce1b3ef (11-09) |
| `adrs/` | Plantilla + 22 ADRs | 38af982 (10-16, solo título) | 938eb08 (10-16) … 4b17796 (10-23) |
| `hld/core-func/` | Contenedores núcleo, conectividad de vehículos, datos y analítica, contexto auto/camioneta | 446bf8a (10-17) | 8ba0904 (10-19), 70fa41b (10-18), 891b14e (10-23), 1f9345c (10-18) |
| `hld/scenarios/` | 5 escenarios de IA con diagrama C4 de contenedores | b1f4b0e (10-17) | 3cb037a, 4faf79d, 91e0c8b (10-19), 34760da (10-22) |
| `hld/mlops/` | MLOps en Vertex AI y Gemini | 076f519 (10-20) | acca6a5…428acd9 (10-21) |
| `hld/data-structure/` | Diagramas de datos de flota, actividad, pronóstico; fuentes de datos | 9cf73d8 (10-20) | d363a83 (10-23) |
| `video/` | Guion de video, narrativa, presentación final (PDF, 10 diapositivas), video de clientes | 87da42f (11-08) | 88bedef, 02f177b (11-09) |
| `main.png` | Ilustración de portada | 3a43ef5 (10-24) | — |

Los 22 ADRs, por fecha de creación: 0001 GCP (10-16), 0002 MQTT + Pub/Sub (título 10-16, contenido 10-18), 0003 Vertex AI (10-18), 0004 Gemini con Maps grounding (10-19), 0005 rutas con IA (borrador 10-19, final 10-20), 0006 gestión de conocimiento, 0007 Fleet Service como fuente única de verdad, 0008 búsqueda semántica, 0009 gestión de modelos, 0010 Agent Builder, 0011 flujo de evaluación (todos 10-20), 0012 asistente híbrido (10-20), 0013 plano de control de modelos como SaaS (10-21), 0014 modelo de limpieza, 0015 datos de entrenamiento y sesgo, 0016 human-in-the-loop, 0017 retención de fotos (10-21), 0018 precios híbridos, 0019 mantenimiento híbrido, 0020 detección de daños, 0021 ML simple para consejo de carga (10-22), 0022 pronóstico de demanda (10-23).

---

## 3. El proceso, día por día

Actividad (commits por día): 10-15: 8 · 10-16: 25 · 10-17: 34 · 10-18: 13 · 10-19: 33 · 10-20: 38 · 10-21: 48 · 10-22: 44 · 10-23: 22 · 10-24: 19 (madrugada local, todavía 23 de octubre en ET) · *hueco* · 11-07: 1 · 11-08: 2 · 11-09: 17 · 11-24: 1.

### Miércoles 15 de octubre: la sesión inaugural y los objetivos

- [P] Repositorio creado y estructura `requirements/`, `adrs/`, `hld/` (599463d, e20f6ec).
- [P] Se suben los subtítulos de la sesión inaugural (8a5ce24, 20:06).
- [P] Primer README con "Objective" (57b8370, 21:12): operación sin interrupciones (greenfield), **precios dinámicos**, **pronóstico de demanda**, **mantenimiento** (eficiencia de suministro, predicción por sensores). Es la primera traducción del pliego a áreas de diseño. Los precios dinámicos van primero aunque el pliego no los nombra como problema.
- [I] El equipo arranca desde el pliego oral, no desde un documento escrito.

### Jueves 16: la nube, el primer boceto y la nota al margen

- [P] 08:09–08:10: dos ADRs creados **solo con título**: "Cloud Provider Selection" (38af982) y "Vehicle telemetry & integration stack" (9ac6a7d). Antes de cualquier requisito escrito, el equipo ya sabía qué dos decisiones iba a tener que tomar primero.
- [P] 19:50: ADR-0001 con contenido: **GCP** por integración nativa con Google Maps, datos en tiempo real (BigQuery, Pub/Sub, Dataflow) e IA integrada; AWS y Azure descartados por la integración de mapas (938eb08). 20:33: se agrega Gemini a los argumentos (d46d913).
- [P] 20:09: primer borrador de metas, `requirements/business requirements.md` (b7d92fb): seis objetivos, el cuarto "Leverage AI for Optimization", con una nota en línea de una integrante: *"not a business goal but a solution"*.
- [P] 20:31 (+0300): primer boceto de arquitectura en Mermaid, `sessions/#2/` (c9524d4): solo **scooters y bicicletas**; servicios de reservas, **ubicación** y **flota** separados; un servicio de precios que sigue a la competencia por scraping; un analizador de opiniones que detecta "mala ubicación". Borrado el 22 (31d6ccc).
- [P] 23:24–23:54: plantilla de ADR (1f2ae94) sin sección de riesgos; esqueleto de FRs, NFRs, apéndices y supuestos, renumerados 1–4 (c5258cd…b9e6584).

### Viernes 17: requisitos y la columna "Tech Choice"

- [P] 08:10: diagrama Mermaid del núcleo (446bf8a), aún con servicio de ubicación separado.
- [P] 10:23: esqueleto del HLD de conectividad de vehículos (4d3ee55).
- [P] 17:31: supuestos: **"GPS tracker shares information every 30 min"** (5c155f1). 22:10: **flota de "200 cars/vans, 500 bikes, 5,000 scooters" por ciudad** (eea5927). Ambos contradicen el pliego (ver §5).
- [P] 19:15: metas reescritas como cadena **Drivers → Goals → Solutions** (338c9ec); "Leverage AI" se convierte en "Automate Capabilities".
- [P] 19:33: primer escenario dibujado, análisis de opiniones (b1f4b0e). 19:37: registro de riesgos creado (f20a6a4).
- [P] 20:39: **se agrega la columna "Tech Choice"** a la tabla de FRs (0d0036f): asistente = "Hybrid (GenAI, ML, Code)" con el comentario *"Risk of overspending by using GenAI"*; consejo de precios = "Code"; consejo de carga = "Code, ML". 22:26 se agregan entradas y salidas de datos (3d97a0c). 23:36 todas las filas tienen herramienta: pronóstico = "ML", precios = "Hybrid" (95046f0).

### Sábado 18: conectividad, Vertex y el contexto de autos y camionetas

- [P] HLD de conectividad con disponibilidad objetivo 99,9 %, flujo de comandos y datos, diagrama (70fa41b, 0e53e1c, 19b255a).
- [P] ADR-0002 con contenido: MQTT en clúster sobre Kubernetes + Pub/Sub; HTTP directo y broker independiente descartados (0f1e34d).
- [P] ADR-0003: Vertex AI como plataforma central de IA (d297e74).
- [P] Primer boceto del planificador de rutas (9fcd218, 20:52).
- [P] Quien llevó autos y camionetas abre un contexto propio (bounded context) con requisitos, NFRs, modelo de dominio e integraciones (1f9345c), que crecerá hasta miles de líneas (d2903db, 679306f).

### Domingo 19: los escenarios y el primer cambio de opinión

- [P] ADR-0004: Gemini con *Maps grounding* para búsqueda y rutas conversacionales, con la API tradicional de Maps como respaldo (68bc98c).
- [P] Metas cuantificadas para fines de 2026 (3f7786d): +15 % de mercado, +10 % y +50 % de ingresos, 96 % de satisfacción, −23 % de mantenimiento, 99,9 % de disponibilidad. **"Automate Capabilities" desaparece** de las metas: la corrección de la nota del 16 se completa.
- [P] **ADR-0005 en borrador** (d21c24b, 15:10): motor de rutas personalizado **con cómputo en el borde (edge)**; la nube pura se descarta por latencia y conectividad.
- [P] 16:08: **nuevo diagrama de contenedores** en draw.io (8ba0904): Mobile App, API Gateway, Fleet Service, Ride Service, Payment Gateway, Price Service, MQTT, Event Backbone. **El servicio de ubicación ya no existe**; su trabajo lo absorbe Fleet Service. 16:38 se agrega User Service (d155c5f).
- [P] Escenarios: precios (4faf79d), consejo de rutas (3cb037a, "AI-enhanced Route Advice System"), reemplazo de baterías (91e0c8b, db92617). Documento de desafíos del negocio (a1cdcc0). Apéndice B de escenarios de IA (26cb316).

### Lunes 20: el día de los ADRs

- [P] 10:59–11:04: se agrega **"Risks & Trade-offs" a la plantilla** (4497171) y se completa en los ADRs 0001–0004 en cinco minutos (c0d4888, f7d0ef7, d27d2d2, 7dde15d, 0aa4148).
- [P] 13:10: **ADR-0007, Fleet Service como fuente única de verdad** (9ed6b7c): estado consolidado + motor de reglas (umbral de batería, geocercas); alternativas de estado distribuido descartadas.
- [P] 13:22–13:46: en 25 minutos, ADRs 0006 (conocimiento: BigQuery, Cloud Storage, Dataflow, RAG), 0008 (búsqueda vectorial), 0009 (registro de modelos), 0010 (Agent Builder, con prueba de concepto antes de adoptar), 0011 (evaluación continua) (7efdc58…6e54388). El 0006 nació como "ADR-0012" y se renumeró (db7f7e8).
- [P] 16:48: **ADR-0005 final** (620ac5e): **se invierte la decisión del borrador**. Ahora todo corre en la nube y se descarta el "Distributed Edge Processing" ("la latencia es tolerable"); se agrega un "Model Control Plane (MCP)" para gobernar modelos.
- [P] 20:39: **baterías y reubicación se unen** en un mismo circuito de operarios (9d430ad, "Add demand satisfaction as part of the maintenance routine"); el escenario pasa a llamarse "battery-replacement-and-fleet-allocation" (9b8463e).
- [P] 21:34: se crea un "ADR-0012 - MLOps" (a39ab11); 22:13 se borra (af76609); 22:28 renace como documento de diseño `hld/mlops/` (076f519). [I] El equipo decidió que MLOps no es una decisión puntual sino un diseño.
- [P] 23:08: ADR-0012 reutilizado para el **asistente híbrido** (b424c11).

### Martes 21: el mapa de capacidades, MoCoP y la visión artificial

- [P] README reorganizado: tabla "Business Capabilities" que une cada capacidad con su FR y su ADR (6d37ef2, e23cc76, d0b2a49, de687e4).
- [P] 18:30: ADR-0013, plano de control de modelos como **servicio administrado (SaaS)**, titulado "MCP" (fbab35b); 19:59 **renombrado "MoCoP"** (17db325). [I] Para no chocar con *Model Context Protocol*, que el equipo usa en el escenario de rutas (1b8d3be, 23:59: "Use MCP to get weather data").
- [P] MLOps expandido con evaluación de modelos combinados (acca6a5…428acd9).
- [P] 22:44: cuatro ADRs de visión y gobierno de datos (ac13ebd): 0014 limpieza, 0015 datos de entrenamiento y sesgo, 0016 human-in-the-loop, 0017 retención de fotos.

### Miércoles 22: lo híbrido, y el pronóstico por fin

- [P] ADRs 0018 (precios híbridos) y 0019 (mantenimiento híbrido) nacen como "[WIP]" (2339600, 3b33384) y se cierran esa noche (2526e17, f7906c2). ADR-0020 daños (cb192f8). ADR-0021, **ML simple sin IA generativa** para el consejo de carga (971a0c1).
- [P] 18:28: se borra la carpeta `sessions/` (31d6ccc).
- [P] 19:57: **primer diseño del pronóstico de demanda** (34760da). Es el último escenario en aparecer.
- [P] 21:32: narrativa del README (d81160a): *"First, … AI companion … Second, … feedback … Next, … battery … Then, … pricing … Lastly, … forecast demand"*. 21:46: "Shorten overview (with AI)" (49a9427).

### Jueves 23 (hasta la foto): consolidación

- [P] 00:03 local: **ADR-0022, pronóstico** (4b17796): Prophet por tipo de vehículo; escalar a ML si el MAPE a 24 h supera 30 % cuatro semanas seguidas; promedio móvil en ciudades nuevas hasta tener 3 meses de datos.
- [P] HLD de datos y analítica (891b14e), fuentes de datos (d363a83), ajustes de riesgos y conectividad.
- [P] 21:38–21:39: **consolidación del contexto de autos y camionetas**: se borran 3.206 líneas de requisitos separados (bc60c00) y otros archivos redundantes (78ca34f); lo esencial (tarifas, multas, verificación de devolución) pasa al Apéndice A (71648c7). README con "two-tier requirements organization" (16bf176).
- [P] 22:25: marketing con IA en "Future scope" (b697d8d).
- [P] 10-24 00:05–00:57 (+0300, es decir 17:05–17:57 ET del 23): pulido: imágenes renombradas, `main.png`, índices, `hld/mlops/README.md`. Último commit antes de la foto: **ebf6d83**.

### 24 de octubre al 6 de noviembre: silencio

- [P] Ningún commit. Coincide con el calendario: semifinalistas anunciados el 5 de noviembre. [I] El equipo esperó el resultado.

### 7 al 9 de noviembre: preparar la semifinal

- [P] 11-07: tabla de OKRs (bf8ece8).
- [P] 11-08: **guion del video para audiencia de negocio** con **cifras en blanco** ("__ % → __ %") y la idea de **"value-gated AI portfolio"**, fases 0–3 y "earn sooner, spend later" (87da42f, 3b1591c).
- [P] 11-09: narrativa de 5 minutos con cifras concretas (+32 % de utilización, 240.000 €/mes, etc.) (88bedef y ediciones); OKRs con "valores actuales" (0d45ed7…ce1b3ef); un video de clientes que en el repositorio quedó como archivo de 2 bytes (02f177b); la **presentación final en PDF** (02f177b, 23:13 +0200 = 17:13 ET, dentro del plazo de los videos).
- [P] `git diff ebf6d83 e930bcb --stat`: solo cambian `README.md`, `requirements/suggested OKRs/OKRs.md` y `video/`. **Ningún ADR, diagrama, FR o NFR cambió después de la foto.**

### 24 de noviembre

- [P] Insignia de ganador y enlace a la grabación de la final en Google Drive (e930bcb).

---

## 4. Lo que el equipo entendió primero, lo que cambió y lo que fue pulido

### Qué entendió primero
1. [P] Que había cuatro áreas de diseño con IA (precios, demanda, mantenimiento y, desde el 17, diálogo con el usuario) sobre un núcleo de alquiler que había que mantener (57b8370, 0d0036f).
2. [P] Que las dos primeras decisiones técnicas eran la nube y el canal con los vehículos (títulos de ADR del 16 a las 08:09).
3. [P] Que la IA no es una meta (nota en b7d92fb; desaparece de las metas en 3f7786d).

### Orden de las decisiones
GCP (10-16) → cadena impulsor-meta-solución (10-17) → herramienta por escenario (10-17) → MQTT + Pub/Sub, Vertex (10-18) → Gemini para mapas, metas cuantificadas, Fleet absorbe Location (10-19) → riesgos en cada ADR, Fleet como fuente única de verdad, pila de IA en GCP, rutas en la nube, baterías + reubicación, MLOps como diseño, asistente híbrido (10-20) → plano de control SaaS, visión con human-in-the-loop, retención (10-21) → precios y mantenimiento híbridos, ML sin IA generativa para carga, pronóstico (10-22) → escalera del pronóstico, datos y analítica, consolidación (10-23) → compuertas de valor y relato de negocio (11-08/09).

### Cambios de opinión probados
| Qué | Antes | Después | Evidencia |
| - | - | - | - |
| IA como objetivo | "Leverage AI for Optimization" en metas | Solo en la columna de soluciones | b7d92fb → 338c9ec → 3f7786d |
| Estado de los vehículos | Servicio de ubicación + servicio de flota | Fleet Service único, luego ADR-0007 | c9524d4, 446bf8a → 8ba0904 → 9ed6b7c |
| Alcance de la flota | Solo scooters y bicicletas | Cuatro tipos; autos y camionetas como contexto propio | c9524d4 → 1f9345c |
| Rutas con IA | Cómputo en el borde, nube descartada | Nube; borde descartado | d21c24b → 620ac5e |
| MLOps | ADR | Documento de diseño | a39ab11 → af76609 → 076f519 |
| Nombre del plano de control | "MCP" | "MoCoP" (salvo en ADR-0005) | fbab35b → 17db325 |
| ADRs | Sin riesgos | Tabla "Risks & Trade-offs" obligatoria | 1f2ae94 → 4497171 |
| Baterías y reubicación | Escenarios separados | Un circuito de operarios | 91e0c8b → 9d430ad |
| Contexto de autos y camionetas | ~3.200 líneas de requisitos propios | Fusionado en Apéndice A | 1f9345c… → bc60c00, 71648c7 |
| Relato | 5 escenarios, el asistente primero, pronóstico último | 3 casos de uso, pronóstico primero, compuertas de valor | d81160a → 87da42f, narrative.md, PDF |

### Pulido
Renombres de archivos y carpetas, índices del README, enlaces rotos, imágenes subidas por la web de GitHub (muchos commits "Update README.md" del 21 y del 24), "Shorten overview (with AI)" (49a9427).

---

## 5. Inconsistencias del repositorio (y qué fuente seguimos)

| # | Inconsistencia | Fuentes | Seguimos |
| - | - | - | - |
| 1 | Tamaño de flota: pliego 200 autos + 200 camionetas + 5.000 bicicletas + 5.000 scooters **por país**; supuestos del equipo "200 cars/vans, 500 bikes, 5,000 scooters" **por ciudad**; ADR-0022 usa "5,000/country" y "200/country"; la presentación final usa 500 eBikes | captions min 26; `4_Assumptions…` (eea5927); ADR-0022; PDF p. 2 | Pliego |
| 2 | Frecuencia de GPS: pliego "al menos cada 30 s"; supuestos "every 30 min"; ADR-0021 "IoT messaging is every 30 min only"; Apéndice A "every 30 seconds" | captions min 37; 5c155f1; ADR-0021; 71648c7 | Pliego (30 s) |
| 3 | Disponibilidad: metas 99,9 %; NFR_2 99,5 % para servicios críticos | `1_0_Business goals…`; `3_NFRs.md` | Se menciona sin cifra en el curso |
| 4 | RTO: ≤ 15 min (HLD de conectividad, README) contra ≤ 4 h (NFR_2) | `hld-vehicle-connectivity.md`; `3_NFRs.md` | No se usa |
| 5 | Retención de fotos: 90 días (NFR_7, Apéndice A 1-10) contra 180 días para originales (ADR-0017) | `3_NFRs.md`; ADR-0017 | ADR-0017 (más reciente y específico); no entra al curso |
| 6 | "MCP" significa *Model Control Plane* (ADR-0005) y *Model Context Protocol* (FR 2B, escenario de rutas, diagrama de baterías) | ADR-0005; `2_FRs.md`; diagramas | Se cuenta como cabo suelto (cap. 7) |
| 7 | ADR-0013 descarta un plano de control nativo de la nube ("Vertex AI, Bedrock, Azure AI") mientras 0003/0009/0010/0011 ponen Vertex en el centro | ADR-0013 vs. ADR-0003 | Se cuenta como cabo suelto (cap. 7) |
| 8 | NFR_7 aparece dos veces (Compliance y Observability) | `3_NFRs.md` | — |
| 9 | ADR-0018 cita al ADR-0010 para "evaluación de modelos" (es el 0011); ADR-0019 tiene una viñeta truncada ("Estimating even") | ADR-0018, ADR-0019 | — |
| 10 | Cifras del video: narrative.md "€78 → €60 por vehículo" y "refund rate 2.8 % → 1.4 %"; diapositivas "€117.1 → €79.08 cost/vehicle/month" y "46 % → 6 %"; compuerta "Abandonment … 63 % → 68 %" (sube, cuando debería bajar); OKRs "68 % → 6–8 %" | `video/narrative.md`; PDF pp. 6–7; `OKRs.md` | Ninguna: se presentan como proyecciones sin cálculo (cap. 8) |
| 11 | Supuesto "la app móvil ya existe" frente al pliego "greenfield completo" | `4_Assumptions…`; captions min 19 | Se interpreta: el equipo mantiene el núcleo (FR#1) y diseña la IA encima |
| 12 | README: "Adaptive Route & Ride Experience" enlaza al escenario de opiniones | `README.md` | — |
| 13 | El pliego (resumen del equipo) pone el ruteo de viajes fuera de alcance; el equipo diseña igual un "Trip Copilot". En los subtítulos, el anfitrión dice que planificar rutas es cosa de Google Maps "salvo que creas que algo debe estar en la app para resolver nuestros problemas", y antes había pedido que la app sugiera dónde dejar la bicicleta | captions min 23, 36 | Se cuenta como decisión defendible pero discutible; no se desarrolla |

---

## 6. Lo que falta

- **Cálculo de volumen.** No hay una cuenta de mensajes por segundo ni de tráfico; ADR-0002 dice "thousands to tens of thousands of devices". El curso hace la cuenta y la marca como propia.
- **Costos de infraestructura.** Solo la tabla de la narrativa del video (≈ 9.000 €/mes) y la de ROI de la diapositiva 8, sin supuestos ni cálculo.
- **Base de las cifras de negocio.** Metas (15 %, 23 %, 96 %), OKRs ("valores actuales" como 12.000 usuarios activos) y resultados del video no tienen origen en el repositorio; el pliego no dio economía.
- **Diagrama de contexto de toda la plataforma** (solo existe el de autos y camionetas) y diagrama de despliegue.
- **El video de la semifinal y la grabación de la final** no están en el repositorio (`two_customers_speaking.mp4` pesa 2 bytes; la grabación está en un enlace de Google Drive).
- **Proveedor del plano de control SaaS (MoCoP):** no se nombra.
- **Estado y fecha de cada ADR:** la plantilla no los tiene; la cronología sale solo de git.
- **Discusiones del equipo:** salvo la nota del 16 de octubre, no hay registro de debates. Las razones de los cambios (por ejemplo, el borde → nube del ADR-0005) se infieren comparando versiones.
- **Uso de IA en la escritura:** el README declara que partes se escribieron con herramientas de IA bajo supervisión humana, y un commit lo dice ("Shorten overview (with AI)"). Los documentos más largos (contexto de autos y camionetas, ADR-0022) tienen ese estilo. No cambia el análisis, pero explica parte del volumen.

---

## 7. Contrapunto del podio (uso puntual)

- **Nimrods (2.º):** la redistribución de vehículos la calcula un solver de optimización, **Google OR-Tools** (`docs/decisions/012-redistribution-optimizer-algo.md`), elegido frente a aprendizaje por refuerzo por ser específico para ruteo, con algoritmos probados y gratuito; la IA generativa se usa en un agente de despacho conversacional con aprobación del operador (`005-dispatch-agent-orchestrator.md`). Pronóstico con LightGBM (`011-forecast-model.md`). Contrasta con el ADR-0019 de Five Nines (rutas generadas por IA generativa + reglas) y con su escalera Prophet → ML.
- **Katainenmobility (runner-up):** "None of these models needs generative AI. It becomes relevant when we add a chatbot" (README). Útil para el capítulo 4, no se usa en la narración.
- **Kata-na (3.º):** reescribe el pliego con cifras propias presentadas como hechos (`PROBLEM_STATEMENTS/PROBLEM_STATEMENT.md`). Mismo problema que las cifras del video de Five Nines; no se usa en la narración.
