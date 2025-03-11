import { vi } from 'vitest';

const importMetaMock = {
  env: {
    SSR: false,
    VITE_WEB_CONTAINER_API_KEY: 'test-key'
  },
  hot: {
    accept: vi.fn(),
    dispose: vi.fn(),
    data: {
      webcontainerContext: {
        loaded: true,
        fs: { writeFile: vi.fn() },
        terminal: { start: vi.fn() },
        processes: new Map()
      },
      modifiedFiles: new Map(), // Mock ajouté
      webcontainer: Promise.resolve({
        mount: vi.fn().mockResolvedValue(true),
        spawn: vi.fn(() => ({
          output: { 
            pipeTo: vi.fn(),
            getReader: vi.fn()
          },
          exit: {
            then: (cb: (result: { exitCode: number }) => void) => cb({ exitCode: 0 })
          }
        })),
        teardown: vi.fn().mockResolvedValue(true),
        getDirectory: vi.fn().mockResolvedValue({}),
        exec: vi.fn().mockResolvedValue({})
      })
    }
  },
};

export default importMetaMock;
