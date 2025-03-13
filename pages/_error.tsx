import Error, { ErrorProps } from 'next/error';
import React from 'react';
import { createScopedLogger } from '../utils/logger';

const logger = createScopedLogger('_error');

interface CustomErrorProps extends ErrorProps {
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

/**
 * Page d'erreur personnalisée pour Next.js
 * Remplace le ErrorBoundary de Remix
 */
class ErrorPage extends React.Component<CustomErrorProps> {
  static getInitialProps = async (context: any): Promise<CustomErrorProps> => {
    const errorInitialProps = await Error.getInitialProps(context);
    const { res, err, asPath } = context;

    // Journalisation des erreurs pour le débogage
    if (err) {
      logger.error(`Erreur non gérée sur ${asPath}`, {
        status: errorInitialProps.statusCode,
        message: err.message,
        stack: err.stack,
      });
    }

    // Configuration du code d'état HTTP sur le serveur
    if (res && res.statusCode === 404) {
      return { statusCode: 404, hasGetInitialPropsRun: true };
    }

    return {
      ...errorInitialProps,
      hasGetInitialPropsRun: true,
      err,
    };
  };

  render() {
    const { statusCode, err } = this.props;
    const title = statusCode === 404 ? 'Page non trouvée' : 'Une erreur est survenue';

    // Style de base pour la page d'erreur
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '0 1rem',
        textAlign: 'center' as const,
        backgroundColor: '#f9fafb',
      },
      statusCode: {
        fontSize: '6rem',
        fontWeight: 'bold' as const,
        marginBottom: '0.5rem',
        color: '#3B82F6',
      },
      title: {
        fontSize: '2rem',
        fontWeight: 'bold' as const,
        marginBottom: '1rem',
        color: '#1F2937',
      },
      message: {
        fontSize: '1rem',
        marginBottom: '2rem',
        color: '#4B5563',
        maxWidth: '500px',
      },
      button: {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#3B82F6',
        color: 'white',
        borderRadius: '0.375rem',
        fontWeight: 'medium' as const,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      },
    };

    // Message d'erreur approprié selon le code de statut
    let errorMessage = 'Nous rencontrons un problème technique. Veuillez réessayer plus tard.';

    if (statusCode === 404) {
      errorMessage = "La page que vous recherchez n'existe pas ou a été déplacée.";
    } else if (statusCode === 403) {
      errorMessage = "Vous n'avez pas les permissions nécessaires pour accéder à cette page.";
    } else if (statusCode === 429) {
      errorMessage = 'Trop de requêtes. Veuillez réessayer dans quelques instants.';
    }

    return (
      <div style={styles.container}>
        <div style={styles.statusCode}>{statusCode || '500'}</div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.message}>{errorMessage}</p>

        {/* Affichage de détails techniques en développement */}
        {process.env.NODE_ENV !== 'production' && err && (
          <div style={{ textAlign: 'left', maxWidth: '800px', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Détails de l'erreur:</h2>
            <pre
              style={{
                backgroundColor: '#282c34',
                color: '#abb2bf',
                padding: '1rem',
                borderRadius: '0.375rem',
                overflow: 'auto',
                maxHeight: '300px',
              }}
            >
              {/* Utilisation sécurisée des propriétés pour éviter les problèmes de typage */}
              {err && 'message' in err ? (err as any).message : 'Erreur inconnue'}
              {err && 'stack' in err ? `\n\n${(err as any).stack}` : ''}
            </pre>
          </div>
        )}

        <button style={styles.button} onClick={() => (window.location.href = '/')}>
          Retour à l'accueil
        </button>
      </div>
    );
  }
}

export default ErrorPage;
