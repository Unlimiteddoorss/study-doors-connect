
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAdminActionsProps {
  successMessage?: string;
  errorMessage?: string;
}

interface ActionOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useAdminActions = (options: UseAdminActionsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);
  const [pendingActionOptions, setPendingActionOptions] = useState<ActionOptions | undefined>(undefined);
  const { toast } = useToast();

  const handleAction = async (
    action: () => Promise<void>,
    actionOptions?: ActionOptions
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

  const confirmAction = (action: () => Promise<void>, actionOptions?: ActionOptions) => {
    setPendingAction(() => action);
    setPendingActionOptions(actionOptions);
    setIsConfirmDialogOpen(true);
  };

  const executePendingAction = async () => {
    if (pendingAction) {
      setIsConfirmDialogOpen(false);
      await handleAction(pendingAction, pendingActionOptions);
      setPendingAction(null);
      setPendingActionOptions(undefined);
    }
  };

  const cancelConfirmAction = () => {
    setIsConfirmDialogOpen(false);
    setPendingAction(null);
    setPendingActionOptions(undefined);
  };

  return {
    isLoading,
    handleAction,
    confirmAction,
    isConfirmDialogOpen,
    executePendingAction,
    cancelConfirmAction
  };
};
