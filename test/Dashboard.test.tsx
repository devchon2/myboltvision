import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '../app/components/dashboard/Dashboard';
import { Workbench } from '../app/components/workbench/Workbench';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

// Mocquer le composant Workbench pour qu'il retourne un texte "Workbench"
vi.mock('../app/components/workbench/Workbench', () => ({
  Workbench: () => <div>Workbench</div>,
}));

describe('Dashboard', () => {
  it('should render Dashboard component', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render Workbench component', () => {
    render(<Dashboard />);
    expect(screen.getByText('Workbench')).toBeInTheDocument();
  });
});
