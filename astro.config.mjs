// https://astro.build/config
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://natewhiteman.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
  vite: {
    resolve: {
      alias: {
        // react-dom/server.browser uses MessageChannel which is unavailable in
        // Cloudflare Workers. The edge build has the same API but works in
        // edge runtimes without that global.
        'react-dom/server.browser': 'react-dom/server.edge',
      },
    },
  },
});
