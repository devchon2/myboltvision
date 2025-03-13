'use client';
import type { Metadata } from 'next';
import React from 'react';
import { BaseChat } from '../../components/chat/BaseChat.tsx';
import GitUrlImport from '../../components/git/GitUrlImport.client.tsx';
import Header from '../../components/header/Header.tsx';
import BackgroundRays from '../../components/ui/BackgroundRays.tsx';

export const metadata: Metadata = {
  title: 'Bolt',
  description: 'Talk with Bolt, an AI assistant from StackBlitz',
};

export default function GitPage() {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <React.Suspense fallback={<BaseChat />}>
        <GitUrlImport />
      </React.Suspense>
    </div>
  );
}
