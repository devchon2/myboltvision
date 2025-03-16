import type { AgentResult } from '../../types/agent.d.ts';

/**
 * Utilitaires pour les résultats d'agents
 * 
 * Suite à la refonte agentique, toutes les interfaces sont maintenant unifiées
 * selon la définition dans types/agent.d.ts.
 * 
 * Ces fonctions aident à assurer la compatibilité et la standardisation
 * des résultats d'agents dans tout le système.
 */

/**
 * Standardise un résultat d'agent en s'assurant qu'il a toutes les propriétés requises
 */
export function standardizeAgentResult(result: Partial<AgentResult>): AgentResult {
  return {
    agentId: result.agentId || 'unknown-agent',
    content: result.content || '',
    metadata: {
      ...result.metadata || {},
      timestamp: result.metadata?.timestamp || Date.now(),
      id: result.metadata?.id || `result-${Date.now()}`
    },
    success: result.success !== undefined ? result.success : true,
    error: result.error
  };
}

/**
 * Standardise un tableau de résultats d'agents
 */
export function standardizeAgentResults(results: Partial<AgentResult>[]): AgentResult[] {
  return results.map(result => standardizeAgentResult(result));
}

/**
 * Enrichit un résultat d'agent avec des métadonnées supplémentaires
 */
export function enrichAgentResult(
  result: AgentResult, 
  additionalMetadata: Record<string, any>
): AgentResult {
  return {
    ...result,
    metadata: {
      ...result.metadata,
      ...additionalMetadata,
      enrichedAt: Date.now()
    }
  };
}

/**
 * Crée un résultat d'agent avec les informations essentielles
 */
export function createAgentResult(
  agentId: string,
  content: string,
  success: boolean = true,
  metadata: Record<string, any> = {},
  error?: string
): AgentResult {
  return standardizeAgentResult({
    agentId,
    content,
    success,
    metadata,
    error
  });
}
