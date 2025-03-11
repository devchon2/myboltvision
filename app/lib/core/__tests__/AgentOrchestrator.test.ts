import { AgentOrchestrator } from '../AgentOrchestrator';
import { IdeationAgent } from '../../agents/IdeationAgent';
import type { ContextShard } from '../../../types/context';
import type { Workflow, WorkflowStep } from '../AgentOrchestrator';
import { describe, beforeEach, test, expect, vi } from 'vitest';

describe('AgentOrchestrator', () => {
  let orchestrator: AgentOrchestrator;
  let mockIdeationAgent: IdeationAgent;
  let mockWorkflow: Workflow;
  
  beforeEach(() => {
    // Créer un agent mock avec vi.fn() pour simuler ses méthodes
    mockIdeationAgent = new IdeationAgent();
    vi.spyOn(mockIdeationAgent, 'execute').mockImplementation(async (input, context) => {
      const timestamp = Date.now();
      return {
        id: `mock_result_${timestamp}`,
        agentId: mockIdeationAgent.id,
        content: `Résultat simulé pour: ${input}`,
        timestamp: timestamp,
        metadata: { 
          agentVersion: '1.0',
          contextId: context?.id || 'default-context',
          timestamp: timestamp,
          requestType: 'test'
        },
        success: true
      };
    });
    
    // Initialiser l'orchestrateur avec l'agent mock
    orchestrator = new AgentOrchestrator();
    orchestrator.registerAgent(mockIdeationAgent);
    
    // Créer un workflow de test
    mockWorkflow = {
      id: 'test-workflow',
      name: 'Workflow de test',
      description: 'Un workflow pour les tests',
      steps: [
        {
          id: 'step1',
          agentId: mockIdeationAgent.id,
          input: 'Test input for step 1',
          dependsOn: []
        },
        {
          id: 'step2',
          agentId: mockIdeationAgent.id,
          input: 'Test input for step 2',
          dependsOn: ['step1']
        }
      ]
    };
    
    orchestrator.registerWorkflow(mockWorkflow);
  });
  
  test('devrait être correctement initialisé', () => {
    expect(orchestrator).toBeDefined();
    expect(orchestrator.getExecutionHistory()).toHaveLength(0);
  });
  
  test('devrait enregistrer des agents et des workflows', () => {
    // Créer un deuxième agent pour le test
    const secondAgent = new IdeationAgent();
    secondAgent.id = 'second-agent';
    
    // Créer un deuxième workflow
    const secondWorkflow = {
      id: 'second-workflow',
      name: 'Second workflow',
      description: 'Another test workflow',
      steps: []
    };
    
    // Enregistrer l'agent et le workflow
    orchestrator.registerAgent(secondAgent);
    orchestrator.registerWorkflow(secondWorkflow);
    
    // Vérifier qu'ils sont bien enregistrés en exécutant des méthodes qui les utilisent
    expect(async () => {
      await orchestrator.executeAgent(secondAgent.id, 'Test input');
    }).not.toThrow();
    
    expect(async () => {
      await orchestrator.executeWorkflow('second-workflow', 'Initial input');
    }).not.toThrow();
  });
  
  test('devrait exécuter un agent spécifique', async () => {
    const input = "Teste cette idée";
    const result = await orchestrator.executeAgent(mockIdeationAgent.id, input);
    
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe(mockIdeationAgent.id);
    expect(result.content).toContain(input);
    expect(mockIdeationAgent.execute).toHaveBeenCalled();
    
    // Vérifier que l'historique d'exécution a été mis à jour
    expect(orchestrator.getExecutionHistory()).toHaveLength(1);
  });
  
  test('devrait gérer les erreurs lors de l\'exécution d\'un agent inexistant', async () => {
    const input = "Teste cette idée";
    
    await expect(
      orchestrator.executeAgent('agent-inexistant', input)
    ).rejects.toThrow('Agent with ID agent-inexistant not found');
  });
  
  test('devrait exécuter un workflow complet', async () => {
    const results = await orchestrator.executeWorkflow(mockWorkflow.id, 'Initial input');
    
    expect(results).toHaveLength(2);
    expect(mockIdeationAgent.execute).toHaveBeenCalledTimes(2);
    
    // Vérifier que l'historique d'exécution a été mis à jour
    expect(orchestrator.getExecutionHistory()).toHaveLength(2);
  });
  
  test('devrait gérer les erreurs dans un workflow', async () => {
    // Modifier le mock pour simuler une erreur
    vi.spyOn(mockIdeationAgent, 'execute').mockRejectedValueOnce(new Error('Erreur simulée'));
    
    await expect(
      orchestrator.executeWorkflow(mockWorkflow.id, 'Error input')
    ).rejects.toThrow();
  });
  
  test('devrait pouvoir effacer l\'historique d\'exécution', async () => {
    // Exécuter un agent pour générer de l'historique
    await orchestrator.executeAgent(mockIdeationAgent.id, 'Test input');
    expect(orchestrator.getExecutionHistory()).toHaveLength(1);
    
    // Effacer l'historique
    orchestrator.clearExecutionHistory();
    expect(orchestrator.getExecutionHistory()).toHaveLength(0);
  });
});
