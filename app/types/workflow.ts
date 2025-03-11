export interface WorkflowStep {
  name: string;
  description?: string;
  // Add other properties as needed
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
}
