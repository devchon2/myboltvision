import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Header.module.scss';

export interface HeaderProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu du header
   */
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ className, children }) => {
  return (
    <header className={classNames(styles.header, className)}>
      {children}
    </header>
  );
};

export default Header;
