import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  onChange: (value: string) => void;
  value?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === selectedValue);

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Sélectionner...'}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <button
              key={option.id}
              className={styles.dropdownOption}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
