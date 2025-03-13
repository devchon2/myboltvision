import { describe, expect, vi, beforeEach, it } from 'vitest';
import type { ContextCluster } from '../../../types/context';
import { MarketAnalysisAgent } from '../MarketAnalysisAgent';

describe('MarketAnalysisAgent', () => {
  let agent: MarketAnalysisAgent;

  // Contexte de test
  const mockContext: ContextCluster = {
    id: 'test-context-1',
    type: 'test',
    data: { source: 'test' },
    vectors: [
      {
        embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
        metadata: {},
        content: 'Test content',
      },
    ],
    content: "Contexte de test pour l'agent d'analyse de marché",
    relatedClusters: [],
    shards: [],
    primaryShard: {
      id: 'test-shard',
      type: 'primary',
      content: 'Contexte de test',
      timestamp: Date.now(),
      complexityMetric: 0.7,
      innovationPotential: 0.85,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0',
      },
      relatedClusters: [],
      data: {},
      parentContextId: 'test-context-1',
    },
    timestamp: Date.now(),
    complexityMetric: 0.7,
    innovationPotential: 0.85,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0',
    },
  };

  beforeEach(() => {
    agent = new MarketAnalysisAgent();
  });

  test('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('market-analysis-agent');
    expect(agent.name).toBe("Agent d'Analyse de Marché");
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(4);
    expect(agent.capabilities).toContain('competitive-analysis');
    expect(agent.capabilities).toContain('market-trends');
    expect(agent.capabilities).toContain('opportunity-identification');
    expect(agent.capabilities).toContain('swot-analysis');
  });

  test("devrait analyser correctement une demande d'analyse de concurrence", async () => {
    const input = 'Analyser les concurrents sur ce marché';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('market-analysis-agent');
    expect(result.content).toContain('Analyse des Concurrents');
    expect(result.content).toContain('Principaux acteurs');
    expect(result.content).toContain('Positionnement recommandé');
    expect(result.metadata.requestType).toBe('competitive-analysis');
  });

  test("devrait analyser correctement une demande d'identification de tendances", async () => {
    const input = 'Quelles sont les tendances actuelles du marché?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Tendances du Marché');
    expect(result.content).toContain('Tendances émergentes');
    expect(result.content).toContain("Impact sur l'industrie");
    expect(result.content).toContain('Prévisions à 5 ans');
    expect(result.metadata.requestType).toBe('market-trends');
  });

  test("devrait analyser correctement une demande d'identification d'opportunités", async () => {
    const input = 'Identifiez les opportunités de croissance potentielles';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Opportunités de Marché');
    expect(result.content).toContain('Segments à fort potentiel');
    expect(result.content).toContain('Recommandations');
    expect(result.metadata.requestType).toBe('opportunity-identification');
  });

  test("devrait analyser correctement une demande d'analyse SWOT", async () => {
    const input = 'Réaliser une analyse SWOT de notre position sur le marché';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Analyse SWOT');
    expect(result.content).toContain('Forces');
    expect(result.content).toContain('Faiblesses');
    expect(result.content).toContain('Opportunités');
    expect(result.content).toContain('Menaces');
    expect(result.metadata.requestType).toBe('swot-analysis');
  });

  test('devrait gérer une demande générique', async () => {
    const input = 'Comment puis-je améliorer ma stratégie marketing?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain("Analyse de votre demande d'étude de marché");
    expect(result.metadata.requestType).toBe('generic');
  });
});
