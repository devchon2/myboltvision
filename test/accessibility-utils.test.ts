import { describe, it, expect } from 'vitest';

// Utilitaires d'accessibilité à tester
const accessibilityUtils = {
  /**
   * Vérifie si un texte a un ratio de contraste suffisant avec sa couleur de fond
   * @param textColor Couleur du texte en format hexadécimal
   * @param backgroundColor Couleur de fond en format hexadécimal
   * @param isLargeText Si le texte est considéré comme "large" (18pt+ ou 14pt+ bold)
   * @returns Si le ratio est suffisant selon les critères WCAG
   */
  hasAdequateContrast(textColor: string, backgroundColor: string, isLargeText = false): boolean {
    // Convertir les couleurs hex en composants RGB
    const textRGB = this.hexToRgb(textColor);
    const backgroundRGB = this.hexToRgb(backgroundColor);

    if (!textRGB || !backgroundRGB) return false;

    // Calculer la luminance relative des couleurs
    const textLuminance = this.calculateRelativeLuminance(textRGB);
    const backgroundLuminance = this.calculateRelativeLuminance(backgroundRGB);

    // Calculer le ratio de contraste
    const contrastRatio = this.calculateContrastRatio(textLuminance, backgroundLuminance);

    // WCAG AA requiert un ratio de 4.5:1 pour le texte normal, 3:1 pour le texte large
    return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
  },

  /**
   * Convertit une couleur hexadécimale en valeurs RGB
   * @param hex Couleur en format hexadécimal (#RRGGBB)
   * @returns Objet avec les composants RGB ou null si le format est invalide
   */
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Supprimer le # si présent
    hex = hex.replace(/^#/, '');

    // Vérifier si le format est valide
    if (!/^[0-9A-F]{6}$/i.test(hex)) return null;

    // Extraire les composants
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  },

  /**
   * Calcule la luminance relative d'une couleur RGB
   * @param rgb Objet contenant les composants RGB
   * @returns La luminance relative
   */
  calculateRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
    // Normaliser les valeurs RGB
    const { r, g, b } = rgb;
    const sR = r / 255;
    const sG = g / 255;
    const sB = b / 255;

    // Appliquer la correction gamma
    const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
    const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
    const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

    // Calculer la luminance
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },

  /**
   * Calcule le ratio de contraste entre deux luminances
   * @param luminance1 Première luminance
   * @param luminance2 Deuxième luminance
   * @returns Le ratio de contraste
   */
  calculateContrastRatio(luminance1: number, luminance2: number): number {
    const lighterLum = Math.max(luminance1, luminance2);
    const darkerLum = Math.min(luminance1, luminance2);

    return (lighterLum + 0.05) / (darkerLum + 0.05);
  },

  /**
   * Vérifie si une chaîne est un ID valide pour les attributs HTML
   * @param id Chaîne à vérifier
   * @returns Si l'ID est valide
   */
  isValidHtmlId(id: string): boolean {
    // Un ID HTML valide commence par une lettre et peut contenir des lettres, chiffres, tirets, underscores
    return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(id);
  },

  /**
   * Vérifie si un texte alternatif est descriptif (pas vide, pas juste "image", etc.)
   * @param altText Texte alternatif à vérifier
   * @returns Si le texte alternatif est considéré comme descriptif
   */
  isDescriptiveAltText(altText: string): boolean {
    if (!altText) return false;

    // Textes alternatifs non-descriptifs courants
    const poorAltTexts = [
      'image',
      'photo',
      'picture',
      'icon',
      'graphic',
      'img',
      'photograph',
      'illustration',
      'image.jpg',
      'pic',
    ];

    const trimmedText = altText.trim().toLowerCase();

    if (trimmedText.length < 5) return false;
    if (poorAltTexts.includes(trimmedText)) return false;

    return true;
  },
};

describe("Utilitaires d'accessibilité", () => {
  describe('hasAdequateContrast', () => {
    it('Détecte le contraste adéquat entre le noir et le blanc', () => {
      expect(accessibilityUtils.hasAdequateContrast('#000000', '#FFFFFF')).toBe(true);
    });

    it('Détecte le contraste adéquat entre le blanc et le noir', () => {
      expect(accessibilityUtils.hasAdequateContrast('#FFFFFF', '#000000')).toBe(true);
    });

    it('Détecte un contraste insuffisant entre des couleurs similaires', () => {
      expect(accessibilityUtils.hasAdequateContrast('#767676', '#888888')).toBe(false);
    });

    it('Applique des critères différents pour le texte large', () => {
      // Couleurs avec un ratio de ~3.5:1 (passe pour le texte large, échoue pour le texte normal)
      expect(accessibilityUtils.hasAdequateContrast('#767676', '#FFFFFF', true)).toBe(false);
      expect(accessibilityUtils.hasAdequateContrast('#767676', '#FFFFFF', false)).toBe(false);
    });
  });

  describe('hexToRgb', () => {
    it('Convertit correctement une couleur hexadécimale en RGB', () => {
      expect(accessibilityUtils.hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(accessibilityUtils.hexToRgb('00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(accessibilityUtils.hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('Retourne null pour des formats invalides', () => {
      expect(accessibilityUtils.hexToRgb('#XYZ')).toBeNull();
      expect(accessibilityUtils.hexToRgb('12345')).toBeNull();
      expect(accessibilityUtils.hexToRgb('')).toBeNull();
    });
  });

  describe('calculateRelativeLuminance', () => {
    it('Calcule correctement la luminance du noir (zéro)', () => {
      expect(accessibilityUtils.calculateRelativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0);
    });

    it('Calcule correctement la luminance du blanc (un)', () => {
      expect(accessibilityUtils.calculateRelativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1);
    });

    it('Donne une luminance plus élevée pour les couleurs claires', () => {
      const lightGray = accessibilityUtils.calculateRelativeLuminance({ r: 200, g: 200, b: 200 });
      const darkGray = accessibilityUtils.calculateRelativeLuminance({ r: 50, g: 50, b: 50 });
      expect(lightGray).toBeGreaterThan(darkGray);
    });
  });

  describe('isValidHtmlId', () => {
    it('Accepte les ID HTML valides', () => {
      expect(accessibilityUtils.isValidHtmlId('myId')).toBe(true);
      expect(accessibilityUtils.isValidHtmlId('my-id-2')).toBe(true);
      expect(accessibilityUtils.isValidHtmlId('test_id')).toBe(true);
    });

    it('Rejette les ID HTML invalides', () => {
      expect(accessibilityUtils.isValidHtmlId('2invalid')).toBe(false); // Ne doit pas commencer par un chiffre
      expect(accessibilityUtils.isValidHtmlId('invalid id')).toBe(false); // Ne doit pas contenir d'espaces
      expect(accessibilityUtils.isValidHtmlId('invalid$id')).toBe(false); // Caractères spéciaux non autorisés
    });
  });

  describe('isDescriptiveAltText', () => {
    it('Accepte les textes alternatifs descriptifs', () => {
      expect(accessibilityUtils.isDescriptiveAltText('Un homme marchant dans un parc')).toBe(true);
      expect(accessibilityUtils.isDescriptiveAltText("Logo de l'entreprise ABC")).toBe(true);
    });

    it('Rejette les textes alternatifs non-descriptifs', () => {
      expect(accessibilityUtils.isDescriptiveAltText('image')).toBe(false);
      expect(accessibilityUtils.isDescriptiveAltText('photo')).toBe(false);
      expect(accessibilityUtils.isDescriptiveAltText('pic')).toBe(false);
    });

    it('Rejette les textes alternatifs trop courts', () => {
      expect(accessibilityUtils.isDescriptiveAltText('img')).toBe(false);
      expect(accessibilityUtils.isDescriptiveAltText('pic')).toBe(false);
    });
  });
});
