
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAdminActionsProps {
  successMessage?: string;
  errorMessage?: string;
}

export const useAdminActions = (options: UseAdminActionsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (
    action: () => Promise<void>,
    actionOptions?: {
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: () => void;
      onError?: (error: any) => void;
    }
  ) => {
    setIsLoading(true);
    
    try {
      await action();
      
      toast({
        title: "نجح",
        description: actionOptions?.successMessage || options.successMessage || "تم تنفيذ العملية بنجاح",
        variant: "default"
      });
      
      actionOptions?.onSuccess?.();
    } catch (error) {
      console.error('Admin action error:', error);
      
      toast({
        title: "خطأ",
        description: actionOptions?.errorMessage || options.errorMessage || "حدث خطأ أثناء تنفيذ العملية",
        variant: "destructive"
      });
      
      actionOptions?.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleAction
  };
};
