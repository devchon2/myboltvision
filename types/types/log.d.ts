/**
 * Types pour le système de logging
 * Résout les erreurs "log is of type unknown"
 */

export interface NotificationDetails {
  title?: string;
  message?: string;
  [key: string]: any;
}

export interface LogEntry {
  level: 'info' | 'warning' | 'error' | 'debug' | 'success' | string;
  message: string;
  timestamp: string;
  category?: string;
  subCategory?: string;
  details?: NotificationDetails | any;
  source?: string;
  stack?: string;
  context?: Record<string, any>;
  id?: string;
}

export interface LogStore {
  getLogs: () => LogEntry[];
  addLog: (log: Omit<LogEntry, 'timestamp'>) => void;
  clearLogs: () => void;
}
