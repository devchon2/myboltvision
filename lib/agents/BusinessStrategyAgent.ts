import type { ContextShard } from '../../types/context.js';
import type { Agent, AgentResult } from '../../types/agent.js';

export class BusinessStrategyAgent implements Agent {
  id = 'business-strategy-agent';
  name = "Agent de Stratégie Business";
  description = "Analyse financière et stratégie d'entreprise";
  capabilities = ['financial-analysis', 'business-strategy', 'market-research', 'competition-analysis'];

  async execute(input: string, context?: ContextShard): Promise<AgentResult> {
    // Validation renforcée des entrées
    if (typeof input !== 'string' || !input.trim()) {
      throw new Error("Erreur de validation: L'entrée doit être une chaîne non vide");
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
      case 'market-research':
        content = await this.conductMarketResearch(input);
        break;
      case 'competition-analysis':
        content = await this.analyzeCompetition(input);
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
    if (/^\[FINANCIAL\]/i.test(input)) {
      return 'financial-analysis';
    }

    if (/^\[STRATEGY\]/i.test(input)) {
      return 'strategic-planning';
    }

    if (/^\[MARKET\]/i.test(input)) {
      return 'market-analysis';
    }

    if (/^\[COMPETITION\]/i.test(input)) {
      return 'competition-analysis';
    }

    // Analyse sémantique
    if (/analyse|financiere|financial|evaluation|couts|benefices|profitabilite/i.test(lowerInput)) {
      return 'financial-projection';
    }

    if (/strategie|business|developpement|croissance|expansion|planification/i.test(lowerInput)) {
      return 'strategic-planning';
    }

    if (/marche|research|etude|segment|tendances|taille/i.test(lowerInput)) {
      return 'market-analysis';
    }

    if (/concurrence|concurrent|concurrentiel|competiteur|competition/i.test(lowerInput)) {
      return 'competition-analysis';
    }

    // Ajout de la détection des tendances du marché
    if (/tendances|trends|market trends|market trend analysis/i.test(lowerInput)) {
      return 'market-trends';
    }

    if (/innovation|innovation assessment|innovation evaluation/i.test(lowerInput)) {
      return 'innovation-assessment';
    }

    return 'generic';
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

  private async conductMarketResearch(input: string): Promise<string> {
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
}
