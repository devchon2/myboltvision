import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Tooltip.module.scss';

export interface TooltipProps {
  /**
   * Texte du tooltip
   */
  text: string;

  /**
   * Contenu sur lequel le tooltip s'affiche
   */
  children: React.ReactNode;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, className }) => {
  return (
    <div className={classNames(styles.tooltipWrapper, className)}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;
