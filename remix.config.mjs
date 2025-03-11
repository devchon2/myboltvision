/** @type {import('@remix-run/dev').AppConfig} */
export default {
  // Fichiers à ignorer dans la découverte automatique des routes
  ignoredRouteFiles: ["**/.*", "**/*.json.exclude"],

  // Utiliser la convention de découverte automatique des routes
  future: {
    v2_meta: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_lazyRouteDiscovery: true,
    v3_singleFetch: true
  },

  // Configuration ESM
  serverModuleFormat: "esm",
  serverPlatform: "node",
  // Ajout de serverMainFields pour forcer l'utilisation du champ "module" si présent
  serverMainFields: ["module", "main"],

  // Forcer Remix à transpiler toutes les dépendances
  serverDependenciesToBundle: "all",

  publicPath: "/build/",
  serverBuildPath: "build/index.mjs",
  assetsBuildDirectory: "public/build",
  serverBuildDirectory: "build",
  manifest: true
};
