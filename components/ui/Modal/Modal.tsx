import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../../utils/classNames';
import styles from './Modal.module.scss';

export interface ModalProps {
  /**
   * Contrôle si la modal est ouverte
   * @default false
   */
  isOpen: boolean;

  /**
   * Fonction appelée à la fermeture de la modal
   */
  onClose: () => void;

  /**
   * Titre de la modal
   */
  title?: React.ReactNode;

  /**
   * Si true, la modal aura un bouton X pour fermer
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Affiche un overlay sombre derrière la modal
   * @default true
   */
  hasOverlay?: boolean;

  /**
   * Si true, ferme la modal lors d'un clic sur l'overlay
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Si true, ferme la modal sur la touche Échap
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Taille de la modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';

  /**
   * Contenu du footer (optionnel)
   */
  footer?: React.ReactNode;

  /**
   * Content du contenu (vertical)
   * @default 'top'
   */
  verticalAlign?: 'top' | 'center' | 'bottom';

  /**
   * Classes CSS personnalisées pour la modal
   */
  className?: string;

  /**
   * Classes CSS personnalisées pour l'overlay
   */
  overlayClassName?: string;

  /**
   * Les enfants à afficher dans le corps de la modal
   */
  children: React.ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      showCloseButton = true,
      hasOverlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      size = 'md',
      footer,
      verticalAlign = 'center',
      className,
      overlayClassName,
      children,
    },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Gérer le montage côté client
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Fermer la modal avec la touche Échap
    useEffect(() => {
      if (!isOpen || !closeOnEscape) {
        return;
      }

      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isOpen, closeOnEscape, onClose]);

    // Verrouiller le scroll du body quand la modal est ouverte
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Le gestionnaire de clic pour l'overlay
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnOverlayClick) {
        return;
      }

      // S'assurer que le clic est bien sur l'overlay et non sur le contenu de la modal
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    // Si la modal n'est pas ouverte ou n'est pas montée, ne rien afficher
    if (!isOpen || !mounted) {
      return null;
    }

    // Créer le contenu du portail
    const modalContent = (
      <div
        className={classNames(styles.modalContainer, styles[`modalContainer--${verticalAlign}`])}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Overlay */}
        {hasOverlay && <div className={classNames(styles.overlay, overlayClassName)} onClick={handleOverlayClick} />}

        {/* Modal */}
        <div ref={ref} className={classNames(styles.modal, styles[`modal--${size}`], className)}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={styles.modalHeader}>
              {title && (
                <h2 id="modal-title" className={styles.modalTitle}>
                  {title}
                </h2>
              )}

              {showCloseButton && (
                <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fermer">
                  <svg viewBox="0 0 24 24" className={styles.closeIcon}>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div ref={contentRef} className={styles.modalBody}>
            {children}
          </div>

          {/* Footer */}
          {footer && <div className={styles.modalFooter}>{footer}</div>}
        </div>
      </div>
    );

    // Utiliser createPortal pour rendre la modal à la fin du body
    return createPortal(modalContent, document.body);
  },
);

Modal.displayName = 'Modal';

export default Modal;
