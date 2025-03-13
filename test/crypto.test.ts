import { describe, it, expect, beforeEach, vi } from 'vitest';
import { encrypt, decrypt } from '../lib/crypto';

describe('crypto', () => {
  const testKey = '32-byte-long-test-key-1234567890'; // Clé de 32 bytes

  it('should encrypt and decrypt data correctly', async () => {
    const data = 'test-data';
    const encrypted = await encrypt(testKey, data);
    const decrypted = await decrypt(testKey, encrypted);
    expect(decrypted).toBe(data);
  });

  it('should handle errors during encryption', async () => {
    const invalidKey = 'invalid-key'; // Clé trop courte
    const data = 'test-data';
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(encrypt(invalidKey, data)).rejects.toThrow('Encryption failed');
    expect(console.error).toHaveBeenCalledWith('Encryption error:', expect.any(Error));
  });

  it('should handle errors during decryption', async () => {
    const encrypted = 'invalid-encrypted-data';
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(decrypt(testKey, encrypted)).rejects.toThrow('Decryption failed');
    expect(console.error).toHaveBeenCalledWith('Decryption error:', expect.any(Error));
  });
});
