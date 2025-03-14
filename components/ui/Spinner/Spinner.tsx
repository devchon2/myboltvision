import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={classNames(styles.spinner, className)}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default Spinner;
