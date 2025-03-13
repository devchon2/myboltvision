import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import BackgroundRays from './BackgroundRays';
import { Button } from './Button/Button';
import { Card } from './Card/Card';
import { Input } from './Input/Input';
import { Modal } from './Modal/Modal';
import { Toast } from './Toast/Toast';
import { theme } from './styles/theme';

export const UIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundRays />
      {children}
      <Toast message="" isVisible={false} onClose={() => {}} />
    </ThemeProvider>
  );
};

export { Button, Card, Input, Modal };
