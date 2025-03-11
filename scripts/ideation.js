#!/usr/bin/env node

/**
 * Script pour exécuter le workflow d'idéation
 * 
 * Usage:
 * node scripts/ideation.js "Votre idée initiale ici"
 */

// Récupérer l'entrée de l'utilisateur depuis les arguments de la ligne de commande
const userInput = process.argv.slice(2).join(' ') || 'Une application pour aider les développeurs à créer des projets rapidement';

// Configurer ts-node
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    esModuleInterop: true,
    target: 'es2017',
    moduleResolution: 'node',
    sourceMap: true,
    outDir: 'dist'
  }
});

// Importer le workflow d'idéation
const { runIdeationWorkflow } = require('../app/lib/examples/ideation-workflow');

// Exécuter le workflow
console.log('Démarrage du workflow d\'idéation...');
console.log(`Entrée initiale: "${userInput}"`);
console.log('-----------------------------------');

runIdeationWorkflow(userInput)
  .then(() => {
    console.log('\n✨ Workflow d\'idéation terminé avec succès! ✨');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erreur lors de l\'exécution du workflow:', err);
    process.exit(1);
  });
