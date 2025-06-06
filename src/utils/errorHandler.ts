
export const errorHandler = {
  logError: (error: any, context?: any) => {
    console.error('Error:', error, context);
  },
  
  logInfo: (message: string, data?: any) => {
    console.log('Info:', message, data);
  },
  
  logWarning: (message: string, data?: any) => {
    console.warn('Warning:', message, data);
  }
};
