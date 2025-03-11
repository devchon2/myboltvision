/**
 * Serveur Express standard pour Remix
 * Alternative au serveur Vite pour éviter les problèmes de compatibilité
 */

import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { createRequestHandler as createRequestHandlerShim } from './server-runtime-shim.js';
const app = express();

// Configuration des assets statiques
app.use(express.static('public'));

// Gestionnaire Remix standard
app.all('*', createRequestHandlerShim({
  build: require('./build'),
  mode: process.env.NODE_ENV
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`\n★═══════════════════════════════════════★`);
  console.log(`       MYBOLTVISION - SERVEUR EXPRESS     `);
  console.log(`          ⚡ CONFIGURATION STABLE ⚡       `);
  console.log(`★═══════════════════════════════════════★\n`);
  console.log(`📍 Application disponible sur http://localhost:${port}`);
});
