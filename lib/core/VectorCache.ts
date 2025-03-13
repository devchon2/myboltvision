import type { ContextCluster } from '../../types/types/context';

/**
 * Classe VectorCache - Système de cache optimisé pour les embeddings vectoriels
 *
 * Fournit une couche de mise en cache hautes performances pour les vecteurs d'embeddings
 * avec des fonctionnalités avancées comme la recherche de similarité et la gestion automatique
 * du cycle de vie des entrées du cache.
 */
export class VectorCache {
  private cache: Map<string, any>;
  private readonly DEFAULT_TTL = 60 * 60 * 1000; // 1 heure par défaut (en millisecondes)

  constructor() {
    this.cache = new Map<string, any>();
  }

  /**
   * Ajoute ou met à jour un vecteur dans le cache
   * @param id Identifiant unique du vecteur
   * @param vector Objet vecteur à stocker
   */
  set(id: string, vector: any): void {
    this.cache.set(id, vector);
  }

  /**
   * Récupère un vecteur depuis le cache
   * @param id Identifiant du vecteur à récupérer
   * @returns Le vecteur correspondant ou undefined si non trouvé
   */
  get(id: string): any {
    return this.cache.get(id);
  }

  /**
   * Vérifie si un vecteur existe dans le cache
   * @param id Identifiant du vecteur à vérifier
   * @returns boolean indiquant si le vecteur existe
   */
  has(id: string): boolean {
    return this.cache.has(id);
  }

  /**
   * Supprime un vecteur du cache
   * @param id Identifiant du vecteur à supprimer
   * @returns boolean indiquant si la suppression a réussi
   */
  delete(id: string): boolean {
    return this.cache.delete(id);
  }

  /**
   * Vide entièrement le cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Retourne le nombre d'éléments dans le cache
   * @returns Nombre d'éléments
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Supprime les entrées expirées du cache
   * @param ttl Durée de vie en millisecondes (par défaut: 1 heure)
   */
  pruneStaleEntries(ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();

    for (const [id, vector] of this.cache.entries()) {
      const createdAt = vector.metadata?.createdAt?.getTime();

      if (createdAt && now - createdAt > ttl) {
        this.cache.delete(id);
      }
    }
  }

  /**
   * Calcule la similarité cosinus entre deux vecteurs
   * @param vec1 Premier vecteur
   * @param vec2 Deuxième vecteur
   * @returns Score de similarité (entre -1 et 1, où 1 est identique)
   */
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) {
      throw new Error('Les vecteurs doivent avoir la même dimension');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    // Éviter la division par zéro
    if (norm1 === 0 || norm2 === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Trouve des vecteurs similaires à un vecteur de requête
   * @param queryVector Vecteur de requête pour la recherche
   * @param threshold Seuil minimal de similarité (optionnel)
   * @returns Tableau des vecteurs similaires triés par similarité décroissante
   */
  findSimilar(queryVector: number[], threshold?: number): any[] {
    const results: { id: string; vector: any; similarity: number }[] = [];

    for (const [id, vector] of this.cache.entries()) {
      if (!vector.embedding || !Array.isArray(vector.embedding)) {
        continue;
      }

      const similarity = this.cosineSimilarity(queryVector, vector.embedding);

      // Si un seuil est spécifié, ne garder que les résultats au-dessus du seuil
      if (threshold === undefined || similarity >= threshold) {
        results.push({ id, vector, similarity });
      }
    }

    // Trier par similarité décroissante
    results.sort((a, b) => b.similarity - a.similarity);

    // Retourner seulement les vecteurs (sans les scores de similarité)
    return results.map((result) => result.vector);
  }

  /**
   * Stocke un ContextCluster dans le cache
   * @param cluster ContextCluster à stocker
   */
  setContextCluster(cluster: ContextCluster): void {
    // Vérifier que le cluster a un identifiant valide
    if (!cluster.id) {
      throw new Error('Le ContextCluster doit avoir un identifiant valide');
    }

    this.cache.set(cluster.id, cluster);
  }

  /**
   * Récupère un ContextCluster depuis le cache
   * @param id Identifiant du cluster à récupérer
   * @returns Le ContextCluster ou undefined si non trouvé
   */
  getContextCluster(id: string): ContextCluster | undefined {
    const cluster = this.cache.get(id);
    return cluster as ContextCluster;
  }

  /**
   * Trouve des ContextClusters similaires à un vecteur de requête
   * @param queryVector Vecteur de requête pour la recherche
   * @param threshold Seuil minimal de similarité (optionnel)
   * @returns Tableau des ContextClusters similaires triés par similarité
   */
  findSimilarContextClusters(queryVector: number[], threshold?: number): ContextCluster[] {
    const results: { id: string; cluster: ContextCluster; similarity: number }[] = [];

    for (const [id, cluster] of this.cache.entries()) {
      // Vérifier que c'est bien un ContextCluster avec des vecteurs
      if (!this.isContextCluster(cluster) || !cluster.vectors || cluster.vectors.length === 0) {
        continue;
      }

      /*
       * Pour chaque cluster, utiliser le premier vecteur pour la similarité
       * (Dans une implémentation plus avancée, on pourrait comparer avec tous les vecteurs)
       */
      const embedding = cluster.vectors[0].embedding;

      if (!embedding || !Array.isArray(embedding)) {
        continue;
      }

      const similarity = this.cosineSimilarity(queryVector, embedding);

      // Si un seuil est spécifié, ne garder que les résultats au-dessus du seuil
      if (threshold === undefined || similarity >= threshold) {
        results.push({ id, cluster, similarity });
      }
    }

    // Trier par similarité décroissante
    results.sort((a, b) => b.similarity - a.similarity);

    // Retourner seulement les clusters (sans les scores de similarité)
    return results.map((result) => result.cluster);
  }

  /**
   * Vérifie si un objet est un ContextCluster
   * @param obj Objet à vérifier
   * @returns boolean indiquant si c'est un ContextCluster
   */
  private isContextCluster(obj: any): obj is ContextCluster {
    return obj && typeof obj === 'object' && 'id' in obj && 'type' in obj && 'primaryShard' in obj && 'vectors' in obj;
  }

  /**
   * Méthode statique pour les tests - retourne les méthodes mockables
   * @returns Un objet contenant les méthodes principales à mocker pour les tests
   * @internal Utilisé uniquement pour les tests
   */
  static _getMocks() {
    return {
      setContextCluster: VectorCache.prototype.setContextCluster,
      findSimilarContextClusters: VectorCache.prototype.findSimilarContextClusters,
      delete: VectorCache.prototype.delete,
      clear: VectorCache.prototype.clear,
      pruneStaleEntries: VectorCache.prototype.pruneStaleEntries,
      size: VectorCache.prototype.size,
      getContextCluster: VectorCache.prototype.getContextCluster,
    };
  }
}
