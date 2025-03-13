/**
 * Utilitaires de suivi des performances et Web Vitals
 *
 * Ce module fournit des fonctions pour mesurer et rapporter les métriques
 * de performance essentielles comme les Web Vitals.
 */

import { onCLS as getCLS, onFID as getFID, onLCP as getLCP, onFCP as getFCP, onTTFB as getTTFB } from 'web-vitals';

export interface PerformanceMetric {
  name: string;
  value: number;
  id?: string;
  navigationType?: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

export type MetricCallback = (metric: PerformanceMetric) => void;

/**
 * Initialise le suivi des Web Vitals
 * @param onMetric Fonction de rappel appelée pour chaque métrique mesurée
 */
export function initWebVitals(onMetric: MetricCallback): void {
  // Conversion des métriques dans un format cohérent
  const vitalsCallback = ({ name, delta, id, navigationType }: any): void => {
    // Arrondi à 2 décimales
    const value = Math.round(delta * 100) / 100;

    let rating: 'good' | 'needs-improvement' | 'poor' = 'good';

    // Évaluation selon les seuils de Core Web Vitals
    if (name === 'CLS') {
      rating = value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    } else if (name === 'FID') {
      rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    } else if (name === 'LCP') {
      rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    }

    onMetric({
      name,
      value,
      id,
      navigationType,
      rating,
    });
  };

  // Mesure des métriques Core Web Vitals
  getCLS(vitalsCallback); // Cumulative Layout Shift
  getFID(vitalsCallback); // First Input Delay
  getLCP(vitalsCallback); // Largest Contentful Paint
  getFCP(vitalsCallback); // First Contentful Paint
  getTTFB(vitalsCallback); // Time to First Byte
}

/**
 * Enregistre une mesure de performance personnalisée
 * @param name Nom de la mesure
 * @param startMark Marque de début (optionnelle)
 * @param endMark Marque de fin (optionnelle)
 */
export function measure(name: string, startMark?: string, endMark?: string): PerformanceEntry | undefined {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    performance.measure(name, startMark, endMark);
    return performance.getEntriesByName(name).pop();
  } catch (e) {
    console.error(`Erreur lors de la mesure '${name}':`, e);
    return undefined;
  }
}

/**
 * Place une marque de performance dans la timeline
 * @param name Nom de la marque
 * @param detail Détails additionnels (optionnel)
 */
export function mark(name: string, detail?: any): void {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    if (detail) {
      performance.mark(name, { detail });
    } else {
      performance.mark(name);
    }
  } catch (e) {
    console.error(`Erreur lors de la création de la marque '${name}':`, e);
  }
}

/**
 * Efface les marques et mesures
 * @param name Nom spécifique à effacer (optionnel, efface tout si omis)
 */
export function clearMarks(name?: string): void {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    if (name) {
      performance.clearMarks(name);
      performance.clearMeasures(name);
    } else {
      performance.clearMarks();
      performance.clearMeasures();
    }
  } catch (e) {
    console.error("Erreur lors de l'effacement des marques:", e);
  }
}

/**
 * Capture le temps écoulé entre deux points du code
 */
export class Timer {
  private startTime: number = 0;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  start(): void {
    this.startTime = performance.now();
    mark(`${this.name}_start`);
  }

  stop(): number {
    const endTime = performance.now();
    const duration = endTime - this.startTime;

    mark(`${this.name}_end`);
    measure(this.name, `${this.name}_start`, `${this.name}_end`);

    return duration;
  }
}

/**
 * Envoie les métriques vers un service d'analyse
 * @param metrics Les métriques à envoyer
 */
export function reportMetrics(metrics: PerformanceMetric[]): Promise<Response> {
  // En environnement de production, envoie les métriques à un service d'analyse
  // En développement, affiche dans la console
  if (process.env.NODE_ENV !== 'production') {
    console.info('📊 Métriques de performance:', metrics);
    return Promise.resolve({} as Response);
  }

  // Endpoint d'API réel à implémenter
  return fetch('/api/metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ metrics, timestamp: Date.now() }),
  });
}
