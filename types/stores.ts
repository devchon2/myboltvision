import type { Store } from 'nanostores';

export interface LogEntry {
  type: 'system' | 'error' | 'provider' | 'debug';
  message: string;
  timestamp: string;
  details?: any;
}

export interface LogStore {
  logs: Store<LogEntry[]>;
  logSystem: (message: string, details?: any) => void;
  logError: (message: string, error: Error, details?: any) => void;
  logProvider: (message: string, details?: any) => void;
  logDebug: (message: string, details?: any) => void;
}

export interface ITerminal {
  cols: number;
  rows: number;
  write: (data: string) => void;
  onData: (callback: (data: string) => void) => void;
  onResize: (callback: (size: { cols: number; rows: number }) => void) => void;
}

export interface ScrollPosition {
  left: number;
  top: number;
  height: number;
}

export interface EditorDocument {
  filePath: string;
  value: string;
  scrollPosition?: ScrollPosition;
}

export interface ActionAlert {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface ArtifactState {
  id: string;
  title: string;
  type?: string;
  closed: boolean;
  runner: any;
}

export type WorkbenchViewType = 'code' | 'preview';

export interface WorkbenchStore {
  // Propriétés de base
  files: Record<string, string>;
  activePath: string | null;
  sessions: string[];
  completedWorkflows: number;
  activeWorkflows: number;
  alert: ActionAlert | null;

  // Propriétés supplémentaires
  artifacts: any;
  showWorkbench: any;
  currentView: any;
  unsavedFiles: any;
  previews: any;
  currentDocument: any;
  selectedFile: any;
  firstArtifact?: ArtifactState;
  filesCount: number;
  showTerminal: any;
  boltTerminal: any;

  // Méthodes
  setActivePath: (path: string) => void;
  setReloadedMessages: (ids: string[]) => void;
  getFileModifcations: () => any;
  resetAllFileModifications: () => void;
  abortAllActions: () => void;
  clearAlert: () => void;
  toggleTerminal: (value?: boolean) => void;
  attachTerminal: (terminal: ITerminal) => void;
  attachBoltTerminal: (terminal: ITerminal) => void;
  onTerminalResize: (cols: number, rows: number) => void;
  setDocuments: (files: any) => void;
  setShowWorkbench: (show: boolean) => void;
  setCurrentDocumentContent: (newContent: string) => void;
  setCurrentDocumentScrollPosition: (position: ScrollPosition) => void;
  setSelectedFile: (filePath: string | undefined) => void;
  saveFile: (filePath: string) => Promise<void>;
  saveCurrentDocument: () => Promise<void>;
  resetCurrentDocument: () => void;
  saveAllFiles: () => Promise<void>;
  addArtifact: (data: any) => void;
  updateArtifact: (data: any, state: Partial<any>) => void;
  addAction: (data: any) => void;
  runAction: (data: any, isStreaming?: boolean) => void;
  downloadZip: () => Promise<void>;
  syncFiles: (targetHandle: any) => Promise<string[]>;
  pushToGitHub: (
    repoName: string,
    commitMessage?: string,
    githubUsername?: string,
    ghToken?: string,
    isPrivate?: boolean,
  ) => Promise<string>;
}
