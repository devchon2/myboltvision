import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // Explicitly set globals to true
    environment: 'jsdom',
    include: [
      '**/*.{test,spec}.{js,ts,jsx,tsx}',
      'lib/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'app/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    setupFiles: ['./vitest.setup.ts'],
    server: {
      deps: {
        // Définit quels modules seront autorisés à utiliser des imports ESM
        // inline: [/^(?!.*vitest).*$/],
      },
    },
    // S'assurer que Vitest traite correctement les modules ESM
    sequence: {
      hooks: 'list',
    },
    environmentMatchGlobs: [['**/*.{test,spec}.{jsx,tsx}', 'jsdom']],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
      '~/app': resolve(__dirname, './app'),
      '~/lib': resolve(__dirname, './lib'),
      '~/types': resolve(__dirname, './types'),
      '~/utils': resolve(__dirname, './utils'),
      '@': resolve(__dirname, './app'),
      '@remix-run/server-runtime/dist/server': resolve(__dirname, 'server-runtime-shim.js'),
    },
  },
});
