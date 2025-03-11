/// <reference types="vitest" />
import { DesignAgent } from '../app/lib/agents/DesignAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import type { ContextCluster } from '../app/types/context';

import { vi } from 'vitest';

vi.mock('../app/lib/core/ContextManager');

describe('DesignAgent', () => {
  let designAgent: DesignAgent;
  let contextManagerMock: vi.Mocked<ContextManager>;

  beforeEach(() => {
    contextManagerMock = new ContextManager() as unknown as vi.Mocked<ContextManager>;
    designAgent = new DesignAgent();
    designAgent['contextManager'] = contextManagerMock;
  });

  it('should generate design', async () => {
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

    const result = await designAgent.execute('créer un design pour cette application', context);
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('design-agent');
    expect(result.content).toContain('Interface Utilisateur');
  });
});
