import { AgentOrchestrator } from '../core/AgentOrchestrator';
import type { Workflow } from '../core/AgentOrchestrator';
import { IdeationAgent } from '../agents/IdeationAgent';

/**
 * Exemple d'utilisation de l'agent d'idéation avec l'orchestrateur d'agents
 * pour créer un workflow complet de génération d'idées et de concepts.
 */
export async function runIdeationWorkflow(initialInput: string) {
  console.log('Démarrage du workflow d\'idéation...');
  console.log(`Entrée initiale: "${initialInput}"`);
  console.log('-----------------------------------');
  
  // Créer et configurer l'orchestrateur
  const orchestrator = new AgentOrchestrator();
  
  // Enregistrer l'agent d'idéation
  const ideationAgent = new IdeationAgent();
  orchestrator.registerAgent(ideationAgent);
  
  // Définir un workflow d'idéation en plusieurs étapes
  const ideationWorkflow: Workflow = {
    id: 'ideation-workflow',
    name: 'Workflow d\'Idéation Complet',
    description: 'Un workflow qui guide l\'utilisateur de l\'idéation initiale à l\'évaluation du concept',
    steps: [
      {
        id: 'brainstorming',
        agentId: 'ideation-agent',
        input: `Générer des idées pour: ${initialInput}`,
        dependsOn: []
      },
      {
        id: 'concept-development',
        agentId: 'ideation-agent',
        input: `Développer un concept détaillé basé sur les idées suivantes: {{brainstorming}}`,
        dependsOn: ['brainstorming']
      },
      {
        id: 'market-analysis',
        agentId: 'ideation-agent',
        input: `Analyser les tendances du marché pertinentes pour le concept suivant: {{concept-development}}`,
        dependsOn: ['concept-development']
      },
      {
        id: 'idea-evaluation',
        agentId: 'ideation-agent',
        input: `Évaluer le potentiel et la faisabilité du concept suivant en tenant compte des tendances du marché: 
        Concept: {{concept-development}}
        Tendances: {{market-analysis}}`,
        dependsOn: ['concept-development', 'market-analysis']
      }
    ]
  };
  
  // Enregistrer le workflow
  orchestrator.registerWorkflow(ideationWorkflow);
  
  try {
    // Exécuter le workflow
    console.log('Exécution du workflow...');
    const results = await orchestrator.executeWorkflow('ideation-workflow', initialInput);
    
    // Afficher les résultats
    console.log('-----------------------------------');
    console.log('Résultats du workflow:');
    console.log('-----------------------------------');
    
    for (const result of results) {
      console.log(`\n## Étape: ${result.id}`);
      console.log(`Timestamp: ${new Date(result.timestamp).toLocaleString()}`);
      console.log('-----------------------------------');
      console.log(result.content);
      console.log('-----------------------------------');
    }
    
    console.log('\nWorkflow terminé avec succès!');
    return results;
  } catch (error) {
    console.error('Erreur lors de l\'exécution du workflow:', error);
  }
}

// Exemple d'utilisation
if (typeof require !== 'undefined' && require.main === module) {
  const userInput = process.argv[2] || 'Une application pour aider les développeurs à créer des projets rapidement';
  runIdeationWorkflow(userInput)
    .then(() => console.log('Programme terminé'))
    .catch(err => console.error('Erreur:', err));
}

// Pour l'exécution directe avec ts-node en mode ESM
if (typeof process !== 'undefined' && process.argv[1] === import.meta.url) {
  const userInput = process.argv[2] || 'Une application pour aider les développeurs à créer des projets rapidement';
  runIdeationWorkflow(userInput)
    .then(() => console.log('Programme terminé'))
    .catch(err => console.error('Erreur:', err));
}
