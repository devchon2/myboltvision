/**
 * Script de réparation complète des dépendances Remix
 * Ce script nettoie le cache, supprime node_modules et réinstalle tout proprement
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration pour les logs
const styles = {
  error: '\x1b[31m%s\x1b[0m',    // Rouge
  success: '\x1b[32m%s\x1b[0m',  // Vert
  warning: '\x1b[33m%s\x1b[0m',  // Jaune
  info: '\x1b[36m%s\x1b[0m',     // Cyan
  title: '\x1b[1m\x1b[35m%s\x1b[0m' // Magenta gras
};

console.log(styles.title, '\n★═══════════════════════════════════════★');
console.log(styles.title, '       RÉPARATION COMPLÈTE REMIX       ');
console.log(styles.title, '       ⚡ CLEAN & REINSTALL ⚡       ');
console.log(styles.title, '★═══════════════════════════════════════★\n');

// Fonction pour exécuter les commandes en toute sécurité
function execSafe(cmd, options = {}) {
  try {
    console.log(styles.info, `Exécution de: ${cmd}`);
    return execSync(cmd, { stdio: 'inherit', ...options });
  } catch (error) {
    console.log(styles.error, `Erreur lors de l'exécution de: ${cmd}`);
    console.log(styles.error, error.message);
    return null;
  }
}

// Étape 1: Sauvegarder package.json pour référence
console.log(styles.info, '1. Sauvegarde du fichier package.json...');
try {
  const packageJson = fs.readFileSync('package.json', 'utf8');
  fs.writeFileSync('package.json.backup', packageJson);
  console.log(styles.success, '   ✓ Sauvegarde créée: package.json.backup');
} catch (error) {
  console.log(styles.error, `   ❌ Erreur lors de la sauvegarde: ${error.message}`);
  process.exit(1);
}

// Étape 2: Arrêter les processus node en cours (Windows)
console.log(styles.info, '2. Arrêt des processus node en cours...');
try {
  execSync('taskkill /F /IM node.exe /T', { stdio: 'ignore' });
  console.log(styles.success, '   ✓ Processus node arrêtés');
} catch (error) {
  console.log(styles.warning, '   ⚠️ Aucun processus node à arrêter ou erreur lors de l\'arrêt');
}

// Étape 3: Nettoyer le cache npm
console.log(styles.info, '3. Nettoyage du cache npm...');
execSafe('npm cache clean --force');

// Étape 4: Supprimer node_modules
console.log(styles.info, '4. Suppression de node_modules...');
try {
  fs.rmSync('node_modules', { recursive: true, force: true });
  console.log(styles.success, '   ✓ node_modules supprimé');
} catch (error) {
  console.log(styles.warning, `   ⚠️ Erreur lors de la suppression de node_modules: ${error.message}`);
}

// Étape 5: Supprimer le dossier .cache de Remix s'il existe
console.log(styles.info, '5. Suppression des caches Remix...');
const remixCaches = [
  path.join(process.env.APPDATA || '', 'npm-cache'),
  path.join(process.env.LOCALAPPDATA || '', '.remix'),
  path.join(process.env.LOCALAPPDATA || '', 'remix'),
  '.cache'
];

for (const cacheDir of remixCaches) {
  try {
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      console.log(styles.success, `   ✓ Cache supprimé: ${cacheDir}`);
    }
  } catch (error) {
    console.log(styles.warning, `   ⚠️ Erreur lors de la suppression du cache ${cacheDir}: ${error.message}`);
  }
}

// Étape 6: Réinstaller les dépendances
console.log(styles.info, '6. Réinstallation des dépendances...');
execSafe('npm install');

// Étape 7: Corriger le fichier package.json pour s'assurer que les versions Remix sont spécifiées explicitement
console.log(styles.info, '7. Vérification des versions de Remix dans package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const remixPackages = [
    '@remix-run/react',
    '@remix-run/dev',
    '@remix-run/server-runtime',
    '@remix-run/cloudflare'
  ];
  
  let modified = false;
  
  // Vérifier si toutes les dépendances Remix sont fixées à la même version
  for (const pkg of remixPackages) {
    if (packageJson.dependencies && packageJson.dependencies[pkg]) {
      packageJson.dependencies[pkg] = "2.16.0";
      modified = true;
      console.log(`   ✓ Version fixée pour ${pkg} en dépendance: 2.16.0`);
    }
    
    if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
      packageJson.devDependencies[pkg] = "2.16.0";
      modified = true;
      console.log(`   ✓ Version fixée pour ${pkg} en devDependency: 2.16.0`);
    }
  }
  
  // Ajouter une section resolutions si elle n'existe pas
  if (!packageJson.resolutions) {
    packageJson.resolutions = {};
    modified = true;
  }
  
  // Fixer les versions dans resolutions
  for (const pkg of remixPackages) {
    packageJson.resolutions[pkg] = "2.16.0";
    modified = true;
    console.log(`   ✓ Version fixée pour ${pkg} en resolution: 2.16.0`);
  }
  
  if (modified) {
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log(styles.success, '   ✓ package.json mis à jour avec des versions fixes');
  } else {
    console.log('   ℹ Aucune modification nécessaire dans package.json');
  }
} catch (error) {
  console.log(styles.error, `   ❌ Erreur lors de la modification de package.json: ${error.message}`);
}

// Étape 8: Réinstaller avec les nouvelles résolutions
console.log(styles.info, '8. Réinstallation avec les versions fixées...');
execSafe('npm install');

// Étape 9: Vérifier les versions installées
console.log(styles.info, '9. Vérification des versions installées...');
execSafe('npm ls @remix-run/react @remix-run/dev @remix-run/server-runtime @remix-run/cloudflare');

// Message de fin
console.log(styles.title, '\n★═══════════════════════════════════════★');
console.log(styles.title, '      RÉPARATION COMPLÈTE TERMINÉE      ');
console.log(styles.title, '★═══════════════════════════════════════★\n');

console.log(styles.info, 'Pour démarrer l\'application, utilisez l\'une des commandes suivantes:');
console.log('1. node launch.cjs          # Méthode recommandée avec polyfills');
console.log('2. npm run dev              # Méthode standard');
console.log('\nSi des erreurs persistent, exécutez:');
console.log('node debug-loader.cjs       # Pour un diagnostic avancé');
