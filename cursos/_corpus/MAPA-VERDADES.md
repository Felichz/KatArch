# Mapa de verdades por repo (borrador, revisado)

Sale de las secciones 6 y 8 de las 12 fichas (`fichas/`) y de un cruce posterior por palabras clave contra el texto de las fichas (14 de octubre). Una marca significa que la ficha cita en ese repo un ADR o documento que sostiene la verdad; no mide cuán bien la ilustra. Las verdades son candidatas, no una lista aprobada.

| # | Verdad candidata | Repos | n | Notas de revisión |
|---|---|---|---|---|
| T0 | Se llega a la arquitectura por una cadena: requisito del negocio → pocas características de calidad → estilo y decisiones (y la cadena suele cortarse en el ADR) | BluzBrothers, Pragmatic, Pegasuz, Team 7, Data Alchemists, ArchColider, Archangels, Five Nines, ZAItects, monArch | 10 | Agregada en la autorrevisión del 14 de octubre: sale de la sección 5 de las fichas, que el mapa original no usaba. CELUS Ceals y ConnectedAI la tienen débil. |
| T1 | Empezar simple y escribir la condición medible que dispara el cambio (monolito modular → servicios, modelo gestionado → propio, fases) | Five Nines, ZAItects, ArchColider, CELUS Ceals, monArch, Pegasuz, Team 7 | 7 |  |
| T2 | Decidir qué se compra o contrata y qué se opera uno mismo, con una fachada propia hacia el proveedor, sabiendo qué cuesta cada lado | Pegasuz, Archangels, CELUS Ceals, ConnectedAI, Five Nines, ArchColider, ZAItects, Pragmatic, Data Alchemists | 9 | Revisión: ZAItects (ADR-007, híbrido), Pragmatic (ADR-007, LLM externos) y Data Alchemists (autogestionar Kafka y MongoDB para controlar costos) entran porque deciden comprar u operar, pero Data Alchemists va en sentido contrario al de la formulación original. |
| T3 | Diseñar el fallo y la entrega: colas persistentes, outbox/inbox, deduplicación, reintentos, vía manual | BluzBrothers, Pragmatic, ArchColider, CELUS Ceals, Archangels, Team 7, Data Alchemists | 7 | Sin verificar: ZAItects y ConnectedAI tienen menciones de reintento o failover que no revisé. |
| T4a | Dónde vive cada dato sensible y cuánto se guarda (retención, anonimización, cifrado, quién conserva qué) | Archangels, Team 7, Five Nines, BluzBrothers, Data Alchemists, ZAItects, Pragmatic | 7 | Revisión: antes iba junto con T4b y daba 9. Pegasuz no entra: lo que muestra es una contradicción entre documentos ("no guardar PII" frente a un servicio que sí la guarda). monArch solo lo menciona en el Readme, sin ADR. Data Alchemists dice en su ficha que el repo no muestra el cumplimiento de GDPR. |
| T4b | La seguridad es parte de la estructura: zero trust, capas, control de acceso dentro de la herramienta, acceso mínimo | ArchColider, ConnectedAI, ZAItects, Pragmatic, BluzBrothers | 5 | Revisión: separada de T4a. |
| T5 | Un dueño por dato: la base compartida acopla servicios, y partirla se hace por fases | Pragmatic, monArch, Team 7, Five Nines, ArchColider | 5 |  |
| T6 | El costo es un criterio de arquitectura y se estima con supuestos escritos | ZAItects, ArchColider, monArch, Pragmatic, Five Nines | 5 | Revisión: ConnectedAI mide el costo por modelo en su evaluación y Data Alchemists decide por costo, pero ninguno escribe una estimación con supuestos. Pragmatic sí (token-estimation.md). |
| T7 | Priorizar una característica es renunciar a otra: escribir qué se baja y validarlo con cifras | BluzBrothers, Data Alchemists, Pegasuz | 3 | Revisión: Five Nines solo lista 12 NFR sin decir a cuál renuncia, y ZAItects valida con horas pero no declara renuncias. Quedan tres firmes. |
| T8 | Con IA: reglas y datos propios alrededor del modelo donde hay dinero, sesgo o error inaceptable | Five Nines, Pragmatic, ZAItects, ConnectedAI | 4 |  |
| T9 | Con IA: evaluar el componente con varias métricas, antes de confiar en él | Five Nines, Pragmatic, ZAItects, ConnectedAI | 4 |  |
| T10 | Con IA: humano en el circuito con umbral de confianza y resultado por defecto seguro | Five Nines, ZAItects, Pragmatic | 3 | ZAItects deja el umbral sin valor. |
| T11 | Dejar escrito lo que queda fuera y lo que no se decidió, con su razón | BluzBrothers, Pragmatic, monArch, CELUS Ceals, Five Nines | 5 | Sin verificar: el cruce por palabras sugiere ArchColider, ConnectedAI, Data Alchemists, ZAItects, Archangels y Team 7, pero la búsqueda era ruidosa. |
| T12 | Las reglas de arquitectura se verifican con pruebas automáticas (fitness functions) | ZAItects, BluzBrothers, ArchColider, Archangels | 4 | Archangels solo las propone, sin implementarlas. |
| T13 | Los límites de los servicios salen del dominio (event storming, contextos, quanta), no de la tecnología | monArch, BluzBrothers, Pragmatic, Pegasuz, Archangels, Five Nines | 6 | Sin verificar: Team 7 habla de quanta 45 veces; falta leer si descompone por dominio. |
| T15 | Cómo se hablan las partes: síncrono donde hace falta la respuesta, asíncrono y con cola donde no; un adaptador por sistema externo | Pragmatic, Data Alchemists, Team 7, Pegasuz, CELUS Ceals, BluzBrothers | 6 | Agregada al revisar el lado de la demanda (14 de octubre). Sin verificar en los ADR originales. |
| T14 | La consistencia eventual y la atomicidad perdida se declaran como costo | monArch, Pegasuz, Five Nines, ArchColider | 4 | Revisión: Team 7 salió porque su ficha dice "escribir el estado antes de notificar", que es otra cosa. |

## Cuántas verdades toca cada repo

| Repo | n | Verdades |
|---|---|---|
| Five Nines | 11 | T1 T2 T4a T5 T6 T8 T9 T10 T11 T13 T14 |
| Pragmatic | 11 | T2 T3 T4a T4b T5 T6 T8 T9 T10 T11 T13 |
| ZAItects | 9 | T1 T2 T4a T4b T6 T8 T9 T10 T12 |
| ArchColider | 8 | T1 T2 T3 T4b T5 T6 T12 T14 |
| BluzBrothers | 7 | T3 T4a T4b T7 T11 T12 T13 |
| monArch | 6 | T1 T5 T6 T11 T13 T14 |
| Pegasuz | 5 | T1 T2 T7 T13 T14 |
| Archangels | 5 | T2 T3 T4a T12 T13 |
| CELUS Ceals | 4 | T1 T2 T3 T11 |
| Team 7 | 4 | T1 T3 T4a T5 |
| ConnectedAI | 4 | T2 T4b T8 T9 |
| Data Alchemists | 4 | T2 T3 T4a T7 |

**No usar este conteo para elegir repos.** Las marcas de Five Nines, Pragmatic, ArchColider y ZAItects salen de fichas que leí enteras, y las de los 7 repos restantes de leer solo sus verdades y rasgos distintivos. Eso sobrerrepresenta a los primeros. Además, una marca dice "el repo cita un documento que lo sostiene", no "es el mejor ejemplo". Elegir el repo que ilustra cada verdad exige comparar los ejemplos concretos, verdad por verdad. Un cálculo de cobertura mínima con estos datos elegía Five Nines casi solo, y por eso lo descarté.

## No entra en el mapa
- **Escribir el costo y las alternativas junto a cada decisión** lo hacen casi todos. Es una práctica de proceso: se enseña con el método de los ADR, no como verdad de arquitectura.
- **Las discrepancias entre documentos** aparecen en todos los repos (Pegasuz: 0,5 % de 1,6 millones son 8.000, no 100.000; ConnectedAI: un ADR "Proposed" que el despliegue ya da por hecho; Team 7: un ADR obsoleto cuyo mecanismo siguen usando otros).
- **Estructuras de datos para consulta** (grafo de monArch y de Archangels): solo 2 repos.

## Cuidado
- T8–T10 (IA) salen de 3 o 4 repos, todos de 2023 en adelante. Si el curso es sobre arquitectura en general, probablemente sean un módulo propio.
- Las notas "Sin verificar" son trabajo pendiente, no hallazgos.
