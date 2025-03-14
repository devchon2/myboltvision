'use client';
import React from 'react';
import Image from 'next/image';

const featuresData = [
  {
    icon: '/icons/react.svg',
    title: 'Lancement Rapide',
    description: 'Démarrez votre projet en un temps record grâce à nos outils intuitifs.',
  },
  {
    icon: '/icons/typescript.svg',
    title: 'Code Personnalisable',
    description: 'Adaptez le code à vos besoins grâce à notre plateforme flexible.',
  },
  {
    icon: '/icons/stars.svg',
    title: 'Analyse Performante',
    description: 'Optimisez vos performances avec des analyses et des rapports détaillés.',
  },
];

export const Features = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Fonctionnalités</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <Image src={feature.icon} alt={feature.title} width={32} height={32} className="mr-4" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
