'use client';

import { useState, useEffect } from 'react';
import { Chat } from '../../../components/chat/Chat';
import { Header } from '../../../components/header/Header';
import { Sidebar } from '../../../components/sidebar/Sidebar';

// Composant client interactif
export function ChatPageContent({ chatId }: { chatId: string }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    console.log('ChatPageContent mounted');
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* En-tête global */}
      <Header title={`Chat - ${chatId}`} onMenuToggle={toggleSidebar} showVersion />

      <div className="flex flex-1 overflow-hidden">
        {/* Barre latérale */}
        <Sidebar isExpanded={sidebarExpanded} onToggle={toggleSidebar} />

        {/* Contenu principal */}
        <main className="flex-1 overflow-hidden bg-gray-50">
          <Chat chatId={chatId} />
        </main>
      </div>
    </div>
  );
}
