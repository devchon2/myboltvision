'use client';

import React, { useState } from 'react';

interface MenuProps {
  className?: string;
}

/**
 * Version simplifiée du Menu pour la migration Next.js
 */
export const Menu: React.FC<MenuProps> = ({ className = '' }) => {
  const [activeItem, setActiveItem] = useState<string>('chat');

  // Données de menu simplifiées pour la migration
  const menuItems = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'projects', label: 'Projets', icon: '📁' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
    { id: 'help', label: 'Aide', icon: '❓' },
  ];

  return (
    <nav className={`menu p-2 bg-gray-50 border-r border-gray-200 ${className}`}>
      <div className="logo flex items-center pl-4 py-2 mb-4">
        <span className="text-xl font-bold text-blue-600">BoltVision</span>
      </div>

      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id} className="mb-1">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeItem === item.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 pb-2 px-4 border-t border-gray-200 text-sm text-gray-500">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>Version Next.js</span>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
