/**
 * Classe de base pour tous les agents
 */
export abstract class BaseAgent {
  /**
   * Nom de l'agent
   */
  abstract name: string;

  /**
   * Description des fonctionnalités de l'agent
   */
  abstract description: string;

  /**
   * Capacités de l'agent
   */
  abstract capabilities: string[];

  /**
   * Vérifie si l'agent possède une capacité spécifique
   * 
   * @param capability La capacité à vérifier
   * @returns true si l'agent possède la capacité, false sinon
   */
  hasCapability(capability: string): boolean {
    return this.capabilities.includes(capability);
  }

  /**
   * Retourne la liste des capacités de l'agent
   * 
   * @returns Liste des capacités
   */
  getCapabilities(): string[] {
    return [...this.capabilities];
  }

  /**
   * Retourne les informations de base de l'agent
   * 
   * @returns Informations de l'agent
   */
  getInfo(): { name: string; description: string; capabilities: string[] } {
    return {
      name: this.name,
      description: this.description,
      capabilities: this.getCapabilities()
    };
  }
}
