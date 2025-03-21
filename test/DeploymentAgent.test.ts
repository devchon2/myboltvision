import { DeploymentAgent } from '../app/lib/agents/DeploymentAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import type { ContextCluster } from '../app/types/context';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Remplacer jest.mock par vi.mock
vi.mock('../app/lib/core/ContextManager');

describe('DeploymentAgent', () => {
  let deploymentAgent: DeploymentAgent;
  let contextManagerMock: any;

  beforeEach(() => {
    // Réinitialiser tous les mocks
    vi.resetAllMocks();
    
    contextManagerMock = {
      findRelevantContext: vi.fn().mockResolvedValue([])
    };
    
    // Espionner et simuler les méthodes avec vi.spyOn
    ContextManager.prototype.findRelevantContext = contextManagerMock.findRelevantContext;
    
    deploymentAgent = new DeploymentAgent();
  });

  it('should deploy', async () => {
    const context: ContextCluster = {
      id: 'cluster1',
      type: 'type1',
      data: { source: 'test' },
      content: 'Test content',
      vectors: [{
        embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
        metadata: {},
        content: 'Test content'
      }],
      relatedClusters: [],
      shards: [],
      primaryShard: {
        id: 'shard1',
        type: 'type1',
        data: 'data1',
        content: 'content1',
        timestamp: 'timestamp1',
        metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' },
        complexityMetric: 0.5,
        innovationPotential: 0.8,
        relatedClusters: []
      },
      timestamp: Date.now(),
      complexityMetric: 0.5,
      innovationPotential: 0.8,
      metadata: { createdAt: new Date(), updatedAt: new Date(), version: '1.0' }
    };

    const result = await deploymentAgent.execute('déployer cette application', context);
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('deployment-agent');
    // Mettre à jour l'assertion pour correspondre à la réponse actuelle
    expect(result.content).toContain('Analyse de votre demande de déploiement');
  });
});
