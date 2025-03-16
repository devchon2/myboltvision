// @ts-nocheck
/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import WorkflowVisualizer from '../app/components/workflow/WorkflowVisualizer';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkflowVisualizer } from '../app/components/workflow/WorkflowVisualizer';
import { WorkflowEngine } from '../app/lib/core/WorkflowEngine';


vi.mock('../app/lib/core/WorkflowEngine');

describe('WorkflowVisualizer', () => {
  beforeEach(() => {
    WorkflowEngine.mockClear();
  });

  it('should render', () => {
    render(<WorkflowVisualizer />);
    expect(screen.getByText('Workflow Visualizer')).toBeInTheDocument();
  });

  it('should display workflow details', () => {
    render(<WorkflowVisualizer />);
    expect(screen.getByText('Sample Workflow')).toBeInTheDocument();
    expect(screen.getByText('This is a sample workflow')).toBeInTheDocument();
    expect(screen.getByText('Step 1: First step')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Second step')).toBeInTheDocument();
  });

  it('should execute workflow when button is clicked', async () => {
    render(<WorkflowVisualizer />);
    const executeButton = screen.getByText('Execute Workflow');
    fireEvent.click(executeButton);

    await waitFor(() => {
      expect(WorkflowEngine).toHaveBeenCalledTimes(1);
    });

    const workflowEngineInstance = WorkflowEngine.mock.instances[0];
    expect(workflowEngineInstance.executeWorkflow).toHaveBeenCalledWith('1');
  });
});
