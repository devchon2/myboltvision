#!/usr/bin/env node

/**
 * Script pour compiler et exécuter le workflow d'idéation
 * 
 * Usage:
 * node scripts/run-workflow.js "Votre idée initiale ici"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Récupérer l'entrée de l'utilisateur depuis les arguments de la ligne de commande
const userInput = process.argv.slice(2).join(' ') || 'Une application pour aider les développeurs à créer des projets rapidement';

// Créer un fichier temporaire qui exécute le workflow
const tempFile = path.join(__dirname, 'temp-workflow.ts');
fs.writeFileSync(tempFile, `
import { runIdeationWorkflow } from '../app/lib/examples/ideation-workflow';

async function main() {
  try {
    await runIdeationWorkflow("${userInput.replace(/"/g, '\\"')}");
    console.log('\\n✨ Workflow d\\'idéation terminé avec succès! ✨');
  } catch (error) {
    console.error('❌ Erreur lors de l\\'exécution du workflow:', error);
    process.exit(1);
  }
}

main();
`);

try {
  // Exécuter le fichier temporaire avec ts-node
  console.log('Démarrage du workflow d\'idéation...');
  console.log(`Entrée initiale: "${userInput}"`);
  console.log('-----------------------------------');
  
  execSync(`npx ts-node --skipProject ${tempFile}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erreur lors de l\'exécution du workflow:', error.message);
} finally {
  // Supprimer le fichier temporaire
  try {
    fs.unlinkSync(tempFile);
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier temporaire:', error.message);
  }
}
