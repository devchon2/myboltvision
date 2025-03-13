import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { getApiKeysFromCookie, getProviderSettingsFromCookie } from '../../../lib/api/cookies';
import { LLMManager } from '../../../lib/modules/llm/manager';
import type { ModelInfo } from '../../../lib/modules/llm/types';
import type { ProviderInfo } from '../../../types/model';

// Type étendu pour inclure les propriétés supplémentaires utilisées dans le code existant
interface ExtendedProviderInfo extends ProviderInfo {
  staticModels?: ModelInfo[];
  getApiKeyLink?: string;
  labelForGetApiKey?: string;
  icon?: string;
}

interface ModelsResponse {
  modelList: ModelInfo[];
  providers: ExtendedProviderInfo[];
  defaultProvider: ExtendedProviderInfo;
}

// Convertit process.env en Record<string, string> en filtrant les undefined
function convertEnvToRecord(env: NodeJS.ProcessEnv): Record<string, string> {
  return Object.entries(env)
    .filter(([_, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value as string;
        return acc;
      },
      {} as Record<string, string>,
    );
}

// Cache pour optimiser les performances
let cachedProviders: ExtendedProviderInfo[] = [];
let cachedDefaultProvider: ExtendedProviderInfo | null = null;

/**
 * Récupère les informations sur les fournisseurs LLM
 */
function getProviderInfo(llmManager: LLMManager) {
  if (cachedProviders.length === 0) {
    cachedProviders = llmManager.getAllProviders().map((provider) => {
      // Conversion du type Provider interne vers ProviderInfo
      const providerInfo: ExtendedProviderInfo = {
        name: provider.name,
        displayName: provider.name, // Fallback si displayName n'existe pas
        models: provider.staticModels?.map((m) => m.name) || [],
        getModelInstance: provider.getModelInstance || (() => {}),

        // Propriétés supplémentaires
        staticModels: provider.staticModels,
        getApiKeyLink: provider.getApiKeyLink,
        labelForGetApiKey: provider.labelForGetApiKey,
        icon: provider.icon,
      };
      return providerInfo;
    });
  }

  if (!cachedDefaultProvider) {
    const defaultProvider = llmManager.getDefaultProvider();

    // Conversion similaire pour le fournisseur par défaut
    cachedDefaultProvider = {
      name: defaultProvider.name,
      displayName: defaultProvider.name,
      models: defaultProvider.staticModels?.map((m) => m.name) || [],
      getModelInstance: defaultProvider.getModelInstance || (() => {}),

      // Propriétés supplémentaires
      staticModels: defaultProvider.staticModels,
      getApiKeyLink: defaultProvider.getApiKeyLink,
      labelForGetApiKey: defaultProvider.labelForGetApiKey,
      icon: defaultProvider.icon,
    };
  }

  return {
    providers: cachedProviders,
    defaultProvider: cachedDefaultProvider as ExtendedProviderInfo,
  };
}

/**
 * GET /api/models
 * Récupère la liste des modèles disponibles pour tous les fournisseurs
 */
export async function GET(request: NextRequest) {
  // Récupération du context Next.js et conversion en format attendu
  const envRecord = convertEnvToRecord(process.env);

  // Initialisation du gestionnaire LLM
  const llmManager = LLMManager.getInstance(envRecord);

  // Récupération des cookies
  const cookieHeader = request.headers.get('Cookie') || '';
  const apiKeys = getApiKeysFromCookie(cookieHeader);
  const providerSettings = getProviderSettingsFromCookie(cookieHeader);

  // Récupération des informations sur les fournisseurs
  const { providers, defaultProvider } = getProviderInfo(llmManager);

  // Récupération de la liste des modèles pour tous les fournisseurs
  const modelList = await llmManager.updateModelList({
    apiKeys,
    providerSettings,
    serverEnv: envRecord,
  });

  // Réponse formatée
  return NextResponse.json<ModelsResponse>({
    modelList,
    providers,
    defaultProvider,
  });
}
