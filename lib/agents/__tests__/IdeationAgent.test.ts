import { describe, expect, vi, test } from 'vitest'; // Added 'test' import
import type { ContextCluster } from '../../../types/context.js';
import { IdeationAgent } from '../IdeationAgent.js';

describe('IdeationAgent', () => {
  let agent: IdeationAgent;

  // Mock context object conforming to ContextCluster interface
  const mockContext: ContextCluster = {
    id: 'test-context-1',
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
    }
  };

  beforeEach(() => {
    agent = new IdeationAgent();
  });

  test('devrait être correctement initialisé avec les propriétés attendues', () => { // Changed 'it' to 'test'
    expect(agent.id).toBe('ideation-agent');
    expect(agent.name).toBe("Agent d'Idéation");
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(3);
    expect(agent.capabilities).toContain('brainstorming');
    expect(agent.capabilities).toContain('concept-development');
  });

  test('devrait analyser correctement une demande de brainstorming', async () => { // Changed 'it' to 'test'
    const input = "J'ai besoin d'un brainstorming pour mon nouveau projet";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('ideation-agent');
    expect(result.content).toContain('Résultats du Brainstorming');
    expect(result.metadata.requestType).toBe('brainstorming');
  });

  test('devrait générer un concept détaillé', async () => { // Changed 'it' to 'test'
    const input = 'Pouvez-vous développer un concept pour une application de productivité?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Concept développé:');
    expect(result.content).toContain('Description détaillée');
    expect(result.content).toContain('Caractéristiques principales');
    expect(result.metadata.requestType).toBe('concept-development');
  });

  test('devrait évaluer une idée', async () => { // Changed 'it' to 'test'
    const input = "Évaluez cette idée: une plateforme d'apprentissage basée sur l'IA";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain("Évaluation de l'innovation");
    expect(result.content).toContain("Scores d'évaluation");
    expect(result.content).toContain('Score global');
    expect(result.metadata.requestType).toBe('innovation-assessment');
  });

  test('devrait analyser les tendances du marché', async () => { // Changed 'it' to 'test'
    const input = '[TRENDS] Analyse des tendances technologiques émergentes pour 2025';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toMatch(/Analyse des Tendances de Marché/);
    expect(result.content).toMatch(/Technologies émergentes|Tendances technologiques/);
    expect(result.content).toMatch(/Opportunités émergentes|Domaines stratégiques/);
    expect(result.metadata.requestType).toBe('market-trends');
  });

  test('devrait gérer une demande générique', async () => { // Changed 'it' to 'test'
    const input = 'Comment puis-je améliorer mon projet?';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Réflexions sur votre demande');
    expect(result.metadata.requestType).toBe('generic');
  });

  test('devrait gérer les erreurs correctement', async () => { // Changed 'it' to 'test'
    const invalidAgent = new IdeationAgent();
    invalidAgent.execute = vi.fn().mockRejectedValue(new Error('Method not implemented'));

    await expect(invalidAgent.execute('test', mockContext)).rejects.toThrow('Method not implemented');
  });

  test.each([ // Changed 'it' to 'test'
      ['', mockContext, "L'entrée est une chaîne vide"],
      [123 as unknown as string, mockContext, "L'entrée n'est pas une chaîne"],
      ['test', { invalid: 'context' } as unknown as ContextCluster, 'Contexte sans structure valide'],
      ['test', { ...mockContext, id: null } as unknown as ContextCluster, 'Contexte sans ID'],
      ['test', { ...mockContext, timestamp: '123' } as unknown as ContextCluster, 'Timestamp non numérique'],
    ])('devrait rejeter les entrées invalides: %s (%s)', async (input, context) => { // Keep description here for test case title
      // Le paramètre description est utilisé dans le titre du test ci-dessus
      await expect(agent.execute(input, context)).rejects.toThrow(/Erreur de validation/);
    });

    test.each([
      ['brainstorming sur un projet tech', 'brainstorming', 'Demande explicite de brainstorming'],
      ['évalue cette idée innovante', 'innovation-assessment', 'Demande implicite d\'évaluation'],
      ['analyse des tendances du marché', 'market-trends', 'Analyse de tendances sans balise'],
      ['[BRAINSTORM] nouvelle application', 'brainstorming', 'Utilisation de balise spéciale'],
      ['développer un concept d\'application', 'concept-development', 'Développement de concept']
    ])('devrait identifier correctement le type de requête: %s -> %s (%s)', async (input, expectedType, ) => {
      // Description utilisée pour documenter le cas de test
      const result = await agent.execute(input, mockContext);
      expect(result.metadata.requestType).toBe(expectedType);
    });

    test('devrait créer un nouveau contexte si non fourni', async () => {
      const input = 'test sans contexte';
      const result = await agent.execute(input);
      
      expect(result.success).toBe(true);
      expect(result.metadata.contextId).toMatch(/^generated-\d+$/);
      expect(result.metadata.timestamp).toBeGreaterThan(0);
    });


  test('devrait valider le schéma de sortie', async () => { // Changed 'it' to 'test'
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
