'use client';

import React, { useState } from 'react';

interface GitUrlImportProps {
  initialUrl?: string;
}

/**
 * Composant d'importation Git - Client Component
 * Ajout de la directive 'use client' pour Next.js
 */
const GitUrlImport: React.FC<GitUrlImportProps> = ({ initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async () => {
    if (!url.trim()) {
      setError('Veuillez entrer une URL de repository Git valide');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simuler l'importation (à remplacer par la vraie implémentation)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Repository importé:', url);

      // Implémentation réelle ici
    } catch (err) {
      setError("Erreur lors de l'importation: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Importer un repository Git</h2>

        <div className="mb-6">
          <label htmlFor="gitUrl" className="block text-sm font-medium text-gray-700 mb-2">
            URL du repository
          </label>
          <input
            id="gitUrl"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/user/repo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>}

        <button
          onClick={handleImport}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Importation en cours...' : 'Importer le repository'}
        </button>
      </div>
    </div>
  );
};

export default GitUrlImport;
