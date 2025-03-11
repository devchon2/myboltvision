import React from 'react';
import { vi } from 'vitest';

// Mock simple du composant Artifact
export const Artifact = vi.fn().mockImplementation(({ children }) => {
  return <div data-testid="mocked-artifact">{children}</div>;
});

export default Artifact;
