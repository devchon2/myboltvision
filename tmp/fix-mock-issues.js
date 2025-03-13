#!/usr/bin/env node

/**
 * Script pour corriger les problèmes courants de mocking dans les tests Vitest,
 * en particulier le problème "Cannot access '__vi_import_1__' before initialization".
 *
 * Usage:
 * node fix-mock-issues.js path/to/test/file.test.ts
 */

const fs = require('fs');
const path = require('path');

// Identifier les problèmes de mocking
function identifyMockIssues(content) {
  const issues = [];

  // Rechercher les appels à vi.mock qui pourraient causer des problèmes
  const mockRegex = /vi\.mock\(['"]([^'"]+)['"]\s*,\s*(?:\(\)\s*=>\s*)?{/g;
  let match;

  while ((match = mockRegex.exec(content)) !== null) {
    issues.push({
      type: 'potential_closure_issue',
      modulePath: match[1],
      position: match.index,
    });
  }

  // Rechercher les hoisting problems (imports qui pourraient être utilisés dans des vi.mock)
  const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports = [];

  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      path: match[1],
      position: match.index,
    });
  }

  // Croiser les informations pour détecter les problèmes potentiels
  imports.forEach((imp) => {
    issues.forEach((issue) => {
      if (issue.modulePath === imp.path && issue.position > imp.position) {
        issue.type = 'definite_hoisting_issue';
      }
    });
  });

  return issues;
}

// Corriger les problèmes de mocking
function fixMockIssues(content) {
  const issues = identifyMockIssues(content);
  let fixedContent = content;

  // Traiter les problèmes trouvés
  if (issues.length > 0) {
    console.log(`${issues.length} problèmes potentiels de mocking trouvés.`);

    // 1. Déplacer tous les vi.mock en haut du fichier (avant les imports)
    const mockStatements = [];
    let contentWithoutMocks = fixedContent;

    // Extraire les vi.mock
    issues.forEach((issue) => {
      const mockRegex = new RegExp(`vi\\.mock\\(['"]${issue.modulePath}['"]([^;]*?)(\\);|\\)\\s*;)`, 's');
      const mockMatch = mockRegex.exec(contentWithoutMocks);

      if (mockMatch) {
        const fullMatch = mockMatch[0];
        mockStatements.push(fullMatch);
        contentWithoutMocks = contentWithoutMocks.replace(fullMatch, '');
      }
    });

    // Insérer les vi.mock avant les imports
    if (mockStatements.length > 0) {
      const firstImportIndex = contentWithoutMocks.indexOf('import');

      if (firstImportIndex >= 0) {
        fixedContent =
          contentWithoutMocks.slice(0, firstImportIndex) +
          mockStatements.join('\n') +
          '\n\n' +
          contentWithoutMocks.slice(firstImportIndex);
      }
    }

    // 2. Convertir les définitions de fonction en ligne en fonctions nommées
    mockStatements.forEach((mockStatement) => {
      const inlineFunctionRegex = /vi\.mock\(['"]([^'"]+)['"]\s*,\s*\(\)\s*=>\s*({[^}]*})/g;
      const inlineFunctionMatch = inlineFunctionRegex.exec(mockStatement);

      if (inlineFunctionMatch) {
        const modulePath = inlineFunctionMatch[1];
        const functionBody = inlineFunctionMatch[2];

        // Créer une fonction nommée
        const functionName = `mock${modulePath.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const namedFunction = `function ${functionName}() { return ${functionBody}; }`;

        // Remplacer la fonction en ligne par la fonction nommée
        const newMockStatement = `vi.mock('${modulePath}', ${functionName});`;

        // Insérer la fonction nommée avant les imports
        const firstImportIndex = fixedContent.indexOf('import');
        if (firstImportIndex >= 0) {
          fixedContent =
            fixedContent.slice(0, firstImportIndex) + namedFunction + '\n\n' + fixedContent.slice(firstImportIndex);
        }

        // Remplacer l'ancien vi.mock par le nouveau
        fixedContent = fixedContent.replace(mockStatement, newMockStatement);
      }
    });
  }

  return fixedContent;
}

// Traiter un fichier de test
function processFile(filePath) {
  console.log(`Traitement du fichier: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixMockIssues(content);

    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Fichier corrigé: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️ Aucune correction nécessaire: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement du fichier ${filePath}:`, error);
    return false;
  }
}

// Fonction principale
function main() {
  const targetFile = process.argv[2];

  if (!targetFile) {
    console.error('Veuillez spécifier un fichier de test à traiter.');
    process.exit(1);
  }

  if (!fs.existsSync(targetFile)) {
    console.error(`Le fichier "${targetFile}" n'existe pas.`);
    process.exit(1);
  }

  const processed = processFile(targetFile);
  if (processed) {
    console.log(`\nLe fichier ${targetFile} a été corrigé avec succès.`);
    console.log('Exécutez les tests pour vérifier que les problèmes ont été résolus.');
  } else {
    console.log(`\nAucune correction n'a été apportée au fichier ${targetFile}.`);
  }
}

// Exécuter le script
main();
