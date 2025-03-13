import type { Metadata } from 'next';
import React from 'react';
import ResetPasswordForm from '../../../components/auth/ResetPasswordForm.tsx';

export const metadata: Metadata = {
  title: 'BoltVision - Réinitialisation du mot de passe',
  description: 'Réinitialisez votre mot de passe BoltVision',
};

export default function ResetPasswordPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Réinitialiser votre mot de passe</h1>
          <p className="mt-2 text-sm text-gray-600">
            Nous vous enverrons un lien pour réinitialiser votre mot de passe
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </main>
  );
}
