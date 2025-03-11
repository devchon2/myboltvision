import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkflowVisualizer } from '../app/components/workflow/WorkflowVisualizer';
import { WorkflowEngine } from '../app/lib/core/WorkflowEngine';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../app/lib/core/WorkflowEngine');

describe('WorkflowVisualizer', () => {
  beforeEach(() => {
    vi.spyOn(WorkflowEngine.prototype, 'executeWorkflow').mockResolvedValue(undefined);
  });

  it('should render WorkflowVisualizer component', () => {
    render(<WorkflowVisualizer />);
    expect(screen.getByText('Workflow Visualizer')).toBeInTheDocument();
  });

  it('should render workflows', () => {
    render(<WorkflowVisualizer />);
    expect(screen.getByText('Sample Workflow')).toBeInTheDocument();
    expect(screen.getByText('This is a sample workflow')).toBeInTheDocument();
    expect(screen.getByText('Step 1: First step')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Second step')).toBeInTheDocument();
  });

  it('should execute workflow', async () => {
    render(<WorkflowVisualizer />);
    fireEvent.click(screen.getByText('Execute Workflow'));
    expect(WorkflowEngine.prototype.executeWorkflow).toHaveBeenCalledWith('1');
  });
});
