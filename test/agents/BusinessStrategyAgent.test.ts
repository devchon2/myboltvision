import { expect } from 'chai';
import { BusinessStrategyAgent } from '../../lib/agents/BusinessStrategyAgent.js';
import type { ContextShard, ContextCluster } from '../../types/context.js';

describe('BusinessStrategyAgent', () => {
  let agent: BusinessStrategyAgent;
  
  beforeEach(() => {
    agent = new BusinessStrategyAgent();
  });
  
  it('doit analyser correctement une demande financière', async () => {
    // Créer un ContextCluster pour le test
    const now = Date.now();
    const contextCluster: ContextCluster = {
      id: 'test-cluster-' + now,
      type: 'test',
      data: { source: 'test-suite' },
      content: 'Données de contexte pour analyse financière',
      relatedClusters: [],
      timestamp: now,
      complexityMetric: 0.8,
      innovationPotential: 0.7,
      shards: [
        {
          id: 'shard-1',
          type: 'financial',
          data: { financialData: { revenue: 500000, expenses: 300000 } },
          content: 'Données financières historiques',
          relatedClusters: [],
          timestamp: now - 86400000, // 1 jour avant
          complexityMetric: 0.6,
          innovationPotential: 0.5,
          parentContextId: 'test-cluster-' + now,
          metadata: {
            createdAt: new Date(now - 86400000),
            updatedAt: new Date(now - 86400000),
            version: '1.0.0',
          }
        }
      ],
      metadata: {
        createdAt: new Date(now),
        updatedAt: new Date(now),
        version: '1.0.0',
      }
    };
    
    // Extraire un ContextShard du cluster pour le passer à l'agent
    // puisque l'agent actuel utilise ContextShard et non ContextCluster
    const contextShard: ContextShard = contextCluster.shards[0];
    
    const input = '[FINANCIAL] Analyse financière pour le trimestre Q2 2023';
    const result = await agent.execute(input, contextShard);
    
    expect(result.success).to.be.true;
    expect(result.metadata.requestType).to.include('financial');
    expect(result.content).to.include('Résultats de l\'analyse financière');
  });

  // Ajoutez d'autres tests selon vos besoins
});
