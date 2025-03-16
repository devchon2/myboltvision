import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BusinessStrategyAgent } from '../lib/agents/BusinessStrategyAgent.js';
import { ContextManager } from '../lib/core/ContextManager.js';

// Mock pour ContextManager
vi.mock('../lib/core/ContextManager.js', () => {
  return {
    ContextManager: vi.fn().mockImplementation(() => ({
      enrichContext: vi.fn().mockImplementation((input) => ({
        id: 'mock-context-id',
        type: 'mock',
        primaryShard: {
          id: 'mock-shard-id',
          type: 'primary',
          content: input,
          timestamp: Date.now(),
          complexityMetric: 0.75,
          innovationPotential: 0.85,
          metadata: {
            createdAt: new Date(),
            updatedAt: new Date(),
            version: '1.0',
          },
          relatedClusters: [],
          data: { source: 'test' },
          parentContextId: 'mock-context-id',
        },
        data: {},
        content: input,
        vectors: [],
        relatedClusters: [],
        timestamp: Date.now(),
        complexityMetric: 0.75,
        innovationPotential: 0.85,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0.0',
        },
        shards: [],
      })),
      checkLiveCache: vi.fn(),
      purgeStaleCacheEntries: vi.fn(),
    })),
  };
});

let agent: BusinessStrategyAgent;

describe('BusinessStrategyAgent', () => {

  beforeEach(() => {
    agent = new BusinessStrategyAgent();
  });

  it('devrait être correctement instancié avec les propriétés requises', () => {
    expect(agent).toBeInstanceOf(BusinessStrategyAgent);
    expect(agent.id).toBe('business-strategy-agent');
    expect(agent.name).toBe("Agent de Stratégie Business");
    expect(agent.description).toBe("Analyse financière et stratégie d'entreprise");
    expect(agent.capabilities).toEqual(['financial-analysis', 'business-strategy', 'market-research', 'competition-analysis']);
  });

  it('devrait rejeter les entrées vides', async () => {
    await expect(agent.execute('')).rejects.toThrow("Erreur de validation: L'entrée doit être une chaîne non vide");
  });

  it('devrait analyser correctement les types de requêtes', () => {
    // Accès à la méthode privée pour les tests
    const analyzeRequestType = (agent as any).analyzeRequestType.bind(agent);

    expect(analyzeRequestType('[MARKET] Analyse du marché européen')).toBe('market-analysis');
    expect(analyzeRequestType('[FINANCE] Projections financières 2025')).toBe('financial-projection');
    expect(analyzeRequestType('[STRATEGY] Plan à 5 ans')).toBe('strategic-planning');
    expect(analyzeRequestType('[COMPETITION] Analyse des concurrents')).toBe('competition-analysis');

    expect(analyzeRequestType('Analyse du marché des IA génératives')).toBe('market-analysis');
    expect(analyzeRequestType('Projections financières pour notre projet')).toBe('financial-projection');
    expect(analyzeRequestType('Élaborer une stratégie à long terme')).toBe('strategic-planning');
    expect(analyzeRequestType('Qui sont nos principaux concurrents')).toBe('competition-analysis');

    expect(analyzeRequestType('Bonjour comment ça va')).toBe('generic');

    // Ajout de tests pour les nouvelles catégories
    expect(analyzeRequestType('Analyse des tendances du marché')).toBe('market-trends');
    expect(analyzeRequestType('Évaluation de l\'innovation')).toBe('innovation-assessment');
  });

  it('devrait générer une analyse de marché pour une requête de type market-analysis', async () => {
    const result = await agent.execute('Analyser le marché des agents IA');

    expect(result.success).toBe(true);
    expect(result.agentId).toBe('business-strategy-agent');
    expect(result.metadata.requestType).toBe('market-analysis');
    expect(result.content).toContain('Analyse de marché');
    expect(result.content).toContain('Segments de marché clés');
    expect(result.content).toContain('Recommandations stratégiques');
  });

  it('devrait générer des projections financières pour une requête de type financial-projection', async () => {
    const result = await agent.execute('Projections financières pour notre startup');

    expect(result.success).toBe(true);
    expect(result.agentId).toBe('business-strategy-agent');
    expect(result.metadata.requestType).toBe('financial-projection');
    expect(result.content).toContain('Projections Financières');
    expect(result.content).toContain('Prévisions financières sur 3 ans');
    expect(result.content).toContain('Hypothèses clés');
  });

  it('devrait générer un plan stratégique pour une requête de type strategic-planning', async () => {
    const result = await agent.execute('Élaborer un plan stratégique');

    expect(result.success).toBe(true);
    expect(result.agentId).toBe('business-strategy-agent');
    expect(result.metadata.requestType).toBe('strategic-planning');
    expect(result.content).toContain('Plan Stratégique');
    expect(result.content).toContain('Vision');
    expect(result.content).toContain('Mission');
    expect(result.content).toContain('Feuille de route stratégique');
  });

  it('devrait analyser la concurrence pour une requête de type competition-analysis', async () => {
    const result = await agent.execute('Analyse des concurrents sur le marché');

    expect(result.success).toBe(true);
    expect(result.agentId).toBe('business-strategy-agent');
    expect(result.metadata.requestType).toBe('competition-analysis');
    expect(result.content).toContain('Analyse de la Concurrence');
    expect(result.content).toContain('Paysage concurrentiel');
    expect(result.content).toContain('Analyse des concurrents principaux');
    expect(result.content).toContain('Stratégie recommandée face à la concurrence');
  });

  it('devrait retourner une réponse générique pour une requête non spécifique', async () => {
    const result = await agent.execute('Bonjour, comment ça va?');

    expect(result.success).toBe(true);
    expect(result.agentId).toBe('business-strategy-agent');
    expect(result.metadata.requestType).toBe('generic');
    expect(result.content).toContain('Analyse de votre demande');
    expect(result.content).toContain('Agent de Stratégie Business peut vous aider');
  });

  it('devrait analyser correctement les types de requêtes', () => {
    // Accès à la méthode privée pour les tests
    const analyzeRequestType = (agent as any).analyzeRequestType.bind(agent);

    expect(analyzeRequestType('[MARKET] Analyse du marché européen')).toBe('market-analysis');
    expect(analyzeRequestType('[FINANCE] Projections financières 2025')).toBe('financial-projection');
    expect(analyzeRequestType('[STRATEGY] Plan à 5 ans')).toBe('strategic-planning');
    expect(analyzeRequestType('[COMPETITION] Analyse des concurrents')).toBe('competition-analysis');

    expect(analyzeRequestType('Analyse du marché des IA génératives')).toBe('market-analysis');
    expect(analyzeRequestType('Projections financières pour notre projet')).toBe('financial-projection');
    expect(analyzeRequestType('Élaborer une stratégie à long terme')).toBe('strategic-planning');
    expect(analyzeRequestType('Qui sont nos principaux concurrents')).toBe('competition-analysis');

    expect(analyzeRequestType('Bonjour comment ça va')).toBe('generic');

    // Ajout de tests pour les nouvelles catégories
    expect(analyzeRequestType('Analyse des tendances du marché')).toBe('market-trends');
    expect(analyzeRequestType('Évaluation de l\'innovation')).toBe('innovation-assessment');
  });

  it('devrait valider le schéma de sortie', () => {
    // Accès à la méthode privée pour les tests
    const validateOutputSchema = (agent as any).validateOutputSchema.bind(agent);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de marché',
      metadata: {
        requestType: 'market-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: false,
      agentId: 'business-strategy-agent',
      content: 'Projections Financières',
      metadata: {
        requestType: 'financial-projection',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Plan Stratégique',
      metadata: {
        requestType: 'strategic-planning',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de la Concurrence',
      metadata: {
        requestType: 'competition-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Réponse générique',
      metadata: {
        requestType: 'generic',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse des tendances du marché',
      metadata: {
        requestType: 'market-trends',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Évaluation de l\'innovation',
      metadata: {
        requestType: 'innovation-assessment',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de marché',
      metadata: {
        requestType: 'market-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Projections Financières',
      metadata: {
        requestType: 'financial-projection',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Plan Stratégique',
      metadata: {
        requestType: 'strategic-planning',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de la Concurrence',
      metadata: {
        requestType: 'competition-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Réponse générique',
      metadata: {
        requestType: 'generic',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse des tendances du marché',
      metadata: {
        requestType: 'market-trends',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Évaluation de l\'innovation',
      metadata: {
        requestType: 'innovation-assessment',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);
  });

  it('devrait valider le schéma de sortie', () => {
    // Accès à la méthode privée pour les tests
    const validateOutputSchema = (agent as any).validateOutputSchema.bind(agent);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de marché',
      metadata: {
        requestType: 'market-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: false,
      agentId: 'business-strategy-agent',
      content: 'Projections Financières',
      metadata: {
        requestType: 'financial-projection',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Plan Stratégique',
      metadata: {
        requestType: 'strategic-planning',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de la Concurrence',
      metadata: {
        requestType: 'competition-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Réponse générique',
      metadata: {
        requestType: 'generic',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse des tendances du marché',
      metadata: {
        requestType: 'market-trends',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Évaluation de l\'innovation',
      metadata: {
        requestType: 'innovation-assessment',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de marché',
      metadata: {
        requestType: 'market-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Projections Financières',
      metadata: {
        requestType: 'financial-projection',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Plan Stratégique',
      metadata: {
        requestType: 'strategic-planning',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse de la Concurrence',
      metadata: {
        requestType: 'competition-analysis',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Réponse générique',
      metadata: {
        requestType: 'generic',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Analyse des tendances du marché',
      metadata: {
        requestType: 'market-trends',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);

    expect(validateOutputSchema({
      success: true,
      agentId: 'business-strategy-agent',
      content: 'Évaluation de l\'innovation',
      metadata: {
        requestType: 'innovation-assessment',
        complexityMetric: 0.75,
        innovationPotential: 0.85,
      },
    })).toBe(true);
  });

  it('devrait créer un nouveau contexte si non fourni', async () => {
    const input = 'test sans contexte';
    const result = await agent.execute(input);

    expect(result.success).toBe(true);
    expect(result.metadata.contextId).toMatch(/^generated-\d+$/);
    expect(result.metadata.timestamp).toBeGreaterThan(0);
  });

  it('devrait valider le schéma de sortie', async () => {
    const result = await agent.execute('test');

    expect(result).toMatchObject({
      success: expect.any(Boolean),
      agentId: 'business-strategy-agent',
      content: expect.any(String),
      metadata: {
        requestType: expect.any(String),
        complexity: expect.any(Number),
        innovationScore: expect.any(Number),
      },
    });
  });

  it.each([
    ['', mockContext, "L'entrée doit être une chaîne non vide"],
    [123 as unknown as string, mockContext, "L'entrée doit être une chaîne"],
    ['test', { invalid: 'context' } as unknown as ContextCluster, 'Contexte sans structure valide'],
    ['test', { ...mockContext, id: null } as unknown as ContextCluster, 'Contexte sans ID'],
    ['test', { ...mockContext, timestamp: '123' } as unknown as ContextCluster, 'Timestamp non numérique'],
  ])('devrait rejeter les entrées invalides: %s (%s)', async (input, context) => {
    // Le paramètre description est utilisé dans le titre du test ci-dessus
    await expect(agent.execute(input, context)).rejects.toThrow(/Erreur de validation/);
  });

  test.foreach([
    ['brainstorming sur un projet tech', 'brainstorming'],
    ['évaluer cette idée innovante', 'innovation-assessment'],
    ['analyse des tendances du marché', 'market-trends'],
    ['[BRAINSTORM] nouvelle application', 'brainstorming'],
    ['développer un concept d\'application', 'concept-development'],
  ])('devrait identifier correctement le type de requête: %s -> %s (%s)', async (input, expectedType, ) => {
    // Description utilisée pour documenter le cas de test
    const result = await agent.execute(input, mockContext);
    expect(result.metadata.requestType).toBe(expectedType);
  });

  test('devrait créer un nouveau contexte si non fourni', async () => {
    const input = 'test sans contexte';
    const result = await agent.execute(input);

    expect(result.success).toBe(true);
    expect(result.metadata.contextId).toMatch(/^generated-\d+$/);
    expect(result.metadata.timestamp).toBeGreaterThan(0);
  });

  test('devrait valider le schéma de sortie', async () => {
    const result = await agent.execute('test');

    expect(result).toMatchObject({
      success: expect.any(Boolean),
      agentId: 'business-strategy-agent',
      content: expect.any(String),
      metadata: {
        requestType: expect.any(String),
        complexity: expect.any(Number),
        innovationScore: expect.any(Number),
      },
    });
  });
});

