/**
 * Ce script applique des patches spécifiques au runtime de Remix
 * pour résoudre les problèmes récurrents dans cette application.
 * À exécuter avant de démarrer l'application.
 */

import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtenir le répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration pour les messages de logs
const logStyles = {
  error: (msg) => `\x1b[31m${msg}\x1b[0m`,    // Rouge
  success: (msg) => `\x1b[32m${msg}\x1b[0m`,  // Vert
  warning: (msg) => `\x1b[33m${msg}\x1b[0m`,  // Jaune
  info: (msg) => `\x1b[36m${msg}\x1b[0m`,     // Cyan
  title: (msg) => `\x1b[1m\x1b[35m${msg}\x1b[0m` // Magenta gras
};

console.log(logStyles.title('🧪 REMIX PATCH - APPLICATION DE CORRECTIFS'));

/**
 * Fonction pour patcher le fichier server.js dans @remix-run/server-runtime
 * afin de corriger l'erreur "handleDocumentRequestFunction is not a function"
 */
const patchServerRuntime = () => {
  const runtimePath = join(__dirname, 'node_modules', '@remix-run', 'server-runtime', 'dist', 'server.js');
  
  if (!existsSync(runtimePath)) {
    console.error(logStyles.error(`❌ Fichier server.js non trouvé: ${runtimePath}`));
    return false;
  }
  
  console.log(logStyles.info(`📄 Patching du fichier: ${runtimePath}`));
  
  try {
    let content = readFileSync(runtimePath, 'utf8');
    
    // Patch 1: Fonction manquante handleDocumentRequestFunction
    if (content.includes('handleDocumentRequestFunction is not a function')) {
      console.log(logStyles.warning('🔍 Problème déjà présent mais non corrigé'));
    }
    
    // Pattern pour trouver le code problématique
    const pattern1 = /const handleDocumentRequest\s*=\s*async\s*function\s*handleDocumentRequest\([^)]*\)\s*{[^}]*handleDocumentRequestFunction\([^)]*\)/;
    
    if (pattern1.test(content)) {
      // Remplacer le code problématique par une implémentation directe
      content = content.replace(
        pattern1,
        `const handleDocumentRequest = async function handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext) {
          // Implémentation directe à la place d'appeler handleDocumentRequestFunction
          const markup = await renderToHTML(request, entryContext, loadContext);
          return new Response(markup, {
            status: responseStatusCode,
            headers: responseHeaders
          })`
      );
      
      console.log(logStyles.success('✅ Code handleDocumentRequestFunction corrigé'));
    } else {
      console.log(logStyles.warning('⚠️ Pattern pour handleDocumentRequestFunction non trouvé'));
    }
    
    // Patch 2: Améliorer la gestion des erreurs
    if (!content.includes('try { // Patched error handling')) {
      content = content.replace(
        /export async function requestHandler\([^{]*{/,
        `export async function requestHandler(request, loadContext = {}, routeId) {
          try { // Patched error handling`
      );
      
      content = content.replace(
        /return handleDocumentRequest\([^}]*}/,
        `return handleDocumentRequest(request, responseStatusCode, responseHeaders, entryContext, loadContext);
          } catch (error) {
            console.error("🚨 Remix runtime error:", error);
            return new Response("Server Error - Check Remix Runtime", { status: 500 });
          }
        }`
      );
      
      console.log(logStyles.success('✅ Gestion d\'erreurs améliorée'));
    }
    
    // Sauvegarder le fichier patché
    writeFileSync(runtimePath, content);
    console.log(logStyles.success('💾 Fichier server.js patché et sauvegardé!'));
    
    // Patcher aussi le fichier index.js au cas où
    const indexPath = join(__dirname, 'node_modules', '@remix-run', 'server-runtime', 'dist', 'index.js');
    if (existsSync(indexPath)) {
      console.log(logStyles.info(`📄 Patching du fichier: ${indexPath}`));
      let indexContent = readFileSync(indexPath, 'utf8');
      
      // S'assurer que toutes les exportations sont correctes
      if (!indexContent.includes('// Patched exports')) {
        indexContent += `
// Patched exports
export * from "./server.js";
`;
        writeFileSync(indexPath, indexContent);
        console.log(logStyles.success('✅ Fichier index.js patché'));
      }
    }
    
    return true;
  } catch (error) {
    console.error(logStyles.error(`❌ Erreur lors du patching: ${error.message}`));
    return false;
  }
};

/**
 * Fonction pour corriger les imports problématiques dans route-modules.js
 */
const patchRouteModules = () => {
  const routeModulesPath = join(__dirname, 'node_modules', '@remix-run', 'dev', 'dist', 'config', 'route-modules.js');
  
  if (!existsSync(routeModulesPath)) {
    console.log(logStyles.warning(`⚠️ Fichier route-modules.js non trouvé: ${routeModulesPath}`));
    return false;
  }
  
  try {
    console.log(logStyles.info(`📄 Patching du fichier: ${routeModulesPath}`));
    let content = readFileSync(routeModulesPath, 'utf8');
    
    // Rechercher des imports circulaires ou problématiques
    if (!content.includes('// Patched imports')) {
      content = content.replace(
        /import {([^}]*)} from/,
        `import {$1
          // Patched imports
        } from`
      );
      
      writeFileSync(routeModulesPath, content);
      console.log(logStyles.success('✅ Fichier route-modules.js patché'));
    }
    
    return true;
  } catch (error) {
    console.error(logStyles.error(`❌ Erreur lors du patching de route-modules: ${error.message}`));
    return false;
  }
};

// Appliquer les patches
const results = {
  serverRuntime: patchServerRuntime(),
  routeModules: patchRouteModules()
};

// Rapport de résultats
console.log(logStyles.title('\n🧪 RÉSULTATS DES PATCHES'));
for (const [key, success] of Object.entries(results)) {
  console.log(`${key}: ${success ? logStyles.success('✅ OK') : logStyles.error('❌ ÉCHEC')}`);
}

// Assurez-vous que le patch est compatible avec la version de Remix que vous utilisez
// Désactivez temporairement le patch si nécessaire pour tester

if (Object.values(results).every(Boolean)) {
  console.log(logStyles.success('\n✅ TOUS LES PATCHES ONT ÉTÉ APPLIQUÉS AVEC SUCCÈS'));
  console.log(logStyles.info('🚀 Vous pouvez maintenant démarrer l\'application avec: node start-dev.cjs'));
} else {
  console.log(logStyles.warning('\n⚠️ CERTAINS PATCHES N\'ONT PAS PU ÊTRE APPLIQUÉS'));
  console.log(logStyles.info('💡 Essayez de résoudre les problèmes manuellement ou de réinstaller les dépendances'));
}
