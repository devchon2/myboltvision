/// <reference types="vitest" />
import { DevAgent } from '../app/lib/agents/DevAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import { vi } from 'vitest';
import type { ContextCluster } from '../app/types/context';

vi.mock('../app/lib/core/ContextManager');

describe('DevAgent', () => {
  let devAgent: DevAgent;
  let contextManagerMock: vi.Mocked<ContextManager>;

  beforeEach(() => {
    contextManagerMock = new ContextManager() as unknown as vi.Mocked<ContextManager>;
    devAgent = new DevAgent();
    devAgent['contextManager'] = contextManagerMock;
  });

  it('should develop', async () => {
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

    const result = await devAgent.execute('développer le code', context);
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('dev-agent');
    expect(result.content).toContain('Code');
  });
});
