module.exports = {

"[externals]/next/dist/compiled/next-server/pages.runtime.dev.js [external] (next/dist/compiled/next-server/pages.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages.runtime.dev.js", () => require("next/dist/compiled/next-server/pages.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}}),
"[externals]/react [external] (react, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[project]/pages/_document.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/document.js [ssr] (ecmascript)");
;
;
/**
 * Document personnalisé pour Next.js
 * Permet de configurer la structure HTML de base de l'application
 */ class MyDocument extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"] {
    // Méthode statique pour modifier le contexte initial du document
    static async getInitialProps(ctx) {
        const initialProps = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].getInitialProps(ctx);
        return {
            ...initialProps
        };
    }
    render() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Html"], {
            lang: "fr",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Head"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("meta", {
                            charSet: "utf-8"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("meta", {
                            name: "theme-color",
                            content: "#ffffff"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("link", {
                            rel: "icon",
                            href: "/favicon.svg"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("link", {
                            rel: "apple-touch-icon",
                            href: "/logo.svg"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("link", {
                            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
                            rel: "stylesheet"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("link", {
                            rel: "manifest",
                            href: "/manifest.json"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])("body", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("div", {
                            id: "font-loader-observer",
                            "aria-hidden": "true"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("div", {
                            id: "portal-root"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Main"], {}),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["NextScript"], {})
                    ]
                })
            ]
        });
    }
}
const __TURBOPACK__default__export__ = MyDocument;
}}),
"[externals]/next/head.js [external] (next/head.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/head.js", () => require("next/head.js"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

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
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$head$2e$js__$5b$external$5d$__$28$next$2f$head$2e$js$2c$__cjs$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("title", {
                        children: "BoltVision"
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("meta", {
                        name: "description",
                        content: "BoltVision - Application de développement intelligent"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])(Component, {
                ...pageProps
            })
        ]
    });
}
}}),
"[externals]/next/error.js [external] (next/error.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/error.js", () => require("next/error.js"));

module.exports = mod;
}}),
"[project]/pages/_error.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$error$2e$js__$5b$external$5d$__$28$next$2f$error$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next/error.js [external] (next/error.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/logger.ts [ssr] (ecmascript)");
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$logger$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createScopedLogger"])('_error');
/**
 * Page d'erreur personnalisée pour Next.js
 * Remplace le ErrorBoundary de Remix
 */ class ErrorPage extends __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].Component {
    static getInitialProps = async (context)=>{
        const errorInitialProps = await __TURBOPACK__imported__module__$5b$externals$5d2f$next$2f$error$2e$js__$5b$external$5d$__$28$next$2f$error$2e$js$2c$__cjs$29$__["default"].getInitialProps(context);
        const { res, err, asPath } = context;
        // Journalisation des erreurs pour le débogage
        if (err) {
            logger.error(`Erreur non gérée sur ${asPath}`, {
                status: errorInitialProps.statusCode,
                message: err.message,
                stack: err.stack
            });
        }
        // Configuration du code d'état HTTP sur le serveur
        if (res && res.statusCode === 404) {
            return {
                statusCode: 404,
                hasGetInitialPropsRun: true
            };
        }
        return {
            ...errorInitialProps,
            hasGetInitialPropsRun: true,
            err
        };
    };
    render() {
        const { statusCode, err } = this.props;
        const title = statusCode === 404 ? 'Page non trouvée' : 'Une erreur est survenue';
        // Style de base pour la page d'erreur
        const styles = {
            container: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '0 1rem',
                textAlign: 'center',
                backgroundColor: '#f9fafb'
            },
            statusCode: {
                fontSize: '6rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#3B82F6'
            },
            title: {
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1F2937'
            },
            message: {
                fontSize: '1rem',
                marginBottom: '2rem',
                color: '#4B5563',
                maxWidth: '500px'
            },
            button: {
                padding: '0.5rem 1.5rem',
                backgroundColor: '#3B82F6',
                color: 'white',
                borderRadius: '0.375rem',
                fontWeight: 'medium',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            }
        };
        // Message d'erreur approprié selon le code de statut
        let errorMessage = 'Nous rencontrons un problème technique. Veuillez réessayer plus tard.';
        if (statusCode === 404) {
            errorMessage = "La page que vous recherchez n'existe pas ou a été déplacée.";
        } else if (statusCode === 403) {
            errorMessage = "Vous n'avez pas les permissions nécessaires pour accéder à cette page.";
        } else if (statusCode === 429) {
            errorMessage = 'Trop de requêtes. Veuillez réessayer dans quelques instants.';
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])("div", {
            style: styles.container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("div", {
                    style: styles.statusCode,
                    children: statusCode || '500'
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("h1", {
                    style: styles.title,
                    children: title
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("p", {
                    style: styles.message,
                    children: errorMessage
                }),
                ("TURBOPACK compile-time value", "development") !== 'production' && err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])("div", {
                    style: {
                        textAlign: 'left',
                        maxWidth: '800px',
                        marginBottom: '2rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("h2", {
                            style: {
                                fontSize: '1.25rem',
                                marginBottom: '0.5rem'
                            },
                            children: "Détails de l'erreur:"
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsxs"])("pre", {
                            style: {
                                backgroundColor: '#282c34',
                                color: '#abb2bf',
                                padding: '1rem',
                                borderRadius: '0.375rem',
                                overflow: 'auto',
                                maxHeight: '300px'
                            },
                            children: [
                                err && 'message' in err ? err.message : 'Erreur inconnue',
                                err && 'stack' in err ? `\n\n${err.stack}` : ''
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$runtime$2c$__cjs$29$__["jsx"])("button", {
                    style: styles.button,
                    onClick: ()=>window.location.href = '/',
                    children: "Retour à l'accueil"
                })
            ]
        });
    }
}
const __TURBOPACK__default__export__ = ErrorPage;
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__de25985b._.js.map