import { LLMManager } from '../app/lib/core/LLMManager';
import type { LLMProvider } from '../app/types/llm';

class MockProvider implements LLMProvider {
  async getResponse(input: string): Promise<string> {
    return `Mock response for ${input}`;
  }
}

describe('LLMManager', () => {
  let llmManager: LLMManager;
  let mockProvider: MockProvider;

  beforeEach(() => {
    llmManager = new LLMManager();
    mockProvider = new MockProvider();
    llmManager.addProvider('mock', mockProvider);
  });

  it('should add a provider', () => {
    expect(llmManager['providers'].get('mock')).toBe(mockProvider);
  });

  it('should get response from provider', async () => {
    const response = await llmManager.getResponse('mock', 'test input');
    expect(response).toEqual('Mock response for test input');
  });

  it('should throw an error if provider is not found', async () => {
    await expect(llmManager.getResponse('non-existent', 'test input')).rejects.toThrow('Provider non-existent not found');
  });
});
