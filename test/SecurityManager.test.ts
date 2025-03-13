// @ts-nocheck
/// <reference types="vitest" />
import { SecurityManager } from '../lib/security/SecurityManager.ts';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

describe('SecurityManager', () => {
  let securityManager: SecurityManager;

  beforeEach(() => {
    securityManager = new SecurityManager();
  });

  it('should sanitize text', () => {
    const text = '<script>alert("test")</script>';
    const sanitizedText = securityManager.sanitize(text);
    expect(typeof sanitizedText).toBe('string');
  });
});
