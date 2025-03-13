'use client';

import React, { useState } from 'react';
import { classNames } from '../../utils/classNames';

interface SidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

/**
 * Version migrée de la barre latérale pour Next.js
 */
export const Sidebar: React.FC<SidebarProps> = ({ isExpanded = true, onToggle, className = '' }) => {
  const [activeSection, setActiveSection] = useState<string>('files');

  // Sections disponibles dans la barre latérale
  const sections = [
    { id: 'files', icon: '📁', label: 'Fichiers' },
    { id: 'search', icon: '🔍', label: 'Recherche' },
    { id: 'git', icon: '🔀', label: 'Git' },
    { id: 'extensions', icon: '🧩', label: 'Extensions' },
  ];

  // Données fictives pour l'exemple
  const demoFiles = [
    {
      name: 'components',
      type: 'folder',
      children: [
        {
          name: 'chat',
          type: 'folder',
          children: [
            { name: 'BaseChat.tsx', type: 'file', icon: '📄' },
            { name: 'Chat.tsx', type: 'file', icon: '📄' },
            { name: 'Messages.tsx', type: 'file', icon: '📄' },
          ],
        },
        { name: 'dashboard', type: 'folder', children: [{ name: 'Dashboard.tsx', type: 'file', icon: '📄' }] },
      ],
    },
    {
      name: 'lib',
      type: 'folder',
      children: [
        { name: 'hooks', type: 'folder' },
        { name: 'modules', type: 'folder' },
        { name: 'stores', type: 'folder' },
      ],
    },
    {
      name: 'pages',
      type: 'folder',
      children: [
        { name: '_app.tsx', type: 'file', icon: '📄' },
        { name: 'index.tsx', type: 'file', icon: '📄' },
        { name: 'api', type: 'folder' },
      ],
    },
    { name: 'utils', type: 'folder' },
    { name: 'package.json', type: 'file', icon: '📦' },
    { name: 'tsconfig.json', type: 'file', icon: '⚙️' },
  ];

  // Fonction récursive pour afficher l'arborescence des fichiers
  const renderFileTree = (items: any[], level = 0) => {
    return (
      <ul className={`pl-${level * 4}`}>
        {items.map((item, index) => (
          <li key={index} className="mb-1">
            <div
              className={`flex items-center py-1 px-2 rounded hover:bg-gray-100 ${level === 0 ? 'font-medium' : ''}`}
            >
              <span className="mr-2">{item.type === 'folder' ? '📁' : item.icon}</span>
              <span className="truncate">{item.name}</span>
            </div>
            {item.children && item.children.length > 0 && renderFileTree(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  // Contenu pour l'onglet recherche
  const renderSearchContent = () => (
    <div className="p-3">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher dans les fichiers..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="text-xs text-gray-500 mb-2">Recherches récentes</div>
      <ul className="text-sm">
        <li className="py-1 px-2 hover:bg-gray-100 rounded">
          <span className="text-blue-600">const</span> handleMessage
        </li>
        <li className="py-1 px-2 hover:bg-gray-100 rounded">
          <span className="text-blue-600">import</span> React
        </li>
        <li className="py-1 px-2 hover:bg-gray-100 rounded">MessageParser</li>
      </ul>
    </div>
  );

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        'sidebar border-r border-gray-200 bg-white transition-all duration-300 flex flex-col h-full',
        isExpanded ? 'w-64' : 'w-16',
        className,
      )}
    >
      {/* En-tête de la barre latérale */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        {isExpanded && <div className="font-medium text-gray-900">Explorateur</div>}
        <button
          onClick={onToggle}
          className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          aria-label={isExpanded ? 'Réduire' : 'Étendre'}
        >
          {isExpanded ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation des sections */}
      <div className="flex border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={classNames(
              'flex items-center justify-center p-2',
              isExpanded ? 'flex-1' : 'w-full',
              activeSection === section.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900',
            )}
            title={section.label}
          >
            <span className="text-lg">{section.icon}</span>
            {isExpanded && <span className="ml-2 text-sm">{section.label}</span>}
          </button>
        ))}
      </div>

      {/* Contenu de la section active */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'files' && (
          <div className="p-2">
            {isExpanded ? (
              renderFileTree(demoFiles)
            ) : (
              <div className="flex flex-col items-center space-y-3 mt-2">
                {demoFiles.map((item, index) => (
                  <div key={index} className="p-2 rounded-md hover:bg-gray-100" title={item.name}>
                    {item.type === 'folder' ? '📁' : item.icon}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'search' &&
          (isExpanded ? (
            renderSearchContent()
          ) : (
            <div className="flex justify-center mt-4">
              <span className="text-gray-400 text-2xl">🔍</span>
            </div>
          ))}

        {activeSection === 'git' && (
          <div className="p-3 text-center text-sm text-gray-500">
            {isExpanded ? 'Fonctionnalité Git en cours de migration' : '🔀'}
          </div>
        )}

        {activeSection === 'extensions' && (
          <div className="p-3 text-center text-sm text-gray-500">
            {isExpanded ? 'Extensions en cours de migration' : '🧩'}
          </div>
        )}
      </div>

      {/* Pied de page - statut de la migration */}
      <div className="p-2 border-t border-gray-200 bg-blue-50 text-xs text-blue-700">
        {isExpanded ? (
          <div className="flex items-center">
            <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
            <span>Migration Next.js en cours</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
