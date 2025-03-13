/// <reference types="cypress" />

/**
 * Tests pour l'éditeur de code dans Workbench
 * Ce fichier contient les tests pour vérifier les fonctionnalités
 * de l'éditeur de code et l'exécution de code dans le workbench
 */

describe('Workbench Editor', () => {
  beforeEach(() => {
    // Visite directe de la page workbench
    cy.visit('/workbench');

    // Attente du chargement complet de l'éditeur (peut prendre plus de temps à charger)
    cy.get('[data-testid="code-editor"]', { timeout: 15000 }).should('be.visible');
  });

  it("Affiche correctement l'interface de l'éditeur avec les éléments principaux", () => {
    // Vérification des éléments principaux
    cy.get('[data-testid="code-editor"]').should('be.visible');
    cy.get('[data-testid="run-button"]').should('exist');

    // Vérification visuelle de l'interface
    cy.matchImageSnapshot('workbench-editor-initial');
  });

  it("Permet d'éditer du code dans l'éditeur", () => {
    // Cibler l'éditeur et y insérer du code
    cy.get('[data-testid="code-editor"] .monaco-editor').should('be.visible').click();

    // Sélectionner tout le contenu existant et le remplacer
    cy.focused().type('{ctrl+a}{backspace}', { force: true });

    // Écrire un exemple de code simple
    const sampleCode = '// Test d\'édition dans Monaco\nconsole.log("Hello from Cypress test");';
    cy.focused().type(sampleCode, { force: true });

    // Vérifier que le code a été saisi correctement
    cy.get('[data-testid="code-editor"]').should('contain', 'Hello from Cypress test');
  });

  it('Exécute du code JavaScript et affiche le résultat dans la console', () => {
    // Insérer du code à exécuter
    cy.get('[data-testid="code-editor"] .monaco-editor').should('be.visible').click();

    cy.focused().type('{ctrl+a}{backspace}', { force: true });
    cy.focused().type('console.log("Test d\'exécution de code");', { force: true });

    // Exécuter le code en cliquant sur le bouton d'exécution
    cy.get('[data-testid="run-button"]').click();

    // Vérifier que la sortie apparaît dans la console
    cy.get('[data-testid="console-output"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', "Test d'exécution de code");
  });

  it('Affiche les erreurs lorsque le code contient des erreurs de syntaxe', () => {
    // Insérer du code avec une erreur de syntaxe
    cy.get('[data-testid="code-editor"] .monaco-editor').should('be.visible').click();

    cy.focused().type('{ctrl+a}{backspace}', { force: true });
    cy.focused().type('console.log("Code avec erreur"', { force: true }); // Pas de parenthèse fermante

    // Exécuter le code erroné
    cy.get('[data-testid="run-button"]').click();

    // Vérifier qu'une erreur est affichée dans la console
    cy.get('[data-testid="console-output"]', { timeout: 10000 }).should('be.visible').and('contain', 'error');
  });

  it('Exécute du code avec des opérations asynchrones', () => {
    // Insérer du code avec des opérations asynchrones
    cy.get('[data-testid="code-editor"] .monaco-editor').should('be.visible').click();

    cy.focused().type('{ctrl+a}{backspace}', { force: true });

    const asyncCode = `
      async function testAsync() {
        console.log("Début de l'opération asynchrone");
        
        // Simuler une opération asynchrone
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Fin de l'opération asynchrone");
        return "Succès";
      }
      
      // Appel de la fonction asynchrone
      testAsync().then(result => {
        console.log("Résultat:", result);
      });
    `;

    cy.focused().type(asyncCode, { force: true });

    // Exécuter le code asynchrone
    cy.get('[data-testid="run-button"]').click();

    // Vérifier les différentes sorties dans l'ordre
    cy.get('[data-testid="console-output"]', { timeout: 10000 })
      .should('contain', "Début de l'opération asynchrone")
      .and('contain', "Fin de l'opération asynchrone")
      .and('contain', 'Résultat: Succès');
  });

  it('Conserve le code lors de la navigation puis du retour à la page Workbench', () => {
    // Saisir du code spécifique pour le test
    cy.get('[data-testid="code-editor"] .monaco-editor').should('be.visible').click();

    cy.focused().type('{ctrl+a}{backspace}', { force: true });

    const uniqueCode = '// Code spécifique pour test de persistance\nconsole.log("Test de persistance");';
    cy.focused().type(uniqueCode, { force: true });

    // Naviguer vers une autre page
    cy.get('header nav a').contains('Chat').click();

    // Revenir à la page Workbench
    cy.get('header nav a').contains('Workbench').click();

    // Attendre que l'éditeur se charge à nouveau
    cy.get('[data-testid="code-editor"]', { timeout: 15000 }).should('be.visible');

    // Vérifier que le code est toujours présent
    cy.get('[data-testid="code-editor"]').should('contain', 'Test de persistance');
  });
});
