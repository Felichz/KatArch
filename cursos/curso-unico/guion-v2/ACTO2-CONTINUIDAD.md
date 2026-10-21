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
