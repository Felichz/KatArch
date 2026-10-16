# Capítulo 6 · El vehículo correcto, en el lugar correcto

*Versión «lecture-style» híbrida (skill `guion-curso`). Gancho concreto (el último escenario del historial), pregunta y ruta en una frase, pasos con un caso que vuelve (las bicicletas del monumento), una sola pausa, cierre sobre el argumento. Sin opiniones del narrador. Los títulos no se dicen. [PAUSA] = silencio a propósito.*

---

## El último escenario

El miércoles veintidós de octubre, poco antes de las ocho de la noche, el equipo guarda un archivo nuevo con un mensaje corto: agregar el escenario de pronóstico de demanda. Faltaba un día para que los jueces tomaran la foto del repositorio. Los otros escenarios de inteligencia artificial, el análisis de lo que los usuarios escriben sobre el servicio, las rutas, los precios y las baterías, se habían dibujado entre el viernes diecisiete y el domingo diecinueve. Este llegó último, y su decisión de arquitectura se escribió pasada la medianoche.

Y es el problema del monumento, el que el cliente llamó su mayor desafío: las bicicletas que todos dejan junto al monumento famoso, mientras en el resto de la ciudad no queda ninguna. Con esas bicicletas volvemos a la primera pregunta del jurado, si la inteligencia artificial resuelve un problema real, ahora frente al que el propio cliente puso primero.

## Por qué llegó al final

Primero, lo que prueba el historial y lo que no. El pronóstico de demanda estaba en la tabla de requisitos desde el tercer día, con su herramienta asignada. Lo que llegó tarde fue su diseño propio. Por qué, no quedó escrito, y cualquier explicación sería una suposición. Lo que sí se ve es lo que anunciamos en el capítulo dos: el problema que el cliente puso primero nunca encabezó la lista del equipo. En la página principal del repositorio, el pronóstico quedó último hasta el día de la entrega.

## Las baterías, y de paso las bicicletas

La primera pieza que tocó el problema no venía del pronóstico, sino de las baterías. El circuito funciona así. El servicio de flota, el que guarda la versión oficial de cada vehículo, ve que la batería de un scooter bajó del umbral. Lo marca como no disponible, le avisa al cliente que termine su viaje, y crea un pedido de mantenimiento. Un modelo de aprendizaje automático estima el estado de esa batería, cuánta vida útil le queda, para decidir si se recarga o se reemplaza. Y una aplicación les dice a los operarios a dónde ir.

El lunes veinte por la noche, el equipo agregó algo a ese circuito: satisfacer la demanda como parte de la rutina de mantenimiento. O sea, el operario ya recorre la ciudad en su camioneta con baterías cargadas. De paso, recoge las bicicletas que sobran junto al monumento y las deja donde se van a necesitar. Para eso, alguien tiene que saber dónde se van a necesitar, y ahí entra el pronóstico.

## Qué es pronosticar la demanda

Pronosticar la demanda es predecir cuántos vehículos se van a pedir en cada zona y a cada hora. Es un problema de series de tiempo, es decir, de datos ordenados en el tiempo que repiten patrones. Las bicicletas y los scooters se piden más a la hora de ir y volver del trabajo, y casi nada cuando llueve o hace frío. Los autos y las camionetas tienen otro ritmo, con más pedidos los fines de semana. Y los eventos de la ciudad mueven todo de golpe.

El equipo no empezó por un modelo grande.

## Una escalera de dos peldaños

La decisión que el equipo escribió para el pronóstico propone una escalera. En el primer peldaño hay un modelo estadístico clásico, llamado Prophet. También aprende de los datos, pero es de los más simples de esa familia: separa la tendencia de los patrones por día, por semana y por feriados. Se pone en marcha rápido y se puede explicar, porque muestra cuánto pesa cada parte. Hay una instancia para scooters y bicicletas y otra para autos y camionetas, porque sus patrones no se parecen.

El segundo peldaño son modelos de aprendizaje automático más potentes y más difíciles de explicar. Para subir hay una condición escrita: que el error del pronóstico a veinticuatro horas supere el treinta por ciento durante cuatro semanas seguidas. Es la misma lógica de las bandas del capítulo anterior. Un número medible decide cuándo se gasta más, y no las ganas de usar la herramienta más nueva.

## Una ciudad sin historia

La escalera tiene un punto débil, y el equipo lo anotó en su tabla de riesgos. El día que MobilityCorp abra en una ciudad nueva, no va a haber reservas pasadas, ni un solo mes de datos. ¿Con qué pronóstico arrancarías?

[PAUSA]

El equipo propuso un promedio móvil, o sea, un promedio que se actualiza con los últimos días, hasta juntar tres meses de datos. Y mientras tanto, patrones prestados de zonas parecidas de otras ciudades, por ejemplo el comportamiento de los scooters. Sin historia, ni el modelo más sofisticado tiene de dónde aprender.

## Quién arma la ruta

Queda una pieza: con el pronóstico en la mano, ¿qué recorrido hace cada operario esa noche? En otra de sus decisiones, el equipo le encargó a la inteligencia artificial generativa armar las rutas con varias paradas y las instrucciones de cada tarea. Las reglas en código ponen los límites duros, como la cantidad de tareas por turno.

Aquí el diseño se aparta de la escalera de herramientas del capítulo cuatro. Calcular el mejor recorrido entre muchas paradas es un problema matemático conocido, y existen programas hechos para resolverlo, que se llaman solvers. El equipo Nimrods, el segundo puesto del mismo kata, eligió uno de ellos, OR-Tools de Google. La inteligencia artificial generativa quedó para conversar con el operario, que aprueba el plan.

## Las bicicletas del monumento

Con este diseño, las bicicletas amontonadas junto al monumento ya tienen un camino. El pronóstico dice dónde van a hacer falta mañana temprano, y el operario que pasa a cambiar baterías se las lleva. Si el pronóstico empieza a fallar, una condición escrita decide cuándo cambiar de modelo. El problema del monumento se diseñó al final, pero se diseñó con el mismo método que el resto: empezar por lo simple y escribir cuándo dejar de serlo.

Todas esas piezas descansan sobre el mismo proveedor, Google, y el anfitrión había advertido que los precios de la inteligencia artificial iban a subir.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| «Add demand forecasting scenario», miércoles 22 a las 19:57 (+0300); ADR-0022 a las 00:03 del 23 | 34760da; 4b17796 |
| Opiniones (17), rutas (18–19), precios (19), baterías (19) | b1f4b0e, 9fcd218, 3cb037a, 4faf79d, 91e0c8b |
| El pronóstico estaba en la tabla de requisitos desde el 17 (tercer día) | 0d0036f, 95046f0 |
| El repositorio no explica la demora | `HISTORIA.md` §6 |
| Circuito de baterías: Fleet Service marca no disponible y avisa; pedido de mantenimiento; modelo ML de vida útil (RUL) y estado de salud; app de los operarios | `hld/scenarios/battery-replacement-and-fleet-allocation/README.md` |
| «Add demand satisfaction as part of the maintenance routine», lunes 20 a las 20:39 | 9d430ad |
| Patrones: scooters y bicicletas en horas de ir al trabajo, poca demanda con lluvia o frío; instancias separadas de Prophet por tipo de vehículo | ADR-0022 |
| Los fines de semana para autos y camionetas | ADR-0022 («weekend leisure spikes») |
| Las bicicletas del monumento que el operario recoge de paso y lleva adonde harán falta «mañana a las ocho» | Ilustración del curso sobre el circuito de 9d430ad; el monumento es el ejemplo del cliente (subtítulos, min 13–14) |
| Escalar si el MAPE a 24 h supera 30 % durante 4 semanas seguidas | ADR-0022 |
| Arranque en frío: promedio móvil hasta 3 meses de datos; patrones prestados de zonas parecidas | ADR-0022, tabla de riesgos («Cold start») |
| Nimrods es el segundo puesto del kata | Podio oficial (`HISTORIA.md`, encabezado) |
| Las rutas con GenAI (paradas e instrucciones) y reglas para topes por turno | ADR-0019 |
| Nimrods: solver OR-Tools; GenAI en un agente de despacho con aprobación del operador | Nimrods `docs/decisions/012-…` y `005-…` (`HISTORIA.md` §7) |
