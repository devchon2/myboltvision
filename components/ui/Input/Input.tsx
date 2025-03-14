import React, { forwardRef, InputHTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Icône à afficher avant le contenu
   */
  leftIcon?: React.ReactNode;

  /**
   * Icône à afficher après le contenu
   */
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, ...rest }, ref) => {
    return (
      <div className={classNames(styles.inputWrapper, className)}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input ref={ref} className={styles.input} {...rest} />
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
