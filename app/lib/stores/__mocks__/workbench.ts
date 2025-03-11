import { atom, map } from 'nanostores';
import { vi } from 'vitest';

// Mock pour WorkbenchStore
export class MockWorkbenchStore {
  artifacts = map({});
  showWorkbench = atom(false);
  currentView = atom('code');
  unsavedFiles = atom(new Set<string>());
  actionAlert = atom(undefined);
  modifiedFiles = new Set<string>();
  artifactIdList: string[] = [];
  
  // Propriétés de lecture seule
  get previews() {
    return map({});
  }
  
  get files() {
    return map({});
  }
  
  get currentDocument() {
    return atom(undefined);
  }
  
  get selectedFile() {
    return atom(undefined);
  }
  
  get firstArtifact() {
    return undefined;
  }
  
  get filesCount() {
    return 0;
  }
  
  get showTerminal() {
    return atom(false);
  }
  
  get boltTerminal() {
    return undefined;
  }
  
  get alert() {
    return this.actionAlert;
  }
  
  // Méthodes mockées
  addToExecutionQueue = vi.fn();
  clearAlert = vi.fn();
  toggleTerminal = vi.fn();
  attachTerminal = vi.fn();
  attachBoltTerminal = vi.fn();
  onTerminalResize = vi.fn();
  setDocuments = vi.fn();
  setShowWorkbench = vi.fn();
  setCurrentDocumentContent = vi.fn();
  setCurrentDocumentScrollPosition = vi.fn();
  setSelectedFile = vi.fn();
  saveFile = vi.fn();
  saveCurrentDocument = vi.fn();
  resetCurrentDocument = vi.fn();
  saveAllFiles = vi.fn();
  getFileModifcations = vi.fn().mockReturnValue([]);
  resetAllFileModifications = vi.fn();
  abortAllActions = vi.fn();
  setReloadedMessages = vi.fn();
  addArtifact = vi.fn();
  updateArtifact = vi.fn();
  addAction = vi.fn();
  runAction = vi.fn();
  downloadZip = vi.fn();
  syncFiles = vi.fn();
  pushToGitHub = vi.fn();
}

// Export une instance préconfiguré du mock
export const workbenchStore = new MockWorkbenchStore();
