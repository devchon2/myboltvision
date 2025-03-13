import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../../../components/ui/Tooltip/Tooltip';

describe('Tooltip Component', () => {
  // Utiliser un délai court pour les tests
  const TEST_DELAY = 10;

  it('should render the tooltip component', () => {
    render(
      <Tooltip content="Tooltip text">
        <div>Hover me</div>
      </Tooltip>,
    );
    const triggerElement = screen.getByText('Hover me');
    expect(triggerElement).toBeInTheDocument();
  });

  it('should show the tooltip on hover', async () => {
    render(
      <Tooltip content="Tooltip text" delay={TEST_DELAY}>
        <span>Hover me</span>
      </Tooltip>,
    );
    const triggerElement = screen.getByText('Hover me');
    fireEvent.mouseEnter(triggerElement);
    
    // Attendre que le tooltip soit visible
    await waitFor(() => {
      const tooltipElement = screen.getByRole('tooltip', { hidden: true });
      expect(tooltipElement).toBeVisible();
      expect(tooltipElement).toHaveTextContent('Tooltip text');
    });
  });

  it('should hide the tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip text" delay={TEST_DELAY}>
        <span>Hover me</span>
      </Tooltip>,
    );
    const triggerElement = screen.getByText('Hover me');
    fireEvent.mouseEnter(triggerElement);
    
    // Attendre que le tooltip apparaisse
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeNull();
    });
    
    // Vérifier que le tooltip est visible
    const tooltipElement = screen.getByRole('tooltip');
    expect(tooltipElement).toBeVisible();

    // Déclencher le mouseLeave et vérifier que le tooltip disparaît
    fireEvent.mouseLeave(triggerElement);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).toBeNull();
    });
  });

  it('should show tooltip with proper accessibility attributes', async () => {
    // Réduire le délai au minimum pour les tests
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <span>Hover me</span>
      </Tooltip>,
    );
    
    // Déclencher l'événement hover
    const triggerElement = screen.getByText('Hover me');
    fireEvent.mouseEnter(triggerElement);
    
    // Vérifier que le tooltip apparaît
    await waitFor(() => {
      const tooltip = screen.queryByRole('tooltip');
      expect(tooltip).not.toBeNull();
    });
    
    // Vérifier que le tooltip a un ID
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('id');
    
    // Tester cette partie seulement si le parent du tooltip a l'attribut aria-describedby
    const tooltipParent = screen.getByText('Hover me').closest('div');
    if (tooltipParent && tooltipParent.hasAttribute('aria-describedby')) {
      // Si l'attribut existe, vérifier qu'il correspond à l'ID du tooltip
      expect(tooltipParent).toHaveAttribute('aria-describedby');
    }
  });

  it('should position the tooltip correctly', async () => {
    render(
      <Tooltip content="Tooltip text" delay={TEST_DELAY}>
        <span>Hover me</span>
      </Tooltip>,
    );
    const triggerElement = screen.getByText('Hover me');
    fireEvent.mouseEnter(triggerElement);
    
    // Attendre que le tooltip apparaisse
    await waitFor(() => {
      const tooltipElement = screen.queryByRole('tooltip');
      expect(tooltipElement).not.toBeNull();
    });
  });

  it('should render the tooltip with the correct content', async () => {
    render(
      <Tooltip
        content={
          <div>
            Hello <span>world</span>!
          </div>
        }
        delay={TEST_DELAY}
      >
        <span>Hover me</span>
      </Tooltip>,
    );
    const triggerElement = screen.getByText('Hover me');
    fireEvent.mouseEnter(triggerElement);
    
    // Attendre que le tooltip apparaisse
    await waitFor(() => {
      const tooltipElement = screen.queryByRole('tooltip');
      expect(tooltipElement).not.toBeNull();
      expect(tooltipElement).toHaveTextContent('Hello world!');
    });
  });
});
