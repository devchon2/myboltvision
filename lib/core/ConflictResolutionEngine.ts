import type { Agent, AgentResult, ConflictDescriptor, ResolutionStrategy } from '../../types/agent.d.ts';

// Réexporter les interfaces pour compatibilité
export type { ConflictDescriptor, ResolutionStrategy };
import { standardizeAgentResult } from '../adapters/AgentResultAdapter.js';

/**
 * Le ConflictResolutionEngine est responsable de détecter et résoudre les conflits 
 * entre les résultats fournis par différents agents.
 */
export class ConflictResolutionEngine {
  private agents = new Map<string, Agent>();
  private strategies = new Map<string, ResolutionStrategy>();
  private conflicts: ConflictDescriptor[] = [];
  private metaAgent: Agent | null = null;

  /**
   * Enregistre un agent dans le système de résolution de conflits
   */
  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
    
    // Si c'est un agent de méta-recherche, l'enregistrer comme méta-agent
    if (agent.capabilities.includes('conflict-resolution')) {
      this.metaAgent = agent;
    }
  }

  /**
   * Enregistre une stratégie de résolution de conflits
   */
  registerStrategy(strategy: ResolutionStrategy): void {
    this.strategies.set(strategy.id, strategy);
  }

  /**
   * Détecte si deux résultats d'agents sont en conflit
   */
  private detectConflict(result1: AgentResult, result2: AgentResult): boolean {
    // Détection de contradiction explicite dans les métadonnées
    if (result1.metadata.contradicts === result2.agentId || result2.metadata.contradicts === result1.agentId) {
      return true;
    }

    // Détection de conflit sur les valeurs numériques (différence > 30%)
    const numericKeys = Object.keys(result1.metadata).filter(
      key => typeof result1.metadata[key] === 'number' && typeof result2.metadata[key] === 'number'
    );
    
    for (const key of numericKeys) {
      const val1 = result1.metadata[key];
      const val2 = result2.metadata[key];
      const avg = (val1 + val2) / 2;
      
      if (avg > 0 && Math.abs(val1 - val2) / avg > 0.3) {
        return true;
      }
    }
    
    // Autres mécanismes de détection de conflits à implémenter...
    
    return false;
  }

  /**
   * Analyse un ensemble de résultats pour détecter les conflits
   */
  async detectConflicts(results: AgentResult[]): Promise<ConflictDescriptor[]> {
    const detectedConflicts: ConflictDescriptor[] = [];
    
    // Comparer chaque paire de résultats
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        if (this.detectConflict(results[i], results[j])) {
          const conflict: ConflictDescriptor = {
            id: `conflict-${Date.now()}-${i}-${j}`,
            agentIds: [results[i].agentId, results[j].agentId],
            description: `Conflit détecté entre ${results[i].agentId} et ${results[j].agentId}`,
            severity: 'medium', // Sévérité par défaut
            timestamp: Date.now()
          };
          
          detectedConflicts.push(conflict);
          this.conflicts.push(conflict);
        }
      }
    }
    
    return detectedConflicts;
  }

  /**
   * Résout un conflit en utilisant le MetaAgentSearch ou une stratégie définie
   */
  async resolveConflict(
    conflict: ConflictDescriptor, 
    results: AgentResult[],
    strategyId?: string
  ): Promise<AgentResult> {
    // Si une stratégie spécifique est demandée, l'utiliser
    if (strategyId && this.strategies.has(strategyId)) {
      const strategy = this.strategies.get(strategyId)!;
      const rawResult = await strategy.applyResolution(conflict, results);
      return standardizeAgentResult(rawResult);
    }
    
    // Si un meta-agent est disponible, l'utiliser pour résoudre le conflit
    if (this.metaAgent) {
      const conflictAgents = conflict.agentIds.map(id => {
        const agent = this.agents.get(id);
        return agent ? `${agent.name} (${id})` : id;
      }).join(' et ');
      
      const conflictDetails = conflict.agentIds.map(id => {
        const result = results.find(r => r.agentId === id);
        return result ? `${id}: ${result.content.substring(0, 100)}...` : id;
      }).join('\n\n');
      
      const input = `[CONFLICT] Résoudre le conflit entre ${conflictAgents}.\n\nDétails du conflit:\n${conflictDetails}`;
      
      // Créer un contexte minimal pour l'appel
      const context = {
        id: `ctx-${Date.now()}`,
        content: input,
        timestamp: Date.now()
      };
      
      const rawResult = await this.metaAgent.execute(input, context as any);
      return standardizeAgentResult(rawResult);
    }
    
    // Fallback: retourner le résultat avec la confiance la plus élevée
    const conflictingResults = results.filter(r => conflict.agentIds.includes(r.agentId));
    const bestResult = conflictingResults.reduce((highest, current) => {
      const currentConfidence = current.metadata.confidence || 0;
      const highestConfidence = highest.metadata.confidence || 0;
      return currentConfidence > highestConfidence ? current : highest;
    }, conflictingResults[0]);
    
    return standardizeAgentResult(bestResult);
  }

  /**
   * Récupère l'historique des conflits détectés
   */
  getConflictHistory(): ConflictDescriptor[] {
    // Trier les conflits par sévérité (high, medium, low)
    const sortedConflicts = [...this.conflicts].sort((a, b) => {
      const severityOrder: { [key: string]: number } = {
        'high': 1,
        'medium': 2,
        'low': 3
      };
      return (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4);
    });
    return sortedConflicts;
  }

  /**
   * Efface l'historique des conflits
   */
  clearConflictHistory(): void {
    this.conflicts = [];
  }
}
