import type { Metadata } from 'next';
import React from 'react';
import LoginForm from '../../../components/auth/LoginForm.tsx';

export const metadata: Metadata = {
  title: 'BoltVision - Connexion',
  description: 'Connectez-vous à votre compte BoltVision',
};

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur BoltVision</h1>
          <p className="mt-2 text-sm text-gray-600">Connectez-vous pour accéder à votre espace</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
