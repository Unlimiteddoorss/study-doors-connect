
import { useCallback } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import { useToast } from '@/hooks/use-toast';

interface UseErrorHandlerReturn {
  logError: (error: Error | string, context?: any, showToast?: boolean) => void;
  logWarning: (message: string, context?: any, showToast?: boolean) => void;
  logInfo: (message: string, context?: any, showToast?: boolean) => void;
  handleAsyncError: <T>(
    asyncFn: () => Promise<T>,
    errorMessage?: string,
    showToast?: boolean
  ) => Promise<T | null>;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const { toast } = useToast();

  const logError = useCallback((
    error: Error | string,
    context?: any,
    showToast: boolean = true
  ) => {
    errorHandler.logError(error, context);
    
    if (showToast) {
      toast({
        title: "حدث خطأ",
        description: error instanceof Error ? error.message : error,
        variant: "destructive",
      });
    }
  }, [toast]);

  const logWarning = useCallback((
    message: string,
    context?: any,
    showToast: boolean = false
  ) => {
    errorHandler.logWarning(message, context);
    
    if (showToast) {
      toast({
        title: "تحذير",
        description: message,
        variant: "default",
      });
    }
  }, [toast]);

  const logInfo = useCallback((
    message: string,
    context?: any,
    showToast: boolean = false
  ) => {
    errorHandler.logInfo(message, context);
    
    if (showToast) {
      toast({
        title: "معلومات",
        description: message,
        variant: "default",
      });
    }
  }, [toast]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorMessage: string = "حدث خطأ أثناء تنفيذ العملية",
    showToast: boolean = true
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : errorMessage;
      logError(errorMsg, { originalError: error }, showToast);
      return null;
    }
  }, [logError]);

  return {
    logError,
    logWarning,
    logInfo,
    handleAsyncError,
  };
};

export default useErrorHandler;
