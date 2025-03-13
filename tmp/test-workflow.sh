#!/bin/bash

# Workflow pour corriger les tests dans le projet myboltvision
# Ce script orchestre les différentes étapes de correction des tests

# Couleurs pour le texte
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages en couleur
print_message() {
  echo -e "${BLUE}==>${NC} $1"
}

print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

# Fonction pour demander confirmation à l'utilisateur
confirm() {
  read -p "$1 (o/N): " response
  case "$response" in
    [oO][uU][iI]|[oO]) 
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

# Vérification des prérequis
print_message "Vérification des prérequis..."

# Vérifier si node est installé
if ! command -v node &> /dev/null; then
  print_error "Node.js n'est pas installé. Veuillez l'installer et réessayer."
  exit 1
fi

print_success "Node.js est installé."

# Vérifier si pnpm est installé
if ! command -v pnpm &> /dev/null; then
  print_warning "pnpm n'est pas installé. Nous utiliserons npm à la place."
  PKG_MANAGER="npm"
else
  print_success "pnpm est installé."
  PKG_MANAGER="pnpm"
fi

# Donner les permissions d'exécution aux scripts
print_message "Configuration des scripts de correction..."
chmod +x tmp/fix-test-syntax.js
chmod +x tmp/generate-missing-components.js
chmod +x tmp/fix-mock-issues.js

print_success "Scripts configurés."

# Menu principal
while true; do
  echo ""
  echo "==============================================="
  echo "  WORKFLOW DE CORRECTION DES TESTS MYBOLTVISION"
  echo "==============================================="
  echo ""
  echo "1) Analyser les problèmes de tests"
  echo "2) Corriger les problèmes de syntaxe dans les tests"
  echo "3) Générer les composants manquants"
  echo "4) Corriger les problèmes de mocking"
  echo "5) Exécuter les tests"
  echo "6) Workflow complet (étapes 2-5)"
  echo "0) Quitter"
  echo ""
  read -p "Choisissez une option: " choice

  case $choice in
    1)
      print_message "Analyse des problèmes de tests..."
      $PKG_MANAGER run test --no-typecheck > tmp/test-output.log
      cat tmp/test-analysis.md
      print_success "Analyse terminée. Voir 'tmp/test-analysis.md' pour plus de détails."
      ;;
    2)
      print_message "Correction des problèmes de syntaxe..."
      if confirm "Voulez-vous corriger les problèmes de syntaxe dans tous les tests?"; then
        node tmp/fix-test-syntax.js lib
        node tmp/fix-test-syntax.js test
        node tmp/fix-test-syntax.js app
        print_success "Correction de la syntaxe terminée."
      else
        print_message "Opération annulée."
      fi
      ;;
    3)
      print_message "Génération des composants manquants..."
      if confirm "Voulez-vous générer les composants manquants?"; then
        node tmp/generate-missing-components.js
        print_success "Génération des composants terminée."
      else
        print_message "Opération annulée."
      fi
      ;;
    4)
      print_message "Correction des problèmes de mocking..."
      if confirm "Voulez-vous corriger les problèmes de mocking?"; then
        # Liste des fichiers avec problèmes de mocking connus
        node tmp/fix-mock-issues.js test/LLMManager.test.ts
        print_success "Correction des problèmes de mocking terminée."
      else
        print_message "Opération annulée."
      fi
      ;;
    5)
      print_message "Exécution des tests..."
      $PKG_MANAGER run test --no-typecheck
      ;;
    6)
      print_message "Démarrage du workflow complet..."
      if confirm "Voulez-vous exécuter le workflow complet? Cela corrigera automatiquement les problèmes de test."; then
        # Étape 2: Corriger les problèmes de syntaxe
        print_message "Étape 1/4: Correction des problèmes de syntaxe..."
        node tmp/fix-test-syntax.js lib
        node tmp/fix-test-syntax.js test
        node tmp/fix-test-syntax.js app
        print_success "Correction de la syntaxe terminée."
        
        # Étape 3: Générer les composants manquants
        print_message "Étape 2/4: Génération des composants manquants..."
        node tmp/generate-missing-components.js
        print_success "Génération des composants terminée."
        
        # Étape 4: Corriger les problèmes de mocking
        print_message "Étape 3/4: Correction des problèmes de mocking..."
        node tmp/fix-mock-issues.js test/LLMManager.test.ts
        print_success "Correction des problèmes de mocking terminée."
        
        # Étape 5: Exécuter les tests
        print_message "Étape 4/4: Exécution des tests..."
        $PKG_MANAGER run test --no-typecheck
        
        print_success "Workflow complet terminé!"
      else
        print_message "Workflow annulé."
      fi
      ;;
    0)
      print_message "Au revoir!"
      exit 0
      ;;
    *)
      print_error "Option non valide. Veuillez réessayer."
      ;;
  esac
done
