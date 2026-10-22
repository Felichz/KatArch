/**
 * The course in English: the same blocks as curso.ts, by slug. Titles follow each block's narration.en.json
 * (shortened where the Spanish site title is shorter too). The video, sections and captions in English come from
 * bloques.json (`en`).
 */
import type { Acto } from './curso';

export interface BloqueEn {
  titulo: string;
  ensena: string;
  par?: [string, string];
  pieza?: string;
}

export const CURSO_EN = { titulo: 'The Architecture Map', corto: 'Video course' };

export const ACTOS_EN: Record<Acto, { nombre: string; bajada: string }> = {
  apertura: { nombre: 'Opening', bajada: 'A whole system and the empty map, before explaining anything.' },
  metodo: { nombre: 'Act 1 · How it is decided', bajada: 'The method: qualities, trade-offs, calculations, style and cuts, and how it is written down.' },
  territorio: { nombre: 'Act 2 · The territory', bajada: 'Ten regions of the map. In each one, the families of solutions, what each one gains and pays, and two winners that chose differently.' },
  cierre: { nombre: 'Closing', bajada: 'ClearView from end to end: each piece in its region and the chain of decisions on top.' },
};

export const BLOQUES_EN: Record<string, BloqueEn> = {
  apertura: { titulo: 'A Whole System, Before Explaining It', ensena: 'Where the material comes from, and a real system with four questions the course will answer.' },
  decision: { titulo: 'What Makes a Decision Architectural', ensena: 'What makes a decision architectural, what a trade-off is, and how it is written down in a four-part ADR.', par: ['ClearView shares a database and writes down its price', 'MobilityCorp ties its decision to the requirements that ask for it'], pieza: 'the shared database' },
  cualidades: { titulo: 'From Requirement to Qualities', ensena: 'How the few qualities that matter come out, and why each trade-off is written with the condition that makes it safe.', par: ['MonitorMe reads the request sentence by sentence', 'ClearView starts from what makes the case hard'] },
  cuenta: { titulo: 'Checking with a Calculation', ensena: 'How a quality becomes a number that can be checked, and which assumption moves everything.', par: ['MonitorMe splits one second into stages', 'ClearView counts calls to the model'] },
  estilo: { titulo: 'The Style', ensena: 'How the overall shape of the system is chosen from the qualities, and why it can vary by part.', par: ['ClearView: services and events where they are needed', 'Farmacy Food: a modular monolith'], pieza: 'the style by zones' },
  corte: { titulo: 'Where a System Is Cut', ensena: 'Cutting with a named criterion, deciding not to split, and asking each part for its own service level.', par: ['Farmacy Family cuts by criterion', 'Sysops Squad proposes cutting by qualities'] },
  'guardar-datos': { titulo: 'Storing Data', ensena: 'Which families of stores exist, which query each one serves, and who can change each piece of data.', par: ['MonitorMe stores timestamped readings', 'Farmacy Family picks a store per need'], pieza: 'one writer per piece of data' },
  'mover-y-procesar': { titulo: 'Moving and Processing', ensena: 'Wait or carry on, queue or stream, online or in batches: how the path of each message is chosen.', par: ['Spotlight: one event, several readers', 'Sysops Squad: one message, one destination'] },
  'donde-corre': { titulo: 'Where It Runs', ensena: 'Own machines, containers, managed platforms or the device itself: how much is controlled and how much is operated.', par: ['MonitorMe runs in every hospital', 'ShopWise uses a managed platform'] },
  'el-borde': { titulo: 'The Edge', ensena: 'Where what comes from outside gets in: gateways, one API per type of client, files straight to storage.', par: ['Spotlight: one door for its apps', 'Sysops Squad: one gateway per part'] },
  'cuando-algo-falla': { titulo: 'When Something Fails', ensena: 'Protecting what the business cannot lose: a second path, retries, duplicates, storing and announcing without being left halfway.', par: ['Farmacy Food: a code that opens without a network', 'MonitorMe: the alert by two paths'], pieza: 'the retry queue' },
  'identidad-y-datos-sensibles': { titulo: 'Identity and Sensitive Data', ensena: 'Where the sensitive data lives, who sees it whole, how long it lasts and how it is deleted.', par: ['ClearView: a permission that prevents reading', 'Farmacy Family: deleting a key'], pieza: "the résumé's lock" },
  'ver-que-pasa': { titulo: 'Seeing What Happens', ensena: 'Logs, metrics, traces and business health: how to find out something is wrong before the customer does.', par: ['Farmacy Food measures the business', 'ShopWise keeps its traces at home'] },
  'comprar-construir-crecer': { titulo: 'Buying, Building and Growing', ensena: 'What is bought and what is built, starting simple with the exit written down, and the premises that age.', par: ['Spotlight buys and wraps', 'ShopWise builds its gateway'] },
  'ia-en-el-sistema': { titulo: 'AI in the System', ensena: 'What a model cannot decide, what happens when it doubts, how it is measured and how architecture is put around it.', par: ['ClearView takes the model out of the decision', 'MobilityCorp surrounds it with rules'], pieza: 'the AI out of the decision' },
  'cambiar-sin-romper': { titulo: 'Changing Without Breaking', ensena: 'Shadow, phases, switching on little by little, and what is decided not to do, left in writing.', par: ['MobilityCorp tests in shadow', 'Certifiable runs alongside people'], pieza: 'the rejected cache' },
  cierre: { titulo: 'ClearView from End to End', ensena: 'The whole chain: each decision forces the next one, and each piece falls into its region of the map.' },
};

export const etiquetaEn = (n: number, acto: Acto) => (acto === 'apertura' ? 'Opening' : acto === 'cierre' ? 'Closing' : `Block ${n}`);
