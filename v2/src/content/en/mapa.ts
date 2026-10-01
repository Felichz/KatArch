import type { Chapter } from '../types';
import { c } from './helpers';

export const mapa: Chapter = {
  id: 'mapa',
  number: 10,
  phase: 'The economic reality',
  title: 'The decision map',
  subtitle: 'The ten structural decisions in three pillars, and the threads that tie them together.',
  minutes: 12,
  learn: [
    'Explain why sixteen ADRs become <strong>ten structural decisions</strong>.',
    'Read every decision as <strong>problem, decision and trade-off</strong>.',
    'Place each decision in its <strong>pillar</strong> and in the chapter where it was made.',
    'Follow the <strong>links</strong>: which decision forced which, and the chain of trade-offs that runs through the case.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'The decision map',
      blocks: [
        { t: 'p', html: 'Nine chapters of decisions, one at a time. This one sets the ten that truly define the architecture side by side and reads them as a system: what each one solved, what it cost, and which one forced the next.' },
      ],
    },
    {
      id: 'curaduria',
      kicker: 'The curation',
      title: 'Sixteen ADRs, ten decisions',
      visual: { scene: 'map-sieve' },
      describe: '<p>Sixteen ADR cards. Five stay off the map: 001 (the ADR template), 004 (health checks), 005 (readiness checks), 015 (map providers) and 016 (infrastructure as code). The other eleven go into three pillars. Pillar 1: ADRs 002, 007 and 008. Pillar 2: ADRs 011, 012 with 013 (a single decision) and 010. Pillar 3: ADRs 003, 006, 009 and 014. Eleven ADRs, ten decisions.</p>',
      blocks: [
        { t: 'p', html: `The repository delivered sixteen ${c('adr', 'ADRs')}, and they don’t all weigh the same: some are deep structural decisions, some are operational hygiene and some are paperwork.` },
        { t: 'p', html: 'The curation keeps the ones that truly define this architecture: <strong>ten decisions</strong>, grouped in three pillars.' },
        { t: 'p', html: 'Watch the fine print: two ADRs, stale fridge data and the cached catalog, are one single decision.' },
      ],
    },
    {
      id: 'anatomia',
      kicker: 'The curation',
      title: 'Every entry answers three questions',
      visual: { scene: 'map-anatomy', props: { id: 'monolith' } },
      describe: '<p>The modular monolith entry, from chapter 4, as three cards. The problem: two locations, about 42 meals a day and a small team, without mortgaging the growth to 68 locations. The decision: a monolith split into modules with strict boundaries that talk through contracts. What it costs: the risk that the modules erode into a ball of mud, balanced by contracts, per-module telemetry and review.</p>',
      blocks: [
        { t: 'p', html: 'Every decision on the map reads the same way: the <strong>problem</strong> that forced it, the <strong>decision</strong> itself and the <strong>trade-off</strong> the team accepted.' },
        { t: 'p', html: 'It is the ADR from chapter 3 (context, decision, consequences) told in plain language. The golden rule still holds: an entry with no downside would be propaganda.' },
        { t: 'p', html: 'On the right, the mother decision of the case, from chapter 4.' },
      ],
    },
    {
      id: 'mapa',
      kicker: 'The map',
      title: 'Ten decisions on one map',
      visual: { scene: 'map-board', state: 'explore' },
      describe: '<p>Three pillar zones. In the middle, the structural core: modular monolith, event sourcing and a queue with receipts. On the left, physical reality and privacy: in-house feedback, offline PIN and cached catalog. On the right, operations, scale and budget: rented monitoring, identity at the edge, scale up first and payment facade.</p><p>Solid arrows: the monolith leads to rented monitoring, identity at the edge and scaling up first; the cached catalog leads to the queue, and the queue to the payment facade. Dashed lines join decisions with the same logic: event sourcing with the queue, the offline PIN with the cached catalog, and rented monitoring with in-house feedback.</p>',
      blocks: [
        { t: 'p', html: 'Here is the whole map. Each box is a decision, each dashed zone a pillar. Solid arrows mean one decision led to another; dashed lines join decisions that follow the same logic.' },
        { t: 'p', html: 'The structural core sits in the middle because most threads run through it.' },
        { t: 'p', html: '<strong>Tap any decision</strong>: below the map you get its problem, the decision and what it costs, the chapter it came from, and a button that opens its full card.' },
      ],
    },
    {
      id: 'pilar-1',
      kicker: 'The map',
      title: 'Pillar 1: the structural core',
      visual: { scene: 'map-board', state: 'p1' },
      describe: '<p>The middle zone is highlighted: modular monolith (chapter 4), event sourcing and a queue with receipts (both from chapter 6). A dashed line joins event sourcing and the queue: both protect the money.</p>',
      blocks: [
        { t: 'p', html: 'The decisions that set the shape of the system: how it is organized, how it keeps its data and how its parts talk.' },
        { t: 'p', html: 'The style came first, in chapter 4. The other two arrived in chapter 6, with a customer disputing a charge: keep the evidence, and never lose or double the charge message.' },
        { t: 'decision', id: 'monolith' },
        { t: 'decision', id: 'event-sourcing' },
        { t: 'decision', id: 'rabbitmq' },
      ],
    },
    {
      id: 'pilar-2',
      kicker: 'The map',
      title: 'Pillar 2: physical reality and privacy',
      visual: { scene: 'map-board', state: 'p2' },
      describe: '<p>The left zone is highlighted: in-house feedback (chapter 9), offline PIN and cached catalog (both from chapter 6). A dashed line joins the offline PIN and the cached catalog: both accept physical reality.</p>',
      blocks: [
        { t: 'p', html: 'Decisions born where software meets the real world: fridges that lose signal, stock data that arrives late, real customers’ health data.' },
        { t: 'p', html: 'The PIN and the local catalog come from chapter 6 and share its pattern: accept physical reality instead of fighting it. The in-house feedback comes from chapter 9: health profiles don’t leave the platform.' },
        { t: 'decision', id: 'pin-offline' },
        { t: 'decision', id: 'catalog-cache' },
        { t: 'decision', id: 'privacy' },
      ],
    },
    {
      id: 'pilar-3',
      kicker: 'The map',
      title: 'Pillar 3: operations, scale and budget',
      visual: { scene: 'map-board', state: 'p3' },
      describe: '<p>The right zone is highlighted: rented monitoring (chapter 9), identity at the edge and scale up first (both from chapter 8) and the payment facade (chapter 5).</p>',
      blocks: [
        { t: 'p', html: 'The ones that look after the startup’s wallet: when to scale, what to monitor, where to check identity, what to buy. Payments came up in chapter 5, identity and scaling in chapter 8, monitoring in chapter 9.' },
        { t: 'decision', id: 'payment' },
        { t: 'decision', id: 'edge-auth' },
        { t: 'decision', id: 'scale-up' },
        { t: 'decision', id: 'datadog' },
      ],
    },
    {
      id: 'madre',
      kicker: 'The threads',
      title: 'The mother decision pulls three more',
      visual: { scene: 'map-board', state: 'mother', props: { correct: 1 } },
      describe: '<p>Three arrows leave the modular monolith for the third pillar: rented monitoring (the per-module telemetry that balances its risk), identity at the edge (zero trust between modules, ready for the day they split) and scale up first (the module under most pressure is extracted when vertical scaling runs out).</p>',
      blocks: [
        { t: 'p', html: 'Chapter 4 called the style the mother decision of the case. On the map you can see why: three arrows leave the modular monolith.' },
        {
          t: 'predict',
          question: 'The monolith accepts the risk of eroding into a ball of mud. Which later decision is part of the counterweight?',
          options: [
            { label: 'The offline PIN pickup', feedback: 'That one answers fridges losing signal, not the monolith’s risk.' },
            { label: 'Rented monitoring', correct: true, feedback: '<strong>Right.</strong> The counterweight includes mandatory telemetry per module, and DataDog is how it got paid for. The other two arrows: zero trust between modules, and scaling up before splitting.' },
            { label: 'The in-house feedback module', feedback: 'That one protects health data; it has no bearing on the monolith’s risk.' },
          ],
        },
      ],
    },
    {
      id: 'dinero',
      kicker: 'The threads',
      title: 'The money path crosses all three pillars',
      visual: { scene: 'map-board', state: 'money' },
      describe: '<p>The purchase path lights up: from the cached catalog (pillar 2) to the queue with receipts (pillar 1), joined to event sourcing, and from the queue to the payment facade (pillar 3).</p>',
      blocks: [
        { t: 'p', html: 'Follow a purchase across the map. The catalog on the phone may be stale while you browse, never while you pay: real stock is checked at the moment of payment.' },
        { t: 'p', html: 'From there the charge travels in a queue that confirms receipt, so it is neither lost nor doubled, and every order is kept as a history of events, ready for any dispute.' },
        { t: 'p', html: 'At the far end waits the payment provider, behind an in-house facade. Three pillars, one path.' },
      ],
    },
    {
      id: 'vara',
      kicker: 'The threads',
      title: 'One yardstick, opposite answers',
      visual: { scene: 'map-board', state: 'yardstick' },
      describe: '<p>A dashed line runs around the map from in-house feedback (pillar 2) to rented monitoring (pillar 3): the same buy-or-build question, answered in opposite directions.</p>',
      blocks: [
        { t: 'p', html: 'Two decisions from chapter 9 live in different pillars and came out of the same question: buy it or build it?' },
        { t: 'p', html: 'For monitoring, buying won: the free alternative cost developer hours, the most expensive resource of a small team. For surveys, building won: the ready-made tools meant health data on third-party servers.' },
        { t: 'callout', tone: 'info', title: 'The yardstick', html: 'The monthly bill never settles it alone. The real cost includes who maintains the piece, and whose data leaves the house.' },
      ],
    },
    {
      id: 'puertas',
      kicker: 'The threads',
      title: 'Five decisions leave a door open',
      visual: { scene: 'map-board', state: 'doors' },
      describe: '<p>Five decisions carry a door badge: modular monolith, event sourcing, identity at the edge, scale up first and payment facade. Each one solves today’s volume and writes down its way out.</p>',
      blocks: [
        { t: 'p', html: 'Look for the door badge. Five decisions solve today’s volume and write down, on the same card, how to get out later:' },
        {
          t: 'list',
          items: [
            '<strong>Monolith:</strong> extract a module the day telemetry justifies it.',
            '<strong>Event sourcing:</strong> open-source EventStore first, the managed service only if volume demands it.',
            '<strong>Payments:</strong> one provider now, an in-house facade that can take over the networks.',
            '<strong>Scaling:</strong> a bigger machine now, more instances when telemetry says so.',
            '<strong>Zero trust:</strong> security ready before the split.',
          ],
        },
        { t: 'p', html: 'It is the evolvability principle from chapter 3: design to extract tomorrow, without extracting today.' },
      ],
    },
    {
      id: 'cadena',
      kicker: 'The threads',
      title: 'The chain of trade-offs',
      visual: { scene: 'map-chain' },
      describe: '<p>Four decisions in a chain. The modular monolith accepts that modules may erode into a ball of mud. The counterweight is telemetry per module, which leads to rented monitoring, the most expensive line of the yearly budget. That telemetry says when vertical scaling runs out, which is what scaling up first relies on, accepting a single point of failure. When it runs out, the module under most pressure leaves the monolith, and identity at the edge has already made security ready for it, at the price of an extra check between modules.</p>',
      blocks: [
        { t: 'p', html: 'Chapter 1 promised a chain of things given up that runs through the whole case. Here is one full thread: each trade-off gets paid by the next decision.' },
        { t: 'p', html: `The monolith accepts a risk, ${c('telemetry', 'telemetry')} covers it, telemetry costs money and decides when to scale, and when a module finally leaves, zero trust is already waiting. Walk it with the controls.` },
        { t: 'callout', tone: 'note', title: 'Why it matters', html: 'No decision here stands alone. That is the traceability the jury rewarded: from business to decision, and from decision to cost.' },
      ],
    },
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Four questions before the last chapter',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'Eleven ADRs feed the map, yet it holds only ten decisions. Why?',
              options: [
                'The jury threw out one of the eleven ADRs',
                'Stale fridge data and the cached catalog are one decision',
                'One of the ADRs was a duplicate filed by mistake',
                'The map leaves the payment decision for later',
              ],
              answer: 1,
              why: 'ADRs 012 and 013 feed one single decision: browse a cached catalog, verify the real stock at payment.',
            },
            {
              q: 'Which pillar does the offline PIN pickup belong to?',
              options: ['The structural core', 'Operations, scale and budget', 'Physical reality and privacy', 'None: it stays off the map'],
              answer: 2,
              why: 'It was born from a fridge losing signal in a hospital basement: software meeting the physical world.',
            },
            {
              q: 'Why does zero trust between modules make sense inside a monolith?',
              options: [
                'Because security is ready the day a module splits off',
                'Because modules inside a monolith cannot trust the network',
                'Because Cognito only works when each module checks tokens',
                'Because it makes each request faster inside the monolith',
              ],
              answer: 0,
              why: 'It is the other arrow from the mother decision: the monolith is designed to be split, so security is designed for the split too.',
            },
            {
              q: 'Rented monitoring and in-house feedback came from the same buy-or-build question. Why opposite answers?',
              options: [
                'Monitoring was cheaper to build than surveys',
                'Feedback was a core domain and monitoring was not',
                'The team ran out of time to build monitoring',
                'Buying monitoring saved developer hours; buying surveys exposed health data',
              ],
              answer: 3,
              why: 'Same yardstick, full cost: the hours of whoever maintains the piece, and the data that would leave the platform.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the map before the last stretch.' },
        { t: 'p', html: 'Ten decisions, and underneath them, a way of working. The last chapter takes the case away and keeps the method: four steps you can carry to your next system.' },
      ],
    },
  ],
};
