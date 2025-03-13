import { NextResponse, type NextRequest } from 'next/server';

/**
 * Gère la requête de proxy Git
 * @param request La requête entrante
 * @param path Le chemin à proxier
 */
async function handleProxyRequest(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const pathSegments = params.path;

    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json({ error: 'Invalid proxy URL format' }, { status: 400 });
    }

    // Reconstruire le chemin complet
    const path = pathSegments.join('/');
    const url = new URL(request.url);

    // Reconstruire l'URL cible
    const targetURL = `https://${path}${url.search}`;

    // Créer un nouvel objet Headers à partir des headers de requête
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // On ne copie pas le header host ici, il sera défini ci-dessous
      if (key.toLowerCase() !== 'host') {
        headers.set(key, value);
      }
    });

    // Définir le header host avec le host cible
    headers.set('host', new URL(targetURL).host);

    // Transférer la requête à l'URL cible
    const response = await fetch(targetURL, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
    });

    // Créer les headers CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    // Gérer les requêtes preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
        status: 204,
      });
    }

    // Transférer la réponse avec les headers CORS
    const responseHeaders = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      responseHeaders.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Git proxy error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}

/**
 * GET /api/git-proxy/[...path]
 * Proxy pour toutes les requêtes GET
 */
export async function GET(request: NextRequest, context: { params: { path: string[] } }) {
  return handleProxyRequest(request, context);
}

/**
 * POST /api/git-proxy/[...path]
 * Proxy pour toutes les requêtes POST
 */
export async function POST(request: NextRequest, context: { params: { path: string[] } }) {
  return handleProxyRequest(request, context);
}

/**
 * PUT /api/git-proxy/[...path]
 * Proxy pour toutes les requêtes PUT
 */
export async function PUT(request: NextRequest, context: { params: { path: string[] } }) {
  return handleProxyRequest(request, context);
}

/**
 * DELETE /api/git-proxy/[...path]
 * Proxy pour toutes les requêtes DELETE
 */
export async function DELETE(request: NextRequest, context: { params: { path: string[] } }) {
  return handleProxyRequest(request, context);
}

/**
 * OPTIONS /api/git-proxy/[...path]
 * Proxy pour les requêtes OPTIONS (CORS preflight)
 */
export async function OPTIONS(request: NextRequest, context: { params: { path: string[] } }) {
  return handleProxyRequest(request, context);
}
