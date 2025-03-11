/**
 * Type de l'environnement global utilisé dans plusieurs fichiers
 * Cette définition résout les erreurs "Cannot find name 'Env'"
 */
declare global {
  type Env = {
    [key: string]: string | undefined;
  };
}

/**
 * Déclaration pour import.meta.env
 * Ceci résout les erreurs "Property 'env' does not exist on type 'ImportMeta'"
 */
interface ImportMeta {
  env: Record<string, string>;
}

export {};
