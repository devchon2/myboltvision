import React from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './Form.module.scss';

export interface FormProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Contenu du formulaire
   */
  children: React.ReactNode;

  /**
   * Fonction pour soumettre le formulaire
   */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<FormProps> = ({ className, children, onSubmit }) => {
  return (
    <form className={classNames(styles.form, className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
