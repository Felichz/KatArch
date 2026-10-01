import type { Chapter } from '../types';
import { terreno } from './terreno';
import { concurrencia } from './concurrencia';
import { podio } from './podio';
import { principios } from './principios';
import { estilo } from './estilo';
import { dominio } from './dominio';
import { suscriptor } from './suscriptor';
import { infraestructura } from './infraestructura';
import { costos } from './costos';
import { mapa } from './mapa';
import { guia } from './guia';

export const CHAPTERS: Record<string, Chapter> = { terreno, podio, principios, estilo, dominio, concurrencia, suscriptor, infraestructura, costos, mapa, guia };
