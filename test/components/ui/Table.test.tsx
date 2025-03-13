import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Table, { Column } from '../../../components/ui/Table/Table';

describe('Table Component', () => {
  type TestData = {
    id: number;
    name: string;
    email: string;
    age: number;
  };

  const mockData: TestData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 40 },
  ];

  const mockColumns: Column<TestData>[] = [
    { key: 'name', header: 'Nom' },
    { key: 'email', header: 'Email' },
    { key: 'age', header: 'Âge' },
  ];

  it('should render the table with data', () => {
    render(<Table data={mockData} columns={mockColumns} />);

    // Check if table headers are rendered
    expect(screen.getByText('Nom')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Âge')).toBeInTheDocument();

    // Check if table data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  it('should render empty state when no data is provided', () => {
    const emptyText = 'Aucune donnée disponible';
    render(<Table<TestData> data={[]} columns={mockColumns} emptyText={emptyText} />);

    expect(screen.getByText(emptyText)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('should sort data when header is clicked', () => {
    render(<Table<TestData> data={mockData} columns={mockColumns} enableSorting={true} />);

    // Find the Age header and click it
    const ageHeader = screen.getByText('Âge');
    fireEvent.click(ageHeader);

    // Note: Testing actual sorting would require finding cells in their sorted order
    // This is a simplified test to check the click handler works
    expect(ageHeader).toHaveAttribute('aria-sort', 'ascending');

    // Click again to sort in descending order
    fireEvent.click(ageHeader);
    expect(ageHeader).toHaveAttribute('aria-sort', 'descending');
  });

  it('should use custom render function for cells', () => {
    const columnsWithRender: Column<TestData>[] = [
      ...mockColumns,
      {
        key: 'id',
        header: 'Actions',
        render: (row) => <button data-testid={`edit-${row.id}`}>Éditer</button>,
      },
    ];

    render(<Table<TestData> data={mockData} columns={columnsWithRender} />);

    // Check if custom rendered buttons are in the document
    expect(screen.getByTestId('edit-1')).toBeInTheDocument();
    expect(screen.getByTestId('edit-2')).toBeInTheDocument();
    expect(screen.getByTestId('edit-3')).toBeInTheDocument();
  });

  it('should handle pagination', async () => {
    const largeMockData: TestData[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
      age: 20 + i,
    }));

    render(<Table<TestData> data={largeMockData} columns={mockColumns} enablePagination={true} initialPageSize={5} />);

    // Check if pagination is rendered
    const nextButton = screen.getByText('Suivant');
    expect(nextButton).toBeInTheDocument();

    // Check if only the first page of data is visible
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.getByText('Person 5')).toBeInTheDocument();
    expect(screen.queryByText('Person 6')).not.toBeInTheDocument();

    // Test navigation to next page
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Person 1')).not.toBeInTheDocument();
      expect(screen.getByText('Person 6')).toBeInTheDocument();
      expect(screen.getByText('Person 10')).toBeInTheDocument();
    });
  });

  it('should change page size', async () => {
    const largeMockData: TestData[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
      age: 20 + i,
    }));

    render(<Table<TestData> 
      data={largeMockData} 
      columns={mockColumns} 
      enablePagination={true} 
      initialPageSize={5} 
      pageSizeOptions={[5, 10, 20]}
    />);

    // Vérifier l'état initial (5 éléments par page)
    expect(screen.getByText('Person 5')).toBeInTheDocument();
    expect(screen.queryByText('Person 6')).not.toBeInTheDocument();
    
    // Changer la taille de page à 10
    const pageSizeSelector = screen.getByLabelText('Lignes par page:');
    fireEvent.change(pageSizeSelector, { target: { value: '10' } });
    
    // Vérifier qu'on voit maintenant 10 éléments
    await waitFor(() => {
      expect(screen.getByText('Person 10')).toBeInTheDocument();
      expect(screen.queryByText('Person 11')).not.toBeInTheDocument();
    });
  });
});
