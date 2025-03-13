import React, { useState } from 'react';
import { useAuth } from './AuthContext.tsx';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    try {
      await resetPassword(email);
      setIsSubmitted(true);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setLocalError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }
    }
  };

  // Utiliser l'erreur locale ou celle du contexte d'authentification
  const displayError = localError || authError;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Réinitialisation du mot de passe</h2>

        {displayError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{displayError}</div>
        )}

        {isSubmitted ? (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
            <p>
              Si un compte existe avec l'email <strong>{email}</strong>, vous recevrez un email contenant les
              instructions pour réinitialiser votre mot de passe.
            </p>
            <p className="mt-4">Veuillez vérifier votre boîte de réception (et éventuellement vos spams).</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="email@exemple.com"
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
              >
                {isLoading ? <span>Envoi en cours...</span> : <span>Envoyer le lien de réinitialisation</span>}
              </button>
            </div>
          </>
        )}

        <div className="text-center mt-6">
          <a href="/auth/login" className="text-blue-600 hover:text-blue-800">
            Retour à la connexion
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
