/**
 * Informations sur un fournisseur de modèle LLM
 */
export interface ProviderInfo {
  name: string;
  displayName: string;
  models: string[];
  description?: string;
  getModelInstance: (options: {
    model: string;
    serverEnv: Record<string, string | undefined>;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }) => any;
  enabled?: boolean;
}

/**
 * Configuration d'un fournisseur
 */
export interface IProviderConfig {
  provider: string;
  models: string[];
  baseUrl?: string;
  apiKey?: string;
}

/**
 * Paramètres spécifiques pour un fournisseur
 */
export interface IProviderSetting {
  enabled: undefined;
  baseUrl?: string;
  apiKey?: string;
}

/**
 * Informations sur un modèle LLM
 */
export interface ModelInfo {
  name: string;
  provider: string;
  providerName?: string;
  maxTokenAllowed?: number;
  description?: string;
  contextWindow?: number;
  deprecated?: boolean;
}
