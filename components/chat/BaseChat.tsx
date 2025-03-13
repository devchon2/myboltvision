'use client';

import type { JSONValue, Message } from 'ai';
import React, { type RefCallback, useEffect, useState } from 'react';
import type { ProviderInfo } from '../../types/model.ts';
import { classNames } from '../../utils/classNames.ts';
import { Menu } from '../sidebar/Menu.tsx';
import { Workbench } from '../workbench/Workbench.client.tsx';
import styles from './BaseChat.module.scss';
import { Messages } from './Messages.tsx';
import { SendButton } from './SendButton.tsx';

// Type actionAlert simplifié
interface ActionAlert {
  type: string;
  message: string;
}

interface BaseChatProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined;
  messageRef?: RefCallback<HTMLDivElement> | undefined;
  scrollRef?: RefCallback<HTMLDivElement> | undefined;
  showChat?: boolean;
  chatStarted?: boolean;
  isStreaming?: boolean;
  messages?: Message[];
  description?: string;
  enhancingPrompt?: boolean;
  promptEnhanced?: boolean;
  input?: string;
  model?: string;
  setModel?: (model: string) => void;
  provider?: ProviderInfo;
  setProvider?: (provider: ProviderInfo) => void;
  providerList?: ProviderInfo[];
  handleStop?: () => void;
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  enhancePrompt?: () => void;
  importChat?: (description: string, messages: Message[]) => Promise<void>;
  exportChat?: () => void;
  uploadedFiles?: File[];
  setUploadedFiles?: (files: File[]) => void;
  imageDataList?: string[];
  setImageDataList?: (dataList: string[]) => void;
  actionAlert?: ActionAlert;
  clearAlert?: () => void;
  data?: JSONValue[] | undefined;
}

// Composant ClientOnly pour le rendu côté client uniquement
const ClientOnly = ({ children }: { children: () => React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children()}</>;
};

// Implémentation simplifiée de BaseChat
export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
  (
    {
      textareaRef,
      messageRef,
      scrollRef,
      showChat = true,
      chatStarted = false,
      isStreaming = false,
      setModel,
      provider,
      input = '',
      enhancingPrompt,
      handleInputChange,
      enhancePrompt,
      sendMessage,
      handleStop,
      messages = [],
      actionAlert,
      clearAlert,
    },
    ref,
  ) => {
    // SimplePlaceholder pour remplacer temporairement les composants manquants
    const SimplePlaceholder = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <div className={className || 'p-4 border rounded my-2 bg-gray-50'}>
        {children || 'Composant en cours de migration...'}
      </div>
    );

    return (
      <div
        ref={ref}
        className={classNames(styles.BaseChat, 'relative flex h-full w-full overflow-hidden')}
        data-chat-visible={showChat}
        data-testid="chat-container"
      >
        {/* Menu migré */}
        <ClientOnly>{() => <Menu />}</ClientOnly>

        <div className="flex flex-col lg:flex-row overflow-y-auto w-full h-full">
          <div className={classNames(styles.Chat, 'flex flex-col flex-grow lg:min-w-[var(--chat-min-width)] h-full')}>
            {!chatStarted && (
              <div id="intro" className="mt-[16vh] max-w-chat mx-auto text-center px-4 lg:px-0">
                <h1 className="text-3xl lg:text-6xl font-bold text-bolt-elements-textPrimary mb-4 animate-fade-in">
                  Where ideas begin
                </h1>
                <p className="text-md lg:text-xl mb-8 text-bolt-elements-textSecondary animate-fade-in animation-delay-200">
                  Bring ideas to life in seconds or get help on existing projects.
                </p>
              </div>
            )}

            <div
              className={classNames('pt-6 px-2 sm:px-6', { 'h-full flex flex-col pb-4 overflow-y-auto': chatStarted })}
              ref={scrollRef}
            >
              {chatStarted && (
                <div className="flex-1 w-full max-w-chat pb-6 mx-auto z-1">
                  {/* Messages avec composant dédié */}
                  <Messages ref={messageRef} messages={messages} isStreaming={isStreaming} className="flex flex-col" />
                </div>
              )}

              <div className="flex flex-col gap-4 w-full max-w-chat mx-auto z-prompt">
                {actionAlert && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">{actionAlert.message}</div>
                )}

                <div className="bg-bolt-elements-background-depth-2 p-3 rounded-lg border border-bolt-elements-borderColor relative w-full max-w-chat mx-auto z-prompt">
                  {/* Zone de saisie */}
                  <div className="relative shadow-xs border border-bolt-elements-borderColor backdrop-blur rounded-lg">
                    <textarea
                      data-testid="chat-input"
                      ref={textareaRef}
                      className="w-full pl-4 pt-4 pr-16 outline-none resize-none bg-transparent text-sm"
                      value={input}
                      onChange={(event) => handleInputChange?.(event)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault();

                          if (isStreaming) {
                            handleStop?.();
                            return;
                          }

                          sendMessage?.(event);
                        }
                      }}
                      placeholder="How can Bolt help you today?"
                    />

                    {/* Bouton d'envoi avec composant dédié */}
                    <SendButton
                      show={input.length > 0 || isStreaming}
                      isStreaming={isStreaming}
                      data-testid="send-button"
                      onClick={(e: React.MouseEvent) => {
                        if (isStreaming) {
                          handleStop?.();
                        } else if (input.length > 0) {
                          sendMessage?.(e);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!chatStarted && (
              <div className="flex flex-col justify-center mt-6 gap-5">
                <SimplePlaceholder>Exemples et modèles</SimplePlaceholder>
              </div>
            )}
          </div>

          {/* Workbench migré */}
          <ClientOnly>{() => <Workbench chatStarted={chatStarted} isStreaming={isStreaming} />}</ClientOnly>
        </div>
      </div>
    );
  },
);

// Add display name for debugging
BaseChat.displayName = 'BaseChat';

// Export as default and named export
export default BaseChat;
