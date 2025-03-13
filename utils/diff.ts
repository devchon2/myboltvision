/**
 * Utilitaire de comparaison de texte
 * 
 * Fournit des fonctions permettant de calculer les différences
 * entre deux chaînes de texte et de les visualiser.
 */

export interface DiffResult {
  added: string[];
  removed: string[];
  unchanged: string[];
  similarity: number;
}

/**
 * Calcule la distance de Levenshtein entre deux chaînes
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialiser la première ligne et colonne de la matrice
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Remplir la matrice
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // Substitution
          matrix[i][j - 1] + 1,     // Insertion
          matrix[i - 1][j] + 1      // Suppression
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calcule le pourcentage de similarité entre deux chaînes
 */
export function calculateSimilarity(a: string, b: string): number {
  if (a.length === 0 && b.length === 0) return 100;
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return ((maxLength - distance) / maxLength) * 100;
}

/**
 * Compare deux chaînes et retourne les différences
 */
export function diff(original: string, updated: string): DiffResult {
  const originalLines = original.split('\n');
  const updatedLines = updated.split('\n');
  
  const added: string[] = [];
  const removed: string[] = [];
  const unchanged: string[] = [];
  
  let i = 0, j = 0;
  
  while (i < originalLines.length && j < updatedLines.length) {
    if (originalLines[i] === updatedLines[j]) {
      unchanged.push(originalLines[i]);
      i++;
      j++;
    } else {
      // On cherche la prochaine ligne correspondante
      let foundInOriginal = false;
      let foundInUpdated = false;
      
      // Chercher dans les prochaines lignes originales
      for (let k = i + 1; k < Math.min(i + 10, originalLines.length); k++) {
        if (originalLines[k] === updatedLines[j]) {
          foundInOriginal = true;
          while (i < k) {
            removed.push(originalLines[i]);
            i++;
          }
          break;
        }
      }
      
      // Si pas trouvé, chercher dans les lignes mises à jour
      if (!foundInOriginal) {
        for (let k = j + 1; k < Math.min(j + 10, updatedLines.length); k++) {
          if (updatedLines[k] === originalLines[i]) {
            foundInUpdated = true;
            while (j < k) {
              added.push(updatedLines[j]);
              j++;
            }
            break;
          }
        }
      }
      
      // Si toujours pas trouvé, considérer comme une modification
      if (!foundInOriginal && !foundInUpdated) {
        removed.push(originalLines[i]);
        added.push(updatedLines[j]);
        i++;
        j++;
      }
    }
  }
  
  // Ajouter les lignes restantes
  while (i < originalLines.length) {
    removed.push(originalLines[i]);
    i++;
  }
  
  while (j < updatedLines.length) {
    added.push(updatedLines[j]);
    j++;
  }
  
  const similarity = calculateSimilarity(original, updated);
  
  return {
    added,
    removed,
    unchanged,
    similarity
  };
}

/**
 * Formate les différences entre deux textes sous forme de HTML
 */
export function formatDiffAsHTML(original: string, updated: string): string {
  const result = diff(original, updated);
  
  let html = '<div class="diff-container">';
  
  if (result.removed.length > 0) {
    html += '<div class="diff-section diff-removed">';
    html += '<h3>Supprimé</h3>';
    html += '<pre>';
    result.removed.forEach(line => {
      html += `<div class="diff-line diff-removed-line">- ${escapeHTML(line)}</div>`;
    });
    html += '</pre>';
    html += '</div>';
  }
  
  if (result.added.length > 0) {
    html += '<div class="diff-section diff-added">';
    html += '<h3>Ajouté</h3>';
    html += '<pre>';
    result.added.forEach(line => {
      html += `<div class="diff-line diff-added-line">+ ${escapeHTML(line)}</div>`;
    });
    html += '</pre>';
    html += '</div>';
  }
  
  html += `<div class="diff-similarity">Similarité: ${result.similarity.toFixed(2)}%</div>`;
  html += '</div>';
  
  return html;
}

/**
 * Échapper les caractères HTML spéciaux
 */
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
