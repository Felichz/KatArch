import type { Chapter } from '../types';
import { c, doc, cmd, evt } from './helpers';

export const concurrencia: Chapter = {
  id: 'concurrencia',
  number: 6,
  phase: 'The design',
  title: 'The physical world',
  subtitle: 'Fridges, money and unreliable connections: three real problems, the solution the team designed for each one, and the pattern they share.',
  minutes: 16,
  learn: [
    'Explain why <strong>one actor per fridge</strong> makes locks unnecessary.',
    'Read a complete purchase in the alphabet of <strong>commands and events</strong>.',
    'Justify event sourcing, acknowledged queues, the 30-second window and the offline PIN as concrete trade-offs.',
    'Design for the <strong>rainy day</strong> too: the path when the hardware fails.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'The physical world',
      blocks: [
        {
          t: 'p',
          html: 'This is where the case stops being theory and becomes engineering against reality: two people buying the last meal at the same time, second thoughts with money involved, fridges with no signal.',
        },
      ],
    },
    {
      id: 'problemas',
      kicker: 'Three real problems',
      title: 'Where software runs into the physical world',
      visual: { scene: 'problems', state: 'intro' },
      blocks: [
        { t: 'p', html: 'Up to now, the system was designed as clean software. This chapter puts it up against what you can’t program: food that doesn’t teleport, money that can’t be lost and antennas that lose signal.' },
        { t: 'p', html: 'Three problems, in order: <strong>contention</strong> (the stock), <strong>evidence</strong> (the money) and <strong>autonomy</strong> (offline). Each one ends with something the team visibly chose to give up.' },
      ],
    },

    /* ── problem 1 ── */
    {
      id: 'ultimo-plato',
      kicker: 'Problem 1 · The last dish',
      title: 'Two people, one meal',
      visual: { scene: 'race' },
      describe: '<p>Ana and Beto use the app to buy the last lasagna in the gym fridge, in the same second. The tempting solution is to lock the stock in the database: while it serves Ana, Beto waits.</p>',
      blocks: [
        { t: 'p', html: 'There’s one lasagna left in the gym fridge. Two customers buy it from the app in the same second.' },
        { t: 'p', html: 'The temptation is to lock the database: “nobody touches the stock while I’m buying”. It’s the textbook answer, and it forces every purchase to wait for the one before it.' },
        { t: 'p', html: 'The team did something better, using a physical quirk of the business.' },
      ],
    },
    {
      id: 'actor',
      kicker: 'Problem 1 · The last dish',
      title: 'One actor per fridge',
      visual: { scene: 'actors', state: 'route' },
      evidence: { src: '/img/FF_concurency_order_processing.PNG', alt: 'Original order processing diagram with actors', caption: 'ArchColider’s original concurrency diagram: a router by location, one queue per fridge and one actor per fridge.' },
      describe: '<p>Customers in three locations (A, B and C) send orders to a router that reads the location. The router puts each order in its fridge’s queue: order A never enters queue B. Each queue feeds a single actor, which keeps its fridge’s stock in memory.</p>',
      blocks: [
        { t: 'p', html: 'The observation: <strong>a meal can’t jump from one fridge to another</strong>. Each fridge’s stock is a world of its own.' },
        { t: 'p', html: `So each fridge gets its own ${c('actor-model', 'actor')}: a process that handles that fridge’s purchases one at a time, in order. A router reads each order’s location and puts it in the queue it belongs to.` },
        { t: 'p', html: 'Look at the diagram: order A never enters queue B.' },
      ],
    },
    {
      id: 'sin-locks',
      kicker: 'Problem 1 · The last dish',
      title: 'No locks, because there’s no contention',
      visual: { scene: 'actors', state: 'serial' },
      describe: '<p>Ana and Beto are waiting in fridge A’s queue. The actor takes Ana’s order: stock goes from 1 to 0, purchase confirmed. Then it takes Beto’s: stock is 0, so he gets sold out. There were never two simultaneous writes.</p>',
      blocks: [
        { t: 'p', html: 'Inside the queue, orders are handled one at a time. If two people order the last lasagna, the first one gets it and the second gets a clean <strong>sold out</strong>.' },
        { t: 'p', html: 'There are never two simultaneous writes on the same stock, so locks are never needed. And since the stock lives in the actor’s memory, every decision is made at processor speed.' },
        { t: 'callout', tone: 'note', title: 'What they gave up', html: 'The stock isn’t protected with locks: the design <strong>removes the possibility</strong> of two writes competing.' },
      ],
    },
    {
      id: 'difusion',
      kicker: 'Problem 1 · The last dish',
      title: 'Every app finds out',
      visual: { scene: 'actors', state: 'broadcast' },
      describe: '<p>Two flows leave each actor: the order continues to payment processing, and the notice that the stock changed goes to the catalog. The catalog broadcasts a catalog updated event to all clients, which refresh their local copy.</p>',
      blocks: [
        { t: 'p', html: 'Two flows leave each actor. The <strong>order</strong> continues on to payment. And the notice that <strong>the stock changed</strong> travels to the catalog.' },
        { t: 'p', html: 'The catalog broadcasts it to every device, and each one refreshes its local copy. That way the sold-out lasagna disappears from the screens without anyone having to ask.' },
      ],
    },
    {
      id: 'local',
      kicker: 'Problem 1 · The last dish',
      title: 'One venue, several fridges',
      visual: { scene: 'venue' },
      blocks: [
        { t: 'p', html: 'Looking at the physical world surfaced a problem that a generic diagram doesn’t show: <strong>a venue can have several fridges</strong>. If a gym has three, what stock does the user see: one fridge’s, or the whole venue’s?' },
        { t: 'p', html: `Byte Technology’s API didn’t guarantee that sum, so the team wrote down the risk of having to implement it themselves, and recorded the question for the vendor ${doc('questions')}.` },
        { t: 'callout', tone: 'info', title: 'An architect’s habit', html: 'When a system depends on an external API you don’t control, those questions get written <strong>before</strong> the code.' },
      ],
    },

    /* ── problem 2 ── */
    {
      id: 'evidencia',
      kicker: 'Problem 2 · The money',
      title: 'The complaint about a wrong charge',
      visual: { scene: 'ledger' },
      describe: '<p>The same order stored two ways. In a traditional table, the status gets rewritten: created, reserved, paid, and only the last value remains. In an event log, every fact is appended with its timestamp. When a complaint comes in, only the event log can show what happened and when.</p>',
      blocks: [
        { t: 'p', html: 'A business that handles food and money is going to get complaints. The question isn’t whether they’ll come, but <strong>what evidence exists</strong> when one does.' },
        { t: 'p', html: `The team’s answer was ${c('event-sourcing', 'Event Sourcing')}: record every order as an immutable sequence of events, instead of a state that gets erased and rewritten.` },
        { t: 'decision', id: 'event-sourcing' },
      ],
    },
    {
      id: 'cola',
      kicker: 'Problem 2 · The money',
      title: 'The message that can’t be lost or duplicated',
      visual: { scene: 'ackqueue' },
      describe: '<p>The order leaves a charge message with a unique id in a queue. The queue delivers it to the payment service and doesn’t delete it until it gets an acknowledgment. If a retry delivers the same message again, payments recognizes the id and discards it: no double charge.</p>',
      blocks: [
        { t: 'p', html: `The message “charge this order” can’t be lost (money would be lost) or processed twice (the customer would be charged twice). That’s what a ${c('message-queue', 'message queue')} with acknowledgments and unique ids is for.` },
        { t: 'decision', id: 'rabbitmq' },
        { t: 'p', html: `A fine detail from the internal docs ${doc('concurrency')}: every aggregate has a <strong>version number</strong>, so two concurrent writes to the same order are detected without locks.` },
      ],
    },
    {
      id: 'rechazo',
      kicker: 'Problem 2 · The money',
      title: 'The flip side: when the payment fails',
      visual: { scene: 'refused' },
      evidence: { src: '/img/IM_cancel_order_by_payment_system.png', alt: 'Original diagram: order canceled by the payment system', caption: 'The flip side of the flow, in the original information model diagram: MealStockCanceled restores the stock and OrderPurchaseRefused notifies the user and reporting.' },
      describe: '<p>The gateway refuses the charge or the attempt times out. The system order emits MealStockCanceled, which returns the meal to the catalog, and OrderPurchaseRefused, which notifies the user and feeds reporting. The app offers to retry the last order.</p>',
      blocks: [
        { t: 'p', html: 'The team also diagrammed what happens if the payment provider <strong>refuses</strong> the charge or the attempt times out.' },
        { t: 'p', html: `The reserved stock is restored on its own (${evt('MealStockCanceled')}) and the user gets the refusal notice (${evt('OrderPurchaseRefused')}). Nothing is left half-done.` },
        { t: 'p', html: 'And since the order history lives on the device for about a month, the refusal turns into a button: retry the last order with one tap.' },
      ],
    },
    {
      id: 'alfabeto',
      kicker: 'The alphabet',
      title: 'Blue promises, green reports',
      visual: { scene: 'purchase' },
      evidence: { src: '/img/IM_meal_purchase.PNG', alt: 'Original information model diagram: buying a meal step by step', caption: 'The instant purchase in ArchColider’s information model diagram, with the same alphabet: blue for commands, green for events.' },
      describe: '<ol><li>Start Order: a local command on the phone.</li><li>Confirm Order by User: a command that crosses over to the server.</li><li>MealStockReserved: an event, the meal has been set aside.</li><li>MealStockUpdated: an event broadcast to every device.</li><li>OrderPurchased: an event, the purchase is confirmed.</li></ol>',
      blocks: [
        { t: 'p', html: 'Before the next tactic, here is the complete flow of a normal purchase. Every message is one of two types:' },
        {
          t: 'cards',
          cards: [
            { title: 'Command', tag: 'blue', html: `What someone <strong>wants</strong> to happen. It can fail. E.g.: ${cmd('Confirm Order by User')}.` },
            { title: 'Event', tag: 'green', html: `What <strong>already happened</strong>, and everyone listens. It’s history. E.g.: ${evt('OrderPurchased')}.` },
          ],
        },
        { t: 'p', html: 'Step through the purchase in the diagram. Notice the dotted boundary: before it, everything is cheap and local; after it, everything gets recorded. The green events are exactly the ones the event store never deletes.' },
      ],
    },
    {
      id: 'ventana',
      kicker: 'Problem 2 · The money',
      title: 'The 30 seconds that save a refund',
      visual: { scene: 'window' },
      evidence: { src: '/img/IM_cancel_order_by_user.PNG', alt: 'Original diagram: the user cancels the order inside the window', caption: 'Cancellation inside the inhibition window, in the original diagram: no arrow reaches the payment gateway.' },
      describe: '<p>Simulator: when a purchase is confirmed, the order is held in memory for a window of up to 30 seconds. If the user cancels inside the window, the stock goes back to the catalog and the gateway never finds out: zero fees. If the window runs out, only then is the payment invoked, and canceling after that means a real refund with two fees.</p>',
      blocks: [
        { t: 'p', html: `The case’s own numbers ${doc('info-models')} say that <strong>2% to 5% of orders get canceled right away</strong>: impulse purchases the user regrets almost immediately.` },
        { t: 'p', html: 'If each one reaches the gateway, the business pays a charge fee and then a refund fee, for the same meal.' },
        { t: 'p', html: 'The solution copies email’s “undo send”: the order is <strong>held for 10 to 30 seconds</strong> before the payment is invoked. Try it in the simulator.' },
      ],
    },

    /* ── problem 3 ── */
    {
      id: 'sin-senal',
      kicker: 'Problem 3 · No signal',
      title: 'The basement fridge',
      visual: { scene: 'offline', props: { correct: 2 } },
      describe: '<p>A fridge in a hospital basement loses its cell signal. A customer who already paid arrives to pick up their lunch. The fridge can’t reach the cloud.</p>',
      blocks: [
        { t: 'p', html: 'The fridges depend on a cellular connection. A fridge in a hospital basement can lose signal right when a customer arrives to pick up a lunch they already paid for.' },
        {
          t: 'predict',
          question: 'The customer paid, the meal is inside and the fridge can’t talk to the cloud. How would you give them their meal without opening the door to fraud?',
          options: [
            { label: 'Open the door for anyone while there’s no signal', feedback: 'It solves the hunger and opens the door to fraud: anyone can take anything.' },
            { label: 'Ask them to wait until the signal comes back', feedback: 'The customer paid and goes without lunch: exactly what the requirement “Maximizing guarantee of a meal picking up by user” is there to prevent.' },
            { label: 'Have the fridge validate something it received before the outage', correct: true, feedback: '<strong>That’s the idea.</strong> Prepare the validation while there’s signal, so the cloud isn’t needed at pickup time.' },
            { label: 'Send someone from support to open it', feedback: 'It works once. It doesn’t scale to 68 locations at lunchtime.' },
          ],
        },
      ],
    },
    {
      id: 'pin',
      kicker: 'Problem 3 · No signal',
      title: 'A PIN the fridge already knows',
      visual: { scene: 'pinprepare' },
      describe: '<p>While there is signal, the platform generates a one-time PIN for each delivery and sends it to the customer’s phone and to the fridge’s local memory.</p>',
      blocks: [
        { t: 'p', html: 'The team’s solution: <strong>PIN codes generated in advance</strong>, one per delivery, sent to the customer’s phone and to the fridge’s memory while there’s still signal.' },
        { t: 'p', html: 'The docs keep a record of how the idea evolved: first they considered generic “access codes” and dropped them as cumbersome. The 6 to 8 digit PIN tied to each meal was the final simplification.' },
      ],
    },
    {
      id: 'retiro',
      kicker: 'Problem 3 · No signal',
      title: 'Try it: pick up without the cloud',
      visual: { scene: 'pinpickup' },
      describe: '<p>Offline, the customer types their PIN on the fridge. The fridge validates it against its local memory, unlocks the door and stores the pickup. When the signal comes back, it reports the pickup to the cloud. A wrong PIN is rejected and can be retried.</p>',
      blocks: [
        { t: 'p', html: 'With no signal, the fridge validates the PIN against its memory, opens, and <strong>reports the pickup when it gets its connection back</strong>.' },
        { t: 'p', html: 'The codes are also stored on the phone: if something fails, the user doesn’t get stuck in a retry loop.' },
        { t: 'decision', id: 'pin-offline' },
        { t: 'p', html: 'Remember the row “Maximizing guarantee of a meal picking up by user” in the traceability table? This is where it ends up.' },
      ],
    },
    {
      id: 'jedis',
      kicker: 'Problem 3 · No signal',
      title: 'The same door, a different trust model',
      visual: { scene: 'trust' },
      blocks: [
        { t: 'p', html: 'The counterpoint from the podium: <strong>Jedis</strong> solved the same door a different way.' },
        { t: 'p', html: 'Their fridge module creates a “purchase session” before opening the door, with the identity from the card or the app token. If the customer takes a meal that isn’t theirs, an alarm goes off.' },
        { t: 'p', html: 'Compare them: one keeps the identity in a code shared in advance; the other, in a session opened on the spot.' },
      ],
    },
    {
      id: 'catalogo',
      kicker: 'Problem 3 · No signal',
      title: 'The catalog in your pocket',
      visual: { scene: 'pocket' },
      evidence: { src: '/img/IM_meal_stock_update.PNG', alt: 'Original diagram: CatalogUpdated and MealStockUpdated events broadcast to all users', caption: 'The original sync: events broadcast “for all users” to refresh each device’s catalog.' },
      describe: '<p>The phone browses a locally stored catalog: instant and available without signal, though maybe a little stale. The server broadcasts change notices with only the catalog’s id and location. At payment time, the phone checks the real stock with the server.</p>',
      blocks: [
        { t: 'p', html: 'The same pragmatism shows up in the app: the catalog lives on the phone (instant, available without signal) and the real stock is checked <strong>only at payment</strong>.' },
        { t: 'p', html: 'To keep the local copy from going stale, the server broadcasts a notice every time something changes. The notice says <em>what</em> changed instead of carrying the whole catalog: each device downloads what it needs when it needs it.' },
        { t: 'decision', id: 'catalog-cache' },
      ],
    },
    {
      id: 'pragmatismo',
      kicker: 'Pragmatism',
      title: 'A spreadsheet and a map',
      visual: { scene: 'partition' },
      blocks: [
        { t: 'p', html: 'That way of thinking reaches the smallest decisions too. Synchronize promotional campaigns between operators with distributed consistency algorithms? Unnecessary: promotions rarely change, they’re managed <strong>in a spreadsheet</strong>, and the system only consumes the final result.' },
        { t: 'p', html: 'And the whole data model rests on an observation about the physical world: <strong>ghost kitchens in Detroit won’t offer meals in New York City</strong>. Catalogs, stock and orders are partitioned by city, which simplifies access, consistency and costs in one stroke.' },
      ],
    },

    /* ── rainy day ── */
    {
      id: 'dia-nublado',
      kicker: 'The rainy day',
      title: 'When the meal gets stuck',
      visual: { scene: 'journey' },
      evidence: { src: '/img/user-journey-error.png', alt: 'Original journey: the subscriber cannot pick up their meal', caption: 'The team’s original journey, “Subscribed User Cannot Pick Up The Meal”, with a lane for each actor and system.' },
      describe: '<ol><li>The subscriber enters their code on the fridge.</li><li>If the code isn’t valid, they retry.</li><li>The code is valid, but the meal gets physically stuck.</li><li>The subscriber takes a photo from the app and files a complaint.</li><li>An administrator reviews and approves the complaint.</li><li>The ordering system creates a new order or a coupon.</li><li>A notification tells the subscriber their complaint was approved.</li></ol>',
      blocks: [
        { t: 'p', html: 'All the previous diagrams show the “sunny day”: the user orders, pays, picks up, happy.' },
        { t: 'p', html: 'The team also diagrammed the rainy day: the meal gets <strong>physically stuck</strong>, the user has already paid and no software can push the tray. The way out is human: a photo, a review by an administrator, compensation.' },
        { t: 'callout', tone: 'info', title: 'The missing half', html: 'The <em>happy path</em> is half of the design. The other half is in the journeys where the hardware fails, the signal drops or the user changes their mind, and that half also gets diagrammed before anyone writes code.' },
      ],
    },
    {
      id: 'patron',
      kicker: 'The pattern',
      title: 'Accept physical reality instead of fighting it',
      visual: { scene: 'problems', state: 'recap' },
      blocks: [
        { t: 'p', html: 'Every solution in this chapter does the same thing. Fridges will lose signal: design for it. Data will arrive late: design for it. Complaints will come: keep the evidence.' },
        { t: 'callout', tone: 'note', title: 'The pattern', html: 'Mature architecture doesn’t eliminate real-world problems: <strong>it is ready for them when they arrive</strong>.' },
      ],
    },
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Four questions before you move on',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'Why doesn’t the system need to lock the database to protect the stock?',
              options: [
                'Because the stock never changes during the day',
                'Because each fridge has an actor that processes its orders one at a time',
                'Because the fridge charges before opening the door',
                'Because it uses a faster database',
              ],
              answer: 1,
              why: 'A meal doesn’t jump between fridges: one queue and one actor per fridge make simultaneous writes on the same stock impossible.',
            },
            {
              q: 'A customer disputes a charge. Which decision guarantees there is evidence of what happened?',
              options: ['Caching the catalog on the phone', 'Event sourcing: every order as an immutable sequence of events', 'The offline PIN', 'Partitioning the data by city'],
              answer: 1,
              why: 'The event log is never erased: the current state is rebuilt from it, and the full history stays available for auditing.',
            },
            {
              q: 'What does the 10 to 30 second window before charging save?',
              options: ['Network traffic', 'The charge and refund fees of impulse cancellations', 'Database space', 'Cooking time'],
              answer: 1,
              why: 'The 2% to 5% of orders canceled right away are handled in memory: the gateway never finds out.',
            },
            {
              q: 'How does a customer pick up their meal if the fridge has no signal?',
              options: ['They can’t: they wait for the signal to come back', 'With a PIN generated in advance that the fridge validates locally', 'A cashier opens the door for them', 'The fridge opens for anyone'],
              answer: 1,
              why: 'The validation is prepared while there is signal; the pickup is reported when the connection comes back.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials of the chapter before moving on.' },
        { t: 'p', html: 'The open question: <strong>what about the subscriber, who ordered for the whole week?</strong> Their full cycle, with the same alphabet of commands and events, is the next chapter.' },
      ],
    },
  ],
};
