import React, { useEffect, forwardRef } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Toast.module.scss';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastProps {
  /**
   * Contenu du toast
   */
  message: string;

  /**
   * Type de toast qui détermine l'apparence
   * @default 'info'
   */
  type?: ToastType;

  /**
   * Titre du toast (optionnel)
   */
  title?: string;

  /**
   * Contrôle si le toast est visible
   */
  isVisible: boolean;

  /**
   * Fonction à appeler pour fermer le toast
   */
  onClose: () => void;

  /**
   * Durée avant fermeture automatique (en millisecondes)
   * Utiliser false pour désactiver la fermeture automatique
   * @default 5000
   */
  duration?: number | false;

  /**
   * Si true, le toast aura un bouton X pour fermer
   * @default true
   */
  hasCloseButton?: boolean;

  /**
   * Si true, le toast pourra être fermé par un clic n'importe où dessus
   * @default true
   */
  closeOnClick?: boolean;

  /**
   * Icône personnalisée à afficher (remplace l'icône par défaut)
   */
  icon?: React.ReactNode;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      message,
      type = 'info',
      title,
      isVisible,
      onClose,
      duration = 5000,
      hasCloseButton = true,
      closeOnClick = true,
      icon,
      className,
      ...rest
    },
    ref,
  ) => {
    // Gérer la durée et la fermeture automatique
    useEffect(() => {
      if (!isVisible || duration === false) {
        return;
      }

      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [isVisible, duration, onClose]);

    // Ne pas rendre si pas visible
    if (!isVisible) {
      return null;
    }

    // Rendre l'icône appropriée au type
    const renderIcon = () => {
      if (icon) {
        return icon;
      }

      return (
        <div className={classNames(styles.icon, styles[`icon--${type}`])}>
          {type === 'info' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
                fill="currentColor"
              />
            </svg>
          )}

          {type === 'success' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
                fill="currentColor"
              />
            </svg>
          )}

          {type === 'warning' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7h2v2h-2v-2zm0-8h2v6h-2V7z"
                fill="currentColor"
              />
            </svg>
          )}

          {type === 'error' && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7h2v2h-2v-2zm0-8h2v6h-2V7z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={classNames(styles.toast, styles[`toast--${type}`], className)}
        onClick={closeOnClick ? onClose : undefined}
        role="alert"
        {...rest}
      >
        {renderIcon()}

        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.message}>{message}</div>
        </div>

        {hasCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Fermer"
          >
            <svg viewBox="0 0 24 24" className={styles.closeIcon}>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = 'Toast';

/**
 * Composant qui gère un ensemble de toasts
 */
export interface ToastContainerProps {
  /**
   * Position des toasts dans l'écran
   * @default 'top-right'
   */
  position?: ToastPosition;

  /**
   * Espace entre les toasts
   * @default 8
   */
  gap?: number;

  /**
   * Les enfants (les toasts)
   */
  children: React.ReactNode;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  gap = 8,
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, styles[`container--${position}`], className)} style={{ gap }}>
      {children}
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';

export default Toast;
