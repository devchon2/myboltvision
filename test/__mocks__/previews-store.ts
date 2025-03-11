import { vi } from 'vitest';
import { map, atom } from 'nanostores';

// Mock pour PreviewsStore
export class MockPreviewsStore {
  previews = map({});
  
  constructor() {
    // Constructeur vide
  }
  
  // Méthodes mockées
  addPreview = vi.fn();
  removePreview = vi.fn();
}

// Mock pour TerminalStore
export class MockTerminalStore {
  showTerminal = atom(false);
  terminal = undefined;
  boltTerminal = undefined;
  
  constructor() {
    // Constructeur vide
  }
  
  // Méthodes mockées
  toggleTerminal = vi.fn();
  attachTerminal = vi.fn();
  attachBoltTerminal = vi.fn();
  onTerminalResize = vi.fn();
}

// Mock pour EditorStore
export class MockEditorStore {
  documents = map({});
  currentDocument = map(undefined);
  selectedFile = map(undefined);
  
  constructor() {
    // Constructeur vide
  }
  
  // Méthodes mockées
  setDocuments = vi.fn();
  setSelectedFile = vi.fn();
  updateFile = vi.fn();
  updateScrollPosition = vi.fn();
}
