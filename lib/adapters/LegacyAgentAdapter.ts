import type { Agent, AgentResult } from '../../types/agent.d.ts';
import type { ContextShard } from '../../types/context.js';
import { standardizeAgentResult } from './AgentResultAdapter.js';

/**
 * Module de compatibilité pour assurer la transition vers l'architecture unifiée
 * 
 * Suite à la refonte agentique, toutes les interfaces sont maintenant unifiées
 * selon la définition dans types/agent.d.ts.
 * 
 * Ces classes et fonctions aident à assurer la compatibilité avec l'existant
 * tout en utilisant les nouvelles interfaces standardisées.
 */

/**
 * Standardise et wrapper un agent pour garantir la compatibilité
 * avec l'interface Agent unifiée
 */
export class AgentStandardizer implements Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  
  private sourceAgent: Partial<Agent>;

  constructor(agent: Partial<Agent>) {
    this.sourceAgent = agent;
    this.id = agent.id || `agent-${Date.now()}`;
    this.name = agent.name || 'Agent non nommé';
    this.description = agent.description || 'Aucune description fournie';
    this.capabilities = agent.capabilities || [];
  }

  /**
   * Exécute l'agent source et standardise son résultat
   */
  async execute(input: string, context: ContextShard): Promise<AgentResult> {
    if (!this.sourceAgent.execute) {
      return standardizeAgentResult({
        agentId: this.id,
        content: 'Cet agent ne peut pas être exécuté car il ne fournit pas de méthode execute.',
        success: false,
        error: 'Agent incompatible: pas de méthode execute'
      });
    }
    
    try {
      const result = await this.sourceAgent.execute(input, context);
      return standardizeAgentResult(result);
    } catch (error) {
      return standardizeAgentResult({
        agentId: this.id,
        content: `Erreur lors de l'exécution de l'agent: ${error instanceof Error ? error.message : String(error)}`,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}

/**
 * Crée un agent standardisé à partir d'un agent partiel ou non standard
 */
export function standardizeAgent(agent: Partial<Agent>): Agent {
  return new AgentStandardizer(agent);
}

/**
 * Type générique pour une fonction qui peut être utilisée comme un agent simple
 */
export type AgentFunction = (input: string, context?: ContextShard) => Promise<Partial<AgentResult> | string>;

/**
 * Crée un agent à partir d'une simple fonction
 */
export function createAgentFromFunction(
  func: AgentFunction,
  id: string,
  name: string,
  description: string = 'Agent fonctionnel',
  capabilities: string[] = []
): Agent {
  return {
    id,
    name,
    description,
    capabilities,
    async execute(input: string, context: ContextShard): Promise<AgentResult> {
      try {
        const result = await func(input, context);
        
        if (typeof result === 'string') {
          return standardizeAgentResult({
            agentId: id,
            content: result,
            success: true
          });
        } else {
          return standardizeAgentResult({
            agentId: id,
            ...result
          });
        }
      } catch (error) {
        return standardizeAgentResult({
          agentId: id,
          content: `Erreur lors de l'exécution de l'agent: ${error instanceof Error ? error.message : String(error)}`,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  };
}
