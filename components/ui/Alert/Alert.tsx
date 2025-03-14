import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Alert.module.scss';

export interface AlertProps {
  /**
   * Type de l'alerte
   */
  type: 'success' | 'warning' | 'error' | 'info';

  /**
   * Message de l'alerte
   */
  message: string;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className }) => {
  return (
    <div className={classNames(styles.alert, styles[type], className)}>
      {message}
    </div>
  );
};

export default Alert;
