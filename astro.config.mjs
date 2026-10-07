import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// PUBLIC_EDITION=texto builds the written course (its own subdomain); the default is the video course
const texto = process.env.PUBLIC_EDITION === 'texto';

export default defineConfig({
  site: texto ? 'https://texto.katarch.workers.dev' : 'https://katarch.vercel.app',
  integrations: [react()],
});
