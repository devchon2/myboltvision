import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante de style du bouton
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Taille du bouton
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Si true, le bouton prendra toute la largeur disponible
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Affiche un état de chargement
   * @default false
   */
  loading?: boolean;

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
   * Contenu du bouton
   */
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    // Gestion du loading et disabled
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classNames(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${size}`],
          {
            [styles['button--fullWidth']]: fullWidth,
            [styles['button--loading']]: loading,
            [styles['button--disabled']]: isDisabled,
          },
          className,
        )}
        {...rest}
      >
        {/* Spinner de chargement */}
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <span className={styles.spinnerDot}></span>
            <span className={styles.spinnerDot}></span>
            <span className={styles.spinnerDot}></span>
          </span>
        )}

        {/* Icône à gauche */}
        {leftIcon && !loading && <span className={styles.leftIcon}>{leftIcon}</span>}

        {/* Contenu */}
        <span className={styles.content}>{children}</span>

        {/* Icône à droite */}
        {rightIcon && !loading && <span className={styles.rightIcon}>{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
