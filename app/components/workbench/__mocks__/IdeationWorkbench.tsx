import React, { useState } from 'react';
import { vi } from 'vitest';
import { runIdeationWorkflow } from '../../../lib/examples/ideation-workflow';

// Mock simplifié du composant IdeationWorkbench
export const IdeationWorkbench: React.FC<{ initialIdea?: string }> = ({ initialIdea = '' }) => {
  const [idea, setIdea] = useState<string>(initialIdea);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('ideation');
  
  const handleIdeaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value);
  };

  const handleStartWorkflow = async () => {
    if (!idea.trim()) return;
    setIsProcessing(true);
    
    try {
      // Appelle réellement la fonction mockée dans les tests
      await runIdeationWorkflow(idea);
      setActiveView('results');
    } catch (error) {
      console.error('Erreur lors du traitement:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const activateStep = (stepId: string) => {
    setActiveView(stepId);
  };

  return (
    <div className="ideation-workbench">
      <div className="workbench-sidebar">
        <h2>Flux de travail</h2>
        <div className="workflow-steps">
          <div 
            className="workflow-step active"
            onClick={() => activateStep('ideation')}
          >
            <div className="step-indicator">1</div>
            <div className="step-info">
              <h3>Idéation</h3>
              <p>Génération et raffinement d'idées</p>
            </div>
          </div>
          <div 
            className="workflow-step"
            onClick={() => activateStep('market')}
          >
            <div className="step-indicator">2</div>
            <div className="step-info">
              <h3>Analyse de marché</h3>
              <p>Étude de la concurrence et des opportunités</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-indicator">3</div>
            <div className="step-info">
              <h3>Documentation</h3>
              <p>Création des documents de projet</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-indicator">4</div>
            <div className="step-info">
              <h3>Design</h3>
              <p>Création de wireframes et maquettes</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-indicator">5</div>
            <div className="step-info">
              <h3>Développement</h3>
              <p>Génération de code et architecture</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-indicator">6</div>
            <div className="step-info">
              <h3>Déploiement</h3>
              <p>Préparation au déploiement</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="workbench-content">
        {activeView === 'ideation' ? (
          <div className="ideation-input">
            <h2>Décrivez votre idée</h2>
            <textarea
              value={idea}
              onChange={handleIdeaChange}
              placeholder="Décrivez votre idée ou concept en quelques phrases..."
              rows={5}
              className="idea-textarea"
              disabled={isProcessing}
            />
            <button 
              onClick={handleStartWorkflow}
              disabled={!idea.trim() || isProcessing}
              className="start-button"
            >
              {isProcessing ? 'Traitement en cours...' : 'Démarrer le processus d\'idéation'}
            </button>
          </div>
        ) : activeView === 'results' ? (
          <div className="results-view">
            <h2>Résultats de l'idéation</h2>
            <div className="result-content">
              <pre>Contenu des résultats simulés pour les tests</pre>
            </div>
          </div>
        ) : activeView === 'market' ? (
          <div className="market-analysis">
            <h2>Analyse de marché</h2>
            <p>Cette section vous permettra d'analyser le marché, la concurrence et les opportunités pour votre projet.</p>
            <button className="action-button">
              Lancer l'analyse de marché
            </button>
          </div>
        ) : (
          <div>Contenu de l'étape {activeView}</div>
        )}
      </div>
    </div>
  );
};
