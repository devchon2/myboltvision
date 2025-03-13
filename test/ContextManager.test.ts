import { describe, it, expect, beforeEach } from 'vitest';
import { ContextManager } from '../lib/core/ContextManager.js';
import type { ContextCluster } from '../types/types/context.js';

describe('ContextManager', () => {
  let manager: ContextManager;

  beforeEach(() => {
    manager = new ContextManager();
  });

  it('should initialize with empty cache', () => {
    const cache = manager.liveContextCache.get();
    expect(cache).toEqual({});
  });

  it('should enrich context with basic input', async () => {
    const input = 'Test context';
    const result = await manager.enrichContext(input);

    expect(result).toHaveProperty('id');
    expect(result.content).toBe(input);
    expect(result.primaryShard.content).toBe(input);
    expect(result.complexityMetric).toBeGreaterThan(0);
    expect(result.innovationPotential).toBeGreaterThan(0);
  });

  it('should cache enriched context', async () => {
    const input = 'Test caching';
    await manager.enrichContext(input);

    const cached = manager.checkLiveCache(input);
    expect(cached).toBeDefined();
    expect(cached?.content).toBe(input);
  });

  it('should purge stale cache entries', async () => {
    // Add multiple entries with different timestamps
    const now = Date.now();
    const oldContext = {
      id: 'old-ctx',
      content: 'Old context',
      timestamp: now - 7200000, // 2 hours old
      metadata: { createdAt: new Date(), updatedAt: new Date() },
    } as ContextCluster;

    manager.liveContextCache.set({ [oldContext.id]: oldContext });

    // Add a recent context
    const recentContext = await manager.enrichContext('Recent context');

    // Purge stale entries
    manager.purgeStaleCacheEntries();

    const cache = manager.liveContextCache.get();
    expect(cache[oldContext.id]).toBeUndefined();
    expect(cache[recentContext.id]).toBeDefined();
  });

  it('should calculate context complexity', () => {
    const simpleText = 'Simple text';
    const complexText = 'This is a more complex text with technical terms like AI and blockchain';

    const simpleScore = manager.calculateComplexity(simpleText);
    const complexScore = manager.calculateComplexity(complexText);

    expect(simpleScore).toBeGreaterThan(0);
    expect(complexScore).toBeGreaterThan(simpleScore);
  });

  it('should assess innovation potential', () => {
    const basicText = 'Basic text without innovation';
    const innovativeText = 'This text discusses AI, blockchain and other emerging technologies';

    const basicScore = manager.assessInnovation(basicText);
    const innovativeScore = manager.assessInnovation(innovativeText);

    expect(basicScore).toBeGreaterThan(0);
    expect(innovativeScore).toBeGreaterThan(basicScore);
  });
});
