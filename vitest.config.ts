import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';

export default defineConfig({
  plugins: [remix()],
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environmentMatchGlobs: [
      ['**/*.{test,spec}.{jsx,tsx}', 'jsdom']
    ],
    setupFiles: ['./vitest.setup.js'],
    deps: {
      // Définit quels modules seront autorisés à utiliser des imports ESM
      inline: [/^(?!.*vitest).*$/],
    },
    // S'assurer que Vitest traite correctement les modules ESM
    sequence: {
      hooks: 'list'
    },
    // Configuration explicite pour les modules ESM problématiques
    server: {
      deps: {
        external: [/@remix-run\/server-runtime/],
        interopDefault: true
      }
    }
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
      '@remix-run/server-runtime/dist/server': resolve(__dirname, 'server-runtime-shim.js'),
    },
  },
});
