import type { Chapter } from '../types';
import { c, doc } from './helpers';

export const guia: Chapter = {
  id: 'guia',
  number: 11,
  phase: 'Takeaways',
  title: 'Field guide',
  subtitle: 'The method in four steps, for your next system.',
  minutes: 10,
  learn: [
    'Name the four steps of the method <strong>in order</strong>, and say why the order matters.',
    'Point to the moment in the case where each step happened.',
    'Turn each step into a question for <strong>your own next system</strong>.',
    'Know where to check every claim: the teams’ public repositories.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'Field guide',
      blocks: [
        {
          t: 'p',
          html: 'Take away the Farmacy Food case and a method you can apply to any project remains. The winning team ran it in a fixed order, and the order is part of the method. This last chapter folds the ten previous ones into four steps you can take to your next system.',
        },
      ],
    },

    /* ── the method ── */
    {
      id: 'metodo',
      kicker: 'The method',
      title: 'Take away the case, a method remains',
      visual: { scene: 'guide-method', state: 'overview' },
      describe:
        '<p>Four steps in a row, joined by arrows: 1, understand the business; 2, set principles; 3, design for reality; 4, close with the bill. Under each step, the chapters where it happened: 1 and 3 for the first; 3, 4 and 10 for the second; 5, 6, 7 and 8 for the third; 2 and 9 for the fourth.</p>',
      blocks: [
        { t: 'p', html: 'Ten chapters of fridges, events and invoices. Remove the Farmacy Food details and what is left is a method for any project, in four steps.' },
        { t: 'p', html: 'The winning team ran them in this order: <strong>understand the business, set principles, design for reality, close with the bill</strong>. The order is part of the method.' },
        { t: 'p', html: 'The numbers under each step are the chapters where you saw it happen. The next screens go through them one by one.' },
      ],
    },

    /* ── step 1 ── */
    {
      id: 'entender',
      kicker: 'Step 1 · Understand',
      title: 'Understand the business before the software',
      visual: { scene: 'guide-method', state: 's1' },
      describe:
        '<p>Step 1 highlighted. Where it happened: in chapter 1, 42 meals a day turned out to be less than one request per second; in chapter 3, a first week of business documents with no diagrams, and questions for the client instead of invented answers; in chapter 1, what was not the architect’s problem, written down. Takeaway: knowing the real volume is the fact that settles everything else.</p>',
      blocks: [
        { t: 'p', html: `One week of questions, numbers and glossary before the first diagram. In chapter 3 you saw the team’s first week: business documents, a list of questions for the client ${doc('questions')}, and not a single software diagram.` },
        { t: 'p', html: 'The goal is not to fill folders. It is to find the fact that settles everything else: <strong>how many requests per second the real system handles</strong>, not the imaginary one.' },
      ],
    },
    {
      id: 'vara',
      kicker: 'Step 1 · Understand',
      title: 'One number, many decisions',
      visual: { scene: 'guide-yardstick' },
      describe:
        '<p>On the left, crossed out, the imaginary system: thousands of requests per second, the scale of a mass-market app. Below it, the real one: less than one request per second, 42 meals a day. From the real number come four decisions: a modular monolith with no distributed machinery (chapter 4), scaling up before building a cluster (chapter 8), the free tier of Here Maps, whose 250,000 monthly requests were plenty (chapter 5), and about 1,000 dollars a month to run the whole business (chapter 9).</p>',
      blocks: [
        { t: 'p', html: 'In chapter 1 you did the math: 42 meals a day is <strong>less than one request per second</strong>, even at the annual target. Look how far that single number reaches.' },
        { t: 'p', html: 'It ruled out distributed machinery, put scaling up before scaling out, made a free map tier enough and set the whole business at about $1,000 a month.' },
        { t: 'decision', id: 'scale-up' },
      ],
    },

    /* ── step 2 ── */
    {
      id: 'principios',
      kicker: 'Step 2 · Principles',
      title: 'Set tie-breakers before tools',
      visual: { scene: 'guide-method', state: 's2' },
      describe:
        '<p>Step 2 highlighted. Where it happened: in chapter 3, four principles distilled from the constraints, and every decision recorded in an ADR with its downsides; in chapter 4, the style decided by arithmetic, not by taste; in chapter 10, the structural decisions, each with its trade-off. Takeaway: criteria first, tools second.</p>',
      blocks: [
        { t: 'p', html: `The team signed its four principles before discussing any technology, and wrote each decision down in an ${c('adr', 'ADR')}, downsides included.` },
        {
          t: 'predict',
          question: 'Two designers on your team deadlock over two tools. What was missing?',
          options: [
            { label: 'More benchmarks comparing both tools', feedback: 'Numbers help, but without criteria nobody agrees on what winning means.' },
            { label: 'Tie-breaking criteria agreed on before any tool', correct: true, feedback: '<strong>That’s it.</strong> Without prior criteria, the architecture debate becomes a war of tastes. Principles break the tie.' },
            { label: 'Someone senior enough to just decide', feedback: 'That ends the meeting, not the debate: the next tie starts from zero.' },
            { label: 'A bigger budget to try out both tools', feedback: 'The case had a tight budget, and trying both won’t tell you which to keep.' },
          ],
        },
      ],
    },
    {
      id: 'desempate',
      kicker: 'Step 2 · Principles',
      title: 'Four principles, four ties broken',
      visual: { scene: 'guide-tiebreak' },
      describe:
        '<ol><li>Many services or one? Cognitive simplicity: one modular application, because complexity must pay for itself (chapter 4).</li><li>Split the modules today? Evolvability: design to extract later, when telemetry justifies it (chapter 4).</li><li>Scale up or scale out? Mandatory telemetry: a bigger machine first, with thresholds of 75% CPU and 85% memory (chapter 8).</li><li>Call or send a message? Messages over calls: commands, events and a log, so nobody waits for another part to be alive (chapters 5 and 8).</li></ol>',
      blocks: [
        { t: 'p', html: 'A principle earns its place when it settles a real argument. Here are four ties from the case, and the principle that broke each one.' },
        { t: 'p', html: 'None of them names a technology. They come from the constraints you saw in chapter 3: a small team, growth from 2 to 68 locations, the cost of scaling blind and systems the team did not control.' },
      ],
    },

    /* ── step 3 ── */
    {
      id: 'realidad',
      kicker: 'Step 3 · Reality',
      title: 'Design for the physical reality, not the ideal one',
      visual: { scene: 'guide-method', state: 's3' },
      describe:
        '<p>Step 3 highlighted. Where it happened: in chapter 5, the question of what happens to the business if a piece fails; in chapter 6, one actor per fridge and a PIN for when there is no signal; in chapter 7, kitchens that can answer “can’t do” or “delayed”; in chapter 8, every risk with its mitigation written next to it. Takeaway: expect the problems prepared.</p>',
      blocks: [
        { t: 'p', html: 'Fridges lose signal, data arrives late, disputes arrive anyway. From chapter 5 on, the design kept asking the same question: <strong>what happens to the business when this fails?</strong>' },
        { t: 'p', html: 'The answers are spread over four chapters: an actor per fridge, a PIN that works offline, kitchens that can say “delayed”, a list where every risk carries its mitigation.' },
      ],
    },
    {
      id: 'preparados',
      kicker: 'Step 3 · Reality',
      title: 'Ready when the problem knocks',
      visual: { scene: 'guide-ready' },
      describe:
        '<ol><li>The fridge loses signal: a PIN generated in advance (chapter 6, ADR 011).</li><li>Stock data arrives late: a local catalog, with the stock checked at payment (chapter 6, ADRs 012 and 013).</li><li>A customer disputes a charge: every order kept as events (chapter 6, ADR 007).</li><li>The payment gateway goes down: orders stored and retried (chapter 8, the risk list).</li><li>The meal gets physically stuck: a photo, a human review and compensation (chapter 6, the rainy day).</li></ol>',
      blocks: [
        { t: 'p', html: 'Side by side, the pattern is plain: every problem of the physical world found its answer already waiting in the design.' },
        { t: 'p', html: `The risk list works the same way ${doc('risks')}. And when there was no technical answer, like a fridge that physically fills up, the team wrote it down as a decision for the business.` },
        { t: 'callout', tone: 'note', title: 'The step in one line', html: 'Architecture waits for problems <strong>prepared</strong>, instead of pretending they don’t exist.' },
      ],
    },

    /* ── step 4 ── */
    {
      id: 'factura',
      kicker: 'Step 4 · The bill',
      title: 'Close with the bill',
      visual: { scene: 'guide-method', state: 's4' },
      describe:
        '<p>Step 4 highlighted. Where it happened: in chapter 2, the podium’s question turned out to be economic, not technical; in chapter 9, bytes and frequencies before choosing servers, three scenarios from 12,248 to 22,481 dollars a year, and paid monitoring because the team’s hours cost too. Takeaway: the client doesn’t deploy diagrams, they deploy invoices.</p>',
      blocks: [
        { t: 'p', html: 'An architecture without an estimated yearly cost is incomplete: <strong>the client doesn’t deploy diagrams, they deploy invoices</strong>.' },
        { t: 'p', html: `It was there in chapter 2, when the podium’s question turned out to be economic. And in chapter 9 the team closed with a spreadsheet: volumes first, then the ${c('tco', 'total cost of ownership')} in three scenarios.` },
        { t: 'p', html: 'Of the kata’s ten finalists, theirs was the only submission with a cost analysis.' },
      ],
    },
    {
      id: 'horas',
      kicker: 'Step 4 · The bill',
      title: 'The line no invoice shows',
      visual: { scene: 'guide-invoice', props: { correct: 2 } },
      evidence: {
        src: '/img/1y-min-tco.png',
        alt: 'The team’s yearly cost distribution by service, in three scenarios',
        caption: 'The team’s yearly budget, by service. The invoice redraws the minimum scenario, the first pie.',
      },
      describe:
        '<p>Year-one invoice in the minimum scenario: monitoring (DataDog) 3,336 dollars, machines (EC2) 3,115, database (DynamoDB) 3,072, reporting (Tableau) 1,440, and everything else (queues, streaming, notifications, files, VPN) 1,285. Total: 12,248 dollars a year; 12,548 in the projected scenario and 22,481 in rapid growth. The line no invoice shows: self-hosting the free stack costs nothing in licenses, but it costs the team’s hours.</p>',
      blocks: [
        { t: 'p', html: `Cost includes the hours of whoever maintains each piece. That is how the team’s spreadsheet ${doc('cost-analysis')} defended its most expensive line.` },
        {
          t: 'predict',
          question: 'Free open-source monitoring or a $3,336-a-year subscription: for a small team, which costs less?',
          options: [
            { label: 'The free one: no license, no cost', feedback: 'The license is free; keeping it alive is not. Someone on the team has to run those servers.' },
            { label: 'Both end up costing about the same', feedback: 'The team compared the options: the self-hosted one needed in-house maintenance, and that tipped the scale.' },
            { label: 'The subscription, once you count the hours', correct: true, feedback: '<strong>Exactly.</strong> Grafana and ELK were rejected for demanding in-house maintenance: developer hours, the scarcest thing in a small team.' },
            { label: 'Whichever one runs on fewer servers', feedback: 'Servers are the visible part. The bigger cost was the hours of the people maintaining them.' },
          ],
        },
      ],
    },

    /* ── the order ── */
    {
      id: 'orden',
      kicker: 'The order',
      title: 'Skip a step and it shows',
      visual: { scene: 'guide-method', state: 'skip' },
      describe:
        '<p>The four steps, and under each one what happens without it. Without step 1, you design for the imaginary system, not the real one. Without step 2, every technical debate becomes a war of tastes. Without step 3, problems arrive and find a design that pretended they didn’t exist. Without step 4, the architecture is incomplete: nobody knows what it costs to run. The order is part of the method.</p>',
      blocks: [
        { t: 'p', html: 'The four steps are not a menu to pick from. Each one feeds the next: the principles are distilled from the constraints you understood, and the design follows the principles.' },
        { t: 'p', html: 'Look at what each missing step leaves behind.' },
        { t: 'callout', tone: 'info', title: 'The whole method', html: '<strong>Understand → principles → design for reality → the bill.</strong> In that order.' },
      ],
    },

    /* ── checkpoint ── */
    {
      id: 'checkpoint',
      kicker: 'Checkpoint',
      title: 'Four questions to close the course',
      visual: {
        scene: 'quiz',
        props: {
          questions: [
            {
              q: 'A new brief lands on your desk. What comes first, before any diagram?',
              options: [
                'Choosing the cloud provider and the stack',
                'Drawing the ideal system’s architecture',
                'Understanding the business and its numbers',
                'Estimating the yearly cost of each style',
              ],
              answer: 2,
              why: 'One week without diagrams. Knowing how many requests per second the real system handles is the fact that settles everything else.',
            },
            {
              q: 'Two designers deadlock over two tools. Which step of the method should have prevented it?',
              options: [
                'Setting tie-breaking principles before discussing tools',
                'Estimating the yearly bill before choosing anything',
                'Asking the client for a larger budget first',
                'Letting the most senior person make the call',
              ],
              answer: 0,
              why: 'Without prior criteria, the architecture debate becomes a war of tastes. In the case, every technical decision traces back to one of the four principles.',
            },
            {
              q: 'A fridge in a basement will lose signal sooner or later. What does designing for reality mean here?',
              options: [
                'Assume a stable connection and fix it later',
                'Require perfect coverage at every point of sale',
                'Block every sale while there is no signal',
                'Prepare for it: a PIN the fridge validates offline',
              ],
              answer: 3,
              why: 'Architecture waits for problems prepared instead of pretending they don’t exist. The pickup is reported when the signal comes back.',
            },
            {
              q: 'Why was paid monitoring cheaper than the free alternative?',
              options: [
                'Because the provider offered a startup discount',
                'Because the free stack eats developer hours',
                'Because monitoring was optional for this volume',
                'Because the servers came free with the cloud',
              ],
              answer: 1,
              why: 'Cost includes the hours of the people who maintain each piece. For a small team, those hours are the most expensive resource.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'The last review is about the method, not the case.' },
        { t: 'p', html: 'One screen left: the four steps as questions to carry with you, and the way back to the course map.' },
      ],
    },

    /* ── closing ── */
    {
      id: 'cierre',
      kicker: 'Your turn',
      title: 'Your next system, in four questions',
      visual: { scene: 'guide-card' },
      describe:
        '<ol><li>Understand the business: what volume does the real system handle, and what is not my problem? (chapters 1 and 3)</li><li>Set the principles: which criteria break the tie when two options deadlock? (chapters 3, 4 and 10)</li><li>Design for reality: what will fail in the physical world, and what does the design do then? (chapters 5 to 8)</li><li>Close with the bill: what does it cost per year, counting the people who maintain it? (chapters 2 and 9)</li></ol><p>Below, a link back to the course map and another to the repositories on GitHub.</p>',
      blocks: [
        { t: 'p', html: 'That is the whole method. The fridges stay in Detroit; the four questions travel with you.' },
        { t: 'p', html: 'Every document cited in this course lives in the public repositories of <a href="https://github.com/TheKataLog" target="_blank" rel="noopener noreferrer">TheKataLog on GitHub</a>. To see three teams solve the same problem in opposite ways, comparing their repositories is the best way to keep going.' },
        { t: 'p', html: 'This course is an independent teaching analysis of the competition’s public material, with Richards &amp; Ford and Rozanski &amp; Woods as its theoretical framework.' },
      ],
    },
  ],
};
