import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IdeationWorkbench } from '../app/components/workbench/IdeationWorkbench';
import '@testing-library/jest-dom';
import { runIdeationWorkflow } from '../app/lib/examples/ideation-workflow';
import { runMarketAnalysisWorkflow } from '../app/lib/examples/market-analysis-workflow';
import { runDocumentationWorkflow } from '../app/lib/examples/documentation-workflow';
import { runDesignWorkflow } from '../app/lib/examples/design-workflow';
import { runDevelopmentWorkflow } from '../app/lib/examples/development-workflow';
import { runDeploymentWorkflow } from '../app/lib/examples/deployment-workflow';

// Mock the workflow functions
vi.mock('../app/lib/examples/ideation-workflow', () => ({
  runIdeationWorkflow: vi.fn().mockResolvedValue({}),
}));
vi.mock('../app/lib/examples/market-analysis-workflow', () => ({
  runMarketAnalysisWorkflow: vi.fn().mockResolvedValue({}),
}));
vi.mock('../app/lib/examples/documentation-workflow', () => ({
  runDocumentationWorkflow: vi.fn().mockResolvedValue({}),
}));
vi.mock('../app/lib/examples/design-workflow', () => ({
  runDesignWorkflow: vi.fn().mockResolvedValue({}),
}));
vi.mock('../app/lib/examples/development-workflow', () => ({
  runDevelopmentWorkflow: vi.fn().mockResolvedValue({}),
}));
vi.mock('../app/lib/examples/deployment-workflow', () => ({
  runDeploymentWorkflow: vi.fn().mockResolvedValue({}),
}));

// Mock the workbench store
vi.mock('../app/lib/stores/workbench', () => ({
  workbenchStore: {
    showWorkbench: { get: () => false, set: vi.fn() },
    currentView: { get: () => 'code', set: vi.fn() },
    unsavedFiles: { get: () => new Set(), set: vi.fn() },
    actionAlert: { get: () => undefined, set: vi.fn() },
    artifacts: { get: () => ({}), set: vi.fn() },
    previews: { get: () => ({}), set: vi.fn() },
    files: { get: () => ({}), set: vi.fn() },
    currentDocument: { get: () => undefined, set: vi.fn() },
    selectedFile: { get: () => undefined, set: vi.fn() },
    firstArtifact: undefined,
    filesCount: 0,
    showTerminal: { get: () => false, set: vi.fn() },
    boltTerminal: { get: () => undefined, set: vi.fn() },
    alert: { get: () => undefined, set: vi.fn() },
    clearAlert: vi.fn(),
    toggleTerminal: vi.fn(),
    attachTerminal: vi.fn(),
    attachBoltTerminal: vi.fn(),
    onTerminalResize: vi.fn(),
    setDocuments: vi.fn(),
    setShowWorkbench: vi.fn(),
    setCurrentDocumentContent: vi.fn(),
    setCurrentDocumentScrollPosition: vi.fn(),
    setSelectedFile: vi.fn(),
    saveFile: vi.fn(),
    saveCurrentDocument: vi.fn(),
    resetCurrentDocument: vi.fn(),
    saveAllFiles: vi.fn(),
    getFileModifications: vi.fn(),
    resetAllFileModifications: vi.fn(),
    abortAllActions: vi.fn(),
    setReloadedMessages: vi.fn(),
    addArtifact: vi.fn(),
    updateArtifact: vi.fn(),
    addAction: vi.fn(),
    runAction: vi.fn(),
    downloadZip: vi.fn(),
    syncFiles: vi.fn(),
    pushToGitHub: vi.fn(),
    addToExecutionQueue: vi.fn(),
  },
}));

vi.mock('../app/components/chat/Artifact', () => ({
  Artifact: () => <div data-testid="artifact-mock" />,
}));

describe('IdeationWorkbench', () => {
  it('should render the component', () => {
    render(<IdeationWorkbench />);
    expect(screen.getByText("Décrivez votre idée")).toBeInTheDocument();
  });

  it('should call runIdeationWorkflow with the idea when the button is clicked', async () => {
    render(<IdeationWorkbench />);
    const textarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const button = screen.getByText("Démarrer le processus d'idéation");

    fireEvent.change(textarea, { target: { value: 'My great idea' } });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(runIdeationWorkflow).toHaveBeenCalledWith('My great idea');
  });

  it('should call runMarketAnalysisWorkflow when the button is clicked', async () => {
    render(<IdeationWorkbench />);
    const ideationTextarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const ideationButton = screen.getByText("Démarrer le processus d'idéation");

    fireEvent.change(ideationTextarea, { target: { value: 'My great idea' } });
    await act(async () => {
      fireEvent.click(ideationButton);
    });

    const marketAnalysisButton = await screen.findByText("Lancer l'analyse de marché");
    await act(async () => {
      fireEvent.click(marketAnalysisButton);
    });

    expect(runMarketAnalysisWorkflow).toHaveBeenCalled();
  });

  it('should call runDocumentationWorkflow when the button is clicked', async () => {
    render(<IdeationWorkbench />);
    const ideationTextarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const ideationButton = screen.getByText("Démarrer le processus d'idéation");

    fireEvent.change(ideationTextarea, { target: { value: 'My great idea' } });
    await act(async () => {
      fireEvent.click(ideationButton);
    });

    const marketAnalysisButton = await screen.findByText("Lancer l'analyse de marché");
    await act(async () => {
      fireEvent.click(marketAnalysisButton);
    });

    const documentationButton = await screen.findByText("Générer les documents");
    await act(async () => {
      fireEvent.click(documentationButton);
    });

    expect(runDocumentationWorkflow).toHaveBeenCalled();
  });

  it('should call runDesignWorkflow when the button is clicked', async () => {
    render(<IdeationWorkbench />);
    const ideationTextarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const ideationButton = screen.getByText("Démarrer le processus d'idéation");

    fireEvent.change(ideationTextarea, { target: { value: 'My great idea' } });
    await act(async () => {
      fireEvent.click(ideationButton);
    });

    const marketAnalysisButton = await screen.findByText("Lancer l'analyse de marché");
    await act(async () => {
      fireEvent.click(marketAnalysisButton);
    });

    const documentationButton = await screen.findByText("Générer les documents");
    await act(async () => {
      fireEvent.click(documentationButton);
    });

    const designButton = await screen.findByText("Générer wireframes");
    await act(async () => {
      fireEvent.click(designButton);
    });

    expect(runDesignWorkflow).toHaveBeenCalled();
  });

  it('should call runDevelopmentWorkflow when the button is clicked', async () => {
    render(<IdeationWorkbench />);
    const ideationTextarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const ideationButton = screen.getByText("Démarrer le processus d'idéation");

    fireEvent.change(ideationTextarea, { target: { value: 'My great idea' } });
    await act(async () => {
      fireEvent.click(ideationButton);
    });

    const marketAnalysisButton = await screen.findByText("Lancer l'analyse de marché");
    await act(async () => {
      fireEvent.click(marketAnalysisButton);
    });

    const documentationButton = await screen.findByText("Générer les documents");
    await act(async () => {
      fireEvent.click(documentationButton);
    });

    const designButton = await screen.findByText("Générer wireframes");
    await act(async () => {
      fireEvent.click(designButton);
    });

    const developmentButton = await screen.findByText("Générer l'architecture");
    await act(async () => {
      fireEvent.click(developmentButton);
    });

    expect(runDevelopmentWorkflow).toHaveBeenCalled();
  });

  it('should call runDeploymentWorkflow when the button is clicked', async () => {
    render(<IdeationWorkbench />);
    const ideationTextarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const ideationButton = screen.getByText("Démarrer le processus d'idéation");

    fireEvent.change(ideationTextarea, { target: { value: 'My great idea' } });
    await act(async () => {
      fireEvent.click(ideationButton);
    });

    const marketAnalysisButton = await screen.findByText("Lancer l'analyse de marché");
    await act(async () => {
      fireEvent.click(marketAnalysisButton);
    });

    const documentationButton = await screen.findByText("Générer les documents");
    await act(async () => {
      fireEvent.click(documentationButton);
    });

    const designButton = await screen.findByText("Générer wireframes");
    await act(async () => {
      fireEvent.click(designButton);
    });

    const developmentButton = await screen.findByText("Générer l'architecture");
    await act(async () => {
      fireEvent.click(developmentButton);
    });

    const deploymentButton = await screen.findByText("Préparer le déploiement");
    await act(async () => {
      fireEvent.click(deploymentButton);
    });

    expect(runDeploymentWorkflow).toHaveBeenCalled();
  });
});
