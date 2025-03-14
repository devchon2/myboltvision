import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Footer.module.scss';

export interface FooterProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu du footer
   */
  children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ className, children }) => {
  return (
    <footer className={classNames(styles.footer, className)}>
      {children}
    </footer>
  );
};

export default Footer;
