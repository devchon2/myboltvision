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

describe('BusinessStrategyAgent', () => {
  let agent: BusinessStrategyAgent;

  beforeEach(() => {
    agent = new BusinessStrategyAgent();
  });

  it('devrait être correctement instancié avec les propriétés requises', () => {
    expect(agent).toBeInstanceOf(BusinessStrategyAgent);
    expect(agent.id).toBe('business-strategy-agent');
    expect(agent.name).toBe("Agent de Stratégie Business");
    expect(agent.description).toBe("Analyse financière et stratégie d'entreprise");
    expect(agent.capabilities).toEqual(['market-analysis', 'financial-projection', 'strategic-planning', 'competition-analysis']);
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
    expect(analyzeRequestType('Élaborer une stratégie long terme')).toBe('strategic-planning');
    expect(analyzeRequestType('Qui sont nos principaux concurrents')).toBe('competition-analysis');
    
    expect(analyzeRequestType('Bonjour comment ça va')).toBe('generic');
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
});
