'use client';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Types définis pour l'interface utilisateur et le contexte d'authentification
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

// Valeur par défaut du contexte
const defaultContext: AuthContextType = {
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  resetPassword: async () => {},
};

// Création du contexte
const AuthContext = createContext<AuthContextType>(defaultContext);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Fournisseur du contexte d'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si l'utilisateur est déjà authentifié
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier le localStorage pour une authentification précédente
        const isAuth = localStorage.getItem('isAuthenticated');

        if (isAuth === 'true') {
          // Simulation d'un utilisateur connecté
          setUser({
            id: '1',
            email: 'utilisateur@exemple.com',
            name: 'Utilisateur Test',
          });
        }
      } catch (err) {
        console.error("Erreur lors de la vérification de l'authentification:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulation d'une API de connexion
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Vérification simplifiée (à remplacer par votre logique réelle)
      if (email && password) {
        // Simulation d'un utilisateur connecté
        const loggedUser = {
          id: '1',
          email,
          name: email.split('@')[0], // Utilise la partie avant @ comme nom temporaire
        };

        setUser(loggedUser);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        throw new Error('Email et mot de passe requis');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la connexion');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulation d'une API d'inscription
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Vérification simplifiée (à remplacer par votre logique réelle)
      if (name && email && password) {
        // Simulation d'un utilisateur inscrit et connecté
        const newUser = {
          id: '1',
          email,
          name,
        };

        setUser(newUser);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        throw new Error('Tous les champs sont requis');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
  };

  // Fonction de réinitialisation du mot de passe
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulation d'une API de réinitialisation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Vérification simplifiée (à remplacer par votre logique réelle)
      if (!email) {
        throw new Error('Email requis');
      }

      // Succès simulé
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la réinitialisation');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Valeur du contexte
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
