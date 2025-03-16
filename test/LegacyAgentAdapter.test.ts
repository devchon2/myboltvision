import { describe, it, expect, vi } from 'vitest';
import { 
  standardizeAgent, 
  createAgentFromFunction,
  AgentStandardizer 
} from '../lib/adapters/LegacyAgentAdapter';
import { standardizeAgentResult } from '../lib/adapters/AgentResultAdapter';
import type { Agent, AgentResult } from '../types/agent';
import { createMockContextShard } from './_mocks/contextMocks';

// Mock du standardizeAgentResult
vi.mock('../lib/adapters/AgentResultAdapter', () => ({
  standardizeAgentResult: vi.fn((result) => ({
    ...result,
    metadata: {
      ...(result.metadata || {}),
      standardized: true
    }
  }))
}));

describe('LegacyAgentAdapter', () => {
  // Mock de date pour garantir des IDs prévisibles
  const mockTime = 1678901234567;
  let originalDateNow: () => number;
  
  beforeEach(() => {
    originalDateNow = Date.now;
    Date.now = vi.fn(() => mockTime);
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    Date.now = originalDateNow;
  });

  describe('AgentStandardizer', () => {
    it('devrait initialiser avec les propriétés par défaut pour un agent minimal', () => {
      const minimalAgent = {};
      const standardized = new AgentStandardizer(minimalAgent);
      
      expect(standardized.id).toBe(`agent-${mockTime}`);
      expect(standardized.name).toBe('Agent non nommé');
      expect(standardized.description).toBe('Aucune description fournie');
      expect(standardized.capabilities).toEqual([]);
    });
    
    it('devrait préserver les propriétés existantes', () => {
      const fullAgent = {
        id: 'test-agent',
        name: 'Test Agent',
        description: 'A test agent',
        capabilities: ['testing']
      };
      
      const standardized = new AgentStandardizer(fullAgent);
      
      expect(standardized.id).toBe('test-agent');
      expect(standardized.name).toBe('Test Agent');
      expect(standardized.description).toBe('A test agent');
      expect(standardized.capabilities).toEqual(['testing']);
    });
    
    it('devrait retourner une erreur pour un agent sans méthode execute', async () => {
      const agentWithoutExecute = {};
      const standardized = new AgentStandardizer(agentWithoutExecute);
      
      const mockContext = createMockContextShard({ id: 'test-context' });
      
      const result = await standardized.execute('test input', mockContext);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Agent incompatible: pas de méthode execute');
      expect(result.content).toContain('Cet agent ne peut pas être exécuté');
    });
    
    it('devrait exécuter l\'agent source et standardiser le résultat', async () => {
      // Créer un agent source avec un mock d'execute
      const sourceResult = {
        agentId: 'test-agent',
        content: 'Test result',
        success: true
      };
      
      const sourceAgent = {
        id: 'test-agent',
        name: 'Test Agent',
        execute: vi.fn().mockResolvedValue(sourceResult)
      };
      
      const standardized = new AgentStandardizer(sourceAgent);
      const mockContext = createMockContextShard({ id: 'test-context' });
      
      const result = await standardized.execute('test input', mockContext);
      
      // Vérifier que l'agent source a été appelé
      expect(sourceAgent.execute).toHaveBeenCalledWith('test input', mockContext);
      
      // Vérifier que le résultat a été standardisé
      expect(standardizeAgentResult).toHaveBeenCalledWith(sourceResult);
      expect(result.metadata.standardized).toBe(true);
    });
    
    it('devrait gérer les erreurs lors de l\'exécution', async () => {
      // Agent qui lance une erreur
      const errorAgent = {
        id: 'error-agent',
        execute: vi.fn().mockRejectedValue(new Error('Test error'))
      };
      
      const standardized = new AgentStandardizer(errorAgent);
      const mockContext = createMockContextShard({ id: 'test-context' });
      
      const result = await standardized.execute('test input', mockContext);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
      expect(result.content).toContain('Erreur lors de l\'exécution de l\'agent');
    });
  });

  describe('standardizeAgent', () => {
    it('devrait retourner une instance de AgentStandardizer', () => {
      const agent = {
        id: 'test-agent',
        name: 'Test Agent'
      };
      
      const result = standardizeAgent(agent);
      
      expect(result).toBeInstanceOf(AgentStandardizer);
      expect(result.id).toBe('test-agent');
      expect(result.name).toBe('Test Agent');
      expect(result.execute).toBeInstanceOf(Function);
    });
  });

  describe('createAgentFromFunction', () => {
    it('devrait créer un agent à partir d\'une fonction', () => {
      const mockFn = vi.fn().mockResolvedValue('Function result');
      
      const agent = createAgentFromFunction(
        mockFn,
        'function-agent',
        'Function Agent',
        'An agent from a function',
        ['function']
      );
      
      expect(agent.id).toBe('function-agent');
      expect(agent.name).toBe('Function Agent');
      expect(agent.description).toBe('An agent from a function');
      expect(agent.capabilities).toEqual(['function']);
      expect(agent.execute).toBeInstanceOf(Function);
    });
    
    it('devrait exécuter la fonction et standardiser un résultat chaîne', async () => {
      const mockFn = vi.fn().mockResolvedValue('String result');
      
      const agent = createAgentFromFunction(
        mockFn, 
        'string-agent', 
        'String Result Agent'
      );
      
      const mockContext = createMockContextShard({ id: 'test-context' });
      
      const result = await agent.execute('test input', mockContext);
      
      expect(mockFn).toHaveBeenCalledWith('test input', mockContext);
      expect(standardizeAgentResult).toHaveBeenCalledWith(expect.objectContaining({
        agentId: 'string-agent',
        content: 'String result',
        success: true
      }));
    });
    
    it('devrait exécuter la fonction et standardiser un résultat objet', async () => {
      const fnResult = {
        content: 'Object result',
        success: false,
        error: 'Custom error'
      };
      
      const mockFn = vi.fn().mockResolvedValue(fnResult);
      
      const agent = createAgentFromFunction(
        mockFn, 
        'object-agent', 
        'Object Result Agent'
      );
      
      const mockContext = createMockContextShard({ id: 'test-context' });
      
      const result = await agent.execute('test input', mockContext);
      
      expect(mockFn).toHaveBeenCalledWith('test input', mockContext);
      expect(standardizeAgentResult).toHaveBeenCalledWith(expect.objectContaining({
        agentId: 'object-agent',
        content: 'Object result',
        success: false,
        error: 'Custom error'
      }));
    });
    
    it('devrait gérer les erreurs de fonction', async () => {
      const mockError = new Error('Function error');
      const mockFn = vi.fn().mockRejectedValue(mockError);
      
      const agent = createAgentFromFunction(
        mockFn, 
        'error-agent', 
        'Error Agent'
      );
      
      const mockContext = createMockContextShard({ id: 'test-context' });
      
      const result = await agent.execute('test input', mockContext);
      
      expect(standardizeAgentResult).toHaveBeenCalledWith(expect.objectContaining({
        agentId: 'error-agent',
        success: false,
        error: 'Function error',
        content: expect.stringContaining('Erreur lors de l\'exécution de l\'agent')
      }));
    });
    
    it('devrait utiliser des valeurs par défaut pour les paramètres optionnels', () => {
      const mockFn = vi.fn();
      
      const agent = createAgentFromFunction(mockFn, 'minimal-agent', 'Minimal Agent');
      
      expect(agent.description).toBe('Agent fonctionnel');
      expect(agent.capabilities).toEqual([]);
    });
  });
});
