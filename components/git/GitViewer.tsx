'use client';

import React, { useEffect, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { createScopedLogger } from '../../utils/logger';

const logger = createScopedLogger('GitViewer');

interface GitViewerProps {
  repoPath?: string;
  className?: string;
}

interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
}

interface GitBranch {
  name: string;
  current: boolean;
}

/**
 * Version simplifiée du visualiseur Git pour la migration Next.js
 */
export const GitViewer: React.FC<GitViewerProps> = ({ repoPath = '', className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<GitBranch[]>([]);
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [currentBranch, setCurrentBranch] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Charger les informations Git lors du montage du composant
  useEffect(() => {
    const fetchGitInfo = async () => {
      if (!repoPath) {
        setLoading(false);
        setError('Aucun chemin de dépôt spécifié');

        return;
      }

      try {
        // Dans la version migrée, nous appellerons l'API git-proxy
        const branchesResponse = await fetch(`/api/git-proxy/branches?path=${encodeURIComponent(repoPath)}`);
        const commitsResponse = await fetch(`/api/git-proxy/commits?path=${encodeURIComponent(repoPath)}&limit=10`);

        if (!branchesResponse.ok || !commitsResponse.ok) {
          throw new Error('Erreur lors de la récupération des informations Git');
        }

        const branchesData = await branchesResponse.json();
        const commitsData = await commitsResponse.json();

        // Traitement des données
        setBranches(branchesData.branches || []);
        setCommits(commitsData.commits || []);
        setCurrentBranch(branchesData.current || '');
      } catch (err) {
        logger.error('Error fetching git info:', err);
        setError('Impossible de charger les informations Git');
      } finally {
        setLoading(false);
      }
    };

    fetchGitInfo();
  }, [repoPath]);

  if (loading) {
    return (
      <div className={classNames('git-viewer-loading p-4', className)}>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span className="text-gray-500">Chargement des informations Git...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames('git-viewer-error p-4', className)}>
        <div className="text-red-500 bg-red-50 p-3 rounded-md">
          <p className="font-semibold">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Données fictives pour la démonstration pendant la migration
  const sampleBranches: GitBranch[] =
    branches.length > 0
      ? branches
      : [
          { name: 'main', current: true },
          { name: 'develop', current: false },
          { name: 'feature/next-migration', current: false },
        ];

  const sampleCommits: GitCommit[] =
    commits.length > 0
      ? commits
      : [
          {
            hash: 'a1b2c3d',
            message: 'Migration des composants UI vers Next.js',
            author: 'Développeur',
            date: '2025-03-11',
          },
          {
            hash: 'e4f5g6h',
            message: 'Adaptation des routes API',
            author: 'Développeur',
            date: '2025-03-10',
          },
          {
            hash: 'i7j8k9l',
            message: 'Configuration initiale Next.js',
            author: 'Développeur',
            date: '2025-03-09',
          },
        ];

  return (
    <div className={classNames('git-viewer p-4', className)}>
      {/* En-tête */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dépôt Git</h2>
        <div className="text-sm text-gray-500">{repoPath || 'Chemin non spécifié'}</div>
      </div>

      {/* Section des branches */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Branches</h3>
        <div className="bg-gray-50 rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {sampleBranches.map((branch, index) => (
              <li
                key={index}
                className={classNames('p-3 flex items-center', branch.current ? 'bg-blue-50' : 'hover:bg-gray-100')}
              >
                <div className="text-lg mr-3">{branch.current ? '🔹' : '○'}</div>
                <div>
                  <div className="font-mono text-sm">{branch.name}</div>
                  {branch.current && <div className="text-xs text-blue-600 mt-1">Branche actuelle</div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section des commits */}
      <div>
        <h3 className="text-lg font-medium mb-3">Derniers Commits</h3>
        <div className="bg-gray-50 rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {sampleCommits.map((commit, index) => (
              <li key={index} className="p-3 hover:bg-gray-100">
                <div className="flex justify-between mb-1">
                  <div className="font-mono text-sm text-gray-600">{commit.hash}</div>
                  <div className="text-xs text-gray-500">{commit.date}</div>
                </div>
                <div className="font-medium">{commit.message}</div>
                <div className="text-xs text-gray-500 mt-1">{commit.author}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GitViewer;
