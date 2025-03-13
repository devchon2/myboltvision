'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import BaseChat from '../../components/chat/BaseChat.tsx';

const GitUrlImport = dynamic(() => import('../../components/git/GitUrlImport.client.tsx').then((mod) => mod.default), {
  ssr: false,
  loading: () => <BaseChat />,
});

interface Props {
  id?: string;
}

export default function GitUrlImportClient({ id }: Props) {
  return <GitUrlImport />;
}
