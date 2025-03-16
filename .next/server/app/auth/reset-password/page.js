(()=>{var e={};e.id=89,e.ids=[89],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},18944:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,metadata:()=>o});var s=r(34334);r(6671);var i=r(59136),n=r.n(i);let o={title:"BoltVision - R\xe9initialisation du mot de passe",description:"R\xe9initialisez votre mot de passe BoltVision"};function l(){return(0,s.jsx)("main",{className:"flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",children:(0,s.jsxs)("div",{className:"w-full max-w-md",children:[(0,s.jsxs)("div",{className:"text-center mb-8",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold text-gray-900",children:"R\xe9initialiser votre mot de passe"}),(0,s.jsx)("p",{className:"mt-2 text-sm text-gray-600",children:"Nous vous enverrons un lien pour r\xe9initialiser votre mot de passe"})]}),(0,s.jsx)(n(),{})]})})}},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},27029:(e,t,r)=>{"use strict";r.d(t,{AuthProvider:()=>o});var s=r(30140),i=r(42021);let n=(0,i.createContext)({user:null,isLoading:!1,error:null,login:async()=>{},register:async()=>{},logout:()=>{},resetPassword:async()=>{}}),o=({children:e})=>{let[t,r]=(0,i.useState)(null),[o,l]=(0,i.useState)(!0),[a,d]=(0,i.useState)(null);(0,i.useEffect)(()=>{(async()=>{try{let e=localStorage.getItem("isAuthenticated");"true"===e&&r({id:"1",email:"utilisateur@exemple.com",name:"Utilisateur Test"})}catch(e){console.error("Erreur lors de la v\xe9rification de l'authentification:",e)}finally{l(!1)}})()},[]);let c=async(e,t)=>{l(!0),d(null);try{if(await new Promise(e=>setTimeout(e,1e3)),e&&t){let t={id:"1",email:e,name:e.split("@")[0]};r(t),localStorage.setItem("isAuthenticated","true")}else throw Error("Email et mot de passe requis")}catch(e){throw d(e instanceof Error?e.message:"Erreur lors de la connexion"),e}finally{l(!1)}},u=async(e,t,s)=>{l(!0),d(null);try{if(await new Promise(e=>setTimeout(e,1500)),e&&t&&s)r({id:"1",email:t,name:e}),localStorage.setItem("isAuthenticated","true");else throw Error("Tous les champs sont requis")}catch(e){throw d(e instanceof Error?e.message:"Erreur lors de l'inscription"),e}finally{l(!1)}},m=async e=>{l(!0),d(null);try{if(await new Promise(e=>setTimeout(e,1e3)),!e)throw Error("Email requis");return}catch(e){throw d(e instanceof Error?e.message:"Erreur lors de la r\xe9initialisation"),e}finally{l(!1)}};return(0,s.jsx)(n.Provider,{value:{user:t,isLoading:o,error:a,login:c,register:u,logout:()=>{r(null),localStorage.removeItem("isAuthenticated")},resetPassword:m},children:e})}},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30214:()=>{},33873:e=>{"use strict";e.exports=require("path")},38462:()=>{},46359:(e,t,r)=>{"use strict";r.d(t,{AuthProvider:()=>i});var s=r(84702);(0,s.registerClientReference)(function(){throw Error("Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\IA\\Applications IA\\myboltvision\\components\\auth\\AuthContext.tsx","useAuth");let i=(0,s.registerClientReference)(function(){throw Error("Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\IA\\Applications IA\\myboltvision\\components\\auth\\AuthContext.tsx","AuthProvider")},46989:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/logo.30f7e16f.svg",height:83,width:95,blurWidth:0,blurHeight:0}},48526:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,79035,23)),Promise.resolve().then(r.t.bind(r,58631,23)),Promise.resolve().then(r.t.bind(r,91643,23)),Promise.resolve().then(r.t.bind(r,60330,23)),Promise.resolve().then(r.t.bind(r,68654,23)),Promise.resolve().then(r.t.bind(r,42482,23)),Promise.resolve().then(r.t.bind(r,98752,23)),Promise.resolve().then(r.t.bind(r,67130,23))},52050:(e,t,r)=>{Promise.resolve().then(r.bind(r,46359)),Promise.resolve().then(r.t.bind(r,91581,23)),Promise.resolve().then(r.t.bind(r,59084,23)),Promise.resolve().then(r.bind(r,46989))},59136:()=>{throw Error("Module build failed (from ./node_modules/.pnpm/next@15.2.2_@babel+core@7.2_d8a8fc4ae419e50a74621c1684c62463/node_modules/next/dist/build/webpack/loaders/next-swc-loader.js):\nError:   \x1b[31m\xd7\x1b[0m You're importing a component that needs `useState`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `\"use client\"` directive.\n  \x1b[31m│\x1b[0m \n  \x1b[31m│\x1b[0m  Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client\n  \x1b[31m│\x1b[0m \n  \x1b[31m│\x1b[0m \n   ╭─[\x1b[36;1;4mD:\\IA\\Applications IA\\myboltvision\\components\\auth\\ResetPasswordForm.tsx\x1b[0m:1:1]\n \x1b[2m1\x1b[0m │ import React, { useState } from 'react';\n   \xb7 \x1b[35;1m                ────────\x1b[0m\n \x1b[2m2\x1b[0m │ import { useAuth } from './AuthContext.tsx';\n \x1b[2m3\x1b[0m │ \n \x1b[2m4\x1b[0m │ interface ResetPasswordFormProps {\n   ╰────\n")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},66715:(e,t,r)=>{Promise.resolve().then(r.bind(r,74446))},69732:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,metadata:()=>m});var s=r(34334),i=r(46359);r(6671);let n=()=>(0,s.jsx)("footer",{className:"bg-gray-100 py-4 mt-8",children:(0,s.jsx)("div",{className:"container mx-auto text-center px-4",children:(0,s.jsxs)("p",{className:"text-gray-600",children:["\xa9 ",new Date().getFullYear()," BoltVision. Tous droits r\xe9serv\xe9s."]})})});var o=r(16341),l=r(91581),a=r.n(l),d=r(46989);let c=()=>(0,s.jsx)("nav",{children:(0,s.jsxs)("ul",{className:"flex space-x-6",children:[(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/",className:"hover:text-blue-500",children:"Accueil"})}),(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/features/",className:"hover:text-blue-500",children:"Fonctionnalit\xe9s"})}),(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/pricing/",className:"hover:text-blue-500",children:"Tarifs"})}),(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/contact/",className:"hover:text-blue-500",children:"Contact"})})]})}),u=()=>(0,s.jsx)("header",{className:"bg-white shadow-md py-4",children:(0,s.jsxs)("div",{className:"container mx-auto flex items-center justify-between px-4",children:[(0,s.jsx)(a(),{href:"/",children:(0,s.jsx)(o.default,{src:d.default,alt:"BoltVision Logo",width:100,height:24})}),(0,s.jsx)(c,{})]})}),m={title:"Next.js",description:"Generated by Next.js"};function h({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{children:(0,s.jsx)(i.AuthProvider,{children:(0,s.jsxs)("div",{className:"flex flex-col min-h-screen",children:[(0,s.jsx)(u,{}),e,(0,s.jsx)(n,{})]})})})})}},74140:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(30140);function i({error:e,reset:t}){return(0,s.jsxs)("div",{children:[(0,s.jsx)("h2",{children:"Something went wrong!"}),(0,s.jsx)("button",{onClick:()=>t(),children:"Try again"})]})}r(42021)},74446:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(84702).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\IA\\\\Applications IA\\\\myboltvision\\\\app\\\\error.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\IA\\Applications IA\\myboltvision\\app\\error.tsx","default")},77331:(e,t,r)=>{Promise.resolve().then(r.bind(r,74140))},87468:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var s=r(37318),i=r(26561),n=r(68585),o=r.n(n),l=r(32406),a={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(a[e]=()=>l[e]);r.d(t,a);let d={children:["",{children:["auth",{children:["reset-password",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,18944)),"D:\\IA\\Applications IA\\myboltvision\\app\\auth\\reset-password\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,69732)),"D:\\IA\\Applications IA\\myboltvision\\app\\layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,74446)),"D:\\IA\\Applications IA\\myboltvision\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,82543,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,79826,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,47691,23)),"next/dist/client/components/unauthorized-error"]}]}.children,c=["D:\\IA\\Applications IA\\myboltvision\\app\\auth\\reset-password\\page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/auth/reset-password/page",pathname:"/auth/reset-password",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},87846:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,33177,23)),Promise.resolve().then(r.t.bind(r,53761,23)),Promise.resolve().then(r.t.bind(r,68585,23)),Promise.resolve().then(r.t.bind(r,14776,23)),Promise.resolve().then(r.t.bind(r,27400,23)),Promise.resolve().then(r.t.bind(r,76332,23)),Promise.resolve().then(r.t.bind(r,49786,23)),Promise.resolve().then(r.t.bind(r,94620,23))},94253:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/logo.30f7e16f.svg",height:83,width:95,blurWidth:0,blurHeight:0}},98906:(e,t,r)=>{Promise.resolve().then(r.bind(r,27029)),Promise.resolve().then(r.t.bind(r,21423,23)),Promise.resolve().then(r.t.bind(r,70786,23)),Promise.resolve().then(r.bind(r,94253))}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[488,799,862],()=>r(87468));module.exports=s})();