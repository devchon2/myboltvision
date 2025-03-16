import { map } from 'nanostores';
import type {  ContextCluster } from '../../types/types/context.js';
import { VectorDB } from './VectorDB.js';

export class ContextManager {
  contextVectorDB: VectorDB;
  liveContextCache = map<Partial<Record<string, ContextCluster>>>();

  constructor() {
    this.contextVectorDB = new VectorDB();

    // Initialiser le cache en s'assurant que liveContextCache est bien initialisé
    try {
      if (this.liveContextCache && typeof this.liveContextCache.set === 'function') {
        this.liveContextCache.set({});
      }
    } catch (error) {
      console.warn("Erreur lors de l'initialisation du cache: ", error);

      // Continuer sans initialiser le cache
    }
  }

  checkLiveCache(input: string): ContextCluster | undefined {
    const cache = (this.liveContextCache.get() as Partial<Record<string, ContextCluster>>) || {};
    return Object.values(cache).find(
      (ctx) => ctx && typeof ctx.content === 'string' && ctx.content.toLowerCase() === input.toLowerCase(),
    );
  }

  purgeStaleCacheEntries(): void {
    const currentTime = Date.now();
    const cacheContent = (this.liveContextCache.get() as Partial<Record<string, ContextCluster>>) || {};
    const filteredEntries = Object.entries(cacheContent).filter(
      ([_, entry]) => entry && typeof entry.timestamp === 'number' && currentTime - entry.timestamp < 3600000,
    ); // 1 heure

    if (typeof this.liveContextCache.set === 'function') {
      this.liveContextCache.set(Object.fromEntries(filteredEntries));
    }
  }

  async enrichContext(input: string): Promise<ContextCluster> {
    // Vérifier si le contexte existe déjà dans le cache
    const existingContext = this.checkLiveCache(input);

    if (existingContext) {
      // Mise à jour du contexte existant
      const now = new Date();

      // Attendre un petit délai pour assurer une différence entre les dates
      await new Promise((resolve) => setTimeout(resolve, 10));

      return {
        ...existingContext,
        timestamp: Date.now(),
        metadata: {
          ...existingContext.metadata,
          updatedAt: now,
        },
      };
    }

    // Création d'un nouveau contexte
    const now = Date.now();
    const createdAt = new Date();

    // Attendre un petit délai pour assurer une différence entre les dates
    await new Promise((resolve) => setTimeout(resolve, 10));

    const updatedAt = new Date();

    const enriched: ContextCluster = {
      id: `ctx-${now}`,
      type: 'user-input',
      primaryShard: {
        id: `shard-${now}`,
        type: 'primary',
        content: input,
        timestamp: now,
        complexityMetric: this.calculateComplexity(input),
        innovationPotential: this.assessInnovation(input),
        metadata: {
          createdAt,
          updatedAt,
          version: '1.0',
        },
        relatedClusters: [],
        data: { source: 'user-input' },
        parentContextId: `ctx-${now}`,
      },
      vectors: [
        {
          embedding: [], // Vecteur vide par défaut
          metadata: { source: 'user-input' },
          content: input,
        },
      ],
      data: { source: 'context-manager' },
      content: input,
      relatedClusters: [],
      timestamp: now,
      complexityMetric: this.calculateComplexity(input),
      innovationPotential: this.assessInnovation(input),
      metadata: {
        createdAt,
        updatedAt,
        version: '1.0',
      },
      shards: [],
    };

    // Mise à jour du cache
    const cache = this.liveContextCache.get();
    this.liveContextCache.set({
      ...cache,
      [enriched.id]: enriched,
    });

    return enriched;
  }

  analyzeContext(text: string): { complexity: number; innovation: number } {
    return {
      complexity: this.calculateComplexity(text),
      innovation: this.assessInnovation(text),
    };
  }

  calculateComplexity(text: string): number {
    // Protection contre les entrées vides ou invalides
    if (!text || typeof text !== 'string') {
      return 0.1;
    }

    // Analyse basique
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    if (wordCount === 0) {
      return 0.1;
    }

    const uniqueWords = new Set(text.toLowerCase().match(/\b\w+\b/g) || []);

    // Métriques avancées
    const avgWordLength = text.length / wordCount;
    const sentenceCount = Math.max(1, (text.match(/[.!?]+/g) || []).length);
    const avgSentenceLength = wordCount / sentenceCount;

    // Calcul de densité lexicale (ratio mots uniques / mots totaux)
    const lexicalDensity = uniqueWords.size / wordCount;

    // Détection de termes techniques ou spécialisés
    const technicalTerms = [
      'algorithme',
      'intelligence artificielle',
      'api',
      'architecture',
      'async',
      'function',
      'component',
      'database',
      'framework',
      'implementation',
      'interface',
      'library',
      'method',
      'module',
      'object',
      'pattern',
      'protocol',
      'reference',
      'service',
      'system',
      'transformer',
      'variable',
      'vector',
    ];

    const technicalTermCount = technicalTerms.reduce((count, term) => {
      return count + (text.toLowerCase().includes(term) ? 1 : 0);
    }, 0);

    const technicalScore = Math.min(technicalTermCount * 0.05, 0.3);

    // Prise en compte de la structure (plus de poids pour les phrases longues et complexes)
    const structureComplexity = Math.min(avgSentenceLength / 15, 1) * 0.3;

    // Prise en compte de la diversité lexicale
    const diversityScore = Math.min(lexicalDensity * 2, 1) * 0.3;

    // Prise en compte de la longueur moyenne des mots
    const wordLengthScore = Math.min(avgWordLength / 6, 1) * 0.1;

    // Calcul final avec normalisation
    const baseScore = structureComplexity + diversityScore + wordLengthScore + technicalScore;

    // Bonus pour les textes très longs
    const lengthFactor = Math.min(1, wordCount / 500); // Atteint 1 à 500 mots
    const lengthBonus = lengthFactor * 0.2; // Max 0.2 bonus

    return Math.min(Math.max(baseScore + lengthBonus, 0.1), 1);
  }

  assessInnovation(text: string): number {
    // Protection contre les entrées vides ou invalides
    if (!text || typeof text !== 'string') {
      return 0.1;
    }

    // Normalisation du texte pour l'analyse
    const normalizedText = text.toLowerCase();

    // Catégories de termes innovants avec des poids différents
    const innovationCategories = {
      // Technologies émergentes (poids élevé)
      emerging: {
        terms: [
          'intelligence artificielle',
          'ia générative',
          'llm',
          'large language model',
          'blockchain',
          'web3',
          'métavers',
          'réalité augmentée',
          'réalité virtuelle',
          'quantique',
          'edge computing',
          'iot',
          'internet des objets',
          'transformers',
          'multimodal',
          'zero-shot',
          'few-shot',
        ],
        weight: 0.4,
      },

      // Termes d'innovation générale (poids moyen)
      innovation: {
        terms: [
          'innovant',
          'révolution',
          'disruptif',
          'nouveauté',
          'créatif',
          'pionnier',
          'avant-garde',
          'percée',
          'paradigme',
          'breakthrough',
          'futuriste',
          'transformateur',
          'visionnaire',
          'émergent',
          'novateur',
        ],
        weight: 0.25,
      },

      // Termes techniques (poids modéré)
      technical: {
        terms: [
          'architecture',
          'algorithme',
          'optimisation',
          'framework',
          'infrastructure',
          'scalable',
          'distribuée',
          'cloud',
          'serverless',
          'microservices',
          'vectorisation',
          'parallelisation',
          'concurrent',
          'asynchrone',
        ],
        weight: 0.15,
      },

      // Domaines d'application (poids faible)
      domains: {
        terms: [
          'santé',
          'finance',
          'éducation',
          'transport',
          'énergie',
          'durable',
          'écologique',
          'vert',
          'social',
          'humanitaire',
        ],
        weight: 0.1,
      },
    };

    // Analyse par catégorie
    let totalScore = 0.1; // Score de base
    let totalMatches = 0;

    Object.entries(innovationCategories).forEach(([_, category]) => {
      // Compter les occurrences pour cette catégorie
      const categoryMatches = category.terms.filter((term) => normalizedText.includes(term));

      // Ajouter au score en fonction du poids de la catégorie
      totalScore += categoryMatches.length * category.weight;
      totalMatches += categoryMatches.length;
    });

    // Facteurs de bonus

    // 1. Bonus pour combinaisons pertinentes (ex: IA + domaine spécifique)
    if (normalizedText.includes('intelligence artificielle') || normalizedText.includes('ia')) {
      for (const term of innovationCategories.domains.terms) {
        if (normalizedText.includes(term)) {
          totalScore += 0.15; // Bonus pour IA appliquée à un domaine
          break;
        }
      }
    }

    // 2. Bonus pour la densité d'innovation (ratio termes innovants / longueur)
    const wordCount = normalizedText.split(/\s+/).filter(Boolean).length;

    if (wordCount > 0) {
      const innovationDensity = totalMatches / wordCount;

      // Bonus si densité élevée, mais pas trop (pour éviter le keyword stuffing)
      if (innovationDensity > 0.1 && innovationDensity < 0.4) {
        totalScore += innovationDensity * 0.5;
      }
    }

    // 3. Bonus pour longueur significative (contenu substantiel)
    const lengthFactor = Math.min(1, wordCount / 100); // Atteint 1 à 100 mots
    totalScore += lengthFactor * 0.1;

    // Garantir que le score est entre 0.1 et 1
    return Math.min(Math.max(totalScore, 0.1), 1);
  }

  async consolidateResults(results: any[]): Promise<void> {
    // Filtrer uniquement les résultats réussis
    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map((result) => result.value);

    await this.contextVectorDB.updateVectors(successfulResults);
  }

  async init(): Promise<void> {
    await this.contextVectorDB.init();
  }

  async upsertContext(id: string, vector: number[], metadata: ContextCluster): Promise<void> {
    await this.contextVectorDB.upsertVector(id, vector, metadata);
  }

  async findRelevantContext(vector: number[], topK = 5): Promise<ContextCluster[]> {
    return await this.contextVectorDB.findRelevant(vector, topK);
  }

  async deleteContext(id: string): Promise<void> {
    await this.contextVectorDB.deleteVector(id);
  }

  async updateContexts(results: any[]): Promise<void> {
    await this.contextVectorDB.updateVectors(results);
  }
}
