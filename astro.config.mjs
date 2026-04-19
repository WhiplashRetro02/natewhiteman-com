// https://astro.build/config
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

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
    plugins: [
      {
        // @astrojs/cloudflare runs its own internal Vite sub-build for the
        // Worker bundle. vite.resolve.alias does not propagate into that
        // sub-build, but plugins do. This plugin intercepts react-dom/server.browser
        // at the resolveId level (before any bundling) and redirects to
        // react-dom/server.edge, which has the same API but uses a scheduler
        // that does not call new MessageChannel() at module-init time.
        // That call is what causes Cloudflare's pre-deploy Worker validation
        // to throw "MessageChannel is not defined".
        name: 'cloudflare-react-dom-edge',
        enforce: 'pre',
        resolveId(id) {
          if (id === 'react-dom/server.browser') {
            return require.resolve('react-dom/server.edge');
          }
        },
      },
    ],
  },
});
