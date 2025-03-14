import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IdeationAgent } from '../lib/agents/IdeationAgent.ts';

describe('IdeationAgent Tests', () => {
  let agent: IdeationAgent;

  beforeEach(() => {
    agent = new IdeationAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('ideation-agent');
    expect(agent.name).toBe('Agent d\'Idéation');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toContain('brainstorming');
    expect(agent.capabilities).toContain('concept-development');
  });
});
