
interface ErrorLogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  context?: any;
  userId?: string;
  userAgent?: string;
  url?: string;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLogs: ErrorLogEntry[] = [];

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  logError(error: Error | string, context?: any): void {
    const errorEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error instanceof Error ? error.message : error,
      context,
      userId: this.getCurrentUserId(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.errorLogs.push(errorEntry);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorEntry);
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorEntry);
    }
  }

  logWarning(message: string, context?: any): void {
    const warningEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context,
      userId: this.getCurrentUserId(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.errorLogs.push(warningEntry);
    
    if (process.env.NODE_ENV === 'development') {
      console.warn('Warning logged:', warningEntry);
    }
  }

  logInfo(message: string, context?: any): void {
    const infoEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context,
      userId: this.getCurrentUserId(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.errorLogs.push(infoEntry);
    
    if (process.env.NODE_ENV === 'development') {
      console.info('Info logged:', infoEntry);
    }
  }

  getErrorLogs(): ErrorLogEntry[] {
    return [...this.errorLogs];
  }

  clearLogs(): void {
    this.errorLogs = [];
  }

  private getCurrentUserId(): string | undefined {
    // Get user ID from authentication context
    try {
      const authData = localStorage.getItem('auth-user');
      if (authData) {
        const user = JSON.parse(authData);
        return user.id;
      }
    } catch (error) {
      // Silent fail
    }
    return undefined;
  }

  private async sendToMonitoringService(errorEntry: ErrorLogEntry): Promise<void> {
    try {
      // Here you would send to your monitoring service
      // For now, we'll just store it locally
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorEntry),
      });
    } catch (error) {
      // Silent fail - don't create infinite error loops
    }
  }
}

export const errorHandler = ErrorHandler.getInstance();

// Global error handler
window.addEventListener('error', (event) => {
  errorHandler.logError(event.error || event.message, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  errorHandler.logError(event.reason, {
    type: 'unhandledrejection',
  });
});

export default ErrorHandler;
