export interface LLMProvider {
  getResponse(input: string): Promise<string>;
}
