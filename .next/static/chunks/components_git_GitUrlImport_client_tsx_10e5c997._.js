(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/components_git_GitUrlImport_client_tsx_10e5c997._.js',
  {
    '[project]/components/git/GitUrlImport.client.tsx [app-client] (ecmascript)': (__turbopack_context__) => {
      'use strict';

      var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
      {
        __turbopack_context__.s({
          default: () => __TURBOPACK__default__export__,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)',
          );
        var _s = __turbopack_context__.k.signature();
        ('use client');
        /**
         * Composant d'importation Git - Client Component
         * Ajout de la directive 'use client' pour Next.js
         */ const GitUrlImport = ({ initialUrl = '' }) => {
          _s();
          const [url, setUrl] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(initialUrl);
          const [isLoading, setIsLoading] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const [error, setError] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(null);
          const handleImport = async () => {
            if (!url.trim()) {
              setError('Veuillez entrer une URL de repository Git valide');
              return;
            }
            setIsLoading(true);
            setError(null);
            try {
              // Simuler l'importation (à remplacer par la vraie implémentation)
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log('Repository importé:', url);
              // Implémentation réelle ici
            } catch (err) {
              setError("Erreur lors de l'importation: " + (err instanceof Error ? err.message : String(err)));
            } finally {
              setIsLoading(false);
            }
          };
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'flex-1 flex flex-col items-center justify-center p-6',
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className: 'w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg',
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'h2',
                      {
                        className: 'text-2xl font-bold mb-6 text-gray-800',
                        children: 'Importer un repository Git',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/git/GitUrlImport.client.tsx',
                        lineNumber: 43,
                        columnNumber: 9,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'mb-6',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'label',
                            {
                              htmlFor: 'gitUrl',
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'URL du repository',
                            },
                            void 0,
                            false,
                            {
                              fileName: '[project]/components/git/GitUrlImport.client.tsx',
                              lineNumber: 46,
                              columnNumber: 11,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'input',
                            {
                              id: 'gitUrl',
                              type: 'text',
                              value: url,
                              onChange: (e) => setUrl(e.target.value),
                              placeholder: 'https://github.com/user/repo',
                              className:
                                'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                              disabled: isLoading,
                            },
                            void 0,
                            false,
                            {
                              fileName: '[project]/components/git/GitUrlImport.client.tsx',
                              lineNumber: 49,
                              columnNumber: 11,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: '[project]/components/git/GitUrlImport.client.tsx',
                        lineNumber: 45,
                        columnNumber: 9,
                      },
                      this,
                    ),
                    error &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md',
                          children: error,
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/git/GitUrlImport.client.tsx',
                          lineNumber: 61,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'button',
                      {
                        onClick: handleImport,
                        disabled: isLoading,
                        className:
                          'w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
                        children: isLoading ? 'Importation en cours...' : 'Importer le repository',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/git/GitUrlImport.client.tsx',
                        lineNumber: 66,
                        columnNumber: 9,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: '[project]/components/git/GitUrlImport.client.tsx',
                  lineNumber: 42,
                  columnNumber: 7,
                },
                this,
              ),
            },
            void 0,
            false,
            {
              fileName: '[project]/components/git/GitUrlImport.client.tsx',
              lineNumber: 41,
              columnNumber: 5,
            },
            this,
          );
        };
        _s(GitUrlImport, 'dW3aDOGrf/spQMf8wJYatAjL83Q=');
        _c = GitUrlImport;
        const __TURBOPACK__default__export__ = GitUrlImport;
        var _c;
        __turbopack_context__.k.register(_c, 'GitUrlImport');
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
          __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
        }
      }
    },
    '[project]/components/git/GitUrlImport.client.tsx [app-client] (ecmascript, next/dynamic entry)': (
      __turbopack_context__,
    ) => {
      var { g: global, __dirname } = __turbopack_context__;
      {
        __turbopack_context__.n(
          __turbopack_context__.i('[project]/components/git/GitUrlImport.client.tsx [app-client] (ecmascript)'),
        );
      }
    },
  },
]);

//# sourceMappingURL=components_git_GitUrlImport_client_tsx_10e5c997._.js.map
