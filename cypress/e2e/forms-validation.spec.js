/// <reference types="cypress" />

/**
 * Tests pour les formulaires et la validation
 * Ce fichier contient les tests pour vérifier que les formulaires
 * valident correctement les entrées utilisateur et affichent les messages appropriés
 */

describe('Formulaires et validation', () => {
  describe('Formulaire de paramètres utilisateur', () => {
    beforeEach(() => {
      // Visite de la page de paramètres
      cy.visit('/settings');

      // Attente du chargement du formulaire
      cy.get('form').should('be.visible');
    });

    it('Affiche correctement le formulaire avec tous les champs', () => {
      // Vérification des éléments du formulaire
      cy.get('h1').should('contain', 'Paramètres utilisateur');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');

      // Vérification visuelle du formulaire
      cy.matchImageSnapshot('settings-form-initial');
    });

    it("Valide le format de l'email et affiche un message d'erreur", () => {
      // Test avec un email invalide
      cy.get('input[name="email"]').type('email_invalide').blur();

      // Vérification du message d'erreur
      cy.get('[data-testid="error-message"]')
        .should('be.visible')
        .and('contain', 'Veuillez entrer une adresse email valide');

      // Correction de l'entrée
      cy.get('input[name="email"]').clear().type('utilisateur@exemple.com').blur();

      // Vérification que le message d'erreur a disparu
      cy.get('[data-testid="error-message"]').should('not.exist');

      // Vérification visuelle des états du formulaire
      cy.matchImageSnapshot('settings-form-validation');
    });

    it('Soumet le formulaire et affiche un message de succès', () => {
      // Remplir le formulaire avec des données valides
      cy.get('input[name="email"]').type('utilisateur@exemple.com');

      // Soumission du formulaire
      cy.get('button[type="submit"]').click();

      // Vérification du message de succès
      cy.get('[data-testid="success-message"]').should('be.visible').and('contain', 'enregistrés avec succès');

      // Vérification visuelle de l'état après soumission
      cy.matchImageSnapshot('settings-form-success');
    });

    it('Empêche la soumission du formulaire avec des données invalides', () => {
      // Remplir le formulaire avec un email invalide
      cy.get('input[name="email"]').type('email_invalide');

      // Tentative de soumission
      cy.get('button[type="submit"]').click();

      // Vérification que le formulaire est toujours visible (pas de message de succès)
      cy.get('form').should('be.visible');
      cy.get('[data-testid="success-message"]').should('not.exist');

      // Vérification que le message d'erreur est affiché
      cy.get('[data-testid="error-message"]').should('be.visible');
    });
  });

  // Possibilité d'ajouter des tests pour d'autres formulaires
  describe("Validation des entrées utilisateur dans d'autres contextes", () => {
    it('Valide les entrées dans les zones de texte du chat', () => {
      // Visite de la page de chat
      cy.visit('/chat');

      // Attente du chargement
      cy.get('[data-testid="chat-input"]').should('be.visible');

      // Tester la validation de longueur (si applicable)
      // Exemple: si le chat limite la longueur des messages
      const longString = 'a'.repeat(5000); // Message très long
      cy.get('[data-testid="chat-input"]').type(longString, { delay: 0 }); // Utiliser delay: 0 pour accélérer la saisie

      // Vérifier que le texte a été tronqué ou qu'un message d'avertissement s'affiche
      // (ceci dépend du comportement attendu de l'application)
      cy.get('[data-testid="chat-input"]')
        .invoke('val')
        .then((value) => {
          // Vérifier soit que le texte a été limité, soit qu'un message d'avertissement est présent
          if (value.length < longString.length) {
            // Le texte a été tronqué
            expect(value.length).to.be.lessThan(longString.length);
          } else {
            // Sinon, chercher un message d'avertissement (si applicable)
            cy.get('[data-testid="warning-message"]').should('exist');
          }
        });
    });

    it('Vérifie que les boutons sont désactivés lorsque les entrées sont invalides', () => {
      // Cette vérification dépend du comportement spécifique de l'application
      // Exemple pour la page de chat avec un champ vide
      cy.visit('/chat');

      // Effacer le champ de saisie s'il contient du texte par défaut
      cy.get('[data-testid="chat-input"]').clear();

      // Si le champ est vide, le bouton d'envoi ne devrait pas être visible ou être désactivé
      cy.get('[data-testid="send-button"]').should('not.be.visible'); // ou .should('be.disabled') selon l'implémentation

      // Après avoir saisi du texte, le bouton devrait être activé
      cy.get('[data-testid="chat-input"]').type('Un message de test');

      cy.get('[data-testid="send-button"]')
        .should('be.visible') // ou .should('not.be.disabled') selon l'implémentation
        .and('not.have.attr', 'disabled');
    });
  });
});
