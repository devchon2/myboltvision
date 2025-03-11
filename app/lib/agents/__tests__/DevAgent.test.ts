import { describe, expect, vi, beforeEach, it } from 'vitest';
import { DevAgent } from '../DevAgent';
import type { ContextCluster } from '../../../types/context';

describe('DevAgent', () => {
  let agent: DevAgent;

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
    content: 'Contexte de test pour l\'agent de développement',
    relatedClusters: [],
    shards: [],
    primaryShard: {
      id: 'test-shard',
      type: 'primary',
      content: 'Contexte de test',
      timestamp: Date.now(),
      complexityMetric: 0.75,
      innovationPotential: 0.70,
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
    complexityMetric: 0.75,
    innovationPotential: 0.70,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0'
    }
  };

  beforeEach(() => {
    agent = new DevAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('dev-agent');
    expect(agent.name).toBe('Agent de Développement');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(4);
    expect(agent.capabilities).toContain('code-generation');
    expect(agent.capabilities).toContain('code-review');
    expect(agent.capabilities).toContain('refactoring');
    expect(agent.capabilities).toContain('debugging');
  });

  it('devrait analyser correctement une demande de génération de code', async () => {
    const input = 'Générer une fonction pour traiter des données';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('dev-agent');
    expect(result.content).toContain('Code généré');
    expect(result.content).toContain('```typescript');
    expect(result.content).toContain('function processData');
    expect(result.metadata.requestType).toBe('code-generation');
  });

  it('devrait analyser correctement une demande de revue de code', async () => {
    const input = 'Peux-tu revoir ce code pour en améliorer la qualité?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('dev-agent');
    expect(result.content).toContain('Revue de Code');
    expect(result.content).toContain('Points forts');
    expect(result.content).toContain('Points à améliorer');
    expect(result.content).toContain('Score de qualité');
    expect(result.metadata.requestType).toBe('code-review');
  });

  it('devrait analyser correctement une demande de refactoring', async () => {
    const input = 'Refactoriser ce code pour le rendre plus maintenable';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('dev-agent');
    expect(result.content).toContain('Refactoring proposé');
    expect(result.content).toContain('Extraction de méthodes');
    expect(result.content).toContain('Renommage de variables');
    expect(result.metadata.requestType).toBe('refactoring');
  });

  it('devrait analyser correctement une demande de débogage', async () => {
    const input = 'J\'ai un bug dans mon code, peux-tu m\'aider à le résoudre?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('dev-agent');
    expect(result.content).toContain('Rapport de débogage');
    expect(result.content).toContain('Cause probable');
    expect(result.content).toContain('Solution proposée');
    expect(result.metadata.requestType).toBe('debugging');
  });

  it('devrait gérer une demande générique', async () => {
    const input = 'Comment puis-je devenir un meilleur développeur?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Analyse de votre demande de développement');
    expect(result.metadata.requestType).toBe('generic');
  });
});
