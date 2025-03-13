/// <reference types="cypress" />

/**
 * Tests de performance de l'application
 * Ce fichier contient les tests pour mesurer et vérifier les performances
 * de chargement et d'interaction de l'application
 */

describe("Performance de l'application", () => {
  it("Mesure les métriques de performance de la page d'accueil", () => {
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

    // Attendre que la page soit complètement chargée
    cy.get('h1').should('be.visible');

    // Vérification du LCP (Largest Contentful Paint) - doit être rapide
    cy.window()
      .its('performance')
      .then((performance) => {
        const navigationEntries = performance.getEntriesByType('navigation');
        const paintEntries = performance.getEntriesByType('paint');

        // Vérifier le temps de chargement du DOM
        if (navigationEntries.length > 0) {
          expect(navigationEntries[0].domContentLoadedEventEnd).to.be.lessThan(3000);
          cy.log(`DOM Content Loaded: ${navigationEntries[0].domContentLoadedEventEnd}ms`);
        }

        // Vérifier le First Contentful Paint
        const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcp) {
          expect(fcp.startTime).to.be.lessThan(2000);
          cy.log(`First Contentful Paint: ${fcp.startTime}ms`);
        }
      });
  });

  it('Mesure le temps de chargement de la page de chat', () => {
    const startTime = Date.now();

    // Navigation vers la page de chat
    cy.visit('/chat');

    // Attendre que les éléments essentiels soient visibles
    cy.get('[data-testid="chat-container"]').should('be.visible');
    cy.get('[data-testid="chat-input"]').should('be.visible');

    // Calculer le temps écoulé depuis le début de la navigation
    cy.then(() => {
      const loadTime = Date.now() - startTime;
      cy.log(`Temps de chargement de la page chat: ${loadTime}ms`);

      // Vérifier que le temps de chargement est acceptable
      expect(loadTime).to.be.lessThan(5000); // Temps ajustable selon les attentes
    });
  });

  it('Mesure le temps de chargement de la page workbench', () => {
    const startTime = Date.now();

    // Navigation vers la page workbench
    cy.visit('/workbench');

    // Attendre que l'éditeur de code soit visible (qui est généralement l'élément le plus lent à charger)
    cy.get('[data-testid="code-editor"]', { timeout: 15000 }).should('be.visible');

    // Calculer le temps écoulé depuis le début de la navigation
    cy.then(() => {
      const loadTime = Date.now() - startTime;
      cy.log(`Temps de chargement de la page workbench: ${loadTime}ms`);

      // Vérifier que le temps de chargement est acceptable (plus permissif pour le workbench car il charge Monaco)
      expect(loadTime).to.be.lessThan(8000); // Temps ajustable selon les attentes
    });
  });

  it('Mesure le temps de réponse des interactions utilisateur', () => {
    cy.visit('/');

    // Mesurer le temps de réponse d'un clic sur un lien de navigation
    const startNavigationTime = Date.now();
    cy.get('header nav a').contains('Chat').click();

    // Attendre que la nouvelle page soit chargée
    cy.get('[data-testid="chat-container"]')
      .should('be.visible')
      .then(() => {
        const navigationTime = Date.now() - startNavigationTime;
        cy.log(`Temps de navigation vers la page Chat: ${navigationTime}ms`);
        expect(navigationTime).to.be.lessThan(3000); // Temps ajustable selon les attentes
      });

    // Mesurer le temps de réponse à l'envoi d'un message dans le chat
    cy.get('[data-testid="chat-input"]').type('Test de performance');

    const startSendTime = Date.now();
    cy.get('[data-testid="send-button"]').click();

    // Attendre que le message apparaisse dans l'historique
    cy.get('[data-testid="message-item"]')
      .should('contain', 'Test de performance')
      .then(() => {
        const sendTime = Date.now() - startSendTime;
        cy.log(`Temps de traitement du message: ${sendTime}ms`);
        expect(sendTime).to.be.lessThan(1000); // Temps ajustable selon les attentes
      });
  });

  it('Vérifie la performance sous charge avec des actions répétées', () => {
    // Cette fonction envoie plusieurs messages rapidement pour tester la performance sous charge
    function sendMultipleMessages(count) {
      if (count <= 0) return;

      cy.get('[data-testid="chat-input"]').type(`Test de charge message ${count}`).type('{enter}');

      // Attendre que le message apparaisse
      cy.get('[data-testid="message-item"]').contains(`Test de charge message ${count}`);

      // Envoyer le message suivant
      cy.wait(200); // Petite pause entre les messages
      sendMultipleMessages(count - 1);
    }

    // Visiter la page de chat
    cy.visit('/chat');
    cy.get('[data-testid="chat-container"]').should('be.visible');

    // Démarrer le test de charge
    const startLoadTest = Date.now();
    sendMultipleMessages(5); // Envoyer 5 messages rapidement

    // Mesurer le temps total
    cy.then(() => {
      const loadTestTime = Date.now() - startLoadTest;
      cy.log(`Temps total pour 5 messages: ${loadTestTime}ms`);
      cy.log(`Temps moyen par message: ${loadTestTime / 5}ms`);

      // Vérifier que la performance reste acceptable
      expect(loadTestTime).to.be.lessThan(10000); // Temps ajustable selon les attentes
    });
  });
});
