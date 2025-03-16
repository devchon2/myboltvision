import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UnifiedAgentOrchestrator } from '../../lib/core/UnifiedAgentOrchestrator';
import { ExternalDataProvider } from '../../lib/integrations/ExternalDataProvider';
import type { AgentResult } from '../../types/agent';

describe('CompleteAgentWorkflow', () => {
  let orchestrator: UnifiedAgentOrchestrator;
  let dataProvider: ExternalDataProvider;
  let mockDagEngine: any;
  let mockConflictEngine: any;

  beforeEach(() => {
    mockDagEngine = {
      registerAgent: vi.fn(),
      createDAGFromWorkflow: vi.fn(),
      executeDAG: vi.fn(),
    };
    mockConflictEngine = {
      resolveConflict: vi.fn(),
    };
    orchestrator = new UnifiedAgentOrchestrator(mockDagEngine, mockConflictEngine);
    dataProvider = new ExternalDataProvider();
  });

  it('should execute the complete workflow successfully', async () => {
    const input = 'Test input';
    const context = {
      id: 'test-context',
      type: 'test',
      vectors: [],
      timestamp: Date.now(),
      primaryShard: {
        id: 'shard-1',
        type: 'primary',
        content: input,
        timestamp: Date.now(),
        complexityMetric: 0.75,
        innovationPotential: 0.85,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0',
        },
        relatedClusters: [],
        data: { source: 'test' },
        parentContextId: 'ctx-1',
      },
      data: {},
      content: '',
      relatedClusters: [],
      complexityMetric: 0.75,
      innovationPotential: 0.85,
      shards: [],
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
      },
    };

    const workflow = {
      id: 'test-workflow',
      name: 'Test Workflow',
      description: 'A test workflow',
      steps: [],
    };

    const results: Map<string, AgentResult> = await orchestrator.executeWorkflow(workflow, input);
    const result: AgentResult | undefined = results.values().next().value;

    expect(result).toBeDefined();
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });

  it('should fetch external data and enrich context', async () => {
    const source = 'test-source';
    const data = await dataProvider.fetchData(source);

    expect(data).toBeDefined();
    expect(data.source).toBe(source);
    expect(data.data).toBeDefined();
  });
});
