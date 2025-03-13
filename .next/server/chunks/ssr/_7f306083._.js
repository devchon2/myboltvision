module.exports = {
  '[project]/lib/stores/workbench.ts [app-ssr] (ecmascript, async loader)': (__turbopack_context__) => {
    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.v((parentImport) => {
        return Promise.resolve().then(() => {
          return parentImport('[project]/lib/stores/workbench.ts [app-ssr] (ecmascript)');
        });
      });
    }
  },
  '[project]/components/git/GitUrlImport.client.tsx [app-ssr] (ecmascript, next/dynamic entry, async loader)': (
    __turbopack_context__,
  ) => {
    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.v((parentImport) => {
        return Promise.all(
          ['server/chunks/ssr/components_git_GitUrlImport_client_tsx_2db6db88._.js'].map((chunk) =>
            __turbopack_context__.l(chunk),
          ),
        ).then(() => {
          return parentImport(
            '[project]/components/git/GitUrlImport.client.tsx [app-ssr] (ecmascript, next/dynamic entry)',
          );
        });
      });
    }
  },
};
