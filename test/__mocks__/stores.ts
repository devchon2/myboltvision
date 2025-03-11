import { vi } from 'vitest';
import { map } from 'nanostores';

// Mock pour FilesStore
export class MockFilesStore {
  #modifiedFiles = new Map<string, string>();
  files = map({});
  #size = 0;

  get filesCount() {
    return this.#size;
  }

  getFile(filePath: string) {
    return { type: 'file', content: 'mock content', isBinary: false };
  }

  getFileModifications() {
    return [];
  }

  resetFileModifications() {
    this.#modifiedFiles.clear();
  }

  async saveFile(filePath: string, content: string) {
    // mock implementation
  }
}

// Mock pour WebContainerStore
export const mockWebcontainer = Promise.resolve({
  workdir: '/test',
  on: vi.fn(),
  fs: {
    writeFile: vi.fn().mockResolvedValue(undefined),
  },
  internal: {
    watchPaths: vi.fn(),
  },
});
