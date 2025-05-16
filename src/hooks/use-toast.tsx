
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  toast,
  useToast as useToastOriginal,
} from "@/components/ui/use-toast";

type ToastVariants = 'default' | 'destructive' | 'success' | 'unlimited';

export interface ToastCustomProps extends Omit<ToastProps, 'variant'> {
  variant?: ToastVariants;
}

export function useToast() {
  const { toast } = useToastOriginal();

  return {
    toast: ({ variant, ...props }: ToastCustomProps) => {
      let className = '';
      
      if (variant === 'success') {
        className = 'bg-green-500 text-white border-green-600';
      } else if (variant === 'unlimited') {
        className = 'bg-unlimited-blue text-white border-unlimited-dark-blue';
      }
      
      return toast({
        ...props,
        ...(className ? { className } : {}),
      });
    },
    dismiss: toast.dismiss,
  };
}

export { toast };
