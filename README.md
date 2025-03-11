# MyBoltVision

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> Application entièrement autonome pour concevoir et développer tous types de projets à partir d'une simple idée.

## 🚀 Présentation

MyBoltVision est une plateforme d'intelligence artificielle qui orchestre des flux de travail agentiques pour accompagner l'utilisateur depuis l'idéation jusqu'au déploiement. En s'inspirant de Bolt.new et Cline, cette application transforme une idée brute en projet complet grâce à des agents spécialisés.

```
💡 Idée → 📊 Analyse → 📝 Documentation → 🎨 Design → 💻 Développement → 🚀 Déploiement
```

## ✨ Fonctionnalités principales

- **Assistance à l'idéation** - Brainstorming, raffinement de concepts, évaluation d'idées
- **Documentation complète** - Documents marketing, business plans, spécifications techniques
- **Design et maquettage** - Wireframes, prototypes, visualisations
- **Développement piloté par IA** - Génération de code, tests, documentation technique
- **Optimisation pour modèles LLM légers** - Fonctionnement avec modèles locaux ou cloud
- **Expérience utilisateur intuitive** - Interface conversationnelle et visuelle

## 🛠️ Architecture

MyBoltVision est construit sur une architecture modulaire qui sépare:

- **Core** - Orchestrateur d'agents, gestionnaire de contexte, moteur de workflows
- **Agents** - Modules spécialisés par domaine (idéation, conception, développement...)
- **LLM** - Gestion des modèles de langage avec support multi-fournisseurs
- **UI** - Interface utilisateur intuitive et workbenches spécialisés

Pour plus de détails, consultez [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🏁 Démarrage rapide

### Prérequis

- Node.js v18+
- npm v8+

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-organisation/myboltvision.git
cd myboltvision

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditez .env pour ajouter vos clés API

# Lancer l'application
npm run dev
```

Pour des instructions complètes, voir le [Guide de démarrage](./GETTING_STARTED.md).

## 📋 Vision technique et composants

Le développement de MyBoltVision est organisé selon les dépendances techniques entre composants:

1. **Composants fondamentaux** - Tests, orchestration d'agents, gestion de contexte, infrastructure LLM
2. **Agents spécialisés** - Agents d'idéation, recherche, documentation, design et développement
3. **Systèmes d'optimisation** - Optimisations pour modèles légers, workflows intégrés
4. **Expérience et sécurité** - Interface unifiée, sécurité des données, distribution

Consultez la [Vision technique complète](./ROADMAP.md) pour plus de détails.

## 🧪 Tests

```bash
# Exécution des tests avec rapport
npm run test:report
```

## 🤝 Contribution

Les contributions sont les bienvenues! Consultez notre [Guide de contribution](./CONTRIBUTING.md) pour savoir comment participer.

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 🙏 Remerciements

- Inspiré par les projets [Bolt.new](https://bolt.new) et [Cline](https://github.com/celine-s/cline)
- Développé avec ❤️ pour la communauté IA
