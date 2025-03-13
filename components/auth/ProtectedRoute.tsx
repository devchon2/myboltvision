import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Composant qui protège les routes en vérifiant si l'utilisateur est authentifié.
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = '/auth/login' }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    /*
     * Si l'authentification est terminée et qu'aucun utilisateur n'est connecté,
     * rediriger vers la page de connexion
     */
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, redirectTo, router]);

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, afficher un écran vide pendant la redirection
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est authentifié, afficher le contenu enfant
  return <>{children}</>;
};

export default ProtectedRoute;
