'use client';

import React, { useState, useEffect } from 'react';
import { classNames } from '../../utils/classNames';

interface GitProps {
  className?: string;
}

interface Commit {
  message: string;
  sha: string;
  date: string;
}

export const Git: React.FC<GitProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMerging, setIsMerging] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [branchName, setBranchName] = useState('main');
  const [commitMessage, setCommitMessage] = useState('');
  const [branches, setBranches] = useState<string[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    // Simuler le chargement initial
    const loadInitialData = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Données fictives pour l'exemple
        const demoData = {
          branches: ['main', 'feature-branch', 'bugfix/issue-123'],
          commits: [
            {
              message: 'Initial commit',
              sha: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
              date: '2023-10-01T12:34:56Z',
            },
            {
              message: 'Added feature X',
              sha: 'f1e2d3g4h5i6j7k8l9m0n1b1v2a3c4d5e6f7g8a9',
              date: '2023-10-02T09:15:32Z',
            },
            {
              message: 'Fixed bug #123',
              sha: 'b3g4h5i6k7l8m9n1b1v2a3d4e5f6a7b8c9d0e1f2a3b4c5',
              date: '2023-10-03T14:45:18Z',
            },
          ],
        };

        setBranches(demoData.branches);
        setCommits(demoData.commits);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données initiales:', error);
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBranchName(event.target.value);
  };

  const handleMerge = () => {
    setIsMerging(true);
    setTimeout(() => {
      setIsMerging(false);
      setCommitMessage('Fusion réussie.');
    }, 2000);
  };

  const handlePush = () => {
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      setCommitMessage('Push réussi.');
    }, 2000);
  };

  const handlePull = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsPulling(false);
      setCommitMessage('Pull réussi.');
    }, 2000);
  };

  return (
    <div className={classNames('git-container', className)}>
      {isLoading ? (
        <div className="git-loading">Chargement en cours...</div>
      ) : (
        <>
          <div className="git-header">
            <h1>Git</h1>
            <select value={branchName} onChange={handleBranchChange}>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <button onClick={handleMerge} disabled={isMerging}>
              Fusionner
            </button>
            <button onClick={handlePush} disabled={isPushing}>
              Pousser
            </button>
            <button onClick={handlePull} disabled={isPulling}>
              Tirer
            </button>
          </div>
          <div className="git-log">
            {commits.map((commit, index) => (
              <div key={index} className="git-commit">
                <span className="git-commit-message">{commit.message}</span>
                <span className="git-commit-sha">{commit.sha.substring(0, 7)}</span>
              </div>
            ))}
          </div>
          {isMerging && <div className="git-loading">Fusion en cours...</div>}
          {isPushing && <div className="git-loading">Push en cours...</div>}
          {isPulling && <div className="git-loading">Pull en cours...</div>}
          {commitMessage && <div className="git-message">{commitMessage}</div>}
        </>
      )}
    </div>
  );
};

export default Git;
