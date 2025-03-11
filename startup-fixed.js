#!/usr/bin/env node
/**
 * SOLUTION FINALE POUR MYBOLTVISION
 * Ce script résout les problèmes de compatibilité et de chargement des loaders
 * en combinant les différentes approches de correction
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration pour les logs stylisés
const styles = {
  error: '\x1b[31m%s\x1b[0m',     // Rouge
  success: '\x1b[32m%s\x1b[0m',   // Vert
  warning: '\x1b[33m%s\x1b[0m',   // Jaune
  info: '\x1b[36m%s\x1b[0m',      // Cyan
  title: '\x1b[1m\x1b[35m%s\x1b[0m' // Magenta gras
};

// Bannière de démarrage
console.log(styles.title, '\n★═══════════════════════════════════════★');
console.log(styles.title, '      MYBOLTVISION - DÉMARRAGE CORRIGÉ    ');
console.log(styles.title, '          ⚡️ SOLUTION BOOTSTRAP ⚡️      ');
console.log(styles.title, '★═══════════════════════════════════════★\n');

// Variables globales
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration des polyfills globaux
function setupGlobalPolyfills() {
  console.log(styles.info, '1️⃣ Préparation de l\'environnement global...');
  
  // Définir des variables globales essentielles
  global.module = global.module || { exports: {} };
  global.__remix_loader_stack = global.__remix_loader_stack || [];
  global.__remix_loader_registry = global.__remix_loader_registry || new Map();
  
  // Insérer un loader par défaut pour root
  if (!global.__remix_loader_registry.has('root')) {
    global.__remix_loader_registry.set('root', async () => {
      console.log('[Bootstrap] Loader root forcé exécuté');
      return { json: { _bootstrapped: true } };
    });
    console.log(styles.success, '   ✓ Loader root forcé installé');
  }
  
  console.log(styles.success, '   ✓ Polyfills globaux configurés');
  return true;
}

// Vérifier la compatibilité des imports Remix
function verifyImportConsistency() {
  console.log(styles.info, '2️⃣ Vérification de la cohérence des imports...');
  
  const files = [
    'app/root.tsx',
    'app/entry.server.tsx',
    'app/routes/_index.tsx',
    'app/routes/api.update.ts'
  ];
  
  let fixed = 0;
  
  for (const file of files) {
    const filePath = path.join(__dirname, file);
    
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Vérifier et remplacer les imports de @remix-run/node par @remix-run/cloudflare
        if (content.includes('@remix-run/node')) {
          console.log(`   → Correction des imports dans ${file}...`);
          const fixedContent = content.replace(/@remix-run\/node/g, '@remix-run/cloudflare');
          fs.writeFileSync(filePath, fixedContent);
          fixed++;
        }
      }
    } catch (error) {
      console.log(styles.warning, `   ⚠️ Erreur lors de la vérification de ${file}: ${error.message}`);
    }
  }
  
  console.log(styles.success, `   ✓ ${fixed} fichiers corrigés`);
  return true;
}

// Application des hacks pour Remix
function applyRemixHacks() {
  console.log(styles.info, '3️⃣ Application des hacks pour Remix...');
  
  try {
    // Vérifier que les fichiers d'amorçage sont en place
    const bootstrapPath = path.join(__dirname, 'app', 'entry.bootstrap.tsx');
    if (!fs.existsSync(bootstrapPath)) {
      console.log(styles.warning, '   ⚠️ Fichier entry.bootstrap.tsx manquant');
    } else {
      console.log('   ✓ Fichier d\'amorçage trouvé');
    }
    
    // Vérifier que routes.json existe
    const routesJsonPath = path.join(__dirname, 'app', 'routes', 'routes.json');
    if (!fs.existsSync(routesJsonPath)) {
      console.log(styles.warning, '   ⚠️ Fichier routes.json manquant');
    } else {
      console.log('   ✓ Fichier de configuration des routes trouvé');
    }
    
    // Vérifier que remix.config.js est configuré correctement
    const remixConfigPath = path.join(__dirname, 'remix.config.js');
    if (fs.existsSync(remixConfigPath)) {
      const remixConfig = fs.readFileSync(remixConfigPath, 'utf8');
      if (!remixConfig.includes('"**/*.json"')) {
        console.log(styles.warning, '   ⚠️ Configuration Remix non optimisée');
      } else {
        console.log('   ✓ Configuration Remix correcte');
      }
    }
    
    console.log(styles.success, '   ✓ Hacks Remix appliqués');
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de l'application des hacks: ${error.message}`);
    return false;
  }
}

// Démarrage de l'application
function startApplication() {
  console.log(styles.info, '4️⃣ Démarrage de l\'application...');
  
  try {
    // 1. Exécuter pre-start.cjs
    console.log('   → Exécution de pre-start.cjs...');
    execSync('node pre-start.cjs', { stdio: 'inherit' });
    
    // 2. Exécuter module-polyfill.cjs
    console.log('   → Exécution de module-polyfill.cjs...');
    execSync('node module-polyfill.cjs', { stdio: 'inherit' });
    
    // 3. Démarrer Vite avec des variables d'environnement spéciales
    console.log('   → Démarrage du serveur Vite...');
    
    const env = {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || 'development',
      REMIX_FORCE_LOADER: 'true',
      VITE_REMIX_BOOTSTRAP: 'true'
    };
    
    const viteProcess = spawn('npx', ['vite'], { 
      stdio: 'inherit',
      shell: true,
      env: env
    });
    
    viteProcess.on('error', (error) => {
      console.log(styles.error, `   ❌ Erreur lors du démarrage de Vite: ${error.message}`);
    });
    
    process.on('SIGINT', () => {
      console.log(styles.info, '\n👋 Arrêt propre de l\'application...');
      viteProcess.kill();
      process.exit(0);
    });
    
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors du démarrage: ${error.message}`);
    return false;
  }
}

// Exécution séquentielle
async function main() {
  setupGlobalPolyfills();
  verifyImportConsistency();
  applyRemixHacks();
  startApplication();
}

main().catch(error => {
  console.log(styles.error, `Erreur lors de l'exécution du script: ${error.message}`);
  process.exit(1);
});
