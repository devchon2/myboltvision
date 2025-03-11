#!/usr/bin/env node

/**
 * Script pour exécuter le workflow d'idéation
 * 
 * Usage:
 * node scripts/run-ideation.js "Votre idée initiale ici"
 */

const { execSync } = require('child_process');
const path = require('path');

// Récupérer l'entrée de l'utilisateur depuis les arguments de la ligne de commande
const userInput = process.argv.slice(2).join(' ') || 'Une application pour aider les développeurs à créer des projets rapidement';

try {
  // Exécuter le fichier TypeScript directement avec ts-node
  console.log('Démarrage du workflow d\'idéation...');
  console.log(`Entrée initiale: "${userInput}"`);
  console.log('-----------------------------------');
  
  const result = execSync(
    `npx ts-node -T "${path.join(__dirname, '../app/lib/examples/ideation-workflow.ts')}" "${userInput}"`,
    { stdio: 'inherit' }
  );
  
  console.log('\n✨ Workflow d\'idéation terminé avec succès! ✨');
} catch (error) {
  console.error('❌ Erreur lors de l\'exécution du workflow:', error.message);
  process.exit(1);
}
