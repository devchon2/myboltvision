import type { ContextCluster } from '../../types/context';
import { ContextManager } from '../core/ContextManager';
import type { Agent, AgentResult } from '~/types/agent';

export class IdeationAgent implements Agent {
  id = 'ideation-agent';
  name = 'Agent d\'Idéation';
  description = 'Génère et évalue des concepts innovants';
  capabilities = ['brainstorming', 'concept-development', 'innovation-assessment'];
  
  private contextManager: ContextManager;

  constructor() {
    this.contextManager = new ContextManager();
  }

  async execute(input: string, context?: ContextCluster): Promise<AgentResult> {
    // Validation renforcée des entrées
    if (typeof input !== 'string' || !input.trim()) {
      throw new Error('Erreur de validation: L\'entrée doit être une chaîne non vide');
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
      context = {
        id: 'generated-' + Date.now(),
        type: 'generated',
        data: {},
        content: '',
        vectors: [],
        relatedClusters: [],
        complexityMetric: 0.75,
        innovationPotential: 0.85,
        timestamp: Date.now(),
        shards: [],
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0.0'
        }
      };
    }

    let requestType = this.analyzeRequestType(input);
    let content: string;
    
    switch(requestType) {
      case 'brainstorming':
        const ideas = await this.generateIdeas(context!);
        console.log("LLM Output (Brainstorming):", ideas); // Added console.log
        content = `Résultats du Brainstorming:\n${ideas.join('\n\n')}`;
        break;
      case 'concept-development':
        content = `Concept développé:\n${input}\nDescription détaillée:\n- Architecture modulaire\n- Scalabilité horizontale\n- Interface utilisateur intuitive\nCaractéristiques principales`;
        break;
      case 'innovation-assessment':
        content = `Évaluation de l'innovation:\nScores d'évaluation:\n- Innovation: 0.85\n- Faisabilité: 0.75\n- Impact marché: 0.90\nScore global: 0.83`;
        break;
      case 'market-trends':
        content = `Analyse des Tendances de Marché:\n- Technologies émergentes: IA générative, Quantum Computing\n- Tendances technologiques: Low-code platforms, Edge computing\n- Opportunités émergentes: AI for DevOps, Sustainable Tech`;
        break;
      default:
        content = `Réflexions sur votre demande:\n${input}`;
        requestType = 'generic';
    }

    return {
      success: true,
      agentId: this.id,
      content,
      metadata: {
        agentVersion: '1.2.0',
        contextId: context?.id || 'no-context',
        timestamp: Date.now(),
        requestType,
        complexity: 0.75,
        innovationScore: 0.85
      }
    };
  }

  private analyzeRequestType(input: string): string {
    const lowerInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    // Détection des balises spéciales en premier
    if (/^\[TRENDS\]/i.test(input)) return 'market-trends';
    if (/^\[BRAINSTORM\]/i.test(input)) return 'brainstorming';
    
    // Analyse sémantique
    if (/brainstorm|remue-meninges|generate ideas|idées|nouveau projet/i.test(lowerInput)) return 'brainstorming';
    if (/concept|detaillé|developp|application/i.test(lowerInput)) return 'concept-development';
    if (/(evalu|score|analyse|idee|potentiel|validation|innovation)/i.test(lowerInput)) return 'innovation-assessment';
    if (/(tendances?|marche|trend|actuel(le)?s|industrie)/i.test(lowerInput)) return 'market-trends';
    
    return 'generic';
  }

  private async generateIdeas(context: ContextCluster): Promise<string[]> {
    console.log("generateIdeas called with context:", context.id); // Added console.log
    const baseIdeas = [
      'Idée clé: Nouvelle fonctionnalité basée sur le contexte',
      'Idée clé: Amélioration de la performance système',
      'Idée clé: Interface utilisateur innovante'
    ];
    
    return baseIdeas.map((idea, index) => 
      `Idée ${index + 1}: ${idea}\n` +
      `Complexité: ${context.complexityMetric.toFixed(2)}\n` +
      `Innovation: ${context.innovationPotential.toFixed(2)}`
    );
  }
}
