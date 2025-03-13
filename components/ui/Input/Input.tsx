import React, { forwardRef, useState, InputHTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Input.module.scss';

export type InputVariant = 'default' | 'outlined' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'error' | 'success';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Variante de style de l'input
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Taille de l'input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * État de validation de l'input
   * @default 'default'
   */
  status?: InputStatus;

  /**
   * Si true, l'input prendra toute la largeur disponible
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Label à afficher au-dessus de l'input
   */
  label?: string;

  /**
   * Texte d'aide à afficher sous l'input
   */
  helperText?: string;

  /**
   * Message d'erreur à afficher lorsque status='error'
   */
  errorText?: string;

  /**
   * Icône à afficher avant le contenu
   */
  leftIcon?: React.ReactNode;

  /**
   * Icône à afficher après le contenu
   */
  rightIcon?: React.ReactNode;

  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * ID de l'input pour l'association avec le label
   */
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      status = 'default',
      fullWidth = true,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      className,
      id: propId,
      disabled = false,
      required = false,
      ...rest
    },
    ref,
  ) => {
    const [id] = useState(() => propId || `input-${Math.random().toString(36).substring(2, 9)}`);

    // Détermination du texte d'aide à afficher
    const displayHelperText = status === 'error' ? errorText : helperText;

    return (
      <div
        className={classNames(
          styles.container,
          {
            [styles['container--fullWidth']]: fullWidth,
            [styles['container--disabled']]: disabled,
          },
          className,
        )}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={status === 'error'}
            aria-describedby={displayHelperText ? `${id}-helper-text` : undefined}
            className={classNames(
              styles.input,
              styles[`input--${variant}`],
              styles[`input--${size}`],
              styles[`input--${status}`],
              {
                [styles['input--withLeftIcon']]: !!leftIcon,
                [styles['input--withRightIcon']]: !!rightIcon,
              },
            )}
            {...rest}
          />

          {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </div>

        {displayHelperText && (
          <div
            id={`${id}-helper-text`}
            className={classNames(styles.helperText, { [styles[`helperText--${status}`]]: status !== 'default' })}
          >
            {displayHelperText}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
