import type { Chapter } from '../types';
import { c, doc } from './helpers';

export const infraestructura: Chapter = {
  id: 'infraestructura',
  number: 8,
  phase: 'The design',
  title: 'Landing in the cloud',
  subtitle: 'The design is done on paper; now it has to run somewhere. A private network, identity checked at the gate, and a plan to grow only when the numbers ask for it.',
  minutes: 14,
  learn: [
    'Read a <strong>VPC</strong>: public and private subnets, two availability zones and a single gate.',
    'Explain why identity is checked <strong>at the load balancer</strong>, and why modules still ask each other for credentials.',
    'Tell a web of direct calls apart from a <strong>log-based stream</strong>.',
    'Justify <strong>scaling up first</strong>, and name the signals that trigger scaling out or extracting a module.',
  ],
  steps: [
    {
      id: 'cover',
      layout: 'cover',
      title: 'Landing in the cloud',
      blocks: [
        { t: 'p', html: 'Everything so far is pure logic: modules, messages, boundaries. At some point servers have to be paid for. This chapter follows the modular monolith onto AWS, from the fence around the network to the day a module moves out on its own.' },
      ],
    },

    /* ── the private enclosure ── */
    {
      id: 'recinto',
      kicker: 'The private network',
      title: 'A fenced plot in the cloud',
      visual: { scene: 'infra-vpc', state: 'layers' },
      evidence: { src: '/img/infra-vpc.png', alt: 'Original AWS VPC network topology diagram', caption: 'The team’s VPC: one region, two availability zones, public and private subnets, and the gates at the edge.' },
      describe: '<ol><li>AWS region us-east, the one closest to Detroit.</li><li>Inside it, the VPC 10.0.0.0/16: a private network with its own address range.</li><li>Two availability zones, us-east-1a and us-east-1b: separate datacenter buildings.</li><li>In each zone, a public subnet and a private subnet.</li><li>At the edge, the gates: the internet gateway igw-1, the load balancer and the router between subnets.</li></ol>',
      blocks: [
        { t: 'p', html: 'The team chose AWS for a constraint of the brief and a practical reason: the region closest to Detroit.' },
        { t: 'p', html: `The topology is a lesson in well-understood ${c('vpc', 'private networking')} ${doc('infra-network')}: a private enclosure with the load balancer at the gate, and everything duplicated across two separate datacenter buildings.` },
        { t: 'p', html: 'Walk through it from the outside in, the way the team’s diagram reads.' },
      ],
    },
    {
      id: 'subredes',
      kicker: 'The private network',
      title: 'Two buildings, two kinds of room',
      visual: { scene: 'infra-vpc', state: 'traffic' },
      describe: '<p>A request from the internet enters through igw-1, passes the load balancer and the router, and reaches a public subnet. The private subnets have no route to the internet: their route table only knows the local range 10.0.0.0/16, so traffic from outside has no way in. Zone b repeats zone a.</p>',
      blocks: [
        { t: 'p', html: 'What makes a subnet public or private is its <strong>route table</strong>. The public ones can reach the internet through igw-1. The private ones only know the local range, and the team wrote down why: no service running there should be reachable from the internet directly.' },
        { t: 'p', html: 'That is where the most sensitive pieces live, like the event store. And zone b repeats zone a: if one building goes down, the other keeps serving.' },
      ],
    },

    /* ── identity at the gate ── */
    {
      id: 'puerta-pregunta',
      kicker: 'Identity at the gate',
      title: 'Who checks the visitor?',
      visual: { scene: 'infra-auth', state: 'naive' },
      describe: '<p>A user sends a request that goes through the load balancer to a group of N identical servers. If every server verified the visitor’s identity on its own, the same sensitive logic would be repeated N times.</p>',
      blocks: [
        { t: 'p', html: 'Every request carries a question: who is this? If every server answered it on its own, all of them would spend time on it and all of them would repeat the same sensitive logic.' },
        {
          t: 'predict',
          question: 'Where would you check the visitor’s identity?',
          options: [
            { label: 'In every module, on every request', feedback: 'It works, but the same sensitive check ends up copied everywhere, and each copy can drift.' },
            { label: 'At the load balancer, before traffic reaches the servers', correct: true, feedback: '<strong>That is what the team did.</strong> The gate checks once; the servers only receive visitors who are already verified.' },
            { label: 'Only in the phone app, before sending', feedback: 'The app runs on a device you do not control: anything it “verifies” can be forged.' },
            { label: 'In the database, when data is read', feedback: 'By then the request has already crossed the whole system with nobody asking who sent it.' },
          ],
        },
      ],
    },
    {
      id: 'puerta',
      kicker: 'Identity at the gate',
      title: 'Credentials are checked once, at the gate',
      visual: { scene: 'infra-auth', state: 'flow' },
      evidence: { src: '/img/Authentication.png', alt: 'Original authentication flow diagram with Cognito and the Application Load Balancer', caption: 'The team’s authentication flow: the load balancer’s listener checks the user against Cognito and only then forwards the request.' },
      describe: '<ol><li>The user sends a request without a session.</li><li>The load balancer redirects them to Cognito, AWS’s identity service.</li><li>The user authenticates there, directly or through Google or Facebook.</li><li>They come back with an authenticated session.</li><li>The listener checks the token against Cognito and forwards the request, with identity headers, to the auto scaling group.</li></ol>',
      blocks: [
        { t: 'p', html: `Instead of every piece of software checking every visitor, the <strong>incoming load balancer</strong> does it against AWS’s identity service, Cognito ${doc('authentication')}, before traffic reaches the servers.` },
        { t: 'p', html: 'Follow the five numbered steps of the original diagram. The servers on the right never see a password: they trust the identity headers the gate hands them.' },
      ],
    },
    {
      id: 'federacion',
      kicker: 'Identity at the gate',
      title: 'Sign in with Google, or not',
      visual: { scene: 'infra-federation' },
      describe: '<p>Two doors lead to the same Cognito user pool. Federated sign-in, with Google, Facebook or an enterprise provider, builds trust with many users. An independent account serves anyone who trusts the site less than a tech giant, or wants a different password for each service. The occasional customer who pays cash never signs in: they go through the cashier.</p>',
      blocks: [
        { t: 'p', html: 'The identity service also allows <strong>federation</strong>: signing in with a Google or Facebook account. The team noted it as a product argument: federation “will immediately generate trust in your system with a large portion of potential users”.' },
        { t: 'p', html: 'With fine print: anyone wary of tech-giant accounts can always create an independent one.' },
      ],
    },
    {
      id: 'confianza-cero',
      kicker: 'Identity at the gate',
      title: 'Inside, modules ask each other for credentials too',
      visual: { scene: 'infra-zerotrust' },
      describe: '<p>Today, Ordering calls Scheduling inside the same monolith, and the call already carries the caller’s token and claims, which Scheduling checks. The day Scheduling leaves as its own service, the same call crosses the network with the same credentials: there is no security left to add.</p>',
      blocks: [
        { t: 'p', html: 'Inside, zero trust: modules also demand authorization from each other, with attribute-based access control (ABAC) from day one, as if they were already separate services.' },
        { t: 'p', html: 'Switch between <strong>today</strong> and <strong>the day it splits</strong>: when a module moves out, its security is already done.' },
        { t: 'decision', id: 'edge-auth' },
      ],
    },

    /* ── what runs where ── */
    {
      id: 'mapa',
      kicker: 'What runs where',
      title: 'The machine map',
      visual: { scene: 'infra-services' },
      evidence: { src: '/img/services.png', alt: 'Original overview of services and virtual hardware: servers, queues, streaming and SaaS by subnet', caption: 'The team’s full topology: server templates per subnet, queues, log streaming, storage and the external systems.' },
      describe: '<p>Public subnet 1, in an auto scaling group: the Meals servers, with the meal catalog subsystem, and the Ordering servers, with order processing. Private subnet 2: the Purchase servers, with the purchase gateway, and the event store. Amazon MQ connects modules. Kafka managed streams feed SNS notifications, DataDog monitoring and Tableau reporting. S3 and DynamoDB store images, backups and the event store’s data. External systems are reached over HTTPS. Subnets 3 and 4 are copies of 1 and 2.</p>',
      blocks: [
        { t: 'p', html: `The full picture ${doc('infra-services')}: every server is a <strong>t3.medium template</strong>, and the “1..N” labels are the promise of scale.` },
        { t: 'p', html: 'Modules talk through a managed queue, as if the monolith were already split. Anything that leaves the modules (notifications, metrics, reports) goes through a managed stream. Tap each zone.' },
      ],
    },
    {
      id: 'rio',
      kicker: 'What runs where',
      title: 'No spaghetti with meatballs',
      visual: { scene: 'infra-stream' },
      evidence: { src: '/img/FF_LogBasedStream.PNG', alt: 'Original diagram of information propagation through a log-based stream', caption: 'Log-based propagation: producers write once; notifications, reporting and any future consumer read at their own pace.' },
      describe: '<p>With direct calls, every service talks to every other, and a service that is down leaves its callers waiting. With a log-based stream, producers append changes to the log once, and each consumer reads at its own pace. If a consumer goes down, the producers keep writing, and it catches up when it comes back.</p>',
      blocks: [
        { t: 'p', html: `The team named the anti-pattern they wanted to avoid ${doc('system-approach')}: <em>“spaghetti with meatballs”</em>, every service shouting at every other. Their inspiration: Martin Kleppmann’s writing on logs as data infrastructure.` },
        { t: 'p', html: 'Changes flow through a <strong>log-based stream</strong>, and every consumer reads at its own pace, nobody depending on anybody else being alive. The side benefit is economic: consumers with relaxed availability needs can run on cheaper machines.' },
      ],
    },
    {
      id: 'codigo',
      kicker: 'What runs where',
      title: 'The network is written, not clicked',
      visual: { scene: 'infra-iac' },
      describe: '<ol><li>The infrastructure is written as a declarative specification: the desired state, not the steps.</li><li>Architecture fitness functions run against the specification before anything is deployed.</li><li>Executing the specification creates exactly what was tested, and derived environments come from standard transformations.</li><li>If someone changes something by hand, such as attaching a public IP, drift detection raises an alert.</li></ol>',
      blocks: [
        { t: 'p', html: `The infrastructure is not clicked together by hand: it is <strong>declarative code</strong>, CloudFormation in ${doc('adr-016', 'ADR 016')}, with Terraform left open.` },
        { t: 'p', html: 'Beyond reproducibility (subnets born as exact copies of each other), it lets you run <strong>architecture fitness functions against the specification</strong> before deploying anything, and detect <em>drift</em> when someone changes something by hand.' },
      ],
    },

    /* ── when the business grows ── */
    {
      id: 'crecer',
      kicker: 'When the business grows',
      title: 'A bigger machine, or more machines?',
      visual: { scene: 'infra-scale', state: 'options' },
      describe: '<p>Two ways to handle more load. Scaling up: the same single server, on bigger virtual hardware. Scaling out: several instances of the server behind a load balancer.</p>',
      blocks: [
        { t: 'p', html: `Every system grows. The question the team’s scaling strategy answers ${doc('infra-scaling')} is when to pay for that growth.` },
        {
          t: 'predict',
          question: 'Load starts to grow. What would you do first?',
          options: [
            { label: 'Add instances behind the balancer from day one', feedback: 'It is where the system may end up, but paying for a cluster before the load exists buys complexity nobody needs yet.' },
            { label: 'Move everything to Kubernetes', feedback: 'ADR 014 dropped it on purpose: learning and running the platform was too much effort for this size.' },
            { label: 'A bigger machine, until telemetry shows the ceiling', correct: true, feedback: '<strong>That is the team’s strategy.</strong> Scale up first; scale out only when the numbers say vertical has hit its limit.' },
            { label: 'Split every module into its own service', feedback: 'That is exactly the premature optimization the modular monolith was chosen to avoid.' },
          ],
        },
      ],
    },
    {
      id: 'umbral',
      kicker: 'When the business grows',
      title: 'Scale up first, with a written threshold',
      visual: { scene: 'infra-scale', state: 'policy' },
      describe: '<ol><li>The system starts on a small machine.</li><li>When load grows, the machine is upgraded.</li><li>When CPU goes above 75% or memory above 85% at the top size, telemetry shows vertical has hit its ceiling.</li><li>Only then are instances multiplied behind the load balancer.</li></ol>',
      blocks: [
        { t: 'p', html: `First a bigger machine; more instances only when ${c('telemetry', 'telemetry')}, mandatory by principle number three, shows the ceiling. The initial thresholds are concrete: <strong>CPU above 75% or memory above 85%</strong>.` },
        { t: 'decision', id: 'scale-up' },
        { t: 'callout', tone: 'warn', title: 'The inverse trap', html: 'The cloud lets you scale up <em>for a long time</em>, which can <strong>postpone scaling out indefinitely</strong>. The antidote: evaluate the business-critical path directly in production.' },
      ],
    },
    {
      id: 'extraer',
      kicker: 'When the business grows',
      title: 'The module under pressure moves out',
      visual: { scene: 'infra-extract' },
      evidence: { src: '/img/menu-catalog-extraction.png', alt: 'Original diagram: Menu Catalog as a service with its own load balancer and replicas', caption: 'The worked extraction case: Menu Catalog as a service, with its own load balancer and N replicas of filtering plus cache.' },
      describe: '<p>The Menu Catalog service keeps its anti-corruption layer (Meals Offer, Loyalty, Menu Catalog API), its domain and its consumers. Below the domain, a load balancer now spreads queries across N identical replicas, each with filtering and its own cache. The boundary, the customs layer and the commands and events did not change.</p>',
      blocks: [
        { t: 'p', html: 'At cut time, the module with the most pressure is extracted from the monolith, exactly as designed in chapter 4. The team worked the case through with the Menu Catalog from chapter 5.' },
        { t: 'p', html: 'Look at what got scaled: the part that serves queries (filtering plus cache), not the domain. Under load, the bottleneck is serving reads, not applying rules. One group out, zero surgery on the rest.' },
      ],
    },
    {
      id: 'telemetria',
      kicker: 'When the business grows',
      title: 'A phantom customer walks the critical path',
      visual: { scene: 'infra-health' },
      describe: '<ol><li>The monolith’s health endpoints report three levels: whether each module is ready to operate, business metrics and technical metrics.</li><li>A synthetic customer walks the critical path every few minutes: pick a meal, pay, pick up.</li><li>The machines can look healthy while the business logic is stuck; the synthetic customer finds out.</li><li>Those numbers are also the signal for when to split the monolith.</li></ol>',
      blocks: [
        { t: 'p', html: 'The health endpoints expose three levels: whether each module is <strong>ready to operate</strong>, <strong>business</strong> metrics (how orders are being processed) and <strong>technical</strong> ones (request rate, failure rate).' },
        { t: 'p', html: 'On top of that, <strong>synthetic scenarios</strong>, chosen in a quality attribute workshop: a dummy customer walks the critical path every few minutes and measures whether the result is correct and how long it took. A machine can be “healthy” while the business is stuck.' },
      ],
    },

    /* ── risks ── */
    {
      id: 'riesgos',
      kicker: 'The risks',
      title: 'Every risk with its mitigation next to it',
      visual: { scene: 'infra-risks' },
      describe: '<ul><li>Payment gateway down: store orders and retry for a defined period; trust known users and subscribers meanwhile.</li><li>Review bombing: only someone with a confirmed charge can review.</li><li>Notification channel fails: a backup channel, or none if the meal already arrived.</li><li>Reserved and never picked up: the reservation is prepaid.</li><li>The fridge fills up: no technical mitigation, a business decision.</li><li>Order outside kitchen hours: open point for the owner.</li><li>Ghost kitchen down: keep operating on internal data, with a compensation protocol.</li><li>A change breaks the message format: API versioning and sunset warnings.</li><li>Scaling spikes the bill: an instance cap and human confirmation.</li><li>A release breaks something: hot-swap to the previous release.</li></ul>',
      blocks: [
        { t: 'p', html: `The analysis ends with a risk list where every risk has its mitigation written next to it ${doc('risks')}.` },
        { t: 'p', html: 'Not all of them are technical: some are business decisions the team explicitly left for the owner. When the fridge physically fills up, the authors were blunt: there is no technical mitigation. Tap each risk.' },
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
              q: 'Where does the team check who the visitor is?',
              options: [
                'In every module, each time it gets a request',
                'In the phone app, before the request is sent',
                'At the incoming load balancer, against Cognito',
                'In the database, when the data is finally read',
              ],
              answer: 2,
              why: 'The listener checks the token against Cognito and forwards the request with identity headers: the servers never see a password.',
            },
            {
              q: 'Why do modules inside the monolith still ask each other for authorization?',
              options: [
                'So that the day a module is extracted, its security is already done',
                'Because Cognito rejects any internal call that has no token',
                'Because every module runs on its own machine from day one',
                'Because checking credentials makes internal calls faster',
              ],
              answer: 0,
              why: 'ADR 006: calls carry auth and claims from the very beginning, so a module can become a service without adding security later.',
            },
            {
              q: 'Load keeps growing. What comes first in the team’s strategy?',
              options: [
                'More instances behind the balancer, right away',
                'Moving the whole system to Kubernetes',
                'Extracting every module as a microservice',
                'A bigger machine, until telemetry shows the ceiling',
              ],
              answer: 3,
              why: 'Scale up first. Thresholds of CPU above 75% or memory above 85% mark when vertical has hit its limit.',
            },
            {
              q: 'What did the Menu Catalog extraction clone behind a balancer?',
              options: [
                'The domain, so rules are applied N times in parallel',
                'The query-serving part: filtering plus its cache',
                'The anti-corruption layer and its three adapters',
                'The whole monolith, duplicated in the second zone',
              ],
              answer: 1,
              why: 'Under load the bottleneck is serving reads, not applying rules. The boundary and the customs layer stayed the same.',
            },
          ],
        },
      },
      blocks: [
        { t: 'p', html: 'Review the essentials before moving on.' },
        { t: 'p', html: 'The machines are chosen, down to the server template. What is left is the question every owner asks: <strong>how much does all this cost a year?</strong> The next chapter adds up the bill, line by line.' },
      ],
    },
  ],
};
