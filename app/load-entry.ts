import routesConfig from '../routes/routes.json';

export interface Route {
  path: string;
  component: string;
}

interface RouteConfig {
  id: string;
  path: string;
  file: string;
  hasLoader: boolean;
  hasAction: boolean;
  parentId?: string;
}

interface RoutesConfig {
  routes: RouteConfig[];
}

const routesConfigTyped: RoutesConfig = routesConfig;

export async function loadEntry(): Promise<Route[]> {
  // Implement the logic to load entry data and routes
  const routes: Route[] = routesConfigTyped.routes.map((route: RouteConfig) => ({
    path: route.path,
    component: route.file,
  }));
  return routes;
}
