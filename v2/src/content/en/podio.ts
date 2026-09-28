import type { Chapter } from '../types';
import { c } from './helpers';

export const podio: Chapter = {
  id: 'podio',
  number: 2,
  phase: 'The problem',
  title: 'The podium’s dilemma',
  subtitle: 'Ten teams, the same brief. Three finalists with opposing answers to a single question, and the actual yardstick the jury measured them with.',
  minutes: 7,
  learn: [
    'Compare the three finalist positions as different answers to the <strong>same economic question</strong>.',
    'Explain why none of the three is “the right one” (the first law).',
    'Name the seven criteria the jury used to evaluate each proposal.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'The podium’s dilemma',
      blocks: [
        { t: 'p', html: 'With the number from the previous chapter in hand (fewer than one request per second), it is time to see what the competing teams did with it. This chapter is a hinge: it closes the problem and opens the question of how to think about it.' },
      ],
    },
    {
      id: 'pregunta',
      kicker: 'The question',
      title: 'Ten teams, the same brief',
      visual: { scene: 'teams' },
      blocks: [
        { t: 'p', html: 'Ten teams received exactly the brief you just walked through. The finalist solutions split into <strong>three opposing positions</strong> on the same question.' },
        { t: 'p', html: 'It is not a technical question, it is an economic one: how much machinery do you buy today for a business that sells 42 meals a day?' },
      ],
    },
    {
      id: 'archcolider',
      kicker: 'Three positions',
      title: 'ArchColider: cheap today, splittable tomorrow',
      visual: { scene: 'styles', state: 'arch' },
      describe: '<p>Five modules (catalog, orders, payments, loyalty, reporting) inside a single application, separated by strict boundaries, on one database and a few AWS machines.</p>',
      blocks: [
        { t: 'p', html: 'The team that went on to win concluded that standing up distributed infrastructure for that volume was a waste of money and time.' },
        { t: 'p', html: `It proposed a ${c('monolito-modular', 'monolith divided into strictly bounded modules')}, on a few AWS machines: cheap today, easy to split tomorrow if needed.` },
        { t: 'p', html: 'Look at the diagram: the same five modules will rearrange themselves over the next two screens.' },
      ],
    },
    {
      id: 'myagis',
      kicker: 'Three positions',
      title: 'Myagis-Forest: microservices from day one',
      visual: { scene: 'styles', state: 'forest' },
      describe: '<p>The same five modules, now as independent microservices: each with its own container, database and deployment, talking to each other over the network.</p>',
      blocks: [
        { t: 'p', html: 'The runner-up argued exactly the opposite: splitting a monolith later means <strong>doing the work twice</strong>.' },
        { t: 'p', html: 'It stood up microservices from day one, with impeccable domain modeling. The price: a much higher fixed operating cost for a startup that is only just validating its market.' },
      ],
    },
    {
      id: 'jedis',
      kicker: 'Three positions',
      title: 'Jedis: everything goes through an event bus',
      visual: { scene: 'styles', state: 'jedis' },
      describe: '<p>The same five modules, connected to an event bus (Kafka) that carries every stock movement and every purchase in real time.</p>',
      blocks: [
        { t: 'p', html: 'The third-place team bet on future analytics: a platform centered on an <strong>event bus</strong> that records every stock movement and every purchase in real time.' },
        { t: 'p', html: 'It enables recommendations and live data, at the cost of running an oversized messaging platform during the first months.' },
      ],
    },
    {
      id: 'compensacion',
      kicker: 'None is the right one',
      title: 'Three bets, three prices',
      visual: { scene: 'bets' },
      blocks: [
        { t: 'p', html: 'None of the three is “the right one”. Each position decides what <strong>not</strong> to pay for today, and accepts a different price in exchange.' },
        { t: 'p', html: 'This is the first law of Richards &amp; Ford, which the judges themselves repeat at every kata: <em>in architecture there are no right or wrong decisions, everything is a trade-off</em>.' },
        { t: 'callout', tone: 'note', title: 'No verdict yet', html: 'Why the first position won the jury over comes with numbers two chapters later. First you need to understand how the team reasoned.' },
      ],
    },
    {
      id: 'jurado',
      kicker: 'The jury’s yardstick',
      title: 'What did the jury reward?',
      visual: { scene: 'rubric', state: 'hidden', props: { correct: 3 } },
      blocks: [
        { t: 'p', html: 'The semifinal jury brought together four top-tier architects. Their evaluation deck is in the team’s repository, with the rubric in writing.' },
        {
          t: 'predict',
          question: 'What do you think the jury measured in each proposal?',
          options: [
            { label: 'How modern the chosen technology was', feedback: 'None of the seven criteria mentions modernity.' },
            { label: 'The flashiest diagram', feedback: 'Diagrams count, but for their clarity and completeness, not for how flashy they are.' },
            { label: 'The cheapest solution', feedback: 'Cost matters, but there is no “cheapest one wins” criterion.' },
            { label: 'Whether you can follow the reasoning, from business to decision', correct: true, feedback: '<strong>That’s it.</strong> The rubric measures traceability: understanding the problem, justifying every decision and explaining it clearly.' },
          ],
        },
      ],
    },
    {
      id: 'rubrica',
      kicker: 'The jury’s yardstick',
      title: 'Seven criteria in writing',
      visual: { scene: 'rubric', state: 'full' },
      describe: '<ol><li>Clarity of narrative, organization, and supporting documentation.</li><li>Understanding of the requirements and completeness of solution.</li><li>Identification of supporting architecture characteristics.</li><li>Diagrams: types, level of detail, completeness.</li><li>Overall systems architecture.</li><li>Integration architecture for the required third-party systems.</li><li>ADRs: documentation and justification of decisions.</li></ol>',
      blocks: [
        { t: 'p', html: `“Quality of reasoning” was not a vague impression. The third criterion asks you to identify the ${c('quality-attributes', 'quality attributes')} that matter; the last one, to justify every decision.` },
        { t: 'p', html: 'Open each criterion in the diagram. The jury did not reward the flashiest drawing but <strong>full traceability</strong>: from business to decision, and from decision to its cost.' },
        { t: 'p', html: 'It is the same yardstick you can apply to any architecture proposal, inside or outside a contest.' },
      ],
    },
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Three questions before moving on',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'What question did the three finalists answer in opposite ways?',
              options: ['Which programming language to use', 'How much machinery to buy today for a business selling 42 meals a day', 'Which cloud to choose', 'How to design the mobile app'],
              answer: 1,
              why: 'The three positions are three answers to the same economic question: how much system to build today, and what to leave for later.',
            },
            {
              q: 'Myagis-Forest chose microservices from day one. What was its argument?',
              options: ['That they were cheaper to operate', 'That splitting a monolith later means doing the work twice', 'That the jury preferred them', 'That Kafka required them'],
              answer: 1,
              why: 'It is a serious argument. The price it accepted was a higher fixed operating cost while the business is being validated.',
            },
            {
              q: 'What does the first law of software architecture say?',
              options: ['Why is more important than how', 'Everything is a trade-off: there are no right or wrong decisions', 'Microservices always scale better', 'The simplest solution always wins'],
              answer: 1,
              why: '“Why is more important than how” is the second law, and it shows up in the next chapter.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials before moving on.' },
        { t: 'p', html: 'To understand why ArchColider’s reasoning won the jury over, you have to step back: before drawing a single box, the team set <strong>its own rules of the game</strong>. That is next.' },
      ],
    },
  ],
};
