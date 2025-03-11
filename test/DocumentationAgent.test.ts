/// <reference types="vitest" />
import { DocumentationAgent } from '../app/lib/agents/DocumentationAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import { vi } from 'vitest';
import type { ContextCluster } from '../app/types/context';

vi.mock('../app/lib/core/ContextManager');

describe('DocumentationAgent', () => {
  let documentationAgent: DocumentationAgent;
  let contextManagerMock: vi.Mocked<ContextManager>;

  beforeEach(() => {
    contextManagerMock = new ContextManager() as unknown as vi.Mocked<ContextManager>;
    documentationAgent = new DocumentationAgent();
    documentationAgent['contextManager'] = contextManagerMock;
  });

  it('should generate documentation', async () => {
    const context: ContextCluster = {
      id: 'cluster1',
      type: 'type1',
      vectors: [], // Ajout de la propriété vectors ici
      data: {}, // Ajout de la propriété data
      content: 'test content', // Ajout de la propriété content
      relatedClusters: [], // Ajout de la propriété relatedClusters
      timestamp: Date.now(), // Ajout de la propriété timestamp
      complexityMetric: 0.5, // Ajout de la propriété complexityMetric
      innovationPotential: 0.8, // Ajout de la propriété innovationPotential
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
      shards: [],
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
    };

    const documentation = await documentationAgent.generateDocumentation(context);
    expect(documentation).toEqual('Documentation: This is a sample documentation for the product.');
  });
});
