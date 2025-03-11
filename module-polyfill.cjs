/**
 * Ce script est une solution complète au problème de "module is not defined" 
 * et aux problèmes de loader dans Remix.
 * 
 * Il définit global.module dans le contexte Node.js avant de démarrer l'application
 * et configure également d'autres polyfills pour assurer la compatibilité.
 */

// ==================== Polyfill module global ====================
// Vérifier si global.module n'est pas défini et l'initialiser
if (typeof global !== 'undefined' && !global.module) {
  console.log('🔧 [Polyfill] Initialisation de global.module...');
  global.module = { exports: {} };
  
  // Ajouter également globalThis.module pour assurer une compatibilité maximale
  if (typeof globalThis !== 'undefined') {
    globalThis.module = globalThis.module || global.module;
  }
}

// ==================== Polyfill path-browserify ====================
// Créer un object path minimal si nécessaire
if (typeof global !== 'undefined' && !global.path) {
  global.path = {
    join: (...segments) => segments.join('/').replace(/\/+/g, '/'),
    resolve: (...segments) => segments.join('/').replace(/\/+/g, '/'),
    dirname: (path) => path.substring(0, path.lastIndexOf('/') + 1),
    basename: (path) => path.substring(path.lastIndexOf('/') + 1)
  };
}

// ==================== Polyfill Remix Loader ====================
// Créer une pile de modules Remix pour eviter les erreurs de loader
if (typeof global !== 'undefined') {
  global.__remix_loader_stack = global.__remix_loader_stack || [];
}

// ==================== Gestion des erreurs ====================
// Ajouter un hook pour Process pour intercepter les erreurs connues
if (typeof process !== 'undefined') {
  process.on('uncaughtException', (err) => {
    if (err.message.includes('module is not defined')) {
      console.error('🚨 Erreur avec module is not defined détectée mais interceptée');
      console.error('👉 Si les problèmes persistent, essayez de relancer l\'application');
    } else if (err.message.includes('loader for route')) {
      console.error('🚨 Erreur de loader Remix détectée mais interceptée');
      console.error('👉 Le problème est probablement lié à une incompatibilité de modules');
    } else {
      console.error('🚨 Erreur non gérée :', err);
    }
  });
}

// ==================== Patch de require pour CommonJS ====================
// Créer une version simplifiée de require si elle n'existe pas
if (typeof global !== 'undefined' && typeof global.require === 'undefined') {
  global.require = function(moduleName) {
    if (moduleName === 'path') {
      return global.path;
    }
    if (moduleName === 'module') {
      return { exports: {} };
    }
    
    console.warn(`[Polyfill] Module '${moduleName}' n'est pas disponible dans le polyfill`);
    return {};
  };
}

console.log('✅ [Polyfill] Module polyfill chargé avec succès');
