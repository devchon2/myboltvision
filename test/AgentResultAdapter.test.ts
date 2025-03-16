import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  standardizeAgentResult, 
  enrichAgentResult,
  createAgentResult 
} from '../lib/adapters/AgentResultAdapter';
import type { AgentResult } from '../types/agent';

describe('AgentResultAdapter', () => {
  // Mock de date pour garantir des timestamps prévisibles dans les tests
  const mockTime = 1678901234567;
  let originalDateNow: () => number;
  
  beforeEach(() => {
    originalDateNow = Date.now;
    Date.now = vi.fn(() => mockTime);
  });
  
  afterEach(() => {
    Date.now = originalDateNow;
  });

  describe('standardizeAgentResult', () => {
    it('devrait ajouter les propriétés manquantes à un résultat partiel', () => {
      const partialResult = {
        agentId: 'test-agent',
        content: 'Test content'
      };
      
      const standardized = standardizeAgentResult(partialResult);
      
      expect(standardized.agentId).toBe('test-agent');
      expect(standardized.content).toBe('Test content');
      expect(standardized.success).toBe(true);
      expect(standardized.metadata).toBeDefined();
      expect(standardized.metadata.timestamp).toBe(mockTime);
      expect(standardized.metadata.id).toMatch(/^result-\d+$/);
    });
    
    it('devrait préserver les propriétés existantes', () => {
      const result = {
        agentId: 'test-agent',
        content: 'Test content',
        success: false,
        error: 'Test error',
        metadata: {
          custom: 'value',
          timestamp: 12345,
          id: 'custom-id'
        }
      };
      
      const standardized = standardizeAgentResult(result);
      
      expect(standardized.agentId).toBe('test-agent');
      expect(standardized.content).toBe('Test content');
      expect(standardized.success).toBe(false);
      expect(standardized.error).toBe('Test error');
      expect(standardized.metadata.custom).toBe('value');
      expect(standardized.metadata.timestamp).toBe(12345);
      expect(standardized.metadata.id).toBe('custom-id');
    });
    
    it('devrait utiliser des valeurs par défaut pour les propriétés manquantes', () => {
      const minimalResult = {};
      
      const standardized = standardizeAgentResult(minimalResult);
      
      expect(standardized.agentId).toBe('unknown-agent');
      expect(standardized.content).toBe('');
      expect(standardized.success).toBe(true);
      expect(standardized.error).toBeUndefined();
    });
  });

  describe('enrichAgentResult', () => {
    it('devrait ajouter des métadonnées supplémentaires à un résultat', () => {
      const result: AgentResult = {
        agentId: 'test-agent',
        content: 'Test content',
        success: true,
        metadata: {
          existing: 'data'
        }
      };
      
      const additionalMetadata = {
        confidence: 0.95,
        source: 'external-api'
      };
      
      const enriched = enrichAgentResult(result, additionalMetadata);
      
      expect(enriched.agentId).toBe('test-agent');
      expect(enriched.content).toBe('Test content');
      expect(enriched.success).toBe(true);
      expect(enriched.metadata.existing).toBe('data');
      expect(enriched.metadata.confidence).toBe(0.95);
      expect(enriched.metadata.source).toBe('external-api');
      expect(enriched.metadata.enrichedAt).toBe(mockTime);
    });
    
    it('devrait préserver l\'immuabilité du résultat original', () => {
      const result: AgentResult = {
        agentId: 'test-agent',
        content: 'Test content',
        success: true,
        metadata: {
          existing: 'data'
        }
      };
      
      const additionalMetadata = {
        new: 'data'
      };
      
      const enriched = enrichAgentResult(result, additionalMetadata);
      
      // Vérifier que l'original n'a pas été modifié
      expect(result.metadata.new).toBeUndefined();
      expect(result.metadata.enrichedAt).toBeUndefined();
      
      // Vérifier que l'enrichi contient les nouvelles données
      expect(enriched.metadata.new).toBe('data');
      expect(enriched.metadata.enrichedAt).toBe(mockTime);
    });
  });

  describe('createAgentResult', () => {
    it('devrait créer un résultat d\'agent complet avec les paramètres fournis', () => {
      const result = createAgentResult(
        'test-creator',
        'Created content',
        true,
        { source: 'test' },
        undefined
      );
      
      expect(result.agentId).toBe('test-creator');
      expect(result.content).toBe('Created content');
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.metadata.source).toBe('test');
      expect(result.metadata.timestamp).toBe(mockTime);
      expect(result.metadata.id).toMatch(/^result-\d+$/);
    });
    
    it('devrait créer un résultat d\'erreur lorsque spécifié', () => {
      const result = createAgentResult(
        'test-creator',
        'Error content',
        false,
        { source: 'test' },
        'Test error message'
      );
      
      expect(result.agentId).toBe('test-creator');
      expect(result.content).toBe('Error content');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error message');
    });
    
    it('devrait utiliser des valeurs par défaut lorsque non spécifiées', () => {
      const result = createAgentResult('test-agent', 'Minimal content');
      
      expect(result.agentId).toBe('test-agent');
      expect(result.content).toBe('Minimal content');
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(result.metadata).toEqual(expect.objectContaining({
        timestamp: mockTime,
        id: expect.stringMatching(/^result-\d+$/)
      }));
    });
  });
});
