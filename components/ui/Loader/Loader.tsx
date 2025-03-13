'use client';

import React from 'react';
import styles from './Loader.module.scss';

export interface LoaderProps {
  /**
   * Taille du loader
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Variante du loader
   */
  variant?: 'spinner' | 'dots' | 'pulse';

  /**
   * Couleur du loader, par défaut utilise la couleur principale
   */
  color?: string;

  /**
   * Texte à afficher sous le loader
   */
  text?: string;

  /**
   * Classes CSS additionnelles
   */
  className?: string;
}

/**
 * Composant Loader pour indiquer un chargement en cours
 *
 * @param size - Taille du loader (sm, md, lg)
 * @param variant - Type d'animation (spinner, dots, pulse)
 * @param color - Couleur personnalisée (CSS ou HEX)
 * @param text - Texte explicatif
 * @param className - Classes CSS additionnelles
 */
const Loader: React.FC<LoaderProps> = ({ size = 'md', variant = 'spinner', color, text, className = '' }) => {
  const loaderStyle = color ? ({ '--loader-color': color } as React.CSSProperties) : {};

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={styles.dots} style={loaderStyle}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        );

      case 'pulse':
        return <div className={styles.pulse} style={loaderStyle}></div>;

      case 'spinner':
      default:
        return (
          <div className={styles.spinner} style={loaderStyle}>
            <svg viewBox="0 0 50 50">
              <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`${styles.loader} ${styles[size]} ${className}`} role="status" aria-live="polite">
      {renderLoader()}

      {text && <div className={styles.text}>{text}</div>}

      <span className={styles.srOnly}>Chargement en cours...</span>
    </div>
  );
};

export default Loader;
