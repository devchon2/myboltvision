import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Sidebar.module.scss';

export interface SidebarProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu de la sidebar
   */
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <aside className={classNames(styles.sidebar, className)}>
      {children}
    </aside>
  );
};

export default Sidebar;
