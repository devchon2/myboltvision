import { vi } from 'vitest';

interface ImportMetaEnv {
  DEV: boolean;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

interface RequestOptions extends RequestInit {
  networkError?: boolean;
}

export async function request(url: string, options: RequestOptions = {}): Promise<Response> {
  try {
    if (options.networkError) {
      throw new Error('Network Error');
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }

    throw error;
  }
}
