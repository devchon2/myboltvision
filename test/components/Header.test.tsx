import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/header/Header.tsx';
import { useRouter } from 'next/router';
import { beforeEach, describe, it, expect, vi } from 'vitest';

// Mock useRouter
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mock before each test
    (useRouter as any).mockReturnValue({
      pathname: '/',
      asPath: '/',
      query: {},
      route: '/',
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      reload: vi.fn(),
      isFallback: false,
    });
  });

  it('should render the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('BoltVision Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Fonctionnalités')).toBeInTheDocument();
    expect(screen.getByText('Tarifs')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(<Header />);
    const accueilLink = screen.getByText('Accueil');
    expect(accueilLink).toHaveAttribute('href', '/');

    const featuresLink = screen.getByText('Fonctionnalités');
    expect(featuresLink).toHaveAttribute('href', '/features');

    const pricingLink = screen.getByText('Tarifs');
    expect(pricingLink).toHaveAttribute('href', '/pricing');

    const contactLink = screen.getByText('Contact');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});
