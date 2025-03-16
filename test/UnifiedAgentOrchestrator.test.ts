import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UnifiedAgentOrchestrator } from '../lib/core/UnifiedAgentOrchestrator';
import { DynamicDAGEngine } from '../lib/core/DynamicDAGEngine';
import { ConflictResolutionEngine } from '../lib/core/ConflictResolutionEngine';
import type { Agent, AgentResult, Workflow } from '../types/agent';

// Mock des dépendances
vi.mock('../lib/core/DynamicDAGEngine');
vi.mock('../lib/core/ConflictResolutionEngine');

describe('UnifiedAgentOrchestrator', () => {
  let orchestrator: UnifiedAgentOrchestrator;
  let mockDagEngine: DynamicDAGEngine;
  let mockConflictEngine: ConflictResolutionEngine;

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();

    // Créer des mocks pour les dépendances
    mockDagEngine = {
      registerAgent: vi.fn(),
      createDAGFromWorkflow: vi.fn(),
      executeDAG: vi.fn(),
      createDAG: vi.fn(),
      addNode: vi.fn(),
      addEdge: vi.fn(),
      removeNode: vi.fn(),
      removeEdge: vi.fn(),
      getAllDAGs: vi.fn(),
      getDAG: vi.fn(),
      removeDAG: vi.fn(),
      optimizeDAG: vi.fn()
    } as any;
    mockConflictEngine = {
      resolveConflict: vi.fn().mockResolvedValue(Promise.resolve({} as AgentResult))
    } as any;

    // Instancier l'orchestrateur avec les mocks
    orchestrator = new UnifiedAgentOrchestrator();
  });

  it('devrait instancier correctement', () => {
    expect(orchestrator).toBeInstanceOf(UnifiedAgentOrchestrator);
  });

it('devrait enregistrer un agent dans le DAG Engine', () => {
  const mockAgent: Agent = { id: 'test-agent', name: 'Test Agent', description: 'Test', capabilities: [], execute: vi.fn() };
  orchestrator.registerAgent(mockAgent);
  expect(mockDagEngine.registerAgent).toHaveBeenCalledWith(mockAgent);
});

  it('devrait exécuter un workflow via le DAG Engine', async () => {
    const mockResults = new Map<string, AgentResult>();

    // Mock de la méthode executeDAG du DAG Engine
    mockDagEngine.createDAGFromWorkflow = vi.fn().mockReturnValue({ id: 'test-dag' } as any);
    mockDagEngine.executeDAG = vi.fn().mockResolvedValue(mockResults);

    const results = await orchestrator.executeWorkflow({id: 'test'}, 'test');

    expect(mockDagEngine.createDAGFromWorkflow).toHaveBeenCalledWith({id: 'test'});
    expect(mockDagEngine.executeDAG).toHaveBeenCalledWith('test-dag', 'test');
    expect(results).toBe(mockResults);
  });

  it('devrait exécuter avec des agents et résoudre les conflits', async () => {
    const agentIds = ['agent1', 'agent2'];
    const input = 'Test input';
    const mockResults = [
      { agentId: 'agent1', content: 'Result 1', success: true, metadata: { confidence: 0.8 } },
      { agentId: 'agent2', content: 'Result 2', success: true, metadata: { confidence: 0.6 } }
    ];
    const mockResolvedResult: AgentResult = { agentId: 'resolved', content: 'Resolved content', success: true, metadata: {} };

    // Mock des méthodes nécessaires
    mockDagEngine.createDAG = vi.fn().mockReturnValue({ id: 'test-dag', nodes: [], edges: [] } as any);
    mockDagEngine.addNode = vi.fn().mockReturnValue({ id: 'node1', type: 'agent', agentId: 'agent1', metadata: {}, inputs: [], outputs: [] } as any);
    mockDagEngine.addEdge = vi.fn().mockReturnValue({ id: 'edge1', source: 'start', target: 'node1' } as any);
    mockDagEngine.executeDAG = vi.fn().mockResolvedValue(new Map(mockResults.map(r => [r.agentId, r])));
    mockConflictEngine.resolveConflict = vi.fn().mockResolvedValue(mockResolvedResult);

    const result = await orchestrator.executeWithAgents(agentIds, input);

    // Vérifications
    expect(mockDagEngine.createDAG).toHaveBeenCalled();
    expect(mockDagEngine.addNode).toHaveBeenCalledTimes(agentIds.length);
    expect(mockDagEngine.addEdge).toHaveBeenCalledTimes(agentIds.length);
    expect(mockDagEngine.executeDAG).toHaveBeenCalled();
    expect(mockConflictEngine.resolveConflict).toHaveBeenCalledWith(expect.any(Object), expect.arrayContaining(mockResults));
    expect(result).toBe(mockResolvedResult);
  });
});
