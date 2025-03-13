
import { describe, it, expect } from 'vitest';
import { diff } from './diff.js';

describe('Diff', () => {
  it('should return empty diff if strings are equal', () => {
    const str1 = 'hello world';
    const str2 = 'hello world';
    const result = diff(str1, str2);
    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.unchanged).toEqual([str1]);
  });

  it('should return added lines', () => {
    const str1 = 'hello';
    const str2 = 'hello\nworld';
    const result = diff(str1, str2);
    expect(result.added).toEqual(['world']);
    expect(result.removed).toEqual([]);
    expect(result.unchanged).toEqual(['hello']);
  });

  it('should return removed lines', () => {
    const str1 = 'hello\nworld';
    const str2 = 'hello';
    const result = diff(str1, str2);
    expect(result.added).toEqual([]);
    expect(result.removed).toEqual(['world']);
    expect(result.unchanged).toEqual(['hello']);
  });

  it('should return added and removed lines', () => {
    const str1 = 'hello\nold world';
    const str2 = 'hello\nnew world';
    const result = diff(str1, str2);
    expect(result.added).toEqual(['new world']);
    expect(result.removed).toEqual(['old world']);
    expect(result.unchanged).toEqual(['hello']);
  });

  it('should handle empty strings', () => {
    const str1 = '';
    const str2 = 'hello';
    const result = diff(str1, str2);
    expect(result.added).toEqual(['hello']);
    expect(result.removed).toEqual([]);
    expect(result.unchanged).toEqual([]);
  });

  it('should handle empty strings 2', () => {
    const str1 = 'hello';
    const str2 = '';
    const result = diff(str1, str2);
    expect(result.added).toEqual([]);
    expect(result.removed).toEqual(['hello']);
    expect(result.unchanged).toEqual([]);
  });
});
