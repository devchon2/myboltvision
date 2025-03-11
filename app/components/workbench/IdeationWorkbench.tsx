import React, { useState, useEffect } from 'react';
import { runIdeationWorkflow } from '../../lib/examples/ideation-workflow';
import type { ContextShard } from '../../types/context';
import { Markdown } from '../chat/Markdown';

interface WorkbenchProps {
  initialIdea?: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  result?: any;
}

export const IdeationWorkbench: React.FC<WorkbenchProps> = ({ initialIdea = '' }) => {
  const [idea, setIdea] = useState<string>(initialIdea);
  const [context, setContext] = useState<ContextShard | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('idea');
  const [results, setResults] = useState<Record<string, any>>({});
  
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'ideation',
      name: 'Idéation',
      description: 'Génération et raffinement d\'idées',
      isActive: true,
      isCompleted: false
    },
    {
      id: 'market',
      name: 'Analyse de marché',
      description: 'Étude de la concurrence et des opportunités',
      isActive: false,
      isCompleted: false
    },
    {
      id: 'documentation',
      name: 'Documentation',
      description: 'Création des documents de projet',
      isActive: false,
      isCompleted: false
    },
    {
      id: 'design',
      name: 'Design',
      description: 'Création de wireframes et maquettes',
      isActive: false,
      isCompleted: false
    },
    {
      id: 'development',
      name: 'Développement',
      description: 'Génération de code et architecture',
      isActive: false,
      isCompleted: false
    },
    {
      id: 'deployment',
      name: 'Déploiement',
      description: 'Préparation au déploiement',
      isActive: false,
      isCompleted: false
    }
  ]);

  const handleIdeaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value);
  };

  const handleStartWorkflow = async () => {
    if (!idea.trim()) return;
    
    setIsProcessing(true);
    try {
      // Simule un appel à l'orchestrateur d'agents
      const workflowResults = await runIdeationWorkflow(idea);
      
      // Met à jour les résultats et marque l'étape comme complétée
      setResults(prev => ({ ...prev, ideation: workflowResults }));
      
      setWorkflowSteps(steps => steps.map(step => 
        step.id === 'ideation' 
          ? { ...step, isCompleted: true } 
          : step.id === 'market' 
            ? { ...step, isActive: true }
            : step
      ));
      
      setActiveView('results');
    } catch (error) {
      console.error('Erreur lors de l\'exécution du workflow:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const activateStep = (stepId: string) => {
    setWorkflowSteps(steps => steps.map(step => ({
      ...step,
      isActive: step.id === stepId
    })));
    setActiveView(stepId);
  };

  const renderStepContent = (stepId: string) => {
    switch (stepId) {
      case 'ideation':
        return (
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
        );
        
      case 'results':
        return (
          <div className="results-view">
            <h2>Résultats de l'idéation</h2>
            {results.ideation && (
              <div className="result-content">
                <Markdown content={JSON.stringify(results.ideation, null, 2)} />
              </div>
            )}
          </div>
        );
        
      case 'market':
        return (
          <div className="market-analysis">
            <h2>Analyse de marché</h2>
            <p>Cette section vous permettra d'analyser le marché, la concurrence et les opportunités pour votre projet.</p>
            <button 
              className="action-button"
              onClick={() => console.log('Lancement de l\'analyse de marché')}
            >
              Lancer l'analyse de marché
            </button>
          </div>
        );
        
      case 'documentation':
        return (
          <div className="documentation">
            <h2>Génération de documentation</h2>
            <p>Génération automatique de documents pour votre projet: business plan, cahier des charges, spécifications techniques...</p>
            <div className="doc-selector">
              <label>
                <input type="checkbox" value="business-plan" /> Business Plan
              </label>
              <label>
                <input type="checkbox" value="specs" /> Cahier des charges
              </label>
              <label>
                <input type="checkbox" value="technical" /> Documentation technique
              </label>
            </div>
            <button className="action-button">
              Générer les documents
            </button>
          </div>
        );
        
      case 'design':
        return (
          <div className="design-workspace">
            <h2>Espace de design</h2>
            <p>Créez des wireframes, maquettes et prototypes pour votre projet.</p>
            <div className="design-actions">
              <button className="action-button">Générer wireframes</button>
              <button className="action-button">Créer maquette haute-fidélité</button>
              <button className="action-button">Prototype interactif</button>
            </div>
            <div className="preview-area">
              <p>L'aperçu du design s'affichera ici</p>
            </div>
          </div>
        );
        
      case 'development':
        return (
          <div className="development">
            <h2>Développement</h2>
            <p>Génération de code et architecture pour votre projet.</p>
            <div className="tech-stack-selector">
              <h3>Sélectionnez votre stack technologique:</h3>
              <select>
                <option value="react">React</option>
                <option value="vue">Vue.js</option>
                <option value="angular">Angular</option>
                <option value="node">Node.js</option>
                <option value="python">Python</option>
              </select>
            </div>
            <button className="action-button">
              Générer l'architecture
            </button>
          </div>
        );
        
      case 'deployment':
        return (
          <div className="deployment">
            <h2>Déploiement</h2>
            <p>Préparation au déploiement de votre projet.</p>
            <div className="deployment-options">
              <h3>Options de déploiement:</h3>
              <select>
                <option value="vercel">Vercel</option>
                <option value="netlify">Netlify</option>
                <option value="aws">AWS</option>
                <option value="gcp">Google Cloud</option>
                <option value="azure">Azure</option>
              </select>
            </div>
            <button className="action-button">
              Préparer le déploiement
            </button>
          </div>
        );
        
      default:
        return <div>Sélectionnez une étape du workflow</div>;
    }
  };

  return (
    <div className="ideation-workbench">
      <div className="workbench-sidebar">
        <h2>Flux de travail</h2>
        <div className="workflow-steps">
          {workflowSteps.map(step => (
            <div 
              key={step.id}
              className={`workflow-step ${step.isActive ? 'active' : ''} ${step.isCompleted ? 'completed' : ''}`}
              onClick={() => step.isActive && activateStep(step.id)}
            >
              <div className="step-indicator">
                {step.isCompleted ? '✓' : step.id === 'ideation' ? '1' : step.id === 'market' ? '2' : step.id === 'documentation' ? '3' : step.id === 'design' ? '4' : step.id === 'development' ? '5' : '6'}
              </div>
              <div className="step-info">
                <h3>{step.name}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="workbench-content">
        {activeView === 'results' 
          ? renderStepContent('results')
          : renderStepContent(workflowSteps.find(s => s.id === activeView)?.id || 'ideation')}
      </div>
      
      <style>{`
        .ideation-workbench {
          display: flex;
          height: 100%;
          background-color: #f8f9fa;
        }
        
        .workbench-sidebar {
          width: 300px;
          padding: 20px;
          background-color: #212529;
          color: #fff;
          border-radius: 10px 0 0 10px;
        }
        
        .workbench-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }
        
        .workflow-step {
          display: flex;
          padding: 15px 10px;
          margin-bottom: 10px;
          border-radius: 6px;
          background-color: #343a40;
          opacity: 0.7;
          cursor: default;
        }
        
        .workflow-step.active {
          opacity: 1;
          background-color: #495057;
          cursor: pointer;
        }
        
        .workflow-step.completed {
          background-color: #0d6efd;
          opacity: 1;
        }
        
        .step-indicator {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #6c757d;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
        }
        
        .workflow-step.completed .step-indicator {
          background-color: #198754;
        }
        
        .idea-textarea {
          width: 100%;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 6px;
          border: 1px solid #ced4da;
          font-size: 16px;
          resize: vertical;
        }
        
        .start-button, .action-button {
          padding: 12px 24px;
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .start-button:hover, .action-button:hover {
          background-color: #0b5ed7;
        }
        
        .start-button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
        
        .doc-selector, .tech-stack-selector, .deployment-options {
          margin: 20px 0;
        }
        
        .doc-selector label {
          display: block;
          margin-bottom: 10px;
        }
        
        .design-actions {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .preview-area {
          height: 300px;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        
        select {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ced4da;
          width: 100%;
          max-width: 300px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};
