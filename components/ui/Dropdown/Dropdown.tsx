import React, { useState } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Dropdown.module.scss';

export interface DropdownProps {
  /**
   * Titre du dropdown
   */
  title: string;

  /**
   * Contenu du dropdown
   */
  children: React.ReactNode;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(styles.dropdown, className)}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {title}
      </button>
      {isOpen && <div className={styles.dropdownContent}>{children}</div>}
    </div>
  );
};

export default Dropdown;
