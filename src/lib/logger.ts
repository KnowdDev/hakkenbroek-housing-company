type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: string;
  stack?: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getConfiguredLevel(): LogLevel {
  const env = process.env.LOG_LEVEL?.toLowerCase() as LogLevel | undefined;
  if (env && env in LOG_LEVELS) return env;
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

const configuredLevel = getConfiguredLevel();

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[configuredLevel];
}

function formatEntry(entry: LogEntry): string {
  return JSON.stringify(entry);
}

function createEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  };

  if (error) {
    entry.error = error.message;
    entry.stack = error.stack;
  }

  return entry;
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
  if (!shouldLog(level)) return;

  const entry = createEntry(level, message, context, error);
  const formatted = formatEntry(entry);

  switch (level) {
    case 'error':
      console.error(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'debug':
      console.debug(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) =>
    log('debug', message, context),
  info: (message: string, context?: Record<string, unknown>) =>
    log('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) =>
    log('warn', message, context),
  error: (message: string, error?: Error, context?: Record<string, unknown>) =>
    log('error', message, context, error),
};
