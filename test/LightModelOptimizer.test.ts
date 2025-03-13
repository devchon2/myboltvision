// @ts-nocheck
/// <reference types="vitest" />
import { LightModelOptimizer } from '../lib/core/LightModelOptimizer.ts';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

describe('LightModelOptimizer', () => {
  let optimizer: LightModelOptimizer;

  beforeEach(() => {
    optimizer = new LightModelOptimizer({});
  });

  it('should optimize text', () => {
    const text = 'This is a test text';
    const optimizedText = optimizer.optimize(text);
    expect(typeof optimizedText).toBe('string');
  });
});
