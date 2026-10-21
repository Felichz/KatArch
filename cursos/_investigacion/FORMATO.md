# Formato de la investigación por repositorio

Fase 1 (solo texto). Un archivo por repositorio en `cursos/_investigacion/texto/<Repo>.md`, con estas secciones en este orden. Las rutas de fuente son relativas a `katas-src/<Repo>/`.

## Reglas

1. **Solo lo que está en el texto del repositorio.** Cada hallazgo cita su archivo y línea. Si no puedes citarlo, no lo escribas.
2. **Marca cada afirmación:** `[DATO]` lo que el texto dice; `[DEDUCCIÓN]` lo que se infiere (di de qué); `[HUECO]` lo que el texto no dice o deja sin resolver.
3. **Sin juicios de elogio ni de desprecio.** Describe qué hizo el equipo, por qué lo dice que hizo, qué cuesta y qué evita. Si algo importa, di por qué en hechos.
4. **No inventes** cifras, nombres de ADR, alternativas ni razones. Si un ADR no declara alternativas, escribe "no declara".
5. **Imágenes: no se miran en esta fase.** Si el texto remite a una imagen que tiene contenido que hace falta (una tabla de puntajes, un diagrama de componentes, una comparación de precios), anótala en la sección "Imágenes para fase 2". No la describas.
6. **Lee todos los archivos de texto del repositorio** (ver el inventario). Nada de leer solo títulos ni resumir por encabezados.

## Secciones

### 1. El caso
Un párrafo: quién es el cliente, qué pide, el problema central, las restricciones duras (cifras, plazos, regulación, presupuesto). `[DATO]` con fuente.

### 2. Qué entregó el equipo
Lista de documentos principales: carpeta o archivo y para qué sirve, una línea cada uno. Cuenta de ADR, de requisitos, de diagramas. Si usan un método reconocible (C4, event storming, fitness functions, quanta, PrOACT, worksheets), dilo con fuente.

### 3. Decisiones
Una fila por ADR de decisión (incluye los que están rechazados, abiertos o reemplazados). No incluyas plantillas ni ADR sobre cómo usar ADR, pero dilo al final.

| ADR | Decisión (una frase) | Estado (tal como lo escribe, o "no declara") | Alternativas que nombra | Razón declarada | Costo o trade-off que admite | Requisito o cualidad que cita | Fuente |
|---|---|---|---|---|---|---|---|

### 4. Hallazgos para el curso
Cada hallazgo es una idea de arquitectura real que el repositorio muestra con sus hechos. Un hallazgo no es un ADR: un ADR puede dar varios hallazgos y un hallazgo puede juntar varios ADR. Formato de cada uno:

```
#### H<nn> · <título corto, en español>
- Idea: qué enseña sobre cómo se decide una arquitectura real (una o dos frases).
- Lo que hizo el equipo: hechos, con su decisión concreta.
- Razón declarada: lo que el texto dice que motivó la decisión, o "no declara".
- Costo o trade-off admitido: o "no declara".
- Alternativas que nombra: o "no declara".
- Estado: Accepted / Proposed / Denied / Open / no declara.
- Fuente: archivo:línea (y los archivos relacionados).
- Completitud: 
  - *completo*: la práctica entera está en el texto (qué se decidió, por qué, a qué costo, con qué alternativas).
  - *parcial*: falta una pieza que el texto no da; dilo cuál.
  - *ilustrativo*: muestra la idea pero sin decisión que la respalde.
- Contexto para contarlo: lo que el espectador tendría que saber antes (un caso, un término, una cifra). Lista corta.
- Depende de imagen: sí (archivo) / no.
- Verificado: [ ]  (lo marca el verificador, no quien extrae)
```

### 5. Lo que no tiene valor para el curso
Lista corta de lo que existe en el texto y no aporta a enseñar arquitectura real (por ejemplo, un formulario, un registro de costos de un proyecto, un procedimiento interno), con una razón por cada uno. Este registro sirve para que la fase de conjunto sepa qué ya se descartó y por qué.

### 6. Imágenes para fase 2
Lista de los archivos de imagen que el texto necesita para contar algo. Una línea cada uno: archivo, qué se espera que muestre, y el documento que lo cita.

### 7. Preguntas abiertas
Lo que el texto no permite decidir sin mirar imágenes, sin código o sin el resto del repositorio. Una línea cada una.

## Lo que el inventario muestra y el extractor marca

Cada repositorio tiene su inventario en `cursos/_investigacion/inventario/<Repo>.md`. Al leer un archivo de texto, el extractor marca `texto` en la columna "Leído" de esa fila. Las imágenes quedan sin marcar en fase 1.
