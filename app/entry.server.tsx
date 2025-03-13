/**
 * Fichier entry.server.tsx simplifié
 * Configuration Remix standard sans dépendances spécifiques
 */
import type { EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

/**
 * Fonction de rendu côté serveur standard pour Remix
 * Version ultra simplifiée sans manipulation des loaders
 */
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  // Utilisation de la fonction standard de Remix sans manipulations supplémentaires
  try {
    const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

    responseHeaders.set('Content-Type', 'text/html');

    return new Response(`<!DOCTYPE html>${markup}`, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    console.error('[Entry Server] Erreur de rendu:', error);

    // Retourner une page minimale en cas d'erreur
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>MyBoltVision</title>
        </head>
        <body>
          <h1>Erreur de rendu</h1>
          <p>Une erreur s'est produite lors du rendu de l'application.</p>
          <script>window.location.reload();</script>
        </body>
      </html>`,
      {
        headers: new Headers({ 'Content-Type': 'text/html' }),
        status: 500,
      },
    );
  }
}
