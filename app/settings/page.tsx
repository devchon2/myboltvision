'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError('Veuillez entrer une adresse email valide');
      return false;
    }

    setEmailError('');

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail(email)) {
      setSubmitted(true);

      // Simulation de traitement de formulaire réussi
      console.log('Formulaire soumis avec succès');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Paramètres utilisateur</h1>

      {submitted ? (
        <div data-testid="success-message" className="p-4 bg-green-100 text-green-800 rounded mb-6">
          Vos paramètres ont été enregistrés avec succès!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {emailError && (
              <div data-testid="error-message" className="mt-1 text-sm text-red-600">
                {emailError}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
