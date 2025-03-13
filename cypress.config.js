import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configuration des événements Node personnalisés
      addMatchImageSnapshotPlugin(on, config);

      return config;
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
  },

  // Configuration des composants pour les tests isolés
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.{js,jsx,ts,tsx}',
  },

  // Comportement global des tests
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 30000,

  // Configuration du comportement de capture d'écran
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',

  // Gestion des environnements
  env: {
    apiUrl: 'http://localhost:3000/api',
  },
});
