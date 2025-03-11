import { SecurityManager } from '../app/lib/security/SecurityManager';
import type { ContextCluster } from '../app/types/context';
import { describe, expect, it, beforeEach, vi } from 'vitest';

describe('SecurityManager', () => {
  let securityManager: SecurityManager;

  beforeEach(() => {
    securityManager = new SecurityManager();
  });

  it('should add and get API key', () => {
    const key = 'apiKey';
    const value = 'apiValue';
    securityManager.addApiKey(key, value);
    expect(securityManager.getApiKey(key)).toBe(value);
  });

  it('should remove API key', () => {
    const key = 'apiKey';
    const value = 'apiValue';
    securityManager.addApiKey(key, value);
    securityManager.removeApiKey(key);
    expect(securityManager.getApiKey(key)).toBeUndefined();
  });

  it('should secure data', async () => {
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
      relatedClusters: [],
      shards: [],
      primaryShard: {
        id: 'shard1',
        type: 'primary',
        content: 'Test content',
        timestamp: Date.now(),
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' },
        relatedClusters: [],
        data: {},
        parentContextId: 'cluster1'
      },
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
    };

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await securityManager.secureData(context);
    expect(consoleSpy).toHaveBeenCalledWith('Data secured:', context);
    consoleSpy.mockRestore();
  });
});
