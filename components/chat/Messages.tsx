'use client';

import type { Message } from 'ai';
import React, { forwardRef } from 'react';

interface MessagesProps {
  messages?: Message[];
  isStreaming?: boolean;
  className?: string;
}

/**
 * Composant Messages pour afficher les messages du chat
 * Version simplifiée pour la migration vers Next.js
 */
export const Messages = forwardRef<HTMLDivElement, MessagesProps>(
  ({ messages = [], isStreaming = false, className = '' }, ref) => {
    if (messages.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={`messages-container ${className}`}>
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isLast = index === messages.length - 1;
          const isLastAssistant = isLast && !isUser;

          // Extraction du contenu avec gestion de type explicite
          let content = '';

          if (typeof message.content === 'string') {
            content = message.content;
          } else if (Array.isArray(message.content)) {
            // @ts-ignore - Ignorer les erreurs de type pendant la migration
            content = message.content
              .map((item) => {
                if (typeof item === 'string') {
                  return item;
                }

                // @ts-ignore - Type pour les contenus multimodaux
                return item.type === 'text' ? item.text : '[Content not supported]';
              })
              .join('');
          } else {
            content = JSON.stringify(message.content);
          }

          return (
            <div
              key={message.id || index}
              data-testid="message-item"
              className={`message ${isUser ? 'user-message' : 'assistant-message'} ${isLastAssistant && isStreaming ? 'streaming' : ''} mb-4`}
            >
              <div className="message-header flex items-center px-3 py-2 text-sm rounded-t bg-opacity-50">
                <div
                  className={`w-6 h-6 flex-shrink-0 rounded-full mr-2 ${isUser ? 'bg-blue-500' : 'bg-green-500'} flex items-center justify-center text-white`}
                >
                  {isUser ? '👤' : '🤖'}
                </div>
                <div className="font-medium">{isUser ? 'Vous' : 'Assistant'}</div>
              </div>
              <div
                className={`message-content p-3 rounded-b whitespace-pre-wrap ${isUser ? 'bg-blue-50' : 'bg-green-50'}`}
              >
                {content}
                {isLastAssistant && isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse"></span>
                )}
              </div>
            </div>
          );
        })}

        <style jsx>{`
          .messages-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .message {
            max-width: 90%;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .user-message {
            align-self: flex-end;
            margin-left: auto;
          }

          .assistant-message {
            align-self: flex-start;
            margin-right: auto;
          }

          .message-content {
            font-size: 0.95rem;
            line-height: 1.5;
          }

          @keyframes pulse {
            0% {
              opacity: 0.4;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.4;
            }
          }

          .streaming .message-content::after {
            content: '';
            display: inline-block;
            width: 4px;
            height: 16px;
            background-color: currentColor;
            margin-left: 4px;
            animation: pulse 1s infinite;
          }
        `}</style>
      </div>
    );
  },
);

Messages.displayName = 'Messages';

export default Messages;
