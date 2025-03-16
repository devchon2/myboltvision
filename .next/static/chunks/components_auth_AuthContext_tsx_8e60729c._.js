(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/components_auth_AuthContext_tsx_8e60729c._.js", {

"[project]/components/auth/AuthContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
// Valeur par défaut du contexte
const defaultContext = {
    user: null,
    isLoading: false,
    error: null,
    login: async ()=>{},
    register: async ()=>{},
    logout: ()=>{},
    resetPassword: async ()=>{}
};
// Création du contexte
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultContext);
const useAuth = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
};
_s(useAuth, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const AuthProvider = ({ children })=>{
    _s1();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Vérifier si l'utilisateur est déjà authentifié
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const checkAuth = {
                "AuthProvider.useEffect.checkAuth": async ()=>{
                    try {
                        // Vérifier le localStorage pour une authentification précédente
                        const isAuth = localStorage.getItem('isAuthenticated');
                        if (isAuth === 'true') {
                            // Simulation d'un utilisateur connecté
                            setUser({
                                id: '1',
                                email: 'utilisateur@exemple.com',
                                name: 'Utilisateur Test'
                            });
                        }
                    } catch (err) {
                        console.error("Erreur lors de la vérification de l'authentification:", err);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["AuthProvider.useEffect.checkAuth"];
            checkAuth();
        }
    }["AuthProvider.useEffect"], []);
    // Fonction de connexion
    const login = async (email, password)=>{
        setIsLoading(true);
        setError(null);
        try {
            // Simulation d'une API de connexion
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // Vérification simplifiée (à remplacer par votre logique réelle)
            if (email && password) {
                // Simulation d'un utilisateur connecté
                const loggedUser = {
                    id: '1',
                    email,
                    name: email.split('@')[0]
                };
                setUser(loggedUser);
                localStorage.setItem('isAuthenticated', 'true');
            } else {
                throw new Error('Email et mot de passe requis');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la connexion');
            throw err;
        } finally{
            setIsLoading(false);
        }
    };
    // Fonction d'inscription
    const register = async (name, email, password)=>{
        setIsLoading(true);
        setError(null);
        try {
            // Simulation d'une API d'inscription
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            // Vérification simplifiée (à remplacer par votre logique réelle)
            if (name && email && password) {
                // Simulation d'un utilisateur inscrit et connecté
                const newUser = {
                    id: '1',
                    email,
                    name
                };
                setUser(newUser);
                localStorage.setItem('isAuthenticated', 'true');
            } else {
                throw new Error('Tous les champs sont requis');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
            throw err;
        } finally{
            setIsLoading(false);
        }
    };
    // Fonction de déconnexion
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('isAuthenticated');
    };
    // Fonction de réinitialisation du mot de passe
    const resetPassword = async (email)=>{
        setIsLoading(true);
        setError(null);
        try {
            // Simulation d'une API de réinitialisation
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // Vérification simplifiée (à remplacer par votre logique réelle)
            if (!email) {
                throw new Error('Email requis');
            }
            // Succès simulé
            return;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la réinitialisation');
            throw err;
        } finally{
            setIsLoading(false);
        }
    };
    // Valeur du contexte
    const value = {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        resetPassword
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2_$40$babel$2b$core$40$7$2e$2_d8a8fc4ae419e50a74621c1684c62463$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/auth/AuthContext.tsx",
        lineNumber: 176,
        columnNumber: 10
    }, this);
};
_s1(AuthProvider, "caAZa649wyY9nHJT6au393y4yCs=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_auth_AuthContext_tsx_8e60729c._.js.map