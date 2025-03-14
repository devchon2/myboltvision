import { Agent, AgentResult, Workflow, WorkflowStep } from './AgentOrchestrator.js';

export interface DAGNode {
  id: string;
  type: 'agent' | 'decision' | 'merger' | 'splitter';
  agentId?: string;
  metadata: Record<string, any>;
  inputs: string[];  // IDs des nœuds qui fournissent des entrées
  outputs: string[]; // IDs des nœuds qui reçoivent des sorties
}

export interface DAGEdge {
  id: string;
  source: string;  // ID du nœud source
  target: string;  // ID du nœud cible
  condition?: (result: AgentResult) => boolean;
  transformation?: (result: AgentResult) => any;
}

export interface DAG {
  id: string;
  name: string;
  description: string;
  nodes: DAGNode[];
  edges: DAGEdge[];
  metadata: Record<string, any>;
}

/**
 * Le DynamicDAGEngine permet de créer, modifier et exécuter des workflows
 * représentés sous forme de graphes acycliques dirigés (DAG) de manière dynamique.
 */
export class DynamicDAGEngine {
  private agents = new Map<string, Agent>();
  private dags = new Map<string, DAG>();
  private executionCache = new Map<string, AgentResult>();

  /**
   * Enregistre un agent dans le moteur DAG
   */
  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  /**
   * Crée un DAG à partir d'un workflow existant
   */
  createDAGFromWorkflow(workflow: Workflow): DAG {
    const nodes: DAGNode[] = [];
    const edges: DAGEdge[] = [];
    
    // Convertir chaque étape du workflow en nœud DAG
    workflow.steps.forEach(step => {
      // Créer un nœud pour l'agent
      const node: DAGNode = {
        id: step.id,
        type: 'agent',
        agentId: step.agentId,
        metadata: { input: step.input },
        inputs: [],
        outputs: []
      };
      
      nodes.push(node);
      
      // Créer des arêtes pour les dépendances
      step.dependsOn.forEach(depId => {
        const edgeId = `${depId}-to-${step.id}`;
        
        // Créer l'arête
        const edge: DAGEdge = {
          id: edgeId,
          source: depId,
          target: step.id
        };
        
        // Si la dépendance a une condition, l'ajouter à l'arête
        if (step.condition) {
          edge.condition = (result) => {
            const prevResults = [result]; // Simplifié pour l'exemple
            return step.condition!(prevResults);
          };
        }
        
        edges.push(edge);
        
        // Mettre à jour les entrées du nœud courant et les sorties du nœud de dépendance
        node.inputs.push(depId);
        
        // Mettre à jour le nœud de dépendance s'il existe déjà
        const depNode = nodes.find(n => n.id === depId);
        if (depNode) {
          depNode.outputs.push(step.id);
        }
      });
    });
    
    const dag: DAG = {
      id: `dag-${workflow.id}`,
      name: workflow.name,
      description: workflow.description,
      nodes,
      edges,
      metadata: {}
    };
    
    this.dags.set(dag.id, dag);
    
    return dag;
  }

  /**
   * Crée un nouveau DAG à partir de zéro
   */
  createDAG(name: string, description: string): DAG {
    const dag: DAG = {
      id: `dag-${Date.now()}`,
      name,
      description,
      nodes: [],
      edges: [],
      metadata: {}
    };
    
    this.dags.set(dag.id, dag);
    
    return dag;
  }

  /**
   * Ajoute un nœud au DAG
   */
  addNode(dagId: string, node: Omit<DAGNode, 'inputs' | 'outputs'>): DAGNode {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    const fullNode: DAGNode = {
      ...node,
      inputs: [],
      outputs: []
    };
    
    dag.nodes.push(fullNode);
    
    return fullNode;
  }

  /**
   * Ajoute une arête au DAG
   */
  addEdge(dagId: string, edge: Omit<DAGEdge, 'id'>): DAGEdge {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    const fullEdge: DAGEdge = {
      id: `edge-${Date.now()}-${edge.source}-${edge.target}`,
      ...edge
    };
    
    dag.edges.push(fullEdge);
    
    // Mettre à jour les nœuds connectés
    const sourceNode = dag.nodes.find(n => n.id === edge.source);
    const targetNode = dag.nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      sourceNode.outputs.push(targetNode.id);
      targetNode.inputs.push(sourceNode.id);
    }
    
    return fullEdge;
  }

  /**
   * Supprime un nœud du DAG et toutes ses arêtes
   */
  removeNode(dagId: string, nodeId: string): void {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    // Supprimer toutes les arêtes associées à ce nœud
    dag.edges = dag.edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
    
    // Supprimer le nœud
    dag.nodes = dag.nodes.filter(node => node.id !== nodeId);
    
    // Mettre à jour les entrées/sorties des nœuds connectés
    dag.nodes.forEach(node => {
      node.inputs = node.inputs.filter(input => input !== nodeId);
      node.outputs = node.outputs.filter(output => output !== nodeId);
    });
  }

  /**
   * Supprime une arête du DAG
   */
  removeEdge(dagId: string, edgeId: string): void {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    const edge = dag.edges.find(e => e.id === edgeId);
    
    if (edge) {
      // Mettre à jour les nœuds connectés
      const sourceNode = dag.nodes.find(n => n.id === edge.source);
      const targetNode = dag.nodes.find(n => n.id === edge.target);
      
      if (sourceNode) {
        sourceNode.outputs = sourceNode.outputs.filter(output => output !== edge.target);
      }
      
      if (targetNode) {
        targetNode.inputs = targetNode.inputs.filter(input => input !== edge.source);
      }
      
      // Supprimer l'arête
      dag.edges = dag.edges.filter(e => e.id !== edgeId);
    }
  }

  /**
   * Exécute un DAG avec une entrée initiale
   */
  async executeDAG(dagId: string, initialInput: string): Promise<Map<string, AgentResult>> {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    // Réinitialiser le cache d'exécution
    this.executionCache.clear();
    
    // Trouver les nœuds qui n'ont pas d'entrée (nœuds de départ)
    const startNodes = dag.nodes.filter(node => node.inputs.length === 0);
    
    if (startNodes.length === 0) {
      throw new Error(`Aucun nœud de départ trouvé dans le DAG ${dagId}`);
    }
    
    // Exécuter chaque nœud de départ avec l'entrée initiale
    for (const startNode of startNodes) {
      await this.executeNode(dag, startNode.id, initialInput);
    }
    
    // Convertir le cache en Map pour le retour
    const results = new Map<string, AgentResult>();
    
    for (const [nodeId, result] of this.executionCache.entries()) {
      results.set(nodeId, result);
    }
    
    return results;
  }

  /**
   * Exécute un nœud spécifique du DAG
   */
  private async executeNode(dag: DAG, nodeId: string, input: string): Promise<AgentResult> {
    // Vérifier si le nœud a déjà été exécuté
    if (this.executionCache.has(nodeId)) {
      return this.executionCache.get(nodeId)!;
    }
    
    const node = dag.nodes.find(n => n.id === nodeId);
    
    if (!node) {
      throw new Error(`Nœud avec ID ${nodeId} non trouvé dans le DAG ${dag.id}`);
    }
    
    let result: AgentResult;
    
    // Exécuter le nœud en fonction de son type
    switch (node.type) {
      case 'agent':
        if (!node.agentId) {
          throw new Error(`Nœud agent ${nodeId} sans agentId`);
        }
        
        const agent = this.agents.get(node.agentId);
        
        if (!agent) {
          throw new Error(`Agent avec ID ${node.agentId} non trouvé`);
        }
        
        // Créer un contexte minimal pour l'appel
        const context = {
          id: `ctx-${Date.now()}`,
          content: input,
          timestamp: Date.now()
        };
        
        result = await agent.execute(input, context as any);
        break;
        
      case 'merger':
        // Récupérer les résultats des nœuds d'entrée
        const inputResults: AgentResult[] = [];
        
        for (const inputId of node.inputs) {
          // S'assurer que le nœud d'entrée a été exécuté
          if (!this.executionCache.has(inputId)) {
            const inputNode = dag.nodes.find(n => n.id === inputId);
            
            if (inputNode) {
              // Trouver l'arête qui connecte ce nœud à l'entrée
              const edge = dag.edges.find(e => e.source === inputId && e.target === nodeId);
              
              // Si l'arête a une condition, vérifier si elle est satisfaite
              if (edge && edge.condition) {
                // Pour cela, il faudrait avoir le résultat du nœud d'entrée
                // mais on ne l'a pas encore, donc c'est une dépendance circulaire
                // Dans un cas réel, il faudrait un mécanisme plus élaboré
              }
              
              // Exécuter le nœud d'entrée
              await this.executeNode(dag, inputId, input);
            }
          }
          
          if (this.executionCache.has(inputId)) {
            inputResults.push(this.executionCache.get(inputId)!);
          }
        }
        
        // Fusionner les résultats (exemple simplifié)
        result = {
          id: `result-${nodeId}`,
          agentId: 'merger',
          content: inputResults.map(r => r.content).join('\n\n'),
          timestamp: Date.now(),
          metadata: {
            type: 'merged',
            sourceResults: inputResults.map(r => r.id)
          },
          success: true
        };
        break;
        
      case 'decision':
      case 'splitter':
        // Implémentation simplifiée
        result = {
          id: `result-${nodeId}`,
          agentId: node.type,
          content: input,
          timestamp: Date.now(),
          metadata: {
            type: node.type
          },
          success: true
        };
        break;
        
      default:
        throw new Error(`Type de nœud non supporté: ${node.type}`);
    }
    
    // Stocker le résultat dans le cache
    this.executionCache.set(nodeId, result);
    
    // Exécuter les nœuds suivants
    const outgoingEdges = dag.edges.filter(edge => edge.source === nodeId);
    
    for (const edge of outgoingEdges) {
      // Vérifier la condition de l'arête si elle existe
      if (edge.condition && !edge.condition(result)) {
        continue; // Ignorer cette arête si la condition n'est pas satisfaite
      }
      
      // Transformer le résultat si nécessaire
      let outputInput = input;
      
      if (edge.transformation) {
        const transformed = edge.transformation(result);
        
        if (typeof transformed === 'string') {
          outputInput = transformed;
        } else {
          outputInput = JSON.stringify(transformed);
        }
      } else {
        // Par défaut, utiliser le contenu du résultat
        outputInput = result.content;
      }
      
      // Exécuter le nœud cible
      await this.executeNode(dag, edge.target, outputInput);
    }
    
    return result;
  }

  /**
   * Convertit un DAG en workflow standard
   */
  convertDAGToWorkflow(dagId: string): Workflow {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    const steps: WorkflowStep[] = [];
    
    // Convertir chaque nœud agent en étape de workflow
    dag.nodes
      .filter(node => node.type === 'agent' && node.agentId)
      .forEach(node => {
        const step: WorkflowStep = {
          id: node.id,
          agentId: node.agentId!,
          input: node.metadata.input || '',
          dependsOn: node.inputs
        };
        
        steps.push(step);
      });
    
    return {
      id: `workflow-${dag.id}`,
      name: dag.name,
      description: dag.description,
      steps
    };
  }

  /**
   * Supprime un DAG
   */
  removeDAG(dagId: string): void {
    this.dags.delete(dagId);
  }

  /**
   * Récupère tous les DAGs enregistrés
   */
  getAllDAGs(): DAG[] {
    return Array.from(this.dags.values());
  }

  /**
   * Récupère un DAG spécifique
   */
  getDAG(dagId: string): DAG | undefined {
    return this.dags.get(dagId);
  }

  /**
   * Optimise un DAG en fusionnant les nœuds qui peuvent l'être
   */
  optimizeDAG(dagId: string): DAG {
    const dag = this.dags.get(dagId);
    
    if (!dag) {
      throw new Error(`DAG avec ID ${dagId} non trouvé`);
    }
    
    // Copie du DAG pour l'optimisation
    const optimizedDAG: DAG = {
      ...dag,
      nodes: [...dag.nodes],
      edges: [...dag.edges]
    };
    
    // Implémentation à venir - des heuristiques spécifiques d'optimisation
    // pourraient être ajoutées ici (fusion de nœuds, élimination de nœuds redondants, etc.)
    
    // Enregistrer le DAG optimisé
    this.dags.set(`${dagId}-optimized`, optimizedDAG);
    
    return optimizedDAG;
  }
}
