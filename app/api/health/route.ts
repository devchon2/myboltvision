import { NextResponse } from 'next/server';

/**
 * GET /api/health
 * Route de surveillance pour vérifier l'état de l'application
 * Retourne des informations basiques sur l'état du serveur
 */
export async function GET() {
  // Renvoie une réponse 200 OK avec des informations de base sur la santé
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || 'dev',
  });
}
