/**
 * Script de démarrage amélioré pour l'environnement de développement
 * Ce script exécute des vérifications préliminaires et configure correctement
 * l'environnement avant de lancer l'application, évitant les erreurs courantes.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration des styles pour les logs
const styles = {
  error: '\x1b[31m%s\x1b[0m',    // Rouge
  success: '\x1b[32m%s\x1b[0m',  // Vert
  warning: '\x1b[33m%s\x1b[0m',  // Jaune
  info: '\x1b[36m%s\x1b[0m',     // Cyan
  title: '\x1b[1m\x1b[35m%s\x1b[0m' // Magenta gras
};

console.log(styles.title, '\n★═══════════════════════════════════════★');
console.log(styles.title, '       B O L T . D I Y   STARTER       ');
console.log(styles.title, '          ⚡️  Démarrage  ⚡️         ');
console.log(styles.title, '★═══════════════════════════════════════★\n');

// Préparation de l'environnement global
const prepareGlobalEnvironment = () => {
  console.log(styles.info, '1️⃣ Préparation de l\'environnement global...');
  
  // Définition de variables d'environnement importantes
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  
  // Polyfills pour les problèmes connus
  global.__remix_loader_stack = global.__remix_loader_stack || [];
  global.module = global.module || { exports: {} };
  
  console.log('   ✓ NODE_ENV =', process.env.NODE_ENV);
  console.log('   ✓ Polyfills appliqués');
};

// Vérification des dépendances
const checkDependencies = () => {
  console.log(styles.info, '2️⃣ Vérification des dépendances...');
  
  try {
    // Lire le package.json
    const packageJson = require('./package.json');
    const resolutions = packageJson.resolutions || {};
    
    // Vérifier la cohérence des versions Remix
    const remixVersions = {
      react: resolutions['@remix-run/react'],
      dev: resolutions['@remix-run/dev'],
      cloudflare: resolutions['@remix-run/cloudflare'],
      serverRuntime: resolutions['@remix-run/server-runtime']
    };
    
    // Vérifier si toutes les versions sont identiques
    const versions = new Set(Object.values(remixVersions));
    if (versions.size === 1) {
      console.log(styles.success, `   ✓ Versions Remix cohérentes (${Array.from(versions)[0]})`);
    } else {
      console.log(styles.warning, '   ⚠️ Versions Remix incohérentes:');
      Object.entries(remixVersions).forEach(([key, value]) => {
        console.log(`      - @remix-run/${key}: ${value}`);
      });
    }
  } catch (error) {
    console.log(styles.error, '   ❌ Erreur lors de la vérification des dépendances:', error.message);
  }
};

// Vérification et correction des routes
const checkRoutes = () => {
  console.log(styles.info, '3️⃣ Vérification des routes...');
  
  try {
    // Vérifier spécifiquement la route _index.tsx
    const indexPath = path.join(__dirname, 'app', 'routes', '_index.tsx');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      
      if (indexContent.includes('export const loader')) {
        console.log(styles.success, '   ✓ La route _index.tsx contient un loader');
      } else {
        console.log(styles.warning, '   ⚠️ La route _index.tsx ne contient pas de loader');
        console.log('      → Exécutez node debug-loader.cjs pour ajouter automatiquement un loader');
      }
    } else {
      console.log(styles.error, '   ❌ Route _index.tsx non trouvée');
    }
  } catch (error) {
    console.log(styles.error, '   ❌ Erreur lors de la vérification des routes:', error.message);
  }
};

// Nettoyer le cache si nécessaire
const cleanCache = () => {
  console.log(styles.info, '4️⃣ Nettoyage du cache si nécessaire...');
  
  try {
    // Supprimer le dossier .cache si présent
    const cachePath = path.join(__dirname, '.cache');
    if (fs.existsSync(cachePath)) {
      fs.rmSync(cachePath, { recursive: true, force: true });
      console.log('   ✓ Cache supprimé');
    } else {
      console.log('   ✓ Pas de cache à nettoyer');
    }
    
    // Nettoyer le dossier build si nécessaire
    const buildPath = path.join(__dirname, 'build');
    if (fs.existsSync(buildPath)) {
      fs.rmSync(buildPath, { recursive: true, force: true });
      console.log('   ✓ Dossier build nettoyé');
    }
  } catch (error) {
    console.log(styles.error, '   ❌ Erreur lors du nettoyage du cache:', error.message);
  }
};

// Démarrer l'application en séquence
const startApp = () => {
  console.log(styles.info, '5️⃣ Démarrage de l\'application...');
  
  try {
    // Exécuter la commande de démarrage standard
    console.log('   → Exécution de la séquence de démarrage:');
    console.log('     1. pre-start.cjs');
    console.log('     2. module-polyfill.cjs');
    console.log('     3. vite');
    
    // Exécuter pre-start.cjs
    execSync('node pre-start.cjs', { stdio: 'inherit' });
    
    // Exécuter module-polyfill.cjs
    execSync('node module-polyfill.cjs', { stdio: 'inherit' });
    
    // Démarrer Vite en créant un processus détaché
    const viteProcess = spawn('npx', ['vite'], { 
      stdio: 'inherit',
      shell: true
    });
    
    viteProcess.on('error', (error) => {
      console.log(styles.error, `❌ Erreur lors du démarrage de Vite: ${error.message}`);
    });
    
    // En cas d'erreur, afficher des informations de diagnostic
    process.on('SIGINT', () => {
      console.log(styles.info, '\n👋 Arrêt de l\'application...');
      viteProcess.kill();
      process.exit(0);
    });
  } catch (error) {
    console.log(styles.error, `❌ Erreur lors du démarrage: ${error.message}`);
    console.log(styles.info, '💡 Conseil: Essayez d\'exécuter node debug-loader.cjs pour diagnostiquer et corriger les problèmes');
  }
};

// Exécuter la séquence de démarrage
(async () => {
  prepareGlobalEnvironment();
  checkDependencies();
  checkRoutes();
  cleanCache();
  startApp();
})();
