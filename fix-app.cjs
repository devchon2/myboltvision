/**
 * Solution complète pour résoudre les problèmes de l'application
 *
 * Ce script combine toutes les corrections nécessaires pour faire fonctionner
 * l'application malgré les conflits de versions et les problèmes avec Remix.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration pour les logs
const styles = {
  error: '\x1b[31m%s\x1b[0m', // Rouge
  success: '\x1b[32m%s\x1b[0m', // Vert
  warning: '\x1b[33m%s\x1b[0m', // Jaune
  info: '\x1b[36m%s\x1b[0m', // Cyan
  title: '\x1b[1m\x1b[35m%s\x1b[0m', // Magenta gras
};

// Afficher l'en-tête
console.log(styles.title, '\n★═══════════════════════════════════════★');
console.log(styles.title, '      SOLUTION COMPLÈTE MYBOLTVISION    ');
console.log(styles.title, '          ⚡ FIX AUTOMATIQUE ⚡         ');
console.log(styles.title, '★═══════════════════════════════════════★\n');

// Étape 1: Harmoniser les versions de Remix dans package.json
const harmonizeRemixVersions = () => {
  console.log(styles.info, '1️⃣ Harmonisation des versions Remix...');

  try {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = require(packageJsonPath);

    // Vérifier que les résolutions utilisent toutes la même version
    const targetVersion = '2.16.0'; // Version cible pour tous les packages Remix
    let needsUpdate = false;

    if (packageJson.resolutions) {
      [
        '@remix-run/react',
        '@remix-run/dev',
        '@remix-run/cloudflare',
        '@remix-run/server-runtime',
        '@remix-run/node',
      ].forEach((pkg) => {
        if (packageJson.resolutions[pkg] !== targetVersion) {
          console.log(
            `   ✓ Mise à jour de ${pkg}: ${packageJson.resolutions[pkg] || 'non défini'} -> ${targetVersion}`,
          );
          packageJson.resolutions[pkg] = targetVersion;
          needsUpdate = true;
        }
      });
    }

    // S'assurer que les dépendances devDependencies sont cohérentes
    if (packageJson.devDependencies && packageJson.devDependencies['@remix-run/react'] !== targetVersion) {
      packageJson.devDependencies['@remix-run/react'] = targetVersion;
      needsUpdate = true;
    }

    // S'assurer que les dependencies sont cohérentes
    if (packageJson.dependencies) {
      ['@remix-run/cloudflare', '@remix-run/dev', '@remix-run/server-runtime'].forEach((pkg) => {
        if (packageJson.dependencies[pkg] && packageJson.dependencies[pkg] !== targetVersion) {
          packageJson.dependencies[pkg] = targetVersion;
          needsUpdate = true;
        }
      });
    }

    if (needsUpdate) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(styles.success, '   ✓ Fichier package.json mis à jour');
    } else {
      console.log(styles.success, '   ✓ Versions déjà harmonisées');
    }

    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de l'harmonisation des versions: ${error.message}`);
    return false;
  }
};

// Étape 2: Nettoyer et réinstaller les modules Remix
const reinstallRemixModules = () => {
  console.log(styles.info, '2️⃣ Nettoyage et réinstallation des modules Remix...');

  try {
    // Supprimer tous les modules @remix-run
    console.log('   → Suppression des modules @remix-run...');
    execSync('npx rimraf node_modules/@remix-run', { stdio: 'inherit' });

    // Supprimer aussi les modules pnpm spécifiques à Remix
    console.log('   → Suppression des modules pnpm de @remix-run...');
    execSync('npx rimraf node_modules/.pnpm/@remix-run*', { stdio: 'inherit' });

    // Réinstaller les packages
    console.log('   → Réinstallation des dépendances...');
    execSync('npm install', { stdio: 'inherit' });

    console.log(styles.success, '   ✓ Modules Remix réinstallés avec succès');
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de la réinstallation: ${error.message}`);
    return false;
  }
};

// Étape 3: Patcher le code de Remix pour corriger l'erreur de handleDocumentRequestFunction
const patchRemixRuntime = () => {
  console.log(styles.info, '3️⃣ Correction du runtime Remix...');

  try {
    const serverRuntimePath = path.join(__dirname, 'node_modules', '@remix-run', 'server-runtime', 'dist', 'server.js');

    if (!fs.existsSync(serverRuntimePath)) {
      console.log(styles.warning, `   ⚠️ Fichier server.js non trouvé: ${serverRuntimePath}`);
      return false;
    }

    let content = fs.readFileSync(serverRuntimePath, 'utf8');
    let modified = false;

    // Correction 1: Problème avec handleDocumentRequestFunction
    if (content.includes('handleDocumentRequestFunction(')) {
      content = content.replace(
        /const handleDocumentRequest\s*=\s*async\s*function\s*handleDocumentRequest\([^)]*\)\s*{[^}]*handleDocumentRequestFunction\([^)]*\)/g,
        `const handleDocumentRequest = async function handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext) {
          // Fix direct: ne pas utiliser handleDocumentRequestFunction
          try {
            const markup = await renderToHTML(request, entryContext, loadContext);
            return new Response(markup, {
              status: responseStatusCode,
              headers: responseHeaders
            });
          } catch (error) {
            console.error("Error in handleDocumentRequest:", error);
            return new Response("Server Error", { status: 500 });
          }`,
      );
      modified = true;
    }

    // Correction 2: Améliorer la gestion d'erreurs
    if (!content.includes('// Patched error handling')) {
      content = content.replace(
        /export async function requestHandler\([^{]*{/,
        `export async function requestHandler(request, loadContext = {}, routeId) {
          try { // Patched error handling`,
      );

      content = content.replace(
        /return handleDocumentRequest\([^}]*}/,
        `return handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext);
          } catch (error) {
            console.error("Remix runtime error:", error);
            return new Response("Server Error", { status: 500 });
          }
        }`,
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(serverRuntimePath, content);
      console.log(styles.success, '   ✓ Fichier server.js patché avec succès');
    } else {
      console.log(styles.info, '   ℹ Aucune modification nécessaire dans server.js');
    }

    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors du patching: ${error.message}`);
    return false;
  }
};

// Étape 4: Créer ou mettre à jour le script de démarrage amélioré
const updateStartScript = () => {
  console.log(styles.info, '4️⃣ Mise à jour du script de démarrage...');

  try {
    // Mettre à jour le script package.json pour utiliser notre script de démarrage
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = require(packageJsonPath);

    if (!packageJson.scripts.devSafe) {
      packageJson.scripts.devSafe = 'node start-dev.cjs';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(styles.success, '   ✓ Script "devSafe" ajouté à package.json');
    } else {
      console.log(styles.info, '   ℹ Script "devSafe" déjà présent dans package.json');
    }

    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de la mise à jour du script: ${error.message}`);
    return false;
  }
};

// Exécuter les étapes
const results = {
  harmonizeVersions: harmonizeRemixVersions(),
  reinstallModules: reinstallRemixModules(),
  patchRuntime: patchRemixRuntime(),
  updateStartScript: updateStartScript(),
};

// Afficher le résumé
console.log(styles.title, '\n★═════════════ RÉSULTATS ═════════════★');

let allSuccess = true;
for (const [step, success] of Object.entries(results)) {
  console.log(`${step}: ${success ? styles.success : styles.error}`, success ? '✅ OK' : '❌ ÉCHEC');
  if (!success) allSuccess = false;
}

if (allSuccess) {
  console.log(styles.title, '\n★═════════════ SUCCÈS ═════════════★');
  console.log(styles.success, '✅ Toutes les corrections ont été appliquées avec succès!');
  console.log(styles.info, "🚀 Pour démarrer l'application, utilisez: npm run devSafe");
} else {
  console.log(styles.title, '\n★═════════════ ATTENTION ═════════════★');
  console.log(styles.warning, "⚠️ Certaines corrections n'ont pas pu être appliquées.");
  console.log(styles.info, '💡 Essayez de résoudre les problèmes manuellement ou relancez ce script.');
}
