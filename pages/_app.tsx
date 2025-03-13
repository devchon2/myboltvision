import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { createScopedLogger } from '../utils/logger';

const logger = createScopedLogger('_app');

/**
 * Composant principal Next.js qui enveloppe toutes les pages
 * Remplace app/root.tsx de Remix
 */
export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Log de navigation pour le débogage
    logger.debug('Route change', { path: router.pathname });

    // Exemple de mesure de performance
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigationTiming) {
      logger.debug('Navigation timing', {
        loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
        domReadyTime: navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime,
      });
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BoltVision</title>
        <meta name="description" content="BoltVision - Application de développement intelligent" />
      </Head>

      {/* 
        Dans Next.js, Layout est géré au niveau des composants de page plutôt qu'au niveau root.
        Nous avons intégré le Layout directement dans index.tsx pour cette migration.
      */}
      <Component {...pageProps} />
    </>
  );
}
