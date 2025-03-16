import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UnifiedAgentOrchestrator } from '../../lib/core/UnifiedAgentOrchestrator';
import { ExternalDataProvider } from '../../lib/integrations/ExternalDataProvider';
import type { AgentResult } from '../../types/agent';

describe('CompleteAgentWorkflow', () => {
  let orchestrator: UnifiedAgentOrchestrator;
  let dataProvider: ExternalDataProvider;

  beforeEach(() => {
    orchestrator = new UnifiedAgentOrchestrator();
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

    const result: AgentResult = await orchestrator.executeWorkflow(input, context);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it('should fetch external data and enrich context', async () => {
    const source = 'test-source';
    const data = await dataProvider.fetchData(source);

    expect(data).toBeDefined();
    expect(data.source).toBe(source);
    expect(data.data).toBeDefined();
  });
});
