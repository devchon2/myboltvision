"use strict";(()=>{var e={};e.id=552,e.ids=[552],e.modules={3295:e=>{e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29021:e=>{e.exports=require("fs")},29294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{e.exports=require("path")},44870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},79428:e=>{e.exports=require("buffer")},94261:(e,t,r)=>{r.r(t),r.d(t,{patchFetch:()=>y,routeModule:()=>m,serverHooks:()=>x,workAsyncStorage:()=>g,workUnitAsyncStorage:()=>v});var s={};r.r(s),r.d(s,{GET:()=>c});var o=r(18684),a=r(26561),n=r(14488),i=r(61749),p=r(99968),d=r(15421);let l=[],u=null;async function c(e){let t=Object.entries(process.env).filter(([e,t])=>void 0!==t).reduce((e,[t,r])=>(e[t]=r,e),{}),r=d.N.getInstance(t),s=e.headers.get("Cookie")||"",o=(0,p.zw)(s),a=(0,p.nX)(s),{providers:n,defaultProvider:c}=function(e){if(0===l.length&&(l=e.getAllProviders().map(e=>({name:e.name,displayName:e.name,models:e.staticModels?.map(e=>e.name)||[],getModelInstance:e.getModelInstance||(()=>{}),staticModels:e.staticModels,getApiKeyLink:e.getApiKeyLink,labelForGetApiKey:e.labelForGetApiKey,icon:e.icon}))),!u){let t=e.getDefaultProvider();u={name:t.name,displayName:t.name,models:t.staticModels?.map(e=>e.name)||[],getModelInstance:t.getModelInstance||(()=>{}),staticModels:t.staticModels,getApiKeyLink:t.getApiKeyLink,labelForGetApiKey:t.labelForGetApiKey,icon:t.icon}}return{providers:l,defaultProvider:u}}(r),m=await r.updateModelList({apiKeys:o,providerSettings:a,serverEnv:t});return i.NextResponse.json({modelList:m,providers:n,defaultProvider:c})}let m=new o.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/models/route",pathname:"/api/models",filename:"route",bundlePath:"app/api/models/route"},resolvedPagePath:"D:\\IA\\Applications IA\\myboltvision\\app\\api\\models\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:g,workUnitAsyncStorage:v,serverHooks:x}=m;function y(){return(0,n.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:v})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[488,107,968,896],()=>r(94261));module.exports=s})();