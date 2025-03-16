import { describe, it, expect, beforeEach } from 'vitest';
import { DeploymentAgent } from '../DeploymentAgent.js';

describe('DeploymentAgent', () => {
  let agent: DeploymentAgent;

  beforeEach(() => {
    agent = new DeploymentAgent();
  });

  it('devrait être correctement initialisé avec les propriétés attendues', () => {
    expect(agent.id).toBe('deployment-agent');
    expect(agent.name).toBe('Agent de Déploiement');
    expect(agent.description).toBeDefined();
    expect(agent.capabilities).toHaveLength(3);
    expect(agent.capabilities).toContain('deployment');
    expect(agent.capabilities).toContain('rollback');
  });
});
