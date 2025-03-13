'use client';
import { NextResponse, type NextRequest } from 'next/server';
import { providerBaseUrlEnvKeys } from '../../../utils/constants';

/**
 * GET /api/check-env-key
 * Vérifie si la clé d'API d'un fournisseur est définie dans les variables d'environnement
 * @param request - Requête entrante avec query parameter 'provider'
 * @returns {isSet: boolean} - Indique si la clé d'API est définie
 */
export async function GET(request: NextRequest) {
  // Récupérer le paramètre provider de l'URL
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider')?.toLowerCase();
  console.debug('[ENV Check] Provider:', provider);

  // Vérifier que le provider existe et a une clé API configurée
  if (!provider || !providerBaseUrlEnvKeys[provider]?.apiTokenKey) {
    return NextResponse.json({ isSet: false });
  }

  // Récupérer le nom de la variable d'environnement
  const envVarName = providerBaseUrlEnvKeys[provider].apiTokenKey;

  // Vérifier si la variable d'environnement est définie
  const isSet = !!process.env[envVarName as string];

  // Retourner le résultat
  return NextResponse.json({ isSet });
}
