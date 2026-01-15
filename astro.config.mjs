// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://siotomo.github.io',
  base: '/diary-astro',
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
      [rehypeMermaid, { strategy: 'img-svg' }],
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
