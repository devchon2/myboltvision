import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Dropdown, { DropdownOption } from '../../../components/ui/Dropdown/Dropdown';

describe('Dropdown Component', () => {
  const options: DropdownOption[] = [
    { id: '1', label: 'Option 1', value: 'option1' },
    { id: '2', label: 'Option 2', value: 'option2' },
    { id: '3', label: 'Option 3', value: 'option3' },
  ];

  it('should render the dropdown component', () => {
    render(<Dropdown options={options} onChange={() => {}} />);
    const dropdownElement = screen.getByText('Sélectionner...');
    expect(dropdownElement).toBeInTheDocument();
  });

  it('should open the dropdown menu when clicked', async () => {
    render(<Dropdown options={options} onChange={() => {}} />);
    const dropdownHeader = screen.getByText('Sélectionner...');
    fireEvent.click(dropdownHeader);
    
    // Vérifier que le menu s'ouvre
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  it('should close the dropdown menu when clicking outside', async () => {
    render(
      <div>
        <Dropdown options={options} onChange={() => {}} />
        <div data-testid="outside-element">Click outside</div>
      </div>,
    );
    
    // Ouvrir le dropdown
    const dropdownHeader = screen.getByText('Sélectionner...');
    fireEvent.click(dropdownHeader);
    
    // Vérifier que le menu est ouvert
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
    
    // Cliquer à l'extérieur et vérifier que le menu se ferme
    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('should render options in the dropdown menu', async () => {
    render(<Dropdown options={options} onChange={() => {}} />);
    
    // Ouvrir le dropdown
    const dropdownHeader = screen.getByText('Sélectionner...');
    fireEvent.click(dropdownHeader);
    
    // Vérifier la présence de toutes les options
    await waitFor(() => {
      options.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });
  });

  it('should call onChange when an option is selected', async () => {
    const onChange = vi.fn();
    render(<Dropdown options={options} onChange={onChange} />);
    
    // Ouvrir le dropdown
    const dropdownHeader = screen.getByText('Sélectionner...');
    fireEvent.click(dropdownHeader);
    
    // Attendre que les options soient affichées et cliquer sur la première
    await waitFor(() => {
      const option1 = screen.getByText('Option 1');
      expect(option1).toBeInTheDocument();
      fireEvent.click(option1);
    });
    
    // Vérifier que onChange a été appelé avec la bonne valeur
    expect(onChange).toHaveBeenCalledWith('option1');
  });

  it('should display selected value after selection', async () => {
    const { rerender } = render(
      <Dropdown options={options} onChange={() => {}} value="option1" />
    );
    
    // Vérifier que la valeur sélectionnée est affichée
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Changer la valeur et vérifier la mise à jour
    rerender(<Dropdown options={options} onChange={() => {}} value="option2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
