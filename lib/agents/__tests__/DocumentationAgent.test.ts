import { describe, it, expect, beforeEach } from 'vitest';
import { DocumentationAgent } from '../DocumentationAgent.js';

describe('DocumentationAgent', () => {
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
