import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Tabs, { TabItem } from '../../../components/ui/Tabs/Tabs';

describe('Tabs Component', () => {
  it('should render the tabs component', () => {
    render(
      <Tabs>
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>,
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent('Tab 1');
    expect(tabs[1]).toHaveTextContent('Tab 2');
  });

  it('should show the first tab content by default', () => {
    render(
      <Tabs>
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>,
    );

    // Vérifier que le premier onglet est sélectionné
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    
    // Vérifier que le contenu du premier onglet est visible
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    
    // Vérifier que le contenu du second onglet n'est pas visible
    const tabPanels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(tabPanels[1]).toHaveAttribute('hidden');
  });

  it('should switch to clicked tab', () => {
    render(
      <Tabs>
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>,
    );

    // Cliquer sur le second onglet
    const tab2 = screen.getAllByRole('tab')[1];
    fireEvent.click(tab2);

    // Vérifier que le second onglet est sélectionné
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    
    // Vérifier que le contenu du second onglet est visible
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    
    // Vérifier que le premier onglet n'est plus sélectionné
    const tab1 = screen.getAllByRole('tab')[0];
    expect(tab1).not.toHaveAttribute('aria-selected', 'true');
  });

  it('should call onChange callback when a tab is selected', () => {
    const onChange = vi.fn();
    render(
      <Tabs onChange={onChange}>
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>,
    );

    // Cliquer sur le second onglet
    const tab2 = screen.getAllByRole('tab')[1];
    fireEvent.click(tab2);

    // onChange doit être appelé avec l'index 1 (second onglet)
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should support defaultIndex to set initial active tab', () => {
    render(
      <Tabs defaultIndex={1}>
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>,
    );

    // Le second onglet doit être sélectionné par défaut
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

    // Le contenu du second onglet doit être visible
    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
  });

  it('should disable tab interaction for disabled tabs', () => {
    const onChange = vi.fn();
    render(
      <Tabs onChange={onChange}>
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2" disabled>
          Tab 2 Content
        </TabItem>
      </Tabs>,
    );

    // Le second onglet doit être désactivé
    const tab2 = screen.getAllByRole('tab')[1];
    expect(tab2).toBeDisabled();

    // Le clic sur un onglet désactivé ne doit pas déclencher onChange
    fireEvent.click(tab2);
    expect(onChange).not.toHaveBeenCalled();
  });
  
  it('should support different variants', () => {
    render(
      <Tabs variant="secondary">
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>
    );
    
    // Vérifier que la classe de variante est appliquée
    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveClass('_secondary_3cb3fe');
  });
  
  it('should support different alignments', () => {
    render(
      <Tabs align="center">
        <TabItem label="Tab 1">Tab 1 Content</TabItem>
        <TabItem label="Tab 2">Tab 2 Content</TabItem>
      </Tabs>
    );
    
    // Vérifier que la classe d'alignement est appliquée
    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveClass('_center_3cb3fe');
  });
});
