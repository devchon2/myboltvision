import { IdeationAgent } from './IdeationAgent.ts';
import { AutoBuilder } from '../core/auto-builder.js';
import { DeploymentAgent } from './DeploymentAgent.ts';
import { ContextManager } from '../core/ContextManager.js';
import type { AgentTask, ExecutionResult } from '../../types/agent.d.ts';

export class AutonomousAgent {
  constructor(
    public ideation: IdeationAgent,
    public builder: AutoBuilder,
    public deployment: DeploymentAgent,
    private contextManager = new ContextManager()
  ) {}

  async executePipeline(task: AgentTask): Promise<ExecutionResult> {
    const context = await this.contextManager.loadContext(task);
    
    const ideationResult = await this.ideation.execute(task.objective, context);
    
    const buildResult = await this.builder.buildFromSpec(ideationResult.content);
    const deployed = await this.deployment.deploy(buildResult);
    
    return this.generateReport(deployed);
  }

  private async generateReport(result: DeploymentResult): Promise<ExecutionResult> {
    return {
      ...result,
      documentation: await this.builder.generateDocs(result.codebase),
      performanceMetrics: await this.deployment.analyzePerformance(),
      costBreakdown: this.deployment.calculateCosts()
    };
  }
}

// Types
interface DeploymentResult {
  codebase: string;
  deploymentId: string;
  timestamp: Date;
}
