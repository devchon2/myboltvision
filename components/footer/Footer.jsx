'use client';
import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2023 MyBoltVision. Tous droits réservés.</p>
        </div>
        <div>
          <Link href="/a-propos" className="mr-4 hover:underline">À propos</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
