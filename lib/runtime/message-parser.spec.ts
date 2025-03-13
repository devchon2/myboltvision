import { describe, it, expect } from 'vitest';
import { StreamingMessageParser } from './message-parser.js';

type ExpectedResult = string;

describe('StreamingMessageParser', () => {
  it('should pass through normal text', () => {
    const parser = new StreamingMessageParser({});
    const result: string[] = [];
    parser.on('data', (data) => result.push(data));
    parser.write('hello world');
    expect(result).toEqual(['hello world']);
  });

  it('should handle JSON objects', () => {
    const parser = new StreamingMessageParser({});
    const result: string[] = [];
    parser.on('data', (data) => result.push(data));
    parser.write(JSON.stringify({ hello: 'world' }));
    expect(result).toEqual([JSON.stringify({ hello: 'world' })]);
  });

  it('should handle multiple writes', () => {
    const parser = new StreamingMessageParser({});
    const result: string[] = [];
    parser.on('data', (data) => result.push(data));
    parser.write('hello ');
    parser.write('world');
    expect(result).toEqual(['hello ', 'world']);
  });

  it('should handle newlines', () => {
    const parser = new StreamingMessageParser({});
    const result: string[] = [];
    parser.on('data', (data) => result.push(data));
    parser.write('hello\n');
    parser.write('world');
    expect(result).toEqual(['hello\n', 'world']);
  });
});
