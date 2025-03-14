import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Card.module.scss';

export interface CardProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu de la carte
   */
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={classNames(styles.card, className)}>
      {children}
    </div>
  );
};

export default Card;
