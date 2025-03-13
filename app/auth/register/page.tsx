import type { Metadata } from 'next';
import React from 'react';
import RegisterForm from '../../../components/auth/RegisterForm.tsx';

export const metadata: Metadata = {
  title: 'BoltVision - Inscription',
  description: 'Créez un compte BoltVision pour accéder à toutes les fonctionnalités',
};

export default function RegisterPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Créer un compte BoltVision</h1>
          <p className="mt-2 text-sm text-gray-600">Créez votre compte pour commencer à utiliser BoltVision</p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
