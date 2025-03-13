import { defineConfig, type ViteDevServer } from 'vite';
import dotenv from 'dotenv';
import { join } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsconfigPaths from 'vite-tsconfig-paths';
import UnoCSS from 'unocss/vite';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Configuration du logger
const logDirectory = path.join(__dirname, 'docs', 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const log = (filename: string, message: string) => {
  const logFilePath = path.join(logDirectory, filename);
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
};

// Plugin personnalisé pour résoudre l'erreur "remix:manifest"
function remixManifestPlugin() {
  return {
    name: 'remix-manifest-plugin',
    resolveId(id: string) {
      if (id === 'remix:manifest') {
        const manifestPath = join(process.cwd(), 'build/manifest.json');
        log('vite_errors.log', `[remixManifestPlugin] resolving: ${id} to ${manifestPath}`);
        return manifestPath;
      }
      return null;
    },
  };
}

// Plugin pour Chrome 129 et problèmes connus
function chrome129IssuePlugin() {
  return {
    name: 'chrome129IssuePlugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        const raw = req.headers['user-agent']?.match(/Chrom(e|ium)\/([0-9]+)\./);

        if (raw) {
          const version = parseInt(raw[2], 10);

          if (version === 129) {
            res.setHeader('content-type', 'text/html');
            res.end(
              '<body><h1>Please use Chrome Canary for testing.</h1><p>Chrome 129 has an issue with JavaScript modules & Vite local development, see <a href="https://github.com/stackblitz/bolt.new/issues/86#issuecomment-2395519258">for more information.</a></p><p><b>Note:</b> This only impacts <u>local development</u>. `pnpm run build` and `pnpm run start` will work fine in this browser.</p></body>',
            );
            return;
          }
        }
        next();
      });
    },
  };
}

// Plugin pour définir la variable globale module et corriger les problèmes de loader
function modulePolyfillPlugin() {
  return {
    name: 'vite-module-polyfill',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: `
            // Module polyfill global
            if (typeof module === 'undefined') { 
              window.module = { exports: {} }; 
              console.log('✅ [Browser] window.module polyfill chargé');
            }
            
            // Remix loader polyfill
            if (typeof window.__remix_loader_stack === 'undefined') {
              window.__remix_loader_stack = [];
              console.log('✅ [Browser] window.__remix_loader_stack polyfill chargé');
            }
            
            // Path polyfill minimal
            if (typeof window.path === 'undefined') {
              window.path = {
                join: (...segments) => segments.join('/').replace(/\\/+/g, '/'),
                resolve: (...segments) => segments.join('/').replace(/\\/+/g, '/'),
                dirname: (path) => path.substring(0, path.lastIndexOf('/') + 1),
                basename: (path) => path.substring(path.lastIndexOf('/') + 1)
              };
              console.log('✅ [Browser] window.path polyfill chargé');
            }
          `,
        },
      ];
    },
  };
}

// Plugin spécial pour intercepter les imports ESM problématiques
function esmInteropPlugin() {
  return {
    name: 'esm-interop-plugin',
    enforce: 'pre' as const,
    resolveId(id) {
      // Intercepter les imports problématiques
      if (id.includes('@remix-run/server-runtime')) {
        console.log('📦 Intercepting ESM import:', id);
        return { id, external: true };
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    esmInteropPlugin(),
    {
      name: 'handleDocumentRequestPatchPlugin',
      enforce: 'pre',
      apply: 'serve',
      transform(code, id) {
        // Patcher uniquement le fichier server.js dans @remix-run/server-runtime
        if (id.includes('@remix-run/server-runtime') && id.endsWith('server.js')) {
          console.log('📄 Patching server.js dans @remix-run/server-runtime');

          // Log le contenu pour diagnostiquer
          log('server-js-content.log', code);

          // S'assurer que les références requises sont disponibles
          let modifiedCode = code;

          // Ajouter les imports nécessaires s'ils n'existent pas déjà
          if (!modifiedCode.includes('import { isRedirectResponse }')) {
            modifiedCode = `import { isRedirectResponse } from '@remix-run/server-runtime/responses';\n${modifiedCode}`;
          }

          // Corriger les appels problématiques avec un pattern plus générique
          return (
            modifiedCode
              .replace(
                /async function handleDocumentRequest\([^\)]*\)\s*\{[^}]*\}/ms,
                `async function handleDocumentRequest(serverMode, build, staticHandler, request, loadContext, handleError, criticalCss) {
                try {
                  const responses = { isRedirectResponse }; // Définir responses pour éviter les erreurs
                  const createRemixRedirectResponse = (response, basename) => {
                    // Implémentation simplifiée
                    return response;
                  };
                  
                  let response = await staticHandler.queryRoute(request, {
                    requestContext: loadContext
                  });
                  
                  let responseStatusCode = 200;
                  let responseHeaders = new Headers({
                    "Content-Type": "text/html"
                  });
                  
                  if (responses.isRedirectResponse(response)) {
                    response = createRemixRedirectResponse(response, build.basename);
                    return response;
                  }
                  
                  let entryContext = { ...build.entryContext };
                  
                  // Accéder à entry de façon sécurisée
                  const entry = build.entry || build.entryContext?.entry || { 
                    renderToHTML: async () => "<html><body>Fallback rendering</body></html>" 
                  };
                  
                  // Rendu simplifié
                  const markup = await entry.renderToHTML(request, entryContext, loadContext);
                  return new Response(markup, {
                    status: responseStatusCode,
                    headers: responseHeaders
                  });
                } catch (error) {
                  console.error("Error in handleDocumentRequest:", error);
                  handleError(error);
                  return returnLastResortErrorResponse(error, serverMode);
                }
              }`,
              )
              // Reste du code inchangé...
              .replace(
                /export async function requestHandler\([^{]*{/,
                `export async function requestHandler(request, loadContext = {}, routeId) {
                try { // Patched error handling`,
              )
              .replace(
                /return handleDocumentRequest\([^}]*}/,
                `return handleDocumentRequest(serverMode, _build, staticHandler, request, loadContext, handleError, criticalCss);
                } catch (error) {
                  console.error("Remix runtime error:", error);
                  return new Response("Server Error", { status: 500 });
                }
              }`,
              )
          );
        }
        return null;
      },
    },
    UnoCSS(),
    nodePolyfills({
      include: ['path', 'buffer', 'process'],
      globals: {
        process: true,
        global: true,
        Buffer: true,
      },
    }),
    {
      name: 'module-global-polyfill',
      enforce: 'pre',
      load(id) {
        // Ajouter un polyfill module global à chaque module
        if (id.endsWith('.ts') || id.endsWith('.tsx') || id.endsWith('.js') || id.endsWith('.jsx')) {
          return `
            if (typeof global !== 'undefined' && !global.module) { global.module = { exports: {} }; }
            if (typeof window !== 'undefined' && !window.module) { window.module = { exports: {} }; }
            if (typeof self !== 'undefined' && !self.module) { self.module = { exports: {} }; }
          `;
        }
      },
    },
    modulePolyfillPlugin(),
    remixManifestPlugin(),
    tsconfigPaths(),
    chrome129IssuePlugin(),
    optimizeCssModules({ apply: 'build' }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'global.module': JSON.stringify({ exports: {} }),
  },
  resolve: {
    alias: {
      path: 'path-browserify',
    },
    conditions: ['import', 'module', 'browser', 'default'],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    preserveSymlinks: true,
  },
  build: {
    target: 'esnext',
    manifest: true,
    rollupOptions: {
      external: ['react-resizable-panels'],
    },
  },
  ssr: {
    noExternal: [
      'react-resizable-panels',
      'path-browserify',
      '@nanostores/react',
      'nanostores',
      '@codemirror/view',
      '@codemirror/state',
    ],
    optimizeDeps: {
      include: ['path-browserify'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
