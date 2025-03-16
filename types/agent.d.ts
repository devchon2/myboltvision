import type { ContextShard } from './context';

/**
 * Interface unifiée pour les agents dans le système
 */
export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  execute: (input: string, context: ContextShard) => Promise<AgentResult>;
}

/**
 * Interface unifiée pour les résultats d'agents
 * 
 * Note: La refonte unifie les anciens formats (avec id/timestamp séparés)
 * et les nouveaux formats (avec metadata) en plaçant id et timestamp dans metadata.
 */
export interface AgentResult {
  agentId: string;
  content: string;
  metadata: Record<string, any>;  // Contient généralement 'id', 'timestamp', etc.
  success: boolean;
  error?: string;
}

/**
 * Interface pour les étapes de workflow
 */
export interface WorkflowStep {
  id: string;
  agentId: string;
  input: string;
  dependsOn: string[];
  condition?: (previousResults: AgentResult[]) => boolean;
}

/**
 * Interface pour les workflows
 */
export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

/**
 * Interface pour le détecteur de conflits
 */
export interface ConflictDescriptor {
  id: string;
  agentIds: string[];
  description: string;
  severity: string;
  timestamp: number;
}

/**
 * Interface pour les stratégies de résolution de conflits
 */
export interface ResolutionStrategy {
  id: string;
  name: string;
  description: string;
  applyResolution: (conflict: ConflictDescriptor, results: AgentResult[]) => Promise<AgentResult>;
}

/**
 * Interface pour les nœuds de DAG
 */
export interface DAGNode {
  id: string;
  type: 'agent' | 'decision' | 'merger' | 'splitter';
  agentId?: string;
  metadata: Record<string, any>;
  inputs: string[];  // IDs des nœuds qui fournissent des entrées
  outputs: string[]; // IDs des nœuds qui reçoivent des sorties
}

/**
 * Interface pour les arêtes de DAG
 */
export interface DAGEdge {
  id: string;
  source: string;  // ID du nœud source
  target: string;  // ID du nœud cible
  condition?: (result: AgentResult) => boolean;
  transformation?: (result: AgentResult) => any;
}

/**
 * Interface pour les DAG
 */
export interface DAG {
  id: string;
  name: string;
  description: string;
  nodes: DAGNode[];
  edges: DAGEdge[];
  metadata: Record<string, any>;
}
