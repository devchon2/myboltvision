import { execSync } from 'node:child_process';
import { NextResponse } from 'next/server';

// Ces variables sont injectées par Vite au moment de la compilation
declare const __APP_VERSION: string;
declare const __PKG_NAME: string;
declare const __PKG_DESCRIPTION: string;
declare const __PKG_LICENSE: string;
declare const __PKG_DEPENDENCIES: Record<string, string>;
declare const __PKG_DEV_DEPENDENCIES: Record<string, string>;
declare const __PKG_PEER_DEPENDENCIES: Record<string, string>;
declare const __PKG_OPTIONAL_DEPENDENCIES: Record<string, string>;

/**
 * Récupère les informations Git du repository
 */
const getGitInfo = () => {
  try {
    return {
      commitHash: execSync('git rev-parse --short HEAD').toString().trim(),
      branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim(),
      commitTime: execSync('git log -1 --format=%cd').toString().trim(),
      author: execSync('git log -1 --format=%an').toString().trim(),
      email: execSync('git log -1 --format=%ae').toString().trim(),
      remoteUrl: execSync('git config --get remote.origin.url').toString().trim(),
      repoName: execSync('git config --get remote.origin.url')
        .toString()
        .trim()
        .replace(/^.*github.com[:/]/, '')
        .replace(/\.git$/, ''),
    };
  } catch (error) {
    console.error('Failed to get git info:', error);
    return {
      commitHash: 'unknown',
      branch: 'unknown',
      commitTime: 'unknown',
      author: 'unknown',
      email: 'unknown',
      remoteUrl: 'unknown',
      repoName: 'unknown',
    };
  }
};

/**
 * Formate les dépendances pour un affichage structuré
 */
const formatDependencies = (
  deps: Record<string, string>,
  type: 'production' | 'development' | 'peer' | 'optional',
): Array<{ name: string; version: string; type: string }> => {
  return Object.entries(deps || {}).map(([name, version]) => ({
    name,
    version: version.replace(/^\^|~/, ''),
    type,
  }));
};

/**
 * Prépare la réponse avec les informations de l'application
 */
const getAppResponse = () => {
  const gitInfo = getGitInfo();

  return {
    name: __PKG_NAME || process.env.NEXT_PUBLIC_APP_NAME || 'bolt.diy',
    version: __APP_VERSION || process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
    description: __PKG_DESCRIPTION || 'A DIY LLM interface',
    license: __PKG_LICENSE || 'MIT',
    environment: process.env.NODE_ENV || 'development',
    gitInfo,
    timestamp: new Date().toISOString(),
    runtimeInfo: {
      nodeVersion: process.version || 'unknown',
      nextVersion: process.env.NEXT_PUBLIC_NEXT_VERSION || 'unknown',
    },
    dependencies: {
      production: formatDependencies(__PKG_DEPENDENCIES, 'production'),
      development: formatDependencies(__PKG_DEV_DEPENDENCIES, 'development'),
      peer: formatDependencies(__PKG_PEER_DEPENDENCIES, 'peer'),
      optional: formatDependencies(__PKG_OPTIONAL_DEPENDENCIES, 'optional'),
    },
  };
};

/**
 * GET /api/system/app-info
 * Récupère les informations générales de l'application
 */
export async function GET() {
  try {
    return NextResponse.json(getAppResponse());
  } catch (error) {
    console.error('Failed to get webapp info:', error);

    return NextResponse.json(
      {
        name: 'bolt.diy',
        version: '0.0.0',
        description: 'Error fetching app info',
        license: 'MIT',
        environment: 'error',
        gitInfo: {
          commitHash: 'error',
          branch: 'unknown',
          commitTime: 'unknown',
          author: 'unknown',
          email: 'unknown',
          remoteUrl: 'unknown',
          repoName: 'unknown',
        },
        timestamp: new Date().toISOString(),
        runtimeInfo: { nodeVersion: 'unknown', nextVersion: 'unknown' },
        dependencies: {
          production: [],
          development: [],
          peer: [],
          optional: [],
        },
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/system/app-info
 * Version POST pour compatibilité avec les clients existants
 */
export async function POST() {
  return GET();
}
