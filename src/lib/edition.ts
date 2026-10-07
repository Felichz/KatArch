/**
 * One codebase, two sites. The video course (the default, at katarch.vercel.app) and the written
 * course (PUBLIC_EDITION=texto, on its own subdomain) build from the same repository.
 */
export type Edition = 'video' | 'texto';
export const EDITION: Edition = import.meta.env.PUBLIC_EDITION === 'texto' ? 'texto' : 'video';
export const VIDEO_SITE_URL = 'https://katarch.vercel.app';
export const TEXT_SITE_URL = 'https://texto.katarch.workers.dev';
