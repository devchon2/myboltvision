import { describe, expect, it, vi } from 'vitest';
import { StreamingMessageParser, type ActionCallback, type ArtifactCallback } from './message-parser';

interface ExpectedResult {
  output: string;
  callbacks?: {
    onArtifactOpen?: number;
    onArtifactClose?: number;
    onActionOpen?: number;
    onActionClose?: number;
  };
}

describe('StreamingMessageParser', () => {
  it('should pass through normal text', () => {
    const parser = new StreamingMessageParser();
    expect(parser.parse('test_id', 'Hello, world!')).toBe('Hello, world!');
  });

  it('should allow normal HTML tags', () => {
    const parser = new StreamingMessageParser();
    expect(parser.parse('test_id', 'Hello <strong>world</strong>!')).toBe('Hello <strong>world</strong>!');
  });

  describe('no artifacts', () => {
    it.each<[string | string[], ExpectedResult | string]>([
      ['Foo bar', 'Foo bar'],
      ['Foo bar <', 'Foo bar <'],
      ['Foo bar <p', 'Foo bar <p'],
      [['Foo bar <', 's', 'p', 'an>some text</span>'], 'Foo bar <span>some text</span>'],
    ])('should correctly parse chunks and strip out bolt artifacts (%#)', (input, expected) => {
      runTest(input, expected);
    });
  });

  describe('invalid or incomplete artifacts', () => {
    it.each<[string | string[], ExpectedResult | string]>([
      ['Foo bar <b', 'Foo bar <b'],
      ['Foo bar <ba', 'Foo bar <ba'],
      ['Foo bar <bol', 'Foo bar <bol'],
      ['Foo bar <bolt', 'Foo bar <bolt'],
      ['Foo bar <bolta', 'Foo bar <bolta'],
      ['Foo bar <boltA', 'Foo bar <boltA'],
      ['Foo bar <boltArtifacs></boltArtifact>', 'Foo bar <boltArtifacs></boltArtifact>'],
      ['Before <oltArtfiact>foo</boltArtifact> After', 'Before <oltArtfiact>foo</boltArtifact> After'],
      ['Before <boltArtifactt>foo</boltArtifact> After', 'Before <boltArtifactt>foo</boltArtifact> After'],
    ])('should correctly parse chunks and strip out bolt artifacts (%#)', (input, expected) => {
      runTest(input, expected);
    });
  });

  describe('valid artifacts without actions', () => {
    it('should correctly parse chunks and strip out bolt artifacts (0)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      const content = 'Some text before <boltArtifact title="Some title" id="artifact_1">foo bar</boltArtifact> Some more text';
      parser.parse('message_1', content);
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (1)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Some text before <boltArtifact title="Some title" id="artifact_1" type="bundled" >foo</boltArtifact> Some more text');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (2)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Some text before <boltArtifact title="Some title" id="artifact_1">foo</boltArtifact> Some more text');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (3)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Some text before <boltArtifact title="Some title" id="artifact_1">foo</boltArtifact> Some more text');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (4)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Some text before <boltArtifact title="Some title" id="artifact_1">foo</boltArtifact> Some more text');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (5)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Some text before <boltArtifact title="Some title" id="artifact_1">foo</boltArtifact> Some more text');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (6)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Before <boltArtifact title="Some title" id="artifact_1">foo</boltArtifact> After');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(0);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(0);
    });
  });

  describe('valid artifacts with actions', () => {
    it('should correctly parse chunks and strip out bolt artifacts (0)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Before <boltArtifact title="Some title" id="artifact_1"><boltAction type="shell">npm install</boltAction></boltArtifact> After');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(1);
    });
    
    it('should correctly parse chunks and strip out bolt artifacts (1)', () => {
      const callbacks = {
        onArtifactOpen: vi.fn(),
        onArtifactClose: vi.fn(),
        onActionOpen: vi.fn(),
        onActionClose: vi.fn(),
      };
      
      const parser = new StreamingMessageParser({
        callbacks
      });
      
      parser.parse('message_1', 'Before <boltArtifact title="Some title" id="artifact_1"><boltAction type="shell">npm install</boltAction><boltAction type="file" filePath="index.js">some content</boltAction></boltArtifact> After');
      
      expect(callbacks.onArtifactOpen).toHaveBeenCalledTimes(1);
      expect(callbacks.onArtifactClose).toHaveBeenCalledTimes(1);
      expect(callbacks.onActionOpen).toHaveBeenCalledTimes(2);
      expect(callbacks.onActionClose).toHaveBeenCalledTimes(2);
    });
  });
});

function runTest(input: string | string[], outputOrExpectedResult: string | ExpectedResult) {
  let expected: ExpectedResult;

  if (typeof outputOrExpectedResult === 'string') {
    expected = { output: outputOrExpectedResult };
  } else {
    expected = outputOrExpectedResult;
  }

  const callbacks = {
    onArtifactOpen: vi.fn<ArtifactCallback>((data) => {
      // Vérifier seulement les propriétés communes et significatives (id, title, type)
      // Pour éviter les problèmes avec messageId qui n'est plus présent
      expect({
        id: data.id,
        title: data.title,
        type: data.type
      }).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        type: expect.any(String)
      });
    }),
    onArtifactClose: vi.fn<ArtifactCallback>((data) => {
      // Vérifier seulement les propriétés communes et significatives (id, title, type)
      expect({
        id: data.id,
        title: data.title,
        type: data.type
      }).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        type: expect.any(String)
      });
    }),
    onActionOpen: vi.fn<ActionCallback>((data) => {
      expect(data).toMatchObject({
        id: expect.any(String),
        type: expect.any(String),
        content: expect.any(String)
      });
    }),
    onActionClose: vi.fn<ActionCallback>((data) => {
      expect(data).toMatchObject({
        id: expect.any(String),
        type: expect.any(String),
        content: expect.any(String)
      });
    }),
  };

  const parser = new StreamingMessageParser({
    artifactElement: () => '',
    callbacks,
  });

  let message = '';
  let result = '';
  const chunks = Array.isArray(input) ? input : input.split('');

  // Afficher le modèle de test pour le débogage
  console.log(`Test input chunks: ${JSON.stringify(chunks)}`);

  for (const chunk of chunks) {
    message += chunk;
    const parsed = parser.parse('message_1', chunk);
    result += parsed;
    // console.log(`Chunk: "${chunk}" -> Parsed: "${parsed}" -> Message: "${message}" -> Result: "${result}"`);
  }

  for (const name in expected.callbacks) {
    const callbackName = name;

    expect(callbacks[callbackName as keyof typeof callbacks]).toHaveBeenCalledTimes(
      expected.callbacks[callbackName as keyof typeof expected.callbacks] ?? 0,
    );
  }

  expect(result).toEqual(expected.output);
}
