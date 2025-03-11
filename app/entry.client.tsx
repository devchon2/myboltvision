import { RemixBrowser } from '@remix-run/react';
import React, { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import '../module-patch.js';

// Ajouter un ErrorBoundary pour attraper les erreurs de rendu
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erreur dans le composant RemixBrowser:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          border: '1px solid #f5c6cb',
          borderRadius: '5px',
          backgroundColor: '#f8d7da', 
          color: '#721c24' 
        }}>
          <h2>Une erreur est survenue lors du chargement de l'application</h2>
          <p>Détails de l'erreur: {this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

startTransition(() => {
  try {
    hydrateRoot(
      document.getElementById('root')!, 
      <ErrorBoundary>
        <RemixBrowser />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Erreur lors de l'hydratation:", error);
  }
});
