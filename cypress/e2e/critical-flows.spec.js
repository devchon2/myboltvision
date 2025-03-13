/// <reference types="cypress" />

/**
 * Tests des flux critiques de l'application
 * Ce fichier contient les tests des parcours utilisateur essentiels
 */

describe('Flux utilisateur critiques', () => {
  beforeEach(() => {
    // Visite de la page d'accueil avant chaque test
    cy.visit('/');

    // Attente du chargement complet de l'application
    cy.get('h1').should('be.visible');
  });

  context('Interface utilisateur de base', () => {
    it("Affiche correctement la page d'accueil", () => {
      cy.get('header').should('be.visible');
      cy.get('main').should('be.visible');
      cy.get('footer').should('exist');
    });

    it('Navigation fonctionne correctement', () => {
      // Test de la navigation dans le menu latéral si présent
      cy.get('[data-testid="sidebar"]').should('exist');
      cy.get('[data-testid="sidebar"] a').first().click();

      // Vérification du changement de route
      cy.url().should('not.eq', Cypress.config().baseUrl + '/');
    });
  });

  context('Interaction avec le chat', () => {
    it("Permet d'envoyer un message et de recevoir une réponse", () => {
      // Navigation vers le chat si nécessaire
      cy.visit('/chat');

      // Attente du chargement de l'interface de chat
      cy.get('[data-testid="chat-container"]').should('be.visible');

      // Saisie d'un message de test
      cy.get('[data-testid="chat-input"]').should('be.visible').type('Hello, comment ça va?');

      // Envoi du message
      cy.get('[data-testid="send-button"]').click();

      // Vérification que le message a été ajouté à la conversation
      cy.get('[data-testid="message-item"]').last().should('contain', 'Hello, comment ça va?');

      // Attente d'une réponse (avec timeout prolongé)
      cy.get('[data-testid="message-item"]', { timeout: 10000 }).should('have.length.at.least', 2);

      // Capture d'écran pour vérification visuelle
      cy.matchImageSnapshot('chat-conversation');
    });

    it('Prend en charge les commandes spéciales', () => {
      cy.visit('/chat');

      // Test d'une commande spéciale
      cy.get('[data-testid="chat-input"]').type('/help');

      cy.get('[data-testid="send-button"]').click();

      // Vérification de l'affichage de l'aide
      cy.get('[data-testid="message-item"]').last().should('contain', 'Commandes disponibles');
    });
  });

  context('Workbench et éditeur de code', () => {
    it("Charge correctement l'éditeur", () => {
      cy.visit('/workbench');

      // Vérification que l'éditeur est chargé
      cy.get('[data-testid="code-editor"]', { timeout: 10000 }).should('be.visible');

      // Test d'édition de code basique
      cy.get('[data-testid="code-editor"] .monaco-editor').should('be.visible').click();

      // Frappe simulée dans l'éditeur Monaco
      cy.focused().type('{ctrl+a}{backspace}// Test code', { force: true });

      // Vérification que le code a été saisi
      cy.get('[data-testid="code-editor"]').should('contain', '// Test code');
    });

    it("Permet d'exécuter du code", () => {
      cy.visit('/workbench');

      // Saisie d'un code JavaScript simple
      cy.get('[data-testid="code-editor"] .monaco-editor').click();
      cy.focused().type('{ctrl+a}{backspace}console.log("Test exécution");', { force: true });

      // Exécution du code
      cy.get('[data-testid="run-button"]').click();

      // Vérification de la sortie dans la console
      cy.get('[data-testid="console-output"]').should('contain', 'Test exécution');
    });
  });

  context('Formulaires et validation', () => {
    it('Valide correctement les entrées utilisateur', () => {
      cy.visit('/settings');

      // Test des champs avec validation
      cy.get('input[name="email"]').type('email_invalide').blur();

      // Vérification du message d'erreur
      cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'email');

      // Correction de l'entrée
      cy.get('input[name="email"]').clear().type('utilisateur@exemple.com').blur();

      // Vérification que le message d'erreur a disparu
      cy.get('[data-testid="error-message"]').should('not.exist');

      // Soumission du formulaire
      cy.get('button[type="submit"]').click();

      // Vérification du succès
      cy.get('[data-testid="success-message"]').should('be.visible');
    });
  });

  context('Performances et accessibilité', () => {
    it('Vérifie les métriques de performance de base', () => {
      // Navigation et mesure de la performance
      cy.visit('/', {
        onBeforeLoad(win) {
          // Configuration de l'API Performance Observer
          const observer = new win.PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              cy.log(`Performance: ${entry.name} - ${entry.startTime}ms`);
            });
          });
          observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
        },
      });

      // Vérification du LCP (Largest Contentful Paint) - doit être rapide
      cy.window()
        .its('performance')
        .then((performance) => {
          const navigationEntries = performance.getEntriesByType('navigation');
          const paintEntries = performance.getEntriesByType('paint');

          expect(navigationEntries[0].domContentLoadedEventEnd).to.be.lessThan(3000);

          const lcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
          if (lcp) {
            expect(lcp.startTime).to.be.lessThan(2500);
          }
        });
    });

    it("Vérifie les critères d'accessibilité de base", () => {
      cy.visit('/');

      // Vérification des éléments d'accessibilité de base
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });

      cy.get('button').each(($button) => {
        const hasAriaLabel = $button.attr('aria-label') !== undefined;
        const hasText = $button.text().trim().length > 0;
        expect(hasAriaLabel || hasText).to.be.true;
      });
    });
  });
});
