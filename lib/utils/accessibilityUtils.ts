/**
 * Utilitaires pour l'accessibilité web
 * Fonctions permettant de vérifier la conformité aux standards WCAG
 */

export const accessibilityUtils = {
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

    if (!textRGB || !backgroundRGB) {
      return false;
    }

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
    if (!/^[0-9A-F]{6}$/i.test(hex)) {
      return null;
    }

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
    if (!altText) {
      return false;
    }

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

    if (trimmedText.length < 5) {
      return false;
    }

    if (poorAltTexts.includes(trimmedText)) {
      return false;
    }

    return true;
  },

  /**
   * Vérifie si les éléments d'une page respectent les règles d'accessibilité de base
   * @param document Le document à analyser
   * @returns Un rapport avec les problèmes trouvés
   */
  auditAccessibility(document: Document): {
    totalIssues: number;
    issues: Array<{
      element: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
    }>;
  } {
    const issues: Array<{
      element: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
    }> = [];

    // Vérifier les images sans alt
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach((img) => {
      issues.push({
        element: this.getElementPath(img as HTMLElement),
        description: 'Image sans attribut alt',
        severity: 'high',
      });
    });

    // Vérifier les éléments interactifs sans libellé accessible
    const interactiveElements = document.querySelectorAll('button, a[href], input, select, textarea');
    interactiveElements.forEach((el) => {
      const element = el as HTMLElement;
      const textContent = element.textContent || '';
      const hasAccessibleName =
        element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby') || textContent.trim().length > 0;

      if (!hasAccessibleName) {
        issues.push({
          element: this.getElementPath(element),
          description: 'Élément interactif sans nom accessible',
          severity: 'high',
        });
      }
    });

    // Vérifier la structure des titres
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let previousLevel = 0;

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));

      if (previousLevel > 0 && level > previousLevel + 1) {
        issues.push({
          element: this.getElementPath(heading as HTMLElement),
          description: `Saut dans la hiérarchie des titres (de h${previousLevel} à h${level})`,
          severity: 'medium',
        });
      }

      previousLevel = level;
    });

    return {
      totalIssues: issues.length,
      issues,
    };
  },

  /**
   * Récupère un "chemin" unique pour identifier un élément dans le DOM
   * @param element L'élément HTML
   * @returns Une chaîne représentant le chemin de l'élément
   */
  getElementPath(element: HTMLElement): string {
    let path = element.tagName.toLowerCase();

    if (element.id) {
      path += `#${element.id}`;
    } else if (element.className) {
      const classes = element.className.split(/\s+/).filter(Boolean);

      if (classes.length > 0) {
        path += `.${classes.join('.')}`;
      }
    }

    return path;
  },
};

export default accessibilityUtils;
