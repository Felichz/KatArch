import type { Chapter } from '../types';
import { c, doc } from '../helpers';

export const costos: Chapter = {
  id: 'costos',
  number: 9,
  phase: 'La realidad económica',
  title: 'La factura anual',
  subtitle: 'Volumetría, tres escenarios de costo y por qué el monitoreo pago ganó.',
  minutes: 13,
  learn: [
    'Dimensionar un sistema con <strong>volumetría</strong>: el peso y la frecuencia de cada mensaje, antes de elegir servidores.',
    'Leer los tres escenarios de costo anual y explicar por qué <strong>diez veces más carga</strong> no costó diez veces más.',
    'Explicar por qué el monitoreo pago salió <strong>más barato que el gratis</strong>.',
    'Reconocer cuándo la misma vara dice <strong>construilo vos</strong>.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'La factura anual',
      blocks: [
        { t: 'p', html: 'Capítulo tras capítulo, el equipo eligió la opción simple. Acá se revisa el precio: la planilla de costos del equipo ganador, desde los bytes de un solo mensaje hasta la factura anual en tres escenarios de crecimiento.' },
      ],
    },

    /* ── la planilla ── */
    {
      id: 'planilla',
      kicker: 'La planilla',
      title: 'El único finalista que mandó la factura',
      visual: { scene: 'cost-scenarios' },
      describe: '<p>Tres filas, una por escenario de la planilla. Mínimo: 500 peticiones por día, 15 mil por mes, unas 0,006 por segundo. Crecimiento proyectado: 1.000 por día, 31 mil por mes, unas 0,012 por segundo. Crecimiento rápido: 10.000 por día, 310 mil por mes, unas 0,12 por segundo. Cada barra está sobre una pista que termina en una petición por segundo, la vara del capítulo 1.</p>',
      blocks: [
        { t: 'p', html: `De los diez finalistas del kata, solo el equipo ganador entregó un análisis de costos ${doc('cost-analysis')}: una planilla con el cálculo completo, medido como ${c('tco', 'TCO')}. No el precio de lista de cada pieza, sino el costo anual de tener todo funcionando.` },
        { t: 'p', html: 'Modela tres escenarios: <strong>500, 1.000 y 10.000</strong> peticiones de clientes por día. El tercero es el crecimiento rápido que te anunció el capítulo 1.' },
        { t: 'p', html: 'Miralos contra la vara del capítulo 1: hasta el crecimiento rápido queda en una décima de petición por segundo.' },
      ],
    },

    /* ── volumetría ── */
    {
      id: 'volumetria',
      kicker: 'Volumetría',
      title: 'Peso por frecuencia',
      visual: { scene: 'cost-volumetry', state: 'guess' },
      describe: '<p>La tabla de volumetría del equipo. Confirmar una orden: 0,2 kb, 1 a 3 por día por usuario. Catálogo completo sin imágenes: 500 a 700 kb, se baja una vez por día y vive 24 horas en el dispositivo. Stock de una heladera: 0,1 a 150 kb, con cada orden y por lote. Cancelar una orden: 0,1 kb, 2 a 5% de las órdenes. Despacho del día a una cocina: 20 a 50 kb, 0 a 2 por día por heladera. Review con foto: unos 4 MB; el 10% escribe reviews y el 5% registra un problema.</p>',
      blocks: [
        { t: 'p', html: '¿De dónde salen las cifras? De lo que el equipo llamó <strong>volumetría</strong>: para cada mensaje que viaja por el sistema, cuánto pesa y con qué frecuencia ocurre. El ancho de banda y el almacenamiento salen de esa tabla.' },
        {
          t: 'predict',
          question: '¿Cuál es el mensaje más pesado de todo el sistema?',
          options: [
            { label: 'La descarga del catálogo completo', feedback: 'Cerca: 500 a 700 kb, una vez por día. Pesado para un teléfono, liviano al lado del ganador.' },
            { label: 'El stock de una heladera', feedback: 'Entre 0,1 y 150 kb. Frecuente, pero chico.' },
            { label: 'Una review de cliente con foto', correct: true, feedback: '<strong>Exacto: unos 4 MB.</strong> El mensaje más pesado no lo genera el negocio. Lo genera un cliente quejándose con una foto.' },
            { label: 'El despacho del día a una cocina', feedback: '20 a 50 kb, como mucho dos veces por día por heladera.' },
          ],
        },
      ],
    },
    {
      id: 'habito',
      kicker: 'Volumetría',
      title: 'Bytes y frecuencias antes que servidores',
      visual: { scene: 'cost-volumetry', state: 'habit' },
      describe: '<p>La misma tabla, con dos grupos resaltados. El catálogo (500 a 700 kb, una vez por día) y las actualizaciones de stock de las heladeras (desde 0,1 kb) mantienen al día la copia del teléfono sin volver a bajarla. La review con foto, unos 4 MB, es por lejos la fila más pesada.</p>',
      blocks: [
        { t: 'p', html: 'El hábito que sirve para cualquier proyecto: dimensionar <strong>bytes y frecuencias antes de elegir servidores</strong>.' },
        { t: 'p', html: 'La tabla también justifica decisiones que ya viste: el catálogo se baja entero una vez por día y vive 24 horas en el dispositivo, al día gracias a mensajitos de stock, en vez de recargarse en cada pantalla.' },
        { t: 'p', html: 'Y la foto de 4 MB explica por qué los reviews entraron en el cálculo: la planilla cruda muestra que son, por lejos, el mayor consumidor de tráfico y almacenamiento.' },
      ],
    },

    /* ── los pronósticos ── */
    {
      id: 'base-datos',
      kicker: 'Los pronósticos',
      title: 'Unos 4 GiB de base de datos por mes',
      visual: { scene: 'cost-forecast', state: 'db' },
      evidence: { src: '/img/database_forecast.png', alt: 'La planilla del equipo: tipos de datos y pronóstico del tamaño de la base', caption: 'El pronóstico de base de datos en la planilla del equipo: 3,96 GiB por mes para 1.000 registros por día (30 mil por mes).' },
      describe: '<p>Crecimiento mensual de la base de datos para cuatro volúmenes. 500 peticiones por día, 15 mil registros por mes: 1,98 GiB. 1.000 por día, 30 mil registros: 3,96 GiB. 5.000 por día, 150 mil registros: 19,80 GiB. 10.000 por día, 300 mil registros: 39,61 GiB.</p>',
      blocks: [
        { t: 'p', html: 'Con la tabla en la mano, la planilla proyecta cuatro volúmenes: 500, 1.000, 5.000 y 10.000 peticiones por día.' },
        { t: 'p', html: 'En el escenario proyectado, 1.000 por día, unos 30 mil registros por mes ocupan <strong>3,96 GiB</strong> de base de datos por mes. Cifras diminutas, calculadas antes de elegir cualquier máquina.' },
        { t: 'p', html: 'Tocá cada columna para leer su volumen.' },
      ],
    },
    {
      id: 'trafico',
      kicker: 'Los pronósticos',
      title: 'El gigante escondido en el tráfico',
      visual: { scene: 'cost-forecast', state: 'traffic' },
      evidence: { src: '/img/traffic_forecst.png', alt: 'La planilla del equipo: pesos de los pedidos y pronóstico de tráfico mensual', caption: 'El pronóstico de tráfico en la planilla del equipo: 16,50 GiB por mes a 1.000 peticiones por día, casi todo en fotos de reviews y reclamos.' },
      describe: '<p>Tráfico mensual al lado del crecimiento de la base. 500 peticiones por día: 8,25 GiB. 1.000: 16,50 GiB. 5.000: 82,51 GiB. 10.000: 165,02 GiB. A 1.000 por día, 16,42 de los 16,50 GiB son fotos adjuntas a reviews y reclamos.</p>',
      blocks: [
        { t: 'p', html: 'El pronóstico de tráfico usa los mismos cuatro volúmenes. A 1.000 peticiones por día, el sistema mueve unos <strong>16,5 GiB</strong> por mes: cuatro veces lo que crece su base.' },
        { t: 'p', html: 'La causa no es el negocio. La planilla asume que el 10% escribe reviews y el 5% registra un problema, cada uno con una foto de 4 MiB. Esas fotos son 16,4 de los 16,5 GiB.' },
        { t: 'p', html: 'La volumetría encuentra estos gigantes antes de que lleguen a la factura.' },
      ],
    },
    {
      id: 'supuestos',
      kicker: 'Los pronósticos',
      title: 'Un estimado que se puede discutir',
      visual: { scene: 'cost-assumptions' },
      describe: '<p>Tres tarjetas. Tráfico uniforme: los 3,96 GiB son el extremo alto, la realidad podría ser hasta un 60% menor. Sin compresión: los 16,5 GiB están sin comprimir, y con GZIP bajarían de forma significativa. Base dimensionada a 12 meses: 1 TB fijo de DynamoDB cuesta 3.072 USD al año, casi lo mismo que todas las máquinas juntas, 3.115 USD.</p>',
      blocks: [
        { t: 'p', html: `La planilla sin pulir, además, deja sus supuestos a la vista ${doc('assumptions')}, y eso es un elogio, no un defecto.` },
        { t: 'p', html: 'Asume tráfico <strong>uniforme</strong> (“en la realidad el número podría ser hasta un 60% menor”), <strong>no contempla compresión</strong> (con GZIP bajaría bastante) y dimensiona la base a 12 meses: 1 TB fijo de DynamoDB a 3.072 USD al año, casi lo que todas las máquinas (3.115 USD).' },
        { t: 'callout', tone: 'note', title: 'Por qué importa', html: 'Un estimado que muestra sus supuestos se puede discutir. Uno que los esconde, no.' },
      ],
    },

    /* ── la factura ── */
    {
      id: 'diez-veces',
      kicker: 'La factura',
      title: 'Diez veces más carga, ¿cuánta más plata?',
      visual: { scene: 'cost-totals' },
      describe: '<p>Costo total del año 1 por escenario. Mínimo: 12.248 USD. Proyectado: 12.548 USD, unos 1.046 USD por mes. Crecimiento rápido, diez veces las peticiones del proyectado: 22.481 USD, 1,8 veces la factura proyectada. Una columna punteada muestra cuánto sería diez veces la factura proyectada si el costo creciera en proporción a la carga: 125.482 USD.</p>',
      blocks: [
        { t: 'p', html: 'La planilla suma todas las líneas de un año. Mínimo: <strong>12.248 USD</strong>. Proyectado: <strong>12.548 USD</strong>, unos 1.000 USD por mes para operar todo el negocio.' },
        {
          t: 'predict',
          question: 'El escenario rápido tiene diez veces las peticiones del proyectado. ¿Qué le pasa a la factura anual?',
          options: [
            { label: 'Crece unas diez veces, a ~125.000 USD', feedback: 'Así se vería un costo proporcional a la carga. La planilla dice otra cosa.' },
            { label: 'Crece unas cinco veces, a ~63.000 USD', feedback: 'Todavía muy alto: muchas líneas no dependen de la cantidad de peticiones.' },
            { label: 'Se queda en ~12.500 USD', feedback: 'No del todo: las máquinas, el almacenamiento de archivos y las colas sí crecen.' },
            { label: 'Ni siquiera se duplica: ~22.500 USD', correct: true, feedback: '<strong>Exacto: 22.481 USD.</strong> Diez veces la carga, 1,8 veces la factura.' },
          ],
        },
      ],
    },
    {
      id: 'lineas',
      kicker: 'La factura',
      title: 'A dónde va cada dólar',
      visual: { scene: 'cost-bill', state: 'explore' },
      evidence: { src: '/img/1y-min-tco.png', alt: 'Tres gráficos de torta: la distribución del costo anual en los escenarios mínimo, proyectado y de crecimiento rápido', caption: 'Las tres facturas anuales del equipo en tortas: mínima (en dólares), proyectada y de crecimiento rápido (en porcentajes).' },
      describe: '<p>Costo anual por servicio, con selector de escenario. Mínimo: DataDog 3.336 USD, Tableau 1.440, DynamoDB 3.072, EC2 3.115, Amazon MQ 508, SNS 366, S3 262, Kafka 139, VPN 9; total 12.248 USD. Proyectado: MQ 547 y S3 525; total 12.548 USD. Rápido: EC2 6.230, Tableau 2.880, MQ 1.203 y S3 5.245; total 22.481 USD. El balanceador de carga y la transferencia saliente figuran como TBD.</p>',
      blocks: [
        { t: 'p', html: 'Cambiá entre los tres escenarios. Las líneas son las mismas; solo algunas crecen.' },
        { t: 'p', html: 'En el escenario rápido las máquinas se duplican (8 instancias pasan a 16), Tableau se duplica y el almacenamiento de archivos en S3 crece veinte veces. La base, el monitoreo y los avisos no se mueven: la base ya estaba dimensionada para un año.' },
        { t: 'p', html: 'Por eso diez veces la carga no costó diez veces más: la arquitectura barata absorbe el crecimiento.' },
      ],
    },

    /* ── comprar o construir ── */
    {
      id: 'alquilado',
      kicker: 'Comprar o construir',
      title: 'El ítem más caro no es un servidor',
      visual: { scene: 'cost-bill', state: 'rented' },
      describe: '<p>La factura mínima con dos líneas resaltadas: el monitoreo de DataDog, 3.336 USD al año, y los reportes de Tableau, 1.440 USD. Juntos son el 39% de los 12.248 USD. Las máquinas, EC2, cuestan 3.115 USD.</p>',
      blocks: [
        { t: 'p', html: 'Mirá otra vez la factura mínima. El ítem más caro es el <strong>monitoreo</strong> (DataDog, 3.336 USD al año), seguido de los <strong>reportes</strong> (Tableau, 1.440 USD): juntos, cerca del 40% del presupuesto.' },
        { t: 'p', html: 'Sumale DynamoDB, y los servicios que el equipo alquila (7.848 USD) pesan más que todas las máquinas (3.115 USD).' },
        { t: 'p', html: 'Entonces, ¿por qué pagar herramientas que tienen alternativas gratis y open source?' },
      ],
    },
    {
      id: 'monitoreo',
      kicker: 'Comprar o construir',
      title: 'Software gratis, pagado en horas de desarrollo',
      visual: { scene: 'cost-compare' },
      describe: '<p>Monitoreo: DataDog, elegido, a 15 USD por servidor al mes como servicio gestionado; Grafana y el stack ELK, gratis y open source, descartados porque exigen mantenimiento propio. Reportes: Tableau, elegido, 1.440 USD al año en la tabla; Power BI, viable solo con suscripción Microsoft; KoolReport, la tercera opción. Con open source, el monitoreo se habría llevado entre 0,2 y 0,5 de un desarrollador.</p>',
      blocks: [
        { t: 'p', html: `Porque la opción “gratis”, montar herramientas open source en servidores propios, cuesta lo más caro que tiene un equipo chico: horas de desarrollo. El ${doc('adr-003', 'ADR 003')} lo estima en 0,2 a 0,5 de un desarrollador solo para cuidar el monitoreo.` },
        { t: 'p', html: 'Y no fue fe: compararon. Grafana y el stack ELK quedaron afuera por exigir mantenimiento propio; Tableau se midió contra Power BI y KoolReport.' },
        { t: 'decision', id: 'datadog' },
      ],
    },
    {
      id: 'privacidad',
      kicker: 'Comprar o construir',
      title: 'La misma vara, la respuesta opuesta',
      visual: { scene: 'cost-privacy' },
      describe: '<p>Dentro de la plataforma de Farmacy Food: la app del suscriptor manda reviews al módulo de feedback, construido en casa, junto a los perfiles de salud (diabetes, celiaquía, dietas). Afuera, las encuestas de terceros listas para usar aparecen tachadas, marcadas ADR 010, rechazado. La línea desde los perfiles de salud hacia ellas se corta en el borde de la plataforma.</p>',
      blocks: [
        { t: 'p', html: 'Con los reviews y las encuestas, la opción “comprada” también existía: encuestas web de terceros, listas para usar. Y aun así el equipo la rechazó.' },
        { t: 'p', html: `Farmacy Food maneja perfiles nutricionales y de salud, y esos datos no iban a terminar en servidores de terceros. El ${doc('adr-010', 'ADR 010')} registra la idea descartada, el porqué y lo que cuesta la alternativa propia.` },
        { t: 'decision', id: 'privacy' },
      ],
    },
    {
      id: 'leccion',
      kicker: 'Comprar o construir',
      title: 'El precio real incluye quién lo mantiene',
      visual: { scene: 'cost-yardstick' },
      describe: '<p>Dos tarjetas. Monitoreo: comprar cuesta 15 USD por servidor al mes, sin mantenimiento; construir es licencia gratis más 0,2 a 0,5 de un desarrollador. Veredicto: alquilar DataDog. Encuestas: comprar significa datos de salud en servidores de terceros; construir es más código propio, con los datos adentro. Veredicto: feedback propio.</p>',
      blocks: [
        { t: 'p', html: 'Dos decisiones, una sola pregunta: <strong>¿cuánto nos cuesta de verdad?</strong> En el monitoreo, lo gratis costaba horas de desarrollo, así que pagaron. En las encuestas, lo pago sacaba datos de salud afuera, así que construyeron.' },
        { t: 'callout', tone: 'warn', title: 'La lección de presupuesto', html: 'Comparar “gratis” contra “pago” mirando solo la factura mensual es el error clásico. El costo real de una herramienta incluye a quién la va a mantener. A veces el software pago es el más barato del mundo.' },
      ],
    },

    /* ── checkpoint ── */
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Cuatro preguntas antes de seguir',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: '¿Qué es la volumetría?',
              options: [
                'Contar cuántos servidores va a necesitar el sistema',
                'Medir los tiempos de respuesta en el pico de carga',
                'Anotar el peso y la frecuencia de cada mensaje, para derivar tráfico y almacenamiento',
                'Estimar cuántos usuarios se van a registrar en un año',
              ],
              answer: 2,
              why: 'Peso por frecuencia, mensaje por mensaje. El ancho de banda y el almacenamiento salen solos, y los costos dejan de ser adivinanza.',
            },
            {
              q: 'A 1.000 peticiones por día, ¿por qué el tráfico (16,5 GiB por mes) es cuatro veces lo que crece la base (3,96 GiB)?',
              options: [
                'Por las fotos de reviews y reclamos, de unos 4 MB cada una',
                'Porque el catálogo completo se baja en cada pantalla',
                'Porque las confirmaciones de orden se mandan varias veces',
                'Porque las heladeras mandan su stock cada segundo',
              ],
              answer: 0,
              why: 'Las fotos son 16,4 de los 16,5 GiB. El mensaje más pesado lo genera un cliente, no el negocio.',
            },
            {
              q: 'El escenario rápido tiene diez veces las peticiones. ¿Por qué la factura anual ni siquiera se duplica?',
              options: [
                'Porque AWS da grandes descuentos por volumen',
                'Porque el equipo sacó el monitoreo en ese escenario',
                'Porque cada foto se comprime con GZIP',
                'Porque muchas líneas, como la base y el monitoreo, no dependen del tráfico',
              ],
              answer: 3,
              why: 'Solo crecen las máquinas, el almacenamiento de archivos, las colas y los reportes. La base se dimensionó para un año desde el principio.',
            },
            {
              q: '¿Por qué el equipo pagó DataDog en vez de usar Grafana o ELK gratis?',
              options: [
                'Porque DataDog era la única herramienta que funciona en AWS',
                'Porque mantener las gratis se llevaba de 0,2 a 0,5 de un desarrollador',
                'Porque el cliente ya pagaba una licencia de DataDog',
                'Porque las herramientas open source no mandan alertas',
              ],
              answer: 1,
              why: 'Para un equipo chico, las horas de desarrollo son el recurso más caro. El software pago puede ser la opción más barata.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Repasá lo esencial antes de seguir.' },
        { t: 'p', html: 'Ya viste las decisiones del caso de a un capítulo, cada una con su precio. El próximo capítulo las pone todas en un solo mapa: las diez decisiones estructurales, agrupadas en tres pilares.' },
      ],
    },
  ],
};
