// vitest.setup.js
import { 
  vi, 
  describe as vitestDescribe, 
  it as vitestIt, 
  test as vitestTest, 
  expect as vitestExpect, 
  beforeEach as vitestBeforeEach, 
  afterEach as vitestAfterEach
} from 'vitest';
import '@testing-library/jest-dom/vitest';

// Assurer que les fonctions globales sont disponibles
globalThis.vi = vi;
globalThis.describe = vitestDescribe as unknown as typeof globalThis.describe;
globalThis.it = vitestIt as unknown as typeof globalThis.it;
globalThis.test = vitestTest as unknown as typeof globalThis.test;
globalThis.expect = vitestExpect as unknown as typeof globalThis.expect;
globalThis.beforeEach = vitestBeforeEach as unknown as typeof globalThis.beforeEach;
globalThis.afterEach = vitestAfterEach as unknown as typeof globalThis.afterEach;

// Configure les mocks globaux pour les tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de webcontainer
vi.mock('app/lib/webcontainer', () => ({
  webcontainer: Promise.resolve({
    workdir: '/test',
    on: vi.fn(),
    fs: {
      writeFile: vi.fn().mockResolvedValue(undefined),
    },
    internal: {
      watchPaths: vi.fn(),
    },
  }),
  webcontainerContext: {
    loaded: true,
    sessionId: 'test-session',
    start: vi.fn(),
    stop: vi.fn(),
    exec: vi.fn(),
    writeFile: vi.fn(),
    readFile: vi.fn(),
    removeFile: vi.fn(),
    listFiles: vi.fn(),
  },
}));

// Suppression des avertissements de IndexedDB manquant
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('indexedDB')) {
    return;
  }
  originalConsoleWarn(...args);
};
