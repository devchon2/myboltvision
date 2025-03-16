import type { ContextCluster } from '../../types/context.js';
import { ContextManager } from '../core/ContextManager.js';
import type { Agent, AgentResult } from '../../types/agent.d.ts';
import { MetaAgentSearch } from '../agents/MetaAgentSearch.js';
import { BusinessStrategyAgent } from '../agents/BusinessStrategyAgent.js';
import { DynamicDAGEngine } from './DynamicDAGEngine.js';
import { ConflictResolutionEngine } from './ConflictResolutionEngine.js';
import type { Workflow } from '../../types/types/workflow.ts';

export class UnifiedAgentOrchestrator {
  private dagEngine: DynamicDAGEngine;
  private conflictEngine: ConflictResolutionEngine;

  constructor() {
    this.dagEngine = new DynamicDAGEngine();
    this.conflictEngine = new ConflictResolutionEngine();
  }

  registerAgent(agent: Agent): void {
    this.dagEngine.registerAgent(agent);
  }

  async executeWorkflow(workflow: Workflow, input: string): Promise<Map<string, AgentResult>> {
    const dag = this.dagEngine.createDAGFromWorkflow(workflow);
    return await this.dagEngine.executeDAG(dag.id, input);
  }

  async executeWithAgents(agentIds: string[], input: string): Promise<AgentResult> {
    const dag = this.dagEngine.createDAG();
    for (const agentId of agentIds) {
const node = this.dagEngine.addNode(dag.id, { type: 'agent', agentId, metadata: {}, inputs: [], outputs: [] });
this.dagEngine.addEdge(dag.id, { id: 'edge1', source: 'start', target: node.id });
    }
    const results = await this.dagEngine.executeDAG(dag.id, input);
    const resultArray = Array.from(results.values());
    const resolvedResult = await this.conflictEngine.resolveConflict(resultArray);
    return resolvedResult;
  }
}
