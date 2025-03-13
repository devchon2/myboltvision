import type { LLMProvider } from '../../types/llm';

export class LLMManager {
  private providers: Map<string, LLMProvider>;

  constructor() {
    this.providers = new Map();
  }

  addProvider(name: string, provider: LLMProvider): void {
    this.providers.set(name, provider);
  }

  async getResponse(providerName: string, input: string): Promise<string> {
    const provider = this.providers.get(providerName);

    if (!provider) {
      throw new Error(`Provider ${providerName} not found`);
    }

    return await provider.getResponse(input);
  }
}
