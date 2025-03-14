import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DevAgent } from '../lib/agents/DevAgent.ts';

describe('DevAgent Tests', () => {
  let agent: DevAgent;

  beforeEach(() => {
    agent = new DevAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('dev-agent');
    expect(agent.name).toBe('Agent de Développement');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toContain('debugging');
    expect(agent.capabilities).toContain('code-generation');
  });
});
