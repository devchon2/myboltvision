import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import { Chat } from '../../components/chat/Chat';
import { Header } from '../../components/header/Header';
import { Sidebar } from '../../components/sidebar/Sidebar';

/**
 * Page d'accueil principale de l'application - Version Next.js
 */
export default function HomePage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <>
      <Head>
        <title>BoltVision - Next.js</title>
        <meta name="description" content="Application BoltVision migrée vers Next.js" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="flex flex-col h-screen">
        {/* En-tête global */}
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Barre latérale */}
          <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />

          {/* Contenu principal */}
          <main className="flex-1 overflow-hidden bg-gray-50">
            <Chat />
          </main>
        </div>
      </div>

      {/* Styles globaux pour les valeurs CSS personnalisées utilisées dans l'application */}
      <style jsx global>{`
        :root {
          --chat-min-width: 400px;
          --bolt-elements-background-depth-2: #f8f9fa;
          --bolt-elements-borderColor: #e2e8f0;
          --bolt-elements-textPrimary: #1a202c;
          --bolt-elements-textSecondary: #4a5568;
          --bolt-elements-icon-success: #38a169;
          --bolt-elements-icon-error: #e53e3e;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        /* Utilitaires spécifiques à l'animation */
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .max-w-chat {
          max-width: 800px;
        }
      `}</style>
    </>
  );
}
