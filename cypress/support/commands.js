// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Import cypress-image-snapshot commands
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

// Add the 'matchImageSnapshot' command
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // 3% threshold
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  capture: 'viewport',
});

// Custom command to test accessibility
Cypress.Commands.add('checkA11y', (context, options) => {
  cy.log('Checking accessibility');
  // Basic implementation for now
  cy.get('button, a, input, select').should('have.attr', 'aria-label').or('have.attr', 'aria-labelledby');
});

// Custom command to simulate pressing the Tab key (for keyboard navigation testing)
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  const tabEvent = {
    key: 'Tab',
    code: 'Tab',
    which: 9,
    keyCode: 9,
    bubbles: true,
    cancelable: true,
  };

  if (subject) {
    return cy.wrap(subject).trigger('keydown', tabEvent);
  }

  return cy
    .focused()
    .trigger('keydown', tabEvent)
    .then(() => {
      return cy.document().trigger('keyup', tabEvent);
    });
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, target) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, selector) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
