import type { Metadata } from 'next';
import React from 'react';
import ProtectedRoute from '../../components/auth/ProtectedRoute.tsx';

export const metadata: Metadata = {
  title: 'BoltVision - Tableau de bord',
  description: 'Tableau de bord BoltVision',
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="flex-1 container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold mb-2">Bienvenue</h2>
              <p className="text-gray-700">Vous êtes connecté à votre espace personnel BoltVision.</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h2 className="text-xl font-semibold mb-2">Projets</h2>
              <p className="text-gray-700">Vous n'avez pas encore de projets.</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h2 className="text-xl font-semibold mb-2">Activité récente</h2>
              <p className="text-gray-700">Aucune activité récente à afficher.</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Créer un projet</button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                Importer des données
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                Consulter les rapports
              </button>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
