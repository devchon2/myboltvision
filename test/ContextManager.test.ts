import { ContextManager } from '../app/lib/core/ContextManager';
import { VectorDB } from '../app/lib/core/VectorDB';
import type { ContextCluster } from '../app/types/context';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../app/lib/core/VectorDB', () => {
  return {
    VectorDB: vi.fn().mockImplementation(() => ({
      init: vi.fn().mockResolvedValue(undefined),
      upsertVector: vi.fn().mockResolvedValue(undefined),
      findRelevant: vi.fn().mockResolvedValue([]),
      deleteVector: vi.fn().mockResolvedValue(undefined),
      updateVectors: vi.fn().mockResolvedValue(undefined),
    })),
  };
});

describe('ContextManager', () => {
  let contextManager: ContextManager;
  let vectorDBMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    vectorDBMock = new VectorDB() as any; // Utilisez l'instance mockée de VectorDB
    contextManager = new ContextManager();
    contextManager['contextVectorDB'] = vectorDBMock;
  });

  it('should initialize the vector database', async () => {
    await contextManager.init();
    expect(vectorDBMock.init).toHaveBeenCalled();
  }, 10000);

  it('should upsert context', async () => {
    const id = '1';
    const vector = [0, 0, 0, 0, 0];
    const metadata: ContextCluster = {
      id: 'cluster1',
      type: 'type1',
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
      vectors: [{
        embedding: [0.1, 0.2, 0.3],
        metadata: {},
        content: 'Test vector content'
      }],
      data: {},
      content: 'cluster content',
      relatedClusters: [],
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
    };

    await contextManager.upsertContext(id, vector, metadata);
    expect(vectorDBMock.upsertVector).toHaveBeenCalledWith(id, vector, metadata);
  }, 10000);

  it('should find relevant context', async () => {
    const vector = [0, 0, 0, 0, 0];
    const topK = 5;
    const mockContexts: ContextCluster[] = [{
      id: 'cluster1',
      type: 'type1',
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
      vectors: [{
        embedding: [0.1, 0.2, 0.3],
        metadata: {},
        content: 'Test vector content'
      }],
      data: {},
      content: 'cluster content',
      relatedClusters: [],
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
    }];

    vectorDBMock.findRelevant.mockResolvedValue(mockContexts);

    const result = await contextManager.findRelevantContext(vector, topK);
    expect(vectorDBMock.findRelevant).toHaveBeenCalledWith(vector, topK);
    expect(result).toEqual(mockContexts);
  }, 10000);

  it('should delete context', async () => {
    const id = '1';

    await contextManager.deleteContext(id);
    expect(vectorDBMock.deleteVector).toHaveBeenCalledWith(id);
  }, 10000);

  it('should update contexts', async () => {
    const results = [{
      id: '1',
      vector: [0, 0, 0, 0, 0],
      metadata: {
        id: 'cluster1',
        type: 'type1',
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
        vectors: [{
          embedding: [0.1, 0.2, 0.3],
          metadata: {},
          content: 'Test vector content'
        }],
        data: {},
        content: 'cluster content',
        relatedClusters: [],
        timestamp: Date.now(),
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
      }
    }];

    await contextManager.updateContexts(results);
    expect(vectorDBMock.updateVectors).toHaveBeenCalledWith(results);
  }, 10000);
});
