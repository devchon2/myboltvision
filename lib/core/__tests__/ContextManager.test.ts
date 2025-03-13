import { describe, expect, test, beforeEach, afterEach, beforeAll, vi, type Mocked } from 'vitest';
import { ContextManager } from '../ContextManager';
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

// Utilitaire pour simuler des délais
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('ContextManager', () => {
  let contextManager: ContextManager;
  let mockVectorDB: Mocked<VectorDB>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Initialiser le ContextManager
    contextManager = new ContextManager();
    mockVectorDB = contextManager.contextVectorDB as Mocked<VectorDB>;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialisation', () => {
    test('devrait initialiser correctement VectorDB', async () => {
      await contextManager.init();
      expect(mockVectorDB.init).toHaveBeenCalled();
    });
  });

  describe('Méthodes de cache', () => {
    test('devrait vérifier correctement si une entrée existe dans le cache', () => {
      const testContent = 'contenu de test';
      const testContext: ContextCluster = {
        id: 'test-id',
        vectors: [
          {
            embedding: [0.1, 0.2, 0.3],
            metadata: {},
            content: testContent,
          },
        ],
        type: 'test',
        data: {},
        content: testContent,
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
      };

      // Ajouter au cache
      contextManager.liveContextCache.set({ 'test-id': testContext });

      // Vérifier avec contenu exact
      const result = contextManager.checkLiveCache(testContent);
      expect(result).toBeDefined();
      expect(result).toEqual(testContext);

      // Vérifier avec contenu inexistant
      const notFound = contextManager.checkLiveCache('contenu inexistant');
      expect(notFound).toBeUndefined();
    });

    test('devrait purger correctement les entrées obsolètes du cache', () => {
      // Configuration initiale du cache avec entrées récentes et anciennes
      const now = Date.now();
      const recentContext: ContextCluster = {
        id: 'recent',
        vectors: [
          {
            embedding: [0.1, 0.2, 0.3],
            metadata: {},
            content: 'récent',
          },
        ],
        type: 'test',
        data: {},
        content: 'récent',
        relatedClusters: [],
        shards: [],
        timestamp: now,
        complexityMetric: 0.5,
        innovationPotential: 0.7,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0',
        },
      };

      const oldContext: ContextCluster = {
        id: 'old',
        vectors: [],
        type: 'test',
        data: {},
        content: 'ancien',
        relatedClusters: [],
        shards: [],
        timestamp: now - 4000000, // Plus de 1 heure (3600000 ms)
        complexityMetric: 0.5,
        innovationPotential: 0.7,
        metadata: {
          createdAt: new Date(now - 4000000),
          updatedAt: new Date(now - 4000000),
          version: '1.0',
        },
      };

      contextManager.liveContextCache.set({
        recent: recentContext,
        old: oldContext,
      });

      // Exécuter la purge
      contextManager.purgeStaleCacheEntries();

      // Vérifier le résultat
      const cache = contextManager.liveContextCache.get();
      expect(cache.recent).toBeDefined();
      expect(cache.old).toBeUndefined();
    });

    describe('Enrichissement de contexte', () => {
      test('devrait enrichir correctement un nouveau contexte', async () => {
        const input = "Contexte de test pour l'enrichissement";

        // Appeler enrichContext
        const enriched = await contextManager.enrichContext(input);

        // Vérifier que les propriétés sont correctement calculées
        expect(enriched.id).toBeDefined();
        expect(enriched.id).toMatch(/^ctx-\d+$/);
        expect(enriched.content).toBe(input);
        expect(enriched.timestamp).toBeGreaterThan(0);
        expect(enriched.complexityMetric).toBeGreaterThan(0);
        expect(enriched.innovationPotential).toBeGreaterThan(0);
        expect(enriched.primaryShard).toBeDefined();
        expect(enriched.primaryShard?.content).toBe(input);

        // Vérifier que l'entrée a été ajoutée au cache
        const cache = contextManager.liveContextCache.get();
        expect(cache[enriched.id]).toBeDefined();
        expect(cache[enriched.id]).toEqual(enriched);
      });

      test('devrait mettre à jour un contexte existant avec le même contenu', async () => {
        const input = 'Contexte existant';

        // Créer un contexte initial
        const initial = await contextManager.enrichContext(input);
        const initialTimestamp = initial.timestamp;
        const initialId = initial.id;

        // Attendre un peu pour garantir une différence de timestamp
        await wait(10);

        // Enrichir le même contenu à nouveau
        const updated = await contextManager.enrichContext(input);

        // Vérifier que l'ID est le même mais que le timestamp est mis à jour
        expect(updated.id).toBe(initialId);
        expect(updated.timestamp).toBeGreaterThan(initialTimestamp);
        expect(updated.metadata.updatedAt).toBeInstanceOf(Date);
        expect(updated.metadata.updatedAt.getTime()).toBeGreaterThan(initial.metadata.updatedAt.getTime());
      });
    });

    describe('Algorithmes de calcul', () => {
      test('devrait calculer correctement la complexité pour différentes entrées', () => {
        // Accéder à la méthode privée pour les tests
        const calculateComplexity = (contextManager as any).calculateComplexity.bind(contextManager);

        // Texte simple
        const simpleText = 'Ceci est un texte simple.';
        const simpleComplexity = calculateComplexity(simpleText);
        expect(simpleComplexity).toBeGreaterThan(0);
        expect(simpleComplexity).toBeLessThan(0.5);

        // Texte plus complexe
        const complexText =
          "Le système d'intelligence artificielle implémente des algorithmes sophistiqués pour analyser et interpréter des données sémantiques complexes avec une précision remarquable.";
        const complexComplexity = calculateComplexity(complexText);
        expect(complexComplexity).toBeGreaterThan(simpleComplexity);

        // Texte très court
        const shortText = 'Bonjour.';
        const shortComplexity = calculateComplexity(shortText);
        expect(shortComplexity).toBeGreaterThan(0);
        expect(shortComplexity).toBeLessThan(simpleComplexity);

        // Texte très long
        const longText =
          "Le système de gestion contextuelle utilise des algorithmes avancés d'intelligence artificielle pour analyser, organiser et établir des relations entre différentes unités de connaissance. Cette approche multidimensionnelle permet d'extraire des insights pertinents et de faciliter la découverte de corrélations non évidentes. En intégrant des métriques de complexité et d'innovation, le système fournit une évaluation quantitative de la richesse informationnelle des données traitées. Ces mécanismes permettent l'émergence de perspectives nouvelles et favorisent l'exploration créative des domaines conceptuels.";
        const longComplexity = calculateComplexity(longText);
        expect(longComplexity).toBeGreaterThan(0.7); // Texte long et riche
      });

      test("devrait calculer correctement le potentiel d'innovation pour différentes entrées", () => {
        // Accéder à la méthode privée pour les tests
        const assessInnovation = (contextManager as any).assessInnovation.bind(contextManager);

        // Texte standard
        const standardText = "Développement d'une application web standard";
        const standardInnovation = assessInnovation(standardText);
        expect(standardInnovation).toBeGreaterThan(0.1);

        // Texte avec mots-clés d'innovation
        const innovativeText =
          'Intelligence artificielle générative révolutionnant la créativité multimodale avec une architecture transformer disruptive';
        const innovativeScore = assessInnovation(innovativeText);
        expect(innovativeScore).toBeGreaterThan(standardInnovation);
        expect(innovativeScore).toBeGreaterThan(0.7);

        // Texte technique
        const technicalText = "Implémentation d'une architecture transformer avec attention multi-tête";
        const technicalScore = assessInnovation(technicalText);
        expect(technicalScore).toBeGreaterThan(standardInnovation);
      });
    });

    describe('Interactions avec VectorDB', () => {
      test('devrait appeler correctement upsertContext', async () => {
        const id = 'test-id';
        const vector = [0.1, 0.2, 0.3];
        const metadata: ContextCluster = {
          id: 'test-cluster',
          vectors: [],
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
        };

        await contextManager.upsertContext(id, vector, metadata);

        expect(mockVectorDB.upsertVector).toHaveBeenCalledWith(id, vector, metadata);
      });

      test('devrait appeler correctement findRelevantContext', async () => {
        const vector = [0.1, 0.2, 0.3];
        const topK = 5;

        await contextManager.findRelevantContext(vector, topK);

        expect(mockVectorDB.findRelevant).toHaveBeenCalledWith(vector, topK);
      });

      test('devrait appeler correctement deleteContext', async () => {
        const id = 'test-id';

        await contextManager.deleteContext(id);

        expect(mockVectorDB.deleteVector).toHaveBeenCalledWith(id);
      });

      test('devrait gérer correctement la consolidation des résultats', async () => {
        const results = [
          {
            status: 'fulfilled',
            value: {
              id: 'result-1',
              vector: [0.1, 0.2, 0.3],
              metadata: { test: 'data1' },
            },
          },
          {
            status: 'rejected',
            reason: new Error('Test error'),
          },
          {
            status: 'fulfilled',
            value: {
              id: 'result-2',
              vector: [0.4, 0.5, 0.6],
              metadata: { test: 'data2' },
            },
          },
        ];

        await contextManager.consolidateResults(results as any);

        expect(mockVectorDB.updateVectors).toHaveBeenCalledWith([
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
        ]);
      });
    });
  });
});
