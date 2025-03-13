import { loadEntry } from './load-entry';
import type { Route } from './load-entry';

interface EntryData {
  routes: Route[];
}

export async function loadEntryData(): Promise<EntryData> {
  const routes = await loadEntry();
  return { routes };
}
