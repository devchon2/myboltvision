/**
 * Définitions de types pour le contexte.
 * Ce fichier résout les erreurs de type 'Context' manquant.
 */

export interface Context {
  input: string;
  messages?: Message[];
  artifacts?: Artifact[];
  metadata?: Record<string, any>;
  [key: string]: any;
}

export interface Message {
  role: string;
  content: string;
  id?: string;
  name?: string;
  timestamp?: number;
}

export interface Artifact {
  type: string;
  content: string;
  metadata?: Record<string, any>;
  id?: string;
}

export interface ContextAnnotation {
  type: string;
  data: any;
}

export interface ProgressAnnotation {
  type: 'progress';
  data: {
    step: number;
    total: number;
    message: string;
  };
}
