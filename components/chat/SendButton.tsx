'use client';

import React from 'react';

interface SendButtonProps {
  show: boolean;
  isStreaming: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

/**
 * Bouton d'envoi de message pour le chat
 * Affiche un bouton d'envoi ou d'arrêt selon l'état du streaming
 */
export const SendButton: React.FC<SendButtonProps> = ({ show, isStreaming, disabled = false, onClick }) => {
  if (!show) {
    return null;
  }

  return (
    <button
      type="button"
      disabled={disabled}
      data-testid="send-button"
      className={`
        absolute right-3 top-4 p-2 rounded-full 
        ${isStreaming ? 'bg-red-100 hover:bg-red-200' : 'bg-blue-100 hover:bg-blue-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-colors duration-150 ease-in-out
      `}
      onClick={onClick}
      aria-label={isStreaming ? 'Stop generating' : 'Send message'}
    >
      {isStreaming ? (
        <div className="i-ph:square-bold text-red-600 text-lg" />
      ) : (
        <div className="i-ph:paper-plane-right-fill text-blue-600 text-lg" />
      )}

      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          transform: translateY(-50%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          transform: translateY(-50%) scale(1.05);
        }

        button:active {
          transform: translateY(-50%) scale(0.98);
        }

        /* Fallback icons using emojis if the icons don't load */
        .i-ph\\:square-bold:empty::before {
          content: '■';
        }

        .i-ph\\:paper-plane-right-fill:empty::before {
          content: '➤';
        }
      `}</style>
    </button>
  );
};

export default SendButton;
