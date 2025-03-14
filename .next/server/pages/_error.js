(()=>{var e={};e.id=731,e.ids=[220,636,731],e.modules={3179:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var n=r(8732),s=r(54664),i=r.n(s);r(82015);class o extends i(){static async getInitialProps(e){return{...await i().getInitialProps(e)}}render(){return(0,n.jsxs)(s.Html,{lang:"fr",children:[(0,n.jsxs)(s.Head,{children:[(0,n.jsx)("meta",{charSet:"utf-8"}),(0,n.jsx)("meta",{name:"theme-color",content:"#ffffff"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.svg"}),(0,n.jsx)("link",{rel:"apple-touch-icon",href:"/logo.svg"}),(0,n.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",rel:"stylesheet"}),(0,n.jsx)("link",{rel:"manifest",href:"/manifest.json"})]}),(0,n.jsxs)("body",{children:[(0,n.jsx)("div",{id:"font-loader-observer","aria-hidden":"true"}),(0,n.jsx)("div",{id:"portal-root"}),(0,n.jsx)(s.Main,{}),(0,n.jsx)(s.NextScript,{})]})]})}}let a=o},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},10972:(e,t)=>{"use strict";Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},14064:(e,t)=>{"use strict";Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},28901:()=>{},29021:e=>{"use strict";e.exports=require("fs")},33873:e=>{"use strict";e.exports=require("path")},36599:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(8732);r(28901);let s=require("next/head");var i=r.n(s);function o({Component:e,pageProps:t,router:r}){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i(),{children:[(0,n.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,n.jsx)("title",{children:"BoltVision"}),(0,n.jsx)("meta",{name:"description",content:"BoltVision - Application de d\xe9veloppement intelligent"})]}),(0,n.jsx)(e,{...t})]})}r(82015),(0,r(91936).zP)("_app")},40361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},45821:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>S,default:()=>x,getServerSideProps:()=>v,getStaticPaths:()=>b,getStaticProps:()=>P,reportWebVitals:()=>j,routeModule:()=>E,unstable_getServerProps:()=>w,unstable_getServerSideProps:()=>M,unstable_getStaticParams:()=>A,unstable_getStaticPaths:()=>y,unstable_getStaticProps:()=>_});var n={};r.r(n),r.d(n,{default:()=>h});var s=r(13138),i=r(10972),o=r(14064),a=r(3179),l=r(36599),c=r(8732);let u=require("next/error");var d=r.n(u),p=r(82015),f=r.n(p);let g=(0,r(91936).zP)("_error");class m extends f().Component{static{this.getInitialProps=async e=>{let t=await d().getInitialProps(e),{res:r,err:n,asPath:s}=e;return(n&&g.error(`Erreur non g\xe9r\xe9e sur ${s}`,{status:t.statusCode,message:n.message,stack:n.stack}),r&&404===r.statusCode)?{statusCode:404,hasGetInitialPropsRun:!0}:{...t,hasGetInitialPropsRun:!0,err:n}}}render(){let{statusCode:e,err:t}=this.props,r="Nous rencontrons un probl\xe8me technique. Veuillez r\xe9essayer plus tard.";return 404===e?r="La page que vous recherchez n'existe pas ou a \xe9t\xe9 d\xe9plac\xe9e.":403===e?r="Vous n'avez pas les permissions n\xe9cessaires pour acc\xe9der \xe0 cette page.":429===e&&(r="Trop de requ\xeates. Veuillez r\xe9essayer dans quelques instants."),(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",padding:"0 1rem",textAlign:"center",backgroundColor:"#f9fafb"},children:[(0,c.jsx)("div",{style:{fontSize:"6rem",fontWeight:"bold",marginBottom:"0.5rem",color:"#3B82F6"},children:e||"500"}),(0,c.jsx)("h1",{style:{fontSize:"2rem",fontWeight:"bold",marginBottom:"1rem",color:"#1F2937"},children:404===e?"Page non trouv\xe9e":"Une erreur est survenue"}),(0,c.jsx)("p",{style:{fontSize:"1rem",marginBottom:"2rem",color:"#4B5563",maxWidth:"500px"},children:r}),!1,(0,c.jsx)("button",{style:{padding:"0.5rem 1.5rem",backgroundColor:"#3B82F6",color:"white",borderRadius:"0.375rem",fontWeight:"medium",border:"none",cursor:"pointer",transition:"background-color 0.2s"},onClick:()=>window.location.href="/",children:"Retour \xe0 l'accueil"})]})}}let h=m,x=(0,o.M)(n,"default"),P=(0,o.M)(n,"getStaticProps"),b=(0,o.M)(n,"getStaticPaths"),v=(0,o.M)(n,"getServerSideProps"),S=(0,o.M)(n,"config"),j=(0,o.M)(n,"reportWebVitals"),_=(0,o.M)(n,"unstable_getStaticProps"),y=(0,o.M)(n,"unstable_getStaticPaths"),A=(0,o.M)(n,"unstable_getStaticParams"),w=(0,o.M)(n,"unstable_getServerProps"),M=(0,o.M)(n,"unstable_getServerSideProps"),E=new s.PagesRouteModule({definition:{kind:i.A.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:l.default,Document:a.default},userland:n})},82015:e=>{"use strict";e.exports=require("react")},91936:(e,t,r)=>{"use strict";let n,s,i;r.d(t,{zP:()=>l});let o=process.env.VITE_LOG_LEVEL?"debug":"info";s=r(29021),n=(i=r(33873)).join(__dirname,"..","..","docs","logs"),s&&!s.existsSync(n)&&s.mkdirSync(n,{recursive:!0});let a=(e,t)=>{if(s&&i&&n){let r=i.join(n,e);s.appendFileSync(r,`${new Date().toISOString()} - ${t}
`)}};function l(e){return{trace:(...t)=>u("trace",e,t),debug:(...t)=>u("debug",e,t),info:(...t)=>u("info",e,t),warn:(...t)=>u("warn",e,t),error:(...t)=>u("error",e,t),setLevel:c}}function c(e){"trace"!==e&&"debug"!==e&&(o=e)}function u(e,t,r){let n=["trace","debug","info","warn","error"];if(n.indexOf(e)<n.indexOf(o))return;let s=r.reduce((e,t)=>e.endsWith("\n")?e+t:e?`${e} ${t}`:t,"");console.log(`${e.toUpperCase()} ${t?`[${t}] `:""}`,s);let i=`${e.toUpperCase()} - ${t?`[${t}] `:""}${s}`;switch(e){case"trace":case"debug":a("vite_errors.log",i);break;case"info":case"warn":case"error":a("runtime_errors.log",i)}}l("Render")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[664],()=>r(45821));module.exports=n})();