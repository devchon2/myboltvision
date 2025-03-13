import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { VectorCache } from '../lib/core/VectorCache';
import type { ContextCluster } from '../types/types/context';

// Ce test suit l'approche TDD (Test-Driven Development)
// Nous définissons d'abord les comportements attendus avant d'implémenter la fonctionnalité

describe('VectorCache', () => {
  let vectorCache: VectorCache;
  let mockDate: number;

  // Configuration commune pour tous les tests
  beforeEach(() => {
    vi.clearAllMocks();
    mockDate = 1646735000000; // Date fixe pour les tests
    vi.spyOn(Date, 'now').mockImplementation(() => mockDate);
    vectorCache = new VectorCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devrait correctement initialiser le cache', () => {
    expect(vectorCache).toBeDefined();
    expect(vectorCache.size()).toBe(0);
  });

  it('devrait stocker un vecteur dans le cache', () => {
    const mockVector = {
      id: 'test-id',
      embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    vectorCache.set('test-id', mockVector);
    expect(vectorCache.size()).toBe(1);
    expect(vectorCache.has('test-id')).toBe(true);
  });

  it('devrait récupérer un vecteur depuis le cache', () => {
    const mockVector = {
      id: 'test-id',
      embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    vectorCache.set('test-id', mockVector);
    const retrievedVector = vectorCache.get('test-id');

    expect(retrievedVector).toEqual(mockVector);
  });

  it('devrait retourner undefined pour un id non présent dans le cache', () => {
    expect(vectorCache.get('non-existent')).toBeUndefined();
  });

  it('devrait supprimer un vecteur du cache', () => {
    const mockVector = {
      id: 'test-id',
      embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    vectorCache.set('test-id', mockVector);
    expect(vectorCache.size()).toBe(1);

    vectorCache.delete('test-id');
    expect(vectorCache.size()).toBe(0);
    expect(vectorCache.has('test-id')).toBe(false);
  });

  it("devrait vider l'intégralité du cache", () => {
    const mockVector1 = {
      id: 'test-id-1',
      embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    const mockVector2 = {
      id: 'test-id-2',
      embedding: [0.6, 0.7, 0.8, 0.9, 1.0],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    vectorCache.set('test-id-1', mockVector1);
    vectorCache.set('test-id-2', mockVector2);
    expect(vectorCache.size()).toBe(2);

    vectorCache.clear();
    expect(vectorCache.size()).toBe(0);
  });

  it('devrait nettoyer les entrées expirées du cache', () => {
    const freshVector = {
      id: 'fresh-id',
      embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
      metadata: {
        createdAt: new Date(mockDate - 10 * 60 * 1000), // 10 minutes ago
        source: 'test',
      },
    };

    const staleVector = {
      id: 'stale-id',
      embedding: [0.6, 0.7, 0.8, 0.9, 1.0],
      metadata: {
        createdAt: new Date(mockDate - 2 * 60 * 60 * 1000), // 2 hours ago
        source: 'test',
      },
    };

    vectorCache.set('fresh-id', freshVector);
    vectorCache.set('stale-id', staleVector);
    expect(vectorCache.size()).toBe(2);

    // Nettoyer avec une durée de vie d'une heure
    vectorCache.pruneStaleEntries(60 * 60 * 1000); // 1 hour in milliseconds

    expect(vectorCache.size()).toBe(1);
    expect(vectorCache.has('fresh-id')).toBe(true);
    expect(vectorCache.has('stale-id')).toBe(false);
  });

  it('devrait trouver les vecteurs similaires avec un seuil de similarité', () => {
    const vector1 = {
      id: 'vector-1',
      embedding: [0.9, 0.1, 0.1, 0.1, 0.1],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    const vector2 = {
      id: 'vector-2',
      embedding: [0.1, 0.9, 0.1, 0.1, 0.1],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    const vector3 = {
      id: 'vector-3',
      embedding: [0.85, 0.15, 0.1, 0.1, 0.1],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    vectorCache.set('vector-1', vector1);
    vectorCache.set('vector-2', vector2);
    vectorCache.set('vector-3', vector3);

    // Rechercher des vecteurs similaires à [0.9, 0.1, 0.1, 0.1, 0.1]
    // avec un seuil de similarité de 0.8 (doit retourner vector1 et vector3)
    const queryVector = [0.9, 0.1, 0.1, 0.1, 0.1];
    const similarVectors = vectorCache.findSimilar(queryVector, 0.8);

    // Vérifier que seuls vector1 et vector3 sont retournés
    expect(similarVectors.length).toBe(2);
    expect(similarVectors.map((v) => v.id)).toContain('vector-1');
    expect(similarVectors.map((v) => v.id)).toContain('vector-3');
    expect(similarVectors.map((v) => v.id)).not.toContain('vector-2');
  });

  it('devrait retourner les entrées du cache triées par similarité décroissante', () => {
    const vector1 = {
      id: 'vector-1',
      embedding: [0.9, 0.1, 0.1, 0.1, 0.1],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    const vector2 = {
      id: 'vector-2',
      embedding: [0.1, 0.9, 0.1, 0.1, 0.1],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    const vector3 = {
      id: 'vector-3',
      embedding: [0.85, 0.15, 0.1, 0.1, 0.1],
      metadata: {
        createdAt: new Date(mockDate),
        source: 'test',
      },
    };

    vectorCache.set('vector-1', vector1);
    vectorCache.set('vector-2', vector2);
    vectorCache.set('vector-3', vector3);

    // Rechercher des vecteurs similaires à [0.9, 0.1, 0.1, 0.1, 0.1]
    const queryVector = [0.9, 0.1, 0.1, 0.1, 0.1];
    const similarVectors = vectorCache.findSimilar(queryVector);

    // Vérifier que les vecteurs sont triés par similarité décroissante
    expect(similarVectors.length).toBe(3);
    expect(similarVectors[0].id).toBe('vector-1'); // le plus similaire
    expect(similarVectors[1].id).toBe('vector-3'); // le deuxième plus similaire
    expect(similarVectors[2].id).toBe('vector-2'); // le moins similaire
  });

  it("devrait gérer correctement l'intégration avec ContextCluster", () => {
    // Créer un ContextCluster
    const contextCluster: ContextCluster = {
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
    };

    // Stocker le ContextCluster dans le cache
    vectorCache.setContextCluster(contextCluster);

    // Vérifier qu'il est correctement stocké
    expect(vectorCache.size()).toBe(1);
    expect(vectorCache.has(contextCluster.id)).toBe(true);

    // Récupérer le ContextCluster depuis le cache
    const retrievedCluster = vectorCache.getContextCluster(contextCluster.id);
    expect(retrievedCluster).toEqual(contextCluster);

    // Rechercher un ContextCluster similaire
    const queryVector = [0.9, 0.1, 0.1, 0.1, 0.1];
    const similarClusters = vectorCache.findSimilarContextClusters(queryVector, 0.8);

    expect(similarClusters.length).toBe(1);
    expect(similarClusters[0].id).toBe('cluster-1');
  });
});
