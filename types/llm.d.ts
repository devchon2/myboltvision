/**
 * Interface pour les fournisseurs de LLM (Large Language Models)
 */
export interface LLMProvider {
  /**
   * Obtient une réponse du modèle de langage
   * @param input Le texte d'entrée à traiter
   * @returns Une promesse qui se résout avec la réponse du modèle
   */
  getResponse(input: string): Promise<string>;
  
  /**
   * Nom du fournisseur de LLM
   */
  name?: string;
  
  /**
   * Version du modèle utilisé
   */
  modelVersion?: string;
  
  /**
   * Paramètres optionnels spécifiques au fournisseur
   */
  options?: Record<string, any>;
}
