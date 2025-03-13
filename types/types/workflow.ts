export interface WorkflowStep {
  name: string;
  description?: string;
  parallel?: boolean;
  id?: string;
  dependencies?: string[];
  errorHandler?: string;
  continueOnError?: boolean;
  // Add other properties as needed
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
}
