// @ts-nocheck
/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import WorkflowVisualizer from '../app/components/workflow/WorkflowVisualizer';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('WorkflowVisualizer', () => {
  it('should render', () => {
    render(<WorkflowVisualizer />);
    expect(screen.getByText('WorkflowVisualizer')).toBeInTheDocument();
  });
});
