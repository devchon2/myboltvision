/**
 * ContextManager
 * 
 * Gère le contexte global de l'application myboltvision.
 * Permet de stocker, récupérer et observer des changements d'état.
 */

class ContextManager {
  constructor() {
    this.context = {};
    this.observers = {};
    this.history = [];
    this.historyLimit = 50;
  }

  /**
   * Définit une valeur dans le contexte
   * @param {string} key - La clé à utiliser
   * @param {any} value - La valeur à stocker
   * @param {boolean} notify - Si true, notifie les observateurs du changement
   */
  set(key, value, notify = true) {
    const oldValue = this.context[key];
    this.context[key] = value;
    
    // Enregistrer dans l'historique
    this.addToHistory({ type: 'set', key, oldValue, newValue: value });
    
    // Notifier les observateurs
    if (notify && this.observers[key]) {
      this.observers[key].forEach(callback => {
        callback(value, oldValue);
      });
    }
    
    return this;
  }

  /**
   * Récupère une valeur du contexte
   * @param {string} key - La clé à récupérer
   * @param {any} defaultValue - Valeur par défaut si la clé n'existe pas
   */
  get(key, defaultValue = null) {
    return this.context.hasOwnProperty(key) ? this.context[key] : defaultValue;
  }

  /**
   * S'abonne aux changements d'une clé spécifique
   * @param {string} key - La clé à observer
   * @param {Function} callback - Fonction appelée lors d'un changement
   */
  subscribe(key, callback) {
    if (!this.observers[key]) {
      this.observers[key] = [];
    }
    this.observers[key].push(callback);
    
    // Retourner une fonction pour se désabonner
    return () => this.unsubscribe(key, callback);
  }

  /**
   * Se désabonne des changements d'une clé
   * @param {string} key - La clé à ne plus observer
   * @param {Function} callback - Fonction à retirer
   */
  unsubscribe(key, callback) {
    if (this.observers[key]) {
      this.observers[key] = this.observers[key].filter(cb => cb !== callback);
    }
  }

  /**
   * Supprime une clé du contexte
   * @param {string} key - La clé à supprimer
   */
  remove(key) {
    const oldValue = this.context[key];
    delete this.context[key];
    
    this.addToHistory({ type: 'remove', key, oldValue });
    
    if (this.observers[key]) {
      this.observers[key].forEach(callback => {
        callback(undefined, oldValue);
      });
    }
    
    return this;
  }

  /**
   * Réinitialise tout le contexte
   */
  reset() {
    const oldContext = { ...this.context };
    this.context = {};
    
    this.addToHistory({ type: 'reset', oldContext });
    
    // Notifier tous les observateurs
    Object.keys(this.observers).forEach(key => {
      this.observers[key].forEach(callback => {
        callback(undefined, oldContext[key]);
      });
    });
    
    return this;
  }

  /**
   * Ajoute une action à l'historique
   * @private
   */
  addToHistory(action) {
    action.timestamp = Date.now();
    this.history.push(action);
    
    // Limiter la taille de l'historique
    if (this.history.length > this.historyLimit) {
      this.history.shift();
    }
  }

  /**
   * Récupère l'historique des actions
   */
  getHistory() {
    return [...this.history];
  }

  /**
   * Sauvegarde le contexte en JSON
   */
  serialize() {
    return JSON.stringify(this.context);
  }

  /**
   * Restaure un contexte depuis du JSON
   * @param {string} json - Données JSON à charger
   */
  deserialize(json) {
    try {
      const data = JSON.parse(json);
      this.reset();
      Object.keys(data).forEach(key => {
        this.set(key, data[key]);
      });
      return true;
    } catch (e) {
      console.error("Erreur lors de la désérialisation du contexte:", e);
      return false;
    }
  }
}

// Exporter une instance unique pour toute l'application
const contextManager = new ContextManager();
module.exports = contextManager;
