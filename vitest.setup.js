// vitest.setup.js
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Configure les mocks globaux pour les tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock complet de import.meta
const importMetaMock = {
  meta: {
    env: {
      SSR: false,
      DEV: true,
      PROD: false,
      MODE: 'development',
      VITE_WEB_CONTAINER_API_KEY: 'test-key'
    },
    hot: {
      accept: vi.fn(),
      dispose: vi.fn(),
      data: {
        files: new Map(),
        modifiedFiles: new Map(),
        artifacts: new Map(),
        unsavedFiles: new Set(),
        showWorkbench: false,
        currentView: 'code',
        actionAlert: undefined,
        webcontainer: undefined,
        webcontainerContext: {
          loaded: false,
        },
        shellHighlighter: Promise.resolve({ codeToHtml: () => '' }),
      }
    }
  }
};

vi.stubGlobal('import', importMetaMock);

// Mock de webcontainer
vi.mock('app/lib/webcontainer', () => ({
  webcontainer: Promise.resolve({
    workdir: '/test',
    on: vi.fn(),
    fs: {
      writeFile: vi.fn().mockResolvedValue(undefined),
      watch: vi.fn(),
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
  }
}));

// Suppression des avertissements de IndexedDB manquant
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('indexedDB')) {
    return;
  }
  originalConsoleWarn(...args);
};
