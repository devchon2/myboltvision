import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DocumentationAgent } from '../lib/agents/DocumentationAgent.ts';

describe('DocumentationAgent Tests', () => {
  let agent: DocumentationAgent;

  beforeEach(() => {
    agent = new DocumentationAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('documentation-agent');
    expect(agent.name).toBe('Agent de Documentation');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toContain('api-documentation');
    expect(agent.capabilities).toContain('user-guides');
  });
});
