/**
 * Script de lancement direct qui contourne les problèmes de l'application
 */

const { execSync, spawn } = require('child_process');
const path = require('path');

// Définir les polyfills globaux nécessaires
global.module = global.module || { exports: {} };
global.__remix_loader_stack = global.__remix_loader_stack || [];

console.log('\n★═══════════════════════════════════════★');
console.log('       MYBOLTVISION - LANCEMENT DIRECT    ');
console.log('          ⚡️  Démarrage  ⚡️         ');
console.log('★═══════════════════════════════════════★\n');

// Exécuter la séquence de démarrage
console.log("1. Initialisation de l'environnement...");
execSync('node pre-start.cjs', { stdio: 'inherit' });

console.log('\n2. Application des polyfills...');
execSync('node module-polyfill.cjs', { stdio: 'inherit' });

console.log('\n3. Démarrage du serveur de développement...');
// Lancer Vite directement
const viteProcess = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

// Gérer la sortie propre
process.on('SIGINT', () => {
  console.log("\n👋 Arrêt de l'application...");
  viteProcess.kill();
  process.exit(0);
});

viteProcess.on('exit', (code) => {
  console.log(`\n🛑 Le serveur s'est arrêté avec le code: ${code}`);
  process.exit(code);
});
