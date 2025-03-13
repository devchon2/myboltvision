import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion, { AccordionItem } from '../../../components/ui/Accordion/Accordion';

describe('Accordion Component', () => {
  it('should render the accordion component', () => {
    render(
      <Accordion>
        <AccordionItem title="Section 1">Content for section 1</AccordionItem>
      </Accordion>,
    );
    const accordionElement = screen.getByRole('button', { name: /Section 1/i });
    expect(accordionElement).toBeInTheDocument();
  });

  it('should render accordion items', () => {
    render(
      <Accordion>
        <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        <AccordionItem title="Section 2">Content for section 2</AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole('button', { name: /Section 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Section 2/i })).toBeInTheDocument();
  });

  it('should initially collapse accordion items', () => {
    render(
      <Accordion>
        <AccordionItem title="Section 1">Content for section 1</AccordionItem>
      </Accordion>,
    );
    const content = screen.getByText('Content for section 1');
    expect(content).not.toBeVisible();
  });

  it('should open accordion items on click', () => {
    render(
      <Accordion>
        <AccordionItem title="Section 1">Content for section 1</AccordionItem>
      </Accordion>,
    );
    const accordionElement = screen.getByRole('button', { name: /Section 1/i });
    fireEvent.click(accordionElement);
    const content = screen.getByText('Content for section 1');
    expect(content).toBeVisible();
  });
});
