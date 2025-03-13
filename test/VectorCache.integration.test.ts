import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { VectorCacheIntegration } from '../lib/core/VectorCache.integration';
import { ContextManager } from '../lib/core/ContextManager';
import { VectorCache } from '../lib/core/VectorCache';
import type { ContextCluster } from '../types/types/context';

// Mock du ContextManager
vi.mock('../lib/core/ContextManager', () => {
  return {
    ContextManager: vi.fn().mockImplementation(() => ({
      init: vi.fn().mockResolvedValue(undefined),
      upsertContext: vi.fn().mockResolvedValue(undefined),
      // Assurez-vous que findRelevantContext est défini comme un mock de fonction
      findRelevantContext: vi.fn().mockResolvedValue([]),
      deleteContext: vi.fn().mockResolvedValue(undefined),
      enrichContext: vi.fn().mockImplementation(async (input) => {
        const mockDate = Date.now();
        return {
          id: `cluster-${Math.random().toString(36).substring(2, 9)}`,
          type: 'code',
          primaryShard: {
            id: `shard-${Math.random().toString(36).substring(2, 9)}`,
            type: 'code',
            data: {},
            content: input,
            timestamp: mockDate.toString(),
            metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
            complexityMetric: 0.5,
            innovationPotential: 0.8,
            relatedClusters: [],
          },
          shards: [],
          vectors: [
            {
              embedding: [0.9, 0.1, 0.1, 0.1, 0.1],
              metadata: {},
              content: input,
            },
          ],
          data: {},
          content: input,
          relatedClusters: [],
          timestamp: mockDate,
          complexityMetric: 0.5,
          innovationPotential: 0.8,
          metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
        };
      }),
      liveContextCache: {
        get: vi.fn(),
        set: vi.fn(),
      },
    })),
  };
});

vi.mock('../lib/core/VectorCache', () => {
  return {
    VectorCache: vi.fn().mockImplementation(() => ({
      set: vi.fn(),
      get: vi.fn(),
      has: vi.fn(),
      delete: vi.fn(),
      clear: vi.fn(),
      size: vi.fn().mockReturnValue(0),
      pruneStaleEntries: vi.fn(),
      findSimilar: vi.fn(),
      setContextCluster: vi.fn(),
      getContextCluster: vi.fn(),
      findSimilarContextClusters: vi.fn(),
    })),
  };
});

describe('VectorCacheIntegration', () => {
  let vectorCacheIntegration: VectorCacheIntegration;
  let contextManager: ContextManager;
  let mockDate: number;
  let setContextClusterMock: any;
  let findSimilarContextClustersMock: any;
  let deleteMock: any;
  let clearMock: any;
  let pruneStaleEntriesMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDate = 1646735000000;
    vi.spyOn(Date, 'now').mockImplementation(() => mockDate);

    // Récupérer et configurer directement les mocks à partir de l'instance de VectorCache
    const mockVectorCache = vi.mocked(new VectorCache());
    setContextClusterMock = mockVectorCache.setContextCluster = vi.fn();
    findSimilarContextClustersMock = mockVectorCache.findSimilarContextClusters = vi.fn().mockReturnValue([]);
    deleteMock = mockVectorCache.delete = vi.fn().mockReturnValue(true);
    clearMock = mockVectorCache.clear = vi.fn();
    pruneStaleEntriesMock = mockVectorCache.pruneStaleEntries = vi.fn();
    mockVectorCache.size = vi.fn().mockReturnValue(0);
    mockVectorCache.getContextCluster = vi.fn();

    // Écraser le constructeur mocké pour retourner notre instance mockée
    (VectorCache as any).mockImplementation(() => mockVectorCache);

    // Créer les instances avec les mocks configurés
    contextManager = new ContextManager();

    // Ajouter explicitement toutes les méthodes nécessaires au mock de ContextManager comme des mocks vitest
    contextManager.upsertContext = vi.fn().mockResolvedValue(undefined);
    contextManager.deleteContext = vi.fn().mockResolvedValue(undefined);
    contextManager.enrichContext = vi.fn();

    vectorCacheIntegration = new VectorCacheIntegration(contextManager);

    // Assurons-nous que findRelevantContext est correctement défini et accessible
    if (!contextManager.findRelevantContext) {
      contextManager.findRelevantContext = vi.fn().mockResolvedValue([]);
    } else {
      vi.spyOn(contextManager, 'findRelevantContext').mockResolvedValue([]);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Arrêter tous les intervalles pour éviter les fuites de mémoire entre les tests
    vi.useRealTimers();
  });

  it("devrait initialiser correctement l'intégration", () => {
    expect(vectorCacheIntegration).toBeDefined();
  });

  it('devrait planifier le nettoyage périodique du cache', () => {
    vi.useFakeTimers();
    const integration = new VectorCacheIntegration(contextManager);

    // Avancer le temps de 10 minutes
    vi.advanceTimersByTime(10 * 60 * 1000);

    // Vérifier que pruneStaleEntries est appelé avec le TTL correct
    expect(pruneStaleEntriesMock).toHaveBeenCalledTimes(1);
    expect(pruneStaleEntriesMock).toHaveBeenCalledWith(60 * 60 * 1000); // 1 heure
  });

  it('devrait précharger les clusters de contexte dans le cache', () => {
    const mockClusters: ContextCluster[] = [
      {
        id: 'cluster-1',
        type: 'code',
        primaryShard: {
          id: 'shard-1',
          type: 'code',
          data: {},
          content: 'function test() { return true; }',
          timestamp: mockDate.toString(),
          metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
          complexityMetric: 0.5,
          innovationPotential: 0.8,
          relatedClusters: [],
        },
        shards: [],
        vectors: [
          {
            embedding: [0.9, 0.1, 0.1, 0.1, 0.1],
            metadata: {},
            content: 'function test() { return true; }',
          },
        ],
        data: {},
        content: 'function test() { return true; }',
        relatedClusters: [],
        timestamp: mockDate,
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
      },
      {
        id: 'cluster-2',
        type: 'documentation',
        primaryShard: {
          id: 'shard-2',
          type: 'documentation',
          data: {},
          content: '# Documentation test',
          timestamp: mockDate.toString(),
          metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
          complexityMetric: 0.3,
          innovationPotential: 0.4,
          relatedClusters: [],
        },
        shards: [],
        vectors: [
          {
            embedding: [0.1, 0.9, 0.1, 0.1, 0.1],
            metadata: {},
            content: '# Documentation test',
          },
        ],
        data: {},
        content: '# Documentation test',
        relatedClusters: [],
        timestamp: mockDate,
        complexityMetric: 0.3,
        innovationPotential: 0.4,
        metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
      },
    ];

    vectorCacheIntegration.preloadContextClusters(mockClusters);

    // Vérifier que setContextCluster a été appelé pour chaque cluster
    expect(setContextClusterMock).toHaveBeenCalledTimes(2);
    expect(setContextClusterMock).toHaveBeenCalledWith(mockClusters[0]);
    expect(setContextClusterMock).toHaveBeenCalledWith(mockClusters[1]);
  });

  it('devrait retourner les résultats du cache si disponibles', async () => {
    const queryVector = [0.9, 0.1, 0.1, 0.1, 0.1];
    const mockCachedResults: ContextCluster[] = [
      {
        id: 'cached-cluster',
        type: 'code',
        primaryShard: {
          id: 'cached-shard',
          type: 'code',
          data: {},
          content: 'function cached() { return true; }',
          timestamp: mockDate.toString(),
          metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
          complexityMetric: 0.5,
          innovationPotential: 0.8,
          relatedClusters: [],
        },
        shards: [],
        vectors: [
          {
            embedding: [0.95, 0.05, 0.05, 0.05, 0.05],
            metadata: {},
            content: 'function cached() { return true; }',
          },
        ],
        data: {},
        content: 'function cached() { return true; }',
        relatedClusters: [],
        timestamp: mockDate,
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
      },
    ];

    // Configurer le mock pour retourner des résultats du cache
    findSimilarContextClustersMock.mockReturnValue(mockCachedResults);

    const results = await vectorCacheIntegration.findSimilarContexts(queryVector);

    // Vérifier que les résultats du cache sont retournés
    expect(results).toEqual(mockCachedResults);
    expect(findSimilarContextClustersMock).toHaveBeenCalledWith(queryVector, 0.85);

    // Vérifier que findRelevantContext n'a pas été appelé
    expect(contextManager.findRelevantContext).not.toHaveBeenCalled();
  });

  it('devrait interroger la base de données si le cache est vide', async () => {
    const queryVector = [0.9, 0.1, 0.1, 0.1, 0.1];
    const mockDbResults: ContextCluster[] = [
      {
        id: 'db-cluster',
        type: 'code',
        primaryShard: {
          id: 'db-shard',
          type: 'code',
          data: {},
          content: 'function fromDb() { return true; }',
          timestamp: mockDate.toString(),
          metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
          complexityMetric: 0.5,
          innovationPotential: 0.8,
          relatedClusters: [],
        },
        shards: [],
        vectors: [
          {
            embedding: [0.92, 0.08, 0.08, 0.08, 0.08],
            metadata: {},
            content: 'function fromDb() { return true; }',
          },
        ],
        data: {},
        content: 'function fromDb() { return true; }',
        relatedClusters: [],
        timestamp: mockDate,
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
      },
    ];

    // Configurer le mock pour retourner un cache vide puis des résultats de la base de données
    findSimilarContextClustersMock.mockReturnValue([]);
    (contextManager.findRelevantContext as any).mockResolvedValue(mockDbResults);

    const results = await vectorCacheIntegration.findSimilarContexts(queryVector);

    // Vérifier que les résultats de la base de données sont retournés
    expect(results).toEqual(mockDbResults);
    expect(findSimilarContextClustersMock).toHaveBeenCalledWith(queryVector, 0.85);
    expect(contextManager.findRelevantContext).toHaveBeenCalledWith(queryVector);

    // Vérifier que les résultats de la base de données sont mis en cache
    expect(setContextClusterMock).toHaveBeenCalledWith(mockDbResults[0]);
  });

  it("devrait mettre à jour à la fois la base de données et le cache lors d'un upsert", async () => {
    const mockCluster: ContextCluster = {
      id: 'upsert-cluster',
      type: 'code',
      primaryShard: {
        id: 'upsert-shard',
        type: 'code',
        data: {},
        content: 'function upsert() { return true; }',
        timestamp: mockDate.toString(),
        metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        relatedClusters: [],
      },
      shards: [],
      vectors: [
        {
          embedding: [0.85, 0.15, 0.15, 0.15, 0.15],
          metadata: {},
          content: 'function upsert() { return true; }',
        },
      ],
      data: {},
      content: 'function upsert() { return true; }',
      relatedClusters: [],
      timestamp: mockDate,
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
    };

    const mockVector = [0.85, 0.15, 0.15, 0.15, 0.15];

    await vectorCacheIntegration.upsertContextCluster(mockCluster, mockVector);

    // Vérifier que la base de données est mise à jour
    expect(contextManager.upsertContext).toHaveBeenCalledWith(mockCluster.id, mockVector, mockCluster);

    // Vérifier que le cache est mis à jour
    expect(setContextClusterMock).toHaveBeenCalledWith(mockCluster);
  });

  it('devrait supprimer un cluster à la fois de la base de données et du cache', async () => {
    const clusterId = 'delete-cluster';

    await vectorCacheIntegration.deleteContextCluster(clusterId);

    // Vérifier que la base de données est mise à jour
    expect(contextManager.deleteContext).toHaveBeenCalledWith(clusterId);

    // Vérifier que le cache est mis à jour
    expect(deleteMock).toHaveBeenCalledWith(clusterId);
  });

  it('devrait enrichir et mettre en cache le contexte', async () => {
    const inputText = 'function newFeature() { console.log("Hello TDD"); }';
    const mockEnrichedContext: ContextCluster = {
      id: 'enriched-cluster',
      type: 'code',
      primaryShard: {
        id: 'enriched-shard',
        type: 'code',
        data: {},
        content: inputText,
        timestamp: mockDate.toString(),
        metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        relatedClusters: [],
      },
      shards: [],
      vectors: [
        {
          embedding: [0.8, 0.2, 0.2, 0.2, 0.2],
          metadata: {},
          content: inputText,
        },
      ],
      data: {},
      content: inputText,
      relatedClusters: [],
      timestamp: mockDate,
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(mockDate), updatedAt: new Date(mockDate), version: '1.0' },
    };

    // Configurer le mock enrichContext pour retourner un contexte enrichi spécifique
    (contextManager.enrichContext as any).mockResolvedValue(mockEnrichedContext);

    const result = await vectorCacheIntegration.enrichAndCacheContext(inputText);

    // Vérifier que le contextManager.enrichContext a été appelé
    expect(contextManager.enrichContext).toHaveBeenCalledWith(inputText);

    // Vérifier que le résultat est correct
    expect(result).toEqual(mockEnrichedContext);

    // Vérifier que le contexte enrichi a été mis à jour dans la base de données
    expect(contextManager.upsertContext).toHaveBeenCalledWith(
      mockEnrichedContext.id,
      mockEnrichedContext.vectors[0].embedding,
      mockEnrichedContext,
    );

    // Vérifier que le contexte enrichi a été mis en cache
    expect(setContextClusterMock).toHaveBeenCalledWith(mockEnrichedContext);
  });

  it('devrait vider le cache', () => {
    vectorCacheIntegration.clearCache();

    expect(clearMock).toHaveBeenCalled();
  });
});
