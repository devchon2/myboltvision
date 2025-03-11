import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Workbench } from '../app/components/workbench/Workbench';
import { IdeationAgent } from '../app/lib/agents/IdeationAgent';
import { MarketAnalysisAgent } from '../app/lib/agents/MarketAnalysisAgent';
import { DocumentationAgent } from '../app/lib/agents/DocumentationAgent';
import { DesignAgent } from '../app/lib/agents/DesignAgent';
import { DevAgent } from '../app/lib/agents/DevAgent';
import { DeploymentAgent } from '../app/lib/agents/DeploymentAgent';
import { ContextManager } from '../app/lib/core/ContextManager';
import { SecurityManager } from '../app/lib/security/SecurityManager';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mocking the prototype directly rather than using vi.mock()
const mockIdeationExecute = vi.fn().mockResolvedValue({
  success: true,
  agentId: 'ideation-agent',
  content: 'Idea 1\nIdea 2',
  metadata: {}
});

const mockMarketAnalysisExecute = vi.fn().mockResolvedValue({
  success: true,
  agentId: 'market-agent',
  content: 'Market analysis results',
  metadata: {}
});

const mockDocumentationExecute = vi.fn().mockResolvedValue({
  success: true,
  agentId: 'doc-agent',
  content: 'Documentation',
  metadata: {}
});

const mockDesignExecute = vi.fn().mockResolvedValue({
  success: true,
  agentId: 'design-agent',
  content: 'Design',
  metadata: {}
});

const mockDevExecute = vi.fn().mockResolvedValue({
  success: true,
  agentId: 'dev-agent',
  content: 'Development',
  metadata: {}
});

const mockDeployExecute = vi.fn().mockResolvedValue({
  success: true,
  agentId: 'deploy-agent',
  content: 'Deployment',
  metadata: {}
});

const mockFindRelevantContext = vi.fn().mockResolvedValue([{
  id: 'cluster1',
  type: 'type1',
  vectors: [{
    embedding: [0.1, 0.2, 0.3],
    metadata: {},
    content: 'Test vector content'
  }],
  primaryShard: {
    id: 'shard1',
    type: 'type1',
    data: 'data1',
    content: 'content1',
    timestamp: 'timestamp1',
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0'
    },
    complexityMetric: 0.5,
    innovationPotential: 0.8,
    relatedClusters: []
  },
  shards: [],
  data: {},
  content: 'cluster content',
  relatedClusters: [],
  timestamp: Date.now(),
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    version: '1.0'
  },
  complexityMetric: 0.5,
  innovationPotential: 0.8
}]);

// Mock all the required classes
vi.mock('../app/lib/agents/IdeationAgent', () => {
  return {
    IdeationAgent: vi.fn().mockImplementation(() => ({
      execute: mockIdeationExecute
    }))
  };
});

vi.mock('../app/lib/agents/MarketAnalysisAgent', () => {
  return {
    MarketAnalysisAgent: vi.fn().mockImplementation(() => ({
      execute: mockMarketAnalysisExecute
    }))
  };
});

vi.mock('../app/lib/agents/DocumentationAgent', () => {
  return {
    DocumentationAgent: vi.fn().mockImplementation(() => ({
      execute: mockDocumentationExecute
    }))
  };
});

vi.mock('../app/lib/agents/DesignAgent', () => {
  return {
    DesignAgent: vi.fn().mockImplementation(() => ({
      execute: mockDesignExecute
    }))
  };
});

vi.mock('../app/lib/agents/DevAgent', () => {
  return {
    DevAgent: vi.fn().mockImplementation(() => ({
      execute: mockDevExecute
    }))
  };
});

vi.mock('../app/lib/agents/DeploymentAgent', () => {
  return {
    DeploymentAgent: vi.fn().mockImplementation(() => ({
      execute: mockDeployExecute
    }))
  };
});

vi.mock('../app/lib/core/ContextManager', () => {
  return {
    ContextManager: vi.fn().mockImplementation(() => ({
      findRelevantContext: mockFindRelevantContext
    }))
  };
});

vi.mock('../app/lib/security/SecurityManager', () => {
  return {
    SecurityManager: vi.fn().mockImplementation(() => ({
      secureData: vi.fn().mockResolvedValue(undefined)
    }))
  };
});

describe('Workbench', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Workbench component', () => {
    render(<Workbench />);
    expect(screen.getByText(/Workbench/i)).toBeInTheDocument();
  });

  it('should generate ideas', async () => {
    render(<Workbench />);
    fireEvent.click(screen.getByText('Generate Ideas'));
    await waitFor(() => {
      expect(mockIdeationExecute).toHaveBeenCalled();
    });
  });

  it('should analyze market', async () => {
    render(<Workbench />);
    const analyzeMarketButton = screen.getByText('Analyze Market');
    fireEvent.click(analyzeMarketButton);
    await waitFor(() => {
      expect(mockMarketAnalysisExecute).toHaveBeenCalled();
    });
  });

  it('should generate documentation', async () => {
    render(<Workbench />);
    const generateDocumentationButton = screen.getByText('Generate Documentation');
    fireEvent.click(generateDocumentationButton);
    await waitFor(() => {
      expect(mockDocumentationExecute).toHaveBeenCalled();
    });
  });

  it('should generate design', async () => {
    render(<Workbench />);
    const generateDesignButton = screen.getByText('Generate Design');
    fireEvent.click(generateDesignButton);
    await waitFor(() => {
      expect(mockDesignExecute).toHaveBeenCalled();
    });
  });

  it('should develop', async () => {
    render(<Workbench />);
    const developButton = screen.getByText('Develop');
    fireEvent.click(developButton);
    await waitFor(() => {
      expect(mockDevExecute).toHaveBeenCalled();
    });
  });

  it('should deploy', async () => {
    render(<Workbench />);
    const deployButton = screen.getByText('Deploy');
    fireEvent.click(deployButton);
    await waitFor(() => {
      expect(mockDeployExecute).toHaveBeenCalled();
    });
  });
});
