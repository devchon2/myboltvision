'use client';

import { useStore } from '@nanostores/react';
import React, { useState, useEffect } from 'react';
import { workbenchStore } from '../../lib/stores/workbench';
import { createScopedLogger } from '../../utils/logger';
import { CodeEditor } from '../editor/CodeEditor';
import { GitViewer } from '../git/GitViewer';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

const logger = createScopedLogger('Workbench');

interface WorkbenchProps {
  projectPath?: string;
  className?: string;
}

export const Workbench: React.FC<WorkbenchProps> = ({ projectPath, className = '' }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activePanel, setActivePanel] = useState<'editor' | 'git' | 'terminal'>('editor');
  const workbench = useStore(workbenchStore);
  const activePath = workbench.activePath;
  const files = workbench.files;

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleFileChange = (content: string) => {
    if (activePath) {
      // Simuler la mise à jour du fichier dans le store
      const updatedFiles = { ...files };
      updatedFiles[activePath] = content;

      /*
       * Normalement, vous auriez une méthode comme workbenchStore.updateFile
       * Pour cet exemple, nous allons juste logger l'action
       */
      logger.debug(`File updated: ${activePath}`, { size: content.length });
    }
  };

  // Déterminer le langage du fichier actif basé sur son extension
  const getLanguage = (path: string | null): string => {
    if (!path) {
      return 'javascript';
    }

    if (path.endsWith('.js')) {
      return 'javascript';
    }

    if (path.endsWith('.jsx')) {
      return 'javascript';
    }

    if (path.endsWith('.ts')) {
      return 'typescript';
    }

    if (path.endsWith('.tsx')) {
      return 'typescript';
    }

    if (path.endsWith('.html')) {
      return 'html';
    }

    if (path.endsWith('.css')) {
      return 'css';
    }

    if (path.endsWith('.json')) {
      return 'json';
    }

    if (path.endsWith('.md')) {
      return 'markdown';
    }

    return 'javascript';
  };

  return (
    <div className={`workbench-container ${className}`}>
      <Header onMenuToggle={toggleSidebar} title="Bolt Workbench" />

      <div className="workbench-layout">
        <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />

        <main className="workbench-main">
          <div className="panel-tabs">
            <button
              className={`panel-tab ${activePanel === 'editor' ? 'active' : ''}`}
              onClick={() => setActivePanel('editor')}
            >
              <span className="i-ph:code" />
              <span>Éditeur</span>
            </button>
            <button
              className={`panel-tab ${activePanel === 'git' ? 'active' : ''}`}
              onClick={() => setActivePanel('git')}
            >
              <span className="i-ph:git-branch" />
              <span>Git</span>
            </button>
            <button
              className={`panel-tab ${activePanel === 'terminal' ? 'active' : ''}`}
              onClick={() => setActivePanel('terminal')}
            >
              <span className="i-ph:terminal" />
              <span>Terminal</span>
            </button>
          </div>

          <div className="panel-content">
            {activePanel === 'editor' && (
              <div className="editor-panel">
                {activePath ? (
                  <>
                    <div className="file-path-breadcrumb">
                      {activePath.split('/').map((segment, index, array) => (
                        <React.Fragment key={index}>
                          {index > 0 && <span className="path-separator">/</span>}
                          <span className={index === array.length - 1 ? 'current-segment' : 'path-segment'}>
                            {segment}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                    <CodeEditor
                      initialValue={files[activePath] || ''}
                      language={getLanguage(activePath)}
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <div className="empty-editor">
                    <div className="empty-message">
                      <span className="i-ph:file-dashed text-5xl opacity-30" />
                      <h3>Aucun fichier ouvert</h3>
                      <p>Sélectionnez un fichier dans la barre latérale pour commencer à éditer</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activePanel === 'git' && <GitViewer repoPath={projectPath} />}

            {activePanel === 'terminal' && (
              <div className="terminal-panel">
                <div className="terminal-placeholder">
                  <span className="i-ph:terminal-window text-5xl opacity-30" />
                  <p>Terminal non disponible dans cette version</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .workbench-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          color: var(--text-color);
        }

        .workbench-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .workbench-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .panel-tabs {
          display: flex;
          padding: 0 0.5rem;
          background-color: var(--bg-subtle);
          border-bottom: 1px solid var(--border-color);
        }

        .panel-tab {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          margin-right: 0.25rem;
          border: none;
          background: none;
          color: var(--text-muted);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .panel-tab:hover {
          color: var(--text-color);
          background-color: var(--bg-hover);
        }

        .panel-tab.active {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }

        .panel-tab span:first-child {
          margin-right: 0.5rem;
        }

        .panel-content {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .editor-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .file-path-breadcrumb {
          padding: 0.5rem 1rem;
          background-color: var(--bg-subtle);
          font-size: 0.85rem;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border-color);
          white-space: nowrap;
          overflow-x: auto;
        }

        .path-segment {
          cursor: pointer;
        }

        .path-segment:hover {
          text-decoration: underline;
        }

        .current-segment {
          font-weight: 600;
          color: var(--primary-color);
        }

        .path-separator {
          margin: 0 0.25rem;
          color: var(--text-muted);
        }

        .empty-editor,
        .terminal-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background-color: var(--bg-color);
        }

        .empty-message,
        .terminal-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .empty-message h3 {
          margin: 1rem 0 0.5rem;
          font-weight: 600;
        }

        .empty-message p,
        .terminal-placeholder p {
          color: var(--text-muted);
          max-width: 300px;
        }
      `}</style>
    </div>
  );
};

export default Workbench;
