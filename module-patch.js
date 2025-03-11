/**
 * Ce script corrige les problèmes de compatibilité entre les modules CommonJS 
 * et les modules ES dans un environnement Vite/Remix.
 * 
 * Il résout le problème "module is not defined" qui apparaît avec path-browserify 
 * et d'autres modules CommonJS, ainsi que les problèmes de loader dans Remix.
 */

// Définir module.exports si non défini (solution globale)
if (typeof globalThis !== 'undefined') {
  if (!globalThis.module) {
    globalThis.module = { exports: {} };
    console.log('✓ Global module polyfill installé');
  }
}

if (typeof window !== 'undefined') {
  if (!window.module) {
    window.module = { exports: {} };
    console.log('✓ Window module polyfill installé');
  }
}

if (typeof global !== 'undefined') {
  if (!global.module) {
    global.module = { exports: {} };
    console.log('✓ Node global module polyfill installé');
  }
}

// Augmenter la pile de modules pour Remix (Fix pour les erreurs de loader)
export function patchRemixLoader() {
  try {
    // S'assurer que la pile des modules est correctement initialisée
    if (typeof window !== 'undefined' && window.__remix_loader_stack === undefined) {
      window.__remix_loader_stack = [];
    }
    console.log('✓ Patch Remix loader appliqué');
  } catch (error) {
    console.error('❌ Erreur lors du patch Remix loader:', error);
  }
}

// Wrapper pour path-browserify et autres modules CommonJS
export function patchPathBrowserify() {
  try {
    const originalRequire = window.require;
    
    // Créer un faux require avec support amélioré pour divers modules
    window.require = function(moduleName) {
      // Support path-browserify
      if (moduleName === 'path') {
        return window.path || { 
          join: (...args) => args.join('/').replace(/\/+/g, '/'),
          resolve: (...args) => args.join('/').replace(/\/+/g, '/'),
          dirname: (path) => path.replace(/\/[^/]*$/, ''),
          basename: (path) => path.replace(/.*\//, '')
        };
      }
      
      // Support pour process (souvent utilisé avec les modules CommonJS)
      if (moduleName === 'process') {
        return window.process || { 
          env: { NODE_ENV: 'development' },
          cwd: () => '/'
        };
      }
      
      // Support pour buffer
      if (moduleName === 'buffer') {
        return window.Buffer || { 
          from: (data) => ({ data }),
          isBuffer: () => false
        };
      }
      
      if (originalRequire) {
        return originalRequire(moduleName);
      }
      
      console.warn(`Module '${moduleName}' non trouvé, utilisation d'un stub vide`);
      return {};
    };
    
    console.log('✓ Patch pour modules CommonJS appliqué avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'application du patch CommonJS:', error);
  }
}

// Application des patches
patchPathBrowserify();
patchRemixLoader();

// Export pour permettre l'importation dans d'autres fichiers
export default {
  patchPathBrowserify,
  patchRemixLoader
};
