import { describe, expect, vi, beforeEach, it } from 'vitest';
import type { ContextCluster } from '../../../types/context';
import { IdeationAgent } from '../IdeationAgent';

describe('IdeationAgent', () => {
  let agent: IdeationAgent;

  // Contexte de test
  const mockContext: ContextCluster = {
    id: 'test-context-1',
    vectors: [
      {
        embedding: [0.1, 0.2, 0.3],
        metadata: { source: 'test' },
        content: 'Contexte vectorisé de test',
      },
    ],
    type: 'test',
    data: { source: 'test' },
    content: "Contexte de test pour l'agent d'idéation",
    relatedClusters: [],
    timestamp: Date.now(),
    complexityMetric: 0.75,
    innovationPotential: 0.85,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0',
    },
    shards: [],
    primaryShard: {
      id: 'test-shard',
      type: 'primary',
      content: 'Contexte de test',
      timestamp: Date.now(),
      complexityMetric: 0.75,
      innovationPotential: 0.85,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0',
      },
      relatedClusters: [],
      data: {},
      parentContextId: 'test-context-1',
    },
  };

  beforeEach(() => {
    agent = new IdeationAgent();
  });

  test('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('ideation-agent');
    expect(agent.name).toBe("Agent d'Idéation");
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(3);
    expect(agent.capabilities).toContain('brainstorming');
    expect(agent.capabilities).toContain('concept-development');
  });

  test('devrait analyser correctement une demande de brainstorming', async () => {
    const input = "J'ai besoin d'un brainstorming pour mon nouveau projet";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('ideation-agent');
    expect(result.content).toContain('Résultats du Brainstorming');
    expect(result.metadata.requestType).toBe('brainstorming');
  });

  test('devrait générer un concept détaillé', async () => {
    const input = 'Pouvez-vous développer un concept pour une application de productivité?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Concept développé:');
    expect(result.content).toContain('Description détaillée');
    expect(result.content).toContain('Caractéristiques principales');
    expect(result.metadata.requestType).toBe('concept-development');
  });

  test('devrait évaluer une idée', async () => {
    const input = "Évaluez cette idée: une plateforme d'apprentissage basée sur l'IA";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain("Évaluation de l'innovation");
    expect(result.content).toContain("Scores d'évaluation");
    expect(result.content).toContain('Score global');
    expect(result.metadata.requestType).toBe('innovation-assessment');
  });

  test('devrait analyser les tendances du marché', async () => {
    const input = '[TRENDS] Analyse des tendances technologiques émergentes pour 2025';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toMatch(/Analyse des Tendances de Marché/);
    expect(result.content).toMatch(/Technologies émergentes|Tendances technologiques/);
    expect(result.content).toMatch(/Opportunités émergentes|Domaines stratégiques/);
    expect(result.metadata.requestType).toBe('market-trends');
  });

  test('devrait gérer une demande générique', async () => {
    const input = 'Comment puis-je améliorer mon projet?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Réflexions sur votre demande');
    expect(result.metadata.requestType).toBe('generic');
  });

  test('devrait gérer les erreurs correctement', async () => {
    const invalidAgent = new IdeationAgent();
    invalidAgent.execute = vi.fn().mockRejectedValue(new Error('Method not implemented'));

    await expect(invalidAgent.execute('test', mockContext)).rejects.toThrow('Method not implemented');
  });

  test.each([
    ['', mockContext, 'Entrée vide'],
    ['test', { invalid: 'context' } as unknown as ContextCluster, 'Contexte invalide'],
  ])('devrait rejeter les entrées invalides (%s)', async (input, context, description) => {
    await expect(agent.execute(input, context)).rejects.toThrow(/Erreur de validation/);
  });

  test.each([
    ['brainstorming', 'brainstorming', 'Résultats du Brainstorming'],
    ['concept-development', 'concept-development', 'Concept développé:'],
    ['innovation-assessment', 'innovation-assessment', 'Score global'],
    ['market-trends', 'market-trends', 'Analyse des Tendances de Marché'],
  ])('devrait gérer le type de requête %s', async (input, expectedType, expectedContent) => {
    const result = await agent.execute(input, mockContext);

    expect(result.metadata.requestType).toBe(expectedType);
    expect(result.content).toContain(expectedContent);
    expect(result.metadata).toMatchObject({
      agentVersion: expect.any(String),
      timestamp: expect.any(Number),
      contextId: 'test-context-1',
    });
  });

  test('devrait valider le schéma de sortie', async () => {
    const result = await agent.execute('test', mockContext);

    expect(result).toMatchObject({
      success: expect.any(Boolean),
      agentId: 'ideation-agent',
      content: expect.any(String),
      metadata: {
        requestType: expect.any(String),
        complexity: expect.any(Number),
        innovationScore: expect.any(Number),
      },
    });
  });
});
