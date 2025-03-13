import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../../../components/ui/Loader/Loader';

describe('Loader Component', () => {
  it('should render the loader component', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should render with different variants', () => {
    render(
      <>
        <Loader variant="dots" />
        <Loader variant="pulse" />
        <Loader variant="spinner" />
      </>,
    );
    const loaderDots = screen.getAllByRole('status');
    expect(loaderDots.length).toBe(3);
  });

  it('should render with custom size', () => {
    render(<Loader size="lg" />);
    const loaderLarge = screen.getByRole('status');
    expect(loaderLarge).toHaveClass('_lg_fad745');
  });
});
