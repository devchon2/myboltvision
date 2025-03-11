/**
 * Provider Ollama AI pour MyBoltVision
 * 
 * Ce module permet l'intégration avec Ollama pour l'exécution de modèles LLM localement.
 */

import type { LLMProvider, ModelInfo, ProviderOptions, ChatMessage, LLMResponse } from '~/types/llm';
import { logger } from '~/utils/logger';

export class OllamaProvider implements LLMProvider {
  id = 'ollama';
  name = 'Ollama AI';
  description = 'Exécution locale de modèles LLM via Ollama';
  baseUrl: string;
  apiKey?: string;
  defaultModel: string;

  constructor(options: ProviderOptions = {}) {
    this.baseUrl = options.baseUrl || 'http://localhost:11434';
    this.apiKey = options.apiKey; // Ollama ne nécessite généralement pas de clé API en local
    this.defaultModel = options.defaultModel || 'llama2';
  }

  async listModels(): Promise<ModelInfo[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des modèles: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return data.models.map((model: any) => ({
        id: model.name,
        name: model.name,
        provider: this.id,
        capabilities: ['chat', 'completion'],
        contextLength: model.parameters?.context_length || 4096,
        supportsFunctions: false,
        supportsVision: false
      }));
    } catch (error) {
      logger.error(`[OllamaProvider] Erreur lors de la récupération des modèles`, error);
      return [];
    }
  }

  async chat(
    messages: ChatMessage[],
    model: string = this.defaultModel,
    options: any = {}
  ): Promise<LLMResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          stream: false,
          options: {
            temperature: options.temperature || 0.7,
            top_p: options.top_p || 0.9,
            max_tokens: options.max_tokens || 1024
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'appel à l'API Ollama: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: `ollama-${Date.now()}`,
        content: data.message.content,
        model,
        provider: this.id,
        usage: {
          promptTokens: -1, // Ollama ne fournit pas cette métrique
          completionTokens: -1,
          totalTokens: -1
        }
      };
    } catch (error) {
      logger.error(`[OllamaProvider] Erreur lors de l'appel au modèle`, error);
      throw new Error(`Erreur lors de l'appel au modèle Ollama: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  async completion(
    prompt: string,
    model: string = this.defaultModel,
    options: any = {}
  ): Promise<LLMResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          options: {
            temperature: options.temperature || 0.7,
            top_p: options.top_p || 0.9,
            max_tokens: options.max_tokens || 1024
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'appel à l'API Ollama: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: `ollama-${Date.now()}`,
        content: data.response,
        model,
        provider: this.id,
        usage: {
          promptTokens: -1,
          completionTokens: -1,
          totalTokens: -1
        }
      };
    } catch (error) {
      logger.error(`[OllamaProvider] Erreur lors de l'appel au modèle`, error);
      throw new Error(`Erreur lors de l'appel au modèle Ollama: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
}

export default OllamaProvider;
