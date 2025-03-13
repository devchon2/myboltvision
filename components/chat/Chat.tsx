'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { classNames } from '../../utils/classNames';
import { createScopedLogger } from '../../utils/logger';

const logger = createScopedLogger('Chat');

// Types pour les messages
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  status?: 'sending' | 'complete' | 'error';
  error?: string;
  files?: Array<{
    name: string;
    type: string;
    content: string;
  }>;
}

// Props pour le composant principal
interface ChatProps {
  initialMessages?: Message[];
  className?: string;
  apiEndpoint?: string;
  model?: string;
  provider?: string;
  chatId?: string;
}

/**
 * Composant principal de Chat - version migrée vers Next.js
 * Combine plusieurs sous-composants pour économiser des tokens
 */
export const Chat: React.FC<ChatProps> = ({
  initialMessages = [],
  className = '',
  apiEndpoint = '/api/chat',
  model = 'gpt-3.5-turbo',
  provider = 'openai',
  chatId,
}) => {
  console.log('ChatId:', chatId);

  // État
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Défiler vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Gérer l'envoi d'un message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isGenerating) {
      return;
    }

    // Créer un nouvel ID unique pour le message
    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;

    // Ajouter le message utilisateur à la liste
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    // Préparer un message assistant vide (à compléter au fur et à mesure)
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      status: 'sending',
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInputValue('');
    setIsGenerating(true);
    setError(null);

    // Créer un nouveau contrôleur d'annulation pour cette requête
    abortControllerRef.current = new AbortController();

    try {
      // Convertir les messages au format attendu par l'API
      const apiMessages = messages.concat(userMessage).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Appeler l'API en mode streaming
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          model,
          provider,
          stream: true,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      // Traiter le flux SSE (Server-Sent Events)
      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error('Reader non disponible');
      }

      const decoder = new TextDecoder();
      let partialText = '';
      let fullContent = '';

      // Fonction récursive pour lire le flux
      const readStream = async (): Promise<void> => {
        const { done, value } = await reader.read();

        if (done) {
          // Marquer le message comme complet
          setMessages((prevMessages) =>
            prevMessages.map((m) => (m.id === assistantMessageId ? { ...m, status: 'complete' } : m)),
          );
          setIsGenerating(false);

          return;
        }

        // Décoder et traiter le contenu
        partialText += decoder.decode(value, { stream: true });

        const lines = partialText.split('\n');

        // Traiter chaque ligne
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();

          if (line === '') {
            continue;
          }

          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              // Fin du flux
              setMessages((prevMessages) =>
                prevMessages.map((m) => (m.id === assistantMessageId ? { ...m, status: 'complete' } : m)),
              );
              setIsGenerating(false);
              continue;
            }

            try {
              const parsed = JSON.parse(data);

              // Vérifier si c'est un fragment de contenu valide
              if (parsed.choices && parsed.choices[0].delta?.content) {
                const content = parsed.choices[0].delta.content;
                fullContent += content;

                // Mettre à jour le contenu du message
                setMessages((prevMessages) =>
                  prevMessages.map((m) => (m.id === assistantMessageId ? { ...m, content: fullContent } : m)),
                );
              }
            } catch (e) {
              logger.error('Erreur de parsing JSON:', e);
            }
          }
        }

        // Conserver le dernier fragment incomplet
        partialText = lines[lines.length - 1];

        // Continuer à lire
        return readStream();
      };

      // Démarrer la lecture du flux
      await readStream();
    } catch (e) {
      // Gérer les erreurs
      const errorMessage = e instanceof Error ? e.message : 'Erreur inconnue';
      logger.error("Erreur lors de l'envoi du message:", errorMessage);

      // Si ce n'est pas une annulation délibérée
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        setError(errorMessage);
        setMessages((prevMessages) =>
          prevMessages.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: 'Erreur lors de la génération de la réponse.', status: 'error', error: errorMessage }
              : m,
          ),
        );
      }

      setIsGenerating(false);
    } finally {
      abortControllerRef.current = null;
    }
  }, [inputValue, isGenerating, messages, apiEndpoint, model, provider]);

  // Gérer l'arrêt de la génération
  const handleStopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);

      // Marquer le dernier message comme incomplet mais sans erreur
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];

        if (lastMessage && lastMessage.role === 'assistant' && lastMessage.status === 'sending') {
          return [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, status: 'complete', content: lastMessage.content + ' [Génération interrompue]' },
          ];
        }

        return prevMessages;
      });
    }
  }, []);

  // Sous-composant pour les messages
  const Messages: React.FC = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={classNames(
            'p-3 rounded-lg max-w-3xl',
            message.role === 'user' ? 'bg-blue-100 ml-auto text-blue-900' : 'bg-gray-100 text-gray-900',
          )}
        >
          <div className="whitespace-pre-wrap break-words">
            {message.content ||
              (message.status === 'sending' && <span className="text-gray-500 animate-pulse">...</span>)}
          </div>

          {message.status === 'error' && <div className="mt-2 text-sm text-red-500">Erreur: {message.error}</div>}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );

  // Sous-composant pour le bouton d'envoi/arrêt
  const SendButton: React.FC<{
    isGenerating: boolean;
    onSend: () => void;
    onStop: () => void;
  }> = ({ isGenerating, onSend, onStop }) => (
    <button
      className={classNames(
        'rounded-full p-2 px-4 text-white font-medium transition-colors',
        isGenerating ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600',
        'disabled:opacity-50 disabled:cursor-not-allowed',
      )}
      onClick={isGenerating ? onStop : onSend}
      disabled={isGenerating ? false : !inputValue.trim()}
    >
      {isGenerating ? 'Arrêter' : 'Envoyer'}
    </button>
  );

  return (
    <div className={classNames('flex flex-col h-full bg-white', className)}>
      {/* En-tête du chat */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-medium text-gray-700">Chat - Version Next.js</h2>
        <div className="text-sm text-gray-500 flex space-x-3">
          <span>Modèle: {model}</span>
          <span>Fournisseur: {provider}</span>
        </div>
      </div>

      {/* Notification d'erreur globale */}
      {error && <div className="p-3 m-2 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>}

      {/* Zone des messages */}
      <Messages />

      {/* Zone de saisie */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Saisissez votre message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={2}
              disabled={isGenerating}
            />
          </div>
          <SendButton isGenerating={isGenerating} onSend={handleSendMessage} onStop={handleStopGenerating} />
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Appuyez sur Entrée pour envoyer, Maj+Entrée pour ajouter une nouvelle ligne
        </div>
      </div>
    </div>
  );
};

export default Chat;
