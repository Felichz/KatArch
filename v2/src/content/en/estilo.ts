import type { Chapter } from '../types';
import { c, doc } from './helpers';

export const estilo: Chapter = {
  id: 'estilo',
  number: 4,
  phase: 'The decision framework',
  title: 'How much machinery to buy',
  subtitle: 'The decision that shapes the whole case: one piece or many? First you disarm a trap, then you do the math.',
  minutes: 12,
  learn: [
    'Recognize the <strong>Entity Trap</strong> and why it fails.',
    'Read a value map of architecture styles and understand why the context decides, not the table alone.',
    'Explain what a <strong>modular monolith</strong> is and how you design one so modules can be extracted later.',
    'Reframe the question “monolith or microservices?” as a calculation of volume, team and cost.',
  ],
  extraDocs: ['adr-002'],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'How much machinery to buy',
      blocks: [
        { t: 'p', html: 'With the rules from the previous chapter in place, it’s time for the style decision. If you’ve been listening to talks about microservices, you should first disarm a trap that, according to the judges themselves, caught several teams in the kata.' },
      ],
    },
    {
      id: 'trampa',
      kicker: 'The trap',
      title: 'One component per noun',
      visual: { scene: 'entitytrap', state: 'nouns' },
      describe: '<p>The sentence “a user picks a menu, builds an order, pays for it and picks it up from a fridge” yields five services, one per noun: user, menu, order, payment and fridge.</p>',
      blocks: [
        { t: 'p', html: `Richards &amp; Ford’s official slides call it the ${c('entity-trap', 'Entity Trap')}: you write down the business nouns (user, menu, order) and create one component for each.` },
        { t: 'p', html: 'It sounds tidy. Every box has a clear name and does the basics with its data: create, read, update, delete.' },
      ],
    },
    {
      id: 'flujos',
      kicker: 'The trap',
      title: 'Life moves in workflows, not nouns',
      visual: { scene: 'entitytrap', state: 'flows' },
      describe: '<p>A single real workflow, buying a meal, has to pass through all five services in a row. Every business change cuts across all of them.</p>',
      blocks: [
        { t: 'p', html: 'And it fails. A real workflow, like buying a meal, doesn’t live in any one box: it cuts across all of them. Every business change ends up touching five components at once.' },
        { t: 'p', html: 'The winning team avoided it by modeling <strong>actor actions</strong> (select, pay, pick up, schedule, cancel), not collections of things. That model is drawn in the next chapter.' },
      ],
    },
    {
      id: 'restricciones',
      kicker: 'The math',
      title: 'Four constraints and one number',
      visual: { scene: 'constraints' },
      blocks: [
        { t: 'p', html: 'Once the trap is identified, comparing styles becomes a concrete calculation.' },
        { t: 'p', html: `On one side, the number from chapter 1: less than one request per second. On the other, the client’s four hard constraints ${doc('constraints')}: a limited team, critical time-to-market, AWS and a very limited budget.` },
      ],
    },
    {
      id: 'mapa-valores',
      kicker: 'The math',
      title: 'The value map in ADR 002',
      visual: { scene: 'valuemap', props: { correct: 3 } },
      describe: '<p>Table from ADR 002: four styles (monolith, microservices, micro-kernel, modularized monolith) rated on ten attributes, from strongly negative to strongly promotes. Microservices strongly promote almost everything except ease of deployment, traceability and integrity. The modularized monolith strongly promotes deployment, performance and security.</p>',
      blocks: [
        { t: 'p', html: `${doc('adr-002', 'ADR 002')} compares four styles against ten quality attributes. Go through the table: microservices strongly promote almost everything.` },
        {
          t: 'predict',
          question: 'With a small team, critical time-to-market and a minimal budget, which column would you pick?',
          options: [
            { label: 'Monolith', feedback: 'Easy to deploy, but strongly negative on autonomy and scalability: it shuts the door on growth.' },
            { label: 'Microservices', feedback: 'It wins on the table alone, but loses exactly where the context matters: ease of deployment and integrity, with a small team.' },
            { label: 'Micro-kernel', feedback: 'Balanced, but negative on deployment and scalability.' },
            { label: 'Modularized monolith', correct: true, feedback: '<strong>That’s what the team chose.</strong> Easy deployment today, and no door shut: that’s why the context weighs more than the number of “++”.' },
          ],
        },
      ],
    },
    {
      id: 'decision',
      kicker: 'The decision',
      title: 'A modular monolith',
      visual: { scene: 'modmono', state: 'inside' },
      describe: '<p>A single deployable application with six modules (catalog, orders, schedule, payments, feedback, promotions). Each module has strict boundaries and talks to the others through messages, as if there were a network between them.</p>',
      blocks: [
        { t: 'p', html: `A ${c('monolito-modular', 'modular monolith')}: one application, on a few AWS machines, divided inside into modules with strict boundaries.` },
        { t: 'p', html: 'Each module talks to the others through contracts, <strong>as if there were a network between them</strong>, even though there isn’t.' },
        { t: 'decision', id: 'monolith' },
      ],
    },
    {
      id: 'extraer',
      kicker: 'The decision',
      title: 'Designed for extraction',
      visual: { scene: 'modmono', state: 'extract' },
      describe: '<p>When telemetry shows high load on the catalog, that module leaves the monolith as its own service, with several replicas. The messages it receives are the same as before: the boundary already existed.</p>',
      blocks: [
        { t: 'p', html: 'That’s what the contracts are for: the day telemetry justifies it, any module can move out as an independent service without rewriting the others.' },
        { t: 'callout', tone: 'warn', title: 'The price', html: 'The ADR itself admits it: without discipline in inter-module communication, it will be “just a monolith with a tendency towards the big ball of mud”. Internal contracts, per-module telemetry and constant review are the counterweight.' },
      ],
    },
    {
      id: 'pizarra',
      kicker: 'The evidence',
      title: 'The sticky note that anticipated everything',
      visual: { scene: 'whiteboard' },
      evidence: { src: '/img/whiteboard-menu-plugins.png', alt: 'The team’s original whiteboard: the menu as a core surrounded by plug-ins, and a sticky note', caption: 'The original whiteboard from the detailed design session on October 29, 2020.' },
      describe: '<p>The Menu core in the center, surrounded by extensions: nutrition, recommendations, reviews, discounts, front-end, meals and filtering. The core runs on a machine with 4 cores and 8 GB. Separately, a 1-core, 2 GB piece with a load balancer and its own package, which scales on its own, connected through messages. A sticky note sets the policy: communication through messaging, designed to decouple later, and a cache if the core gets congested.</p>',
      blocks: [
        { t: 'p', html: 'The repository also keeps the step between the conversation and the polished diagram: the real whiteboard from a design session on October 29, 2020.' },
        { t: 'p', html: 'Walk through it in the diagram. The asymmetry between the big box and the small one already hints at the modular monolith, and the sticky note spells it out.' },
        { t: 'p', html: 'Designing for future extraction didn’t come from a book: it came from a session with markers.' },
      ],
    },
    {
      id: 'descartes',
      kicker: 'The rejects',
      title: 'Both extremes, rejected in writing',
      visual: { scene: 'spectrum' },
      blocks: [
        { t: 'p', html: 'In case there’s any doubt about the range of options: the team also rejected both extremes, and wrote down why.' },
        { t: 'p', html: 'The modular monolith is the <strong>deliberate middle point</strong>. Select each point on the spectrum to read the quote.' },
      ],
    },
    {
      id: 'contrapunto',
      kicker: 'The counterpoint',
      title: 'Myagis-Forest took the opposite exit',
      visual: { scene: 'fork' },
      blocks: [
        { t: 'p', html: 'The other finalist looked at the same fork and chose the opposite, also in writing.' },
        { t: 'p', html: 'Their ADR 001 explicitly rejects the staged path (modular monolith first, microservices later) and bets on microservices with Docker from day one.' },
        { t: 'p', html: 'Two serious teams, opposite exits: the first law of architecture working in practice, not in theory.' },
      ],
    },
    {
      id: 'leccion',
      kicker: 'The lesson',
      title: 'The question was badly framed',
      visual: { scene: 'reframe' },
      blocks: [
        { t: 'p', html: '“Monolith or microservices?” is badly framed from the start. It invites an argument about taste.' },
        { t: 'callout', tone: 'note', title: 'The transferable lesson', html: 'The right question: <strong>what real volume do I have, what team do I have, and how much does each style cost in that context?</strong>' },
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
              q: 'What is the Entity Trap?',
              options: ['Creating one component per business noun', 'Using too many databases', 'Always choosing microservices', 'Not documenting the entities'],
              answer: 0,
              why: 'It sounds tidy, but real workflows cut across every box. The team modeled actor actions instead.',
            },
            {
              q: 'In the value map, microservices promote almost everything. Why didn’t they win?',
              options: ['Because their licenses were expensive', 'Because AWS doesn’t support them', 'Because the jury banned them', 'Because the context (small team, fast time-to-market) weighs more than the number of “++”'],
              answer: 3,
              why: 'They lose exactly on ease of deployment and integrity, which matter most with a small team and little time.',
            },
            {
              q: 'What lets you extract a module from the modular monolith without rewriting the others?',
              options: ['Having a single database', 'Using a modern language', 'Modules talking through contracts, as if there were a network', 'Deploying everything on a single machine'],
              answer: 2,
              why: 'The boundary already existed: the extracted module receives the same messages as before.',
            },
            {
              q: 'What risk does ADR 002 itself admit?',
              options: ['That AWS raises its prices', 'That without discipline the monolith ends up as a big ball of mud', 'That the team doesn’t know Docker', 'None'],
              answer: 1,
              why: 'An honest ADR names its price. The counterweight: internal contracts, telemetry and constant review.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials before moving on.' },
        { t: 'p', html: 'A modular monolith only works if the modules are cut well. Where do you cut? That’s the next chapter.' },
      ],
    },
  ],
};
