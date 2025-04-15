
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdminActionsConfig {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useAdminActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);
  const [pendingConfig, setPendingConfig] = useState<AdminActionsConfig | null>(null);
  const { toast } = useToast();

  const handleAction = async (
    action: () => Promise<void>,
    config: AdminActionsConfig = {}
  ) => {
    const {
      onSuccess,
      onError,
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
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAction = (
    action: () => Promise<void>,
    config: AdminActionsConfig = {}
  ) => {
    setPendingAction(() => action);
    setPendingConfig(config);
    setIsConfirmDialogOpen(true);
  };

  const executePendingAction = async () => {
    if (pendingAction && pendingConfig) {
      await handleAction(pendingAction, pendingConfig);
    }
    setIsConfirmDialogOpen(false);
    setPendingAction(null);
    setPendingConfig(null);
  };

  const cancelConfirmAction = () => {
    setIsConfirmDialogOpen(false);
    setPendingAction(null);
    setPendingConfig(null);
  };

  return {
    isLoading,
    handleAction,
    confirmAction,
    isConfirmDialogOpen,
    executePendingAction,
    cancelConfirmAction
  };
}
