import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IdeationWorkbench } from '../IdeationWorkbench';
import { runIdeationWorkflow } from '../../../lib/examples/ideation-workflow';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Utilisation des mocks automatiques de Vitest
vi.mock('../../../lib/stores/workbench');
vi.mock('../../../lib/webcontainer');
vi.mock('../../../components/chat/Artifact');
vi.mock('../../../components/chat/Markdown');
vi.mock('../IdeationWorkbench');

// Mock de import.meta.hot
vi.mock('shiki', () => ({
  getHighlighter: vi.fn().mockResolvedValue({
    codeToHtml: vi.fn().mockReturnValue('<code>mock code</code>'),
  }),
}));

// Mock du module de workflow
vi.mock('../../../lib/examples/ideation-workflow', () => ({
  runIdeationWorkflow: vi.fn()
}));

describe('IdeationWorkbench', () => {
  beforeEach(() => {
    // Réinitialiser tous les mocks avant chaque test
    vi.clearAllMocks();
    
    // Mock par défaut pour runIdeationWorkflow
    (runIdeationWorkflow as any).mockResolvedValue({
      id: 'test-result',
      agentId: 'ideation-agent',
      content: 'Résultats du Brainstorming',
      timestamp: Date.now(),
      metadata: { requestType: 'brainstorming' },
      success: true
    });
  });
  
  it('devrait afficher correctement l\'interface initiale', () => {
    render(<IdeationWorkbench />);
    
    // Vérifier les éléments de l'interface
    expect(screen.getByText('Flux de travail')).toBeInTheDocument();
    expect(screen.getByText('Idéation')).toBeInTheDocument();
    expect(screen.getByText('Analyse de marché')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Développement')).toBeInTheDocument();
    expect(screen.getByText('Déploiement')).toBeInTheDocument();
    
    // Vérifier le formulaire d'idée
    expect(screen.getByText('Décrivez votre idée')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...')).toBeInTheDocument();
    expect(screen.getByText('Démarrer le processus d\'idéation')).toBeInTheDocument();
    expect(screen.getByText('Démarrer le processus d\'idéation')).toBeDisabled();
  });
  
  it('devrait activer le bouton lorsqu\'une idée est saisie', () => {
    render(<IdeationWorkbench />);
    
    const textarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    const button = screen.getByText('Démarrer le processus d\'idéation');
    
    // Au départ, le bouton est désactivé
    expect(button).toBeDisabled();
    
    // Saisir du texte dans le textarea
    fireEvent.change(textarea, { target: { value: 'Mon idée de test' } });
    
    // Maintenant le bouton devrait être activé
    expect(button).not.toBeDisabled();
  });
  
  it('devrait traiter une idée et afficher les résultats', async () => {
    render(<IdeationWorkbench />);
    
    // Saisir une idée
    const textarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    fireEvent.change(textarea, { target: { value: 'Mon idée de test' } });
    
    // Cliquer sur le bouton pour démarrer le processus
    const button = screen.getByText('Démarrer le processus d\'idéation');
    fireEvent.click(button);
    
    // Vérifier que le traitement est en cours
    expect(screen.getByText('Traitement en cours...')).toBeInTheDocument();
    
    // Attendre que le traitement soit terminé
    await waitFor(() => {
      expect(runIdeationWorkflow).toHaveBeenCalledWith('Mon idée de test');
    });
    
    // Vérifier que les résultats sont affichés
    await waitFor(() => {
      expect(screen.getByText('Résultats de l\'idéation')).toBeInTheDocument();
    });
  });
  
  it('devrait passer à une autre étape du workflow lorsqu\'on clique dessus', async () => {
    render(<IdeationWorkbench initialIdea="Idée initiale" />);
    
    // Démarrer le processus d'idéation pour activer les étapes
    const button = screen.getByText('Démarrer le processus d\'idéation');
    fireEvent.click(button);
    
    // Attendre que le traitement soit terminé
    await waitFor(() => {
      expect(runIdeationWorkflow).toHaveBeenCalled();
    });
    
    // Trouver l'étape d'analyse de marché par son titre h3
    const steps = screen.getAllByRole('heading', { level: 3 });
    const marketStep = steps.find(heading => heading.textContent === 'Analyse de marché');
    expect(marketStep).toBeTruthy();
    
    // Cliquer sur le conteneur parent de l'étape d'analyse de marché
    if (marketStep) {
      const workflowStepDiv = marketStep.closest('.workflow-step');
      if (workflowStepDiv) {
        fireEvent.click(workflowStepDiv);
      }
    }
    
    // Vérifier que la vue a changé en cherchant le titre de l'analyse de marché
    await waitFor(() => {
      const marketAnalysisTitle = screen.getByText('Analyse de marché', { selector: 'h2' });
      expect(marketAnalysisTitle).toBeInTheDocument();
      
      // Chercher une partie du texte de description
      const descriptionText = screen.getByText(/section vous permettra d'analyser le marché/i);
      expect(descriptionText).toBeInTheDocument();
    });
  });
  
  it('devrait initialiser avec une idée prédéfinie', () => {
    render(<IdeationWorkbench initialIdea="Mon idée prédéfinie" />);
    
    const textarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    expect(textarea).toHaveValue('Mon idée prédéfinie');
    
    // Le bouton devrait être activé puisqu'il y a déjà du texte
    const button = screen.getByText('Démarrer le processus d\'idéation');
    expect(button).not.toBeDisabled();
  });
  
  it('devrait gérer les erreurs lors du traitement du workflow', async () => {
    // Configurer le mock pour simuler une erreur
    (runIdeationWorkflow as any).mockRejectedValue(new Error('Erreur de test'));
    
    // Espionner console.error pour éviter les erreurs dans les logs de test
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<IdeationWorkbench />);
    
    // Saisir une idée
    const textarea = screen.getByPlaceholderText('Décrivez votre idée ou concept en quelques phrases...');
    fireEvent.change(textarea, { target: { value: 'Idée qui provoquera une erreur' } });
    
    // Cliquer sur le bouton pour démarrer le processus
    const button = screen.getByText('Démarrer le processus d\'idéation');
    fireEvent.click(button);
    
    // Attendre que le traitement soit terminé
    await waitFor(() => {
      expect(runIdeationWorkflow).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
    
    // Vérifier que le bouton est de nouveau disponible
    await waitFor(() => {
      expect(screen.getByText('Démarrer le processus d\'idéation')).toBeInTheDocument();
      expect(screen.getByText('Démarrer le processus d\'idéation')).not.toBeDisabled();
    });
    
    // Restaurer console.error
    consoleErrorSpy.mockRestore();
  });
});
