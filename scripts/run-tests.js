#!/usr/bin/env node

/**
 * Script pour exécuter tous les tests et vérifier leur statut
 * Ce script recherche tous les fichiers de test dans le projet,
 * les exécute et génère un rapport sur leur statut.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const TESTS_DIR = path.resolve(__dirname, '../app');
const TEST_FILE_PATTERN = /\.(test|spec)\.(ts|tsx)$/;
const REPORT_FILE = path.resolve(__dirname, '../test-report.md');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}=== Vérification des tests de MyBoltVision ===${colors.reset}\n`);

// Trouver tous les fichiers de test
const findTestFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findTestFiles(filePath));
    } else if (TEST_FILE_PATTERN.test(file)) {
      results.push(filePath);
    }
  });
  
  return results;
};

// Exécuter Jest sur un fichier spécifique
const runTest = (filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  console.log(`${colors.blue}Exécution de${colors.reset} ${relativePath}`);
  
  try {
    // Ajouter --passWithNoTests pour éviter les échecs quand les tests ne sont pas trouvés
    // (comme pour les fichiers .spec.ts qui existent mais n'ont pas de tests)
    const output = execSync(`npx jest ${relativePath} --verbose --passWithNoTests`, { 
      encoding: 'utf8',
      stdio: 'pipe' // Capturer à la fois stdout et stderr
    });
    
    // Vérifier si les tests ont réussi en analysant la sortie
    const success = !output.includes('FAIL') || output.includes('PASS');
    
    return { 
      path: relativePath, 
      success,
      output 
    };
  } catch (error) {
    // Capturer la sortie de l'erreur pour l'analyse
    const errorOutput = error.stdout || error.stderr || error.message;
    console.error(`${colors.red}Erreur lors de l'exécution de ${relativePath}:${colors.reset}`);
    console.error(errorOutput);
    
    return { 
      path: relativePath, 
      success: false, 
      output: errorOutput 
    };
  }
};

// Analyser la sortie de Jest pour extraire des informations utiles
const parseTestOutput = (output) => {
  const lines = output.split('\n');
  const summary = lines.find(line => line.includes('Tests:'));
  
  if (!summary) return { total: 0, passed: 0, failed: 0, skipped: 0 };
  
  const totalMatch = summary.match(/(\d+) total/);
  const passedMatch = summary.match(/(\d+) passed/);
  const failedMatch = summary.match(/(\d+) failed/);
  const skippedMatch = summary.match(/(\d+) skipped/);
  
  return {
    total: totalMatch ? parseInt(totalMatch[1]) : 0,
    passed: passedMatch ? parseInt(passedMatch[1]) : 0,
    failed: failedMatch ? parseInt(failedMatch[1]) : 0,
    skipped: skippedMatch ? parseInt(skippedMatch[1]) : 0
  };
};

// Extraire le nom du module testé
const getModuleName = (filePath) => {
  const parts = filePath.split(path.sep);
  // Trouver l'index du dossier "__tests__"
  const testDirIndex = parts.findIndex(part => part === '__tests__');
  
  if (testDirIndex > 0 && testDirIndex < parts.length - 1) {
    // Retourner le dossier parent et le nom du module testé
    return `${parts[testDirIndex - 2]}/${parts[testDirIndex - 1]}`;
  }
  
  // Fallback: extraire juste le nom du fichier sans l'extension
  const filename = path.basename(filePath);
  return filename.replace(TEST_FILE_PATTERN, '');
};

// Générer un rapport Markdown
const generateReport = (results) => {
  const totalTests = results.reduce((sum, result) => {
    const stats = parseTestOutput(result.output);
    return sum + stats.total;
  }, 0);
  
  const passedTests = results.reduce((sum, result) => {
    const stats = parseTestOutput(result.output);
    return sum + stats.passed;
  }, 0);
  
  const successfulFiles = results.filter(r => r.success).length;
  
  let report = `# Rapport de Tests MyBoltVision\n\n`;
  report += `Date: ${new Date().toLocaleString('fr-FR')}\n\n`;
  report += `## Résumé\n\n`;
  report += `- Fichiers de test: ${results.length}\n`;
  report += `- Fichiers réussis: ${successfulFiles} (${Math.round(successfulFiles / results.length * 100)}%)\n`;
  report += `- Tests individuels: ${totalTests}\n`;
  report += `- Tests réussis: ${passedTests} (${Math.round(passedTests / totalTests * 100)}%)\n\n`;
  
  report += `## Résultats détaillés\n\n`;
  report += `| Module | Status | Tests | Passés | Échecs | Ignorés |\n`;
  report += `|--------|--------|-------|--------|--------|--------|\n`;
  
  results.forEach(result => {
    const moduleName = getModuleName(result.path);
    const stats = parseTestOutput(result.output);
    const status = result.success ? '✅' : '❌';
    
    report += `| ${moduleName} | ${status} | ${stats.total} | ${stats.passed} | ${stats.failed} | ${stats.skipped} |\n`;
  });
  
  report += `\n## État d'implémentation\n\n`;
  report += `### Composants implémentés\n\n`;
  report += `- ✅ IdeationWorkbench: Interface utilisateur pour le processus d'idéation\n`;
  report += `- ✅ IdeationAgent: Agent spécialisé dans la génération d'idées\n`;
  report += `- ✅ ContextManager: Gestionnaire de contexte pour les agents\n`;
  report += `- ✅ AgentOrchestrator: Orchestrateur pour les workflows d'agents\n`;
  
  report += `\n### Modules à implémenter\n\n`;
  report += `- ⏳ DocumentationAgent: Agent pour la génération de documentation\n`;
  report += `- ⏳ MarketAnalysisAgent: Agent pour l'analyse de marché\n`;
  report += `- ⏳ DesignAgent: Agent pour la création de wireframes et maquettes\n`;
  report += `- ⏳ DevAgent: Agent pour la génération de code\n`;
  report += `- ⏳ DeploymentAgent: Agent pour la préparation au déploiement\n`;
  
  return report;
};

try {
  // Trouver tous les fichiers de test
  const testFiles = findTestFiles(TESTS_DIR);
  console.log(`${colors.cyan}Trouvé ${testFiles.length} fichiers de test${colors.reset}\n`);
  
  if (testFiles.length === 0) {
    console.error(`${colors.red}Aucun fichier de test trouvé!${colors.reset}`);
    process.exit(1);
  }
  
  // Exécuter chaque test individuellement
  const results = testFiles.map(runTest);
  
  // Afficher un résumé
  const successCount = results.filter(r => r.success).length;
  const failCount = results.length - successCount;
  
  console.log('\n');
  console.log(`${colors.cyan}=== Résumé des tests ===${colors.reset}`);
  console.log(`${colors.green}Réussis: ${successCount}${colors.reset}`);
  console.log(`${colors.red}Échoués: ${failCount}${colors.reset}`);
  
  // Générer un rapport
  const report = generateReport(results);
  fs.writeFileSync(REPORT_FILE, report);
  console.log(`\n${colors.cyan}Rapport généré: ${REPORT_FILE}${colors.reset}`);
  
  // Sortir avec un code d'erreur si des tests ont échoué
  if (failCount > 0) {
    process.exit(1);
  }
  
} catch (error) {
  console.error(`${colors.red}Erreur lors de l'exécution des tests:${colors.reset} ${error.message}`);
  process.exit(1);
}
