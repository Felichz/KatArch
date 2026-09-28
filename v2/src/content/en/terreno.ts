import type { Chapter } from '../types';
import { c, doc } from './helpers';

export const terreno: Chapter = {
  id: 'terreno',
  number: 1,
  phase: 'The problem',
  title: 'The playing field',
  subtitle: 'The business, its physical pieces, who buys, what already existed, and the number that governs the whole case.',
  minutes: 9,
  learn: [
    'Describe the three physical pieces of the business and the three types of user.',
    'Separate what the architect <strong>receives ready-made</strong> from what they have to <strong>build</strong>.',
    'Calculate the system’s real volume and keep it as a yardstick for everything that follows.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'The playing field',
      blocks: [
        {
          t: 'p',
          html: `${c('kata', 'Architecture Katas')} are competitions where teams of engineers receive a real company’s brief and have a few weeks to design the complete architecture, which they then defend before a jury. In fall 2020 the case was <strong>Farmacy Food</strong>, and this course reconstructs, step by step, how the winning team, <strong>ArchColider</strong>, reasoned through it, using the real documents from their repository.`,
        },
      ],
    },

    /* ── the business ── */
    {
      id: 'mision',
      kicker: 'The business',
      title: 'Food as medicine, at fast-food prices',
      visual: { scene: 'mission' },
      blocks: [
        {
          t: 'p',
          html: 'Farmacy Food sells healthy, personalized food at affordable prices in Detroit communities where fresh food is hard to come by.',
        },
        {
          t: 'p',
          html: 'Its motto is meant literally: meals built around concrete medical needs (diabetes, celiac disease, prescribed diets) and sold at fast-food prices.',
        },
        {
          t: 'p',
          html: `To avoid paying for the most expensive part of the business, restaurants, the company runs on <strong>three physical pieces</strong> that were already working when the kata began. The ${c('rfp', 'client brief')} described them one by one.`,
        },
      ],
    },

    /* ── physical pieces ── */
    {
      id: 'cocinas',
      kicker: 'The physical pieces',
      title: 'Where the food is cooked: the ghost kitchens',
      visual: { scene: 'ecosystem', state: 'kitchen' },
      describe:
        '<p>A single piece: the ghost kitchen, a kitchen with no dining room. Meals leave it in batches for the points of sale.</p>',
      blocks: [
        {
          t: 'p',
          html: 'Kitchens that cook only for delivery and pickup, with no dining room. They already used specialized software, <strong>ChefTec</strong>, to cost recipes and track ingredients.',
        },
        {
          t: 'p',
          html: 'A detail that will matter later: they don’t cook around the clock. They produce <strong>in batches</strong>, with one or two cooking cycles per day.',
        },
      ],
    },
    {
      id: 'heladeras',
      kicker: 'The physical pieces',
      title: 'Where food sells itself: the smart fridge',
      visual: { scene: 'ecosystem', state: 'fridge' },
      describe:
        '<p>The kitchen supplies a smart fridge. The fridge sells with no staff: card, door, RFID scan and automatic charge.</p>',
      blocks: [
        {
          t: 'p',
          html: 'Self-service fridges supplied by <strong>Byte Technology</strong>. The customer swipes a card, the door unlocks, and they take their meals.',
        },
        {
          t: 'p',
          html: 'When the door closes, internal antennas read the <strong>RFID</strong> tags (chips attached to each meal, read over radio) and the purchase is charged automatically. Nobody is there to serve.',
        },
      ],
    },
    {
      id: 'kioscos',
      kicker: 'The physical pieces',
      title: 'Where a person sells: the kiosk',
      visual: { scene: 'ecosystem', state: 'kiosk' },
      describe:
        '<p>The third piece: the kiosk with a cashier. The kitchen supplies both the fridge and the kiosk.</p>',
      blocks: [
        {
          t: 'p',
          html: 'Regular fridges in sublet spaces: gyms, clinics, partner cafeterias.',
        },
        {
          t: 'p',
          html: 'Here there is a person behind the counter, charging through commercial <strong>Toast POS</strong> terminals, which already had their own API.',
        },
        {
          t: 'callout',
          tone: 'note',
          title: 'Look at the drawing',
          html: 'One kitchen, two ways to sell: one without people and one with people. Each will bring its own technical problems.',
        },
      ],
    },

    /* ── users ── */
    {
      id: 'usuarios',
      kicker: 'Who buys',
      title: 'Three users, three ways to pay',
      visual: { scene: 'ecosystem', state: 'users' },
      describe:
        '<p>The known user and the subscriber buy at the fridge, identified by their card or their account. The occasional user buys at the kiosk, in cash: that sale tells the central system nothing.</p>',
      blocks: [
        { t: 'p', html: 'The brief also defines who buys. This is not marketing detail: <strong>the way each user pays creates a different technical problem</strong>.' },
        {
          t: 'cards',
          cards: [
            { title: 'Occasional', tag: 'cash, no account', html: 'Chooses by looking at the display and pays at the kiosk counter. The business wants to turn them into a known user.' },
            { title: 'Known', tag: 'account + card', html: 'Browses the catalog, reserves and pays from the app. The fridge recognizes them by their card.' },
            { title: 'Subscriber', tag: 'weekly menu', html: 'The ideal customer: prepays their menu for the week and picks up every day. Predictable load, in exchange for cancellations and refunds.' },
          ],
        },
        { t: 'callout', tone: 'warn', title: 'Keep this for later', html: 'The occasional user’s cash purchase <strong>tells the central system nothing in real time</strong>. Remember it: it comes back when money enters the picture.' },
      ],
    },
    {
      id: 'stakeholders',
      kicker: 'Who buys',
      title: 'The ones who don’t buy, but still matter',
      visual: { scene: 'ecosystem', state: 'stakeholders' },
      describe:
        '<p>Besides the three users: the kiosk cashier, who records sales in Toast POS; the nutritionists, who search meals by nutritional component; and the ingredient suppliers, who want to forecast how much to buy.</p>',
      blocks: [
        { t: 'p', html: 'There is a fourth figure who is easy to forget: the <strong>kiosk cashier</strong>, who serves occasional users and records their sales in the Toast POS.' },
        {
          t: 'p',
          html: `The team’s analysis went further and added <strong>nutritionists</strong> (they search meals by nutritional component) and <strong>ingredient suppliers</strong> (they want to forecast how much to buy) ${doc('stakeholders')}.`,
        },
        { t: 'callout', tone: 'info', title: 'An architect’s question', html: 'Who else cares about this system, besides the users? Every answer is someone whose needs can shape the design.' },
      ],
    },

    /* ── what already existed ── */
    {
      id: 'sistemas',
      kicker: 'What already existed',
      title: 'Build a bridge, not the whole world',
      visual: { scene: 'ecosystem', state: 'systems' },
      describe:
        '<p>The drawing switches views: from the physical world to software. In the center, the Central Ordering Platform, the only thing to build. On the left, the input channels: fridges (Byte API), kiosks (Toast POS API) and the web and mobile app. On the right, the systems that already existed: kitchens (ChefTec), payments (Stripe) and accounting (QuickBooks).</p>',
      blocks: [
        { t: 'p', html: 'The job was scoped: build the <strong>Central Ordering Platform</strong>, the bridge between the users and the tools the company had already contracted.' },
        {
          t: 'list',
          items: [
            '<strong>Byte Technology</strong>: which meals remain in each fridge, and every charge made when a door closes.',
            '<strong>Toast POS</strong>: the sales that cashiers record at the kiosks.',
            '<strong>ChefTec</strong>: the consolidated list of what the kitchens need to cook.',
            '<strong>Stripe</strong>: digital payments from the app.',
            '<strong>QuickBooks</strong>: the official accounting.',
          ],
        },
        { t: 'p', html: 'The architect does not choose these pieces: they come with the job. They are <strong>constraints</strong>.' },
      ],
    },
    {
      id: 'alcance',
      kicker: 'What already existed',
      title: 'What is not the architect’s problem',
      visual: { scene: 'ecosystem', state: 'scope' },
      describe:
        '<p>A dashed border marks the scope of the kata. Outside the border, crossed out: the delivery-truck logistics, the fridge firmware, and any movement of food that is not a purchase.</p>',
      blocks: [
        { t: 'p', html: 'The brief was also explicit about what was <strong>not</strong> included: the logistics of the trucks that restock the fridges, the fridges’ internal firmware (owned by Byte), and any movement of food that is not a customer purchase.' },
        { t: 'callout', tone: 'note', title: 'The first decision', html: 'Defining what you do <strong>not</strong> have to solve is an architect’s first decision. It is the first link in a chain of things given up that runs through the whole case.' },
      ],
    },

    /* ── the numbers ── */
    {
      id: 'numeros',
      kicker: 'The numbers',
      title: 'The fact that changes everything',
      visual: { scene: 'stats' },
      blocks: [
        { t: 'p', html: 'What follows separates a serious solution from a fantasy. The brief states the current volume and the business targets.' },
        { t: 'p', html: 'Look at the last figure. Before it gets explained, do the math yourself.' },
      ],
    },
    {
      id: 'cuenta',
      kicker: 'The numbers',
      title: 'Do the math before choosing tools',
      visual: { scene: 'rate', props: { correct: 3 } },
      describe:
        '<p>A 24-hour timeline with 42 dots, one per meal sold, clustered around midday and early evening. Zooming into any single second at peak time shows zero sales: 42 divided by 86,400 seconds is about 0.0005 meals per second.</p>',
      blocks: [
        {
          t: 'predict',
          question: 'With ~42 meals a day across two points of sale, how much traffic does the system get at peak time?',
          options: [
            { label: 'Thousands of requests per second, like any app', feedback: 'That is the scale of a mass-market app. Here there are 42 sales spread over an entire day.' },
            { label: 'About a hundred per second', feedback: 'A hundred per second would be more than eight million a day. Compare that with 42 sales.' },
            { label: 'Around ten per second', feedback: 'Still far too much: ten per second is 864,000 a day.' },
            { label: 'Practically zero: less than one per minute', correct: true, feedback: '<strong>Exactly.</strong> One sale every few minutes, in the worst case. Even the annual target stays below one request per second.' },
          ],
        },
      ],
    },
    {
      id: 'crecer',
      kicker: 'The numbers',
      title: 'And when it grows?',
      visual: { scene: 'growth' },
      describe:
        '<p>Locations: 2 on day 1, 8 during 2021, 68 as the 12-month target. Weekly volume: ~300 meals today, 1,500 to 2,000 at the annual target and ~10,000 in the rapid-growth scenario, against a yardstick of 604,800 per week, which equals one request per second, sustained.</p>',
      blocks: [
        { t: 'p', html: 'The brief held two numbers that are easy to miss: the immediate growth, from 2 to <strong>8 locations during 2021</strong>, and a subscriber’s consumption: <strong>~10 meals per week</strong>.' },
        { t: 'p', html: 'With that arithmetic, 1,000 subscribers means about 10,000 meals a week: exactly the rapid-growth scenario in the cost spreadsheet you will see at the end of the course.' },
        { t: 'callout', tone: 'warn', title: 'Keep this number', html: 'Less than <strong>one request per second</strong>, today and at the target. You don’t know what it is for yet. It explains almost every decision that follows.' },
      ],
    },

    /* ── the map ── */
    {
      id: 'contexto',
      kicker: 'The full map',
      title: 'The whole playing field in one drawing',
      visual: { scene: 'ecosystem', state: 'complete' },
      describe:
        '<p>Context diagram: the input channels (fridges, kiosks, app) send to the Central Ordering Platform, which in turn talks to the kitchens (ChefTec), payments (Stripe) and accounting (QuickBooks). Only the central platform gets built; everything else already existed.</p>',
      blocks: [
        { t: 'p', html: 'With the business, the actors and the numbers on the table, everything fits in one drawing: a <strong>context diagram</strong>. It shows the system’s boundaries and who it talks to, without saying anything yet about how it is built inside.' },
        { t: 'p', html: 'Only now should every box and every arrow look familiar. Go through the pieces in the diagram to review them.' },
      ],
    },

    /* ── checkpoint ── */
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Three questions before moving on',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'What does the architecture team have to build?',
              options: [
                'Everything: fridges, registers, kitchen and payments',
                'Only the Central Ordering Platform, connecting what already exists',
                'The fridge firmware and the restocking logistics',
                'A mobile app and nothing else',
              ],
              answer: 1,
              why: 'Fridges (Byte), kiosks (Toast POS), kitchen (ChefTec), payments (Stripe) and accounting (QuickBooks) were given. What is new is the bridge.',
            },
            {
              q: 'Why is the occasional user a technical challenge?',
              options: [
                'Because they use the app all the time',
                'Because they ask for refunds often',
                'Because they pay in cash and their purchase does not notify the central system in real time',
                'Because they have a prepaid weekly menu',
              ],
              answer: 2,
              why: 'Cash goes through the kiosk register. To the central system, that sale is invisible at the moment it happens.',
            },
            {
              q: 'How much traffic does the system need to handle, today and at the annual target?',
              options: ['Thousands of requests per second', 'About a hundred per second', 'Less than one per second'],
              answer: 2,
              why: '~42 meals a day at 2 locations, and even the annual target stays below one request per second. This number comes back in the next chapter.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'No grade and no rush: the goal is for the chapter to stick before you move on to the next one.' },
        { t: 'p', html: 'In the next chapter, the ten teams receive this same brief, and the three finalists give opposite answers to a single question: <strong>how much machinery do you buy for 42 meals a day?</strong>' },
      ],
    },
  ],
};
