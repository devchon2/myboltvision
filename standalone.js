/**
 * Script de démarrage en mode autonome pour MyBoltVision
 * Version ESM compatible avec "type": "module" dans package.json
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Support pour les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORT = process.env.PORT || 5177;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Initialiser global.module pour éviter l'erreur "module is not defined"
if (typeof global !== 'undefined' && !global.module) {
  global.module = { exports: {} };
  console.log('✅ Module global initialisé');
}

// Type MIME pour différentes extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

// Serveur HTTP
const server = http.createServer((req, res) => {
  // Journaliser chaque requête
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

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
            .status.warning {
              background-color: #854d0e;
              color: #fef08a;
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
            .version-info {
              position: fixed;
              bottom: 10px;
              right: 10px;
              font-size: 0.8rem;
              color: #666;
            }
            .button {
              display: inline-block;
              background-color: #2563eb;
              color: white;
              padding: 8px 16px;
              border-radius: 4px;
              text-decoration: none;
              margin-top: 20px;
              transition: background-color 0.2s;
              cursor: pointer;
            }
            .button:hover {
              background-color: #1d4ed8;
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
              <h3>Problèmes identifiés et solutions:</h3>
              <ol>
                <li>✅ Les polyfills pour <code>module</code> sont correctement configurés mais ne suffisent pas pour résoudre l'erreur</li>
                <li>✅ Correction du problème de module global dans la configuration Vite</li>
                <li>⚠️ <span class="status warning">Incompatibilité</span> détectée entre les versions de Vite (<code>5.4.14</code> vs <code>6.2.1</code>)</li>
                <li>🔍 Pour résoudre complètement le problème, une mise à jour des dépendances est nécessaire:</li>
              </ol>
              <code>pnpm update @remix-run/dev @remix-run/react @remix-run/server-runtime vite --latest</code>
            </div>
            
            <button class="button" onclick="document.location.reload()">Rafraîchir la page</button>
          </div>
          
          <div class="version-info">
            MyBoltVision v1.0.0 | Mode Standalone
          </div>
        </body>
      </html>
    `);
  } else if (req.url.startsWith('/')) {
    // Servir les fichiers statiques
    const filePath = path.join(PUBLIC_DIR, req.url);

    // Vérifier si le fichier existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Fichier non trouvé - vérifier s'il s'agit d'un favicon.svg ou logo.svg
        if (req.url === '/favicon.svg' || req.url === '/logo.svg') {
          const iconPath = path.join(__dirname, 'icons', path.basename(req.url));

          fs.readFile(iconPath, (err, data) => {
            if (err) {
              // Échec de lecture du fichier dans /icons
              res.writeHead(404);
              res.end('File not found');
              return;
            }

            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(data);
          });
        } else {
          // Autres fichiers introuvables - 404
          res.writeHead(404);
          res.end('File not found');
        }
        return;
      }

      // Fichier trouvé - déterminer le type MIME et servir le fichier
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Internal server error');
          return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });
  } else {
    // Autres requêtes - 404
    res.writeHead(404);
    res.end('Not found');
  }
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`
★═══════════════════════════════════════★
        MYBOLTVISION STANDALONE
        Mode de secours ESM activé
★═══════════════════════════════════════★

  Serveur démarré sur http://localhost:${PORT}

  Cette version contourne les problèmes d'intégration 
  Remix/Vite et utilise les modules ES natifs.

★═══════════════════════════════════════★
  `);
});
