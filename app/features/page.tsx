import React from 'react';
import Features from '../../components/features/Features.tsx';

const FeaturesPage = () => {
  return (
    <>
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Fonctionnalités</h1>
        <Features />
      </main>
    </>
  );
};

export default FeaturesPage;
