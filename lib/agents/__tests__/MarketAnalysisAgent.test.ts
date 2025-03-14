import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MarketAnalysisAgent } from '../MarketAnalysisAgent.js';

describe('MarketAnalysisAgent', () => {
  let agent: MarketAnalysisAgent;

  beforeEach(() => {
    agent = new MarketAnalysisAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('market-analysis-agent');
    expect(agent.name).toBe('Agent d\'Analyse de Marché');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toContain('competitive-analysis');
    expect(agent.capabilities).toContain('trend-identification');
  });
});
