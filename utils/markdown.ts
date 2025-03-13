/**
 * Utilitaires pour le traitement du Markdown
 */

import { visit } from 'unist-util-visit';
import type { Node, Parent } from 'unist';

export interface MarkdownProcessingOptions {
  /**
   * Transforme les URLs relatives en URLs absolues
   */
  resolveRelativeUrls?: boolean;
  
  /**
   * URL de base pour résoudre les URLs relatives
   */
  baseUrl?: string;
  
  /**
   * Ajoute des attributs target="_blank" aux liens externes
   */
  externalLinksInNewTab?: boolean;
  
  /**
   * Ajoute des classes CSS aux éléments spécifiques
   */
  enhanceWithClasses?: boolean;
  
  /**
   * Transforme les entêtes en ancres navigables
   */
  headingsToAnchors?: boolean;
  
  /**
   * Détecte et formate les blocs de code spéciaux (mermaid, etc.)
   */
  processCodeBlocks?: boolean;
}

interface ImageNode extends Node {
  url?: string;
  alt?: string;
  title?: string;
}

interface LinkNode extends Node {
  url?: string;
  title?: string;
  children?: Node[];
}

interface CodeNode extends Node {
  lang?: string;
  value?: string;
  meta?: string;
}

/**
 * Transforme les URLs relatives en URLs absolues
 */
export function resolveUrls(tree: Node, baseUrl: string): void {
  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  visit(tree, 'image', (node: ImageNode) => {
    if (node.url && !node.url.startsWith('http') && !node.url.startsWith('data:')) {
      node.url = new URL(node.url, baseUrl).toString();
    }
  });

  visit(tree, 'link', (node: LinkNode) => {
    if (node.url && !node.url.startsWith('http') && !node.url.startsWith('#')) {
      node.url = new URL(node.url, baseUrl).toString();
    }
  });
}

/**
 * Ajoute target="_blank" et rel="noopener" aux liens externes
 */
export function externalLinks(tree: Node): void {
  visit(tree, 'link', (node: any) => {
    if (node.url && (node.url.startsWith('http') || node.url.startsWith('https'))) {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.target = '_blank';
      node.data.hProperties.rel = 'noopener noreferrer';
    }
  });
}

/**
 * Ajoute des classes CSS aux éléments spécifiques
 */
export function enhanceWithClasses(tree: Node): void {
  // Ajouter des classes aux tableaux
  visit(tree, 'table', (node: any) => {
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    node.data.hProperties.className = 'markdown-table';
  });

  // Ajouter des classes aux blocs de code
  visit(tree, 'code', (node: any) => {
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    
    const classes = ['markdown-code'];
    if (node.lang) {
      classes.push(`language-${node.lang}`);
    }
    
    node.data.hProperties.className = classes.join(' ');
  });

  // Ajouter des classes aux listes
  visit(tree, ['list'], (node: any) => {
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    
    const listType = node.ordered ? 'ordered' : 'unordered';
    node.data.hProperties.className = `markdown-list markdown-list-${listType}`;
  });
}

/**
 * Transforme les entêtes en ancres navigables
 */
export function headingsToAnchors(tree: Node): void {
  visit(tree, ['heading'], (node: any) => {
    if (!node.children || node.children.length === 0) return;
    
    // Créer un ID à partir du texte du titre
    let headingText = '';
    
    // Extraire le texte du titre
    visit(node, 'text', (textNode: any) => {
      headingText += textNode.value;
    });
    
    // Créer un ID slug
    const slug = headingText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Ajouter l'attribut id
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    node.data.hProperties.id = slug;
    
    // Ajouter une ancre après le titre
    const anchor = {
      type: 'link',
      url: `#${slug}`,
      data: {
        hProperties: {
          className: 'heading-anchor',
          'aria-hidden': 'true',
        }
      },
      children: [{
        type: 'text',
        value: '#'
      }]
    };
    
    // Ajouter l'ancre comme enfant du titre
    node.children.push(anchor);
  });
}

/**
 * Détecte et transforme les blocs de code spéciaux (mermaid, etc.)
 */
export function processCodeBlocks(tree: Node): void {
  visit(tree, 'code', (node: CodeNode, index: number, parent: Parent) => {
    if (!node.lang) return;
    
    if (node.lang === 'mermaid') {
      // Transformer en div pour Mermaid
      const mermaidNode = {
        type: 'html',
        value: `<div class="mermaid">${node.value}</div>`
      };
      
      parent.children.splice(index, 1, mermaidNode as any);
    }
    
    if (node.lang === 'math') {
      // Transformer en mathjax
      const mathNode = {
        type: 'html',
        value: `<div class="math-block">\\[${node.value}\\]</div>`
      };
      
      parent.children.splice(index, 1, mathNode as any);
    }
  });
}

/**
 * Transforme un arbre syntaxique AST markdown avec les options spécifiées
 */
export function processMarkdownAST(tree: Node, options: MarkdownProcessingOptions = {}): void {
  if (options.resolveRelativeUrls && options.baseUrl) {
    resolveUrls(tree, options.baseUrl);
  }
  
  if (options.externalLinksInNewTab) {
    externalLinks(tree);
  }
  
  if (options.enhanceWithClasses) {
    enhanceWithClasses(tree);
  }
  
  if (options.headingsToAnchors) {
    headingsToAnchors(tree);
  }
  
  if (options.processCodeBlocks) {
    processCodeBlocks(tree);
  }
}
