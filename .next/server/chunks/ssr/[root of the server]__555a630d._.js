module.exports = {

"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[externals]/next/head.js [external] (next/head.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/head.js", () => require("next/head.js"));

module.exports = mod;
}}),
"[externals]/react [external] (react, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/utils/logger.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// utils/logger.ts
// import chalk from 'chalk'; // Commented out chalk
__turbopack_context__.s({
    "createScopedLogger": (()=>createScopedLogger),
    "logger": (()=>logger),
    "renderLogger": (()=>renderLogger)
});
let currentLevel = process.env.VITE_LOG_LEVEL ?? ("TURBOPACK compile-time value", "development") !== 'production' ? 'debug' : 'info';
// Configuration du logger pour écrire dans des fichiers
let logDirectory;
let fsModule;
let pathModule;
if ("TURBOPACK compile-time truthy", 1) {
    fsModule = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    pathModule = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
    logDirectory = pathModule.join(__dirname, '..', '..', 'docs', 'logs');
    if (fsModule && !fsModule.existsSync(logDirectory)) {
        fsModule.mkdirSync(logDirectory, {
            recursive: true
        });
    }
}
const logToFile = (filename, message)=>{
    if ("undefined" === 'undefined' && fsModule && pathModule && logDirectory) {
        const logFilePath = pathModule.join(logDirectory, filename);
        fsModule.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
    }
};
const logger = {
    trace: (...messages)=>log('trace', undefined, messages),
    debug: (...messages)=>log('debug', undefined, messages),
    info: (...messages)=>log('info', undefined, messages),
    warn: (...messages)=>log('warn', undefined, messages),
    error: (...messages)=>log('error', undefined, messages),
    setLevel
};
function createScopedLogger(scope) {
    return {
        trace: (...messages)=>log('trace', scope, messages),
        debug: (...messages)=>log('debug', scope, messages),
        info: (...messages)=>log('info', scope, messages),
        warn: (...messages)=>log('warn', scope, messages),
        error: (...messages)=>log('error', scope, messages),
        setLevel
    };
}
function setLevel(level) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    currentLevel = level;
}
function log(level, scope, messages) {
    const levelOrder = [
        'trace',
        'debug',
        'info',
        'warn',
        'error'
    ];
    if (levelOrder.indexOf(level) < levelOrder.indexOf(currentLevel)) {
        return;
    }
    const allMessages = messages.reduce((acc, current)=>{
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
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        console.log(`${level.toUpperCase()} ${scope ? `[${scope}] ` : ''}`, allMessages); // Simplified output for non-browser
    }
    // Écriture dans les fichiers de log
    const logMessage = `${level.toUpperCase()} - ${scope ? `[${scope}] ` : ''}${allMessages}`;
    switch(level){
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
    switch(level){
        case 'trace':
        case 'debug':
            {
                return '#77828D';
            }
        case 'info':
            {
                return '#1389FD';
            }
        case 'warn':
            {
                return '#FFDB6C';
            }
        case 'error':
            {
                return '#EE4744';
            }
        default:
            {
                return '#000000';
            }
    }
}
const renderLogger = createScopedLogger('Render');
}}),
"[project]/pages/_app.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$head$2e$js__$5b$external$5d$__$28$next$2f$head$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/head.js [external] (next/head.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/logger.ts [ssr] (ecmascript)");
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createScopedLogger"])('_app');
function App({ Component, pageProps, router }) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Log de navigation pour le débogage
        logger.debug('Route change', {
            path: router.pathname
        });
        // Exemple de mesure de performance
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        if (navigationTiming) {
            logger.debug('Navigation timing', {
                loadTime: navigationTiming.loadEventEnd - navigationTiming.startTime,
                domReadyTime: navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime
            });
        }
    }, [
        router.pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$head$2e$js__$5b$external$5d$__$28$next$2f$head$2e$js$2c$__cjs$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "BoltVision"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "BoltVision - Application de développement intelligent"
                    }, void 0, false, {
                        fileName: "[project]/pages/_app.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/_app.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/pages/_app.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__555a630d._.js.map