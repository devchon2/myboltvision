import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { NextRequest, NextResponse } from 'next/server';

const execAsync = promisify(exec);

interface UpdateRequestBody {
  branch: string;
  autoUpdate?: boolean;
}

interface UpdateProgress {
  stage: 'fetch' | 'pull' | 'install' | 'build' | 'complete';
  message: string;
  progress?: number;
  error?: string;
  details?: {
    changedFiles?: string[];
    additions?: number;
    deletions?: number;
    commitMessages?: string[];
    totalSize?: string;
    currentCommit?: string;
    remoteCommit?: string;
    updateReady?: boolean;
    changelog?: string;
    compareUrl?: string;
  };
}

/**
 * GET /api/update
 * Endpoint pour la vérification de l'état de mise à jour (placeholder)
 */
export async function GET() {
  return NextResponse.json({});
}

/**
 * POST /api/update
 * Endpoint pour déclencher et suivre le processus de mise à jour
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object' || !('branch' in body) || typeof body.branch !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body: branch is required and must be a string' },
        { status: 400 },
      );
    }

    const { branch, autoUpdate = false } = body as UpdateRequestBody;

    // Créer un ReadableStream pour envoyer des mises à jour de progression
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const sendProgress = (update: UpdateProgress) => {
          controller.enqueue(encoder.encode(JSON.stringify(update) + '\n'));
        };

        try {
          // Vérification initiale
          sendProgress({
            stage: 'fetch',
            message: 'Checking repository status...',
            progress: 0,
          });

          // Vérifier si le remote existe
          let defaultBranch = branch || 'main'; // Rendre branch mutable

          try {
            await execAsync('git remote get-url upstream');
            sendProgress({
              stage: 'fetch',
              message: 'Repository remote verified',
              progress: 10,
            });
          } catch {
            throw new Error(
              'No upstream repository found. Please set up the upstream repository first by running:\ngit remote add upstream https://github.com/stackblitz-labs/bolt.diy.git',
            );
          }

          // Obtenir la branche par défaut si non spécifiée
          if (!branch) {
            sendProgress({
              stage: 'fetch',
              message: 'Detecting default branch...',
              progress: 20,
            });

            try {
              const { stdout } = await execAsync('git remote show upstream | grep "HEAD branch" | cut -d" " -f5');
              defaultBranch = stdout.trim() || 'main';
              sendProgress({
                stage: 'fetch',
                message: `Using branch: ${defaultBranch}`,
                progress: 30,
              });
            } catch {
              defaultBranch = 'main'; // Fallback sur main si on ne peut pas détecter
              sendProgress({
                stage: 'fetch',
                message: 'Using default branch: main',
                progress: 30,
              });
            }
          }

          // Étape de fetch
          sendProgress({
            stage: 'fetch',
            message: 'Fetching latest changes...',
            progress: 40,
          });

          // Fetch tous les remotes
          await execAsync('git fetch --all');
          sendProgress({
            stage: 'fetch',
            message: 'Remote changes fetched',
            progress: 50,
          });

          // Vérifier si la branche remote existe
          try {
            await execAsync(`git rev-parse --verify upstream/${defaultBranch}`);
            sendProgress({
              stage: 'fetch',
              message: 'Remote branch verified',
              progress: 60,
            });
          } catch {
            throw new Error(
              `Remote branch 'upstream/${defaultBranch}' not found. Please ensure the upstream repository is properly configured.`,
            );
          }

          // Obtenir le hash du commit actuel et du commit remote
          sendProgress({
            stage: 'fetch',
            message: 'Comparing versions...',
            progress: 70,
          });

          const { stdout: currentCommit } = await execAsync('git rev-parse HEAD');
          const { stdout: remoteCommit } = await execAsync(`git rev-parse upstream/${defaultBranch}`);

          // Si on est sur le même commit, aucune mise à jour n'est disponible
          if (currentCommit.trim() === remoteCommit.trim()) {
            sendProgress({
              stage: 'complete',
              message: 'No updates available. You are on the latest version.',
              progress: 100,
              details: {
                currentCommit: currentCommit.trim().substring(0, 7),
                remoteCommit: remoteCommit.trim().substring(0, 7),
              },
            });
            return;
          }

          sendProgress({
            stage: 'fetch',
            message: 'Analyzing changes...',
            progress: 80,
          });

          // Initialiser les variables
          let changedFiles: string[] = [];
          let commitMessages: string[] = [];
          let stats: RegExpMatchArray | null = null;
          let totalSizeInBytes = 0;

          // Formater la taille pour l'affichage
          const formatSize = (bytes: number) => {
            if (bytes === 0) {
              return '0 B';
            }

            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
          };

          // Obtenir la liste des fichiers modifiés et leurs tailles
          try {
            const { stdout: diffOutput } = await execAsync(
              `git diff --name-status ${currentCommit.trim()}..${remoteCommit.trim()}`,
            );
            const files = diffOutput.split('\n').filter(Boolean);

            if (files.length === 0) {
              sendProgress({
                stage: 'complete',
                message: `No file changes detected between your version and upstream/${defaultBranch}. You might be on a different branch.`,
                progress: 100,
                details: {
                  currentCommit: currentCommit.trim().substring(0, 7),
                  remoteCommit: remoteCommit.trim().substring(0, 7),
                },
              });
              return;
            }

            sendProgress({
              stage: 'fetch',
              message: `Found ${files.length} changed files, calculating sizes...`,
              progress: 90,
            });

            // Obtenir des informations de taille pour chaque fichier modifié
            for (const line of files) {
              const [status, file] = line.split('\t');

              if (status !== 'D') {
                // Ignorer les fichiers supprimés
                try {
                  const { stdout: sizeOutput } = await execAsync(`git cat-file -s ${remoteCommit.trim()}:${file}`);
                  const size = parseInt(sizeOutput) || 0;
                  totalSizeInBytes += size;
                } catch {
                  console.debug(`Could not get size for file: ${file}`);
                }
              }
            }

            changedFiles = files.map((line) => {
              const [status, file] = line.split('\t');
              return `${status === 'M' ? 'Modified' : status === 'A' ? 'Added' : 'Deleted'}: ${file}`;
            });
          } catch (err) {
            console.debug('Failed to get changed files:', err);
            throw new Error(`Failed to compare changes with upstream/${defaultBranch}. Are you on the correct branch?`);
          }

          // Obtenir les messages de commit entre le commit actuel et le remote
          try {
            const { stdout: logOutput } = await execAsync(
              `git log --pretty=format:"%h|%s|%aI" ${currentCommit.trim()}..${remoteCommit.trim()}`,
            );

            // Analyser et regrouper les commits par type
            const commits = logOutput
              .split('\n')
              .filter(Boolean)
              .map((line) => {
                const [hash, subject, timestamp] = line.split('|');
                let type = 'other';
                let message = subject;

                if (subject.startsWith('feat:') || subject.startsWith('feature:')) {
                  type = 'feature';
                  message = subject.replace(/^feat(?:ure)?:/, '').trim();
                } else if (subject.startsWith('fix:')) {
                  type = 'fix';
                  message = subject.replace(/^fix:/, '').trim();
                } else if (subject.startsWith('docs:')) {
                  type = 'docs';
                  message = subject.replace(/^docs:/, '').trim();
                } else if (subject.startsWith('style:')) {
                  type = 'style';
                  message = subject.replace(/^style:/, '').trim();
                } else if (subject.startsWith('refactor:')) {
                  type = 'refactor';
                  message = subject.replace(/^refactor:/, '').trim();
                } else if (subject.startsWith('perf:')) {
                  type = 'perf';
                  message = subject.replace(/^perf:/, '').trim();
                } else if (subject.startsWith('test:')) {
                  type = 'test';
                  message = subject.replace(/^test:/, '').trim();
                } else if (subject.startsWith('build:')) {
                  type = 'build';
                  message = subject.replace(/^build:/, '').trim();
                } else if (subject.startsWith('ci:')) {
                  type = 'ci';
                  message = subject.replace(/^ci:/, '').trim();
                }

                return {
                  hash,
                  type,
                  message,
                  timestamp: new Date(timestamp),
                };
              });

            // Regrouper les commits par type
            const groupedCommits = commits.reduce(
              (acc, commit) => {
                if (!acc[commit.type]) {
                  acc[commit.type] = [];
                }

                acc[commit.type].push(commit);

                return acc;
              },
              {} as Record<string, typeof commits>,
            );

            // Type des emojis par catégorie
            type CommitType =
              | 'feature'
              | 'fix'
              | 'docs'
              | 'style'
              | 'refactor'
              | 'perf'
              | 'test'
              | 'build'
              | 'ci'
              | 'other';

            // Mapping des emojis par type
            const emojiMap: Record<CommitType, string> = {
              feature: '✨',
              fix: '🐛',
              docs: '📚',
              style: '💎',
              refactor: '♻️',
              perf: '⚡',
              test: '🧪',
              build: '🛠️',
              ci: '⚙️',
              other: '🔍',
            };

            // Mapping des titres par type
            const titleMap: Record<CommitType, string> = {
              feature: 'Features',
              fix: 'Bug Fixes',
              docs: 'Documentation',
              style: 'Styles',
              refactor: 'Code Refactoring',
              perf: 'Performance',
              test: 'Tests',
              build: 'Build',
              ci: 'CI',
              other: 'Other Changes',
            };

            // Formater les messages de commit avec des emojis et des horodatages
            const formattedMessages = Object.entries(groupedCommits).map(([type, commits]) => {
              const commitType = type as CommitType;
              const emoji = emojiMap[commitType] || emojiMap.other;
              const title = titleMap[commitType] || titleMap.other;

              return `### ${emoji} ${title}\n\n${commits
                .map((c) => `* ${c.message} (${c.hash.substring(0, 7)}) - ${c.timestamp.toLocaleString()}`)
                .join('\n')}`;
            });

            commitMessages = formattedMessages;
          } catch {
            // Gérer silencieusement - tableau de commitMessages vide sera utilisé
          }

          // Obtenir les statistiques de diff en utilisant les commits spécifiques
          try {
            const { stdout: diffStats } = await execAsync(
              `git diff --shortstat ${currentCommit.trim()}..${remoteCommit.trim()}`,
            );
            stats = diffStats.match(
              /(\d+) files? changed(?:, (\d+) insertions?\\(\\+\\))?(?:, (\d+) deletions?\\(-\\))?/,
            );
          } catch {
            // Gérer silencieusement - stats null sera utilisé
          }

          // Si nous n'avons toujours pas de changements détectés
          if (!stats && changedFiles.length === 0) {
            sendProgress({
              stage: 'complete',
              message: `No changes detected between your version and upstream/${defaultBranch}. This might be unexpected - please check your git status.`,
              progress: 100,
            });
            return;
          }

          // Récupérer le changelog
          sendProgress({
            stage: 'fetch',
            message: 'Fetching changelog...',
            progress: 95,
          });

          const changelog = await fetchChangelog(currentCommit.trim(), remoteCommit.trim());

          // Nous avons des changements, envoyer les détails
          sendProgress({
            stage: 'fetch',
            message: `Changes detected on upstream/${defaultBranch}`,
            progress: 100,
            details: {
              changedFiles,
              additions: stats?.[2] ? parseInt(stats[2]) : 0,
              deletions: stats?.[3] ? parseInt(stats[3]) : 0,
              commitMessages,
              totalSize: formatSize(totalSizeInBytes),
              currentCommit: currentCommit.trim().substring(0, 7),
              remoteCommit: remoteCommit.trim().substring(0, 7),
              updateReady: true,
              changelog,
              compareUrl: `https://github.com/stackblitz-labs/bolt.diy/compare/${currentCommit.trim().substring(0, 7)}...${remoteCommit.trim().substring(0, 7)}`,
            },
          });

          // Ne poursuivre la mise à jour que si autoUpdate est true
          if (!autoUpdate) {
            sendProgress({
              stage: 'complete',
              message: 'Update is ready to be applied. Click "Update Now" to proceed.',
              progress: 100,
              details: {
                changedFiles,
                additions: stats?.[2] ? parseInt(stats[2]) : 0,
                deletions: stats?.[3] ? parseInt(stats[3]) : 0,
                commitMessages,
                totalSize: formatSize(totalSizeInBytes),
                currentCommit: currentCommit.trim().substring(0, 7),
                remoteCommit: remoteCommit.trim().substring(0, 7),
                updateReady: true,
                changelog,
                compareUrl: `https://github.com/stackblitz-labs/bolt.diy/compare/${currentCommit.trim().substring(0, 7)}...${remoteCommit.trim().substring(0, 7)}`,
              },
            });
            return;
          }

          // Étape de pull
          sendProgress({
            stage: 'pull',
            message: `Pulling changes from upstream/${defaultBranch}...`,
            progress: 0,
          });

          await execAsync(`git pull upstream ${defaultBranch}`);

          sendProgress({
            stage: 'pull',
            message: 'Changes pulled successfully',
            progress: 100,
          });

          // Étape d'installation
          sendProgress({
            stage: 'install',
            message: 'Installing dependencies...',
            progress: 0,
          });

          await execAsync('pnpm install');

          sendProgress({
            stage: 'install',
            message: 'Dependencies installed successfully',
            progress: 100,
          });

          // Étape de build
          sendProgress({
            stage: 'build',
            message: 'Building application...',
            progress: 0,
          });

          await execAsync('pnpm build');

          sendProgress({
            stage: 'build',
            message: 'Build completed successfully',
            progress: 100,
          });

          // Complet
          sendProgress({
            stage: 'complete',
            message: 'Update completed successfully! Click Restart to apply changes.',
            progress: 100,
          });
        } catch (err) {
          sendProgress({
            stage: 'complete',
            message: 'Update failed',
            error: err instanceof Error ? err.message : 'Unknown error occurred',
          });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Update preparation failed:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error occurred while preparing update',
      },
      { status: 500 },
    );
  }
}

/**
 * Récupère le changelog entre deux commits
 */
async function fetchChangelog(currentCommit: string, remoteCommit: string): Promise<string> {
  try {
    // D'abord essayer d'obtenir le contenu de changelog.md
    const { stdout: changelogContent } = await execAsync('git show upstream/main:changelog.md');

    // Si nous avons un changelog, le retourner
    if (changelogContent) {
      return changelogContent;
    }

    // Si pas de changelog.md, en générer un dans un format similaire
    let changelog = '# Changes in this Update\n\n';

    // Obtenir les messages de commit regroupés par type
    const { stdout: commitLog } = await execAsync(
      `git log --pretty=format:"%h|%s|%b" ${currentCommit.trim()}..${remoteCommit.trim()}`,
    );

    const commits = commitLog.split('\n').filter(Boolean);
    const categorizedCommits: Record<string, string[]> = {
      '✨ Features': [],
      '🐛 Bug Fixes': [],
      '📚 Documentation': [],
      '💎 Styles': [],
      '♻️ Code Refactoring': [],
      '⚡ Performance': [],
      '🧪 Tests': [],
      '🛠️ Build': [],
      '⚙️ CI': [],
      '🔍 Other Changes': [],
    };

    // Catégoriser les commits
    for (const commit of commits) {
      const [hash, subject] = commit.split('|');
      let category = '🔍 Other Changes';

      if (subject.startsWith('feat:') || subject.startsWith('feature:')) {
        category = '✨ Features';
      } else if (subject.startsWith('fix:')) {
        category = '🐛 Bug Fixes';
      } else if (subject.startsWith('docs:')) {
        category = '📚 Documentation';
      } else if (subject.startsWith('style:')) {
        category = '💎 Styles';
      } else if (subject.startsWith('refactor:')) {
        category = '♻️ Code Refactoring';
      } else if (subject.startsWith('perf:')) {
        category = '⚡ Performance';
      } else if (subject.startsWith('test:')) {
        category = '🧪 Tests';
      } else if (subject.startsWith('build:')) {
        category = '🛠️ Build';
      } else if (subject.startsWith('ci:')) {
        category = '⚙️ CI';
      }

      const message = subject.includes(':') ? subject.split(':')[1].trim() : subject.trim();
      categorizedCommits[category].push(`* ${message} (${hash.substring(0, 7)})`);
    }

    // Construire le contenu du changelog
    for (const [category, commits] of Object.entries(categorizedCommits)) {
      if (commits.length > 0) {
        changelog += `\n## ${category}\n\n${commits.join('\n')}\n`;
      }
    }

    // Ajouter les statistiques
    const { stdout: stats } = await execAsync(`git diff --shortstat ${currentCommit.trim()}..${remoteCommit.trim()}`);

    if (stats) {
      changelog += '\n## 📊 Stats\n\n';
      changelog += `${stats.trim()}\n`;
    }

    return changelog;
  } catch (error) {
    console.error('Error fetching changelog:', error);
    return 'Unable to fetch changelog';
  }
}
