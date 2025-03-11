import type { ContextShard } from '../../types/context';
import { ContextManager } from './ContextManager';

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  execute: (input: string, context: ContextShard) => Promise<AgentResult>;
}

export interface AgentResult {
  id: string;
  agentId: string;
  content: string;
  timestamp: number;
  metadata: Record<string, any>;
  success: boolean;
  error?: string;
}

export interface WorkflowStep {
  id: string;
  agentId: string;
  input: string;
  dependsOn: string[];
  condition?: (previousResults: AgentResult[]) => boolean;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export class AgentOrchestrator {
  private agents = new Map<string, Agent>();
  private workflows = new Map<string, Workflow>();
  private contextManager: ContextManager;
  private executionHistory: AgentResult[] = [];

  constructor() {
    this.contextManager = new ContextManager();
  }

  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  async executeAgent(agentId: string, input: string): Promise<AgentResult> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent with ID ${agentId} not found`);
    }

    const context = await this.contextManager.enrichContext(input);
    const result = await agent.execute(input, context);
    
    this.executionHistory.push(result);
    return result;
  }

  async executeWorkflow(workflowId: string, initialInput: string): Promise<AgentResult[]> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow with ID ${workflowId} not found`);
    }

    const results = new Map<string, AgentResult>();
    const pendingSteps = [...workflow.steps];
    const completedStepIds = new Set<string>();
    const skippedStepIds = new Set<string>();

    // Tant qu'il reste des étapes à exécuter
    while (pendingSteps.length > 0) {
      let progress = false;
      
      // Identifier les étapes dont les dépendances sont satisfaites
      const stepsWithDependenciesMet = pendingSteps.filter(step => 
        step.dependsOn.every(depId => completedStepIds.has(depId) || skippedStepIds.has(depId))
      );
      
      // Parmi ces étapes, trouver celles qui sont prêtes à être exécutées (conditions satisfaites)
      const readySteps = stepsWithDependenciesMet.filter(step => {
        if (!step.condition) return true;
        
        const previousResults = Array.from(results.values());
        return step.condition(previousResults);
      });
      
      // Marquer comme "skipped" les étapes dont les conditions ne sont pas satisfaites
      const skippedSteps = stepsWithDependenciesMet.filter(step => !readySteps.includes(step));
      if (skippedSteps.length > 0) {
        progress = true;
        for (const step of skippedSteps) {
          skippedStepIds.add(step.id);
          const index = pendingSteps.findIndex(s => s.id === step.id);
          if (index !== -1) {
            pendingSteps.splice(index, 1);
          }
        }
      }

      // Exécuter les étapes prêtes en parallèle
      if (readySteps.length > 0) {
        progress = true;
        const stepPromises = readySteps.map(async step => {
          // Préparer l'entrée pour cette étape
          let input = step.input || initialInput;
          
          // Si l'entrée contient des placeholders pour les résultats précédents, les remplacer
          if (input.includes('{{') && input.includes('}}')) {
            for (const [stepId, result] of results.entries()) {
              input = input.replace(`{{${stepId}}}`, result.content);
            }
          }

          // Exécuter l'agent
          const result = await this.executeAgent(step.agentId, input);
          
          // Stocker le résultat et marquer l'étape comme complétée
          results.set(step.id, result);
          completedStepIds.add(step.id);
          
          // Retirer l'étape de la liste des étapes en attente
          const index = pendingSteps.findIndex(s => s.id === step.id);
          if (index !== -1) {
            pendingSteps.splice(index, 1);
          }
          
          return result;
        });

        await Promise.all(stepPromises);
      }
      
      // Si aucun progrès n'a été fait dans cette itération, c'est un deadlock
      if (!progress && pendingSteps.length > 0) {
        throw new Error('Workflow deadlock: no steps can be executed but workflow is not complete');
      }
    }

    return Array.from(results.values());
  }

  getExecutionHistory(): AgentResult[] {
    return [...this.executionHistory];
  }

  clearExecutionHistory(): void {
    this.executionHistory = [];
  }

  getRegisteredAgents(): string[] {
    return Array.from(this.agents.keys());
  }

  getRegisteredWorkflows(): string[] {
    return Array.from(this.workflows.keys());
  }
}
