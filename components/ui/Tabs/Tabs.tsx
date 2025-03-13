'use client';

import React, { useState, Children, cloneElement } from 'react';
import styles from './Tabs.module.scss';

export interface TabItemProps {
  /**
   * Libellé de l'onglet
   */
  label: string;

  /**
   * Contenu de l'onglet
   */
  children: React.ReactNode;

  /**
   * Indique si l'onglet est désactivé
   */
  disabled?: boolean;
}

/**
 * Composant TabItem pour définir un onglet individuel
 */
export const TabItem: React.FC<TabItemProps> = ({ label, children, disabled = false }) => {
  return (
    <div role="tabpanel" hidden>
      {children}
    </div>
  );
};

export interface TabsProps {
  /**
   * Les éléments TabItem à afficher comme onglets
   */
  children: React.ReactNode;

  /**
   * Indice de l'onglet initialement sélectionné (0-indexé)
   */
  defaultIndex?: number;

  /**
   * Style de variante pour les onglets
   */
  variant?: 'primary' | 'secondary';

  /**
   * Alignement des onglets
   */
  align?: 'start' | 'center' | 'end' | 'fill';

  /**
   * Classes CSS additionnelles
   */
  className?: string;

  /**
   * Gestionnaire d'événement appelé lors du changement d'onglet
   */
  onChange?: (index: number) => void;
}

/**
 * Composant Tabs pour la navigation par onglets
 *
 * @param children - Éléments TabItem
 * @param defaultIndex - Index de l'onglet sélectionné par défaut
 * @param variant - Style de variante ('primary' ou 'secondary')
 * @param align - Alignement des onglets ('start', 'center', 'end', 'fill')
 * @param className - Classes CSS additionnelles
 * @param onChange - Fonction appelée quand l'onglet actif change
 */
const Tabs: React.FC<TabsProps> = ({
  children,
  defaultIndex = 0,
  variant = 'primary',
  align = 'start',
  className = '',
  onChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  // Valide que les enfants sont des TabItem
  const validChildren = Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child.type === TabItem ||
        // Pour la vérification de type runtime
        (typeof child.type === 'function' && (child.type as any).name === 'TabItem')),
  ) as React.ReactElement[];

  const handleTabClick = (index: number) => {
    if (index !== selectedIndex && !validChildren[index].props.disabled) {
      setSelectedIndex(index);

      if (onChange) {
        onChange(index);
      }
    }
  };

  // Clone les enfants pour ajouter des props et gestionnaires
  const tabsHeaders = validChildren.map((child, index) => {
    const isSelected = index === selectedIndex;

    return cloneElement(child, {
      key: index,
      tabIndex: 0,
      role: 'tabpanel',
      hidden: !isSelected,
      'aria-labelledby': `tab-${index}`,
      children: <div className={styles.tabContent}>{child.props.children}</div>,
    });
  });

  const tabList = (
    <ul
      className={`${styles.tabList} ${styles[variant]} ${styles[align]}`}
      role="tablist"
      aria-orientation="horizontal"
    >
      {validChildren.map((child, index) => {
        const isSelected = index === selectedIndex;

        return (
          <li
            key={index}
            className={`${styles.tabItem} ${isSelected ? styles.selected : ''} ${child.props.disabled ? styles.disabled : ''}`}
            role="presentation"
          >
            <button
              id={`tab-${index}`}
              className={styles.tabButton}
              role="tab"
              type="button"
              aria-selected={isSelected}
              aria-controls={`tabpanel-${index}`}
              disabled={child.props.disabled}
              onClick={() => handleTabClick(index)}
            >
              {child.props.label}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={`${styles.tabs} ${className}`}>
      {tabList}
      <div className={styles.tabPanels}>{tabsHeaders}</div>
    </div>
  );
};

export default Tabs;
