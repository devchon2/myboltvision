/* eslint-disable */
// @ts-nocheck
/**
 * Ce fichier d'amorçage force le chargement du loader global
 * pour résoudre les problèmes de "loader not found"
 */

// Polyfills nécessaires
if (typeof global !== 'undefined') {
  global.module = global.module || { exports: {} };
  global.__remix_loader_stack = global.__remix_loader_stack || [];
}

import { json } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { createHead } from 'remix-island';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Forçage du loader
const ROOT_LOADER_ID = 'root';

// Injecter le loader manuellement dans le registre global de Remix
if (!global.__remix_loader_registry) {
  global.__remix_loader_registry = new Map();
}

// Définition d'un loader par défaut pour root
const defaultRootLoader = async () => {
  console.log("[Bootstrap] Loader root forcé exécuté");
  return json({ _bootstrapped: true });
};

// Enregistrer le loader
global.__remix_loader_registry.set(ROOT_LOADER_ID, defaultRootLoader);

// Exporter un handler de fallback
export async function handleFallbackRequest(request, responseStatusCode, responseHeaders, remixContext) {
  // Vérifier si handleRequest existe dans entry.server.tsx
  const entryServer = await import('./entry.server');
  
  if (typeof entryServer.default === 'function') {
    return entryServer.default(request, responseStatusCode, responseHeaders, remixContext);
  }
  
  // Fallback si handleRequest n'est pas disponible
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MyBoltVision</title>
      </head>
      <body>
        <div id="app">
          ${markup}
        </div>
      </body>
    </html>`, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

export default {
  enforceLoader: defaultRootLoader,
  handleFallbackRequest
};
