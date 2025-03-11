# Guide de contribution - MyBoltVision

Nous sommes ravis que vous envisagiez de contribuer à MyBoltVision! Ce document fournit les directives et les bonnes pratiques pour contribuer efficacement au projet.

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment commencer](#comment-commencer)
- [Processus de développement](#processus-de-développement)
- [Soumettre des modifications](#soumettre-des-modifications)
- [Standards de code](#standards-de-code)
- [Soumettre un bug](#soumettre-un-bug)
- [Proposer une nouvelle fonctionnalité](#proposer-une-nouvelle-fonctionnalité)
- [Ajouter un agent](#ajouter-un-agent)
- [Ajouter un fournisseur LLM](#ajouter-un-fournisseur-llm)

## Code de conduite

Ce projet et tous ses participants sont régis par notre [Code de conduite](CODE_OF_CONDUCT.md). En participant, vous acceptez de respecter ce code. Veuillez signaler tout comportement inacceptable.

## Comment commencer

### Prérequis

- Node.js (v18.0.0 ou supérieur)
- npm (v8.0.0 ou supérieur)
- Git

### Installation pour le développement

1. Forkez le dépôt sur GitHub
2. Clonez votre fork localement
```bash
git clone https://github.com/votre-nom-utilisateur/myboltvision.git
cd myboltvision
```
3. Ajoutez le dépôt principal comme remote
```bash
git remote add upstream https://github.com/organisation-principale/myboltvision.git
```
4. Installez les dépendances
```bash
npm install
```
5. Créez une branche pour vos modifications
```bash
git checkout -b ma-fonctionnalite
```

## Processus de développement

Notre processus de développement suit une approche orientée qualité basée sur les principes de GitHub Flow:

1. Créez une branche à partir de `main` pour vos modifications
2. Effectuez vos modifications en suivant nos standards de code
3. Vérifiez que les tests passent avec `npm run test:report`
4. Validez la qualité du code avec linting et analyse statique
5. Soumettez une Pull Request (PR) détaillée
6. Passez en revue les analyses automatiques de qualité
7. Participez à la revue de code et apportez les ajustements nécessaires
8. Une fois approuvée, votre PR sera fusionnée dans le tronc principal

### Branches

- `main` - Branche principale, toujours stable
- `dev` - Branche de développement
- `feature/*` - Pour les nouvelles fonctionnalités
- `fix/*` - Pour les corrections de bugs
- `docs/*` - Pour les modifications de documentation

## Soumettre des modifications

### Pull Requests

1. Assurez-vous que votre branche est à jour avec la branche principale
```bash
git pull upstream main
```
2. Commitez vos changements avec des messages clairs et descriptifs
3. Poussez vos modifications sur votre fork
```bash
git push origin ma-fonctionnalite
```
4. Créez une Pull Request via GitHub
5. Décrivez clairement vos modifications dans la description de la PR

### Format des messages de commit

Nous suivons le format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[corps optionnel]

[pied de page optionnel]
```

Types courants:
- `feat` - Nouvelle fonctionnalité
- `fix` - Correction de bug
- `docs` - Modification de documentation
- `style` - Formatage, points-virgules manquants, etc.
- `refactor` - Refactorisation du code
- `test` - Ajout ou correction de tests
- `chore` - Tâches de maintenance

Exemple:
```
feat(ideation): ajouter évaluation automatique des idées

Ajoute un système qui évalue automatiquement les idées générées
selon plusieurs critères: innovation, faisabilité, potentiel commercial.

Closes #123
```

## Standards de code

### Style de code

Nous utilisons ESLint et Prettier pour maintenir un style de code cohérent:

- Tabs vs Spaces: 2 espaces
- Points-virgules: obligatoires
- Quotes: simples
- Longueur de ligne maximale: 100 caractères

Exécutez `npm run lint` pour vérifier votre code et `npm run format` pour formater automatiquement.

### TypeScript

- Toujours utiliser des types explicites pour les fonctions publiques
- Éviter `any` autant que possible
- Documenter les interfaces et les types complexes

### Tests

- Les nouveaux composants doivent avoir des tests unitaires
- Les nouvelles fonctionnalités doivent avoir des tests d'intégration
- Maintenir une couverture de test d'au moins 80%

## Soumettre un bug

Si vous trouvez un bug, veuillez créer une issue sur GitHub en utilisant le modèle "Bug Report" et inclure:

- Une description claire du bug
- Les étapes pour reproduire
- Le comportement attendu
- Le comportement observé
- Des captures d'écran si nécessaire
- Votre environnement (OS, navigateur, version Node.js)

## Proposer une nouvelle fonctionnalité

Pour proposer une nouvelle fonctionnalité:

1. Créez une issue en utilisant le modèle "Feature Request"
2. Décrivez clairement la fonctionnalité et son cas d'utilisation
3. Expliquez pourquoi cette fonctionnalité serait bénéfique au projet
4. Si possible, décrivez comment vous envisagez de l'implémenter

## Ajouter un agent

MyBoltVision est conçu pour être facilement extensible avec de nouveaux agents. Pour ajouter un nouvel agent:

1. Créez un nouveau fichier dans `app/lib/agents/`
2. Implémentez l'interface `Agent`
3. Assurez-vous de documenter clairement les capacités de l'agent
4. Ajoutez des tests unitaires dans `app/lib/agents/__tests__/`
5. Mettez à jour le registre des agents dans `app/lib/agents/registry.ts`

Exemple de structure d'agent:

```typescript
import type { Agent, AgentResult } from '../core/AgentOrchestrator';
import type { ContextShard } from '../../types/context';

export class MonNouvelAgent implements Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  
  constructor() {
    this.id = 'mon-nouvel-agent';
    this.name = 'Mon Nouvel Agent';
    this.description = 'Description de mon agent et ses capacités';
    this.capabilities = [
      'capacité-1',
      'capacité-2',
      'capacité-3'
    ];
  }
  
  async execute(input: string, context: ContextShard): Promise<AgentResult> {
    // Implémentation de la logique de l'agent
    
    return {
      id: `result_${Date.now()}`,
      agentId: this.id,
      content: 'Résultat de l\'exécution',
      timestamp: Date.now(),
      metadata: {
        // Métadonnées spécifiques
      },
      success: true
    };
  }
  
  // Méthodes supplémentaires spécifiques à l'agent
}
```

## Ajouter un fournisseur LLM

Pour ajouter un nouveau fournisseur LLM:

1. Créez un nouveau fichier dans `app/lib/modules/llm/providers/`
2. Étendez la classe `BaseProvider`
3. Implémentez les méthodes requises
4. Ajoutez le provider à `app/lib/modules/llm/registry.ts`

Exemple:

```typescript
import { BaseProvider } from '../base-provider';
import type { ModelInfo } from '../types';
import type { IProviderSetting } from '~/types/model';

export class MonNouveauProvider extends BaseProvider {
  constructor() {
    super();
    this.name = 'mon-nouveau-provider';
    this.staticModels = [
      {
        name: 'modele-par-defaut',
        displayName: 'Modèle par défaut',
        provider: this.name,
        parameters: {
          temperature: 0.7,
          maxTokens: 2048
        }
      }
    ];
    this.getApiKeyLink = 'https://provider.com/api-keys';
    this.labelForGetApiKey = 'Obtenir une clé API';
    this.icon = '/icons/MonProvider.svg';
  }

  // Implémentation des méthodes requises pour interroger l'API du provider
  
  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv?: Record<string, string>
  ): Promise<ModelInfo[]> {
    // Logique pour obtenir la liste des modèles disponibles
    return [];
  }
}
```

---

Merci pour votre intérêt à contribuer à MyBoltVision! Ensemble, nous pouvons créer un outil puissant qui transforme la façon dont les projets sont développés.

Si vous avez des questions ou besoin d'aide, n'hésitez pas à contacter l'équipe de développement.
