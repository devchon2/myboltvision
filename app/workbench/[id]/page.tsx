// app/workbench/[id]/page.tsx
'use client';
import React from 'react';

const WorkbenchPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <h1>Workbench {id}</h1>
      {/* Add workbench component here */}
    </div>
  );
};

export default WorkbenchPage;
