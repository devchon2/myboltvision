import { WorkflowEngine } from '../lib/core/WorkflowEngine';
import type { Workflow, WorkflowStep } from '../types/types/workflow';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('WorkflowEngine Hooks', () => {
  let workflowEngine: WorkflowEngine;

  beforeEach(() => {
    workflowEngine = new WorkflowEngine();
  });

  it('should call beforeWorkflow and afterWorkflow hooks', async () => {
    const beforeWorkflowSpy = vi.fn();
    const afterWorkflowSpy = vi.fn();

    workflowEngine.setHooks({
      beforeWorkflow: beforeWorkflowSpy,
      afterWorkflow: afterWorkflowSpy,
    });

    const workflow: Workflow = {
      id: 'hooks-test',
      name: 'Hooks Test Workflow',
      steps: [{ name: 'Step 1', id: 'step-1' }],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    await workflowEngine.executeWorkflow(workflow.id);

    expect(beforeWorkflowSpy).toHaveBeenCalledWith(workflow, expect.any(Object));
    expect(afterWorkflowSpy).toHaveBeenCalledWith(workflow, expect.any(Object));
    expect(beforeWorkflowSpy).toHaveBeenCalledBefore(afterWorkflowSpy);
  });

  it('should call beforeStep and afterStep hooks for each step', async () => {
    const beforeStepSpy = vi.fn();
    const afterStepSpy = vi.fn();

    workflowEngine.setHooks({
      beforeStep: beforeStepSpy,
      afterStep: afterStepSpy,
    });

    const workflow: Workflow = {
      id: 'step-hooks-test',
      name: 'Step Hooks Workflow',
      steps: [
        { name: 'Step 1', id: 'step-1' },
        { name: 'Step 2', id: 'step-2' },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    await workflowEngine.executeWorkflow(workflow.id);

    expect(beforeStepSpy).toHaveBeenCalledTimes(2);
    expect(afterStepSpy).toHaveBeenCalledTimes(2);

    workflow.steps.forEach((step, index) => {
      expect(beforeStepSpy).toHaveBeenNthCalledWith(index + 1, step, workflow);
      expect(afterStepSpy).toHaveBeenNthCalledWith(index + 1, step, workflow);
    });
  });

  it('should allow hook to modify workflow context', async () => {
    const workflowContext = { results: {} };

    workflowEngine.setHooks({
      beforeStep: (step, workflow, context = {}) => {
        if (context.results) {
          context.results[step.id!] = { status: 'running' };
        }
      },
      afterStep: (step, workflow, context = {}) => {
        if (context.results) {
          context.results[step.id!] = { status: 'completed' };
        }
      },
    });

    const workflow: Workflow = {
      id: 'context-test',
      name: 'Context Workflow',
      steps: [
        { name: 'Step 1', id: 'step-1' },
        { name: 'Step 2', id: 'step-2' },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    await workflowEngine.executeWorkflow(workflow.id, workflowContext);

    expect(workflowContext.results['step-1']).toEqual({ status: 'completed' });
    expect(workflowContext.results['step-2']).toEqual({ status: 'completed' });
  });

  it('should abort workflow if beforeWorkflow hook throws error', async () => {
    const errorMessage = 'Workflow preconditions not met';
    const beforeWorkflowSpy = vi.fn().mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const executeStepSpy = vi.spyOn(workflowEngine as any, 'executeStep');

    workflowEngine.setHooks({
      beforeWorkflow: beforeWorkflowSpy,
    });

    const workflow: Workflow = {
      id: 'abort-workflow',
      name: 'Abort Workflow',
      steps: [{ name: 'Step 1', id: 'step-1' }],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);

    await expect(workflowEngine.executeWorkflow(workflow.id)).rejects.toThrow(errorMessage);

    expect(executeStepSpy).not.toHaveBeenCalled();
  });

  it('should continue workflow execution if step hook throws error and continueOnStepError is true', async () => {
    const errorMessage = 'Step hook error';
    const beforeStepSpy = vi.fn().mockImplementation((step) => {
      if (step.id === 'step-1') {
        throw new Error(errorMessage);
      }
    });

    workflowEngine.setHooks({
      beforeStep: beforeStepSpy,
      continueOnStepError: true,
    });

    const workflow: Workflow = {
      id: 'continue-on-error',
      name: 'Continue On Error',
      steps: [
        { name: 'Step 1', id: 'step-1' },
        { name: 'Step 2', id: 'step-2' },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);

    // Ne devrait pas lancer d'erreur car continueOnStepError=true
    await workflowEngine.executeWorkflow(workflow.id);

    // Devrait avoir essayé d'exécuter step-2 malgré l'erreur de step-1
    expect(beforeStepSpy).toHaveBeenCalledTimes(2);
  });
});
