import React, { forwardRef, HTMLAttributes } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Card.module.scss';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Variante de style de la carte
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Contenu du header (optionnel)
   */
  header?: React.ReactNode;

  /**
   * Contenu du footer (optionnel)
   */
  footer?: React.ReactNode;

  /**
   * Largeur maximum de la carte
   */
  maxWidth?: string | number;

  /**
   * Si true, la carte prendra toute la largeur disponible
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Si true, la carte aura des coins plus arrondis
   * @default false
   */
  rounded?: boolean;

  /**
   * Si true, la carte n'aura pas de padding interne
   * @default false
   */
  noPadding?: boolean;

  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu principal de la carte
   */
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      header,
      footer,
      maxWidth,
      fullWidth = false,
      rounded = false,
      noPadding = false,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const cardStyle = {
      ...(maxWidth ? { maxWidth } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={classNames(
          styles.card,
          styles[`card--${variant}`],
          {
            [styles['card--fullWidth']]: fullWidth,
            [styles['card--rounded']]: rounded,
            [styles['card--noPadding']]: noPadding,
          },
          className,
        )}
        style={cardStyle}
        {...rest}
      >
        {header && <div className={styles.cardHeader}>{header}</div>}
        <div className={styles.cardContent}>{children}</div>
        {footer && <div className={styles.cardFooter}>{footer}</div>}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
