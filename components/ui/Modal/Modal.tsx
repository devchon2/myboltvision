import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Modal.module.scss';

export interface ModalProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu de la modal
   */
  children: React.ReactNode;

  /**
   * Fonction pour fermer la modal
   */
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ className, children, onClose }) => {
  return (
    <div className={classNames(styles.modalOverlay, className)} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Modal;
