import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { MAX_TOKENS } from '../../../lib/.server/llm/constants';
import { streamText } from '../../../lib/.server/llm/stream-text';
import { getApiKeysFromCookie, getProviderSettingsFromCookie } from '../../../lib/api/cookies';
import { LLMManager } from '../../../lib/modules/llm/manager';
import type { ModelInfo } from '../../../lib/modules/llm/types';
import type { IProviderSetting, ProviderInfo } from '../../../types/model';
import { PROVIDER_LIST } from '../../../utils/constants';
import { createScopedLogger } from '../../../utils/logger';

// Convertit process.env en Record<string, string> en filtrant les undefined
function convertEnvToRecord(env: NodeJS.ProcessEnv): Record<string, string> {
  return Object.entries(env)
    .filter(([_, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value as string;
        return acc;
      },
      {} as Record<string, string>,
    );
}

/**
 * GET /api/llmcall
 * Répond avec une erreur 405 Method Not Allowed - cette route ne supporte que les requêtes POST
 */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST instead.' }, { status: 405 });
}

/**
 * Récupère la liste des modèles disponibles
 */
async function getModelList(options: {
  apiKeys?: Record<string, string>;
  providerSettings?: Record<string, IProviderSetting>;
  serverEnv?: Record<string, string>;
}) {
  const envRecord = convertEnvToRecord(process.env);
  const llmManager = LLMManager.getInstance(envRecord);

  return llmManager.updateModelList(options);
}

const logger = createScopedLogger('api.llmcall');

/**
 * POST /api/llmcall
 * Endpoint pour générer du texte via un modèle LLM
 */
export async function POST(request: NextRequest) {
  try {
    const { system, message, model, provider, streamOutput } = (await request.json()) as {
      system: string;
      message: string;
      model: string;
      provider: ProviderInfo;
      streamOutput?: boolean;
    };

    const { name: providerName } = provider;

    // Valider les champs 'model' et 'provider'
    if (!model || typeof model !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing model' }, { status: 400 });
    }

    if (!providerName || typeof providerName !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing provider' }, { status: 400 });
    }

    const cookieHeader = request.headers.get('Cookie');
    const apiKeys = getApiKeysFromCookie(cookieHeader);
    const providerSettings = getProviderSettingsFromCookie(cookieHeader);
    const envRecord = convertEnvToRecord(process.env);

    // Traitement des requêtes avec streaming
    if (streamOutput) {
      try {
        const result = await streamText({
          options: {
            system,
          },
          messages: [
            {
              role: 'user',
              content: `${message}`,
            },
          ],
          env: envRecord,
          apiKeys,
          providerSettings,
        });

        return new Response(result.textStream, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error && error.message?.includes('API key')) {
          return NextResponse.json({ error: 'Invalid or missing API key' }, { status: 401 });
        }

        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
      }
    }
    // Traitement des requêtes sans streaming
    else {
      try {
        const models = await getModelList({ apiKeys, providerSettings, serverEnv: envRecord });
        const modelDetails = models.find((m: ModelInfo) => m.name === model);

        if (!modelDetails) {
          return NextResponse.json({ error: 'Model not found' }, { status: 404 });
        }

        const dynamicMaxTokens =
          modelDetails && modelDetails.maxTokenAllowed ? modelDetails.maxTokenAllowed : MAX_TOKENS;

        const providerInfo = PROVIDER_LIST.find((p) => p.name === provider.name);

        if (!providerInfo) {
          return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
        }

        logger.info(`Generating response Provider: ${provider.name}, Model: ${modelDetails.name}`);

        const result = await generateText({
          system,
          messages: [
            {
              role: 'user',
              content: `${message}`,
            },
          ],
          model: providerInfo.getModelInstance({
            model: modelDetails.name,
            serverEnv: envRecord,
            apiKeys,
            providerSettings,
          }),
          maxTokens: dynamicMaxTokens,
          toolChoice: 'none',
        });

        logger.info(`Generated response`);

        return NextResponse.json(result);
      } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error && error.message?.includes('API key')) {
          return NextResponse.json({ error: 'Invalid or missing API key' }, { status: 401 });
        }

        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('Error processing request:', error);

    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
