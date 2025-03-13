import { WorkflowEngine } from '../lib/core/WorkflowEngine';
import type { Workflow, WorkflowStep } from '../types/types/workflow';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('WorkflowEngine', () => {
  let workflowEngine: WorkflowEngine;

  beforeEach(() => {
    workflowEngine = new WorkflowEngine();
  });

  describe('Basic Functionality', () => {
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
        expect(executeStepSpy).toHaveBeenNthCalledWith(index + 1, step, workflow, expect.anything());
      });
    });

    it('should throw an error if workflow is not found', async () => {
      await expect(workflowEngine.executeWorkflow('non-existent-id')).rejects.toThrow(
        'Workflow with id non-existent-id not found',
      );
    });

    it('should validate workflow steps before execution', async () => {
      const invalidWorkflow: Workflow = {
        id: 'invalid',
        name: 'Invalid Workflow',
        steps: [], // Empty steps array
      };

      workflowEngine.addWorkflow(invalidWorkflow.id, invalidWorkflow);
      await expect(workflowEngine.executeWorkflow(invalidWorkflow.id)).rejects.toThrow(
        'Workflow must have at least one step',
      );
    });

    it('should execute steps in parallel when specified', async () => {
      const parallelWorkflow: Workflow = {
        id: 'parallel',
        name: 'Parallel Workflow',
        steps: [
          { name: 'Step 1', parallel: true },
          { name: 'Step 2', parallel: true },
        ],
      };

      workflowEngine.addWorkflow(parallelWorkflow.id, parallelWorkflow);
      const executeStepSpy = vi
        .spyOn(workflowEngine as any, 'executeStep')
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      const startTime = Date.now();
      await workflowEngine.executeWorkflow(parallelWorkflow.id);
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(150); // Should execute in parallel (~100ms)
    });

    it('should execute steps sequentially by default', async () => {
      const sequentialWorkflow: Workflow = {
        id: 'sequential',
        name: 'Sequential Workflow',
        steps: [{ name: 'Step 1' }, { name: 'Step 2' }],
      };

      workflowEngine.addWorkflow(sequentialWorkflow.id, sequentialWorkflow);
      const executeStepSpy = vi
        .spyOn(workflowEngine as any, 'executeStep')
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      const startTime = Date.now();
      await workflowEngine.executeWorkflow(sequentialWorkflow.id);
      const duration = Date.now() - startTime;

      expect(duration).toBeGreaterThanOrEqual(200); // Should execute sequentially (~200ms)
    });
  });

  describe('Advanced Functionality', () => {
    it('should persist workflows', () => {
      const workflow: Workflow = {
        id: 'persist-test',
        name: 'Persist Workflow',
        description: 'This is a persist workflow',
        steps: [
          { name: 'Step 1', description: 'First step' },
          { name: 'Step 2', description: 'Second step' },
        ],
      };

      workflowEngine.addWorkflow(workflow.id, workflow);
      workflowEngine.persistWorkflows();
      const persistedWorkflows = workflowEngine.loadPersistedWorkflows();

      expect(persistedWorkflows.get(workflow.id)).toEqual(workflow);
    });

    it('should resume workflow execution after failure', async () => {
      const workflow: Workflow = {
        id: 'resume-test',
        name: 'Resume Workflow',
        description: 'This is a resume workflow',
        steps: [
          { name: 'Step 1', id: 'step-1' },
          { name: 'Step 2', id: 'step-2' },
          { name: 'Step 3', id: 'step-3' },
        ],
      };

      workflowEngine.addWorkflow(workflow.id, workflow);
      const executeStepSpy = vi.spyOn(workflowEngine as any, 'executeStep').mockImplementation((step: any) => {
        if (step.id === 'step-2') {
          throw new Error('Step 2 failed');
        }
        return Promise.resolve();
      });

      try {
        await workflowEngine.executeWorkflow(workflow.id);
      } catch (error) {
        // Ignorer l'erreur pour permettre la reprise
      }

      // Reprendre l'exécution après l'échec
      executeStepSpy.mockImplementation(() => Promise.resolve());
      await workflowEngine.resumeWorkflow(workflow.id);

      expect(executeStepSpy).toHaveBeenCalledTimes(3);
      expect(executeStepSpy).toHaveBeenNthCalledWith(3, workflow.steps[2]);
    });

    it('should track workflow progress', async () => {
      const workflow: Workflow = {
        id: 'progress-test',
        name: 'Progress Workflow',
        description: 'This is a progress workflow',
        steps: [
          { name: 'Step 1', id: 'step-1' },
          { name: 'Step 2', id: 'step-2' },
        ],
      };

      workflowEngine.addWorkflow(workflow.id, workflow);
      const progressSpy = vi.fn();
      workflowEngine.onProgress(progressSpy);

      await workflowEngine.executeWorkflow(workflow.id);

      expect(progressSpy).toHaveBeenCalledTimes(2);
      expect(progressSpy).toHaveBeenNthCalledWith(1, { step: workflow.steps[0], progress: 50 });
      expect(progressSpy).toHaveBeenNthCalledWith(2, { step: workflow.steps[1], progress: 100 });
    });
  });
});
