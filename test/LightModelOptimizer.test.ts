import { LightModelOptimizer } from '../lib/core/LightModelOptimizer.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { LLMProvider } from '../types/llm.js';

describe('LightModelOptimizer', () => {
  let optimizer: LightModelOptimizer;

  beforeEach(() => {
    // Créer un mock de LLMProvider
    const mockProvider: LLMProvider = {
      getResponse: vi.fn().mockResolvedValue("Optimized response")
    };
    optimizer = new LightModelOptimizer(mockProvider);
  });

  it('should optimize text', () => {
    const text = 'This is a test text';
    const optimizedText = optimizer.optimize(text);
    expect(typeof optimizedText).toBe('string');
  });
});
