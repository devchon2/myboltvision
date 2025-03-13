import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LLMManager } from '../lib/modules/llm/manager';
import { BaseProvider } from '../lib/modules/llm/base-provider';
import type { IProviderSetting } from '../types/types/model';
import type { ModelInfo } from '../lib/modules/llm/types';

// Mock pour la fonction de journalisation
vi.mock('../utils/logger', () => {
  return {
    createScopedLogger: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }),
  };
});

// Mock pour le registre des providers
vi.mock('../lib/modules/llm/registry', async () => {
  const MockProvider1 = vi.fn().mockImplementation(() => {
    return {
      name: 'mock-provider-1',
      staticModels: [
        { name: 'static-model-1', provider: 'mock-provider-1', maxTokenAllowed: 4000, label: 'Static Model 1' },
        { name: 'static-model-2', provider: 'mock-provider-1', maxTokenAllowed: 8000, label: 'Static Model 2' },
      ],
      getDynamicModels: vi.fn().mockImplementation(async () => {
        return [
          { name: 'dynamic-model-1', provider: 'mock-provider-1', maxTokenAllowed: 16000, label: 'Dynamic Model 1' },
          { name: 'dynamic-model-2', provider: 'mock-provider-1', maxTokenAllowed: 32000, label: 'Dynamic Model 2' },
        ];
      }),
      getModelsFromCache: vi.fn(),
      storeDynamicModels: vi.fn(),
    };
  });

  const MockProvider2 = vi.fn().mockImplementation(() => {
    return {
      name: 'mock-provider-2',
      staticModels: [
        { name: 'static-model-3', provider: 'mock-provider-2', maxTokenAllowed: 4000, label: 'Static Model 3' },
      ],
      getModelsFromCache: vi.fn(),
      storeDynamicModels: vi.fn(),
    };
  });

  MockProvider1.prototype = Object.create(BaseProvider.prototype);
  MockProvider2.prototype = Object.create(BaseProvider.prototype);

  return {
    MockProvider1,
    MockProvider2,
  };
});

describe('LLMManager', () => {
  // Créer une fonction pour réinitialiser le singleton entre les tests
  const resetSingleton = () => {
    // @ts-ignore - Accès à la propriété privée pour les tests
    LLMManager._instance = undefined;
  };

  beforeEach(() => {
    resetSingleton();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetSingleton();
  });

  it('doit créer une instance singleton', () => {
    const manager1 = LLMManager.getInstance();
    const manager2 = LLMManager.getInstance();

    expect(manager1).toBe(manager2);
  });

  it("doit enregistrer les providers lors de l'initialisation", () => {
    const manager = LLMManager.getInstance();

    // Vérifier que les providers mockés ont été enregistrés
    expect(manager.getAllProviders().length).toBeGreaterThan(0);

    const providerNames = manager.getAllProviders().map((p) => p.name);
    expect(providerNames).toContain('mock-provider-1');
    expect(providerNames).toContain('mock-provider-2');
  });

  it('doit retourner la liste des modèles statiques', () => {
    const manager = LLMManager.getInstance();
    const staticModels = manager.getStaticModelList();

    expect(staticModels.length).toBe(3); // 2 de provider1 + 1 de provider2

    const modelNames = staticModels.map((m) => m.name);
    expect(modelNames).toContain('static-model-1');
    expect(modelNames).toContain('static-model-2');
    expect(modelNames).toContain('static-model-3');
  });

  it('doit récupérer un provider par son nom', () => {
    const manager = LLMManager.getInstance();

    const provider = manager.getProvider('mock-provider-1');
    expect(provider).toBeDefined();
    expect(provider?.name).toBe('mock-provider-1');

    const nonExistentProvider = manager.getProvider('non-existent');
    expect(nonExistentProvider).toBeUndefined();
  });

  it('doit mettre à jour la liste des modèles avec les modèles dynamiques', async () => {
    const manager = LLMManager.getInstance();

    const apiKeys = { 'mock-provider-1': 'test-api-key' };
    const providerSettings: Record<string, IProviderSetting> = {
      'mock-provider-1': { enabled: true },
      'mock-provider-2': { enabled: true },
    };

    const models = await manager.updateModelList({ apiKeys, providerSettings });

    // 2 statiques de provider2 + 2 dynamiques de provider1 (les statiques de provider1 sont remplacés)
    expect(models.length).toBe(3);

    const modelNames = models.map((m) => m.name);
    expect(modelNames).toContain('dynamic-model-1');
    expect(modelNames).toContain('dynamic-model-2');
    expect(modelNames).toContain('static-model-3');
  });

  it("doit récupérer la liste des modèles d'un provider spécifique", async () => {
    const manager = LLMManager.getInstance();
    const provider = manager.getProvider('mock-provider-1');

    if (!provider) {
      throw new Error('Provider not found');
    }

    const models = await manager.getModelListFromProvider(provider, {
      apiKeys: { 'mock-provider-1': 'test-api-key' },
    });

    expect(models.length).toBe(2); // Seulement les modèles dynamiques car ils remplacent les statiques

    const modelNames = models.map((m) => m.name);
    expect(modelNames).toContain('dynamic-model-1');
    expect(modelNames).toContain('dynamic-model-2');
  });

  it('doit retourner uniquement les modèles statiques quand le provider ne supporte pas les modèles dynamiques', async () => {
    const manager = LLMManager.getInstance();
    const provider = manager.getProvider('mock-provider-2');

    if (!provider) {
      throw new Error('Provider not found');
    }

    const models = await manager.getModelListFromProvider(provider, {});

    expect(models.length).toBe(1);
    expect(models[0].name).toBe('static-model-3');
  });

  it('doit retourner le premier provider par défaut', () => {
    const manager = LLMManager.getInstance();

    const defaultProvider = manager.getDefaultProvider();
    expect(defaultProvider).toBeDefined();
  });

  it('doit utiliser les modèles en cache si disponibles', async () => {
    const manager = LLMManager.getInstance();
    const provider = manager.getProvider('mock-provider-1');

    if (!provider) {
      throw new Error('Provider not found');
    }

    // Simuler des modèles en cache
    const cachedModels: ModelInfo[] = [
      { name: 'cached-model', provider: 'mock-provider-1', maxTokenAllowed: 16000, label: 'Cached Model' },
    ];

    // @ts-ignore - Accès direct pour le test
    provider.getModelsFromCache = vi.fn().mockReturnValue(cachedModels);

    const options = { apiKeys: { 'mock-provider-1': 'test-key' } };
    const models = await manager.getModelListFromProvider(provider, options);

    // Vérifier que les modèles en cache ont été utilisés
    expect(provider.getModelsFromCache).toHaveBeenCalledWith(options);
    expect(models).toContainEqual(expect.objectContaining({ name: 'cached-model' }));

    // Vérifier que getDynamicModels n'a pas été appelé
    // @ts-ignore - Accès direct pour le test
    expect(provider.getDynamicModels).not.toHaveBeenCalled();
  });

  it('doit gérer les erreurs lors de la récupération des modèles dynamiques', async () => {
    const manager = LLMManager.getInstance();
    const provider = manager.getProvider('mock-provider-1');

    if (!provider) {
      throw new Error('Provider not found');
    }

    // Simuler une erreur
    // @ts-ignore - Accès direct pour le test
    provider.getModelsFromCache = vi.fn().mockReturnValue(null);
    // @ts-ignore - Accès direct pour le test
    provider.getDynamicModels = vi.fn().mockRejectedValue(new Error('API error'));

    const models = await manager.getModelListFromProvider(provider, {});

    // Devrait retourner uniquement les modèles statiques en cas d'erreur
    expect(models.length).toBe(2);
    expect(models[0].name).toBe('static-model-1');
    expect(models[1].name).toBe('static-model-2');
  });
});
