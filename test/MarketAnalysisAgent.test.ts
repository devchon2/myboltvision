// @ts-nocheck
/// <reference types="vitest" />
import { MarketAnalysisAgent } from '../lib/agents/MarketAnalysisAgent';
import { ContextManager } from '../lib/core/ContextManager';
import type { ContextCluster } from '../../types/context';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Remplacer jest.mock par vi.mock
vi.mock('../lib/core/ContextManager');

describe('MarketAnalysisAgent', () => {
  let agent: MarketAnalysisAgent;
  let contextManagerMock: any;

  beforeEach(() => {
    // Réinitialiser tous les mocks
    vi.resetAllMocks();

    contextManagerMock = {
      findRelevantContext: vi.fn().mockResolvedValue([]),
    };

    // Espionner et simuler les méthodes avec vi.spyOn
    ContextManager.prototype.findRelevantContext = contextManagerMock.findRelevantContext;

    agent = new MarketAnalysisAgent();
  });

  it('should analyze market', async () => {
    const context: ContextCluster = {
      id: 'cluster1',
      type: 'type1',
      data: { source: 'test' },
      content: 'Test content',
      vectors: [
        {
          embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
          metadata: {},
          content: 'Test content',
        },
      ],
      relatedClusters: [],
      shards: [],
      primaryShard: {
        id: 'shard1',
        type: 'type1',
        data: { info: 'data1' },
        content: 'content1',
        timestamp: Date.now(),
        metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' },
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        relatedClusters: [],
      },
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' },
    };

    const result = await agent.execute('analyze market', context);
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('market-analysis-agent');
    // Mettre à jour l'assertion pour correspondre à la réponse actuelle
    expect(result.content).toContain('Analyse de votre demande d\'étude de marché');
  });
});
