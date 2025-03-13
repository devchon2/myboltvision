/**
 * Ce fichier aide à résoudre les problèmes de loader Remix
 * en fournissant un outil de diagnostic et de correction
 * pour les erreurs courantes liées aux loaders
 */

// Configuration pour les messages de logs clairs
const styles = {
  error: '\x1b[31m%s\x1b[0m', // Rouge
  success: '\x1b[32m%s\x1b[0m', // Vert
  warning: '\x1b[33m%s\x1b[0m', // Jaune
  info: '\x1b[36m%s\x1b[0m', // Cyan
  title: '\x1b[1m\x1b[35m%s\x1b[0m', // Magenta gras
};

console.log(styles.title, '🛠️  DIAGNOSTIC DU LOADER REMIX 🛠️');

// Vérifier les variables d'environnement pertinentes
const checkEnv = () => {
  console.log(styles.info, "✓ Vérification des variables d'environnement...");
  console.log('  NODE_ENV:', process.env.NODE_ENV || 'non défini');
};

// Vérifier les versions des packages Remix et dépendances
const checkVersions = () => {
  console.log(styles.info, '✓ Vérification des versions...');

  try {
    const packageJson = require('./package.json');

    // Vérification des résolutions
    const resolutions = packageJson.resolutions || {};
    console.log('  Résolutions:');
    ['@remix-run/react', '@remix-run/dev', '@remix-run/server-runtime', '@remix-run/cloudflare'].forEach((pkg) => {
      console.log(`    ${pkg}: ${resolutions[pkg] || 'non spécifié'}`);
    });

    // Vérification des dépendances
    const dependencies = packageJson.dependencies || {};
    console.log('  Dépendances:');
    ['@remix-run/react', '@remix-run/dev', '@remix-run/server-runtime', '@remix-run/cloudflare'].forEach((pkg) => {
      console.log(`    ${pkg}: ${dependencies[pkg] || 'non spécifié'}`);
    });

    // Vérification des devDependencies
    const devDependencies = packageJson.devDependencies || {};
    console.log('  DevDépendances:');
    ['@remix-run/react', '@remix-run/dev', '@remix-run/server-runtime', '@remix-run/cloudflare'].forEach((pkg) => {
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
  const fs = require('fs');
  const path = require('path');

  try {
    const routesDir = path.join(__dirname, 'app', 'routes');
    const routeFiles = fs.readdirSync(routesDir);

    console.log('  Routes disponibles:');
    routeFiles.forEach((file) => {
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

// Exécuter les vérifications
checkEnv();
checkVersions();
checkRemixConfig();
checkRoutes();

console.log(styles.title, '🔍 ANALYSE TERMINÉE');
console.log(
  styles.info,
  'Exécutez "node debug-loader.js" avant de démarrer l\'application pour diagnostiquer les problèmes',
);

module.exports = {
  fixLoaderIssue: () => {
    // Injection de polyfills et corrections pour les problèmes de loader
    if (typeof global !== 'undefined') {
      if (!global.__remix_loader_stack) {
        global.__remix_loader_stack = [];
        console.log(styles.success, '✓ Global __remix_loader_stack polyfill installé');
      }
    }
  },
};

// Si ce fichier est exécuté directement
if (require.main === module) {
  console.log(styles.info, 'Exécution des correctifs automatiques...');
  module.exports.fixLoaderIssue();
}
