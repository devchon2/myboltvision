import React from 'react';
import { vi } from 'vitest';

// Mock simple du composant Markdown
const Markdown = vi.fn().mockImplementation(({ children }) => {
  return <div data-testid="mocked-markdown">{children}</div>;
});

export default Markdown;
