#!/usr/bin/env node

/**
 * Script pour corriger automatiquement les problèmes de syntaxe courants dans les tests Vitest
 *
 * Usage:
 * node fix-test-syntax.js path/to/test/file.test.ts
 *
 * ou pour corriger tous les tests dans un répertoire:
 * node fix-test-syntax.js path/to/test/directory
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Regex pour détecter la syntaxe incorrecte
const INCORRECT_DESCRIBE_REGEX = /describe\(['"]([^'"]+)['"]\s*\(\s*\)\s*=>/g;
const INCORRECT_IT_REGEX = /it\(['"]([^'"]+)['"]\s*\(\s*\)\s*=>/g;
const MISSING_COMMA_IMPORT = /import\s*{\s*([^}]+)\s*}\s+from/g;

// Correction de la syntaxe
function fixTestSyntax(content) {
  // Correction de describe('Name' () => {}) -> describe('Name', () => {})
  let fixedContent = content.replace(INCORRECT_DESCRIBE_REGEX, "describe('$1', () =>");

  // Correction de it('should do something' () => {}) -> it('should do something', () => {})
  fixedContent = fixedContent.replace(INCORRECT_IT_REGEX, "it('$1', () =>");

  // Correction des importations sans virgules
  // Exemple: import { describe expect vi } from 'vitest' -> import { describe, expect, vi } from 'vitest'
  fixedContent = fixedContent.replace(MISSING_COMMA_IMPORT, (match, imports) => {
    const fixedImports = imports.trim().split(/\s+/).join(', ');
    return `import { ${fixedImports} } from`;
  });

  return fixedContent;
}

// Traitement d'un fichier
function processFile(filePath) {
  console.log(`Traitement du fichier: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixTestSyntax(content);

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

// Recherche récursive de fichiers de test
function findTestFiles(directory) {
  const files = fs.readdirSync(directory);
  let testFiles = [];

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      testFiles = [...testFiles, ...findTestFiles(fullPath)];
    } else if (/\.(test|spec)\.(ts|tsx|js|jsx)$/.test(file) && !fullPath.includes('node_modules')) {
      testFiles.push(fullPath);
    }
  }

  return testFiles;
}

// Fonction principale
function main() {
  const target = process.argv[2];

  if (!target) {
    console.error('Veuillez spécifier un fichier ou un répertoire à traiter');
    process.exit(1);
  }

  // Vérifier si le chemin existe
  if (!fs.existsSync(target)) {
    console.error(`Le chemin "${target}" n'existe pas`);
    process.exit(1);
  }

  let filesToProcess = [];
  const stats = fs.statSync(target);

  if (stats.isDirectory()) {
    console.log(`Recherche des fichiers de test dans le répertoire: ${target}`);
    filesToProcess = findTestFiles(target);
    console.log(`${filesToProcess.length} fichiers de test trouvés`);
  } else {
    filesToProcess = [target];
  }

  // Corriger tous les fichiers
  let fixedCount = 0;
  for (const file of filesToProcess) {
    if (processFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\n📝 Résumé: ${fixedCount}/${filesToProcess.length} fichiers corrigés`);
}

main();
