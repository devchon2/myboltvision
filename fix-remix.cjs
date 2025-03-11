/**
 * Solution robuste pour résoudre les problèmes de Remix
 * sans supprimer les modules existants
 * 
 * Ce script corrige la configuration de l'application
 * et effectue des patches ciblés pour éviter les erreurs
 * de "handleDocumentRequestFunction is not a function"
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

// Afficher l'en-tête
console.log(styles.title, '\n★═══════════════════════════════════════★');
console.log(styles.title, '         SOLUTION REMIX STABLE          ');
console.log(styles.title, '          ⚡ CORRECTIF SÛRE ⚡          ');
console.log(styles.title, '★═══════════════════════════════════════★\n');

// Fonction pour exécuter les commandes avec gestion d'erreur
const execCommand = (cmd, options = {}) => {
  try {
    return execSync(cmd, { encoding: 'utf8', ...options });
  } catch (error) {
    console.log(styles.error, `Erreur lors de l'exécution de la commande: ${cmd}`);
    console.log(styles.error, error.message);
    return null;
  }
};

// 1. Vérifier les scripts de démarrage et les mettre à jour
const updateScripts = () => {
  console.log(styles.info, '1️⃣ Mise à jour des scripts de démarrage...');
  
  try {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = require(packageJsonPath);
    
    let modified = false;
    
    // Ajouter un script de démarrage sécurisé
    if (!packageJson.scripts.devSafe) {
      packageJson.scripts.devSafe = 'node start-dev.cjs';
      modified = true;
      console.log('   ✓ Script "devSafe" ajouté');
    }
    
    // Ajouter un script de préparation
    if (!packageJson.scripts.prepare) {
      packageJson.scripts.prepare = 'node pre-start.cjs && node module-polyfill.cjs';
      modified = true;
      console.log('   ✓ Script "prepare" ajouté');
    }
    
    // Sauvegarder les modifications si nécessaire
    if (modified) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(styles.success, '   ✓ Fichier package.json mis à jour');
    } else {
      console.log('   ℹ Aucune modification nécessaire pour les scripts');
    }
    
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de la mise à jour des scripts: ${error.message}`);
    return false;
  }
};

// 2. Vérifier et créer le module-polyfill.js (pour le code client)
const createClientPolyfill = () => {
  console.log(styles.info, '2️⃣ Création du polyfill pour le client...');
  
  try {
    const polyfillPath = path.join(__dirname, 'remix-client-polyfill.js');
    const polyfillContent = `/**
 * Polyfill client-side pour les fonctionnalités manquantes
 * dans l'environnement du navigateur
 */

// Définir module si non défini
if (typeof window !== 'undefined' && !window.module) {
  window.module = { exports: {} };
  console.log('✓ Window module polyfill installé');
}

// Polyfill pour Remix loader
if (typeof window !== 'undefined' && !window.__remix_loader_stack) {
  window.__remix_loader_stack = [];
  console.log('✓ Window __remix_loader_stack polyfill installé');
}

// Polyfill minimal pour path (utilisé par certains modules)
if (typeof window !== 'undefined' && !window.path) {
  window.path = {
    join: (...segments) => segments.join('/').replace(/\\/+/g, '/'),
    resolve: (...segments) => segments.join('/').replace(/\\/+/g, '/'),
    dirname: (p) => p.substring(0, p.lastIndexOf('/') + 1),
    basename: (p) => p.substring(p.lastIndexOf('/') + 1)
  };
  console.log('✓ Window path polyfill installé');
}

// Exporter tout pour pouvoir l'utiliser comme module
export default {
  module: window.module,
  __remix_loader_stack: window.__remix_loader_stack,
  path: window.path
};
`;
    
    // Écrire le fichier s'il n'existe pas
    if (!fs.existsSync(polyfillPath)) {
      fs.writeFileSync(polyfillPath, polyfillContent);
      console.log(styles.success, '   ✓ Fichier remix-client-polyfill.js créé');
    } else {
      console.log('   ℹ Le fichier remix-client-polyfill.js existe déjà');
    }
    
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de la création du polyfill client: ${error.message}`);
    return false;
  }
};

// 3. Créer un script de lancement direct
const createDirectLaunchScript = () => {
  console.log(styles.info, '3️⃣ Création d\'un script de lancement direct...');
  
  try {
    const launchPath = path.join(__dirname, 'launch.cjs');
    const launchContent = `/**
 * Script de lancement direct qui contourne les problèmes de l'application
 */

const { execSync, spawn } = require('child_process');
const path = require('path');

// Définir les polyfills globaux nécessaires
global.module = global.module || { exports: {} };
global.__remix_loader_stack = global.__remix_loader_stack || [];

console.log('\\n★═══════════════════════════════════════★');
console.log('       MYBOLTVISION - LANCEMENT DIRECT    ');
console.log('          ⚡️  Démarrage  ⚡️         ');
console.log('★═══════════════════════════════════════★\\n');

// Exécuter la séquence de démarrage
console.log('1. Initialisation de l\\'environnement...');
execSync('node pre-start.cjs', { stdio: 'inherit' });

console.log('\\n2. Application des polyfills...');
execSync('node module-polyfill.cjs', { stdio: 'inherit' });

console.log('\\n3. Démarrage du serveur de développement...');
// Lancer Vite directement
const viteProcess = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

// Gérer la sortie propre
process.on('SIGINT', () => {
  console.log('\\n👋 Arrêt de l\\'application...');
  viteProcess.kill();
  process.exit(0);
});

viteProcess.on('exit', (code) => {
  console.log(\`\\n🛑 Le serveur s'est arrêté avec le code: \${code}\`);
  process.exit(code);
});
`;
    
    // Écrire le fichier s'il n'existe pas
    if (!fs.existsSync(launchPath)) {
      fs.writeFileSync(launchPath, launchContent);
      console.log(styles.success, '   ✓ Fichier launch.cjs créé');
    } else {
      console.log('   ℹ Le fichier launch.cjs existe déjà');
    }
    
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de la création du script de lancement: ${error.message}`);
    return false;
  }
};

// 4. Modifier vite.config.ts pour ajouter un plugin de correction
const updateViteConfig = () => {
  console.log(styles.info, '4️⃣ Mise à jour de la configuration Vite...');
  
  try {
    const viteConfigPath = path.join(__dirname, 'vite.config.ts');
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Vérifier si notre plugin de correction est déjà présent
    if (!viteConfig.includes('handleDocumentRequestPatchPlugin')) {
      // Chercher la section plugins
      const pluginsIndex = viteConfig.indexOf('plugins: [');
      
      if (pluginsIndex !== -1) {
        // Déterminer l'indentation
        const indent = '  '; // Indentation par défaut
        
        // Plugin de correction pour handleDocumentRequest
        const patchPlugin = `
  // Patch pour handleDocumentRequestFunction
  {
    name: 'handleDocumentRequestPatchPlugin',
    enforce: 'pre',
    apply: 'serve',
    transform(code, id) {
      // Patcher uniquement le fichier server.js dans @remix-run/server-runtime
      if (id.includes('@remix-run/server-runtime') && id.endsWith('server.js')) {
        console.log('📄 Patching server.js dans @remix-run/server-runtime');
        
        // Corriger les appels problématiques
        return code
          .replace(
            /const handleDocumentRequest\\s*=\\s*async\\s*function\\s*handleDocumentRequest\\([^)]*\\)\\s*{[^}]*handleDocumentRequestFunction\\([^)]*\\)/g,
            \`const handleDocumentRequest = async function handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext) {
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
              }\`
          )
          .replace(
            /export async function requestHandler\\([^{]*{/,
            \`export async function requestHandler(request, loadContext = {}, routeId) {
              try { // Patched error handling\`
          )
          .replace(
            /return handleDocumentRequest\\([^}]*}/,
            \`return handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext);
              } catch (error) {
                console.error("Remix runtime error:", error);
                return new Response("Server Error", { status: 500 });
              }
            }\`
          );
      }
      return null;
    }
  },`;
        
        // Insérer notre plugin au début de la liste des plugins
        viteConfig = viteConfig.slice(0, pluginsIndex + 10) + patchPlugin + viteConfig.slice(pluginsIndex + 10);
        
        // Sauvegarder le fichier modifié
        fs.writeFileSync(viteConfigPath, viteConfig);
        console.log(styles.success, '   ✓ Plugin de correction ajouté à vite.config.ts');
      } else {
        console.log(styles.warning, '   ⚠️ Section plugins non trouvée dans vite.config.ts');
      }
    } else {
      console.log('   ℹ Le plugin de correction est déjà présent dans vite.config.ts');
    }
    
    return true;
  } catch (error) {
    console.log(styles.error, `   ❌ Erreur lors de la mise à jour de vite.config.ts: ${error.message}`);
    return false;
  }
};

// Exécuter les étapes
const results = {
  updateScripts: updateScripts(),
  createClientPolyfill: createClientPolyfill(),
  createDirectLaunchScript: createDirectLaunchScript(),
  updateViteConfig: updateViteConfig()
};

// Afficher le résumé
console.log(styles.title, '\n★═════════════ RÉSULTATS ═════════════★');

let allSuccess = true;
for (const [step, success] of Object.entries(results)) {
  console.log(`${step}: ${success ? styles.success : styles.error}`, success ? '✅ OK' : '❌ ÉCHEC');
  if (!success) allSuccess = false;
}

// Instructions finales
console.log(styles.title, '\n★═════════════ PROCHAINES ÉTAPES ═════════════★');
console.log(styles.info, '1. Démarrez l\'application avec l\'une des commandes suivantes:');
console.log('   • node launch.cjs (méthode recommandée)');
console.log('   • npm run devSafe');
console.log(styles.info, '2. Si des erreurs persistent, essayez de lancer:');
console.log('   • node debug-loader.cjs');
console.log(styles.info, '3. Si le problème persiste, utilisez une approche alternative:');
console.log('   • Remplacez vos versions de @remix-run par celles d\'une version antérieure');
console.log('   • Essayez d\'utiliser pnpm au lieu de npm pour gérer les dépendances');
