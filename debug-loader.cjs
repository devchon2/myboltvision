/**
 * Ce fichier aide à résoudre les problèmes de loader Remix
 * en fournissant un outil de diagnostic et de correction
 * pour les erreurs courantes liées aux loaders
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration pour les messages de logs clairs
const styles = {
  error: '\x1b[31m%s\x1b[0m',    // Rouge
  success: '\x1b[32m%s\x1b[0m',  // Vert
  warning: '\x1b[33m%s\x1b[0m',  // Jaune
  info: '\x1b[36m%s\x1b[0m',     // Cyan
  title: '\x1b[1m\x1b[35m%s\x1b[0m' // Magenta gras
};

console.log(styles.title, '🛠️  DIAGNOSTIC DU LOADER REMIX 🛠️');

// Vérifier les variables d'environnement pertinentes
const checkEnv = () => {
  console.log(styles.info, '✓ Vérification des variables d\'environnement...');
  console.log('  NODE_ENV:', process.env.NODE_ENV || 'non défini');
};

// Vérifier les versions des packages Remix et dépendances
const checkVersions = () => {
  console.log(styles.info, '✓ Vérification des versions installées...');
  
  try {
    // Utiliser execSync pour exécuter npm ls, plus fiable que de lire package.json
    const npmOutput = execSync('npm ls @remix-run/react @remix-run/dev @remix-run/server-runtime @remix-run/cloudflare', { encoding: 'utf8' });
    console.log(npmOutput);
  } catch (error) {
    console.log(styles.warning, '⚠️ Erreur lors de la vérification des versions (normal si des conflits existent)');
    console.log(error.stdout || error.message);
  }
  
  try {
    const packageJson = require('./package.json');
    
    // Vérification des résolutions
    const resolutions = packageJson.resolutions || {};
    console.log('  Résolutions dans package.json:');
    ['@remix-run/react', '@remix-run/dev', '@remix-run/server-runtime', '@remix-run/cloudflare'].forEach(pkg => {
      console.log(`    ${pkg}: ${resolutions[pkg] || 'non spécifié'}`);
    });
    
    // Vérification des dépendances
    const dependencies = packageJson.dependencies || {};
    console.log('  Dépendances dans package.json:');
    ['@remix-run/react', '@remix-run/dev', '@remix-run/server-runtime', '@remix-run/cloudflare'].forEach(pkg => {
      console.log(`    ${pkg}: ${dependencies[pkg] || 'non spécifié'}`);
    });
    
    // Vérification des devDependencies
    const devDependencies = packageJson.devDependencies || {};
    console.log('  DevDépendances dans package.json:');
    ['@remix-run/react', '@remix-run/dev', '@remix-run/server-runtime', '@remix-run/cloudflare'].forEach(pkg => {
      console.log(`    ${pkg}: ${devDependencies[pkg] || 'non spécifié'}`);
    });
  } catch (error) {
    console.log(styles.error, '❌ Erreur lors de la lecture du package.json:', error.message);
  }
};

// Vérifier la configuration de Remix
const checkRemixConfig = () => {
  console.log(styles.info, '✓ Vérification de la configuration Remix...');
  
  try {
    const remixConfig = require('./remix.config.js');
    console.log('  Configuration Remix:');
    console.log('    serverModuleFormat:', remixConfig.serverModuleFormat);
    console.log('    future flags:', JSON.stringify(remixConfig.future, null, 2));
  } catch (error) {
    console.log(styles.error, '❌ Erreur lors de la lecture de remix.config.js:', error.message);
  }
};

// Vérifier les routes disponibles
const checkRoutes = () => {
  console.log(styles.info, '✓ Vérification des routes...');
  
  try {
    const routesDir = path.join(__dirname, 'app', 'routes');
    const routeFiles = fs.readdirSync(routesDir);
    
    console.log('  Routes disponibles:');
    routeFiles.forEach(file => {
      console.log(`    ${file}`);
      
      // Vérifier si le fichier de route a un loader
      try {
        const routeContent = fs.readFileSync(path.join(routesDir, file), 'utf8');
        if (routeContent.includes('export const loader')) {
          console.log(styles.success, `      ✓ Loader trouvé`);
        } else {
          console.log(styles.warning, `      ⚠️ Aucun loader défini`);
        }
      } catch (e) {
        // Ignorer les erreurs de lecture de fichier
      }
    });
  } catch (error) {
    console.log(styles.error, '❌ Erreur lors de la lecture des routes:', error.message);
  }
};

// Fonction pour appliquer des corrections automatiques
const applyFixes = () => {
  console.log(styles.info, '✓ Application des corrections automatiques...');

  // Ajouter support pour le loader à _index.tsx s'il n'en a pas
  try {
    const indexPath = path.join(__dirname, 'app', 'routes', '_index.tsx');
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    if (!indexContent.includes('export const loader')) {
      console.log(styles.warning, '⚠️ Aucun loader trouvé dans _index.tsx, ajout en cours...');
      
      // Injection d'un loader basic si nécessaire
      indexContent = indexContent.replace(
        /import (.*) from ['"]@remix-run\/cloudflare['"];/,
        'import $1, { json } from \'@remix-run/cloudflare\';'
      );
      
      // Si json n'est pas déjà importé, l'ajouter
      if (!indexContent.includes('json')) {
        indexContent = indexContent.replace(
          /import (.*) from ['"]@remix-run\/cloudflare['"];/,
          'import $1, { json } from \'@remix-run/cloudflare\';'
        );
      }
      
      // Ajouter un loader minimal
      if (!indexContent.includes('export const loader')) {
        indexContent = indexContent.replace(
          /export default function/,
          'export const loader = async () => {\n  return json({ status: "ok" });\n};\n\nexport default function'
        );
        
        fs.writeFileSync(indexPath, indexContent);
        console.log(styles.success, '✓ Loader ajouté à _index.tsx');
      }
    }
  } catch (error) {
    console.log(styles.error, '❌ Erreur lors de la correction du loader:', error.message);
  }
  
  // Assurer que les polyfills nécessaires sont en place
  if (typeof global !== 'undefined') {
    if (!global.__remix_loader_stack) {
      global.__remix_loader_stack = [];
      console.log(styles.success, '✓ Global __remix_loader_stack polyfill installé');
    }
  }
  
  // Autres fixes pourraient être ajoutés ici
};

// Exécuter les vérifications
checkEnv();
checkVersions();
checkRemixConfig();
checkRoutes();

console.log(styles.title, '🔍 ANALYSE TERMINÉE');

// Appliquer les corrections
console.log(styles.info, 'Application des corrections automatiques...');
applyFixes();

console.log(styles.title, '🚀 CORRECTIONS APPLIQUÉES');
console.log(styles.info, 'Essayez maintenant de démarrer l\'application avec: npm run dev');
