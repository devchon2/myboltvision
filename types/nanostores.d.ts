// Déclaration de module pour faciliter l'intégration des types nanostores
declare module 'nanostores' {
  export interface Store<T> {
    get(): T;
    set(value: T): void;
    subscribe(callback: (value: T) => void): () => void;
  }

  export interface MapStore<T, S = any> extends Store<T> {
    setKey<K extends keyof T>(key: K, value: T[K]): void;
  }

  export interface ReadableAtom<T, S = any> extends Store<T> {}
  export interface WritableAtom<T, S = any> extends Store<T> {
    set(value: T): void;
  }

  export function atom<T>(initial: T): WritableAtom<T>;
  export function map<T extends object>(initial?: T): MapStore<T>;
}

// Type d'assistance pour les stores personnalisés
export type StoreOf<T> = { get(): T } & { [K in keyof T as K extends 'get' ? never : K]: T[K] };

declare module '@nanostores/react' {
  import { Store } from 'nanostores';
  import type { WorkbenchStore, LogStore } from './stores';

  // Pour les stores standards
  export function useStore<T>(store: Store<T>): T;

  // Pour nos stores personnalisés
  export function useStore(store: WorkbenchStore | StoreOf<WorkbenchStore>): WorkbenchStore;
  export function useStore(store: LogStore | StoreOf<LogStore>): LogStore;

  // Fallback
  export function useStore(store: any): any;
}
