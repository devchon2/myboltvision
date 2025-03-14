import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DesignAgent } from '../lib/agents/DesignAgent.ts';

describe('DesignAgent Tests', () => {
  let agent: DesignAgent;

  beforeEach(() => {
    agent = new DesignAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('design-agent');
    expect(agent.name).toBe('Agent de Design');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toContain('ui-design');
    expect(agent.capabilities).toContain('ux-analysis');
  });
});
