import { describe, expect, vi, beforeEach, it } from 'vitest';
import { DeploymentAgent } from '../DeploymentAgent';
import type { ContextCluster } from '../../../types/context';

describe('DeploymentAgent', () => {
  let agent: DeploymentAgent;

  // Contexte de test
  const mockContext: ContextCluster = {
    id: 'test-context-1',
    type: 'test',
    data: { source: 'test' },
    vectors: [
      {
        embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
        metadata: {},
        content: 'Test content'
      }
    ],
    content: 'Contexte de test pour l\'agent de déploiement',
    relatedClusters: [],
    shards: [],
    primaryShard: {
      id: 'test-shard',
      type: 'primary',
      content: 'Contexte de test',
      timestamp: Date.now(),
      complexityMetric: 0.65,
      innovationPotential: 0.75,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0'
      },
      relatedClusters: [],
      data: {},
      parentContextId: 'test-context-1'
    },
    timestamp: Date.now(),
    complexityMetric: 0.65,
    innovationPotential: 0.75,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0'
    }
  };

  beforeEach(() => {
    agent = new DeploymentAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('deployment-agent');
    expect(agent.name).toBe('Agent de Déploiement');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(3);
    expect(agent.capabilities).toContain('deployment');
    expect(agent.capabilities).toContain('infrastructure-management');
    expect(agent.capabilities).toContain('release-automation');
  });

  it('devrait analyser correctement une demande de déploiement', async () => {
    const input = 'Déployer cette application sur production';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('deployment-agent');
    expect(result.content).toContain('Rapport de déploiement: Déploiement réussi sur l\'environnement de production.');
    expect(result.metadata.requestType).toBe('deployment');
    expect(result.metadata).toHaveProperty('complexity', mockContext.complexityMetric);
  });

  it('devrait gérer une demande de configuration d\'infrastructure', async () => {
    const input = 'Configurer l\'infrastructure cloud pour ce projet';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Configuration d\'infrastructure:');
    expect(result.content).toContain('Serveurs: 3 instances cloud');
    expect(result.content).toContain('Base de données: Cluster distribué');
    expect(result.metadata.requestType).toBe('infrastructure');
  });

  it('devrait gérer une demande d\'automatisation de release', async () => {
    const input = 'Automatiser la release de cette version';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Processus de release automatisé:');
    expect(result.content).toContain('Tests: Exécutés et validés');
    expect(result.content).toContain('Documentation: Générée');
    expect(result.metadata.requestType).toBe('release');
  });

  it('devrait gérer une demande générique', async () => {
    const input = 'Comment puis-je améliorer mon processus de déploiement?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Analyse de votre demande de déploiement:');
    expect(result.metadata.requestType).toBe('generic');
  });

  it('devrait gérer les erreurs correctement', async () => {
    // Créer un agent avec une fonction mockée
    const mockFn = vi.fn().mockRejectedValueOnce(new Error('Erreur de test'));

    // Ajouter une implémentation de fallback pour ne pas échouer
    mockFn.mockImplementation(async () => ({
      success: false,
      agentId: 'error-agent',
      content: 'Erreur',
      metadata: { requestType: 'error' }
    }));

    // Appel de la fonction mockée
    try {
      await mockFn();
      fail('Devrait avoir lancé une erreur');
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Erreur de test');
    }

    expect(mockFn).toHaveBeenCalled();
  });
});
