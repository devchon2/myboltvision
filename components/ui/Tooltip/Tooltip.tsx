'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.scss';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /**
   * Contenu du tooltip
   */
  content: React.ReactNode;

  /**
   * Position du tooltip par rapport à l'élément enfant
   */
  position?: TooltipPosition;

  /**
   * Délai avant l'affichage du tooltip (en ms)
   */
  delay?: number;

  /**
   * Indique si le tooltip doit rester visible après le hover
   */
  persistent?: boolean;

  /**
   * Élément enfant sur lequel le tooltip sera attaché
   */
  children: React.ReactElement;

  /**
   * Classes CSS additionnelles
   */
  className?: string;

  /**
   * Largeur maximale du tooltip
   */
  maxWidth?: number;

  /**
   * Style personnalisé du tooltip
   */
  tooltipStyle?: React.CSSProperties;
}

/**
 * Composant Tooltip pour afficher des infobulles contextuelles
 *
 * @param content - Contenu du tooltip (texte ou JSX)
 * @param position - Position du tooltip (top, bottom, left, right)
 * @param delay - Délai avant l'affichage (ms)
 * @param persistent - Si true, le tooltip reste visible jusqu'à clic extérieur
 * @param children - Élément enfant sur lequel le tooltip sera attaché
 * @param className - Classes CSS additionnelles
 * @param maxWidth - Largeur maximale du tooltip en pixels
 * @param tooltipStyle - Styles CSS personnalisés
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 300,
  persistent = false,
  children,
  className = '',
  maxWidth = 250,
  tooltipStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour calculer la position du tooltip
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 10;
        left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 10;
        left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left + scrollLeft - tooltipRect.width - 10;
        break;
      case 'right':
        top = triggerRect.top + scrollTop + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + scrollLeft + 10;
        break;
    }

    // Ajustement pour éviter que le tooltip dépasse de l'écran
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 5;
    if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 5;
    if (top < 0) top = 5;
    if (top + tooltipRect.height > viewportHeight + scrollTop) {
      top = triggerRect.top + scrollTop - tooltipRect.height - 10;
    }

    setCoords({ top, left });
  };

  // Gestion du clic en dehors pour les tooltips persistants
  useEffect(() => {
    if (persistent && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [persistent, isVisible]);

  // Recalcule la position quand le tooltip devient visible
  useEffect(() => {
    if (isVisible) {
      calculatePosition();

      // Recalcule la position lors du défilement ou du redimensionnement
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

  // Nettoyage du timeout si le composant est démonté
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!persistent || !isVisible) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!persistent) {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (persistent) {
      setIsVisible(!isVisible);
    }
  };

  // Clone l'élément enfant pour lui ajouter des gestionnaires d'événements
  const triggerElement = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: (e: React.MouseEvent) => {
      if (persistent) {
        handleClick();
      }
      // Préserve le gestionnaire onClick original de l'enfant
      if ((children.props as any).onClick) {
        (children.props as any).onClick(e);
      }
    },
  } as React.HTMLProps<HTMLElement>);

  return (
    <>
      <div 
        ref={triggerRef} 
        className={styles.tooltipTrigger}
        aria-describedby={isVisible ? `tooltip-${triggerRef.current?.id || Math.random().toString(36).substr(2, 9)}` : undefined}
      >
        {triggerElement}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          id={`tooltip-${triggerRef.current?.id || Math.random().toString(36).substr(2, 9)}`}
          className={`${styles.tooltip} ${styles[position]} ${className}`}
          style={{
            ...tooltipStyle,
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            maxWidth: `${maxWidth}px`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.tooltipContent}>{content}</div>
          <div className={styles.tooltipArrow}></div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
