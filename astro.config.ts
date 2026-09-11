import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBaseLinks } from './src/lib/rehype-base-links';

// Update `site` (and `base` if this repo is not published at the domain root)
// to match where GitHub Pages will actually serve the site. See README.md
// "Deploying to GitHub Pages" for details.
const site = 'https://aungthuhein2005.github.io';
const base = '/learning';

export default defineConfig({
  site,
  base,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: 'html' }], () => rehypeBaseLinks(base)],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      defaultColor: false,
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
