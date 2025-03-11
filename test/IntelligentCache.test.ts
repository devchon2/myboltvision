import { IntelligentCache } from '../app/lib/core/IntelligentCache';
import type { LLMProvider } from '../app/types/llm';

class MockProvider implements LLMProvider {
  async getResponse(input: string): Promise<string> {
    return `Mock response for ${input}`;
  }
}

describe('IntelligentCache', () => {
  let intelligentCache: IntelligentCache;
  let mockProvider: MockProvider;

  beforeEach(() => {
    mockProvider = new MockProvider();
    intelligentCache = new IntelligentCache(mockProvider);
  });

  it('should get response from cache if available', async () => {
    const input = 'test input';
    const cachedResponse = 'Cached response';
    intelligentCache['cache'].set(input, cachedResponse);

    const response = await intelligentCache.getResponse(input);
    expect(response).toEqual(cachedResponse);
  });

  it('should get response from provider and cache it if not available', async () => {
    const input = 'test input';
    const response = await intelligentCache.getResponse(input);
    expect(response).toEqual(`Mock response for ${input}`);
    expect(intelligentCache['cache'].get(input)).toEqual(`Mock response for ${input}`);
  });

  it('should clear cache', () => {
    const input = 'test input';
    intelligentCache['cache'].set(input, 'Cached response');
    intelligentCache.clearCache();
    expect(intelligentCache['cache'].size).toBe(0);
  });
});
