import type { LLMProvider } from '../../types/llm';

export class IntelligentCache {
  private cache: Map<string, string>;
  private provider: LLMProvider;

  constructor(provider: LLMProvider) {
    this.cache = new Map();
    this.provider = provider;
  }

  async getResponse(input: string): Promise<string> {
    if (this.cache.has(input)) {
      return this.cache.get(input)!;
    }

    const response = await this.provider.getResponse(input);
    this.cache.set(input, response);
    return response;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
