/**
 * Serveur Express pour Remix (Alternative à Vite)
 * Version CommonJS pour compatibilité avec les modules
 */

import express from 'express';
import { createRequestHandler } from '@remix-run/express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Configuration des variables d'environnement minimales
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Créer l'application Express
const app = express();

// Servir les fichiers statiques
app.use(express.static('public'));

// Configuration spéciale pour les polyfills
app.use((req, res, next) => {
  // Polyfill global.module pour compatibilité
  if (typeof global !== 'undefined') {
    global.module = global.module || { exports: {} };
    global.__remix_loader_stack = global.__remix_loader_stack || [];
  }
  next();
});

// Handler principal pour toutes les routes
app.all(
  '*',
  createRequestHandler({
    build: path.resolve(__dirname, 'build'),
    mode: process.env.NODE_ENV
  })
);

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`\n★═══════════════════════════════════════★`);
  console.log(`       MYBOLTVISION - SERVEUR EXPRESS     `);
  console.log(`      ⚡ MODE STABLE CJS SANS VITE ⚡      `);
  console.log(`★═══════════════════════════════════════★\n`);
  console.log(`📍 Application disponible sur http://localhost:${port}`);
  console.log(`📍 Mode: ${process.env.NODE_ENV}`);
});
