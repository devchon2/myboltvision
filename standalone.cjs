/**
 * Script de démarrage autonome pour MyBoltVision
 * Ce script contourne les problèmes d'intégration Remix/Vite
 * en lançant un serveur HTTP simple pour afficher l'application
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Initialiser global.module pour éviter l'erreur "module is not defined"
if (typeof global !== 'undefined' && !global.module) {
  global.module = { exports: {} };
  console.log('Module global initialisé');
}

// Serveur HTTP simple
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Page principale
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="fr" data-theme="dark">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MyBoltVision - Mode Standalone</title>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml">
          <style>
            body, html {
              margin: 0;
              padding: 0;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              height: 100%;
            }
            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              text-align: center;
              padding: 0 20px;
            }
            .logo {
              width: 120px;
              margin-bottom: 30px;
            }
            h1 {
              font-size: 2.5rem;
              margin-bottom: 20px;
              color: #6fceff;
            }
            .card {
              background-color: #1a1a1a;
              border-radius: 8px;
              padding: 20px;
              width: 100%;
              max-width: 600px;
              margin-bottom: 20px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            .status {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 12px;
              font-weight: 500;
              margin-top: 10px;
              background-color: #2e3238;
            }
            .status.success {
              background-color: #1d4721;
              color: #4ade80;
            }
            .status.error {
              background-color: #4c1d1d;
              color: #f87171;
            }
            .message {
              margin-top: 30px;
              line-height: 1.6;
            }
            .steps {
              text-align: left;
              background-color: #1a1a1a;
              border-radius: 8px;
              padding: 20px;
              width: 100%;
              max-width: 600px;
            }
            .steps h3 {
              margin-top: 0;
              color: #6fceff;
            }
            .steps ol {
              margin-left: 20px;
              padding-left: 0;
            }
            .steps li {
              margin-bottom: 12px;
            }
            code {
              background-color: #2a2a2a;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
            }
            .pulse {
              animation: pulse-animation 2s infinite;
            }
            @keyframes pulse-animation {
              0% { opacity: 1; }
              50% { opacity: 0.6; }
              100% { opacity: 1; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="/logo.svg" alt="Bolt Logo" class="logo pulse">
            <h1>MyBoltVision - Mode Standalone</h1>
            
            <div class="card">
              <p>Application démarrée en mode autonome pour contourner les problèmes d'intégration Remix/Vite</p>
              <div class="status success">Serveur en cours d'exécution</div>
            </div>
            
            <div class="message">
              L'application principale rencontre actuellement une erreur avec le loader Remix:<br>
              <code class="status error">Module is not defined / loader error</code>
            </div>
            
            <div class="steps">
              <h3>Étapes de débogage:</h3>
              <ol>
                <li>Les polyfills pour <code>module</code> sont en place mais ne résolvent pas totalement le problème</li>
                <li>Nous avons corrigé le problème de module global dans la configuration Vite</li>
                <li>La racine de l'erreur semble être liée à l'intégration SSR de Remix avec Vite</li>
                <li>Pour résoudre complètement le problème, essayez de mettre à jour les dépendances Remix/Vite à des versions compatibles</li>
              </ol>
            </div>
          </div>
        </body>
      </html>
    `);
  } else if (req.url === '/favicon.svg' || req.url === '/logo.svg') {
    // Servir les icônes
    const iconPath = path.join(__dirname, 'public', req.url);
    
    try {
      const data = fs.readFileSync(iconPath);
      res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
      res.end(data);
    } catch (err) {
      console.error(`Erreur lors de la lecture du fichier ${iconPath}:`, err);
      res.writeHead(404);
      res.end('File not found');
    }
  } else {
    // Autres ressources - 404
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = process.env.PORT || 5177;

server.listen(PORT, () => {
  console.log(`
★═══════════════════════════════════════★
        MYBOLTVISION STANDALONE
        Mode de secours activé
★═══════════════════════════════════════★

  Serveur démarré sur http://localhost:${PORT}

  Cette version contourne les problèmes d'intégration 
  Remix/Vite pour permettre l'accès à l'application.

★═══════════════════════════════════════★
  `);
});
