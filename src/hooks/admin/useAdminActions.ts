
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ActionOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAdminActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);
  const [pendingOptions, setPendingOptions] = useState<ActionOptions | null>(null);
  const { toast } = useToast();

  const handleAction = async (
    action: () => Promise<void>,
    options: ActionOptions = {}
  ) => {
    try {
      setIsLoading(true);
      await action();
      
      if (options.successMessage) {
        toast({
          title: "نجح العمل",
          description: options.successMessage,
        });
      }
      
      if (options.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      console.error('Action failed:', error);
      
      const errorMessage = options.errorMessage || "حدث خطأ أثناء تنفيذ العملية";
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive",
      });
      
      if (options.onError && error instanceof Error) {
        options.onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAction = (
    action: () => Promise<void>,
    options: ActionOptions = {}
  ) => {
    setPendingAction(() => action);
    setPendingOptions(options);
    setIsConfirmDialogOpen(true);
  };

  const executePendingAction = async () => {
    if (pendingAction && pendingOptions) {
      setIsConfirmDialogOpen(false);
      await handleAction(pendingAction, pendingOptions);
      setPendingAction(null);
      setPendingOptions(null);
    }
  };

  const cancelConfirmAction = () => {
    setIsConfirmDialogOpen(false);
    setPendingAction(null);
    setPendingOptions(null);
  };

  return {
    isLoading,
    handleAction,
    confirmAction,
    isConfirmDialogOpen,
    executePendingAction,
    cancelConfirmAction,
  };
}
