/// <reference types="cypress" />

/**
 * Tests d'interactions avec le chat
 * Ce fichier contient les tests pour vérifier les interactions utilisateur
 * avec l'interface de chat, comme l'envoi de messages et les réponses
 */

describe('Interactions avec le chat', () => {
  beforeEach(() => {
    // Visite directe de la page de chat
    cy.visit('/chat');

    // Attente du chargement complet de l'interface de chat
    cy.get('[data-testid="chat-container"]', { timeout: 10000 }).should('be.visible');
  });

  it("Affiche correctement l'interface de chat avec les éléments principaux", () => {
    // Vérification des éléments principaux
    cy.get('[data-testid="chat-container"]').should('be.visible');
    cy.get('[data-testid="chat-input"]').should('be.visible');
    cy.get('[data-testid="send-button"]').should('exist'); // Peut être caché jusqu'à ce qu'il y ait du texte

    // Vérification visuelle de l'interface
    cy.matchImageSnapshot('chat-interface-initial');
  });

  it("Permet d'entrer du texte dans le champ de saisie", () => {
    // Test de saisie dans l'input
    const testMessage = 'Ceci est un message de test';
    cy.get('[data-testid="chat-input"]').should('be.visible').type(testMessage).should('have.value', testMessage);

    // Le bouton d'envoi devrait maintenant être visible
    cy.get('[data-testid="send-button"]').should('be.visible');
  });

  it("Permet d'envoyer un message en cliquant sur le bouton d'envoi", () => {
    // Saisie et envoi d'un message
    const testMessage = 'Hello, comment ça va?';
    cy.get('[data-testid="chat-input"]').should('be.visible').type(testMessage);

    cy.get('[data-testid="send-button"]').click();

    // Vérification que le message apparaît dans l'historique
    cy.get('[data-testid="message-item"]').should('exist');
    cy.get('[data-testid="message-item"]').last().should('contain', testMessage);

    // Vérification visuelle de l'état après envoi
    cy.matchImageSnapshot('chat-message-sent');
  });

  it("Permet d'envoyer un message en appuyant sur Entrée", () => {
    // Saisie et envoi d'un message avec Entrée
    const testMessage = 'Message envoyé avec la touche Entrée';
    cy.get('[data-testid="chat-input"]').should('be.visible').type(testMessage).type('{enter}');

    // Vérification que le message apparaît dans l'historique
    cy.get('[data-testid="message-item"]').should('exist');
    cy.get('[data-testid="message-item"]').last().should('contain', testMessage);
  });

  it('Traite les commandes spéciales comme /help', () => {
    // Test d'une commande spéciale
    cy.get('[data-testid="chat-input"]').should('be.visible').type('/help').type('{enter}');

    // Attendre que la réponse contenant les commandes disponibles s'affiche
    cy.get('[data-testid="message-item"]', { timeout: 10000 }).should('have.length.at.least', 2);

    // La réponse doit contenir des informations sur les commandes disponibles
    cy.get('[data-testid="message-item"]').last().should('contain', 'Commandes disponibles');
  });

  it("Efface le champ de saisie après l'envoi d'un message", () => {
    // Saisie et envoi d'un message
    const testMessage = 'Ce message doit disparaître après envoi';
    cy.get('[data-testid="chat-input"]').should('be.visible').type(testMessage);

    cy.get('[data-testid="send-button"]').click();

    // Vérification que le champ est vidé
    cy.get('[data-testid="chat-input"]').should('have.value', '');
  });

  it("Peut recevoir une réponse de l'assistant après envoi d'un message", () => {
    // Saisie et envoi d'un message qui devrait déclencher une réponse
    const testMessage = "Bonjour, peux-tu m'aider avec une question?";
    cy.get('[data-testid="chat-input"]').should('be.visible').type(testMessage);

    cy.get('[data-testid="send-button"]').click();

    // Attendre la réponse de l'assistant (avec un timeout plus long)
    cy.get('[data-testid="message-item"]', { timeout: 15000 }).should('have.length.at.least', 2);

    // Capture d'écran pour vérification visuelle de la conversation
    cy.matchImageSnapshot('chat-conversation-response');
  });
});
