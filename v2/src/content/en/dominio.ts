import type { Chapter } from '../types';
import { c, doc } from './helpers';

export const dominio: Chapter = {
  id: 'dominio',
  number: 5,
  phase: 'The design',
  title: 'What to build and what to rent',
  subtitle: 'A modular monolith only works if the modules are cut well. Where to cut, how to protect what sets the business apart, and what to pay others for.',
  minutes: 15,
  learn: [
    'Sort capabilities into <strong>core, supporting and generic</strong> with two questions.',
    'Explain what an <strong>anti-corruption layer</strong> is for, and follow a piece of data through it.',
    'Recognize a <strong>facade</strong> that buys time without closing doors.',
    'Read the metamodel: rules on top, facts below.',
    'Give each subsystem its own quality budget by asking what happens if it fails.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'What to build and what to rent',
      blocks: [
        { t: 'p', html: 'The previous chapter chose a single application split into modules. This one decides where the boundaries go, and it is the most visual part of the case: five original diagrams, redrawn so you can walk through them.' },
      ],
    },
    {
      id: 'vara',
      kicker: 'The yardstick',
      title: 'Two questions for every capability',
      visual: { scene: 'sorter' },
      blocks: [
        { t: 'p', html: `To decide where to cut, the team applied ${c('ddd', 'Domain-Driven Design')} at its strategic level ${doc('solution-overview')}: classify each capability by whether it is the competitive advantage, a support, or something generic that every company needs.` },
        { t: 'p', html: 'The test fits in two questions: <strong>does this set Farmacy Food apart? Does it already exist, built and proven?</strong> A “no” to the first and a “yes” to the second send the capability to the rent pile, no guilt involved.' },
        { t: 'p', html: 'Try it yourself before you see the team’s map.' },
      ],
    },
    {
      id: 'mapa',
      kicker: 'The yardstick',
      title: 'The team’s strategic map',
      visual: { scene: 'domainmap' },
      evidence: { src: '/img/FF_StrategicDomainDesign.jpg', alt: 'Original map of strategic subdomains', caption: 'The original strategic map: each domain placed by uniqueness and complexity.' },
      describe: '<p>Core, top right: Loyalty, Meal Catalog and Ordering. Supporting, top left: Feedback and kitchen Scheduling. Generic, bottom: Reporting, Notifications and Payments.</p>',
      blocks: [
        {
          t: 'cards',
          cards: [
            { title: 'Core', tag: 'build in-house', html: 'Meal Catalog (availability per fridge, ingredients, promotions), Ordering (subscriptions, coupons, payment through online payment systems) and Loyalty. Where the business wins or loses.' },
            { title: 'Supporting', tag: 'adapt', html: 'Feedback and the kitchens’ production Scheduling. They are needed, but they do not set the business apart.' },
            { title: 'Generic', tag: 'rent', html: 'Reporting, Payments, Notifications. Nobody gains an edge by building their own payment processor.' },
          ],
        },
        { t: 'p', html: 'This picture decides the budget: where the best in-house code goes, and where you pay someone else.' },
      ],
    },
    {
      id: 'aduana',
      kicker: 'The customs office',
      title: 'Protecting what sets you apart',
      visual: { scene: 'acl', state: 'structure' },
      evidence: { src: '/img/menu-catalog-acl.png', alt: 'Original diagram of the Menu Catalog service with its anti-corruption layer', caption: 'The Menu Catalog service with its anti-corruption layer, from the final proposal deck.' },
      describe: '<p>The Menu Catalog service has an anti-corruption layer with three translation pieces: Meals Offer, Loyalty and Menu Catalog API. The external systems (Ghost Kitchen, Loyalty Management, front end and point of sale) only touch that layer. The layer talks to the domain with commands, and the domain talks to the internal consumers (shopping cart, recommendations, reviews, filtering) with events.</p>',
      blocks: [
        { t: 'p', html: 'If the catalog is what sets the business apart, it has to be protected from everyone else’s formats.' },
        { t: 'p', html: `Around the <strong>Menu Catalog</strong> the team drew an ${c('acl', 'anti-corruption layer')}: a boundary that the kitchen, the loyalty program, the app and the kiosks must all go through.` },
        { t: 'p', html: 'The domain only speaks outward in commands and events, the rule from the sticky note on the whiteboard: no direct calls.' },
      ],
    },
    {
      id: 'aduana-flujo',
      kicker: 'The customs office',
      title: 'A piece of data crosses the border',
      visual: { scene: 'acl', state: 'flow' },
      describe: '<p>The kitchen publishes, in its own format, that it cooked 40 lasagnas. Meals Offer translates that into the internal format and hands it to the domain. The domain emits a stock updated event, which the shopping cart, recommendations, reviews and filtering all listen to.</p>',
      blocks: [
        { t: 'p', html: 'Follow one piece of data: the kitchen publishes that it cooked 40 lasagnas, in its own format. <strong>Meals Offer</strong> translates it. The domain processes it and emits “stock updated”, which the consumers listen to.' },
        { t: 'p', html: 'Not one piece of raw third-party data touched the domain, and no consumer had to know where it came from.' },
      ],
    },
    {
      id: 'aduana-fabrica',
      kicker: 'The customs office',
      title: 'If the provider does not publish events, the layer makes them',
      visual: { scene: 'acl', state: 'fabricate' },
      describe: '<p>Byte’s fridges expose raw data through an API, with no events. The anti-corruption layer turns that data into the same catalog updated event the whole system consumes.</p>',
      blocks: [
        { t: 'p', html: 'A detail in the internal documents shows what the layer is worth: if Byte’s fridges do not publish events, <strong>the layer makes them</strong>.' },
        { t: 'p', html: 'It turns the raw API data into the same “catalog updated” event the whole system consumes. The rest of the system never notices the difference.' },
      ],
    },
    {
      id: 'wrapper',
      kicker: 'The customs office',
      title: 'Myagis-Forest reached the same idea under another name',
      visual: { scene: 'wrapper' },
      blocks: [
        { t: 'p', html: 'The counterpoint: Myagis-Forest’s ADR 004 applies the <strong>Wrapper</strong> pattern. No business service talks directly to a third party: each external system gets its own wrapper that translates the outside contract into the internal standard.' },
        { t: 'p', html: 'Same instinct (outside formats never touch the domain), different shape: in ArchColider the customs office is a layer inside the module; in Myagis-Forest, it is one microservice per third party.' },
      ],
    },
    {
      id: 'fachada',
      kicker: 'The generic pieces',
      title: 'Payments: one facade in front of many networks',
      visual: { scene: 'facade' },
      evidence: { src: '/img/whiteboard-payment-facade.png', alt: 'Original whiteboard: payment facade toward Visa, Mastercard and PayPal', caption: 'The payment facade scribbled on the whiteboard: a single internal block fans out to each network.' },
      describe: '<p>Ordering and Subscriptions talk to an in-house payment facade. Today the facade delegates to a provider that connects to Visa, Mastercard and PayPal. Tomorrow, if expansion requires it, the facade can start talking directly to a network, one at a time, without the modules noticing.</p>',
      blocks: [
        { t: 'p', html: 'Payments show how far the team took pragmatism with generic pieces. On the whiteboard they scribbled it plainly: a single payment block that fans out to Visa, Mastercard or PayPal.' },
        { t: 'p', html: 'Switch between <strong>today</strong> and <strong>tomorrow</strong> in the diagram: buying time without closing doors.' },
        { t: 'decision', id: 'payment' },
      ],
    },
    {
      id: 'mapas',
      kicker: 'The generic pieces',
      title: 'Even the map, by the same yardstick',
      visual: { scene: 'maps' },
      blocks: [
        { t: 'p', html: `Even the map for finding the fridges was decided the same way. ${doc('adr-015', 'ADR 015')} compared four providers by their free tier and chose <strong>Here Maps</strong>: its 250,000 free requests a month were more than enough for the real volume.` },
        { t: 'p', html: 'It is a small decision, and that is why it works as a calibration point: not every ADR is a change of style. Some are a price table and a reminder in the calendar.' },
      ],
    },
    {
      id: 'metamodelo',
      kicker: 'The metamodel',
      title: 'The rulebook and the match',
      visual: { scene: 'metamodel', state: 'levels' },
      evidence: { src: '/img/FF_Metamodel_v1.png', alt: 'Original metamodel: knowledge level and operational level', caption: 'The original metamodel, with the dashed line that separates rules from facts.' },
      describe: '<p>On top, the knowledge level: user types, action types, order types, order states, promotion rules and types, meal types and feedback types. Below, the operational level: user, action, order, feedback, schedule, promotion, menu, meal and ghost kitchen. Each rule on top describes, limits or controls a fact below.</p>',
      blocks: [
        { t: 'p', html: `The solution overview ${doc('solution-overview')} includes a <em>metamodel</em>. It separates two levels that tend to get mixed up:` },
        { t: 'list', items: ['<strong>Knowledge:</strong> the rules. Which user types exist, which actions each one can take, which promotions apply to which menus.', '<strong>Operational:</strong> the facts. This order, this menu, this kitchen.'] },
        { t: 'p', html: 'The tournament rulebook and Sunday’s match. Tap the boxes, and look at <strong>Action Type</strong>: actor actions, which avoid the Entity Trap.' },
      ],
    },
    {
      id: 'metamodelo-promo',
      kicker: 'The metamodel',
      title: 'Change the campaign without touching the match',
      visual: { scene: 'metamodel', state: 'promo' },
      describe: '<p>A promotion rule defines a promotion type, which applies to meal types and combines with order types. Below, a concrete promotion applies that rule to the items of a menu. Changing the campaign means touching the top.</p>',
      blocks: [
        { t: 'p', html: 'The payoff comes later: when the business invents a new promotion or a new user profile, a rule on top changes and nothing below gets rewritten.' },
        { t: 'p', html: 'An example from the document itself: promotions hang off menus and meal types, <strong>never off individual meals</strong>. That way a kitchen can offer its own promotion without touching the rest.' },
      ],
    },
    {
      id: 'presupuesto',
      kicker: 'Quality budget',
      title: 'What happens to the business if this piece fails?',
      visual: { scene: 'composition' },
      evidence: { src: '/img/FF_system_approach.png', alt: 'Original system composition with gravity centers and quality attributes', caption: 'The final composition, with the gravity centers in green and each subsystem’s quality budget.' },
      describe: '<p>Front-end apps (mobile app and point of sale): usability, performance and autonomy. Meal Catalog subsystem (feedback, promotions, Menu Catalog, meal pickup): extensibility, maintainability and availability. Order processing subsystem (scheduling and ordering): reliability and integrity. Purchase gateway: security and availability. Notifications and reporting: reliability. Gravity centers: Menu Catalog and Ordering.</p>',
      blocks: [
        { t: 'p', html: `The design closed with an idea worth copying ${doc('system-approach')}: global ${c('quality-attributes', 'quality attributes')} first, then <strong>a budget of its own for each subsystem</strong>.` },
        { t: 'p', html: 'The logic is repeatable: ask what happens to the business if that piece fails. The dominant attribute of each subsystem is the one that protects its part of the business. Tap each one.' },
        { t: 'p', html: 'The two <strong>gravity centers</strong>, catalog and ordering, are where almost all of the next chapter takes place.' },
      ],
    },
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Four questions before moving on',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'Payments: does it set Farmacy Food apart? No. Does it already exist, built and proven? Yes. What do you do?',
              options: ['Build it in-house with the best team', 'Rent it: integrate an existing service', 'Adapt a supporting tool', 'Put it off'],
              answer: 1,
              why: 'It does not set the business apart and it already exists: generic. Nobody gains an edge by building their own payment processor.',
            },
            {
              q: 'What is the catalog’s anti-corruption layer for?',
              options: ['To encrypt the data', 'So third-party formats die at the border and never touch the domain', 'To balance load', 'To store the cache'],
              answer: 1,
              why: 'It translates what comes from outside into the internal language, and even makes events when the provider does not publish them.',
            },
            {
              q: 'What does the payment facade buy?',
              options: ['Nothing: it is bureaucracy', 'Time today (one provider) without closing the door to talking directly to the networks tomorrow', 'Cheaper payments from day one', 'Not needing a provider at all'],
              answer: 1,
              why: 'The modules talk to the facade; what sits behind it can change without them noticing.',
            },
            {
              q: 'In the metamodel, where do you change a promotion campaign?',
              options: ['On every individual meal', 'At the knowledge level (the rules), without rewriting the facts', 'In the orders database', 'In the mobile app'],
              answer: 1,
              why: 'Rulebook on top, match below. Promotions hang off menus and meal types.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials before moving on.' },
        { t: 'p', html: 'So far the system has been designed as clean software. In the next chapter it runs into the physical world: fridges with no signal, money, and two people wanting the last meal.' },
      ],
    },
  ],
};
