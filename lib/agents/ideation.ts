import { LLMService } from '../core/llm-service.ts';
import { VectorDBIntegration } from '../core/vector-db-integration.ts';
import { AnalyticsEngine } from '../core/analytics-engine.ts';
import type { ProductConcept, ValidationReport, MarketTrends, ProjectContext } from '../types/agent.d.ts';

export class IdeationAgent {
  private llmService = new LLMService();
  private vectorDB = new VectorDBIntegration();
  private analyticsEngine = new AnalyticsEngine();

  async generateConcepts(task: AgentTask, context: ProjectContext): Promise<ProductConcept[]> {
    const prompt = `Génère 5 concepts de produits innovants basés sur l'objectif suivant : ${task.objective} et en tenant compte du contexte du projet : ${JSON.stringify(context)}`;
    return this.llmService.generate(prompt, { model: 'gpt-4-turbo' }) as Promise<ProductConcept[]>; // Assurez-vous que le modèle 'gpt-4-turbo' est disponible dans LLMService
  }

  async validateConcepts(concepts: ProductConcept[]): Promise<ValidationReport[]> {
    return Promise.all(concepts.map(async concept => {
      const analysis = await this.vectorDB.querySimilarProjects(concept.description);
      return this.analyticsEngine.analyzeFeasibility(concept, analysis);
    }));
  }
}
