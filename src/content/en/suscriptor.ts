import type { Chapter } from '../types';
import { c, doc, cmd, evt } from './helpers';

export const suscriptor: Chapter = {
  id: 'suscriptor',
  number: 7,
  phase: 'The design',
  title: 'A meal’s journey',
  subtitle: 'From the calendar to the fridge: the subscriber cycle as events.',
  minutes: 13,
  learn: [
    'Explain why the team kept the subscription as a <strong>schedule</strong> instead of creating every future order up front.',
    'Follow a scheduled meal through its commands and events, <strong>from the calendar to the fridge</strong>.',
    'Explain why an order only becomes available when <strong>the fridge confirms it</strong>.',
    'Read the cancellation of a scheduled order as a <strong>two-message refund</strong>.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'A meal’s journey',
      blocks: [
        {
          t: 'p',
          html: 'The previous chapter ended with an open question: what about the subscriber, who orders for the whole week? This chapter follows one of their meals from the calendar to the fridge, and back again when they change their mind.',
        },
      ],
    },

    /* ── the loose end ── */
    {
      id: 'cabo',
      kicker: 'The loose end',
      title: 'The customer who went missing',
      visual: { scene: 'sub-ladder' },
      describe: '<p>Three steps of a ladder: the occasional user (kiosk, cash), the known user (app and card) and, highlighted at the top, the subscriber (prepaid weekly menu). Arrows show the conversion the business wants. Below: 1,000 subscribers by the end of the year, at about 10 meals a week each, is about 10,000 meals a week.</p>',
      blocks: [
        { t: 'p', html: `Chapter 1 introduced three kinds of users, and the business wanted one above all: the <strong>subscriber</strong>, who prepays a weekly menu. Its first business driver asks to turn occasional users into known ones, and known ones into subscribers ${doc('business-drivers')}.` },
        { t: 'p', html: 'The goal was <strong>1,000 subscribers</strong> by the end of the year, at about 10 meals a week each. Yet every diagram so far showed an instant purchase.' },
        { t: 'p', html: `So how does a subscriber’s food physically arrive? The team worked it out end to end ${doc('user-scenarios')}.` },
      ],
    },

    /* ── the idea ── */
    {
      id: 'idea',
      kicker: 'The idea',
      title: '“IDEA!!!”: the subscription is born',
      visual: { scene: 'sub-idea', state: 'draw' },
      evidence: { src: '/img/whiteboard-subscriber-idea.png', alt: 'Original “IDEA!!!” whiteboard: a user with an account, a fridge with meals and a row of prepaid days', caption: 'The team’s original whiteboard: the moment the subscription is invented, with a prepaid menu by day (1d, 2d, 3d) and loyalty points.' },
      describe: '<ol><li>A stick figure with an account tag and a “+1” over its head: the user with an account.</li><li>A fridge with five available meals, A to E.</li><li>Arrows 2 and 3 go from the user to two meals, with a $ sign: choose, reserve and pay.</li><li>Arrow 1 goes to a row below the fridge: prepaid day slots 1d, 2d, 3d, labeled “+ loyalty points” and “subscribed menu”.</li></ol>',
      blocks: [
        { t: 'p', html: 'The repository even keeps the moment it was born: a whiteboard scribble titled “IDEA!!!”.' },
        { t: 'p', html: 'A user with an account, a fridge with its available meals, and below it something new: <strong>a row of prepaid day slots</strong> (1d, 2d, 3d) that also add <strong>loyalty points</strong>.' },
        { t: 'p', html: 'Step through the drawing: it goes from the user, to the fridge, to that row at the bottom.' },
      ],
    },
    {
      id: 'dos-filas',
      kicker: 'The idea',
      title: 'Two rows: the present and the committed future',
      visual: { scene: 'sub-idea', state: 'rows' },
      evidence: { src: '/img/whiteboard-subscriber-idea.png', alt: 'Original “IDEA!!!” whiteboard: a user with an account, a fridge with meals and a row of prepaid days', caption: 'In the original, the loose meals sit in the fridge on top and the prepaid days in a separate row below.' },
      describe: '<p>The same whiteboard, read as two rows. On top, the fridge with its available meals: the present, chosen and paid on the spot. Below, the prepaid slots by day: the committed future, paid ahead, which adds loyalty points.</p>',
      blocks: [
        { t: 'p', html: 'The drawing splits into two rows. On top, the loose meals: what’s in the fridge today, chosen and paid on the spot. Below, the <strong>prepaid menu, by day</strong>: a future the customer has already paid for.' },
        { t: 'p', html: `The requirements say the same ${doc('business-drivers')}: the subscriber forms a weekly menu, prepaid, and sets a pickup time. And planned purchases earn loyalty points.` },
        { t: 'callout', tone: 'note', title: 'Why it matters', html: 'That bottom row is where this whole chapter comes from: scheduling, dispatch, pickup and refunds.' },
      ],
    },

    /* ── the schedule ── */
    {
      id: 'materializar',
      kicker: 'The schedule',
      title: 'Where does a month of lunches live?',
      visual: { scene: 'sub-tradeoff', state: 'ask', props: { correct: 1 } },
      describe: '<p>A subscriber prepaid four weeks of lunches: a grid of twenty weekday slots, each one a future order marked with a question mark. Where should they live until their day comes?</p>',
      blocks: [
        { t: 'p', html: 'A subscriber prepays four weeks of lunches: twenty future meals. Each one will end up as a real order that a kitchen cooks and a fridge delivers.' },
        {
          t: 'predict',
          question: 'Until their day comes, how would you store those twenty orders?',
          options: [
            { label: 'Create all twenty orders now, each with its date', feedback: 'The team weighed it: processing gets simple, because every order already exists. The catch shows up when the menu changes.' },
            { label: 'Keep the menu as a schedule and generate each day’s orders', correct: true, feedback: '<strong>That’s what the team chose.</strong> The menu is a logical structure, and every day new orders come out of it.' },
            { label: 'Have the subscriber confirm each order the day before', feedback: 'That brings back exactly what scheduling was meant to remove: repetitive ordering.' },
            { label: 'Hand the whole list to the kitchen and let it keep it', feedback: 'The kitchen is an external system the team doesn’t control. The subscriber’s promise can’t live there.' },
          ],
        },
      ],
    },
    {
      id: 'agenda',
      kicker: 'The schedule',
      title: 'A schedule that generates each day',
      visual: { scene: 'sub-tradeoff', state: 'compare' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Original information model: preparing scheduled orders', caption: 'The trade-off is written next to this diagram in the team’s information models: orders up front, or a schedule that generates them.' },
      describe: '<p>Two panels. A: all twenty orders created up front; changing the menu from week 2 means hunting down and rewriting fifteen of them. B: a menu that generates today’s order every morning, marked as prepaid; changing the menu is a single change.</p>',
      blocks: [
        { t: 'p', html: `The team left the trade-off written down ${doc('info-models')}. Creating every order up front makes processing simple, but it bloats the order base, and every change or cancellation means many updates.` },
        { t: 'p', html: 'Generating each day’s orders from the menu makes changes cheap. Change the menu in the diagram and compare.' },
        { t: 'callout', tone: 'note', title: 'What they gave up', html: 'Generated orders must be <strong>marked as prepaid</strong>: an extra rule for payments, perhaps handled with a special “subscriber” promo campaign.' },
      ],
    },

    /* ── from calendar to fridge ── */
    {
      id: 'manana',
      kicker: 'From calendar to fridge',
      title: 'Every morning, a list for the kitchen',
      visual: { scene: 'sub-cycle', state: 'morning' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Original information model: preparing scheduled orders', caption: 'The team’s original diagram: GetScheduledOrders (1) and PrepareOrders (2) start the day.' },
      describe: '<ol><li>The scheduler sends GetScheduledOrders to the system order, which answers from a projection.</li><li>The scheduler sends PrepareOrders to the ghost kitchen, once a day: the list of what to cook.</li></ol>',
      blocks: [
        { t: 'p', html: `Kitchens don’t work 24/7: they prepare what they receive at the start of their working day ${doc('assumptions')}. So each day the scheduler asks for today’s scheduled orders (${cmd('GetScheduledOrders')}) and sends the kitchen the list of what to cook (${cmd('PrepareOrders')}).` },
        { t: 'p', html: `That list is the <em>inventory update</em> the brief asked for, built from the subscribers’ menus. And the scheduler never queries the event store: it reads ${c('cqrs', 'projections')}, ready-made copies someone else keeps up to date.` },
      ],
    },
    {
      id: 'vocabulario',
      kicker: 'From calendar to fridge',
      title: 'Four words from the kitchen',
      visual: { scene: 'sub-vocab' },
      describe: '<p>The ghost kitchen, an external system with its own tracking software, receives PrepareOrders every morning. It answers with four words: accepted (it got the list), dispatched (which becomes the OrderDispatched event), can’t do (a risk the team listed: a menu that can’t be prepared) and delayed (subscribers asked to hear about late food).</p>',
      blocks: [
        { t: 'p', html: `The kitchen is an external system that already has its own tracking software. The team assumed it could answer with a tiny vocabulary ${doc('assumptions')}: <strong>accepted, dispatched, can’t do, delayed</strong>.` },
        { t: 'p', html: 'Four words are enough to keep a subscriber informed. And one of them, <strong>dispatched</strong>, is what sets the rest of the chain in motion.' },
      ],
    },
    {
      id: 'despacho',
      kicker: 'From calendar to fridge',
      title: 'One fact, four listeners',
      visual: { scene: 'sub-cycle', state: 'dispatch' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Original information model: preparing scheduled orders', caption: 'In the original, four arrows leave OrderDispatched (3): User, Catalog, Reporting and System Order.' },
      describe: '<p>The ghost kitchen publishes OrderDispatched. Four listeners receive it: the catalog, reporting, the system order and the user.</p>',
      blocks: [
        { t: 'p', html: `When the kitchen dispatches, it publishes ${evt('OrderDispatched')}. It doesn’t call anyone by name: whoever cares, listens.` },
        { t: 'p', html: 'The <strong>catalog</strong> updates its stock, <strong>reporting</strong> records it, the <strong>order</strong> moves forward, and the <strong>user</strong> learns their meal is on its way. “Informed user, happy user”, the team wrote.' },
        { t: 'p', html: 'It happens at most a couple of times a day per fridge: deliveries don’t multiply on demand.' },
      ],
    },
    {
      id: 'heladera',
      kicker: 'From calendar to fridge',
      title: 'Only the fridge can say “it’s here”',
      visual: { scene: 'sub-cycle', state: 'fridge' },
      evidence: { src: '/img/IM_preparing_scheduled_orders.PNG', alt: 'Original information model: preparing scheduled orders', caption: 'The end of the original cycle: OrderPlacedInFridge (4) and OrderAvailableForPicking (5).' },
      describe: '<p>The smart fridge confirms OrderPlacedInFridge to the system order. Only then does the system order emit OrderAvailableForPicking to the user, who gets the notice with their PIN.</p>',
      blocks: [
        { t: 'p', html: `A dispatched meal isn’t in the fridge yet. Only when it physically goes in does the fridge confirm ${evt('OrderPlacedInFridge')}, and only then does the order emit ${evt('OrderAvailableForPicking')}: the user gets their notice with the PIN.` },
        { t: 'p', html: 'No step skips ahead. If the kitchen doesn’t dispatch, the chain simply stops, and nobody is told about a meal that isn’t there.' },
        { t: 'p', html: 'One assumption holds it together: each meal has a unique id that ties it to its user, which custom meals such as a lactose-free lasagna need.' },
      ],
    },

    /* ── second thoughts ── */
    {
      id: 'cancelar',
      kicker: 'Second thoughts',
      title: 'Canceling after the window',
      visual: { scene: 'sub-cancel', state: 'ask', props: { correct: 3 } },
      describe: '<p>On the client side, the app sends Get Scheduled Orders and Cancel Order by User to the system order. On the server side, three components wait: the catalog, reporting and the payment provider. Which of them needs to hear about the cancellation?</p>',
      blocks: [
        { t: 'p', html: 'Chapter 6’s 30-second window covers impulse purchases. A subscriber canceling a scheduled order is another story: the money was paid days ago, and the kitchen may have already bought ingredients.' },
        {
          t: 'predict',
          question: 'The subscriber cancels a scheduled order. Which component does NOT need to hear about it?',
          options: [
            { label: 'Payment, which holds the money', feedback: 'Payment has to hear about it: without it, there’s no refund.' },
            { label: 'Reporting, which keeps the numbers', feedback: 'Reporting listens: a cancellation is data the business wants.' },
            { label: 'The app, which shows the schedule', feedback: 'The app needs the final confirmation that the money came back.' },
            { label: 'The catalog, which shows available meals', correct: true, feedback: '<strong>Right.</strong> A scheduled meal isn’t in any fridge yet: the subscriber cancels something that doesn’t exist, so there’s no stock to release.' },
          ],
        },
      ],
    },
    {
      id: 'reembolso',
      kicker: 'Second thoughts',
      title: 'A refund takes two messages',
      visual: { scene: 'sub-cancel', state: 'flow' },
      evidence: { src: '/img/IM_cancel_scheduled_order_by_user.PNG', alt: 'Original information model: canceling a scheduled order with a refund', caption: 'The team’s original: ClaimRefund travels to Payment, RefundSuccessful returns to the App, and no arrow reaches the Catalog.' },
      describe: '<ol><li>The app asks for its scheduled orders.</li><li>The app sends Cancel Order by User to the system order.</li><li>In parallel, the system order emits MealStockCanceled to reporting and sends ClaimRefund to payment. Nothing reaches the catalog.</li><li>Payment answers RefundSuccessful, which travels back to the app.</li></ol>',
      blocks: [
        { t: 'p', html: `After ${cmd('Cancel Order by User')}, the system order does two things in parallel: it emits ${evt('MealStockCanceled')} for reporting, and sends ${cmd('ClaimRefund')} to the payment provider.` },
        { t: 'p', html: `Payment closes the loop with ${evt('RefundSuccessful')}, all the way back to the app. “Asked for the money” and “the money came back” are different facts, recorded separately.` },
        { t: 'p', html: 'Without events, “did we refund it or not?” is exactly the kind of question that keeps a support team up at night.' },
      ],
    },
    {
      id: 'letra-chica',
      kicker: 'Second thoughts',
      title: 'The fine print: from the next business day',
      visual: { scene: 'sub-calendar' },
      describe: '<p>Simulator: a week of prepaid lunches, Monday to Friday, plus the next Monday. You pick the day you cancel. The meals already picked up stay as they are; that day’s meal is already prepared and isn’t canceled; from the next business day on, the meals are canceled and a ClaimRefund is sent. Canceling on Friday takes effect the following Monday.</p>',
      blocks: [
        { t: 'p', html: `The business rules are written down too ${doc('info-models')}: canceling a scheduled menu takes effect <strong>from the next business day</strong>. A meal that has already been prepared isn’t canceled.` },
        { t: 'p', html: 'Instead of going to waste, it can be released to the common stock, a call the team left to the business. They also noted a low-probability risk: kitchens preparing up to three days ahead.' },
        { t: 'p', html: 'Pick the day you cancel in the calendar.' },
      ],
    },

    /* ── the pattern ── */
    {
      id: 'patron',
      kicker: 'The pattern',
      title: 'The same simple pieces',
      visual: { scene: 'sub-recap' },
      blocks: [
        { t: 'p', html: 'Three events and a four-word vocabulary: even the business’s most valuable customer is held together by the same simple pieces as the rest of the system.' },
        { t: 'callout', tone: 'note', title: 'The pattern', html: 'Model the future as a <strong>rule that generates facts</strong>, not as a pile of facts written in advance. When the rule changes, nothing has to be hunted down.' },
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
              q: 'Why did the team generate each day’s orders from the menu instead of creating them all up front?',
              options: [
                'Because the kitchen can only store one day of orders',
                'Because the payment provider charges for every order created',
                'Because then changing the menu doesn’t mean rewriting dozens of orders',
                'Because the fridge rejects orders dated in the future',
              ],
              answer: 2,
              why: 'The schedule is a logical structure: a change touches one thing. The price is marking the generated orders as prepaid.',
            },
            {
              q: 'When does a scheduled order become available for pickup?',
              options: [
                'When the fridge confirms OrderPlacedInFridge',
                'When the kitchen accepts the day’s list',
                'When the scheduler sends PrepareOrders',
                'When the kitchen publishes OrderDispatched',
              ],
              answer: 0,
              why: 'Dispatched doesn’t mean in the fridge. Only the fridge’s confirmation turns the order into OrderAvailableForPicking, with the PIN notice.',
            },
            {
              q: 'A subscriber cancels a scheduled order. Why doesn’t the catalog hear about it?',
              options: [
                'Because the catalog only refreshes once a week',
                'Because the payment provider tells it later on',
                'Because cancellations are never recorded anywhere',
                'Because the meal isn’t in any fridge: there’s no stock to release',
              ],
              answer: 3,
              why: 'The subscriber cancels something that doesn’t exist yet. Only reporting and payment need to know.',
            },
            {
              q: 'Why is the refund two messages, ClaimRefund and RefundSuccessful, instead of one?',
              options: [
                'Because the gateway needs two calls to accept any refund',
                'Because asking for the money and getting it back are different facts',
                'Because commands can’t travel to external systems',
                'Because the app has to send both messages at once',
              ],
              answer: 1,
              why: 'Each fact is recorded separately, so “did we refund it or not?” always has an answer.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials of the chapter before moving on.' },
        { t: 'p', html: 'So far, everything has been pure logic. <strong>Sooner or later, someone has to pay for servers</strong>: the next chapter lands the design in the cloud.' },
      ],
    },
  ],
};
