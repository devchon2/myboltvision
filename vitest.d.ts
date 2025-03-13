/// <reference types="vitest" />

// Cette syntaxe permet d'augmenter la portée globale
export {};

declare global {
  const vi: typeof import('vitest')['vi'];
  const describe: typeof import('vitest')['describe'];
  const it: typeof import('vitest')['it'];
  const test: typeof import('vitest')['test'];
  const expect: typeof import('vitest')['expect'];
  const beforeEach: typeof import('vitest')['beforeEach'];
  const afterEach: typeof import('vitest')['afterEach'];
}
