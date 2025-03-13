import type { ContextCluster } from '../../types/types/context';
import { ContextManager } from './ContextManager';
import { VectorCache } from './VectorCache';

/**
 * Intégration du VectorCache avec le ContextManager
 * Cette classe étend le ContextManager pour utiliser le VectorCache
 * comme couche de mise en cache hautes performances
 */
export class VectorCacheIntegration {
  private readonly contextManager: ContextManager;
  private readonly vectorCache: VectorCache;

  // Configurer la durée de vie du cache (1 heure par défaut)
  private readonly cacheTTL: number = 60 * 60 * 1000;

  // Seuil de similarité par défaut pour les recherches
  private readonly defaultSimilarityThreshold: number = 0.85;

  constructor(contextManager: ContextManager) {
    this.contextManager = contextManager;
    this.vectorCache = new VectorCache();

    // Nettoyer le cache périodiquement
    this.scheduleCachePruning();
  }

  /**
   * Programme le nettoyage périodique du cache
   * @private
   */
  private scheduleCachePruning(): void {
    // Nettoyer le cache toutes les 10 minutes
    setInterval(
      () => {
        this.vectorCache.pruneStaleEntries(this.cacheTTL);
      },
      10 * 60 * 1000,
    );
  }

  /**
   * Charge les clusters de contexte initiaux dans le cache
   * @param clusters Clusters de contexte à charger
   */
  preloadContextClusters(clusters: ContextCluster[]): void {
    for (const cluster of clusters) {
      this.vectorCache.setContextCluster(cluster);
    }
  }

  /**
   * Trouve les clusters de contexte similaires au vecteur de requête
   * @param queryVector Vecteur de requête
   * @param threshold Seuil de similarité (optionnel)
   * @param useCache Utiliser le cache (par défaut: true)
   * @returns Promesse de tableau de ContextClusters
   */
  async findSimilarContexts(
    queryVector: number[],
    threshold: number = this.defaultSimilarityThreshold,
    useCache: boolean = true,
  ): Promise<ContextCluster[]> {
    // Vérifier d'abord dans le cache
    if (useCache) {
      const cachedResults = this.vectorCache.findSimilarContextClusters(queryVector, threshold);

      // Si des résultats sont trouvés dans le cache, les retourner
      if (cachedResults.length > 0) {
        return cachedResults;
      }
    }

    // Sinon, rechercher dans la base de données vectorielle
    const dbResults = await this.contextManager.findRelevantContext(queryVector);

    // Mettre en cache les résultats pour les prochaines requêtes
    for (const result of dbResults) {
      this.vectorCache.setContextCluster(result);
    }

    return dbResults;
  }

  /**
   * Ajoute ou met à jour un cluster de contexte
   * @param cluster ContextCluster à ajouter ou mettre à jour
   * @param vector Vecteur d'embedding associé
   */
  async upsertContextCluster(cluster: ContextCluster, vector: number[]): Promise<void> {
    // Mettre à jour la base de données vectorielle
    await this.contextManager.upsertContext(cluster.id, vector, cluster);

    // Mettre à jour le cache
    this.vectorCache.setContextCluster(cluster);
  }

  /**
   * Supprime un cluster de contexte
   * @param id Identifiant du cluster à supprimer
   */
  async deleteContextCluster(id: string): Promise<void> {
    // Supprimer de la base de données vectorielle
    await this.contextManager.deleteContext(id);

    // Supprimer du cache
    this.vectorCache.delete(id);
  }

  /**
   * Récupère un cluster de contexte par son ID
   * @param id Identifiant du cluster
   * @param useCache Utiliser le cache (par défaut: true)
   * @returns Le ContextCluster ou undefined si non trouvé
   */
  getContextCluster(id: string, useCache: boolean = true): ContextCluster | undefined {
    // Vérifier d'abord dans le cache si autorisé
    if (useCache) {
      const cachedCluster = this.vectorCache.getContextCluster(id);

      if (cachedCluster) {
        return cachedCluster;
      }
    }

    /*
     * Dans une implémentation réelle, on chercherait dans la base de données
     * si le cluster n'est pas trouvé dans le cache
     * Pour simplifier, on retourne undefined ici
     */
    return undefined;
  }

  /**
   * Enrichit un texte en contexte et l'ajoute au cache et à la base de données
   * @param input Texte à enrichir
   * @returns ContextCluster enrichi
   */
  async enrichAndCacheContext(input: string): Promise<ContextCluster> {
    // Utiliser le ContextManager pour enrichir le contexte
    const enrichedContext = await this.contextManager.enrichContext(input);

    // Extraire le vecteur d'embedding du premier vecteur
    const vector = enrichedContext.vectors?.[0]?.embedding;

    // Si un vecteur existe, mettre à jour la base de données et le cache
    if (vector && Array.isArray(vector)) {
      await this.upsertContextCluster(enrichedContext, vector);
    } else {
      // Sinon, juste mettre à jour le cache
      this.vectorCache.setContextCluster(enrichedContext);
    }

    return enrichedContext;
  }

  /**
   * Vide entièrement le cache
   */
  clearCache(): void {
    this.vectorCache.clear();
  }

  /**
   * Retourne la taille actuelle du cache
   * @returns Nombre d'éléments dans le cache
   */
  getCacheSize(): number {
    return this.vectorCache.size();
  }
}
