import type { ContextCluster } from './types/context';

export interface AgentResult {
  success: boolean;
  agentId: string;
  content: string;
  metadata: Record<string, any>;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  execute(input: string, context?: ContextCluster): Promise<AgentResult>;
}
