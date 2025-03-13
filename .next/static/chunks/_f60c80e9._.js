(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/_f60c80e9._.js',
  {
    '[project]/lib/stores/workbench.ts [app-client] (ecmascript, async loader)': (__turbopack_context__) => {
      var { g: global, __dirname } = __turbopack_context__;
      {
        __turbopack_context__.v((parentImport) => {
          return Promise.resolve().then(() => {
            return parentImport('[project]/lib/stores/workbench.ts [app-client] (ecmascript)');
          });
        });
      }
    },
    '[project]/components/git/GitUrlImport.client.tsx [app-client] (ecmascript, next/dynamic entry, async loader)': (
      __turbopack_context__,
    ) => {
      var { g: global, __dirname } = __turbopack_context__;
      {
        __turbopack_context__.v((parentImport) => {
          return Promise.all(
            [
              'static/chunks/components_git_GitUrlImport_client_tsx_10e5c997._.js',
              'static/chunks/components_git_GitUrlImport_client_tsx_c50600f4._.js',
            ].map((chunk) => __turbopack_context__.l(chunk)),
          ).then(() => {
            return parentImport(
              '[project]/components/git/GitUrlImport.client.tsx [app-client] (ecmascript, next/dynamic entry)',
            );
          });
        });
      }
    },
  },
]);
