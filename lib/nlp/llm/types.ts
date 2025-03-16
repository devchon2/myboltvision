import type { LanguageModelV1 } from 'ai';
import type { IProviderSetting } from '../../../types/model.ts';
export type { IProviderSetting } from '../../../types/model.ts';

export interface ModelInfo {
  name: string;
  label: string;
  provider: string;
  maxTokenAllowed: number;
}

export interface ProviderInfo {
  name: string;
  displayName: string;
  models: ModelInfo[];
  getModelInstance: (options: {
    model: string;
    serverEnv: Record<string, string>;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }) => Promise<LanguageModelV1>;
  staticModels: ModelInfo[];
  getApiKeyLink?: string;
  labelForGetApiKey?: string;
  icon?: string;
  getDynamicModels?: (
    apiKeys?: Record<string, string>,
    providerSettings?: Record<string, IProviderSetting>,
    serverEnv?: Record<string, string>,
  ) => Promise<ModelInfo[]>;
  getModelsFromCache?: (options: {
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
    serverEnv?: Record<string, string>;
  }) => ModelInfo[] | undefined;
  storeDynamicModels?: (
    options: {
      apiKeys?: Record<string, string>;
      providerSettings?: Record<string, IProviderSetting>;
      serverEnv?: Record<string, string>;
    },
    models: ModelInfo[],
  ) => void;
}
export interface ProviderConfig {
  baseUrlKey?: string;
  baseUrl?: string;
  apiTokenKey?: string;
}
export type { LanguageModelV1 };
