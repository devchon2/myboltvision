import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConflictResolutionEngine, ConflictDescriptor, ResolutionStrategy } from '../lib/core/ConflictResolutionEngine.js';
import { Agent, AgentResult } from '../lib/core/AgentOrchestrator.js';
import { MetaAgentSearch } from '../lib/agents/MetaAgentSearch.js';
import { BusinessStrategyAgent } from '../lib/agents/BusinessStrategyAgent.js';

describe('ConflictResolutionEngine', () => {
  let conflictEngine: ConflictResolutionEngine;
  let metaAgent: Agent;
  let businessAgent: Agent;

  // Résultats d'agents fictifs avec conflits pour les tests
  const timestamp = Date.now();
  const marketSizeConflict: AgentResult[] = [
    {
      id: `result-${timestamp}-1`,
      agentId: 'ideation-agent',
      content: 'Le marché potentiel est estimé à 50 millions d\'euros.',
      timestamp: timestamp,
      success: true,
      metadata: {
        marketSize: 50000000,
        confidence: 0.8
      }
    },
    {
      id: `result-${timestamp}-2`,
      agentId: 'business-strategy-agent',
      content: 'Nos analyses indiquent un marché de 30 millions d\'euros.',
      timestamp: timestamp,
      success: true,
      metadata: {
        marketSize: 30000000,
        confidence: 0.9
      }
    }
  ];

  const recommendationConflict: AgentResult[] = [
    {
      id: `result-${timestamp}-3`,
      agentId: 'ideation-agent',
      content: 'Je recommande fortement de poursuivre ce projet innovant.',
      timestamp: timestamp,
      success: true,
      metadata: {
        recommendation: 'pursue',
        innovationScore: 0.85,
        confidence: 0.75
      }
    },
    {
      id: `result-${timestamp}-4`,
      agentId: 'business-strategy-agent',
      content: 'Les risques financiers sont trop élevés, je déconseille ce projet.',
      timestamp: timestamp,
      success: true,
      metadata: {
        recommendation: 'abandon',
        riskScore: 0.8,
        confidence: 0.9,
        contradicts: 'ideation-agent'
      }
    }
  ];

  const timelineConflict: AgentResult[] = [
    {
      id: `result-${timestamp}-5`,
      agentId: 'design-agent',
      content: 'La phase de design nécessitera 12 semaines.',
      timestamp: timestamp,
      success: true,
      metadata: {
        timeEstimate: 12,
        confidence: 0.7
      }
    },
    {
      id: `result-${timestamp}-6`,
      agentId: 'deployment-agent',
      content: 'Plan de déploiement calculé sur une estimation de 6 semaines pour le design.',
      timestamp: timestamp,
      success: true,
      metadata: {
        timeEstimate: 6,
        confidence: 0.8
      }
    }
  ];

  // Mock de stratégie de résolution
  const mockWeightedConfidenceStrategy: ResolutionStrategy = {
    id: 'weighted-confidence',
    name: 'Stratégie de Confiance Pondérée',
    description: 'Résout les conflits en favorisant les agents avec la plus haute confiance',
    applyResolution: async (conflict, results) => {
      // Trouver le résultat avec la confiance la plus élevée
      const sortedByConfidence = [...results].sort((a, b) => {
        const confA = a.metadata.confidence || 0;
        const confB = b.metadata.confidence || 0;
        return confB - confA;
      });

      const now = Date.now();
      return {
        id: `resolution-${now}`,
        agentId: 'conflict-resolver',
        content: `Conflit résolu en faveur de ${sortedByConfidence[0].agentId} (confiance: ${sortedByConfidence[0].metadata.confidence}).`,
        timestamp: now,
        success: true,
        metadata: {
          resolvedFromConflict: true,
          originalResults: results.map(r => r.agentId),
          winningAgent: sortedByConfidence[0].agentId,
          resolutionStrategy: 'weighted-confidence'
        }
      };
    }
  };

  // Mock de stratégie de résolution
  const mockNegotiationStrategy: ResolutionStrategy = {
    id: 'negotiation',
    name: 'Stratégie de Négociation',
    description: 'Tente de trouver un compromis entre les résultats conflictuels',
    applyResolution: async (conflict, results) => {
      // Cette stratégie cherche un point médian entre les valeurs
      // Exemple simplifié: pour des valeurs numériques, prendre la moyenne
      const firstResult = results[0];
      const secondResult = results[1];
      
      let content = 'Résolution par négociation: ';
      let compromiseValue: number | undefined = undefined;

      // Exemple: négocier sur les estimations de temps
      if (firstResult.metadata.timeEstimate !== undefined && 
          secondResult.metadata.timeEstimate !== undefined) {
        
        const time1 = firstResult.metadata.timeEstimate;
        const time2 = secondResult.metadata.timeEstimate;
        compromiseValue = Math.round((time1 + time2) / 2);
        
        content += `Compromis sur l'estimation de temps: ${compromiseValue} semaines.`;
      }
      // Exemple: négocier sur la taille du marché
      else if (firstResult.metadata.marketSize !== undefined && 
               secondResult.metadata.marketSize !== undefined) {
        
        const size1 = firstResult.metadata.marketSize;
        const size2 = secondResult.metadata.marketSize;
        compromiseValue = Math.round((size1 + size2) / 2);
        
        content += `Compromis sur la taille du marché: ${compromiseValue.toLocaleString()} €.`;
      }
      // Si on ne peut pas négocier, on explique pourquoi
      else {
        content += "Impossible de trouver un compromis numérique, recommandation d'examen humain.";
      }

      const now = Date.now();
      return {
        id: `resolution-${now}`,
        agentId: 'conflict-resolver',
        content,
        timestamp: now,
        success: true,
        metadata: {
          resolvedFromConflict: true,
          originalResults: results.map(r => r.agentId),
          compromiseValue,
          resolutionStrategy: 'negotiation'
        }
      };
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Créer une instance du moteur de résolution de conflits
    conflictEngine = new ConflictResolutionEngine();
    
    // Créer des mocks d'agents
    // Créer des mocks d'agents directement avec l'interface Agent
    metaAgent = {
      id: 'meta-agent-search',
      name: "Agent de Méta-recherche",
      description: "Orchestre les interactions entre agents et optimise les résultats",
      capabilities: ['agent-discovery', 'feedback-automation', 'conflict-resolution', 'agent-programming'],
      execute: vi.fn().mockResolvedValue({
        id: `meta-${Date.now()}`,
        agentId: 'meta-agent-search',
        content: 'Résolution de conflit: les préoccupations financières doivent être prioritaires.',
        timestamp: Date.now(),
        metadata: { requestType: 'conflict-resolution' },
        success: true
      })
    };
    
    businessAgent = {
      id: 'business-strategy-agent',
      name: "Agent de Stratégie Business",
      description: "Analyse financière et stratégie d'entreprise",
      capabilities: ['market-analysis', 'financial-projection', 'strategic-planning', 'competition-analysis'],
      execute: vi.fn()
    };
    
    // Enregistrer les agents dans le moteur
    conflictEngine.registerAgent(metaAgent);
    conflictEngine.registerAgent(businessAgent);
    
    // Enregistrer les stratégies de résolution
    conflictEngine.registerStrategy(mockWeightedConfidenceStrategy);
    conflictEngine.registerStrategy(mockNegotiationStrategy);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devrait détecter un conflit entre deux agents avec des valeurs numériques divergentes', async () => {
    const conflicts = await conflictEngine.detectConflicts(marketSizeConflict);
    
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0].agentIds).toContain('ideation-agent');
    expect(conflicts[0].agentIds).toContain('business-strategy-agent');
  });

  it('devrait détecter un conflit explicite marqué par contradicts', async () => {
    const conflicts = await conflictEngine.detectConflicts(recommendationConflict);
    
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0].agentIds).toContain('ideation-agent');
    expect(conflicts[0].agentIds).toContain('business-strategy-agent');
  });

  it('devrait détecter un conflit sur les estimations de temps', async () => {
    const conflicts = await conflictEngine.detectConflicts(timelineConflict);
    
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0].agentIds).toContain('design-agent');
    expect(conflicts[0].agentIds).toContain('deployment-agent');
  });

  it('devrait résoudre un conflit en utilisant le MetaAgentSearch', async () => {
    const conflicts = await conflictEngine.detectConflicts(recommendationConflict);
    const resolution = await conflictEngine.resolveConflict(conflicts[0], recommendationConflict);
    
    expect(metaAgent.execute).toHaveBeenCalled();
    expect(resolution).toBeDefined();
    expect(resolution.agentId).toBe('meta-agent-search');
    expect(resolution.content).toContain('Résolution de conflit');
  });

  it('devrait résoudre un conflit en utilisant la stratégie de confiance pondérée', async () => {
    const conflicts = await conflictEngine.detectConflicts(recommendationConflict);
    const resolution = await conflictEngine.resolveConflict(
      conflicts[0], 
      recommendationConflict,
      'weighted-confidence'
    );
    
    expect(resolution).toBeDefined();
    expect(resolution.metadata.resolutionStrategy).toBe('weighted-confidence');
    expect(resolution.metadata.winningAgent).toBe('business-strategy-agent'); // Car confiance de 0.9
  });

it('devrait résoudre un conflit numérique en utilisant la stratégie de négociation', async () => {
  const conflicts = await conflictEngine.detectConflicts(marketSizeConflict);
  const resolution = await conflictEngine.resolveConflict(
    conflicts[0],
    marketSizeConflict,
    'negotiation'
  );

  expect(resolution).toBeDefined();
  expect(resolution.metadata.resolutionStrategy).toBe('negotiation');
  expect(resolution.metadata.compromiseValue).toBe(40000000);
  expect(resolution.content).toContain('40,000,000');
});

  it('devrait résoudre un conflit de timeline en utilisant la stratégie de négociation', async () => {
    const conflicts = await conflictEngine.detectConflicts(timelineConflict);
    const resolution = await conflictEngine.resolveConflict(
      conflicts[0], 
      timelineConflict,
      'negotiation'
    );
    
    expect(resolution).toBeDefined();
    expect(resolution.metadata.resolutionStrategy).toBe('negotiation');
    expect(resolution.metadata.compromiseValue).toBe(9); // Moyenne arrondie
    expect(resolution.content).toContain('9 semaines');
  });

  it('devrait garder un historique des conflits détectés', async () => {
    await conflictEngine.detectConflicts(marketSizeConflict);
    await conflictEngine.detectConflicts(recommendationConflict);
    
    const history = conflictEngine.getConflictHistory();
    
    expect(history).toHaveLength(2);
  });

  it('devrait nettoyer l\'historique des conflits', async () => {
    await conflictEngine.detectConflicts(marketSizeConflict);
    conflictEngine.clearConflictHistory();
    
    const history = conflictEngine.getConflictHistory();
    
    expect(history).toHaveLength(0);
  });

  // Tests pour des scénarios plus complexes

  it('devrait gérer un scénario avec plusieurs conflits entre différents agents', async () => {
    // Créer un scénario avec plusieurs résultats conflictuels
    const multiAgentResults = [
      ...marketSizeConflict,
      ...timelineConflict,
      {
        id: `result-${Date.now()}-7`,
        agentId: 'documentation-agent',
        content: 'Documentation complète nécessaire avant le déploiement.',
        timestamp: Date.now(),
        success: true,
        metadata: {
          requiresDocumentation: true,
          confidence: 0.95
        }
      }
    ];
    
    const conflicts = await conflictEngine.detectConflicts(multiAgentResults);
    
    expect(conflicts.length).toBeGreaterThanOrEqual(2); // Au moins les deux conflits connus
    
    // Résoudre tous les conflits
    for (const conflict of conflicts) {
      const resolution = await conflictEngine.resolveConflict(conflict, multiAgentResults);
      expect(resolution).toBeDefined();
      expect(resolution.success).toBe(true);
    }
  });

  it('devrait prioriser les conflits en fonction de leur sévérité', async () => {
    // Simuler un conflit de haute sévérité
    const highSeverityConflict: ConflictDescriptor = {
      id: 'high-severity-conflict',
      agentIds: ['business-strategy-agent', 'ideation-agent'],
      description: 'Conflit critique sur la viabilité du projet',
      severity: 'high',
      timestamp: Date.now()
    };
    
    // Simuler un conflit de moyenne sévérité
    const mediumSeverityConflict: ConflictDescriptor = {
      id: 'medium-severity-conflict',
      agentIds: ['design-agent', 'documentation-agent'],
      description: 'Conflit sur le planning de documentation',
      severity: 'medium',
      timestamp: Date.now()
    };
    
    // Ajouter manuellement les conflits à l'historique pour tester
    (conflictEngine as any).conflicts = [mediumSeverityConflict, highSeverityConflict];
    
    // Récupérer l'historique - il devrait être trié par sévérité
    const history = conflictEngine.getConflictHistory();
    
    // Vérifier que le conflit de haute sévérité est priorisé
    expect(history[0].severity).toBe('high');
    expect(history[1].severity).toBe('medium');
  });
});
