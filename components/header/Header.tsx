import  Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/logo.svg'; // Assurez-vous que le chemin est correct

const Navigation = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-blue-500" >
            Accueil
          </Link>
        </li>
        <li>
          <Link href="/features/" className="hover:text-blue-500">
            Fonctionnalités
          </Link>
        </li>
        <li>
          <Link href="/pricing/" className="hover:text-blue-500">
            Tarifs
          </Link>
        </li>
        <li>
          <Link href="/contact/" className="hover:text-blue-500">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <Image src={logo} alt="BoltVision Logo" width={100} height={24} />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
