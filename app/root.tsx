import { useStore } from '@nanostores/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { themeStore } from './lib/stores/theme';
import { stripIndents } from './utils/stripIndent';
import { createHead } from 'remix-island';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { logStore } from './lib/stores/logs';

// Importation des styles via UnoCSS
import 'virtual:uno.css';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: '/css/tailwind-reset.css' },
  { rel: 'stylesheet', href: '/css/xterm.css' },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/react-toastify@11.0.5/dist/ReactToastify.min.css' },
  { rel: 'stylesheet', href: '/css/index.scss' },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
];

const inlineThemeCode = stripIndents`
  setTutorialKitTheme();

  function setTutorialKitTheme() {
    let theme = localStorage.getItem('bolt_theme');

    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
`;

export const Head = createHead(() => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta />
    <Links />
    <script dangerouslySetInnerHTML={{ __html: inlineThemeCode }} />
  </>
));

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useStore(themeStore);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <DndProvider backend={HTML5Backend}>
      {children}
      <ScrollRestoration />
      <Scripts />
    </DndProvider>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  // Retourner au minimum un objet vide pour répondre aux requêtes root
  return json({});
}

export const indexLoader = async () => {
  return json({
    message: "Welcome to BoltVision"
  });
};

export default function App() {
  const theme = useStore(themeStore);

  useEffect(() => {
    logStore.logSystem('Application initialized', {
      theme,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function Index() {
  const data = useLoaderData();
  
  return (
    <div>
      <h1>Welcome to BoltVision - {(data as { message: string }).message}</h1>
    </div>
  );
}
