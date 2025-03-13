/// <reference types="cypress" />

/**
 * Tests de navigation et de routes
 * Ce fichier contient les tests pour vérifier que la navigation
 * entre les différentes pages de l'application fonctionne correctement
 */

describe('Navigation et Routes', () => {
  beforeEach(() => {
    // Visite de la page d'accueil avant chaque test
    cy.visit('/');

    // Attente du chargement complet de l'application
    cy.get('h1').should('be.visible');
  });

  it("Affiche correctement la page d'accueil avec tous les éléments principaux", () => {
    // Vérification des éléments principaux de la page d'accueil
    cy.get('header').should('be.visible');
    cy.get('main').should('be.visible');
    cy.get('footer').should('exist');

    // Vérification du titre principal
    cy.get('h1').should('contain', 'MyBoltVision');

    // Vérification des liens de navigation dans le header
    cy.get('header nav a').should('have.length.at.least', 3);

    // Vérification des sections de contenu
    cy.get('main section').should('have.length.at.least', 1);

    // Vérification visuelle
    cy.matchImageSnapshot('home-page-layout');
  });

  it("Navigue vers la page de chat depuis la page d'accueil", () => {
    // Cliquer sur le lien Chat
    cy.get('header nav a').contains('Chat').click();

    // Vérifier que l'URL a changé et qu'on est redirigé vers une page de chat avec un ID
    cy.url().should('match', /\/chat\/[a-z0-9]+/);

    // Vérifier que le conteneur de chat est visible
    cy.get('[data-testid="chat-container"]').should('be.visible');

    // Vérifier que la zone de saisie est disponible
    cy.get('[data-testid="chat-input"]').should('be.visible');
  });

  it("Navigue vers la page de workbench depuis la page d'accueil", () => {
    // Cliquer sur le lien Workbench
    cy.get('header nav a').contains('Workbench').click();

    // Vérifier que l'URL a changé et qu'on est redirigé vers une page de workbench avec un ID
    cy.url().should('match', /\/workbench\/[a-z0-9]+/);

    // Vérifier que l'éditeur de code est éventuellement chargé (avec timeout plus long car peut prendre du temps)
    cy.get('[data-testid="code-editor"]', { timeout: 10000 }).should('exist');
  });

  it("Navigue vers la page de paramètres depuis la page d'accueil", () => {
    // Cliquer sur le lien Paramètres
    cy.get('header nav a').contains('Paramètres').click();

    // Vérifier que l'URL a changé
    cy.url().should('include', '/settings');

    // Vérifier que le formulaire est présent
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('be.visible');
  });

  it("Peut naviguer d'une page à l'autre en utilisant les liens de navigation", () => {
    // Aller à la page Chat
    cy.get('header nav a').contains('Chat').click();
    cy.url().should('match', /\/chat\/[a-z0-9]+/);

    // Puis aller à la page Workbench
    cy.get('header nav a').contains('Workbench').click();
    cy.url().should('match', /\/workbench\/[a-z0-9]+/);

    // Puis aller à la page Paramètres
    cy.get('header nav a').contains('Paramètres').click();
    cy.url().should('include', '/settings');

    // Revenir à la page d'accueil
    cy.get('header h1').click(); // En supposant que le logo/titre est cliquable
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
