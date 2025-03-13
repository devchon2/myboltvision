import { WorkflowEngine } from '../lib/core/WorkflowEngine';
import type { Workflow, WorkflowStep } from '../types/types/workflow';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('WorkflowEngine Dependencies', () => {
  let workflowEngine: WorkflowEngine;

  beforeEach(() => {
    workflowEngine = new WorkflowEngine();
  });

  it('should execute steps in dependency order', async () => {
    const workflow: Workflow = {
      id: 'dependency-test',
      name: 'Dependency Workflow',
      steps: [
        { name: 'step-1', id: 'step-1' },
        { name: 'step-2', id: 'step-2', dependencies: ['step-1'] },
        { name: 'step-3', id: 'step-3', dependencies: ['step-2'] },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    const executeStepSpy = vi
      .spyOn(workflowEngine as any, 'executeStep')
      .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 10)));

    await workflowEngine.executeWorkflow(workflow.id);

    // Vérifier l'ordre d'exécution des étapes
    expect(executeStepSpy).toHaveBeenNthCalledWith(1, workflow.steps[0]);
    expect(executeStepSpy).toHaveBeenNthCalledWith(2, workflow.steps[1]);
    expect(executeStepSpy).toHaveBeenNthCalledWith(3, workflow.steps[2]);
  });

  it('should execute independent steps in parallel', async () => {
    const workflow: Workflow = {
      id: 'mixed-dependencies',
      name: 'Mixed Dependencies',
      steps: [
        { name: 'base-step', id: 'base-step' },
        { name: 'parallel-1', id: 'parallel-1', dependencies: ['base-step'], parallel: true },
        { name: 'parallel-2', id: 'parallel-2', dependencies: ['base-step'], parallel: true },
        { name: 'final-step', id: 'final-step', dependencies: ['parallel-1', 'parallel-2'] },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);
    let executionOrder: string[] = [];

    vi.spyOn(workflowEngine as any, 'executeStep').mockImplementation((...args: unknown[]) => {
      const step = args[0] as WorkflowStep;
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          executionOrder.push(step.id as string);
          resolve();
        }, 10);
      });
    });

    await workflowEngine.executeWorkflow(workflow.id);

    // Vérifier que base-step est exécuté en premier
    expect(executionOrder[0]).toBe('base-step');

    // Vérifier que parallel-1 et parallel-2 sont exécutés avant final-step
    expect(executionOrder.indexOf('parallel-1')).toBeLessThan(executionOrder.indexOf('final-step'));
    expect(executionOrder.indexOf('parallel-2')).toBeLessThan(executionOrder.indexOf('final-step'));

    // Vérifier que final-step est exécuté en dernier
    expect(executionOrder[3]).toBe('final-step');
  });

  it('should detect circular dependencies', async () => {
    const workflow: Workflow = {
      id: 'circular-deps',
      name: 'Circular Dependencies',
      steps: [
        { name: 'step-A', id: 'step-A', dependencies: ['step-C'] },
        { name: 'step-B', id: 'step-B', dependencies: ['step-A'] },
        { name: 'step-C', id: 'step-C', dependencies: ['step-B'] },
      ],
    };

    workflowEngine.addWorkflow(workflow.id, workflow);

    await expect(workflowEngine.executeWorkflow(workflow.id)).rejects.toThrow('Circular dependencies detected');
  });
});
