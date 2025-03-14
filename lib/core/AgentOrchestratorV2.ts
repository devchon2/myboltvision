import type { ContextShard } from '../../types/context.js';
import { ContextManager } from './ContextManager.js';
import { ConflictResolutionEngine } from './ConflictResolutionEngine.js';
import { DynamicDAGEngine } from './DynamicDAGEngine.js';
import { Agent, AgentResult, Workflow, WorkflowStep } from './AgentOrchestrator.js';

/**
 * Version améliorée de l'orchestrateur d'agents intégrant le moteur de résolution de conflits
 * et le moteur DAG dynamique pour une meilleure flexibilité et robustesse.
 */
export class AgentOrchestratorV2 {
  private agents = new Map<string, Agent>();
  private workflows = new Map<string, Workflow>();
  private contextManager: ContextManager;
  private conflictEngine: ConflictResolutionEngine;
  private dagEngine: DynamicDAGEngine;
  private executionHistory: AgentResult[] = [];

  constructor() {
    this.contextManager = new ContextManager();
    this.conflictEngine = new ConflictResolutionEngine();
    this.dagEngine = new DynamicDAGEngine();
  }

  /**
   * Enregistre un agent dans l'orchestrateur
   */
  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
    this.conflictEngine.registerAgent(agent);
    this.dagEngine.registerAgent(agent);
  }

  /**
   * Enregistre un workflow dans l'orchestrateur
   */
  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
    
    // Créer également un DAG pour ce workflow
    this.dagEngine.createDAGFromWorkflow(workflow);
  }

  /**
   * Exécute un agent spécifique avec une entrée donnée
   */
  async executeAgent(agentId: string, input: string): Promise<AgentResult> {
    const agent = this.agents.get(agentId);

    if (!agent) {
      throw new Error(`Agent with ID ${agentId} not found`);
    }

    const context = await this.contextManager.enrichContext(input);
    const result = await agent.execute(input, context);

    this.executionHistory.push(result);

    return result;
  }

  /**
   * Exécute un workflow avec résolution de conflits intégrée
   */
  async executeWorkflow(workflowId: string, initialInput: string): Promise<AgentResult[]> {
    const workflow = this.workflows.get(workflowId);

    if (!workflow) {
      throw new Error(`Workflow with ID ${workflowId} not found`);
    }

    const dagId = `dag-${workflowId}`;
    
    // Vérifier si le DAG existe déjà, sinon le créer
    if (!this.dagEngine.getDAG(dagId)) {
      this.dagEngine.createDAGFromWorkflow(workflow);
    }
    
    // Exécuter le DAG
    const nodeResults = await this.dagEngine.executeDAG(dagId, initialInput);
    
    // Convertir les résultats en tableau
    const results = Array.from(nodeResults.values());
    
    // Détecter et résoudre les conflits éventuels
    const conflicts = await this.conflictEngine.detectConflicts(results);
    
    // Si des conflits sont détectés, les résoudre
    if (conflicts.length > 0) {
      for (const conflict of conflicts) {
        const resolution = await this.conflictEngine.resolveConflict(conflict, results);
        
        // Remplacer les résultats conflictuels par la résolution
        results.push(resolution);
      }
    }
    
    // Mettre à jour l'historique d'exécution
    this.executionHistory.push(...results);
    
    return results;
  }

  /**
   * Exécute plusieurs agents en parallèle et résout les conflits si nécessaire
   */
  async executeMultipleAgents(agentIds: string[], input: string): Promise<AgentResult[]> {
    // Vérifier que tous les agents existent
    for (const agentId of agentIds) {
      if (!this.agents.has(agentId)) {
        throw new Error(`Agent with ID ${agentId} not found`);
      }
    }
    
    // Exécuter tous les agents en parallèle
    const context = await this.contextManager.enrichContext(input);
    const agentPromises = agentIds.map(agentId => {
      const agent = this.agents.get(agentId)!;
      return agent.execute(input, context);
    });
    
    const results = await Promise.all(agentPromises);
    
    // Détecter les conflits éventuels
    const conflicts = await this.conflictEngine.detectConflicts(results);
    
    // Si des conflits sont détectés, les résoudre
    if (conflicts.length > 0) {
      for (const conflict of conflicts) {
        const resolution = await this.conflictEngine.resolveConflict(conflict, results);
        
        // Remplacer les résultats conflictuels par la résolution
        results.push(resolution);
      }
    }
    
    // Mettre à jour l'historique d'exécution
    this.executionHistory.push(...results);
    
    return results;
  }

  /**
   * Crée un nouveau workflow dynamique basé sur la sémantique de la requête
   */
  async createDynamicWorkflow(input: string): Promise<Workflow> {
    // Rechercher un agent de méta-recherche pour aider à construire le workflow
    const metaAgent = Array.from(this.agents.values()).find(agent => 
      agent.capabilities.includes('agent-discovery')
    );
    
    if (!metaAgent) {
      throw new Error('No meta-agent found to create dynamic workflow');
    }
    
    // Enrichir le contexte
    const context = await this.contextManager.enrichContext(input);
    
    // Demander au méta-agent de trouver les agents pertinents
    const discoveryResult = await metaAgent.execute(`[DISCOVER] ${input}`, context);
    
    // Analyser la réponse pour extraire les agents recommandés
    // Cette partie dépend du format de sortie du méta-agent
    const agentMatches = discoveryResult.content.match(/\(([a-z-]+)\)/g) || [];
    const recommendedAgents = agentMatches
      .map(match => match.replace(/[()]/g, ''))
      .filter(agentId => this.agents.has(agentId));
    
    if (recommendedAgents.length === 0) {
      throw new Error('No suitable agents found for this request');
    }
    
    // Créer un nouveau workflow basé sur les agents recommandés
    const workflowId = `dynamic-workflow-${Date.now()}`;
    const steps: WorkflowStep[] = [];
    
    // Créer une étape pour chaque agent, avec des dépendances séquentielles
    for (let i = 0; i < recommendedAgents.length; i++) {
      const stepId = `step-${i}`;
      const step: WorkflowStep = {
        id: stepId,
        agentId: recommendedAgents[i],
        input: i === 0 ? input : `{{step-${i - 1}}}`, // Utiliser le résultat de l'étape précédente
        dependsOn: i === 0 ? [] : [`step-${i - 1}`]   // Dépendre de l'étape précédente
      };
      
      steps.push(step);
    }
    
    const workflow: Workflow = {
      id: workflowId,
      name: `Workflow dynamique pour: ${input.substring(0, 30)}...`,
      description: `Workflow créé dynamiquement par le méta-agent pour la requête: ${input}`,
      steps
    };
    
    // Enregistrer et retourner le workflow
    this.registerWorkflow(workflow);
    
    return workflow;
  }

  /**
   * Récupère l'historique d'exécution
   */
  getExecutionHistory(): AgentResult[] {
    return [...this.executionHistory];
  }

  /**
   * Efface l'historique d'exécution
   */
  clearExecutionHistory(): void {
    this.executionHistory = [];
  }

  /**
   * Récupère la liste des agents enregistrés
   */
  getRegisteredAgents(): string[] {
    return Array.from(this.agents.keys());
  }

  /**
   * Récupère la liste des workflows enregistrés
   */
  getRegisteredWorkflows(): string[] {
    return Array.from(this.workflows.keys());
  }

  /**
   * Récupère l'historique des conflits détectés
   */
  getConflictHistory(): any[] {
    return this.conflictEngine.getConflictHistory();
  }

  /**
   * Récupère tous les DAGs enregistrés
   */
  getAllDAGs(): any[] {
    return this.dagEngine.getAllDAGs();
  }
}
