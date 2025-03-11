/// <reference types="vitest" />
import { IdeationAgent } from '../app/lib/agents/IdeationAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import type { ContextCluster } from '../app/types/context';

vi.mock('../app/lib/core/ContextManager');

import { vi } from 'vitest';

vi.mock('../app/lib/modules/llm/LLMManager', async () => {
  const actual = await vi.importActual('../app/lib/modules/llm/LLMManager') as any;
  return {
    LLMManager: {
      ...actual.LLMManager,
      llmCall: vi.fn().mockResolvedValue({ content: 'idée clé: ...' }),
    },
  };
});

describe('IdeationAgent', () => {
  let ideationAgent: IdeationAgent;
let contextManagerMock: ContextManager;
  beforeEach(() => {
    contextManagerMock = new ContextManager() as unknown as vi.Mocked<ContextManager>;
    ideationAgent = new IdeationAgent();
    ideationAgent['contextManager'] = contextManagerMock;
  });

  it('should generate ideas', async () => {
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
      relatedClusters: ['cluster2', 'cluster3'],
      shards: [],
      metadata: { 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        version: '1.0' 
      },
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      primaryShard: {
        id: 'shard1',
        type: 'type1',
        data: 'data1',
        content: 'content1',
        timestamp: 'timestamp1',
        metadata: { 
          createdAt: new Date(), 
          updatedAt: new Date(), 
          version: '1.0' 
        },
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        relatedClusters: []
      }
    };

    const result = await ideationAgent.execute('Generate ideas', context);
    expect(result.content).toMatch(/idée clé/i);
  });
});
