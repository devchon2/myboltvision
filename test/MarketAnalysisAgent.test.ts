import { MarketAnalysisAgent } from '../app/lib/agents/MarketAnalysisAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import type { ContextCluster } from '../app/types/context';

vi.mock('../app/lib/core/ContextManager');

describe('MarketAnalysisAgent', () => {
  let marketAnalysisAgent: MarketAnalysisAgent;
  let contextManagerMock: vi.Mocked<ContextManager>;

  beforeEach(() => {
    contextManagerMock = new ContextManager() as vi.Mocked<ContextManager>;
    marketAnalysisAgent = new MarketAnalysisAgent();
    marketAnalysisAgent['contextManager'] = contextManagerMock;
  });

  it('should analyze market', async () => {
    const context: ContextCluster = {
      id: 'cluster1',
      type: 'type1',
      data: { source: 'test' },
      content: 'Test content',
      vectors: [{
        embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
        metadata: {},
        content: 'Test content'
      }],
      relatedClusters: [],
      shards: [],
      primaryShard: {
        id: 'shard1',
        type: 'type1',
        data: 'data1',
        content: 'content1',
        timestamp: 'timestamp1',
        metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' },
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        relatedClusters: []
      },
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
    };

    const result = await marketAnalysisAgent.execute('analyze market trends', context);
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('market-analysis-agent');
    expect(result.content).toContain('Tendances du Marché');
  });
});
