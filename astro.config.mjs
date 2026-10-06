// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo at https://sebastianesco.github.io/Portfolio/
// If you add a custom domain later: set `site` to it and `base` to '/'.
export default defineConfig({
  site: 'https://sebastianesco.github.io',
  base: '/Portfolio',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
