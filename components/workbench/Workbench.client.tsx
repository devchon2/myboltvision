'use client';

import { useStore } from '@nanostores/react';
import React, { useState } from 'react';
import { workbenchStore } from '../../lib/stores/workbench';
import { createScopedLogger } from '../../utils/logger';

const logger = createScopedLogger('Workbench');

interface WorkbenchProps {
  chatStarted?: boolean;
  isStreaming?: boolean;
}

/**
 * Version simplifiée du Workbench pour la migration Next.js
 * Cette version est un "stub" qui sera progressivement complété
 */
export const Workbench: React.FC<WorkbenchProps> = ({ chatStarted, isStreaming }) => {
  const [activePanel, setActivePanel] = useState<'editor' | 'git' | 'terminal'>('editor');

  // @ts-ignore: Ignorer temporairement l'erreur de type pendant la migration
  const workbench = useStore(workbenchStore);
  const activePath = workbench.activePath;
  const files = workbench.files;

  const SimplePlaceholder = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
    <div className={className || 'p-4 border rounded my-2 bg-gray-50'}>
      {children || 'Composant en cours de migration...'}
    </div>
  );

  // Afficher un message différent selon l'état du chat
  const renderWorkbenchContent = () => {
    if (!chatStarted) {
      return (
        <div className="flex items-center justify-center h-full text-center p-4">
          <div>
            <div className="text-5xl mb-4 opacity-40">🖥️</div>
            <h3 className="font-semibold mb-2">Workbench</h3>
            <p className="text-sm text-gray-500">
              Une fois la conversation démarrée, vos fichiers et projets apparaîtront ici
            </p>
          </div>
        </div>
      );
    }

    if (isStreaming) {
      return (
        <div className="p-4">
          <div className="animate-pulse mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="rounded-lg border p-4 bg-gray-50">
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Traitement en cours...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4">
        <div className="panel-tabs mb-4 border-b">
          <div className="flex">
            <button
              className={`px-4 py-2 ${activePanel === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActivePanel('editor')}
            >
              Éditeur
            </button>
            <button
              className={`px-4 py-2 ${activePanel === 'git' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActivePanel('git')}
            >
              Git
            </button>
            <button
              className={`px-4 py-2 ${activePanel === 'terminal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActivePanel('terminal')}
            >
              Terminal
            </button>
          </div>
        </div>

        <div className="panel-content">
          {activePanel === 'editor' && (
            <div className="rounded-lg border p-4">
              {activePath ? (
                <>
                  <div className="mb-2 text-sm text-gray-600 border-b pb-2">{activePath}</div>
                  <div className="min-h-[200px] bg-gray-100 p-2 rounded font-mono text-sm whitespace-pre overflow-auto">
                    {files[activePath] || '// Contenu du fichier non disponible'}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Aucun fichier sélectionné</p>
                </div>
              )}
            </div>
          )}

          {activePanel === 'git' && <SimplePlaceholder>Visualiseur Git - En cours de migration</SimplePlaceholder>}

          {activePanel === 'terminal' && <SimplePlaceholder>Terminal - En cours de migration</SimplePlaceholder>}
        </div>
      </div>
    );
  };

  return (
    <div className="workbench border-l border-gray-200 flex flex-col h-full">
      <div className="flex-1 overflow-auto">{renderWorkbenchContent()}</div>
    </div>
  );
};

export default Workbench;
