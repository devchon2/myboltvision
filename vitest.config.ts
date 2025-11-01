import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [!process.env.VITEST ? remix() : react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.js'],
    deps: {
      // Définit quels modules seront autorisés à utiliser des imports ESM
      inline: [/^(?!.*vitest).*$/],
    },
    // S'assurer que Vitest traite correctement les modules ESM
    sequence: {
      hooks: 'list'
    },
    unstubGlobals: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './app'),
      '@remix-run/server-runtime/dist/server': resolve(__dirname, 'server-runtime-shim.js'),
    },
  },
});
