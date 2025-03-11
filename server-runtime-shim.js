// Ce fichier est un shim pour éviter les problèmes d'importation ESM avec @remix-run/server-runtime
// Il utilise dynamic import pour charger les modules ESM
export const createRequestHandler = async (...args) => {
  try {
    const serverRuntime = await import('@remix-run/server-runtime');
    return serverRuntime.createRequestHandler(...args);
  } catch (error) {
    console.error('Error importing server-runtime:', error);
    // Fallback minimal
    return (req) => new Response('Server error', { status: 500 });
  }
};

// Exporter d'autres fonctions nécessaires
export const json = (data, init = {}) => {
  return new Response(JSON.stringify(data), {
    status: init.status || 200,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
    },
  });
};

// Fonctions utilitaires minimales pour éviter les erreurs d'importation
export const isRedirectResponse = (response) => {
  return response instanceof Response && 
    response.status >= 300 && response.status < 400;
};
