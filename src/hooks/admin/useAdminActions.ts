
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdminActionsConfig {
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useAdminActions() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (
    action: () => Promise<void>,
    config: AdminActionsConfig = {}
  ) => {
    const {
      onSuccess,
      successMessage = 'تمت العملية بنجاح',
      errorMessage = 'حدث خطأ أثناء تنفيذ العملية'
    } = config;

    setIsLoading(true);
    try {
      await action();
      toast({
        title: 'نجاح',
        description: successMessage
      });
      onSuccess?.();
    } catch (error) {
      console.error('Admin action error:', error);
      toast({
        title: 'خطأ',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleAction
  };
}
