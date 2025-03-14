'use client';
import React from 'react';
import Link from 'next/link';

export const Hero = ({ title, description, ctaText, ctaLink }) => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-500 py-20 relative overflow-hidden">
      <div className="container mx-auto text-center text-white relative z-10">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in animation-delay-200">{title}</h1>
        <p className="text-lg mb-8 animate-fade-in animation-delay-400">{description}</p>
        <Link href={ctaLink}>
          <button className="bg-white text-blue-600 py-3 px-6 rounded-full hover:bg-blue-100 transition-colors duration-200 animate-fade-in animation-delay-600">
            {ctaText}
          </button>
        </Link>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-20 -z-10"></div>
    </section>
  );
};
