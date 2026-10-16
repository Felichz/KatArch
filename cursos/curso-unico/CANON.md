# Canon del curso: nombres, términos y hechos que las once lecciones comparten

Todas las lecciones se reescriben a la vez. Para que no se contradigan, usan **estos nombres, estas definiciones y estos hechos**. Si una fuente del corpus dice otra cosa, avisa en tu respuesta final en vez de cambiar el canon.

## 1. Nombres de los casos

En la narración se usa **solo el nombre del producto**, nunca el del equipo ni el del repositorio (nada de "Team 7", "ArchColider", "The Archangels", "monArch", "ZAItects", "BluzBrothers", "Pegasuz", "Data Alchemists", "CELUS"). Esos nombres van solo en la tabla de verificación.

| Producto | Qué es, en una frase (úsala la primera vez que entra en la lección) | Repositorio |
|---|---|---|
| **MonitorMe** (recurrente) | Un sistema para hospitales que muestra en la estación de enfermería los signos vitales de los pacientes y avisa cuando algo sale de rango. | BluzBrothers |
| **ClearView** (recurrente) | La plataforma de una organización sin fines de lucro que empareja currículums, anonimizados, con puestos de trabajo. | Pragmatic |
| **Sysops Squad** (recurrente) | El servicio de soporte técnico de una empresa de electrónica, cuyo sistema de tickets es un monolito viejo que pierde tickets y se congela o se cae seguido (el equipo cree que es por los picos de uso, pero la fuente no lo prueba). | Team 7 |
| **Farmacy Food** (recurrente) | Un servicio de comidas preparadas que se entregan en refrigeradores inteligentes. | ArchColider |
| **MobilityCorp** (recurrente) | Una empresa que alquila scooters, bicicletas, autos y camionetas eléctricos en Europa. | Five Nines |
| Spotlight (invitado) | Una plataforma para que organizaciones sin fines de lucro acerquen empleo a personas subrepresentadas. | Pegasuz |
| Farmacy Family (invitado) | Una comunidad de salud que mejora el sistema de Farmacy Food: perfiles personales y resultados médicos de sus clientes. | Archangels |
| Certifiable (invitado) | Una empresa que certifica arquitectos de software. | ZAItects |
| ShopWise (invitado) | Una tienda en línea con un asistente de inteligencia artificial. | ConnectedAI |
| Wildlife Watcher (invitado) | Cámaras en la naturaleza, con batería y sin internet estable, que se configuran desde una plataforma. | CELUS |
| Hey Blue! (invitado) | Una aplicación que acerca a policías y vecinos. | monArch |
| Road Warrior (invitado) | Un panel que reúne todas las reservas de viaje de una persona. | Data Alchemists |

Farmacy Family y Farmacy Food son casos distintos, de equipos distintos. Si una lección usa los dos, dice una vez cómo se relacionan (Farmacy Family es una mejora sobre el sistema de Farmacy Food).

## 2. Términos y la lección que los presenta

El espectador es un desarrollador con un par de años de experiencia que no conoce la jerga de arquitectura y **no puede pausar para buscar un término**. Un término o sigla se explica **en una frase simple la primera vez que aparece en la lección**, aunque otra lección ya lo haya presentado (si ya lo presentó una anterior, basta un recordatorio de pocas palabras). Esta tabla dice dónde se presenta por primera vez; el resto de las lecciones puede usarlos con recordatorio.

| Término | Lo presenta | Definición corta para usar |
|---|---|---|
| decisión de arquitectura, ADR | L1 | Una decisión sobre cómo se arma el sistema que cuesta mucho cambiar después; el ADR es el documento corto donde se deja escrita. |
| trade-off | L1 | Lo que se gana con una opción y lo que se paga a cambio. |
| monolito, microservicios | L1 | Monolito: todo el sistema en una sola pieza que se despliega junta. Microservicios: muchas piezas pequeñas que se despliegan por separado. |
| cualidad (característica de arquitectura) | L2 | Una propiedad que el sistema tiene que tener aparte de lo que hace: qué tan rápido responde, cuánto aguanta si algo falla, qué tan fácil es cambiarlo. Se dice "cualidad"; "características de arquitectura" solo una vez, como el nombre que le da la comunidad. |
| estilo de arquitectura | L2 | La forma general del sistema, por ejemplo un monolito o microservicios. Las pocas cualidades que mandan sirven para elegirlo. |
| tabla de estilos | L2 | La tabla que da puntos a cada estilo en cada cualidad. No se dice "hoja de estilos" (suena a CSS). |
| elasticidad / escalabilidad | L2 (elasticidad), L3 (escalabilidad) | Elasticidad: aguantar los picos de carga sin que se note. Escalabilidad: poder crecer en tamaño total. En MonitorMe quedó entre las tres la elasticidad; la escalabilidad quedó abajo. |
| síncrono / asíncrono | L6 | Síncrono: quien llama espera la respuesta. Asíncrono: quien llama deja el mensaje y sigue. |
| transacción, agregado | L5 | Transacción: un grupo de cambios que se guardan todos o ninguno. Agregado: el grupo de datos que se cambia siempre junto, dentro de una transacción. |
| quantum | L4 | El grupo de piezas que se llaman entre sí esperando respuesta y por eso se caen juntas. |
| outbox / inbox | L7 | Guardar el evento primero en la misma base y que otro proceso lo envíe (outbox) o lo procese (inbox). |
| estado de una decisión (propuesta, aceptada, reemplazada, rechazada, abierta) | L11 | Lo que dice si la decisión rige, cambió o sigue pendiente. |
| función de aptitud (fitness function) | L9 | Una regla sobre la arquitectura que se comprueba sola, como un test. |
| p95 | donde aparezca | "El 95 % de los casos". Nunca se omite cuando la fuente lo dice. |

## 3. Hechos corregidos que no se pueden volver a romper

Salen de verificar los guiones contra los repositorios. Si tu lección toca uno, usa esta versión.

1. MonitorMe: hasta **veinte pacientes por estación** y **quinientos por instalación**; respuesta media de un segundo o menos; si un dispositivo falla, el resto sigue funcionando. Los signos vitales tienen que ser lo más exactos posible porque hay vidas en juego (es otra frase del pedido).
2. MonitorMe eligió **tres** cualidades de nueve candidatas y siete prioritarias: evolutividad, rendimiento y **elasticidad** (no "que crezca"). La **escalabilidad** quedó abajo porque la carga máxima está definida y se agregan nodos a mano.
3b. MonitorMe: la **estación de enfermería** es una aplicación aparte que usa el sistema para mostrar los datos (`ADR-014`, Accepted: "not considered a core part of the architectural design"). Decir que el sistema "muestra los signos vitales en la estación de enfermería" es correcto como descripción del producto; cuando la lección habla de qué es parte del sistema y qué no, la estación queda fuera, junto con la aplicación del teléfono (`ADR-013`).
3. MonitorMe: el **registro de pacientes** queda dentro del sistema como subdominio de apoyo al que no se le presta foco. Lo que queda fuera son los **sensores**.
4. ClearView usa IA **solo para extraer rasgos** de currículums y puestos; el puntaje lo calcula código común.
5. ClearView: la seguridad es la primera de sus cualidades prioritarias, pero no está entre las tres que eligen el estilo (factibilidad, interoperabilidad, testabilidad).
6. ClearView: el currículum original solo lo guarda un servicio y **el servicio que empareja no tiene permiso para leerlo** (analítica sí lee directo de esa base). El ADR dice que esto "should be enforced" con permisos: se presenta como el diseño, no como algo verificado.
7. Farmacy Food: el pago se pide **al menos una vez**; el duplicado se descarta por identificador y versión; la espera al pagar se acepta. No es "ni demora ni duplicado".
8. MobilityCorp: la preautorización del pago ocurre **antes** de la transacción de la reserva; la transacción solo guarda la referencia de la preautorización.
9. MobilityCorp, fotos de vehículos: la decisión fija **180 días para las originales** (hasta dos años si hay disputa) y **90 para las copias de trabajo**; el requisito dice "fotos 90 días" sin distinguir y el diagrama cita la decisión para ese 90. El hueco es que el requisito no distingue clases y la decisión no dice que se aparta de él; no que "nadie explique".
10. MobilityCorp, modelo de daños: requisitos de precisión del 85 %, falsos positivos menores al 10 % y latencia de **cinco segundos o menos en el 95 % de las fotos (p95)**. El cambio a modelo propio se dispara por mAP por debajo de 0,75 a los tres meses, falsos positivos sostenidos sobre 10 % o latencia p95 sostenida sobre 5 s.
11. Los estados **Proposed** no se narran como decididos. Están en Propuesta: la mayoría de las decisiones de Farmacy Food (monitoreo, event sourcing, al menos una vez, pagos, stock de refrigeradores, catálogo), casi todas las de Sysops Squad (salvo una obsoleta), las de Hey Blue! sobre atomicidad, y la del monolito de Spotlight. Cuando una lección se apoya en una, dice "propone" o "la decisión queda como propuesta".
12. Farmacy Food: la fuente dice que **el cumplimiento de la privacidad local** queda como tema pendiente, no "el borrado".
13. CloudWatch: "treinta centavos de dólar por los primeros diez mil" (no "por cada métrica").
14. Sysops Squad "pierde **tickets**", no pedidos; "se congela o se cae seguido" es un hecho de la fuente, pero que sea por los picos de uso es lo que el equipo cree. La condición PCI es "puede tener que pasar una auditoría PCI", no "obliga".
15. Costos de Farmacy Food: son solicitudes de clientes por día (500, 1.000 y 10.000), no pedidos; los totales dejan fuera balanceador y transferencia, marcados "por definir".
16. Spotlight: "monolito modular al inicio y microservicios después" es una **propuesta** con dos condiciones (hay mercado y hace falta escalar), más la de costo.
17. Las cifras y las condiciones se dicen con su unidad y su percentil. "Sostenido", "p95" y "mAP" no se omiten cuando la fuente los trae.

## 4. Vocabulario

- Español neutro, tuteo, sin voseo ni regionalismos: **refrigerador** (no "heladera"), "estación de enfermería", "computadora".
- Una palabra por cosa: cualidad (no "característica" ni "atributo"), requisito (no "pedido" ni "frase" para lo mismo, salvo "el pedido del cliente" para el documento entero), rendimiento (no "velocidad" para lo mismo).
- "Pliego" no se usa: se dice "el pedido del cliente" o "los requisitos".
