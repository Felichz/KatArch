# Cómo se hace un bloque: escribir, revisar con sombreros, producir

Este es el proceso de cada bloque del curso v2. Lo ejecuta Claude de punta a punta. Felix aprueba el guion revisado y después mira el video y comenta lo que encuentre; sus comentarios vuelven a entrar por el paso 3. El estado de cada bloque, cómo preparar una máquina y los comandos exactos de cada paso están en `README.md`; la API del kit de tiza, en `video/kit/TIZA.md`.

## El bucle: revisión → mejora

Cada etapa que produce algo (el guion, el guion visual, la animación, el render) termina en una revisión, y no se pasa a la etapa siguiente hasta que la revisión sale limpia:

1. Se hace la etapa.
2. Se revisa a mano con los sombreros que le tocan (abajo, en cada paso), una lectura por sombrero, con su lista de chequeo.
3. Lo que se encuentra se corrige en el momento, y se anota en la tabla de revisión de la etapa (qué se encontró, qué se decidió). Una lectura que no encuentra nada también se anota.
4. Se vuelve al punto 2 con una lectura seguida, de punta a punta, como espectador. Si encuentra algo, otra vuelta. Si no encuentra nada, la etapa está terminada.

Las vueltas quedan escritas en el archivo de la etapa (el guion o `IDEAL.md`): así el siguiente que trabaje en el bloque, en esta máquina o en otra, sabe qué se miró y por qué está como está. Si una corrección toca una etapa anterior (el guion visual descubre un error del guion), se corrige la etapa anterior, se anota allí, y se rehacen las que dependen de ella (narración, voz, tiempos).

Lo que no se decide en el bucle: lo que es de Felix (aprobar el guion, gusto, prioridades) y lo que toca producción o servicios compartidos. Ahí el bloque se detiene y se le pregunta.

## 0. Entrada

- `README.md`: en qué estado está el bloque y cuál es el siguiente paso.
- El bloque en `cursos/_investigacion/PLAN-CURSO.md`: qué enseña, el par de casos, la pregunta. Para los bloques del acto 2, además, "La forma de cada bloque" y la fila de su región (familias, par, pregunta que decide).
- `cursos/curso-unico/guion-v2/ACTO1-CONTINUIDAD.md` (o la nota de continuidad de su acto; para el acto 2 se crea `ACTO2-CONTINUIDAD.md` con el primer bloque del territorio): qué trae el espectador al entrar y qué casos y términos presenta este bloque. Si el bloque cambia algo de esa tabla, se actualiza la nota en el mismo paso.
- Los repos clonados (`node scripts/clone-katas.mjs`) para verificar.

## 1. Borrador

Sombreros: **guionista** escribe, con **diseño del aprendizaje** y **arquitecto senior** al lado.

- `guion-v2/NN-slug.md` (número y slug de `src/curso/curso.ts`) con escenas `## Título {#id}`, cada una con **Narración** (prosa, un párrafo por línea de voz) y **Visual** (anclas «al decir "…"»), y la tabla de verificación al final (`## Notas de verificación`: `guion-a-narracion.mjs` corta ahí).
- Se escribe con las reglas de `CLAUDE.md` ("Cómo queremos los guiones", "Carga cognitiva") y la gramática de `GUIA-VISUAL.md`.
- Si el bloque ya existe y está aprobado, el cambio va en `NN-slug.propuesta.md`.
- Bloques del acto 2: siguen las seis partes de "La forma de cada bloque" del plan (un caso que abre, el problema en una frase, las familias, el par, la pregunta que decide, el mapa que se actualiza). El material de la versión anterior está en los archivos que lista `README.md`; cuando el guion nuevo existe, el viejo se mueve a `guion-v2/v1/`. Los ejemplos de regiones nuevas se releen contra la fuente antes de escribir (`PLAN-CURSO.md`, "Verificación pendiente").

## 2. Revisión secuencial por sombreros

Una lectura por sombrero, en este orden. Cada lectura mira solo lo suyo, anota qué encontró y qué cambia, y aplica el cambio antes de pasar a la siguiente. Una lectura puede decidir no cambiar nada; también se anota.

| Paso | Sombrero | Qué mira |
|---|---|---|
| 1 | **Diseño del aprendizaje** | Lo que el bloque necesita y el espectador trae (la nota de continuidad); el par contrastado dicho en voz alta; una idea pesada seguida de una liviana; como máximo un caso nuevo cada dos minutos; cada ejemplo aporta algo nuevo. |
| 2 | **Arquitecto senior** | Que lo que se enseña sea arquitectura real y esté bien dicho: definiciones correctas, nada que un arquitecto corregiría, el nivel justo para un desarrollador con un par de años. |
| 3 | **Verificador** | Cada cifra, nombre, cita y estado (Proposed o Accepted) contra el archivo del repo; lo externo marcado como externo; lo que no se puede comprobar sale del texto narrado. |
| 4 | **Guionista** | Voz: frases de hasta 28 palabras, sin opiniones, años, calificativos, "no es X, es Y" repetido, tríadas, "o sea" de relleno; una fórmula como mucho una vez en el curso; los cierres no empiezan igual. |
| 5 | **Espectador de prueba** | Verlo una vez, sin volver atrás, sin conocer los casos: dónde se pierde, qué término no entiende, qué razón no se sigue, dónde se aburre. |
| 6 | **Dirección visual** | Que cada línea tenga imagen desde su primera palabra (sin pantallas vacías), una idea por pantalla, nada que muestre una pieza vacía como defecto, títulos que duran lo que tardan en leerse. |
| 7 | **Producción** | Ids de escena, anclas que siguen existiendo, escenas que salen o entran, duración estimada. |

Al final del guion queda la tabla "Revisión por sombreros" (paso, sombrero, qué encontró, qué se decidió). La revisión se hace a mano, leyendo: no hay scripts que la reemplacen.

### Lista de chequeo de cada sombrero

Sale de errores reales. Cada repaso (paso final) le agrega lo que se escapó.

**Diseño del aprendizaje**
- ¿Lo primero que ve el espectador en el curso se produce primero? (El bloque 1 se produjo antes que la apertura y arrancaba con un caso sin presentar.)
- ¿Algún caso, término o persona se usa antes de presentarse en este bloque o en uno anterior? Si el video puede verse suelto, ¿hay una frase que ubique al caso?
- ¿Hay una escena que presenta cosas que el bloque no usa? Es un temario: se va (la escena de los cinco casos).
- ¿Hay dos cifras para la misma idea que no hacen falta ("siete" y "nueve")?
- ¿Vuelve alguna idea de un bloque anterior, combinada con la nueva? Si existe la unión en el corpus, se dice.

**Arquitecto senior**
- ¿Cada cualidad está bien nombrada para la frase que la pide? (Seguir funcionando si falla un dispositivo es tolerancia a fallos, no disponibilidad.)
- ¿Dos elecciones del guion se justifican con lo mismo y se contradicen? (Elasticidad elegida y escalabilidad bajada, las dos por "sumar máquinas".)
- ¿Las definiciones dejan afuera algo esencial? (Las "cuatro cosas" del ADR sin la decisión misma.)
- ¿Un término de la industria que el espectador va a encontrar en los repos queda nombrado?

**Verificador**
- Abrir cada archivo de la tabla y buscar cada cita: literal, en su forma exacta (plural, encabezado de sección), con la ruta completa desde el repo.
- ¿Algún dato del texto narrado no tiene fila? ("En Europa" no estaba en el repo.)
- ¿Cada ADR citado tiene su estado? Lo Proposed se narra como propuesta.
- Lo externo (un libro, el conocimiento general) y lo que es lectura del curso tienen su fila, marcada así.
- Una frase con "cada", "todas" o "siempre": ¿es cierta para cada uno? ("MonitorMe le dedicó una decisión a cada cualidad que bajó": solo tres de seis tienen ADR; salió al escribir el guion visual, que obliga a dibujar cada una.)
- Lo que el guion visual muestra en pantalla (nombres de alternativas, cantidades, quién escribe qué) se verifica igual que lo narrado, en su propia tabla.

**Guionista**
- Leer en voz alta cada frase de más de unas 25 palabras.
- Buscar "no es X, es Y" y "no X, sino Y": como mucho uno por bloque.
- Buscar repeticiones de una expresión en el mismo minuto ("quien llega después").
- ¿Un pronombre ("lo", "eso") tiene antecedente claro?

**Espectador de prueba**
- Leer la narración seguida, sin la sección Visual, como alguien que no vio nada: anotar cada término, razón o caso que no se sigue.
- ¿Alguna razón depende de algo que se explica más adelante? ("Como sus servicios son pocos y grandes, podía hacerlo" necesita el bloque 4.)
- Con el video: verlo entero una vez, con audio, sin volver atrás.

**Dirección visual** (responde por "El nivel de todos los bloques" y "Pizarra y forma" de `GUIA-VISUAL.md`)
- ¿Cada escena tiene una forma que dice su idea (par, estrella, alcance, balanza, cadena…), o solo cajas con rótulos?
- ¿Una forma ya aprendida vuelve igual (misma disposición) cuando vuelve la idea?
- ¿El naranja marca una sola cosa por cuadro? ¿Lo que se paga va en ámbar y el rojo solo en la falla?
- ¿Cada pérdida o ganancia que dice la voz se ve pasando, o solo está escrita en una lista?
- ¿La cámara se acerca a la parte de la que se habla? ¿Hay algún cuadro con muchas piezas chicas mientras se habla de una sola?
- ¿Algún documento se muestra con texto para leer? Lo que importa sale de la hoja en grande.
- ¿El caso entra con su ilustración? ¿El bloque abre con "estás aquí"?
- ¿La cámara se acerca de más? Hasta unas 1,6 veces: se ve la parte nombrada y algo de lo que la rodea.
- ¿Un texto que sale de un documento tapa la ilustración o la pieza de la que habla?
- ¿Cada escena tiene imagen desde su primera palabra? Lo que aparece "al decir" una palabra avanzada deja la pantalla vacía hasta ahí.
- ¿Alguna pieza se muestra vacía y parece un defecto (franjas de un ADR sin contenido)?
- ¿Se lee el texto más chico a tamaño de pantalla normal? Prueba: la captura a la mitad de su tamaño (la hoja de contacto) se entiende y se lee.
- ¿Lo que importa llena al menos dos tercios del ancho o del alto? (El diagrama de ClearView ocupaba la mitad de la pantalla y sus rótulos no se leían en un portátil.)
- ¿Hay una hoja o un diagrama chico en medio de mucho fondo vacío?
- ¿Algún paso entre escenas pasa por una pantalla vacía en vez de convertir una pieza en la siguiente?
- ¿Algún título dura menos de lo que tarda en leerse?
- ¿Algún elemento fijo de la pantalla (el sello del caso, el rótulo de la esquina) tapa una pieza?
- ¿Un rótulo corto se parte en dos líneas porque la pieza es angosta o lleva ícono?
- ¿El texto chico contra el fondo de un documento tiene contraste suficiente?
- ¿Hay números o códigos en letra a mano? A la mitad de tamaño se confunden (el "9" de Caveat parece un "?"): van en tipografía limpia.

**Producción**
- ¿Cada palabra ancla sigue existiendo en la narración nueva? ¿Un ancla apunta a la primera aparición de una palabra que se repite en la línea?
- ¿Salió o entró una escena? Borrar su composición y sus voces.
- ¿Los elementos que crea el script usan clases globales (dg.css) y no las de la composición? ¿Alguna clase nueva choca con una global del kit (`.on`, `.pop`, `.card`)?
- Un cambio en el kit (`dg.css`, `dg.js`, `clearview.js`, `tiza.js`, `tiza.css`) toca todos los bloques: volver a mirar las capturas de cada bloque producido antes de renderizar. (La pasada de volumen convirtió a las personas en cajas.)
- En el kit de tiza: las animaciones `fromTo` llevan `immediateRender: false` (si no, todo lo que se va a dibujar aparece desde el primer cuadro); los rótulos no se centran con `transform` ni `translate`, porque GSAP los pisa al animar la posición (quedaban corridos hacia abajo); la letra a mano se recorta con un margen, porque sus colas salen de la caja.
- Un rótulo de tipografía limpia dentro de una caja chica: ¿queda centrado en la captura?
- Lo que hace visible una pieza va en un `set` (o en los dos lados de un `fromTo`), nunca solo en el valor inicial: el render salta entre cuadros y a veces no lo aplica. (El primer render del bloque 2 mostró notas como cajas negras sin borde, que en las capturas sueltas se veían bien.) Prueba: capturas en orden inverso (`--at 285,250,120,…`) antes de renderizar.
- Revisar el render, no solo las capturas: hoja de cuadros cada 5 s del MP4. Antes, comprobar que el MP4 tiene la hora del render: un render que falla (por ejemplo en la mezcla de audio) puede terminar sin error en la consola y dejar el video anterior. No correr otros `ffmpeg` ni renders mientras un render mezcla el audio.

## 3. Consolidar y aprobar

- Claude decide consolidando las siete lecturas: si dos chocan, gana lo que acerca al objetivo del curso.
- Se le presenta a Felix el resumen (la tabla) y el guion. Con su sí, la propuesta reemplaza al guion y la nota de continuidad queda al día.
- Los comentarios de Felix (sobre el guion o, más tarde, sobre el video) vuelven a entrar aquí: se trabajan punto por punto, pasando por el sombrero que corresponda, y se contesta qué cambió.

## 4. Producción

Sombreros: **dirección visual** y **producción**.

Los comandos de cada paso están en `README.md`, con la misma numeración.

1. **Narración:** `guion-a-narracion.mjs` → `video/bNN/narration.json`.
2. **Kit:** `sync-kit.mjs`.
3. **Voz de borrador y tiempos:** `voice-say.mjs` y `timing.mjs`. Desde aquí hay duraciones reales para el guion visual.
4. **El guion visual** (`video/bNN/IDEAL.md`, desde `video/kit/IDEAL.plantilla.md`), antes de animar, y con su propia revisión. El estilo "pizarra y forma" (`GUIA-VISUAL.md`) comunica con la forma y la estructura lógica de cada idea, así que primero se escribe en texto qué se dibuja y por qué tiene esa forma:
   - las formas del bloque (una tabla: forma, qué dice, dónde aparece);
   - por escena, **Entiende** (lo que el espectador se lleva), **Forma** (la figura que lo dice) y una tabla frase por frase con su duración y lo que se dibuja, anclado a palabras de la narración;
   - una tabla de verificación de lo que se dibuja (cada cifra, nombre o relación que aparece en pantalla, con su fuente; lo que es ilustración del curso, marcado así).
   Después se revisa ese texto con los siete sombreros, en vueltas (el bucle de arriba), hasta que una lectura seguida no encuentre nada; la tabla "Revisión del guion visual" queda en el archivo. Recién entonces se anima. Es el blanco fijo: después no se rebaja, y si cambia se anota por qué en "Cambios hechos al animar".
5. **Composiciones** ancladas a palabras, construidas desde `IDEAL.md`, con el kit de tiza (`video/kit/TIZA.md`). Si el bloque necesita una pieza que el kit no tiene (el mundo de un caso nuevo, el tramo del mapa del acto 2), se agrega en `video/kit/assets/tiza.js`, se corre `sync-kit.mjs` y se revisan las capturas de los bloques ya producidos.
6. **Comprobar:** `hyperframes check` sin errores; `snapshot` en los momentos de cada plano de `IDEAL.md`.
7. **Comparar** las capturas con `IDEAL.md`, plano por plano, con el sombrero de **espectador de prueba** y la lista de **dirección visual**. Las mismas capturas en orden inverso, para atrapar lo que solo se ve según el orden. Lo que no coincide vuelve al paso 5.
8. **Render** y su revisión: comprobar la hora y la duración del MP4, sacar la hoja de cuadros cada 5 s y verla entera, a la mitad de su tamaño, contra `IDEAL.md`. Llenar la tabla "Comparación con lo renderizado": ✓, o qué difiere. El bloque no se da por producido con planos sin ✓; si algo falla, vuelve al paso 5 y se renderiza de nuevo.
9. **Sitio:** `build-curso-data.mjs`, etapas del bloque en `src/curso/curso.ts` (`guion`, `visual` y `video` en `'listo'`; `voz` queda en `'borrador'` hasta la voz de producción), y prueba en el sitio local.
10. Lo que toca producción o servicios compartidos (voz de ElevenLabs, subir a R2, publicar) lo hace Felix.
11. Paso final: repaso y mejora (abajo). Al terminar, se actualiza la tabla de estado de `README.md`.

## 5. Paso final: repaso y mejora

Después de producir el bloque, y otra vez cuando llegue el QA de Felix sobre el video:
1. Ver el video entero, con audio, como espectador.
2. Anotar cada problema y qué sombrero debía haberlo visto.
3. Corregir el bloque (guion, composición o kit).
4. Agregar a la lista de chequeo de ese sombrero la pregunta que lo habría atrapado.
5. Si la corrección es del kit o de la gramática visual, revisar los bloques ya producidos.
