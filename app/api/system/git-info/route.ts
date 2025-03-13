import { execSync } from 'node:child_process';
import { NextResponse } from 'next/server';

interface GitHubRepoInfo {
  name: string;
  full_name: string;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  parent?: {
    full_name: string;
    default_branch: string;
    stargazers_count: number;
    forks_count: number;
  };
}

/**
 * Récupère les informations Git locales du repository
 */
const getLocalGitInfo = () => {
  try {
    return {
      commitHash: execSync('git rev-parse HEAD').toString().trim(),
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
    console.error('Failed to get local git info:', error);
    return null;
  }
};

/**
 * Récupère les informations du repository depuis l'API GitHub
 */
const getGitHubInfo = async (repoFullName: string) => {
  try {
    // Ajoute le token GitHub si disponible
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    const githubToken = process.env.GITHUB_TOKEN;

    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
    }

    console.log('Fetching GitHub info for:', repoFullName);

    const response = await fetch(`https://api.github.com/repos/${repoFullName}`, {
      headers,
    });

    if (!response.ok) {
      console.error('GitHub API error:', {
        status: response.status,
        statusText: response.statusText,
        repoFullName,
      });

      // En cas de 404, essayer le repo principal comme fallback
      if (response.status === 404 && repoFullName !== 'stackblitz-labs/bolt.diy') {
        return getGitHubInfo('stackblitz-labs/bolt.diy');
      }

      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('GitHub API response:', data);

    return data as GitHubRepoInfo;
  } catch (error) {
    console.error('Failed to get GitHub info:', error);
    return null;
  }
};

/**
 * GET /api/system/git-info
 * Récupère les informations Git du repository local et GitHub
 */
export async function GET() {
  const localInfo = getLocalGitInfo();
  console.log('Local git info:', localInfo);

  // Si on a des infos locales, essayer d'obtenir les infos GitHub pour notre fork et upstream
  let githubInfo = null;

  if (localInfo?.repoName) {
    githubInfo = await getGitHubInfo(localInfo.repoName);
  }

  // Si pas d'infos locales ou GitHub, essayer le repo principal
  if (!githubInfo) {
    githubInfo = await getGitHubInfo('stackblitz-labs/bolt.diy');
  }

  const response = {
    local: localInfo || {
      commitHash: 'unknown',
      branch: 'unknown',
      commitTime: 'unknown',
      author: 'unknown',
      email: 'unknown',
      remoteUrl: 'unknown',
      repoName: 'unknown',
    },
    github: githubInfo
      ? {
          currentRepo: {
            fullName: githubInfo.full_name,
            defaultBranch: githubInfo.default_branch,
            stars: githubInfo.stargazers_count,
            forks: githubInfo.forks_count,
            openIssues: githubInfo.open_issues_count,
          },
          upstream: githubInfo.parent
            ? {
                fullName: githubInfo.parent.full_name,
                defaultBranch: githubInfo.parent.default_branch,
                stars: githubInfo.parent.stargazers_count,
                forks: githubInfo.parent.forks_count,
              }
            : null,
        }
      : null,
    isForked: Boolean(githubInfo?.parent),
    timestamp: new Date().toISOString(),
  };

  console.log('Final response:', response);

  return NextResponse.json(response);
}
