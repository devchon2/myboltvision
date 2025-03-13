describe('UI Tests', () => {
  it('should navigate to all main pages', () => {
    cy.visit('/');
    cy.get('nav').contains('Accueil').click();
    cy.url().should('include', '/');
    cy.get('nav').contains('Fonctionnalités').click();
    cy.url().should('include', '/features');
    cy.get('nav').contains('Tarifs').click();
    cy.url().should('include', '/pricing');
    cy.get('nav').contains('Contact').click();
    cy.url().should('include', '/contact');
  });

  it('should display the footer correctly', () => {
    cy.visit('/');
    cy.get('footer').contains('BoltVision');
  });

  it('should navigate to chat page', () => {
    cy.visit('/chat/123'); // Assuming chat route is /chat/[id]
    cy.url().should('include', '/chat/123');
  });

  it('should navigate to workbench page', () => {
    cy.visit('/workbench/456'); // Assuming workbench route is /workbench/[id]
    cy.url().should('include', '/workbench/456');
  });

  it('should navigate to settings page (if available)', () => {
    cy.visit('/');
    // Check for a link or button to settings
    cy.get('nav').contains('Paramètres').click(); // Adjust selector if needed
    cy.url().should('include', '/settings'); // Adjust URL if needed
  });
});
