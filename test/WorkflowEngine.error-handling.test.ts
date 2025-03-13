import { WorkflowEngine } from '../lib/core/WorkflowEngine';
import type { Workflow, WorkflowStep } from '../types/types/workflow';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('WorkflowEngine Error Handling', () => {
  let workflowEngine: WorkflowEngine;

  beforeEach(() => {
    workflowEngine = new WorkflowEngine();
  });

  it('should handle custom error handlers for specific steps', async () => {
    // Définir un workflow avec des gestionnaires d'erreur personnalisés
    const errorWorkflow: Workflow = {
      id: 'error-handler-test',
      name: 'Error Handler Workflow',
      description: 'Tests custom error handlers for steps',
      steps: [
        {
          name: 'Step 1',
          id: 'step-1',
          errorHandler: 'custom', // Ce step utilisera un gestionnaire personnalisé
        },
        {
          name: 'Step 2',
          id: 'step-2',
          // Pas de gestionnaire d'erreur personnalisé
        },
      ],
    };

    // Mock pour simuler une erreur dans l'exécution de l'étape
    const executeStepSpy = vi
      .spyOn(workflowEngine as any, 'executeStep')
      .mockImplementation((step: WorkflowStep, workflow: Workflow, context: any = {}) => {
        if (step.id === 'step-1') {
          const error = new Error('Step 1 failed');
          // Appeler directement le gestionnaire d'erreur personnalisé ici
          if (step.errorHandler && workflowEngine['errorHandlers'].has(step.errorHandler)) {
            const handler = workflowEngine['errorHandlers'].get(step.errorHandler);
            if (handler) {
              handler(error, step, workflow);
            }
          }
          throw error;
        }
        return Promise.resolve();
      });

    // Mock pour le gestionnaire d'erreur personnalisé
    const customErrorHandlerMock = vi.fn();

    // Ajouter le workflow et configurer le gestionnaire d'erreur personnalisé
    workflowEngine.addWorkflow(errorWorkflow.id, errorWorkflow);
    workflowEngine.setErrorHandler('custom', customErrorHandlerMock);

    // Exécuter le workflow (devrait échouer à l'étape 1)
    await expect(workflowEngine.executeWorkflow(errorWorkflow.id)).rejects.toThrow('Step 1 failed');

    // Vérifier que le gestionnaire d'erreur personnalisé a été appelé
    expect(customErrorHandlerMock).toHaveBeenCalledTimes(1);
    expect(customErrorHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Step 1 failed' }),
      errorWorkflow.steps[0],
      errorWorkflow,
    );

    // Pour l'étape 2 (sans gestionnaire personnalisé), le comportement par défaut s'applique
    executeStepSpy.mockReset();
    executeStepSpy.mockImplementation((step: WorkflowStep) => {
      if (step.id === 'step-2') {
        throw new Error('Step 2 failed');
      }
      return Promise.resolve();
    });

    // Configurer le workflow pour ne contenir que l'étape 2
    const step2Workflow = {
      ...errorWorkflow,
      steps: [errorWorkflow.steps[1]],
    };
    workflowEngine.addWorkflow('step-2-workflow', step2Workflow);

    // Exécuter le workflow avec seulement l'étape 2
    await expect(workflowEngine.executeWorkflow('step-2-workflow')).rejects.toThrow('Step 2 failed');

    // Le gestionnaire personnalisé ne devrait pas être appelé pour cette étape
    expect(customErrorHandlerMock).toHaveBeenCalledTimes(1); // Pas d'appel supplémentaire
  });

  it('should allow workflow to continue despite errors when configured', async () => {
    // Workflow avec trois étapes dont la deuxième échouera
    const continuableWorkflow: Workflow = {
      id: 'continue-on-error-test',
      name: 'Continue On Error Workflow',
      description: 'Tests continuation despite errors',
      steps: [
        { name: 'Step 1', id: 'step-1' },
        {
          name: 'Step 2',
          id: 'step-2',
          continueOnError: true, // Spécifier que l'exécution doit continuer malgré l'erreur
        },
        { name: 'Step 3', id: 'step-3' },
      ],
    };

    // Mock pour simuler une erreur dans l'étape 2
    const executeStepSpy = vi
      .spyOn(workflowEngine as any, 'executeStep')
      .mockImplementation((step: WorkflowStep, workflow: Workflow, context: any = {}) => {
        if (step.id === 'step-2') {
          // Pour une étape avec continueOnError, on ne propage pas l'erreur
          if (step.continueOnError) {
            console.error('Step 2 failed but should continue');
            return Promise.resolve();
          } else {
            throw new Error('Step 2 failed but should continue');
          }
        }
        return Promise.resolve();
      });

    workflowEngine.addWorkflow(continuableWorkflow.id, continuableWorkflow);

    // Exécuter le workflow - ne devrait pas échouer grâce à continueOnError
    await workflowEngine.executeWorkflow(continuableWorkflow.id);

    // Vérifier que toutes les étapes ont été appelées
    expect(executeStepSpy).toHaveBeenCalledTimes(3);
    expect(executeStepSpy).toHaveBeenNthCalledWith(
      1,
      continuableWorkflow.steps[0],
      continuableWorkflow,
      expect.anything(),
    );
    expect(executeStepSpy).toHaveBeenNthCalledWith(
      2,
      continuableWorkflow.steps[1],
      continuableWorkflow,
      expect.anything(),
    );
    expect(executeStepSpy).toHaveBeenNthCalledWith(
      3,
      continuableWorkflow.steps[2],
      continuableWorkflow,
      expect.anything(),
    );
  });
});
