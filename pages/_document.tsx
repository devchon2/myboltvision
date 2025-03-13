import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import React from 'react';

/**
 * Document personnalisé pour Next.js
 * Permet de configurer la structure HTML de base de l'application
 */
class MyDocument extends Document {
  // Méthode statique pour modifier le contexte initial du document
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Meta tags communes à toutes les pages */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#ffffff" />

          {/* Favicon et icônes d'application */}
          <link rel="icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/logo.svg" />

          {/* Polices et styles externes */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Manifeste PWA (Progressive Web App) */}
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          {/* Élément pour afficher un fallback lors du chargement des polices */}
          <div id="font-loader-observer" aria-hidden="true" />

          {/* Élément pour les portails React (modals, tooltips, etc.) */}
          <div id="portal-root" />

          {/* Contenu principal de l'application */}
          <Main />

          {/* Scripts Next.js */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
