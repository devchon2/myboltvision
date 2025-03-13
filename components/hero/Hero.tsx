import Link from 'next/link';
import React from 'react';

/**
 * Hero component displays a welcoming section with a title, a description,
 * and a contact button. It serves as an introduction to the BoltVision
 * application, emphasizing its purpose. The section is styled with a gray
 * background and centered content.
 */

const Hero = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur BoltVision</h1>
        <p className="text-xl mb-8">La solution pour une vision claire de vos projets.</p>
        <Link href="/contact" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Contactez-nous
        </Link>
      </div>
    </section>
  );
};

export default Hero;
