// utils/logger.ts
// import chalk from 'chalk'; // Commented out chalk

export type DebugLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

type LoggerFunction = (...messages: any[]) => void;

// const chalkInstance = chalk; // Commented out chalk

interface Logger {
  trace: LoggerFunction;
  debug: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
  setLevel: (level: DebugLevel) => void;
}

let currentLevel: DebugLevel = (process.env.VITE_LOG_LEVEL ?? process.env.NODE_ENV !== 'production') ? 'debug' : 'info';

// Configuration du logger pour écrire dans des fichiers
let logDirectory: string | undefined;
let fsModule: any;
let pathModule: any;

if (typeof window === 'undefined') {
  fsModule = require('fs');
  pathModule = require('path');
  logDirectory = pathModule.join(__dirname, '..', '..', 'docs', 'logs');
  if (fsModule && !fsModule.existsSync(logDirectory)) {
    fsModule.mkdirSync(logDirectory, { recursive: true });
  }
}

const logToFile = (filename: string, message: string) => {
  if (typeof window === 'undefined' && fsModule && pathModule && logDirectory) {
    const logFilePath = pathModule.join(logDirectory, filename);
    fsModule.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
  }
};

export const logger: Logger = {
  trace: (...messages: any[]) => log('trace', undefined, messages),
  debug: (...messages: any[]) => log('debug', undefined, messages),
  info: (...messages: any[]) => log('info', undefined, messages),
  warn: (...messages: any[]) => log('warn', undefined, messages),
  error: (...messages: any[]) => log('error', undefined, messages),
  setLevel,
};

export function createScopedLogger(scope: string): Logger {
  return {
    trace: (...messages: any[]) => log('trace', scope, messages),
    debug: (...messages: any[]) => log('debug', scope, messages),
    info: (...messages: any[]) => log('info', scope, messages),
    warn: (...messages: any[]) => log('warn', scope, messages),
    error: (...messages: any[]) => log('error', scope, messages),
    setLevel,
  };
}

function setLevel(level: DebugLevel) {
  if ((level === 'trace' || level === 'debug') && process.env.NODE_ENV === 'production') {
    return;
  }

  currentLevel = level;
}

function log(level: DebugLevel, scope: string | undefined, messages: any[]) {
  const levelOrder: DebugLevel[] = ['trace', 'debug', 'info', 'warn', 'error'];

  if (levelOrder.indexOf(level) < levelOrder.indexOf(currentLevel)) {
    return;
  }

  const allMessages = messages.reduce((acc, current) => {
    if (acc.endsWith('\n')) {
      return acc + current;
    }

    if (!acc) {
      return current;
    }

    return `${acc} ${current}`;
  }, '');

  // const labelBackgroundColor = getColorForLevel(level); // Commented out chalk
  // const labelTextColor = level === 'warn' ? '#000000' : '#FFFFFF'; // Commented out chalk

  // const labelStyles = getLabelStyles(labelBackgroundColor, labelTextColor); // Commented out chalk
  // const scopeStyles = getLabelStyles('#77828D', 'white'); // Commented out chalk

  // const styles = [labelStyles]; // Commented out chalk

  // if (typeof scope === 'string') { // Commented out chalk
  //   styles.push('', scopeStyles); // Commented out chalk
  // } // Commented out chalk

  // let labelText = formatText(` ${level.toUpperCase()} `, labelTextColor, labelBackgroundColor); // Commented out chalk

  // if (scope) { // Commented out chalk
  //   labelText = `${labelText} ${formatText(` ${scope} `, '#FFFFFF', '77828D')}`; // Commented out chalk
  // } // Commented out chalk

  if (typeof window !== 'undefined') {
    console.log(`%c${level.toUpperCase()}${scope ? `%c %c${scope}` : ''}`, [], allMessages); // Removed styles, kept CSS for browser
  } else {
    console.log(`${level.toUpperCase()} ${scope ? `[${scope}] ` : ''}`, allMessages); // Simplified output for non-browser
  }

  // Écriture dans les fichiers de log
  const logMessage = `${level.toUpperCase()} - ${scope ? `[${scope}] ` : ''}${allMessages}`;
  switch (level) {
    case 'trace':
    case 'debug':
      logToFile('vite_errors.log', logMessage);
      break;
    case 'info':
    case 'warn':
    case 'error':
      logToFile('runtime_errors.log', logMessage);
      break;
  }
}

function formatText(text: string, color: string, bg: string) {
  return text; // Simplified formatText
}

function getLabelStyles(color: string, textColor: string) {
  return ``; // Removed styles, kept CSS for browser
}

function getColorForLevel(level: DebugLevel): string {
  switch (level) {
    case 'trace':
    case 'debug': {
      return '#77828D';
    }
    case 'info': {
      return '#1389FD';
    }
    case 'warn': {
      return '#FFDB6C';
    }
    case 'error': {
      return '#EE4744';
    }
    default: {
      return '#000000';
    }
  }
}

export const renderLogger = createScopedLogger('Render');
