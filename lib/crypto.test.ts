import { encrypt, decrypt } from './crypto.js';

describe('Crypto Module', () => {
  const testKey = 'abcdefghijklmnop1234567890123456'; // 32 bytes
  const testData = 'This is a secret message';

  beforeAll(() => {
    // Vérifier que la clé a la bonne taille
    const keyBytes = new TextEncoder().encode(testKey);

    if (keyBytes.length !== 32) {
      throw new Error(`Test key must be exactly 32 bytes (got ${keyBytes.length})`);
    }
  });

  it('should encrypt and decrypt data correctly', async () => {
    const encrypted = await encrypt(testKey, testData);
    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe('string');

    const decrypted = await decrypt(testKey, encrypted);
    expect(decrypted).toBe(testData);
  });

  it('should throw error when decrypting with wrong key', async () => {
    const encrypted = await encrypt(testKey, testData);
    await expect(decrypt('wrong-key', encrypted)).rejects.toThrow('Decryption failed');
  });

  it('should throw error when decrypting invalid data', async () => {
    await expect(decrypt(testKey, 'invalid-base64')).rejects.toThrow('Decryption failed');
  });

  it('should throw error when encrypting with invalid key', async () => {
    await expect(encrypt('', testData)).rejects.toThrow('Encryption failed');

    await expect(encrypt('too-short-key', testData)).rejects.toThrow('Invalid key length');

    await expect(encrypt('this-key-is-too-long-and-will-fail', testData)).rejects.toThrow('Invalid key length');
  });
});
