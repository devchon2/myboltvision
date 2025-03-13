import { describe, expect, vi, beforeEach, it } from 'vitest';
import type { ContextCluster } from '../../../types/context';
import { DocumentationAgent } from '../DocumentationAgent';

describe('DocumentationAgent', () => {
  let agent: DocumentationAgent;

  // Contexte de test
  const mockContext: ContextCluster = {
    id: 'test-context-1',
    type: 'test',
    data: { source: 'test' },
    vectors: [
      {
        embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
        metadata: {},
        content: 'Test content',
      },
    ],
    content: "Contexte de test pour l'agent de documentation",
    relatedClusters: [],
    shards: [],
    primaryShard: {
      id: 'test-shard',
      type: 'primary',
      content: 'Contexte de test',
      timestamp: Date.now(),
      complexityMetric: 0.6,
      innovationPotential: 0.65,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0',
      },
      relatedClusters: [],
      data: {},
      parentContextId: 'test-context-1',
    },
    timestamp: Date.now(),
    complexityMetric: 0.6,
    innovationPotential: 0.65,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0',
    },
  };

  beforeEach(() => {
    agent = new DocumentationAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('documentation-agent');
    expect(agent.name).toBe('Agent de Documentation');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(4);
    expect(agent.capabilities).toContain('api-documentation');
    expect(agent.capabilities).toContain('user-guides');
    expect(agent.capabilities).toContain('technical-specs');
    expect(agent.capabilities).toContain('project-documentation');
  });

  it('devrait analyser correctement une demande de documentation API', async () => {
    const input = "Générer une documentation pour l'API utilisateur";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('documentation-agent');
    expect(result.content).toContain('Documentation API');
    expect(result.content).toContain('Endpoints');
    expect(result.content).toContain('GET /api/users');
    expect(result.metadata.requestType).toBe('api-documentation');
  });

  it('devrait analyser correctement une demande de guide utilisateur', async () => {
    const input = "Créer un guide d'utilisation pour notre application";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Guide Utilisateur');
    expect(result.content).toContain('Introduction');
    expect(result.content).toContain('Démarrage rapide');
    expect(result.content).toContain('Fonctionnalités principales');
    expect(result.metadata.requestType).toBe('user-guides');
  });

  it('devrait analyser correctement une demande de spécifications techniques', async () => {
    const input = 'Rédiger les spécifications techniques du système';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Spécifications Techniques');
    expect(result.content).toContain('Architecture');
    expect(result.content).toContain('Composants');
    expect(result.content).toContain('Flux de données');
    expect(result.metadata.requestType).toBe('technical-specs');
  });

  it('devrait analyser correctement une demande de documentation de projet', async () => {
    const input = 'Générer un README pour ce projet';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Documentation du Projet');
    expect(result.content).toContain('Description');
    expect(result.content).toContain('Installation');
    expect(result.content).toContain('Structure du projet');
    expect(result.metadata.requestType).toBe('project-documentation');
  });

  it('devrait gérer une demande générique', async () => {
    const input = 'Quels sont les meilleurs pratiques de documentation?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Analyse de votre demande de documentation');
    expect(result.metadata).toHaveProperty('requestType', 'generic');
  });
});
