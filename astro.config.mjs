// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages uses /orixe-web in production.
// Local development stays at http://localhost:4321/
export default defineConfig(({ command }) => ({
  site: command === 'build' ? 'https://orixe-galicia.github.io' : undefined,
  base: command === 'build' ? '/orixe-web' : undefined,
}));
