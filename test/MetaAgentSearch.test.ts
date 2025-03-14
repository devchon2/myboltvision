import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MetaAgentSearch } from '../lib/agents/MetaAgentSearch.js';
import { ContextManager } from '../lib/core/ContextManager.js';

// Mock pour ContextManager
vi.mock('../lib/core/ContextManager.js', () => {
  return {
    ContextManager: vi.fn().mockImplementation(() => ({
      enrichContext: vi.fn().mockImplementation((input) => ({
        id: 'mock-context-id',
        type: 'mock',
        primaryShard: {
          id: 'mock-shard-id',
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
          parentContextId: 'mock-context-id',
        },
        data: {},
        content: input,
        vectors: [],
        relatedClusters: [],
        timestamp: Date.now(),
        complexityMetric: 0.75,
        innovationPotential: 0.85,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0.0',
        },
        shards: [],
      })),
      checkLiveCache: vi.fn(),
      purgeStaleCacheEntries: vi.fn(),
    })),
  };
});

describe('MetaAgentSearch', () => {
  let agent: MetaAgentSearch;

  beforeEach(() => {
    agent = new MetaAgentSearch();
  });

  it('devrait être correctement instancié avec les propriétés requises', () => {
    expect(agent).toBeInstanceOf(MetaAgentSearch);
    expect(agent.id).toBe('meta-agent-search');
    expect(agent.name).toBe("Agent de Méta-recherche");
    expect(agent.description).toBe("Orchestre les interactions entre agents et optimise les résultats");
    expect(agent.capabilities).toEqual(['agent-discovery', 'feedback-automation', 'conflict-resolution', 'agent-programming']);
  });

  it('devrait rejeter les entrées vides', async () => {
    await expect(agent.execute('')).rejects.toThrow("Erreur de validation: L'entrée doit être une chaîne non vide");
  });

  it('devrait analyser correctement les types de requêtes', () => {
    // Accès à la méthode privée pour les tests
    const analyzeRequestType = (agent as any).analyzeRequestType.bind(agent);
    
    expect(analyzeRequestType('[DISCOVER] Trouver des agents')).toBe('agent-discovery');
    expect(analyzeRequestType('[FEEDBACK] Evaluer performance')).toBe('feedback-automation');
    expect(analyzeRequestType('[CONFLICT] Résoudre conflit entre agents')).toBe('conflict-resolution');
    expect(analyzeRequestType('[PROGRAM] Créer un nouvel agent')).toBe('agent-programming');
    
    expect(analyzeRequestType('Je cherche un agent pour traiter des données')).toBe('agent-discovery');
    expect(analyzeRequestType('Générer du feedback pour mon agent')).toBe('feedback-automation');
    expect(analyzeRequestType('Il y a un conflit entre mes agents')).toBe('conflict-resolution');
    expect(analyzeRequestType('Pouvez-vous créer un nouvel agent pour moi?')).toBe('agent-programming');
    
    expect(analyzeRequestType('Bonjour comment ça va')).toBe('generic');
  });

  it('devrait retourner la découverte d\'agents pour une requête de type agent-discovery', async () => {
    const result = await agent.execute('Trouver des agents pour mon projet');
    
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('meta-agent-search');
    expect(result.metadata.requestType).toBe('agent-discovery');
    expect(result.content).toContain('Agents pertinents découverts');
    expect(result.content).toContain('Agent d\'Idéation');
    expect(result.content).toContain('Agent de Stratégie Business');
  });

  it('devrait retourner du feedback pour une requête de type feedback-automation', async () => {
    const result = await agent.execute('Générer du feedback pour mon agent');
    
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('meta-agent-search');
    expect(result.metadata.requestType).toBe('feedback-automation');
    expect(result.content).toContain('Feedback automatisé pour');
    expect(result.content).toContain('Score global');
  });

  it('devrait retourner une résolution de conflits pour une requête de type conflict-resolution', async () => {
    const result = await agent.execute('Résoudre le conflit entre mes agents');
    
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('meta-agent-search');
    expect(result.metadata.requestType).toBe('conflict-resolution');
    expect(result.content).toContain('Résolution des conflits');
    expect(result.content).toContain('Conflit');
    expect(result.content).toContain('Agents impliqués');
  });

  it('devrait retourner un template d\'agent pour une requête de type agent-programming', async () => {
    const result = await agent.execute('Programmer un nouvel agent pour mon projet');
    
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('meta-agent-search');
    expect(result.metadata.requestType).toBe('agent-programming');
    expect(result.content).toContain('Génération d\'un nouvel agent');
    expect(result.content).toContain('class CustomAgent implements Agent');
    expect(result.content).toContain('Instructions d\'implémentation');
  });

  it('devrait retourner une réponse générique pour une requête non spécifique', async () => {
    const result = await agent.execute('Bonjour, comment ça va?');
    
    expect(result.success).toBe(true);
    expect(result.agentId).toBe('meta-agent-search');
    expect(result.metadata.requestType).toBe('generic');
    expect(result.content).toContain('Analyse de votre demande');
    expect(result.content).toContain('Meta Agent Search peut vous aider');
  });
});
