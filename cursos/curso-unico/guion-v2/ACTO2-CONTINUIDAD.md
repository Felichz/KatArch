# Acto 2 · Qué sabe el espectador al entrar a cada bloque

Nota de diseño del aprendizaje para el territorio (bloques 6 a 15). Cada bloque tiene la misma forma (un caso que abre, el problema en una frase, las familias en el mapa, un par de ganadores, la pregunta que decide y el mapa que se actualiza) y como mucho cuatro familias por región. Si un bloque necesita algo que no está en su fila de "trae", lo explica él mismo.

Al entrar al acto 2 el espectador ya conoce: el concurso, ClearView (y su base compartida), MobilityCorp, MonitorMe, Farmacy Food, Farmacy Family, Sysops Squad y Spotlight; los términos decisión de arquitectura, trade-off, ADR, cualidad, renuncia con su condición, estilo, monolito, microservicios, por eventos, monolito modular, interfaz, autenticación y autorización, quantum, nueves de disponibilidad.

| Bloque | Trae al entrar | Casos nuevos | Términos nuevos | Pieza de ClearView que queda |
|---|---|---|---|---|
| 6 · Guardar datos | lo del acto 1 | ninguno | relacional, series de tiempo, grafo, almacenamiento de archivos, persistencia políglota, dueño de un dato | un escritor por dato |
| 7 · Mover y procesar | lo anterior | ninguno | llamada que espera, disparar y olvidar, cola, stream, lotes por calendario | (ninguna: el mapa se actualiza) |
| 8 · Dónde corre | lo anterior; las copias duplicadas de MonitorMe (bloque 2) | ShopWise | máquina virtual, contenedor, orquestador, plataforma gestionada | (ninguna) |
| 9 · El borde | lo anterior; la interfaz como puerta de entrada (bloque 5); autenticación y autorización | Wildlife Watcher | borde, gateway, backend para el frontend, GraphQL, REST, dirección firmada | (ninguna) |
| 10 · Cuando algo falla | lo anterior; el refrigerador con memoria (bloque 8); la cola (bloque 7); Farmacy Family (bloque 5) | ninguno | código de retiro, segundo camino, cola de fallidos, duplicado, bandeja de salida y de entrada | la cola de reintentos |
| 11 · Identidad y datos sensibles | lo anterior; la decisión de fotos de MobilityCorp (bloque 1); facturación aislada (bloques 5 y 9) | ninguno | proveedor de identidad, fachada, cifrado, clave, retención | el candado del currículum |
| 12 · Ver qué pasa | lo anterior; ShopWise (bloque 8); el analizador de MonitorMe (bloques 2 y 10) | ninguno | latido, registro, métrica, traza, alerta, salud del negocio | (ninguna) |
| 13 · Comprar, construir y crecer | lo anterior; la fachada de identidad (bloque 11); el gateway (bloque 9) | ninguno | núcleo, código abierto, modelo gestionado, modelo propio, premisa | (ninguna) |
| 14 · IA en el sistema | lo anterior; modelo gestionado y propio (bloque 13); ShopWise (bloques 8 y 12) | Certifiable | sesgo, rasgo, banda de confianza, índice de ejemplos, fidelidad, relevancia | la IA fuera de la decisión |
| 15 · Cambiar sin romper | lo anterior; la cola de reintentos de ClearView (bloque 10); Certifiable (bloque 14) | ninguno | integración continua, infraestructura como código, interruptor, sombra | el caché rechazado |
| 16 · Cierre | todo lo anterior; el dibujo de la apertura | ninguno | ninguno (vuelve "premisa", del bloque 13) | todas las piezas, en el mapa |

## Revisión unificada (lectura seguida de los bloques 3 a 16)

Se leyeron las narraciones en orden y se buscaron frases de cinco palabras repetidas en tres bloques o más, muletillas, frases de más de 28 palabras, años y términos usados antes de definirse.

| Qué apareció | Dónde | Qué se decidió |
|---|---|---|
| "En esta región la pregunta…" abría la escena final de diez bloques | 6 a 15 | Queda solo en el bloque 6; los demás abren distinto ("Para decidir dónde corre…", "En el borde, lo que hay que contestar…", "Frente a cualquier falla posible…", etc.) |
| "El costo/precio está escrito/anotado" como frase suelta antes de cada costo | 6, 7, 8, 9, 10, 11, 12, 14 | Cada una con otra forma, atada a lo que cuesta ("Borrar así tiene un costo", "El precio de comprarlo es que…"); se conservó la palabra a la que se ancla la animación |
| "asíncrono" sin definir | 10 y 16 | "no espera la respuesta" |
| Dos frases de más de 28 palabras | 16 | Partidas en dos |
| "y esto es lectura nuestra" | 5, 11, 13 | Se mantiene: marca una inferencia, como pide el criterio de voz |
| "Hay cuatro familias. La primera…" | 8 a 15 | Se mantiene: es la forma fija del acto 2 y el mapa la acompaña en pantalla |

Herramienta nueva: `cursos/curso-v2/tools/anclas.mjs` comprueba que cada ancla `W(línea, 'palabra')` exista en la narración después de cambiar un guion. Después de esta revisión, todas existen.
