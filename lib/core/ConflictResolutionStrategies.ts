import type { ConflictDescriptor, ResolutionStrategy, AgentResult } from '../../types/agent.d.ts';
import { standardizeAgentResult } from '../adapters/AgentResultAdapter.js';

/**
 * Stratégies de résolution de conflits pour le ConflictResolutionEngine
 * 
 * Ce fichier implémente plusieurs stratégies de résolution qui peuvent être
 * enregistrées dans le moteur de résolution de conflits.
 */

/**
 * Stratégie de confiance pondérée - résout en faveur de l'agent avec la confiance la plus élevée
 */
export const weightedConfidenceStrategy: ResolutionStrategy = {
  id: 'weighted-confidence',
  name: 'Stratégie de Confiance Pondérée',
  description: 'Résout les conflits en favorisant les agents avec la plus haute confiance',
  applyResolution: async (conflict: ConflictDescriptor, results: AgentResult[]): Promise<AgentResult> => {
    // Filtrer les résultats pour ne garder que ceux impliqués dans le conflit
    const conflictResults = results.filter(r => conflict.agentIds.includes(r.agentId));
    
    // Trier par niveau de confiance (du plus élevé au plus bas)
    const sortedByConfidence = [...conflictResults].sort((a, b) => {
      const confA = a.metadata.confidence || 0;
      const confB = b.metadata.confidence || 0;
      return confB - confA;
    });
    
    const winningResult = sortedByConfidence[0];
    const now = Date.now();
    
    // Utiliser standardizeAgentResult pour assurer la compatibilité
    return standardizeAgentResult({
      agentId: 'conflict-resolver',
      content: `Conflit résolu en faveur de ${winningResult.agentId} (confiance: ${winningResult.metadata.confidence || 'N/A'}).\n\n` +
              `Raison: Le résultat de l'agent ${winningResult.agentId} a été sélectionné en raison de son niveau de confiance plus élevé.\n\n` +
              `Résultat retenu: ${winningResult.content}`,
      success: true,
      metadata: {
        id: `resolution-confidence-${now}`,
        timestamp: now,
        resolvedFromConflict: true,
        resolutionStrategy: 'weighted-confidence',
        originalConflict: conflict.id,
        winningAgent: winningResult.agentId,
        confidenceScores: conflictResults.map(r => ({ 
          agentId: r.agentId, 
          confidence: r.metadata.confidence || 0 
        }))
      }
    });
  }
};

/**
 * Stratégie de négociation - cherche un compromis entre les résultats conflictuels
 */
export const negotiationStrategy: ResolutionStrategy = {
  id: 'negotiation',
  name: 'Stratégie de Négociation',
  description: 'Tente de trouver un compromis entre les résultats conflictuels',
  applyResolution: async (conflict: ConflictDescriptor, results: AgentResult[]): Promise<AgentResult> => {
    // Filtrer les résultats pour ne garder que ceux impliqués dans le conflit
    const conflictResults = results.filter(r => conflict.agentIds.includes(r.agentId));
    
    if (conflictResults.length < 2) {
      return standardizeAgentResult({
        agentId: 'conflict-resolver',
        content: 'Impossible de négocier: pas assez de résultats conflictuels',
        success: false,
        metadata: {
          id: `resolution-negotiation-invalid-${Date.now()}`,
          timestamp: Date.now(),
          resolvedFromConflict: false,
          resolutionStrategy: 'negotiation',
          originalConflict: conflict.id,
          error: 'insufficient-results'
        }
      });
    }
    
    // Identifier les valeurs numériques communes qui peuvent être négociées
    const numericKeys: string[] = [];
    const allMetadataKeys = new Set<string>();
    
    // Collecter toutes les clés de métadonnées
    conflictResults.forEach(result => {
      Object.keys(result.metadata).forEach(key => allMetadataKeys.add(key));
    });
    
    // Identifier les clés numériques communes
    Array.from(allMetadataKeys).forEach(key => {
      if (conflictResults.every(result => 
        typeof result.metadata[key] === 'number'
      )) {
        numericKeys.push(key);
      }
    });
    
    let content = 'Résolution par négociation: ';
    const compromiseValues: Record<string, number> = {};
    
    if (numericKeys.length > 0) {
      // Calculer les valeurs moyennes pour chaque clé numérique
      numericKeys.forEach(key => {
        const sum = conflictResults.reduce((acc, result) => acc + (result.metadata[key] as number), 0);
        const average = sum / conflictResults.length;
        compromiseValues[key] = Math.round(average * 100) / 100; // Arrondi à 2 décimales
      });
      
      // Former le message de compromis
      content += 'Compromis trouvé sur: ';
      content += numericKeys.map(key => `${key} = ${compromiseValues[key]}`).join(', ');
    } else {
      // Pas de valeurs numériques communes, essayer de trouver un compromis textuel
      content += "Aucune valeur numérique commune trouvée. ";
      
      // Vérifier s'il y a des recommandations qui peuvent être combinées
      const recommendations = conflictResults.map(r => r.content);
      content += `\n\nRésultats pris en compte:\n${recommendations.map((r, i) => `${i+1}. ${r}`).join('\n')}\n\n`;
      content += "Recommandation d'examen humain de ces perspectives contradictoires.";
    }
    
    const now = Date.now();
    return standardizeAgentResult({
      agentId: 'conflict-resolver',
      content,
      success: true,
      metadata: {
        id: `resolution-negotiation-${now}`,
        timestamp: now,
        resolvedFromConflict: true,
        resolutionStrategy: 'negotiation',
        originalConflict: conflict.id,
        compromiseValues,
        involvedAgents: conflictResults.map(r => r.agentId)
      }
    });
  }
};

/**
 * Stratégie de vote majoritaire - résout en faveur de l'option soutenue par le plus d'agents
 */
export const majorityVoteStrategy: ResolutionStrategy = {
  id: 'majority-vote',
  name: 'Stratégie de Vote Majoritaire',
  description: 'Résout les conflits par un système de vote où chaque agent a une voix',
  applyResolution: async (conflict: ConflictDescriptor, results: AgentResult[]): Promise<AgentResult> => {
    // Cette stratégie nécessite au moins 3 agents pour être efficace
    if (results.length < 3) {
      return standardizeAgentResult({
        agentId: 'conflict-resolver',
        content: 'Impossible de résoudre par vote: pas assez d\'agents participants',
        success: false,
        metadata: {
          id: `resolution-vote-invalid-${Date.now()}`,
          timestamp: Date.now(),
          resolvedFromConflict: false,
          resolutionStrategy: 'majority-vote',
          originalConflict: conflict.id,
          error: 'insufficient-voters'
        }
      });
    }
    
    // Identifier les positions possibles sur le conflit
    const positions = new Map<string, { count: number, agents: string[], examples: AgentResult[] }>();
    
    // Pour chaque résultat, essayer de l'associer à une position
    results.forEach(result => {
      // Les positions peuvent être identifiées par:
      // 1. Des métadonnées explicites comme "position" ou "recommendation"
      // 2. Des valeurs distinctes de certaines métadonnées comme "marketSize"
      // 3. Des mots-clés dans le contenu
      
      let position = '';
      
      // 1. Vérifier les métadonnées explicites
      if (result.metadata.position) {
        position = String(result.metadata.position);
      } else if (result.metadata.recommendation) {
        position = String(result.metadata.recommendation);
      } else if (result.metadata.decision) {
        position = String(result.metadata.decision);
      }
      // 2. Si pas de position explicite, utiliser une clé de métadonnée pertinente au conflit
      else if (conflict.description.toLowerCase().includes('marché') && result.metadata.marketSize) {
        position = `marketSize:${result.metadata.marketSize}`;
      } else if (conflict.description.toLowerCase().includes('temps') && result.metadata.timeEstimate) {
        position = `timeEstimate:${result.metadata.timeEstimate}`;
      }
      // 3. Dernier recours: utiliser l'ID de l'agent car on ne peut pas déterminer la position
      else {
        position = `agent:${result.agentId}`;
      }
      
      // Ajouter ou mettre à jour la position
      if (!positions.has(position)) {
        positions.set(position, { count: 0, agents: [], examples: [] });
      }
      
      const positionData = positions.get(position)!;
      positionData.count++;
      positionData.agents.push(result.agentId);
      positionData.examples.push(result);
    });
    
    // Trouver la position gagnante (celle avec le plus de voix)
    let winningPosition = '';
    let maxVotes = 0;
    
    positions.forEach((data, pos) => {
      if (data.count > maxVotes) {
        maxVotes = data.count;
        winningPosition = pos;
      }
    });
    
    // Vérifier s'il y a égalité
    const ties = Array.from(positions.entries())
      .filter(([pos, data]) => data.count === maxVotes && pos !== winningPosition);
    
    let content = '';
    const now = Date.now();
    
    // S'il y a égalité, utiliser les niveaux de confiance pour départager
    if (ties.length > 0) {
      const allTiedPositions = [winningPosition, ...ties.map(([pos]) => pos)];
      
      // Calculer la confiance moyenne pour chaque position à égalité
      const confidenceScores = allTiedPositions.map(pos => {
        const examples = positions.get(pos)!.examples;
        const avgConfidence = examples.reduce((sum, ex) => sum + (ex.metadata.confidence || 0), 0) / examples.length;
        return { position: pos, confidence: avgConfidence };
      });
      
      // Trier par confiance
      confidenceScores.sort((a, b) => b.confidence - a.confidence);
      
      winningPosition = confidenceScores[0].position;
      
      content = `Résolution par vote majoritaire avec départage par confiance: ` +
                `la position "${winningPosition}" a gagné avec ${maxVotes} voix ` +
                `et une confiance moyenne de ${confidenceScores[0].confidence.toFixed(2)}.\n\n` +
                `Agents soutenant cette position: ${positions.get(winningPosition)!.agents.join(', ')}\n\n` +
                `Il y a eu égalité entre: ${allTiedPositions.join(', ')}`;
    } else {
      content = `Résolution par vote majoritaire: ` +
                `la position "${winningPosition}" a gagné avec ${maxVotes} voix.\n\n` +
                `Agents soutenant cette position: ${positions.get(winningPosition)!.agents.join(', ')}`;
    }
    
    // Ajouter un exemple de résultat de la position gagnante
    const winningExample = positions.get(winningPosition)!.examples[0];
    content += `\n\nPosition gagnante: ${winningExample.content}`;
    
    return standardizeAgentResult({
      agentId: 'conflict-resolver',
      content,
      success: true,
      metadata: {
        id: `resolution-vote-${now}`,
        timestamp: now,
        resolvedFromConflict: true,
        resolutionStrategy: 'majority-vote',
        originalConflict: conflict.id,
        winningPosition,
        votes: maxVotes,
        totalParticipants: results.length,
        votingResults: Object.fromEntries(
          Array.from(positions.entries()).map(([pos, data]) => [pos, { count: data.count, agents: data.agents }])
        )
      }
    });
  }
};

/**
 * Stratégie d'arbitrage contextuel - résout en fonction du contexte et des priorités spécifiées
 */
export const contextualArbitrationStrategy: ResolutionStrategy = {
  id: 'contextual-arbitration',
  name: 'Stratégie d\'Arbitrage Contextuel',
  description: 'Résout les conflits en tenant compte du contexte global et des priorités de l\'application',
  applyResolution: async (conflict: ConflictDescriptor, results: AgentResult[]): Promise<AgentResult> => {
    // Filtrer les résultats pour ne garder que ceux impliqués dans le conflit
    const conflictResults = results.filter(r => conflict.agentIds.includes(r.agentId));
    
    // Définir des priorités par type d'agent (dans un système réel, ces priorités seraient configurables)
    const agentPriorities: Record<string, number> = {
      'business-strategy-agent': 5,  // Priorité élevée aux considérations business
      'security-agent': 5,           // Priorité élevée à la sécurité
      'legal-agent': 5,              // Priorité élevée aux aspects légaux
      'design-agent': 3,             // Priorité moyenne au design
      'documentation-agent': 2,      // Priorité basse à la documentation
      'ideation-agent': 4            // Priorité moyenne-haute à l'innovation
    };
    
    // Priorités par sévérité de conflit
    const severityMultipliers: Record<string, number> = {
      'high': 2.0,    // Les conflits de haute sévérité doublent l'importance
      'medium': 1.0,  // Les conflits de sévérité moyenne gardent l'importance normale
      'low': 0.5      // Les conflits de basse sévérité réduisent l'importance
    };
    
    // Priorités contextuelles basées sur des mots-clés dans la description du conflit
    const contextualPriorities: [RegExp, string, number][] = [
      [/sécurité|vulnérabilité|risque|protection/i, 'security-agent', 2.0],
      [/financ|coût|budget|rentabilité/i, 'business-strategy-agent', 2.0],
      [/légal|compliance|règlement|juridique/i, 'legal-agent', 2.0],
      [/innovation|créativité|nouvelle|disruption/i, 'ideation-agent', 1.5],
      [/design|interface|expérience|utilisateur|UX/i, 'design-agent', 1.5]
    ];
    
    // Calculer les scores finaux en tenant compte de toutes les priorités
    const finalScores: Record<string, { score: number, result: AgentResult }> = {};
    
    for (const result of conflictResults) {
      // Score de base selon la priorité de l'agent
      let score = agentPriorities[result.agentId] || 1;
      
      // Appliquer le multiplicateur de sévérité
      score *= severityMultipliers[conflict.severity] || 1;
      
      // Appliquer les multiplicateurs contextuels
      for (const [pattern, agentId, multiplier] of contextualPriorities) {
        if (agentId === result.agentId && pattern.test(conflict.description)) {
          score *= multiplier;
          break;
        }
      }
      
      // Ajuster selon le niveau de confiance
      if (result.metadata.confidence) {
        score *= (result.metadata.confidence as number);
      }
      
      finalScores[result.agentId] = { score, result };
    }
    
    // Trouver l'agent avec le score le plus élevé
    let highestScore = 0;
    let winningAgentId = '';
    
    Object.entries(finalScores).forEach(([agentId, { score }]) => {
      if (score > highestScore) {
        highestScore = score;
        winningAgentId = agentId;
      }
    });
    
    const winningResult = finalScores[winningAgentId].result;
    
    // Construire la réponse
    let content = `Résolution par arbitrage contextuel: Le résultat de l'agent ${winningAgentId} a été sélectionné `;
    content += `avec un score de priorité de ${highestScore.toFixed(2)}.\n\n`;
    content += `Critères d'arbitrage:\n`;
    content += `- Priorité de base de l'agent: ${agentPriorities[winningAgentId] || 1}\n`;
    content += `- Multiplicateur de sévérité (${conflict.severity}): ${severityMultipliers[conflict.severity] || 1}\n`;
    
    // Ajouter des informations sur les contextes appliqués
    for (const [pattern, agentId, multiplier] of contextualPriorities) {
      if (agentId === winningAgentId && pattern.test(conflict.description)) {
        content += `- Contexte identifié: "${pattern.source}" (×${multiplier})\n`;
      }
    }
    
    if (winningResult.metadata.confidence) {
      content += `- Niveau de confiance: ${winningResult.metadata.confidence}\n`;
    }
    
    content += `\nRésultat retenu: ${winningResult.content}`;
    
    const now = Date.now();
    return standardizeAgentResult({
      agentId: 'conflict-resolver',
      content,
      success: true,
      metadata: {
        id: `resolution-arbitration-${now}`,
        timestamp: now,
        resolvedFromConflict: true,
        resolutionStrategy: 'contextual-arbitration',
        originalConflict: conflict.id,
        winningAgent: winningAgentId,
        finalScores: Object.fromEntries(
          Object.entries(finalScores).map(([id, { score }]) => [id, score])
        ),
        appliedContexts: contextualPriorities
          .filter(([pattern, agentId]) => agentId === winningAgentId && pattern.test(conflict.description))
          .map(([pattern]) => pattern.source)
      }
    });
  }
};

// Exporter toutes les stratégies
export const allStrategies: ResolutionStrategy[] = [
  weightedConfidenceStrategy,
  negotiationStrategy,
  majorityVoteStrategy,
  contextualArbitrationStrategy
];

/**
 * Enregistre toutes les stratégies de résolution dans un moteur de résolution de conflits
 */
export function registerAllStrategies(engine: { registerStrategy: (strategy: ResolutionStrategy) => void }): void {
  allStrategies.forEach(strategy => engine.registerStrategy(strategy));
}
