import type { ContextCluster } from './context';

export interface AgentResult {
  success: boolean;
  agentId: string;
  content: string;
  metadata: {
    agentVersion: string;
    contextId: string;
    timestamp: number;
    requestType: string;
    complexity?: number;
    innovationScore?: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  execute: (input: string, context?: ContextCluster) => Promise<AgentResult>;
}
