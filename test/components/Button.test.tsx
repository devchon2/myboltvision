import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Button } from '../../components/ui/Button/Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('_button_2b1b0b');
  });

  test('renders with primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('_button--primary_2b1b0b');
  });

  test('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('_button--secondary_2b1b0b');
  });

  test('handles click event', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button', { name: /click/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
