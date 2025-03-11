import { LightModelOptimizer } from '../app/lib/core/LightModelOptimizer';
import type { LLMProvider } from '../app/types/llm';

class MockProvider implements LLMProvider {
  async getResponse(input: string): Promise<string> {
    return `Mock response for ${input}`;
  }
}

describe('LightModelOptimizer', () => {
  let lightModelOptimizer: LightModelOptimizer;
  let mockProvider: MockProvider;

  beforeEach(() => {
    mockProvider = new MockProvider();
    lightModelOptimizer = new LightModelOptimizer(mockProvider);
  });

  it('should optimize model', async () => {
    const input = 'test input';
    const optimizedResponse = await lightModelOptimizer.optimizeModel(input);
    expect(optimizedResponse).toEqual(`Mock response for ${input}`);
  });
});
