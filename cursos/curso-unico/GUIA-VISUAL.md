# Guía visual del curso

Cómo se ve el curso y por qué. La narración explica el porqué; la imagen muestra la estructura. Las dos van juntas y al mismo tiempo. Esta guía la usan el guion (cada escena dice qué se ve) y las composiciones de `video/chN/compositions/`.

## Principios (diseño del aprendizaje)

1. **Voz e imagen, no voz y texto.** En pantalla va un diagrama y, como mucho, unas pocas palabras clave. Nunca el guion escrito: el texto que repite la voz compite con ella por el mismo canal (Mayer, principio de redundancia).
2. **Al mismo tiempo.** Cada pieza aparece cuando la voz la nombra, ni antes ni después (Mayer, contigüidad temporal). La animación se ancla a palabras de la narración, nunca a segundos.
3. **Nada decorativo.** Lo que no ayuda a entender, estorba (Mayer, coherencia). Cada forma, color y movimiento significa algo; si no, se quita.
4. **Señalar lo que importa.** La parte de la que se habla se resalta; el resto baja de intensidad (Mayer, señalización).
5. **Construir de a poco.** Un diagrama nunca aparece entero. Se arma pieza por pieza, al ritmo de la voz.
6. **Una imagen central por idea.** La que el espectador tendría que poder dibujar después en una pizarra.
7. **Los pares, lado a lado y con la misma disposición.** Así salta a la vista lo que cambia.
8. **Mostrar el movimiento.** Lo que la animación hace mejor que una imagen fija: el mensaje que viaja, el que llega dos veces, la red que se corta, la parte que se separa.
9. **Dejar leer.** Una palabra en pantalla se queda al menos el tiempo de leerla (unas 3 palabras por segundo) y un poco más.

## El nivel de todos los bloques

Los principios de arriba se cumplen así en cada bloque. Responde la dirección visual al diseñar y al revisar las capturas; el espectador de prueba lo comprueba al ver el video. Una escena que no lo cumple no se da por terminada.

1. **Consecuencias, no listas.** Cuando la voz dice qué gana o qué pierde una decisión, la pantalla lo muestra pasando: dos servicios escriben el mismo dato y uno pisa al otro (integridad), la base cae y los servicios se apagan (una falla alcanza a todos), los datos se mudan pieza por pieza (cuesta cambiarla). La lista de texto queda, si queda, como rótulo corto al costado.
2. **Cámara.** Un diagrama grande no se muestra entero mientras se habla de una parte: la cámara se acerca a la parte nombrada y se aleja para mostrar el conjunto. Cada cuadro tiene una idea y se ve en tamaño grande. El texto más chico de un cuadro se lee a tamaño de pantalla normal.
3. **Documentos que no se leen en pantalla.** Un ADR o un requisito aparece como objeto reconocible (la hoja con sus franjas), sin párrafos. Lo que la voz destaca de él (la razón, el costo, el número del requisito) sale de la hoja en grande y se queda mientras se habla de eso.
4. **El mundo de cada caso.** Cada caso tiene una ilustración propia, del mismo estilo (`kit/assets/casos.js`), que aparece mientras la voz presenta el caso (no menos de dos o tres segundos) y después se achica hasta quedar como sello.
5. **Estás aquí.** Cada bloque abre con el mapa del curso (el camino del acto 1 y las diez regiones del acto 2, como en el sitio) y su lugar encendido, antes de la primera palabra.

## Pizarra y forma (el estilo del curso v2)

Desde el bloque 1 del curso v2, los videos se dibujan como en una pizarra, y cada idea se muestra con su forma.

- **Pizarra.** Fondo de pizarra oscura, trazo de tiza apenas irregular que se dibuja mientras habla la voz, y borrado con un barrido cuando una idea termina. Los nombres de las piezas van en tipografía limpia (Inter), para que se lean; las anotaciones van a mano (Caveat), cortas.
- **Forma.** Antes que cajas con rótulos, cada idea tiene una figura que dice su estructura: cuatro pares sueltos contra una estrella (una base por servicio contra una para todos), un círculo de alcance (hasta dónde llega un cambio), una balanza (lo que se gana sube lo que se paga), una cadena de hojas (una decisión pide la siguiente), todos con todos contra uno por dato (quién puede escribir). Una forma aprendida vuelve igual cuando vuelve la idea, y al generalizar el sistema concreto se reduce a su esqueleto delante del espectador.
- **El mismo esqueleto, una cosa distinta.** Para mostrar varias consecuencias de una decisión se repite la misma figura con la misma disposición y en cada una pasa una sola cosa; al final se juntan en una grilla como resumen.
- **Colores de tiza.** Blanco para lo que está; naranja para lo que la voz señala ahora, una cosa por cuadro; verde para lo que se gana; ámbar para lo que se paga; rojo solo para la falla.
- **El kit.** `cursos/curso-v2/video/kit/assets/tiza.js` y `tiza.css`.

## Cómo se ve un cuadro terminado

Las medidas que hacen cumplir las cinco reglas. Valen para cada cuadro del video, después de la cámara (lo que importa es el tamaño en pantalla, no el de la composición).

- **Lleno.** Lo que importa ocupa al menos dos tercios del ancho o del alto útil (1680 × 880). Si hay que ver el sistema entero, el sistema entero llena la pantalla; nunca un diagrama chico en el centro de mucho fondo.
- **Un protagonista.** Lo que la voz nombra ahora es lo más grande o lo único encendido del cuadro: naranja o con brillo, y el resto al 35 %. Nunca dos cosas compiten.
- **Texto que se lee en un portátil.** Rótulos de pieza de 32 px o más, palabras clave de 56 a 96 px, cifras de 120 px. Lo que no hay que leer (los renglones de una hoja) se dibuja como barras, no como letras chicas. Fuera de los rótulos, como mucho unas seis palabras a la vez.
- **Cambia con la voz, una cosa a la vez.** Algo cambia cuando la voz trae algo nuevo; mientras la voz desarrolla lo que ya se ve, el cuadro puede quedarse quieto. Como mucho un cambio cada dos segundos de voz: si una frase trae más, se elige lo que enseña y el resto se corta.
- **Nada sin motivo.** Cada plano dice qué entiende el espectador al verlo. Lo que no sirve a eso (un ícono simpático, un brillo, una figura que camina) se quita aunque se vea bien.
- **Sin cortes.** Entre escenas no hay pantalla vacía ni fundido a negro: una pieza de la escena que termina se convierte en la primera de la que empieza (las columnas se vuelven la balanza, la balanza se vuelve la hoja).
- **Profundidad de luz, no de forma.** El fondo tiene una luz suave detrás del protagonista; el resto, oscuro. Los diagramas siguen planos.
- **La prueba.** La captura vista a la mitad de su tamaño (960 × 540, como en la hoja de contacto) se entiende y su texto se lee. Si no, el cuadro no está terminado.

Cada bloque describe además su versión ideal, plano por plano, en `cursos/curso-v2/video/bNN/IDEAL.md`, antes de animar. Las capturas se comparan contra ese archivo (ver `cursos/curso-v2/PROCESO.md`).

## 2D, y dónde hay profundidad

- **Los diagramas son 2D, planos.** La arquitectura es abstracta: la profundidad no significaría nada, deformaría tamaños y taparía piezas.
- **Profundidad solo para acercarse:** pasar del sistema entero a una de sus partes, o de una parte a lo que tiene adentro, con un zoom que entra en la pieza (la pieza crece hasta ocupar la pantalla y su interior aparece).
- **Volumen solo para el mundo físico de los casos:** la nevera de Farmacy Food, la cámara de Wildlife Watcher, el vehículo de MobilityCorp, la pantalla de la estación de enfermería de MonitorMe. Una ilustración simple, con volumen suave, cuando se presenta el caso o cuando el fallo es físico. El diagrama que sigue vuelve a ser plano.

## Gramática visual

Las mismas formas significan lo mismo en todo el curso. El espectador aprende el idioma una vez.

### Piezas

| Pieza | Forma | Nota |
|---|---|---|
| Servicio o módulo | Rectángulo de esquinas redondeadas (radio 16), fondo `--surface3`, borde `--line-strong`, nombre centrado | Nombre en español corto ("Candidatos", "Emparejamiento") |
| Base de datos | Cilindro plano (rectángulo con tapa elíptica), fondo `--surface2` | Si es de un dueño, se dibuja pegada a su servicio |
| Cola | Tubo horizontal con bandas, borde verde `--evt` | Un mensaje la recorre como un punto |
| Stream de eventos | Banda larga horizontal con marcas verticales (un registro), verde `--evt` | Varios lectores leen desde puntos distintos |
| Gateway | Rectángulo angosto vertical, color `--cmp` (violeta), en el borde de una parte | Siempre en una frontera |
| Persona | Silueta simple (círculo y hombros), `--text2` | Con su rol debajo ("enfermera", "candidato") |
| Sistema externo | Rectángulo con borde punteado, fondo gris (`--surface`) | Lo que el sistema no controla |
| Frontera de una parte | Rectángulo punteado grande que encierra servicios, etiqueta arriba a la izquierda | Las partes que se despliegan y fallan juntas |
| Modelo de IA | Rectángulo con un hexágono como ícono, borde `--cmp` | Para distinguirlo de un servicio común |
| Documento (ADR, requisito) | Hoja con esquina doblada, fondo claro tenue | Sus partes se resaltan una a una |

### Conexiones

| Conexión | Trazo | Movimiento |
|---|---|---|
| Llamada síncrona (quien llama espera) | Línea continua azul `--cmd` con flecha | Un punto va y vuelve; mientras tanto, quien llama queda en pausa (un reloj chico encima) |
| Mensaje asíncrono (deja y sigue) | Línea a trazos verde `--evt` con flecha | Un punto va; quien lo mandó sigue (se ilumina otra vez enseguida) |
| Lectura de datos | Línea fina gris, sin animación | — |
| Conexión cortada | La línea se vuelve roja `--danger` a trazos y se parte en el medio | Los puntos se detienen en el corte |

### Color (significa, no decora)

- **Azul `--cmd`:** síncrono, espera.
- **Verde `--evt`:** asíncrono, eventos, mensajes.
- **Violeta `--cmp`:** bordes y modelos de IA.
- **Rojo `--danger`:** fallo, solo fallo.
- **Naranja `--accent`:** lo que la voz está señalando en este momento (resaltado), y las cifras importantes.
- El resto, en grises del tema.
- Los casos **no** tienen color propio: competiría con el significado. Cada caso tiene un **sello**: su nombre y un ícono chico arriba a la izquierda (refrigerador para Farmacy Food, corazón con pulso para MonitorMe, currículum para ClearView, auricular para Sysops Squad, scooter para MobilityCorp). El sello está en pantalla mientras se habla del caso.

### Estados de una pieza

- **Normal:** intensidad completa.
- **En segundo plano:** 35 % de opacidad. Lo que no se nombra en este momento.
- **Resaltada:** borde naranja `--accent` de 3 px y un brillo suave.
- **Caída:** borde rojo, ícono de rayo arriba a la derecha, contenido apagado.
- **Nueva:** aparece desde 90 % de tamaño y opacidad 0, en 0,4 s.

### Comportamientos animados (el kit los ofrece como funciones)

| Comportamiento | Qué se ve |
|---|---|
| `construir` | Las piezas aparecen una a una, ancladas a la palabra que las nombra |
| `viajar` | Un punto recorre una conexión de origen a destino (0,8 s por defecto) |
| `duplicar` | Dos puntos idénticos llegan al mismo destino, uno tras otro; el segundo se marca con "×2" |
| `cortar` | Una conexión pasa a roja y se parte; los puntos quedan detenidos |
| `caer` | Una pieza pasa al estado caída |
| `separar` | Una pieza o grupo se desplaza fuera de su frontera y aparece una frontera nueva alrededor |
| `enfocar` | Una pieza se resalta y el resto pasa a segundo plano |
| `entrar` | Zoom que entra en una pieza; su interior aparece |
| `comparar` | La pantalla se divide en dos mitades con la misma disposición; el par aparece lado a lado y lo que difiere se resalta en naranja |
| `cifra` | Un número grande en naranja con su unidad, al lado de la pieza a la que se refiere |

## Composición de la pantalla

- 1920 × 1080. Margen de 120 px a los lados y 100 arriba y abajo.
- El diagrama ocupa el centro. El sello del caso arriba a la izquierda. Una palabra clave, si hace falta, abajo al centro.
- Como máximo siete piezas visibles a la vez a intensidad completa. Si el diagrama tiene más, las que no se nombran pasan a segundo plano.
- Texto: piezas en 30 px, palabras clave en 44 a 56 px, cifras en 96 px. Una sola tipografía (Inter) y monoespaciada solo para identificadores y código.
- Flechas de izquierda a derecha y de arriba a abajo, en el sentido de lectura.

## El diagrama que crece: ClearView

ClearView abre y cierra el curso. Su sistema se dibuja una sola vez y cada bloque lo retoma y le agrega su parte, hasta que el cierre lo muestra completo. Disposición fija:

- **Izquierda:** personas (candidato, empleador).
- **Centro:** los servicios que comparten la base: Candidatos (guarda el currículum original), Empleadores, Historia (genera la versión anonimizada), Emparejamiento, Análisis. Debajo, la base compartida, con un candado en la tabla del currículum.
- **Derecha, arriba:** los modelos de lenguaje externos (sistema externo, con ícono de modelo).
- **Derecha, abajo:** el servicio de integración con los sistemas de recursos humanos, con un adaptador por sistema y la cola de reintentos; y fuera de la frontera, muchos sistemas externos de recursos humanos (se dibujan tres y "unos cien").
- **Abajo:** el registro de eventos de emparejamientos.

Los nombres exactos y las relaciones se comprueban contra `katas-src/Pragmatic/C4/` antes de animar.

## Cómo se escribe lo visual en el guion

Cada escena del guion trae, después de la narración, un bloque **Visual** con:
- **Imagen central** de la escena, en una frase.
- **Pasos**, cada uno anclado a una palabra o frase de la narración entre comillas: «al decir "nevera"» → qué aparece o qué se mueve, con las piezas y comportamientos de esta guía.
- **Al final de la escena**, qué queda en pantalla para la escena siguiente.

Las composiciones se construyen desde ese bloque. Si una escena no tiene imagen que aporte, lo dice ("solo el sello y la palabra clave") en vez de inventar decoración.
