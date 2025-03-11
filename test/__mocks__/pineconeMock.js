// Mock avancé pour le SDK Pinecone avec suivi des appels
const { jest } = require('@jest/globals');

const createPineconeMock = () => {
  const mockUpsert = jest.fn()
    .mockName('upsert')
    .mockImplementation(() => Promise.resolve({ upsertedCount: 1 }));

  const mockQuery = jest.fn()
    .mockName('query')
    .mockImplementation(() => Promise.resolve({
      matches: [
        {
          id: 'test-id-1',
          score: 0.9,
          metadata: {
            primaryShard: { id: 'shard-1' },
            shards: [],
            type: 'test'
          }
        },
        {
          id: 'test-id-2',
          score: 0.8,
          metadata: {
            primaryShard: { id: 'shard-2' },
            shards: [],
            type: 'test'
          }
        }
      ]
    }));

  const mockDelete = jest.fn()
    .mockName('delete')
    .mockImplementation(() => Promise.resolve({ deletedCount: 1 }));

  const mockDescribeIndexStats = jest.fn()
    .mockName('describeIndexStats')
    .mockImplementation(() => Promise.resolve({
      namespaces: { '': { vectorCount: 100 } },
      dimension: 512
    }));

  const mockIndex = jest.fn()
    .mockName('Index')
    .mockImplementation(() => ({
      upsert: mockUpsert,
      query: mockQuery,
      delete: mockDelete,
      describeIndexStats: mockDescribeIndexStats
    }));

  const Pinecone = jest.fn()
    .mockName('Pinecone')
    .mockImplementation(() => ({
      Index: mockIndex
    }));

  return {
    Pinecone,
    mocks: {
      Pinecone,
      Index: mockIndex,
      upsert: mockUpsert,
      query: mockQuery,
      delete: mockDelete,
      describeIndexStats: mockDescribeIndexStats
    }
  };
};

const { Pinecone, mocks } = createPineconeMock();
module.exports = { Pinecone, pineconeMocks: mocks };
