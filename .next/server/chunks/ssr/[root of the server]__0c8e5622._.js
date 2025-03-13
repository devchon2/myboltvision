module.exports = {
  '[externals]/tty [external] (tty, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('tty', () => require('tty'));

      module.exports = mod;
    }
  },
  '[externals]/util [external] (util, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('util', () => require('util'));

      module.exports = mod;
    }
  },
  '[externals]/os [external] (os, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('os', () => require('os'));

      module.exports = mod;
    }
  },
  '[externals]/node:path [external] (node:path, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('node:path', () => require('node:path'));

      module.exports = mod;
    }
  },
  '[externals]/node:path [external] (node:path, cjs) <export default as minpath>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        minpath: () =>
          __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__[
            'default'
          ],
      });
      var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ =
        __turbopack_context__.i('[externals]/node:path [external] (node:path, cjs)');
    }
  },
  '[externals]/node:process [external] (node:process, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('node:process', () => require('node:process'));

      module.exports = mod;
    }
  },
  '[externals]/node:process [external] (node:process, cjs) <export default as minproc>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        minproc: () =>
          __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__[
            'default'
          ],
      });
      var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ =
        __turbopack_context__.i('[externals]/node:process [external] (node:process, cjs)');
    }
  },
  '[externals]/node:url [external] (node:url, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('node:url', () => require('node:url'));

      module.exports = mod;
    }
  },
  '[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        urlToPath: () =>
          __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__[
            'fileURLToPath'
          ],
      });
      var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ =
        __turbopack_context__.i('[externals]/node:url [external] (node:url, cjs)');
    }
  },
  '[externals]/fs [external] (fs, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('fs', () => require('fs'));

      module.exports = mod;
    }
  },
  '[externals]/path [external] (path, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('path', () => require('path'));

      module.exports = mod;
    }
  },
  '[project]/utils/logger.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      // utils/logger.ts
      // import chalk from 'chalk'; // Commented out chalk
      __turbopack_context__.s({
        createScopedLogger: () => createScopedLogger,
        logger: () => logger,
        renderLogger: () => renderLogger,
      });
      let currentLevel =
        (process.env.VITE_LOG_LEVEL ?? ('TURBOPACK compile-time value', 'development') !== 'production')
          ? 'debug'
          : 'info';
      // Configuration du logger pour écrire dans des fichiers
      let logDirectory;
      let fsModule;
      let pathModule;
      if (('TURBOPACK compile-time truthy', 1)) {
        fsModule = __turbopack_context__.r('[externals]/fs [external] (fs, cjs)');
        pathModule = __turbopack_context__.r('[externals]/path [external] (path, cjs)');
        logDirectory = pathModule.join(__dirname, '..', '..', 'docs', 'logs');
        if (fsModule && !fsModule.existsSync(logDirectory)) {
          fsModule.mkdirSync(logDirectory, {
            recursive: true,
          });
        }
      }
      const logToFile = (filename, message) => {
        if ('undefined' === 'undefined' && fsModule && pathModule && logDirectory) {
          const logFilePath = pathModule.join(logDirectory, filename);
          fsModule.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
        }
      };
      const logger = {
        trace: (...messages) => log('trace', undefined, messages),
        debug: (...messages) => log('debug', undefined, messages),
        info: (...messages) => log('info', undefined, messages),
        warn: (...messages) => log('warn', undefined, messages),
        error: (...messages) => log('error', undefined, messages),
        setLevel,
      };
      function createScopedLogger(scope) {
        return {
          trace: (...messages) => log('trace', scope, messages),
          debug: (...messages) => log('debug', scope, messages),
          info: (...messages) => log('info', scope, messages),
          warn: (...messages) => log('warn', scope, messages),
          error: (...messages) => log('error', scope, messages),
          setLevel,
        };
      }
      function setLevel(level) {
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        }
        currentLevel = level;
      }
      function log(level, scope, messages) {
        const levelOrder = ['trace', 'debug', 'info', 'warn', 'error'];
        if (levelOrder.indexOf(level) < levelOrder.indexOf(currentLevel)) {
          return;
        }
        const allMessages = messages.reduce((acc, current) => {
          if (acc.endsWith('\n')) {
            return acc + current;
          }
          if (!acc) {
            return current;
          }
          return `${acc} ${current}`;
        }, '');
        // const labelBackgroundColor = getColorForLevel(level); // Commented out chalk
        // const labelTextColor = level === 'warn' ? '#000000' : '#FFFFFF'; // Commented out chalk
        // const labelStyles = getLabelStyles(labelBackgroundColor, labelTextColor); // Commented out chalk
        // const scopeStyles = getLabelStyles('#77828D', 'white'); // Commented out chalk
        // const styles = [labelStyles]; // Commented out chalk
        // if (typeof scope === 'string') { // Commented out chalk
        //   styles.push('', scopeStyles); // Commented out chalk
        // } // Commented out chalk
        // let labelText = formatText(` ${level.toUpperCase()} `, labelTextColor, labelBackgroundColor); // Commented out chalk
        // if (scope) { // Commented out chalk
        //   labelText = `${labelText} ${formatText(` ${scope} `, '#FFFFFF', '77828D')}`; // Commented out chalk
        // } // Commented out chalk
        if (('TURBOPACK compile-time falsy', 0)) {
          ('TURBOPACK unreachable');
        } else {
          console.log(`${level.toUpperCase()} ${scope ? `[${scope}] ` : ''}`, allMessages); // Simplified output for non-browser
        }
        // Écriture dans les fichiers de log
        const logMessage = `${level.toUpperCase()} - ${scope ? `[${scope}] ` : ''}${allMessages}`;
        switch (level) {
          case 'trace':
          case 'debug':
            logToFile('vite_errors.log', logMessage);
            break;
          case 'info':
          case 'warn':
          case 'error':
            logToFile('runtime_errors.log', logMessage);
            break;
        }
      }
      function formatText(text, color, bg) {
        return text; // Simplified formatText
      }
      function getLabelStyles(color, textColor) {
        return ``; // Removed styles, kept CSS for browser
      }
      function getColorForLevel(level) {
        switch (level) {
          case 'trace':
          case 'debug': {
            return '#77828D';
          }
          case 'info': {
            return '#1389FD';
          }
          case 'warn': {
            return '#FFDB6C';
          }
          case 'error': {
            return '#EE4744';
          }
          default: {
            return '#000000';
          }
        }
      }
      const renderLogger = createScopedLogger('Render');
    }
  },
  '[project]/utils/markdown.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        allowedHTMLElements: () => allowedHTMLElements,
        rehypePlugins: () => rehypePlugins,
        remarkPlugins: () => remarkPlugins,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rehype$2d$raw$40$7$2e$0$2e$0$2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/rehype-raw@7.0.0/node_modules/rehype-raw/lib/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$remark$2d$gfm$40$4$2e$0$2e$1$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/remark-gfm@4.0.1/node_modules/remark-gfm/lib/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rehype$2d$sanitize$40$6$2e$0$2e$0$2f$node_modules$2f$rehype$2d$sanitize$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/rehype-sanitize@6.0.0/node_modules/rehype-sanitize/lib/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$hast$2d$util$2d$sanitize$40$5$2e$0$2e$2$2f$node_modules$2f$hast$2d$util$2d$sanitize$2f$lib$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/hast-util-sanitize@5.0.2/node_modules/hast-util-sanitize/lib/schema.js [app-ssr] (ecmascript)',
        );
      (() => {
        const e = new Error("Cannot find module 'unist-util-visit'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      })();
      const allowedHTMLElements = [
        'a',
        'b',
        'blockquote',
        'br',
        'code',
        'dd',
        'del',
        'details',
        'div',
        'dl',
        'dt',
        'em',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'i',
        'ins',
        'kbd',
        'li',
        'ol',
        'p',
        'pre',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'source',
        'span',
        'strike',
        'strong',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'thead',
        'tr',
        'ul',
        'var',
        'think',
      ];
      // Add custom rehype plugin
      function remarkThinkRawContent() {
        return (tree) => {
          visit(tree, (node) => {
            if (node.type === 'html' && node.value && node.value.startsWith('<think>')) {
              const cleanedContent = node.value.slice(7);
              node.value = `<div class="__boltThought__">${cleanedContent}`;
              return;
            }
            if (node.type === 'html' && node.value && node.value.startsWith('</think>')) {
              const cleanedContent = node.value.slice(8);
              node.value = `</div>${cleanedContent}`;
            }
          });
        };
      }
      const rehypeSanitizeOptions = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$hast$2d$util$2d$sanitize$40$5$2e$0$2e$2$2f$node_modules$2f$hast$2d$util$2d$sanitize$2f$lib$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'defaultSchema'
        ],
        tagNames: allowedHTMLElements,
        attributes: {
          ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$hast$2d$util$2d$sanitize$40$5$2e$0$2e$2$2f$node_modules$2f$hast$2d$util$2d$sanitize$2f$lib$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'defaultSchema'
          ].attributes,
          div: [
            ...(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$hast$2d$util$2d$sanitize$40$5$2e$0$2e$2$2f$node_modules$2f$hast$2d$util$2d$sanitize$2f$lib$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'defaultSchema'
            ].attributes?.div ?? []),
            'data*',
            ['className', '__boltArtifact__', '__boltThought__'],
          ],
        },
        strip: [],
      };
      function remarkPlugins(limitedMarkdown) {
        const plugins = [
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$remark$2d$gfm$40$4$2e$0$2e$1$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        ];
        if (limitedMarkdown) {
          plugins.unshift(limitedMarkdownPlugin);
        }
        plugins.unshift(remarkThinkRawContent);
        return plugins;
      }
      function rehypePlugins(html) {
        const plugins = [];
        if (html) {
          plugins.push(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rehype$2d$raw$40$7$2e$0$2e$0$2f$node_modules$2f$rehype$2d$raw$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'default'
            ],
            [
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rehype$2d$sanitize$40$6$2e$0$2e$0$2f$node_modules$2f$rehype$2d$sanitize$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'default'
              ],
              rehypeSanitizeOptions,
            ],
          );
        }
        return plugins;
      }
      const limitedMarkdownPlugin = () => {
        return (tree, file) => {
          const contents = file.toString();
          visit(tree, (node, index, parent) => {
            if (
              index == null ||
              ['paragraph', 'text', 'inlineCode', 'code', 'strong', 'emphasis'].includes(node.type) ||
              !node.position
            ) {
              return true;
            }
            let value = contents.slice(node.position.start.offset, node.position.end.offset);
            if (node.type === 'heading') {
              value = `\n${value}`;
            }
            parent.children[index] = {
              type: 'text',
              value,
            };
            return [SKIP, index];
          });
        };
      };
    }
  },
  '[externals]/shiki [external] (shiki, esm_import)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        const mod = await __turbopack_context__.y('shiki');

        __turbopack_context__.n(mod);
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, true);
  },
  '[project]/utils/path.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      // Browser-compatible path utilities
      __turbopack_context__.s({
        path: () => path,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js [app-ssr] (ecmascript)',
        );
      const path = {
        join: (...paths) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].join(...paths),
        dirname: (path) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].dirname(path),
        basename: (path, ext) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].basename(path, ext),
        extname: (path) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].extname(path),
        relative: (from, to) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].relative(from, to),
        isAbsolute: (path) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].isAbsolute(path),
        normalize: (path) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].normalize(path),
        parse: (path) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].parse(path),
        format: (pathObject) =>
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$path$2d$browserify$40$1$2e$0$2e$1$2f$node_modules$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].format(pathObject),
      };
    }
  },
  '[project]/utils/unreachable.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        unreachable: () => unreachable,
      });
      function unreachable(message) {
        throw new Error(`Unreachable: ${message}`);
      }
    }
  },
  '[project]/lib/runtime/action-runner.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        ActionRunner: () => ActionRunner,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/path.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/map/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/unreachable.ts [app-ssr] (ecmascript)');
      const logger = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'createScopedLogger'
      ])('ActionRunner');
      class ActionCommandError extends Error {
        _output;
        _header;
        constructor(message, output) {
          // Create a formatted message that includes both the error message and output
          const formattedMessage = `Failed To Execute Shell Command: ${message}\n\nOutput:\n${output}`;
          super(formattedMessage);
          // Set the output separately so it can be accessed programmatically
          this._header = message;
          this._output = output;
          // Maintain proper prototype chain
          Object.setPrototypeOf(this, ActionCommandError.prototype);
          // Set the name of the error for better debugging
          this.name = 'ActionCommandError';
        }
        // Optional: Add a method to get just the terminal output
        get output() {
          return this._output;
        }
        get header() {
          return this._header;
        }
      }
      class ActionRunner {
        #webcontainer;
        #currentExecutionPromise = Promise.resolve();
        #shellTerminal;
        runnerId = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])(`${Date.now()}`);
        actions = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'map'
        ])({});
        onAlert;
        constructor(webcontainerPromise, getShellTerminal, onAlert) {
          this.#webcontainer = webcontainerPromise;
          this.#shellTerminal = getShellTerminal;
          this.onAlert = onAlert;
        }
        addAction(data) {
          const { actionId } = data;
          const actions = this.actions.get();
          const action = actions[actionId];
          if (action) {
            // action already added
            return;
          }
          const abortController = new AbortController();
          this.actions.setKey(actionId, {
            ...data.action,
            status: 'pending',
            executed: false,
            abort: () => {
              abortController.abort();
              this.#updateAction(actionId, {
                status: 'aborted',
              });
            },
            abortSignal: abortController.signal,
          });
          this.#currentExecutionPromise.then(() => {
            this.#updateAction(actionId, {
              status: 'running',
            });
          });
        }
        async runAction(data, isStreaming = false) {
          const { actionId } = data;
          const action = this.actions.get()[actionId];
          if (!action) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])(`Action ${actionId} not found`);
          }
          if (action.executed) {
            return; // No return value here
          }
          if (isStreaming && action.type !== 'file') {
            return; // No return value here
          }
          this.#updateAction(actionId, {
            ...action,
            ...data.action,
            executed: !isStreaming,
          });
          this.#currentExecutionPromise = this.#currentExecutionPromise
            .then(() => {
              return this.#executeAction(actionId, isStreaming);
            })
            .catch((error) => {
              console.error('Action failed:', error);
            });
          await this.#currentExecutionPromise;
          return;
        }
        async #executeAction(actionId, isStreaming = false) {
          const action = this.actions.get()[actionId];
          this.#updateAction(actionId, {
            status: 'running',
          });
          try {
            switch (action.type) {
              case 'shell': {
                await this.#runShellAction(action);
                break;
              }
              case 'file': {
                await this.#runFileAction(action);
                break;
              }
              case 'start': {
                // making the start app non blocking
                this.#runStartAction(action)
                  .then(() =>
                    this.#updateAction(actionId, {
                      status: 'complete',
                    }),
                  )
                  .catch((err) => {
                    if (action.abortSignal.aborted) {
                      return;
                    }
                    this.#updateAction(actionId, {
                      status: 'failed',
                      error: 'Action failed',
                    });
                    logger.error(`[${action.type}]:Action failed\n\n`, err);
                    if (!(err instanceof ActionCommandError)) {
                      return;
                    }
                    this.onAlert?.({
                      type: 'error',
                      title: 'Dev Server Failed',
                      description: err.header,
                      content: err.output,
                    });
                  });
                /*
                 * adding a delay to avoid any race condition between 2 start actions
                 * i am up for a better approach
                 */ await new Promise((resolve) => setTimeout(resolve, 2000));
                return;
              }
            }
            this.#updateAction(actionId, {
              status: isStreaming ? 'running' : action.abortSignal.aborted ? 'aborted' : 'complete',
            });
          } catch (error) {
            if (action.abortSignal.aborted) {
              return;
            }
            this.#updateAction(actionId, {
              status: 'failed',
              error: 'Action failed',
            });
            logger.error(`[${action.type}]:Action failed\n\n`, error);
            if (!(error instanceof ActionCommandError)) {
              return;
            }
            this.onAlert?.({
              type: 'error',
              title: 'Dev Server Failed',
              description: error.header,
              content: error.output,
            });
            // re-throw the error to be caught in the promise chain
            throw error;
          }
        }
        async #runShellAction(action) {
          if (action.type !== 'shell') {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])('Expected shell action');
          }
          const shell = this.#shellTerminal();
          await shell.ready();
          if (!shell || !shell.terminal || !shell.process) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])('Shell terminal not found');
          }
          const resp = await shell.executeCommand(this.runnerId.get(), action.content, () => {
            logger.debug(`[${action.type}]:Aborting Action\n\n`, action);
            action.abort();
          });
          logger.debug(`${action.type} Shell Response: [exit code:${resp?.exitCode}]`);
          if (resp?.exitCode != 0) {
            throw new ActionCommandError(`Failed To Execute Shell Command`, resp?.output || 'No Output Available');
          }
        }
        async #runStartAction(action) {
          if (action.type !== 'start') {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])('Expected shell action');
          }
          if (!this.#shellTerminal) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])('Shell terminal not found');
          }
          const shell = this.#shellTerminal();
          await shell.ready();
          if (!shell || !shell.terminal || !shell.process) {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])('Shell terminal not found');
          }
          const resp = await shell.executeCommand(this.runnerId.get(), action.content, () => {
            logger.debug(`[${action.type}]:Aborting Action\n\n`, action);
            action.abort();
          });
          logger.debug(`${action.type} Shell Response: [exit code:${resp?.exitCode}]`);
          if (resp?.exitCode != 0) {
            throw new ActionCommandError('Failed To Start Application', resp?.output || 'No Output Available');
          }
          return resp;
        }
        async #runFileAction(action) {
          if (action.type !== 'file') {
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'unreachable'
            ])('Expected file action');
          }
          const webcontainer = await this.#webcontainer;
          const relativePath =
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'path'
            ].relative(webcontainer.workdir, action.filePath);
          let folder =
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'path'
            ].dirname(relativePath);
          // remove trailing slashes
          folder = folder.replace(/\/+$/g, '');
          if (folder !== '.') {
            try {
              await webcontainer.fs.mkdir(folder, {
                recursive: true,
              });
              logger.debug('Created folder', folder);
            } catch (error) {
              logger.error('Failed to create folder\n\n', error);
            }
          }
          try {
            await webcontainer.fs.writeFile(relativePath, action.content);
            logger.debug(`File written ${relativePath}`);
          } catch (error) {
            logger.error('Failed to write file\n\n', error);
          }
        }
        #updateAction(id, newState) {
          const actions = this.actions.get();
          this.actions.setKey(id, {
            ...actions[id],
            ...newState,
          });
        }
      }
    }
  },
  '[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        BaseProvider: () => BaseProvider,
        getOpenAILikeModel: () => getOpenAILikeModel,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/manager.ts [app-ssr] (ecmascript)');
      class BaseProvider {
        cachedDynamicModels;
        getApiKeyLink;
        labelForGetApiKey;
        icon;
        getProviderBaseUrlAndKey(options) {
          const { apiKeys, providerSettings, serverEnv, defaultBaseUrlKey, defaultApiTokenKey } = options;
          let settingsBaseUrl = providerSettings?.baseUrl;
          const manager =
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'LLMManager'
            ].getInstance();
          if (settingsBaseUrl && settingsBaseUrl.length == 0) {
            settingsBaseUrl = undefined;
          }
          const baseUrlKey = this.config.baseUrlKey || defaultBaseUrlKey;
          let baseUrl =
            settingsBaseUrl ||
            serverEnv?.[baseUrlKey] ||
            process?.env?.[baseUrlKey] ||
            manager.env?.[baseUrlKey] ||
            this.config.baseUrl;
          if (baseUrl && baseUrl.endsWith('/')) {
            baseUrl = baseUrl.slice(0, -1);
          }
          const apiTokenKey = this.config.apiTokenKey || defaultApiTokenKey;
          const apiKey =
            apiKeys?.[this.name] ||
            serverEnv?.[apiTokenKey] ||
            process?.env?.[apiTokenKey] ||
            manager.env?.[apiTokenKey];
          return {
            baseUrl,
            apiKey,
          };
        }
        getModelsFromCache(options) {
          if (!this.cachedDynamicModels) {
            // console.log('no dynamic models',this.name);
            return null;
          }
          const cacheKey = this.cachedDynamicModels.cacheId;
          const generatedCacheKey = this.getDynamicModelsCacheKey(options);
          if (cacheKey !== generatedCacheKey) {
            // console.log('cache key mismatch',this.name,cacheKey,generatedCacheKey);
            this.cachedDynamicModels = undefined;
            return null;
          }
          return this.cachedDynamicModels.models;
        }
        getDynamicModelsCacheKey(options) {
          return JSON.stringify({
            apiKeys: options.apiKeys?.[this.name],
            providerSettings: options.providerSettings?.[this.name],
            serverEnv: options.serverEnv,
          });
        }
        storeDynamicModels(options, models) {
          const cacheId = this.getDynamicModelsCacheKey(options);
          // console.log('caching dynamic models',this.name,cacheId);
          this.cachedDynamicModels = {
            cacheId,
            models,
          };
        }
      }
      function getOpenAILikeModel(baseURL, apiKey, model) {
        const openai = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'createOpenAI'
        ])({
          baseURL,
          apiKey,
        });
        return openai(model);
      }
    }
  },
  '[project]/lib/modules/llm/providers/anthropic.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => AnthropicProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$anthropic$40$1$2e$1$2e$17_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+anthropic@1.1.17_zod@3.24.2/node_modules/@ai-sdk/anthropic/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class AnthropicProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Anthropic';
        getApiKeyLink = 'https://console.anthropic.com/settings/keys';
        config = {
          apiTokenKey: 'ANTHROPIC_API_KEY',
        };
        staticModels = [
          {
            name: 'claude-3-5-sonnet-latest',
            label: 'Claude 3.5 Sonnet (new)',
            provider: 'Anthropic',
            maxTokenAllowed: 8000,
          },
          {
            name: 'claude-3-5-sonnet-20240620',
            label: 'Claude 3.5 Sonnet (old)',
            provider: 'Anthropic',
            maxTokenAllowed: 8000,
          },
          {
            name: 'claude-3-5-haiku-latest',
            label: 'Claude 3.5 Haiku (new)',
            provider: 'Anthropic',
            maxTokenAllowed: 8000,
          },
          {
            name: 'claude-3-opus-latest',
            label: 'Claude 3 Opus',
            provider: 'Anthropic',
            maxTokenAllowed: 8000,
          },
          {
            name: 'claude-3-sonnet-20240229',
            label: 'Claude 3 Sonnet',
            provider: 'Anthropic',
            maxTokenAllowed: 8000,
          },
          {
            name: 'claude-3-haiku-20240307',
            label: 'Claude 3 Haiku',
            provider: 'Anthropic',
            maxTokenAllowed: 8000,
          },
        ];
        getModelInstance = (options) => {
          const { apiKeys, providerSettings, serverEnv, model } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings,
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'ANTHROPIC_API_KEY',
          });
          const anthropic = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$anthropic$40$1$2e$1$2e$17_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createAnthropic'
          ])({
            apiKey,
          });
          return anthropic(model);
        };
      }
    }
  },
  '[project]/lib/modules/llm/providers/cohere.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => CohereProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$cohere$40$1$2e$1$2e$15_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$cohere$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+cohere@1.1.15_zod@3.24.2/node_modules/@ai-sdk/cohere/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class CohereProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Cohere';
        getApiKeyLink = 'https://dashboard.cohere.com/api-keys';
        config = {
          apiTokenKey: 'COHERE_API_KEY',
        };
        staticModels = [
          {
            name: 'command-r-plus-08-2024',
            label: 'Command R plus Latest',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command-r-08-2024',
            label: 'Command R Latest',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command-r-plus',
            label: 'Command R plus',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command-r',
            label: 'Command R',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command',
            label: 'Command',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command-nightly',
            label: 'Command Nightly',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command-light',
            label: 'Command Light',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'command-light-nightly',
            label: 'Command Light Nightly',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'c4ai-aya-expanse-8b',
            label: 'c4AI Aya Expanse 8b',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
          {
            name: 'c4ai-aya-expanse-32b',
            label: 'c4AI Aya Expanse 32b',
            provider: 'Cohere',
            maxTokenAllowed: 4096,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'COHERE_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const cohere = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$cohere$40$1$2e$1$2e$15_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$cohere$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createCohere'
          ])({
            apiKey,
          });
          return cohere(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/deepseek.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => DeepseekProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$deepseek$40$0$2e$1$2e$15_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$deepseek$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+deepseek@0.1.15_zod@3.24.2/node_modules/@ai-sdk/deepseek/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class DeepseekProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Deepseek';
        getApiKeyLink = 'https://platform.deepseek.com/apiKeys';
        config = {
          apiTokenKey: 'DEEPSEEK_API_KEY',
        };
        staticModels = [
          {
            name: 'deepseek-coder',
            label: 'Deepseek-Coder',
            provider: 'Deepseek',
            maxTokenAllowed: 8000,
          },
          {
            name: 'deepseek-chat',
            label: 'Deepseek-Chat',
            provider: 'Deepseek',
            maxTokenAllowed: 8000,
          },
          {
            name: 'deepseek-reasoner',
            label: 'Deepseek-Reasoner',
            provider: 'Deepseek',
            maxTokenAllowed: 8000,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'DEEPSEEK_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const deepseek = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$deepseek$40$0$2e$1$2e$15_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$deepseek$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createDeepSeek'
          ])({
            apiKey,
          });
          return deepseek(model, {});
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/google.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => GoogleProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$google$40$1$2e$1$2e$25_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$google$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+google@1.1.25_zod@3.24.2/node_modules/@ai-sdk/google/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class GoogleProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Google';
        getApiKeyLink = 'https://aistudio.google.com/app/apikey';
        config = {
          apiTokenKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
        };
        staticModels = [
          {
            name: 'gemini-1.5-flash-latest',
            label: 'Gemini 1.5 Flash',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
          {
            name: 'gemini-2.0-flash-thinking-exp-01-21',
            label: 'Gemini 2.0 Flash-thinking-exp-01-21',
            provider: 'Google',
            maxTokenAllowed: 65536,
          },
          {
            name: 'gemini-2.0-flash-exp',
            label: 'Gemini 2.0 Flash',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
          {
            name: 'gemini-1.5-flash-002',
            label: 'Gemini 1.5 Flash-002',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
          {
            name: 'gemini-1.5-flash-8b',
            label: 'Gemini 1.5 Flash-8b',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
          {
            name: 'gemini-1.5-pro-latest',
            label: 'Gemini 1.5 Pro',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
          {
            name: 'gemini-1.5-pro-002',
            label: 'Gemini 1.5 Pro-002',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
          {
            name: 'gemini-exp-1206',
            label: 'Gemini exp-1206',
            provider: 'Google',
            maxTokenAllowed: 8192,
          },
        ];
        async getDynamicModels(apiKeys, settings, serverEnv) {
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
          });
          if (!apiKey) {
            throw `Missing Api Key configuration for ${this.name} provider`;
          }
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
            headers: {
              ['Content-Type']: 'application/json',
            },
          });
          const res = await response.json();
          const data = res.models.filter((model) => model.outputTokenLimit > 8000);
          return data.map((m) => ({
            name: m.name.replace('models/', ''),
            label: `${m.displayName} - context ${Math.floor((m.inputTokenLimit + m.outputTokenLimit) / 1000) + 'k'}`,
            provider: this.name,
            maxTokenAllowed: m.inputTokenLimit + m.outputTokenLimit || 8000,
          }));
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const google = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$google$40$1$2e$1$2e$25_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$google$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createGoogleGenerativeAI'
          ])({
            apiKey,
          });
          return google(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/groq.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => GroqProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class GroqProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Groq';
        getApiKeyLink = 'https://console.groq.com/keys';
        config = {
          apiTokenKey: 'GROQ_API_KEY',
        };
        staticModels = [
          {
            name: 'llama-3.1-8b-instant',
            label: 'Llama 3.1 8b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 8000,
          },
          {
            name: 'llama-3.2-11b-vision-preview',
            label: 'Llama 3.2 11b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 8000,
          },
          {
            name: 'llama-3.2-90b-vision-preview',
            label: 'Llama 3.2 90b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 8000,
          },
          {
            name: 'llama-3.2-3b-preview',
            label: 'Llama 3.2 3b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 8000,
          },
          {
            name: 'llama-3.2-1b-preview',
            label: 'Llama 3.2 1b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 8000,
          },
          {
            name: 'llama-3.3-70b-versatile',
            label: 'Llama 3.3 70b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 8000,
          },
          {
            name: 'deepseek-r1-distill-llama-70b',
            label: 'Deepseek R1 Distill Llama 70b (Groq)',
            provider: 'Groq',
            maxTokenAllowed: 131072,
          },
        ];
        async getDynamicModels(apiKeys, settings, serverEnv) {
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'GROQ_API_KEY',
          });
          if (!apiKey) {
            throw `Missing Api Key configuration for ${this.name} provider`;
          }
          const response = await fetch(`https://api.groq.com/openai/v1/models`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const res = await response.json();
          const data = res.data.filter(
            (model) => model.object === 'model' && model.active && model.context_window > 8000,
          );
          return data.map((m) => ({
            name: m.id,
            label: `${m.id} - context ${m.context_window ? Math.floor(m.context_window / 1000) + 'k' : 'N/A'} [ by ${m.owned_by}]`,
            provider: this.name,
            maxTokenAllowed: m.context_window || 8000,
          }));
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'GROQ_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const openai = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: 'https://api.groq.com/openai/v1',
            apiKey,
          });
          return openai(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/huggingface.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => HuggingFaceProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class HuggingFaceProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'HuggingFace';
        getApiKeyLink = 'https://huggingface.co/settings/tokens';
        config = {
          apiTokenKey: 'HuggingFace_API_KEY',
        };
        staticModels = [
          {
            name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
            label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: '01-ai/Yi-1.5-34B-Chat',
            label: 'Yi-1.5-34B-Chat (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'codellama/CodeLlama-34b-Instruct-hf',
            label: 'CodeLlama-34b-Instruct (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'NousResearch/Hermes-3-Llama-3.1-8B',
            label: 'Hermes-3-Llama-3.1-8B (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
            label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'Qwen/Qwen2.5-72B-Instruct',
            label: 'Qwen2.5-72B-Instruct (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'meta-llama/Llama-3.1-70B-Instruct',
            label: 'Llama-3.1-70B-Instruct (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'meta-llama/Llama-3.1-405B',
            label: 'Llama-3.1-405B (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: '01-ai/Yi-1.5-34B-Chat',
            label: 'Yi-1.5-34B-Chat (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'codellama/CodeLlama-34b-Instruct-hf',
            label: 'CodeLlama-34b-Instruct (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
          {
            name: 'NousResearch/Hermes-3-Llama-3.1-8B',
            label: 'Hermes-3-Llama-3.1-8B (HuggingFace)',
            provider: 'HuggingFace',
            maxTokenAllowed: 8000,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'HuggingFace_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const openai = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: 'https://api-inference.huggingface.co/v1/',
            apiKey,
          });
          return openai(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/lmstudio.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => LMStudioProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      class LMStudioProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'LMStudio';
        getApiKeyLink = 'https://lmstudio.ai/';
        labelForGetApiKey = 'Get LMStudio';
        icon = 'i-ph:cloud-arrow-down';
        config = {
          baseUrlKey: 'LMSTUDIO_API_BASE_URL',
          baseUrl: 'http://localhost:1234/',
        };
        staticModels = [];
        async getDynamicModels(apiKeys, settings, serverEnv = {}) {
          let { baseUrl } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv,
            defaultBaseUrlKey: 'LMSTUDIO_API_BASE_URL',
            defaultApiTokenKey: '',
          });
          if (!baseUrl) {
            throw new Error('No baseUrl found for LMStudio provider');
          }
          if (('TURBOPACK compile-time truthy', 1)) {
            /*
             * Running in Server
             * Backend: Check if we're running in Docker
             */ const isDocker = process?.env?.RUNNING_IN_DOCKER === 'true' || serverEnv?.RUNNING_IN_DOCKER === 'true';
            baseUrl = isDocker ? baseUrl.replace('localhost', 'host.docker.internal') : baseUrl;
            baseUrl = isDocker ? baseUrl.replace('127.0.0.1', 'host.docker.internal') : baseUrl;
          }
          const response = await fetch(`${baseUrl}/v1/models`);
          const data = await response.json();
          return data.data.map((model) => ({
            name: model.id,
            label: model.id,
            provider: this.name,
            maxTokenAllowed: 8000,
          }));
        }
        getModelInstance = (options) => {
          const { apiKeys, providerSettings, serverEnv, model } = options;
          let { baseUrl } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: 'LMSTUDIO_API_BASE_URL',
            defaultApiTokenKey: '',
          });
          if (!baseUrl) {
            throw new Error('No baseUrl found for LMStudio provider');
          }
          const isDocker = process.env.RUNNING_IN_DOCKER === 'true' || serverEnv?.RUNNING_IN_DOCKER === 'true';
          if (('TURBOPACK compile-time truthy', 1)) {
            baseUrl = isDocker ? baseUrl.replace('localhost', 'host.docker.internal') : baseUrl;
            baseUrl = isDocker ? baseUrl.replace('127.0.0.1', 'host.docker.internal') : baseUrl;
          }
          __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'logger'
          ].debug('LMStudio Base Url used: ', baseUrl);
          const lmstudio = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: `${baseUrl}/v1`,
            apiKey: '',
          });
          return lmstudio(model);
        };
      }
    }
  },
  '[project]/lib/modules/llm/providers/mistral.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => MistralProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$mistral$40$1$2e$1$2e$17_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$mistral$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+mistral@1.1.17_zod@3.24.2/node_modules/@ai-sdk/mistral/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class MistralProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Mistral';
        getApiKeyLink = 'https://console.mistral.ai/api-keys/';
        config = {
          apiTokenKey: 'MISTRAL_API_KEY',
        };
        staticModels = [
          {
            name: 'open-mistral-7b',
            label: 'Mistral 7B',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'open-mixtral-8x7b',
            label: 'Mistral 8x7B',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'open-mixtral-8x22b',
            label: 'Mistral 8x22B',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'open-codestral-mamba',
            label: 'Codestral Mamba',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'open-mistral-nemo',
            label: 'Mistral Nemo',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'ministral-8b-latest',
            label: 'Mistral 8B',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'mistral-small-latest',
            label: 'Mistral Small',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'codestral-latest',
            label: 'Codestral',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
          {
            name: 'mistral-large-latest',
            label: 'Mistral Large Latest',
            provider: 'Mistral',
            maxTokenAllowed: 8000,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'MISTRAL_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const mistral = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$mistral$40$1$2e$1$2e$17_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$mistral$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createMistral'
          ])({
            apiKey,
          });
          return mistral(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/ollama.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      /**
       * Provider Ollama AI pour MyBoltVision
       *
       * Ce module permet l'intégration avec Ollama pour l'exécution de modèles LLM localement.
       */ __turbopack_context__.s({
        OllamaProvider: () => OllamaProvider,
        default: () => __TURBOPACK__default__export__,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      class OllamaProvider {
        id = 'ollama';
        name = 'Ollama AI';
        description = 'Exécution locale de modèles LLM via Ollama';
        baseUrl;
        apiKey;
        defaultModel;
        constructor(options = {}) {
          this.baseUrl = options.baseUrl || 'http://localhost:11434';
          this.apiKey = options.apiKey; // Ollama ne nécessite généralement pas de clé API en local
          this.defaultModel = options.defaultModel || 'llama2';
        }
        async listModels() {
          try {
            const response = await fetch(`${this.baseUrl}/api/tags`);
            if (!response.ok) {
              throw new Error(`Erreur lors de la récupération des modèles: ${response.statusText}`);
            }
            const data = await response.json();
            return data.models.map((model) => ({
              id: model.name,
              name: model.name,
              provider: this.id,
              capabilities: ['chat', 'completion'],
              contextLength: model.parameters?.context_length || 4096,
              supportsFunctions: false,
              supportsVision: false,
            }));
          } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'logger'
            ].error(`[OllamaProvider] Erreur lors de la récupération des modèles`, error);
            return [];
          }
        }
        async chat(messages, model = this.defaultModel, options = {}) {
          try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                messages: messages.map((msg) => ({
                  role: msg.role,
                  content: msg.content,
                })),
                stream: false,
                options: {
                  temperature: options.temperature || 0.7,
                  top_p: options.top_p || 0.9,
                  max_tokens: options.max_tokens || 1024,
                },
              }),
            });
            if (!response.ok) {
              throw new Error(`Erreur lors de l'appel à l'API Ollama: ${response.statusText}`);
            }
            const data = await response.json();
            return {
              id: `ollama-${Date.now()}`,
              content: data.message.content,
              model,
              provider: this.id,
              usage: {
                promptTokens: -1,
                completionTokens: -1,
                totalTokens: -1,
              },
            };
          } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'logger'
            ].error(`[OllamaProvider] Erreur lors de l'appel au modèle`, error);
            throw new Error(
              `Erreur lors de l'appel au modèle Ollama: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
            );
          }
        }
        async completion(prompt, model = this.defaultModel, options = {}) {
          try {
            const response = await fetch(`${this.baseUrl}/api/generate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                prompt,
                stream: false,
                options: {
                  temperature: options.temperature || 0.7,
                  top_p: options.top_p || 0.9,
                  max_tokens: options.max_tokens || 1024,
                },
              }),
            });
            if (!response.ok) {
              throw new Error(`Erreur lors de l'appel à l'API Ollama: ${response.statusText}`);
            }
            const data = await response.json();
            return {
              id: `ollama-${Date.now()}`,
              content: data.response,
              model,
              provider: this.id,
              usage: {
                promptTokens: -1,
                completionTokens: -1,
                totalTokens: -1,
              },
            };
          } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'logger'
            ].error(`[OllamaProvider] Erreur lors de l'appel au modèle`, error);
            throw new Error(
              `Erreur lors de l'appel au modèle Ollama: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
            );
          }
        }
      }
      const __TURBOPACK__default__export__ = OllamaProvider;
    }
  },
  '[project]/lib/modules/llm/providers/open-router.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => OpenRouterProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$openrouter$2b$ai$2d$sdk$2d$provider$40$0$2e$4$2e$3_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$openrouter$2f$ai$2d$sdk$2d$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@openrouter+ai-sdk-provider@0.4.3_zod@3.24.2/node_modules/@openrouter/ai-sdk-provider/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class OpenRouterProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'OpenRouter';
        getApiKeyLink = 'https://openrouter.ai/settings/keys';
        config = {
          apiTokenKey: 'OPEN_ROUTER_API_KEY',
        };
        staticModels = [
          {
            name: 'anthropic/claude-3.5-sonnet',
            label: 'Anthropic: Claude 3.5 Sonnet (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'anthropic/claude-3-haiku',
            label: 'Anthropic: Claude 3 Haiku (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'deepseek/deepseek-coder',
            label: 'Deepseek-Coder V2 236B (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'google/gemini-flash-1.5',
            label: 'Google Gemini Flash 1.5 (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'google/gemini-pro-1.5',
            label: 'Google Gemini Pro 1.5 (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'x-ai/grok-beta',
            label: 'xAI Grok Beta (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'mistralai/mistral-nemo',
            label: 'OpenRouter Mistral Nemo (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'qwen/qwen-110b-chat',
            label: 'OpenRouter Qwen 110b Chat (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 8000,
          },
          {
            name: 'cohere/command',
            label: 'Cohere Command (OpenRouter)',
            provider: 'OpenRouter',
            maxTokenAllowed: 4096,
          },
        ];
        async getDynamicModels(_apiKeys, _settings, _serverEnv = {}) {
          try {
            const response = await fetch('https://openrouter.ai/api/v1/models', {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();
            return data.data
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((m) => ({
                name: m.id,
                label: `${m.name} - in:$${(m.pricing.prompt * 1_000_000).toFixed(2)} out:$${(m.pricing.completion * 1_000_000).toFixed(2)} - context ${Math.floor(m.context_length / 1000)}k`,
                provider: this.name,
                maxTokenAllowed: 8000,
              }));
          } catch (error) {
            console.error('Error getting OpenRouter models:', error);
            return [];
          }
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'OPEN_ROUTER_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const openRouter = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$openrouter$2b$ai$2d$sdk$2d$provider$40$0$2e$4$2e$3_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$openrouter$2f$ai$2d$sdk$2d$provider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenRouter'
          ])({
            apiKey,
          });
          const instance = openRouter.chat(model);
          return instance;
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/openai-like.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => OpenAILikeProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      class OpenAILikeProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'OpenAILike';
        getApiKeyLink = undefined;
        config = {
          baseUrlKey: 'OPENAI_LIKE_API_BASE_URL',
          apiTokenKey: 'OPENAI_LIKE_API_KEY',
        };
        staticModels = [];
        async getDynamicModels(apiKeys, settings, serverEnv = {}) {
          const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv,
            defaultBaseUrlKey: 'OPENAI_LIKE_API_BASE_URL',
            defaultApiTokenKey: 'OPENAI_LIKE_API_KEY',
          });
          if (!baseUrl || !apiKey) {
            return [];
          }
          const response = await fetch(`${baseUrl}/models`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const res = await response.json();
          return res.data.map((model) => ({
            name: model.id,
            label: model.id,
            provider: this.name,
            maxTokenAllowed: 8000,
          }));
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: 'OPENAI_LIKE_API_BASE_URL',
            defaultApiTokenKey: 'OPENAI_LIKE_API_KEY',
          });
          if (!baseUrl || !apiKey) {
            throw new Error(`Missing configuration for ${this.name} provider`);
          }
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'getOpenAILikeModel'
          ])(baseUrl, apiKey, model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/openai.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => OpenAIProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class OpenAIProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'OpenAI';
        getApiKeyLink = 'https://platform.openai.com/api-keys';
        config = {
          apiTokenKey: 'OPENAI_API_KEY',
        };
        staticModels = [
          {
            name: 'gpt-4o',
            label: 'GPT-4o',
            provider: 'OpenAI',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-4o-mini',
            label: 'GPT-4o Mini',
            provider: 'OpenAI',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-4-turbo',
            label: 'GPT-4 Turbo',
            provider: 'OpenAI',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-4',
            label: 'GPT-4',
            provider: 'OpenAI',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-3.5-turbo',
            label: 'GPT-3.5 Turbo',
            provider: 'OpenAI',
            maxTokenAllowed: 8000,
          },
        ];
        async getDynamicModels(apiKeys, settings, serverEnv) {
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'OPENAI_API_KEY',
          });
          if (!apiKey) {
            throw `Missing Api Key configuration for ${this.name} provider`;
          }
          const response = await fetch(`https://api.openai.com/v1/models`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const res = await response.json();
          const staticModelIds = this.staticModels.map((m) => m.name);
          const data = res.data.filter(
            (model) =>
              model.object === 'model' &&
              (model.id.startsWith('gpt-') || model.id.startsWith('o') || model.id.startsWith('chatgpt-')) &&
              !staticModelIds.includes(model.id),
          );
          return data.map((m) => ({
            name: m.id,
            label: `${m.id}`,
            provider: this.name,
            maxTokenAllowed: m.context_window || 32000,
          }));
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'OPENAI_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const openai = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            apiKey,
          });
          return openai(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/perplexity.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => PerplexityProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class PerplexityProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Perplexity';
        getApiKeyLink = 'https://www.perplexity.ai/settings/api';
        config = {
          apiTokenKey: 'PERPLEXITY_API_KEY',
        };
        staticModels = [
          {
            name: 'llama-3.1-sonar-small-128k-online',
            label: 'Sonar Small Online',
            provider: 'Perplexity',
            maxTokenAllowed: 8192,
          },
          {
            name: 'llama-3.1-sonar-large-128k-online',
            label: 'Sonar Large Online',
            provider: 'Perplexity',
            maxTokenAllowed: 8192,
          },
          {
            name: 'llama-3.1-sonar-huge-128k-online',
            label: 'Sonar Huge Online',
            provider: 'Perplexity',
            maxTokenAllowed: 8192,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'PERPLEXITY_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const perplexity = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: 'https://api.perplexity.ai/',
            apiKey,
          });
          return perplexity(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/together.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => TogetherProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      class TogetherProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Together';
        getApiKeyLink = 'https://api.together.xyz/settings/api-keys';
        config = {
          baseUrlKey: 'TOGETHER_API_BASE_URL',
          apiTokenKey: 'TOGETHER_API_KEY',
        };
        staticModels = [
          {
            name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
            label: 'Qwen/Qwen2.5-Coder-32B-Instruct',
            provider: 'Together',
            maxTokenAllowed: 8000,
          },
          {
            name: 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo',
            label: 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo',
            provider: 'Together',
            maxTokenAllowed: 8000,
          },
          {
            name: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            label: 'Mixtral 8x7B Instruct',
            provider: 'Together',
            maxTokenAllowed: 8192,
          },
        ];
        async getDynamicModels(apiKeys, settings, serverEnv = {}) {
          const { baseUrl: fetchBaseUrl, apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv,
            defaultBaseUrlKey: 'TOGETHER_API_BASE_URL',
            defaultApiTokenKey: 'TOGETHER_API_KEY',
          });
          const baseUrl = fetchBaseUrl || 'https://api.together.xyz/v1';
          if (!baseUrl || !apiKey) {
            return [];
          }
          // console.log({ baseUrl, apiKey });
          const response = await fetch(`${baseUrl}/models`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const res = await response.json();
          const data = (res || []).filter((model) => model.type === 'chat');
          return data.map((m) => ({
            name: m.id,
            label: `${m.display_name} - in:$${m.pricing.input.toFixed(2)} out:$${m.pricing.output.toFixed(2)} - context ${Math.floor(m.context_length / 1000)}k`,
            provider: this.name,
            maxTokenAllowed: 8000,
          }));
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { baseUrl, apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: 'TOGETHER_API_BASE_URL',
            defaultApiTokenKey: 'TOGETHER_API_KEY',
          });
          if (!baseUrl || !apiKey) {
            throw new Error(`Missing configuration for ${this.name} provider`);
          }
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'getOpenAILikeModel'
          ])(baseUrl, apiKey, model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/xai.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => XAIProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class XAIProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'xAI';
        getApiKeyLink = 'https://docs.x.ai/docs/quickstart#creating-an-api-key';
        config = {
          apiTokenKey: 'XAI_API_KEY',
        };
        staticModels = [
          {
            name: 'grok-beta',
            label: 'xAI Grok Beta',
            provider: 'xAI',
            maxTokenAllowed: 8000,
          },
          {
            name: 'grok-2-1212',
            label: 'xAI Grok2 1212',
            provider: 'xAI',
            maxTokenAllowed: 8000,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'XAI_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const openai = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: 'https://api.x.ai/v1',
            apiKey,
          });
          return openai(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/hyperbolic.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => HyperbolicProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class HyperbolicProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Hyperbolic';
        getApiKeyLink = 'https://app.hyperbolic.xyz/settings';
        config = {
          apiTokenKey: 'HYPERBOLIC_API_KEY',
        };
        staticModels = [
          {
            name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
            label: 'Qwen 2.5 Coder 32B Instruct',
            provider: 'Hyperbolic',
            maxTokenAllowed: 8192,
          },
          {
            name: 'Qwen/Qwen2.5-72B-Instruct',
            label: 'Qwen2.5-72B-Instruct',
            provider: 'Hyperbolic',
            maxTokenAllowed: 8192,
          },
          {
            name: 'deepseek-ai/DeepSeek-V2.5',
            label: 'DeepSeek-V2.5',
            provider: 'Hyperbolic',
            maxTokenAllowed: 8192,
          },
          {
            name: 'Qwen/QwQ-32B-Preview',
            label: 'QwQ-32B-Preview',
            provider: 'Hyperbolic',
            maxTokenAllowed: 8192,
          },
          {
            name: 'Qwen/Qwen2-VL-72B-Instruct',
            label: 'Qwen2-VL-72B-Instruct',
            provider: 'Hyperbolic',
            maxTokenAllowed: 8192,
          },
        ];
        async getDynamicModels(apiKeys, settings, serverEnv = {}) {
          const { baseUrl: fetchBaseUrl, apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: settings,
            serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'HYPERBOLIC_API_KEY',
          });
          const baseUrl = fetchBaseUrl || 'https://api.hyperbolic.xyz/v1';
          if (!apiKey) {
            throw `Missing Api Key configuration for ${this.name} provider`;
          }
          const response = await fetch(`${baseUrl}/models`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const res = await response.json();
          const data = res.data.filter((model) => model.object === 'model' && model.supports_chat);
          return data.map((m) => ({
            name: m.id,
            label: `${m.id} - context ${m.context_length ? Math.floor(m.context_length / 1000) + 'k' : 'N/A'}`,
            provider: this.name,
            maxTokenAllowed: m.context_length || 8000,
          }));
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'HYPERBOLIC_API_KEY',
          });
          if (!apiKey) {
            throw `Missing Api Key configuration for ${this.name} provider`;
          }
          const openai = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: 'https://api.hyperbolic.xyz/v1/',
            apiKey,
          });
          return openai(model);
        }
      }
    }
  },
  '[externals]/buffer [external] (buffer, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('buffer', () => require('buffer'));

      module.exports = mod;
    }
  },
  '[project]/lib/modules/llm/providers/amazon-bedrock.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => AmazonBedrockProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$amazon$2d$bedrock$40$2$2e$1$2e$3_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$amazon$2d$bedrock$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+amazon-bedrock@2.1.3_zod@3.24.2/node_modules/@ai-sdk/amazon-bedrock/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class AmazonBedrockProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'AmazonBedrock';
        getApiKeyLink = 'https://console.aws.amazon.com/iam/home';
        config = {
          apiTokenKey: 'AWS_BEDROCK_CONFIG',
        };
        staticModels = [
          {
            name: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
            label: 'Claude 3.5 Sonnet v2 (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 200000,
          },
          {
            name: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
            label: 'Claude 3.5 Sonnet (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 4096,
          },
          {
            name: 'anthropic.claude-3-sonnet-20240229-v1:0',
            label: 'Claude 3 Sonnet (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 4096,
          },
          {
            name: 'anthropic.claude-3-haiku-20240307-v1:0',
            label: 'Claude 3 Haiku (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 4096,
          },
          {
            name: 'amazon.nova-pro-v1:0',
            label: 'Amazon Nova Pro (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 5120,
          },
          {
            name: 'amazon.nova-lite-v1:0',
            label: 'Amazon Nova Lite (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 5120,
          },
          {
            name: 'mistral.mistral-large-2402-v1:0',
            label: 'Mistral Large 24.02 (Bedrock)',
            provider: 'AmazonBedrock',
            maxTokenAllowed: 8192,
          },
        ];
        _parseAndValidateConfig(apiKey) {
          let parsedConfig;
          try {
            parsedConfig = JSON.parse(apiKey);
          } catch {
            throw new Error(
              'Invalid AWS Bedrock configuration format. Please provide a valid JSON string containing region, accessKeyId, and secretAccessKey.',
            );
          }
          const { region, accessKeyId, secretAccessKey, sessionToken } = parsedConfig;
          if (!region || !accessKeyId || !secretAccessKey) {
            throw new Error(
              'Missing required AWS credentials. Configuration must include region, accessKeyId, and secretAccessKey.',
            );
          }
          return {
            region,
            accessKeyId,
            secretAccessKey,
            ...(sessionToken && {
              sessionToken,
            }),
          };
        }
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'AWS_BEDROCK_CONFIG',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const config = this._parseAndValidateConfig(apiKey);
          const bedrock = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$amazon$2d$bedrock$40$2$2e$1$2e$3_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$amazon$2d$bedrock$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createAmazonBedrock'
          ])(config);
          return bedrock(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/providers/github.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => GithubProvider,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@ai-sdk+openai@1.2.5_zod@3.24.2/node_modules/@ai-sdk/openai/dist/index.mjs [app-ssr] (ecmascript)',
        );
      class GithubProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'BaseProvider'
      ] {
        name = 'Github';
        getApiKeyLink = 'https://github.com/settings/personal-access-tokens';
        config = {
          apiTokenKey: 'GITHUB_API_KEY',
        };
        // find more in https://github.com/marketplace?type=models
        staticModels = [
          {
            name: 'gpt-4o',
            label: 'GPT-4o',
            provider: 'Github',
            maxTokenAllowed: 8000,
          },
          {
            name: 'o1',
            label: 'o1-preview',
            provider: 'Github',
            maxTokenAllowed: 100000,
          },
          {
            name: 'o1-mini',
            label: 'o1-mini',
            provider: 'Github',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-4o-mini',
            label: 'GPT-4o Mini',
            provider: 'Github',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-4-turbo',
            label: 'GPT-4 Turbo',
            provider: 'Github',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-4',
            label: 'GPT-4',
            provider: 'Github',
            maxTokenAllowed: 8000,
          },
          {
            name: 'gpt-3.5-turbo',
            label: 'GPT-3.5 Turbo',
            provider: 'Github',
            maxTokenAllowed: 8000,
          },
        ];
        getModelInstance(options) {
          const { model, serverEnv, apiKeys, providerSettings } = options;
          const { apiKey } = this.getProviderBaseUrlAndKey({
            apiKeys,
            providerSettings: providerSettings?.[this.name],
            serverEnv: serverEnv,
            defaultBaseUrlKey: '',
            defaultApiTokenKey: 'GITHUB_API_KEY',
          });
          if (!apiKey) {
            throw new Error(`Missing API key for ${this.name} provider`);
          }
          const openai = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$openai$40$1$2e$2$2e$5_zod$40$3$2e$24$2e$2$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createOpenAI'
          ])({
            baseURL: 'https://models.inference.ai.azure.com',
            apiKey,
          });
          return openai(model);
        }
      }
    }
  },
  '[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <locals>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({});
    }
  },
  '[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <module evaluation>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({});
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$anthropic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/anthropic.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$cohere$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/cohere.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$deepseek$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/deepseek.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$google$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/google.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$groq$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/groq.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$huggingface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/huggingface.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$lmstudio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/lmstudio.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$mistral$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/mistral.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$ollama$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/ollama.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$open$2d$router$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/open-router.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$openai$2d$like$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/openai-like.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$openai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/openai.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$perplexity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/perplexity.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$together$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/together.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$xai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/xai.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$hyperbolic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/hyperbolic.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$amazon$2d$bedrock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/amazon-bedrock.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$github$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/github.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <locals>');
    }
  },
  '[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <exports>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        AmazonBedrockProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$amazon$2d$bedrock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        AnthropicProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$anthropic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        CohereProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$cohere$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        DeepseekProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$deepseek$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        GithubProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$github$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        GoogleProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$google$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        GroqProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$groq$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        HuggingFaceProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$huggingface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        HyperbolicProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$hyperbolic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        LMStudioProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$lmstudio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        MistralProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$mistral$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        OllamaProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$ollama$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        OpenAILikeProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$openai$2d$like$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        OpenAIProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$openai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        OpenRouterProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$open$2d$router$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        PerplexityProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$perplexity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        TogetherProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$together$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
        XAIProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$xai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ],
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$anthropic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/anthropic.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$cohere$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/cohere.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$deepseek$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/deepseek.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$google$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/google.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$groq$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/groq.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$huggingface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/huggingface.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$lmstudio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/lmstudio.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$mistral$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/mistral.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$ollama$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/ollama.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$open$2d$router$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/open-router.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$openai$2d$like$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/openai-like.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$openai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/openai.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$perplexity$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/perplexity.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$together$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/together.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$xai$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/xai.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$hyperbolic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/hyperbolic.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$amazon$2d$bedrock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/amazon-bedrock.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$providers$2f$github$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/providers/github.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <locals>');
    }
  },
  '[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        AmazonBedrockProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'AmazonBedrockProvider'
          ],
        AnthropicProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'AnthropicProvider'
          ],
        CohereProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'CohereProvider'
          ],
        DeepseekProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'DeepseekProvider'
          ],
        GithubProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'GithubProvider'
          ],
        GoogleProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'GoogleProvider'
          ],
        GroqProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'GroqProvider'
          ],
        HuggingFaceProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'HuggingFaceProvider'
          ],
        HyperbolicProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'HyperbolicProvider'
          ],
        LMStudioProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'LMStudioProvider'
          ],
        MistralProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'MistralProvider'
          ],
        OllamaProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'OllamaProvider'
          ],
        OpenAILikeProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'OpenAILikeProvider'
          ],
        OpenAIProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'OpenAIProvider'
          ],
        OpenRouterProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'OpenRouterProvider'
          ],
        PerplexityProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'PerplexityProvider'
          ],
        TogetherProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'TogetherProvider'
          ],
        XAIProvider: () =>
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__[
            'XAIProvider'
          ],
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <module evaluation>');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$exports$3e$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <exports>');
    }
  },
  '[project]/lib/modules/llm/manager.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        LLMManager: () => LLMManager,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/base-provider.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript) <module evaluation>');
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/registry.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      const logger = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'createScopedLogger'
      ])('LLMManager');
      class LLMManager {
        static _instance;
        _providers = new Map();
        _modelList = [];
        _env = {};
        constructor(_env) {
          this._registerProvidersFromDirectory();
          this._env = _env;
        }
        static getInstance(env = {}) {
          if (!LLMManager._instance) {
            LLMManager._instance = new LLMManager(env);
          }
          return LLMManager._instance;
        }
        get env() {
          return this._env;
        }
        async _registerProvidersFromDirectory() {
          try {
            /*
             * Dynamically import all files from the providers directory
             * const providerModules = import.meta.glob('./providers/*.ts', { eager: true });
             */ // Look for exported classes that extend BaseProvider
            for (const exportedItem of Object.values(
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
            )) {
              if (
                typeof exportedItem === 'function' &&
                exportedItem.prototype instanceof
                  __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$base$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'BaseProvider'
                  ]
              ) {
                const provider = new exportedItem();
                try {
                  this.registerProvider(provider);
                } catch (error) {
                  logger.warn('Failed To Register Provider: ', provider.name, 'error:', error.message);
                }
              }
            }
          } catch (error) {
            logger.error('Error registering providers:', error);
          }
        }
        registerProvider(provider) {
          if (this._providers.has(provider.name)) {
            logger.warn(`Provider ${provider.name} is already registered. Skipping.`);
            return;
          }
          logger.info('Registering Provider: ', provider.name);
          this._providers.set(provider.name, provider);
          this._modelList = [...this._modelList, ...provider.staticModels];
        }
        getProvider(name) {
          return this._providers.get(name);
        }
        getAllProviders() {
          return Array.from(this._providers.values());
        }
        getModelList() {
          return this._modelList;
        }
        async updateModelList(options) {
          const { apiKeys, providerSettings, serverEnv } = options;
          let enabledProviders = Array.from(this._providers.values()).map((p) => p.name);
          if (providerSettings && Object.keys(providerSettings).length > 0) {
            enabledProviders = enabledProviders.filter((p) => providerSettings[p].enabled);
          }
          // Get dynamic models from all providers that support them
          const dynamicModels = await Promise.all(
            Array.from(this._providers.values())
              .filter((provider) => enabledProviders.includes(provider.name))
              .filter((provider) => !!provider.getDynamicModels)
              .map(async (provider) => {
                const cachedModels = provider.getModelsFromCache(options);
                if (cachedModels) {
                  return cachedModels;
                }
                const dynamicModels = await provider
                  .getDynamicModels(apiKeys, providerSettings?.[provider.name], serverEnv)
                  .then((models) => {
                    logger.info(`Caching ${models.length} dynamic models for ${provider.name}`);
                    provider.storeDynamicModels(options, models);
                    return models;
                  })
                  .catch((err) => {
                    logger.error(`Error getting dynamic models ${provider.name} :`, err);
                    return [];
                  });
                return dynamicModels;
              }),
          );
          const staticModels = Array.from(this._providers.values()).flatMap((p) => p.staticModels || []);
          const dynamicModelsFlat = dynamicModels.flat();
          const dynamicModelKeys = dynamicModelsFlat.map((d) => `${d.name}-${d.provider}`);
          const filteredStaticModesl = staticModels.filter(
            (m) => !dynamicModelKeys.includes(`${m.name}-${m.provider}`),
          );
          // Combine static and dynamic models
          const modelList = [...dynamicModelsFlat, ...filteredStaticModesl];
          modelList.sort((a, b) => a.name.localeCompare(b.name));
          this._modelList = modelList;
          return modelList;
        }
        getStaticModelList() {
          return [...this._providers.values()].flatMap((p) => p.staticModels || []);
        }
        async getModelListFromProvider(providerArg, options) {
          const provider = this._providers.get(providerArg.name);
          if (!provider) {
            throw new Error(`Provider ${providerArg.name} not found`);
          }
          const staticModels = provider.staticModels || [];
          if (!provider.getDynamicModels) {
            return staticModels;
          }
          const { apiKeys, providerSettings, serverEnv } = options;
          const cachedModels = provider.getModelsFromCache({
            apiKeys,
            providerSettings,
            serverEnv,
          });
          if (cachedModels) {
            logger.info(`Found ${cachedModels.length} cached models for ${provider.name}`);
            return [...cachedModels, ...staticModels];
          }
          logger.info(`Getting dynamic models for ${provider.name}`);
          const dynamicModels = await provider
            .getDynamicModels?.(apiKeys, providerSettings?.[provider.name], serverEnv)
            .then((models) => {
              logger.info(`Got ${models.length} dynamic models for ${provider.name}`);
              provider.storeDynamicModels(options, models);
              return models;
            })
            .catch((err) => {
              logger.error(`Error getting dynamic models ${provider.name} :`, err);
              return [];
            });
          const dynamicModelsName = dynamicModels.map((d) => d.name);
          const filteredStaticList = staticModels.filter((m) => !dynamicModelsName.includes(m.name));
          const modelList = [...dynamicModels, ...filteredStaticList];
          modelList.sort((a, b) => a.name.localeCompare(b.name));
          return modelList;
        }
        getStaticModelListFromProvider(providerArg) {
          const provider = this._providers.get(providerArg.name);
          if (!provider) {
            throw new Error(`Provider ${providerArg.name} not found`);
          }
          return [...(provider.staticModels || [])];
        }
        getDefaultProvider() {
          const firstProvider = this._providers.values().next().value;
          if (!firstProvider) {
            throw new Error('No providers registered');
          }
          return firstProvider;
        }
      }
    }
  },
  '[project]/utils/constants.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        DEFAULT_MODEL: () => DEFAULT_MODEL,
        DEFAULT_PROVIDER: () => DEFAULT_PROVIDER,
        MODEL_REGEX: () => MODEL_REGEX,
        MODIFICATIONS_TAG_NAME: () => MODIFICATIONS_TAG_NAME,
        PROMPT_COOKIE_KEY: () => PROMPT_COOKIE_KEY,
        PROVIDER_LIST: () => PROVIDER_LIST,
        PROVIDER_REGEX: () => PROVIDER_REGEX,
        STARTER_TEMPLATES: () => STARTER_TEMPLATES,
        WORK_DIR: () => WORK_DIR,
        WORK_DIR_NAME: () => WORK_DIR_NAME,
        providerBaseUrlEnvKeys: () => providerBaseUrlEnvKeys,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/lib/modules/llm/manager.ts [app-ssr] (ecmascript)');
      const __TURBOPACK__import$2e$meta__ = {
        get url() {
          return `file://${__turbopack_context__.P('utils/constants.ts')}`;
        },
      };
      const WORK_DIR_NAME = 'project';
      const WORK_DIR = `/home/${WORK_DIR_NAME}`;
      const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
      const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
      const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
      const DEFAULT_MODEL = 'claude-3-5-sonnet-latest';
      const PROMPT_COOKIE_KEY = 'cachedPrompt';
      const llmManager =
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modules$2f$llm$2f$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'LLMManager'
        ].getInstance(__TURBOPACK__import$2e$meta__.env);
      const PROVIDER_LIST = llmManager.getAllProviders();
      const DEFAULT_PROVIDER = llmManager.getDefaultProvider();
      const providerBaseUrlEnvKeys = {};
      PROVIDER_LIST.forEach((provider) => {
        providerBaseUrlEnvKeys[provider.name] = {
          baseUrlKey: provider.config.baseUrlKey,
          apiTokenKey: provider.config.apiTokenKey,
        };
      });
      const STARTER_TEMPLATES = [
        {
          name: 'bolt-astro-basic',
          label: 'Astro Basic',
          description: 'Lightweight Astro starter template for building fast static websites',
          githubRepo: 'thecodacus/bolt-astro-basic-template',
          tags: ['astro', 'blog', 'performance'],
          icon: 'i-bolt:astro',
        },
        {
          name: 'bolt-nextjs-shadcn',
          label: 'Next.js with shadcn/ui',
          description: 'Next.js starter fullstack template integrated with shadcn/ui components and styling system',
          githubRepo: 'thecodacus/bolt-nextjs-shadcn-template',
          tags: ['nextjs', 'react', 'typescript', 'shadcn', 'tailwind'],
          icon: 'i-bolt:nextjs',
        },
        {
          name: 'bolt-qwik-ts',
          label: 'Qwik TypeScript',
          description: 'Qwik framework starter with TypeScript for building resumable applications',
          githubRepo: 'thecodacus/bolt-qwik-ts-template',
          tags: ['qwik', 'typescript', 'performance', 'resumable'],
          icon: 'i-bolt:qwik',
        },
        {
          name: 'bolt-remix-ts',
          label: 'Remix TypeScript',
          description: 'Remix framework starter with TypeScript for full-stack web applications',
          githubRepo: 'thecodacus/bolt-remix-ts-template',
          tags: ['remix', 'typescript', 'fullstack', 'react'],
          icon: 'i-bolt:remix',
        },
        {
          name: 'bolt-slidev',
          label: 'Slidev Presentation',
          description: 'Slidev starter template for creating developer-friendly presentations using Markdown',
          githubRepo: 'thecodacus/bolt-slidev-template',
          tags: ['slidev', 'presentation', 'markdown'],
          icon: 'i-bolt:slidev',
        },
        {
          name: 'bolt-sveltekit',
          label: 'SvelteKit',
          description: 'SvelteKit starter template for building fast, efficient web applications',
          githubRepo: 'bolt-sveltekit-template',
          tags: ['svelte', 'sveltekit', 'typescript'],
          icon: 'i-bolt:svelte',
        },
        {
          name: 'vanilla-vite',
          label: 'Vanilla + Vite',
          description: 'Minimal Vite starter template for vanilla JavaScript projects',
          githubRepo: 'thecodacus/vanilla-vite-template',
          tags: ['vite', 'vanilla-js', 'minimal'],
          icon: 'i-bolt:vite',
        },
        {
          name: 'bolt-vite-react',
          label: 'React + Vite + typescript',
          description: 'React starter template powered by Vite for fast development experience',
          githubRepo: 'thecodacus/bolt-vite-react-ts-template',
          tags: ['react', 'vite', 'frontend'],
          icon: 'i-bolt:react',
        },
        {
          name: 'bolt-vite-ts',
          label: 'Vite + TypeScript',
          description: 'Vite starter template with TypeScript configuration for type-safe development',
          githubRepo: 'thecodacus/bolt-vite-ts-template',
          tags: ['vite', 'typescript', 'minimal'],
          icon: 'i-bolt:typescript',
        },
        {
          name: 'bolt-vue',
          label: 'Vue.js',
          description: 'Vue.js starter template with modern tooling and best practices',
          githubRepo: 'thecodacus/bolt-vue-template',
          tags: ['vue', 'typescript', 'frontend'],
          icon: 'i-bolt:vue',
        },
        {
          name: 'bolt-angular',
          label: 'Angular Starter',
          description: 'A modern Angular starter template with TypeScript support and best practices configuration',
          githubRepo: 'thecodacus/bolt-angular-template',
          tags: ['angular', 'typescript', 'frontend', 'spa'],
          icon: 'i-bolt:angular',
        },
      ];
    }
  },
  '[project]/utils/stacktrace.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      /**
       * Cleans webcontainer URLs from stack traces to show relative paths instead
       */ __turbopack_context__.s({
        cleanStackTrace: () => cleanStackTrace,
      });
      function cleanStackTrace(stackTrace) {
        // Function to clean a single URL
        const cleanUrl = (url) => {
          const regex = /^https?:\/\/[^\/]+\.webcontainer-api\.io(\/.*)?$/;
          if (!regex.test(url)) {
            return url;
          }
          const pathRegex = /^https?:\/\/[^\/]+\.webcontainer-api\.io\/(.*?)$/;
          const match = url.match(pathRegex);
          return match?.[1] || '';
        };
        // Split the stack trace into lines and process each line
        return stackTrace
          .split('\n')
          .map((line) => {
            // Match any URL in the line that contains webcontainer-api.io
            return line.replace(/(https?:\/\/[^\/]+\.webcontainer-api\.io\/[^\s\)]+)/g, (match) => cleanUrl(match));
          })
          .join('\n');
      }
    }
  },
  '[project]/lib/webcontainer/index.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        webcontainer: () => webcontainer,
        webcontainerContext: () => webcontainerContext,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$webcontainer$2b$api$40$1$2e$5$2e$1$2d$internal$2e$9$2f$node_modules$2f40$webcontainer$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@webcontainer+api@1.5.1-internal.9/node_modules/@webcontainer/api/dist/index.js [app-ssr] (ecmascript) <module evaluation>',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$webcontainer$2b$api$40$1$2e$5$2e$1$2d$internal$2e$9$2f$node_modules$2f40$webcontainer$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/@webcontainer+api@1.5.1-internal.9/node_modules/@webcontainer/api/dist/index.js [app-ssr] (ecmascript) <locals>',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/constants.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$stacktrace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/stacktrace.ts [app-ssr] (ecmascript)');
      const __TURBOPACK__import$2e$meta__ = {
        get url() {
          return `file://${__turbopack_context__.P('lib/webcontainer/index.ts')}`;
        },
      };
      const webcontainerContext = __TURBOPACK__import$2e$meta__.hot?.data?.webcontainerContext ?? {
        loaded: false,
      };
      if (__TURBOPACK__import$2e$meta__.hot?.data) {
        __TURBOPACK__import$2e$meta__.hot.data.webcontainerContext = webcontainerContext;
      }
      let webcontainer = new Promise(() => {
        // noop for ssr
      });
      if (!__TURBOPACK__import$2e$meta__.env.SSR) {
        webcontainer =
          __TURBOPACK__import$2e$meta__.hot?.data.webcontainer ??
          Promise.resolve()
            .then(() => {
              return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$webcontainer$2b$api$40$1$2e$5$2e$1$2d$internal$2e$9$2f$node_modules$2f40$webcontainer$2f$api$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                'WebContainer'
              ].boot({
                coep: 'credentialless',
                workdirName:
                  __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'WORK_DIR_NAME'
                  ],
                forwardPreviewErrors: true,
              });
            })
            .then(async (webcontainer) => {
              webcontainerContext.loaded = true;
              const { workbenchStore } = await __turbopack_context__.r(
                '[project]/lib/stores/workbench.ts [app-ssr] (ecmascript, async loader)',
              )(__turbopack_context__.i);
              // Listen for preview errors
              webcontainer.on('preview-message', (message) => {
                console.log('WebContainer preview message:', message);
                // Handle both uncaught exceptions and unhandled promise rejections
                if (message.type === 'PREVIEW_UNCAUGHT_EXCEPTION' || message.type === 'PREVIEW_UNHANDLED_REJECTION') {
                  const isPromise = message.type === 'PREVIEW_UNHANDLED_REJECTION';
                  workbenchStore.actionAlert.set({
                    type: 'preview',
                    title: isPromise ? 'Unhandled Promise Rejection' : 'Uncaught Exception',
                    description: message.message,
                    content: `Error occurred at ${message.pathname}${message.search}${message.hash}\nPort: ${message.port}\n\nStack trace:\n${(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$stacktrace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['cleanStackTrace'])(message.stack || '')}`,
                    source: 'preview',
                  });
                }
              });
              return webcontainer;
            });
        if (__TURBOPACK__import$2e$meta__.hot) {
          __TURBOPACK__import$2e$meta__.hot.data.webcontainer = webcontainer;
        }
      }
    }
  },
  '[project]/lib/stores/editor.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        EditorStore: () => EditorStore,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$computed$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/computed/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/map/index.js [app-ssr] (ecmascript)',
        );
      const __TURBOPACK__import$2e$meta__ = {
        get url() {
          return `file://${__turbopack_context__.P('lib/stores/editor.ts')}`;
        },
      };
      class EditorStore {
        #filesStore;
        selectedFile =
          __TURBOPACK__import$2e$meta__.hot?.data.selectedFile ??
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'atom'
          ])();
        documents =
          __TURBOPACK__import$2e$meta__.hot?.data.documents ??
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'map'
          ])({});
        currentDocument = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$computed$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'computed'
        ])([this.documents, this.selectedFile], (documents, selectedFile) => {
          if (!selectedFile) {
            return undefined;
          }
          return documents[selectedFile];
        });
        constructor(filesStore) {
          this.#filesStore = filesStore;
          if (__TURBOPACK__import$2e$meta__.hot) {
            __TURBOPACK__import$2e$meta__.hot.data.documents = this.documents;
            __TURBOPACK__import$2e$meta__.hot.data.selectedFile = this.selectedFile;
          }
        }
        setDocuments(files) {
          const previousDocuments = this.documents.value;
          this.documents.set(
            Object.fromEntries(
              Object.entries(files)
                .map(([filePath, dirent]) => {
                  if (dirent === undefined || dirent.type === 'folder') {
                    return undefined;
                  }
                  const previousDocument = previousDocuments?.[filePath];
                  return [
                    filePath,
                    {
                      value: dirent.content,
                      filePath,
                      scroll: previousDocument?.scroll,
                    },
                  ];
                })
                .filter(Boolean),
            ),
          );
        }
        setSelectedFile(filePath) {
          this.selectedFile.set(filePath);
        }
        updateScrollPosition(filePath, position) {
          const documents = this.documents.get();
          const documentState = documents[filePath];
          if (!documentState) {
            return;
          }
          this.documents.setKey(filePath, {
            ...documentState,
            scroll: position,
          });
        }
        updateFile(filePath, newContent) {
          const documents = this.documents.get();
          const documentState = documents[filePath];
          if (!documentState) {
            return;
          }
          const currentContent = documentState.value;
          const contentChanged = currentContent !== newContent;
          if (contentChanged) {
            this.documents.setKey(filePath, {
              ...documentState,
              value: newContent,
            });
          }
        }
      }
    }
  },
  '[externals]/node:buffer [external] (node:buffer, cjs)': function (__turbopack_context__) {
    var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
    {
      const mod = __turbopack_context__.x('node:buffer', () => require('node:buffer'));

      module.exports = mod;
    }
  },
  '[project]/utils/buffer.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        bufferWatchEvents: () => bufferWatchEvents,
      });
      function bufferWatchEvents(timeInMs, cb) {
        let timeoutId;
        let events = [];
        // keep track of the processing of the previous batch so we can wait for it
        let processing = Promise.resolve();
        const scheduleBufferTick = () => {
          timeoutId = self.setTimeout(async () => {
            // we wait until the previous batch is entirely processed so events are processed in order
            await processing;
            if (events.length > 0) {
              processing = Promise.resolve(cb(events));
            }
            timeoutId = undefined;
            events = [];
          }, timeInMs);
        };
        return (...args) => {
          events.push(args);
          if (!timeoutId) {
            scheduleBufferTick();
          }
        };
      }
    }
  },
  '[project]/utils/diff.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        computeFileModifications: () => computeFileModifications,
        diffFiles: () => diffFiles,
        extractRelativePath: () => extractRelativePath,
        fileModificationsToHTML: () => fileModificationsToHTML,
        modificationsRegex: () => modificationsRegex,
      });
      (() => {
        const e = new Error("Cannot find module 'diff'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      })();
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/constants.ts [app-ssr] (ecmascript)');
      const modificationsRegex = new RegExp(
        `^<${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['MODIFICATIONS_TAG_NAME']}>[\\s\\S]*?<\\/${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['MODIFICATIONS_TAG_NAME']}>\\s+`,
        'g',
      );
      function computeFileModifications(files, modifiedFiles) {
        const modifications = {};
        let hasModifiedFiles = false;
        for (const [filePath, originalContent] of modifiedFiles) {
          const file = files[filePath];
          if (file?.type !== 'file') {
            continue;
          }
          const unifiedDiff = diffFiles(filePath, originalContent, file.content);
          if (!unifiedDiff) {
            continue;
          }
          hasModifiedFiles = true;
          if (unifiedDiff.length > file.content.length) {
            // if there are lots of changes we simply grab the current file content since it's smaller than the diff
            modifications[filePath] = {
              type: 'file',
              content: file.content,
            };
          } else {
            // otherwise we use the diff since it's smaller
            modifications[filePath] = {
              type: 'diff',
              content: unifiedDiff,
            };
          }
        }
        if (!hasModifiedFiles) {
          return undefined;
        }
        return modifications;
      }
      function diffFiles(fileName, oldFileContent, newFileContent) {
        let unifiedDiff = createTwoFilesPatch(fileName, fileName, oldFileContent, newFileContent);
        const patchHeaderEnd = `--- ${fileName}\n+++ ${fileName}\n`;
        const headerEndIndex = unifiedDiff.indexOf(patchHeaderEnd);
        if (headerEndIndex >= 0) {
          unifiedDiff = unifiedDiff.slice(headerEndIndex + patchHeaderEnd.length);
        }
        if (unifiedDiff === '') {
          return undefined;
        }
        return unifiedDiff;
      }
      const regex = new RegExp(
        `^${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['WORK_DIR']}\/`,
      );
      function extractRelativePath(filePath) {
        return filePath.replace(regex, '');
      }
      function fileModificationsToHTML(modifications) {
        const entries = Object.entries(modifications);
        if (entries.length === 0) {
          return undefined;
        }
        const result = [
          `<${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['MODIFICATIONS_TAG_NAME']}>`,
        ];
        for (const [filePath, { type, content }] of entries) {
          result.push(`<${type} path=${JSON.stringify(filePath)}>`, content, `</${type}>`);
        }
        result.push(
          `</${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['MODIFICATIONS_TAG_NAME']}>`,
        );
        return result.join('\n');
      }
    }
  },
  '[project]/lib/stores/files.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        FilesStore: () => FilesStore,
      });
      (() => {
        const e = new Error("Cannot find module 'istextorbinary'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      })();
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/map/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ =
        __turbopack_context__.i('[externals]/node:buffer [external] (node:buffer, cjs)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/path.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$buffer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/buffer.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/constants.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/diff.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/unreachable.ts [app-ssr] (ecmascript)');
      const __TURBOPACK__import$2e$meta__ = {
        get url() {
          return `file://${__turbopack_context__.P('lib/stores/files.ts')}`;
        },
      };
      const logger = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'createScopedLogger'
      ])('FilesStore');
      const utf8TextDecoder = new TextDecoder('utf8', {
        fatal: true,
      });
      class FilesStore {
        #webcontainer;
        /**
         * Tracks the number of files without folders.
         */ #size = 0;
        /**
         * @note Keeps track all modified files with their original content since the last user message.
         * Needs to be reset when the user sends another message and all changes have to be submitted
         * for the model to be aware of the changes.
         */ #modifiedFiles = __TURBOPACK__import$2e$meta__.hot?.data.modifiedFiles ?? new Map();
        /**
         * Map of files that matches the state of WebContainer.
         */ files =
          __TURBOPACK__import$2e$meta__.hot?.data.files ??
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'map'
          ])({});
        get filesCount() {
          return this.#size;
        }
        constructor(webcontainerPromise) {
          this.#webcontainer = webcontainerPromise;
          if (__TURBOPACK__import$2e$meta__.hot) {
            __TURBOPACK__import$2e$meta__.hot.data.files = this.files;
            __TURBOPACK__import$2e$meta__.hot.data.modifiedFiles = this.#modifiedFiles;
          }
          this.#init();
        }
        getFile(filePath) {
          const dirent = this.files.get()[filePath];
          if (dirent?.type !== 'file') {
            return undefined;
          }
          return dirent;
        }
        getFileModifications() {
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'computeFileModifications'
          ])(this.files.get(), this.#modifiedFiles);
        }
        resetFileModifications() {
          this.#modifiedFiles.clear();
        }
        async saveFile(filePath, content) {
          const webcontainer = await this.#webcontainer;
          try {
            const relativePath =
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'path'
              ].relative(webcontainer.workdir, filePath);
            if (!relativePath) {
              throw new Error(`EINVAL: invalid file path, write '${relativePath}'`);
            }
            const oldContent = this.getFile(filePath)?.content;
            if (!oldContent) {
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'unreachable'
              ])('Expected content to be defined');
            }
            await webcontainer.fs.writeFile(relativePath, content);
            if (!this.#modifiedFiles.has(filePath)) {
              this.#modifiedFiles.set(filePath, oldContent);
            }
            // we immediately update the file and don't rely on the `change` event coming from the watcher
            this.files.setKey(filePath, {
              type: 'file',
              content,
              isBinary: false,
            });
            logger.info('File updated');
          } catch (error) {
            logger.error('Failed to update file content\n\n', error);
            throw error;
          }
        }
        async #init() {
          const webcontainer = await this.#webcontainer;
          webcontainer.internal.watchPaths(
            {
              include: [
                `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['WORK_DIR']}/**`,
              ],
              exclude: ['**/node_modules', '.git'],
              includeContent: true,
            },
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$buffer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'bufferWatchEvents'
            ])(100, this.#processEventBuffer.bind(this)),
          );
        }
        #processEventBuffer(events) {
          const watchEvents = events.flat(2);
          for (const { type, path, buffer } of watchEvents) {
            // remove any trailing slashes
            const sanitizedPath = path.replace(/\/+$/g, '');
            switch (type) {
              case 'add_dir': {
                // we intentionally add a trailing slash so we can distinguish files from folders in the file tree
                this.files.setKey(sanitizedPath, {
                  type: 'folder',
                });
                break;
              }
              case 'remove_dir': {
                this.files.setKey(sanitizedPath, undefined);
                for (const [direntPath] of Object.entries(this.files)) {
                  if (direntPath.startsWith(sanitizedPath)) {
                    this.files.setKey(direntPath, undefined);
                  }
                }
                break;
              }
              case 'add_file':
              case 'change': {
                if (type === 'add_file') {
                  this.#size++;
                }
                let content = '';
                /**
                 * @note This check is purely for the editor. The way we detect this is not
                 * bullet-proof and it's a best guess so there might be false-positives.
                 * The reason we do this is because we don't want to display binary files
                 * in the editor nor allow to edit them.
                 */ const isBinary = isBinaryFile(buffer);
                if (!isBinary) {
                  content = this.#decodeFileContent(buffer);
                }
                this.files.setKey(sanitizedPath, {
                  type: 'file',
                  content,
                  isBinary,
                });
                break;
              }
              case 'remove_file': {
                this.#size--;
                this.files.setKey(sanitizedPath, undefined);
                break;
              }
              case 'update_directory': {
                break;
              }
            }
          }
        }
        #decodeFileContent(buffer) {
          if (!buffer || buffer.byteLength === 0) {
            return '';
          }
          try {
            return utf8TextDecoder.decode(buffer);
          } catch (error) {
            console.log(error);
            return '';
          }
        }
      }
      function isBinaryFile(buffer) {
        if (buffer === undefined) {
          return false;
        }
        return (
          getEncoding(convertToBuffer(buffer), {
            chunkLength: 100,
          }) === 'binary'
        );
      }
      /**
       * Converts a `Uint8Array` into a Node.js `Buffer` by copying the prototype.
       * The goal is to  avoid expensive copies. It does create a new typed array
       * but that's generally cheap as long as it uses the same underlying
       * array buffer.
       */ function convertToBuffer(view) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__[
          'Buffer'
        ].from(view.buffer, view.byteOffset, view.byteLength);
      }
    }
  },
  '[project]/lib/stores/previews.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        PreviewsStore: () => PreviewsStore,
        usePreviewStore: () => usePreviewStore,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
        );
      // Create a broadcast channel for preview updates
      const PREVIEW_CHANNEL = 'preview-updates';
      class PreviewsStore {
        #availablePreviews = new Map();
        #webcontainer;
        #broadcastChannel;
        #lastUpdate = new Map();
        #watchedFiles = new Set();
        #refreshTimeouts = new Map();
        #REFRESH_DELAY = 300;
        #storageChannel;
        previews = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])([]);
        constructor(webcontainerPromise) {
          this.#webcontainer = webcontainerPromise;
          this.#broadcastChannel = new BroadcastChannel(PREVIEW_CHANNEL);
          this.#storageChannel = new BroadcastChannel('storage-sync-channel');
          // Listen for preview updates from other tabs
          this.#broadcastChannel.onmessage = (event) => {
            const { type, previewId } = event.data;
            if (type === 'file-change') {
              const timestamp = event.data.timestamp;
              const lastUpdate = this.#lastUpdate.get(previewId) || 0;
              if (timestamp > lastUpdate) {
                this.#lastUpdate.set(previewId, timestamp);
                this.refreshPreview(previewId);
              }
            }
          };
          // Listen for storage sync messages
          this.#storageChannel.onmessage = (event) => {
            const { storage, source } = event.data;
            if (storage && source !== this._getTabId()) {
              this._syncStorage(storage);
            }
          };
          // Override localStorage setItem to catch all changes
          if (('TURBOPACK compile-time falsy', 0)) {
            ('TURBOPACK unreachable');
          }
          this.#init();
        }
        // Generate a unique ID for this tab
        _getTabId() {
          if (('TURBOPACK compile-time falsy', 0)) {
            ('TURBOPACK unreachable');
          }
          return '';
        }
        // Sync storage data between tabs
        _syncStorage(storage) {
          if (('TURBOPACK compile-time falsy', 0)) {
            ('TURBOPACK unreachable');
          }
        }
        // Broadcast storage state to other tabs
        _broadcastStorageSync() {
          if (('TURBOPACK compile-time falsy', 0)) {
            ('TURBOPACK unreachable');
          }
        }
        async #init() {
          const webcontainer = await this.#webcontainer;
          // Listen for server ready events
          webcontainer.on('server-ready', (port, url) => {
            console.log('[Preview] Server ready on port:', port, url);
            this.broadcastUpdate(url);
            // Initial storage sync when preview is ready
            this._broadcastStorageSync();
          });
          try {
            // Watch for file changes
            const watcher = await webcontainer.fs.watch('**/*', {
              persistent: true,
            });
            // Use the native watch events
            watcher.addEventListener('change', async () => {
              const previews = this.previews.get();
              for (const preview of previews) {
                const previewId = this.getPreviewId(preview.baseUrl);
                if (previewId) {
                  this.broadcastFileChange(previewId);
                }
              }
            });
            // Watch for DOM changes that might affect storage
            if (('TURBOPACK compile-time falsy', 0)) {
              ('TURBOPACK unreachable');
            }
          } catch (error) {
            console.error('[Preview] Error setting up watchers:', error);
          }
          // Listen for port events
          webcontainer.on('port', (port, type, url) => {
            let previewInfo = this.#availablePreviews.get(port);
            if (type === 'close' && previewInfo) {
              this.#availablePreviews.delete(port);
              this.previews.set(this.previews.get().filter((preview) => preview.port !== port));
              return;
            }
            const previews = this.previews.get();
            if (!previewInfo) {
              previewInfo = {
                port,
                ready: type === 'open',
                baseUrl: url,
              };
              this.#availablePreviews.set(port, previewInfo);
              previews.push(previewInfo);
            }
            previewInfo.ready = type === 'open';
            previewInfo.baseUrl = url;
            this.previews.set([...previews]);
            if (type === 'open') {
              this.broadcastUpdate(url);
            }
          });
        }
        // Helper to extract preview ID from URL
        getPreviewId(url) {
          const match = url.match(/^https?:\/\/([^.]+)\.local-credentialless\.webcontainer-api\.io/);
          return match ? match[1] : null;
        }
        // Broadcast state change to all tabs
        broadcastStateChange(previewId) {
          const timestamp = Date.now();
          this.#lastUpdate.set(previewId, timestamp);
          this.#broadcastChannel.postMessage({
            type: 'state-change',
            previewId,
            timestamp,
          });
        }
        // Broadcast file change to all tabs
        broadcastFileChange(previewId) {
          const timestamp = Date.now();
          this.#lastUpdate.set(previewId, timestamp);
          this.#broadcastChannel.postMessage({
            type: 'file-change',
            previewId,
            timestamp,
          });
        }
        // Broadcast update to all tabs
        broadcastUpdate(url) {
          const previewId = this.getPreviewId(url);
          if (previewId) {
            const timestamp = Date.now();
            this.#lastUpdate.set(previewId, timestamp);
            this.#broadcastChannel.postMessage({
              type: 'file-change',
              previewId,
              timestamp,
            });
          }
        }
        // Method to refresh a specific preview
        refreshPreview(previewId) {
          // Clear any pending refresh for this preview
          const existingTimeout = this.#refreshTimeouts.get(previewId);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }
          // Set a new timeout for this refresh
          const timeout = setTimeout(() => {
            const previews = this.previews.get();
            const preview = previews.find((p) => this.getPreviewId(p.baseUrl) === previewId);
            if (preview) {
              preview.ready = false;
              this.previews.set([...previews]);
              requestAnimationFrame(() => {
                preview.ready = true;
                this.previews.set([...previews]);
              });
            }
            this.#refreshTimeouts.delete(previewId);
          }, this.#REFRESH_DELAY);
          this.#refreshTimeouts.set(previewId, timeout);
        }
      }
      // Create a singleton instance
      let previewsStore = null;
      function usePreviewStore() {
        if (!previewsStore) {
          /*
           * Initialize with a Promise that resolves to WebContainer
           * This should match how you're initializing WebContainer elsewhere
           */ previewsStore = new PreviewsStore(Promise.resolve({}));
        }
        return previewsStore;
      }
    }
  },
  '[project]/utils/promises.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        withResolvers: () => withResolvers,
      });
      function withResolvers() {
        if (typeof Promise.withResolvers === 'function') {
          return Promise.withResolvers();
        }
        let resolve;
        let reject;
        const promise = new Promise((_resolve, _reject) => {
          resolve = _resolve;
          reject = _reject;
        });
        return {
          resolve,
          reject,
          promise,
        };
      }
    }
  },
  '[project]/utils/shell.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        BoltShell: () => BoltShell,
        cleanTerminalOutput: () => cleanTerminalOutput,
        newBoltShellProcess: () => newBoltShellProcess,
        newShellProcess: () => newShellProcess,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$promises$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/promises.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
        );
      async function newShellProcess(webcontainer, terminal) {
        const args = [];
        // we spawn a JSH process with a fallback cols and rows in case the process is not attached yet to a visible terminal
        const process = await webcontainer.spawn('/bin/jsh', ['--osc', ...args], {
          terminal: {
            cols: terminal.cols ?? 80,
            rows: terminal.rows ?? 15,
          },
        });
        const input = process.input.getWriter();
        const output = process.output;
        const jshReady = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$promises$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'withResolvers'
        ])();
        let isInteractive = false;
        output.pipeTo(
          new WritableStream({
            write(data) {
              if (!isInteractive) {
                const [, osc] = data.match(/\x1b\]654;([^\x07]+)\x07/) || [];
                if (osc === 'interactive') {
                  // wait until we see the interactive OSC
                  isInteractive = true;
                  jshReady.resolve();
                }
              }
              terminal.write(data);
            },
          }),
        );
        terminal.onData((data) => {
          // console.log('terminal onData', { data, isInteractive });
          if (isInteractive) {
            input.write(data);
          }
        });
        await jshReady.promise;
        return process;
      }
      class BoltShell {
        #initialized;
        #readyPromise;
        #webcontainer;
        #terminal;
        #process;
        executionState = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])();
        #outputStream;
        #shellInputStream;
        constructor() {
          this.#readyPromise = new Promise((resolve) => {
            this.#initialized = resolve;
          });
        }
        ready() {
          return this.#readyPromise;
        }
        async init(webcontainer, terminal) {
          this.#webcontainer = webcontainer;
          this.#terminal = terminal;
          const { process, output } = await this.newBoltShellProcess(webcontainer, terminal);
          this.#process = process;
          this.#outputStream = output.getReader();
          await this.waitTillOscCode('interactive');
          this.#initialized?.();
        }
        get terminal() {
          return this.#terminal;
        }
        get process() {
          return this.#process;
        }
        async executeCommand(sessionId, command, abort) {
          if (!this.process || !this.terminal) {
            return undefined;
          }
          const state = this.executionState.get();
          if (state?.active && state.abort) {
            state.abort();
          }
          /*
           * interrupt the current execution
           *  this.#shellInputStream?.write('\x03');
           */ this.terminal.input('\x03');
          await this.waitTillOscCode('prompt');
          if (state && state.executionPrms) {
            await state.executionPrms;
          }
          //start a new execution
          this.terminal.input(command.trim() + '\n');
          //wait for the execution to finish
          const executionPromise = this.getCurrentExecutionResult();
          this.executionState.set({
            sessionId,
            active: true,
            executionPrms: executionPromise,
            abort,
          });
          const resp = await executionPromise;
          this.executionState.set({
            sessionId,
            active: false,
          });
          if (resp) {
            try {
              resp.output = cleanTerminalOutput(resp.output);
            } catch (error) {
              console.log('failed to format terminal output', error);
            }
          }
          return resp;
        }
        async newBoltShellProcess(webcontainer, terminal) {
          const args = [];
          // we spawn a JSH process with a fallback cols and rows in case the process is not attached yet to a visible terminal
          const process = await webcontainer.spawn('/bin/jsh', ['--osc', ...args], {
            terminal: {
              cols: terminal.cols ?? 80,
              rows: terminal.rows ?? 15,
            },
          });
          const input = process.input.getWriter();
          this.#shellInputStream = input;
          const [internalOutput, terminalOutput] = process.output.tee();
          const jshReady = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$promises$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'withResolvers'
          ])();
          let isInteractive = false;
          terminalOutput.pipeTo(
            new WritableStream({
              write(data) {
                if (!isInteractive) {
                  const [, osc] = data.match(/\x1b\]654;([^\x07]+)\x07/) || [];
                  if (osc === 'interactive') {
                    // wait until we see the interactive OSC
                    isInteractive = true;
                    jshReady.resolve();
                  }
                }
                terminal.write(data);
              },
            }),
          );
          terminal.onData((data) => {
            // console.log('terminal onData', { data, isInteractive });
            if (isInteractive) {
              input.write(data);
            }
          });
          await jshReady.promise;
          return {
            process,
            output: internalOutput,
          };
        }
        async getCurrentExecutionResult() {
          const { output, exitCode } = await this.waitTillOscCode('exit');
          return {
            output,
            exitCode,
          };
        }
        async waitTillOscCode(waitCode) {
          let fullOutput = '';
          let exitCode = 0;
          if (!this.#outputStream) {
            return {
              output: fullOutput,
              exitCode,
            };
          }
          const tappedStream = this.#outputStream;
          while (true) {
            const { value, done } = await tappedStream.read();
            if (done) {
              break;
            }
            const text = value || '';
            fullOutput += text;
            // Check if command completion signal with exit code
            const [, osc, , , code] = text.match(/\x1b\]654;([^\x07=]+)=?((-?\d+):(\d+))?\x07/) || [];
            if (osc === 'exit') {
              exitCode = parseInt(code, 10);
            }
            if (osc === waitCode) {
              break;
            }
          }
          return {
            output: fullOutput,
            exitCode,
          };
        }
      }
      function cleanTerminalOutput(input) {
        // Step 1: Remove OSC sequences (including those with parameters)
        const removeOsc = input
          .replace(/\x1b\](\d+;[^\x07\x1b]*|\d+[^\x07\x1b]*)\x07/g, '')
          .replace(/\](\d+;[^\n]*|\d+[^\n]*)/g, '');
        // Step 2: Remove ANSI escape sequences and color codes more thoroughly
        const removeAnsi = removeOsc // Remove all escape sequences with parameters
          .replace(/\u001b\[[\?]?[0-9;]*[a-zA-Z]/g, '')
          .replace(/\x1b\[[\?]?[0-9;]*[a-zA-Z]/g, '') // Remove color codes
          .replace(/\u001b\[[0-9;]*m/g, '')
          .replace(/\x1b\[[0-9;]*m/g, '') // Clean up any remaining escape characters
          .replace(/\u001b/g, '')
          .replace(/\x1b/g, '');
        // Step 3: Clean up carriage returns and newlines
        const cleanNewlines = removeAnsi
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n{3,}/g, '\n\n');
        // Step 4: Add newlines at key breakpoints while preserving paths
        const formatOutput = cleanNewlines // Preserve prompt line
          .replace(/^([~\/][^\n❯]+)❯/m, '$1\n❯') // Add newline before command output indicators
          .replace(/(?<!^|\n)>/g, '\n>') // Add newline before error keywords without breaking paths
          .replace(/(?<!^|\n|\w)(error|failed|warning|Error|Failed|Warning):/g, '\n$1:') // Add newline before 'at' in stack traces without breaking paths
          .replace(/(?<!^|\n|\/)(at\s+(?!async|sync))/g, '\nat ') // Ensure 'at async' stays on same line
          .replace(/\bat\s+async/g, 'at async') // Add newline before npm error indicators
          .replace(/(?<!^|\n)(npm ERR!)/g, '\n$1');
        // Step 5: Clean up whitespace while preserving intentional spacing
        const cleanSpaces = formatOutput
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .join('\n');
        // Step 6: Final cleanup
        return cleanSpaces
          .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
          .replace(/:\s+/g, ': ') // Normalize spacing after colons
          .replace(/\s{2,}/g, ' ') // Remove multiple spaces
          .replace(/^\s+|\s+$/g, '') // Trim start and end
          .replace(/\u0000/g, ''); // Remove null characters
      }
      function newBoltShellProcess() {
        return new BoltShell();
      }
    }
  },
  '[project]/utils/terminal.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        coloredText: () => coloredText,
        escapeCodes: () => escapeCodes,
      });
      const reset = '\x1b[0m';
      const escapeCodes = {
        reset,
        clear: '\x1b[g',
        red: '\x1b[1;31m',
      };
      const coloredText = {
        red: (text) => `${escapeCodes.red}${text}${reset}`,
      };
    }
  },
  '[project]/lib/stores/terminal.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        TerminalStore: () => TerminalStore,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/shell.ts [app-ssr] (ecmascript)');
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$terminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/terminal.ts [app-ssr] (ecmascript)');
      const __TURBOPACK__import$2e$meta__ = {
        get url() {
          return `file://${__turbopack_context__.P('lib/stores/terminal.ts')}`;
        },
      };
      class TerminalStore {
        #webcontainer;
        #terminals = [];
        #boltTerminal = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'newBoltShellProcess'
        ])();
        showTerminal =
          __TURBOPACK__import$2e$meta__.hot?.data.showTerminal ??
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'atom'
          ])(true);
        constructor(webcontainerPromise) {
          this.#webcontainer = webcontainerPromise;
          if (__TURBOPACK__import$2e$meta__.hot) {
            __TURBOPACK__import$2e$meta__.hot.data.showTerminal = this.showTerminal;
          }
        }
        get boltTerminal() {
          return this.#boltTerminal;
        }
        toggleTerminal(value) {
          this.showTerminal.set(value !== undefined ? value : !this.showTerminal.get());
        }
        async attachBoltTerminal(terminal) {
          try {
            const wc = await this.#webcontainer;
            await this.#boltTerminal.init(wc, terminal);
          } catch (error) {
            terminal.write(
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$terminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'coloredText'
              ].red('Failed to spawn bolt shell\n\n') + error.message,
            );
            return;
          }
        }
        async attachTerminal(terminal) {
          try {
            const shellProcess = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$shell$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'newShellProcess'
            ])(await this.#webcontainer, terminal);
            this.#terminals.push({
              terminal,
              process: shellProcess,
            });
          } catch (error) {
            terminal.write(
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$terminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'coloredText'
              ].red('Failed to spawn shell\n\n') + error.message,
            );
            return;
          }
        }
        onTerminalResize(cols, rows) {
          for (const { process } of this.#terminals) {
            process.resize({
              cols,
              rows,
            });
          }
        }
      }
    }
  },
  '[project]/lib/persistence/localStorage.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      // Client-side storage utilities
      __turbopack_context__.s({
        getLocalStorage: () => getLocalStorage,
        setLocalStorage: () => setLocalStorage,
      });
      const isClient = 'undefined' !== 'undefined' && typeof localStorage !== 'undefined';
      function getLocalStorage(key) {
        if (('TURBOPACK compile-time truthy', 1)) {
          return null;
        }
        ('TURBOPACK unreachable');
      }
      function setLocalStorage(key, value) {
        if (('TURBOPACK compile-time truthy', 1)) {
          return;
        }
        ('TURBOPACK unreachable');
      }
    }
  },
  '[project]/lib/persistence/db.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        createChatFromMessages: () => createChatFromMessages,
        deleteById: () => deleteById,
        duplicateChat: () => duplicateChat,
        forkChat: () => forkChat,
        getAll: () => getAll,
        getMessages: () => getMessages,
        getMessagesById: () => getMessagesById,
        getMessagesByUrlId: () => getMessagesByUrlId,
        getNextId: () => getNextId,
        getUrlId: () => getUrlId,
        openDatabase: () => openDatabase,
        setMessages: () => setMessages,
        updateChatDescription: () => updateChatDescription,
        updateChatMetadata: () => updateChatMetadata,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      const logger = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'createScopedLogger'
      ])('ChatHistory');
      async function openDatabase() {
        if (typeof indexedDB === 'undefined') {
          console.error('indexedDB is not available in this environment.');
          return undefined;
        }
        return new Promise((resolve) => {
          const request = indexedDB.open('boltHistory', 1);
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('chats')) {
              const store = db.createObjectStore('chats', {
                keyPath: 'id',
              });
              store.createIndex('id', 'id', {
                unique: true,
              });
              store.createIndex('urlId', 'urlId', {
                unique: true,
              });
            }
          };
          request.onsuccess = (event) => {
            resolve(event.target.result);
          };
          request.onerror = (event) => {
            resolve(undefined);
            logger.error(event.target.error);
          };
        });
      }
      async function getAll(db) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readonly');
          const store = transaction.objectStore('chats');
          const request = store.getAll();
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      }
      async function setMessages(db, id, messages, urlId, description, timestamp, metadata) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readwrite');
          const store = transaction.objectStore('chats');
          if (timestamp && isNaN(Date.parse(timestamp))) {
            reject(new Error('Invalid timestamp'));
            return;
          }
          const request = store.put({
            id,
            messages,
            urlId,
            description,
            timestamp: timestamp ?? new Date().toISOString(),
            metadata,
          });
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
      async function getMessages(db, id) {
        return (await getMessagesById(db, id)) || (await getMessagesByUrlId(db, id));
      }
      async function getMessagesByUrlId(db, id) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readonly');
          const store = transaction.objectStore('chats');
          const index = store.index('urlId');
          const request = index.get(id);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      }
      async function getMessagesById(db, id) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readonly');
          const store = transaction.objectStore('chats');
          const request = store.get(id);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      }
      async function deleteById(db, id) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readwrite');
          const store = transaction.objectStore('chats');
          const request = store.delete(id);
          request.onsuccess = () => resolve(undefined);
          request.onerror = () => reject(request.error);
        });
      }
      async function getNextId(db) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readonly');
          const store = transaction.objectStore('chats');
          const request = store.getAllKeys();
          request.onsuccess = () => {
            const highestId = request.result.reduce((cur, acc) => Math.max(+cur, +acc), 0);
            resolve(String(+highestId + 1));
          };
          request.onerror = () => reject(request.error);
        });
      }
      async function getUrlId(db, id) {
        const idList = await getUrlIds(db);
        if (!idList.includes(id)) {
          return id;
        } else {
          let i = 2;
          while (idList.includes(`${id}-${i}`)) {
            i++;
          }
          return `${id}-${i}`;
        }
      }
      async function getUrlIds(db) {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction('chats', 'readonly');
          const store = transaction.objectStore('chats');
          const idList = [];
          const request = store.openCursor();
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              idList.push(cursor.value.urlId);
              cursor.continue();
            } else {
              resolve(idList);
            }
          };
          request.onerror = () => {
            reject(request.error);
          };
        });
      }
      async function forkChat(db, chatId, messageId) {
        const chat = await getMessages(db, chatId);
        if (!chat) {
          throw new Error('Chat not found');
        }
        // Find the index of the message to fork at
        const messageIndex = chat.messages.findIndex((msg) => msg.id === messageId);
        if (messageIndex === -1) {
          throw new Error('Message not found');
        }
        // Get messages up to and including the selected message
        const messages = chat.messages.slice(0, messageIndex + 1);
        return createChatFromMessages(db, chat.description ? `${chat.description} (fork)` : 'Forked chat', messages);
      }
      async function duplicateChat(db, id) {
        const chat = await getMessages(db, id);
        if (!chat) {
          throw new Error('Chat not found');
        }
        return createChatFromMessages(db, `${chat.description || 'Chat'} (copy)`, chat.messages);
      }
      async function createChatFromMessages(db, description, messages, metadata) {
        const newId = await getNextId(db);
        const newUrlId = await getUrlId(db, newId); // Get a new urlId for the duplicated chat
        await setMessages(db, newId, messages, newUrlId, description, undefined, metadata);
        return newUrlId; // Return the urlId instead of id for navigation
      }
      async function updateChatDescription(db, id, description) {
        const chat = await getMessages(db, id);
        if (!chat) {
          throw new Error('Chat not found');
        }
        if (!description.trim()) {
          throw new Error('Description cannot be empty');
        }
        await setMessages(db, id, chat.messages, chat.urlId, description, chat.timestamp, chat.metadata);
      }
      async function updateChatMetadata(db, id, metadata) {
        const chat = await getMessages(db, id);
        if (!chat) {
          throw new Error('Chat not found');
        }
        await setMessages(db, id, chat.messages, chat.urlId, chat.description, chat.timestamp, metadata);
      }
    }
  },
  '[project]/lib/stores/logs.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        logStore: () => logStore,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/map/index.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
      const logger = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'createScopedLogger'
      ])('LogStore');
      const MAX_LOGS = 1000; // Maximum number of logs to keep in memory
      class LogStore {
        _logs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'map'
        ])({});
        showLogs = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])(true);
        _readLogs = new Set();
        constructor() {
          // Load saved logs from cookies on initialization
          this._loadLogs();
          // Only load read logs in browser environment
          if (('TURBOPACK compile-time falsy', 0)) {
            ('TURBOPACK unreachable');
          }
        }
        // Expose the logs store for subscription
        get logs() {
          return this._logs;
        }
        _loadLogs() {
          const savedLogs =
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'default'
            ].get('eventLogs');
          if (savedLogs) {
            try {
              const parsedLogs = JSON.parse(savedLogs);
              this._logs.set(parsedLogs);
            } catch (error) {
              logger.error('Failed to parse logs from cookies:', error);
            }
          }
        }
        _loadReadLogs() {
          if (('TURBOPACK compile-time truthy', 1)) {
            return;
          }
          ('TURBOPACK unreachable');
          const savedReadLogs = undefined;
        }
        _saveLogs() {
          const currentLogs = this._logs.get();
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'default'
          ].set('eventLogs', JSON.stringify(currentLogs));
        }
        _saveReadLogs() {
          if (('TURBOPACK compile-time truthy', 1)) {
            return;
          }
          ('TURBOPACK unreachable');
        }
        _generateId() {
          return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }
        _trimLogs() {
          const currentLogs = Object.entries(this._logs.get());
          if (currentLogs.length > MAX_LOGS) {
            const sortedLogs = currentLogs.sort(
              ([, a], [, b]) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
            );
            const newLogs = Object.fromEntries(sortedLogs.slice(0, MAX_LOGS));
            this._logs.set(newLogs);
          }
        }
        // Base log method for general logging
        _addLog(message, level, category, details, metadata) {
          const id = this._generateId();
          const entry = {
            id,
            timestamp: new Date().toISOString(),
            level,
            message,
            details,
            category,
            metadata,
          };
          this._logs.setKey(id, entry);
          this._trimLogs();
          this._saveLogs();
          return id;
        }
        // Specialized method for API logging
        _addApiLog(message, method, url, details) {
          const statusCode = details.statusCode;
          return this._addLog(message, statusCode >= 400 ? 'error' : 'info', 'api', details, {
            component: 'api',
            action: method,
          });
        }
        // System events
        logSystem(message, details) {
          return this._addLog(message, 'info', 'system', details);
        }
        // Provider events
        logProvider(message, details) {
          return this._addLog(message, 'info', 'provider', details);
        }
        // User actions
        logUserAction(message, details) {
          return this._addLog(message, 'info', 'user', details);
        }
        // API Connection Logging
        logAPIRequest(endpoint, method, duration, statusCode, details) {
          const message = `${method} ${endpoint} - ${statusCode} (${duration}ms)`;
          const level = statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warning' : 'info';
          return this._addLog(message, level, 'api', {
            ...details,
            endpoint,
            method,
            duration,
            statusCode,
            timestamp: new Date().toISOString(),
          });
        }
        // Authentication Logging
        logAuth(action, success, details) {
          const message = `Auth ${action} - ${success ? 'Success' : 'Failed'}`;
          const level = success ? 'info' : 'error';
          return this._addLog(message, level, 'auth', {
            ...details,
            action,
            success,
            timestamp: new Date().toISOString(),
          });
        }
        // Network Status Logging
        logNetworkStatus(status, details) {
          const message = `Network ${status}`;
          const level = status === 'offline' ? 'error' : status === 'reconnecting' ? 'warning' : 'info';
          return this._addLog(message, level, 'network', {
            ...details,
            status,
            timestamp: new Date().toISOString(),
          });
        }
        // Database Operations Logging
        logDatabase(operation, success, duration, details) {
          const message = `DB ${operation} - ${success ? 'Success' : 'Failed'} (${duration}ms)`;
          const level = success ? 'info' : 'error';
          return this._addLog(message, level, 'database', {
            ...details,
            operation,
            success,
            duration,
            timestamp: new Date().toISOString(),
          });
        }
        // Error events
        logError(message, error, details) {
          const errorDetails =
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                  ...details,
                }
              : {
                  error,
                  ...details,
                };
          return this._addLog(message, 'error', 'error', errorDetails);
        }
        // Warning events
        logWarning(message, details) {
          return this._addLog(message, 'warning', 'system', details);
        }
        // Debug events
        logDebug(message, details) {
          return this._addLog(message, 'debug', 'system', details);
        }
        clearLogs() {
          this._logs.set({});
          this._saveLogs();
        }
        getLogs() {
          return Object.values(this._logs.get()).sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          );
        }
        getFilteredLogs(level, category, searchQuery) {
          return this.getLogs().filter((log) => {
            const matchesLevel = !level || level === 'debug' || log.level === level;
            const matchesCategory = !category || log.category === category;
            const matchesSearch =
              !searchQuery ||
              log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
              JSON.stringify(log.details).toLowerCase().includes(searchQuery.toLowerCase());
            return matchesLevel && matchesCategory && matchesSearch;
          });
        }
        markAsRead(logId) {
          this._readLogs.add(logId);
          this._saveReadLogs();
        }
        isRead(logId) {
          return this._readLogs.has(logId);
        }
        clearReadLogs() {
          this._readLogs.clear();
          this._saveReadLogs();
        }
        // API interactions
        logApiCall(method, endpoint, statusCode, duration, requestData, responseData) {
          return this._addLog(
            `API ${method} ${endpoint}`,
            statusCode >= 400 ? 'error' : 'info',
            'api',
            {
              method,
              endpoint,
              statusCode,
              duration,
              request: requestData,
              response: responseData,
            },
            {
              component: 'api',
              action: method,
            },
          );
        }
        // Network operations
        logNetworkRequest(method, url, statusCode, duration, requestData, responseData) {
          return this._addLog(
            `${method} ${url}`,
            statusCode >= 400 ? 'error' : 'info',
            'network',
            {
              method,
              url,
              statusCode,
              duration,
              request: requestData,
              response: responseData,
            },
            {
              component: 'network',
              action: method,
            },
          );
        }
        // Authentication events
        logAuthEvent(event, success, details) {
          return this._addLog(
            `Auth ${event} ${success ? 'succeeded' : 'failed'}`,
            success ? 'info' : 'error',
            'auth',
            details,
            {
              component: 'auth',
              action: event,
            },
          );
        }
        // Performance tracking
        logPerformance(operation, duration, details) {
          return this._addLog(
            `Performance: ${operation}`,
            duration > 1000 ? 'warning' : 'info',
            'performance',
            {
              operation,
              duration,
              ...details,
            },
            {
              component: 'performance',
              action: 'metric',
            },
          );
        }
        // Error handling
        logErrorWithStack(error, category = 'error', details) {
          return this._addLog(
            error.message,
            'error',
            category,
            {
              ...details,
              name: error.name,
              stack: error.stack,
            },
            {
              component: category,
              action: 'error',
            },
          );
        }
        // Refresh logs (useful for real-time updates)
        refreshLogs() {
          const currentLogs = this._logs.get();
          this._logs.set({
            ...currentLogs,
          });
        }
        // Enhanced logging methods
        logInfo(message, details) {
          return this._addLog(message, 'info', 'system', details);
        }
        logSuccess(message, details) {
          return this._addLog(message, 'info', 'system', {
            ...details,
            success: true,
          });
        }
        logApiRequest(method, url, details) {
          return this._addApiLog(`API ${method} ${url}`, method, url, details);
        }
        logSettingsChange(component, setting, oldValue, newValue) {
          return this._addLog(
            `Settings changed in ${component}: ${setting}`,
            'info',
            'settings',
            {
              setting,
              previousValue: oldValue,
              newValue,
            },
            {
              component,
              action: 'settings_change',
              previousValue: oldValue,
              newValue,
            },
          );
        }
        logFeatureToggle(featureId, enabled) {
          return this._addLog(
            `Feature ${featureId} ${enabled ? 'enabled' : 'disabled'}`,
            'info',
            'feature',
            {
              featureId,
              enabled,
            },
            {
              component: 'features',
              action: 'feature_toggle',
            },
          );
        }
        logTaskOperation(taskId, operation, status, details) {
          return this._addLog(
            `Task ${taskId}: ${operation} - ${status}`,
            'info',
            'task',
            {
              taskId,
              operation,
              status,
              ...details,
            },
            {
              component: 'task-manager',
              action: 'task_operation',
            },
          );
        }
        logProviderAction(provider, action, success, details) {
          return this._addLog(
            `Provider ${provider}: ${action} - ${success ? 'Success' : 'Failed'}`,
            success ? 'info' : 'error',
            'provider',
            {
              provider,
              action,
              success,
              ...details,
            },
            {
              component: 'providers',
              action: 'provider_action',
            },
          );
        }
        logPerformanceMetric(component, operation, duration, details) {
          return this._addLog(
            `Performance: ${component} - ${operation} took ${duration}ms`,
            duration > 1000 ? 'warning' : 'info',
            'performance',
            {
              component,
              operation,
              duration,
              ...details,
            },
            {
              component,
              action: 'performance_metric',
            },
          );
        }
      }
      const logStore = new LogStore();
    }
  },
  '[project]/lib/persistence/useChatHistory.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({
          chatId: () => chatId,
          chatMetadata: () => chatMetadata,
          db: () => db,
          description: () => description,
          useChatHistory: () => useChatHistory,
        });
        (() => {
          const e = new Error("Cannot find module '@remix-run/react'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        })();
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/react-toastify@11.0.5_react_6c9864553ecaf35c74ef9dc135667ad0/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/workbench.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$logs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/logs.ts [app-ssr] (ecmascript)'); // Import logStore
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/persistence/db.ts [app-ssr] (ecmascript)');
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ]);
        [
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ] = __turbopack_async_dependencies__.then
          ? (await __turbopack_async_dependencies__)()
          : __turbopack_async_dependencies__;
        const __TURBOPACK__import$2e$meta__ = {
          get url() {
            return `file://${__turbopack_context__.P('lib/persistence/useChatHistory.ts')}`;
          },
        };
        const persistenceEnabled = !__TURBOPACK__import$2e$meta__.env.VITE_DISABLE_PERSISTENCE;
        const db = persistenceEnabled
          ? await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'openDatabase'
            ])()
          : undefined;
        const chatId = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])(undefined);
        const description = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])(undefined);
        const chatMetadata = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'atom'
        ])(undefined);
        function useChatHistory() {
          const navigate = useNavigate();
          const { id: mixedId } = useLoaderData();
          const [searchParams] = useSearchParams();
          const [initialMessages, setInitialMessages] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])([]);
          const [ready, setReady] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const [urlId, setUrlId] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])();
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(() => {
            if (!db) {
              setReady(true);
              if (persistenceEnabled) {
                const error = new Error('Chat persistence is unavailable');
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$logs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'logStore'
                ].logError('Chat persistence initialization failed', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'toast'
                ].error('Chat persistence is unavailable');
              }
              return;
            }
            if (mixedId) {
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'getMessages'
              ])(db, mixedId)
                .then((storedMessages) => {
                  if (storedMessages && storedMessages.messages.length > 0) {
                    const rewindId = searchParams.get('rewindTo');
                    const filteredMessages = rewindId
                      ? storedMessages.messages.slice(
                          0,
                          storedMessages.messages.findIndex((m) => m.id === rewindId) + 1,
                        )
                      : storedMessages.messages;
                    setInitialMessages(filteredMessages);
                    setUrlId(storedMessages.urlId);
                    description.set(storedMessages.description);
                    chatId.set(storedMessages.id);
                    chatMetadata.set(storedMessages.metadata);
                  } else {
                    navigate('/', {
                      replace: true,
                    });
                  }
                  setReady(true);
                })
                .catch((error) => {
                  __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$logs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'logStore'
                  ].logError('Failed to load chat messages', error);
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'toast'
                  ].error(error.message);
                });
            }
          }, []);
          return {
            ready: !mixedId || ready,
            initialMessages,
            updateChatMestaData: async (metadata) => {
              const id = chatId.get();
              if (!db || !id) {
                return;
              }
              try {
                await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'setMessages'
                ])(db, id, initialMessages, urlId, description.get(), undefined, metadata);
                chatMetadata.set(metadata);
              } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'toast'
                ].error('Failed to update chat metadata');
                console.error(error);
              }
            },
            storeMessageHistory: async (messages) => {
              if (!db || messages.length === 0) {
                return;
              }
              const { firstArtifact } =
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'workbenchStore'
                ];
              if (!urlId && firstArtifact?.id) {
                const urlId = await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'getUrlId'
                ])(db, firstArtifact.id);
                navigateChat(urlId);
                setUrlId(urlId);
              }
              if (!description.get() && firstArtifact?.title) {
                description.set(firstArtifact?.title);
              }
              if (initialMessages.length === 0 && !chatId.get()) {
                const nextId = await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'getNextId'
                ])(db);
                chatId.set(nextId);
                if (!urlId) {
                  navigateChat(nextId);
                }
              }
              await (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'setMessages'
              ])(db, chatId.get(), messages, urlId, description.get(), undefined, chatMetadata.get());
            },
            duplicateCurrentChat: async (listItemId) => {
              if (!db || (!mixedId && !listItemId)) {
                return;
              }
              try {
                const newId = await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'duplicateChat'
                ])(db, mixedId || listItemId);
                navigate(`/chat/${newId}`);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'toast'
                ].success('Chat duplicated successfully');
              } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'toast'
                ].error('Failed to duplicate chat');
                console.log(error);
              }
            },
            importChat: async (description, messages, metadata) => {
              if (!db) {
                return;
              }
              try {
                const newId = await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'createChatFromMessages'
                ])(db, description, messages, metadata);
                window.location.href = `/chat/${newId}`;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'toast'
                ].success('Chat imported successfully');
              } catch (error) {
                if (error instanceof Error) {
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'toast'
                  ].error('Failed to import chat: ' + error.message);
                } else {
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$toastify$40$11$2e$0$2e$5_react_6c9864553ecaf35c74ef9dc135667ad0$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'toast'
                  ].error('Failed to import chat');
                }
              }
            },
            exportChat: async (id = urlId) => {
              if (!db || !id) {
                return;
              }
              const chat = await (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'getMessages'
              ])(db, id);
              const chatData = {
                messages: chat.messages,
                description: chat.description,
                exportDate: new Date().toISOString(),
              };
              const blob = new Blob([JSON.stringify(chatData, null, 2)], {
                type: 'application/json',
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `chat-${new Date().toISOString()}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            },
          };
        }
        function navigateChat(nextId) {
          /**
           * FIXME: Using the intended navigate function causes a rerender for <Chat /> that breaks the app.
           *
           * `navigate(`/chat/${nextId}`, { replace: true });`
           */ const url = new URL(window.location.href);
          url.pathname = `/chat/${nextId}`;
          window.history.replaceState({}, '', url);
        }
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, true);
  },
  '[project]/lib/persistence/index.ts [app-ssr] (ecmascript) <locals>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({});
    }
  },
  '[project]/lib/persistence/index.ts [app-ssr] (ecmascript) <module evaluation>': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({});
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$localStorage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/persistence/localStorage.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/persistence/db.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/persistence/useChatHistory.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
          __turbopack_context__.i('[project]/lib/persistence/index.ts [app-ssr] (ecmascript) <locals>');
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ]);
        [
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ] = __turbopack_async_dependencies__.then
          ? (await __turbopack_async_dependencies__)()
          : __turbopack_async_dependencies__;
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, false);
  },
  '[project]/utils/sampler.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      /**
       * Creates a function that samples calls at regular intervals and captures trailing calls.
       * - Drops calls that occur between sampling intervals
       * - Takes one call per sampling interval if available
       * - Captures the last call if no call was made during the interval
       *
       * @param fn The function to sample
       * @param sampleInterval How often to sample calls (in ms)
       * @returns The sampled function
       */ __turbopack_context__.s({
        createSampler: () => createSampler,
      });
      function createSampler(fn, sampleInterval) {
        let lastArgs = null;
        let lastTime = 0;
        let timeout = null;
        // Create a function with the same type as the input function
        const sampled = function (...args) {
          const now = Date.now();
          lastArgs = args;
          // If we're within the sample interval, just store the args
          if (now - lastTime < sampleInterval) {
            // Set up trailing call if not already set
            if (!timeout) {
              timeout = setTimeout(
                () => {
                  timeout = null;
                  lastTime = Date.now();
                  if (lastArgs) {
                    fn.apply(this, lastArgs);
                    lastArgs = null;
                  }
                },
                sampleInterval - (now - lastTime),
              );
            }
            return;
          }
          // If we're outside the interval, execute immediately
          lastTime = now;
          fn.apply(this, args);
          lastArgs = null;
        };
        return sampled;
      }
    }
  },
  '[project]/lib/stores/workbench.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({
          WorkbenchStore: () => WorkbenchStore,
          workbenchStore: () => workbenchStore,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/map/index.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$runtime$2f$action$2d$runner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/runtime/action-runner.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webcontainer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/webcontainer/index.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/unreachable.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/editor.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$files$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/files.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$previews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/previews.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$terminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/terminal.ts [app-ssr] (ecmascript)');
        (() => {
          const e = new Error("Cannot find module 'jszip'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        })();
        (() => {
          const e = new Error("Cannot find module 'file-saver'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        })();
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$octokit$2b$rest$40$21$2e$1$2e$1$2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/@octokit+rest@21.1.1/node_modules/@octokit/rest/dist-src/index.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/path.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/diff.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
          __turbopack_context__.i('[project]/lib/persistence/index.ts [app-ssr] (ecmascript) <module evaluation>');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/persistence/useChatHistory.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$sampler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/sampler.ts [app-ssr] (ecmascript)');
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__,
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ]);
        [
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__,
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ] = __turbopack_async_dependencies__.then
          ? (await __turbopack_async_dependencies__)()
          : __turbopack_async_dependencies__;
        const __TURBOPACK__import$2e$meta__ = {
          get url() {
            return `file://${__turbopack_context__.P('lib/stores/workbench.ts')}`;
          },
        };
        // Destructure saveAs from the CommonJS module
        const { saveAs } = fileSaver;
        class WorkbenchStore {
          #previewsStore =
            new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$previews$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'PreviewsStore'
            ](
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webcontainer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'webcontainer'
              ],
            );
          #filesStore =
            new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$files$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'FilesStore'
            ](
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webcontainer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'webcontainer'
              ],
            );
          #editorStore =
            new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'EditorStore'
            ](this.#filesStore);
          #terminalStore =
            new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$terminal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'TerminalStore'
            ](
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webcontainer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'webcontainer'
              ],
            );
          #reloadedMessages = new Set();
          artifacts =
            __TURBOPACK__import$2e$meta__.hot?.data.artifacts ??
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$map$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'map'
            ])({});
          showWorkbench =
            __TURBOPACK__import$2e$meta__.hot?.data.showWorkbench ??
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'atom'
            ])(false);
          currentView =
            __TURBOPACK__import$2e$meta__.hot?.data.currentView ??
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'atom'
            ])('code');
          unsavedFiles =
            __TURBOPACK__import$2e$meta__.hot?.data.unsavedFiles ??
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'atom'
            ])(new Set());
          actionAlert =
            __TURBOPACK__import$2e$meta__.hot?.data.unsavedFiles ??
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'atom'
            ])(undefined);
          modifiedFiles = new Set();
          artifactIdList = [];
          #globalExecutionQueue = Promise.resolve();
          constructor() {
            if (__TURBOPACK__import$2e$meta__.hot) {
              __TURBOPACK__import$2e$meta__.hot.data.artifacts = this.artifacts;
              __TURBOPACK__import$2e$meta__.hot.data.unsavedFiles = this.unsavedFiles;
              __TURBOPACK__import$2e$meta__.hot.data.showWorkbench = this.showWorkbench;
              __TURBOPACK__import$2e$meta__.hot.data.currentView = this.currentView;
              __TURBOPACK__import$2e$meta__.hot.data.actionAlert = this.actionAlert;
            }
          }
          addToExecutionQueue(callback) {
            this.#globalExecutionQueue = this.#globalExecutionQueue.then(() => callback());
          }
          get previews() {
            return this.#previewsStore.previews;
          }
          get files() {
            return this.#filesStore.files;
          }
          get currentDocument() {
            return this.#editorStore.currentDocument;
          }
          get selectedFile() {
            return this.#editorStore.selectedFile;
          }
          get firstArtifact() {
            return this.#getArtifact(this.artifactIdList[0]);
          }
          get filesCount() {
            return this.#filesStore.filesCount;
          }
          get showTerminal() {
            return this.#terminalStore.showTerminal;
          }
          get boltTerminal() {
            return this.#terminalStore.boltTerminal;
          }
          get alert() {
            return this.actionAlert;
          }
          clearAlert() {
            this.actionAlert.set(undefined);
          }
          toggleTerminal(value) {
            this.#terminalStore.toggleTerminal(value);
          }
          attachTerminal(terminal) {
            this.#terminalStore.attachTerminal(terminal);
          }
          attachBoltTerminal(terminal) {
            this.#terminalStore.attachBoltTerminal(terminal);
          }
          onTerminalResize(cols, rows) {
            this.#terminalStore.onTerminalResize(cols, rows);
          }
          setDocuments(files) {
            this.#editorStore.setDocuments(files);
            if (this.#filesStore.filesCount > 0 && this.currentDocument.get() === undefined) {
              // we find the first file and select it
              for (const [filePath, dirent] of Object.entries(files)) {
                if (dirent?.type === 'file') {
                  this.setSelectedFile(filePath);
                  break;
                }
              }
            }
          }
          setShowWorkbench(show) {
            this.showWorkbench.set(show);
          }
          setCurrentDocumentContent(newContent) {
            const filePath = this.currentDocument.get()?.filePath;
            if (!filePath) {
              return;
            }
            const originalContent = this.#filesStore.getFile(filePath)?.content;
            const unsavedChanges = originalContent !== undefined && originalContent !== newContent;
            this.#editorStore.updateFile(filePath, newContent);
            const currentDocument = this.currentDocument.get();
            if (currentDocument) {
              const previousUnsavedFiles = this.unsavedFiles.get();
              if (unsavedChanges && previousUnsavedFiles.has(currentDocument.filePath)) {
                return;
              }
              const newUnsavedFiles = new Set(previousUnsavedFiles);
              if (unsavedChanges) {
                newUnsavedFiles.add(currentDocument.filePath);
              } else {
                newUnsavedFiles.delete(currentDocument.filePath);
              }
              this.unsavedFiles.set(newUnsavedFiles);
            }
          }
          setCurrentDocumentScrollPosition(position) {
            const editorDocument = this.currentDocument.get();
            if (!editorDocument) {
              return;
            }
            const { filePath } = editorDocument;
            this.#editorStore.updateScrollPosition(filePath, position);
          }
          setSelectedFile(filePath) {
            this.#editorStore.setSelectedFile(filePath);
          }
          async saveFile(filePath) {
            const documents = this.#editorStore.documents.get();
            const document = documents[filePath];
            if (document === undefined) {
              return;
            }
            await this.#filesStore.saveFile(filePath, document.value);
            const newUnsavedFiles = new Set(this.unsavedFiles.get());
            newUnsavedFiles.delete(filePath);
            this.unsavedFiles.set(newUnsavedFiles);
          }
          async saveCurrentDocument() {
            const currentDocument = this.currentDocument.get();
            if (currentDocument === undefined) {
              return;
            }
            await this.saveFile(currentDocument.filePath);
          }
          resetCurrentDocument() {
            const currentDocument = this.currentDocument.get();
            if (currentDocument === undefined) {
              return;
            }
            const { filePath } = currentDocument;
            const file = this.#filesStore.getFile(filePath);
            if (!file) {
              return;
            }
            this.setCurrentDocumentContent(file.content);
          }
          async saveAllFiles() {
            for (const filePath of this.unsavedFiles.get()) {
              await this.saveFile(filePath);
            }
          }
          getFileModifcations() {
            return this.#filesStore.getFileModifications();
          }
          resetAllFileModifications() {
            this.#filesStore.resetFileModifications();
          }
          abortAllActions() {
            // TODO: what do we wanna do and how do we wanna recover from this?
          }
          setReloadedMessages(messages) {
            this.#reloadedMessages = new Set(messages);
          }
          addArtifact({ messageId, title, id, type }) {
            const artifact = this.#getArtifact(messageId);
            if (artifact) {
              return;
            }
            if (!this.artifactIdList.includes(messageId)) {
              this.artifactIdList.push(messageId);
            }
            this.artifacts.setKey(messageId, {
              id,
              title,
              closed: false,
              type,
              runner:
                new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$runtime$2f$action$2d$runner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'ActionRunner'
                ](
                  __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webcontainer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'webcontainer'
                  ],
                  () => this.boltTerminal,
                  (alert) => {
                    if (this.#reloadedMessages.has(messageId)) {
                      return;
                    }
                    this.actionAlert.set(alert);
                  },
                ),
            });
          }
          updateArtifact({ messageId }, state) {
            const artifact = this.#getArtifact(messageId);
            if (!artifact) {
              return;
            }
            this.artifacts.setKey(messageId, {
              ...artifact,
              ...state,
            });
          }
          addAction(data) {
            // this._addAction(data);
            this.addToExecutionQueue(() => this._addAction(data));
          }
          async _addAction(data) {
            const { messageId } = data;
            const artifact = this.#getArtifact(messageId);
            if (!artifact) {
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'unreachable'
              ])('Artifact not found');
            }
            return artifact.runner.addAction(data);
          }
          runAction(data, isStreaming = false) {
            if (isStreaming) {
              this.actionStreamSampler(data, isStreaming);
            } else {
              this.addToExecutionQueue(() => this._runAction(data, isStreaming));
            }
          }
          async _runAction(data, isStreaming = false) {
            const { messageId } = data;
            const artifact = this.#getArtifact(messageId);
            if (!artifact) {
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$unreachable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'unreachable'
              ])('Artifact not found');
            }
            const action = artifact.runner.actions.get()[data.actionId];
            if (!action || action.executed) {
              return;
            }
            if (data.action.type === 'file') {
              const wc =
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webcontainer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'webcontainer'
                ];
              const fullPath =
                __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'path'
                ].join(wc.workdir, data.action.filePath);
              if (this.selectedFile.value !== fullPath) {
                this.setSelectedFile(fullPath);
              }
              if (this.currentView.value !== 'code') {
                this.currentView.set('code');
              }
              const doc = this.#editorStore.documents.get()[fullPath];
              if (!doc) {
                await artifact.runner.runAction(data, isStreaming);
              }
              this.#editorStore.updateFile(fullPath, data.action.content);
              if (!isStreaming) {
                await artifact.runner.runAction(data);
                this.resetAllFileModifications();
              }
            } else {
              await artifact.runner.runAction(data);
            }
          }
          actionStreamSampler = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$sampler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'createSampler'
          ])(async (data, isStreaming = false) => {
            return await this._runAction(data, isStreaming);
          }, 100);
          #getArtifact(id) {
            const artifacts = this.artifacts.get();
            return artifacts[id];
          }
          async downloadZip() {
            const zip = new JSZip();
            const files = this.files.get();
            // Get the project name from the description input, or use a default name
            const projectName = (
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$persistence$2f$useChatHistory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'description'
              ].value ?? 'project'
            )
              .toLocaleLowerCase()
              .split(' ')
              .join('_');
            // Generate a simple 6-character hash based on the current timestamp
            const timestampHash = Date.now().toString(36).slice(-6);
            const uniqueProjectName = `${projectName}_${timestampHash}`;
            for (const [filePath, dirent] of Object.entries(files)) {
              if (dirent?.type === 'file' && !dirent.isBinary) {
                const relativePath = (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'extractRelativePath'
                ])(filePath);
                // split the path into segments
                const pathSegments = relativePath.split('/');
                // if there's more than one segment, we need to create folders
                if (pathSegments.length > 1) {
                  let currentFolder = zip;
                  for (let i = 0; i < pathSegments.length - 1; i++) {
                    currentFolder = currentFolder.folder(pathSegments[i]);
                  }
                  currentFolder.file(pathSegments[pathSegments.length - 1], dirent.content);
                } else {
                  // if there's only one segment, it's a file in the root
                  zip.file(relativePath, dirent.content);
                }
              }
            }
            // Generate the zip file and save it
            const content = await zip.generateAsync({
              type: 'blob',
            });
            saveAs(content, `${uniqueProjectName}.zip`);
          }
          async syncFiles(targetHandle) {
            const files = this.files.get();
            const syncedFiles = [];
            for (const [filePath, dirent] of Object.entries(files)) {
              if (dirent?.type === 'file' && !dirent.isBinary) {
                const relativePath = (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'extractRelativePath'
                ])(filePath);
                const pathSegments = relativePath.split('/');
                let currentHandle = targetHandle;
                for (let i = 0; i < pathSegments.length - 1; i++) {
                  currentHandle = await currentHandle.getDirectoryHandle(pathSegments[i], {
                    create: true,
                  });
                }
                // create or get the file
                const fileHandle = await currentHandle.getFileHandle(pathSegments[pathSegments.length - 1], {
                  create: true,
                });
                // write the file content
                const writable = await fileHandle.createWritable();
                await writable.write(dirent.content);
                await writable.close();
                syncedFiles.push(relativePath);
              }
            }
            return syncedFiles;
          }
          async pushToGitHub(repoName, commitMessage, githubUsername, ghToken, isPrivate = false) {
            try {
              // Use cookies if username and token are not provided
              const githubToken =
                ghToken ||
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'default'
                ].get('githubToken');
              const owner =
                githubUsername ||
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$js$2d$cookie$40$3$2e$0$2e$5$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'default'
                ].get('githubUsername');
              if (!githubToken || !owner) {
                throw new Error('GitHub token or username is not set in cookies or provided.');
              }
              // Initialize Octokit with the auth token
              const octokit =
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$octokit$2b$rest$40$21$2e$1$2e$1$2f$node_modules$2f40$octokit$2f$rest$2f$dist$2d$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'Octokit'
                ]({
                  auth: githubToken,
                });
              // Check if the repository already exists before creating it
              let repo;
              try {
                const resp = await octokit.repos.get({
                  owner,
                  repo: repoName,
                });
                repo = resp.data;
              } catch (error) {
                if (error instanceof Error && 'status' in error && error.status === 404) {
                  // Repository doesn't exist, so create a new one
                  const { data: newRepo } = await octokit.repos.createForAuthenticatedUser({
                    name: repoName,
                    private: isPrivate,
                    auto_init: true,
                  });
                  repo = newRepo;
                } else {
                  console.log('cannot create repo!');
                  throw error; // Some other error occurred
                }
              }
              // Get all files
              const files = this.files.get();
              if (!files || Object.keys(files).length === 0) {
                throw new Error('No files found to push');
              }
              // Create blobs for each file
              const blobs = await Promise.all(
                Object.entries(files).map(async ([filePath, dirent]) => {
                  if (dirent?.type === 'file' && dirent.content) {
                    const { data: blob } = await octokit.git.createBlob({
                      owner: repo.owner.login,
                      repo: repo.name,
                      content: Buffer.from(dirent.content).toString('base64'),
                      encoding: 'base64',
                    });
                    return {
                      path: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'extractRelativePath'
                      ])(filePath),
                      sha: blob.sha,
                    };
                  }
                  return null;
                }),
              );
              const validBlobs = blobs.filter(Boolean); // Filter out any undefined blobs
              if (validBlobs.length === 0) {
                throw new Error('No valid files to push');
              }
              // Get the latest commit SHA (assuming main branch, update dynamically if needed)
              const { data: ref } = await octokit.git.getRef({
                owner: repo.owner.login,
                repo: repo.name,
                ref: `heads/${repo.default_branch || 'main'}`,
              });
              const latestCommitSha = ref.object.sha;
              // Create a new tree
              const { data: newTree } = await octokit.git.createTree({
                owner: repo.owner.login,
                repo: repo.name,
                base_tree: latestCommitSha,
                tree: validBlobs.map((blob) => ({
                  path: blob.path,
                  mode: '100644',
                  type: 'blob',
                  sha: blob.sha,
                })),
              });
              // Create a new commit
              const { data: newCommit } = await octokit.git.createCommit({
                owner: repo.owner.login,
                repo: repo.name,
                message: commitMessage || 'Initial commit from your app',
                tree: newTree.sha,
                parents: [latestCommitSha],
              });
              // Update the reference
              await octokit.git.updateRef({
                owner: repo.owner.login,
                repo: repo.name,
                ref: `heads/${repo.default_branch || 'main'}`,
                sha: newCommit.sha,
              });
              return repo.html_url; // Return the URL instead of showing alert
            } catch (error) {
              console.error('Error pushing to GitHub:', error);
              throw error; // Rethrow the error for further handling
            }
          }
        }
        const workbenchStore = new WorkbenchStore();
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, false);
  },
  '[project]/utils/classNames.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      /**
       * Copyright (c) 2018 Jed Watson.
       * Licensed under the MIT License (MIT), see:
       *
       * @link http://jedwatson.github.io/classnames
       */ __turbopack_context__.s({
        classNames: () => classNames,
      });
      function classNames(...args) {
        let classes = '';
        for (const arg of args) {
          classes = appendClass(classes, parseValue(arg));
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === 'string' || typeof arg === 'number') {
          return arg;
        }
        if (typeof arg !== 'object') {
          return '';
        }
        if (Array.isArray(arg)) {
          return classNames(...arg);
        }
        let classes = '';
        for (const key in arg) {
          if (arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + ' ' + newClass;
        }
        return value + newClass;
      }
    }
  },
  '[project]/utils/easings.ts [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        cubicEasingFn: () => cubicEasingFn,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/framer-motion@12.5.0_@emoti_3944da70e2c5847afab7313c8a57fad6/node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)',
        );
      const cubicEasingFn = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        'cubicBezier'
      ])(0.4, 0, 0.2, 1);
    }
  },
  '[project]/app/components/chat/Artifact.tsx [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({
          Artifact: () => Artifact,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$nanostores$2b$react$40$0$2e$8$2e$4_nanostores$40$0$2e$11$2e$4_react$40$18$2e$3$2e$1$2f$node_modules$2f40$nanostores$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/@nanostores+react@0.8.4_nanostores@0.11.4_react@18.3.1/node_modules/@nanostores/react/index.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/framer-motion@12.5.0_@emoti_3944da70e2c5847afab7313c8a57fad6/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/framer-motion@12.5.0_@emoti_3944da70e2c5847afab7313c8a57fad6/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$computed$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/nanostores@0.11.4/node_modules/nanostores/computed/index.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__ =
          __turbopack_context__.i('[externals]/shiki [external] (shiki, esm_import)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/lib/stores/workbench.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/classNames.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$easings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/easings.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/constants.ts [app-ssr] (ecmascript)');
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__,
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ]);
        [
          __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__,
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ] = __turbopack_async_dependencies__.then
          ? (await __turbopack_async_dependencies__)()
          : __turbopack_async_dependencies__;
        const __TURBOPACK__import$2e$meta__ = {
          get url() {
            return `file://${__turbopack_context__.P('app/components/chat/Artifact.tsx')}`;
          },
        };
        const highlighterOptions = {
          langs: ['shell'],
          themes: ['light-plus', 'dark-plus'],
        };
        const shellHighlighter =
          __TURBOPACK__import$2e$meta__.hot?.data.shellHighlighter ??
          (await (0,
          __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__[
            'createHighlighter'
          ])(highlighterOptions));
        if (__TURBOPACK__import$2e$meta__.hot) {
          __TURBOPACK__import$2e$meta__.hot.data.shellHighlighter = shellHighlighter;
        }
        const Artifact = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'memo'
        ])(({ messageId }) => {
          const userToggledActions = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useRef'
          ])(false);
          const [showActions, setShowActions] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const [allActionFinished, setAllActionFinished] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const artifacts = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$nanostores$2b$react$40$0$2e$8$2e$4_nanostores$40$0$2e$11$2e$4_react$40$18$2e$3$2e$1$2f$node_modules$2f40$nanostores$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useStore'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'workbenchStore'
            ].artifacts,
          );
          const artifact = artifacts[messageId];
          const actions = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$nanostores$2b$react$40$0$2e$8$2e$4_nanostores$40$0$2e$11$2e$4_react$40$18$2e$3$2e$1$2f$node_modules$2f40$nanostores$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useStore'
          ])(
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$nanostores$40$0$2e$11$2e$4$2f$node_modules$2f$nanostores$2f$computed$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'computed'
            ])(artifact.runner.actions, (actions) => {
              return Object.values(actions);
            }),
          );
          const toggleActions = () => {
            userToggledActions.current = true;
            setShowActions(!showActions);
          };
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(() => {
            if (actions.length && !showActions && !userToggledActions.current) {
              setShowActions(true);
            }
            if (actions.length !== 0 && artifact.type === 'bundled') {
              const finished = !actions.find((action) => action.status !== 'complete');
              if (allActionFinished !== finished) {
                setAllActionFinished(finished);
              }
            }
          }, [actions]);
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className:
                'artifact border border-bolt-elements-borderColor flex flex-col overflow-hidden rounded-lg w-full transition-border duration-150',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'flex',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className:
                            'flex items-stretch bg-bolt-elements-artifacts-background hover:bg-bolt-elements-artifacts-backgroundHover w-full overflow-hidden',
                          onClick: () => {
                            const showWorkbench =
                              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                'workbenchStore'
                              ].showWorkbench.get();
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'workbenchStore'
                            ].showWorkbench.set(!showWorkbench);
                          },
                          children: [
                            artifact.type == 'bundled' &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  'Fragment'
                                ],
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'p-4',
                                        children: allActionFinished
                                          ? /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className: 'i-ph:files-light',
                                                style: {
                                                  fontSize: '2rem',
                                                },
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                                lineNumber: 75,
                                                columnNumber: 19,
                                              },
                                              this,
                                            )
                                          : /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className: 'i-svg-spinners:90-ring-with-bg',
                                                style: {
                                                  fontSize: '2rem',
                                                },
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                                lineNumber: 77,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: '[project]/app/components/chat/Artifact.tsx',
                                        lineNumber: 73,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'bg-bolt-elements-artifacts-borderColor w-[1px]',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: '[project]/app/components/chat/Artifact.tsx',
                                        lineNumber: 80,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                              ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'px-5 p-3.5 w-full text-left',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'w-full text-bolt-elements-textPrimary font-medium leading-5 text-sm',
                                      children: artifact?.title,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/chat/Artifact.tsx',
                                      lineNumber: 84,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'w-full w-full text-bolt-elements-textSecondary text-xs mt-0.5',
                                      children: 'Click to open Workbench',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/chat/Artifact.tsx',
                                      lineNumber: 85,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                lineNumber: 83,
                                columnNumber: 11,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/components/chat/Artifact.tsx',
                          lineNumber: 64,
                          columnNumber: 9,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'bg-bolt-elements-artifacts-borderColor w-[1px]',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/chat/Artifact.tsx',
                          lineNumber: 88,
                          columnNumber: 9,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          'AnimatePresence'
                        ],
                        {
                          children:
                            actions.length &&
                            artifact.type !== 'bundled' &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                'motion'
                              ].button,
                              {
                                initial: {
                                  width: 0,
                                },
                                animate: {
                                  width: 'auto',
                                },
                                exit: {
                                  width: 0,
                                },
                                transition: {
                                  duration: 0.15,
                                  ease: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$easings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'cubicEasingFn'
                                  ],
                                },
                                className:
                                  'bg-bolt-elements-artifacts-background hover:bg-bolt-elements-artifacts-backgroundHover',
                                onClick: toggleActions,
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'p-4',
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: showActions ? 'i-ph:caret-up-bold' : 'i-ph:caret-down-bold',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: '[project]/app/components/chat/Artifact.tsx',
                                        lineNumber: 100,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: '[project]/app/components/chat/Artifact.tsx',
                                    lineNumber: 99,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                lineNumber: 91,
                                columnNumber: 13,
                              },
                              this,
                            ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/chat/Artifact.tsx',
                          lineNumber: 89,
                          columnNumber: 9,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/chat/Artifact.tsx',
                    lineNumber: 63,
                    columnNumber: 7,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'AnimatePresence'
                  ],
                  {
                    children:
                      artifact.type !== 'bundled' &&
                      showActions &&
                      actions.length > 0 &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].div,
                        {
                          className: 'actions',
                          initial: {
                            height: 0,
                          },
                          animate: {
                            height: 'auto',
                          },
                          exit: {
                            height: '0px',
                          },
                          transition: {
                            duration: 0.15,
                          },
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'bg-bolt-elements-artifacts-borderColor h-[1px]',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                lineNumber: 115,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'p-5 text-left bg-bolt-elements-actions-background',
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  ActionList,
                                  {
                                    actions: actions,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: '[project]/app/components/chat/Artifact.tsx',
                                    lineNumber: 118,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                lineNumber: 117,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/components/chat/Artifact.tsx',
                          lineNumber: 108,
                          columnNumber: 11,
                        },
                        this,
                      ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/chat/Artifact.tsx',
                    lineNumber: 106,
                    columnNumber: 7,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/app/components/chat/Artifact.tsx',
              lineNumber: 62,
              columnNumber: 5,
            },
            this,
          );
        });
        function ShellCodeBlock({ classsName, code }) {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'classNames'
              ])('text-xs', classsName),
              dangerouslySetInnerHTML: {
                __html: shellHighlighter.codeToHtml(code, {
                  lang: 'shell',
                  theme: 'dark-plus',
                }),
              },
            },
            void 0,
            false,
            {
              fileName: '[project]/app/components/chat/Artifact.tsx',
              lineNumber: 134,
              columnNumber: 5,
            },
            this,
          );
        }
        const actionVariants = {
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        };
        function openArtifactInWorkbench(filePath) {
          if (
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'workbenchStore'
            ].currentView.get() !== 'code'
          ) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'workbenchStore'
            ].currentView.set('code');
          }
          __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'workbenchStore'
          ].setSelectedFile(
            `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__['WORK_DIR']}/${filePath}`,
          );
        }
        const ActionList = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'memo'
        ])(({ actions }) => {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              'motion'
            ].div,
            {
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
              transition: {
                duration: 0.15,
              },
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'ul',
                {
                  className: 'list-none space-y-2.5',
                  children: actions.map((action, index) => {
                    const { status, type, content } = action;
                    const isLast = index === actions.length - 1;
                    return /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$5$2e$0_$40$emoti_3944da70e2c5847afab7313c8a57fad6$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'motion'
                      ].li,
                      {
                        variants: actionVariants,
                        initial: 'hidden',
                        animate: 'visible',
                        transition: {
                          duration: 0.2,
                          ease: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$easings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            'cubicEasingFn'
                          ],
                        },
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className: 'flex items-center gap-1.5 text-sm',
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      'classNames'
                                    ])('text-lg', getIconColor(action.status)),
                                    children:
                                      status === 'running'
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              'Fragment'
                                            ],
                                            {
                                              children:
                                                type !== 'start'
                                                  ? /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'div',
                                                      {
                                                        className: 'i-svg-spinners:90-ring-with-bg',
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName: '[project]/app/components/chat/Artifact.tsx',
                                                        lineNumber: 187,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    )
                                                  : /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'div',
                                                      {
                                                        className: 'i-ph:terminal-window-duotone',
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName: '[project]/app/components/chat/Artifact.tsx',
                                                        lineNumber: 189,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    ),
                                            },
                                            void 0,
                                            false,
                                          )
                                        : status === 'pending'
                                          ? /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className: 'i-ph:circle-duotone',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                                lineNumber: 193,
                                                columnNumber: 21,
                                              },
                                              this,
                                            )
                                          : status === 'complete'
                                            ? /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'div',
                                                {
                                                  className: 'i-ph:check',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName: '[project]/app/components/chat/Artifact.tsx',
                                                  lineNumber: 195,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              )
                                            : status === 'failed' || status === 'aborted'
                                              ? /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'div',
                                                  {
                                                    className: 'i-ph:x',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName: '[project]/app/components/chat/Artifact.tsx',
                                                    lineNumber: 197,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                )
                                              : null,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: '[project]/app/components/chat/Artifact.tsx',
                                    lineNumber: 183,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                type === 'file'
                                  ? /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        children: [
                                          'Create',
                                          ' ',
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'code',
                                            {
                                              className:
                                                'bg-bolt-elements-artifacts-inlineCode-background text-bolt-elements-artifacts-inlineCode-text px-1.5 py-1 rounded-md text-bolt-elements-item-contentAccent hover:underline cursor-pointer',
                                              onClick: () => openArtifactInWorkbench(action.filePath),
                                              children: action.filePath,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName: '[project]/app/components/chat/Artifact.tsx',
                                              lineNumber: 203,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName: '[project]/app/components/chat/Artifact.tsx',
                                        lineNumber: 201,
                                        columnNumber: 19,
                                      },
                                      this,
                                    )
                                  : type === 'shell'
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'div',
                                        {
                                          className: 'flex items-center w-full min-h-[28px]',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className: 'flex-1',
                                              children: 'Run command',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName: '[project]/app/components/chat/Artifact.tsx',
                                              lineNumber: 212,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName: '[project]/app/components/chat/Artifact.tsx',
                                          lineNumber: 211,
                                          columnNumber: 19,
                                        },
                                        this,
                                      )
                                    : type === 'start'
                                      ? /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'a',
                                          {
                                            onClick: (e) => {
                                              e.preventDefault();
                                              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stores$2f$workbench$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                'workbenchStore'
                                              ].currentView.set('preview');
                                            },
                                            className: 'flex items-center w-full min-h-[28px]',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'span',
                                              {
                                                className: 'flex-1',
                                                children: 'Start Application',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                                lineNumber: 222,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName: '[project]/app/components/chat/Artifact.tsx',
                                            lineNumber: 215,
                                            columnNumber: 19,
                                          },
                                          this,
                                        )
                                      : null,
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName: '[project]/app/components/chat/Artifact.tsx',
                              lineNumber: 182,
                              columnNumber: 15,
                            },
                            this,
                          ),
                          (type === 'shell' || type === 'start') &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              ShellCodeBlock,
                              {
                                classsName: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  'classNames'
                                ])('mt-1', {
                                  'mb-3.5': !isLast,
                                }),
                                code: content,
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/chat/Artifact.tsx',
                                lineNumber: 227,
                                columnNumber: 17,
                              },
                              this,
                            ),
                        ],
                      },
                      index,
                      true,
                      {
                        fileName: '[project]/app/components/chat/Artifact.tsx',
                        lineNumber: 172,
                        columnNumber: 13,
                      },
                      this,
                    );
                  }),
                },
                void 0,
                false,
                {
                  fileName: '[project]/app/components/chat/Artifact.tsx',
                  lineNumber: 166,
                  columnNumber: 7,
                },
                this,
              ),
            },
            void 0,
            false,
            {
              fileName: '[project]/app/components/chat/Artifact.tsx',
              lineNumber: 165,
              columnNumber: 5,
            },
            this,
          );
        });
        function getIconColor(status) {
          switch (status) {
            case 'pending': {
              return 'text-bolt-elements-textTertiary';
            }
            case 'running': {
              return 'text-bolt-elements-loader-progress';
            }
            case 'complete': {
              return 'text-bolt-elements-icon-success';
            }
            case 'aborted': {
              return 'text-bolt-elements-textSecondary';
            }
            case 'failed': {
              return 'text-bolt-elements-icon-error';
            }
            default: {
              return undefined;
            }
          }
        }
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, true);
  },
  '[project]/app/components/chat/CodeBlock.module.scss.module.css [app-ssr] (css module)': (__turbopack_context__) => {
    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.v({
        CopyButtonContainer: 'CodeBlock-module-scss-module__wdEkNa__CopyButtonContainer',
      });
    }
  },
  '[project]/app/components/chat/CodeBlock.tsx [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({
          CodeBlock: () => CodeBlock,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__ =
          __turbopack_context__.i('[externals]/shiki [external] (shiki, esm_import)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/classNames.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$CodeBlock$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ =
          __turbopack_context__.i(
            '[project]/app/components/chat/CodeBlock.module.scss.module.css [app-ssr] (css module)',
          );
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__,
        ]);
        [__TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__] =
          __turbopack_async_dependencies__.then
            ? (await __turbopack_async_dependencies__)()
            : __turbopack_async_dependencies__;
        const logger = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'createScopedLogger'
        ])('CodeBlock');
        const CodeBlock = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'memo'
        ])(({ className, code, language = 'plaintext', theme = 'dark-plus', disableCopy = false }) => {
          const [html, setHTML] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(undefined);
          const [copied, setCopied] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const copyToClipboard = () => {
            if (copied) {
              return;
            }
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          };
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(() => {
            if (
              language &&
              !(0,
              __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__[
                'isSpecialLang'
              ])(language) &&
              !(
                language in
                __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__[
                  'bundledLanguages'
                ]
              )
            ) {
              logger.warn(`Unsupported language '${language}'`);
            }
            logger.trace(`Language = ${language}`);
            const processCode = async () => {
              setHTML(
                await (0,
                __TURBOPACK__imported__module__$5b$externals$5d2f$shiki__$5b$external$5d$__$28$shiki$2c$__esm_import$29$__[
                  'codeToHtml'
                ])(code, {
                  lang: language,
                  theme,
                }),
              );
            };
            processCode();
          }, [code]);
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'classNames'
              ])('relative group text-left', className),
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'classNames'
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$CodeBlock$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__[
                        'default'
                      ].CopyButtonContainer,
                      'bg-transparant absolute top-[10px] right-[10px] rounded-md z-10 text-lg flex items-center justify-center opacity-0 group-hover:opacity-100',
                      {
                        'rounded-l-0 opacity-100': copied,
                      },
                    ),
                    children:
                      !disableCopy &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$classNames$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            'classNames'
                          ])(
                            'flex items-center bg-accent-500 p-[6px] justify-center before:bg-white before:rounded-l-md before:text-gray-500 before:border-r before:border-gray-300 rounded-md transition-theme',
                            {
                              'before:opacity-0': !copied,
                              'before:opacity-100': copied,
                            },
                          ),
                          title: 'Copy Code',
                          onClick: () => copyToClipboard(),
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className: 'i-ph:clipboard-text-duotone',
                            },
                            void 0,
                            false,
                            {
                              fileName: '[project]/app/components/chat/CodeBlock.tsx',
                              lineNumber: 74,
                              columnNumber: 15,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/chat/CodeBlock.tsx',
                          lineNumber: 63,
                          columnNumber: 13,
                        },
                        this,
                      ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/chat/CodeBlock.tsx',
                    lineNumber: 53,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    dangerouslySetInnerHTML: {
                      __html: html ?? '',
                    },
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/chat/CodeBlock.tsx',
                    lineNumber: 78,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/app/components/chat/CodeBlock.tsx',
              lineNumber: 52,
              columnNumber: 7,
            },
            this,
          );
        });
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, false);
  },
  '[project]/app/components/chat/Markdown.module.scss.module.css [app-ssr] (css module)': (__turbopack_context__) => {
    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.v({
        MarkdownContent: 'Markdown-module-scss-module__VSJ-WW__MarkdownContent',
      });
    }
  },
  '[project]/app/components/chat/ThoughtBox.tsx [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname } = __turbopack_context__;
    {
      __turbopack_context__.s({
        default: () => __TURBOPACK__default__export__,
      });
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)',
        );
      var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
        __turbopack_context__.i(
          '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)',
        );
      const ThoughtBox = ({ title, children }) => {
        const [isExpanded, setIsExpanded] = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'useState'
        ])(false);
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            onClick: () => setIsExpanded(!isExpanded),
            className: `
        bg-bolt-elements-background-depth-2
        shadow-md 
        rounded-lg 
        cursor-pointer 
        transition-all 
        duration-300
        ${isExpanded ? 'max-h-96' : 'max-h-13'}
        overflow-auto
        border border-bolt-elements-borderColor
      `,
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className:
                    'p-4 flex items-center gap-4 rounded-lg  text-bolt-elements-textSecondary font-medium leading-5 text-sm  border border-bolt-elements-borderColor',
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'i-ph:brain-thin text-2xl',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/app/components/chat/ThoughtBox.tsx',
                        lineNumber: 22,
                        columnNumber: 9,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'div',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'span',
                            {
                              children: [' ', title],
                            },
                            void 0,
                            true,
                            {
                              fileName: '[project]/app/components/chat/ThoughtBox.tsx',
                              lineNumber: 24,
                              columnNumber: 11,
                            },
                            this,
                          ),
                          ' ',
                          !isExpanded &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                className: 'text-bolt-elements-textTertiary',
                                children: ' - Click to expand',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/chat/ThoughtBox.tsx',
                                lineNumber: 25,
                                columnNumber: 27,
                              },
                              this,
                            ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: '[project]/app/components/chat/ThoughtBox.tsx',
                        lineNumber: 23,
                        columnNumber: 9,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: '[project]/app/components/chat/ThoughtBox.tsx',
                  lineNumber: 21,
                  columnNumber: 7,
                },
                this,
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className: `
        transition-opacity 
        duration-300
        p-4 
        rounded-lg 
        ${isExpanded ? 'opacity-100' : 'opacity-0'}
      `,
                  children: children,
                },
                void 0,
                false,
                {
                  fileName: '[project]/app/components/chat/ThoughtBox.tsx',
                  lineNumber: 28,
                  columnNumber: 7,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: '[project]/app/components/chat/ThoughtBox.tsx',
            lineNumber: 7,
            columnNumber: 5,
          },
          this,
        );
      };
      const __TURBOPACK__default__export__ = ThoughtBox;
    }
  },
  '[project]/app/components/chat/Markdown.tsx [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({
          Markdown: () => Markdown,
          stripCodeFenceFromArtifact: () => stripCodeFenceFromArtifact,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$10$2e$1$2e$0_$40$types$2b$react$40$17$2e$0$2e$83_react$40$18$2e$3$2e$1$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/react-markdown@10.1.0_@types+react@17.0.83_react@18.3.1/node_modules/react-markdown/lib/index.js [app-ssr] (ecmascript) <export Markdown as default>',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/logger.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/utils/markdown.ts [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Artifact$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/app/components/chat/Artifact.tsx [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/app/components/chat/CodeBlock.tsx [app-ssr] (ecmascript)');
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Markdown$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ =
          __turbopack_context__.i(
            '[project]/app/components/chat/Markdown.module.scss.module.css [app-ssr] (css module)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$ThoughtBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/app/components/chat/ThoughtBox.tsx [app-ssr] (ecmascript)');
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Artifact$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ]);
        [
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Artifact$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ] = __turbopack_async_dependencies__.then
          ? (await __turbopack_async_dependencies__)()
          : __turbopack_async_dependencies__;
        const logger = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'createScopedLogger'
        ])('MarkdownComponent');
        const Markdown = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          'memo'
        ])(({ children, content, html = false, limitedMarkdown = false }) => {
          // Utiliser soit content soit children
          const textContent = content || children || '';
          logger.trace('Render');
          const components = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useMemo'
          ])(() => {
            return {
              div: ({ className, children, node, ...props }) => {
                if (className?.includes('__boltArtifact__')) {
                  const messageId = node?.properties.dataMessageId;
                  if (!messageId) {
                    logger.error(`Invalid message id ${messageId}`);
                  }
                  return /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Artifact$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'Artifact'
                    ],
                    {
                      messageId: messageId,
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/app/components/chat/Markdown.tsx',
                      lineNumber: 36,
                      columnNumber: 18,
                    },
                    this,
                  );
                }
                if (className?.includes('__boltThought__')) {
                  return /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$ThoughtBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'default'
                    ],
                    {
                      title: 'Thought process',
                      children: children,
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/app/components/chat/Markdown.tsx',
                      lineNumber: 40,
                      columnNumber: 18,
                    },
                    this,
                  );
                }
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: className,
                    ...props,
                    children: children,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/chat/Markdown.tsx',
                    lineNumber: 44,
                    columnNumber: 11,
                  },
                  this,
                );
              },
              pre: (props) => {
                const { children, node, ...rest } = props;
                const [firstChild] = node?.children ?? [];
                if (
                  firstChild &&
                  firstChild.type === 'element' &&
                  firstChild.tagName === 'code' &&
                  firstChild.children[0].type === 'text'
                ) {
                  const { className, ...rest } = firstChild.properties;
                  const [, language = 'plaintext'] = /language-(\w+)/.exec(String(className) || '') ?? [];
                  return /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$CodeBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      'CodeBlock'
                    ],
                    {
                      code: firstChild.children[0].value,
                      language: language,
                      ...rest,
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/app/components/chat/Markdown.tsx',
                      lineNumber: 63,
                      columnNumber: 18,
                    },
                    this,
                  );
                }
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'pre',
                  {
                    ...rest,
                    children: children,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/chat/Markdown.tsx',
                    lineNumber: 66,
                    columnNumber: 16,
                  },
                  this,
                );
              },
            };
          }, []);
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$10$2e$1$2e$0_$40$types$2b$react$40$17$2e$0$2e$83_react$40$18$2e$3$2e$1$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__[
              'default'
            ],
            {
              allowedElements:
                __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'allowedHTMLElements'
                ],
              className:
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Markdown$2e$module$2e$scss$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__[
                  'default'
                ].MarkdownContent,
              components: components,
              remarkPlugins: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'remarkPlugins'
              ])(limitedMarkdown),
              rehypePlugins: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                'rehypePlugins'
              ])(html),
              children: stripCodeFenceFromArtifact(textContent),
            },
            void 0,
            false,
            {
              fileName: '[project]/app/components/chat/Markdown.tsx',
              lineNumber: 72,
              columnNumber: 5,
            },
            this,
          );
        });
        const stripCodeFenceFromArtifact = (content) => {
          if (!content || !content.includes('__boltArtifact__')) {
            return content;
          }
          const lines = content.split('\n');
          const artifactLineIndex = lines.findIndex((line) => line.includes('__boltArtifact__'));
          // Return original content if artifact line not found
          if (artifactLineIndex === -1) {
            return content;
          }
          // Check previous line for code fence
          if (artifactLineIndex > 0 && lines[artifactLineIndex - 1]?.trim().match(/^```\w*$/)) {
            lines[artifactLineIndex - 1] = '';
          }
          if (artifactLineIndex < lines.length - 1 && lines[artifactLineIndex + 1]?.trim().match(/^```$/)) {
            lines[artifactLineIndex + 1] = '';
          }
          return lines.join('\n');
        };
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, false);
  },
  '[project]/app/components/workbench/IdeationWorkbench.tsx [app-ssr] (ecmascript)': (__turbopack_context__) => {
    'use strict';

    var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
    __turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => {
      try {
        __turbopack_context__.s({
          IdeationWorkbench: () => IdeationWorkbench,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)',
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)',
          );
        (() => {
          const e = new Error("Cannot find module '../../lib/examples/ideation-workflow'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        })();
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Markdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i('[project]/app/components/chat/Markdown.tsx [app-ssr] (ecmascript)');
        var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Markdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ]);
        [
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Markdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
        ] = __turbopack_async_dependencies__.then
          ? (await __turbopack_async_dependencies__)()
          : __turbopack_async_dependencies__;
        ('use client');
        const IdeationWorkbench = ({ initialIdea = '' }) => {
          const [idea, setIdea] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(initialIdea);
          const [context, setContext] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(null);
          const [isProcessing, setIsProcessing] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false);
          const [activeView, setActiveView] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])('idea');
          const [results, setResults] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])({});
          const [workflowSteps, setWorkflowSteps] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'useState'
          ])([
            {
              id: 'ideation',
              name: 'Idéation',
              description: "Génération et raffinement d'idées",
              isActive: true,
              isCompleted: false,
            },
            {
              id: 'market',
              name: 'Analyse de marché',
              description: 'Étude de la concurrence et des opportunités',
              isActive: false,
              isCompleted: false,
            },
            {
              id: 'documentation',
              name: 'Documentation',
              description: 'Création des documents de projet',
              isActive: false,
              isCompleted: false,
            },
            {
              id: 'design',
              name: 'Design',
              description: 'Création de wireframes et maquettes',
              isActive: false,
              isCompleted: false,
            },
            {
              id: 'development',
              name: 'Développement',
              description: 'Génération de code et architecture',
              isActive: false,
              isCompleted: false,
            },
            {
              id: 'deployment',
              name: 'Déploiement',
              description: 'Préparation au déploiement',
              isActive: false,
              isCompleted: false,
            },
          ]);
          const handleIdeaChange = (e) => {
            setIdea(e.target.value);
          };
          const handleStartWorkflow = async () => {
            if (!idea.trim()) return;
            setIsProcessing(true);
            try {
              // Simule un appel à l'orchestrateur d'agents
              const workflowResults = await runIdeationWorkflow(idea);
              // Met à jour les résultats et marque l'étape comme complétée
              setResults((prev) => ({
                ...prev,
                ideation: workflowResults,
              }));
              setWorkflowSteps((steps) =>
                steps.map((step) =>
                  step.id === 'ideation'
                    ? {
                        ...step,
                        isCompleted: true,
                      }
                    : step.id === 'market'
                      ? {
                          ...step,
                          isActive: true,
                        }
                      : step,
                ),
              );
              setActiveView('results');
            } catch (error) {
              console.error("Erreur lors de l'exécution du workflow:", error);
            } finally {
              setIsProcessing(false);
            }
          };
          const activateStep = (stepId) => {
            setWorkflowSteps((steps) =>
              steps.map((step) => ({
                ...step,
                isActive: step.id === stepId,
              })),
            );
            setActiveView(stepId);
          };
          const renderStepContent = (stepId) => {
            switch (stepId) {
              case 'ideation':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'ideation-input',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Décrivez votre idée',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 117,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'textarea',
                        {
                          value: idea,
                          onChange: handleIdeaChange,
                          placeholder: 'Décrivez votre idée ou concept en quelques phrases...',
                          rows: 5,
                          className: 'idea-textarea',
                          disabled: isProcessing,
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 118,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          onClick: handleStartWorkflow,
                          disabled: !idea.trim() || isProcessing,
                          className: 'start-button',
                          children: isProcessing ? 'Traitement en cours...' : "Démarrer le processus d'idéation",
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 126,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 116,
                    columnNumber: 11,
                  },
                  this,
                );
              case 'results':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'results-view',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: "Résultats de l'idéation",
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 139,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      results.ideation &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'result-content',
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$chat$2f$Markdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                'Markdown'
                              ],
                              {
                                content: JSON.stringify(results.ideation, null, 2),
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 142,
                                columnNumber: 17,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                            lineNumber: 141,
                            columnNumber: 15,
                          },
                          this,
                        ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 138,
                    columnNumber: 11,
                  },
                  this,
                );
              case 'market':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'market-analysis',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Analyse de marché',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 151,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'p',
                        {
                          children:
                            "Cette section vous permettra d'analyser le marché, la concurrence et les opportunités pour votre projet.",
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 152,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: 'action-button',
                          onClick: () => console.log("Lancement de l'analyse de marché"),
                          children: "Lancer l'analyse de marché",
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 153,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 150,
                    columnNumber: 11,
                  },
                  this,
                );
              case 'documentation':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'documentation',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Génération de documentation',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 165,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'p',
                        {
                          children:
                            'Génération automatique de documents pour votre projet: business plan, cahier des charges, spécifications techniques...',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 166,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'doc-selector',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'label',
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'input',
                                    {
                                      type: 'checkbox',
                                      value: 'business-plan',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 169,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  ' Business Plan',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 168,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'label',
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'input',
                                    {
                                      type: 'checkbox',
                                      value: 'specs',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 172,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  ' Cahier des charges',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 171,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'label',
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'input',
                                    {
                                      type: 'checkbox',
                                      value: 'technical',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 175,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  ' Documentation technique',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 174,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 167,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: 'action-button',
                          children: 'Générer les documents',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 178,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 164,
                    columnNumber: 11,
                  },
                  this,
                );
              case 'design':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'design-workspace',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Espace de design',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 187,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'p',
                        {
                          children: 'Créez des wireframes, maquettes et prototypes pour votre projet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 188,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'design-actions',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'button',
                              {
                                className: 'action-button',
                                children: 'Générer wireframes',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 190,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'button',
                              {
                                className: 'action-button',
                                children: 'Créer maquette haute-fidélité',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 191,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'button',
                              {
                                className: 'action-button',
                                children: 'Prototype interactif',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 192,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 189,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'preview-area',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'p',
                            {
                              children: "L'aperçu du design s'affichera ici",
                            },
                            void 0,
                            false,
                            {
                              fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                              lineNumber: 195,
                              columnNumber: 15,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 194,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 186,
                    columnNumber: 11,
                  },
                  this,
                );
              case 'development':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'development',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Développement',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 203,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'p',
                        {
                          children: 'Génération de code et architecture pour votre projet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 204,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'tech-stack-selector',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'h3',
                              {
                                children: 'Sélectionnez votre stack technologique:',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 206,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'select',
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'react',
                                      children: 'React',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 208,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'vue',
                                      children: 'Vue.js',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 209,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'angular',
                                      children: 'Angular',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 210,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'node',
                                      children: 'Node.js',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 211,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'python',
                                      children: 'Python',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 212,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 207,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 205,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: 'action-button',
                          children: "Générer l'architecture",
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 215,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 202,
                    columnNumber: 11,
                  },
                  this,
                );
              case 'deployment':
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'deployment',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Déploiement',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 224,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'p',
                        {
                          children: 'Préparation au déploiement de votre projet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 225,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'deployment-options',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'h3',
                              {
                                children: 'Options de déploiement:',
                              },
                              void 0,
                              false,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 227,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'select',
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'vercel',
                                      children: 'Vercel',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 229,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'netlify',
                                      children: 'Netlify',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 230,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'aws',
                                      children: 'AWS',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 231,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'gcp',
                                      children: 'Google Cloud',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 232,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'option',
                                    {
                                      value: 'azure',
                                      children: 'Azure',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 233,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 228,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 226,
                          columnNumber: 13,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: 'action-button',
                          children: 'Préparer le déploiement',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 236,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 223,
                    columnNumber: 11,
                  },
                  this,
                );
              default:
                return /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    children: 'Sélectionnez une étape du workflow',
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 243,
                    columnNumber: 16,
                  },
                  this,
                );
            }
          };
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'ideation-workbench',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'workbench-sidebar',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'h2',
                        {
                          children: 'Flux de travail',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 250,
                          columnNumber: 9,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'workflow-steps',
                          children: workflowSteps.map((step) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: `workflow-step ${step.isActive ? 'active' : ''} ${step.isCompleted ? 'completed' : ''}`,
                                onClick: () => step.isActive && activateStep(step.id),
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'step-indicator',
                                      children: step.isCompleted
                                        ? '✓'
                                        : step.id === 'ideation'
                                          ? '1'
                                          : step.id === 'market'
                                            ? '2'
                                            : step.id === 'documentation'
                                              ? '3'
                                              : step.id === 'design'
                                                ? '4'
                                                : step.id === 'development'
                                                  ? '5'
                                                  : '6',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 258,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'step-info',
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'h3',
                                          {
                                            children: step.name,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                            lineNumber: 262,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'p',
                                          {
                                            children: step.description,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                            lineNumber: 263,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                      lineNumber: 261,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              step.id,
                              true,
                              {
                                fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                                lineNumber: 253,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                          lineNumber: 251,
                          columnNumber: 9,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 249,
                    columnNumber: 7,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'workbench-content',
                    children:
                      activeView === 'results'
                        ? renderStepContent('results')
                        : renderStepContent(workflowSteps.find((s) => s.id === activeView)?.id || 'ideation'),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 270,
                    columnNumber: 7,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'style',
                  {
                    children: `
        .ideation-workbench {
          display: flex;
          height: 100%;
          background-color: #f8f9fa;
        }
        
        .workbench-sidebar {
          width: 300px;
          padding: 20px;
          background-color: #212529;
          color: #fff;
          border-radius: 10px 0 0 10px;
        }
        
        .workbench-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }
        
        .workflow-step {
          display: flex;
          padding: 15px 10px;
          margin-bottom: 10px;
          border-radius: 6px;
          background-color: #343a40;
          opacity: 0.7;
          cursor: default;
        }
        
        .workflow-step.active {
          opacity: 1;
          background-color: #495057;
          cursor: pointer;
        }
        
        .workflow-step.completed {
          background-color: #0d6efd;
          opacity: 1;
        }
        
        .step-indicator {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #6c757d;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
        }
        
        .workflow-step.completed .step-indicator {
          background-color: #198754;
        }
        
        .idea-textarea {
          width: 100%;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 6px;
          border: 1px solid #ced4da;
          font-size: 16px;
          resize: vertical;
        }
        
        .start-button, .action-button {
          padding: 12px 24px;
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .start-button:hover, .action-button:hover {
          background-color: #0b5ed7;
        }
        
        .start-button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
        
        .doc-selector, .tech-stack-selector, .deployment-options {
          margin: 20px 0;
        }
        
        .doc-selector label {
          display: block;
          margin-bottom: 10px;
        }
        
        .design-actions {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .preview-area {
          height: 300px;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        
        select {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ced4da;
          width: 100%;
          max-width: 300px;
          margin-top: 10px;
        }
      `,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
                    lineNumber: 276,
                    columnNumber: 7,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/app/components/workbench/IdeationWorkbench.tsx',
              lineNumber: 248,
              columnNumber: 5,
            },
            this,
          );
        };
        __turbopack_async_result__();
      } catch (e) {
        __turbopack_async_result__(e);
      }
    }, false);
  },
};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__0c8e5622._.js.map
