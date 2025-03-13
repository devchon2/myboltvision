const encoder = new TextEncoder();
const decoder = new TextDecoder();
const IV_LENGTH = 16;

export async function encrypt(key: string, data: string): Promise<string> {
  try {
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const cryptoKey = await getKey(key);

    const ciphertext = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv,
      },
      cryptoKey,
      encoder.encode(data),
    );

    const bundle = new Uint8Array(IV_LENGTH + ciphertext.byteLength);
    bundle.set(new Uint8Array(ciphertext));
    bundle.set(iv, ciphertext.byteLength);

    return arrayBufferToBase64(bundle.buffer);
  } catch (error) {
    console.error('Encryption error:', error);

    const message = error instanceof Error ? error.message : 'Unknown encryption error';
    throw new Error(`Encryption failed: ${message}`);
  }
}

export async function decrypt(key: string, payload: string): Promise<string> {
  try {
    const bundle = base64ToArrayBuffer(payload);
    const iv = new Uint8Array(bundle.buffer, bundle.byteLength - IV_LENGTH);
    const ciphertext = new Uint8Array(bundle.buffer, 0, bundle.byteLength - IV_LENGTH);

    const cryptoKey = await getKey(key);

    const plaintext = await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv,
      },
      cryptoKey,
      ciphertext,
    );

    return decoder.decode(plaintext);
  } catch (error) {
    console.error('Decryption error:', error);

    const message = error instanceof Error ? error.message : 'Unknown decryption error';
    throw new Error(`Decryption failed: ${message}`);
  }
}

async function getKey(key: string): Promise<CryptoKey> {
  if (!key || key.length === 0) {
    throw new Error('Invalid key: key cannot be empty');
  }

  try {
    const keyBuffer = encoder.encode(key);

    // Vérifier que la clé a une taille valide (16, 24 ou 32 octets)
    if (![16, 24, 32].includes(keyBuffer.length)) {
      throw new Error(`Invalid key length: ${keyBuffer.length} bytes. Key must be 16, 24 or 32 bytes`);
    }

    return await crypto.subtle.importKey('raw', keyBuffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
  } catch (error) {
    console.error('Key import error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Key import failed: ${message}`);
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
