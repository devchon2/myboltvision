'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  id: string | number;
  label: string;
  value: any;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[] | null;
  placeholder?: string;
  onChange: (value: any) => void;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  clearable?: boolean;
  maxHeight?: number;
}

/**
 * Composant Dropdown permettant la sélection d'une ou plusieurs options dans une liste déroulante
 *
 * @param options - Liste des options disponibles
 * @param value - Valeur(s) sélectionnée(s)
 * @param placeholder - Texte affiché quand aucune valeur n'est sélectionnée
 * @param onChange - Fonction appelée quand la sélection change
 * @param className - Classes CSS additionnelles
 * @param disabled - Désactive le dropdown
 * @param multiple - Permet la sélection multiple
 * @param searchable - Permet la recherche dans les options
 * @param error - Message d'erreur à afficher
 * @param label - Libellé du dropdown
 * @param required - Indique si le champ est obligatoire
 * @param clearable - Permet de vider la sélection
 * @param maxHeight - Hauteur maximale de la liste déroulante
 */
const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = 'Sélectionner...',
  onChange,
  className = '',
  disabled = false,
  multiple = false,
  searchable = false,
  error,
  label,
  required = false,
  clearable = true,
  maxHeight = 250,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ferme le dropdown si on clique en dehors
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

  // Focus sur l'input de recherche quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (disabled || option.disabled) {
      return;
    }

    if (multiple) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      const optionIndex = currentValues.indexOf(option.value);

      if (optionIndex >= 0) {
        currentValues.splice(optionIndex, 1);
      } else {
        currentValues.push(option.value);
      }

      onChange(currentValues);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const getSelectedLabels = () => {
    if (!value) {
      return '';
    }

    if (multiple && Array.isArray(value)) {
      return value
        .map((v) => options.find((o) => o.value === v)?.label)
        .filter(Boolean)
        .join(', ');
    }

    const selectedOption = options.find((o) => o.value === value);

    return selectedOption ? selectedOption.label : '';
  };

  const isOptionSelected = (option: DropdownOption) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(option.value);
    }

    return value === option.value;
  };

  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''}`}
      >
        <div
          className={styles.dropdownHeader}
          onClick={toggleDropdown}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className={styles.selectedValue}>{getSelectedLabels() || placeholder}</div>

          <div className={styles.dropdownActions}>
            {clearable && value && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                aria-label="Effacer la sélection"
              >
                &times;
              </button>
            )}
            <div className={styles.dropdownIcon}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className={styles.dropdownMenu} style={{ maxHeight: `${maxHeight}px` }} role="listbox">
            {searchable && (
              <div className={styles.searchContainer}>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {filteredOptions.length === 0 ? (
              <div className={styles.noOptions}>Aucun résultat</div>
            ) : (
              <ul className={styles.optionsList}>
                {filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`
                      ${styles.option} 
                      ${isOptionSelected(option) ? styles.selected : ''} 
                      ${option.disabled ? styles.disabled : ''}
                    `}
                    onClick={() => handleOptionClick(option)}
                  >
                    {multiple && (
                      <span className={styles.checkbox}>
                        {isOptionSelected(option) && (
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </span>
                    )}
                    <span className={styles.optionLabel}>{option.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Dropdown;
