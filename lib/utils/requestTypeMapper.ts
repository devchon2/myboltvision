/**
 * Mappeur centralisé des types de requête pour les agents
 */
export const getRequestType = (agentId: string, input: string): string => {
  // Documentation Agent
  if (agentId === 'documentation-agent') {
    if (input.match(/API|GET \/api\/users|endpoint/i)) {
      return 'api-documentation';
    }

    if (input.match(/guide|démarrage rapide|utilisation/i)) {
      return 'user-guides';
    }

    if (input.match(/spécifications techniques|composants|flux de données/i)) {
      return 'technical-specs';
    }

    if (input.match(/README|documentation du projet|structure du projet/i)) {
      return 'project-documentation';
    }

    return 'generic';
  }

  // Design Agent
  if (agentId === 'design-agent') {
    if (input.match(/interface utilisateur|UI|navigation|style/i)) {
      return 'ui-design';
    }

    if (input.match(/UX|expérience utilisateur|ergonomie/i)) {
      return 'ux-analysis';
    }

    if (input.match(/système de design|composants|palette de couleurs/i)) {
      return 'design-system';
    }

    if (input.match(/identité visuelle|logo|typographie|palette/i)) {
      return 'visual-identity';
    }

    return 'generic';
  }

  // Development Agent
  if (agentId === 'dev-agent') {
    if (input.match(/générer|créer|code source|développement/i)) {
      return 'code-generation';
    }

    if (input.match(/revue|review|points forts|points à améliorer/i)) {
      return 'code-review';
    }

    if (input.match(/refactor|refactoring|extraction de méthodes/i)) {
      return 'refactoring';
    }

    if (input.match(/débogage|bug|problème identifié/i)) {
      return 'debug';
    }

    return 'generic';
  }

  // Deployment Agent
  if (agentId === 'deployment-agent') {
    // Prioriser la détection d'une configuration d'infrastructure
    if (input.match(/\binfrastructure\b|serveurs|base de données/i)) {
      return 'infrastructure';
    }

    if (input.match(/automatisation|tests|documentation/i)) {
      return 'release';
    }

    if (input.match(/déployer|rapport de déploiement/i)) {
      return 'deployment';
    }

    return 'generic';
  }

  // Market Analysis Agent
  if (agentId === 'market-analysis-agent') {
    // Prioriser les cas spécifiques
    if (input.match(/analyse de concurrence|concurrence|acteurs|positionnement|concurrent/i)) {
      return 'competitive-analysis';
    }

    if (input.match(/identification de tendances|tendances|impact|prévisions/i)) {
      return 'market-trends';
    }

    if (input.match(/identification d'opportunités|opportunités|segments|recommandations/i)) {
      return 'opportunity-identification';
    }

    if (input.match(/analyse SWOT|SWOT|forces|faiblesses|menaces/i)) {
      return 'swot-analysis';
    }

    return 'generic';
  }

  // Default fallback
  return 'generic';
};
