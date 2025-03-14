import type { ContextCluster } from '../../types/types/context.js';
import { ContextManager } from '../core/ContextManager.js';
import type { Agent, AgentResult } from '../../types/agent.d.ts';

export class BusinessStrategyAgent implements Agent {
  id = 'business-strategy-agent';
  name = "Agent de Stratégie Business";
  description = "Analyse financière et stratégie d'entreprise";
  capabilities = ['market-analysis', 'financial-projection', 'strategic-planning', 'competition-analysis'];

  private contextManager: ContextManager;

  constructor() {
    this.contextManager = new ContextManager();
  }

  async execute(input: string, context?: ContextCluster): Promise<AgentResult> {
    // Validation renforcée des entrées
    if (typeof input !== 'string' || !input.trim()) {
      throw new Error("Erreur de validation: L'entrée doit être une chaîne non vide");
    }

    // Validation stricte du contexte
    if (context) {
      if (typeof context !== 'object' || Array.isArray(context)) {
        throw new Error('Erreur de validation: Le contexte doit être un objet');
      }

      // Vérification complète des propriétés requises
      if (!context.id || typeof context.id !== 'string') {
        throw new Error('Erreur de validation: Le contexte doit avoir un id valide');
      }

      if (!Array.isArray(context.vectors)) {
        context.vectors = [];
      }

      if (typeof context.timestamp !== 'number') {
        throw new Error('Erreur de validation: Le contexte doit avoir un timestamp numérique');
      }
    } else {
      const now = Date.now();
      const createdAt = new Date();
      const updatedAt = new Date();
      
      context = {
        id: 'generated-' + now,
        type: 'generated',
        primaryShard: {
          id: `shard-${now}`,
          type: 'primary',
          content: input,
          timestamp: now,
          complexityMetric: 0.75,
          innovationPotential: 0.85,
          metadata: {
            createdAt,
            updatedAt,
            version: '1.0',
          },
          relatedClusters: [],
          data: { source: 'business-strategy-agent' },
          parentContextId: `ctx-${now}`,
        },
        data: {},
        content: '',
        vectors: [],
        relatedClusters: [],
        complexityMetric: 0.75,
        innovationPotential: 0.85,
        timestamp: now,
        shards: [],
        metadata: {
          createdAt,
          updatedAt,
          version: '1.0.0',
        },
      };
    }

    let requestType = this.analyzeRequestType(input);
    let content: string;

    switch (requestType) {
      case 'market-analysis':
        content = await this.generateMarketAnalysis(input, context!);
        break;
      case 'financial-projection':
        content = await this.generateFinancialProjections(input, context!);
        break;
      case 'strategic-planning':
        content = await this.createStrategicPlan(input, context!);
        break;
      case 'competition-analysis':
        content = await this.analyzeCompetition(input, context!);
        break;
      default:
        content = `Analyse de votre demande:\n${input}\n\nL'Agent de Stratégie Business peut vous aider avec l'analyse de marché, les projections financières, la planification stratégique ou l'analyse de la concurrence.`;
        requestType = 'generic';
    }

    return {
      success: true,
      agentId: this.id,
      content,
      metadata: {
        agentVersion: '1.0.0',
        contextId: context?.id || 'no-context',
        timestamp: Date.now(),
        requestType,
        complexity: context?.complexityMetric || 0.75,
        innovationScore: context?.innovationPotential || 0.85,
      },
    };
  }

  private analyzeRequestType(input: string): string {
    const lowerInput = input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Détection des balises spéciales en premier
    if (/^\[MARKET\]/i.test(input)) {
      return 'market-analysis';
    }

    if (/^\[FINANCE\]/i.test(input)) {
      return 'financial-projection';
    }

    if (/^\[STRATEGY\]/i.test(input)) {
      return 'strategic-planning';
    }

    if (/^\[COMPETITION\]/i.test(input)) {
      return 'competition-analysis';
    }

    // Analyse sémantique - vérifier d'abord pour "analyse des concurrents"
    if (/analyse.{1,5}(des)?.{1,5}concurrent|comp[ée]ti|rival|benchmark|avantage.{1,10}concurrentiel|concurrents sur|rivalité|qui sont.{1,10}concurrent|principaux concurrents/i.test(lowerInput)) {
      return 'competition-analysis';
    }
    
    if (/march[ée]|segment|tendance|analyse.{1,10}march[ée]|client|utilisateur|audience/i.test(lowerInput)) {
      return 'market-analysis';
    }

    if (/financ|projection|revenu|budget|profit|investissement|cout|rentabilité/i.test(lowerInput)) {
      return 'financial-projection';
    }

    if (/strat[ée]g|plan|roadmap|vision|mission|objectif|long.{1,5}terme/i.test(lowerInput)) {
      return 'strategic-planning';
    }

    return 'generic';
  }

  private async generateMarketAnalysis(input: string, context: ContextCluster): Promise<string> {
    // Simuler l'analyse de marché
    const marketSegments = [
      {
        name: 'Entreprises (B2B)',
        size: '42 milliards €',
        growth: '+7.5% par an',
        trends: [
          'Adoption croissante des solutions SaaS',
          'Demande de sécurité renforcée',
          'Intégration de l\'IA dans les processus métier',
        ],
        opportunities: 'Forte demande pour des solutions d\'automatisation et d\'IA agentique',
      },
      {
        name: 'Consommateurs (B2C)',
        size: '18 milliards €',
        growth: '+12.3% par an',
        trends: [
          'Interfaces conversationnelles',
          'Applications mobiles intelligentes',
          'Personnalisation avancée',
        ],
        opportunities: 'Marché en expansion pour les assistants personnels augmentés',
      },
      {
        name: 'Secteur public',
        size: '15 milliards €',
        growth: '+4.2% par an',
        trends: [
          'Modernisation des infrastructures',
          'Initiatives de villes intelligentes',
          'Services numériques aux citoyens',
        ],
        opportunities: 'Potentiel dans l\'automatisation des services publics',
      },
    ];

    let analysis = `# Analyse de marché\n\n`;
    analysis += `Analyse basée sur: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n`;

    analysis += `## Segments de marché clés\n\n`;
    
    marketSegments.forEach(segment => {
      analysis += `### ${segment.name}\n`;
      analysis += `- **Taille du marché:** ${segment.size}\n`;
      analysis += `- **Croissance annuelle:** ${segment.growth}\n`;
      analysis += `- **Tendances principales:**\n`;
      
      segment.trends.forEach(trend => {
        analysis += `  - ${trend}\n`;
      });
      
      analysis += `- **Opportunités:** ${segment.opportunities}\n\n`;
    });
    
    analysis += `## Facteurs de marché importants\n\n`;
    analysis += `1. **Dynamique concurrentielle:** Marché en consolidation avec émergence de nouveaux acteurs innovants\n`;
    analysis += `2. **Barrières à l'entrée:** Modérées, principalement liées à l'expertise technique et à la propriété intellectuelle\n`;
    analysis += `3. **Cycle de vie du produit:** Phase de croissance précoce pour les solutions d'IA agentique\n`;
    analysis += `4. **Environnement réglementaire:** Évolution rapide avec focus sur la protection des données et l'éthique de l'IA\n\n`;

    analysis += `## Recommandations stratégiques\n\n`;
    analysis += `- Concentrer les efforts sur le segment B2B avec une approche verticale par industrie\n`;
    analysis += `- Développer des cas d'usage démontrant clairement le ROI\n`;
    analysis += `- Établir des partenariats stratégiques pour accélérer l'adoption\n`;
    analysis += `- Investir dans la conformité réglementaire comme avantage concurrentiel\n`;

    return analysis;
  }

  private async generateFinancialProjections(input: string, context: ContextCluster): Promise<string> {
    // Simuler la génération de projections financières
    const financialYears = [
      {
        year: 2025,
        revenue: '2.4M €',
        costs: '2.1M €',
        profit: '0.3M €',
        margin: '12.5%',
        cashflow: '0.5M €',
        investments: '1.2M €',
      },
      {
        year: 2026,
        revenue: '5.8M €',
        costs: '4.2M €',
        profit: '1.6M €',
        margin: '27.6%',
        cashflow: '1.9M €',
        investments: '2.5M €',
      },
      {
        year: 2027,
        revenue: '12.5M €',
        costs: '7.8M €',
        profit: '4.7M €',
        margin: '37.6%',
        cashflow: '5.2M €',
        investments: '3.8M €',
      },
    ];

    const revenueStreams = [
      { name: 'Licences Entreprise', percentage: '45%' },
      { name: 'Services Professionnels', percentage: '30%' },
      { name: 'Abonnements SaaS', percentage: '20%' },
      { name: 'Autres', percentage: '5%' },
    ];

    let projection = `# Projections Financières\n\n`;
    projection += `Projections basées sur: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n`;

    projection += `## Prévisions financières sur 3 ans\n\n`;
    projection += `| Année | Revenus | Coûts | Profit | Marge | Flux de trésorerie | Investissements |\n`;
    projection += `|-------|---------|-------|--------|-------|-------------------|----------------|\n`;
    
    financialYears.forEach(year => {
      projection += `| ${year.year} | ${year.revenue} | ${year.costs} | ${year.profit} | ${year.margin} | ${year.cashflow} | ${year.investments} |\n`;
    });
    
    projection += `\n## Sources de revenus\n\n`;
    
    revenueStreams.forEach(stream => {
      projection += `- **${stream.name}:** ${stream.percentage}\n`;
    });
    
    projection += `\n## Hypothèses clés\n\n`;
    projection += `- Croissance annuelle du marché: 15%\n`;
    projection += `- Taux d'acquisition client: 25% en année 1, 40% en année 2, 60% en année 3\n`;
    projection += `- Taux de rétention client: 85% en année 1, 90% en années 2 et 3\n`;
    projection += `- Dépenses marketing: 25% du revenu\n`;
    projection += `- Coûts R&D: 30% du revenu\n\n`;

    projection += `## Indicateurs financiers importants\n\n`;
    projection += `- **Point d'équilibre:** Milieu de l'année 2025\n`;
    projection += `- **ROI projeté:** 215% sur 3 ans\n`;
    projection += `- **Valeur d'entreprise estimée (fin 2027):** 85-95M €\n`;
    projection += `- **Besoin en financement:** 3.5M € pour atteindre les objectifs sur 3 ans\n`;

    return projection;
  }

  private async createStrategicPlan(input: string, context: ContextCluster): Promise<string> {
    // Simuler la création d'un plan stratégique
    const strategicPhases = [
      {
        phase: 'Phase 1: Établissement (6-12 mois)',
        objectives: [
          'Développer et valider la technologie d\'agents fondamentaux',
          'Établir des partenariats stratégiques initiaux',
          'Acquisition des premiers clients de référence',
        ],
        kpis: [
          'MVP fonctionnel avec 3 agents spécialisés',
          '5 clients pilotes actifs',
          'Temps moyen d\'intégration < 2 semaines',
        ],
      },
      {
        phase: 'Phase 2: Expansion (12-24 mois)',
        objectives: [
          'Développer une offre produit complète',
          'Établir une présence internationale',
          'Construire un écosystème de partenaires',
        ],
        kpis: [
          'Croissance MRR > 15% mensuel',
          'NPS > 50',
          'Équipe de 50+ personnes',
        ],
      },
      {
        phase: 'Phase 3: Domination (24-36 mois)',
        objectives: [
          'Position de leader sur le marché',
          'Acquisition de technologies complémentaires',
          'Préparation à une éventuelle introduction en bourse',
        ],
        kpis: [
          'Part de marché > 20%',
          'Marge brute > 75%',
          'Taux de croissance annuel > 100%',
        ],
      },
    ];

    let plan = `# Plan Stratégique\n\n`;
    plan += `Plan basé sur: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n`;

    plan += `## Vision\n\n`;
    plan += `Devenir le leader mondial des plateformes d'agents IA, en révolutionnant la manière dont les entreprises interagissent avec la technologie et automatisent leurs processus métier critiques.\n\n`;
    
    plan += `## Mission\n\n`;
    plan += `Développer une plateforme d'agents IA hautement adaptables et interopérables qui permettent aux entreprises d'augmenter significativement leur productivité, d'améliorer leurs prises de décisions, et de créer de nouvelles opportunités de croissance.\n\n`;
    
    plan += `## Objectifs stratégiques à 3 ans\n\n`;
    plan += `1. Atteindre 15M€ de revenus récurrents annuels\n`;
    plan += `2. Établir une présence dans 3 continents\n`;
    plan += `3. Développer un écosystème de 100+ partenaires intégrateurs\n`;
    plan += `4. Atteindre une valorisation de 100M€\n\n`;
    
    plan += `## Feuille de route stratégique\n\n`;
    
    strategicPhases.forEach(phase => {
      plan += `### ${phase.phase}\n\n`;
      plan += `**Objectifs:**\n`;
      
      phase.objectives.forEach(objective => {
        plan += `- ${objective}\n`;
      });
      
      plan += `\n**KPIs:**\n`;
      
      phase.kpis.forEach(kpi => {
        plan += `- ${kpi}\n`;
      });
      
      plan += `\n`;
    });
    
    plan += `## Avantages concurrentiels\n\n`;
    plan += `1. **Technologie propriétaire:** Moteur d'orchestration d'agents et résolution de conflits\n`;
    plan += `2. **Expertise verticale:** Connaissance approfondie des secteurs finance, santé et industrie\n`;
    plan += `3. **Écosystème d'innovation:** Programme de partenaires et marketplace d'agents\n`;
    plan += `4. **Excellence opérationnelle:** Méthodologie éprouvée de déploiement et support\n\n`;

    plan += `## Risques et mitigations\n\n`;
    plan += `| Risque | Probabilité | Impact | Stratégie de mitigation |\n`;
    plan += `|--------|-------------|--------|-------------------------|\n`;
    plan += `| Évolution réglementaire | Élevée | Moyen | Conformité proactive et participation aux initiatives sectorielles |\n`;
    plan += `| Concurrence des géants tech | Moyenne | Élevé | Différenciation par spécialisation et agilité |\n`;
    plan += `| Difficultés de recrutement | Élevée | Élevé | Programme de formation interne et partenariats académiques |\n`;
    plan += `| Adoption technologique lente | Moyenne | Élevé | Accompagnement client renforcé et méthodologie de change management |\n`;

    return plan;
  }

  private async analyzeCompetition(input: string, context: ContextCluster): Promise<string> {
    // Simuler l'analyse de la concurrence
    const competitors = [
      {
        name: 'AgentForge',
        type: 'Startup spécialisée',
        fundingStage: 'Série B (45M$)',
        strengths: [
          'Technologie d\'agents avancée',
          'Équipe technique solide',
          'Croissance rapide (+200% sur 12 mois)',
        ],
        weaknesses: [
          'Présence limitée en Europe',
          'Manque d\'expertise sectorielle',
          'Produit encore en maturation',
        ],
        marketShare: '12%',
        threat: 'Élevée',
      },
      {
        name: 'TechGiant AI',
        type: 'Grande entreprise tech',
        fundingStage: 'Cotée en bourse (Cap. 1.2T$)',
        strengths: [
          'Ressources financières importantes',
          'Base clients massive',
          'Infrastructure cloud robuste',
        ],
        weaknesses: [
          'Offre généraliste, moins spécialisée',
          'Innovation plus lente',
          'Conflit potentiel avec d\'autres produits internes',
        ],
        marketShare: '35%',
        threat: 'Moyenne',
      },
      {
        name: 'AgileAgents',
        type: 'Startup émergente',
        fundingStage: 'Amorçage (3.5M$)',
        strengths: [
          'Approche très innovante',
          'Agilité et rapidité d\'exécution',
          'Expertise verticale en finance',
        ],
        weaknesses: [
          'Manque d\'échelle',
          'Ressources limitées',
          'Produit encore jeune',
        ],
        marketShare: '5%',
        threat: 'Faible à Moyenne (croissante)',
      },
    ];

    let analysis = `# Analyse de la Concurrence\n\n`;
    analysis += `Analyse basée sur: "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}"\n\n`;

    analysis += `## Paysage concurrentiel\n\n`;
    analysis += `Le marché des plateformes d'agents IA est en pleine expansion avec trois catégories d'acteurs: les startups spécialisées, les grands acteurs technologiques qui étendent leurs offres, et les nouveaux entrants innovants. La fragmentation actuelle du marché laisse place à des opportunités de différenciation et de positionnement stratégique.\n\n`;
    
    analysis += `## Analyse des concurrents principaux\n\n`;
    
    competitors.forEach(competitor => {
      analysis += `### ${competitor.name}\n`;
      analysis += `**Type:** ${competitor.type}\n`;
      analysis += `**Financement:** ${competitor.fundingStage}\n`;
      analysis += `**Forces:**\n`;
      
      competitor.strengths.forEach(strength => {
        analysis += `- ${strength}\n`;
      });
      
      analysis += `**Faiblesses:**\n`;
      
      competitor.weaknesses.forEach(weakness => {
        analysis += `- ${weakness}\n`;
      });
      
      analysis += `**Part de marché estimée:** ${competitor.marketShare}\n`;
      analysis += `**Niveau de menace:** ${competitor.threat}\n\n`;
    });
    
    analysis += `## Cartographie stratégique\n\n`;
    analysis += `La concurrence se positionne principalement sur deux axes :\n`;
    analysis += `1. **Axe Technologique:** De solutions génériques à spécialisées/verticales\n`;
    analysis += `2. **Axe Métier:** De l'automatisation simple à l'intelligence décisionnelle\n\n`;
    
    analysis += `Notre position optimale se situe dans le quadrant supérieur droit: technologie spécialisée avec haute valeur ajoutée métier.\n\n`;

    analysis += `## Opportunités de différenciation\n\n`;
    analysis += `1. **Spécialisation verticale:** Focus sur des secteurs sous-servis par les acteurs généralistes\n`;
    analysis += `2. **Orchestration inter-agents:** Capacités avancées de coordination entre agents spécialisés\n`;
    analysis += `3. **Intégration profonde:** Connecteurs natifs avec les systèmes métier existants\n`;
    analysis += `4. **Conformité et gouvernance:** Fonctionnalités avancées adaptées aux industries régulées\n\n`;

    analysis += `## Stratégie recommandée face à la concurrence\n\n`;
    analysis += `- Adopter une stratégie de "fast-follower" sur les innovations technologiques de base\n`;
    analysis += `- Concentrer les efforts d'innovation sur les cas d'usage verticaux à haute valeur ajoutée\n`;
    analysis += `- Établir des barrières à l'entrée via des partenariats stratégiques exclusifs\n`;
    analysis += `- Développer un positionnement marketing distinctif axé sur la transformation métier plutôt que sur la technologie seule\n`;

    return analysis;
  }
}
