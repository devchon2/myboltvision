import { WorkflowEngine } from '../app/lib/core/WorkflowEngine';
import type { Workflow, WorkflowStep } from '../app/types/workflow';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('WorkflowEngine', () => {
  let workflowEngine: WorkflowEngine;

  beforeEach(() => {
    workflowEngine = new WorkflowEngine();
  });

  it('should add a workflow', () => {
    const workflow: Workflow = {
      id: '1',
      name: 'Sample Workflow',
      description: 'This is a sample workflow',
      steps: [
        { name: 'Step 1', description: 'First step' },
        { name: 'Step 2', description: 'Second step' },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    expect(workflowEngine['workflows'].get(workflow.id)).toEqual(workflow);
  });

  it('should execute a workflow', async () => {
    const workflow: Workflow = {
      id: '1',
      name: 'Sample Workflow',
      description: 'This is a sample workflow',
      steps: [
        { name: 'Step 1', description: 'First step' },
        { name: 'Step 2', description: 'Second step' },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    const executeStepSpy = vi.spyOn(workflowEngine as any, 'executeStep');

    await workflowEngine.executeWorkflow(workflow.id);

    expect(executeStepSpy).toHaveBeenCalledTimes(workflow.steps.length);
    workflow.steps.forEach((step, index) => {
      expect(executeStepSpy).toHaveBeenNthCalledWith(index + 1, step);
    });
  });

  it('should throw an error if workflow is not found', async () => {
    await expect(workflowEngine.executeWorkflow('non-existent-id')).rejects.toThrow('Workflow with id non-existent-id not found');
  });
});
