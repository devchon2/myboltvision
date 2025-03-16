import { DynamicDAGEngine } from './DynamicDAGEngine.js';
import { ConflictResolutionEngine } from './ConflictResolutionEngine.js';
import type { Agent, AgentResult, ConflictDescriptor, Workflow } from '../../types/agent.js';

export interface DAGNodeData {
  type: 'agent';
  agentId: string;
  metadata: Record<string, unknown>;
  inputs: unknown[];
  outputs: unknown[];
}

export interface DAGEdgeData {
  source: string;
  target: string;
  id: string;
}

export class UnifiedAgentOrchestrator {
  private dagEngine: DynamicDAGEngine;
  private conflictEngine: ConflictResolutionEngine;

  constructor(
    dagEngine: DynamicDAGEngine,
    conflictEngine: ConflictResolutionEngine
  ) {
    this.dagEngine = dagEngine;
    this.conflictEngine = conflictEngine;
  }

  registerAgent(agent: Agent): void {
    this.dagEngine.registerAgent(agent);
  }

  async executeWorkflow(
    workflow: Workflow,
    input: string
  ): Promise<Map<string, AgentResult>> {
    const dag = this.dagEngine.createDAGFromWorkflow(workflow);
    return this.dagEngine.executeDAG(dag.id, input);
  }

  async executeWithAgents(
    workflow: Workflow,
    agentIds: string[],
    input: string
  ): Promise<AgentResult> {
    const missingAgents = agentIds.filter(id => !this.dagEngine.hasAgent(id));

    if (missingAgents.length > 0) {
      throw new Error(`Agents introuvables : ${missingAgents.join(', ')}`);
    }

    if (agentIds.length === 0) return { agentId: 'empty', content: '', success: true, metadata: {} } as AgentResult;

    let dag = this.dagEngine.createDAGFromWorkflow(workflow) ??
      this.dagEngine.createDAG('DAG temporaire', 'DAG');

    // Ajouter le nœud de départ système
    const startNode = this.dagEngine.addNode(dag.id, {
      id: 'system:start',
      type: 'agent',
      agentId: 'start',
      metadata: { isSystemNode: true }
    });

    let previousNodeId = startNode.id;
    let firstAgent = true;

    for (const agentId of agentIds) {
      const node = this.dagEngine.addNode(dag.id, {
        id: agentId,
        type: 'agent',
        agentId,
        metadata: {}
      });

      if (firstAgent) {
        firstAgent = false;
      } else {
        this.dagEngine.addEdge(dag.id, {
          source: previousNodeId,
          target: agentId
        });
      };

      if (!firstAgent) {
        this.dagEngine.addEdge(dag.id, {
          source: previousNodeId,
          target: agentId
        });

        if (!firstAgent) {
          this.dagEngine.addEdge(dag.id, {
            source: previousNodeId,
            target: agentId
          });

          if (!firstAgent) {
            this.dagEngine.addEdge(dag.id, {
              source: previousNodeId,
              target: agentId
            });

            if (!firstAgent) {
              this.dagEngine.addEdge(dag.id, {
                source: previousNodeId,
                target: agentId
              });

              if (!firstAgent) {
                this.dagEngine.addEdge(dag.id, {
                  source: previousNodeId,
                  target: agentId
                });

                if (!firstAgent) {
                  this.dagEngine.addEdge(dag.id, {
                    source: previousNodeId,
                    target: agentId
                  });

                  if (!firstAgent) {
                    this.dagEngine.addEdge(dag.id, {
                      source: previousNodeId,
                      target: agentId
                    });

                    previousNodeId = node.id;
                  }
                  // Connect start node to the first agent
                  if (agentIds.length > 0) {
                    this.dagEngine.addEdge(dag.id, {
                      source: startNode.id,
                      target: agentIds[0]
                    });
                  }

                  const results = await this.dagEngine.executeDAG(dag.id, input);
                  const resultArray = Array.from(results.values());

                  const conflict: ConflictDescriptor = {
                    id: 'workflow-conflict',
                    description: 'Conflit de workflow',
                    agentIds,
                    severity: 'high',
                    timestamp: Date.now()
                  };

                  const resolvedResult = await this.conflictEngine.resolveConflict(
                    conflict,
                    resultArray
                  );

                  return resolvedResult as AgentResult;
                }
              }
            }
          }
        }
      }
    }
  
    return { agentId: 'empty', content: '', success: true, metadata: {} } as AgentResult;}
}

