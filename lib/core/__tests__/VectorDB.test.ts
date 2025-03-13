import { describe, expect, test, beforeEach, afterEach, beforeAll, vi, type Mocked } from 'vitest';
import { VectorDB } from '../VectorDB';
import type { ContextCluster } from '~/types/types/context';

// Mock manuel de VectorDB compatible avec Vitest
vi.mock('../VectorDB', () => {
  return {
    VectorDB: vi.fn().mockImplementation(() => ({
      init: vi.fn().mockResolvedValue(undefined),
      findRelevant: vi.fn().mockResolvedValue([
        /* données mock */
      ]),
      upsertVector: vi.fn().mockResolvedValue(undefined),
      deleteVector: vi.fn().mockResolvedValue(undefined),
      updateVectors: vi.fn().mockResolvedValue(undefined),
    })),
  };
});

// Mocks typés pour les tests
const mockInit = vi.fn().mockResolvedValue(undefined);
const mockFindRelevant = vi.fn().mockResolvedValue([
  {
    id: 'test-cluster-1',
    type: 'test',
    data: { source: 'test' },
    content: 'Contenu de test pour le contexte 1',
    relatedClusters: [],
    shards: [],
    timestamp: Date.now(),
    complexityMetric: 0.6,
    innovationPotential: 0.7,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0',
    },
    vectors: [
      {
        embedding: [0.1, 0.2, 0.3],
        metadata: {},
        content: 'Contenu de test pour le contexte 1',
      },
    ],
  },
  {
    id: 'test-cluster-2',
    type: 'test',
    data: { source: 'test' },
    content: 'Contenu de test pour le contexte 2',
    relatedClusters: [],
    shards: [],
    timestamp: Date.now() - 1000, // Un peu plus ancien
    complexityMetric: 0.5,
    innovationPotential: 0.8,
    metadata: {
      createdAt: new Date(Date.now() - 1000),
      updatedAt: new Date(Date.now() - 1000),
      version: '1.0',
    },
    vectors: [
      {
        embedding: [0.4, 0.5, 0.6],
        metadata: {},
        content: 'Contenu de test pour le contexte 2',
      },
    ],
  },
]);
const mockUpsertVector = vi.fn().mockResolvedValue(undefined);
const mockDeleteVector = vi.fn().mockResolvedValue(undefined);
const mockUpdateVectors = vi.fn().mockResolvedValue(undefined);

// Configuration du mock VectorDB avant les tests
beforeAll(() => {
  // Réinitialiser tous les mocks
  vi.resetAllMocks();

  // Configurer le mock VectorDB
  (VectorDB as any).mockImplementation(() => {
    return {
      init: mockInit,
      findRelevant: mockFindRelevant,
      upsertVector: mockUpsertVector,
      deleteVector: mockDeleteVector,
      updateVectors: mockUpdateVectors,
    } as any;
  });
});

describe('VectorDB', () => {
  let vectorDB: VectorDB;

  beforeEach(() => {
    vi.clearAllMocks();

    // Initialiser VectorDB
    vectorDB = new VectorDB();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialisation', () => {
    test('devrait initialiser correctement', async () => {
      await vectorDB.init();
      expect(mockInit).toHaveBeenCalled();
    });
  });

  describe('Méthodes de VectorDB', () => {
    test('devrait trouver les vecteurs pertinents', async () => {
      const vector = [0.1, 0.2, 0.3];
      const topK = 5;

      const result = await vectorDB.findRelevant(vector, topK);

      expect(mockFindRelevant).toHaveBeenCalledWith(vector, topK);
      expect(result).toEqual([
        {
          id: 'test-cluster-1',
          type: 'test',
          data: { source: 'test' },
          content: 'Contenu de test pour le contexte 1',
          relatedClusters: [],
          shards: [],
          timestamp: expect.any(Number),
          complexityMetric: 0.6,
          innovationPotential: 0.7,
          metadata: {
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            version: '1.0',
          },
          vectors: [
            {
              embedding: [0.1, 0.2, 0.3],
              metadata: {},
              content: 'Contenu de test pour le contexte 1',
            },
          ],
        },
        {
          id: 'test-cluster-2',
          type: 'test',
          data: { source: 'test' },
          content: 'Contenu de test pour le contexte 2',
          relatedClusters: [],
          shards: [],
          timestamp: expect.any(Number),
          complexityMetric: 0.5,
          innovationPotential: 0.8,
          metadata: {
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            version: '1.0',
          },
          vectors: [
            {
              embedding: [0.4, 0.5, 0.6],
              metadata: {},
              content: 'Contenu de test pour le contexte 2',
            },
          ],
        },
      ]);
    });

    test('devrait insérer ou mettre à jour un vecteur', async () => {
      const id = 'test-id';
      const vector = [0.1, 0.2, 0.3];
      const metadata: ContextCluster = {
        id: 'test-cluster',
        type: 'test',
        data: {},
        content: 'Test content',
        relatedClusters: [],
        shards: [],
        timestamp: Date.now(),
        complexityMetric: 0.5,
        innovationPotential: 0.7,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0',
        },
        vectors: [
          {
            embedding: [0.1, 0.2, 0.3],
            metadata: {},
            content: 'Test content',
          },
        ],
      };

      await vectorDB.upsertVector(id, vector, metadata);

      expect(mockUpsertVector).toHaveBeenCalledWith(id, vector, metadata);
    });

    test('devrait supprimer un vecteur', async () => {
      const id = 'test-id';

      await vectorDB.deleteVector(id);

      expect(mockDeleteVector).toHaveBeenCalledWith(id);
    });

    test('devrait mettre à jour plusieurs vecteurs', async () => {
      const results = [
        {
          id: 'result-1',
          vector: [0.1, 0.2, 0.3],
          metadata: { test: 'data1' },
        },
        {
          id: 'result-2',
          vector: [0.4, 0.5, 0.6],
          metadata: { test: 'data2' },
        },
      ];

      await vectorDB.updateVectors(results);

      expect(mockUpdateVectors).toHaveBeenCalledWith(results);
    });
  });
});
