import React, { useEffect, useState } from 'react';
import { WorkflowEngine } from '../../lib/core/WorkflowEngine';
import type { Workflow } from '../../types/workflow';

export const WorkflowVisualizer: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const workflowEngine = new WorkflowEngine();

  useEffect(() => {
    // Fetch workflows from the engine or an API
    const fetchedWorkflows: Workflow[] = [
      {
        id: '1',
        name: 'Sample Workflow',
        description: 'This is a sample workflow',
        steps: [
          { name: 'Step 1', description: 'First step' },
          { name: 'Step 2', description: 'Second step' },
        ],
      },
    ];
    setWorkflows(fetchedWorkflows);
  }, []);

  const handleExecuteWorkflow = async (id: string) => {
    await workflowEngine.executeWorkflow(id);
    console.log(`Workflow ${id} executed`);
  };

  return (
    <div>
      <h1>Workflow Visualizer</h1>
      {workflows.map((workflow) => (
        <div key={workflow.id}>
          <h2>{workflow.name}</h2>
          <p>{workflow.description}</p>
          <ul>
            {workflow.steps.map((step, index) => (
              <li key={index}>
                {step.name}: {step.description}
              </li>
            ))}
          </ul>
          <button onClick={() => handleExecuteWorkflow(workflow.id)}>Execute Workflow</button>
        </div>
      ))}
    </div>
  );
};
