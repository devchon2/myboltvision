(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/c27dc_@shikijs_langs_dist_ini_mjs_1a45ec82._.js',
  {
    '[project]/node_modules/.pnpm/@shikijs+langs@3.2.1/node_modules/@shikijs/langs/dist/ini.mjs [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict';

        var { g: global, __dirname } = __turbopack_context__;
        {
          __turbopack_context__.s({
            default: () => __TURBOPACK__default__export__,
          });
          const lang = Object.freeze(
            JSON.parse(
              '{"displayName":"INI","name":"ini","patterns":[{"begin":"(^[ \\\\t]+)?(?=#)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.ini"}},"end":"(?!\\\\G)","patterns":[{"begin":"#","beginCaptures":{"0":{"name":"punctuation.definition.comment.ini"}},"end":"\\\\n","name":"comment.line.number-sign.ini"}]},{"begin":"(^[ \\\\t]+)?(?=;)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.ini"}},"end":"(?!\\\\G)","patterns":[{"begin":";","beginCaptures":{"0":{"name":"punctuation.definition.comment.ini"}},"end":"\\\\n","name":"comment.line.semicolon.ini"}]},{"captures":{"1":{"name":"keyword.other.definition.ini"},"2":{"name":"punctuation.separator.key-value.ini"}},"match":"\\\\b([a-zA-Z0-9_.\\\\-]+)\\\\b\\\\s*(=)"},{"captures":{"1":{"name":"punctuation.definition.entity.ini"},"3":{"name":"punctuation.definition.entity.ini"}},"match":"^(\\\\[)(.*?)(])","name":"entity.name.section.group-title.ini"},{"begin":"\'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.ini"}},"end":"\'","endCaptures":{"0":{"name":"punctuation.definition.string.end.ini"}},"name":"string.quoted.single.ini","patterns":[{"match":"\\\\\\\\.","name":"constant.character.escape.ini"}]},{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.ini"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.ini"}},"name":"string.quoted.double.ini"}],"scopeName":"source.ini","aliases":["properties"]}',
            ),
          );
          const __TURBOPACK__default__export__ = [lang];
        }
      },
  },
]);

//# sourceMappingURL=c27dc_%40shikijs_langs_dist_ini_mjs_1a45ec82._.js.map
