'use client';
import { createGlobalStyle } from 'styled-components';

export const colors = {
  primary: '#2563EB',
  secondary: '#7C3AED',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  background: '#F9FAFB',
  text: '#1F2937'
};

export const typography = {
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Poppins, sans-serif',
  sizes: {
    h1: '3rem',
    h2: '2.25rem',
    h3: '1.5rem',
    body: '1rem',
    small: '0.875rem'
  }
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${typography.fontFamily};
    color: ${colors.text};
    background-color: ${colors.background};
    line-height: 1.5;
  }

  h1, h2, h3 {
    font-family: ${typography.headingFont};
    font-weight: 600;
  }

  a {
    color: ${colors.primary};
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;
