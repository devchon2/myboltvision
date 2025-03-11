// Configuration Vitest
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Exposer vi globalement
globalThis.vi = vi;

// Ajouter des extensions globales pour les tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de import.meta
const importMetaMock = {
  env: {
    SSR: true,
  },
  hot: {
    data: {
      webcontainer: {
        context: {
          loaded: false
        }
      },
      webcontainerContext: {
        loaded: false,
      },
      modifiedFiles: new Map(), // Ajout du mock manquant
    },
  },
};

global.import = {
  meta: importMetaMock,
};

// Éviter les avertissements de console pendant les tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: useLayoutEffect does nothing on the server/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Supprimer les avertissements de méthodes obsolètes
vi.spyOn(console, 'warn').mockImplementation((...args) => {
  if (args[0] && args[0].includes('deprecated')) {
    return;
  }
  console.warn(...args);
});

// Setup des mocks globaux pour le localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
global.sessionStorage = new LocalStorageMock();
