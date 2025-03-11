/**
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
    join: (...segments) => segments.join('/').replace(/\/+/g, '/'),
    resolve: (...segments) => segments.join('/').replace(/\/+/g, '/'),
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
