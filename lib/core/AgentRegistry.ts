import { Agent } from '../types/agent';
import { Context } from '../types/context';

/**
 * Registre central pour la gestion des agents
 */
export class AgentRegistry {
  private static instance: AgentRegistry;
  private agents: Map<string, Agent> = new Map();

  private constructor() {}

  static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }

    return AgentRegistry.instance;
  }

  /**
   * Enregistre un nouvel agent
   */
  registerAgent(agent: Agent): void {
    if (this.agents.has(agent.id)) {
      throw new Error(`Agent with id ${agent.id} already registered`);
    }

    this.agents.set(agent.id, agent);
  }

  /**
   * Récupère un agent par son ID
   */
  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  /**
   * Exécute une tâche via l'agent approprié
   */
  async executeTask(taskType: string, context: Context, params?: Record<string, any>): Promise<any> {
    const agent = Array.from(this.agents.values()).find((a) => a.supportedTaskTypes.includes(taskType));

    if (!agent) {
      throw new Error(`No agent found for task type: ${taskType}`);
    }

    return agent.execute(context, params);
  }

  /**
   * Liste tous les agents disponibles
   */
  listAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
}

// Exporte une instance singleton du registre
export const agentRegistry = AgentRegistry.getInstance();
