import type { ContextShard } from '../../types/context';

/**
 * Crée un mock de ContextShard valide pour les tests
 */
export const createMockContextShard = (overrides: Partial<ContextShard> = {}): ContextShard => {
  return {
    id: 'test-context-id',
    type: 'test',
    content: 'Test content',
    data: {},
    relatedClusters: [],
    complexityMetric: 1,
    innovationPotential: 1,
    timestamp: Date.now(),
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0'
    },
    ...overrides
  } as ContextShard;
};
