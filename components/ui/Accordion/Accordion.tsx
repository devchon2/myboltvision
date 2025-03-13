import React, { useState, useRef, useEffect, ReactElement, ReactNode, Children, cloneElement } from 'react';
import styles from './Accordion.module.scss'

export interface AccordionItemProps {
  /**
   * Titre de l'élément d'accordéon
   */
  title: ReactNode;

  /**
   * Contenu de l'élément d'accordéon
   */
  children: ReactNode;

  /**
   * Indique si l'élément est ouvert par défaut
   */
  defaultOpen?: boolean;

  /**
   * Indique si l'élément est désactivé
   */
  disabled?: boolean;

  /**
   * Icône personnalisée pour remplacer l'icône de flèche par défaut
   */
  icon?: ReactNode;

  /**
   * Classes CSS additionnelles
   */
  className?: string;

  /**
   * Gestionnaire d'événement appelé lorsque l'état de l'accordéon change
   */
  onChange?: (isOpen: boolean) => void;
}

/**
 * Composant AccordionItem pour afficher un panneau extensible individuel
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  icon,
  className = '',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0);

  // Met à jour la hauteur du contenu lorsque l'état change
  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    if (isOpen) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);

      // Transition vers 'auto' après l'animation pour permettre un redimensionnement flexible
      const timer = setTimeout(() => {
        setContentHeight('auto');
      }, 300); // Doit correspondre à la durée de transition CSS

      return () => clearTimeout(timer);
    } else {
      // Force la hauteur actuelle avant de passer à 0 pour permettre l'animation
      if (contentHeight === 'auto') {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);

        // Force un reflow pour que le changement de hauteur soit appliqué
        contentRef.current.offsetHeight;
      }

      setContentHeight(0);
    }
  }, [isOpen]);

  // Mise à jour de la hauteur si le contenu change
  useEffect(() => {
    if (isOpen && contentRef.current && contentHeight !== 'auto') {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen, contentHeight]);

  const toggleAccordion = () => {
    if (!disabled) {
      const newState = !isOpen;
      setIsOpen(newState);

      if (onChange) {
        onChange(newState);
      }
    }
  };

  return (
    <div
      className={`${styles.accordionItem} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''} ${className}`}
    >
      <button
        className={styles.accordionHeader}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        disabled={disabled}
        type="button"
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionIcon}>
          {icon || (
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className={isOpen ? styles.iconOpen : ''}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </span>
      </button>

      <div
        ref={contentRef}
        className={styles.accordionContent}
        style={{ height: typeof contentHeight === 'number' ? `${contentHeight}px` : contentHeight }}
        aria-hidden={!isOpen}
      >
        <div className={styles.accordionBody} hidden={!isOpen}>
          {children}
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  /**
   * Les éléments d'accordéon à afficher
   */
  children: ReactNode;

  /**
   * Indique si plusieurs panneaux peuvent être ouverts simultanément
   */
  allowMultiple?: boolean;

  /**
   * Indique si tous les panneaux doivent être fermés par défaut
   */
  defaultCollapseAll?: boolean;

  /**
   * Classes CSS additionnelles
   */
  className?: string;

  /**
   * Gestionnaire d'événement appelé lorsque l'état d'un accordéon change
   */
  onChange?: (expandedItems: number[]) => void;
}

/**
 * Composant Accordion pour organiser le contenu en panneaux extensibles
 *
 * @param children - Éléments AccordionItem
 * @param allowMultiple - Permet d'ouvrir plusieurs panneaux simultanément
 * @param defaultCollapseAll - Ferme tous les panneaux par défaut
 * @param className - Classes CSS additionnelles
 * @param onChange - Fonction appelée quand l'état d'un accordéon change
 */
const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  defaultCollapseAll = false,
  className = '',
  onChange,
}) => {
  // Valide que les enfants sont des AccordionItem
  const validChildren = Children.toArray(children).filter(
    (child): child is ReactElement<AccordionItemProps> =>
      React.isValidElement(child) &&
      (child.type === AccordionItem ||
        // Pour la vérification de type runtime
        (typeof child.type === 'function' && (child.type as any).name === 'AccordionItem')),
  );

  // État pour suivre les indices des éléments ouverts
  const [expandedItems, setExpandedItems] = useState<number[]>(() => {
    if (defaultCollapseAll) {
      return [];
    }

    return validChildren
      .map((child, index) => ((child as React.ReactElement<AccordionItemProps>).props.defaultOpen ? index : null))
      .filter((index): index is number => index !== null);
  });

  const onItemChange = (index: number, isOpen: boolean) => {
    let newExpandedItems: number[];

    if (isOpen) {
      if (allowMultiple) {
        newExpandedItems = [...expandedItems, index];
      } else {
        newExpandedItems = [index];
      }
    } else {
      newExpandedItems = expandedItems.filter((item) => item !== index);
    }

    setExpandedItems(newExpandedItems);

    if (onChange) {
      onChange(newExpandedItems);
    }
  };

  // Rendre les éléments avec des props modifiées
  const items = validChildren.map((child, index) => {
    // Vérifier si cet élément doit être ouvert selon l'état actuel
    const isExpanded = expandedItems.includes(index);

    // Props spécifiques pour le mode contrôlé
    const controlledProps = allowMultiple
      ? {}
      : {
          // Si le mode n'est pas multiple, defaultOpen n'a pas d'effet
          defaultOpen: isExpanded,
        };

    return cloneElement(child, {
      ...child.props,
      ...controlledProps,
      onChange: (isOpen: boolean) => {
        onItemChange(index, isOpen);

        if (child.props.onChange) {
          child.props.onChange(isOpen);
        }
      },
    });
  });

  return <div className={`${styles.accordion} ${className}`}>{items}</div>;
};

export default Accordion;
