'use client';

import React, { useState, useEffect } from 'react';
import { classNames } from '../../utils/classNames';
import { createScopedLogger } from '../../utils/logger';

const logger = createScopedLogger('Dashboard');

interface DashboardProps {
  className?: string;
  projectName?: string;
}

interface ProjectStats {
  totalFiles: number;
  totalLines: number;
  lastCommit: string;
  activeFiles: {
    name: string;
    type: string;
    commits: number;
  }[];
}

/**
 * Version simplifiée du tableau de bord pour la migration vers Next.js
 */
export const Dashboard: React.FC<DashboardProps> = ({ className = '', projectName = 'Mon Projet' }) => {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'files' | 'performance'>('overview');

  // Simuler le chargement des statistiques du projet
  useEffect(() => {
    const loadStats = async () => {
      try {
        /*
         * Dans une implémentation réelle, nous appellerions une API
         * Exemple: const response = await fetch('/api/project/stats');
         */

        // Simulation d'un délai réseau
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Données fictives pour démonstration
        const demoStats: ProjectStats = {
          totalFiles: 142,
          totalLines: 15783,
          lastCommit: '2025-03-11T18:23:15Z',
          activeFiles: [
            { name: 'components/chat/BaseChat.tsx', type: 'tsx', commits: 12 },
            { name: 'pages/api/chat.ts', type: 'ts', commits: 8 },
            { name: 'components/workbench/Workbench.client.tsx', type: 'tsx', commits: 7 },
            { name: 'lib/modules/llm/manager.ts', type: 'ts', commits: 5 },
          ],
        };

        setStats(demoStats);
      } catch (error) {
        logger.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Formater une date en format lisible
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={classNames('dashboard-loading p-6', className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('dashboard p-6', className)}>
      {/* En-tête avec le nom du projet */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{projectName}</h1>
        <p className="text-gray-500">Tableau de bord du projet - Version Next.js</p>
      </div>

      {/* Navigation entre les différentes vues */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={classNames(
            'py-2 px-4 font-medium text-sm',
            activeView === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700',
          )}
          onClick={() => setActiveView('overview')}
        >
          Vue d'ensemble
        </button>
        <button
          className={classNames(
            'py-2 px-4 font-medium text-sm',
            activeView === 'files' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700',
          )}
          onClick={() => setActiveView('files')}
        >
          Fichiers
        </button>
        <button
          className={classNames(
            'py-2 px-4 font-medium text-sm',
            activeView === 'performance'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700',
          )}
          onClick={() => setActiveView('performance')}
        >
          Performance
        </button>
      </div>

      {/* Contenu principal */}
      {activeView === 'overview' && stats && (
        <div>
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fichiers</h3>
              <p className="text-2xl font-semibold">{stats.totalFiles}</p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Lignes de code</h3>
              <p className="text-2xl font-semibold">{stats.totalLines.toLocaleString()}</p>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Dernier commit</h3>
              <p className="text-2xl font-semibold">{formatDate(stats.lastCommit)}</p>
            </div>
          </div>

          {/* Fichiers les plus actifs */}
          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Fichiers les plus actifs</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fichier
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commits
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.activeFiles.map((file, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{file.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {file.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{file.commits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'files' && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <div className="text-center py-10">
            <p className="text-gray-500 mb-2">Visualisation des fichiers en cours de migration</p>
            <div className="inline-block py-2 px-4 bg-blue-50 text-blue-700 rounded-md">
              Cette fonctionnalité sera disponible prochainement
            </div>
          </div>
        </div>
      )}

      {activeView === 'performance' && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <div className="text-center py-10">
            <p className="text-gray-500 mb-2">Métriques de performance en cours de migration</p>
            <div className="inline-block py-2 px-4 bg-blue-50 text-blue-700 rounded-md">
              Cette fonctionnalité sera disponible prochainement
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
