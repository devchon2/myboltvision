import { describe, it, expect, beforeEach } from 'vitest';
import { DevAgent } from '../DevAgent.js';

describe('DevAgent', () => {
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
    expect(agent.capabilities).toContain('code-review');
    expect(agent.capabilities).toContain('refactoring');
    expect(agent.capabilities).toContain('testing');
  
  });
});
