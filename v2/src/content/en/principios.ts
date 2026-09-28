import type { Chapter } from '../types';
import { c, doc } from './helpers';

export const principios: Chapter = {
  id: 'principios',
  number: 3,
  phase: 'The decision framework',
  title: 'The rules before the first diagram',
  subtitle: 'First you read the business, then you set tie-breaking criteria, and only then do you design. The order is the method.',
  minutes: 11,
  learn: [
    'Recognize the order of the method: <strong>read the business</strong> before you draw.',
    'Explain the team’s four principles and which constraint each one comes from.',
    'Follow the <strong>traceability</strong> from a business goal to an architectural requirement.',
    'Read and write an ADR: context, decision and consequences, including the negative ones.',
  ],
  extraDocs: ['business-goal', 'constraints', 'functional-reqs', 'questions', 'glossary', 'adr-001'],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'The rules before the first diagram',
      blocks: [
        { t: 'p', html: 'The previous chapter left you with one idea: the jury rewarded the quality of the reasoning. This chapter shows how that reasoning is <strong>done</strong>, in the same order the team did it.' },
      ],
    },
    {
      id: 'semana-cero',
      kicker: 'Week zero',
      title: 'A week without a single diagram',
      visual: { scene: 'weekzero' },
      blocks: [
        { t: 'p', html: 'The winning team’s repository has a telling detail: during the first week there is not a single software diagram.' },
        { t: 'p', html: 'There are business documents: goals, constraints, questions to the client, a vocabulary glossary. You can open each one from the panel.' },
        { t: 'callout', tone: 'note', title: 'The method’s first sacrifice', html: 'Don’t start with the solution. Reading the business is boring, and that is why it works.' },
      ],
    },
    {
      id: 'releer',
      kicker: 'Week zero',
      title: 'Reading the brief out loud',
      visual: { scene: 'reqs' },
      describe: '<p>The eight requirements from the brief, each one reread as a usage scenario. The first one, integrating with the fridges, was flagged as vague and probably out of scope, because the fridges’ management system already handled it. The third and fourth are grouped together: support occasional users and support cash payments.</p>',
      blocks: [
        { t: 'p', html: `The brief had arrived as <strong>eight raw requirements</strong>. The first task was to reread it and rewrite it as usage scenarios ${doc('functional-reqs')}.` },
        { t: 'p', html: 'The first one, integrating with the fridges, was flagged as <em>“quite vague and out of scope […] Need clarification”</em>: that integration was already handled by the fridges’ management system.' },
        { t: 'p', html: 'Questioning the brief before you fulfill it is the architect’s second tool.' },
      ],
    },
    {
      id: 'preguntas',
      kicker: 'Week zero',
      title: 'Ask instead of inventing',
      visual: { scene: 'questions' },
      blocks: [
        { t: 'p', html: `The questions are not generic. The team wrote the client a concrete list ${doc('questions')}, with the edge cases a developer usually discovers late, in production.` },
        { t: 'p', html: 'Instead of <strong>inventing</strong> a convenient answer for each ambiguity, they write it down and send it to the business owner. Every answer can change the design; inventing it would have hidden that.' },
      ],
    },
    {
      id: 'marco',
      kicker: 'The framework',
      title: 'Viewpoints and Perspectives',
      visual: { scene: 'views' },
      evidence: { src: '/img/view-context.png', alt: 'The team’s view map: deployment, operational, development and software structure', caption: 'The team’s own view map, from the views and perspectives folder in the repository.' },
      describe: '<p>The software structure is made up of three views: functional, information and concurrency. The deployment view defines how it is deployed; the operational view, how it is operated; the development view, its implementation constraints. Perspectives, such as security or performance, cut across all the views.</p>',
      blocks: [
        { t: 'p', html: 'Only then does the method that organized the rest of the work appear: <strong>Viewpoints and Perspectives</strong>, the Rozanski &amp; Woods framework.' },
        { t: 'p', html: 'It describes an architecture from several <strong>views</strong> (functional, information, concurrency, deployment…) crossed with <strong>perspectives</strong>: the quality attributes that cut across all of them.' },
        { t: 'p', html: 'You don’t need to memorize it: each view comes back in its own chapter.' },
      ],
    },
    {
      id: 'principios',
      kicker: 'Principles',
      title: 'Four tie-breaking criteria',
      visual: { scene: 'principles', state: 'list' },
      describe: '<ol><li>Cognitive simplicity: if an option can’t be explained easily, it is discarded.</li><li>Evolvability over premature optimization: modules that are easy to extract tomorrow, without extracting them today.</li><li>Mandatory telemetry: every module is measured.</li><li>Messages over direct calls.</li></ol>',
      blocks: [
        { t: 'p', html: 'Before applying the framework, the team signed off on four guiding principles. Their job is practical: when two designers get stuck arguing over options, <strong>the principles break the tie</strong>.' },
        {
          t: 'list',
          items: [
            '<strong>Cognitive simplicity.</strong> Complexity that doesn’t justify itself doesn’t get bought.',
            '<strong>Evolvability over premature optimization.</strong> Design to extract tomorrow, without extracting today.',
            `<strong>Mandatory ${c('telemetry', 'telemetry')}.</strong> Scaling decisions are made with data.`,
            '<strong>Messages over direct calls.</strong> No part depends on another being alive at that exact moment.',
          ],
        },
      ],
    },
    {
      id: 'destilados',
      kicker: 'Principles',
      title: 'Principles are distilled from constraints',
      visual: { scene: 'principles', state: 'map' },
      describe: '<p>A small team and a minimal budget lead to cognitive simplicity. The goal of going from 2 to 68 locations leads to evolvability. The cost of scaling blind leads to mandatory telemetry. The external systems they don’t control lead to preferring messages over calls.</p>',
      blocks: [
        { t: 'p', html: 'None of them is abstract philosophy: each one answers a concrete pressure of the case. Look at how they connect in the diagram.' },
        { t: 'p', html: 'And the order matters: setting tie-breaking criteria <em>before</em> discussing technologies is what keeps the discussion from turning into a war of tastes.' },
        { t: 'callout', tone: 'info', title: 'Takeaway', html: 'Good principles are not invented: they are <strong>distilled from constraints</strong>.' },
      ],
    },
    {
      id: 'trazabilidad',
      kicker: 'Traceability',
      title: 'From business goal to requirement',
      visual: { scene: 'trace', state: 'predict', props: { correct: 1 } },
      blocks: [
        { t: 'p', html: `Among the documents there is one that is almost nothing but a table ${doc('business-drivers')}: it connects each business <em>driver</em> to the requirements that will actually shape the architecture.` },
        {
          t: 'predict',
          question: 'Driver 1 is converting occasional users into subscribers. Which of these requirements comes from it?',
          options: [
            { label: 'Microservices from day one', feedback: 'That is a solution, not a requirement. Drivers talk about the business.' },
            { label: 'Being able to buy without registering first', correct: true, feedback: '<strong>Exactly.</strong> If an occasional user has to create an account to buy, they don’t buy. Look at how many more come from the same driver.' },
            { label: 'A dashboard for nutritionists', feedback: 'It isn’t in the table. Health specialists have their own driver, number 6.' },
          ],
        },
      ],
    },
    {
      id: 'tabla',
      kicker: 'Traceability',
      title: 'The table that decides everything',
      visual: { scene: 'trace', state: 'full' },
      describe: '<p>Six business drivers and ten architecturally significant requirements. For example: maximizing the guarantee of each meal pickup comes from drivers 1 and 5, and ends up justifying the offline PIN pickup in chapter 6.</p>',
      blocks: [
        { t: 'p', html: `With a joke that stayed in their presentation script ${doc('script')}, the team called these requirements the <strong>SAD</strong> (Significant Architectural Drivers), because they “usually make a budget and architects SAD”: they show how much work there is.` },
        { t: 'p', html: 'Notice the last one: <strong>maximizing the guarantee of each meal pickup</strong>. It comes back in chapter 6 and ends up justifying the offline PIN pickup.' },
        { t: 'p', html: 'That continuity (business goal → requirement → decision → ADR) is what the judges call traceability. It is the backbone of a defensible architecture.' },
      ],
    },
    {
      id: 'adr',
      kicker: 'The log',
      title: 'Where decisions get written down',
      visual: { scene: 'adr' },
      blocks: [
        { t: 'p', html: `One more piece remains, the one that names half a dozen files in the repository: the ${c('adr', 'ADR')} (<em>Architecture Decision Record</em>). A short document that records a decision in three parts.` },
        { t: 'p', html: 'The team’s first ADR is, fittingly, the decision to use ADRs. The format was popularized by Michael Nygard.' },
        { t: 'callout', tone: 'warn', title: 'The golden rule', html: 'An ADR that admits no downsides is propaganda, not a decision.' },
        { t: 'p', html: 'ArchColider delivered sixteen. You will find each one at its exact moment, when the problem that motivated it shows up.' },
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
              q: 'What did the team do during the first week?',
              options: ['Pick the cloud and the language', 'Draw the deployment diagram', 'Read the business: goals, constraints, questions and glossary', 'Code a prototype'],
              answer: 2,
              why: 'Zero software diagrams: first you understand the business.',
            },
            {
              q: 'A requirement in the brief looks vague. What does the team do?',
              options: ['Interpret it however suits them', 'Ignore it', 'Flag it, write the question and send it to the client', 'Implement it anyway, just in case'],
              answer: 2,
              why: 'Ask instead of inventing: every answer from the client can change the design.',
            },
            {
              q: 'Where do good architecture principles come from?',
              options: ['From trendy books', 'From the concrete constraints of the case', 'From the team’s past experience with other technologies', 'From the jury'],
              answer: 1,
              why: 'Small team → simplicity; growth → evolvability; scaling blind → telemetry; systems you don’t own → messages.',
            },
            {
              q: 'What should a good ADR include in its consequences?',
              options: ['Only the upsides', 'The code of the solution', 'Also the downsides and risks being accepted', 'The list of technologies used'],
              answer: 2,
              why: 'An ADR without downsides is propaganda. Second law: “Why is more important than how.”',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials before moving on.' },
        { t: 'p', html: 'With the rules set, the decision that shapes the whole case arrives: <strong>one single piece or many?</strong>' },
      ],
    },
  ],
};
