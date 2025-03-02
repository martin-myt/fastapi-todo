import log from 'loglevel';

// Configuration types
interface LogConfig {
  retention: number;
  persistToStorage: boolean;
  format: 'json' | 'text';
  exportPath?: string;
}

// Default configuration
const DEFAULT_CONFIG: LogConfig = {
  retention: 100,
  persistToStorage: !import.meta.env.DEV,
  format: 'json',
  exportPath: import.meta.env.VITE_LOG_EXPORT_PATH,
};

// Log entry type
interface LogEntry {
  timestamp: string;
  level: string;
  message: any;
  metadata?: Record<string, any>;
}

// Set the default level based on environment
const level = import.meta.env.DEV ? 'debug' : 'info';
log.setLevel(level);

// Create a prefix for all log messages
const prefix = (level: string) => `[${new Date().toISOString()}] ${level.toUpperCase()}:`;

// Format log entry based on configuration
const formatLogEntry = (entry: LogEntry, config: LogConfig): string | object => {
  if (config.format === 'json') {
    return entry;
  }
  return `${entry.timestamp} [${entry.level}] ${entry.message}`;
};

// Create logger instance with configuration
export const createLogger = (config: Partial<LogConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const logger = {
    debug: (message: string, metadata?: Record<string, any>) => {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'debug',
        message,
        metadata,
      };
      log.debug(formatLogEntry(entry, finalConfig));
    },
    info: (message: string, metadata?: Record<string, any>) => {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'info',
        message,
        metadata,
      };
      log.info(formatLogEntry(entry, finalConfig));
    },
    warn: (message: string, metadata?: Record<string, any>) => {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'warn',
        message,
        metadata,
      };
      log.warn(formatLogEntry(entry, finalConfig));
    },
    error: (message: string, error?: Error, metadata?: Record<string, any>) => {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'error',
        message,
        metadata: {
          ...metadata,
          error: error ? {
            message: error.message,
            stack: error.stack,
            name: error.name,
          } : undefined,
        },
      };
      log.error(formatLogEntry(entry, finalConfig));
    },
  };

  // Add persistence to localStorage if configured
  if (finalConfig.persistToStorage) {
    const originalFactory = log.methodFactory;
    log.methodFactory = function (methodName: string, logLevel: log.LogLevelDesc, loggerName: string | undefined) {
      const rawMethod = originalFactory(methodName, logLevel, loggerName);
      
      return function (message: any) {
        rawMethod(message);
        
        // Keep a log history in localStorage
        const logs: LogEntry[] = JSON.parse(localStorage.getItem('app_logs') || '[]');
        logs.push(typeof message === 'string' ? {
          timestamp: new Date().toISOString(),
          level: methodName,
          message,
        } : message);
        
        // Keep only configured number of logs
        while (logs.length > finalConfig.retention) {
          logs.shift();
        }
        
        localStorage.setItem('app_logs', JSON.stringify(logs));
      };
    };
  }

  return logger;
};

// Export default instance with default configuration
export const logger = createLogger();

export default logger;

// Export logs utility
export const exportLogs = () => {
  try {
    const logs = localStorage.getItem('app_logs');
    if (logs) {
      const formattedLogs = JSON.stringify(JSON.parse(logs), null, 2);
      console.log('=== Exported Logs ===');
      console.log(formattedLogs);
      console.log('=== End Logs ===');
      return formattedLogs;
    }
    return 'No logs found';
  } catch (error) {
    console.error('Error exporting logs:', error);
    return 'Error exporting logs';
  }
};

// Add export logs to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).exportLogs = exportLogs;
} 