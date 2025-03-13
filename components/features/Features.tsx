import React from 'react';

const Features = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Nos Fonctionnalités</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-2">Analyse de données</h3>
            <p className="text-gray-700">Analysez vos données pour prendre des décisions éclairées.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-2">Visualisation</h3>
            <p className="text-gray-700">Visualisez vos données avec des graphiques et des tableaux.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold mb-2">Rapports personnalisés</h3>
            <p className="text-gray-700">Générez des rapports personnalisés pour vos besoins.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
