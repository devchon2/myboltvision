import React from 'react';
import { IdeationAgent } from '../../lib/agents/IdeationAgent';
import { MarketAnalysisAgent } from '../../lib/agents/MarketAnalysisAgent';
import { DocumentationAgent } from '../../lib/agents/DocumentationAgent';
import { DesignAgent } from '../../lib/agents/DesignAgent';
import { DevAgent } from '../../lib/agents/DevAgent';
import { DeploymentAgent } from '../../lib/agents/DeploymentAgent';
import { ContextManager } from '../../lib/core/ContextManager';
import { SecurityManager } from '../../lib/security/SecurityManager';

export const Workbench: React.FC = () => {
  const contextManager = new ContextManager();
  const ideationAgent = new IdeationAgent();
  const marketAnalysisAgent = new MarketAnalysisAgent();
  const documentationAgent = new DocumentationAgent();
  const designAgent = new DesignAgent();
  const devAgent = new DevAgent();
  const deploymentAgent = new DeploymentAgent();
  const securityManager = new SecurityManager();

  const handleGenerateIdeas = async () => {
    const context = await contextManager.findRelevantContext([0, 0, 0, 0, 0]);
    if (context && context[0]) { // Vérification de context et context[0]
      await securityManager.secureData(context[0]);
      const ideas = await ideationAgent.execute("Generate Ideas", context[0]);
      console.log(ideas);
    } else {
      console.error("Context is null or empty.");
    }
  };

  const handleAnalyzeMarket = async () => {
    try {
      const context = await contextManager.findRelevantContext([0, 0, 0, 0, 0]);
      if (context && context[0]) { // Vérification de context et context[0]
        await securityManager.secureData(context[0]);
        const analysis = await marketAnalysisAgent.execute("Analyze Market", context[0]);
        console.log(analysis);
      } else {
        console.error("Context is null or empty.");
      }
    } catch (error) {
      console.error("Error in handleAnalyzeMarket:", error);
    }
  };

  const handleGenerateDocumentation = async () => {
    try {
      const context = await contextManager.findRelevantContext([0, 0, 0, 0, 0]);
      if (context && context[0]) { // Vérification de context et context[0]
        await securityManager.secureData(context[0]);
        const documentation = await documentationAgent.execute("Generate Documentation", context[0]);
        console.log(documentation);
      } else {
        console.error("Context is null or empty.");
      }
    } catch (error) {
      console.error("Error in handleGenerateDocumentation:", error);
    }
  };

  const handleGenerateDesign = async () => {
    try {
      const context = await contextManager.findRelevantContext([0, 0, 0, 0, 0]);
      if (context && context[0]) { // Vérification de context et context[0]
        await securityManager.secureData(context[0]);
        const design = await designAgent.execute("Generate Design", context[0]);
        console.log(design);
      } else {
        console.error("Context is null or empty.");
      }
    } catch (error) {
      console.error("Error in handleGenerateDesign:", error);
    }
  };

  const handleDevelop = async () => {
    try {
      const context = await contextManager.findRelevantContext([0, 0, 0, 0, 0]);
      if (context && context[0]) { // Vérification de context et context[0]
        await securityManager.secureData(context[0]);
        const development = await devAgent.execute("Develop", context[0]);
        console.log(development);
      } else {
        console.error("Context is null or empty.");
      }
    } catch (error) {
      console.error("Error in handleDevelop:", error);
    }
  };

  const handleDeploy = async () => {
    try {
      const context = await contextManager.findRelevantContext([0, 0, 0, 0, 0]);
      if (context && context[0]) { // Vérification de context et context[0]
        await securityManager.secureData(context[0]);
        const deployment = await deploymentAgent.execute("Deploy", context[0]);
        console.log(deployment);
      } else {
        console.error("Context is null or empty.");
      }
    } catch (error) {
      console.error("Error in handleDeploy:", error);
    }
  };

  return (
    <div>
      <h1>Workbench</h1>
      <button onClick={handleGenerateIdeas}>Generate Ideas</button>
      <button onClick={handleAnalyzeMarket}>Analyze Market</button>
      <button onClick={handleGenerateDocumentation}>Generate Documentation</button>
      <button onClick={handleGenerateDesign}>Generate Design</button>
      <button onClick={handleDevelop}>Develop</button>
      <button onClick={handleDeploy}>Deploy</button>
    </div>
  );
};
