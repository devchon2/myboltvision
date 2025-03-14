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

export interface AgentTask {
  objective: string;
  constraints: string[];
  context?: ProjectContext;
}

export interface ExecutionResult {
  status: 'success' | 'partial' | 'failed';
  generatedAssets: {
    code?: string[];
    documentation?: string[];
    tests?: string[];
  };
  metrics: {
    executionTime: number;
    resourceUsage: object;
  };
}
