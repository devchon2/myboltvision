import { vi } from 'vitest';

// Mock du webcontainer
export const webcontainer = Promise.resolve({
  workdir: '/tmp',
  on: vi.fn(),
  fs: {
    writeFile: vi.fn().mockResolvedValue(undefined),
  },
  internal: {
    watchPaths: vi.fn(),
  },
});

// Mock du contexte du webcontainer
export const webcontainerContext = {
  loaded: true,
  sessionId: 'test-session',
  start: vi.fn(),
  stop: vi.fn(),
  exec: vi.fn(),
  writeFile: vi.fn(),
  readFile: vi.fn(),
  removeFile: vi.fn(),
  listFiles: vi.fn(),
};
