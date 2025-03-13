import { describe, expect, vi, beforeEach, it } from 'vitest';
import type { ContextCluster } from '../../../types/context';
import { DesignAgent } from '../DesignAgent';

describe('DesignAgent', () => {
  let agent: DesignAgent;

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
    content: "Contexte de test pour l'agent de design",
    relatedClusters: [],
    shards: [],
    primaryShard: {
      id: 'test-shard',
      type: 'primary',
      content: 'Contexte de test',
      timestamp: Date.now(),
      complexityMetric: 0.7,
      innovationPotential: 0.8,
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
    complexityMetric: 0.7,
    innovationPotential: 0.8,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0',
    },
  };

  beforeEach(() => {
    agent = new DesignAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('design-agent');
    expect(agent.name).toBe('Agent de Design');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(4);
    expect(agent.capabilities).toContain('ui-design');
    expect(agent.capabilities).toContain('ux-analysis');
    expect(agent.capabilities).toContain('design-system');
    expect(agent.capabilities).toContain('visual-identity');
  });

  it('devrait analyser correctement une demande de design UI', async () => {
    const input = 'Créer une interface utilisateur pour cette application';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('design-agent');
    expect(result.content).toContain('Interface Utilisateur');
    expect(result.content).toContain('Style');
    expect(result.content).toContain('Navigation');
    expect(result.metadata.requestType).toBe('design');
  });

  it("devrait analyser correctement une demande d'analyse UX", async () => {
    const input = "Analyser l'expérience utilisateur de cette application";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Analyse UX');
    expect(result.content).toContain('Points forts');
    expect(result.content).toContain('Points à améliorer');
    expect(result.content).toContain("Score d'ergonomie");
    expect(result.metadata.requestType).toBe('ux-analysis');
  });

  it('devrait analyser correctement une demande de système de design', async () => {
    const input = 'Créer un système de design pour ce projet';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Système de Design');
    expect(result.content).toContain('Typographie');
    expect(result.content).toContain('Palette de couleurs');
    expect(result.content).toContain('Composants');
    expect(result.metadata.requestType).toBe('design');
  });

  it("devrait analyser correctement une demande d'identité visuelle", async () => {
    const input = 'Développer une identité visuelle pour cette marque';
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Identité Visuelle');
    expect(result.content).toContain('Logo');
    expect(result.content).toContain('Palette');
    expect(result.content).toContain('Typographie');
    expect(result.metadata.requestType).toBe('design');
  });

  it('devrait gérer une demande générique', async () => {
    const input = "Comment puis-je améliorer l'esthétique?";
    const result = await agent.execute(input, mockContext);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.content).toContain('Réflexion sur votre demande de design');
    expect(result.metadata.requestType).toBe('generic');
  });
});
