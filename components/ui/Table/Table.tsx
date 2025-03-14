import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Table.module.scss';

export interface TableProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu de la table
   */
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ className, children }) => {
  return (
    <table className={classNames(styles.table, className)}>
      {children}
    </table>
  );
};

export default Table;
