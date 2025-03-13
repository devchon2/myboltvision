// app/chat/[id]/page.tsx
'use client';
import React from 'react';

const ChatPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <h1>Chat {id}</h1>
      {/* Add chat component here */}
    </div>
  );
};

export default ChatPage;
