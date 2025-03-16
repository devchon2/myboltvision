import type { ContextShard } from '../../types/context.js';
import type { Agent, AgentResult } from '../../types/agent.js';

export class BusinessStrategyAgent implements Agent {
  id = 'business-strategy-agent';
  name = "Agent de Stratégie Business";
  description = "Analyse financière et stratégie d'entreprise";
  capabilities = ['financial-analysis', 'business-strategy', 'market-analysis', 'competition-analysis'];

  async execute(input: string, context?: ContextShard): Promise<AgentResult> {
    // Validation renforcée des entrées
    if (!input || typeof input !== 'string' || !input.trim()) {
      return Promise.reject(new Error("Erreur de validation: L'entrée doit être une chaîne non vide"));
    }

    if (context && (!context.id || typeof context.timestamp !== 'number')) {
      return Promise.reject(new Error("Erreur de validation: Contexte invalide"));
    }

    let requestType = this.analyzeRequestType(input);
    let content: string;

    // Gestion du contexte manquant
    const createContext = (): ContextShard => ({
      id: 'generated-' + Date.now(),
      type: 'generated',
      data: {},
      content: input,
      relatedClusters: [],
      timestamp: Date.now(),
      complexityMetric: 0.75,
      innovationPotential: 0.85,
      parentContextId: 'auto-generated',
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
      },
    });

    const finalContext = context || createContext();

    switch (requestType) {
      case 'financial-analysis':
        content = await this.performFinancialAnalysis(input);
        break;
      case 'business-strategy':
        content = await this.developBusinessStrategy(input);
        break;
      case 'market-analysis':
      case 'market-trends':
        content = await this.conductMarketAnalysis(input);
        break;
      case 'competition-analysis':
        content = await this.analyzeCompetition(input);
        break;
      case 'brainstorming':
        content = await this.generateBrainstorming(input);
        break;
      case 'innovation-assessment':
        content = await this.assessInnovation(input);
        break;
      case 'concept-development':
        content = await this.developConcept(input);
        break;
      default:
        content = `Analyse de votre demande:\n${input}\n\nL'Agent de Stratégie Business peut vous aider à réaliser des analyses financières, développer des stratégies d'entreprise ou mener des recherches de marché.`;
        requestType = 'generic';
    }

    return {
      success: true,
      agentId: this.id,
      content,
      metadata: {
        agentVersion: '1.0.0',
        contextId: finalContext.id,
        timestamp: Date.now(),
        requestType,
        complexity: finalContext.complexityMetric || 0.75,
        innovationScore: finalContext.innovationPotential || 0.85,
      },
    };
  }

  private analyzeRequestType(input: string): string {
    const lowerInput = input
      .normalize('NFD')
      .replace(/[-]/g, '')
      .toLowerCase();

    // Détection des balises spéciales en premier
    const tagPatterns = [
      { pattern: /^\[FINANCIAL\]/i, type: 'financial-analysis' },
      { pattern: /^\[FINANCE\]/i, type: 'financial-analysis' },
      { pattern: /^\[STRATEGY\]/i, type: 'strategic-planning' },
      { pattern: /^\[PLAN\]/i, type: 'strategic-planning' },
      { pattern: /^\[MARKET\]/i, type: 'market-analysis' },
      { pattern: /^\[COMPETITION\]/i, type: 'competition-analysis' },
      { pattern: /^\[BRAINSTORM\]/i, type: 'brainstorming' },
      { pattern: /^\[INNOVATION\]/i, type: 'innovation-assessment' },
      { pattern: /^\[CONCEPT\]/i, type: 'concept-development' },
      { pattern: /^\[TRENDS\]/i, type: 'market-trends' },
      { pattern: /^\[PROJECTION\]/i, type: 'financial-projection' }
    ];

    for (const { pattern, type } of tagPatterns) {
      if (pattern.test(input)) {
        return type;
      }
    }

    // Détection des types de requêtes spécifiques
    const requestPatterns = [
      {
        patterns: [
          /tendances|trends|market trends|market trend analysis/i,
          /analyse des tendances du marché/i,
          /Analyse du marché/i
        ],
        type: 'market-trends'
      },
      {
        patterns: [
          /brainstorming|brainstorm|nouvelle application|idée nouvelle|nouveau concept/i,
          /\[BRAINSTORM\]/i
        ],
        type: 'brainstorming'
      },
      {
        patterns: [
          /évaluer (cette |une )?idée innovante/i,
          /potentiel d'innovation/i,
          /évaluer (une |la )?innovation/i,
          /innovation assessment|innovation evaluation/i,
          /analyse (de |d'|du )?potentiel innovant/i
        ],
        type: 'innovation-assessment'
      },
      {
        patterns: [
          /concept development|concept d'application|développer un concept|nouveau concept|idée d'application/i
        ],
        type: 'concept-development'
      },
      {
        patterns: [
          /concurrence|concurrent|concurrentiel|competiteur|competition/i
        ],
        type: 'competition-analysis'
      },
      {
        patterns: [
          /analyse|financiere|financial|evaluation|couts|benefices|profitabilite|projections financieres/i
        ],
        type: 'financial-analysis'
      },
      {
        patterns: [
          /strategie|business|developpement|croissance|expansion|planification/i
        ],
        type: 'strategic-planning'
      },
      {
        patterns: [
          /marche|research|etude|segment|taille|tendances du marche/i
        ],
        type: 'market-analysis'
      }
    ];

    for (const { patterns, type } of requestPatterns) {
      if (patterns.some(pattern => pattern.test(lowerInput))) {
        return type;
      }
    }

    return 'generic';
  }

  private validateOutputSchema(output: AgentResult): boolean {
    // Validate the output schema
    const requiredFields = ['success', 'agentId', 'content', 'metadata'];
    const metadataFields = ['agentVersion', 'contextId', 'timestamp', 'requestType', 'complexity', 'innovationScore'];

    // Check required fields
    const hasAllRequiredFields = requiredFields.every(field => field in output);
    if (!hasAllRequiredFields) return false;

    // Check metadata fields
    const hasAllMetadataFields = metadataFields.every(field => field in output.metadata);
    if (!hasAllMetadataFields) return false;

    // Additional validation based on request type
    switch (output.metadata.requestType) {
      case 'market-analysis':
      case 'market-trends':
        return output.content.includes('Analyse de marché');
      case 'brainstorming':
        return output.content.includes('Brainstorming');
      case 'innovation-assessment':
        return output.content.includes('Innovation');
      case 'concept-development':
        return output.content.includes('Concept');
      default:
        return true;
    }
  }

  private async performFinancialAnalysis(input: string): Promise<string> {
    // Simuler une analyse financière
    const analysisResults = {
      revenue: 1000000,
      expenses: 750000,
      profit: 250000,
      roi: 0.33,
    };

    return `Résultats de l'analyse financière pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n` +
      `Revenu: ${analysisResults.revenue} EUR\n` +
      `Dépenses: ${analysisResults.expenses} EUR\n` +
      `Profit: ${analysisResults.profit} EUR\n` +
      `ROI: ${(analysisResults.roi * 100).toFixed(2)}%\n\n` +
      `Recommandations:\n- Réduire les coûts opérationnels\n- Augmenter les investissements dans les segments à forte croissance\n- Optimiser la structure de financement`;
  }

  private async developBusinessStrategy(input: string): Promise<string> {
    // Simuler le développement d'une stratégie d'entreprise
    const strategy = {
      vision: "Devenir le leader du marché des solutions innovantes",
      mission: "Fournir des produits de haute qualité qui répondent aux besoins des clients",
      goals: [
        "Augmenter la part de marché de 10% en 2 ans",
        "Lancer 3 nouveaux produits par an",
        "Améliorer la satisfaction client de 20%",
      ],
      tactics: [
        "Investir dans la R&D",
        "Renforcer les partenariats stratégiques",
        "Optimiser les processus internes",
      ],
    };

    return `Stratégie d'entreprise pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n` +
      `Vision: ${strategy.vision}\n` +
      `Mission: ${strategy.mission}\n` +
      `Objectifs:\n- ${strategy.goals.join('\n- ')}\n\n` +
      `Tactiques:\n- ${strategy.tactics.join('\n- ')}\n\n` +
      `Recommandations:\n- Suivre régulièrement les indicateurs de performance\n- Adapter la stratégie en fonction des évolutions du marché\n- Impliquer toutes les parties prenantes dans le processus de planification`;
  }

  private async conductMarketAnalysis(input: string): Promise<string> {
    // Simuler une recherche de marché
    const marketData = {
      marketSize: 5000000,
      growthRate: 0.08,
      topCompetitors: [
        { name: "Competitor A", marketShare: 0.25 },
        { name: "Competitor B", marketShare: 0.20 },
        { name: "Competitor C", marketShare: 0.15 },
      ],
      keySegments: [
        { name: "Segment 1", size: 2000000 },
        { name: "Segment 2", size: 1500000 },
        { name: "Segment 3", size: 1500000 },
      ],
    };

    return `Résultats de la recherche de marché pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n` +
      `Taille du marché: ${marketData.marketSize} EUR\n` +
      `Taux de croissance: ${(marketData.growthRate * 100).toFixed(2)}%\n` +
      `Principaux concurrents:\n- ${marketData.topCompetitors.map(c => `${c.name} (Part de marché: ${(c.marketShare * 100).toFixed(2)}%)`).join('\n- ')}\n\n` +
      `Segments clés:\n- ${marketData.keySegments.map(s => `${s.name} (Taille: ${s.size} EUR)`).join('\n- ')}\n\n` +
      `Recommandations:\n- Cibler les segments à forte croissance\n- Surveiller les mouvements des principaux concurrents\n- Adapter les stratégies marketing en fonction des tendances du marché`;
  }

  private async analyzeCompetition(input: string): Promise<string> {
    // Simuler une analyse concurrentielle
    const competitiveAnalysis = {
      leadCompetitors: [
        { name: "Alpha Inc", strengths: ["Expérience", "Réseau"], weaknesses: ["Prix élevés", "Innovation lente"] },
        { name: "Beta Corp", strengths: ["Technologie avancée", "Innovation"], weaknesses: ["Faible part de marché", "Support client"] },
        { name: "Gamma LLC", strengths: ["Prix compétitifs", "Distribution"], weaknesses: ["Qualité moyenne", "Peu diversifié"] }
      ],
      competitiveLandscape: "Marché en croissance avec trois acteurs principaux occupant 65% des parts de marché",
      ourPosition: "Nouvel entrant avec une technologie disruptive mais faible notoriété"
    };

    return `Analyse de la Concurrence pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"
    \n
## Paysage concurrentiel
${competitiveAnalysis.competitiveLandscape}

## Analyse des concurrents principaux
${competitiveAnalysis.leadCompetitors.map(c =>
  `### ${c.name}\n- **Forces**: ${c.strengths.join(', ')}\n- **Faiblesses**: ${c.weaknesses.join(', ')}` 
).join('\n\n')}

## Notre positionnement
${competitiveAnalysis.ourPosition}

## Stratégie recommandée face à la concurrence
- Capitaliser sur notre avantage technologique
- Se positionner sur des segments délaissés par les leaders
- Développer notre notoriété par un marketing ciblé
- Offrir un support client différenciant
    `;
  }

  private async generateBrainstorming(input: string): Promise<string> {
    const ideas = [
      "Créer une plateforme de collaboration en temps réel",
      "Développer une solution de gestion de projet basée sur l'IA",
      "Intégrer des fonctionnalités de réalité augmentée",
      "Proposer des outils d'analyse prédictive",
      "Créer un écosystème de plugins extensibles"
    ];

    return `Session de brainstorming pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n` +
      `Idées générées:\n- ${ideas.join('\n- ')}\n\n` +
      `Recommandations:\n- Prioriser les idées en fonction de leur impact potentiel\n- Évaluer la faisabilité technique\n- Identifier les partenariats stratégiques`;
  }

  private async assessInnovation(input: string): Promise<string> {
    const assessment = {
      innovationScore: 8.5,
      strengths: ["Approche disruptive", "Potentiel de marché élevé", "Technologie de pointe"],
      weaknesses: ["Risque technologique", "Dépendance aux partenaires", "Coûts de R&D élevés"],
      recommendations: [
        "Protéger la propriété intellectuelle",
        "Développer un prototype fonctionnel",
        "Identifier des partenaires stratégiques"
      ]
    };

    return `Évaluation de l'innovation pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n` +
      `Score d'innovation: ${assessment.innovationScore}/10\n` +
      `Forces:\n- ${assessment.strengths.join('\n- ')}\n\n` +
      `Faiblesses:\n- ${assessment.weaknesses.join('\n- ')}\n\n` +
      `Recommandations:\n- ${assessment.recommendations.join('\n- ')}`;
  }

  private async developConcept(input: string): Promise<string> {
    const concept = {
      name: "Nouveau concept d'application",
      features: [
        "Interface utilisateur intuitive",
        "Intégration avec les principales plateformes",
        "Analyse de données en temps réel",
        "Personnalisation avancée",
        "Sécurité renforcée"
      ],
      roadmap: [
        "Phase 1: Définition du concept (1 mois)",
        "Phase 2: Développement du MVP (3 mois)", 
        "Phase 3: Tests utilisateurs (1 mois)",
        "Phase 4: Lancement initial (1 mois)"
      ]
    };

    return `Développement de concept pour: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n` +
      `Nom du concept: ${concept.name}\n` +
      `Fonctionnalités clés:\n- ${concept.features.join('\n- ')}\n\n` +
      `Feuille de route:\n- ${concept.roadmap.join('\n- ')}\n\n` +
      `Recommandations:\n- Valider le concept avec des utilisateurs cibles\n- Prototyper les fonctionnalités principales\n- Établir un plan de financement`;
  }
}
