/// <reference types="cypress" />

/**
 * Tests d'accessibilité selon les standards WCAG
 * Ces tests vérifient la conformité aux règles essentielles d'accessibilité
 */

describe("Tests d'accessibilité WCAG", () => {
  beforeEach(() => {
    // Visite de la page d'accueil avant chaque test
    cy.visit('/');

    // Attente du chargement complet de l'application
    cy.get('h1').should('be.visible');
  });

  it('Vérifie les alternatives textuelles pour les images', () => {
    // Vérification que toutes les images ont un attribut alt
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt');
    });
  });

  it('Vérifie que les boutons ont un texte accessible', () => {
    // Vérification que tous les boutons ont soit un texte, soit un aria-label
    cy.get('button').each(($button) => {
      const hasAriaLabel = $button.attr('aria-label') !== undefined;
      const hasText = $button.text().trim().length > 0;
      expect(hasAriaLabel || hasText).to.be.true;
    });
  });

  it('Vérifie les ratios de contraste de couleur', () => {
    // Vérification visuelle des contrastes de couleur
    cy.matchImageSnapshot('home-contrast');

    // Vérification du texte principal
    cy.get('h1, h2, p')
      .should('have.css', 'color')
      .and(($color) => {
        // Vérification simplifiée : les couleurs ne doivent pas être trop claires
        const color = $color.toString();
        const isLightGray = color.includes('rgb(200,') || color.includes('rgb(220,') || color.includes('rgb(240,');
        expect(isLightGray).to.be.false;
      });
  });

  it('Vérifie la navigation au clavier', () => {
    // Test de navigation par tabulation
    cy.get('body').tab();
    cy.focused().should('exist');

    // Vérification que la navigation passe par tous les éléments interactifs
    const interactiveElements = [];
    cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      .then(($elements) => {
        $elements.each((_, el) => {
          interactiveElements.push(el);
        });
      })
      .then(() => {
        // Vérification d'un échantillon des éléments
        const sampleSize = Math.min(5, interactiveElements.length);
        for (let i = 0; i < sampleSize; i++) {
          cy.get('body').tab();
          cy.focused().should('exist');
        }
      });
  });

  it('Vérifie la structure des titres', () => {
    // Les titres doivent suivre une hiérarchie logique
    cy.get('h1').should('have.length.at.least', 1);

    // Vérification que les niveaux de titre ne sautent pas plus d'un niveau
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      const levels = [];
      $headings.each((_, el) => {
        const level = parseInt(el.tagName.charAt(1));
        levels.push(level);
      });

      // Vérification qu'il n'y a pas de saut (comme h1 -> h3 sans h2)
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] > levels[i - 1]) {
          expect(levels[i]).to.be.at.most(levels[i - 1] + 1);
        }
      }
    });
  });

  it('Utilise la commande personnalisée checkA11y', () => {
    cy.checkA11y();
  });
});
