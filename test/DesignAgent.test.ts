// @ts-nocheck
/// <reference types="vitest" />
import { DesignAgent } from '../lib/agents/DesignAgent';
import { ContextManager } from '../lib/core/ContextManager';
// Utiliser l'import depuis le module qui est effectivement utilisé par DesignAgent
import type { ContextCluster } from '../types/context';

import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../lib/core/ContextManager');

describe('DesignAgent', () => {
  let designAgent: DesignAgent;
  let contextManagerMock: vi.Mocked<ContextManager>;

  beforeEach(() => {
    contextManagerMock = new ContextManager() as unknown as vi.Mocked<ContextManager>;
    designAgent = new DesignAgent();
    designAgent['contextManager'] = contextManagerMock;
  });

  it('should generate design', async () => {
    // Utiliser une structure compatible avec celle attendue par DesignAgent
    const context = {
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

    const result = await designAgent.execute('créer un design pour cette application', context);
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('design-agent');
    expect(result.content).toContain('Interface Utilisateur');
  });
});
