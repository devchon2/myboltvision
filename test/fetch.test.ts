import { describe, it, expect, beforeEach, vi } from 'vitest';
import { request } from '../lib/fetch';

describe('fetch', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should make a successful request', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify([{ id: 1, title: 'Test' }]), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    );

    const response = await request('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual([{ id: 1, title: 'Test' }]);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle request errors', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Request failed')));

    await expect(
      request('https://invalid-url.com', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    ).rejects.toThrow('Request failed');

    expect(console.error).toHaveBeenCalledWith('Request failed');
    expect(fetch).toHaveBeenCalledWith('https://invalid-url.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should handle network errors', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    await expect(
      request('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    ).rejects.toThrow('Network Error');

    expect(console.error).toHaveBeenCalledWith('Network Error');
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
